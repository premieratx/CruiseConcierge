import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, DollarSign, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Product, InsertProduct, PricingSettings } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  unitPrice: z.number().min(0, "Price must be positive"),
  taxable: z.boolean(),
});

const pricingSettingsSchema = z.object({
  taxRate: z.number().min(0).max(10000),
  defaultGratuityPercent: z.number().min(0).max(100),
  gratuityIncluded: z.boolean(),
  defaultDepositPercent: z.number().min(0).max(100),
  urgencyThresholdDays: z.number().min(0),
  fullPaymentThresholdDays: z.number().min(0),
  priceDisplayMode: z.enum(["total", "per_person", "both"]),
  dayOfWeekMultipliers: z.object({
    monday: z.number().optional(),
    tuesday: z.number().optional(),
    wednesday: z.number().optional(),
    thursday: z.number().optional(),
    friday: z.number().optional(),
    saturday: z.number().optional(),
    sunday: z.number().optional(),
  }),
  seasonalAdjustments: z.array(z.object({
    name: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    multiplier: z.number(),
    description: z.string().optional(),
  })),
});

type ProductFormData = z.infer<typeof productFormSchema>;
type PricingSettingsFormData = z.infer<typeof pricingSettingsSchema>;

export default function Products() {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: pricingSettings, isLoading: settingsLoading } = useQuery<PricingSettings>({
    queryKey: ["/api/pricing-settings"],
  });

  const productForm = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      unitPrice: 0,
      taxable: true,
    },
  });

  const pricingForm = useForm<PricingSettingsFormData>({
    resolver: zodResolver(pricingSettingsSchema),
    values: pricingSettings ? {
      taxRate: pricingSettings.taxRate,
      defaultGratuityPercent: pricingSettings.defaultGratuityPercent,
      gratuityIncluded: pricingSettings.gratuityIncluded,
      defaultDepositPercent: pricingSettings.defaultDepositPercent,
      urgencyThresholdDays: pricingSettings.urgencyThresholdDays,
      fullPaymentThresholdDays: pricingSettings.fullPaymentThresholdDays,
      priceDisplayMode: pricingSettings.priceDisplayMode as "total" | "per_person" | "both",
      dayOfWeekMultipliers: pricingSettings.dayOfWeekMultipliers || {},
      seasonalAdjustments: pricingSettings.seasonalAdjustments || [],
    } : {
      taxRate: 825,
      defaultGratuityPercent: 18,
      gratuityIncluded: false,
      defaultDepositPercent: 25,
      urgencyThresholdDays: 30,
      fullPaymentThresholdDays: 14,
      priceDisplayMode: "both",
      dayOfWeekMultipliers: {},
      seasonalAdjustments: [],
    },
  });

  const createProductMutation = useMutation({
    mutationFn: (data: InsertProduct) => apiRequest("/api/products", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product created successfully" });
      setIsProductDialogOpen(false);
      productForm.reset();
    },
    onError: () => {
      toast({ title: "Failed to create product", variant: "destructive" });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      apiRequest(`/api/products/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product updated successfully" });
      setIsProductDialogOpen(false);
      setEditingProduct(null);
      productForm.reset();
    },
    onError: () => {
      toast({ title: "Failed to update product", variant: "destructive" });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/products/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete product", variant: "destructive" });
    },
  });

  const updatePricingSettingsMutation = useMutation({
    mutationFn: (data: Partial<PricingSettings>) =>
      apiRequest("/api/pricing-settings", "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pricing-settings"] });
      toast({ title: "Pricing settings updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update pricing settings", variant: "destructive" });
    },
  });

  const handleProductSubmit = (data: ProductFormData) => {
    const productData = {
      ...data,
      unitPrice: Math.round(data.unitPrice * 100), // Convert to cents
    };

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data: productData });
    } else {
      createProductMutation.mutate(productData as InsertProduct);
    }
  };

  const handlePricingSubmit = (data: PricingSettingsFormData) => {
    updatePricingSettingsMutation.mutate(data);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    productForm.reset({
      name: product.name,
      unitPrice: product.unitPrice / 100,
      taxable: product.taxable,
    });
    setIsProductDialogOpen(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  if (productsLoading || settingsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products & Pricing</h1>
          <p className="text-muted-foreground mt-1">Manage your products and pricing rules</p>
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="pricing-rules">Pricing Rules</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Adjustments</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
              data-testid="input-search-products"
            />
            <Dialog open={isProductDialogOpen} onOpenChange={(open) => {
              setIsProductDialogOpen(open);
              if (!open) {
                setEditingProduct(null);
                productForm.reset();
              }
            }}>
              <DialogTrigger asChild>
                <Button data-testid="button-new-product">
                  <Plus className="h-4 w-4 mr-2" />
                  New Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingProduct ? "Edit Product" : "Create Product"}</DialogTitle>
                </DialogHeader>
                <Form {...productForm}>
                  <form onSubmit={productForm.handleSubmit(handleProductSubmit)} className="space-y-4">
                    <FormField
                      control={productForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="2-hour Charter" data-testid="input-product-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={productForm.control}
                      name="unitPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input
                                {...field}
                                type="number"
                                step="0.01"
                                className="pl-8"
                                onChange={e => field.onChange(Number(e.target.value))}
                                data-testid="input-product-price"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={productForm.control}
                      name="taxable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Taxable</FormLabel>
                            <FormDescription>
                              Apply tax to this product
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="switch-taxable"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsProductDialogOpen(false)}
                        data-testid="button-cancel"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={createProductMutation.isPending || updateProductMutation.isPending}
                        data-testid="button-save-product"
                      >
                        {editingProduct ? "Update" : "Create"} Product
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} data-testid={`card-product-${product.id}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="text-2xl font-bold mt-2">
                        ${(product.unitPrice / 100).toFixed(2)}
                      </CardDescription>
                    </div>
                    <Badge variant={product.taxable ? "default" : "secondary"}>
                      {product.taxable ? "Taxable" : "Non-taxable"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(product)}
                      data-testid={`button-edit-product-${product.id}`}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this product?")) {
                          deleteProductMutation.mutate(product.id);
                        }
                      }}
                      data-testid={`button-delete-product-${product.id}`}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing-rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Base Pricing Settings</CardTitle>
              <CardDescription>Configure default tax, gratuity, and deposit rules</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...pricingForm}>
                <form onSubmit={pricingForm.handleSubmit(handlePricingSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={pricingForm.control}
                      name="taxRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Rate (%)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              onChange={e => field.onChange(Math.round(Number(e.target.value) * 100))}
                              value={field.value / 100}
                              data-testid="input-tax-rate"
                            />
                          </FormControl>
                          <FormDescription>Enter as percentage (e.g., 8.25)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={pricingForm.control}
                      name="defaultGratuityPercent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Gratuity (%)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={e => field.onChange(Number(e.target.value))}
                              data-testid="input-gratuity"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={pricingForm.control}
                      name="defaultDepositPercent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Deposit (%)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={e => field.onChange(Number(e.target.value))}
                              data-testid="input-deposit"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={pricingForm.control}
                      name="fullPaymentThresholdDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Payment Days</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={e => field.onChange(Number(e.target.value))}
                              data-testid="input-full-payment-days"
                            />
                          </FormControl>
                          <FormDescription>Days before event to require full payment</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Day-of-Week Pricing Multipliers</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {daysOfWeek.map((day) => (
                        <FormField
                          key={day}
                          control={pricingForm.control}
                          name={`dayOfWeekMultipliers.${day as any}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="capitalize">{day}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  step="0.1"
                                  placeholder="1.0"
                                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  value={field.value || ''}
                                  data-testid={`input-multiplier-${day}`}
                                />
                              </FormControl>
                              <FormDescription className="text-xs">1.0 = normal, 1.5 = 50% more</FormDescription>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <Button type="submit" disabled={updatePricingSettingsMutation.isPending} data-testid="button-save-pricing">
                    Save Pricing Settings
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Price Adjustments</CardTitle>
              <CardDescription>Configure pricing for peak seasons and special periods</CardDescription>
            </CardHeader>
            <CardContent>
              {pricingSettings?.seasonalAdjustments && pricingSettings.seasonalAdjustments.length > 0 ? (
                <div className="space-y-4">
                  {pricingSettings.seasonalAdjustments.map((adjustment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{adjustment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {adjustment.startDate} to {adjustment.endDate}
                        </p>
                        {adjustment.description && (
                          <p className="text-sm text-muted-foreground mt-1">{adjustment.description}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {(adjustment.multiplier * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No seasonal adjustments configured</p>
              )}
              <Button className="mt-4" variant="outline" data-testid="button-add-seasonal">
                <Plus className="h-4 w-4 mr-2" />
                Add Seasonal Adjustment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}