import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Ship, Calendar, Clock, MapPin, Phone, Mail, FileText,
  Download, Printer, CheckCircle, AlertCircle, Loader2,
  Users, Plus, Minus, Edit2, Save, CreditCard, ChevronRight
} from 'lucide-react';
import type { Quote, PricingPreview, Project, Contact, QuoteItem, RadioSection } from '@shared/schema';

type QuoteWithDetails = Quote & {
  pricing?: PricingPreview;
  project?: Project;
  contact?: Contact;
};

export default function QuoteViewer() {
  const params = useParams();
  const quoteId = params.quoteId as string;
  const { toast } = useToast();
  
  // Extract token from URL query parameters  
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  // State for interactive elements
  const [selectedPackage, setSelectedPackage] = useState<string>('standard');
  const [discoTickets, setDiscoTickets] = useState<number>(0);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [signature, setSignature] = useState('');
  
  // Fetch quote details with token
  const { data: quote, isLoading, error: quoteError } = useQuery<QuoteWithDetails>({
    queryKey: [`/api/quotes/${quoteId}/public`, token],
    queryFn: async () => {
      const url = token 
        ? `/api/quotes/${quoteId}/public?token=${encodeURIComponent(token)}`
        : `/api/quotes/${quoteId}/public`;
      const res = await apiRequest('GET', url);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to fetch quote');
      }
      return res.json();
    },
    enabled: !!quoteId,
    retry: (failureCount, error: any) => {
      if (error?.message?.includes('Invalid access token') || error?.message?.includes('Access token required')) return false;
      if (error?.status === 401 || error?.status === 404) return false;
      return failureCount < 2;
    },
  });

  // Track quote view when quote is loaded
  const trackView = useMutation({
    mutationFn: async (metadata: any) => {
      const res = await apiRequest('POST', `/api/quotes/${quoteId}/track-view`, {
        contactId: quote?.contact?.id,
        viewDuration: null, // Will be calculated on page unload
        metadata: {
          ...metadata,
          viewedAt: new Date().toISOString(),
          source: 'quote_viewer'
        }
      });
      if (!res.ok) throw new Error('Failed to track view');
      return res.json();
    },
    onError: (error) => {
      // Silent fail for analytics - don't disrupt user experience
      console.warn('Failed to track quote view:', error);
    }
  });

  // Track view when quote loads
  useEffect(() => {
    if (quote && !isLoading && !quoteError) {
      trackView.mutate({
        quoteTotal: quote.total,
        quoteStatus: quote.status,
        projectId: quote.projectId,
        hasContact: !!quote.contact
      });
    }
  }, [quote, isLoading, quoteError]);
  
  // Save selections mutation
  const saveSelections = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('PATCH', `/api/quotes/${quoteId}/selections`, {
        selectedPackage,
        discoTickets,
        selectedAddOns,
        signature: acceptTerms ? signature : null,
      });
      if (!res.ok) throw new Error('Failed to save selections');
      return res.json();
    },
    onSuccess: () => {
      toast({ 
        title: 'Selections Saved', 
        description: 'Your quote selections have been updated.',
      });
      queryClient.invalidateQueries({ queryKey: [`/api/quotes/${quoteId}/public`] });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to save selections',
        variant: 'destructive',
      });
    },
  });
  
  // Initialize selections from quote data
  useEffect(() => {
    if (quote?.radioSections) {
      // Load saved selections from radioSections
      const packageSection = quote.radioSections.find(s => s.id === 'package_selection');
      if (packageSection?.selectedValue) {
        setSelectedPackage(packageSection.selectedValue);
      }
      
      // Load disco tickets if present
      const discoItem = quote.items?.find(item => item.name?.includes('Disco'));
      if (discoItem?.qty) {
        setDiscoTickets(discoItem.qty);
      }
      
      // Load selected add-ons
      const addOnItems = quote.items?.filter(item => item.isOptional && item.qty > 0);
      if (addOnItems) {
        setSelectedAddOns(addOnItems.map(item => item.id));
      }
    }
  }, [quote]);
  
  // Calculate pricing based on selections
  const calculateTotal = () => {
    if (!quote) return { subtotal: 0, tax: 0, gratuity: 0, total: 0 };
    
    let subtotal = quote.subtotal || 0;
    
    // Add package upgrade cost
    if (selectedPackage === 'essentials') {
      subtotal += 5000; // $50/hr upgrade
    } else if (selectedPackage === 'ultimate') {
      subtotal += 7500; // $75/hr upgrade  
    }
    
    // Add disco tickets
    if (discoTickets > 0) {
      subtotal += discoTickets * 8500; // $85 per ticket
    }
    
    // Add selected add-ons
    selectedAddOns.forEach(addOnId => {
      const addOn = quote.items?.find(item => item.id === addOnId);
      if (addOn) {
        subtotal += addOn.unitPrice * (addOn.qty || 1);
      }
    });
    
    const tax = Math.round(subtotal * 0.0825);
    const gratuity = Math.round(subtotal * 0.20);
    const total = subtotal + tax + gratuity;
    
    return { subtotal, tax, gratuity, total };
  };
  
  const pricing = calculateTotal();
  
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
  const showDiscoOptions = quote.project?.eventType === 'bachelor' || quote.project?.eventType === 'bachelorette' || false;
  
  return (
    <div className="min-h-screen bg-white">
      {/* Print/Download Actions */}
      <div className="sticky top-0 z-50 bg-white border-b print:hidden">
        <div className="max-w-5xl mx-auto px-6 py-3 flex justify-end gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.print()}
            data-testid="button-print"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => saveSelections.mutate()}
            disabled={saveSelections.isPending}
            data-testid="button-save"
          >
            {saveSelections.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Selections
          </Button>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Professional Header Section */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-8 mb-6">
            {/* Company Info (From) */}
            <div>
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-16 mb-4"
                data-testid="img-company-logo"
              />
              <div className="text-sm space-y-1">
                <p className="font-semibold text-gray-900">Premier Party Cruises</p>
                <p className="text-gray-600">1112 S Lakeshore Blvd</p>
                <p className="text-gray-600">Austin, TX 78741</p>
                <p className="text-gray-600">(512) 565-6209</p>
                <p className="text-gray-600">info@premierpartycruises.com</p>
              </div>
            </div>
            
            {/* Quote Info & Customer Info (To) */}
            <div className="text-right">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">QUOTE</h1>
                <div className="text-sm space-y-1">
                  <p className="text-gray-600">Quote #: {quote.id.slice(-8).toUpperCase()}</p>
                  <p className="text-gray-600">Date Issued: {format(new Date(quote.createdAt), 'MMM dd, yyyy')}</p>
                  {quote.expiresAt && (
                    <p className={cn(
                      "font-medium",
                      isExpired ? "text-red-600" : "text-gray-600"
                    )}>
                      {isExpired ? 'EXPIRED' : `Valid Until: ${format(new Date(quote.expiresAt), 'MMM dd, yyyy')}`}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="text-sm space-y-1 text-left inline-block">
                <p className="font-semibold text-gray-900 uppercase">Bill To:</p>
                <p className="text-gray-600">{quote.contact?.name || 'Customer Name'}</p>
                <p className="text-gray-600">{quote.contact?.email || 'customer@email.com'}</p>
                {quote.contact?.phone && (
                  <p className="text-gray-600">{quote.contact.phone}</p>
                )}
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Event Details Bar */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 uppercase text-xs mb-1">Event Type</p>
                <p className="font-semibold text-gray-900">
                  {quote.project?.eventType === 'bachelor' && 'Bachelor Party'}
                  {quote.project?.eventType === 'bachelorette' && 'Bachelorette Party'}
                  {quote.project?.eventType === 'birthday' && 'Birthday Party'}
                  {quote.project?.eventType === 'corporate' && 'Corporate Event'}
                  {quote.project?.eventType === 'wedding' && 'Wedding Reception'}
                  {(!quote.project?.eventType || quote.project?.eventType === 'other') && 'Party Cruise'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs mb-1">Event Date</p>
                <p className="font-semibold text-gray-900">
                  {formatDate(quote.project?.projectDate)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs mb-1">Duration</p>
                <p className="font-semibold text-gray-900">
                  {quote.project?.duration || 4} hours
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs mb-1">Group Size</p>
                <p className="font-semibold text-gray-900">
                  {quote.project?.groupSize || 20} guests
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Package Selection Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Your Package</h2>
          <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="standard" id="package-standard" className="mt-1" />
                <Label htmlFor="package-standard" className="flex-1 cursor-pointer">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Standard Package</p>
                      <p className="text-sm text-gray-600">Base cruise experience with captain and crew</p>
                    </div>
                    <p className="font-semibold text-gray-900">Included</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="essentials" id="package-essentials" className="mt-1" />
                <Label htmlFor="package-essentials" className="flex-1 cursor-pointer">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Essentials Package</p>
                      <p className="text-sm text-gray-600">Enhanced experience with premium amenities</p>
                    </div>
                    <p className="font-semibold text-gray-900">+$50/hr</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="ultimate" id="package-ultimate" className="mt-1" />
                <Label htmlFor="package-ultimate" className="flex-1 cursor-pointer">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Ultimate Package</p>
                      <p className="text-sm text-gray-600">All-inclusive luxury experience</p>
                    </div>
                    <p className="font-semibold text-gray-900">+$75/hr</p>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 text-sm font-semibold text-gray-900">ITEM</th>
                <th className="text-center py-2 text-sm font-semibold text-gray-900 w-24">QTY</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-900 w-32">PRICE</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-900 w-32">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {/* Base Cruise Item */}
              <tr className="border-b border-gray-200">
                <td className="py-3">
                  <p className="font-medium text-gray-900">Private Charter - {quote.project?.duration || 4} Hour Cruise</p>
                  <p className="text-sm text-gray-600">
                    Exclusive use of vessel for your group
                  </p>
                </td>
                <td className="text-center py-3">1</td>
                <td className="text-right py-3">{formatCurrency(quote.subtotal || 180000)}</td>
                <td className="text-right py-3 font-medium">{formatCurrency(quote.subtotal || 180000)}</td>
              </tr>
              
              {/* Package Upgrade (if selected) */}
              {selectedPackage !== 'standard' && (
                <tr className="border-b border-gray-200">
                  <td className="py-3">
                    <p className="font-medium text-gray-900">
                      {selectedPackage === 'essentials' ? 'Essentials Package Upgrade' : 'Ultimate Package Upgrade'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedPackage === 'essentials' 
                        ? 'Premium amenities and enhanced service'
                        : 'All-inclusive luxury experience'}
                    </p>
                  </td>
                  <td className="text-center py-3">{quote.project?.duration || 4}</td>
                  <td className="text-right py-3">
                    {selectedPackage === 'essentials' ? '$50.00/hr' : '$75.00/hr'}
                  </td>
                  <td className="text-right py-3 font-medium">
                    {selectedPackage === 'essentials' 
                      ? formatCurrency(5000 * (quote.project?.duration || 4))
                      : formatCurrency(7500 * (quote.project?.duration || 4))}
                  </td>
                </tr>
              )}
              
              {/* Disco Cruise Tickets (for bachelor/bachelorette) */}
              {showDiscoOptions && (
                <tr className="border-b border-gray-200">
                  <td className="py-3">
                    <p className="font-medium text-gray-900">ATX Disco Cruise Tickets</p>
                    <div className="mt-2 bg-gray-50 p-3 rounded text-sm text-gray-600">
                      <p className="font-medium text-gray-700 mb-1">Join the party boat experience!</p>
                      <p>• Friday: 12:00 PM - 4:00 PM</p>
                      <p>• Saturday: 11:00 AM - 3:00 PM or 3:30 PM - 7:30 PM</p>
                      <p>• Includes DJ, dancing, and party atmosphere</p>
                      <p>• Cash bar available on board</p>
                    </div>
                  </td>
                  <td className="text-center py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDiscoTickets(Math.max(0, discoTickets - 1))}
                        className="h-8 w-8 p-0"
                        data-testid="button-disco-decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium" data-testid="text-disco-quantity">
                        {discoTickets}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDiscoTickets(Math.min(50, discoTickets + 1))}
                        className="h-8 w-8 p-0"
                        data-testid="button-disco-increase"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="text-right py-3">$85.00</td>
                  <td className="text-right py-3 font-medium">
                    {formatCurrency(discoTickets * 8500)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Optional Add-Ons */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Optional Add-Ons</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <Checkbox 
                id="addon-cooler"
                checked={selectedAddOns.includes('addon-cooler')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedAddOns([...selectedAddOns, 'addon-cooler']);
                  } else {
                    setSelectedAddOns(selectedAddOns.filter(id => id !== 'addon-cooler'));
                  }
                }}
              />
              <Label htmlFor="addon-cooler" className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Large Cooler with Ice</p>
                    <p className="text-sm text-gray-600">120qt cooler pre-filled with ice</p>
                  </div>
                  <p className="font-semibold text-gray-900">$50.00</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <Checkbox 
                id="addon-decorations"
                checked={selectedAddOns.includes('addon-decorations')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedAddOns([...selectedAddOns, 'addon-decorations']);
                  } else {
                    setSelectedAddOns(selectedAddOns.filter(id => id !== 'addon-decorations'));
                  }
                }}
              />
              <Label htmlFor="addon-decorations" className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Party Decorations</p>
                    <p className="text-sm text-gray-600">Themed decorations for your event</p>
                  </div>
                  <p className="font-semibold text-gray-900">$75.00</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <Checkbox 
                id="addon-photographer"
                checked={selectedAddOns.includes('addon-photographer')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedAddOns([...selectedAddOns, 'addon-photographer']);
                  } else {
                    setSelectedAddOns(selectedAddOns.filter(id => id !== 'addon-photographer'));
                  }
                }}
              />
              <Label htmlFor="addon-photographer" className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Professional Photographer</p>
                    <p className="text-sm text-gray-600">2 hours of professional photography</p>
                  </div>
                  <p className="font-semibold text-gray-900">$300.00</p>
                </div>
              </Label>
            </div>
          </div>
        </div>
        
        {/* Pricing Summary */}
        <div className="mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-900">{formatCurrency(pricing.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sales Tax (8.25%):</span>
                <span className="font-medium text-gray-900">{formatCurrency(pricing.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Crew Gratuity (20%):</span>
                <span className="font-medium text-gray-900">{formatCurrency(pricing.gratuity)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">{formatCurrency(pricing.total)}</span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-gray-600">25% Deposit to Reserve:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(Math.round(pricing.total * 0.25))}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Terms */}
        <div className="mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Terms</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 25% deposit required to confirm booking</li>
              <li>• Remaining balance due 7 days before event</li>
              <li>• Cancellations made 14+ days before event receive full refund</li>
              <li>• Cancellations made 7-13 days before event receive 50% refund</li>
              <li>• No refunds for cancellations made less than 7 days before event</li>
            </ul>
          </div>
        </div>
        
        {/* Acceptance Section */}
        <div className="mb-8 border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quote Acceptance</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="accept-terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="accept-terms" className="text-sm text-gray-600 cursor-pointer">
                I have read and agree to the terms and conditions outlined in this quote. 
                I understand the payment terms and cancellation policy.
              </Label>
            </div>
            
            {acceptTerms && (
              <div>
                <Label htmlFor="signature" className="text-sm font-medium text-gray-700">
                  Electronic Signature
                </Label>
                <Input
                  id="signature"
                  type="text"
                  placeholder="Type your full name"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="mt-1 max-w-sm"
                  data-testid="input-signature"
                />
                <p className="text-xs text-gray-500 mt-1">
                  By typing your name, you agree to use this as your electronic signature.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 print:hidden">
          <Button
            variant="outline"
            onClick={() => saveSelections.mutate()}
            disabled={saveSelections.isPending}
            data-testid="button-save-bottom"
          >
            Save Selections
          </Button>
          <Button
            disabled={!acceptTerms || !signature || !!isExpired}
            className="bg-green-600 hover:bg-green-700"
            onClick={() => {
              // Navigate to payment
              window.location.href = `/checkout?quote=${quoteId}`;
            }}
            data-testid="button-proceed-payment"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Proceed to Payment
          </Button>
        </div>
        
        {/* Footer */}
        <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
          <p>Thank you for choosing Premier Party Cruises!</p>
          <p>Questions? Call us at (512) 565-6209 or email info@premierpartycruises.com</p>
        </div>
      </div>
    </div>
  );
}