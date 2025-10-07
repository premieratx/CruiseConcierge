import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Analytics } from "@/components/Analytics";
import { IntegrationStatus } from "@/components/IntegrationStatus";
import Navigation from "@/components/Navigation";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import logoPath from "@assets/PPC-Logo-LARGE.webp";
import { useRealtimeBookings } from "@/hooks/useRealtimeBookings";
import { format } from "date-fns";
import { 
  TrendingUp, Calendar, LayoutDashboard, FileText, 
  MessageCircle, Save, Ship, Users, BarChart3, Anchor,
  Bell, BellOff, Wifi, WifiOff, Check, X, Quote,
  DollarSign, UserPlus, Activity
} from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Real-time booking notifications
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications,
    isConnected 
  } = useRealtimeBookings({ 
    showToasts: true,
    maxNotifications: 100 
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'quote_created': return <Quote className="h-4 w-4 text-blue-600" />;
      case 'booking_confirmed': return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'admin_booking_created': return <UserPlus className="h-4 w-4 text-purple-600" />;
      case 'lead_updated': return <Activity className="h-4 w-4 text-orange-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-marine-50 via-background to-marine-100">
      {/* Navigation Header */}
      <Navigation />

      {/* Company Branding Header */}
      <div className="container mx-auto px-4 py-6 pt-20">
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
          <div className="flex gap-2">
            {/* Real-time Connection Status */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-background/50">
              {isConnected ? (
                <Wifi className="h-4 w-4 text-green-600" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-600" />
              )}
              <span className={`text-xs ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? 'Live Updates' : 'Disconnected'}
              </span>
            </div>

            {/* Real-time Notifications Badge - Disabled until new leads system */}
            <Button 
              variant="outline" 
              size="sm"
              disabled
              className="relative"
              data-testid="button-notifications"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 px-1 min-w-5 h-5 text-xs"
                  data-testid="badge-notification-count"
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Badge>
              )}
            </Button>

            <Button 
              onClick={async () => {
                try {
                  const response = await apiRequest("POST", "/api/seed-customer-bookings");
                  const data = await response.json();
                  toast({
                    title: "Customer Bookings Created! 🎉",
                    description: `Created ${data.bookingsCreated} customer bookings`,
                  });
                  // Refresh the page to show new data
                  window.location.reload();
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to create customer bookings",
                    variant: "destructive",
                  });
                }
              }}
              variant="default"
              data-testid="button-seed-customer-bookings"
            >
              <Ship className="mr-2 h-4 w-4" />
              Load Customer Bookings
            </Button>
            <Button 
              onClick={async () => {
                try {
                  const response = await apiRequest("POST", "/api/seed-sample-data");
                  const data = await response.json();
                  toast({
                    title: "Sample Data Created! 🎉",
                    description: `Created ${data.data.contacts} contacts, ${data.data.projects} projects, ${data.data.quotes} quotes`,
                  });
                  // Refresh the page to show new data
                  window.location.reload();
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to create sample data",
                    variant: "destructive",
                  });
                }
              }}
              variant="outline"
              data-testid="button-seed-data"
            >
              <Save className="mr-2 h-4 w-4" />
              Load Sample Data
            </Button>
          </div>
        </div>
      </div>


      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Real-time Notifications Panel */}
            {notifications.length > 0 && (
              <Card data-testid="card-realtime-notifications">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Real-time Updates
                      {unreadCount > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {unreadCount} new
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex gap-2">
                      {unreadCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllAsRead}
                          data-testid="button-mark-all-read"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Mark All Read
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearNotifications}
                        data-testid="button-clear-notifications"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {notifications.slice(0, 10).map((notification) => (
                        <div 
                          key={notification.id}
                          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                            !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-background'
                          }`}
                          onClick={() => markAsRead(notification.id)}
                          data-testid={`notification-${notification.id}`}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <p className={`text-sm font-medium truncate ${!notification.read ? 'text-blue-900' : 'text-foreground'}`}>
                                {notification.title}
                              </p>
                              <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                                {format(notification.timestamp, 'HH:mm')}
                              </span>
                            </div>
                            <p className={`text-xs mt-1 ${!notification.read ? 'text-blue-700' : 'text-muted-foreground'}`}>
                              {notification.message}
                            </p>
                            {notification.data?.amount && (
                              <Badge variant="outline" className="mt-1">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(notification.data.amount / 100)}
                              </Badge>
                            )}
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  {notifications.length > 10 && (
                    <div className="mt-3 pt-3 border-t text-center">
                      {/* Notifications view - Coming soon */}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Analytics */}
              <Analytics />
              
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
                  {/* Customer management section - Coming soon */}
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

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Bookings
                </CardTitle>
                <CardDescription>
                  Customer booking management coming soon with new system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Booking management will be available after Lovable migration</p>
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Availability Calendar
                </CardTitle>
                <CardDescription>
                  Calendar view coming soon with new system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Calendar management will be available after Lovable migration</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}