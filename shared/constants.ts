/**
 * Shared constants for consistent data display across all components
 * Premier Party Cruises CRM System
 */

/**
 * Quote status labels and configurations
 */
export const QUOTE_STATUSES = {
  DRAFT: 'Draft',
  draft: 'Draft',
  SENT: 'Sent',
  sent: 'Sent',
  VIEWED: 'Viewed', 
  viewed: 'Viewed',
  ACCEPTED: 'Accepted',
  accepted: 'Accepted',
  APPROVED: 'Approved',
  approved: 'Approved',
  EXPIRED: 'Expired',
  expired: 'Expired',
  DECLINED: 'Declined',
  declined: 'Declined',
} as const;

/**
 * Invoice status labels and configurations
 */
export const INVOICE_STATUSES = {
  DRAFT: 'Draft',
  draft: 'Draft',
  OPEN: 'Open',
  open: 'Open',
  SENT: 'Sent',
  sent: 'Sent',
  PAID: 'Paid',
  paid: 'Paid',
  PARTIALLY_PAID: 'Partially Paid',
  partially_paid: 'Partially Paid',
  partial: 'Partially Paid',
  OVERDUE: 'Overdue',
  overdue: 'Overdue',
  CANCELLED: 'Cancelled',
  cancelled: 'Cancelled',
  canceled: 'Cancelled',
} as const;

/**
 * Lead/Project status labels and configurations
 */
export const LEAD_STATUSES = {
  NEW: 'New Lead',
  new: 'New Lead',
  CONTACTED: 'Contacted',
  contacted: 'Contacted',
  QUOTED: 'Quote Sent',
  quoted: 'Quote Sent',
  QUOTE_SENT: 'Quote Sent',
  quote_sent: 'Quote Sent',
  NEGOTIATING: 'Negotiating',
  negotiating: 'Negotiating',
  CLOSED_WON: 'Booking Confirmed',
  closed_won: 'Booking Confirmed',
  CONFIRMED: 'Booking Confirmed',
  confirmed: 'Booking Confirmed',
  CLOSED_LOST: 'Lost',
  closed_lost: 'Lost',
  LOST: 'Lost',
  lost: 'Lost',
} as const;

/**
 * Booking status labels and configurations
 */
export const BOOKING_STATUSES = {
  BOOKED: 'Booked',
  booked: 'Booked',
  CONFIRMED: 'Confirmed',
  confirmed: 'Confirmed',
  HOLD: 'On Hold',
  hold: 'On Hold',
  BLOCKED: 'Blocked',
  blocked: 'Blocked',
  CANCELED: 'Cancelled',
  canceled: 'Cancelled',
  CANCELLED: 'Cancelled',
  cancelled: 'Cancelled',
} as const;

/**
 * Payment status labels and configurations
 */
export const PAYMENT_STATUSES = {
  PENDING: 'Pending',
  pending: 'Pending',
  DEPOSIT_PAID: 'Deposit Paid',
  deposit_paid: 'Deposit Paid',
  FULLY_PAID: 'Fully Paid',
  fully_paid: 'Fully Paid',
  PAID: 'Paid',
  paid: 'Paid',
  UNPAID: 'Unpaid',
  unpaid: 'Unpaid',
  PARTIAL: 'Partially Paid',
  partial: 'Partially Paid',
  REFUNDED: 'Refunded',
  refunded: 'Refunded',
  FAILED: 'Failed',
  failed: 'Failed',
} as const;

/**
 * Event type labels with emojis
 */
export const EVENT_TYPES = {
  birthday: { label: 'Birthday', emoji: '🎂', description: 'Make it memorable' },
  bachelor: { label: 'Bachelor Party', emoji: '🎉', description: 'Last sail before the veil' },
  bachelorette: { label: 'Bachelorette Party', emoji: '💃', description: 'Party with the bride' },
  corporate: { label: 'Corporate Event', emoji: '💼', description: 'Team building' },
  wedding: { label: 'Wedding', emoji: '💒', description: 'Special day' },
  graduation: { label: 'Graduation', emoji: '🎓', description: 'Celebrate success' },
  anniversary: { label: 'Anniversary', emoji: '💕', description: 'Celebrate love' },
  reunion: { label: 'Reunion', emoji: '👨‍👩‍👧‍👦', description: 'Bring everyone together' },
  other: { label: 'Other Event', emoji: '🎊', description: 'Custom celebration' },
} as const;

/**
 * Cruise type labels and configurations
 */
export const CRUISE_TYPES = {
  private: { label: 'Private Cruise', description: 'Exclusive boat rental' },
  disco: { label: 'ATX Disco Cruise', description: 'Public party cruise' },
} as const;

/**
 * Disco party types for add-on filtering
 */
export const DISCO_PARTY_TYPES = {
  bachelor: 'bachelor',
  bachelorette: 'bachelorette',
  combined: 'combined',
} as const;

export type DiscoPartyType = typeof DISCO_PARTY_TYPES[keyof typeof DISCO_PARTY_TYPES];

/**
 * Boat configuration labels
 */
export const BOAT_TYPES = {
  '15': { label: '15-Person Boat', capacity: 15, description: 'Intimate gatherings' },
  '25': { label: '25-Person Boat', capacity: 25, description: 'Medium groups' },
  '50': { label: '50-Person Boat', capacity: 50, description: 'Large celebrations' },
  '75': { label: '75-Person Boat', capacity: 75, description: 'Grand events' },
} as const;

/**
 * Private Cruise Package Configurations
 * Organized by capacity tiers with three package levels each
 * Structured for easy comparison display and website integration
 */
