import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, PartyPopper, CheckCircle2, 
  Music, Waves, Beer, Star, ArrowRight, Camera, Shield, 
  Utensils, Sparkles, Heart, Coffee, Sun, Sunset,
  Plane, Home, MapPin, Calendar, Clock, Anchor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';

import bachelorHero from '@assets/bachelor-party-group-guys.webp';
import capitalCityShots1 from '@assets/@capitalcityshots-1_1760080740012.jpg';
import capitalCityShots5 from '@assets/@capitalcityshots-5_1760080740018.jpg';
import capitalCityShots10 from '@assets/@capitalcityshots-10_1760080740019.jpg';

const fridaySchedule = [
  { time: '3-5 PM', icon: Plane, title: 'Touch Down in Austin', description: 'Fly into Austin-Bergstrom and feel the Texas heat. Your chill bach weekend officially begins.' },
  { time: '5-6 PM', icon: Home, title: 'Check Into Your Rental', description: 'Airbnb or VRBO near Lake Travis is ideal. Drop bags, claim rooms, and crack open the first cold ones.' },
  { time: '6-8 PM', icon: Beer, title: 'Low-Key Happy Hour', description: 'Hit a lakeside bar or fire up the grill at your rental. Keep it easy - tomorrow is the main event.' },
  { time: '8-10 PM', icon: Utensils, title: 'Casual Dinner', description: 'Tex-Mex, BBQ, or pizza delivery. No reservations needed, just good food and better company.' },
  { time: '10 PM+', icon: Star, title: 'Night Cap & Chill', description: 'Hot tub, poker, or just catching up with the crew. Early-ish night to save energy for Saturday.' }
];

const saturdaySchedule = [
  { time: '9-10 AM', icon: Coffee, title: 'Slow Morning Start', description: 'Breakfast tacos, coffee, and zero rush. Hydrate now - you\'ll thank yourself later.' },
  { time: '10-12 PM', icon: Sun, title: 'Pool or Lake Pre-Game', description: 'Soak up some sun at your rental or a nearby spot. Light drinks, good music, building the vibe.' },
  { time: '12-1 PM', icon: MapPin, title: 'Head to the Marina', description: 'Load up the coolers, grab the crew, and make your way to Lakeway Marina.' },
  { time: '2-6 PM', icon: Ship, title: 'Lake Travis Party Cruise', description: 'THE highlight! 4 hours on the water with swimming, music, floats, and the best views in Texas.' },
  { time: '7-9 PM', icon: Utensils, title: 'Epic Dinner', description: 'Hit up Oasis for sunset views or grab Texas BBQ. You\'ve earned a feast.' },
  { time: '9 PM+', icon: Music, title: 'Night Out (Optional)', description: 'Rainey Street or 6th Street if you\'ve got energy. Or keep it chill at the rental - no judgment.' }
];

const sundaySchedule = [
  { time: '10-11 AM', icon: Coffee, title: 'Recovery Brunch', description: 'Sleep in, then hit a local brunch spot. Migas, breakfast burritos, and bottomless mimosas.' },
  { time: '11 AM-1 PM', icon: Waves, title: 'Barton Springs Dip', description: 'The 68°F spring-fed pool is the ultimate hangover cure. Trust the process.' },
  { time: '1-3 PM', icon: MapPin, title: 'South Congress Stroll', description: 'Shops, food trailers, people-watching. Classic Austin vibes before heading out.' },
  { time: '3 PM+', icon: Plane, title: 'Wheels Up', description: 'Head to the airport with legendary memories and zero regrets. Until next time, Austin.' }
];

const whyChillWorks = [
  { icon: Heart, title: 'Less Stress, More Fun', description: 'No packed schedule means everyone actually enjoys the trip instead of rushing around.' },
  { icon: Ship, title: 'One Epic Centerpiece', description: 'The Lake Travis cruise is the highlight - everything else is just bonus vibes.' },
  { icon: Users, title: 'Quality Time', description: 'Chill pace means real conversations and bonding, not just bar-hopping blur.' },
  { icon: Beer, title: 'Pace Yourself', description: 'Spread the celebration over 3 days instead of one chaotic night.' },
  { icon: Sun, title: 'Austin Weather', description: 'Year-round sunshine means pool and lake time are always on the menu.' },
  { icon: Star, title: 'Flexible Plans', description: 'Want to add something? Skip something? The chill approach lets you adapt.' }
];

