import { db } from "./db";
import {
  bookings,
  blackoutDates,
  holidayExceptions,
  masterAvailabilityRules,
  specialPricingRules
} from "@shared/schema";
import { and, eq, gte, lte, or, sql } from "drizzle-orm";
import { format } from "date-fns";

export interface LocalAvailabilityResult {
  available: boolean;
  reason?: string;
  bookedSlots?: Array<{
    clientName?: string;
    timeSlot?: string;
    groupSize?: number;
  }>;
  blackouts?: Array<{
    name: string;
    reason?: string;
  }>;
  holidayException?: {
    name?: string;
    status: string;
  };
}

/**
 * Check availability against local database tables imported from Google Sheets
 */
export async function checkLocalAvailability(
  date: Date,
  startTime?: string,
  endTime?: string,
  boatId?: string
): Promise<LocalAvailabilityResult> {
  const dateStr = format(date, 'yyyy-MM-dd');
  
  // 1. Check for blackout dates
  const blackouts = await db.select().from(blackoutDates)
    .where(
      and(
        lte(blackoutDates.startDate, date),
        gte(blackoutDates.endDate, date),
        eq(blackoutDates.active, true)
      )
    );
  
  if (blackouts.length > 0) {
    const affectsAllBoats = blackouts.some(b => !b.boatId || b.boatId === 'all');
    const affectsThisBoat = boatId && blackouts.some(b => b.boatId === boatId);
    
    if (affectsAllBoats || affectsThisBoat) {
      // Check if specific time slots are affected
      const affectsAllSlots = blackouts.some(b => 
        !b.affectedSlots || b.affectedSlots.length === 0
      );
      
      if (affectsAllSlots) {
        return {
          available: false,
          reason: 'Blackout period',
          blackouts: blackouts.map(b => ({
            name: b.name || 'Blackout',
            reason: b.notes || undefined
          }))
        };
      }
      
      // Check specific time slots if provided
      if (startTime || endTime) {
        const timeSlotAffected = blackouts.some(b => {
          if (!b.affectedSlots || b.affectedSlots.length === 0) return false;
          return b.affectedSlots.some(slot => {
            // Match against provided times using the slot object properties
            return slot.startTime === startTime || slot.endTime === endTime ||
                   (slot.startTime && startTime && slot.startTime === startTime) ||
                   (slot.endTime && endTime && slot.endTime === endTime);
          });
        });
        
        if (timeSlotAffected) {
          return {
            available: false,
            reason: 'Blackout period for this time slot',
            blackouts: blackouts.map(b => ({
              name: b.name || 'Blackout',
              reason: b.notes || undefined
            }))
          };
        }
      }
    }
  }
  
  // 2. Check for holiday exceptions  
  const startOfTargetDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const endOfTargetDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  
  const holidays = await db.select().from(holidayExceptions)
    .where(
      and(
        gte(holidayExceptions.exceptionDate, startOfTargetDay),
        lte(holidayExceptions.exceptionDate, endOfTargetDay),
        eq(holidayExceptions.active, true)
      )
    );
  
  if (holidays.length > 0) {
    const holiday = holidays[0];
    if (holiday.availabilityStatus === 'closed') {
      return {
        available: false,
        reason: `Closed for ${holiday.holidayName || 'holiday'}`,
        holidayException: {
          name: holiday.holidayName || undefined,
          status: holiday.availabilityStatus
        }
      };
    }
  }
  
  // 3. Check for existing bookings
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  
  // CRITICAL: Filter by boat_id if provided to check specific boat availability
  console.log(`🔍 [AVAILABILITY CHECK] Checking bookings for date: ${dateStr}, boat: ${boatId || 'ANY'}, time: ${startTime || 'ANY'}-${endTime || 'ANY'}`);
  
  const whereConditions = [
    gte(bookings.startTime, startOfDay),
    lte(bookings.startTime, endOfDay)
  ];
  
  // Only filter by boat_id if provided
  if (boatId) {
    whereConditions.push(eq(bookings.boatId, boatId));
  }
  
  const bookedDates = await db.select().from(bookings)
    .where(and(...whereConditions));
  
  console.log(`📊 [AVAILABILITY CHECK] Found ${bookedDates.length} bookings for ${dateStr}${boatId ? ` on boat ${boatId}` : ''}`);
  
  if (bookedDates.length > 0) {
    // If specific time slot is provided, check for conflicts
    if (startTime && endTime) {
      const conflicts = bookedDates.filter(b => {
        if (!b.startTime || !b.endTime) return false;
        
        // Convert booking times to HH:mm format for comparison
        const bookingStartTime = format(b.startTime, 'HH:mm');
        const bookingEndTime = format(b.endTime, 'HH:mm');
        
        // Enhanced overlap detection: Check if time ranges overlap in any way
        // A booking conflicts if:
        // 1. It starts during our requested time slot
        // 2. It ends during our requested time slot  
        // 3. It completely encompasses our requested time slot
        // 4. Our requested slot completely encompasses the booking
        const overlaps = (
          // Exact match
          (bookingStartTime === startTime && bookingEndTime === endTime) ||
          // Booking starts during our slot
          (bookingStartTime >= startTime && bookingStartTime < endTime) ||
          // Booking ends during our slot
          (bookingEndTime > startTime && bookingEndTime <= endTime) ||
          // Booking encompasses our slot
          (bookingStartTime <= startTime && bookingEndTime >= endTime)
        );
        
        if (overlaps) {
          console.log(`⚠️ [AVAILABILITY CONFLICT] Time overlap detected: Booking ${b.id} (${bookingStartTime}-${bookingEndTime}) conflicts with requested ${startTime}-${endTime}`);
        }
        
        return overlaps;
      });
      
      if (conflicts.length > 0) {
        console.log(`❌ [AVAILABILITY BLOCKED] ${conflicts.length} conflicting booking(s) found for ${dateStr} ${startTime}-${endTime}${boatId ? ` on boat ${boatId}` : ''}`);
        return {
          available: false,
          reason: `Already booked for this time slot (${conflicts.length} booking${conflicts.length > 1 ? 's' : ''})`,
          bookedSlots: conflicts.map(b => ({
            clientName: b.contactName || undefined,
            timeSlot: b.startTime ? `${format(b.startTime, 'HH:mm')}-${format(b.endTime!, 'HH:mm')}` : undefined,
            groupSize: b.groupSize || undefined
          }))
        };
      } else {
        console.log(`✅ [AVAILABILITY CHECK] No time conflicts found for ${dateStr} ${startTime}-${endTime}${boatId ? ` on boat ${boatId}` : ''}`);
      }
    }
    
    // Check if all slots for the day are booked
    // You may want to adjust this logic based on your business rules
    const totalBooked = bookedDates.reduce((sum, b) => sum + (b.groupSize || 0), 0);
    if (totalBooked >= 100) { // Assuming max capacity of 100 people per day
      return {
        available: false,
        reason: 'Fully booked for this date',
        bookedSlots: bookedDates.map(b => ({
          clientName: b.contactName || undefined,
          timeSlot: b.startTime ? `${format(b.startTime, 'HH:mm')}-${format(b.endTime!, 'HH:mm')}` : undefined,
          groupSize: b.groupSize || undefined
        }))
      };
    }
  }
  
  // 4. If no conflicts found, the slot is available
  return {
    available: true,
    reason: 'Available'
  };
}

/**
 * Get all bookings for a date range from the local database
 */
export async function getLocalBookings(startDate: Date, endDate: Date) {
  return await db.select().from(bookings)
    .where(
      and(
        gte(bookings.startTime, startDate),
        lte(bookings.startTime, endDate)
      )
    );
}

/**
 * Get master availability rules for a specific day type
 */
export async function getMasterRulesForDay(dayType: string) {
  return await db.select().from(masterAvailabilityRules)
    .where(
      and(
        eq(masterAvailabilityRules.dayType, dayType),
        eq(masterAvailabilityRules.active, true)
      )
    );
}

/**
 * Get special pricing for a date
 */
export async function getSpecialPricingForDate(date: Date) {
  return await db.select().from(specialPricingRules)
    .where(
      and(
        lte(specialPricingRules.startDate, date),
        gte(specialPricingRules.endDate, date),
        eq(specialPricingRules.active, true)
      )
    );
}