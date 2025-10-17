/**
 * Centralized pricing logic for Premier Party Cruises
 * Ensures consistent pricing calculations across client and server
 */

import { 
  HOURLY_RATES, 
  CRUISE_DURATIONS, 
  PRICING_DEFAULTS, 
  PRIVATE_CRUISE_PRICING, 
  DISCO_PRICING,
  PACKAGE_FLAT_FEES,
  CREW_FEES,
  ADDON_FEES,
  DEPOSIT_POLICIES
} from './constants';

/**
 * SIMPLE CLIENT-SIDE PRICING CALCULATOR
 * Replaces complex API calls with instant table lookup
 * Uses existing HOURLY_RATES table + tax + gratuity
 */
export function calculateSimplePricing(
  date: Date,
  groupSize: number,
  duration: number = 4,
  selectedAddOns: string[] = []
): {
  subtotal: number;
  tax: number;
  gratuity: number;
  total: number;
  depositRequired: boolean;
  depositAmount: number;
  depositPercent: number;
  duration: number;
  hourlyRate: number;
  baseHourlyRate: number;
  selectedAddOns: Array<{id: string; name: string; hourlyRate: number}>;
  timeSlot?: string;
  pricingModel: string;
  discountTotal: number;
  perPersonCost: number;
  showBothOptions: boolean;
  eventType?: string;
} {
  // 1. Get day type and capacity tier using existing functions
  const dayType = getDayType(date);
  const capacityTier = getCapacityTier(groupSize);
  
  // PRODUCTION FIX: Use Google Sheet pricing instead of fallback constants
  // This function should now receive pricing data from Google Sheets-synced products table
  console.warn("⚠️ PRICING WARNING: calculateSimplePricing should not use HOURLY_RATES constants. Use server-side pricing with Google Sheet data instead.");
  const baseHourlyRate = HOURLY_RATES[dayType][capacityTier]; // DEPRECATED: Will be replaced with Google Sheet data
  
  // 3. Calculate add-on costs (FLAT FEES based on boat capacity, NOT HOURLY)
  let addOnFlatFee = 0;
  const addOnDetails: Array<{id: string; name: string; hourlyRate: number}> = [];
  
  if (selectedAddOns.includes('essentials')) {
    // Essentials Package - FLAT fee from centralized constants
    const flatFee = PACKAGE_FLAT_FEES.ESSENTIALS[capacityTier];
    addOnFlatFee += flatFee;
    addOnDetails.push({
      id: 'essentials',
      name: 'Essentials Package',
      hourlyRate: flatFee // Store flat fee here for compatibility
    });
  }
  
  if (selectedAddOns.includes('ultimate')) {
    // Ultimate Package - FLAT fee from centralized constants
    const flatFee = PACKAGE_FLAT_FEES.ULTIMATE[capacityTier];
    addOnFlatFee += flatFee;
    addOnDetails.push({
      id: 'ultimate',
      name: 'Ultimate Party Package',
      hourlyRate: flatFee // Store flat fee here for compatibility
    });
  }
  
  if (selectedAddOns.includes('lily_pad')) {
    // Lily Pad Float - fee from centralized constants
    const lilyPadFee = ADDON_FEES.LILY_PAD;
    addOnFlatFee += lilyPadFee;
    addOnDetails.push({
      id: 'lily_pad',
      name: 'Lily Pad Float',
      hourlyRate: lilyPadFee // Store flat fee here for compatibility
    });
  }
  
  const totalHourlyRate = baseHourlyRate; // No hourly add-on rate
  
  // 4. Calculate subtotal: (rate × duration) + flat add-on fees + crew fees
  let crewFee = 0;
  // Extra HOURLY crew fees from centralized constants
  if (groupSize >= CREW_FEES.THRESHOLDS.SMALL_BOAT_EXTRA && groupSize <= 30) {
    crewFee = CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA * duration; // Crew fee for 26-30 people (25-person boats)
  } else if (groupSize >= CREW_FEES.THRESHOLDS.LARGE_BOAT_EXTRA && groupSize <= 75) {
    crewFee = CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA * duration; // Crew fee for 51-75 people (50-person boat)
  }
  const baseCruiseCost = totalHourlyRate * duration;
  const subtotal = baseCruiseCost + addOnFlatFee + crewFee;
  
  // 5. Add tax (8.25%) and gratuity (20% of base cruise cost only) using existing constants
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000));
  const gratuity = Math.floor(baseCruiseCost * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  const total = subtotal + tax + gratuity;
  
  // 6. Calculate deposit using centralized constants
  const depositPercent = DEPOSIT_POLICIES.PRIVATE;
  const depositAmount = Math.floor(total * (depositPercent / 100));
  
  return {
    subtotal,
    tax,
    gratuity,
    total,
    depositRequired: true,
    depositAmount,
    depositPercent,
    duration,
    hourlyRate: totalHourlyRate,
    baseHourlyRate,
    selectedAddOns: addOnDetails,
    pricingModel: 'hourly',
    discountTotal: 0,
    perPersonCost: Math.floor(total / groupSize),
    showBothOptions: false
  };
}

