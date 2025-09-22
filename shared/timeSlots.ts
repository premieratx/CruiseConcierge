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
  
  if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Monday-Thursday: both 3-hour AND 4-hour options
    const allSlots: TimeSlot[] = [];
    
    // Helper functions for time formatting
    const formatTime = (h: number, m: number): string => {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };
    
    const formatLabel = (h: number, m: number): string => {
      const period = h >= 12 ? 'PM' : 'AM';
      const displayHour = h > 12 ? h - 12 : (h === 0 ? 12 : h);
      const minuteStr = m === 0 ? '00' : '30';
      return `${displayHour}:${minuteStr} ${period}`;
    };
    
    const getTimeIcon = (startHour: number): string => {
      if (startHour >= 17) return '🌙';
      if (startHour >= 15) return '🌆';
      if (startHour >= 12) return '☀️';
      if (startHour >= 11) return '🌞';
      return '🌅';
    };
    
    const getTimeDescription = (startHour: number, duration: number): string => {
      let timeOfDay = 'Morning';
      if (startHour >= 17) timeOfDay = 'Evening';
      else if (startHour >= 15) timeOfDay = 'Late afternoon';
      else if (startHour >= 12) timeOfDay = 'Afternoon';
      else if (startHour >= 11) timeOfDay = 'Late morning';
      
      return `${timeOfDay} cruise (${duration} hours)`;
    };
    
    // If duration is specified, only return slots for that duration
    const durationsToGenerate = duration ? [duration] : [3, 4];
    
    for (const slotDuration of durationsToGenerate) {
      // Generate slots for this duration
      // 3-hour slots: 10:00 AM to 5:30 PM (last slot ends at 8:30 PM)
      // 4-hour slots: 10:00 AM to 4:30 PM (last slot ends at 8:30 PM)
      const maxStartHour = slotDuration === 3 ? 17 : 16;
      const maxStartMinute = slotDuration === 3 ? 30 : 30;
      
      for (let hour = 10; hour <= maxStartHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          // Skip if it would go past max start time
          if (hour === maxStartHour && minute > maxStartMinute) break;
          
          const startHour = hour;
          const startMinute = minute;
          const endHour = hour + slotDuration;
          const endMinute = minute;
          
          const startTimeStr = formatTime(startHour, startMinute);
          const endTimeStr = formatTime(endHour, endMinute);
          const startLabel = formatLabel(startHour, startMinute);
          const endLabel = formatLabel(endHour, endMinute);
          
          const slotId = `${startTimeStr.replace(':', '')}-${endTimeStr.replace(':', '')}-${slotDuration}h`;
          
          allSlots.push({
            id: slotId,
            label: `${startLabel} - ${endLabel}`,
            startTime: startTimeStr,
            endTime: endTimeStr,
            duration: slotDuration,
            icon: getTimeIcon(startHour),
            description: getTimeDescription(startHour, slotDuration),
            popular: slotDuration === 4 && startHour >= 12 && startHour <= 15 // Mark 4-hour afternoon slots as popular
          });
        }
      }
    }
    
    // Sort by start time, then by duration (3-hour slots first for same time)
    return allSlots.sort((a, b) => {
      const timeA = a.startTime;
      const timeB = b.startTime;
      if (timeA !== timeB) return timeA.localeCompare(timeB);
      return a.duration - b.duration;
    });
  } else if (dayOfWeek === 5) { // Friday - FINAL RULES: 12-4 PM and 4:30-8:30 PM
    return [
      { id: '12pm-4pm', label: '12:00 PM - 4:00 PM', startTime: '12:00', endTime: '16:00', duration: 4, icon: '☀️', description: 'Friday afternoon cruise', popular: true },
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
 * FINAL RULES:
 * - Friday: ONLY 12-4 PM (bachelor/bachelorette only)
 * - Saturday: 11-3 PM and 3:30-7:30 PM
 * - Sunday: NO disco cruises
 */
export const getDiscoTimeSlotsForDate = (date: Date): DiscoTimeSlot[] => {
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 5) { // Friday - ONLY 12-4 PM disco cruise
    return [
      { 
        id: 'disco-fri-12pm-4pm', 
        label: '12:00 PM - 4:00 PM', 
        startTime: '12:00', 
        endTime: '16:00', 
        duration: 4, 
        icon: '🎉', 
        description: 'Friday afternoon disco cruise (bachelor/bachelorette only)',
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
  } else if (dayOfWeek === 0) { // Sunday - NO disco cruises
    return [];
  } else {
    return [];
  }
};

/**
 * Check if disco cruises are available for a given date
 * FINAL RULES: Friday and Saturday ONLY (no Sunday disco)
 */
export const isDiscoAvailableForDate = (date: Date): boolean => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 5 || dayOfWeek === 6; // Friday and Saturday only (NO Sunday)
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