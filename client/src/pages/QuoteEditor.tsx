import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Save, Send, Eye, FileText, Calendar, DollarSign, Plus, Minus, 
  Copy, Clock, CheckCircle, AlertCircle, ArrowLeft, Download,
  Edit3, RotateCcw, History, Settings, Users, Ship, Receipt
} from 'lucide-react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, isAfter } from 'date-fns';
import Layout from '@/components/Layout';

interface QuoteItem {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  qty: number;
  type: 'service' | 'product' | 'fee' | 'discount';
}

interface Quote {
  id: string;
  projectId: string;
  version: number;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'expired' | 'declined';
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  gratuity?: number;
  total: number;
  discountTotal?: number;
  validUntil?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  lastSentAt?: string;
  acceptedAt?: string;
  paymentSchedule?: Array<{
    type: string;
    amount: number;
    dueDate: string;
    description: string;
  }>;
  templateId?: string;
}

interface Project {
  id: string;
  title: string;
  contactId: string;
  eventType: string;
  projectDate: string;
  groupSize: number;
  budget?: number;
  specialRequests?: string;
  contact?: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function QuoteEditor() {
  const { id: quoteId } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEditMode = !!quoteId;
  
  // Form state
  const [quote, setQuote] = useState<Partial<Quote>>({
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    validUntil: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
    status: 'draft',
    version: 1
  });
  const [project, setProject] = useState<Project | null>(null);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [taxRate, setTaxRate] = useState(8.25);
  const [gratuityRate, setGratuityRate] = useState(20);
  const [enableGratuity, setEnableGratuity] = useState(false);
  const [newItem, setNewItem] = useState<Partial<QuoteItem>>({
    name: '',
    description: '',
    unitPrice: 0,
    qty: 1,
    type: 'service'
  });

  // Fetch quote data if editing
  const { data: quoteData, isLoading } = useQuery({
    queryKey: ['/api/quotes', quoteId],
    queryFn: async () => {
      if (!quoteId) return null;
      const response = await apiRequest('GET', `/api/quotes/${quoteId}`);
      return response.json();
    },
    enabled: !!quoteId,
  });

  // Fetch quote templates
  const { data: templates = [] } = useQuery({
    queryKey: ['/api/templates'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/templates?type=quote');
      return response.json();
    }
  });

  // Fetch projects for new quotes
  const { data: projects = [] } = useQuery({
    queryKey: ['/api/projects'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/projects?status=active');
      return response.json();
    },
    enabled: !isEditMode
  });

  // Load quote data when available
  useEffect(() => {
    if (quoteData) {
      setQuote(quoteData);
      if (quoteData.project) {
        setProject(quoteData.project);
      }
    }
  }, [quoteData]);

  // Save quote mutation
  const saveQuote = useMutation({
    mutationFn: async (quoteData: Partial<Quote>) => {
      const url = isEditMode ? `/api/quotes/${quoteId}` : '/api/quotes';
      const method = isEditMode ? 'PUT' : 'POST';
      const response = await apiRequest(method, url, quoteData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Quote Saved',
        description: `Quote ${data.version ? `v${data.version}` : ''} has been saved successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
      if (!isEditMode) {
        setLocation(`/quotes/${data.id}`);
      }
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to save quote. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Send quote mutation
  const sendQuote = useMutation({
    mutationFn: async ({ quoteId, message }: { quoteId: string; message: string }) => {
      const response = await apiRequest('POST', `/api/quotes/${quoteId}/send`, {
        personalMessage: message
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Quote Sent',
        description: 'The quote has been sent to the customer.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
      setShowSendDialog(false);
      setCustomMessage('');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send quote. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Duplicate quote mutation
  const duplicateQuote = useMutation({
    mutationFn: async (quoteId: string) => {
      const response = await apiRequest('POST', `/api/quotes/${quoteId}/clone`);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Quote Duplicated',
        description: 'A new quote has been created from this template.',
      });
      setLocation(`/quotes/${data.id}`);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to duplicate quote. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Calculate totals
  const calculateTotals = () => {
    const items = quote.items || [];
    const subtotal = items.reduce((sum, item) => {
      if (item.type === 'discount') {
        return sum - (item.unitPrice * item.qty);
      }
      return sum + (item.unitPrice * item.qty);
    }, 0);
    
    const discountTotal = items
      .filter(item => item.type === 'discount')
      .reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    
    const tax = Math.round((subtotal - discountTotal) * (taxRate / 100));
    const gratuity = enableGratuity ? Math.round((subtotal - discountTotal) * (gratuityRate / 100)) : 0;
    const total = subtotal + tax + gratuity - discountTotal;
    
    setQuote(prev => ({
      ...prev,
      subtotal,
      tax,
      gratuity,
      total,
      discountTotal
    }));
  };

  // Recalculate totals when items change
  useEffect(() => {
    calculateTotals();
  }, [quote.items, taxRate, gratuityRate, enableGratuity]);

  // Add new item
  const addItem = () => {
    if (!newItem.name || !newItem.unitPrice) {
      toast({
        title: 'Incomplete Item',
        description: 'Please provide item name and price.',
        variant: 'destructive',
      });
      return;
    }
    
    const item: QuoteItem = {
      id: Date.now().toString(),
      name: newItem.name || '',
      description: newItem.description || '',
      unitPrice: newItem.unitPrice || 0,
      qty: newItem.qty || 1,
      type: newItem.type || 'service'
    };
    
    setQuote(prev => ({
      ...prev,
      items: [...(prev.items || []), item]
    }));
    
    setNewItem({
      name: '',
      description: '',
      unitPrice: 0,
      qty: 1,
      type: 'service'
    });
  };

  // Remove item
  const removeItem = (itemId: string) => {
    setQuote(prev => ({
      ...prev,
      items: (prev.items || []).filter(item => item.id !== itemId)
    }));
  };

  // Update item
  const updateItem = (itemId: string, updates: Partial<QuoteItem>) => {
    setQuote(prev => ({
      ...prev,
      items: (prev.items || []).map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  // Get status badge
  const getStatusBadge = (status: Quote['status']) => {
    const variants: Record<Quote['status'], { variant: any; icon: any; label: string }> = {
      draft: { variant: 'secondary', icon: Edit3, label: 'Draft' },
      sent: { variant: 'default', icon: Send, label: 'Sent' },
      viewed: { variant: 'outline', icon: Eye, label: 'Viewed' },
      accepted: { variant: 'default', icon: CheckCircle, label: 'Accepted' },
      expired: { variant: 'destructive', icon: Clock, label: 'Expired' },
      declined: { variant: 'destructive', icon: AlertCircle, label: 'Declined' }
    };
    
    const { variant, icon: Icon, label } = variants[status] || variants.draft;
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  // Check if quote is expired
  const isExpired = quote.validUntil ? isAfter(new Date(), new Date(quote.validUntil)) : false;

  // Handle save and send
  const handleSaveAndSend = async () => {
    if (!quote.projectId && !project?.id) {
      toast({
        title: 'Missing Project',
        description: 'Please select a project for this quote.',
        variant: 'destructive',
      });
      return;
    }

    // Save first if needed
    if (quote.status === 'draft' || !quote.id) {
      await saveQuote.mutateAsync({
        ...quote,
        projectId: quote.projectId || project?.id
      });
    }

    setShowSendDialog(true);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading quote...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/quotes')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Quotes
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold">
                  {isEditMode ? `Quote ${quote.id?.slice(0, 8)}` : 'New Quote'}
                </h1>
                {quote.status && getStatusBadge(quote.status)}
                {quote.version && quote.version > 1 && (
                  <Badge variant="outline">v{quote.version}</Badge>
                )}
                {isExpired && (
                  <Badge variant="destructive">
                    <Clock className="h-3 w-3 mr-1" />
                    Expired
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                {project?.title || 'Select project to create quote'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isEditMode && (
              <>
                <Button
                  variant="outline"
                  onClick={() => duplicateQuote.mutate(quote.id!)}
                  disabled={duplicateQuote.isPending}
                  data-testid="button-duplicate-quote"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowVersionHistory(true)}
                  data-testid="button-version-history"
                >
                  <History className="mr-2 h-4 w-4" />
                  History
                </Button>
              </>
            )}
            <Button
              variant="outline"
              onClick={() => setLocation(`/quote/${quote.id}`)}
              disabled={!quote.id}
              data-testid="button-preview-quote"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button
              onClick={() => saveQuote.mutate(quote)}
              disabled={saveQuote.isPending}
              data-testid="button-save-quote"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button
              onClick={handleSaveAndSend}
              disabled={!quote.items?.length || saveQuote.isPending}
              className="bg-primary hover:bg-primary/90"
              data-testid="button-send-quote"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Quote
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Quote Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Selection for New Quotes */}
            {!isEditMode && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Project Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="project">Select Project</Label>
                    <Select 
                      value={project?.id || ''} 
                      onValueChange={(value) => {
                        const selected = projects.find((p: Project) => p.id === value);
                        setProject(selected || null);
                        setQuote(prev => ({ ...prev, projectId: value }));
                      }}
                    >
                      <SelectTrigger data-testid="select-project">
                        <SelectValue placeholder="Choose a project..." />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((proj: Project) => (
                          <SelectItem key={proj.id} value={proj.id}>
                            <div className="flex flex-col">
                              <span>{proj.title}</span>
                              <span className="text-sm text-muted-foreground">
                                {proj.contact?.name} • {format(new Date(proj.projectDate), 'MMM d, yyyy')}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {project && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">{project.title}</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>Customer: {project.contact?.name}</div>
                        <div>Email: {project.contact?.email}</div>
                        <div>Event Date: {format(new Date(project.projectDate), 'MMM d, yyyy')}</div>
                        <div>Group Size: {project.groupSize} people</div>
                        <div>Event Type: {project.eventType}</div>
                        <div>Budget: {project.budget ? formatCurrency(project.budget) : 'Not specified'}</div>
                      </div>
                      {project.specialRequests && (
                        <div className="mt-2">
                          <div className="text-sm text-muted-foreground">Special Requests:</div>
                          <div className="text-sm">{project.specialRequests}</div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quote Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Quote Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="validUntil">Valid Until</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {quote.validUntil ? format(new Date(quote.validUntil), 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={quote.validUntil ? new Date(quote.validUntil) : undefined}
                          onSelect={(date) => setQuote(prev => ({ 
                            ...prev, 
                            validUntil: date ? format(date, 'yyyy-MM-dd') : undefined 
                          }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="template">Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger data-testid="select-template">
                        <SelectValue placeholder="Choose template..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Template</SelectItem>
                        {templates.map((template: any) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes & Terms</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any special terms, conditions, or notes for this quote..."
                    value={quote.notes || ''}
                    onChange={(e) => setQuote(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    data-testid="textarea-quote-notes"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quote Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Quote Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Item Form */}
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-3">Add Item</h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div className="md:col-span-2">
                      <Input
                        placeholder="Item name"
                        value={newItem.name}
                        onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                        data-testid="input-new-item-name"
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Price ($)"
                        value={newItem.unitPrice}
                        onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) * 100 || 0 }))}
                        data-testid="input-new-item-price"
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Qty"
                        min="1"
                        value={newItem.qty}
                        onChange={(e) => setNewItem(prev => ({ ...prev, qty: parseInt(e.target.value) || 1 }))}
                        data-testid="input-new-item-qty"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select 
                        value={newItem.type || 'service'} 
                        onValueChange={(value: QuoteItem['type']) => setNewItem(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="fee">Fee</SelectItem>
                          <SelectItem value="discount">Discount</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        onClick={addItem} 
                        size="sm"
                        data-testid="button-add-item"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {newItem.name && (
                    <div className="mt-2">
                      <Textarea
                        placeholder="Item description (optional)"
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                        data-testid="textarea-new-item-description"
                      />
                    </div>
                  )}
                </div>

                {/* Quote Items Table */}
                {quote.items && quote.items.length > 0 ? (
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-center">Qty</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {quote.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <Input
                                  value={item.name}
                                  onChange={(e) => updateItem(item.id, { name: e.target.value })}
                                  className="font-medium border-none p-0 h-auto bg-transparent"
                                />
                                {item.description && (
                                  <Textarea
                                    value={item.description}
                                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                                    className="text-sm text-muted-foreground mt-1 border-none p-0 bg-transparent resize-none"
                                    rows={1}
                                  />
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={item.type === 'discount' ? 'destructive' : 'secondary'}>
                                {item.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                value={(item.unitPrice / 100).toFixed(2)}
                                onChange={(e) => updateItem(item.id, { unitPrice: Math.round(parseFloat(e.target.value) * 100) || 0 })}
                                className="text-right w-24 h-8"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Input
                                type="number"
                                min="1"
                                value={item.qty}
                                onChange={(e) => updateItem(item.id, { qty: parseInt(e.target.value) || 1 })}
                                className="text-center w-16 h-8"
                              />
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {item.type === 'discount' 
                                ? `-${formatCurrency(item.unitPrice * item.qty)}`
                                : formatCurrency(item.unitPrice * item.qty)
                              }
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="mx-auto h-12 w-12 mb-3 opacity-50" />
                    <p>No items added to this quote yet.</p>
                    <p className="text-sm">Use the form above to add services, products, or fees.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quote Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quote Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(quote.subtotal || 0)}</span>
                  </div>
                  
                  {quote.discountTotal && quote.discountTotal > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount:</span>
                      <span>-{formatCurrency(quote.discountTotal)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span>Tax ({taxRate}%):</span>
                    <span>{formatCurrency(quote.tax || 0)}</span>
                  </div>
                  
                  {enableGratuity && (
                    <div className="flex justify-between text-sm">
                      <span>Gratuity ({gratuityRate}%):</span>
                      <span>{formatCurrency(quote.gratuity || 0)}</span>
                    </div>
                  )}
                  
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>{formatCurrency(quote.total || 0)}</span>
                  </div>
                </div>

                {/* Tax and Gratuity Settings */}
                <div className="pt-4 border-t space-y-3">
                  <div>
                    <Label htmlFor="taxRate" className="text-sm">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      min="0"
                      max="15"
                      step="0.01"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      className="h-8 mt-1"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableGratuity" className="text-sm">Include Gratuity</Label>
                    <Switch
                      id="enableGratuity"
                      checked={enableGratuity}
                      onCheckedChange={setEnableGratuity}
                    />
                  </div>
                  
                  {enableGratuity && (
                    <div>
                      <Label htmlFor="gratuityRate" className="text-sm">Gratuity Rate (%)</Label>
                      <Input
                        id="gratuityRate"
                        type="number"
                        min="0"
                        max="30"
                        value={gratuityRate}
                        onChange={(e) => setGratuityRate(parseFloat(e.target.value) || 20)}
                        className="h-8 mt-1"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Project Information */}
            {project && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Ship className="h-5 w-5" />
                    Project Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Customer:</span>
                    <div className="font-medium">{project.contact?.name}</div>
                    <div className="text-muted-foreground">{project.contact?.email}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Event Date:</span>
                    <div className="font-medium">
                      {format(new Date(project.projectDate), 'EEEE, MMMM d, yyyy')}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Group Size:</span>
                    <div className="font-medium">{project.groupSize} people</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Event Type:</span>
                    <div className="font-medium capitalize">{project.eventType}</div>
                  </div>
                  {project.budget && (
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <div className="font-medium">{formatCurrency(project.budget)}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    // TODO: Implement PDF generation
                    toast({
                      title: 'Coming Soon',
                      description: 'PDF generation will be available soon.',
                    });
                  }}
                  data-testid="button-download-pdf"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                
                {quote.id && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setLocation(`/quotes/${quote.id}/convert-to-invoice`)}
                    disabled={quote.status !== 'accepted'}
                    data-testid="button-convert-to-invoice"
                  >
                    <Receipt className="mr-2 h-4 w-4" />
                    Convert to Invoice
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    // TODO: Implement template save
                    toast({
                      title: 'Coming Soon',
                      description: 'Template saving will be available soon.',
                    });
                  }}
                  data-testid="button-save-as-template"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Save as Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Send Quote Dialog */}
        <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Quote</DialogTitle>
              <DialogDescription>
                Send this quote to {project?.contact?.name} at {project?.contact?.email}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="customMessage">Personal Message (Optional)</Label>
                <Textarea
                  id="customMessage"
                  placeholder="Add a personal message to include with the quote..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={4}
                  data-testid="textarea-custom-message"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSendDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => quote.id && sendQuote.mutate({ quoteId: quote.id, message: customMessage })}
                disabled={!quote.id || sendQuote.isPending}
                data-testid="button-confirm-send-quote"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Quote
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}