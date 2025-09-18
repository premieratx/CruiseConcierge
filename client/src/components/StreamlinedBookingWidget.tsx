import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, Calendar, ChevronLeft, ChevronRight, Ship, Sparkles,
  Heart, Crown, PartyPopper, ArrowRight, Clock, MapPin
} from 'lucide-react';
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, isToday } from 'date-fns';
import { formatCurrency, formatTimeForDisplay } from '@shared/formatters';
import type { NormalizedSlot } from '@shared/schema';

interface StreamlinedBookingWidgetProps {
  className?: string;
  defaultPartyType?: 'private' | 'bachelor' | 'bachelorette';
  defaultGroupSize?: number;
}

type PartyType = 'private' | 'bachelor' | 'bachelorette';

interface PartyTypeOption {
  id: PartyType;
  name: string;
  subtitle: string;
  icon: any;
  color: string;
  popular?: boolean;
}

const partyTypes: PartyTypeOption[] = [
  {
    id: 'private',
    name: 'Private Cruise',
    subtitle: 'Your own boat & crew',
    icon: Ship,
    color: 'bg-blue-500 hover:bg-blue-600',
    popular: true
  },
  {
    id: 'bachelor',
    name: 'Bachelor Party',
    subtitle: 'ATX Disco Cruise',
    icon: Crown,
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    id: 'bachelorette',
    name: 'Bachelorette Party', 
    subtitle: 'Our specialty!',
    icon: Heart,
    color: 'bg-pink-500 hover:bg-pink-600'
  }
];

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

