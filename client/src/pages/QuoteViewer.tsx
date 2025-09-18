import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Ship, Calendar, Clock, MapPin, Phone, Mail, FileText,
  Download, Printer, CheckCircle, AlertCircle, Loader2,
  Users, Plus, Minus, Edit2, Save, CreditCard, ChevronRight, Sparkles
} from 'lucide-react';
import type { Quote, PricingPreview, Project, Contact, QuoteItem, RadioSection } from '@shared/schema';

type QuoteWithDetails = Quote & {
  pricing?: PricingPreview;
  project?: Project;
  contact?: Contact;
};

// Available packages for private cruises
const addOnPackages = [
  { id: 'essentials', name: 'Essentials Package', hourlyRate: 50, description: 'Coolers, ice, cups, napkins, and basic party supplies' },
  { id: 'ultimate', name: 'Ultimate Party Package', hourlyRate: 75, description: 'Everything in Essentials plus decorations, party games, and premium setup' }
];

// Disco cruise packages
const discoPackages = [
  { id: 'basic', name: 'Basic Disco Experience', price: 8500, description: 'DJ, dancing, and party atmosphere' },
  { id: 'queen', name: 'Disco Queen Experience', price: 9500, description: 'Basic package plus premium drinks and VIP treatment' },
  { id: 'platinum', name: 'Platinum Disco Experience', price: 10500, description: 'Ultimate disco experience with all premium amenities' }
];

