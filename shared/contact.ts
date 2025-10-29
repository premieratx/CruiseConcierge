/**
 * Centralized contact information and business details
 * Premier Party Cruises
 */

/**
 * Primary contact information
 */
export const CONTACT_INFO = {
  phone: '512-488-5892',
  email: 'clientservices@premierpartycruises.com',
  businessName: 'Premier Party Cruises',
  fullBusinessName: 'Premier Party Cruises LLC',
  
  // Formatted versions for display
  phoneFormatted: '(512) 488-5892',
  phoneHref: 'tel:+15124885892',
  emailHref: 'mailto:clientservices@premierpartycruises.com',
} as const;

/**
 * Business address and location details
 */
export const BUSINESS_ADDRESS = {
  street: '1603 S Austin Ave',
  city: 'Georgetown',
  state: 'Texas',
  stateAbbr: 'TX',
  zipCode: '78626',
  country: 'United States',
  
  // Formatted versions
  oneLine: '1603 S Austin Ave, Georgetown, TX 78626',
  cityState: 'Georgetown, TX',
  fullAddress: '1603 S Austin Ave\nGeorgetown, TX 78626\nUnited States',
  
  // Map/directions links
  googleMapsUrl: 'https://maps.google.com/?q=1603+S+Austin+Ave,+Georgetown,+TX+78626',
  appleMapsUrl: 'https://maps.apple.com/?q=1603+S+Austin+Ave,+Georgetown,+TX+78626',
} as const;

/**
 * Business hours and operating information
 */
export const BUSINESS_HOURS = {
  // Office hours for customer service
  office: {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 7:00 PM',
    saturday: '10:00 AM - 8:00 PM',
    sunday: '10:00 AM - 6:00 PM',
  },
  
  // Cruise operating hours
  cruises: {
    monday: 'Available',
    tuesday: 'Available', 
    wednesday: 'Available',
    thursday: 'Available',
    friday: 'Available',
    saturday: 'Available',
    sunday: 'Available',
  },
  
  // Formatted display
  officeHours: 'Monday-Thursday: 9 AM - 6 PM\nFriday: 9 AM - 7 PM\nSaturday: 10 AM - 8 PM\nSunday: 10 AM - 6 PM',
  cruiseAvailability: 'Daily cruise departures available',
  timezone: 'Central Time (CT)',
} as const;

/**
 * Social media and web presence
 */
export const SOCIAL_MEDIA = {
  website: 'https://premierpartycruises.com',
  facebook: 'https://facebook.com/premierpartycruises',
  instagram: 'https://instagram.com/premierpartycruises',
  tiktok: 'https://tiktok.com/@premierpartycruises',
  youtube: 'https://youtube.com/@premierpartycruises',
  linkedin: 'https://linkedin.com/company/premier-party-cruises',
  
  // Social handles (without @ symbol for flexibility)
  handles: {
    facebook: 'premierpartycruises',
    instagram: 'premierpartycruises',
    tiktok: 'premierpartycruises',
    youtube: 'premierpartycruises',
  },
} as const;

/**
 * Emergency and after-hours contact
 */
export const EMERGENCY_CONTACT = {
  phone: '512-488-5892', // Same as main for now
  email: 'clientservices@premierpartycruises.com',
  availableHours: '24/7 for cruise days and emergencies',
  note: 'For cruise day emergencies and urgent booking needs',
} as const;

/**
 * Booking and reservation contact preferences
 */
export const BOOKING_CONTACT = {
  preferredMethods: ['phone', 'website', 'email'] as const,
  responseTime: {
    phone: 'Immediate during business hours',
    email: 'Within 2-4 hours during business hours',
    website: 'Immediate online booking confirmation',
  },
  urgentBookings: {
    threshold: 7, // days
    method: 'phone',
    note: 'For bookings within 7 days, please call for immediate assistance',
  },
} as const;

/**
 * Service area and operational territory
 */
export const SERVICE_AREA = {
  primaryLake: 'Lake Travis',
  serviceRadius: '50 miles from Georgetown, TX',
  popularLocations: [
    'Lake Travis',
    'Lake Austin', 
    'Georgetown Lake',
    'Canyon Lake',
  ],
  coverage: 'Central Texas Hill Country',
  note: 'Custom locations available - contact us for details',
} as const;

/**
 * Legal and business registration information
 */
export const BUSINESS_REGISTRATION = {
  legalName: 'Premier Party Cruises LLC',
  businessType: 'Limited Liability Company',
  state: 'Texas',
  founded: 2020,
  taxId: 'Available upon request',
  licenses: [
    'Texas Parks and Wildlife Boating License',
    'USCG Captain\'s License',
    'Commercial Vessel Operating License',
  ],
  insurance: 'Fully insured and bonded',
  certifications: [
    'CPR/First Aid Certified',
    'USCG Safety Certified',
    'Commercial Marine Operator',
  ],
} as const;

/**
 * Utility functions for contact information
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const generateContactVCard = () => {
  return `BEGIN:VCARD
VERSION:3.0
FN:${CONTACT_INFO.businessName}
ORG:${BUSINESS_REGISTRATION.legalName}
TEL:${CONTACT_INFO.phone}
EMAIL:${CONTACT_INFO.email}
URL:${SOCIAL_MEDIA.website}
ADR:;;${BUSINESS_ADDRESS.street};${BUSINESS_ADDRESS.city};${BUSINESS_ADDRESS.stateAbbr};${BUSINESS_ADDRESS.zipCode};${BUSINESS_ADDRESS.country}
NOTE:Premier luxury party cruises on Central Texas lakes
END:VCARD`;
};

/**
 * Quick access contact methods for CTAs
 */
export const QUICK_CONTACT = {
  phone: {
    display: CONTACT_INFO.phoneFormatted,
    href: CONTACT_INFO.phoneHref,
    label: 'Call Now',
    icon: 'phone',
  },
  email: {
    display: CONTACT_INFO.email,
    href: CONTACT_INFO.emailHref,
    label: 'Email Us',
    icon: 'mail',
  },
  booking: {
    display: 'Book Online',
    href: '/booking',
    label: 'Book Now',
    icon: 'calendar',
  },
  quote: {
    display: 'Get Quote',
    href: '/quote',
    label: 'Get Quote',
    icon: 'calculator',
  },
} as const;