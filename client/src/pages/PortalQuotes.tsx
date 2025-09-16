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
  ArrowLeft, ExternalLink, FileText, DollarSign, 
  Calendar, Clock, Search, Filter, Download
} from "lucide-react";
import logoPath from "@assets/PPC Logo LARGE_1757881944449.png";

interface Quote {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  tax: number;
  gratuity: number;
  depositRequired: boolean;
  depositAmount: number;
  items: any[];
  radioSections: any[];
  expiresAt: string | null;
  createdAt: string;
  version: number;
  accessToken: string;
}

export default function PortalQuotes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Get customer quotes
  const { data: quotes = [], isLoading, error } = useQuery<Quote[]>({
    queryKey: ["/api/portal/customer/quotes"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/portal/customer/quotes");
      if (!response.ok) {
        throw new Error("Failed to load quotes");
      }
      const data = await response.json();
      return data.quotes;
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'sent':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.items.some(item => 
                           item.name?.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesStatus = statusFilter === "all" || quote.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewQuote = (quote: Quote) => {
    // Open quote in new tab using existing quote viewer
    window.open(`/quote/${quote.id}?token=${quote.accessToken}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your quotes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Failed to load quotes. Please try again or contact support.
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
                  Your Quotes
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View and manage your cruise quotes
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
                    placeholder="Search quotes by ID or service..."
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
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="accepted">Accepted</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quotes List */}
        {filteredQuotes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {quotes.length === 0 ? "No quotes yet" : "No quotes found"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {quotes.length === 0 
                  ? "Your cruise quotes will appear here once created." 
                  : "Try adjusting your search or filter criteria."
                }
              </p>
              {quotes.length === 0 && (
                <Button
                  onClick={() => window.open("/book", "_blank")}
                  data-testid="button-request-quote"
                >
                  Request a Quote
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <Card key={quote.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Quote #{quote.id.substring(0, 8)}
                        </h3>
                        <Badge className={getStatusColor(quote.status)}>
                          {quote.status}
                        </Badge>
                        {quote.expiresAt && isExpired(quote.expiresAt) && (
                          <Badge variant="destructive">Expired</Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">Total:</span>
                          <span className="font-semibold">{formatCurrency(quote.total)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">Created:</span>
                          <span>{formatDate(quote.createdAt)}</span>
                        </div>
                        
                        {quote.expiresAt && !isExpired(quote.expiresAt) && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">Expires:</span>
                            <span>{formatDate(quote.expiresAt)}</span>
                          </div>
                        )}
                      </div>

                      {/* Quote Items Preview */}
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {quote.items.slice(0, 3).map((item, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                              {item.name} {item.quantity > 1 && `(${item.quantity})`}
                            </span>
                          ))}
                          {quote.items.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{quote.items.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleViewQuote(quote)}
                        data-testid={`button-view-quote-${quote.id}`}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Quote
                      </Button>
                      
                      {quote.status === 'sent' && !isExpired(quote.expiresAt) && (
                        <Button
                          onClick={() => handleViewQuote(quote)}
                          data-testid={`button-respond-quote-${quote.id}`}
                        >
                          Respond to Quote
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
        {quotes.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Quote Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{quotes.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Quotes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {quotes.filter(q => q.status === 'accepted').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {quotes.filter(q => q.status === 'sent' && !isExpired(q.expiresAt)).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">
                    {formatCurrency(quotes.reduce((sum, q) => sum + q.total, 0))}
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