import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { motion, AnimatePresence } from "framer-motion";
const logoPath = '/attached_assets/PPC Logo LARGE_1757881944449.png';
import { 
  ArrowLeft, ArrowRight, CheckCircle, Clock, Users, Ship, DollarSign,
  CreditCard, Mail, Phone, User, Calendar, MapPin, Star, Sparkles,
  AlertCircle, Loader2, Heart, Gift, Camera, Music
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { formatTimeForDisplay } from "@shared/timeSlots";

type BookingStep = 'details' | 'contact' | 'products' | 'review' | 'payment';

const eventTypes = [
  { id: 'birthday', label: 'Birthday Party', emoji: '🎂', description: 'Celebrate another year around the sun' },
  { id: 'bachelor', label: 'Bachelor Party', emoji: '🎉', description: 'Last sail as a single man' },
  { id: 'bachelorette', label: 'Bachelorette Party', emoji: '💃', description: 'Pre-wedding celebration' },
  { id: 'corporate', label: 'Corporate Event', emoji: '💼', description: 'Team building on the water' },
  { id: 'wedding', label: 'Wedding', emoji: '💒', description: 'Say "I do" on the lake' },
  { id: 'graduation', label: 'Graduation Party', emoji: '🎓', description: 'Celebrate academic achievement' },
  { id: 'anniversary', label: 'Anniversary', emoji: '💝', description: 'Celebrate your love story' },
  { id: 'other', label: 'Other Celebration', emoji: '🎊', description: 'Custom celebration' },
];

const addOnPackages = [
  {
    id: 'essentials',
    name: 'Essentials Package',
    price: 150, // flat fee
    description: 'Enhanced cruise experience',
    features: ['Premium sound system', 'Coolers with ice', 'Party decorations', 'Bluetooth connectivity'],
    popular: false,
    icon: '🎵'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Party Package',
    price: 225, // flat fee
    description: 'All-inclusive luxury experience',
    features: ['Premium sound system', 'Coolers with ice', 'Party decorations', 'Red carpet boarding', 'Professional photography session', 'Complimentary champagne toast'],
    popular: true,
    icon: '👑'
  },
  {
    id: 'photography',
    name: 'Photography Add-On',
    price: 75,
    description: 'Capture your memories',
    features: ['Professional photographer', '50+ edited photos', 'Digital gallery delivery'],
    popular: false,
    icon: '📸'
  },
];

// Form validation schemas
const eventDetailsSchema = z.object({
  eventType: z.string().min(1, "Please select an event type"),
  groupSize: z.number().min(8, "Minimum group size is 8").max(75, "Maximum group size is 75"),
  specialRequests: z.string().max(500, "Special requests must be under 500 characters").optional(),
});

const contactInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, "Please enter a valid phone number"),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
  agreeToMarketing: z.boolean().optional(),
});

