import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  LogOut, FileText, DollarSign, Calendar, 
  User, Ship, Clock, ChevronRight, AlertCircle,
  CheckCircle, Star, Phone, Mail, MapPin
} from "lucide-react";
import logoPath from "@assets/PPC Logo LARGE_1757881944449.png";

interface DashboardData {
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
  };
  summary: {
    totalQuotes: number;
    totalInvoices: number;
    totalBookings: number;
    upcomingBookings: number;
    pendingInvoices: number;
    activeQuotes: number;
  };
  recentActivity: {
    quotes: any[];
    invoices: any[];
    bookings: any[];
  };
}

export default function PortalDashboard() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Get dashboard data
  const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["/api/portal/customer/dashboard"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/portal/customer/dashboard");
      if (!response.ok) {
        throw new Error("Failed to load dashboard");
      }
      return response.json();
    }
  });

  // Check authentication status
  const { data: authStatus } = useQuery({
    queryKey: ["/api/portal/auth/status"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/portal/auth/status");
      return response.json();
    }
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await apiRequest("POST", "/api/portal/auth/logout");
      toast({
        title: "Logged Out Successfully",
        description: "You have been securely logged out.",
      });
      setLocation("/portal/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Error",
        description: "There was an issue logging out. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load dashboard. Please try again or contact support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Welcome, {dashboardData.customer.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customer Portal Dashboard
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isLoggingOut}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {isLoggingOut ? "Logging out..." : "Log Out"}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white p-6">
            <h2 className="text-2xl font-bold mb-2">
              Your Premier Party Cruises Portal
            </h2>
            <p className="text-blue-100 mb-4">
              Manage your bookings, view quotes, and access all your cruise information in one place.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{dashboardData.summary.totalBookings}</div>
                <div className="text-sm text-blue-200">Total Cruises</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{dashboardData.summary.upcomingBookings}</div>
                <div className="text-sm text-blue-200">Upcoming</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{dashboardData.summary.activeQuotes}</div>
                <div className="text-sm text-blue-200">Active Quotes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setLocation("/portal/quotes")}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quotes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                View and respond to cruise quotes
              </p>
              <div className="flex items-center justify-center text-blue-600 text-sm">
                <span>{dashboardData.summary.totalQuotes} quotes</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setLocation("/portal/invoices")}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Invoices</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                View invoices and payment status
              </p>
              <div className="flex items-center justify-center text-green-600 text-sm">
                <span>{dashboardData.summary.totalInvoices} invoices</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setLocation("/portal/bookings")}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Ship className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Bookings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Your cruise reservations
              </p>
              <div className="flex items-center justify-center text-purple-600 text-sm">
                <span>{dashboardData.summary.totalBookings} bookings</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setLocation("/portal/profile")}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Profile</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Update your information
              </p>
              <div className="flex items-center justify-center text-orange-600 text-sm">
                <span>Manage profile</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Actions */}
        {(dashboardData.summary.pendingInvoices > 0 || dashboardData.summary.activeQuotes > 0) && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200">
                <AlertCircle className="h-5 w-5 mr-2" />
                Action Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.summary.pendingInvoices > 0 && (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-red-500 mr-3" />
                      <span>You have {dashboardData.summary.pendingInvoices} pending invoice(s)</span>
                    </div>
                    <Button size="sm" onClick={() => setLocation("/portal/invoices")}>
                      View Invoices
                    </Button>
                  </div>
                )}
                {dashboardData.summary.activeQuotes > 0 && (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-3" />
                      <span>You have {dashboardData.summary.activeQuotes} quote(s) awaiting response</span>
                    </div>
                    <Button size="sm" onClick={() => setLocation("/portal/quotes")}>
                      View Quotes
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Account Information and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{dashboardData.customer.name}</p>
                  <p className="text-sm text-gray-500">Customer since {formatDate(dashboardData.customer.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{dashboardData.customer.email}</p>
                  <p className="text-sm text-gray-500">Email address</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{dashboardData.customer.phone}</p>
                  <p className="text-sm text-gray-500">Phone number</p>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setLocation("/portal/profile")}
                data-testid="button-edit-profile"
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentActivity.quotes.slice(0, 3).map((quote, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium">Quote #{quote.id.substring(0, 8)}</p>
                        <p className="text-xs text-gray-500">{formatDate(quote.createdAt)}</p>
                      </div>
                    </div>
                    <Badge variant={quote.status === 'accepted' ? 'default' : 'secondary'}>
                      {quote.status}
                    </Badge>
                  </div>
                ))}

                {dashboardData.recentActivity.bookings.slice(0, 2).map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <Ship className="h-4 w-4 text-purple-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium">Cruise Booking</p>
                        <p className="text-xs text-gray-500">{formatDate(booking.startTime)}</p>
                      </div>
                    </div>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                  </div>
                ))}

                {(dashboardData.recentActivity.quotes.length === 0 && 
                  dashboardData.recentActivity.bookings.length === 0) && (
                  <div className="text-center py-6 text-gray-500">
                    <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Booking */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200">
          <CardContent className="p-6 text-center">
            <Ship className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ready for Your Next Adventure?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Book another amazing cruise experience with Premier Party Cruises
            </p>
            <Button 
              size="lg"
              onClick={() => window.open("/book", "_blank")}
              data-testid="button-book-cruise"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book New Cruise
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}