const proTips = [
  'Book your Lake Travis cruise 2-4 weeks ahead - especially for peak season weekends',
  'Use Party On Delivery for pre-stocked coolers and groceries at your rental',
  'Rent a house with a pool near Lake Travis for the best experience',
  'Pack light layers - Texas weather can shift, especially on the water',
  'Designate a driver for Saturday or book a shuttle service to the marina',
  'Bring Liquid IV or hydration packets - you\'ll thank us on Sunday'
];

export default function RecipeForChillestATXBachParty() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/the-recipe-for-the-chillest-atx-bach-party"
        defaultTitle="The Recipe for the CHILLEST ATX Bach Party | Premier Party Cruises"
        defaultDescription="Plan the most laid-back Austin bachelor or bachelorette party with our chill weekend guide. Friday arrival, Saturday Lake Travis cruise, Sunday recovery - the perfect stress-free bach party itinerary."
        defaultKeywords={['Austin bachelor party', 'ATX bach party', 'chill bachelor party Austin', 'Lake Travis bachelor party', 'relaxed bachelorette party Austin', 'Austin party boat', 'Lake Travis party cruise']}
        image="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys.webp"
      />
      <BlogV2Layout
        title="The Recipe for the CHILLEST ATX Bach Party"
        description="Plan the most laid-back Austin bachelor or bachelorette party with our chill weekend guide. Friday arrival, Saturday Lake Travis cruise, Sunday recovery - the perfect stress-free bach party itinerary."
        slug="the-recipe-for-the-chillest-atx-bach-party"
        category="Bachelor Guides"
        categoryHref="/bachelor-party-austin"
        pillarTitle="Austin Bachelor Party Guide"
        pillarHref="/bachelor-party-austin"
        relatedArticles={[
          { title: "Epic Austin Bachelor Party Ultimate Guide", href: "/blogs/epic-bachelor-party-austin-ultimate-guide" },
          { title: "Lake Travis Bachelor Party Boats Guide", href: "/blogs/lake-travis-bachelor-party-boats-guide" },
          { title: "How to Throw a Great Bachelor Party in Austin", href: "/blogs/how-to-throw-great-bachelor-party-austin" },
        ]}
      >

      <div className="min-h-screen bg-white dark:bg-gray-950">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-teal-800 to-blue-900 text-white overflow-hidden"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bachelorHero})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-teal-500 text-white font-bold">
              LAID-BACK AUSTIN BACH PARTY GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              The Recipe for the CHILLEST<br />ATX Bach Party
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Forget the chaos. Plan a <strong>laid-back Austin bachelor or bachelorette party</strong> that's all about good vibes, Lake Travis cruising, and actually enjoying the celebration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/private-cruises">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-white font-bold text-lg px-8 py-6">
                  <Ship className="mr-2 h-5 w-5" />
                  Book Your Lake Cruise
                </Button>
              </Link>
              <Link href="/bachelor-party-austin">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  Bachelor Party Options
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
            This guide is part of our complete{' '}
            <Link href="/bachelor-party-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin bachelor party boats</Link>{' '}
            resource — your one-stop planning hub for Lake Travis bachelor celebrations.
          </p>
        </div>
      </div>


        {/* Introduction */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Why a Chill Bach Party Hits Different</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Look, we get it. The internet is full of "EPIC BACHELOR PARTY" guides with packed schedules, expensive clubs, and 4 hours of sleep per night. But here's the thing - some of the best bach parties we've seen are the ones where everyone actually relaxes, connects, and comes home feeling <em>good</em> instead of wrecked.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Austin is perfect for this vibe. You've got Lake Travis for the ultimate <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">party boat experience</Link>, incredible food, gorgeous weather, and a city that knows how to have fun without trying too hard. Here's your 3-day recipe for the chillest ATX bach party that everyone will actually remember.
              </p>
            </m.div>
          </div>
        </section>

        {/* Why Chill Works */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">The Chill Approach: Why It Works</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Skip the exhaustion and embrace the vibes. Here's why a laid-back bach party is the move.
              </p>
            </m.div>

            <m.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {whyChillWorks.map((item, index) => (
                <m.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-900">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-full">
                          <item.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* Friday Itinerary */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">DAY 1</Badge>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Friday: Arrival & Easy Vibes</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Set the tone with a stress-free arrival day. No rushing, no pressure - just settling in and starting the celebration.
              </p>
            </m.div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <div className="space-y-4">
                  {fridaySchedule.map((item, index) => (
                    <m.div key={index} variants={fadeInUp}>
                      <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
                              <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{item.time}</span>
                              </div>
                              <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </m.div>
                  ))}
                </div>
              </m.div>

              <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <img 
                  src={capitalCityShots1} 
                  alt="Austin bachelor party group enjoying Lake Travis" 
                  className="rounded-2xl shadow-xl w-full h-auto"
                />
              </m.div>
            </div>
          </div>
        </section>

        {/* Saturday Itinerary - The Main Event */}
        <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-teal-500 text-white font-bold">DAY 2 - THE MAIN EVENT</Badge>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Saturday: Lake Travis Party Cruise</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                This is it - the centerpiece of your chill bach party. A 4-hour <Link href="/party-boat-lake-travis" className="text-teal-600 hover:underline font-semibold">Lake Travis party cruise</Link> that hits all the right notes.
              </p>
            </m.div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="order-2 lg:order-1">
                <img 
                  src={capitalCityShots5} 
                  alt="Lake Travis party boat cruise with bachelor party group" 
                  className="rounded-2xl shadow-xl w-full h-auto"
                />
              </m.div>

              <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="order-1 lg:order-2">
                <div className="space-y-4">
                  {saturdaySchedule.map((item, index) => (
                    <m.div key={index} variants={fadeInUp}>
                      <Card className={`border-l-4 hover:shadow-md transition-shadow ${item.title.includes('Lake Travis') ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'border-l-teal-500'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg flex-shrink-0 ${item.title.includes('Lake Travis') ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-teal-100 dark:bg-teal-900'}`}>
                              <item.icon className={`h-5 w-5 ${item.title.includes('Lake Travis') ? 'text-yellow-600 dark:text-yellow-400' : 'text-teal-600 dark:text-teal-400'}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-sm font-semibold ${item.title.includes('Lake Travis') ? 'text-yellow-600 dark:text-yellow-400' : 'text-teal-600 dark:text-teal-400'}`}>{item.time}</span>
                                {item.title.includes('Lake Travis') && <Badge className="bg-yellow-500 text-black text-xs">HIGHLIGHT</Badge>}
                              </div>
                              <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </m.div>
                  ))}
                </div>
              </m.div>
            </div>

            {/* Lake Cruise Highlight Box */}
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-12">
              <Card className="bg-gradient-to-r from-teal-600 to-blue-600 text-white border-0">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Why the Lake Cruise is Perfect for Chill Vibes</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-teal-300 flex-shrink-0 mt-0.5" />
                          <span>4 hours of cruising, swimming, and hanging out - no rushing</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-teal-300 flex-shrink-0 mt-0.5" />
                          <span>BYOB so you control the pace and vibe</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-teal-300 flex-shrink-0 mt-0.5" />
                          <span>Giant lily pad floats for lounging and swimming</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-teal-300 flex-shrink-0 mt-0.5" />
                          <span>Bluetooth speakers for your own playlist</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-teal-300 flex-shrink-0 mt-0.5" />
                          <span>licensed, experienced captain handles everything</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <p className="text-lg mb-4">Private cruises for 14-75 guests</p>
                      <Link href="/private-cruises">
                        <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 font-bold">
                          <Ship className="mr-2 h-5 w-5" />
                          View Boat Options
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          </div>
        </section>

        {/* Sunday Itinerary */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">DAY 3</Badge>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Sunday: Recovery & Goodbye</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Wind down the weekend with Austin's best recovery activities. Leave feeling refreshed, not wrecked.
              </p>
            </m.div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <div className="space-y-4">
                  {sundaySchedule.map((item, index) => (
                    <m.div key={index} variants={fadeInUp}>
                      <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg flex-shrink-0">
                              <item.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{item.time}</span>
                              </div>
                              <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </m.div>
                  ))}
                </div>
              </m.div>

              <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <img 
                  src={capitalCityShots10} 
                  alt="Austin party group enjoying Lake Travis views" 
                  className="rounded-2xl shadow-xl w-full h-auto"
                />
              </m.div>
            </div>
          </div>
        </section>

        {/* Pro Tips Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Pro Tips for the Chillest Bach Party</h2>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    {proTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </m.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-teal-600 via-blue-600 to-teal-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Chill ATX Bach Party?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                The Lake Travis cruise is the heart of the experience. Let us help you find the perfect boat for your crew.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 font-bold text-lg px-8 py-6">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Get a Custom Quote
                  </Button>
                </Link>
                <Link href="/atx-disco-cruise">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    <Music className="mr-2 h-5 w-5" />
                    ATX Disco Cruise Option
                  </Button>
                </Link>
              </div>

              <p className="mt-8 text-white/80">
                Questions? <Link href="/contact" className="underline hover:text-white">Contact our team</Link> or call us anytime.
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
