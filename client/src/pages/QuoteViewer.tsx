import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useParams } from 'wouter';
import { format, addDays, addMinutes, parseISO, isValid } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { BookingCacheProvider, useBookingCache } from '@/contexts/BookingCacheContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Calendar, AlertCircle, Loader2, Anchor, Music, Printer, Calendar as CalendarIconLucide, Sparkles, Ship, ChevronLeft, ChevronRight, CalendarIcon, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getStripePublishableKey } from '@/lib/stripe';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';

// Initialize Stripe
const stripePromise = loadStripe(getStripePublishableKey() || '');
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';

interface QuoteWithDetails {
  id: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  project: {
    projectName: string;
    groupSize?: number;
    projectDate?: string;
    projectTime?: string;
    eventType?: string;
    eventDetails?: string;
  };
  eventDetails?: {
    eventType: string;
    eventTypeLabel?: string;
    eventEmoji?: string;
    eventDate: string;
    groupSize: number;
    specialRequests?: string;
    budget?: string;
  };
  selectionDetails?: {
    cruiseType?: 'private' | 'disco';
    selectedSlot?: any;
    selectedPackages?: string[];
    discoPackage?: string;
    ticketQuantity?: number;
    selectedDuration?: number;
    selectedBoat?: string;
    preferredTimeLabel?: string;
    groupSizeLabel?: string;
  };
  items: Array<{
    name?: string;
    productId?: string;
    qty?: number;
    rate?: number;
    total?: number;
  }>;
  invoiceNumber: string;
  total: number;
  status: 'draft' | 'sent' | 'viewed' | 'expired';
  issuedAt: string;
  expiresAt: string;
}

interface CalendarData {
  date?: string;
  eventDate: string;
  eventType: string;
  groupSize: number;
  cruiseType?: 'private' | 'disco';
  selectedTimeSlot?: string;
  boatId?: string;
  slotId?: string;
}

// Add types for pricing responses
interface PricingResponse {
  subtotal: number;
  tax: number;
  gratuity: number;
  total: number;
  depositRequired: boolean;
  depositAmount: number;
  depositPercent: number;
  duration?: number;
  hourlyRate?: number;
  baseHourlyRate?: number;
  perPersonCost?: number;
  selectedAddOns?: string[];
  pricingModel?: string;
  discountTotal?: number;
  timeSlot?: string;
  eventType?: string;
  showBothOptions?: boolean;
}

interface DiscoPricingResponse {
  subtotal: number;
  discountTotal?: number;
  tax: number;
  gratuity: number;
  total: number;
  perPersonCost: number;
  depositRequired?: boolean;
  depositPercent?: number;
  depositAmount?: number;
  paymentSchedule?: Array<any>;
  expiresAt?: string;
  breakdown?: any;
  displaySettings?: any;
  urgencyMessage?: string | null;
  adjustments?: Array<any>;
  adjustmentTotal?: number;
}

interface Boat {
  id: string;
  name: string;
  capacity: number;
  crewFeeCapacity?: number;
}

