/**
 * Shared pricing library — single source of truth for both the
 * PricingCalculator on /pricing and the native quote flow at /quote.
 *
 * Ported from ppc-quote-builder/src/lib/pricing.ts so every price shown
 * on the cruise site agrees with every price the quote builder computes.
 * See /docs/BUSINESS_RULES.md in the seo-dashboard repo for the canonical
 * rules this implements.
 */
import { getDay, format } from "date-fns";

export interface PricingParams {
  date: Date;
  guestCount: number;
  duration: number;
}

export interface PricingResult {
  hourlyRate: number;
  additionalCrewFee: number;
  subtotal: number;
  xolaFee: number;
  tax: number;
  gratuity: number;
  total: number;
}

// Date-specific flat-rate overrides (quoted per 4-hour cruise, stored as hourly).
// Keep in sync with the quote builder; add holiday dates as they're priced.
const DATE_OVERRIDES: Record<string, Record<string, number>> = {
  "2026-05-24": { "14": 350, "30": 375 },
  "2026-05-25": { "14": 250, "30": 275, "75": 300 },
};

/**
 * Base hourly rate for the given date + guest tier, excluding crew upgrades.
 * Tiers: 1-14 (Day Tripper) · 15-30 (Meeseeks/Irony) · 31-75 (Clever Girl).
 */
export function getBaseHourlyRate(date: Date, guestCount: number): number {
  const dayOfWeek = getDay(date);
  const dateStr = format(date, "yyyy-MM-dd");

  const override = DATE_OVERRIDES[dateStr];
  if (override) {
    if (guestCount <= 14 && override["14"]) return override["14"];
    if (guestCount <= 30 && override["30"]) return override["30"];
    if (guestCount > 30 && override["75"]) return override["75"];
  }

  // Mon–Thu
  if (dayOfWeek >= 1 && dayOfWeek <= 4) {
    if (guestCount <= 14) return 200;
    if (guestCount <= 30) return 225;
    return 250;
  }
  // Fri
  if (dayOfWeek === 5) {
    if (guestCount <= 14) return 225;
    if (guestCount <= 30) return 250;
    return 275;
  }
  // Sat
  if (dayOfWeek === 6) {
    if (guestCount <= 14) return 350;
    if (guestCount <= 30) return 375;
    return 400;
  }
  // Sun
  if (guestCount <= 14) return 250;
  if (guestCount <= 30) return 275;
  return 300;
}

/**
 * Calculate a full price breakdown. Crew fee is NOT auto-added; pass it in
 * explicitly when booking 26-30 on Meeseeks/Irony (+$50/hr) or 51-75 on
 * Clever Girl (+$100/hr).
 */
export function calculatePricing(
  params: PricingParams & { crewFeePerHour?: number; discount?: number },
): PricingResult {
  const { date, guestCount, duration, crewFeePerHour = 0, discount = 0 } = params;
  const hourlyRate = getBaseHourlyRate(date, guestCount);
  const additionalCrewFee = crewFeePerHour * duration;

  const preDiscountSubtotal = hourlyRate * duration + additionalCrewFee;
  const subtotal = Math.max(0, preDiscountSubtotal - discount);

  const gratuity = subtotal * 0.2;
  const xolaFee = (subtotal + gratuity) * 0.03;
  const tax = preDiscountSubtotal * 0.0825;
  const total = subtotal + gratuity + xolaFee + tax;

  return { hourlyRate, additionalCrewFee, subtotal, gratuity, xolaFee, tax, total };
}

/**
 * Recommended boat for a party of N. Used by both the calculator display
 * and the quote flow's Step 4 boat suggestion.
 */
export function getRecommendedBoat(guestCount: number): {
  name: string;
  capacity: string;
  crewFeeNote?: string;
} {
  if (guestCount <= 14) {
    return { name: "Day Tripper", capacity: "Up to 14 guests" };
  }
  if (guestCount <= 30) {
    return {
      name: "Meeseeks · The Irony",
      capacity: "15–30 guests each",
      crewFeeNote: guestCount >= 26 ? "+$50/hr extra crew for 26–30 guests" : undefined,
    };
  }
  return {
    name: "Clever Girl",
    capacity: "31–75 guests",
    crewFeeNote: guestCount >= 51 ? "+$100/hr extra crew for 51–75 guests" : undefined,
  };
}

/**
 * Crew fee per hour based on guest count (auto). Call sites that want
 * to default the crew fee can use this; call sites that want explicit
 * opt-in should pass 0 and expose a UI toggle.
 */
export function getAutoCrewFeePerHour(guestCount: number): number {
  if (guestCount >= 26 && guestCount <= 30) return 50;
  if (guestCount >= 51 && guestCount <= 75) return 100;
  return 0;
}

/**
 * Minimum cruise length in hours by day of week.
 * Saturday + Sunday minimum 4h; weekdays 3h.
 */
export function getMinDuration(date: Date): number {
  const dow = getDay(date);
  return dow === 0 || dow === 6 ? 4 : 3;
}
