/**
 * Static pricing configuration - Single source of truth for all pricing
 * All prices are in CENTS to avoid floating point issues
 */

export interface BoatPricing {
  capacity: number;
  pricing: {
    weekday: number;   // Mon-Thu hourly rate in cents
    friday: number;    // Friday hourly rate in cents
    weekend: number;   // Sat-Sun hourly rate in cents
  };
  crewFee?: {
    threshold: number;    // Group size requiring extra crew
    feePerHour: number;  // Additional fee in cents per hour
  };
  discoOnly?: boolean;
}

export interface StaticPricingConfig {
  boats: Record<string, BoatPricing>;
  disco: {
    packages: {
      basic: number;        // Per person in cents
      disco_queen: number;  // Per person in cents
      platinum: number;     // Per person in cents
    };
    schedule: {
      friday: Array<{ start: string; end: string }>;
      saturday: Array<{ start: string; end: string }>;
    };
  };
  privatePackages: {
    standard: number;    // Base price in cents (0 for no extra)
    essentials: number;  // Per hour in cents
    ultimate: number;    // Per hour in cents
  };
  timeSlots: {
    weekday: {
      durations: number[];  // Available durations in hours
      startTime: string;    // Earliest start time
      endTime: string;      // Latest end time
    };
    weekend: {
      durations: number[];  // Available durations in hours
      startTime: string;    // Earliest start time
      endTime: string;      // Latest end time
    };
  };
}

export const STATIC_PRICING: StaticPricingConfig = {
  boats: {
    'boat_day_tripper': {
      capacity: 14,
      pricing: {
        weekday: 60000,   // $600/hr Mon-Thu
        friday: 100000,   // $1000/hr Friday
        weekend: 120000   // $1200/hr Sat-Sun
      }
    },
    'boat_me_seek': {
      capacity: 30,
      pricing: {
        weekday: 75000,   // $750/hr Mon-Thu
        friday: 120000,   // $1200/hr Friday
        weekend: 140000   // $1400/hr Sat-Sun
      },
      crewFee: { 
        threshold: 15,    // Extra crew needed for groups > 15
        feePerHour: 5000  // $50/hr extra
      }
    },
    'boat_the_irony': {
      capacity: 30,
      pricing: {
        weekday: 75000,   // $750/hr Mon-Thu
        friday: 120000,   // $1200/hr Friday
        weekend: 140000   // $1400/hr Sat-Sun
      },
      crewFee: { 
        threshold: 15,    // Extra crew needed for groups > 15
        feePerHour: 5000  // $50/hr extra
      }
    },
    'boat_clever_girl': {
      capacity: 75,
      pricing: {
        weekday: 120000,  // $1200/hr Mon-Thu
        friday: 140000,   // $1400/hr Friday
        weekend: 160000   // $1600/hr Sat-Sun
      },
      crewFee: { 
        threshold: 51,     // Extra crew needed for groups > 51
        feePerHour: 10000  // $100/hr extra
      }
    },
    'boat_atx_disco': {
      capacity: 100,
      discoOnly: true,
      pricing: {
        weekday: 0,  // Not available weekdays
        friday: 0,   // Not available Fridays currently
        weekend: 0   // Pricing is per-person for disco cruises
      }
    }
  },
  disco: {
    packages: {
      basic: 8500,        // $85 per person
      disco_queen: 9500,  // $95 per person  
      platinum: 10500     // $105 per person
    },
    schedule: {
      friday: [],  // No disco cruises on Friday currently
      saturday: [
        { start: '11:00', end: '15:00' },    // 11am-3pm
        { start: '15:30', end: '19:30' }     // 3:30pm-7:30pm
      ]
    }
  },
  privatePackages: {
    standard: 0,       // Base price, no extras
    essentials: 15000, // $150/hr
    ultimate: 20000    // $200/hr
  },
  timeSlots: {
    weekday: {
      durations: [3, 4],         // 3hr and 4hr options
      startTime: '10:00',        // 10am earliest
      endTime: '20:30'           // 8:30pm latest
    },
    weekend: {
      durations: [4],            // 4hr blocks only
      startTime: '10:00',        // 10am earliest
      endTime: '20:30'           // 8:30pm latest
    }
  }
};

/**
 * Get the day type for pricing purposes
 */
export function getPricingDayType(date: Date): 'weekday' | 'friday' | 'weekend' {
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 5) return 'friday';      // Friday
  if (dayOfWeek === 0 || dayOfWeek === 6) return 'weekend';  // Sat-Sun
  return 'weekday';  // Mon-Thu
}

/**
 * Get boat pricing for a specific date
 */
export function getBoatPricing(boatId: string, date: Date): number | null {
  const boat = STATIC_PRICING.boats[boatId];
  if (!boat || boat.discoOnly) return null;
  
  const dayType = getPricingDayType(date);
  return boat.pricing[dayType];
}

/**
 * Calculate total price for a private cruise
 */
export function calculatePrivateCruisePrice(
  boatId: string,
  date: Date,
  duration: number,
  groupSize: number,
  packageType: 'standard' | 'essentials' | 'ultimate' = 'standard'
): number {
  const hourlyRate = getBoatPricing(boatId, date);
  if (!hourlyRate) return 0;
  
  const boat = STATIC_PRICING.boats[boatId];
  let basePrice = hourlyRate * duration;
  
  // Add crew fee if needed
  if (boat.crewFee && groupSize > boat.crewFee.threshold) {
    basePrice += boat.crewFee.feePerHour * duration;
  }
  
  // Add package price
  const packagePrice = STATIC_PRICING.privatePackages[packageType] * duration;
  
  return basePrice + packagePrice;
}

/**
 * Calculate total price for a disco cruise
 */
export function calculateDiscoCruisePrice(
  packageType: 'basic' | 'disco_queen' | 'platinum',
  ticketCount: number
): number {
  return STATIC_PRICING.disco.packages[packageType] * ticketCount;
}

/**
 * Get available time slots for a given date and duration
 */
export function getAvailableTimeSlots(date: Date, duration: number): Array<{ start: string; end: string }> {
  const dayType = getPricingDayType(date);
  const config = dayType === 'weekend' || dayType === 'friday' 
    ? STATIC_PRICING.timeSlots.weekend 
    : STATIC_PRICING.timeSlots.weekday;
  
  // Check if duration is valid for this day type
  if (!config.durations.includes(duration)) {
    return [];
  }
  
  const slots: Array<{ start: string; end: string }> = [];
  const [startHour, startMin] = config.startTime.split(':').map(Number);
  const [endHour, endMin] = config.endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  const durationMinutes = duration * 60;
  
  // Generate all possible slots
  for (let currentMinutes = startMinutes; currentMinutes + durationMinutes <= endMinutes; currentMinutes += 30) {
    const startHour = Math.floor(currentMinutes / 60);
    const startMin = currentMinutes % 60;
    const endTotalMinutes = currentMinutes + durationMinutes;
    const endHour = Math.floor(endTotalMinutes / 60);
    const endMin = endTotalMinutes % 60;
    
    slots.push({
      start: `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`,
      end: `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`
    });
  }
  
  return slots;
}

/**
 * Get the appropriate boat for a group size
 */
export function getBoatForGroupSize(groupSize: number): string | null {
  // Sort boats by capacity
  const sortedBoats = Object.entries(STATIC_PRICING.boats)
    .filter(([_, boat]) => !boat.discoOnly && boat.capacity >= groupSize)
    .sort((a, b) => a[1].capacity - b[1].capacity);
  
  if (sortedBoats.length === 0) return null;
  
  // Return the smallest boat that fits the group
  return sortedBoats[0][0];
}