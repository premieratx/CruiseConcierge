import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { useBookingCache } from '@/contexts/BookingCacheContext';
import { 
  Ship, Clock, MapPin, Phone, Mail, FileText,
  Download, Printer, CheckCircle, AlertCircle, Loader2,
  Users, Plus, Minus, Edit2, Save, CreditCard, ChevronRight, Sparkles, CalendarIcon
} from 'lucide-react';
import type { Quote, PricingPreview, Project, Contact, QuoteItem, RadioSection } from '@shared/schema';

type QuoteWithDetails = Quote & {
  pricing?: PricingPreview;
  project?: Project;
  contact?: Contact;
};

// Available packages for private cruises
const addOnPackages = [
  { id: 'essentials', name: 'Essentials Package', hourlyRate: 50, description: 'Coolers, ice, cups, napkins, and basic party supplies' },
  { id: 'ultimate', name: 'Ultimate Party Package', hourlyRate: 75, description: 'Everything in Essentials plus decorations, party games, and premium setup' }
];

// Helper functions for boat capacity mapping
const getBoatForCapacity = (capacity: number) => {
  if (capacity <= 14) return { id: 'boat_day_tripper', name: 'Day Tripper', capacity: 14 };
  if (capacity <= 25) return { id: 'boat_me_seeks_the_irony', name: 'Me Seeks The Irony', capacity: 25 };
  if (capacity <= 30) return { id: 'boat_me_seeks_the_irony', name: 'Me Seeks The Irony', capacity: 30 };
  if (capacity <= 50) return { id: 'boat_clever_girl', name: 'Clever Girl', capacity: 50 };
  return { id: 'boat_clever_girl', name: 'Clever Girl', capacity: 75 };
};

const getDayType = (date: Date) => {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 5) return 'Friday';
  if (dayOfWeek === 0 || dayOfWeek === 6) return 'Weekend';
  return 'Weekday';
};

const getAvailableDurations = (date: Date) => {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 5) return '4 hours only';
  if (dayOfWeek === 0 || dayOfWeek === 6) return '4 hours only';
  return '3 or 4 hours';
};

// Disco cruise packages - EXACT names per user specs - IDs MUST match shared/constants.ts
const discoPackages = [
  { id: 'basic', name: 'Basic', price: 8500, description: 'DJ, dancing, and party atmosphere' },
  { id: 'disco_queen', name: 'Disco Queen', price: 9500, description: 'Basic package plus premium drinks and VIP treatment' },
  { id: 'platinum', name: 'Super Sparkle Platinum Disco', price: 10500, description: 'Ultimate disco experience with all premium amenities' }
];

