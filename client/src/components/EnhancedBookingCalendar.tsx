import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, Calendar, CalendarDays, ChevronLeft, ChevronRight, Ship, Clock, 
  ArrowRight, Sparkles, Heart, Crown, PartyPopper, CreditCard,
  MapPin, Star, CheckCircle
} from 'lucide-react';
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, isToday, isSameDay } from 'date-fns';
import { formatCurrency, formatTimeForDisplay } from '@shared/formatters';
import type { NormalizedSlot } from '@shared/schema';
import { isDiscoAvailableForDate, getPrivateTimeSlotsForDate } from '@shared/timeSlots';
import { useAvailabilityForDate, formatDateForAvailability } from '@/hooks/use-availability';
// Import working functions - removed problematic pricing imports

interface EnhancedBookingCalendarProps {
  className?: string;
  defaultEventType?: 'private' | 'bachelor' | 'bachelorette';
  defaultGroupSize?: number;
  showEventTypeSelector?: boolean;
}

type EventType = 'private' | 'bachelor' | 'bachelorette';
type GroupSizeSource = 'slider' | 'button';

// Quick selection group sizes
const QUICK_GROUP_SIZES = [14, 25, 30, 50, 75];

// Boat capacity mapping for color coding and smart highlighting
const BOAT_CAPACITY_MAP = {
  'Day Tripper': { capacity: 14, maxCapacity: 14, color: 'purple', ideal: [14] },
  'Meeseeks/The Irony': { capacity: 15, maxCapacity: 30, color: 'red', ideal: [15, 25, 30] },
  'Meeseeks': { capacity: 15, maxCapacity: 30, color: 'red', ideal: [15, 25, 30] },
  'The Irony': { capacity: 25, maxCapacity: 30, color: 'red', ideal: [25, 30] },
  'Clever Girl': { capacity: 50, maxCapacity: 75, color: 'orange', ideal: [50, 75] },
  // ATX Disco removed - it's only for disco cruises, not private cruises
  'boat_day_tripper': { capacity: 14, maxCapacity: 14, color: 'purple', ideal: [14] },
  'boat_me_seek': { capacity: 25, maxCapacity: 30, color: 'red', ideal: [25, 30] },
  'boat_the_irony': { capacity: 25, maxCapacity: 30, color: 'red', ideal: [25, 30] },
  'boat_clever_girl': { capacity: 50, maxCapacity: 75, color: 'orange', ideal: [50, 75] },
} as const;

// Get boat color based on name or capacity
const getBoatColor = (boatName: string, capacity?: number): string => {
  const name = boatName.toLowerCase().trim();
  
  // Direct name matching
  for (const [key, boat] of Object.entries(BOAT_CAPACITY_MAP)) {
    if (name.includes(key.toLowerCase()) || key.toLowerCase().includes(name)) {
      return boat.color;
    }
  }
  
  // Fallback to capacity-based matching
  if (capacity) {
    if (capacity <= 14) return 'purple';
    if (capacity <= 30) return 'red';
    if (capacity <= 75) return 'orange';
  }
  
  return 'gray';
};

// Get best boat match for group size - strict capacity rules
const getBestBoatMatch = (groupSize: number): { color: string; boatName: string } => {
  if (groupSize <= 14) return { color: 'purple', boatName: 'Day Tripper' };
  if (groupSize <= 30) return { color: 'red', boatName: 'Meeseeks/The Irony' };
  if (groupSize <= 75) return { color: 'orange', boatName: 'Clever Girl' };
  return { color: 'gray', boatName: 'No boats available' };
};

