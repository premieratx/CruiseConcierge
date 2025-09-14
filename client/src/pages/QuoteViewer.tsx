import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ship, Calendar, Clock, MapPin, Phone, Mail, FileText,
  Download, Printer, CheckCircle, AlertCircle, Loader2,
  Users, Plus, Minus, Edit2, Save, Anchor, Music, 
  CreditCard, Sparkles, ChevronRight, RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { Quote, PricingPreview, Project, Contact, QuoteItem, RadioSection } from '@shared/schema';

type QuoteWithDetails = Quote & {
  pricing?: PricingPreview;
  project?: Project;
  contact?: Contact;
};

type CruiseType = 'private' | 'disco';
type DiscoPackage = 'basic' | 'disco_queen' | 'platinum';

// Booking data interface for the interactive controls
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
  selectedDiscoPackage: DiscoPackage | null;
  selectedDiscoTimeSlot: string;
  discoTicketQuantity: number;
  preferredTimeLabel?: string;
  groupSizeLabel?: string;
}

// Helper functions from Chat.tsx
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

const isDiscoAvailableForDate = (date: Date) => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 5 || dayOfWeek === 6; // Friday or Saturday only
};

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

const GROUP_SIZE_MIN = 8;
const GROUP_SIZE_MAX = 75;
const GROUP_SIZE_DEFAULT = 20;

// Animation variants from Chat.tsx
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

