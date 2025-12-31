import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import AdminNoIndex from "@/components/AdminNoIndex";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Activity, 
  Globe, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Send,
  RefreshCw,
  Wifi
} from "lucide-react";

interface UptimeMonitor {
  id: number;
  name: string;
  url: string;
  status: 'up' | 'down' | 'paused' | 'unknown';
  statusCode: number;
  uptimeRatio: string;
  responseTime: number;
  lastCheck: string | null;
}

interface UptimeSummary {
  totalMonitors: number;
  upMonitors: number;
  downMonitors: number;
  pausedMonitors: number;
  averageUptime: number;
  monitors: UptimeMonitor[];
}

export default function UptimeMonitoring() {
  const { toast } = useToast();
  const [testPhone, setTestPhone] = useState('512-576-7975');

  // Fetch uptime summary from UptimeRobot API
  const { data: summary, isLoading, error, refetch } = useQuery<UptimeSummary>({
    queryKey: ['/api/admin/uptime/summary'],
    refetchInterval: 60000, // Refresh every 60 seconds
  });

  // Send test SMS mutation
  const sendTestSMS = useMutation({
    mutationFn: async (phoneNumber: string) => {
      return await apiRequest({
        url: '/api/admin/uptime/test-sms',
        method: 'POST',
        body: { phoneNumber },
      });
    },
    onSuccess: (data: any) => {
      toast({
        title: '📱 Test SMS Sent!',
        description: `Successfully sent test SMS to ${data.sentTo}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: '❌ Failed to Send SMS',
        description: error.message || 'Could not send test SMS',
        variant: 'destructive',
      });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'down': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'paused': return <Clock className="h-5 w-5 text-gray-400" />;
      default: return <Activity className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      up: 'default' as const,
      down: 'destructive' as const,
      paused: 'secondary' as const,
      unknown: 'outline' as const,
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const formatLastCheck = (lastCheck: string | null) => {
    if (!lastCheck) return 'Never';
    const date = new Date(lastCheck);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  return (
    <div className="space-y-6">
      <AdminNoIndex />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Uptime Monitoring</h2>
          <p className="text-muted-foreground">Real-time website availability and performance</p>
        </div>
        <Button
          onClick={() => refetch()}
          variant="outline"
          data-testid="button-refresh-uptime"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card data-testid="card-total-monitors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Monitors</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.totalMonitors || 0}</div>
            <p className="text-xs text-muted-foreground">Active monitoring</p>
          </CardContent>
        </Card>

        <Card data-testid="card-uptime">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Uptime</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {summary?.averageUptime ? `${summary.averageUptime.toFixed(2)}%` : '0%'}
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card data-testid="card-monitors-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitors Up</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{summary?.upMonitors || 0}</div>
            <p className="text-xs text-muted-foreground">Currently operational</p>
          </CardContent>
        </Card>

        <Card data-testid="card-monitors-down">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitors Down</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{summary?.downMonitors || 0}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" data-testid="alert-uptime-error">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to fetch uptime data. Make sure UPTIMEROBOT_API_KEY is configured correctly.
          </AlertDescription>
        </Alert>
      )}

      {/* Monitor List */}
      <Card>
        <CardHeader>
          <CardTitle>Monitor Status</CardTitle>
          <CardDescription>Live status of all monitored websites and services</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : summary && summary.monitors.length > 0 ? (
            <div className="space-y-4">
              {summary.monitors.map((monitor) => (
                <div
                  key={monitor.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  data-testid={`monitor-${monitor.id}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getStatusIcon(monitor.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold" data-testid={`text-monitor-name-${monitor.id}`}>
                          {monitor.name}
                        </h3>
                        {getStatusBadge(monitor.status)}
                      </div>
                      <p className="text-sm text-muted-foreground" data-testid={`text-monitor-url-${monitor.id}`}>
                        {monitor.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <div className="font-medium text-green-600">
                        {monitor.uptimeRatio}% uptime
                      </div>
                      <div className="text-muted-foreground">
                        {monitor.responseTime}ms response
                      </div>
                    </div>
                    <div className="text-right text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatLastCheck(monitor.lastCheck)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No monitors found. Add monitors in your UptimeRobot dashboard.
            </div>
          )}
        </CardContent>
      </Card>

      {/* SMS Alert Testing */}
      <Card>
        <CardHeader>
          <CardTitle>SMS Alert System</CardTitle>
          <CardDescription>Test SMS notifications for downtime alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              type="tel"
              placeholder="Phone number (e.g., 512-576-7975)"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              className="flex-1"
              data-testid="input-test-phone"
            />
            <Button
              onClick={() => sendTestSMS.mutate(testPhone)}
              disabled={!testPhone || sendTestSMS.isPending}
              data-testid="button-send-test-sms"
            >
              <Send className="mr-2 h-4 w-4" />
              {sendTestSMS.isPending ? 'Sending...' : 'Send Test SMS'}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Send a test SMS to verify the alert system is working correctly.
          </p>
        </CardContent>
      </Card>

      {/* UptimeRobot Integration Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Keep-Alive Status
          </CardTitle>
          <CardDescription>Your site stays online 24/7 with UptimeRobot monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>UptimeRobot pings your site every 10 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Prevents Autoscale deployment from going dormant (15 min timeout)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Site remains visible to search engines 24/7</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
