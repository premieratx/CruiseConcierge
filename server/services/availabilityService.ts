import { db } from "../db";
import { bookings, availabilitySlots, slotHolds, discoSlots, systemBlockouts } from "@shared/schema";
import { eq, and, between, gte, lte, or, sql, ne } from "drizzle-orm";
import { format, addMinutes, parseISO, isSameDay, isAfter, isBefore, addDays } from "date-fns";
import { inventoryService } from "./inventoryService";
import { rulesEngine } from "./rulesEngine";

export interface AvailabilityCheck {
  date: Date;
  boatId?: string;
  groupSize?: number;
  eventType?: string;
  duration?: number;
}

export interface AvailabilityResult {
  available: boolean;
  slots: Array<{
    id: string;
    startTime: string;
    endTime: string;
    boatId: string;
    boatName: string;
    capacity: number;
    price: number;
    status: string;
  }>;
  conflicts?: string[];
  nextAvailable?: Date;
}

export interface CalendarGrid {
  month: number;
  year: number;
  days: Array<{
    date: Date;
    dayOfWeek: number;
    availability: 'available' | 'limited' | 'booked' | 'blocked';
    slots: number;
    bookings: number;
    boats: Array<{
      boatId: string;
      boatName: string;
      status: string;
      slots: Array<{
        time: string;
        status: string;
      }>;
    }>;
  }>;
}

export interface ConflictResult {
  hasConflict: boolean;
  conflictType?: 'booking' | 'maintenance' | 'blackout' | 'hold';
  conflictDetails?: string;
  suggestedAlternatives?: Array<{
    date: Date;
    startTime: string;
    endTime: string;
    boatId: string;
  }>;
}

class AvailabilityService {
  private readonly HOLD_DURATION_MINUTES = 15;
  private readonly BUFFER_MINUTES = 30;
  private readonly CACHE_TTL = 60000; // 1 minute cache
  private availabilityCache: Map<string, { data: any; timestamp: number }> = new Map();

