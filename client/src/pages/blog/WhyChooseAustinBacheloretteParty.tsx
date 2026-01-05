import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Phone, Clock, CheckCircle2, 
  Music, Sun, Waves, MapPin, Calendar, Star,
  ArrowRight, Utensils, Wine, Sparkles, Mountain,
  DollarSign, Thermometer, Heart, Crown, Compass,
  Camera, Flower2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/clever girl-10 austin bachelorette party_1763966476658.jpg';
import sectionImage1 from '@assets/clever-girl-3-bachelorette-boat.jpg';
import sectionImage2 from '@assets/clever girl-1 lake travis party boat rental_1763966476656.jpg';
import sectionImage3 from '@assets/clever girl-2 party boat rental austin_1763966476657.jpg';

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
    description: 'Crystal-clear waters, stunning views, and private party boat cruises. The ultimate bachelorette celebration setting.',
    stat: '4+ Hours',
    statLabel: 'of on-water fun',
    color: 'text-pink-600',
    bg: 'bg-pink-100'
  },
  {
    icon: Music,
    title: 'Legendary Nightlife',
    description: '6th Street bars, Rainey Street bungalows, rooftop lounges. Dance and celebrate from sunset to sunrise.',
    stat: '250+',
    statLabel: 'bars & venues',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  {
    icon: Utensils,
    title: 'World-Class Food Scene',
    description: 'Food trucks, James Beard restaurants, legendary BBQ, and trendy brunch spots. Foodie paradise.',
    stat: '1000+',
    statLabel: 'restaurants',
    color: 'text-orange-600',
    bg: 'bg-orange-100'
  },
  {
    icon: Sun,
    title: 'Perfect Year-Round Weather',
    description: '300 days of sunshine. Mild winters. Perfect for outdoor celebrations any time of year.',
    stat: '300+',
    statLabel: 'sunny days/year',
    color: 'text-yellow-600',
    bg: 'bg-yellow-100'
  },
  {
    icon: Camera,
    title: 'Instagram-Worthy Spots',
    description: 'Famous murals, stunning lake views, rooftop bars. Your feed will be content-ready for days.',
    stat: '50+',
    statLabel: 'iconic photo spots',
    color: 'text-rose-600',
    bg: 'bg-rose-100'
  },
  {
    icon: Waves,
    title: 'Thriving Party Boat Culture',
    description: 'Lake Travis is synonymous with boat parties. Top-tier boats, experienced crews, unforgettable experiences.',
    stat: '15+',
    statLabel: 'years of experience',
    color: 'text-cyan-600',
    bg: 'bg-cyan-100'
  },
  {
    icon: Flower2,
    title: 'Luxurious Spa Options',
    description: 'Milk + Honey, Viva Day Spa, Lake Austin Spa Resort. Group packages for pampering perfection.',
    stat: '20+',
    statLabel: 'luxury spas',
    color: 'text-emerald-600',
    bg: 'bg-emerald-100'
  },
  {
    icon: Compass,
    title: 'Central Location',
    description: 'Direct flights from everywhere. Easy drive from major Texas cities. Convenient for all guests.',
    stat: '2-3 hrs',
    statLabel: 'from major cities',
    color: 'text-indigo-600',
    bg: 'bg-indigo-100'
  },
  {
    icon: DollarSign,
    title: 'Affordable Luxury',
    description: 'No state income tax means better deals. Premium experiences at reasonable prices.',
    stat: '0%',
    statLabel: 'state income tax',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    icon: Heart,
    title: '"Keep Austin Weird" Culture',
    description: 'Friendly locals. Laid-back vibes. No pretense. Your group will feel welcome everywhere.',
    stat: '#1',
    statLabel: 'friendliest city',
    color: 'text-pink-600',
    bg: 'bg-pink-100'
  }
];

