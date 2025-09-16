import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  Mail, Phone, Clock, Users, Calendar, Send, 
  MessageSquare, CheckCircle, X, Search, Filter,
  AlertCircle, TrendingUp, User, Building, Ship,
  RefreshCw, Download, Eye, MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PartialLead {
  id: string;
  sessionId: string;
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventTypeLabel?: string;
  groupSize?: number;
  preferredDate?: string;
  chatbotData?: any;
  quoteId?: string;
  status: 'partial' | 'abandoned' | 'contacted' | 'converted';
  createdAt: string;
  lastUpdated: string;
  abandonedAt?: string;
  convertedToContactId?: string;
}

interface PartialLeadStats {
  total: number;
  today: number;
  thisWeek: number;
  abandoned: number;
  contacted: number;
  converted: number;
}

interface SendQuoteDialogProps {
  lead: PartialLead | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (leadId: string, method: 'email' | 'sms', customMessage?: string) => void;
}

function SendQuoteDialog({ lead, isOpen, onClose, onSend }: SendQuoteDialogProps) {
  const [method, setMethod] = useState<'email' | 'sms'>('email');
  const [customMessage, setCustomMessage] = useState('');

  if (!lead) return null;

  const handleSend = () => {
    onSend(lead.id, method, customMessage);
    onClose();
    setCustomMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Quote to {lead.name || 'Lead'}</DialogTitle>
          <DialogDescription>
            Choose how to send the quote to this potential customer.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Contact Information</label>
            <div className="text-sm text-muted-foreground space-y-1">
              {lead.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{lead.email}</span>
                </div>
              )}
              {lead.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{lead.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Send Method</label>
            <Select value={method} onValueChange={(value: 'email' | 'sms') => setMethod(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {lead.email && (
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </div>
                  </SelectItem>
                )}
                {lead.phone && (
                  <SelectItem value="sms">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Text Message</span>
                    </div>
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Custom Message (Optional)</label>
            <Textarea
              placeholder="Add a personal message to accompany the quote..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={(!lead.email && method === 'email') || (!lead.phone && method === 'sms')}>
            <Send className="h-4 w-4 mr-2" />
            Send Quote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function PartialLeads() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sendQuoteDialog, setSendQuoteDialog] = useState<{isOpen: boolean, lead: PartialLead | null}>({
    isOpen: false,
    lead: null
  });
  const { toast } = useToast();

  // Fetch partial leads
  const { data: partialLeads = [], isLoading, refetch } = useQuery<PartialLead[]>({
    queryKey: ['/api/admin/partial-leads'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch partial lead stats
  const { data: stats } = useQuery<PartialLeadStats>({
    queryKey: ['/api/admin/partial-leads/stats'],
    refetchInterval: 30000,
  });

  // Send quote mutation
  const sendQuoteMutation = useMutation({
    mutationFn: async ({ leadId, method, customMessage }: { leadId: string; method: 'email' | 'sms'; customMessage?: string }) => {
      return apiRequest('POST', `/api/admin/partial-leads/${leadId}/send-quote`, {
        method,
        customMessage
      });
    },
    onSuccess: () => {
      toast({
        title: 'Quote Sent',
        description: 'The quote has been sent successfully to the customer.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/partial-leads'] });
    },
    onError: () => {
      toast({
        title: 'Failed to Send Quote',
        description: 'There was an error sending the quote. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ leadId, status }: { leadId: string; status: string }) => {
      return apiRequest('PATCH', `/api/admin/partial-leads/${leadId}/status`, { status });
    },
    onSuccess: () => {
      toast({
        title: 'Status Updated',
        description: 'The lead status has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/partial-leads'] });
    },
    onError: () => {
      toast({
        title: 'Failed to Update Status',
        description: 'There was an error updating the lead status.',
        variant: 'destructive',
      });
    },
  });

  // Filter partial leads based on search and status
  const filteredLeads = partialLeads.filter(lead => {
    const matchesSearch = !searchTerm || 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.eventTypeLabel?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSendQuote = (leadId: string, method: 'email' | 'sms', customMessage?: string) => {
    sendQuoteMutation.mutate({ leadId, method, customMessage });
  };

  const handleUpdateStatus = (leadId: string, status: string) => {
    updateStatusMutation.mutate({ leadId, status });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      partial: { label: 'Partial', variant: 'secondary' as const, color: 'bg-blue-100 text-blue-800' },
      abandoned: { label: 'Abandoned', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' },
      contacted: { label: 'Contacted', variant: 'default' as const, color: 'bg-yellow-100 text-yellow-800' },
      converted: { label: 'Converted', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.partial;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const formatContactInfo = (lead: PartialLead) => {
    const parts = [];
    if (lead.name) parts.push(lead.name);
    if (lead.email) parts.push(lead.email);
    if (lead.phone) parts.push(lead.phone);
    return parts.join(' • ');
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-32">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Loading partial leads...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Partial Leads</h1>
          <p className="text-muted-foreground">
            Follow up with potential customers who started but didn't complete their booking.
          </p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Leads</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.today}</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-amber-600">{stats.thisWeek}</p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
                <Calendar className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-600">{stats.abandoned}</p>
                  <p className="text-xs text-muted-foreground">Abandoned</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{stats.contacted}</p>
                  <p className="text-xs text-muted-foreground">Contacted</p>
                </div>
                <Phone className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
                  <p className="text-xs text-muted-foreground">Converted</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
            <SelectItem value="abandoned">Abandoned</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No partial leads found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Partial leads will appear here when customers start but don\'t complete the booking process.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {lead.name || 'Anonymous Lead'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {formatContactInfo(lead) || 'No contact information'}
                          </p>
                        </div>
                        {getStatusBadge(lead.status)}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {(lead.email || lead.phone) && lead.status === 'abandoned' && (
                          <Button
                            size="sm"
                            onClick={() => setSendQuoteDialog({ isOpen: true, lead })}
                            data-testid={`button-send-quote-${lead.id}`}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send Quote
                          </Button>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {lead.status === 'abandoned' && (
                              <DropdownMenuItem onClick={() => handleUpdateStatus(lead.id, 'contacted')}>
                                <Phone className="h-4 w-4 mr-2" />
                                Mark as Contacted
                              </DropdownMenuItem>
                            )}
                            {(lead.status === 'contacted' || lead.status === 'abandoned') && (
                              <DropdownMenuItem onClick={() => handleUpdateStatus(lead.id, 'converted')}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark as Converted
                              </DropdownMenuItem>
                            )}
                            {lead.quoteId && (
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Quote
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Event Details */}
                    {(lead.eventTypeLabel || lead.groupSize || lead.preferredDate) && (
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {lead.eventTypeLabel && (
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            <span>{lead.eventTypeLabel}</span>
                          </div>
                        )}
                        {lead.groupSize && (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{lead.groupSize} guests</span>
                          </div>
                        )}
                        {lead.preferredDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(lead.preferredDate), 'MMM dd, yyyy')}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Timestamps */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          Started {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      {lead.abandonedAt && (
                        <div className="flex items-center gap-1">
                          <X className="h-3 w-3" />
                          <span>
                            Abandoned {formatDistanceToNow(new Date(lead.abandonedAt), { addSuffix: true })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Send Quote Dialog */}
      <SendQuoteDialog
        lead={sendQuoteDialog.lead}
        isOpen={sendQuoteDialog.isOpen}
        onClose={() => setSendQuoteDialog({ isOpen: false, lead: null })}
        onSend={handleSendQuote}
      />
    </div>
  );
}