export default function QuoteViewer() {
  const params = useParams();
  const quoteId = params.quoteId as string;
  const { toast } = useToast();
  
  // Extract all URL parameters for both entry points
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const token = urlParams.get('token') || hashParams.get('token');
  
  // NEW: Detect entry point and extract calendar flow data
  const entryPoint = urlParams.get('entryPoint') || hashParams.get('entryPoint');
  const isCalendarFlow = entryPoint === 'calendar_flow';
  const isQuoteFlow = !!quoteId && !!token;
  
  // Extract calendar flow parameters (including disco-specific ones)
  const calendarData = isCalendarFlow ? {
    cruiseType: urlParams.get('cruiseType') || 'private',
    eventType: urlParams.get('eventType') || 'other',
    groupSize: parseInt(urlParams.get('groupSize') || '20'),
    eventDate: urlParams.get('eventDate'),
    selectedTimeSlot: urlParams.get('selectedTimeSlot'),
    slotId: urlParams.get('slotId'),
    boatId: urlParams.get('boatId'),
    discountCode: urlParams.get('discountCode') || '',
    discoPackage: urlParams.get('discoPackage') || 'basic',
    discoTicketQuantity: parseInt(urlParams.get('discoTicketQuantity') || '10'),
    selectedAddOns: urlParams.get('selectedAddOns')?.split(',').filter(Boolean) || []
  } : null;

  // Load contact info from sessionStorage (for calendar flow security)
  const [contactInfo, setContactInfo] = useState<any>(null);
  useEffect(() => {
    if (isCalendarFlow) {
      const storedContact = sessionStorage.getItem('checkoutContactInfo');
      if (storedContact) {
        try {
          setContactInfo(JSON.parse(storedContact));
        } catch (error) {
          console.error('Failed to parse contact info from sessionStorage:', error);
        }
      }
    }
  }, [isCalendarFlow]);
  
  // Interactive state - initialize from calendar flow or defaults
  const [groupSize, setGroupSize] = useState(calendarData?.groupSize || 25);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    calendarData?.eventDate ? new Date(calendarData.eventDate) : new Date()
  );
  const [selectedBoatId, setSelectedBoatId] = useState<string>(calendarData?.boatId || '');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(calendarData?.selectedAddOns || []);
  const [selectedDiscoPackage, setSelectedDiscoPackage] = useState<string>(calendarData?.discoPackage || 'basic');
  const [discoTicketQuantity, setDiscoTicketQuantity] = useState(calendarData?.discoTicketQuantity || calendarData?.groupSize || 10);
  const [privatePricing, setPrivatePricing] = useState<any>(null);
  const [discoPricing, setDiscoPricing] = useState<any>(null);
  const [pricingLoading, setPricingLoading] = useState(false);
  
  // High-performance caching system
  const { 
    currentPricing, 
    updateSelection, 
    recomputePricing,
    isLoading: cacheLoading 
  } = useBookingCache();
  const [discountCode, setDiscountCode] = useState(calendarData?.discountCode || '');
  
  // Initialize cruise type from calendar flow or default to private
  const [selectedCruiseType, setSelectedCruiseType] = useState<'private' | 'disco'>(
    (calendarData?.cruiseType as 'private' | 'disco') || 'private'
  );
  
  // Time slot selection state
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(calendarData?.selectedTimeSlot || '');
  const [selectedBoat, setSelectedBoat] = useState<string>(calendarData?.boatId || '');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>(calendarData?.eventDate || format(new Date(), 'yyyy-MM-dd'));
  const [slotsLoading, setSlotsLoading] = useState(false);
  
  // Stable dependency keys to prevent infinite loops
  const addOnsKey = useMemo(() => selectedAddOns.slice().sort().join(','), [selectedAddOns]);
  
  // Fetch quote details with token (only for quote flow)
  const { data: quote, isLoading, error: quoteError } = useQuery<QuoteWithDetails>({
    queryKey: [`/api/quotes/${quoteId}/public`, token],
    queryFn: async () => {
      if (!token) {
        console.warn('⚠️ No token found in URL parameters for quote access');
        throw new Error('Access token required. Please use the link from your email or SMS.');
      }
      
      const url = `/api/quotes/${encodeURIComponent(quoteId)}/public?token=${encodeURIComponent(token)}`;
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
        total: quoteData.total
      });
      
      return quoteData;
    },
    enabled: isQuoteFlow && !!quoteId,
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
    if (quote?.project) {
      setGroupSize(quote.project.groupSize || 20);
      
      // Set disco package if it's a disco cruise
      const discoItem = quote.items?.find(item => 
        item.name?.toLowerCase().includes('disco') || 
        item.productId?.includes('disco')
      );
      if (discoItem) {
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
        date: isCalendarFlow ? eventDate?.toISOString().split('T')[0] : quote?.project?.projectDate?.split('T')[0],
        groupSize,
        cruiseType: 'private',
        selectedAddOns,
        discountCode,
        timeSlot: isCalendarFlow ? selectedTimeSlot : getTimeSlotFromQuote(quote),
        boatId: selectedBoat,
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
        date: isCalendarFlow ? eventDate?.toISOString().split('T')[0] : quote?.project?.projectDate?.split('T')[0],
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

  // Fetch slots when dependencies change
  useEffect(() => {
    if (isCalendarFlow) {
      fetchAvailableSlots();
    }
  }, [fetchAvailableSlots]);

  // ⚡ INSTANT private pricing refresh (no debouncing needed!)
  useEffect(() => {
    if (isCalendarFlow && selectedCruiseType === 'private') {
      fetchPrivatePricing(); // Instant calculation
    } else if (!isCalendarFlow && quote && isPrivateCruise(quote)) {
      fetchPrivatePricing(); // Instant calculation
    }
  }, [quote, groupSize, addOnsKey, isCalendarFlow, selectedCruiseType, discountCode, selectedTimeSlot, selectedBoat, selectedSlotId, eventDate, fetchPrivatePricing]);

  // ⚡ INSTANT disco pricing refresh (no debouncing needed!)
  useEffect(() => {
    if (isCalendarFlow && selectedCruiseType === 'disco') {
      fetchDiscoPricing(); // Instant calculation
    } else if (!isCalendarFlow && quote && isDiscoCruise(quote)) {
      fetchDiscoPricing(); // Instant calculation
    }
  }, [quote, selectedDiscoPackage, discoTicketQuantity, isCalendarFlow, selectedCruiseType, discountCode, selectedTimeSlot, selectedSlotId, eventDate, fetchDiscoPricing]);

  // Universal payment handler - works for both quote flow and calendar flow
  const handlePayment = async (paymentType: 'deposit' | 'full', cruiseType: 'private' | 'disco') => {
    const pricing = cruiseType === 'private' ? privatePricing : discoPricing;
    if (!pricing) {
      toast({
        title: "Pricing Error",
        description: "Please wait for pricing to load before proceeding.",
        variant: "destructive",
      });
      return;
    }

    try {
      const amount = paymentType === 'deposit' ? pricing.depositAmount : pricing.total;
      
      // Build selection payload for both entry points
      const selectionPayload = isCalendarFlow ? {
        // Calendar flow data
        entryPoint: 'calendar_flow',
        paymentType,
        cruiseType,
        eventType: calendarData?.eventType || 'other',
        groupSize: cruiseType === 'disco' ? discoTicketQuantity : groupSize,
        eventDate: eventDate || calendarData?.eventDate,
        selectedTimeSlot: selectedTimeSlot || calendarData?.selectedTimeSlot,
        slotId: selectedSlotId || calendarData?.slotId,
        boatId: selectedBoat || calendarData?.boatId,
        discountCode: discountCode,
        selectedAddOns: cruiseType === 'private' ? selectedAddOns : [],
        discoPackage: cruiseType === 'disco' ? selectedDiscoPackage : null,
        discoTicketQuantity: cruiseType === 'disco' ? discoTicketQuantity : null
      } : {
        // Quote flow data
        entryPoint: 'quote_flow',
        paymentType,
        cruiseType,
        quoteId: quote?.id,
        projectId: quote?.project?.id,
        groupSize: cruiseType === 'disco' ? discoTicketQuantity : groupSize,
        discountCode: discountCode,
        selectedAddOns: cruiseType === 'private' ? selectedAddOns : [],
        discoPackage: cruiseType === 'disco' ? selectedDiscoPackage : null,
        discoTicketQuantity: cruiseType === 'disco' ? discoTicketQuantity : null,
        contactInfo: isCalendarFlow ? contactInfo : (quote?.contact ? {
          name: quote.contact.name || 'Customer',
          email: quote.contact.email || '',
          phone: quote.contact.phone || ''
        } : null)
      };

      console.log('💳 Creating checkout session:', { paymentType, cruiseType, amount, entryPoint: isCalendarFlow ? 'calendar_flow' : 'quote_flow' });

      // Use Stripe hosted checkout for now (but server validates everything)
      const response = await apiRequest('POST', '/api/checkout/create-session', {
        paymentType,
        customerEmail: isCalendarFlow ? (contactInfo?.email || '') : (quote?.contact?.email || ''),
        metadata: {
          entryPoint: isCalendarFlow ? 'calendar_flow' : 'quote_flow',
          cruiseType,
          paymentType,
          amount: amount
        },
        selectionPayload
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }
      
      const data = await response.json();
      
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }

    } catch (error: any) {
      console.error('💳 Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Helper functions
  const getTimeSlotFromQuote = (quote: QuoteWithDetails) => {
    // Extract time slot from quote data
    const timeSection = quote.radioSections?.find(s => 
      s.title?.toLowerCase().includes('time') && s.selectedValue
    );
    return timeSection?.selectedValue || 'default-slot';
  };

  const isPrivateCruise = (quote: QuoteWithDetails) => {
    return quote.items?.some(item => 
      item.type === 'private_cruise' || 
      item.type === 'cruise' ||
      !item.name?.toLowerCase().includes('disco')
    );
  };

  const isDiscoCruise = (quote: QuoteWithDetails) => {
    return quote.project?.eventType === 'bachelor' || 
           quote.project?.eventType === 'bachelorette' ||
           quote.items?.some(item => 
             item.name?.toLowerCase().includes('disco') ||
             item.productId?.includes('disco')
           );
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return 'TBD';
    return format(new Date(date), 'EEEE, MMMM d, yyyy');
  };

  // Loading state (only for quote flow)
  if (isQuoteFlow && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading quote...</p>
        </div>
      </div>
    );
  }

  // Error state (only for quote flow - calendar flow doesn't need a quote)
  if (isQuoteFlow && (quoteError || !quote)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quote Not Found</h2>
          <p className="text-gray-600">This quote may have expired or the link is invalid.</p>
        </div>
      </div>
    );
  }

  // Handle expiration and cruise type for both flows
  const isExpired = quote?.expiresAt && new Date(quote.expiresAt) < new Date();
  
  // Determine what to show based on entry point
  const canShowPrivate = isCalendarFlow ? calendarData?.cruiseType === 'private' : isPrivateCruise(quote!);
  const canShowDisco = isCalendarFlow ? calendarData?.cruiseType === 'disco' : isDiscoCruise(quote!);
  const showBothOptions = false; // For now, simplify to single cruise type per selection
  
  // Show the selected cruise type's pricing
  const showPrivateOptions = selectedCruiseType === 'private' && (canShowPrivate || !isCalendarFlow);
  const showDiscoOptions = selectedCruiseType === 'disco' && (canShowDisco || !isCalendarFlow);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img src={logoPath} alt="Premier Party Cruises" className="h-12" />
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Quote Details & Customization */}
          <div className="space-y-6">
            {/* Quote Header */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold">{isCalendarFlow ? 'Checkout' : 'Your Quote'}</CardTitle>
                    {quote?.id && <p className="text-gray-600">Quote #{quote.id.slice(-8).toUpperCase()}</p>}
                  </div>
                  {quote && (
                    <Badge variant={isExpired ? "destructive" : "secondary"}>
                      {isExpired ? 'EXPIRED' : 'Active'}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Event Date</p>
                    <p className="font-semibold">{formatDate(isCalendarFlow ? calendarData?.eventDate : quote?.project?.projectDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">{quote?.project?.duration || 4} hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Event Type</p>
                    <p className="font-semibold capitalize">{isCalendarFlow ? calendarData?.eventType : quote?.project?.eventType || 'Party'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-semibold">{isCalendarFlow ? 'Customer' : quote?.contact?.name || 'Customer'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cruise Type Selection - NEW: Show both options */}
            {showBothOptions && (
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Cruise Experience</CardTitle>
                  <p className="text-sm text-gray-600">Select between a private charter or join our disco cruise experience</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setSelectedCruiseType('private')}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-left",
                        selectedCruiseType === 'private'
                          ? "border-blue-500 bg-blue-50 text-blue-900"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      data-testid="button-select-private-cruise"
                    >
                      <div className="flex items-center mb-2">
                        <Ship className="h-5 w-5 mr-2" />
                        <span className="font-semibold">Private Cruise</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Charter the boat exclusively for your group. Customize your experience with add-on packages.
                      </p>
                    </button>
                    
                    <button
                      onClick={() => setSelectedCruiseType('disco')}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-left",
                        selectedCruiseType === 'disco'
                          ? "border-purple-500 bg-purple-50 text-purple-900"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      data-testid="button-select-disco-cruise"
                    >
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-5 w-5 mr-2" />
                        <span className="font-semibold">Disco Cruise</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Join our DJ-powered disco experience. Perfect for bachelor/bachelorette parties.
                      </p>
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Private Cruise Options */}
            {showPrivateOptions && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ship className="h-5 w-5 mr-2" />
                    Private Cruise Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Capacity Selection Buttons */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Select Boat Capacity
                    </label>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {[14, 25, 30, 50, 75].map((capacity) => {
                        const boatInfo = getBoatForCapacity(capacity);
                        return (
                          <Button
                            key={capacity}
                            variant={groupSize === capacity ? "default" : "outline"}
                            className={cn(
                              "flex-col h-16 text-xs p-2",
                              groupSize === capacity ? "bg-blue-600 text-white" : "hover:bg-blue-50"
                            )}
                            onClick={() => {
                              setGroupSize(capacity);
                              setSelectedBoatId(boatInfo.id);
                            }}
                            data-testid={`button-capacity-${capacity}`}
                          >
                            <span className="font-bold">{capacity}</span>
                            <span className="text-[10px] leading-tight">{boatInfo.name}</span>
                          </Button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-500">
                      Selected: {getBoatForCapacity(groupSize).name} (fits {groupSize} people)
                    </p>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      <CalendarIcon className="h-4 w-4 inline mr-2" />
                      Select Event Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                          data-testid="button-date-picker"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date);
                            if (date) {
                              setEventDate(format(date, 'yyyy-MM-dd'));
                            }
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    {/* Boat & Pricing Details */}
                    {selectedDate && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Boat & Pricing Details</h4>
                        <div className="space-y-1 text-sm text-blue-800">
                          <p><strong>Boat:</strong> {getBoatForCapacity(groupSize).name}</p>
                          <p><strong>Capacity:</strong> {groupSize} people</p>
                          <p><strong>Date:</strong> {format(selectedDate, "PPPP")}</p>
                          <p><strong>Day Type:</strong> {getDayType(selectedDate)}</p>
                          <p><strong>Available Durations:</strong> {getAvailableDurations(selectedDate)}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Time Slot Selection (Calendar Flow Only) */}
                  {isCalendarFlow && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Clock className="h-4 w-4 inline mr-2" />
                        Available Time Slots
                      </label>
                      {slotsLoading ? (
                        <div className="flex items-center justify-center p-4 border rounded-lg">
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          <span className="text-sm text-gray-600">Loading available time slots...</span>
                        </div>
                      ) : availableSlots.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                          {availableSlots.map((slot, index) => (
                            <button
                              key={`${slot.boatId}-${slot.startTime}-${index}`}
                              onClick={() => {
                                setSelectedTimeSlot(`${slot.startTime}-${slot.endTime}`);
                                setSelectedBoat(slot.boatId);
                                setSelectedSlotId(slot.id || `${slot.boatId}_${slot.startTime}_${slot.endTime}`);
                              }}
                              className={cn(
                                "p-3 text-left border rounded-lg transition-all",
                                selectedTimeSlot === `${slot.startTime}-${slot.endTime}` && selectedBoat === slot.boatId
                                  ? "border-blue-500 bg-blue-50 text-blue-900"
                                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                              )}
                              data-testid={`button-select-timeslot-${slot.boatId}-${slot.startTime}`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium text-sm">
                                    {slot.startTime} - {slot.endTime}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {slot.boatName} (Fits {slot.capacity} people)
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">
                                    ${Math.round(slot.basePrice / 100)}/hr
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {slot.duration}h duration
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 border rounded-lg text-center text-gray-600">
                          <AlertCircle className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm">No available time slots for {eventDate}</p>
                          <p className="text-xs mt-1">Try a different date or group size</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Add-on Packages */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Additional Packages</label>
                    <div className="space-y-3">
                      {addOnPackages.map((pkg) => (
                        <div key={pkg.id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={`addon-${pkg.id}`}
                            checked={selectedAddOns.includes(pkg.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAddOns([...selectedAddOns, pkg.id]);
                              } else {
                                setSelectedAddOns(selectedAddOns.filter(id => id !== pkg.id));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <div className="flex-1">
                            <label htmlFor={`addon-${pkg.id}`} className="font-medium cursor-pointer">
                              {pkg.name} (+${pkg.hourlyRate}/hr)
                            </label>
                            <p className="text-sm text-gray-600">{pkg.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Disco Cruise Options */}
            {showDiscoOptions && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Disco Cruise Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Package Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Package Type</label>
                    <Select value={selectedDiscoPackage} onValueChange={setSelectedDiscoPackage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {discoPackages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>
                            {pkg.name} - {formatCurrency(pkg.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ticket Quantity */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Number of Tickets: {discoTicketQuantity}
                    </label>
                    <Slider
                      value={[discoTicketQuantity]}
                      onValueChange={(value) => setDiscoTicketQuantity(value[0])}
                      min={1}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 ticket</span>
                      <span>50 tickets</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Pricing & Payment */}
          <div className="space-y-6">
            {/* Private Cruise Pricing */}
            {showPrivateOptions && (
              <Card>
                <CardHeader>
                  <CardTitle>Private Cruise Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  {pricingLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : privatePricing ? (
                    <div className="space-y-4">
                      {/* Pricing Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Base Rate ({privatePricing.duration}h × ${privatePricing.hourlyRate}/hr):</span>
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
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>{formatCurrency(privatePricing.total)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Per Person:</span>
                          <span>{formatCurrency(privatePricing.perPersonCost)}</span>
                        </div>
                      </div>

                      {/* Discount Code Section */}
                      <div className="space-y-2">
                        <Label htmlFor="discountCode">Discount Code (Optional)</Label>
                        <Input
                          id="discountCode"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="Enter promo code"
                          data-testid="input-discount-code"
                        />
                        {discountCode && (
                          <p className="text-xs text-green-600">
                            💰 Discount code will be applied at checkout
                          </p>
                        )}
                      </div>

                      {/* Payment Buttons */}
                      <div className="space-y-3">
                        <Button
                          onClick={() => handlePayment('deposit', 'private')}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={isExpired}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Deposit ({formatCurrency(privatePricing.depositAmount)})
                        </Button>
                        <Button
                          onClick={() => handlePayment('full', 'private')}
                          variant="outline"
                          className="w-full"
                          disabled={isExpired}
                        >
                          Pay in Full ({formatCurrency(privatePricing.total)})
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">Loading pricing...</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Disco Cruise Pricing */}
            {showDiscoOptions && (
              <Card>
                <CardHeader>
                  <CardTitle>Disco Cruise Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  {pricingLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : discoPricing ? (
                    <div className="space-y-4">
                      {/* Pricing Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>{discoTicketQuantity} × {discoPackages.find(p => p.id === selectedDiscoPackage)?.name}:</span>
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
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>{formatCurrency(discoPricing.total)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Per Person:</span>
                          <span>{formatCurrency(discoPricing.perPersonCost)}</span>
                        </div>
                      </div>

                      {/* Discount Code Section */}
                      <div className="space-y-2">
                        <Label htmlFor="discountCodeDisco">Discount Code (Optional)</Label>
                        <Input
                          id="discountCodeDisco"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="Enter promo code"
                          data-testid="input-discount-code-disco"
                        />
                        {discountCode && (
                          <p className="text-xs text-green-600">
                            💰 Discount code will be applied at checkout
                          </p>
                        )}
                      </div>

                      {/* Payment Buttons */}
                      <div className="space-y-3">
                        <Button
                          onClick={() => handlePayment('deposit', 'disco')}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          disabled={isExpired}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Deposit ({formatCurrency(discoPricing.depositAmount)})
                        </Button>
                        <Button
                          onClick={() => handlePayment('full', 'disco')}
                          variant="outline"
                          className="w-full"
                          disabled={isExpired}
                        >
                          Pay in Full ({formatCurrency(discoPricing.total)})
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">Loading pricing...</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Send Quote Option */}
            <Card>
              <CardHeader>
                <CardTitle>Share This Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Want to review this later or share with others?
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link Copied!",
                      description: "Quote link has been copied to your clipboard.",
                    });
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Copy Quote Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}