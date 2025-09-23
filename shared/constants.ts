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
  basic: { label: 'Basic', description: 'Essential disco experience' },
  disco_queen: { label: 'Disco Queen', description: 'VIP disco experience' },
  platinum: { label: 'Super Sparkle Platinum Disco', description: 'Ultimate disco experience' },
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
  CREW_FEE_26_30: 20000, // $200 crew fee for 16+ people on Me Seeks The Irony (25-30 boat)
  CREW_FEE_51_75: 30000, // $300 crew fee for 40+ people on Clever Girl (50-75 boat)
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
    14: 29500,  // $295/hour - Day Tripper
    25: 49500,  // $495/hour - Me Seeks The Irony
    30: 49500,  // $495/hour - Me Seeks The Irony (same as 25p + crew fee)
    50: 79500,  // $795/hour - Clever Girl
    75: 79500,  // $795/hour - Clever Girl (same as 50p + crew fee)
  },
  // Capacity-based rates for Friday (4 hours)
  FRIDAY: {
    14: 29500,  // $295/hour - Day Tripper
    25: 49500,  // $495/hour - Me Seeks The Irony
    30: 49500,  // $495/hour - Me Seeks The Irony (same as 25p + crew fee)
    50: 79500,  // $795/hour - Clever Girl
    75: 79500,  // $795/hour - Clever Girl (same as 50p + crew fee)
  },
  // Capacity-based rates for Saturday (4 hours)
  SAT_SUN: {
    14: 29500,  // $295/hour - Day Tripper
    25: 49500,  // $495/hour - Me Seeks The Irony
    30: 49500,  // $495/hour - Me Seeks The Irony (same as 25p + crew fee)
    50: 79500,  // $795/hour - Clever Girl
    75: 79500,  // $795/hour - Clever Girl (same as 50p + crew fee)
  },
  // Legacy aliases for backward compatibility
  WEEKDAY: {
    14: 29500,  // $295/hour - Day Tripper
    25: 49500,  // $495/hour - Me Seeks The Irony
    30: 49500,  // $495/hour - Me Seeks The Irony
    50: 79500,  // $795/hour - Clever Girl
    75: 79500,  // $795/hour - Clever Girl
  },
  WEEKEND: {
    14: 29500,  // $295/hour - Day Tripper
    25: 49500,  // $495/hour - Me Seeks The Irony  
    30: 49500,  // $495/hour - Me Seeks The Irony
    50: 79500,  // $795/hour - Clever Girl
    75: 79500,  // $795/hour - Clever Girl
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
 * Comprehensive Pricing Policies for Premier Party Cruises
 * Includes deposit rules, payment terms, cancellation policy, and legal information
 * Based on user-provided policy specifications
 */
export const PRICING_POLICIES = {
  deposit: {
    standard: {
      percentage: 25,
      description: 'Standard deposit for bookings made more than 30 days in advance',
      balancePercentage: 75,
      balanceDueDays: 30,
      title: 'Standard Booking',
      subtitle: '25% deposit to secure, 75% due 30 days before cruise'
    },
    urgent: {
      percentage: 50,
      description: 'Higher deposit required for bookings made 30 days or less from cruise date',
      paymentWindow: 48, // hours to pay after booking
      balancePercentage: 50,
      balanceDueDays: 2, // 48 hours = 2 days
      title: 'Urgent Booking',
      subtitle: '50% deposit required, balance due within 48 hours'
    }
  },
  balance: {
    standardDueDays: 30, // days before cruise when remaining balance is due
    description: 'Remaining balance due 30 days before cruise date',
    urgentDueHours: 48, // hours for urgent bookings
    urgentDescription: 'Balance due within 48 hours for urgent bookings'
  },
  thresholds: {
    urgentBookingDays: 30, // booking within this many days requires higher deposit
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
    securityNote: 'All payments are processed securely through Stripe'
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
      phone: '(512) 123-4567',
      email: 'bookings@premierpartycruises.com',
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
      phone: '(512) 123-4567',
      email: 'bookings@premierpartycruises.com',
      text: '(512) 123-4567'
    },
    policyQuestions: {
      email: 'policies@premierpartycruises.com',
      phone: '(512) 123-4567'
    },
    emergencyContact: {
      phone: '(512) 123-4567',
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
  // Monday-Thursday final prices (Standard package)
  MON_THU: {
    14: 105000, // $1,050.00 for ≤14 people
    25: 118100, // $1,181.00 for ≤25 people  
    50: 131300, // $1,313.00 for ≤50 people
  },
  // Friday final prices (Standard package)
  FRIDAY: {
    14: 118100, // $1,181.00 for ≤14 people
    25: 131300, // $1,313.00 for ≤25 people
    50: 144400, // $1,444.00 for ≤50 people
  },
  // Saturday final prices (Standard package)
  SATURDAY: {
    14: 183800, // $1,838.00 for ≤14 people
    25: 196900, // $1,969.00 for ≤25 people
    50: 210000, // $2,100.00 for ≤50 people
  },
  // Sunday final prices (Standard package)
  SUNDAY: {
    14: 131300, // $1,313.00 for ≤14 people
    25: 144400, // $1,444.00 for ≤25 people
    50: 157500, // $1,575.00 for ≤50 people
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
  return DISCO_AVAILABILITY.AVAILABLE_DAYS.includes(dayOfWeek);
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
 * @returns Total cost in cents or null if not available
 */
export function calculateDiscoPrice(
  groupSize: number, 
  packageType: keyof typeof DISCO_AVAILABILITY.PACKAGES
): number {
  const pricePerPerson = DISCO_AVAILABILITY.PACKAGES[packageType].pricePerPerson;
  return pricePerPerson * groupSize;
}

/**
 * Calculates private cruise cost for a group on a specific day
 * @param groupSize Number of people
 * @param dayOfWeek Day of week (0=Sunday, 1=Monday, ..., 6=Saturday) 
 * @param packageType Private package type (standard/essentials/ultimate)
 * @returns Cost breakdown object
 */
export function calculatePrivatePrice(
  groupSize: number, 
  dayOfWeek: number,
  packageType: 'standard' | 'essentials' | 'ultimate' = 'standard'
): {
  basePrice: number;
  addOnCost: number;
  totalPrice: number;
  capacityTier: 14 | 25 | 50;
  dayType: string;
  perPersonCost: number;
} {
  const capacityTier = getPrivateCruiseCapacityTier(groupSize);
  const dayType = getPrivateCruiseDayType(dayOfWeek);
  const basePrice = PRIVATE_CRUISE_FINAL_PRICES[dayType][capacityTier];
  
  // Add-on costs for Essentials and Ultimate packages
  let addOnCost = 0;
  if (packageType === 'essentials') {
    addOnCost = Math.floor(basePrice * 0.20); // ~20% for essentials
  } else if (packageType === 'ultimate') {
    addOnCost = Math.floor(basePrice * 0.40); // ~40% for ultimate
  }
  
  const totalPrice = basePrice + addOnCost;
  
  return {
    basePrice,
    addOnCost,
    totalPrice,
    capacityTier,
    dayType,
    perPersonCost: Math.floor(totalPrice / groupSize)
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
  const discoOption = {
    available: discoAvailable,
    totalCost: discoAvailable ? calculateDiscoPrice(groupSize, discoPackage) : null,
    costPerPerson: discoAvailable ? DISCO_AVAILABILITY.PACKAGES[discoPackage].pricePerPerson : null,
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
        type: 'day_change',
        description: `Move to Monday-Thursday for private cruise`,
        savings,
        newDayOfWeek: 1,
        newDayName: 'Monday',
        newCruiseType: 'private',
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
        type: 'day_change',
        description: `Switch to Saturday disco cruise`,
        savings,
        newDayOfWeek: 6,
        newDayName: 'Saturday',
        newCruiseType: 'disco',
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