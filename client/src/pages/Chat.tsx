import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ship, ChevronRight, DollarSign, Users, 
  Calendar as CalendarIcon, Clock, Check, X,
  User, Mail, Phone, MapPin, Star, Sparkles, CreditCard,
  FileText, AlertCircle, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { format, addDays, isBefore, isAfter, startOfDay, differenceInDays } from 'date-fns';
import type { InsertContact, InsertProject, PricingPreview, InsertQuote, RadioSection } from '@shared/schema';

type Question = 
  | 'event-type' 
  | 'contact-info' 
  | 'date-selection' 
  | 'time-selection' 
  | 'group-size' 
  | 'final-review' 
  | 'complete';

interface BookingData {
  eventType: string;
  eventTypeLabel: string;
  eventEmoji: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: Date | undefined;
  preferredTime: string;
  preferredTimeLabel: string;
  groupSize: string;
  groupSizeLabel: string;
  specialRequests: string;
  budget: string;
}

interface CompletedSelection {
  id: string;
  label: string;
  value: string;
  icon?: string;
  emoji?: string;
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

const getTimeSlotsForDate = (date: Date) => {
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

const groupSizeOptions = [
  { value: '10', label: '1-10', description: 'Intimate gathering' },
  { value: '20', label: '11-20', description: 'Small party' },
  { value: '30', label: '21-30', description: 'Medium group' },
  { value: '40', label: '31-40', description: 'Large party' },
  { value: '50', label: '41-50', description: 'Big celebration' },
  { value: '75', label: '51-75', description: 'Grand event' },
];

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
    preferredTime: '',
    preferredTimeLabel: '',
    groupSize: '',
    groupSizeLabel: '',
    specialRequests: '',
    budget: '',
  });
  const { toast } = useToast();

  // Fetch pricing when all required data is available
  useEffect(() => {
    if (formData.eventDate && formData.preferredTime && formData.groupSize) {
      fetchPricing();
    }
  }, [formData.eventDate, formData.preferredTime, formData.groupSize]);

  const fetchPricing = async () => {
    try {
      // Determine cruise type based on event type
      const cruiseType = (formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') 
        ? 'both' // Show both disco and private cruise options
        : 'private'; // Show only private cruise options
        
      const res = await apiRequest('POST', '/api/pricing/cruise', {
        groupSize: formData.groupSize,
        eventDate: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : '',
        timeSlot: formData.preferredTime,
        eventType: formData.eventType,
        cruiseType: cruiseType,
      });
      const response = await res.json();
      setPricing(response);
    } catch (error) {
      console.error('Failed to fetch pricing:', error);
      setPricing(null);
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
    setCompletedSelections(prev => [...prev, selection]);
  };

  const progressToNextQuestion = () => {
    const questionOrder: Question[] = [
      'event-type', 'contact-info', 'date-selection', 
      'time-selection', 'group-size', 'final-review'
    ];
    
    const currentIndex = questionOrder.indexOf(currentQuestion);
    if (currentIndex < questionOrder.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(questionOrder[currentIndex + 1]);
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
      setFormData({ ...formData, eventDate: date });
      addCompletedSelection({
        id: 'date',
        label: 'Date',
        value: format(date, 'MMM dd, yyyy'),
        icon: 'calendar'
      });
      progressToNextQuestion();
    }
  };

  // Time Selection Handler
  const handleTimeSelect = (timeId: string, timeLabel: string, timeIcon: string) => {
    setFormData({ ...formData, preferredTime: timeId, preferredTimeLabel: timeLabel });
    addCompletedSelection({
      id: 'time',
      label: 'Time',
      value: timeLabel,
      emoji: timeIcon
    });
    progressToNextQuestion();
  };

  // Group Size Handler
  const handleGroupSizeSelect = (size: string, label: string, description: string) => {
    setFormData({ ...formData, groupSize: size, groupSizeLabel: label });
    addCompletedSelection({
      id: 'group-size',
      label: 'Group Size',
      value: `${label} people`,
      icon: 'users'
    });
    progressToNextQuestion();
  };

  // Create lead mutation
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
        groupSize: parseInt(data.groupSize) || undefined,
        eventType: data.eventType,
        specialRequests: data.specialRequests || undefined,
        preferredTime: data.preferredTime || undefined,
        budget: pricing?.total || (data.budget ? Math.round(parseFloat(data.budget) * 100) : undefined),
        leadSource: 'chat',
        orgId: 'org_demo',
        status: 'NEW',
        pipelinePhase: 'ph_new',
        tags: [],
      };
      
      const projectRes = await apiRequest('POST', '/api/projects', project);
      const projectResponse = await projectRes.json();
      
      if (data.eventDate) {
        await apiRequest('PATCH', `/api/projects/${projectResponse.id}`, {
          projectDate: data.eventDate.toISOString(),
        });
      }
      
      if (pricing && pricing.breakdown) {
        const quoteItems = [
          {
            name: `${pricing.breakdown.boatType} - ${pricing.breakdown.dayName} ${pricing.breakdown.cruiseDuration}-Hour Cruise`,
            unitPrice: pricing.breakdown.baseCruiseCost * 100,
            qty: 1,
            taxable: true,
          }
        ];
        
        if (pricing.breakdown.crewFee > 0) {
          quoteItems.push({
            name: 'Additional Crew (Texas Law Requirement)',
            unitPrice: pricing.breakdown.crewFee * 100,
            qty: 1,
            taxable: true,
          });
        }

        // Create radio sections for time slot selection
        const radioSections: RadioSection[] = [];
        
        if (data.eventDate && data.preferredTime) {
          const availableTimeSlots = getTimeSlotsForDate(data.eventDate);
          const timeSlotOptions = availableTimeSlots.map(slot => ({
            id: slot.id,
            name: slot.label,
            description: slot.popular ? 'Popular choice' : 'Available',
            price: 0, // Time slots are included in base price
            selected: slot.id === data.preferredTime,
          }));

          radioSections.push({
            id: 'time-slot-selection',
            title: 'Cruise Time Options',
            description: 'Choose your preferred cruise time',
            required: true,
            options: timeSlotOptions,
            order: 0,
          });
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
        
        // Store the quote ID for the "View My Quote" button
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
      default: return null;
    }
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
      
      {/* Condensed Header - Shows completed selections */}
      <AnimatePresence>
        {completedSelections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <div className="max-w-4xl mx-auto px-6 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Ship className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Cruise Booking Progress</h3>
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
                        className="flex items-center gap-2 py-2 px-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      >
                        {selection.emoji && <span className="text-sm">{selection.emoji}</span>}
                        {selection.icon && getIconComponent(selection.icon, 14)}
                        <span className="font-medium">{selection.label}:</span>
                        <span>{selection.value}</span>
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

      {/* Main Content Area - Centered */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          
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
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">Select Your Cruise Date</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">Choose an available date for your event</p>
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

            {/* Time Selection */}
            {currentQuestion === 'time-selection' && formData.eventDate && (
              <motion.div
                key="time-selection"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">Select Your Time Slot</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Available times for {format(formData.eventDate, 'EEEE, MMMM d')}
                  </p>
                </div>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {getTimeSlotsForDate(formData.eventDate).map((slot, index) => (
                    <motion.div
                      key={slot.id}
                      variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <Button
                        variant="outline"
                        className={cn(
                          "h-20 flex flex-col items-center justify-center gap-2 relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:scale-105 transition-all",
                          slot.popular && "border-blue-500 bg-blue-50/70 dark:bg-blue-900/30"
                        )}
                        onClick={() => handleTimeSelect(slot.id, slot.label, slot.icon)}
                        data-testid={`button-time-${slot.id}`}
                      >
                        {slot.popular && (
                          <Badge className="absolute top-2 right-2 text-xs bg-blue-600" variant="default">
                            Popular
                          </Badge>
                        )}
                        <span className="text-2xl">{slot.icon}</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{slot.label}</span>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Group Size Selection */}
            {currentQuestion === 'group-size' && (
              <motion.div
                key="group-size"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">How many guests?</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">Select your group size</p>
                </div>

                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {groupSizeOptions.map((option, index) => (
                    <motion.div
                      key={option.value}
                      variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <Button
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center gap-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:scale-105 transition-all hover:border-blue-500 hover:shadow-lg"
                        onClick={() => handleGroupSizeSelect(option.value, option.label, option.description)}
                        data-testid={`button-group-${option.value}`}
                      >
                        <Users className="h-6 w-6 text-blue-600" />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{option.label}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{option.description}</span>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
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