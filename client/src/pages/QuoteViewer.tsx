import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Ship, Calendar, Clock, MapPin, Phone, Mail, FileText,
  Download, Printer, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
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
  
  const [signature, setSignature] = useState('');
  const [printName, setPrintName] = useState('');
  const [signatureDate, setSignatureDate] = useState(new Date().toISOString().split('T')[0]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Fetch quote details
  const { data: quote, isLoading, refetch } = useQuery<QuoteWithDetails>({
    queryKey: [`/api/quotes/${quoteId}/public`],
    enabled: !!quoteId,
  });

  // Sign quote mutation
  const signQuote = useMutation({
    mutationFn: async () => {
      if (!signature || !printName || !agreedToTerms) {
        throw new Error('Please complete all required fields');
      }
      
      return apiRequest('POST', `/api/quotes/${quoteId}/sign`, {
        signature,
        printName,
        signatureDate,
        agreedToTerms,
      });
    },
    onSuccess: (data) => {
      toast({ 
        title: 'Quote Accepted!', 
        description: 'Thank you for accepting the quote. You will receive a confirmation email shortly.',
      });
      refetch();
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to sign quote. Please try again.',
        variant: 'destructive' 
      });
    },
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate a PDF
    toast({
      title: 'Feature Coming Soon',
      description: 'PDF download will be available shortly.',
    });
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" data-testid="loader-spinner" />
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold">Quote Not Found</h2>
            </div>
            <p className="text-gray-600">
              This quote may have expired or the link is invalid.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isAccepted = quote.status === 'ACCEPTED';
  const groupSize = quote.project?.groupSize || 25;
  const quoteNumber = `QUOTE-${quote.id.slice(0, 8).toUpperCase()}`;
  const validUntil = new Date(quote.expiresAt || Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* Action Bar - Hidden in print */}
      <div className="bg-white border-b sticky top-0 z-10 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge 
                variant={isAccepted ? 'default' : 'secondary'}
                className={cn(
                  "font-semibold",
                  isAccepted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                )}
                data-testid={`status-${quote.status.toLowerCase()}`}
              >
                {isAccepted ? 'ACCEPTED' : 'PENDING'}
              </Badge>
              <span className="text-sm text-gray-500">
                Valid until {formatDate(validUntil)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                data-testid="button-print"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
                data-testid="button-download"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Document */}
      <div className="max-w-5xl mx-auto p-8 print:p-0">
        <div className="bg-white shadow-sm print:shadow-none">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 print:p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Ship className="h-12 w-12" />
                <div>
                  <h1 className="text-3xl font-bold">Premier Party Cruises</h1>
                  <p className="text-blue-100 mt-1">Luxury Lake Cruising Experience</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold">QUOTE</h2>
                <p className="text-blue-100 mt-1">{quoteNumber}</p>
              </div>
            </div>
          </div>

          {/* Quote Details Bar */}
          <div className="bg-gray-50 px-8 py-4 border-b">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Issue Date:</span>
                <span className="ml-2 font-medium" data-testid="text-issue-date">
                  {formatDate(quote.createdAt)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Valid Until:</span>
                <span className="ml-2 font-medium" data-testid="text-valid-until">
                  {formatDate(validUntil)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Event Date:</span>
                <span className="ml-2 font-medium" data-testid="text-event-date">
                  {quote.project?.projectDate ? formatDate(quote.project.projectDate) : 'TBD'}
                </span>
              </div>
            </div>
          </div>

          {/* From/To Section */}
          <div className="p-8">
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* From Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">From</h3>
                <div className="space-y-2">
                  <p className="font-semibold text-lg">Premier Party Cruises</p>
                  <div className="text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>123 Marina Way, Austin, TX 78701</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>(512) 555-0123</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>info@premierpartycruises.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* To Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">To</h3>
                <div className="space-y-2">
                  <p className="font-semibold text-lg" data-testid="text-customer-name">
                    {quote.contact?.name || 'Guest'}
                  </p>
                  <div className="text-gray-600 space-y-1">
                    {quote.contact?.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span data-testid="text-customer-email">{quote.contact.email}</span>
                      </div>
                    )}
                    {quote.contact?.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span data-testid="text-customer-phone">{quote.contact.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span data-testid="text-group-size">Party of {groupSize} guests</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Services Table */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Services & Pricing</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Qty</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Rate</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Base Cruise Service */}
                    <tr className="border-b" data-testid="row-cruise">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">
                            {quote.pricing?.breakdown?.cruiseDuration || 4} Hour Cruise Charter
                          </p>
                          <p className="text-sm text-gray-500">
                            {quote.pricing?.breakdown?.boatType || 'Luxury Party Barge'} - 
                            {quote.pricing?.breakdown?.dayName || 'Weekend'}
                          </p>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">1</td>
                      <td className="text-right py-3 px-4">
                        {formatCurrency((quote.pricing?.breakdown?.baseCruiseCost || 0) * 100)}
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        {formatCurrency((quote.pricing?.breakdown?.baseCruiseCost || 0) * 100)}
                      </td>
                    </tr>
                    
                    {/* Additional Crew Fee */}
                    {quote.pricing?.breakdown?.crewFee && quote.pricing.breakdown.crewFee > 0 && (
                      <tr className="border-b bg-gray-50" data-testid="row-crew">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">Additional Crew Member</p>
                            <p className="text-sm text-gray-500">Required by Texas law for groups over 35</p>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">1</td>
                        <td className="text-right py-3 px-4">
                          {formatCurrency(quote.pricing.breakdown.crewFee * 100)}
                        </td>
                        <td className="text-right py-3 px-4 font-medium">
                          {formatCurrency(quote.pricing.breakdown.crewFee * 100)}
                        </td>
                      </tr>
                    )}

                    {/* Radio Section Selections */}
                    {quote.radioSections?.map((section, sectionIndex) => {
                      const selectedOption = section.options.find(opt => opt.selected);
                      if (!selectedOption) return null;
                      
                      return (
                        <tr
                          key={`radio-${section.id}-${sectionIndex}`}
                          className={cn("border-b", "bg-blue-50")}
                          data-testid={`row-radio-${sectionIndex}`}
                        >
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{selectedOption.name}</p>
                              <p className="text-sm text-gray-500">
                                <span className="inline-flex items-center gap-1">
                                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                  {section.title}
                                </span>
                                {selectedOption.description && ` - ${selectedOption.description}`}
                              </p>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4">1</td>
                          <td className="text-right py-3 px-4">
                            {formatCurrency(selectedOption.price)}
                          </td>
                          <td className="text-right py-3 px-4 font-medium">
                            {formatCurrency(selectedOption.price)}
                          </td>
                        </tr>
                      );
                    })}

                    {/* Line Items */}
                    {quote.items?.map((item, index) => (
                      <tr 
                        key={item.productId || index} 
                        className={cn("border-b", index % 2 === 1 && "bg-gray-50")}
                        data-testid={`row-item-${index}`}
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            {item.description && (
                              <p className="text-sm text-gray-500">{item.description}</p>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">{item.qty}</td>
                        <td className="text-right py-3 px-4">{formatCurrency(item.unitPrice)}</td>
                        <td className="text-right py-3 px-4 font-medium">
                          {formatCurrency(item.unitPrice * item.qty)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Radio Sections Summary (if any unselected) */}
            {quote.radioSections?.some(section => !section.options.some(opt => opt.selected)) && (
              <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-medium text-amber-800 mb-2">Pending Selections</h4>
                <p className="text-sm text-amber-700">
                  Some option groups still require a selection before finalizing this quote.
                </p>
                <div className="mt-3 space-y-2">
                  {quote.radioSections
                    .filter(section => !section.options.some(opt => opt.selected))
                    .map(section => (
                      <div key={section.id} className="text-sm text-amber-700">
                        • {section.title}: {section.options.map(opt => opt.name).join(', ')}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Pricing Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-full max-w-sm">
                <div className="space-y-2">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium" data-testid="text-subtotal">
                      {formatCurrency(quote.subtotal)}
                    </span>
                  </div>
                  
                  {quote.discountTotal > 0 && (
                    <div className="flex justify-between py-2 text-green-600">
                      <span>Discount</span>
                      <span data-testid="text-discount">-{formatCurrency(quote.discountTotal)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Gratuity (20%)</span>
                    <span className="font-medium" data-testid="text-gratuity">
                      {formatCurrency(quote.gratuity)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Sales Tax (8.25%)</span>
                    <span className="font-medium" data-testid="text-tax">
                      {formatCurrency(quote.tax)}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between py-3">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-blue-600" data-testid="text-total">
                      {formatCurrency(quote.total)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between py-1 text-sm text-gray-500">
                    <span>Per Person</span>
                    <span data-testid="text-per-person">
                      {formatCurrency(Math.floor(quote.total / groupSize))}
                    </span>
                  </div>
                </div>

                {/* Deposit Box */}
                {quote.depositRequired && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-blue-900">Deposit Due at Booking</p>
                        <p className="text-sm text-blue-700">
                          {quote.depositPercent}% of total
                        </p>
                      </div>
                      <span className="text-xl font-bold text-blue-900" data-testid="text-deposit">
                        {formatCurrency(quote.depositAmount)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Payment Terms */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Payment Terms</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Deposit Required</p>
                    <p className="text-sm text-gray-600">
                      {quote.depositPercent}% deposit ({formatCurrency(quote.depositAmount)}) due at booking to secure your date
                    </p>
                  </div>
                </div>
                
                {quote.depositPercent < 100 && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Balance Due</p>
                      <p className="text-sm text-gray-600">
                        Remaining balance of {formatCurrency(quote.total - quote.depositAmount)} due 30 days before event
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Payment Methods</p>
                    <p className="text-sm text-gray-600">
                      We accept all major credit cards, ACH transfers, and checks
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-2">
                <p>
                  • <strong>Cancellation Policy:</strong> Cancellations made more than 30 days before the event 
                  date will receive a full refund minus a $250 processing fee. Cancellations made 15-30 days 
                  before will receive a 50% refund. No refunds for cancellations made less than 15 days before 
                  the event.
                </p>
                <p>
                  • <strong>Weather Policy:</strong> In case of severe weather, we will work with you to 
                  reschedule your event at no additional charge. Light rain does not constitute cancellation.
                </p>
                <p>
                  • <strong>Safety Requirements:</strong> All guests must sign a liability waiver. Life jackets 
                  are provided and required for children under 12. No glass containers allowed on board.
                </p>
                <p>
                  • <strong>Alcohol Policy:</strong> Guests 21+ may bring beer and wine only. No hard liquor 
                  or glass bottles. Captain reserves the right to refuse service to intoxicated guests.
                </p>
                <p>
                  • <strong>Additional Fees:</strong> Overtime is charged at $500/hour. Excessive cleaning 
                  fee of $250 may apply if boat requires deep cleaning after your event.
                </p>
              </div>
            </div>

            {/* Signature Section - Only show if not accepted */}
            {!isAccepted && (
              <div className="border-t pt-8 print:break-inside-avoid">
                <h3 className="text-lg font-semibold mb-4">Accept & Sign</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="signature">Electronic Signature *</Label>
                      <Input
                        id="signature"
                        type="text"
                        placeholder="Type your full name"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        className="mt-2"
                        data-testid="input-signature"
                      />
                    </div>
                    <div>
                      <Label htmlFor="printName">Print Name *</Label>
                      <Input
                        id="printName"
                        type="text"
                        placeholder="Print your name"
                        value={printName}
                        onChange={(e) => setPrintName(e.target.value)}
                        className="mt-2"
                        data-testid="input-print-name"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="signatureDate">Date</Label>
                    <Input
                      id="signatureDate"
                      type="date"
                      value={signatureDate}
                      onChange={(e) => setSignatureDate(e.target.value)}
                      className="mt-2 max-w-xs"
                      data-testid="input-date"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1"
                        data-testid="checkbox-terms"
                      />
                      <span className="text-sm text-gray-700">
                        I have read and agree to the terms and conditions outlined in this quote. 
                        I understand that by signing this quote, I am committing to the deposit 
                        payment to secure my booking.
                      </span>
                    </label>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => signQuote.mutate()}
                    disabled={!signature || !printName || !agreedToTerms || signQuote.isPending}
                    data-testid="button-accept"
                  >
                    {signQuote.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept Quote & Pay Deposit
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Accepted Status */}
            {isAccepted && (
              <div className="border-t pt-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Quote Accepted</h3>
                  <p className="text-green-700">
                    This quote has been accepted and signed. A confirmation email has been sent.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t px-8 py-6 text-center text-sm text-gray-500">
            <p>Thank you for choosing Premier Party Cruises!</p>
            <p className="mt-1">
              Questions? Contact us at (512) 555-0123 or info@premierpartycruises.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}