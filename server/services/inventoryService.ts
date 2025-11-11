import { db } from "../db";
import { boats, products, bookings, availabilitySlots, timeSlotTemplates, inventory } from "@shared/schema";
import { eq, and, between, gte, lte, or, inArray, sql } from "drizzle-orm";
import { format, addMinutes, parseISO, isSameDay, differenceInMinutes } from "date-fns";
// OLD STATIC_PRICING import removed - migrating to Lovable system

export interface InventoryItem {
  id: string;
  boatId: string;
  name: string;
  minCapacity: number;
  maxCapacity: number;
  standardCapacity: number;
  basePricing: {
    weekday: number;
    friday: number;
    weekend: number;
  };
  allowedEventTypes: string[];
  crewRequirements: {
    standard: number;
    extraThreshold?: number;
    extraCrew?: number;
  };
  amenities: string[];
  features: string[];
  maintenanceBuffer: number; // minutes between bookings
  active: boolean;
}

export interface TimeSlot {
  id: string;
  inventoryId: string;
  boatId: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'available' | 'booked' | 'held' | 'blocked' | 'maintenance';
  pricing: {
    base: number;
    adjustments: number;
    final: number;
  };
  remainingCapacity: number;
  bookingId?: string;
  holdExpiresAt?: Date;
  blockReason?: string;
}

export interface InventoryAvailability {
  date: Date;
  inventoryId: string;
  boatName: string;
  slots: TimeSlot[];
  totalAvailable: number;
  totalBooked: number;
  utilization: number;
}

class InventoryService {
  private readonly DEFAULT_MAINTENANCE_BUFFER = 30; // minutes

  /**
   * Get all inventory items (boats)
   */
  async getAllInventory(): Promise<InventoryItem[]> {
    const allBoats = await db.select().from(boats).where(eq(boats.active, true));
    const inventoryItems = await db.select().from(inventory);
    
    return allBoats.map(boat => {
      const invItem = inventoryItems.find(item => item.boatId === boat.id);
      // OLD STATIC_PRICING removed - using inventory table or fallback defaults
      
      return {
        id: invItem?.id || boat.id,
        boatId: boat.id,
        name: boat.name,
        minCapacity: invItem?.minCapacity || 1,
        maxCapacity: boat.maxCapacity,
        standardCapacity: boat.capacity,
        basePricing: invItem?.basePricing || {
          weekday: 60000,
          friday: 100000,
          weekend: 120000
        },
        allowedEventTypes: invItem?.allowedEventTypes || this.getDefaultEventTypes(boat.name),
        crewRequirements: invItem?.crewRequirements || {
          standard: 2,
          extraThreshold: boat.extraCrewThreshold,
          extraCrew: 1
        },
        amenities: invItem?.amenities || this.getDefaultAmenities(boat.name),
        features: invItem?.features || this.getDefaultFeatures(boat.name),
        maintenanceBuffer: invItem?.maintenanceBuffer || this.DEFAULT_MAINTENANCE_BUFFER,
        active: boat.active
      };
    });
  }

  /**
   * Get inventory item by ID
   */
  async getInventoryItem(inventoryId: string): Promise<InventoryItem | null> {
    const items = await this.getAllInventory();
    return items.find(item => item.id === inventoryId) || null;
  }

  /**
   * Get inventory item by boat ID
   */
  async getInventoryByBoat(boatId: string): Promise<InventoryItem | null> {
    const items = await this.getAllInventory();
    return items.find(item => item.boatId === boatId) || null;
  }

  /**
   * Create or update inventory item
   */
  async upsertInventoryItem(data: Partial<InventoryItem>): Promise<InventoryItem> {
    if (!data.boatId) {
      throw new Error("Boat ID is required for inventory item");
    }

    const existing = await db.select().from(inventory)
      .where(eq(inventory.boatId, data.boatId))
      .limit(1);

    if (existing.length > 0) {
      await db.update(inventory)
        .set({
          minCapacity: data.minCapacity,
          maxCapacity: data.maxCapacity,
          basePricing: data.basePricing,
          allowedEventTypes: data.allowedEventTypes,
          crewRequirements: data.crewRequirements,
          amenities: data.amenities,
          features: data.features,
          maintenanceBuffer: data.maintenanceBuffer,
          updatedAt: new Date()
        })
        .where(eq(inventory.boatId, data.boatId!));
      
      return (await this.getInventoryByBoat(data.boatId))!;
    } else {
      const [newItem] = await db.insert(inventory)
        .values({
          boatId: data.boatId,
          minCapacity: data.minCapacity || 1,
          maxCapacity: data.maxCapacity,
          basePricing: data.basePricing,
          allowedEventTypes: data.allowedEventTypes || [],
          crewRequirements: data.crewRequirements,
          amenities: data.amenities || [],
          features: data.features || [],
          maintenanceBuffer: data.maintenanceBuffer || this.DEFAULT_MAINTENANCE_BUFFER
        })
        .returning();
      
      return (await this.getInventoryByBoat(newItem.boatId))!;
    }
  }

