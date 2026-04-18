/**
 * Shared pricing library — single source of truth for both the
 * PricingCalculator on /pricing and the native quote flow at /quote.
 *
 * Ported from ppc-quote-builder/src/lib/pricing.ts so every price shown
 * on the cruise site agrees with every price the quote builder computes.
 * See /docs/BUSINESS_RULES.md in the seo-dashboard repo for the canonical
 * rules this implements.
 */
import { getDay, getMonth, format } from "date-fns";

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

// ═════════════════════════════════════════════════════════════════════════
// ATX DISCO CRUISE RULES
// ═════════════════════════════════════════════════════════════════════════
// Clever Girl ONLY · March 1 – October 31 · Bach parties only · per-person
// ticket model. Price is determined by the time slot you pick (NOT by a
// package tier — the old Basic/Queen/Sparkle tiers are retired).
//
// Current slots + per-person prices (tax, tip, and booking fee added on top):
//   • Friday 12–4 pm  → $95/person
//   • Saturday 11–3   → $105/person
//   • Saturday 3:30–7:30 → $85/person
//
// Upgrades are optional flat-fee add-ons ($100 each) — Bride, Groom, Sparkle
// Together, and Mimosa Party Cooler (see DISCO_ADDONS below).

/** Available disco time slots per day with their per-person price. */
export const DISCO_TIME_SLOTS = {
  friday: [
    {
      id: "fri-12-4",
      label: "Friday 12:00 PM – 4:00 PM",
      short: "Fri · 12–4pm",
      start: "12:00",
      end: "16:00",
      hours: 4,
      pricePerPerson: 95,
    },
  ],
  saturday: [
    {
      id: "sat-11-3",
      label: "Saturday 11:00 AM – 3:00 PM",
      short: "Sat · 11–3pm",
      start: "11:00",
      end: "15:00",
      hours: 4,
      pricePerPerson: 105,
    },
    {
      id: "sat-330-730",
      label: "Saturday 3:30 PM – 7:30 PM",
      short: "Sat · 3:30–7:30pm",
      start: "15:30",
      end: "19:30",
      hours: 4,
      pricePerPerson: 85,
    },
  ],
} as const;

export type DiscoSlotId =
  | (typeof DISCO_TIME_SLOTS.friday)[number]["id"]
  | (typeof DISCO_TIME_SLOTS.saturday)[number]["id"];

/** Flat-fee add-ons for the disco cruise. Every add-on is $100. */
export const DISCO_ADDONS = [
  {
    id: "bride-sparkle",
    name: "Bride Sparkle Package",
    price: 100,
    blurb:
      "Disco Ball Cup for the Bride, Bubble Gun, Disco Bopper Headband, personal Unicorn Float, SPF-50 spray, disco ball necklaces for the whole group.",
  },
  {
    id: "groom-sparkle",
    name: "Groom Manly Sparkle Package",
    price: 100,
    blurb:
      "Disco Ball Cup for the Groom, disco ball necklaces for the crew, \"Bad Day to Be a Beer\" flag, SPF-50 spray, personal Unicorn Float for the Groom.",
  },
  {
    id: "together-sparkle",
    name: "Sparkle Together Package",
    price: 100,
    blurb:
      "Disco Ball Cups for both Bride & Groom, necklaces for the crew, flag, SPF-50, two Unicorn Floats, 2 Bubble Guns, Disco Bopper Headband for the Bride.",
  },
  {
    id: "mimosa-cooler",
    name: "Mimosa Party Cooler",
    price: 100,
    blurb:
      "Large extra cooler with ice, 3 fruit juices, champagne flutes (1 per person), a Chambong, and 3 Bubble Wands.",
  },
] as const;

export type DiscoAddonId = (typeof DISCO_ADDONS)[number]["id"];

/** True if date is inside disco cruise season (March 1 – October 31). */
export function isDiscoSeason(date: Date): boolean {
  const m = getMonth(date); // 0 = Jan, 11 = Dec
  return m >= 2 && m <= 9;
}

/** True if date is a disco cruise day (Friday or Saturday). */
export function isDiscoCruiseDay(date: Date): boolean {
  const d = getDay(date);
  return d === 5 || d === 6;
}

/** True if a party type is eligible for the disco cruise (bach variants only). */
export function isDiscoEligiblePartyType(partyType: string): boolean {
  const norm = partyType.toLowerCase().replace(/[^a-z]/g, "");
  return [
    "bachelorparty",
    "bachelor",
    "bacheloretteparty",
    "bachelorette",
    "combinedbachparty",
    "combinedbach",
    "bach",
  ].includes(norm);
}

/** Full validation for a proposed disco cruise slot. Returns `null` if valid, error string otherwise. */
export function validateDiscoSlot(args: {
  date: Date;
  partyType: string;
}): string | null {
  if (!isDiscoEligiblePartyType(args.partyType)) {
    return "ATX Disco Cruise is for bachelor, bachelorette, and combined bach parties only.";
  }
  if (!isDiscoCruiseDay(args.date)) {
    return "ATX Disco Cruise runs Friday and Saturday only.";
  }
  if (!isDiscoSeason(args.date)) {
    return "ATX Disco Cruise season is March 1 – October 31.";
  }
  return null;
}

/** Look up a disco slot by id across Friday + Saturday tables. */
export function getDiscoSlot(slotId: DiscoSlotId | string) {
  return (
    DISCO_TIME_SLOTS.friday.find((s) => s.id === slotId) ||
    DISCO_TIME_SLOTS.saturday.find((s) => s.id === slotId) ||
    null
  );
}

