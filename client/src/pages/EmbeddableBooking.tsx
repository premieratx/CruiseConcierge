import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  CalendarIcon, Clock, Users, Ship, DollarSign, Star, Sparkles,
  ChevronLeft, ChevronRight, Filter, Heart, MapPin, Phone, Mail,
  CheckCircle, ArrowRight, Waves, Sun, Moon, ExternalLink, Music
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, addWeeks, subWeeks, isToday, isSameMonth, startOfWeek, endOfWeek } from "date-fns";
import type { TimeSlot, DiscoTimeSlot } from "@shared/timeSlots";
import { formatTimeForDisplay, getPrivateTimeSlotsForDate, getDiscoTimeSlotsForDate, isDiscoAvailableForDate } from "@shared/timeSlots";
import { formatCurrency, formatDate, formatLongDate, formatTimeRange, formatBoatCapacity, formatEventDuration, formatGroupSize } from "@shared/formatters";
import { EVENT_TYPES, CRUISE_TYPES, DISCO_PACKAGES } from "@shared/constants";

interface PublicAvailabilitySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  boatId: string;
  boatName: string;
  boatType: string;
  capacity: number;
  availableSpots: number;
  baseHourlyRate: number;
  totalPrice: number;
  icon?: string;
  popular?: boolean;
  description?: string;
  status: 'available';
}

interface DiscoAvailabilitySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  ticketPrice: number;
  availableTickets: number;
  totalCapacity: number;
  status: 'available';
  type: 'disco';
}

interface BookingModalData {
  slot: PublicAvailabilitySlot | DiscoAvailabilitySlot;
  date: Date;
}

// Use EVENT_TYPES from shared constants with local color mapping
const eventTypeColors = {
  birthday: 'bg-pink-500',
  bachelor: 'bg-blue-500', 
  bachelorette: 'bg-purple-500',
  corporate: 'bg-gray-500',
  wedding: 'bg-rose-500',
  graduation: 'bg-green-500',
  anniversary: 'bg-rose-400',
  reunion: 'bg-indigo-500',
  other: 'bg-yellow-500',
} as const;

const eventTypes = Object.entries(EVENT_TYPES).map(([id, config]) => ({
  id,
  label: config.label,
  emoji: config.emoji,
  color: eventTypeColors[id as keyof typeof eventTypeColors] || 'bg-gray-500',
}));

// Use shared formatCurrency from formatters

const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.2 }
  }
};

