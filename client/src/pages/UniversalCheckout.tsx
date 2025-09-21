/**
 * Universal Intelligent Checkout System
 * Seamless booking experience across all entry points
 * Premier Party Cruises CRM System
 */

import { useState, useEffect } from 'react';
import { useLocation, useRoute, Link } from 'wouter';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, ClockIcon, UsersIcon, BotIcon as BoatIcon, CreditCardIcon, CheckCircle2, AlertCircle, InfoIcon, ArrowLeft, ArrowRight, EditIcon, StarIcon, TrendingUpIcon, SparklesIcon, MusicIcon, PartyPopperIcon, PercentIcon, TagIcon, FileTextIcon, ShieldCheck, AlertTriangle, MapPin, Anchor, Ship, DollarSign } from 'lucide-react';
import { useCheckoutContext } from '@/hooks/use-checkout-context';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, formatDate, formatTimeForDisplay } from '@shared/formatters';
import { CheckoutEntryPoint, BoatOption, DiscoPackageOption, AddOnPackageOption } from '@shared/schema';
import { EVENT_TYPES, getBestDealRecommendation, compareDiscoVsPrivate, PRICING_POLICIES } from '@shared/constants';
import { PricingPolicyDisplay, PolicySummary } from '@/components/PricingPolicyDisplay';

// Note: These checkout components will be implemented as needed
// import CheckoutBoatSelector from '@/components/checkout/CheckoutBoatSelector';
// import CheckoutTimeSelector from '@/components/checkout/CheckoutTimeSelector';
// import CheckoutContactForm from '@/components/checkout/CheckoutContactForm';
// import CheckoutPaymentForm from '@/components/checkout/CheckoutPaymentForm';
// import CheckoutPricingDisplay from '@/components/checkout/CheckoutPricingDisplay';
// import BachelorComparisonWidget from '@/components/checkout/BachelorComparisonWidget';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface UniversalCheckoutProps {
  entryPoint?: CheckoutEntryPoint;
  preselectedData?: any;
}

