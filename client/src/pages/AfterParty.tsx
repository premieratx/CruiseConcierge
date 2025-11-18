import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import YouTubeHeroEmbed from '@/components/YouTubeHeroEmbed';
import VideoGallerySection from '@/components/VideoGallerySection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { PACKAGE_FLAT_FEES, CREW_FEES } from '@shared/constants';
import SEOHead from '@/components/SEOHead';
import { SectionReveal } from '@/components/SectionReveal';
import { weddingReviews } from '@shared/reviews-data';
import { 
  PartyPopper, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Music, Wine,
  Star, Shield, Gift, MessageSquare, Coffee, Disc3,
  Mic, Crown, Award, Quote, ChevronRight,
  Anchor, Sun, Info, GlassWater, Heart, X, Smile, MessageCircle
} from 'lucide-react';

// Hero and gallery images
const heroImage1 = '/attached_assets/dancing-party-scene.jpg';
const heroImage2 = '/attached_assets/atx-disco-cruise-party.jpg';
const heroImage3 = '/attached_assets/party-atmosphere-3.jpg';
const galleryImage1 = '/attached_assets/party-atmosphere-1.jpg';
const galleryImage2 = '/attached_assets/party-atmosphere-2.jpg';
const galleryImage3 = '/attached_assets/giant-unicorn-float.jpg';

// After Party packages - REAL packages only (Standard, Essentials, Ultimate)
const afterPartyPackages = [
  {
    id: 'standard',
    name: 'Standard Package',
    flatFee: { 14: 0, 25: 0, 30: 0, 50: 0, 75: 0 },
    description: 'Basic cruise experience',
    subtitle: 'The boat, the captain, and the lake - relax and reconnect the day after',
    features: [
      'Licensed, fun, experienced captains to take your group safely around the lake in style',
      'Large empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)',
      'Premium Bluetooth sound system',
      'Clean restroom facilities',
      'Sun and shade seating areas',
      'BYOB friendly (cans/plastic only)',
      'Basic cruise experience'
    ],
    popular: false,
    icon: Ship,
    badge: 'Great Value',
    color: 'blue'
  },
  {
    id: 'essentials',
    name: 'Essentials Package',
    flatFee: PACKAGE_FLAT_FEES.ESSENTIALS,
    description: 'Enhanced convenience',
    subtitle: 'Everything from Standard Package + Enhanced Convenience',
    features: [
      'Everything from Standard Package',
      'Coolers pre-stocked with ice',
      '5-gallon insulated water dispenser',
      'Solo cups and ice water',
      '6-foot folding table for food & drinks',
      'We can help coordinate alcohol delivery through Party On Delivery',
      'Enhanced convenience'
    ],
    popular: true,
    icon: Sparkles,
    badge: 'Most Popular',
    color: 'yellow'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Package',
    flatFee: PACKAGE_FLAT_FEES.ULTIMATE,
    description: 'Full party atmosphere setup',
    subtitle: 'Everything from Essentials Package + Full Party Atmosphere',
    features: [
      'Everything from Essentials Package',
      'Giant lily pad float',
      'Guest of honor float (unicorn or ring)',
      'Disco ball cups for party vibes',
      'Bubble guns and bubble wands',
      'Champagne flutes and fruit juices',
      'SPF-50 spray sunscreen',
      'Plates, plasticware, paper towels',
      'Full party atmosphere setup'
    ],
    popular: false,
    icon: Crown,
    badge: 'All-Inclusive VIP',
    color: 'purple'
  }
];

