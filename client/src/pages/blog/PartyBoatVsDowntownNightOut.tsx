import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Building2, Users, DollarSign, Camera, Music, 
  Shield, Clock, CheckCircle2, XCircle, Waves, MapPin,
  ArrowRight, Wine, Car, PartyPopper, Sun, Moon, Star,
  Volume2, Lock, Unlock, Heart, Sparkles, ThumbsUp
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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const comparisonStats = [
  { stat: 'BYOB', label: 'Party Boat Savings' },
  { stat: '$14+', label: 'Avg Bar Drink Cost' },
  { stat: '100%', label: 'Private Experience' },
  { stat: '4-Hour', label: 'Cruise Duration' }
];

const atmosphereComparison = [
  {
    type: 'Party Boat',
    icon: Ship,
    pros: [
      'Private space for your group only',
      'Control the music and vibe',
      'No strangers interrupting',
      'Exclusive lake views and scenery',
      'Room to move, dance, and swim'
    ],
    cons: [
      'Fixed time window',
      'Weather dependent'
    ],
    color: 'blue'
  },
  {
    type: 'Downtown Night Out',
    icon: Building2,
    pros: [
      'Multiple venue options',
      'Meet new people',
      'Live music everywhere',
      'Food variety nearby'
    ],
    cons: [
      'Crowded venues',
      'Long lines and cover charges',
      'Group gets split up easily',
      'Loud and hard to talk',
      'No privacy'
    ],
    color: 'purple'
  }
];

const entertainmentComparison = [
  {
    category: 'Music',
    boat: 'Your playlist + optional DJ',
    downtown: 'Whatever the venue plays',
    boatIcon: Volume2,
    downtownIcon: Music
  },
  {
    category: 'Activities',
    boat: 'Swimming, floating, dancing, games',
    downtown: 'Dancing, bar hopping',
    boatIcon: Waves,
    downtownIcon: PartyPopper
  },
  {
    category: 'Photos',
    boat: 'Professional photographer included (Disco Cruise)',
    downtown: 'Phone selfies in dark bars',
    boatIcon: Camera,
    downtownIcon: Camera
  },
  {
    category: 'Privacy',
    boat: 'Exclusive to your group',
    downtown: 'Shared with strangers',
    boatIcon: Lock,
    downtownIcon: Unlock
  }
];

const costBreakdown = [
  {
    item: 'Drinks (per person)',
    boat: '$0 - BYOB',
    downtown: '$75-150+ (bar tab)',
    savings: '$75-150'
  },
  {
    item: 'Transportation',
    boat: 'One trip to marina',
    downtown: 'Multiple Ubers between bars',
    savings: '$30-60'
  },
  {
    item: 'Cover Charges',
    boat: '$0 included',
    downtown: '$10-30 per venue',
    savings: '$30-90'
  },
  {
    item: 'Entertainment',
    boat: 'DJ, photographer, floats included',
    downtown: 'Pay extra for VIP/bottle service',
    savings: '$100+'
  }
];

const sceneryComparison = {
  boat: {
    title: 'Lake Life',
    icon: Sun,
    features: [
      'Crystal-clear Lake Travis waters',
      'Texas Hill Country backdrop',
      'Stunning sunset views',
      'Natural lighting for photos',
      'Swimming and floating'
    ],
    photoQuality: 'Instagram-worthy scenery in every shot'
  },
  downtown: {
    title: 'City Lights',
    icon: Moon,
    features: [
      'Austin skyline views',
      'Neon signs and bar vibes',
      'Urban energy',
      'People watching',
      'Historic 6th Street'
    ],
    photoQuality: 'Dark, crowded bar photos'
  }
};

