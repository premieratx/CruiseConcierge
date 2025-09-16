import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
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
import type { InsertContact, InsertProject, PricingPreview, InsertQuote, RadioSection, QuoteItem } from '@shared/schema';
import { getPrivateTimeSlotsForDate, getDiscoTimeSlotsForDate, isDiscoAvailableForDate } from '@shared/timeSlots';
import { formatCurrency, formatDate, formatLongDate, formatTimeForDisplay, formatTimeRange, formatPhoneNumber, formatCustomerName, formatBoatCapacity, formatEventDuration, formatGroupSize } from '@shared/formatters';
import { EVENT_TYPES, CRUISE_TYPES, DISCO_PACKAGES, PRICING_DEFAULTS } from '@shared/constants';

type ChatFlowStep = 
  | 'intro' // Intro + Calendar combined
  | 'comparison-selection' // Event type + Group size + Comparison
  | 'contact-form'
  | 'confirmation';

type CruiseType = 'private' | 'disco';
type DiscoPackage = 'basic' | 'disco_queen' | 'platinum';

interface ComparisonSelection {
  cruiseType: CruiseType;
  timeSlot?: string;
  discoPackage?: DiscoPackage;
  discoTimeSlot?: string;
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
  selectedTimeSlot: string;
  selectedAddOnPackages: string[];
  selectedBoat?: string;
  selectedDiscoPackage: DiscoPackage | null;
  selectedDiscoTimeSlot: string;
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

// Use centralized time slot configuration - remove local implementation

// Use centralized disco time slot configuration - remove local implementation

// Use centralized disco availability check - remove local implementation

const isDateAvailable = (date: Date): boolean => {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 365);
  return !isBefore(date, today) && !isAfter(date, maxDate);
};

const getAlternativeDates = (selectedDate: Date, groupSize: number, daysRange: number = 14): Array<{
  date: Date;
  dayName: string;
  dayNumber: number;
  monthName: string;
  isAvailable: boolean;
  isSelected: boolean;
  timeSlotsAvailable: number;
}> => {
  if (!selectedDate) return [];
  
  const alternatives: Array<{
    date: Date;
    dayName: string;
    dayNumber: number;
    monthName: string;
    isAvailable: boolean;
    isSelected: boolean;
    timeSlotsAvailable: number;
  }> = [];
  
  for (let i = -daysRange/2; i <= daysRange/2; i++) {
    if (i === 0) continue;
    
    const date = new Date(selectedDate);
    date.setDate(selectedDate.getDate() + i);
    
    if (date < new Date()) continue;
    
    const isAvailable = isDateAvailable(date);
    const timeSlots = isAvailable ? getPrivateTimeSlotsForDate(date) : [];
    
    alternatives.push({
      date,
      dayName: format(date, 'EEE'),
      dayNumber: date.getDate(),
      monthName: format(date, 'MMM'),
      isAvailable,
      isSelected: false,
      timeSlotsAvailable: timeSlots.length,
    });
  }
  
  return alternatives
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 6);
};

// Use pricing defaults from shared constants
const BASE_PRIVATE_HOURLY_RATE = PRICING_DEFAULTS.BASE_HOURLY_RATE / 100; // Convert from cents to dollars

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