  /**
   * Check real-time availability
   */
  async checkAvailability(check: AvailabilityCheck): Promise<AvailabilityResult> {
    const cacheKey = this.getCacheKey(check);
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const startOfDay = new Date(check.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(check.date);
    endOfDay.setHours(23, 59, 59, 999);

    // Get all inventory items
    const inventory = await inventoryService.getAllInventory();
    let targetBoats = inventory;

    // Filter by specific boat if requested
    if (check.boatId) {
      targetBoats = inventory.filter(item => item.boatId === check.boatId);
    }

    // Apply rules engine if group size and event type provided
    if (check.groupSize && check.eventType) {
      const recommendations = await rulesEngine.getRecommendations({
        groupSize: check.groupSize,
        eventType: check.eventType,
        eventDate: check.date,
        duration: check.duration
      });
      
      const recommendedBoatIds = [
        ...recommendations.recommended.map(r => r.boatId),
        ...recommendations.suitable.map(r => r.boatId)
      ];
      
      targetBoats = targetBoats.filter(item => recommendedBoatIds.includes(item.boatId));
    }

    // Check each boat's availability
    const allSlots: any[] = [];
    const conflicts: string[] = [];

    for (const boat of targetBoats) {
      // Get bookings for this boat
      const boatBookings = await db.select().from(bookings)
        .where(
          and(
            eq(bookings.boatId, boat.boatId),
            between(bookings.startTime, startOfDay, endOfDay)
          )
        );

      // Get blocked slots
      const blockedSlots = await db.select().from(availabilitySlots)
        .where(
          and(
            eq(availabilitySlots.boatId, boat.boatId),
            between(availabilitySlots.startTime, startOfDay, endOfDay),
            or(
              eq(availabilitySlots.status, 'BLOCKED'),
              eq(availabilitySlots.status, 'MAINTENANCE')
            )
          )
        );

      // Get holds
      const activeHolds = await this.getActiveHolds(boat.boatId, check.date);

      // Get available time slots for this boat
      const slots = await inventoryService.getAvailableSlots(boat.id, startOfDay, endOfDay);
      
      for (const slot of slots) {
        // Check for conflicts
        const slotStart = this.parseDateTime(check.date, slot.startTime);
        const slotEnd = this.parseDateTime(check.date, slot.endTime);
        
        const hasBookingConflict = boatBookings.some(b => 
          this.timesOverlap(slotStart, slotEnd, new Date(b.startTime), new Date(b.endTime))
        );
        
        const hasBlockConflict = blockedSlots.some(b =>
          this.timesOverlap(slotStart, slotEnd, new Date(b.startTime), new Date(b.endTime))
        );
        
        const hasHoldConflict = activeHolds.some(h =>
          h.startTime === slot.startTime && h.endTime === slot.endTime
        );

        if (!hasBookingConflict && !hasBlockConflict && !hasHoldConflict) {
          allSlots.push({
            id: slot.id,
            startTime: slot.startTime,
            endTime: slot.endTime,
            boatId: boat.boatId,
            boatName: boat.name,
            capacity: boat.maxCapacity,
            price: slot.pricing.final,
            status: 'available'
          });
        } else {
          if (hasBookingConflict) conflicts.push(`${boat.name} booked at ${slot.startTime}`);
          if (hasBlockConflict) conflicts.push(`${boat.name} blocked at ${slot.startTime}`);
          if (hasHoldConflict) conflicts.push(`${boat.name} on hold at ${slot.startTime}`);
        }
      }
    }

    // Find next available date if no slots available
    let nextAvailable: Date | undefined;
    if (allSlots.length === 0) {
      nextAvailable = await this.findNextAvailableDate(check);
    }

    const result: AvailabilityResult = {
      available: allSlots.length > 0,
      slots: allSlots,
      conflicts: conflicts.length > 0 ? conflicts : undefined,
      nextAvailable
    };

    this.setCache(cacheKey, result);
    return result;
  }

  /**
   * Get calendar grid for month view
   */
  async getCalendarGrid(month: number, year: number): Promise<CalendarGrid> {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const days: CalendarGrid['days'] = [];
    
    const inventory = await inventoryService.getAllInventory();
    
    for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
      const currentDate = new Date(date);
      const dayBookings = await db.select().from(bookings)
        .where(
          and(
            gte(bookings.startTime, currentDate),
            lte(bookings.startTime, new Date(currentDate.getTime() + 86400000))
          )
        );
      
      const boats: any[] = [];
      let totalSlots = 0;
      let totalBooked = 0;
      
      for (const boat of inventory) {
        const boatBookings = dayBookings.filter(b => b.boatId === boat.boatId);
        const slots = await inventoryService.getAvailableSlots(
          boat.id,
          currentDate,
          new Date(currentDate.getTime() + 86400000)
        );
        
        totalSlots += slots.length;
        totalBooked += boatBookings.length;
        
        boats.push({
          boatId: boat.boatId,
          boatName: boat.name,
          status: boatBookings.length === 0 ? 'available' : 
                  boatBookings.length === slots.length ? 'booked' : 'partial',
          slots: slots.map(s => ({
            time: s.startTime,
            status: boatBookings.some(b => 
              format(new Date(b.startTime), 'HH:mm') === s.startTime
            ) ? 'booked' : 'available'
          }))
        });
      }
      
      days.push({
        date: new Date(currentDate),
        dayOfWeek: currentDate.getDay(),
        availability: totalBooked === 0 ? 'available' :
                     totalBooked === totalSlots ? 'booked' :
                     totalBooked > totalSlots / 2 ? 'limited' : 'available',
        slots: totalSlots,
        bookings: totalBooked,
        boats
      });
    }
    
    return { month, year, days };
  }

  /**
   * Check for booking conflicts
   */
  async checkConflicts(
    boatId: string,
    startTime: Date,
    endTime: Date,
    excludeBookingId?: string
  ): Promise<ConflictResult> {
    // Check existing bookings
    const existingBookings = await db.select().from(bookings)
      .where(
        and(
          eq(bookings.boatId, boatId),
          excludeBookingId ? ne(bookings.id, excludeBookingId) : undefined
        )
      );
    
    for (const booking of existingBookings) {
      if (this.timesOverlap(startTime, endTime, new Date(booking.startTime), new Date(booking.endTime))) {
        return {
          hasConflict: true,
          conflictType: 'booking',
          conflictDetails: `Conflicts with booking for ${booking.contactName} at ${format(booking.startTime, 'HH:mm')}`,
          suggestedAlternatives: await this.findAlternativeSlots(boatId, startTime, endTime)
        };
      }
    }
    
    // Check maintenance windows
    const maintenanceSlots = await db.select().from(availabilitySlots)
      .where(
        and(
          eq(availabilitySlots.boatId, boatId),
          eq(availabilitySlots.status, 'MAINTENANCE')
        )
      );
    
    for (const slot of maintenanceSlots) {
      if (this.timesOverlap(startTime, endTime, new Date(slot.startTime), new Date(slot.endTime))) {
        return {
          hasConflict: true,
          conflictType: 'maintenance',
          conflictDetails: `Conflicts with maintenance window at ${format(slot.startTime, 'HH:mm')}`,
          suggestedAlternatives: await this.findAlternativeSlots(boatId, startTime, endTime)
        };
      }
    }
    
    // Check system blackouts
    const blackouts = await this.getSystemBlackouts(startTime);
    for (const blackout of blackouts) {
      if (blackout.boatId === boatId || !blackout.boatId) {
        return {
          hasConflict: true,
          conflictType: 'blackout',
          conflictDetails: blackout.description || 'System blackout period',
          suggestedAlternatives: await this.findAlternativeSlots(boatId, startTime, endTime)
        };
      }
    }
    
    // Check active holds
    const holds = await this.getActiveHolds(boatId, startTime);
    for (const hold of holds) {
      const holdStart = this.parseDateTime(startTime, hold.startTime);
      const holdEnd = this.parseDateTime(startTime, hold.endTime);
      
      if (this.timesOverlap(startTime, endTime, holdStart, holdEnd)) {
        return {
          hasConflict: true,
          conflictType: 'hold',
          conflictDetails: `Time slot currently on hold until ${format(hold.expiresAt, 'HH:mm')}`,
          suggestedAlternatives: await this.findAlternativeSlots(boatId, startTime, endTime)
        };
      }
    }
    
    return { hasConflict: false };
  }

