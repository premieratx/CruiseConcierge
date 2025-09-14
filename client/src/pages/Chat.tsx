import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ship, ChevronRight, DollarSign, Users, 
  Calendar as CalendarIcon, Clock, Check, X,
  User, Mail, Phone, MapPin, Star, Sparkles, CreditCard,
  FileText, AlertCircle, Loader2, ChevronLeft, Edit2,
  Music, Anchor, Crown, Zap, Calendar, ArrowRight, ArrowLeft,
  RotateCcw, CheckCircle, Settings
} from 'lucide-react';
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
import type { InsertContact, InsertProject, PricingPreview, InsertQuote, RadioSection } from '@shared/schema';

type Question = 
  | 'event-type' 
  | 'contact-info' 
  | 'date-selection' 
  | 'comparison-selection' 
  | 'final-review' 
  | 'complete';

type CruiseType = 'private' | 'disco';
type DiscoPackage = 'basic' | 'disco_queen' | 'platinum';

interface DiscoPricing {
  basic: number; // per person
  disco_queen: number; // per person
  platinum: number; // per person
}

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
  selectedDiscoPackage: DiscoPackage | null;
  selectedDiscoTimeSlot: string;
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
  const [pricing, setPricing] = useState<PricingPreview | null>(null);
  const [discoPricing, setDiscoPricing] = useState<DiscoPricing | null>(null);
  const [generatedQuoteId, setGeneratedQuoteId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<'deposit' | 'full'>('deposit');
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
    selectedDiscoPackage: null,
    selectedDiscoTimeSlot: '',
  });
  const [questionHistory, setQuestionHistory] = useState<Question[]>(['event-type']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [maxProgressIndex, setMaxProgressIndex] = useState(0);
  const { toast } = useToast();

  // Fetch pricing when all required data is available
  useEffect(() => {
    if (formData.eventDate && formData.selectedTimeSlot && formData.groupSize && formData.selectedCruiseType === 'private') {
      fetchPrivatePricing();
    }
  }, [formData.eventDate, formData.selectedTimeSlot, formData.groupSize, formData.selectedCruiseType]);
  
  // Calculate disco pricing when relevant data changes
  useEffect(() => {
    if (formData.selectedCruiseType === 'disco' && formData.selectedDiscoPackage && formData.groupSize) {
      calculateDiscoPricing();
    }
  }, [formData.selectedDiscoPackage, formData.groupSize, formData.selectedCruiseType]);

  // Fetch private cruise pricing
  const fetchPrivatePricing = async () => {
    try {
      const res = await apiRequest('POST', '/api/pricing/cruise', {
        groupSize: formData.groupSize.toString(),
        eventDate: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : '',
        timeSlot: formData.selectedTimeSlot,
        eventType: formData.eventType,
        cruiseType: 'private',
      });
      const response = await res.json();
      setPricing(response);
    } catch (error) {
      console.error('Failed to fetch private pricing:', error);
      setPricing(null);
    }
  };
  
  // Calculate disco cruise pricing
  const calculateDiscoPricing = () => {
    if (!formData.selectedDiscoPackage) return;
    
    const selectedPackage = discoPackages.find(pkg => pkg.id === formData.selectedDiscoPackage);
    if (!selectedPackage) return;
    
    const subtotal = selectedPackage.price * formData.groupSize;
    const tax = Math.round(subtotal * 0.0825); // 8.25% tax
    const total = subtotal + tax;
    
    setDiscoPricing({
      basic: discoPackages[0].price,
      disco_queen: discoPackages[1].price,
      platinum: discoPackages[2].price,
    });
    
    // Store calculated totals for the selected package
    setPricing({
      subtotal: subtotal * 100, // Convert to cents
      tax: tax * 100,
      total: total * 100,
      perPersonCost: selectedPackage.price * 100,
      discountTotal: 0,
      gratuity: 0,
      depositRequired: true,
      depositPercent: 25,
      depositAmount: Math.round(total * 0.25) * 100,
      paymentSchedule: [],
      breakdown: {
        boatType: selectedPackage.name,
        dayName: formData.eventDate ? format(formData.eventDate, 'EEEE') : '',
        cruiseDuration: 4,
        baseCruiseCost: selectedPackage.price,
        crewFee: 0,
      }
    });
  };

  // Enhanced Navigation functions
  const questionOrder: Question[] = [
    'event-type', 'contact-info', 'date-selection', 
    'comparison-selection', 'final-review', 'complete'
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
        selectedDiscoPackage: null,
        selectedDiscoTimeSlot: '',
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
        selectedDiscoPackage: null,
        selectedDiscoTimeSlot: '',
      }));
    } else if (fromSelectionId === 'date') {
      setFormData(prev => ({
        ...prev,
        eventDate: undefined,
        selectedCruiseType: null,
        selectedTimeSlot: '',
        selectedDiscoPackage: null,
        selectedDiscoTimeSlot: '',
      }));
    } else if (fromSelectionId === 'group-size') {
      setFormData(prev => ({
        ...prev,
        selectedCruiseType: null,
        selectedTimeSlot: '',
        selectedDiscoPackage: null,
        selectedDiscoTimeSlot: '',
      }));
    }
    
    // Clear pricing when relevant
    if (['date', 'group-size', 'comparison'].includes(fromSelectionId)) {
      setPricing(null);
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
      'group-size': 'date-selection', // Group size is set on date selection page
      'comparison': 'comparison-selection',
    };
    
    const targetQuestion = questionMap[selectionId];
    if (targetQuestion) {
      goToQuestion(targetQuestion);
    }
  };
  
  const isDateAvailable = (date: Date) => {
    const today = startOfDay(new Date());
    const maxDate = addDays(today, 365);
    return !isBefore(date, today) && !isAfter(date, maxDate);
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

  // Get payment options based on date
  const getPaymentOptions = () => {
    if (!pricing) return [];
    
    const within30Days = isWithin30Days();
    const options = [];
    
    if (!within30Days) {
      options.push({
        id: 'deposit',
        label: 'Pay Deposit',
        amount: pricing.depositAmount,
        description: `${pricing.depositPercent}% deposit to secure your booking`,
        popular: true
      });
    }
    
    options.push({
      id: 'full',
      label: within30Days ? 'Pay in Full (Required)' : 'Pay in Full',
      amount: pricing.total,
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
      }, 600); // Delay for animation
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
    progressToNextQuestion();
  };

  // Contact Info Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
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
        selectedDiscoTimeSlot: ''
      });
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
      progressToNextQuestion();
    }
  };
  
  // Private cruise selection handler
  const handlePrivateCruiseSelect = (timeSlot: string) => {
    setFormData({ 
      ...formData, 
      selectedCruiseType: 'private',
      selectedTimeSlot: timeSlot
    });
  };
  
  // Disco cruise selection handler
  const handleDiscoCruiseSelect = (packageId: string, timeSlot: string) => {
    setFormData({ 
      ...formData, 
      selectedCruiseType: 'disco',
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
        budget: pricing?.total || (data.budget ? Math.round(parseFloat(data.budget) * 100) : undefined),
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
      
      if (pricing && pricing.breakdown) {
        const quoteItems = [];
        
        if (data.selectedCruiseType === 'disco' && data.selectedDiscoPackage) {
          const selectedPackage = discoPackages.find(pkg => pkg.id === data.selectedDiscoPackage);
          if (selectedPackage) {
            quoteItems.push({
              name: `${selectedPackage.name} - ${data.groupSize} people`,
              unitPrice: selectedPackage.price * 100,
              qty: data.groupSize,
              taxable: true,
            });
          }
        } else {
          quoteItems.push({
            name: `${pricing.breakdown.boatType} - ${pricing.breakdown.dayName} ${pricing.breakdown.cruiseDuration}-Hour Cruise`,
            unitPrice: pricing.breakdown.baseCruiseCost * 100,
            qty: 1,
            taxable: true,
          });
          
          if (pricing.breakdown.crewFee > 0) {
            quoteItems.push({
              name: 'Additional Crew (Texas Law Requirement)',
              unitPrice: pricing.breakdown.crewFee * 100,
              qty: 1,
              taxable: true,
            });
          }
        }

        // Create radio sections based on cruise type
        const radioSections: RadioSection[] = [];
        
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
        
        const quote: InsertQuote = {
          projectId: projectResponse.id,
          items: quoteItems,
          radioSections: radioSections,
          subtotal: pricing.subtotal,
          discountTotal: pricing.discountTotal,
          tax: pricing.tax,
          gratuity: pricing.gratuity,
          total: pricing.total,
          perPersonCost: pricing.perPersonCost,
          depositRequired: pricing.depositRequired,
          depositPercent: pricing.depositPercent,
          depositAmount: pricing.depositAmount,
          paymentSchedule: pricing.paymentSchedule,
          status: 'DRAFT',
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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

  // Payment mutations
  const createDepositPayment = useMutation({
    mutationFn: async () => {
      if (!pricing) throw new Error('No pricing data available');
      
      const res = await apiRequest('POST', '/api/create-payment-intent', {
        amount: pricing.depositAmount,
        metadata: {
          type: 'deposit',
          eventType: formData.eventType,
          eventDate: formData.eventDate?.toISOString(),
          groupSize: formData.groupSize,
        }
      });
      const { clientSecret } = await res.json();
      
      window.location.href = `/checkout?client_secret=${clientSecret}&return_url=${encodeURIComponent(window.location.origin + '/booking-confirmed')}`;
    },
    onError: () => {
      toast({ 
        title: 'Payment Error', 
        description: 'Unable to process payment. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const createFullPayment = useMutation({
    mutationFn: async () => {
      if (!pricing) throw new Error('No pricing data available');
      
      const res = await apiRequest('POST', '/api/create-payment-intent', {
        amount: pricing.total,
        metadata: {
          type: 'full_payment',
          eventType: formData.eventType,
          eventDate: formData.eventDate?.toISOString(),
          groupSize: formData.groupSize,
        }
      });
      const { clientSecret } = await res.json();
      
      window.location.href = `/checkout?client_secret=${clientSecret}&return_url=${encodeURIComponent(window.location.origin + '/booking-confirmed')}`;
    },
    onError: () => {
      toast({ 
        title: 'Payment Error', 
        description: 'Unable to process payment. Please try again.',
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
        'date-selection': 'Date & Group',
        'comparison-selection': 'Cruise Options',
        'final-review': 'Review & Book',
        'complete': 'Complete'
      };
      return stepNames[question] || 'Unknown';
    };
    
    const currentStepNumber = currentQuestionIndex + 1;
    const totalSteps = questionOrder.length - 1; // Exclude 'complete'
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Step {currentStepNumber} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {getStepName(currentQuestion)}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStepNumber / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              onClick={goBack}
              disabled={!canGoBack()}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              data-testid="button-nav-back"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="flex items-center gap-2">
              {canGoForward() && (
                <Button
                  onClick={goForward}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  data-testid="button-nav-forward"
                >
                  Forward
                  <ArrowRight className="h-4 w-4" />
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
                      selectedDiscoPackage: null,
                      selectedDiscoTimeSlot: '',
                    });
                    setPricing(null);
                    setDiscoPricing(null);
                  }}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-700"
                  data-testid="button-nav-restart"
                >
                  <RotateCcw className="h-4 w-4" />
                  Start Over
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
    const paymentOptions = getPaymentOptions();
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
                {pricing && (
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>{formatCurrency(pricing.total)}</span>
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
      
      {/* Navigation Bar - Always Visible */}
      {currentQuestion !== 'complete' && <NavigationBar />}
      
      {/* Completed Selections Header - Enhanced */}
      <AnimatePresence>
        {completedSelections.length > 0 && currentQuestion !== 'complete' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700"
          >
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Your Selections
                </h3>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Click any item to edit
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <AnimatePresence>
                  {completedSelections.map((selection, index) => (
                    <motion.div
                      key={selection.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "flex items-center gap-2 py-2 px-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
                          selection.editable && "cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        )}
                        onClick={selection.editable ? selection.onEdit : undefined}
                        data-testid={`badge-${selection.id}`}
                      >
                        {selection.emoji && <span className="text-sm">{selection.emoji}</span>}
                        {selection.icon && getIconComponent(selection.icon, 14)}
                        <span className="font-medium">{selection.label}:</span>
                        <span>{selection.value}</span>
                        {selection.editable && <Edit2 className="h-3 w-3 ml-1" />}
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {pricing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Badge className="ml-auto flex items-center gap-2 py-2 px-4 bg-green-600 dark:bg-green-700">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-bold">{formatCurrency(pricing.total)}</span>
                    </Badge>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area - Enhanced */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl">
          
          <AnimatePresence mode="wait">
            
            {/* Event Type Selection */}
            {currentQuestion === 'event-type' && (
              <motion.div
                key="event-type"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-8"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto"
                  >
                    <Ship className="h-10 w-10 text-blue-600" />
                  </motion.div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AI Cruise Booking
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-400">
                    What type of event are you planning?
                  </p>
                </div>

                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {eventTypes.map((type, index) => (
                    <motion.div
                      key={type.id}
                      variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <Button
                        variant="outline"
                        className="h-32 flex flex-col gap-3 hover:scale-105 transition-all hover:border-blue-500 hover:shadow-lg group relative overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm"
                        onClick={() => handleEventTypeSelect(type.id, type.label, type.emoji)}
                        data-testid={`button-event-${type.id}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 to-blue-50/50 group-hover:to-blue-100/50 transition-all" />
                        <span className="text-3xl mb-1">{type.emoji}</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{type.label}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{type.description}</span>
                      </Button>
                    </motion.div>
                  ))}
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
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-slate-800 dark:text-slate-200">Let's get to know you</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      We'll use this information to send you your quote
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg" data-testid="button-continue">
                        Continue
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Date Selection */}
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
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Choose an available date for your event</p>
                  </div>
                  
                  {/* Group Size Slider - Moved to Date Selection */}
                  {formData.eventDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 max-w-md mx-auto"
                    >
                      <div className="space-y-4">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Group Size</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">How many people will be joining?</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Number of People</Label>
                            <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                              {formData.groupSize} {formData.groupSize === 1 ? 'person' : 'people'}
                            </Badge>
                          </div>
                          
                          <Slider
                            value={[formData.groupSize]}
                            onValueChange={handleGroupSizeChange}
                            min={GROUP_SIZE_MIN}
                            max={GROUP_SIZE_MAX}
                            step={1}
                            className="w-full"
                            data-testid="slider-group-size"
                          />
                          
                          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>Min: {GROUP_SIZE_MIN}</span>
                            <span>Max: {GROUP_SIZE_MAX}</span>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleGroupSizeConfirm}
                          disabled={formData.groupSize < GROUP_SIZE_MIN || formData.groupSize > GROUP_SIZE_MAX}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          data-testid="button-confirm-group-size"
                        >
                          Continue with {formData.groupSize} {formData.groupSize === 1 ? 'person' : 'people'}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6"
                  >
                    <Calendar
                      mode="single"
                      selected={formData.eventDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => !isDateAvailable(date)}
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

            {/* Side-by-Side Comparison - Core Feature */}
            {currentQuestion === 'comparison-selection' && formData.eventDate && (
              <motion.div
                key="comparison-selection"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">Choose Your Cruise Experience</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    {format(formData.eventDate, 'EEEE, MMMM d')} • {formData.groupSize} {formData.groupSize === 1 ? 'person' : 'people'}
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {/* Private Cruise Options */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={cn(
                      "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border-2 transition-all",
                      formData.selectedCruiseType === 'private' ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800" : "border-slate-200 dark:border-slate-700"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Anchor className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Private Cruise</h3>
                        <p className="text-slate-600 dark:text-slate-400">Exclusive boat rental</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-700 dark:text-slate-300">Available Time Slots</h4>
                      <RadioGroup 
                        value={formData.selectedCruiseType === 'private' ? formData.selectedTimeSlot : ''}
                        onValueChange={(value) => handlePrivateCruiseSelect(value)}
                        data-testid="radio-private-time-slots"
                      >
                        {getPrivateTimeSlotsForDate(formData.eventDate).map((slot) => (
                          <div key={slot.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={slot.id} id={`private-${slot.id}`} />
                            <Label 
                              htmlFor={`private-${slot.id}`} 
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
                    
                    {/* Private Cruise Pricing */}
                    {formData.selectedCruiseType === 'private' && formData.selectedTimeSlot && pricing && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
                      >
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600 mb-2">
                            {formatCurrency(pricing.total)}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {formatCurrency(pricing.perPersonCost)} per person
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                            Subtotal: {formatCurrency(pricing.subtotal)} + Tax: {formatCurrency(pricing.tax)}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* ATX Disco Cruise Options */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className={cn(
                      "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border-2 transition-all",
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
                            value={formData.selectedCruiseType === 'disco' ? formData.selectedDiscoTimeSlot : ''}
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
                            value={formData.selectedCruiseType === 'disco' ? formData.selectedDiscoPackage || '' : ''}
                            onValueChange={(packageId) => {
                              const timeSlot = formData.selectedDiscoTimeSlot || getDiscoTimeSlotsForDate(formData.eventDate)[0]?.id || '';
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
                        
                        {/* Disco Cruise Pricing */}
                        {formData.selectedCruiseType === 'disco' && formData.selectedDiscoPackage && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
                          >
                            <div className="text-center">
                              <div className="text-3xl font-bold text-green-600 mb-2">
                                {pricing && formatCurrency(pricing.total)}
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                {pricing && formatCurrency(pricing.perPersonCost)} per person
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                                Subtotal: {pricing && formatCurrency(pricing.subtotal)} + Tax: {pricing && formatCurrency(pricing.tax)}
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
                </div>
                
                {/* Continue Button */}
                {((formData.selectedCruiseType === 'private' && formData.selectedTimeSlot) ||
                  (formData.selectedCruiseType === 'disco' && formData.selectedDiscoPackage && formData.selectedDiscoTimeSlot)) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-8"
                  >
                    <Button 
                      onClick={handleComparisonComplete}
                      className="bg-blue-600 hover:bg-blue-700" 
                      size="lg"
                      data-testid="button-continue-to-review"
                    >
                      Continue to Review
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Final Review & Booking */}
            {currentQuestion === 'final-review' && pricing && (
              <motion.div
                key="final-review"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                    {(formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') && pricing.showBothOptions 
                      ? 'Choose Your Perfect Experience' 
                      : 'Your Cruise Details'}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    {(formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') && pricing.showBothOptions 
                      ? 'Select between our private cruise and disco cruise experiences'
                      : 'Review and book your perfect cruise experience'}
                  </p>
                </div>

                {/* Show both cruise options for bachelor/bachelorette parties */}
                {(formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') && pricing.showBothOptions ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Private Cruise Option */}
                    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-xl relative">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Ship className="h-8 w-8 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Private Cruise</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Your own private boat experience</p>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-900/30 dark:to-slate-900/30 rounded-xl mb-4">
                          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                            {formatCurrency(pricing.privateCruise.total)}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {formatCurrency(pricing.privateCruise.perPersonCost)} per person
                          </p>
                        </div>

                        <Button 
                          onClick={() => {
                            setPricing(pricing.privateCruise);
                            // Continue with private cruise booking
                          }}
                          className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                          data-testid="button-select-private-cruise"
                        >
                          Choose Private Cruise
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Disco Cruise Options */}
                    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-xl relative">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Sparkles className="h-8 w-8 text-purple-600" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">ATX Disco Cruise</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Dance the night away on Lake Austin</p>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          {pricing.discoCruise.options.map((option, index) => (
                            <div key={option.id} 
                                 className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer transition-colors"
                                 onClick={() => {
                                   // Create pricing object for disco cruise
                                   const discoPricing = {
                                     total: option.totalPrice,
                                     perPersonCost: option.pricePerPerson,
                                     depositAmount: Math.round(option.totalPrice * 0.25),
                                     depositPercent: 25,
                                     showBothOptions: false
                                   };
                                   setPricing(discoPricing);
                                 }}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">{option.name}</h4>
                                  <p className="text-xs text-slate-600 dark:text-slate-400">{formatCurrency(option.pricePerPerson)} per person</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(option.totalPrice)}</div>
                                  <div className="text-xs text-slate-500">total</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  /* Single cruise option for all other events */
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-xl">
                    <CardContent className="p-8">
                      
                      {/* Pricing Breakdown */}
                      <div className="space-y-6">
                        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
                          <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                            {formatCurrency(pricing.total)}
                          </div>
                          <p className="text-slate-600 dark:text-slate-400">
                            Total Cost • {formatCurrency(pricing.perPersonCost)} per person
                          </p>
                        </div>

                        {/* Special Requests */}
                      <div className="space-y-3">
                        <Label htmlFor="specialRequests" className="text-slate-700 dark:text-slate-300">
                          Special Requests (Optional)
                        </Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                          placeholder="Any special requirements, dietary restrictions, or requests..."
                          className="bg-white/50 dark:bg-slate-700/50 resize-none"
                          rows={3}
                          data-testid="textarea-special-requests"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Choose how you'd like to proceed
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Button
                            onClick={handleSendQuote}
                            disabled={createLead.isPending}
                            className="h-16 flex flex-col gap-1 bg-blue-600 hover:bg-blue-700"
                            data-testid="button-send-quote"
                          >
                            <Mail className="h-5 w-5" />
                            <span className="font-semibold">Send My Quote</span>
                            <span className="text-xs opacity-90">Get detailed quote</span>
                          </Button>
                          
                          <Button
                            onClick={() => createDepositPayment.mutate()}
                            disabled={createDepositPayment.isPending}
                            variant="outline"
                            className="h-16 flex flex-col gap-1 bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/50"
                            data-testid="button-pay-deposit"
                          >
                            <CreditCard className="h-5 w-5" />
                            <span className="font-semibold">Pay Deposit</span>
                            <span className="text-xs opacity-90">{formatCurrency(pricing.depositAmount)}</span>
                          </Button>
                          
                          <Button
                            onClick={() => createFullPayment.mutate()}
                            disabled={createFullPayment.isPending}
                            variant="outline"
                            className="h-16 flex flex-col gap-1 bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/50"
                            data-testid="button-pay-full"
                          >
                            <Sparkles className="h-5 w-5" />
                            <span className="font-semibold">Pay in Full</span>
                            <span className="text-xs opacity-90">{formatCurrency(pricing.total)}</span>
                          </Button>
                        </div>
                        
                        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                          Secure payment powered by Stripe • Full refund if cancelled 48+ hours in advance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                )}
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
                      {pricing && (
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
                              ({formatCurrency(pricing.total)})
                            </span>
                          ) : (
                            <span className="ml-3 text-sm font-normal opacity-90">
                              (from {formatCurrency(pricing.depositAmount)})
                            </span>
                          )}
                        </Button>
                      )}
                      
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