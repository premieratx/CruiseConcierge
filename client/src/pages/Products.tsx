import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, DollarSign, Calendar, Clock, Users, Sparkles, Ship, Package, Tag, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Product, InsertProduct, PricingSettings } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  unitPrice: z.number().min(0, "Price must be positive"),
  taxable: z.boolean(),
  pricingModel: z.enum(["per_person", "hourly"]),
  productType: z.enum(["disco_cruise", "private_cruise"]),
  categoryType: z.enum(["experience", "addon"]),
  eventTypes: z.array(z.string()).min(1, "At least one event type required"),
  active: z.boolean(),
  imageUrl: z.string().optional(),
  dayType: z.enum(["weekday", "weekend", "any"]).optional(),
  groupSize: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }).optional(),
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

// Product Card Component with Photo Background
const ProductCard = ({ product, onEdit, onDelete }: { 
  product: Product; 
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}) => {
  const formatCurrency = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  
  // Generate gradient background based on product type if no image
  const getGradientBackground = () => {
    if (product.categoryType === "experience") {
      return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    } else {
      return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
    }
  };
  
  const productGroupSize = typeof product.groupSize === 'object' && product.groupSize
    ? product.groupSize as { min?: number; max?: number }
    : { min: 1, max: 150 };

  return (
    <div 
      className="relative group overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      style={{
        backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : undefined,
        background: !product.imageUrl ? getGradientBackground() : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '320px',
      }}
      data-testid={`product-card-${product.id}`}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge 
          variant={product.categoryType === "experience" ? "default" : "secondary"}
          className={`${product.categoryType === "experience" ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} text-white border-none`}
        >
          {product.categoryType === "experience" ? (
            <>
              <Sparkles className="mr-1 h-3 w-3" />
              Experience
            </>
          ) : (
            <>
              <Package className="mr-1 h-3 w-3" />
              Add-on
            </>
          )}
        </Badge>
      </div>

      {/* Product Type Badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
          <Ship className="mr-1 h-3 w-3" />
          {product.productType === "private_cruise" ? "Private Cruise" : "Shared Cruise"}
        </Badge>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-gray-200 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Pricing Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <span className="text-2xl font-bold">
              {formatCurrency(product.unitPrice || 0)}
            </span>
            <span className="text-sm text-gray-300">
              /{product.pricingModel === "per_person" ? "person" : "hour"}
            </span>
          </div>
          
          {productGroupSize && (
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4" />
              <span>
                {productGroupSize.min || 1}-{productGroupSize.max || 150} guests
              </span>
            </div>
          )}
        </div>
        
        {/* Day Type */}
        {product.dayType && product.dayType !== "any" && (
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4" />
            <span className="text-sm capitalize">
              {product.dayType === "weekday" ? "Weekdays only" : "Weekends only"}
            </span>
          </div>
        )}

        {/* Action Buttons - Hidden by default, shown on hover */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(product);
            }}
            className="flex-1"
            data-testid={`button-edit-product-${product.id}`}
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(product.id);
            }}
            data-testid={`button-delete-product-${product.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Status indicator */}
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
          {product.active && (
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};

export default function Products() {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | "experience" | "addon">("all");
  const [filterType, setFilterType] = useState<"all" | "private_cruise" | "disco_cruise">("all");
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
      description: "",
      unitPrice: 0,
      taxable: true,
      pricingModel: "hourly",
      productType: "private_cruise",
      categoryType: "experience",
      eventTypes: [],
      active: true,
      imageUrl: "",
      dayType: "any",
      groupSize: {
        min: 1,
        max: 150,
      },
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
    mutationFn: (data: InsertProduct) => apiRequest("POST", "/api/products", data),
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
      apiRequest("PUT", `/api/products/${id}`, data),
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
    mutationFn: (id: string) => apiRequest("DELETE", `/api/products/${id}`),
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
      apiRequest("PUT", "/api/pricing-settings", data),
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
      groupSize: typeof data.groupSize === 'object' ? data.groupSize.min || 1 : data.groupSize || 1, // Convert to number
    };

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data: productData });
    } else {
      createProductMutation.mutate(productData as InsertProduct);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    productForm.reset({
      name: product.name,
      description: product.description || "",
      unitPrice: (product.unitPrice || 0) / 100,
      taxable: product.taxable ?? true,
      pricingModel: product.pricingModel || "hourly",
      productType: product.productType as "disco_cruise" | "private_cruise" || "private_cruise",
      categoryType: product.categoryType as "experience" | "addon" || "experience",
      eventTypes: product.eventTypes || [],
      active: product.active ?? true,
      imageUrl: product.imageUrl || "",
      dayType: product.dayType as "weekday" | "weekend" | "any" || "any",
      groupSize: typeof product.groupSize === 'object' && product.groupSize
        ? product.groupSize as { min?: number; max?: number }
        : { min: 1, max: 150 },
    });
    setIsProductDialogOpen(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.categoryType === filterCategory;
    const matchesType = filterType === "all" || product.productType === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const experienceProducts = filteredProducts.filter(p => p.categoryType === "experience");
  const addonProducts = filteredProducts.filter(p => p.categoryType === "addon");

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products & Services</h1>
            <p className="text-muted-foreground">
              Manage your cruise experiences and add-on services
            </p>
          </div>
          <Button 
            onClick={() => {
              setEditingProduct(null);
              productForm.reset();
              setIsProductDialogOpen(true);
            }}
            data-testid="button-new-product"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Product
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                  data-testid="input-search-products"
                />
              </div>
              <Select value={filterCategory} onValueChange={(value: any) => setFilterCategory(value)}>
                <SelectTrigger className="w-[180px]" data-testid="select-filter-category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="experience">Experiences</SelectItem>
                  <SelectItem value="addon">Add-ons</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                <SelectTrigger className="w-[180px]" data-testid="select-filter-type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="private_cruise">Private Cruise</SelectItem>
                  <SelectItem value="disco_cruise">Shared Cruise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              All Products ({filteredProducts.length})
            </TabsTrigger>
            <TabsTrigger value="experiences">
              <Sparkles className="mr-2 h-4 w-4" />
              Experiences ({experienceProducts.length})
            </TabsTrigger>
            <TabsTrigger value="addons">
              <Package className="mr-2 h-4 w-4" />
              Add-ons ({addonProducts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={(id) => deleteProductMutation.mutate(id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experiences">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {experienceProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={(id) => deleteProductMutation.mutate(id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="addons">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {addonProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={(id) => deleteProductMutation.mutate(id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Pricing Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Settings</CardTitle>
            <CardDescription>
              Configure global pricing rules and adjustments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...pricingForm}>
              <form onSubmit={pricingForm.handleSubmit((data) => updatePricingSettingsMutation.mutate(data))}>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={pricingForm.control}
                    name="taxRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Rate (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) * 100)}
                            value={field.value / 100}
                            data-testid="input-tax-rate"
                          />
                        </FormControl>
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
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            data-testid="input-gratuity-percent"
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
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            data-testid="input-deposit-percent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={pricingForm.control}
                    name="priceDisplayMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Display Mode</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-price-display-mode">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="total">Total Only</SelectItem>
                            <SelectItem value="per_person">Per Person Only</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-4">
                  <Button type="submit" data-testid="button-save-pricing-settings">
                    Save Pricing Settings
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Product Dialog */}
        <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Create New Product"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...productForm}>
              <form onSubmit={productForm.handleSubmit(handleProductSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={productForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-product-name" />
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
                        <FormLabel>Base Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            data-testid="input-unit-price"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={productForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Describe this product or service..."
                          data-testid="input-product-description" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={productForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="https://example.com/image.jpg"
                          data-testid="input-image-url" 
                        />
                      </FormControl>
                      <FormDescription>
                        Add a photo to make this product more appealing
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={productForm.control}
                    name="categoryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category-type">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="experience">Experience</SelectItem>
                            <SelectItem value="addon">Add-on</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={productForm.control}
                    name="productType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-product-type">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="private_cruise">Private Cruise</SelectItem>
                            <SelectItem value="disco_cruise">Shared Cruise</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={productForm.control}
                    name="pricingModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pricing Model</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-pricing-model">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="per_person">Per Person</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={productForm.control}
                    name="dayType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Day Availability</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-day-type">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="any">Any Day</SelectItem>
                            <SelectItem value="weekday">Weekdays Only</SelectItem>
                            <SelectItem value="weekend">Weekends Only</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={productForm.control}
                  name="eventTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Applicable Event Types</FormLabel>
                      <div className="grid grid-cols-3 gap-2">
                        {["wedding", "corporate", "birthday", "bachelor", "bachelorette", "other"].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value?.includes(type)}
                              onCheckedChange={(checked) => {
                                const updated = checked
                                  ? [...(field.value || []), type]
                                  : field.value?.filter((t) => t !== type) || [];
                                field.onChange(updated);
                              }}
                              data-testid={`checkbox-event-type-${type}`}
                            />
                            <Label className="capitalize">{type}</Label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center gap-4">
                  <FormField
                    control={productForm.control}
                    name="taxable"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-taxable"
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">Taxable</FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={productForm.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-active"
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">Active</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-save-product">
                    {editingProduct ? "Update" : "Create"} Product
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