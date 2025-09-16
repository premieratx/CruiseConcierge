import { useState, useEffect } from 'react';
import { NormalizedSlot } from '@shared/schema';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, DollarSign, Anchor } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'wouter';

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
  const navigate = useNavigate();

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
      navigate(bookingPath);
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  const getSlotStatus = (slot: NormalizedSlot): {
    status: 'available' | 'held' | 'limited' | 'unavailable';
    label: string;
    variant: 'default' | 'secondary' | 'outline' | 'destructive';
  } => {
    if (!slot.bookable) {
      return { status: 'unavailable', label: 'Unavailable', variant: 'destructive' };
    }
    if (slot.held) {
      return { status: 'held', label: 'On Hold', variant: 'outline' };
    }
    if (slot.availableCount <= 2) {
      return { status: 'limited', label: 'Limited Availability', variant: 'secondary' };
    }
    return { status: 'available', label: 'Available', variant: 'default' };
  };

  const getSlotIcon = (cruiseType: 'private' | 'disco') => {
    return cruiseType === 'disco' ? '🎉' : '⛵';
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
        const { status, label, variant: statusVariant } = getSlotStatus(slot);
        const isDisabled = !slot.bookable;
        
        return (
          <Card 
            key={slot.id}
            className={cn(
              "transition-all duration-200 hover:shadow-md",
              isSelected && "ring-2 ring-primary border-primary",
              isDisabled && "opacity-60 cursor-not-allowed",
              !isDisabled && "cursor-pointer hover:border-primary/50"
            )}
            onClick={() => !isDisabled && handleSlotClick(slot)}
            data-testid={`timeslot-card-${slot.id}`}
          >
            <CardContent className={cn(
              "p-4",
              variant === 'compact' && "p-3",
              variant === 'detailed' && "p-6"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {/* Main time slot information */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg" aria-label={`${slot.cruiseType} cruise`}>
                      {getSlotIcon(slot.cruiseType)}
                    </span>
                    <div>
                      <div className="font-semibold text-lg" data-testid={`timeslot-label-${slot.id}`}>
                        {showDate && `${formatDate(slot.dateISO)} · `}
                        {formatTimeRange(slot.startTime, slot.endTime)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {slot.duration}h {slot.cruiseType} cruise
                      </div>
                    </div>
                  </div>

                  {/* Additional details for non-compact variants */}
                  {variant !== 'compact' && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {showCapacity && (
                        <div className="flex items-center gap-1" data-testid={`timeslot-capacity-${slot.id}`}>
                          <Users className="h-4 w-4" />
                          <span>Up to {slot.capacity} guests</span>
                        </div>
                      )}
                      
                      {slot.cruiseType === 'private' && slot.boatCandidates.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Anchor className="h-4 w-4" />
                          <span>{slot.boatCandidates.length} boat{slot.boatCandidates.length > 1 ? 's' : ''} available</span>
                        </div>
                      )}

                      {showPrice && (
                        <div className="flex items-center gap-1" data-testid={`timeslot-price-${slot.id}`}>
                          <DollarSign className="h-4 w-4" />
                          <span>
                            {slot.cruiseType === 'disco' 
                              ? `${formatPrice(slot.price)} per ticket`
                              : `From ${formatPrice(slot.price)}`
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Status and action button */}
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={statusVariant} data-testid={`timeslot-status-${slot.id}`}>
                    {label}
                  </Badge>
                  
                  {variant === 'detailed' && !isDisabled && (
                    <Button
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
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
              </div>

              {/* Hold expiration countdown for held slots */}
              {slot.held && slot.holdExpiresAt && (
                <div className="mt-3 pt-3 border-t border-border">
                  <HoldCountdown expiresAt={slot.holdExpiresAt} slotId={slot.id} />
                </div>
              )}

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

/**
 * Component for displaying hold countdown timer
 */
interface HoldCountdownProps {
  expiresAt: Date;
  slotId: string;
}

const HoldCountdown = ({ expiresAt, slotId }: HoldCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeUntilExpiration = expiresAt.getTime() - now.getTime();
      
      if (timeUntilExpiration <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const minutes = Math.floor(timeUntilExpiration / (1000 * 60));
      const seconds = Math.floor((timeUntilExpiration % (1000 * 60)) / 1000);
      
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="text-sm text-orange-600 flex items-center gap-2" data-testid={`hold-countdown-${slotId}`}>
      <Clock className="h-4 w-4" />
      <span>Hold expires in: {timeLeft}</span>
    </div>
  );
};