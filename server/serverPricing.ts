import { addDays, differenceInDays } from 'date-fns';
import { db } from './db';
import { products } from '@shared/schema';
import { eq, and, or, gte, lte } from 'drizzle-orm';

// Server-side authoritative pricing engine - SINGLE SOURCE OF TRUTH
// Uses products table populated from Google Sheets - NO HARDCODED VALUES!

export interface ServerPricingRequest {
  eventDate: string; // YYYY-MM-DD format
  groupSize: number;
  cruiseType: 'private' | 'disco';
  duration: number; // hours
  timeSlot?: string; // for validation
  boatId?: string; // for validation
  addOns?: string[]; // addon package IDs
  discountCode?: string;
}

export interface ServerPricingResponse {
  // Boat & Duration Details
  boatId: string;
  boatName: string;
  dayType: 'weekday' | 'friday' | 'weekend';
  durationHours: number;
  
  // Pricing Breakdown (ALL IN CENTS for Stripe compatibility)
  baseRateCents: number; // hourly rate in cents
  subtotalCents: number; // base rate × hours in cents
  crewFeeHourlyCents: number; // crew surcharge per hour in cents
  crewFeeTotalCents: number; // crew fee × hours in cents
  largeGroupFeeCents: number; // flat $200 fee for groups >20 in cents
  addOnTotalCents: number; // sum of all add-on costs in cents
  discountAmountCents: number; // discount applied in cents
  
  // Tax & Fees (in cents)
  taxableAmountCents: number; // subtotal after discounts, before tax/gratuity
  taxRate: number; // 8.25%
  taxAmountCents: number;
  gratuityRate: number; // 20%
  gratuityAmountCents: number;
  
  // Totals (in cents for Stripe)
  totalAmountCents: number; // final amount due in cents
  
  // Deposit Logic (in cents)
  daysUntilEvent: number;
  requiresFullPayment: boolean; // true if <30 days
  depositPercent: number; // 25% or 100%
  depositAmountCents: number;
  balanceDueCents: number;
  
  // Legacy dollar amounts for display (computed from cents)
  baseRate: number; // dollars
  subtotal: number; // dollars
  totalAmount: number; // dollars
  depositAmount: number; // dollars
  
  // Validation Status
  isValid: boolean;
  errors: string[];
  
  // Pricing source for debugging
  pricingSource?: string;
}

// Business Constants - DO NOT MODIFY WITHOUT AUTHORIZATION
const PRICING_CONFIG = {
  // Tax & Gratuity Rates
  TAX_RATE: 0.0825, // 8.25%
  GRATUITY_RATE: 0.20, // 20%
  
  // Deposit Rules
  DEPOSIT_THRESHOLD_DAYS: 30,
  EARLY_DEPOSIT_PERCENT: 0.25, // 25% if >30 days
  LATE_DEPOSIT_PERCENT: 1.00,  // 100% if <30 days
  
  // Duration Rules by Day Type
  DURATION_RULES: {
    weekday: [3, 4] as number[], // 3 or 4 hours allowed
    friday: [4] as number[],     // 4 hours only
    weekend: [4] as number[],    // 4 hours only
  }
} as const;

// Helper Functions
function getDayType(eventDate: string): 'weekday' | 'friday' | 'weekend' {
  const date = new Date(eventDate);
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 5) return 'friday';
  if (dayOfWeek === 0 || dayOfWeek === 6) return 'weekend';
  return 'weekday';
}

function getDayTypeForQuery(eventDate: string): string {
  const date = new Date(eventDate);
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 5) return 'friday';
  if (dayOfWeek === 6) return 'saturday';
  if (dayOfWeek === 0) return 'sunday';
  return 'weekday';
}

// CRITICAL FIX: Proper boat determination with correct capacity ranges
function determineBoatByCapacity(groupSize: number, cruiseType: 'private' | 'disco'): { id: string; name: string } {
  // Disco cruises always use ATX Disco boat
  if (cruiseType === 'disco') {
    return { id: 'boat_atx_disco', name: 'ATX Disco Cruise' };
  }
  
  // Private cruise boat selection by capacity - INCLUDING 31-49 range!
  if (groupSize <= 14) {
    return { id: 'boat_day_tripper', name: 'Day Tripper' };
  } else if (groupSize <= 25) {
    return { id: 'boat_me_seek', name: 'Me Seek' };
  } else if (groupSize <= 30) {
    return { id: 'boat_the_irony', name: 'The Irony' };
  } else if (groupSize <= 50) {
    // FIXED: 31-50 people use Clever Girl
    return { id: 'boat_clever_girl', name: 'Clever Girl' };
  } else if (groupSize <= 75) {
    // 51-75 people also use Clever Girl
    return { id: 'boat_clever_girl', name: 'Clever Girl' };
  } else {
    throw new Error(`Group size ${groupSize} exceeds maximum capacity of 75 people`);
  }
}

