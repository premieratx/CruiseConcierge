import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, isSameDay, isSameMonth, isToday, parseISO } from "date-fns";
import Layout from "@/components/Layout";
import AdminNoIndex from "@/components/AdminNoIndex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Percent,
  TrendingUp,
  Tag,
  Clock,
  AlertCircle,
  CheckCircle,
  Settings,
  Zap,
  Target,
  Eye,
  MoreHorizontal,
  Copy,
  RefreshCw,
  BarChart3,
  Gift
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { PricingAdjustment, DiscountRule, PricingSettings, InsertPricingAdjustment } from "@shared/schema";
import { cn } from "@/lib/utils";

// Form schemas
const pricingAdjustmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  scopeType: z.enum(["global", "boat", "product", "category"]),
  scopeId: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  daysOfWeek: z.array(z.number().min(0).max(6)).default([]),
  adjustmentType: z.enum(["amount", "percent", "override"]),
  adjustmentValue: z.number(),
  priority: z.number().min(0).max(100).default(50),
  stackable: z.boolean().default(true),
  active: z.boolean().default(true),
});

const discountRuleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().optional(),
  discountType: z.enum(["percentage", "fixed_amount", "per_person"]),
  discountValue: z.number().min(0),
  minGroupSize: z.number().min(1).optional(),
  maxGroupSize: z.number().optional(),
  minSubtotal: z.number().min(0).optional(),
  validFrom: z.date().optional(),
  validUntil: z.date().optional(),
  usageLimit: z.number().min(1).optional(),
  triggerOn: z.enum(["event", "inquiry", "both"]).default("event"),
  inquiryStartDate: z.date().optional(),
  inquiryEndDate: z.date().optional(),
  autoApply: z.boolean().default(false),
  requiresCode: z.boolean().default(true),
  scopeType: z.enum(["global", "boat", "product", "category"]).default("global"),
  scopeId: z.string().optional(),
  active: z.boolean().default(true),
});

type PricingAdjustmentFormData = z.infer<typeof pricingAdjustmentSchema>;
type DiscountRuleFormData = z.infer<typeof discountRuleSchema>;

