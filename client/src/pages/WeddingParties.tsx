import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { SectionReveal } from '@/components/SectionReveal';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { weddingReviews } from '@shared/reviews-data';
import { 
  Heart, Users, Star, Calendar, Trophy, Shield, Award,
  MessageSquare, Quote, Volume2, Clock, Sparkles,
  Calculator, Gift, CreditCard, PersonStanding, Camera,
  ChefHat, Wifi, Target, Headphones, Check, Flower,
  Waves, Wine, Umbrella, Music, ArrowRight, Flower2,
  Crown, Anchor, Sun, Zap, ChevronRight, Gem,
  DollarSign, Smile, GlassWater, CheckCircle, Sunset, X
} from 'lucide-react';

// Hero and gallery images
const heroImage1 = '/attached_assets/clever-girl-50-person-boat.jpg';
const heroImage2 = '/attached_assets/meeseeks-25-person-boat.jpg';
const heroImage3 = '/attached_assets/day-tripper-14-person-boat.jpg';
const galleryImage1 = '/attached_assets/party-atmosphere-1.jpg';
const galleryImage2 = '/attached_assets/party-atmosphere-2.jpg';
const galleryImage3 = '/attached_assets/party-atmosphere-3.jpg';
const floatImage = '/attached_assets/giant-unicorn-float.jpg';
const discoImage = '/attached_assets/dancing-party-scene.jpg';

// Wedding event types
const weddingEvents = [
  {
    name: 'Rehearsal Dinner',
    icon: Wine,
    description: 'Intimate gathering before the big day',
    features: [
      'Sunset cruise timing perfect for toasts',
      'Professional service for formal dinner',
      'Private space for speeches and toasts',
      'Photo opportunities with wedding party',
      'Elegant atmosphere for families to mingle',
      'Champagne service included'
    ]
  },
  {
    name: 'Welcome Party',
    icon: Users,
    description: 'Greet out-of-town guests in style',
    features: [
      'Casual meet & greet atmosphere',
      'Austin skyline views to wow guests',
      'Cocktail cruise format',
      'Mix and mingle layout',
      'Welcome bags distribution',
      'Ice breaker activities available'
    ]
  },
  {
    name: 'After Party',
    icon: Sparkles,
    description: 'Keep the celebration going',
    features: [
      'Late-night party cruise',
      'Dance floor on the water',
      'Continuation of reception energy',
      'Casual dress code',
      'Bring your own late-night snacks',
      'Perfect send-off to honeymoon'
    ]
  }
];

// Wedding packages
const weddingPackages = [
  {
    name: 'Standard Wedding Cruise',
    icon: Heart,
    price: 'Starting at $200/hr',
    description: 'Perfect for rehearsal dinners, welcome parties, and after parties',
    features: [
      'Amazing, experienced captain',
      'Premium Bluetooth speaker system',
      'Clean restroom facilities',
      'Comfortable seating for guests',
      'Plenty of sun & shade areas',
      'We can help coordinate alcohol delivery through Party On Delivery'
    ],
    ideal: 'Essential wedding event experience'
  },
  {
    name: 'Wedding w/Essentials',
    icon: Flower,
    price: 'Starting at $225/hr',
    description: 'Wedding celebration with complete convenience',
    features: [
      'Everything from Standard Cruise',
      'Insulated water dispensers with ice',
      'Fresh water & party cups',
      'Coolers pre-stocked with ice',
      'Folding tables for food & drinks',
      'We can help coordinate alcohol delivery through Party On Delivery'
    ],
    ideal: 'Most popular for wedding events',
    popular: true
  },
  {
    name: 'Luxury Wedding Package',
    icon: Gem,
    price: 'Starting at $250/hr',
    description: 'Elegant wedding experience with premium amenities',
    features: [
      'Everything from Essentials Package',
      'Champagne flutes & fruit juices',
      'Elegant decorative touches',
      'SPF-50 spray sunscreen',
      'Professional photo coordination',
      'Premium party atmosphere',
      'Complete wedding concierge service'
    ],
    ideal: 'For unforgettable wedding celebrations',
    luxury: true
  }
];

