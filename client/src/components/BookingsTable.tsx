import { useState, useMemo, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ChevronUp, ChevronDown, Calendar, DollarSign, Users, Ship, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDateTime, formatCustomerName, formatPhoneNumber } from '@shared/formatters';
import { BOOKING_STATUSES, PAYMENT_STATUSES, STATUS_COLORS } from '@shared/constants';

// TypeScript interface for comprehensive booking data from API
export interface ComprehensiveBooking {
  id: string;
  cruiseDate: string | Date;
  contactName: string;
  contactEmail: string;
  partySize: number;
  boatAssigned: string;
  totalAmount: number;
  amountPaid: number;
  amountOwed: number;
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid';
  bookingStatus: string;
  eventType: string;
  startTime: string | Date;
  endTime: string | Date;
  projectId?: string;
  quoteId?: string;
}

// Sorting configuration
type SortKey = keyof ComprehensiveBooking;
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

interface BookingsTableProps {
  startDate?: Date;
  endDate?: Date;
  className?: string;
}

// Use shared formatting utilities and status colors

// Helper function to get payment status color using shared constants
const getPaymentStatusColor = (status: string) => {
  const normalizedStatus = status.toLowerCase();
  switch (normalizedStatus) {
    case 'paid':
      return STATUS_COLORS.SUCCESS;
    case 'partial':
      return STATUS_COLORS.WARNING;
    case 'unpaid':
      return STATUS_COLORS.DANGER;
    default:
      return STATUS_COLORS.NEUTRAL;
  }
};

// Helper function to get booking status color using shared constants
const getBookingStatusColor = (status: string) => {
  const normalizedStatus = status.toLowerCase();
  switch (normalizedStatus) {
    case 'confirmed':
    case 'booked':
      return STATUS_COLORS.INFO;
    case 'hold':
      return STATUS_COLORS.WARNING;
    case 'blocked':
      return STATUS_COLORS.NEUTRAL;
    case 'canceled':
    case 'cancelled':
      return STATUS_COLORS.DANGER;
    default:
      return STATUS_COLORS.NEUTRAL;
  }
};