// Calendar component for pricing adjustments
const PricingCalendar = ({ 
  currentMonth, 
  onMonthChange, 
  adjustments = [],
  onDateClick 
}: {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  adjustments: PricingAdjustment[];
  onDateClick: (date: Date) => void;
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAdjustmentsForDate = (date: Date) => {
    return adjustments.filter(adj => {
      const adjStart = parseISO(adj.startDate as any);
      const adjEnd = parseISO(adj.endDate as any);
      const dayOfWeek = date.getDay();
      
      return date >= adjStart && 
             date <= adjEnd && 
             adj.active &&
             (adj.daysOfWeek.length === 0 || adj.daysOfWeek.includes(dayOfWeek));
    });
  };

  const getDayColor = (date: Date) => {
    const dayAdjustments = getAdjustmentsForDate(date);
    if (dayAdjustments.length === 0) return "";
    
    const hasIncrease = dayAdjustments.some(adj => 
      (adj.adjustmentType === "percent" && adj.adjustmentValue > 0) ||
      (adj.adjustmentType === "amount" && adj.adjustmentValue > 0)
    );
    const hasDecrease = dayAdjustments.some(adj => 
      (adj.adjustmentType === "percent" && adj.adjustmentValue < 0) ||
      (adj.adjustmentType === "amount" && adj.adjustmentValue < 0)
    );
    
    if (hasIncrease && hasDecrease) return "bg-orange-100 border-orange-300";
    if (hasIncrease) return "bg-red-100 border-red-300";
    if (hasDecrease) return "bg-green-100 border-green-300";
    return "bg-blue-100 border-blue-300";
  };

  return (
    <div className="p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMonthChange(addMonths(currentMonth, -1))}
          data-testid="button-prev-month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <h3 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMonthChange(addMonths(currentMonth, 1))}
          data-testid="button-next-month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const dayAdjustments = getAdjustmentsForDate(day);
          const colorClass = getDayColor(day);
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateClick(day)}
              className={cn(
                "p-2 text-center text-sm border rounded-md hover:bg-gray-50 transition-colors",
                isToday(day) && "ring-2 ring-blue-500",
                !isSameMonth(day, currentMonth) && "text-gray-300",
                colorClass
              )}
              data-testid={`calendar-day-${format(day, "yyyy-MM-dd")}`}
            >
              <div className="font-medium">{format(day, "d")}</div>
              {dayAdjustments.length > 0 && (
                <div className="text-xs mt-1">
                  <div className="w-2 h-2 mx-auto rounded-full bg-current opacity-60" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-100 border border-red-300 rounded" />
          <span>Price Increase</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-100 border border-green-300 rounded" />
          <span>Price Decrease</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-100 border border-orange-300 rounded" />
          <span>Mixed Adjustments</span>
        </div>
      </div>
    </div>
  );
};

// Pricing preview widget
const PricingPreviewWidget = ({ selectedDate }: { selectedDate?: Date }) => {
  const [previewParams, setPreviewParams] = useState({
    groupSize: 25,
    eventDate: selectedDate || new Date(),
    timeSlot: "7:00 PM - 11:00 PM"
  });

  const { data: preview, isLoading } = useQuery({
    queryKey: ["/api/pricing/preview", previewParams],
    queryFn: async () => {
      const response = await fetch("/api/pricing/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupSize: previewParams.groupSize,
          eventDate: previewParams.eventDate.toISOString(),
          timeSlot: previewParams.timeSlot,
          includePricingAdjustments: true
        })
      });
      if (!response.ok) throw new Error("Failed to get pricing preview");
      return response.json();
    },
    enabled: !!previewParams.eventDate
  });

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Pricing Preview
        </CardTitle>
        <CardDescription>
          Test pricing calculations with current adjustments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="preview-group-size">Group Size</Label>
            <Input
              id="preview-group-size"
              type="number"
              value={previewParams.groupSize}
              onChange={(e) => setPreviewParams(prev => ({
                ...prev,
                groupSize: parseInt(e.target.value) || 0
              }))}
              min={1}
              max={150}
              data-testid="input-preview-group-size"
            />
          </div>
          <div>
            <Label htmlFor="preview-date">Event Date</Label>
            <Input
              id="preview-date"
              type="date"
              value={format(previewParams.eventDate, "yyyy-MM-dd")}
              onChange={(e) => setPreviewParams(prev => ({
                ...prev,
                eventDate: new Date(e.target.value)
              }))}
              data-testid="input-preview-date"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            Calculating...
          </div>
        ) : preview ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span>${(preview.subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax & Gratuity:</span>
              <span>${((preview.tax + preview.gratuity) / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total:</span>
              <span>${(preview.total / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Per Person:</span>
              <span>${(preview.perPersonCost / 100).toFixed(2)}</span>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAdjustmentDialogOpen, setIsAdjustmentDialogOpen] = useState(false);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);
  const [editingAdjustment, setEditingAdjustment] = useState<PricingAdjustment | null>(null);
  const [editingPromotion, setEditingPromotion] = useState<DiscountRule | null>(null);
  
  // Filters
  const [adjustmentFilters, setAdjustmentFilters] = useState({
    search: "",
    scopeType: "",
    status: "all" // all, active, inactive
  });
  
  const [promotionFilters, setPromotionFilters] = useState({
    search: "",
    status: "all",
    triggerOn: ""
  });

  const { toast } = useToast();

  // Data queries
  const { data: adjustments = [], isLoading: adjustmentsLoading } = useQuery<PricingAdjustment[]>({
    queryKey: ["/api/pricing/adjustments"],
  });

  const { data: promotions = [], isLoading: promotionsLoading } = useQuery<DiscountRule[]>({
    queryKey: ["/api/discount-rules"],
  });

  const { data: pricingSettings } = useQuery<PricingSettings>({
    queryKey: ["/api/pricing-settings"],
  });

  // Calendar data for current month
  const { data: calendarData } = useQuery({
    queryKey: ["/api/pricing/calendar", format(currentMonth, "yyyy-MM")],
    queryFn: async () => {
      const response = await fetch(`/api/pricing/calendar?month=${format(currentMonth, "yyyy-MM")}`);
      if (!response.ok) throw new Error("Failed to fetch calendar data");
      return response.json();
    }
  });

  // Mutations
  const createAdjustmentMutation = useMutation({
    mutationFn: async (data: PricingAdjustmentFormData) => {
      const response = await apiRequest("POST", "/api/pricing/adjustments", {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pricing/adjustments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pricing/calendar"] });
      setIsAdjustmentDialogOpen(false);
      setEditingAdjustment(null);
      toast({ title: "Success", description: "Pricing adjustment saved successfully" });
    },
  });

  const updateAdjustmentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PricingAdjustmentFormData> }) => {
      const response = await apiRequest("PATCH", `/api/pricing/adjustments/${id}`, {
        ...data,
        ...(data.startDate && { startDate: data.startDate.toISOString() }),
        ...(data.endDate && { endDate: data.endDate.toISOString() }),
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pricing/adjustments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pricing/calendar"] });
      toast({ title: "Success", description: "Pricing adjustment updated successfully" });
    },
  });

  const deleteAdjustmentMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/pricing/adjustments/${id}`);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pricing/adjustments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pricing/calendar"] });
      toast({ title: "Success", description: "Pricing adjustment deleted successfully" });
    },
  });

  const createPromotionMutation = useMutation({
    mutationFn: async (data: DiscountRuleFormData) => {
      const response = await apiRequest("POST", "/api/discount-rules", {
        ...data,
        discountValue: data.discountType === "percentage" 
          ? Math.round(data.discountValue * 100) // Convert to basis points
          : Math.round(data.discountValue * 100), // Convert to cents
        ...(data.validFrom && { validFrom: data.validFrom.toISOString() }),
        ...(data.validUntil && { validUntil: data.validUntil.toISOString() }),
        ...(data.inquiryStartDate && { inquiryStartDate: data.inquiryStartDate.toISOString() }),
        ...(data.inquiryEndDate && { inquiryEndDate: data.inquiryEndDate.toISOString() }),
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/discount-rules"] });
      setIsPromotionDialogOpen(false);
      setEditingPromotion(null);
      toast({ title: "Success", description: "Promotion saved successfully" });
    },
  });

  // Form handlers
  const adjustmentForm = useForm<PricingAdjustmentFormData>({
    resolver: zodResolver(pricingAdjustmentSchema),
    defaultValues: {
      name: "",
      description: "",
      scopeType: "global",
      startDate: selectedDate || new Date(),
      endDate: selectedDate || new Date(),
      daysOfWeek: [],
      adjustmentType: "percent",
      adjustmentValue: 0,
      priority: 50,
      stackable: true,
      active: true,
    },
  });

  const promotionForm = useForm<DiscountRuleFormData>({
    resolver: zodResolver(discountRuleSchema),
    defaultValues: {
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
      triggerOn: "event",
      autoApply: false,
      requiresCode: true,
      scopeType: "global",
      active: true,
    },
  });

  // Filter adjustments
  const filteredAdjustments = useMemo(() => {
    return adjustments.filter(adj => {
      const matchesSearch = !adjustmentFilters.search || 
        adj.name.toLowerCase().includes(adjustmentFilters.search.toLowerCase()) ||
        adj.description?.toLowerCase().includes(adjustmentFilters.search.toLowerCase());
      
      const matchesScope = !adjustmentFilters.scopeType || adj.scopeType === adjustmentFilters.scopeType;
      
      const matchesStatus = adjustmentFilters.status === "all" ||
        (adjustmentFilters.status === "active" && adj.active) ||
        (adjustmentFilters.status === "inactive" && !adj.active);
      
      return matchesSearch && matchesScope && matchesStatus;
    });
  }, [adjustments, adjustmentFilters]);

  // Filter promotions
  const filteredPromotions = useMemo(() => {
    return promotions.filter(promo => {
      const matchesSearch = !promotionFilters.search ||
        promo.name.toLowerCase().includes(promotionFilters.search.toLowerCase()) ||
        promo.code?.toLowerCase().includes(promotionFilters.search.toLowerCase());
      
      const matchesStatus = promotionFilters.status === "all" ||
        (promotionFilters.status === "active" && promo.active) ||
        (promotionFilters.status === "inactive" && !promo.active);
      
      const matchesTrigger = !promotionFilters.triggerOn || promo.triggerOn === promotionFilters.triggerOn;
      
      return matchesSearch && matchesStatus && matchesTrigger;
    });
  }, [promotions, promotionFilters]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    adjustmentForm.setValue("startDate", date);
    adjustmentForm.setValue("endDate", date);
  };

  const handleEditAdjustment = (adjustment: PricingAdjustment) => {
    setEditingAdjustment(adjustment);
    adjustmentForm.reset({
      name: adjustment.name,
      description: adjustment.description || "",
      scopeType: adjustment.scopeType as any,
      scopeId: adjustment.scopeId || "",
      startDate: parseISO(adjustment.startDate as any),
      endDate: parseISO(adjustment.endDate as any),
      daysOfWeek: adjustment.daysOfWeek,
      adjustmentType: adjustment.adjustmentType as any,
      adjustmentValue: adjustment.adjustmentValue,
      priority: adjustment.priority,
      stackable: adjustment.stackable,
      active: adjustment.active,
    });
    setIsAdjustmentDialogOpen(true);
  };

  const onAdjustmentSubmit = (data: PricingAdjustmentFormData) => {
    if (editingAdjustment) {
      updateAdjustmentMutation.mutate({ id: editingAdjustment.id, data });
    } else {
      createAdjustmentMutation.mutate(data);
    }
  };

  const onPromotionSubmit = (data: DiscountRuleFormData) => {
    createPromotionMutation.mutate(data);
  };

  return (
    <Layout>
      <AdminNoIndex />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" data-testid="title-pricing-management">
              Pricing Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage dynamic pricing, adjustments, and promotional campaigns
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setEditingAdjustment(null);
                adjustmentForm.reset();
                setIsAdjustmentDialogOpen(true);
              }}
              data-testid="button-new-adjustment"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Adjustment
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setEditingPromotion(null);
                promotionForm.reset();
                setIsPromotionDialogOpen(true);
              }}
              data-testid="button-new-promotion"
            >
              <Gift className="h-4 w-4 mr-2" />
              New Promotion
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="adjustments" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Adjustments
            </TabsTrigger>
            <TabsTrigger value="promotions" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Promotions
            </TabsTrigger>
          </TabsList>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Calendar</CardTitle>
                    <CardDescription>
                      View and manage pricing adjustments by date. Click on dates to create new adjustments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PricingCalendar
                      currentMonth={currentMonth}
                      onMonthChange={setCurrentMonth}
                      adjustments={adjustments}
                      onDateClick={handleDateClick}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {/* Selected Date Info */}
                {selectedDate && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {format(selectedDate, "MMMM d, yyyy")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {adjustments
                        .filter(adj => {
                          const adjStart = parseISO(adj.startDate as any);
                          const adjEnd = parseISO(adj.endDate as any);
                          return selectedDate >= adjStart && selectedDate <= adjEnd && adj.active;
                        })
                        .map(adj => (
                          <div key={adj.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                            <div>
                              <div className="font-medium text-sm">{adj.name}</div>
                              <div className="text-xs text-gray-500">
                                {adj.adjustmentType === "percent" 
                                  ? `${adj.adjustmentValue > 0 ? "+" : ""}${adj.adjustmentValue}%`
                                  : `${adj.adjustmentValue > 0 ? "+" : ""}$${Math.abs(adj.adjustmentValue / 100)}`
                                }
                              </div>
                            </div>
                            <Badge variant={adj.adjustmentValue > 0 ? "destructive" : "default"}>
                              {adj.adjustmentValue > 0 ? "Increase" : "Decrease"}
                            </Badge>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                )}

                {/* Pricing Preview */}
                <PricingPreviewWidget selectedDate={selectedDate || undefined} />
              </div>
            </div>
          </TabsContent>

          {/* Adjustments Tab */}
          <TabsContent value="adjustments" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search adjustments..."
                      value={adjustmentFilters.search}
                      onChange={(e) => setAdjustmentFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                      data-testid="input-search-adjustments"
                    />
                  </div>
                  
                  <Select 
                    value={adjustmentFilters.scopeType} 
                    onValueChange={(value) => setAdjustmentFilters(prev => ({ ...prev, scopeType: value }))}
                  >
                    <SelectTrigger data-testid="select-scope-filter">
                      <SelectValue placeholder="All Scopes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Scopes</SelectItem>
                      <SelectItem value="global">Global</SelectItem>
                      <SelectItem value="boat">Boat</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select 
                    value={adjustmentFilters.status} 
                    onValueChange={(value) => setAdjustmentFilters(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger data-testid="select-status-filter">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Adjustments Table */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing Adjustments</CardTitle>
                <CardDescription>
                  Manage dynamic pricing adjustments for specific dates, scopes, and conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {adjustmentsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                    Loading adjustments...
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Scope</TableHead>
                        <TableHead>Date Range</TableHead>
                        <TableHead>Adjustment</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAdjustments.map((adjustment) => (
                        <TableRow key={adjustment.id} data-testid={`row-adjustment-${adjustment.id}`}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{adjustment.name}</div>
                              {adjustment.description && (
                                <div className="text-sm text-gray-500">{adjustment.description}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {adjustment.scopeType}
                              {adjustment.scopeId && `: ${adjustment.scopeId}`}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {format(parseISO(adjustment.startDate as any), "MMM d, yyyy")} - {format(parseISO(adjustment.endDate as any), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell>
                            <Badge variant={adjustment.adjustmentValue > 0 ? "destructive" : "default"}>
                              {adjustment.adjustmentType === "percent"
                                ? `${adjustment.adjustmentValue > 0 ? "+" : ""}${adjustment.adjustmentValue}%`
                                : adjustment.adjustmentType === "override"
                                ? `$${(adjustment.adjustmentValue / 100).toFixed(2)}`
                                : `${adjustment.adjustmentValue > 0 ? "+" : ""}$${Math.abs(adjustment.adjustmentValue / 100)}`
                              }
                            </Badge>
                          </TableCell>
                          <TableCell>{adjustment.priority}</TableCell>
                          <TableCell>
                            <Badge variant={adjustment.active ? "default" : "secondary"}>
                              {adjustment.active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditAdjustment(adjustment)}
                                data-testid={`button-edit-adjustment-${adjustment.id}`}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  updateAdjustmentMutation.mutate({
                                    id: adjustment.id,
                                    data: { active: !adjustment.active }
                                  });
                                }}
                                data-testid={`button-toggle-adjustment-${adjustment.id}`}
                              >
                                {adjustment.active ? (
                                  <Eye className="h-4 w-4" />
                                ) : (
                                  <EyeOff className="h-4 w-4" />
                                )}
                              </Button>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    data-testid={`button-delete-adjustment-${adjustment.id}`}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Pricing Adjustment</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{adjustment.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteAdjustmentMutation.mutate(adjustment.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promotions Tab */}
          <TabsContent value="promotions" className="space-y-6">
            {/* Promotion Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search promotions..."
                      value={promotionFilters.search}
                      onChange={(e) => setPromotionFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                      data-testid="input-search-promotions"
                    />
                  </div>
                  
                  <Select 
                    value={promotionFilters.status} 
                    onValueChange={(value) => setPromotionFilters(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select 
                    value={promotionFilters.triggerOn} 
                    onValueChange={(value) => setPromotionFilters(prev => ({ ...prev, triggerOn: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Triggers</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="inquiry">Inquiry</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Promotions Table */}
            <Card>
              <CardHeader>
                <CardTitle>Promotional Campaigns</CardTitle>
                <CardDescription>
                  Manage discount codes, inquiry-window deals, and automated promotions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {promotionsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                    Loading promotions...
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Trigger</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPromotions.map((promotion) => (
                        <TableRow key={promotion.id} data-testid={`row-promotion-${promotion.id}`}>
                          <TableCell>
                            <div className="font-medium">{promotion.name}</div>
                          </TableCell>
                          <TableCell>
                            {promotion.code ? (
                              <Badge variant="outline" className="font-mono">
                                {promotion.code}
                              </Badge>
                            ) : (
                              <span className="text-gray-400">Auto-apply</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge>
                              {promotion.discountType === "percentage"
                                ? `${promotion.discountValue / 100}%`
                                : promotion.discountType === "fixed_amount"
                                ? `$${(promotion.discountValue / 100).toFixed(2)}`
                                : `$${(promotion.discountValue / 100).toFixed(2)}/person`
                              }
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {promotion.triggerOn}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {promotion.usageCount}/{promotion.usageLimit || "∞"}
                          </TableCell>
                          <TableCell>
                            <Badge variant={promotion.active ? "default" : "secondary"}>
                              {promotion.active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Copy className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Promotion</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{promotion.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Pricing Adjustment Dialog */}
        <Dialog open={isAdjustmentDialogOpen} onOpenChange={setIsAdjustmentDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAdjustment ? "Edit Pricing Adjustment" : "New Pricing Adjustment"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...adjustmentForm}>
              <form onSubmit={adjustmentForm.handleSubmit(onAdjustmentSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={adjustmentForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-adjustment-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={adjustmentForm.control}
                    name="scopeType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scope Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-adjustment-scope">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="global">Global</SelectItem>
                            <SelectItem value="boat">Boat</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="category">Category</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={adjustmentForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} data-testid="input-adjustment-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={adjustmentForm.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date *</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                            data-testid="input-adjustment-start-date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={adjustmentForm.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date *</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                            data-testid="input-adjustment-end-date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={adjustmentForm.control}
                    name="adjustmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adjustment Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-adjustment-type">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="percent">Percentage</SelectItem>
                            <SelectItem value="amount">Dollar Amount</SelectItem>
                            <SelectItem value="override">Override Price</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={adjustmentForm.control}
                    name="adjustmentValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Value * 
                          {adjustmentForm.watch("adjustmentType") === "percent" && " (%)"}
                          {adjustmentForm.watch("adjustmentType") !== "percent" && " ($)"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step={adjustmentForm.watch("adjustmentType") === "percent" ? "0.1" : "0.01"}
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            data-testid="input-adjustment-value"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={adjustmentForm.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority (0-100)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-adjustment-priority"
                          />
                        </FormControl>
                        <FormDescription>Higher priority adjustments apply first</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={adjustmentForm.control}
                      name="stackable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Stackable</FormLabel>
                            <FormDescription>Can combine with other adjustments</FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="switch-adjustment-stackable"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={adjustmentForm.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Active</FormLabel>
                            <FormDescription>Enable this adjustment</FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="switch-adjustment-active"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAdjustmentDialogOpen(false)}
                    data-testid="button-cancel-adjustment"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createAdjustmentMutation.isPending || updateAdjustmentMutation.isPending}
                    data-testid="button-save-adjustment"
                  >
                    {createAdjustmentMutation.isPending || updateAdjustmentMutation.isPending ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      editingAdjustment ? "Update" : "Create"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Promotion Dialog */}
        <Dialog open={isPromotionDialogOpen} onOpenChange={setIsPromotionDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPromotion ? "Edit Promotion" : "New Promotion"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...promotionForm}>
              <form onSubmit={promotionForm.handleSubmit(onPromotionSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={promotionForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-promotion-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={promotionForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Promo Code</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Optional" data-testid="input-promotion-code" />
                        </FormControl>
                        <FormDescription>Leave blank for auto-apply promotions</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={promotionForm.control}
                    name="discountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-promotion-type">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage</SelectItem>
                            <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                            <SelectItem value="per_person">Per Person</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={promotionForm.control}
                    name="discountValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Discount Value *
                          {promotionForm.watch("discountType") === "percentage" && " (%)"}
                          {promotionForm.watch("discountType") !== "percentage" && " ($)"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step={promotionForm.watch("discountType") === "percentage" ? "0.1" : "0.01"}
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            data-testid="input-promotion-value"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={promotionForm.control}
                  name="triggerOn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trigger On *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-promotion-trigger">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="event">Event Booking</SelectItem>
                          <SelectItem value="inquiry">Initial Inquiry</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        When this promotion should be offered
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={promotionForm.control}
                    name="autoApply"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Auto Apply</FormLabel>
                          <FormDescription>Apply automatically without requiring a code</FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-promotion-auto-apply"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={promotionForm.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Active</FormLabel>
                          <FormDescription>Enable this promotion</FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-promotion-active"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsPromotionDialogOpen(false)}
                    data-testid="button-cancel-promotion"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createPromotionMutation.isPending}
                    data-testid="button-save-promotion"
                  >
                    {createPromotionMutation.isPending ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      editingPromotion ? "Update" : "Create"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}