const convenienceSafety = [
  {
    factor: 'Group Management',
    boat: { text: 'Everyone stays together for 4 hours', icon: CheckCircle2, positive: true },
    downtown: { text: 'People constantly getting lost or separated', icon: XCircle, positive: false }
  },
  {
    factor: 'Transportation',
    boat: { text: 'One trip to/from marina, captain handles the rest', icon: CheckCircle2, positive: true },
    downtown: { text: 'Multiple Ubers, coordinating rides all night', icon: XCircle, positive: false }
  },
  {
    factor: 'Safety',
    boat: { text: 'Licensed captain, no driving after drinking', icon: CheckCircle2, positive: true },
    downtown: { text: 'DUI risk, walking in crowds at night', icon: XCircle, positive: false }
  },
  {
    factor: 'Planning Stress',
    boat: { text: 'Book once, everything included', icon: CheckCircle2, positive: true },
    downtown: { text: 'Reservations at multiple venues, herding the group', icon: XCircle, positive: false }
  }
];

const whyNotBothSchedule = [
  {
    time: 'Saturday 12PM-4PM',
    activity: 'Lake Travis Party Boat (main event)',
    description: 'Start with the highlight—swimming, floating, dancing on the lake'
  },
  {
    time: '4PM-6PM',
    activity: 'Return & Recharge',
    description: 'Head back to your Airbnb, shower, quick nap'
  },
  {
    time: '6PM-8PM',
    activity: 'Dinner Downtown',
    description: 'Hit a steakhouse or Austin BBQ spot'
  },
  {
    time: '8PM-Late',
    activity: 'Rainey Street or 6th Street',
    description: 'Bar hop with energy to spare (you didn\'t waste it in line earlier)'
  }
];

const faqs = [
  {
    question: 'Is a party boat really better than downtown bars for a bachelor party?',
    answer: 'For most groups, yes. A party boat gives you a guaranteed private experience, no waiting in lines, BYOB savings, and a unique backdrop. Downtown bars are great for variety and nightlife energy, but you\'ll spend more money, lose people in crowds, and compete for attention. Many groups do the boat as the main event, then hit downtown later with leftover energy.'
  },
  {
    question: 'What if some guys prefer bars over boats?',
    answer: 'That\'s why we recommend doing both! Start with the party boat during the day (everyone loves it once they\'re on the water), then transition to downtown nightlife in the evening. You get the best of both worlds, and the boat becomes a bonding experience that makes the bar hopping even better.'
  },
  {
    question: 'How does BYOB work on the party boat?',
    answer: 'BYOB means Bring Your Own Beverage—you bring whatever you want to drink (no glass containers). We provide coolers and ice. For easy alcohol delivery, we partner with Party On Delivery who can deliver directly to your Airbnb or the marina. Compare that to $14+ cocktails downtown and the savings are massive.'
  },
  {
    question: 'What if the weather is bad?',
    answer: 'Premier Party Cruises monitors weather constantly and has backup protocols. If conditions are unsafe, we\'ll work with you to reschedule. Lake Travis weather is generally excellent from March through October, and even a partly cloudy day makes for great photos and comfortable temperatures.'
  },
  {
    question: 'Can we combine bachelor and bachelorette groups on the boat?',
    answer: 'Absolutely! The ATX Disco Cruise is perfect for combined bach parties. You\'ll be with other celebration groups in a shared party atmosphere—it\'s often even more fun than a private event. For private charters, you can book a larger boat to accommodate both groups.'
  },
  {
    question: 'How far in advance should we book?',
    answer: 'Peak season (March-October) fills up quickly, especially Saturdays. We recommend booking 2-4 weeks in advance for the best availability. Bachelor party weekends are our most popular, so don\'t wait until the last minute or you might miss out on the ideal time slot.'
  }
];

