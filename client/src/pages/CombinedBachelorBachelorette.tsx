import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { SectionReveal } from '@/components/SectionReveal';
import { 
  Users, Clock, Star, Calendar, MapPin, Ship, Phone,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, 
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Quote, 
  Zap, Target, Play,
  MessageSquare, Ticket, Gift, Disc3, Volume2, 
  Mic, Utensils, GlassWater, UserCheck, Leaf, Check,
  AlertCircle, DollarSign, Timer, CreditCard, CloudRain, 
  HelpCircle, Anchor, Droplets, Waves, Info, TrendingUp,
  Gem, Flower, Flower2, CircleDot, Smile, X, Package,
  Plane, Wine
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import Footer from '@/components/Footer';
import { combinedBachReviews } from '@shared/reviews-data';
import { YouTubeVideoBackground } from '@/components/YouTubeVideoBackground';
import AnimatedPhotoGallery from '@/components/AnimatedPhotoGallery';
import { PARTY_PHOTOS, OTHER_ASSETS } from '@/lib/media';
import { initXolaEmbeds } from '@/services/xola';

// Hero and gallery images - ALL PARTY PHOTOS (no fleet boats)
const heroImage1 = PARTY_PHOTOS.bachelorPartyGroup;
const heroImage2 = PARTY_PHOTOS.atxDiscoCruiseParty;
const heroImage3 = PARTY_PHOTOS.discoPhotoCollage1;
const galleryImage1 = PARTY_PHOTOS.discoUnicornCollage;
const galleryImage2 = PARTY_PHOTOS.familyPartyCollage;
const galleryImage3 = PARTY_PHOTOS.nonBachCollage;
const floatImage = OTHER_ASSETS.giantUnicornFloat;

// Combined party packages - gender-neutral
// Prices stored in cents to match DISCO_TIME_SLOTS pattern
const combinedPartyPackages = [
  {
    id: 'basic_combined',
    name: 'Basic Combined Package',
    price: 8500, // $85.00 per person in cents
    priceWithTax: 11156, // $111.56 w/tax & gratuity
    originalPrice: null,
    description: 'Join the BEST Party on Lake Travis - Guys & Girls Together!',
    subtitle: 'BYOB & Keep it Affordable - Perfect for Budget-Conscious Groups',
    features: [
      'Join the ultimate party cruise with friends from both sides!',
      'BYOB, shared cooler with ice for everyone',
      'Alcohol delivery available to the boat',
      'ALWAYS more affordable than separate parties',
      'Perfect for groups who want to celebrate together'
    ],
    popular: false,
    icon: Disc3,
    badge: 'Great Value',
    coupleSpecial: false
  },
  {
    id: 'party_squad',
    name: 'Party Squad Package',
    price: 9500, // $95.00 per person in cents
    priceWithTax: 12488, // $124.88 w/tax & gratuity
    originalPrice: 125,
    description: 'Our signature combined party experience - The Ultimate Group Celebration!',
    subtitle: 'Private Cooler & Reserved Area for Your Entire Crew',
    features: [
      'Private Cooler w/Ice & Storage for Your Entire Group',
      'Reserved Spot for Your Combined Party',
      'Special Celebration Items for the Happy Couple',
      'Complimentary Direct-to-Boat Alcohol Delivery',
      '25% Discount on Round-Trip Transportation',
      '$50-$100 Voucher for Airbnb Delivery Services'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular',
    coupleSpecial: true
  },
  {
    id: 'ultimate_celebration',
    name: 'Ultimate Celebration Package',
    price: 10500, // $105.00 per person in cents
    priceWithTax: 13781, // $137.81 w/tax & gratuity
    originalPrice: 140,
    description: 'All-inclusive luxury for the ultimate combined bachelor/bachelorette party',
    subtitle: 'Everything Ready When You Arrive - Just Show Up & Party!',
    features: [
      'Everything in the Party Squad Package',
      'Premium Party Floats for the Entire Group',
      'Mixology Setup w/Champagne, Juices & Party Supplies',
      '$100 Voucher for Airbnb Concierge Services',
      'Towel Service & SPF-50 Spray Sunscreen for Everyone',
      'Completely Turnkey - Cooler Stocked, Everything Ready!'
    ],
    popular: false,
    icon: Trophy,
    badge: 'All-Inclusive VIP',
    coupleSpecial: true
  }
];

// What's included for combined parties
const whatsIncluded = [
  {
    icon: Music,
    title: 'Professional DJ',
    description: 'Playing music everyone loves - guys and girls both enjoy the vibe!'
  },
  {
    icon: Camera,
    title: 'Professional Photographer',
    description: 'Capture epic group photos with all your friends together'
  },
  {
    icon: Anchor,
    title: 'Private Group Cooler',
    description: 'Dedicated cooler space for your combined group, fully iced'
  },
  {
    icon: GlassWater,
    title: 'Party Supplies',
    description: 'Mixers, cups, ice - everything both guys and girls need'
  },
  {
    icon: Waves,
    title: 'Multiple Party Floats',
    description: 'Giant floats everyone can enjoy on the water'
  },
  {
    icon: Gift,
    title: 'Celebration Essentials',
    description: 'Cups, koozies, party supplies for the entire crew!'
  },
  {
    icon: Droplets,
    title: 'Ice Water Stations',
    description: 'Keep everyone hydrated throughout the party'
  },
  {
    icon: Shield,
    title: 'Clean Restrooms',
    description: 'Full facilities on board for everyone'
  },
  {
    icon: Sun,
    title: 'Shaded Areas',
    description: 'Plenty of covered space to escape the sun'
  }
];

// FAQs for combined parties
const faqItems = [
  {
    id: 'what-is-combined',
    question: 'What is a combined bach party?',
    answer: 'Both parties celebrate together. Saves time & money, and everyone bonds before the wedding.'
  },
  {
    id: 'group-size',
    question: 'How many people can you fit?',
    answer: 'Disco cruise handles 20–40+; private boats hold up to 75.'
  },
  {
    id: 'private-or-disco',
    question: 'Disco or private cruise?',
    answer: "Under 30: disco. 30+: private. We'll help you choose."
  },
  {
    id: 'split-payment',
    question: 'Can we split payments?',
    answer: 'Yes—split payment options available at checkout.'
  },
  {
    id: 'different-preferences',
    question: 'What if guys & girls want different things?',
    answer: 'Plenty of zones: floats, DJ, lounge. BYOB keeps it flexible.'
  },
  {
    id: 'activities',
    question: 'Best activities for mixed groups?',
    answer: 'DJ, floats, swimming—universal fun for everyone.'
  },
  {
    id: 'booking-timeline',
    question: 'How far in advance to book?',
    answer: 'Book 6–8 weeks early; weekends fill fast.'
  }
];


// Photo gallery items - PARTY PHOTOS ONLY (no fleet boats)
const galleryPhotos = [
  { id: 1, src: heroImage1, alt: 'Combined Bachelor Bachelorette Austin party group on Lake Travis' },
  { id: 2, src: heroImage2, alt: 'ATX Disco Cruise party atmosphere on Lake Travis' },
  { id: 3, src: heroImage3, alt: 'Party Boat Austin friends dancing on Lake Travis cruise' },
  { id: 4, src: galleryImage1, alt: 'Combined Bachelor Bachelorette Austin mixed group party vibes on Lake Travis' },
  { id: 5, src: galleryImage2, alt: 'Combined Bachelor Bachelorette Austin party atmosphere on Lake Travis' },
  { id: 6, src: galleryImage3, alt: 'Lake Travis Party celebration on Party Boat Austin' },
  { id: 7, src: floatImage, alt: 'Lake Travis Party floats on Party Boat Austin' },
  { id: 8, src: heroImage1, alt: 'Bachelor and bachelorette groups celebrating together on Lake Travis' }
];

export default function CombinedBachelorBachelorette() {
  const [, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const heroImages = [heroImage2, heroImage3, galleryImage1];

  useEffect(() => {
    if (reducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://ppc-quote-builder.lovable.app') {
        return;
      }
      
      if (event.data && event.data.type === 'quote-submitted') {
        navigate('/chat');
        toast({
          title: "Quote Submitted!",
          description: "Redirecting you to view your quote details...",
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate, toast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      initXolaEmbeds();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleGetQuote = (packageId?: string) => {
    const params = new URLSearchParams({ cruiseType: 'combined' });
    if (packageId) {
      params.set('package', packageId);
    }
    navigate(`/chat?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead
        pageRoute="/combined-bachelor-bachelorette"
        defaultTitle="Joint Bachelor/Bachelorette Parties | Lake Travis Austin"
        defaultDescription="Combined bachelor & bachelorette parties on Lake Travis! Private boats & disco cruises for groups celebrating together."
        defaultKeywords={['combined bachelor bachelorette party Austin', 'Lake Travis combined party', 'bachelor bachelorette party together', 'Austin group party cruise']}
        schemaType="event"
      />
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
        <YouTubeVideoBackground videoId="4-Yx24Y6oro" posterImage={heroImages[0]} />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-white text-center flex-grow flex items-center">
          <div className="max-w-5xl mx-auto">
            <h1 
              className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-center leading-tight"
              data-editable 
              data-editable-id="combined-hero-title"
            >
              Combined Bachelor & Bachelorette Parties on Lake Travis
            </h1>
            
            <p 
              className="text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-gray-100 text-center max-w-3xl mx-auto"
              data-editable 
              data-editable-id="combined-hero-subtitle"
            >
              The Best of Both Worlds - Guys & Girls Together for One Epic Celebration!
              <br />
              The Modern Way to Celebrate - All Your Friends, One Unforgettable Party
            </p>

            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 text-base font-sans tracking-wider mb-6">
              🎉 The Best of Both Worlds - One Epic Celebration
            </Badge>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div 
                className="xola-embedded-checkout bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-6 rounded-md inline-flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                data-button-id="6915747a162501edc00f1519"
                data-testid="button-hero-book-combined"
                style={{minHeight: '56px'}}
              >
                <Calendar className="mr-2 h-6 w-6" />
                Book Your Combined Celebration!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <SectionReveal>
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Real Combined Bachelor/Bachelorette Party Photos
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              See what past groups experienced on Lake Travis! Click any photo to view full gallery.
            </p>
            <AnimatedPhotoGallery />
          </div>
        </section>
      </SectionReveal>

      {/* Why Combined Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">01</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Why Combined Bach Parties Are The Modern Trend
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                More couples are choosing combined celebrations - and for good reason. Save time, save money, and bring everyone together for one unforgettable party!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: DollarSign, title: 'Save Money', desc: 'One party is always cheaper than two separate events' },
                { icon: Users, title: 'Everyone Together', desc: 'Friends bond before the wedding - no one misses out' },
                { icon: Zap, title: 'More Energy', desc: 'Combined groups create an incredible party atmosphere' }
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

      {/* Packages Section */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">02</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Combined Party Packages
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Choose the perfect package for your combined celebration - from budget-friendly to all-inclusive luxury
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {combinedPartyPackages.map((pkg, idx) => (
                <Card 
                  key={pkg.id} 
                  className={cn(
                    "rounded-xl",
                    pkg.popular ? "border-4 border-purple-600 shadow-2xl" : "border-2"
                  )}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-sans tracking-wider">
                      {pkg.badge}
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <pkg.icon className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                    <CardTitle className="font-playfair text-2xl mb-2 text-center">{pkg.name}</CardTitle>
                    <div className="mb-2">
                      <div className="text-3xl font-black text-purple-600">
                        ${pkg.price / 100}/person
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        ${(pkg.priceWithTax / 100).toFixed(2)} with tax & gratuity
                      </p>
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
                      onClick={() => handleGetQuote(pkg.id)}
                      className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      data-testid={`button-package-${pkg.id}`}
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
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">03</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                What's Included in Every Combined Party
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                From DJ to photographer, floats to party supplies - we've got everything covered for your crew
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {whatsIncluded.map((item, idx) => (
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
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">04</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                What Real Customers Are Saying
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto mb-8 text-center">
                Don't just take our word for it - read hundreds of 5-star reviews from real customers on Google and Facebook
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold text-lg px-10 py-6"
                  data-testid="button-google-reviews"
                >
                  <a href="https://www.google.com/search?q=premier+party+cruises+austin" target="_blank" rel="noopener noreferrer">
                    <Star className="mr-2 h-5 w-5" />
                    Read Google Reviews
                  </a>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold text-lg px-10 py-6"
                  data-testid="button-facebook-reviews"
                >
                  <a href="https://www.facebook.com/premierpartycruises" target="_blank" rel="noopener noreferrer">
                    <Star className="mr-2 h-5 w-5" />
                    Read Facebook Reviews
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQs Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">05</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Combined Party FAQs
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Common questions about combined bachelor/bachelorette celebrations
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item) => (
                  <AccordionItem 
                    key={item.id} 
                    value={item.id}
                    className="bg-blue-50 rounded-xl px-6 border-none"
                  >
                    <AccordionTrigger 
                      className="text-left hover:no-underline font-bold"
                      data-testid={`faq-trigger-${item.id}`}
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
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">06</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Combined Party Vibes & Photos
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                See the energy and excitement of combined celebrations on Lake Travis
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {galleryPhotos.slice(0, 6).map((photo) => (
                <div key={photo.id} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-64 object-cover"
                    data-testid={`photo-gallery-combined-${photo.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center">
              Ready to Plan Your Combined Celebration?
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8 text-center">
              Join the modern trend - bring everyone together for one epic party on Lake Travis
            </p>
            <Button
              size="lg"
              onClick={() => handleGetQuote()}
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

      <PartyPlanningChecklist partyType="Combined Bachelor & Bachelorette Party" eventType="combined celebration" />
      <Footer />
    </div>
  );
}
