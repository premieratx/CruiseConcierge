import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search, Plus, DollarSign, Users, Clock } from 'lucide-react';
import { type Product } from '@shared/schema';

interface ProductPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductSelect: (product: Product) => void;
  selectedProductIds?: string[];
}

export default function ProductPicker({ 
  open, 
  onOpenChange, 
  onProductSelect,
  selectedProductIds = [] 
}: ProductPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fetch products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product: Product) => 
        product.productType === selectedCategory
      );
    }

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((product: Product) => 
        product.name.toLowerCase().includes(search) ||
        (product.description?.toLowerCase() || '').includes(search) ||
        (product.eventTypes || []).some(type => 
          type.toLowerCase().includes(search)
        )
      );
    }

    return filtered.filter((product: Product) => product.active);
  }, [products, searchTerm, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((product: Product) => {
      if (product.productType) cats.add(product.productType);
    });
    return Array.from(cats);
  }, [products]);

  const handleProductSelect = (product: Product) => {
    onProductSelect(product);
    onOpenChange(false);
  };

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };

  const getPricingLabel = (product: Product) => {
    switch (product.pricingModel) {
      case 'hourly':
        return 'per hour';
      case 'per_person':
        return 'per person';
      case 'flat_rate':
        return 'flat rate';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Product to Quote
          </DialogTitle>
          <DialogDescription>
            Select products from your catalog to add to the quote. Prices and quantities will be editable after adding.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name, description, or event type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-product-search"
              />
            </div>
            <div className="min-w-[200px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
                data-testid="select-product-category"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <ScrollArea className="h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Loading products...</p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 
                    'Try adjusting your search terms or category filter.' :
                    'No products are available in the selected category.'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                {filteredProducts.map((product: Product) => {
                  const isSelected = selectedProductIds.includes(product.id);
                  
                  return (
                    <Card 
                      key={product.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        isSelected ? 'ring-2 ring-primary/50 bg-primary/5' : ''
                      }`}
                      onClick={() => handleProductSelect(product)}
                      data-testid={`card-product-${product.id}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {product.description || 'No description available'}
                            </CardDescription>
                          </div>
                          <Badge 
                            variant={product.productType === 'private_cruise' ? 'default' : 'secondary'}
                            className="ml-2"
                          >
                            {product.productType?.replace(/_/g, ' ') || 'Standard'}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {/* Pricing */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-lg font-semibold">
                              <DollarSign className="w-4 h-4" />
                              {formatPrice(product.unitPrice)}
                              <span className="text-sm text-muted-foreground font-normal">
                                {getPricingLabel(product)}
                              </span>
                            </div>
                            {product.taxable && (
                              <Badge variant="outline" className="text-xs">
                                Taxable
                              </Badge>
                            )}
                          </div>

                          {/* Event Types */}
                          {product.eventTypes && product.eventTypes.length > 0 && (
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Suitable for:</p>
                              <div className="flex flex-wrap gap-1">
                                {product.eventTypes.map(eventType => (
                                  <Badge 
                                    key={eventType} 
                                    variant="outline" 
                                    className="text-xs"
                                  >
                                    {eventType.replace(/_/g, ' ')}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <Separator />

                          {/* Action */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="capitalize">{product.pricingModel?.replace(/_/g, ' ')}</span>
                            </div>
                            <Button 
                              size="sm" 
                              disabled={isSelected}
                              data-testid={`button-select-product-${product.id}`}
                            >
                              {isSelected ? 'Already Added' : 'Add to Quote'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}