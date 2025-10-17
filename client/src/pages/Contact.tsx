import { useState, FormEvent } from 'react';
import { useLocation } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { SectionReveal } from '@/components/SectionReveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { CONTACT_INFO, BUSINESS_HOURS } from '@shared/contact';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, Calendar,
  Send, Facebook, Instagram, Star
} from 'lucide-react';

export default function Contact() {
  const { isEditMode } = useInlineEdit();
  const [, navigate] = useLocation();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    groupSize: '',
    eventDate: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and phone are required to get started.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Split name into first and last name
      const nameParts = contactForm.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';

      // Create a minimal lead in the backend before redirecting
      const leadPayload = {
        contactInfo: {
          firstName,
          lastName,
          email: contactForm.email,
          phone: contactForm.phone
        },
        eventDetails: {
          eventType: contactForm.eventType || 'general',
          groupSize: contactForm.groupSize ? parseInt(contactForm.groupSize) : undefined,
          eventDate: contactForm.eventDate || undefined,
          message: contactForm.message || undefined
        },
        selectionDetails: {
          cruiseType: contactForm.eventType === 'bachelor' ? 'bachelor' : 
                      contactForm.eventType === 'bachelorette' ? 'bachelorette' : 'private'
        }
      };

      // Submit to backend
      const response = await fetch('/api/leads/quote-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to save contact information');
      }

      // Show success message
      toast({
        title: "Contact Information Saved!",
        description: "Redirecting to quote builder...",
      });

      // Get the lead ID from response
      const responseData = await response.json();
      const leadId = responseData.leadId || responseData.id;

      // Redirect to quote builder with pre-filled data including message
      const params = new URLSearchParams({
        type: contactForm.eventType || 'general',
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
      });
      
      if (contactForm.groupSize) {
        params.set('groupSize', contactForm.groupSize);
      }
      if (contactForm.eventDate) {
        params.set('eventDate', contactForm.eventDate);
      }
      if (contactForm.message) {
        params.set('message', contactForm.message);
      }
      if (leadId) {
        params.set('leadId', leadId);
      }

      setTimeout(() => {
        navigate(`/chat?${params.toString()}`);
      }, 800);
      
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error saving contact information",
        description: `Please call us at ${CONTACT_INFO.phoneFormatted} or try again.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <SEOHead 
        pageRoute="/contact"
        defaultTitle="Contact Us"
        defaultDescription="Book Lake Travis party boats. Call (512) 488-5892. Bachelor parties, corporate events, private charters. Instant quotes available."
        defaultKeywords={[
          'contact premier party cruises',
          'austin boat rental contact',
          'lake travis cruise booking',
          'party boat austin phone',
          '512-488-5892'
        ]}
        schemaType="organization"
      />
      <PublicNavigation />
      <Breadcrumb />
      
      {/* Hero Section */}
      <SectionReveal>
        <section className="relative py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-gray-900 dark:text-white" data-editable data-editable-id="h1-contact-us">
                Contact Premier Party Cruises
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" data-editable data-editable-id="p-contact-tagline">
                Ready to plan your Lake Travis adventure? Let's make it happen!
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Contact Section */}
      <SectionReveal>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-playfair font-bold mb-8 text-center text-gray-900 dark:text-white" data-editable data-editable-id="h2-get-in-touch">
                  Get in Touch
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 mb-12 text-center" data-editable data-editable-id="p-contact-description">
                  Premier Party Cruises has been Austin's original Lake Travis party cruise company for over 14 years. 
                  We're here to help plan your perfect celebration!
                </p>

                <div className="space-y-8">
                  <Card className="p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1" data-editable data-editable-id="contact-call-title">Call Us</h3>
                        <a href={CONTACT_INFO.phoneHref} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors text-base">
                          {CONTACT_INFO.phoneFormatted}
                        </a>
                        <p className="text-sm text-gray-500 mt-1" data-editable data-editable-id="contact-call-hours">Available 9 AM - 8 PM Daily</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1" data-editable data-editable-id="contact-email-title">Email Us</h3>
                        <a href={CONTACT_INFO.emailHref} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors text-base break-all">
                          {CONTACT_INFO.email}
                        </a>
                        <p className="text-sm text-gray-500 mt-1" data-editable data-editable-id="contact-email-response-time">We respond within 24 hours</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1" data-editable data-editable-id="contact-location-title">Location</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-base" data-editable data-editable-id="contact-location-address">Lake Travis, Austin, TX</p>
                        <p className="text-sm text-gray-500 mt-1" data-editable data-editable-id="contact-location-details">Multiple departure points available</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1" data-editable data-editable-id="contact-hours-title">Operating Hours</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-base" data-editable data-editable-id="contact-hours-schedule">Friday & Saturday Cruises</p>
                        <p className="text-sm text-gray-500 mt-1" data-editable data-editable-id="contact-hours-private">Private charters available any day</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Social Media */}
                <div className="mt-12 text-center">
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white mb-6" data-editable data-editable-id="contact-social-title">Follow Our Adventures</h3>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="lg" className="rounded-xl" data-testid="button-facebook">
                      <Facebook className="h-5 w-5 mr-2" />
                      <span data-editable data-editable-id="contact-facebook-button">Facebook</span>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-xl" data-testid="button-instagram">
                      <Instagram className="h-5 w-5 mr-2" />
                      <span data-editable data-editable-id="contact-instagram-button">Instagram</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="p-8 rounded-xl shadow-lg">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-3xl font-playfair font-bold text-center text-gray-900 dark:text-white" data-editable data-editable-id="contact-form-title">
                      Send Us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-base font-semibold" data-editable data-editable-id="form-label-name">Name *</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                            className="mt-2"
                            data-testid="input-contact-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-base font-semibold" data-editable data-editable-id="form-label-email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                            className="mt-2"
                            data-testid="input-contact-email"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="phone" className="text-base font-semibold" data-editable data-editable-id="form-label-phone">Phone *</Label>
                          <Input
                            id="phone"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="mt-2"
                            data-testid="input-contact-phone"
                          />
                        </div>
                        <div>
                          <Label htmlFor="eventType" className="text-base font-semibold" data-editable data-editable-id="form-label-event-type">Event Type</Label>
                          <Input
                            id="eventType"
                            value={contactForm.eventType}
                            onChange={(e) => setContactForm(prev => ({ ...prev, eventType: e.target.value }))}
                            placeholder="Bachelor party, corporate event, etc."
                            className="mt-2"
                            data-testid="input-contact-event-type"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="groupSize" className="text-base font-semibold" data-editable data-editable-id="form-label-group-size">Group Size</Label>
                          <Input
                            id="groupSize"
                            value={contactForm.groupSize}
                            onChange={(e) => setContactForm(prev => ({ ...prev, groupSize: e.target.value }))}
                            placeholder="Number of people"
                            className="mt-2"
                            data-testid="input-contact-group-size"
                          />
                        </div>
                        <div>
                          <Label htmlFor="eventDate" className="text-base font-semibold" data-editable data-editable-id="form-label-event-date">Preferred Date</Label>
                          <Input
                            id="eventDate"
                            type="date"
                            value={contactForm.eventDate}
                            onChange={(e) => setContactForm(prev => ({ ...prev, eventDate: e.target.value }))}
                            className="mt-2"
                            data-testid="input-contact-event-date"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-base font-semibold" data-editable data-editable-id="form-label-message">Message</Label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Tell us about your event and any special requests..."
                          rows={5}
                          className="mt-2"
                          data-testid="input-contact-message"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base py-6 rounded-xl"
                        data-testid="button-send-message"
                      >
                        <Send className="mr-3 h-5 w-5" />
                        <span data-editable data-editable-id="form-send-button">SEND MESSAGE</span>
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Reviews Section */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair font-bold mb-6 text-gray-900 dark:text-white" data-editable data-editable-id="reviews-section-title">
                What Our Customers Say
              </h2>
              <div className="flex justify-center items-center space-x-2 mb-8">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-6 w-6 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white" data-editable data-editable-id="reviews-rating-score">4.9/5</span>
                <span className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="reviews-rating-count">(125,000+ Reviews)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah & Mike",
                  event: "Wedding Party",
                  text: "Premier Party Cruises made our wedding celebration absolutely perfect! The crew was amazing and Lake Travis was stunning."
                },
                {
                  name: "Austin Corp",
                  event: "Corporate Event", 
                  text: "Best team building event we've ever done. Professional service and our employees are still talking about it!"
                },
                {
                  name: "Jessica's Group",
                  event: "Birthday Party",
                  text: "Epic birthday celebration! The ATX Disco Cruise was incredible - dancing on the water with amazing vibes."
                }
              ].map((review, index) => (
                <Card key={index} className="p-6 rounded-xl hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex space-x-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-base text-gray-600 dark:text-gray-300 mb-4 italic" data-editable data-editable-id={`review-${index}-text`}>"{review.text}"</p>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white" data-editable data-editable-id={`review-${index}-name`}>{review.name}</p>
                      <p className="text-sm text-gray-500" data-editable data-editable-id={`review-${index}-event`}>{review.event}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Explore Services Section */}
      <SectionReveal>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold mb-4 text-gray-900 dark:text-white">
                Explore Our Lake Travis Experiences
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Check out our Austin party boat options before you book
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <a href="/bachelor-party-austin" data-testid="link-bachelor-party-contact">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelor Party Boat Austin</CardTitle>
                    <p className="text-base text-gray-600 dark:text-gray-400">Ultimate bachelor party cruises on Lake Travis with everything included</p>
                  </CardHeader>
                </Card>
              </a>

              <a href="/bachelorette-party-austin" data-testid="link-bachelorette-party-contact">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelorette Austin Cruise</CardTitle>
                    <p className="text-base text-gray-600 dark:text-gray-400">Premier bachelorette party boats - Our specialty since 2009</p>
                  </CardHeader>
                </Card>
              </a>

              <a href="/party-boat-lake-travis" data-testid="link-party-boat-contact">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Lake Travis Party Boats</CardTitle>
                    <p className="text-base text-gray-600 dark:text-gray-400">Premium Austin party boats for unforgettable celebrations</p>
                  </CardHeader>
                </Card>
              </a>

              <a href="/private-cruises" data-testid="link-private-cruises-contact">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Private Boat Rentals Austin</CardTitle>
                    <p className="text-base text-gray-600 dark:text-gray-400">Exclusive private Lake Travis cruises for your group</p>
                  </CardHeader>
                </Card>
              </a>

              <a href="/" data-testid="link-home-contact">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">View All Services</CardTitle>
                    <p className="text-base text-gray-600 dark:text-gray-400">Explore our complete party cruise lineup and packages</p>
                  </CardHeader>
                </Card>
              </a>

              <a href="/gallery" data-testid="link-gallery-contact">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Photo Gallery</CardTitle>
                    <p className="text-base text-gray-600 dark:text-gray-400">See real photos from our Austin party boat cruises</p>
                  </CardHeader>
                </Card>
              </a>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* SEO-Optimized Hidden Content for Search Engines */}
      <div className="sr-only" itemScope itemType="https://schema.org/LocalBusiness">
        <h2 itemProp="name">Premier Party Cruises</h2>
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <p>
            <span itemProp="streetAddress">Anderson Mill Marina</span>,
            <span itemProp="addressLocality">Lake Travis</span>,
            <span itemProp="addressRegion">Austin</span>,
            <span itemProp="addressRegion">TX</span>
          </p>
        </div>
        <p itemProp="telephone">{CONTACT_INFO.phone}</p>
        <p itemProp="email">{CONTACT_INFO.email}</p>
        <div itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
          <p itemProp="name">ATX Disco Cruises</p>
          <p itemProp="name">Private Boat Charters</p>
          <p itemProp="name">Bachelor Party Cruises</p>
          <p itemProp="name">Bachelorette Party Boats</p>
          <p itemProp="name">Corporate Events on Lake Travis</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
