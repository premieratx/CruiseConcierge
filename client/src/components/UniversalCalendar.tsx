import { useState, useCallback, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
const logoPath = '/attached_assets/PPC Logo LARGE_1757881944449.png';
import { 
  Users, Ship, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, DollarSign, Star, 
  ChevronDown, Calendar, CalendarDays, Home, ArrowRight, Sparkles, Heart, Crown, PartyPopper
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BOATS } from "@shared/constants";
import { format, addWeeks, subWeeks, isToday, startOfWeek, endOfWeek, getDay, isSameDay } from "date-fns";
import type { NormalizedSlot } from "@shared/schema";
import { formatCurrency, formatTimeForDisplay } from '@shared/formatters';
import { calculateSimplePricing } from '@shared/pricing';
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

// Interface for component props
interface UniversalCalendarProps {
  defaultEventType?: 'disco' | 'private' | 'bachelor' | 'bachelorette' | 'other';
  defaultGroupSize?: number;
  showEventTypeSelector?: boolean;
  mode?: 'full' | 'compact';
  embedMode?: boolean;
  entryPoint?: string;
  className?: string;
}

// Boat capacity mapping for color coding and smart highlighting - uses centralized constants
const BOAT_CAPACITY_MAP = {
  [BOATS.DAY_TRIPPER.displayName]: { capacity: 14, maxCapacity: 14, color: 'purple', ideal: [14] },
  [BOATS.ME_SEEKS_THE_IRONY.displayName]: { capacity: 25, maxCapacity: 30, color: 'red', ideal: [25, 30] },
  [BOATS.CLEVER_GIRL.displayName]: { capacity: 50, maxCapacity: 75, color: 'orange', ideal: [50, 75] },
} as const;

// Quick selection group sizes
const QUICK_GROUP_SIZES = [14, 25, 30, 50, 75];

// Get best boat match for group size - strict capacity rules using centralized constants
const getBestBoatMatch = (groupSize: number): { color: string; boatName: string } => {
  if (groupSize <= 14) return { color: 'purple', boatName: BOATS.DAY_TRIPPER.displayName };
  if (groupSize >= 15 && groupSize <= 30) return { color: 'red', boatName: BOATS.ME_SEEKS_THE_IRONY.displayName };
  if (groupSize >= 31 && groupSize <= 75) return { color: 'orange', boatName: BOATS.CLEVER_GIRL.displayName };
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
const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

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

export default function UniversalCalendar({
  defaultEventType = 'other',
  defaultGroupSize = 20,
  showEventTypeSelector = true,
  mode = 'full',
  embedMode = false,
  entryPoint = 'calendar',
  className
}: UniversalCalendarProps) {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [groupSize, setGroupSize] = useState<number>(defaultGroupSize);
  const [selectedSlot, setSelectedSlot] = useState<NormalizedSlot | null>(null);
  const [showSlotPopup, setShowSlotPopup] = useState(false);
  const [calculatedPricing, setCalculatedPricing] = useState<{ total: number; perPerson: number } | null>(null);
  const [eventType, setEventType] = useState<'other' | 'bachelor' | 'bachelorette'>(
    defaultEventType === 'disco' || defaultEventType === 'private' ? 'other' : 
    defaultEventType as 'other' | 'bachelor' | 'bachelorette'
  );
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());
  const [selectedTimeForDay, setSelectedTimeForDay] = useState<Record<string, NormalizedSlot | null>>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(selectedWeek, { weekStartsOn: 0 });
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  // Get URL params for group size
  const urlParams = new URLSearchParams(window.location.search);
  const initialGroupSize = parseInt(urlParams.get('groupSize') || defaultGroupSize.toString());
  
  // Initialize group size from URL params on mount
  useEffect(() => {
    setGroupSize(initialGroupSize);
  }, [initialGroupSize]);

  // Get best boat match for current group size
  const bestMatch = getBestBoatMatch(groupSize);

  // Fetch availability using the single data source as specified - /api/availability/public
  const { data: availableSlots = [], isLoading } = useQuery<NormalizedSlot[]>({
    queryKey: ["/api/availability/public", format(weekStart, 'yyyy-MM-dd'), format(weekEnd, 'yyyy-MM-dd'), groupSize, eventType],
    queryFn: async () => {
      const params = new URLSearchParams({
        startDate: format(weekStart, 'yyyy-MM-dd'),
        endDate: format(weekEnd, 'yyyy-MM-dd'),
        groupSize: groupSize.toString(),
        eventType: eventType === 'bachelor' ? 'bachelor' : eventType === 'bachelorette' ? 'bachelorette' : ''
      });
      
      const response = await fetch(`/api/availability/public?${params}`);
      if (!response.ok) throw new Error("Failed to fetch availability");
      const data = await response.json();
      return data.slots || [];
    },
    enabled: true,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  // Map eventType to cruiseType based on business rules
  const getCruiseType = (eventType: string, defaultEventType?: string): 'private' | 'disco' => {
    // Bachelor and bachelorette parties map to 'private' cruises
    if (eventType === 'bachelor' || eventType === 'bachelorette') {
      return 'private';
    }
    
    // If eventType is 'other', check the original defaultEventType
    if (eventType === 'other') {
      if (defaultEventType === 'disco') {
        return 'disco';
      }
    }
    
    // Default to 'private' for all other cases (including defaultEventType 'private')
    return 'private';
  };

  // Get dateISO in YYYY-MM-DD format
  const getDateISO = (slot: NormalizedSlot): string => {
    if (slot.dateISO) {
      return slot.dateISO;
    }
    
    if (slot.date) {
      // Convert slot.date to YYYY-MM-DD format if needed
      const date = new Date(slot.date);
      return date.toISOString().split('T')[0];
    }
    
    // Fallback to today's date if no date is available
    return new Date().toISOString().split('T')[0];
  };

  // Slot hold mutation
  const holdSlotMutation = useMutation({
    mutationFn: async (slot: NormalizedSlot) => {
      const cruiseType = getCruiseType(eventType, defaultEventType);
      const dateISO = getDateISO(slot);
      
      const response = await fetch('/api/availability/hold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: slot.id,
          cruiseType,
          dateISO,
          startTime: slot.startTime,
          endTime: slot.endTime,
          groupSize,
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to hold slot');
      }
      
      return response.json();
    },
    onSuccess: (data, slot) => {
      // Navigate to QuoteViewer at /checkout with all needed parameters
      const cruiseType = getCruiseType(eventType, defaultEventType);
      const dateISO = getDateISO(slot);
      
      const calendarData = {
        eventDate: dateISO,
        eventType: eventType,
        groupSize: groupSize,
        cruiseType: cruiseType,
        selectedTimeSlot: `${slot.startTime}-${slot.endTime}`,
        boatId: slot.boatId || '',
        slotId: slot.id,
        date: dateISO
      };
      
      const params = new URLSearchParams({
        data: encodeURIComponent(JSON.stringify(calendarData)),
        eventDate: dateISO,
        groupSize: groupSize.toString(),
        eventType: eventType,
        selectedSlot: `${slot.startTime}-${slot.endTime}`
      });

      window.open('https://events.premierpartycruises.com/widget/form/X1zEKdfbmjqs2hBHWNN1', '_blank');
      setShowSlotPopup(false);
      
      toast({
        title: "Slot Reserved",
        description: "Taking you to quote builder to complete your booking...",
      });
    },
    onError: (error) => {
      toast({
        title: "Booking Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Calculate total price with tax and gratuity
  const calculateTotalWithTaxAndGratuity = (basePrice: number) => {
    const taxRate = 0.0825; // 8.25%
    const gratuityRate = 0.20; // 20%
    const tax = basePrice * taxRate;
    const gratuity = basePrice * gratuityRate;
    return Math.round(basePrice + tax + gratuity);
  };

  // Navigate weeks
  const goToPreviousWeek = () => setSelectedWeek(subWeeks(selectedWeek, 1));
  const goToNextWeek = () => setSelectedWeek(addWeeks(selectedWeek, 1));

  // Handle date picker selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedWeek(date);
      setShowDatePicker(false);
      toast({
        title: "Date Selected",
        description: `Viewing availability for ${format(date, 'EEEE, MMMM d, yyyy')}`,
      });
    }
  };

  // Get slots for a specific date
  const getSlotsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availableSlots.filter(slot => (slot.date === dateStr) || (slot.dateISO === dateStr));
  };

  // Check if a date is Monday through Thursday
  const isMondayThroughThursday = (date: Date) => {
    const dayOfWeek = getDay(date);
    return dayOfWeek >= 1 && dayOfWeek <= 4; // 1 = Monday, 4 = Thursday
  };

  // Toggle expanded state for a day
  const toggleDayExpanded = (dateStr: string) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(dateStr)) {
      newExpanded.delete(dateStr);
    } else {
      newExpanded.add(dateStr);
    }
    setExpandedDays(newExpanded);
  };

  // Handle slot click - show popup and calculate correct pricing
  const handleSlotClick = useCallback((slot: NormalizedSlot) => {
    setSelectedSlot(slot);
    
    // Calculate correct pricing for private cruises
    // Check both dateISO and date fields (some slots might use 'date' instead of 'dateISO')
    const slotDateString = slot?.dateISO || slot?.date;
    
    if (slot && slotDateString) {
      const slotDate = new Date(slotDateString);
      const duration = slot.duration || 4; // Default to 4 hours if not specified
      
      // Use appropriate pricing based on cruise type
      const pricing = slot.cruiseType === 'disco' 
        ? {
            total: (groupSize * 8500), // $85 per person in cents
            perPerson: 8500 // $85 per person
          }
        : calculateSimplePricing(
            slotDate,
            groupSize,
            duration,
            [] // No add-ons for now
          );
      
      setCalculatedPricing({
        total: pricing.total,
        perPerson: Math.round(pricing.total / groupSize)
      });
    } else {
      // If no date, use appropriate pricing based on cruise type
      const pricing = slot?.cruiseType === 'disco'
        ? {
            total: (groupSize * 8500), // $85 per person in cents
            perPerson: 8500 // $85 per person
          }
        : calculateSimplePricing(
            new Date(), // Use current date as fallback
            groupSize,
            slot?.duration || 4,
            []
          );
      
      setCalculatedPricing({
        total: pricing.total,
        perPerson: Math.round(pricing.total / groupSize)
      });
    }
    
    setShowSlotPopup(true);
  }, [groupSize]);

  // Handle "Book Now" - hold slot then navigate to quote builder
  const handleBookNow = useCallback(() => {
    if (!selectedSlot) {
      toast({
        title: "No time slot selected",
        description: "Please select a time slot before proceeding to checkout.",
        variant: "destructive"
      });
      return;
    }
    
    // For Monday-Thursday, make sure we have the specific time selected
    const slotDate = selectedSlot.date || selectedSlot.dateISO;
    const dateStr = slotDate?.split('T')[0] || '';
    const dayOfWeek = slotDate ? getDay(new Date(slotDate)) : -1;
    const isMonThu = dayOfWeek >= 1 && dayOfWeek <= 4;
    
    // For Monday-Thursday tiles, use the specifically selected time from dropdown
    const slotToUse = (isMonThu && selectedTimeForDay[dateStr]) 
      ? selectedTimeForDay[dateStr] 
      : selectedSlot;
    
    if (!slotToUse) {
      toast({
        title: "Please select a specific time",
        description: "Choose a time slot from the dropdown for Monday-Thursday dates.",
        variant: "destructive"
      });
      return;
    }
    
    // Execute hold mutation
    holdSlotMutation.mutate(slotToUse);
  }, [selectedSlot, selectedTimeForDay, holdSlotMutation, toast]);

  // Handle group size changes
  const handleSliderChange = useCallback((value: number[]) => {
    setGroupSize(value[0]);
  }, []);

  const handleQuickSizeSelect = useCallback((size: number) => {
    setGroupSize(size);
  }, []);

  // Check if slot is a best match for current group size
  const isSlotBestMatch = (slot: NormalizedSlot): boolean => {
    if (!slot.boatName && !slot.capacity) return false;
    
    // Check by boat name first
    if (slot.boatName) {
      const normalizedBoatName = slot.boatName.toLowerCase().trim();
      const expectedBoatName = bestMatch.boatName.toLowerCase().trim();
      if (normalizedBoatName.includes(expectedBoatName) || expectedBoatName.includes(normalizedBoatName)) {
        return true;
      }
    }
    
    // Check by capacity
    if (slot.capacity) {
      if (groupSize <= 14 && slot.capacity <= 14) return true;
      if (groupSize <= 25 && slot.capacity >= 15 && slot.capacity <= 30) return true;
      if (groupSize <= 75 && slot.capacity >= 31 && slot.capacity <= 75) return true;
    }
    
    return false;
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      {/* Navigation Header - only show if not in embed mode */}
      {!embedMode && (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={slideIn}
          className="mb-8"
        >
          <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" data-testid="link-home">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-12 w-auto"
                loading="eager"
                width={48}
                height={48}
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Premier Party Cruises</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Book Your Perfect Cruise</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm" data-testid="button-home">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>(512) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="space-y-8"
      >
        {/* Group Size Selection - Enhanced from EnhancedBookingCalendar */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader className={cn("text-center", mode === 'compact' ? "pb-3" : "pb-4")}>
              <CardTitle className={cn("font-bold flex items-center justify-center gap-2", 
                mode === 'compact' ? "text-xl" : "text-2xl")} data-testid="heading-group-size">
                <Users className="h-6 w-6 text-blue-600" />
                How Many People?
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 text-sm" data-testid="text-group-size-description">
                Choose your group size - use the slider for precision or quick buttons for common sizes
              </p>
            </CardHeader>
            <CardContent>
              <div className={cn("space-y-4", mode === 'compact' ? "space-y-3" : "space-y-6")}>
                {/* Current Size Display */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className={cn("font-bold text-blue-600", 
                      mode === 'compact' ? "text-2xl" : "text-4xl")} data-testid="text-current-group-size">
                      {groupSize} People
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      getColorClasses(bestMatch.color, 'button')
                    )}>
                      Best: {bestMatch.boatName}
                    </div>
                  </div>
                </div>

                {/* Quick Selection Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                  {QUICK_GROUP_SIZES.map((size) => {
                    const buttonMatch = getBestBoatMatch(size);
                    const isSelected = groupSize === size;
                    
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
                
                {/* Slider */}
                <div className="px-4">
                  <Slider
                    value={[groupSize]}
                    onValueChange={handleSliderChange}
                    max={75}
                    min={8}
                    step={1}
                    className="w-full"
                    data-testid="slider-group-size-selection"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>8 min</span>
                    <span className="font-medium">Current: {groupSize}</span>
                    <span>75 max</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Event Type Selection - Show if requested */}
        {showEventTypeSelector && (
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold flex items-center justify-center gap-2" data-testid="heading-event-type">
                  <PartyPopper className="h-5 w-5 text-purple-600" />
                  What's the Occasion?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={eventType} onValueChange={(value: string) => setEventType(value as any)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3" data-testid="tabs-event-type">
                    <TabsTrigger value="other" data-testid="tab-other">General Event</TabsTrigger>
                    <TabsTrigger value="bachelor" data-testid="tab-bachelor">
                      <Crown className="h-4 w-4 mr-1" />
                      Bachelor
                    </TabsTrigger>
                    <TabsTrigger value="bachelorette" data-testid="tab-bachelorette">
                      <Heart className="h-4 w-4 mr-1" />
                      Bachelorette
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Weekly Calendar View */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2" data-testid="heading-calendar">
                <Calendar className="h-6 w-6 text-yellow-600" />
                Choose Your Date & Time
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300" data-testid="text-calendar-description">
                Select an available time slot for your event
              </p>
              
              {/* Color Legend */}
              <div className="flex items-center justify-center gap-4 text-sm flex-wrap mt-2">
                <div className={cn("flex items-center gap-2", getColorClasses(bestMatch.color, 'highlight'))}>
                  <div className={cn("w-3 h-3 rounded-full", `bg-${bestMatch.color}-500`)} />
                  <span className="font-medium">Best Match for {groupSize} people</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <span>Other Options</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Date Navigation with Date Picker */}
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToPreviousWeek}
                  data-testid="button-previous-week"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous Week
                </Button>
                
                <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline"
                      className="font-semibold text-blue-600"
                      data-testid="button-date-picker"
                    >
                      <CalendarDays className="h-4 w-4 mr-2" />
                      {format(selectedWeek, 'MMM d, yyyy')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarUI
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      initialFocus
                      data-testid="calendar-date-picker"
                    />
                  </PopoverContent>
                </Popover>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToNextWeek}
                  data-testid="button-next-week"
                >
                  Next Week
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              {/* Weekly Grid */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {weekDates.map((date) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const daySlots = getSlotsForDate(date);
                  const isExpanded = expandedDays.has(dateStr);
                  const isMonThu = isMondayThroughThursday(date);
                  
                  return (
                    <Card 
                      key={dateStr} 
                      className={cn(
                        "relative overflow-hidden transition-all duration-200",
                        isToday(date) && "ring-2 ring-blue-400 shadow-lg",
                        daySlots.length === 0 && "opacity-50"
                      )}
                      data-testid={`card-day-${dateStr}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold">
                            {format(date, 'EEE')}
                          </div>
                          <div className={cn(
                            "text-2xl font-bold",
                            isToday(date) ? "text-blue-600" : "text-gray-900 dark:text-white"
                          )}>
                            {format(date, 'd')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {format(date, 'MMM')}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        {daySlots.length === 0 ? (
                          <div className="text-center py-4">
                            <div className="text-gray-400 text-sm">No availability</div>
                          </div>
                        ) : isMonThu ? (
                          // Monday-Thursday: Collapsible with dropdown for specific times
                          <Collapsible 
                            open={isExpanded} 
                            onOpenChange={() => toggleDayExpanded(dateStr)}
                          >
                            <CollapsibleTrigger asChild>
                              <Button 
                                variant="outline" 
                                className="w-full justify-between"
                                data-testid={`button-expand-${dateStr}`}
                              >
                                <span>{daySlots.length} slots</span>
                                <ChevronDown className={cn(
                                  "h-4 w-4 transition-transform",
                                  isExpanded && "rotate-180"
                                )} />
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-2 mt-2">
                              <Select
                                value={selectedTimeForDay[dateStr]?.id || ""}
                                onValueChange={(slotId) => {
                                  const slot = daySlots.find(s => s.id === slotId);
                                  setSelectedTimeForDay(prev => ({
                                    ...prev,
                                    [dateStr]: slot || null
                                  }));
                                }}
                              >
                                <SelectTrigger data-testid={`select-time-${dateStr}`}>
                                  <SelectValue placeholder="Choose time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {daySlots.map((slot) => (
                                    <SelectItem key={slot.id} value={slot.id}>
                                      {formatTimeForDisplay(slot.startTime)} - {formatTimeForDisplay(slot.endTime)}
                                      {slot.totalPrice && (
                                        <span className="ml-2 text-green-600">
                                          {formatCurrency(slot.totalPrice)}
                                        </span>
                                      )}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {selectedTimeForDay[dateStr] && (
                                <Button
                                  className="w-full"
                                  onClick={() => handleSlotClick(selectedTimeForDay[dateStr]!)}
                                  data-testid={`button-book-selected-${dateStr}`}
                                >
                                  Book Selected Time
                                </Button>
                              )}
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          // Weekend slots: Show directly
                          <div className="space-y-2">
                            {daySlots.slice(0, 3).map((slot) => (
                              <Button
                                key={slot.id}
                                variant="outline"
                                className={cn(
                                  "w-full text-xs p-2 h-auto flex-col",
                                  isSlotBestMatch(slot) && getColorClasses(bestMatch.color, 'slot')
                                )}
                                onClick={() => handleSlotClick(slot)}
                                data-testid={`button-slot-${slot.id}`}
                              >
                                <div className="font-medium">
                                  {formatTimeForDisplay(slot.startTime)} - {formatTimeForDisplay(slot.endTime)}
                                </div>
                                {slot.totalPrice && (
                                  <div className="text-green-600 text-xs">
                                    {formatCurrency(slot.totalPrice)}
                                  </div>
                                )}
                                {isSlotBestMatch(slot) && (
                                  <Badge variant="secondary" className="text-xs mt-1">
                                    Best Match
                                  </Badge>
                                )}
                              </Button>
                            ))}
                            {daySlots.length > 3 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-xs"
                                onClick={() => toggleDayExpanded(dateStr)}
                                data-testid={`button-show-more-${dateStr}`}
                              >
                                +{daySlots.length - 3} more times
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading availability...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Slot Details Popup */}
      <Dialog open={showSlotPopup} onOpenChange={setShowSlotPopup}>
        <DialogContent className="max-w-2xl" data-testid="dialog-slot-details">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Ship className="h-6 w-6 text-blue-600" />
              Cruise Details
            </DialogTitle>
            <DialogDescription>
              Review your selection and proceed to booking
            </DialogDescription>
          </DialogHeader>
          
          {selectedSlot && (
            <div className="space-y-6">
              {/* Slot Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Cruise Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{format(new Date(selectedSlot.dateISO || selectedSlot.date), 'EEEE, MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>
                          {formatTimeForDisplay(selectedSlot.startTime)} - {formatTimeForDisplay(selectedSlot.endTime)}
                          {selectedSlot.duration && ` (${selectedSlot.duration} hours)`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{groupSize} people</span>
                      </div>
                      {selectedSlot.boatName && (
                        <div className="flex items-center gap-2">
                          <Ship className="h-4 w-4 text-gray-500" />
                          <span>{selectedSlot.boatName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Pricing</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      {calculatedPricing ? (
                        <>
                          <div className="flex justify-between text-lg font-bold text-green-600">
                            <span>Total (incl. tax & tip)</span>
                            <span>{formatCurrency(calculatedPricing.total)}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {formatCurrency(calculatedPricing.perPerson)} per person
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-500">
                          Calculating pricing...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <DialogFooter className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSlotPopup(false)}
                  data-testid="button-cancel-booking"
                >
                  Back to Calendar
                </Button>
                <Button
                  onClick={handleBookNow}
                  disabled={holdSlotMutation.isPending}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  data-testid="button-book-now"
                >
                  {holdSlotMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Reserving...
                    </>
                  ) : (
                    <>
                      Book Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}