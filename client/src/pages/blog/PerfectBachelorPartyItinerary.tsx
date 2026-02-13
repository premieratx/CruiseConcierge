import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Package, Phone, Clock, CheckCircle2, 
  Plane, Home, Beer, MapPin, Calendar, Star,
  ArrowRight, Building2, Wine, Sparkles, Sun, Utensils,
  Anchor, Music, Camera, Heart, Shield, PartyPopper,
  Coffee, Waves, Moon, Sunrise, Sunset, Car, Mic
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BlogImageBreak, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';

import heroImage from '@assets/bachelor-party-group-guys.webp';
import discoImage from '@assets/atx-disco-cruise-party.webp';
import partyImage from '@assets/dancing-party-scene.webp';

const day1Schedule = [
  { time: '2-4 PM', icon: Plane, title: 'Arrive in Austin', description: 'Fly into Austin-Bergstrom International Airport. Your perfect bachelor party itinerary Austin starts now!' },
  { time: '4-5 PM', icon: Home, title: 'Check Into Your Rental', description: 'Head to your Airbnb with fridge pre-stocked by Party On Delivery - essential for any bachelor party itinerary Austin.' },
  { time: '5-7 PM', icon: Beer, title: 'Pre-Game & Chill', description: 'Unpack, toast to the groom, and enjoy cold drinks. Best bachelor party Austin starts relaxed.' },
  { time: '7-9 PM', icon: Utensils, title: 'Tex-Mex Dinner', description: 'Fuel up at Chuy\'s, Matt\'s El Rancho, or street tacos. Perfect bachelor party itinerary Austin includes great food.' },
  { time: '9 PM-2 AM', icon: Music, title: '6th Street Bar Crawl', description: 'Legendary Dirty 6th awaits. No bachelor party Austin is complete without this iconic bar crawl.' }
];

const day2Schedule = [
  { time: '10-11 AM', icon: Coffee, title: 'Recovery Brunch', description: 'Late breakfast at Juan in a Million or Kerbey Lane. Best bachelor party Austin includes proper fuel.' },
  { time: '12-1 PM', icon: Home, title: 'Prep for the Boat', description: 'Grab your Party On Delivery cooler, sunscreen, and swimsuits. Perfect bachelor party itinerary Austin preparation.' },
  { time: '2-6 PM', icon: Ship, title: 'Lake Travis Party Boat', description: 'THE highlight of your bachelor party itinerary Austin - private boat cruise on Lake Travis. This is what makes it the best bachelor party Austin experience!' },
  { time: '7-9 PM', icon: Utensils, title: 'Texas BBQ Dinner', description: 'Franklin, Terry Black\'s, or Salt Lick. No perfect bachelor party itinerary Austin skips this.' },
  { time: '9 PM-1 AM', icon: Wine, title: 'Rainey Street', description: 'Craft cocktails in bungalow bars. Bachelor party Austin nightlife continues!' }
];

const day3Schedule = [
  { time: '10-11 AM', icon: Coffee, title: 'Recovery Brunch 2.0', description: 'Gus\'s Fried Chicken or another Austin favorite. Wind down your bachelor party Austin weekend.' },
  { time: '12-2 PM', icon: Waves, title: 'Barton Springs Pool', description: 'Spring-fed pool for the ultimate hangover cure. Perfect bachelor party itinerary Austin recovery.' },
  { time: '2-4 PM', icon: MapPin, title: 'South Congress Stroll', description: 'Shopping, coffee, and people-watching. Best bachelor party Austin includes Austin culture.' },
  { time: '4-6 PM', icon: Plane, title: 'Depart Austin', description: 'Head to the airport with unforgettable memories from your bachelor party itinerary Austin!' }
];

const boatOptions = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    description: 'Single-deck pontoon with arch canopy - perfect for intimate bachelor party Austin groups',
    best: 'Smaller bachelor parties, close friend groups'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    description: 'Single-deck pontoon with arch canopy - ideal bachelor party itinerary Austin choice for medium groups',
    best: 'Most popular bachelor party Austin size'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    description: 'Single-deck pontoon with arch canopy - perfect bachelor party itinerary Austin for larger crews',
    best: 'Larger bachelor groups, combined friend circles'
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    description: 'Single-deck pontoon with arch canopy, additional crew fee for 51-75 guests',
    best: 'Epic bachelor party Austin weekends, combined bachelor/bachelorette'
  }
];