export default function QuoteViewer() {
  const params = useParams();
  const quoteId = params.quoteId as string;
  const { toast } = useToast();
  
  // Extract token from URL query parameters or hash
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const token = urlParams.get('token') || hashParams.get('token');
  
  // Interactive state - now fully functional like quote builder
  const [groupSize, setGroupSize] = useState(20);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedDiscoPackage, setSelectedDiscoPackage] = useState<string>('basic');
  const [discoTicketQuantity, setDiscoTicketQuantity] = useState(10);
  const [privatePricing, setPrivatePricing] = useState<any>(null);
  const [discoPricing, setDiscoPricing] = useState<any>(null);
  const [pricingLoading, setPricingLoading] = useState(false);
  
  // NEW: Cruise type selection state - defaults to private
  const [selectedCruiseType, setSelectedCruiseType] = useState<'private' | 'disco'>('private');
  
  // Fetch quote details with token
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
    enabled: !!quoteId,
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

  // Fetch private cruise pricing
  const fetchPrivatePricing = async () => {
    if (!quote?.project) return;
    
    setPricingLoading(true);
    try {
      const timeSlot = getTimeSlotFromQuote(quote);
      const hourlyRate = 200 + selectedAddOns.reduce((sum, addOnId) => {
        const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
        return sum + (addOn?.hourlyRate || 0);
      }, 0);

      const res = await apiRequest('POST', '/api/pricing/cruise', {
        groupSize,
        eventDate: quote.project.projectDate,
        timeSlot,
        eventType: quote.project.eventType,
        cruiseType: 'private',
        packageType: selectedAddOns.join(','),
        hourlyRate
      });
      
      if (res.ok) {
        const pricing = await res.json();
        setPrivatePricing(pricing);
      }
    } catch (error) {
      console.error('Failed to fetch private pricing:', error);
    } finally {
      setPricingLoading(false);
    }
  };

  // Fetch disco cruise pricing
  const fetchDiscoPricing = async () => {
    if (!quote?.project) return;
    
    setPricingLoading(true);
    try {
      const packagePrice = discoPackages.find(pkg => pkg.id === selectedDiscoPackage)?.price || 8500;
      
      const res = await apiRequest('POST', '/api/pricing/preview', {
        items: [{
          productId: `disco_${selectedDiscoPackage}`,
          qty: discoTicketQuantity,
          unitPrice: packagePrice
        }],
        groupSize: discoTicketQuantity,
        projectDate: quote.project.projectDate
      });
      
      if (res.ok) {
        const pricing = await res.json();
        setDiscoPricing(pricing);
      }
    } catch (error) {
      console.error('Failed to fetch disco pricing:', error);
    } finally {
      setPricingLoading(false);
    }
  };

  // Refresh pricing when dependencies change
  useEffect(() => {
    if (quote && isPrivateCruise(quote)) {
      fetchPrivatePricing();
    }
  }, [quote, groupSize, selectedAddOns]);

  useEffect(() => {
    if (quote && isDiscoCruise(quote)) {
      fetchDiscoPricing();
    }
  }, [quote, selectedDiscoPackage, discoTicketQuantity]);

  // Payment handler - direct payment without acceptance step
  const handlePayment = async (paymentType: 'deposit' | 'full', cruiseType: 'private' | 'disco') => {
    const pricing = cruiseType === 'private' ? privatePricing : discoPricing;
    if (!pricing || !quote) {
      toast({
        title: "Pricing Error",
        description: "Please wait for pricing to load before proceeding.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create payment intent with updated quote data
      const paymentData = {
        amount: paymentType === 'deposit' ? pricing.depositAmount : pricing.total,
        currency: 'usd',
        projectId: quote.project?.id,
        quoteId: quote.id,
        paymentType,
        cruiseType,
        groupSize,
        selectedAddOns: cruiseType === 'private' ? selectedAddOns : [],
        discoPackage: cruiseType === 'disco' ? selectedDiscoPackage : null,
        discoTicketQuantity: cruiseType === 'disco' ? discoTicketQuantity : null,
        contactInfo: {
          name: quote.contact?.name || 'Customer',
          email: quote.contact?.email || '',
          phone: quote.contact?.phone || ''
        }
      };

      console.log('💳 Creating payment intent:', paymentData);

      const res = await apiRequest('POST', '/api/create-payment-intent', paymentData);
      
      if (!res.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await res.json();
      
      // Redirect to Stripe checkout or handle payment
      window.location.href = `/checkout?payment_intent=${clientSecret}&quote=${quoteId}`;

    } catch (error: any) {
      console.error('💳 Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Helper functions
  const getTimeSlotFromQuote = (quote: QuoteWithDetails) => {
    // Extract time slot from quote data
    const timeSection = quote.radioSections?.find(s => 
      s.title?.toLowerCase().includes('time') && s.selectedValue
    );
    return timeSection?.selectedValue || 'default-slot';
  };

  const isPrivateCruise = (quote: QuoteWithDetails) => {
    return quote.items?.some(item => 
      item.type === 'private_cruise' || 
      item.type === 'cruise' ||
      !item.name?.toLowerCase().includes('disco')
    );
  };

  const isDiscoCruise = (quote: QuoteWithDetails) => {
    return quote.project?.eventType === 'bachelor' || 
           quote.project?.eventType === 'bachelorette' ||
           quote.items?.some(item => 
             item.name?.toLowerCase().includes('disco') ||
             item.productId?.includes('disco')
           );
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return 'TBD';
    return format(new Date(date), 'EEEE, MMMM d, yyyy');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading quote...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (quoteError || !quote) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quote Not Found</h2>
          <p className="text-gray-600">This quote may have expired or the link is invalid.</p>
        </div>
      </div>
    );
  }

  const isExpired = quote.expiresAt && new Date(quote.expiresAt) < new Date();
  
  // NEW: Show both options for user to choose between
  const canShowPrivate = isPrivateCruise(quote);
  const canShowDisco = isDiscoCruise(quote);
  const showBothOptions = canShowPrivate && canShowDisco;
  
  // NEW: Only show the selected cruise type's pricing, but show tabs for both
  const showPrivateOptions = showBothOptions ? selectedCruiseType === 'private' : canShowPrivate;
  const showDiscoOptions = showBothOptions ? selectedCruiseType === 'disco' : canShowDisco;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img src={logoPath} alt="Premier Party Cruises" className="h-12" />
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Quote Details & Customization */}
          <div className="space-y-6">
            {/* Quote Header */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold">Your Quote</CardTitle>
                    <p className="text-gray-600">Quote #{quote.id.slice(-8).toUpperCase()}</p>
                  </div>
                  <Badge variant={isExpired ? "destructive" : "secondary"}>
                    {isExpired ? 'EXPIRED' : 'Active'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Event Date</p>
                    <p className="font-semibold">{formatDate(quote.project?.projectDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">{quote.project?.duration || 4} hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Event Type</p>
                    <p className="font-semibold capitalize">{quote.project?.eventType || 'Party'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-semibold">{quote.contact?.name || 'Customer'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cruise Type Selection - NEW: Show both options */}
            {showBothOptions && (
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Cruise Experience</CardTitle>
                  <p className="text-sm text-gray-600">Select between a private charter or join our disco cruise experience</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setSelectedCruiseType('private')}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-left",
                        selectedCruiseType === 'private'
                          ? "border-blue-500 bg-blue-50 text-blue-900"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      data-testid="button-select-private-cruise"
                    >
                      <div className="flex items-center mb-2">
                        <Ship className="h-5 w-5 mr-2" />
                        <span className="font-semibold">Private Cruise</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Charter the boat exclusively for your group. Customize your experience with add-on packages.
                      </p>
                    </button>
                    
                    <button
                      onClick={() => setSelectedCruiseType('disco')}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-left",
                        selectedCruiseType === 'disco'
                          ? "border-purple-500 bg-purple-50 text-purple-900"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      data-testid="button-select-disco-cruise"
                    >
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-5 w-5 mr-2" />
                        <span className="font-semibold">Disco Cruise</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Join our DJ-powered disco experience. Perfect for bachelor/bachelorette parties.
                      </p>
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Private Cruise Options */}
            {showPrivateOptions && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ship className="h-5 w-5 mr-2" />
                    Private Cruise Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Group Size */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Group Size: {groupSize} people
                    </label>
                    <Slider
                      value={[groupSize]}
                      onValueChange={(value) => setGroupSize(value[0])}
                      min={8}
                      max={75}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>8 people</span>
                      <span>75 people</span>
                    </div>
                  </div>

                  {/* Add-on Packages */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Additional Packages</label>
                    <div className="space-y-3">
                      {addOnPackages.map((pkg) => (
                        <div key={pkg.id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={`addon-${pkg.id}`}
                            checked={selectedAddOns.includes(pkg.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAddOns([...selectedAddOns, pkg.id]);
                              } else {
                                setSelectedAddOns(selectedAddOns.filter(id => id !== pkg.id));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <div className="flex-1">
                            <label htmlFor={`addon-${pkg.id}`} className="font-medium cursor-pointer">
                              {pkg.name} (+${pkg.hourlyRate}/hr)
                            </label>
                            <p className="text-sm text-gray-600">{pkg.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Disco Cruise Options */}
            {showDiscoOptions && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Disco Cruise Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Package Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Package Type</label>
                    <Select value={selectedDiscoPackage} onValueChange={setSelectedDiscoPackage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {discoPackages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>
                            {pkg.name} - {formatCurrency(pkg.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ticket Quantity */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Number of Tickets: {discoTicketQuantity}
                    </label>
                    <Slider
                      value={[discoTicketQuantity]}
                      onValueChange={(value) => setDiscoTicketQuantity(value[0])}
                      min={1}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 ticket</span>
                      <span>50 tickets</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Pricing & Payment */}
          <div className="space-y-6">
            {/* Private Cruise Pricing */}
            {showPrivateOptions && (
              <Card>
                <CardHeader>
                  <CardTitle>Private Cruise Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  {pricingLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : privatePricing ? (
                    <div className="space-y-4">
                      {/* Pricing Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Base Rate ({privatePricing.duration}h × ${privatePricing.hourlyRate}/hr):</span>
                          <span>{formatCurrency(privatePricing.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax (8.25%):</span>
                          <span>{formatCurrency(privatePricing.tax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gratuity (20%):</span>
                          <span>{formatCurrency(privatePricing.gratuity)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>{formatCurrency(privatePricing.total)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Per Person:</span>
                          <span>{formatCurrency(privatePricing.perPersonCost)}</span>
                        </div>
                      </div>

                      {/* Payment Buttons */}
                      <div className="space-y-3">
                        <Button
                          onClick={() => handlePayment('deposit', 'private')}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={isExpired}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Deposit ({formatCurrency(privatePricing.depositAmount)})
                        </Button>
                        <Button
                          onClick={() => handlePayment('full', 'private')}
                          variant="outline"
                          className="w-full"
                          disabled={isExpired}
                        >
                          Pay in Full ({formatCurrency(privatePricing.total)})
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">Loading pricing...</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Disco Cruise Pricing */}
            {showDiscoOptions && (
              <Card>
                <CardHeader>
                  <CardTitle>Disco Cruise Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  {pricingLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : discoPricing ? (
                    <div className="space-y-4">
                      {/* Pricing Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>{discoTicketQuantity} × {discoPackages.find(p => p.id === selectedDiscoPackage)?.name}:</span>
                          <span>{formatCurrency(discoPricing.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax (8.25%):</span>
                          <span>{formatCurrency(discoPricing.tax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gratuity (20%):</span>
                          <span>{formatCurrency(discoPricing.gratuity)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>{formatCurrency(discoPricing.total)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Per Person:</span>
                          <span>{formatCurrency(discoPricing.perPersonCost)}</span>
                        </div>
                      </div>

                      {/* Payment Buttons */}
                      <div className="space-y-3">
                        <Button
                          onClick={() => handlePayment('deposit', 'disco')}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          disabled={isExpired}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Deposit ({formatCurrency(discoPricing.depositAmount)})
                        </Button>
                        <Button
                          onClick={() => handlePayment('full', 'disco')}
                          variant="outline"
                          className="w-full"
                          disabled={isExpired}
                        >
                          Pay in Full ({formatCurrency(discoPricing.total)})
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">Loading pricing...</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Send Quote Option */}
            <Card>
              <CardHeader>
                <CardTitle>Share This Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Want to review this later or share with others?
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link Copied!",
                      description: "Quote link has been copied to your clipboard.",
                    });
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Copy Quote Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}