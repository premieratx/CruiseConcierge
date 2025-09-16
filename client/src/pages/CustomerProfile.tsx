import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { type CustomerProfile as CustomerProfileType } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { 
  ArrowLeft, User, MessageSquare, FileText, BarChart3, 
  CreditCard, CheckCircle, Clock, Calendar, Mail, 
  Phone, DollarSign, TrendingUp, Activity, Download,
  Eye, Send, Star
} from 'lucide-react';
import { formatCurrency, formatDate, formatDateTime, formatRelativeTime, formatCustomerName, formatPhoneNumber, formatEmail } from '@shared/formatters';
import { LEAD_STATUSES, BADGE_VARIANTS, ACTION_LABELS } from '@shared/constants';

interface CustomerProfilePageProps {
  params: { id: string };
}

// Use shared formatting utilities from shared/formatters.ts

// Status badge component
function StatusBadge({ stage }: { stage: string }) {
  const stages = {
    'initial_contact': { label: 'Initial Contact', variant: 'secondary' as const },
    'quote_requested': { label: 'Quote Requested', variant: 'default' as const },
    'quote_sent': { label: 'Quote Sent', variant: 'default' as const },
    'quote_viewed': { label: 'Quote Viewed', variant: 'default' as const },
    'quote_accepted': { label: 'Quote Accepted', variant: 'secondary' as const },
    'deposit_paid': { label: 'Deposit Paid', variant: 'secondary' as const },
    'fully_paid': { label: 'Fully Paid', variant: 'default' as const },
    'confirmed': { label: 'Confirmed', variant: 'default' as const },
    'completed': { label: 'Completed', variant: 'default' as const },
  };
  
  const stageInfo = stages[stage as keyof typeof stages] || { label: stage, variant: 'outline' as const };
  
  return (
    <Badge variant={stageInfo.variant} data-testid={`badge-stage-${stage}`}>
      {stageInfo.label}
    </Badge>
  );
}