// What's included for weddings
const weddingInclusions = [
  {
    icon: Sunset,
    title: 'Sunset Magic',
    description: 'Golden hour timing for perfect photos'
  },
  {
    icon: Camera,
    title: 'Photo Ready',
    description: 'Stunning backdrops for wedding album'
  },
  {
    icon: Wine,
    title: 'Champagne Service',
    description: 'Toast setup with glassware provided'
  },
  {
    icon: Flower2,
    title: 'Elegant Atmosphere',
    description: 'Romantic ambiance and decorations'
  },
  {
    icon: Shield,
    title: 'Professional Service',
    description: 'Experienced crew for formal events'
  },
  {
    icon: Music,
    title: 'Custom Playlist',
    description: 'Your wedding music, your way'
  }
];


// Wedding FAQs
const weddingFAQs = [
  {
    question: 'What wedding events work best on a cruise?',
    answer: 'Rehearsal dinners are our most popular, offering an intimate setting for families to bond. Welcome parties are perfect for greeting out-of-town guests with Austin flair. After parties keep the celebration going post-reception.'
  },
  {
    question: 'Can we have a formal dinner on board?',
    answer: 'You\'re welcome to bring your own food or arrange catering from any Austin vendor of your choice. We can help coordinate alcohol delivery through Party On Delivery. Our crew ensures professional service throughout your event with tables, coolers, and ice provided.'
  },
  {
    question: 'What about wedding decorations?',
    answer: 'Our Luxury package includes elegant decorations like string lights and elegant touches. You\'re welcome to bring additional decorations to match your wedding theme.'
  },
  {
    question: 'What\'s the best time for a wedding cruise?',
    answer: 'Sunset cruises (starting 2-3 hours before sunset) are most popular for the romantic lighting and cooler temperatures. This timing allows for both daylight and sunset photos.'
  },
  {
    question: 'Can we have speeches and toasts?',
    answer: 'Yes! Our sound systems include microphones for speeches and toasts. The intimate setting on the water creates a perfect atmosphere for heartfelt words.'
  },
  {
    question: 'How many guests can you accommodate?',
    answer: 'Day Tripper: Up to 14 guests (perfect for immediate family), Meeseeks/The Irony: 15-30 guests (ideal for wedding party), Clever Girl: Up to 75 guests (accommodates most rehearsal dinners and welcome parties).'
  }
];

// Gallery images
const galleryImages = [
  { src: heroImage1, alt: 'Wedding Party Boat Austin elegant yacht on Lake Travis' },
  { src: heroImage2, alt: 'Lake Travis Wedding rehearsal dinner boat' },
  { src: heroImage3, alt: 'Wedding Party Boat Austin intimate cruise' },
  { src: galleryImage1, alt: 'Lake Travis Wedding celebration on water' },
  { src: galleryImage2, alt: 'Wedding Party Boat Austin romantic sunset cruise' },
  { src: galleryImage3, alt: 'Lake Travis Wedding party atmosphere' }
];

