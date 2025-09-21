import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Ship, Anchor, Users, Plus, Minus, AlertCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import type { Boat, Booking, DiscoSlot, Timeframe, Product } from "@shared/schema";
import { getPrivateTimeSlotsForDate, timeSlotToCalendarFormat } from "@shared/timeSlots";
import { format, startOfWeek, addWeeks, subWeeks, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate, formatDateTime, formatTimeForDisplay, formatTimeRange, formatCustomerName, formatPhoneNumber } from '@shared/formatters';
import { BOOKING_STATUSES, PAYMENT_STATUSES, STATUS_COLORS, PRIVATE_CRUISE_PACKAGES } from '@shared/constants';
import { calculatePackagePricing, getCapacityTier, getDayType, getPricingDayType } from '@shared/pricing';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { BookingsTable } from "@/components/BookingsTable";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface TimeBlock {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  boatId: string;
  boatName: string;
  status: 'available' | 'booked' | 'blocked';
  booking?: Booking;
  capacity?: number;
  bookedCount?: number;
  availableCount?: number;
  pricing?: {
    standardPrice: number;
    essentialsPrice: number;
    ultimatePrice: number;
    perPersonEstimate: number;
    dayType: string;
    packagePreviews: Array<{
      name: string;
      price: number;
      popular?: boolean;
    }>;
  };
}

interface DiscoSlotCard {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  ticketsSold: number;
  ticketCap: number;
  status: 'available' | 'soldout' | 'canceled';
}

// Use shared formatTimeForDisplay from formatters
const formatTime = formatTimeForDisplay;

// Boat color mapping system
const getBoatColor = (boatName: string): string => {
  const name = boatName.toLowerCase();
  if (name.includes('day tripper')) return 'purple';
  if (name.includes('meeseeks') || name.includes('the irony')) return 'red';
  if (name.includes('clever girl')) return 'orange';
  if (name.includes('big papa') || name.includes('large')) return 'blue';
  return 'gray';
};

// Tab color mapping
const TAB_COLORS = {
  all: 'gray',
  dayTripper: 'purple',
  medium: 'red',
  large: 'orange',
  disco: 'yellow'
};

// Color utility functions
const getColorClasses = (color: string, variant: 'tab' | 'card' | 'disco') => {
  if (variant === 'tab') {
    switch (color) {
      case 'purple':
        return 'data-[state=active]:bg-purple-100 data-[state=active]:border-purple-500 data-[state=active]:text-purple-700 hover:bg-purple-50';
      case 'red':
        return 'data-[state=active]:bg-red-100 data-[state=active]:border-red-500 data-[state=active]:text-red-700 hover:bg-red-50';
      case 'orange':
        return 'data-[state=active]:bg-orange-100 data-[state=active]:border-orange-500 data-[state=active]:text-orange-700 hover:bg-orange-50';
      case 'blue':
        return 'data-[state=active]:bg-blue-100 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 hover:bg-blue-50';
      case 'yellow':
        return 'data-[state=active]:bg-yellow-100 data-[state=active]:border-yellow-500 data-[state=active]:text-yellow-700 hover:bg-yellow-50';
      default:
        return '';
    }
  } else if (variant === 'card') {
    switch (color) {
      case 'purple':
        return 'border-l-4 border-l-purple-500';
      case 'red':
        return 'border-l-4 border-l-red-500';
      case 'orange':
        return 'border-l-4 border-l-orange-500';
      case 'blue':
        return 'border-l-4 border-l-blue-500';
      default:
        return 'border-l-4 border-l-gray-400';
    }
  } else if (variant === 'disco') {
    return 'bg-yellow-50 border-yellow-400 hover:bg-yellow-100';
  }
  return '';
};

const getBoatTextColor = (boatName: string): string => {
  const color = getBoatColor(boatName);
  switch (color) {
    case 'purple': return 'text-purple-700';
    case 'red': return 'text-red-700';
    case 'orange': return 'text-orange-700';
    case 'blue': return 'text-blue-700';
    default: return 'text-gray-700';
  }
};

