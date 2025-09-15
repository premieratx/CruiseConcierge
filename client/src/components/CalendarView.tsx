import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Ship, Anchor, Users, Plus, Minus, AlertCircle } from "lucide-react";
import type { Boat, Booking, DiscoSlot, Timeframe, Product } from "@shared/schema";
import { format, startOfWeek, addWeeks, subWeeks, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

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

// Helper function to format time
const formatTime = (time: string | undefined | null) => {
  if (!time) return 'N/A';
  
  const parts = time.split(':');
  if (parts.length < 2) return time; // Return as-is if not in expected format
  
  const [hours, minutes] = parts.map(Number);
  if (isNaN(hours) || isNaN(minutes)) return time; // Return as-is if parsing fails
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Helper function to generate time blocks based on day of week (3-hour blocks)
const generateTimeBlocks = (date: Date, boats: Boat[], bookings: Booking[], products: Product[]): TimeBlock[] => {
  const dayOfWeek = date.getDay();
  const blocks: TimeBlock[] = [];
  
  // Generate available time slots based on day of week per user requirements
  const availableTimeSlots: Array<{startTime: string, endTime: string, label: string}> = [];
  
  if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Monday-Thursday: any 4-hour frame between 10 AM-8 PM
    availableTimeSlots.push(
      { startTime: '10:00', endTime: '14:00', label: 'Morning (10AM-2PM)' },
      { startTime: '11:00', endTime: '15:00', label: 'Mid-Morning (11AM-3PM)' },
      { startTime: '12:00', endTime: '16:00', label: 'Afternoon (12PM-4PM)' },
      { startTime: '13:00', endTime: '17:00', label: 'Late Afternoon (1PM-5PM)' },
      { startTime: '14:00', endTime: '18:00', label: 'Evening (2PM-6PM)' },
      { startTime: '15:00', endTime: '19:00', label: 'Late Evening (3PM-7PM)' },
      { startTime: '16:00', endTime: '20:00', label: 'Sunset (4PM-8PM)' }
    );
  } else if (dayOfWeek === 5) { // Friday: 12-4 and 4:30-8:30
    availableTimeSlots.push(
      { startTime: '12:00', endTime: '16:00', label: 'Afternoon (12PM-4PM)' },
      { startTime: '16:30', endTime: '20:30', label: 'Evening (4:30PM-8:30PM)' }
    );
  } else if (dayOfWeek === 6) { // Saturday: 11-3 and 3:30-7:30
    availableTimeSlots.push(
      { startTime: '11:00', endTime: '15:00', label: 'Afternoon (11AM-3PM)' },
      { startTime: '15:30', endTime: '19:30', label: 'Evening (3:30PM-7:30PM)' }
    );
  } else { // Sunday: 11-3 and 3:30-7:30
    availableTimeSlots.push(
      { startTime: '11:00', endTime: '15:00', label: 'Afternoon (11AM-3PM)' },
      { startTime: '15:30', endTime: '19:30', label: 'Evening (3:30PM-7:30PM)' }
    );
  }
  
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
      
      // Check if there's a booking for this time slot
      const booking = bookings.find(b => 
        b.boatId === boat.id &&
        new Date(b.startTime).getTime() === startDateTime.getTime() &&
        new Date(b.endTime).getTime() === endDateTime.getTime()
      );
      
      blocks.push({
        id: `${boat.id}_${slot.startTime}_${slot.endTime}`,
        date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        boatId: boat.id,
        boatName: boat.name,
        status: booking ? (booking.status === 'blocked' ? 'blocked' : 'booked') : 'available',
        booking,
        capacity: boat.capacity
      });
    });
  });
  
  return blocks;
};

function CalendarView() {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { toast } = useToast();

  // Get the start of the week (Sunday)
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 0 });
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  // When date picker selects a date, update the week view
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedWeek(date);
      setIsDatePickerOpen(false);
    }
  };

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

  // Group boats by capacity for tabs
  const boatGroups = {
    all: boats,
    dayTripper: boats.filter(b => b.capacity <= 15),
    medium: boats.filter(b => b.capacity >= 20 && b.capacity <= 35),
    large: boats.filter(b => b.capacity >= 40)
  };

  // Count available boats for 25-person group
  const count25PersonBoats = (date: Date, time: string) => {
    const mediumBoats = boatGroups.medium;
    const dateBookings = bookings.filter(b => {
      const bookingDate = new Date(b.startTime);
      return bookingDate.toDateString() === date.toDateString();
    });
    
    let available = 0;
    mediumBoats.forEach(boat => {
      const isBooked = dateBookings.some(b => 
        b.boatId === boat.id && 
        new Date(b.startTime).toTimeString().slice(0, 5) === time
      );
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

    return (
      <div
        className={cn(
          "p-1.5 rounded-md border cursor-pointer transition-all hover:shadow-sm",
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
        <div className="text-xs font-medium text-gray-700">
          <Ship className="inline w-2.5 h-2.5 mr-1" />
          {block.boatName}
        </div>
        {block.capacity && (
          <div className="text-xs text-gray-600">
            Cap: {block.capacity}
          </div>
        )}
      </div>
    );
  };

  // 25-person boats grouped card
  const GroupedTimeBlockCard = ({ date, startTime, endTime }: { date: Date; startTime: string; endTime: string }) => {
    const { available, total } = count25PersonBoats(date, startTime);
    const mediumBoats = boatGroups.medium;
    
    return (
      <div className="space-y-2">
        <div
          className={cn(
            "p-2 rounded-md border transition-all",
            available > 0 
              ? "bg-green-100 border-green-400" 
              : "bg-red-100 border-red-400"
          )}
        >
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
                  "text-xs px-1.5 py-0.5 rounded cursor-pointer transition-all font-medium",
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
                {boat.name}: {isBooked ? 'Booked' : 'Available'}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Disco slot card component
  const DiscoSlotDisplay = ({ slot }: { slot: DiscoSlot }) => {
    const available = slot.ticketCap - slot.ticketsSold;
    
    return (
      <Card className="mb-1">
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-xs">
                {formatTime(new Date(slot.startTime).toTimeString().slice(0, 5))} - 
                {formatTime(new Date(slot.endTime).toTimeString().slice(0, 5))}
              </div>
              <div className="text-xs text-muted-foreground">
                Disco Cruise
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
                <div className="font-bold text-xs">{available} of {slot.ticketCap}</div>
                <div className="text-xs text-muted-foreground">available</div>
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

      {/* Week Display */}
      <Card>
        <CardHeader>
          <CardTitle>
            Week of {format(weekStart, 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" data-testid="tab-all">
                All Boats
              </TabsTrigger>
              <TabsTrigger value="dayTripper" data-testid="tab-daytripper">
                Day Tripper (14)
              </TabsTrigger>
              <TabsTrigger value="medium" data-testid="tab-medium">
                25-Person Boats
              </TabsTrigger>
              <TabsTrigger value="large" data-testid="tab-large">
                Clever Girl (50)
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {/* Week Grid */}
              <div className="grid grid-cols-7 gap-4">
                {weekDates.map((date, index) => {
                  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index];
                  const isToday = date.toDateString() === new Date().toDateString();
                  const dayTimeBlocks = generateTimeBlocks(
                    date,
                    selectedTab === 'all' ? boats : boatGroups[selectedTab as keyof typeof boatGroups],
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
                            No cruises scheduled
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