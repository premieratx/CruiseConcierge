import { useState, useEffect } from 'react';
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

type Question = 
  | 'event-type' 
  | 'group-size-selection'
  | 'comparison-selection'
  | 'contact-info' 
  | 'date-selection' 
  | 'time-slot-selection'
  | 'boat-selection'
  | 'package-selection'
  | 'complete';

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
  groupSize: number; // Changed from string to number for slider
  specialRequests: string;
  budget: string;
  // New comparison fields
  selectedCruiseType: CruiseType | null;
  selectedTimeSlot: string;
  selectedPrivatePackage: string | null; // New field for private packages
  selectedBoat?: string; // Selected boat ID
  selectedDiscoPackage: DiscoPackage | null;
  selectedDiscoTimeSlot: string;
  discoTicketQuantity: number; // Number of disco cruise tickets (1-50)
  // Additional labels for display
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

const eventTypes = [
  { id: 'bachelor', label: 'Bachelor Party', emoji: '🎉', description: 'Celebrate the groom-to-be' },
  { id: 'bachelorette', label: 'Bachelorette Party', emoji: '💃', description: 'Party with the bride-to-be' },
  { id: 'corporate', label: 'Corporate Event', emoji: '💼', description: 'Team building & networking' },
  { id: 'wedding', label: 'Wedding Reception', emoji: '💒', description: 'Celebrate your special day' },
  { id: 'birthday', label: 'Birthday Party', emoji: '🎂', description: 'Make it memorable' },
  { id: 'graduation', label: 'Graduation Party', emoji: '🎓', description: 'Celebrate achievements' },
  { id: 'anniversary', label: 'Anniversary', emoji: '💝', description: 'Mark your milestone' },
  { id: 'other', label: 'Other Event', emoji: '🎊', description: 'Custom celebration' },
];

const getPrivateTimeSlotsForDate = (date: Date) => {
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Monday-Thursday
    return [
      { id: '10am-2pm', label: '10am-2pm', time: '10am-2pm', icon: '🌅', popular: false },
      { id: '11am-3pm', label: '11am-3pm', time: '11am-3pm', icon: '🌞', popular: false },
      { id: '12pm-4pm', label: '12pm-4pm', time: '12pm-4pm', icon: '☀️', popular: true },
      { id: '1pm-5pm', label: '1pm-5pm', time: '1pm-5pm', icon: '☀️', popular: true },
      { id: '2pm-6pm', label: '2pm-6pm', time: '2pm-6pm', icon: '🌆', popular: true },
      { id: '3pm-7pm', label: '3pm-7pm', time: '3pm-7pm', icon: '🌆', popular: true },
      { id: '4pm-8pm', label: '4pm-8pm', time: '4pm-8pm', icon: '🌅', popular: false },
      { id: '4:30pm-8:30pm', label: '4:30pm-8:30pm', time: '4:30pm-8:30pm', icon: '🌙', popular: false },
    ];
  } else if (dayOfWeek === 5) { // Friday
    return [
      { id: '12pm-4pm', label: '12pm-4pm', time: '12pm-4pm', icon: '☀️', popular: true },
      { id: '4:30pm-8:30pm', label: '4:30pm-8:30pm', time: '4:30pm-8:30pm', icon: '🌙', popular: true },
    ];
  } else { // Saturday/Sunday
    return [
      { id: '11am-3pm', label: '11am-3pm', time: '11am-3pm', icon: '☀️', popular: true },
      { id: '3:30pm-7:30pm', label: '3:30pm-7:30pm', time: '3:30pm-7:30pm', icon: '🌆', popular: true },
    ];
  }
};

// ATX Disco Cruise specific time slots
const getDiscoTimeSlotsForDate = (date: Date) => {
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 5) { // Friday
    return [
      { id: 'disco-fri-12pm-4pm', label: '12:00 PM - 4:00 PM', time: '12pm-4pm', icon: '🕛', popular: true },
    ];
  } else if (dayOfWeek === 6) { // Saturday
    return [
      { id: 'disco-sat-11am-3pm', label: '11:00 AM - 3:00 PM', time: '11am-3pm', icon: '🕚', popular: true },
      { id: 'disco-sat-3:30pm-7:30pm', label: '3:30 PM - 7:30 PM', time: '3:30pm-7:30pm', icon: '🕞', popular: true },
    ];
  } else {
    return []; // No disco cruises on other days
  }
};

// Check if disco cruise is available for date
const isDiscoAvailableForDate = (date: Date) => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 5 || dayOfWeek === 6; // Friday or Saturday only
};

// Date availability validation function
const isDateAvailable = (date: Date): boolean => {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 365);
  return !isBefore(date, today) && !isAfter(date, maxDate);
};

// Check availability using new calendar system
const checkAvailabilityForDate = async (date: Date, cruiseType: 'private' | 'disco', groupSize: number) => {
  try {
    const response = await fetch(`/api/availability/check?` + new URLSearchParams({
      date: date.toISOString(),
      duration: '4', // 4 hour cruises
      groupSize: groupSize.toString(),
      type: cruiseType
    }));
    
    if (!response.ok) throw new Error('Failed to check availability');
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error checking availability:', error);
    return { available: false, reason: 'Unable to check availability' };
  }
};

// Get alternative dates around the selected date for the same group size
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
  
  // Get dates from 7 days before to 7 days after the selected date
  for (let i = -daysRange/2; i <= daysRange/2; i++) {
    if (i === 0) continue; // Skip the selected date itself
    
    const date = new Date(selectedDate);
    date.setDate(selectedDate.getDate() + i);
    
    // Skip dates in the past
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
  
  // Sort by date and limit to next 6 dates
  return alternatives
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 6);
};

// Private cruise packages
const privatePackages = [
  {
    id: 'essentials',
    name: 'Essentials Package',
    hourlyRate: 50, // per hour
    description: 'Perfect for intimate celebrations',
    features: ['4-hour cruise', 'Captain & crew', 'Basic sound system', 'Coolers with ice'],
    popular: false
  },
  {
    id: 'ultimate',
    name: 'Ultimate Party Package', 
    hourlyRate: 75, // per hour
    description: 'Premium party experience',
    features: ['4-hour cruise', 'Captain & crew', 'Premium sound system', 'Coolers with ice', 'Party decorations', 'Red carpet boarding'],
    popular: true
  },
];

// Disco cruise packages
const discoPackages = [
  { 
    id: 'basic', 
    name: 'Basic Bach Package', 
    price: 85, // per person
    description: 'Essential disco cruise experience',
    features: ['4-hour cruise', 'DJ & dancing', 'Party atmosphere', 'Cash bar']
  },
  { 
    id: 'disco_queen', 
    name: 'Disco Queen Package', 
    price: 95, // per person
    description: 'Enhanced party experience',
    features: ['4-hour cruise', 'Premium DJ', 'Welcome drink', 'Party favors', 'Cash bar']
  },
  { 
    id: 'platinum', 
    name: 'Supabase Platinum Disco Package', 
    price: 105, // per person
    description: 'Ultimate disco cruise luxury',
    features: ['4-hour cruise', 'Premium DJ', '2 Welcome drinks', 'VIP area access', 'Party favors', 'Priority boarding']
  },
];

// Group size constraints
const GROUP_SIZE_MIN = 8;
const GROUP_SIZE_MAX = 75;
const GROUP_SIZE_DEFAULT = 20;

// Animation variants
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

const slideUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const condenseAnimation = {
  initial: { scale: 1, opacity: 1 },
  condensed: { 
    scale: 0.8, 
    opacity: 0.9,
    transition: { duration: 0.4, ease: "easeInOut" }
  }
};