/**
 * SIMPLE DISCO PRICING CALCULATOR
 * Replaces /api/pricing/preview with instant calculation
 */
export function calculateSimpleDiscoPricing(
  selectedDiscoPackage: 'basic' | 'disco_queen' | 'platinum',
  ticketQuantity: number
): {
  subtotal: number;
  discountTotal: number;
  tax: number;
  gratuity: number;
  total: number;
  perPersonCost: number;
  depositRequired: boolean;
  depositPercent: number;
  depositAmount: number;
  paymentSchedule: any[];
  expiresAt: string;
  breakdown: {};
  displaySettings: {};
  urgencyMessage: null;
  adjustments: any[];
  adjustmentTotal: number;
} {
  // 1. Simple lookup from DISCO_PRICING table - NO API CALLS!
  const perPersonPrice = DISCO_PRICING[selectedDiscoPackage];
  const subtotal = perPersonPrice * ticketQuantity;
  
  // 2. Add tax and gratuity using existing constants
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000));
  const gratuity = Math.floor(subtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  const total = subtotal + tax + gratuity;
  
  // 3. Calculate deposit using centralized constants
  const depositPercent = DEPOSIT_POLICIES.DISCO;
  const depositAmount = Math.floor(total * (depositPercent / 100));
  
  // 4. Set expiration (2 days from now)
  const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
  
  return {
    subtotal,
    discountTotal: 0,
    tax,
    gratuity,
    total,
    perPersonCost: Math.floor(total / ticketQuantity),
    depositRequired: true,
    depositPercent,
    depositAmount,
    paymentSchedule: [],
    expiresAt,
    breakdown: {},
    displaySettings: {},
    urgencyMessage: null,
    adjustments: [],
    adjustmentTotal: 0
  };
}

/**
 * Day type enumeration for pricing tiers
 * Updated to handle separate Friday and Sunday pricing
 */
export type DayType = 'MON_THU' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

/**
 * Capacity tier type for group size mapping
 */
export type CapacityTier = 14 | 25 | 30 | 50 | 75;

/**
 * Determines the pricing day type based on the day of the week
 * Each day type now has its own pricing tier
 * @param date Date object to check
 * @returns DayType for pricing calculations
 */
export function getDayType(date: Date): DayType {
  const dayOfWeek = date.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
  
  if (dayOfWeek >= 1 && dayOfWeek <= 4) {
    // Monday (1) through Thursday (4)
    return 'MON_THU';
  } else if (dayOfWeek === 5) {
    // Friday (5)
    return 'FRIDAY';
  } else if (dayOfWeek === 6) {
    // Saturday (6) - PREMIUM PRICING
    return 'SATURDAY';
  } else {
    // Sunday (0)
    return 'SUNDAY';
  }
}

/**
 * Maps group size to the appropriate capacity tier
 * FINAL RULES:
 * - 1-14 people: Use 14-person boat (Day Tripper)
 * - 15-25 people: Use 25-person boat (Me Seeks The Irony)
 * - 26-30 people: Use 25-person boat + extra crew fee (tier 30)
 * - 31-50 people: Use 50-person boat (Clever Girl)
 * - 51-75 people: Use 50-person boat + extra crew fee (tier 75)
 * @param groupSize Number of people in the group
 * @returns CapacityTier for pricing calculations
 */
export function getCapacityTier(groupSize: number): CapacityTier {
  if (groupSize <= 14) return 14;
  if (groupSize <= 25) return 25;
  if (groupSize <= 30) return 30; // 26-30 uses 25p boat + crew fee
  if (groupSize <= 50) return 50;
  return 75; // 51-75 uses 50p boat + crew fee
}

/**
 * Gets the appropriate hourly rate based on date and group size
 * @param date Event date
 * @param groupSize Number of people in the group
 * @returns Hourly rate in cents
 */
