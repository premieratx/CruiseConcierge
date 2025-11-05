import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
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
import SEOHead from '@/components/SEOHead';
import { SectionReveal } from '@/components/SectionReveal';
import { corporateReviews } from '@shared/reviews-data';
import { 
  Trophy, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Award, Shield,
  Star, MessageSquare, Crown, Quote, ChevronRight,
  Ship, Anchor, Sun, Info, TrendingUp, PartyPopper,
  Building, Mic, GlassWater, Gift, Camera, Rocket, X, Briefcase
} from 'lucide-react';

// Hero and gallery images
const heroImage1 = '/attached_assets/bachelor-party-group-guys.webp';
const heroImage2 = '/attached_assets/atx-disco-cruise-party.webp';
const heroImage3 = '/attached_assets/giant-unicorn-float.webp';
const galleryImage1 = '/attached_assets/party-atmosphere-1.webp';
const galleryImage2 = '/attached_assets/party-atmosphere-2.webp';
const galleryImage3 = '/attached_assets/party-atmosphere-3.webp';

const milestonePackages = [
  {
    id: 'standard',
    name: 'Standard 4-Hour Cruise',
    basePrice: 200,
    description: 'Celebrate achievements together - Recognition and appreciation',
    features: [
      'Licensed, fun, experienced captains to take your group safely around the lake in style',
      '2 large empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)',
      'Premium Bluetooth speaker system',
      'Clean restroom facilities',
      'Comfortable seating for up to 14 guests',
      'Plenty of sun & shade areas',
      'We can help coordinate alcohol delivery through Party On Delivery'
    ],
    popular: false,
    icon: Award,
    badge: 'Perfect Start'
  },
  {
    id: 'essentials',
    name: 'Cruise w/Essentials Package',
    basePrice: 225,
    addOnPrice: 100,
    description: 'Milestone celebration with complete convenience',
    features: [
      'Everything from Standard Cruise',
      'Insulated 5-gallon dispenser with ice water',
      'Fresh water & solo cups',
      'Coolers pre-stocked with ice',
      '6-ft folding table for food & drinks',
      'We can help coordinate alcohol delivery through Party On Delivery'
    ],
    popular: true,
    icon: Trophy,
    badge: 'Most Popular'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Party Package',
    basePrice: 250,
    addOnPrice: 250,
    description: 'Ultimate celebration with entertainment and party supplies',
    features: [
      'Everything from Essentials Package',
      'Giant lily pad float',
      'Guest of honor float (unicorn or ring)',
      'Disco ball cups for party vibes',
      'Bubble guns & bubble wands',
      'Champagne flutes & fruit juices',
      'SPF-50 spray sunscreen',
      'Plates, plasticware, & paper towels',
      'Disco balls installed for party atmosphere',
      'We can help coordinate alcohol delivery through Party On Delivery'
    ],
    popular: false,
    icon: Rocket,
    badge: 'Ultimate Celebration'
  }
];

const whatsIncluded = [
  {
    icon: Trophy,
    title: 'Achievement Focus',
    description: 'Celebrate your company\'s important milestones'
  },
  {
    icon: Mic,
    title: 'Speech Platform',
    description: 'Perfect setup for executive addresses'
  },
  {
    icon: Camera,
    title: 'Memory Capture',
    description: 'Professional documentation of your celebration'
  },
  {
    icon: Building,
    title: 'Company Branding',
    description: 'Custom branding throughout the experience'
  },
  {
    icon: PartyPopper,
    title: 'Celebration Setup',
    description: 'Decorations and atmosphere for success'
  },
  {
    icon: Award,
    title: 'Awards Ceremony',
    description: 'Professional setup for recognitions'
  },
  {
    icon: Gift,
    title: 'Commemorative Items',
    description: 'Options for lasting mementos'
  },
  {
    icon: Shield,
    title: 'Full Service',
    description: 'Professional crew handles everything'
  },
  {
    icon: Star,
    title: 'VIP Treatment',
    description: 'Make your team feel valued and special'
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
    answer: "Yes, when conditions are safe and at the captain's discretion. Life jackets required in the water."
  },
  {
    id: 'life-jackets',
    question: 'What about life jackets?',
    answer: 'Adult life jackets are provided. Infant/child life jackets must be brought by guests.'
  }
];


