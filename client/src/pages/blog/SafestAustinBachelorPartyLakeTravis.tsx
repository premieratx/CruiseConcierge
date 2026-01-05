import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Shield, Users, Anchor, Phone, Clock, CheckCircle2, 
  AlertTriangle, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Ship, Heart, Navigation, DollarSign,
  BadgeCheck, FileCheck, LifeBuoy, UserCheck, Scale, Wine,
  Car, Music, Camera, PartyPopper, Umbrella
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/bachelor-party-group-guys-hero-compressed.webp';
import sectionImage1 from '@assets/atx-disco-cruise-party.webp';
import sectionImage2 from '@assets/clever-girl-1-lake-travis-party-boat.jpg';
import pricingChart from '@assets/atx-disco-cruise-bachelor-pricing-chart-2026_1762902241086.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const partyBoatStats = [
  { stat: '15+', label: 'Years Experience' },
  { stat: '100%', label: 'Safety Record' },
  { stat: 'BYOB', label: 'Bring Your Own' },
  { stat: '5-Star', label: 'Google Rating' }
];

const whyBoatsWork = [
  {
    icon: Users,
    title: 'Everyone Stays Together',
    description: 'One departure, one experience, one return. No losing people. No splitting Ubers. No "where did Kyle go?"'
  },
  {
    icon: Shield,
    title: 'Licensed Captains = Zero Liability',
    description: 'No drinking and driving, no navigation mistakes, no legal risk for the group organizer.'
  },
  {
    icon: DollarSign,
    title: 'BYOB = Cost Control',
    description: 'No $14 cocktails, no bottle-service minimums, no surprise tabs. You know the cost upfront.'
  },
  {
    icon: PartyPopper,
    title: 'Built-In Party Energy',
    description: 'DJ, photographer, disco floor, floats—everything is included on the ATX Disco Cruise.'
  }
];

const discoCruiseFeatures = [
  { icon: Music, text: 'DJ included' },
  { icon: Camera, text: 'Professional photographer' },
  { icon: Waves, text: 'Giant floats + lily pads' },
  { icon: PartyPopper, text: 'Disco dance floor + lighting' },
  { icon: Wine, text: 'BYOB with private coolers' },
  { icon: Users, text: 'Built-in party energy' }
];

const privateCruiseFeatures = [
  { icon: Ship, text: 'Custom sound systems' },
  { icon: Music, text: 'Optional DJ' },
  { icon: Camera, text: 'Optional photographer' },
  { icon: Users, text: 'Multiple boat sizes (20-75 guests)' }
];

const pricingComparison = [
  { option: 'Downtown Bar Crawl', cost: '$150–$250+', notes: 'Split groups, surprise tabs, transportation chaos' },
  { option: 'Party Bus + Bars', cost: '$200–$300+', notes: 'Limited time at each stop, drink minimums' },
  { option: 'ATX Disco Cruise', cost: '$85–$105', notes: 'All-inclusive, DJ, photographer, floats included' }
];

const weekendStructure = [
  {
    day: 'Day 1 (Friday)',
    activities: ['Arrival', 'Casual dinner', 'Light bars']
  },
  {
    day: 'Day 2 (Saturday)',
    activities: ['Lake Travis Party Boat (main event)', 'Relax afterward', 'Optional nightlife']
  },
  {
    day: 'Day 3 (Sunday)',
    activities: ['Brunch', 'Departures']
  }
];

