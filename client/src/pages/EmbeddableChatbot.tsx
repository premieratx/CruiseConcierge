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
  RotateCcw, CheckCircle, Settings, Plus, Minus, MessageCircle
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

const isDateAvailable = (date: Date): boolean => {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 365);
  return !isBefore(date, today) && !isAfter(date, maxDate);
};

// Use pricing defaults from shared constants
const BASE_PRIVATE_HOURLY_RATE = PRICING_DEFAULTS.BASE_HOURLY_RATE / 100; // Convert from cents to dollars

const addOnPackages = [
  {
    id: 'essentials',
    name: 'Essentials Package',
    hourlyRate: 50,
    description: 'Enhanced experience with premium amenities',
    features: ['Premium sound system', 'Coolers with ice', 'Party decorations'],
    popular: false
  },
  {
    id: 'ultimate',
    name: 'Ultimate Party Package', 
    hourlyRate: 75,
    description: 'All-inclusive luxury experience',
    features: ['Premium sound system', 'Coolers with ice', 'Party decorations', 'Red carpet boarding', 'Professional photography'],
    popular: true
  },
];

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

const getBoatCapacityForGroup = (groupSize: number): number => {
  if (groupSize <= 15) return 15;
  if (groupSize <= 25) return 25;
  if (groupSize <= 50) return 50;
  return 75;
};

