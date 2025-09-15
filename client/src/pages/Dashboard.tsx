import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CRMPipeline } from "@/components/CRMPipeline";
import { Analytics } from "@/components/Analytics";
import { IntegrationStatus } from "@/components/IntegrationStatus";
import CalendarView from "@/components/CalendarView";
import Navigation from "@/components/Navigation";
import { RecentQuotes } from "@/components/RecentQuotes";
import { RecentInvoices } from "@/components/RecentInvoices";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import logoPath from "@assets/PPC Logo LARGE_1757881944449.png";
import { 
  Plus, TrendingUp, Calendar, LayoutDashboard, FileText, 
  MessageCircle, Package, DollarSign, Tag, Info, Save,
  ShoppingBag, Anchor, Ship, CreditCard, Users, BarChart3
} from "lucide-react";
import type { Product, InsertProduct } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    unitPrice: "",
    pricingModel: "flat_rate" as "hourly" | "per_person" | "flat_rate",
    productType: "addon" as "private_cruise" | "disco_cruise" | "addon",
    taxable: true,
    active: true
  });

  // Fetch existing products
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/products");
      return response.json();
    }
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: async (productData: Partial<InsertProduct>) => {
      const response = await apiRequest("POST", "/api/products", productData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Product Created! 🎉",
        description: "Your new product has been added successfully.",
      });
      setProductModalOpen(false);
      setProductForm({
        name: "",
        description: "",
        unitPrice: "",
        pricingModel: "flat_rate",
        productType: "addon",
        taxable: true,
        active: true
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleCreateProduct = () => {
    if (!productForm.name || !productForm.unitPrice) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const priceInCents = Math.round(parseFloat(productForm.unitPrice) * 100);
    
    createProductMutation.mutate({
      name: productForm.name,
      description: productForm.description || undefined,
      unitPrice: priceInCents,
      pricingModel: productForm.pricingModel,
      productType: productForm.productType,
      taxable: productForm.taxable,
      active: productForm.active
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-marine-50 via-background to-marine-100">
      {/* Navigation Header */}
      <Navigation />

      {/* Company Branding Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img 
              src={logoPath} 
              alt="Premier Party Cruises" 
              className="h-16 w-auto object-contain"
              data-testid="img-dashboard-logo"
            />
            <div>
              <h1 className="text-2xl font-heading font-bold text-primary">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your cruise business</p>
            </div>
          </div>
          <Button 
            onClick={() => setProductModalOpen(true)}
            className="bg-primary hover:bg-primary/90"
            data-testid="button-create-product"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Product
          </Button>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="container mx-auto px-4 pb-4">
        <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-border">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              data-testid="button-quick-new-lead"
              onClick={() => setLocation("/leads?action=new")}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Lead
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              data-testid="button-quick-create-quote"
              onClick={() => setLocation("/quotes/new")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Create Quote
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              data-testid="button-quick-chat"
              onClick={() => setLocation("/chat")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat Assistant
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              data-testid="button-quick-pipeline"
              onClick={() => setLocation("/leads")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Pipeline
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start bg-primary/10 hover:bg-primary/20 border-primary/20" 
              data-testid="button-quick-new-product"
              onClick={() => setProductModalOpen(true)}
            >
              <Package className="mr-2 h-4 w-4 text-primary" />
              <span className="text-primary">New Product</span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              data-testid="button-quick-manage-products"
              onClick={() => setLocation("/products")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Manage Products
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2" data-testid="tab-overview">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2" data-testid="tab-quotes">
              <FileText className="h-4 w-4" />
              Quotes
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2" data-testid="tab-products">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2" data-testid="tab-calendar">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Analytics & Pipeline */}
              <Analytics />
              <CRMPipeline />
              
              {/* Recent Quotes and Invoices */}
              <RecentQuotes />
              <RecentInvoices />
              
              {/* Customer Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Customer Overview
                  </CardTitle>
                  <CardDescription>
                    Your customer base at a glance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-primary">152</p>
                      <p className="text-xs text-muted-foreground">Total Customers</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">23</p>
                      <p className="text-xs text-muted-foreground">Active This Month</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">8</p>
                      <p className="text-xs text-muted-foreground">New This Week</p>
                    </div>
                  </div>
                  <Button variant="link" className="w-full mt-4" onClick={() => setLocation("/leads")}>
                    View All Customers →
                  </Button>
                </CardContent>
              </Card>
              
              {/* Product Performance Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Top Products
                  </CardTitle>
                  <CardDescription>
                    Most quoted products this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Private Cruise - Ultimate Package", quotes: 18, revenue: 45000 },
                      { name: "ATX Disco Cruise - Basic", quotes: 14, revenue: 11900 },
                      { name: "Bar Package Premium", quotes: 12, revenue: 3600 },
                      { name: "Photography Service", quotes: 8, revenue: 4000 },
                    ].map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.quotes} quotes</p>
                        </div>
                        <p className="text-sm font-semibold text-primary">
                          ${(product.revenue / 100).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="w-full mt-4" onClick={() => setLocation("/products")}>
                    View All Products →
                  </Button>
                </CardContent>
              </Card>
              
              {/* Integration Status - Full Width */}
              <div className="lg:col-span-2">
                <IntegrationStatus />
              </div>
            </div>
          </TabsContent>

          {/* Quotes Tab */}
          <TabsContent value="quotes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentQuotes />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Quote Templates
                  </CardTitle>
                  <CardDescription>
                    Most used templates this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Bachelor Party Standard", uses: 24 },
                      { name: "Corporate Event Premium", uses: 18 },
                      { name: "Wedding Reception Deluxe", uses: 15 },
                      { name: "Birthday Celebration", uses: 12 },
                    ].map((template, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                          <p className="text-sm font-medium">{template.name}</p>
                          <p className="text-xs text-muted-foreground">Used {template.uses} times</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => setLocation("/templates")}>
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="w-full mt-4" onClick={() => setLocation("/templates")}>
                    Manage All Templates →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Products & Add-ons
                </CardTitle>
                <CardDescription>
                  Manage your cruise packages and add-on services
                </CardDescription>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Loading products...
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8">
                    <Ship className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground mb-4">No products created yet</p>
                    <Button 
                      onClick={() => setProductModalOpen(true)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Product
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {products.map((product: Product) => (
                      <div 
                        key={product.id} 
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        data-testid={`product-card-${product.id}`}
                      >
                        <div className="flex-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <div className="flex gap-4 mt-2">
                            <span className="text-sm text-primary font-medium">
                              ${(product.unitPrice / 100).toFixed(2)}
                            </span>
                            <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                              {product.pricingModel}
                            </span>
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                              {product.productType}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {product.active ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                          ) : (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Inactive</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <CalendarView />
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Creation Modal */}
      <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
        <DialogContent className="max-w-md w-full" data-testid="product-modal">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <Package className="w-5 h-5" />
              Create New Product
            </DialogTitle>
            <DialogDescription>
              Add a new cruise package or add-on service to your offerings
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <Label htmlFor="product-name">Product Name *</Label>
              <Input
                id="product-name"
                type="text"
                placeholder="e.g., Premium Bar Package"
                value={productForm.name}
                onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                data-testid="input-product-name"
              />
            </div>
            
            {/* Description */}
            <div>
              <Label htmlFor="product-description">Description</Label>
              <Textarea
                id="product-description"
                placeholder="Describe what's included in this product..."
                value={productForm.description}
                onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                className="h-20 resize-none"
                data-testid="textarea-product-description"
              />
            </div>
            
            {/* Price */}
            <div>
              <Label htmlFor="product-price">Price (USD) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-10"
                  value={productForm.unitPrice}
                  onChange={(e) => setProductForm(prev => ({ ...prev, unitPrice: e.target.value }))}
                  data-testid="input-product-price"
                />
              </div>
            </div>
            
            {/* Pricing Model */}
            <div>
              <Label htmlFor="pricing-model">Pricing Model</Label>
              <Select 
                value={productForm.pricingModel} 
                onValueChange={(value: "hourly" | "per_person" | "flat_rate") => 
                  setProductForm(prev => ({ ...prev, pricingModel: value }))
                }
              >
                <SelectTrigger id="pricing-model" data-testid="select-pricing-model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat_rate">Flat Rate</SelectItem>
                  <SelectItem value="per_person">Per Person</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Product Type */}
            <div>
              <Label htmlFor="product-type">Product Type</Label>
              <Select 
                value={productForm.productType} 
                onValueChange={(value: "private_cruise" | "disco_cruise" | "addon") => 
                  setProductForm(prev => ({ ...prev, productType: value }))
                }
              >
                <SelectTrigger id="product-type" data-testid="select-product-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="addon">Add-on Service</SelectItem>
                  <SelectItem value="private_cruise">Private Cruise</SelectItem>
                  <SelectItem value="disco_cruise">Disco Cruise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setProductModalOpen(false)}
                data-testid="button-cancel-product"
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={handleCreateProduct}
                disabled={createProductMutation.isPending}
                data-testid="button-save-product"
              >
                {createProductMutation.isPending ? (
                  "Creating..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Product
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}