const summaryCards = [
  {
    title: 'Choose Party Boat If...',
    icon: Ship,
    color: 'blue',
    points: [
      'You want a guaranteed memorable experience',
      'Your group values privacy',
      'You\'re budget-conscious (BYOB)',
      'You want great photos',
      'You hate waiting in lines',
      'You want everyone together'
    ]
  },
  {
    title: 'Choose Downtown If...',
    icon: Building2,
    color: 'purple',
    points: [
      'Your group loves bar hopping',
      'You want to meet strangers',
      'Nightlife is the priority',
      'Weather is concerning',
      'You prefer urban energy',
      'Budget isn\'t a factor'
    ]
  },
  {
    title: 'Do Both For The Ultimate Weekend',
    icon: Heart,
    color: 'orange',
    points: [
      'Boat during the day, bars at night',
      'Best of both worlds',
      'Maximum variety',
      'Epic 2-day celebration',
      'Most popular choice',
      'Unforgettable memories'
    ]
  }
];

export default function PartyBoatVsDowntownNightOut() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = "https://premierpartycruises.com/blogs/lake-travis-party-boat-vs-downtown-night-out-austin-bachelor";

  return (
    <>
      <Helmet>
        <title>Party Boat vs Downtown Austin Night Out Comparison Guide</title>
        <meta name="description" content="Lake Travis party boats vs downtown Austin nightlife for bachelor parties. Compare costs, privacy, and fun to find the ultimate celebration experience." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Party Boat vs Downtown Austin Night Out Comparison Guide" />
        <meta property="og:description" content="Lake Travis party boats vs downtown Austin nightlife for bachelor parties. Compare costs, privacy, and fun to find the ultimate celebration experience." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Party Boat vs Downtown Austin Night Out Comparison Guide" />
        <meta name="twitter:description" content="Lake Travis party boats vs downtown Austin nightlife for bachelor parties. Compare costs, privacy, and fun to find the ultimate celebration experience." />
        <meta name="keywords" content="austin bachelor party, lake travis party boat, downtown austin nightlife, bachelor party ideas austin, party boat vs bars, austin bachelor weekend, 6th street bachelor party" />
      </Helmet>

      <PublicNavigation />

      <main className="min-h-screen bg-white">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Bachelor party group celebrating - Lake Travis party boat vs downtown Austin comparison"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-800/60 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 py-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="max-w-3xl"
            >
              <motion.div variants={fadeInUp} className="mb-4 flex gap-2">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  <Ship className="h-3 w-3 mr-1" /> Party Boat
                </Badge>
                <Badge className="bg-purple-600 text-white px-4 py-1">
                  <Building2 className="h-3 w-3 mr-1" /> Downtown
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Lake Travis Party Boat vs Downtown Night Out
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-blue-100 mb-8 leading-relaxed"
              >
                The ultimate Austin bachelor party showdown. Which delivers more fun, 
                better value, and unforgettable memories? Let's break it down.
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

        <section className="py-12 bg-gradient-to-b from-blue-900 to-purple-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {comparisonStats.map((item, index) => (
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
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-blue-100 text-blue-800 mb-4">Atmosphere Comparison</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Private Party vs Public Scene
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  The biggest difference? Control. On a party boat, you control everything. 
                  Downtown, you're at the mercy of crowds, venues, and chance.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {atmosphereComparison.map((option, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className={`h-full border-2 ${option.color === 'blue' ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-white' : 'border-purple-200 bg-gradient-to-br from-purple-50 to-white'}`}>
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`p-3 rounded-lg ${option.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                            <option.icon className={`h-6 w-6 ${option.color === 'blue' ? 'text-blue-600' : 'text-purple-600'}`} />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">{option.type}</h3>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" /> Pros
                          </h4>
                          <ul className="space-y-2">
                            {option.pros.map((pro, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                            <XCircle className="h-4 w-4" /> Cons
                          </h4>
                          <ul className="space-y-2">
                            {option.cons.map((con, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700">
                                <XCircle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
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
                <Badge className="bg-orange-100 text-orange-800 mb-4">Entertainment Comparison</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Choose Your Own Adventure
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  What kind of entertainment experience do you actually want?
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="grid grid-cols-3 bg-gray-100 p-4 font-semibold text-gray-700">
                    <div>Category</div>
                    <div className="text-center text-blue-700">Party Boat</div>
                    <div className="text-center text-purple-700">Downtown</div>
                  </div>
                  {entertainmentComparison.map((item, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeInUp}
                      className={`grid grid-cols-3 p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-t`}
                    >
                      <div className="font-medium text-gray-900">{item.category}</div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-blue-700">
                          <item.boatIcon className="h-4 w-4" />
                          <span className="text-sm">{item.boat}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-purple-700">
                          <item.downtownIcon className="h-4 w-4" />
                          <span className="text-sm">{item.downtown}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div variants={fadeInUp} className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={sectionImage1} 
                    alt="ATX Disco Cruise party boat with DJ and dancing"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h4 className="font-bold text-lg">ATX Disco Cruise</h4>
                      <p className="text-sm text-blue-200">DJ, photographer, and party vibes included</p>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={sectionImage2} 
                    alt="Lake Travis party boat with group enjoying the water"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h4 className="font-bold text-lg">Private Charters</h4>
                      <p className="text-sm text-blue-200">Your boat, your rules, your adventure</p>
                    </div>
                  </div>
                </div>
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
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-green-100 text-green-800 mb-4">Cost Comparison</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Bang for Your Buck: BYOB vs Bar Tabs
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Let's talk money. This is where party boats absolutely crush downtown nightlife.
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                  <div className="grid grid-cols-4 bg-gradient-to-r from-blue-600 to-purple-600 p-4 font-semibold text-white">
                    <div>Expense</div>
                    <div className="text-center">Party Boat</div>
                    <div className="text-center">Downtown</div>
                    <div className="text-center">You Save</div>
                  </div>
                  {costBreakdown.map((item, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeInUp}
                      className={`grid grid-cols-4 p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-t items-center`}
                    >
                      <div className="font-medium text-gray-900">{item.item}</div>
                      <div className="text-center text-blue-700 font-semibold">{item.boat}</div>
                      <div className="text-center text-purple-700">{item.downtown}</div>
                      <div className="text-center text-green-600 font-bold">{item.savings}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={fadeInUp} className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <DollarSign className="h-8 w-8 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">The Bottom Line</h3>
                      <p className="text-gray-700 mb-4">
                        For a group of 10 guys, a downtown bachelor party can easily cost <strong>$200-400+ per person</strong> when 
                        you factor in drinks, covers, Ubers, and food. The ATX Disco Cruise? <strong>$85-105 per person</strong>, 
                        all-inclusive with DJ and photographer. Add your own drinks (BYOB) and you're looking at maybe 
                        <strong> $120-150 total per person</strong> for a 4-hour premium experience.
                      </p>
                      <p className="text-sm text-gray-600">
                        Pro tip: Use <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> to 
                        get your drinks delivered directly to the marina or your Airbnb.
                      </p>
                    </div>
                  </div>
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
                <Badge className="bg-yellow-100 text-yellow-800 mb-4">Scenery & Photos</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Lake Life vs City Lights
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Your bachelor party photos will live forever. Where do you want them taken?
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <motion.div variants={fadeInUp}>
                  <Card className="h-full border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <sceneryComparison.boat.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{sceneryComparison.boat.title}</h3>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {sceneryComparison.boat.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-700">
                            <Sparkles className="h-4 w-4 text-blue-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="bg-blue-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Camera className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">Photo Quality</span>
                        </div>
                        <p className="text-blue-700 text-sm">{sceneryComparison.boat.photoQuality}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="h-full border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <sceneryComparison.downtown.icon className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{sceneryComparison.downtown.title}</h3>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {sceneryComparison.downtown.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-700">
                            <Star className="h-4 w-4 text-purple-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="bg-purple-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Camera className="h-5 w-5 text-purple-600" />
                          <span className="font-semibold text-purple-800">Photo Quality</span>
                        </div>
                        <p className="text-purple-700 text-sm">{sceneryComparison.downtown.photoQuality}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
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
                <Badge className="bg-red-100 text-red-800 mb-4">Convenience & Safety</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Stress-Free vs Chaos Management
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  As the planner, you want minimal headaches. Here's the reality.
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto space-y-4">
                {convenienceSafety.map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-md p-6 border"
                  >
                    <div className="grid md:grid-cols-3 gap-4 items-center">
                      <div className="font-bold text-gray-900 text-lg">{item.factor}</div>
                      <div className={`flex items-center gap-2 p-3 rounded-lg ${item.boat.positive ? 'bg-green-50' : 'bg-red-50'}`}>
                        <item.boat.icon className={`h-5 w-5 ${item.boat.positive ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={`text-sm ${item.boat.positive ? 'text-green-700' : 'text-red-700'}`}>{item.boat.text}</span>
                      </div>
                      <div className={`flex items-center gap-2 p-3 rounded-lg ${item.downtown.positive ? 'bg-green-50' : 'bg-red-50'}`}>
                        <item.downtown.icon className={`h-5 w-5 ${item.downtown.positive ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={`text-sm ${item.downtown.positive ? 'text-green-700' : 'text-red-700'}`}>{item.downtown.text}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-orange-100 text-orange-800 mb-4">Best of Both Worlds</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Not Both? The Ultimate Austin Bachelor Weekend
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Here's the secret most groups discover: you don't have to choose. 
                  The best Austin bachelor parties combine both experiences.
                </p>
              </motion.div>

              <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                  {whyNotBothSchedule.map((item, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeInUp}
                      className="bg-white rounded-xl shadow-md p-6 flex gap-6 items-start"
                    >
                      <div className="bg-orange-100 rounded-lg p-3 flex-shrink-0">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm text-orange-600 font-semibold mb-1">{item.time}</div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{item.activity}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={fadeInUp} className="mt-8 bg-orange-100 border border-orange-200 rounded-xl p-6 text-center">
                  <ThumbsUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <p className="text-gray-800 font-medium">
                    This schedule is our most recommended approach. You get the unique, memorable daytime experience 
                    on the lake, then the classic Austin nightlife later. Everyone's happy.
                  </p>
                </motion.div>
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
                <Badge className="bg-gray-100 text-gray-800 mb-4">Decision Time</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Summary: Which Should You Choose?
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {summaryCards.map((card, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className={`h-full border-2 ${
                      card.color === 'blue' ? 'border-blue-200' : 
                      card.color === 'purple' ? 'border-purple-200' : 
                      'border-orange-200'
                    }`}>
                      <CardContent className="p-6">
                        <div className={`p-3 rounded-lg w-fit mb-4 ${
                          card.color === 'blue' ? 'bg-blue-100' : 
                          card.color === 'purple' ? 'bg-purple-100' : 
                          'bg-orange-100'
                        }`}>
                          <card.icon className={`h-6 w-6 ${
                            card.color === 'blue' ? 'text-blue-600' : 
                            card.color === 'purple' ? 'text-purple-600' : 
                            'text-orange-600'
                          }`} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
                        <ul className="space-y-2">
                          {card.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                              <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                                card.color === 'blue' ? 'text-blue-500' : 
                                card.color === 'purple' ? 'text-purple-500' : 
                                'text-orange-500'
                              }`} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <QuoteBuilderSection />

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
                <Badge className="bg-blue-100 text-blue-800 mb-4">FAQ</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`faq-${index}`}
                      className="bg-white rounded-xl shadow-sm border px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline" data-testid={`faq-trigger-${index}`}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Plan the Ultimate Austin Bachelor Party?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Whether you choose the party boat, downtown, or both—we've got you covered.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                <Link href="/bachelor-party-austin">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" data-testid="button-cta-bachelor-hub">
                    <Users className="mr-2 h-5 w-5" />
                    Bachelor Party Hub
                  </Button>
                </Link>
                <Link href="/atx-disco-cruise">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-cta-disco-cruise">
                    <Ship className="mr-2 h-5 w-5" />
                    ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/private-boat-rentals">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-cta-private-rentals">
                    <MapPin className="mr-2 h-5 w-5" />
                    Private Boat Rentals
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