export default function CompanyMilestone() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('essentials');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleGetQuote = () => {
    navigate('/chat?eventType=company-milestone');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=company-milestone&action=book');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead 
        pageRoute="/company-milestone"
        defaultTitle="Company Milestones | Lake Travis Cruises"
        defaultDescription="Celebrate IPOs, anniversaries & major wins on Lake Travis. Team recognition cruises that inspire. 200+ milestones celebrated!"
        defaultKeywords={[
          'company milestone celebration',
          'corporate anniversary cruise',
          'IPO celebration austin',
          'company achievement party',
          'corporate milestone event lake travis'
        ]}
      />

      <PublicNavigation />

      <YouTubeHeroEmbed videoId="FABtEDZZBA0" />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <img 
              src={heroImage1} 
              alt="Company Celebration Party Boat Austin milestone event on Lake Travis" 
              className="w-full h-full object-cover"
              loading="eager"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex-grow flex items-center w-full">
          <div className="max-w-4xl mx-auto text-center text-white w-full">
            <Badge className="mb-6 px-6 py-3 text-base font-sans tracking-wider bg-white/20 backdrop-blur-sm border-white/30">
              <Trophy className="mr-2 h-5 w-5" />
              Celebrate Your Success in Style
            </Badge>

            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-center">
              Company Milestone Celebrations
            </h1>

            <p className="text-xl md:text-2xl text-base mb-8 text-white/90 max-w-3xl mx-auto text-center">
              Mark your company's greatest achievements with an unforgettable 
              celebration on Lake Travis that your team will never forget
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base sm:text-lg px-8 py-6 shadow-xl"
                data-testid="button-hero-get-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Plan Celebration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-base sm:text-lg px-8 py-6"
                data-testid="button-hero-view-packages"
              >
                View Packages
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">200+</div>
                <div className="text-sm text-white/80">Milestones Celebrated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">IPO</div>
                <div className="text-sm text-white/80">Celebrations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">5.0★</div>
                <div className="text-sm text-white/80">Company Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full bg-white/90 backdrop-blur-sm py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-900 text-base md:text-lg font-semibold">
              <span className="text-blue-600">Celebrate Success</span> • Team Recognition • <span className="text-blue-600">Build Pride</span>
            </p>
          </div>
        </div>
      </section>

      {/* Build My Quote Section */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-white text-center tracking-wider">
                BUILD MY QUOTE NOW
              </h2>
              <p className="text-xl text-base text-white/90 mb-8 max-w-2xl mx-auto text-center">
                Get instant pricing for your milestone celebration in minutes
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
                Milestone Celebration Packages
              </h2>
              <p className="text-xl text-base text-gray-600 max-w-3xl mx-auto text-center">
                Choose the perfect package to celebrate your company's achievements. 
                All packages include professional service and Lake Travis experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {milestonePackages.map((pkg) => (
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
                      <div className="text-4xl font-bold text-blue-600">
                        ${pkg.basePrice}<span className="text-lg font-normal">/hr</span>
                      </div>
                      {pkg.addOnPrice && (
                        <p className="text-sm text-gray-600 mt-1">
                          +${pkg.addOnPrice}/hr from base
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">Minimum 3 hours</p>
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

                    <Button 
                      className="w-full"
                      variant={pkg.popular ? "default" : "outline"}
                      onClick={handleGetQuote}
                      data-testid={`button-package-${pkg.id}`}
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
                Recognition & Celebration
              </h2>
              <p className="text-xl text-base text-gray-600 text-center">
                Everything needed to honor your company's achievements
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
                Company Success Stories
              </h2>
              <p className="text-xl text-base text-gray-600 text-center mb-8">
                Check out our verified reviews on Google and Facebook to see what real companies are saying about their milestone celebrations on Lake Travis!
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
                Milestone Celebration Gallery
              </h2>
              <p className="text-xl text-base text-gray-600 text-center">
                See the pride and celebration
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
                          alt={`Company Milestone Gallery ${index + 1}`}
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
                Everything you need to know about milestone celebrations
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
              eventType="Company Milestone"
              checklistItems={[
                'Choose your milestone celebration package',
                'Select date and time for company event',
                'Determine guest count and VIP attendees',
                'Plan awards ceremony and recognition',
                'Coordinate company branding and signage',
                'Plan what food to bring and coordinate alcohol delivery',
                'Prepare executive speeches and presentations',
                'Organize commemorative items or gifts',
                'Review event timeline with captain'
              ]}
            />
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-white text-center">
              Ready to Celebrate Your Milestone?
            </h2>
            <p className="text-xl text-base text-white/90 mb-8 text-center">
              Start planning your unforgettable company celebration today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6"
                data-testid="button-final-cta"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Get Your Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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
          "name": "Company Milestone Celebration Cruises on Lake Travis",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "telephone": "+1-512-488-5892"
          },
          "areaServed": "Austin, TX",
          "description": "Company milestone celebrations on Lake Travis. Celebrate IPOs, anniversaries, and major achievements with professional corporate events on premium boats.",
          "offers": [
            {
              "@type": "Offer",
              "name": "14 Guest Milestone Package",
              "price": "200",
              "priceCurrency": "USD",
              "description": "Small milestone celebrations up to 14 people"
            },
            {
              "@type": "Offer",
              "name": "15-25 Guest Milestone Package",
              "price": "250",
              "priceCurrency": "USD",
              "description": "Medium company celebrations for 15-25 people"
            },
            {
              "@type": "Offer",
              "name": "26-50 Guest Milestone Package",
              "price": "300",
              "priceCurrency": "USD",
              "description": "Large corporate milestones for 26-50 people"
            }
          ]
        })
      }} />

      <RelatedLinks 
        blogLinks={[
          { title: 'Company Milestone Celebration Ideas', href: '/blogs/company-milestone-celebration-ideas' },
          { title: 'Corporate Anniversary Planning', href: '/blogs/corporate-anniversary-planning-austin' },
          { title: 'Team Recognition Events', href: '/blogs/team-recognition-events-lake-travis' }
        ]}
      />

      <VideoGallerySection videos={[{id: 'FABtEDZZBA0', title: 'Premier Party Cruises Experience', description: 'See what makes our Lake Travis cruises unforgettable'}]} />

      <Footer />
    </div>
  );
}
