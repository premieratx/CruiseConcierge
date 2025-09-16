import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, Download, DollarSign, Calendar, 
  CreditCard, Search, AlertCircle, CheckCircle
} from "lucide-react";
import logoPath from "@assets/PPC Logo LARGE_1757881944449.png";

interface Invoice {
  id: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  balance: number;
  schedule: any[];
  createdAt: string;
}

export default function PortalInvoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Get customer invoices
  const { data: invoices = [], isLoading, error } = useQuery<Invoice[]>({
    queryKey: ["/api/portal/customer/invoices"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/portal/customer/invoices");
      if (!response.ok) {
        throw new Error("Failed to load invoices");
      }
      const data = await response.json();
      return data.invoices;
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <CreditCard className="h-4 w-4 text-blue-600" />;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewInvoice = (invoice: Invoice) => {
    // Open invoice in new tab using existing invoice viewer
    window.open(`/invoice/${invoice.id}`, '_blank');
  };

  const handlePayInvoice = (invoice: Invoice) => {
    toast({
      title: "Payment Portal",
      description: "Redirecting to secure payment portal...",
    });
    // This would integrate with the payment system
    // For now, just show a message
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your invoices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load invoices. Please try again or contact support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setLocation("/portal/dashboard")}
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Invoices
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View invoices and payment history
                </p>
              </div>
            </div>
            <img 
              src={logoPath} 
              alt="Premier Party Cruises" 
              className="h-10 w-auto"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search invoices by ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  data-testid="select-status-filter"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="paid">Paid</option>
                  <option value="partial">Partial</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Outstanding Balance Alert */}
        {invoices.some(inv => inv.balance > 0) && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800 dark:text-yellow-200">
              You have outstanding invoices that require payment. 
              {` Total due: ${formatCurrency(invoices.reduce((sum, inv) => sum + inv.balance, 0))}`}
            </AlertDescription>
          </Alert>
        )}

        {/* Invoices List */}
        {filteredInvoices.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {invoices.length === 0 ? "No invoices yet" : "No invoices found"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {invoices.length === 0 
                  ? "Your invoices will appear here once generated." 
                  : "Try adjusting your search or filter criteria."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(invoice.status)}
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Invoice #{invoice.id.substring(0, 8)}
                          </h3>
                        </div>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">Total:</span>
                          <span className="font-semibold">{formatCurrency(invoice.total)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">Balance:</span>
                          <span className={`font-semibold ${invoice.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {formatCurrency(invoice.balance)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">Date:</span>
                          <span>{formatDate(invoice.createdAt)}</span>
                        </div>

                        {invoice.status === 'paid' && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-green-600 font-medium">Paid in Full</span>
                          </div>
                        )}
                      </div>

                      {/* Payment Schedule */}
                      {invoice.schedule && invoice.schedule.length > 0 && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Payment Schedule:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {invoice.schedule.slice(0, 2).map((payment, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Payment {index + 1}:
                                </span>
                                <span className="font-medium">
                                  {formatCurrency(payment.amount)} - {formatDate(payment.dueDate)}
                                </span>
                              </div>
                            ))}
                            {invoice.schedule.length > 2 && (
                              <div className="text-gray-500 text-xs">
                                +{invoice.schedule.length - 2} more payments
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleViewInvoice(invoice)}
                        data-testid={`button-view-invoice-${invoice.id}`}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        View Invoice
                      </Button>
                      
                      {invoice.balance > 0 && (
                        <Button
                          onClick={() => handlePayInvoice(invoice)}
                          className="bg-green-600 hover:bg-green-700"
                          data-testid={`button-pay-invoice-${invoice.id}`}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay {formatCurrency(invoice.balance)}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary */}
        {invoices.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Invoice Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{invoices.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Invoices</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {invoices.filter(inv => inv.status === 'paid').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Paid</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {invoices.filter(inv => inv.balance > 0).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Outstanding</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">
                    {formatCurrency(invoices.reduce((sum, inv) => sum + inv.total, 0))}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}