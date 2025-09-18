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
import { Ship, Lock, CreditCard, ArrowLeft, CheckCircle, Calendar, Clock, Users, MapPin } from "lucide-react";
import { format } from 'date-fns';
import type { Quote, Project, Contact, PricingPreview } from '@shared/schema';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

interface QuoteWithDetails extends Quote {
  pricing?: PricingPreview;
  project?: Project;
  contact?: Contact;
}

interface CheckoutFormProps {
  amount: number;
  description: string;
  quote?: QuoteWithDetails;
}

const CheckoutForm = ({ amount, description, quote }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  // Helper function to determine cruise type from quote data
  const determineCruiseType = (quote: QuoteWithDetails): string => {
    if (!quote.items || quote.items.length === 0) {
      return "Premier Party Cruise";
    }
    
    // Check if it's a disco cruise
    const hasDiscoItems = quote.items.some(item => 
      item.name?.toLowerCase().includes('disco') || 
      item.productId?.includes('disco')
    );
    
    if (hasDiscoItems) {
      return "Disco Cruise";
    }
    
    // Check if it's a private cruise
    const hasPrivateItems = quote.items.some(item => 
      item.name?.toLowerCase().includes('private') || 
      item.productId?.includes('private')
    );
    
    if (hasPrivateItems) {
      return "Private Cruise";
    }
    
    return "Premier Party Cruise";
  };

  // Helper function to get boat details based on quote data
  const getBoatDetails = (quote: QuoteWithDetails): string => {
    const groupSize = quote.project?.groupSize || 0;
    const cruiseType = determineCruiseType(quote);
    
    // For disco cruises, always use ATX Disco Cruise boat
    if (cruiseType.toLowerCase().includes('disco')) {
      return 'ATX Disco Cruise • Up to 100 guests';
    }
    
    // For private cruises, determine boat based on group size
    if (groupSize <= 14) {
      return 'Day Tripper • Up to 14 guests';
    } else if (groupSize <= 25) {
      return '25-Person Party Cruiser • Up to 25 guests';
    } else if (groupSize <= 50) {
      return 'Clever Girl • Up to 50 guests';
    } else {
      return 'Premier Charter Yacht • 50+ guests';
    }
  };

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
      <div className="bg-muted rounded-lg p-4 space-y-4">
        <h3 className="font-semibold mb-3" data-testid="text-payment-summary">Payment Summary</h3>
        
        {quote && quote.project ? (
          <div className="space-y-3">
            {/* Cruise Type and Basic Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Ship className="w-4 h-4 text-primary" />
                <span className="font-medium">{determineCruiseType(quote)}</span>
              </div>
              <Badge variant="outline">{quote.project.groupSize ? `${quote.project.groupSize} guests` : 'Group size TBD'}</Badge>
            </div>
            
            {/* Event Date and Time */}
            {quote.project.projectDate && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(quote.project.projectDate), 'EEEE, MMMM d, yyyy')}</span>
              </div>
            )}
            
            {/* Time Slot */}
            {quote.project.preferredTime && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{quote.project.preferredTime}</span>
              </div>
            )}
            
            {/* Contact Info */}
            {quote.contact && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{quote.contact.name}</span>
                {quote.contact.email && <span>• {quote.contact.email}</span>}
              </div>
            )}
            
            {/* Boat Details */}
            {quote.project && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{getBoatDetails(quote)}</span>
              </div>
            )}
            
            {/* Quote Items */}
            {quote.items && quote.items.length > 0 && (
              <div className="space-y-2">
                <Separator />
                <div className="text-sm font-medium">Selected Items:</div>
                {quote.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>
                      {item.name} {item.qty > 1 && `(x${item.qty})`}
                    </span>
                    <span>${((item.unitPrice * item.qty) / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pricing Breakdown */}
            {quote.pricing && (
              <div className="space-y-2">
                <Separator />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${(quote.pricing.subtotal / 100).toFixed(2)}</span>
                  </div>
                  {quote.pricing.tax > 0 && (
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${(quote.pricing.tax / 100).toFixed(2)}</span>
                    </div>
                  )}
                  {quote.pricing.gratuity > 0 && (
                    <div className="flex justify-between">
                      <span>Gratuity:</span>
                      <span>${(quote.pricing.gratuity / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${(quote.pricing.total / 100).toFixed(2)}</span>
                  </div>
                  {quote.pricing.depositAmount && quote.pricing.depositAmount < quote.pricing.total && (
                    <div className="flex justify-between text-primary font-medium">
                      <span>Deposit Required:</span>
                      <span>${(quote.pricing.depositAmount / 100).toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <Separator />
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Loading quote details...</div>
        )}
        
        {/* Final Payment Amount */}
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="font-semibold" data-testid="text-payment-description">{description}</span>
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
  const [quote, setQuote] = useState<QuoteWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Read quote ID and payment intent from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const quoteId = urlParams.get('quote') || params?.quoteId;
  const paymentIntentClientSecret = urlParams.get('payment_intent');
  const token = urlParams.get('token');
  const paymentType = urlParams.get('payment_type');

  useEffect(() => {
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      toast({
        title: "Payment Successful! 🎉",
        description: "Your booking has been confirmed.",
      });
    }

    if (quoteId) {
      fetchQuoteAndCreatePaymentIntent();
    } else {
      toast({
        title: "Error",
        description: "No quote ID found in URL. Please return to your quote and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [quoteId]);

  const fetchQuoteAndCreatePaymentIntent = async () => {
    try {
      setIsLoading(true);
      
      if (!quoteId) {
        throw new Error("Quote ID is required");
      }
      
      // Require token for quote access - this is now always passed from QuoteViewer
      if (!token) {
        throw new Error("Access token required. Please return to your quote and try again.");
      }
      
      // Fetch quote with token for full access
      const url = `/api/quotes/${encodeURIComponent(quoteId)}/public?token=${encodeURIComponent(token)}`;
      const res = await apiRequest('GET', url);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Failed to fetch quote (${res.status})`);
      }
      
      const quoteData: QuoteWithDetails = await res.json();
      
      setQuote(quoteData);
      
      // Calculate amount and description from quote data
      const pricing = quoteData.pricing;
      const project = quoteData.project;
      
      if (!pricing || !project) {
        throw new Error("Quote pricing or project data not found");
      }
      
      // Use payment type from URL parameter (passed from QuoteViewer)
      const isDeposit = paymentType !== 'full';
      const paymentAmount = isDeposit ? pricing.depositAmount : pricing.total;
      
      // Generate description based on quote details and URL parameter
      const cruiseType = determineCruiseTypeHelper(quoteData);
      const paymentTypeLabel = isDeposit ? "Deposit Payment" : "Full Payment";
      const eventDate = project.projectDate ? format(new Date(project.projectDate), 'MMM d, yyyy') : '';
      const paymentDescription = `${cruiseType} - ${paymentTypeLabel}${eventDate ? ` (${eventDate})` : ''}`;
      
      setAmount(paymentAmount);
      setDescription(paymentDescription);
      
      // Use existing client secret if available, otherwise create new payment intent
      if (paymentIntentClientSecret) {
        setClientSecret(paymentIntentClientSecret);
      } else if (import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
        // Create new payment intent
        const response = await apiRequest("POST", "/api/create-payment-intent", {
          amount: paymentAmount,
          quoteId: quoteId,
        });
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
      }
      
    } catch (error: any) {
      console.error("Failed to fetch quote or create payment intent:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load payment information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to determine cruise type from quote data (shared utility)
  const determineCruiseTypeHelper = (quote: QuoteWithDetails): string => {
    if (!quote.items || quote.items.length === 0) {
      return "Premier Party Cruise";
    }
    
    // Check if it's a disco cruise
    const hasDiscoItems = quote.items.some(item => 
      item.name?.toLowerCase().includes('disco') || 
      item.productId?.includes('disco')
    );
    
    if (hasDiscoItems) {
      return "Disco Cruise";
    }
    
    // Check if it's a private cruise
    const hasPrivateItems = quote.items.some(item => 
      item.name?.toLowerCase().includes('private') || 
      item.productId?.includes('private')
    );
    
    if (hasPrivateItems) {
      return "Private Cruise";
    }
    
    return "Premier Party Cruise";
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
                data-testid="button-back-home"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
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
              <CheckoutForm amount={amount} description={description} quote={quote} />
            </Elements>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