const nightlifeSpots = [
  {
    name: '6th Street',
    specialty: 'Classic party strip',
    tip: 'No cover charges, live music everywhere. Start here for the full Austin experience.',
    vibe: 'High Energy'
  },
  {
    name: 'Rainey Street',
    specialty: 'Upscale bungalow bars',
    tip: 'Converted houses with great cocktails and food trucks. Bride squad favorite.',
    vibe: 'Trendy'
  },
  {
    name: 'Warehouse District',
    specialty: 'Clubs & rooftops',
    tip: 'Bottle service, dance floors, VIP treatment. Perfect for the final night.',
    vibe: 'VIP'
  },
  {
    name: 'East 6th Street',
    specialty: 'Hipster hangouts',
    tip: 'Speakeasies, craft cocktails, unique vibes. For the cool bride.',
    vibe: 'Trendy'
  }
];

const instagramSpots = [
  {
    name: '"I Love You So Much" Mural',
    location: 'South Congress',
    type: 'Iconic Wall'
  },
  {
    name: 'Greetings from Austin',
    location: 'South 1st Street',
    type: 'Postcard Mural'
  },
  {
    name: 'Mount Bonnell',
    location: 'West Austin',
    type: 'Scenic Overlook'
  },
  {
    name: 'Lake Travis Party Boat',
    location: 'Lake Travis',
    type: 'On the Water'
  },
  {
    name: 'Congress Avenue Bridge Bats',
    location: 'Downtown',
    type: 'Sunset Experience'
  },
  {
    name: 'Hotel Van Zandt Rooftop',
    location: 'Rainey Street',
    type: 'Rooftop Views'
  }
];

const austinVsComparison = [
  { category: 'Flights', austin: 'Affordable from anywhere', miami: 'Expensive year-round', nashville: 'Limited options' },
  { category: 'Drinks', austin: '$8-12 cocktails', miami: '$18+ everywhere', nashville: '$12-15 average' },
  { category: 'Food', austin: 'World-class diversity', miami: 'Trendy = expensive', nashville: 'Good but limited' },
  { category: 'Nightlife', austin: 'Free entry, live music', miami: 'Cover charges, lines', nashville: 'Crowded, touristy' },
  { category: 'Water Fun', austin: 'Lake Travis boats', miami: 'Crowded beaches', nashville: 'No water options' },
  { category: 'Vibe', austin: 'Authentic, relaxed', miami: 'Pretentious scene', nashville: 'Overdone bachelorettes' }
];

const seasonalGuide = [
  {
    season: 'Spring (Mar-May)',
    weather: '70-85°F',
    pros: ['Perfect boat weather', 'Bluebonnet season', 'Great availability'],
    pricing: 'Moderate - book early for SXSW weekends',
    rating: 5
  },
  {
    season: 'Summer (Jun-Aug)',
    weather: '85-100°F',
    pros: ['Peak lake season', 'Longest days', 'Best swimming'],
    pricing: 'Higher - prime bachelorette season',
    rating: 4
  },
  {
    season: 'Fall (Sep-Nov)',
    weather: '70-85°F',
    pros: ['Perfect weather', 'Football weekends', 'ACL Fest vibes'],
    pricing: 'Moderate - book around UT home games',
    rating: 5
  },
  {
    season: 'Winter (Dec-Feb)',
    weather: '45-65°F',
    pros: ['Budget-friendly', 'Fewer crowds', 'Cozy nightlife'],
    pricing: 'Lowest - best deals',
    rating: 3
  }
];