// Smart Recommendations Component
function SmartRecommendationsCard({ selections, pricing, onSelectCruiseType }: {
  selections: any;
  pricing: any;
  onSelectCruiseType: (type: 'private' | 'disco') => void;
}) {
  // Get intelligent recommendations
  const recommendation = getBestDealRecommendation(
    selections.eventDate,
    selections.groupSize
  );
  
  // Get disco vs private comparison for available days
  const discoComparison = compareDiscoVsPrivate(
    selections.eventDate,
    selections.groupSize
  );
  
  if (!recommendation && !discoComparison) return null;
  
  return (
    <Card className="border-amber-200 dark:border-amber-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
          <SparklesIcon className="h-5 w-5" />
          Smart Recommendations
        </CardTitle>
        <CardDescription>
          Ways to save on your cruise booking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Best Deal Recommendation */}
        {recommendation && (
          <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <TrendingUpIcon className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-amber-900 dark:text-amber-100">
                  {recommendation.type === 'different_day' && 'Save by changing your date'}
                  {recommendation.type === 'different_cruise' && 'Consider disco cruise option'}
                  {recommendation.type === 'different_package' && 'Package upgrade savings'}
                </h4>
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  {recommendation.message}
                </p>
                {recommendation.savings > 0 && (
                  <div className="text-sm font-bold text-green-600 dark:text-green-400">
                    Save {formatCurrency(recommendation.savings)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Disco vs Private Comparison */}
        {discoComparison && (
          <div className="space-y-2">
            {discoComparison.discoAvailable && (
              <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <MusicIcon className="h-4 w-4 text-purple-600 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                      Disco Cruise Available
                    </h4>
                    <p className="text-xs text-purple-800 dark:text-purple-200">
                      Join our party boat for {formatCurrency(discoComparison.discoPrice)} 
                      ({formatCurrency(discoComparison.discoPrice / selections.groupSize)} per person)
                    </p>
                    {discoComparison.savings > 0 ? (
                      <div className="text-sm font-bold text-green-600 dark:text-green-400">
                        Save {formatCurrency(discoComparison.savings)} vs private cruise
                      </div>
                    ) : discoComparison.savings < 0 ? (
                      <div className="text-sm text-muted-foreground">
                        Private cruise saves {formatCurrency(Math.abs(discoComparison.savings))}
                      </div>
                    ) : null}
                  </div>
                </div>
                {selections.cruiseType === 'private' && discoComparison.savings > 0 && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2 w-full"
                    onClick={() => onSelectCruiseType('disco')}
                    data-testid="button-switch-disco"
                  >
                    Switch to Disco Cruise
                  </Button>
                )}
              </div>
            )}
            
            {!discoComparison.discoAvailable && selections.cruiseType === 'disco' && (
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <InfoIcon className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                      Consider Alternative Days
                    </h4>
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      Disco cruises available Friday & Saturday. Private cruise recommended for your selected day.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* General Savings Tips */}
        <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-gray-600 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                Booking Tips
              </h4>
              <ul className="text-xs text-gray-800 dark:text-gray-200 space-y-1">
                <li>• Book 30+ days in advance for lower deposit ({PRICING_POLICIES.deposit.standard.percentage}% vs {PRICING_POLICIES.deposit.urgent.percentage}%)</li>
                <li>• Weekday cruises offer the best value</li>
                <li>• Group size efficiency: sweet spots at 14, 25, and 50 people</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function UniversalCheckout({ 
  entryPoint = 'direct_link', 
  preselectedData = {} 
}: UniversalCheckoutProps) {
  // Log entry point for debugging
  console.log('🎯 UniversalCheckout initialized:', {
    entryPoint,
    urlParams: Object.fromEntries(new URLSearchParams(window.location.search)),
    preselectedData
  });
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'selections' | 'contact' | 'payment' | 'confirmation'>('selections');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Discount code functionality
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{code: string, percentage: number, amount: number} | null>(null);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

  // Extract URL parameters for context
  const urlParams = new URLSearchParams(window.location.search);
  
  // Determine actual entry point from URL or props
  const actualEntryPoint = urlParams.get('entryPoint') || entryPoint;
  
  // Entry point display names for UI
  const entryPointDisplay = {
    'quote_builder': { label: 'Quote Builder', icon: FileTextIcon, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    'live_calendar': { label: 'Calendar Booking', icon: CalendarIcon, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    'public_calendar': { label: 'Calendar Booking', icon: CalendarIcon, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    'chat_flow': { label: 'Chat Assistant', icon: SparklesIcon, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
    'direct_link': { label: 'Direct Booking', icon: Anchor, color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300' },
    'admin_booking': { label: 'Admin Booking', icon: ShieldCheck, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' }
  };
  
  const currentEntryDisplay = entryPointDisplay[actualEntryPoint as keyof typeof entryPointDisplay] || entryPointDisplay['direct_link'];
  
  // CRITICAL FIX: Reconstruct complete selectedSlot object from URL parameters
  // Handle both Calendar and Quote Builder data structures
  const hasSlotData = urlParams.get('slotId') && urlParams.get('startTime') && urlParams.get('endTime');
  const selectedSlot = hasSlotData ? {
    id: urlParams.get('slotId')!,
    dateISO: urlParams.get('eventDate')!,
    startTime: urlParams.get('startTime')!,
    endTime: urlParams.get('endTime')!,
    duration: urlParams.get('duration') ? parseInt(urlParams.get('duration')!) : 4,
    label: urlParams.get('slotLabel') || `${urlParams.get('startTime')} - ${urlParams.get('endTime')}`,
    description: urlParams.get('slotDescription') || '',
    cruiseType: (urlParams.get('cruiseType') as 'private' | 'disco') || 'private',
    capacity: urlParams.get('capacity') ? parseInt(urlParams.get('capacity')!) : 25,
    boatName: urlParams.get('boatName') || '',
    boatCandidates: urlParams.get('boatName') ? [urlParams.get('boatName')!] : [],
    availableCount: 1,
    bookable: true,
    held: false,
    totalPrice: urlParams.get('estimatedTotal') ? parseInt(urlParams.get('estimatedTotal')!) : undefined,
    estimatedPricing: urlParams.get('estimatedTotal') ? {
      baseRate: Math.floor(parseInt(urlParams.get('estimatedTotal')!) / 4),
      duration: urlParams.get('duration') ? parseInt(urlParams.get('duration')!) : 4,
      subtotal: parseInt(urlParams.get('estimatedTotal')!),
      total: parseInt(urlParams.get('estimatedTotal')!)
    } : undefined
  } : undefined;

  // Comprehensive data extraction with validation
  const contextFromUrl = {
    // Core identifiers
    quoteId: urlParams.get('quoteId'),
    projectId: urlParams.get('projectId'),
    
    // Event details with fallbacks
    eventType: urlParams.get('eventType') || preselectedData.eventType || 'cruise',
    eventTypeLabel: urlParams.get('eventTypeLabel') || EVENT_TYPES[urlParams.get('eventType') || 'cruise']?.label || 'Cruise',
    groupSize: urlParams.get('groupSize') ? parseInt(urlParams.get('groupSize')!) : preselectedData.groupSize || 15,
    eventDate: urlParams.get('eventDate') ? new Date(urlParams.get('eventDate')!) : preselectedData.eventDate || undefined,
    
    // Boat and cruise type with validation
    boatId: urlParams.get('boatId') || preselectedData.boatId,
    boatName: urlParams.get('boatName') || preselectedData.boatName,
    cruiseType: (urlParams.get('cruiseType') || preselectedData.cruiseType || 'private') as 'private' | 'disco',
    
    // Disco cruise specific parameters
    discoPackage: urlParams.get('discoPackage'),
    ticketQuantity: urlParams.get('ticketQuantity') ? parseInt(urlParams.get('ticketQuantity')!) : undefined,
    
    // Private cruise specific parameters
    addOnPackages: urlParams.get('addOnPackages') ? urlParams.get('addOnPackages')!.split(',') : undefined,
    
    // Pricing information passed from Quote Builder
    subtotal: urlParams.get('subtotal') ? parseInt(urlParams.get('subtotal')!) : undefined,
    tax: urlParams.get('tax') ? parseInt(urlParams.get('tax')!) : undefined,
    gratuity: urlParams.get('gratuity') ? parseInt(urlParams.get('gratuity')!) : undefined,
    total: urlParams.get('total') ? parseInt(urlParams.get('total')!) : undefined,
    depositAmount: urlParams.get('depositAmount') ? parseInt(urlParams.get('depositAmount')!) : undefined,
    
    // Payment type from Quote Builder
    paymentType: urlParams.get('paymentType') as 'deposit' | 'full' | undefined,
    
    // Entry point to help with flow determination
    entryPoint: actualEntryPoint,
    
    // Contact information
    firstName: urlParams.get('firstName'),
    lastName: urlParams.get('lastName'),
    email: urlParams.get('email'),
    phone: urlParams.get('phone'),
    specialRequests: urlParams.get('specialRequests'),
    
    // Add reconstructed selectedSlot object
    selectedSlot,
    
    // Backward compatibility fields
    timeSlot: urlParams.get('timeSlot'),
    slotId: urlParams.get('slotId'),
    startTime: urlParams.get('startTime'),
    endTime: urlParams.get('endTime'),
    
    ...preselectedData
  };

  // Data validation state
  const [dataValidation, setDataValidation] = useState<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }>({ isValid: true, errors: [], warnings: [] });
  
  // Validate required data based on entry point
  useEffect(() => {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Validate based on entry point
    if (actualEntryPoint === 'quote_builder') {
      if (!contextFromUrl.quoteId) warnings.push('No quote ID provided - creating new booking');
      if (!contextFromUrl.groupSize || contextFromUrl.groupSize === 0) errors.push('Group size is required');
      if (!contextFromUrl.eventDate) warnings.push('Event date not specified - please select a date');
    } else if (actualEntryPoint === 'live_calendar' || actualEntryPoint === 'public_calendar') {
      if (!contextFromUrl.selectedSlot) warnings.push('Time slot information is missing - please select a slot');
      if (!contextFromUrl.eventDate) errors.push('Event date is required');
      if (!contextFromUrl.groupSize || contextFromUrl.groupSize === 0) warnings.push('Group size not specified - using default (15)');
    }
    
    // Common validations
    if (contextFromUrl.groupSize && contextFromUrl.groupSize > 100) {
      warnings.push('Large group size - contact us for special arrangements');
    }
    
    // Check for required pricing data
    if (contextFromUrl.cruiseType === 'disco' && !contextFromUrl.discoPackage) {
      warnings.push('No disco package selected - defaulting to Basic package');
    }
    
    setDataValidation({
      isValid: errors.length === 0,
      errors,
      warnings
    });
  }, [actualEntryPoint, contextFromUrl.quoteId, contextFromUrl.selectedSlot, contextFromUrl.eventDate, contextFromUrl.groupSize, contextFromUrl.cruiseType, contextFromUrl.discoPackage]);
  
  // Initialize checkout context with validated data
  const checkout = useCheckoutContext({
    entryPoint: actualEntryPoint,
    preselectedData: contextFromUrl,
    onCheckoutComplete: (result) => {
      toast({
        title: "Booking Confirmed! 🎉",
        description: "Your cruise booking has been successfully processed.",
        variant: "default",
      });
      setCurrentStep('confirmation');
    },
    onError: (error) => {
      toast({
        title: "Checkout Error",
        description: error,
        variant: "destructive",
      });
    }
  });

  const {
    session,
    isLoading,
    error,
    selections,
    pricing,
    validation,
    availableBoats,
    discoPackages,
    addOnPackages,
    bachelorComparison,
    showBachelorComparison,
    selectBoat,
    selectTimeSlot,
    selectCruiseType,
    selectDiscoPackage,
    toggleAddOnPackage,
    updateContactInfo,
    validateCheckout,
    processCheckout,
    canProceedToPayment,
    isEventTypeBachelorette,
    // needsHoldRenewal - removed as it's not part of the interface
  } = checkout;

  // Handle step navigation
  const handleStepChange = async (newStep: typeof currentStep) => {
    if (newStep === 'contact' || newStep === 'payment') {
      const validationResult = await validateCheckout();
      if (!validationResult.isValid) {
        toast({
          title: "Please complete all selections",
          description: validationResult.errors.map(e => e.message).join(', '),
          variant: "destructive",
        });
        return;
      }
    }
    setCurrentStep(newStep);
  };

  // Calculate progress
  const getProgress = () => {
    const steps = ['selections', 'contact', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  // Handle discount code application with secure server-side validation
  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    
    setIsApplyingDiscount(true);
    try {
      // Call server-side discount validation
      const response = await fetch('/api/discounts/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: discountCode }),
      });
      
      const result = await response.json();
      
      if (result.valid && result.discount) {
        const discountAmount = Math.floor(((pricing?.total ?? 0) * result.discount.percentage) / 100);
        
        setAppliedDiscount({
          code: result.discount.code,
          percentage: result.discount.percentage,
          amount: discountAmount
        });
        
        toast({
          title: "Discount Applied! 🎉",
          description: `${result.discount.percentage}% discount applied to your booking`,
          variant: "default",
        });
      } else {
        toast({
          title: "Invalid Discount Code",
          description: result.error || "Please check your discount code and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error applying discount:', error);
      toast({
        title: "Error Applying Discount",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsApplyingDiscount(false);
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    toast({
      title: "Discount Removed",
      description: "Your pricing has been updated",
      variant: "default",
    });
  };

  // Calculate final pricing with discount
  const finalPricing = pricing ? (
    appliedDiscount ? {
      ...pricing,
      discountAmount: appliedDiscount.amount,
      discountPercentage: appliedDiscount.percentage,
      finalTotal: (pricing.total ?? 0) - appliedDiscount.amount,
      depositAmount: Math.ceil(((pricing.total ?? 0) - appliedDiscount.amount) * ((pricing.depositPercentage ?? 25) / 100))
    } : {
      ...pricing,
      finalTotal: pricing.total ?? 0,
      depositAmount: pricing.depositAmount ?? 0
    }
  ) : {
    subtotal: 0,
    tax: 0,
    gratuity: 0,
    total: 0,
    depositAmount: 0,
    depositPercentage: 25,
    finalTotal: 0,
    perPersonCost: 0,
    isUrgentBooking: false
  };

  // Handle payment processing
  const handlePaymentSubmit = async (paymentType: 'deposit' | 'full_payment') => {
    try {
      setIsProcessingPayment(true);
      
      // Include discount information in payment processing
      const paymentData = {
        ...selections,
        pricing: finalPricing,
        appliedDiscount,
        paymentType
      };
      
      const result = await processCheckout(paymentType);
      
      // Success is handled by onCheckoutComplete callback
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Unable to process payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Initializing checkout...</p>
        </div>
      </div>
    );
  }

  if (error || !session || !selections) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || "Failed to initialize checkout. Please try again."}
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - Premier Party Cruises</title>
        <meta name="description" content="Complete your cruise booking with our secure checkout system" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
        {/* Header with Progress */}
        <div className="bg-white dark:bg-gray-900 shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  className="text-sm"
                  onClick={() => window.history.back()}
                  data-testid="button-back"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Complete Your Booking
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {EVENT_TYPES[selections.eventType as keyof typeof EVENT_TYPES]?.label || selections.eventTypeLabel} • {selections.groupSize} guests
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={currentEntryDisplay.color} data-testid="badge-entry-point">
                  <currentEntryDisplay.icon className="w-3 h-3 mr-1" />
                  {currentEntryDisplay.label}
                </Badge>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span className={currentStep === 'selections' ? 'text-blue-600 font-medium' : ''}>
                  1. Selections
                </span>
                <span className={currentStep === 'contact' ? 'text-blue-600 font-medium' : ''}>
                  2. Contact
                </span>
                <span className={currentStep === 'payment' ? 'text-blue-600 font-medium' : ''}>
                  3. Payment
                </span>
                <span className={currentStep === 'confirmation' ? 'text-blue-600 font-medium' : ''}>
                  4. Complete
                </span>
              </div>
              <Progress value={getProgress()} className="h-2" />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Data Validation Warnings */}
          {(!dataValidation.isValid || dataValidation.warnings.length > 0) && (
            <div className="mb-6 space-y-2">
              {dataValidation.errors.map((error, index) => (
                <Alert key={`error-${index}`} variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ))}
              {dataValidation.warnings.map((warning, index) => (
                <Alert key={`warning-${index}`}>
                  <InfoIcon className="h-4 w-4" />
                  <AlertDescription>{warning}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
          {/* Invoice-Style Booking Summary Header */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm mb-8">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FileTextIcon className="h-6 w-6 text-blue-600" />
                    Booking Invoice
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Complete your cruise reservation
                  </p>
                </div>
                <Badge variant="outline" className="text-sm">
                  {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Badge>
              </div>

              {/* Prominent Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-center">
                  <CalendarIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-lg text-gray-900 dark:text-white">
                    {formatDate(selections.eventDate)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Event Date
                  </div>
                </div>

                <div className="text-center">
                  <ClockIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-lg text-gray-900 dark:text-white">
                    {selections.selectedSlot?.startTime || 'TBD'} - {selections.selectedSlot?.endTime || 'TBD'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {selections.selectedSlot?.duration || 4} Hour Cruise
                  </div>
                </div>

                <div className="text-center">
                  <UsersIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-lg text-gray-900 dark:text-white">
                    {selections.groupSize} Guests
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {EVENT_TYPES[selections.eventType as keyof typeof EVENT_TYPES]?.label || selections.eventTypeLabel}
                  </div>
                </div>

                <div className="text-center">
                  <Ship className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-lg text-gray-900 dark:text-white" data-testid="text-boat-name">
                    {selections.cruiseType === 'disco' ? 'ATX Disco Cruise' : 
                     selections.selectedBoat?.displayName || pricing?.boatInfo?.name || 'Select Boat'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400" data-testid="text-cruise-type">
                    {selections.cruiseType === 'disco' ? 'Disco Party Cruise' : 'Private Charter'}
                  </div>
                </div>
              </div>

              {/* Quick Edit Actions */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentStep('selections')}
                  className="text-xs"
                  data-testid="button-edit-details"
                >
                  <EditIcon className="h-3 w-3 mr-1" />
                  Edit Details
                </Button>
                {selections.cruiseType === 'private' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentStep('selections')}
                    className="text-xs"
                    data-testid="button-change-boat"
                  >
                    <BoatIcon className="h-3 w-3 mr-1" />
                    Change Boat
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentStep('selections')}
                  className="text-xs"
                  data-testid="button-change-date"
                >
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  Change Date
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Bachelor/Bachelorette Comparison */}
              {/* 
              {showBachelorComparison && bachelorComparison && currentStep === 'selections' && (
                <BachelorComparisonWidget
                  comparison={bachelorComparison}
                  currentSelection={selections.cruiseType}
                  onSelectCruiseType={selectCruiseType}
                />
              )}
              */}

              {/* Step Content - SIMPLIFIED PACKAGE SELECTION */}
              {currentStep === 'selections' && (
                <div className="space-y-6">
                  {/* Package Selection Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PartyPopperIcon className="h-5 w-5" />
                        Choose Your Package
                      </CardTitle>
                      <CardDescription>
                        {isEventTypeBachelorette 
                          ? 'Select between disco cruise or private cruise packages'
                          : 'Select your private cruise package'
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Bachelor/Bachelorette: Choose Cruise Type First */}
                      {isEventTypeBachelorette && (
                        <div className="space-y-4">
                          <h3 className="font-medium text-gray-900 dark:text-white">Cruise Type</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Disco Cruise Option */}
                            <div 
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selections?.cruiseType === 'disco' 
                                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20' 
                                  : 'border-gray-200 hover:border-purple-300'
                              }`}
                              onClick={() => selectCruiseType('disco')}
                              data-testid="cruise-type-disco"
                            >
                              <div className="flex items-start gap-3">
                                <input
                                  type="radio"
                                  checked={selections?.cruiseType === 'disco'}
                                  onChange={() => selectCruiseType('disco')}
                                  className="mt-1"
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <MusicIcon className="h-4 w-4 text-purple-600" />
                                    <span className="font-semibold">Disco Cruise</span>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Join our party boat with music and dancing
                                  </p>
                                  <div className="text-sm font-medium text-purple-600 mt-2">
                                    From $85 per person
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Private Cruise Option */}
                            <div 
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selections?.cruiseType === 'private' 
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                                  : 'border-gray-200 hover:border-blue-300'
                              }`}
                              onClick={() => selectCruiseType('private')}
                              data-testid="cruise-type-private"
                            >
                              <div className="flex items-start gap-3">
                                <input
                                  type="radio"
                                  checked={selections?.cruiseType === 'private'}
                                  onChange={() => selectCruiseType('private')}
                                  className="mt-1"
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Ship className="h-4 w-4 text-blue-600" />
                                    <span className="font-semibold">Private Cruise</span>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Your own private boat with customizable experience
                                  </p>
                                  <div className="text-sm font-medium text-blue-600 mt-2">
                                    Starting at $1,500 total
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Package Selection Based on Cruise Type */}
                      <div className="space-y-4">
                        {selections?.cruiseType === 'disco' ? (
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Disco Package</h3>
                            <div className="space-y-3">
                              {discoPackages.map((pkg) => (
                                <div 
                                  key={pkg.id}
                                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                    selections?.discoPackage?.id === pkg.id 
                                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20' 
                                      : 'border-gray-200 hover:border-purple-300'
                                  }`}
                                  onClick={() => selectDiscoPackage(pkg)}
                                  data-testid={`disco-package-${pkg.id}`}
                                >
                                  <div className="flex items-start gap-3">
                                    <input
                                      type="radio"
                                      checked={selections?.discoPackage?.id === pkg.id}
                                      onChange={() => selectDiscoPackage(pkg)}
                                      className="mt-1"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <span className="font-semibold">{pkg.label}</span>
                                        <span className="font-bold text-purple-600">
                                          ${(pkg.pricePerPerson / 100).toFixed(0)} per person
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {pkg.description}
                                      </p>
                                      {pkg.popular && (
                                        <Badge className="mt-2" variant="secondary">
                                          Most Popular
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Private Cruise Package</h3>
                            <div className="space-y-3">
                              {/* Standard Package */}
                              <div 
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  !selections?.addOnPackages?.length 
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                                    : 'border-gray-200 hover:border-blue-300'
                                }`}
                                onClick={() => {
                                  // Clear all add-on packages for standard
                                  selections?.addOnPackages?.forEach(pkg => toggleAddOnPackage(pkg));
                                }}
                                data-testid="package-standard"
                              >
                                <div className="flex items-start gap-3">
                                  <input
                                    type="radio"
                                    checked={!selections?.addOnPackages?.length}
                                    onChange={() => {}}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-semibold">Standard Package</span>
                                      <span className="font-bold text-blue-600">Base Rate</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                      Basic private cruise experience with your selected boat
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Essentials Package */}
                              <div 
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  selections?.addOnPackages?.some(pkg => pkg.id === 'essentials') && selections?.addOnPackages?.length === 1
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                                    : 'border-gray-200 hover:border-blue-300'
                                }`}
                                onClick={() => {
                                  // Clear all packages first, then add essentials
                                  selections?.addOnPackages?.forEach(pkg => toggleAddOnPackage(pkg));
                                  const essentialsPkg = addOnPackages.find(pkg => pkg.id === 'essentials');
                                  if (essentialsPkg) toggleAddOnPackage(essentialsPkg);
                                }}
                                data-testid="package-essentials"
                              >
                                <div className="flex items-start gap-3">
                                  <input
                                    type="radio"
                                    checked={selections?.addOnPackages?.some(pkg => pkg.id === 'essentials') && selections?.addOnPackages?.length === 1}
                                    onChange={() => {}}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-semibold">Essentials Package</span>
                                      <span className="font-bold text-blue-600">+$50/hour</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                      Enhanced experience with premium amenities, coolers, and decorations
                                    </p>
                                    <Badge className="mt-2" variant="secondary">
                                      Recommended
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Ultimate Package */}
                              <div 
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  selections?.addOnPackages?.some(pkg => pkg.id === 'ultimate') && selections?.addOnPackages?.length === 1
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                                    : 'border-gray-200 hover:border-blue-300'
                                }`}
                                onClick={() => {
                                  // Clear all packages first, then add ultimate
                                  selections?.addOnPackages?.forEach(pkg => toggleAddOnPackage(pkg));
                                  const ultimatePkg = addOnPackages.find(pkg => pkg.id === 'ultimate');
                                  if (ultimatePkg) toggleAddOnPackage(ultimatePkg);
                                }}
                                data-testid="package-ultimate"
                              >
                                <div className="flex items-start gap-3">
                                  <input
                                    type="radio"
                                    checked={selections?.addOnPackages?.some(pkg => pkg.id === 'ultimate') && selections?.addOnPackages?.length === 1}
                                    onChange={() => {}}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-semibold">Ultimate Package</span>
                                      <span className="font-bold text-blue-600">+$75/hour</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                      All-inclusive luxury experience with photography and premium features
                                    </p>
                                    <Badge className="mt-2" variant="outline">
                                      Premium
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Smart Recommendations */}
                  <SmartRecommendationsCard 
                    selections={selections} 
                    pricing={pricing} 
                    onSelectCruiseType={selectCruiseType} 
                  />
                </div>
              )}

              {currentStep === 'contact' && (
                <ContactStep
                  selections={selections}
                  onUpdateContactInfo={updateContactInfo}
                />
              )}

              {currentStep === 'payment' && (
                <Elements stripe={stripePromise}>
                  <PaymentStep
                    selections={selections}
                    pricing={pricing}
                    onPaymentSubmit={handlePaymentSubmit}
                    isProcessing={isProcessingPayment}
                  />
                </Elements>
              )}

              {currentStep === 'confirmation' && (
                <ConfirmationStep selections={selections} pricing={pricing} />
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    const steps = ['selections', 'contact', 'payment', 'confirmation'] as const;
                    const currentIndex = steps.indexOf(currentStep);
                    if (currentIndex > 0) {
                      setCurrentStep(steps[currentIndex - 1]);
                    }
                  }}
                  disabled={currentStep === 'selections'}
                  data-testid="button-previous-step"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>

                <Button
                  onClick={() => {
                    const steps = ['selections', 'contact', 'payment', 'confirmation'] as const;
                    const currentIndex = steps.indexOf(currentStep);
                    if (currentIndex < steps.length - 1) {
                      handleStepChange(steps[currentIndex + 1]);
                    }
                  }}
                  disabled={currentStep === 'confirmation' || (currentStep === 'contact' && !canProceedToPayment)}
                  data-testid="button-next-step"
                >
                  {currentStep === 'payment' ? 'Complete Booking' : 'Continue'}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Sidebar - Enhanced Pricing Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                {/* Discount Code Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TagIcon className="h-5 w-5" />
                      Discount Code
                    </CardTitle>
                    <CardDescription>
                      Have a promo code? Apply it here for savings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {appliedDiscount ? (
                      <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-green-800 dark:text-green-200 flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4" />
                              {appliedDiscount.code}
                            </div>
                            <div className="text-sm text-green-600 dark:text-green-400">
                              {appliedDiscount.percentage}% discount applied
                            </div>
                            <div className="text-lg font-bold text-green-800 dark:text-green-200">
                              -{formatCurrency(appliedDiscount.amount)} savings
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveDiscount}
                            className="text-red-600 hover:text-red-700"
                            data-testid="button-remove-discount"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter discount code"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleApplyDiscount()}
                            className="flex-1"
                            data-testid="input-discount-code"
                          />
                          <Button
                            onClick={handleApplyDiscount}
                            disabled={!discountCode.trim() || isApplyingDiscount}
                            size="sm"
                            data-testid="button-apply-discount"
                          >
                            {isApplyingDiscount ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <>
                                <PercentIcon className="h-4 w-4 mr-1" />
                                Apply
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Try "Premier 99" for special testing discount
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Main Pricing Card */}
                <Card data-testid="card-pricing-summary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileTextIcon className="h-5 w-5" />
                      Invoice Summary
                    </CardTitle>
                    <CardDescription>
                      Complete pricing breakdown for your cruise
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Event Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Event Type:</span>
                        <span className="font-medium">{EVENT_TYPES[selections.eventType as keyof typeof EVENT_TYPES]?.label || selections.eventTypeLabel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{formatDate(selections.eventDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Group Size:</span>
                        <span className="font-medium">{selections.groupSize} guests</span>
                      </div>
                      {selections.cruiseType === 'private' && pricing?.boatInfo && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Boat:</span>
                          <span className="font-medium">{pricing?.boatInfo?.name}</span>
                        </div>
                      )}
                    </div>

                    {pricing && pricing.total > 0 && (
                      <>
                        <Separator />
                        
                        {/* Pricing Breakdown */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <InfoIcon className="h-4 w-4" />
                            Service Details
                          </h4>
                          
                          {selections.cruiseType === 'disco' ? (
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  {selections.discoPackage?.name || 'Disco Package'}
                                </span>
                                <span>{formatCurrency(pricing?.subtotal ?? 0)}</span>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>• {formatCurrency(pricing?.perPersonCost || 0)} per person</span>
                                <span>{selections.groupSize}x</span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1 text-sm">
                              {/* Base Cruise Cost */}
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Base Cruise (4hrs)</span>
                                <span>{formatCurrency(pricing?.packageBreakdown?.baseCruiseCost || pricing?.subtotal || 0)}</span>
                              </div>
                              
                              {/* Add-on Packages */}
                              {pricing?.packageBreakdown?.addOnPackagesCost && pricing.packageBreakdown.addOnPackagesCost > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Package Add-ons</span>
                                  <span>{formatCurrency(pricing?.packageBreakdown?.addOnPackagesCost || 0)}</span>
                                </div>
                              )}
                              
                              {/* Crew Fee */}
                              {pricing?.packageBreakdown?.crewFee && pricing.packageBreakdown.crewFee > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Additional Crew</span>
                                  <span>{formatCurrency(pricing?.packageBreakdown?.crewFee || 0)}</span>
                                </div>
                              )}
                              
                              {/* Per Person Cost */}
                              {pricing?.perPersonCost && (
                                <div className="flex justify-between text-xs text-muted-foreground pt-1 border-t">
                                  <span>Per person cost</span>
                                  <span>{formatCurrency(pricing?.perPersonCost || 0)}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Tax and Gratuity */}
                        {pricing && (pricing.tax > 0 || pricing.gratuity > 0) && (
                          <>
                            <Separator />
                            <div className="space-y-1 text-sm">
                              <h4 className="font-semibold text-sm">Taxes & Fees</h4>
                              {pricing?.tax && pricing.tax > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Tax (8.25%)</span>
                                  <span>{formatCurrency(pricing?.tax ?? 0)}</span>
                                </div>
                              )}
                              {pricing?.gratuity && pricing.gratuity > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Gratuity (20%)</span>
                                  <span>{formatCurrency(pricing?.gratuity ?? 0)}</span>
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        <Separator />
                        
                        {/* Subtotal */}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span>{formatCurrency(pricing?.total ?? 0)}</span>
                        </div>

                        {/* Discount Line */}
                        {appliedDiscount && (
                          <div className="flex justify-between text-green-600 dark:text-green-400">
                            <span>Discount ({appliedDiscount.code}):</span>
                            <span>-{formatCurrency(appliedDiscount.amount)}</span>
                          </div>
                        )}

                        <Separator />
                        
                        {/* Final Total */}
                        <div className="flex justify-between text-xl font-bold">
                          <span>Invoice Total:</span>
                          <span className={`${appliedDiscount ? 'text-green-600 dark:text-green-400' : 'text-blue-600'}`}>
                            {formatCurrency(finalPricing.finalTotal)}
                          </span>
                        </div>

                        {/* Original total strikethrough if discount applied */}
                        {appliedDiscount && (
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Original Total:</span>
                            <span className="line-through">{formatCurrency(pricing?.total ?? 0)}</span>
                          </div>
                        )}
                        
                        {/* Payment Options */}
                        <div className="space-y-2 mt-6">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <CreditCardIcon className="h-4 w-4" />
                            Payment Options
                          </h4>
                          
                          {/* Deposit Option */}
                          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-sm">Pay Deposit ({pricing?.depositPercentage ?? 25}%)</span>
                              <span className="font-bold text-blue-600">{formatCurrency(finalPricing.depositAmount)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Reserve your cruise with {pricing?.depositPercentage ?? 25}% deposit
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Balance: {formatCurrency(finalPricing.finalTotal - finalPricing.depositAmount)} due 30 days before cruise
                            </p>
                            {pricing?.isUrgentBooking && (
                              <div className="flex items-center gap-1 mt-1 text-xs text-amber-600">
                                <AlertCircle className="h-3 w-3" />
                                <span>Urgent booking - higher deposit required</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Full Payment Option */}
                          <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-sm">Pay in Full</span>
                              <span className="font-bold text-green-600">{formatCurrency(finalPricing.finalTotal)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Complete payment - nothing more to pay</p>
                            {appliedDiscount && (
                              <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                                💰 You're saving {formatCurrency(appliedDiscount.amount)} with {appliedDiscount.code}!
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
                
                {/* Smart Recommendations Card */}
                {pricing && pricing.total > 0 && (
                  <SmartRecommendationsCard 
                    selections={selections} 
                    pricing={pricing} 
                    onSelectCruiseType={selectCruiseType}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Step Components
function SelectionsStep({ 
  selections, 
  pricing, 
  availableBoats, 
  discoPackages, 
  addOnPackages, 
  onSelectBoat, 
  onSelectTimeSlot, 
  onSelectCruiseType, 
  onSelectDiscoPackage, 
  onToggleAddOnPackage,
  isEventTypeBachelorette 
}: {
  selections: any;
  pricing: any;
  availableBoats: BoatOption[];
  discoPackages: DiscoPackageOption[];
  addOnPackages: AddOnPackageOption[];
  onSelectBoat: (boat: BoatOption) => void;
  onSelectTimeSlot: (slot: any) => void;
  onSelectCruiseType: (type: 'private' | 'disco') => void;
  onSelectDiscoPackage: (pkg: DiscoPackageOption) => void;
  onToggleAddOnPackage: (pkg: AddOnPackageOption) => void;
  isEventTypeBachelorette: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Event Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2" />
            Event Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <label className="font-medium text-muted-foreground">Event Type</label>
              <p className="font-semibold">{selections.eventTypeLabel}</p>
            </div>
            <div>
              <label className="font-medium text-muted-foreground">Date</label>
              <p className="font-semibold">{formatDate(selections.eventDate)}</p>
            </div>
            <div>
              <label className="font-medium text-muted-foreground">Group Size</label>
              <p className="font-semibold">{selections.groupSize} guests</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cruise Type Selection (for bachelor/bachelorette) */}
      {isEventTypeBachelorette && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Experience</CardTitle>
            <CardDescription>
              Bachelor and bachelorette parties have two exciting options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selections.cruiseType} onValueChange={(value) => onSelectCruiseType(value as "private" | "disco")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="private" data-testid="tab-private-cruise">
                  <PartyPopperIcon className="w-4 h-4 mr-2" />
                  Private Charter
                </TabsTrigger>
                <TabsTrigger value="disco" data-testid="tab-disco-cruise">
                  <MusicIcon className="w-4 h-4 mr-2" />
                  Disco Cruise
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="private" className="mt-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Private Charter Experience
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                    <li>• Exclusive boat just for your group</li>
                    <li>• Customizable music and timeline</li>
                    <li>• Flexible duration options</li>
                    <li>• Perfect for intimate celebrations</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="disco" className="mt-4">
                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    ATX Disco Cruise Experience
                  </h4>
                  <ul className="text-sm text-purple-700 dark:text-purple-200 space-y-1">
                    <li>• Party with other groups</li>
                    <li>• DJ and dancing all night</li>
                    <li>• High-energy atmosphere</li>
                    <li>• Great value for smaller groups</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Boat Selection */}
      {/* TODO: Implement CheckoutBoatSelector component */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BoatIcon className="w-5 h-5 mr-2" />
            Select Your Boat
          </CardTitle>
          <CardDescription>
            Choose from our fleet of premium party boats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Boat selection component will be implemented here
          </div>
        </CardContent>
      </Card>

      {/* Time Selection */}
      {/* TODO: Implement CheckoutTimeSelector component */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClockIcon className="w-5 h-5 mr-2" />
            Select Your Time Slot
          </CardTitle>
          <CardDescription>
            Choose your preferred cruise time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Time slot selection component will be implemented here
          </div>
        </CardContent>
      </Card>

      {/* Disco Package Selection */}
      {selections.cruiseType === 'disco' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SparklesIcon className="w-5 h-5 mr-2" />
              Select Your Disco Package
            </CardTitle>
            <CardDescription>
              Choose the experience that fits your celebration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {discoPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selections.discoPackage?.id === pkg.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => onSelectDiscoPackage(pkg)}
                  data-testid={`package-${pkg.id}`}
                >
                  {pkg.popular && (
                    <Badge className="mb-2" variant="default">
                      <StarIcon className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  <h4 className="font-semibold">{pkg.label}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                  <p className="font-bold mt-2">{formatCurrency(pkg.pricePerPerson)}/person</p>
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add-On Packages (for private cruises) */}
      {selections.cruiseType === 'private' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUpIcon className="w-5 h-5 mr-2" />
              Enhance Your Experience
            </CardTitle>
            <CardDescription>
              Optional packages to make your cruise even more special
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {addOnPackages
                .filter(pkg => pkg.eventTypes.includes(selections.eventType))
                .map((pkg) => {
                  const isSelected = selections.addOnPackages.some((selected: any) => selected.id === pkg.id);
                  return (
                    <div
                      key={pkg.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => onToggleAddOnPackage(pkg)}
                      data-testid={`addon-${pkg.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-semibold">{pkg.name}</h4>
                            {pkg.popular && (
                              <Badge className="ml-2 text-xs" variant="secondary">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                          <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                            {pkg.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(pkg.hourlyRate)}/hour</p>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ContactStep({ selections, onUpdateContactInfo }: {
  selections: any;
  onUpdateContactInfo: (info: { name: string; email: string; phone: string }) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          We'll use this information to confirm your booking and stay in touch
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* TODO: Implement CheckoutContactForm component */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="p-3 border rounded-md bg-muted text-muted-foreground text-sm">
              Contact form will be implemented here
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="p-3 border rounded-md bg-muted text-muted-foreground text-sm">
              Email input will be implemented here
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <div className="p-3 border rounded-md bg-muted text-muted-foreground text-sm">
              Phone input will be implemented here
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentStep({ selections, pricing, onPaymentSubmit, isProcessing }: {
  selections: any;
  pricing: any;
  onPaymentSubmit: (paymentType: 'deposit' | 'full_payment') => Promise<void>;
  isProcessing: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCardIcon className="w-5 h-5 mr-2" />
          Payment
        </CardTitle>
        <CardDescription>
          Secure payment processing powered by Stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Comprehensive Policy Information */}
          <div className="space-y-4">
            <PolicySummary 
              eventDate={selections.eventDate}
              totalCost={pricing?.total}
              context="checkout"
              className="border-l-4 border-l-blue-500"
            />
          </div>

          {/* Payment Options with Policy Context */}
          <div className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
            <h4 className="font-semibold mb-4">Secure Payment Options</h4>
            
            {/* Deposit Calculations */}
            {pricing && (
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div>
                    <div className="font-medium">Deposit Required</div>
                    <div className="text-sm text-muted-foreground">
                      {pricing?.isUrgentBooking ? '50% for bookings ≤30 days' : '25% to secure your booking'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(pricing?.depositAmount ?? 0)}</div>
                    <div className="text-sm text-muted-foreground">{pricing?.depositPercentage ?? 25}%</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div>
                    <div className="font-medium">Balance Due</div>
                    <div className="text-sm text-muted-foreground">
                      {pricing?.isUrgentBooking ? 'Within 48 hours' : '30 days before cruise'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency((pricing?.total ?? 0) - (pricing?.depositAmount ?? 0))}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <p>• Secure payment processing with Stripe</p>
              <p>• SSL encrypted transactions</p>
              <p>• All major credit cards accepted</p>
              <p>• Instant confirmation email</p>
            </div>
            
            {/* Payment Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full" 
                disabled={isProcessing}
                onClick={() => onPaymentSubmit('deposit')}
              >
                <CreditCardIcon className="w-4 h-4 mr-2" />
                {isProcessing ? 'Processing...' : `Pay Deposit ${formatCurrency(pricing?.depositAmount ?? 0)}`}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                disabled={isProcessing}
                onClick={() => onPaymentSubmit('full_payment')}
              >
                <CreditCardIcon className="w-4 h-4 mr-2" />
                {isProcessing ? 'Processing...' : `Pay Full Amount ${formatCurrency(pricing?.total ?? 0)}`}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ConfirmationStep({ selections, pricing }: {
  selections: any;
  pricing: any;
}) {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
        <CardDescription>
          Your Premier Party Cruise booking has been successfully processed
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 dark:text-green-100">
            What happens next?
          </h4>
          <ul className="text-sm text-green-700 dark:text-green-200 mt-2 space-y-1">
            <li>• You'll receive a confirmation email within 5 minutes</li>
            <li>• Our team will contact you 24-48 hours before your cruise</li>
            <li>• Check your email for detailed cruise information</li>
          </ul>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Link href="/" data-testid="link-home">
            <Button variant="outline">Return Home</Button>
          </Link>
          <Link href="/calendar" data-testid="link-calendar">
            <Button>View Calendar</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}