const mustDoList = [
  { icon: Ship, activity: 'Lake Travis Party Boat', description: 'THE centerpiece of the perfect bachelor party itinerary Austin - private boat cruise with swimming, music, and BYOB' },
  { icon: Beer, activity: '6th Street Bar Crawl', description: 'Legendary Dirty 6th nightlife is essential for any bachelor party Austin experience' },
  { icon: Utensils, activity: 'Texas BBQ', description: 'Franklin, Terry Black\'s, or Salt Lick - the best bachelor party Austin includes world-famous BBQ' },
  { icon: Wine, activity: 'Rainey Street Bars', description: 'Craft cocktails in converted bungalows - perfect bachelor party itinerary Austin nightcap' },
  { icon: Waves, activity: 'Barton Springs', description: 'Spring-fed swimming hole for recovery - hangover cure in your bachelor party Austin weekend' },
  { icon: Music, activity: 'Live Music', description: 'Austin is the Live Music Capital - catch a show during your bachelor party itinerary Austin' }
];

const faqs = [
  {
    question: 'What makes Austin the best bachelor party destination?',
    answer: 'Austin offers the perfect bachelor party itinerary Austin combination: Lake Travis party boats, legendary 6th Street nightlife, world-famous BBQ, and year-round warm weather. The best bachelor party Austin experience includes private boat cruises, bar crawls, and unique Texas culture that you won\'t find anywhere else.'
  },
  {
    question: 'What is the perfect bachelor party itinerary for Austin?',
    answer: 'The perfect bachelor party itinerary Austin spans 3 days: Day 1 for arrival and 6th Street bar crawl, Day 2 for the Lake Travis party boat and Texas BBQ dinner, Day 3 for recovery brunch and Barton Springs. This bachelor party Austin schedule balances adventure with recovery time.'
  },
  {
    question: 'What is the best bachelor party boat option in Austin?',
    answer: 'For bachelor party Austin groups, we recommend: Day Tripper (14 guests), Meeseeks (25 guests - most popular for bachelor party itinerary Austin), The Irony (30 guests), or Clever Girl (50-75 guests). All boats are single-deck pontoons with arch canopy, BYOB friendly. Book 2-4 weeks ahead for the best bachelor party Austin experience.'
  },
  {
    question: 'How do I plan food and drinks for a bachelor party in Austin?',
    answer: 'The perfect bachelor party itinerary Austin uses Party On Delivery for pre-stocked rentals and dock-side beverage delivery. For food, reserve Texas BBQ (Franklin needs advance booking). This bachelor party Austin approach saves time and ensures you never run out of cold drinks.'
  },
  {
    question: 'What should I pack for an Austin bachelor party weekend?',
    answer: 'Bachelor party Austin essentials: swimsuits, sunscreen, comfortable shoes for bar hopping, casual attire for BBQ, and matching bachelor party gear. The perfect bachelor party itinerary Austin happens in hot weather, so pack accordingly for the Lake Travis boat party.'
  },
  {
    question: 'What is the best time of year for a bachelor party in Austin?',
    answer: 'April-October offers the best bachelor party Austin weather for Lake Travis boat parties. Peak season means booking 3-4 weeks ahead. Spring and fall provide perfect bachelor party itinerary Austin temperatures (75-85°F). Summer is hottest but offers the longest lake days.'
  },
  {
    question: 'How much does an Austin bachelor party weekend cost?',
    answer: 'A bachelor party Austin weekend typically costs $500-800 per person for 3 days including accommodation, Lake Travis boat rental, food, drinks, and nightlife. The best bachelor party Austin experience prioritizes the boat cruise (the unforgettable highlight) and Texas BBQ. Budget more for peak season dates.'
  },
  {
    question: 'Where should we stay for an Austin bachelor party?',
    answer: 'For the perfect bachelor party itinerary Austin, stay downtown (walking distance to 6th Street and Rainey) or near Lake Travis (convenient for the boat party). Large Airbnbs work best for bachelor party Austin groups. Book rentals that allow Party On Delivery pre-stocking.'
  }
];