// Helper function to check if two time intervals overlap
// Intervals [a1, a2] and [b1, b2] overlap if a1 < b2 AND a2 > b1
const intervalsOverlap = (a1: Date, a2: Date, b1: Date, b2: Date): boolean => {
  return a1.getTime() < b2.getTime() && a2.getTime() > b1.getTime();
};

// Helper function to check if a booking conflicts with a time slot
const hasBookingConflict = (bookings: Booking[], boatId: string, slotStart: Date, slotEnd: Date): Booking | undefined => {
  return bookings.find(booking => {
    if (booking.boatId !== boatId) return false;
    
    const bookingStart = new Date(booking.startTime);
    const bookingEnd = new Date(booking.endTime);
    
    return intervalsOverlap(slotStart, slotEnd, bookingStart, bookingEnd);
  });
};

// Helper function to check if a time slot is booked for 25-person boat availability
const isTimeSlotBooked = (bookings: Booking[], boatId: string, date: Date, timeString: string): boolean => {
  const [hour, minute] = timeString.split(':').map(Number);
  const slotDateTime = new Date(date);
  slotDateTime.setHours(hour, minute, 0, 0);
  
  return bookings.some(booking => {
    if (booking.boatId !== boatId) return false;
    
    const bookingStart = new Date(booking.startTime);
    const bookingEnd = new Date(booking.endTime);
    
    // Check if the time slot falls within the booking period
    return slotDateTime.getTime() >= bookingStart.getTime() && 
           slotDateTime.getTime() < bookingEnd.getTime();
  });
};

// Helper function to calculate pricing for a boat/time slot
const calculateTimeBlockPricing = (date: Date, capacity: number, groupSize: number = 20) => {
  try {
    const capacityTier = getCapacityTier(Math.max(groupSize, capacity * 0.7)); // Use 70% capacity as estimate
    const dayType = getPricingDayType(date);
    
    // Get pricing for all three packages
    const standardPricing = calculatePackagePricing(date, capacityTier, 'standard');
    const essentialsPricing = calculatePackagePricing(date, capacityTier, 'essentials');
    const ultimatePricing = calculatePackagePricing(date, capacityTier, 'ultimate');
    
    const dayNames = {
      'MON_THU': 'Mon-Thu',
      'FRIDAY': 'Friday',
      'SATURDAY': 'Saturday', 
      'SUNDAY': 'Sunday'
    };
    
    return {
      standardPrice: standardPricing.totalPrice,
      essentialsPrice: essentialsPricing.totalPrice,
      ultimatePrice: ultimatePricing.totalPrice,
      perPersonEstimate: Math.floor(standardPricing.totalPrice / capacityTier),
      dayType: dayNames[dayType] || dayType,
      packagePreviews: [
        {
          name: 'Standard',
          price: standardPricing.totalPrice,
          popular: false
        },
        {
          name: 'Essentials',
          price: essentialsPricing.totalPrice,
          popular: true
        },
        {
          name: 'Ultimate',
          price: ultimatePricing.totalPrice,
          popular: false
        }
      ]
    };
  } catch (error) {
    console.warn('Error calculating pricing for time block:', error);
    return {
      standardPrice: 0,
      essentialsPrice: 0,
      ultimatePrice: 0,
      perPersonEstimate: 0,
      dayType: 'Unknown',
      packagePreviews: []
    };
  }
};