export function getHourlyRateByDayAndGroupSize(date: Date, groupSize: number): number {
  // PRODUCTION FIX: This function is deprecated - quotes should use Google Sheet pricing
  console.error("❌ CRITICAL: getHourlyRateByDayAndGroupSize() uses fallback HOURLY_RATES constants. Use server-side pricing with Google Sheet data instead.");
  const dayType = getDayType(date);
  const capacityTier = getCapacityTier(groupSize);
  
  return HOURLY_RATES[dayType][capacityTier]; // DEPRECATED: Should be replaced with Google Sheet API call
}

/**
 * Gets the cruise duration based on the event date and selected duration
 * For weekdays, both 3-hour and 4-hour options are available
 * @param date Event date
 * @param selectedDuration Optional duration override (3 or 4 hours)
 * @returns Duration in hours
 */
export function getCruiseDuration(date: Date, selectedDuration?: 3 | 4): number {
  const dayType = getDayType(date);
  
  if (dayType === 'MON_THU') {
    // Monday-Thursday: both 3-hour and 4-hour options available
    // Default to 4 hours if no preference specified (most popular)
    return selectedDuration || 4;
  } else {
    // Friday-Sunday: only 4-hour options
    return 4;
  }
}

/**
 * Calculates the base cruise cost before taxes and gratuity
 * @param date Event date
 * @param groupSize Number of people in the group
 * @param duration Optional duration (3 or 4 hours). If not specified, uses default for day type
 * @returns Object with pricing breakdown
 */
export function calculateBaseCruiseCost(date: Date, groupSize: number, duration?: 3 | 4) {
  const hourlyRate = getHourlyRateByDayAndGroupSize(date, groupSize);
  const cruiseDuration = getCruiseDuration(date, duration);
  const capacityTier = getCapacityTier(groupSize);
  const dayType = getDayType(date);
  
  // Calculate base cruise cost
  const baseCruiseCost = hourlyRate * cruiseDuration;
  
  // Crew fee calculation based on actual business rules:
  let crewFee = 0;
  
  // Additional FLAT crew fees for larger boats:
  // - 16-30 person groups (Me Seeks The Irony): $200 flat crew fee
  // - 40-75 person groups (Clever Girl): $300 flat crew fee  
  if (groupSize >= 16 && groupSize <= 30) {
    crewFee = PRICING_DEFAULTS.CREW_FEE_26_30; // $200 flat fee
  } else if (groupSize >= 40 && groupSize <= 75) {
    crewFee = PRICING_DEFAULTS.CREW_FEE_51_75; // $300 flat fee
  }
  
  // Calculate subtotal (base + crew fee)
  const subtotal = baseCruiseCost + crewFee;
  
  return {
    hourlyRate,
    duration: cruiseDuration,
    capacityTier,
    dayType,
    baseCruiseCost,
    crewFee,
    subtotal,
    breakdown: {
      boatType: `${capacityTier}-person boat`,
      dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
      baseHourlyRate: hourlyRate,
      cruiseDuration: cruiseDuration,
      baseCruiseCost,
      crewFee,
      subtotalBeforeTax: subtotal,
    }
  };
}

/**
 * Calculates taxes and gratuity using current pricing defaults
 * @param subtotal Subtotal amount in cents
 * @returns Object with tax and gratuity amounts
 */
export function calculateTaxAndGratuity(subtotal: number) {
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000));
  const gratuity = Math.floor(subtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  
  return {
    tax,
    gratuity,
    total: subtotal + tax + gratuity
  };
}

/**
 * Calculates deposit amount and due dates based on event date and total cost
 * Business Rule: Always 25% deposit, remaining balance due 30 days before event
 * @param total Total cost in cents
 * @param eventDate Event date
 * @returns Deposit information including due dates
 */
