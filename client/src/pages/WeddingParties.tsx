import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigationLuxury';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import Breadcrumb from '@/components/Breadcrumb';
import YouTubeHeroEmbed from '@/components/YouTubeHeroEmbed';
import VideoGallerySection from '@/components/VideoGallerySection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { SectionReveal } from '@/components/SectionReveal';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { weddingReviews } from '@shared/reviews-data';
import { PACKAGE_FLAT_FEES, CREW_FEES } from '@shared/constants';
import { 
  Heart, Users, Star, Calendar, Trophy, Shield, Award,
  MessageSquare, Quote, Volume2, Clock, Sparkles,
  Calculator, Gift, CreditCard, PersonStanding, Camera,
  ChefHat, Wifi, Target, Headphones, Check, Flower,
  Waves, Wine, Umbrella, Music, ArrowRight, Flower2,
  Crown, Anchor, Sun, Zap, ChevronRight, Gem,
  DollarSign, Smile, GlassWater, CheckCircle, Sunset, X, Ship, ChevronDown
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

// Wedding packages - REAL packages only (Standard, Essentials, Ultimate)
const weddingPackages = [
  {
    id: 'standard',
    name: 'Standard Package',
    flatFee: { 14: 0, 25: 0, 30: 0, 50: 0, 75: 0 },
    description: 'Basic cruise experience',
    subtitle: 'The boat, the captain, and the lake - perfect for rehearsal dinners, welcome parties, and after parties',
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
    answer: 'Yes! For food, you have two options: (1) Bring your own - easy items that won\'t make a mess, or (2) We can help arrange full catering and setup from Austin vendors. We can also help coordinate alcohol delivery through Party On Delivery. Our crew ensures professional service throughout your event with tables and cooler space (bring your own ice, or add Essentials/Ultimate packages for ice included) provided.'
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
  { src: heroImage1, alt: 'Wedding Party Boat Austin elegant party boat on Lake Travis' },
  { src: heroImage2, alt: 'Lake Travis Wedding rehearsal dinner boat' },
  { src: heroImage3, alt: 'Wedding Party Boat Austin intimate cruise' },
  { src: galleryImage1, alt: 'Lake Travis Wedding celebration on water' },
  { src: galleryImage2, alt: 'Wedding Party Boat Austin romantic sunset cruise' },
  { src: galleryImage3, alt: 'Lake Travis Wedding party atmosphere' }
];

export default function WeddingParties() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleGetQuote = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" data-page-ready="wedding-parties">
      <SEOHead 
        pageRoute="/wedding-parties"
        defaultTitle="Wedding Party Boat Austin | Lake Travis Rehearsal Dinners & Wedding Events"
        defaultDescription="Austin wedding party boats on Lake Travis. Rehearsal dinners, welcome parties, after parties & celebrations. Sunset views, BYOB, 14-75 guests. Book now!"
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
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden ">
        {/* Wedding Walkthrough Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            src="/attached_assets/Wedding_Walkthrough_Video_1774071375807.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/attached_assets/clever-girl-4-wedding-venue.jpg"
            data-testid="wedding-background-video"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 text-sm font-sans tracking-wider shadow-lg">
            <Heart className="h-4 w-4 mr-2" />
            WEDDING CELEBRATIONS ON THE WATER
            <Heart className="h-4 w-4 ml-2" />
          </Badge>
          <h1 className="heading-unbounded text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-center text-white drop-shadow-lg" data-editable data-editable-id="h1-wedding-hero">
            Austin Wedding Party Boats: Lake Travis Rehearsal Dinners, After Parties & Celebrations
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-6 md:mb-8 font-semibold drop-shadow-md max-w-3xl mx-auto leading-relaxed text-center" data-editable data-editable-id="p-wedding-tagline">
            Wedding Celebrations on the Water
          </p>
          <div className="inline-block bg-black/40 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 sm:py-6 shadow-xl max-w-5xl mx-auto mb-8 border border-white/20">
            <p className="text-lg sm:text-xl md:text-2xl text-white font-semibold leading-relaxed">
              Rehearsal Dinners • Welcome Parties • After Parties
              <br />
              Elegant celebrations with sunset views on Lake Travis
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div
              className="xola-custom xola-checkout"
              data-button-id="695186923c261203770cc2e7"
            >
              <Button
                size="lg"
                className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg"
                data-testid="button-hero-get-quote"
              >
                <Heart className="mr-2 h-5 w-5" />
                BOOK NOW
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <Button
              onClick={handleGetQuote}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-3 rounded-lg"
              data-testid="button-hero-view-packages"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              GET A QUOTE
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
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Austin's Most Romantic Wedding Venue
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Your wedding weekend deserves extraordinary moments on the water
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Sunset, title: 'Sunset Romance', desc: 'Golden hour lighting creates magical moments and stunning wedding photos' },
                { icon: Heart, title: 'Intimate Elegance', desc: 'Premium party boat setting brings families together in exclusive atmosphere' },
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
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
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
                    <CardTitle className="heading-unbounded text-2xl mb-2 text-center">{event.name}</CardTitle>
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

      {/* Wedding Specific Event Navigation */}
      <SectionReveal>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-12">
              Plan Your Specific Wedding Event
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Rehearsal Dinner",
                  href: "/rehearsal-dinner-cruise",
                  desc: "An elegant sunset dinner cruise for your closest family and friends.",
                  icon: Wine,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "Bridal Shower",
                  href: "/bridal-shower-cruise",
                  desc: "Celebrate the bride-to-be with a unique brunch or afternoon cruise.",
                  icon: Flower2,
                  color: "from-pink-400 to-purple-400"
                },
                {
                  title: "Engagement Party",
                  href: "/engagement-party-cruise",
                  desc: "Toast to your new engagement with a private party on Lake Travis.",
                  icon: Heart,
                  color: "from-purple-600 to-pink-600"
                },
                {
                  title: "Proposal Cruise",
                  href: "/proposal-cruise",
                  desc: "Pop the question with a romantic, private sunset backdrop.",
                  icon: Sparkles,
                  color: "from-pink-500 to-purple-500"
                }
              ].map((item, idx) => (
                <Link key={idx} href={item.href}>
                  <a className="block h-full group">
                    <Card className="h-full rounded-xl border-2 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      <CardContent className="pt-8 px-6 text-center flex flex-col h-full">
                        <div className={cn(
                          "w-16 h-16 rounded-full bg-gradient-to-br mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300",
                          item.color
                        )}>
                          <item.icon className="h-8 w-8" />
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mb-6 flex-grow">{item.desc}</p>
                        <div className="flex items-center justify-center text-purple-600 font-bold group-hover:translate-x-1 transition-transform">
                          Plan This Event <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
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
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
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
                    <CardTitle className="heading-unbounded text-2xl mb-2 text-center">{pkg.name}</CardTitle>
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
                        className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">04</span>
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
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
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
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

      {/* Wedding Weekend Bach Party Options */}
      <SectionReveal>
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 border-t border-purple-100">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span className="inline-block bg-purple-600 text-white font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-6">WEDDING WEEKEND EXTRAS</span>
            <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Planning a Bachelor or Bachelorette Party Too?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
              The <Link href="/atx-disco-cruise"><a className="text-purple-700 font-bold hover:underline">ATX Disco Cruise</a></Link> is Austin's #1 rated bachelor and bachelorette party experience — and it's the perfect addition to any wedding weekend. Your bridal party can celebrate on Friday or Saturday while you finalize rehearsal dinner details. Or book the bride and groom their own <Link href="/combined-bachelor-bachelorette-austin"><a className="text-purple-700 font-bold hover:underline">combined bach party cruise</a></Link> the day before the big day.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <Card className="border-2 border-purple-200 hover:border-purple-500 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-3">👰</div>
                  <h3 className="font-bold text-xl mb-2 heading-unbounded text-gray-900">Bachelorette Party</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">From $85/person. Professional DJ, photographer, giant floats, and BYOB. The highlight of her Austin weekend.</p>
                  <Link href="/bachelorette-party-austin"><a className="inline-flex items-center gap-1 text-purple-700 font-bold hover:underline text-sm">See bachelorette options <ArrowRight className="h-4 w-4" /></a></Link>
                </CardContent>
              </Card>
              <Card className="border-2 border-blue-200 hover:border-blue-500 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-3">🤵</div>
                  <h3 className="font-bold text-xl mb-2 heading-unbounded text-gray-900">Bachelor Party</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">Same incredible experience for the groom's crew. DJ, photographer, lake floats — everything included from $85/person.</p>
                  <Link href="/bachelor-party-austin"><a className="inline-flex items-center gap-1 text-blue-700 font-bold hover:underline text-sm">See bachelor options <ArrowRight className="h-4 w-4" /></a></Link>
                </CardContent>
              </Card>
              <Card className="border-2 border-pink-200 hover:border-pink-500 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-3">💑</div>
                  <h3 className="font-bold text-xl mb-2 heading-unbounded text-gray-900">Combined Party</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">Bride and groom celebrate together — one unforgettable co-ed party on Lake Travis before the big day.</p>
                  <Link href="/combined-bachelor-bachelorette-austin"><a className="inline-flex items-center gap-1 text-pink-700 font-bold hover:underline text-sm">See combined options <ArrowRight className="h-4 w-4" /></a></Link>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              <Link href="/atx-disco-cruise">
                <a className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg transition-colors">
                  ⭐ Explore the ATX Disco Cruise
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 10. Planning Guides Section */}
      <SectionReveal>
        <section className="py-24 bg-white border-t">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-12">
              Wedding Planning & Logistics Guides
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Boat Party Planning & Logistics",
                  href: "/blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide",
                  desc: "Complete planning and coordination guide for your Lake Travis boat party."
                },
                {
                  title: "Lake Travis Large Groups Guide",
                  href: "/blogs/lake-travis-large-groups-guide",
                  desc: "Essential tips for organizing successful events for groups of 20+."
                }
              ].map((item, idx) => (
                <Link key={idx} href={item.href}>
                  <a className="block group">
                    <Card className="h-full rounded-xl border-2 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      <CardContent className="pt-8 px-6 text-center flex flex-col h-full">
                        <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mb-6 flex-grow">{item.desc}</p>
                        <div className="flex items-center justify-center text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                          Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQs Section */}
      <SectionReveal>
        <div id="faqs" className="scroll-mt-20">
          <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">06</span>
                <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                  Wedding Cruise FAQs
                </h2>
                <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                  Everything for planning your wedding event
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto text-left">
                {weddingFAQs.map((faq, idx) => (
                  <Collapsible
                    key={idx}
                    open={openFaq === idx}
                    onOpenChange={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full bg-white rounded-xl border shadow-sm h-fit"
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors rounded-xl">
                      <span className="font-bold text-lg text-gray-900">{faq.question}</span>
                      <ChevronDown className={cn(
                        "h-5 w-5 text-gray-500 transition-transform duration-200",
                        openFaq === idx && "transform rotate-180"
                      )} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </section>
        </div>
      </SectionReveal>

      {/* Photo Gallery Section */}
      <SectionReveal>
        <section className="py-24 bg-white border-t">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">07</span>
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
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
        <section className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 text-center text-white">
            <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center">
              Ready to Plan Your Wedding Cruise?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-400">
              Create unforgettable memories for your wedding weekend on Lake Travis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                className="xola-custom xola-checkout"
                data-button-id="695186923c261203770cc2e7"
              >
                <Button
                  size="lg"
                  className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg"
                  data-testid="button-final-cta"
                >
                  <Sparkles className="mr-2 h-6 w-6" />
                  BOOK NOW
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* INTERNAL LINKS STRIP */}
      <section className="py-6 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <Link href="/atx-disco-cruise" className="hover:text-brand-yellow transition-colors">ATX Disco Cruise</Link>
            <Link href="/private-cruises" className="hover:text-brand-yellow transition-colors">Private Cruises</Link>
            <Link href="/bachelor-party-austin" className="hover:text-brand-yellow transition-colors">Bachelor Party Austin</Link>
            <Link href="/bachelorette-party-austin" className="hover:text-brand-yellow transition-colors">Bachelorette Party Austin</Link>
            <Link href="/wedding-parties" className="hover:text-brand-yellow transition-colors">Wedding Parties</Link>
            <Link href="/birthday-parties" className="hover:text-brand-yellow transition-colors">Birthday Parties</Link>
            <Link href="/celebration-cruises" className="hover:text-brand-yellow transition-colors">Celebration Cruises</Link>
            <Link href="/corporate-events" className="hover:text-brand-yellow transition-colors">Corporate Events</Link>
            <Link href="/party-boat-lake-travis" className="hover:text-brand-yellow transition-colors">Party Boat Lake Travis</Link>
            <Link href="/gallery" className="hover:text-brand-yellow transition-colors">Gallery</Link>
            <Link href="/blogs" className="hover:text-brand-yellow transition-colors">Blog & Tips</Link>
            <Link href="/contact" className="hover:text-brand-yellow transition-colors">Contact</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