const internalLinks = [
  { href: '/bachelor-party-austin', label: 'Bachelor Party Cruises', icon: Users },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/private-cruises', label: 'Private Rentals', icon: Ship },
  { href: '/party-boat-lake-travis', label: 'Lake Travis Boats', icon: Waves },
  { href: '/combined-bachelor-bachelorette', label: 'Combined Parties', icon: PartyPopper }
];

const whyPremier = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

export default function PerfectBachelorPartyItinerary() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/perfect-bachelor-party-itinerary-austin"
        defaultTitle="Perfect Bachelor Party Itinerary Austin: 3-Day Guide | Best Bachelor Party Austin | Premier Party Cruises"
        defaultDescription="The perfect bachelor party itinerary Austin guide. Best bachelor party Austin 3-day schedule: Lake Travis boat party, 6th Street bar crawl, Texas BBQ, and Rainey Street nightlife. Plan the ultimate bachelor party Austin weekend with our day-by-day itinerary."
        defaultKeywords={['perfect bachelor party itinerary Austin', 'best bachelor party Austin', 'bachelor party Austin', 'Austin bachelor party', 'bachelor party itinerary Austin', 'Austin bachelor weekend', 'Lake Travis bachelor party', '6th Street bachelor party', 'bachelor party Texas']}
        image="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys.webp"
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="perfect-bachelor-party-itinerary-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Perfect bachelor party itinerary Austin - bachelor group on Lake Travis party boat"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              3-Day Bachelor Party Guide
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Perfect Bachelor Party Itinerary Austin<br />
              <span className="text-amber-400">The Best Bachelor Party Austin Has to Offer</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Your complete 3-day guide to the perfect bachelor party itinerary Austin. From Lake Travis boat parties to 6th Street bar crawls - this is the best bachelor party Austin experience planned hour-by-hour.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Book Your Boat Now</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold"
                data-testid="button-view-boats"
              >
                <Link href="/bachelor-party-austin">Bachelor Party Options</Link>
              </Button>
            </div>
          </div>
        </m.section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This guide is part of our complete{' '}
            <Link href="/bachelor-party-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin bachelor party boats</Link>{' '}
            resource — your one-stop planning hub for Lake Travis bachelor celebrations.
          </p>
        </div>
      </div>


        {/* Stats Section */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whyPremier.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="intro-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Austin is the Best Bachelor Party Destination
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Planning the <strong>perfect bachelor party itinerary Austin</strong>? You've picked the ultimate destination. Austin delivers everything a bachelor party needs: Lake Travis party boats, legendary nightlife, world-class BBQ, and that unique Texas energy. This guide maps out the <strong>best bachelor party Austin</strong> experience hour-by-hour.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                After hosting 125,000+ guests on Lake Travis, we've learned what makes a <strong>bachelor party Austin</strong> weekend truly legendary. The secret? Balance. You want adventure (hello, Lake Travis boat party) but also downtime. Epic nights out, but recovery mornings. This <strong>perfect bachelor party itinerary Austin</strong> guide delivers that balance.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                <strong>Pro tip before you dive in:</strong> Use <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> to pre-stock your rental with drinks and snacks. Arriving to a full fridge transforms your <strong>bachelor party Austin</strong> experience from good to legendary.
              </p>

              <BlogImageBreak
                src={heroImage}
                alt="Perfect bachelor party itinerary Austin - bachelor group celebrating on Lake Travis party boat"
                caption="The best bachelor party Austin experience starts on Lake Travis"
              />
            </m.div>
          </div>
        </section>

        {/* Day 1 */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900" data-testid="day1-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-orange-500 text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center">1</div>
                <div>
                  <Badge className="bg-orange-500 text-white mb-1">FRIDAY</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Day 1: Arrival & 6th Street</h2>
                </div>
              </div>

              <div className="space-y-4">
                {day1Schedule.map((item, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow" data-testid={`day1-item-${index}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-2 shrink-0">
                            <item.icon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-sm font-bold text-orange-600">{item.time}</span>
                              <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </div>

              <div className="mt-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-500" />
                  Day 1 Highlights for Your Bachelor Party Austin
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The <strong>best bachelor party Austin</strong> Day 1 sets the tone. Dirty 6th Street is legendary - bars packed shoulder-to-shoulder, live music spilling onto streets, and that unmistakable Austin energy. This is where your <strong>perfect bachelor party itinerary Austin</strong> really begins!
                </p>
              </div>
            </m.div>
          </div>
        </section>

        {/* Day 2 - The Main Event */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800" data-testid="day2-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-600 text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center">2</div>
                <div>
                  <Badge className="bg-blue-600 text-white mb-1">SATURDAY - THE MAIN EVENT</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Day 2: Lake Travis Boat Party</h2>
                </div>
              </div>

              <div className="space-y-4">
                {day2Schedule.map((item, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`hover:shadow-lg transition-shadow ${item.icon === Ship ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/30' : ''}`} data-testid={`day2-item-${index}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`${item.icon === Ship ? 'bg-blue-600' : 'bg-blue-100 dark:bg-blue-900'} rounded-full p-2 shrink-0`}>
                            <item.icon className={`h-5 w-5 ${item.icon === Ship ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-sm font-bold text-blue-600">{item.time}</span>
                              <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                              {item.icon === Ship && <Badge className="bg-amber-500 text-black">HIGHLIGHT</Badge>}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </div>

              <BlogImageBreak
                src={discoImage}
                alt="Best bachelor party Austin - Lake Travis party boat cruise with bachelor group"
                caption="Day 2 is THE highlight of your perfect bachelor party itinerary Austin"
              />
            </m.div>
          </div>
        </section>

        {/* Day 3 */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900" data-testid="day3-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-green-600 text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center">3</div>
                <div>
                  <Badge className="bg-green-600 text-white mb-1">SUNDAY</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Day 3: Recovery & Departure</h2>
                </div>
              </div>

              <div className="space-y-4">
                {day3Schedule.map((item, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow" data-testid={`day3-item-${index}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 shrink-0">
                            <item.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-sm font-bold text-green-600">{item.time}</span>
                              <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* Boat Options */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Bachelor Party Austin Boat
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                The perfect bachelor party itinerary Austin centers on your Lake Travis boat experience. All boats are single-deck pontoons with arch canopy - choose based on your group size.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {boatOptions.map((boat, index) => (
                <m.div
                  key={boat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow" data-testid={`boat-card-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Ship className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{boat.name}</h3>
                          <Badge variant="secondary">{boat.capacity}</Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{boat.description}</p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Best for: </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{boat.best}</span>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Must-Do List */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900" data-testid="mustdo-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Must-Do Activities for the Best Bachelor Party Austin
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                No perfect bachelor party itinerary Austin is complete without these experiences
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mustDoList.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`mustdo-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-3 shrink-0">
                          <item.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.activity}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Perfect Bachelor Party Itinerary Austin FAQs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about planning the best bachelor party Austin experience
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border rounded-lg px-4 bg-gray-50 dark:bg-gray-800"
                >
                  <AccordionTrigger 
                    className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline"
                    data-testid={`faq-trigger-${index}`}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4" data-testid={`faq-content-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 bg-slate-100 dark:bg-slate-900" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Explore More Austin Party Options
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Plan your complete bachelor party Austin experience
              </p>
            </m.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={link.href}>
                    <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer" data-testid={`internal-link-${index}`}>
                      <CardContent className="p-4 text-center">
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{link.label}</span>
                      </CardContent>
                    </Card>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white" data-testid="final-cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Plan the Best Bachelor Party Austin?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Use this perfect bachelor party itinerary Austin guide and book your Lake Travis boat today. Premier Party Cruises has hosted 125,000+ guests - let us make your bachelor party Austin legendary!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                data-testid="button-final-quote"
              >
                <Link href="/book-now">Get Your Free Quote</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                data-testid="button-final-contact"
              >
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}