export const PRIVATE_CRUISE_PACKAGES = {
  // 14-Person Capacity Tier
  14: {
    capacity: 14,
    seatingCapacity: 14,
    boatName: 'Intimate Cruiser',
    description: 'Perfect for intimate gatherings and small celebrations',
    packages: {
      standard: {
        id: 'standard-14',
        name: 'Standard Private Cruise',
        tagline: 'Essential cruise experience',
        description: 'Everything you need for a perfect private cruise experience with professional crew and premium amenities',
        valueProposition: 'Hassle-free cruising with all the essentials included',
        inclusions: [
          'Licensed, fun, experienced captains to take your group safely around the lake in style',
          '2 large empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)',
          'Premium Bluetooth speaker system',
          'Clean restroom facilities',
          'Comfortable seating for 14 guests',
          'Plenty of sun & shade areas'
        ],
        highlights: ['Professional crew', 'Premium sound system', 'Comfortable seating'],
        ideal_for: ['Birthday parties', 'Small celebrations', 'Intimate gatherings']
      },
      essentials: {
        id: 'essentials-14',
        name: 'Private Plus Essentials',
        tagline: 'Complete convenience package',
        description: 'All standard features plus essential refreshments and setup - perfect for worry-free entertaining',
        valueProposition: 'Complete hosting solution with refreshments and setup included',
        inclusions: [
          'Everything from Standard Cruise',
          'Insulated 5-gallon dispenser with ice water',
          '15 gallons of fresh water & 30 solo cups',
          'Coolers pre-stocked with 40lbs of ice',
          '6-ft folding table for food & drinks'
        ],
        highlights: ['Pre-stocked coolers', 'Fresh water included', 'Setup table provided'],
        ideal_for: ['Worry-free hosting', 'Food & drink service', 'Convenience-focused events'],
        mostPopular: true
      },
      ultimate: {
        id: 'ultimate-14',
        name: 'Private with Ultimate Package',
        tagline: 'Complete party experience',
        description: 'The full party package with entertainment, refreshments, and disco vibes - everything for an unforgettable celebration',
        valueProposition: 'All-inclusive party experience with entertainment and party supplies',
        inclusions: [
          'Everything from Essentials Package',
          '6x20\' giant lily pad float',
          'Unicorn or ring float for guest of honor',
          '5 disco ball cups & 30 additional solo cups',
          'Bubble gun & 3 bubble wands for fun',
          '20 champagne flutes & 3 fruit juices',
          '2 bottles SPF-50 spray sunscreen',
          '3 disco balls installed for party atmosphere'
        ],
        highlights: ['Giant lily pad float', 'Disco party atmosphere', 'Complete entertainment package'],
        ideal_for: ['Bachelorette parties', 'Birthday celebrations', 'Special occasions']
      }
    }
  },
  
  // 25-Person Capacity Tier  
  25: {
    capacity: 25,
    seatingCapacity: 20,
    boatName: 'Party Cruiser',
    description: 'Ideal for medium-sized groups and celebrations',
    packages: {
      standard: {
        id: 'standard-25',
        name: 'Standard 4-Hour Cruise',
        tagline: 'Essential cruise experience',
        description: 'Professional cruise experience with premium amenities for your medium-sized celebration',
        valueProposition: 'Spacious comfort with professional service for larger groups',
        inclusions: [
          'Licensed, fun, experienced captains to take your group safely around the lake in style',
          '2 large empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)',
          'Premium Bluetooth speaker system',
          'Clean restroom facilities',
          'Comfortable seating for 20 guests',
          'Plenty of sun & shade areas'
        ],
        highlights: ['Professional crew', 'Premium sound system', 'Spacious seating'],
        ideal_for: ['Team celebrations', 'Friend gatherings', 'Family reunions']
      },
      essentials: {
        id: 'essentials-25',
        name: '4-Hour Cruise w/Essentials Package',
        tagline: 'Complete convenience package',
        description: 'Enhanced cruise experience with refreshments and conveniences for effortless group entertaining',
        valueProposition: 'Complete group hosting solution with enhanced refreshments',
        inclusions: [
          'Everything from Standard Cruise',
          'Insulated 5-gallon dispenser with ice water',
          '20 gallons of fresh water & 50 solo cups',
          'Coolers pre-stocked with 60lbs of ice',
          '6-ft folding table for food & drinks'
        ],
        highlights: ['Enhanced refreshments', 'More ice included', 'Group-sized servings'],
        ideal_for: ['Corporate events', 'Extended celebrations', 'Group entertaining']
      },
      ultimate: {
        id: 'ultimate-25',
        name: 'Ultimate Disco Party Package',
        tagline: 'Complete party experience',
        description: 'The ultimate party package with dual entertainment floats, enhanced party supplies, and disco atmosphere',
        valueProposition: 'Premium all-inclusive party experience with enhanced entertainment',
        inclusions: [
          'Everything from Essentials Package',
          '(2) 6x20\' giant lily pad floats',
          '(2) Unicorn or ring floats for guests of honor',
          '10 disco ball cups for party vibes',
          '(2) Bubble guns & 3 bubble wands',
          '30 champagne flutes & 3 fruit juices',
          '4 bottles SPF-50 spray sunscreen',
          '30 plates, plasticware, & paper towels',
          '3 disco balls installed for party atmosphere'
        ],
        highlights: ['Dual giant floats', 'Enhanced party supplies', 'Complete disco experience'],
        ideal_for: ['Bachelor/bachelorette parties', 'Milestone celebrations', 'Group parties']
      }
    }
  },
  
  // 30-Person Capacity Tier (same as 25)
  30: {
    capacity: 30,
    seatingCapacity: 20,
    boatName: 'Party Cruiser Plus',
    description: 'Enhanced capacity for larger celebrations with same premium amenities',
    packages: {
      standard: {
        id: 'standard-30',
        name: 'Standard 4-Hour Cruise',
        tagline: 'Essential cruise experience',
        description: 'Professional cruise experience with premium amenities for your larger celebration',
        valueProposition: 'Spacious comfort with professional service for extended groups',
        inclusions: [
          'Licensed, fun, experienced captains to take your group safely around the lake in style',
          '2 large empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)',
          'Premium Bluetooth speaker system',
          'Clean restroom facilities',
          'Comfortable seating for 20 guests',
          'Plenty of sun & shade areas'
        ],
        highlights: ['Professional crew', 'Premium sound system', 'Extended capacity'],
        ideal_for: ['Large team events', 'Extended family', 'Big friend groups']
      },
      essentials: {
        id: 'essentials-30',
        name: '4-Hour Cruise w/Essentials Package',
        tagline: 'Complete convenience package',
        description: 'Enhanced cruise experience with refreshments and conveniences for effortless large group entertaining',
        valueProposition: 'Complete large group hosting solution with enhanced refreshments',
        inclusions: [
          'Everything from Standard Cruise',
          'Insulated 5-gallon dispenser with ice water',
          '20 gallons of fresh water & 50 solo cups',
          'Coolers pre-stocked with 60lbs of ice',
          '6-ft folding table for food & drinks'
        ],
        highlights: ['Large group refreshments', 'Ample ice included', 'Extended servings'],
        ideal_for: ['Corporate gatherings', 'Large celebrations', 'Group events']
      },
      ultimate: {
        id: 'ultimate-30',
        name: 'Ultimate Disco Party Package',
        tagline: 'Complete party experience',
        description: 'The ultimate party package with dual entertainment floats, enhanced party supplies, and disco atmosphere for larger groups',
        valueProposition: 'Premium all-inclusive party experience for extended celebrations',
        inclusions: [
          'Everything from Essentials Package',
          '(2) 6x20\' giant lily pad floats',
          '(2) Unicorn or ring floats for guests of honor',
          '10 disco ball cups for party vibes',
          '(2) Bubble guns & 3 bubble wands',
          '30 champagne flutes & 3 fruit juices',
          '4 bottles SPF-50 spray sunscreen',
          '30 plates, plasticware, & paper towels',
          '3 disco balls installed for party atmosphere'
        ],
        highlights: ['Dual giant floats', 'Extended party supplies', 'Large group disco experience'],
        ideal_for: ['Large bachelor/bachelorette parties', 'Major celebrations', 'Big group events']
      }
    }
  },
  
  // 50-Person Capacity Tier
  50: {
    capacity: 50,
    seatingCapacity: 30,
    boatName: 'Grand Celebration',
    description: 'Premium vessel for large celebrations and corporate events',
    packages: {
      standard: {
        id: 'standard-50',
        name: 'Standard 4-Hour Cruise',
        tagline: 'Grand cruise experience',
        description: 'Premium cruise experience with enhanced amenities for large celebrations and corporate events',
        valueProposition: 'Grand-scale cruising with professional service and premium facilities',
        inclusions: [
          'Licensed, fun, experienced captains to take your group safely around the lake in style',
          '4 giant empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)',
          'Premium Bluetooth speaker system',
          '2 clean restroom facilities',
          'Comfortable seating for 30 guests',
          'Plenty of sun & shade areas'
        ],
        highlights: ['Dual restrooms', 'Enhanced cooler capacity', 'Premium seating'],
        ideal_for: ['Corporate events', 'Large celebrations', 'Wedding parties']
      },
      essentials: {
        id: 'essentials-50',
        name: '4-Hour Cruise w/Essentials Package',
        tagline: 'Complete grand convenience',
        description: 'Premium cruise with enhanced refreshment service and dual table setup for large-scale entertaining',
        valueProposition: 'Complete large-scale hosting with enhanced infrastructure',
        inclusions: [
          'Everything from Standard Cruise',
          'Insulated 5-gallon dispenser with ice water',
          '25 gallons of fresh water & 100 solo cups',
          'Coolers pre-stocked with 80lbs of ice',
          '(2) 6-ft folding tables for food & drinks'
        ],
        highlights: ['Dual table setup', 'Large-scale refreshments', 'Enhanced ice capacity'],
        ideal_for: ['Corporate functions', 'Large family events', 'Catered celebrations']
      },
      ultimate: {
        id: 'ultimate-50',
        name: 'Ultimate Disco Party Package',
        tagline: 'Grand party experience',
        description: 'The ultimate large-scale party with triple entertainment floats, comprehensive party supplies, and spectacular disco atmosphere',
        valueProposition: 'Premium all-inclusive grand celebration experience',
        inclusions: [
          'Everything from Essentials Package',
          '(3) 6x20\' giant lily pad floats',
          '(3) Unicorn or ring floats for guests of honor',
          '15 disco ball cups for party vibes',
          '(3) Bubble guns & 5 bubble wands',
          '50 champagne flutes & 3 fruit juices',
          '6 bottles SPF-50 spray sunscreen',
          '50 plates, plasticware, & paper towels',
          '10 disco balls installed for spectacular atmosphere'
        ],
        highlights: ['Triple giant floats', 'Spectacular disco setup', 'Grand-scale party supplies'],
        ideal_for: ['Major celebrations', 'Corporate parties', 'Large wedding events']
      }
    }
  },
  
  // 75-Person Capacity Tier (same as 50)
  75: {
    capacity: 75,
    seatingCapacity: 30,
    boatName: 'Ultimate Celebration',
    description: 'Maximum capacity vessel for the grandest celebrations',
    packages: {
      standard: {
        id: 'standard-75',
        name: 'Standard 4-Hour Cruise',
        tagline: 'Ultimate cruise experience',
        description: 'Maximum capacity cruise experience with premium amenities for the grandest celebrations',
        valueProposition: 'Ultimate-scale cruising with professional service and maximum facilities',
        inclusions: [
          'Licensed, fun, experienced captains to take your group safely around the lake in style',
          '4 giant empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)',
          'Premium Bluetooth speaker system',
          '2 clean restroom facilities',
          'Comfortable seating for 30 guests',
          'Plenty of sun & shade areas'
        ],
        highlights: ['Maximum capacity', 'Dual restrooms', 'Ultimate space'],
        ideal_for: ['Major corporate events', 'Large weddings', 'Grand celebrations']
      },
      essentials: {
        id: 'essentials-75',
        name: '4-Hour Cruise w/Essentials Package',
        tagline: 'Ultimate convenience package',
        description: 'Maximum capacity cruise with ultimate refreshment service and dual table setup for grand-scale entertaining',
        valueProposition: 'Complete grand-scale hosting with ultimate infrastructure',
        inclusions: [
          'Everything from Standard Cruise',
          'Insulated 5-gallon dispenser with ice water',
          '25 gallons of fresh water & 100 solo cups',
          'Coolers pre-stocked with 80lbs of ice',
          '(2) 6-ft folding tables for food & drinks'
        ],
        highlights: ['Ultimate capacity', 'Grand-scale refreshments', 'Maximum convenience'],
        ideal_for: ['Large corporate functions', 'Grand family reunions', 'Major celebrations']
      },
      ultimate: {
        id: 'ultimate-75',
        name: 'Ultimate Disco Party Package',
        tagline: 'Maximum party experience',
        description: 'The ultimate maximum-capacity party with triple entertainment floats, comprehensive party supplies, and spectacular disco atmosphere',
        valueProposition: 'Maximum all-inclusive grand celebration experience',
        inclusions: [
          'Everything from Essentials Package',
          '(3) 6x20\' giant lily pad floats',
          '(3) Unicorn or ring floats for guests of honor',
          '15 disco ball cups for party vibes',
          '(3) Bubble guns & 5 bubble wands',
          '50 champagne flutes & 3 fruit juices',
          '6 bottles SPF-50 spray sunscreen',
          '50 plates, plasticware, & paper towels',
          '10 disco balls installed for spectacular atmosphere'
        ],
        highlights: ['Maximum entertainment', 'Spectacular disco setup', 'Ultimate party experience'],
        ideal_for: ['Grand celebrations', 'Major corporate parties', 'Ultimate wedding events']
      }
    }
  }
} as const;

/**
 * Private Cruise Package Types for easy access
 */
export const PRIVATE_PACKAGE_TYPES = {
  STANDARD: 'standard',
  ESSENTIALS: 'essentials', 
  ULTIMATE: 'ultimate'
} as const;

/**
 * Private Cruise Capacity Tiers
 */
export const PRIVATE_CAPACITY_TIERS = [14, 25, 30, 50, 75] as const;

/**
 * Package comparison data for website display
 */
export const PACKAGE_COMPARISON_FEATURES = {
  // Core Features (included in all packages)
  CORE: [
    'Experienced captain',
    'Premium sound system',
    'Clean restroom facilities',
    'Sun & shade areas'
  ],
  // Essentials additions
  ESSENTIALS_ADDITIONS: [
    'Fresh water dispenser',
    'Pre-stocked ice coolers',
    'Setup tables',
    'Cups included'
  ],
  // Ultimate additions
  ULTIMATE_ADDITIONS: [
    'Giant lily pad floats',
    'Specialty floats',
    'Disco atmosphere',
    'Party supplies',
    'Champagne service',
    'Sun protection',
    'Complete tableware'
  ]
} as const;

/**
 * Default pricing configuration
 */
export const PRICING_DEFAULTS = {
  TAX_RATE_BASIS_POINTS: 825, // 8.25%
  GRATUITY_PERCENT: 20, // Updated to 20% as per requirements
  DEPOSIT_PERCENT: 25,
  URGENCY_THRESHOLD_DAYS: 14, // Changed from 30 to 14 days
  FULL_PAYMENT_THRESHOLD_DAYS: 14,
  BASE_HOURLY_RATE: 20000, // $200.00 in cents (minimum rate)
  CREW_FEE_26_30: 20000, // $200 crew fee for 16+ people on Meeseeks The Irony (25-30 boat)
  CREW_FEE_51_75: 30000, // $300 crew fee for 40+ people on Clever Girl (50-75 boat)
} as const;

