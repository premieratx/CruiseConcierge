import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Ship, Anchor, Users, Plus, Minus, AlertCircle } from "lucide-react";
import type { Boat, Booking, DiscoSlot, Timeframe } from "@shared/schema";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Helper function to generate time blocks for a date
const generateTimeBlocks = (date: Date, boats: Boat[], bookings: Booking[], timeframes: Timeframe[]): TimeBlock[] => {
  const dayOfWeek = date.getDay();
  const blocks: TimeBlock[] = [];
  
  // Get timeframes for this day of week
  const dayTimeframes = timeframes.filter(tf => tf.dayOfWeek === dayOfWeek && tf.type === 'private');
  
  // Generate blocks for each boat based on timeframes
  boats.forEach(boat => {
    dayTimeframes.forEach(tf => {
      // Check if this timeframe applies to this boat
      if (tf.boatIds.length === 0 || tf.boatIds.includes(boat.id) || tf.boatIds.includes('any')) {
        const startDateTime = new Date(date);
        const [startHour, startMin] = tf.startTime.split(':').map(Number);
        startDateTime.setHours(startHour, startMin, 0, 0);
        
        const endDateTime = new Date(date);
        const [endHour, endMin] = tf.endTime.split(':').map(Number);
        endDateTime.setHours(endHour, endMin, 0, 0);
        
        // Check if there's a booking for this time slot
        const booking = bookings.find(b => 
          b.boatId === boat.id &&
          b.startTime.getTime() === startDateTime.getTime() &&
          b.endTime.getTime() === endDateTime.getTime()
        );
        
        blocks.push({
          id: `${boat.id}_${tf.startTime}_${tf.endTime}`,
          date,
          startTime: tf.startTime,
          endTime: tf.endTime,
          boatId: boat.id,
          boatName: boat.name,
          status: booking ? (booking.status === 'blocked' ? 'blocked' : 'booked') : 'available',
          booking,
          capacity: boat.capacity
        });
      }
    });
  });
  
  return blocks;
};

export function CalendarView() {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const { toast } = useToast();

  // Get the start of the week (Sunday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(selectedWeek);
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  // Fetch boats
  const { data: boats = [] } = useQuery<Boat[]>({
    queryKey: ["/api/boats"],
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
    dayTripper: boats.filter(b => b.capacity === 14),
    medium: boats.filter(b => b.capacity === 25 || b.capacity === 30),
    large: boats.filter(b => b.capacity === 50)
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
          "p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md",
          block.status === 'available' 
            ? "bg-blue-50 border-blue-200 hover:bg-blue-100" 
            : block.status === 'blocked'
            ? "bg-gray-100 border-gray-300"
            : "bg-blue-500 text-white border-blue-600 hover:bg-blue-600"
        )}
        onClick={handleToggle}
        data-testid={`time-block-${block.id}`}
      >
        <div className="font-semibold text-sm">
          {formatTime(block.startTime)} - {formatTime(block.endTime)}
        </div>
        <div className="text-xs mt-1">
          <Ship className="inline w-3 h-3 mr-1" />
          {block.boatName}
        </div>
        {block.capacity && (
          <div className="text-xs mt-1 opacity-75">
            Capacity: {block.capacity}
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
            "p-3 rounded-lg border-2 transition-all",
            available > 0 
              ? "bg-blue-50 border-blue-200" 
              : "bg-blue-500 text-white border-blue-600"
          )}
        >
          <div className="font-semibold text-sm">
            {formatTime(startTime)} - {formatTime(endTime)}
          </div>
          <div className="text-sm mt-1 font-medium">
            {available} of {total} boats available
          </div>
          <div className="text-xs mt-1 opacity-75">
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
                  "text-xs px-2 py-1 rounded cursor-pointer transition-all",
                  isBooked 
                    ? "bg-blue-500 text-white" 
                    : "bg-blue-100 hover:bg-blue-200"
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
      <Card className="mb-2">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">
                {formatTime(new Date(slot.startTime).toTimeString().slice(0, 5))} - 
                {formatTime(new Date(slot.endTime).toTimeString().slice(0, 5))}
              </div>
              <div className="text-sm text-muted-foreground">
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
              <div className="text-center min-w-[100px]">
                <div className="font-bold">{available} of {slot.ticketCap}</div>
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
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              const newWeek = new Date(selectedWeek);
              newWeek.setDate(newWeek.getDate() - 7);
              setSelectedWeek(newWeek);
            }}
            data-testid="week-prev"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedWeek(new Date())}
            data-testid="week-today"
          >
            Today
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const newWeek = new Date(selectedWeek);
              newWeek.setDate(newWeek.getDate() + 7);
              setSelectedWeek(newWeek);
            }}
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
                    timeframes
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
                        "border rounded-lg p-3",
                        isToday && "bg-blue-50 border-blue-300"
                      )}
                      data-testid={`day-${date.toISOString()}`}
                    >
                      <div className="font-semibold text-center mb-2">
                        {dayOfWeek}
                        <div className="text-sm text-muted-foreground">
                          {format(date, 'MMM d')}
                        </div>
                      </div>

                      {/* Regular time blocks or grouped view */}
                      <div className="space-y-2 max-h-96 overflow-y-auto">
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
              <div className="w-4 h-4 bg-blue-50 border-2 border-blue-200 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 border-2 border-blue-600 rounded"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
              <span>Blocked</span>
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