const whatsIncluded = [
  {
    icon: Sun,
    title: 'Day After Cruise',
    description: 'Perfect daytime cruise to close out your wedding weekend'
  },
  {
    icon: MessageCircle,
    title: 'Catch Up Time',
    description: 'Relax and talk to everyone you missed during the big day'
  },
  {
    icon: Smile,
    title: 'Relaxed Vibe',
    description: 'Chill atmosphere to laugh and reminisce about your wedding'
  },
  {
    icon: Coffee,
    title: 'Mimosa-Friendly',
    description: 'Bring champagne & OJ for day-after celebration'
  },
  {
    icon: GlassWater,
    title: 'Lake Activities',
    description: 'Swimming, floating, and enjoying the beautiful water'
  },
  {
    icon: Music,
    title: 'Your Playlist',
    description: 'Premium Bluetooth sound for your favorite chill tunes'
  },
  {
    icon: Heart,
    title: 'Close Friends',
    description: 'Intimate time with those closest to you'
  },
  {
    icon: Shield,
    title: 'Experienced Crew',
    description: 'Professional captains for a safe, relaxing cruise'
  },
  {
    icon: Gift,
    title: 'Perfect Ending',
    description: 'The best way to close out the best weekend of your life'
  }
];

const faqItems = [
  {
    id: 'included',
    question: "What's included?",
    answer: 'Licensed, experienced captain & crew, premium Bluetooth sound, coolers with ice, restrooms, sun & shade seating, and safety equipment.'
  },
  {
    id: 'food-drinks',
    question: 'Can we bring food and drinks?',
    answer: 'Yes. BYOB (21+), cans/plastic only; bring snacks or meals. We provide coolers with ice and cups.'
  },
  {
    id: 'deposits-payments',
    question: 'How do deposits and payments work?',
    answer: 'If booking 14+ days before cruise: 25% deposit required, remaining balance due 14 days before cruise. If booking less than 14 days before cruise: 50% deposit required, remaining balance due within 48 hours of booking (or 3 days after booking).'
  },
  {
    id: 'cancellation',
    question: 'What\'s your cancellation policy?',
    answer: "48-hour full refund window after booking. After that, cancellations are weather-dependent at the captain's discretion. Pro-rated refunds if weather shortens the cruise."
  },
  {
    id: 'swimming',
    question: 'Is swimming allowed?',
    answer: "Yes, when conditions are safe and at the captain's discretion. Life jackets are on board and available for swimming - we encourage guests to wear them for safety."
  },
  {
    id: 'life-jackets',
    question: 'What about life jackets?',
    answer: 'Adult life jackets are provided. Infant/child life jackets must be brought by guests.'
  }
];


