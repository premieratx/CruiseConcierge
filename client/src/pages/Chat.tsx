import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'wouter';
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
  RotateCcw, CheckCircle, Settings, Plus, Minus, ShoppingCart, Copy
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getStripePublishableKey } from '@/lib/stripe';

// Initialize Stripe
const stripePromise = loadStripe(getStripePublishableKey() || '');
import { AlternativeDates } from '@/components/AlternativeDates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { format, addDays, isBefore, isAfter, startOfDay, differenceInDays } from 'date-fns';
import type { InsertContact, InsertProject, PricingPreview, InsertQuote, RadioSection, QuoteItem, NormalizedSlot } from '@shared/schema';
import { useAvailabilityForDate, useAvailabilityForDateRange, formatDateForAvailability } from '@/hooks/use-availability';
import { TimeSlotList } from '@/components/TimeSlotList';
import { formatCurrency, formatDate, formatLongDate, formatTimeForDisplay, formatTimeRange, formatPhoneNumber, formatCustomerName, formatBoatCapacity, formatEventDuration, formatGroupSize } from '@shared/formatters';
import { 
  EVENT_TYPES, 
  CRUISE_TYPES, 
  DISCO_PACKAGES, 
  PRICING_DEFAULTS, 
  HOURLY_RATES,
  PRIVATE_CRUISE_PRICING,
  PRICING_POLICIES,
  compareDiscoVsPrivate,
  getBestDealRecommendation,
  calculateDiscoPrice,
  calculatePrivatePrice,
  DISCO_AVAILABILITY 
} from '@shared/constants';
import { PricingPolicyDisplay, PolicySummary } from '@/components/PricingPolicyDisplay';
import { getDiscoTimeSlotsForDate, getPrivateTimeSlotsForDate, isDiscoAvailableForDate, isMondayToThursday, getAvailableDurations, isDurationSelectionRequired } from '@shared/timeSlots';
import { 
  calculatePackagePricing, 
  calculateCompletePricing, 
  getDayType, 
  getCapacityTier, 
  getPackagePricing,
  getPricingDayType,
  getDiscoPricing,
  calculateSimplePricing,
  calculateSimpleDiscoPricing
} from '@shared/pricing';

// BASE_HOURLY_RATE is already in cents, keep it for calculations
const BASE_PRIVATE_HOURLY_RATE_CENTS = PRICING_DEFAULTS.BASE_HOURLY_RATE;

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
  selectedDuration?: 3 | 4; // Duration selection for weekdays
  discountCode: string; // Add discount code field
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