export default function CustomerProfile({ params }: CustomerProfilePageProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { id: contactId } = params;

  // Main customer profile query
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['/api/customers', contactId, 'profile'],
    enabled: !!contactId,
  });

  // Chat history query
  const { data: chatData } = useQuery({
    queryKey: ['/api/customers', contactId, 'chat-history'],
    enabled: !!contactId,
  });

  // Files query
  const { data: filesData } = useQuery({
    queryKey: ['/api/customers', contactId, 'files'],
    enabled: !!contactId,
  });

  // Quote analytics query
  const { data: quoteAnalyticsData } = useQuery({
    queryKey: ['/api/customers', contactId, 'quote-analytics'],
    enabled: !!contactId,
  });

  // Payment history query
  const { data: paymentsData } = useQuery({
    queryKey: ['/api/customers', contactId, 'payments'],
    enabled: !!contactId,
  });

  // Activity query
  const { data: activityData } = useQuery({
    queryKey: ['/api/customers', contactId, 'activity'],
    enabled: !!contactId,
  });

  // Lifecycle query
  const { data: lifecycleData } = useQuery({
    queryKey: ['/api/customers', contactId, 'lifecycle'],
    enabled: !!contactId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/leads')}
            data-testid="button-back-to-leads"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leads
          </Button>
        </div>
        <div className="grid gap-6">
          <div className="h-32 bg-muted animate-pulse rounded-lg" />
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  if (error || !profile?.success) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/leads')}
            data-testid="button-back-to-leads"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leads
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              Customer not found or error loading data.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const customer = profile.profile;
  const chatHistory = chatData?.success ? chatData.chatHistory : null;
  const fileHistory = filesData?.success ? filesData.fileHistory : null;
  const quoteHistory = quoteAnalyticsData?.success ? quoteAnalyticsData.quoteHistory : null;
  const paymentSummary = paymentsData?.success ? paymentsData.paymentSummary : null;
  const activities = activityData?.success ? activityData.activities : [];
  const lifecycle = lifecycleData?.success ? lifecycleData.lifecycle : null;

  // Calculate some summary stats
  const upcomingCruise = customer.bookings?.find(b => 
    new Date(b.startTime) > new Date() && b.status !== 'canceled'
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => setLocation('/leads')}
          data-testid="button-back-to-leads"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Leads
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="button-email-customer">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button variant="outline" size="sm" data-testid="button-call-customer">
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
        </div>
      </div>

      {/* Customer Overview Card */}
      <Card data-testid="card-customer-overview">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {customer.contact.name}
                <StatusBadge stage={lifecycle?.currentStage || 'initial_contact'} />
              </CardTitle>
              <CardDescription>
                Customer since {formatDate(customer.contact.createdAt)}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold" data-testid="text-total-value">
                {formatCurrency(customer.totalValue || 0)}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Value
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600" data-testid="text-quote-count">
                {customer.quotes?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Quotes</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600" data-testid="text-amount-paid">
                {formatCurrency(customer.totalPaid || 0)}
              </div>
              <div className="text-sm text-muted-foreground">Paid</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-orange-600" data-testid="text-balance-remaining">
                {formatCurrency(customer.balance || 0)}
              </div>
              <div className="text-sm text-muted-foreground">Balance</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-purple-600" data-testid="text-days-since-contact">
                {lifecycle?.daysInCurrentStage || 0}
              </div>
              <div className="text-sm text-muted-foreground">Days in Stage</div>
            </div>
          </div>

          {/* Contact Information */}
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Email</div>
              <div data-testid="text-customer-email">{customer.contact.email || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Phone</div>
              <div data-testid="text-customer-phone">{customer.contact.phone || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Next Cruise</div>
              <div data-testid="text-next-cruise">
                {upcomingCruise ? formatDate(upcomingCruise.startTime) : 'None scheduled'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" data-testid="tab-overview">
            <Activity className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="chat" data-testid="tab-chat">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat History
          </TabsTrigger>
          <TabsTrigger value="quotes" data-testid="tab-quotes">
            <BarChart3 className="mr-2 h-4 w-4" />
            Quote Analytics
          </TabsTrigger>
          <TabsTrigger value="files" data-testid="tab-files">
            <FileText className="mr-2 h-4 w-4" />
            Files & Docs
          </TabsTrigger>
          <TabsTrigger value="payments" data-testid="tab-payments">
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="timeline" data-testid="tab-timeline">
            <Clock className="mr-2 h-4 w-4" />
            Timeline
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card data-testid="card-recent-activity">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {activities && activities.length > 0 ? (
                      activities.slice(0, 10).map((activity, index) => (
                        <div key={activity.id || index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          <div className="flex-1">
                            <div className="text-sm font-medium" data-testid={`text-activity-description-${index}`}>
                              {activity.description}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDateTime(activity.createdAt)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        No recent activity found
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card data-testid="card-quick-stats">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold" data-testid="text-total-messages">
                      {chatHistory?.totalMessages || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Chat Messages</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold" data-testid="text-quote-views">
                      {quoteHistory?.totalViews || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Quote Views</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold" data-testid="text-files-sent">
                      {fileHistory?.totalFiles || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Files Sent</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold" data-testid="text-conversion-probability">
                      {lifecycle?.probabilityScore || 50}%
                    </div>
                    <div className="text-xs text-muted-foreground">Conv. Probability</div>
                  </div>
                </div>

                {/* Lifecycle Progress */}
                {lifecycle && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Lifecycle Progress</span>
                      <span>{lifecycle.probabilityScore}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${lifecycle.probabilityScore}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Chat History Tab */}
        <TabsContent value="chat" className="space-y-4">
          <Card data-testid="card-chat-history">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat Conversation History
              </CardTitle>
              <CardDescription>
                {chatHistory?.sessionCount || 0} sessions • {chatHistory?.totalMessages || 0} total messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {chatHistory && chatHistory.messages.length > 0 ? (
                    chatHistory.messages.map((message, index) => (
                      <div 
                        key={message.id || index} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        data-testid={`message-${index}`}
                      >
                        <div 
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          <div className="text-sm">{message.content}</div>
                          <div className="text-xs opacity-70 mt-1">
                            {formatDateTime(message.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No chat history found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quote Analytics Tab */}
        <TabsContent value="quotes" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-testid="card-quote-summary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Quote Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 border rounded-lg">
                    <div className="text-lg font-bold text-blue-600" data-testid="text-total-quotes">
                      {quoteHistory?.quotes.length || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Quotes</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-lg font-bold text-green-600" data-testid="text-accepted-quotes">
                      {quoteHistory?.acceptedQuotes || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Accepted</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-lg font-bold text-orange-600" data-testid="text-pending-quotes">
                      {quoteHistory?.pendingQuotes || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-quote-analytics">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  View Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Views</span>
                    <span className="font-medium" data-testid="text-analytics-total-views">
                      {quoteHistory?.totalViews || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Unique Views</span>
                    <span className="font-medium">
                      {quoteHistory?.analytics ? 
                        new Set(quoteHistory.analytics.map(a => a.contactId || a.sessionId)).size : 0
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Viewed</span>
                    <span className="font-medium">
                      {quoteHistory?.analytics && quoteHistory.analytics.length > 0 ? 
                        formatDate(quoteHistory.analytics[0].createdAt) : 'Never'
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quote List */}
          <Card data-testid="card-quote-list">
            <CardHeader>
              <CardTitle>Quote History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quoteHistory && quoteHistory.quotes.length > 0 ? (
                  quoteHistory.quotes.map((quote, index) => (
                    <div key={quote.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium" data-testid={`text-quote-title-${index}`}>
                          Quote #{quote.id.slice(-8)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Created {formatDate(quote.createdAt)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium" data-testid={`text-quote-total-${index}`}>
                          {formatCurrency(quote.total)}
                        </div>
                        <Badge variant={quote.status === 'ACCEPTED' ? 'default' : 'secondary'}>
                          {quote.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No quotes found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Files & Documents Tab */}
        <TabsContent value="files" className="space-y-4">
          <Card data-testid="card-files-summary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Files & Documents Summary
              </CardTitle>
              <CardDescription>
                Documents and files sent to this customer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold text-blue-600" data-testid="text-total-files-stat">
                    {fileHistory?.totalFiles || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Files</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold text-green-600" data-testid="text-delivered-files">
                    {fileHistory?.deliveredFiles || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Delivered</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold text-orange-600" data-testid="text-accessed-files">
                    {fileHistory?.accessedFiles || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Accessed</div>
                </div>
              </div>

              {/* File List */}
              <div className="space-y-3">
                {fileHistory && fileHistory.files.length > 0 ? (
                  fileHistory.files.map((file, index) => (
                    <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium" data-testid={`text-file-name-${index}`}>
                            {file.fileName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Sent {formatDate(file.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right text-sm">
                          <div className="flex items-center gap-1">
                            {file.delivered && <CheckCircle className="h-3 w-3 text-green-600" />}
                            {file.accessed && <Eye className="h-3 w-3 text-blue-600" />}
                          </div>
                          {file.downloadCount > 0 && (
                            <div className="text-xs text-muted-foreground">
                              {file.downloadCount} downloads
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" data-testid={`button-download-file-${index}`}>
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No files sent yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-testid="card-payment-summary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between p-3 border rounded-lg">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-bold" data-testid="text-payment-total-value">
                      {formatCurrency(paymentSummary?.totalValue || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 border rounded-lg">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-bold text-green-600" data-testid="text-payment-total-paid">
                      {formatCurrency(paymentSummary?.totalPaid || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 border rounded-lg">
                    <span className="text-muted-foreground">Balance Due</span>
                    <span className="font-bold text-orange-600" data-testid="text-payment-balance">
                      {formatCurrency(paymentSummary?.balance || 0)}
                    </span>
                  </div>
                </div>

                {/* Payment Progress */}
                {paymentSummary && paymentSummary.totalValue > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Payment Progress</span>
                      <span>
                        {Math.round((paymentSummary.totalPaid / paymentSummary.totalValue) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all" 
                        style={{ 
                          width: `${Math.min(100, (paymentSummary.totalPaid / paymentSummary.totalValue) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card data-testid="card-payment-methods">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Payment Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Payments</span>
                    <span className="font-medium" data-testid="text-total-payments-count">
                      {paymentSummary?.payments.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Payment</span>
                    <span className="font-medium">
                      {paymentSummary?.paymentHistory && paymentSummary.paymentHistory.length > 0 ? 
                        formatDate(paymentSummary.paymentHistory[0].date) : 'None'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={
                      paymentSummary?.balance === 0 ? 'default' : 
                      paymentSummary?.totalPaid > 0 ? 'secondary' : 'outline'
                    }>
                      {paymentSummary?.balance === 0 ? 'Paid in Full' : 
                       paymentSummary?.totalPaid > 0 ? 'Partial Payment' : 'Unpaid'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment History */}
          <Card data-testid="card-payment-history">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentSummary && paymentSummary.paymentHistory.length > 0 ? (
                  paymentSummary.paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium" data-testid={`text-payment-amount-${index}`}>
                          {formatCurrency(payment.amount)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {payment.method} • {formatDate(payment.date)}
                        </div>
                      </div>
                      <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'}>
                        {payment.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No payment history found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <Card data-testid="card-customer-timeline">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Customer Journey Timeline
              </CardTitle>
              <CardDescription>
                Complete timeline of customer interactions and milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {activities && activities.length > 0 ? (
                    activities.map((activity, index) => (
                      <div key={activity.id || index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          {index < activities.length - 1 && (
                            <div className="w-px h-8 bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium" data-testid={`timeline-activity-${index}`}>
                              {activity.description}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {formatDateTime(activity.createdAt)}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {activity.activityType} • {activity.source}
                          </div>
                          {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {JSON.stringify(activity.metadata, null, 2)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No timeline activity found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}