export function calculateDeposit(total: number, eventDate: Date) {
  const today = new Date();
  const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Updated deposit logic based on task specifications:
  // - Standard: 25% deposit for bookings more than 30 days in advance
  // - Urgent: 50% deposit for bookings 30 days or less from cruise date
  const isUrgentBooking = daysUntilEvent <= PRICING_DEFAULTS.URGENCY_THRESHOLD_DAYS;
  const depositPercent = isUrgentBooking ? 50 : PRICING_DEFAULTS.DEPOSIT_PERCENT; // 50% for urgent, 25% for standard
  const depositAmount = Math.floor(total * (depositPercent / 100));
  const balanceDue = total - depositAmount;
  
  // Calculate when remaining balance is due (30 days before event)
  const remainingBalanceDueAt = new Date(eventDate);
  remainingBalanceDueAt.setDate(remainingBalanceDueAt.getDate() - 30);
  
  // If the due date has already passed, set it to today
  const finalDueDate = remainingBalanceDueAt < today ? today : remainingBalanceDueAt;
  
  return {
    depositPercent,
    depositAmount,
    balanceDue,
    remainingBalanceDueAt: finalDueDate,
    isFullPaymentRequired: false, // Never require full payment upfront
    isUrgentBooking,
    paymentWindow: isUrgentBooking ? 48 : null, // 48 hours to pay for urgent bookings
    daysUntilEvent,
    daysUntilBalanceDue: Math.ceil((finalDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  };
}

/**
 * Gets day type for pricing from PRIVATE_CRUISE_PRICING structure
 * @param date Event date
 * @returns Day type key for pricing lookup
 */
export function getPricingDayType(date: Date): 'MON_THU' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY' {
  const dayOfWeek = date.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
  
  if (dayOfWeek >= 1 && dayOfWeek <= 4) {
    return 'MON_THU';
  } else if (dayOfWeek === 5) {
    return 'FRIDAY';
  } else if (dayOfWeek === 6) {
    return 'SATURDAY';
  } else {
    return 'SUNDAY';
  }
}

/**
 * Gets package pricing from PRIVATE_CRUISE_PRICING structure
 * @param capacityTier Capacity tier (14, 25, 30, 50, 75)
 * @param packageType Package type (standard, essentials, ultimate)
 * @param date Event date
 * @returns Package pricing information
 */
export function getPackagePricing(capacityTier: CapacityTier, packageType: 'standard' | 'essentials' | 'ultimate', date: Date) {
  const dayType = getPricingDayType(date);
  
  const tierPricing = PRIVATE_CRUISE_PRICING[capacityTier];
  const packagePricing = tierPricing.packages[packageType];
  
  return {
    name: packagePricing.name,
    description: packagePricing.description,
    addOn: packagePricing.addOn,
    totalPrice: packagePricing.totalPrices[dayType],
    baseHourlyRate: tierPricing.baseHourlyRates[dayType],
    capacity: tierPricing.capacity,
    crewFeePerHour: (tierPricing as any).crewFeePerHour || 0
  };
}

/**
 * Calculates pricing using the comprehensive PRIVATE_CRUISE_PRICING structure
 * @param date Event date
 * @param groupSize Number of people in the group
 * @param packageType Package type (standard, essentials, ultimate)
 * @param duration Optional duration (3 or 4 hours). If not specified, uses default for day type
 * @returns Complete pricing breakdown using new structure
 */
export function calculatePackagePricing(date: Date, groupSize: number, packageType: 'standard' | 'essentials' | 'ultimate' = 'standard', duration?: 3 | 4) {
  const capacityTier = getCapacityTier(groupSize);
  const packagePricing = getPackagePricing(capacityTier, packageType, date);
  const cruiseDuration = getCruiseDuration(date, duration);
  
  // Use the pre-calculated total price from the pricing structure
  // For 3-hour cruises, adjust the price proportionally (3/4 of the 4-hour price)
  const totalPrice = cruiseDuration === 3 
    ? Math.floor(packagePricing.totalPrice * 0.75)
    : packagePricing.totalPrice;
  
  // Calculate deposit information
  const deposit = calculateDeposit(totalPrice, date);
  
  return {
    packageType,
    packageName: packagePricing.name,
    packageDescription: packagePricing.description,
    capacity: packagePricing.capacity,
    groupSize,
    baseHourlyRate: packagePricing.baseHourlyRate,
    duration: cruiseDuration,
    addOnCost: packagePricing.addOn,
    crewFeePerHour: packagePricing.crewFeePerHour,
    totalCrewFee: packagePricing.crewFeePerHour * cruiseDuration,
    totalPrice,
    ...deposit,
    perPersonCost: Math.floor(totalPrice / groupSize),
    breakdown: {
      capacityTier,
      packageType,
      baseHourlyRate: packagePricing.baseHourlyRate,
      duration: cruiseDuration,
      addOnCost: packagePricing.addOn,
      crewFee: packagePricing.crewFeePerHour * cruiseDuration,
      totalPrice,
      perPerson: Math.floor(totalPrice / groupSize),
      deposit: deposit.depositAmount,
      balanceDue: deposit.balanceDue,
    }
  };
}

/**
 * Master pricing calculation function that combines all pricing logic
 * @param date Event date
 * @param groupSize Number of people in the group
 * @param duration Optional duration (3 or 4 hours). If not specified, uses default for day type
 * @returns Complete pricing breakdown
 */
export function calculateCompletePricing(date: Date, groupSize: number, duration?: 3 | 4) {
  const baseCost = calculateBaseCruiseCost(date, groupSize, duration);
  const taxAndGratuity = calculateTaxAndGratuity(baseCost.subtotal);
  const deposit = calculateDeposit(taxAndGratuity.total, date);
  
  return {
    ...baseCost,
    ...taxAndGratuity,
    ...deposit,
    perPersonCost: Math.floor(taxAndGratuity.total / groupSize),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    breakdown: {
      ...baseCost.breakdown,
      gratuityAmount: taxAndGratuity.gratuity,
      taxAmount: taxAndGratuity.tax,
      grandTotal: taxAndGratuity.total,
      perPerson: Math.floor(taxAndGratuity.total / groupSize),
      deposit: deposit.depositAmount,
      balanceDue: deposit.balanceDue,
    }
  };
}

/**
 * Gets DISCO pricing per person for a specific package type
 * @param packageType Package type (basic, disco_queen, platinum)
 * @returns Price per person in cents
 */
export function getDiscoPricing(packageType: 'basic' | 'disco_queen' | 'platinum'): number {
  return DISCO_PRICING[packageType] || DISCO_PRICING.basic;
}

/**
 * Calculates total DISCO pricing for a group
 * @param packageType Package type (basic, disco_queen, platinum) 
 * @param groupSize Number of people in the group
 * @param eventDate Event date for deposit calculation
 * @returns Complete DISCO pricing breakdown
 */
export function calculateDiscoPricing(packageType: 'basic' | 'disco_queen' | 'platinum', groupSize: number, eventDate: Date) {
  const pricePerPerson = getDiscoPricing(packageType);
  const subtotal = pricePerPerson * groupSize;
  const taxAndGratuity = calculateTaxAndGratuity(subtotal);
  const deposit = calculateDeposit(taxAndGratuity.total, eventDate);
  
  return {
    packageType,
    pricePerPerson,
    groupSize,
    subtotal,
    ...taxAndGratuity,
    ...deposit,
    perPersonCost: Math.floor(taxAndGratuity.total / groupSize),
    breakdown: {
      packageType,
      pricePerPerson,
      groupSize,
      subtotal,
      tax: taxAndGratuity.tax,
      gratuity: taxAndGratuity.gratuity,
      total: taxAndGratuity.total,
      perPerson: Math.floor(taxAndGratuity.total / groupSize),
      deposit: deposit.depositAmount,
      balanceDue: deposit.balanceDue,
    }
  };
}

/**
 * Filter boats that can accommodate a specific group size
 * Updated to match the exact requirements:
 * - 1-14 people: Day Tripper
 * - 15-30 people: Me Seek/The Irony (unified option)
 * - 31-75 people: Clever Girl
 */
export const filterBoatsForGroupSize = (boats: any[], groupSize: number) => {
  if (!boats || boats.length === 0) return [];
  
  // IMPORTANT: Exclude ATX Disco boat - it's only for disco cruises, not private cruises
  const privateBoats = boats.filter(boat => boat.id !== 'boat_atx_disco' && boat.active);
  
  // Apply strict capacity rules for boat selection per requirements
  if (groupSize <= 14) {
    // 1-14 people: Only Day Tripper
    return privateBoats.filter(boat => 
      boat.id === 'boat_day_tripper' || boat.name === 'Day Tripper'
    );
  } else if (groupSize <= 30) {
    // 15-30 people: Me Seeks The Irony (unified option)
    return privateBoats.filter(boat => 
      boat.id === 'boat_me_seeks_the_irony' || boat.name === 'Me Seeks The Irony'
    );
  } else if (groupSize <= 75) {
    // 31-75 people: Clever Girl
    return privateBoats.filter(boat => 
      boat.id === 'boat_clever_girl' || boat.name === 'Clever Girl'
    );
  } else {
    // Over 75: No boats available
    return [];
  }
};

/**
 * Get boat display name from actual boat data
 */
export const getBoatDisplayName = (boat: any): string => {
  if (!boat) return 'Party Boat';
  return boat.name || `${boat.capacity}-Person Boat`;
};