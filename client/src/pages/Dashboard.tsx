import { Button } from "@/components/ui/button";
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
import { BookingsTable } from "@/components/BookingsTable";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import logoPath from "@assets/PPC Logo LARGE_1757881944449.png";
import { 
  TrendingUp, Calendar, LayoutDashboard, FileText, 
  MessageCircle, Save, Ship, Users, BarChart3
} from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();


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

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Bookings
                </CardTitle>
                <CardDescription>
                  Customers who have paid deposits with their booking details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingsTable 
                  className="mt-4"
                  data-testid="table-customer-bookings"
                />
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
                  View and manage your cruise availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarView />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}