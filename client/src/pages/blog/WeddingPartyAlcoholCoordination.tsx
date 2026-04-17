import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Wine, Phone, Clock, CheckCircle2, 
  MapPin, Calendar, Star, ArrowRight, Heart,
  Truck, Shield, Package, Sparkles, PartyPopper,
  GlassWater, Beer, Music, Camera, Waves, Crown,
  Gift, Utensils, Sun, Anchor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-25_1760080807866.jpg';
import gettingReadyImage from '@assets/@capitalcityshots-21_1760080807864.jpg';
import bachelorImage from '@assets/bachelor-party-group-guys.webp';
import bacheloretteImage from '@assets/@capitalcityshots-22_1760080807865.jpg';
import receptionImage from '@assets/@capitalcityshots-23_1760080807865.jpg';
import lakeTravisImage from '@assets/clever-girl-50-person-boat.webp';

const gettingReadyTips = [
  {
    icon: GlassWater,
    title: 'Champagne Toast',
    description: 'Start the day with a celebratory champagne toast while getting ready. Keep it light - mimosas are perfect for morning prep.'
  },
  {
    icon: Clock,
    title: 'Timing is Everything',
    description: 'Plan drink delivery for 1-2 hours before photos. This gives everyone time to enjoy without rushing.'
  },
  {
    icon: Utensils,
    title: 'Pair with Snacks',
    description: 'Always have food available when serving alcohol. Light bites keep energy up and prevent anyone from overdoing it.'
  },
  {
    icon: Package,
    title: 'Pre-Order with Party On Delivery',
    description: 'Schedule your getting ready drinks through Party On Delivery for stress-free Austin alcohol delivery to your hotel or venue.'
  }
];

const bachelorPartyTips = [
  {
    icon: Beer,
    title: 'BYOB Lake Travis Cruises',
    description: 'Our private party boats are BYOB-friendly. Bring your own beer, seltzers, and spirits for maximum savings and selection.'
  },
  {
    icon: Ship,
    title: 'Coolers & Ice Provided',
    description: 'All Premier Party Cruises boats come with coolers and ice. Just bring your drinks in cans or plastic - no glass allowed on the water.'
  },
  {
    icon: Shield,
    title: 'Pace the Party',
    description: 'A 4-hour Lake Travis cruise is a marathon, not a sprint. Start with beer and seltzers, save the hard stuff for later.'
  },
  {
    icon: Truck,
    title: 'Party On Delivery Coordination',
    description: 'Order through Party On Delivery and have everything delivered to the marina. They handle the logistics so you can focus on fun.'
  }
];

const bachelorettePartyTips = [
  {
    icon: Wine,
    title: 'Rosé All Day',
    description: 'Rosé cans are perfect for boat parties - easy to carry, no glass, and always Instagram-worthy. Order through Party On Delivery.'
  },
  {
    icon: Sparkles,
    title: 'Signature Cocktails',
    description: 'Pre-mix batch cocktails in pitchers for easy serving. Margaritas, sangria, and frosé are Lake Travis favorites.'
  },
  {
    icon: Camera,
    title: 'Photo-Ready Setup',
    description: 'Coordinate matching koozies or custom cups with your drinks. Makes for great group photos on the boat.'
  },
  {
    icon: Heart,
    title: 'Bride-Focused Drinks',
    description: 'Have the bride\'s favorite drinks stocked and ready. This is her day - make sure her glass is never empty!'
  }
];

const receptionCoordination = [
  {
    title: 'Calculate Quantities',
    description: 'Plan for 1-2 drinks per person per hour. A 4-hour reception for 100 guests needs approximately 400-800 drinks.',
    icon: Package
  },
  {
    title: 'Variety is Key',
    description: 'Stock beer, wine, and a signature cocktail. Consider non-alcoholic options for designated drivers and non-drinkers.',
    icon: GlassWater
  },
  {
    title: 'Temperature Control',
    description: 'Austin heat requires extra ice. Plan for 1.5 lbs per person for outdoor receptions, doubled for summer events.',
    icon: Sun
  },
  {
    title: 'Bar Service Timeline',
    description: 'Open bar during cocktail hour and dinner, then transition to beer and wine to manage consumption later in the evening.',
    icon: Clock
  }
];

const partyOnDeliveryBenefits = [
  { icon: Truck, title: 'Same-Day Delivery', description: 'Order by 2pm for same-day delivery anywhere in Austin and Lake Travis area.' },
  { icon: Package, title: 'Wedding Packages', description: 'Curated packages for bachelor parties, bachelorette weekends, and reception bars.' },
  { icon: MapPin, title: 'Marina Delivery', description: 'Direct delivery to boat docks for seamless Lake Travis party boat coordination.' },
  { icon: Phone, title: 'Concierge Service', description: 'Personal coordination for multi-event wedding weekends - getting ready, parties, and reception.' }
];

const lakeTravisOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Intimate bridal parties', description: 'Perfect for close friends getting ready together' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Bachelor/Bachelorette groups', description: 'Ideal size for wedding party celebrations' },
  { name: 'The Irony', capacity: '30 guests', best: 'Combined bach parties', description: 'Great for joint bachelor-bachelorette events' },
  { name: 'Clever Girl', capacity: '50-75 guests', best: 'Reception alternatives', description: 'Floating reception venue on Lake Travis' }
];

const whyPremier = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Reviews' },
  { stat: '125K+', label: 'Happy Guests' }
];

const faqs = [
  {
    question: 'How do I coordinate alcohol across multiple wedding events?',
    answer: 'Start by creating a master timeline of all events: getting ready, bachelor party, bachelorette party, rehearsal dinner, and reception. Partner with Party On Delivery for Austin alcohol delivery to each location. They offer wedding weekend packages that coordinate deliveries to hotels, venues, and even marina docks for Lake Travis parties.'
  },
  {
    question: 'What alcohol should I bring for a Lake Travis bachelor party cruise?',
    answer: 'For a Lake Travis bachelor party, bring beer, hard seltzers, and your preferred spirits in plastic bottles. No glass is allowed on the water. Plan for about 3-4 drinks per person for a 4-hour cruise. Our boats provide coolers and ice - just bring the drinks! Party On Delivery can deliver directly to the marina.'
  },
  {
    question: 'How does Party On Delivery work for wedding weekend coordination?',
    answer: 'Party On Delivery offers same-day alcohol delivery throughout Austin and Lake Travis. For weddings, they provide concierge service to coordinate multiple deliveries across your weekend - from hotel getting-ready suites to bachelor party boats to reception venues. Order online or call for personalized wedding weekend planning.'
  },
  {
    question: 'Can I have alcohol delivered to my Lake Travis party boat?',
    answer: 'Yes! Party On Delivery delivers directly to marina docks on Lake Travis. Coordinate with Premier Party Cruises for your departure time and arrange delivery 30-60 minutes before boarding. All drinks must be in cans or plastic containers - no glass allowed on the water.'
  },
  {
    question: 'How much alcohol do I need for a wedding reception?',
    answer: 'Calculate 1-2 drinks per person per hour. For a 100-guest, 4-hour reception, plan for 400-800 drinks total. A typical split: 40% beer, 30% wine, 20% signature cocktails, 10% non-alcoholic. Party On Delivery offers reception packages with recommended quantities based on your guest count.'
  },
  {
    question: 'What are the best getting ready drinks for a wedding party?',
    answer: 'Mimosas and champagne are classic getting ready drinks. Keep them light since photos come early! Have Party On Delivery bring champagne, orange juice, and light snacks to your hotel or getting ready location. Add some sparkling water to keep everyone hydrated before the big day.'
  }
];

