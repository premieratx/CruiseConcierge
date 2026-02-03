import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import YouTubeHeroEmbed from '@/components/YouTubeHeroEmbed';
import VideoGallerySection from '@/components/VideoGallerySection';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import Chat from '@/pages/Chat';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import SEOHead from '@/components/SEOHead';
import { formatCurrency } from '@shared/formatters';
import { PRICING_DEFAULTS, PACKAGE_FLAT_FEES, CREW_FEES } from '@shared/constants';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { SectionReveal } from '@/components/SectionReveal';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { birthdayReviews } from '@shared/reviews-data';
import { 
  Cake, Users, Star, Calendar, Trophy, Shield, Award,
  MessageSquare, Quote, Volume2, Clock, PartyPopper,
  Calculator, Gift, CreditCard, PersonStanding, Heart,
  ChefHat, Wifi, Target, Headphones, Check, Sparkles,
  Waves, Wine, Umbrella, Music, ArrowRight, Camera,
  Crown, Anchor, Presentation, Zap, ChevronRight,
  DollarSign, Smile, Gem, CheckCircle, X, Ship
} from 'lucide-react';

// Hero and gallery images
const heroImage1 = '/attached_assets/party-atmosphere-1.jpg';
const heroImage2 = '/attached_assets/party-atmosphere-2.jpg';
const heroImage3 = '/attached_assets/party-atmosphere-3.jpg';
const boatImage1 = '/attached_assets/day-tripper-14-person-boat.jpg';
const boatImage2 = '/attached_assets/meeseeks-25-person-boat.jpg';
const boatImage3 = '/attached_assets/clever-girl-50-person-boat.jpg';
const floatImage = '/attached_assets/giant-unicorn-float.jpg';
const discoImage = '/attached_assets/atx-disco-cruise-party.jpg';

// Milestone birthdays
const milestones = [
  { age: '21st', label: 'Finally Legal', icon: Wine, color: 'text-purple-500' },
  { age: '30th', label: 'Dirty Thirty', icon: Gem, color: 'text-blue-500' },
  { age: '40th', label: 'Fabulous Forty', icon: Crown, color: 'text-green-500' },
  { age: '50th', label: 'Fifty & Fabulous', icon: Trophy, color: 'text-yellow-500' }
];