export default function AfterParty() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('essentials');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleGetQuote = () => {
    navigate('/chat?eventType=after-party');
  };

  const handleBookNow = () => {
    window.open('https://events.premierpartycruises.com/widget/form/X1zEKdfbmjqs2hBHWNN1', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead 
        pageRoute="/after-party"
        defaultTitle="Day After Wedding Cruise | Lake Travis After Party"
        defaultDescription="Relax the day after your wedding on Lake Travis. Perfect daytime cruise to reconnect with loved ones and close out the best weekend of your life!"
        defaultKeywords={[
          'day after wedding cruise',
          'lake travis after party',
          'wedding day after cruise',
          'post wedding cruise austin',
          'wedding recovery boat rental'
        ]}
      />

      <ClientOnly><PublicNavigation /></ClientOnly>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden ">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/FABtEDZZBA0?autoplay=1&mute=1&loop=1&playlist=FABtEDZZBA0&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&playsinline=1"
            title="Premier Party Cruises Drone Video Background"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ border: 'none' }}
            data-testid="youtube-background-video"
          />
          {/* White Overlay for contrast - 75% opacity */}
          <div className="absolute inset-0 bg-white/75"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex-grow flex items-center w-full">
          <div className="max-w-4xl mx-auto text-center w-full">
            <Badge className="mb-6 px-6 py-3 text-base font-sans tracking-wider bg-blue-100 border-blue-300 shadow-lg">
              <Sun className="mr-2 h-5 w-5" />
              Perfect Ending to Your Wedding Weekend
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-extrabold mb-6 text-center text-gray-900 drop-shadow-sm">
              Day After Wedding Cruises
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8 font-bold drop-shadow-sm max-w-3xl mx-auto text-center">
              Perfect Ending to Your Wedding Weekend
            </p>

            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 sm:py-6 shadow-xl max-w-5xl mx-auto mb-8">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-900 font-semibold leading-relaxed">
                Close out the best weekend of your life! Relax, reconnect, and laugh about 
                your big day with the people you didn't have time to talk to during the wedding
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                className="xola-custom xola-checkout"
                data-button-id="691574bd162501edc00f151a"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-base sm:text-lg px-8 py-6 shadow-xl"
                  data-testid="button-hero-get-quote"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Plan Day After Cruise
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-base sm:text-lg px-8 py-6"
                data-testid="button-hero-view-packages"
              >
                View Packages
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">300+</div>
                <div className="text-sm text-gray-600">Happy Couples</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">Daytime</div>
                <div className="text-sm text-gray-600">Relaxed Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5.0★</div>
                <div className="text-sm text-gray-600">Perfect Ending</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full bg-white/90 backdrop-blur-sm py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-900 text-base md:text-lg font-semibold">
              <span className="text-blue-600">Day After Relaxation</span> • Catch Up with Friends • <span className="text-blue-600">Perfect Ending</span>
            </p>
          </div>
        </div>
      </section>

      {/* Build My Quote Section */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-600">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-white text-center tracking-wider">
                BUILD MY QUOTE NOW
              </h2>
              <p className="text-xl text-base text-white/90 mb-8 max-w-2xl mx-auto text-center">
                Get instant pricing for your day-after cruise in minutes
              </p>
              
              {!showQuoteBuilder ? (
                <Button
                  size="lg"
                  onClick={() => setShowQuoteBuilder(true)}
                  className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg sm:text-xl px-12 py-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                  data-testid="button-build-quote"
                >
                  <Sparkles className="mr-3 h-6 w-6" />
                  Start Building Your Quote
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setShowQuoteBuilder(false)}
                  className="border-3 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-base px-12 py-6 rounded-xl backdrop-blur-sm mb-8"
                  data-testid="button-hide-quote"
                >
                  <X className="mr-2 h-5 w-5" />
                  Hide Quote Builder
                </Button>
              )}
            </div>

            <AnimatePresence>
              {showQuoteBuilder && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="mt-12 overflow-hidden"
                >
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <iframe 
                      src="https://ppc-quote-builder.lovable.app/"
                      title="Build Your Quote - Premier Party Cruises"
                      className="w-full"
                      style={{ 
                        minHeight: '1200px',
                        height: '90vh',
                        border: 'none'
                      }}
                      allow="payment; geolocation"
                      allowFullScreen
                      data-testid="iframe-quote-builder"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </SectionReveal>

      {/* Packages Section */}
      <SectionReveal>
        <section id="packages" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center">
                Day After Wedding Packages
              </h2>
              <p className="text-xl text-base text-gray-600 max-w-3xl mx-auto text-center">
                Choose your perfect day-after relaxation package. 
                Relax, reconnect, and reminisce with your closest friends.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {afterPartyPackages.map((pkg) => (
                <Card key={pkg.id} className={cn(
                  "relative h-full hover:shadow-2xl transition-all duration-300 rounded-xl",
                  pkg.popular && "border-2 border-blue-600 shadow-xl scale-105"
                )}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-blue-600 text-white font-bold font-sans tracking-wider px-4 py-1">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <pkg.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">{pkg.name}</CardTitle>
                    
                    <div className="mt-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {pkg.basePrice === 200 && '$1,050-$1,838'}
                        {pkg.basePrice === 225 && '$1,181-$1,969'}
                        {pkg.basePrice === 250 && '$1,413-$2,260'}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        for 4-hour cruise
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 text-base mb-6 text-center">
                      {pkg.description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className="xola-custom xola-checkout"
                      data-button-id="691574bd162501edc00f151a"
                    >
                      <Button 
                        className="w-full"
                        variant={pkg.popular ? "default" : "outline"}
                        data-testid={`button-package-${pkg.id}`}
                      >
                        Get Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* What's Included */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center">
                Everything for Your Day-After Cruise
              </h2>
              <p className="text-xl text-base text-gray-600 text-center">
                All you need for a perfect relaxing day on the water
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {whatsIncluded.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-base text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Testimonials */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center">
                Day-After Celebration Stories
              </h2>
              <p className="text-xl text-base text-gray-600 text-center mb-8">
                Check out our verified reviews on Google and Facebook to see what real couples are saying about their day-after cruises on Lake Travis!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-lg px-10 py-6"
                >
                  <a href="https://www.google.com/search?q=premier+party+cruises+austin" target="_blank" rel="noopener noreferrer">
                    <Star className="mr-2 h-5 w-5" />
                    View Google Reviews
                  </a>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-lg px-10 py-6"
                >
                  <a href="https://www.facebook.com/premierpartycruises" target="_blank" rel="noopener noreferrer">
                    <Star className="mr-2 h-5 w-5" />
                    View Facebook Reviews
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Photo Gallery */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center">
                Day-After Cruise Photos
              </h2>
              <p className="text-xl text-base text-gray-600 text-center">
                Relax and enjoy the beautiful Lake Travis sunshine
              </p>
            </div>

            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {[galleryImage1, galleryImage2, galleryImage3, heroImage2, heroImage3].map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="rounded-xl overflow-hidden">
                        <img
                          src={img}
                          alt={`After Party Gallery ${index + 1}`}
                          className="w-full h-[500px] object-cover"
                          loading="lazy"
                        />
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-base text-gray-600 text-center">
                Everything you need to know about after party cruises
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left font-bold text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </SectionReveal>

      {/* Planning Checklist */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <PartyPlanningChecklist 
              eventType="Day After Wedding Cruise"
              checklistItems={[
                'Choose your day-after cruise package',
                'Select date and daytime departure time',
                'Determine guest count for relaxed cruise',
                'Plan what drinks and snacks to bring',
                'Coordinate brunch or lunch plans before/after',
                'Arrange transportation to marina',
                'Share cruise details with close friends',
                'Bring sunscreen and comfortable clothing',
                'Plan your chill playlist'
              ]}
            />
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-white text-center">
              Ready to Close Out the Best Weekend of Your Life?
            </h2>
            <p className="text-xl text-base text-white/90 mb-8 text-center">
              Start planning your perfect day-after celebration today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                className="xola-custom xola-checkout"
                data-button-id="691574bd162501edc00f151a"
              >
                <Button
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6"
                  data-testid="button-final-cta"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Get Your Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-blue-600 font-bold text-lg px-8 py-6"
                data-testid="button-call-now"
              >
                <a href="tel:+15124885892">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (512) 488-5892
                </a>
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Day After Wedding Cruise Austin",
          "description": "Relaxing day-after wedding cruises on Lake Travis. Perfect daytime cruise to reconnect with close friends and close out the best weekend of your life.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "telephone": "(512) 488-5892",
            "priceRange": "$1,050-$2,750"
          },
          "areaServed": "Austin, TX",
          "offers": [
            {
              "@type": "Offer",
              "name": "Day After Standard Package",
              "price": "1050",
              "priceCurrency": "USD",
              "description": "4-hour daytime relaxation cruise for 1-14 guests"
            },
            {
              "@type": "Offer",
              "name": "Day After Essentials Package",
              "price": "1150",
              "priceCurrency": "USD",
              "description": "4-hour day-after cruise with all amenities for 1-14 guests"
            },
            {
              "@type": "Offer",
              "name": "Day After Ultimate Package",
              "price": "1300",
              "priceCurrency": "USD",
              "description": "4-hour ultimate relaxation cruise with floats and fun for 1-14 guests"
            }
          ]
        })
      }} />

      <VideoGallerySection videos={[{id: 'FABtEDZZBA0', title: 'Premier Party Cruises Experience', description: 'See what makes our Lake Travis cruises unforgettable'}]} />

      <Footer />
    </div>
  );
}