  /**
   * Manage capacity for disco cruises
   */
  async manageDiscoCapacity(
    date: Date,
    ticketCount: number,
    operation: 'add' | 'remove'
  ): Promise<{ success: boolean; remainingCapacity: number; error?: string }> {
    // Find disco slot for date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const [discoSlot] = await db.select().from(discoSlots)
      .where(between(discoSlots.date, startOfDay, endOfDay))
      .limit(1);
    
    if (!discoSlot) {
      return { success: false, remainingCapacity: 0, error: 'No disco cruise on this date' };
    }
    
    const currentSold = discoSlot.ticketsSold;
    const capacity = discoSlot.ticketCap;
    
    if (operation === 'add') {
      if (currentSold + ticketCount > capacity) {
        return {
          success: false,
          remainingCapacity: capacity - currentSold,
          error: `Only ${capacity - currentSold} tickets remaining`
        };
      }
      
      await db.update(discoSlots)
        .set({ ticketsSold: currentSold + ticketCount })
        .where(eq(discoSlots.id, discoSlot.id));
      
      return { success: true, remainingCapacity: capacity - currentSold - ticketCount };
    } else {
      const newSold = Math.max(0, currentSold - ticketCount);
      
      await db.update(discoSlots)
        .set({ ticketsSold: newSold })
        .where(eq(discoSlots.id, discoSlot.id));
      
      return { success: true, remainingCapacity: capacity - newSold };
    }
  }

