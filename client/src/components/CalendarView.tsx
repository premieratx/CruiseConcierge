import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useSSEAutoConnect } from "@/hooks/use-sse";
import { useRealtimeAvailability } from "@/hooks/useRealtimeAvailability";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Ship, Anchor, Users, Plus, Minus, AlertCircle, Wifi, WifiOff, Activity, RefreshCw, UserPlus, Block, X, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import type { Boat, Booking, DiscoSlot, Timeframe, Product, NormalizedSlot } from "@shared/schema";
import { useAvailabilityForDate, formatDateForAvailability } from "@/hooks/use-availability";
import { format, startOfWeek, addWeeks, subWeeks, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate, formatDateTime, formatTimeForDisplay, formatTimeRange, formatCustomerName, formatPhoneNumber } from '@shared/formatters';
import { BOOKING_STATUSES, PAYMENT_STATUSES, STATUS_COLORS, PRIVATE_CRUISE_PACKAGES, BOATS } from '@shared/constants';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { BookingsTable } from "@/components/BookingsTable";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface TimeBlock {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  boatId: string;
  boatName: string;
  status: 'available' | 'booked' | 'blocked';
  booking?: Booking;
  capacity?: number;
  bookedCount?: number;
  availableCount?: number;
  pricing?: {
    standardPrice: number;
    essentialsPrice: number;
    ultimatePrice: number;
    perPersonEstimate: number;
    dayType: string;
    packagePreviews: Array<{
      name: string;
      price: number;
      popular?: boolean;
    }>;
  };
}

interface DiscoSlotCard {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  ticketsSold: number;
  ticketCap: number;
  status: 'available' | 'soldout' | 'canceled';
}

// Use shared formatTimeForDisplay from formatters
const formatTime = formatTimeForDisplay;

// Boat color mapping system - EXACTLY matching Quote Builder
const getBoatColor = (boatName: string): string => {
  const name = boatName.toLowerCase();
  if (name.includes('day tripper')) return 'purple';
  if (name.includes('me seek') || name.includes('the irony') || name.includes('me seeks the irony')) return 'red';
  if (name.includes('clever girl')) return 'orange';
  if (name.includes('atx disco')) return 'yellow';
  return 'gray';
};

// Tab color mapping
const TAB_COLORS = {
  all: 'gray',
  dayTripper: 'purple',
  medium: 'red',
  large: 'orange',
  disco: 'yellow'
};

// Color utility functions
const getColorClasses = (color: string, variant: 'tab' | 'card' | 'disco') => {
  if (variant === 'tab') {
    switch (color) {
      case 'purple':
        return 'data-[state=active]:bg-purple-100 data-[state=active]:border-purple-500 data-[state=active]:text-purple-700 hover:bg-purple-50';
      case 'red':
        return 'data-[state=active]:bg-red-100 data-[state=active]:border-red-500 data-[state=active]:text-red-700 hover:bg-red-50';
      case 'orange':
        return 'data-[state=active]:bg-orange-100 data-[state=active]:border-orange-500 data-[state=active]:text-orange-700 hover:bg-orange-50';
      case 'blue':
        return 'data-[state=active]:bg-blue-100 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 hover:bg-blue-50';
      case 'yellow':
        return 'data-[state=active]:bg-yellow-100 data-[state=active]:border-yellow-500 data-[state=active]:text-yellow-700 hover:bg-yellow-50';
      default:
        return '';
    }
  } else if (variant === 'card') {
    switch (color) {
      case 'purple':
        return 'border-l-4 border-l-purple-500';
      case 'red':
        return 'border-l-4 border-l-red-500';
      case 'orange':
        return 'border-l-4 border-l-orange-500';
      case 'blue':
        return 'border-l-4 border-l-blue-500';
      default:
        return 'border-l-4 border-l-gray-400';
    }
  } else if (variant === 'disco') {
    return 'bg-yellow-50 border-yellow-400 hover:bg-yellow-100';
  }
  return '';
};

const getBoatTextColor = (boatName: string): string => {
  const color = getBoatColor(boatName);
  switch (color) {
    case 'purple': return 'text-purple-700';
    case 'red': return 'text-red-700';
    case 'orange': return 'text-orange-700';
    case 'blue': return 'text-blue-700';
    default: return 'text-gray-700';
  }
};

// REMOVED: All custom conflict detection and pricing logic
// Now using centralized availability system from Quote Builder
// which already includes booking conflicts, pricing, and availability status

// Convert NormalizedSlot to TimeBlock for backward compatibility with existing UI
const normalizedSlotToTimeBlock = (slot: NormalizedSlot): TimeBlock => {
  return {
    id: slot.id,
    date: new Date(slot.dateISO),
    startTime: slot.startTime,
    endTime: slot.endTime,
    boatId: slot.boatId,
    boatName: slot.boatDisplayName || slot.boatName,
    status: slot.bookable && !slot.held ? 'available' : (slot.held ? 'blocked' : 'booked'),
    capacity: slot.boatCapacity,
    pricing: slot.pricing ? {
      standardPrice: Math.round((slot.pricing.basePrice || 0) * 100), // Convert to cents
      essentialsPrice: Math.round((slot.pricing.essentialsPrice || slot.pricing.basePrice || 0) * 100),
      ultimatePrice: Math.round((slot.pricing.ultimatePrice || slot.pricing.basePrice || 0) * 100),
      perPersonEstimate: Math.round((slot.pricing.perPersonEstimate || 0) * 100),
      dayType: slot.pricing.dayType || 'Unknown',
      packagePreviews: [
        {
          name: 'Standard',
          price: Math.round((slot.pricing.basePrice || 0) * 100),
          popular: false
        },
        {
          name: 'Essentials', 
          price: Math.round((slot.pricing.essentialsPrice || slot.pricing.basePrice || 0) * 100),
          popular: true
        },
        {
          name: 'Ultimate',
          price: Math.round((slot.pricing.ultimatePrice || slot.pricing.basePrice || 0) * 100), 
          popular: false
        }
      ]
    } : undefined
  };
};