/** Look up any disco add-on by id. */
export function getDiscoAddon(addonId: string) {
  return DISCO_ADDONS.find((a) => a.id === addonId) || null;
}

/**
 * Total for a disco ticket purchase at a specific slot, plus optional
 * flat-fee add-ons. Tax (8.25%), tip (20%), and 3% booking fee are added
 * on top of subtotal per BUSINESS_RULES.md.
 */
export function calculateDiscoPricing(args: {
  slotId: DiscoSlotId | string;
  ticketQty: number;
  addonIds?: string[];
}): {
  pricePerPerson: number;
  ticketsSubtotal: number;
  addonsSubtotal: number;
  subtotal: number;
  gratuity: number;
  tax: number;
  xolaFee: number;
  total: number;
} {
  const slot = getDiscoSlot(args.slotId);
  const pricePerPerson = slot?.pricePerPerson ?? 0;
  const ticketsSubtotal = pricePerPerson * args.ticketQty;
  const addonsSubtotal = (args.addonIds ?? []).reduce((sum, id) => {
    const a = getDiscoAddon(id);
    return sum + (a?.price ?? 0);
  }, 0);
  const subtotal = ticketsSubtotal + addonsSubtotal;
  const gratuity = subtotal * 0.2;
  const tax = subtotal * 0.0825;
  const xolaFee = (subtotal + gratuity) * 0.03;
  const total = subtotal + gratuity + tax + xolaFee;
  return {
    pricePerPerson,
    ticketsSubtotal,
    addonsSubtotal,
    subtotal,
    gratuity,
    tax,
    xolaFee,
    total,
  };
}

// ═════════════════════════════════════════════════════════════════════════
// PRIVATE CRUISE PACKAGES (Essential + Ultimate, by capacity tier)
// ═════════════════════════════════════════════════════════════════════════
// Mirrors the `packageDetails14/25/50` structure from the quote-v2 app. The
// capacity tier is inferred from the boat (14 = Day Tripper, 25 = Meeseeks/
// Irony, 50 = Clever Girl).

export type PrivatePackageTier = "essentials" | "ultimate";
export type CapacityTier = 14 | 25 | 50;

export const PRIVATE_PACKAGE_DETAILS: Record<
  CapacityTier,
  Record<PrivatePackageTier, { price: number; items: string[] }>
> = {
  14: {
    essentials: {
      price: 100,
      items: [
        "3 Bubble Wands",
        "6-Foot Folding Table",
        "(2) Large Coolers",
        "40lbs of Ice",
        "5-Gallon Water Dispenser",
        "10 Gallons of Water",
        "25 Solo Cups",
      ],
    },
    ultimate: {
      price: 250,
      items: [
        "Personal Unicorn Float",
        "(3) Disco Balls Installed",
        "Bubble Gun",
        "3 Bubble Wands",
        "6'x20' Lily Pad Float",
        "3 Disco Ball Cups",
        "20 Champagne Flutes",
        "3 Fruit Juices",
        "2 Coolers",
        "40 lbs of Ice",
        "15 Gallons of Water",
        "5-Gallon Water Dispenser",
        "30 Solo Cups",
        "2 Bottles of SPF-50 Spray Sunscreen",
      ],
    },
  },
  25: {
    essentials: {
      price: 150,
      items: [
        "3 Bubble Wands",
        "6-Foot Folding Table",
        "(3) Large Coolers",
        "60lbs of Ice",
        "5-Gallon Water Dispenser",
        "15 Gallons of Water",
        "50 Solo Cups",
      ],
    },
    ultimate: {
      price: 300,
      items: [
        "(2) Personal Unicorn Floats",
        "(3) Disco Balls Installed",
        "Bubble Gun",
        "(3) Bubble Wands",
        "(2) 6'x20' Lily Pad Floats",
        "(5) Disco Ball Cups",
        "30 Champagne Flutes",
        "3 Fruit Juices",
        "3 Coolers",
        "60lbs of Ice",
        "15 Gallons of Water",
        "5-Gallon Water Dispenser",
        "50 Solo Cups",
        "2 Bottles of SPF-50 Spray Sunscreen",
      ],
    },
  },
  50: {
    essentials: {
      price: 200,
      items: [
        "3 Bubble Wands",
        "(2) 6-Foot Folding Tables",
        "(3) 5-ft Coolers",
        "80lbs of Ice",
        "5-Gallon Water Dispenser",
        "15 Gallons of Water",
        "75 Solo Cups",
      ],
    },
    ultimate: {
      price: 350,
      items: [
        "(3) Personal Unicorn Floats",
        "(2) Bubble Guns",
        "(3) 6'x20' Lily Pad Floats",
        "(5) Disco Ball Cups",
        "50 Champagne Flutes",
        "3 Fruit Juices",
        "3 Giant Coolers",
        "80 lbs of Ice",
        "15 Gallons of Water",
        "5-Gallon Water Dispenser",
        "75 Solo Cups",
        "4 Bottles of SPF-50 Spray Sunscreen",
      ],
    },
  },
};

/** Pick the matching capacity tier for a guest count. */
export function getCapacityTier(guestCount: number): CapacityTier {
  if (guestCount <= 14) return 14;
  if (guestCount <= 30) return 25;
  return 50;
}

/** Get the Essential / Ultimate packages available to a given group size. */
export function getPrivatePackages(guestCount: number) {
  const tier = getCapacityTier(guestCount);
  return PRIVATE_PACKAGE_DETAILS[tier];
}
