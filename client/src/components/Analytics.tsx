import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { BarChart, MessageSquare, TrendingUp, Clock, DollarSign } from "lucide-react";

interface AnalyticsMetrics {
  conversionRate: number;
  avgBookingValue: number;
  totalLeads: number;
  totalClients: number;
  messagesToday: number;
  leadsGenerated: number;
  responseTime: string;
}

export function Analytics() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAnalytics();
    
    // Set up polling for real-time updates
    const interval = setInterval(loadAnalytics, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await apiRequest("GET", "/api/analytics/metrics");
      setMetrics(data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
      if (isLoading) {
        toast({
          title: "Error",
          description: "Failed to load analytics data.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <Card className="boat-shadow" data-testid="analytics-loading">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading analytics...</span>
        </CardContent>
      </Card>
    );
  }

  if (!metrics) {
    return (
      <Card className="boat-shadow" data-testid="analytics-error">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground">Failed to load analytics</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="boat-shadow" data-testid="analytics">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-lg font-heading flex items-center space-x-2">
          <BarChart className="w-5 h-5" />
          <span data-testid="text-analytics-title">Analytics</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground" data-testid="text-analytics-subtitle">
          Performance metrics
        </p>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg">
            <div className="text-2xl font-bold text-primary flex items-center justify-center space-x-1">
              <TrendingUp className="w-5 h-5" />
              <span data-testid="text-conversion-rate">{metrics.conversionRate}%</span>
            </div>
            <div className="text-xs text-muted-foreground" data-testid="text-conversion-rate-label">
              Conversion Rate
            </div>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-lg">
            <div className="text-2xl font-bold text-secondary flex items-center justify-center space-x-1">
              <DollarSign className="w-5 h-5" />
              <span data-testid="text-avg-booking">{formatCurrency(metrics.avgBookingValue)}</span>
            </div>
            <div className="text-xs text-muted-foreground" data-testid="text-avg-booking-label">
              Avg Booking
            </div>
          </div>
        </div>

        {/* Chat Metrics */}
        <div>
          <h4 className="font-medium text-sm mb-2 flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>Chat Performance</span>
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Messages Today</span>
              <span className="font-medium" data-testid="text-messages-today">
                {metrics.messagesToday.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Leads Generated</span>
              <span className="font-medium" data-testid="text-leads-generated">
                {metrics.leadsGenerated}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Response Time</span>
              <span className="font-medium text-green-600 dark:text-green-400 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span data-testid="text-response-time">{metrics.responseTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div>
          <h4 className="font-medium text-sm mb-2 flex items-center space-x-1">
            <BarChart className="w-4 h-4" />
            <span>Weekly Revenue</span>
          </h4>
          <div className="h-24 bg-gradient-to-r from-austin-400/20 to-coral-400/20 dark:from-austin-400/30 dark:to-coral-400/30 rounded-lg flex items-end justify-between p-2" data-testid="revenue-chart">
            {/* Mock revenue bars */}
            {[60, 80, 40, 90, 70, 95, 85].map((height, index) => (
              <div
                key={index}
                className="w-3 bg-austin-500 rounded-t transition-all hover:bg-austin-600"
                style={{ height: `${height}%` }}
                data-testid={`revenue-bar-${index}`}
                title={`Day ${index + 1}: $${Math.floor(height * 10)}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary" data-testid="text-total-leads">
              {metrics.totalLeads}
            </div>
            <div className="text-xs text-muted-foreground">Total Leads</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-secondary" data-testid="text-total-clients">
              {metrics.totalClients}
            </div>
            <div className="text-xs text-muted-foreground">Active Clients</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
