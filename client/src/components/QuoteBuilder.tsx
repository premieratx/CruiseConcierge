import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product, QuoteTemplate, Project, Contact, Quote, InsertQuote } from "@shared/schema";
import { 
  Calculator, Gift, DollarSign, Percent, Users, Clock, AlertTriangle, Edit, Wand2,
  Save, FileText, Package, Eye, ChevronRight, Sparkles, Copy, Plus, Trash2,
  Ship, MapPin, Calendar, User, Phone, Mail, CheckCircle
} from "lucide-react";
import { format } from "date-fns";

interface QuoteItem {
  id: string;
  productId: string;
  name: string;
  description?: string;
  unitPrice: number;
  qty: number;
  categoryType?: string;
  productType?: string;
}

interface PricingPreview {
  subtotal: number;
  discountTotal: number;
  tax: number;
  gratuity: number;
  total: number;
  perPersonCost: number;
  depositRequired: boolean;
  depositPercent: number;
  depositAmount: number;
  paymentSchedule?: any[];
  expiresAt?: string;
  urgencyMessage?: string;
}

interface QuoteBuilderProps {
  projectId?: string;
  templateId?: string;
  groupSize?: number;
  onQuoteChange?: (quote: any) => void;
}

export function QuoteBuilder({ projectId, templateId, groupSize = 25, onQuoteChange }: QuoteBuilderProps = {}) {
  // State management
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectId || "");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templateId || "");
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [pricing, setPricing] = useState<PricingPreview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGroupSize, setCurrentGroupSize] = useState<number>(groupSize);
  const [projectDate, setProjectDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("wedding");
  const { toast } = useToast();

  // Fetch data
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: templates = [] } = useQuery<QuoteTemplate[]>({
    queryKey: ["/api/quote-templates"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: ["/api/contacts/clients"],
  });

  // Get selected project and contact details
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const selectedContact = selectedProject ? contacts.find(c => c.id === selectedProject.contactId) : null;
  const defaultTemplate = templates.find(t => t.isDefault) || templates[0];

  // Load template when selected
  useEffect(() => {
    if (selectedTemplateId && templates.length > 0) {
      const template = templates.find(t => t.id === selectedTemplateId);
      if (template && template.defaultItems) {
        try {
          const components = template.defaultItems;
          
          // Convert template components to quote items
          const newItems: QuoteItem[] = components.map((comp: any) => {
            const product = products.find(p => p.id === comp.productId);
            return {
              id: `item_${Date.now()}_${Math.random()}`,
              productId: comp.productId,
              name: product?.name || comp.title || "Unknown Product",
              description: product?.description || undefined,
              unitPrice: product?.unitPrice || comp.unitPrice || 0,
              qty: comp.defaultQty || 1,
              categoryType: product?.categoryType,
              productType: product?.productType,
            };
          });
          
          setItems(newItems);
          setSelectedEventType(template.eventType || "wedding");
        } catch (error) {
          console.error("Failed to parse template components:", error);
        }
      }
    }
  }, [selectedTemplateId, templates, products]);

  // Calculate pricing whenever items change
  useEffect(() => {
    if (items.length > 0) {
      calculatePricing();
    }
  }, [items, appliedPromo, projectDate, currentGroupSize]);

  // Use default template on mount
  useEffect(() => {
    if (!selectedTemplateId && defaultTemplate) {
      setSelectedTemplateId(defaultTemplate.id);
    }
  }, [defaultTemplate, selectedTemplateId]);

  const calculatePricing = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/pricing/preview", {
        items: items.map(item => ({
          unitPrice: item.unitPrice,
          qty: item.qty
        })),
        promoCode: appliedPromo || null,
        projectDate,
        groupSize: currentGroupSize,
      });

      const result = await response.json();
      setPricing(result);
      
      if (onQuoteChange) {
        onQuoteChange({
          items,
          pricing: result,
          projectId: selectedProjectId,
          templateId: selectedTemplateId,
        });
      }
    } catch (error) {
      console.error("Failed to calculate pricing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) return;
    
    setAppliedPromo(promoCode.trim());
    toast({
      title: "Promo Code Applied",
      description: `Applied promo code: ${promoCode}`,
    });
  };

  const removePromoCode = () => {
    setAppliedPromo("");
    setPromoCode("");
    toast({
      title: "Promo Code Removed",
      description: "Promo code has been removed from quote.",
    });
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty < 0) return;
    
    if (newQty === 0) {
      setItems(prev => prev.filter(item => item.id !== itemId));
    } else {
      setItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, qty: newQty } : item
      ));
    }
  };

  const addProduct = (product: Product) => {
    const newItem: QuoteItem = {
      id: `item_${Date.now()}_${Math.random()}`,
      productId: product.id,
      name: product.name,
      description: product.description || undefined,
      unitPrice: product.unitPrice || 0,
      qty: 1,
      categoryType: product.categoryType,
      productType: product.productType,
    };
    
    setItems(prev => [...prev, newItem]);
    toast({
      title: "Product Added",
      description: `${product.name} added to quote`,
    });
  };

  const saveQuote = useMutation({
    mutationFn: async () => {
      if (!selectedProjectId || !pricing) {
        throw new Error("Project and pricing required");
      }

      const quoteData: Partial<InsertQuote> = {
        projectId: selectedProjectId,
        templateId: selectedTemplateId || null,
        status: "DRAFT",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        subtotal: pricing.subtotal,
        discountTotal: pricing.discountTotal,
        tax: pricing.tax,
        gratuity: pricing.gratuity,
        total: pricing.total,
        items: items as any,
        notes: null,
      };

      const response = await apiRequest("POST", "/api/quotes", quoteData);
      return response.json();
    },
    onSuccess: (quote) => {
      toast({
        title: "Quote Saved",
        description: "Quote has been saved successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save quote",
        variant: "destructive",
      });
    },
  });

  const saveAsTemplate = useMutation({
    mutationFn: async () => {
      const templateData = {
        name: newTemplateName,
        description: newTemplateDescription,
        eventType: selectedEventType,
        components: JSON.stringify(items.map(item => ({
          productId: item.productId,
          title: item.name,
          basePrice: item.unitPrice,
          defaultQty: item.qty,
          componentType: item.categoryType || "addon",
        }))),
        minGroupSize: 10,
        maxGroupSize: 150,
        isActive: true,
        isDefault: false,
      };

      const response = await apiRequest("POST", "/api/quote-templates", templateData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Template Saved",
        description: "Quote saved as template successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
      setShowSaveTemplateDialog(false);
      setNewTemplateName("");
      setNewTemplateDescription("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive",
      });
    },
  });

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-8rem)]" data-testid="quote-builder">
      {/* Left Side - Builder (60%) */}
      <div className="flex-[3] overflow-y-auto">
        <Card className="h-full">
          <CardHeader className="sticky top-0 bg-background z-10 border-b">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Quote Builder
            </CardTitle>
            <CardDescription>
              Build and customize quotes with live pricing
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Project Selection */}
            <div className="space-y-2">
              <Label>Project</Label>
              <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                <SelectTrigger data-testid="select-project">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title || "Untitled Project"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Template Selection */}
            <div className="space-y-2">
              <Label>Template</Label>
              <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                <SelectTrigger data-testid="select-template">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center gap-2">
                        {template.name}
                        {template.isDefault && (
                          <Badge variant="secondary" className="text-xs">Default</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Group Size */}
            <div className="space-y-2">
              <Label>Group Size</Label>
              <Input
                type="number"
                value={currentGroupSize}
                onChange={(e) => setCurrentGroupSize(parseInt(e.target.value) || 25)}
                min="1"
                max="150"
                data-testid="input-group-size"
              />
            </div>

            {/* Event Date */}
            <div className="space-y-2">
              <Label>Event Date</Label>
              <Input
                type="date"
                value={projectDate}
                onChange={(e) => setProjectDate(e.target.value)}
                data-testid="input-event-date"
              />
            </div>

            <Separator />

            {/* Quote Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Quote Items</h3>
                <Badge variant="outline">
                  {items.length} item{items.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    data-testid={`quote-item-${item.id}`}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        {item.categoryType && (
                          <Badge variant="outline" className="text-xs">
                            {item.categoryType}
                          </Badge>
                        )}
                        {item.productType && (
                          <Badge variant="secondary" className="text-xs">
                            {item.productType}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.qty - 1)}
                          disabled={item.qty <= 1}
                          className="h-8 w-8 p-0"
                          data-testid={`button-decrease-qty-${item.id}`}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center" data-testid={`text-qty-${item.id}`}>
                          {item.qty}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          className="h-8 w-8 p-0"
                          data-testid={`button-increase-qty-${item.id}`}
                        >
                          +
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold">
                          {formatCurrency(item.unitPrice * item.qty)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(item.unitPrice)} each
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 0)}
                        className="h-8 w-8 p-0 text-destructive"
                        data-testid={`button-remove-item-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Product Section */}
              <div>
                <h4 className="font-medium mb-2">Add Products</h4>
                <Tabs defaultValue="experience" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="experience">Experiences</TabsTrigger>
                    <TabsTrigger value="addon">Add-ons</TabsTrigger>
                  </TabsList>
                  <TabsContent value="experience">
                    <ScrollArea className="h-48 rounded-md border p-2">
                      <div className="space-y-2">
                        {products
                          .filter(p => p.categoryType === "experience")
                          .map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                              onClick={() => addProduct(product)}
                              data-testid={`product-${product.id}`}
                            >
                              <div>
                                <div className="font-medium text-sm">{product.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {formatCurrency(product.unitPrice || 0)}
                                </div>
                              </div>
                              <Plus className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="addon">
                    <ScrollArea className="h-48 rounded-md border p-2">
                      <div className="space-y-2">
                        {products
                          .filter(p => p.categoryType === "addon")
                          .map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                              onClick={() => addProduct(product)}
                              data-testid={`product-${product.id}`}
                            >
                              <div>
                                <div className="font-medium text-sm">{product.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {formatCurrency(product.unitPrice || 0)}
                                </div>
                              </div>
                              <Plus className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <Separator />

            {/* Promo Code */}
            <div className="space-y-2">
              <Label>Promo Code</Label>
              {appliedPromo ? (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="flex-1 justify-center py-2">
                    <Gift className="mr-2 h-4 w-4" />
                    {appliedPromo}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removePromoCode}
                    data-testid="button-remove-promo"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    data-testid="input-promo-code"
                  />
                  <Button
                    onClick={applyPromoCode}
                    disabled={!promoCode.trim()}
                    data-testid="button-apply-promo"
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => saveQuote.mutate()}
                disabled={!selectedProjectId || items.length === 0 || saveQuote.isPending}
                className="flex-1"
                data-testid="button-save-quote"
              >
                <Save className="mr-2 h-4 w-4" />
                {saveQuote.isPending ? "Saving..." : "Save Quote"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSaveTemplateDialog(true)}
                disabled={items.length === 0}
                data-testid="button-save-template"
              >
                <Copy className="mr-2 h-4 w-4" />
                Save as Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Live Preview (40%) */}
      <div className="flex-[2] overflow-y-auto">
        <Card className="h-full">
          <CardHeader className="sticky top-0 bg-background z-10 border-b">
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Live Preview
            </CardTitle>
            <CardDescription>
              Real-time quote visualization
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Customer Info */}
            {selectedProject && selectedContact && (
              <div className="space-y-3">
                <h3 className="font-semibold">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedContact.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedContact.email}</span>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedContact.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Event Details */}
            {selectedProject && (
              <div className="space-y-3">
                <h3 className="font-semibold">Event Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(projectDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{currentGroupSize} guests</span>
                  </div>
                  {selectedProject.eventType && (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{selectedProject.eventType}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Separator />

            {/* Pricing Summary */}
            {pricing && (
              <div className="space-y-3">
                <h3 className="font-semibold">Pricing Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(pricing.subtotal)}</span>
                  </div>
                  {pricing.discountTotal > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatCurrency(pricing.discountTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatCurrency(pricing.tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Gratuity</span>
                    <span>{formatCurrency(pricing.gratuity)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-lg">{formatCurrency(pricing.total)}</span>
                  </div>
                  {currentGroupSize > 0 && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Per Person</span>
                      <span>{formatCurrency(Math.round(pricing.total / currentGroupSize))}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Deposit Information */}
            {pricing && pricing.depositRequired && (
              <Alert>
                <DollarSign className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-semibold mb-1">Deposit Required</div>
                  <div className="text-sm">
                    {pricing.depositPercent}% deposit ({formatCurrency(pricing.depositAmount)}) 
                    required to secure booking
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Urgency Message */}
            {pricing && pricing.urgencyMessage && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {pricing.urgencyMessage}
                </AlertDescription>
              </Alert>
            )}

            {/* Quote Items Summary */}
            <div className="space-y-3">
              <h3 className="font-semibold">Included Services</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>
                        {item.name} {item.qty > 1 && `(x${item.qty})`}
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      {formatCurrency(item.unitPrice * item.qty)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save as Template Dialog */}
      <Dialog open={showSaveTemplateDialog} onOpenChange={setShowSaveTemplateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save as Template</DialogTitle>
            <DialogDescription>
              Save this quote configuration as a reusable template
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="e.g., Premium Wedding Package"
                data-testid="input-template-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-description">Description</Label>
              <Textarea
                id="template-description"
                value={newTemplateDescription}
                onChange={(e) => setNewTemplateDescription(e.target.value)}
                placeholder="Describe what this template includes..."
                data-testid="input-template-description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-event-type">Event Type</Label>
              <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                <SelectTrigger id="template-event-type" data-testid="select-template-event-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="bachelor">Bachelor</SelectItem>
                  <SelectItem value="bachelorette">Bachelorette</SelectItem>
                  <SelectItem value="graduation">Graduation</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveTemplateDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => saveAsTemplate.mutate()}
              disabled={!newTemplateName || saveAsTemplate.isPending}
              data-testid="button-confirm-save-template"
            >
              {saveAsTemplate.isPending ? "Saving..." : "Save Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}