import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { TrendingUp, Clock, DollarSign, Users, Circle } from "lucide-react";

interface PipelineSummary {
  newLeads: number;
  quoteSent: number;
  depositPaid: number;
  fullyPaid: number;
}

interface ActivityItem {
  id: string;
  type: 'lead' | 'quote' | 'payment';
  message: string;
  timestamp: Date;
}

export function CRMPipeline() {
  const [pipeline, setPipeline] = useState<PipelineSummary | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPipelineData();
    loadRecentActivity();
    
    // Set up polling for real-time updates
    const interval = setInterval(() => {
      loadPipelineData();
      loadRecentActivity();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadPipelineData = async () => {
    try {
      const response = await apiRequest("GET", "/api/pipeline/summary");
      const data = await response.json();
      setPipeline(data);
    } catch (error) {
      console.error("Failed to load pipeline data:", error);
      // Don't show toast for background updates
      if (isLoading) {
        toast({
          title: "Error",
          description: "Failed to load pipeline data.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecentActivity = async () => {
    try {
      // Fetch recent quotes to generate activity items
      const quotesResponse = await apiRequest("GET", "/api/quotes/recent?limit=10");
      const quotes = await quotesResponse.json();
      
      // Convert quotes to activity items
      const quoteActivities: ActivityItem[] = quotes.map((quote: any) => ({
        id: `quote-${quote.id}`,
        type: 'quote' as const,
        message: `Quote sent to ${quote.customerName}`,
        timestamp: new Date(quote.createdAt)
      }));
      
      // Fetch pipeline data to get recent leads
      const pipelineResponse = await apiRequest("GET", "/api/pipeline/summary");
      const pipelineData = await pipelineResponse.json();
      
      // Create lead activity items based on pipeline phases
      const leadActivities: ActivityItem[] = [];
      if (pipelineData.newLeads > 0) {
        leadActivities.push({
          id: 'new-leads',
          type: 'lead' as const,
          message: `${pipelineData.newLeads} new lead${pipelineData.newLeads > 1 ? 's' : ''} in pipeline`,
          timestamp: new Date()
        });
      }
      
      if (pipelineData.depositPaid > 0) {
        leadActivities.push({
          id: 'deposits',
          type: 'payment' as const,
          message: `${pipelineData.depositPaid} deposit${pipelineData.depositPaid > 1 ? 's' : ''} paid`,
          timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30m ago
        });
      }
      
      // Combine and sort all activities by timestamp
      const allActivities = [...quoteActivities, ...leadActivities]
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 5); // Keep only the 5 most recent
      
      setActivities(allActivities.length > 0 ? allActivities : [
        // Fallback to show at least one activity if no data
        {
          id: 'welcome',
          type: 'lead' as const,
          message: 'Click "Load Sample Data" to populate dashboard',
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error("Failed to load recent activity:", error);
      // Show helpful message if no data
      setActivities([{
        id: 'no-data',
        type: 'lead' as const,
        message: 'No recent activity. Load sample data to get started.',
        timestamp: new Date()
      }]);
    }
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'lead':
        return <Circle className="w-1.5 h-1.5 fill-current text-blue-500" />;
      case 'quote':
        return <Circle className="w-1.5 h-1.5 fill-current text-yellow-500" />;
      case 'payment':
        return <Circle className="w-1.5 h-1.5 fill-current text-green-500" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'lead':
        return 'text-blue-500';
      case 'quote':
        return 'text-yellow-500';
      case 'payment':
        return 'text-green-500';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (isLoading) {
    return (
      <Card className="boat-shadow" data-testid="crm-pipeline-loading">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading pipeline...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="boat-shadow" data-testid="crm-pipeline">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-lg font-heading flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span data-testid="text-pipeline-title">Sales Pipeline</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground" data-testid="text-pipeline-subtitle">
          Active leads & bookings
        </p>
      </CardHeader>

      <CardContent className="p-4">
        {/* Pipeline Stages */}
        {pipeline && (
          <div className="space-y-3 mb-6">
            <Link href="/leads?status=new">
              <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer" data-testid="pipeline-card-new-leads">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">New Leads</span>
                  <Users className="w-3 h-3 text-blue-500" />
                </div>
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" data-testid="badge-new-leads">
                  {pipeline.newLeads}
                </Badge>
              </div>
            </Link>

            <Link href="/leads?status=quote-sent">
              <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors cursor-pointer" data-testid="pipeline-card-quote-sent">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Quote Sent</span>
                  <DollarSign className="w-3 h-3 text-yellow-500" />
                </div>
                <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200" data-testid="badge-quote-sent">
                  {pipeline.quoteSent}
                </Badge>
              </div>
            </Link>

            <Link href="/leads?status=deposit-paid">
              <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors cursor-pointer" data-testid="pipeline-card-deposit-paid">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Deposit Paid</span>
                  <TrendingUp className="w-3 h-3 text-green-500" />
                </div>
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" data-testid="badge-deposit-paid">
                  {pipeline.depositPaid}
                </Badge>
              </div>
            </Link>

            <Link href="/leads?status=fully-paid">
              <div className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors cursor-pointer" data-testid="pipeline-card-fully-paid">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Fully Paid</span>
                  <DollarSign className="w-3 h-3 text-purple-500" />
                </div>
                <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200" data-testid="badge-fully-paid">
                  {pipeline.fullyPaid}
                </Badge>
              </div>
            </Link>
          </div>
        )}

        {/* Recent Activity */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-medium text-sm mb-2 flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Recent Activity</span>
          </h4>
          
          <ScrollArea className="h-32">
            <div className="space-y-2">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-2 text-xs"
                  data-testid={`activity-item-${activity.id}`}
                >
                  <div className={getActivityColor(activity.type)}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <span className="text-muted-foreground flex-1" data-testid={`text-activity-message-${activity.id}`}>
                    {activity.message}
                  </span>
                  <span className="text-muted-foreground" data-testid={`text-activity-time-${activity.id}`}>
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              ))}

              {activities.length === 0 && (
                <div className="text-center py-4 text-muted-foreground" data-testid="no-activity">
                  <Clock className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No recent activity</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