// Helper function to generate time blocks based on day of week using shared configuration
const generateTimeBlocks = (date: Date, boats: Boat[], bookings: Booking[], products: Product[]): TimeBlock[] => {
  const blocks: TimeBlock[] = [];
  
  // Use centralized time slot configuration
  const timeSlots = getPrivateTimeSlotsForDate(date);
  const availableTimeSlots = timeSlots.map(timeSlotToCalendarFormat);
  
  // Generate blocks for each boat and time slot
  boats.forEach(boat => {
    availableTimeSlots.forEach(slot => {
      const startDateTime = new Date(date);
      const [startHour, startMin] = slot.startTime.split(':').map(Number);
      
      // Handle next day for night slots
      if (slot.endTime === '01:00' && startHour === 22) {
        startDateTime.setHours(startHour, startMin, 0, 0);
      } else {
        startDateTime.setHours(startHour, startMin, 0, 0);
      }
      
      const endDateTime = new Date(date);
      const [endHour, endMin] = slot.endTime.split(':').map(Number);
      
      // Handle next day for night slots (10PM-1AM)
      if (slot.endTime === '01:00' && startHour === 22) {
        endDateTime.setDate(endDateTime.getDate() + 1);
        endDateTime.setHours(endHour, endMin, 0, 0);
      } else {
        endDateTime.setHours(endHour, endMin, 0, 0);
      }
      
      // Check if there's a booking conflict for this time slot using interval overlap
      const booking = hasBookingConflict(bookings, boat.id, startDateTime, endDateTime);
      
      // Calculate pricing for this time block
      const pricing = calculateTimeBlockPricing(date, boat.capacity || 25);
      
      blocks.push({
        id: `${boat.id}_${slot.startTime}_${slot.endTime}`,
        date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        boatId: boat.id,
        boatName: boat.name,
        status: booking ? (booking.status === 'blocked' ? 'blocked' : 'booked') : 'available',
        booking,
        capacity: boat.capacity,
        pricing
      });
    });
  });
  
  return blocks;
};

