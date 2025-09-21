/**
 * Centralized pricing logic for Premier Party Cruises
 * Ensures consistent pricing calculations across client and server
 */

import { HOURLY_RATES, CRUISE_DURATIONS, PRICING_DEFAULTS, PRIVATE_CRUISE_PRICING, DISCO_PRICING } from './constants';

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
  // Updated crew fee calculation based on task specifications:
  // - 26-30 person groups (tier 30): +$50/hr crew fee (additional $200 for 4hr cruise)
  // - 51-75 person groups (tier 75): +$75/hr crew fee (additional $300 for 4hr cruise)
  if (capacityTier === 30 && groupSize >= 26 && groupSize <= 30) {
    crewFee = PRICING_DEFAULTS.CREW_FEE_26_30 * duration; // $50/hr * duration
  } else if (capacityTier === 75 && groupSize >= 51 && groupSize <= 75) {
    crewFee = PRICING_DEFAULTS.CREW_FEE_51_75 * duration; // $75/hr * duration
  }
  // 14-person, 25-person boats don't have crew fee expansion options
  
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
 * @returns Complete pricing breakdown using new structure
 */
export function calculatePackagePricing(date: Date, groupSize: number, packageType: 'standard' | 'essentials' | 'ultimate' = 'standard') {
  const capacityTier = getCapacityTier(groupSize);
  const packagePricing = getPackagePricing(capacityTier, packageType, date);
  const duration = getCruiseDuration(date);
  
  // Use the pre-calculated total price from the pricing structure
  const totalPrice = packagePricing.totalPrice;
  
  // Calculate deposit information
  const deposit = calculateDeposit(totalPrice, date);
  
  return {
    packageType,
    packageName: packagePricing.name,
    packageDescription: packagePricing.description,
    capacity: packagePricing.capacity,
    groupSize,
    baseHourlyRate: packagePricing.baseHourlyRate,
    duration,
    addOnCost: packagePricing.addOn,
    crewFeePerHour: packagePricing.crewFeePerHour,
    totalCrewFee: packagePricing.crewFeePerHour * duration,
    totalPrice,
    ...deposit,
    perPersonCost: Math.floor(totalPrice / groupSize),
    breakdown: {
      capacityTier,
      packageType,
      baseHourlyRate: packagePricing.baseHourlyRate,
      duration,
      addOnCost: packagePricing.addOn,
      crewFee: packagePricing.crewFeePerHour * duration,
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