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
import type { Product, QuoteTemplate, Project, Contact, Quote, InsertQuote, NormalizedSlot } from "@shared/schema";
import { useAvailabilityForDate, formatDateForAvailability } from "@/hooks/use-availability";
import { TimeSlotList } from "@/components/TimeSlotList";
import { DurationSelector } from "@/components/DurationSelector";
import { isDurationSelectionRequired, getPrivateTimeSlotsForDate } from "@shared/timeSlots";
import { 
  Calculator, Gift, DollarSign, Percent, Users, Clock, AlertTriangle, Edit, Wand2,
  Save, FileText, Package, Eye, ChevronRight, Sparkles, Copy, Plus, Trash2,
  Ship, MapPin, Calendar, User, Phone, Mail, CheckCircle, Timer, ShoppingCart, ArrowRight
} from "lucide-react";
import { format } from "date-fns";
import { useLocation } from "wouter";

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
  const [selectedSlot, setSelectedSlot] = useState<NormalizedSlot | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<'3-hour' | '4-hour' | null>(null);
  
  // Contact form state - ENHANCED: Show BEFORE quote display instead of after
  const [showContactDialog, setShowContactDialog] = useState(true); // Changed to true - appears first
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false); // Track if contact info is provided
  
  // Check if duration selection is required for the selected date
  const requiresDurationSelection = projectDate ? isDurationSelectionRequired(new Date(projectDate)) : false;
  
  // Fetch available slots for the project date (filtered by duration for Monday-Thursday)
  const { data: availabilityData } = useAvailabilityForDate(
    projectDate,
    undefined, // both private and disco
    currentGroupSize,
    {
      enabled: Boolean(projectDate) && (!requiresDurationSelection || selectedDuration !== null),
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  );
  
  const availableSlots = availabilityData?.slots || [];
  
  // Filter slots by duration for Monday-Thursday bookings
  const filteredSlots = requiresDurationSelection && selectedDuration
    ? availableSlots.filter(slot => {
        const durationHours = selectedDuration === '3-hour' ? 3 : 4;
        return slot.duration === durationHours;
      })
    : availableSlots;
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

  // Handle contact form submission - ENHANCED: Just capture info, don't go to checkout yet
  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.phone) {
      setContactSubmitted(true);
      setShowContactDialog(false);
      toast({
        title: "Contact Info Saved",
        description: "Great! Now let's see what's available for your event.",
      });
    }
  };

  // Group size options for easy selection
  const groupSizeOptions = [14, 25, 30, 50, 75];

  // If contact info not submitted yet, show contact dialog first
  if (!contactSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]" data-testid="quote-builder">
        <Dialog open={showContactDialog} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-[425px]" data-testid="contact-dialog">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Ship className="w-5 h-5 text-blue-600" />
                Let's Get Started!
              </DialogTitle>
              <DialogDescription>
                To show you real-time pricing and availability, we need your contact information. 
                This helps us provide personalized service and saves your quote.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Full Name *</Label>
                <Input
                  id="contact-name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  data-testid="input-contact-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email Address *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  data-testid="input-contact-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone Number *</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                  data-testid="input-contact-phone"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700 font-medium">✨ Why we need this:</p>
                <ul className="text-xs text-blue-600 mt-1 space-y-1">
                  <li>• Show you real-time pricing and availability</li>
                  <li>• Save your quote for easy booking later</li>
                  <li>• Send you the quote via email or SMS</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleContactSubmit}
                disabled={!contactForm.name || !contactForm.email || !contactForm.phone}
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="button-submit-contact"
              >
                Show Me What's Available
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="quote-builder">
      {/* Enhanced Header with Selected Date */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          What's Available for {projectDate ? format(new Date(projectDate), 'EEEE, MMMM d, yyyy') : 'Your Selected Date'}
        </h1>
        <p className="text-blue-100">
          Real-time availability and pricing for your event. 
          Adjust your selections below to see how they affect options and pricing.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4" />
            <span>{contactForm.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4" />
            <span>{currentGroupSize} people</span>
          </div>
        </div>
      </div>

      {/* Group Size Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Group Size
          </CardTitle>
          <CardDescription>
            Select your group size to see appropriate boat options and pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3">
            {groupSizeOptions.map((size) => (
              <Button
                key={size}
                variant={currentGroupSize === size ? "default" : "outline"}
                onClick={() => setCurrentGroupSize(size)}
                className="p-4 h-auto flex flex-col"
                data-testid={`button-group-size-${size}`}
              >
                <span className="text-lg font-bold">{size}</span>
                <span className="text-xs">people</span>
              </Button>
            ))}
          </div>
          <div className="mt-4">
            <Label htmlFor="custom-group-size">Or enter custom group size:</Label>
            <Input
              id="custom-group-size"
              type="number"
              value={currentGroupSize}
              onChange={(e) => setCurrentGroupSize(parseInt(e.target.value) || 25)}
              min="1"
              max="150"
              className="mt-2 max-w-[150px]"
              data-testid="input-custom-group-size"
            />
          </div>
        </CardContent>
      </Card>

      {/* Date Selection with Edit Button */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Event Date
          </CardTitle>
          <CardDescription>
            Change your date to see different availability and pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                type="date"
                value={projectDate}
                onChange={(e) => {
                  setProjectDate(e.target.value);
                  setSelectedSlot(null); // Reset slot when date changes
                }}
                data-testid="input-event-date"
                className="text-lg font-medium"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                // Reset to tomorrow's date as default
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setProjectDate(tomorrow.toISOString().split('T')[0]);
                setSelectedSlot(null);
              }}
              data-testid="button-reset-date"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Available Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="w-5 h-5" />
                Available Options
              </CardTitle>
              <CardDescription>
                Select your preferences to see real-time availability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Duration Selection for Monday-Thursday */}
              {projectDate && requiresDurationSelection && (
                <div className="space-y-2">
                  <DurationSelector
                    selectedDuration={selectedDuration}
                    onDurationChange={(duration) => {
                      setSelectedDuration(duration);
                      setSelectedSlot(null);
                    }}
                    availableDurations={['3-hour', '4-hour']}
                    data-testid="duration-selector"
                  />
                </div>
              )}

              {/* Time Slot Selection */}
              {projectDate && (!requiresDurationSelection || selectedDuration) && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Available Time Slots
                    {requiresDurationSelection && selectedDuration && (
                      <Badge variant="outline" className="text-xs">
                        {selectedDuration.replace('-', ' ')} options
                      </Badge>
                    )}
                  </Label>
                  <div className="rounded-lg border p-4">
                    {filteredSlots.length > 0 ? (
                      <TimeSlotList
                        slots={filteredSlots}
                        selectedSlotId={selectedSlot?.id}
                        onSlotSelect={(slot) => {
                          setSelectedSlot(slot);
                          console.log('Selected slot:', slot);
                        }}
                        groupSize={currentGroupSize}
                        variant="compact"
                        showDate={false}
                        data-testid="timeslot-list"
                      />
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No time slots available for this date.</p>
                        {requiresDurationSelection && selectedDuration && (
                          <p className="text-sm">No {selectedDuration.replace('-', ' ')} slots available. Try the other duration option.</p>
                        )}
                        {!requiresDurationSelection && (
                          <p className="text-sm">Try selecting a different date or group size.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Message when duration selection is required but not selected */}
              {projectDate && requiresDurationSelection && !selectedDuration && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time Slots
                  </Label>
                  <div className="rounded-lg border p-4">
                    <div className="text-center py-6 text-muted-foreground">
                      <Timer className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="font-medium">Choose your cruise duration first</p>
                      <p className="text-sm">Select either 3-hour or 4-hour option above to see available time slots.</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Selected Details & Pricing */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Your Selection
              </CardTitle>
              <CardDescription>
                Selected options and real-time pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Details Summary */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Event Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{contactForm.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{projectDate ? format(new Date(projectDate), 'EEEE, MMMM d, yyyy') : 'Date not selected'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>{currentGroupSize} people</span>
                    </div>
                    {selectedSlot && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>{selectedSlot.label}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Slot Details */}
                {selectedSlot && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Ship className="w-4 h-4" />
                      Selected Time Slot
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">{selectedSlot.startTime} - {selectedSlot.endTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{selectedSlot.duration} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span className="font-medium">Up to {selectedSlot.capacity} people</span>
                      </div>
                      {selectedSlot.estimatedPricing && (
                        <div className="flex justify-between font-semibold text-green-600">
                          <span>Starting Price:</span>
                          <span>{formatCurrency(selectedSlot.estimatedPricing.total)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Pricing Summary */}
                {pricing && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Pricing Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(pricing.subtotal)}</span>
                      </div>
                      {pricing.discountTotal > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount:</span>
                          <span>-{formatCurrency(pricing.discountTotal)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>{formatCurrency(pricing.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gratuity:</span>
                        <span>{formatCurrency(pricing.gratuity)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-green-600">{formatCurrency(pricing.total)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Per Person:</span>
                        <span>{formatCurrency(pricing.perPersonCost)}</span>
                      </div>
                    </div>

                    {/* Deposit Information */}
                    {pricing.depositRequired && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800">
                              Deposit Required
                            </p>
                            <p className="text-xs text-yellow-700">
                              {pricing.depositPercent}% deposit ({formatCurrency(pricing.depositAmount)}) required to secure your booking
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* No Selection Message */}
                {!selectedSlot && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Ship className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <h3 className="font-medium mb-2">Select a Time Slot</h3>
                    <p className="text-sm">Choose from the available options on the left to see detailed pricing and proceed with booking.</p>
                  </div>
                )}

                {/* Proceed to Checkout Button */}
                {selectedSlot && pricing && (
                  <div className="space-y-3">
                    <Separator />
                    <Button 
                      onClick={() => {
                        // Handle checkout process
                        toast({
                          title: "Ready to Book!",
                          description: "Proceeding to secure checkout...",
                        });
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                      data-testid="button-proceed-to-checkout"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Book Now - {formatCurrency(pricing.depositAmount)}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Secure payment • Instant confirmation • Flexible cancellation
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
