import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Ship, Calendar, Users, Clock, DollarSign, FileText, 
  ChevronRight, Check, AlertCircle, Loader2, PlusCircle,
  Music, Camera, Sparkles, CreditCard, Edit, X
} from 'lucide-react';
import type { Quote, PricingPreview } from '@shared/schema';

interface QuoteOption {
  id: string;
  name: string;
  price: number;
  icon: any;
  description: string;
}

const additionalOptions: QuoteOption[] = [
  { id: 'dj', name: 'DJ Service', price: 50000, icon: Music, description: 'Professional DJ with custom playlist' },
  { id: 'photographer', name: 'Photographer', price: 75000, icon: Camera, description: 'Professional event photography' },
  { id: 'lilypad', name: 'Lily Pad (6ft x 20ft)', price: 5000, icon: Sparkles, description: 'Foam float for water fun' },
  { id: 'cooler', name: 'Party Cooler Package', price: 7500, icon: Sparkles, description: 'Cooler with ice, water, and supplies' },
];

export default function QuoteViewer() {
  const params = useParams();
  const quoteId = params.quoteId as string;
  const { toast } = useToast();
  
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [signature, setSignature] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [groupSize, setGroupSize] = useState<number>(0);

  // Fetch quote details
  const { data: quote, isLoading, refetch } = useQuery<Quote & { pricing?: PricingPreview }>({
    queryKey: [`/api/quotes/${quoteId}/public`],
    enabled: !!quoteId,
  });

  // Initialize group size from quote
  useEffect(() => {
    if (quote?.pricing?.breakdown) {
      const currentSize = parseInt(quote.perPersonCost ? (quote.total / quote.perPersonCost).toString() : '0');
      setGroupSize(currentSize || 25);
    }
  }, [quote]);

  // Recalculate pricing mutation
  const recalculatePricing = useMutation({
    mutationFn: async (params: { groupSize?: number; options?: string[]; discountCode?: string }) => {
      return apiRequest(`/api/quotes/${quoteId}/recalculate-public`, 'POST', params);
    },
    onSuccess: (data) => {
      refetch();
      toast({ title: 'Quote updated', description: 'Pricing has been recalculated' });
    },
    onError: () => {
      toast({ 
        title: 'Error', 
        description: 'Failed to update pricing',
        variant: 'destructive' 
      });
    },
  });

  // Sign quote mutation
  const signQuote = useMutation({
    mutationFn: async () => {
      return apiRequest(`/api/quotes/${quoteId}/sign`, 'POST', {
        signature,
        selectedOptions,
        specialRequests,
        discountCode,
      });
    },
    onSuccess: (data) => {
      toast({ 
        title: 'Quote accepted!', 
        description: 'Your booking has been confirmed. Check your email for the invoice.',
      });
      // Redirect to invoice or success page
      window.location.href = `/invoice/${data.invoiceId}`;
    },
    onError: () => {
      toast({ 
        title: 'Error', 
        description: 'Failed to sign quote. Please try again.',
        variant: 'destructive' 
      });
    },
  });

  const handleOptionToggle = (optionId: string) => {
    const newOptions = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    
    setSelectedOptions(newOptions);
    recalculatePricing.mutate({ options: newOptions, discountCode });
  };

  const handleApplyDiscount = () => {
    recalculatePricing.mutate({ options: selectedOptions, discountCode });
  };

  const handleGroupSizeUpdate = () => {
    recalculatePricing.mutate({ groupSize, options: selectedOptions, discountCode });
    setIsEditing(false);
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Quote Not Found</CardTitle>
            <CardDescription>
              This quote may have expired or the link is invalid.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const totalWithOptions = quote.total + selectedOptions.reduce((sum, optId) => {
    const option = additionalOptions.find(opt => opt.id === optId);
    return sum + (option?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Ship className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Premier Party Cruises</h1>
                <p className="text-sm text-muted-foreground">Your Custom Quote</p>
              </div>
            </div>
            <Badge variant={quote.status === 'ACCEPTED' ? 'default' : 'secondary'}>
              {quote.status}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="accept">Accept & Sign</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Quote Summary</CardTitle>
                <CardDescription>
                  Valid until {new Date(quote.validUntil || Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Event Details */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Event Date</p>
                      <p className="font-medium">
                        {quote.pricing?.breakdown?.dayName}, {new Date(quote.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">4 Hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Group Size</p>
                        <p className="font-medium">{groupSize} Guests</p>
                      </div>
                      {!isEditing && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ship className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Vessel</p>
                      <p className="font-medium">{quote.pricing?.breakdown?.boatType}</p>
                    </div>
                  </div>
                </div>

                {/* Edit Group Size */}
                {isEditing && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="pt-6">
                      <div className="flex items-end gap-3">
                        <div className="flex-1">
                          <Label htmlFor="groupSize">Update Group Size</Label>
                          <Input
                            id="groupSize"
                            type="number"
                            value={groupSize}
                            onChange={(e) => setGroupSize(parseInt(e.target.value))}
                            min="1"
                            max="75"
                          />
                        </div>
                        <Button onClick={handleGroupSizeUpdate}>Update</Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => setIsEditing(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Pricing Breakdown</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Cruise ({quote.pricing?.breakdown?.cruiseDuration} hours)</span>
                      <span>{formatCurrency((quote.pricing?.breakdown?.baseCruiseCost || 0) * 100)}</span>
                    </div>
                    
                    {quote.pricing?.breakdown?.crewFee && quote.pricing.breakdown.crewFee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Additional Crew (Texas Law)</span>
                        <span>{formatCurrency(quote.pricing.breakdown.crewFee * 100)}</span>
                      </div>
                    )}

                    {selectedOptions.map(optId => {
                      const option = additionalOptions.find(opt => opt.id === optId);
                      if (!option) return null;
                      return (
                        <div key={optId} className="flex justify-between text-sm">
                          <span>{option.name}</span>
                          <span>{formatCurrency(option.price)}</span>
                        </div>
                      );
                    })}

                    <Separator className="my-2" />

                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{formatCurrency(quote.subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>20% Gratuity</span>
                      <span>{formatCurrency(quote.gratuity)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>8.25% Texas Sales Tax</span>
                      <span>{formatCurrency(quote.tax)}</span>
                    </div>

                    {quote.discountTotal > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-{formatCurrency(quote.discountTotal)}</span>
                      </div>
                    )}

                    <Separator className="my-2" />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(totalWithOptions)}</span>
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Per Person</span>
                      <span>{formatCurrency(Math.floor(totalWithOptions / groupSize))}</span>
                    </div>
                  </div>
                </div>

                {/* Deposit Info */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Deposit Due at Booking</span>
                        <span className="font-bold text-lg">
                          {formatCurrency(quote.depositAmount)}
                        </span>
                      </div>
                      {quote.depositPercent < 100 && (
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Balance Due (30 days before)</span>
                          <span>{formatCurrency(totalWithOptions - quote.depositAmount)}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customize Tab */}
          <TabsContent value="customize" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Experience</CardTitle>
                <CardDescription>
                  Add optional services to enhance your cruise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {additionalOptions.map((option) => (
                  <Card 
                    key={option.id}
                    className={cn(
                      "cursor-pointer transition-colors",
                      selectedOptions.includes(option.id) && "border-primary bg-primary/5"
                    )}
                    onClick={() => handleOptionToggle(option.id)}
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={selectedOptions.includes(option.id)}
                          onCheckedChange={() => handleOptionToggle(option.id)}
                        />
                        <option.icon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{formatCurrency(option.price)}</Badge>
                    </CardContent>
                  </Card>
                ))}

                <Separator />

                {/* Discount Code */}
                <div className="space-y-3">
                  <Label htmlFor="discount">Discount Code</Label>
                  <div className="flex gap-2">
                    <Input
                      id="discount"
                      placeholder="Enter discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button 
                      onClick={handleApplyDiscount}
                      disabled={!discountCode || recalculatePricing.isPending}
                    >
                      {recalculatePricing.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Apply'
                      )}
                    </Button>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-3">
                  <Label htmlFor="requests">Special Requests</Label>
                  <Textarea
                    id="requests"
                    placeholder="Any special requirements or requests for your cruise..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Friendly, experienced USCG licensed captain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>AMAZING Bluetooth speaker system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Plenty of cooler space for your beverages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Full-coverage shade canopy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Life jackets and safety equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Easy access ladder for swimming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Electric pump for floats</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Payment Terms</h4>
                  <p className="text-muted-foreground">
                    A {quote.depositPercent}% deposit is required to confirm your booking. 
                    {quote.depositPercent < 100 && ' The remaining balance is due 30 days before your event date.'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                  <p className="text-muted-foreground">
                    Cancellations made more than 30 days before the event receive a full refund. 
                    Cancellations within 30 days forfeit the deposit. 
                    Cancellations within 7 days are non-refundable.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Weather Policy</h4>
                  <p className="text-muted-foreground">
                    In case of severe weather, we'll work with you to reschedule at no additional cost.
                    Light rain does not constitute cancellation.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Safety Requirements</h4>
                  <p className="text-muted-foreground">
                    All guests must follow captain's safety instructions. 
                    Children under 12 must wear life jackets at all times.
                    No glass containers except wine/champagne bottles.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accept & Sign Tab */}
          <TabsContent value="accept" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Accept Quote & Sign</CardTitle>
                <CardDescription>
                  Review your quote and provide your signature to confirm booking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Final Summary */}
                <Card className="border-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Final Quote Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Event Date</span>
                      <span className="font-medium">
                        {quote.pricing?.breakdown?.dayName}, {new Date(quote.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Group Size</span>
                      <span className="font-medium">{groupSize} guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vessel</span>
                      <span className="font-medium">{quote.pricing?.breakdown?.boatType}</span>
                    </div>
                    
                    {selectedOptions.length > 0 && (
                      <>
                        <Separator />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Additional Services:</p>
                          {selectedOptions.map(optId => {
                            const option = additionalOptions.find(opt => opt.id === optId);
                            return option ? (
                              <p key={optId} className="text-sm text-muted-foreground">
                                • {option.name}
                              </p>
                            ) : null;
                          })}
                        </div>
                      </>
                    )}

                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span>{formatCurrency(totalWithOptions)}</span>
                    </div>
                    <div className="flex justify-between text-primary font-medium">
                      <span>Deposit Due Now</span>
                      <span>{formatCurrency(Math.floor(totalWithOptions * quote.depositPercent / 100))}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Agreement Checkbox */}
                <div className="flex items-start gap-2">
                  <Checkbox 
                    id="terms"
                    checked={!!signature}
                    onCheckedChange={(checked) => setSignature(checked ? '' : signature)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I have read and agree to the terms and conditions. 
                    I understand that a {quote.depositPercent}% deposit will be charged upon signing.
                  </Label>
                </div>

                {/* Signature Field */}
                <div className="space-y-3">
                  <Label htmlFor="signature">Electronic Signature *</Label>
                  <Input
                    id="signature"
                    placeholder="Type your full name"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="font-signature text-lg"
                  />
                  <p className="text-xs text-muted-foreground">
                    By typing your name above, you are providing an electronic signature.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={() => signQuote.mutate()}
                    disabled={!signature || signQuote.isPending}
                  >
                    {signQuote.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Accept Quote & Pay Deposit
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  You will be redirected to secure payment after signing
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Add this helper function outside the component
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}