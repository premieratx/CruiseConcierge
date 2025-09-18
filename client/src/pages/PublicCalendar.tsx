import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Users, Ship, ChevronLeft, ChevronRight, Phone, Mail, MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addWeeks, subWeeks, isToday, startOfWeek, endOfWeek } from "date-fns";
import type { NormalizedSlot } from "@shared/schema";
import { formatCurrency, formatTimeForDisplay } from '@shared/formatters';


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
    queryKey: ["/api/availability/public", weekStart.toISOString(), weekEnd.toISOString()],
    queryFn: async () => {
      const params = new URLSearchParams({
        startDate: weekStart.toISOString(),
        endDate: weekEnd.toISOString(),
        groupSize: "20"
      });
      
      const response = await fetch(`/api/availability/public?${params}`);
      if (!response.ok) throw new Error("Failed to fetch availability");
      const data = await response.json();
      return data.slots || [];
    },
  });

  const isLoading = privateLoading;


  // Navigate weeks
  const goToPreviousWeek = () => setSelectedWeek(subWeeks(selectedWeek, 1));
  const goToNextWeek = () => setSelectedWeek(addWeeks(selectedWeek, 1));

  // Get slots for a specific date
  const getSlotsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return privateSlots.filter(slot => slot.date === dateStr);
  };

  // Handle direct slot selection for booking
  const handleSlotSelect = (slot: NormalizedSlot) => {
    // Navigate to chat with slot context
    const params = new URLSearchParams({
      cruiseType: 'private',
      date: slot.date,
      time: slot.startTime,
      boat: slot.boatName || 'boat'
    });
    navigate(`/chat?${params}`);
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
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400" data-testid={`text-no-slots-${dayIndex}`}>
                      <Ship className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">No availability</div>
                    </div>
                  ) : (
                    slots.map((slot) => (
                      <motion.div
                        key={slot.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-all duration-200 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800"
                          onClick={() => handleSlotSelect(slot)}
                          data-testid={`card-slot-${slot.id}`}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Ship className="h-4 w-4 text-blue-500" />
                                <div>
                                  <div className="font-medium text-sm" data-testid={`text-slot-time-${slot.id}`}>
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
                              <div className="font-semibold text-blue-600 dark:text-blue-400" data-testid={`text-slot-price-${slot.id}`}>
                                {formatCurrency(slot.totalPrice)}
                              </div>
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
    </div>
  );
}