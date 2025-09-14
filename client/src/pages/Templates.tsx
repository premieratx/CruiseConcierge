import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, Copy, Eye, EyeOff, Settings, DollarSign, FileText, Palette, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { QuoteTemplate, InsertQuoteTemplate, Product, QuoteItem, RadioSection, RadioOption } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { cn } from "@/lib/utils";

// Enhanced template form schema with radio sections and line items
const templateFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  eventType: z.string().min(1, "Event type is required"),
  minGroupSize: z.number().min(1).optional().or(z.literal('')),
  maxGroupSize: z.number().min(1).optional().or(z.literal('')),
  duration: z.number().min(1, "Duration is required"),
  basePricePerPerson: z.number().min(0).optional().or(z.literal('')),
  active: z.boolean(),
  defaultItems: z.array(z.object({
    type: z.string().default('line_item'),
    name: z.string().min(1, 'Item name required'),
    productId: z.string().optional(),
    unitPrice: z.number().min(0),
    qty: z.number().min(1).default(1),
    clientCanEditQty: z.boolean().default(false),
    groupId: z.string().optional(),
    required: z.boolean().default(false),
    order: z.number().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
  })).default([]),
  defaultRadioSections: z.array(z.object({
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
    allowCustomInput: z.boolean().optional(),
    customInputLabel: z.string().optional(),
    order: z.number().optional(),
  })).default([]),
});

type TemplateFormData = z.infer<typeof templateFormSchema>;

