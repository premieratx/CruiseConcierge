/**
 * Centralized time slot configuration for Premier Party Cruises
 * This ensures consistency between chat, calendar, and all booking interfaces
 */

export interface TimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  duration: number; // in hours
  icon?: string;
  popular?: boolean;
  description?: string;
}

export interface DiscoTimeSlot extends TimeSlot {
  ticketPrice?: number;
  maxCapacity?: number;
}

/**
 * Get available private cruise time slots for a given date
 * 
 * UPDATED TO MATCH MIGRATED DATABASE RULES:
 * - Monday-Thursday (weekdays): 10:00-13:00 (3 hours)
 * - Friday: 12:00-16:00 (4 hours) 
 * - Saturday/Sunday: 11:00-15:00 (4 hours)
 */
export const getPrivateTimeSlotsForDate = (date: Date, duration?: 3 | 4): TimeSlot[] => {
  const dayOfWeek = date.getDay();
  
  // Helper functions for time formatting
  const formatLabel = (h: number, m: number): string => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h > 12 ? h - 12 : (h === 0 ? 12 : h);
    const minuteStr = m === 0 ? '00' : m.toString();
    return `${displayHour}:${minuteStr} ${period}`;
  };
  
  const getTimeIcon = (startHour: number): string => {
    if (startHour >= 18) return '🌙';
    if (startHour >= 14) return '🌆';
    if (startHour >= 10) return '☀️';
    return '🌅';
  };
  
  const getTimeDescription = (startHour: number, duration: number): string => {
    let timeOfDay = 'Morning';
    if (startHour >= 18) timeOfDay = 'Evening';
    else if (startHour >= 14) timeOfDay = 'Afternoon';
    
    return `${timeOfDay} cruise (${duration} hours)`;
  };

  if (dayOfWeek >= 1 && dayOfWeek <= 4) { 
    // Monday-Thursday (weekdays): 10:00-13:00 (3 hours) - MATCHES DATABASE RULES
    const slot = {
      start: '10:00',
      end: '13:00', 
      duration: 3
    };
    
    // Filter by duration if specified
    if (duration && duration !== slot.duration) return [];
    
    const [startHour, startMinute] = slot.start.split(':').map(Number);
    const [endHour, endMinute] = slot.end.split(':').map(Number);
    
    const startLabel = formatLabel(startHour, startMinute);
    const endLabel = formatLabel(endHour, endMinute);
    
    return [{
      id: `${slot.start.replace(':', '')}-${slot.end.replace(':', '')}-${slot.duration}h`,
      label: `${startLabel} - ${endLabel}`,
      startTime: slot.start,
      endTime: slot.end,
      duration: slot.duration,
      icon: getTimeIcon(startHour),
      description: getTimeDescription(startHour, slot.duration),
      popular: true
    }];
  } else if (dayOfWeek === 5) { 
    // Friday: 12:00-16:00 (4 hours) - MATCHES DATABASE RULES
    const slot = {
      start: '12:00',
      end: '16:00',
      duration: 4
    };
    
    // Filter by duration if specified
    if (duration && duration !== slot.duration) return [];
    
    const [startHour, startMinute] = slot.start.split(':').map(Number);
    const [endHour, endMinute] = slot.end.split(':').map(Number);
    
    const startLabel = formatLabel(startHour, startMinute);
    const endLabel = formatLabel(endHour, endMinute);
    
    return [{
      id: `${slot.start.replace(':', '')}-${slot.end.replace(':', '')}-${slot.duration}h`,
      label: `${startLabel} - ${endLabel}`,
      startTime: slot.start,
      endTime: slot.end,
      duration: slot.duration,
      icon: getTimeIcon(startHour),
      description: getTimeDescription(startHour, slot.duration),
      popular: true
    }];
  } else { 
    // Saturday/Sunday: 11:00-15:00 (4 hours) - MATCHES DATABASE RULES
    const slot = {
      start: '11:00',
      end: '15:00',
      duration: 4
    };
    
    // Filter by duration if specified
    if (duration && duration !== slot.duration) return [];
    
    const [startHour, startMinute] = slot.start.split(':').map(Number);
    const [endHour, endMinute] = slot.end.split(':').map(Number);
    
    const startLabel = formatLabel(startHour, startMinute);
    const endLabel = formatLabel(endHour, endMinute);
    
    return [{
      id: `${slot.start.replace(':', '')}-${slot.end.replace(':', '')}-${slot.duration}h`,
      label: `${startLabel} - ${endLabel}`,
      startTime: slot.start,
      endTime: slot.end,
      duration: slot.duration,
      icon: getTimeIcon(startHour),
      description: getTimeDescription(startHour, slot.duration),
      popular: true
    }];
  }
};

/**
 * Helper function to check if a date is within disco cruise season
 * UPDATED: Disco cruises are now available year-round
 */
export const isInDiscoSeason = (date: Date): boolean => {
  // Disco cruises are now available year-round
  return true;
};