/**
 * CRITICAL PRICING CONSTANTS - SINGLE SOURCE OF TRUTH
 * These constants are used by BOTH admin display AND calculations
 * Any change here automatically updates both PricingRules.tsx AND shared/pricing.ts
 */

/**
 * Private Cruise Package Flat Fees (in cents)
 * Applied as total fees for 4-hour cruise (+$100/hour for Essentials, +$250/hour for Ultimate)
 */
export const PACKAGE_FLAT_FEES = {
  ESSENTIALS: {
    14: 10000,  // $100 flat fee (1-14 guests)
    25: 15000,  // $150 flat fee (15-25 guests)
    30: 15000,  // $150 flat fee (26-30 guests)
    50: 20000,  // $200 flat fee (31-50 guests)
    75: 20000   // $200 flat fee (51-75 guests)
  },
  ULTIMATE: {
    14: 25000,  // $250 flat fee (1-14 guests)
    25: 30000,  // $300 flat fee (15-25 guests)
    30: 30000,  // $300 flat fee (26-30 guests)
    50: 35000,  // $350 flat fee (31-50 guests)
    75: 35000   // $350 flat fee (51-75 guests)
  }
} as const;

/**
 * Crew Fee Thresholds and Amounts (in cents)
 * Applied as HOURLY fees for larger groups requiring extra crew
 */
export const CREW_FEES = {
  THRESHOLDS: {
    SMALL_BOAT_EXTRA: 26,  // 26-30 people need extra crew on 25-person boats
    LARGE_BOAT_EXTRA: 51   // 51-75 people need extra crew on 50-person boats
  },
  HOURLY_RATES: {
    SMALL_BOAT_EXTRA: 5000,  // $50/hour extra for 26-30 people
    LARGE_BOAT_EXTRA: 10000  // $100/hour extra for 51-75 people
  }
} as const;

/**
 * Add-on Fees (in cents) - ALL FLAT FEES PER CRUISE
 */
export const ADDON_FEES = {
  LILY_PAD: 5000,  // $50 flat fee per lily pad float per cruise
  PROFESSIONAL_DJ: 60000,  // $600 flat fee per cruise (not per hour)
  PROFESSIONAL_PHOTOGRAPHER: 60000  // $600 flat fee per cruise (not per hour)
} as const;

/**
 * Deposit Policies by Cruise Type (in percentages)
 */
// LEGACY CONSTANTS - Used only for validation testing
// Actual deposit calculations now use 14-day urgency policy:
// - Events >=14 days away: 25% deposit
// - Events <14 days away: 50% deposit
export const DEPOSIT_POLICIES = {
  PRIVATE: 50,  // 50% - matches urgent booking deposit (validation uses today's date)
  DISCO: 25     // 25% - matches non-urgent booking deposit
} as const;

/**
 * Standardized Boat Definitions - SINGLE SOURCE OF TRUTH
 * Fixes naming inconsistencies across the entire system
 */
export const BOATS = {
  DAY_TRIPPER: {
    id: 'boat_day_tripper',
    name: 'Day Tripper',
    displayName: 'Day Tripper',
    capacity: 14,
    seatingCapacity: 14,
    description: 'Perfect for intimate gatherings up to 14 people'
  },
  ME_SEEKS_THE_IRONY: {
    id: 'boat_me_seeks_the_irony', 
    name: 'Meeseeks The Irony',
    displayName: 'Meeseeks The Irony',
    capacity: 30, // Can handle up to 30 people
    seatingCapacity: 25,
    description: 'Ideal for medium groups of 15-30 people',
    aliases: ['Me Seek', 'Me Seek/The Irony', 'Me Seek / The Irony', 'The Irony'] // Handle legacy naming
  },
  CLEVER_GIRL: {
    id: 'boat_clever_girl',
    name: 'Clever Girl', 
    displayName: 'Clever Girl',
    capacity: 75, // Can handle up to 75 people
    seatingCapacity: 50,
    description: 'Premium vessel for large celebrations of 31-75 people'
  }
} as const;

/**
 * Boat Selection Rules by Group Size
 * Maps group sizes to appropriate boats and pricing tiers
 */
export const BOAT_SELECTION_RULES = {
  1: { boat: 'DAY_TRIPPER', pricingTier: 14, crewFeeRequired: false },
  14: { boat: 'DAY_TRIPPER', pricingTier: 14, crewFeeRequired: false },
  15: { boat: 'ME_SEEKS_THE_IRONY', pricingTier: 25, crewFeeRequired: false },
  25: { boat: 'ME_SEEKS_THE_IRONY', pricingTier: 25, crewFeeRequired: false },
  26: { boat: 'ME_SEEKS_THE_IRONY', pricingTier: 30, crewFeeRequired: true, crewFeeType: 'SMALL_BOAT_EXTRA' },
  30: { boat: 'ME_SEEKS_THE_IRONY', pricingTier: 30, crewFeeRequired: true, crewFeeType: 'SMALL_BOAT_EXTRA' },
  31: { boat: 'CLEVER_GIRL', pricingTier: 50, crewFeeRequired: false },
  50: { boat: 'CLEVER_GIRL', pricingTier: 50, crewFeeRequired: false },
  51: { boat: 'CLEVER_GIRL', pricingTier: 75, crewFeeRequired: true, crewFeeType: 'LARGE_BOAT_EXTRA' },
  75: { boat: 'CLEVER_GIRL', pricingTier: 75, crewFeeRequired: true, crewFeeType: 'LARGE_BOAT_EXTRA' }
} as const;

/**
 * Helper function to get boat selection for any group size
 */
export function getBoatForGroupSize(groupSize: number) {
  if (groupSize <= 14) return BOAT_SELECTION_RULES[14];
  if (groupSize <= 25) return BOAT_SELECTION_RULES[25];
  if (groupSize <= 30) return BOAT_SELECTION_RULES[30];
  if (groupSize <= 50) return BOAT_SELECTION_RULES[50];
  if (groupSize <= 75) return BOAT_SELECTION_RULES[75];
  throw new Error(`Group size ${groupSize} exceeds maximum capacity of 75 people`);
}

/**
 * Package Pricing Display Data for Admin Rules Page
 * Matches exactly what calculations use - SINGLE SOURCE OF TRUTH
 */
export const PACKAGE_PRICING_DISPLAY = {
  14: {
    groupSizeRange: '1-14 people',
    recommendedBoat: BOATS.DAY_TRIPPER.displayName,
    basePricing: 'Standard cruise price',
    essentialsPrice: `$${PACKAGE_FLAT_FEES.ESSENTIALS[14] / 100}`,
    ultimatePrice: `$${PACKAGE_FLAT_FEES.ULTIMATE[14] / 100}`,
    crewFee: 'No extra fee',
    notes: 'Up to 14 people max capacity'
  },
  25: {
    groupSizeRange: '15-25 people', 
    recommendedBoat: BOATS.ME_SEEKS_THE_IRONY.displayName,
    basePricing: 'Standard price',
    essentialsPrice: `$${PACKAGE_FLAT_FEES.ESSENTIALS[25] / 100}`,
    ultimatePrice: `$${PACKAGE_FLAT_FEES.ULTIMATE[25] / 100}`,
    crewFee: 'No extra fee',
    notes: 'Standard capacity range'
  },
  30: {
    groupSizeRange: '26-30 people',
    recommendedBoat: BOATS.ME_SEEKS_THE_IRONY.displayName,
    basePricing: 'Standard price',
    essentialsPrice: `$${PACKAGE_FLAT_FEES.ESSENTIALS[30] / 100}`,
    ultimatePrice: `$${PACKAGE_FLAT_FEES.ULTIMATE[30] / 100}`,
    crewFee: `+$${CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA / 100}/hour`,
    notes: 'Extra crew required for 26+ people'
  },
  50: {
    groupSizeRange: '31-50 people',
    recommendedBoat: BOATS.CLEVER_GIRL.displayName,
    basePricing: 'Standard price',
    essentialsPrice: `$${PACKAGE_FLAT_FEES.ESSENTIALS[50] / 100}`,
    ultimatePrice: `$${PACKAGE_FLAT_FEES.ULTIMATE[50] / 100}`,
    crewFee: 'No extra fee',
    notes: 'Large group capacity'
  },
  75: {
    groupSizeRange: '51-75 people',
    recommendedBoat: BOATS.CLEVER_GIRL.displayName, 
    basePricing: 'Standard price',
    essentialsPrice: `$${PACKAGE_FLAT_FEES.ESSENTIALS[75] / 100}`,
    ultimatePrice: `$${PACKAGE_FLAT_FEES.ULTIMATE[75] / 100}`,
    crewFee: `+$${CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA / 100}/hour`,
    notes: 'Large group capacity with additional crew'
  }
} as const;

/**
 * Premier Party Cruises Hourly Rate Structure
 * All rates in cents (multiply by 100)
 * Based on actual pricing data from user-provided screenshots
 * All cruises are 4 hours duration
 */
export const HOURLY_RATES = {
  // Capacity-based rates for Monday-Thursday (4 hours)
  MON_THU: {
    14: 20000,  // $200/hour - Day Tripper
    25: 22500,  // $225/hour - Meeseeks The Irony
    30: 22500,  // $225/hour - Meeseeks The Irony (same as 25p + crew fee)
    50: 25000,  // $250/hour - Clever Girl
    75: 25000,  // $250/hour - Clever Girl (same as 50p + crew fee)
  },
  // Capacity-based rates for Friday (4 hours)
  FRIDAY: {
    14: 22500,  // $225/hour - Day Tripper
    25: 25000,  // $250/hour - Meeseeks The Irony
    30: 25000,  // $250/hour - Meeseeks The Irony (same as 25p + crew fee)
    50: 27500,  // $275/hour - Clever Girl
    75: 27500,  // $275/hour - Clever Girl (same as 50p + crew fee)
  },
  // Capacity-based rates for Saturday only (4 hours) - PREMIUM PRICING
  SATURDAY: {
    14: 35000,  // $350/hour - Day Tripper
    25: 37500,  // $375/hour - Meeseeks The Irony
    30: 37500,  // $375/hour - Meeseeks The Irony (same as 25p + crew fee)
    50: 40000,  // $400/hour - Clever Girl
    75: 40000,  // $400/hour - Clever Girl (same as 50p + crew fee)
  },
  // Capacity-based rates for Sunday (4 hours)
  SUNDAY: {
    14: 25000,  // $250/hour - Day Tripper
    25: 27500,  // $275/hour - Meeseeks The Irony
    30: 27500,  // $275/hour - Meeseeks The Irony (same as 25p + crew fee)
    50: 30000,  // $300/hour - Clever Girl
    75: 30000,  // $300/hour - Clever Girl (same as 50p + crew fee)
  },
  // Legacy alias - Friday & Sunday combined (uses Friday rates for compatibility)
  FRI_SUN: {
    14: 22500,  // Friday rate
    25: 25000,
    30: 25000,
    50: 27500,
    75: 27500,
  },
  // Legacy aliases for backward compatibility
  WEEKDAY: {
    14: 20000,  // $200/hour - Day Tripper (Mon-Thu rate)
    25: 22500,  // $225/hour - Meeseeks The Irony
    30: 22500,  // $225/hour - Meeseeks The Irony
    50: 25000,  // $250/hour - Clever Girl
    75: 25000,  // $250/hour - Clever Girl
  },
  WEEKEND: {
    14: 35000,  // $350/hour - Day Tripper (Saturday rate for compatibility)
    25: 37500,  // $375/hour - Meeseeks The Irony  
    30: 37500,  // $375/hour - Meeseeks The Irony
    50: 40000,  // $400/hour - Clever Girl
    75: 40000,  // $400/hour - Clever Girl
  }
} as const;