export default function QuoteViewer() {
  const params = useParams();
  const quoteId = params.quoteId as string;
  const { toast } = useToast();
  
  // State for interactive controls
  const [privatePricing, setPrivatePricing] = useState<PricingPreview | null>(null);
  const [discoPricing, setDiscoPricing] = useState<PricingPreview | null>(null);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingError, setPricingError] = useState<string | null>(null);
  
  // Form data initialized from quote data
  const [formData, setFormData] = useState<BookingData>({
    eventType: 'bachelor', // Default for demo
    eventTypeLabel: 'Bachelor Party',
    eventEmoji: '🎉',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    eventDate: new Date(2025, 8, 18), // September 18, 2025 (Thursday for demo)
    groupSize: GROUP_SIZE_DEFAULT,
    specialRequests: '',
    budget: '',
    selectedCruiseType: null,
    selectedTimeSlot: '',
    selectedDiscoPackage: null,
    selectedDiscoTimeSlot: '',
    discoTicketQuantity: 1,
  });

  // Fetch quote details with enhanced error handling
  const { data: quote, isLoading, error: quoteError, refetch } = useQuery<QuoteWithDetails>({
    queryKey: [`/api/quotes/${quoteId}/public`],
    enabled: !!quoteId,
    retry: (failureCount, error: any) => {
      // Don't retry on 404 - quote doesn't exist or is expired
      if (error?.status === 404) return false;
      // Only retry up to 2 times for other errors
      return failureCount < 2;
    },
  });

  // Extract data from quote when available
  useEffect(() => {
    if (quote && quote.contact && quote.project) {
      setFormData(prev => ({
        ...prev,
        firstName: quote.contact?.name?.split(' ')[0] || prev.firstName,
        lastName: quote.contact?.name?.split(' ').slice(1).join(' ') || prev.lastName,
        email: quote.contact?.email || prev.email,
        phone: quote.contact?.phone || prev.phone,
        eventDate: quote.project?.projectDate ? new Date(quote.project.projectDate) : prev.eventDate,
        groupSize: quote.project?.groupSize || prev.groupSize,
        eventType: quote.project?.eventType || prev.eventType,
        eventTypeLabel: quote.project?.eventType === 'bachelor' ? 'Bachelor Party' :
                        quote.project?.eventType === 'bachelorette' ? 'Bachelorette Party' :
                        quote.project?.eventType === 'corporate' ? 'Corporate Event' :
                        quote.project?.eventType === 'wedding' ? 'Wedding Reception' :
                        quote.project?.eventType === 'birthday' ? 'Birthday Party' :
                        quote.project?.eventType === 'graduation' ? 'Graduation Party' :
                        quote.project?.eventType === 'anniversary' ? 'Anniversary' :
                        'Other Event'
      }));
    }
  }, [quote]);

  // Fetch private cruise pricing when all required data is available
  useEffect(() => {
    if (formData.eventDate && formData.selectedTimeSlot && formData.groupSize) {
      fetchPrivatePricing();
    }
  }, [formData.eventDate, formData.selectedTimeSlot, formData.groupSize]);
  
  // Fetch disco pricing when all required disco data is available
  useEffect(() => {
    if (formData.selectedDiscoPackage && formData.discoTicketQuantity && formData.eventDate && formData.selectedDiscoTimeSlot) {
      fetchDiscoPricing();
    }
  }, [formData.selectedDiscoPackage, formData.discoTicketQuantity, formData.eventDate, formData.selectedDiscoTimeSlot]);

  // Immediate pricing calculation for disco quantity changes
  useEffect(() => {
    if (formData.selectedDiscoPackage && formData.discoTicketQuantity > 0) {
      calculateDiscoPricing();
    }
  }, [formData.discoTicketQuantity]);

  // Helper function to get disco package price
  const getDiscoPriceByPackage = (packageId: string | null): number => {
    const packagePrices = {
      'basic': 8500, // $85.00 in cents
      'disco_queen': 9500, // $95.00 in cents  
      'platinum': 10500, // $105.00 in cents
    };
    return packagePrices[packageId as keyof typeof packagePrices] || 8500;
  };

  // Fetch private cruise pricing with loading state
  const fetchPrivatePricing = async () => {
    setPricingLoading(true);
    setPricingError(null);
    try {
      const res = await apiRequest('POST', '/api/pricing/cruise', {
        groupSize: formData.groupSize,
        eventDate: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : '',
        timeSlot: formData.selectedTimeSlot,
        eventType: formData.eventType,
        cruiseType: 'private',
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }
      
      const response = await res.json();
      if (!response || typeof response.total !== 'number') {
        throw new Error('Invalid pricing response from server');
      }
      
      setPrivatePricing(response);
      setPricingError(null);
    } catch (error: any) {
      console.error('Failed to fetch private pricing:', error);
      setPricingError(error.message || 'Failed to load pricing. Please try again.');
      setPrivatePricing(null);
      toast({
        title: 'Pricing Error',
        description: 'Unable to load pricing. Please check your selections and try again.',
        variant: 'destructive',
      });
    } finally {
      setPricingLoading(false);
    }
  };

  // Fetch disco cruise pricing using API for consistency
  const fetchDiscoPricing = async () => {
    setPricingLoading(true);
    setPricingError(null);
    try {
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
      calculateDiscoPricing();
    } finally {
      setPricingLoading(false);
    }
  };

  // Fallback disco cruise pricing calculation
  const calculateDiscoPricing = () => {
    if (!formData.selectedDiscoPackage) return;
    
    const selectedPackage = discoPackages.find(pkg => pkg.id === formData.selectedDiscoPackage);
    if (!selectedPackage) return;
    
    const subtotal = selectedPackage.price * formData.discoTicketQuantity;
    const gratuity = Math.round(subtotal * 0.20); // 20% gratuity
    const tax = Math.round(subtotal * 0.0825); // 8.25% tax
    const total = subtotal + gratuity + tax;
    
    setDiscoPricing({
      subtotal: subtotal * 100, // Convert to cents
      tax: tax * 100,
      total: total * 100,
      perPersonCost: selectedPackage.price * 100,
      discountTotal: 0,
      gratuity: gratuity * 100,
      depositRequired: true,
      depositPercent: 25,
      depositAmount: Math.round(total * 0.25) * 100, // 25% of total including gratuity
      paymentSchedule: [],
      appliedDiscounts: [],
      breakdown: {
        boatType: selectedPackage.name,
        dayName: formData.eventDate ? format(formData.eventDate, 'EEEE') : '',
        baseHourlyRate: Math.round(selectedPackage.price / 4),
        cruiseDuration: 4,
        baseCruiseCost: selectedPackage.price,
        crewFee: 0,
        subtotalBeforeTax: subtotal,
        gratuityAmount: gratuity,
        taxAmount: tax,
        grandTotal: total,
        perPerson: selectedPackage.price,
        deposit: Math.round(total * 0.25),
        balanceDue: total - Math.round(total * 0.25),
      }
    });
  };

  // Selection handlers
  const handlePrivateCruiseSelect = (timeSlot: string) => {
    setFormData({ 
      ...formData, 
      selectedCruiseType: 'private',
      selectedTimeSlot: timeSlot
    });
  };
  
  const handleDiscoCruiseSelect = (packageId: string, timeSlot: string) => {
    setFormData({ 
      ...formData, 
      selectedCruiseType: 'disco',
      selectedDiscoPackage: packageId as DiscoPackage,
      selectedDiscoTimeSlot: timeSlot
    });
  };

  // Payment mutations
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
          quoteId: quoteId,
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
          quoteId: quoteId,
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

  // Format currency helper
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" data-testid="loader-spinner" />
          <p className="text-slate-600 dark:text-slate-400">Loading your quote...</p>
        </div>
      </div>
    );
  }
  
  // Error state for 404 or other quote errors
  if (quoteError) {
    const is404 = (quoteError as any)?.status === 404;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            {is404 ? 'Quote Not Found' : 'Error Loading Quote'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {is404 
              ? 'This quote may have expired or the link is invalid. Please request a new quote or contact us for assistance.'
              : 'There was an error loading your quote. Please try again or contact support if the issue persists.'
            }
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => refetch()} 
              className="w-full"
              data-testid="button-retry-quote"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/chat'}
              className="w-full"
              data-testid="button-new-quote"
            >
              Request New Quote
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = 'mailto:support@premierpartycruises.com'}
              className="w-full text-sm"
              data-testid="button-contact-support"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Handle case where quote exists but has no associated data
  if (!quote || !quote.contact || !quote.project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Incomplete Quote Data
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            This quote is missing required information. Please contact us to resolve this issue.
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/chat'}
            className="w-full"
            data-testid="button-new-quote-incomplete"
          >
            Request New Quote
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Ship className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                Premier Party Cruises
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Interactive Quote Viewer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Choose Your Cruise Experience
            </h2>
            {formData.eventDate && (
              <p className="text-slate-600 dark:text-slate-400 text-xl mb-2">
                {format(formData.eventDate, 'EEEE, MMMM d')} • {formData.groupSize} {formData.groupSize === 1 ? 'person' : 'people'}
              </p>
            )}
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Select your preferred option and book instantly or request a detailed quote
            </p>
          </div>

          {/* Group Size Control */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 max-w-md mx-auto"
          >
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {formData.groupSize}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                  {formData.groupSize === 1 ? 'person' : 'people'}
                </div>
              </div>
              
              <div className="space-y-4">
                <Slider
                  value={[formData.groupSize]}
                  onValueChange={(value) => setFormData({...formData, groupSize: value[0]})}
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
            </div>
          </motion.div>

          {/* Dynamic Grid Layout - Two columns for bachelor/bachelorette, single column for others */}
          <div className={cn(
            "gap-8 max-w-6xl mx-auto",
            (formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') 
              ? "grid lg:grid-cols-2" 
              : "flex justify-center"
          )}>
            {/* Private Cruise Options */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={cn(
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border-2 transition-all w-full",
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
              
              {formData.eventDate && (
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">Available Time Slots</h4>
                  <RadioGroup 
                    value={formData.selectedTimeSlot}
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
              )}
              
              {/* Enhanced Private Cruise Pricing */}
              {formData.selectedTimeSlot && privatePricing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-6"
                >
                  {/* Detailed Pricing Breakdown */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 text-center">Investment Breakdown</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Base Cruise Cost:</span>
                        <span className="font-medium">{formatCurrency(privatePricing.subtotal)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Sales Tax (8.25%):</span>
                        <span className="font-medium">{formatCurrency(privatePricing.tax)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Tip for the Captain and Crew (20%):</span>
                        <span className="font-medium">{formatCurrency(privatePricing.gratuity || Math.round(privatePricing.subtotal * 0.20))}</span>
                      </div>
                      <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span className="text-slate-800 dark:text-slate-200">Total Price:</span>
                          <span className="text-blue-600 dark:text-blue-400">{formatCurrency(privatePricing.total)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mt-1">
                          <span className="text-slate-500 dark:text-slate-400">Per person:</span>
                          <span className="text-slate-600 dark:text-slate-300">{formatCurrency(privatePricing.total / formData.groupSize)}</span>
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
                        <span className="text-xl font-bold text-green-600 dark:text-green-400">{formatCurrency(privatePricing.depositAmount)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          onClick={() => createDepositPayment.mutate()}
                          disabled={createDepositPayment.isPending}
                          className="bg-green-600 hover:bg-green-700 text-white h-12"
                          data-testid="button-pay-deposit-private"
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
                          data-testid="button-pay-full-private"
                        >
                          {createFullPayment.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                          <Sparkles className="h-4 w-4 mr-2" />
                          Pay in Full
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
                        Balance due: {formatCurrency(privatePricing.total - privatePricing.depositAmount)}
                      </p>
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
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border-2 transition-all w-full",
                formData.selectedCruiseType === 'disco' ? "border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800" : "border-slate-200 dark:border-slate-700",
                formData.eventDate && !isDiscoAvailableForDate(formData.eventDate) && "opacity-50"
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
              
              {formData.eventDate && isDiscoAvailableForDate(formData.eventDate) ? (
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
                              <span className="text-slate-500 dark:text-slate-400">Per ticket:</span>
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
                formData.eventDate && (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                    <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Not Available
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      ATX Disco Cruises are only available on Fridays and Saturdays.
                    </p>
                  </div>
                )
              )}
            </motion.div>
          </div>

          {/* Quote Request Fallback */}
          {(!formData.selectedCruiseType || (!privatePricing && !discoPricing)) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-md mx-auto"
            >
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-lg">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Need a Custom Quote?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Don't see what you're looking for? We'll create a personalized quote just for you.
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-custom-quote">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Custom Quote
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}