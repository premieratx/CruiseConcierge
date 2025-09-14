import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Ship, Lock, CreditCard, ArrowLeft, CheckCircle } from "lucide-react";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

interface CheckoutFormProps {
  amount: number;
  description: string;
}

const CheckoutForm = ({ amount, description }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout?success=true`,
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setPaymentSucceeded(true);
        toast({
          title: "Payment Successful! 🎉",
          description: "Your booking has been confirmed. We'll send you a confirmation email shortly.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSucceeded) {
    return (
      <div className="text-center py-8" data-testid="payment-success">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
        <p className="text-muted-foreground mb-6">
          Your Premier Party Cruise booking has been confirmed. You'll receive a confirmation email shortly.
        </p>
        <Button onClick={() => window.location.href = '/'} data-testid="button-return-home">
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-muted rounded-lg p-4">
        <h3 className="font-semibold mb-2" data-testid="text-payment-summary">Payment Summary</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm" data-testid="text-payment-description">{description}</span>
          <span className="font-bold text-lg text-primary" data-testid="text-payment-amount">
            ${(amount / 100).toFixed(2)}
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Payment Details</h3>
        <PaymentElement />
      </div>

      <div className="flex items-center space-x-2 text-xs text-muted-foreground bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
        <Lock className="w-4 h-4 text-green-600" />
        <span>Your payment is secured by Stripe. We never store your payment information.</span>
      </div>

      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => window.history.back()}
          disabled={isProcessing}
          data-testid="button-go-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-austin-500 hover:bg-austin-500/90"
          disabled={!stripe || isProcessing}
          data-testid="button-complete-payment"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Complete Payment
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default function Checkout() {
  const [match, params] = useRoute('/checkout/:quoteId?');
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      toast({
        title: "Payment Successful! 🎉",
        description: "Your booking has been confirmed.",
      });
    }

    createPaymentIntent();
  }, [params?.quoteId]);

  const createPaymentIntent = async () => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we'll use mock data
      // In production, this would fetch the actual quote/invoice details
      const mockAmount = 17861; // $178.61 in cents
      const mockDescription = "Premier Party Cruise - Deposit Payment";
      
      if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
        // Demo mode - no real Stripe integration
        setAmount(mockAmount);
        setDescription(mockDescription);
        setIsLoading(false);
        return;
      }

      const response = await apiRequest("POST", "/api/create-payment-intent", {
        amount: mockAmount,
        quoteId: params?.quoteId || null,
      });
      
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setAmount(mockAmount);
      setDescription(mockDescription);
      
    } catch (error) {
      console.error("Failed to create payment intent:", error);
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-marine-50 via-background to-marine-100 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 boat-shadow" data-testid="checkout-loading">
          <CardContent className="p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Preparing your payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Demo mode when Stripe is not configured
  if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY || !clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-marine-50 via-background to-marine-100">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Ship className="text-primary-foreground text-xl" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-foreground">Premier Party Cruises</h1>
                <p className="text-xs text-muted-foreground">Secure Checkout</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-md">
          <Card className="boat-shadow" data-testid="checkout-demo">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Demo Checkout</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Payment processing demonstration</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Birthday Party - Disco Boat</span>
                  <Badge variant="secondary">Deposit</Badge>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${(amount / 100).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Demo Mode</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This is a demonstration of the checkout flow. In production, this would integrate with Stripe for secure payment processing.
                </p>
                <Button 
                  className="w-full bg-austin-500 hover:bg-austin-500/90"
                  onClick={() => {
                    toast({
                      title: "Demo Payment Successful! 🎉",
                      description: "In production, this would process a real payment through Stripe.",
                    });
                    setTimeout(() => {
                      window.location.href = '/';
                    }, 2000);
                  }}
                  data-testid="button-demo-payment"
                >
                  Simulate Payment Success
                </Button>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = '/'}
                data-testid="button-back-to-dashboard"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-marine-50 via-background to-marine-100">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Ship className="text-primary-foreground text-xl" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-foreground">Premier Party Cruises</h1>
              <p className="text-xs text-muted-foreground">Secure Checkout</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="boat-shadow" data-testid="checkout-form">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Complete Your Booking</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Secure payment powered by Stripe</p>
          </CardHeader>
          
          <CardContent>
            <Elements 
              stripe={stripePromise} 
              options={{ 
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: 'hsl(220 90% 55%)',
                    colorBackground: 'hsl(0 0% 100%)',
                    colorText: 'hsl(220 10% 15%)',
                    colorDanger: 'hsl(0 84% 60%)',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    spacingUnit: '4px',
                    borderRadius: '6px',
                  }
                }
              }}
            >
              <CheckoutForm amount={amount} description={description} />
            </Elements>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