/**
 * Cruise duration by day type (in hours)
 * Monday-Thursday: Both 3-hour and 4-hour options available
 * Friday-Sunday: Only 4-hour options available
 */
export const CRUISE_DURATIONS = {
  WEEKDAY_DEFAULT: 4, // Monday-Thursday: 4 hours (default/most popular)
  WEEKDAY_ALTERNATIVE: 3, // Monday-Thursday: 3 hours (alternative option)
  WEEKEND: 4, // Friday-Sunday: 4 hours only
  // Legacy aliases for backward compatibility
  WEEKDAY: 4, // Legacy: defaults to 4 hours for weekdays
} as const;

/**
 * ATX Disco Cruise Time Slot Pricing
 * Per-person base pricing + optional party-type specific add-ons
 * Season: March through October
 */
export const DISCO_TIME_SLOTS = [
  {
    id: 'friday-12-4pm',
    label: 'Friday 12-4pm',
    day: 'Friday',
    timeRange: '12-4pm',
    basePrice: 9500, // $95.00 per person
    priceWithTax: 12488, // $124.88 w/tax & gratuity
    badge: null,
  },
  {
    id: 'saturday-11am-3pm',
    label: 'Saturday 11am-3pm',
    day: 'Saturday',
    timeRange: '11am-3pm',
    basePrice: 10500, // $105.00 per person
    priceWithTax: 13781, // $137.81 w/tax & gratuity
    badge: 'BEST',
  },
  {
    id: 'saturday-330-730pm',
    label: 'Saturday 3:30-7:30pm',
    day: 'Saturday',
    timeRange: '3:30-7:30pm',
    basePrice: 8500, // $85.00 per person
    priceWithTax: 11156, // $111.56 w/tax & gratuity
    badge: 'FUN!',
  },
] as const;

/**
 * What's Included in EVERY ATX Disco Cruise Ticket
 * Common inclusions across all time slots and party types
 */
export const DISCO_BASE_INCLUSIONS = [
  'Party w/the BIGGEST Unicorn Float in the ENTIRE COUNTRY!',
  'Amazing DJ to keep the party bumpin\' from start to finish!',
  '3 Giant 6\'x20\' Lily Pad Floats',
  'Private Bin for All Your Group\'s Belongings!',
  'Ice Water Stations, Solo Cups, Koozies, Bubble Wands, & Name Tags!',
  'Souvenir "ATX Disco Cruise" koozies - 1st release in 2026!',
  'Professional photographer to capture the moment and send photos after the cruise!',
  'Private Cooler w/30lbs of Ice for Your Group!',
] as const;

/**
 * Party-Type Specific Necklace Inclusion
 * Varies based on whether it's bachelor, bachelorette, or combined party
 */
export const DISCO_NECKLACE_TEXT = {
  bachelor: 'Disco Ball Necklace for the Groom!',
  bachelorette: 'Disco Ball Necklace for the Bride!',
  combined: 'Disco Ball Necklaces for the Bride & Groom!',
} as const;

/**
 * ATX Disco Cruise Add-On Packages by Party Type
 * Each party type has specific add-ons available
 */
export const DISCO_ADD_ONS = {
  bachelor: [
    {
      id: 'mimosa-cooler-bachelor',
      name: 'Mimosa Party Cooler',
      price: 10000, // $100
      inclusions: [
        'Extra cooler w/ice',
        '3 fruit juices',
        'Champagne flutes',
        'Chambong',
        '3 bubble wands',
      ],
    },
    {
      id: 'groom-manly-sparkle',
      name: 'Groom Manly Sparkle Package',
      price: 10000, // $100
      inclusions: [
        'Disco ball cup for the groom (might I suggest rainbow!)',
        'Disco ball necklaces for the whole crew',
        '"Bad Day to Be a Beer" flag',
        'SPF-50 Spray Sunscreen (1 bottle per 5 people)',
        'PERSONAL Unicorn float for the groom!',
        'No, you can\'t choose a different float - deal with it bro',
      ],
    },
  ],
  bachelorette: [
    {
      id: 'mimosa-cooler-bachelorette',
      name: 'Mimosa Party Cooler',
      price: 10000, // $100
      inclusions: [
        'Extra cooler w/ice',
        '3 fruit juices',
        'Champagne flutes',
        'Chambong',
        '3 bubble wands',
      ],
    },
    {
      id: 'bride-sparkle',
      name: 'Bride Sparkle Package',
      price: 10000, // $100
      inclusions: [
        'Disco ball cup for bride!',
        'Bubble gun for the bride!',
        'Disco bopper headband for the bride!',
        'PERSONAL Unicorn float for the bride!',
        'SPF-50 Spray Sunscreen (1 bottle per 5 people)',
        'Disco ball necklaces for the whole group',
      ],
    },
  ],
  combined: [
    {
      id: 'mimosa-cooler-combined',
      name: 'Mimosa Party Cooler',
      price: 10000, // $100
      inclusions: [
        'Extra cooler w/ice',
        '3 fruit juices',
        'Champagne flutes',
        'Chambong',
        '3 bubble wands',
      ],
    },
    {
      id: 'sparkle-together',
      name: 'Sparkle Together Package',
      price: 15000, // $150
      inclusions: [
        'Disco ball cup for the Bride AND Groom',
        'Disco ball necklaces for the whole crew',
        '"Bad Day to Be a Beer" flag',
        'SPF-50 Spray Sunscreen (1 bottle per 5 people)',
        'PERSONAL Unicorn floats for the bride AND groom!',
        '(2) Bubble guns for the Bride & Groom!',
        'Disco bopper headband for the bride!',
      ],
    },
  ],
} as const;

/**
 * Helper function to get disco time slots
 */
export function getDiscoTimeSlots() {
  return DISCO_TIME_SLOTS;
}

/**
 * Helper function to get party-specific add-ons
 */
export function getPartyAddOns(partyType: DiscoPartyType) {
  return DISCO_ADD_ONS[partyType] || [];
}

/**
 * Helper function to get party-specific necklace text
 */
export function getDiscoNecklaceText(partyType: DiscoPartyType) {
  return DISCO_NECKLACE_TEXT[partyType] || DISCO_NECKLACE_TEXT.bachelorette;
}

/**
 * DEPRECATED - Legacy disco pricing for backward compatibility
 * Use DISCO_TIME_SLOTS instead
 */
export const DISCO_PRICING = {
  basic: 8500,       // DEPRECATED - Use DISCO_TIME_SLOTS
  disco_queen: 9500, // DEPRECATED - Use DISCO_TIME_SLOTS
  platinum: 10500,   // DEPRECATED - Use DISCO_TIME_SLOTS
} as const;

/**
 * Private Cruise Pricing Structure
 * Comprehensive pricing data with recalculated totals based on new formula:
 * Total = (baseRate×4 + packageFee + crewFee) + tax(8.25% on subtotal) + gratuity(20% on base only)
 */
