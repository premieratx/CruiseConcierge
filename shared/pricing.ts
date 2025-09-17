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
  
  // Crew fee calculation - this is a fallback generic calculation
  // Real pricing should use boat-specific crew fees from products table
  // This is kept for backward compatibility and fallback scenarios
  let crewFee = 0;
  if (groupSize > 20) {
    // For capacity tiers that support expanded capacity:
    // - 14-person boat (Day Tripper): No crew fee (no expansion possible)
    // - 25-person boat (Me Seeks): +$50/hr for 26-30 people 
    // - 50-person boat (Clever Girl): +$100/hr for 51-75 people
    // - 100-person boat (ATX Disco): No crew fee needed
    if (capacityTier === 25 && groupSize > 25) {
      crewFee = 5000 * duration; // $50/hr * duration for Me Seeks expansion
    } else if (capacityTier === 50 && groupSize > 50) {
      crewFee = 10000 * duration; // $100/hr * duration for Clever Girl expansion  
    } else if (capacityTier <= 14 || capacityTier >= 75) {
      crewFee = 0; // No crew fee for boats that don't support expansion
    } else {
      // Fallback for unexpected cases - use original logic but with hourly rate
      crewFee = Math.floor(PRICING_DEFAULTS.EXTRA_CREW_FEE / 4) * duration; // Convert flat fee to hourly
    }
  }
  
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
 * Calculates deposit amount and due dates based on event date and total cost
 * Business Rule: Always 25% deposit, remaining balance due 30 days before event
 * @param total Total cost in cents
 * @param eventDate Event date
 * @returns Deposit information including due dates
 */
export function calculateDeposit(total: number, eventDate: Date) {
  const today = new Date();
  const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Always use 25% deposit as per business requirements
  const depositPercent = PRICING_DEFAULTS.DEPOSIT_PERCENT; // Always 25%
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
    isFullPaymentRequired: false, // Always false since we always use 25% deposit
    daysUntilEvent,
    daysUntilBalanceDue: Math.ceil((finalDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
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