export default function EmbeddableBooking() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedCruiseType, setSelectedCruiseType] = useState<'private' | 'disco' | 'both'>('both');
  const [groupSize, setGroupSize] = useState<number>(20);
  const [selectedEventType, setSelectedEventType] = useState<string>('');
  const [bookingModal, setBookingModal] = useState<BookingModalData | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(selectedWeek, { weekStartsOn: 0 });
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  // Fetch availability for private cruises
  const { data: privateSlots = [], isLoading: privateLoading } = useQuery<PublicAvailabilitySlot[]>({
    queryKey: ["/api/availability/public", weekStart.toISOString(), weekEnd.toISOString(), groupSize, selectedEventType],
    queryFn: async () => {
      const params = new URLSearchParams({
        startDate: weekStart.toISOString(),
        endDate: weekEnd.toISOString(),
        groupSize: groupSize.toString(),
        ...(selectedEventType && { eventType: selectedEventType })
      });
      
      const response = await fetch(`/api/availability/public?${params}`);
      if (!response.ok) throw new Error("Failed to fetch availability");
      const data = await response.json();
      return data.slots || [];
    },
    enabled: selectedCruiseType === 'private' || selectedCruiseType === 'both',
  });

  // Fetch availability for disco cruises
  const { data: discoSlots = [], isLoading: discoLoading } = useQuery<DiscoAvailabilitySlot[]>({
    queryKey: ["/api/disco/availability/public", weekStart.toISOString(), weekEnd.toISOString()],
    queryFn: async () => {
      const params = new URLSearchParams({
        startDate: weekStart.toISOString(),
        endDate: weekEnd.toISOString()
      });
      
      const response = await fetch(`/api/disco/availability/public?${params}`);
      if (!response.ok) throw new Error("Failed to fetch disco availability");
      const data = await response.json();
      return data.slots || [];
    },
    enabled: selectedCruiseType === 'disco' || selectedCruiseType === 'both',
  });

  const isLoading = privateLoading || discoLoading;

  // Handle date selection from calendar
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedWeek(date);
      setIsDatePickerOpen(false);
    }
  };

  // Navigate weeks
  const goToPreviousWeek = () => setSelectedWeek(subWeeks(selectedWeek, 1));
  const goToNextWeek = () => setSelectedWeek(addWeeks(selectedWeek, 1));

  // Get slots for a specific date
  const getSlotsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    const privateSlotsForDate = privateSlots.filter(slot => slot.date === dateStr);
    const discoSlotsForDate = discoSlots.filter(slot => slot.date === dateStr);
    
    return {
      private: privateSlotsForDate,
      disco: discoSlotsForDate
    };
  };

  // Handle slot selection for booking
  const handleSlotSelect = (slot: PublicAvailabilitySlot | DiscoAvailabilitySlot, date: Date) => {
    setBookingModal({ slot, date });
  };

  // Navigate to booking flow (in embed context, this would open a new tab)
  const startBookingFlow = () => {
    if (!bookingModal) return;
    
    const slot = bookingModal.slot;
    let slotId: string;
    
    if ('type' in slot && slot.type === 'disco') {
      slotId = `disco_${slot.id}`;
    } else {
      const privateSlot = slot as PublicAvailabilitySlot;
      slotId = `private_${privateSlot.boatId}_${slot.date}_${slot.startTime}_${slot.endTime}`;
    }
    
    // In embed context, open in new tab/window
    const bookingUrl = `/book/${slotId}`;
    window.open(bookingUrl, '_blank');
    
    setBookingModal(null);
    
    toast({
      title: "Opening Booking Form",
      description: "Opening in new window...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-2 sm:p-4">
      {/* Compact Header for Embed */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border rounded-lg mb-4">
        <div className="px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-6 sm:h-8 w-auto"
                data-testid="img-logo"
              />
              <div>
                <h1 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white" data-testid="text-page-title">
                  Book Your Cruise
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-xs" data-testid="text-subtitle">
                  Select an available time slot
                </p>
              </div>
            </div>
            
            {/* Contact Info - Hidden on very small screens */}
            <div className="hidden sm:flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span data-testid="text-phone">(512) 555-BOAT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Compact Filters */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-4"
        >
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Cruise Type */}
                <div className="space-y-1">
                  <Label className="text-xs">Cruise Type</Label>
                  <Select value={selectedCruiseType} onValueChange={(value: any) => setSelectedCruiseType(value)}>
                    <SelectTrigger className="h-9" data-testid="select-cruise-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="both">All Cruises</SelectItem>
                      <SelectItem value="private">Private Charters</SelectItem>
                      <SelectItem value="disco">Disco Cruises</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Group Size */}
                <div className="space-y-1">
                  <Label className="text-xs">Group Size: {groupSize}</Label>
                  <div className="px-2">
                    <Slider
                      value={[groupSize]}
                      onValueChange={(value) => setGroupSize(value[0])}
                      max={75}
                      min={8}
                      step={1}
                      className="w-full"
                      data-testid="slider-group-size"
                    />
                  </div>
                </div>

                {/* Event Type */}
                <div className="space-y-1">
                  <Label className="text-xs">Event Type</Label>
                  <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                    <SelectTrigger className="h-9" data-testid="select-event-type">
                      <SelectValue placeholder="Any event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Event Type</SelectItem>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.emoji} {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode */}
                <div className="space-y-1">
                  <Label className="text-xs">View</Label>
                  <div className="flex rounded-md border">
                    <Button
                      variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                      size="sm"
                      className="flex-1 h-9 rounded-r-none text-xs"
                      onClick={() => setViewMode('calendar')}
                      data-testid="button-view-calendar"
                    >
                      Calendar
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      className="flex-1 h-9 rounded-l-none text-xs"
                      onClick={() => setViewMode('list')}
                      data-testid="button-view-list"
                    >
                      List
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Date Navigation */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-4"
        >
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousWeek}
                  data-testid="button-previous-week"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Previous</span>
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="text-sm" data-testid="button-date-picker">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {format(selectedWeek, 'MMM d, yyyy')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        initialFocus
                        data-testid="calendar-date-picker"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextWeek}
                  data-testid="button-next-week"
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Calendar/List View */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="space-y-4"
        >
          {viewMode === 'calendar' ? (
            /* Week Calendar View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2">
              {weekDates.map((date, index) => {
                const slots = getSlotsForDate(date);
                const totalSlots = slots.private.length + slots.disco.length;
                const isCurrentDay = isToday(date);
                
                return (
                  <motion.div
                    key={date.toISOString()}
                    initial="hidden"
                    animate="visible"
                    variants={slideIn}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={cn(
                      "min-h-[200px]",
                      isCurrentDay && "ring-2 ring-blue-500"
                    )}>
                      <CardHeader className="p-2 pb-1">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">
                            {format(date, 'EEE')}
                          </div>
                          <div className={cn(
                            "text-lg font-bold",
                            isCurrentDay ? "text-blue-600" : "text-gray-900 dark:text-white"
                          )}>
                            {format(date, 'd')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {format(date, 'MMM')}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-2 pt-0">
                        <div className="space-y-1">
                          {totalSlots === 0 ? (
                            <div className="text-center py-4">
                              <div className="text-xs text-gray-400">No availability</div>
                            </div>
                          ) : (
                            <>
                              {/* Private Cruise Slots */}
                              {slots.private.map((slot) => (
                                <Button
                                  key={slot.id}
                                  variant="outline"
                                  size="sm"
                                  className="w-full h-auto p-2 text-xs"
                                  onClick={() => handleSlotSelect(slot, date)}
                                  data-testid={`button-slot-${slot.id}`}
                                >
                                  <div className="w-full">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">
                                        {slot.startTime}-{slot.endTime}
                                      </span>
                                      {slot.popular && (
                                        <Star className="h-3 w-3 text-yellow-500" />
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {slot.boatName} • {slot.capacity} max
                                    </div>
                                    <div className="text-xs font-medium text-green-600">
                                      From {formatCurrency(slot.totalPrice)}
                                    </div>
                                  </div>
                                </Button>
                              ))}

                              {/* Disco Cruise Slots */}
                              {slots.disco.map((slot) => (
                                <Button
                                  key={slot.id}
                                  variant="outline"
                                  size="sm"
                                  className="w-full h-auto p-2 text-xs bg-purple-50 dark:bg-purple-900/20"
                                  onClick={() => handleSlotSelect(slot, date)}
                                  data-testid={`button-disco-slot-${slot.id}`}
                                >
                                  <div className="w-full">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">
                                        {slot.startTime}-{slot.endTime}
                                      </span>
                                      <Music className="h-3 w-3 text-purple-500" />
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Disco Cruise
                                    </div>
                                    <div className="text-xs font-medium text-purple-600">
                                      {formatCurrency(slot.ticketPrice * 100)}/person
                                    </div>
                                  </div>
                                </Button>
                              ))}
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-2">
              {weekDates.map((date) => {
                const slots = getSlotsForDate(date);
                const totalSlots = slots.private.length + slots.disco.length;
                
                if (totalSlots === 0) return null;
                
                return (
                  <Card key={date.toISOString()}>
                    <CardHeader className="py-3">
                      <CardTitle className="text-lg">
                        {format(date, 'EEEE, MMMM d, yyyy')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[...slots.private, ...slots.disco].map((slot) => (
                          <Button
                            key={slot.id}
                            variant="outline"
                            className="h-auto p-4 justify-start"
                            onClick={() => handleSlotSelect(slot, date)}
                            data-testid={`button-list-slot-${slot.id}`}
                          >
                            <div className="w-full text-left">
                              {'type' in slot ? (
                                /* Disco Slot */
                                <>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold">
                                      {slot.startTime}-{slot.endTime}
                                    </span>
                                    <Music className="h-4 w-4 text-purple-500" />
                                  </div>
                                  <div className="text-sm text-gray-600">Disco Cruise</div>
                                  <div className="text-sm font-medium text-purple-600">
                                    {formatCurrency(slot.ticketPrice * 100)}/person
                                  </div>
                                </>
                              ) : (
                                /* Private Slot */
                                <>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold">
                                      {slot.startTime}-{slot.endTime}
                                    </span>
                                    {slot.popular && (
                                      <Star className="h-4 w-4 text-yellow-500" />
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {slot.boatName} • Up to {slot.capacity} guests
                                  </div>
                                  <div className="text-sm font-medium text-green-600">
                                    From {formatCurrency(slot.totalPrice)}
                                  </div>
                                </>
                              )}
                            </div>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2 text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span>Loading availability...</span>
              </div>
            </div>
          )}

          {/* No Results */}
          {!isLoading && privateSlots.length === 0 && discoSlots.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center">
                <Ship className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No availability found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Try adjusting your filters or selecting a different week.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Booking Modal */}
      <Dialog open={!!bookingModal} onOpenChange={() => setBookingModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book This Cruise</DialogTitle>
            <DialogDescription>
              Complete your booking in a new window
            </DialogDescription>
          </DialogHeader>
          
          {bookingModal && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2">
                  {format(bookingModal.date, 'EEEE, MMMM d, yyyy')}
                </h4>
                
                {'type' in bookingModal.slot ? (
                  /* Disco Cruise Details */
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Music className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Disco Cruise</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {bookingModal.slot.startTime} - {bookingModal.slot.endTime}
                    </div>
                    <div className="text-lg font-bold text-purple-600">
                      {formatCurrency(bookingModal.slot.ticketPrice * 100)} per person
                    </div>
                  </div>
                ) : (
                  /* Private Cruise Details */
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Ship className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{bookingModal.slot.boatName}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {bookingModal.slot.startTime} - {bookingModal.slot.endTime} • {bookingModal.slot.duration}h
                    </div>
                    <div className="text-sm text-gray-600">
                      Up to {bookingModal.slot.capacity} guests
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      From {formatCurrency(bookingModal.slot.totalPrice)}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setBookingModal(null)}
                  className="flex-1"
                  data-testid="button-cancel-booking"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={startBookingFlow}
                  className="flex-1"
                  data-testid="button-continue-booking"
                >
                  Continue Booking
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}