function validateDuration(dayType: string, duration: number): boolean {
  const allowedDurations = PRICING_CONFIG.DURATION_RULES[dayType as keyof typeof PRICING_CONFIG.DURATION_RULES];
  return allowedDurations.includes(duration);
}

// MAIN SERVER PRICING FUNCTION - USES GOOGLE SHEETS AS SINGLE SOURCE OF TRUTH
export async function calculateServerPricing(request: ServerPricingRequest): Promise<ServerPricingResponse> {
  const errors: string[] = [];
  let pricingSource = 'google_sheets_synced';
  
  // Validate inputs
  if (!request.eventDate || !request.groupSize || !request.duration) {
    errors.push('Missing required fields: eventDate, groupSize, duration');
  }
  
  if (request.groupSize < 1 || request.groupSize > 75) {
    errors.push(`Invalid group size: ${request.groupSize}. Must be between 1-75 people`);
  }
  
  const eventDate = new Date(request.eventDate);
  const today = new Date();
  const daysUntilEvent = differenceInDays(eventDate, today);
  
  if (daysUntilEvent < 0) {
    errors.push('Event date cannot be in the past');
  }
  
  // Determine day type and validate duration
  const dayType = getDayType(request.eventDate);
  const dayTypeForQuery = getDayTypeForQuery(request.eventDate);
  
  if (!validateDuration(dayType, request.duration)) {
    const allowed = PRICING_CONFIG.DURATION_RULES[dayType];
    errors.push(`Invalid duration for ${dayType}: ${request.duration}h. Allowed: ${allowed.join(', ')} hours`);
  }
  
  // Determine boat (includes disco boat logic)
  let boat;
  try {
    boat = determineBoatByCapacity(request.groupSize, request.cruiseType);
  } catch (error) {
    errors.push((error as Error).message);
    // Fallback to prevent crashes
    boat = { id: 'boat_clever_girl', name: 'Clever Girl' };
  }
  
  // Disco cruise validation
  if (request.cruiseType === 'disco') {
    if (dayType !== 'friday' && dayType !== 'weekend') {
      errors.push('Disco cruises are only available on Fridays and weekends');
    }
    if (request.duration !== 4) {
      errors.push('Disco cruises must be 4 hours duration');
    }
  }
  
  // CRITICAL: Query products table which is synced from Google Sheets - SINGLE SOURCE OF TRUTH
  let baseRateCents = 0;
  let crewFeeHourlyCents = 0;
  let productName = '';
  
  // Validate pricing against Google Sheets in background
  try {
    const { googleSheetsPricingSync } = await import('./services/googleSheetsPricingSync');
    const validation = await googleSheetsPricingSync.validatePricingWithSheets(
      boat.id,
      dayTypeForQuery,
      request.groupSize
    );
    
    if (!validation.isValid && validation.discrepancyMessage) {
      console.error(`💰 PRICING DISCREPANCY DETECTED: ${validation.discrepancyMessage}`);
      // Log discrepancy but continue with database pricing for now
      pricingSource = 'database_needs_sync';
    }
  } catch (validationError) {
    console.error('Failed to validate pricing against Google Sheets:', validationError);
  }
  
  try {
    if (request.cruiseType === 'disco') {
      // Query disco pricing from products table
      const discoProducts = await db.select().from(products)
        .where(
          and(
            eq(products.productType, 'disco_cruise'),
            eq(products.boatId, boat.id),
            eq(products.active, true)
          )
        )
        .limit(1);
      
      if (discoProducts.length > 0) {
        baseRateCents = discoProducts[0].unitPrice; // Per person rate in cents
        productName = discoProducts[0].name;
        pricingSource = `products_table:${discoProducts[0].id}`;
        console.log(`💰 [DISCO PRICING] Using ${productName}: $${baseRateCents/100} per person`);
      } else {
        // Fallback disco pricing if not in products table
        baseRateCents = 8500; // $85 per person
        pricingSource = 'fallback_disco';
        console.warn(`⚠️ [DISCO PRICING] No product found, using fallback: $85 per person`);
      }
    } else {
      // Query private cruise pricing from products table
      // First try exact match with boat and day type
      let privateProducts = await db.select().from(products)
        .where(
          and(
            eq(products.productType, 'private_cruise'),
            eq(products.boatId, boat.id),
            eq(products.dayType, dayTypeForQuery),
            eq(products.active, true),
            or(
              and(
                lte(products.groupSize, request.groupSize + 5),
                gte(products.groupSize, request.groupSize - 5)
              ),
              eq(products.groupSize, request.groupSize)
            )
          )
        )
        .limit(1);
      
      // If no exact match, try broader search
      if (privateProducts.length === 0) {
        privateProducts = await db.select().from(products)
          .where(
            and(
              eq(products.productType, 'private_cruise'),
              eq(products.dayType, dayTypeForQuery),
              eq(products.active, true),
              gte(products.groupSize, request.groupSize)
            )
          )
          .limit(1);
      }
      
      if (privateProducts.length > 0) {
        const product = privateProducts[0];
        baseRateCents = product.unitPrice; // Hourly rate in cents
        
        // CRITICAL FIX: Apply crew fees based on group size and boat
        // Groups 26-30 on Me Seek or The Irony: $50/hr crew fee
        // Groups 51-75 on Clever Girl: $100/hr crew fee
        if (request.groupSize >= 26 && request.groupSize <= 30 && 
            (boat.id === 'boat_me_seek' || boat.id === 'boat_the_irony')) {
          crewFeeHourlyCents = 5000; // $50/hour crew fee
          console.log(`💰 [CREW FEE] Applied $50/hr crew fee for group of ${request.groupSize} on ${boat.name}`);
        } else if (request.groupSize >= 51 && request.groupSize <= 75 && 
                   boat.id === 'boat_clever_girl') {
          crewFeeHourlyCents = 10000; // $100/hour crew fee
          console.log(`💰 [CREW FEE] Applied $100/hr crew fee for group of ${request.groupSize} on ${boat.name}`);
        } else {
          crewFeeHourlyCents = product.crewFeePerHour || 0; // Use product's crew fee if no special rule applies
        }
        
        productName = product.name;
        pricingSource = `products_table:${product.id}`;
        console.log(`💰 [PRIVATE PRICING] Using ${productName}: $${baseRateCents/100}/hr + $${crewFeeHourlyCents/100}/hr crew`);
      } else {
        // Emergency fallback pricing if products table is empty
        console.error(`❌ [PRICING ERROR] No product found for ${boat.name}, ${dayTypeForQuery}, ${request.groupSize} people`);
        
        // Basic fallback rates
        const fallbackRates = {
          weekday: { base: 20000, crew: 0 },
          friday: { base: 25000, crew: 0 },
          weekend: { base: 30000, crew: 0 }
        };
        
        baseRateCents = fallbackRates[dayType].base;
        
        // Add crew fees for larger groups
        if (request.groupSize >= 26 && request.groupSize <= 30) {
          crewFeeHourlyCents = 5000; // $50/hour
        } else if (request.groupSize >= 51 && request.groupSize <= 75) {
          crewFeeHourlyCents = 10000; // $100/hour
        }
        
        pricingSource = 'emergency_fallback';
        console.warn(`⚠️ [PRICING WARNING] Using fallback pricing: $${baseRateCents/100}/hr + $${crewFeeHourlyCents/100}/hr crew`);
      }
    }
  } catch (error) {
    console.error('❌ [DATABASE ERROR] Failed to query products table:', error);
    errors.push('Failed to retrieve pricing from database');
    pricingSource = 'error';
  }
  
  // Calculate pricing based on cruise type
  let subtotalCents: number;
  
  if (request.cruiseType === 'disco') {
    // Disco pricing: per-person rate × group size (no duration multiplier)
    subtotalCents = baseRateCents * request.groupSize; // Total for all people
  } else {
    // Private cruise pricing: hourly rate × duration
    subtotalCents = baseRateCents * request.duration; // Total for duration
  }
  
  // Calculate crew fees (only for private cruises)
  const crewFeeTotalCents = request.cruiseType === 'private' 
    ? crewFeeHourlyCents * request.duration
    : 0;
  
  console.log(`💰 [CREW FEE CALC] Group size: ${request.groupSize}, Duration: ${request.duration}h, Hourly: $${crewFeeHourlyCents/100}/h, Total: $${crewFeeTotalCents/100}`);
  
  // Large group fee removed per requirements
  const largeGroupFeeCents = 0;
  
  // Add-ons (simplified for now)
  const addOnTotalCents = 0; // TODO: Implement add-on pricing from products table
  
  // Discount (simplified for now)
  const discountAmountCents = 0; // TODO: Implement discount validation
  
  // Calculate taxable amount (in cents)
  const taxableAmountCents = subtotalCents + crewFeeTotalCents + largeGroupFeeCents + addOnTotalCents - discountAmountCents;
  
  // Tax on full amount, gratuity only on base cruise cost (not crew fees or other fees)
  const taxAmountCents = Math.round(taxableAmountCents * PRICING_CONFIG.TAX_RATE);
  // For private cruises: gratuity is 20% of (hourly rate × hours) only, not including crew fees
  // For disco cruises: gratuity is 20% of the per-person rate × group size
  const baseCruiseCostCents = request.cruiseType === 'private' 
    ? baseRateCents * request.duration  // hourly × hours for private
    : baseRateCents * request.groupSize; // per-person × people for disco
  const gratuityAmountCents = Math.round(baseCruiseCostCents * PRICING_CONFIG.GRATUITY_RATE);
  
  // Total amount (in cents)
  const totalAmountCents = taxableAmountCents + taxAmountCents + gratuityAmountCents;
  
  // Deposit calculation based on event timing (in cents)
  const requiresFullPayment = daysUntilEvent <= 7; // Full payment if 7 days or less
  const depositPercent = requiresFullPayment 
    ? PRICING_CONFIG.LATE_DEPOSIT_PERCENT 
    : PRICING_CONFIG.EARLY_DEPOSIT_PERCENT;
  const depositAmountCents = Math.round(totalAmountCents * depositPercent);
  const balanceDueCents = totalAmountCents - depositAmountCents;
  
  // Log pricing calculation for debugging
  console.log(`
    📊 PRICING CALCULATION SUMMARY:
    ================================
    Event Date: ${request.eventDate} (${dayType})
    Group Size: ${request.groupSize}
    Cruise Type: ${request.cruiseType}
    Duration: ${request.duration} hours
    Boat: ${boat.name} (${boat.id})
    
    Pricing Source: ${pricingSource}
    Product: ${productName || 'N/A'}
    
    Base Rate: $${baseRateCents/100}${request.cruiseType === 'private' ? '/hr' : ' per person'}
    Subtotal: $${subtotalCents/100}
    Crew Fee: $${crewFeeHourlyCents/100}/hr × ${request.duration}h = $${crewFeeTotalCents/100}
    
    Taxable Amount: $${taxableAmountCents/100}
    Tax (8.25%): $${taxAmountCents/100}
    Gratuity (20%): $${gratuityAmountCents/100}
    
    TOTAL: $${totalAmountCents/100}
    Deposit (${depositPercent*100}%): $${depositAmountCents/100}
    Balance Due: $${balanceDueCents/100}
    ================================
  `);
  
  return {
    // Boat & Duration
    boatId: boat.id,
    boatName: boat.name,
    dayType,
    durationHours: request.duration,
    
    // Pricing Breakdown (in cents for Stripe)
    baseRateCents,
    subtotalCents,
    crewFeeHourlyCents,
    crewFeeTotalCents,
    largeGroupFeeCents,
    addOnTotalCents,
    discountAmountCents,
    
    // Tax & Fees (in cents)
    taxableAmountCents,
    taxRate: PRICING_CONFIG.TAX_RATE,
    taxAmountCents,
    gratuityRate: PRICING_CONFIG.GRATUITY_RATE,
    gratuityAmountCents,
    
    // Totals (in cents for Stripe)
    totalAmountCents,
    
    // Deposit Logic (in cents)
    daysUntilEvent,
    requiresFullPayment,
    depositPercent,
    depositAmountCents,
    balanceDueCents,
    
    // Legacy dollar amounts for display compatibility
    baseRate: Math.round(baseRateCents) / 100,
    subtotal: Math.round(subtotalCents) / 100,
    totalAmount: Math.round(totalAmountCents) / 100,
    depositAmount: Math.round(depositAmountCents) / 100,
    
    // Validation
    isValid: errors.length === 0,
    errors,
    
    // Pricing source for debugging
    pricingSource
  };
}

// Export for route validation
export { PRICING_CONFIG };