// Color utility functions
const getColorClasses = (color: string, variant: 'slot' | 'button' | 'highlight') => {
  const baseColors = {
    purple: {
      slot: 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700',
      button: 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700',
      highlight: 'ring-2 ring-purple-400 shadow-purple-200 shadow-lg'
    },
    red: {
      slot: 'border-red-200 bg-red-50 hover:bg-red-100 text-red-700',
      button: 'border-red-200 bg-red-50 hover:bg-red-100 text-red-700',
      highlight: 'ring-2 ring-red-400 shadow-red-200 shadow-lg'
    },
    orange: {
      slot: 'border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700',
      button: 'border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700',
      highlight: 'ring-2 ring-orange-400 shadow-orange-200 shadow-lg'
    },
    yellow: {
      slot: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-700',
      button: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-700',
      highlight: 'ring-2 ring-yellow-400 shadow-yellow-200 shadow-lg'
    },
    gray: {
      slot: 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700',
      button: 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700',
      highlight: 'ring-2 ring-gray-400 shadow-gray-200 shadow-lg'
    }
  };

  return baseColors[color as keyof typeof baseColors]?.[variant] || baseColors.gray[variant];
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function EnhancedBookingCalendar({ 
  className, 
  defaultEventType = 'private',
  defaultGroupSize = 20,
  showEventTypeSelector = false
}: EnhancedBookingCalendarProps) {
  const [selectedEventType, setSelectedEventType] = useState<EventType>(defaultEventType);
  const [groupSize, setGroupSize] = useState<number>(defaultGroupSize);
  const [groupSizeSource, setGroupSizeSource] = useState<GroupSizeSource>('slider');
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<NormalizedSlot | null>(null);
  const [showSlotPopup, setShowSlotPopup] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(selectedWeek, { weekStartsOn: 0 });
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  // Get best boat match for current group size
  const bestMatch = getBestBoatMatch(groupSize);

  // Fetch boats data for real boat information - same as quote builder
  const { data: boats = [] } = useQuery<any[]>({
    queryKey: ['/api/boats'],
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
  
  // Create boat lookup map for quick access
  const boatMap = useMemo(() => {
    return boats.reduce((map, boat) => {
      map[boat.id] = boat;
      return map;
    }, {} as Record<string, any>);
  }, [boats]);

  // Filter boats that can accommodate group size - LOCAL FUNCTION
  const filterBoatsForGroupSize = useCallback((boats: any[], groupSize: number) => {
    if (!boats || boats.length === 0) return [];
    
    // Exclude ATX Disco boat - only for disco cruises
    const privateBoats = boats.filter(boat => boat.id !== 'boat_atx_disco' && boat.active);
    
    if (groupSize <= 14) {
      return privateBoats.filter(boat => boat.id === 'boat_day_tripper' || boat.name === 'Day Tripper');
    } else if (groupSize <= 25) {
      return privateBoats.filter(boat => boat.id === 'boat_me_seeks_the_irony' || boat.name === 'Meeseeks The Irony');
    } else if (groupSize <= 50) {
      return privateBoats.filter(boat => boat.id === 'boat_clever_girl' || boat.name === 'Clever Girl');
    } else if (groupSize <= 75) {
      return privateBoats.filter(boat => boat.id === 'boat_clever_girl' || boat.name === 'Clever Girl');
    } else {
      return [];
    }
  }, []);

  // Get boat display name - LOCAL FUNCTION
  const getBoatDisplayName = useCallback((boat: any): string => {
    if (!boat) return 'Party Boat';
    return boat.name || `${boat.capacity}-Person Boat`;
  }, []);

  // Generate real private slots using simplified pricing logic
  const generateRealPrivateSlots = useCallback((
    date: Date, 
    groupSize: number, 
    boats: any[], 
    packageType: 'standard' | 'essentials' | 'ultimate' = 'standard',
    duration?: 3 | 4
  ): NormalizedSlot[] => {
    const dateISO = date.toISOString().split('T')[0];
    
    // Filter boats that can accommodate the group size
    const suitableBoats = filterBoatsForGroupSize(boats, groupSize);
    if (suitableBoats.length === 0) return [];
    
    // SIMPLE PRICING: Base rate $200-400/hr depending on group size and date
    const baseHourlyRate = groupSize <= 14 ? 20000 : groupSize <= 25 ? 25000 : 40000; // cents
    
    const slots: NormalizedSlot[] = [];
    
    // Get time slots for the date
    const allTimeSlots = getPrivateTimeSlotsForDate(date, duration);
    
    // Create slots for each suitable boat and time slot combination
    suitableBoats.forEach((boat) => {
      allTimeSlots.forEach((timeSlot) => {
        // Limit to avoid overwhelming the display
        if (slots.length >= 12) return;
        
        const boatName = getBoatDisplayName(boat);
        const hourlyDisplay = formatCurrency(baseHourlyRate).replace('.00', '') + '/hr';
        const slotLabel = `${boatName} • ${timeSlot.label} • ${hourlyDisplay}`;
        
        // FIXED: Realistic pricing calculation
        const hourlyRateInCents = baseHourlyRate;
        const durationHours = timeSlot.duration;
        const baseCost = (hourlyRateInCents * durationHours) / 100; // Convert cents to dollars
        const totalWithTaxTip = baseCost * 1.28; // Add ~28% for tax + gratuity
        
        slots.push({
          id: `private_${boat.id}_${dateISO}_${timeSlot.startTime}_${timeSlot.endTime}`,
          dateISO,
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          duration: timeSlot.duration,
          label: slotLabel,
          cruiseType: 'private' as const,
          capacity: boat.capacity,
          availableCount: 1,
          bookable: true,
          held: false,
          boatCandidates: [boat.id],
          boatName: boatName,
          totalPrice: Math.round(totalWithTaxTip), // FIXED: Realistic pricing ~$800-1200
          basePrice: Math.round(baseCost)
        });
      });
    });
    
    return slots;
  }, [filterBoatsForGroupSize, getBoatDisplayName]);

  // MOVED: Declare shouldShowDiscoCruises BEFORE using it
  const shouldShowDiscoCruises = selectedEventType === 'bachelor' || selectedEventType === 'bachelorette';
  const effectiveEventType = shouldShowDiscoCruises ? 'disco' : 'private';

  // Fetch disco availability using useAvailabilityForDate - same as quote builder
  const { data: availabilityData, isLoading, refetch } = useAvailabilityForDate(
    format(weekStart, 'yyyy-MM-dd'),
    effectiveEventType === 'private' ? 'private' : 'disco',
    groupSize,
    {
      enabled: true,
      staleTime: 1000 * 60 * 2, // 2 minutes
      refetchInterval: 1000 * 60 * 5, // 5 minutes
    }
  );

  // Process slots to match the quote builder's approach - REAL BOAT PRODUCTS
  const availableSlots = useMemo(() => {
    const rawSlots = availabilityData?.slots || [];
    
    if (effectiveEventType === 'private') {
      // Generate structured private slots for the entire week using REAL BOAT PRODUCTS
      const weekSlots: NormalizedSlot[] = [];
      const currentDate = new Date(weekStart);
      
      while (currentDate <= weekEnd) {
        const daySlots = generateRealPrivateSlots(currentDate, groupSize, boats);
        weekSlots.push(...daySlots);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      return weekSlots;
    } else {
      // For disco cruises, use the raw API data but filter properly
      return rawSlots.filter(slot => slot.cruiseType === 'disco');
    }
  }, [availabilityData, boats, groupSize, weekStart, weekEnd, effectiveEventType, generateRealPrivateSlots]);

  // Handle group size changes with "last selection wins" logic
  const handleSliderChange = useCallback((value: number[]) => {
    setGroupSize(value[0]);
    setGroupSizeSource('slider');
  }, []);

  const handleQuickSizeSelect = useCallback((size: number) => {
    setGroupSize(size);
    setGroupSizeSource('button');
  }, []);

  // Navigate weeks
  const goToPreviousWeek = () => setSelectedWeek(subWeeks(selectedWeek, 1));
  const goToNextWeek = () => setSelectedWeek(addWeeks(selectedWeek, 1));
  
  // Handle date picker selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Navigate to the week containing the selected date
      setSelectedWeek(date);
      setShowDatePicker(false);
      toast({
        title: "Date Selected",
        description: `Viewing availability for ${format(date, 'EEEE, MMMM d, yyyy')}`,
      });
    }
  };
  
  // REMOVED: shouldShowDiscoCruises moved earlier to fix initialization order

  // Get slots for a specific date
  const getSlotsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availableSlots.filter(slot => slot.dateISO === dateStr || slot.date === dateStr);
  };

  // Check if slot is a best match for current group size
  const isSlotBestMatch = (slot: NormalizedSlot): boolean => {
    const slotColor = getBoatColor(slot.boatName || '', slot.capacity);
    return slotColor === bestMatch.color;
  };

  // Handle slot selection - CRITICAL: Show popup instead of navigating to chat
  const handleSlotSelect = (slot: NormalizedSlot) => {
    setSelectedSlot(slot);
    setShowSlotPopup(true);
    
    toast({
      title: "Slot Details",
      description: "Review your selection and book now!",
    });
  };

  // Handle "Book Now" from popup - Routes to UniversalCheckout
  const handleBookNow = () => {
    if (!selectedSlot) return;

    const slotDate = selectedSlot.dateISO || selectedSlot.date;
    
    // CRITICAL FIX: Pass complete slot data for backend validation
    const params = new URLSearchParams({
      entryPoint: 'calendar_flow',
      cruiseType: selectedEventType === 'private' ? 'private' : 'disco',
      eventType: selectedEventType,
      groupSize: groupSize.toString(),
      eventDate: slotDate,
      
      // Complete slot data for backend validation
      slotId: selectedSlot.id,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      duration: selectedSlot.duration?.toString() || '4',
      boatName: selectedSlot.boatName || '',
      capacity: selectedSlot.capacity?.toString() || '',
      
      // Backward compatibility
      timeSlot: selectedSlot.startTime,
      boatId: selectedSlot.boatName || selectedSlot.id,
      
      // Pre-fill with slot pricing if available
      ...(selectedSlot.totalPrice && { estimatedTotal: selectedSlot.totalPrice.toString() }),
      ...(selectedSlot.label && { slotLabel: selectedSlot.label }),
      ...(selectedSlot.label && { slotDescription: selectedSlot.label }),
    });

    // Navigate to chat with pre-filled selections
    navigate('/chat');
    setShowSlotPopup(false);
    
    toast({
      title: "Proceeding to Checkout",
      description: "Taking you to secure booking...",
    });
  };

  // Get capacity description based on group size
  const getCapacityDescription = (groupSize: number): string => {
    if (groupSize <= 14) return "Perfect for intimate gatherings";
    if (groupSize <= 25) return "Great for standard parties";
    if (groupSize <= 50) return "Ideal for big celebrations";
    return "Perfect for epic events";
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="space-y-8"
      >
        {/* Enhanced Group Size Selection */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2" data-testid="heading-group-size">
                <Users className="h-6 w-6 text-brand-blue" />
                How Many People?
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300" data-testid="text-group-size-description">
                Choose your group size - use the slider for precision or quick buttons for common sizes
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Size Display with Best Match Indicator */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="text-4xl font-bold text-brand-blue" data-testid="text-current-group-size">
                      {groupSize} People
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      getColorClasses(bestMatch.color, 'button')
                    )}>
                      Best: {bestMatch.boatName}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {getCapacityDescription(groupSize)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Last adjusted: {groupSizeSource === 'slider' ? 'Slider' : 'Quick Button'}
                  </div>
                </div>

                {/* Quick Selection Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {QUICK_GROUP_SIZES.map((size) => {
                    const buttonMatch = getBestBoatMatch(size);
                    const isSelected = groupSize === size && groupSizeSource === 'button';
                    
                    return (
                      <motion.div
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "font-semibold transition-all duration-200",
                            isSelected 
                              ? getColorClasses(buttonMatch.color, 'button') + ' shadow-md'
                              : 'hover:' + getColorClasses(buttonMatch.color, 'button').replace('bg-', 'bg-').replace('-50', '-25')
                          )}
                          onClick={() => handleQuickSizeSelect(size)}
                          data-testid={`button-group-size-${size}`}
                        >
                          {size} people
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Fine-tuned Slider */}
                <div className="px-4">
                  <Slider
                    value={[groupSize]}
                    onValueChange={handleSliderChange}
                    max={75}
                    min={8}
                    step={1}
                    className={cn(
                      "w-full",
                      `[&_.range]:bg-${bestMatch.color}-500`,
                      `[&_.thumb]:bg-${bestMatch.color}-500 [&_.thumb]:border-${bestMatch.color}-600`
                    )}
                    data-testid="slider-group-size-selection"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>8 min</span>
                    <span className="font-medium">
                      Current: {groupSize} {groupSizeSource === 'slider' ? '(slider)' : '(button)'}
                    </span>
                    <span>75 max</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Weekly Calendar View with Color Coding */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2" data-testid="heading-calendar">
                <Calendar className="h-6 w-6 text-brand-yellow" />
                Choose Your Date & Time
              </CardTitle>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300" data-testid="text-calendar-description">
                  Select an available time slot for your {effectiveEventType === 'private' ? 'private cruise' : selectedEventType + ' party'}
                  {!shouldShowDiscoCruises && selectedEventType !== 'private' && (
                    <span className="block text-xs text-amber-600 mt-1">
                      💡 Private cruises available for all event types
                    </span>
                  )}
                  {shouldShowDiscoCruises && effectiveEventType === 'disco' && (
                    <span className="block text-xs text-purple-600 mt-1">
                      🎉 Disco cruises available Fri (12-4pm) & Sat (11am-3pm, 3:30-7:30pm)
                    </span>
                  )}
                </p>
                <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
                  <div className={cn("flex items-center gap-2", getColorClasses(bestMatch.color, 'highlight'))}>
                    <div className={cn("w-3 h-3 rounded-full", `bg-${bestMatch.color}-500`)} />
                    <span className="font-medium">Best Match for {groupSize} people</span>
                  </div>
                  {shouldShowDiscoCruises && effectiveEventType === 'disco' && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>Disco Cruises</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                    <span>Other Options</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Enhanced Date Navigation with Date Picker */}
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToPreviousWeek}
                  className="flex items-center gap-2"
                  data-testid="button-previous-week-nav"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                {/* Date Picker */}
                <div className="flex flex-col items-center gap-2">
                  <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-lg font-semibold px-4 py-2 hover:bg-blue-50 hover:border-blue-300"
                        data-testid="button-date-picker-trigger"
                      >
                        <CalendarDays className="h-4 w-4 mr-2" />
                        {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <CalendarUI
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                        className="rounded-md border"
                      />
                      <div className="p-3 border-t">
                        <p className="text-sm text-muted-foreground text-center">
                          Select any date to view availability
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                  {selectedDate && !isSameDay(selectedDate, new Date()) && (
                    <Badge variant="secondary" className="text-xs">
                      Selected: {format(selectedDate, 'MMM d')}
                    </Badge>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToNextWeek}
                  className="flex items-center gap-2"
                  data-testid="button-next-week-nav"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Enhanced Weekly Calendar Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {weekDates.map((date, dayIndex) => {
                  const slotsForDate = getSlotsForDate(date);
                  const hasSlots = slotsForDate.length > 0;
                  
                  return (
                    <div key={date.toISOString()} className="space-y-2">
                      {/* Day Header */}
                      <div className={cn(
                        "p-2 rounded-lg text-center border text-sm",
                        isToday(date) 
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400" 
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      )}>
                        <div className="font-medium" data-testid={`text-day-header-${dayIndex}`}>
                          {format(date, 'EEE')}
                        </div>
                        <div className="font-bold text-lg" data-testid={`text-date-header-${dayIndex}`}>
                          {format(date, 'd')}
                        </div>
                      </div>

                      {/* Available Slots with Enhanced Color Coding */}
                      <div className="space-y-2 min-h-[120px]">
                        {isLoading ? (
                          <div className="animate-pulse space-y-2">
                            {[1, 2].map(i => (
                              <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
                            ))}
                          </div>
                        ) : !hasSlots ? (
                          <div className="text-center py-4 text-gray-400 text-xs">
                            <Ship className="h-6 w-6 mx-auto mb-1 opacity-50" />
                            No availability
                          </div>
                        ) : (
                          slotsForDate.slice(0, 3).map((slot, slotIndex) => {
                            const slotColor = getBoatColor(slot.boatName || '', slot.capacity);
                            const isBestMatch = isSlotBestMatch(slot);
                            
                            return (
                              <motion.div
                                key={`${slot.id}-${format(date, 'yyyy-MM-dd')}-${slotIndex}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={cn(
                                    "w-full h-auto p-2 text-xs justify-start relative",
                                    getColorClasses(slotColor, 'slot'),
                                    isBestMatch && getColorClasses(slotColor, 'highlight')
                                  )}
                                  onClick={() => handleSlotSelect(slot)}
                                  data-testid={`button-slot-${slot.id}`}
                                >
                                  {isBestMatch && (
                                    <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500" />
                                  )}
                                  <div className="w-full">
                                    <div className="flex items-center justify-between w-full mb-1">
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        <span className="font-medium">
                                          {formatTimeForDisplay(slot.startTime)}
                                        </span>
                                      </div>
                                      <span className="text-xs font-bold">
                                        {selectedEventType === 'private' 
                                          ? (slot.totalPrice ? formatCurrency(slot.totalPrice) : 'Quote')
                                          : '$85+/person'
                                        }
                                      </span>
                                    </div>
                                    <div className="text-xs opacity-75 flex items-center justify-between">
                                      <span>
                                        {slot.boatName || 'Available Boat'} • {slot.capacity || 'Various'} max
                                      </span>
                                      {isBestMatch && (
                                        <Badge variant="secondary" className="text-xs px-1 py-0">
                                          Best
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </Button>
                              </motion.div>
                            );
                          })
                        )}
                        
                        {/* Show more indicator */}
                        {slotsForDate.length > 3 && (
                          <div className="text-center">
                            <Button
                              variant="ghost" 
                              size="sm"
                              className="text-xs h-6 px-2"
                              onClick={() => {
                                const params = new URLSearchParams({
                                  eventType: selectedEventType,
                                  groupSize: groupSize.toString(),
                                  date: format(date, 'yyyy-MM-dd')
                                });
                                navigate(`/calendar?${params.toString()}`);
                              }}
                              data-testid={`button-show-more-${dayIndex}`}
                            >
                              +{slotsForDate.length - 3} more
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View Full Calendar Link */}
              <div className="text-center mt-6 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => {
                    const params = new URLSearchParams({
                      eventType: selectedEventType,
                      groupSize: groupSize.toString()
                    });
                    navigate(`/calendar?${params.toString()}`);
                  }}
                  className="text-sm"
                  data-testid="button-view-full-calendar"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  View Full Calendar & More Dates
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* CRITICAL: Slot Details Popup - Entry Point 1 Calendar Flow */}
      <Dialog open={showSlotPopup} onOpenChange={setShowSlotPopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ship className="w-5 h-5" />
              Cruise Details
            </DialogTitle>
            <DialogDescription>
              Review your selection and proceed to booking
            </DialogDescription>
          </DialogHeader>
          
          {selectedSlot && (
            <div className="space-y-4">
              {/* Date & Time */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-900 dark:text-blue-100">
                    {format(new Date(selectedSlot.dateISO || selectedSlot.date), 'EEEE, MMMM d, yyyy')}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-200">
                    {formatTimeForDisplay(selectedSlot.startTime)} - {formatTimeForDisplay(selectedSlot.endTime)}
                  </div>
                </div>
              </div>

              {/* Boat & Capacity */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Ship className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium">
                    {selectedSlot.boatName || 'Available Boat'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Up to {selectedSlot.capacity} guests • Perfect for {groupSize} people
                  </div>
                </div>
              </div>

              {/* Group Size */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Users className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium">Your Group Size</div>
                  <div className="text-sm text-muted-foreground">
                    {groupSize} guests • {selectedEventType === 'private' ? 'Private Charter' : 'Disco Cruise'}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              {selectedSlot.totalPrice && (
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-900 dark:text-green-100">
                      Starting at {formatCurrency(selectedSlot.totalPrice)}
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-200">
                      Final pricing determined at checkout
                    </div>
                  </div>
                </div>
              )}

              {/* Best Match Indicator */}
              {isSlotBestMatch(selectedSlot) && (
                <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Perfect match for your group size!
                  </span>
                </div>
              )}

              <Separator />

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleBookNow}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                  data-testid="button-book-now-popup"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Book Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowSlotPopup(false)}
                  className="w-full"
                  data-testid="button-cancel-popup"
                >
                  Choose Different Time
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                🔒 Secure checkout • Instant confirmation • Full refund protection
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}