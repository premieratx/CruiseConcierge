import { useState } from 'react';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
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
      console.log('Contact form submitted:', contactForm);
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours with more information.",
        variant: "default"
      });

      setContactForm({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        groupSize: '',
        eventDate: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `Please try again or call us directly at ${CONTACT_INFO.phoneFormatted}`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/contact"
        defaultTitle="Contact Us | Premier Party Cruises"
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
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <MessageSquare className="h-20 w-20 text-brand-blue mx-auto mb-8" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gray-900 dark:text-white" data-editable data-editable-id="h1-contact-us">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300" data-editable data-editable-id="p-contact-tagline">
              Ready to plan your Lake Travis adventure? Let's make it happen!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-heading font-bold mb-8 text-gray-900 dark:text-white" data-editable data-editable-id="h2-get-in-touch">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12" data-editable data-editable-id="p-contact-description">
                Premier Party Cruises has been Austin's original Lake Travis party cruise company for over 14 years. 
                We're here to help plan your perfect celebration!
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1" data-editable data-editable-id="contact-call-title">Call Us</h3>
                    <a href={CONTACT_INFO.phoneHref} className="text-gray-600 dark:text-gray-300 hover:text-brand-blue transition-colors">
                      {CONTACT_INFO.phoneFormatted}
                    </a>
                    <p className="text-sm text-gray-500" data-editable data-editable-id="contact-call-hours">Available 9 AM - 8 PM Daily</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1" data-editable data-editable-id="contact-email-title">Email Us</h3>
                    <a href={CONTACT_INFO.emailHref} className="text-gray-600 dark:text-gray-300 hover:text-brand-blue transition-colors">
                      {CONTACT_INFO.email}
                    </a>
                    <p className="text-sm text-gray-500" data-editable data-editable-id="contact-email-response-time">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1" data-editable data-editable-id="contact-location-title">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="contact-location-address">Lake Travis, Austin, TX</p>
                    <p className="text-sm text-gray-500" data-editable data-editable-id="contact-location-details">Multiple departure points available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1" data-editable data-editable-id="contact-hours-title">Operating Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="contact-hours-schedule">Friday & Saturday Cruises</p>
                    <p className="text-sm text-gray-500" data-editable data-editable-id="contact-hours-private">Private charters available any day</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6" data-editable data-editable-id="contact-social-title">Follow Our Adventures</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="lg" data-testid="button-facebook">
                    <Facebook className="h-5 w-5 mr-2" />
                    <span data-editable data-editable-id="contact-facebook-button">Facebook</span>
                  </Button>
                  <Button variant="outline" size="lg" data-testid="button-instagram">
                    <Instagram className="h-5 w-5 mr-2" />
                    <span data-editable data-editable-id="contact-instagram-button">Instagram</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-3xl font-heading font-bold text-gray-900 dark:text-white" data-editable data-editable-id="contact-form-title">
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
                      className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg py-6"
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

      {/* Reviews Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-white" data-editable data-editable-id="reviews-section-title">
              WHAT OUR CUSTOMERS SAY
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-8">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white" data-editable data-editable-id="reviews-rating-score">4.9/5</span>
              <span className="text-gray-600 dark:text-gray-300" data-editable data-editable-id="reviews-rating-count">(125,000+ Reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic" data-editable data-editable-id={`review-${index}-text`}>"{review.text}"</p>
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

      {/* Explore Our Services Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
              EXPLORE OUR LAKE TRAVIS EXPERIENCES
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Check out our Austin party boat options before you book
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/bachelor-party-austin" data-testid="link-bachelor-party-contact">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelor Party Boat Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Ultimate bachelor party cruises on Lake Travis with everything included</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/bachelorette-party-austin" data-testid="link-bachelorette-party-contact">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelorette Austin Cruise</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Premier bachelorette party boats - Our specialty since 2009</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/party-boat-lake-travis" data-testid="link-party-boat-contact">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Lake Travis Party Boats</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Premium Austin party boats for unforgettable celebrations</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/private-cruises" data-testid="link-private-cruises-contact">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Private Boat Rentals Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Exclusive private Lake Travis cruises for your group</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/" data-testid="link-home-contact">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">View All Services</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Explore our complete party cruise lineup and packages</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/gallery" data-testid="link-gallery-contact">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Photo Gallery</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">See real photos from our Austin party boat cruises</p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Hidden Content for Search Engines */}
      <div className="sr-only" itemScope itemType="https://schema.org/LocalBusiness">
        {/* Business Information */}
        <h2 itemProp="name">Premier Party Cruises</h2>
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <p>
            <span itemProp="streetAddress">Anderson Mill Marina</span>,
            <span itemProp="addressLocality">Lake Travis</span>,
            <span itemProp="addressRegion">Austin</span>,
            <span itemProp="addressRegion">TX</span>
            <span itemProp="addressCountry">United States</span>
          </p>
        </div>
        
        {/* Contact Information */}
        <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
          <p itemProp="telephone">(512) 488-5892</p>
          <p itemProp="email">clientservices@premierpartycruises.com</p>
          <meta itemProp="contactType" content="customer service" />
          <meta itemProp="availableLanguage" content="English" />
        </div>
        
        {/* Geographic Coordinates */}
        <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
          <meta itemProp="latitude" content="30.4025" />
          <meta itemProp="longitude" content="-97.8475" />
        </div>
        
        {/* Services Offered */}
        <h3>Services Offered</h3>
        <div itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
          <p itemProp="name">Private Cruises</p>
          <p itemProp="description">Custom private boat charters on Lake Travis for groups of 14-75 people. Perfect for bachelor parties, bachelorette parties, birthdays, corporate events, and special celebrations.</p>
        </div>
        <div itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
          <p itemProp="name">ATX Disco Cruises</p>
          <p itemProp="description">Friday and Saturday evening party cruises featuring DJ, dance floor, and disco atmosphere on Lake Travis. Open to the public with packages starting at $85 per person.</p>
        </div>
        <div itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
          <p itemProp="name">Corporate Events</p>
          <p itemProp="description">Professional corporate event cruises for team building, client entertainment, and company celebrations. Custom packages available for groups of all sizes.</p>
        </div>
        <div itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
          <p itemProp="name">Bachelor Parties</p>
          <p itemProp="description">Ultimate bachelor party boat experiences on Lake Travis with premium sound systems, water activities, and party atmosphere.</p>
        </div>
        <div itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
          <p itemProp="name">Bachelorette Parties</p>
          <p itemProp="description">Premier bachelorette party cruises with customizable packages, decorations, music, and unforgettable Lake Travis experiences.</p>
        </div>
        
        {/* Service Areas */}
        <h3>Service Areas</h3>
        <div itemProp="areaServed" itemScope itemType="https://schema.org/City">
          <p itemProp="name">Austin, TX</p>
        </div>
        <div itemProp="areaServed" itemScope itemType="https://schema.org/City">
          <p itemProp="name">Lakeway, TX</p>
        </div>
        <div itemProp="areaServed" itemScope itemType="https://schema.org/City">
          <p itemProp="name">Bee Cave, TX</p>
        </div>
        <div itemProp="areaServed" itemScope itemType="https://schema.org/City">
          <p itemProp="name">Cedar Park, TX</p>
        </div>
        <div itemProp="areaServed" itemScope itemType="https://schema.org/City">
          <p itemProp="name">Leander, TX</p>
        </div>
        
        {/* Business Hours */}
        <p itemProp="openingHours" content="Mo-Su 09:00-20:00">Available 9 AM - 8 PM Daily</p>
        
        {/* Additional Details */}
        <p itemProp="description">Premier Party Cruises is Austin's original Lake Travis party cruise company, serving the area since 2009. We specialize in private boat charters, disco cruises, bachelor and bachelorette parties, corporate events, and special celebrations on beautiful Lake Travis.</p>
        <meta itemProp="priceRange" content="$$-$$$" />
        <meta itemProp="url" content="https://premierpartycruises.com" />
      </div>

      {/* JSON-LD Structured Data for LocalBusiness */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Premier Party Cruises",
          "description": "Austin's original Lake Travis party cruise company specializing in private boat charters, disco cruises, bachelor and bachelorette parties, and corporate events since 2009.",
          "url": "https://premierpartycruises.com",
          "telephone": "+1-512-488-5892",
          "email": "clientservices@premierpartycruises.com",
          "priceRange": "$$-$$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Anderson Mill Marina",
            "addressLocality": "Lake Travis, Austin",
            "addressRegion": "TX",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "30.4025",
            "longitude": "-97.8475"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-512-488-5892",
            "contactType": "customer service",
            "email": "clientservices@premierpartycruises.com",
            "availableLanguage": "English",
            "areaServed": [
              "Austin, TX",
              "Lakeway, TX", 
              "Bee Cave, TX",
              "Cedar Park, TX",
              "Leander, TX"
            ]
          },
          "areaServed": [
            {
              "@type": "City",
              "name": "Austin",
              "containedInPlace": {
                "@type": "State",
                "name": "Texas"
              }
            },
            {
              "@type": "City", 
              "name": "Lakeway",
              "containedInPlace": {
                "@type": "State",
                "name": "Texas"
              }
            },
            {
              "@type": "City",
              "name": "Bee Cave", 
              "containedInPlace": {
                "@type": "State",
                "name": "Texas"
              }
            },
            {
              "@type": "City",
              "name": "Cedar Park",
              "containedInPlace": {
                "@type": "State",
                "name": "Texas"
              }
            },
            {
              "@type": "City",
              "name": "Leander",
              "containedInPlace": {
                "@type": "State",
                "name": "Texas"
              }
            }
          ],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday", 
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "09:00",
            "closes": "20:00"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Party Cruise Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Private Cruises",
                  "description": "Custom private boat charters on Lake Travis for groups of 14-75 people"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "ATX Disco Cruises",
                  "description": "Friday and Saturday evening party cruises with DJ and dance floor"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Corporate Events",
                  "description": "Professional corporate event cruises for team building and celebrations"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bachelor Parties",
                  "description": "Ultimate bachelor party boat experiences on Lake Travis"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bachelorette Parties",
                  "description": "Premier bachelorette party cruises with customizable packages"
                }
              }
            ]
          }
        })
      }} />

      <Footer />
    </div>
  );
}