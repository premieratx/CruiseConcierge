import { inventoryService, type InventoryItem, type TimeSlot } from "./inventoryService";
import { format, isWeekday, isFriday, isWeekend } from "date-fns";

export interface BoatRecommendation {
  boatId: string;
  boatName: string;
  score: number;
  reasons: string[];
  capacity: {
    min: number;
    max: number;
    optimal: number;
  };
  pricing: {
    base: number;
    perPerson: number;
    estimated: number;
  };
  availability: {
    hasAvailability: boolean;
    nextAvailable?: Date;
    availableSlots: TimeSlot[];
  };
}

export interface RulesContext {
  groupSize: number;
  eventType: string;
  eventDate: Date;
  duration?: number;
  budget?: number;
  specialRequests?: string[];
  preferredBoats?: string[];
  excludeBoats?: string[];
}

export interface RuleResult {
  recommended: BoatRecommendation[];
  suitable: BoatRecommendation[];
  notSuitable: Array<{ boatName: string; reason: string }>;
  appliedRules: string[];
}

class RulesEngine {
  // Boat capacity rules
  private readonly BOAT_RULES = {
    'Day Tripper': { min: 1, max: 14, optimal: 10 },
    'Me Seek': { min: 15, max: 30, optimal: 25 },
    'The Irony': { min: 15, max: 30, optimal: 25 },
    'Clever Girl': { min: 31, max: 75, optimal: 50 },
    'ATX Disco': { min: 20, max: 100, optimal: 75, discoOnly: true }
  };

  // Event type boat restrictions
  private readonly EVENT_TYPE_BOATS = {
    'private': ['Day Tripper', 'Me Seek', 'The Irony', 'Clever Girl'],
    'disco': ['ATX Disco'],
    'bachelor': ['Day Tripper', 'Me Seek', 'The Irony', 'Clever Girl'],
    'bachelorette': ['Day Tripper', 'Me Seek', 'The Irony', 'Clever Girl', 'ATX Disco'],
    'corporate': ['Day Tripper', 'Me Seek', 'The Irony', 'Clever Girl'],
    'birthday': ['Day Tripper', 'Me Seek', 'The Irony', 'Clever Girl', 'ATX Disco'],
    'wedding': ['Me Seek', 'The Irony', 'Clever Girl']
  };

  // Duration rules by day type
  private readonly DURATION_RULES = {
    weekday: [3, 4],        // 3hr or 4hr
    friday: [4],            // 4hr only
    weekend: [4],           // 4hr only
    disco: [4]              // Fixed 4hr for disco
  };

  /**
   * Get recommended boats based on rules
   */
  async getRecommendations(context: RulesContext): Promise<RuleResult> {
    const appliedRules: string[] = [];
    const inventory = await inventoryService.getAllInventory();
    
    // Apply group size rules
    const sizeFiltered = this.applyGroupSizeRules(inventory, context, appliedRules);
    
    // Apply event type rules
    const eventFiltered = this.applyEventTypeRules(sizeFiltered.suitable, context, appliedRules);
    
    // Apply availability rules
    const availabilityChecked = await this.applyAvailabilityRules(eventFiltered.suitable, context, appliedRules);
    
    // Apply duration rules
    const durationFiltered = this.applyDurationRules(availabilityChecked.suitable, context, appliedRules);
    
    // Apply pricing rules
    const pricingScored = await this.applyPricingRules(durationFiltered.suitable, context, appliedRules);
    
    // Score and rank recommendations
    const scored = await this.scoreRecommendations(pricingScored.suitable, context, appliedRules);
    
    // Combine all unsuitable boats
    const notSuitable = [
      ...sizeFiltered.notSuitable,
      ...eventFiltered.notSuitable,
      ...availabilityChecked.notSuitable,
      ...durationFiltered.notSuitable,
      ...pricingScored.notSuitable
    ];

    return {
      recommended: scored.filter(r => r.score >= 80),
      suitable: scored.filter(r => r.score >= 50 && r.score < 80),
      notSuitable,
      appliedRules
    };
  }

