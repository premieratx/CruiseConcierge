import { db } from "../db";
import { pricingExceptions, holidayExceptions, specialPricingRules } from "@shared/schema";
import { eq, and, between, gte, lte, or, sql } from "drizzle-orm";
import { format, isWithinInterval, differenceInHours } from "date-fns";

export interface PricingException {
  id: string;
  name: string;
  type: 'holiday' | 'special_event' | 'dynamic' | 'discount';
  multiplier: number; // 1.5 = 150%, 2.0 = 200%, 0.9 = 90% (10% discount)
  startDate: Date;
  endDate: Date;
  conditions?: {
    minGroupSize?: number;
    maxGroupSize?: number;
    withinHours?: number; // For last-minute pricing
    boatIds?: string[];
    eventTypes?: string[];
  };
  priority: number; // Higher priority overrides lower
  active: boolean;
}

export interface PricingCalculation {
  basePrice: number;
  exceptions: Array<{
    name: string;
    type: string;
    multiplier: number;
    impact: number;
  }>;
  finalPrice: number;
  totalMultiplier: number;
}

class PricingExceptionsService {
  // Pre-defined holidays with multipliers
  private readonly HOLIDAYS: Record<string, { name: string; multiplier: number; dates: (year: number) => Date[] }> = {
    NEW_YEARS_EVE: {
      name: "New Year's Eve",
      multiplier: 2.0,
      dates: (year) => [new Date(year, 11, 31)]
    },
    NEW_YEARS_DAY: {
      name: "New Year's Day",
      multiplier: 1.5,
      dates: (year) => [new Date(year, 0, 1)]
    },
    MEMORIAL_DAY: {
      name: "Memorial Day Weekend",
      multiplier: 1.5,
      dates: (year) => {
        // Last Monday of May and surrounding weekend
        const lastMonday = this.getLastMondayOfMonth(year, 4);
        return [
          new Date(lastMonday.getTime() - 2 * 86400000), // Saturday
          new Date(lastMonday.getTime() - 86400000), // Sunday
          lastMonday // Monday
        ];
      }
    },
    JULY_4TH: {
      name: "Independence Day",
      multiplier: 1.5,
      dates: (year) => [
        new Date(year, 6, 3),
        new Date(year, 6, 4),
        new Date(year, 6, 5)
      ]
    },
    LABOR_DAY: {
      name: "Labor Day Weekend",
      multiplier: 1.5,
      dates: (year) => {
        // First Monday of September and surrounding weekend
        const firstMonday = this.getFirstMondayOfMonth(year, 8);
        return [
          new Date(firstMonday.getTime() - 2 * 86400000), // Saturday
          new Date(firstMonday.getTime() - 86400000), // Sunday
          firstMonday // Monday
        ];
      }
    },
    THANKSGIVING: {
      name: "Thanksgiving Weekend",
      multiplier: 1.3,
      dates: (year) => {
        // Fourth Thursday of November and weekend
        const fourthThursday = this.getFourthThursdayOfMonth(year, 10);
        return [
          fourthThursday,
          new Date(fourthThursday.getTime() + 86400000), // Friday
          new Date(fourthThursday.getTime() + 2 * 86400000), // Saturday
          new Date(fourthThursday.getTime() + 3 * 86400000) // Sunday
        ];
      }
    }
  };

  // Pre-defined special events (Austin-specific)
  private readonly SPECIAL_EVENTS: Record<string, { name: string; multiplier: number; period: (year: number) => { start: Date; end: Date } }> = {
    SXSW: {
      name: "SXSW",
      multiplier: 2.0,
      period: (year) => ({
        start: new Date(year, 2, 10), // March 10
        end: new Date(year, 2, 20)    // March 20
      })
    },
    ACL_WEEKEND_1: {
      name: "ACL Festival Weekend 1",
      multiplier: 1.75,
      period: (year) => ({
        start: new Date(year, 9, 1),  // First weekend of October
        end: new Date(year, 9, 7)
      })
    },
    ACL_WEEKEND_2: {
      name: "ACL Festival Weekend 2",
      multiplier: 1.75,
      period: (year) => ({
        start: new Date(year, 9, 8),  // Second weekend of October
        end: new Date(year, 9, 14)
      })
    },
    F1_WEEKEND: {
      name: "Formula 1 Weekend",
      multiplier: 2.5,
      period: (year) => ({
        start: new Date(year, 9, 20), // Third weekend of October (approximate)
        end: new Date(year, 9, 27)
      })
    },
    UT_GAMEDAYS: {
      name: "UT Football Game Day",
      multiplier: 1.4,
      period: (year) => ({
        // This would need to be updated with actual game schedule
        start: new Date(year, 8, 1),  // September
        end: new Date(year, 10, 30)   // November
      })
    }
  };