export default function WeddingPartyAlcoholCoordination() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/wedding-party-alcohol-coordination-getting-ready-bachelor-bachelorette-and-reception"
        defaultTitle="Wedding Party Alcohol Coordination: Getting Ready, Bachelor/Bachelorette & Reception | Austin Guide"
        defaultDescription="Complete guide to coordinating alcohol across all wedding party events in Austin. From getting ready champagne toasts to bachelor party Lake Travis cruises, bachelorette celebrations, and reception bars. Party On Delivery tips included."
        defaultKeywords={['wedding party alcohol coordination', 'Austin wedding drinks', 'bachelor party alcohol', 'bachelorette party drinks', 'Lake Travis wedding cruise', 'Party On Delivery Austin', 'getting ready champagne', 'wedding reception bar', 'Austin alcohol delivery']}
        image="https://premierpartycruises.com/attached_assets/@capitalcityshots-25_1760080807866.jpg"
      />

      <BlogV2Layout
        title="Wedding Party Alcohol Coordination: Getting Ready, Bachelor/Bachelorette & Reception"
        description="Complete guide to coordinating alcohol across all wedding party events in Austin. From getting ready champagne toasts to bachelor party Lake Travis cruises, bachelorette celebrations, and reception bars."
        slug="wedding-party-alcohol-coordination-getting-ready-bachelor-bachelorette-and-reception"
        category="Wedding Guides"
        categoryHref="/wedding-parties"
        pillarTitle="Austin Wedding Boat Cruises"
        pillarHref="/wedding-parties"
        relatedArticles={[
          { title: "Austin Wedding Venue Alcohol Policies & Delivery Solutions", href: "/blogs/austin-wedding-venue-alcohol-policies-delivery-solutions-for-every-location" },
          { title: "Outdoor Wedding Alcohol Logistics - Hill Country & Lake Travis", href: "/blogs/outdoor-wedding-alcohol-logistics-hill-country-and-lake-travis-coordination" },
          { title: "Lake Travis Wedding Boat Rentals - Unique Venues for Austin Celebrations", href: "/blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations" },
        ]}
      >
      <div className="min-h-screen">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-rose-900 via-purple-800 to-rose-900 text-white overflow-hidden"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Wedding Party Alcohol Coordination: Getting Ready, Bachelor/Bachelorette & Reception - Premier Party Cruises Lake Travis"
          />
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-500 text-black font-bold">
              COMPLETE WEDDING WEEKEND GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Wedding Party Alcohol Coordination:<br />Getting Ready, Bachelor/Bachelorette & Reception
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Your complete guide to coordinating <strong>alcohol across all wedding party events</strong> in Austin. From champagne toasts while getting ready to <strong>Lake Travis party cruises</strong> and reception bars.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/wedding-parties">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6">
                  <Heart className="mr-2 h-5 w-5" />
                  Plan Your Wedding Party
                </Button>
              </Link>
              <Link href="/rehearsal-dinner-cruise">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  Rehearsal Dinner Cruise
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </m.section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse our full range of{' '}
            <Link href="/party-boat-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin party boat rentals</Link>{' '}
            for celebrations of every kind on Lake Travis.
          </p>
        </div>
      </div>


        {/* Introduction */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Coordinating Alcohol Across Your Wedding Weekend</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Planning a wedding in Austin means coordinating multiple celebrations - each with its own drink needs. From the intimate <strong>champagne toast while getting ready</strong> to the wild <strong>bachelor party on Lake Travis</strong>, the glamorous <strong>bachelorette boat cruise</strong>, and finally the <strong>wedding reception bar</strong>, every event requires thoughtful alcohol planning.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                This comprehensive guide covers everything you need to know about <strong>wedding party alcohol coordination in Austin</strong>. We'll share our favorite tips from 14+ years of hosting wedding parties on Lake Travis, plus how to partner with <strong>Party On Delivery</strong> for seamless Austin alcohol delivery to every venue.
              </p>
              <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-lg border border-rose-200 dark:border-rose-800">
                <p className="text-rose-800 dark:text-rose-200 font-semibold flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Pro Tip: Book your Lake Travis party cruise early - wedding season fills up fast!
                </p>
              </div>
            </m.div>
          </div>
        </section>

        {/* Getting Ready Day Drinks Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-rose-500 text-white">MORNING OF</Badge>
                  <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Getting Ready Day Drinks</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    The wedding day starts with your closest friends getting ready together. Make it special with perfectly timed champagne deliveries and light refreshments that set the celebratory tone without overdoing it before photos.
                  </p>
                  
                  <div className="space-y-4">
                    {gettingReadyTips.map((tip, index) => (
                      <m.div key={index} variants={fadeInUp}>
                        <Card className="border-l-4 border-l-rose-500">
                          <CardContent className="p-4 flex items-start gap-4">
                            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                              <tip.icon className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{tip.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </m.div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <img 
                    src={gettingReadyImage} 
                    alt="Wedding party getting ready with champagne" 
                    className="rounded-xl shadow-xl w-full h-auto"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-black p-4 rounded-lg shadow-lg">
                    <p className="font-bold text-sm">Party On Delivery Tip:</p>
                    <p className="text-xs">Order by 2pm for same-day delivery!</p>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Bachelor Party Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative">
                  <img 
                    src={bachelorImage} 
                    alt="Bachelor party group on Lake Travis party boat" 
                    className="rounded-xl shadow-xl w-full h-auto"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                    <p className="font-bold text-sm">BYOB Friendly</p>
                    <p className="text-xs">Coolers & ice provided!</p>
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-blue-600 text-white">BACHELOR PARTY</Badge>
                  <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Bachelor Party Alcohol Tips</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    The <strong>bachelor party on Lake Travis</strong> is the ultimate pre-wedding celebration. Our BYOB party boats let the groom and his crew bring their own drinks for the perfect day on the water. Here's how to coordinate alcohol for an epic bachelor party.
                  </p>
                  
                  <div className="space-y-4">
                    {bachelorPartyTips.map((tip, index) => (
                      <m.div key={index} variants={fadeInUp}>
                        <Card className="border-l-4 border-l-blue-600">
                          <CardContent className="p-4 flex items-start gap-4">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <tip.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{tip.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </m.div>
                    ))}
                  </div>
                  
                  <Link href="/bachelor-party-austin">
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                      View Bachelor Party Packages
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Bachelorette Party Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-pink-500 text-white">BACHELORETTE PARTY</Badge>
                  <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Bachelorette Party Alcohol Tips</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    The <strong>bachelorette party on Lake Travis</strong> deserves the perfect drink setup. From Instagram-worthy rosé to fun batch cocktails, here's how to coordinate alcohol for an unforgettable girls' day on the water.
                  </p>
                  
                  <div className="space-y-4">
                    {bachelorettePartyTips.map((tip, index) => (
                      <m.div key={index} variants={fadeInUp}>
                        <Card className="border-l-4 border-l-pink-500">
                          <CardContent className="p-4 flex items-start gap-4">
                            <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                              <tip.icon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{tip.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </m.div>
                    ))}
                  </div>
                  
                  <Link href="/bachelorette-party-austin">
                    <Button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white">
                      View Bachelorette Packages
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <img 
                    src={bacheloretteImage} 
                    alt="Bachelorette party celebrating on Lake Travis" 
                    className="rounded-xl shadow-xl w-full h-auto"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-pink-500 text-white p-4 rounded-lg shadow-lg">
                    <p className="font-bold text-sm">Rosé All Day!</p>
                    <p className="text-xs">Cans only - no glass on boats</p>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Reception Coordination Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-purple-600 text-white">WEDDING RECEPTION</Badge>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Reception Alcohol Coordination</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The wedding reception bar requires careful planning. Whether you're hosting at a traditional venue or considering a unique <strong>Lake Travis reception cruise</strong>, here's how to coordinate alcohol for the big celebration.
              </p>
            </m.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {receptionCoordination.map((item, index) => (
                <m.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
            
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={receptionImage} 
                alt="Wedding reception celebration" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center">
                <div className="p-8 max-w-lg">
                  <h3 className="text-2xl font-bold text-white mb-2">Consider a Floating Reception</h3>
                  <p className="text-white/90 mb-4">Our 50-75 guest Clever Girl yacht offers a unique Lake Travis wedding reception experience with stunning sunset views.</p>
                  <Link href="/private-cruises">
                    <Button className="bg-yellow-500 hover:bg-yellow-400 text-black">
                      Explore Reception Cruises
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Party On Delivery Partnership Section */}
        <section className="py-16 bg-gradient-to-br from-yellow-400 to-orange-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-black text-white">PARTNER SPOTLIGHT</Badge>
              <h2 className="text-3xl font-bold mb-4 text-black">Party On Delivery: Austin's Wedding Weekend Partner</h2>
              <p className="text-lg text-black/80 max-w-3xl mx-auto">
                Simplify your <strong>wedding party alcohol coordination</strong> with Party On Delivery. From getting ready champagne to marina dock deliveries for Lake Travis cruises, they handle the logistics so you can focus on celebrating.
              </p>
            </m.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partyOnDeliveryBenefits.map((benefit, index) => (
                <m.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <Card className="h-full bg-white/90 backdrop-blur hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="h-6 w-6 text-yellow-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-black font-semibold mb-4">Mention "Premier Party Cruises" for wedding weekend coordination!</p>
              <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                  <Truck className="mr-2 h-5 w-5" />
                  Visit Party On Delivery
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Lake Travis Wedding Cruises Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <Badge className="mb-4 bg-brand-blue text-white">LAKE TRAVIS</Badge>
                  <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Lake Travis Wedding Party Cruises</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Premier Party Cruises offers the perfect vessels for every wedding party event on Lake Travis. From intimate <strong>bachelor party boats</strong> to large <strong>bachelorette cruise vessels</strong> and even floating reception venues, we have options for every celebration.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    All boats are <strong>BYOB-friendly</strong> with coolers and ice provided. Coordinate your drinks with Party On Delivery for marina dock delivery, and we'll handle the rest!
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {whyPremier.map((item, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-brand-blue">{item.stat}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <img 
                    src={lakeTravisImage} 
                    alt="Lake Travis party boat for wedding parties" 
                    className="rounded-xl shadow-xl w-full h-auto"
                  />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Our Wedding Party Fleet</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {lakeTravisOptions.map((boat, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Ship className="h-8 w-8 text-brand-blue mb-4" />
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{boat.name}</h4>
                      <p className="text-sm text-brand-blue font-semibold mb-2">{boat.capacity}</p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Best for: {boat.best}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{boat.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-white dark:bg-gray-900 rounded-lg border">
                    <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </m.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-rose-900 via-purple-800 to-rose-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Heart className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Plan Your Wedding Party Celebration?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                From bachelor parties to bachelorette cruises and everything in between, Premier Party Cruises makes your Lake Travis wedding celebrations unforgettable. Contact us today for a custom quote!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/private-cruises">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6">
                    <Ship className="mr-2 h-5 w-5" />
                    View Party Boat Options
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us
                  </Button>
                </Link>
              </div>
              
              <p className="mt-8 text-white/70 text-sm">
                Questions? Call us at <a href="tel:+15124885892" className="text-yellow-400 hover:underline">(512) 488-5892</a>
              </p>
            </m.div>
          </div>
        </section>

      </div>
      </BlogV2Layout>
    </>
    </LazyMotionProvider>
  );
}
