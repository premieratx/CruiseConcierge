import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO, isValid } from 'date-fns';
import { 
  Ship, Calendar, Users, Clock, DollarSign, 
  AlertCircle, Loader2, ExternalLink, Copy, CheckCircle,
  Mail, Phone, User, MapPin, Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { TimeSlotList } from '@/components/TimeSlotList';
import { useAvailabilityForDate, formatDateForAvailability } from '@/hooks/use-availability';
import { formatCurrency, formatDate, formatLongDate, formatTimeForDisplay } from '@shared/formatters';
import { EVENT_TYPES } from '@shared/constants';
import logoPath from '@assets/PPC-Logo-LARGE.webp';

interface QuoteViewerProps {}

interface PublicQuoteData {
  quote: {
    id: string;
    contactInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    eventDetails: {
      eventType: string;
      eventTypeLabel: string;
      eventEmoji: string;
      eventDate: string;
      groupSize: number;
      specialRequests?: string;
    };
    selectionDetails: {
      cruiseType: 'private' | 'disco';
      selectedSlot?: any;
      discoPackage?: string;
      duration?: number;
      preferences?: any;
    };
    pricingDetails: {
      subtotal: number;
      tax: number;
      total: number;
      items: Array<{
        name: string;
        quantity: number;
        price: number;
        total: number;
      }>;
    };
  };
  leadData?: any;
  timestamp: string;
}

export default function QuoteViewer({}: QuoteViewerProps) {
  const params = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Extract token from URL path (/quote/:token)
  const token = params.token;

  // Fetch quote data using the token
  const { 
    data: quoteData, 
    isLoading, 
    error,
    isError 
  } = useQuery<PublicQuoteData>({
    queryKey: ['/api/quotes/public', token],
    queryFn: async () => {
      if (!token) throw new Error('No quote token provided');
      
      const response = await fetch(`/api/quotes/public/${token}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to load quote: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!token,
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Parse event date for availability lookup
  const eventDate = quoteData?.quote?.eventDetails?.eventDate 
    ? parseISO(quoteData.quote.eventDetails.eventDate) 
    : undefined;

  // Fetch real-time availability for the quote date
  const { 
    data: availabilityData, 
    isLoading: availabilityLoading 
  } = useAvailabilityForDate(
    eventDate ? formatDateForAvailability(eventDate) : '',
    quoteData?.quote?.selectionDetails?.cruiseType,
    quoteData?.quote?.eventDetails?.groupSize || 1,
    quoteData?.quote?.selectionDetails?.duration
  );

  // Get event type configuration
  const eventTypeConfig = quoteData?.quote?.eventDetails?.eventType 
    ? EVENT_TYPES[quoteData.quote.eventDetails.eventType]
    : null;

  // Copy quote link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Link Copied",
        description: "Quote link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-lg text-gray-600 dark:text-gray-300">Loading your quote...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError || !quoteData || !token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error instanceof Error ? error.message : 'Unable to load quote. The link may be expired or invalid.'}
              </AlertDescription>
            </Alert>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <Ship className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Quote Not Found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  This quote link appears to be invalid or expired. Please request a new quote.
                </p>
                <Button onClick={() => navigate('/chat')} data-testid="button-request-new-quote">
                  Request New Quote
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const { quote } = quoteData;
  const { contactInfo, eventDetails, selectionDetails, pricingDetails } = quote;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <img src={logoPath} alt="Premier Party Cruises" className="h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" data-testid="text-quote-title">
              Your Cruise Quote
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Quote generated on {format(new Date(quoteData.timestamp), 'MMMM d, yyyy')}
            </p>
            
            {/* Copy Link Button */}
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyLink}
                data-testid="button-copy-quote-link"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Quote Link
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span data-testid="text-contact-name">
                    {contactInfo.firstName} {contactInfo.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span data-testid="text-contact-email">{contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span data-testid="text-contact-phone">{contactInfo.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Event Type</div>
                  <div className="flex items-center gap-2" data-testid="text-event-type">
                    <span className="text-2xl">{eventDetails.eventEmoji}</span>
                    <span className="font-medium">{eventDetails.eventTypeLabel}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Date</div>
                  <div className="font-medium" data-testid="text-event-date">
                    {eventDate ? formatLongDate(eventDate) : 'Date not specified'}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Group Size</div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="font-medium" data-testid="text-group-size">
                      {eventDetails.groupSize} {eventDetails.groupSize === 1 ? 'guest' : 'guests'}
                    </span>
                  </div>
                </div>
              </div>
              
              {eventDetails.specialRequests && (
                <div className="mt-6">
                  <div className="text-sm text-gray-500 mb-1">Special Requests</div>
                  <p className="text-gray-700 dark:text-gray-300" data-testid="text-special-requests">
                    {eventDetails.specialRequests}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cruise Selection Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                Cruise Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Cruise Type</div>
                  <Badge variant={selectionDetails.cruiseType === 'private' ? 'default' : 'secondary'} className="text-sm">
                    {selectionDetails.cruiseType === 'private' ? '🛥️ Private Cruise' : '🎉 Disco Cruise'}
                  </Badge>
                </div>
                
                {selectionDetails.discoPackage && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Package</div>
                    <div className="font-medium capitalize" data-testid="text-disco-package">
                      {selectionDetails.discoPackage.replace('_', ' ')}
                    </div>
                  </div>
                )}
                
                {selectionDetails.duration && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Duration</div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium" data-testid="text-duration">
                        {selectionDetails.duration} hours
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Available Time Slots */}
          {eventDate && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Available Time Slots
                  <div className="text-sm text-gray-500 font-normal">
                    for {formatDate(eventDate)}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {availabilityLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading available time slots...</span>
                  </div>
                ) : (
                  <TimeSlotList 
                    slots={availabilityData?.slots || []}
                    onSlotSelect={(slot) => {
                      // Handle slot selection for booking
                      console.log('Selected slot:', slot);
                      // Could navigate to booking flow with pre-filled data
                    }}
                    selectedSlotId={selectionDetails.selectedSlot?.id}
                    showDate={false} // Date is already shown in card header
                    showPrice={true}
                    showCapacity={true}
                    groupSize={eventDetails.groupSize}
                  />
                )}
              </CardContent>
            </Card>
          )}

          {/* Pricing Breakdown */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pricingDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      {item.quantity > 1 && (
                        <span className="text-gray-500 ml-2">x{item.quantity}</span>
                      )}
                    </div>
                    <span data-testid={`text-item-total-${index}`}>
                      {formatCurrency(item.total)}
                    </span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between items-center text-sm">
                  <span>Subtotal</span>
                  <span data-testid="text-subtotal">{formatCurrency(pricingDetails.subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span>Tax</span>
                  <span data-testid="text-tax">{formatCurrency(pricingDetails.tax)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span data-testid="text-total">{formatCurrency(pricingDetails.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/chat')} 
              variant="outline"
              data-testid="button-modify-quote"
            >
              Modify Quote
            </Button>
            
            <Button 
              onClick={() => {
                // Handle booking - could navigate to booking flow with quote data
                console.log('Proceed with booking for quote:', quote.id);
                // Navigate to chat with quote data pre-filled for booking
                navigate(`/chat?quote=${token}`);
              }}
              data-testid="button-book-now"
            >
              Book This Cruise
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>Questions? Contact us at (512) 488-5892 or clientservices@premierpartycruises.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}