export const PRIVATE_CRUISE_PRICING = {
  // 14-Person Capacity Tier
  14: {
    capacity: 14,
    baseHourlyRates: {
      MON_THU: 20000,  // $200/hr
      FRIDAY: 22500,   // $225/hr  
      SATURDAY: 35000, // $350/hr
      SUNDAY: 25000,   // $250/hr
    },
    packages: {
      standard: {
        name: 'Standard Private Cruise',
        description: 'Essential cruise experience with professional crew and premium amenities',
        addOn: 0, // Base package - no additional cost
        totalPrices: {
          MON_THU: 105000,  // $1,050.00
          FRIDAY: 118125,   // $1,181.25
          SATURDAY: 183750, // $1,837.50
          SUNDAY: 131250,   // $1,312.50
        }
      },
      essentials: {
        name: 'Private Plus Essentials',
        description: 'Complete convenience package with refreshments and setup',
        addOn: 10000, // +$100 flat fee per cruise
        totalPrices: {
          MON_THU: 117300,  // $1,173.00
          FRIDAY: 130425,   // $1,304.25
          SATURDAY: 196050, // $1,960.50
          SUNDAY: 143550,   // $1,435.50
        },
        mostPopular: true
      },
      ultimate: {
        name: 'Private with Ultimate Package',
        description: 'Complete party experience with entertainment and disco atmosphere',
        addOn: 25000, // +$250 flat fee per cruise
        totalPrices: {
          MON_THU: 135750,  // $1,357.50
          FRIDAY: 148875,   // $1,488.75
          SATURDAY: 214500, // $2,145.00
          SUNDAY: 162000,   // $1,620.00
        }
      }
    }
  },

  // 25-Person Capacity Tier
  25: {
    capacity: 25,
    baseHourlyRates: {
      MON_THU: 22500,  // $225/hr
      FRIDAY: 25000,   // $250/hr
      SATURDAY: 37500, // $375/hr
      SUNDAY: 27500,   // $275/hr
    },
    packages: {
      standard: {
        name: 'Standard 4-Hour Cruise',
        description: 'Professional cruise experience with premium amenities for medium groups',
        addOn: 0, // Base package
        totalPrices: {
          MON_THU: 118125,  // $1,181.25
          FRIDAY: 131250,   // $1,312.50
          SATURDAY: 196875, // $1,968.75
          SUNDAY: 144375,   // $1,443.75
        }
      },
      essentials: {
        name: '4-Hour Cruise w/Essentials Package', 
        description: 'Enhanced cruise experience with refreshments for group entertaining',
        addOn: 15000, // +$150 flat fee per cruise
        totalPrices: {
          MON_THU: 136575,  // $1,365.75
          FRIDAY: 149700,   // $1,497.00
          SATURDAY: 215325, // $2,153.25
          SUNDAY: 162825,   // $1,628.25
        }
      },
      ultimate: {
        name: 'Ultimate Disco Party Package',
        description: 'Ultimate party package with dual entertainment floats and disco atmosphere',
        addOn: 30000, // +$300 flat fee per cruise
        totalPrices: {
          MON_THU: 155025,  // $1,550.25
          FRIDAY: 168150,   // $1,681.50
          SATURDAY: 233775, // $2,337.75
          SUNDAY: 181275,   // $1,812.75
        }
      }
    }
  },

  // 30-Person Capacity Tier (25P + $200 crew fee)
  30: {
    capacity: 30,
    baseHourlyRates: {
      MON_THU: 22500,  // $225/hr (same as 25p)
      FRIDAY: 25000,   // $250/hr (same as 25p)
      SATURDAY: 37500, // $375/hr (same as 25p)
      SUNDAY: 27500,   // $275/hr (same as 25p)
    },
    crewFeePerHour: 5000, // +$50/hr = +$200 for 4hr cruise
    packages: {
      standard: {
        name: 'Standard 4-Hour Cruise',
        description: 'Professional cruise experience with enhanced capacity for larger groups',
        addOn: 0, // Base package
        totalPrices: {
          MON_THU: 138125,  // 25P: $1,181.25 + $200 crew = $1,381.25
          FRIDAY: 151250,   // 25P: $1,312.50 + $200 crew = $1,512.50
          SATURDAY: 216875, // 25P: $1,968.75 + $200 crew = $2,168.75
          SUNDAY: 164375,   // 25P: $1,443.75 + $200 crew = $1,643.75
        }
      },
      essentials: {
        name: '4-Hour Cruise w/Essentials Package',
        description: 'Enhanced cruise experience with refreshments for large group entertaining',
        addOn: 15000, // +$150 flat fee per cruise
        totalPrices: {
          MON_THU: 156575,  // 25P: $1,365.75 + $200 crew = $1,565.75
          FRIDAY: 169700,   // 25P: $1,497.00 + $200 crew = $1,697.00
          SATURDAY: 235325, // 25P: $2,153.25 + $200 crew = $2,353.25
          SUNDAY: 182825,   // 25P: $1,628.25 + $200 crew = $1,828.25
        }
      },
      ultimate: {
        name: 'Ultimate Disco Party Package',
        description: 'Ultimate party package for enhanced capacity with dual entertainment',
        addOn: 30000, // +$300 flat fee per cruise
        totalPrices: {
          MON_THU: 175025,  // 25P: $1,550.25 + $200 crew = $1,750.25
          FRIDAY: 188150,   // 25P: $1,681.50 + $200 crew = $1,881.50
          SATURDAY: 253775, // 25P: $2,337.75 + $200 crew = $2,537.75
          SUNDAY: 201275,   // 25P: $1,812.75 + $200 crew = $2,012.75
        }
      }
    }
  },

  // 50-Person Capacity Tier
  50: {
    capacity: 50,
    baseHourlyRates: {
      MON_THU: 25000,  // $250/hr
      FRIDAY: 27500,   // $275/hr
      SATURDAY: 40000, // $400/hr
      SUNDAY: 30000,   // $300/hr
    },
    packages: {
      standard: {
        name: 'Standard 4-Hour Cruise',
        description: 'Premium cruise experience with enhanced amenities for large celebrations',
        addOn: 0, // Base package
        totalPrices: {
          MON_THU: 141250,  // $1,412.50
          FRIDAY: 155375,   // $1,553.75
          SATURDAY: 226000, // $2,260.00
          SUNDAY: 169500,   // $1,695.00
        }
      },
      essentials: {
        name: '4-Hour Cruise w/Essentials Package',
        description: 'Premium cruise with enhanced refreshment service for large-scale entertaining',
        addOn: 20000, // +$200 flat fee per cruise
        totalPrices: {
          MON_THU: 167850,  // $1,678.50
          FRIDAY: 181975,   // $1,819.75
          SATURDAY: 252600, // $2,526.00
          SUNDAY: 196100,   // $1,961.00
        }
      },
      ultimate: {
        name: 'Ultimate Disco Party Package',
        description: 'Ultimate large-scale party with triple entertainment floats and spectacular atmosphere',
        addOn: 35000, // +$350 flat fee per cruise
        totalPrices: {
          MON_THU: 187800,  // $1,878.00
          FRIDAY: 201925,   // $2,019.25
          SATURDAY: 272550, // $2,725.50
          SUNDAY: 216050,   // $2,160.50
        }
      }
    }
  },

  // 75-Person Capacity Tier (50P + $400 crew fee)
  75: {
    capacity: 75,
    baseHourlyRates: {
      MON_THU: 25000,  // $250/hr (same as 50p)
      FRIDAY: 27500,   // $275/hr (same as 50p)
      SATURDAY: 40000, // $400/hr (same as 50p)
      SUNDAY: 30000,   // $300/hr (same as 50p)
    },
    crewFeePerHour: 10000, // +$100/hr = +$400 for 4hr cruise
    packages: {
      standard: {
        name: 'Standard 4-Hour Cruise',
        description: 'Maximum capacity cruise experience for the grandest celebrations',
        addOn: 0, // Base package  
        totalPrices: {
          MON_THU: 181250,  // 50P: $1,412.50 + $400 crew = $1,812.50
          FRIDAY: 195375,   // 50P: $1,553.75 + $400 crew = $1,953.75
          SATURDAY: 266000, // 50P: $2,260.00 + $400 crew = $2,660.00
          SUNDAY: 209500,   // 50P: $1,695.00 + $400 crew = $2,095.00
        }
      },
      essentials: {
        name: '4-Hour Cruise w/Essentials Package',
        description: 'Maximum capacity cruise with ultimate refreshment service',
        addOn: 20000, // +$200 flat fee per cruise
        totalPrices: {
          MON_THU: 207850,  // 50P: $1,678.50 + $400 crew = $2,078.50
          FRIDAY: 221975,   // 50P: $1,819.75 + $400 crew = $2,219.75
          SATURDAY: 292600, // 50P: $2,526.00 + $400 crew = $2,926.00
          SUNDAY: 236100,   // 50P: $1,961.00 + $400 crew = $2,361.00
        }
      },
      ultimate: {
        name: 'Ultimate Disco Party Package',
        description: 'Maximum all-inclusive grand celebration experience',
        addOn: 35000, // +$350 flat fee per cruise
        totalPrices: {
          MON_THU: 227800,  // 50P: $1,878.00 + $400 crew = $2,278.00
          FRIDAY: 241925,   // 50P: $2,019.25 + $400 crew = $2,419.25
          SATURDAY: 312550, // 50P: $2,725.50 + $400 crew = $3,125.50
          SUNDAY: 256050,   // 50P: $2,160.50 + $400 crew = $2,560.50
        }
      }
    }
  }
} as const;

/**
 * Comprehensive Pricing Policies for Premier Party Cruises
 * Includes deposit rules, payment terms, cancellation policy, and legal information
 * Based on user-provided policy specifications
 */
export const PRICING_POLICIES = {
  deposit: {
    standard: {
      percentage: 25,
      description: 'Standard deposit for bookings made 14+ days before cruise',
      balancePercentage: 75,
      balanceDueDays: 14,
      title: 'Standard Booking (14+ days before cruise)',
      subtitle: '25% deposit to secure, 75% due 14 days before cruise'
    },
    urgent: {
      percentage: 50,
      description: 'Higher deposit required for bookings made less than 14 days before cruise',
      paymentWindow: 48, // hours to pay after booking
      balancePercentage: 50,
      balanceDueDays: 3, // 3 days after booking or 48 hours
      title: 'Urgent Booking (less than 14 days before cruise)',
      subtitle: '50% deposit required, balance due within 48 hours or 3 days after booking'
    }
  },
  balance: {
    standardDueDays: 14, // days before cruise when remaining balance is due
    description: 'Remaining balance due 14 days before cruise date',
    urgentDueHours: 48, // hours for urgent bookings
    urgentDescription: 'Balance due within 48 hours of booking (or 3 days after booking)'
  },
  thresholds: {
    urgentBookingDays: 14, // booking within this many days requires higher deposit
    fullPaymentDays: 14, // booking within this many days may require full payment
  },
  paymentTerms: {
    acceptedMethods: [
      'Credit Card (Visa, Mastercard, American Express)',
      'Debit Card',
      'Bank Transfer (ACH)',
      'Business Check (with approval)'
    ],
    processingTime: {
      creditCard: 'Instant',
      bankTransfer: '1-3 business days',
      check: '5-7 business days to clear'
    },
    securityNote: 'All payments are processed securely'
  },
  cancellation: {
    policy: 'Cancellation and refund terms vary by booking date and circumstances',
    contactRequired: true,
    timeline: {
      '45+ days': 'Contact for potential refund options',
      '30-44 days': 'Partial refund may be available',
      '14-29 days': 'Limited refund options',
      'Under 14 days': 'Contact for weather or emergency cancellations only'
    },
    weatherPolicy: 'Full refund or reschedule for weather-related cancellations',
    contactInfo: {
      phone: '(512) 488-5892',
      email: 'clientservices@premierpartycruises.com',
      hours: 'Mon-Fri 9AM-6PM, Sat-Sun 10AM-4PM'
    }
  },
  terms: {
    confirmationRequired: true,
    invoiceGeneration: 'automatic',
    paymentMethods: ['credit_card', 'bank_transfer', 'check'],
    depositRefundable: false,
    gratuityIncluded: true,
    gratuityPercentage: 20,
    taxRate: 8.25,
    bookingAgreement: 'Booking constitutes acceptance of all terms and conditions',
    ageRequirement: '21+ for alcohol service, all ages welcome',
    capacityLimits: 'Strict capacity limits enforced for safety'
  },
  contact: {
    bookingQuestions: {
      phone: '(512) 488-5892',
      email: 'clientservices@premierpartycruises.com',
      text: '(512) 488-5892'
    },
    policyQuestions: {
      email: 'clientservices@premierpartycruises.com',
      phone: '(512) 488-5892'
    },
    emergencyContact: {
      phone: '(512) 488-5892',
      available: '24/7 for booked cruises'
    },
    businessHours: 'Monday-Friday 9AM-6PM, Saturday-Sunday 10AM-4PM CST'
  },
  legal: {
    termsUrl: '/terms-conditions',
    privacyUrl: '/privacy-policy',
    disclaimer: 'Prices subject to change. Final pricing confirmed upon booking.',
    liability: 'Limited liability coverage included. Additional insurance available.',
    disputes: 'Disputes resolved through Austin, Texas jurisdiction',
    lastUpdated: '2024-09-19'
  }
} as const;

