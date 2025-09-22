import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Ship, Calendar, Clock, MapPin, Phone, Mail, FileText,
  Download, Printer, CheckCircle, AlertCircle, Loader2,
  Users, Plus, Minus, Edit2, Save, CreditCard, ChevronRight, Sparkles
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
  const [groupSize, setGroupSize] = useState(calendarData?.groupSize || 20);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(calendarData?.selectedAddOns || []);
  const [selectedDiscoPackage, setSelectedDiscoPackage] = useState<string>(calendarData?.discoPackage || 'basic');
  const [discoTicketQuantity, setDiscoTicketQuantity] = useState(calendarData?.discoTicketQuantity || calendarData?.groupSize || 10);
  const [privatePricing, setPrivatePricing] = useState<any>(null);
  const [discoPricing, setDiscoPricing] = useState<any>(null);
  const [pricingLoading, setPricingLoading] = useState(false);
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

  // Fetch private cruise pricing (works for both quote and calendar flow)
  const fetchPrivatePricing = useCallback(async () => {
    setPricingLoading(true);
    try {
      let pricingRequest;
      
      if (isCalendarFlow) {
        // Calendar flow: use calendar data for pricing
        const hourlyRate = 200 + selectedAddOns.reduce((sum, addOnId) => {
          const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
          return sum + (addOn?.hourlyRate || 0);
        }, 0);
        
        pricingRequest = {
          groupSize,
          eventDate: eventDate,
          timeSlot: selectedTimeSlot,
          cruiseType: 'private',
          eventType: calendarData?.eventType || 'other',
          promoCode: discountCode,
          packageType: addOnsKey,
          hourlyRate,
          boatId: selectedBoat,
          slotId: selectedSlotId
        };
        
        const res = await apiRequest('POST', '/api/pricing/cruise', pricingRequest);
        if (res.ok) {
          const pricing = await res.json();
          setPrivatePricing(pricing);
        }
      } else {
        // Quote flow: use quote project data
        if (!quote?.project) return;
        
        const timeSlot = getTimeSlotFromQuote(quote);
        const hourlyRate = 200 + selectedAddOns.reduce((sum, addOnId) => {
          const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
          return sum + (addOn?.hourlyRate || 0);
        }, 0);

        const res = await apiRequest('POST', '/api/pricing/cruise', {
          groupSize,
          eventDate: quote.project.projectDate,
          timeSlot,
          eventType: quote.project.eventType,
          cruiseType: 'private',
          packageType: selectedAddOns.join(','),
          hourlyRate,
          promoCode: discountCode
        });
        
        if (res.ok) {
          const pricing = await res.json();
          setPrivatePricing(pricing);
        }
      }
    } catch (error) {
      console.error('Failed to fetch private pricing:', error);
    } finally {
      setPricingLoading(false);
    }
  }, [isCalendarFlow, calendarData, selectedAddOns, groupSize, quote, discountCode]);

  // Fetch disco cruise pricing (works for both quote and calendar flow)
  const fetchDiscoPricing = useCallback(async () => {
    setPricingLoading(true);
    try {
      if (isCalendarFlow) {
        // Calendar flow: use calendar data for disco pricing
        const pricingRequest = {
          groupSize: discoTicketQuantity,
          eventDate: eventDate,
          timeSlot: selectedTimeSlot,
          cruiseType: 'disco',
          eventType: calendarData?.eventType || 'bachelor',
          packageType: selectedDiscoPackage,
          promoCode: discountCode,
          slotId: selectedSlotId
        };
        
        const res = await apiRequest('POST', '/api/pricing/cruise', pricingRequest);
        if (res.ok) {
          const pricing = await res.json();
          setDiscoPricing(pricing);
        }
      } else {
        // Quote flow: use quote project data
        if (!quote?.project) return;
        
        const packagePrice = discoPackages.find(pkg => pkg.id === selectedDiscoPackage)?.price || 8500;
        
        const res = await apiRequest('POST', '/api/pricing/preview', {
          items: [{
            productId: `disco_${selectedDiscoPackage}`,
            qty: discoTicketQuantity,
            unitPrice: packagePrice
          }],
          groupSize: discoTicketQuantity,
          projectDate: quote.project.projectDate,
          promoCode: discountCode
        });
        
        if (res.ok) {
          const pricing = await res.json();
          setDiscoPricing(pricing);
        }
      }
    } catch (error) {
      console.error('Failed to fetch disco pricing:', error);
    } finally {
      setPricingLoading(false);
    }
  }, [isCalendarFlow, calendarData, selectedDiscoPackage, discoTicketQuantity, quote, discountCode]);

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

  // Debounced private pricing refresh
  useEffect(() => {
    if (isCalendarFlow && selectedCruiseType === 'private') {
      const timer = setTimeout(() => {
        fetchPrivatePricing();
      }, 250);
      return () => clearTimeout(timer);
    } else if (!isCalendarFlow && quote && isPrivateCruise(quote)) {
      fetchPrivatePricing();
    }
  }, [quote, groupSize, addOnsKey, isCalendarFlow, selectedCruiseType, discountCode, selectedTimeSlot, selectedBoat, selectedSlotId, eventDate, fetchPrivatePricing]);

  // Debounced disco pricing refresh  
  useEffect(() => {
    if (isCalendarFlow && selectedCruiseType === 'disco') {
      const timer = setTimeout(() => {
        fetchDiscoPricing();
      }, 250);
      return () => clearTimeout(timer);
    } else if (!isCalendarFlow && quote && isDiscoCruise(quote)) {
      fetchDiscoPricing();
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
                  {/* Group Size */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Group Size: {groupSize} people
                    </label>
                    <Slider
                      value={[groupSize]}
                      onValueChange={(value) => setGroupSize(value[0])}
                      min={8}
                      max={75}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>8 people</span>
                      <span>75 people</span>
                    </div>
                  </div>

                  {/* Event Date Selection (Calendar Flow Only) */}
                  {isCalendarFlow && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        Event Date
                      </label>
                      <Input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        className="w-full"
                        data-testid="input-event-date"
                      />
                    </div>
                  )}

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