  /**
   * Get available time slots for an inventory item
   */
  async getAvailableSlots(
    inventoryId: string,
    startDate: Date,
    endDate: Date
  ): Promise<TimeSlot[]> {
    const invItem = await this.getInventoryItem(inventoryId);
    if (!invItem) {
      throw new Error(`Inventory item ${inventoryId} not found`);
    }

    // Get all bookings in date range
    const existingBookings = await db.select().from(bookings)
      .where(
        and(
          eq(bookings.boatId, invItem.boatId),
          between(bookings.startTime, startDate, endDate)
        )
      );

    // Get all availability slots
    const slots = await db.select().from(availabilitySlots)
      .where(
        and(
          eq(availabilitySlots.boatId, invItem.boatId),
          between(availabilitySlots.startTime, startDate, endDate)
        )
      );

    // Generate available slots based on templates
    const availableSlots: TimeSlot[] = [];
    const templates = await this.getTimeSlotTemplates(invItem.boatId);
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay();
      const dayTemplates = templates.filter(t => t.dayOfWeek === dayOfWeek && t.active);
      
      for (const template of dayTemplates) {
        const slot = await this.createTimeSlotFromTemplate(invItem, date, template);
        if (slot && !this.isSlotConflicting(slot, existingBookings, invItem.maintenanceBuffer)) {
          availableSlots.push(slot);
        }
      }
    }

