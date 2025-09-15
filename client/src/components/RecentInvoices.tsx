import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  CreditCard, Eye, Send, RefreshCw, DollarSign,
  MoreVertical, Clock, CheckCircle, AlertCircle,
  FileText, Receipt
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useLocation } from 'wouter';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'partial' | 'overdue' | 'cancelled';
  createdAt: string;
  sentAt?: string;
  paidAt?: string;
}

export function RecentInvoices() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Fetch recent invoices
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['/api/invoices/recent'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/invoices/recent?limit=5');
      return response.json();
    }
  });

  // Send reminder mutation
  const sendReminder = useMutation({
    mutationFn: async (invoiceId: string) => {
      const response = await apiRequest('POST', `/api/invoices/${invoiceId}/send-reminder`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Reminder Sent',
        description: 'Payment reminder has been sent to the customer.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/invoices/recent'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send reminder. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Mark as paid mutation
  const markAsPaid = useMutation({
    mutationFn: async (invoiceId: string) => {
      const response = await apiRequest('PATCH', `/api/invoices/${invoiceId}/mark-paid`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Invoice Updated',
        description: 'Invoice has been marked as paid.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/invoices/recent'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update invoice. Please try again.',
        variant: 'destructive',
      });
    }
  });

  const getStatusBadge = (status: Invoice['status']) => {
    const variants: Record<Invoice['status'], { variant: any; icon: any; label: string; className?: string }> = {
      draft: { variant: 'secondary', icon: Clock, label: 'Draft' },
      sent: { variant: 'outline', icon: Send, label: 'Sent' },
      paid: { variant: 'default', icon: CheckCircle, label: 'Paid', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      partial: { variant: 'secondary', icon: DollarSign, label: 'Partial' },
      overdue: { variant: 'destructive', icon: AlertCircle, label: 'Overdue' },
      cancelled: { variant: 'secondary', icon: Receipt, label: 'Cancelled' },
    };
    
    const { variant, icon: Icon, label, className } = variants[status];
    return (
      <Badge variant={variant} className={`flex items-center gap-1 ${className || ''}`}>
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const calculateProgress = (invoice: Invoice) => {
    if (invoice.totalAmount === 0) return 0;
    return Math.round((invoice.paidAmount / invoice.totalAmount) * 100);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Recent Invoices
          </CardTitle>
          <CardDescription>Loading recent invoices...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Recent Invoices
            </CardTitle>
            <CardDescription>
              {invoices.length > 0 ? `${invoices.length} recent invoices` : 'No invoices yet'}
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => setLocation('/invoices/new')}
            data-testid="button-new-invoice"
          >
            Create Invoice
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">No invoices created yet</p>
            <Button
              onClick={() => setLocation('/invoices/new')}
              className="bg-primary hover:bg-primary/90"
            >
              Create Your First Invoice
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {invoices.map((invoice: Invoice) => (
              <div
                key={invoice.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                data-testid={`invoice-card-${invoice.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{invoice.invoiceNumber}</span>
                    {getStatusBadge(invoice.status)}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setLocation(`/invoice/${invoice.id}`)}
                        data-testid={`button-view-invoice-${invoice.id}`}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Invoice
                      </DropdownMenuItem>
                      {(invoice.status === 'sent' || invoice.status === 'overdue') && (
                        <DropdownMenuItem
                          onClick={() => sendReminder.mutate(invoice.id)}
                          data-testid={`button-send-reminder-${invoice.id}`}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Send Reminder
                        </DropdownMenuItem>
                      )}
                      {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                        <DropdownMenuItem
                          onClick={() => markAsPaid.mutate(invoice.id)}
                          data-testid={`button-mark-paid-${invoice.id}`}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Paid
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">{invoice.customerName}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">
                        Due: {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                      </span>
                      {invoice.status === 'paid' && invoice.paidAt && (
                        <span className="text-xs text-green-600 dark:text-green-400">
                          Paid: {format(new Date(invoice.paidAt), 'MMM d')}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        {formatCurrency(invoice.totalAmount)}
                      </p>
                      {invoice.status === 'partial' && (
                        <p className="text-xs text-muted-foreground">
                          Paid: {formatCurrency(invoice.paidAmount)}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {invoice.status === 'partial' && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Payment Progress</span>
                        <span className="font-medium">{calculateProgress(invoice)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${calculateProgress(invoice)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {invoices.length > 0 && (
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setLocation('/invoices')}
              data-testid="button-view-all-invoices"
            >
              View All Invoices →
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}