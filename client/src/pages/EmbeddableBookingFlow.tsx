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

export default function EmbeddableBookingFlow() {
  const [currentStep, setCurrentStep] = useState<ChatFlowStep>('intro');
  const [completedSelections, setCompletedSelections] = useState<CompletedSelection[]>([]);
  const [privatePricing, setPrivatePricing] = useState<PricingPreview | null>(null);
  const [discoPricing, setDiscoPricing] = useState<PricingPreview | null>(null);
  const [generatedQuoteId, setGeneratedQuoteId] = useState<string | null>(null);
  const [secureQuoteUrl, setSecureQuoteUrl] = useState<string | null>(null);
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

  // Parse URL query parameters for theme and preview mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    const preview = urlParams.get('preview');
    const fullscreen = urlParams.get('fullscreen');
    
    // Apply theme to document root
    if (theme) {
      const htmlElement = document.documentElement;
      htmlElement.classList.remove('light', 'dark');
      if (theme === 'dark') {
        htmlElement.classList.add('dark');
      } else if (theme === 'light') {
        htmlElement.classList.add('light');
      } else if (theme === 'auto') {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.classList.add(prefersDark ? 'dark' : 'light');
      }
    }

    // Add preview mode class if needed
    if (preview === 'true') {
      document.body.classList.add('embed-preview-mode');
    }

    // Add fullscreen class if needed
    if (fullscreen === 'true') {
      document.body.classList.add('embed-fullscreen');
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('embed-preview-mode', 'embed-fullscreen');
    };
  }, []);

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

  // Get cruise duration based on event date (weekday = 3hrs, weekend = 4hrs)
  const getCruiseDuration = (date?: Date): number => {
    if (!date) return 3;
    const dayOfWeek = date.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 4 ? 3 : 4; // Weekdays: 3hrs, Weekends: 4hrs
  };

  // Calculate private cruise pricing locally for immediate feedback
  const calculatePrivatePricing = useCallback((): PricingPreview | null => {
    if (!formData.selectedTimeSlot || !formData.groupSize || !formData.eventDate) {
      return null;
    }

    const selectedTimeSlot = getPrivateTimeSlotsForDate(formData.eventDate).find(
      slot => slot.id === formData.selectedTimeSlot
    );
    
    if (!selectedTimeSlot) return null;

    // Calculate base cost
    const baseHourlyRate = BASE_PRIVATE_HOURLY_RATE; // $200/hour
    const addOnHourlyRate = formData.selectedAddOnPackages.reduce((sum, addOnId) => {
      const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
      return sum + (addOn?.hourlyRate || 0);
    }, 0);
    
    const totalHourlyRate = baseHourlyRate + addOnHourlyRate;
    const cruiseDuration = selectedTimeSlot.duration;
    const baseCruiseCost = totalHourlyRate * cruiseDuration;
    
    // Crew fee for larger groups (>30 people)
    const crewFee = formData.groupSize > 30 ? 150 : 0;
    
    const subtotal = (baseCruiseCost + crewFee) * 100; // Convert to cents
    const taxRate = 0.0825; // 8.25%
    const gratuityRate = 0.20; // 20%
    
    const tax = Math.round(subtotal * taxRate);
    const gratuity = Math.round(subtotal * gratuityRate);
    const total = subtotal + tax + gratuity;
    
    const depositPercent = 25;
    const depositAmount = Math.round(total * (depositPercent / 100));
    const perPersonCost = Math.round(total / formData.groupSize);

    return {
      subtotal,
      tax,
      gratuity,
      total,
      perPersonCost,
      depositRequired: true,
      depositPercent,
      depositAmount,
      discountTotal: 0,
      appliedDiscounts: [],
      paymentSchedule: [
        { line: 1, due: 'Due Now', percent: depositPercent },
        { line: 2, due: 'Event Date', percent: 100 - depositPercent }
      ],
      breakdown: {
        boatType: getBoatCapacityForGroup(formData.groupSize) <= 25 ? 'Day Tripper' : 'Premium Yacht',
        dayName: format(formData.eventDate, 'EEEE'),
        baseHourlyRate: BASE_PRIVATE_HOURLY_RATE,
        cruiseDuration,
        baseCruiseCost,
        crewFee,
        subtotalBeforeTax: subtotal / 100,
        gratuityAmount: gratuity / 100,
        taxAmount: tax / 100,
        grandTotal: total / 100,
        perPerson: perPersonCost / 100,
        deposit: depositAmount / 100,
        balanceDue: (total - depositAmount) / 100
      }
    };
  }, [formData.selectedTimeSlot, formData.selectedAddOnPackages, formData.groupSize, formData.eventDate]);

  // Calculate disco pricing locally for immediate feedback
  const calculateDiscoPricing = useCallback((): PricingPreview | null => {
    if (!formData.selectedDiscoPackage || formData.discoTicketQuantity <= 0) {
      return null;
    }

    const selectedPackage = discoPackages.find(pkg => pkg.id === formData.selectedDiscoPackage);
    if (!selectedPackage) return null;

    const subtotal = selectedPackage.price * formData.discoTicketQuantity * 100; // Convert to cents
    const taxRate = 0.0825; // 8.25%
    const gratuityRate = 0.20; // 20%
    
    const tax = Math.round(subtotal * taxRate);
    const gratuity = Math.round(subtotal * gratuityRate);
    const total = subtotal + tax + gratuity;
    
    const depositPercent = 25;
    const depositAmount = Math.round(total * (depositPercent / 100));
    const perPersonCost = Math.round(total / formData.discoTicketQuantity);

    return {
      subtotal,
      tax,
      gratuity,
      total,
      perPersonCost,
      depositRequired: true,
      depositPercent,
      depositAmount,
      discountTotal: 0,
      appliedDiscounts: [],
      paymentSchedule: [
        { line: 1, due: 'Due Now', percent: depositPercent },
        { line: 2, due: 'Event Date', percent: 100 - depositPercent }
      ],
      breakdown: {
        boatType: 'Disco Cruise',
        dayName: formData.eventDate ? format(formData.eventDate, 'EEEE') : '',
        baseHourlyRate: selectedPackage.price,
        cruiseDuration: 4,
        baseCruiseCost: selectedPackage.price * formData.discoTicketQuantity,
        crewFee: 0,
        subtotalBeforeTax: subtotal / 100,
        gratuityAmount: gratuity / 100,
        taxAmount: tax / 100,
        grandTotal: total / 100,
        perPerson: perPersonCost / 100,
        deposit: depositAmount / 100,
        balanceDue: (total - depositAmount) / 100
      }
    };
  }, [formData.selectedDiscoPackage, formData.discoTicketQuantity]);

  // Fetch pricing from backend API
  const fetchPrivatePricing = useCallback(async () => {
    if (!formData.selectedTimeSlot || !formData.groupSize || !formData.eventDate) {
      setPrivatePricing(null);
      return;
    }

    try {
      setPricingLoading(true);
      setPricingError(null);
      
      const response = await apiRequest('POST', '/api/pricing/private', {
        timeSlot: formData.selectedTimeSlot,
        addOnPackages: formData.selectedAddOnPackages,
        groupSize: formData.groupSize,
        eventDate: formData.eventDate.toISOString(),
        eventType: formData.eventType,
      });

      if (response.ok) {
        const pricing = await response.json();
        setPrivatePricing(pricing);
      } else {
        console.error('Pricing API error:', response.status);
        // Fallback to local calculation
        const localPricing = calculatePrivatePricing();
        setPrivatePricing(localPricing);
      }
    } catch (error) {
      console.error('Failed to fetch private pricing:', error);
      // Fallback to local calculation
      const localPricing = calculatePrivatePricing();
      setPrivatePricing(localPricing);
    } finally {
      setPricingLoading(false);
    }
  }, [formData.selectedTimeSlot, formData.selectedAddOnPackages, formData.groupSize, formData.eventDate, formData.eventType, calculatePrivatePricing]);

  const fetchDiscoPricing = useCallback(async () => {
    if (!formData.selectedDiscoPackage || formData.discoTicketQuantity <= 0) {
      setDiscoPricing(null);
      return;
    }

    try {
      setPricingLoading(true);
      setPricingError(null);
      
      const response = await apiRequest('POST', '/api/pricing/disco', {
        package: formData.selectedDiscoPackage,
        quantity: formData.discoTicketQuantity,
        eventDate: formData.eventDate?.toISOString(),
      });

      if (response.ok) {
        const pricing = await response.json();
        setDiscoPricing(pricing);
      } else {
        console.error('Disco pricing API error:', response.status);
        // Fallback to local calculation
        const localPricing = calculateDiscoPricing();
        setDiscoPricing(localPricing);
      }
    } catch (error) {
      console.error('Failed to fetch disco pricing:', error);
      // Fallback to local calculation
      const localPricing = calculateDiscoPricing();
      setDiscoPricing(localPricing);
    } finally {
      setPricingLoading(false);
    }
  }, [formData.selectedDiscoPackage, formData.discoTicketQuantity, formData.eventDate, calculateDiscoPricing]);

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
        const localPricing = calculatePrivatePricing();
        setPrivatePricing(localPricing);
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
        const localPricing = calculateDiscoPricing();
        setDiscoPricing(localPricing);
      }
    }, 300); // 300ms debounce
  }, [formData.selectedDiscoPackage, formData.discoTicketQuantity, formData.eventDate?.getTime()]);

  // Cleanup pricing timeout on unmount
  useEffect(() => {
    return () => {
      if (pricingTimeoutRef.current) {
        clearTimeout(pricingTimeoutRef.current);
      }
    };
  }, []);

  // Handle event type selection
  const handleEventTypeSelect = useCallback((eventTypeId: string) => {
    const selectedEventType = eventTypes.find(type => type.id === eventTypeId);
    
    if (selectedEventType) {
      // Reset auto-selection tracking when event type changes
      autoSelectionRef.current.hasAutoSelected = false;
      
      const selectionToAdd = {
        id: 'event-type',
        label: 'Event',
        value: selectedEventType.label,
        emoji: selectedEventType.emoji,
        editable: true,
        onEdit: () => {
          autoSelectionRef.current.hasAutoSelected = false;
          setFormData(prev => ({
            ...prev,
            eventType: '',
            eventTypeLabel: '',
            eventEmoji: '',
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
          setCompletedSelections(prev => prev.filter(s => s.id !== 'event-type'));
        }
      };
      
      const formDataUpdates = {
        eventType: eventTypeId,
        eventTypeLabel: selectedEventType.label,
        eventEmoji: selectedEventType.emoji,
        selectedAddOnPackages: [], // Start with no add-ons selected
      };
      
      // Apply all updates in one batch
      addCompletedSelection(selectionToAdd);
      setEventTypeCollapsed(true);
      setShowGroupSize(true);
      setFormData(prev => ({ ...prev, ...formDataUpdates }));
    }
  }, [toast]);

  // Handle group size selection
  const handleGroupSizeSelect = useCallback((groupSize: number) => {
    // Reset auto-selection tracking when group size changes
    autoSelectionRef.current.hasAutoSelected = false;
    
    const selectionToAdd = {
      id: 'group-size',
      label: 'Group Size',
      value: `${groupSize} people`,
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
    
    // Determine default disco package and calculate defaults
    const defaultDiscoPackage = discoPackages[0];
    
    const formDataUpdates = {
      groupSize: groupSize,
      selectedAddOnPackages: [], // Start with no add-ons selected
      selectedDiscoPackage: defaultDiscoPackage.id as DiscoPackage,
      discoTicketQuantity: Math.min(groupSize, 10),
    };
    
    // Apply all updates in one batch
    addCompletedSelection(selectionToAdd);
    setShowComparison(true);
    setFormData(prev => ({ ...prev, ...formDataUpdates }));
  }, [toast]);

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
      setSecureQuoteUrl(quoteResult.quoteUrl);
      
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

      {/* Main Chat Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            {currentStep === 'intro' && (
              <motion.div
                key="intro"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                {/* Header */}
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="relative">
                      <img src={logoPath} alt="Premier Party Cruises" className="h-16 w-auto" />
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        AI Booking
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Book Your Perfect Cruise
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      Tell us about your event and we'll find the perfect cruise experience for you!
                    </p>
                  </div>
                </div>

                {/* Calendar Selection */}
                <Card className="max-w-md mx-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-blue-600" />
                      When's your event?
                    </CardTitle>
                    <CardDescription>Select your preferred date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CalendarComponent
                      mode="single"
                      selected={formData.eventDate}
                      onSelect={(date) => {
                        if (date) {
                          setFormData(prev => ({ ...prev, eventDate: date }));
                          proceedToComparison(date);
                        }
                      }}
                      disabled={(date) => !isDateAvailable(date)}
                      className="rounded-md border-0"
                      data-testid="calendar-selector"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'comparison-selection' && (
              <motion.div
                key="comparison"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {/* Back Button */}
                <Button
                  onClick={handleNavigateBack}
                  variant="ghost"
                  className="mb-4"
                  data-testid="button-back"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                {/* Step 1: Event Type Selection */}
                <AnimatePresence>
                  {!eventTypeCollapsed && (
                    <motion.div
                      initial={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">What's the occasion?</h2>
                        <p className="text-slate-600 dark:text-slate-400">Choose your event type</p>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
                        {eventTypes.map((eventType) => (
                          <Button
                            key={eventType.id}
                            onClick={() => handleEventTypeSelect(eventType.id)}
                            variant="outline"
                            className={cn(
                              "h-auto p-4 flex flex-col items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20",
                              formData.eventType === eventType.id && "ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-900/20"
                            )}
                            data-testid={`button-event-${eventType.id}`}
                          >
                            <span className="text-2xl">{eventType.emoji}</span>
                            <span className="text-sm font-medium text-center">{eventType.label}</span>
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step 2: Group Size Selection */}
                <AnimatePresence>
                  {eventTypeCollapsed && showGroupSize && !showComparison && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">How many people?</h2>
                        <p className="text-slate-600 dark:text-slate-400">Select your group size</p>
                      </div>

                      <Card className="max-w-lg mx-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                        <CardContent className="p-6 space-y-6">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">{formData.groupSize}</div>
                            <div className="text-slate-600 dark:text-slate-400">people</div>
                          </div>
                          
                          <Slider
                            value={[formData.groupSize]}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, groupSize: value[0] }))}
                            min={GROUP_SIZE_MIN}
                            max={GROUP_SIZE_MAX}
                            step={1}
                            className="w-full"
                            data-testid="slider-group-size"
                          />
                          
                          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                            <span>{GROUP_SIZE_MIN}</span>
                            <span>{GROUP_SIZE_MAX}</span>
                          </div>
                          
                          <Button
                            onClick={() => handleGroupSizeSelect(formData.groupSize)}
                            className="w-full"
                            data-testid="button-confirm-group-size"
                          >
                            Continue with {formData.groupSize} people
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step 3: Cruise Comparison */}
                <AnimatePresence>
                  {showComparison && formData.eventDate && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Choose Your Experience</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          Perfect options for {formData.groupSize} people on {format(formData.eventDate, 'EEEE, MMMM do')}
                        </p>
                      </div>

                      <div className="grid gap-6 max-w-5xl mx-auto lg:grid-cols-2">
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
                                <CardTitle>Private Charter</CardTitle>
                                <CardDescription>Exclusive boat just for your group</CardDescription>
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

                            {/* Step 2: Add-On Packages - Only show if time slot selected */}
                            {formData.selectedTimeSlot && (
                              <div className="space-y-3 border-t pt-4">
                                <Label className="flex items-center gap-2">
                                  <Star className="h-4 w-4" />
                                  Optional Add-On Packages
                                </Label>
                                <div className="space-y-2">
                                  {addOnPackages.map((addOn) => (
                                    <div
                                      key={addOn.id}
                                      className={cn(
                                        "p-3 border rounded-lg cursor-pointer transition-colors",
                                        formData.selectedAddOnPackages.includes(addOn.id)
                                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                      )}
                                      onClick={() => handleAddOnPackageToggle(addOn.id)}
                                    >
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium">{addOn.name}</span>
                                            {addOn.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                                          </div>
                                          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {addOn.description}
                                          </div>
                                          <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                            {addOn.features.join(' • ')}
                                          </div>
                                        </div>
                                        <div className="text-right ml-4">
                                          <div className="font-bold text-green-600">+${addOn.hourlyRate}/hr</div>
                                          <div className="text-xs text-slate-500">
                                            +${addOn.hourlyRate * getCruiseDuration(formData.eventDate)} total
                                          </div>
                                        </div>
                                      </div>
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
                                    proceedToComparison(altDate.date);
                                  }}
                                  variant="outline"
                                  className="w-full justify-start h-auto p-3"
                                  disabled={!altDate.isAvailable}
                                  data-testid={`button-alt-date-${format(altDate.date, 'yyyy-MM-dd')}`}
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <div>
                                      <div className="font-medium">{altDate.dayName}, {altDate.monthName} {altDate.dayNumber}</div>
                                      <div className="text-sm text-slate-500">
                                        {altDate.timeSlotsAvailable} time slots available
                                      </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4" />
                                  </div>
                                </Button>
                              ))}
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {currentStep === 'contact-form' && (
              <motion.div
                key="contact-form"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-2xl mx-auto"
              >
                <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Contact Information
                    </CardTitle>
                    <CardDescription>We'll send your quote and booking details here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => updateFormDataWithAutoSave({ firstName: e.target.value })}
                            placeholder="John"
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
                            placeholder="Doe"
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
                          placeholder="john@example.com"
                          required
                          data-testid="input-email"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormDataWithAutoSave({ phone: e.target.value })}
                          placeholder="(555) 123-4567"
                          data-testid="input-phone"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialRequests">Special Requests or Questions</Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                          placeholder="Any special requests, dietary restrictions, or questions?"
                          rows={3}
                          data-testid="textarea-special-requests"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          onClick={handleNavigateBack}
                          variant="outline"
                          className="flex-1"
                          data-testid="button-back-contact"
                        >
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={formSubmitting || createLead.isPending}
                          className="flex-1"
                          data-testid="button-send-quote"
                        >
                          {formSubmitting || createLead.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Sending Quote...
                            </>
                          ) : (
                            <>
                              <FileText className="h-4 w-4 mr-2" />
                              Send My Quote
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'confirmation' && (
              <motion.div
                key="confirmation"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-2xl mx-auto text-center space-y-8"
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-6 h-6 bg-green-600 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Quote Sent Successfully!
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    We've sent your personalized quote to your email and phone. 
                    Our team will follow up within 15 minutes to confirm details and answer any questions.
                  </p>
                </div>

                <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-left">
                  <CardHeader>
                    <CardTitle className="text-center">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-600 dark:text-slate-400">Event:</span>
                        <div className="flex items-center gap-2">
                          <span>{formData.eventEmoji}</span>
                          <span>{formData.eventTypeLabel}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-slate-600 dark:text-slate-400">Date:</span>
                        <div>{formData.eventDate ? format(formData.eventDate, 'EEEE, MMMM do, yyyy') : 'TBD'}</div>
                      </div>
                      <div>
                        <span className="font-medium text-slate-600 dark:text-slate-400">Group Size:</span>
                        <div>{formData.groupSize} people</div>
                      </div>
                      <div>
                        <span className="font-medium text-slate-600 dark:text-slate-400">Cruise Type:</span>
                        <div className="capitalize">{formData.selectedCruiseType} cruise</div>
                      </div>
                    </div>
                    
                    {(privatePricing || discoPricing) && (
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">Total Cost:</span>
                          <span className="text-2xl font-bold text-green-600">
                            {formatCurrency((formData.selectedCruiseType === 'disco' ? discoPricing : privatePricing)?.total || 0)}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Deposit: {formatCurrency((formData.selectedCruiseType === 'disco' ? discoPricing : privatePricing)?.depositAmount || 0)} ({(formData.selectedCruiseType === 'disco' ? discoPricing : privatePricing)?.depositPercent || 25}%)
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {generatedQuoteId && (
                  <div className="space-y-4 text-center">
                    <p className="text-slate-600 dark:text-slate-400">
                      Quote ID: <span className="font-mono font-bold">{generatedQuoteId}</span>
                    </p>
                    
                    <Button
                      onClick={() => window.location.href = secureQuoteUrl || `/quote/${generatedQuoteId}`}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                      data-testid="button-view-quote"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Your Quote
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => {
                      // Reset form for new booking
                      setCurrentStep('intro');
                      setCompletedSelections([]);
                      setFormData({
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
                      setPrivatePricing(null);
                      setDiscoPricing(null);
                      setGeneratedQuoteId(null);
                      // Reset auto-selection tracking
                      autoSelectionRef.current.hasAutoSelected = false;
                    }}
                    variant="outline"
                    data-testid="button-book-another"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Book Another Event
                  </Button>
                </div>

                <div className="text-sm text-slate-500 dark:text-slate-500">
                  Questions? Call us at <a href="tel:+15127737117" className="text-blue-600 hover:underline">(512) 773-7117</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}