const faqs = [
  {
    question: 'Is this only for wild groups?',
    answer: 'No. Energy level can be dialed up or down. Whether you want a chill float day or a high-energy party cruise, our professional crew adjusts to your vibe. Every bachelor party is different, and we cater to all styles.'
  },
  {
    question: 'Do we need to plan games or music?',
    answer: 'No. Especially on the ATX Disco Cruise, everything is handled. We provide the DJ, music system, photographer, and party equipment. You just show up with your crew and beverages.'
  },
  {
    question: 'What about weather?',
    answer: 'Premier Party Cruises has backup protocols and indoor contingencies. Our licensed captains monitor conditions constantly and make safety calls when necessary. We work with groups to reschedule if severe weather is predicted.'
  },
  {
    question: 'Is this better than renting our own boat?',
    answer: 'Yes—safer, easier, and often cheaper when fully compared. DIY rentals mean you\'re responsible for navigation, safety, fuel, and legal compliance. With a professional captain, you eliminate all liability and actually enjoy your party.'
  },
  {
    question: 'How does BYOB work on party boats?',
    answer: 'BYOB means Bring Your Own Beverage. You bring whatever you want to drink (no glass containers). We provide coolers and ice. For easy alcohol delivery, we partner with Party On Delivery who can deliver directly to your Airbnb or the marina.'
  },
  {
    question: 'What if someone in our group gets too intoxicated?',
    answer: 'Our professional crew is trained in responsible party management. We monitor guests, ensure everyone stays hydrated, and can assist if anyone needs a break. Safety is always our top priority while keeping the party fun.'
  },
  {
    question: 'How far in advance should we book?',
    answer: 'Peak season (March-October) fills up quickly, especially Saturdays. We recommend booking 2-4 weeks in advance for the best availability. Last-minute spots sometimes open up, but don\'t count on it for bachelor parties.'
  },
  {
    question: 'Can we combine with a bachelorette group?',
    answer: 'Absolutely! Combined bachelor/bachelorette cruises are very popular on the ATX Disco Cruise. You\'ll be with other celebration groups in a shared party atmosphere—it\'s often more fun than a private event.'
  }
];