// Birthday packages - REAL packages only (Standard, Essentials, Ultimate)
const birthdayPackages = [
  {
    id: 'standard',
    name: 'Standard Package',
    flatFee: { 14: 0, 25: 0, 30: 0, 50: 0, 75: 0 },
    description: 'Basic cruise experience',
    subtitle: 'The boat, the captain, and the lake - ready for your birthday celebration',
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

// What's included
const birthdayInclusions = [
  {
    icon: Cake,
    title: 'Birthday Atmosphere',
    description: 'Decorations and party vibes ready'
  },
  {
    icon: Music,
    title: 'Your Music',
    description: 'Bluetooth sound system for your playlist'
  },
  {
    icon: Waves,
    title: 'Swimming Fun',
    description: 'Jump in Lake Travis anytime'
  },
  {
    icon: Camera,
    title: 'Photo Worthy',
    description: 'Instagram-perfect birthday moments'
  },
  {
    icon: Shield,
    title: 'Safe Celebration',
    description: 'Professional crew ensures safety'
  },
  {
    icon: Gift,
    title: 'Stress-Free',
    description: 'We handle the details'
  }
];

// Birthday FAQs
const birthdayFAQs = [
  {
    question: 'What decorations do you provide?',
    answer: 'Our Birthday Bash and VIP packages include birthday banners, balloons, and table decorations. The VIP package includes premium decorations and custom touches. You\'re also welcome to bring additional decorations to personalize your celebration.'
  },
  {
    question: 'Can we bring a birthday cake?',
    answer: 'Absolutely! We recommend cupcakes or a cake that\'s easy to serve on a moving boat. We provide plates, utensils, and napkins with our party packages. We can also coordinate with local bakeries for delivery to the marina.'
  },
  {
    question: 'What\'s the best package for a milestone birthday?',
    answer: 'For milestone birthdays (21st, 30th, 40th, 50th), we highly recommend the VIP Birthday Experience. It includes professional photography to capture the memories, premium decorations, and special touches that make milestone birthdays unforgettable.'
  },
  {
    question: 'How many people can we bring?',
    answer: 'Our boats accommodate different group sizes: Day Tripper (up to 14), Meeseeks / The Irony (15-30), and Clever Girl (up to 75). Choose based on your guest list. The birthday person counts toward the capacity.'
  }
];

// Gallery images
const galleryImages = [
  { src: heroImage1, alt: 'Birthday Party Boat Austin celebration on Lake Travis' },
  { src: heroImage2, alt: 'Lake Travis Birthday Party friends celebrating cruise' },
  { src: heroImage3, alt: 'Birthday Party Boat Austin party atmosphere' },
  { src: boatImage1, alt: 'Lake Travis Birthday Party intimate cruise boat' },
  { src: boatImage2, alt: 'Birthday Party Boat Austin medium group boat' },
  { src: boatImage3, alt: 'Lake Travis Birthday Party large party boat celebration' }
];

export default function BirthdayParties() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleGetQuote = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" data-page-ready="birthday-parties">
      <SEOHead 
        pageRoute="/birthday-parties"
        defaultTitle="Birthday Party Boat | Lake Travis Austin"
        defaultDescription="Lake Travis birthday cruises. Private boat rentals for all ages. Perfect for milestone birthdays. Decorations included. Book today!"
        defaultKeywords={[
          'birthday cruise austin',
          'birthday party boat lake travis',
          '21st birthday cruise',
          '30th birthday boat party',
          '40th birthday cruise austin',
          'milestone birthday celebration',
          'birthday boat rental austin',
          'lake travis birthday party'
        ]}
        schemaType="service"
      />
      <ClientOnly><PublicNavigation /></ClientOnly>
      <Breadcrumb />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden ">
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
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 text-sm font-sans tracking-wider shadow-lg">
            🎉 LAKE TRAVIS BIRTHDAY CRUISES 🎉
          </Badge>
          <h1 className="heading-unbounded text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-center text-gray-900 drop-shadow-sm" data-editable data-editable-id="h1-birthday-hero">
            Make Your Birthday Legendary!
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8 font-bold drop-shadow-sm max-w-3xl mx-auto leading-relaxed text-center" data-editable data-editable-id="p-birthday-tagline">
            Celebrate on Lake Travis • All ages welcome • Milestone specialists
          </p>
          
          {/* Milestone badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {milestones.map((milestone) => (
              <Badge 
                key={milestone.age}
                className="bg-blue-100 text-gray-900 border-blue-300 px-4 py-2 font-sans tracking-wider"
              >
                <milestone.icon className={cn("h-4 w-4 mr-2", milestone.color)} />
                <span className="font-bold">{milestone.age}</span>
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div
              className="xola-custom xola-checkout"
              data-button-id="695186923c261203770cc2e7"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-6 text-lg"
                data-testid="button-hero-get-quote"
              >
                <Cake className="mr-2 h-5 w-5" />
                PLAN MY BIRTHDAY
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Birthday Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">01</span>
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Austin's Favorite Birthday Destination
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Forget boring dinners and crowded bars. Your birthday deserves a Lake Travis adventure!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Gift, title: 'VIP Package Available', desc: 'Premium birthday experience with professional photography and champagne toast setup!' },
                { icon: Camera, title: 'Epic Memories', desc: 'Professional photos and Instagram-worthy moments all day long' },
                { icon: PartyPopper, title: 'All Ages Welcome', desc: 'From Sweet 16 to Fifty & Fabulous - we celebrate all birthdays!' }
              ].map((benefit, idx) => (
                <Card key={idx} className="rounded-xl border-2 hover:shadow-xl transition-all">
                  <CardContent className="pt-8 text-center">
                    <benefit.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
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
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Birthday Party Packages
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Choose the perfect package for your birthday celebration
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {birthdayPackages.map((pkg, idx) => (
                <Card 
                  key={idx} 
                  className={cn(
                    "rounded-xl",
                    pkg.popular ? "border-4 border-blue-600 shadow-2xl" : "border-2"
                  )}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-sans tracking-wider">
                      MOST POPULAR
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <pkg.icon className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                    <CardTitle className="heading-unbounded text-2xl mb-2 text-center">{pkg.name}</CardTitle>
                    <div className="text-3xl font-black text-blue-600 mb-2">
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
                    <div
                      className="xola-custom xola-checkout"
                      data-button-id="695186923c261203770cc2e7"
                    >
                      <Button
                        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        data-testid={`button-package-${idx}`}
                      >
                        Select Package
                      </Button>
                    </div>
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
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Everything For Your Birthday
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                We handle the details so you can enjoy your special day
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {birthdayInclusions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 rounded-xl bg-blue-50">
                  <item.icon className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
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
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">04</span>
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Quote className="h-4 w-4 mr-2 inline" />
                Customer Reviews
              </Badge>
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                What Birthday Parties Are Saying
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
                Check out our verified reviews on Google and Facebook!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-lg px-10 py-6"
                  data-testid="button-google-reviews"
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
                  data-testid="button-facebook-reviews"
                >
                  <a href="https://www.facebook.com/premierpartycruises" target="_blank" rel="noopener noreferrer">
                    <Star className="mr-2 h-5 w-5" />
                    View Facebook Reviews
                  </a>
                </Button>
              </div>

              <div className="text-center mt-12">
                <div
                  className="xola-custom xola-checkout"
                  data-button-id="695186923c261203770cc2e7"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-6"
                  >
                    Book Your Birthday Party Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
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
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Birthday Cruise FAQs
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Everything about planning the perfect birthday cruise
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {birthdayFAQs.map((item, idx) => (
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
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">06</span>
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Birthday Memories
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                See the birthday magic on Lake Travis
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {galleryImages.map((image, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover"
                    data-testid={`photo-gallery-birthday-${idx}`}
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
            <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center">
              Ready to Plan Your Birthday Cruise?
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8 text-center">
              Make your birthday legendary on Lake Travis
            </p>
            <div
              className="xola-custom xola-checkout"
              data-button-id="695186923c261203770cc2e7"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl px-12 py-8"
                data-testid="button-final-cta"
              >
                <Sparkles className="mr-2 h-6 w-6" />
                Start Planning Today
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      <PartyPlanningChecklist 
        partyType="Birthday Party"
        eventType="birthday celebration"
      />

      <VideoGallerySection videos={[{id: 'FABtEDZZBA0', title: 'Premier Party Cruises Experience', description: 'See what makes our Lake Travis cruises unforgettable'}]} />

      <Footer />
    </div>
  );
}
