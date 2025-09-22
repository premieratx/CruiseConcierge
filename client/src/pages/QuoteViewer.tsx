import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'wouter';
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

function QuoteViewerContent() {
  const { toast } = useToast();
  const [location] = useLocation();
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const { updateSelection, recomputePricing } = useBookingCache();
  
  // Parse URL parameters using URLSearchParams
  const searchParams = new URLSearchParams(window.location.search);
  
  // Parse URL parameters for both quote flow and calendar flow
  const quoteId = searchParams.get('id') || '';
  const token = searchParams.get('token') || '';
  const isQuoteFlow = !!(quoteId && token);
  
  // Parse calendar flow parameters
  const calendarDataParam = searchParams.get('data');
  const isCalendarFlow = !!calendarDataParam && !isQuoteFlow;
  
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
  
  // Initialize cruise type state before using it
  const [selectedCruiseType, setSelectedCruiseType] = useState<'private' | 'disco'>(
    (calendarData?.cruiseType as 'private' | 'disco') || 'private'
  );
  
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
          if (parsed.discoPackage) {
            setSelectedDiscoPackage(parsed.discoPackage);
          }
          if (parsed.discountCode) {
            setDiscountCode(parsed.discountCode);
          }
        } catch (e) {
          console.error('Failed to parse stored checkout info:', e);
        }
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
  const [selectedDiscoPackage, setSelectedDiscoPackage] = useState<string>('basic');
  const [discoTicketQuantity, setDiscoTicketQuantity] = useState<number>(10);
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
    if (calendarData?.eventDate) return new Date(calendarData.eventDate);
    // From quote flow
    if (quoteData?.project?.projectDate) return new Date(quoteData.project.projectDate);
    return eventDate ? new Date(eventDate) : null;
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
      
      // Update event type from quote
      if (quote.project.eventType) {
        setEventType(quote.project.eventType);
      }
      
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
    
    // Parse the selection to update timeSlot and duration
    const parts = value.split('_');
    if (parts.length >= 6) {
      const startTime = parts[parts.length - 2];
      const endTime = parts[parts.length - 1];
      setSelectedTimeSlot(`${startTime} - ${endTime}`);
      
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

  const handlePayment = async (paymentType: 'deposit' | 'full', cruiseType?: 'private' | 'disco') => {
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

    console.log('💳 handlePayment called with:', { paymentType, cruiseType: effectiveCruiseType });

    // For calendar flow, check if we have contact info
    let finalContactInfo = contactInfo;
    if (isCalendarFlow && !contactInfo.email) {
      // Use placeholder contact info for calendar flow to allow checkout
      finalContactInfo = {
        firstName: 'Guest',
        lastName: 'User',
        email: 'guest@premiercruises.com',
        phone: '512-555-0000'
      };
      setContactInfo(finalContactInfo);
    }

    try {
      console.log('💳 Creating checkout session...');
      
      // Prepare selectionPayload as required by the server
      const selectionPayload: any = {
        entryPoint: isCalendarFlow ? 'calendar_flow' : 'quote_flow',
        cruiseType: effectiveCruiseType,
        eventDate: isCalendarFlow ? eventDate : quote?.project?.projectDate,
        eventType: isCalendarFlow ? calendarData?.eventType : quote?.project?.eventType,
        groupSize: effectiveCruiseType === 'disco' ? discoTicketQuantity : groupSize,
        subtotal: pricing.subtotal,
        tax: pricing.tax,
        gratuity: pricing.gratuity,
        total: pricing.total,
        depositAmount: pricing.depositAmount || 0
      };

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
      } else {
        selectionPayload.discoPackage = selectedDiscoPackage;
        selectionPayload.ticketQuantity = discoTicketQuantity;
      }
      
      // Prepare checkout data with required fields
      const checkoutData = {
        paymentType,
        selectionPayload,
        customerEmail: finalContactInfo.email,
        metadata: {
          customerName: `${finalContactInfo.firstName} ${finalContactInfo.lastName}`,
          customerPhone: finalContactInfo.phone,
          quoteId: isQuoteFlow ? quoteId : undefined,
          token: isQuoteFlow ? token : undefined
        }
      };

      console.log('💳 Sending checkout data:', checkoutData);

      const response = await apiRequest('POST', '/api/checkout/create-session', checkoutData);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      }
    } catch (error: any) {
      console.error('💳 Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Loading state
  if (isQuoteFlow && isLoading) {
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
  if (isQuoteFlow && quoteError) {
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
  if (!isQuoteFlow && !isCalendarFlow) {
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
              {eventType === 'bachelor' ? '🤵 Bachelor Party' : 
               eventType === 'bachelorette' ? '👰 Bachelorette Party' : 
               eventType === 'wedding' ? '💒 Wedding' : 
               eventType === 'birthday' ? '🎂 Birthday' : 
               eventType === 'corporate' ? '💼 Corporate Event' : 
               '🎉 Party'}
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
                    const currentDate = new Date(eventDate || new Date());
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
                    {eventDate ? format(new Date(eventDate), 'EEEE, MMMM d, yyyy') : 'Select a date'}
                  </h2>
                  <p className="text-lg text-gray-600 mt-1">Select your preferred date and time below</p>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={() => {
                    const currentDate = new Date(eventDate || new Date());
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

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column: Selection Interface */}
            <div className="lg:col-span-2">
              {/* Weekly Availability Grid */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">Available Times This Week</CardTitle>
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
                                const slotDay = new Date(slot.dateISO || slot.date).getDay();
                                return slotDay === dayNum;
                              });
                              
                              const discoSlots = weeklyDiscoSlots.filter(slot => {
                                const slotDay = new Date(slot.dateISO || slot.date).getDay();
                                return slotDay === dayNum;
                              });
                              
                              if (privateSlots.length === 0 && discoSlots.length === 0) return null;
                              
                              // Determine if we should show disco options for this day
                              const showDisco = isBachelor && showDiscoOptions && (dayName === 'Friday' || dayName === 'Saturday') && discoSlots.length > 0;
                              const isWeekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(dayName);
                              const isWeekend = ['Friday', 'Saturday', 'Sunday'].includes(dayName);
                              
                              // Get the actual date for display
                              const firstSlot = privateSlots[0] || discoSlots[0];
                              const displayDate = firstSlot ? format(new Date(firstSlot.dateISO || firstSlot.date), 'MMMM d') : '';
                              
                              // Filter weekend slots based on business rules
                              const filteredPrivateSlots = (() => {
                                if (!isWeekend) return privateSlots;
                                
                                if (dayName === 'Friday') {
                                  // Friday: Show all 4-hour slots
                                  return privateSlots.filter(s => s.duration === 4);
                                } else if (dayName === 'Saturday' || dayName === 'Sunday') {
                                  // Saturday/Sunday: Show all 4-hour slots
                                  return privateSlots.filter(s => s.duration === 4);
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
              <Card className="sticky top-4">
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedOption ? (
                    <>
                      {/* Selected Cruise Details */}
                      <div className="space-y-1 pb-3 border-b">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{eventDate && format(new Date(eventDate), 'MMM d')}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Group:</span>
                          <span className="font-medium">{groupSize} ppl</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">
                            {selectedOption.includes('3hr') ? '3hr' : '4hr'}
                          </span>
                        </div>
                        {selectedOption.includes('disco') && (
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium text-purple-600">Disco</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Package Selection Dropdown */}
                      {showPackageDropdown && (
                        <div className="pb-3 border-b">
                          <Label className="text-xs text-gray-600">Select Package:</Label>
                          {selectedTimeSlotType === 'private' ? (
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
                                  <Label htmlFor="standard" className="cursor-pointer text-xs flex-1">
                                    <div className="flex justify-between">
                                      <span>Standard Cruise</span>
                                      <span className="text-gray-600">Base</span>
                                    </div>
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                                  <RadioGroupItem value="essentials" id="essentials" />
                                  <Label htmlFor="essentials" className="cursor-pointer text-xs flex-1">
                                    <div className="flex justify-between">
                                      <span>Essentials Package</span>
                                      <span className="text-green-600">+$200</span>
                                    </div>
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                                  <RadioGroupItem value="ultimate" id="ultimate" />
                                  <Label htmlFor="ultimate" className="cursor-pointer text-xs flex-1">
                                    <div className="flex justify-between">
                                      <span>Ultimate Package</span>
                                      <span className="text-blue-600">+$400</span>
                                    </div>
                                  </Label>
                                </div>
                              </div>
                            </RadioGroup>
                          ) : (
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
                                    <Label htmlFor="basic" className="cursor-pointer text-xs flex-1">
                                      <div className="flex justify-between">
                                        <span>Basic Package</span>
                                        <span className="text-purple-600">$85/person</span>
                                      </div>
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2 p-2 border rounded hover:bg-purple-50">
                                    <RadioGroupItem value="disco_queen" id="disco_queen" />
                                    <Label htmlFor="disco_queen" className="cursor-pointer text-xs flex-1">
                                      <div className="flex justify-between">
                                        <span>Disco Queen</span>
                                        <span className="text-purple-600">$95/person</span>
                                      </div>
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2 p-2 border rounded hover:bg-purple-50">
                                    <RadioGroupItem value="platinum" id="platinum" />
                                    <Label htmlFor="platinum" className="cursor-pointer text-xs flex-1">
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
                                <Label className="text-xs text-gray-600">Number of Tickets:</Label>
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
                                  <span className="text-sm font-medium w-12 text-center">{discoTicketQuantity}</span>
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
                          )}
                        </div>
                      )}

                      {/* Pricing Breakdown */}
                      {privatePricing && !selectedOption.includes('disco') && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Base:</span>
                            <span>${(privatePricing.subtotal / 100).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Tax:</span>
                            <span>${(privatePricing.tax / 100).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Gratuity:</span>
                            <span>${(privatePricing.gratuity / 100).toFixed(0)}</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-semibold text-sm">
                            <span>Total:</span>
                            <span>${(privatePricing.total / 100).toFixed(0)}</span>
                          </div>
                          {privatePricing.depositRequired && (
                            <div className="flex justify-between text-xs text-blue-600">
                              <span>Deposit:</span>
                              <span>${(privatePricing.depositAmount / 100).toFixed(0)}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Disco Pricing Breakdown */}
                      {discoPricing && selectedOption.includes('disco') && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Tickets:</span>
                            <span>{discoTicketQuantity} @ ${(discoPricing.subtotal / discoTicketQuantity / 100).toFixed(0)}/ea</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Subtotal:</span>
                            <span>${(discoPricing.subtotal / 100).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Tax:</span>
                            <span>${(discoPricing.tax / 100).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Gratuity:</span>
                            <span>${(discoPricing.gratuity / 100).toFixed(0)}</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-semibold text-sm">
                            <span>Total:</span>
                            <span>${(discoPricing.total / 100).toFixed(0)}</span>
                          </div>
                          {discoPricing.depositRequired && discoPricing.depositAmount && (
                            <div className="flex justify-between text-xs text-purple-600">
                              <span>Deposit (25%):</span>
                              <span>${(discoPricing.depositAmount / 100).toFixed(0)}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Payment Buttons */}
                      <div className="space-y-2 pt-2">
                        <Button
                          className="w-full h-9 text-sm"
                          onClick={() => handlePayment('deposit', selectedOption.includes('disco') ? 'disco' : 'private')}
                          data-testid="button-pay-deposit"
                        >
                          Pay Deposit
                          {privatePricing?.depositAmount && !selectedOption.includes('disco') && 
                            ` ($${(privatePricing.depositAmount / 100).toFixed(0)})`
                          }
                          {discoPricing?.depositAmount && selectedOption.includes('disco') && 
                            ` ($${(discoPricing.depositAmount / 100).toFixed(0)})`
                          }
                        </Button>
                        <Button
                          className="w-full h-9 text-sm"
                          variant="outline"
                          onClick={() => handlePayment('full', selectedOption.includes('disco') ? 'disco' : 'private')}
                          data-testid="button-pay-full"
                        >
                          Pay in Full
                          {privatePricing?.total && !selectedOption.includes('disco') && 
                            ` ($${(privatePricing.total / 100).toFixed(0)})`
                          }
                          {discoPricing?.total && selectedOption.includes('disco') && 
                            ` ($${(discoPricing.total / 100).toFixed(0)})`
                          }
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIconLucide className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Select a time slot to see pricing</p>
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

// Wrap the component with BookingCacheProvider
export default function QuoteViewer() {
  return (
    <BookingCacheProvider>
      <QuoteViewerContent />
    </BookingCacheProvider>
  );
}