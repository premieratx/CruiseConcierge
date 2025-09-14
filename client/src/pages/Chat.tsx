import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { 
  Ship, ChevronRight, ArrowLeft, DollarSign, Users, 
  Calendar as CalendarIcon, Clock, Check, X, ChevronLeft, 
  User, Mail, Phone, MapPin, Star, Sparkles, CreditCard 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { format, addDays, isBefore, isAfter, startOfDay } from 'date-fns';
import type { InsertContact, InsertProject, PricingPreview } from '@shared/schema';

type ChatStep = 'welcome' | 'contact-info' | 'date-selection' | 'event-details' | 'complete';

interface BookingData {
  eventType: string;
  eventTypeLabel: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: Date | undefined;
  preferredTime: string;
  preferredTimeLabel: string;
  groupSize: string;
  specialRequests: string;
  budget: string;
}

const eventTypes = [
  { id: 'bachelor', label: 'Bachelor Party', emoji: '🎉', description: 'Celebrate the groom-to-be' },
  { id: 'bachelorette', label: 'Bachelorette Party', emoji: '💃', description: 'Party with the bride-to-be' },
  { id: 'corporate', label: 'Corporate Event', emoji: '💼', description: 'Team building & networking' },
  { id: 'wedding', label: 'Wedding Reception', emoji: '💒', description: 'Celebrate your special day' },
  { id: 'birthday', label: 'Birthday Party', emoji: '🎂', description: 'Make it memorable' },
  { id: 'graduation', label: 'Graduation Party', emoji: '🎓', description: 'Celebrate achievements' },
  { id: 'anniversary', label: 'Anniversary', emoji: '💝', description: 'Mark your milestone' },
  { id: 'other', label: 'Other Event', emoji: '🎊', description: 'Custom celebration' },
];

// Dynamic time slots based on day of week
const getTimeSlotsForDate = (date: Date) => {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
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

const groupSizeOptions = [
  { value: '10', label: '1-10', description: 'Intimate gathering' },
  { value: '20', label: '11-20', description: 'Small party' },
  { value: '30', label: '21-30', description: 'Medium group' },
  { value: '40', label: '31-40', description: 'Large party' },
  { value: '50', label: '41-50', description: 'Big celebration' },
  { value: '75', label: '51-75', description: 'Grand event' },
];

export default function Chat() {
  const [currentStep, setCurrentStep] = useState<ChatStep>('welcome');
  const [pricing, setPricing] = useState<PricingPreview | null>(null);
  const [formData, setFormData] = useState<BookingData>({
    eventType: '',
    eventTypeLabel: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventDate: undefined,
    preferredTime: '',
    preferredTimeLabel: '',
    groupSize: '',
    specialRequests: '',
    budget: '',
  });
  const { toast } = useToast();

  const steps = [
    { id: 'welcome', label: 'Event Type', number: 1 },
    { id: 'contact-info', label: 'Contact', number: 2 },
    { id: 'date-selection', label: 'Date', number: 3 },
    { id: 'event-details', label: 'Details & Booking', number: 4 },
  ];

  const currentStepNumber = steps.find(s => s.id === currentStep)?.number || 1;
  const progress = (currentStepNumber / steps.length) * 100;

  // Fetch pricing when date, time, and group size are selected
  useEffect(() => {
    if (formData.eventDate && formData.preferredTime && formData.groupSize) {
      fetchPricing();
    }
  }, [formData.eventDate, formData.preferredTime, formData.groupSize]);

  const fetchPricing = async () => {
    try {
      const res = await apiRequest('POST', '/api/pricing/cruise', {
        groupSize: formData.groupSize,
        eventDate: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : '',
        timeSlot: formData.preferredTime,
      });
      const response = await res.json();
      setPricing(response);
    } catch (error) {
      console.error('Failed to fetch pricing:', error);
      setPricing(null);
    }
  };

  // Check if a date is available (not in the past, not blocked)
  const isDateAvailable = (date: Date) => {
    const today = startOfDay(new Date());
    const maxDate = addDays(today, 365);
    return !isBefore(date, today) && !isAfter(date, maxDate);
  };

  // Create deposit payment mutation
  const createDepositPayment = useMutation({
    mutationFn: async () => {
      if (!pricing) throw new Error('No pricing data available');
      
      const res = await apiRequest('POST', '/api/create-payment-intent', {
        amount: pricing.depositAmount,
        metadata: {
          type: 'deposit',
          eventType: formData.eventType,
          eventDate: formData.eventDate?.toISOString(),
          groupSize: formData.groupSize,
        }
      });
      const { clientSecret } = await res.json();
      
      // Redirect to Stripe checkout or handle payment
      window.location.href = `/checkout?client_secret=${clientSecret}&return_url=${encodeURIComponent(window.location.origin + '/booking-confirmed')}`;
    },
    onError: () => {
      toast({ 
        title: 'Payment Error', 
        description: 'Unable to process payment. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Create lead mutation
  const createLead = useMutation({
    mutationFn: async (data: BookingData) => {
      // First create the contact
      const contact: InsertContact = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone || undefined,
      };
      
      const contactRes = await apiRequest('POST', '/api/contacts', contact);
      const contactResponse = await contactRes.json();
      
      // Then create the project with pricing info (without date first due to validation issues)
      const project: InsertProject = {
        contactId: contactResponse.id,
        title: `${data.eventTypeLabel} - ${data.firstName} ${data.lastName}`,
        groupSize: parseInt(data.groupSize) || undefined,
        eventType: data.eventType,
        specialRequests: data.specialRequests || undefined,
        preferredTime: data.preferredTime || undefined,
        budget: pricing?.total || (data.budget ? Math.round(parseFloat(data.budget) * 100) : undefined),
        leadSource: 'chat',
        orgId: 'org_demo',
        status: 'NEW',
        pipelinePhase: 'ph_new',
        tags: [],
      };
      
      const projectRes = await apiRequest('POST', '/api/projects', project);
      const projectResponse = await projectRes.json();
      
      // Update project with date separately to work around validation issue
      if (data.eventDate) {
        await apiRequest('PATCH', `/api/projects/${projectResponse.id}`, {
          projectDate: data.eventDate.toISOString(),
        });
      }
      
      // Create a quote from the pricing calculation
      if (pricing && pricing.breakdown) {
        const quoteItems = [
          {
            name: `${pricing.breakdown.boatType} - ${pricing.breakdown.dayName} ${pricing.breakdown.cruiseDuration}-Hour Cruise`,
            unitPrice: pricing.breakdown.baseCruiseCost * 100, // Convert to cents
            qty: 1,
            taxable: true,
          }
        ];
        
        // Add crew fee as separate line item if applicable
        if (pricing.breakdown.crewFee > 0) {
          quoteItems.push({
            name: 'Additional Crew (Texas Law Requirement)',
            unitPrice: pricing.breakdown.crewFee * 100,
            qty: 1,
            taxable: true,
          });
        }
        
        const quote = {
          projectId: projectResponse.id,
          items: quoteItems,
          subtotal: pricing.subtotal,
          discountTotal: pricing.discountTotal,
          tax: pricing.tax,
          gratuity: pricing.gratuity,
          total: pricing.total,
          perPersonCost: pricing.perPersonCost,
          depositRequired: pricing.depositRequired,
          depositPercent: pricing.depositPercent,
          depositAmount: pricing.depositAmount,
          paymentSchedule: pricing.paymentSchedule,
          status: 'DRAFT',
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Valid for 7 days
        };
        
        const quoteRes = await apiRequest('POST', '/api/quotes', quote);
        const quoteResponse = await quoteRes.json();
        
        // Send email and SMS with quote link
        await apiRequest('POST', '/api/quotes/' + quoteResponse.id + '/send', {
          email: contact.email,
          phone: contact.phone,
        });
      }
      
      return { contact: contactResponse, project: projectResponse };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setCurrentStep('complete');
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

  const handleEventTypeSelect = (eventType: string, label: string) => {
    setFormData({ ...formData, eventType, eventTypeLabel: label });
    setCurrentStep('contact-info');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
      setCurrentStep('date-selection');
    }
  };

  const handleSendQuote = () => {
    createLead.mutate(formData);
  };

  const handleEventDetailsSubmit = () => {
    if (formData.eventDate && formData.preferredTime && formData.groupSize) {
      handleSendQuote();
    }
  };

  // Create full payment mutation
  const createFullPayment = useMutation({
    mutationFn: async () => {
      if (!pricing) throw new Error('No pricing data available');
      
      const res = await apiRequest('POST', '/api/create-payment-intent', {
        amount: pricing.total,
        metadata: {
          type: 'full_payment',
          eventType: formData.eventType,
          eventDate: formData.eventDate?.toISOString(),
          groupSize: formData.groupSize,
        }
      });
      const { clientSecret } = await res.json();
      
      // Redirect to Stripe checkout or handle payment
      window.location.href = `/checkout?client_secret=${clientSecret}&return_url=${encodeURIComponent(window.location.origin + '/booking-confirmed')}`;
    },
    onError: () => {
      toast({ 
        title: 'Payment Error', 
        description: 'Unable to process payment. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      setFormData({ ...formData, eventDate: date });
      // Auto-progress to next step when date is selected
      setCurrentStep('event-details');
    }
  };

  const handleTimeSelect = (timeId: string, timeLabel: string, time: string) => {
    setFormData({ ...formData, preferredTime: timeId, preferredTimeLabel: `${timeLabel} (${time})` });
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Persistent Summary Bar */}
      {currentStep !== 'welcome' && currentStep !== 'complete' && (
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3">
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Ship className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold">Cruise Booking</h3>
                </div>
                <span className="text-sm text-muted-foreground">
                  Step {currentStepNumber} of {steps.length}: {steps.find(s => s.id === currentStep)?.label}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Summary Info */}
            <div className="flex flex-wrap gap-3 text-sm">
              {formData.eventTypeLabel && (
                <Badge variant="secondary" className="flex items-center gap-1.5 py-1 px-2">
                  <span>{eventTypes.find(t => t.id === formData.eventType)?.emoji}</span>
                  <span>{formData.eventTypeLabel}</span>
                </Badge>
              )}
              
              {formData.firstName && formData.lastName && (
                <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2">
                  <User className="h-3.5 w-3.5" />
                  <span>{formData.firstName} {formData.lastName}</span>
                </Badge>
              )}
              
              {formData.email && (
                <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate max-w-[200px]">{formData.email}</span>
                </Badge>
              )}
              
              {formData.eventDate && (
                <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>{format(formData.eventDate, 'MMM dd, yyyy')}</span>
                </Badge>
              )}
              
              {formData.preferredTimeLabel && (
                <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{formData.preferredTimeLabel}</span>
                </Badge>
              )}
              
              {formData.groupSize && (
                <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2">
                  <Users className="h-3.5 w-3.5" />
                  <span>{formData.groupSize} guests</span>
                </Badge>
              )}
              
              {pricing && (
                <Badge className="ml-auto flex items-center gap-1.5 py-1 px-3 bg-primary">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span className="font-bold">
                    {formatCurrency(pricing.total)}
                  </span>
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Main Content */}
      <div className={cn(
        "flex items-center justify-center p-4",
        currentStep === 'welcome' || currentStep === 'complete' ? "min-h-screen" : "min-h-[calc(100vh-100px)]"
      )}>
        {/* Welcome Step - Full Screen Event Selection */}
        {currentStep === 'welcome' && (
          <div className="w-full max-w-6xl">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                  <Ship className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-3">
                AI Cruise Booking Assistant
              </h1>
              <p className="text-xl text-muted-foreground">
                Let's plan your perfect cruise experience
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">What type of event are you planning?</h2>
                <p className="text-muted-foreground">Select the option that best describes your celebration</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {eventTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant="outline"
                    className="h-32 flex flex-col gap-2 hover:scale-105 transition-all hover:border-primary hover:shadow-lg group relative overflow-hidden"
                    onClick={() => handleEventTypeSelect(type.id, type.label)}
                    data-testid={`button-event-${type.id}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/5 group-hover:to-primary/10 transition-all" />
                    <span className="text-3xl mb-1">{type.emoji}</span>
                    <span className="font-semibold">{type.label}</span>
                    <span className="text-xs text-muted-foreground">{type.description}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Step */}
        {currentStep === 'contact-info' && (
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep('welcome')}
                className="w-fit mb-2"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <CardTitle className="text-2xl">Let's get to know you</CardTitle>
              <CardDescription>We'll use this information to send you your quote</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      placeholder="John"
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      placeholder="Doe"
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="john.doe@example.com"
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    data-testid="input-phone"
                  />
                  <p className="text-xs text-muted-foreground">We'll text you updates about your booking</p>
                </div>
                <Button type="submit" className="w-full" size="lg" data-testid="button-continue">
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Date Selection Step */}
        {currentStep === 'date-selection' && (
          <div className="w-full max-w-5xl">
            <div className="text-center mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep('contact-info')}
                className="mb-4"
                data-testid="button-back-date"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h2 className="text-3xl font-bold mb-2">Select Your Cruise Date</h2>
              <p className="text-muted-foreground text-lg">Choose an available date for your event</p>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-3xl">
                <Calendar
                  mode="single"
                  selected={formData.eventDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => !isDateAvailable(date)}
                  className="rounded-lg border shadow-lg p-8 bg-card scale-110 transform mx-auto"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center text-lg font-semibold",
                    caption_label: "text-lg font-semibold",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-14 font-normal text-sm",
                    row: "flex w-full mt-2",
                    cell: "h-14 w-14 text-center text-sm p-0 relative",
                    day: "h-14 w-14 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground font-bold",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
                    day_hidden: "invisible",
                  }}
                />
                <div className="mt-6 text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Available dates are highlighted. Select a date to continue.
                  </p>
                  {formData.eventDate && (
                    <p className="text-lg font-medium text-primary">
                      Selected: {format(formData.eventDate, 'EEEE, MMMM d, yyyy')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Event Details & Booking Step */}
        {currentStep === 'event-details' && (
          <div className="w-full max-w-6xl space-y-6">
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep('date-selection')}
                className="mb-4"
                data-testid="button-back-details"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h2 className="text-3xl font-bold mb-2">Complete Your Booking</h2>
              <p className="text-muted-foreground text-lg">Select your preferences and book your cruise</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Time Slots & Group Size */}
              <div className="lg:col-span-2 space-y-6">
                {/* Time Selection Based on Day of Week */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Select Your Time Slot</CardTitle>
                    <CardDescription>
                      Available slots for {formData.eventDate ? format(formData.eventDate, 'EEEE, MMMM d') : 'your selected date'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {formData.eventDate && getTimeSlotsForDate(formData.eventDate).map((slot) => (
                        <Button
                          key={slot.id}
                          type="button"
                          variant={formData.preferredTime === slot.id ? "default" : "outline"}
                          className={cn(
                            "h-20 flex flex-col items-center justify-center gap-1 relative",
                            slot.popular && "border-primary"
                          )}
                          onClick={() => {
                            setFormData({ ...formData, preferredTime: slot.id, preferredTimeLabel: slot.label });
                          }}
                          data-testid={`button-time-${slot.id}`}
                        >
                          {slot.popular && (
                            <Badge className="absolute top-1 right-1 text-xs" variant="secondary">
                              Popular
                            </Badge>
                          )}
                          <span className="text-2xl">{slot.icon}</span>
                          <span className="font-medium">{slot.label}</span>
                          <span className="text-xs text-muted-foreground">{slot.time}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Group Size Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">How Many Guests?</CardTitle>
                    <CardDescription>Select the size of your party</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {groupSizeOptions.map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={formData.groupSize === option.value ? "default" : "outline"}
                          className="h-20 flex flex-col items-center justify-center gap-1"
                          onClick={() => setFormData({ ...formData, groupSize: option.value })}
                          data-testid={`button-size-${option.value}`}
                        >
                          <span className="text-lg font-bold">{option.label}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Special Requests */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Special Requests</CardTitle>
                    <CardDescription>Optional - Let us know about any special needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="Tell us about any special requirements, dietary restrictions, or celebration details..."
                      rows={3}
                      className="resize-none"
                      data-testid="textarea-special-requests"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Pricing & Booking */}
              <div className="space-y-6">
                {/* Live Pricing Display */}
                {pricing && pricing.breakdown && (
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Your Quote
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Vessel:</span>
                          <span className="font-medium">{pricing.breakdown.boatType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{pricing.breakdown.cruiseDuration} hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Base Price:</span>
                          <span>{formatCurrency(pricing.breakdown.baseCruiseCost * 100)}</span>
                        </div>
                        {pricing.breakdown.crewFee > 0 && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Crew Fee:</span>
                            <span>{formatCurrency(pricing.breakdown.crewFee * 100)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gratuity (20%):</span>
                          <span>{formatCurrency(pricing.breakdown.gratuityAmount * 100)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax (8.25%):</span>
                          <span>{formatCurrency(pricing.breakdown.taxAmount * 100)}</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="text-center space-y-2">
                        <p className="text-2xl font-bold">{formatCurrency(pricing.total)}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(pricing.perPersonCost)} per person
                        </p>
                        <Badge variant="secondary">
                          {pricing.depositPercent}% Deposit: {formatCurrency(pricing.depositAmount)}
                        </Badge>
                      </div>

                      {pricing.urgencyMessage && (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                          <p className="text-sm text-amber-600 dark:text-amber-400">
                            {pricing.urgencyMessage}
                          </p>
                        </div>
                      )}

                      <div className="space-y-3">
                        {/* Dual Payment Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => createDepositPayment.mutate()}
                            disabled={!formData.eventDate || !formData.preferredTime || !formData.groupSize || createDepositPayment.isPending}
                            className="text-xs"
                            data-testid="button-pay-deposit"
                          >
                            {createDepositPayment.isPending ? 'Processing...' : `Pay Deposit`}
                          </Button>
                          <Button
                            onClick={() => createFullPayment.mutate()}
                            disabled={!formData.eventDate || !formData.preferredTime || !formData.groupSize || createFullPayment.isPending}
                            variant="outline"
                            className="text-xs"
                            data-testid="button-pay-full"
                          >
                            {createFullPayment.isPending ? 'Processing...' : 'Pay in Full'}
                          </Button>
                        </div>

                        <Separator />

                        {/* Send Quote Button */}
                        <Button
                          onClick={handleSendQuote}
                          disabled={!formData.eventDate || !formData.preferredTime || !formData.groupSize || createLead.isPending}
                          className="w-full"
                          variant="default"
                          data-testid="button-send-quote"
                        >
                          {createLead.isPending ? (
                            <span className="animate-pulse">Sending Quote...</span>
                          ) : (
                            <>Send My Quote</>  
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {!pricing && formData.eventDate && formData.preferredTime && formData.groupSize && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <div className="animate-pulse">
                          <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
                          <div className="h-8 bg-muted rounded w-1/2 mx-auto"></div>
                        </div>
                        <p className="text-sm text-muted-foreground">Calculating pricing...</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

        )}


        {/* Confirmation Step */}
        {currentStep === 'complete' && (
          <div className="w-full max-w-5xl space-y-8">
            {/* Large Success Header */}
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              
              <div className="space-y-3">
                <h1 className="text-4xl font-bold text-center">We Have Sent You Your Quote Via Email And Text</h1>
                <p className="text-lg text-muted-foreground">
                  Check your inbox and messages for the complete interactive quote with booking link.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm">
                <Badge variant="secondary" className="gap-1 py-2 px-3">
                  <Mail className="h-4 w-4" />
                  Email sent to {formData.email}
                </Badge>
                {formData.phone && (
                  <Badge variant="secondary" className="gap-1 py-2 px-3">
                    <Phone className="h-4 w-4" />
                    SMS sent to {formData.phone}
                  </Badge>
                )}
              </div>
            </div>

            {/* Complete Booking Summary */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Event Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event</span>
                    <span className="font-medium">{formData.eventTypeLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">
                      {formData.eventDate ? format(formData.eventDate, 'MMM dd, yyyy') : 'TBD'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{formData.preferredTimeLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guests</span>
                    <span className="font-medium">{formData.groupSize}</span>
                  </div>
                  {formData.specialRequests && (
                    <div className="pt-2 border-t">
                      <span className="text-muted-foreground text-sm">Special Requests</span>
                      <p className="text-sm mt-1">{formData.specialRequests}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-xs">{formData.email}</span>
                  </div>
                  {formData.phone && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Pricing Summary */}
              {pricing && (
                <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Pricing Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-lg">
                        <span>Total</span>
                        <span className="font-bold">{formatCurrency(pricing.total)}</span>
                      </div>
                      <div className="flex justify-between text-primary font-semibold">
                        <span>Deposit Required ({pricing.depositPercent}%)</span>
                        <span>{formatCurrency(pricing.depositAmount)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Remaining Balance</span>
                        <span>{formatCurrency(pricing.total - pricing.depositAmount)}</span>
                      </div>
                      
                      {pricing.breakdown && (
                        <div className="pt-4 border-t space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Base Cruise Cost</span>
                            <span>{formatCurrency(pricing.breakdown.baseCruiseCost * 100)}</span>
                          </div>
                          {pricing.breakdown.crewFee > 0 && (
                            <div className="flex justify-between">
                              <span>Additional Crew Fee</span>
                              <span>{formatCurrency(pricing.breakdown.crewFee * 100)}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span>{formatCurrency(pricing.tax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gratuity</span>
                            <span>{formatCurrency(pricing.gratuity)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Dual Payment Buttons Section */}
            <div className="text-center space-y-4">
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <Button
                  onClick={() => createDepositPayment.mutate()}
                  size="lg"
                  className="h-14 text-sm font-semibold"
                  disabled={createDepositPayment.isPending}
                  data-testid="button-book-deposit"
                >
                  {createDepositPayment.isPending ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay Deposit
                      {pricing && (
                        <span className="text-xs block">{formatCurrency(pricing.depositAmount)}</span>
                      )}
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => createFullPayment.mutate()}
                  size="lg"
                  variant="outline"
                  className="h-14 text-sm font-semibold"
                  disabled={createFullPayment.isPending}
                  data-testid="button-book-full"
                >
                  {createFullPayment.isPending ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay in Full
                      {pricing && (
                        <span className="text-xs block">{formatCurrency(pricing.total)}</span>
                      )}
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Secure your booking immediately with payment, or we'll send you a detailed quote to review first.
              </p>
            </div>

            {/* What Happens Next */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Our team will confirm your availability within 24 hours and reach out with any questions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>If you book now, we'll secure your date immediately with the deposit payment</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>We'll work with you to plan every detail of your perfect cruise experience</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>The remaining balance is due 2 weeks before your event</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep('welcome');
                  setPricing(null);
                  setFormData({
                    eventType: '',
                    eventTypeLabel: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    eventDate: undefined,
                    preferredTime: '',
                    preferredTimeLabel: '',
                    groupSize: '',
                    specialRequests: '',
                    budget: '',
                  });
                }}
                className="flex-1"
                data-testid="button-start-over"
              >
                Book Another Cruise
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="flex-1"
                data-testid="button-go-home"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}