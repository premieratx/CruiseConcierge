import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigationLuxury';
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
import { PACKAGE_FLAT_FEES, CREW_FEES } from '@shared/constants';
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

// Company Milestone packages - REAL packages only (Standard, Essentials, Ultimate)
const milestonePackages = [
  {
    id: 'standard',
    name: 'Standard Package',
    flatFee: { 14: 0, 25: 0, 30: 0, 50: 0, 75: 0 },
    description: 'Basic cruise experience',
    subtitle: 'The boat, the captain, and the lake - celebrate achievements together',
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
    answer: 'Licensed, experienced captain & crew, premium Bluetooth sound, coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), restrooms, sun & shade seating, and safety equipment.'
  },
  {
    id: 'food-drinks',
    question: 'Can we bring food and drinks?',
    answer: 'Yes. For food, you have two options: (1) Bring your own - easy items that won\'t make a mess, or (2) We can help arrange full catering and setup from Austin vendors. BYOB (21+), cans/plastic only. We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) and cups.'
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


export default function CompanyMilestone() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('essentials');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleGetQuote = () => {
    navigate('/chat?eventType=company-milestone');
  };

  const handleBookNow = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" data-page-ready="company-milestone">
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
          {/* Gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex-grow flex items-center w-full">
          <div className="max-w-4xl mx-auto text-center w-full">
            <Badge className="mb-6 px-6 py-3 text-base font-sans tracking-wider bg-blue-100 text-gray-900 border-blue-300 shadow-lg">
              <Trophy className="mr-2 h-5 w-5" />
              Celebrate Your Success in Style
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl heading-unbounded font-extrabold mb-6 text-center text-gray-900 drop-shadow-sm">
              Company Milestone Celebrations
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8 font-bold drop-shadow-sm max-w-3xl mx-auto text-center">
              Celebrate Your Success in Style
            </p>

            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 sm:py-6 shadow-xl max-w-5xl mx-auto mb-8">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-900 font-semibold leading-relaxed">
                Mark your company's greatest achievements with an unforgettable 
                celebration on Lake Travis that your team will never forget
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                className="xola-custom xola-checkout"
                data-button-id="695186923c261203770cc2e7"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base sm:text-lg px-8 py-6 shadow-xl"
                  data-testid="button-hero-get-quote"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Plan Celebration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

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
              <h2 className="text-2xl md:text-3xl heading-unbounded font-bold mb-6 text-white text-center tracking-wider">
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
                  variant="outlineLight"
                  onClick={() => setShowQuoteBuilder(false)}
                  className="text-base px-12 py-6 rounded-xl backdrop-blur-sm mb-8"
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
              <h2 className="text-3xl md:text-4xl heading-unbounded font-bold mb-4 text-center">
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
                      data-button-id="695186923c261203770cc2e7"
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
              <h2 className="text-3xl md:text-4xl heading-unbounded font-bold mb-4 text-center">
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
              <h2 className="text-3xl md:text-4xl heading-unbounded font-bold mb-4 text-center">
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
              <h2 className="text-3xl md:text-4xl heading-unbounded font-bold mb-4 text-center">
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
              <h2 className="text-3xl md:text-4xl heading-unbounded font-bold mb-4 text-center">
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
            <h2 className="text-3xl md:text-4xl heading-unbounded font-bold mb-6 text-white text-center">
              Ready to Celebrate Your Milestone?
            </h2>
            <p className="text-xl text-base text-white/90 mb-8 text-center">
              Start planning your unforgettable company celebration today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                className="xola-custom xola-checkout"
                data-button-id="695186923c261203770cc2e7"
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
                variant="outlineLight"
                asChild
                className="text-lg px-8 py-6"
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

      <RelatedLinks />

      <VideoGallerySection videos={[{id: 'FABtEDZZBA0', title: 'Premier Party Cruises Experience', description: 'See what makes our Lake Travis cruises unforgettable'}]} />

      <Footer />
    </div>
  );
}