  /**
   * Get all pricing exceptions for a date
   */
  async getExceptionsForDate(date: Date): Promise<PricingException[]> {
    const exceptions: PricingException[] = [];
    
    // Check holidays
    const holidayExceptions = this.getHolidayExceptions(date);
    exceptions.push(...holidayExceptions);
    
    // Check special events
    const specialEventExceptions = this.getSpecialEventExceptions(date);
    exceptions.push(...specialEventExceptions);
    
    // Check database exceptions
    const dbExceptions = await this.getDatabaseExceptions(date);
    exceptions.push(...dbExceptions);
    
    // Sort by priority (higher first)
    return exceptions.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Calculate pricing with all exceptions
   */
  async calculatePricing(
    basePrice: number,
    date: Date,
    context?: {
      groupSize?: number;
      boatId?: string;
      eventType?: string;
      bookingTime?: Date;
    }
  ): Promise<PricingCalculation> {
    const exceptions = await this.getExceptionsForDate(date);
    const applicableExceptions: PricingCalculation['exceptions'] = [];
    let totalMultiplier = 1.0;
    
    for (const exception of exceptions) {
      if (this.isExceptionApplicable(exception, date, context)) {
        applicableExceptions.push({
          name: exception.name,
          type: exception.type,
          multiplier: exception.multiplier,
          impact: basePrice * (exception.multiplier - 1)
        });
        
        // Apply multiplier (compound for multiple exceptions)
        totalMultiplier *= exception.multiplier;
      }
    }
    
    // Add dynamic pricing rules
    if (context?.bookingTime) {
      const dynamicMultiplier = this.getDynamicPricingMultiplier(date, context.bookingTime, context.groupSize);
      if (dynamicMultiplier !== 1.0) {
        applicableExceptions.push({
          name: dynamicMultiplier > 1 ? 'Last-Minute Booking' : 'Group Discount',
          type: 'dynamic',
          multiplier: dynamicMultiplier,
          impact: basePrice * (dynamicMultiplier - 1)
        });
        totalMultiplier *= dynamicMultiplier;
      }
    }
    
    const finalPrice = Math.round(basePrice * totalMultiplier);
    
    return {
      basePrice,
      exceptions: applicableExceptions,
      finalPrice,
      totalMultiplier
    };
  }

  /**
   * Create custom pricing exception
   */
  async createException(data: {
    name: string;
    type: PricingException['type'];
    multiplier: number;
    startDate: Date;
    endDate: Date;
    conditions?: PricingException['conditions'];
    priority?: number;
  }): Promise<PricingException> {
    const [exception] = await db.insert(pricingExceptions)
      .values({
        name: data.name,
        exceptionType: data.type,
        multiplier: Math.round(data.multiplier * 100), // Store as percentage
        startDate: data.startDate,
        endDate: data.endDate,
        conditions: data.conditions || {},
        priority: data.priority || 50,
        active: true
      })
      .returning();
    
    return this.mapDbException(exception);
  }

  /**
   * Update pricing exception
   */
  async updateException(id: string, updates: Partial<PricingException>): Promise<PricingException> {
    const [updated] = await db.update(pricingExceptions)
      .set({
        name: updates.name,
        exceptionType: updates.type,
        multiplier: updates.multiplier ? Math.round(updates.multiplier * 100) : undefined,
        startDate: updates.startDate,
        endDate: updates.endDate,
        conditions: updates.conditions,
        priority: updates.priority,
        active: updates.active,
        updatedAt: new Date()
      })
      .where(eq(pricingExceptions.id, id))
      .returning();
    
    return this.mapDbException(updated);
  }

  /**
   * Delete pricing exception
   */
  async deleteException(id: string): Promise<boolean> {
    await db.delete(pricingExceptions)
      .where(eq(pricingExceptions.id, id));
    return true;
  }

  /**
   * Get all active exceptions
   */
  async getAllExceptions(): Promise<PricingException[]> {
    const exceptions = await db.select().from(pricingExceptions)
      .where(eq(pricingExceptions.active, true));
    
    return exceptions.map(this.mapDbException);
  }

  /**
   * Create holiday exception rules
   */
  async initializeHolidayExceptions(year: number): Promise<void> {
    for (const [key, holiday] of Object.entries(this.HOLIDAYS)) {
      const dates = holiday.dates(year);
      for (const date of dates) {
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        
        // Check if already exists
        const existing = await db.select().from(holidayExceptions)
          .where(
            and(
              eq(holidayExceptions.holidayName, holiday.name),
              eq(holidayExceptions.exceptionDate, date)
            )
          )
          .limit(1);
        
        if (existing.length === 0) {
          await db.insert(holidayExceptions)
            .values({
              exceptionDate: date,
              holidayName: holiday.name,
              priceMultiplier: Math.round(holiday.multiplier * 100),
              availabilityStatus: 'normal',
              active: true
            });
        }
      }
    }
  }

  /**
   * Create special event pricing rules
   */
  async initializeSpecialEvents(year: number): Promise<void> {
    for (const [key, event] of Object.entries(this.SPECIAL_EVENTS)) {
      const period = event.period(year);
      
      // Check if already exists
      const existing = await db.select().from(specialPricingRules)
        .where(
          and(
            eq(specialPricingRules.ruleName, event.name),
            gte(specialPricingRules.startDate, period.start),
            lte(specialPricingRules.startDate, period.end)
          )
        )
        .limit(1);
      
      if (existing.length === 0) {
        await db.insert(specialPricingRules)
          .values({
            ruleName: event.name,
            ruleType: 'special_event',
            startDate: period.start,
            endDate: period.end,
            priceMultiplier: Math.round(event.multiplier * 100),
            priority: 100, // High priority for special events
            active: true
          });
      }
    }
  }

  // Helper methods
  private getHolidayExceptions(date: Date): PricingException[] {
    const exceptions: PricingException[] = [];
    const year = date.getFullYear();
    
    for (const [key, holiday] of Object.entries(this.HOLIDAYS)) {
      const holidayDates = holiday.dates(year);
      for (const holidayDate of holidayDates) {
        if (this.isSameDay(date, holidayDate)) {
          exceptions.push({
            id: `holiday_${key}`,
            name: holiday.name,
            type: 'holiday',
            multiplier: holiday.multiplier,
            startDate: holidayDate,
            endDate: holidayDate,
            priority: 90,
            active: true
          });
        }
      }
    }
    
    return exceptions;
  }

  private getSpecialEventExceptions(date: Date): PricingException[] {
    const exceptions: PricingException[] = [];
    const year = date.getFullYear();
    
    for (const [key, event] of Object.entries(this.SPECIAL_EVENTS)) {
      const period = event.period(year);
      if (isWithinInterval(date, { start: period.start, end: period.end })) {
        exceptions.push({
          id: `event_${key}`,
          name: event.name,
          type: 'special_event',
          multiplier: event.multiplier,
          startDate: period.start,
          endDate: period.end,
          priority: 100,
          active: true
        });
      }
    }
    
    return exceptions;
  }

  private async getDatabaseExceptions(date: Date): Promise<PricingException[]> {
    const exceptions = await db.select().from(pricingExceptions)
      .where(
        and(
          lte(pricingExceptions.startDate, date),
          gte(pricingExceptions.endDate, date),
          eq(pricingExceptions.active, true)
        )
      );
    
    return exceptions.map(this.mapDbException);
  }

  private getDynamicPricingMultiplier(
    eventDate: Date,
    bookingTime: Date,
    groupSize?: number
  ): number {
    let multiplier = 1.0;
    
    // Last-minute booking (within 48 hours)
    const hoursUntilEvent = differenceInHours(eventDate, bookingTime);
    if (hoursUntilEvent <= 48 && hoursUntilEvent >= 0) {
      multiplier *= 1.2; // 20% surcharge
    }
    
    // Group discount (50+ people)
    if (groupSize && groupSize >= 50) {
      multiplier *= 0.9; // 10% discount
    }
    
    return multiplier;
  }

  private isExceptionApplicable(
    exception: PricingException,
    date: Date,
    context?: {
      groupSize?: number;
      boatId?: string;
      eventType?: string;
      bookingTime?: Date;
    }
  ): boolean {
    // Check date range
    if (!isWithinInterval(date, { start: exception.startDate, end: exception.endDate })) {
      return false;
    }
    
    // Check conditions
    if (exception.conditions) {
      const conditions = exception.conditions;
      
      if (conditions.minGroupSize && context?.groupSize && context.groupSize < conditions.minGroupSize) {
        return false;
      }
      
      if (conditions.maxGroupSize && context?.groupSize && context.groupSize > conditions.maxGroupSize) {
        return false;
      }
      
      if (conditions.boatIds && context?.boatId && !conditions.boatIds.includes(context.boatId)) {
        return false;
      }
      
      if (conditions.eventTypes && context?.eventType && !conditions.eventTypes.includes(context.eventType)) {
        return false;
      }
      
      if (conditions.withinHours && context?.bookingTime) {
        const hoursUntilEvent = differenceInHours(date, context.bookingTime);
        if (hoursUntilEvent > conditions.withinHours) {
          return false;
        }
      }
    }
    
    return exception.active;
  }

  private mapDbException(dbException: any): PricingException {
    return {
      id: dbException.id,
      name: dbException.name,
      type: dbException.exceptionType as PricingException['type'],
      multiplier: dbException.multiplier / 100, // Convert from percentage
      startDate: new Date(dbException.startDate),
      endDate: new Date(dbException.endDate),
      conditions: dbException.conditions as PricingException['conditions'],
      priority: dbException.priority,
      active: dbException.active
    };
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  private getLastMondayOfMonth(year: number, month: number): Date {
    const lastDay = new Date(year, month + 1, 0);
    const dayOfWeek = lastDay.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return new Date(lastDay.getTime() - diff * 86400000);
  }

  private getFirstMondayOfMonth(year: number, month: number): Date {
    const firstDay = new Date(year, month, 1);
    const dayOfWeek = firstDay.getDay();
    const diff = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
    return new Date(firstDay.getTime() + diff * 86400000);
  }

  private getFourthThursdayOfMonth(year: number, month: number): Date {
    const firstDay = new Date(year, month, 1);
    const dayOfWeek = firstDay.getDay();
    const firstThursday = dayOfWeek <= 4 ? 4 - dayOfWeek : 11 - dayOfWeek;
    return new Date(year, month, firstThursday + 21);
  }
}

export const pricingExceptionsService = new PricingExceptionsService();