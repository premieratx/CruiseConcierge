import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, PartyPopper, Phone, Clock, CheckCircle2, 
  Anchor, Music, Sun, Waves, MapPin, Calendar, Beer, Star,
  ArrowRight, Camera, Shield, Utensils, Car, Mic, Sparkles,
  Heart, Trophy, Gift, Crown, Zap, Home, Coffee, Plane,
  Sunrise, Sunset, Moon, Smartphone, DollarSign, UtensilsCrossed
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { BlogImageBreak, BlogPhotoStrip, BLOG_BOAT_PHOTOS, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';

import bachelorHero from '@assets/bachelor-party-group-guys.webp';
import discoParty from '@assets/atx-disco-cruise-party.webp';
import dancingScene from '@assets/dancing-party-scene.webp';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const day1Highlights = [
  { icon: Plane, title: 'Arrive in Austin', description: 'Land at AUS, gather the crew, and head to your rental' },
  { icon: Home, title: 'Check Into Your Airbnb', description: 'Pre-stocked fridge courtesy of Party On Delivery' },
  { icon: Beer, title: '6th Street Bar Crawl', description: 'Legendary Dirty 6th nightlife awaits' },
  { icon: Music, title: 'Live Music', description: 'Austin is the Live Music Capital of the World' }
];

const day2Highlights = [
  { icon: Ship, title: 'ATX Disco Cruise', description: 'The main event - party boat on Lake Travis' },
  { icon: Users, title: 'Co-Ed Party', description: 'Bachelor & bachelorette groups together' },
  { icon: Utensils, title: 'Texas BBQ Dinner', description: 'Franklin, Terry Black\'s, or Salt Lick' },
  { icon: Sparkles, title: 'Rainey Street', description: 'Craft cocktails in converted bungalows' }
];

const day3Highlights = [
  { icon: Coffee, title: 'Recovery Brunch', description: 'Gus\'s Fried Chicken or Juan in a Million' },
  { icon: Waves, title: 'Barton Springs', description: 'Spring-fed pool for the ultimate hangover cure' },
  { icon: Sun, title: 'Final Activities', description: 'South Congress shopping or last drinks' },
  { icon: Plane, title: 'Depart', description: 'Head home with unforgettable memories' }
];

const mustHaveChecklist = [
  'Book ATX Disco Cruise tickets in advance',
  'Reserve Airbnb near downtown or Lake Travis',
  'Order Party On Delivery for pre-arrival stocking',
  'Plan transportation (rideshare, party bus)',
  'Make BBQ reservations (especially Franklin)',
  'Download rideshare apps (Uber, Lyft)',
  'Pack swimsuits and lake gear',
  'Bring comfortable shoes for bar crawling',
  'Coordinate matching shirts or accessories',
  'Set up group payment app (Venmo, Splitwise)'
];

export default function PerfectAustinBachelorPartyWeekend() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>The Perfect Austin Bachelor Party Weekend: A 3-Day Itinerary | Premier Party Cruises</title>
        <meta name="description" content="Plan the perfect bachelor party in Austin with our complete 3-day itinerary. From the ATX Disco Cruise on Lake Travis to 6th Street bar crawls, Texas BBQ, and Rainey Street - discover the ultimate Austin bachelor party weekend guide." />
        <meta name="keywords" content="Austin bachelor party, bachelor party in Austin, Austin party boat, party boat Austin, Lake Travis party barge, ATX Disco Cruise, ideas for bachelor party in Austin, Austin bachelor party itinerary, 3 day bachelor party Austin, bachelor party weekend Austin TX" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/perfect-austin-bachelor-party-weekend" />
        <meta property="og:title" content="The Perfect Austin Bachelor Party Weekend: A 3-Day Itinerary" />
        <meta property="og:description" content="Your complete guide to planning an epic 3-day bachelor party in Austin. Lake Travis party boats, 6th Street, BBQ, and more." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys.webp" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bachelorHero})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-500 text-black font-bold" data-testid="badge-3-day-itinerary">
              3-DAY BACHELOR PARTY ITINERARY
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              The Perfect Austin Bachelor Party Weekend:<br />A 3-Day Itinerary
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Your complete day-by-day guide to planning an unforgettable <strong>bachelor party in Austin</strong>. From the famous ATX Disco Cruise to legendary nightlife and Texas BBQ - we've got every hour planned.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/atx-disco-cruise">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6" data-testid="button-book-disco-cruise-hero">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Book ATX Disco Cruise
                </Button>
              </Link>
              <Link href="/bachelor-party-austin">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-packages-hero">
                  View All Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Introduction */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Planning the Ultimate Austin Bachelor Party Weekend</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                So you've been tasked with planning an <strong>austin bachelor party</strong> – congratulations! You've picked one of the best party destinations in the country. With a <strong>lake travis bachelor party boat</strong> as your centerpiece, this weekend will be legendary. But with so many ideas, where do you even start? That's where this comprehensive 3-day itinerary comes in.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Whether your groom loves <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">Austin party boats</Link>, legendary nightlife, mouth-watering BBQ, or outdoor adventures, this guide covers it all. We'll walk you through each day from arrival to departure, highlighting the must-do activities that make Austin bachelor parties unforgettable – including the famous <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link>, the only co-ed party boat experience in the country.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                <strong>Pro tip before we dive in:</strong> The secret to a stress-free <strong>Austin bachelor party</strong> weekend starts before you even land. Use <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> to have your rental house or Airbnb fully stocked with drinks, mixers, snacks, and ice before you arrive. Trust us – walking into a ready-to-party fridge changes everything!
              </p>

              <BlogImageBreak
                src={bachelorHero}
                alt="Austin bachelor party boat cruise celebration on Lake Travis Texas"
                caption="Your Austin bachelor party adventure starts here"
              />
            </motion.div>
          </div>
        </section>

        {/* Day 1 Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
                <div>
                  <Badge className="bg-orange-500 text-white mb-1">FRIDAY</Badge>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Day 1: Arrival, Settling In & Dive into Austin Nights</h2>
                </div>
              </div>

              {/* Day 1 Schedule */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Friday Schedule
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-orange-600">2-4 PM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Arrive in Austin</h4>
                      <p className="text-gray-600 dark:text-gray-400">Fly into Austin-Bergstrom International Airport (AUS). Coordinate everyone's arrival times and arrange airport pickups or rideshares to your accommodation.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-orange-600">4-5 PM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Check Into Your Rental (Fridge Pre-Stocked!)</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Head to your Airbnb or vacation rental – ideally near downtown Austin or out by <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline">Lake Travis</Link> for easy access to the party boat tomorrow. Here's the game-changer: before your arrival, you should have already scheduled <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> to stock your fridge with all the beer, liquor, mixers, and snacks you'll need for the weekend.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Imagine walking in to find cold beers and cocktail ingredients waiting – no scrambling to find a liquor store, no wasting precious party time on errands. <strong>Party On Delivery</strong> handles the heavy lifting so your crew can immediately crack open drinks and get the celebration started.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-orange-600">5-7 PM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Chill, Unpack, and Pre-Game</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Take some time to settle in, claim bedrooms, and toast to the start of the weekend. With your fridge already stocked by <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a>, mix up some margaritas or crack open some local Austin craft beers. This is a great time for the groom to open any gag gifts or for the best man to give a short toast.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-orange-600">7-9 PM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Dinner – Tex-Mex or Tacos</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Fuel up for the night ahead with classic Austin Tex-Mex. Check out Chuy's for green chile enchiladas, Matt's El Rancho for Bob Armstrong dip, or grab street tacos at Veracruz All Natural. Line your stomach – you'll thank yourself later on 6th Street.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-orange-600">9 PM - 2 AM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">6th Street Bar Crawl ("Dirty 6th")</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        No <strong>bachelor party in Austin</strong> is complete without a night on the notorious 6th Street. Head downtown and let the adventure begin. Start at Kung Fu Saloon for arcade games and beers, then work your way down the strip. Hit Shakespeare's for dive bar vibes, check out Buckshot for classic Austin energy, and end up at Barbarella for late-night dancing.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Don't forget to check out <Link href="/gallery" className="text-blue-600 hover:underline">our gallery</Link> for inspiration on how other bachelor groups celebrate! Many groups you meet on 6th Street are also heading to the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> the next day – perfect for making new friends.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accommodation Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Home className="h-6 w-6 text-blue-500" />
                  Where to Stay for Your Austin Bachelor Party
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Downtown:</strong> Perfect for bar-hopping access. East Austin or 6th Street area means you can walk to nightlife and stumble home safely.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Lake Travis:</strong> Ideal if the lake is your focus. Rentals with boat docks, pools, and Hill Country views make for an amazing home base – plus easy access to the <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis party barge</Link> experience.
                </p>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Either way, book early and use <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> for pre-arrival fridge stocking – they'll deliver to any address in the Austin area!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Day 1 Highlights Grid */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {day1Highlights.map((item, index) => (
                <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow bg-orange-50 dark:bg-gray-800 border-orange-200 dark:border-gray-700">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Day 2 Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
                <div>
                  <Badge className="bg-blue-600 text-white mb-1">SATURDAY</Badge>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Day 2: Lake Travis Party & Downtown Debauchery</h2>
                </div>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                This is THE day – the centerpiece of your <strong>austin bachelor party</strong> weekend. Today you'll experience the famous <strong>lake travis bachelor party boat</strong> experience on the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link>, followed by legendary Texas BBQ and a night on Rainey Street. Let's make it unforgettable.
              </p>

              {/* Day 2 Schedule */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Saturday Schedule
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-blue-600">9-10 AM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Breakfast & Recovery</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Wake up and grab a greasy breakfast to cure any lingering effects from 6th Street. Whip up something quick with supplies from your <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> stash, or hit up a local spot like Kerbey Lane Cafe for pancakes and migas.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-blue-600">10-11 AM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Prep for the Lake</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Pack your swimsuits, sunscreen, and BYOB supplies. This is where <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> really shines – they can deliver directly to the marina where the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline">ATX Disco Cruise</Link> departs! No lugging coolers from your rental – just show up and your drinks are waiting.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-blue-600">12-4 PM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Crown className="h-5 w-5 text-yellow-500" />
                        ATX Disco Cruise – THE MAIN EVENT
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        This is what you came for! Board the legendary <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> for a 4-hour floating party on Lake Travis. This isn't just any <strong>Austin party boat</strong> – it's the premier multi-group experience where <strong>bachelor AND bachelorette parties celebrate together</strong>.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Think of it as a nightclub on the water with a co-ed mixer vibe. Your ticket includes a professional DJ spinning non-stop hits, a pro photographer capturing every epic moment, giant 6x20 ft lily pad floats for swimming breaks, coolers of ice, and USCG-certified captains with 15+ years and 150,000+ happy guests.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2 font-semibold">
                        Just bring your BYOB drinks (no glass!) and get ready for the best 4 hours of your bachelor weekend. Many groups leave the cruise having exchanged numbers with bachelorette crews for later meetups!
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-blue-600">5-6 PM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Post-Cruise Refresh</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Head back to your rental to shower, change, and recharge. Grab some snacks and drinks from your fridge (thanks again, <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a>!) and get ready for an epic night ahead.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-blue-600">6:30-8 PM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Texas BBQ Feast</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        You can't come to Austin and skip BBQ. Hit up Terry Black's BBQ on Barton Springs Road for incredible brisket and beef ribs without the crazy lines of Franklin. Or venture out to The Salt Lick in Driftwood – it's BYOB, so bring a cooler! For the hardcore, Franklin Barbecue is the holy grail (get there early or pre-order).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-blue-600">9 PM - 2 AM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Rainey Street Bar Hop</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Tonight's different vibe: Rainey Street. This formerly residential street is now lined with renovated bungalows turned into bars, each with unique character. Start at Banger's for their epic beer garden, then hit Container Bar, Lustre Pearl, and UnBARlievable (ride the mechanical unicorn!). Food trucks everywhere mean late-night munchies are covered.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        <strong>Pro tip:</strong> Remember those bachelorette groups you met on the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline">ATX Disco Cruise</Link>? Text them to meet up on Rainey! It happens all the time – the Disco Cruise is basically a matchmaking service for party crews.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <BlogImageBreak
                src={discoParty}
                alt="Lake travis bachelor party boat experience on the ATX Disco Cruise with bachelor party austin texas"
                caption="Bachelor and bachelorette groups celebrating together on the ATX Disco Cruise - the ultimate Lake Travis party barge experience"
              />

              {/* Co-Ed Party Highlight */}
              <div className="bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/20 dark:to-blue-900/20 p-6 rounded-xl mb-8">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <Users className="h-5 w-5 text-blue-500" />
                  Why the ATX Disco Cruise is Different
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Unlike private <Link href="/private-cruises" className="text-blue-600 hover:underline">boat charters</Link>, the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> brings multiple groups together for the ultimate <strong>austin bachelor party</strong> atmosphere. Bachelor parties mix with <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline">bachelorette parties</Link>, birthday crews, and friend groups – creating an electric social scene on the <strong>lake travis bachelor party boat</strong>.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  This is the only co-ed party cruise experience in the entire U.S., and it's what makes Austin's <strong>party boat</strong> scene legendary. Check out our <Link href="/combined-bachelor-bachelorette-austin" className="text-blue-600 hover:underline font-semibold">combined bachelor-bachelorette party options</Link> if you want to book your whole wedding party together!
                </p>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  <Link href="/pricing-breakdown" className="text-blue-600 hover:underline">View pricing details</Link> or check our <Link href="/faq" className="text-blue-600 hover:underline">FAQ</Link> for common questions about the cruise.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Day 2 Highlights Grid */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {day2Highlights.map((item, index) => (
                <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow bg-blue-50 dark:bg-gray-800 border-blue-200 dark:border-gray-700">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Day 3 Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">3</div>
                <div>
                  <Badge className="bg-green-600 text-white mb-1">SUNDAY</Badge>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Day 3: Recovery & Farewells</h2>
                </div>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                After two epic days of celebrating, Sunday is all about recovery, final quality time with the crew, and maybe one last Austin experience before heading home. Take it easy – you've earned it.
              </p>

              {/* Day 3 Schedule */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Clock className="h-5 w-5 text-green-600" />
                  Sunday Schedule
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-green-600">10-11 AM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Slow Morning</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Sleep in and take your time waking up. Make coffee and breakfast with whatever's left from your <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> stash. Recap the weekend's best moments and scroll through the photos from the cruise.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-green-600">11 AM - 1 PM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Recovery Brunch</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Austin does brunch right. Hit up Gus's World Famous Fried Chicken for soul food comfort, Juan in a Million for legendary breakfast tacos (get the Don Juan!), or Magnolia Cafe for classic Austin diner vibes. Bloody Marys and hair of the dog encouraged.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-green-600">1-3 PM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Barton Springs Pool</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        The ultimate hangover cure: a dip in Barton Springs Pool. This iconic spring-fed swimming hole stays a refreshing 68°F year-round. The cold water will shock your system back to life, and lounging in the sun afterward is the perfect way to decompress before flights.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-green-600">3-5 PM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">South Congress (SoCo) Stroll</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        If you have time before flights, wander down South Congress Avenue. Grab quirky souvenirs, take a photo at the famous "I Love You So Much" mural, and enjoy one last cold beer at a sidewalk patio. Check out Jo's Coffee for the quintessential Austin vibe.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-bold text-green-600">5+ PM</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Pack Up & Head to Airport</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Clean up the rental (hopefully you didn't break anything too expensive), pack up, and head to Austin-Bergstrom International Airport. Share the group photos, exchange final bro hugs, and head home with memories that'll last a lifetime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <BlogImageBreak
                src={dancingScene}
                alt="Bachelor party austin texas nightlife memories after lake travis bachelor party boat cruise"
                caption="The memories from your Austin bachelor party weekend will last forever"
              />
            </motion.div>
          </div>
        </section>

        {/* Day 3 Highlights Grid */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {day3Highlights.map((item, index) => (
                <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow bg-green-50 dark:bg-gray-800 border-green-200 dark:border-gray-700">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 mb-4 bg-green-600 rounded-full flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Must-Have Checklist */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Austin Bachelor Party Must-Haves Checklist</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Before you jet off for your <strong>austin bachelor party</strong> and <strong>lake travis bachelor party boat</strong> adventure, make sure you've got everything covered. Here's your quick-reference checklist for the perfect weekend:
              </p>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  {mustHaveChecklist.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pro Tips Section */}
        <section className="py-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Pro Tips for Your Austin Bachelor Party</h2>
              </div>

              <div className="space-y-6">
                {/* Transportation */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Car className="h-6 w-6 text-blue-600" />
                    Transportation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Austin is spread out, so plan your transportation in advance. Rideshares (Uber/Lyft) work great for downtown, but for <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline">Lake Travis</Link> activities, consider renting a party bus or sprinter van to keep the group together. 
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    For the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline">ATX Disco Cruise</Link>, coordinate rides to the marina – or even better, many groups book <Link href="/private-cruises" className="text-blue-600 hover:underline">transportation add-ons</Link> through us. Check with <Link href="/contact" className="text-blue-600 hover:underline">our team</Link> for options!
                  </p>
                </div>

                {/* Budgeting */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                    <DollarSign className="h-6 w-6 text-green-600" />
                    Budgeting & Splitting Costs
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Set up a group Venmo or Splitwise before the trip. Collect money upfront for the Airbnb, <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline">ATX Disco Cruise tickets</Link>, and shared expenses. Check our <Link href="/pricing-breakdown" className="text-blue-600 hover:underline font-semibold">pricing breakdown</Link> for cruise costs.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Budget tip: Using <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> to stock your rental in advance is often cheaper than buying drinks at bars all weekend – plus, you can pre-game properly and save on bar tabs!
                  </p>
                </div>

                {/* Booking Early */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Calendar className="h-6 w-6 text-orange-600" />
                    Book Early
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> sells out – especially during peak bachelor/bachelorette season (spring and fall). Book at least 2-4 weeks in advance. Same goes for popular Airbnbs and BBQ reservations.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Ready to lock in your spot? <Link href="/book-now" className="text-blue-600 hover:underline font-semibold">Book your ATX Disco Cruise now</Link> or explore <Link href="/private-cruises" className="text-blue-600 hover:underline">private charter options</Link> for larger groups.
                  </p>
                </div>

                {/* Party On Delivery */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 shadow-lg border-2 border-yellow-300 dark:border-yellow-600">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Gift className="h-6 w-6 text-yellow-600" />
                    The Secret Weapon: Party On Delivery
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    We keep mentioning <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> because they're genuinely a game-changer for <strong>Austin bachelor parties</strong>. Here's what they offer:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-3">
                    <li><strong>Pre-arrival fridge stocking</strong> – Walk into your Airbnb with drinks already cold</li>
                    <li><strong>Marina delivery</strong> – Have your BYOB supplies waiting at the dock for your cruise</li>
                    <li><strong>Mid-weekend resupply</strong> – Running low? They'll deliver more</li>
                    <li><strong>No rental car needed</strong> – They handle the heavy lifting</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    Order in advance at <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">partyondelivery.com</a> and thank us later!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Blog Posts */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">More Austin Party Guides</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blogs/austin-bachelor-party-ideas">
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" data-testid="link-bachelor-ideas">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Austin Bachelor Party Ideas</h3>
                      <p className="text-gray-600 dark:text-gray-400">Complete guide to the best activities, venues, and experiences for your bachelor party in Austin.</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/bachelorette-party-austin">
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" data-testid="link-bachelorette-ideas">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Austin Bachelorette Party Ideas</h3>
                      <p className="text-gray-600 dark:text-gray-400">Planning a bachelorette? Coordinate with your bachelor crew on the ATX Disco Cruise!</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/combined-bachelor-bachelorette-austin">
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" data-testid="link-combined-party">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Combined Bachelor/Bachelorette Parties</h3>
                      <p className="text-gray-600 dark:text-gray-400">Celebrate together! The ultimate co-ed party experience on Lake Travis.</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/party-boat-lake-travis">
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" data-testid="link-lake-travis">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Lake Travis Party Barge Guide</h3>
                      <p className="text-gray-600 dark:text-gray-400">Everything you need to know about party boats on Lake Travis.</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Austin Bachelor Party Weekend?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Don't wait – the <strong>lake travis bachelor party boat</strong> experience on the ATX Disco Cruise sells out fast, especially during peak season. Lock in your dates now and start planning the ultimate <strong>austin bachelor party</strong>!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/book-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6" data-testid="button-book-now-cta">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Book Now
                  </Button>
                </Link>
                <Link href="/atx-disco-cruise">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-learn-more-cta">
                    Learn About ATX Disco Cruise
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link href="/contact" className="text-white/80 hover:text-white underline" data-testid="link-contact-footer">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Contact Us
                </Link>
                <Link href="/faq" className="text-white/80 hover:text-white underline" data-testid="link-faq-footer">
                  Questions? See FAQ
                </Link>
                <Link href="/gallery" className="text-white/80 hover:text-white underline" data-testid="link-gallery-footer">
                  <Camera className="inline h-4 w-4 mr-1" />
                  View Gallery
                </Link>
                <Link href="/pricing-breakdown" className="text-white/80 hover:text-white underline" data-testid="link-pricing-footer">
                  <DollarSign className="inline h-4 w-4 mr-1" />
                  Pricing Details
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
