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
 * - Monday-Thursday: 3-hour blocks between 10 AM-8 PM
 * - Friday: 4-hour blocks (12PM-4PM and 4:30PM-8:30PM)
 * - Saturday/Sunday: 4-hour blocks (11AM-3PM and 3:30PM-7:30PM)
 */
export const getPrivateTimeSlotsForDate = (date: Date): TimeSlot[] => {
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Monday-Thursday (3-hour slots)
    return [
      { id: '10am-1pm', label: '10am-1pm', startTime: '10:00', endTime: '13:00', duration: 3, icon: '🌅', popular: false, description: 'Morning cruise' },
      { id: '11am-2pm', label: '11am-2pm', startTime: '11:00', endTime: '14:00', duration: 3, icon: '🌞', popular: false, description: 'Late morning cruise' },
      { id: '12pm-3pm', label: '12pm-3pm', startTime: '12:00', endTime: '15:00', duration: 3, icon: '☀️', popular: true, description: 'Lunch cruise' },
      { id: '1pm-4pm', label: '1pm-4pm', startTime: '13:00', endTime: '16:00', duration: 3, icon: '☀️', popular: true, description: 'Afternoon cruise' },
      { id: '2pm-5pm', label: '2pm-5pm', startTime: '14:00', endTime: '17:00', duration: 3, icon: '🌆', popular: true, description: 'Late afternoon cruise' },
      { id: '3pm-6pm', label: '3pm-6pm', startTime: '15:00', endTime: '18:00', duration: 3, icon: '🌆', popular: true, description: 'Evening cruise' },
      { id: '4pm-7pm', label: '4pm-7pm', startTime: '16:00', endTime: '19:00', duration: 3, icon: '🌅', popular: false, description: 'Early sunset cruise' },
      { id: '5pm-8pm', label: '5pm-8pm', startTime: '17:00', endTime: '20:00', duration: 3, icon: '🌙', popular: false, description: 'Sunset cruise' },
    ];
  } else if (dayOfWeek === 5) { // Friday (4-hour slots)
    return [
      { id: '12pm-4pm', label: '12pm-4pm', startTime: '12:00', endTime: '16:00', duration: 4, icon: '☀️', popular: true, description: 'Friday afternoon cruise' },
      { id: '4:30pm-8:30pm', label: '4:30pm-8:30pm', startTime: '16:30', endTime: '20:30', duration: 4, icon: '🌙', popular: true, description: 'Friday evening cruise' },
    ];
  } else { // Saturday/Sunday (4-hour slots)
    return [
      { id: '11am-3pm', label: '11am-3pm', startTime: '11:00', endTime: '15:00', duration: 4, icon: '☀️', popular: true, description: 'Weekend afternoon cruise' },
      { id: '3:30pm-7:30pm', label: '3:30pm-7:30pm', startTime: '15:30', endTime: '19:30', duration: 4, icon: '🌆', popular: true, description: 'Weekend evening cruise' },
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
        icon: '🕛', 
        popular: true, 
        description: 'Friday disco cruise',
        ticketPrice: 85,
        maxCapacity: 50
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
        icon: '🕚', 
        popular: true, 
        description: 'Saturday afternoon disco cruise',
        ticketPrice: 95,
        maxCapacity: 50
      },
      { 
        id: 'disco-sat-3:30pm-7:30pm', 
        label: '3:30 PM - 7:30 PM', 
        startTime: '15:30', 
        endTime: '19:30', 
        duration: 4, 
        icon: '🕞', 
        popular: true, 
        description: 'Saturday evening disco cruise',
        ticketPrice: 105,
        maxCapacity: 50
      },
    ];
  } else if (dayOfWeek === 0) { // Sunday
    return [
      { 
        id: 'disco-sun-11am-3pm', 
        label: '11:00 AM - 3:00 PM', 
        startTime: '11:00', 
        endTime: '15:00', 
        duration: 4, 
        icon: '🕚', 
        popular: true, 
        description: 'Sunday afternoon disco cruise',
        ticketPrice: 85,
        maxCapacity: 50
      },
      { 
        id: 'disco-sun-3:30pm-7:30pm', 
        label: '3:30 PM - 7:30 PM', 
        startTime: '15:30', 
        endTime: '19:30', 
        duration: 4, 
        icon: '🕞', 
        popular: true, 
        description: 'Sunday evening disco cruise',
        ticketPrice: 95,
        maxCapacity: 50
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
  return dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0; // Friday, Saturday, Sunday
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