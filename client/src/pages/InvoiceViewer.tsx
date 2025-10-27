import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
const logoPath = '/attached_assets/PPC Logo LARGE_1757881944449.png';
import { 
  Ship, Calendar, Clock, MapPin, Phone, Mail, FileText,
  Download, Printer, CheckCircle, AlertCircle, Loader2,
  Users, CreditCard, DollarSign, Receipt, Send
} from 'lucide-react';
import type { Invoice, Project, Contact } from '@shared/schema';

type InvoiceWithDetails = Invoice & {
  project?: Project;
  contact?: Contact;
};

export default function InvoiceViewer() {
  const params = useParams();
  const invoiceId = params.invoiceId as string;
  const { toast } = useToast();
  
  // Fetch invoice details
  const { data: invoice, isLoading, error: invoiceError } = useQuery<InvoiceWithDetails>({
    queryKey: [`/api/invoices/${invoiceId}`],
    enabled: !!invoiceId,
    retry: (failureCount, error: any) => {
      if (error?.status === 404) return false;
      return failureCount < 2;
    },
  });
  
  // Payment processing mutation
  const processPayment = useMutation({
    mutationFn: async (amount: number) => {
      const res = await apiRequest('POST', '/api/create-payment-intent', {
        amount,
        invoiceId,
        metadata: {
          type: 'invoice_payment',
          invoiceId,
          amount
        }
      });
      if (!res.ok) throw new Error('Failed to create payment intent');
      return res.json();
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      window.location.href = data.url;
    },
    onError: (error: any) => {
      toast({ 
        title: 'Payment Error', 
        description: error.message || 'Failed to process payment',
        variant: 'destructive',
      });
    },
  });
  
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
  
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any; label: string; className?: string }> = {
      open: { variant: 'outline', icon: Clock, label: 'Open' },
      paid: { variant: 'default', icon: CheckCircle, label: 'Paid', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      partial: { variant: 'secondary', icon: DollarSign, label: 'Partial Payment' },
      overdue: { variant: 'destructive', icon: AlertCircle, label: 'Overdue' },
      cancelled: { variant: 'secondary', icon: Receipt, label: 'Cancelled' },
    };
    
    const { variant, icon: Icon, label, className } = variants[status] || variants.open;
    return (
      <Badge variant={variant} className={`flex items-center gap-1 ${className || ''}`}>
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading invoice...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (invoiceError || !invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invoice Not Found</h2>
          <p className="text-gray-600">This invoice may not exist or the link is invalid.</p>
        </div>
      </div>
    );
  }
  
  const isPaid = invoice.status === 'PAID' || invoice.balance <= 0;
  const amountDue = invoice.balance || 0;
  const amountPaid = invoice.total - amountDue;
  
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
            onClick={() => {
              const link = document.createElement('a');
              link.href = window.location.href;
              link.download = `Invoice-${invoice.id.slice(-8).toUpperCase()}.pdf`;
              link.click();
            }}
            data-testid="button-download"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
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
            
            {/* Invoice Info & Customer Info (To) */}
            <div className="text-right">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
                <div className="text-sm space-y-1">
                  <p className="text-gray-600">Invoice #: {invoice.id.slice(-8).toUpperCase()}</p>
                  <p className="text-gray-600">Date Issued: {format(new Date(invoice.createdAt), 'MMM dd, yyyy')}</p>
                  <div className="mt-3">
                    {getStatusBadge(invoice.status)}
                  </div>
                </div>
              </div>
              
              {/* Customer Info */}
              {invoice.contact && (
                <div className="text-left bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-1">Bill To:</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{invoice.contact.name}</p>
                    <p className="text-gray-600">{invoice.contact.email}</p>
                    {invoice.contact.phone && (
                      <p className="text-gray-600">{invoice.contact.phone}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Project Details */}
        {invoice.project && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-blue-600" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Event Date</p>
                    <p className="text-gray-600">
                      {formatDate(invoice.project.projectDate)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Time</p>
                    <p className="text-gray-600">
                      {invoice.project.preferredTime || 'TBD'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Group Size</p>
                    <p className="text-gray-600">
                      {invoice.project.groupSize || 'TBD'} guests
                    </p>
                  </div>
                </div>
              </div>
              
              {invoice.project.eventType && (
                <div className="mt-4 pt-4 border-t">
                  <p className="font-medium text-gray-900 mb-1">Event Type</p>
                  <Badge variant="outline" className="capitalize">
                    {invoice.project.eventType}
                  </Badge>
                </div>
              )}
              
              {invoice.project.specialRequests && (
                <div className="mt-4 pt-4 border-t">
                  <p className="font-medium text-gray-900 mb-1">Special Requests</p>
                  <p className="text-gray-600">{invoice.project.specialRequests}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {/* Quote Details Section - Show the real booking choices */}
        {(invoice as any).quote && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Show selected quote items */}
              {(invoice as any).quote.items && (invoice as any).quote.items.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Selected Options:</h4>
                  {(invoice as any).quote.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.description && (
                          <p className="text-sm text-gray-600">{item.description}</p>
                        )}
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(item.unitPrice * item.quantity)}</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">{formatCurrency(item.unitPrice)} each</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Show selected radio options */}
              {(invoice as any).quote.radioSections && (invoice as any).quote.radioSections.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-gray-900">Selected Preferences:</h4>
                  {(invoice as any).quote.radioSections
                    .filter((section: any) => section.selectedValue && section.id !== 'terms_acceptance')
                    .map((section: any, index: number) => {
                      const selectedOption = section.options?.find((opt: any) => opt.value === section.selectedValue);
                      return (
                        <div key={index} className="flex justify-between items-center py-2">
                          <span className="text-gray-700">{section.label}:</span>
                          <span className="font-medium text-gray-900">
                            {selectedOption?.label || section.selectedValue}
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Payment Summary with Enhanced 25% Deposit Structure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-green-600" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Cruise Cost Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cruise Cost:</span>
                  <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
                </div>
                
                {invoice.tax > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax (8.25%):</span>
                    <span className="font-medium">{formatCurrency(invoice.tax)}</span>
                  </div>
                )}

                {(invoice as any).gratuity > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gratuity (20%):</span>
                    <span className="font-medium">{formatCurrency((invoice as any).gratuity)}</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-xl font-bold bg-blue-50 p-4 rounded-lg">
                <span className="text-blue-900">Total Cruise Price:</span>
                <span className="text-blue-900">{formatCurrency(invoice.total)}</span>
              </div>
              
              {/* Enhanced Deposit Structure - PERSISTENT VALUES FROM DATABASE */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 text-lg">💳 Payment Structure (25% Deposit)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 font-medium">Deposit Required (25%):</span>
                    <span className="font-bold text-green-900 text-lg">
                      {formatCurrency((invoice as any).depositAmount || Math.floor(invoice.total * 0.25))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 font-medium">Remaining Balance (75%):</span>
                    <span className="font-bold text-green-900 text-lg">
                      {formatCurrency((invoice as any).remainingBalance || Math.floor(invoice.total * 0.75))}
                    </span>
                  </div>
                </div>
                
                {/* Due Date Information - PERSISTENT VALUE FROM DATABASE */}
                {((invoice as any).remainingBalanceDueAt || invoice.project?.projectDate) && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-amber-800">Remaining Balance Due Date:</span>
                    </div>
                    <p className="text-amber-900 font-semibold">
                      {(() => {
                        // Use PERSISTENT due date from database if available
                        if ((invoice as any).remainingBalanceDueAt) {
                          return format(new Date((invoice as any).remainingBalanceDueAt), 'EEEE, MMMM d, yyyy');
                        }
                        // Fallback to client-side calculation only if persistent value not available
                        else if (invoice.project?.projectDate) {
                          const eventDate = new Date(invoice.project.projectDate);
                          const dueDate = new Date(eventDate);
                          dueDate.setDate(dueDate.getDate() - 30);
                          const today = new Date();
                          const finalDueDate = dueDate < today ? today : dueDate;
                          return format(finalDueDate, 'EEEE, MMMM d, yyyy');
                        }
                        return 'TBD';
                      })()} 
                      <span className="text-sm text-amber-700">(30 days before cruise)</span>
                    </p>
                    {(invoice as any).remainingBalanceDueAt && (
                      <div className="mt-2 text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                        ✓ Server-calculated due date stored persistently
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Current Payment Status */}
              {amountPaid > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Payment Status</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-medium">✓ Amount Paid:</span>
                    <span className="font-bold text-green-700 text-lg">{formatCurrency(amountPaid)}</span>
                  </div>
                </div>
              )}
              
              {amountDue > 0 && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex justify-between items-center">
                    <span className="text-red-700 font-semibold text-lg">Outstanding Balance:</span>
                    <span className="text-red-700 font-bold text-xl">{formatCurrency(amountDue)}</span>
                  </div>
                  <p className="text-red-600 text-sm mt-1">
                    {amountPaid === 0 ? 'Deposit payment required to secure booking' : 'Final payment due before cruise date'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Schedule Section */}
        {(invoice as any).schedule && (invoice as any).schedule.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                Payment Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(invoice as any).schedule.map((payment: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{payment.description}</p>
                      <p className="text-sm text-gray-600">
                        Due: {format(new Date(payment.dueDate), 'MMMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{formatCurrency(payment.amount)}</p>
                      <Badge 
                        variant={payment.status === 'paid' ? 'default' : 'secondary'}
                        className={payment.status === 'paid' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {payment.status === 'paid' ? '✓ Paid' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Enhanced Payment Actions with Deposit Focus */}
        {!isPaid && amountDue > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                {amountPaid === 0 ? 'Secure Your Booking - Pay Deposit' : 'Complete Final Payment'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {amountPaid === 0 ? (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Ready to Secure Your Booking?
                    </h4>
                    <p className="text-green-700 mb-3">
                      Pay your 25% deposit now to lock in your cruise date and time. 
                      The remaining 75% will be due 30 days before your cruise.
                    </p>
                    <div className="text-sm text-green-600 space-y-1">
                      <p>✓ Immediate booking confirmation</p>
                      <p>✓ Date and time secured</p>
                      <p>✓ Email confirmation sent</p>
                      <p>✓ Automatic payment reminders for final balance</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">Final Payment Due</h4>
                    <p className="text-amber-700">
                      Complete your final payment to ensure your cruise is fully paid before the event date.
                    </p>
                  </div>
                )}
                
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => processPayment.mutate(amountDue)}
                    disabled={processPayment.isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-lg h-12"
                    data-testid="button-pay-amount"
                  >
                    {processPayment.isPending ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <CreditCard className="h-5 w-5 mr-2" />
                    )}
                    {amountPaid === 0 ? 
                      `Pay 25% Deposit (${formatCurrency(amountDue)})` :
                      `Pay Final Balance (${formatCurrency(amountDue)})`
                    }
                  </Button>
                  
                  {/* Optional: Full payment for first-time customers */}
                  {amountPaid === 0 && (
                    <Button
                      variant="outline"
                      onClick={() => processPayment.mutate(invoice.total)}
                      disabled={processPayment.isPending}
                      className="border-green-300 text-green-700 hover:bg-green-50"
                      data-testid="button-pay-full"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Pay Full Amount ({formatCurrency(invoice.total)}) - Save Time!
                    </Button>
                  )}
                </div>
                
                {/* Payment Security and Auto-Pay Information */}
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      🔒 <strong>Secure Payment:</strong> All transactions are processed securely through Stripe. 
                      Your payment information is encrypted and never stored on our servers.
                    </p>
                  </div>
                  
                  {amountPaid === 0 && (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h5 className="font-medium text-purple-800 mb-2">📧 Automatic Payment Reminders</h5>
                      <p className="text-sm text-purple-700 mb-2">
                        We'll automatically send you friendly email reminders for your final balance:
                      </p>
                      <div className="text-xs text-purple-600 space-y-1 ml-2">
                        <p>• 45 days before cruise: First reminder</p>
                        <p>• 35 days before cruise: Second reminder</p>
                        <p>• 30 days before cruise: Final notice (due date)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Paid Status */}
        {isPaid && (
          <Card className="mb-8 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Payment Complete! 🎉
                  </h3>
                  <p className="text-green-700">
                    Thank you for your payment. Your booking has been confirmed and you'll receive 
                    a confirmation email shortly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-8 border-t">
          <p>Questions about this invoice? Contact us at clientservices@premierpartycruises.com or (512) 488-5892</p>
          <p className="mt-2">Premier Party Cruises | Lake Travis, Texas</p>
        </div>
      </div>
    </div>
  );
}