import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Phone, Clock, CheckCircle2, 
  Music, Sun, Waves, MapPin, Calendar, Star,
  ArrowRight, Utensils, Beer, Mountain, Sparkles,
  DollarSign, Camera, Droplets, PartyPopper, Trophy,
  Home, Package, Truck, Heart, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/bachelor-party-group-guys-hero-compressed.webp';
import sectionImage1 from '@assets/@capitalcityshots-30_1760080807867.jpg';
import sectionImage2 from '@assets/@capitalcityshots-31_1760080807867.jpg';
import sectionImage3 from '@assets/@capitalcityshots-32_1760073243497.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const discoCruiseFeatures = [
  { icon: Music, text: 'Professional DJ spinning the perfect bachelor party playlist' },
  { icon: Camera, text: 'Professional photographer capturing every epic moment' },
  { icon: Waves, text: 'Giant 25-foot unicorn float & massive lily pad floats' },
  { icon: Droplets, text: 'Ice water stations to keep you hydrated' },
  { icon: Package, text: 'Private coolers for your group' },
  { icon: PartyPopper, text: 'Party supplies included' },
  { icon: Users, text: 'Multi-group energy with 50-100 people celebrating' },
  { icon: Sparkles, text: 'All-inclusive: Just show up and party' }
];

const bbqSpots = [
  { name: 'Franklin Barbecue', description: 'The legendary brisket worth waiting for' },
  { name: "Terry Black's", description: 'No-wait lines with premium quality' },
  { name: 'La Barbecue', description: 'East Austin favorite with amazing sides' },
  { name: "Cooper's BBQ", description: 'Hill Country style, pick your own meat' }
];

const nightlifeAreas = [
  { name: 'Sixth Street', description: 'Wild energy, tons of bars, live music everywhere', vibe: 'High Energy' },
  { name: 'Rainey Street', description: 'Bungalow bars, cocktails, food trucks, bachelor-heavy crowds', vibe: 'Upscale Casual' },
  { name: 'East Austin', description: 'Craft cocktails, cool neighborhood spots, hidden speakeasies', vibe: 'Trendy' }
];

const activities = [
  { name: 'Urban Axes', type: 'Axe Throwing' },
  { name: 'Topgolf Austin', type: 'Golf Entertainment' },
  { name: 'Lions Municipal Golf Course', type: 'Traditional Golf' },
  { name: 'Butler Pitch & Putt', type: 'Casual Golf' }
];