  /**
   * Apply group size rules
   */
  private applyGroupSizeRules(
    inventory: InventoryItem[],
    context: RulesContext,
    appliedRules: string[]
  ): { suitable: InventoryItem[]; notSuitable: Array<{ boatName: string; reason: string }> } {
    appliedRules.push(`GROUP_SIZE_FILTER: ${context.groupSize} people`);
    
    const suitable: InventoryItem[] = [];
    const notSuitable: Array<{ boatName: string; reason: string }> = [];
    
    for (const item of inventory) {
      const rule = this.BOAT_RULES[item.name as keyof typeof this.BOAT_RULES];
      if (!rule) continue;
      
      if (context.groupSize >= rule.min && context.groupSize <= rule.max) {
        suitable.push(item);
      } else if (context.groupSize < rule.min) {
        notSuitable.push({
          boatName: item.name,
          reason: `Too few people (minimum ${rule.min})`
        });
      } else {
        notSuitable.push({
          boatName: item.name,
          reason: `Too many people (maximum ${rule.max})`
        });
      }
    }
    
    return { suitable, notSuitable };
  }

  /**
   * Apply event type rules
   */
  private applyEventTypeRules(
    inventory: InventoryItem[],
    context: RulesContext,
    appliedRules: string[]
  ): { suitable: InventoryItem[]; notSuitable: Array<{ boatName: string; reason: string }> } {
    appliedRules.push(`EVENT_TYPE_FILTER: ${context.eventType}`);
    
    const allowedBoats = this.EVENT_TYPE_BOATS[context.eventType as keyof typeof this.EVENT_TYPE_BOATS] || 
                        this.EVENT_TYPE_BOATS['private'];
    
    const suitable: InventoryItem[] = [];
    const notSuitable: Array<{ boatName: string; reason: string }> = [];
    
    for (const item of inventory) {
      if (allowedBoats.includes(item.name)) {
        suitable.push(item);
      } else {
        notSuitable.push({
          boatName: item.name,
          reason: `Not available for ${context.eventType} events`
        });
      }
    }
    
    // Apply user preferences
    if (context.preferredBoats && context.preferredBoats.length > 0) {
      appliedRules.push(`PREFERRED_BOATS: ${context.preferredBoats.join(', ')}`);
    }
    
    if (context.excludeBoats && context.excludeBoats.length > 0) {
      appliedRules.push(`EXCLUDED_BOATS: ${context.excludeBoats.join(', ')}`);
      return {
        suitable: suitable.filter(item => !context.excludeBoats!.includes(item.boatId)),
        notSuitable: [
          ...notSuitable,
          ...suitable.filter(item => context.excludeBoats!.includes(item.boatId))
            .map(item => ({ boatName: item.name, reason: 'Excluded by user preference' }))
        ]
      };
    }
    
    return { suitable, notSuitable };
  }