const formatCurrency = (cents: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

interface SlotDetails {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration?: number;
  boatName?: string;
  boatType?: string;
  capacity?: number;
  baseHourlyRate?: number;
  totalPrice?: number;
  ticketPrice?: number;
  availableTickets?: number;
  type?: 'disco';
  icon?: string;
  popular?: boolean;
  description?: string;
}

interface PricingBreakdown {
  type: 'private' | 'disco';
  subtotal: number;
  tax: number;
  gratuity?: number;
  total: number;
  depositAmount: number;
  breakdown?: any;
  ticketPrice?: number;
  quantity?: number;
}

export default function BookingFlow() {
  const [, params] = useRoute("/book/:slotId");
  const [, navigate] = useLocation();
  const slotId = params?.slotId;
  
  const [currentStep, setCurrentStep] = useState<BookingStep>('details');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [pricing, setPricing] = useState<PricingBreakdown | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Form instances
  const eventForm = useForm({
    resolver: zodResolver(eventDetailsSchema),
    defaultValues: {
      eventType: '',
      groupSize: 20,
      specialRequests: '',
    },
  });

  const contactForm = useForm({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      agreeToTerms: false,
      agreeToMarketing: false,
    },
  });

  // Fetch real slot details from API using unified availability system
  const { data: slotDetails, isLoading: slotLoading } = useQuery<SlotDetails | null>({
    queryKey: ["/api/availability/slot", slotId],
    queryFn: async () => {
      if (!slotId) return null;
      
      try {
        // First try to fetch from unified availability API
        const unifiedResponse = await fetch(`/api/availability/slot?slotId=${encodeURIComponent(slotId)}`);
        if (unifiedResponse.ok) {
          const slotData = await unifiedResponse.json();
          
          // Convert unified slot data to SlotDetails format
          return {
            id: slotData.id,
            date: slotData.dateISO,
            startTime: slotData.startTime,
            endTime: slotData.endTime,
            duration: slotData.duration,
            type: slotData.cruiseType,
            boatName: slotData.boatName,
            boatType: slotData.capacity <= 15 ? 'dayTripper' : slotData.capacity >= 50 ? 'luxury' : 'standard',
            capacity: slotData.capacity,
            baseHourlyRate: slotData.basePrice || 30000,
            totalPrice: slotData.totalPrice || slotData.basePrice * slotData.duration,
            ticketPrice: slotData.ticketPrice,
            availableTickets: slotData.availableTickets,
            icon: slotData.cruiseType === 'disco' ? '✨' : 
                  slotData.capacity <= 15 ? '🚤' : 
                  slotData.capacity >= 50 ? '🛥️' : '⛵',
            description: slotData.cruiseType === 'disco' ? 'ATX Disco Cruise' : 
                        `${slotData.duration}-hour ${slotData.boatName || 'cruise'} cruise`
          };
        }
        
        // Fall back to legacy parsing for backward compatibility
        console.log('Unified API not available, falling back to legacy parsing for slot:', slotId);
        
        if (slotId.startsWith('disco_')) {
          // Disco slot: disco_{id}
          const discoSlotId = slotId.replace('disco_', '');
          const response = await fetch(`/api/disco/slots/${discoSlotId}`);
          if (!response.ok) throw new Error('Failed to fetch disco slot');
          const discoSlot = await response.json();
          
          return {
            id: slotId,
            date: discoSlot.date.split('T')[0],
            startTime: discoSlot.startTime,
            endTime: discoSlot.endTime,
            ticketPrice: discoSlot.ticketPrice,
            availableTickets: discoSlot.ticketCap - discoSlot.ticketsSold,
            type: 'disco' as const,
            icon: '✨',
            description: 'ATX Disco Cruise'
          };
        } else if (slotId.startsWith('private_')) {
          // Private slot: private_{boatId}_{date}_{startTime}_{endTime}
          // Add robust error handling for malformed slot IDs
          const parts = slotId.split('_');
          if (parts.length < 5) {
            throw new Error(`Invalid private slot ID format: ${slotId}. Expected format: private_{boatId}_{date}_{startTime}_{endTime}`);
          }
          
          const [, boatId, dateStr, startTime, endTime] = parts;
          
          // Validate required parts
          if (!boatId || !dateStr || !startTime || !endTime) {
            throw new Error(`Missing required parts in slot ID: ${slotId}`);
          }
          
          // Fetch boat details
          const boatResponse = await fetch('/api/boats');
          if (!boatResponse.ok) throw new Error('Failed to fetch boats');
          const boats = await boatResponse.json();
          const boat = boats.find((b: any) => b.id === boatId);
          
          if (!boat) throw new Error(`Boat not found: ${boatId}`);
          
          // Calculate duration with error handling
          const startTimeParts = startTime.split(':');
          const endTimeParts = endTime.split(':');
          if (startTimeParts.length < 2 || endTimeParts.length < 2) {
            throw new Error(`Invalid time format in slot ID: ${slotId}`);
          }
          
          const startHour = parseInt(startTimeParts[0]);
          const endHour = parseInt(endTimeParts[0]);
          if (isNaN(startHour) || isNaN(endHour)) {
            throw new Error(`Invalid time values in slot ID: ${slotId}`);
          }
          
          const duration = endHour - startHour;
          if (duration <= 0) {
            throw new Error(`Invalid duration calculated from slot ID: ${slotId}`);
          }
          
          // Calculate base pricing
          const baseHourlyRate = 30000; // $300 in cents
          const totalPrice = baseHourlyRate * duration;
          
          return {
            id: slotId,
            date: dateStr,
            startTime,
            endTime,
            duration,
            boatName: boat.name,
            boatType: boat.capacity <= 15 ? 'dayTripper' : boat.capacity >= 50 ? 'luxury' : 'standard',
            capacity: boat.capacity,
            baseHourlyRate,
            totalPrice,
            icon: boat.capacity <= 15 ? '🚤' : boat.capacity >= 50 ? '🛥️' : '⛵',
            description: `${duration}-hour ${boat.name} cruise`
          };
        } else {
          throw new Error(`Invalid slot ID format: ${slotId}. Must start with 'disco_' or 'private_'`);
        }
      } catch (error) {
        console.error('Failed to fetch slot details:', error);
        throw error;
      }
    },
    enabled: !!slotId,
  });

  // Calculate pricing when selections change
  const calculatePricing = useMutation({
    mutationFn: async () => {
      if (!slotDetails) return null;
      
      const eventData = eventForm.getValues();
      const cruiseType = slotDetails.type === 'disco' ? 'disco' : 'private';
      
      if (cruiseType === 'disco') {
        // Disco cruise pricing
        const ticketPrice = slotDetails.ticketPrice || 8500; // $85 default
        const quantity = eventData.groupSize;
        const subtotal = ticketPrice * quantity;
        const tax = Math.round(subtotal * 0.0825); // 8.25% tax
        const total = subtotal + tax;
        
        return {
          type: 'disco' as const,
          subtotal,
          tax,
          total,
          depositAmount: total, // Disco cruises are full payment
          ticketPrice,
          quantity
        };
      } else {
        // Private cruise pricing
        const baseRate = slotDetails.baseHourlyRate || 30000; // $300/hour
        const duration = slotDetails.duration || 4;
        let hourlyRate = baseRate;
        
        // Add selected add-ons to hourly rate
        selectedAddOns.forEach(addOnId => {
          const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
          if (addOn) {
            hourlyRate += addOn.price * 100 / duration; // Convert to hourly rate
          }
        });
        
        const subtotal = hourlyRate * duration;
        const tax = Math.round(subtotal * 0.0825); // 8.25% tax
        const gratuity = Math.round(subtotal * 0.20); // 20% gratuity
        const total = subtotal + tax + gratuity;
        const depositAmount = Math.round(total * 0.5); // 50% deposit
        
        return {
          type: 'private' as const,
          subtotal,
          tax,
          gratuity,
          total,
          depositAmount
        };
      }
    },
    onSuccess: (data: any) => {
      if (data) {
        setPricing(data as PricingBreakdown);
      }
    },
    onError: (error) => {
      toast({
        title: "Pricing Error",
        description: "Unable to calculate pricing. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Create booking mutation
  const createBooking = useMutation({
    mutationFn: async () => {
      if (!slotDetails || !pricing) return null;
      
      const eventData = eventForm.getValues();
      const contactData = contactForm.getValues();
      
      const response = await apiRequest("POST", "/api/checkout/create-session", {
        paymentType: 'deposit',
        customerEmail: contactData.email,
        metadata: {
          slotId: slotDetails.id,
          customerName: `${contactData.firstName} ${contactData.lastName}`,
          eventType: eventData.eventType
        },
        selectionPayload: {
          cruiseType: slotDetails.type === 'disco' ? 'disco' : 'private',
          groupSize: eventData.groupSize,
          eventDate: slotDetails.date,
          eventType: eventData.eventType,
          selectedAddOnPackages: selectedAddOns,
          ...(slotDetails.type === 'disco' && { 
            discoTicketQuantity: eventData.groupSize,
            discoPackage: 'basic'
          }),
          ...(slotDetails.type !== 'disco' && {
            timeSlot: `${slotDetails.startTime}-${slotDetails.endTime}`,
            selectedTimeSlot: `${slotDetails.startTime}-${slotDetails.endTime}`
          })
        }
      });
      
      if (response.checkoutUrl) {
        // Redirect to checkout
        window.location.href = response.checkoutUrl;
        return response;
      } else {
        throw new Error('No checkout URL received');
      }
    },
    onSuccess: (data: any) => {
      // This will redirect to checkout, so we don't need to handle success here
    },
    onError: (error: any) => {
      setIsProcessing(false);
      toast({
        title: "Booking Error",
        description: "Failed to start payment process. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Create lead mutation for sending quote
  const createLead = useMutation({
    mutationFn: async () => {
      if (!slotDetails || !pricing) return null;
      
      const eventData = eventForm.getValues();
      const contactData = contactForm.getValues();
      
      const response = await apiRequest("POST", "/api/chat/booking", {
        step: 'create-lead',
        data: {
          name: `${contactData.firstName} ${contactData.lastName}`,
          email: contactData.email,
          phone: contactData.phone,
          eventType: eventData.eventType,
          groupSize: eventData.groupSize,
          eventDate: slotDetails.date,
          timeSlot: slotDetails.type === 'disco' ? 'disco' : `${slotDetails.startTime}-${slotDetails.endTime}`,
          specialRequests: eventData.specialRequests
        }
      });
      
      if (response.projectId) {
        // Generate quote
        const quoteResponse = await apiRequest("POST", "/api/chat/booking", {
          step: 'generate-quote',
          data: {
            projectId: response.projectId
          }
        });
        return quoteResponse;
      }
      
      return response;
    },
    onSuccess: (data: any) => {
      if (data && data.quoteUrl) {
        toast({
          title: "Quote Sent!",
          description: "We've sent your custom quote via email and SMS.",
        });
        // Could navigate to a success page or show quote details
      }
    },
    onError: (error: any) => {
      setIsProcessing(false);
      toast({
        title: "Quote Error",
        description: "Failed to generate quote. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Handle payment process
  const handlePayment = () => {
    if (!pricing) {
      toast({
        title: "Error",
        description: "Please calculate pricing first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    createBooking.mutate();
  };
  
  // Handle send quote
  const handleSendQuote = () => {
    if (!pricing) {
      toast({
        title: "Error",
        description: "Please calculate pricing first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    createLead.mutate();
  };
  
  // Auto-calculate pricing when dependencies change
  useEffect(() => {
    if (slotDetails && eventForm.getValues().eventType && eventForm.getValues().groupSize) {
      calculatePricing.mutate();
    }
  }, [slotDetails, selectedAddOns]);
  
  // Show loading state while fetching slot details
  if (slotLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Loader2 className="h-6 w-6 animate-spin" />
              <div>
                <p className="font-medium">Loading booking details...</p>
                <p className="text-sm text-muted-foreground">Please wait while we prepare your cruise information.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Show error if slot not found
  if (!slotDetails && !slotLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              <div>
                <p className="font-medium text-gray-900">Booking Slot Not Found</p>
                <p className="text-sm text-muted-foreground">The selected time slot may no longer be available.</p>
              </div>
              <Button onClick={() => navigate('/')} className="w-full">
                Back to Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Recalculate pricing when relevant data changes
  useEffect(() => {
    if (slotDetails && eventForm.getValues().eventType && eventForm.getValues().groupSize) {
      calculatePricing.mutate();
    }
  }, [slotDetails, selectedAddOns, eventForm.watch('groupSize')]);

  // Recalculate pricing when relevant data changes
  useEffect(() => {
    if (slotDetails && eventForm.formState.isValid) {
      calculatePricing.mutate();
    }
  }, [slotDetails, selectedAddOns, eventForm.watch('groupSize')]);

  const steps = [
    { id: 'details', label: 'Event Details', icon: Calendar },
    { id: 'contact', label: 'Contact Info', icon: User },
    { id: 'products', label: 'Add-Ons', icon: Gift },
    { id: 'review', label: 'Review', icon: CheckCircle },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleNext = async () => {
    if (currentStep === 'details') {
      const isValid = await eventForm.trigger();
      if (isValid) {
        setCurrentStep('contact');
      }
    } else if (currentStep === 'contact') {
      const isValid = await contactForm.trigger();
      if (isValid) {
        setCurrentStep('products');
      }
    } else if (currentStep === 'products') {
      setCurrentStep('review');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setIsProcessing(true);
      createBooking.mutate();
    }
  };

  const handleBack = () => {
    if (currentStep === 'contact') {
      setCurrentStep('details');
    } else if (currentStep === 'products') {
      setCurrentStep('contact');
    } else if (currentStep === 'review') {
      setCurrentStep('products');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    }
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  if (!slotDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2" data-testid="text-error-title">Slot Not Found</h2>
            <p className="text-gray-600 mb-4" data-testid="text-error-description">
              The selected time slot could not be found or is no longer available.
            </p>
            <Button onClick={() => window.history.back()} data-testid="button-go-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-10 w-auto"
                data-testid="img-logo"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white" data-testid="text-page-title">
                  Complete Your Booking
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm" data-testid="text-page-subtitle">
                  {slotDetails.type === 'disco' ? 'Disco Cruise' : 'Private Charter'} • {format(new Date(slotDetails.date), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
              data-testid="button-back-to-calendar"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Calendar
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = step.id === currentStep;
                  const isCompleted = index < currentStepIndex;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                        isActive ? "border-blue-500 bg-blue-500 text-white" :
                        isCompleted ? "border-green-500 bg-green-500 text-white" :
                        "border-gray-300 bg-white text-gray-400"
                      )} data-testid={`step-indicator-${step.id}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className={cn(
                          "w-16 h-0.5 mx-2",
                          isCompleted ? "bg-green-500" : "bg-gray-300"
                        )} />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2">
                {steps.map(step => (
                  <div key={step.id} className="text-xs text-gray-600 dark:text-gray-300 w-10 text-center" data-testid={`step-label-${step.id}`}>
                    {step.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              {/* Event Details Step */}
              {currentStep === 'details' && (
                <motion.div
                  key="details"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2" data-testid="text-details-title">
                        <Calendar className="h-5 w-5" />
                        Event Details
                      </CardTitle>
                      <CardDescription data-testid="text-details-description">
                        Tell us about your celebration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...eventForm}>
                        <form className="space-y-6">
                          <FormField
                            control={eventForm.control}
                            name="eventType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel data-testid="label-event-type">What are you celebrating?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-event-type">
                                      <SelectValue placeholder="Select event type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {eventTypes.map(event => (
                                      <SelectItem key={event.id} value={event.id} data-testid={`option-event-${event.id}`}>
                                        <div className="flex items-center gap-2">
                                          <span>{event.emoji}</span>
                                          <div>
                                            <div className="font-medium">{event.label}</div>
                                            <div className="text-xs text-gray-500">{event.description}</div>
                                          </div>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={eventForm.control}
                            name="groupSize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel data-testid="label-group-size">Group Size</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    min={8} 
                                    max={75} 
                                    {...field}
                                    onChange={e => field.onChange(parseInt(e.target.value) || 8)}
                                    data-testid="input-group-size"
                                  />
                                </FormControl>
                                <FormDescription>
                                  {slotDetails.type === 'disco' ? 
                                    'Number of tickets needed' : 
                                    `Minimum 8, maximum ${slotDetails.capacity || 75} for this boat`
                                  }
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={eventForm.control}
                            name="specialRequests"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel data-testid="label-special-requests">Special Requests (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Any special arrangements, dietary restrictions, or requests..."
                                    rows={3}
                                    {...field}
                                    data-testid="textarea-special-requests"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Let us know about any special arrangements you'd like
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Contact Information Step */}
              {currentStep === 'contact' && (
                <motion.div
                  key="contact"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2" data-testid="text-contact-title">
                        <User className="h-5 w-5" />
                        Contact Information
                      </CardTitle>
                      <CardDescription data-testid="text-contact-description">
                        We'll use this information for booking confirmations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...contactForm}>
                        <form className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={contactForm.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel data-testid="label-first-name">First Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} data-testid="input-first-name" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={contactForm.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel data-testid="label-last-name">Last Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} data-testid="input-last-name" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={contactForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel data-testid="label-email">Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" {...field} data-testid="input-email" />
                                </FormControl>
                                <FormDescription>
                                  You'll receive booking confirmation and details here
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={contactForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel data-testid="label-phone">Phone Number</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="+1 (512) 488-5892" {...field} data-testid="input-phone" />
                                </FormControl>
                                <FormDescription>
                                  For booking confirmations and day-of coordination
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="space-y-4">
                            <FormField
                              control={contactForm.control}
                              name="agreeToTerms"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      data-testid="checkbox-terms"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm">
                                      I agree to the <a href="/terms" className="text-blue-600 hover:underline" data-testid="link-terms">Terms & Conditions</a> and <a href="/privacy" className="text-blue-600 hover:underline" data-testid="link-privacy">Privacy Policy</a>
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={contactForm.control}
                              name="agreeToMarketing"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      data-testid="checkbox-marketing"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm">
                                      Send me updates about special offers and new cruise packages
                                    </FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Add-Ons Step */}
              {currentStep === 'products' && slotDetails.type !== 'disco' && (
                <motion.div
                  key="products"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2" data-testid="text-addons-title">
                        <Gift className="h-5 w-5" />
                        Enhance Your Experience
                      </CardTitle>
                      <CardDescription data-testid="text-addons-description">
                        Optional add-ons to make your cruise even more special
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {addOnPackages.map(addon => (
                          <div
                            key={addon.id}
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-all",
                              selectedAddOns.includes(addon.id) 
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                                : "border-gray-200 hover:border-gray-300"
                            )}
                            onClick={() => toggleAddOn(addon.id)}
                            data-testid={`card-addon-${addon.id}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className="text-2xl" data-testid={`text-addon-icon-${addon.id}`}>{addon.icon}</div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold" data-testid={`text-addon-name-${addon.id}`}>{addon.name}</h3>
                                    {addon.popular && (
                                      <Badge className="bg-orange-100 text-orange-700" data-testid={`badge-popular-${addon.id}`}>
                                        <Star className="h-3 w-3 mr-1" />
                                        Popular
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2" data-testid={`text-addon-description-${addon.id}`}>
                                    {addon.description}
                                  </p>
                                  <ul className="text-xs text-gray-500 space-y-1">
                                    {addon.features.map((feature, index) => (
                                      <li key={index} className="flex items-center gap-1" data-testid={`text-addon-feature-${addon.id}-${index}`}>
                                        <CheckCircle className="h-3 w-3 text-green-500" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-lg" data-testid={`text-addon-price-${addon.id}`}>
                                  ${addon.price}
                                </div>
                                <Checkbox 
                                  checked={selectedAddOns.includes(addon.id)}
                                  onChange={() => {}}
                                  data-testid={`checkbox-addon-${addon.id}`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Skip add-ons for disco cruises */}
              {currentStep === 'products' && slotDetails.type === 'disco' && (
                <motion.div
                  key="disco-products"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2" data-testid="text-disco-included-title">
                        Everything's Included!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300" data-testid="text-disco-included-description">
                        Your disco cruise ticket includes DJ, dancing, party atmosphere, and an unforgettable experience.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Review Step */}
              {currentStep === 'review' && (
                <motion.div
                  key="review"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2" data-testid="text-review-title">
                        <CheckCircle className="h-5 w-5" />
                        Review Your Booking
                      </CardTitle>
                      <CardDescription data-testid="text-review-description">
                        Please review all details before proceeding to payment
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Event Summary */}
                        <div>
                          <h4 className="font-semibold mb-3" data-testid="text-event-summary-title">Event Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-300">Event Type:</span>
                              <div className="font-medium" data-testid="text-review-event-type">
                                {eventTypes.find(e => e.id === eventForm.getValues('eventType'))?.label}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-300">Group Size:</span>
                              <div className="font-medium" data-testid="text-review-group-size">
                                {eventForm.getValues('groupSize')} {slotDetails.type === 'disco' ? 'tickets' : 'guests'}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-300">Date & Time:</span>
                              <div className="font-medium" data-testid="text-review-datetime">
                                {format(new Date(slotDetails.date), 'MMM d, yyyy')} • {formatTimeForDisplay(slotDetails.startTime)} - {formatTimeForDisplay(slotDetails.endTime)}
                              </div>
                            </div>
                            {slotDetails.type !== 'disco' && (
                              <div>
                                <span className="text-gray-600 dark:text-gray-300">Boat:</span>
                                <div className="font-medium" data-testid="text-review-boat">
                                  {slotDetails.boatName}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <Separator />

                        {/* Contact Summary */}
                        <div>
                          <h4 className="font-semibold mb-3" data-testid="text-contact-summary-title">Contact Information</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-300">Name:</span>
                              <div className="font-medium" data-testid="text-review-name">
                                {contactForm.getValues('firstName')} {contactForm.getValues('lastName')}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-300">Email:</span>
                              <div className="font-medium" data-testid="text-review-email">
                                {contactForm.getValues('email')}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-300">Phone:</span>
                              <div className="font-medium" data-testid="text-review-phone">
                                {contactForm.getValues('phone')}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Add-ons Summary */}
                        {selectedAddOns.length > 0 && (
                          <>
                            <Separator />
                            <div>
                              <h4 className="font-semibold mb-3" data-testid="text-addons-summary-title">Selected Add-Ons</h4>
                              <div className="space-y-2">
                                {selectedAddOns.map(addonId => {
                                  const addon = addOnPackages.find(a => a.id === addonId);
                                  return addon ? (
                                    <div key={addonId} className="flex justify-between text-sm" data-testid={`text-review-addon-${addonId}`}>
                                      <span>{addon.name}</span>
                                      <span className="font-medium">${addon.price}</span>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Special Requests */}
                        {eventForm.getValues('specialRequests') && (
                          <>
                            <Separator />
                            <div>
                              <h4 className="font-semibold mb-3" data-testid="text-special-requests-title">Special Requests</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-review-special-requests">
                                {eventForm.getValues('specialRequests')}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2" data-testid="text-payment-title">
                        <CreditCard className="h-5 w-5" />
                        Secure Payment
                      </CardTitle>
                      <CardDescription data-testid="text-payment-description">
                        Complete your booking with a secure payment
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <CreditCard className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2" data-testid="text-payment-ready-title">Ready to Complete Your Booking</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6" data-testid="text-payment-ready-description">
                          Click below to proceed to our secure payment page
                        </p>
                        {pricing && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                              {pricing.type === 'disco' ? 'Total Payment' : 'Deposit Required (25%)'}
                            </div>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid="text-payment-amount">
                              {formatCurrency(pricing.depositAmount)}
                            </div>
                            {pricing.type === 'private' && (
                              <div className="text-xs text-gray-500 mt-1" data-testid="text-payment-balance">
                                Balance due: {formatCurrency(pricing.total - pricing.depositAmount)}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={currentStep === 'details'}
                className="flex items-center gap-2"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={isProcessing || calculatePricing.isPending}
                className="flex items-center gap-2"
                data-testid="button-next"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : currentStep === 'payment' ? (
                  <>
                    Complete Booking
                    <CreditCard className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" data-testid="text-summary-title">
                    <Ship className="h-5 w-5" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Slot Details */}
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl mb-2" data-testid="text-summary-icon">{slotDetails.icon}</div>
                    <div className="font-semibold" data-testid="text-summary-cruise-type">
                      {slotDetails.type === 'disco' ? 'Disco Cruise' : 'Private Charter'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-summary-date">
                      {format(new Date(slotDetails.date), 'EEEE, MMM d')}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-summary-time">
                      {formatTimeForDisplay(slotDetails.startTime)} - {formatTimeForDisplay(slotDetails.endTime)}
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  {pricing && (
                    <div className="space-y-3">
                      <h4 className="font-semibold" data-testid="text-pricing-breakdown-title">Pricing Breakdown</h4>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span data-testid="text-pricing-subtotal-label">
                            {pricing.type === 'disco' ? `${pricing.quantity} tickets` : 'Cruise base price'}
                          </span>
                          <span data-testid="text-pricing-subtotal-amount">{formatCurrency(pricing.subtotal)}</span>
                        </div>
                        
                        {selectedAddOns.length > 0 && selectedAddOns.map(addonId => {
                          const addon = addOnPackages.find(a => a.id === addonId);
                          return addon ? (
                            <div key={addonId} className="flex justify-between">
                              <span data-testid={`text-pricing-addon-${addonId}-label`}>{addon.name}</span>
                              <span data-testid={`text-pricing-addon-${addonId}-amount`}>${addon.price}</span>
                            </div>
                          ) : null;
                        })}
                        
                        {pricing.gratuity && pricing.gratuity > 0 && (
                          <div className="flex justify-between">
                            <span data-testid="text-pricing-gratuity-label">Crew gratuity</span>
                            <span data-testid="text-pricing-gratuity-amount">{formatCurrency(pricing.gratuity)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <span data-testid="text-pricing-tax-label">Tax</span>
                          <span data-testid="text-pricing-tax-amount">{formatCurrency(pricing.tax)}</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between font-semibold">
                        <span data-testid="text-pricing-total-label">Total</span>
                        <span data-testid="text-pricing-total-amount">{formatCurrency(pricing.total)}</span>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="text-sm">
                          <div className="font-semibold text-green-700 dark:text-green-300" data-testid="text-pricing-deposit-label">
                            {pricing.type === 'disco' ? 'Total Payment' : 'Deposit Required'}
                          </div>
                          <div className="text-lg font-bold text-green-600 dark:text-green-400" data-testid="text-pricing-deposit-amount">
                            {formatCurrency(pricing.depositAmount)}
                          </div>
                          {pricing.type === 'private' && (
                            <div className="text-xs text-green-600 dark:text-green-400 mt-1" data-testid="text-pricing-deposit-note">
                              Balance due day of cruise
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="mt-6">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3" data-testid="text-help-title">Need Help?</h4>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span data-testid="text-help-phone">(512) 488-5892</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span data-testid="text-help-email">clientservices@premierpartycruises.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}