// Helper function to determine boat capacity based on group size - rounds UP to appropriate boat size
const getBoatCapacityForGroup = (groupSize: number): number => {
  if (groupSize <= 15) return 15;  // small dayTripper boats
  if (groupSize <= 25) return 25;  // medium boats
  if (groupSize <= 50) return 50;  // large boats
  return 75;  // extra large boats (up to GROUP_SIZE_MAX)
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
    selectedTimeSlot: '',
    selectedAddOnPackages: [],
    selectedDiscoPackage: null,
    selectedDiscoTimeSlot: '',
    discoTicketQuantity: 1,
  });

  const [leadId, setLeadId] = useState<string | null>(null);
  const [leadCreated, setLeadCreated] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [leadTrackingEnabled, setLeadTrackingEnabled] = useState(true);
  const [availabilityCache, setAvailabilityCache] = useState<Map<string, any>>(new Map());
  
  // Partial lead capture system
  const [chatSessionId] = useState<string>(() => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [partialLeadSaved, setPartialLeadSaved] = useState(false);
  const partialLeadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { toast } = useToast();

  // Debounced function to save partial lead data in real-time
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
            await apiRequest('POST', '/api/partial-leads/save', {
              sessionId: chatSessionId,
              name: [contactData.firstName?.trim(), contactData.lastName?.trim()]
                .filter(Boolean).join(' ') || undefined,
              email: contactData.email?.trim() || undefined,
              phone: contactData.phone?.trim() || undefined,
              eventType: formData.eventType || undefined,
              eventTypeLabel: formData.eventTypeLabel || undefined,
              groupSize: formData.groupSize || undefined,
              preferredDate: formData.eventDate?.toISOString() || undefined,
              chatbotData: {
                currentStep,
                completedSelections,
                selectedCruiseType: formData.selectedCruiseType,
                selectedTimeSlot: formData.selectedTimeSlot,
                selectedDiscoPackage: formData.selectedDiscoPackage,
                selectedAddOnPackages: formData.selectedAddOnPackages,
                budget: formData.budget,
                specialRequests: formData.specialRequests,
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
    [chatSessionId, formData, currentStep, completedSelections, partialLeadSaved]
  );

  // Enhanced form data setter that triggers partial lead save
  const updateFormDataWithAutoSave = useCallback(
    (updates: Partial<BookingData>) => {
      const newFormData = { ...formData, ...updates };
      setFormData(newFormData);
      
      // Trigger partial lead save for contact fields
      if ('firstName' in updates || 'lastName' in updates || 'email' in updates || 'phone' in updates) {
        debouncedSavePartialLead({
          firstName: newFormData.firstName,
          lastName: newFormData.lastName,
          email: newFormData.email,
          phone: newFormData.phone,
        });
      }
    },
    [formData, debouncedSavePartialLead]
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
    if (!formData.selectedTimeSlot) {
      const availableTimeSlots = getPrivateTimeSlotsForDate(formData.eventDate);
      const defaultTimeSlot = availableTimeSlots.find(slot => slot.popular) || availableTimeSlots[0];
      
      if (defaultTimeSlot) {
        updates.selectedCruiseType = 'private';
        updates.selectedTimeSlot = defaultTimeSlot.id;
        updates.selectedAddOnPackages = [];
      }
    }
    
    // For bachelor/bachelorette parties, ensure disco options are available but don't auto-select
    // Let users choose between disco and private options in the comparison view
    if ((formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') &&
        isDiscoAvailableForDate(formData.eventDate)) {
      // Reset any previous disco selections to force user choice in comparison view
      updates.selectedDiscoPackage = null;
      updates.selectedDiscoTimeSlot = '';
      // Don't auto-select cruise type - let user choose between disco and private
      if (formData.selectedCruiseType === 'disco') {
        updates.selectedCruiseType = null;
      }
      updates.discoTicketQuantity = Math.min(formData.groupSize, 10); // Set reasonable default quantity
    }
    
    // For all other event types with disco available, use minimum quantity
    else if (isDiscoAvailableForDate(formData.eventDate) && 
             (!formData.selectedDiscoPackage || !formData.selectedDiscoTimeSlot)) {
      const availableDiscoSlots = getDiscoTimeSlotsForDate(formData.eventDate);
      const defaultDiscoSlot = availableDiscoSlots[0];
      const defaultDiscoPackage = discoPackages[0];
      
      if (defaultDiscoSlot && defaultDiscoPackage) {
        updates.selectedDiscoPackage = defaultDiscoPackage.id as DiscoPackage;
        updates.selectedDiscoTimeSlot = defaultDiscoSlot.id;
        updates.discoTicketQuantity = Math.min(formData.groupSize, 10);
      }
    }

    // Apply all updates in a single setState call
    if (Object.keys(updates).length > 0) {
      setFormData(prev => ({ ...prev, ...updates }));
    }
  }, [currentStep, formData.groupSize, formData.eventType, formData.eventDate?.getTime(), formData.selectedTimeSlot, formData.selectedDiscoPackage, formData.selectedDiscoTimeSlot]);

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
    if (!formData.selectedTimeSlot || !formData.groupSize) {
      setPrivatePricing(null);
      return;
    }

    // Create a unique key for current pricing parameters
    const pricingKey = JSON.stringify({
      timeSlot: formData.selectedTimeSlot,
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
  }, [formData.selectedTimeSlot, formData.selectedAddOnPackages, formData.groupSize, formData.eventDate?.getTime()]);
  
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
    if (!formData.selectedTimeSlot) return;
    
    console.log('🚢 fetchPrivatePricing called with:', {
      selectedTimeSlot: formData.selectedTimeSlot,
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
        timeSlot: formData.selectedTimeSlot,
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
    if (!formData.selectedTimeSlot) {
      console.log('🚢 calculatePrivatePricing early return - no timeSlot');
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
      selectedTimeSlot: '',
      selectedAddOnPackages: [],
      selectedDiscoPackage: null as DiscoPackage | null,
      selectedDiscoTimeSlot: '',
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
          selectedTimeSlot: '',
          selectedAddOnPackages: [],
          selectedDiscoPackage: null,
          selectedDiscoTimeSlot: '',
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
      selectedTimeSlot: '',
      selectedAddOnPackages: [],
      selectedDiscoPackage: null,
      selectedDiscoTimeSlot: '',
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
          selectedTimeSlot: '',
          selectedAddOnPackages: [],
          selectedDiscoPackage: null,
          selectedDiscoTimeSlot: '',
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
  const handlePrivateCruiseSelect = useCallback((timeSlot: string) => {
    // Prevent interactions during loading states
    if (pricingLoading || paymentProcessing || formSubmitting) {
      console.log('🚢 Ignoring selection - system is busy');
      return;
    }
    
    console.log('🚢 handlePrivateCruiseSelect called with timeSlot:', timeSlot);
    setFormData(prev => {
      const newData = {
        ...prev,
        selectedCruiseType: 'private' as CruiseType,
        selectedTimeSlot: timeSlot,
      };
      console.log('🚢 Setting form data to:', newData);
      return newData;
    });
  }, [pricingLoading, paymentProcessing, formSubmitting]);
  
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
  const handleDiscoCruiseSelect = useCallback((packageId: string, timeSlot: string) => {
    // Prevent interactions during loading states
    if (pricingLoading || paymentProcessing || formSubmitting) {
      console.log('🎵 Ignoring selection - system is busy');
      return;
    }
    
    console.log('🎵 handleDiscoCruiseSelect called with package:', packageId, 'timeSlot:', timeSlot);
    setFormData(prev => ({
      ...prev, 
      selectedCruiseType: 'disco' as CruiseType,
      selectedDiscoPackage: packageId as DiscoPackage,
      selectedDiscoTimeSlot: timeSlot
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
    
    // Cruise type specific validation
    if (cruiseType === 'private') {
      if (!data.selectedTimeSlot) errors.push('Please select a time slot for private cruise');
      if (data.eventDate && !getPrivateTimeSlotsForDate(data.eventDate).find(slot => slot.id === data.selectedTimeSlot)) {
        errors.push('Selected time slot is not available for the chosen date');
      }
    }
    
    if (cruiseType === 'disco') {
      if (!data.selectedDiscoPackage) errors.push('Please select a disco package');
      if (!data.selectedDiscoTimeSlot) errors.push('Please select a disco time slot');
      if (data.discoTicketQuantity <= 0) errors.push('Disco ticket quantity must be at least 1');
      if (data.eventDate && !isDiscoAvailableForDate(data.eventDate)) {
        errors.push('Disco cruises are only available on Friday, Saturday, and Sunday');
      }
      if (data.eventDate && data.selectedDiscoTimeSlot && 
          !getDiscoTimeSlotsForDate(data.eventDate).find(slot => slot.id === data.selectedDiscoTimeSlot)) {
        errors.push('Selected disco time slot is not available for the chosen date');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }, []);

  // Enhanced payment handler with comprehensive validation and loading protection
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
    
    // Comprehensive validation including contact information (required for payment)
    const validation = validateBookingData(formData, cruiseType, true);
    if (!validation.isValid) {
      console.log('💳 Validation failed:', validation.errors);
      toast({
        title: "Incomplete Information",
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

      // Create selection payload with all form data
      const selectionPayload = {
        cruiseType,
        groupSize: formData.groupSize,
        eventDate: formData.eventDate ? formData.eventDate.toISOString() : null,
        eventType: formData.eventType,
        eventTypeLabel: formData.eventTypeLabel,
        eventEmoji: formData.eventEmoji,
        // For private cruises
        selectedTimeSlot: formData.selectedTimeSlot,
        selectedAddOnPackages: formData.selectedAddOnPackages,
        // For disco cruises  
        selectedDiscoPackage: formData.selectedDiscoPackage,
        selectedDiscoTimeSlot: formData.selectedDiscoTimeSlot,
        discoTicketQuantity: formData.discoTicketQuantity,
      };

      console.log('💳 Making API call to /api/checkout/create-session with payload:', {
        paymentType,
        selectionPayload
      });

      const response = await apiRequest("POST", "/api/checkout/create-session", {
        paymentType,
        customerEmail: formData.email.trim(), // Pass actual customer email
        selectionPayload,
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
      console.error('💳 Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to start payment process. Please try again.",
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
      console.error('Contact form submission error:', error);
      toast({
        title: "Submission Error",
        description: "Failed to submit contact information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setFormSubmitting(false);
    }
  }, [formData, formSubmitting, pricingLoading, paymentProcessing, toast]);

  // Create lead mutation
  const createLead = useMutation({
    mutationFn: async (data: BookingData) => {
      // Step 1: Create lead and project using the new booking endpoint
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
        timeSlot: data.selectedCruiseType === 'private' ? data.selectedTimeSlot : data.selectedDiscoTimeSlot,
        discoPackage: data.selectedDiscoPackage,
        budget: (data.selectedCruiseType === 'private' ? privatePricing?.total : discoPricing?.total)?.toString(),
        data: {
          eventTypeLabel: data.eventTypeLabel,
          discoTicketQuantity: data.discoTicketQuantity
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
            const timeSlotLabel = getDiscoTimeSlotsForDate(data.eventDate!).find(slot => 
              slot.id === data.selectedDiscoTimeSlot
            )?.label || data.selectedDiscoTimeSlot;
            
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
          const timeSlotLabel = getPrivateTimeSlotsForDate(data.eventDate!).find(slot => 
            slot.id === data.selectedTimeSlot
          )?.label || data.selectedTimeSlot;
          
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

                  <div className="flex justify-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8"
                    >
                      <CalendarComponent
                        mode="single"
                        selected={formData.eventDate}
                        onSelect={handleDateSelect}
                        disabled={(date: Date) => !isDateAvailable(date)}
                        className="mx-auto"
                        classNames={{
                          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                          month: "space-y-4",
                          caption: "flex justify-center pt-1 relative items-center text-lg font-semibold",
                          caption_label: "text-lg font-semibold",
                          nav: "space-x-1 flex items-center",
                          nav_button: "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100",
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                          table: "w-full border-collapse space-y-1",
                          head_row: "flex",
                          head_cell: "text-slate-500 dark:text-slate-400 rounded-md w-12 font-normal text-sm",
                          row: "flex w-full mt-2",
                          cell: "h-12 w-12 text-center text-sm p-0 relative",
                          day: "h-12 w-12 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200 rounded-md transition-colors",
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
                              <CardTitle>Private Cruise (Fits {getBoatCapacityForGroup(formData.groupSize)} People)</CardTitle>
                              <CardDescription>Exclusive boat for your group • {getCruiseDuration(formData.eventDate)} hour cruise</CardDescription>
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
                              value={formData.selectedTimeSlot || ''}
                              onValueChange={handlePrivateCruiseSelect}
                            >
                              {getPrivateTimeSlotsForDate(formData.eventDate!).map((slot) => (
                                <div key={slot.id} className="flex items-center space-x-2">
                                  <RadioGroupItem value={slot.id} id={`private-${slot.id}`} />
                                  <Label htmlFor={`private-${slot.id}`} className="flex-1 cursor-pointer">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span>{slot.icon}</span>
                                        <span>{slot.label}</span>
                                        {slot.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                                      </div>
                                      <span className="text-sm text-slate-600 dark:text-slate-400">{slot.duration}hrs</span>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>

                          {/* Step 2: Package Add-Ons - Only show if time slot selected */}
                          {formData.selectedTimeSlot && (
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
                          {formData.selectedTimeSlot && (
                            <div className="border-t pt-4">
                              {pricingLoading ? (
                                <div className="flex items-center justify-center py-8">
                                  <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
                                  <span className="text-slate-600 dark:text-slate-400">Calculating pricing...</span>
                                </div>
                              ) : privatePricing ? (
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-4 border-t">
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
                              disabled={!formData.selectedTimeSlot || !privatePricing}
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
                              disabled={!formData.selectedTimeSlot || !privatePricing}
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
                              disabled={!formData.selectedTimeSlot}
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

                      {/* Disco Cruise or Alternative Dates */}
                      {(formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') && isDiscoAvailableForDate(formData.eventDate!) ? (
                        <Card className={cn(
                          "bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm cursor-pointer transition-all",
                          formData.selectedCruiseType === 'disco' && "ring-2 ring-purple-600"
                        )}>
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                <Music className="h-6 w-6 text-purple-600" />
                              </div>
                              <div>
                                <CardTitle>ATX Disco Cruise</CardTitle>
                                <CardDescription>Join the party cruise</CardDescription>
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
                                value={formData.selectedDiscoTimeSlot || ''}
                                onValueChange={(timeSlot) => {
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedDiscoTimeSlot: timeSlot,
                                  }));
                                }}
                              >
                                {getDiscoTimeSlotsForDate(formData.eventDate!).map((slot) => (
                                  <div key={slot.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={slot.id} id={`disco-time-${slot.id}`} />
                                    <Label htmlFor={`disco-time-${slot.id}`} className="flex-1 cursor-pointer">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <span>{slot.icon}</span>
                                          <span>{slot.label}</span>
                                          {slot.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                                        </div>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">{slot.duration}hrs</span>
                                      </div>
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>

                            {/* Step 2: Package Selection - Only show if time slot selected */}
                            {formData.selectedDiscoTimeSlot && (
                              <div className="space-y-3 border-t pt-4">
                                <Label className="flex items-center gap-2">
                                  <Music className="h-4 w-4" />
                                  Select Package
                                </Label>
                                <RadioGroup
                                  value={formData.selectedDiscoPackage || ''}
                                  onValueChange={(packageId) => {
                                    setFormData(prev => ({
                                      ...prev,
                                      selectedDiscoPackage: packageId as DiscoPackage,
                                    }));
                                  }}
                                >
                                  {discoPackages.map((pkg) => (
                                    <div key={pkg.id} className="flex items-center space-x-2">
                                      <RadioGroupItem value={pkg.id} id={`disco-${pkg.id}`} />
                                      <Label htmlFor={`disco-${pkg.id}`} className="flex-1 cursor-pointer">
                                        <div className="space-y-1">
                                          <div className="flex justify-between items-center">
                                            <span className="font-medium">{pkg.name}</span>
                                            <span className="font-bold text-purple-600">${pkg.price}/person</span>
                                          </div>
                                          <div className="text-sm text-slate-600 dark:text-slate-400">
                                            {pkg.description}
                                          </div>
                                        </div>
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                                
                                {/* Ticket Quantity - Show if package selected */}
                                {formData.selectedDiscoPackage && (
                                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg mt-4">
                                    <Label className="mb-2 block">Number of Tickets</Label>
                                    <div className="flex items-center gap-4">
                                      <Button
                                        onClick={() => setFormData(prev => ({ 
                                          ...prev, 
                                          discoTicketQuantity: Math.max(1, prev.discoTicketQuantity - 1) 
                                        }))}
                                        size="sm"
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                      >
                                        <Minus className="h-4 w-4" />
                                      </Button>
                                      <div className="flex-1 text-center">
                                        <div className="text-2xl font-bold text-purple-600">{formData.discoTicketQuantity}</div>
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
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Step 3: Pricing Details - Only show if both time slot AND package selected */}
                            {formData.selectedDiscoTimeSlot && formData.selectedDiscoPackage && discoPricing && (
                              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 border-t">
                                <div className="text-center mb-4">
                                  <div className="text-3xl font-bold text-purple-600">
                                    {formatCurrency(discoPricing.total)}
                                  </div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {formatCurrency(discoPricing.perPersonCost)} per person
                                  </div>
                                </div>
                                
                                {/* Detailed Pricing Breakdown */}
                                <div className="space-y-2 text-sm border-t pt-3">
                                  <div className="flex justify-between">
                                    <span>Subtotal ({getCruiseDuration(formData.eventDate)}hr cruise):</span>
                                    <span>{formatCurrency(discoPricing.subtotal)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Tax (8.25%):</span>
                                    <span>{formatCurrency(discoPricing.tax)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Gratuity (20%):</span>
                                    <span>{formatCurrency(discoPricing.gratuity)}</span>
                                  </div>
                                  <div className="flex justify-between font-bold border-t pt-2">
                                    <span>Grand Total:</span>
                                    <span>{formatCurrency(discoPricing.total)}</span>
                                  </div>
                                  <div className="flex justify-between text-green-600">
                                    <span>Deposit ({discoPricing.depositPercent}%):</span>
                                    <span>{formatCurrency(discoPricing.depositAmount)}</span>
                                  </div>
                                  <div className="flex justify-between text-slate-600">
                                    <span>Balance Due:</span>
                                    <span>{formatCurrency(discoPricing.total - discoPricing.depositAmount)}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Payment Buttons */}
                            <div className="space-y-2">
                              <Button
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, selectedCruiseType: 'disco' }));
                                  handlePayment('deposit', 'disco');
                                }}
                                disabled={!formData.selectedDiscoPackage || !discoPricing}
                                className="w-full bg-green-600 hover:bg-green-700"
                                data-testid="button-disco-deposit"
                              >
                                <CreditCard className="h-4 w-4 mr-2" />
                                Pay {discoPricing?.depositPercent || 25}% Deposit ({discoPricing ? formatCurrency(discoPricing.depositAmount) : '$0'})
                              </Button>
                              
                              <Button
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, selectedCruiseType: 'disco' }));
                                  handlePayment('full', 'disco');
                                }}
                                disabled={!formData.selectedDiscoPackage || !discoPricing}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
                                disabled={!formData.selectedDiscoPackage}
                                variant="outline"
                                className="w-full"
                                data-testid="button-disco-quote"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                Send Me My Quote
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-green-600" />
                              </div>
                              <div>
                                <CardTitle>Alternative Dates</CardTitle>
                                <CardDescription>Similar availability nearby</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {getAlternativeDates(formData.eventDate!, formData.groupSize).map((altDate) => (
                              <Button
                                key={altDate.date.toISOString()}
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, eventDate: altDate.date }));
                                  setCurrentStep('comparison-selection');
                                }}
                                variant="outline"
                                className="w-full justify-between"
                                disabled={!altDate.isAvailable}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="text-left">
                                    <div className="font-medium">{altDate.dayName}, {altDate.monthName} {altDate.dayNumber}</div>
                                    <div className="text-sm text-slate-500">
                                      {altDate.timeSlotsAvailable} time slots available
                                    </div>
                                  </div>
                                </div>
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            ))}
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