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
} as const;

/**
 * Premier Party Cruises Hourly Rate Structure
 * All rates in cents (multiply by 100)
 * Structured as Mon-Thu < Friday < Sat-Sun pricing tiers
 */
export const HOURLY_RATES = {
  // Capacity-based rates for Monday-Thursday (3 hours)
  MON_THU: {
    14: 20000,  // $200/hour for ≤14 people
    25: 25000,  // $250/hour for ≤25 people
    30: 30000,  // $300/hour for ≤30 people
    50: 32500,  // $325/hour for ≤50 people
    75: 35000,  // $350/hour for ≤75 people
  },
  // Capacity-based rates for Friday (4 hours) - 25% premium over weekday
  FRIDAY: {
    14: 25000,  // $250/hour for ≤14 people
    25: 31250,  // $312.50/hour for ≤25 people
    30: 37500,  // $375/hour for ≤30 people
    50: 40625,  // $406.25/hour for ≤50 people
    75: 43750,  // $437.50/hour for ≤75 people
  },
  // Capacity-based rates for Saturday-Sunday (4 hours) - 50% premium over weekday
  SAT_SUN: {
    14: 30000,  // $300/hour for ≤14 people
    25: 37500,  // $375/hour for ≤25 people
    30: 45000,  // $450/hour for ≤30 people
    50: 48750,  // $487.50/hour for ≤50 people
    75: 52500,  // $525/hour for ≤75 people
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
 */
export const CRUISE_DURATIONS = {
  WEEKDAY: 3, // Monday-Thursday: 3 hours
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