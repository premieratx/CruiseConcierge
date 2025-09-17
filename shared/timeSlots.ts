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
 * Business Rules:
 * - Monday-Thursday: 3-hour AND 4-hour options (user chooses duration first)
 * - Friday: 4-hour blocks (12PM-4PM and 4:30PM-8:30PM)
 * - Saturday/Sunday: 4-hour blocks (11AM-3PM and 3:30PM-7:30PM)
 */
export const getPrivateTimeSlotsForDate = (date: Date, duration?: 3 | 4): TimeSlot[] => {
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Monday-Thursday (both 3-hour and 4-hour options)
    const threeHourSlots = [
      { id: '10am-1pm-3h', label: '10:00 AM - 1:00 PM', startTime: '10:00', endTime: '13:00', duration: 3, icon: '🌅', description: 'Morning cruise (3 hours)' },
      { id: '11am-2pm-3h', label: '11:00 AM - 2:00 PM', startTime: '11:00', endTime: '14:00', duration: 3, icon: '🌞', description: 'Late morning cruise (3 hours)' },
      { id: '12pm-3pm-3h', label: '12:00 PM - 3:00 PM', startTime: '12:00', endTime: '15:00', duration: 3, icon: '☀️', description: 'Lunch cruise (3 hours)' },
      { id: '1pm-4pm-3h', label: '1:00 PM - 4:00 PM', startTime: '13:00', endTime: '16:00', duration: 3, icon: '☀️', description: 'Afternoon cruise (3 hours)' },
      { id: '2pm-5pm-3h', label: '2:00 PM - 5:00 PM', startTime: '14:00', endTime: '17:00', duration: 3, icon: '🌆', description: 'Late afternoon cruise (3 hours)' },
      { id: '3pm-6pm-3h', label: '3:00 PM - 6:00 PM', startTime: '15:00', endTime: '18:00', duration: 3, icon: '🌆', description: 'Evening cruise (3 hours)' },
      { id: '4pm-7pm-3h', label: '4:00 PM - 7:00 PM', startTime: '16:00', endTime: '19:00', duration: 3, icon: '🌅', description: 'Early sunset cruise (3 hours)' },
      { id: '5pm-8pm-3h', label: '5:00 PM - 8:00 PM', startTime: '17:00', endTime: '20:00', duration: 3, icon: '🌙', description: 'Sunset cruise (3 hours)' },
      { id: '5:30pm-8:30pm-3h', label: '5:30 PM - 8:30 PM', startTime: '17:30', endTime: '20:30', duration: 3, icon: '🌙', description: 'Late sunset cruise (3 hours)' },
    ];

    const fourHourSlots = [
      { id: '10am-2pm-4h', label: '10:00 AM - 2:00 PM', startTime: '10:00', endTime: '14:00', duration: 4, icon: '🌅', description: 'Morning cruise (4 hours)' },
      { id: '11am-3pm-4h', label: '11:00 AM - 3:00 PM', startTime: '11:00', endTime: '15:00', duration: 4, icon: '🌞', description: 'Late morning cruise (4 hours)' },
      { id: '12pm-4pm-4h', label: '12:00 PM - 4:00 PM', startTime: '12:00', endTime: '16:00', duration: 4, icon: '☀️', description: 'Lunch cruise (4 hours)' },
      { id: '1pm-5pm-4h', label: '1:00 PM - 5:00 PM', startTime: '13:00', endTime: '17:00', duration: 4, icon: '☀️', description: 'Afternoon cruise (4 hours)' },
      { id: '2pm-6pm-4h', label: '2:00 PM - 6:00 PM', startTime: '14:00', endTime: '18:00', duration: 4, icon: '🌆', description: 'Late afternoon cruise (4 hours)' },
      { id: '3pm-7pm-4h', label: '3:00 PM - 7:00 PM', startTime: '15:00', endTime: '19:00', duration: 4, icon: '🌆', description: 'Evening cruise (4 hours)' },
      { id: '4pm-8pm-4h', label: '4:00 PM - 8:00 PM', startTime: '16:00', endTime: '20:00', duration: 4, icon: '🌙', description: 'Sunset cruise (4 hours)' },
      { id: '4:30pm-8:30pm-4h', label: '4:30 PM - 8:30 PM', startTime: '16:30', endTime: '20:30', duration: 4, icon: '🌙', description: 'Late sunset cruise (4 hours)' },
    ];

    // Filter by duration if specified
    if (duration === 3) return threeHourSlots;
    if (duration === 4) return fourHourSlots;
    
    // Return all slots if no duration filter (for backward compatibility)
    return [...threeHourSlots, ...fourHourSlots];
  } else if (dayOfWeek === 5) { // Friday (4-hour slots)
    return [
      { id: '12pm-4pm', label: '12:00 PM - 4:00 PM', startTime: '12:00', endTime: '16:00', duration: 4, icon: '☀️', description: 'Friday afternoon cruise' },
      { id: '4:30pm-8:30pm', label: '4:30 PM - 8:30 PM', startTime: '16:30', endTime: '20:30', duration: 4, icon: '🌙', description: 'Friday evening cruise' },
    ];
  } else { // Saturday/Sunday (4-hour slots)
    return [
      { id: '11am-3pm', label: '11:00 AM - 3:00 PM', startTime: '11:00', endTime: '15:00', duration: 4, icon: '☀️', description: 'Weekend afternoon cruise' },
      { id: '3:30pm-7:30pm', label: '3:30 PM - 7:30 PM', startTime: '15:30', endTime: '19:30', duration: 4, icon: '🌆', description: 'Weekend evening cruise' },
    ];
  }
};

/**
 * Get available disco cruise time slots for a given date
 * Disco cruises are only available Friday, Saturday, and Sunday
 */
export const getDiscoTimeSlotsForDate = (date: Date): DiscoTimeSlot[] => {
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 5) { // Friday
    return [
      { 
        id: 'disco-fri-12pm-4pm', 
        label: '12:00 PM - 4:00 PM', 
        startTime: '12:00', 
        endTime: '16:00', 
        duration: 4, 
        icon: '🎉', 
        description: 'Friday disco cruise',
        ticketPrice: 85,
        maxCapacity: 100
      },
    ];
  } else if (dayOfWeek === 6) { // Saturday
    return [
      { 
        id: 'disco-sat-11am-3pm', 
        label: '11:00 AM - 3:00 PM', 
        startTime: '11:00', 
        endTime: '15:00', 
        duration: 4, 
        icon: '🎉', 
        description: 'Saturday afternoon disco cruise',
        ticketPrice: 95,
        maxCapacity: 100
      },
      { 
        id: 'disco-sat-3:30pm-7:30pm', 
        label: '3:30 PM - 7:30 PM', 
        startTime: '15:30', 
        endTime: '19:30', 
        duration: 4, 
        icon: '🎉', 
        description: 'Saturday evening disco cruise',
        ticketPrice: 105,
        maxCapacity: 100
      },
    ];
  } else {
    return [];
  }
};

/**
 * Check if disco cruises are available for a given date
 */
export const isDiscoAvailableForDate = (date: Date): boolean => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 5 || dayOfWeek === 6; // Friday, Saturday only
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