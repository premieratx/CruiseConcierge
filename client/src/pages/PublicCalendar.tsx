import { useState, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Users, Ship, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, DollarSign, Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addWeeks, subWeeks, isToday, startOfWeek, endOfWeek } from "date-fns";
import type { NormalizedSlot } from "@shared/schema";
import { formatCurrency, formatTimeForDisplay } from '@shared/formatters';
import { useToast } from "@/hooks/use-toast";

// Simple boat matching utility
interface BoatMatch {
  name: string;
  minCapacity: number;
  maxCapacity: number;
}

const BOAT_OPTIONS: BoatMatch[] = [
  { name: 'Day Tripper', minCapacity: 8, maxCapacity: 14 },
  { name: 'Me Seeks The Irony', minCapacity: 15, maxCapacity: 30 },
  { name: 'Clever Girl', minCapacity: 31, maxCapacity: 75 },
];

function getBestBoatMatch(groupSize: number): BoatMatch | null {
  return BOAT_OPTIONS.find(boat => 
    groupSize >= boat.minCapacity && groupSize <= boat.maxCapacity
  ) || null;
}


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

export default function PublicCalendar() {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [groupSize, setGroupSize] = useState<number>(20);
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

  // Get URL params for event type and group size
  const urlParams = new URLSearchParams(window.location.search);
  const eventType = urlParams.get('eventType') || 'private';
  const initialGroupSize = parseInt(urlParams.get('groupSize') || '20');
  
  // Initialize group size from URL params on mount
  useEffect(() => {
    setGroupSize(initialGroupSize);
  }, [initialGroupSize]);

  // Get best boat match for current group size
  const bestMatch = getBestBoatMatch(groupSize);

  // Fetch availability based on event type
  const { data: availableSlots = [], isLoading: privateLoading } = useQuery<NormalizedSlot[]>({
    queryKey: ["/api/availability/public", format(weekStart, 'yyyy-MM-dd'), format(weekEnd, 'yyyy-MM-dd'), groupSize, eventType],
    queryFn: async () => {
      const params = new URLSearchParams({
        startDate: format(weekStart, 'yyyy-MM-dd'),
        endDate: format(weekEnd, 'yyyy-MM-dd'),
        groupSize: groupSize.toString()
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

  const isLoading = privateLoading;


  // Navigate weeks
  const goToPreviousWeek = () => setSelectedWeek(subWeeks(selectedWeek, 1));
  const goToNextWeek = () => setSelectedWeek(addWeeks(selectedWeek, 1));

  // Get slots for a specific date
  const getSlotsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availableSlots.filter(slot => slot.date === dateStr);
  };

  // Handle slot click - show popup
  const handleSlotClick = useCallback((slot: NormalizedSlot) => {
    setSelectedSlot(slot);
    setShowSlotPopup(true);
  }, []);

  // Handle booking from popup
  const handleBookNow = useCallback(() => {
    if (!selectedSlot) return;
    
    // Build checkout URL with all necessary parameters for UniversalCheckout
    const params = new URLSearchParams({
      // Core booking data
      slotId: selectedSlot.id,
      eventDate: selectedSlot.date,  // UniversalCheckout expects 'eventDate'
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      
      // Boat information
      boatId: selectedSlot.boatId?.toString() || '',
      boatName: selectedSlot.boatName || '',
      capacity: selectedSlot.capacity?.toString() || '',
      
      // Group and pricing
      groupSize: groupSize.toString(),
      eventType: eventType,
      cruiseType: selectedSlot.cruiseType || 'private',  // Add cruiseType for UniversalCheckout
      duration: selectedSlot.duration?.toString() || '4',
      basePrice: selectedSlot.basePrice?.toString() || '0',
      price: selectedSlot.totalPrice?.toString() || selectedSlot.basePrice?.toString() || '0',
      
      // Entry point and context
      entryPoint: 'public_calendar',  // Help UniversalCheckout understand the source
      directBooking: 'true',  // Indicate this is a direct booking, not from a quote
      
      // Pre-fill with slot pricing if available
      ...(selectedSlot.totalPrice && { estimatedTotal: selectedSlot.totalPrice.toString() }),
      ...(selectedSlot.label && { slotLabel: selectedSlot.label }),
      ...(selectedSlot.label && { slotDescription: selectedSlot.label }),
    });

    // Navigate to checkout with pre-filled selections
    navigate(`/checkout?${params.toString()}`);
  }, [selectedSlot, groupSize, eventType, navigate]);

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

        {/* Group Size Controls */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block" data-testid="label-group-size">
                Group Size: {groupSize} people
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">8</span>
                <Slider
                  value={[groupSize]}
                  onValueChange={(values) => setGroupSize(values[0])}
                  max={75}
                  min={8}
                  step={1}
                  className="flex-1 max-w-xs"
                  data-testid="slider-group-size"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">75</span>
              </div>
            </div>
            
            {bestMatch && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <div className="text-sm text-green-700 dark:text-green-300" data-testid="text-best-match">
                  <strong>Perfect Match:</strong> {bestMatch.name}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  Fits {bestMatch.minCapacity}-{bestMatch.maxCapacity} people
                </div>
              </div>
            )}
          </div>
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
            const hasSlots = slots.length > 0;
            
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
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                      <div className="text-sm" data-testid={`text-no-slots-${dayIndex}`}>No cruises scheduled</div>
                    </div>
                  ) : (
                    slots.map((slot) => (
                      <motion.div
                        key={slot.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-400" 
                          onClick={() => handleSlotClick(slot)}
                          data-testid={`slot-${slot.id}`}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-blue-600" />
                                  <span className="font-medium text-sm text-gray-900 dark:text-white" data-testid={`text-slot-time-${slot.id}`}>
                                    {formatTimeForDisplay(slot.startTime)} - {formatTimeForDisplay(slot.endTime)}
                                  </span>
                                </div>
                                {slot.totalPrice && (
                                  <Badge variant="secondary" className="text-xs" data-testid={`text-slot-price-${slot.id}`}>
                                    {formatCurrency(slot.totalPrice)}
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Ship className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium" data-testid={`text-slot-boat-${slot.id}`}>
                                  {slot.boatName || 'Available Boat'} ({slot.capacity} people)
                                </span>
                              </div>
                              
                              {slot.capacity && groupSize <= slot.capacity && (
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-green-600" />
                                  <span className="text-sm text-green-600 dark:text-green-400" data-testid={`text-slot-capacity-${slot.id}`}>
                                    Perfect fit for your group of {groupSize}
                                  </span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

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
      
      {/* Booking Popup Dialog */}
      <Dialog open={showSlotPopup} onOpenChange={setShowSlotPopup}>
        <DialogContent className="sm:max-w-[500px]" data-testid="dialog-slot-booking">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Book This Cruise
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              {eventType === 'private' ? 'Private Cruise' : 'Disco Cruise'} Details
            </DialogDescription>
          </DialogHeader>
          
          {selectedSlot && (
            <div className="space-y-4">
              {/* Date and Time */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white" data-testid="text-popup-date">
                    {format(new Date(selectedSlot.date), 'EEEE, MMMM d, yyyy')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-popup-time">
                    {formatTimeForDisplay(selectedSlot.startTime)} - {formatTimeForDisplay(selectedSlot.endTime)}
                  </div>
                </div>
              </div>
              
              {/* Boat Information */}
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Ship className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white" data-testid="text-popup-boat">
                    {selectedSlot.boatName || 'Available Boat'}
                  </div>
                  {selectedSlot.capacity && (
                    <div className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-popup-capacity">
                      Capacity: Up to {selectedSlot.capacity} people
                    </div>
                  )}
                </div>
                {bestMatch?.name === selectedSlot.boatName && (
                  <Badge variant="outline" className="text-green-700 border-green-200">
                    <Star className="h-3 w-3 mr-1" />
                    Perfect Match
                  </Badge>
                )}
              </div>
              
              {/* Group Size */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Users className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white" data-testid="text-popup-group-size">
                    Group Size: {groupSize} people
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {eventType === 'private' ? 'Private Event' : 'Bachelor/Bachelorette Party'}
                  </div>
                </div>
              </div>
              
              {/* Pricing if available */}
              {selectedSlot.totalPrice && (
                <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-yellow-600" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white" data-testid="text-popup-price">
                      Estimated Total: {formatCurrency(selectedSlot.totalPrice)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Final pricing will be calculated at checkout
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowSlotPopup(false)}
              data-testid="button-cancel-booking"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBookNow}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              data-testid="button-book-now"
            >
              Book Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}