const faqs = [
  {
    question: 'How much does an Austin bachelorette party cost?',
    answer: 'Budget $250-400 per person for a weekend. This covers accommodations, food, drinks, and activities. Lake Travis boat rentals run $150-200 per person for a 4-hour cruise. Austin is more affordable than Miami or Vegas while delivering premium experiences.'
  },
  {
    question: 'What\'s the best area to stay for a bachelorette party?',
    answer: 'Downtown Austin is ideal for nightlife access to 6th Street and Rainey Street. The Domain offers upscale shopping and dining. For lake-focused trips, Lake Travis vacation rentals in Lakeway provide stunning views and proximity to marinas.'
  },
  {
    question: 'Can we bring our own alcohol on Lake Travis boats?',
    answer: 'Yes! Premier Party Cruises is BYOB. Bring coolers with wine, champagne, seltzers—whatever you want. We recommend Party On Delivery service—they bring everything to the marina. Just no glass containers allowed.'
  },
  {
    question: 'Is Austin good for bachelorette parties in winter?',
    answer: 'Austin winters are mild (45-65°F). While boat season typically ends in October, you still have incredible nightlife, spa days, wine tasting, shopping on South Congress, and great restaurants. Plus, prices are much lower.'
  },
  {
    question: 'How do I book a Lake Travis party boat?',
    answer: 'Start with Premier Party Cruises. Choose from private boats (14-75 guests) or the ATX Disco Cruise (the only multi-group bachelorette cruise in the U.S.). Book 2-4 weeks ahead for regular weekends, 4-6 weeks for holidays.'
  },
  {
    question: 'What makes Austin better than Nashville for bachelorettes?',
    answer: 'Austin offers something Nashville can\'t: Lake Travis party boats. Plus, Austin is less overdone—you won\'t see matching bride squad shirts everywhere. The nightlife is more diverse, food scene is stronger, and the vibe is more relaxed.'
  },
  {
    question: 'How many days should we plan for?',
    answer: 'Most groups do 2-3 nights. Typical itinerary: Day 1 (arrival + Rainey Street), Day 2 (Lake Travis boat + spa + 6th Street), Day 3 (brunch + shopping + departure). Add a fourth day for wine tasting or more activities.'
  },
  {
    question: 'What should we wear on the boat?',
    answer: 'Cute swimsuits, cover-ups, and sandals. Bring a change of clothes for afterward. We provide towels and floats. Don\'t forget sunglasses, sunscreen, and a waterproof phone case for photos!'
  }
];

