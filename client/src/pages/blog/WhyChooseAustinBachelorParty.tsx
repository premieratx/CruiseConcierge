import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Phone, Clock, CheckCircle2, 
  Music, Sun, Waves, MapPin, Calendar, Star,
  ArrowRight, Utensils, Beer, Gamepad2, Mountain,
  DollarSign, Thermometer, Heart, Trophy, Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/bachelor-party-group-guys-hero-compressed.webp';
import sectionImage1 from '@assets/@capitalcityshots-44_1760080807870.jpg';
import sectionImage2 from '@assets/@capitalcityshots-45_1760080807870.jpg';
import sectionImage3 from '@assets/@capitalcityshots-46_1760080807871.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const topReasons = [
  {
    icon: Ship,
    title: 'Lake Travis Party Boats',
    description: 'Austin\'s #1 bachelor party experience. Private boats, professional DJs, and swimming in crystal-clear water.',
    stat: '4+ Hours',
    statLabel: 'of on-water fun',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    icon: Utensils,
    title: 'World-Class BBQ',
    description: 'Franklin, Terry Black\'s, La Barbecue. Texas brisket is the real deal. Worth every minute in line.',
    stat: '50+',
    statLabel: 'BBQ joints citywide',
    color: 'text-orange-600',
    bg: 'bg-orange-100'
  },
  {
    icon: DollarSign,
    title: 'No State Income Tax',
    description: 'Your budget stretches further in Texas. More money for boats, booze, and BBQ.',
    stat: '0%',
    statLabel: 'state income tax',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    icon: Music,
    title: 'Electric Nightlife',
    description: '6th Street. Rainey Street. Warehouse District. Live music every night. No cover charges.',
    stat: '250+',
    statLabel: 'live music venues',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  {
    icon: Mountain,
    title: 'Outdoor Adventures',
    description: 'Kayaking, hiking, golf, zip-lining. Austin has it all. Perfect for active bachelor parties.',
    stat: '300+',
    statLabel: 'miles of trails',
    color: 'text-emerald-600',
    bg: 'bg-emerald-100'
  },
  {
    icon: Beer,
    title: 'Craft Beer Capital',
    description: 'Over 50 breweries. Brewery tours. Tap rooms. Austin takes beer seriously.',
    stat: '50+',
    statLabel: 'local breweries',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  {
    icon: Gamepad2,
    title: 'TopGolf & Entertainment',
    description: 'TopGolf, ax throwing, racing simulators, arcades. Guys\' paradise.',
    stat: '3',
    statLabel: 'TopGolf locations',
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  {
    icon: Compass,
    title: 'Central Location',
    description: 'Direct flights from everywhere. Easy drive from Dallas, Houston, San Antonio.',
    stat: '2-3 hrs',
    statLabel: 'from major cities',
    color: 'text-indigo-600',
    bg: 'bg-indigo-100'
  },
  {
    icon: Thermometer,
    title: 'Perfect Weather',
    description: 'Sun 300+ days a year. Mild winters. Boat season runs March through October.',
    stat: '300+',
    statLabel: 'sunny days/year',
    color: 'text-yellow-600',
    bg: 'bg-yellow-100'
  },
  {
    icon: Heart,
    title: '"Keep Austin Weird" Culture',
    description: 'Friendly locals. Laid-back vibes. No pretense. Everyone\'s welcome here.',
    stat: '#1',
    statLabel: 'friendliest city',
    color: 'text-pink-600',
    bg: 'bg-pink-100'
  }
];

const bbqSpots = [
  {
    name: 'Franklin Barbecue',
    specialty: 'Legendary brisket',
    tip: 'Get in line by 8 AM. Worth the 3-hour wait.',
    price: '$$$'
  },
  {
    name: 'Terry Black\'s BBQ',
    specialty: 'No wait, great quality',
    tip: 'Perfect for groups. Full bar on-site.',
    price: '$$'
  },
  {
    name: 'La Barbecue',
    specialty: 'Food truck vibes',
    tip: 'BYOB-friendly. Cash only.',
    price: '$$'
  },
  {
    name: 'Stiles Switch BBQ',
    specialty: 'Local favorite',
    tip: 'Try the jalapeño cheddar sausage.',
    price: '$$'
  }
];

const nightlifeDistricts = [
  {
    name: '6th Street (Dirty Sixth)',
    vibe: 'Classic party strip',
    highlights: ['No cover charges', 'Shot bars everywhere', 'Live music nightly'],
    bestFor: 'Traditional bachelor party chaos'
  },
  {
    name: 'Rainey Street',
    vibe: 'Upscale house bars',
    highlights: ['Converted bungalows', 'Great cocktails', 'Food trucks'],
    bestFor: 'Chill vibes with style'
  },
  {
    name: 'Warehouse District',
    vibe: 'Clubs and lounges',
    highlights: ['Bottle service', 'Dance floors', 'Rooftop bars'],
    bestFor: 'VIP treatment'
  },
  {
    name: 'East 6th Street',
    vibe: 'Hipster hangouts',
    highlights: ['Craft cocktails', 'Speakeasies', 'Dive bars'],
    bestFor: 'Unique, local experience'
  }
];

const austinVsComparison = [
  { category: 'Flights', austin: 'Affordable from anywhere', vegas: 'Expensive peak times', miami: 'Expensive year-round' },
  { category: 'Drinks', austin: '$5-8 beers', vegas: '$15+ beers on strip', miami: '$12+ everywhere' },
  { category: 'Food', austin: 'World-class BBQ cheap', vegas: 'Overpriced buffets', miami: 'Trendy = expensive' },
  { category: 'Nightlife', austin: 'Free entry, live music', vegas: 'Cover charges, lines', miami: 'Bottle service required' },
  { category: 'Water Fun', austin: 'Lake Travis boats', vegas: 'Pool parties only', miami: 'Crowded beaches' },
  { category: 'Vibe', austin: 'Authentic, relaxed', vegas: 'Manufactured chaos', miami: 'Pretentious scene' }
];

const seasonalGuide = [
  {
    season: 'Spring (Mar-May)',
    weather: '70-85°F',
    pros: ['Perfect boat weather', 'SXSW vibes (March)', 'Bluebonnet season'],
    pricing: 'Moderate - book early for SXSW weekends',
    rating: 5
  },
  {
    season: 'Summer (Jun-Aug)',
    weather: '85-100°F',
    pros: ['Peak lake season', 'Longest days', 'Best swimming'],
    pricing: 'Higher - prime bachelor party season',
    rating: 4
  },
  {
    season: 'Fall (Sep-Nov)',
    weather: '70-85°F',
    pros: ['Football season', 'Great weather', 'ACL Fest vibes'],
    pricing: 'Moderate - book around UT home games',
    rating: 5
  },
  {
    season: 'Winter (Dec-Feb)',
    weather: '45-65°F',
    pros: ['Budget-friendly', 'Fewer crowds', 'Still plenty to do'],
    pricing: 'Lowest - best deals',
    rating: 3
  }
];

const faqs = [
  {
    question: 'How much does an Austin bachelor party cost?',
    answer: 'Budget $200-400 per person for a weekend. This covers accommodations, food, drinks, and activities. Lake Travis boat rentals run $150-200 per person for a 4-hour cruise. Austin is significantly cheaper than Vegas or Miami.'
  },
  {
    question: 'What\'s the best area to stay for a bachelor party?',
    answer: 'Downtown Austin puts you walking distance to 6th Street, Rainey Street, and great restaurants. For a more upscale vibe, try the Domain. If you\'re focused on lake activities, consider Lake Travis vacation rentals in Lakeway or Volente.'
  },
  {
    question: 'Can we bring our own alcohol on Lake Travis boats?',
    answer: 'Yes! Premier Party Cruises is BYOB. Bring coolers full of beer, wine, and spirits. We recommend Party On Delivery service—they bring everything to the marina. Just no glass containers allowed.'
  },
  {
    question: 'Is Austin good for bachelor parties in winter?',
    answer: 'Austin winters are mild (45-65°F). While boat season typically ends in October, you still have incredible BBQ, nightlife, TopGolf, brewery tours, and sporting events. Plus, prices are much lower.'
  },
  {
    question: 'How do I book a Lake Travis party boat?',
    answer: 'Start with Premier Party Cruises. Choose from private boats (14-75 guests) or the ATX Disco Cruise (public party). Book 2-4 weeks ahead for regular weekends, 4-6 weeks for holidays. Contact us for custom packages.'
  },
  {
    question: 'What makes Austin better than Vegas for bachelor parties?',
    answer: 'Authenticity. Vegas is manufactured fun with inflated prices. Austin offers real Texas experiences—world-class BBQ, genuine live music, beautiful lake scenery, and friendly locals. Your dollar goes 2x further here.'
  },
  {
    question: 'How many days should we plan for?',
    answer: 'Most groups do 2-3 nights. A typical itinerary: Day 1 (arrival + 6th Street), Day 2 (Lake Travis boat + BBQ + Rainey Street), Day 3 (brunch + departure). Add a fourth day for golf or more activities.'
  },
  {
    question: 'What should we wear on the boat?',
    answer: 'Swim trunks, boat shoes or sandals, sunglasses, and sunscreen. Bring a change of clothes for afterward. We provide towels and floats. Don\'t forget a waterproof phone case!'
  }
];

export default function WhyChooseAustinBachelorParty() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Why Choose Austin for Your Bachelor Party | 10 Epic Reasons</title>
        <meta name="description" content="Austin crushes Vegas and Miami for bachelor parties. Lake Travis boats, legendary BBQ, no income tax, electric nightlife. Here's why the groom squad picks ATX." />
        <meta name="keywords" content="Austin bachelor party, Lake Travis bachelor party, bachelor party Austin Texas, Austin vs Vegas bachelor party, bachelor party ideas Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/why-choose-austin-bachelor-party" />
        <meta property="og:title" content="Why Choose Austin for Your Bachelor Party | 10 Epic Reasons" />
        <meta property="og:description" content="Austin crushes Vegas and Miami for bachelor parties. Lake Travis boats, legendary BBQ, and nightlife that doesn't break the bank." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Epic Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-gray-900/50" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-6 bg-blue-500 text-white font-bold text-sm px-4 py-1">
              THE ULTIMATE BACHELOR PARTY DESTINATION
            </Badge>
            
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Why Austin Beats <br className="hidden sm:block" />
              <span className="text-blue-400">Vegas & Miami</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Lake Travis party boats. Legendary BBQ. Electric nightlife.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              10 reasons the groom squad picks Austin for the send-off of a lifetime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/bachelor-party-austin">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-6">
                  <Ship className="mr-2 h-5 w-5" />
                  Book Your Boat Party
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Custom Quote
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>500+ bachelor parties hosted</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span>Groups of 8-75 guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span>4-hour private cruises</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 10 Reasons Grid */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">10 Reasons Austin Dominates</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Forget the tourist traps. Austin delivers authentic experiences that actually matter.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {topReasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className={index < 5 ? '' : ''}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 group">
                    <CardContent className="pt-6 text-center">
                      <div className={`w-14 h-14 mx-auto mb-4 ${reason.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <reason.icon className={`h-7 w-7 ${reason.color}`} />
                      </div>
                      <div className="mb-3">
                        <span className={`text-2xl font-bold ${reason.color}`}>{reason.stat}</span>
                        <p className="text-xs text-gray-500">{reason.statLabel}</p>
                      </div>
                      <h3 className="font-bold text-base mb-2">{reason.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{reason.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lake Travis Featured Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-cyan-400 text-black font-bold">AUSTIN'S #1 BACHELOR PARTY EXPERIENCE</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Lake Travis Party Boats</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    This is it. The crown jewel of Austin bachelor parties. 
                    Picture your crew on a private boat, cold drinks in hand, 
                    cruising across crystal-clear Lake Travis.
                  </p>
                  <p className="text-lg text-white/80 mb-8 leading-relaxed">
                    Premier Party Cruises runs the best boats on the lake. 
                    Professional captains. Bluetooth sound systems. Giant lily pad floats. 
                    BYOB welcome. This is the experience every groom deserves.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {[
                      { label: 'Private boats', value: '14-75 guests' },
                      { label: 'Cruise duration', value: '4 hours' },
                      { label: 'BYOB policy', value: 'Yes, bring it all' },
                      { label: 'Book ahead', value: '2-4 weeks' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/10 rounded-lg p-4">
                        <p className="text-cyan-300 text-sm">{item.label}</p>
                        <p className="font-bold text-lg">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      'Private boat for your crew only',
                      'Professional captain handles everything',
                      'Swim, float, and party on the water',
                      'Perfect for groups of any size',
                      'Easy marina access with free parking'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/bachelor-party-austin">
                    <Button size="lg" className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold">
                      <Ship className="mr-2 h-5 w-5" />
                      See Bachelor Party Boats
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1} 
                      alt="Bachelor party group on Lake Travis party boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white text-gray-900 rounded-xl shadow-lg p-4 max-w-[200px]">
                    <div className="flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-500" />
                      <div>
                        <p className="font-bold text-sm">4.9/5 Stars</p>
                        <p className="text-xs text-gray-500">500+ reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BBQ Section */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src={sectionImage2}
                      alt="Texas BBQ brisket"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-orange-100 text-orange-700 font-bold">FUEL THE CREW</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">World-Class Texas BBQ</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Texas brisket is the real deal. Slow-smoked for 12+ hours. 
                    Bark so good it should be illegal. Austin has the best BBQ in the world.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Whether you brave the Franklin line or hit Terry Black's with no wait, 
                    you're eating some of the finest meat on Earth. This is essential bachelor party fuel.
                  </p>
                  
                  <div className="space-y-4">
                    {bbqSpots.map((spot, index) => (
                      <div key={index} className="bg-orange-50 dark:bg-gray-800 rounded-lg p-4 flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{spot.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{spot.specialty}</p>
                          <p className="text-xs text-orange-600 mt-1">💡 {spot.tip}</p>
                        </div>
                        <span className="text-orange-600 font-bold">{spot.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Nightlife Section */}
        <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-400 text-black font-bold">AFTER DARK</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Austin Nightlife Guide</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                250+ live music venues. No cover charges. Craft cocktails everywhere.
                Austin's nightlife hits different.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {nightlifeDistricts.map((district, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full bg-white/10 backdrop-blur border-white/20 text-white">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-1">{district.name}</h3>
                      <p className="text-pink-300 text-sm mb-4">{district.vibe}</p>
                      <ul className="space-y-2 mb-4">
                        {district.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                            <CheckCircle2 className="h-4 w-4 text-pink-400" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-white/60">Best for: {district.bestFor}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={sectionImage3}
                alt="Austin nightlife scene"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Austin vs Vegas/Miami Comparison */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 font-bold">THE REAL COMPARISON</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Austin vs. Vegas vs. Miami</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Vegas is manufactured fun. Miami is overpriced pretense. 
                Austin is the real deal.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-4 bg-gray-100 dark:bg-gray-700 p-4 font-bold text-sm">
                  <div>Category</div>
                  <div className="text-center text-blue-600">Austin</div>
                  <div className="text-center text-gray-500">Vegas</div>
                  <div className="text-center text-gray-500">Miami</div>
                </div>
                {austinVsComparison.map((row, index) => (
                  <div key={index} className={`grid grid-cols-4 p-4 text-sm ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}`}>
                    <div className="font-medium">{row.category}</div>
                    <div className="text-center text-blue-600 font-medium">{row.austin}</div>
                    <div className="text-center text-gray-500">{row.vegas}</div>
                    <div className="text-center text-gray-500">{row.miami}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Bottom line: Your dollar goes <span className="text-blue-600 font-bold">2x further</span> in Austin.
                </p>
                <Link href="/chat">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                    Get Your Austin Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Best Times to Visit */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700 font-bold">TIMING IS EVERYTHING</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Best Times to Visit</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Austin delivers year-round. Here's what to expect each season.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seasonalGuide.map((season, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className={`h-full ${season.rating === 5 ? 'border-2 border-green-400 shadow-lg' : ''}`}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{season.season}</h3>
                          <p className="text-sm text-gray-500">{season.weather}</p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < season.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {season.pros.map((pro, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t">
                        <p className="text-xs text-gray-500">💰 {season.pricing}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about planning your Austin bachelor party.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Strong CTA Footer */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Trophy className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Give the Groom the Send-Off He Deserves
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Lake Travis party boats. World-class BBQ. Electric nightlife. 
                Austin delivers the bachelor party of a lifetime.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/bachelor-party-austin">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-900 font-bold text-lg px-8 py-6">
                    <Ship className="mr-2 h-5 w-5" />
                    Book Your Boat Party
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Get Custom Quote
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>500+ bachelor parties hosted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>4.9/5 star reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>BYOB welcome</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