// Admin Booking Form Schema
const adminBookingSchema = z.object({
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Valid email is required").optional(),
  contactPhone: z.string().optional(),
  groupSize: z.number().min(1, "Group size must be at least 1").max(100, "Group size cannot exceed 100"),
  eventType: z.string().default("admin_booking"),
  specialRequests: z.string().optional(),
  adminNotes: z.string().optional(),
  totalAmount: z.number().min(0).optional(),
  paymentStatus: z.enum(["pending", "deposit_paid", "fully_paid"]).default("pending")
});

type AdminBookingFormData = z.infer<typeof adminBookingSchema>;

function CalendarView() {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState<string>("all"); // Default to show all boats
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState<number>(1); // Default to show all boats
  const [flashDayTripper, setFlashDayTripper] = useState(true);
  
  // Admin booking/blocking UI state
  const [selectedTimeBlock, setSelectedTimeBlock] = useState<TimeBlock | null>(null);
  const [isAdminBookingDialogOpen, setIsAdminBookingDialogOpen] = useState(false);
  const [isBlockingDialogOpen, setIsBlockingDialogOpen] = useState(false);
  
  // Slot details and deletion UI state
  const [selectedSlotForDetails, setSelectedSlotForDetails] = useState<TimeBlock | null>(null);
  const [isSlotDetailsDialogOpen, setIsSlotDetailsDialogOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  
  const { toast } = useToast();
  const { isConnected } = useSSEAutoConnect(); // ⚡ Real-time updates via SSE
  
  // Real-time availability updates
  const { 
    recentUpdates, 
    isConnected: isAvailabilityConnected,
    invalidateAvailability,
    clearUpdates 
  } = useRealtimeAvailability({ 
    showToasts: false, // We'll show our own indicators
    maxUpdates: 5,
    targetDate: formatDateForAvailability(selectedDate)
  });

  // Get the start of the week (Sunday)
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 0 });
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  // Fetch availability data from Google Sheets (source of truth)
  const { data: googleSheetsAvailability, isLoading: isLoadingSheets, refetch: refetchSheets } = useQuery({
    queryKey: ['/api/google-sheets/calendar-availability', weekStart.toISOString(), selectedWeek.toISOString()],
    queryFn: async () => {
      // Calculate week range for the current week view
      const endDate = new Date(weekStart);
      endDate.setDate(weekStart.getDate() + 7);
      
      const response = await fetch(`/api/google-sheets/calendar-availability?startDate=${weekStart.toISOString()}&endDate=${endDate.toISOString()}`);
      if (!response.ok) throw new Error('Failed to fetch Google Sheets availability');
      const data = await response.json();
      return data;
    },
    staleTime: 1000 * 60 * 1, // 1 minute - refresh more frequently for admin view
    refetchInterval: 1000 * 60 * 2, // 2 minutes - keep data fresh
  });

  // Transform Google Sheets data into time blocks
  const transformSheetsToTimeBlocks = (sheetsData: any[]): TimeBlock[] => {
    if (!sheetsData || !Array.isArray(sheetsData)) return [];
    
    return sheetsData.map(slot => {
      const slotDate = new Date(slot.date);
      
      // Determine boat details based on group size
      let boatId = 'day-tripper';
      let boatName = 'Day Tripper';
      let capacity = 14;
      
      if (slot.boat?.toLowerCase().includes('day tripper')) {
        boatId = 'day-tripper';
        boatName = 'Day Tripper';
        capacity = 14;
      } else if (slot.boat?.toLowerCase().includes('me seek') || slot.boat?.toLowerCase().includes('irony')) {
        boatId = 'me-seeks-the-irony';
        boatName = 'Me Seeks The Irony';
        capacity = 25;
      } else if (slot.boat?.toLowerCase().includes('clever girl')) {
        boatId = 'clever-girl';
        boatName = 'Clever Girl';
        capacity = 50;
      }
      
      // Convert pricing structure
      const pricing = slot.pricing?.type === 'per-cruise' ? {
        standardPrice: Math.round((slot.pricing.standardPrice || 0) * 100), // Convert to cents
        essentialsPrice: Math.round((slot.pricing.essentialsPrice || 0) * 100),
        ultimatePrice: Math.round((slot.pricing.ultimatePrice || 0) * 100),
        perPersonEstimate: Math.round(((slot.pricing.standardPrice || 0) / capacity) * 100),
        dayType: slot.dayOfWeek,
        packagePreviews: [
          { name: 'Standard', price: Math.round((slot.pricing.standardPrice || 0) * 100), popular: false },
          { name: 'Essentials', price: Math.round((slot.pricing.essentialsPrice || 0) * 100), popular: true },
          { name: 'Ultimate', price: Math.round((slot.pricing.ultimatePrice || 0) * 100), popular: false }
        ]
      } : undefined;
      
      return {
        id: slot.id,
        date: slotDate,
        startTime: slot.startTime,
        endTime: slot.endTime,
        boatId: boatId,
        boatName: boatName,
        status: slot.status as 'available' | 'booked' | 'blocked',
        capacity: capacity,
        pricing: pricing,
      };
    });
  };

  // Get time blocks from Google Sheets data
  const timeBlocks = transformSheetsToTimeBlocks(googleSheetsAvailability?.availability || []);

  // Filter disco slots - fix for undefined discoSlots error
  const discoSlots = timeBlocks.filter(slot => 
    slot.boatName?.toLowerCase().includes('atx disco') || 
    slot.boatId?.includes('disco') ||
    (slot as any).cruiseType === 'disco'
  );

  // Generate time blocks for calendar view - compatible with existing UI
  const generateTimeBlocks = (
    date: Date,
    boats: Array<{id: string; name: string; capacity: number; active: boolean}>,
    bookings: Booking[] = [],
    products: Product[] = []
  ): TimeBlock[] => {
    // Use the centralized availability data (timeBlocks) instead of generating from scratch
    // Filter timeBlocks for the specific date and boats
    const dateStr = date.toDateString();
    
    return timeBlocks.filter(block => 
      block.date.toDateString() === dateStr &&
      boats.some(boat => boat.id === block.boatId)
    );
  };

  // Get unique boats from Google Sheets time blocks
  const boatsFromSlots = timeBlocks.reduce((boats, block) => {
    const existing = boats.find(b => b.id === block.boatId);
    if (!existing) {
      boats.push({
        id: block.boatId,
        name: block.boatName,
        capacity: block.capacity || 14,
        active: true
      });
    }
    return boats;
  }, [] as Array<{id: string; name: string; capacity: number; active: boolean}>);

  // Smart boat filtering based on group size - same logic as Quote Builder
  const getBoatsForGroupSize = (groupSize: number) => {
    return boatsFromSlots.filter(boat => {
      // Show boats that can accommodate the group size
      return boat.capacity >= groupSize;
    });
  };

  const filteredBoats = getBoatsForGroupSize(selectedCapacity);

  // Group filtered boats by capacity for tabs - using Quote Builder boat categories
  const boatGroups = {
    all: filteredBoats,
    dayTripper: filteredBoats.filter(b => b.capacity <= 14), // Day Tripper: 14 people
    medium: filteredBoats.filter(b => b.capacity >= 25 && b.capacity <= 30), // Me Seek/The Irony: 25-30 people
    large: filteredBoats.filter(b => b.capacity >= 50 && b.capacity <= 75) // Clever Girl: 50-75 people
  };

  // Flash Day Tripper tab on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlashDayTripper(false);
    }, 2000); // Flash for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  // Auto-select appropriate tab when slider changes
  useEffect(() => {
    if (boatGroups.dayTripper.length > 0 && selectedCapacity <= 14) {
      setSelectedTab('dayTripper');
    } else if (boatGroups.medium.length > 0 && selectedCapacity <= 30) {
      setSelectedTab('medium');
    } else if (boatGroups.large.length > 0) {
      setSelectedTab('large');
    } else {
      // If no boats match, default to all
      setSelectedTab('all');
    }
  }, [selectedCapacity, boatsFromSlots]);

  // When date picker selects a date, update the week view
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedWeek(date);
      setIsDatePickerOpen(false);
    }
  };

  // Toggle availability mutation - updated to invalidate centralized availability cache
  const toggleAvailabilityMutation = useMutation({
    mutationFn: async ({ date, startTime, endTime, boatId, status }: {
      date: string;
      startTime: string;
      endTime: string;
      boatId: string;
      status: 'available' | 'booked';
    }) => {
      return apiRequest("POST", "/api/timeframes/toggle-availability", {
        date,
        startTime,
        endTime,
        boatId,
        status: status === 'available' ? 'booked' : 'available'
      });
    },
    onSuccess: () => {
      // Invalidate centralized availability cache - same as Quote Builder
      queryClient.invalidateQueries({ queryKey: ["/api/availability/search"] });
      toast({
        title: "Availability Updated",
        description: "The time slot has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update availability. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update disco slot quantity mutation - updated to invalidate centralized cache
  const updateDiscoQuantityMutation = useMutation({
    mutationFn: async ({ slotId, adjustment }: { slotId: string; adjustment: number }) => {
      return apiRequest("POST", `/api/disco/slots/${slotId}/update-quantity`, { adjustment });
    },
    onSuccess: () => {
      // Invalidate centralized availability cache for disco cruises
      queryClient.invalidateQueries({ queryKey: ["/api/availability/search"] });
      toast({
        title: "Tickets Updated",
        description: "Disco cruise tickets have been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update tickets. Please try again.",
        variant: "destructive",
      });
    },
  });

  // ===== NEW ADMIN BOOKING/BLOCKING MUTATIONS FOR BIDIRECTIONAL SYNC =====

  // Admin book time slot mutation
  const adminBookSlotMutation = useMutation({
    mutationFn: async (bookingData: AdminBookingFormData & { 
      boatId: string; 
      startTime: string; 
      endTime: string; 
    }) => {
      return apiRequest("POST", "/api/admin/book-slot", {
        ...bookingData,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime
      });
    },
    onSuccess: (data) => {
      // Invalidate centralized availability cache for immediate sync with Quote Builder
      queryClient.invalidateQueries({ queryKey: ["/api/availability/search"] });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      
      setIsAdminBookingDialogOpen(false);
      setSelectedTimeBlock(null);
      adminBookingForm.reset();
      
      toast({
        title: "Booking Created",
        description: `Manual booking created successfully for ${data.booking?.contactName}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Admin cancel booking mutation  
  const cancelBookingMutation = useMutation({
    mutationFn: async ({ bookingId, reason }: { bookingId: string; reason?: string }) => {
      return apiRequest("DELETE", `/api/admin/cancel-booking/${bookingId}`, { reason });
    },
    onSuccess: () => {
      // Invalidate centralized availability cache for immediate sync with Quote Builder
      queryClient.invalidateQueries({ queryKey: ["/api/availability/search"] });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      
      toast({
        title: "Booking Canceled",
        description: "Booking has been canceled successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Cancelation Failed",
        description: error.message || "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Admin block time slot mutation
  const blockSlotMutation = useMutation({
    mutationFn: async ({ 
      boatId, 
      startTime, 
      endTime, 
      blockReason, 
      notes 
    }: {
      boatId: string;
      startTime: string;
      endTime: string;
      blockReason: string;
      notes?: string;
    }) => {
      return apiRequest("POST", "/api/admin/block-slot", {
        boatId,
        startTime,
        endTime,
        blockReason,
        notes
      });
    },
    onSuccess: () => {
      // Invalidate centralized availability cache for immediate sync with Quote Builder
      queryClient.invalidateQueries({ queryKey: ["/api/availability/search"] });
      
      setIsBlockingDialogOpen(false);
      setSelectedTimeBlock(null);
      
      toast({
        title: "Time Slot Blocked",
        description: "Time slot has been blocked successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Block Failed",
        description: error.message || "Failed to block time slot. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Admin unblock time slot mutation
  const unblockSlotMutation = useMutation({
    mutationFn: async (slotId: string) => {
      return apiRequest("DELETE", `/api/admin/unblock-slot/${slotId}`);
    },
    onSuccess: () => {
      // Invalidate centralized availability cache for immediate sync with Quote Builder
      queryClient.invalidateQueries({ queryKey: ["/api/availability/search"] });
      
      toast({
        title: "Time Slot Unblocked",
        description: "Time slot has been unblocked successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Unblock Failed",
        description: error.message || "Failed to unblock time slot. Please try again.",
        variant: "destructive",
      });
    },
  });

  // ===== NEW ADMIN SLOT DELETION MUTATION =====
  const deleteSlotMutation = useMutation({
    mutationFn: async ({ slotId, confirmation }: { slotId: string; confirmation: string }) => {
      return apiRequest("DELETE", `/api/admin/remove-slot/${slotId}`, { confirmation });
    },
    onSuccess: () => {
      // Invalidate centralized availability cache for immediate sync with Quote Builder
      queryClient.invalidateQueries({ queryKey: ["/api/availability/search"] });
      queryClient.invalidateQueries({ queryKey: ["/api/availability"] });
      
      // Close all dialogs and reset state
      setIsDeleteConfirmationOpen(false);
      setIsSlotDetailsDialogOpen(false);
      setSelectedSlotForDetails(null);
      setDeleteConfirmationText('');
      
      toast({
        title: "Time Slot Deleted",
        description: "Time slot has been permanently removed from availability.",
      });
      
      // Broadcast real-time update
      invalidateAvailability(formatDateForAvailability(selectedDate));
    },
    onError: (error: any) => {
      toast({
        title: "Deletion Failed",
        description: error.message || "Failed to delete time slot. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Form setup for admin booking
  const adminBookingForm = useForm<AdminBookingFormData>({
    resolver: zodResolver(adminBookingSchema),
    defaultValues: {
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      groupSize: 1,
      eventType: "admin_booking",
      specialRequests: "",
      adminNotes: "",
      totalAmount: 0,
      paymentStatus: "pending"
    }
  });

  // Capacity selector handlers
  const handleCapacityChange = (value: number[]) => {
    setSelectedCapacity(value[0]);
  };


  // Get availability count for medium boats at a specific time using centralized data
  const getMediumBoatAvailability = (date: Date, time: string) => {
    const mediumBoatsAtTime = timeBlocks.filter(block => 
      block.date.toDateString() === date.toDateString() &&
      block.startTime === time &&
      boatGroups.medium.some(boat => boat.id === block.boatId)
    );
    
    const available = mediumBoatsAtTime.filter(block => block.status === 'available').length;
    const total = mediumBoatsAtTime.length;
    
    return { available, total };
  };

  // Time block card component
  const TimeBlockCard = ({ block }: { block: TimeBlock }) => {
    const handleCardClick = () => {
      setSelectedSlotForDetails(block);
      setIsSlotDetailsDialogOpen(true);
    };

    const boatColor = getBoatColor(block.boatName);
    const boatColorClasses = getColorClasses(boatColor, 'card');
    const boatTextColor = getBoatTextColor(block.boatName);

    const pricingTooltipContent = block.pricing ? (
      <div className="space-y-2 max-w-xs">
        <div className="font-semibold text-sm border-b pb-1">Pricing for {block.capacity}-person boat</div>
        <div className="text-xs space-y-1">
          <div className="text-muted-foreground">Day Type: {block.pricing.dayType}</div>
          {block.pricing.packagePreviews.map((pkg, idx) => (
            <div key={idx} className={cn(
              "flex justify-between items-center p-1 rounded",
              pkg.popular && "bg-yellow-100 border border-yellow-300"
            )}>
              <span className={cn(pkg.popular && "font-semibold")}>
                {pkg.name} {pkg.popular && '⭐'}
              </span>
              <span className="font-medium">{formatCurrency(pkg.price / 100)}</span>
            </div>
          ))}
          <div className="text-xs text-muted-foreground pt-1 border-t">
            ~{formatCurrency(block.pricing.perPersonEstimate / 100)}/person estimate
          </div>
        </div>
      </div>
    ) : null;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "p-1.5 rounded-md border cursor-pointer transition-all hover:shadow-sm",
                boatColorClasses, // Add boat-specific left border
                block.status === 'available' 
                  ? "bg-green-100 border-green-400 hover:bg-green-200" 
                  : block.status === 'blocked'
                  ? "bg-gray-200 border-gray-400"
                  : "bg-red-100 border-red-400 hover:bg-red-200"
              )}
              onClick={handleCardClick}
              data-testid={`time-block-${block.id}`}
            >
              <div className="font-semibold text-xs text-gray-800">
                {formatTime(block.startTime)} - {formatTime(block.endTime)}
              </div>
              <div className={cn("text-xs font-medium", boatTextColor)}>
                <Ship className="inline w-2.5 h-2.5 mr-1" />
                {block.boatName}
              </div>
              <div className="flex justify-between items-center text-xs mt-1">
                <span className={cn(
                  "font-medium",
                  block.capacity >= selectedCapacity 
                    ? "text-green-600" 
                    : "text-red-500"
                )}>
                  Cap: {block.capacity} • Fits your group ({block.capacity >= selectedCapacity ? '✓' : '✗'})
                </span>
                {block.pricing && (
                  <span className="font-semibold text-green-700">
                    {formatCurrency(block.pricing.standardPrice / 100)}
                  </span>
                )}
              </div>
              {block.pricing && (
                <div className="text-xs text-muted-foreground mt-0.5">
                  {block.pricing.dayType} • ~{formatCurrency(block.pricing.perPersonEstimate / 100)}/p
                </div>
              )}
            </div>
          </TooltipTrigger>
          {pricingTooltipContent && (
            <TooltipContent side="right" className="z-50">
              {pricingTooltipContent}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Medium boats grouped card - using centralized availability data
  const GroupedTimeBlockCard = ({ date, startTime, endTime }: { date: Date; startTime: string; endTime: string }) => {
    const { available, total } = getMediumBoatAvailability(date, startTime);
    const mediumBoats = boatGroups.medium;
    
    // Get pricing from first available medium boat block at this time
    const sampleBlock = timeBlocks.find(block => 
      block.date.toDateString() === date.toDateString() &&
      block.startTime === startTime &&
      mediumBoats.some(boat => boat.id === block.boatId)
    );
    const groupPricing = sampleBlock?.pricing;
    
    return (
      <div className="space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "p-2 rounded-md border transition-all cursor-pointer",
                  available > 0 
                    ? "bg-green-100 border-green-400 hover:bg-green-200" 
                    : "bg-red-100 border-red-400"
                )}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-xs">
                      {formatTime(startTime)} - {formatTime(endTime)}
                    </div>
                    <div className="text-xs mt-1 font-medium">
                      {available} of {total} boats available
                    </div>
                    <div className="text-xs opacity-75">
                      25-person boats
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm text-green-700">
                      {groupPricing ? formatCurrency(groupPricing.standardPrice / 100) : 'Pricing unavailable'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {groupPricing ? groupPricing.dayType : 'N/A'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {groupPricing ? `~${formatCurrency(groupPricing.perPersonEstimate / 100)}/person` : ''}
                    </div>
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="z-50">
              <div className="space-y-2 max-w-xs">
                <div className="font-semibold text-sm border-b pb-1">Medium Boat Pricing</div>
                {groupPricing ? (
                  <div className="text-xs space-y-1">
                    <div className="text-muted-foreground">Day Type: {groupPricing.dayType}</div>
                    {groupPricing.packagePreviews.map((pkg, idx) => (
                      <div key={idx} className={cn(
                        "flex justify-between items-center p-1 rounded",
                        pkg.popular && "bg-yellow-100 border border-yellow-300"
                      )}>
                        <span className={cn(pkg.popular && "font-semibold")}>
                          {pkg.name} {pkg.popular && '⭐'}
                        </span>
                        <span className="font-medium">{formatCurrency(pkg.price / 100)}</span>
                      </div>
                    ))}
                    <div className="text-xs text-muted-foreground pt-1 border-t">
                      ~{formatCurrency(groupPricing.perPersonEstimate / 100)}/person estimate
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    Pricing information unavailable
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="pl-4 space-y-1">
          {mediumBoats.map(boat => {
            // Find the time block for this boat at this time using centralized data
            const boatBlock = timeBlocks.find(block => 
              block.boatId === boat.id && 
              block.date.toDateString() === date.toDateString() &&
              block.startTime === startTime
            );
            
            const isBooked = boatBlock ? boatBlock.status !== 'available' : false;
            
            return (
              <div
                key={boat.id}
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded cursor-pointer transition-all font-medium flex justify-between items-center",
                  getColorClasses(getBoatColor(boat.name), 'card'), // Add boat color border
                  isBooked 
                    ? "bg-red-200 text-red-800 border border-red-400" 
                    : "bg-green-100 text-green-800 hover:bg-green-200 border border-green-400"
                )}
                onClick={() => {
                  toggleAvailabilityMutation.mutate({
                    date: date.toISOString().split('T')[0],
                    startTime,
                    endTime,
                    boatId: boat.id,
                    status: isBooked ? 'available' : 'booked'
                  });
                }}
                data-testid={`boat-toggle-${boat.id}-${startTime}`}
              >
                <span className={getBoatTextColor(boat.name)}>
                  {boat.name}: {isBooked ? 'Booked' : 'Available'}
                </span>
                {!isBooked && boatBlock?.pricing && (
                  <span className="font-semibold text-green-700">
                    {formatCurrency(boatBlock.pricing.standardPrice / 100)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Disco slot card component with pricing
  const DiscoSlotDisplay = ({ slot }: { slot: DiscoSlot }) => {
    const available = slot.ticketCap - slot.ticketsSold;
    
    // Disco pricing based on day of week
    const slotDate = new Date(slot.date);
    const dayOfWeek = slotDate.getDay();
    const discoPackages = [
      { name: 'Basic', price: 8500, description: 'Dance floor access + cash bar' },
      { name: 'Disco Queen', price: 9500, description: 'Basic + VIP seating + welcome drink', popular: true },
      { name: 'Platinum', price: 10500, description: 'All inclusive + bottle service' }
    ];
    
    const basePrice = dayOfWeek === 6 ? 9500 : 8500; // Saturday premium
    
    return (
      <Card className={cn("mb-1 border-l-4 border-l-yellow-500", getColorClasses('yellow', 'disco'))}>
        <CardContent className="p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs text-yellow-800">
                        {formatTime(new Date(slot.startTime).toTimeString().slice(0, 5))} - 
                        {formatTime(new Date(slot.endTime).toTimeString().slice(0, 5))}
                      </div>
                      <div className="text-xs text-yellow-700">
                        <Anchor className="inline w-2.5 h-2.5 mr-1" />
                        Disco Cruise
                      </div>
                      <div className="text-xs font-semibold text-yellow-800 mt-1">
                        From {formatCurrency(basePrice / 100)}/person
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateDiscoQuantityMutation.mutate({ slotId: slot.id, adjustment: -1 })}
                        disabled={slot.ticketsSold <= 0}
                        data-testid={`disco-decrease-${slot.id}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="text-center min-w-[80px]">
                        <div className="font-bold text-xs text-yellow-800">{available} of {slot.ticketCap}</div>
                        <div className="text-xs text-yellow-700">available</div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateDiscoQuantityMutation.mutate({ slotId: slot.id, adjustment: 1 })}
                        disabled={slot.ticketsSold >= slot.ticketCap}
                        data-testid={`disco-increase-${slot.id}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {slot.status === 'soldout' && (
                    <Badge variant="destructive" className="mt-2">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Sold Out
                    </Badge>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="z-50">
                <div className="space-y-2 max-w-xs">
                  <div className="font-semibold text-sm border-b pb-1">ATX Disco Cruise Packages</div>
                  <div className="text-xs space-y-1">
                    <div className="text-muted-foreground">
                      {dayOfWeek === 6 ? 'Saturday Premium' : dayOfWeek === 5 ? 'Friday' : 'Weekend'} Pricing
                    </div>
                    {discoPackages.map((pkg, idx) => (
                      <div key={idx} className={cn(
                        "flex justify-between items-center p-1 rounded",
                        pkg.popular && "bg-yellow-100 border border-yellow-300"
                      )}>
                        <div>
                          <span className={cn(pkg.popular && "font-semibold")}>
                            {pkg.name} {pkg.popular && '⭐'}
                          </span>
                          <div className="text-xs text-muted-foreground">{pkg.description}</div>
                        </div>
                        <span className="font-medium">{formatCurrency(pkg.price / 100)}</span>
                      </div>
                    ))}
                    <div className="text-xs text-muted-foreground pt-1 border-t">
                      4-hour party cruise • Live DJ • Dance floor
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    );
  };

  // Show loading state while fetching Google Sheets data
  if (isLoadingSheets) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading availability from Google Sheets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Boat Calendar (Google Sheets)</h2>
          <p className="text-muted-foreground">Manage boat availability and bookings from Google Sheets</p>
        </div>
        <div className="flex gap-2 items-center">
          {/* Refresh button for Google Sheets data */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetchSheets()}
            title="Refresh from Google Sheets"
            data-testid="refresh-sheets-button"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          {/* Week Navigation */}
          <Button
            variant="outline"
            onClick={() => setSelectedWeek(subWeeks(selectedWeek, 1))}
            data-testid="week-prev"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {/* Date Input and Picker */}
          <div className="flex gap-1">
            <Input
              type="text"
              value={format(selectedDate, 'MMM dd, yyyy')}
              readOnly
              className="w-32 text-center cursor-pointer"
              onClick={() => setIsDatePickerOpen(true)}
              data-testid="date-input"
            />
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  data-testid="calendar-picker-button"
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  fromDate={new Date()}
                  toDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Today Button */}
          <Button
            variant="outline"
            onClick={() => {
              const today = new Date();
              setSelectedWeek(today);
              setSelectedDate(today);
            }}
            data-testid="week-today"
          >
            Today
          </Button>
          
          {/* Next Week */}
          <Button
            variant="outline"
            onClick={() => setSelectedWeek(addWeeks(selectedWeek, 1))}
            data-testid="week-next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Boat Capacity Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Group Size Filter</CardTitle>
          <CardDescription>
            Select your group size to see only time slots for boats that can accommodate your party. Only boats with ✓ can fit your group.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Capacity Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Group Size: {selectedCapacity} people</label>
              <span className="text-sm text-muted-foreground">
                {filteredBoats.length} boat{filteredBoats.length !== 1 ? 's' : ''} available
              </span>
            </div>
            <Slider
              value={[selectedCapacity]}
              onValueChange={handleCapacityChange}
              min={1}
              max={75}
              step={1}
              className="w-full"
              data-testid="capacity-slider"
            />
          </div>

        </CardContent>
      </Card>

      {/* Week Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Week of {format(weekStart, 'MMMM d, yyyy')}</span>
            <div className="flex items-center gap-4 text-sm">
              {/* Recent Updates Badge */}
              {recentUpdates.length > 0 && (
                <div className="flex items-center gap-1 text-blue-600">
                  <Activity className="w-4 h-4" />
                  <span className="font-medium">{recentUpdates.length} recent update{recentUpdates.length !== 1 ? 's' : ''}</span>
                </div>
              )}
              
              {/* Manual Refresh Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => invalidateAvailability(formatDateForAvailability(selectedDate))}
                className="h-6 px-2"
                data-testid="button-refresh-availability"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh
              </Button>
              
              {/* Real-time Connection Status */}
              {isConnected ? (
                <div className="flex items-center gap-1 text-green-600">
                  <Wifi className="w-4 h-4" />
                  <span className="font-medium">Live Updates</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-orange-600">
                  <WifiOff className="w-4 h-4" />
                  <span className="font-medium">Reconnecting...</span>
                </div>
              )}
            </div>
          </CardTitle>
          
          {/* Real-time Updates Display */}
          {recentUpdates.length > 0 && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-blue-900">Recent Availability Updates</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearUpdates}
                  className="h-6 px-2 text-blue-600"
                  data-testid="button-clear-updates"
                >
                  Clear
                </Button>
              </div>
              <div className="space-y-1">
                {recentUpdates.slice(0, 3).map((update) => (
                  <div 
                    key={update.id} 
                    className="flex items-center gap-2 text-xs text-blue-700"
                    data-testid={`availability-update-${update.id}`}
                  >
                    <Activity className="w-3 h-3 flex-shrink-0" />
                    <span className="flex-1">{update.message}</span>
                    <span className="text-blue-500">
                      {format(update.timestamp, 'HH:mm:ss')}
                    </span>
                  </div>
                ))}
                {recentUpdates.length > 3 && (
                  <div className="text-xs text-blue-600 text-center pt-1">
                    +{recentUpdates.length - 3} more updates
                  </div>
                )}
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className={cn(
              "grid w-full",
              // Dynamic grid columns based on available tabs
              boatGroups.dayTripper.length > 0 && boatGroups.medium.length > 0 && boatGroups.large.length > 0 ? "grid-cols-4" :
              (boatGroups.dayTripper.length > 0 && boatGroups.medium.length > 0) || (boatGroups.medium.length > 0 && boatGroups.large.length > 0) || (boatGroups.dayTripper.length > 0 && boatGroups.large.length > 0) ? "grid-cols-3" :
              "grid-cols-2"
            )}>
              {filteredBoats.length > 0 && (
                <TabsTrigger value="all" data-testid="tab-all" className="">
                  All Boats ({filteredBoats.length})
                </TabsTrigger>
              )}
              {boatGroups.dayTripper.length > 0 && (
                <TabsTrigger 
                  value="dayTripper" 
                  data-testid="tab-daytripper"
                  className={cn(
                    getColorClasses(TAB_COLORS.dayTripper, 'tab'),
                    flashDayTripper && "animate-pulse"
                  )}
                >
                  Day Tripper ({boatGroups.dayTripper.length})
                </TabsTrigger>
              )}
              {boatGroups.medium.length > 0 && (
                <TabsTrigger 
                  value="medium" 
                  data-testid="tab-medium"
                  className={getColorClasses(TAB_COLORS.medium, 'tab')}
                >
                  25-Person ({boatGroups.medium.length})
                </TabsTrigger>
              )}
              {boatGroups.large.length > 0 && (
                <TabsTrigger 
                  value="large" 
                  data-testid="tab-large"
                  className={getColorClasses(TAB_COLORS.large, 'tab')}
                >
                  Large Boats ({boatGroups.large.length})
                </TabsTrigger>
              )}
            </TabsList>

            <div className="mt-6">
              {/* Week Grid */}
              <div className="grid grid-cols-7 gap-4">
                {weekDates.map((date, index) => {
                  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index];
                  const isToday = date.toDateString() === new Date().toDateString();
                  const dayTimeBlocks = generateTimeBlocks(
                    date,
                    selectedTab === 'all' ? filteredBoats : boatGroups[selectedTab as keyof typeof boatGroups]
                  );
                  const dayDiscoSlots = discoSlots.filter(slot => {
                    const slotDate = new Date(slot.date);
                    return slotDate.toDateString() === date.toDateString();
                  });

                  // Get unique time slots for 25-person boats view
                  const uniqueTimeSlots = selectedTab === 'medium' 
                    ? Array.from(new Set(dayTimeBlocks.map(b => `${b.startTime}-${b.endTime}`))).map(slot => {
                        const [start, end] = slot.split('-');
                        return { startTime: start, endTime: end };
                      })
                    : [];

                  return (
                    <div
                      key={date.toISOString()}
                      className={cn(
                        "border-2 rounded-lg p-3",
                        isToday && "bg-yellow-50 border-yellow-400"
                      )}
                      data-testid={`day-${date.toISOString()}`}
                    >
                      <div className="font-semibold text-center mb-2">
                        {dayOfWeek}
                        <div className="text-sm text-muted-foreground">
                          {format(date, 'MMM d')}
                        </div>
                        {isToday && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            Today
                          </Badge>
                        )}
                      </div>

                      {/* Regular time blocks or grouped view */}
                      <div className="space-y-1 max-h-[600px] overflow-y-auto">
                        {selectedTab === 'medium' ? (
                          // Show grouped view for 25-person boats
                          <>
                            {uniqueTimeSlots.map(slot => (
                              <GroupedTimeBlockCard 
                                key={`${date.toISOString()}-${slot.startTime}-${slot.endTime}`}
                                date={date}
                                startTime={slot.startTime}
                                endTime={slot.endTime}
                              />
                            ))}
                          </>
                        ) : (
                          // Show individual boat cards
                          dayTimeBlocks.map(block => (
                            <TimeBlockCard key={block.id} block={block} />
                          ))
                        )}
                        
                        {/* Disco slots */}
                        {dayDiscoSlots.map(slot => (
                          <DiscoSlotDisplay key={slot.id} slot={slot} />
                        ))}
                        
                        {dayTimeBlocks.length === 0 && dayDiscoSlots.length === 0 && selectedTab !== 'medium' && (
                          <div className="text-center text-sm text-muted-foreground py-4">
                            {filteredBoats.length === 0 
                              ? `No boats available for ${selectedCapacity} people` 
                              : "No cruises scheduled"
                            }
                          </div>
                        )}
                        
                        {uniqueTimeSlots.length === 0 && dayDiscoSlots.length === 0 && selectedTab === 'medium' && (
                          <div className="text-center text-sm text-muted-foreground py-4">
                            No cruises scheduled
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Comprehensive Bookings Table */}
      <BookingsTable 
        startDate={weekStart} 
        endDate={new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)}
        className="mt-6"
      />

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded"></div>
              <span className="font-medium text-gray-700">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded"></div>
              <span className="font-medium text-gray-700">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 border-2 border-gray-400 rounded"></div>
              <span className="font-medium text-gray-700">Blocked</span>
            </div>
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4 text-purple-500" />
              <span>Disco Cruise</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Boats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boats.length}</div>
            <p className="text-xs text-muted-foreground">Active vessels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter(b => b.status === 'booked').length}
            </div>
            <p className="text-xs text-muted-foreground">Confirmed bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {boats.reduce((sum, boat) => sum + boat.capacity, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total passenger capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Slot Details Dialog */}
      <Dialog open={isSlotDetailsDialogOpen} onOpenChange={setIsSlotDetailsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Time Slot Details</DialogTitle>
            <DialogDescription>
              Manage availability for this time slot
            </DialogDescription>
          </DialogHeader>
          
          {selectedSlotForDetails && (
            <div className="space-y-4">
              {/* Slot Information */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="font-medium">Date</Label>
                  <div>{formatDate(selectedSlotForDetails.date)}</div>
                </div>
                <div>
                  <Label className="font-medium">Time</Label>
                  <div>{formatTime(selectedSlotForDetails.startTime)} - {formatTime(selectedSlotForDetails.endTime)}</div>
                </div>
                <div>
                  <Label className="font-medium">Boat</Label>
                  <div className={getBoatTextColor(selectedSlotForDetails.boatName)}>
                    <Ship className="inline w-4 h-4 mr-1" />
                    {selectedSlotForDetails.boatName}
                  </div>
                </div>
                <div>
                  <Label className="font-medium">Capacity</Label>
                  <div>{selectedSlotForDetails.capacity} passengers</div>
                </div>
                <div>
                  <Label className="font-medium">Status</Label>
                  <Badge variant={selectedSlotForDetails.status === 'available' ? 'default' : 'destructive'}>
                    {selectedSlotForDetails.status}
                  </Badge>
                </div>
                {selectedSlotForDetails.pricing && (
                  <div>
                    <Label className="font-medium">Pricing</Label>
                    <div>{formatCurrency(selectedSlotForDetails.pricing.standardPrice / 100)}</div>
                  </div>
                )}
              </div>

              {/* Pricing Details */}
              {selectedSlotForDetails.pricing && (
                <div className="border rounded-lg p-3 bg-gray-50">
                  <Label className="font-medium text-sm">Package Pricing</Label>
                  <div className="mt-2 space-y-1">
                    {selectedSlotForDetails.pricing.packagePreviews.map((pkg, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className={cn(pkg.popular && "font-semibold")}>
                          {pkg.name} {pkg.popular && '⭐'}
                        </span>
                        <span>{formatCurrency(pkg.price / 100)}</span>
                      </div>
                    ))}
                    <div className="text-xs text-muted-foreground pt-1 border-t">
                      ~{formatCurrency(selectedSlotForDetails.pricing.perPersonEstimate / 100)}/person estimate
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                {selectedSlotForDetails.status === 'available' && (
                  <Button
                    variant="destructive"
                    onClick={() => setIsDeleteConfirmationOpen(true)}
                    className="flex-1"
                    data-testid="button-delete-slot"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Delete Slot
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setIsSlotDetailsDialogOpen(false)}
                  className="flex-1"
                  data-testid="button-close-details"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmationOpen} onOpenChange={setIsDeleteConfirmationOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Time Slot</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently remove the time slot from availability.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <div className="text-red-800">
                <div className="font-medium">Warning: Permanent Deletion</div>
                <div className="text-sm mt-1">
                  This time slot will be removed from both the Admin Calendar and Quote Builder availability. 
                  Customers will no longer be able to book this slot.
                </div>
              </div>
            </Alert>

            {selectedSlotForDetails && (
              <div className="bg-gray-50 p-3 rounded border">
                <div className="text-sm font-medium">Slot to be deleted:</div>
                <div className="text-sm text-gray-600 mt-1">
                  {formatDate(selectedSlotForDetails.date)} • {formatTime(selectedSlotForDetails.startTime)} - {formatTime(selectedSlotForDetails.endTime)}
                  <br />
                  {selectedSlotForDetails.boatName} ({selectedSlotForDetails.capacity} capacity)
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="delete-confirmation" className="text-sm font-medium">
                Type "DELETE" to confirm permanent removal:
              </Label>
              <Input
                id="delete-confirmation"
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="mt-1"
                data-testid="input-delete-confirmation"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteConfirmationOpen(false);
                setDeleteConfirmationText('');
              }}
              data-testid="button-cancel-delete"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedSlotForDetails) {
                  deleteSlotMutation.mutate({
                    slotId: selectedSlotForDetails.id,
                    confirmation: deleteConfirmationText
                  });
                }
              }}
              disabled={deleteConfirmationText !== 'DELETE' || deleteSlotMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteSlotMutation.isPending ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </div>
              ) : (
                'Delete Permanently'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CalendarView;
export { CalendarView };