// Hook for fetching real boat data from the API
const useBoats = () => {
  return useQuery<any[]>({
    queryKey: ['/api/boats'],
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
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

// Helper to get real-time pricing using the new PRIVATE_CRUISE_PRICING structure
const getRealTimePackagePricing = (date: Date | undefined, groupSize: number, packageType: 'standard' | 'essentials' | 'ultimate' = 'standard') => {
  if (!date) return null;
  return calculatePackagePricing(date, groupSize, packageType);
};

// Helper to get disco vs private comparison
const getComparisonData = (date: Date | undefined, groupSize: number) => {
  if (!date) return null;
  const dayOfWeek = date.getDay();
  return compareDiscoVsPrivate(groupSize, dayOfWeek);
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

// Use real disco packages from shared constants
const discoPackages = Object.entries(DISCO_AVAILABILITY.PACKAGES).map(([id, pkg]) => ({
  id: id as keyof typeof DISCO_AVAILABILITY.PACKAGES,
  name: pkg.name,
  price: pkg.pricePerPerson / 100, // Convert from cents to dollars
  description: pkg.description,
  pricePerPerson: pkg.pricePerPerson
}));

const GROUP_SIZE_MIN = 8;
const GROUP_SIZE_MAX = 75;
const GROUP_SIZE_DEFAULT = 20;

// Embedded Payment Form Component for checkout
function PaymentForm({ 
  paymentType, 
  cruiseType, 
  formData,
  pricing, 
  holdId,
  onSuccess,
  onCancel 
}: {
  paymentType: 'deposit' | 'full';
  cruiseType: 'private' | 'disco';
  formData: BookingData;
  pricing: any;
  holdId: string | null;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [contactErrors, setContactErrors] = useState<any>({});
  const [discountCode, setDiscountCode] = useState<string>(formData.discountCode || '');
  const [discountedAmount, setDiscountedAmount] = useState<number | null>(null);
  const [isValidatingDiscount, setIsValidatingDiscount] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone
  });

  // Validate contact information
  const validateContact = () => {
    const errors: any = {};
    
    if (!contactInfo.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!contactInfo.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!contactInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!contactInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(contactInfo.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Calculate payment amount
  const originalAmount = paymentType === 'deposit' 
    ? pricing?.depositAmount || 0
    : pricing?.total || 0;
  
  const amount = discountedAmount !== null ? discountedAmount : originalAmount;
  const isDiscounted = discountCode.toUpperCase() === 'TESTMODE99' && discountedAmount !== null;

  // Apply discount code
  const handleApplyDiscount = async () => {
    if (!discountCode) {
      toast({
        title: "Please enter a discount code",
        variant: "destructive"
      });
      return;
    }

    setIsValidatingDiscount(true);
    
    // Check for test discount code
    if (discountCode.toUpperCase() === 'TESTMODE99') {
      const discounted = Math.round(originalAmount * 0.01); // 1% of original (99% off)
      setDiscountedAmount(discounted);
      toast({
        title: "Discount applied!",
        description: "99% off has been applied to your total",
      });
    } else {
      toast({
        title: "Invalid discount code",
        description: "The discount code you entered is not valid",
        variant: "destructive"
      });
      setDiscountCode('');
      setDiscountedAmount(null);
    }
    
    setIsValidatingDiscount(false);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!validateContact()) {
      toast({
        title: "Please complete all required fields",
        description: "Fill in your contact information to continue.",
        variant: "destructive"
      });
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setIsProcessing(true);

    try {
      // Build selection payload
      const selectionPayload = {
        entryPoint: 'quote_builder',
        paymentType,
        cruiseType,
        eventType: formData.eventType,
        eventTypeLabel: formData.eventTypeLabel,
        eventEmoji: formData.eventEmoji,
        groupSize: cruiseType === 'disco' ? formData.discoTicketQuantity : formData.groupSize,
        eventDate: formData.eventDate?.toISOString(),
        date: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : undefined,
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        email: contactInfo.email,
        phone: contactInfo.phone,
        specialRequests: formData.specialRequests,
        discountCode,
        selectedSlot: formData.selectedSlot,
        selectedTimeSlot: formData.selectedSlot ? `${formData.selectedSlot.startTime}-${formData.selectedSlot.endTime}` : undefined,
        timeSlot: formData.selectedSlot ? `${formData.selectedSlot.startTime}-${formData.selectedSlot.endTime}` : undefined,
        slotId: formData.selectedSlot?.id,
        slotLabel: formData.selectedSlot?.label,
        startTime: formData.selectedSlot?.startTime,
        endTime: formData.selectedSlot?.endTime,
        duration: formData.selectedSlot?.duration?.toString() || '4',
        boatId: formData.selectedSlot?.boatCandidates?.[0],
        capacity: formData.selectedSlot?.capacity?.toString() || formData.groupSize.toString(),
        addOnPackages: cruiseType === 'private' ? formData.selectedAddOnPackages : undefined,
        discoPackage: cruiseType === 'disco' ? formData.selectedDiscoPackage : undefined,
        selectedDiscoPackage: cruiseType === 'disco' ? formData.selectedDiscoPackage : undefined,
        discoTicketQuantity: cruiseType === 'disco' ? formData.discoTicketQuantity : undefined,
        ticketQuantity: cruiseType === 'disco' ? formData.discoTicketQuantity : undefined
      };

      // Create payment intent with all data including holdId
      const res = await apiRequest('POST', '/api/checkout/create-payment-intent', {
        paymentType,
        cruiseType,
        selectionPayload,
        pricing,
        customerEmail: contactInfo.email,
        metadata: {
          firstName: contactInfo.firstName,
          lastName: contactInfo.lastName,
          phone: contactInfo.phone,
          discountCode,
          holdId: holdId || '' // Include the holdId in metadata
        }
      });

      const response = await res.json();

      if (!response.clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Confirm the payment with card details
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        response.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${contactInfo.firstName} ${contactInfo.lastName}`,
              email: contactInfo.email,
              phone: contactInfo.phone
            }
          }
        }
      );

      if (error) {
        // Handle errors
        if (error.type === 'card_error' || error.type === 'validation_error') {
          toast({
            title: "Payment failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "An error occurred",
            description: "Something went wrong. Please try again.",
            variant: "destructive"
          });
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful
        onSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      toast({
        title: "Payment error",
        description: err.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Contact Information */}
      <div className="space-y-2">
        <h3 className="text-base font-semibold">Contact Information</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={contactInfo.firstName}
              onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
              placeholder="John"
              data-testid="input-payment-firstName"
              className={contactErrors.firstName ? 'border-red-500' : ''}
            />
            {contactErrors.firstName && (
              <p className="text-red-500 text-xs mt-0.5">{contactErrors.firstName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={contactInfo.lastName}
              onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
              placeholder="Doe"
              data-testid="input-payment-lastName"
              className={contactErrors.lastName ? 'border-red-500' : ''}
            />
            {contactErrors.lastName && (
              <p className="text-red-500 text-xs mt-0.5">{contactErrors.lastName}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            placeholder="john@example.com"
            data-testid="input-payment-email"
            className={contactErrors.email ? 'border-red-500' : ''}
          />
          {contactErrors.email && (
            <p className="text-red-500 text-xs mt-0.5">{contactErrors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            data-testid="input-payment-phone"
            className={contactErrors.phone ? 'border-red-500' : ''}
          />
          {contactErrors.phone && (
            <p className="text-red-500 text-xs mt-0.5">{contactErrors.phone}</p>
          )}
        </div>
      </div>

      <Separator />

      {/* Payment Details */}
      <div className="space-y-2">
        <h3 className="text-base font-semibold">Payment Details</h3>
        <div className="border rounded-lg p-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Discount Code Section - Always visible */}
      <div className="space-y-2">
        <h3 className="text-base font-semibold">Discount Code</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            data-testid="input-checkout-discount-code"
            className="flex-1"
            disabled={isValidatingDiscount}
          />
          <Button
            type="button"
            onClick={handleApplyDiscount}
            disabled={isValidatingDiscount || !discountCode}
            variant="outline"
            data-testid="button-apply-discount"
          >
            Apply
          </Button>
        </div>
        {isDiscounted && (
          <Alert className="border-green-200 bg-green-50">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Discount applied! You're paying {formatCurrency(amount)} instead of {formatCurrency(originalAmount)}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Amount Summary */}
      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {paymentType === 'deposit' ? 'Deposit Amount' : 'Total Amount'}:
          </span>
          <span className="text-2xl font-bold text-green-600">
            {formatCurrency(amount)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          disabled={isProcessing}
          className="flex-1"
          data-testid="button-cancel-payment"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          type="submit"
          disabled={isProcessing || !stripe || !elements}
          className="flex-1 bg-green-600 hover:bg-green-700"
          data-testid="button-submit-payment"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              {paymentType === 'deposit' ? `Pay Deposit (${formatCurrency(amount)})` : `Pay Now (${formatCurrency(amount)})`}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

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

// Helper function to filter boats that can accommodate the group size
const filterBoatsForGroupSize = (boats: any[], groupSize: number) => {
  if (!boats || boats.length === 0) return [];
  
  // IMPORTANT: Exclude ATX Disco boat - it's only for disco cruises, not private cruises
  const privateBoats = boats.filter(boat => boat.id !== 'boat_atx_disco' && boat.active);
  
  // Apply strict capacity rules for boat selection
  if (groupSize <= 14) {
    // 14 or less: Only Day Tripper
    return privateBoats.filter(boat => 
      boat.id === 'boat_day_tripper' || boat.name === 'Day Tripper'
    );
  } else if (groupSize <= 25) {
    // 15-25: Me Seeks The Irony
    return privateBoats.filter(boat => 
      boat.id === 'boat_me_seeks_the_irony' || boat.name === 'Me Seeks The Irony'
    );
  } else if (groupSize <= 50) {
    // 26-50: Clever Girl
    return privateBoats.filter(boat => 
      boat.id === 'boat_clever_girl' || boat.name === 'Clever Girl'
    );
  } else if (groupSize <= 75) {
    // 51-75: Clever Girl with extra crew
    return privateBoats.filter(boat => 
      boat.id === 'boat_clever_girl' || boat.name === 'Clever Girl'
    );
  } else {
    // Over 75: No boats available
    return [];
  }
};

// Helper function to get boat display name from actual boat data
const getBoatDisplayName = (boat: any): string => {
  if (!boat) return 'Party Boat';
  return boat.name || `${boat.capacity}-Person Boat`;
};

// Generate structured private cruise time slots with real pricing data
const generateRealPrivateSlots = (
  date: Date, 
  groupSize: number, 
  boats: any[], 
  packageType: 'standard' | 'essentials' | 'ultimate' = 'standard',
  duration?: 3 | 4 // Optional duration filter for weekdays
): NormalizedSlot[] => {
  const dayOfWeek = date.getDay();
  const dateISO = date.toISOString().split('T')[0];
  
  // CRITICAL FIX: Filter boats that can actually accommodate the group size
  const suitableBoats = filterBoatsForGroupSize(boats, groupSize);
  if (suitableBoats.length === 0) return [];
  
  // Get correct pricing based on actual group size tier
  const pricing = getRealTimePackagePricing(date, groupSize, packageType);
  if (!pricing) return [];
  
  const slots: NormalizedSlot[] = [];
  
  // Show actual hourly rate from pricing calculation
  const formatSlotWithHourly = (boatName: string, time: string, hourlyRate: number) => {
    // Use the actual hourly rate from pricing calculation
    const actualHourlyRate = pricing?.baseHourlyRate || hourlyRate;
    // Fix: Format the hourly rate properly with commas and no decimals
    const hourlyDisplay = formatCurrency(actualHourlyRate).replace('.00', '') + '/hr';
    return `${boatName} • ${time} • ${hourlyDisplay}`;
  };
  
  // Use proper time slot generation from shared/timeSlots.ts
  const allTimeSlots = getPrivateTimeSlotsForDate(date, duration);
  
  // Convert to the format expected by this function
  const timeSlots = allTimeSlots.map(slot => ({
    startTime: slot.startTime,
    endTime: slot.endTime,
    duration: slot.duration,
    displayTime: slot.label
  }));
  
  // Create slots for each suitable boat and time slot combination
  suitableBoats.forEach((boat, boatIndex) => {
    timeSlots.forEach((timeSlot, slotIndex) => {
      // Only create a limited number of slots to avoid overwhelming the user
      if (slots.length >= 4) return;
      
      const boatName = getBoatDisplayName(boat);
      const slotLabel = formatSlotWithHourly(boatName, timeSlot.displayTime, pricing.baseHourlyRate);
      
      slots.push({
        id: `private_${boat.id}_${dateISO}_${timeSlot.startTime}_${timeSlot.endTime}`,
        dateISO,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        duration: timeSlot.duration,
        label: slotLabel,
        cruiseType: 'private' as const,
        capacity: boat.capacity,
        availableCount: 1,
        bookable: true,
        held: false,
        boatCandidates: [boat.id],
        boatName: boatName,
        price: pricing.totalPrice, // base price in cents
        totalPrice: pricing.totalPrice // total price including all fees and taxes
      });
    });
  });
  // If no slots were created (shouldn't happen with proper boat data), return empty
  if (slots.length === 0 && suitableBoats.length > 0 && timeSlots.length > 0) {
    // Fallback: Create at least one slot with the first suitable boat
    const boat = suitableBoats[0];
    const boatName = getBoatDisplayName(boat);
    const timeSlot = timeSlots[0];
    const slotLabel = formatSlotWithHourly(boatName, timeSlot.displayTime, pricing.baseHourlyRate);
    
    slots.push({
      id: `private_${boat.id}_${dateISO}_${timeSlot.startTime}_${timeSlot.endTime}`,
      dateISO,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
      duration: timeSlot.duration,
      label: slotLabel,
      cruiseType: 'private' as const,
      capacity: boat.capacity,
      availableCount: 1,
      bookable: true,
      held: false,
      boatCandidates: [boat.id],
      boatName: boatName,
      price: pricing.totalPrice,
      totalPrice: pricing.totalPrice
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

interface ChatProps {
  defaultEventType?: string;
}

export default function Chat({ defaultEventType }: ChatProps = {}) {
  const { toast } = useToast(); // Move to the top for proper initialization
  const { isEditMode } = useInlineEdit();
  const params = useParams();
  const quoteToken = params.token;
  const [isQuoteMode, setIsQuoteMode] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [loadedQuoteData, setLoadedQuoteData] = useState<any>(null);
  const [quoteUrl, setQuoteUrl] = useState<string | null>(null);
  const [showQuoteConfirmation, setShowQuoteConfirmation] = useState(false);
  
  // Initialize with defaultEventType if provided
  const getInitialEventData = () => {
    if (defaultEventType && EVENT_TYPES[defaultEventType]) {
      const eventConfig = EVENT_TYPES[defaultEventType];
      return {
        eventType: defaultEventType,
        eventTypeLabel: eventConfig.label,
        eventEmoji: eventConfig.emoji,
      };
    }
    return {
      eventType: '',
      eventTypeLabel: '',
      eventEmoji: '',
    };
  };

  const initialEventData = getInitialEventData();
  
  const [currentStep, setCurrentStep] = useState<ChatFlowStep>('intro');
  const [completedSelections, setCompletedSelections] = useState<CompletedSelection[]>([]);
  const [privatePricing, setPrivatePricing] = useState<PricingPreview | null>(null);
  const [discoPricing, setDiscoPricing] = useState<PricingPreview | null>(null);
  const [selectedPrivatePackage, setSelectedPrivatePackage] = useState<'standard' | 'essentials' | 'ultimate'>('standard');
  const [currentRecommendation, setCurrentRecommendation] = useState<any>(null);
  const [generatedQuoteId, setGeneratedQuoteId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<'deposit' | 'full'>('deposit');
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingError, setPricingError] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [eventTypeCollapsed, setEventTypeCollapsed] = useState(Boolean(defaultEventType));
  const [showGroupSize, setShowGroupSize] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [pendingPaymentType, setPendingPaymentType] = useState<'deposit' | 'full' | null>(null);
  const [showDateChangeDialog, setShowDateChangeDialog] = useState(false);
  const [pendingCruiseType, setPendingCruiseType] = useState<'private' | 'disco' | null>(null);
  const [currentHoldId, setCurrentHoldId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BookingData>({
    ...initialEventData,
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
    discountCode: '', // Initialize discount code
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
  
  // Helper function to calculate disco pricing
  const calculateDiscoPrice = (groupSize: number, packageType: 'basic' | 'disco_queen' | 'platinum') => {
    const pricePerPerson = getDiscoPricing(packageType);
    return pricePerPerson * groupSize;
  };
  
  // Use structured private slots with real pricing data for chat flow
  const structuredPrivateSlots = formData.eventDate ? 
    generateRealPrivateSlots(formData.eventDate, formData.groupSize, boats, 'standard', formData.selectedDuration) : [];
  
  // Get intelligent comparison data for recommendations
  const comparisonData = getComparisonData(formData.eventDate, formData.groupSize);
  
  // Get package pricing for all three private cruise tiers
  const standardPackagePricing = getRealTimePackagePricing(formData.eventDate, formData.groupSize, 'standard');
  const essentialsPackagePricing = getRealTimePackagePricing(formData.eventDate, formData.groupSize, 'essentials');
  const ultimatePackagePricing = getRealTimePackagePricing(formData.eventDate, formData.groupSize, 'ultimate');
  
  // Use structured slots for chat flow, fallback to API data for other components
  const privateSlots = structuredPrivateSlots.length > 0 ? structuredPrivateSlots :
    availableSlots.filter(slot => slot.cruiseType === 'private');
  
  // FIXED: Only show disco slots for bachelor/bachelorette events
  const isEligibleForDisco = formData.eventType === 'bachelor' || formData.eventType === 'bachelorette';
  const discoSlots = isEligibleForDisco ? availableSlots.filter(slot => slot.cruiseType === 'disco') : [];
  
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
  
  // Load quote data if we're in Quote Mode
  useEffect(() => {
    if (quoteToken) {
      setQuoteLoading(true);
      fetch(`/api/quotes/public/${quoteToken}`)
        .then(res => {
          if (!res.ok) throw new Error('Quote not found');
          return res.json();
        })
        .then(quote => {
          setLoadedQuoteData(quote);
          // Pre-fill formData with quote details
          const eventDetails = quote.eventDetails || {};
          const selectionDetails = quote.selectionDetails || {};
          const contactInfo = quote.contactInfo || {};
          
          setFormData(prev => ({
            ...prev,
            eventType: eventDetails.eventType || '',
            eventTypeLabel: eventDetails.eventTypeLabel || '',
            eventEmoji: eventDetails.eventEmoji || '',
            groupSize: eventDetails.groupSize || GROUP_SIZE_DEFAULT,
            eventDate: eventDetails.eventDate ? new Date(eventDetails.eventDate) : undefined,
            firstName: contactInfo.firstName || '',
            lastName: contactInfo.lastName || '',
            email: contactInfo.email || '',
            phone: contactInfo.phone || '',
            specialRequests: eventDetails.specialRequests || '',
            budget: eventDetails.budget || '',
            selectedCruiseType: selectionDetails.cruiseType || null,
            selectedSlot: selectionDetails.selectedSlot || null,
            selectedAddOnPackages: selectionDetails.selectedPackages || [],
            selectedDiscoPackage: selectionDetails.discoPackage || null,
            discoTicketQuantity: selectionDetails.ticketQuantity || eventDetails.groupSize || GROUP_SIZE_DEFAULT,
            selectedDuration: selectionDetails.selectedDuration || undefined,
            preferredTimeLabel: selectionDetails.preferredTimeLabel || '',
            groupSizeLabel: selectionDetails.groupSizeLabel || '',
            selectedBoat: selectionDetails.selectedBoat || '',
            discountCode: quote.promoCode || ''
          }));
          
          // Update completed selections based on what's in the quote
          const selections: CompletedSelection[] = [];
          
          if (eventDetails.eventDate) {
            selections.push({
              id: 'date',
              label: 'Event Date',
              value: format(new Date(eventDetails.eventDate), 'EEEE, MMMM d, yyyy'),
              icon: 'Calendar',
              emoji: '📅'
            });
          }
          
          if (eventDetails.eventType) {
            selections.push({
              id: 'event',
              label: 'Event Type',
              value: eventDetails.eventTypeLabel || eventDetails.eventType,
              emoji: eventDetails.eventEmoji || '🎉'
            });
          }
          
          if (eventDetails.groupSize) {
            selections.push({
              id: 'group',
              label: 'Group Size',
              value: `${eventDetails.groupSize} guests`,
              icon: 'Users',
              emoji: '👥'
            });
          }
          
          setCompletedSelections(selections);
          setIsQuoteMode(true);
          
          // Jump to comparison step directly
          setCurrentStep('comparison-selection');
          setEventTypeCollapsed(true);
          setShowGroupSize(false);
          setShowComparison(true);
          
          setQuoteLoading(false);
        })
        .catch(error => {
          console.error('Failed to load quote:', error);
          toast({
            title: "Quote Not Found",
            description: "The quote you're looking for could not be found.",
            variant: "destructive"
          });
          setQuoteLoading(false);
        });
    }
  }, [quoteToken, toast]);

  // Direct first-come-first-served booking - no slot holds

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
  
  const proceedToComparison = async (selectedDate?: Date) => {
    const eventDate = selectedDate || formData.eventDate;
    if (eventDate) {
      // NEW FLOW: Initialize quote immediately and redirect to quote URL
      if (!quoteToken) {  // Only initialize if not already on a quote URL
        try {
          // Show loading state
          setQuoteLoading(true);
          
          // Initialize the quote with minimal data
          const response = await fetch('/api/quotes/initialize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventDate: eventDate.toISOString(),
              eventType: formData.eventType,
              groupSize: formData.groupSize
            })
          });
          
          if (!response.ok) {
            throw new Error('Failed to initialize quote');
          }
          
          const data = await response.json();
          
          // Redirect to the quote URL
          window.location.href = `/q/${data.accessToken}`;
          return; // Stop here, page will redirect
          
        } catch (error) {
          console.error('Error initializing quote:', error);
          toast({
            title: "Error",
            description: "Failed to initialize quote. Please try again.",
            variant: "destructive"
          });
          setQuoteLoading(false);
        }
      }
      
      // If already on quote URL or fallback, continue with normal flow
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
  
  // Update quote via PATCH when selections change (for quote URLs)
  const updateQuoteSelections = useCallback(async () => {
    if (!quoteToken || !formData.selectedCruiseType) return;
    
    try {
      // Build selection details
      const selectionDetails: any = {
        cruiseType: formData.selectedCruiseType,
        selectedSlot: formData.selectedSlot,
        selectedPackages: formData.selectedAddOnPackages,
        discoPackage: formData.selectedDiscoPackage,
        ticketQuantity: formData.discoTicketQuantity,
        selectedDuration: formData.selectedDuration,
        selectedBoat: formData.selectedBoat,
        preferredTimeLabel: formData.preferredTimeLabel,
        groupSizeLabel: formData.groupSizeLabel
      };
      
      // Update the quote
      const response = await fetch(`/api/quotes/public/${quoteToken}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventDetails: {
            eventDate: formData.eventDate,
            eventType: formData.eventType,
            eventTypeLabel: formData.eventTypeLabel,
            eventEmoji: formData.eventEmoji,
            groupSize: formData.groupSize
          },
          selectionDetails,
          specialRequests: formData.specialRequests,
          promoCode: formData.discountCode
        })
      });
      
      if (!response.ok) {
        console.error('Failed to update quote selections');
      }
    } catch (error) {
      console.error('Error updating quote selections:', error);
    }
  }, [
    quoteToken, 
    formData.selectedCruiseType,
    formData.selectedSlot,
    formData.selectedAddOnPackages,
    formData.selectedDiscoPackage,
    formData.discoTicketQuantity,
    formData.selectedDuration,
    formData.selectedBoat,
    formData.preferredTimeLabel,
    formData.groupSizeLabel,
    formData.eventDate,
    formData.eventType,
    formData.eventTypeLabel,
    formData.eventEmoji,
    formData.groupSize,
    formData.specialRequests,
    formData.discountCode
  ]);

  // Refs to prevent infinite loops in auto-selection
  const autoSelectionRef = useRef({
    lastEventType: '',
    lastGroupSize: 0,
    lastEventDate: null as Date | null,
    hasAutoSelected: false
  });
  
  // Auto-update quote when selections change (for quote URLs)
  useEffect(() => {
    if (!quoteToken || !formData.selectedCruiseType) return;
    
    // Debounce updates to avoid too many API calls
    const timeoutId = setTimeout(() => {
      updateQuoteSelections();
    }, 1000); // Wait 1 second after changes stop
    
    return () => clearTimeout(timeoutId);
  }, [
    quoteToken,
    formData.selectedCruiseType,
    formData.selectedSlot,
    formData.selectedAddOnPackages,
    formData.selectedDiscoPackage,
    formData.discoTicketQuantity,
    updateQuoteSelections
  ]);

  // FIXED: Auto-select default options - made more stable to prevent crashes during group size editing
  useEffect(() => {
    // Guard against unnecessary re-runs
    if (currentStep !== 'comparison-selection' || 
        !formData.groupSize || 
        !formData.eventType || 
        !formData.eventDate) {
      return;
    }

    // Check if we've already auto-selected for this combination - more lenient for group size changes
    const current = autoSelectionRef.current;
    const significantChange = (
      current.lastEventType !== formData.eventType ||
      current.lastEventDate?.getTime() !== formData.eventDate.getTime() ||
      Math.abs(current.lastGroupSize - formData.groupSize) > 5 // FIXED: Only reset on significant group size changes
    );

    if (!significantChange && current.hasAutoSelected) {
      return; // Skip if already processed this combination
    }

    // Update tracking
    current.lastEventType = formData.eventType;
    current.lastGroupSize = formData.groupSize;
    current.lastEventDate = formData.eventDate;
    current.hasAutoSelected = true;

    // FIXED: Batch all auto-selections together and be more conservative about resets
    const updates: Partial<BookingData> = {};
    
    // Auto-select private cruise defaults ONLY if nothing is selected yet
    if (!formData.selectedSlot && !formData.selectedCruiseType) {
      const defaultSlot = privateSlots.find(slot => slot.label.includes('12pm') || slot.label.includes('1pm')) || privateSlots[0];
      
      if (defaultSlot) {
        updates.selectedCruiseType = 'private';
        updates.selectedSlot = defaultSlot;
        updates.selectedAddOnPackages = [];
      }
    }
    
    // FIXED: Only handle disco options for bachelor/bachelorette events
    if ((formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') &&
        discoSlots.length > 0) {
      // Only set defaults if nothing is selected yet
      if (!formData.selectedDiscoPackage) {
        updates.selectedDiscoPackage = 'basic' as DiscoPackage;
      }
      // Always update quantity to match group size, but don't reset other selections
      updates.discoTicketQuantity = Math.min(formData.groupSize, 20);
    }
    // DO NOT show disco options for other event types

    // Apply all updates in a single setState call
    if (Object.keys(updates).length > 0) {
      setFormData(prev => ({ ...prev, ...updates }));
    }
  }, [currentStep, formData.eventType, formData.eventDate?.getTime(), formData.selectedSlot, formData.selectedDiscoPackage, privateSlots, discoSlots, formData.groupSize]);

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
  }, [formData.selectedSlot?.id, formData.selectedAddOnPackages, formData.groupSize, formData.eventDate?.getTime(), formData.selectedDuration]);
  
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

  // SIMPLE CLIENT-SIDE PRIVATE PRICING - NO API CALLS!
  const fetchPrivatePricing = async () => {
    if (!formData.selectedSlot || !formData.eventDate) return;
    
    console.log('🚢 fetchPrivatePricing called with CLIENT-SIDE calculation:', {
      selectedSlot: formData.selectedSlot,
      groupSize: formData.groupSize,
      eventDate: formData.eventDate,
      eventType: formData.eventType,
      selectedAddOnPackages: formData.selectedAddOnPackages
    });
    
    setPricingLoading(true);
    setPricingError(null);
    
    try {
      // Use selected duration for Mon-Thu, otherwise use slot duration
      const duration = isMondayToThursday(formData.eventDate) && formData.selectedDuration ? 
        formData.selectedDuration : 
        (formData.selectedSlot.duration || 4);
      const result = calculateSimplePricing(
        formData.eventDate,
        formData.groupSize,
        duration,
        formData.selectedAddOnPackages
      );
      
      // Format result to match expected structure
      const pricingResult = {
        ...result,
        timeSlot: formData.selectedSlot.id,
        eventType: formData.eventType
      };
      
      console.log('🚢 CLIENT-SIDE calculation successful, setting privatePricing:', pricingResult);
      setPrivatePricing({
        ...pricingResult,
        appliedDiscounts: [],
        paymentSchedule: []
      });
    } catch (error: any) {
      console.log('🚢 Exception in fetchPrivatePricing:', error);
      setPricingError('Error calculating pricing');
    } finally {
      setPricingLoading(false);
    }
  };
  
  // Helper function to get cruise duration based on date
  const getCruiseDuration = (date: Date | undefined) => {
    if (!date) return 4; // Default to 4 hours
    const dayOfWeek = date.getDay();
    // For Mon-Thu, use selectedDuration if available, otherwise default to 3
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      return formData.selectedDuration || 3;
    }
    return 4; // Fri-Sun is always 4 hours
  };

  // Fallback private cruise pricing calculation - now uses shared pricing logic
  const calculatePrivatePricing = () => {
    console.log('🚢 calculatePrivatePricing called as fallback');
    if (!formData.selectedSlot || !formData.eventDate) {
      console.log('🚢 calculatePrivatePricing early return - no slot or date selected');
      return;
    }
    
    // Calculate total hourly rate in cents (base + add-ons) - consistent with display logic
    const totalHourlyRateCents = BASE_PRIVATE_HOURLY_RATE_CENTS + 
      formData.selectedAddOnPackages.reduce((sum, addOnId) => {
        const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
        return sum + (addOn?.hourlyRate || 0) * 100; // Convert dollars to cents
      }, 0);
    
    // Use selected duration for Mon-Thu, otherwise calculate based on day
    const cruiseDuration = isMondayToThursday(formData.eventDate) && formData.selectedDuration ? 
      formData.selectedDuration : getCruiseDuration(formData.eventDate);
    
    // Calculate base cost and crew fee (all in cents)
    const baseCostCents = totalHourlyRateCents * cruiseDuration;
    const crewFeeCents = formData.groupSize > 20 ? 20000 : 0; // $200 crew fee in cents
    
    // Use shared pricing calculation for consistency
    const packageType = formData.selectedAddOnPackages.includes('ultimate') ? 'ultimate' : 
                       formData.selectedAddOnPackages.includes('essentials') ? 'essentials' : 'standard';
    
    const sharedPricing = calculatePackagePricing(formData.eventDate, formData.groupSize, packageType);
    
    // Convert shared pricing format to component format
    const subtotal = Math.round((sharedPricing.totalPrice - 
      Math.round(sharedPricing.totalPrice * 0.0825) - 
      Math.round(sharedPricing.totalPrice * 0.20 / 1.2825)) / 1.2825);
    const tax = Math.round(subtotal * 0.0825);
    const gratuity = Math.round(subtotal * 0.20);
    const total = sharedPricing.totalPrice; // Keep in cents for consistency
    
    // Use deposit calculation from shared pricing
    const depositPercent = sharedPricing.depositPercent;
    const depositAmount = sharedPricing.depositAmount / 100; // Convert from cents
    
    // Get selected add-on names for display
    const selectedAddOnNames = formData.selectedAddOnPackages
      .map(addOnId => addOnPackages.find(pkg => pkg.id === addOnId)?.name)
      .filter(Boolean)
      .join(', ') || 'Standard Private Cruise';
    
    const privatePricingData = {
      subtotal: subtotal * 100,
      tax: tax * 100,
      total: sharedPricing.totalPrice, // Use shared pricing total in cents
      perPersonCost: sharedPricing.perPersonCost * 100,
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
        baseHourlyRate: totalHourlyRateCents / 100, // Convert cents to dollars for display
        cruiseDuration,
        baseCruiseCost: baseCostCents / 100, // Convert cents to dollars for display
        crewFee: crewFeeCents / 100, // Convert cents to dollars for display
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
  
  // SIMPLE CLIENT-SIDE DISCO PRICING - NO API CALLS!
  const fetchDiscoPricing = async () => {
    if (!formData.selectedDiscoPackage) return;
    
    console.log('🎵 fetchDiscoPricing called with CLIENT-SIDE calculation:', {
      selectedDiscoPackage: formData.selectedDiscoPackage,
      discoTicketQuantity: formData.discoTicketQuantity,
      eventDate: formData.eventDate
    });
    
    setPricingLoading(true);
    setPricingError(null);
    
    try {
      // Use simple client-side disco pricing calculation - NO API CALLS!
      const result = calculateSimpleDiscoPricing(
        formData.selectedDiscoPackage as 'basic' | 'disco_queen' | 'platinum',
        formData.discoTicketQuantity
      );
      
      console.log('🎵 CLIENT-SIDE disco calculation successful, setting discoPricing:', result);
      setDiscoPricing({
        ...result,
        appliedDiscounts: result.appliedDiscounts || [],
        paymentSchedule: result.paymentSchedule || []
      });
    } catch (error: any) {
      console.log('🎵 Exception in fetchDiscoPricing:', error);
      setPricingError('Error calculating disco pricing');
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

  // Group Size Handler for comparison page - debounced and stabilized
  const handleGroupSizeChange = useCallback((value: number[]) => {
    const newSize = value[0];
    
    // Validate group size range
    if (newSize < GROUP_SIZE_MIN || newSize > GROUP_SIZE_MAX) {
      return;
    }
    
    // FIXED: Only update group size, preserve existing selections if they're still valid
    // This prevents the cascade of resets that was causing crashes
    setFormData(prev => ({ 
      ...prev, 
      groupSize: newSize,
      discoTicketQuantity: Math.min(newSize, prev.discoTicketQuantity || 10),
      // Keep existing selections unless they're incompatible with new group size
    }));
    
    // FIXED: Don't reset auto-selection tracking - let the useEffect handle it gracefully
    // autoSelectionRef.current.hasAutoSelected = false; // REMOVED
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
        // Keep disco selections intact for side-by-side comparison
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
      // Keep private selections intact for side-by-side comparison
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
      // For Monday-Thursday, require duration selection
      if (data.eventDate && isMondayToThursday(data.eventDate) && !data.selectedDuration) {
        errors.push('Please select cruise duration (3 or 4 hours)');
      }
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
  
  // Check if user can proceed to payment
  const canProceedToPayment = useCallback((cruiseType: 'private' | 'disco') => {
    if (cruiseType === 'private') {
      // For private cruises:
      // 1. Must have a slot selected
      // 2. If Mon-Thu, must have duration selected
      // 3. Package selection is automatically handled (defaults to standard)
      const hasSlot = Boolean(formData.selectedSlot);
      const hasDuration = !formData.eventDate || !isMondayToThursday(formData.eventDate) || Boolean(formData.selectedDuration);
      return hasSlot && hasDuration;
    } else {
      // For disco cruises:
      // 1. Must have a disco package selected
      // 2. Must have ticket quantity > 0
      // 3. Must have a valid disco slot
      const hasPackage = Boolean(formData.selectedDiscoPackage);
      const hasQuantity = formData.discoTicketQuantity > 0;
      const hasValidSlot = Boolean(formData.selectedSlot?.id?.includes('disco'));
      return hasPackage && hasQuantity && hasValidSlot;
    }
  }, [formData]);
  
  // Get payment button tooltip message
  const getPaymentButtonTooltip = useCallback((cruiseType: 'private' | 'disco') => {
    const messages: string[] = [];
    
    if (cruiseType === 'private') {
      if (!formData.selectedSlot) messages.push('Select a time slot');
      if (formData.eventDate && isMondayToThursday(formData.eventDate) && !formData.selectedDuration) {
        messages.push('Select cruise duration');
      }
    } else {
      if (!formData.selectedDiscoPackage) messages.push('Select a disco package');
      if (formData.discoTicketQuantity < 1) messages.push('Select ticket quantity');
      if (!formData.selectedSlot?.id?.includes('disco')) messages.push('Select a disco time slot');
    }
    
    return messages.length > 0 ? `Required: ${messages.join(', ')}` : '';
  }, [formData]);

  // Enhanced payment handler that shows checkout section below
  const [, navigate] = useLocation(); // Add navigate hook for routing
  const [showCheckout, setShowCheckout] = useState(false);
  
  const handlePayment = useCallback((paymentType: 'deposit' | 'full', cruiseType: 'private' | 'disco') => {
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
    
    // Check if user can proceed to payment
    if (!canProceedToPayment(cruiseType)) {
      const tooltip = getPaymentButtonTooltip(cruiseType);
      toast({
        title: "Please Complete Selection",
        description: tooltip,
        variant: "destructive",
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
    
    // Direct first-come-first-served booking - no slot holds
    if (!formData.selectedSlot) {
      toast({
        title: "Time Slot Required",
        description: "Please select a time slot before proceeding to payment.",
        variant: "destructive",
      });
      return;
    }

    console.log('💳 Showing checkout section...');
    
    // Set payment details and show checkout section
    setPendingPaymentType(paymentType);
    setPendingCruiseType(cruiseType);
    setShowCheckout(true);
    
    // Scroll to checkout section
    setTimeout(() => {
      const checkoutSection = document.getElementById('checkout-section');
      if (checkoutSection) {
        checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, [formData, privatePricing, discoPricing, pricingLoading, paymentProcessing, formSubmitting, validateBookingData, canProceedToPayment, getPaymentButtonTooltip, toast]);
  
  // Handle confirmed booking - No longer used for payment flow
  const handleConfirmedBooking = useCallback(async () => {
    // This function is kept for backwards compatibility but is no longer used
    // Payment is now handled directly in the checkout step on the same page
    console.log('handleConfirmedBooking called but not used - payment handled in checkout step');
  }, []);

  // Contact form submission with loading protection
  const handleContactSubmit = useCallback(async (e: React.FormEvent) => {
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
    
    // NEW FLOW: Update existing quote if on quote URL
    if (quoteToken) {
      setFormSubmitting(true);
      
      try {
        // Update the existing quote with contact info
        const response = await fetch(`/api/quotes/public/${quoteToken}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contactInfo: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone || ''
            },
            specialRequests: formData.specialRequests
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to update quote');
        }
        
        const updatedQuote = await response.json();
        
        // Move to confirmation step
        setCurrentStep('confirmation');
        
        toast({
          title: "Contact Information Saved",
          description: "Your quote has been updated with your contact details.",
        });
      } catch (error) {
        console.error('Error updating quote:', error);
        toast({
          title: "Error",
          description: "Failed to save contact information. Please try again.",
          variant: "destructive"
        });
      } finally {
        setFormSubmitting(false);
      }
      
      return; // Exit early for quote URL flow
    }
    
    // COMPREHENSIVE LOGGING FOR CONTACT SUBMISSION (original flow)
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
    
    setFormSubmitting(true);
    addCompletedSelection({
      id: 'contact-info',
      label: 'Contact',
      value: `${formData.firstName} ${formData.lastName}`,
      icon: 'user'
    });
    handleSendQuote();
  }, [formData, formSubmitting, pricingLoading, paymentProcessing, toast, chatSessionId, getBoatDetails, privatePricing, discoPricing, quoteToken]);
  
  // Handle sending quote via API
  const handleSendQuote = async () => {
    try {
      // Determine which pricing to use based on cruise type
      const selectedCruiseType = formData.selectedCruiseType;
      const pricing = selectedCruiseType === 'private' ? privatePricing : discoPricing;
      
      // Log for debugging
      console.log('📧 Sending quote with data:', {
        cruiseType: selectedCruiseType,
        pricing,
        formData
      });
      
      // Ensure we have the required pricing data
      if (!pricing) {
        throw new Error('Pricing information is not available. Please try again.');
      }
      
      // Build the request payload
      const requestPayload = {
        // Contact information
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        
        // Event details
        eventType: formData.eventType,
        eventTypeLabel: formData.eventTypeLabel,
        eventEmoji: formData.eventEmoji,
        eventDate: formData.eventDate,
        groupSize: formData.groupSize,
        specialRequests: formData.specialRequests,
        budget: formData.budget,
        
        // Selection details
        cruiseType: selectedCruiseType,
        selectedSlot: formData.selectedSlot,
        selectedPackages: formData.selectedAddOnPackages,
        discoPackage: formData.selectedDiscoPackage,
        ticketQuantity: formData.discoTicketQuantity,
        selectedDuration: formData.selectedDuration,
        selectedBoat: formData.selectedBoat,
        preferredTimeLabel: formData.preferredTimeLabel,
        groupSizeLabel: formData.groupSizeLabel,
        
        // Pricing details
        subtotal: pricing?.subtotal,
        tax: pricing?.tax,
        gratuity: pricing?.gratuity,
        total: pricing?.total,
        depositAmount: pricing?.depositAmount,
        discountCode: formData.discountCode
      };
      
      // Call the API to create the quote
      const response = await fetch('/api/quotes/from-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
        credentials: 'include'
      });
      
      // Check if response is OK
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          // If response is not JSON, use default error message
        }
        throw new Error(errorMessage);
      }
      
      // Parse the JSON response
      const result = await response.json();
      
      if (result.success && result.accessToken) {
        // Generate the shareable quote URL
        const generatedQuoteUrl = `${window.location.origin}/q/${result.accessToken}`;
        
        // Store the quote URL and ID
        setQuoteUrl(generatedQuoteUrl);
        setGeneratedQuoteId(result.quoteId || result.slug || result.accessToken);
        setShowQuoteConfirmation(true);
        
        // Show success toast with the quote URL
        toast({
          title: 'Quote Sent Successfully! 🎉',
          description: (
            <div className="space-y-2">
              <p>Your quote has been sent to {formData.email}</p>
              <p className="text-sm">Quote URL: {generatedQuoteUrl}</p>
            </div>
          ) as any,
          duration: 10000
        });
        
        // Proceed to confirmation step
        goToStep('confirmation');
      } else {
        throw new Error(result.error || result.message || 'Failed to create quote');
      }
      
    } catch (error) {
      console.error('❌ Error sending quote:', error);
      
      // Detailed error logging
      let errorMessage = 'Please try again';
      if (error instanceof Error) {
        errorMessage = error.message;
        // Check if it's a network error
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }
      }
      
      toast({
        title: 'Error sending quote',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setFormSubmitting(false);
    }
  };

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

  // Show loading state while quote is being loaded
  if (quoteLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
            <p className="text-lg text-slate-600">Loading your quote...</p>
          </div>
        </div>
      </div>
    );
  }

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
                      {isQuoteMode && loadedQuoteData?.contactInfo ? 
                        `Quote for ${loadedQuoteData.contactInfo.firstName || 'Guest'}` : 
                        'Welcome Aboard!'}
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
                      <p className="text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
                        <span>{formData.groupSize} people on {format(formData.eventDate!, 'EEEE, MMMM d')}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowDateChangeDialog(true)}
                          className="p-1 h-7 w-7"
                          title="Change date"
                          data-testid="button-change-date"
                        >
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </p>
                    </div>


                    {/* Enhanced Side-by-Side Comparison for Bachelor/Bachelorette Events */}
                    {(formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') && (
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                          🎉 Compare Your Options Side-by-Side
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Choose between an exclusive private cruise or join our popular disco cruise experience
                        </p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Private Charter Option - Simplified */}
                      <Card className={cn(
                        "bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm transition-all",
                        formData.selectedCruiseType === 'private' && "ring-2 ring-blue-600"
                      )}>
                        <CardHeader className="sticky top-0 z-10 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-blue-200 dark:border-blue-800 py-2">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <Ship className="h-4 w-4 text-blue-600" />
                              </div>
                            </div>
                            <CardTitle className="text-xl font-bold text-blue-600 mb-1">Private Charter</CardTitle>
                            <div className="text-lg font-semibold text-slate-600 dark:text-slate-300">
                              {formData.eventDate ? format(formData.eventDate, 'EEEE, MMMM d') : 'Select a date'}
                            </div>
                            {/* Show recommended boat for group size */}
                            {formData.groupSize > 0 && (
                              <div className="text-sm text-blue-600 mt-1">
                                Recommended: {formData.groupSize <= 14 ? 'Day Tripper (Up to 14 guests)' : 
                                             formData.groupSize <= 25 ? 'Me Seeks The Irony (Up to 30 guests)' :
                                             formData.groupSize <= 50 ? 'Clever Girl (Up to 50 guests)' :
                                             'Clever Girl (Up to 75 guests)'}
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Duration Selection for Weekdays (Monday-Thursday) */}
                          {formData.eventDate && isMondayToThursday(formData.eventDate) && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Choose Duration</Label>
                              <RadioGroup
                                value={formData.selectedDuration?.toString() || ''}
                                onValueChange={(value) => {
                                  const duration = value === '3' ? 3 : 4;
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedDuration: duration,
                                    selectedSlot: null // Reset slot selection when duration changes
                                  }));
                                }}
                                className="grid grid-cols-2 gap-3"
                              >
                                {/* 3-Hour Option */}
                                <div className={cn(
                                  "flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer",
                                  formData.selectedDuration === 3
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                                    : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                                )}>
                                  <RadioGroupItem value="3" id="duration-3" />
                                  <Label htmlFor="duration-3" className="flex-1 cursor-pointer ml-3">
                                    <div className="text-center">
                                      <div className="font-medium">3-Hour Cruise</div>
                                      <div className="text-xs text-slate-600 dark:text-slate-400">Perfect for shorter events</div>
                                    </div>
                                  </Label>
                                </div>

                                {/* 4-Hour Option */}
                                <div className={cn(
                                  "flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer",
                                  formData.selectedDuration === 4
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                                    : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                                )}>
                                  <RadioGroupItem value="4" id="duration-4" />
                                  <Label htmlFor="duration-4" className="flex-1 cursor-pointer ml-3">
                                    <div className="text-center">
                                      <div className="font-medium flex items-center justify-center gap-1">
                                        4-Hour Cruise
                                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                                      </div>
                                      <div className="text-xs text-slate-600 dark:text-slate-400">Full cruise experience</div>
                                    </div>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          )}

                          {/* Time Slot Selection - Only show after duration is selected for weekdays */}
                          {(!formData.eventDate || !isMondayToThursday(formData.eventDate) || formData.selectedDuration) && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">
                                {formData.eventDate && isMondayToThursday(formData.eventDate) && formData.selectedDuration
                                  ? `Select ${formData.selectedDuration}-Hour Time Slot`
                                  : 'Select Time Slot'
                                }
                              </Label>
                            <RadioGroup
                              value={formData.selectedSlot?.id || ''}
                              onValueChange={(slotId) => {
                                const slot = privateSlots.find(s => s.id === slotId);
                                if (slot) {
                                  handlePrivateCruiseSelect(slot);
                                }
                              }}
                              className="space-y-2"
                            >
                              {privateSlots.length > 0 ? privateSlots.slice(0, 6).map((slot, index) => {
                                const isPopular = index === 1 || index === 2; // Mark 2nd and 3rd slots as popular
                                return (
                                  <div key={slot.id} className={cn(
                                    "flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer",
                                    formData.selectedSlot?.id === slot.id 
                                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                                      : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                                  )}>
                                    <RadioGroupItem value={slot.id} id={`private-${slot.id}`} />
                                    <Label htmlFor={`private-${slot.id}`} className="flex-1 cursor-pointer ml-3">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <div className="font-medium flex items-center gap-2">
                                            {slot.label}
                                            {isPopular && (
                                              <Badge variant="secondary" className="text-xs">
                                                Popular
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                        <div className="text-sm font-bold text-blue-600">
                                          {slot.totalPrice ? formatCurrency(slot.totalPrice).replace('.00', '') : ''}
                                        </div>
                                      </div>
                                    </Label>
                                  </div>
                                );
                              }) : (
                                <div className="p-6 text-center text-slate-600 dark:text-slate-400">
                                  <Ship className="h-12 w-12 mx-auto mb-4 opacity-30" />
                                  <p className="text-sm">No private cruises available for this date</p>
                                </div>
                              )}
                            </RadioGroup>
                          </div>
                          )}

                          {/* Optional Add-On Packages Section */}
                          {formData.selectedSlot && (
                            <div className="space-y-2 border-t pt-4">
                              <Label className="text-sm font-medium">Optional Add-On Packages</Label>
                              <RadioGroup
                                value={selectedPrivatePackage}
                                onValueChange={(value) => {
                                  setSelectedPrivatePackage(value as 'standard' | 'essentials' | 'ultimate');
                                  // Update form data to trigger pricing recalculation
                                  const addOnPackages = value === 'standard' ? [] : [value];
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedAddOnPackages: addOnPackages,
                                    // Reset disco package when selecting private package
                                    selectedDiscoPackage: null,
                                    selectedCruiseType: 'private' as CruiseType
                                  }));
                                }}
                                className="space-y-2"
                              >
                                {/* Standard Package */}
                                <div className={cn(
                                  "flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer",
                                  selectedPrivatePackage === 'standard' 
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                                    : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                                )}>
                                  <RadioGroupItem value="standard" id="private-standard" />
                                  <Label htmlFor="private-standard" className="flex-1 cursor-pointer ml-3">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="font-medium">Standard Package</div>
                                        <div className="text-xs text-slate-600 dark:text-slate-400">Classic cruise experience</div>
                                      </div>
                                      <div className="text-sm font-bold text-blue-600">
                                        +$0
                                      </div>
                                    </div>
                                  </Label>
                                </div>

                                {/* Essentials Package */}
                                <div className={cn(
                                  "flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer",
                                  selectedPrivatePackage === 'essentials' 
                                    ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                                    : "border-slate-200 dark:border-slate-700 hover:border-green-300"
                                )}>
                                  <RadioGroupItem value="essentials" id="private-essentials" />
                                  <Label htmlFor="private-essentials" className="flex-1 cursor-pointer ml-3">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="font-medium">Essentials Package</div>
                                        <div className="text-xs text-slate-600 dark:text-slate-400">Premium amenities included</div>
                                      </div>
                                      <div className="text-sm font-bold text-green-600">
                                        +{formatCurrency(formData.selectedDuration ? formData.selectedDuration * 5000 : (getCruiseDuration(formData.eventDate) || 4) * 5000)} total
                                      </div>
                                    </div>
                                  </Label>
                                </div>

                                {/* Ultimate Package */}
                                <div className={cn(
                                  "flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer",
                                  selectedPrivatePackage === 'ultimate' 
                                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
                                    : "border-slate-200 dark:border-slate-700 hover:border-purple-300"
                                )}>
                                  <RadioGroupItem value="ultimate" id="private-ultimate" />
                                  <Label htmlFor="private-ultimate" className="flex-1 cursor-pointer ml-3">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="font-medium flex items-center gap-2">
                                          Ultimate Party Package
                                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                                        </div>
                                        <div className="text-xs text-slate-600 dark:text-slate-400">All-inclusive luxury</div>
                                      </div>
                                      <div className="text-sm font-bold text-purple-600">
                                        +{formatCurrency(formData.selectedDuration ? formData.selectedDuration * 7500 : (getCruiseDuration(formData.eventDate) || 4) * 7500)} total
                                      </div>
                                    </div>
                                  </Label>
                                </div>
                              </RadioGroup>
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
                              
                              {/* Clean Package & Duration Display */}
                              <div className="mb-4 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Package:</span>
                                  <span className="font-bold text-purple-600">
                                    {formData.selectedAddOnPackages.includes('ultimate') ? 'Ultimate Party Package' :
                                     formData.selectedAddOnPackages.includes('essentials') ? 'Essentials Package' : 
                                     'Standard Package'}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration:</span>
                                  <span className="font-bold text-blue-600">
                                    {formData.eventDate && isMondayToThursday(formData.eventDate)
                                      ? (formData.selectedDuration ? `${formData.selectedDuration} hours` : 'Select duration')
                                      : '4 hours'
                                    }
                                  </span>
                                </div>
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
                          
                          {/* Pricing Policy Information */}
                          <div className="mb-4">
                            <PolicySummary 
                              eventDate={formData.eventDate}
                              totalCost={privatePricing?.total}
                              context="chat"
                              className="border-l-4 border-l-green-500"
                            />
                          </div>

                          {/* Payment Buttons */}
                          <div className="space-y-2">
                            <Button
                              onClick={() => {
                                setFormData(prev => ({ ...prev, selectedCruiseType: 'private' }));
                                handlePayment('deposit', 'private');
                              }}
                              disabled={!canProceedToPayment('private') || !privatePricing}
                              className={cn(
                                "w-full",
                                canProceedToPayment('private') && privatePricing
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-gray-400 cursor-not-allowed opacity-50"
                              )}
                              title={getPaymentButtonTooltip('private')}
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
                              disabled={!canProceedToPayment('private') || !privatePricing}
                              className={cn(
                                "w-full",
                                canProceedToPayment('private') && privatePricing
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-gray-400 cursor-not-allowed opacity-50"
                              )}
                              title={getPaymentButtonTooltip('private')}
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

                      {/* CONDITIONAL RIGHT COLUMN: Always show disco column for bachelor/bachelorette, Alternative dates for others */}
                      {(formData.eventType === 'bachelor' || formData.eventType === 'bachelorette') ? (
                        /* ATX Disco Cruise Option - Simplified */
                        <Card className={cn(
                          "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm transition-all",
                          formData.selectedCruiseType === 'disco' && "ring-2 ring-purple-600",
                          discoSlots.length === 0 && "opacity-50 cursor-not-allowed"
                        )}>
                          <CardHeader className="sticky top-0 z-10 bg-gradient-to-r from-purple-50/95 to-pink-50/95 dark:from-purple-900/95 dark:to-pink-900/95 backdrop-blur-md border-b border-purple-200 dark:border-purple-800 py-2">
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-2 mb-1">
                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                  <Music className="h-4 w-4 text-purple-600" />
                                </div>
                              </div>
                              <CardTitle className="text-xl font-bold text-purple-600 mb-1">ATX Disco Cruise</CardTitle>
                              <div className="text-lg font-semibold text-slate-600 dark:text-slate-300">
                                {formData.eventDate ? format(formData.eventDate, 'EEEE, MMMM d') : 'Select a date'}
                              </div>
                              {/* Show boat info */}
                              <div className="text-sm text-purple-600 mt-1">
                                ATX Disco Boat • Up to 100 guests • Friday & Saturday
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Simple Time Slot Selection with Radio Buttons */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Select Time Slot</Label>
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
                                className="space-y-2"
                              >
                                {discoSlots.length > 0 ? discoSlots.map((slot, index) => {
                                  // Calculate disco total price for display
                                  const discoTotal = formData.selectedDiscoPackage ? 
                                    calculateDiscoPrice(formData.groupSize, formData.selectedDiscoPackage) : 
                                    calculateDiscoPrice(formData.groupSize, 'basic');
                                  const discoPriceWithTax = Math.round(discoTotal * 1.0825); // Add 8.25% tax
                                  const isPopular = index === 0; // Mark first slot as popular
                                  
                                  return (
                                    <div key={slot.id} className={cn(
                                      "flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer",
                                      formData.selectedSlot?.id === slot.id 
                                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
                                        : "border-slate-200 dark:border-slate-700 hover:border-purple-300"
                                    )}>
                                      <RadioGroupItem value={slot.id} id={`disco-${slot.id}`} />
                                      <Label htmlFor={`disco-${slot.id}`} className="flex-1 cursor-pointer ml-3">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <div className="font-medium flex items-center gap-2">
                                              {slot.label}
                                              {isPopular && (
                                                <Badge variant="secondary" className="text-xs">
                                                  Popular
                                                </Badge>
                                              )}
                                            </div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                              4-hour party cruise • Up to {slot.capacity || 100} guests
                                            </div>
                                          </div>
                                          <div className="text-sm font-bold text-purple-600">
                                            ${Math.round(discoPriceWithTax / 100).toLocaleString()}
                                          </div>
                                        </div>
                                      </Label>
                                    </div>
                                  );
                                }) : (
                                  <div className="p-6 text-center text-slate-600 dark:text-slate-400">
                                    <Music className="h-12 w-12 mx-auto mb-4 opacity-30" />
                                    <p className="text-sm">No Disco Cruises available for this date</p>
                                    <p className="text-xs mt-1">Available on Fridays and Saturdays only</p>
                                  </div>
                                )}
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
                              <div className="space-y-4">
                                {/* Disco Pricing Policy Information */}
                                <PolicySummary 
                                  eventDate={formData.eventDate}
                                  totalCost={discoPricing?.total}
                                  context="chat"
                                  className="border-l-4 border-l-purple-500"
                                />
                                
                                <div className="space-y-2">
                                <Button
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, selectedCruiseType: 'disco' }));
                                    handlePayment('deposit', 'disco');
                                  }}
                                  disabled={!canProceedToPayment('disco') || !discoPricing || discoSlots.length === 0}
                                  className={cn(
                                    "w-full",
                                    canProceedToPayment('disco') && discoPricing && discoSlots.length > 0
                                      ? "bg-green-600 hover:bg-green-700"
                                      : "bg-gray-400 cursor-not-allowed opacity-50"
                                  )}
                                  title={discoSlots.length === 0 ? "No Disco Cruises available on this date" : getPaymentButtonTooltip('disco')}
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
                                  disabled={!canProceedToPayment('disco') || !discoPricing || discoSlots.length === 0}
                                  className={cn(
                                    "w-full",
                                    canProceedToPayment('disco') && discoPricing && discoSlots.length > 0
                                      ? "bg-purple-600 hover:bg-purple-700"
                                      : "bg-gray-400 cursor-not-allowed opacity-50"
                                  )}
                                  title={discoSlots.length === 0 ? "No Disco Cruises available on this date" : getPaymentButtonTooltip('disco')}
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
                    <CardTitle className="text-2xl">
                      {isQuoteMode ? 'Contact Details' : 'Your Information'}
                    </CardTitle>
                    <CardDescription>
                      {isQuoteMode ? 
                        'Review your contact information for this quote' : 
                        "We'll send your quote to this email"}
                    </CardDescription>
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
                      
                      <div className="space-y-2">
                        <Label htmlFor="discountCode">Discount Code (Optional)</Label>
                        <Input
                          id="discountCode"
                          value={formData.discountCode}
                          onChange={(e) => updateFormDataWithAutoSave({ discountCode: e.target.value })}
                          placeholder="Enter promo code"
                          data-testid="input-discount-code"
                        />
                        {formData.discountCode && (
                          <p className="text-xs text-green-600">
                            💰 Discount code will be applied at checkout
                          </p>
                        )}
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
                        {!isQuoteMode && (
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
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Old checkout step - now removed since we moved it outside AnimatePresence */}
            {false && (
              <motion.div
                id="checkout-section"
                key="checkout"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-4xl mx-auto mt-8"
              >
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-6 w-6" />
                      Complete Your Booking
                    </CardTitle>
                    <CardDescription>Secure checkout powered by Stripe</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* Selection Summary */}
                    <div className="space-y-4 mb-6">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          Your Selection
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Event Type:</span>
                            <span className="font-medium">{formData.eventTypeLabel} {formData.eventEmoji}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Date:</span>
                            <span className="font-medium">
                              {formData.eventDate ? format(formData.eventDate, 'EEEE, MMMM d, yyyy') : 'Not selected'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Group Size:</span>
                            <span className="font-medium">
                              {pendingCruiseType === 'disco' ? formData.discoTicketQuantity : formData.groupSize} people
                            </span>
                          </div>
                          {formData.selectedSlot && (
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Time Slot:</span>
                              <span className="font-medium">{formData.selectedSlot.label}</span>
                            </div>
                          )}
                          {pendingCruiseType === 'private' && formData.selectedAddOnPackages.length > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Add-ons:</span>
                              <div className="text-right">
                                {formData.selectedAddOnPackages.map((pkgId) => {
                                  const pkg = addOnPackages.find(p => p.id === pkgId);
                                  return pkg ? (
                                    <Badge key={pkgId} className="ml-1 mb-1" variant="secondary">
                                      {pkg.name}
                                    </Badge>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                          {pendingCruiseType === 'disco' && formData.selectedDiscoPackage && (
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Package:</span>
                              <span className="font-medium">
                                {discoPackages.find(p => p.id === formData.selectedDiscoPackage)?.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pricing Breakdown */}
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          Pricing Breakdown
                        </h3>
                        {pendingCruiseType === 'private' && privatePricing && (
                          <div className="space-y-1 text-sm">
                            {/* Detailed breakdown for private cruises */}
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Cruise Details:</span>
                              <span className="font-medium">
                                {formData.selectedSlot?.boatName || 'Boat'} for {formData.groupSize} people
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Duration & Rate:</span>
                              <span className="font-medium">
                                {formData.selectedSlot?.duration || 4} hours × {formatCurrency(privatePricing.baseHourlyRate || 0)}/hour
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                              <span className="font-medium">{formatCurrency(privatePricing.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Tax (8.25%):</span>
                              <span className="font-medium">{formatCurrency(privatePricing.tax)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Gratuity (20%):</span>
                              <span className="font-medium">{formatCurrency(privatePricing.gratuity)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-bold text-base">
                              <span>Total:</span>
                              <span className="text-lg">{formatCurrency(privatePricing.total)}</span>
                            </div>
                            {pendingPaymentType === 'deposit' && privatePricing.depositAmount && (
                              <div className="flex justify-between text-green-600 dark:text-green-400 pt-2 text-base">
                                <span>Amount Due Now ({privatePricing.depositPercent}% deposit):</span>
                                <span className="font-bold text-lg">{formatCurrency(privatePricing.depositAmount)}</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {pendingCruiseType === 'disco' && discoPricing && (
                          <div className="space-y-1 text-sm">
                            {/* Detailed breakdown for disco cruises */}
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Tickets:</span>
                              <span className="font-medium">
                                {formData.discoTicketQuantity} tickets × ${Math.round((discoPricing.subtotal / formData.discoTicketQuantity) / 100)}/person
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Package:</span>
                              <span className="font-medium">
                                {discoPackages.find(p => p.id === formData.selectedDiscoPackage)?.name || 'Disco Package'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                              <span className="font-medium">{formatCurrency(discoPricing.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Tax (8.25%):</span>
                              <span className="font-medium">{formatCurrency(discoPricing.tax)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Gratuity (20%):</span>
                              <span className="font-medium">{formatCurrency(discoPricing.gratuity)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-bold text-base">
                              <span>Total:</span>
                              <span className="text-lg">{formatCurrency(discoPricing.total)}</span>
                            </div>
                            {pendingPaymentType === 'deposit' && discoPricing.depositAmount && (
                              <div className="flex justify-between text-green-600 dark:text-green-400 pt-2 text-base">
                                <span>Amount Due Now ({discoPricing.depositPercent}% deposit):</span>
                                <span className="font-bold text-lg">{formatCurrency(discoPricing.depositAmount)}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="mb-6" />

                    {/* Stripe Payment Form */}
                    <Elements stripe={stripePromise}>
                      <PaymentForm
                        paymentType={pendingPaymentType}
                        cruiseType={pendingCruiseType}
                        formData={formData}
                        pricing={pendingCruiseType === 'private' ? privatePricing : discoPricing}
                        onSuccess={(paymentIntentId) => {
                          console.log('✅ Payment successful:', paymentIntentId);
                          // Move to confirmation step
                          setCurrentStep('confirmation');
                          // Store payment info for confirmation display
                          sessionStorage.setItem('paymentSuccess', JSON.stringify({
                            paymentIntentId,
                            paymentType: pendingPaymentType,
                            cruiseType: pendingCruiseType,
                            amount: pendingPaymentType === 'deposit'
                              ? (pendingCruiseType === 'private' ? privatePricing?.depositAmount : discoPricing?.depositAmount)
                              : (pendingCruiseType === 'private' ? privatePricing?.total : discoPricing?.total)
                          }));
                          setPendingPaymentType(null);
                          setPendingCruiseType(null);
                        }}
                        onCancel={() => {
                          // Hide checkout section
                          setShowCheckout(false);
                          setPendingPaymentType(null);
                          setPendingCruiseType(null);
                        }}
                      />
                    </Elements>
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
                    {(() => {
                      const paymentInfo = sessionStorage.getItem('paymentSuccess');
                      if (paymentInfo) {
                        return 'Payment Successful!';
                      }
                      return 'Quote Sent Successfully!';
                    })()}
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    {(() => {
                      const paymentInfo = sessionStorage.getItem('paymentSuccess');
                      if (paymentInfo) {
                        const info = JSON.parse(paymentInfo);
                        return `Your ${info.paymentType === 'deposit' ? 'deposit' : 'payment'} of ${formatCurrency(info.amount)} has been processed`;
                      }
                      return 'Check your email for the full interactive quote';
                    })()}
                  </p>
                </div>
                
                {(quoteUrl || generatedQuoteId) && (
                  <div className="space-y-4">
                    {generatedQuoteId && (
                      <p className="text-slate-600 dark:text-slate-400">
                        Quote ID: <span className="font-mono font-bold">{generatedQuoteId}</span>
                      </p>
                    )}
                    
                    {quoteUrl && (
                      <div className="space-y-3">
                        <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription>
                            <div className="space-y-2">
                              <p className="font-medium">Your quote link is ready to share:</p>
                              <div className="flex gap-2">
                                <Input 
                                  value={quoteUrl} 
                                  readOnly 
                                  className="flex-1"
                                  data-testid="input-quote-url"
                                />
                                <Button
                                  onClick={() => {
                                    navigator.clipboard.writeText(quoteUrl);
                                    toast({
                                      title: 'Link copied!',
                                      description: 'The quote link has been copied to your clipboard.',
                                    });
                                  }}
                                  variant="outline"
                                  size="sm"
                                  data-testid="button-copy-quote-url"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </AlertDescription>
                        </Alert>
                        
                        <Button
                          onClick={() => window.open(quoteUrl, '_blank')}
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 w-full"
                          data-testid="button-view-quote"
                        >
                          View Your Quote
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    )}
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
          
          {/* Checkout Section - Shows inline below comparison */}
          {showCheckout && pendingPaymentType && pendingCruiseType && currentStep === 'comparison-selection' && (
            <motion.div
              id="checkout-section"
              key="checkout"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-4xl mx-auto mt-8"
            >
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6" />
                    Complete Your Booking
                  </CardTitle>
                  <CardDescription>Secure checkout powered by Stripe</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Consolidated Selection Summary with Single Prominent Header */}
                  <div className="space-y-3 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      {/* Single Prominent Header Line */}
                      <div className="text-lg font-bold mb-2">
                        {formData.eventDate && format(formData.eventDate, 'EEEE, MMMM d')} • 
                        {' '}{formData.selectedSlot?.boatName || (pendingCruiseType === 'disco' ? 'ATX Disco Cruise' : 'Boat')} • 
                        {' '}{formData.selectedSlot?.label || 'Time Not Selected'} • 
                        {' '}{formatCurrency((pendingCruiseType === 'private' ? privatePricing?.baseHourlyRate : discoPricing?.perPersonCost) || 0)}/
                        {pendingCruiseType === 'private' ? 'hr' : 'person'}
                      </div>
                      {/* Secondary Details */}
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {pendingCruiseType === 'private' ? (
                          <>
                            {formData.selectedSlot?.boatName || 'Boat'} for {formData.groupSize} people
                            {formData.selectedAddOnPackages.length > 0 && (
                              <> • {formData.selectedAddOnPackages.includes('ultimate') ? 'Ultimate Package' :
                                   formData.selectedAddOnPackages.includes('essentials') ? 'Essentials Package' : ''}</>
                            )}
                          </>
                        ) : (
                          <>
                            ATX Disco Cruise for {formData.discoTicketQuantity} people • 
                            {' '}{discoPackages.find(p => p.id === formData.selectedDiscoPackage)?.name}
                          </>
                        )}
                      </div>
                      {/* Duration and Rate Line */}
                      <div className="text-base font-semibold mt-2">
                        {pendingCruiseType === 'private' ? (
                          <>{formData.selectedSlot?.duration || 4} hours × {formatCurrency(privatePricing?.baseHourlyRate || 0)}/hour</>
                        ) : (
                          <>{formData.discoTicketQuantity} tickets × {formatCurrency(discoPricing?.perPersonCost || 0)}/person</>
                        )}
                      </div>
                    </div>

                    {/* Simplified Pricing Breakdown */}
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        Pricing Breakdown
                      </h3>
                      {pendingCruiseType === 'private' && privatePricing && (
                        <div className="space-y-1 text-sm">
                          {/* Detailed breakdown for private cruises */}
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Cruise Details:</span>
                            <span className="font-medium">
                              {formData.selectedSlot?.boatName || 'Boat'} for {formData.groupSize} people
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Duration & Rate:</span>
                            <span className="font-medium">
                              {formData.selectedSlot?.duration || 4} hours × {formatCurrency(privatePricing.baseHourlyRate || 0)}/hour
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                            <span className="font-medium">{formatCurrency(privatePricing.subtotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Tax (8.25%):</span>
                            <span className="font-medium">{formatCurrency(privatePricing.tax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Gratuity (20%):</span>
                            <span className="font-medium">{formatCurrency(privatePricing.gratuity)}</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-bold text-base">
                            <span>Total:</span>
                            <span className="text-lg">{formatCurrency(privatePricing.total)}</span>
                          </div>
                          {pendingPaymentType === 'deposit' && privatePricing.depositAmount && (
                            <div className="flex justify-between text-green-600 dark:text-green-400 pt-2 text-base">
                              <span>Amount Due Now ({privatePricing.depositPercent}% deposit):</span>
                              <span className="font-bold text-lg">{formatCurrency(privatePricing.depositAmount)}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {pendingCruiseType === 'disco' && discoPricing && (
                        <div className="space-y-1 text-sm">
                          {/* Detailed breakdown for disco cruises */}
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Tickets:</span>
                            <span className="font-medium">
                              {formData.discoTicketQuantity} tickets × ${Math.round((discoPricing.subtotal / formData.discoTicketQuantity) / 100)}/person
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Package:</span>
                            <span className="font-medium">
                              {discoPackages.find(p => p.id === formData.selectedDiscoPackage)?.name || 'Disco Package'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                            <span className="font-medium">{formatCurrency(discoPricing.subtotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Tax (8.25%):</span>
                            <span className="font-medium">{formatCurrency(discoPricing.tax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Gratuity (20%):</span>
                            <span className="font-medium">{formatCurrency(discoPricing.gratuity)}</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-bold text-base">
                            <span>Total:</span>
                            <span className="text-lg">{formatCurrency(discoPricing.total)}</span>
                          </div>
                          {pendingPaymentType === 'deposit' && discoPricing.depositAmount && (
                            <div className="flex justify-between text-green-600 dark:text-green-400 pt-2 text-base">
                              <span>Amount Due Now ({discoPricing.depositPercent}% deposit):</span>
                              <span className="font-bold text-lg">{formatCurrency(discoPricing.depositAmount)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  {/* Stripe Payment Form */}
                  <Elements stripe={stripePromise}>
                    <PaymentForm
                      paymentType={pendingPaymentType}
                      cruiseType={pendingCruiseType}
                      formData={formData}
                      pricing={pendingCruiseType === 'private' ? privatePricing : discoPricing}
                      holdId={currentHoldId}
                      onSuccess={(paymentIntentId) => {
                        console.log('✅ Payment successful:', paymentIntentId);
                        // Move to confirmation step
                        setCurrentStep('confirmation');
                        // Store payment info for confirmation display
                        sessionStorage.setItem('paymentSuccess', JSON.stringify({
                          paymentIntentId,
                          paymentType: pendingPaymentType,
                          cruiseType: pendingCruiseType,
                          amount: pendingPaymentType === 'deposit'
                            ? (pendingCruiseType === 'private' ? privatePricing?.depositAmount : discoPricing?.depositAmount)
                            : (pendingCruiseType === 'private' ? privatePricing?.total : discoPricing?.total)
                        }));
                        setPendingPaymentType(null);
                        setPendingCruiseType(null);
                        setShowCheckout(false);
                      }}
                      onCancel={() => {
                        // Hide checkout section
                        setShowCheckout(false);
                        setPendingPaymentType(null);
                        setPendingCruiseType(null);
                      }}
                    />
                  </Elements>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Booking Confirmation Dialog - No longer used but kept for backwards compatibility */}
      
      {/* Date Change Dialog */}
      <Dialog open={showDateChangeDialog} onOpenChange={setShowDateChangeDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Change Event Date</DialogTitle>
            <DialogDescription>
              Select a new date for your {formData.eventTypeLabel || 'event'}. Your other selections will be preserved.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <CalendarComponent
              mode="single"
              selected={formData.eventDate}
              onSelect={(date) => {
                if (date && isDateAvailable(date)) {
                  setFormData(prev => ({ 
                    ...prev, 
                    eventDate: date,
                    // Clear time slot selections as they may not be valid for new date
                    selectedSlot: null
                  }));
                  setShowDateChangeDialog(false);
                  // Refetch availability for new date
                  toast({
                    title: "Date Updated",
                    description: `Your event date has been changed to ${format(date, 'EEEE, MMMM d, yyyy')}`,
                  });
                }
              }}
              disabled={(date) => !isDateAvailable(date)}
              className="rounded-md border"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}