import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Gift, DollarSign, Percent } from "lucide-react";

interface QuoteItem {
  id: string;
  name: string;
  unitPrice: number;
  qty: number;
}

interface PricingPreview {
  subtotal: number;
  discountTotal: number;
  tax: number;
  total: number;
  depositRequired: boolean;
  depositPercent: number;
  depositAmount: number;
}

export function QuoteBuilder() {
  const [items, setItems] = useState<QuoteItem[]>([
    { id: "prod_charter_2hr", name: "2-hour Charter", unitPrice: 60000, qty: 1 },
    { id: "prod_cooler_ice", name: "Cooler + Ice", unitPrice: 1500, qty: 1 },
    { id: "prod_pod_kit", name: "POD Pre-stock Kit", unitPrice: 9500, qty: 1 }
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [pricing, setPricing] = useState<PricingPreview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [projectDate] = useState(new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const { toast } = useToast();

  useEffect(() => {
    calculatePricing();
  }, [items, appliedPromo, projectDate]);

  const calculatePricing = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/pricing/preview", {
        items: items.map(item => ({
          unitPrice: item.unitPrice,
          qty: item.qty
        })),
        promoCode: appliedPromo || null,
        projectDate
      });

      const result = await response.json();
      setPricing(result);
    } catch (error) {
      console.error("Failed to calculate pricing:", error);
      toast({
        title: "Error",
        description: "Failed to calculate pricing. Please try again.",
        variant: "destructive",
      });
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
    
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, qty: newQty } : item
    ));
  };

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  if (isLoading && !pricing) {
    return (
      <Card className="boat-shadow" data-testid="quote-builder-loading">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          <span className="ml-2 text-sm text-muted-foreground">Calculating quote...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="boat-shadow" data-testid="quote-builder">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-lg font-heading flex items-center space-x-2">
          <Calculator className="w-5 h-5" />
          <span data-testid="text-quote-builder-title">Dynamic Quote Builder</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground" data-testid="text-quote-builder-subtitle">
          AI-generated pricing
        </p>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Selected Services */}
        <div>
          <h4 className="font-medium mb-2 text-sm flex items-center space-x-1">
            <DollarSign className="w-4 h-4" />
            <span>Selected Services</span>
          </h4>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-2 bg-muted rounded text-sm"
                data-testid={`quote-item-${item.id}`}
              >
                <div className="flex-1">
                  <span data-testid={`text-item-name-${item.id}`}>{item.name}</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="h-6 w-6 p-0"
                      data-testid={`button-decrease-qty-${item.id}`}
                    >
                      -
                    </Button>
                    <span className="text-xs w-8 text-center" data-testid={`text-qty-${item.id}`}>
                      {item.qty}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                      className="h-6 w-6 p-0"
                      data-testid={`button-increase-qty-${item.id}`}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <span className="font-medium" data-testid={`text-item-total-${item.id}`}>
                  {formatCurrency(item.unitPrice * item.qty)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <Label className="text-xs font-medium mb-1 flex items-center space-x-1">
            <Gift className="w-3 h-3" />
            <span>Promo Code</span>
          </Label>
          {appliedPromo ? (
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="flex-1 justify-center">
                {appliedPromo}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={removePromoCode}
                className="text-xs"
                data-testid="button-remove-promo"
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 text-sm"
                data-testid="input-promo-code"
              />
              <Button
                onClick={applyPromoCode}
                size="sm"
                variant="secondary"
                className="text-sm"
                data-testid="button-apply-promo"
              >
                Apply
              </Button>
            </div>
          )}
        </div>

        {/* Totals */}
        {pricing && (
          <div className="border-t border-border pt-4">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span data-testid="text-subtotal-label">Subtotal</span>
                <span data-testid="text-subtotal-amount">{formatCurrency(pricing.subtotal)}</span>
              </div>
              
              {pricing.discountTotal > 0 && (
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center space-x-1">
                    <Percent className="w-3 h-3" />
                    <span data-testid="text-discount-label">Discount</span>
                  </span>
                  <span data-testid="text-discount-amount">-{formatCurrency(pricing.discountTotal)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span data-testid="text-tax-label">Tax</span>
                <span data-testid="text-tax-amount">{formatCurrency(pricing.tax)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
                <span data-testid="text-total-label">Total</span>
                <span className="text-primary" data-testid="text-total-amount">
                  {formatCurrency(pricing.total)}
                </span>
              </div>
            </div>

            {/* Deposit Info */}
            {pricing.depositRequired && (
              <div className="mt-3 p-3 bg-austin-500/10 rounded-lg">
                <p className="text-xs text-austin-700 font-medium" data-testid="text-deposit-amount">
                  Required Deposit: {formatCurrency(pricing.depositAmount)} ({pricing.depositPercent}%)
                </p>
                <p className="text-xs text-muted-foreground" data-testid="text-deposit-note">
                  {pricing.depositPercent === 100 
                    ? "Full payment required due to cruise date" 
                    : "Remaining balance due 7 days before cruise"
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