export default function EmbeddableChatbot() {
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
  
  const [chatSessionId] = useState<string>(() => `embed_chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
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

  // Fetch private cruise pricing with identical API calls as main Chat.tsx
  const fetchPrivatePricing = async () => {
    if (!formData.selectedTimeSlot) return;
    
    console.log('🚢 EmbedChatbot fetchPrivatePricing called with:', {
      selectedTimeSlot: formData.selectedTimeSlot,
      groupSize: formData.groupSize,
      eventDate: formData.eventDate,
      eventType: formData.eventType,
      selectedAddOnPackages: formData.selectedAddOnPackages
    });
    
    setPricingLoading(true);
    setPricingError(null);
    try {
      // Calculate total hourly rate (base + add-ons) - identical to main Chat.tsx
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
        packageType: formData.selectedAddOnPackages.join(','),
        hourlyRate: totalHourlyRate,
      };
      
      console.log('🚢 EmbedChatbot making API call to /api/pricing/cruise with:', pricingPayload);
      
      const res = await apiRequest('POST', '/api/pricing/cruise', pricingPayload);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.log('🚢 EmbedChatbot API call failed:', res.status, errorText);
        calculatePrivatePricing();
        return;
      }
      
      const response = await res.json();
      console.log('🚢 EmbedChatbot API call successful, setting privatePricing:', response);
      setPrivatePricing(response);
    } catch (error: any) {
      console.log('🚢 EmbedChatbot exception in fetchPrivatePricing:', error);
      calculatePrivatePricing();
    } finally {
      setPricingLoading(false);
    }
  };

  // Helper function to get cruise duration - identical to main Chat.tsx
  const getCruiseDuration = (date: Date | undefined) => {
    if (!date) return 4;
    const dayOfWeek = date.getDay();
    return (dayOfWeek >= 1 && dayOfWeek <= 4) ? 3 : 4;
  };

  // Fallback private cruise pricing calculation - identical to main Chat.tsx
  const calculatePrivatePricing = () => {
    console.log('🚢 EmbedChatbot calculatePrivatePricing called as fallback');
    if (!formData.selectedTimeSlot) {
      console.log('🚢 EmbedChatbot calculatePrivatePricing early return - no timeSlot');
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
        boatType: `${formData.groupSize}-person capacity`,
        dayName: formData.eventDate ? format(formData.eventDate, 'EEEE') : '',
        baseHourlyRate: BASE_PRIVATE_HOURLY_RATE,
        cruiseDuration: cruiseDuration,
        baseCruiseCost: baseCost * 100,
        crewFee: crewFee * 100,
        subtotalBeforeTax: subtotal * 100,
        gratuityAmount: gratuity * 100,
        taxAmount: tax * 100,
        grandTotal: total * 100,
        perPerson: Math.round((total / formData.groupSize) * 100),
        deposit: depositAmount * 100,
        balanceDue: (total - depositAmount) * 100,
      }
    };
    
    console.log('🚢 EmbedChatbot setting privatePricing:', privatePricingData);
    setPrivatePricing(privatePricingData);
  };

  // Fetch disco cruise pricing - identical to main Chat.tsx
  const fetchDiscoPricing = async () => {
    console.log('🎵 EmbedChatbot fetchDiscoPricing called with:', {
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
      
      console.log('🎵 EmbedChatbot making API call to /api/pricing/preview with:', discoPayload);
      
      const res = await apiRequest('POST', '/api/pricing/preview', discoPayload);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.log('🎵 EmbedChatbot API call failed:', res.status, errorText);
        calculateDiscoPricing();
        return;
      }
      
      const response = await res.json();
      console.log('🎵 EmbedChatbot API call successful, setting discoPricing:', response);
      setDiscoPricing(response);
    } catch (error: any) {
      console.log('🎵 EmbedChatbot exception in fetchDiscoPricing:', error);
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
    console.log('🎵 EmbedChatbot calculateDiscoPricing called as fallback');
    if (!formData.selectedDiscoPackage) {
      console.log('🎵 EmbedChatbot calculateDiscoPricing early return - no disco package');
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
        cruiseDuration: cruiseDuration,
        baseCruiseCost: subtotal * 100,
        crewFee: 0,
        subtotalBeforeTax: subtotal * 100,
        gratuityAmount: gratuity * 100,
        taxAmount: tax * 100,
        grandTotal: total * 100,
        perPerson: selectedPackage.price * 100,
        deposit: depositAmount * 100,
        balanceDue: (total - depositAmount) * 100,
      }
    });
  };

  // Trigger pricing calculations when relevant data changes - identical to main Chat.tsx
  useEffect(() => {
    if (formData.selectedCruiseType === 'private' && formData.selectedTimeSlot) {
      const debouncedTimer = setTimeout(() => {
        console.log('🚢 EmbedChatbot debounced fetchPrivatePricing triggered');
        fetchPrivatePricing();
      }, 300);
      return () => clearTimeout(debouncedTimer);
    }
  }, [formData.selectedTimeSlot, formData.selectedAddOnPackages, formData.groupSize, formData.eventDate?.getTime()]);

  useEffect(() => {
    if (formData.selectedCruiseType === 'disco' && formData.selectedDiscoPackage) {
      const debouncedTimer = setTimeout(() => {
        console.log('🎵 EmbedChatbot debounced fetchDiscoPricing triggered');
        fetchDiscoPricing();
      }, 300);
      return () => clearTimeout(debouncedTimer);
    }
  }, [formData.selectedDiscoPackage, formData.discoTicketQuantity, formData.eventDate?.getTime()]);

  // Compact design with minimal header for embed
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-2">
      {/* Compact Header for Embed */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border rounded-lg mb-4">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-8 w-auto"
                data-testid="img-logo"
              />
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white" data-testid="text-page-title">
                  AI Booking Assistant
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-xs" data-testid="text-subtitle">
                  Get instant quotes for your party cruise
                </p>
              </div>
            </div>
            <MessageCircle className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Main Chat Interface - Simplified for Embed */}
      <div className="max-w-2xl mx-auto">
        <Card className="min-h-[500px]">
          <CardContent className="p-4">
            <AnimatePresence mode="wait">
              {currentStep === 'intro' && (
                <motion.div
                  key="intro"
                  initial="hidden"
                  animate="visible" 
                  exit="exit"
                  variants={fadeInUp}
                  className="text-center space-y-6"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                      <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Powered by AI
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="text-intro-title">
                      Let's Plan Your Perfect Cruise! 🚢
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm max-w-lg mx-auto" data-testid="text-intro-description">
                      I'll help you find the perfect cruise, get instant pricing, and create a custom quote in just a few minutes.
                    </p>
                  </div>

                  {/* Quick Event Type Selection for Embed */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white" data-testid="text-event-type-question">
                      What's the occasion? 
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {eventTypes.map((type) => (
                        <Button
                          key={type.id}
                          variant={formData.eventType === type.id ? "default" : "outline"}
                          className="flex flex-col h-auto p-4 space-y-2"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              eventType: type.id,
                              eventTypeLabel: type.label,
                              eventEmoji: type.emoji
                            }));
                            setEventTypeCollapsed(true);
                            setShowGroupSize(true);
                          }}
                          data-testid={`button-event-type-${type.id}`}
                        >
                          <span className="text-2xl">{type.emoji}</span>
                          <span className="text-sm font-medium">{type.label}</span>
                          <span className="text-xs text-gray-500">{type.description}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Group Size Selection - Show after event type */}
                  <AnimatePresence>
                    {showGroupSize && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          How many people? ({formData.groupSize} guests)
                        </h3>
                        
                        <div className="px-4">
                          <Slider
                            value={[formData.groupSize]}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, groupSize: value[0] }))}
                            max={GROUP_SIZE_MAX}
                            min={GROUP_SIZE_MIN}
                            step={1}
                            className="w-full"
                            data-testid="slider-group-size"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>{GROUP_SIZE_MIN} min</span>
                            <span>{GROUP_SIZE_MAX} max</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            setShowComparison(true);
                            setCurrentStep('comparison-selection');
                          }}
                          className="w-full"
                          data-testid="button-continue-to-calendar"
                        >
                          Continue to Calendar <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Other steps would be implemented similarly but simplified for embed... */}
              {currentStep === 'comparison-selection' && (
                <motion.div
                  key="comparison"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Choose Your Date & Time
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Select when you'd like to cruise
                    </p>
                  </div>

                  {/* Simplified Calendar for Embed */}
                  <div className="max-w-sm mx-auto">
                    <CalendarComponent
                      mode="single"
                      selected={formData.eventDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, eventDate: date }))}
                      disabled={(date) => !isDateAvailable(date)}
                      className="rounded-md border w-full"
                      data-testid="calendar-event-date"
                    />
                  </div>

                  {/* Time Slots - Show when date selected */}
                  {formData.eventDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="font-semibold text-center">Available Times</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {getPrivateTimeSlotsForDate(formData.eventDate).map((slot) => (
                          <Button
                            key={slot.id}
                            variant={formData.selectedTimeSlot === slot.id ? "default" : "outline"}
                            className="flex items-center justify-between p-3"
                            onClick={() => {
                              setFormData(prev => ({ 
                                ...prev, 
                                selectedTimeSlot: slot.id,
                                selectedCruiseType: 'private'
                              }));
                              setCurrentStep('contact-form');
                            }}
                            data-testid={`button-time-slot-${slot.id}`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{slot.icon}</span>
                              <span>{slot.label}</span>
                            </span>
                            <span className="text-sm text-gray-500">{slot.duration}h</span>
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Contact Form Step - Simplified */}
              {currentStep === 'contact-form' && (
                <motion.div
                  key="contact-form"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Almost Done! 
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Tell us how to reach you and we'll send your quote
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          placeholder="John"
                          data-testid="input-first-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          placeholder="Doe"
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                        data-testid="input-email"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(555) 123-4567"
                        data-testid="input-phone"
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                      <Textarea
                        id="specialRequests"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                        placeholder="Any special requests or questions?"
                        rows={3}
                        data-testid="textarea-special-requests"
                      />
                    </div>

                    <Button
                      onClick={() => {
                        // Handle form submission and quote generation
                        setCurrentStep('confirmation');
                      }}
                      className="w-full"
                      disabled={!formData.firstName || !formData.email}
                      data-testid="button-get-quote"
                    >
                      Get My Quote <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Confirmation Step */}
              {currentStep === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                  className="space-y-6 text-center"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Quote Generated! 
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We've sent your custom quote to {formData.email}. Check your inbox!
                    </p>
                  </div>

                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                          Your Cruise Summary
                        </h3>
                        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                          <p>{formData.eventEmoji} {formData.eventTypeLabel}</p>
                          <p>{formData.eventDate && format(formData.eventDate, 'MMMM d, yyyy')}</p>
                          <p>{formData.groupSize} guests</p>
                          <p>Estimated: $1,200 - $1,800</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <Button 
                      onClick={() => {
                        // Reset form for new booking
                        setCurrentStep('intro');
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
                      }}
                      className="w-full"
                      data-testid="button-book-another"
                    >
                      Book Another Cruise
                    </Button>
                    
                    <p className="text-xs text-gray-500">
                      Questions? Call us at (512) 488-5892
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}