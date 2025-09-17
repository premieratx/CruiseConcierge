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
  Users, Plus, Minus, Edit2, Save, CreditCard, ChevronRight, Sparkles
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
  
  // Extract token from URL query parameters with better error handling
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  // Debug token extraction
  console.log('🔍 QuoteViewer URL Analysis:', {
    quoteId,
    currentUrl: window.location.href,
    searchParams: window.location.search,
    extractedToken: token ? `${token.substring(0, 20)}...` : null,
    tokenLength: token?.length || 0
  });
  
  // State for interactive elements (now minimal as this is display-only)
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [signature, setSignature] = useState('');
  
  // Fetch quote details with token
  const { data: quote, isLoading, error: quoteError } = useQuery<QuoteWithDetails>({
    queryKey: [`/api/quotes/${quoteId}/public`, token],
    queryFn: async () => {
      if (!token) {
        console.warn('⚠️ No token found in URL parameters for quote access');
        throw new Error('Access token required. Please use the link from your email or SMS.');
      }
      
      const url = `/api/quotes/${encodeURIComponent(quoteId)}/public?token=${encodeURIComponent(token)}`;
      
      console.log('🌐 Making quote API request:', {
        quoteId,
        url: url.substring(0, 80) + '...',
        tokenPresent: !!token
      });
      
      const res = await apiRequest('GET', url);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Quote API error:', {
          status: res.status,
          statusText: res.statusText,
          error: errorData.error
        });
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
      console.log('🔄 Query retry decision:', { 
        failureCount, 
        errorMessage: error?.message,
        shouldRetry: failureCount < 2 && !error?.message?.includes('Access token required')
      });
      
      // Don't retry token-related errors
      if (error?.message?.includes('Invalid access token') || 
          error?.message?.includes('Access token required') ||
          error?.message?.includes('Token expired')) {
        return false;
      }
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
  
  // Save acceptance mutation - now creates invoice automatically
  const saveAcceptance = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('PATCH', `/api/quotes/${quoteId}/acceptance`, {
        signature: acceptTerms ? signature : null,
        acceptedAt: acceptTerms ? new Date().toISOString() : null,
      });
      if (!res.ok) throw new Error('Failed to save acceptance');
      return res.json();
    },
    onSuccess: (data) => {
      if (data.invoiceId) {
        // Quote accepted and invoice created automatically
        toast({ 
          title: '🎉 Quote Accepted Successfully!', 
          description: 'Your invoice has been generated and is ready for payment. You\'ll be redirected shortly.',
          duration: 5000,
        });
        
        // Invalidate queries to refresh the UI
        queryClient.invalidateQueries({ queryKey: [`/api/quotes/${quoteId}/public`] });
        
        // Redirect to invoice after a short delay
        setTimeout(() => {
          window.location.href = `/invoice/${data.invoiceId}`;
        }, 2000);
        
      } else {
        // Just terms accepted (no invoice created)
        toast({ 
          title: 'Terms Accepted', 
          description: 'Your acceptance has been recorded.',
        });
        queryClient.invalidateQueries({ queryKey: [`/api/quotes/${quoteId}/public`] });
      }
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to save acceptance',
        variant: 'destructive',
      });
    },
  });
  
  // Load acceptance state from quote data
  useEffect(() => {
    if (quote?.radioSections) {
      // Check if terms have been accepted
      const acceptanceSection = quote.radioSections.find(s => s.id === 'terms_acceptance');
      if (acceptanceSection?.selectedValue === 'accepted') {
        setAcceptTerms(true);
        setSignature(acceptanceSection.metadata?.signature || '');
      }
    }
  }, [quote]);
  
  // Use the quote's actual pricing (no dynamic calculation)
  const pricing = {
    subtotal: quote?.subtotal || 0,
    tax: quote?.tax || 0,
    gratuity: quote?.gratuity || 0,
    total: quote?.total || 0
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
  const showDiscoOptions = quote.project?.eventType === 'bachelor' || quote.project?.eventType === 'bachelorette' || false;
  
  // Check if quote has been accepted
  const isQuoteAccepted = quote.radioSections?.some(section => 
    section.id === 'terms_acceptance' && section.selectedValue === 'accepted'
  ) || false;
  
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
            onClick={() => saveAcceptance.mutate()}
            disabled={saveAcceptance.isPending || !acceptTerms}
            data-testid="button-save"
          >
            {saveAcceptance.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Acceptance
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
                <p className="text-gray-600">(512) 488-5892</p>
                <p className="text-gray-600">clientservices@premierpartycruises.com</p>
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
        
        {/* Cruise Selection Details */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Cruise Selection</h2>
          
          {/* Display Primary Cruise Selection */}
          {quote.items && quote.items.filter(item => item.type === 'private_cruise' || item.type === 'cruise').length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <Ship className="h-6 w-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-2">Private Charter Cruise</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600 font-medium">Date</p>
                      <p className="text-blue-800">{formatDate(quote.project?.projectDate)}</p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">Duration</p>
                      <p className="text-blue-800">{quote.project?.duration || 4} hours</p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">Group Size</p>
                      <p className="text-blue-800">{quote.project?.groupSize || 20} guests</p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">Boat</p>
                      <p className="text-blue-800">
                        {(() => {
                          // Try to get boat info from cruise items
                          const cruiseItem = quote.items?.find(item => item.type === 'private_cruise' || item.type === 'cruise');
                          if (cruiseItem?.description?.includes('Vessel:')) {
                            const vesselMatch = cruiseItem.description.match(/Vessel:\s*([^,\n]+)/);
                            return vesselMatch?.[1] || 'TBD';
                          }
                          
                          // Fallback based on group size
                          const groupSize = quote.project?.groupSize || 20;
                          if (groupSize <= 15) return 'Day Tripper (15 guests)';
                          if (groupSize <= 25) return 'Medium Vessel (25 guests)';
                          if (groupSize <= 50) return 'Large Vessel (50 guests)';
                          return 'Extra Large Vessel (75 guests)';
                        })()
                      }</p>
                    </div>
                  </div>
                  
                  {/* Show selected time if available from radioSections */}
                  {quote.radioSections?.find(s => s.selectedValue && s.title?.toLowerCase().includes('time'))?.selectedValue && (
                    <div className="mt-3 p-3 bg-white rounded border border-blue-200">
                      <p className="text-blue-600 font-medium text-sm">Selected Time Slot</p>
                      <p className="text-blue-800 font-semibold">
                        {quote.radioSections.find(s => s.selectedValue && s.title?.toLowerCase().includes('time'))?.selectedValue}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Display Disco Cruise Options if present */}
          {showDiscoOptions && quote.items?.some(item => item.name?.toLowerCase().includes('disco') || item.name?.toLowerCase().includes('atx')) && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Sparkles className="h-6 w-6 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 mb-2">ATX Disco Cruise Experience</h3>
                  <div className="text-sm text-purple-800">
                    <p className="mb-2">Join our party boat experience with DJ, dancing, and festive atmosphere!</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="font-medium text-purple-700">Available Times:</p>
                        <p>• Friday: 12:00 PM - 4:00 PM</p>
                        <p>• Saturday: 11:00 AM - 3:00 PM or 3:30 PM - 7:30 PM</p>
                      </div>
                      <div>
                        <p className="font-medium text-purple-700">Includes:</p>
                        <p>• Professional DJ & Sound System</p>
                        <p>• Dance Floor & Party Atmosphere</p>
                        <p>• Cash Bar Available</p>
                      </div>
                    </div>
                    
                    {/* Show selected disco tickets */}
                    {(() => {
                      const discoItem = quote.items?.find(item => item.name?.toLowerCase().includes('disco') || item.name?.toLowerCase().includes('atx'));
                      if (discoItem?.qty && discoItem.qty > 0) {
                        return (
                          <div className="mt-3 p-3 bg-white rounded border border-purple-200">
                            <p className="text-purple-600 font-medium text-sm">Selected Tickets</p>
                            <p className="text-purple-800 font-semibold">
                              {discoItem.qty} × {discoItem.name} @ {formatCurrency(discoItem.unitPrice)} each
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })()
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Display selected packages/add-ons from radioSections */}
          {quote.radioSections && quote.radioSections.filter(section => section.selectedValue && section.id !== 'terms_acceptance').length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-3">Selected Options</h3>
              <div className="space-y-2">
                {quote.radioSections
                  .filter(section => section.selectedValue && section.id !== 'terms_acceptance')
                  .map((section, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                      <div>
                        <p className="font-medium text-gray-900">{section.title}</p>
                        <p className="text-sm text-gray-600">{section.selectedValue}</p>
                      </div>
                      {section.options?.find(opt => opt.id === section.selectedOptionId)?.price && (
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(section.options.find(opt => opt.id === section.selectedOptionId)?.price || 0)}
                        </p>
                      )}
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>
        
        {/* Items Table - Display Actual Quote Items */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 text-sm font-semibold text-gray-900">ITEM</th>
                <th className="text-center py-2 text-sm font-semibold text-gray-900 w-24">QTY</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-900 w-32">RATE</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-900 w-32">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {/* Display all quote items */}
              {quote.items && quote.items.length > 0 ? (
                quote.items
                  .sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by order if specified
                  .map((item, index) => (
                    <tr key={item.id || index} className="border-b border-gray-200">
                      <td className="py-3">
                        <p className="font-medium text-gray-900" data-testid={`text-item-name-${index}`}>
                          {item.name}
                        </p>
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1" data-testid={`text-item-description-${index}`}>
                            {item.description}
                          </p>
                        )}
                        {/* Show category badge if it's an add-on or optional */}
                        {(item.isOptional || item.category === 'addon') && (
                          <Badge variant="secondary" className="mt-2">
                            Optional Add-On
                          </Badge>
                        )}
                      </td>
                      <td className="text-center py-3" data-testid={`text-item-qty-${index}`}>
                        {item.qty || 1}
                      </td>
                      <td className="text-right py-3" data-testid={`text-item-rate-${index}`}>
                        {formatCurrency(item.unitPrice)}
                        {/* Show per unit label if quantity > 1 */}
                        {(item.qty || 1) > 1 && (
                          <span className="text-xs text-gray-500 block">each</span>
                        )}
                      </td>
                      <td className="text-right py-3 font-medium" data-testid={`text-item-total-${index}`}>
                        {formatCurrency(item.unitPrice * (item.qty || 1))}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr className="border-b border-gray-200">
                  <td className="py-3">
                    <p className="font-medium text-gray-900">Private Charter - {quote.project?.duration || 4} Hour Cruise</p>
                    <p className="text-sm text-gray-600">
                      Exclusive use of vessel for your group of {quote.project?.groupSize || 20} guests
                    </p>
                  </td>
                  <td className="text-center py-3">1</td>
                  <td className="text-right py-3">{formatCurrency(quote.subtotal || 0)}</td>
                  <td className="text-right py-3 font-medium">{formatCurrency(quote.subtotal || 0)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pricing Summary Section */}
        <div className="mb-8">
          <div className="border-t-2 border-gray-300 pt-4">
            <div className="space-y-2 text-right max-w-md ml-auto">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-900">{formatCurrency(pricing.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sales Tax ({((pricing.tax / pricing.subtotal) * 100).toFixed(2)}%):</span>
                <span className="font-medium text-gray-900">{formatCurrency(pricing.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Crew Gratuity ({((pricing.gratuity / pricing.subtotal) * 100).toFixed(2)}%):</span>
                <span className="font-medium text-gray-900">{formatCurrency(pricing.gratuity)}</span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">{formatCurrency(pricing.total)}</span>
              </div>
              {quote.depositRequired && (
                <div className="flex justify-between text-sm pt-2 border-t">
                  <span className="text-gray-600">Deposit Required:</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(quote.depositAmount || Math.round(pricing.total * (quote.depositPercent || 25) / 100))}
                  </span>
                </div>
              )}
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
            onClick={() => saveAcceptance.mutate()}
            disabled={saveAcceptance.isPending || !acceptTerms || !signature}
            data-testid="button-save-acceptance"
          >
            {saveAcceptance.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-2" />
            )}
            {isQuoteAccepted ? 'Update Acceptance' : 'Accept Quote'}
          </Button>
          {acceptTerms && signature && !isExpired && (
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                // Navigate to payment
                window.location.href = `/checkout?quote=${quoteId}&token=${token}`;
              }}
              data-testid="button-proceed-payment"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Payment
            </Button>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
          <p>Thank you for choosing Premier Party Cruises!</p>
          <p>Questions? Call us at (512) 488-5892 or email clientservices@premierpartycruises.com</p>
        </div>
      </div>
    </div>
  );
}