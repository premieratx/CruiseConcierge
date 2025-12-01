import { useState, useEffect, useMemo } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
const logoPath = '/attached_assets/PPC-Logo-LARGE.webp';
import { 
  CheckCircle, Calendar, Users, Ship, Clock, Mail, Phone, 
  DollarSign, MapPin, Star, Download, Share2, ArrowRight,
  Heart, Sparkles, AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { formatTimeForDisplay } from "@shared/timeSlots";
import { formatCurrency, formatDate, formatDateTime, formatLongDate } from '@shared/formatters';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Use shared formatCurrency from formatters

export default function BookingSuccess() {
  const [, params] = useRoute("/booking-success");
  const quoteId = new URLSearchParams(window.location.search).get('quote_id');
  const bookingRef = new URLSearchParams(window.location.search).get('booking_ref');
  
  // Fetch quote details if available
  const { data: quote, isLoading: quoteLoading, error: quoteError } = useQuery({
    queryKey: [`/api/quotes/${quoteId}`],
    queryFn: async () => {
      if (!quoteId) return null;
      const response = await fetch(`/api/quotes/${quoteId}`);
      if (!response.ok) throw new Error('Failed to fetch quote');
      return await response.json();
    },
    enabled: !!quoteId,
    retry: 3,
  });

  // Fetch project and contact details if we have a quote
  const { data: projectData, isLoading: projectLoading } = useQuery({
    queryKey: [`/api/projects/${quote?.projectId}`, quote?.projectId],
    queryFn: async () => {
      if (!quote?.projectId) return null;
      
      const [projectResponse, contactResponse] = await Promise.all([
        fetch(`/api/projects/${quote.projectId}`),
        quote.projectId ? fetch(`/api/contacts/${quote.projectId}`).then(r => r.ok ? r.json() : null) : Promise.resolve(null)
      ]);
      
      if (!projectResponse.ok) throw new Error('Failed to fetch project');
      const project = await projectResponse.json();
      
      // Fetch contact separately using project.contactId
      let contact = null;
      if (project.contactId) {
        try {
          const contactResp = await fetch(`/api/contacts/${project.contactId}`);
          if (contactResp.ok) {
            contact = await contactResp.json();
          }
        } catch (err) {
          console.warn('Could not fetch contact details:', err);
        }
      }
      
      return { project, contact };
    },
    enabled: !!quote?.projectId,
    retry: 3,
  });

  // Extract booking details from available data
  const bookingDetails = useMemo(() => {
    const project = projectData?.project;
    const contact = projectData?.contact;
    
    // Generate booking ID from quote or booking reference
    const bookingId = bookingRef || 
                     (quoteId ? `BOOK-${quoteId.slice(-8).toUpperCase()}` : 
                     `BOOK-${Date.now().toString().slice(-8)}`);
    
    return {
      id: bookingId,
      quoteId: quoteId || "N/A",
      customerName: contact?.name || "Valued Customer",
      customerEmail: contact?.email || "",
      customerPhone: contact?.phone || "",
      eventType: project?.eventType || "Cruise Event",
      date: project?.projectDate ? new Date(project.projectDate).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0],
      startTime: quote?.startTime || "14:00",
      endTime: quote?.endTime || "18:00",
      groupSize: project?.groupSize || 20,
      boatName: quote?.boatName || "Premier Cruise Vessel",
      totalAmount: quote?.total || 150000,
      depositPaid: quote?.depositAmount || 37500,
      actualAmountPaid: quote?.depositAmount || 37500,
      status: 'confirmed',
      cruiseType: quote?.cruiseType || 'private',
      bookingRef: bookingRef,
      paymentStatus: 'completed'
    };
  }, [quote, projectData, quoteId, bookingRef]);

  const isLoading = quoteLoading || projectLoading;
  const hasError = quoteError && quoteId; // Only show error if we have quoteId but failed to fetch

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900">
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-12 w-auto"
                data-testid="img-logo"
              />
              <div>
                <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Loading Booking Details...
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Please wait while we retrieve your confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Retrieving your booking confirmation details...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if we failed to fetch critical data
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900">
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-12 w-auto"
                data-testid="img-logo"
              />
              <div>
                <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
                  Booking Confirmation Issue
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Having trouble retrieving your booking details
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
            <CardContent className="p-8 text-center">
              <div className="text-red-500 mb-4">
                <AlertCircle className="h-16 w-16 mx-auto" />
              </div>
              
              <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4">
                Unable to Load Booking Details
              </h2>
              
              <p className="text-red-600 dark:text-red-400 mb-6">
                We're having trouble retrieving your booking confirmation. Don't worry - your payment was processed successfully.
              </p>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6">
                {quoteId && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Quote ID:</strong> {quoteId}
                  </p>
                )}
                {bookingRef && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Booking Reference:</strong> {bookingRef}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline"
                  data-testid="button-retry"
                >
                  Try Again
                </Button>
                <Button 
                  onClick={() => window.location.href = `mailto:clientservices@premierpartycruises.com?subject=Booking Confirmation Issue&body=Please help me with my booking confirmation. Quote ID: ${quoteId || 'N/A'}`}
                  data-testid="button-contact"
                >
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-12 w-auto"
                data-testid="img-logo"
              />
              <div>
                <h1 className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="text-page-title">
                  Booking Confirmed!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm" data-testid="text-page-subtitle">
                  Thank you for choosing Premier Party Cruises
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="space-y-8"
        >
          {/* Success Message */}
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-4" data-testid="text-success-title">
                Your Cruise is Confirmed!
              </h2>
              
              <p className="text-lg text-green-600 dark:text-green-400 mb-6" data-testid="text-success-message">
                We've received your booking and sent confirmation details to your email.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-green-100 text-green-700 border-green-300 px-4 py-2 text-sm" data-testid="badge-booking-id">
                  Booking ID: {bookingDetails.id}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 border-blue-300 px-4 py-2 text-sm" data-testid="badge-quote-id">
                  Quote ID: {bookingDetails.quoteId}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" data-testid="text-event-details-title">
                  <Calendar className="h-5 w-5" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium" data-testid="text-event-type">{bookingDetails.eventType}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-event-date">
                      {format(new Date(bookingDetails.date), 'EEEE, MMMM d, yyyy')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium" data-testid="text-event-time">
                      {formatTimeForDisplay(bookingDetails.startTime)} - {formatTimeForDisplay(bookingDetails.endTime)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">4-hour cruise experience</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium" data-testid="text-group-size">{bookingDetails.groupSize} guests</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Perfect group size</div>
                  </div>
                </div>

                {bookingDetails.cruiseType === 'private' && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <Ship className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium" data-testid="text-boat-name">{bookingDetails.boatName}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Your private vessel</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact & Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" data-testid="text-payment-details-title">
                  <DollarSign className="h-5 w-5" />
                  Payment & Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium" data-testid="text-deposit-label">Amount Paid</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400" data-testid="text-deposit-amount">
                      {formatCurrency(bookingDetails.actualAmountPaid)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                    <span>Balance Due (day of cruise)</span>
                    <span data-testid="text-balance-due">
                      {formatCurrency(Math.max(0, bookingDetails.totalAmount - bookingDetails.actualAmountPaid))}
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-green-200 dark:border-green-700">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Cruise Price</span>
                      <span data-testid="text-total-price">{formatCurrency(bookingDetails.totalAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm" data-testid="text-customer-email">{bookingDetails.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm" data-testid="text-customer-phone">{bookingDetails.customerPhone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-next-steps-title">
                <Star className="h-5 w-5" />
                What Happens Next?
              </CardTitle>
              <CardDescription data-testid="text-next-steps-description">
                Here's what to expect before your cruise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2" data-testid="text-step1-title">Confirmation Email</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-step1-description">
                    You'll receive a detailed confirmation email with boarding instructions and contact information.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2" data-testid="text-step2-title">Pre-Cruise Call</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-step2-description">
                    Our team will call you 24-48 hours before your cruise to confirm details and answer questions.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2" data-testid="text-step3-title">Cruise Day</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-step3-description">
                    Arrive 15 minutes early for boarding. Get ready for an unforgettable experience on Lake Travis!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="flex items-center gap-2"
              data-testid="button-view-quote"
              onClick={() => window.open(`/quote/${bookingDetails.quoteId}`, '_blank')}
            >
              <Download className="h-4 w-4" />
              View Full Quote
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="flex items-center gap-2"
              data-testid="button-share"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'My Premier Party Cruise Booking',
                    text: `I just booked a cruise with Premier Party Cruises for ${format(new Date(bookingDetails.date), 'MMMM d, yyyy')}!`,
                    url: window.location.href
                  });
                }
              }}
            >
              <Share2 className="h-4 w-4" />
              Share the Excitement
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="flex items-center gap-2"
              data-testid="button-book-another"
              onClick={() => window.location.href = '/chat'}
            >
              <ArrowRight className="h-4 w-4" />
              Book Another Cruise
            </Button>
          </div>

          {/* Contact Information */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-4" data-testid="text-contact-title">Questions About Your Booking?</h3>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span data-testid="text-contact-phone">(512) 488-5892</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span data-testid="text-contact-email">clientservices@premierpartycruises.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span data-testid="text-contact-location">Lake Travis, Austin, TX</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}