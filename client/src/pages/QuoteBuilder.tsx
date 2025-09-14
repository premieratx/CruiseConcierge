import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { insertQuoteSchema, type Quote, type Project, type Contact, type QuoteTemplate } from '@shared/schema';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Send, Plus, Trash2, DollarSign, Calendar, Users, Ship, Percent, AlertCircle } from 'lucide-react';

// Extended schema for form with all fields
const quoteFormSchema = insertQuoteSchema.extend({
  projectId: z.string().min(1, 'Project is required'),
  templateId: z.string().optional(),
  items: z.array(z.object({
    description: z.string().min(1, 'Description required'),
    quantity: z.number().min(1),
    unitPrice: z.number().min(0),
    total: z.number(),
  })).min(1, 'At least one item required'),
  discountAmount: z.number().min(0).default(0),
  depositAmount: z.number().min(0),
  notes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

export default function QuoteBuilder() {
  const [, params] = useRoute('/quotes/:id');
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const quoteId = params?.id;
  const isEditMode = quoteId && quoteId !== 'new';

  // Fetch existing quote if editing
  const { data: existingQuote } = useQuery({
    queryKey: ['/api/quotes', quoteId],
    enabled: !!isEditMode,
  });

  // Fetch projects for dropdown
  const { data: projects } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Fetch templates
  const { data: templates } = useQuery({
    queryKey: ['/api/quote-templates'],
  });

  // Fetch pricing settings
  const { data: pricingSettings } = useQuery({
    queryKey: ['/api/pricing-settings'],
  });

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      projectId: '',
      templateId: '',
      items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
      subtotal: 0,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount: 0,
      depositAmount: 0,
      status: 'DRAFT',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: '',
    },
  });

  // Load existing quote data
  useEffect(() => {
    if (existingQuote) {
      form.reset({
        ...existingQuote,
        validUntil: existingQuote.validUntil.split('T')[0],
      });
    }
  }, [existingQuote, form]);

  // Calculate totals
  const watchItems = form.watch('items');
  const watchDiscountAmount = form.watch('discountAmount');

  useEffect(() => {
    const subtotal = watchItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxRate = pricingSettings?.taxRate || 0.0825;
    const taxAmount = Math.round(subtotal * taxRate);
    const totalAmount = subtotal + taxAmount - watchDiscountAmount;
    
    // Calculate deposit based on project date
    const projectId = form.watch('projectId');
    const project = projects?.find((p: Project) => p.id === projectId);
    let depositAmount = totalAmount;
    
    if (project?.eventDate) {
      const daysUntilEvent = Math.floor((new Date(project.eventDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (daysUntilEvent > 30) {
        depositAmount = Math.round(totalAmount * 0.25); // 25% deposit if > 30 days
      }
    }

    form.setValue('subtotal', subtotal);
    form.setValue('taxAmount', taxAmount);
    form.setValue('totalAmount', totalAmount);
    form.setValue('depositAmount', depositAmount);
  }, [watchItems, watchDiscountAmount, form, projects, pricingSettings]);

  // Save quote mutation
  const saveQuote = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      const url = isEditMode ? `/api/quotes/${quoteId}` : '/api/quotes';
      const method = isEditMode ? 'PATCH' : 'POST';
      
      return apiRequest(method, url, data);
    },
    onSuccess: (data) => {
      toast({
        title: isEditMode ? 'Quote Updated' : 'Quote Created',
        description: `Quote #${data.id} has been saved successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
      setLocation(`/quotes/${data.id}`);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to save quote. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Send quote mutation
  const sendQuote = useMutation({
    mutationFn: async (quoteId: string) => {
      return apiRequest('POST', `/api/quotes/${quoteId}/send`, {
        method: 'email',
        recipientEmail: getContactEmail(),
        personalMessage: 'Thank you for choosing Premier Party Cruises! Please review your quote below.',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Quote Sent',
        description: 'Quote has been sent successfully via email.',
      });
      form.setValue('status', 'SENT');
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send quote. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Apply template
  const applyTemplate = (templateId: string) => {
    const template = templates?.find((t: QuoteTemplate) => t.id === templateId);
    if (template) {
      form.setValue('items', template.defaultItems || []);
      form.setValue('notes', template.termsAndConditions || '');
      toast({
        title: 'Template Applied',
        description: `${template.name} template has been applied.`,
      });
    }
  };

  // Add new item
  const addItem = () => {
    const currentItems = form.getValues('items');
    form.setValue('items', [...currentItems, { description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  // Remove item
  const removeItem = (index: number) => {
    const currentItems = form.getValues('items');
    if (currentItems.length > 1) {
      form.setValue('items', currentItems.filter((_, i) => i !== index));
    }
  };

  // Get contact email for sending
  const getContactEmail = () => {
    const projectId = form.watch('projectId');
    const project = projects?.find((p: Project) => p.id === projectId);
    // This would need to fetch the contact's email based on project.contactId
    return 'customer@example.com'; // Placeholder
  };

  const onSubmit = (data: QuoteFormData) => {
    saveQuote.mutate(data);
  };

  return (
    <div className="container max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => setLocation('/quotes')}
          className="mb-4"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quotes
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {isEditMode ? `Edit Quote #${quoteId}` : 'Create New Quote'}
            </h1>
            <p className="text-muted-foreground mt-1">
              Build and customize your quote with templates and pricing rules
            </p>
          </div>
          
          <div className="flex gap-2">
            {isEditMode && (
              <Button
                variant="outline"
                onClick={() => sendQuote.mutate(quoteId)}
                disabled={sendQuote.isPending}
                data-testid="button-send-quote"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Quote
              </Button>
            )}
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Quote Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project & Template Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Quote Details</CardTitle>
                  <CardDescription>Select project and template</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="projectId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-project">
                                <SelectValue placeholder="Select a project" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {projects?.map((project: Project) => (
                                <SelectItem key={project.id} value={project.id}>
                                  {project.name} - {new Date(project.eventDate).toLocaleDateString()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="templateId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template (Optional)</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              applyTemplate(value);
                            }} 
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-template">
                                <SelectValue placeholder="Select a template" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {templates?.map((template: QuoteTemplate) => (
                                <SelectItem key={template.id} value={template.id}>
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>Apply a template to pre-fill items</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="validUntil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valid Until</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            data-testid="input-valid-until"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Line Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Line Items</CardTitle>
                  <CardDescription>Add services and pricing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {watchItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-5">
                        <FormField
                          control={form.control}
                          name={`items.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              {index === 0 && <FormLabel>Description</FormLabel>}
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Service description"
                                  data-testid={`input-item-description-${index}`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              {index === 0 && <FormLabel>Qty</FormLabel>}
                              <FormControl>
                                <Input 
                                  {...field}
                                  type="number"
                                  onChange={(e) => {
                                    const qty = parseInt(e.target.value) || 0;
                                    field.onChange(qty);
                                    const unitPrice = form.getValues(`items.${index}.unitPrice`);
                                    form.setValue(`items.${index}.total`, qty * unitPrice);
                                  }}
                                  data-testid={`input-item-quantity-${index}`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name={`items.${index}.unitPrice`}
                          render={({ field }) => (
                            <FormItem>
                              {index === 0 && <FormLabel>Unit Price</FormLabel>}
                              <FormControl>
                                <Input 
                                  {...field}
                                  type="number"
                                  step="0.01"
                                  onChange={(e) => {
                                    const price = parseFloat(e.target.value) || 0;
                                    const cents = Math.round(price * 100);
                                    field.onChange(cents);
                                    const qty = form.getValues(`items.${index}.quantity`);
                                    form.setValue(`items.${index}.total`, qty * cents);
                                  }}
                                  value={field.value / 100}
                                  data-testid={`input-item-price-${index}`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="col-span-2">
                        {index === 0 && <FormLabel>Total</FormLabel>}
                        <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center">
                          ${((watchItems[index].quantity * watchItems[index].unitPrice) / 100).toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="col-span-1">
                        {index === 0 && <div className="h-6" />}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                          disabled={watchItems.length === 1}
                          data-testid={`button-remove-item-${index}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addItem}
                    className="w-full"
                    data-testid="button-add-item"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Line Item
                  </Button>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes & Terms</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            rows={4}
                            placeholder="Add any notes, terms, or conditions..."
                            data-testid="textarea-notes"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Pricing Summary Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Pricing Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        ${(form.watch('subtotal') / 100).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Tax (8.25%)</span>
                      <span className="font-medium">
                        ${(form.watch('taxAmount') / 100).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Discount</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={form.watch('discountAmount') / 100}
                          onChange={(e) => {
                            const discount = Math.round(parseFloat(e.target.value) * 100) || 0;
                            form.setValue('discountAmount', discount);
                          }}
                          className="w-24 h-8"
                          data-testid="input-discount"
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-lg">
                        ${(form.watch('totalAmount') / 100).toFixed(2)}
                      </span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <span>Deposit Required</span>
                      <span className="font-semibold text-primary">
                        ${(form.watch('depositAmount') / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Deposit Info */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        {form.watch('depositAmount') === form.watch('totalAmount')
                          ? 'Full payment required (event within 30 days)'
                          : '25% deposit required (event more than 30 days out)'}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-status">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="SENT">Sent</SelectItem>
                            <SelectItem value="VIEWED">Viewed</SelectItem>
                            <SelectItem value="ACCEPTED">Accepted</SelectItem>
                            <SelectItem value="DECLINED">Declined</SelectItem>
                            <SelectItem value="EXPIRED">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={saveQuote.isPending}
                      data-testid="button-save-quote"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isEditMode ? 'Update Quote' : 'Create Quote'}
                    </Button>
                    
                    {isEditMode && (
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-full"
                        onClick={() => sendQuote.mutate(quoteId)}
                        disabled={sendQuote.isPending}
                        data-testid="button-send-now"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}