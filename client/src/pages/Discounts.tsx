import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, Copy, Tag, Calendar, Users, DollarSign } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { DiscountRule, InsertDiscountRule } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { format } from "date-fns";
import { formatCurrency, formatDate, formatDateTime, formatPercentage } from '@shared/formatters';
import { ACTION_LABELS, VALIDATION_MESSAGES } from '@shared/constants';

const discountFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().optional(),
  discountType: z.enum(["percentage", "fixed_amount", "per_person"]),
  discountValue: z.number().min(0, "Discount value must be positive"),
  minGroupSize: z.number().min(1).optional().or(z.literal('')),
  maxGroupSize: z.number().min(1).optional().or(z.literal('')),
  minSubtotal: z.number().min(0).optional().or(z.literal('')),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
  usageLimit: z.number().min(1).optional().or(z.literal('')),
  active: z.boolean(),
});

type DiscountFormData = z.infer<typeof discountFormSchema>;

export default function Discounts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<DiscountRule | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "active" | "inactive">("all");
  const { toast } = useToast();

  const { data: discounts = [], isLoading } = useQuery<DiscountRule[]>({
    queryKey: ["/api/discount-rules"],
  });

  const form = useForm<DiscountFormData>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
      minGroupSize: "",
      maxGroupSize: "",
      minSubtotal: "",
      validFrom: "",
      validUntil: "",
      usageLimit: "",
      active: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertDiscountRule) => apiRequest("POST", "/api/discount-rules", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/discount-rules"] });
      toast({ title: "Discount created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({ title: "Failed to create discount", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DiscountRule> }) =>
      apiRequest("PUT", `/api/discount-rules/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/discount-rules"] });
      toast({ title: "Discount updated successfully" });
      setIsDialogOpen(false);
      setEditingDiscount(null);
      form.reset();
    },
    onError: () => {
      toast({ title: "Failed to update discount", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/discount-rules/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/discount-rules"] });
      toast({ title: "Discount deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete discount", variant: "destructive" });
    },
  });

  const handleSubmit = (data: DiscountFormData) => {
    const discountData = {
      ...data,
      code: data.code || null,
      minGroupSize: data.minGroupSize === '' ? null : Number(data.minGroupSize),
      maxGroupSize: data.maxGroupSize === '' ? null : Number(data.maxGroupSize),
      minSubtotal: data.minSubtotal === '' ? null : Math.round(Number(data.minSubtotal) * 100),
      validFrom: data.validFrom ? new Date(data.validFrom) : null,
      validUntil: data.validUntil ? new Date(data.validUntil) : null,
      usageLimit: data.usageLimit === '' ? null : Number(data.usageLimit),
      discountValue: data.discountType === "fixed_amount" || data.discountType === "per_person" 
        ? Math.round(data.discountValue * 100) 
        : data.discountValue,
      conditions: [],
    };

    if (editingDiscount) {
      updateMutation.mutate({ id: editingDiscount.id, data: discountData });
    } else {
      createMutation.mutate(discountData as InsertDiscountRule);
    }
  };

  const openEditDialog = (discount: DiscountRule) => {
    setEditingDiscount(discount);
    form.reset({
      name: discount.name,
      code: discount.code || "",
      discountType: discount.discountType as any,
      discountValue: discount.discountType === "percentage" 
        ? discount.discountValue 
        : discount.discountValue / 100,
      minGroupSize: discount.minGroupSize || "",
      maxGroupSize: discount.maxGroupSize || "",
      minSubtotal: discount.minSubtotal ? discount.minSubtotal / 100 : "",
      validFrom: discount.validFrom ? format(discount.validFrom, 'yyyy-MM-dd') : "",
      validUntil: discount.validUntil ? format(discount.validUntil, 'yyyy-MM-dd') : "",
      usageLimit: discount.usageLimit || "",
      active: discount.active,
    });
    setIsDialogOpen(true);
  };

  const filteredDiscounts = discounts.filter(discount => {
    const matchesSearch = discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (discount.code && discount.code.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === "all" || 
      (filterType === "active" && discount.active) ||
      (filterType === "inactive" && !discount.active);
    return matchesSearch && matchesFilter;
  });

  const getDiscountDisplay = (discount: DiscountRule) => {
    switch (discount.discountType) {
      case "percentage":
        return `${discount.discountValue}% OFF`;
      case "fixed_amount":
        return `${formatCurrency(discount.discountValue)} OFF`;
      case "per_person":
        return `${formatCurrency(discount.discountValue)} OFF per person`;
      default:
        return "";
    }
  };

  const isDiscountValid = (discount: DiscountRule) => {
    const now = new Date();
    if (discount.validFrom && discount.validFrom > now) return false;
    if (discount.validUntil && discount.validUntil < now) return false;
    if (discount.usageLimit && discount.usageCount >= discount.usageLimit) return false;
    return discount.active;
  };

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
          <h1 className="text-3xl font-bold">Discount Codes</h1>
          <p className="text-muted-foreground mt-1">Manage promotional codes and automatic discounts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingDiscount(null);
            form.reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button data-testid="button-new-discount">
              <Plus className="h-4 w-4 mr-2" />
              New Discount
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingDiscount ? "Edit Discount" : "Create Discount"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Early Bird Discount" data-testid="input-discount-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Promo Code</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="EARLY10 (optional)" data-testid="input-promo-code" />
                        </FormControl>
                        <FormDescription>Leave empty for automatic discounts</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="discountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-discount-type">
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
                    control={form.control}
                    name="discountValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {form.watch("discountType") === "percentage" ? "Percentage Off" : "Amount Off"}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            {form.watch("discountType") !== "percentage" && (
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            )}
                            <Input
                              {...field}
                              type="number"
                              step={form.watch("discountType") === "percentage" ? "1" : "0.01"}
                              className={form.watch("discountType") !== "percentage" ? "pl-8" : ""}
                              onChange={e => field.onChange(Number(e.target.value))}
                              data-testid="input-discount-value"
                            />
                            {form.watch("discountType") === "percentage" && (
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="minGroupSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Group Size</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
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
                        <FormLabel>Max Group Size</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
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
                  <FormField
                    control={form.control}
                    name="minSubtotal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Order Value</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              className="pl-8"
                              placeholder="Optional"
                              value={field.value}
                              onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                              data-testid="input-min-subtotal"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="validFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valid From</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" data-testid="input-valid-from" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="validUntil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valid Until</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" data-testid="input-valid-until" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="usageLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage Limit</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Unlimited"
                            value={field.value}
                            onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                            data-testid="input-usage-limit"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active</FormLabel>
                        <FormDescription>
                          Discount is available for use
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

                <div className="flex justify-end gap-2">
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
                    data-testid="button-save-discount"
                  >
                    {editingDiscount ? "Update" : "Create"} Discount
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search discounts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
          data-testid="input-search"
        />
        <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
          <SelectTrigger className="w-40" data-testid="select-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Discounts</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="inactive">Inactive Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDiscounts.length === 0 ? (
          <Card className="col-span-full p-12 text-center">
            <p className="text-muted-foreground">No discounts found. Create your first discount to get started.</p>
          </Card>
        ) : (
          filteredDiscounts.map((discount) => {
            const isValid = isDiscountValid(discount);
            return (
              <Card key={discount.id} className={!isValid ? "opacity-60" : ""} data-testid={`card-discount-${discount.id}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{discount.name}</CardTitle>
                      {discount.code && (
                        <div className="flex items-center gap-2 mt-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            {discount.code}
                          </code>
                        </div>
                      )}
                    </div>
                    <Badge variant={isValid ? "default" : "secondary"} className="text-lg px-3 py-1">
                      {getDiscountDisplay(discount)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {discount.minGroupSize && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>Min: {discount.minGroupSize}</span>
                      </div>
                    )}
                    {discount.maxGroupSize && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>Max: {discount.maxGroupSize}</span>
                      </div>
                    )}
                    {discount.minSubtotal && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span>Min: ${(discount.minSubtotal / 100).toFixed(2)}</span>
                      </div>
                    )}
                    {discount.usageLimit && (
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Uses:</span>
                        <span>{discount.usageCount}/{discount.usageLimit}</span>
                      </div>
                    )}
                  </div>

                  {(discount.validFrom || discount.validUntil) && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {discount.validFrom && format(discount.validFrom, 'MMM d, yyyy')}
                        {discount.validFrom && discount.validUntil && ' - '}
                        {discount.validUntil && format(discount.validUntil, 'MMM d, yyyy')}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(discount)}
                      data-testid={`button-edit-${discount.id}`}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this discount?")) {
                          deleteMutation.mutate(discount.id);
                        }
                      }}
                      data-testid={`button-delete-${discount.id}`}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    {discount.code && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(discount.code!);
                          toast({ title: "Code copied to clipboard" });
                        }}
                        data-testid={`button-copy-${discount.id}`}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
    </Layout>
  );
}