function CalendarView() {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState<string>("dayTripper"); // Default to Day Tripper
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState<number>(1); // Default to show all boats
  const [flashDayTripper, setFlashDayTripper] = useState(true);
  const { toast } = useToast();

  // Get the start of the week (Sunday)
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 0 });
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  // Fetch boats
  const { data: boats = [] } = useQuery<Boat[]>({
    queryKey: ["/api/boats"],
  });

  // Fetch products
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Fetch timeframes
  const { data: timeframes = [] } = useQuery<Timeframe[]>({
    queryKey: ["/api/timeframes"],
  });

  // Smart boat filtering based on group size
  const getBoatsForGroupSize = (groupSize: number) => {
    return boats.filter(boat => {
      // Show boats that can accommodate the group size
      // Only show boats that can fit the group (not unnecessarily large unless group is big)
      return boat.capacity >= groupSize;
    });
  };

  const filteredBoats = getBoatsForGroupSize(selectedCapacity);

  // Group filtered boats by capacity for tabs - only include boats that match group size
  const boatGroups = {
    all: filteredBoats,
    dayTripper: filteredBoats.filter(b => b.capacity <= 15),
    medium: filteredBoats.filter(b => b.capacity > 15 && b.capacity <= 35),
    large: filteredBoats.filter(b => b.capacity > 35)
  };

  // Flash Day Tripper tab on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlashDayTripper(false);
    }, 2000); // Flash for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  // Auto-select appropriate tab when slider changes
  useEffect(() => {
    if (boatGroups.dayTripper.length > 0 && selectedCapacity <= 15) {
      setSelectedTab('dayTripper');
    } else if (boatGroups.medium.length > 0 && selectedCapacity <= 35) {
      setSelectedTab('medium');
    } else if (boatGroups.large.length > 0) {
      setSelectedTab('large');
    } else {
      // If no boats match, default to all
      setSelectedTab('all');
    }
  }, [selectedCapacity, boats]);

  // When date picker selects a date, update the week view
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedWeek(date);
      setIsDatePickerOpen(false);
    }
  };

  // Fetch bookings for the week
  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings", weekStart.toISOString()],
    queryFn: async () => {
      const endDate = new Date(weekStart);
      endDate.setDate(endDate.getDate() + 7);
      
      const params = new URLSearchParams({
        startDate: weekStart.toISOString(),
        endDate: endDate.toISOString()
      });
      
      const response = await fetch(`/api/bookings?${params}`);
      if (!response.ok) throw new Error("Failed to fetch bookings");
      return response.json();
    },
  });

  // Fetch disco slots for the week
  const { data: discoSlots = [] } = useQuery<DiscoSlot[]>({
    queryKey: ["/api/disco/slots", weekStart.getFullYear(), weekStart.getMonth()],
    queryFn: async () => {
      const params = new URLSearchParams({
        year: weekStart.getFullYear().toString(),
        month: (weekStart.getMonth() + 1).toString()
      });
      const response = await fetch(`/api/disco/slots?${params}`);
      if (!response.ok) throw new Error("Failed to fetch disco slots");
      return response.json();
    },
  });

  // Toggle availability mutation
  const toggleAvailabilityMutation = useMutation({
    mutationFn: async ({ date, startTime, endTime, boatId, status }: {
      date: string;
      startTime: string;
      endTime: string;
      boatId: string;
      status: 'available' | 'booked';
    }) => {
      return apiRequest("POST", "/api/timeframes/toggle-availability", {
        date,
        startTime,
        endTime,
        boatId,
        status: status === 'available' ? 'booked' : 'available'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Availability Updated",
        description: "The time slot has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update availability. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update disco slot quantity mutation
  const updateDiscoQuantityMutation = useMutation({
    mutationFn: async ({ slotId, adjustment }: { slotId: string; adjustment: number }) => {
      return apiRequest("POST", `/api/disco/slots/${slotId}/update-quantity`, { adjustment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/disco/slots"] });
      toast({
        title: "Tickets Updated",
        description: "Disco cruise tickets have been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update tickets. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Capacity selector handlers
  const handleCapacityChange = (value: number[]) => {
    setSelectedCapacity(value[0]);
  };


  // Count available boats for 25-person group using proper time overlap logic
  const count25PersonBoats = (date: Date, time: string) => {
    const mediumBoats = boatGroups.medium;
    const dateBookings = bookings.filter(b => {
      const bookingDate = new Date(b.startTime);
      return bookingDate.toDateString() === date.toDateString();
    });
    
    let available = 0;
    mediumBoats.forEach(boat => {
      const isBooked = isTimeSlotBooked(dateBookings, boat.id, date, time);
      if (!isBooked) available++;
    });
    
    return { available, total: mediumBoats.length };
  };

  // Time block card component
  const TimeBlockCard = ({ block }: { block: TimeBlock }) => {
    const handleToggle = () => {
      toggleAvailabilityMutation.mutate({
        date: block.date.toISOString().split('T')[0],
        startTime: block.startTime,
        endTime: block.endTime,
        boatId: block.boatId,
        status: block.status === 'available' ? 'booked' : 'available'
      });
    };

    const boatColor = getBoatColor(block.boatName);
    const boatColorClasses = getColorClasses(boatColor, 'card');
    const boatTextColor = getBoatTextColor(block.boatName);

    const pricingTooltipContent = block.pricing ? (
      <div className="space-y-2 max-w-xs">
        <div className="font-semibold text-sm border-b pb-1">Pricing for {block.capacity}-person boat</div>
        <div className="text-xs space-y-1">
          <div className="text-muted-foreground">Day Type: {block.pricing.dayType}</div>
          {block.pricing.packagePreviews.map((pkg, idx) => (
            <div key={idx} className={cn(
              "flex justify-between items-center p-1 rounded",
              pkg.popular && "bg-yellow-100 border border-yellow-300"
            )}>
              <span className={cn(pkg.popular && "font-semibold")}>
                {pkg.name} {pkg.popular && '⭐'}
              </span>
              <span className="font-medium">{formatCurrency(pkg.price / 100)}</span>
            </div>
          ))}
          <div className="text-xs text-muted-foreground pt-1 border-t">
            ~{formatCurrency(block.pricing.perPersonEstimate / 100)}/person estimate
          </div>
        </div>
      </div>
    ) : null;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "p-1.5 rounded-md border cursor-pointer transition-all hover:shadow-sm",
                boatColorClasses, // Add boat-specific left border
                block.status === 'available' 
                  ? "bg-green-100 border-green-400 hover:bg-green-200" 
                  : block.status === 'blocked'
                  ? "bg-gray-200 border-gray-400"
                  : "bg-red-100 border-red-400 hover:bg-red-200"
              )}
              onClick={handleToggle}
              data-testid={`time-block-${block.id}`}
            >
              <div className="font-semibold text-xs text-gray-800">
                {formatTime(block.startTime)} - {formatTime(block.endTime)}
              </div>
              <div className={cn("text-xs font-medium", boatTextColor)}>
                <Ship className="inline w-2.5 h-2.5 mr-1" />
                {block.boatName}
              </div>
              <div className="flex justify-between items-center text-xs mt-1">
                <span className={cn(
                  "font-medium",
                  block.capacity >= selectedCapacity 
                    ? "text-green-600" 
                    : "text-red-500"
                )}>
                  Cap: {block.capacity} • Fits your group ({block.capacity >= selectedCapacity ? '✓' : '✗'})
                </span>
                {block.pricing && (
                  <span className="font-semibold text-green-700">
                    {formatCurrency(block.pricing.standardPrice / 100)}
                  </span>
                )}
              </div>
              {block.pricing && (
                <div className="text-xs text-muted-foreground mt-0.5">
                  {block.pricing.dayType} • ~{formatCurrency(block.pricing.perPersonEstimate / 100)}/p
                </div>
              )}
            </div>
          </TooltipTrigger>
          {pricingTooltipContent && (
            <TooltipContent side="right" className="z-50">
              {pricingTooltipContent}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

  // 25-person boats grouped card
  const GroupedTimeBlockCard = ({ date, startTime, endTime }: { date: Date; startTime: string; endTime: string }) => {
    const { available, total } = count25PersonBoats(date, startTime);
    const mediumBoats = boatGroups.medium;
    
    // Calculate pricing for 25-person boats
    const avgCapacity = mediumBoats.reduce((sum, boat) => sum + (boat.capacity || 25), 0) / mediumBoats.length;
    const groupPricing = calculateTimeBlockPricing(date, avgCapacity || 25);
    
    return (
      <div className="space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "p-2 rounded-md border transition-all cursor-pointer",
                  available > 0 
                    ? "bg-green-100 border-green-400 hover:bg-green-200" 
                    : "bg-red-100 border-red-400"
                )}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-xs">
                      {formatTime(startTime)} - {formatTime(endTime)}
                    </div>
                    <div className="text-xs mt-1 font-medium">
                      {available} of {total} boats available
                    </div>
                    <div className="text-xs opacity-75">
                      25-person boats
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm text-green-700">
                      {formatCurrency(groupPricing.standardPrice / 100)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {groupPricing.dayType}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ~{formatCurrency(groupPricing.perPersonEstimate / 100)}/person
                    </div>
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="z-50">
              <div className="space-y-2 max-w-xs">
                <div className="font-semibold text-sm border-b pb-1">25-Person Boat Pricing</div>
                <div className="text-xs space-y-1">
                  <div className="text-muted-foreground">Day Type: {groupPricing.dayType}</div>
                  {groupPricing.packagePreviews.map((pkg, idx) => (
                    <div key={idx} className={cn(
                      "flex justify-between items-center p-1 rounded",
                      pkg.popular && "bg-yellow-100 border border-yellow-300"
                    )}>
                      <span className={cn(pkg.popular && "font-semibold")}>
                        {pkg.name} {pkg.popular && '⭐'}
                      </span>
                      <span className="font-medium">{formatCurrency(pkg.price / 100)}</span>
                    </div>
                  ))}
                  <div className="text-xs text-muted-foreground pt-1 border-t">
                    ~{formatCurrency(groupPricing.perPersonEstimate / 100)}/person estimate
                  </div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="pl-4 space-y-1">
          {mediumBoats.map(boat => {
            const dateBookings = bookings.filter(b => {
              const bookingDate = new Date(b.startTime);
              return bookingDate.toDateString() === date.toDateString();
            });
            
            const isBooked = dateBookings.some(b => 
              b.boatId === boat.id && 
              new Date(b.startTime).toTimeString().slice(0, 5) === startTime
            );
            
            return (
              <div
                key={boat.id}
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded cursor-pointer transition-all font-medium flex justify-between items-center",
                  getColorClasses(getBoatColor(boat.name), 'card'), // Add boat color border
                  isBooked 
                    ? "bg-red-200 text-red-800 border border-red-400" 
                    : "bg-green-100 text-green-800 hover:bg-green-200 border border-green-400"
                )}
                onClick={() => {
                  toggleAvailabilityMutation.mutate({
                    date: date.toISOString().split('T')[0],
                    startTime,
                    endTime,
                    boatId: boat.id,
                    status: isBooked ? 'available' : 'booked'
                  });
                }}
                data-testid={`boat-toggle-${boat.id}-${startTime}`}
              >
                <span className={getBoatTextColor(boat.name)}>
                  {boat.name}: {isBooked ? 'Booked' : 'Available'}
                </span>
                {!isBooked && (
                  <span className="font-semibold text-green-700">
                    {formatCurrency(groupPricing.standardPrice / 100)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Disco slot card component with pricing
  const DiscoSlotDisplay = ({ slot }: { slot: DiscoSlot }) => {
    const available = slot.ticketCap - slot.ticketsSold;
    
    // Disco pricing based on day of week
    const slotDate = new Date(slot.date);
    const dayOfWeek = slotDate.getDay();
    const discoPackages = [
      { name: 'Basic', price: 8500, description: 'Dance floor access + cash bar' },
      { name: 'Disco Queen', price: 9500, description: 'Basic + VIP seating + welcome drink', popular: true },
      { name: 'Platinum', price: 10500, description: 'All inclusive + bottle service' }
    ];
    
    const basePrice = dayOfWeek === 6 ? 9500 : 8500; // Saturday premium
    
    return (
      <Card className={cn("mb-1 border-l-4 border-l-yellow-500", getColorClasses('yellow', 'disco'))}>
        <CardContent className="p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs text-yellow-800">
                        {formatTime(new Date(slot.startTime).toTimeString().slice(0, 5))} - 
                        {formatTime(new Date(slot.endTime).toTimeString().slice(0, 5))}
                      </div>
                      <div className="text-xs text-yellow-700">
                        <Anchor className="inline w-2.5 h-2.5 mr-1" />
                        Disco Cruise
                      </div>
                      <div className="text-xs font-semibold text-yellow-800 mt-1">
                        From {formatCurrency(basePrice / 100)}/person
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateDiscoQuantityMutation.mutate({ slotId: slot.id, adjustment: -1 })}
                        disabled={slot.ticketsSold <= 0}
                        data-testid={`disco-decrease-${slot.id}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="text-center min-w-[80px]">
                        <div className="font-bold text-xs text-yellow-800">{available} of {slot.ticketCap}</div>
                        <div className="text-xs text-yellow-700">available</div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateDiscoQuantityMutation.mutate({ slotId: slot.id, adjustment: 1 })}
                        disabled={slot.ticketsSold >= slot.ticketCap}
                        data-testid={`disco-increase-${slot.id}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {slot.status === 'soldout' && (
                    <Badge variant="destructive" className="mt-2">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Sold Out
                    </Badge>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="z-50">
                <div className="space-y-2 max-w-xs">
                  <div className="font-semibold text-sm border-b pb-1">ATX Disco Cruise Packages</div>
                  <div className="text-xs space-y-1">
                    <div className="text-muted-foreground">
                      {dayOfWeek === 6 ? 'Saturday Premium' : dayOfWeek === 5 ? 'Friday' : 'Weekend'} Pricing
                    </div>
                    {discoPackages.map((pkg, idx) => (
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
                        <span className="font-medium">{formatCurrency(pkg.price / 100)}</span>
                      </div>
                    ))}
                    <div className="text-xs text-muted-foreground pt-1 border-t">
                      4-hour party cruise • Live DJ • Dance floor
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Boat Calendar</h2>
          <p className="text-muted-foreground">Manage boat availability and bookings</p>
        </div>
        <div className="flex gap-2 items-center">
          {/* Week Navigation */}
          <Button
            variant="outline"
            onClick={() => setSelectedWeek(subWeeks(selectedWeek, 1))}
            data-testid="week-prev"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {/* Date Input and Picker */}
          <div className="flex gap-1">
            <Input
              type="text"
              value={format(selectedDate, 'MMM dd, yyyy')}
              readOnly
              className="w-32 text-center cursor-pointer"
              onClick={() => setIsDatePickerOpen(true)}
              data-testid="date-input"
            />
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  data-testid="calendar-picker-button"
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  fromDate={new Date()}
                  toDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Today Button */}
          <Button
            variant="outline"
            onClick={() => {
              const today = new Date();
              setSelectedWeek(today);
              setSelectedDate(today);
            }}
            data-testid="week-today"
          >
            Today
          </Button>
          
          {/* Next Week */}
          <Button
            variant="outline"
            onClick={() => setSelectedWeek(addWeeks(selectedWeek, 1))}
            data-testid="week-next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Boat Capacity Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Group Size Filter</CardTitle>
          <CardDescription>
            Select your group size to see only time slots for boats that can accommodate your party. Only boats with ✓ can fit your group.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Capacity Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Group Size: {selectedCapacity} people</label>
              <span className="text-sm text-muted-foreground">
                {filteredBoats.length} boat{filteredBoats.length !== 1 ? 's' : ''} available
              </span>
            </div>
            <Slider
              value={[selectedCapacity]}
              onValueChange={handleCapacityChange}
              min={1}
              max={75}
              step={1}
              className="w-full"
              data-testid="capacity-slider"
            />
          </div>

        </CardContent>
      </Card>

      {/* Week Display */}
      <Card>
        <CardHeader>
          <CardTitle>
            Week of {format(weekStart, 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className={cn(
              "grid w-full",
              // Dynamic grid columns based on available tabs
              boatGroups.dayTripper.length > 0 && boatGroups.medium.length > 0 && boatGroups.large.length > 0 ? "grid-cols-4" :
              (boatGroups.dayTripper.length > 0 && boatGroups.medium.length > 0) || (boatGroups.medium.length > 0 && boatGroups.large.length > 0) || (boatGroups.dayTripper.length > 0 && boatGroups.large.length > 0) ? "grid-cols-3" :
              "grid-cols-2"
            )}>
              {filteredBoats.length > 0 && (
                <TabsTrigger value="all" data-testid="tab-all" className="">
                  All Boats ({filteredBoats.length})
                </TabsTrigger>
              )}
              {boatGroups.dayTripper.length > 0 && (
                <TabsTrigger 
                  value="dayTripper" 
                  data-testid="tab-daytripper"
                  className={cn(
                    getColorClasses(TAB_COLORS.dayTripper, 'tab'),
                    flashDayTripper && "animate-pulse"
                  )}
                >
                  Day Tripper ({boatGroups.dayTripper.length})
                </TabsTrigger>
              )}
              {boatGroups.medium.length > 0 && (
                <TabsTrigger 
                  value="medium" 
                  data-testid="tab-medium"
                  className={getColorClasses(TAB_COLORS.medium, 'tab')}
                >
                  25-Person ({boatGroups.medium.length})
                </TabsTrigger>
              )}
              {boatGroups.large.length > 0 && (
                <TabsTrigger 
                  value="large" 
                  data-testid="tab-large"
                  className={getColorClasses(TAB_COLORS.large, 'tab')}
                >
                  Large Boats ({boatGroups.large.length})
                </TabsTrigger>
              )}
            </TabsList>

            <div className="mt-6">
              {/* Week Grid */}
              <div className="grid grid-cols-7 gap-4">
                {weekDates.map((date, index) => {
                  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index];
                  const isToday = date.toDateString() === new Date().toDateString();
                  const dayTimeBlocks = generateTimeBlocks(
                    date,
                    selectedTab === 'all' ? filteredBoats : boatGroups[selectedTab as keyof typeof boatGroups],
                    bookings,
                    products
                  );
                  const dayDiscoSlots = discoSlots.filter(slot => {
                    const slotDate = new Date(slot.date);
                    return slotDate.toDateString() === date.toDateString();
                  });

                  // Get unique time slots for 25-person boats view
                  const uniqueTimeSlots = selectedTab === 'medium' 
                    ? Array.from(new Set(dayTimeBlocks.map(b => `${b.startTime}-${b.endTime}`))).map(slot => {
                        const [start, end] = slot.split('-');
                        return { startTime: start, endTime: end };
                      })
                    : [];

                  return (
                    <div
                      key={date.toISOString()}
                      className={cn(
                        "border-2 rounded-lg p-3",
                        isToday && "bg-yellow-50 border-yellow-400"
                      )}
                      data-testid={`day-${date.toISOString()}`}
                    >
                      <div className="font-semibold text-center mb-2">
                        {dayOfWeek}
                        <div className="text-sm text-muted-foreground">
                          {format(date, 'MMM d')}
                        </div>
                        {isToday && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            Today
                          </Badge>
                        )}
                      </div>

                      {/* Regular time blocks or grouped view */}
                      <div className="space-y-1 max-h-[600px] overflow-y-auto">
                        {selectedTab === 'medium' ? (
                          // Show grouped view for 25-person boats
                          <>
                            {uniqueTimeSlots.map(slot => (
                              <GroupedTimeBlockCard 
                                key={`${date.toISOString()}-${slot.startTime}`}
                                date={date}
                                startTime={slot.startTime}
                                endTime={slot.endTime}
                              />
                            ))}
                          </>
                        ) : (
                          // Show individual boat cards
                          dayTimeBlocks.map(block => (
                            <TimeBlockCard key={block.id} block={block} />
                          ))
                        )}
                        
                        {/* Disco slots */}
                        {dayDiscoSlots.map(slot => (
                          <DiscoSlotDisplay key={slot.id} slot={slot} />
                        ))}
                        
                        {dayTimeBlocks.length === 0 && dayDiscoSlots.length === 0 && selectedTab !== 'medium' && (
                          <div className="text-center text-sm text-muted-foreground py-4">
                            {filteredBoats.length === 0 
                              ? `No boats available for ${selectedCapacity} people` 
                              : "No cruises scheduled"
                            }
                          </div>
                        )}
                        
                        {uniqueTimeSlots.length === 0 && dayDiscoSlots.length === 0 && selectedTab === 'medium' && (
                          <div className="text-center text-sm text-muted-foreground py-4">
                            No cruises scheduled
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Comprehensive Bookings Table */}
      <BookingsTable 
        startDate={weekStart} 
        endDate={new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)}
        className="mt-6"
      />

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded"></div>
              <span className="font-medium text-gray-700">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded"></div>
              <span className="font-medium text-gray-700">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 border-2 border-gray-400 rounded"></div>
              <span className="font-medium text-gray-700">Blocked</span>
            </div>
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4 text-purple-500" />
              <span>Disco Cruise</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Boats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boats.length}</div>
            <p className="text-xs text-muted-foreground">Active vessels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter(b => b.status === 'booked').length}
            </div>
            <p className="text-xs text-muted-foreground">Confirmed bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {boats.reduce((sum, boat) => sum + boat.capacity, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total passenger capacity</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CalendarView;
export { CalendarView };