    return availableSlots;
  }

  /**
   * Create a time slot from a template
   */
  private async createTimeSlotFromTemplate(
    invItem: InventoryItem,
    date: Date,
    template: any
  ): Promise<TimeSlot | null> {
    const dayType = this.getDayType(date);
    const basePricing = invItem.basePricing[dayType];
    const duration = this.calculateDuration(template.startTime, template.endTime);
    
    // Check for pricing exceptions
    const exceptions = await this.getPricingExceptions(date);
    const adjustments = exceptions.reduce((total, exc) => {
      return total + (basePricing * (exc.multiplier - 1));
    }, 0);

    return {
      id: `slot_${invItem.boatId}_${format(date, 'yyyyMMdd')}_${template.startTime.replace(':', '')}`,
      inventoryId: invItem.id,
      boatId: invItem.boatId,
      date,
      startTime: template.startTime,
      endTime: template.endTime,
      duration,
      status: 'available',
      pricing: {
        base: basePricing * duration,
        adjustments,
        final: (basePricing * duration) + adjustments
      },
      remainingCapacity: invItem.maxCapacity
    };
  }

  /**
   * Check if a slot conflicts with existing bookings
   */
  private isSlotConflicting(
    slot: TimeSlot,
    bookings: any[],
    bufferMinutes: number
  ): boolean {
    const slotStart = this.parseDateTime(slot.date, slot.startTime);
    const slotEnd = this.parseDateTime(slot.date, slot.endTime);
    
    return bookings.some(booking => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      
      // Add buffer time
      const bufferedBookingStart = addMinutes(bookingStart, -bufferMinutes);
      const bufferedBookingEnd = addMinutes(bookingEnd, bufferMinutes);
      
      return (slotStart < bufferedBookingEnd && slotEnd > bufferedBookingStart);
    });
  }

  /**
   * Book a time slot
   */
  async bookSlot(
    slotId: string,
    bookingData: {
      groupSize: number;
      contactName: string;
      contactEmail: string;
      contactPhone?: string;
      eventType?: string;
      specialRequests?: string;
      projectId?: string;
    }
  ): Promise<{ success: boolean; bookingId?: string; error?: string }> {
    const slot = await this.getSlotById(slotId);
    if (!slot) {
      return { success: false, error: "Slot not found" };
    }
    
    if (slot.status !== 'available') {
      return { success: false, error: "Slot is not available" };
    }
    
    if (bookingData.groupSize > slot.remainingCapacity) {
      return { success: false, error: "Insufficient capacity" };
    }

    const [booking] = await db.insert(bookings)
      .values({
        boatId: slot.boatId,
        type: 'private',
        status: 'confirmed',
        startTime: this.parseDateTime(slot.date, slot.startTime),
        endTime: this.parseDateTime(slot.date, slot.endTime),
        groupSize: bookingData.groupSize,
        contactName: bookingData.contactName,
        contactEmail: bookingData.contactEmail,
        contactPhone: bookingData.contactPhone,
        partyType: bookingData.eventType,
        specialRequests: bookingData.specialRequests,
        projectId: bookingData.projectId,
        totalAmount: slot.pricing.final,
        createdAt: new Date()
      })
      .returning();

    return { success: true, bookingId: booking.id };
  }

  /**
   * Hold a time slot temporarily
   */
  async holdSlot(
    slotId: string,
    holdMinutes: number = 15
  ): Promise<{ success: boolean; holdExpiresAt?: Date; error?: string }> {
    const slot = await this.getSlotById(slotId);
    if (!slot) {
      return { success: false, error: "Slot not found" };
    }
    
    if (slot.status !== 'available') {
      return { success: false, error: "Slot is not available" };
    }

    const holdExpiresAt = addMinutes(new Date(), holdMinutes);
    
    // Create hold record in slotHolds table
    await db.insert(availabilitySlots)
      .values({
        boatId: slot.boatId,
        startTime: this.parseDateTime(slot.date, slot.startTime),
        endTime: this.parseDateTime(slot.date, slot.endTime),
        status: 'HOLD',
        notes: `Held until ${format(holdExpiresAt, 'yyyy-MM-dd HH:mm')}`,
        createdAt: new Date()
      });

    return { success: true, holdExpiresAt };
  }

  /**
   * Block a time slot (for maintenance or admin reasons)
   */
  async blockSlot(
    slotId: string,
    reason: string,
    blockedBy?: string
  ): Promise<{ success: boolean; error?: string }> {
    const slot = await this.getSlotById(slotId);
    if (!slot) {
      return { success: false, error: "Slot not found" };
    }

    await db.insert(availabilitySlots)
      .values({
        boatId: slot.boatId,
        startTime: this.parseDateTime(slot.date, slot.startTime),
        endTime: this.parseDateTime(slot.date, slot.endTime),
        status: 'BLOCKED',
        blockReason: reason,
        blockedBy: blockedBy,
        blockedAt: new Date(),
        createdAt: new Date()
      });

    return { success: true };
  }

  /**
   * Get inventory utilization report
   */
  async getUtilizationReport(
    startDate: Date,
    endDate: Date
  ): Promise<InventoryAvailability[]> {
    const allInventory = await this.getAllInventory();
    const report: InventoryAvailability[] = [];
    
    for (const invItem of allInventory) {
      const slots = await this.getAvailableSlots(invItem.id, startDate, endDate);
      const bookedSlots = slots.filter(s => s.status === 'booked');
      
      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateSlots = slots.filter(s => isSameDay(s.date, date));
        const dateBookedSlots = dateSlots.filter(s => s.status === 'booked');
        
        report.push({
          date: new Date(date),
          inventoryId: invItem.id,
          boatName: invItem.name,
          slots: dateSlots,
          totalAvailable: dateSlots.filter(s => s.status === 'available').length,
          totalBooked: dateBookedSlots.length,
          utilization: dateSlots.length > 0 
            ? (dateBookedSlots.length / dateSlots.length) * 100 
            : 0
        });
      }
    }
    
    return report;
  }

  /**
   * Bulk create time slots
   */
  async bulkCreateSlots(
    inventoryId: string,
    dateRange: { start: Date; end: Date },
    pattern: {
      daysOfWeek: number[];
      timeSlots: Array<{ startTime: string; endTime: string }>;
    }
  ): Promise<{ created: number; errors: string[] }> {
    const invItem = await this.getInventoryItem(inventoryId);
    if (!invItem) {
      return { created: 0, errors: ["Inventory item not found"] };
    }

    let created = 0;
    const errors: string[] = [];
    
    for (let date = new Date(dateRange.start); date <= dateRange.end; date.setDate(date.getDate() + 1)) {
      if (pattern.daysOfWeek.includes(date.getDay())) {
        for (const timeSlot of pattern.timeSlots) {
          try {
            const template = {
              startTime: timeSlot.startTime,
              endTime: timeSlot.endTime,
              dayOfWeek: date.getDay(),
              boatId: invItem.boatId,
              active: true
            };
            
            const slot = await this.createTimeSlotFromTemplate(invItem, date, template);
            if (slot) {
              created++;
            }
          } catch (error) {
            errors.push(`Failed to create slot for ${format(date, 'yyyy-MM-dd')} ${timeSlot.startTime}: ${error}`);
          }
        }
      }
    }
    
    return { created, errors };
  }

  // Helper methods
  private getDayType(date: Date): 'weekday' | 'friday' | 'weekend' {
    const day = date.getDay();
    if (day === 5) return 'friday';
    if (day === 0 || day === 6) return 'weekend';
    return 'weekday';
  }

  private calculateDuration(startTime: string, endTime: string): number {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    return (endMinutes - startMinutes) / 60;
  }

  private parseDateTime(date: Date, time: string): Date {
    const [hour, minute] = time.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hour, minute, 0, 0);
    return result;
  }

  private async getSlotById(slotId: string): Promise<TimeSlot | null> {
    // Parse slot ID to get details
    const parts = slotId.split('_');
    if (parts.length < 4) return null;
    
    const boatId = parts[1];
    const dateStr = parts[2];
    const timeStr = parts[3];
    
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    const date = new Date(year, month, day);
    
    const hour = parseInt(timeStr.substring(0, 2));
    const minute = parseInt(timeStr.substring(2, 4));
    const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    const invItem = await this.getInventoryByBoat(boatId);
    if (!invItem) return null;
    
    // Return a reconstructed slot
    return {
      id: slotId,
      inventoryId: invItem.id,
      boatId,
      date,
      startTime,
      endTime: '', // Would need to be calculated
      duration: 4,
      status: 'available',
      pricing: {
        base: 0,
        adjustments: 0,
        final: 0
      },
      remainingCapacity: invItem.maxCapacity
    };
  }

  private async getTimeSlotTemplates(boatId: string): Promise<any[]> {
    try {
      const templates = await db.select().from(timeSlotTemplates)
        .where(or(
          eq(timeSlotTemplates.boatId, boatId),
          eq(timeSlotTemplates.boatId, 'all')
        ));
      return templates;
    } catch {
      // If table doesn't exist yet, return default templates
      return this.getDefaultTemplates();
    }
  }

  private async getPricingExceptions(date: Date): Promise<any[]> {
    // Will be implemented by pricingExceptions service
    return [];
  }

  private getDefaultTemplates(): any[] {
    return [
      // Weekday templates (Mon-Thu)
      { dayOfWeek: 1, startTime: '10:00', endTime: '14:00', active: true },
      { dayOfWeek: 1, startTime: '14:30', endTime: '18:30', active: true },
      { dayOfWeek: 2, startTime: '10:00', endTime: '14:00', active: true },
      { dayOfWeek: 2, startTime: '14:30', endTime: '18:30', active: true },
      { dayOfWeek: 3, startTime: '10:00', endTime: '14:00', active: true },
      { dayOfWeek: 3, startTime: '14:30', endTime: '18:30', active: true },
      { dayOfWeek: 4, startTime: '10:00', endTime: '14:00', active: true },
      { dayOfWeek: 4, startTime: '14:30', endTime: '18:30', active: true },
      // Friday templates
      { dayOfWeek: 5, startTime: '10:00', endTime: '14:00', active: true },
      { dayOfWeek: 5, startTime: '14:30', endTime: '18:30', active: true },
      // Weekend templates
      { dayOfWeek: 6, startTime: '10:00', endTime: '14:00', active: true },
      { dayOfWeek: 6, startTime: '14:30', endTime: '18:30', active: true },
      { dayOfWeek: 0, startTime: '10:00', endTime: '14:00', active: true },
      { dayOfWeek: 0, startTime: '14:30', endTime: '18:30', active: true }
    ];
  }

  private getDefaultEventTypes(boatName: string): string[] {
    const name = boatName.toLowerCase();
    if (name.includes('disco')) {
      return ['disco'];
    }
    return ['private', 'bachelor', 'bachelorette', 'birthday', 'corporate', 'wedding'];
  }

  private getDefaultAmenities(boatName: string): string[] {
    const name = boatName.toLowerCase();
    const baseAmenities = ['Sound System', 'Bluetooth', 'Coolers', 'Ice', 'Water'];
    
    if (name.includes('clever') || name.includes('disco')) {
      return [...baseAmenities, 'Full Bar', 'Dance Floor', 'LED Lights', 'Multiple Decks'];
    } else if (name.includes('me') || name.includes('irony')) {
      return [...baseAmenities, 'Bar Area', 'Shade Coverage', 'Swimming Platform'];
    } else {
      return [...baseAmenities, 'Shade Coverage', 'Swimming Area'];
    }
  }

  private getDefaultFeatures(boatName: string): string[] {
    const name = boatName.toLowerCase();
    if (name.includes('clever')) {
      return ['75 Person Capacity', 'Multiple Levels', 'Full Kitchen', 'Premium Sound', 'Climate Control'];
    } else if (name.includes('disco')) {
      return ['100 Person Capacity', 'DJ Booth', 'Light Show', 'Dance Floor', 'BYOB Bar Area'];
    } else if (name.includes('me') || name.includes('irony')) {
      return ['30 Person Capacity', 'Spacious Deck', 'Premium Seating', 'Swim Platform'];
    } else {
      return ['14 Person Capacity', 'Intimate Setting', 'Perfect for Small Groups'];
    }
  }
}

export const inventoryService = new InventoryService();