/**
 * Get available disco cruise time slots for a given date
 * 
 * CRITICAL - EXACT TIMES FROM GOOGLE SHEETS:
 * - FRIDAY: 12:00pm-4:00pm (ONLY ONE SLOT)
 * - SATURDAY: 11:00am-3:00pm AND 3:30pm-7:30pm (TWO SLOTS)
 * - Sunday: NO DISCO CRUISES (private cruises only on Sundays)
 * - Monday-Thursday: NO DISCO CRUISES
 * - Disco cruises are ONLY for bachelor/bachelorette parties
 */
export const getDiscoTimeSlotsForDate = (date: Date): DiscoTimeSlot[] => {
  // Check if date is within disco season (now year-round)
  if (!isInDiscoSeason(date)) {
    return [];
  }
  
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 5) { // Friday - ONLY ONE SLOT: 12pm-4pm
    return [
      { 
        id: 'disco-fri-12pm-4pm', 
        label: '12:00 PM - 4:00 PM', 
        startTime: '12:00', 
        endTime: '16:00', 
        duration: 4, 
        icon: '🎉', 
        description: 'Friday ATX Disco Cruise (Bachelor/Bachelorette Parties)',
        ticketPrice: 85,
        maxCapacity: 100
      }
    ];
  } else if (dayOfWeek === 6) { // Saturday - TWO SLOTS: 11am-3pm and 3:30pm-7:30pm
    return [
      { 
        id: 'disco-sat-11am-3pm', 
        label: '11:00 AM - 3:00 PM', 
        startTime: '11:00', 
        endTime: '15:00', 
        duration: 4, 
        icon: '🎉', 
        description: 'Saturday Morning ATX Disco Cruise (Bachelor/Bachelorette Parties)',
        ticketPrice: 95,
        maxCapacity: 100
      },
      { 
        id: 'disco-sat-330pm-730pm', 
        label: '3:30 PM - 7:30 PM', 
        startTime: '15:30', 
        endTime: '19:30', 
        duration: 4, 
        icon: '🎉', 
        description: 'Saturday Afternoon ATX Disco Cruise (Bachelor/Bachelorette Parties)',
        ticketPrice: 95,
        maxCapacity: 100
      }
    ];
  } else if (dayOfWeek === 0) { // Sunday - NO disco cruises (private only)
    return [];
  } else {
    return [];
  }
};

/**
 * Check if disco cruises are available for a given date
 * CRITICAL RULES FROM GOOGLE SHEETS: 
 * - Available year-round (no seasonal restriction)
 * - Friday and Saturday ONLY (NO Sunday disco)
 * - Friday: 12pm-4pm (ONE slot only)
 * - Saturday: 11am-3pm AND 3:30pm-7:30pm (TWO slots)
 */
export const isDiscoAvailableForDate = (date: Date): boolean => {
  // First check if date is within disco season (now year-round)
  if (!isInDiscoSeason(date)) {
    return false;
  }
  
  const dayOfWeek = date.getDay();
  return dayOfWeek === 5 || dayOfWeek === 6; // Friday and Saturday only (NEVER on Sunday)
};

/**
 * Check if private cruises are available for a given date
 */
export const isPrivateAvailableForDate = (date: Date): boolean => {
  // Private cruises are available every day
  return true;
};

/**
 * Get combined time slots for both private and disco cruises
 */
export const getAllTimeSlotsForDate = (date: Date): {
  private: TimeSlot[];
  disco: DiscoTimeSlot[];
} => {
  return {
    private: getPrivateTimeSlotsForDate(date),
    disco: getDiscoTimeSlotsForDate(date),
  };
};

/**
 * Convert time slot to calendar format (for CalendarView compatibility)
 */
export const timeSlotToCalendarFormat = (timeSlot: TimeSlot) => ({
  startTime: timeSlot.startTime,
  endTime: timeSlot.endTime,
  label: `${timeSlot.label} (${timeSlot.duration}h)`,
});

/**
 * Parse time string (HH:MM) to Date object for a given date
 */
export const parseTimeToDate = (date: Date, timeString: string): Date => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
};

/**
 * Format time string for display (convert 24h to 12h format)
 */
export const formatTimeForDisplay = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Check if a date is Monday-Thursday (requires duration selection)
 */
export const isMondayToThursday = (date: Date): boolean => {
  const dayOfWeek = date.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 4;
};

/**
 * Get available durations for a date
 */
export const getAvailableDurations = (date: Date): Array<3 | 4> => {
  if (isMondayToThursday(date)) {
    return [3, 4]; // Both 3-hour and 4-hour options
  }
  // Friday-Sunday only have 4-hour options
  return [4];
};

/**
 * Check if duration selection is required for a date
 */
export const isDurationSelectionRequired = (date: Date): boolean => {
  return isMondayToThursday(date);
};

/**
 * Get time slot by ID for a given date
 */
export const getTimeSlotById = (date: Date, timeSlotId: string): TimeSlot | DiscoTimeSlot | null => {
  const allSlots = getAllTimeSlotsForDate(date);
  
  // Check private slots first
  const privateSlot = allSlots.private.find(slot => slot.id === timeSlotId);
  if (privateSlot) return privateSlot;
  
  // Check disco slots
  const discoSlot = allSlots.disco.find(slot => slot.id === timeSlotId);
  if (discoSlot) return discoSlot;
  
  return null;
};