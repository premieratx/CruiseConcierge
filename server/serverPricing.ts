import { addDays, differenceInDays } from 'date-fns';

// Server-side authoritative pricing engine - SINGLE SOURCE OF TRUTH
// This replaces all client-side pricing for security and business rule enforcement

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
  
  // Crew Fees (hourly fees)
  CREW_FEES: {
    TIER_1: { min: 26, max: 30, hourlyFee: 50 }, // $50/hour for 26-30 people on Me Seek/The Irony
    TIER_2: { min: 51, max: 75, hourlyFee: 100 }, // $100/hour for 51-75 people on Clever Girl
  },
  
  // Boat Configuration (rates in CENTS for Stripe compatibility)
  // Updated to match correct pricing by day of week
  BOATS: {
    boat_day_tripper: { 
      name: 'Day Tripper', 
      minCapacity: 1, 
      maxCapacity: 14, 
      baseRateCents: {
        weekday: 20000,  // $200/hr Mon-Thu
        friday: 25000,   // $250/hr Friday
        weekend: 30000   // $300/hr Sat-Sun
      }
    },
    boat_me_seek: { 
      name: 'Me Seek', 
      minCapacity: 15, 
      maxCapacity: 30, 
      baseRateCents: {
        weekday: 25000,  // $250/hr Mon-Thu
        friday: 30000,   // $300/hr Friday
        weekend: 35000   // $350/hr Sat-Sun
      }
    },
    boat_the_irony: { 
      name: 'The Irony', 
      minCapacity: 15, 
      maxCapacity: 30, 
      baseRateCents: {
        weekday: 25000,  // $250/hr Mon-Thu
        friday: 30000,   // $300/hr Friday
        weekend: 35000   // $350/hr Sat-Sun
      }
    },
    boat_clever_girl: { 
      name: 'Clever Girl', 
      minCapacity: 31, 
      maxCapacity: 75, 
      baseRateCents: {
        weekday: 30000,  // $300/hr Mon-Thu
        friday: 35000,   // $350/hr Friday
        weekend: 40000   // $400/hr Sat-Sun
      }
    },
    boat_atx_disco: { 
      name: 'ATX Disco', 
      minCapacity: 1, 
      maxCapacity: 100, 
      baseRateCents: 8500 // $85 per person (disco cruise, not hourly)
    }
  },
  
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

function determineBoatByCapacity(groupSize: number, cruiseType: 'private' | 'disco'): { id: keyof typeof PRICING_CONFIG.BOATS; name: string } {
  // Disco cruises always use ATX Disco boat
  if (cruiseType === 'disco') {
    return { id: 'boat_atx_disco', name: PRICING_CONFIG.BOATS.boat_atx_disco.name };
  }
  
  // Private cruise boat selection by capacity
  if (groupSize <= 14) {
    return { id: 'boat_day_tripper', name: PRICING_CONFIG.BOATS.boat_day_tripper.name };
  } else if (groupSize <= 30) {
    return { id: 'boat_me_seeks_the_irony', name: PRICING_CONFIG.BOATS.boat_me_seeks_the_irony.name };
  } else if (groupSize <= 75) {
    return { id: 'boat_clever_girl', name: PRICING_CONFIG.BOATS.boat_clever_girl.name };
  } else {
    throw new Error(`Group size ${groupSize} exceeds maximum capacity of 75 people`);
  }
}

function validateDuration(dayType: string, duration: number): boolean {
  const allowedDurations = PRICING_CONFIG.DURATION_RULES[dayType as keyof typeof PRICING_CONFIG.DURATION_RULES];
  return allowedDurations.includes(duration);
}

function calculateCrewFees(groupSize: number, duration: number): { hourlyRateCents: number; totalFeeCents: number } {
  let flatFeeCents = 0;
  
  // Apply crew fee tiers (flat fees, not per hour)
  if (groupSize >= PRICING_CONFIG.CREW_FEES.TIER_2.min && groupSize <= PRICING_CONFIG.CREW_FEES.TIER_2.max) {
    flatFeeCents = PRICING_CONFIG.CREW_FEES.TIER_2.flatFee * 100; // $300 -> 30000 cents
  } else if (groupSize >= PRICING_CONFIG.CREW_FEES.TIER_1.min && groupSize <= PRICING_CONFIG.CREW_FEES.TIER_1.max) {
    flatFeeCents = PRICING_CONFIG.CREW_FEES.TIER_1.flatFee * 100; // $200 -> 20000 cents
  }
  
  return {
    hourlyRateCents: 0, // Not hourly anymore, but keeping for interface compatibility
    totalFeeCents: flatFeeCents // Flat fee, not duration-based
  };
}

// MAIN SERVER PRICING FUNCTION - AUTHORITATIVE
export function calculateServerPricing(request: ServerPricingRequest): ServerPricingResponse {
  const errors: string[] = [];
  
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
    boat = { id: 'boat_clever_girl' as const, name: 'Clever Girl' };
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
  
  // Calculate base pricing (ALL IN CENTS for Stripe compatibility)
  const boatConfig = PRICING_CONFIG.BOATS[boat.id];
  let baseRateCents: number;
  let subtotalCents: number;
  
  if (request.cruiseType === 'disco') {
    // Disco pricing: per-person rate × group size (no duration multiplier)
    baseRateCents = boatConfig.baseRateCents as number; // $85 per person in cents
    subtotalCents = baseRateCents * request.groupSize; // Total for all people
  } else {
    // Private cruise pricing: hourly rate × duration (varies by day)
    const ratesByDay = boatConfig.baseRateCents as { weekday: number; friday: number; weekend: number };
    baseRateCents = ratesByDay[dayType]; // Get rate for specific day type
    subtotalCents = baseRateCents * request.duration; // Total for duration
  }
  
  // Calculate crew fees (only for private cruises)
  const crewFees = request.cruiseType === 'private' 
    ? calculateCrewFees(request.groupSize, request.duration)
    : { hourlyRateCents: 0, totalFeeCents: 0 };
  
  // Large group fee removed per requirements
  const largeGroupFeeCents = 0;
  
  // Add-ons (simplified for now)
  const addOnTotalCents = 0; // TODO: Implement add-on pricing
  
  // Discount (simplified for now)
  const discountAmountCents = 0; // TODO: Implement discount validation
  
  // Calculate taxable amount (in cents)
  const taxableAmountCents = subtotalCents + crewFees.totalFeeCents + largeGroupFeeCents + addOnTotalCents - discountAmountCents;
  
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
  
  return {
    // Boat & Duration
    boatId: boat.id,
    boatName: boat.name,
    dayType,
    durationHours: request.duration,
    
    // Pricing Breakdown (in cents for Stripe)
    baseRateCents,
    subtotalCents,
    crewFeeHourlyCents: crewFees.hourlyRateCents,
    crewFeeTotalCents: crewFees.totalFeeCents,
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
  };
}

// Export for route validation
export { PRICING_CONFIG };