export default function WeddingParties() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();

  const handleGetQuote = () => {
    navigate('/chat?eventType=wedding');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=wedding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead 
        pageRoute="/wedding-parties"
        defaultTitle="Wedding Party Boat | Lake Travis Austin"
        defaultDescription="Lake Travis wedding cruises. Rehearsal dinners, welcome parties, after parties. Sunset views, champagne toasts. Book now!"
        defaultKeywords={[
          'wedding cruise austin',
          'rehearsal dinner lake travis',
          'wedding welcome party boat',
          'wedding after party cruise',
          'lake travis wedding venue',
          'austin wedding boat rental',
          'sunset wedding cruise',
          'wedding yacht charter austin'
        ]}
        schemaType="service"
      />
      <ClientOnly><PublicNavigation /></ClientOnly>
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage1}
            alt="Wedding Party Boat Austin cruise event on Lake Travis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 text-sm font-sans tracking-wider">
            <Heart className="h-4 w-4 mr-2" />
            WEDDING CELEBRATIONS ON THE WATER
            <Heart className="h-4 w-4 ml-2" />
          </Badge>
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center" data-editable data-editable-id="h1-wedding-hero">
            Create Unforgettable Wedding Memories on Lake Travis
          </h1>
          <p className="text-base md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed text-center" data-editable data-editable-id="p-wedding-tagline">
            Rehearsal Dinners • Welcome Parties • After Parties
            <br />
            Elegant celebrations with sunset views on Lake Travis
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetQuote}
              size="lg"
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-8 py-6 text-lg"
              data-testid="button-hero-get-quote"
            >
              <Heart className="mr-2 h-5 w-5" />
              BOOK NOW
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Wedding Cruises Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">01</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Austin's Most Romantic Wedding Venue
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Your wedding weekend deserves extraordinary moments on the water
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Sunset, title: 'Sunset Romance', desc: 'Golden hour lighting creates magical moments and stunning wedding photos' },
                { icon: Heart, title: 'Intimate Elegance', desc: 'Private yacht setting brings families together in exclusive atmosphere' },
                { icon: Shield, title: 'Stress-Free Planning', desc: 'Professional crew handles every detail so you can celebrate love' }
              ].map((benefit, idx) => (
                <Card key={idx} className="rounded-xl border-2 hover:shadow-xl transition-all">
                  <CardContent className="pt-8 text-center">
                    <benefit.icon className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="font-bold text-xl mb-3 text-center">{benefit.title}</h3>
                    <p className="text-base text-gray-600 text-center">{benefit.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Wedding Event Types Section */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">02</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Wedding Event Options
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Each event type crafted for your wedding weekend needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {weddingEvents.map((event, idx) => (
                <Card key={idx} className="rounded-xl border-2 hover:shadow-xl transition-all">
                  <CardHeader className="text-center">
                    <event.icon className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                    <CardTitle className="font-playfair text-2xl mb-2 text-center">{event.name}</CardTitle>
                    <CardDescription className="text-center">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {event.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-base">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Wedding Packages Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">03</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Wedding Packages
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Elegant options for every wedding celebration
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {weddingPackages.map((pkg, idx) => (
                <Card 
                  key={idx} 
                  className={cn(
                    "rounded-xl",
                    pkg.popular ? "border-4 border-purple-600 shadow-2xl" : "border-2"
                  )}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-sans tracking-wider">
                      MOST POPULAR
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <pkg.icon className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                    <CardTitle className="font-playfair text-2xl mb-2 text-center">{pkg.name}</CardTitle>
                    <div className="text-3xl font-black text-purple-600 mb-2">
                      {pkg.price}
                    </div>
                    <CardDescription className="text-center">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-base">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={handleGetQuote}
                      className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      data-testid={`button-package-${idx}`}
                    >
                      Select Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* What's Included Section */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">04</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Wedding Elegance Included
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Every detail for your perfect wedding celebration
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {weddingInclusions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 rounded-xl bg-blue-50">
                  <item.icon className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-base text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Reviews Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">05</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Customer Reviews
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center mb-8">
                Check out our verified reviews on Google and Facebook to see what real customers are saying about their wedding events on Lake Travis!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 font-bold text-lg px-10 py-7"
                >
                  <a href="https://www.google.com/search?q=premier+party+cruises" target="_blank" rel="noopener noreferrer" data-testid="button-google-reviews">
                    View Google Reviews
                  </a>
                </Button>
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-10 py-7"
                >
                  <a href="https://www.facebook.com/premierpartycruises" target="_blank" rel="noopener noreferrer" data-testid="button-facebook-reviews">
                    View Facebook Reviews
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQs Section */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">06</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Wedding Cruise FAQs
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Everything for planning your wedding event
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {weddingFAQs.map((item, idx) => (
                  <AccordionItem 
                    key={idx} 
                    value={`item-${idx}`}
                    className="bg-blue-50 rounded-xl px-6 border-none"
                  >
                    <AccordionTrigger 
                      className="text-left hover:no-underline font-bold"
                      data-testid={`faq-trigger-${idx}`}
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Photo Gallery Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">07</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Wedding Gallery
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Elegant wedding celebrations on Lake Travis
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {galleryImages.map((image, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover"
                    data-testid={`photo-gallery-wedding-${idx}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA Section */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center">
              Ready to Plan Your Wedding Cruise?
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8 text-center">
              Create unforgettable memories for your wedding weekend on Lake Travis
            </p>
            <Button
              size="lg"
              onClick={handleGetQuote}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl px-12 py-8"
              data-testid="button-final-cta"
            >
              <Sparkles className="mr-2 h-6 w-6" />
              Start Planning Today
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </section>
      </SectionReveal>

      <PartyPlanningChecklist 
        partyType="Wedding Event"
        eventType="wedding celebration"
      />
      <Footer />
    </div>
  );
}