export default function Templates() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<QuoteTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: templates = [], isLoading } = useQuery<QuoteTemplate[]>({
    queryKey: ["/api/quote-templates"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: "",
      description: "",
      eventType: "",
      minGroupSize: "",
      maxGroupSize: "",
      duration: 2,
      basePricePerPerson: "",
      active: true,
      defaultItems: [],
      defaultRadioSections: [],
    },
  });

  // Helper functions for managing template items and radio sections
  const addTemplateItem = () => {
    const currentItems = form.getValues('defaultItems');
    const newItem = {
      type: 'line_item',
      name: '',
      unitPrice: 0,
      qty: 1,
      clientCanEditQty: false,
      required: false,
      order: currentItems.length,
    };
    form.setValue('defaultItems', [...currentItems, newItem]);
  };

  const removeTemplateItem = (index: number) => {
    const currentItems = form.getValues('defaultItems');
    form.setValue('defaultItems', currentItems.filter((_, i) => i !== index));
  };

  const addRadioSection = () => {
    const currentSections = form.getValues('defaultRadioSections');
    const newSection = {
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
    form.setValue('defaultRadioSections', [...currentSections, newSection]);
  };

  const removeRadioSection = (index: number) => {
    const currentSections = form.getValues('defaultRadioSections');
    form.setValue('defaultRadioSections', currentSections.filter((_, i) => i !== index));
  };

  const addRadioOption = (sectionIndex: number) => {
    const currentSections = form.getValues('defaultRadioSections');
    const newOption = {
      id: `option_${Date.now()}`,
      name: 'New Option',
      description: '',
      price: 0,
    };
    currentSections[sectionIndex].options.push(newOption);
    form.setValue('defaultRadioSections', [...currentSections]);
  };

  const removeRadioOption = (sectionIndex: number, optionIndex: number) => {
    const currentSections = form.getValues('defaultRadioSections');
    if (currentSections[sectionIndex].options.length > 1) {
      currentSections[sectionIndex].options.splice(optionIndex, 1);
      form.setValue('defaultRadioSections', [...currentSections]);
    }
  };

  const createMutation = useMutation({
    mutationFn: (data: InsertQuoteTemplate) => apiRequest("POST", "/api/quote-templates", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
      toast({ title: "Template created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({ title: "Failed to create template", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<QuoteTemplate> }) =>
      apiRequest("PUT", `/api/quote-templates/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
      toast({ title: "Template updated successfully" });
      setIsDialogOpen(false);
      setEditingTemplate(null);
      form.reset();
    },
    onError: () => {
      toast({ title: "Failed to update template", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/quote-templates/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
      toast({ title: "Template deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete template", variant: "destructive" });
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: (template: QuoteTemplate) => {
      const { id, createdAt, ...templateData } = template;
      return apiRequest("POST", "/api/quote-templates", {
        ...templateData,
        name: `${template.name} (Copy)`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
      toast({ title: "Template duplicated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to duplicate template", variant: "destructive" });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      apiRequest("PUT", `/api/quote-templates/${id}`, { active }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
      toast({ title: "Template status updated" });
    },
  });

  const handleSubmit = (data: TemplateFormData) => {
    const templateData = {
      ...data,
      minGroupSize: data.minGroupSize === '' ? null : Number(data.minGroupSize),
      maxGroupSize: data.maxGroupSize === '' ? null : Number(data.maxGroupSize),
      basePricePerPerson: data.basePricePerPerson === '' ? null : Math.round(Number(data.basePricePerPerson) * 100),
      defaultItems: data.defaultItems || [],
      defaultRadioSections: data.defaultRadioSections || [],
      visualTheme: editingTemplate?.visualTheme || {},
      displayOrder: editingTemplate?.displayOrder || templates.length,
    };

    if (editingTemplate) {
      updateMutation.mutate({ id: editingTemplate.id, data: templateData });
    } else {
      createMutation.mutate(templateData as InsertQuoteTemplate);
    }
  };

  const openEditDialog = (template: QuoteTemplate) => {
    setEditingTemplate(template);
    form.reset({
      name: template.name,
      description: template.description || "",
      eventType: template.eventType,
      minGroupSize: template.minGroupSize || "",
      maxGroupSize: template.maxGroupSize || "",
      duration: template.duration,
      basePricePerPerson: template.basePricePerPerson ? template.basePricePerPerson / 100 : "",
      active: template.active,
      defaultItems: template.defaultItems || [],
      defaultRadioSections: template.defaultRadioSections || [],
    });
    setIsDialogOpen(true);
  };

  // Watch form values for dynamic updates
  const watchDefaultItems = form.watch('defaultItems');
  const watchDefaultRadioSections = form.watch('defaultRadioSections');

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const eventTypes = [
    { value: "birthday", label: "Birthday Party" },
    { value: "bachelor", label: "Bachelor Party" },
    { value: "bachelorette", label: "Bachelorette Party" },
    { value: "corporate", label: "Corporate Event" },
    { value: "wedding", label: "Wedding" },
    { value: "graduation", label: "Graduation" },
    { value: "other", label: "Other" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Layout>
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Quote Templates</h1>
          <p className="text-muted-foreground mt-1">Manage reusable quote templates for different event types</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingTemplate(null);
            form.reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button data-testid="button-new-template">
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {editingTemplate ? "Edit Template" : "Create Template"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="h-full flex flex-col">
                <Tabs defaultValue="basic" className="flex-1 flex flex-col">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Basic Info
                    </TabsTrigger>
                    <TabsTrigger value="line-items" className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Line Items
                    </TabsTrigger>
                    <TabsTrigger value="options" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Either/Or Options
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Settings
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex-1 overflow-y-auto">
                    {/* Basic Info Tab */}
                    <TabsContent value="basic" className="space-y-6 p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Template Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Birthday Party Package" data-testid="input-template-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="eventType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Type</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-event-type">
                                    <SelectValue placeholder="Select event type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {eventTypes.map(type => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                rows={3}
                                placeholder="Perfect for birthday celebrations with decorations and fun activities"
                                data-testid="textarea-description"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Duration (hours)
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="number" 
                                  min="1"
                                  onChange={e => field.onChange(Number(e.target.value))}
                                  data-testid="input-duration"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="minGroupSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Min Group Size
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="number" 
                                  min="1"
                                  placeholder="Optional"
                                  value={field.value}
                                  onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                                  data-testid="input-min-group"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="maxGroupSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Max Group Size
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="number" 
                                  min="1"
                                  placeholder="Optional"
                                  value={field.value}
                                  onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                                  data-testid="input-max-group"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="basePricePerPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Base Price Per Person</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input 
                                  {...field} 
                                  type="number" 
                                  min="0"
                                  step="0.01"
                                  className="pl-8"
                                  placeholder="0.00"
                                  value={field.value}
                                  onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                                  data-testid="input-base-price"
                                />
                              </div>
                            </FormControl>
                            <FormDescription>Optional additional per-person charge</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    {/* Line Items Tab */}
                    <TabsContent value="line-items" className="space-y-4 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Default Line Items</h3>
                          <p className="text-sm text-muted-foreground">Add standard services and pricing items</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addTemplateItem}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Item
                        </Button>
                      </div>

                      {watchDefaultItems.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No line items yet. Add items to include default services in quotes.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {watchDefaultItems.map((item, index) => (
                            <Card key={index} className="p-4">
                              <div className="grid grid-cols-12 gap-3 items-end">
                                <div className="col-span-4">
                                  <FormField
                                    control={form.control}
                                    name={`defaultItems.${index}.name`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Service Name</FormLabel>
                                        <FormControl>
                                          <Input {...field} placeholder="Service description" />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <div className="col-span-2">
                                  <FormField
                                    control={form.control}
                                    name={`defaultItems.${index}.qty`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Qty</FormLabel>
                                        <FormControl>
                                          <Input {...field} type="number" min="1" />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <div className="col-span-3">
                                  <FormField
                                    control={form.control}
                                    name={`defaultItems.${index}.unitPrice`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Unit Price</FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            onChange={(e) => {
                                              const price = parseFloat(e.target.value) || 0;
                                              field.onChange(Math.round(price * 100));
                                            }}
                                            value={field.value ? (field.value / 100).toFixed(2) : '0.00'}
                                            placeholder="0.00"
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <div className="col-span-2">
                                  <FormLabel>Total</FormLabel>
                                  <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center justify-end">
                                    ${((item.qty * item.unitPrice) / 100).toFixed(2)}
                                  </div>
                                </div>
                                <div className="col-span-1">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeTemplateItem(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    {/* Radio Sections Tab */}
                    <TabsContent value="options" className="space-y-4 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Either/Or Option Groups</h3>
                          <p className="text-sm text-muted-foreground">Create option groups for single-choice selections</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addRadioSection}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Option Group
                        </Button>
                      </div>

                      {watchDefaultRadioSections.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No option groups yet. Add groups for either/or choices like time slots.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {watchDefaultRadioSections.map((section, sectionIndex) => (
                            <Card key={section.id} className="p-4 border-2 border-dashed">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <FormField
                                    control={form.control}
                                    name={`defaultRadioSections.${sectionIndex}.title`}
                                    render={({ field }) => (
                                      <FormItem className="flex-1 mr-4">
                                        <FormLabel>Group Title</FormLabel>
                                        <FormControl>
                                          <Input {...field} placeholder="Time Slot Options" />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeRadioSection(sectionIndex)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>

                                <div className="space-y-2">
                                  {section.options.map((option, optionIndex) => (
                                    <div key={option.id} className="grid grid-cols-12 gap-3 items-center p-3 border rounded">
                                      <div className="col-span-4">
                                        <FormField
                                          control={form.control}
                                          name={`defaultRadioSections.${sectionIndex}.options.${optionIndex}.name`}
                                          render={({ field }) => (
                                            <FormControl>
                                              <Input {...field} placeholder="Option name" />
                                            </FormControl>
                                          )}
                                        />
                                      </div>
                                      <div className="col-span-4">
                                        <FormField
                                          control={form.control}
                                          name={`defaultRadioSections.${sectionIndex}.options.${optionIndex}.description`}
                                          render={({ field }) => (
                                            <FormControl>
                                              <Input {...field} placeholder="Description (optional)" />
                                            </FormControl>
                                          )}
                                        />
                                      </div>
                                      <div className="col-span-3">
                                        <FormField
                                          control={form.control}
                                          name={`defaultRadioSections.${sectionIndex}.options.${optionIndex}.price`}
                                          render={({ field }) => (
                                            <FormControl>
                                              <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                onChange={(e) => {
                                                  const price = parseFloat(e.target.value) || 0;
                                                  field.onChange(Math.round(price * 100));
                                                }}
                                                value={field.value ? (field.value / 100).toFixed(2) : '0.00'}
                                                placeholder="0.00"
                                              />
                                            </FormControl>
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
                                          className="text-red-500 hover:text-red-700"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addRadioOption(sectionIndex)}
                                    className="w-full"
                                  >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Option
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-6 p-4">
                      <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Active Template</FormLabel>
                              <FormDescription>
                                Template is available for use in quote creation
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="switch-active"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </div>

                  {/* Form Actions */}
                  <div className="border-t p-4 flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createMutation.isPending || updateMutation.isPending}
                      data-testid="button-save-template"
                    >
                      {editingTemplate ? "Update" : "Create"} Template
                    </Button>
                  </div>
                </Tabs>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
          data-testid="input-search"
        />
      </div>

      <div className="grid gap-4">
        {filteredTemplates.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No templates found. Create your first template to get started.</p>
          </Card>
        ) : (
          filteredTemplates.map((template) => (
            <Card key={template.id} className="p-6" data-testid={`card-template-${template.id}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{template.name}</h3>
                    <Badge variant={template.active ? "default" : "secondary"}>
                      {template.active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">{template.eventType}</Badge>
                  </div>
                  {template.description && (
                    <p className="text-muted-foreground mb-3">{template.description}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Duration: {template.duration} hours</span>
                    {template.minGroupSize && <span>Min: {template.minGroupSize} people</span>}
                    {template.maxGroupSize && <span>Max: {template.maxGroupSize} people</span>}
                    {template.basePricePerPerson && (
                      <span>Base: ${(template.basePricePerPerson / 100).toFixed(2)}/person</span>
                    )}
                    {template.defaultItems.length > 0 && (
                      <span>{template.defaultItems.length} default items</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleActiveMutation.mutate({ 
                      id: template.id, 
                      active: !template.active 
                    })}
                    data-testid={`button-toggle-${template.id}`}
                  >
                    {template.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => duplicateMutation.mutate(template)}
                    data-testid={`button-duplicate-${template.id}`}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(template)}
                    data-testid={`button-edit-${template.id}`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this template?")) {
                        deleteMutation.mutate(template.id);
                      }
                    }}
                    data-testid={`button-delete-${template.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
    </Layout>
  );
}