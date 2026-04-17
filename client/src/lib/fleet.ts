/**
 * Single source of truth for the Premier Party Cruises fleet.
 *
 * ⚠️  Every page, FAQ, schema block, and chatbot prompt should import from
 * here rather than hard-coding capacities / prices. When this file changes,
 * the entire V2 site updates consistently.
 *
 * Source: Brian Hill, owner (2026-04-17).
 */

export type Boat = {
  id: 'day-tripper' | 'meeseeks' | 'the-irony' | 'clever-girl';
  name: string;
  subtitle: string;
  capacityMin: number;
  capacityStandard: number; // the normal cap
  capacityMax: number;      // upgradeable cap if different
  /** Extra $/hr charged when booking above capacityStandard (for legally-required crew) */
  upgradeSurchargePerHour: number;
  hourlyRateMin: number;
  hourlyRateMax: number;
  minCharterHours: number;
  image: string; // path relative to /attached_assets
  shortDescription: string;
  highlights: string[];
};

export const FLEET: Boat[] = [
  {
    id: 'day-tripper',
    name: 'Day Tripper',
    subtitle: 'Intimate — up to 14 guests',
    capacityMin: 1,
    capacityStandard: 14,
    capacityMax: 14, // HARD cap — no upgrade, must move to a bigger boat
    upgradeSurchargePerHour: 0,
    hourlyRateMin: 200,
    hourlyRateMax: 350,
    minCharterHours: 4,
    image: '/attached_assets/day-tripper-14-person-boat.webp',
    shortDescription:
      'Our smallest vessel, perfect for proposals, couples, and groups up to 14. Groups over 14 must upgrade to a larger boat.',
    highlights: ['Intimate deck', 'Covered seating', 'Premium sound system', 'Swim-stop access'],
  },
  {
    id: 'meeseeks',
    name: 'Meeseeks',
    subtitle: 'Mid-size single-deck — 25 guests (up to 30 with extra crew)',
    capacityMin: 1,
    capacityStandard: 25,
    capacityMax: 30,
    upgradeSurchargePerHour: 50, // 26–30 requires one more crew member by law
    hourlyRateMin: 225,
    hourlyRateMax: 425,
    minCharterHours: 4,
    image: '/attached_assets/meeseeks-25-person-boat.webp',
    shortDescription:
      'Our most popular charter. Holds 25 comfortably; pay +$50/hour for a 26-30 guest group (legally required additional crew).',
    highlights: ['Single-deck pontoon', 'Shade canopy', 'Built-in cooler', 'Swim ladder'],
  },
  {
    id: 'the-irony',
    name: 'The Irony',
    subtitle: 'Mid-size double-deck — 25 guests (up to 30 with extra crew)',
    capacityMin: 1,
    capacityStandard: 25,
    capacityMax: 30,
    upgradeSurchargePerHour: 50,
    hourlyRateMin: 225,
    hourlyRateMax: 425,
    minCharterHours: 4,
    image: '/attached_assets/meeseeks-25-person-boat.webp', // TODO: swap to the-irony-specific photo when available
    shortDescription:
      'Our double-deck 25-guest party boat. Upper deck for dancing, lower deck for lounging. +$50/hour for 26-30 guest groups.',
    highlights: ['Double-deck pontoon', 'Upper dance deck', 'Shaded lower deck', 'Swim platform'],
  },
  {
    id: 'clever-girl',
    name: 'Clever Girl',
    subtitle: 'Flagship — 50-75 guests (no minimum, best for 30+)',
    capacityMin: 1, // there is no minimum, but best suited for 30+
    capacityStandard: 75,
    capacityMax: 75,
    upgradeSurchargePerHour: 0,
    hourlyRateMin: 250,
    hourlyRateMax: 500,
    minCharterHours: 4,
    image: '/attached_assets/clever-girl-50-person-boat.webp',
    shortDescription:
      'Our flagship — 14 disco balls, LED lighting, a full dance floor, and a giant Texas flag. No minimum, but best suited to groups over 30.',
    highlights: ['14 disco balls', 'LED lighting', 'Full dance floor', 'Giant Texas flag', 'Onboard DJ setup'],
  },
];

/**
 * Given a group size, return the recommended boat option(s) for booking UX.
 * Caveats surfaced in UI help users self-route to the right vessel.
 */
export function recommendBoats(groupSize: number): {
  primary: Boat[];
  caveat?: string;
} {
  if (groupSize <= 14) {
    return {
      primary: [FLEET[0]], // Day Tripper only
      caveat:
        'Groups of 15 or more must upgrade to Meeseeks, The Irony, or Clever Girl. Call or email to confirm.',
    };
  }
  if (groupSize <= 25) {
    return { primary: [FLEET[1], FLEET[2]] }; // Meeseeks or The Irony
  }
  if (groupSize <= 30) {
    return {
      primary: [FLEET[1], FLEET[2], FLEET[3]], // Meeseeks/Irony w/ upgrade, or Clever Girl
      caveat:
        'Booking 26–30 guests on Meeseeks or The Irony requires an extra $50/hour crew fee (legally required). Clever Girl has no upcharge and offers more space.',
    };
  }
  return { primary: [FLEET[3]] }; // Clever Girl only
}

/**
 * Disco Cruise rules. The SHARED (public-ticket) Disco Cruise is for bachelor
 * and bachelorette groups only — NOT other groups. A Private Disco Cruise
 * (the same boat / same amenities / exclusive to your group) is bookable
 * by special request for any event type.
 */
export const DISCO_CRUISE = {
  sharedAudience:
    'Exclusively for bachelor, bachelorette, and combined bach parties.',
  privateAudience:
    'Private Disco Cruise (same boat, same amenities, exclusive to your group) available by special request for any event — weddings, birthdays, corporate, anniversary.',
  runsOn: 'Clever Girl',
  season: 'March through October',
  timeSlots: [
    { day: 'Friday', hours: '12 PM – 4 PM', duration: 4, pricePerPerson: 95, note: 'Weekday rate' },
    { day: 'Saturday', hours: '11 AM – 3 PM', duration: 4, pricePerPerson: 105, note: 'Most popular' },
    { day: 'Saturday', hours: '3:30 PM – 7:30 PM', duration: 4, pricePerPerson: 85, note: 'Best value' },
  ],
  pricingIncludes:
    'Tax and gratuity included in all Disco Cruise ticket prices.',
} as const;
