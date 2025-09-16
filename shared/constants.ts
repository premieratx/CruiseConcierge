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
 * Default pricing configuration
 */
export const PRICING_DEFAULTS = {
  TAX_RATE_BASIS_POINTS: 825, // 8.25%
  GRATUITY_PERCENT: 18,
  DEPOSIT_PERCENT: 25,
  URGENCY_THRESHOLD_DAYS: 30,
  FULL_PAYMENT_THRESHOLD_DAYS: 14,
  BASE_HOURLY_RATE: 30000, // $300.00 in cents
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