// Embedded Payment Form Component
function PaymentForm({ 
  paymentType, 
  cruiseType, 
  selectionPayload, 
  pricing, 
  contactInfo: initialContactInfo,
  onSuccess,
  onCancel 
}: {
  paymentType: 'deposit' | 'full';
  cruiseType: 'private' | 'disco';
  selectionPayload: any;
  pricing: any;
  contactInfo: any;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [contactErrors, setContactErrors] = useState<any>({});
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountedAmount, setDiscountedAmount] = useState<number | null>(null);
  const [isValidatingDiscount, setIsValidatingDiscount] = useState(false);

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
      // Create payment intent with all data
      const res = await apiRequest('POST', '/api/checkout/create-payment-intent', {
        paymentType,
        cruiseType,
        selectionPayload: {
          ...selectionPayload,
          ...contactInfo,
          discountCode
        },
        pricing,
        customerEmail: contactInfo.email,
        metadata: {
          firstName: contactInfo.firstName,
          lastName: contactInfo.lastName,
          phone: contactInfo.phone,
          discountCode
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={contactInfo.firstName}
              onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
              placeholder="John"
              data-testid="input-firstName"
              className={contactErrors.firstName ? 'border-red-500' : ''}
            />
            {contactErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">{contactErrors.firstName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={contactInfo.lastName}
              onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
              placeholder="Doe"
              data-testid="input-lastName"
              className={contactErrors.lastName ? 'border-red-500' : ''}
            />
            {contactErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{contactErrors.lastName}</p>
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
            data-testid="input-email"
            className={contactErrors.email ? 'border-red-500' : ''}
          />
          {contactErrors.email && (
            <p className="text-red-500 text-sm mt-1">{contactErrors.email}</p>
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
            data-testid="input-phone"
            className={contactErrors.phone ? 'border-red-500' : ''}
          />
          {contactErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{contactErrors.phone}</p>
          )}
        </div>
      </div>

      <Separator />

      {/* Discount Code Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Discount Code</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            data-testid="input-discount-code"
            className="flex-1"
            disabled={isValidatingDiscount}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handleApplyDiscount}
            disabled={!discountCode || isValidatingDiscount}
            data-testid="button-apply-discount"
          >
            {isValidatingDiscount ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Applying...</>
            ) : (
              'Apply'
            )}
          </Button>
        </div>
        {isDiscounted && (
          <Alert className="border-green-200 bg-green-50">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="font-semibold">99% discount applied!</div>
              <div className="text-sm mt-1">
                Original: ${(originalAmount / 100).toFixed(2)} → 
                <span className="font-semibold ml-1">Now: ${(amount / 100).toFixed(2)}</span>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Separator />

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Information</h3>
        
        <div className="border rounded-lg p-4 bg-gray-50">
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

      <Separator />

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              {paymentType === 'deposit' ? 'Deposit' : 'Total'} Amount:
            </div>
            <div className="text-lg font-semibold">
              {isDiscounted && (
                <>
                  <span className="line-through text-gray-400 mr-2">${(originalAmount / 100).toFixed(2)}</span>
                  <span className="text-green-600">${(amount / 100).toFixed(2)}</span>
                </>
              )}
              {!isDiscounted && (
                <span>${(amount / 100).toFixed(2)}</span>
              )}
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={isProcessing}
            data-testid="button-process-payment"
            className="min-w-[150px]"
          >
            {isProcessing ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
            ) : (
              <><CreditCard className="mr-2 h-4 w-4" /> Process Payment</>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

function QuoteViewerContent() {
  const { toast } = useToast();
  const [location] = useLocation();
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const { updateSelection, recomputePricing } = useBookingCache();
  
  // Get path parameters
  const params = useParams<{ quoteId?: string }>();
  const pathQuoteId = params.quoteId || '';
  
  // Parse URL parameters using URLSearchParams
  const searchParams = new URLSearchParams(window.location.search);
  
  // Parse URL parameters for both quote flow and calendar flow
  const queryQuoteId = searchParams.get('id') || '';
  const token = searchParams.get('token') || '';
  
  // Support both path parameter (from admin) and query parameter (from public links)
  const quoteId = pathQuoteId || queryQuoteId;
  
  // Define different access flows
  // Check if pathQuoteId looks like an access token (JWT format: xxx.yyy.zzz)
  const isAccessToken = pathQuoteId && pathQuoteId.includes('.') && pathQuoteId.split('.').length === 3;
  
  const isQuoteFlow = !!(quoteId && token) || isAccessToken; // Public quote flow with token in query OR path
  const isAdminFlow = !!(pathQuoteId && !token && !isAccessToken); // Admin flow without token (and not access token)
  
  // Parse calendar flow parameters
  const calendarDataParam = searchParams.get('data');
  const isCalendarFlow = !!calendarDataParam && !isQuoteFlow && !isAdminFlow;
  
  let calendarData: CalendarData | null = null;
  if (isCalendarFlow && calendarDataParam) {
    try {
      const decoded = JSON.parse(decodeURIComponent(calendarDataParam));
      calendarData = decoded;
    } catch (e) {
      console.error('Failed to parse calendar data:', e);
    }
  }
  
  // Derive event type from calendarData (quote will be loaded later)
  const initialEventType = calendarData?.eventType || '';

  // Initialize state from URL params or defaults
  const [groupSize, setGroupSize] = useState<number>(
    isCalendarFlow ? (calendarData?.groupSize || 20) : 20
  );
  
  // Initialize cruise type state - bachelorette parties should default to disco
  const [selectedCruiseType, setSelectedCruiseType] = useState<'private' | 'disco'>(() => {
    if (isCalendarFlow) {
      // If explicitly set, use that
      if (calendarData?.cruiseType) {
        return calendarData.cruiseType as 'private' | 'disco';
      }
      // Bachelorette parties should default to disco cruises
      if (calendarData?.eventType === 'bachelorette') {
        return 'disco';
      }
    }
    return 'private';
  });
  
  // Always show both options for bachelor/bachelorette events
  const showDiscoOptions = true;
  
  // State for weekday duration and time slot selection
  const [weekdayDurations, setWeekdayDurations] = useState<Record<string, string>>({});
  const [weekdayTimeSlots, setWeekdayTimeSlots] = useState<Record<string, string>>({});
  
  // Helper function to convert military time to AM/PM format
  const formatTimeToAMPM = (time: string): string => {
    if (!time) return '';
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  // Helper function to parse date strings as local dates without timezone issues
  const parseLocalDate = (dateString: string): Date => {
    if (!dateString) return new Date();
    // If the date string is in YYYY-MM-DD format, parse it as local date
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day); // month is 0-based
    }
    // For ISO strings, extract just the date part and parse as local
    if (dateString.includes('T')) {
      const datePart = dateString.split('T')[0];
      const [year, month, day] = datePart.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    // Fallback to regular parsing
    return new Date(dateString);
  };
  
  // Retrieve contact info and payment details from sessionStorage (for calendar flow)
  useEffect(() => {
    if (isCalendarFlow) {
      const storedInfo = sessionStorage.getItem('checkoutContactInfo');
      if (storedInfo) {
        try {
          const parsed = JSON.parse(storedInfo);
          setContactInfo({
            firstName: parsed.firstName || '',
            lastName: parsed.lastName || '',
            email: parsed.email || '',
            phone: parsed.phone || ''
          });
          
          // Set other stored preferences
          if (parsed.selectedAddOns) {
            setSelectedAddOns(Array.isArray(parsed.selectedAddOns) ? parsed.selectedAddOns : []);
          }
          // For disco cruises, ensure disco_queen is pre-selected if no specific package is stored
          if (parsed.discoPackage) {
            setSelectedDiscoPackage(parsed.discoPackage);
          } else if (calendarData?.eventType === 'bachelorette' || selectedCruiseType === 'disco') {
            setSelectedDiscoPackage('disco_queen');
            setSelectedDiscoPackageOption('disco_queen');
          }
          if (parsed.discountCode) {
            setDiscountCode(parsed.discountCode);
          }
        } catch (e) {
          console.error('Failed to parse stored checkout info:', e);
        }
      } else if (calendarData?.eventType === 'bachelorette' || selectedCruiseType === 'disco') {
        // No stored info but it's a bachelorette/disco cruise - set defaults
        setSelectedDiscoPackage('disco_queen');
        setSelectedDiscoPackageOption('disco_queen');
      }
      
      // Initialize selectedSlot from calendar data if available
      if (calendarData?.selectedTimeSlot && !selectedSlot) {
        // Parse the time slot string to extract start and end times
        const timeSlotStr = calendarData.selectedTimeSlot;
        const timeMatch = timeSlotStr.match(/(\d{1,2}:\d{2})\s*(?:AM|PM)?(?:\s*-\s*(\d{1,2}:\d{2})\s*(?:AM|PM)?)?/);
        
        if (timeMatch) {
          const [, startTime, endTime] = timeMatch;
          // Create a properly structured slot object
          const initialSlot = {
            startTime: startTime || '',
            endTime: endTime || '',
            id: calendarData.slotId || '',
            boatId: calendarData.boatId || '',
            dateISO: calendarData.eventDate || eventDate,
            date: calendarData.eventDate || eventDate,
            bookable: true
          };
          setSelectedSlot(initialSlot);
        }
      }
    }
  }, [isCalendarFlow]);
  
  // Capacity filter options aligned with boat tiers
  const capacityOptions = [14, 25, 50, 75]; // Matches boat capacity breakpoints
  
  // Pricing and state management
  const [privatePricing, setPrivatePricing] = useState<PricingResponse | null>(null);
  const [discoPricing, setDiscoPricing] = useState<DiscoPricingResponse | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  // Initialize disco package based on event type - disco_queen for bachelorette parties
  const [selectedDiscoPackage, setSelectedDiscoPackage] = useState<string>(
    isCalendarFlow && (calendarData?.eventType === 'bachelorette' || selectedCruiseType === 'disco') ? 'disco_queen' : 'basic'
  );
  // Initialize disco ticket quantity to match group size for better UX
  const [discoTicketQuantity, setDiscoTicketQuantity] = useState<number>(
    isCalendarFlow ? (calendarData?.groupSize || groupSize || 16) : 10
  );
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isExpired, setIsExpired] = useState(false);
  const [selectedBoatId, setSelectedBoatId] = useState<string>('');
  const [isLoadingPricing, setIsLoadingPricing] = useState(false);
  
  // Time slot selection state
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [weeklySlots, setWeeklySlots] = useState<any[]>([]);
  const [weeklyDiscoSlots, setWeeklyDiscoSlots] = useState<any[]>([]);
  const [isLoadingWeekly, setIsLoadingWeekly] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [capacityFilter, setCapacityFilter] = useState<number | null>(isCalendarFlow ? calendarData?.groupSize || 20 : 20);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(calendarData?.selectedTimeSlot || '');
  const [selectedBoat, setSelectedBoat] = useState<string>(calendarData?.boatId || '');
  const [selectedSlotId, setSelectedSlotId] = useState<string>(calendarData?.slotId || '');
  const [eventDate, setEventDate] = useState<string>(calendarData?.eventDate || format(new Date(), 'yyyy-MM-dd'));
  const [slotsLoading, setSlotsLoading] = useState(false);
  
  // Derive the initial event type (quote will be loaded later)
  const [eventType, setEventType] = useState<string>(initialEventType || 'other');
  
  // Embedded payment form state
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentType, setPaymentType] = useState<'deposit' | 'full'>('deposit');
  const [paymentFormLoading, setPaymentFormLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  // Helper functions to determine event type and ordering
  const deriveEventType = (): string => {
    return eventType;
  };

  const isBachelorEvent = (): boolean => {
    const eventType = deriveEventType().toLowerCase();
    return eventType.includes('bachelor') || eventType.includes('bachelorette');
  };
  
  const deriveOriginalDate = (quoteData?: QuoteWithDetails | null): Date | null => {
    // From calendar flow (preferred)
    if (calendarData?.eventDate) return parseLocalDate(calendarData.eventDate);
    // From quote flow
    if (quoteData?.project?.projectDate) return parseLocalDate(quoteData.project.projectDate);
    return eventDate ? parseLocalDate(eventDate) : null;
  };
  
  const computeOrderedDates = (selectedDate: Date): string[] => {
    const dayOfWeek = selectedDate.getDay();
    const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // If Friday, Saturday, or Sunday selected, always show Fri-Sat-Sun first
    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
      return ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    }
    
    // For Mon-Thu, show sequential order from selected day
    const dayNames: string[] = [];
    for (let i = 0; i < 7; i++) {
      const dayIndex = (dayOfWeek + i) % 7;
      dayNames.push(allDays[dayIndex]);
    }
    
    return dayNames;
  };
  
  // Stable dependency keys to prevent infinite loops
  const addOnsKey = useMemo(() => selectedAddOns.slice().sort().join(','), [selectedAddOns]);
  
  // Package selection states
  const [selectedPrivatePackage, setSelectedPrivatePackage] = useState<string>('standard');
  const [selectedDiscoPackageOption, setSelectedDiscoPackageOption] = useState<string>('disco_queen');
  const [showPackageDropdown, setShowPackageDropdown] = useState<boolean>(false);
  const [selectedTimeSlotType, setSelectedTimeSlotType] = useState<'private' | 'disco' | null>(null);
  
  // Update selectedAddOns when private package changes
  useEffect(() => {
    const newAddOns = [];
    if (selectedPrivatePackage === 'essentials') {
      newAddOns.push('essentials');
    } else if (selectedPrivatePackage === 'ultimate') {
      newAddOns.push('ultimate');
    }
    setSelectedAddOns(newAddOns);
  }, [selectedPrivatePackage]);
  
  // Update selectedDiscoPackage when disco package option changes
  useEffect(() => {
    setSelectedDiscoPackage(selectedDiscoPackageOption);
  }, [selectedDiscoPackageOption]);
  
  // Fetch quote details - with token for public access, without token for admin access
  const { data: quote, isLoading, error: quoteError } = useQuery<QuoteWithDetails>({
    queryKey: isAdminFlow 
      ? [`/api/quotes/${quoteId}`]
      : isAccessToken
        ? [`/api/quotes/public/${pathQuoteId}`]
        : [`/api/quotes/${quoteId}/public`, token],
    queryFn: async () => {
      let url: string;
      
      if (isAdminFlow) {
        // Admin access - fetch without token (relies on authentication)
        console.log('🔐 Fetching quote via admin access');
        url = `/api/quotes/${encodeURIComponent(quoteId)}`;
      } else if (isAccessToken) {
        // Public access with token in path parameter
        console.log('🔗 Fetching quote via public access token in path');
        url = `/api/quotes/public/${encodeURIComponent(pathQuoteId)}`;
      } else if (isQuoteFlow) {
        // Public access - requires token in query parameter
        console.log('🔗 Fetching quote via public link with token');
        url = `/api/quotes/${encodeURIComponent(quoteId)}/public?token=${encodeURIComponent(token)}`;
      } else {
        throw new Error('Invalid quote access method');
      }
      
      const res = await apiRequest('GET', url);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Failed to fetch quote (${res.status})`);
      }
      
      const quoteData = await res.json();
      console.log('✅ Quote loaded successfully:', {
        quoteId: quoteData.id,
        hasContact: !!quoteData.contact,
        hasProject: !!quoteData.project,
        total: quoteData.total,
        accessMethod: isAdminFlow ? 'admin' : 'public'
      });
      
      return quoteData;
    },
    enabled: (isQuoteFlow || isAdminFlow) && !!quoteId,
    retry: (failureCount, error: any) => {
      if (error?.message?.includes('Invalid access token') || 
          error?.message?.includes('Access token required') ||
          error?.message?.includes('Token expired')) {
        return false;
      }
      if (error?.status === 401 || error?.status === 404) return false;
      return failureCount < 2;
    },
  });

  // Initialize state from quote data
  useEffect(() => {
    if (quote) {
      // First try to use eventDetails (from chat flow quotes)
      if (quote.eventDetails) {
        setGroupSize(quote.eventDetails.groupSize || 20);
        setEventType(quote.eventDetails.eventType || 'other');
        if (quote.eventDetails.eventDate) {
          const date = new Date(quote.eventDetails.eventDate);
          setEventDate(format(date, 'yyyy-MM-dd'));
        }
      }
      
      // Then check selectionDetails for cruise selections
      if (quote.selectionDetails) {
        if (quote.selectionDetails.cruiseType) {
          setSelectedCruiseType(quote.selectionDetails.cruiseType);
        }
        if (quote.selectionDetails.selectedBoat) {
          setSelectedBoat(quote.selectionDetails.selectedBoat);
        }
        if (quote.selectionDetails.ticketQuantity) {
          setDiscoTicketQuantity(quote.selectionDetails.ticketQuantity);
        }
        if (quote.selectionDetails.discoPackage) {
          setSelectedDiscoPackage(quote.selectionDetails.discoPackage);
        }
        if (quote.selectionDetails.selectedPackages) {
          setSelectedAddOns(quote.selectionDetails.selectedPackages);
        }
        if (quote.selectionDetails.selectedSlot) {
          const slot = quote.selectionDetails.selectedSlot;
          if (slot.startTime && slot.endTime) {
            setSelectedTimeSlot(`${slot.startTime}-${slot.endTime}`);
          }
          if (slot.id) {
            setSelectedSlotId(slot.id);
          }
        }
      }
      
      // Fallback to project data if available (legacy quotes)
      if (quote.project) {
        if (!quote.eventDetails) {
          setGroupSize(quote.project.groupSize || 20);
          if (quote.project.eventType) {
            setEventType(quote.project.eventType);
          }
        }
      }
      
      // Set disco package if it's a disco cruise (legacy)
      const discoItem = quote.items?.find(item => 
        item.name?.toLowerCase().includes('disco') || 
        item.productId?.includes('disco')
      );
      if (discoItem && !quote.selectionDetails?.discoPackage) {
        const packageType = discoItem.productId?.replace('disco_', '') || 'basic';
        setSelectedDiscoPackage(packageType);
        setDiscoTicketQuantity(discoItem.qty || 10);
      }
    }
  }, [quote]);

  // ⚡ INSTANT PRICING: Client-side calculation (<50ms performance)
  const fetchPrivatePricing = useCallback(() => {
    const startTime = performance.now();
    console.log('🚢 ⚡ INSTANT pricing calculation started...');
    
    try {
      // Update cache with current selections
      updateSelection({
        date: isCalendarFlow ? (eventDate || '') : quote?.project?.projectDate?.split('T')[0],
        groupSize,
        cruiseType: 'private',
        selectedAddOns,
        discountCode,
        timeSlot: isCalendarFlow ? selectedTimeSlot : getTimeSlotFromQuote(quote),
        boatId: selectedBoatId,
        slotId: selectedSlotId,
        eventType: isCalendarFlow ? calendarData?.eventType : quote?.project?.eventType
      });
      
      // Instant client-side calculation
      const instantPricing = recomputePricing();
      
      if (instantPricing) {
        // Transform cache format to component format
        const transformedPricing = {
          subtotal: instantPricing.subtotal,
          tax: instantPricing.tax,
          gratuity: instantPricing.gratuity,
          total: instantPricing.total,
          depositRequired: instantPricing.depositAmount > 0,
          depositAmount: instantPricing.depositAmount,
          depositPercent: instantPricing.depositPercent,
          duration: instantPricing.duration,
          hourlyRate: instantPricing.hourlyRate,
          perPersonCost: instantPricing.perPersonCost,
          selectedAddOns: selectedAddOns,
          pricingModel: 'hourly',
          discountTotal: 0,
          timeSlot: isCalendarFlow ? selectedTimeSlot : getTimeSlotFromQuote(quote),
          eventType: isCalendarFlow ? calendarData?.eventType : quote?.project?.eventType,
          showBothOptions: false
        };
        
        setPrivatePricing(transformedPricing);
        
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);
        console.log(`🚢 ⚡ INSTANT pricing completed in ${duration}ms (target: <50ms)`);
        console.log('🚢 ⚡ INSTANT pricing result:', transformedPricing);
      }
    } catch (error) {
      console.error('⚡ Instant pricing calculation failed:', error);
      // Fallback to old API call if needed
    }
  }, [isCalendarFlow, calendarData, selectedAddOns, groupSize, quote, discountCode, updateSelection, recomputePricing]);

  // ⚡ INSTANT DISCO PRICING: Client-side calculation (<50ms performance)
  const fetchDiscoPricing = useCallback(() => {
    const startTime = performance.now();
    console.log('🎵 ⚡ INSTANT disco pricing calculation started...');
    
    try {
      // Update cache with current disco selections
      updateSelection({
        date: isCalendarFlow ? (eventDate || '') : quote?.project?.projectDate?.split('T')[0],
        groupSize: discoTicketQuantity,
        cruiseType: 'disco',
        discoPackage: selectedDiscoPackage,
        discoTicketQuantity,
        discountCode,
        timeSlot: isCalendarFlow ? selectedTimeSlot : undefined,
        slotId: selectedSlotId,
        eventType: isCalendarFlow ? calendarData?.eventType : quote?.project?.eventType
      });
      
      // Instant client-side calculation
      const instantPricing = recomputePricing();
      
      if (instantPricing) {
        // Transform cache format to component format
        const transformedPricing = {
          subtotal: instantPricing.subtotal,
          discountTotal: 0,
          tax: instantPricing.tax,
          gratuity: instantPricing.gratuity,
          total: instantPricing.total,
          perPersonCost: instantPricing.perPersonCost,
          depositRequired: instantPricing.depositAmount > 0,
          depositPercent: instantPricing.depositPercent,
          depositAmount: instantPricing.depositAmount,
          paymentSchedule: [],
          expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
          breakdown: {},
          displaySettings: {},
          urgencyMessage: null,
          adjustments: [],
          adjustmentTotal: 0
        };
        
        setDiscoPricing(transformedPricing);
        
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);
        console.log(`🎵 ⚡ INSTANT disco pricing completed in ${duration}ms (target: <50ms)`);
        console.log('🎵 ⚡ INSTANT disco pricing result:', transformedPricing);
      }
    } catch (error) {
      console.error('⚡ Instant disco pricing calculation failed:', error);
      // Fallback to old API call if needed
    }
  }, [isCalendarFlow, calendarData, selectedDiscoPackage, discoTicketQuantity, quote, discountCode, updateSelection, recomputePricing]);

  // 🗓️ WEEKLY AVAILABILITY: Fetch weekly slots for 17hats-style interface
  const fetchWeeklyAvailability = useCallback(async () => {
    if (!isCalendarFlow) return;
    
    setSlotsLoading(true);
    try {
      const targetDate = eventDate || format(new Date(), 'yyyy-MM-dd');
      const eventTypeParam = isCalendarFlow ? calendarData?.eventType : quote?.project?.eventType;
      const isBachelor = isBachelorEvent();
      
      console.log('🗓️ Fetching weekly availability for:', {
        date: targetDate,
        groupSize: capacityFilter || groupSize,
        eventType: eventTypeParam,
        isBachelor
      });
      
      // Fetch private cruise availability
      const response = await apiRequest('GET', `/api/availability/weekly?date=${targetDate}&groupSize=${capacityFilter || groupSize}&eventType=${eventTypeParam}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Weekly private availability loaded:', data.totalSlots, 'slots');
        setWeeklySlots(data.slots || []);
      } else {
        console.error('❌ Failed to fetch weekly availability');
        setWeeklySlots([]);
      }
      
      // If bachelor/bachelorette event, also fetch disco cruise availability
      if (isBachelor) {
        console.log('🎵 Fetching disco availability for bachelor/bachelorette event');
        const discoResponse = await apiRequest('GET', `/api/availability/weekly?date=${targetDate}&groupSize=${capacityFilter || groupSize}&eventType=${eventTypeParam}&cruiseType=disco`);
        
        if (discoResponse.ok) {
          const discoData = await discoResponse.json();
          console.log('✅ Weekly disco availability loaded:', discoData.totalSlots, 'slots');
          setWeeklyDiscoSlots(discoData.slots || []);
        } else {
          console.error('❌ Failed to fetch disco availability');
          setWeeklyDiscoSlots([]);
        }
      } else {
        setWeeklyDiscoSlots([]);
      }
    } catch (error) {
      console.error('Weekly availability error:', error);
      setWeeklySlots([]);
      setWeeklyDiscoSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, [isCalendarFlow, eventDate, capacityFilter, calendarData?.eventType, quote?.project?.eventType]);

  // Fetch available time slots based on group size and date
  const fetchAvailableSlots = useCallback(async () => {
    if (!isCalendarFlow) return; // Only needed for calendar flow
    
    setSlotsLoading(true);
    try {
      const searchParams = new URLSearchParams({
        startDate: eventDate,
        endDate: eventDate,
        cruiseType: selectedCruiseType,
        groupSize: selectedCruiseType === 'disco' ? discoTicketQuantity.toString() : groupSize.toString()
      });
      
      const response = await apiRequest('GET', `/api/availability/search?${searchParams}`);
      if (response.ok) {
        const data = await response.json();
        setAvailableSlots(data.slots || []);
      } else {
        console.error('Failed to fetch available slots');
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setAvailableSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, [isCalendarFlow, eventDate, selectedCruiseType, groupSize, discoTicketQuantity]);

  // Fetch weekly slots when dependencies change 
  useEffect(() => {
    if (isCalendarFlow) {
      fetchWeeklyAvailability();
    }
  }, [isCalendarFlow, eventDate, capacityFilter, groupSize, fetchWeeklyAvailability]);

  // Find and set the selectedSlot when weekly slots are loaded and we have a selectedSlotId
  useEffect(() => {
    if (selectedSlotId && weeklySlots.length > 0 && !selectedSlot) {
      // Find the slot that matches the selectedSlotId
      const foundSlot = weeklySlots.find(slot => {
        const boatName = slot.boatCandidates?.[0] || slot.boat || 'boat_unknown';
        const slotDate = slot.dateISO || slot.date;
        const duration = slot.duration || 4;
        const dayName = format(new Date(slotDate), 'EEEE');
        const slotId = `${duration}hr_${dayName}_private_${boatName}_${slotDate}_${slot.startTime}_${slot.endTime}`;
        return slotId === selectedSlotId;
      });

      if (foundSlot) {
        console.log('🎯 Found matching slot for selectedSlotId:', foundSlot);
        setSelectedSlot(foundSlot);
        setSelectedOption(selectedSlotId);
        
        // CRITICAL FIX: Update eventDate from the found slot
        const slotDate = foundSlot.dateISO || foundSlot.date;
        if (slotDate) {
          console.log('🎯 Updating eventDate from found slot:', slotDate);
          setEventDate(slotDate);
        }
        
        // Also ensure time slot is properly set
        if (!selectedTimeSlot && foundSlot.startTime && foundSlot.endTime) {
          setSelectedTimeSlot(`${foundSlot.startTime}-${foundSlot.endTime}`);
        }
        // Ensure boat ID is set
        if (!selectedBoatId && foundSlot.boatCandidates?.[0]) {
          setSelectedBoatId(foundSlot.boatCandidates[0]);
        }
      }
    }
  }, [selectedSlotId, weeklySlots, selectedSlot, selectedTimeSlot, selectedBoatId]);

  // Update pricing when dependencies change - add all dependencies for immediate updates
  useEffect(() => {
    if (selectedCruiseType === 'private' && (isCalendarFlow || quote)) {
      fetchPrivatePricing();
    }
  }, [selectedCruiseType, addOnsKey, groupSize, selectedOption, quote, selectedTimeSlot, selectedBoatId, selectedPrivatePackage, fetchPrivatePricing, isCalendarFlow]);

  useEffect(() => {
    if (selectedCruiseType === 'disco' && (isCalendarFlow || quote)) {
      fetchDiscoPricing();
    }
  }, [selectedCruiseType, selectedDiscoPackage, discoTicketQuantity, quote, fetchDiscoPricing, isCalendarFlow, selectedDiscoPackageOption]);

  // Capacity filter change handler
  const handleCapacityChange = (capacity: number | null) => {
    const newCapacity = capacity === null ? 100 : capacity;
    setCapacityFilter(newCapacity);
    setGroupSize(Math.min(groupSize, newCapacity)); // Adjust group size if needed
  };

  // Handle option selection from dropdowns
  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    
    // Determine if this is a disco or private cruise selection
    const isDisco = value.includes('disco_');
    setSelectedTimeSlotType(isDisco ? 'disco' : 'private');
    setShowPackageDropdown(true);
    
    // Parse the selection to update timeSlot, duration, and DATE
    const parts = value.split('_');
    if (parts.length >= 6) {
      const startTime = parts[parts.length - 2];
      const endTime = parts[parts.length - 1];
      setSelectedTimeSlot(`${startTime} - ${endTime}`);
      
      // CRITICAL FIX: Extract and update the actual date from the slot ID
      // Format: {duration}hr_{dayName}_{type}_{boat}_{date}_{startTime}_{endTime} for private
      // Format: disco_{date}_{startTime}_{endTime}_{capacity} for disco
      let extractedDate: string | null = null;
      
      if (isDisco) {
        // Disco formats: 
        // 1. disco_2025-09-27_11:00_15:00_100
        // 2. disco_Friday_2025-09-27_11:00_15:00_0 (from weekly grid)
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].match(/^\d{4}-\d{2}-\d{2}$/)) {
            extractedDate = parts[i];
            break;
          }
        }
      } else {
        // Private format: 3hr_Friday_private_meeseeks_2025-09-27_11:00_15:00
        // Find the date part (formatted as YYYY-MM-DD)
        for (let i = 0; i < parts.length - 2; i++) {
          if (parts[i].match(/^\d{4}-\d{2}-\d{2}$/)) {
            extractedDate = parts[i];
            break;
          }
        }
      }
      
      // Update the eventDate if we successfully extracted it
      if (extractedDate) {
        console.log('🎯 Updating eventDate from slot selection:', {
          previousDate: eventDate,
          newDate: extractedDate,
          slotId: value
        });
        setEventDate(extractedDate);
        
        // Also update selectedSlot with the correct date
        setSelectedSlot((prevSlot: any) => ({
          ...prevSlot,
          date: extractedDate,
          dateISO: extractedDate
        }));
      } else {
        console.warn('⚠️ Could not extract date from slot ID:', value);
      }
      
      // Set boat ID from the selection
      const boatSection = parts.slice(3, -2).join('_'); // Extract boat name from the ID
      setSelectedBoatId(boatSection);
      
      // Determine duration from selection ID
      if (value.includes('3hr_')) {
        // 3-hour selection
        console.log('3-hour cruise selected');
      } else if (value.includes('4hr_')) {
        // 4-hour selection
        console.log('4-hour cruise selected');
      }
    }
    
    // Set cruise type based on selection
    if (isDisco) {
      setSelectedCruiseType('disco');
      setSelectedDiscoPackage(selectedDiscoPackageOption);
    } else {
      setSelectedCruiseType('private');
    }
  };

  // Helper to get time slot from quote
  const getTimeSlotFromQuote = (quote: any) => {
    if (!quote?.project?.projectTime) return '';
    return quote.project.projectTime;
  };

  const handlePayment = async (type: 'deposit' | 'full', cruiseType?: 'private' | 'disco') => {
    const effectiveCruiseType = cruiseType || selectedCruiseType;
    const pricing = effectiveCruiseType === 'private' ? privatePricing : discoPricing;
    
    if (!pricing) {
      toast({
        title: "Error",
        description: "Pricing information not available",
        variant: "destructive"
      });
      return;
    }

    console.log('💳 handlePayment called with:', { paymentType: type, cruiseType: effectiveCruiseType });
    
    // Set payment type and show embedded form
    setPaymentType(type);
    setShowPaymentForm(true);
    setPaymentError(null);
    
    // Scroll to payment form after a brief delay
    setTimeout(() => {
      const paymentForm = document.getElementById('embedded-payment-form');
      if (paymentForm) {
        paymentForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    // For calendar flow, check if we have contact info
    let finalContactInfo = contactInfo;
    if (isCalendarFlow && !contactInfo.email) {
      // Don't use placeholder - let the modal collect real info
      finalContactInfo = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      };
    }

    // CRITICAL FIX: Use the actual date from the selected slot, not the initial eventDate
    let actualEventDate = eventDate; // Default to current eventDate
    
    // For calendar flow, ensure we're using the date from the selected slot
    if (isCalendarFlow && selectedOption) {
      // Extract date from the selectedOption (slot ID) as a safety check
      const parts = selectedOption.split('_');
      let extractedDate: string | null = null;
      
      if (selectedOption.includes('disco_')) {
        // Disco format: disco_2025-09-27_11:00_15:00_100
        if (parts.length >= 4) {
          extractedDate = parts[1];
        }
      } else {
        // Private format: 3hr_Friday_private_meeseeks_2025-09-27_11:00_15:00
        for (let i = 0; i < parts.length - 2; i++) {
          if (parts[i].match(/^\d{4}-\d{2}-\d{2}$/)) {
            extractedDate = parts[i];
            break;
          }
        }
      }
      
      if (extractedDate) {
        actualEventDate = extractedDate;
        console.log('💳 Using extracted date for payment:', {
          extractedDate,
          selectedOption,
          previousEventDate: eventDate
        });
      }
    }
    
    // Use selectedSlot date if available (as additional fallback)
    if (selectedSlot?.date) {
      actualEventDate = selectedSlot.date;
    }
    
    // Prepare selectionPayload as required by the server
    const selectionPayload: any = {
      entryPoint: isCalendarFlow ? 'calendar_flow' : 'quote_flow',
      cruiseType: effectiveCruiseType,
      eventDate: isCalendarFlow ? actualEventDate : quote?.project?.projectDate,
      eventType: isCalendarFlow ? calendarData?.eventType : quote?.project?.eventType,
      groupSize: effectiveCruiseType === 'disco' ? discoTicketQuantity : groupSize,
      subtotal: pricing.subtotal,
      tax: pricing.tax,
      gratuity: pricing.gratuity,
      total: pricing.total,
      depositAmount: pricing.depositAmount || 0,
      firstName: finalContactInfo.firstName,
      lastName: finalContactInfo.lastName,
      email: finalContactInfo.email,
      phone: finalContactInfo.phone
    };
    
    console.log('💳 Final payment payload:', {
      eventDate: selectionPayload.eventDate,
      cruiseType: effectiveCruiseType,
      selectedSlotId: selectedOption
    });

    // Add cruise-type specific data to selectionPayload
    if (effectiveCruiseType === 'private') {
      selectionPayload.duration = privatePricing?.duration;
      selectionPayload.boatId = selectedBoatId;
      selectionPayload.selectedAddOnPackages = selectedAddOns;
      selectionPayload.selectedTimeSlot = isCalendarFlow ? selectedTimeSlot : quote?.project?.projectTime;
      selectionPayload.timeSlot = isCalendarFlow ? selectedTimeSlot : quote?.project?.projectTime;
      
      // Ensure selectedSlot has the required startTime and endTime fields
      if (selectedSlot) {
        selectionPayload.selectedSlot = {
          ...selectedSlot,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          id: selectedSlot.id || selectedSlotId,
          boatId: selectedSlot.boatId || selectedSlot.boat || selectedBoatId
        };
        selectionPayload.startTime = selectedSlot.startTime;
        selectionPayload.endTime = selectedSlot.endTime;
        selectionPayload.slotId = selectedSlot.id || selectedSlotId;
      } else if (selectedTimeSlot && isCalendarFlow) {
        // If selectedSlot is not set but we have a time slot string, parse it
        const timeMatch = selectedTimeSlot.match(/(\d{1,2}:\d{2})\s*(?:AM|PM)?(?:\s*-\s*(\d{1,2}:\d{2})\s*(?:AM|PM)?)?/);
        if (timeMatch) {
          const [, startTime, endTime] = timeMatch;
          selectionPayload.selectedSlot = {
            startTime: startTime || '',
            endTime: endTime || '',
            id: selectedSlotId || '',
            boatId: selectedBoatId || ''
          };
          selectionPayload.startTime = startTime || '';
          selectionPayload.endTime = endTime || '';
        } else {
          // As a fallback, create a minimal slot object
          selectionPayload.selectedSlot = {
            startTime: '',
            endTime: '',
            id: selectedSlotId || '',
            boatId: selectedBoatId || ''
          };
        }
      } else {
        // Ensure we always send a selectedSlot object for calendar flow
        if (isCalendarFlow) {
          selectionPayload.selectedSlot = {
            startTime: '',
            endTime: '',
            id: selectedSlotId || '',
            boatId: selectedBoatId || ''
          };
        }
      }
      
      selectionPayload.selectedOption = selectedOption;
      selectionPayload.selectedAddOns = selectedAddOns;
    } else {
      selectionPayload.discoPackage = selectedDiscoPackage;
      selectionPayload.ticketQuantity = discoTicketQuantity;
    }

    // Store payment details for the embedded form
    sessionStorage.setItem('paymentSelectionPayload', JSON.stringify(selectionPayload));
    sessionStorage.setItem('paymentPricing', JSON.stringify(pricing));
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    console.log('✅ Payment successful:', paymentIntentId);
    
    // Store payment success info
    sessionStorage.setItem('paymentSuccess', JSON.stringify({
      paymentIntentId,
      timestamp: new Date().toISOString()
    }));

    // Navigate to booking success page with query parameters
    const successUrl = new URL('/booking-success', window.location.origin);
    const sessionId = sessionStorage.getItem('sessionId');
    
    if (sessionId) {
      successUrl.searchParams.set('session_id', sessionId);
    }
    if (quoteId) {
      successUrl.searchParams.set('quote_id', quoteId);
    }
    
    // Use location.href for navigation (not urlIncludes)
    window.location.href = successUrl.toString();
  };

  // Loading state
  if ((isQuoteFlow || isAdminFlow) && isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading your quote...</p>
        </div>
      </div>
    );
  }

  // Error state  
  if ((isQuoteFlow || isAdminFlow) && quoteError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Error</AlertTitle>
          <AlertDescription className="mt-2">
            {(quoteError as Error).message || 'Unable to access quote'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // If not in a valid flow, show error
  if (!isQuoteFlow && !isAdminFlow && !isCalendarFlow) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Invalid Access</AlertTitle>
          <AlertDescription className="mt-2">
            This page requires valid quote parameters or calendar selection.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* Combined Header with Cruise Heading */}
      <div className="bg-white border-b print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <img src={logoPath} alt="Premier Party Cruises" className="h-12" />
            <div className="flex-1 text-center px-4">
              <h1 className="text-4xl font-bold text-gray-900">
                {selectedCruiseType === 'disco' ? '🎵 ATX Disco Cruise' : '🚢 Private Cruise'} for {groupSize} People
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
          <div className="text-center">
            <Badge className="text-xl px-4 py-2" variant="default">
              {eventType === 'bachelor' && '🤵 Bachelor Party'}
              {eventType === 'bachelorette' && '👰 Bachelorette Party'}
              {eventType === 'wedding' && '💒 Wedding'}
              {eventType === 'birthday' && '🎂 Birthday'}
              {eventType === 'corporate' && '💼 Corporate Event'}
              {!['bachelor', 'bachelorette', 'wedding', 'birthday', 'corporate'].includes(eventType) && '🎉 Party'}
            </Badge>
            {quote && (
              <Badge variant={isExpired ? "destructive" : "secondary"} className="ml-3 text-lg px-3 py-1">
                {isExpired ? 'EXPIRED' : 'Active Quote'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 17HATS-STYLE WEEKLY INTERFACE */}
        <div className="space-y-6">

          {/* Date Navigation Header */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={() => {
                    const currentDate = parseLocalDate(eventDate || format(new Date(), 'yyyy-MM-dd'));
                    const newDate = new Date(currentDate);
                    newDate.setDate(currentDate.getDate() - 7);
                    setEventDate(format(newDate, 'yyyy-MM-dd'));
                    fetchWeeklyAvailability();
                  }}
                  className="h-14 w-14 p-0 hover:bg-blue-50"
                  data-testid="button-date-prev"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {eventDate ? format(parseLocalDate(eventDate), 'EEEE, MMMM d, yyyy') : 'Select a date'}
                  </h2>
                  <p className="text-lg text-gray-600 mt-1">Select your preferred date and time below</p>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={() => {
                    const currentDate = parseLocalDate(eventDate || format(new Date(), 'yyyy-MM-dd'));
                    const newDate = new Date(currentDate);
                    newDate.setDate(currentDate.getDate() + 7);
                    setEventDate(format(newDate, 'yyyy-MM-dd'));
                    fetchWeeklyAvailability();
                  }}
                  className="h-14 w-14 p-0 hover:bg-blue-50"
                  data-testid="button-date-next"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Group Size Selection - Centered Below Date */}
          <div className="flex justify-center">
            <div className="inline-block">
              <p className="text-center text-lg text-gray-600 mb-4">Adjust Group Size</p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant={groupSize <= 14 ? "default" : "outline"}
                  size="lg"
                  className="rounded-full h-16 w-16 text-lg font-bold"
                  onClick={() => {
                    setGroupSize(14);
                    setCapacityFilter(14);
                  }}
                  data-testid="button-capacity-14"
                >
                  ≤14
                </Button>
                <Button
                  variant={groupSize > 14 && groupSize <= 25 ? "default" : "outline"}
                  size="lg"
                  className="rounded-full h-16 w-16 text-lg font-bold"
                  onClick={() => {
                    setGroupSize(20);
                    setCapacityFilter(25);
                  }}
                  data-testid="button-capacity-25"
                >
                  25
                </Button>
                <Button
                  variant={groupSize > 25 && groupSize <= 50 ? "default" : "outline"}
                  size="lg"
                  className="rounded-full h-16 w-16 text-lg font-bold"
                  onClick={() => {
                    setGroupSize(35);
                    setCapacityFilter(50);
                  }}
                  data-testid="button-capacity-50"
                >
                  50
                </Button>
                <Button
                  variant={groupSize > 50 && groupSize <= 75 ? "default" : "outline"}
                  size="lg"
                  className="rounded-full h-16 w-16 text-lg font-bold"
                  onClick={() => {
                    setGroupSize(60);
                    setCapacityFilter(75);
                  }}
                  data-testid="button-capacity-75"
                >
                  75
                </Button>
              </div>
              <p className="text-center text-base text-gray-500 mt-3">
                Currently showing options for: <span className="font-bold">{groupSize} people</span>
              </p>
            </div>
          </div>

          {/* Main Content Grid - Changed to 50/50 split */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column: Selection Interface */}
            <div className="lg:col-span-1">
              {/* Weekly Availability Grid */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl font-bold">Available Times This Week</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  {isLoadingWeekly ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                  ) : weeklySlots.length > 0 || weeklyDiscoSlots.length > 0 ? (
                    <div className="space-y-3">
                      {/* Compute ordered dates based on original selection */}
                      {(() => {
                        const originalDate = deriveOriginalDate(quote);
                        const orderedDayNames = originalDate ? computeOrderedDates(originalDate) : 
                          ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
                        const isBachelor = isBachelorEvent();
                        
                        return (
                          <>
                            {/* Render days in computed order */}
                            {orderedDayNames.map((dayName) => {
                              // Map day names to day numbers
                              const dayMap: { [key: string]: number } = {
                                'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
                                'Thursday': 4, 'Friday': 5, 'Saturday': 6
                              };
                              const dayNum = dayMap[dayName];
                              
                              // Get slots for this day
                              const privateSlots = weeklySlots.filter(slot => {
                                const slotDay = parseLocalDate(slot.dateISO || slot.date).getDay();
                                return slotDay === dayNum;
                              });
                              
                              const discoSlots = weeklyDiscoSlots.filter(slot => {
                                const slotDay = parseLocalDate(slot.dateISO || slot.date).getDay();
                                return slotDay === dayNum;
                              });
                              
                              if (privateSlots.length === 0 && discoSlots.length === 0) return null;
                              
                              // Determine if we should show disco options for this day
                              const showDisco = isBachelor && showDiscoOptions && (dayName === 'Friday' || dayName === 'Saturday') && discoSlots.length > 0;
                              const isWeekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(dayName);
                              const isWeekend = ['Friday', 'Saturday', 'Sunday'].includes(dayName);
                              
                              // Get the actual date for display
                              const firstSlot = privateSlots[0] || discoSlots[0];
                              const displayDate = firstSlot ? format(parseLocalDate(firstSlot.dateISO || firstSlot.date), 'MMMM d') : '';
                              
                              // Filter weekend slots based on business rules
                              const filteredPrivateSlots = (() => {
                                if (!isWeekend) return privateSlots;
                                
                                if (dayName === 'Friday') {
                                  // Friday: Show all 4-hour slots
                                  return privateSlots.filter(s => s.duration === 4);
                                } else if (dayName === 'Saturday') {
                                  // Saturday: Show all 4-hour slots
                                  return privateSlots.filter(s => s.duration === 4);
                                } else if (dayName === 'Sunday') {
                                  // Sunday: Only show 11:00 AM - 3:00 PM and 3:30 PM - 7:30 PM
                                  return privateSlots.filter(s => {
                                    if (s.duration !== 4) return false;
                                    const startTime = s.startTime;
                                    // Allow 11:00 and 15:30 (3:30 PM) start times
                                    return startTime === '11:00' || startTime === '15:30';
                                  });
                                }
                                return privateSlots;
                              })();
                              
                              const filteredDiscoSlots = showDisco ? discoSlots : [];
                              
                              return (
                                <div key={dayName} className={`border rounded-lg p-4 ${isWeekend ? 'bg-gray-50' : 'bg-blue-50'}`}>
                                  <div className="flex items-center justify-between mb-4">
                                    <div>
                                      <h3 className="font-bold text-gray-900 text-2xl">
                                        {dayName}
                                      </h3>
                                      <p className="text-lg text-gray-600">{displayDate}</p>
                                    </div>
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-gray-900 font-bold text-xl shadow-md">
                                      {/* Show boat capacity based on group size */}
                                      {groupSize <= 14 ? '14' :
                                       groupSize <= 25 ? '25' :
                                       groupSize <= 50 ? '50' :
                                       groupSize <= 75 ? '75' :
                                       '75+'}
                                    </div>
                                  </div>
                                  
                                  {/* Duration and time slot selectors for weekdays */}
                                  {isWeekday && (
                                    <div className="mb-3 flex gap-3">
                                      {/* Duration dropdown - Left column */}
                                      <div className="flex-1">
                                        <Select 
                                          value={weekdayDurations[dayName] || '4'}
                                          onValueChange={(value) => {
                                            setWeekdayDurations(prev => ({...prev, [dayName]: value}));
                                            // Clear time slot selection when duration changes
                                            setWeekdayTimeSlots(prev => ({...prev, [dayName]: ''}));
                                          }}
                                        >
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select duration" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="3">3 Hour Cruise</SelectItem>
                                            <SelectItem value="4">4 Hour Cruise</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      
                                      {/* Time slot dropdown - Right column */}
                                      <div className="flex-1">
                                        {(() => {
                                          const availableSlots = privateSlots.filter(s => s.duration === parseInt(weekdayDurations[dayName] || '4') && s.bookable);
                                          const selectedSlotId = weekdayTimeSlots[dayName];
                                          
                                          if (availableSlots.length === 0) {
                                            return <div className="text-sm text-gray-500 p-2">No available slots</div>;
                                          }
                                          
                                          return (
                                            <Select 
                                              value={weekdayTimeSlots[dayName] || ''}
                                              onValueChange={(value) => {
                                                setWeekdayTimeSlots(prev => ({...prev, [dayName]: value}));
                                                handleOptionSelect(value);
                                                
                                                // Also update the selected slot details for pricing
                                                const slot = availableSlots.find(s => {
                                                  const boatName = s.boatCandidates?.[0] || s.boat || 'boat_unknown';
                                                  const slotDate = s.dateISO || s.date;
                                                  const duration = s.duration || 4;
                                                  const slotId = `${duration}hr_${dayName}_private_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`;
                                                  return slotId === value;
                                                });
                                                
                                                if (slot) {
                                                  setSelectedSlot(slot);
                                                  setSelectedTimeSlot(`${slot.startTime}-${slot.endTime}`);
                                                  setSelectedBoatId(slot.boatCandidates?.[0] || slot.boat || '');
                                                  setSelectedSlotId(value);
                                                  setEventDate(slot.dateISO || slot.date);
                                                }
                                              }}
                                            >
                                              <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select time slot" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {availableSlots.map(slot => {
                                                  const boatName = slot.boatCandidates?.[0] || slot.boat || 'boat_unknown';
                                                  const slotDate = slot.dateISO || slot.date;
                                                  const duration = slot.duration || 4;
                                                  const slotId = `${duration}hr_${dayName}_private_${boatName}_${slotDate}_${slot.startTime}_${slot.endTime}`;
                                                  
                                                  // Get hourly rate based on boat
                                                  const getHourlyRate = () => {
                                                    if (boatName.includes('day_tripper')) return 200;
                                                    if (boatName.includes('me_seeks')) return 225;
                                                    if (boatName.includes('clever_girl')) return 250;
                                                    return 225;
                                                  };
                                                  
                                                  return (
                                                    <SelectItem key={slotId} value={slotId}>
                                                      <span className="text-base">
                                                        {formatTimeToAMPM(slot.startTime)} - {formatTimeToAMPM(slot.endTime)} (${getHourlyRate()}/hr)
                                                      </span>
                                                    </SelectItem>
                                                  );
                                                })}
                                              </SelectContent>
                                            </Select>
                                          );
                                        })()}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Private Cruise Options - Only show for weekends */}
                                  {!isWeekday && filteredPrivateSlots.length > 0 && (
                                    <div className="mb-2">
                                      {showDisco && <h4 className="text-base font-medium text-gray-700 mb-2">🚢 Private Cruise</h4>}
                                      <RadioGroup value={selectedOption} onValueChange={handleOptionSelect}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                          {filteredPrivateSlots.map((slot) => {
                                            const boatName = slot.boatCandidates?.[0] || slot.boat || 'boat_unknown';
                                            const slotDate = slot.dateISO || slot.date;
                                            const duration = slot.duration || 4;
                                            const slotId = `${duration}hr_${dayName}_private_${boatName}_${slotDate}_${slot.startTime}_${slot.endTime}`;
                                            const isSelected = selectedOption === slotId;
                                            const isBooked = !slot.bookable || slot.availableCount === 0;
                                            
                                            // Get hourly rate based on boat and day
                                            const getHourlyRate = () => {
                                              if (isWeekday) {
                                                if (boatName.includes('day_tripper')) return duration === 3 ? 200 : 200;
                                                if (boatName.includes('me_seeks')) return duration === 3 ? 225 : 225;
                                                if (boatName.includes('clever_girl')) return duration === 3 ? 250 : 250;
                                                return 225;
                                              } else if (dayName === 'Friday') {
                                                if (boatName.includes('day_tripper')) return 225;
                                                if (boatName.includes('me_seeks')) return 250;
                                                if (boatName.includes('clever_girl')) return 275;
                                                return 250;
                                              } else { // Saturday/Sunday
                                                if (boatName.includes('day_tripper')) return 350;
                                                if (boatName.includes('me_seeks')) return 375;
                                                if (boatName.includes('clever_girl')) return 400;
                                                return 375;
                                              }
                                            };
                                            
                                            return (
                                              <div key={slotId} className={`flex items-center space-x-1 p-1 border rounded ${isBooked ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'hover:bg-white'} ${isSelected && !isBooked ? 'border-blue-500 bg-blue-50' : isBooked ? 'border-red-300' : 'border-gray-300 bg-white'}`}>
                                                <RadioGroupItem 
                                                  value={slotId} 
                                                  id={slotId} 
                                                  disabled={isBooked}
                                                  data-testid={`radio-slot-${slotId}`} 
                                                  className="h-3 w-3"
                                                />
                                                <Label htmlFor={slotId} className={`flex-1 ${isBooked ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                                  <div className="flex justify-between items-center py-1">
                                                    <span className={`text-base ${isBooked ? 'line-through text-red-600' : ''}`}>
                                                      {formatTimeToAMPM(slot.startTime)} - {formatTimeToAMPM(slot.endTime)}
                                                    </span>
                                                    <span className={`text-sm ${isBooked ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                                                      {isBooked ? 'SOLD' : `$${getHourlyRate()}/hr`}
                                                    </span>
                                                  </div>
                                                </Label>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </RadioGroup>
                                    </div>
                                  )}
                                  
                                  {/* Disco Cruise Options (bachelor/bachelorette only) */}
                                  {showDisco && filteredDiscoSlots.length > 0 && (
                                    <div>
                                      <h4 className="text-base font-medium text-gray-700 mb-2">🎵 ATX Disco Cruise</h4>
                                      <RadioGroup value={selectedOption} onValueChange={handleOptionSelect}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                          {filteredDiscoSlots.map((slot, index) => {
                                            const slotDate = slot.dateISO || slot.date;
                                            const slotId = `disco_${dayName}_${slotDate}_${slot.startTime}_${slot.endTime}_${index}`;
                                            const isSelected = selectedOption === slotId;
                                            const isBooked = !slot.bookable || slot.availableCount === 0;
                                            
                                            return (
                                              <div key={slotId} className={`flex items-center space-x-1 p-1 border rounded ${isBooked ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'hover:bg-white'} ${isSelected && !isBooked ? 'border-purple-500 bg-purple-50' : isBooked ? 'border-red-300' : 'border-gray-300 bg-white'}`}>
                                                <RadioGroupItem 
                                                  value={slotId} 
                                                  id={slotId} 
                                                  disabled={isBooked}
                                                  data-testid={`radio-slot-${slotId}`} 
                                                  className="h-3 w-3"
                                                />
                                                <Label htmlFor={slotId} className={`flex-1 ${isBooked ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                                  <div className="flex justify-between items-center py-1">
                                                    <span className={`text-base ${isBooked ? 'line-through text-red-600' : ''}`}>
                                                      {formatTimeToAMPM(slot.startTime)} - {formatTimeToAMPM(slot.endTime)}
                                                    </span>
                                                    <span className={`text-sm ${isBooked ? 'text-red-600 font-bold' : 'text-purple-600'}`}>
                                                      {isBooked ? 'SOLD' : '$85+/p'}
                                                    </span>
                                                  </div>
                                                </Label>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </RadioGroup>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CalendarIconLucide className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-xl text-gray-600">No available slots this week</p>
                      <p className="text-base text-gray-500 mt-2">Try adjusting your group size or selecting a different week</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Pricing Summary & Payment */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Prominent User Selection Display */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
                  <CardHeader className="py-4">
                    <CardTitle className="text-2xl font-bold text-center">
                      {eventType === 'bachelorette' ? '👰 Bachelorette Party' : 
                       eventType === 'bachelor' ? '🤵 Bachelor Party' : 
                       selectedCruiseType === 'disco' ? '🎵 ATX Disco Cruise' : '🚢 Private Cruise'}
                    </CardTitle>
                    <div className="text-center space-y-2 mt-3">
                      <div className="text-xl font-semibold text-blue-800">
                        {groupSize} People • {eventDate ? format(new Date(eventDate), 'EEEE, MMM d') : 'Select Date'}
                      </div>
                      {selectedTimeSlot && (
                        <div className="text-lg font-medium text-purple-700">
                          {selectedTimeSlot.includes('-') ? 
                            `${formatTimeToAMPM(selectedTimeSlot.split('-')[0].trim())} - ${formatTimeToAMPM(selectedTimeSlot.split('-')[1].trim())}` : 
                            selectedTimeSlot
                          }
                        </div>
                      )}
                      {selectedCruiseType === 'disco' && (
                        <div className="text-lg font-semibold text-purple-600">
                          {selectedDiscoPackageOption === 'disco_queen' ? 'Disco Queen Package' : 
                           selectedDiscoPackageOption === 'platinum' ? 'Super Sparkle Platinum' : 'Basic Package'}
                          {/* Show ticket count prominently */}
                          <div className="text-2xl font-bold mt-2">{discoTicketQuantity} Tickets</div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                </Card>

                <Card className="sticky top-4">
                  <CardHeader className="py-4">
                    <CardTitle className="text-2xl font-bold">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedOption ? (
                      <>
                        {/* Selected Cruise Details - Larger fonts */}
                        <div className="space-y-3 pb-4 border-b">
                          <div className="flex justify-between text-lg">
                            <span className="text-gray-700 font-medium">Date:</span>
                            <span className="font-bold">{eventDate && format(new Date(eventDate), 'MMM d, yyyy')}</span>
                          </div>
                          <div className="flex justify-between text-lg">
                            <span className="text-gray-700 font-medium">Group Size:</span>
                            <span className="font-bold">{groupSize} people</span>
                          </div>
                          <div className="flex justify-between text-lg">
                            <span className="text-gray-700 font-medium">Duration:</span>
                            <span className="font-bold">
                              {selectedOption.includes('3hr') ? '3 hours' : '4 hours'}
                            </span>
                          </div>
                          {selectedTimeSlot && (
                            <div className="flex justify-between text-lg">
                              <span className="text-gray-700 font-medium">Time:</span>
                              <span className="font-bold">
                                {selectedTimeSlot.includes('-') ? 
                                  `${formatTimeToAMPM(selectedTimeSlot.split('-')[0].trim())} - ${formatTimeToAMPM(selectedTimeSlot.split('-')[1].trim())}` : 
                                  selectedTimeSlot
                                }
                              </span>
                            </div>
                          )}
                          {selectedOption.includes('disco') && (
                            <div className="flex justify-between text-lg">
                              <span className="text-gray-700 font-medium">Type:</span>
                              <span className="font-bold text-purple-600">ATX Disco Cruise</span>
                            </div>
                          )}
                        </div>
                      
                      {/* Package Selection Dropdown - Clean cruise type mapping */}
                      {showPackageDropdown && (
                        <div className="pb-4 border-b">
                          <Label className="text-lg font-semibold text-gray-800">Select Package:</Label>
                          {/* Only show private packages for private cruises */}
                          {selectedCruiseType === 'private' && selectedTimeSlotType === 'private' ? (
                            <RadioGroup 
                              value={selectedPrivatePackage} 
                              onValueChange={(value) => {
                                setSelectedPrivatePackage(value);
                                // Update add-ons will trigger pricing recalculation via useEffect
                              }}
                            >
                              <div className="space-y-1 mt-2">
                                <div className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                                  <RadioGroupItem value="standard" id="standard" />
                                  <Label htmlFor="standard" className="cursor-pointer text-base flex-1">
                                    <div className="flex justify-between">
                                      <span>Standard Cruise</span>
                                      <span className="text-gray-600">Base</span>
                                    </div>
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                                  <RadioGroupItem value="essentials" id="essentials" />
                                  <Label htmlFor="essentials" className="cursor-pointer text-base flex-1">
                                    <div className="flex justify-between">
                                      <span>Essentials Package</span>
                                      <span className="text-green-600">+$200</span>
                                    </div>
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                                  <RadioGroupItem value="ultimate" id="ultimate" />
                                  <Label htmlFor="ultimate" className="cursor-pointer text-base flex-1">
                                    <div className="flex justify-between">
                                      <span>Ultimate Package</span>
                                      <span className="text-blue-600">+$400</span>
                                    </div>
                                  </Label>
                                </div>
                              </div>
                            </RadioGroup>
                          ) : selectedCruiseType === 'disco' ? (
                            // Only show disco packages for disco cruises
                            <>
                              <RadioGroup 
                                value={selectedDiscoPackageOption} 
                                onValueChange={(value) => {
                                  setSelectedDiscoPackageOption(value);
                                  setSelectedDiscoPackage(value);
                                }}
                              >
                                <div className="space-y-1 mt-2">
                                  <div className="flex items-center space-x-2 p-2 border rounded hover:bg-purple-50">
                                    <RadioGroupItem value="basic" id="basic" />
                                    <Label htmlFor="basic" className="cursor-pointer text-base flex-1">
                                      <div className="flex justify-between">
                                        <span>Basic Package</span>
                                        <span className="text-purple-600">$85/person</span>
                                      </div>
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2 p-2 border rounded hover:bg-purple-50">
                                    <RadioGroupItem value="disco_queen" id="disco_queen" />
                                    <Label htmlFor="disco_queen" className="cursor-pointer text-base flex-1">
                                      <div className="flex justify-between">
                                        <span>Disco Queen</span>
                                        <span className="text-purple-600">$95/person</span>
                                      </div>
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2 p-2 border rounded hover:bg-purple-50">
                                    <RadioGroupItem value="platinum" id="platinum" />
                                    <Label htmlFor="platinum" className="cursor-pointer text-base flex-1">
                                      <div className="flex justify-between">
                                        <span>Super Sparkle Platinum</span>
                                        <span className="text-purple-600">$105/person</span>
                                      </div>
                                    </Label>
                                  </div>
                                </div>
                              </RadioGroup>
                              
                              {/* Ticket Quantity for Disco */}
                              <div className="mt-3">
                                <Label className="text-lg font-semibold text-gray-800">Number of Tickets:</Label>
                                <div className="flex items-center gap-2 mt-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setDiscoTicketQuantity(Math.max(1, discoTicketQuantity - 1))}
                                    className="h-7 w-7 p-0"
                                    type="button"
                                  >
                                    -
                                  </Button>
                                  <span className="text-lg font-bold w-16 text-center bg-gray-100 py-1 rounded">{discoTicketQuantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setDiscoTicketQuantity(Math.min(75, discoTicketQuantity + 1))}
                                    className="h-7 w-7 p-0"
                                    type="button"
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-4 text-gray-600">
                              <p>Please select a valid time slot to see package options.</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Pricing Breakdown - Larger fonts */}
                      {privatePricing && !selectedOption.includes('disco') && (
                        <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between text-lg">
                            <span className="font-medium">Base Price:</span>
                            <span className="font-bold">${(privatePricing.subtotal / 100).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between text-lg">
                            <span className="font-medium">Tax:</span>
                            <span className="font-bold">${(privatePricing.tax / 100).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between text-lg">
                            <span className="font-medium">Gratuity:</span>
                            <span className="font-bold">${(privatePricing.gratuity / 100).toFixed(0)}</span>
                          </div>
                          <Separator className="my-4" />
                          <div className="flex justify-between font-bold text-2xl text-green-700 bg-green-50 p-3 rounded">
                            <span>Total:</span>
                            <span>${(privatePricing.total / 100).toLocaleString()}</span>
                          </div>
                          {privatePricing.depositRequired && (
                            <div className="flex justify-between text-lg font-semibold text-blue-600 bg-blue-50 p-2 rounded">
                              <span>Deposit Required:</span>
                              <span>${(privatePricing.depositAmount / 100).toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Disco Pricing Breakdown - Larger fonts */}
                      {discoPricing && selectedOption.includes('disco') && (
                        <div className="space-y-3 bg-purple-50 p-4 rounded-lg">
                          <div className="flex justify-between text-lg">
                            <span className="font-medium">Tickets:</span>
                            <span className="font-bold">{discoTicketQuantity} @ ${(discoPricing.subtotal / discoTicketQuantity / 100).toFixed(0)}/person</span>
                          </div>
                          <div className="flex justify-between text-lg">
                            <span className="font-medium">Subtotal:</span>
                            <span className="font-bold">${(discoPricing.subtotal / 100).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between text-lg">
                            <span className="font-medium">Tax:</span>
                            <span className="font-bold">${(discoPricing.tax / 100).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between text-lg">
                            <span className="font-medium">Gratuity:</span>
                            <span className="font-bold">${(discoPricing.gratuity / 100).toFixed(0)}</span>
                          </div>
                          <Separator className="my-4" />
                          <div className="flex justify-between font-bold text-2xl text-purple-700 bg-purple-100 p-3 rounded">
                            <span>Total:</span>
                            <span>${(discoPricing.total / 100).toLocaleString()}</span>
                          </div>
                          {discoPricing.depositRequired && discoPricing.depositAmount && (
                            <div className="flex justify-between text-lg font-semibold text-purple-600 bg-purple-50 p-2 rounded">
                              <span>Deposit (25%):</span>
                              <span>${(discoPricing.depositAmount / 100).toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Payment Buttons - Larger and more prominent */}
                      <div className="space-y-3 pt-4">
                        <Button
                          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          onClick={() => handlePayment('deposit', selectedOption.includes('disco') ? 'disco' : 'private')}
                          data-testid="button-pay-deposit"
                        >
                          🎆 Pay Deposit Now
                          {privatePricing?.depositAmount && !selectedOption.includes('disco') && 
                            ` - $${(privatePricing.depositAmount / 100).toLocaleString()}`
                          }
                          {discoPricing?.depositAmount && selectedOption.includes('disco') && 
                            ` - $${(discoPricing.depositAmount / 100).toLocaleString()}`
                          }
                        </Button>
                        <Button
                          className="w-full h-12 text-base font-semibold"
                          variant="outline"
                          onClick={() => handlePayment('full', selectedOption.includes('disco') ? 'disco' : 'private')}
                          data-testid="button-pay-full"
                        >
                          💳 Pay in Full
                          {privatePricing?.total && !selectedOption.includes('disco') && 
                            ` - $${(privatePricing.total / 100).toLocaleString()}`
                          }
                          {discoPricing?.total && selectedOption.includes('disco') && 
                            ` - $${(discoPricing.total / 100).toLocaleString()}`
                          }
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <CalendarIconLucide className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-xl font-medium text-gray-600">Select a time slot to see pricing</p>
                      <p className="text-base text-gray-500 mt-2">Choose from available times on the left</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Embedded Payment Form - Moved to Right Column */}
              {showPaymentForm && (
                <Card className="shadow-lg border-2 border-blue-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <CreditCard className="h-6 w-6" />
                      Complete Your {paymentType === 'deposit' ? 'Deposit' : 'Full'} Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Elements stripe={stripePromise}>
                      <PaymentForm
                        paymentType={paymentType}
                        cruiseType={selectedCruiseType}
                        selectionPayload={JSON.parse(sessionStorage.getItem('paymentSelectionPayload') || '{}')}
                        pricing={selectedCruiseType === 'private' ? privatePricing : discoPricing}
                        contactInfo={contactInfo}
                        onSuccess={handlePaymentSuccess}
                        onCancel={() => setShowPaymentForm(false)}
                      />
                    </Elements>
                  </CardContent>
                </Card>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap the component with BookingCacheProvider
export default function QuoteViewer() {
  return (
    <BookingCacheProvider>
      <QuoteViewerContent />
    </BookingCacheProvider>
  );
}