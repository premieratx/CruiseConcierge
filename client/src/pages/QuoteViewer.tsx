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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { useBookingCache } from '@/contexts/BookingCacheContext';
import { 
  Ship, Clock, MapPin, Phone, Mail, FileText,
  Download, Printer, CheckCircle, AlertCircle, Loader2,
  Users, Plus, Minus, Edit2, Save, CreditCard, ChevronRight, Sparkles, CalendarIcon,
  Calendar as CalendarIconLucide
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
  // Calendar flow is when we have eventDate param (from calendar) or explicit entryPoint
  const isCalendarFlow = urlParams.has('eventDate') || entryPoint === 'calendar_flow';
  const isQuoteFlow = !!quoteId && !!token;
  
  // Extract calendar flow parameters (including disco-specific ones)
  const calendarData = (isCalendarFlow || urlParams.has('eventDate')) ? {
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
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  
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
  const [isLoadingWeekly, setIsLoadingWeekly] = useState(false);
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
  
  // Handle cruise option selection (17hats-style radio buttons and dropdowns)
  const handleOptionSelect = useCallback((optionOrId: any) => {
    // Handle both object format (from old radio buttons) and string ID format (from new dropdowns)
    if (typeof optionOrId === 'string') {
      // New dropdown format - parse the ID and find the slot
      const slotId = optionOrId;
      setSelectedOption(slotId);
      
      // Find the actual slot from weeklySlots
      const slot = weeklySlots.find(s => {
        const boatName = s.boatCandidates?.[0] || s.boat || 'boat_unknown';
        const slotType = s.cruiseType || s.type || 'private';
        const slotDate = s.dateISO || s.date;
        
        // Check all possible ID formats
        const possibleIds = [
          `3hr_Monday_${slotType}_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`,
          `3hr_Tuesday_${slotType}_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`,
          `3hr_Wednesday_${slotType}_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`,
          `3hr_Thursday_${slotType}_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`,
          `4hr_Monday_${slotType}_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`,
          `4hr_Tuesday_${slotType}_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`,
          `4hr_Wednesday_${slotType}_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`,
          `4hr_Thursday_${slotType}_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`,
          `weekend_Friday_${slotType}_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`,
          `weekend_Saturday_${slotType}_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`,
          `weekend_Sunday_${slotType}_${boatName}_${slotDate}_${s.startTime}_${s.endTime}`,
        ];
        
        return possibleIds.includes(slotId);
      });
      
      if (slot) {
        const boatId = slot.boatCandidates?.[0] || slot.boat || '';
        const timeSlot = `${slot.startTime} - ${slot.endTime}`;
        
        setSelectedTimeSlot(timeSlot);
        setSelectedBoat(boatId);
        setSelectedBoatId(boatId); // Fix: Also set selectedBoatId
        setSelectedSlotId(slot.id || slotId);
        
        const cruiseType = slot.cruiseType || slot.type || 'private';
        if (cruiseType === 'private') {
          setSelectedCruiseType('private');
        } else if (cruiseType === 'disco') {
          setSelectedCruiseType('disco');
        }
        
        // Update booking cache to trigger pricing recalculation
        // IMPORTANT: Use the actual time slot from the slot object
        const correctTimeSlot = slot.timeSlot || slot.time || timeSlot;
        updateSelection({
          timeSlot: correctTimeSlot, // Use the correct time slot
          selectedBoat: boatId,
          selectedBoatId: boatId,
          boatId: boatId,
          slotId: slot.id || slotId,
          date: slot.dateISO || slot.date || eventDate
        });
      }
    } else {
      // Old object format
      const option = optionOrId;
      const timeSlot = `${option.startTime} - ${option.endTime}`;
      
      setSelectedOption(option.id);
      setSelectedTimeSlot(timeSlot);
      setSelectedBoat(option.boatId);
      setSelectedBoatId(option.boatId); // Fix: Also set selectedBoatId
      setSelectedSlotId(option.id);
      
      if (option.cruiseType === 'private') {
        setSelectedCruiseType('private');
      } else if (option.cruiseType === 'disco') {
        setSelectedCruiseType('disco');
      }
      
      // Update booking cache to trigger pricing recalculation
      // IMPORTANT: Use the actual time slot from the option object
      const correctTimeSlot = option.timeSlot || option.time || option.label || timeSlot;
      updateSelection({
        timeSlot: correctTimeSlot, // Use the correct time slot
        selectedBoat: option.boatId,
        selectedBoatId: option.boatId,
        boatId: option.boatId,
        slotId: option.id,
        date: option.date || eventDate
      });
    }
  }, [weeklySlots, updateSelection]);

  // ⚡ INSTANT private pricing refresh (no debouncing needed!) - FIXED: Direct dependencies
  useEffect(() => {
    if (isCalendarFlow && selectedCruiseType === 'private') {
      // Always fetch pricing when dependencies change, including when selectedTimeSlot changes
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

    setIsPaymentLoading(true);
    try {
      const amount = paymentType === 'deposit' ? pricing.depositAmount : pricing.total;
      
      // Build selection payload for both entry points
      // Build selectedSlot object with proper startTime/endTime for server validation
      const timeSlotStr = selectedTimeSlot || calendarData?.selectedTimeSlot || '';
      const { startTime, endTime } = parseTimeSlot(timeSlotStr);
      // Calculate duration from startTime and endTime
      const calculateDuration = (start: string, end: string): number => {
        const [startHour, startMin] = start.split(':').map(Number);
        const [endHour, endMin] = end.split(':').map(Number);
        return ((endHour * 60 + endMin) - (startHour * 60 + startMin)) / 60;
      };
      
      const durationHours = startTime && endTime ? calculateDuration(startTime, endTime) : 4;
      
      const selectedSlot = {
        slotId: selectedSlotId || calendarData?.slotId || '',
        boatId: selectedBoatId || calendarData?.boatId || '',
        dateISO: eventDate || calendarData?.eventDate || '',
        startTime,
        endTime,
        durationHours, // Fix: Calculate actual duration instead of hardcoding
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
    } finally {
      setIsPaymentLoading(false);
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
        {/* 17HATS-STYLE WEEKLY INTERFACE */}
        <div className="space-y-6">
          {/* Title and Status */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Book Your Cruise</h1>
              <p className="text-gray-600 mt-1">Select your preferred date and time below</p>
            </div>
            {quote && (
              <Badge variant={isExpired ? "destructive" : "secondary"} className="mt-2">
                {isExpired ? 'EXPIRED' : 'Active Quote'}
              </Badge>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column: Selection Interface */}
            <div className="lg:col-span-2 space-y-6">
              {/* Capacity Filter Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Group Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {capacityOptions.map((capacity) => (
                      <Button
                        key={capacity}
                        variant={capacityFilter === capacity ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCapacityChange(capacity)}
                        data-testid={`button-capacity-${capacity}`}
                      >
                        {capacity === 14 ? '≤14' : capacity === 75 ? '51-75' : `≤${capacity}`} People
                      </Button>
                    ))}
                    <Button
                      variant={capacityFilter === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCapacityChange(null)}
                      data-testid="button-capacity-all"
                    >
                      All Sizes
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Current group size: {groupSize} people
                  </p>
                </CardContent>
              </Card>

              {/* Weekly Availability Grid */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Available Times This Week</CardTitle>
                  <p className="text-sm text-gray-600">
                    {eventDate ? format(new Date(eventDate), 'MMMM d-') : ''}{eventDate ? format(addDays(new Date(eventDate), 6), 'd, yyyy') : ''}
                  </p>
                </CardHeader>
                <CardContent>
                  {isLoadingWeekly ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                  ) : weeklySlots.length > 0 ? (
                    <div className="space-y-3">
                      {/* Group slots by day */}
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, dayIndex) => {
                        const daySlots = weeklySlots.filter(slot => {
                          const slotDay = new Date(slot.dateISO || slot.date).getDay();
                          const mappedDay = slotDay === 0 ? 6 : slotDay - 1; // Convert Sunday=0 to Sunday=6
                          return mappedDay === dayIndex;
                        });

                        if (daySlots.length === 0) return null;

                        // Group slots by duration for Mon-Thu
                        const isWeekday = dayIndex <= 3; // Monday(0) through Thursday(3)
                        const threeHourSlots = isWeekday ? daySlots.filter(s => s.duration === 3) : [];
                        const fourHourSlots = isWeekday ? daySlots.filter(s => s.duration === 4) : [];
                        const weekendSlots = !isWeekday ? daySlots : [];

                        return (
                          <div key={day} className="border rounded-lg p-3 bg-gray-50">
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                              {day}, {format(addDays(new Date(eventDate), dayIndex), 'MMM d')}
                            </h3>
                            
                            {isWeekday ? (
                              // Monday-Thursday: Show dropdowns
                              <div className="flex gap-2 items-center">
                                {threeHourSlots.length > 0 && (
                                  <div className="flex-1">
                                    <Select
                                      value={selectedOption?.startsWith(`3hr_${day}_`) ? selectedOption : undefined}
                                      onValueChange={handleOptionSelect}
                                    >
                                      <SelectTrigger className="w-full h-9 text-sm" data-testid={`dropdown-3hr-${day}`}>
                                        <SelectValue placeholder="3-hour cruise" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {threeHourSlots.map((slot) => {
                                          const boatName = slot.boatCandidates?.[0] || slot.boat || 'boat_unknown';
                                          const slotType = slot.cruiseType || slot.type || 'private';
                                          const slotDate = slot.dateISO || slot.date;
                                          const slotId = `3hr_${day}_${slotType}_${boatName}_${slotDate}_${slot.startTime}_${slot.endTime}`;
                                          
                                          // Get hourly rate based on boat capacity tier for Mon-Thu
                                          const getHourlyRate = () => {
                                            if (boatName.includes('day_tripper')) return 200;
                                            if (boatName.includes('me_seeks')) return 225;
                                            if (boatName.includes('clever_girl')) return 250;
                                            return 225; // Default
                                          };
                                          
                                          return (
                                            <SelectItem key={slotId} value={slotId} data-testid={`option-${slotId}`}>
                                              <div className="flex justify-between items-center w-full">
                                                <span>{slot.startTime} - {slot.endTime}</span>
                                                <span className="ml-2 text-xs text-gray-500">${getHourlyRate()}/hr</span>
                                              </div>
                                            </SelectItem>
                                          );
                                        })}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                )}
                                
                                {fourHourSlots.length > 0 && (
                                  <div className="flex-1">
                                    <Select
                                      value={selectedOption?.startsWith(`4hr_${day}_`) ? selectedOption : undefined}
                                      onValueChange={handleOptionSelect}
                                    >
                                      <SelectTrigger className="w-full h-9 text-sm" data-testid={`dropdown-4hr-${day}`}>
                                        <SelectValue placeholder="4-hour cruise" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {fourHourSlots.map((slot) => {
                                          const boatName = slot.boatCandidates?.[0] || slot.boat || 'boat_unknown';
                                          const slotType = slot.cruiseType || slot.type || 'private';
                                          const slotDate = slot.dateISO || slot.date;
                                          const slotId = `4hr_${day}_${slotType}_${boatName}_${slotDate}_${slot.startTime}_${slot.endTime}`;
                                          
                                          // Get hourly rate based on boat capacity tier for Mon-Thu
                                          const getHourlyRate = () => {
                                            if (boatName.includes('day_tripper')) return 200;
                                            if (boatName.includes('me_seeks')) return 225;
                                            if (boatName.includes('clever_girl')) return 250;
                                            return 225; // Default
                                          };
                                          
                                          return (
                                            <SelectItem key={slotId} value={slotId} data-testid={`option-${slotId}`}>
                                              <div className="flex justify-between items-center w-full">
                                                <span>{slot.startTime} - {slot.endTime}</span>
                                                <span className="ml-2 text-xs text-gray-500">${getHourlyRate()}/hr</span>
                                              </div>
                                            </SelectItem>
                                          );
                                        })}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                )}
                              </div>
                            ) : (
                              // Friday-Sunday: Show individual slots
                              <RadioGroup value={selectedOption} onValueChange={handleOptionSelect}>
                                <div className="flex gap-2">
                                  {weekendSlots.map((slot) => {
                                    const boatName = slot.boatCandidates?.[0] || slot.boat || 'boat_unknown';
                                    const slotType = slot.cruiseType || slot.type || 'private';
                                    const slotDate = slot.dateISO || slot.date;
                                    const slotId = `weekend_${day}_${slotType}_${boatName}_${slotDate}_${slot.startTime}_${slot.endTime}`;
                                    const isSelected = selectedOption === slotId;
                                    
                                    // Get hourly rate based on boat and day for weekends
                                    const getWeekendHourlyRate = () => {
                                      if (dayIndex === 4) { // Friday
                                        if (boatName.includes('day_tripper')) return 225;
                                        if (boatName.includes('me_seeks')) return 250;
                                        if (boatName.includes('clever_girl')) return 275;
                                      } else { // Saturday/Sunday
                                        if (boatName.includes('day_tripper')) return 350;
                                        if (boatName.includes('me_seeks')) return 375;
                                        if (boatName.includes('clever_girl')) return 400;
                                      }
                                      return 250; // Default
                                    };
                                    
                                    return (
                                      <div key={slotId} className={`flex-1 flex items-center space-x-2 p-2 border rounded hover:bg-white ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}>
                                        <RadioGroupItem value={slotId} id={slotId} data-testid={`radio-slot-${slotId}`} />
                                        <Label htmlFor={slotId} className="flex-1 cursor-pointer text-sm">
                                          <div className="flex justify-between items-center">
                                            <span>{slot.startTime} - {slot.endTime}</span>
                                            <span className="text-xs text-gray-600">${getWeekendHourlyRate()}/hr</span>
                                          </div>
                                        </Label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </RadioGroup>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CalendarIconLucide className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No available slots this week</p>
                      <p className="text-sm text-gray-500 mt-1">Try adjusting your group size or selecting a different week</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Pricing Summary & Payment */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedOption ? (
                    <>
                      {/* Selected Cruise Details */}
                      <div className="space-y-2 pb-4 border-b">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{eventDate && format(new Date(eventDate), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Group Size:</span>
                          <span className="font-medium">{groupSize} people</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">
                            {(() => {
                              // Calculate duration directly from selected time slot
                              if (selectedTimeSlot) {
                                const [start, end] = selectedTimeSlot.split('-').map(t => t.trim());
                                if (start && end) {
                                  const [startHour, startMin] = start.split(':').map(Number);
                                  const [endHour, endMin] = end.split(':').map(Number);
                                  const duration = ((endHour * 60 + endMin) - (startHour * 60 + startMin)) / 60;
                                  if (duration > 0) return `${duration} hours`;
                                }
                              }
                              return `${currentPricing?.duration || privatePricing?.duration || 4} hours`;
                            })()}
                          </span>
                        </div>
                      </div>

                      {/* Pricing Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal:</span>
                          <span>{formatCurrency(currentPricing?.subtotal || privatePricing?.subtotal || 0)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax (8.25%):</span>
                          <span>{formatCurrency(currentPricing?.tax || privatePricing?.tax || 0)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Gratuity (20%):</span>
                          <span>{formatCurrency(currentPricing?.gratuity || privatePricing?.gratuity || 0)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                          <span>Total:</span>
                          <span>{formatCurrency(currentPricing?.total || privatePricing?.total || 0)}</span>
                        </div>
                      </div>

                      {/* Payment Buttons */}
                      <div className="space-y-3 pt-4">
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          size="lg"
                          onClick={() => handlePayment('deposit', 'private')}
                          disabled={isPaymentLoading}
                          data-testid="button-pay-deposit"
                        >
                          {isPaymentLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <CreditCard className="h-4 w-4 mr-2" />
                          )}
                          Pay Deposit ({formatCurrency(privatePricing?.depositAmount || 0)})
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          size="lg"
                          onClick={() => handlePayment('full', 'private')}
                          disabled={isPaymentLoading}
                          data-testid="button-pay-full"
                        >
                          Pay in Full ({formatCurrency(privatePricing?.total || 0)})
                        </Button>
                      </div>

                      {/* Deposit Info */}
                      {privatePricing?.depositRequired && (
                        <div className="text-xs text-gray-500 text-center pt-2">
                          {privatePricing.depositPercent}% deposit required • Balance due at boarding
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">Select a time slot to see pricing</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
