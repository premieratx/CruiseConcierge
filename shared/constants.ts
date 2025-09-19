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
 * Disco package labels and configurations
 */
export const DISCO_PACKAGES = {
  basic: { label: 'Basic Package', description: 'Essential disco experience' },
  disco_queen: { label: 'Disco Queen Package', description: 'VIP disco experience' },
  platinum: { label: 'Platinum Package', description: 'Ultimate disco experience' },
} as const;

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
        name: 'Standard 4-Hour Cruise',
        tagline: 'Essential cruise experience',
        description: 'Everything you need for a perfect private cruise experience with professional crew and premium amenities',
        valueProposition: 'Hassle-free cruising with all the essentials included',
        inclusions: [
          'Amazing, experienced captain',
          '2 large empty coolers (bring your own ice & drinks)',
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
        name: '4-Hour Cruise w/Essentials Package',
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
        ideal_for: ['Worry-free hosting', 'Food & drink service', 'Convenience-focused events']
      },
      ultimate: {
        id: 'ultimate-14',
        name: 'Ultimate Disco Party Package',
        tagline: 'Complete party experience',
        description: 'The full party package with entertainment, refreshments, and disco vibes - everything for an unforgettable celebration',
        valueProposition: 'All-inclusive party experience with entertainment and party supplies',
        inclusions: [
          'Everything from Essentials Package',
          '6x20\' giant lily pad float',
          'Unicorn or ring float for the guest of honor',
          '5 disco ball cups & 30 additional solo cups',
          'Bubble gun & 3 bubble wands for fun',
          '20 champagne flutes & 3 fruit juices',
          '2 bottles SPF-50 spray sunscreen',
          '20 plates, plasticware, & paper towels',
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
          'Amazing, experienced captain',
          '2 large empty coolers (bring your own ice & drinks)',
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
          'Amazing, experienced captain',
          '2 large empty coolers (bring your own ice & drinks)',
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
          'Amazing, experienced captain',
          '4 giant empty coolers (bring your own ice & drinks)',
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
          'Amazing, experienced captain',
          '4 giant empty coolers (bring your own ice & drinks)',
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
  URGENCY_THRESHOLD_DAYS: 30,
  FULL_PAYMENT_THRESHOLD_DAYS: 14,
  BASE_HOURLY_RATE: 20000, // $200.00 in cents (minimum rate)
  EXTRA_CREW_FEE: 20000, // $200.00 in cents for groups >20 people
  CREW_FEE_26_30: 5000, // $50/hour for 26-30 person groups (25p boat expansion)
  CREW_FEE_51_75: 7500, // $75/hour for 51-75 person groups (50p boat expansion)
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
    14: 20000,  // $200/hour for ≤14 people
    25: 22500,  // $225/hour for ≤25 people
    30: 22500,  // $225/hour for ≤30 people (same as 25p + crew fee)
    50: 25000,  // $250/hour for ≤50 people
    75: 25000,  // $250/hour for ≤75 people (same as 50p + crew fee)
  },
  // Capacity-based rates for Friday (4 hours)
  FRIDAY: {
    14: 22500,  // $225/hour for ≤14 people
    25: 25000,  // $250/hour for ≤25 people
    30: 25000,  // $250/hour for ≤30 people (same as 25p + crew fee)
    50: 27500,  // $275/hour for ≤50 people
    75: 27500,  // $275/hour for ≤75 people (same as 50p + crew fee)
  },
  // Capacity-based rates for Saturday (4 hours)
  SAT_SUN: {
    14: 35000,  // $350/hour for Saturday, $250/hour for Sunday (using higher rate)
    25: 37500,  // $375/hour for Saturday, $275/hour for Sunday (using higher rate)
    30: 37500,  // $375/hour for ≤30 people (same as 25p + crew fee)
    50: 40000,  // $400/hour for Saturday, $300/hour for Sunday (using higher rate)
    75: 40000,  // $400/hour for ≤75 people (same as 50p + crew fee)
  },
  // Legacy aliases for backward compatibility
  WEEKDAY: {
    14: 20000,  // $200/hour for ≤14 people
    25: 25000,  // $250/hour for ≤25 people
    30: 30000,  // $300/hour for ≤30 people
    50: 32500,  // $325/hour for ≤50 people
    75: 35000,  // $350/hour for ≤75 people
  },
  WEEKEND: {
    14: 30000,  // $300/hour for ≤14 people
    25: 37500,  // $375/hour for ≤25 people
    30: 45000,  // $450/hour for ≤30 people
    50: 48750,  // $487.50/hour for ≤50 people
    75: 52500,  // $525/hour for ≤75 people
  }
} as const;