export function BookingsTable({ startDate, endDate, className }: BookingsTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'cruiseDate', direction: 'desc' });
  const { toast } = useToast();

  // Build query parameters
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (startDate) {
      params.append('startDate', startDate.toISOString());
    }
    if (endDate) {
      params.append('endDate', endDate.toISOString());
    }
    return params.toString();
  }, [startDate, endDate]);

  // Fetch comprehensive booking data
  const { data: bookings = [], isLoading, error, refetch } = useQuery<ComprehensiveBooking[]>({
    queryKey: ['/api/bookings/comprehensive', queryParams],
    queryFn: async () => {
      const url = `/api/bookings/comprehensive${queryParams ? `?${queryParams}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch booking data');
      }
      return response.json();
    },
  });

  // Sort bookings based on current sort configuration
  const sortedBookings = useMemo(() => {
    if (!bookings.length) return [];

    return [...bookings].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle date sorting
      if (sortConfig.key === 'cruiseDate' || sortConfig.key === 'startTime' || sortConfig.key === 'endTime') {
        const aDate = new Date(aValue as string).getTime();
        const bDate = new Date(bValue as string).getTime();
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }

      // Handle numeric sorting
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle string sorting
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [bookings, sortConfig]);

  // Handle column header click for sorting
  const handleSort = (key: SortKey) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Render sort icon
  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortConfig.key !== column) {
      return <ChevronUp className="ml-1 h-3 w-3 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="ml-1 h-3 w-3 text-gray-700 dark:text-gray-300" />
      : <ChevronDown className="ml-1 h-3 w-3 text-gray-700 dark:text-gray-300" />;
  };

  // Handle error state with useEffect to avoid render loop
  useEffect(() => {
    if (error) {
      toast({
        title: "Error Loading Bookings",
        description: "Failed to load booking data. Please try again.",
        variant: "destructive",
      });
    }
  }, [error]);

  return (
    <Card className={cn("w-full", className)} data-testid="bookings-table">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg font-semibold">
              Confirmed Bookings
            </CardTitle>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Ship className="h-4 w-4" />
              <span>{sortedBookings.length} bookings</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetch()}
              disabled={isLoading}
              data-testid="button-refresh"
            >
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-muted/50">
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/70 px-4 py-3"
                  onClick={() => handleSort('cruiseDate')}
                  data-testid="header-cruise-date"
                >
                  <div className="flex items-center font-medium">
                    Cruise Date
                    <SortIcon column="cruiseDate" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/70 px-4 py-3"
                  onClick={() => handleSort('contactName')}
                  data-testid="header-contact-name"
                >
                  <div className="flex items-center font-medium">
                    Contact
                    <SortIcon column="contactName" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/70 px-4 py-3"
                  onClick={() => handleSort('partySize')}
                  data-testid="header-party-size"
                >
                  <div className="flex items-center font-medium">
                    <Users className="h-4 w-4 mr-1" />
                    Party Size
                    <SortIcon column="partySize" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/70 px-4 py-3"
                  onClick={() => handleSort('boatAssigned')}
                  data-testid="header-boat-assigned"
                >
                  <div className="flex items-center font-medium">
                    <Ship className="h-4 w-4 mr-1" />
                    Boat
                    <SortIcon column="boatAssigned" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/70 px-4 py-3"
                  onClick={() => handleSort('totalAmount')}
                  data-testid="header-total-amount"
                >
                  <div className="flex items-center font-medium">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Total
                    <SortIcon column="totalAmount" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/70 px-4 py-3"
                  onClick={() => handleSort('amountPaid')}
                  data-testid="header-amount-paid"
                >
                  <div className="flex items-center font-medium">
                    Paid
                    <SortIcon column="amountPaid" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/70 px-4 py-3"
                  onClick={() => handleSort('amountOwed')}
                  data-testid="header-amount-owed"
                >
                  <div className="flex items-center font-medium">
                    Owed
                    <SortIcon column="amountOwed" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/70 px-4 py-3"
                  onClick={() => handleSort('paymentStatus')}
                  data-testid="header-payment-status"
                >
                  <div className="flex items-center font-medium">
                    Payment Status
                    <SortIcon column="paymentStatus" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/70 px-4 py-3"
                  onClick={() => handleSort('bookingStatus')}
                  data-testid="header-booking-status"
                >
                  <div className="flex items-center font-medium">
                    Status
                    <SortIcon column="bookingStatus" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {isLoading ? (
                // Loading skeleton rows
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 9 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex} className="px-4 py-3">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : sortedBookings.length === 0 ? (
                // Empty state
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Calendar className="h-8 w-8" />
                      <p className="text-sm">No bookings found for the selected date range</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                // Data rows
                sortedBookings.map((booking) => (
                  <TableRow 
                    key={booking.id} 
                    className="hover:bg-muted/30 transition-colors"
                    data-testid={`row-booking-${booking.id}`}
                  >
                    <TableCell className="px-4 py-3" data-testid={`cell-cruise-date-${booking.id}`}>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {format(new Date(booking.cruiseDate), 'MMM dd, yyyy')}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(new Date(booking.startTime), 'h:mm a')} - {format(new Date(booking.endTime), 'h:mm a')}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell className="px-4 py-3" data-testid={`cell-contact-${booking.id}`}>
                      <div className="flex flex-col">
                        <span className="font-medium">{booking.contactName}</span>
                        <span className="text-xs text-muted-foreground">{booking.contactEmail}</span>
                        <span className="text-xs text-blue-600">{booking.eventType}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell className="px-4 py-3 text-center" data-testid={`cell-party-size-${booking.id}`}>
                      <Badge variant="outline" className="font-mono">
                        {booking.partySize}
                      </Badge>
                    </TableCell>
                    
                    <TableCell className="px-4 py-3" data-testid={`cell-boat-${booking.id}`}>
                      <span className="font-medium">{booking.boatAssigned}</span>
                    </TableCell>
                    
                    <TableCell className="px-4 py-3 font-mono" data-testid={`cell-total-${booking.id}`}>
                      {formatCurrency(booking.totalAmount)}
                    </TableCell>
                    
                    <TableCell className="px-4 py-3 font-mono text-green-600" data-testid={`cell-paid-${booking.id}`}>
                      {formatCurrency(booking.amountPaid)}
                    </TableCell>
                    
                    <TableCell className="px-4 py-3 font-mono text-red-600" data-testid={`cell-owed-${booking.id}`}>
                      {formatCurrency(booking.amountOwed)}
                    </TableCell>
                    
                    <TableCell className="px-4 py-3" data-testid={`cell-payment-status-${booking.id}`}>
                      <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                        {booking.paymentStatus}
                      </Badge>
                    </TableCell>
                    
                    <TableCell className="px-4 py-3" data-testid={`cell-booking-status-${booking.id}`}>
                      <Badge className={getBookingStatusColor(booking.bookingStatus)}>
                        {booking.bookingStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Summary footer */}
        {sortedBookings.length > 0 && !isLoading && (
          <div className="border-t bg-muted/20 px-4 py-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>{sortedBookings.length} total bookings</span>
                <span>
                  {sortedBookings.reduce((sum, booking) => sum + booking.partySize, 0)} total guests
                </span>
              </div>
              <div className="flex items-center gap-4 font-medium">
                <span className="text-green-600">
                  Paid: {formatCurrency(sortedBookings.reduce((sum, booking) => sum + booking.amountPaid, 0))}
                </span>
                <span className="text-red-600">
                  Owed: {formatCurrency(sortedBookings.reduce((sum, booking) => sum + booking.amountOwed, 0))}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}