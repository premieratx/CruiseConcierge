import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { motion, AnimatePresence } from 'framer-motion';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Ship, ChevronRight, DollarSign, Users, 
  Calendar as CalendarIcon, Clock, Check, X,
  User, Mail, Phone, MapPin, Star, Sparkles, CreditCard,
  FileText, AlertCircle, Loader2, ChevronLeft, Edit2,
  Music, Anchor, Crown, Zap, Calendar, ArrowRight, ArrowLeft,
  RotateCcw, CheckCircle, Settings, Plus, Minus
} from 'lucide-react';
import { AlternativeDates } from '@/components/AlternativeDates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { format, addDays, isBefore, isAfter, startOfDay, differenceInDays } from 'date-fns';
import type { InsertContact, InsertProject, PricingPreview, InsertQuote, RadioSection, QuoteItem, NormalizedSlot } from '@shared/schema';
import { useAvailabilityForDate, useAvailabilityForDateRange, formatDateForAvailability } from '@/hooks/use-availability';
import { useSlotHold, type CreateSlotHoldParams } from '@/hooks/use-slot-hold';
import { TimeSlotList } from '@/components/TimeSlotList';
import { formatCurrency, formatDate, formatLongDate, formatTimeForDisplay, formatTimeRange, formatPhoneNumber, formatCustomerName, formatBoatCapacity, formatEventDuration, formatGroupSize } from '@shared/formatters';
import { EVENT_TYPES, CRUISE_TYPES, DISCO_PACKAGES, PRICING_DEFAULTS, HOURLY_RATES } from '@shared/constants';
import { getDiscoTimeSlotsForDate, getPrivateTimeSlotsForDate, isDiscoAvailableForDate } from '@shared/timeSlots';
import { getHourlyRateByDayAndGroupSize, calculateCompletePricing, getDayType, getCapacityTier } from '@shared/pricing';

type ChatFlowStep = 
  | 'intro' // Intro + Calendar combined
  | 'comparison-selection' // Event type + Group size + Comparison
  | 'contact-form'
  | 'confirmation';

type CruiseType = 'private' | 'disco';
type DiscoPackage = 'basic' | 'disco_queen' | 'platinum';

interface ComparisonSelection {
  cruiseType: CruiseType;
  selectedSlot?: NormalizedSlot;
  discoPackage?: DiscoPackage;
}

interface BookingData {
  eventType: string;
  eventTypeLabel: string;
  eventEmoji: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: Date | undefined;
  groupSize: number;
  specialRequests: string;
  budget: string;
  selectedCruiseType: CruiseType | null;
  selectedSlot: NormalizedSlot | null;
  selectedAddOnPackages: string[];
  selectedBoat?: string;
  selectedDiscoPackage: DiscoPackage | null;
  discoTicketQuantity: number;
  preferredTimeLabel?: string;
  groupSizeLabel?: string;
}

interface CompletedSelection {
  id: string;
  label: string;
  value: string;
  icon?: string;
  emoji?: string;
  editable?: boolean;
  onEdit?: () => void;
}

// Use EVENT_TYPES from shared constants
const eventTypes = Object.entries(EVENT_TYPES).map(([id, config]) => ({
  id,
  label: config.label,
  emoji: config.emoji,
  description: config.description,
}));

// Now using unified availability system with useAvailability hook

const isDateAvailable = (date: Date): boolean => {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 365);
  return !isBefore(date, today) && !isAfter(date, maxDate);
};

// Hook for getting alternative dates with real availability data
const useAlternativeDates = (selectedDate: Date | undefined, groupSize: number, daysRange: number = 14) => {
  // Generate date range for alternative dates
  const dateRange = useMemo(() => {
    if (!selectedDate) return { startDate: '', endDate: '', dates: [] };
    
    const dates: Date[] = [];
    for (let i = -daysRange/2; i <= daysRange/2; i++) {
      if (i === 0) continue;
      
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i);
      
      if (date >= new Date()) {
        dates.push(date);
      }
    }
    
    const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime()).slice(0, 6);
    
    return {
      startDate: sortedDates.length > 0 ? formatDateForAvailability(sortedDates[0]) : '',
      endDate: sortedDates.length > 0 ? formatDateForAvailability(sortedDates[sortedDates.length - 1]) : '',
      dates: sortedDates
    };
  }, [selectedDate, daysRange]);
  
  // Fetch availability for the date range
  const { data: availabilityData } = useAvailabilityForDateRange(
    dateRange.startDate,
    dateRange.endDate,
    undefined, // both private and disco
    groupSize,
    {
      enabled: Boolean(dateRange.startDate && dateRange.endDate && dateRange.dates.length > 0),
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  );
  
  // Group slots by date
  const slotsByDate = useMemo(() => {
    if (!availabilityData?.slots) return {};
    return availabilityData.slots.reduce((groups, slot) => {
      const date = slot.dateISO;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(slot);
      return groups;
    }, {} as Record<string, NormalizedSlot[]>);
  }, [availabilityData]);
  
  // Generate alternative dates with real availability counts
  const alternativeDates = useMemo(() => {
    return dateRange.dates.map(date => {
      const dateISO = formatDateForAvailability(date);
      const slots = slotsByDate[dateISO] || [];
      const availableSlots = slots.filter(slot => slot.bookable && !slot.held);
      
      return {
        date,
        dayName: format(date, 'EEE'),
        dayNumber: date.getDate(),
        monthName: format(date, 'MMM'),
        isAvailable: availableSlots.length > 0,
        isSelected: false,
        timeSlotsAvailable: availableSlots.length,
        slots: availableSlots
      };
    }).filter(alt => alt.timeSlotsAvailable > 0); // Only show dates with available slots
  }, [dateRange.dates, slotsByDate]);
  
  return alternativeDates;
};

// Use pricing defaults from shared constants
const BASE_PRIVATE_HOURLY_RATE = PRICING_DEFAULTS.BASE_HOURLY_RATE / 100; // Convert from cents to dollars

// Helper to get correct hourly rate based on date and group size
const getDisplayHourlyRate = (date: Date | undefined, groupSize: number): number => {
  if (!date) return BASE_PRIVATE_HOURLY_RATE;
  const rateInCents = getHourlyRateByDayAndGroupSize(date, groupSize);
  return rateInCents / 100; // Convert from cents to dollars
};

// Optional add-on packages that enhance the base cruise
const addOnPackages = [
  {
    id: 'essentials',
    name: 'Essentials Package',
    hourlyRate: 50, // Additional rate on top of base
    description: 'Enhanced experience with premium amenities',
    features: ['Premium sound system', 'Coolers with ice', 'Party decorations'],
    popular: false
  },
  {
    id: 'ultimate',
    name: 'Ultimate Party Package', 
    hourlyRate: 75, // Additional rate on top of base
    description: 'All-inclusive luxury experience',
    features: ['Premium sound system', 'Coolers with ice', 'Party decorations', 'Red carpet boarding', 'Professional photography'],
    popular: true
  },
];

// Use disco packages from shared constants (keep local features for now)
const discoPackages = [
  { 
    id: 'basic', 
    name: 'Basic Bach Package', 
    price: 85,
    description: 'Essential disco cruise experience',
    features: ['4-hour cruise', 'DJ & dancing', 'Party atmosphere', 'Cash bar']
  },
  { 
    id: 'disco_queen', 
    name: 'Disco Queen Package', 
    price: 95,
    description: 'Enhanced party experience',
    features: ['4-hour cruise', 'Premium DJ', 'Welcome drink', 'Party favors', 'Cash bar']
  },
  { 
    id: 'platinum', 
    name: 'Supabase Platinum Disco Package', 
    price: 105,
    description: 'Ultimate disco cruise luxury',
    features: ['4-hour cruise', 'Premium DJ', '2 Welcome drinks', 'VIP area access', 'Party favors', 'Priority boarding']
  },
];

const GROUP_SIZE_MIN = 8;
const GROUP_SIZE_MAX = 75;
const GROUP_SIZE_DEFAULT = 20;

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -60,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

// Use shared formatCurrency from formatters

// Helper function to determine boat capacity based on group size - shows appropriate capacity
const getBoatCapacityForGroup = (groupSize: number): number => {
  if (groupSize <= 25) return 25;  // 25-person boats for groups up to 25
  if (groupSize <= 30) return 30;  // 30-person boats for groups 26-30
  if (groupSize <= 50) return 50;  // large boats
  return 75;  // extra large boats (up to GROUP_SIZE_MAX)
};

// Helper function to get boat name based on capacity and slot info
const getBoatNameForCapacity = (capacity: number, slotIndex: number = 0): string => {
  if (capacity === 25) {
    // Use actual boat names for 25-person boats
    return slotIndex === 0 ? 'Meeseeks' : 'The Irony';
  } else if (capacity === 30) {
    return '30-Person Boat';
  } else if (capacity === 50) {
    return '50-Person Boat';
  } else {
    return '75-Person Boat';
  }
};

// Generate structured private cruise time slots with proper boat names
const generateStructuredPrivateSlots = (date: Date, groupSize: number): NormalizedSlot[] => {
  const dayOfWeek = date.getDay();
  const dateISO = date.toISOString().split('T')[0];
  const capacity = getBoatCapacityForGroup(groupSize);
  
  const slots: NormalizedSlot[] = [];
  
  if (dayOfWeek === 5) { // Friday
    // Slot 1: Meeseeks 12:00PM-4:00PM
    slots.push({
      id: `private_meeseeks_${dateISO}_12:00_16:00`,
      dateISO,
      startTime: '12:00',
      endTime: '16:00',
      duration: 4,
      label: `${getBoatNameForCapacity(capacity, 0)} • 12:00 PM - 4:00 PM`,
      description: 'Friday afternoon cruise (4 hours)',
      cruiseType: 'private' as const,
      capacity,
      availableCount: 1,
      bookable: true,
      held: false,
      boatCandidates: ['boat_meeseeks'],
      estimatedPricing: {
        baseRate: getDisplayHourlyRate(date, groupSize),
        duration: 4,
        subtotal: getDisplayHourlyRate(date, groupSize) * 4,
        total: Math.round((getDisplayHourlyRate(date, groupSize) * 4) * 1.28) // Add tax and gratuity
      }
    });
    
    // Slot 2: The Irony 4:30PM-8:30PM
    slots.push({
      id: `private_irony_${dateISO}_16:30_20:30`,
      dateISO,
      startTime: '16:30',
      endTime: '20:30',
      duration: 4,
      label: `${getBoatNameForCapacity(capacity, 1)} • 4:30 PM - 8:30 PM`,
      description: 'Friday evening cruise (4 hours)',
      cruiseType: 'private' as const,
      capacity,
      availableCount: 1,
      bookable: true,
      held: false,
      boatCandidates: ['boat_irony'],
      estimatedPricing: {
        baseRate: getDisplayHourlyRate(date, groupSize),
        duration: 4,
        subtotal: getDisplayHourlyRate(date, groupSize) * 4,
        total: Math.round((getDisplayHourlyRate(date, groupSize) * 4) * 1.28)
      }
    });
  } else if (dayOfWeek === 6 || dayOfWeek === 0) { // Saturday/Sunday
    // Slot 1: Meeseeks 11:00AM-3:00PM
    slots.push({
      id: `private_meeseeks_${dateISO}_11:00_15:00`,
      dateISO,
      startTime: '11:00',
      endTime: '15:00',
      duration: 4,
      label: `${getBoatNameForCapacity(capacity, 0)} • 11:00 AM - 3:00 PM`,
      description: 'Weekend afternoon cruise (4 hours)',
      cruiseType: 'private' as const,
      capacity,
      availableCount: 1,
      bookable: true,
      held: false,
      boatCandidates: ['boat_meeseeks'],
      estimatedPricing: {
        baseRate: getDisplayHourlyRate(date, groupSize),
        duration: 4,
        subtotal: getDisplayHourlyRate(date, groupSize) * 4,
        total: Math.round((getDisplayHourlyRate(date, groupSize) * 4) * 1.28)
      }
    });
    
    // Slot 2: The Irony 3:30PM-7:30PM
    slots.push({
      id: `private_irony_${dateISO}_15:30_19:30`,
      dateISO,
      startTime: '15:30',
      endTime: '19:30',
      duration: 4,
      label: `${getBoatNameForCapacity(capacity, 1)} • 3:30 PM - 7:30 PM`,
      description: 'Weekend evening cruise (4 hours)',
      cruiseType: 'private' as const,
      capacity,
      availableCount: 1,
      bookable: true,
      held: false,
      boatCandidates: ['boat_irony'],
      estimatedPricing: {
        baseRate: getDisplayHourlyRate(date, groupSize),
        duration: 4,
        subtotal: getDisplayHourlyRate(date, groupSize) * 4,
        total: Math.round((getDisplayHourlyRate(date, groupSize) * 4) * 1.28)
      }
    });
  } else { // Monday-Thursday (4-hour minimum for simplicity)
    // Show 4-hour options with 4-hour minimum pricing
    slots.push({
      id: `private_meeseeks_${dateISO}_12:00_16:00`,
      dateISO,
      startTime: '12:00',
      endTime: '16:00',
      duration: 4,
      label: `${getBoatNameForCapacity(capacity, 0)} • 12:00 PM - 4:00 PM`,
      description: 'Weekday afternoon cruise (4-hour minimum)',
      cruiseType: 'private' as const,
      capacity,
      availableCount: 1,
      bookable: true,
      held: false,
      boatCandidates: ['boat_meeseeks'],
      estimatedPricing: {
        baseRate: getDisplayHourlyRate(date, groupSize),
        duration: 4, // Always 4-hour minimum
        subtotal: getDisplayHourlyRate(date, groupSize) * 4,
        total: Math.round((getDisplayHourlyRate(date, groupSize) * 4) * 1.28)
      }
    });
    
    slots.push({
      id: `private_irony_${dateISO}_16:30_20:30`,
      dateISO,
      startTime: '16:30',
      endTime: '20:30',
      duration: 4,
      label: `${getBoatNameForCapacity(capacity, 1)} • 4:30 PM - 8:30 PM`,
      description: 'Weekday evening cruise (4-hour minimum)',
      cruiseType: 'private' as const,
      capacity,
      availableCount: 1,
      bookable: true,
      held: false,
      boatCandidates: ['boat_irony'],
      estimatedPricing: {
        baseRate: getDisplayHourlyRate(date, groupSize),
        duration: 4, // Always 4-hour minimum
        subtotal: getDisplayHourlyRate(date, groupSize) * 4,
        total: Math.round((getDisplayHourlyRate(date, groupSize) * 4) * 1.28)
      }
    });
  }
  
  return slots;
};