/**
 * Cruise duration by day type (in hours)
 * All private cruises are 4 hours as per pricing specifications
 */
export const CRUISE_DURATIONS = {
  WEEKDAY: 4, // Monday-Thursday: 4 hours
  WEEKEND: 4, // Friday-Sunday: 4 hours
} as const;

/**
 * Disco cruise pricing per person (in cents)
 */
export const DISCO_PRICING = {
  basic: 8500,       // $85.00 per person
  disco_queen: 9500, // $95.00 per person
  platinum: 10500,   // $105.00 per person
} as const;

/**
 * Private Cruise Pricing Structure
 * Comprehensive pricing data extracted from user-provided screenshots
 * Includes Standard, Essentials, and Ultimate packages for all capacity tiers
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
        name: 'Standard 4-Hour Cruise',
        description: 'Essential cruise experience with professional crew and premium amenities',
        addOn: 0, // Base package - no additional cost
        totalPrices: { // Total prices including tax and gratuity from task specification
          MON_THU: 105000,  // $1,050 total (from $800 base)
          FRIDAY: 118100,   // $1,181 total (from $900 base)  
          SATURDAY: 183800, // $1,838 total (from $1,400 base)
          SUNDAY: 131300,   // $1,313 total (from $1,000 base)
        }
      },
      essentials: {
        name: '4-Hour Cruise w/Essentials Package',
        description: 'Complete convenience package with refreshments and setup',
        addOn: 10000, // +$100 
        totalPrices: { // Standard totals + $100
          MON_THU: 115000,  // $1,150 total  
          FRIDAY: 128100,   // $1,281 total
          SATURDAY: 193800, // $1,938 total
          SUNDAY: 141300,   // $1,413 total
        }
      },
      ultimate: {
        name: 'Ultimate Disco Party Package',
        description: 'Complete party experience with entertainment and disco atmosphere',
        addOn: 25000, // +$250
        totalPrices: { // Standard totals + $250  
          MON_THU: 130000,  // $1,300 total
          FRIDAY: 143100,   // $1,431 total
          SATURDAY: 208800, // $2,088 total
          SUNDAY: 156300,   // $1,563 total
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
        totalPrices: { // Total prices including tax and gratuity from task specification
          MON_THU: 118100,  // $1,181 total (from $900 base)
          FRIDAY: 131300,   // $1,313 total (from $1,000 base)
          SATURDAY: 196900, // $1,969 total (from $1,500 base)  
          SUNDAY: 144400,   // $1,444 total (from $1,100 base)
        }
      },
      essentials: {
        name: '4-Hour Cruise w/Essentials Package', 
        description: 'Enhanced cruise experience with refreshments for group entertaining',
        addOn: 15000, // +$150
        totalPrices: { // Standard totals + $150
          MON_THU: 133100,  // $1,331 total
          FRIDAY: 146300,   // $1,463 total
          SATURDAY: 211900, // $2,119 total
          SUNDAY: 159400,   // $1,594 total
        }
      },
      ultimate: {
        name: 'Ultimate Disco Party Package',
        description: 'Ultimate party package with dual entertainment floats and disco atmosphere',
        addOn: 30000, // +$300
        totalPrices: { // Standard totals + $300
          MON_THU: 148100,  // $1,481 total  
          FRIDAY: 161300,   // $1,613 total
          SATURDAY: 226900, // $2,269 total
          SUNDAY: 174400,   // $1,744 total
        }
      }
    }
  },

  // 30-Person Capacity Tier (same as 25p + crew fee)
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
        totalPrices: { // 25p totals + $200 crew fee
          MON_THU: 138100,  // $1,381 total ($1,181 + $200)
          FRIDAY: 151300,   // $1,513 total ($1,313 + $200) 
          SATURDAY: 216900, // $2,169 total ($1,969 + $200)
          SUNDAY: 164400,   // $1,644 total ($1,444 + $200)
        }
      },
      essentials: {
        name: '4-Hour Cruise w/Essentials Package',
        description: 'Enhanced cruise experience with refreshments for large group entertaining',
        addOn: 15000, // +$150
        totalPrices: { // Standard totals + $150
          MON_THU: 153100,  // $1,531 total
          FRIDAY: 166300,   // $1,663 total
          SATURDAY: 231900, // $2,319 total  
          SUNDAY: 179400,   // $1,794 total
        }
      },
      ultimate: {
        name: 'Ultimate Disco Party Package',
        description: 'Ultimate party package for enhanced capacity with dual entertainment',
        addOn: 30000, // +$300
        totalPrices: { // Standard totals + $300
          MON_THU: 168100,  // $1,681 total
          FRIDAY: 181300,   // $1,813 total
          SATURDAY: 246900, // $2,469 total
          SUNDAY: 194400,   // $1,944 total
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
        totalPrices: { // Total prices including tax and gratuity from task specification
          MON_THU: 131300,  // $1,313 total (from $1,000 base)
          FRIDAY: 144400,   // $1,444 total (from $1,100 base)
          SATURDAY: 210000, // $2,100 total (from $1,600 base)
          SUNDAY: 157500,   // $1,575 total (from $1,200 base)
        }
      },
      essentials: {
        name: '4-Hour Cruise w/Essentials Package',
        description: 'Premium cruise with enhanced refreshment service for large-scale entertaining',
        addOn: 20000, // +$200
        totalPrices: { // Standard totals + $200
          MON_THU: 151300,  // $1,513 total
          FRIDAY: 164400,   // $1,644 total
          SATURDAY: 230000, // $2,300 total
          SUNDAY: 177500,   // $1,775 total
        }
      },
      ultimate: {
        name: 'Ultimate Disco Party Package',
        description: 'Ultimate large-scale party with triple entertainment floats and spectacular atmosphere',
        addOn: 35000, // +$350
        totalPrices: { // Standard totals + $350
          MON_THU: 166300,  // $1,663 total
          FRIDAY: 179400,   // $1,794 total
          SATURDAY: 245000, // $2,450 total
          SUNDAY: 192500,   // $1,925 total
        }
      }
    }
  },

  // 75-Person Capacity Tier (same as 50p + crew fee)
  75: {
    capacity: 75,
    baseHourlyRates: {
      MON_THU: 25000,  // $250/hr (same as 50p)
      FRIDAY: 27500,   // $275/hr (same as 50p)
      SATURDAY: 40000, // $400/hr (same as 50p)
      SUNDAY: 30000,   // $300/hr (same as 50p)
    },
    crewFeePerHour: 7500, // +$75/hr = +$300 for 4hr cruise
    packages: {
      standard: {
        name: 'Standard 4-Hour Cruise',
        description: 'Maximum capacity cruise experience for the grandest celebrations',
        addOn: 0, // Base package  
        totalPrices: { // 50p totals + $300 crew fee
          MON_THU: 161300,  // $1,613 total ($1,313 + $300)
          FRIDAY: 174400,   // $1,744 total ($1,444 + $300)
          SATURDAY: 240000, // $2,400 total ($2,100 + $300)
          SUNDAY: 187500,   // $1,875 total ($1,575 + $300)
        }
      },
      essentials: {
        name: '4-Hour Cruise w/Essentials Package',
        description: 'Maximum capacity cruise with ultimate refreshment service',
        addOn: 20000, // +$200
        totalPrices: { // Standard totals + $200
          MON_THU: 181300,  // $1,813 total
          FRIDAY: 194400,   // $1,944 total
          SATURDAY: 260000, // $2,600 total
          SUNDAY: 207500,   // $2,075 total
        }
      },
      ultimate: {
        name: 'Ultimate Disco Party Package',
        description: 'Maximum all-inclusive grand celebration experience',
        addOn: 35000, // +$350
        totalPrices: { // Standard totals + $350
          MON_THU: 196300,  // $1,963 total
          FRIDAY: 209400,   // $2,094 total
          SATURDAY: 275000, // $2,750 total
          SUNDAY: 222500,   // $2,225 total
        }
      }
    }
  }
} as const;

/**
 * Pricing Policies for Private Cruise Bookings
 * Based on user-provided policy specifications
 */
export const PRICING_POLICIES = {
  deposit: {
    standard: {
      percentage: 25,
      description: 'Standard deposit for bookings made more than 30 days in advance'
    },
    urgent: {
      percentage: 50,
      description: 'Higher deposit required for bookings made 30 days or less from cruise date',
      paymentWindow: 48 // hours to pay after booking
    }
  },
  balance: {
    standardDueDays: 30, // days before cruise when remaining balance is due
    description: 'Remaining balance due 30 days before cruise date'
  },
  thresholds: {
    urgentBookingDays: 30, // booking within this many days requires higher deposit
    fullPaymentDays: 14, // booking within this many days may require full payment
  },
  terms: {
    confirmationRequired: true,
    invoiceGeneration: 'automatic',
    paymentMethods: ['credit_card', 'bank_transfer', 'check'],
    cancellationPolicy: 'Contact for cancellation terms',
    depositRefundable: false
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