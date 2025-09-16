import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Receipt, Eye, Send, RefreshCw, CreditCard, Plus,
  MoreVertical, Clock, CheckCircle, AlertCircle, Search,
  DollarSign, Calendar, Mail, Download, Edit, Trash2
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { formatCurrency, formatDate, formatDateTime, formatRelativeTime } from '@shared/formatters';
import { INVOICE_STATUSES, BADGE_VARIANTS, ACTION_LABELS } from '@shared/constants';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  eventDate?: string;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  status: 'open' | 'sent' | 'paid' | 'overdue' | 'partially_paid' | 'cancelled';
  createdAt: string;
  dueDate: string;
  projectId: string;
  quoteId?: string;
  paymentHistory: Array<{
    id: string;
    amount: number;
    status: string;
    paidAt: string;
    method: string;
  }>;
}

export default function InvoiceManagement() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('manual');

  // Fetch all invoices
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['/api/invoices', searchTerm, statusFilter, sortBy, sortOrder],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);
      
      const response = await apiRequest('GET', `/api/invoices?${params.toString()}`);
      return response.json();
    }
  });

  // Send invoice mutation
  const sendInvoice = useMutation({
    mutationFn: async (invoiceId: string) => {
      const response = await apiRequest('POST', `/api/invoices/${invoiceId}/send`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Invoice Sent',
        description: 'The invoice has been sent to the customer.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/invoices'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send invoice. Please try again.',
        variant: 'destructive',
      });
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
      queryClient.invalidateQueries({ queryKey: ['/api/invoices'] });
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
    mutationFn: async ({ invoiceId, amount, method }: { invoiceId: string; amount: number; method: string }) => {
      const response = await apiRequest('PATCH', `/api/invoices/${invoiceId}/mark-paid`, {
        paidAmount: amount,
        paymentMethod: method
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Payment Recorded',
        description: 'The payment has been recorded successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/invoices'] });
      setShowPaymentDialog(false);
      setSelectedInvoice(null);
      setPaymentAmount('');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to record payment. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Delete invoice mutation
  const deleteInvoice = useMutation({
    mutationFn: async (invoiceId: string) => {
      const response = await apiRequest('DELETE', `/api/invoices/${invoiceId}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Invoice Deleted',
        description: 'The invoice has been permanently deleted.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/invoices'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete invoice. Please try again.',
        variant: 'destructive',
      });
    }
  });

  const getStatusBadge = (status: Invoice['status']) => {
    const variants: Record<string, { variant: any; icon: any; label: string; color: string }> = {
      open: { variant: 'secondary', icon: Clock, label: 'Open', color: 'text-gray-600' },
      sent: { variant: 'default', icon: Send, label: 'Sent', color: 'text-blue-600' },
      paid: { variant: 'default', icon: CheckCircle, label: 'Paid', color: 'text-green-600' },
      partially_paid: { variant: 'outline', icon: DollarSign, label: 'Partial', color: 'text-yellow-600' },
      overdue: { variant: 'destructive', icon: AlertCircle, label: 'Overdue', color: 'text-red-600' },
      cancelled: { variant: 'secondary', icon: AlertCircle, label: 'Cancelled', color: 'text-gray-500' },
    };
    
    const normalizedStatus = status ? status.toLowerCase() : 'open';
    const statusConfig = variants[normalizedStatus] || variants.open;
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

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== 'paid' && status !== 'cancelled';
  };

  const handleRecordPayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentAmount((invoice.balance / 100).toString());
    setShowPaymentDialog(true);
  };

  const submitPayment = () => {
    if (!selectedInvoice || !paymentAmount) return;
    
    const amountCents = Math.round(parseFloat(paymentAmount) * 100);
    markAsPaid.mutate({ 
      invoiceId: selectedInvoice.id, 
      amount: amountCents, 
      method: paymentMethod 
    });
  };

  // Filter invoices
  const filteredInvoices = invoices.filter((invoice: Invoice) => {
    const matchesSearch = searchTerm === '' || 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = statusFilter === 'all';
    if (statusFilter === 'overdue') {
      matchesStatus = isOverdue(invoice.dueDate, invoice.status);
    } else if (statusFilter !== 'all') {
      matchesStatus = invoice.status === statusFilter;
    }
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
            <p className="text-muted-foreground">
              Manage payments and track invoice status
            </p>
          </div>
          <Button 
            onClick={() => setLocation('/invoices/new')}
            className="bg-primary hover:bg-primary/90"
            data-testid="button-create-invoice"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-invoices">
                {filteredInvoices.length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600" data-testid="text-outstanding-count">
                {filteredInvoices.filter(inv => inv.balance > 0 && inv.status !== 'cancelled').length}
              </div>
              <div className="text-sm text-muted-foreground" data-testid="text-outstanding-amount">
                {formatCurrency(filteredInvoices
                  .filter(inv => inv.balance > 0 && inv.status !== 'cancelled')
                  .reduce((sum, inv) => sum + inv.balance, 0))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600" data-testid="text-overdue-count">
                {filteredInvoices.filter(inv => isOverdue(inv.dueDate, inv.status)).length}
              </div>
              <div className="text-sm text-muted-foreground" data-testid="text-overdue-amount">
                {formatCurrency(filteredInvoices
                  .filter(inv => isOverdue(inv.dueDate, inv.status))
                  .reduce((sum, inv) => sum + inv.balance, 0))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600" data-testid="text-paid-amount">
                {formatCurrency(filteredInvoices
                  .filter(inv => inv.status === 'paid')
                  .reduce((sum, inv) => sum + inv.totalAmount, 0))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Invoice Management</CardTitle>
                <CardDescription>
                  {filteredInvoices.length} of {invoices.length} invoices
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-invoices"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40" data-testid="select-status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="partially_paid">Partially Paid</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40" data-testid="select-sort-by">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Date Created</SelectItem>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="invoiceNumber">Invoice Number</SelectItem>
                  <SelectItem value="customerName">Customer Name</SelectItem>
                  <SelectItem value="totalAmount">Total Amount</SelectItem>
                  <SelectItem value="balance">Balance Due</SelectItem>
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
            ) : filteredInvoices.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">
                  {invoices.length === 0 ? 'No invoices yet' : 'No invoices match your filters'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {invoices.length === 0 
                    ? 'Invoices will appear here when quotes are accepted'
                    : 'Try adjusting your search or filter criteria'
                  }
                </p>
                {invoices.length === 0 && (
                  <Button
                    onClick={() => setLocation('/quotes')}
                    variant="outline"
                  >
                    <Receipt className="mr-2 h-4 w-4" />
                    View Quotes
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Event Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice: Invoice) => (
                      <TableRow 
                        key={invoice.id} 
                        className={`hover:bg-muted/50 cursor-pointer ${isOverdue(invoice.dueDate, invoice.status) ? 'bg-red-50/50' : ''}`}
                        onClick={() => setLocation(`/invoice/${invoice.id}`)}
                        data-testid={`invoice-row-${invoice.id}`}
                      >
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{invoice.customerName}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-48">
                              {invoice.customerEmail}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {invoice.eventDate ? (
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(invoice.eventDate), 'MMM d, yyyy')}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">Not set</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {formatCurrency(invoice.totalAmount)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-green-600 font-medium">
                            {formatCurrency(invoice.paidAmount)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`font-semibold ${invoice.balance > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                            {formatCurrency(invoice.balance)}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          <div className={`text-sm ${isOverdue(invoice.dueDate, invoice.status) ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
                            {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                          </div>
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
                                  setLocation(`/invoice/${invoice.id}`);
                                }}
                                data-testid={`button-view-invoice-${invoice.id}`}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLocation(`/invoices/${invoice.id}`);
                                }}
                                data-testid={`button-edit-invoice-${invoice.id}`}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Invoice
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  sendInvoice.mutate(invoice.id);
                                }}
                                data-testid={`button-send-invoice-${invoice.id}`}
                              >
                                <Mail className="mr-2 h-4 w-4" />
                                Send Invoice
                              </DropdownMenuItem>
                              {invoice.status !== 'paid' && invoice.balance > 0 && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    sendReminder.mutate(invoice.id);
                                  }}
                                  data-testid={`button-send-reminder-${invoice.id}`}
                                >
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Send Reminder
                                </DropdownMenuItem>
                              )}
                              {invoice.balance > 0 && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRecordPayment(invoice);
                                  }}
                                  data-testid={`button-record-payment-${invoice.id}`}
                                >
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Record Payment
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // TODO: Implement PDF download
                                }}
                                data-testid={`button-download-pdf-${invoice.id}`}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteInvoice.mutate(invoice.id);
                                }}
                                className="text-destructive focus:text-destructive"
                                data-testid={`button-delete-invoice-${invoice.id}`}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Invoice
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

        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
              <DialogDescription>
                Record a payment for invoice {selectedInvoice?.invoiceNumber}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Amount</label>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="flex-1"
                    data-testid="input-payment-amount"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Balance due: {selectedInvoice && formatCurrency(selectedInvoice.balance)}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Method</label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger data-testid="select-payment-method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual/Cash</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="wire">Wire Transfer</SelectItem>
                    <SelectItem value="ach">ACH/Bank Transfer</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowPaymentDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={submitPayment}
                disabled={!paymentAmount || parseFloat(paymentAmount) <= 0}
                data-testid="button-record-payment-submit"
              >
                Record Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}