export default function Chat() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>('event-type');
  const [completedSelections, setCompletedSelections] = useState<CompletedSelection[]>([]);
  const [privatePricing, setPrivatePricing] = useState<PricingPreview | null>(null);
  const [discoPricing, setDiscoPricing] = useState<PricingPreview | null>(null);
  const [generatedQuoteId, setGeneratedQuoteId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<'deposit' | 'full'>('deposit');
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingError, setPricingError] = useState<string | null>(null);
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
    selectedPrivatePackage: null,
    selectedDiscoPackage: null,
    selectedDiscoTimeSlot: '',
    discoTicketQuantity: 1,
  });
  const [questionHistory, setQuestionHistory] = useState<Question[]>(['event-type']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [maxProgressIndex, setMaxProgressIndex] = useState(0);
  // Lead tracking state
  const [leadId, setLeadId] = useState<string | null>(null);
  const [leadCreated, setLeadCreated] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [leadTrackingEnabled, setLeadTrackingEnabled] = useState(true);
  const [availabilityCache, setAvailabilityCache] = useState<Map<string, any>>(new Map());
  const { toast } = useToast();

  // Check real-time availability for a date
  const checkDateAvailability = async (date: Date) => {
    const cacheKey = date.toISOString().split('T')[0];
    if (availabilityCache.has(cacheKey)) {
      return availabilityCache.get(cacheKey);
    }
    
    const availability = await checkAvailabilityForDate(
      date,
      formData.selectedCruiseType || 'private',
      formData.groupSize || 25
    );
    
    setAvailabilityCache(prev => new Map(prev).set(cacheKey, availability));
    return availability;
  };

  // Fetch private cruise pricing when package and group size are available (date optional for early pricing)
  useEffect(() => {
    if (formData.selectedPrivatePackage && formData.groupSize) {
      fetchPrivatePricing();
    }
  }, [formData.selectedPrivatePackage, formData.groupSize]);
  
  // Auto-select default options when reaching comparison page for immediate pricing display
  useEffect(() => {
    if (currentQuestion === 'comparison-selection' && formData.groupSize > 0) {
      
      // Auto-select private cruise defaults if not already selected
      if (!formData.selectedTimeSlot || !formData.selectedPrivatePackage) {
        const availableTimeSlots = getPrivateTimeSlotsForDate(formData.eventDate);
        const defaultTimeSlot = availableTimeSlots.find(slot => slot.popular) || availableTimeSlots[0];
        const defaultPrivatePackage = privatePackages.find(pkg => pkg.popular) || privatePackages[0];
        
        if (defaultTimeSlot && defaultPrivatePackage) {
          setFormData(prev => ({
            ...prev,
            selectedCruiseType: 'private',
            selectedTimeSlot: defaultTimeSlot.id,
            selectedPrivatePackage: defaultPrivatePackage.id,
          }));
        }
      }
      
      // Auto-select disco cruise defaults if available and not already selected
      if (isDiscoAvailableForDate(formData.eventDate) && 
          (!formData.selectedDiscoPackage || !formData.selectedDiscoTimeSlot)) {
        const availableDiscoSlots = getDiscoTimeSlotsForDate(formData.eventDate);
        const defaultDiscoSlot = availableDiscoSlots[0];
        const defaultDiscoPackage = discoPackages[0]; // Basic package
        
        if (defaultDiscoSlot && defaultDiscoPackage) {
          setFormData(prev => ({
            ...prev,
            selectedDiscoPackage: defaultDiscoPackage.id as DiscoPackage,
            selectedDiscoTimeSlot: defaultDiscoSlot.id,
            discoTicketQuantity: Math.min(prev.groupSize, 10), // Default to group size or 10
          }));
        }
      }
    }
  }, [currentQuestion, formData.eventDate, formData.eventType]);
  
  // Fetch disco pricing when package and quantity are available (date optional for early pricing)
  useEffect(() => {
    if (formData.selectedDiscoPackage && formData.discoTicketQuantity) {
      fetchDiscoPricing();
    }
  }, [formData.selectedDiscoPackage, formData.discoTicketQuantity]);

  // Immediate pricing calculation for disco quantity changes - ensures real-time updates
  useEffect(() => {
    if (formData.selectedDiscoPackage && formData.discoTicketQuantity > 0) {
      // Use local calculation for immediate feedback when quantity changes
      calculateDiscoPricing();
    }
  }, [formData.discoTicketQuantity]);

  // Fetch private cruise pricing with loading state
  const fetchPrivatePricing = async () => {
    if (!formData.selectedPrivatePackage) {
      calculatePrivatePricing();
      return;
    }
    
    setPricingLoading(true);
    setPricingError(null);
    try {
      const selectedPackage = privatePackages.find(pkg => pkg.id === formData.selectedPrivatePackage);
      if (!selectedPackage) {
        throw new Error('Selected package not found');
      }
      
      const res = await apiRequest('POST', '/api/pricing/cruise', {
        groupSize: formData.groupSize,
        eventDate: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : '',
        timeSlot: formData.selectedTimeSlot,
        eventType: formData.eventType,
        cruiseType: 'private',
        packageType: selectedPackage.id,
        hourlyRate: selectedPackage.hourlyRate,
      });
      
      if (!res.ok) {
        console.warn('API pricing failed, using local calculation');
        calculatePrivatePricing();
        return;
      }
      
      const response = await res.json();
      if (!response || typeof response.total !== 'number') {
        console.warn('Invalid API response, using local calculation');
        calculatePrivatePricing();
        return;
      }
      
      setPrivatePricing(response);
      setPricingError(null);
    } catch (error: any) {
      console.warn('Failed to fetch private pricing via API, using local calculation:', error);
      calculatePrivatePricing();
    } finally {
      setPricingLoading(false);
    }
  };
  
  // Fallback private cruise pricing calculation (used when API fails)
  const calculatePrivatePricing = () => {
    if (!formData.selectedPrivatePackage) return;
    
    const selectedPackage = privatePackages.find(pkg => pkg.id === formData.selectedPrivatePackage);
    if (!selectedPackage) return;
    
    const cruiseDuration = 4; // 4 hours
    const baseCost = selectedPackage.hourlyRate * cruiseDuration;
    const crewFee = formData.groupSize > 20 ? 200 : 0; // Additional crew for larger groups
    const subtotal = baseCost + crewFee;
    const tax = Math.round(subtotal * 0.0825); // 8.25% tax
    const gratuity = Math.round(subtotal * 0.20); // 20% gratuity
    const total = subtotal + tax + gratuity;
    
    setPrivatePricing({
      subtotal: subtotal * 100, // Convert to cents
      tax: tax * 100,
      total: total * 100,
      perPersonCost: Math.round((total / formData.groupSize) * 100),
      discountTotal: 0,
      gratuity: gratuity * 100,
      depositRequired: true,
      depositPercent: 25,
      depositAmount: Math.round(total * 0.25) * 100,
      paymentSchedule: [],
      appliedDiscounts: [],
      breakdown: {
        boatType: selectedPackage.name,
        dayName: formData.eventDate ? format(formData.eventDate, 'EEEE') : '',
        baseHourlyRate: selectedPackage.hourlyRate,
        cruiseDuration,
        baseCruiseCost: baseCost,
        crewFee,
        subtotalBeforeTax: subtotal,
        gratuityAmount: gratuity,
        taxAmount: tax,
        grandTotal: total,
        perPerson: Math.round(total / formData.groupSize),
        deposit: Math.round(total * 0.25),
        balanceDue: total - Math.round(total * 0.25),
      }
    });
  };
  
  // Fetch disco cruise pricing using API for consistency
  const fetchDiscoPricing = async () => {
    setPricingLoading(true);
    setPricingError(null);
    try {
      // Use pricing/preview endpoint with disco cruise products
      const res = await apiRequest('POST', '/api/pricing/preview', {
        items: [{
          productId: `disco_${formData.selectedDiscoPackage}`,
          qty: formData.discoTicketQuantity,
          unitPrice: getDiscoPriceByPackage(formData.selectedDiscoPackage),
        }],
        groupSize: formData.discoTicketQuantity,
        projectDate: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : '',
      });
      
      if (!res.ok) {
        throw new Error('API request failed, using fallback calculation');
      }
      
      const response = await res.json();
      if (!response || typeof response.total !== 'number') {
        throw new Error('Invalid response, using fallback calculation');
      }
      
      setDiscoPricing(response);
      setPricingError(null);
    } catch (error: any) {
      console.warn('API pricing failed, using local calculation:', error.message);
      // Fallback to local calculation if API fails
      calculateDiscoPricing();
    } finally {
      setPricingLoading(false);
    }
  };
  
  // Helper function to get disco package price
  const getDiscoPriceByPackage = (packageId: string | null): number => {
    const packagePrices = {
      'basic': 8500, // $85.00 in cents
      'disco_queen': 9500, // $95.00 in cents  
      'platinum': 10500, // $105.00 in cents
    };
    return packagePrices[packageId as keyof typeof packagePrices] || 8500;
  };
  
  // Fallback disco cruise pricing calculation (used when API fails)
  const calculateDiscoPricing = () => {
    if (!formData.selectedDiscoPackage) return;
    
    const selectedPackage = discoPackages.find(pkg => pkg.id === formData.selectedDiscoPackage);
    if (!selectedPackage) return;
    
    const subtotal = selectedPackage.price * formData.discoTicketQuantity;
    const gratuity = Math.round(subtotal * 0.20); // 20% gratuity (FIXED: was missing)
    const tax = Math.round(subtotal * 0.0825); // 8.25% tax
    const total = subtotal + gratuity + tax; // Fix: include gratuity in total
    
    // Store calculated totals for the selected package
    setDiscoPricing({
      subtotal: subtotal * 100, // Convert to cents
      tax: tax * 100,
      total: total * 100, // Now includes gratuity
      perPersonCost: selectedPackage.price * 100,
      discountTotal: 0,
      gratuity: gratuity * 100, // Fix: now includes actual 20% gratuity
      depositRequired: true,
      depositPercent: 25,
      depositAmount: Math.round(total * 0.25) * 100, // 25% of total including gratuity
      paymentSchedule: [],
      appliedDiscounts: [],
      breakdown: {
        boatType: selectedPackage.name,
        dayName: formData.eventDate ? format(formData.eventDate, 'EEEE') : '',
        baseHourlyRate: Math.round(selectedPackage.price / 4), // Hourly rate for 4-hour cruise
        cruiseDuration: 4,
        baseCruiseCost: selectedPackage.price,
        crewFee: 0,
        subtotalBeforeTax: subtotal,
        gratuityAmount: gratuity, // Fix: now shows actual gratuity amount
        taxAmount: tax,
        grandTotal: total, // Now includes gratuity
        perPerson: selectedPackage.price,
        deposit: Math.round(total * 0.25), // 25% of total including gratuity
        balanceDue: total - Math.round(total * 0.25),
      }
    });
  };

  // Enhanced Navigation functions - RESTRUCTURED FLOW for early pricing
  const questionOrder: Question[] = [
    'event-type', 'group-size-selection', 'date-selection', 
    'comparison-selection', 'contact-info', 'complete'
  ];

  const getQuestionIndex = (question: Question) => questionOrder.indexOf(question);
  
  const canGoBack = () => currentQuestionIndex > 0;
  
  const canGoForward = () => currentQuestionIndex < maxProgressIndex;
  
  const goBack = () => {
    if (canGoBack()) {
      const newIndex = currentQuestionIndex - 1;
      const previousQuestion = questionOrder[newIndex];
      setCurrentQuestionIndex(newIndex);
      setCurrentQuestion(previousQuestion);
    }
  };
  
  const goForward = () => {
    if (canGoForward()) {
      const newIndex = currentQuestionIndex + 1;
      const nextQuestion = questionOrder[newIndex];
      setCurrentQuestionIndex(newIndex);
      setCurrentQuestion(nextQuestion);
    }
  };
  
  const goToQuestion = (question: Question) => {
    const questionIndex = getQuestionIndex(question);
    if (questionIndex !== -1 && questionIndex <= maxProgressIndex) {
      setCurrentQuestion(question);
      setCurrentQuestionIndex(questionIndex);
    }
  };
  
  const updateProgress = (question: Question) => {
    const questionIndex = getQuestionIndex(question);
    if (questionIndex > maxProgressIndex) {
      setMaxProgressIndex(questionIndex);
    }
    setCurrentQuestionIndex(questionIndex);
  };
  
  // Enhanced edit functionality for all completed selections
  const resetDependentSelections = (fromSelectionId: string) => {
    const resetMap: Record<string, string[]> = {
      'event-type': ['contact-info', 'date', 'group-size', 'comparison'],
      'contact-info': ['date', 'group-size', 'comparison'],
      'date': ['group-size', 'comparison'],
      'group-size': ['comparison'],
    };
    
    const toReset = resetMap[fromSelectionId] || [];
    
    // Clear dependent form data
    if (fromSelectionId === 'event-type') {
      setFormData(prev => ({
        ...prev,
        eventType: '',
        eventTypeLabel: '',
        eventEmoji: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        eventDate: undefined,
        selectedCruiseType: null,
        selectedTimeSlot: '',
        selectedPrivatePackage: null,
        selectedDiscoPackage: null,
        selectedDiscoTimeSlot: '',
        discoTicketQuantity: 1,
      }));
    } else if (fromSelectionId === 'contact-info') {
      setFormData(prev => ({
        ...prev,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        eventDate: undefined,
        selectedCruiseType: null,
        selectedTimeSlot: '',
        selectedPrivatePackage: null,
        selectedDiscoPackage: null,
        selectedDiscoTimeSlot: '',
        discoTicketQuantity: 1,
      }));
    } else if (fromSelectionId === 'date') {
      setFormData(prev => ({
        ...prev,
        eventDate: undefined,
        selectedCruiseType: null,
        selectedTimeSlot: '',
        selectedPrivatePackage: null,
        selectedDiscoPackage: null,
        selectedDiscoTimeSlot: '',
        discoTicketQuantity: 1,
      }));
    } else if (fromSelectionId === 'group-size') {
      setFormData(prev => ({
        ...prev,
        selectedCruiseType: null,
        selectedTimeSlot: '',
        selectedPrivatePackage: null,
        selectedDiscoPackage: null,
        selectedDiscoTimeSlot: '',
        discoTicketQuantity: 1,
      }));
    }
    
    // Clear pricing when relevant
    if (['date', 'group-size', 'comparison'].includes(fromSelectionId)) {
      setPrivatePricing(null);
      setDiscoPricing(null);
    }
    
    // Remove dependent selections from completed list
    setCompletedSelections(prev => 
      prev.filter(selection => !toReset.includes(selection.id))
    );
  };

  const editSelection = (selectionId: string) => {
    // Reset dependent selections
    resetDependentSelections(selectionId);
    
    // Remove this selection from completed list
    setCompletedSelections(prev => prev.filter(s => s.id !== selectionId));
    
    // Navigate to the appropriate question
    const questionMap: Record<string, Question> = {
      'event-type': 'event-type',
      'contact-info': 'contact-info',
      'date': 'date-selection',
      'group-size': 'group-size-selection', // Group size is now on separate page
      'comparison': 'comparison-selection',
    };
    
    const targetQuestion = questionMap[selectionId];
    if (targetQuestion) {
      goToQuestion(targetQuestion);
    }
  };
  
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  // Calculate if event is within 30 days
  const isWithin30Days = () => {
    if (!formData.eventDate) return false;
    const today = startOfDay(new Date());
    const eventDate = startOfDay(formData.eventDate);
    return differenceInDays(eventDate, today) <= 30;
  };

  // Get payment options based on date and selected cruise type
  const getPaymentOptions = (pricingData: PricingPreview | null) => {
    if (!pricingData) return [];
    
    const within30Days = isWithin30Days();
    const options = [];
    
    if (!within30Days) {
      options.push({
        id: 'deposit',
        label: 'Pay Deposit',
        amount: pricingData.depositAmount,
        description: `${pricingData.depositPercent}% deposit to secure your booking`,
        popular: true
      });
    }
    
    options.push({
      id: 'full',
      label: within30Days ? 'Pay in Full (Required)' : 'Pay in Full',
      amount: pricingData.total,
      description: within30Days ? 'Full payment required - event is within 30 days' : 'Complete payment now',
      popular: within30Days
    });
    
    return options;
  };

  const addCompletedSelection = (selection: CompletedSelection) => {
    // Add edit functionality to selections
    const editableSelection = {
      ...selection,
      editable: true,
      onEdit: () => editSelection(selection.id)
    };
    setCompletedSelections(prev => {
      // Replace existing selection with same id, or add new one
      const filtered = prev.filter(s => s.id !== selection.id);
      return [...filtered, editableSelection];
    });
  };

  const progressToNextQuestion = () => {
    const currentIndex = getQuestionIndex(currentQuestion);
    if (currentIndex < questionOrder.length - 2) { // -2 to exclude 'complete'
      const nextQuestion = questionOrder[currentIndex + 1];
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        updateProgress(nextQuestion);
      }, 150); // Reduced delay by 75% for faster transitions
    }
  };

  // Event Type Selection Handler
  const handleEventTypeSelect = (eventType: string, label: string, emoji: string) => {
    setFormData({ ...formData, eventType, eventTypeLabel: label, eventEmoji: emoji });
    addCompletedSelection({
      id: 'event-type',
      label: 'Event Type',
      value: label,
      emoji: emoji
    });
    // Skip contact info and go directly to date selection
    setCurrentQuestion('date-selection');
    updateProgress('date-selection');
  };

  // Immediate lead creation mutation - creates lead as soon as contact info is entered
  const createImmediateLead = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone?: string;
      eventType?: string;
      eventTypeLabel?: string;
    }) => {
      const sessionId = Date.now().toString(); // Use timestamp as session ID
      const response = await apiRequest('POST', '/api/leads/immediate', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        eventType: data.eventType,
        eventTypeLabel: data.eventTypeLabel,
        sessionId: sessionId
      });
      return response.json();
    },
    onSuccess: (response) => {
      if (response.success) {
        setLeadId(response.leadId);
        setLeadCreated(true);
        console.log('✅ Immediate lead created:', response.leadId);
        toast({
          title: 'Lead Tracked',
          description: 'Your information has been saved and is being tracked.',
          variant: 'default',
        });
      }
    },
    onError: (error: any) => {
      console.error('❌ Failed to create immediate lead:', error);
      toast({
        title: 'Tracking Warning',
        description: 'Unable to save tracking information, but you can continue.',
        variant: 'destructive',
      });
    }
  });

  // Progressive lead update mutation - updates lead as user progresses through flow
  const updateLeadProgress = useMutation({
    mutationFn: async (updates: {
      cruiseDate?: string;
      groupSize?: number;
      boatType?: string;
      discoPackage?: string;
      timeSlot?: string;
      status?: string;
      progress?: string;
      specialRequests?: string;
      budget?: string;
      notes?: string;
      projectId?: string;
    }) => {
      if (!leadId) {
        throw new Error('No lead ID available for update');
      }
      
      const response = await apiRequest('PATCH', `/api/leads/${leadId}`, updates);
      return response.json();
    },
    onSuccess: (response) => {
      if (response.success) {
        console.log('✅ Lead updated:', response.leadId, response.updates);
      }
    },
    onError: (error: any) => {
      console.error('❌ Failed to update lead:', error);
      // Don't show error toast for updates to avoid interrupting user experience
    }
  });

  // Project creation mutation - automatically creates project when cruise date is selected
  const createProjectForLead = useMutation({
    mutationFn: async (data: {
      contactId: string;
      cruiseDate: Date;
      eventType: string;
      eventTypeLabel: string;
      groupSize: number;
      preferredTime?: string;
    }) => {
      const project: InsertProject = {
        contactId: data.contactId,
        title: `${data.eventTypeLabel} - ${formData.firstName} ${formData.lastName}`,
        groupSize: data.groupSize,
        eventType: data.eventType,
        projectDate: data.cruiseDate,
        preferredTime: data.preferredTime,
        leadSource: 'AI Chatbot Flow',
        orgId: 'org_demo',
        status: 'NEW',
        pipelinePhase: 'ph_new',
        tags: ['chatbot_lead', 'immediate_tracking']
      };
      
      const response = await apiRequest('POST', '/api/projects', project);
      return response.json();
    },
    onSuccess: (project) => {
      setProjectId(project.id);
      console.log('✅ Project created for lead:', project.id);
      
      // Update lead with project ID
      if (leadId) {
        updateLeadProgress.mutate({
          projectId: project.id,
          status: 'DATE_SELECTED',
          progress: 'date_selected'
        });
      }
    },
    onError: (error: any) => {
      console.error('❌ Failed to create project:', error);
    }
  });

  // Contact Info Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
      // Create lead immediately when contact info is provided
      if (!leadCreated && leadTrackingEnabled) {
        createImmediateLead.mutate({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          eventTypeLabel: formData.eventTypeLabel
        });
      }
      
      addCompletedSelection({
        id: 'contact-info',
        label: 'Contact',
        value: `${formData.firstName} ${formData.lastName}`,
        icon: 'user'
      });
      progressToNextQuestion();
    }
  };

  // Date Selection Handler
  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      setFormData({ 
        ...formData, 
        eventDate: date,
        // Reset selections when date changes
        selectedCruiseType: null,
        selectedTimeSlot: '',
        selectedDiscoPackage: null,
        selectedDiscoTimeSlot: '',
        discoTicketQuantity: 1
      });
      
      // Update lead with cruise date
      if (leadId && leadCreated) {
        updateLeadProgress.mutate({
          cruiseDate: format(date, 'yyyy-MM-dd'),
          status: 'DATE_SELECTED',
          progress: 'date_selected'
        });
      }
      
      addCompletedSelection({
        id: 'date',
        label: 'Date',
        value: format(date, 'MMM dd, yyyy'),
        icon: 'calendar'
      });
      progressToNextQuestion();
    }
  };

  // Group Size Handler (now uses slider)
  const handleGroupSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFormData({ ...formData, groupSize: newSize });
    
    // Update lead with group size
    if (leadId && leadCreated) {
      updateLeadProgress.mutate({
        groupSize: newSize,
        status: 'OPTIONS_SELECTED',
        progress: 'size_selected'
      });
    }
    
    // Update the completed selection in real-time
    addCompletedSelection({
      id: 'group-size',
      label: 'Group Size',
      value: `${newSize} people`,
      icon: 'users'
    });
  };
  
  // Confirm group size and proceed
  const handleGroupSizeConfirm = () => {
    if (formData.groupSize >= GROUP_SIZE_MIN && formData.groupSize <= GROUP_SIZE_MAX) {
      // IMMEDIATELY show pricing comparison after group size
      setCurrentQuestion('comparison-selection');
      updateProgress('comparison-selection');
      
      // Auto-select default packages for immediate pricing display
      const defaultPrivatePackage = privatePackages.find(pkg => pkg.popular) || privatePackages[0];
      const defaultDiscoPackage = discoPackages[0];
      
      setFormData(prev => ({
        ...prev,
        selectedPrivatePackage: defaultPrivatePackage.id,
        selectedDiscoPackage: defaultDiscoPackage.id as DiscoPackage,
        discoTicketQuantity: Math.min(prev.groupSize, 10),
      }));
    }
  };
  
  // Check availability for a time slot
  const checkTimeSlotAvailability = async (date: Date, timeSlot: string, groupSize: number) => {
    try {
      const response = await fetch(`/api/availability/check?` + new URLSearchParams({
        date: date.toISOString(),
        duration: '4',
        groupSize: groupSize.toString(),
        type: 'private'
      }));
      
      if (!response.ok) return false;
      const result = await response.json();
      return result.available;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  };
  
  // Calculate package pricing
  const calculatePackagePricing = (baseHourlyRate: number, packageId: string, duration: number) => {
    let hourlyRate = baseHourlyRate;
    if (packageId === 'essentials') {
      hourlyRate += 50; // +$50/hour
    } else if (packageId === 'ultimate') {
      hourlyRate += 75; // +$75/hour
    }
    return hourlyRate * duration;
  };
  
  // Private cruise selection handler - allow independent selection
  const handlePrivateCruiseSelect = (timeSlot: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCruiseType: 'private' as CruiseType,
      selectedTimeSlot: timeSlot,
    }));
    
    // Update lead progress
    if (leadId) {
      updateLeadProgress.mutate({
        boatType: 'private',
        timeSlot: timeSlot,
        status: 'OPTIONS_SELECTED',
        progress: 'private_selected'
      });
    }
  };
  
  const handlePrivatePackageSelect = (packageId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPrivatePackage: packageId,
    }));
  };
  
  // Disco cruise selection handler - allow independent selection
  const handleDiscoCruiseSelect = (packageId: string, timeSlot: string) => {
    setFormData({ 
      ...formData, 
      selectedDiscoPackage: packageId as DiscoPackage,
      selectedDiscoTimeSlot: timeSlot
    });
  };
  
  // Complete comparison selection
  const handleComparisonComplete = () => {
    if (formData.selectedCruiseType && 
        ((formData.selectedCruiseType === 'private' && formData.selectedTimeSlot) ||
         (formData.selectedCruiseType === 'disco' && formData.selectedDiscoPackage && formData.selectedDiscoTimeSlot))) {
      
      const cruiseLabel = formData.selectedCruiseType === 'private' 
        ? `Private Cruise - ${formData.selectedTimeSlot}`
        : `${discoPackages.find(p => p.id === formData.selectedDiscoPackage)?.name} - ${formData.selectedDiscoTimeSlot}`;
      
      // Update lead with final selections
      if (leadId && leadCreated) {
        updateLeadProgress.mutate({
          boatType: formData.selectedCruiseType === 'private' ? 'Private Charter' : 'ATX Disco Cruise',
          discoPackage: formData.selectedDiscoPackage || undefined,
          timeSlot: formData.selectedCruiseType === 'private' ? formData.selectedTimeSlot : formData.selectedDiscoTimeSlot,
          status: 'OPTIONS_SELECTED',
          progress: 'options_selected'
        });
      }
        
      addCompletedSelection({
        id: 'comparison',
        label: 'Cruise Selection',
        value: cruiseLabel,
        icon: 'ship'
      });
      progressToNextQuestion();
    }
  };

  // Create lead mutation (updated for new structure)
  const createLead = useMutation({
    mutationFn: async (data: BookingData) => {
      const contact: InsertContact = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone || undefined,
      };
      
      const contactRes = await apiRequest('POST', '/api/contacts', contact);
      const contactResponse = await contactRes.json();
      
      const project: InsertProject = {
        contactId: contactResponse.id,
        title: `${data.eventTypeLabel} - ${data.firstName} ${data.lastName}`,
        groupSize: data.groupSize,
        eventType: data.eventType,
        specialRequests: data.specialRequests || undefined,
        preferredTime: data.selectedCruiseType === 'private' ? data.selectedTimeSlot : data.selectedDiscoTimeSlot,
        budget: (data.selectedCruiseType === 'private' ? privatePricing?.total : discoPricing?.total) || (data.budget ? Math.round(parseFloat(data.budget) * 100) : undefined),
        leadSource: 'chat',
        orgId: 'org_demo',
        status: 'NEW',
        pipelinePhase: 'ph_new',
        tags: data.selectedCruiseType === 'disco' ? ['disco_cruise'] : ['private_cruise'],
      };
      
      const projectRes = await apiRequest('POST', '/api/projects', project);
      const projectResponse = await projectRes.json();
      
      if (data.eventDate) {
        await apiRequest('PATCH', `/api/projects/${projectResponse.id}`, {
          projectDate: data.eventDate.toISOString(),
        });
      }
      
      const currentPricing = data.selectedCruiseType === 'private' ? privatePricing : discoPricing;
      if (currentPricing && currentPricing.breakdown) {
        // Enhanced dynamic quote item generation based on real-time user inputs
        const quoteItems: QuoteItem[] = [];
        
        if (data.selectedCruiseType === 'disco' && data.selectedDiscoPackage) {
          const selectedPackage = discoPackages.find(pkg => pkg.id === data.selectedDiscoPackage);
          if (selectedPackage) {
            // Dynamic disco cruise item with personalized details
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
            
            // Add personalized event enhancement based on event type
            if (data.eventType === 'bachelor' || data.eventType === 'bachelorette') {
              quoteItems.push({
                id: `${data.eventType}_enhancement_${Date.now()}`,
                type: 'addon',
                name: `${data.eventType === 'bachelor' ? 'Bachelor' : 'Bachelorette'} Party Enhancement`,
                description: 'Complimentary party decorations and celebration setup included for your special event.',
                unitPrice: 0,
                qty: 1,
                category: 'enhancement'
              });
            }
          }
        } else {
          // Enhanced private cruise item generation
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
          
          // Dynamic crew fee calculation based on actual group size
          if (currentPricing.breakdown.crewFee > 0) {
            quoteItems.push({
              id: `crew_fee_${Date.now()}`,
              type: 'crew_fee',
              name: 'Additional Crew Service',
              description: `Professional crew service required by Texas law for groups of ${data.groupSize}+ people.`,
              unitPrice: currentPricing.breakdown.crewFee * 100,
              qty: 1,
              category: 'service_fee'
            });
          }
          
          // Add event-specific enhancements based on user selections
          if (data.eventType === 'corporate') {
            quoteItems.push({
              id: `corporate_package_${Date.now()}`,
              type: 'addon',
              name: 'Corporate Event Package',
              description: 'Professional setup with tables, chairs, and presentation capabilities included.',
              unitPrice: 0,
              qty: 1,
              category: 'enhancement'
            });
          } else if (data.eventType === 'wedding') {
            quoteItems.push({
              id: `wedding_package_${Date.now()}`,
              type: 'addon',
              name: 'Wedding Celebration Package',
              description: 'Romantic ambiance with special lighting and complimentary champagne toast.',
              unitPrice: 0,
              qty: 1,
              category: 'enhancement'
            });
          }
        }
        
        // Add special requests as a note item if provided
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

        // Enhanced radio sections with dynamic options based on user flow
        const radioSections: RadioSection[] = [];
        
        // Add dynamic upgrade options based on selected cruise type
        if (data.selectedCruiseType === 'private') {
          const upgradeOptions = [
            {
              id: 'no_upgrades',
              name: 'Standard Package',
              description: 'Everything included as quoted',
              price: 0,
              isDefault: true
            },
            {
              id: 'premium_bar',
              name: 'Premium Bar Package',
              description: 'Upgrade to premium spirits and craft beer selection',
              price: data.groupSize * 15 * 100 // $15 per person in cents
            },
            {
              id: 'catering_upgrade',
              name: 'Gourmet Catering',
              description: 'Add premium appetizers and hors d\'oeuvres',
              price: data.groupSize * 25 * 100 // $25 per person in cents
            }
          ];
          
          radioSections.push({
            id: 'upgrade-options',
            title: 'Optional Upgrades',
            description: `Enhance your ${data.eventTypeLabel.toLowerCase()} with these premium options`,
            required: false,
            options: upgradeOptions,
            order: 0
          });
        }
        
        if (data.eventDate && data.selectedCruiseType === 'private' && data.selectedTimeSlot) {
          const availableTimeSlots = getPrivateTimeSlotsForDate(data.eventDate);
          const timeSlotOptions = availableTimeSlots.map(slot => ({
            id: slot.id,
            name: slot.label,
            description: slot.popular ? 'Popular choice' : 'Available',
            price: 0,
            selected: slot.id === data.selectedTimeSlot,
          }));

          radioSections.push({
            id: 'time-slot-selection',
            title: 'Private Cruise Time Options',
            description: 'Choose your preferred cruise time',
            required: true,
            options: timeSlotOptions,
            order: 0,
          });
        } else if (data.eventDate && data.selectedCruiseType === 'disco') {
          const discoTimeSlots = getDiscoTimeSlotsForDate(data.eventDate);
          const packageOptions = discoPackages.map(pkg => ({
            id: pkg.id,
            name: pkg.name,
            description: `$${pkg.price} per person - ${pkg.description}`,
            price: pkg.price * 100,
            selected: pkg.id === data.selectedDiscoPackage,
          }));
          
          radioSections.push({
            id: 'disco-package-selection',
            title: 'Disco Cruise Package',
            description: 'Choose your disco cruise experience',
            required: true,
            options: packageOptions,
            order: 0,
          });
          
          if (discoTimeSlots.length > 0) {
            const timeOptions = discoTimeSlots.map(slot => ({
              id: slot.id,
              name: slot.label,
              description: 'Available',
              price: 0,
              selected: slot.id === data.selectedDiscoTimeSlot,
            }));
            
            radioSections.push({
              id: 'disco-time-selection',
              title: 'Disco Cruise Time',
              description: 'Choose your preferred time slot',
              required: true,
              options: timeOptions,
              order: 1,
            });
          }
        }
        
        // Enhanced quote object with personalized messaging
        const quote: InsertQuote = {
          orgId: 'org_demo', // Fix: Required field was missing
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setCurrentQuestion('complete');
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

  // Payment mutations using Stripe Checkout Sessions
  const createDepositPayment = useMutation({
    mutationFn: async () => {
      // Enhanced validation for secure payments
      if (!formData.selectedCruiseType) {
        throw new Error('Please select a cruise type first');
      }
      if (!formData.eventDate) {
        throw new Error('Please select an event date');
      }
      if (!formData.firstName || !formData.lastName || !formData.email) {
        throw new Error('Contact information required for payment');
      }
      if (pricingLoading) {
        throw new Error('Please wait for pricing to load');
      }
      if (pricingError) {
        throw new Error('Please fix pricing errors before proceeding');
      }
      
      // Validate cruise-specific requirements
      if (formData.selectedCruiseType === 'private' && !formData.selectedTimeSlot) {
        throw new Error('Please select a time slot for private cruise');
      }
      if (formData.selectedCruiseType === 'disco' && (!formData.selectedDiscoPackage || !formData.discoTicketQuantity)) {
        throw new Error('Please select disco package and ticket quantity');
      }
      
      const res = await apiRequest('POST', '/api/checkout/create-session', {
        paymentType: 'deposit',
        customerEmail: formData.email,
        selectionPayload: {
          cruiseType: formData.selectedCruiseType,
          groupSize: formData.groupSize,
          eventDate: formData.eventDate.toISOString(),
          eventType: formData.eventType,
          timeSlot: formData.selectedTimeSlot,
          discoPackage: formData.selectedDiscoPackage,
          discoTimeSlot: formData.selectedDiscoTimeSlot,
          discoTicketQuantity: formData.discoTicketQuantity,
        },
        metadata: {
          customerName: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Payment session creation failed: ${res.status}`);
      }
      
      const response = await res.json();
      if (!response.success || !response.url) {
        throw new Error(response.error || 'Failed to create checkout session');
      }
      
      // Redirect to Stripe checkout
      window.location.href = response.url;
    },
    onError: (error: any) => {
      console.error('Deposit payment error:', error);
      toast({ 
        title: 'Payment Error', 
        description: error.message || 'Unable to process deposit payment. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const createFullPayment = useMutation({
    mutationFn: async () => {
      // Enhanced validation for secure payments
      if (!formData.selectedCruiseType) {
        throw new Error('Please select a cruise type first');
      }
      if (!formData.eventDate) {
        throw new Error('Please select an event date');
      }
      if (!formData.firstName || !formData.lastName || !formData.email) {
        throw new Error('Contact information required for payment');
      }
      if (pricingLoading) {
        throw new Error('Please wait for pricing to load');
      }
      if (pricingError) {
        throw new Error('Please fix pricing errors before proceeding');
      }
      
      // Validate cruise-specific requirements
      if (formData.selectedCruiseType === 'private' && !formData.selectedTimeSlot) {
        throw new Error('Please select a time slot for private cruise');
      }
      if (formData.selectedCruiseType === 'disco' && (!formData.selectedDiscoPackage || !formData.discoTicketQuantity)) {
        throw new Error('Please select disco package and ticket quantity');
      }
      
      const res = await apiRequest('POST', '/api/checkout/create-session', {
        paymentType: 'full',
        customerEmail: formData.email,
        selectionPayload: {
          cruiseType: formData.selectedCruiseType,
          groupSize: formData.groupSize,
          eventDate: formData.eventDate.toISOString(),
          eventType: formData.eventType,
          timeSlot: formData.selectedTimeSlot,
          discoPackage: formData.selectedDiscoPackage,
          discoTimeSlot: formData.selectedDiscoTimeSlot,
          discoTicketQuantity: formData.discoTicketQuantity,
        },
        metadata: {
          customerName: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Payment session creation failed: ${res.status}`);
      }
      
      const response = await res.json();
      if (!response.success || !response.url) {
        throw new Error(response.error || 'Failed to create checkout session');
      }
      
      // Redirect to Stripe checkout
      window.location.href = response.url;
    },
    onError: (error: any) => {
      console.error('Full payment error:', error);
      toast({ 
        title: 'Payment Error', 
        description: error.message || 'Unable to process full payment. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const getIconComponent = (iconType: string, size = 16) => {
    const iconProps = { className: `h-${size/4} w-${size/4}` };
    switch (iconType) {
      case 'user': return <User {...iconProps} />;
      case 'calendar': return <CalendarIcon {...iconProps} />;
      case 'clock': return <Clock {...iconProps} />;
      case 'users': return <Users {...iconProps} />;
      case 'ship': return <Ship {...iconProps} />;
      default: return null;
    }
  };
  
  // Navigation Bar Component
  const NavigationBar = () => {
    const getStepName = (question: Question) => {
      const stepNames: Record<Question, string> = {
        'event-type': 'Event Type',
        'contact-info': 'Contact Info', 
        'date-selection': 'Date Selection',
        'group-size-selection': 'Group Size',
        'boat-selection': 'Select Boat',
        'package-selection': 'Package Options',
        'comparison-selection': 'Cruise Options',
        'complete': 'Complete'
      };
      return stepNames[question] || 'Unknown';
    };
    
    const currentStepNumber = currentQuestionIndex + 1;
    const totalSteps = questionOrder.length - 1; // Exclude 'complete'
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10"
      >
        <div className="max-w-6xl mx-auto px-6 py-1">
          {/* Compact Progress Bar */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-1 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStepNumber / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                Step {currentStepNumber}/{totalSteps}: {getStepName(currentQuestion)}
              </span>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center gap-1">
              <Button
                onClick={goBack}
                disabled={!canGoBack()}
                variant="ghost"
                size="sm"
                className="p-1 h-6"
                data-testid="button-nav-back"
              >
                <ArrowLeft className="h-3 w-3" />
              </Button>
              
              {canGoForward() && (
                <Button
                  onClick={goForward}
                  variant="ghost"
                  size="sm"
                  className="p-1 h-6"
                  data-testid="button-nav-forward"
                >
                  <ArrowRight className="h-3 w-3" />
                </Button>
              )}
              
              {currentQuestion !== 'event-type' && currentQuestion !== 'complete' && (
                <Button
                  onClick={() => {
                    // Reset to beginning
                    setCurrentQuestion('event-type');
                    setCurrentQuestionIndex(0);
                    setMaxProgressIndex(0);
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
                      selectedPrivatePackage: null,
                      selectedDiscoPackage: null,
                      selectedDiscoTimeSlot: '',
                      discoTicketQuantity: 1,
                    });
                    setPrivatePricing(null);
                    setDiscoPricing(null);
                  }}
                  variant="ghost"
                  size="sm"
                  className="p-1 h-6"
                  data-testid="button-nav-restart"
                >
                  <RotateCcw className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Function to open quote in separate window
  const openQuoteInNewWindow = () => {
    if (generatedQuoteId) {
      const quoteUrl = `${window.location.origin}/quote/${generatedQuoteId}`;
      window.open(quoteUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    }
  };

  // Handle payment option selection and processing
  const handlePayment = async (paymentType: 'deposit' | 'full') => {
    try {
      if (paymentType === 'deposit') {
        createDepositPayment.mutate();
      } else {
        createFullPayment.mutate();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: 'Unable to process payment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Payment Modal Component
  const PaymentModal = () => {
    const currentPricing = formData.selectedCruiseType === 'disco' ? discoPricing : privatePricing;
    const paymentOptions = getPaymentOptions(currentPricing);
    const within30Days = isWithin30Days();
    
    return (
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Complete Your Booking
            </DialogTitle>
            <DialogDescription>
              Choose your payment option to secure your cruise booking
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Event:</span>
                  <span className="font-medium">{formData.eventTypeLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Date:</span>
                  <span className="font-medium">
                    {formData.eventDate ? format(formData.eventDate, 'MMM dd, yyyy') : 'TBD'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Time:</span>
                  <span className="font-medium">{formData.preferredTimeLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Group Size:</span>
                  <span className="font-medium">{formData.groupSizeLabel} people</span>
                </div>
                {currentPricing && (
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>{formatCurrency(currentPricing.total)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Date Warning */}
            {within30Days && (
              <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 dark:text-amber-200">Full Payment Required</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      Your event is within 30 days, so full payment is required to secure your booking.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Payment Options */}
            <div className="space-y-3">
              <h3 className="font-medium text-slate-800 dark:text-slate-200">Payment Options</h3>
              {paymentOptions.map((option) => (
                <div key={option.id} className="relative">
                  <div
                    className={cn(
                      "border rounded-lg p-4 cursor-pointer transition-all",
                      selectedPaymentOption === option.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    )}
                    onClick={() => setSelectedPaymentOption(option.id as 'deposit' | 'full')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border-2 transition-colors",
                            selectedPaymentOption === option.id
                              ? "border-blue-500 bg-blue-500"
                              : "border-slate-300 dark:border-slate-600"
                          )}
                        >
                          {selectedPaymentOption === option.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                              {option.label}
                            </span>
                            {option.popular && (
                              <Badge variant="secondary" className="text-xs">Recommended</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-slate-800 dark:text-slate-200">
                          {formatCurrency(option.amount)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Payment Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1"
                data-testid="button-cancel-payment"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowPaymentModal(false);
                  handlePayment(selectedPaymentOption);
                }}
                disabled={createDepositPayment.isPending || createFullPayment.isPending}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                data-testid="button-confirm-payment"
              >
                {(createDepositPayment.isPending || createFullPayment.isPending) && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                {selectedPaymentOption === 'deposit' ? 'Pay Deposit' : 'Pay in Full'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      {/* Professional Header with Logo */}
      <div className="w-full bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-3">
            <img 
              src={logoPath} 
              alt="Premier Party Cruises" 
              className="h-10 w-auto object-contain"
              data-testid="img-chat-logo"
            />
            <div className="flex-1">
              <h1 className="text-lg font-heading font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Premier Party Cruises</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">Lake Austin's Premium Boat Charter Experience</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Bar - Always Visible */}
      {currentQuestion !== 'complete' && <NavigationBar />}
      
      {/* Compact Selections Bar */}
      <AnimatePresence>
        {completedSelections.length > 0 && currentQuestion !== 'complete' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700"
          >
            <div className="max-w-6xl mx-auto px-6 py-1">
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

      {/* Main Content Area - Professional & Compact */}
      <div className="flex-1 flex items-start justify-center pt-4 px-4 pb-4 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-950/50">
        <div className="w-full max-w-6xl">
          
          <AnimatePresence mode="wait">
            
            {/* Unified Welcome & Event Type Selection */}
            {currentQuestion === 'event-type' && (
              <motion.div
                key="event-type"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-6 py-4"
              >
                {/* Compact Welcome Header */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-3"
                >
                  {/* Logo */}
                  <div className="flex justify-center mb-4">
                    <motion.img
                      src={logoPath}
                      alt="Premier Party Cruises"
                      className="h-20 w-auto"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    />
                  </div>
                  
                  {/* Compact Hero Text */}
                  <div className="space-y-2">
                    <motion.h1
                      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      Welcome Aboard!
                    </motion.h1>
                    
                    <motion.p
                      className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      Lake Austin's Premium Boat Charter Experience
                    </motion.p>
                  </div>
                </motion.div>
                
                {/* Compact Features Row */}
                <motion.div
                  className="flex items-center justify-center gap-6 md:gap-8 flex-wrap text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Ship className="h-4 w-4 text-blue-600" />
                    <span>Premium Fleet</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>500+ Reviews</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span>7 Years Excellence</span>
                  </div>
                </motion.div>

                {/* Divider Line */}
                <div className="flex items-center justify-center">
                  <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                </div>
                
                {/* Event Selection Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      What type of event are you planning?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Select the option that best describes your celebration
                    </p>
                  </div>

                  <motion.div 
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.03
                        }
                      }
                    }}
                  >
                    {eventTypes.map((type, index) => (
                      <motion.div
                        key={type.id}
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0 }
                        }}
                      >
                        <button
                          className="w-full h-full p-5 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 group relative overflow-hidden"
                          onClick={() => handleEventTypeSelect(type.id, type.label, type.emoji)}
                          data-testid={`button-event-${type.id}`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/5 group-hover:to-purple-600/10 transition-all duration-300" />
                          <div className="relative space-y-2">
                            <div className="text-3xl mb-1">{type.emoji}</div>
                            <div className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {type.label}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                              {type.description}
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Contact Information */}
            {currentQuestion === 'contact-info' && (
              <motion.div
                key="contact-info"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-2xl mx-auto"
              >
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-xl">
                  <CardHeader className="text-center py-3">
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-200">Let's get to know you</CardTitle>
                    <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
                      We'll use this information to send you your quote
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-300">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                            placeholder="John"
                            className="bg-white/50 dark:bg-slate-700/50"
                            data-testid="input-first-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-300">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                            placeholder="Doe"
                            className="bg-white/50 dark:bg-slate-700/50"
                            data-testid="input-last-name"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          placeholder="john.doe@example.com"
                          className="bg-white/50 dark:bg-slate-700/50"
                          data-testid="input-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                          className="bg-white/50 dark:bg-slate-700/50"
                          data-testid="input-phone"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">We'll text you updates about your booking</p>
                      </div>
                      <div className="btn-center">
                        <Button type="submit" className="btn-professional w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg" data-testid="button-continue">
                          Continue
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Date Selection - Calendar Only */}
            {currentQuestion === 'date-selection' && (
              <motion.div
                key="date-selection"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-8"
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">Select Your Cruise Date</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Choose an available date for your {formData.eventTypeLabel.toLowerCase()}</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6"
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
                
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Click on an available date to continue
                </p>
              </motion.div>
            )}

            {/* Time Slot Selection - Bachelor/Bachelorette */}
            {currentQuestion === 'time-slot-selection' && formData.eventDate && (
              <motion.div
                key="time-slot-selection"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-8"
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Clock className="h-10 w-10 text-purple-600" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">Choose Your Time Slot</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Select an available time for {format(formData.eventDate, 'MMMM do, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {getPrivateTimeSlotsForDate(formData.eventDate).map((slot) => (
                    <motion.button
                      key={slot.id}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, selectedTimeSlot: slot.id }));
                        addCompletedSelection({
                          id: 'time-slot',
                          label: 'Time Slot',
                          value: slot.label,
                          icon: 'clock'
                        });
                        progressToNextQuestion();
                      }}
                      className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all"
                      data-testid={`button-time-${slot.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">
                            {slot.icon} {slot.label}
                          </div>
                          {slot.popular && (
                            <Badge className="mt-2" variant="secondary">
                              Popular Choice
                            </Badge>
                          )}
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Boat Selection */}
            {currentQuestion === 'boat-selection' && (
              <motion.div
                key="boat-selection"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-8"
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Ship className="h-10 w-10 text-blue-600" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">Select Your Boat</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Choose the perfect boat for your group of {formData.groupSize} people
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {/* Boat options will be loaded dynamically */}
                  <motion.button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, selectedBoat: 'luxury-25' }));
                      addCompletedSelection({
                        id: 'boat',
                        label: 'Boat',
                        value: '25-Person Party Cruiser',
                        icon: 'ship'
                      });
                      progressToNextQuestion();
                    }}
                    className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all"
                    data-testid="button-boat-luxury-25"
                  >
                    <Ship className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      25-Person Party Cruiser
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Perfect for groups up to 25. Premium sound system, spacious deck.
                    </p>
                    <div className="text-2xl font-bold text-blue-600">
                      $300/hour
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, selectedBoat: 'party-50' }));
                      addCompletedSelection({
                        id: 'boat',
                        label: 'Boat',
                        value: '50-Person Party Yacht',
                        icon: 'ship'
                      });
                      progressToNextQuestion();
                    }}
                    className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all"
                    data-testid="button-boat-party-50"
                  >
                    <Ship className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      50-Person Party Yacht
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Luxury yacht for groups up to 50. Two levels, premium amenities.
                    </p>
                    <div className="text-2xl font-bold text-purple-600">
                      $400/hour
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Package Selection - Two Column Layout */}
            {currentQuestion === 'package-selection' && (
              <motion.div
                key="package-selection"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Sparkles className="h-10 w-10 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">Choose Your Perfect Package</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Select the ideal experience for your {formData.eventTypeLabel.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Two Column Layout for All Events */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {/* Standard Package */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                  >
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, selectedPrivatePackage: 'standard' }));
                        addCompletedSelection({
                          id: 'package',
                          label: 'Package',
                          value: 'Standard Package',
                          icon: 'sparkles'
                        });
                        setCurrentQuestion('comparison-selection');
                        updateProgress('comparison-selection');
                      }}
                      className="w-full p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all"
                      data-testid="button-package-standard"
                    >
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                        Standard Package
                      </h3>
                      <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                        Base Rate
                      </div>
                      <ul className="text-left space-y-2 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>4-hour cruise</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Captain & crew</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Basic sound system</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Coolers with ice</span>
                        </li>
                      </ul>
                    </button>
                  </motion.div>

                  {/* Essentials Package */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, selectedPrivatePackage: 'essentials' }));
                        addCompletedSelection({
                          id: 'package',
                          label: 'Package',
                          value: 'Essentials Package',
                          icon: 'sparkles'
                        });
                        setCurrentQuestion('comparison-selection');
                        updateProgress('comparison-selection');
                      }}
                      className="w-full p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-blue-500"
                      data-testid="button-package-essentials"
                    >
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2" variant="secondary">
                        Most Popular
                      </Badge>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                        Essentials Package
                      </h3>
                      <div className="text-3xl font-bold text-blue-600 mb-4">
                        +$50/hour
                      </div>
                      <ul className="text-left space-y-2 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Everything in Standard</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Party decorations</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Welcome drinks</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Photo props</span>
                        </li>
                      </ul>
                    </button>
                  </motion.div>

                  {/* Ultimate Package */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, selectedPrivatePackage: 'ultimate' }));
                        addCompletedSelection({
                          id: 'package',
                          label: 'Package',
                          value: 'Ultimate Party Package',
                          icon: 'sparkles'
                        });
                        setCurrentQuestion('comparison-selection');
                        updateProgress('comparison-selection');
                      }}
                      className="w-full p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-md hover:shadow-xl transition-all"
                      data-testid="button-package-ultimate"
                    >
                      <Crown className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                        Ultimate Party Package
                      </h3>
                      <div className="text-3xl font-bold text-purple-600 mb-4">
                        +$75/hour
                      </div>
                      <ul className="text-left space-y-2 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Everything in Essentials</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Premium sound system</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Red carpet boarding</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Champagne toast</span>
                        </li>
                      </ul>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Group Size Selection - Dedicated Page */}
            {currentQuestion === 'group-size-selection' && (
              <motion.div
                key="group-size-selection"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-8"
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Users className="h-10 w-10 text-blue-600" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">How many people will join?</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Select the group size for your {formData.eventTypeLabel.toLowerCase()} on {formData.eventDate ? format(formData.eventDate, 'MMMM do, yyyy') : 'selected date'}
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 max-w-2xl mx-auto"
                >
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-primary mb-2">
                        {formData.groupSize}
                      </div>
                      <div className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                        {formData.groupSize === 1 ? 'person' : 'people'}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Slider
                        value={[formData.groupSize]}
                        onValueChange={handleGroupSizeChange}
                        min={GROUP_SIZE_MIN}
                        max={GROUP_SIZE_MAX}
                        step={1}
                        className="w-full"
                        data-testid="slider-group-size"
                      />
                      
                      <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span>Min: {GROUP_SIZE_MIN}</span>
                        <span>Max: {GROUP_SIZE_MAX}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="btn-center">
                        <Button 
                          onClick={handleGroupSizeConfirm}
                          disabled={formData.groupSize < GROUP_SIZE_MIN || formData.groupSize > GROUP_SIZE_MAX}
                          className="btn-professional w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg disabled:opacity-50"
                          data-testid="button-confirm-group-size"
                        >
                          Continue with {formData.groupSize} {formData.groupSize === 1 ? 'person' : 'people'}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  You can change this later if needed
                </p>
              </motion.div>
            )}

            {/* Enhanced Comparison & Booking - SHOWS IMMEDIATELY AFTER GROUP SIZE */}
            {currentQuestion === 'comparison-selection' && (
              <motion.div
                key="comparison-selection"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {/* Professional Header with Pricing Focus */}
                <div className="text-center space-y-4 mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <DollarSign className="h-10 w-10 text-white" />
                  </motion.div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Compare Your Options
                  </h2>
                  <div className="flex items-center justify-center gap-3 text-lg text-slate-600 dark:text-slate-400">
                    <Badge variant="secondary" className="px-3 py-1">
                      <span className="text-2xl mr-2">{formData.eventEmoji}</span>
                      {formData.eventTypeLabel}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      <Users className="h-4 w-4 mr-2 inline" />
                      {formData.groupSize} {formData.groupSize === 1 ? 'Person' : 'People'}
                    </Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Select your preferred cruise experience. Pricing is calculated for your group size.
                  </p>
                </div>

                {/* Dynamic Grid Layout - Two columns for all groups - MOVED TO TOP */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {/* Private Cruise Options */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={cn(
                      "bg-gradient-to-b from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-900/20 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 transition-all w-full hover:shadow-3xl",
                      formData.selectedCruiseType === 'private' ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800" : "border-slate-200 dark:border-slate-700"
                    )}
                  >
                    {/* Enhanced Header with Prominent Pricing */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg">
                        <Anchor className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Private Cruise</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">Exclusive boat for your group</p>
                      
                      {/* PROMINENT PRICING DISPLAY */}
                      {privatePricing ? (
                        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-xl p-4">
                          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                            {formatCurrency(privatePricing.total)}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Total for {formData.groupSize} people
                          </div>
                          <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-2">
                            {formatCurrency(privatePricing.total / formData.groupSize)} per person
                          </div>
                        </div>
                      ) : (
                        <div className="animate-pulse bg-slate-100 dark:bg-slate-700 rounded-xl h-32 flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                        </div>
                      )}
                    </div>
                    
                    {/* Private Cruise Packages */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-700 dark:text-slate-300">Choose Your Package</h4>
                      <RadioGroup 
                        value={formData.selectedPrivatePackage || ''}
                        onValueChange={(packageId) => handlePrivatePackageSelect(packageId)}
                        data-testid="radio-private-packages"
                      >
                        {privatePackages.map((pkg) => (
                          <div key={pkg.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={pkg.id} id={`private-pkg-${pkg.id}`} />
                            <Label 
                              htmlFor={`private-pkg-${pkg.id}`} 
                              className="flex-1 cursor-pointer py-3 px-3 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium text-slate-800 dark:text-slate-200">{pkg.name}</div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">{pkg.description}</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                    {pkg.features.join(' • ')}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-blue-600">${pkg.hourlyRate}/hr</div>
                                  <div className="text-xs text-slate-500">4-hour cruise</div>
                                  {pkg.popular && <Badge variant="secondary" className="text-xs mt-1">Popular</Badge>}
                                </div>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    {/* Private Cruise Time Slots - Show All Available Times */}
                    <div className="space-y-4 mt-6">
                      <h4 className="font-medium text-slate-700 dark:text-slate-300">Available Time Slots</h4>
                      {formData.eventDate ? (
                        <RadioGroup 
                          value={formData.selectedTimeSlot}
                          onValueChange={(value) => {
                            setFormData(prev => ({ ...prev, selectedTimeSlot: value }));
                            if (formData.selectedPrivatePackage) {
                              handlePrivateCruiseSelect(value);
                            }
                          }}
                          data-testid="radio-private-time-slots"
                        >
                          {getPrivateTimeSlotsForDate(formData.eventDate).map((slot) => (
                            <div key={slot.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={slot.id} id={`private-${slot.id}`} />
                              <Label 
                                htmlFor={`private-${slot.id}`} 
                                className="flex-1 cursor-pointer py-3 px-3 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{slot.icon}</span>
                                    <span className="font-medium">{slot.label}</span>
                                    {slot.popular && <Badge variant="secondary" className="text-xs ml-2">Popular</Badge>}
                                  </div>
                                  {privatePricing && formData.selectedPrivatePackage && (
                                    <span className="text-sm font-semibold text-blue-600">
                                      {formatCurrency(privatePricing.total)}
                                    </span>
                                  )}
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400 italic">Select a date to see available times</p>
                      )}
                    </div>
                    
                    {/* Enhanced Private Cruise Pricing */}
                    {formData.selectedTimeSlot && formData.selectedPrivatePackage && privatePricing && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 space-y-4"
                      >
                        {/* Compact Pricing Summary */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-4">
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-center">Pricing Summary</h4>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-slate-600 dark:text-slate-400">Base Cost:</span>
                              <span className="font-medium">{formatCurrency(privatePricing.subtotal)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-slate-600 dark:text-slate-400">Tax & Tip:</span>
                              <span className="font-medium">{formatCurrency(privatePricing.tax + (privatePricing.gratuity || 0))}</span>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-2">
                              <div className="flex justify-between items-center font-bold">
                                <span className="text-slate-800 dark:text-slate-200">Total:</span>
                                <span className="text-blue-600 dark:text-blue-400">{formatCurrency(privatePricing.total)}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                                <span>Per person:</span>
                                <span>{formatCurrency(privatePricing.total / formData.groupSize)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Selection Button for Private Cruise */}
                        <Button
                          onClick={() => {
                            setFormData(prev => ({ ...prev, selectedCruiseType: 'private' }));
                            addCompletedSelection({
                              id: 'cruise-type',
                              label: 'Selected Option',
                              value: `Private Cruise - ${formatCurrency(privatePricing.total)}`,
                              icon: 'anchor'
                            });
                            setCurrentQuestion('contact-info');
                            updateProgress('contact-info');
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                          data-testid="button-select-private"
                        >
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Choose Private Cruise
                        </Button>
                        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
                          25% deposit required • Pay remainder 30 days before
                        </p>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Right Column: Alternative Dates for bachelor/bachelorette OR Disco Cruise for others */}
                  {(formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') && formData.eventDate ? (
                    <AlternativeDates
                      selectedDate={formData.eventDate}
                      groupSize={formData.groupSize}
                      onSelectDate={(date, timeSlot) => {
                        setFormData(prev => ({
                          ...prev,
                          eventDate: date,
                          selectedTimeSlot: timeSlot,
                        }));
                        // Update completed selections
                        addCompletedSelection({
                          id: 'date',
                          label: 'Event Date',
                          value: format(date, 'EEEE, MMMM d, yyyy'),
                          icon: 'calendar'
                        });
                      }}
                      getTimeSlotsForDate={getPrivateTimeSlotsForDate}
                      formatCurrency={formatCurrency}
                      basePrice={privatePricing?.total || 0}
                    />
                  ) : isDiscoAvailableForDate(formData.eventDate) ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className={cn(
                        "bg-gradient-to-b from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-900/20 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 transition-all w-full hover:shadow-3xl",
                        formData.selectedCruiseType === 'disco' ? "border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800" : "border-slate-200 dark:border-slate-700",
                        !isDiscoAvailableForDate(formData.eventDate) && "opacity-50"
                      )}
                    >
                      {/* Enhanced Header with Prominent Pricing */}
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 shadow-lg">
                          <Music className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">ATX Disco Cruise</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">Party with other groups</p>
                        
                        {/* PROMINENT PRICING DISPLAY */}
                        {discoPricing ? (
                          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl p-4">
                            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                              {formatCurrency(discoPricing.total)}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {formData.discoTicketQuantity} tickets × {formatCurrency(discoPricing.perPersonCost)}
                            </div>
                            <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-2">
                              {formatCurrency(discoPricing.perPersonCost)} per person
                            </div>
                          </div>
                        ) : (
                          <div className="animate-pulse bg-slate-100 dark:bg-slate-700 rounded-xl h-32 flex items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                          </div>
                        )}
                      </div>
                      
                      {isDiscoAvailableForDate(formData.eventDate) ? (
                        <>
                          {/* Disco Time Slots */}
                          <div className="space-y-4 mb-6">
                            <h4 className="font-medium text-slate-700 dark:text-slate-300">Available Times</h4>
                            <RadioGroup 
                              value={formData.selectedDiscoTimeSlot}
                              onValueChange={(timeSlot) => {
                                if (formData.selectedDiscoPackage) {
                                  handleDiscoCruiseSelect(formData.selectedDiscoPackage, timeSlot);
                                }
                              }}
                              data-testid="radio-disco-time-slots"
                            >
                              {getDiscoTimeSlotsForDate(formData.eventDate).map((slot) => (
                                <div key={slot.id} className="flex items-center space-x-2">
                                  <RadioGroupItem value={slot.id} id={`disco-slot-${slot.id}`} />
                                  <Label 
                                    htmlFor={`disco-slot-${slot.id}`} 
                                    className="flex-1 flex items-center justify-between cursor-pointer py-2"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">{slot.icon}</span>
                                      <span>{slot.label}</span>
                                      {slot.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                          
                          {/* Disco Packages */}
                          <div className="space-y-4">
                            <h4 className="font-medium text-slate-700 dark:text-slate-300">Choose Your Package</h4>
                            <RadioGroup 
                              value={formData.selectedDiscoPackage || ''}
                              onValueChange={(packageId) => {
                                const timeSlot = formData.selectedDiscoTimeSlot || getDiscoTimeSlotsForDate(formData.eventDate)[0]?.id;
                                handleDiscoCruiseSelect(packageId as DiscoPackage, timeSlot);
                              }}
                              data-testid="radio-disco-packages"
                            >
                              {discoPackages.map((pkg) => (
                                <div key={pkg.id} className="flex items-center space-x-2">
                                  <RadioGroupItem value={pkg.id} id={`disco-pkg-${pkg.id}`} />
                                  <Label 
                                    htmlFor={`disco-pkg-${pkg.id}`} 
                                    className="flex-1 cursor-pointer py-3 px-3 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <div className="font-medium text-slate-800 dark:text-slate-200">{pkg.name}</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">{pkg.description}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                          {pkg.features.join(' • ')}
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="font-bold text-purple-600">${pkg.price}</div>
                                        <div className="text-xs text-slate-500">per person</div>
                                      </div>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                          
                          {/* Ticket Quantity Selector */}
                          {formData.selectedDiscoPackage && (
                            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                              <Label className="text-slate-700 dark:text-slate-300 mb-2 block">Number of Tickets</Label>
                              <div className="flex items-center gap-4">
                                <Button
                                  onClick={() => setFormData(prev => ({ 
                                    ...prev, 
                                    discoTicketQuantity: Math.max(1, prev.discoTicketQuantity - 1) 
                                  }))}
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  data-testid="button-disco-tickets-minus"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <div className="flex-1 text-center">
                                  <div className="text-2xl font-bold text-purple-600">{formData.discoTicketQuantity}</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">tickets</div>
                                </div>
                                <Button
                                  onClick={() => setFormData(prev => ({ 
                                    ...prev, 
                                    discoTicketQuantity: Math.min(50, prev.discoTicketQuantity + 1) 
                                  }))}
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  data-testid="button-disco-tickets-plus"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              {discoPricing && (
                                <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-800">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-400">Subtotal:</span>
                                    <span className="font-medium">{formatCurrency(discoPricing.subtotal)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-400">Tax & Tip:</span>
                                    <span className="font-medium">{formatCurrency(discoPricing.tax + (discoPricing.gratuity || 0))}</span>
                                  </div>
                                  <div className="flex justify-between text-lg font-bold mt-2">
                                    <span className="text-slate-800 dark:text-slate-200">Total:</span>
                                    <span className="text-purple-600">{formatCurrency(discoPricing.total)}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Selection Button for Disco Cruise */}
                          {formData.selectedDiscoPackage && discoPricing && (
                            <div className="mt-4">
                              <Button
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, selectedCruiseType: 'disco' }));
                                  addCompletedSelection({
                                    id: 'cruise-type',
                                    label: 'Selected Option',
                                    value: `ATX Disco Cruise - ${formatCurrency(discoPricing.total)}`,
                                    icon: 'music'
                                  });
                                  setCurrentQuestion('contact-info');
                                  updateProgress('contact-info');
                                }}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                                data-testid="button-select-disco"
                              >
                                <CheckCircle className="h-5 w-5 mr-2" />
                                Choose Disco Cruise
                              </Button>
                              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
                                25% deposit required • Balance due 30 days before
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Music className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                          <p>Disco cruises are only available on Fridays and Saturdays</p>
                          <p className="text-sm mt-2">Please select a different date to see disco cruise options</p>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border-2 border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Alternative Dates</h3>
                          <p className="text-slate-600 dark:text-slate-400">Similar availability nearby</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {getAlternativeDates(formData.eventDate, formData.groupSize).map((altDate) => (
                          <Button
                            key={altDate.date.toISOString()}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, eventDate: altDate.date }));
                              resetDependentSelections('date');
                            }}
                            variant="outline"
                            className="w-full justify-between p-4 h-auto hover:bg-slate-50 dark:hover:bg-slate-700"
                            disabled={!altDate.isAvailable}
                            data-testid={`button-alt-date-${altDate.date.toISOString()}`}
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
                      </div>
                      
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">💡 Pro Tip</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          Weekday cruises often have better availability and special rates. Consider adjusting your date for the best experience!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Contact Form - Moved after Two-Column Layout */}
                {(!formData.firstName || !formData.email) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-xl">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl text-slate-800 dark:text-slate-200">Your Information</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          Enter your details to receive your personalized quote
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-300">First Name *</Label>
                              <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                                placeholder="John"
                                className="bg-white/50 dark:bg-slate-700/50"
                                data-testid="input-first-name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-300">Last Name *</Label>
                              <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                                placeholder="Doe"
                                className="bg-white/50 dark:bg-slate-700/50"
                                data-testid="input-last-name"
                              />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                placeholder="john.doe@example.com"
                                className="bg-white/50 dark:bg-slate-700/50"
                                data-testid="input-email"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">Phone (Optional)</Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="(555) 123-4567"
                                className="bg-white/50 dark:bg-slate-700/50"
                                data-testid="input-phone"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Send Quote Button */}
                        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <Button
                            onClick={handleSendQuote}
                            disabled={!formData.firstName || !formData.email || createLead.isPending}
                            className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                            data-testid="button-send-quote-summary"
                          >
                            {createLead.isPending ? (
                              <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                Sending Quote...
                              </>
                            ) : (
                              <>
                                <FileText className="h-5 w-5 mr-2" />
                                Send My Detailed Quote
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Final Send Quote Button - Keep at bottom */}
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className={cn(
                        "bg-gradient-to-b from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-900/20 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 transition-all w-full hover:shadow-3xl",
                        formData.selectedCruiseType === 'disco' ? "border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800" : "border-slate-200 dark:border-slate-700",
                        !isDiscoAvailableForDate(formData.eventDate) && "opacity-50"
                      )}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                          <Music className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">ATX Disco Cruise</h3>
                          <p className="text-slate-600 dark:text-slate-400">Party with others</p>
                        </div>
                      </div>
                      
                      {isDiscoAvailableForDate(formData.eventDate) ? (
                        <>
                          {/* Disco Time Slots */}
                          <div className="space-y-4 mb-6">
                            <h4 className="font-medium text-slate-700 dark:text-slate-300">Available Times</h4>
                            <RadioGroup 
                              value={formData.selectedDiscoTimeSlot}
                              onValueChange={(timeSlot) => {
                                if (formData.selectedDiscoPackage) {
                                  handleDiscoCruiseSelect(formData.selectedDiscoPackage, timeSlot);
                                }
                              }}
                              data-testid="radio-disco-time-slots"
                            >
                              {getDiscoTimeSlotsForDate(formData.eventDate).map((slot) => (
                                <div key={slot.id} className="flex items-center space-x-2">
                                  <RadioGroupItem value={slot.id} id={`disco-time-${slot.id}`} />
                                  <Label 
                                    htmlFor={`disco-time-${slot.id}`} 
                                    className="flex-1 flex items-center gap-2 cursor-pointer py-2"
                                  >
                                    <span className="text-lg">{slot.icon}</span>
                                    <span>{slot.label}</span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                          
                          {/* Disco Packages */}
                          <div className="space-y-4">
                            <h4 className="font-medium text-slate-700 dark:text-slate-300">Choose Your Package</h4>
                            <RadioGroup 
                              value={formData.selectedDiscoPackage || ''}
                              onValueChange={(packageId) => {
                                const timeSlot = formData.selectedDiscoTimeSlot || (formData.eventDate ? getDiscoTimeSlotsForDate(formData.eventDate)[0]?.id : '') || '';
                                handleDiscoCruiseSelect(packageId, timeSlot);
                              }}
                              data-testid="radio-disco-packages"
                            >
                              {discoPackages.map((pkg) => (
                                <div key={pkg.id} className="flex items-center space-x-2">
                                  <RadioGroupItem value={pkg.id} id={`disco-${pkg.id}`} />
                                  <Label 
                                    htmlFor={`disco-${pkg.id}`} 
                                    className="flex-1 cursor-pointer py-3 px-3 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <div className="font-medium text-slate-800 dark:text-slate-200">{pkg.name}</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">{pkg.description}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                          {pkg.features.join(' • ')}
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="font-bold text-purple-600">${pkg.price}</div>
                                        <div className="text-xs text-slate-500">per person</div>
                                      </div>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                          
                          {/* Disco Ticket Quantity Selector */}
                          {formData.selectedDiscoPackage && formData.selectedDiscoTimeSlot && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-6 space-y-4"
                            >
                              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">Number of Tickets</h4>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        if (formData.discoTicketQuantity > 1) {
                                          setFormData({...formData, discoTicketQuantity: formData.discoTicketQuantity - 1});
                                        }
                                      }}
                                      disabled={formData.discoTicketQuantity <= 1}
                                      className="h-8 w-8 p-0"
                                      data-testid="button-decrease-quantity"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <div className="flex flex-col items-center">
                                      <span className="text-xl font-bold text-slate-800 dark:text-slate-200" data-testid="text-ticket-quantity">
                                        {formData.discoTicketQuantity}
                                      </span>
                                      <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {formData.discoTicketQuantity === 1 ? 'ticket' : 'tickets'}
                                      </span>
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        if (formData.discoTicketQuantity < 50) {
                                          setFormData({...formData, discoTicketQuantity: formData.discoTicketQuantity + 1});
                                        }
                                      }}
                                      disabled={formData.discoTicketQuantity >= 50}
                                      className="h-8 w-8 p-0"
                                      data-testid="button-increase-quantity"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Total per package:</div>
                                    <div className="font-bold text-purple-600">
                                      ${(discoPackages.find(pkg => pkg.id === formData.selectedDiscoPackage)?.price || 0) * formData.discoTicketQuantity}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center">
                                  Select 1-50 tickets for your group • All tickets must be from the same package
                                </div>
                              </div>
                            </motion.div>
                          )}
                          
                          {/* Enhanced Disco Cruise Pricing */}
                          {formData.selectedDiscoPackage && formData.selectedDiscoTimeSlot && discoPricing && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-6 space-y-6"
                            >
                              {/* Detailed Pricing Breakdown */}
                              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 text-center">Investment Breakdown</h4>
                                
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Package Cost ({formData.discoTicketQuantity} {formData.discoTicketQuantity === 1 ? 'ticket' : 'tickets'}):</span>
                                    <span className="font-medium">{formatCurrency(discoPricing.subtotal)}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Sales Tax (8.25%):</span>
                                    <span className="font-medium">{formatCurrency(discoPricing.tax)}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Tip for the Captain and Crew (20%):</span>
                                    <span className="font-medium">{formatCurrency(discoPricing.gratuity || Math.round(discoPricing.subtotal * 0.20))}</span>
                                  </div>
                                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                                    <div className="flex justify-between items-center text-lg font-bold">
                                      <span className="text-slate-800 dark:text-slate-200">Total Price:</span>
                                      <span className="text-purple-600 dark:text-purple-400">{formatCurrency(discoPricing.total)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm mt-1">
                                      <span className="text-slate-500 dark:text-slate-400">Per person:</span>
                                      <span className="text-slate-600 dark:text-slate-300">{formatCurrency(discoPricing.total / formData.discoTicketQuantity)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Payment Options */}
                              <div className="space-y-4">
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                  <div className="flex justify-between items-center mb-3">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">Secure Your Booking:</span>
                                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">25% Deposit</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-4">
                                    <span className="text-slate-600 dark:text-slate-400">Deposit Amount:</span>
                                    <span className="text-xl font-bold text-green-600 dark:text-green-400">{formatCurrency(discoPricing.depositAmount)}</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <Button
                                      onClick={() => createDepositPayment.mutate()}
                                      disabled={createDepositPayment.isPending}
                                      className="bg-green-600 hover:bg-green-700 text-white h-12"
                                      data-testid="button-pay-deposit-disco"
                                    >
                                      {createDepositPayment.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                      <CreditCard className="h-4 w-4 mr-2" />
                                      Pay Deposit
                                    </Button>
                                    <Button
                                      onClick={() => createFullPayment.mutate()}
                                      disabled={createFullPayment.isPending}
                                      variant="outline"
                                      className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 h-12"
                                      data-testid="button-pay-full-disco"
                                    >
                                      {createFullPayment.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                      <Sparkles className="h-4 w-4 mr-2" />
                                      Pay in Full
                                    </Button>
                                  </div>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
                                    Balance due: {formatCurrency(discoPricing.total - discoPricing.depositAmount)}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                          <h4 className="font-medium text-slate-600 dark:text-slate-400 mb-2">Not Available</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-500">
                            ATX Disco Cruises are only available on Fridays and Saturdays
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    /* Alternative Dates for Non-Bachelor/Bachelorette Groups */
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border-2 border-slate-200 dark:border-slate-700 w-full"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Alternative Dates</h3>
                          <p className="text-slate-600 dark:text-slate-400">Consider nearby dates for {formData.groupSize} people</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm">
                            <span className="font-medium">Selected:</span>
                            <span>{format(formData.eventDate, 'EEEE, MMMM d, yyyy')}</span>
                          </div>
                        </div>

                        <h4 className="font-medium text-slate-700 dark:text-slate-300">Nearby Available Dates</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {getAlternativeDates(formData.eventDate, formData.groupSize).map((alt, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (alt.isAvailable) {
                                  setFormData(prev => ({ 
                                    ...prev, 
                                    eventDate: alt.date,
                                    selectedTimeSlot: '', // Reset time slot when date changes
                                    selectedCruiseType: null // Reset cruise type selection
                                  }));
                                  setCurrentQuestion('comparison-selection'); // Stay on this page
                                }
                              }}
                              disabled={!alt.isAvailable}
                              className={cn(
                                "p-3 rounded-lg border-2 transition-all text-left",
                                alt.isAvailable 
                                  ? "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer" 
                                  : "border-slate-100 dark:border-slate-800 opacity-50 cursor-not-allowed",
                              )}
                              data-testid={`button-alt-date-${index}`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-slate-800 dark:text-slate-200">
                                    {alt.dayName} {alt.dayNumber}
                                  </div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">
                                    {alt.monthName}
                                  </div>
                                </div>
                                <div className="text-right">
                                  {alt.isAvailable ? (
                                    <div className="text-xs text-green-600 dark:text-green-400">
                                      {alt.timeSlotsAvailable} slots
                                    </div>
                                  ) : (
                                    <div className="text-xs text-red-500 dark:text-red-400">
                                      Unavailable
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl">
                          <div className="text-center">
                            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                              Why Consider Alternative Dates?
                            </h4>
                            <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                              <p>• Better availability and time slot options</p>
                              <p>• Potential weekday discounts</p>
                              <p>• Less crowded lake conditions</p>
                              <p>• More flexible scheduling</p>
                            </div>
                          </div>
                        </div>

                        <div className="text-center pt-4">
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Click any available date to update your selection
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                
                {/* Send Me My Quote Option - Always Available */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl mx-auto mt-12 text-center"
                >
                  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                        Not Ready to Book Yet?
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Get a detailed quote sent to your email and phone with all the pricing details, terms, and next steps.
                      </p>
                    </div>
                    
                    {/* Special Requests */}
                    <div className="space-y-3 mb-6">
                      <Label htmlFor="specialRequests" className="text-slate-700 dark:text-slate-300 text-left block">
                        Special Requests or Questions (Optional)
                      </Label>
                      <Textarea
                        id="specialRequests"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        placeholder="Any special requirements, dietary restrictions, accessibility needs, or questions..."
                        className="bg-white/50 dark:bg-slate-700/50 resize-none"
                        rows={3}
                        data-testid="textarea-special-requests"
                      />
                    </div>
                    
                    <Button
                      onClick={handleSendQuote}
                      disabled={createLead.isPending}
                      size="lg"
                      className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      data-testid="button-send-quote"
                    >
                      {createLead.isPending ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                          Generating Your Quote...
                        </>
                      ) : (
                        <>
                          <Mail className="h-5 w-5 mr-3" />
                          Send Me My Detailed Quote
                          <ChevronRight className="h-5 w-5 ml-3" />
                        </>
                      )}
                    </Button>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                      📧 Email • 📱 Text Message • 🚢 Interactive Quote • 📞 Personal Follow-up
                    </p>
                    
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                      <div className="flex items-center justify-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">No commitment required • Quotes valid for 30 days • Free consultation included</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}


            {/* Success/Complete State */}
            {currentQuestion === 'complete' && (
              <motion.div
                key="complete"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="text-center space-y-8 max-w-2xl mx-auto"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto"
                >
                  <Check className="h-12 w-12 text-green-600" />
                </motion.div>
                
                <div>
                  <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                    Quote Sent Successfully!
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                    Check your email and text messages for your interactive quote with all the details.
                  </p>
                  
                  {/* Action Buttons */}
                  {generatedQuoteId && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="mb-6 space-y-4"
                    >
                      {/* View Interactive Quote Button */}
                      <Button
                        onClick={openQuoteInNewWindow}
                        size="lg"
                        className="h-14 px-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        data-testid="button-view-quote"
                      >
                        <FileText className="h-5 w-5 mr-3" />
                        View Interactive Quote
                        <ChevronRight className="h-5 w-5 ml-3" />
                      </Button>
                      
                      {/* Pay & Book Online Button */}
                      {(privatePricing || discoPricing) && (() => {
                        const currentPricing = formData.selectedCruiseType === 'disco' ? discoPricing : privatePricing;
                        return currentPricing && (
                          <Button
                            onClick={() => setShowPaymentModal(true)}
                            size="lg"
                            className="h-14 px-8 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            data-testid="button-pay-book"
                          >
                            <CreditCard className="h-5 w-5 mr-3" />
                            Pay & Book Online
                            {isWithin30Days() ? (
                              <span className="ml-3 text-sm font-normal opacity-90">
                                ({formatCurrency(currentPricing.total)})
                              </span>
                            ) : (
                              <span className="ml-3 text-sm font-normal opacity-90">
                                (from {formatCurrency(currentPricing.depositAmount)})
                              </span>
                            )}
                          </Button>
                        );
                      })()}
                      
                      <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                        {isWithin30Days() 
                          ? "Full payment required - event is within 30 days"
                          : "Secure your booking with a deposit or pay in full"
                        }
                      </p>
                    </motion.div>
                  )}
                  
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">What's Next?</h3>
                      <ul className="text-left space-y-2 text-slate-600 dark:text-slate-400">
                        <li className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          You'll receive a detailed quote via email and SMS
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          Review your interactive quote using the button above
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          Our team will contact you within 24 hours
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          You can modify or confirm your booking anytime
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
      
      {/* Payment Modal */}
      <PaymentModal />
    </div>
  );
}