import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Ship, Search, Filter, Calendar, DollarSign, Users, 
  User, Clock, MapPin, Phone, Mail, CheckCircle,
  AlertCircle, FileText, Download, Eye, RefreshCw
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  eventDate: string;
  eventType: string;
  boatName: string;
  startTime: string;
  endTime: string;
  groupSize: number;
  totalAmount: number;
  amountPaid: number;
  paymentStatus: 'deposit_paid' | 'fully_paid';
  bookingStatus: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  pipelinePhase: string;
}

// Helper functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount / 100);
};

const formatDate = (date: string) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

const formatTime = (time: string) => {
  return format(new Date(`2000-01-01T${time}`), 'h:mm a');
};

const getPaymentStatusBadge = (status: string, amountPaid: number, totalAmount: number) => {
  if (status === 'fully_paid' || amountPaid >= totalAmount) {
    return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Fully Paid</Badge>;
  } else {
    return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Deposit Paid</Badge>;
  }
};

const getBookingStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <Badge className="bg-blue-500">Confirmed</Badge>;
    case 'completed':
      return <Badge className="bg-green-500">Completed</Badge>;
    case 'cancelled':
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function BookingsManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('eventDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch bookings data - only paid bookings
  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ['/api/admin/bookings/comprehensive', searchTerm, statusFilter, paymentFilter, sortBy, sortOrder],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (paymentFilter !== 'all') params.append('paymentStatus', paymentFilter);
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);
      // Only fetch paid bookings - filter by pipeline phase
      params.append('paidOnly', 'true');
      
      const response = await apiRequest('GET', `/api/admin/bookings/comprehensive?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      return response.json();
    }
  });

  // Filter bookings client-side for additional control
  const filteredBookings = bookings.filter((booking: Booking) => {
    // Only show bookings that have made payments (deposit or full)
    const hasPaid = booking.pipelinePhase === 'ph_deposit_paid' || booking.pipelinePhase === 'ph_fully_paid' || booking.pipelinePhase === 'ph_paid';
    const matchesSearch = !searchTerm || 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.boatName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return hasPaid && matchesSearch;
  });

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshed",
      description: "Bookings data has been updated.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Bookings data export will be available shortly.",
    });
    // TODO: Implement export functionality
  };

  return (
    <div className="space-y-6" data-testid="bookings-management">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Ship className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="heading-bookings">
              Bookings Management
            </h1>
            <p className="text-sm text-gray-600">
              Manage confirmed bookings and customer payments
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm" data-testid="button-refresh">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm" data-testid="button-export">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold" data-testid="stat-total-bookings">
                  {filteredBookings.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold" data-testid="stat-total-revenue">
                  {formatCurrency(filteredBookings.reduce((sum, booking) => sum + booking.amountPaid, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Guests</p>
                <p className="text-2xl font-bold" data-testid="stat-total-guests">
                  {filteredBookings.reduce((sum, booking) => sum + booking.groupSize, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Fully Paid</p>
                <p className="text-2xl font-bold" data-testid="stat-fully-paid">
                  {filteredBookings.filter(b => b.pipelinePhase === 'ph_fully_paid' || b.pipelinePhase === 'ph_paid' || b.amountPaid >= b.totalAmount).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Customer name, email, or boat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Booking Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger data-testid="select-status">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Payment Status</label>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger data-testid="select-payment">
                  <SelectValue placeholder="All payments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="deposit">Deposit Only</SelectItem>
                  <SelectItem value="full">Fully Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Sort By</label>
              <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                const [field, order] = value.split('-');
                setSortBy(field);
                setSortOrder(order as 'asc' | 'desc');
              }}>
                <SelectTrigger data-testid="select-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eventDate-desc">Event Date (Newest)</SelectItem>
                  <SelectItem value="eventDate-asc">Event Date (Oldest)</SelectItem>
                  <SelectItem value="createdAt-desc">Booking Date (Newest)</SelectItem>
                  <SelectItem value="createdAt-asc">Booking Date (Oldest)</SelectItem>
                  <SelectItem value="totalAmount-desc">Amount (Highest)</SelectItem>
                  <SelectItem value="totalAmount-asc">Amount (Lowest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Confirmed Bookings ({filteredBookings.length})</CardTitle>
          <CardDescription>
            Showing customers who have completed payments (deposits or full payments)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Ship className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-medium text-gray-600">No bookings found</p>
              <p className="text-base text-gray-500 mt-2">
                {searchTerm ? 'Try adjusting your search criteria' : 'Paid bookings will appear here once customers complete payments'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Event Details</TableHead>
                    <TableHead>Boat & Time</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id} data-testid={`booking-row-${booking.id}`}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium" data-testid={`customer-name-${booking.id}`}>
                              {booking.customerName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-3 w-3" />
                            {booking.customerEmail}
                          </div>
                          {booking.customerPhone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-3 w-3" />
                              {booking.customerPhone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="font-medium" data-testid={`event-date-${booking.id}`}>
                              {formatDate(booking.eventDate)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {booking.eventType}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-3 w-3" />
                            {booking.groupSize} guests
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Ship className="h-4 w-4 text-gray-400" />
                            <span className="font-medium" data-testid={`boat-name-${booking.id}`}>
                              {booking.boatName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium" data-testid={`amount-paid-${booking.id}`}>
                            {formatCurrency(booking.amountPaid)}
                          </div>
                          <div className="text-sm text-gray-600">
                            of {formatCurrency(booking.totalAmount)}
                          </div>
                          <div>
                            {getPaymentStatusBadge(booking.paymentStatus, booking.amountPaid, booking.totalAmount)}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        {getBookingStatusBadge(booking.bookingStatus)}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild data-testid={`button-view-${booking.id}`}>
                            <Link href={`/customers/${booking.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}