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

// Time parsing utility to handle both "10:30-14:30" and "10:30 AM - 2:30 PM" formats
const parseTimeSlot = (timeSlot: string) => {
  if (!timeSlot) return { startTime: '', endTime: '' };
  
  // Handle "HH:MM-HH:MM" format (24-hour)
  if (timeSlot.includes('-') && !timeSlot.includes('AM') && !timeSlot.includes('PM')) {
    const [start, end] = timeSlot.split('-');
    return { startTime: start.trim(), endTime: end.trim() };
  }
  
  // Handle "hh:mm AM - hh:mm PM" format
  if (timeSlot.includes('AM') || timeSlot.includes('PM')) {
    const [startPart, endPart] = timeSlot.split(' - ');
    const startTime = convertTo24Hour(startPart.trim());
    const endTime = convertTo24Hour(endPart.trim());
    return { startTime, endTime };
  }
  
  return { startTime: '', endTime: '' };
};

const convertTo24Hour = (time12: string): string => {
  const [time, modifier] = time12.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '00';
  if (modifier === 'PM') hours = String(parseInt(hours) + 12);
  return `${hours.padStart(2, '0')}:${minutes}`;
};

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

  // Capacity options for 17hats-style filtering
  const capacityOptions = [14, 25, 30, 50, 75];

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
  const [weeklySlots, setWeeklySlots] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [capacityFilter, setCapacityFilter] = useState<number>(isCalendarFlow ? calendarData?.groupSize || 20 : 20);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(calendarData?.selectedTimeSlot || '');
  const [selectedBoat, setSelectedBoat] = useState<string>(calendarData?.boatId || '');
  const [selectedSlotId, setSelectedSlotId] = useState<string>(calendarData?.slotId || '');
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
        date: isCalendarFlow ? (eventDate ? new Date(eventDate).toISOString().split('T')[0] : '') : quote?.project?.projectDate?.split('T')[0],
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
        date: isCalendarFlow ? (eventDate ? new Date(eventDate).toISOString().split('T')[0] : '') : quote?.project?.projectDate?.split('T')[0],
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
      
      console.log('🗓️ Fetching weekly availability for:', {
        date: targetDate,
        groupSize: capacityFilter,
        eventType: eventTypeParam
      });
      
      const response = await apiRequest('GET', `/api/availability/weekly?date=${targetDate}&groupSize=${capacityFilter}&eventType=${eventTypeParam}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Weekly availability loaded:', data.totalSlots, 'slots');
        setWeeklySlots(data.slots || []);
      } else {
        console.error('❌ Failed to fetch weekly availability');
        setWeeklySlots([]);
      }
    } catch (error) {
      console.error('Weekly availability error:', error);
      setWeeklySlots([]);
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
  }, [fetchWeeklyAvailability, isCalendarFlow]);
  
  // Handle capacity filter changes
  const handleCapacityChange = useCallback((newCapacity: number) => {
    setCapacityFilter(newCapacity);
    setGroupSize(newCapacity);
    // Reset selection when capacity changes
    setSelectedOption('');
    setSelectedTimeSlot('');
    setSelectedBoat('');
    setSelectedSlotId('');
  }, []);
  
  // Handle cruise option selection (17hats-style radio buttons)
  const handleOptionSelect = useCallback((option: any) => {
    setSelectedOption(option.id);
    setSelectedTimeSlot(`${option.startTime}-${option.endTime}`);
    setSelectedBoat(option.boatId);
    setSelectedSlotId(option.id);
    
    if (option.cruiseType === 'private') {
      setSelectedCruiseType('private');
    } else if (option.cruiseType === 'disco') {
      setSelectedCruiseType('disco');
    }
  }, []);

  // ⚡ INSTANT private pricing refresh (no debouncing needed!) - FIXED: Direct dependencies
  useEffect(() => {
    if (isCalendarFlow && selectedCruiseType === 'private') {
      fetchPrivatePricing(); // Instant calculation
    } else if (!isCalendarFlow && quote && isPrivateCruise(quote)) {
      fetchPrivatePricing(); // Instant calculation
    }
  }, [quote, groupSize, addOnsKey, isCalendarFlow, selectedCruiseType, discountCode, selectedTimeSlot, selectedBoat, selectedSlotId, eventDate]);

  // ⚡ INSTANT disco pricing refresh (no debouncing needed!) - FIXED: Direct dependencies
  useEffect(() => {
    if (isCalendarFlow && selectedCruiseType === 'disco') {
      fetchDiscoPricing(); // Instant calculation
    } else if (!isCalendarFlow && quote && isDiscoCruise(quote)) {
      fetchDiscoPricing(); // Instant calculation
    }
  }, [quote, selectedDiscoPackage, discoTicketQuantity, isCalendarFlow, selectedCruiseType, discountCode, selectedTimeSlot, selectedSlotId, eventDate]);

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
      // Build selectedSlot object with proper startTime/endTime for server validation
      const timeSlotStr = selectedTimeSlot || calendarData?.selectedTimeSlot || '';
      const { startTime, endTime } = parseTimeSlot(timeSlotStr);
      const selectedSlot = {
        slotId: selectedSlotId || calendarData?.slotId || '',
        boatId: selectedBoatId || calendarData?.boatId || '',
        dateISO: eventDate || calendarData?.eventDate || '',
        startTime,
        endTime,
        durationHours: 4, // Most common duration, server will validate
        cruiseType
      };

      const selectionPayload = isCalendarFlow ? {
        // Calendar flow data
        entryPoint: 'calendar_flow',
        paymentType,
        cruiseType,
        eventType: calendarData?.eventType || 'other',
        groupSize: cruiseType === 'disco' ? discoTicketQuantity : groupSize,
        eventDate: eventDate || calendarData?.eventDate,
        selectedTimeSlot: timeSlotStr,
        selectedSlot, // ✅ CRITICAL: Full slot object with startTime/endTime
        slotId: selectedSlotId || calendarData?.slotId,
        boatId: selectedBoatId || calendarData?.boatId,
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
  const getTimeSlotFromQuote = (quote: QuoteWithDetails | null | undefined) => {
    if (!quote) return 'default-slot';
    // Extract time slot from quote data
    const timeSection = quote.radioSections?.find(s => 
      s.title?.toLowerCase().includes('time') && s.selectedValue
    );
    return timeSection?.selectedValue || 'default-slot';
  };

  const isPrivateCruise = (quote: QuoteWithDetails | null | undefined) => {
    if (!quote || !quote.items) return false;
    return quote.items.some(item => 
      item.type === 'private_cruise' || 
      item.type === 'cruise' ||
      !item.name?.toLowerCase().includes('disco')
    );
  };

  const isDiscoCruise = (quote: QuoteWithDetails | null | undefined) => {
    if (!quote) return false;
    return quote.project?.eventType === 'bachelor' || 
           quote.project?.eventType === 'bachelorette' ||
           quote.items?.some(item => 
             item.name?.toLowerCase().includes('disco') ||
             item.productId?.includes('disco')
           ) || false;
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
        {/* TEMPORARY PLACEHOLDER - 17HATS INTERFACE COMING */}
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>17hats-Style Interface Under Construction</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The new 17hats-style interface is being implemented...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