const getIconComponent = (iconName: string, size: number = 14) => {
  const iconMap: Record<string, any> = {
    'user': User,
    'calendar': CalendarIcon,
    'clock': Clock,
    'users': Users,
    'ship': Ship,
    'music': Music,
    'dollar': DollarSign,
  };
  const IconComponent = iconMap[iconName] || CalendarIcon;
  return <IconComponent className={`h-${Math.floor(size/4)} w-${Math.floor(size/4)}`} />;
};

export default function Chat() {
  const [currentStep, setCurrentStep] = useState<ChatFlowStep>('intro');
  const [completedSelections, setCompletedSelections] = useState<CompletedSelection[]>([]);
  const [privatePricing, setPrivatePricing] = useState<PricingPreview | null>(null);
  const [discoPricing, setDiscoPricing] = useState<PricingPreview | null>(null);
  const [generatedQuoteId, setGeneratedQuoteId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<'deposit' | 'full'>('deposit');
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingError, setPricingError] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [eventTypeCollapsed, setEventTypeCollapsed] = useState(false);
  const [showGroupSize, setShowGroupSize] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [formData, setFormData] = useState<BookingData>({
    eventType: '',
    eventTypeLabel: '',
    eventEmoji: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventDate: undefined,
    groupSize: GROUP_SIZE_DEFAULT,
    specialRequests: '',
    budget: '',
    selectedCruiseType: null,
    selectedSlot: null,
    selectedAddOnPackages: [],
    selectedDiscoPackage: null,
    discoTicketQuantity: 1,
  });
  
  // Fetch boats data for exact boat name display
  const { data: boats = [] } = useQuery<any[]>({
    queryKey: ['/api/boats'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Create boat lookup map for fast boat name retrieval
  const boatMap = useMemo(() => {
    const map = new Map();
    boats.forEach(boat => {
      map.set(boat.id, boat);
    });
    return map;
  }, [boats]);

  // Helper function to get boat name from boat ID
  const getBoatName = useCallback((boatId: string): string => {
    const boat = boatMap.get(boatId);
    return boat ? boat.name : `Boat ${boatId}`;
  }, [boatMap]);

  // Helper function to get boat details from boat candidates
  const getBoatDetails = useCallback((slot: NormalizedSlot) => {
    if (!slot.boatCandidates || slot.boatCandidates.length === 0) {
      return { name: 'TBD Boat', capacity: slot.capacity };
    }
    
    const primaryBoatId = slot.boatCandidates[0];
    const boat = boatMap.get(primaryBoatId);
    
    return {
      name: boat ? boat.name : `Boat ${primaryBoatId}`,
      capacity: boat ? boat.capacity : slot.capacity,
      id: primaryBoatId
    };
  }, [boatMap]);

  // Fetch available slots for the selected date
  const { data: availabilityData, isLoading: availabilityLoading, error: availabilityError } = useAvailabilityForDate(
    formData.eventDate ? formatDateForAvailability(formData.eventDate) : '',
    undefined, // both private and disco
    formData.groupSize,
    {
      enabled: Boolean(formData.eventDate),
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  );
  
  const availableSlots = availabilityData?.slots || [];
  
  // Use structured private slots with proper boat names for chat flow
  const structuredPrivateSlots = formData.eventDate ? 
    generateStructuredPrivateSlots(formData.eventDate, formData.groupSize) : [];
  
  // Use structured slots for chat flow, fallback to API data for other components
  const privateSlots = structuredPrivateSlots.length > 0 ? structuredPrivateSlots :
    availableSlots.filter(slot => slot.cruiseType === 'private');
  const discoSlots = availableSlots.filter(slot => slot.cruiseType === 'disco');
  
  // Get alternative dates with real availability data
  const alternativeDates = useAlternativeDates(formData.eventDate, formData.groupSize);

  const [leadId, setLeadId] = useState<string | null>(null);
  const [leadCreated, setLeadCreated] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [leadTrackingEnabled, setLeadTrackingEnabled] = useState(true);
  const [availabilityCache, setAvailabilityCache] = useState<Map<string, any>>(new Map());
  
  // Partial lead capture system
  const [chatSessionId] = useState<string>(() => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [partialLeadSaved, setPartialLeadSaved] = useState(false);
  const partialLeadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const formDataRef = useRef(formData);
  const currentStepRef = useRef(currentStep);
  const completedSelectionsRef = useRef(completedSelections);
  
  // Update refs when state changes
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);
  
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);
  
  useEffect(() => {
    completedSelectionsRef.current = completedSelections;
  }, [completedSelections]);
  
  const { toast } = useToast();

  // Slot hold management for atomic checkout
  const slotHold = useSlotHold({
    onHoldCreated: (hold) => {
      console.log('🔒 Slot hold created:', hold.id);
      toast({
        title: "Time Slot Reserved",
        description: `Your selection is held for ${Math.floor((new Date(hold.expiresAt).getTime() - Date.now()) / (1000 * 60))} minutes`,
        variant: "default",
      });
    },
    onHoldExpired: () => {
      console.log('⏰ Slot hold expired');
      toast({
        title: "Time Reservation Expired",
        description: "Please select a new time slot to continue with booking.",
        variant: "destructive",
      });
    },
    autoRelease: true
  });

  // Debounced function to save partial lead data in real-time - FIXED: removed formData dependency
  const debouncedSavePartialLead = useCallback(
    (contactData: { firstName?: string; lastName?: string; email?: string; phone?: string }) => {
      // Clear existing timeout
      if (partialLeadTimeoutRef.current) {
        clearTimeout(partialLeadTimeoutRef.current);
      }

      // Set new timeout for debounced save
      partialLeadTimeoutRef.current = setTimeout(async () => {
        // Only save if we have some contact information
        const hasContactInfo = contactData.firstName?.trim() || 
                              contactData.lastName?.trim() || 
                              contactData.email?.trim() || 
                              contactData.phone?.trim();

        if (hasContactInfo) {
          try {
            // Use refs to get current state without adding to dependencies
            const currentFormData = formDataRef.current;
            const currentStep = currentStepRef.current;
            const currentCompletedSelections = completedSelectionsRef.current;
            
            await apiRequest('POST', '/api/partial-leads/save', {
              sessionId: chatSessionId,
              name: [contactData.firstName?.trim(), contactData.lastName?.trim()]
                .filter(Boolean).join(' ') || undefined,
              email: contactData.email?.trim() || undefined,
              phone: contactData.phone?.trim() || undefined,
              eventType: currentFormData.eventType || undefined,
              eventTypeLabel: currentFormData.eventTypeLabel || undefined,
              groupSize: currentFormData.groupSize || undefined,
              preferredDate: currentFormData.eventDate?.toISOString() || undefined,
              chatbotData: {
                currentStep,
                completedSelections: currentCompletedSelections,
                selectedCruiseType: currentFormData.selectedCruiseType,
                selectedSlot: currentFormData.selectedSlot,
                selectedDiscoPackage: currentFormData.selectedDiscoPackage,
                selectedAddOnPackages: currentFormData.selectedAddOnPackages,
                budget: currentFormData.budget,
                specialRequests: currentFormData.specialRequests,
              },
            });
            
            if (!partialLeadSaved) {
              setPartialLeadSaved(true);
              console.log('Partial lead saved for session:', chatSessionId);
            }
          } catch (error) {
            console.error('Failed to save partial lead:', error);
            // Don't show error toast as this is a background operation
          }
        }
      }, 2000); // 2 second debounce
    },
    [chatSessionId, partialLeadSaved] // FIXED: Only stable dependencies
  );

  // Enhanced form data setter that triggers partial lead save - FIXED: removed formData dependency
  const updateFormDataWithAutoSave = useCallback(
    (updates: Partial<BookingData>) => {
      setFormData(prevFormData => {
        const newFormData = { ...prevFormData, ...updates };
        
        // Trigger partial lead save for contact fields
        if ('firstName' in updates || 'lastName' in updates || 'email' in updates || 'phone' in updates) {
          // Use setTimeout to avoid calling during render
          setTimeout(() => {
            debouncedSavePartialLead({
              firstName: newFormData.firstName,
              lastName: newFormData.lastName,
              email: newFormData.email,
              phone: newFormData.phone,
            });
          }, 0);
        }
        
        return newFormData;
      });
    },
    [debouncedSavePartialLead] // FIXED: Only debouncedSavePartialLead dependency
  );

  // Cleanup function to mark lead as abandoned when user leaves
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (partialLeadSaved && chatSessionId) {
        // Use sendBeacon for reliable abandonment tracking
        navigator.sendBeacon(
          `${window.location.origin}/api/partial-leads/${chatSessionId}/abandon`,
          JSON.stringify({})
        );
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && partialLeadSaved && chatSessionId) {
        // User switched tabs or minimized - potential abandonment
        setTimeout(() => {
          if (document.visibilityState === 'hidden') {
            navigator.sendBeacon(
              `${window.location.origin}/api/partial-leads/${chatSessionId}/abandon`,
              JSON.stringify({})
            );
          }
        }, 30000); // Mark as abandoned after 30 seconds of inactivity
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Clear timeout on unmount
      if (partialLeadTimeoutRef.current) {
        clearTimeout(partialLeadTimeoutRef.current);
      }
    };
  }, [partialLeadSaved, chatSessionId]);

  // Navigation functions for the new 2-step flow
  const goToStep = (step: ChatFlowStep) => {
    setCurrentStep(step);
    if (step === 'intro') {
      setEventTypeCollapsed(false);
      setShowGroupSize(false);
      setShowComparison(false);
    }
  };
  
  const proceedToComparison = (selectedDate?: Date) => {
    const eventDate = selectedDate || formData.eventDate;
    if (eventDate) {
      setCurrentStep('comparison-selection');
      setEventTypeCollapsed(false);
      setShowGroupSize(false);
      setShowComparison(false);
      
      addCompletedSelection({
        id: 'date',
        label: 'Date',
        value: format(eventDate, 'MMM dd, yyyy'),
        icon: 'calendar',
        editable: true,
        onEdit: () => {
          setFormData(prev => ({ ...prev, eventDate: undefined }));
          goToStep('intro');
          setCompletedSelections(prev => prev.filter(s => s.id !== 'date'));
        }
      });
    }
  };
  
  const handleNavigateBack = () => {
    if (currentStep === 'comparison-selection' && !eventTypeCollapsed) {
      goToStep('intro');
    } else if (currentStep === 'comparison-selection' && eventTypeCollapsed && !showGroupSize) {
      setEventTypeCollapsed(false);
    } else if (currentStep === 'comparison-selection' && showGroupSize && !showComparison) {
      setShowGroupSize(false);
    } else if (currentStep === 'contact-form') {
      goToStep('comparison-selection');
    } else if (currentStep === 'confirmation') {
      goToStep('contact-form');
    }
  };

  // Add completed selection helper
  const addCompletedSelection = (selection: CompletedSelection) => {
    setCompletedSelections(prev => {
      const existing = prev.findIndex(s => s.id === selection.id);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing] = selection;
        return updated;
      }
      return [...prev, selection];
    });
  };

  // Refs to prevent infinite loops in auto-selection
  const autoSelectionRef = useRef({
    lastEventType: '',
    lastGroupSize: 0,
    lastEventDate: null as Date | null,
    hasAutoSelected: false
  });

  // Auto-select default options when group size is selected on comparison page
  useEffect(() => {
    // Guard against unnecessary re-runs
    if (currentStep !== 'comparison-selection' || 
        !formData.groupSize || 
        !formData.eventType || 
        !formData.eventDate) {
      return;
    }

    // Check if we've already auto-selected for this combination
    const current = autoSelectionRef.current;
    const hasChanged = (
      current.lastEventType !== formData.eventType ||
      current.lastGroupSize !== formData.groupSize ||
      current.lastEventDate?.getTime() !== formData.eventDate.getTime()
    );

    if (!hasChanged && current.hasAutoSelected) {
      return; // Skip if already processed this combination
    }

    // Update tracking
    current.lastEventType = formData.eventType;
    current.lastGroupSize = formData.groupSize;
    current.lastEventDate = formData.eventDate;
    current.hasAutoSelected = true;

    // Batch all auto-selections together to prevent multiple renders
    const updates: Partial<BookingData> = {};
    
    // Auto-select private cruise defaults if not already selected
    if (!formData.selectedSlot) {
      const defaultSlot = privateSlots.find(slot => slot.label.includes('12pm') || slot.label.includes('1pm')) || privateSlots[0];
      
      if (defaultSlot) {
        updates.selectedCruiseType = 'private';
        updates.selectedSlot = defaultSlot;
        updates.selectedAddOnPackages = [];
      }
    }
    
    // For bachelor/bachelorette parties, ensure disco options are available but don't auto-select
    // Let users choose between disco and private options in the comparison view
    if ((formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') &&
        discoSlots.length > 0) {
      // Reset any previous disco selections to force user choice in comparison view
      updates.selectedDiscoPackage = null;
      // Don't auto-select cruise type - let user choose between disco and private
      if (formData.selectedCruiseType === 'disco') {
        updates.selectedCruiseType = null;
        updates.selectedSlot = null;
      }
      updates.discoTicketQuantity = Math.min(formData.groupSize, 10); // Set reasonable default quantity
    }
    
    // For all other event types with disco available, use minimum quantity
    else if (discoSlots.length > 0 && !formData.selectedDiscoPackage) {
      const defaultDiscoSlot = discoSlots[0];
      const defaultDiscoPackage = discoPackages[0];
      
      if (defaultDiscoSlot && defaultDiscoPackage) {
        updates.selectedDiscoPackage = defaultDiscoPackage.id as DiscoPackage;
        updates.discoTicketQuantity = Math.min(formData.groupSize, 10);
      }
    }

    // Apply all updates in a single setState call
    if (Object.keys(updates).length > 0) {
      setFormData(prev => ({ ...prev, ...updates }));
    }
  }, [currentStep, formData.groupSize, formData.eventType, formData.eventDate?.getTime(), formData.selectedSlot, formData.selectedDiscoPackage, privateSlots, discoSlots]);

  // Debounced pricing fetch refs to prevent excessive API calls
  const pricingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastPricingParamsRef = useRef<string>('');

  // Fetch private cruise pricing with debouncing and duplicate prevention
  useEffect(() => {
    // Clear any existing timeout
    if (pricingTimeoutRef.current) {
      clearTimeout(pricingTimeoutRef.current);
    }

    // Guard: Skip if missing required data
    if (!formData.selectedSlot || !formData.groupSize) {
      setPrivatePricing(null);
      return;
    }

    // Create a unique key for current pricing parameters
    const pricingKey = JSON.stringify({
      slotId: formData.selectedSlot.id,
      addOns: formData.selectedAddOnPackages.sort(),
      groupSize: formData.groupSize,
      eventDate: formData.eventDate?.toISOString(),
    });

    // Skip if we already fetched pricing for these exact parameters
    if (pricingKey === lastPricingParamsRef.current) {
      return;
    }

    // Debounce pricing calculation to avoid rapid API calls
    pricingTimeoutRef.current = setTimeout(() => {
      lastPricingParamsRef.current = pricingKey;
      
      if (formData.eventDate) {
        console.log('🚢 Debounced fetchPrivatePricing triggered');
        fetchPrivatePricing();
      } else {
        console.log('🚢 Fallback calculatePrivatePricing triggered');
        calculatePrivatePricing();
      }
    }, 300); // 300ms debounce
  }, [formData.selectedSlot?.id, formData.selectedAddOnPackages, formData.groupSize, formData.eventDate?.getTime()]);
  
  // Fetch disco pricing with debouncing and duplicate prevention
  useEffect(() => {
    // Guard: Skip if missing required data
    if (!formData.selectedDiscoPackage || formData.discoTicketQuantity <= 0) {
      setDiscoPricing(null);
      return;
    }

    // Create a unique key for current disco pricing parameters
    const discoPricingKey = JSON.stringify({
      package: formData.selectedDiscoPackage,
      quantity: formData.discoTicketQuantity,
      eventDate: formData.eventDate?.toISOString(),
    });

    // Skip if we already calculated pricing for these exact parameters
    const lastDiscoKey = `disco_${discoPricingKey}`;
    if (lastDiscoKey === lastPricingParamsRef.current) {
      return;
    }

    // Debounce disco pricing calculation
    if (pricingTimeoutRef.current) {
      clearTimeout(pricingTimeoutRef.current);
    }

    pricingTimeoutRef.current = setTimeout(() => {
      lastPricingParamsRef.current = lastDiscoKey;
      
      if (formData.eventDate) {
        console.log('🎵 Debounced fetchDiscoPricing triggered');
        fetchDiscoPricing();
      } else {
        console.log('🎵 Fallback calculateDiscoPricing triggered');
        calculateDiscoPricing();
      }
    }, 300); // 300ms debounce
  }, [formData.selectedDiscoPackage, formData.discoTicketQuantity, formData.eventDate?.getTime()]);

  // Fetch private cruise pricing with loading state
  const fetchPrivatePricing = async () => {
    if (!formData.selectedSlot) return;
    
    console.log('🚢 fetchPrivatePricing called with:', {
      selectedSlot: formData.selectedSlot,
      groupSize: formData.groupSize,
      eventDate: formData.eventDate,
      eventType: formData.eventType,
      selectedAddOnPackages: formData.selectedAddOnPackages
    });
    
    setPricingLoading(true);
    setPricingError(null);
    try {
      // Calculate total hourly rate (base + add-ons)
      const totalHourlyRate = BASE_PRIVATE_HOURLY_RATE + 
        formData.selectedAddOnPackages.reduce((sum, addOnId) => {
          const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
          return sum + (addOn?.hourlyRate || 0);
        }, 0);
      
      const pricingPayload = {
        groupSize: formData.groupSize,
        eventDate: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : '',
        timeSlot: formData.selectedSlot.id,
        eventType: formData.eventType,
        cruiseType: 'private',
        packageType: formData.selectedAddOnPackages.join(','), // Send selected add-ons
        hourlyRate: totalHourlyRate,
      };
      
      console.log('🚢 Making API call to /api/pricing/cruise with:', pricingPayload);
      
      const res = await apiRequest('POST', '/api/pricing/cruise', pricingPayload);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.log('🚢 API call failed:', res.status, errorText);
        calculatePrivatePricing();
        return;
      }
      
      const response = await res.json();
      console.log('🚢 API call successful, setting privatePricing:', response);
      setPrivatePricing(response);
    } catch (error: any) {
      console.log('🚢 Exception in fetchPrivatePricing:', error);
      calculatePrivatePricing();
    } finally {
      setPricingLoading(false);
    }
  };
  
  // Helper function to get cruise duration based on date
  const getCruiseDuration = (date: Date | undefined) => {
    if (!date) return 4; // Default to 4 hours
    const dayOfWeek = date.getDay();
    return (dayOfWeek >= 1 && dayOfWeek <= 4) ? 3 : 4; // 3 hours Mon-Thu, 4 hours Fri-Sun
  };

  // Fallback private cruise pricing calculation
  const calculatePrivatePricing = () => {
    console.log('🚢 calculatePrivatePricing called as fallback');
    if (!formData.selectedSlot) {
      console.log('🚢 calculatePrivatePricing early return - no slot selected');
      return;
    }
    
    // Calculate total hourly rate (base + add-ons)
    const totalHourlyRate = BASE_PRIVATE_HOURLY_RATE + 
      formData.selectedAddOnPackages.reduce((sum, addOnId) => {
        const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
        return sum + (addOn?.hourlyRate || 0);
      }, 0);
    
    const cruiseDuration = getCruiseDuration(formData.eventDate);
    const baseCost = totalHourlyRate * cruiseDuration;
    const crewFee = formData.groupSize > 20 ? 200 : 0;
    const subtotal = baseCost + crewFee;
    const tax = Math.round(subtotal * 0.0825);
    const gratuity = Math.round(subtotal * 0.20);
    const total = subtotal + tax + gratuity;
    
    // Calculate deposit based on event date (30-day rule)
    const today = new Date();
    const eventDate = formData.eventDate || new Date();
    const daysUntilEvent = differenceInDays(eventDate, today);
    const depositPercent = daysUntilEvent >= 30 ? 25 : 100;
    const depositAmount = Math.round(total * (depositPercent / 100));
    
    // Get selected add-on names for display
    const selectedAddOnNames = formData.selectedAddOnPackages
      .map(addOnId => addOnPackages.find(pkg => pkg.id === addOnId)?.name)
      .filter(Boolean)
      .join(', ') || 'Standard Private Cruise';
    
    const privatePricingData = {
      subtotal: subtotal * 100,
      tax: tax * 100,
      total: total * 100,
      perPersonCost: Math.round((total / formData.groupSize) * 100),
      discountTotal: 0,
      gratuity: gratuity * 100,
      depositRequired: true,
      depositPercent,
      depositAmount: depositAmount * 100,
      paymentSchedule: [],
      appliedDiscounts: [],
      breakdown: {
        boatType: selectedAddOnNames,
        dayName: formData.eventDate ? format(formData.eventDate, 'EEEE') : '',
        baseHourlyRate: totalHourlyRate,
        cruiseDuration,
        baseCruiseCost: baseCost,
        crewFee,
        subtotalBeforeTax: subtotal,
        gratuityAmount: gratuity,
        taxAmount: tax,
        grandTotal: total,
        perPerson: Math.round(total / formData.groupSize),
        deposit: depositAmount,
        balanceDue: total - depositAmount,
      }
    };
    
    console.log('🚢 Setting privatePricing:', privatePricingData);
    setPrivatePricing(privatePricingData);
  };
  
  // Fetch disco cruise pricing
  const fetchDiscoPricing = async () => {
    console.log('🎵 fetchDiscoPricing called with:', {
      selectedDiscoPackage: formData.selectedDiscoPackage,
      discoTicketQuantity: formData.discoTicketQuantity,
      eventDate: formData.eventDate
    });
    
    setPricingLoading(true);
    setPricingError(null);
    try {
      const discoPayload = {
        items: [{
          productId: `disco_${formData.selectedDiscoPackage}`,
          qty: formData.discoTicketQuantity,
          unitPrice: getDiscoPriceByPackage(formData.selectedDiscoPackage),
        }],
        groupSize: formData.discoTicketQuantity,
        projectDate: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : '',
      };
      
      console.log('🎵 Making API call to /api/pricing/preview with:', discoPayload);
      
      const res = await apiRequest('POST', '/api/pricing/preview', discoPayload);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.log('🎵 API call failed:', res.status, errorText);
        calculateDiscoPricing();
        return;
      }
      
      const response = await res.json();
      console.log('🎵 API call successful, setting discoPricing:', response);
      setDiscoPricing(response);
    } catch (error: any) {
      console.log('🎵 Exception in fetchDiscoPricing:', error);
      calculateDiscoPricing();
    } finally {
      setPricingLoading(false);
    }
  };
  
  const getDiscoPriceByPackage = (packageId: string | null): number => {
    const packagePrices = {
      'basic': 8500,
      'disco_queen': 9500,
      'platinum': 10500,
    };
    return packagePrices[packageId as keyof typeof packagePrices] || 8500;
  };
  
  const calculateDiscoPricing = () => {
    console.log('🎵 calculateDiscoPricing called as fallback');
    if (!formData.selectedDiscoPackage) {
      console.log('🎵 calculateDiscoPricing early return - no disco package');
      return;
    }
    
    const selectedPackage = discoPackages.find(pkg => pkg.id === formData.selectedDiscoPackage);
    if (!selectedPackage) return;
    
    const cruiseDuration = getCruiseDuration(formData.eventDate);
    const subtotal = selectedPackage.price * formData.discoTicketQuantity;
    const gratuity = Math.round(subtotal * 0.20);
    const tax = Math.round(subtotal * 0.0825);
    const total = subtotal + gratuity + tax;
    
    // Calculate deposit based on event date (30-day rule)
    const today = new Date();
    const eventDate = formData.eventDate || new Date();
    const daysUntilEvent = differenceInDays(eventDate, today);
    const depositPercent = daysUntilEvent >= 30 ? 25 : 100;
    const depositAmount = Math.round(total * (depositPercent / 100));
    
    setDiscoPricing({
      subtotal: subtotal * 100,
      tax: tax * 100,
      total: total * 100,
      perPersonCost: selectedPackage.price * 100,
      discountTotal: 0,
      gratuity: gratuity * 100,
      depositRequired: true,
      depositPercent,
      depositAmount: depositAmount * 100,
      paymentSchedule: [],
      appliedDiscounts: [],
      breakdown: {
        boatType: selectedPackage.name,
        dayName: formData.eventDate ? format(formData.eventDate, 'EEEE') : '',
        baseHourlyRate: Math.round(selectedPackage.price / cruiseDuration),
        cruiseDuration,
        baseCruiseCost: selectedPackage.price * formData.discoTicketQuantity,
        crewFee: 0,
        subtotalBeforeTax: subtotal,
        gratuityAmount: gratuity,
        taxAmount: tax,
        grandTotal: total,
        perPerson: selectedPackage.price,
        deposit: depositAmount,
        balanceDue: total - depositAmount,
      }
    });
  };

  // Event Type Selection Handler for comparison page - optimized to prevent race conditions
  const handleEventTypeSelect = useCallback((eventId: string, eventLabel: string, eventEmoji: string) => {
    // Reset auto-selection tracking when event type changes
    autoSelectionRef.current.hasAutoSelected = false;
    
    // Batch all state updates together to prevent race conditions
    const formDataUpdates = {
      eventType: eventId,
      eventTypeLabel: eventLabel,
      eventEmoji: eventEmoji,
      selectedCruiseType: null as CruiseType | null,
      selectedSlot: null,
      selectedAddOnPackages: [],
      selectedDiscoPackage: null as DiscoPackage | null,
      discoTicketQuantity: 1,
    };
    
    const selectionToAdd = {
      id: 'event-type',
      label: 'Event',
      value: eventLabel,
      emoji: eventEmoji,
      editable: true,
      onEdit: () => {
        autoSelectionRef.current.hasAutoSelected = false;
        setFormData(prev => ({
          ...prev,
          eventType: '',
          eventTypeLabel: '',
          eventEmoji: '',
          groupSize: GROUP_SIZE_DEFAULT,
          selectedCruiseType: null,
          selectedSlot: null,
          selectedAddOnPackages: [],
          selectedDiscoPackage: null,
          discoTicketQuantity: 1,
        }));
        setEventTypeCollapsed(false);
        setShowGroupSize(false);
        setShowComparison(false);
        setCompletedSelections(prev => prev.filter(s => s.id !== 'event-type' && s.id !== 'group-size'));
      }
    };
    
    // Apply all updates in one batch to prevent race conditions
    setFormData(prev => ({ ...prev, ...formDataUpdates }));
    addCompletedSelection(selectionToAdd);
    setEventTypeCollapsed(true);
    setShowGroupSize(true);
    setShowComparison(false);
  }, []);

  // Date Selection Handler for intro page
  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      setFormData(prev => ({ 
        ...prev, 
        eventDate: date
        // Preserve all other form data - don't reset user selections
      }));
      
      proceedToComparison(date);
    }
  };

  // Group Size Handler for comparison page - debounced to prevent rapid state changes
  const handleGroupSizeChange = useCallback((value: number[]) => {
    const newSize = value[0];
    
    // Validate group size range
    if (newSize < GROUP_SIZE_MIN || newSize > GROUP_SIZE_MAX) {
      return;
    }
    
    // Reset auto-selection tracking when group size changes
    autoSelectionRef.current.hasAutoSelected = false;
    
    // Batch updates to prevent race conditions
    setFormData(prev => ({ 
      ...prev, 
      groupSize: newSize,
      selectedCruiseType: null,
      selectedSlot: null,
      selectedAddOnPackages: [],
      selectedDiscoPackage: null,
      discoTicketQuantity: Math.min(newSize, 10),
    }));
  }, []);
  
  // Confirm group size and show comparison - with enhanced validation
  const handleGroupSizeConfirm = useCallback(() => {
    // Comprehensive validation
    if (formData.groupSize < GROUP_SIZE_MIN || formData.groupSize > GROUP_SIZE_MAX) {
      toast({
        title: "Invalid Group Size",
        description: `Group size must be between ${GROUP_SIZE_MIN} and ${GROUP_SIZE_MAX} people.`,
        variant: "destructive",
      });
      return;
    }
    
    const defaultDiscoPackage = discoPackages[0];
    
    // Batch all state updates together
    const selectionToAdd = {
      id: 'group-size',
      label: 'Group Size',
      value: `${formData.groupSize} people`,
      icon: 'users',
      editable: true,
      onEdit: () => {
        autoSelectionRef.current.hasAutoSelected = false;
        setFormData(prev => ({
          ...prev,
          groupSize: GROUP_SIZE_DEFAULT,
          selectedCruiseType: null,
          selectedSlot: null,
          selectedAddOnPackages: [],
          selectedDiscoPackage: null,
          discoTicketQuantity: 1,
        }));
        setShowGroupSize(false);
        setShowComparison(false);
        setCompletedSelections(prev => prev.filter(s => s.id !== 'group-size'));
      }
    };
    
    const formDataUpdates = {
      selectedAddOnPackages: [], // Start with no add-ons selected
      selectedDiscoPackage: defaultDiscoPackage.id as DiscoPackage,
      discoTicketQuantity: Math.min(formData.groupSize, 10),
    };
    
    // Apply all updates in one batch
    addCompletedSelection(selectionToAdd);
    setShowComparison(true);
    setFormData(prev => ({ ...prev, ...formDataUpdates }));
  }, [formData.groupSize, toast]);

  // Private cruise selection handlers with loading state protection
  const handlePrivateCruiseSelect = useCallback((slot: NormalizedSlot) => {
    // Prevent interactions during loading states
    if (pricingLoading || paymentProcessing || formSubmitting) {
      console.log('🚢 Ignoring selection - system is busy');
      return;
    }
    
    const boatDetails = getBoatDetails(slot);
    
    console.log("⛵ BOAT SLOT SELECTED", {
      step: "slot_selection",
      sessionId: chatSessionId,
      boatId: boatDetails.id,
      boatName: boatDetails.name,
      capacity: boatDetails.capacity,
      exactDate: slot.dateISO,
      exactStartTime: slot.startTime,
      exactEndTime: slot.endTime,
      duration: slot.duration,
      price: slot.price,
      groupSize: formData.groupSize,
      eventType: formData.eventType,
      bookable: slot.bookable,
      held: slot.held,
      timestamp: new Date().toISOString()
    });
    
    setFormData(prev => {
      const newData = {
        ...prev,
        selectedCruiseType: 'private' as CruiseType,
        selectedSlot: slot,
        selectedBoat: boatDetails.id,
        preferredTimeLabel: `${slot.label} on ${format(formData.eventDate!, 'EEEE, MMMM d, yyyy')}`,
      };
      
      console.log('🚢 FORM DATA UPDATED WITH EXACT SELECTION', {
        step: "form_data_update",
        sessionId: chatSessionId,
        selectedBoat: boatDetails.name,
        selectedTime: `${slot.startTime}-${slot.endTime}`,
        selectedDate: slot.dateISO,
        cruiseType: 'private',
        timestamp: new Date().toISOString()
      });
      
      return newData;
    });
  }, [pricingLoading, paymentProcessing, formSubmitting, getBoatDetails, chatSessionId, formData.groupSize, formData.eventType, formData.eventDate]);
  
  const handleAddOnPackageToggle = useCallback((packageId: string) => {
    // Prevent interactions during loading states
    if (pricingLoading || paymentProcessing || formSubmitting) {
      return;
    }
    
    setFormData(prev => {
      const currentAddOns = prev.selectedAddOnPackages;
      const isSelected = currentAddOns.includes(packageId);
      
      return {
        ...prev,
        selectedAddOnPackages: isSelected
          ? currentAddOns.filter(id => id !== packageId)
          : [...currentAddOns, packageId]
      };
    });
  }, [pricingLoading, paymentProcessing, formSubmitting]);
  
  // Disco cruise selection handler with loading state protection
  const handleDiscoCruiseSelect = useCallback((slot: NormalizedSlot, packageId: string) => {
    // Prevent interactions during loading states
    if (pricingLoading || paymentProcessing || formSubmitting) {
      console.log('🎵 Ignoring selection - system is busy');
      return;
    }
    
    console.log('🎵 handleDiscoCruiseSelect called with slot:', slot, 'package:', packageId);
    setFormData(prev => ({
      ...prev, 
      selectedCruiseType: 'disco' as CruiseType,
      selectedSlot: slot,
      selectedDiscoPackage: packageId as DiscoPackage,
    }));
  }, [pricingLoading, paymentProcessing, formSubmitting]);

  // Comprehensive validation function
  const validateBookingData = useCallback((data: BookingData, cruiseType: 'private' | 'disco', requireContactInfo: boolean = false) => {
    const errors: string[] = [];
    
    // Basic required fields
    if (!data.eventType) errors.push('Please select an event type');
    if (!data.eventDate) errors.push('Please select an event date');
    if (data.groupSize < GROUP_SIZE_MIN || data.groupSize > GROUP_SIZE_MAX) {
      errors.push(`Group size must be between ${GROUP_SIZE_MIN} and ${GROUP_SIZE_MAX} people`);
    }
    
    // Contact information validation (required for payment)
    if (requireContactInfo) {
      if (!data.firstName?.trim()) errors.push('Please enter your first name');
      if (!data.lastName?.trim()) errors.push('Please enter your last name');
      if (!data.email?.trim()) errors.push('Please enter your email address');
      
      // Email format validation
      if (data.email?.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email.trim())) {
          errors.push('Please enter a valid email address');
        }
      }
    }
    
    // Date validation
    if (data.eventDate) {
      const today = startOfDay(new Date());
      if (isBefore(data.eventDate, today)) {
        errors.push('Event date cannot be in the past');
      }
      const maxDate = addDays(today, 365);
      if (isAfter(data.eventDate, maxDate)) {
        errors.push('Event date cannot be more than 1 year in advance');
      }
    }
    
    // Cruise type specific validation - FIXED: More flexible slot validation
    if (cruiseType === 'private') {
      if (!data.selectedSlot) errors.push('Please select a time slot for private cruise');
      // Allow private bookings on any slot type (disco slots can be booked privately)
    }
    
    if (cruiseType === 'disco') {
      if (!data.selectedDiscoPackage) errors.push('Please select a disco package');
      if (!data.selectedSlot) errors.push('Please select a disco time slot');
      if (data.discoTicketQuantity <= 0) errors.push('Disco ticket quantity must be at least 1');
      // Allow disco bookings - validation is now more flexible
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }, []);

  // Enhanced payment handler with streamlined validation - NO NAME REQUIRED
  const handlePayment = useCallback(async (paymentType: 'deposit' | 'full', cruiseType: 'private' | 'disco') => {
    console.log('💳 handlePayment called with:', { paymentType, cruiseType });
    
    // Prevent double submissions and interactions during loading
    if (pricingLoading || paymentProcessing || formSubmitting) {
      toast({
        title: "Please Wait",
        description: "Processing in progress. Please wait.",
        variant: "default",
      });
      return;
    }
    
    // Streamlined validation - ONLY check essential booking details, NOT contact info
    const validation = validateBookingData(formData, cruiseType, false); // false = no contact info required!
    if (!validation.isValid) {
      console.log('💳 Basic validation failed:', validation.errors);
      toast({
        title: "Please Complete Selection",
        description: validation.errors[0], // Show first error
        variant: "destructive",
      });
      return;
    }
    
    // Verify pricing is available
    const relevantPricing = cruiseType === 'private' ? privatePricing : discoPricing;
    if (!relevantPricing) {
      console.log('💳 Validation failed: missing pricing data');
      toast({
        title: "Pricing Unavailable",
        description: "Please wait for pricing to load before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate pricing amount is reasonable
    if (relevantPricing.total <= 0) {
      console.log('💳 Validation failed: invalid pricing amount');
      toast({
        title: "Pricing Error",
        description: "Invalid pricing detected. Please refresh and try again.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setPaymentProcessing(true); // Set payment loading state
      setPricingError(null); // Clear any previous errors

      // CRITICAL: Create slot hold before payment to prevent double-booking
      if (!formData.selectedSlot) {
        throw new Error('No time slot selected');
      }

      console.log('🔒 Creating slot hold before payment...');
      
      // Create hold parameters from selected slot - FIXED: Use actual slot cruise type
      const holdParams: CreateSlotHoldParams = {
        slotId: formData.selectedSlot.id,
        boatId: formData.selectedSlot.boatCandidates?.[0] || '',
        cruiseType: formData.selectedSlot.cruiseType || cruiseType, // Use slot's actual cruise type
        dateISO: formData.eventDate ? formatDateForAvailability(formData.eventDate) : '',
        startTime: formData.selectedSlot.startTime,
        endTime: formData.selectedSlot.endTime,
        groupSize: formData.groupSize,
        ttlMinutes: 15 // 15 minute hold for checkout
      };

      // Create the slot hold and wait for completion
      slotHold.createHold(holdParams);
      
      // Wait for hold creation to complete by polling the state
      let holdCreationAttempts = 0;
      const maxAttempts = 20; // 10 seconds max wait
      
      while (holdCreationAttempts < maxAttempts) {
        if (slotHold.createHoldError) {
          throw new Error('Failed to create slot hold: ' + slotHold.createHoldError.message);
        }
        
        if (slotHold.currentHold?.id) {
          console.log('🔒 Successfully created hold for payment:', slotHold.currentHold.id);
          break;
        }
        
        // Wait 500ms before checking again
        await new Promise(resolve => setTimeout(resolve, 500));
        holdCreationAttempts++;
      }
      
      if (!slotHold.currentHold?.id) {
        throw new Error('Timeout: Failed to create slot hold within 10 seconds');
      }

      const holdId = slotHold.currentHold.id;

      // Create selection payload with all form data
      const selectionPayload = {
        cruiseType,
        groupSize: formData.groupSize,
        eventDate: formData.eventDate ? formData.eventDate.toISOString() : null,
        eventType: formData.eventType,
        eventTypeLabel: formData.eventTypeLabel,
        eventEmoji: formData.eventEmoji,
        // Send both formats for backward compatibility
        selectedSlot: formData.selectedSlot,
        selectedTimeSlot: formData.selectedSlot ? formData.selectedSlot.label : '',
        selectedAddOnPackages: formData.selectedAddOnPackages,
        // For disco cruises  
        selectedDiscoPackage: formData.selectedDiscoPackage,
        discoTicketQuantity: formData.discoTicketQuantity,
      };

      console.log('💳 Making API call to /api/checkout/create-session with payload:', {
        paymentType,
        selectionPayload,
        holdId // Include holdId for atomic checkout
      });

      const response = await apiRequest("POST", "/api/checkout/create-session", {
        paymentType,
        customerEmail: formData.email.trim(), // Pass actual customer email
        selectionPayload,
        holdId, // CRITICAL: Include holdId for server validation
      });

      console.log('💳 API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('💳 API error response:', errorText);
        throw new Error('Failed to create checkout session: ' + errorText);
      }

      const data = await response.json();
      console.log('💳 API response data:', data);
      
      if (data.url) {
        console.log('💳 Redirecting to:', data.url);
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      console.error('💳 Payment error details:', {
        message: error.message,
        stack: error.stack,
        cause: error.cause,
        name: error.name,
        fullError: error
      });
      
      // Provide more specific error message to user
      let userMessage = "Failed to start payment process. Please try again.";
      if (error.message) {
        if (error.message.includes('holdId') || error.message.includes('HOLD_')) {
          userMessage = "Your booking session has expired. Please select your time slot again.";
        } else if (error.message.includes('pricing') || error.message.includes('amount')) {
          userMessage = "There was an issue with pricing calculation. Please refresh and try again.";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          userMessage = "Network connection issue. Please check your connection and try again.";
        }
      }
      
      toast({
        title: "Payment Error",
        description: userMessage,
        variant: "destructive",
      });
    } finally {
      setPaymentProcessing(false); // Reset payment loading state
    }
  }, [formData, privatePricing, discoPricing, pricingLoading, validateBookingData, toast]);

  // Contact form submission with loading protection
  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent submission during loading states
    if (formSubmitting || pricingLoading || paymentProcessing) {
      toast({
        title: "Please Wait",
        description: "Processing in progress. Please wait.",
        variant: "default",
      });
      return;
    }
    
    // Validate required contact fields
    if (!formData.firstName?.trim() || !formData.lastName?.trim() || !formData.email?.trim()) {
      toast({
        title: "Required Information Missing",
        description: "Please fill in your first name, last name, and email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // COMPREHENSIVE LOGGING FOR CONTACT SUBMISSION
    const selectedBoatDetails = formData.selectedSlot ? getBoatDetails(formData.selectedSlot) : null;
    
    console.log("🚀 BOOKING PROCESS STARTED", {
      step: "contact_submission",
      sessionId: chatSessionId,
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone
      },
      eventDetails: {
        eventType: formData.eventType,
        eventTypeLabel: formData.eventTypeLabel,
        groupSize: formData.groupSize,
        specialRequests: formData.specialRequests
      },
      exactBookingSelection: selectedBoatDetails ? {
        boatId: selectedBoatDetails.id,
        boatName: selectedBoatDetails.name,
        capacity: selectedBoatDetails.capacity,
        exactDate: formData.selectedSlot?.dateISO,
        exactStartTime: formData.selectedSlot?.startTime,
        exactEndTime: formData.selectedSlot?.endTime,
        duration: formData.selectedSlot?.duration,
        cruiseType: formData.selectedCruiseType,
        timeSlotLabel: formData.selectedSlot?.label
      } : null,
      pricing: {
        privatePricing: privatePricing?.total,
        discoPricing: discoPricing?.total
      },
      timestamp: new Date().toISOString()
    });
    
    try {
      setFormSubmitting(true);
      addCompletedSelection({
        id: 'contact-info',
        label: 'Contact',
        value: `${formData.firstName} ${formData.lastName}`,
        icon: 'user'
      });
      handleSendQuote();
    } catch (error) {
      console.error('❌ CONTACT FORM SUBMISSION ERROR', {
        step: "contact_submission_error",
        sessionId: chatSessionId,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      toast({
        title: "Submission Error",
        description: "Failed to submit contact information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setFormSubmitting(false);
    }
  }, [formData, formSubmitting, pricingLoading, paymentProcessing, toast, chatSessionId, getBoatDetails, privatePricing, discoPricing]);

  // Create lead mutation
  const createLead = useMutation({
    mutationFn: async (data: BookingData) => {
      const selectedBoatDetails = data.selectedSlot ? getBoatDetails(data.selectedSlot) : null;
      
      console.log("👤 LEAD CREATION STARTED", {
        step: "lead_creation_start",
        sessionId: chatSessionId,
        exactBookingDetails: selectedBoatDetails ? {
          boatId: selectedBoatDetails.id,
          boatName: selectedBoatDetails.name,
          capacity: selectedBoatDetails.capacity,
          exactDate: data.selectedSlot?.dateISO,
          exactStartTime: data.selectedSlot?.startTime,
          exactEndTime: data.selectedSlot?.endTime,
          cruiseDateTime: `${format(data.eventDate!, 'EEEE, MMMM d, yyyy')} ${data.selectedSlot?.label}`,
          duration: data.selectedSlot?.duration,
          price: data.selectedSlot?.price
        } : null,
        customerInfo: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          groupSize: data.groupSize,
          eventType: data.eventType
        },
        timestamp: new Date().toISOString()
      });
      
      // Step 1: Create lead and project using the new booking endpoint - ENHANCED with complete selection data
      const leadResponse = await apiRequest('POST', '/api/chat/booking', {
        sessionId: `chat_${Date.now()}`,
        step: 'create-lead',
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        eventType: data.eventType,
        eventDate: data.eventDate?.toISOString(),
        groupSize: data.groupSize,
        specialRequests: data.specialRequests,
        cruiseType: data.selectedCruiseType,
        timeSlot: data.selectedSlot?.id || '',
        discoPackage: data.selectedDiscoPackage,
        budget: (data.selectedCruiseType === 'private' ? privatePricing?.total : discoPricing?.total)?.toString(),
        data: {
          // Basic event info
          eventTypeLabel: data.eventTypeLabel,
          eventTypeEmoji: data.eventEmoji,
          
          // Complete selected slot information
          selectedSlot: data.selectedSlot ? {
            id: data.selectedSlot.id,
            dateISO: data.selectedSlot.dateISO,
            startTime: data.selectedSlot.startTime,
            endTime: data.selectedSlot.endTime,
            duration: data.selectedSlot.duration,
            label: data.selectedSlot.label,
            price: data.selectedSlot.price,
            capacity: data.selectedSlot.capacity,
            boatCandidates: data.selectedSlot.boatCandidates,
            cruiseType: data.selectedSlot.cruiseType,
            bookable: data.selectedSlot.bookable,
            held: data.selectedSlot.held
          } : null,
          
          // Complete boat details
          exactBoatDetails: selectedBoatDetails,
          
          // Disco cruise specific data
          discoPackage: data.selectedDiscoPackage,
          discoTicketQuantity: data.discoTicketQuantity,
          discoPricing: data.selectedCruiseType === 'disco' ? discoPricing : null,
          
          // Private cruise specific data
          selectedAddOnPackages: data.selectedAddOnPackages || [],
          privatePricing: data.selectedCruiseType === 'private' ? privatePricing : null,
          
          // Pricing context for quote generation
          calculatedPricing: {
            selectedCruiseType: data.selectedCruiseType,
            eventDate: data.eventDate?.toISOString(),
            groupSize: data.groupSize,
            privateOptions: data.selectedCruiseType === 'private' ? {
              selectedAddOnPackages: data.selectedAddOnPackages,
              pricing: privatePricing
            } : null,
            discoOptions: data.selectedCruiseType === 'disco' ? {
              package: data.selectedDiscoPackage,
              ticketQuantity: data.discoTicketQuantity,
              pricing: discoPricing
            } : null
          },
          
          // Alternative dates information for reference
          alternativeDatesConsidered: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : null,
          
          // Comparison screen context
          comparisonScreenCompleted: true,
          selectedAfterComparison: {
            cruiseType: data.selectedCruiseType,
            reasoning: data.selectedCruiseType === 'private' ? 'Selected private cruise after comparison' : 'Selected disco cruise after comparison'
          }
        }
      });
      const leadResult = await leadResponse.json();

      if (!leadResult.success) {
        throw new Error('Failed to create lead');
      }

      const projectId = leadResult.project.id;
      const contactId = leadResult.contact.id;
      
      // Step 2: Check availability
      if (data.eventDate) {
        await apiRequest('POST', '/api/chat/booking', {
          sessionId: `chat_${Date.now()}`,
          step: 'check-availability',
          data: {
            date: data.eventDate.toISOString().split('T')[0],
            groupSize: data.groupSize
          }
        });
      }
      
      // Step 3: Generate and send quote using backend
      const quoteResponse = await apiRequest('POST', '/api/chat/booking', {
        sessionId: `chat_${Date.now()}`,
        step: 'generate-quote',
        data: {
          projectId: projectId,
          promoCode: undefined
        }
      });
      const quoteResult = await quoteResponse.json();

      if (!quoteResult.success) {
        throw new Error('Failed to generate quote');
      }

      setGeneratedQuoteId(quoteResult.quote.id);
      
      // Show delivery status feedback to user
      if (quoteResult.delivery) {
        const { emailSent, smsSent, hasContact } = quoteResult.delivery;
        
        if (hasContact) {
          if (emailSent && smsSent) {
            toast({
              title: "Quote Sent Successfully! ✅",
              description: "We've sent your quote via email and text message. Check your inbox!",
            });
          } else if (emailSent && !smsSent) {
            toast({
              title: "Quote Sent via Email! 📧",
              description: "We've emailed your quote. SMS delivery encountered an issue - we'll follow up personally.",
              variant: "default",
            });
          } else if (!emailSent && smsSent) {
            toast({
              title: "Quote Sent via Text! 📱", 
              description: "We've texted your quote. Email delivery encountered an issue - we'll follow up personally.",
              variant: "default",
            });
          } else if (!emailSent && !smsSent) {
            toast({
              title: "Quote Ready! 📋",
              description: "Your quote is ready! We'll contact you directly to share the details.",
              variant: "default",
            });
          }
        } else {
          toast({
            title: "Quote Generated! 🎉",
            description: "Your quote is ready! We'll reach out to you with the details.",
            variant: "default",
          });
        }
      } else {
        // Fallback toast for older backend responses
        toast({
          title: "Quote Created! 🎉",
          description: quoteResult.message || "Your personalized quote is ready!",
        });
      }

      return { 
        contact: leadResult.contact, 
        project: leadResult.project,
        quote: quoteResult.quote,
        quoteUrl: quoteResult.quoteUrl,
        delivery: quoteResult.delivery
      };
      
      /* Remove old client-side quote generation - now handled by backend
      const currentPricing = data.selectedCruiseType === 'private' ? privatePricing : discoPricing;
      if (currentPricing && currentPricing.breakdown) {
        const quoteItems: QuoteItem[] = [];
        
        if (data.selectedCruiseType === 'disco' && data.selectedDiscoPackage) {
          const selectedPackage = discoPackages.find(pkg => pkg.id === data.selectedDiscoPackage);
          if (selectedPackage) {
            const timeSlotLabel = data.selectedSlot?.label || 'Unknown time';
            
            quoteItems.push({
              id: `disco_${selectedPackage.id}_${Date.now()}`,
              type: 'disco_cruise',
              name: `${selectedPackage.name} - ${timeSlotLabel}`,
              description: `ATX Disco Cruise for ${data.groupSize} people on ${data.eventDate ? format(data.eventDate, 'EEEE, MMMM do, yyyy') : 'selected date'}. ${selectedPackage.features.join(', ')}.`,
              unitPrice: selectedPackage.price * 100,
              qty: data.groupSize,
              category: 'cruise_package'
            });
          }
        } else {
          const timeSlotLabel = data.selectedSlot?.label || 'Unknown time';
          
          quoteItems.push({
            id: `private_charter_${Date.now()}`,
            type: 'private_cruise',
            name: `Private ${currentPricing.breakdown.boatType} Charter`,
            description: `Exclusive ${currentPricing.breakdown.cruiseDuration}-hour cruise on ${currentPricing.breakdown.dayName}, ${data.eventDate ? format(data.eventDate, 'MMMM do, yyyy') : 'selected date'} from ${timeSlotLabel}. Perfect for your ${data.eventTypeLabel.toLowerCase()}.`,
            unitPrice: currentPricing.breakdown.baseCruiseCost * 100,
            qty: 1,
            category: 'cruise_charter'
          });
          
          if (currentPricing.breakdown.crewFee > 0) {
            quoteItems.push({
              id: `crew_fee_${Date.now()}`,
              type: 'crew_fee',
              name: 'Additional Crew Service',
              description: `Professional crew service required for groups of ${data.groupSize}+ people.`,
              unitPrice: currentPricing.breakdown.crewFee * 100,
              qty: 1,
              category: 'service_fee'
            });
          }
        }
        
        if (data.specialRequests && data.specialRequests.trim()) {
          quoteItems.push({
            id: `special_requests_${Date.now()}`,
            type: 'note',
            name: 'Special Requests',
            description: data.specialRequests,
            unitPrice: 0,
            qty: 1,
            category: 'customer_notes'
          });
        }

        const radioSections: RadioSection[] = [];
        
        const quote: InsertQuote = {
          orgId: 'org_demo',
          projectId: projectResponse.id,
          items: quoteItems,
          radioSections: radioSections,
          subtotal: currentPricing.subtotal,
          discountTotal: currentPricing.discountTotal,
          tax: currentPricing.tax,
          gratuity: currentPricing.gratuity,
          total: currentPricing.total,
          perPersonCost: currentPricing.perPersonCost,
          depositRequired: currentPricing.depositRequired,
          depositPercent: currentPricing.depositPercent,
          depositAmount: currentPricing.depositAmount,
          paymentSchedule: currentPricing.paymentSchedule,
          status: 'DRAFT',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };
        
        const quoteRes = await apiRequest('POST', '/api/quotes', quote);
        const quoteResponse = await quoteRes.json();
        
        setGeneratedQuoteId(quoteResponse.id);
        
        await apiRequest('POST', '/api/quotes/' + quoteResponse.id + '/send', {
          email: contact.email,
          phone: contact.phone,
        });
      }
      
      return { contact: contactResponse, project: projectResponse };
      */
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setCurrentStep('confirmation');
      toast({ 
        title: 'Quote Sent Successfully!',
        description: "Check your email and text message for the full interactive quote.",
      });
    },
    onError: () => {
      toast({ 
        title: 'Something went wrong', 
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    },
  });

  const handleSendQuote = () => {
    createLead.mutate(formData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Completed Selections Bar */}
      <AnimatePresence>
        {completedSelections.length > 0 && currentStep !== 'confirmation' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="max-w-6xl mx-auto px-6 py-2">
              <div className="flex items-center gap-2 overflow-x-auto">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                {completedSelections.map((selection) => (
                  <Badge
                    key={selection.id}
                    variant="secondary" 
                    className={cn(
                      "flex items-center gap-1 py-0.5 px-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 whitespace-nowrap",
                      selection.editable && "cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    )}
                    onClick={selection.editable ? selection.onEdit : undefined}
                    data-testid={`badge-${selection.id}`}
                  >
                    {selection.emoji && <span className="text-xs">{selection.emoji}</span>}
                    {selection.icon && getIconComponent(selection.icon, 10)}
                    <span className="font-medium">{selection.label}:</span>
                    <span>{selection.value}</span>
                    {selection.editable && <Edit2 className="h-2.5 w-2.5 ml-0.5" />}
                  </Badge>
                ))}
                
                {(privatePricing || discoPricing) && (
                  <Badge className="ml-auto flex items-center gap-1 py-0.5 px-2 text-xs bg-green-600 dark:bg-green-700">
                    <DollarSign className="h-3 w-3" />
                    <span className="font-bold">
                      {formatCurrency((formData.selectedCruiseType === 'disco' ? discoPricing : privatePricing)?.total || 0)}
                    </span>
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex items-start justify-center pt-4 px-4 pb-4">
        <div className="w-full max-w-6xl">
          
          <AnimatePresence mode="wait">
            
            {/* Step 1: Intro + Calendar Combined */}
            {currentStep === 'intro' && (
              <motion.div
                key="intro"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                {/* Welcome Header */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-center space-y-4"
                >
                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <motion.img
                      src={logoPath}
                      alt="Premier Party Cruises"
                      className="h-24 w-auto"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    />
                  </div>
                  
                  {/* Hero Text */}
                  <div className="space-y-3">
                    <motion.h1
                      className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      Welcome Aboard!
                    </motion.h1>
                    
                    <motion.p
                      className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      Lake Travis's Premium Boat Charter Experience
                    </motion.p>
                  </div>
                </motion.div>
                
                {/* Features Row */}
                <motion.div
                  className="flex items-center justify-center gap-8 flex-wrap text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Ship className="h-5 w-5 text-blue-600" />
                    <span>Premium Fleet</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>500+ 5-Star Reviews</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span>7 Years Excellence</span>
                  </div>
                </motion.div>

                {/* Divider Line */}
                <div className="flex items-center justify-center">
                  <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                </div>
                
                {/* Calendar Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      Select Your Cruise Date
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Choose an available date to begin planning your perfect event
                    </p>
                  </div>

                  <div className="w-full max-w-lg mx-auto px-2 sm:px-4">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-3 sm:p-6 lg:p-8 w-full"
                    >
                      <CalendarComponent
                        mode="single"
                        selected={formData.eventDate}
                        onSelect={handleDateSelect}
                        disabled={(date: Date) => !isDateAvailable(date)}
                        className="mx-auto w-full"
                        classNames={{
                          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
                          month: "space-y-4 w-full flex-1",
                          caption: "flex justify-center pt-1 relative items-center text-lg font-semibold mb-2",
                          caption_label: "text-base sm:text-lg font-semibold",
                          nav: "space-x-1 flex items-center",
                          nav_button: "h-8 w-8 sm:h-9 sm:w-9 bg-transparent p-0 opacity-50 hover:opacity-100",
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                          table: "w-full border-collapse space-y-1",
                          head_row: "flex w-full",
                          head_cell: "text-slate-500 dark:text-slate-400 rounded-md flex-1 font-normal text-xs sm:text-sm text-center py-2",
                          row: "flex w-full mt-1 sm:mt-2",
                          cell: "flex-1 text-center text-sm p-0 relative aspect-square",
                          day: "w-full h-full min-h-[44px] sm:min-h-[48px] p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200 rounded-md transition-colors text-xs sm:text-sm",
                          day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white",
                          day_today: "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold",
                          day_outside: "text-slate-400 dark:text-slate-600 opacity-50",
                          day_disabled: "text-slate-300 dark:text-slate-700 opacity-50 cursor-not-allowed",
                          day_hidden: "invisible",
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    Click on an available date to continue
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Dynamic Comparison Page */}
            {currentStep === 'comparison-selection' && (
              <motion.div
                key="comparison"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {/* Event Type Selection */}
                {!eventTypeCollapsed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                        What type of event are you planning?
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400">
                        Select to see options for {format(formData.eventDate!, 'MMMM d, yyyy')}
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                      {eventTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-400"
                          onClick={() => handleEventTypeSelect(type.id, type.label, type.emoji)}
                          data-testid={`button-event-${type.id}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{type.emoji}</span>
                            <span className="font-medium text-slate-800 dark:text-slate-200">{type.label}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900 px-6 py-3 rounded-full flex items-center gap-3">
                      <span className="text-2xl">{formData.eventEmoji}</span>
                      <span className="font-bold text-blue-800 dark:text-blue-200">{formData.eventTypeLabel}</span>
                    </div>
                  </motion.div>
                )}

                {/* Group Size Selection */}
                {showGroupSize && !showComparison && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                  >
                    <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                      <CardHeader className="text-center">
                        <CardTitle>How many people in your group?</CardTitle>
                        <CardDescription>Select your group size to see available options</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600">{formData.groupSize}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">people</div>
                          </div>
                          
                          <Slider
                            value={[formData.groupSize]}
                            onValueChange={handleGroupSizeChange}
                            min={GROUP_SIZE_MIN}
                            max={GROUP_SIZE_MAX}
                            step={1}
                            className="w-full"
                          />
                          
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>{GROUP_SIZE_MIN} min</span>
                            <span>{GROUP_SIZE_MAX} max</span>
                          </div>
                        </div>
                        
                        <Button
                          onClick={handleGroupSizeConfirm}
                          className="w-full"
                          size="lg"
                          data-testid="button-confirm-group-size"
                        >
                          Show Options for {formData.groupSize} People
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Comparison Options */}
                {showComparison && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                        Available Options for Your {formData.eventTypeLabel}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {formData.groupSize} people on {format(formData.eventDate!, 'EEEE, MMMM d')}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Private Cruise Option */}
                      <Card className={cn(
                        "bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm cursor-pointer transition-all",
                        formData.selectedCruiseType === 'private' && "ring-2 ring-blue-600"
                      )}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                              <Ship className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              {formData.selectedSlot ? (
                                <>
                                  <CardTitle>Private Cruise - {getBoatDetails(formData.selectedSlot).name}</CardTitle>
                                  {/* Large, prominent date display */}
                                  <div className="text-2xl font-bold text-blue-600 mt-2 mb-1">
                                    {format(formData.eventDate!, 'EEEE, MMMM d')}
                                  </div>
                                  <CardDescription>
                                    {formData.selectedSlot.label} • Fits {getBoatDetails(formData.selectedSlot).capacity} people
                                  </CardDescription>
                                </>
                              ) : (
                                <>
                                  <CardTitle>Private Cruise</CardTitle>
                                  {/* Large, prominent date display */}
                                  <div className="text-2xl font-bold text-blue-600 mt-2 mb-1">
                                    {format(formData.eventDate!, 'EEEE, MMMM d')}
                                  </div>
                                  <CardDescription>Exclusive boat for your group • Fits {getBoatCapacityForGroup(formData.groupSize)} people • {getCruiseDuration(formData.eventDate)}-hour minimum</CardDescription>
                                </>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Step 1: Time Slot Selection */}
                          <div className="space-y-3">
                            <Label className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Select Time Slot
                            </Label>
                            <TimeSlotList
                              slots={privateSlots}
                              onSlotSelect={handlePrivateCruiseSelect}
                              selectedSlotId={formData.selectedSlot?.id}
                              showDate={false}
                              variant="compact"
                              groupSize={formData.groupSize}
                              data-testid="private-timeslot-list"
                            />
                          </div>

                          {/* Step 2: Package Add-Ons - Only show if time slot selected */}
                          {formData.selectedSlot && (
                            <div className="space-y-3 border-t pt-4">
                              <Label className="flex items-center gap-2">
                                <Crown className="h-4 w-4" />
                                Enhance Your Experience (Optional)
                              </Label>
                              <div className="space-y-3">
                                {addOnPackages.map((pkg) => (
                                  <div key={pkg.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <input
                                      type="checkbox"
                                      id={`addon-${pkg.id}`}
                                      checked={formData.selectedAddOnPackages.includes(pkg.id)}
                                      onChange={() => handleAddOnPackageToggle(pkg.id)}
                                      className="mt-1"
                                    />
                                    <Label htmlFor={`addon-${pkg.id}`} className="flex-1 cursor-pointer">
                                      <div className="space-y-1">
                                        <div className="flex justify-between items-center">
                                          <span className="font-medium">{pkg.name}</span>
                                          <span className="font-bold text-green-600">+${pkg.hourlyRate}/hr</span>
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                          {pkg.description}
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {pkg.features.map((feature, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">{feature}</Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Step 3: Pricing Details - Only show if time slot selected */}
                          {formData.selectedSlot && (
                            <div className="border-t pt-4">
                              {pricingLoading ? (
                                <div className="flex items-center justify-center py-8">
                                  <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
                                  <span className="text-slate-600 dark:text-slate-400">Calculating pricing...</span>
                                </div>
                              ) : privatePricing ? (
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-4">
                              <div className="text-center mb-4">
                                <div className="text-3xl font-bold text-blue-600">
                                  {formatCurrency(privatePricing.total)}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                  {formatCurrency(privatePricing.perPersonCost)} per person
                                </div>
                              </div>
                              
                              {/* Duration & Rate Display */}
                              <div className="mb-4 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration:</span>
                                  <span className="font-bold text-blue-600">{getCruiseDuration(formData.eventDate)} hours</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Base Rate:</span>
                                  <span className="font-bold text-blue-600">${BASE_PRIVATE_HOURLY_RATE}/hour</span>
                                </div>
                                {formData.selectedAddOnPackages.length > 0 && (
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Add-ons:</span>
                                    <span className="font-bold text-green-600">+${formData.selectedAddOnPackages.reduce((sum, addOnId) => {
                                      const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
                                      return sum + (addOn?.hourlyRate || 0);
                                    }, 0)}/hour</span>
                                  </div>
                                )}
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Rate:</span>
                                  <span className="font-bold text-purple-600">${BASE_PRIVATE_HOURLY_RATE + formData.selectedAddOnPackages.reduce((sum, addOnId) => {
                                    const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
                                    return sum + (addOn?.hourlyRate || 0);
                                  }, 0)}/hour</span>
                                </div>
                                <div className="flex items-center justify-between border-t pt-2">
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Cost:</span>
                                  <span className="font-bold text-blue-600">
                                    {(() => {
                                      const totalHourlyRate = BASE_PRIVATE_HOURLY_RATE + formData.selectedAddOnPackages.reduce((sum, addOnId) => {
                                        const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
                                        return sum + (addOn?.hourlyRate || 0);
                                      }, 0);
                                      const duration = getCruiseDuration(formData.eventDate);
                                      const totalCostCents = totalHourlyRate * duration * 100;
                                      return `$${totalHourlyRate} × ${duration} hours = ${formatCurrency(totalCostCents)}`;
                                    })()}
                                  </span>
                                </div>
                                {privatePricing?.breakdown?.crewFee && privatePricing.breakdown.crewFee > 0 && (
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Extra Crew Fee:</span>
                                    <span className="font-medium text-slate-600">+${privatePricing.breakdown.crewFee}</span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Detailed Pricing Breakdown */}
                              <div className="space-y-2 text-sm border-t pt-3">
                                <div className="flex justify-between">
                                  <span>Cruise Subtotal:</span>
                                  <span>{formatCurrency(privatePricing.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Tax (8.25%):</span>
                                  <span>{formatCurrency(privatePricing.tax)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Gratuity (20%):</span>
                                  <span>{formatCurrency(privatePricing.gratuity)}</span>
                                </div>
                                <div className="flex justify-between font-bold border-t pt-2">
                                  <span>Grand Total:</span>
                                  <span>{formatCurrency(privatePricing.total)}</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                  <span>Deposit ({privatePricing.depositPercent}%):</span>
                                  <span>{formatCurrency(privatePricing.depositAmount)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                  <span>Balance Due:</span>
                                  <span>{formatCurrency(privatePricing.total - privatePricing.depositAmount)}</span>
                                </div>
                              </div>
                            </div>
                              ) : (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                    <AlertCircle className="h-4 w-4" />
                                    <span className="text-sm font-medium">Pricing temporarily unavailable</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Payment Buttons */}
                          <div className="space-y-2">
                            <Button
                              onClick={() => {
                                setFormData(prev => ({ ...prev, selectedCruiseType: 'private' }));
                                handlePayment('deposit', 'private');
                              }}
                              disabled={!formData.selectedSlot || !privatePricing}
                              className="w-full bg-green-600 hover:bg-green-700"
                              data-testid="button-private-deposit"
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay {privatePricing?.depositPercent || 25}% Deposit ({privatePricing ? formatCurrency(privatePricing.depositAmount) : '$0'})
                            </Button>
                            
                            <Button
                              onClick={() => {
                                setFormData(prev => ({ ...prev, selectedCruiseType: 'private' }));
                                handlePayment('full', 'private');
                              }}
                              disabled={!formData.selectedSlot || !privatePricing}
                              className="w-full bg-blue-600 hover:bg-blue-700"
                              data-testid="button-private-full"
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay in Full ({privatePricing ? formatCurrency(privatePricing.total) : '$0'})
                            </Button>
                            
                            <Button
                              onClick={() => {
                                setFormData(prev => ({ ...prev, selectedCruiseType: 'private' }));
                                goToStep('contact-form');
                              }}
                              disabled={!formData.selectedSlot}
                              variant="outline"
                              className="w-full"
                              data-testid="button-private-quote"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Send Me My Quote
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* CONDITIONAL RIGHT COLUMN: Disco cruise for bachelor/bachelorette, Alternative dates for others */}
                      {(formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') && discoSlots.length > 0 ? (
                        /* DISCO CRUISE OPTION - Only for bachelor/bachelorette events */
                        <Card className={cn(
                          "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm cursor-pointer transition-all",
                          formData.selectedCruiseType === 'disco' && "ring-2 ring-purple-600"
                        )}>
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                <Music className="h-6 w-6 text-purple-600" />
                              </div>
                              <div>
                                <CardTitle>ATX Disco Cruise</CardTitle>
                                {/* Large, prominent date display */}
                                <div className="text-2xl font-bold text-purple-600 mt-2 mb-1">
                                  {format(formData.eventDate!, 'EEEE, MMMM d')}
                                </div>
                                <CardDescription>
                                  4-hour party cruise • Join the party!
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Step 1: Time Slot Selection */}
                            <div className="space-y-3">
                              <Label className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Select Time Slot
                              </Label>
                              <RadioGroup
                                value={formData.selectedSlot?.id || ''}
                                onValueChange={(slotId) => {
                                  const selectedSlot = discoSlots.find(slot => slot.id === slotId);
                                  if (selectedSlot) {
                                    setFormData(prev => ({
                                      ...prev,
                                      selectedSlot,
                                      selectedCruiseType: 'disco' // Auto-select disco when slot is chosen
                                    }));
                                  }
                                }}
                              >
                                {discoSlots.map((slot) => (
                                  <Card key={slot.id} className={cn(
                                    "transition-all cursor-pointer border-2",
                                    formData.selectedSlot?.id === slot.id 
                                      ? "ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-900/20" 
                                      : "border-slate-200 dark:border-slate-700 hover:border-purple-300"
                                  )}>
                                    <CardContent className="p-3">
                                      <div className="flex items-center space-x-3">
                                        <RadioGroupItem value={slot.id} id={`disco-slot-${slot.id}`} />
                                        <Label htmlFor={`disco-slot-${slot.id}`} className="flex-1 cursor-pointer">
                                          <div className="flex justify-between items-center">
                                            <div className="space-y-1">
                                              <div className="font-bold text-purple-600">{slot.label}</div>
                                              <div className="text-sm text-slate-600 dark:text-slate-400">{slot.description || '4-hour disco cruise'}</div>
                                              <Badge variant="outline" className="text-xs">
                                                <Users className="h-3 w-3 mr-1" />
                                                Up to {slot.capacity || 100} people
                                              </Badge>
                                            </div>
                                            <div className="text-right">
                                              <div className="text-sm font-medium text-purple-600">Available</div>
                                            </div>
                                          </div>
                                        </Label>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </RadioGroup>
                            </div>

                            {/* Step 2: Package Selection - Only show if time slot selected */}
                            {formData.selectedSlot && formData.selectedSlot.cruiseType === 'disco' && (
                              <div className="space-y-3 border-t pt-4">
                                <Label className="flex items-center gap-2">
                                  <Crown className="h-4 w-4" />
                                  Select Your Package
                                </Label>
                                <RadioGroup
                                  value={formData.selectedDiscoPackage || ''}
                                  onValueChange={(packageId) => {
                                    setFormData(prev => ({
                                      ...prev,
                                      selectedDiscoPackage: packageId as DiscoPackage
                                    }));
                                  }}
                                >
                                  {discoPackages.map((pkg) => (
                                    <Card key={pkg.id} className={cn(
                                      "transition-all cursor-pointer border-2",
                                      formData.selectedDiscoPackage === pkg.id 
                                        ? "ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-900/20" 
                                        : "border-slate-200 dark:border-slate-700 hover:border-purple-300"
                                    )}>
                                      <CardContent className="p-3">
                                        <div className="flex items-center space-x-3">
                                          <RadioGroupItem value={pkg.id} id={`disco-${pkg.id}`} />
                                          <Label htmlFor={`disco-${pkg.id}`} className="flex-1 cursor-pointer">
                                            <div className="flex justify-between items-start">
                                              <div className="space-y-1">
                                                <div className="font-bold">{pkg.name}</div>
                                                <div className="text-xs text-slate-600 dark:text-slate-400">{pkg.description}</div>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                  {pkg.features.slice(0, 2).map((feature) => (
                                                    <Badge key={feature} variant="outline" className="text-xs">{feature}</Badge>
                                                  ))}
                                                </div>
                                              </div>
                                              <div className="text-right ml-3">
                                                <div className="font-bold text-lg text-purple-600">${pkg.price}</div>
                                                <div className="text-xs text-slate-600">per person</div>
                                              </div>
                                            </div>
                                          </Label>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </RadioGroup>
                              </div>
                            )}

                            {/* Step 3: Ticket Quantity - Only show if package selected */}
                            {formData.selectedDiscoPackage && formData.selectedSlot && (
                              <div className="space-y-3 border-t pt-4">
                                <Label className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  Number of Tickets
                                </Label>
                                <div className="flex items-center gap-4 justify-center bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
                                  <Button
                                    onClick={() => setFormData(prev => ({ 
                                      ...prev, 
                                      discoTicketQuantity: Math.max(1, prev.discoTicketQuantity - 1) 
                                    }))}
                                    size="sm"
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <div className="text-center min-w-[60px]">
                                    <div className="text-2xl font-bold text-purple-600">{formData.discoTicketQuantity}</div>
                                    <div className="text-xs text-slate-600">tickets</div>
                                  </div>
                                  <Button
                                    onClick={() => setFormData(prev => ({ 
                                      ...prev, 
                                      discoTicketQuantity: Math.min(50, prev.discoTicketQuantity + 1) 
                                    }))}
                                    size="sm"
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Step 4: Pricing Details - Only show if both slot and package selected */}
                            {formData.selectedDiscoPackage && formData.selectedSlot && (
                              <div className="border-t pt-4">
                                {pricingLoading ? (
                                  <div className="flex items-center justify-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin text-purple-600 mr-2" />
                                    <span className="text-slate-600 dark:text-slate-400">Calculating pricing...</span>
                                  </div>
                                ) : discoPricing ? (
                                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4">
                                    <div className="text-center mb-4">
                                      <div className="text-3xl font-bold text-purple-600">
                                        {formatCurrency(discoPricing.total)}
                                      </div>
                                      <div className="text-sm text-slate-600 dark:text-slate-400">
                                        {formatCurrency(Math.round(discoPricing.total / formData.discoTicketQuantity))} per person
                                      </div>
                                    </div>
                                    
                                    {/* Package & Quantity Display */}
                                    <div className="mb-4 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Package:</span>
                                        <span className="font-bold text-purple-600">{discoPackages.find(p => p.id === formData.selectedDiscoPackage)?.name}</span>
                                      </div>
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Per Person:</span>
                                        <span className="font-bold text-purple-600">${discoPackages.find(p => p.id === formData.selectedDiscoPackage)?.price}</span>
                                      </div>
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tickets:</span>
                                        <span className="font-bold text-purple-600">{formData.discoTicketQuantity}</span>
                                      </div>
                                      <div className="flex items-center justify-between border-t pt-2">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Subtotal:</span>
                                        <span className="font-bold text-purple-600">
                                          ${(discoPackages.find(p => p.id === formData.selectedDiscoPackage)?.price || 0) * formData.discoTicketQuantity}
                                        </span>
                                      </div>
                                    </div>
                                    
                                    {/* Detailed Pricing Breakdown */}
                                    <div className="space-y-2 text-sm border-t pt-3">
                                      <div className="flex justify-between">
                                        <span>Cruise Subtotal:</span>
                                        <span>{formatCurrency(discoPricing.subtotal)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Tax (8.25%):</span>
                                        <span>{formatCurrency(discoPricing.tax || 0)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Service Fee (3%):</span>
                                        <span>{formatCurrency(Math.round(discoPricing.subtotal * 0.03))}</span>
                                      </div>
                                      <div className="flex justify-between font-bold border-t pt-2">
                                        <span>Grand Total:</span>
                                        <span>{formatCurrency(discoPricing.total)}</span>
                                      </div>
                                      <div className="flex justify-between text-green-600">
                                        <span>Pay Today (100%):</span>
                                        <span>{formatCurrency(discoPricing.total)}</span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                      <AlertCircle className="h-4 w-4" />
                                      <span className="text-sm font-medium">Pricing temporarily unavailable</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* Payment Buttons - Only show if both slot and package selected */}
                            {formData.selectedSlot && formData.selectedDiscoPackage && (
                              <div className="space-y-2">
                                <Button
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, selectedCruiseType: 'disco' }));
                                    handlePayment('deposit', 'disco');
                                  }}
                                  disabled={!discoPricing}
                                  className="w-full bg-green-600 hover:bg-green-700"
                                  data-testid="button-disco-deposit"
                                >
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Pay {discoPricing?.depositPercent || 100}% Deposit ({discoPricing ? formatCurrency(discoPricing.depositAmount || discoPricing.total) : '$0'})
                                </Button>
                                
                                <Button
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, selectedCruiseType: 'disco' }));
                                    handlePayment('full', 'disco');
                                  }}
                                  disabled={!discoPricing}
                                  className="w-full bg-purple-600 hover:bg-purple-700"
                                  data-testid="button-disco-full"
                                >
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Pay in Full ({discoPricing ? formatCurrency(discoPricing.total) : '$0'})
                                </Button>
                                
                                <Button
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, selectedCruiseType: 'disco' }));
                                    goToStep('contact-form');
                                  }}
                                  variant="outline"
                                  className="w-full"
                                  data-testid="button-disco-quote"
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  Send Me My Quote
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ) : (
                        /* ALTERNATIVE DATES - For non-bachelor/bachelorette events */
                        <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-orange-600" />
                              </div>
                              <div>
                                <CardTitle>Alternative Dates</CardTitle>
                                <CardDescription>
                                  Other available dates for your event
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {alternativeDates.length > 0 && formData.eventDate ? (
                              <AlternativeDates
                                selectedDate={formData.eventDate}
                                groupSize={formData.groupSize}
                                onSelectDate={(date, timeSlot) => {
                                  setFormData(prev => ({ 
                                    ...prev, 
                                    eventDate: date,
                                    selectedSlot: null, // Reset selected slot when date changes
                                    selectedCruiseType: null 
                                  }));
                                }}
                                getTimeSlotsForDate={getPrivateTimeSlotsForDate}
                                formatCurrency={formatCurrency}
                                basePrice={privatePricing?.subtotal || 0}
                              />
                            ) : (
                              <div className="text-center py-8">
                                <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                                <p className="text-slate-600 dark:text-slate-400 mb-2">
                                  No alternative dates available
                                </p>
                                <p className="text-sm text-slate-500">
                                  This date has the best availability for your event
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Back Button */}
                    <div className="flex justify-center">
                      <Button
                        onClick={handleNavigateBack}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Contact Form */}
            {currentStep === 'contact-form' && (
              <motion.div
                key="contact"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-2xl mx-auto"
              >
                <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Your Information</CardTitle>
                    <CardDescription>We'll send your quote to this email</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => updateFormDataWithAutoSave({ firstName: e.target.value })}
                            required
                            data-testid="input-first-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => updateFormDataWithAutoSave({ lastName: e.target.value })}
                            required
                            data-testid="input-last-name"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormDataWithAutoSave({ email: e.target.value })}
                          required
                          data-testid="input-email"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormDataWithAutoSave({ phone: e.target.value })}
                          data-testid="input-phone"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                          placeholder="Any special requests or requirements?"
                          rows={3}
                          data-testid="input-special-requests"
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          onClick={handleNavigateBack}
                          variant="outline"
                          className="flex-1"
                        >
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={createLead.isPending}
                          className="flex-1"
                          data-testid="button-send-quote"
                        >
                          {createLead.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Quote
                              <ChevronRight className="h-4 w-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Confirmation */}
            {currentStep === 'confirmation' && (
              <motion.div
                key="confirmation"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </motion.div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    Quote Sent Successfully!
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    Check your email for the full interactive quote
                  </p>
                </div>
                
                {generatedQuoteId && (
                  <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      Quote ID: <span className="font-mono font-bold">{generatedQuoteId}</span>
                    </p>
                    
                    <Button
                      onClick={() => window.location.href = `/quote/${generatedQuoteId}`}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      View Your Quote
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
                
                <div className="pt-8">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Start New Booking
                  </Button>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}