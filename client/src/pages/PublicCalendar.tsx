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
  CalendarIcon, Clock, Users, Ship, DollarSign, Sparkles,
  ChevronLeft, ChevronRight, Filter, Heart, MapPin, Phone, Mail,
  CheckCircle, ArrowRight, Waves, Sun, Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, addWeeks, subWeeks, isToday, isSameMonth, startOfWeek, endOfWeek } from "date-fns";
import type { NormalizedSlot } from "@shared/schema";
import { useAvailability } from "@/hooks/use-availability";
import { TimeSlotList } from "@/components/TimeSlotList";
import { formatCurrency, formatDate, formatLongDate, formatTimeRange, formatBoatCapacity, formatEventDuration, formatGroupSize, formatTimeForDisplay } from '@shared/formatters';
import { EVENT_TYPES, CRUISE_TYPES, DISCO_PACKAGES } from '@shared/constants';

interface BookingModalData {
  slot: NormalizedSlot;
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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

export default function PublicCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
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
  const { data: privateSlots = [], isLoading: privateLoading } = useQuery<NormalizedSlot[]>({
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
  const { data: discoSlots = [], isLoading: discoLoading } = useQuery<NormalizedSlot[]>({
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

  // Navigate to booking flow
  const startBookingFlow = () => {
    if (!bookingModal) return;
    
    // Create slot ID for navigation
    const slot = bookingModal.slot;
    let slotId: string;
    
    if ('type' in slot && slot.type === 'disco') {
      // Disco slot ID format: disco_{id}
      slotId = `disco_${slot.id}`;
    } else {
      // Private slot ID format: private_{boatId}_{date}_{startTime}_{endTime}
      const privateSlot = slot as PublicAvailabilitySlot;
      slotId = `private_${privateSlot.boatId}_${slot.date}_${slot.startTime}_${slot.endTime}`;
    }
    
    // Close modal and navigate to booking flow
    setBookingModal(null);
    
    // Navigate to booking flow with slot data
    navigate(`/book/${slotId}`);
    
    toast({
      title: "Starting Booking Process",
      description: "Redirecting to booking form...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-12 w-auto"
                data-testid="img-logo"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="text-page-title">
                  Book Your Cruise
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm" data-testid="text-subtitle">
                  Select an available time slot to start your booking
                </p>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span data-testid="text-phone">(512) 488-5892</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span data-testid="text-email">clientservices@premierpartycruises.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-filters-title">
                <Filter className="h-5 w-5" />
                Find Your Perfect Cruise
              </CardTitle>
              <CardDescription data-testid="text-filters-description">
                Filter by group size, event type, and cruise style to find available slots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Cruise Type */}
                <div className="space-y-2">
                  <Label htmlFor="cruise-type" data-testid="label-cruise-type">Cruise Type</Label>
                  <Select value={selectedCruiseType} onValueChange={(value: any) => setSelectedCruiseType(value)}>
                    <SelectTrigger data-testid="select-cruise-type">
                      <SelectValue placeholder="Select cruise type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="both" data-testid="option-cruise-both">All Cruises</SelectItem>
                      <SelectItem value="private" data-testid="option-cruise-private">Private Charters</SelectItem>
                      <SelectItem value="disco" data-testid="option-cruise-disco">Disco Cruises</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Group Size */}
                <div className="space-y-2">
                  <Label data-testid="label-group-size">Group Size: {groupSize} guests</Label>
                  <Slider
                    value={[groupSize]}
                    onValueChange={(value) => setGroupSize(value[0])}
                    max={75}
                    min={8}
                    step={1}
                    className="w-full"
                    data-testid="slider-group-size"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>8</span>
                    <span>75</span>
                  </div>
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                  <Label htmlFor="event-type" data-testid="label-event-type">Event Type</Label>
                  <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                    <SelectTrigger data-testid="select-event-type">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" data-testid="option-event-all">All Events</SelectItem>
                      {eventTypes.map(event => (
                        <SelectItem key={event.id} value={event.id} data-testid={`option-event-${event.id}`}>
                          {event.emoji} {event.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                  <Label data-testid="label-date-picker">Jump to Date</Label>
                  <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left font-normal"
                        data-testid="button-date-picker"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(selectedDate, 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        data-testid="calendar-date-picker"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Week Navigation */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex items-center justify-between mb-6"
        >
          <Button 
            variant="outline" 
            onClick={goToPreviousWeek}
            className="flex items-center gap-2"
            data-testid="button-previous-week"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Week
          </Button>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white" data-testid="text-week-range">
            {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
          </h2>
          
          <Button 
            variant="outline" 
            onClick={goToNextWeek}
            className="flex items-center gap-2"
            data-testid="button-next-week"
          >
            Next Week
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Weekly Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {weekDates.map((date, dayIndex) => {
            const slots = getSlotsForDate(date);
            const hasSlots = slots.private.length > 0 || slots.disco.length > 0;
            
            return (
              <motion.div
                key={date.toISOString()}
                initial="hidden"
                animate="visible"
                variants={slideIn}
                transition={{ delay: dayIndex * 0.1 }}
                className="space-y-3"
              >
                {/* Day Header */}
                <div className={cn(
                  "p-3 rounded-lg text-center border",
                  isToday(date) 
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" 
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                )}>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300" data-testid={`text-day-${dayIndex}`}>
                    {format(date, 'EEE')}
                  </div>
                  <div className={cn(
                    "text-lg font-bold",
                    isToday(date) 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-gray-900 dark:text-white"
                  )} data-testid={`text-date-${dayIndex}`}>
                    {format(date, 'd')}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400" data-testid={`text-month-${dayIndex}`}>
                    {format(date, 'MMM')}
                  </div>
                </div>

                {/* Available Slots */}
                <div className="space-y-2">
                  {isLoading ? (
                    <div className="animate-pulse space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded" data-testid={`skeleton-slot-${dayIndex}-${i}`} />
                      ))}
                    </div>
                  ) : !hasSlots ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400" data-testid={`text-no-slots-${dayIndex}`}>
                      <Ship className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">No availability</div>
                    </div>
                  ) : (
                    <>
                      {/* Private Cruise Slots */}
                      {(selectedCruiseType === 'private' || selectedCruiseType === 'both') && 
                        slots.private.map((slot) => (
                          <motion.div
                            key={slot.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card 
                              className="cursor-pointer hover:shadow-md transition-all duration-200 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800"
                              onClick={() => handleSlotSelect(slot, date)}
                              data-testid={`card-private-slot-${slot.id}`}
                            >
                              <CardContent className="p-2">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-1">
                                    <div className="text-sm" data-testid={`text-slot-icon-${slot.id}`}>{slot.icon || '⛵'}</div>
                                    <div>
                                      <div className="font-medium text-xs" data-testid={`text-slot-time-${slot.id}`}>
                                        {formatTimeForDisplay(slot.startTime)} - {formatTimeForDisplay(slot.endTime)}
                                      </div>
                                      <div className="text-xs text-gray-600 dark:text-gray-300" data-testid={`text-slot-boat-${slot.id}`}>
                                        {slot.boatName}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                                    <Users className="h-3 w-3" />
                                    <span data-testid={`text-slot-capacity-${slot.id}`}>Up to {slot.capacity}</span>
                                  </div>
                                  <div className="font-semibold text-green-600 dark:text-green-400" data-testid={`text-slot-price-${slot.id}`}>
                                    {formatCurrency(slot.totalPrice)}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))
                      }

                      {/* Disco Cruise Slots */}
                      {(selectedCruiseType === 'disco' || selectedCruiseType === 'both') && 
                        slots.disco.map((slot) => (
                          <motion.div
                            key={slot.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card 
                              className="cursor-pointer hover:shadow-md transition-all duration-200 border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800"
                              onClick={() => handleSlotSelect(slot, date)}
                              data-testid={`card-disco-slot-${slot.id}`}
                            >
                              <CardContent className="p-2">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-1">
                                    <Sparkles className="h-3 w-3 text-purple-500" />
                                    <div>
                                      <div className="font-medium text-xs" data-testid={`text-disco-time-${slot.id}`}>
                                        {formatTimeForDisplay(slot.startTime)} - {formatTimeForDisplay(slot.endTime)}
                                      </div>
                                      <div className="text-xs text-purple-600 dark:text-purple-300" data-testid={`text-disco-label-${slot.id}`}>
                                        Disco Cruise
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between text-xs">
                                  <div className="text-gray-600 dark:text-gray-300" data-testid={`text-disco-tickets-${slot.id}`}>
                                    {slot.availableTickets ? `${slot.availableTickets}/100 remaining` : '100/100 remaining'}
                                  </div>
                                  <div className="font-semibold text-purple-600 dark:text-purple-400" data-testid={`text-disco-price-${slot.id}`}>
                                    ${slot.ticketPrice}/ticket
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))
                      }
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Slot Details Modal */}
        <Dialog open={!!bookingModal} onOpenChange={() => setBookingModal(null)}>
          <DialogContent className="max-w-md">
            {bookingModal && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2" data-testid="text-modal-title">
                    {'type' in bookingModal.slot ? (
                      <>
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        Disco Cruise Details
                      </>
                    ) : (
                      <>
                        <Ship className="h-5 w-5 text-blue-500" />
                        Private Charter Details
                      </>
                    )}
                  </DialogTitle>
                  <DialogDescription data-testid="text-modal-date">
                    {format(bookingModal.date, 'EEEE, MMMM d, yyyy')}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {/* Time and Duration */}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span data-testid="text-modal-time">
                      {formatTimeForDisplay(bookingModal.slot.startTime)} - {formatTimeForDisplay(bookingModal.slot.endTime)}
                    </span>
                    {'duration' in bookingModal.slot && (
                      <Badge variant="outline" data-testid="badge-modal-duration">
                        {bookingModal.slot.duration}h cruise
                      </Badge>
                    )}
                  </div>

                  {/* Boat Info (Private) or Ticket Info (Disco) */}
                  {'boatName' in bookingModal.slot ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Ship className="h-4 w-4 text-gray-500" />
                        <span className="font-medium" data-testid="text-modal-boat">{bookingModal.slot.boatName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span data-testid="text-modal-capacity">Capacity: Up to {bookingModal.slot.capacity} guests</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-gray-500" />
                        <span className="font-medium" data-testid="text-modal-disco-type">Disco Cruise Experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span data-testid="text-modal-disco-tickets">{bookingModal.slot.availableTickets} tickets available</span>
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium" data-testid="text-modal-pricing-label">
                        {'ticketPrice' in bookingModal.slot ? 'Per Ticket' : 'Total Price'}
                      </span>
                      <span className="text-xl font-bold text-green-600 dark:text-green-400" data-testid="text-modal-pricing-amount">
                        {'ticketPrice' in bookingModal.slot 
                          ? `$${bookingModal.slot.ticketPrice}` 
                          : formatCurrency(bookingModal.slot.totalPrice)
                        }
                      </span>
                    </div>
                    {'totalPrice' in bookingModal.slot && (
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1" data-testid="text-modal-deposit-info">
                        25% deposit required to book
                      </div>
                    )}
                  </div>

                  {/* Book Button */}
                  <Button 
                    onClick={startBookingFlow} 
                    className="w-full" 
                    size="lg"
                    data-testid="button-start-booking"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Book This Slot
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-12 w-auto mb-4"
                data-testid="img-footer-logo"
              />
              <p className="text-gray-300" data-testid="text-footer-description">
                Austin's premier party cruise experience on beautiful Lake Travis. 
                Create unforgettable memories with friends and family.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" data-testid="text-footer-contact-title">Contact Us</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span data-testid="text-footer-phone">(512) 488-5892</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span data-testid="text-footer-email">clientservices@premierpartycruises.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span data-testid="text-footer-location">Lake Travis, Austin, TX</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" data-testid="text-footer-hours-title">Operating Hours</h3>
              <div className="text-gray-300 space-y-1">
                <div data-testid="text-footer-hours-weekdays">Monday - Thursday: 10 AM - 8 PM</div>
                <div data-testid="text-footer-hours-friday">Friday: 12 PM - 8:30 PM</div>
                <div data-testid="text-footer-hours-weekend">Saturday - Sunday: 11 AM - 7:30 PM</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p data-testid="text-footer-copyright">
              © 2025 Premier Party Cruises. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}