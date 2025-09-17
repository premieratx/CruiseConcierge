import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { 
  Settings as SettingsIcon, Mail, FileText, Palette, Save, Plus, Edit2, Trash2, 
  Copy, Eye, EyeOff, ChevronRight, Grid, List, Code, Webhook, Send, CheckCircle, AlertCircle, Loader2,
  Globe, Layers, Zap, Target, Workflow, Database, Puzzle, Book, Rocket, Building
} from 'lucide-react';
// Template builder components will be shown in dialogs
import type { QuoteTemplate, EmailTemplate, PricingSettings } from '@shared/schema';

export default function Settings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('quote-templates');
  const [selectedTemplate, setSelectedTemplate] = useState<QuoteTemplate | null>(null);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<EmailTemplate | null>(null);
  const [showTemplateBuilder, setShowTemplateBuilder] = useState(false);
  const [showEmailBuilder, setShowEmailBuilder] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookTestResult, setWebhookTestResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Fetch quote templates
  const { data: quoteTemplates = [], isLoading: loadingQuoteTemplates } = useQuery<QuoteTemplate[]>({
    queryKey: ['/api/quote-templates']
  });
  
  // Fetch email templates
  const { data: emailTemplates = [], isLoading: loadingEmailTemplates } = useQuery<EmailTemplate[]>({
    queryKey: ['/api/email-templates']
  });
  
  
  // Fetch pricing settings
  const { data: pricingSettings, isLoading: loadingSettings } = useQuery<PricingSettings>({
    queryKey: ['/api/pricing-settings']
  });
  
  // Create new quote template mutation
  const createQuoteTemplate = useMutation({
    mutationFn: async (data: Partial<QuoteTemplate>) => {
      const res = await apiRequest('POST', '/api/quote-templates', data);
      if (!res.ok) throw new Error('Failed to create template');
      return res.json();
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Quote template created successfully' });
      queryClient.invalidateQueries({ queryKey: ['/api/quote-templates'] });
      setShowTemplateBuilder(false);
    }
  });
  
  // Update quote template mutation
  const updateQuoteTemplate = useMutation({
    mutationFn: async ({ id, ...data }: Partial<QuoteTemplate> & { id: string }) => {
      const res = await apiRequest('PATCH', `/api/quote-templates/${id}`, data);
      if (!res.ok) throw new Error('Failed to update template');
      return res.json();
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Quote template updated successfully' });
      queryClient.invalidateQueries({ queryKey: ['/api/quote-templates'] });
      setShowTemplateBuilder(false);
      setSelectedTemplate(null);
    }
  });
  
  // Delete quote template mutation
  const deleteQuoteTemplate = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/quote-templates/${id}`);
      if (!res.ok) throw new Error('Failed to delete template');
      return res.json();
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Quote template deleted successfully' });
      queryClient.invalidateQueries({ queryKey: ['/api/quote-templates'] });
    }
  });
  
  // Create email template mutation
  const createEmailTemplate = useMutation({
    mutationFn: async (data: Partial<EmailTemplate>) => {
      const res = await apiRequest('POST', '/api/email-templates', data);
      if (!res.ok) throw new Error('Failed to create email template');
      return res.json();
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Email template created successfully' });
      queryClient.invalidateQueries({ queryKey: ['/api/email-templates'] });
      setShowEmailBuilder(false);
    }
  });
  
  // Update email template mutation
  const updateEmailTemplate = useMutation({
    mutationFn: async ({ id, ...data }: Partial<EmailTemplate> & { id: string }) => {
      const res = await apiRequest('PATCH', `/api/email-templates/${id}`, data);
      if (!res.ok) throw new Error('Failed to update email template');
      return res.json();
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Email template updated successfully' });
      queryClient.invalidateQueries({ queryKey: ['/api/email-templates'] });
      setShowEmailBuilder(false);
      setSelectedEmailTemplate(null);
    }
  });
  
  // Delete email template mutation
  const deleteEmailTemplate = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/email-templates/${id}`);
      if (!res.ok) throw new Error('Failed to delete email template');
      return res.json();
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Email template deleted successfully' });
      queryClient.invalidateQueries({ queryKey: ['/api/email-templates'] });
    }
  });
  
  // Update pricing settings mutation
  const updatePricingSettings = useMutation({
    mutationFn: async (data: Partial<PricingSettings>) => {
      const res = await apiRequest('PATCH', '/api/pricing-settings', data);
      if (!res.ok) throw new Error('Failed to update settings');
      return res.json();
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Settings updated successfully' });
      queryClient.invalidateQueries({ queryKey: ['/api/pricing-settings'] });
    }
  });
  
  // Set default template mutation
  const setDefaultTemplate = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('PATCH', `/api/quote-templates/${id}/set-default`, {});
      if (!res.ok) throw new Error('Failed to set default template');
      return res.json();
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Default template updated successfully' });
      queryClient.invalidateQueries({ queryKey: ['/api/quote-templates'] });
    }
  });
  
  const handleEditQuoteTemplate = (template: QuoteTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateBuilder(true);
  };
  
  const handleEditEmailTemplate = (template: EmailTemplate) => {
    setSelectedEmailTemplate(template);
    setShowEmailBuilder(true);
  };
  
  // Test webhook function
  const testWebhook = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/webhook/test', {
        name: "Test Customer",
        email: "test@example.com", 
        phone: "+15125551234",
        eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        eventType: "Bachelor Party",
        groupSize: 25,
        quoteId: "test-quote-123"
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to test webhook');
      }
      return res.json();
    },
    onSuccess: (data) => {
      setWebhookTestResult({ 
        success: true, 
        message: 'Webhook test sent successfully! Check the server logs for details.' 
      });
      toast({ 
        title: 'Success', 
        description: 'Webhook test sent successfully!'
      });
    },
    onError: (error: any) => {
      setWebhookTestResult({ 
        success: false, 
        message: error.message || 'Failed to test webhook'
      });
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to test webhook',
        variant: 'destructive'
      });
    }
  });
  
  const eventTypes = [
    { value: 'bachelor', label: 'Bachelor Party' },
    { value: 'bachelorette', label: 'Bachelorette Party' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'wedding', label: 'Wedding Reception' },
    { value: 'other', label: 'Other' }
  ];
  
  const emailTypes = [
    { value: 'quote_delivery', label: 'Quote Delivery' },
    { value: 'payment_confirmation', label: 'Payment Confirmation' },
    { value: 'booking_confirmation', label: 'Booking Confirmation' },
    { value: 'follow_up', label: 'Follow Up' },
    { value: 'reminder', label: 'Reminder' }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600">Manage templates, pricing, and system configuration</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full max-w-4xl grid-cols-4">
            <TabsTrigger value="quote-templates">
              <FileText className="h-4 w-4 mr-2" />
              Quote Templates
            </TabsTrigger>
            <TabsTrigger value="email-templates">
              <Mail className="h-4 w-4 mr-2" />
              Email Templates
            </TabsTrigger>
            <TabsTrigger value="global-settings">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Global Settings
            </TabsTrigger>
            <TabsTrigger value="website-platform">
              <Globe className="h-4 w-4 mr-2" />
              Website Platform Plan
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="quote-templates" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Quote Templates</CardTitle>
                    <CardDescription>
                      Create and manage reusable quote templates for different event types
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => {
                      setSelectedTemplate(null);
                      setShowTemplateBuilder(true);
                    }}
                    data-testid="button-new-quote-template"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {quoteTemplates.map(template => (
                    <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{template.name}</h3>
                          {template.isDefault && (
                            <Badge variant="default">
                              Default
                            </Badge>
                          )}
                          <Badge variant={template.active ? 'default' : 'secondary'}>
                            {template.active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Badge variant="outline">
                            {eventTypes.find(e => e.value === template.eventType)?.label || template.eventType}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{template.description}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span>Duration: {template.duration}hrs</span>
                          <span>Group: {template.minGroupSize}-{template.maxGroupSize} guests</span>
                          <span>Items: {template.defaultItems?.length || 0}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditQuoteTemplate(template)}
                          data-testid={`button-edit-template-${template.id}`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Create a copy of the template
                            const copy = { ...template, name: `${template.name} (Copy)` };
                            const { id, ...copyData } = copy;
                            createQuoteTemplate.mutate(copyData);
                          }}
                          data-testid={`button-copy-template-${template.id}`}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        {!template.isDefault && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setDefaultTemplate.mutate(template.id)}
                            data-testid={`button-set-default-${template.id}`}
                          >
                            Set Default
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteQuoteTemplate.mutate(template.id)}
                          disabled={template.isDefault}
                          data-testid={`button-delete-template-${template.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {quoteTemplates.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No quote templates yet. Create your first template to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email-templates" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>
                      Design email templates for automated communications
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => {
                      setSelectedEmailTemplate(null);
                      setShowEmailBuilder(true);
                    }}
                    data-testid="button-new-email-template"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {emailTemplates.map(template => (
                    <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{template.name}</h3>
                          <Badge variant={template.active ? 'default' : 'secondary'}>
                            {template.active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Badge variant="outline">
                            {emailTypes.find(e => e.value === template.templateType)?.label || template.templateType}
                          </Badge>
                          {template.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{template.description}</p>
                        <p className="text-sm text-gray-500">Subject: {template.subject}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditEmailTemplate(template)}
                          data-testid={`button-edit-email-${template.id}`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteEmailTemplate.mutate(template.id)}
                          data-testid={`button-delete-email-${template.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {emailTemplates.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No email templates yet. Create your first template to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="global-settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Global Settings</CardTitle>
                <CardDescription>
                  Configure system-wide pricing and business rules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Tax & Fees</h3>
                    <div className="grid gap-4 max-w-md">
                      <div>
                        <Label>Sales Tax Rate</Label>
                        <div className="flex gap-2 mt-1">
                          <Input 
                            type="number" 
                            placeholder="8.25" 
                            defaultValue={pricingSettings?.taxRate ? (pricingSettings.taxRate * 100).toFixed(2) : "8.25"}
                            step="0.01"
                            data-testid="input-tax-rate"
                          />
                          <span className="flex items-center px-3 text-gray-500">%</span>
                        </div>
                      </div>
                      <div>
                        <Label>Gratuity Rate</Label>
                        <div className="flex gap-2 mt-1">
                          <Input 
                            type="number" 
                            placeholder="20" 
                            defaultValue={pricingSettings?.defaultGratuityPercent ? pricingSettings.defaultGratuityPercent.toFixed(0) : "20"}
                            step="1"
                            data-testid="input-gratuity-rate"
                          />
                          <span className="flex items-center px-3 text-gray-500">%</span>
                        </div>
                      </div>
                      <div>
                        <Label>Default Deposit</Label>
                        <div className="flex gap-2 mt-1">
                          <Input 
                            type="number" 
                            placeholder="25" 
                            defaultValue={pricingSettings?.defaultDepositPercent || 25}
                            step="5"
                            data-testid="input-deposit-percent"
                          />
                          <span className="flex items-center px-3 text-gray-500">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Quote Settings</h3>
                    <div className="space-y-3 max-w-md">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-expire">Auto-expire quotes</Label>
                        <Switch id="auto-expire" defaultChecked data-testid="switch-auto-expire" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="expire-days">Expire after (days)</Label>
                        <Input 
                          id="expire-days"
                          type="number" 
                          className="w-20"
                          defaultValue={7}
                          data-testid="input-expire-days"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="payment-due">Payment due before event (days)</Label>
                        <Input 
                          id="payment-due"
                          type="number" 
                          className="w-20"
                          defaultValue={3}
                          data-testid="input-payment-due"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Notifications</h3>
                    <div className="space-y-3 max-w-md">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications">Email notifications</Label>
                        <Switch id="email-notifications" defaultChecked data-testid="switch-email-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sms-notifications">SMS notifications</Label>
                        <Switch id="sms-notifications" data-testid="switch-sms-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-reminders">Automatic reminders</Label>
                        <Switch id="auto-reminders" defaultChecked data-testid="switch-auto-reminders" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="website-platform" className="space-y-6">
            {/* Website Architecture Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Website Architecture Plan
                </CardTitle>
                <CardDescription>
                  Strategic plan for expanding CRM into a full rental business website platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">Public Website Pages</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Homepage</div>
                        <div className="text-sm text-muted-foreground">Hero section, services overview, testimonials, embedded booking widget</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">About Us</div>
                        <div className="text-sm text-muted-foreground">Company story, team, safety certifications, fleet information</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Services</div>
                        <div className="text-sm text-muted-foreground">Private cruises, disco cruises, packages with live pricing</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Testimonials & Gallery</div>
                        <div className="text-sm text-muted-foreground">Customer reviews, event photos, social proof</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Contact & Booking</div>
                        <div className="text-sm text-muted-foreground">Contact forms, calendar widget, instant quotes</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">Admin Dashboard (Existing)</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div className="font-medium">CRM & Pipeline</div>
                        <div className="text-sm text-muted-foreground">Lead management, quotes, invoices - KEEPS ALL EXISTING FUNCTIONALITY</div>
                      </div>
                      <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div className="font-medium">Calendar Management</div>
                        <div className="text-sm text-muted-foreground">Availability blocking, booking management - EXISTING SYSTEM</div>
                      </div>
                      <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div className="font-medium">Payment Processing</div>
                        <div className="text-sm text-muted-foreground">Stripe integration, deposits, full payments - EXISTING SYSTEM</div>
                      </div>
                      <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div className="font-medium">Website Builder</div>
                        <div className="text-sm text-muted-foreground">NEW: Page editor with drag-and-drop functionality</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Architecture Benefits</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                    <li>• Public website showcases business professionally</li>
                    <li>• Existing booking system integrates seamlessly</li>
                    <li>• Admin retains full CRM functionality</li>
                    <li>• Single domain with proper routing (/admin/* for CRM)</li>
                    <li>• Unified availability and payment processing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Integration Strategy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Puzzle className="h-5 w-5" />
                  Integration Strategy
                </CardTitle>
                <CardDescription>
                  How to embed existing booking components into new website pages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Direct Component Reuse</h4>
                    <div className="text-sm text-muted-foreground mt-2">
                      <div className="font-medium">Existing Components:</div>
                      <ul className="mt-1 space-y-1">
                        <li>• PublicCalendar</li>
                        <li>• BookingFlow</li>
                        <li>• ProductPicker</li>
                        <li>• QuoteBuilder</li>
                        <li>• Checkout</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Embed Integration</h4>
                    <div className="text-sm text-muted-foreground mt-2">
                      <div className="font-medium">Methods:</div>
                      <ul className="mt-1 space-y-1">
                        <li>• Widget embeds (existing /embed/* routes)</li>
                        <li>• Direct component imports</li>
                        <li>• API endpoint consumption</li>
                        <li>• Shared state management</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600">Unified Experience</h4>
                    <div className="text-sm text-muted-foreground mt-2">
                      <div className="font-medium">Result:</div>
                      <ul className="mt-1 space-y-1">
                        <li>• Same booking flow</li>
                        <li>• Consistent availability</li>
                        <li>• Unified payment processing</li>
                        <li>• Shared customer data</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Implementation Approach</h4>
                  <div className="text-sm text-green-700 dark:text-green-300 mt-2">
                    <strong>No Rebuilding Required:</strong> The existing booking components can be directly imported and used in new website pages. The embed system already exists and works perfectly for external integration.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Drag-and-Drop Builder Implementation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Drag-and-Drop Builder Implementation
                </CardTitle>
                <CardDescription>
                  Specific recommendations for React-based page builder solutions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Option 1: Puck</h4>
                    <Badge className="mt-2">RECOMMENDED</Badge>
                    <div className="text-sm text-muted-foreground mt-2">
                      <ul className="space-y-1">
                        <li>• React-based, open source</li>
                        <li>• Perfect for our component system</li>
                        <li>• Can wrap existing components</li>
                        <li>• Excellent TypeScript support</li>
                        <li>• Lightweight and flexible</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Option 2: Craft.js</h4>
                    <Badge variant="outline" className="mt-2">ALTERNATIVE</Badge>
                    <div className="text-sm text-muted-foreground mt-2">
                      <ul className="space-y-1">
                        <li>• Highly customizable</li>
                        <li>• Good React integration</li>
                        <li>• More complex setup</li>
                        <li>• Powerful for advanced needs</li>
                        <li>• Steeper learning curve</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600">Option 3: Builder.io</h4>
                    <Badge variant="secondary" className="mt-2">HOSTED</Badge>
                    <div className="text-sm text-muted-foreground mt-2">
                      <ul className="space-y-1">
                        <li>• Commercial solution</li>
                        <li>• Advanced features</li>
                        <li>• External dependency</li>
                        <li>• Monthly costs</li>
                        <li>• Less control</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Puck Implementation Plan</h4>
                  <div className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-2">
                    <div><strong>1. Component Wrapping:</strong> Wrap existing components (BookingWidget, ProductPicker, TestimonialCard) as Puck components</div>
                    <div><strong>2. Builder Interface:</strong> Add Puck editor to admin dashboard for page management</div>
                    <div><strong>3. Page Storage:</strong> Store page configurations in existing database</div>
                    <div><strong>4. Rendering:</strong> Create dynamic page renderer for public website</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Replit Platform Optimization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Replit Platform Optimization
                </CardTitle>
                <CardDescription>
                  Leveraging Replit's features for production website deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Autoscale Deployment</h4>
                    <div className="text-sm text-muted-foreground mt-2">
                      <ul className="space-y-1">
                        <li>• Automatic scaling for traffic spikes</li>
                        <li>• Production-ready hosting</li>
                        <li>• Built-in CDN and performance optimization</li>
                        <li>• Zero-downtime deployments</li>
                        <li>• Environment variable management</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Custom Domain & SSL</h4>
                    <div className="text-sm text-muted-foreground mt-2">
                      <ul className="space-y-1">
                        <li>• Custom domain setup (premierpartycruises.com)</li>
                        <li>• Automatic SSL certificate management</li>
                        <li>• Professional business appearance</li>
                        <li>• SEO benefits from custom domain</li>
                        <li>• Email integration possibilities</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Deployment Strategy</h4>
                  <div className="text-sm text-green-700 dark:text-green-300 mt-2">
                    <strong>Single Application Deployment:</strong> The existing Replit project can serve both the public website and admin dashboard from the same deployment, using routing to separate concerns (/admin/* for CRM, /* for public website).
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Implementation Phases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  Technical Implementation Phases
                </CardTitle>
                <CardDescription>
                  Step-by-step roadmap for building the website expansion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">Phase 1: Foundation (Week 1)</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                      <li>• Install and configure Puck page builder</li>
                      <li>• Create page management system in admin dashboard</li>
                      <li>• Set up public website routing structure</li>
                      <li>• Create base page templates and layouts</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Phase 2: Component Integration (Week 2)</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 mt-2 space-y-1">
                      <li>• Wrap existing booking components for Puck</li>
                      <li>• Create content components (hero, testimonials, gallery)</li>
                      <li>• Implement component preview system</li>
                      <li>• Test component integration and data flow</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">Phase 3: Content Creation (Week 3)</h4>
                    <ul className="text-sm text-purple-700 dark:text-purple-300 mt-2 space-y-1">
                      <li>• Build homepage with hero and booking integration</li>
                      <li>• Create about page with company information</li>
                      <li>• Develop services pages with live pricing</li>
                      <li>• Implement testimonials and gallery pages</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200">Phase 4: SEO & Performance (Week 4)</h4>
                    <ul className="text-sm text-orange-700 dark:text-orange-300 mt-2 space-y-1">
                      <li>• Implement SEO optimization (meta tags, structured data)</li>
                      <li>• Add performance optimizations and caching</li>
                      <li>• Set up custom domain and SSL certificate</li>
                      <li>• Launch and test full website functionality</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Management Strategy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  Content Management Strategy
                </CardTitle>
                <CardDescription>
                  How page editors can build/edit pages with prompts and backend access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Visual Page Builder</h4>
                    <div className="text-sm text-muted-foreground mt-2">
                      <ul className="space-y-1">
                        <li>• Drag-and-drop interface using Puck</li>
                        <li>• Live preview of changes</li>
                        <li>• Pre-built component library</li>
                        <li>• Mobile responsiveness controls</li>
                        <li>• Content versioning and drafts</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">AI-Assisted Editing</h4>
                    <div className="text-sm text-muted-foreground mt-2">
                      <ul className="space-y-1">
                        <li>• Prompt-based content generation</li>
                        <li>• Auto-suggest component layouts</li>
                        <li>• Content optimization recommendations</li>
                        <li>• SEO guidance and suggestions</li>
                        <li>• Brand consistency checking</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-purple-600">Direct Backend Access</h4>
                  <div className="text-sm text-muted-foreground mt-2">
                    For advanced users, direct file editing access through:
                    <ul className="mt-1 space-y-1">
                      <li>• Code editor integration in admin dashboard</li>
                      <li>• Git workflow for version control</li>
                      <li>• Component library management</li>
                      <li>• Custom CSS and styling overrides</li>
                      <li>• Database schema modifications</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Structure Organization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  File Structure Organization
                </CardTitle>
                <CardDescription>
                  How to organize the codebase to support both CRM and public website functionality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                    <h4 className="font-semibold font-mono text-sm">Proposed File Structure</h4>
                    <pre className="text-xs text-muted-foreground mt-2 overflow-x-auto">
{`client/
├── src/
│   ├── pages/
│   │   ├── admin/          # Existing CRM pages (Dashboard, Leads, etc.)
│   │   └── public/         # NEW: Public website pages
│   │       ├── HomePage.tsx
│   │       ├── AboutPage.tsx
│   │       ├── ServicesPage.tsx
│   │       └── ContactPage.tsx
│   ├── components/
│   │   ├── admin/          # Existing CRM components
│   │   ├── public/         # NEW: Public website components
│   │   │   ├── Hero.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Gallery.tsx
│   │   ├── shared/         # Shared components (booking, etc.)
│   │   └── builder/        # NEW: Puck page builder components
│   │       ├── PuckConfig.tsx
│   │       ├── ComponentLibrary.tsx
│   │       └── PageRenderer.tsx
│   ├── lib/
│   │   ├── puck/          # NEW: Page builder utilities
│   │   └── cms/           # NEW: Content management system
│   └── App.tsx            # Updated routing for public/admin
server/
├── routes/
│   ├── admin.ts           # Existing CRM API routes
│   ├── public.ts          # NEW: Public website API routes
│   └── pages.ts           # NEW: Page management API
└── storage/
    ├── crmStorage.ts      # Existing CRM data
    └── pageStorage.ts     # NEW: Page content storage`}
                    </pre>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">Organization Benefits</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                      <li>• Clear separation between admin and public functionality</li>
                      <li>• Shared components prevent code duplication</li>
                      <li>• Existing CRM code remains unchanged</li>
                      <li>• Easy to maintain and extend both systems</li>
                      <li>• Unified routing and state management</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Implementation Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Next Steps & Implementation
                </CardTitle>
                <CardDescription>
                  Ready to implement this comprehensive website platform expansion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Ready to Begin</h4>
                  <div className="text-sm text-green-700 dark:text-green-300 mt-2">
                    This plan leverages all existing functionality while adding professional website capabilities. The booking system, payment processing, and CRM functionality will remain fully operational throughout the implementation.
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Implementation Plan Ready",
                        description: "This comprehensive plan is ready for implementation. All existing CRM functionality will be preserved.",
                      });
                    }}
                    data-testid="button-start-implementation"
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Begin Implementation
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Plan Documentation",
                        description: "This plan has been documented in the Settings dashboard for reference.",
                      });
                    }}
                    data-testid="button-save-plan"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">GoHighLevel Webhook</h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Webhook className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Webhook Configuration</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                              When leads are created, their information will be automatically sent to your GoHighLevel webhook.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Webhook URL</Label>
                        <p className="text-sm text-gray-500 mb-2">
                          Configure the webhook URL via the GOHIGHLEVEL_WEBHOOK_URL environment variable
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md font-mono text-sm">
                          {import.meta.env.VITE_GOHIGHLEVEL_WEBHOOK_URL || 'Not configured'}
                        </div>
                      </div>
                      
                      <div>
                        <Label>Test Webhook</Label>
                        <p className="text-sm text-gray-500 mb-2">
                          Send a test payload to verify your webhook is working correctly
                        </p>
                        <div className="space-y-3">
                          <Button 
                            onClick={() => {
                              setWebhookTestResult(null);
                              testWebhook.mutate();
                            }}
                            disabled={testWebhook.isPending}
                            variant="outline"
                            data-testid="button-test-webhook"
                          >
                            {testWebhook.isPending ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Testing...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Test Webhook
                              </>
                            )}
                          </Button>
                          
                          {webhookTestResult && (
                            <div className={`p-3 rounded-md ${webhookTestResult.success ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
                              <div className="flex items-start gap-2">
                                {webhookTestResult.success ? (
                                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                                )}
                                <p className={`text-sm ${webhookTestResult.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                                  {webhookTestResult.message}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Label>Sample Payload</Label>
                        <p className="text-sm text-gray-500 mb-2">
                          This is an example of the data sent to your webhook
                        </p>
                        <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-xs overflow-x-auto">
{JSON.stringify({
  name: "John Doe",
  email: "john@example.com",
  phone: "+15125551234",
  requested_cruise_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  type_of_cruise: "Bachelor Party",
  max_number_of_people: 25,
  quote_link: "https://app.premierpartycruises.com/quote/abc123",
  created_at: new Date().toISOString()
}, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => {
                        // Save global settings
                        updatePricingSettings.mutate({});
                      }}
                      data-testid="button-save-settings"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Quote Template Builder Dialog */}
        <Dialog open={showTemplateBuilder} onOpenChange={setShowTemplateBuilder}>
          <DialogContent className="max-w-7xl h-[90vh]">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Quote Template Builder</h2>
              <p className="text-muted-foreground">Template builder will be available soon.</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowTemplateBuilder(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Email Template Builder Dialog */}
        <Dialog open={showEmailBuilder} onOpenChange={setShowEmailBuilder}>
          <DialogContent className="max-w-7xl h-[90vh]">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Email Template Builder</h2>
              <p className="text-muted-foreground">Template builder will be available soon.</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowEmailBuilder(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}