export function StreamlinedBookingWidget({ 
  className, 
  defaultPartyType = 'private', 
  defaultGroupSize = 20 
}: StreamlinedBookingWidgetProps) {
  const [selectedPartyType, setSelectedPartyType] = useState<PartyType>(defaultPartyType);
  const [groupSize, setGroupSize] = useState<number>(defaultGroupSize);
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(selectedWeek, { weekStartsOn: 0 });
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  // Fetch availability based on party type
  const { data: availableSlots = [], isLoading } = useQuery<NormalizedSlot[]>({
    queryKey: [
      selectedPartyType === 'private' ? '/api/availability/search' : '/api/disco/availability/public',
      format(weekStart, 'yyyy-MM-dd'), 
      format(weekEnd, 'yyyy-MM-dd'), 
      groupSize,
      selectedPartyType
    ],
    queryFn: async () => {
      if (selectedPartyType === 'private') {
        const params = new URLSearchParams({
          startDate: format(weekStart, 'yyyy-MM-dd'),
          endDate: format(weekEnd, 'yyyy-MM-dd'),
          groupSize: groupSize.toString()
        });
        const response = await fetch(`/api/availability/search?${params}`);
        if (!response.ok) throw new Error("Failed to fetch private availability");
        const data = await response.json();
        return data.slots || [];
      } else {
        // Bachelor/Bachelorette disco cruises - use the correct disco endpoint
        const params = new URLSearchParams({
          startDate: format(weekStart, 'yyyy-MM-dd'),
          endDate: format(weekEnd, 'yyyy-MM-dd'),
          groupSize: groupSize.toString() // Include group size for capacity filtering
        });
        const response = await fetch(`/api/disco/availability/public?${params}`);
        if (!response.ok) throw new Error("Failed to fetch disco availability");
        const data = await response.json();
        return data.slots || [];
      }
    },
    enabled: true,
  });

  // Navigate weeks
  const goToPreviousWeek = () => setSelectedWeek(subWeeks(selectedWeek, 1));
  const goToNextWeek = () => setSelectedWeek(addWeeks(selectedWeek, 1));

  // Get slots for a specific date
  const getSlotsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availableSlots.filter(slot => slot.dateISO === dateStr || slot.date === dateStr);
  };

  // Handle slot selection
  const handleSlotSelect = (slot: NormalizedSlot) => {
    const slotDate = slot.dateISO || slot.date;
    
    if (selectedPartyType === 'private') {
      // Navigate to chat with pre-filled info for private cruises
      const message = `I'd like to book a private cruise on ${slotDate} at ${formatTimeForDisplay(slot.startTime)} for ${groupSize} people. Can you help me with pricing and availability?`;
      navigate(`/chat?message=${encodeURIComponent(message)}&slotId=${slot.id}&groupSize=${groupSize}&cruiseType=private`);
    } else {
      // Navigate to disco booking flow for bachelor/bachelorette
      navigate(`/chat?eventType=${selectedPartyType}&slotId=${slot.id}&groupSize=${groupSize}&cruiseType=disco`);
    }
    
    toast({
      title: "Starting Your Booking",
      description: `Connecting you with our booking agent for ${selectedPartyType === 'private' ? 'private cruise' : selectedPartyType + ' party'} details...`,
    });
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="space-y-8"
      >
        {/* Step 1: Party Type Selection */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2" data-testid="heading-party-type">
                <PartyPopper className="h-6 w-6 text-brand-yellow" />
                Choose Your Experience
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300" data-testid="text-party-type-description">
                Select the type of celebration you're planning
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {partyTypes.map((partyType) => {
                  const IconComponent = partyType.icon;
                  const isSelected = selectedPartyType === partyType.id;
                  
                  return (
                    <motion.div
                      key={partyType.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        className={cn(
                          "h-auto p-6 w-full flex flex-col items-center gap-3 text-left relative transition-all duration-300",
                          isSelected 
                            ? `${partyType.color} text-white border-2 border-transparent` 
                            : "border-2 border-gray-200 hover:border-gray-300"
                        )}
                        onClick={() => setSelectedPartyType(partyType.id)}
                        data-testid={`button-party-type-${partyType.id}`}
                      >
                        {partyType.popular && !isSelected && (
                          <Badge className="absolute -top-2 -right-2 bg-brand-yellow text-black text-xs">
                            Popular
                          </Badge>
                        )}
                        
                        <IconComponent className="h-8 w-8" />
                        <div className="text-center">
                          <div className="font-bold text-lg">{partyType.name}</div>
                          <div className={cn(
                            "text-sm",
                            isSelected ? "text-white/90" : "text-gray-500"
                          )}>
                            {partyType.subtitle}
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Step 2: Group Size Selection */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2" data-testid="heading-group-size">
                <Users className="h-6 w-6 text-brand-blue" />
                How Many People?
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300" data-testid="text-group-size-description">
                Adjust the slider to set your group size
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-brand-blue mb-2" data-testid="text-current-group-size">
                    {groupSize} People
                  </div>
                  <div className="text-sm text-gray-500">
                    {groupSize <= 14 && "Perfect for intimate gatherings"}
                    {groupSize > 14 && groupSize <= 25 && "Great for standard parties"}  
                    {groupSize > 25 && groupSize <= 50 && "Ideal for big celebrations"}
                    {groupSize > 50 && "Perfect for epic events"}
                  </div>
                </div>
                
                <div className="px-4">
                  <Slider
                    value={[groupSize]}
                    onValueChange={(value) => setGroupSize(value[0])}
                    max={75}
                    min={8}
                    step={1}
                    className="w-full"
                    data-testid="slider-group-size-selection"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>8 min</span>
                    <span>75 max</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Step 3: Weekly Calendar View */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2" data-testid="heading-calendar">
                <Calendar className="h-6 w-6 text-brand-yellow" />
                Choose Your Date & Time
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300" data-testid="text-calendar-description">
                Select an available time slot for your {selectedPartyType === 'private' ? 'private cruise' : selectedPartyType + ' party'}
              </p>
            </CardHeader>
            <CardContent>
              {/* Week Navigation */}
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
                
                <h3 className="text-lg font-semibold" data-testid="text-week-range-header">
                  {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
                </h3>
                
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

              {/* Weekly Calendar Grid */}
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

                      {/* Available Slots */}
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
                          slotsForDate.slice(0, 3).map((slot, slotIndex) => (
                            <motion.div
                              key={`${slot.id}-${format(date, 'yyyy-MM-dd')}-${slotIndex}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className={cn(
                                  "w-full h-auto p-2 text-xs justify-start",
                                  selectedPartyType === 'private' 
                                    ? "border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700"
                                    : selectedPartyType === 'bachelor'
                                    ? "border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700"
                                    : "border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-700"
                                )}
                                onClick={() => handleSlotSelect(slot)}
                                data-testid={`button-slot-${slot.id}`}
                              >
                                <div className="w-full">
                                  <div className="flex items-center justify-between w-full mb-1">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span className="font-medium">
                                        {formatTimeForDisplay(slot.startTime)}
                                      </span>
                                    </div>
                                    {selectedPartyType === 'private' ? (
                                      <span className="text-xs font-bold">
                                        {slot.totalPrice ? formatCurrency(slot.totalPrice) : 'Quote'}
                                      </span>
                                    ) : (
                                      <span className="text-xs font-bold">
                                        $85+/person
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs opacity-75">
                                    {selectedPartyType === 'private' 
                                      ? `${slot.duration || 4}hr • ${slot.capacity || 'Various'} max`
                                      : 'Disco Cruise • 4hrs'
                                    }
                                  </div>
                                </div>
                              </Button>
                            </motion.div>
                          ))
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
                                  partyType: selectedPartyType,
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
                      partyType: selectedPartyType,
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
    </div>
  );
}