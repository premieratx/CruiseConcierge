import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, Ship, Calendar, Users, MapPin, 
  Clock, Search, Phone, Mail, MessageSquare
} from "lucide-react";
import logoPath from "@assets/PPC Logo LARGE_1757881944449.png";

interface Booking {
  id: string;
  type: string;
  status: string;
  startTime: string;
  endTime: string;
  groupSize: number;
  partyType: string;
  paymentStatus: string;
  amountPaid: number;
  totalAmount: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests: string;
  createdAt: string;
}

export default function PortalBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Get customer bookings
  const { data: bookings = [], isLoading, error } = useQuery<Booking[]>({
    queryKey: ["/api/portal/customer/bookings"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/portal/customer/bookings");
      if (!response.ok) {
        throw new Error("Failed to load bookings");
      }
      const data = await response.json();
      return data.bookings;
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'canceled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'pending':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const isUpcoming = (startTime: string) => {
    return new Date(startTime) > new Date();
  };

  const isPast = (endTime: string) => {
    return new Date(endTime) < new Date();
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.partyType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter;
    
    let matchesTime = true;
    if (timeFilter === "upcoming") {
      matchesTime = isUpcoming(booking.startTime);
    } else if (timeFilter === "past") {
      matchesTime = isPast(booking.endTime);
    }
    
    return matchesSearch && matchesStatus && matchesTime;
  });

  const upcomingBookings = bookings.filter(b => isUpcoming(b.startTime) && b.status !== 'canceled');
  const pastBookings = bookings.filter(b => isPast(b.endTime));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Failed to load bookings. Please try again or contact support.
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
              <Button
                variant="ghost"
                onClick={() => setLocation("/portal/dashboard")}
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Cruise Bookings
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View your cruise reservations and details
                </p>
              </div>
            </div>
            <img 
              src={logoPath} 
              alt="Premier Party Cruises" 
              className="h-10 w-auto"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search bookings by ID, name, or party type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  data-testid="select-status-filter"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  data-testid="select-time-filter"
                >
                  <option value="all">All Time</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bookings Alert */}
        {upcomingBookings.length > 0 && (
          <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <Ship className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              You have {upcomingBookings.length} upcoming cruise{upcomingBookings.length > 1 ? 's' : ''}! 
              Don't forget to arrive 30 minutes before departure.
            </AlertDescription>
          </Alert>
        )}

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Ship className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {bookings.length === 0 ? "No bookings yet" : "No bookings found"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {bookings.length === 0 
                  ? "Your cruise bookings will appear here once confirmed." 
                  : "Try adjusting your search or filter criteria."
                }
              </p>
              {bookings.length === 0 && (
                <Button
                  onClick={() => window.open("/book", "_blank")}
                  data-testid="button-book-cruise"
                >
                  <Ship className="h-4 w-4 mr-2" />
                  Book a Cruise
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6">
                    {/* Booking Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Ship className="h-6 w-6 text-blue-600" />
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {booking.partyType} Cruise
                          </h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          {isUpcoming(booking.startTime) && booking.status === 'confirmed' && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              Upcoming
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Booking ID: {booking.id.substring(0, 8)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                          {booking.paymentStatus === 'paid' ? 'Paid in Full' : 
                           booking.paymentStatus === 'partial' ? 'Partially Paid' : 'Payment Pending'}
                        </Badge>
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Date & Time */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Date & Time
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium">{formatDateTime(booking.startTime)}</p>
                          <p className="text-gray-600 dark:text-gray-400">
                            Duration: {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                          </p>
                        </div>
                      </div>

                      {/* Party Details */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Party Details
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-600 dark:text-gray-400">Group Size:</span> {booking.groupSize} guests</p>
                          <p><span className="text-gray-600 dark:text-gray-400">Party Type:</span> {booking.partyType}</p>
                          <p><span className="text-gray-600 dark:text-gray-400">Contact:</span> {booking.contactName}</p>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Payment Info
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-600 dark:text-gray-400">Total:</span> {formatCurrency(booking.totalAmount)}</p>
                          <p><span className="text-gray-600 dark:text-gray-400">Paid:</span> {formatCurrency(booking.amountPaid)}</p>
                          {booking.totalAmount > booking.amountPaid && (
                            <p className="text-red-600 font-medium">
                              Balance: {formatCurrency(booking.totalAmount - booking.amountPaid)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Contact Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{booking.contactPhone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{booking.contactEmail}</span>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    {booking.specialRequests && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Special Requests
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          {booking.specialRequests}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="border-t pt-4 flex flex-col sm:flex-row gap-3">
                      {isUpcoming(booking.startTime) && booking.status === 'confirmed' && (
                        <>
                          <Button 
                            variant="outline"
                            onClick={() => {
                              // Add calendar event functionality
                              toast({
                                title: "Calendar Event",
                                description: "Adding cruise to your calendar...",
                              });
                            }}
                            data-testid={`button-add-calendar-${booking.id}`}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Add to Calendar
                          </Button>
                          
                          {booking.totalAmount > booking.amountPaid && (
                            <Button
                              onClick={() => {
                                toast({
                                  title: "Payment Portal",
                                  description: "Redirecting to payment portal...",
                                });
                              }}
                              data-testid={`button-pay-balance-${booking.id}`}
                            >
                              Pay Balance ({formatCurrency(booking.totalAmount - booking.amountPaid)})
                            </Button>
                          )}
                        </>
                      )}

                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Contact Support",
                            description: "Redirecting to customer support...",
                          });
                        }}
                        data-testid={`button-contact-support-${booking.id}`}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary */}
        {bookings.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{upcomingBookings.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{pastBookings.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">
                    {formatCurrency(bookings.reduce((sum, b) => sum + b.totalAmount, 0))}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}