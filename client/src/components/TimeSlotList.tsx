import { useState, useEffect } from 'react';
import { NormalizedSlot } from '@shared/schema';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, DollarSign, Anchor, Ship, Star, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from 'wouter';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { calculatePackagePricing, getCapacityTier, getPricingDayType } from '@shared/pricing';
import { formatCurrency } from '@shared/formatters';

export interface TimeSlotListProps {
  slots: NormalizedSlot[];
  onSlotSelect?: (slot: NormalizedSlot) => void;
  selectedSlotId?: string;
  showDate?: boolean;
  showPrice?: boolean;
  showCapacity?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  navigateToBooking?: boolean; // If true, automatically navigates to booking flow
  groupSize?: number; // For filtering and display
}

/**
 * Standardized component for displaying available time slots
 * Provides consistent presentation across all booking flows
 */
export const TimeSlotList = ({
  slots,
  onSlotSelect,
  selectedSlotId,
  showDate = true,
  showPrice = true,
  showCapacity = true,
  variant = 'default',
  className,
  navigateToBooking = false,
  groupSize,
}: TimeSlotListProps) => {
  const [, setLocation] = useLocation();

  const generateBookingSlotId = (slot: NormalizedSlot): string => {
    if (slot.cruiseType === 'disco') {
      // For disco slots, use the slot ID with disco prefix
      return slot.id.startsWith('disco_') ? slot.id : `disco_${slot.id}`;
    } else {
      // For private slots, generate proper format: private_{boatId}_{date}_{startTime}_{endTime}
      // Use the first available boat - slot should only be bookable if boatCandidates exist
      if (!slot.boatCandidates || slot.boatCandidates.length === 0) {
        console.error('No boat candidates available for private slot:', slot.id);
        return slot.id; // Return original slot ID as fallback to avoid breaking
      }
      const boatId = slot.boatCandidates[0];
      const dateStr = slot.dateISO;
      const startTime = slot.startTime; // Keep HH:mm format - do not remove colon
      const endTime = slot.endTime; // Keep HH:mm format - do not remove colon
      
      // Return slot ID as-is if it already has the proper format, otherwise generate it
      if (slot.id.startsWith('private_')) {
        return slot.id;
      }
      return `private_${boatId}_${dateStr}_${startTime}_${endTime}`;
    }
  };

  const handleSlotClick = (slot: NormalizedSlot) => {
    // Call custom handler if provided
    if (onSlotSelect) {
      onSlotSelect(slot);
    }

    // Navigate to booking flow if enabled
    if (navigateToBooking) {
      const bookingSlotId = generateBookingSlotId(slot);
      const bookingPath = `/book/${bookingSlotId}`;
      setLocation(bookingPath);
    }
  };

  const formatDate = (dateISO: string): string => {
    const date = new Date(dateISO);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };

  const formatTimeRange = (startTime: string, endTime: string): string => {
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, '0')}${period}`;
    };

    return `${formatTime(startTime)}–${formatTime(endTime)}`;
  };

  const formatPrice = (price: number): string => {
    return formatCurrency(price / 100);
  };

  // Enhanced pricing calculation for real-time pricing display
  const getEnhancedPricing = (slot: NormalizedSlot) => {
    if (slot.cruiseType === 'disco') {
      // Disco pricing logic
      const slotDate = new Date(slot.dateISO);
      const dayOfWeek = slotDate.getDay();
      const basePrice = dayOfWeek === 6 ? 9500 : 8500; // Saturday premium
      
      return {
        displayPrice: slot.price || basePrice,
        dayType: dayOfWeek === 6 ? 'Saturday' : dayOfWeek === 5 ? 'Friday' : dayOfWeek === 0 ? 'Sunday' : 'Weekday',
        packages: [
          { name: 'Basic', price: basePrice, description: 'Dance floor + cash bar' },
          { name: 'Disco Queen', price: basePrice + 1000, description: 'Basic + VIP + welcome drink', popular: true },
          { name: 'Platinum', price: basePrice + 2000, description: 'All inclusive + bottle service' }
        ],
        perPersonEstimate: Math.floor(basePrice / Math.min(slot.capacity, groupSize || 20))
      };
    } else {
      // Private cruise pricing calculation
      try {
        const slotDate = new Date(slot.dateISO);
        const capacityTier = getCapacityTier(Math.max(groupSize || 20, slot.capacity * 0.7));
        const dayType = getPricingDayType(slotDate);
        
        const standardPricing = calculatePackagePricing(slotDate, capacityTier, 'standard');
        const essentialsPricing = calculatePackagePricing(slotDate, capacityTier, 'essentials');
        const ultimatePricing = calculatePackagePricing(slotDate, capacityTier, 'ultimate');
        
        const dayNames = {
          'MON_THU': 'Mon-Thu',
          'FRIDAY': 'Friday',
          'SATURDAY': 'Saturday',
          'SUNDAY': 'Sunday'
        };
        
        return {
          displayPrice: slot.price || standardPricing.totalPrice,
          dayType: dayNames[dayType] || dayType,
          packages: [
            { name: 'Standard', price: standardPricing.totalPrice, description: 'Base charter package' },
            { name: 'Essentials', price: essentialsPricing.totalPrice, description: 'Standard + premium add-ons', popular: true },
            { name: 'Ultimate', price: ultimatePricing.totalPrice, description: 'All-inclusive luxury experience' }
          ],
          perPersonEstimate: Math.floor(standardPricing.totalPrice / capacityTier),
          crewFeeInfo: capacityTier >= 30 ? 'Includes crew fee for larger groups' : null
        };
      } catch (error) {
        console.warn('Error calculating enhanced pricing:', error);
        return {
          displayPrice: slot.price || 0,
          dayType: 'Unknown',
          packages: [],
          perPersonEstimate: 0
        };
      }
    }
  };

  const getSlotStatus = (slot: NormalizedSlot): {
    status: 'available' | 'limited' | 'unavailable' | 'booked';
    label: string;
    variant: 'default' | 'secondary' | 'outline' | 'destructive';
  } => {
    // Check if slot is explicitly marked as booked or has conflicting bookings
    if (!slot.bookable || slot.held) {
      // Check if it's held vs fully booked
      if (slot.held) {
        return { status: 'unavailable', label: 'On Hold', variant: 'secondary' };
      }
      // Slot is booked
      return { status: 'booked', label: '❌ BOOKED', variant: 'destructive' };
    }
    if (slot.availableCount <= 2) {
      return { status: 'limited', label: 'Limited Availability', variant: 'secondary' };
    }
    return { status: 'available', label: '✅ Available', variant: 'default' };
  };

  const getSlotIcon = (cruiseType: 'private' | 'disco') => {
    return cruiseType === 'disco' ? '🎉' : '⛵';
  };

  // Enhanced color coding system for boat capacities/types
  const getCapacityColorClasses = (capacity: number, variant: 'card' | 'text' | 'accent' = 'card') => {
    const colorScheme = {
      small: { // 8-15 capacity (Day Tripper boats)
        card: 'border-l-4 border-l-purple-500 bg-purple-50/50 dark:bg-purple-900/10',
        text: 'text-purple-700 dark:text-purple-400',
        accent: 'bg-purple-100 dark:bg-purple-900/30'
      },
      medium: { // 16-25 capacity (Meeseeks, The Irony)
        card: 'border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-900/10',
        text: 'text-red-700 dark:text-red-400',
        accent: 'bg-red-100 dark:bg-red-900/30'
      },
      large: { // 26-50 capacity (Clever Girl)
        card: 'border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-900/10',
        text: 'text-orange-700 dark:text-orange-400',
        accent: 'bg-orange-100 dark:bg-orange-900/30'
      },
      xlarge: { // 51+ capacity (Big boats)
        card: 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10',
        text: 'text-blue-700 dark:text-blue-400',
        accent: 'bg-blue-100 dark:bg-blue-900/30'
      },
      disco: { // Disco cruises
        card: 'border-l-4 border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10',
        text: 'text-yellow-700 dark:text-yellow-400',
        accent: 'bg-yellow-100 dark:bg-yellow-900/30'
      }
    };

    if (capacity <= 15) return colorScheme.small[variant];
    if (capacity <= 25) return colorScheme.medium[variant];
    if (capacity <= 50) return colorScheme.large[variant];
    return colorScheme.xlarge[variant];
  };

  const getDiscoColorClasses = (variant: 'card' | 'text' | 'accent' = 'card') => {
    const colorScheme = {
      card: 'border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-pink-50 dark:from-yellow-900/10 dark:to-pink-900/10',
      text: 'text-yellow-700 dark:text-yellow-400',
      accent: 'bg-gradient-to-r from-yellow-100 to-pink-100 dark:from-yellow-900/30 dark:to-pink-900/30'
    };
    return colorScheme[variant];
  };

  // Smart matching: highlight slots closest to user's group size
  const getGroupSizeMatchScore = (slot: NormalizedSlot, userGroupSize?: number): 'perfect' | 'good' | 'acceptable' | 'poor' => {
    if (!userGroupSize || !slot.capacity) return 'acceptable';
    
    const ratio = userGroupSize / slot.capacity;
    
    if (ratio >= 0.8 && ratio <= 1.0) return 'perfect'; // 80-100% capacity utilization
    if (ratio >= 0.6 && ratio < 0.8) return 'good';     // 60-79% capacity utilization
    if (ratio >= 0.4 && ratio < 0.6) return 'acceptable'; // 40-59% capacity utilization
    return 'poor'; // Under 40% or over 100%
  };

  const getMatchScoreStyles = (score: 'perfect' | 'good' | 'acceptable' | 'poor') => {
    switch (score) {
      case 'perfect':
        return 'ring-2 ring-green-500 shadow-lg border-green-200 dark:border-green-800';
      case 'good':
        return 'ring-1 ring-blue-400 shadow-md border-blue-200 dark:border-blue-800';
      case 'acceptable':
        return '';
      case 'poor':
        return 'opacity-75';
      default:
        return '';
    }
  };

  const getMatchScoreBadge = (score: 'perfect' | 'good' | 'acceptable' | 'poor') => {
    switch (score) {
      case 'perfect':
        return { label: 'Perfect Match', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: <Star className="h-3 w-3" /> };
      case 'good':
        return { label: 'Great Match', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', icon: <Ship className="h-3 w-3" /> };
      default:
        return null;
    }
  };

  if (slots.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground" data-testid="timeslot-list-empty">
        <Clock className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <p className="text-lg font-medium mb-2">No time slots available</p>
        <p className="text-sm">Try adjusting your search criteria or selecting different dates.</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)} data-testid="timeslot-list">
      {slots.map((slot) => {
        const isSelected = selectedSlotId === slot.id;
        const slotStatus = getSlotStatus(slot);
        const { status, label, variant: statusVariant } = slotStatus;
        const isDisabled = !slot.bookable;
        const isBooked = status === 'booked';
        
        const matchScore = getGroupSizeMatchScore(slot, groupSize);
        const matchBadge = getMatchScoreBadge(matchScore);
        
        return (
          <Card 
            key={slot.id}
            className={cn(
              "transition-all duration-200",
              // BOOKED SLOT STYLING - Most prominent
              isBooked && [
                "bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-700",
                "cursor-not-allowed opacity-90",
                "relative overflow-hidden"
              ],
              // Enhanced color coding based on boat type/capacity (only if not booked)
              !isBooked && (slot.cruiseType === 'disco' 
                ? getDiscoColorClasses('card')
                : getCapacityColorClasses(slot.capacity, 'card')),
              // Smart matching styles (only if not booked)
              !isBooked && groupSize && getMatchScoreStyles(matchScore),
              // Selection and interaction states
              isSelected && !isBooked && "ring-2 ring-primary border-primary",
              isDisabled && !isBooked && "opacity-60 cursor-not-allowed",
              !isDisabled && !isBooked && "cursor-pointer hover:shadow-md hover:border-primary/50"
            )}
            onClick={() => !isDisabled && handleSlotClick(slot)}
            data-testid={`timeslot-card-${slot.id}`}
          >
            {/* Red diagonal stripe overlay for booked slots */}
            {isBooked && (
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{
                  background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgb(239 68 68) 10px, rgb(239 68 68) 20px)'
                }}
              />
            )}
            <CardContent className={cn(
              "p-2",
              variant === 'compact' && "p-1.5",
              variant === 'detailed' && "p-3"
            )}>
              {/* New compact layout with hierarchy */}
              <div className="space-y-1">
                {/* TOP: Boat capacity and name - most prominent */}
                <div className="flex items-center justify-between">
                  <div className="font-bold text-base" data-testid={`timeslot-boat-${slot.id}`}>
                    {slot.cruiseType === 'private' && slot.boatCandidates.length > 0 && (
                      <span className={cn(
                        "flex items-center gap-2",
                        getCapacityColorClasses(slot.capacity, 'text')
                      )}>
                        <Ship className="h-4 w-4" />
                        {slot.boatCandidates.length > 1 
                          ? `${slot.boatCandidates.length} Boats` 
                          : `Boat`} (Capacity: {slot.capacity})
                      </span>
                    )}
                    {slot.cruiseType === 'disco' && (
                      <span className={cn(
                        "flex items-center gap-2",
                        getDiscoColorClasses('text')
                      )}>
                        🎉 Disco Cruise (Up to {slot.capacity})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {/* Smart matching badge */}
                    {matchBadge && (
                      <Badge className={cn("text-xs flex items-center gap-1", matchBadge.className)}>
                        {matchBadge.icon}
                        {matchBadge.label}
                      </Badge>
                    )}
                    <Badge 
                      variant={getSlotStatus(slot).variant} 
                      className="text-xs"
                      data-testid={`timeslot-status-${slot.id}`}
                    >
                      {label}
                    </Badge>
                  </div>
                </div>

                {/* MIDDLE: Time slot information */}
                <div className={cn(
                  "font-medium text-sm text-foreground",
                  isBooked && "line-through text-muted-foreground"
                )} data-testid={`timeslot-label-${slot.id}`}>
                  {showDate && `${formatDate(slot.dateISO)} • `}
                  {formatTimeRange(slot.startTime, slot.endTime)}
                  {isBooked && (
                    <span className="ml-2 text-red-600 dark:text-red-400 font-bold no-underline" style={{ textDecoration: 'none' }}>
                      [FULLY BOOKED]
                    </span>
                  )}
                </div>

                {/* BOTTOM: Enhanced pricing with day-of-week information */}
                {showPrice && (
                  <div className="pt-1 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-base text-foreground" data-testid={`timeslot-price-${slot.id}`}>
                          {slot.cruiseType === 'disco' 
                            ? `${formatPrice(getEnhancedPricing(slot).displayPrice)} per ticket`
                            : `From ${formatPrice(getEnhancedPricing(slot).displayPrice)}`
                          }
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              <div className="space-y-2">
                                <div className="font-semibold text-sm border-b pb-1">
                                  {slot.cruiseType === 'disco' ? 'Disco Cruise Packages' : `${slot.capacity}-Person Boat Pricing`}
                                </div>
                                <div className="text-xs space-y-1">
                                  <div className="text-muted-foreground">Day Type: {getEnhancedPricing(slot).dayType}</div>
                                  {getEnhancedPricing(slot).packages.map((pkg, idx) => (
                                    <div key={idx} className={cn(
                                      "flex justify-between items-center p-1 rounded",
                                      pkg.popular && "bg-yellow-100 border border-yellow-300"
                                    )}>
                                      <div>
                                        <span className={cn(pkg.popular && "font-semibold")}>
                                          {pkg.name} {pkg.popular && '⭐'}
                                        </span>
                                        <div className="text-xs text-muted-foreground">{pkg.description}</div>
                                      </div>
                                      <span className="font-medium">{formatPrice(pkg.price)}</span>
                                    </div>
                                  ))}
                                  <div className="text-xs text-muted-foreground pt-1 border-t">
                                    ~{formatPrice(getEnhancedPricing(slot).perPersonEstimate)}/person estimate
                                    {getEnhancedPricing(slot).crewFeeInfo && (
                                      <div className="mt-1">{getEnhancedPricing(slot).crewFeeInfo}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {slot.duration}h cruise
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {getEnhancedPricing(slot).dayType}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      ~{formatPrice(getEnhancedPricing(slot).perPersonEstimate)}/person • 
                      {slot.cruiseType === 'disco' ? ' Live DJ • Dance floor' : ' Private charter'}
                    </div>
                  </div>
                )}

                {/* Action button for detailed variant only */}
                {variant === 'detailed' && !isDisabled && (
                  <Button
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    className="w-full mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSlotClick(slot);
                    }}
                    data-testid={`button-select-slot-${slot.id}`}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </Button>
                )}
              </div>


              {/* Group size validation warning */}
              {groupSize && groupSize > slot.capacity && (
                <div className="mt-3 pt-3 border-t border-destructive/20">
                  <div className="text-sm text-destructive flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Your group size ({groupSize}) exceeds this slot's capacity ({slot.capacity})</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

