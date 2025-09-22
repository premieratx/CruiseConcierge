import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Clock, Users, Ship, AlertCircle, Loader2, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { getStripePublishableKey } from '@/lib/stripe';

// Initialize Stripe
const stripePromise = loadStripe(getStripePublishableKey() || '');

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentIntentId: string) => void;
  paymentType: 'deposit' | 'full';
  cruiseType: 'private' | 'disco';
  selectionPayload: any;
  pricing: any;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  holdId?: string;
}

interface PaymentFormProps {
  paymentType: 'deposit' | 'full';
  cruiseType: 'private' | 'disco';
  selectionPayload: any;
  pricing: any;
  contactInfo: any;
  holdId?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

function PaymentForm({ 
  paymentType, 
  cruiseType, 
  selectionPayload, 
  pricing, 
  contactInfo: initialContactInfo,
  holdId,
  onSuccess,
  onError
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [contactErrors, setContactErrors] = useState<any>({});
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountedAmount, setDiscountedAmount] = useState<number | null>(null);
  const [isValidatingDiscount, setIsValidatingDiscount] = useState(false);

  // Create payment intent function
  const createPaymentIntent = async () => {
    try {
      const response = await apiRequest('POST', '/api/checkout/create-payment-intent', {
        paymentType,
        cruiseType,
        selectionPayload: {
          ...selectionPayload,
          discountCode: discountCode // Include discount code
        },
        pricing,
        customerEmail: contactInfo.email,
        holdId,
        metadata: {
          firstName: contactInfo.firstName,
          lastName: contactInfo.lastName,
          phone: contactInfo.phone,
          discountCode: discountCode,
          ...selectionPayload
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create payment intent');
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
      
      // Update discounted amount if discount applied
      if (discountCode && data.amount) {
        setDiscountedAmount(data.amount);
      }
      
      return data;
    } catch (error: any) {
      console.error('Failed to create payment intent:', error);
      onError(error.message);
      return null;
    }
  };

  // Create payment intent on mount
  useEffect(() => {
    createPaymentIntent();
  }, []);

  // Apply discount code
  const handleApplyDiscount = async () => {
    if (!discountCode) {
      toast({
        title: "Please enter a discount code",
        variant: "destructive"
      });
      return;
    }

    setIsValidatingDiscount(true);
    try {
      // Re-create payment intent with discount code
      const result = await createPaymentIntent();
      
      if (result) {
        // Check if discount was applied (hardcoded check for now)
        if (discountCode.toUpperCase() === 'TESTMODE99') {
          toast({
            title: "Discount applied!",
            description: "99% off has been applied to your total",
          });
        } else {
          toast({
            title: "Invalid discount code",
            description: "The discount code you entered is not valid",
            variant: "destructive"
          });
          setDiscountCode('');
          setDiscountedAmount(null);
        }
      }
    } catch (error) {
      toast({
        title: "Error applying discount",
        description: "Failed to apply the discount code",
        variant: "destructive"
      });
    } finally {
      setIsValidatingDiscount(false);
    }
  };

  const validateContact = () => {
    const errors: any = {};
    
    if (!contactInfo.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!contactInfo.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!contactInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!contactInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(contactInfo.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    if (!validateContact()) {
      toast({
        title: "Please complete all required fields",
        description: "Fill in your contact information to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-success`,
          receipt_email: contactInfo.email,
        },
        redirect: 'if_required'
      });

      if (error) {
        // Handle errors
        if (error.type === 'card_error' || error.type === 'validation_error') {
          toast({
            title: "Payment failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "An error occurred",
            description: "Something went wrong. Please try again.",
            variant: "destructive"
          });
        }
        onError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful
        onSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      toast({
        title: "Payment error",
        description: err.message || "An unexpected error occurred",
        variant: "destructive"
      });
      onError(err.message || 'Payment error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate payment amount (use discounted amount if available)
  const originalAmount = paymentType === 'deposit' 
    ? pricing?.depositAmount || 0
    : pricing?.total || 0;
  
  const amount = discountedAmount !== null ? discountedAmount : originalAmount;
  const isDiscounted = discountCode.toUpperCase() === 'TESTMODE99' && discountedAmount !== null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={contactInfo.firstName}
              onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
              placeholder="John"
              data-testid="input-firstName"
              className={contactErrors.firstName ? 'border-red-500' : ''}
            />
            {contactErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">{contactErrors.firstName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={contactInfo.lastName}
              onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
              placeholder="Doe"
              data-testid="input-lastName"
              className={contactErrors.lastName ? 'border-red-500' : ''}
            />
            {contactErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{contactErrors.lastName}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            placeholder="john@example.com"
            data-testid="input-email"
            className={contactErrors.email ? 'border-red-500' : ''}
          />
          {contactErrors.email && (
            <p className="text-red-500 text-sm mt-1">{contactErrors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            data-testid="input-phone"
            className={contactErrors.phone ? 'border-red-500' : ''}
          />
          {contactErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{contactErrors.phone}</p>
          )}
        </div>
      </div>

      <Separator />

      {/* Discount Code Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Discount Code</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            data-testid="input-discount-code"
            className="flex-1"
            disabled={isValidatingDiscount}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handleApplyDiscount}
            disabled={!discountCode || isValidatingDiscount}
            data-testid="button-apply-discount"
          >
            {isValidatingDiscount ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Applying...</>
            ) : (
              'Apply'
            )}
          </Button>
        </div>
        {isDiscounted && (
          <Alert className="border-green-200 bg-green-50">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="font-semibold">99% discount applied!</div>
              <div className="text-sm mt-1">
                Original: ${(originalAmount / 100).toFixed(2)} → 
                <span className="font-semibold ml-1">Now: ${(amount / 100).toFixed(2)}</span>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Separator />

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Information</h3>
        
        {clientSecret ? (
          <div className="border rounded-lg p-4">
            <PaymentElement 
              options={{
                layout: 'tabs',
                paymentMethodOrder: ['card'],
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      <Separator />

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {paymentType === 'deposit' ? (
            <div>
              <span>Deposit: </span>
              {isDiscounted && (
                <>
                  <span className="line-through text-gray-400">${(originalAmount / 100).toFixed(2)}</span>
                  <span className="ml-1 font-semibold text-green-600">${(amount / 100).toFixed(2)}</span>
                  <span className="ml-1 text-xs text-green-600">(99% OFF)</span>
                </>
              )}
              {!isDiscounted && <span>${(amount / 100).toFixed(2)}</span>}
            </div>
          ) : (
            <div>
              <span>Total: </span>
              {isDiscounted && (
                <>
                  <span className="line-through text-gray-400">${(originalAmount / 100).toFixed(2)}</span>
                  <span className="ml-1 font-semibold text-green-600">${(amount / 100).toFixed(2)}</span>
                  <span className="ml-1 text-xs text-green-600">(99% OFF)</span>
                </>
              )}
              {!isDiscounted && <span>${(amount / 100).toFixed(2)}</span>}
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={!stripe || isProcessing || !clientSecret}
          className="min-w-[150px]"
          data-testid="button-submit-payment"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              {paymentType === 'deposit' ? 'Pay Deposit' : 'Pay in Full'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export function CheckoutModal({
  isOpen,
  onClose,
  onSuccess,
  paymentType,
  cruiseType,
  selectionPayload,
  pricing,
  contactInfo,
  holdId
}: CheckoutModalProps) {
  const [error, setError] = useState<string | null>(null);

  // Format date and time for display
  const eventDate = selectionPayload?.eventDate || selectionPayload?.date;
  const formattedDate = eventDate ? format(new Date(eventDate), 'EEEE, MMMM d, yyyy') : 'Date not selected';
  
  const timeSlot = selectionPayload?.selectedTimeSlot || selectionPayload?.timeSlot || '';
  const groupSize = selectionPayload?.groupSize || 0;
  
  // Calculate amounts
  const amount = paymentType === 'deposit' 
    ? pricing?.depositAmount || 0
    : pricing?.total || 0;

  const handleSuccess = (paymentIntentId: string) => {
    onSuccess(paymentIntentId);
    onClose();
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
          <DialogDescription>
            Review your booking details and complete payment
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Left Column - Booking Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formattedDate}</span>
                </div>
                {timeSlot && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{timeSlot}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{groupSize} guests</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Ship className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{cruiseType} Cruise</span>
                </div>
                
                <Separator className="my-3" />
                
                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${((pricing?.subtotal || 0) / 100).toFixed(2)}</span>
                  </div>
                  {pricing?.tax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${(pricing.tax / 100).toFixed(2)}</span>
                    </div>
                  )}
                  {pricing?.gratuity > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Gratuity</span>
                      <span>${(pricing.gratuity / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${((pricing?.total || 0) / 100).toFixed(2)}</span>
                  </div>
                  {paymentType === 'deposit' && (
                    <div className="flex justify-between text-sm text-primary">
                      <span>Deposit Due Today ({pricing?.depositPercent || 50}%)</span>
                      <span className="font-semibold">${(amount / 100).toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Right Column - Payment Form */}
          <div>
            <Elements 
              stripe={stripePromise}
              options={{
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#0070f3',
                  },
                },
              }}
            >
              <PaymentForm
                paymentType={paymentType}
                cruiseType={cruiseType}
                selectionPayload={selectionPayload}
                pricing={pricing}
                contactInfo={contactInfo}
                holdId={holdId}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </Elements>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}