/**
 * Time slot configurations
 */
export const TIME_SLOTS = {
  PRIVATE: {
    weekday: ['11:00', '15:00', '19:00'],
    friday: ['11:00', '15:00', '19:00'],
    saturday: ['11:00', '15:00', '19:00'],
    sunday: ['11:00', '15:00', '19:00'],
  },
  DISCO: {
    friday: ['19:00'],
    saturday: ['19:00'],
    sunday: ['15:00'],
  },
} as const;

/**
 * Badge variant configurations for consistent UI
 */
export const BADGE_VARIANTS = {
  QUOTE: {
    draft: 'secondary',
    sent: 'default', 
    viewed: 'outline',
    accepted: 'default',
    approved: 'default',
    expired: 'destructive',
    declined: 'destructive',
  },
  INVOICE: {
    draft: 'secondary',
    open: 'default',
    sent: 'default',
    paid: 'default',
    partial: 'default',
    overdue: 'destructive',
    cancelled: 'secondary',
  },
  BOOKING: {
    booked: 'default',
    confirmed: 'default',
    hold: 'outline',
    blocked: 'secondary',
    cancelled: 'destructive',
  },
  PAYMENT: {
    pending: 'outline',
    paid: 'default',
    partial: 'default',
    unpaid: 'destructive',
    failed: 'destructive',
  },
} as const;

/**
 * Color configurations for status displays
 */
export const STATUS_COLORS = {
  SUCCESS: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  WARNING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  DANGER: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  INFO: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  NEUTRAL: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  SECONDARY: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
} as const;

/**
 * Form validation messages
 */
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address (e.g., name@example.com)',
  INVALID_PHONE: 'Please enter a valid phone number (e.g., (555) 123-4567)',
  MIN_GROUP_SIZE: 'Group size must be at least 1 person',
  MAX_GROUP_SIZE: 'Group size exceeds boat capacity',
  FUTURE_DATE: 'Event date must be in the future',
  INVALID_TIME_SLOT: 'Please select a valid time slot',
  INVALID_AMOUNT: 'Please enter a valid amount',
} as const;

/**
 * Loading and empty state messages
 */
export const UI_MESSAGES = {
  LOADING: 'Loading...',
  LOADING_QUOTES: 'Loading quotes...',
  LOADING_INVOICES: 'Loading invoices...',
  LOADING_BOOKINGS: 'Loading bookings...',
  NO_RESULTS: 'No results found',
  NO_QUOTES: 'No quotes found',
  NO_INVOICES: 'No invoices found',
  NO_BOOKINGS: 'No bookings found',
  ERROR_LOADING: 'Error loading data. Please try again.',
  UNAUTHORIZED: 'You are not authorized to view this content.',
  NOT_FOUND: 'The requested resource was not found.',
} as const;

/**
 * Action button labels
 */
export const ACTION_LABELS = {
  VIEW: 'View',
  EDIT: 'Edit',
  DELETE: 'Delete',
  SEND: 'Send',
  RESEND: 'Resend',
  DOWNLOAD: 'Download',
  CLONE: 'Clone',
  ACCEPT: 'Accept',
  DECLINE: 'Decline',
  APPROVE: 'Approve',
  CANCEL: 'Cancel',
  SAVE: 'Save',
  SAVE_DRAFT: 'Save Draft',
  SEND_QUOTE: 'Send Quote',
  CREATE_INVOICE: 'Create Invoice',
  SEND_REMINDER: 'Send Reminder',
  MARK_PAID: 'Mark Paid',
  RECORD_PAYMENT: 'Record Payment',
} as const;

/**
 * Navigation labels
 */
export const NAVIGATION_LABELS = {
  DASHBOARD: 'Dashboard',
  LEADS: 'Leads',
  QUOTES: 'Quotes', 
  INVOICES: 'Invoices',
  BOOKINGS: 'Bookings',
  CUSTOMERS: 'Customers',
  PRODUCTS: 'Products',
  TEMPLATES: 'Templates',
  SETTINGS: 'Settings',
  ANALYTICS: 'Analytics',
} as const;

/**
 * Disco vs Private Cruise Comparison Logic
 * Intelligent comparison system that considers group size, day of week, and pricing scenarios
 * User specifically noted that disco cruises are NOT always cheaper - we need accurate analysis
 */

/**
 * Private cruise final pricing (including tax & gratuity) by day type and capacity
 * Based on actual pricing data provided by user
 */
export const PRIVATE_CRUISE_FINAL_PRICES = {
  // Monday-Thursday BASE prices (Standard package, 4-hour cruise)
  // Rate: 1-14: $200/hr, 15-25: $250/hr, 31-50: $300/hr
  // These are BASE prices - tax (8.25%) and gratuity (20%) will be added by calculator
  MON_THU: {
    14: 80000, // $200/hr × 4hrs = $800 base
    25: 100000, // $250/hr × 4hrs = $1,000 base
    50: 120000, // $300/hr × 4hrs = $1,200 base
  },
  // Friday BASE prices (Standard package, 4-hour cruise)
  // Rate: 1-14: $225/hr, 15-25: $250/hr, 31-50: $300/hr
  FRIDAY: {
    14: 90000, // $225/hr × 4hrs = $900 base
    25: 100000, // $250/hr × 4hrs = $1,000 base
    50: 120000, // $300/hr × 4hrs = $1,200 base
  },
  // Saturday BASE prices (Standard package, 4-hour cruise) - PREMIUM PRICING
  // Rate: 1-14: $350/hr, 15-25: $375/hr, 31-50: $400/hr
  SATURDAY: {
    14: 140000, // $350/hr × 4hrs = $1,400 base
    25: 150000, // $375/hr × 4hrs = $1,500 base
    50: 160000, // $400/hr × 4hrs = $1,600 base
  },
  // Sunday BASE prices (Standard package) - same as Monday-Thursday
  SUNDAY: {
    14: 80000, // $200/hr × 4hrs = $800 base
    25: 100000, // $250/hr × 4hrs = $1,000 base
    50: 120000, // $300/hr × 4hrs = $1,200 base
  }
} as const;

/**
 * Disco package availability and pricing
 */
export const DISCO_AVAILABILITY = {
  // Disco cruises only available Friday & Saturday
  AVAILABLE_DAYS: [5, 6], // Friday=5, Saturday=6
  PACKAGES: {
    basic: {
      name: 'Basic Bach Package',
      pricePerPerson: 8500, // $85.00
      description: 'BYOB & Keep it Cheap - ALWAYS Cheaper than a Private Cruise'
    },
    disco_queen: {
      name: 'Disco Queen/King Package', 
      pricePerPerson: 9500, // $95.00
      description: 'Private Cooler & Reserved Spot for Your Group'
    },
    platinum: {
      name: 'Super Sparkle Platinum Disco',
      pricePerPerson: 10500, // $105.00
      description: 'Nothing to Carry, Cooler Stocked w/drinks When You Arrive!'
    }
  }
} as const;

/**
 * Group size categories for comparison analysis
 */
export const GROUP_SIZE_CATEGORIES = {
  SMALL: { min: 8, max: 12, label: 'Small Group', description: 'Intimate gatherings' },
  MEDIUM: { min: 13, max: 25, label: 'Medium Group', description: 'Standard parties' },
  LARGE: { min: 26, max: 50, label: 'Large Group', description: 'Big celebrations' },
  XLARGE: { min: 51, max: 75, label: 'Extra Large Group', description: 'Grand events' }
} as const;

/**
 * Day type mapping for comparison analysis
 */
export const DAY_COMPARISON_TYPES = {
  WEEKDAY: { days: [1, 2, 3, 4], label: 'Weekday', description: 'Monday-Thursday' },
  FRIDAY: { days: [5], label: 'Friday', description: 'Friday night party' },
  SATURDAY: { days: [6], label: 'Saturday', description: 'Peak weekend pricing' },
  SUNDAY: { days: [0], label: 'Sunday', description: 'Sunday funday' }
} as const;

/**
 * Disco vs Private Cruise Comparison Functions
 */

/**
 * Determines if disco cruises are available on a given day
 * @param dayOfWeek Day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
 * @returns boolean indicating if disco is available
 */
export function isDiscoAvailableOnDay(dayOfWeek: number): boolean {
  return DISCO_AVAILABILITY.AVAILABLE_DAYS.includes(dayOfWeek as 5 | 6);
}

/**
 * Gets the appropriate private cruise capacity tier for a group size
 * @param groupSize Number of people
 * @returns Capacity tier (14, 25, or 50)
 */
export function getPrivateCruiseCapacityTier(groupSize: number): 14 | 25 | 50 {
  if (groupSize <= 14) return 14;
  if (groupSize <= 25) return 25;
  return 50;
}

/**
 * Gets the day type for private cruise pricing
 * @param dayOfWeek Day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
 * @returns Day type key for pricing lookup
 */
export function getPrivateCruiseDayType(dayOfWeek: number): keyof typeof PRIVATE_CRUISE_FINAL_PRICES {
  if (dayOfWeek >= 1 && dayOfWeek <= 4) return 'MON_THU';
  if (dayOfWeek === 5) return 'FRIDAY';
  if (dayOfWeek === 6) return 'SATURDAY';
  return 'SUNDAY'; // dayOfWeek === 0
}

/**
 * Calculates disco cruise total cost for a group
 * @param groupSize Number of people
 * @param packageType Disco package type
 * @returns Total cost in cents including tax and gratuity
 */
export function calculateDiscoPrice(
  groupSize: number, 
  packageType: keyof typeof DISCO_AVAILABILITY.PACKAGES
): number {
  const pricePerPerson = DISCO_AVAILABILITY.PACKAGES[packageType].pricePerPerson;
  const subtotal = pricePerPerson * groupSize;
  
  // APPLY TAX AND GRATUITY
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000)); // 8.25%
  const gratuity = Math.floor(subtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100)); // 20%
  const total = subtotal + tax + gratuity;
  
  return total; // Return TOTAL including tax and gratuity, not just subtotal
}

/**
 * Calculates private cruise cost for a group on a specific day
 * @param groupSize Number of people
 * @param dayOfWeek Day of week (0=Sunday, 1=Monday, ..., 6=Saturday) 
 * @param packageType Private package type (standard/essentials/ultimate)
 * @returns Cost breakdown object including tax and gratuity
 */