export default function WhyChooseAustinBacheloretteParty() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Why Choose Austin for Your Bachelorette Party | 10 Amazing Reasons</title>
        <meta name="description" content="Austin is the perfect bachelorette party destination. Lake Travis party boats, incredible nightlife, luxury spas, and Instagram-worthy moments. Here's why bride squads pick ATX." />
        <meta name="keywords" content="Austin bachelorette party, Lake Travis bachelorette, bachelorette party Austin Texas, Austin vs Nashville bachelorette, bachelorette party ideas Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/why-choose-austin-bachelorette-party" />
        <meta property="og:title" content="Why Choose Austin for Your Bachelorette Party | 10 Amazing Reasons" />
        <meta property="og:description" content="Austin delivers the ultimate bachelorette experience. Lake Travis boats, world-class nightlife, and memories that last forever." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/clever-girl-3-bachelorette-boat.jpg" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-pink-800" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-transparent to-pink-900/50" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-6 bg-pink-500 text-white font-bold text-sm px-4 py-1">
              THE ULTIMATE BACHELORETTE DESTINATION
            </Badge>
            
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Why Austin Beats <br className="hidden sm:block" />
              <span className="text-pink-300">Nashville & Miami</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Lake Travis party boats. World-class nightlife. Unforgettable memories.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              10 reasons the bride squad picks Austin for the celebration of a lifetime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/bachelorette-party-austin">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg px-8 py-6">
                  <Ship className="mr-2 h-5 w-5" />
                  Book Your Boat Party
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Custom Quote
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>500+ bachelorette parties hosted</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-400" />
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">10 Reasons Austin Shines</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Skip the overdone destinations. Austin delivers authentic experiences that truly celebrate the bride.
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
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-200 group">
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
        <section className="py-20 bg-gradient-to-br from-pink-900 via-purple-800 to-pink-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-pink-400 text-black font-bold">AUSTIN'S #1 BACHELORETTE EXPERIENCE</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Lake Travis Party Boats</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    This is it. The crown jewel of Austin bachelorette party experiences. 
                    Picture your squad on a Lake Travis bachelorette party boat, champagne in hand, 
                    cruising across crystal-clear waters for an unforgettable Austin bachelorette party celebration.
                  </p>
                  <p className="text-lg text-white/80 mb-8 leading-relaxed">
                    Premier Party Cruises runs the best boats on the lake. 
                    Professional captains. Bluetooth sound systems. Giant lily pad floats. 
                    BYOB welcome. This is the experience every bride deserves.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {[
                      { label: 'Private boats', value: '14-75 guests' },
                      { label: 'Cruise duration', value: '4 hours' },
                      { label: 'BYOB policy', value: 'Yes, bring it all' },
                      { label: 'Book ahead', value: '2-4 weeks' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/10 rounded-lg p-4">
                        <p className="text-pink-300 text-sm">{item.label}</p>
                        <p className="font-bold text-lg">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      'Private boat for your squad only',
                      'Professional captain handles everything',
                      'Swim, float, and dance on the water',
                      'Perfect for groups of any size',
                      'Easy marina access with free parking'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-pink-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/bachelorette-party-austin">
                    <Button size="lg" className="bg-pink-400 hover:bg-pink-300 text-black font-bold">
                      <Ship className="mr-2 h-5 w-5" />
                      See Bachelorette Party Boats
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1} 
                      alt="Lake Travis bachelorette party boat cruise with austin bachelorette party group"
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

        {/* Instagram Spots Section */}
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
                      alt="Austin bachelorette party photo spots on Lake Travis bachelorette party boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-rose-100 text-rose-700 font-bold">CONTENT FOR DAYS</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Instagram-Worthy Austin</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Austin is a photographer's dream for your Austin bachelorette party. From iconic murals to stunning lake views, 
                    your bachelorette party austin texas adventure will have content for days.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Capture the bride squad at these must-visit spots, and don't forget the 
                    golden hour photos aboard your Lake Travis bachelorette party boat cruise.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {instagramSpots.map((spot, index) => (
                      <div key={index} className="bg-rose-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Camera className="h-4 w-4 text-rose-600" />
                          <h4 className="font-bold text-sm">{spot.name}</h4>
                        </div>
                        <p className="text-xs text-gray-500">{spot.location}</p>
                        <Badge className="mt-2 text-xs bg-rose-100 text-rose-700">{spot.type}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Nightlife Section */}
        <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 text-white">
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
                250+ live music venues. Rooftop bars. Craft cocktails. 
                Austin's nightlife is legendary—and perfect for celebrating the bride.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {nightlifeSpots.map((spot, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full bg-white/10 backdrop-blur border-white/20 text-white">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg">{spot.name}</h3>
                        <Badge className="bg-pink-400 text-black text-xs">{spot.vibe}</Badge>
                      </div>
                      <p className="text-pink-300 text-sm mb-4">{spot.specialty}</p>
                      <p className="text-sm text-white/80">💡 {spot.tip}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={sectionImage3}
                alt="Bachelorette party austin texas nightlife scene after Lake Travis party boat"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Austin vs Nashville/Miami Comparison */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-100 text-pink-700 font-bold">THE REAL COMPARISON</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Austin vs. Miami vs. Nashville</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Miami is overpriced. Nashville is overdone. 
                Austin is the authentic choice.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-4 bg-gray-100 dark:bg-gray-700 p-4 font-bold text-sm">
                  <div>Category</div>
                  <div className="text-center text-pink-600">Austin</div>
                  <div className="text-center text-gray-500">Miami</div>
                  <div className="text-center text-gray-500">Nashville</div>
                </div>
                {austinVsComparison.map((row, index) => (
                  <div key={index} className={`grid grid-cols-4 p-4 text-sm ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}`}>
                    <div className="font-medium">{row.category}</div>
                    <div className="text-center text-pink-600 font-medium">{row.austin}</div>
                    <div className="text-center text-gray-500">{row.miami}</div>
                    <div className="text-center text-gray-500">{row.nashville}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Bottom line: Your squad deserves <span className="text-pink-600 font-bold">something different</span>.
                </p>
                <Link href="/chat">
                  <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white font-bold">
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
                  <Card className={`h-full ${season.rating === 5 ? 'border-2 border-pink-400 shadow-lg' : ''}`}>
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
                            <CheckCircle2 className="h-4 w-4 text-pink-500" />
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
                Everything you need to know about planning your Austin bachelorette party.
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
        <section className="py-20 bg-gradient-to-br from-pink-900 via-purple-800 to-pink-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Crown className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Give the Bride the Celebration She Deserves
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Lake Travis bachelorette party boat cruises. Incredible nightlife. Unforgettable memories. 
                Austin bachelorette party delivers the celebration of a lifetime.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/bachelorette-party-austin">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-pink-900 font-bold text-lg px-8 py-6">
                    <Ship className="mr-2 h-5 w-5" />
                    Book Your Boat Party
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Get Custom Quote
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>500+ bachelorette parties hosted</span>
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
