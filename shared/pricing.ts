/**
 * Centralized pricing logic for Premier Party Cruises
 * Ensures consistent pricing calculations across client and server
 */

import { HOURLY_RATES, CRUISE_DURATIONS, PRICING_DEFAULTS } from './constants';

/**
 * Day type enumeration for pricing tiers
 */
export type DayType = 'MON_THU' | 'FRIDAY' | 'SAT_SUN';

/**
 * Capacity tier type for group size mapping
 */
export type CapacityTier = 14 | 25 | 30 | 50 | 75;

/**
 * Determines the pricing day type based on the day of the week
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
  } else {
    // Saturday (6) and Sunday (0)
    return 'SAT_SUN';
  }
}

/**
 * Maps group size to the appropriate capacity tier
 * @param groupSize Number of people in the group
 * @returns CapacityTier for pricing calculations
 */
export function getCapacityTier(groupSize: number): CapacityTier {
  if (groupSize <= 14) return 14;
  if (groupSize <= 25) return 25;
  if (groupSize <= 30) return 30;
  if (groupSize <= 50) return 50;
  return 75;
}

/**
 * Gets the appropriate hourly rate based on date and group size
 * @param date Event date
 * @param groupSize Number of people in the group
 * @returns Hourly rate in cents
 */
export function getHourlyRateByDayAndGroupSize(date: Date, groupSize: number): number {
  const dayType = getDayType(date);
  const capacityTier = getCapacityTier(groupSize);
  
  return HOURLY_RATES[dayType][capacityTier];
}

/**
 * Gets the cruise duration based on the event date
 * @param date Event date
 * @returns Duration in hours
 */
export function getCruiseDuration(date: Date): number {
  const dayType = getDayType(date);
  
  if (dayType === 'MON_THU') {
    return CRUISE_DURATIONS.WEEKDAY; // 3 hours
  } else {
    return CRUISE_DURATIONS.WEEKEND; // 4 hours for Friday and weekends
  }
}

/**
 * Calculates the base cruise cost before taxes and gratuity
 * @param date Event date
 * @param groupSize Number of people in the group
 * @returns Object with pricing breakdown
 */
export function calculateBaseCruiseCost(date: Date, groupSize: number) {
  const hourlyRate = getHourlyRateByDayAndGroupSize(date, groupSize);
  const duration = getCruiseDuration(date);
  const capacityTier = getCapacityTier(groupSize);
  const dayType = getDayType(date);
  
  // Calculate base cruise cost
  const baseCruiseCost = hourlyRate * duration;
  
  // Add crew fee for groups >20 people
  const crewFee = groupSize > 20 ? PRICING_DEFAULTS.EXTRA_CREW_FEE : 0;
  
  // Calculate subtotal (base + crew fee)
  const subtotal = baseCruiseCost + crewFee;
  
  return {
    hourlyRate,
    duration,
    capacityTier,
    dayType,
    baseCruiseCost,
    crewFee,
    subtotal,
    breakdown: {
      boatType: `${capacityTier}-person boat`,
      dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
      baseHourlyRate: hourlyRate,
      cruiseDuration: duration,
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
 * Calculates deposit amount based on event date and total cost
 * @param total Total cost in cents
 * @param eventDate Event date
 * @returns Deposit information
 */
export function calculateDeposit(total: number, eventDate: Date) {
  const today = new Date();
  const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const depositPercent = daysUntilEvent >= PRICING_DEFAULTS.URGENCY_THRESHOLD_DAYS ? 
    PRICING_DEFAULTS.DEPOSIT_PERCENT : 100;
  const depositAmount = Math.floor(total * (depositPercent / 100));
  
  return {
    depositPercent,
    depositAmount,
    balanceDue: total - depositAmount,
    isFullPaymentRequired: depositPercent === 100,
    daysUntilEvent
  };
}

/**
 * Master pricing calculation function that combines all pricing logic
 * @param date Event date
 * @param groupSize Number of people in the group
 * @returns Complete pricing breakdown
 */
export function calculateCompletePricing(date: Date, groupSize: number) {
  const baseCost = calculateBaseCruiseCost(date, groupSize);
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