  /**
   * Create a temporary hold on a slot
   */
  async createHold(
    slotId: string,
    sessionId: string,
    groupSize?: number
  ): Promise<{ success: boolean; holdId?: string; expiresAt?: Date; error?: string }> {
    // Parse slot ID to get details
    const parts = slotId.split('_');
    if (parts.length < 4) {
      return { success: false, error: 'Invalid slot ID' };
    }
    
    const boatId = parts[1];
    const dateStr = parts[2];
    const timeStr = parts[3];
    
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    const hour = parseInt(timeStr.substring(0, 2));
    const minute = parseInt(timeStr.substring(2, 4) || '0');
    
    const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    const endTime = this.calculateEndTime(startTime, 4); // Default 4hr duration
    const expiresAt = addMinutes(new Date(), this.HOLD_DURATION_MINUTES);
    
    // Check for existing holds
    const existingHolds = await db.select().from(slotHolds)
      .where(
        and(
          eq(slotHolds.slotId, slotId),
          gte(slotHolds.expiresAt, new Date())
        )
      );
    
    if (existingHolds.length > 0) {
      return { success: false, error: 'Slot already on hold' };
    }
    
    const [hold] = await db.insert(slotHolds)
      .values({
        slotId,
        boatId,
        cruiseType: 'private',
        dateISO: `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        startTime,
        endTime,
        sessionId,
        groupSize,
        expiresAt
      })
      .returning();
    
    return { success: true, holdId: hold.id, expiresAt };
  }

  /**
   * Release expired holds
   */
  async releaseExpiredHolds(): Promise<number> {
    const result = await db.delete(slotHolds)
      .where(lte(slotHolds.expiresAt, new Date()));
    
    return result.rowCount || 0;
  }

  /**
   * Get buffer time requirements
   */
  getBufferRequirements(boatId: string): { before: number; after: number } {
    // Can be customized per boat
    return { before: this.BUFFER_MINUTES, after: this.BUFFER_MINUTES };
  }

  // Helper methods
  private timesOverlap(
    start1: Date,
    end1: Date,
    start2: Date,
    end2: Date,
    bufferMinutes: number = 0
  ): boolean {
    const bufferedStart1 = addMinutes(start1, -bufferMinutes);
    const bufferedEnd1 = addMinutes(end1, bufferMinutes);
    
    return bufferedStart1 < end2 && bufferedEnd1 > start2;
  }

  private parseDateTime(date: Date, time: string): Date {
    const [hour, minute] = time.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hour, minute, 0, 0);
    return result;
  }

  private calculateEndTime(startTime: string, duration: number): string {
    const [hour, minute] = startTime.split(':').map(Number);
    const totalMinutes = hour * 60 + minute + (duration * 60);
    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;
    return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  }

  private async getActiveHolds(boatId: string, date: Date): Promise<any[]> {
    const dateStr = format(date, 'yyyy-MM-dd');
    return await db.select().from(slotHolds)
      .where(
        and(
          eq(slotHolds.boatId, boatId),
          eq(slotHolds.dateISO, dateStr),
          gte(slotHolds.expiresAt, new Date())
        )
      );
  }

  private async getSystemBlackouts(date: Date): Promise<any[]> {
    const active = await db.select().from(systemBlockouts)
      .where(eq(systemBlockouts.active, true));
    
    return active.filter(blackout => {
      if (!blackout.recurringPattern) return false;
      const pattern = blackout.recurringPattern as any;
      
      // Check if date matches pattern
      if (pattern.frequency === 'weekly' && pattern.daysOfWeek) {
        return pattern.daysOfWeek.includes(date.getDay());
      }
      
      if (pattern.frequency === 'monthly' && pattern.daysOfMonth) {
        return pattern.daysOfMonth.includes(date.getDate());
      }
      
      if (pattern.frequency === 'yearly' && pattern.months) {
        return pattern.months.includes(date.getMonth() + 1);
      }
      
      return false;
    });
  }

  private async findNextAvailableDate(check: AvailabilityCheck): Promise<Date | undefined> {
    const maxDaysToCheck = 90;
    let currentDate = addDays(check.date, 1);
    
    for (let i = 0; i < maxDaysToCheck; i++) {
      const result = await this.checkAvailability({
        ...check,
        date: currentDate
      });
      
      if (result.available && result.slots.length > 0) {
        return currentDate;
      }
      
      currentDate = addDays(currentDate, 1);
    }
    
    return undefined;
  }

  private async findAlternativeSlots(
    boatId: string,
    startTime: Date,
    endTime: Date
  ): Promise<Array<{ date: Date; startTime: string; endTime: string; boatId: string }>> {
    const alternatives: any[] = [];
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    
    // Check same day, different times
    const sameDaySlots = await inventoryService.getAvailableSlots(
      boatId,
      startTime,
      endTime
    );
    
    for (const slot of sameDaySlots.slice(0, 2)) {
      alternatives.push({
        date: startTime,
        startTime: slot.startTime,
        endTime: slot.endTime,
        boatId
      });
    }
    
    // Check next 7 days
    for (let i = 1; i <= 7 && alternatives.length < 5; i++) {
      const nextDate = addDays(startTime, i);
      const nextSlots = await inventoryService.getAvailableSlots(
        boatId,
        nextDate,
        addDays(nextDate, 1)
      );
      
      for (const slot of nextSlots.slice(0, 1)) {
        alternatives.push({
          date: nextDate,
          startTime: slot.startTime,
          endTime: slot.endTime,
          boatId
        });
        
        if (alternatives.length >= 5) break;
      }
    }
    
    return alternatives;
  }

  private getCacheKey(check: AvailabilityCheck): string {
    return `${format(check.date, 'yyyy-MM-dd')}_${check.boatId || 'all'}_${check.groupSize || 'any'}_${check.eventType || 'any'}`;
  }

  private getFromCache(key: string): any {
    const cached = this.availabilityCache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.availabilityCache.set(key, { data, timestamp: Date.now() });
    
    // Clean old cache entries
    if (this.availabilityCache.size > 100) {
      const entries = Array.from(this.availabilityCache.entries());
      const now = Date.now();
      for (const [k, v] of entries) {
        if (now - v.timestamp > this.CACHE_TTL * 2) {
          this.availabilityCache.delete(k);
        }
      }
    }
  }
}

export const availabilityService = new AvailabilityService();