export default function EpicBachelorPartyAustinGuide() {
  return (
    <div data-page-ready="epic-bachelor-party-austin-guide" className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>Epic Bachelor Party Austin, TX: Top Ideas & Tips | Premier Party Cruises</title>
        <meta 
          name="description" 
          content="Plan the ultimate bachelor party in Austin, TX! Discover nightlife, outdoor adventures, Lake Travis boat parties, BBQ spots, and insider tips including the legendary ATX Disco Cruise." 
        />
        <meta 
          name="keywords" 
          content="bachelor party Austin, Austin bachelor party ideas, Lake Travis bachelor party, ATX Disco Cruise, Austin nightlife bachelor party, bachelor party planning Austin TX, Sixth Street bachelor party, Rainey Street bachelor party" 
        />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/epic-bachelor-party-austin-ultimate-guide" />
        
        <meta property="og:title" content="Epic Bachelor Party Austin, TX: Top Ideas & Tips" />
        <meta property="og:description" content="Plan the ultimate bachelor party in Austin! Lake Travis boats, nightlife, BBQ, and the legendary ATX Disco Cruise." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/epic-bachelor-party-austin-ultimate-guide" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Epic Bachelor Party in Austin, TX: The Ultimate Guide to Planning an Unforgettable Weekend",
            "description": "Plan the ultimate bachelor party in Austin, TX! Discover nightlife, outdoor adventures, Lake Travis boat parties, BBQ spots, and insider tips including the legendary ATX Disco Cruise.",
            "image": "https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp",
            "author": {
              "@type": "Organization",
              "name": "Premier Party Cruises",
              "url": "https://premierpartycruises.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Premier Party Cruises",
              "url": "https://premierpartycruises.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://premierpartycruises.com/media/schema/ppc-logo.png"
              }
            },
            "datePublished": "2025-01-01",
            "dateModified": "2025-12-09",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://premierpartycruises.com/blogs/epic-bachelor-party-austin-ultimate-guide"
            }
          })}
        </script>
      </Helmet>

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage 
            src={heroImage} 
            alt="Austin bachelor party group celebrating on Lake Travis bachelor party boat" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-slate-900/70 to-black/80"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Badge className="mb-6 bg-yellow-500/20 text-yellow-300 border-yellow-500/50 text-sm px-4 py-1">
                THE ULTIMATE AUSTIN BACHELOR PARTY GUIDE
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Epic Bachelor Party in<br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Austin, TX
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                The ultimate guide to planning an unforgettable Austin bachelor party weekend. Lake Travis bachelor party boat rentals, 
                legendary nightlife, world-class BBQ, and the iconic ATX Disco Cruise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/atx-disco-cruise">
                  <Button 
                    size="lg" 
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-yellow-400/50 transition-all hover:scale-105"
                    data-testid="button-hero-book-cruise"
                  >
                    <Ship className="mr-2 h-5 w-5" />
                    Book ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                    data-testid="button-hero-get-quote"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Get a Custom Quote
                  </Button>
                </Link>
              </div>
              
              <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-yellow-400" />
                  <span>Thousands of Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span>4.9★ Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <span>15+ Years Experience</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Austin Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">WHY AUSTIN</Badge>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Why Austin Is the Best City for a Bachelor Party
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Live music, world-class BBQ, iconic nightlife, epic lakeside adventures, and nonstop bachelor-party energy. 
                Austin has everything you need for an unforgettable celebration.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <LazyImage 
                  src={sectionImage1} 
                  alt="Austin bachelor party boat cruise on Lake Travis bachelor party boat" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  The #1 Austin Bachelor Party Experience
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  When it comes to <strong>Austin bachelor party ideas</strong>, one experience stands above everything else: 
                  a Lake Travis bachelor party boat with Premier Party Cruises and their legendary <strong>ATX Disco Cruise</strong>—a four-hour, high-energy, 
                  all-inclusive lake party that Austin bachelor party groups say is the highlight of the entire trip.
                </p>
                <div className="space-y-3">
                  {['No planning stress - everything included', 'Multi-group energy multiplies the fun', 'Professional DJ & photographer', 'Perfect for groups of any size'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/atx-disco-cruise">
                    <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-learn-disco">
                      Learn About ATX Disco Cruise <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Bachelor Party Ideas */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-yellow-100 text-yellow-700">TOP IDEAS</Badge>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Top Bachelor Party Ideas in Austin
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Everything you need for the ultimate bachelor weekend
              </p>
            </motion.div>

            {/* Idea 1: Lake Travis */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12"
            >
              <Card className="border-2 border-blue-200 dark:border-blue-800 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Ship className="h-8 w-8" />
                    </div>
                    <div>
                      <span className="text-blue-200 text-sm font-semibold">#1 BACHELOR PARTY ACTIVITY</span>
                      <h3 className="text-2xl font-black">Lake Travis Party with Premier Party Cruises</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    A Lake Travis bachelor party boat is THE move for Austin bachelor party weekends. Premier Party Cruises is the #1 company bachelor groups trust, 
                    with 150,000+ guests hosted and a perfect safety record. Choose between private party boats or the iconic 
                    <strong> ATX Disco Cruise</strong>—Austin's only multi-group, all-inclusive bachelor/bachelorette Lake Travis bachelor party boat experience.
                  </p>
                  
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                    The ATX Disco Cruise Includes:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    {discoCruiseFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <feature.icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-6">
                    <p className="text-yellow-800 dark:text-yellow-300 font-semibold text-lg mb-2">
                      "It was WAY better than renting a private boat because the energy is insane."
                    </p>
                    <p className="text-yellow-700 dark:text-yellow-400 text-sm">— What most bachelor groups say</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/atx-disco-cruise">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-bold" data-testid="button-book-disco">
                        <Ship className="mr-2 h-5 w-5" />
                        Book ATX Disco Cruise
                      </Button>
                    </Link>
                    <Link href="/private-cruises">
                      <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" data-testid="button-private-boats">
                        View Private Boat Options
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Idea 2: BYOB & Alcohol Delivery */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12"
            >
              <Card className="border-2 border-green-200 dark:border-green-800 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Truck className="h-8 w-8" />
                    </div>
                    <div>
                      <span className="text-green-200 text-sm font-semibold">SKIP THE ERRANDS</span>
                      <h3 className="text-2xl font-black">BYOB Made Easy with Alcohol Delivery</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Bachelor groups LOVE Austin—but they hate errands. Our boats are BYOB, meaning you bring your own drinks. 
                    Skip the liquor store runs with <strong>Party On Delivery</strong>, the official alcohol-delivery concierge 
                    that stocks your Airbnb or delivers directly to your Premier Party Cruises boat.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {[
                      { icon: Home, text: 'Stock your Airbnb before you arrive' },
                      { icon: Ship, text: 'Deliver directly to your boat' },
                      { icon: Package, text: 'Beer, seltzers, liquor, mixers, ice - all delivered' },
                      { icon: Clock, text: 'Last-minute refills available' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <item.icon className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/faq">
                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" data-testid="button-byob-info">
                      Learn More About BYOB <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Idea 3: Nightlife */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12"
            >
              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Music className="h-8 w-8" />
                    </div>
                    <div>
                      <span className="text-purple-200 text-sm font-semibold">LEGENDARY NIGHTLIFE</span>
                      <CardTitle className="text-2xl font-black">Sixth Street & Rainey Street</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Austin bachelor party nightlife is unmatched. From the wild energy of Sixth Street to the upscale bungalow bars of Rainey Street, 
                    your Austin bachelor party has endless options for an epic night out after your Lake Travis bachelor party boat adventure.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {nightlifeAreas.map((area, i) => (
                      <div key={i} className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl">
                        <Badge className="mb-2 bg-purple-200 text-purple-800">{area.vibe}</Badge>
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{area.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{area.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="mt-6 text-gray-600 dark:text-gray-400 italic">
                    Pro tip: Start on Rainey for the upscale vibe, then head to Sixth if you want a crazier, more bachelor-party-focused night out.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Idea 4: BBQ */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12"
            >
              <Card className="border-2 border-orange-200 dark:border-orange-800">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Utensils className="h-8 w-8" />
                    </div>
                    <div>
                      <span className="text-orange-200 text-sm font-semibold">TEXAS TRADITION</span>
                      <CardTitle className="text-2xl font-black">Best BBQ Spots in Texas</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    A <strong>bachelor party in Austin</strong> isn't complete without BBQ. Texas brisket is the real deal—worth every minute in line.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {bbqSpots.map((spot, i) => (
                      <div key={i} className="flex items-start gap-4 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
                        <div className="bg-orange-200 dark:bg-orange-800 p-2 rounded-full">
                          <Utensils className="h-5 w-5 text-orange-700 dark:text-orange-300" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{spot.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{spot.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 italic">
                    Pro tip: Order ahead for pickup so your group skips the line.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Idea 5: Activities */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-amber-200 dark:border-amber-800">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Beer className="h-6 w-6 text-amber-600" />
                      <CardTitle>Brewery Tours</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Austin's craft beer scene is legendary. Breweries are perfect for pre-gaming—fun, relaxed, spacious.
                    </p>
                    <p className="font-semibold text-amber-700 dark:text-amber-400">50+ local breweries to explore</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-200 dark:border-red-800">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Mountain className="h-6 w-6 text-red-600" />
                      <CardTitle>Daytime Activities</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {activities.map((activity, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">{activity.name}</span>
                          <Badge variant="outline" className="text-xs">{activity.type}</Badge>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm italic">
                      Perfect midday fillers before your big boat day!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sample Itinerary */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">SAMPLE ITINERARY</Badge>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                3-Day Austin Bachelor Party Itinerary
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Maximize the party. Minimize the chaos.
              </p>
            </motion.div>

            <div className="space-y-8">
              {/* Day 1 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">DAY 1</span>
                      Arrive + Night Out
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Land in Austin',
                        'Head to your Airbnb (pre-stocked with drinks via Party On Delivery)',
                        'Pre-game at the house',
                        'Hit Rainey Street for upscale vibes',
                        'End the night on Sixth Street'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Day 2 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm">DAY 2</span>
                      The ATX Disco Cruise + BBQ + Nightlife
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-500" /> THE MAIN EVENT: ATX Disco Cruise
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2 text-yellow-700 dark:text-yellow-400 text-sm">
                        {['DJ already spinning', 'Photographer snapping photos', 'Private cooler ready', 'Unicorn float out', 'Lake Travis energy unmatched', 'Multi-group dance party', 'Epic swimming + party cove'].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 font-semibold text-yellow-800 dark:text-yellow-300">
                        Most groups agree: This is the best bachelor activity Austin has to offer.
                      </p>
                    </div>
                    <div className="space-y-3">
                      {[
                        'Morning: Light breakfast, hydrate, rally the troops',
                        'Midday: ATX Disco Cruise (your bachelor party peaks here)',
                        'Afternoon: BBQ feast at Terry Black\'s or Franklin',
                        'Night: Hit Rainey or go fancy at a steakhouse'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <ChevronRight className="h-4 w-4 text-yellow-500" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Day 3 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">DAY 3</span>
                      Recover + Explore + Chill
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Brunch at a local spot',
                        'Paddleboarding or kayaking',
                        'A brewery tour',
                        'Watch a game',
                        'Enjoy the city before flying out',
                        'Rest, recover, laugh about what happened on the boat'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <ChevronRight className="h-4 w-4 text-green-500" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Stay */}
      <section className="py-16 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <Badge className="mb-4 bg-slate-200 text-slate-700">ACCOMMODATIONS</Badge>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                Where to Stay for a Bachelor Party in Austin
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Downtown Hotels', description: 'Easy access to nightlife. Walk to Sixth Street and Rainey.', icon: MapPin },
                { title: 'Rainey Street Lofts', description: 'Walkable bachelor heaven. Right in the heart of the action.', icon: Home },
                { title: 'Lake Travis Airbnbs', description: 'Perfect if you\'re prioritizing the boat day with Premier Party Cruises.', icon: Waves }
              ].map((option, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <option.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{option.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{option.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-16 bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <Trophy className="h-12 w-12 mx-auto text-yellow-200 mb-4" />
              <h2 className="text-3xl font-black mb-4">Final Tips for an Epic Bachelor Party in Austin</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { num: '1', tip: 'Book your Premier Party Cruises spot early—bachelor weekends sell out fast' },
                { num: '2', tip: 'Pre-stock your weekend with Party On Delivery—save hours and avoid Uber rides' },
                { num: '3', tip: 'Hydrate and pace yourselves—Austin heat + bachelor energy = chaos' },
                { num: '4', tip: 'Combine nightlife + lake life—this is the formula for the best weekend' },
                { num: '5', tip: 'Keep the groom the priority—build the weekend around what he wants' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-sm p-5 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <span className="bg-white text-orange-600 font-black text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.num}
                    </span>
                    <p className="text-lg">{item.tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FAQ</Badge>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What's the best bachelor party activity in Austin?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline">ATX Disco Cruise</Link> hosted by Premier Party Cruises. Nothing compares. 
                  It's a four-hour, all-inclusive lake party with DJ, photographer, floats, and incredible multi-group energy.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Do we need a private boat?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  If your group is under 12, the Disco Cruise is usually cheaper AND more fun due to the multi-group energy. 
                  For larger groups, Premier also offers <Link href="/private-cruises" className="text-blue-600 hover:underline">private charters</Link>.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  How do we get alcohol without running errands?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  Our boats are BYOB. Use Party On Delivery for alcohol delivery to your Airbnb or directly to your boat. 
                  Check out our <Link href="/faq" className="text-blue-600 hover:underline">FAQ page</Link> for more details on BYOB policies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Do bachelor parties really mingle on the ATX Disco Cruise?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  Yes! That's half the fun. You're surrounded by 50-100 people all celebrating something epic. 
                  The multi-group energy is what makes it the best bachelor party experience in Austin.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-black text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <LazyImage 
                src={sectionImage3} 
                alt="Bachelor party Austin Texas celebration on Lake Travis bachelor party boat" 
                className="rounded-2xl shadow-2xl w-full h-64 object-cover mb-8 mx-auto"
                aspectRatio="21/9"
              />
              
              <h2 className="text-4xl font-black mb-6">
                Ready to Plan the Best Austin Bachelor Party?
              </h2>
              <p className="text-xl text-blue-200 mb-8">
                Make it easy. Make it unforgettable. Book a Lake Travis bachelor party boat with Premier Party Cruises and 
                the rest of your Austin bachelor party practically plans itself.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/atx-disco-cruise">
                  <Button 
                    size="lg" 
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-10 py-7 shadow-2xl transition-all hover:scale-105"
                    data-testid="button-final-cta-disco"
                  >
                    <Ship className="mr-2 h-6 w-6" />
                    Book ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-10 py-7"
                    data-testid="button-final-cta-quote"
                  >
                    <Calendar className="mr-2 h-6 w-6" />
                    Get Your Free Quote
                  </Button>
                </Link>
              </div>
              
              <p className="mt-8 text-blue-300">
                Questions? Call us at <a href="tel:5124885892" className="text-yellow-400 hover:underline font-semibold">(512) 488-5892</a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
