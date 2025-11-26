import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Settings, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'error';
  description: string;
  lastSync?: Date;
}

export function IntegrationStatus() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadIntegrationStatus();
  }, []);

  const loadIntegrationStatus = () => {
    // In production, this would check actual integration status
    const mockIntegrations: Integration[] = [
      {
        id: 'google-sheets',
        name: 'Google Sheets',
        icon: 'fab fa-google',
        status: 'connected',
        description: 'Boat availability data',
        lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      },
      {
        id: 'xola',
        name: 'Xola Bookings',
        icon: 'fas fa-calendar-check',
        status: 'connected',
        description: 'Online booking system',
        lastSync: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      },
      {
        id: 'openai',
        name: 'OpenAI',
        icon: 'fas fa-robot',
        status: 'connected',
        description: 'AI chatbot responses',
        lastSync: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      },
      {
        id: 'sendgrid',
        name: 'SendGrid',
        icon: 'fas fa-envelope',
        status: 'connected',
        description: 'Email delivery',
        lastSync: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      },
      {
        id: 'twilio',
        name: 'Twilio SMS',
        icon: 'fas fa-sms',
        status: 'connected',
        description: 'SMS notifications',
        lastSync: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      }
    ];

    setIntegrations(mockIntegrations);
  };

  const refreshIntegrations = async () => {
    setIsRefreshing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    loadIntegrationStatus();
    setIsRefreshing(false);
    
    toast({
      title: "Integration Status Updated",
      description: "All integration statuses have been refreshed.",
    });
  };

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return (
          <Badge variant="default" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Connected
          </Badge>
        );
      case 'disconnected':
        return (
          <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Disconnected
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
    }
  };

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-50 dark:bg-green-950/20';
      case 'disconnected':
        return 'bg-gray-50 dark:bg-gray-950/20';
      case 'error':
        return 'bg-red-50 dark:bg-red-950/20';
    }
  };

  const getIconColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 dark:text-green-400';
      case 'disconnected':
        return 'text-gray-500';
      case 'error':
        return 'text-red-600 dark:text-red-400';
    }
  };

  const formatLastSync = (lastSync?: Date) => {
    if (!lastSync) return 'Never';
    
    const now = new Date();
    const diff = now.getTime() - lastSync.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Card className="boat-shadow" data-testid="integration-status">
      <CardHeader className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-heading flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span data-testid="text-integrations-title">Integration Status</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground" data-testid="text-integrations-subtitle">
              Connected services
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshIntegrations}
            disabled={isRefreshing}
            className="h-8"
            data-testid="button-refresh-integrations"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className={`flex items-center justify-between p-2 rounded-lg ${getStatusColor(integration.status)}`}
            data-testid={`integration-item-${integration.id}`}
          >
            <div className="flex items-center space-x-2">
              <i className={`${integration.icon} ${getIconColor(integration.status)}`} />
              <div>
                <span className="text-sm font-medium" data-testid={`text-integration-name-${integration.id}`}>
                  {integration.name}
                </span>
                <p className="text-xs text-muted-foreground" data-testid={`text-integration-description-${integration.id}`}>
                  {integration.description}
                </p>
                {integration.lastSync && (
                  <p className="text-xs text-muted-foreground" data-testid={`text-integration-last-sync-${integration.id}`}>
                    Last sync: {formatLastSync(integration.lastSync)}
                  </p>
                )}
              </div>
            </div>
            <div data-testid={`badge-integration-status-${integration.id}`}>
              {getStatusBadge(integration.status)}
            </div>
          </div>
        ))}

        {integrations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground" data-testid="no-integrations">
            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No integrations configured</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="pt-3 border-t border-border">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Connected Services</span>
            <span data-testid="text-connected-count">
              {integrations.filter(i => i.status === 'connected').length} of {integrations.length}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