export function calculatePrivatePrice(
  groupSize: number, 
  dayOfWeek: number,
  packageType: 'standard' | 'essentials' | 'ultimate' = 'standard'
): {
  basePrice: number;
  addOnCost: number;
  subtotal: number;
  tax: number;
  gratuity: number;
  totalPrice: number;
  capacityTier: 14 | 25 | 50;
  dayType: string;
  perPersonCost: number;
} {
  const capacityTier = getPrivateCruiseCapacityTier(groupSize);
  const dayType = getPrivateCruiseDayType(dayOfWeek);
  const basePrice = PRIVATE_CRUISE_FINAL_PRICES[dayType][capacityTier];
  
  // Add-on costs: FLAT fees per cruise (not percentage-based)
  const flatAddOnFees = {
    14: { essentials: 10000, ultimate: 25000 },  // $100, $250
    25: { essentials: 15000, ultimate: 30000 },  // $150, $300
    50: { essentials: 20000, ultimate: 35000 }   // $200, $350
  };
  
  let addOnCost = 0;
  if (packageType === 'essentials') {
    addOnCost = flatAddOnFees[capacityTier].essentials;
  } else if (packageType === 'ultimate') {
    addOnCost = flatAddOnFees[capacityTier].ultimate;
  }
  
  const subtotal = basePrice + addOnCost;
  
  // APPLY TAX AND GRATUITY
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000)); // 8.25%
  const gratuity = Math.floor(subtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100)); // 20%
  const totalPrice = subtotal + tax + gratuity;
  
  return {
    basePrice,
    addOnCost,
    subtotal,
    tax,
    gratuity,
    totalPrice, // Now includes tax and gratuity
    capacityTier,
    dayType,
    perPersonCost: Math.floor(totalPrice / groupSize) // Per person based on TOTAL
  };
}

/**
 * Compares disco vs private cruise pricing for a specific scenario
 * @param groupSize Number of people
 * @param dayOfWeek Day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
 * @param discoPackage Disco package type
 * @param privatePackage Private package type
 * @returns Comprehensive comparison object
 */
export function compareDiscoVsPrivate(
  groupSize: number,
  dayOfWeek: number,
  discoPackage: keyof typeof DISCO_AVAILABILITY.PACKAGES = 'basic',
  privatePackage: 'standard' | 'essentials' | 'ultimate' = 'standard'
): {
  discoOption: {
    available: boolean;
    totalCost: number | null;
    costPerPerson: number | null;
    packageName: string;
    description: string;
  };
  privateOption: {
    available: boolean;
    totalCost: number;
    costPerPerson: number;
    packageName: string;
    capacityTier: number;
    dayType: string;
    addOnCost: number;
  };
  comparison: {
    discoIsAvailable: boolean;
    discoCheaper: boolean | null;
    savings: number | null; // Positive = disco saves money, Negative = private saves money
    savingsPercentage: number | null;
    recommendation: 'disco' | 'private' | 'private_only';
    reasonCode: string;
  };
  valueProposition: string;
} {
  const discoAvailable = isDiscoAvailableOnDay(dayOfWeek);
  
  // Calculate disco pricing if available
  const discoTotalCost = discoAvailable ? calculateDiscoPrice(groupSize, discoPackage) : null;
  const discoOption = {
    available: discoAvailable,
    totalCost: discoTotalCost,
    costPerPerson: discoTotalCost ? Math.floor(discoTotalCost / groupSize) : null,
    packageName: DISCO_AVAILABILITY.PACKAGES[discoPackage].name,
    description: DISCO_AVAILABILITY.PACKAGES[discoPackage].description
  };
  
  // Calculate private cruise pricing
  const privateCalc = calculatePrivatePrice(groupSize, dayOfWeek, privatePackage);
  const privateOption = {
    available: true,
    totalCost: privateCalc.totalPrice,
    costPerPerson: privateCalc.perPersonCost,
    packageName: `${privatePackage.charAt(0).toUpperCase() + privatePackage.slice(1)} Private Cruise`,
    capacityTier: privateCalc.capacityTier,
    dayType: privateCalc.dayType,
    addOnCost: privateCalc.addOnCost
  };
  
  // Compare options and generate recommendations
  let comparison: {
    discoIsAvailable: boolean;
    discoCheaper: boolean | null;
    savings: number | null;
    savingsPercentage: number | null;
    recommendation: 'disco' | 'private' | 'private_only';
    reasonCode: string;
  };
  
  let valueProposition = '';
  
  if (!discoAvailable) {
    // Disco not available - private is only option
    comparison = {
      discoIsAvailable: false,
      discoCheaper: null,
      savings: null,
      savingsPercentage: null,
      recommendation: 'private_only',
      reasonCode: 'DISCO_NOT_AVAILABLE_ON_DAY'
    };
    valueProposition = `Private cruise is your only option on ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]}s. Great value at $${(privateCalc.perPersonCost / 100).toFixed(0)} per person!`;
  } else {
    // Both options available - compare pricing
    const discoTotal = discoOption.totalCost!;
    const privateTotal = privateOption.totalCost;
    const savings = privateTotal - discoTotal; // Positive = disco saves money
    const savingsPercentage = (savings / privateTotal) * 100;
    const discoCheaper = savings > 0;
    
    let reasonCode = '';
    let recommendation: 'disco' | 'private' = 'disco';
    
    if (discoCheaper) {
      if (savings >= 50000) { // $500+ savings
        reasonCode = 'DISCO_MAJOR_SAVINGS';
      } else if (savings >= 20000) { // $200+ savings
        reasonCode = 'DISCO_GOOD_SAVINGS';
      } else {
        reasonCode = 'DISCO_MINOR_SAVINGS';
      }
      recommendation = 'disco';
    } else {
      // Private is cheaper (rare but possible with certain scenarios)
      if (Math.abs(savings) >= 20000) { // Private saves $200+
        reasonCode = 'PRIVATE_SIGNIFICANT_SAVINGS';
      } else {
        reasonCode = 'PRIVATE_MARGINAL_SAVINGS';
      }
      recommendation = 'private';
    }
    
    comparison = {
      discoIsAvailable: true,
      discoCheaper,
      savings,
      savingsPercentage,
      recommendation,
      reasonCode
    };
    
    // Generate value proposition message
    if (discoCheaper) {
      valueProposition = `ATX Disco Cruise saves you $${(savings / 100).toFixed(0)} (${Math.abs(savingsPercentage).toFixed(0)}% less) vs private! ${groupSize} people × $${(discoOption.costPerPerson! / 100).toFixed(0)} = $${(discoTotal / 100).toLocaleString()} total.`;
    } else {
      valueProposition = `Surprisingly, private cruise saves $${(Math.abs(savings) / 100).toFixed(0)} vs disco! Only $${(privateCalc.perPersonCost / 100).toFixed(0)} per person for your own boat.`;
    }
  }
  
  return {
    discoOption,
    privateOption,
    comparison,
    valueProposition
  };
}

/**
 * Gets the best deal recommendation for a group size and day
 * @param groupSize Number of people
 * @param dayOfWeek Day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
 * @param preferences Optional preferences object
 * @returns Best deal recommendation with alternatives
 */
export function getBestDealRecommendation(
  groupSize: number,
  dayOfWeek: number,
  preferences?: {
    maxBudgetPerPerson?: number;
    preferPrivate?: boolean;
    preferWeekday?: boolean;
  }
): {
  primaryRecommendation: {
    type: 'disco' | 'private' | 'private_only';
    packageType: string;
    totalCost: number;
    costPerPerson: number;
    valueMessage: string;
    whyBest: string;
  };
  alternatives: Array<{
    type: 'disco' | 'private';
    packageType: string;
    totalCost: number;
    costPerPerson: number;
    savings: number;
    dayOfWeek?: number;
    dayName?: string;
  }>;
  groupSizeInsights: {
    category: string;
    optimalRange: string;
    recommendation: string;
  };
} {
  // Get base comparison
  const comparison = compareDiscoVsPrivate(groupSize, dayOfWeek);
  
  // Determine group size category
  let groupCategory = '';
  let optimalRange = '';
  let groupRecommendation = '';
  
  if (groupSize <= 12) {
    groupCategory = 'Small Group';
    optimalRange = '8-12 people';
    groupRecommendation = 'Disco cruises typically offer the best value for small groups, especially on weekends.';
  } else if (groupSize <= 25) {
    groupCategory = 'Medium Group';  
    optimalRange = '13-25 people';
    groupRecommendation = 'Both options competitive - disco usually better on Saturday, private better on weekdays.';
  } else {
    groupCategory = 'Large Group';
    optimalRange = '26+ people';
    groupRecommendation = 'Private cruises often provide better per-person value for large groups, especially on weekdays.';
  }
  
  // Build primary recommendation
  let primaryRecommendation;
  if (comparison.comparison.recommendation === 'private_only') {
    const privateCost = comparison.privateOption.totalCost;
    primaryRecommendation = {
      type: 'private_only' as const,
      packageType: 'Standard Private Cruise',
      totalCost: privateCost,
      costPerPerson: comparison.privateOption.costPerPerson,
      valueMessage: comparison.valueProposition,
      whyBest: 'ATX Disco Cruise only runs Friday & Saturday. Private cruise is your only option.'
    };
  } else if (comparison.comparison.recommendation === 'disco') {
    const discoCost = comparison.discoOption.totalCost!;
    primaryRecommendation = {
      type: 'disco' as const,
      packageType: comparison.discoOption.packageName,
      totalCost: discoCost,
      costPerPerson: comparison.discoOption.costPerPerson!,
      valueMessage: comparison.valueProposition,
      whyBest: `Disco cruise saves $${(comparison.comparison.savings! / 100).toFixed(0)} vs private cruise`
    };
  } else {
    const privateCost = comparison.privateOption.totalCost;
    primaryRecommendation = {
      type: 'private' as const,
      packageType: 'Standard Private Cruise',
      totalCost: privateCost,
      costPerPerson: comparison.privateOption.costPerPerson,
      valueMessage: comparison.valueProposition,
      whyBest: 'Private cruise offers better value than expected for this scenario'
    };
  }
  
  // Generate alternatives (other days, other packages)
  const alternatives = [];
  
  // If current day is weekend, show weekday private alternatives
  if (dayOfWeek === 6) { // Saturday
    const mondayPrivate = calculatePrivatePrice(groupSize, 1, 'standard'); // Monday
    alternatives.push({
      type: 'private' as const,
      packageType: 'Weekday Private Cruise',
      totalCost: mondayPrivate.totalPrice,
      costPerPerson: mondayPrivate.perPersonCost,
      savings: primaryRecommendation.totalCost - mondayPrivate.totalPrice,
      dayOfWeek: 1,
      dayName: 'Monday'
    });
  }
  
  // If current day is weekday and disco not available, show Friday/Saturday disco
  if (!comparison.discoOption.available) {
    const saturdayDisco = calculateDiscoPrice(groupSize, 'basic');
    const saturdayPrivate = calculatePrivatePrice(groupSize, 6, 'standard');
    if (saturdayDisco < saturdayPrivate.totalPrice) {
      alternatives.push({
        type: 'disco' as const,
        packageType: 'Saturday Disco Cruise',
        totalCost: saturdayDisco,
        costPerPerson: Math.floor(saturdayDisco / groupSize),
        savings: primaryRecommendation.totalCost - saturdayDisco,
        dayOfWeek: 6,
        dayName: 'Saturday'
      });
    }
  }
  
  return {
    primaryRecommendation,
    alternatives: alternatives.slice(0, 3), // Limit to top 3 alternatives
    groupSizeInsights: {
      category: groupCategory,
      optimalRange,
      recommendation: groupRecommendation
    }
  };
}

