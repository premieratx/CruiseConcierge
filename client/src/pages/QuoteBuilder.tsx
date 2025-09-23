import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { insertQuoteSchema, type Quote, type Project, type Contact, type QuoteTemplate, type RadioSection, type RadioOption, type Product, type PricingSettings } from '@shared/schema';
import { ContactInfoModal } from '@/components/ContactInfoModal';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Send, Plus, Trash2, DollarSign, Calendar, Users, Ship, Percent, AlertCircle, CheckCircle2, Settings, ShoppingCart, ChevronDown, ChevronUp, Eye, EyeOff, Lock, Unlock, Package, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import Layout from '@/components/Layout';
import ProductPicker from '@/components/ProductPicker';

// Extended schema for form with all fields
const quoteFormSchema = insertQuoteSchema.extend({
  projectId: z.string().min(1, 'Project is required'),
  templateId: z.string().optional(),
  items: z.array(z.object({
    type: z.string().default('line_item'),
    name: z.string().min(1, 'Description required'),
    productId: z.string().optional(),
    unitPrice: z.number().min(0),
    qty: z.number().min(1),
    clientCanEditQty: z.boolean().default(false),
    groupId: z.string().optional(),
    required: z.boolean().default(false),
    order: z.number().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
  })).min(1, 'At least one item required'),
  radioSections: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    required: z.boolean(),
    options: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      price: z.number(),
      isDefault: z.boolean().optional(),
      metadata: z.record(z.any()).optional(),
    })),
    selectedOptionId: z.string().optional(),
    allowCustomInput: z.boolean().optional(),
    customInputLabel: z.string().optional(),
    order: z.number().optional(),
  })).default([]),
  discountTotal: z.number().min(0).default(0),
  depositAmount: z.number().min(0),
  notes: z.string().optional(),
}).refine((data) => {
  // Validate that all required radio sections have a selectedOptionId
  const requiredSections = data.radioSections.filter(section => section.required);
  for (const section of requiredSections) {
    if (!section.selectedOptionId) {
      return false;
    }
  }
  return true;
}, {
  message: 'All required option groups must have a selection',
  path: ['radioSections'],
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

export default function QuoteBuilder() {
  const [, params] = useRoute('/quotes/:id');
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const quoteId = params?.id;
  const isEditMode = quoteId && quoteId !== 'new';
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  const [showContactInfoModal, setShowContactInfoModal] = useState(false);
  const [chatSelections, setChatSelections] = useState<any>(null);

  // Check for selections from Chat flow on component mount
  useEffect(() => {
    if (!isEditMode) {
      const selections = localStorage.getItem('quote-builder-selections');
      if (selections) {
        try {
          const parsed = JSON.parse(selections);
          setChatSelections(parsed);
          setShowContactInfoModal(true);
          // Clear localStorage so modal doesn't show again on refresh
          localStorage.removeItem('quote-builder-selections');
        } catch (error) {
          console.error('Failed to parse chat selections:', error);
        }
      }
    }
  }, [isEditMode]);

  // Initialize form first
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      projectId: '',
      templateId: '',
      items: [{ 
        type: 'line_item',
        name: '',
        unitPrice: 0,
        qty: 1,
        clientCanEditQty: false,
        required: false,
      }],
      radioSections: [],
      subtotal: 0,
      tax: 0,
      discountTotal: 0,
      total: 0,
      depositAmount: 0,
      status: 'DRAFT',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      notes: '',
    },
  });

  // Fetch existing quote if editing
  const { data: existingQuote } = useQuery<Quote>({
    queryKey: ['/api/quotes', quoteId],
    enabled: !!isEditMode,
  });

  // Fetch projects for dropdown
  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Fetch templates
  const { data: templates } = useQuery<QuoteTemplate[]>({
    queryKey: ['/api/quote-templates'],
  });

  // Fetch pricing settings
  const { data: pricingSettings } = useQuery<PricingSettings>({
    queryKey: ['/api/pricing-settings'],
  });

  // Fetch contact for selected project (now after form initialization)
  const selectedProjectId = form.watch('projectId');
  const selectedProject = projects?.find((p: Project) => p.id === selectedProjectId);
  const { data: projectContact } = useQuery<Contact>({
    queryKey: ['/api/contacts', selectedProject?.contactId],
    enabled: !!selectedProject?.contactId,
  });

  // Load existing quote data
  useEffect(() => {
    if (existingQuote) {
      form.reset({
        ...existingQuote,
        templateId: existingQuote.templateId || undefined,
        items: existingQuote.items?.map(item => ({
          ...item,
          clientCanEditQty: item.clientCanEditQty || false,
          required: item.required || false,
        })) || [],
        radioSections: existingQuote.radioSections || [],
        expiresAt: existingQuote.expiresAt ? (() => {
          const date = new Date(existingQuote.expiresAt);
          return !isNaN(date.getTime()) ? date : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        })() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    }
  }, [existingQuote, form]);

  // Calculate totals
  const watchItems = form.watch('items');
  const watchRadioSections = form.watch('radioSections');
  const watchDiscountTotal = form.watch('discountTotal');

  useEffect(() => {
    // Calculate line items total
    const lineItemsTotal = watchItems.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
    
    // Calculate radio sections total
    const radioSectionsTotal = watchRadioSections.reduce((sum, section) => {
      if (section.selectedOptionId) {
        const selectedOption = section.options.find(opt => opt.id === section.selectedOptionId);
        return sum + (selectedOption?.price || 0);
      }
      return sum;
    }, 0);
    
    const subtotal = lineItemsTotal + radioSectionsTotal;
    const taxRate = (pricingSettings?.taxRate || 825) / 10000; // Convert basis points to decimal
    const taxAmount = Math.round(subtotal * taxRate);
    const totalAmount = subtotal + taxAmount - watchDiscountTotal;
    
    // Calculate deposit based on project date
    const projectId = form.watch('projectId');
    const project = projects?.find((p: Project) => p.id === projectId);
    let depositAmount = totalAmount;
    
    if (project?.projectDate) {
      const projectDateObj = new Date(project.projectDate);
      const daysUntilEvent = !isNaN(projectDateObj.getTime()) 
        ? Math.floor((projectDateObj.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : 0;
      if (daysUntilEvent > 30) {
        depositAmount = Math.round(totalAmount * 0.25); // 25% deposit if > 30 days
      }
    }

    form.setValue('subtotal', subtotal);
    form.setValue('tax', taxAmount);
    form.setValue('total', totalAmount);
    form.setValue('depositAmount', depositAmount);
  }, [watchItems, watchRadioSections, watchDiscountTotal, form, projects, pricingSettings]);

  // Save quote mutation
  const saveQuote = useMutation<Quote, Error, QuoteFormData>({
    mutationFn: async (data: QuoteFormData) => {
      const url = isEditMode ? `/api/quotes/${quoteId}` : '/api/quotes';
      const method = isEditMode ? 'PATCH' : 'POST';
      
      const response = await apiRequest(method, url, data);
      return response.json();
    },
    onSuccess: (data: Quote) => {
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
      const sendData: any = {
        method: 'email',
        recipientEmail: getContactEmail(),
        personalMessage: 'Thank you for choosing Premier Party Cruises! Please review your quote below.',
      };
      
      // Add phone if available for SMS
      const phone = getContactPhone();
      if (phone) {
        sendData.recipientPhone = phone;
        sendData.sendSms = true;
      }
      
      return apiRequest('POST', `/api/quotes/${quoteId}/send`, sendData);
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

  // CRITICAL: Handle payment processing - connects quote builder to UniversalCheckout
  const handlePayment = async (paymentType: 'deposit' | 'full') => {
    if (!isEditMode) {
      toast({
        title: "Save Quote First",
        description: "Please save the quote before proceeding to payment",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get the saved quote data
      const quote = existingQuote;
      if (!quote) {
        throw new Error('Quote not found');
      }

      // Build checkout URL with quote context
      const params = new URLSearchParams({
        quoteId: quote.id,
        entryPoint: 'quote_builder',
        eventType: 'custom',
        groupSize: (quote.project?.groupSize || 25).toString(),
        eventDate: quote.project?.projectDate ? (() => {
          const date = new Date(quote.project.projectDate);
          return !isNaN(date.getTime()) ? date.toISOString() : new Date().toISOString();
        })() : new Date().toISOString(),
        cruiseType: 'private',
        paymentType,
        // Pass existing quote total and deposit
        total: (quote.total || 0).toString(),
        depositAmount: (quote.depositAmount || 0).toString(),
      });

      // Navigate to UniversalCheckout with quote context
      setLocation(`/checkout?${params.toString()}`);
      
      toast({
        title: `Proceeding to ${paymentType === 'deposit' ? 'Deposit' : 'Full'} Payment`,
        description: "Taking you to secure checkout...",
      });
      
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Unable to proceed to payment",
        variant: "destructive",
      });
    }
  };

  // Apply template
  const applyTemplate = (templateId: string) => {
    const template = templates?.find((t: QuoteTemplate) => t.id === templateId);
    if (template) {
      const templateItems = template.defaultItems?.map(item => ({
        ...item,
        clientCanEditQty: item.clientCanEditQty || false,
        required: item.required || false,
      })) || [];
      form.setValue('items', templateItems);
      form.setValue('radioSections', template.defaultRadioSections || []);
      form.setValue('notes', template.description || '');
      toast({
        title: 'Template Applied',
        description: `${template.name} template has been applied.`,
      });
    }
  };

  // Add new item
  const addItem = () => {
    const currentItems = form.getValues('items');
    form.setValue('items', [...currentItems, { 
      type: 'line_item',
      name: '',
      unitPrice: 0,
      qty: 1,
      clientCanEditQty: false,
      required: false,
      description: '',
      category: 'service',
    }]);
  };

  // Add product from catalog
  const addProductFromCatalog = (product: Product) => {
    const currentItems = form.getValues('items');
    const newItem = {
      type: 'line_item',
      name: product.name,
      productId: product.id,
      unitPrice: product.unitPrice,
      qty: 1,
      clientCanEditQty: false,
      required: false,
      description: product.description || '',
      category: product.productType || 'service',
    };
    form.setValue('items', [...currentItems, newItem]);
    toast({
      title: 'Product Added',
      description: `${product.name} has been added to the quote.`,
    });
  };

  // Toggle item expansion
  const toggleItemExpansion = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Get selected product IDs for the picker
  const getSelectedProductIds = () => {
    return watchItems
      .filter(item => item.productId)
      .map(item => item.productId!)
      .filter(Boolean);
  };

  // Remove item
  const removeItem = (index: number) => {
    const currentItems = form.getValues('items');
    if (currentItems.length > 1) {
      form.setValue('items', currentItems.filter((_, i) => i !== index));
    }
  };

  // Radio section functions
  const addRadioSection = () => {
    const currentSections = form.getValues('radioSections');
    const newSection: RadioSection = {
      id: `section_${Date.now()}`,
      title: 'New Option Group',
      description: '',
      required: false,
      options: [
        {
          id: `option_${Date.now()}`,
          name: 'Option 1',
          description: '',
          price: 0,
          isDefault: true,
        }
      ],
      order: currentSections.length,
    };
    form.setValue('radioSections', [...currentSections, newSection]);
  };

  const removeRadioSection = (sectionIndex: number) => {
    const currentSections = form.getValues('radioSections');
    form.setValue('radioSections', currentSections.filter((_, i) => i !== sectionIndex));
  };

  const addRadioOption = (sectionIndex: number) => {
    const currentSections = form.getValues('radioSections');
    const newOption: RadioOption = {
      id: `option_${Date.now()}`,
      name: 'New Option',
      description: '',
      price: 0,
    };
    currentSections[sectionIndex].options.push(newOption);
    form.setValue('radioSections', [...currentSections]);
  };

  const removeRadioOption = (sectionIndex: number, optionIndex: number) => {
    const currentSections = form.getValues('radioSections');
    if (currentSections[sectionIndex].options.length > 1) {
      currentSections[sectionIndex].options.splice(optionIndex, 1);
      form.setValue('radioSections', [...currentSections]);
    }
  };

  const selectRadioOption = (sectionIndex: number, optionId: string) => {
    const currentSections = form.getValues('radioSections');
    currentSections[sectionIndex].selectedOptionId = optionId;
    form.setValue('radioSections', [...currentSections]);
  };

  // Get contact email for sending
  const getContactEmail = () => {
    return projectContact?.email || 'customer@example.com';
  };

  // Get contact phone for SMS
  const getContactPhone = () => {
    return projectContact?.phone || '';
  };

  const onSubmit = (data: QuoteFormData) => {
    saveQuote.mutate(data);
  };

  return (
    <Layout>
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
                                  {project.title || `Project ${project.id}`} - {project.projectDate ? (() => {
                                    const date = new Date(project.projectDate);
                                    return !isNaN(date.getTime()) ? date.toLocaleDateString() : 'TBD';
                                  })() : 'TBD'}
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
                    name="expiresAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valid Until</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            value={(() => {
                              if (!field.value) return '';
                              if (field.value instanceof Date && !isNaN(field.value.getTime())) {
                                return field.value.toISOString().split('T')[0];
                              }
                              return '';
                            })()}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (!inputValue) {
                                // Handle empty input
                                field.onChange(null);
                              } else {
                                // Validate date format (YYYY-MM-DD)
                                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                                if (dateRegex.test(inputValue)) {
                                  const parsedDate = new Date(inputValue + 'T00:00:00');
                                  // Check if the date is valid
                                  if (!isNaN(parsedDate.getTime())) {
                                    field.onChange(parsedDate);
                                  } else {
                                    // Invalid date, don't update
                                    console.warn('Invalid date input:', inputValue);
                                  }
                                }
                              }
                            }}
                            data-testid="input-valid-until"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Line Items Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Line Items
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowProductPicker(true)}
                        data-testid="button-add-from-products"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Add from Products
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addItem}
                        data-testid="button-add-custom-item"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Custom Item
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Add products from your catalog or create custom line items. All prices and quantities are fully editable.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {watchItems.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="font-semibold mb-2">No items yet</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Add products from your catalog or create custom line items to get started.
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowProductPicker(true)}
                          data-testid="button-add-from-products-empty"
                        >
                          <Package className="w-4 h-4 mr-2" />
                          Add from Products
                        </Button>
                        <Button
                          type="button"
                          onClick={addItem}
                          data-testid="button-add-custom-item-empty"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Custom Item
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {watchItems.map((item, index) => {
                        const isExpanded = expandedItems[index];
                        return (
                          <Card key={index} className={cn(
                            "border-2 transition-all",
                            item.required ? "border-orange-200 bg-orange-50/50" : "border-gray-200",
                            item.productId ? "bg-blue-50/30" : ""
                          )}>
                            <CardContent className="p-4">
                              {/* Main Item Row */}
                              <div className="grid grid-cols-12 gap-3 items-start">
                                {/* Item Name with Status Indicators */}
                                <div className="col-span-5">
                                  <div className="space-y-2">
                                    {index === 0 && <FormLabel>Service Description</FormLabel>}
                                    <div className="flex items-center gap-2">
                                      <FormField
                                        control={form.control}
                                        name={`items.${index}.name`}
                                        render={({ field }) => (
                                          <FormItem className="flex-1">
                                            <FormControl>
                                              <Input 
                                                {...field} 
                                                placeholder="Enter service description"
                                                data-testid={`input-item-name-${index}`}
                                                className="font-medium"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <div className="flex items-center gap-1">
                                        {item.productId && (
                                          <Badge variant="secondary" className="text-xs">
                                            <Package className="w-3 h-3 mr-1" />
                                            Product
                                          </Badge>
                                        )}
                                        {item.required && (
                                          <Badge variant="destructive" className="text-xs">
                                            <Lock className="w-3 h-3 mr-1" />
                                            Required
                                          </Badge>
                                        )}
                                        {item.clientCanEditQty && (
                                          <Badge variant="outline" className="text-xs">
                                            <Unlock className="w-3 h-3 mr-1" />
                                            Client Editable
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Quantity */}
                                <div className="col-span-2">
                                  <FormField
                                    control={form.control}
                                    name={`items.${index}.qty`}
                                    render={({ field }) => (
                                      <FormItem>
                                        {index === 0 && <FormLabel>Quantity</FormLabel>}
                                        <FormControl>
                                          <Input 
                                            {...field}
                                            type="number"
                                            min="1"
                                            onChange={(e) => {
                                              const qty = parseInt(e.target.value) || 1;
                                              field.onChange(qty);
                                            }}
                                            data-testid={`input-item-qty-${index}`}
                                            className="font-medium"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                
                                {/* Unit Price */}
                                <div className="col-span-2">
                                  <FormField
                                    control={form.control}
                                    name={`items.${index}.unitPrice`}
                                    render={({ field }) => (
                                      <FormItem>
                                        {index === 0 && <FormLabel>Unit Price</FormLabel>}
                                        <FormControl>
                                          <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input 
                                              type="number"
                                              step="0.01"
                                              min="0"
                                              onChange={(e) => {
                                                const price = parseFloat(e.target.value) || 0;
                                                const cents = Math.round(price * 100);
                                                field.onChange(cents);
                                              }}
                                              value={field.value ? (field.value / 100).toFixed(2) : '0.00'}
                                              data-testid={`input-item-price-${index}`}
                                              className="pl-8 font-medium"
                                            />
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                
                                {/* Total */}
                                <div className="col-span-2">
                                  {index === 0 && <FormLabel>Total</FormLabel>}
                                  <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center justify-end font-bold text-green-600">
                                    ${((watchItems[index]?.qty || 0) * (watchItems[index]?.unitPrice || 0) / 100).toFixed(2)}
                                  </div>
                                </div>
                                
                                {/* Actions */}
                                <div className="col-span-1 flex items-center justify-end gap-1">
                                  {index === 0 && <div className="h-6" />}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => toggleItemExpansion(index)}
                                    data-testid={`button-expand-item-${index}`}
                                  >
                                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeItem(index)}
                                    disabled={watchItems.length === 1}
                                    data-testid={`button-remove-item-${index}`}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Expandable Settings Section */}
                              {isExpanded && (
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-t">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Description */}
                                    <FormField
                                      control={form.control}
                                      name={`items.${index}.description`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Description</FormLabel>
                                          <FormControl>
                                            <Textarea 
                                              {...field}
                                              placeholder="Optional detailed description"
                                              rows={2}
                                              data-testid={`textarea-item-description-${index}`}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    
                                    {/* Category */}
                                    <FormField
                                      control={form.control}
                                      name={`items.${index}.category`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Category</FormLabel>
                                          <Select onValueChange={field.onChange} value={field.value || 'service'}>
                                            <FormControl>
                                              <SelectTrigger data-testid={`select-item-category-${index}`}>
                                                <SelectValue />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              <SelectItem value="service">Service</SelectItem>
                                              <SelectItem value="addon">Add-on</SelectItem>
                                              <SelectItem value="equipment">Equipment</SelectItem>
                                              <SelectItem value="food">Food & Beverage</SelectItem>
                                              <SelectItem value="misc">Miscellaneous</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  
                                  {/* Control Toggles */}
                                  <div className="mt-4 flex gap-6">
                                    <FormField
                                      control={form.control}
                                      name={`items.${index}.required`}
                                      render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                          <FormControl>
                                            <input
                                              type="checkbox"
                                              checked={field.value || false}
                                              onChange={field.onChange}
                                              className="rounded"
                                              data-testid={`checkbox-item-required-${index}`}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-medium cursor-pointer">
                                            Required Item
                                          </FormLabel>
                                          <FormDescription className="text-xs text-muted-foreground ml-2">
                                            Client cannot remove this item
                                          </FormDescription>
                                        </FormItem>
                                      )}
                                    />
                                    
                                    <FormField
                                      control={form.control}
                                      name={`items.${index}.clientCanEditQty`}
                                      render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                          <FormControl>
                                            <input
                                              type="checkbox"
                                              checked={field.value || false}
                                              onChange={field.onChange}
                                              className="rounded"
                                              data-testid={`checkbox-item-client-editable-${index}`}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-medium cursor-pointer">
                                            Client Can Edit Quantity
                                          </FormLabel>
                                          <FormDescription className="text-xs text-muted-foreground ml-2">
                                            Allow clients to adjust the quantity
                                          </FormDescription>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Radio Sections - Either/Or Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Either/Or Options
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addRadioSection}
                      data-testid="button-add-radio-section"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Option Group
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Create option groups where customers can select only one choice per group (e.g., time slots, packages)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {watchRadioSections.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No option groups yet. Add an option group to create either/or choices.</p>
                    </div>
                  ) : (
                    watchRadioSections.map((section, sectionIndex) => (
                      <Card key={section.id || sectionIndex} className="border-2 border-dashed border-gray-200">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <FormField
                                control={form.control}
                                name={`radioSections.${sectionIndex}.title`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input 
                                        {...field}
                                        placeholder="Option Group Title (e.g., Time Slot Options)"
                                        className="text-lg font-semibold border-none p-0 focus:ring-0"
                                        data-testid={`input-section-title-${sectionIndex}`}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`radioSections.${sectionIndex}.description`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input 
                                        {...field}
                                        placeholder="Optional description for this option group"
                                        className="text-sm text-muted-foreground border-none p-0 focus:ring-0"
                                        data-testid={`input-section-description-${sectionIndex}`}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <FormField
                                control={form.control}
                                name={`radioSections.${sectionIndex}.required`}
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <input
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={field.onChange}
                                        className="rounded"
                                        data-testid={`checkbox-section-required-${sectionIndex}`}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm">Required</FormLabel>
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeRadioSection(sectionIndex)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                data-testid={`button-remove-section-${sectionIndex}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <RadioGroup 
                              value={section.selectedOptionId || ''}
                              onValueChange={(value) => selectRadioOption(sectionIndex, value)}
                            >
                              {section.options.map((option, optionIndex) => (
                                <div key={option.id || optionIndex} className="flex items-center space-x-3 p-3 border rounded-lg">
                                  <RadioGroupItem 
                                    value={option.id}
                                    id={`radio-${sectionIndex}-${optionIndex}`}
                                    data-testid={`radio-section-${sectionIndex}-option-${optionIndex}`}
                                  />
                                  <div className="flex-1 grid grid-cols-12 gap-3 items-center">
                                    <div className="col-span-4">
                                      <FormField
                                        control={form.control}
                                        name={`radioSections.${sectionIndex}.options.${optionIndex}.name`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <Input 
                                                {...field}
                                                placeholder="Option name"
                                                data-testid={`input-option-name-${sectionIndex}-${optionIndex}`}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    <div className="col-span-4">
                                      <FormField
                                        control={form.control}
                                        name={`radioSections.${sectionIndex}.options.${optionIndex}.description`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <Input 
                                                {...field}
                                                placeholder="Optional description"
                                                className="text-sm"
                                                data-testid={`input-option-description-${sectionIndex}-${optionIndex}`}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    <div className="col-span-3">
                                      <FormField
                                        control={form.control}
                                        name={`radioSections.${sectionIndex}.options.${optionIndex}.price`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <Input 
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                onChange={(e) => {
                                                  const price = parseFloat(e.target.value) || 0;
                                                  const cents = Math.round(price * 100);
                                                  field.onChange(cents);
                                                }}
                                                value={field.value ? (field.value / 100).toFixed(2) : '0.00'}
                                                placeholder="0.00"
                                                data-testid={`input-option-price-${sectionIndex}-${optionIndex}`}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    <div className="col-span-1">
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeRadioOption(sectionIndex, optionIndex)}
                                        disabled={section.options.length === 1}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        data-testid={`button-remove-option-${sectionIndex}-${optionIndex}`}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <Label 
                                    htmlFor={`radio-${sectionIndex}-${optionIndex}`}
                                    className="text-sm font-medium cursor-pointer"
                                  >
                                    ${(option.price / 100).toFixed(2)}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addRadioOption(sectionIndex)}
                              className="w-full"
                              data-testid={`button-add-option-${sectionIndex}`}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Option
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
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
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Line Items Subtotal</span>
                        <span className="font-medium">
                          ${(watchItems.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0) / 100).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Option Selections</span>
                        <span className="font-medium">
                          ${(watchRadioSections.reduce((sum, section) => {
                            if (section.selectedOptionId) {
                              const selectedOption = section.options.find(opt => opt.id === section.selectedOptionId);
                              return sum + (selectedOption?.price || 0);
                            }
                            return sum;
                          }, 0) / 100).toFixed(2)}
                        </span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span className="font-medium">
                          ${((form.watch('subtotal') || 0) / 100).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Tax ({((pricingSettings?.taxRate || 825) / 100).toFixed(2)}%)</span>
                        <span className="font-medium">
                          ${((form.watch('tax') || 0) / 100).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Discount</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.watch('discountTotal') / 100}
                            onChange={(e) => {
                              const discount = Math.round(parseFloat(e.target.value) * 100) || 0;
                              form.setValue('discountTotal', discount);
                            }}
                            className="w-24 h-8 text-right"
                            data-testid="input-discount"
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-primary">
                          ${((form.watch('total') || 0) / 100).toFixed(2)}
                        </span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Deposit Required</span>
                        <span className="font-semibold text-green-600">
                          ${(form.watch('depositAmount') / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Deposit Info */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        {form.watch('depositAmount') === form.watch('total')
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
                    
                    {/* CRITICAL PAYMENT BUTTONS - Added to fix revenue blocker */}
                    {isEditMode && form.watch('status') !== 'DRAFT' && (
                      <div className="mt-4 space-y-2">
                        <div className="text-sm font-medium text-center text-gray-700 dark:text-gray-300 mb-2">
                          💳 Payment Options
                        </div>
                        
                        {/* Pay Deposit Button */}
                        {form.watch('depositAmount') < form.watch('total') && (
                          <Button
                            type="button"
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handlePayment('deposit')}
                            data-testid="button-pay-deposit"
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pay Deposit - ${(form.watch('depositAmount') / 100).toFixed(2)}
                          </Button>
                        )}
                        
                        {/* Pay Full Amount Button */}
                        <Button
                          type="button"
                          variant={form.watch('depositAmount') < form.watch('total') ? 'outline' : 'default'}
                          className={`w-full ${
                            form.watch('depositAmount') < form.watch('total') 
                              ? 'border-blue-500 text-blue-600 hover:bg-blue-50' 
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                          onClick={() => handlePayment('full')}
                          data-testid="button-pay-full"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay Full Amount - ${(form.watch('total') / 100).toFixed(2)}
                        </Button>
                        
                        <p className="text-xs text-center text-muted-foreground">
                          🔒 Secure payment • Instant confirmation • Full refund protection
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
    
    {/* Product Picker Modal */}
    <ProductPicker
      open={showProductPicker}
      onOpenChange={setShowProductPicker}
      onProductSelect={addProductFromCatalog}
      selectedProductIds={getSelectedProductIds()}
    />
    
    {/* Contact Info Modal for Chat Flow */}
    {chatSelections && (
      <ContactInfoModal
        open={showContactInfoModal}
        eventDetails={{
          eventDate: chatSelections.eventDate ? new Date(chatSelections.eventDate) : undefined,
          eventType: chatSelections.eventType || '',
          eventTypeLabel: chatSelections.eventTypeLabel || '',
          eventEmoji: chatSelections.eventEmoji,
          groupSize: chatSelections.groupSize || 20,
          specialRequests: chatSelections.specialRequests,
          budget: chatSelections.budget,
        }}
        selectionDetails={{
          cruiseType: chatSelections.cruiseType,
          selectedSlot: chatSelections.selectedSlot,
          selectedPackages: chatSelections.selectedPackages,
          discoPackage: chatSelections.discoPackage,
          ticketQuantity: chatSelections.discoTicketQuantity,
          selectedDuration: chatSelections.selectedDuration,
          selectedBoat: chatSelections.selectedBoat,
          preferredTimeLabel: chatSelections.preferredTimeLabel,
          groupSizeLabel: chatSelections.groupSizeLabel,
        }}
      />
    )}
    </Layout>
  );
}