  /**
   * Apply availability rules
   */
  private async applyAvailabilityRules(
    inventory: InventoryItem[],
    context: RulesContext,
    appliedRules: string[]
  ): Promise<{ suitable: InventoryItem[]; notSuitable: Array<{ boatName: string; reason: string }> }> {
    appliedRules.push(`AVAILABILITY_CHECK: ${format(context.eventDate, 'yyyy-MM-dd')}`);
    
    const suitable: InventoryItem[] = [];
    const notSuitable: Array<{ boatName: string; reason: string }> = [];
    
    // Check disco cruise specific rules
    if (context.eventType === 'disco') {
      const dayOfWeek = context.eventDate.getDay();
      if (dayOfWeek !== 6) { // Not Saturday
        appliedRules.push('DISCO_DAY_RULE: Disco cruises only on Saturdays');
        return {
          suitable: [],
          notSuitable: inventory.map(item => ({
            boatName: item.name,
            reason: 'Disco cruises only available on Saturdays'
          }))
        };
      }
    }
    
    // Check each boat's availability
    for (const item of inventory) {
      const startDate = new Date(context.eventDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(context.eventDate);
      endDate.setHours(23, 59, 59, 999);
      
      const slots = await inventoryService.getAvailableSlots(item.id, startDate, endDate);
      const availableSlots = slots.filter(s => s.status === 'available');
      
      if (availableSlots.length > 0) {
        suitable.push(item);
      } else {
        notSuitable.push({
          boatName: item.name,
          reason: 'No availability on selected date'
        });
      }
    }
    
    return { suitable, notSuitable };
  }

  /**
   * Apply duration rules
   */
  private applyDurationRules(
    inventory: InventoryItem[],
    context: RulesContext,
    appliedRules: string[]
  ): { suitable: InventoryItem[]; notSuitable: Array<{ boatName: string; reason: string }> } {
    if (!context.duration) {
      return { suitable: inventory, notSuitable: [] };
    }
    
    const dayType = this.getDayType(context.eventDate);
    const allowedDurations = context.eventType === 'disco' 
      ? this.DURATION_RULES.disco 
      : this.DURATION_RULES[dayType];
    
    appliedRules.push(`DURATION_RULE: ${dayType} allows ${allowedDurations.join(' or ')}hr cruises`);
    
    if (!allowedDurations.includes(context.duration)) {
      return {
        suitable: [],
        notSuitable: inventory.map(item => ({
          boatName: item.name,
          reason: `${context.duration}hr cruises not available on ${dayType}s`
        }))
      };
    }
    
    return { suitable: inventory, notSuitable: [] };
  }

  /**
   * Apply pricing rules
   */
  private async applyPricingRules(
    inventory: InventoryItem[],
    context: RulesContext,
    appliedRules: string[]
  ): Promise<{ suitable: InventoryItem[]; notSuitable: Array<{ boatName: string; reason: string }> }> {
    if (!context.budget) {
      return { suitable: inventory, notSuitable: [] };
    }
    
    appliedRules.push(`BUDGET_FILTER: $${(context.budget / 100).toFixed(2)}`);
    
    const suitable: InventoryItem[] = [];
    const notSuitable: Array<{ boatName: string; reason: string }> = [];
    
    const dayType = this.getDayType(context.eventDate);
    const duration = context.duration || 4;
    
    for (const item of inventory) {
      const basePrice = item.basePricing[dayType] * duration;
      
      // Add estimated crew fees
      let totalPrice = basePrice;
      if (item.crewRequirements.extraThreshold && context.groupSize > item.crewRequirements.extraThreshold) {
        totalPrice += (item.crewRequirements.extraCrew || 1) * 5000 * duration; // $50/hr per extra crew
      }
      
      if (totalPrice <= context.budget) {
        suitable.push(item);
      } else {
        notSuitable.push({
          boatName: item.name,
          reason: `Over budget ($${(totalPrice / 100).toFixed(2)} > $${(context.budget / 100).toFixed(2)})`
        });
      }
    }
    
    return { suitable, notSuitable };
  }

  /**
   * Score and rank recommendations
   */
  private async scoreRecommendations(
    inventory: InventoryItem[],
    context: RulesContext,
    appliedRules: string[]
  ): Promise<BoatRecommendation[]> {
    appliedRules.push('SCORING: Capacity fit, pricing value, availability, features');
    
    const recommendations: BoatRecommendation[] = [];
    const dayType = this.getDayType(context.eventDate);
    const duration = context.duration || 4;
    
    for (const item of inventory) {
      const rule = this.BOAT_RULES[item.name as keyof typeof this.BOAT_RULES];
      if (!rule) continue;
      
      let score = 100;
      const reasons: string[] = [];
      
      // Score based on capacity fit (max 40 points)
      const capacityUtilization = context.groupSize / rule.optimal;
      if (capacityUtilization >= 0.7 && capacityUtilization <= 1.0) {
        score -= 0; // Perfect fit
        reasons.push('Perfect capacity match');
      } else if (capacityUtilization >= 0.5 && capacityUtilization < 0.7) {
        score -= 10;
        reasons.push('Good capacity fit');
      } else if (capacityUtilization > 1.0 && capacityUtilization <= 1.2) {
        score -= 15;
        reasons.push('Slightly over optimal capacity');
      } else {
        score -= 25;
        reasons.push('Capacity not optimal');
      }
      
      // Score based on pricing (max 30 points)
      const basePrice = item.basePricing[dayType] * duration;
      const perPersonPrice = basePrice / context.groupSize;
      
      if (perPersonPrice <= 10000) { // $100 or less per person
        reasons.push('Excellent value');
      } else if (perPersonPrice <= 15000) { // $150 or less per person
        score -= 10;
        reasons.push('Good value');
      } else {
        score -= 20;
        reasons.push('Premium pricing');
      }
      
      // Score based on features (max 20 points)
      if (item.amenities.length > 5) {
        reasons.push('Full amenities');
      } else {
        score -= 10;
      }
      
      // Score based on user preferences (max 10 points)
      if (context.preferredBoats?.includes(item.boatId)) {
        score += 10;
        reasons.push('User preferred');
      }
      
      // Get availability
      const startDate = new Date(context.eventDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(context.eventDate);
      endDate.setHours(23, 59, 59, 999);
      
      const slots = await inventoryService.getAvailableSlots(item.id, startDate, endDate);
      const availableSlots = slots.filter(s => s.status === 'available');
      
      recommendations.push({
        boatId: item.boatId,
        boatName: item.name,
        score: Math.max(0, Math.min(100, score)),
        reasons,
        capacity: {
          min: rule.min,
          max: rule.max,
          optimal: rule.optimal
        },
        pricing: {
          base: basePrice,
          perPerson: perPersonPrice,
          estimated: basePrice
        },
        availability: {
          hasAvailability: availableSlots.length > 0,
          availableSlots: availableSlots.slice(0, 5) // Top 5 slots
        }
      });
    }
    
    // Sort by score
    return recommendations.sort((a, b) => b.score - a.score);
  }

  /**
   * Validate booking request against rules
   */
  async validateBooking(
    boatId: string,
    context: {
      groupSize: number;
      eventType: string;
      eventDate: Date;
      duration: number;
    }
  ): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    const inventory = await inventoryService.getAllInventory();
    const boat = inventory.find(item => item.boatId === boatId);
    
    if (!boat) {
      return { valid: false, errors: ['Boat not found'] };
    }
    
    const rule = this.BOAT_RULES[boat.name as keyof typeof this.BOAT_RULES];
    
    // Validate group size
    if (rule) {
      if (context.groupSize < rule.min) {
        errors.push(`Group size too small (minimum ${rule.min})`);
      }
      if (context.groupSize > rule.max) {
        errors.push(`Group size too large (maximum ${rule.max})`);
      }
    }
    
    // Validate event type
    const allowedBoats = this.EVENT_TYPE_BOATS[context.eventType as keyof typeof this.EVENT_TYPE_BOATS];
    if (allowedBoats && !allowedBoats.includes(boat.name)) {
      errors.push(`${boat.name} not available for ${context.eventType} events`);
    }
    
    // Validate disco rules
    if (context.eventType === 'disco' && context.eventDate.getDay() !== 6) {
      errors.push('Disco cruises only available on Saturdays');
    }
    
    // Validate duration
    const dayType = this.getDayType(context.eventDate);
    const allowedDurations = context.eventType === 'disco' 
      ? this.DURATION_RULES.disco 
      : this.DURATION_RULES[dayType];
    
    if (!allowedDurations.includes(context.duration)) {
      errors.push(`${context.duration}hr cruises not available on ${dayType}s`);
    }
    
    return { valid: errors.length === 0, errors };
  }

  /**
   * Get optimal boat for group
   */
  async getOptimalBoat(
    groupSize: number,
    eventType: string,
    eventDate: Date
  ): Promise<BoatRecommendation | null> {
    const result = await this.getRecommendations({
      groupSize,
      eventType,
      eventDate
    });
    
    return result.recommended[0] || result.suitable[0] || null;
  }

  /**
   * Check if special rules apply to date
   */
  getSpecialDateRules(date: Date): string[] {
    const rules: string[] = [];
    const month = date.getMonth();
    const dayOfMonth = date.getDate();
    
    // Holiday rules
    if (month === 11 && dayOfMonth === 31) rules.push('NEW_YEARS_EVE');
    if (month === 6 && dayOfMonth === 4) rules.push('JULY_4TH');
    if (month === 4 && dayOfMonth >= 25 && dayOfMonth <= 31 && date.getDay() === 1) rules.push('MEMORIAL_DAY');
    if (month === 8 && dayOfMonth <= 7 && date.getDay() === 1) rules.push('LABOR_DAY');
    
    // Special event periods (approximate dates)
    if (month === 2 && dayOfMonth >= 10 && dayOfMonth <= 20) rules.push('SXSW');
    if (month === 9 && (dayOfMonth <= 7 || (dayOfMonth >= 14 && dayOfMonth <= 21))) rules.push('ACL');
    if (month === 9 && dayOfMonth >= 20 && dayOfMonth <= 27) rules.push('F1_WEEKEND');
    
    return rules;
  }

  // Helper methods
  private getDayType(date: Date): 'weekday' | 'friday' | 'weekend' {
    const day = date.getDay();
    if (day === 5) return 'friday';
    if (day === 0 || day === 6) return 'weekend';
    return 'weekday';
  }
}

export const rulesEngine = new RulesEngine();