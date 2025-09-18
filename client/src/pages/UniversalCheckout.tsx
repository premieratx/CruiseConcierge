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
import { CalendarIcon, ClockIcon, UsersIcon, BotIcon as BoatIcon, CreditCardIcon, CheckCircle2, AlertCircle, InfoIcon, ArrowLeft, ArrowRight, EditIcon, StarIcon, TrendingUpIcon, SparklesIcon, MusicIcon, PartyPopperIcon } from 'lucide-react';
import { useCheckoutContext } from '@/hooks/use-checkout-context';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, formatDate, formatTimeForDisplay } from '@shared/formatters';
import { CheckoutEntryPoint, BoatOption, DiscoPackageOption, AddOnPackageOption } from '@shared/schema';
import { EVENT_TYPES } from '@shared/constants';

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

export default function UniversalCheckout({ 
  entryPoint = 'direct_link', 
  preselectedData = {} 
}: UniversalCheckoutProps) {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'selections' | 'contact' | 'payment' | 'confirmation'>('selections');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Extract URL parameters for context
  const urlParams = new URLSearchParams(window.location.search);
  
  // CRITICAL FIX: Reconstruct complete selectedSlot object from URL parameters
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

  const contextFromUrl = {
    quoteId: urlParams.get('quoteId'),
    projectId: urlParams.get('projectId'),
    eventType: urlParams.get('eventType'),
    groupSize: urlParams.get('groupSize') ? parseInt(urlParams.get('groupSize')!) : undefined,
    eventDate: urlParams.get('eventDate') ? new Date(urlParams.get('eventDate')!) : undefined,
    boatId: urlParams.get('boatId'),
    cruiseType: urlParams.get('cruiseType') as 'private' | 'disco' | undefined,
    
    // Add reconstructed selectedSlot object
    selectedSlot,
    
    // Backward compatibility fields
    timeSlot: urlParams.get('timeSlot'),
    slotId: urlParams.get('slotId'),
    startTime: urlParams.get('startTime'),
    endTime: urlParams.get('endTime'),
    
    ...preselectedData
  };

  // Initialize checkout context
  const checkout = useCheckoutContext({
    entryPoint,
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

  // Handle payment processing
  const handlePaymentSubmit = async (paymentType: 'deposit' | 'full_payment') => {
    try {
      setIsProcessingPayment(true);
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

  if (error || !session || !selections || !pricing) {
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
              <Badge variant={entryPoint === 'quote_builder' ? 'default' : 'secondary'} data-testid="badge-entry-point">
                {entryPoint.replace('_', ' ').toUpperCase()}
              </Badge>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Bachelor/Bachelorette Comparison */}
              {showBachelorComparison && bachelorComparison && currentStep === 'selections' && (
                <BachelorComparisonWidget
                  comparison={bachelorComparison}
                  currentSelection={selections.cruiseType}
                  onSelectCruiseType={selectCruiseType}
                />
              )}

              {/* Step Content */}
              {currentStep === 'selections' && (
                <SelectionsStep
                  selections={selections}
                  pricing={pricing}
                  availableBoats={availableBoats}
                  discoPackages={discoPackages}
                  addOnPackages={addOnPackages}
                  onSelectBoat={selectBoat}
                  onSelectTimeSlot={selectTimeSlot}
                  onSelectCruiseType={selectCruiseType}
                  onSelectDiscoPackage={selectDiscoPackage}
                  onToggleAddOnPackage={toggleAddOnPackage}
                  isEventTypeBachelorette={isEventTypeBachelorette}
                />
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

            {/* Sidebar - Pricing Summary */}
            <div className="lg:col-span-1">
              <CheckoutPricingDisplay
                pricing={pricing}
                selections={selections}
                currentStep={currentStep}
                onEditSelections={() => setCurrentStep('selections')}
              />
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
            <Tabs value={selections.cruiseType} onValueChange={onSelectCruiseType}>
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
      <CheckoutBoatSelector
        selectedBoat={selections.selectedBoat}
        availableBoats={availableBoats}
        groupSize={selections.groupSize}
        onSelectBoat={onSelectBoat}
      />

      {/* Time Selection */}
      <CheckoutTimeSelector
        selectedTimeSlot={selections.selectedTimeSlot}
        eventDate={selections.eventDate}
        cruiseType={selections.cruiseType}
        onSelectTimeSlot={onSelectTimeSlot}
      />

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
        <CheckoutContactForm
          initialData={{
            name: selections.contactName,
            email: selections.contactEmail,
            phone: selections.contactPhone,
            marketingConsent: selections.marketingConsent
          }}
          onSubmit={onUpdateContactInfo}
        />
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
        <CheckoutPaymentForm
          pricing={pricing}
          selections={selections}
          onPaymentSubmit={onPaymentSubmit}
          isProcessing={isProcessing}
        />
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