export default function SafestAustinBachelorPartyLakeTravis() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = "https://premierpartycruises.com/blogs/safest-austin-bachelor-party-lake-travis-party-boat";

  return (
    <>
      <Helmet>
        <title>Safest Austin Bachelor Party: Lake Travis Party Boats</title>
        <meta name="description" content="Plan a safe Austin bachelor party on Lake Travis. Licensed captains, BYOB savings, and stress-free celebration without chaos or hidden costs." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Safest Austin Bachelor Party: Lake Travis Party Boats" />
        <meta property="og:description" content="Plan a safe Austin bachelor party on Lake Travis. Licensed captains, BYOB savings, and stress-free celebration without chaos or hidden costs." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Safest Austin Bachelor Party: Lake Travis Party Boats" />
        <meta name="twitter:description" content="Plan a safe Austin bachelor party on Lake Travis. Licensed captains, BYOB savings, and stress-free celebration without chaos or hidden costs." />
        <meta name="keywords" content="austin bachelor party, lake travis party boat, bachelor party austin, lake travis bachelor party, austin party boat, bachelor party ideas austin, austin bachelor weekend" />
      </Helmet>

      <PublicNavigation />

      <main className="min-h-screen bg-white">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Bachelor party group celebrating on a Lake Travis party boat in Austin Texas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 py-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="max-w-3xl"
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  Bachelor Party Guide
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                The Safest Way to Plan an Austin Bachelor Party
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-blue-100 mb-8 leading-relaxed"
              >
                Why a Lake Travis party boat is the smartest, safest, and most memorable 
                way to celebrate—without stress, chaos, or hidden costs.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/bachelor-party-austin">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" data-testid="button-bachelor-party-hub">
                    <Users className="mr-2 h-5 w-5" />
                    Bachelor Party Hub
                  </Button>
                </Link>
                <Link href="/atx-disco-cruise">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-atx-disco-cruise">
                    <Ship className="mr-2 h-5 w-5" />
                    ATX Disco Cruise
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-b from-blue-900 to-blue-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partyBoatStats.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">{item.stat}</div>
                  <div className="text-blue-200 text-sm">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-red-100 text-red-800 mb-4">High-Stakes Planning</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Bachelor Parties Are High-Risk Events
                </h2>
                <p className="text-lg text-gray-600">
                  An Austin bachelor party isn't just a party—it's a high-stakes group event.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-red-50 border border-red-200 rounded-xl p-8 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">You're dealing with:</h3>
                    <ul className="grid md:grid-cols-2 gap-2 text-gray-700">
                      <li className="flex items-center gap-2"><Users className="h-4 w-4 text-red-500" /> Large groups</li>
                      <li className="flex items-center gap-2"><Wine className="h-4 w-4 text-red-500" /> Alcohol</li>
                      <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-red-500" /> Time constraints</li>
                      <li className="flex items-center gap-2"><Car className="h-4 w-4 text-red-500" /> Transportation</li>
                      <li className="flex items-center gap-2"><Users className="h-4 w-4 text-red-500" /> Peer pressure</li>
                      <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-500" /> Out-of-town guests</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700">
                  That's why so many bachelor parties fail quietly: people get separated, plans fall apart, 
                  money gets wasted, or the group spends half the weekend managing logistics instead of enjoying the celebration.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-blue-50 border border-blue-200 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">The Solution</h3>
                    <p className="text-gray-700">
                      This is exactly why more groups are choosing a <strong>Lake Travis party boat</strong> as 
                      the anchor event of their bachelor weekend. A professionally captained Austin party boat—
                      especially the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link>—removes 
                      the biggest risks while delivering maximum fun.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-blue-100 text-blue-800 mb-4">Smart Planning</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why a Lake Travis Party Boat Is the Smart Move
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  When planners evaluate bachelor party ideas, they consistently favor contained, turnkey experiences.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {whyBoatsWork.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-orange-100 text-orange-800 mb-4">Choose Your Experience</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  ATX Disco Cruise vs Private Charter
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Premier Party Cruises offers two primary bachelor party formats, both on Lake Travis.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <motion.div variants={fadeInUp}>
                  <Card className="h-full border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-orange-500 text-white">Most Popular</Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">ATX Disco Cruise</h3>
                      <p className="text-gray-600 mb-6">
                        A shared, curated party cruise designed specifically for Austin bachelor parties, 
                        bachelorette parties, and combined bach groups.
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        {discoCruiseFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <feature.icon className="h-5 w-5 text-orange-500" />
                            <span className="text-gray-700">{feature.text}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-sm text-gray-500 mb-6">
                        Especially popular for destination bachelor parties where groups want high energy, 
                        low planning, and fixed per-person pricing.
                      </p>

                      <Link href="/atx-disco-cruise">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600" data-testid="button-learn-disco-cruise">
                          Learn More About ATX Disco Cruise
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="h-full border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-blue-500 text-white">Full Privacy</Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Private Lake Travis Charter</h3>
                      <p className="text-gray-600 mb-6">
                        Private charters are ideal if you have a large group (20–75), want total privacy, 
                        and prefer full music and schedule control.
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        {privateCruiseFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <feature.icon className="h-5 w-5 text-blue-500" />
                            <span className="text-gray-700">{feature.text}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-sm text-gray-500 mb-6">
                        Perfect for groups wanting exclusive access to a boat with custom music, 
                        itinerary, and timing flexibility.
                      </p>

                      <Link href="/private-boat-rentals">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-explore-private">
                          Explore Private Options
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-green-100 text-green-800 mb-4">Cost Comparison</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Realistic Cost Breakdown: Why Boats Beat Bars
                </h2>
              </motion.div>

              <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mb-8">
                <img 
                  src={pricingChart} 
                  alt="ATX Disco Cruise bachelor party pricing comparison chart showing $85-$105 per person all-inclusive"
                  className="w-full rounded-xl shadow-lg"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-blue-900 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Option</th>
                        <th className="px-6 py-4 text-left font-semibold">Per Person Cost</th>
                        <th className="px-6 py-4 text-left font-semibold hidden md:table-cell">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingComparison.map((row, index) => (
                        <tr key={index} className={`border-b ${row.option === 'ATX Disco Cruise' ? 'bg-green-50' : ''}`}>
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {row.option}
                            {row.option === 'ATX Disco Cruise' && (
                              <Badge className="ml-2 bg-green-500 text-white text-xs">Best Value</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 text-gray-700">{row.cost}</td>
                          <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-gray-600 mt-4">
                  This is why bachelor parties consistently rank Lake Travis party boats as the highest value option.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="bg-purple-100 text-purple-800 mb-4">BYOB Made Easy</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Alcohol Planning Without Headaches
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  One of the biggest pain points for bachelor parties is alcohol logistics. 
                  Premier Party Cruises simplifies this by allowing BYOB and coordinating seamlessly with Party On Delivery.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Have alcohol delivered to your Airbnb</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Have alcohol delivered to the marina</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Avoid grocery runs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Avoid carrying cases</span>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <p className="text-gray-700 mb-3">
                    Use <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-semibold">Party On Delivery</a> for 
                    convenient alcohol delivery—they handle everything.
                  </p>
                  <p className="text-sm text-gray-600">
                    This pairing—Austin party boat + Party On Delivery—is one of the strongest planning advantages in Austin.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img 
                  src={sectionImage1} 
                  alt="ATX Disco Cruise party boat with bachelor party guests enjoying Lake Travis"
                  className="rounded-xl shadow-lg w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-blue-700 text-blue-100 mb-4">Safety First</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Safety Without Killing the Vibe
                </h2>
                <p className="text-xl text-blue-200">
                  A common concern: "Will rules ruin the fun?" The answer is no—professional structure makes the party better.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-800/50 rounded-xl p-6">
                  <Shield className="h-10 w-10 text-blue-300 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Clear Safety Boundaries</h3>
                  <p className="text-blue-200">Rules are established upfront so everyone knows expectations.</p>
                </div>
                <div className="bg-blue-800/50 rounded-xl p-6">
                  <Users className="h-10 w-10 text-blue-300 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Crew Oversight</h3>
                  <p className="text-blue-200">Professional crew monitors the party and assists guests.</p>
                </div>
                <div className="bg-blue-800/50 rounded-xl p-6">
                  <Waves className="h-10 w-10 text-blue-300 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Swim-Zone Management</h3>
                  <p className="text-blue-200">Safe swimming areas with proper supervision and equipment.</p>
                </div>
                <div className="bg-blue-800/50 rounded-xl p-6">
                  <Navigation className="h-10 w-10 text-blue-300 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Crowd Flow Control</h3>
                  <p className="text-blue-200">Boat movement managed for safety and optimal experience.</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center mt-8">
                <p className="text-xl text-blue-100">
                  That's why Premier Party Cruises has maintained a <strong>perfect safety record</strong> while 
                  hosting tens of thousands of bachelor and bachelorette parties.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-orange-100 text-orange-800 mb-4">Weekend Planner</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ideal Bachelor Party Weekend Structure
                </h2>
                <p className="text-lg text-gray-600">
                  Most successful Austin bachelor party weekends follow this format.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {weekendStructure.map((day, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className={`rounded-xl p-6 ${index === 1 ? 'bg-orange-100 border-2 border-orange-300' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className={`h-5 w-5 ${index === 1 ? 'text-orange-600' : 'text-gray-500'}`} />
                      <h3 className={`text-xl font-bold ${index === 1 ? 'text-orange-800' : 'text-gray-900'}`}>
                        {day.day}
                      </h3>
                    </div>
                    {index === 1 && (
                      <Badge className="bg-orange-500 text-white mb-3">Main Event</Badge>
                    )}
                    <ul className="space-y-2">
                      {day.activities.map((activity, i) => (
                        <li key={i} className={`flex items-center gap-2 ${index === 1 ? 'text-orange-700' : 'text-gray-600'}`}>
                          <CheckCircle2 className={`h-4 w-4 ${index === 1 ? 'text-orange-500' : 'text-gray-400'}`} />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeInUp} className="text-center mt-8">
                <p className="text-gray-600 italic">
                  By placing the Lake Travis bachelor party first, you guarantee the highlight happens before fatigue sets in.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="max-w-3xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-blue-100 text-blue-800 mb-4">Common Questions</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  FAQs – Austin Bachelor Party Boats
                </h2>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`faq-${index}`}
                      className="bg-white rounded-xl shadow-md border-none px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-6" data-testid={`faq-trigger-${index}`}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <QuoteBuilderSection 
          heading="Ready to Plan Your Bachelor Party?"
          subheading="Get a custom quote for your Lake Travis bachelor party adventure"
          eventType="bachelor"
        />

        <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div variants={fadeInUp}>
                <PartyPopper className="h-16 w-16 text-orange-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  A Bachelor Party Should Feel Legendary—Not Stressful
                </h2>
                <p className="text-xl text-blue-200 mb-8">
                  If you want zero logistics, zero liability, and maximum fun—your move is clear.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/bachelor-party-austin">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" data-testid="button-cta-bachelor">
                    <Users className="mr-2 h-5 w-5" />
                    Bachelor Party Hub
                  </Button>
                </Link>
                <Link href="/private-boat-rentals">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-cta-private">
                    <Ship className="mr-2 h-5 w-5" />
                    Party Boat Options
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8 flex items-center justify-center gap-2 text-blue-200">
                <Phone className="h-5 w-5" />
                <span>Questions? Call us at </span>
                <a href="tel:512-488-5892" className="text-white font-semibold hover:underline">
                  512-488-5892
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
