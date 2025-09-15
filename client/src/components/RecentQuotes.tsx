import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  FileText, Eye, Send, RefreshCw, FileCheck, 
  MoreVertical, Clock, CheckCircle, AlertCircle 
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

interface Quote {
  id: string;
  quoteNumber: string;
  customerName: string;
  customerEmail: string;
  eventDate: string;
  totalAmount: number;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'expired';
  createdAt: string;
  sentAt?: string;
  viewedAt?: string;
  expiresAt?: string;
}

export function RecentQuotes() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Fetch recent quotes
  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ['/api/quotes/recent'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/quotes/recent?limit=5');
      return response.json();
    }
  });

  // Resend quote mutation
  const resendQuote = useMutation({
    mutationFn: async (quoteId: string) => {
      const response = await apiRequest('POST', `/api/quotes/${quoteId}/resend`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Quote Resent',
        description: 'The quote has been resent to the customer.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quotes/recent'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to resend quote. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Convert to invoice mutation
  const convertToInvoice = useMutation({
    mutationFn: async (quoteId: string) => {
      const response = await apiRequest('POST', `/api/quotes/${quoteId}/convert-to-invoice`);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Invoice Created',
        description: `Invoice #${data.invoiceNumber} has been created.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quotes/recent'] });
      queryClient.invalidateQueries({ queryKey: ['/api/invoices/recent'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create invoice. Please try again.',
        variant: 'destructive',
      });
    }
  });

  const getStatusBadge = (status: Quote['status']) => {
    const variants: Record<string, { variant: any; icon: any; label: string }> = {
      draft: { variant: 'secondary', icon: Clock, label: 'Draft' },
      sent: { variant: 'default', icon: Send, label: 'Sent' },
      viewed: { variant: 'outline', icon: Eye, label: 'Viewed' },
      accepted: { variant: 'default', icon: CheckCircle, label: 'Accepted' },
      expired: { variant: 'destructive', icon: AlertCircle, label: 'Expired' },
    };
    
    // Normalize status to lowercase and provide fallback
    const normalizedStatus = status ? status.toLowerCase() : 'draft';
    const statusConfig = variants[normalizedStatus] || variants.draft;
    const { variant, icon: Icon, label } = statusConfig;
    return (
      <Badge variant={variant} className="flex items-center gap-1">
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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Quotes
          </CardTitle>
          <CardDescription>Loading recent quotes...</CardDescription>
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
              <FileText className="h-5 w-5" />
              Recent Quotes
            </CardTitle>
            <CardDescription>
              {quotes.length > 0 ? `${quotes.length} recent quotes` : 'No quotes yet'}
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => setLocation('/quotes/new')}
            data-testid="button-new-quote"
          >
            Create Quote
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {quotes.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">No quotes created yet</p>
            <Button
              onClick={() => setLocation('/quotes/new')}
              className="bg-primary hover:bg-primary/90"
            >
              Create Your First Quote
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {quotes.map((quote: Quote) => (
              <div
                key={quote.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                data-testid={`quote-card-${quote.id}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-sm">{quote.quoteNumber}</span>
                    {getStatusBadge(quote.status)}
                  </div>
                  <p className="text-sm font-medium truncate">{quote.customerName}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(quote.createdAt), 'MMM d, yyyy')}
                    </span>
                    {quote.eventDate && (
                      <span className="text-xs text-muted-foreground">
                        Event: {format(new Date(quote.eventDate), 'MMM d')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      {formatCurrency(quote.totalAmount)}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setLocation(`/quote/${quote.id}`)}
                        data-testid={`button-view-quote-${quote.id}`}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Quote
                      </DropdownMenuItem>
                      {quote.status === 'sent' && (
                        <DropdownMenuItem
                          onClick={() => resendQuote.mutate(quote.id)}
                          data-testid={`button-resend-quote-${quote.id}`}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Resend Quote
                        </DropdownMenuItem>
                      )}
                      {quote.status === 'accepted' && (
                        <DropdownMenuItem
                          onClick={() => convertToInvoice.mutate(quote.id)}
                          data-testid={`button-convert-invoice-${quote.id}`}
                        >
                          <FileCheck className="mr-2 h-4 w-4" />
                          Convert to Invoice
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
        {quotes.length > 0 && (
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setLocation('/quotes')}
              data-testid="button-view-all-quotes"
            >
              View All Quotes →
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}