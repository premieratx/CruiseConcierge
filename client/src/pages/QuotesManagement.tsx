import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  FileText, Eye, Send, RefreshCw, FileCheck, Plus,
  MoreVertical, Clock, CheckCircle, AlertCircle, Search,
  Filter, Copy, Trash2, Edit, Calendar, DollarSign, Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';

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

export default function QuotesManagement() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch all quotes
  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ['/api/quotes', searchTerm, statusFilter, sortBy, sortOrder],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);
      
      const response = await apiRequest('GET', `/api/quotes?${params.toString()}`);
      return response.json();
    }
  });

  // Delete quote mutation
  const deleteQuote = useMutation({
    mutationFn: async (quoteId: string) => {
      const response = await apiRequest('DELETE', `/api/quotes/${quoteId}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Quote Deleted',
        description: 'The quote has been permanently deleted.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete quote. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Clone quote mutation
  const cloneQuote = useMutation({
    mutationFn: async (quoteId: string) => {
      const response = await apiRequest('POST', `/api/quotes/${quoteId}/clone`);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Quote Cloned',
        description: `New quote ${data.quoteNumber} has been created.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to clone quote. Please try again.',
        variant: 'destructive',
      });
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
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
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
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/invoices'] });
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
    const variants: Record<string, { variant: any; icon: any; label: string; color: string }> = {
      draft: { variant: 'secondary', icon: Clock, label: 'Draft', color: 'text-gray-600' },
      sent: { variant: 'default', icon: Send, label: 'Sent', color: 'text-blue-600' },
      viewed: { variant: 'outline', icon: Eye, label: 'Viewed', color: 'text-purple-600' },
      accepted: { variant: 'default', icon: CheckCircle, label: 'Accepted', color: 'text-green-600' },
      expired: { variant: 'destructive', icon: AlertCircle, label: 'Expired', color: 'text-red-600' },
    };
    
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

  // Filter quotes based on search and status
  const filteredQuotes = quotes.filter((quote: Quote) => {
    const matchesSearch = searchTerm === '' || 
      quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
            <p className="text-muted-foreground">
              Manage and track all your customer quotes
            </p>
          </div>
          <Button 
            onClick={() => setLocation('/quotes/new')}
            className="bg-primary hover:bg-primary/90"
            data-testid="button-create-quote"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Quote
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Quote Management</CardTitle>
                <CardDescription>
                  {filteredQuotes.length} of {quotes.length} quotes
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-quotes"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40" data-testid="select-status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="viewed">Viewed</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40" data-testid="select-sort-by">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Date Created</SelectItem>
                  <SelectItem value="quoteNumber">Quote Number</SelectItem>
                  <SelectItem value="customerName">Customer Name</SelectItem>
                  <SelectItem value="totalAmount">Total Amount</SelectItem>
                  <SelectItem value="eventDate">Event Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            ) : filteredQuotes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">
                  {quotes.length === 0 ? 'No quotes yet' : 'No quotes match your filters'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {quotes.length === 0 
                    ? 'Create your first quote to get started'
                    : 'Try adjusting your search or filter criteria'
                  }
                </p>
                {quotes.length === 0 && (
                  <Button
                    onClick={() => setLocation('/quotes/new')}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Quote
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quote #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Event Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuotes.map((quote: Quote) => (
                      <TableRow 
                        key={quote.id} 
                        className="hover:bg-muted/50 cursor-pointer"
                        onClick={() => setLocation(`/quote/${quote.id}`)}
                        data-testid={`quote-row-${quote.id}`}
                      >
                        <TableCell className="font-medium">{quote.quoteNumber}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{quote.customerName}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-48">
                              {quote.customerEmail}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {quote.eventDate ? (
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(quote.eventDate), 'MMM d, yyyy')}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">Not set</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-primary">
                            {formatCurrency(quote.totalAmount)}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(quote.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(quote.createdAt), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLocation(`/quote/${quote.id}`);
                                }}
                                data-testid={`button-view-quote-${quote.id}`}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Quote
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLocation(`/quotes/${quote.id}`);
                                }}
                                data-testid={`button-edit-quote-${quote.id}`}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Quote
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  cloneQuote.mutate(quote.id);
                                }}
                                data-testid={`button-clone-quote-${quote.id}`}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Clone Quote
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {quote.status === 'sent' && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    resendQuote.mutate(quote.id);
                                  }}
                                  data-testid={`button-resend-quote-${quote.id}`}
                                >
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Resend Quote
                                </DropdownMenuItem>
                              )}
                              {quote.status === 'accepted' && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    convertToInvoice.mutate(quote.id);
                                  }}
                                  data-testid={`button-convert-invoice-${quote.id}`}
                                >
                                  <FileCheck className="mr-2 h-4 w-4" />
                                  Convert to Invoice
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteQuote.mutate(quote.id);
                                }}
                                className="text-destructive focus:text-destructive"
                                data-testid={`button-delete-quote-${quote.id}`}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Quote
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}