/**
 * Calculates potential savings by switching days or package types
 * @param groupSize Number of people
 * @param currentDayOfWeek Current day of week
 * @returns Array of money-saving alternatives
 */
export function getSavingsOpportunities(
  groupSize: number,
  currentDayOfWeek: number
): Array<{
  type: 'day_change' | 'package_change' | 'cruise_type_change';
  description: string;
  savings: number;
  newDayOfWeek?: number;
  newDayName?: string;
  newPackageType?: string;
  newCruiseType?: 'disco' | 'private';
  actionRequired: string;
}> {
  const opportunities = [];
  const currentComparison = compareDiscoVsPrivate(groupSize, currentDayOfWeek);
  const currentBest = currentComparison.comparison.recommendation === 'disco' 
    ? currentComparison.discoOption.totalCost! 
    : currentComparison.privateOption.totalCost;
  
  // Check weekday alternatives if currently weekend
  if ([5, 6, 0].includes(currentDayOfWeek)) { // Fri, Sat, Sun
    const mondayPrivate = calculatePrivatePrice(groupSize, 1, 'standard');
    const savings = currentBest - mondayPrivate.totalPrice;
    
    if (savings > 10000) { // Save $100+
      opportunities.push({
        type: 'day_change' as const,
        description: `Move to Monday-Thursday for private cruise`,
        savings,
        newDayOfWeek: 1,
        newDayName: 'Monday',
        newCruiseType: 'private' as const,
        actionRequired: 'Change event date to weekday'
      });
    }
  }
  
  // Check disco alternatives if currently weekday
  if ([1, 2, 3, 4].includes(currentDayOfWeek)) { // Mon-Thu
    const saturdayDisco = calculateDiscoPrice(groupSize, 'basic');
    const savings = currentBest - saturdayDisco;
    
    if (savings > 5000) { // Save $50+
      opportunities.push({
        type: 'day_change' as const,
        description: `Switch to Saturday disco cruise`,
        savings,
        newDayOfWeek: 6,
        newDayName: 'Saturday',
        newCruiseType: 'disco' as const,
        actionRequired: 'Change event date to Saturday'
      });
    }
  }
  
  return opportunities.sort((a, b) => b.savings - a.savings).slice(0, 5);
}

/**
 * Pre-calculated scenario examples for marketing and comparison display
 */
export const PRICING_SCENARIOS = {
  // Small group scenarios
  SMALL_GROUP_SATURDAY: {
    groupSize: 8,
    dayOfWeek: 6,
    discoBasic: 68000, // 8 × $85 = $680
    discoQueen: 76000, // 8 × $95 = $760
    discoPlatinum: 84000, // 8 × $105 = $840
    privateStandard: 183800, // $1,838
    winner: 'disco',
    savingsRange: [99800, 115800], // $998-$1,158 savings
    message: 'Disco cruise saves over $1,000 for small Saturday groups!'
  },
  
  MEDIUM_GROUP_SATURDAY: {
    groupSize: 15,
    dayOfWeek: 6,
    discoBasic: 127500, // 15 × $85 = $1,275
    discoQueen: 142500, // 15 × $95 = $1,425
    discoPlatinum: 157500, // 15 × $105 = $1,575
    privateStandard: 196900, // $1,969 (25p boat)
    winner: 'disco',
    savingsRange: [39400, 69400], // $394-$694 savings
    message: 'Disco still wins for medium groups on Saturday'
  },
  
  LARGE_GROUP_SATURDAY: {
    groupSize: 20,
    dayOfWeek: 6,
    discoBasic: 170000, // 20 × $85 = $1,700
    discoQueen: 190000, // 20 × $95 = $1,900
    discoPlatinum: 210000, // 20 × $105 = $2,100
    privateStandard: 196900, // $1,969 (25p boat)
    winner: 'private', // Private can win at higher group sizes
    savings: 6900, // Private saves $69 vs disco queen
    crossoverPoint: true,
    message: 'Private cruise becomes competitive around 20+ people'
  },
  
  WEEKDAY_ONLY: {
    groupSize: 8,
    dayOfWeek: 2, // Tuesday
    discoAvailable: false,
    privateStandard: 105000, // $1,050
    perPersonCost: 13125, // $131.25 per person
    winner: 'private_only',
    message: 'Great weekday value - only $131 per person for private boat!'
  },
  
  LARGE_GROUP_WEEKDAY: {
    groupSize: 25,
    dayOfWeek: 1, // Monday
    discoAvailable: false,
    privateStandard: 118100, // $1,181
    perPersonCost: 4724, // $47.24 per person
    winner: 'private_only',
    message: 'Incredible weekday value - under $48 per person!'
  }
} as const;

/**
 * VALIDATION SYSTEM - Single Source of Truth Verification
 * Ensures admin display constants match calculation outputs
 * Prevents future divergence between admin UI and pricing calculations
 */

export const VALIDATION_TEST_CASES = {
  GROUP_SIZES: [14, 25, 30, 50, 75],
  DURATION: 4, // 4-hour cruise
  EVENT_TYPE: 'private' as const,
  ADDONS: {
    ESSENTIALS: ['essentials'] as const,
    ULTIMATE: ['ultimate'] as const,
    LILY_PAD: ['lily_pad'] as const
  }
};

/**
 * Validates that admin display constants match calculation outputs
 * This prevents future divergence between admin UI and pricing calculations
 * @param calculatePricingFunction The pricing calculation function to test
 * @returns Validation results with any mismatches
 */
export const validatePricingConsistency = (calculatePricingFunction: any) => {
  const results = {
    valid: true,
    errors: [] as string[],
    testResults: {} as Record<number, any>
  };

  for (const groupSize of VALIDATION_TEST_CASES.GROUP_SIZES) {
    try {
      // Test essentials package pricing
      const essentialsResult = calculatePricingFunction({
        groupSize,
        duration: VALIDATION_TEST_CASES.DURATION,
        eventType: VALIDATION_TEST_CASES.EVENT_TYPE,
        selectedAddOns: VALIDATION_TEST_CASES.ADDONS.ESSENTIALS,
        date: new Date().toISOString().split('T')[0]
      });

      // Test ultimate package pricing
      const ultimateResult = calculatePricingFunction({
        groupSize,
        duration: VALIDATION_TEST_CASES.DURATION,
        eventType: VALIDATION_TEST_CASES.EVENT_TYPE,  
        selectedAddOns: VALIDATION_TEST_CASES.ADDONS.ULTIMATE,
        date: new Date().toISOString().split('T')[0]
      });

      // Get capacity tier for comparison
      const capacityTier = groupSize <= 14 ? 14 : groupSize <= 30 ? (groupSize <= 25 ? 25 : 30) : groupSize <= 50 ? 50 : 75;
      
      // Validate essentials package fee matches constant
      const expectedEssentialsFee = PACKAGE_FLAT_FEES.ESSENTIALS[capacityTier as keyof typeof PACKAGE_FLAT_FEES.ESSENTIALS];
      const actualEssentialsFee = essentialsResult.addOnDetails?.find((addon: any) => addon.id === 'essentials')?.hourlyRate;
      
      if (actualEssentialsFee !== expectedEssentialsFee) {
        results.valid = false;
        results.errors.push(
          `Group ${groupSize}: Essentials fee mismatch - Expected: ${expectedEssentialsFee}, Actual: ${actualEssentialsFee}`
        );
      }

      // Validate ultimate package fee matches constant
      const expectedUltimateFee = PACKAGE_FLAT_FEES.ULTIMATE[capacityTier as keyof typeof PACKAGE_FLAT_FEES.ULTIMATE];
      const actualUltimateFee = ultimateResult.addOnDetails?.find((addon: any) => addon.id === 'ultimate')?.hourlyRate;
      
      if (actualUltimateFee !== expectedUltimateFee) {
        results.valid = false;
        results.errors.push(
          `Group ${groupSize}: Ultimate fee mismatch - Expected: ${expectedUltimateFee}, Actual: ${actualUltimateFee}`
        );
      }

      // Validate crew fees
      if (groupSize >= CREW_FEES.THRESHOLDS.SMALL_BOAT_EXTRA && groupSize <= 30) {
        const expectedCrewFee = CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA * VALIDATION_TEST_CASES.DURATION;
        const actualCrewFee = essentialsResult.crewFee;
        
        if (actualCrewFee !== expectedCrewFee) {
          results.valid = false;
          results.errors.push(
            `Group ${groupSize}: Crew fee mismatch - Expected: ${expectedCrewFee}, Actual: ${actualCrewFee}`
          );
        }
      } else if (groupSize >= CREW_FEES.THRESHOLDS.LARGE_BOAT_EXTRA) {
        const expectedCrewFee = CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA * VALIDATION_TEST_CASES.DURATION;
        const actualCrewFee = essentialsResult.crewFee;
        
        if (actualCrewFee !== expectedCrewFee) {
          results.valid = false;
          results.errors.push(
            `Group ${groupSize}: Crew fee mismatch - Expected: ${expectedCrewFee}, Actual: ${actualCrewFee}`
          );
        }
      }

      // Validate deposit percentage
      const expectedDepositPercent = DEPOSIT_POLICIES.PRIVATE;
      const actualDepositPercent = Math.round((essentialsResult.depositAmount / essentialsResult.total) * 100);
      
      if (actualDepositPercent !== expectedDepositPercent) {
        results.valid = false;
        results.errors.push(
          `Group ${groupSize}: Deposit percentage mismatch - Expected: ${expectedDepositPercent}%, Actual: ${actualDepositPercent}%`
        );
      }

      results.testResults[groupSize] = {
        essentials: essentialsResult,
        ultimate: ultimateResult,
        validatedFees: {
          essentialsFee: actualEssentialsFee === expectedEssentialsFee,
          ultimateFee: actualUltimateFee === expectedUltimateFee,
          depositPercent: actualDepositPercent === expectedDepositPercent
        }
      };

    } catch (error) {
      results.valid = false;
      results.errors.push(`Group ${groupSize}: Validation error - ${error}`);
    }
  }

  return results;
};