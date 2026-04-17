import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Building2, Users, DollarSign, Camera, Music, 
  CheckCircle2, XCircle, Waves, MapPin,
  ArrowRight, Clock, Sun, Moon, Star,
  Volume2, Lock, Unlock, Heart, Sparkles, ThumbsUp,
  Wine, Shirt, GlassWater, PartyPopper, Anchor, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/dancing-party-scene.webp';
import sectionImage1 from '@assets/atx-disco-cruise-party.webp';
import sectionImage2 from '@assets/party-atmosphere-1.webp';

const comparisonStats = [
  { stat: 'BYOB', label: 'Party Boat Savings' },
  { stat: '$14+', label: 'Avg Bar Drink Cost' },
  { stat: '100%', label: 'Together Time' },
  { stat: '4-Hour', label: 'Cruise Duration' }
];

const atmosphereComparison = [
  {
    type: 'Lake Travis Party Boat',
    icon: Ship,
    pros: [
      'Everyone together the entire time',
      'Fixed schedule—no coordination stress',
      'BYOB (controlled costs)',
      'Built-in entertainment (DJ, floats)',
      'Licensed captain and crew',
      'Instagram-worthy photos guaranteed'
    ],
    cons: [
      'Fixed time window',
      'Weather dependent'
    ],
    color: 'pink'
  },
  {
    type: 'Downtown Austin Nightlife',
    icon: Building2,
    pros: [
      'Walkable bars',
      'Late-night energy',
      'Familiar format'
    ],
    cons: [
      'Long lines and wait times',
      'Expensive drinks ($14+ each)',
      'Crowded, loud spaces',
      'Groups get split up easily',
      'High coordination effort',
      'Safety concerns late at night'
    ],
    color: 'purple'
  }
];

const whyLakeTravisWorks = [
  {
    title: 'Zero Decision Fatigue',
    icon: ThumbsUp,
    description: 'On a party boat, you don\'t decide where to go next, don\'t wait for tables, and don\'t manage payments all night. You board, you party, you return. That simplicity is powerful.'
  },
  {
    title: 'One Shared Experience (No Fragmentation)',
    icon: Heart,
    description: 'Bars fragment groups. Boats unify them. A Lake Travis Party Boat keeps the bride, the bridesmaids, and friends from different cities all in the same moment, at the same time.'
  },
  {
    title: 'Predictable Costs',
    icon: DollarSign,
    description: 'One of the most stressful parts of planning an Austin Bachelorette Party is money. A Lake Travis Party Boat uses flat, transparent pricing—no surprise bar tabs, no forced spending.'
  }
];

const entertainmentComparison = [
  {
    category: 'Music',
    boat: 'Professional DJ included',
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
    boat: 'Professional photographer included',
    downtown: 'Phone selfies in dark bars',
    boatIcon: Camera,
    downtownIcon: Camera
  },
  {
    category: 'Privacy',
    boat: 'Curated celebration groups',
    downtown: 'Shared with strangers',
    boatIcon: Lock,
    downtownIcon: Unlock
  }
];

const discoCruiseFeatures = [
  {
    title: 'Designed for Bachelorette Parties',
    description: 'Multi-group energy without chaos—everyone onboard is celebrating',
    icon: PartyPopper
  },
  {
    title: 'Professional DJ Included',
    description: 'Disco theme, lighting, and dance floor with curated playlists',
    icon: Music
  },
  {
    title: 'Photographer Included',
    description: 'Professional photos of your group—no more blurry bar selfies',
    icon: Camera
  },
  {
    title: 'Giant Floats & Lily Pads',
    description: 'Swimming breaks, floating on unicorns, and water activities',
    icon: Waves
  },
  {
    title: 'BYOB with Private Coolers',
    description: 'Bring your own drinks, we provide coolers and ice',
    icon: GlassWater
  },
  {
    title: 'Festive, Not Random',
    description: 'Groups are similar in age and intent—the environment is monitored and structured',
    icon: Shield
  }
];

const privateVsDisco = [
  {
    option: 'Private Bachelorette Party Boat',
    bestFor: 'Total privacy, larger groups, full music control, customized vibe',
    icon: Anchor,
    link: '/private-cruises',
    color: 'blue'
  },
  {
    option: 'ATX Disco Cruise',
    bestFor: 'Groups under 15, maximum energy, minimal planning, the "Austin experience"',
    icon: Ship,
    link: '/atx-disco-cruise',
    color: 'pink'
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

const actualDayExperience = [
  {
    time: 'Boarding',
    activity: 'Music starts immediately',
    icon: Music
  },
  {
    time: 'On the Water',
    activity: 'Drinks flow without pressure',
    icon: GlassWater
  },
  {
    time: 'Mid-Cruise',
    activity: 'Swimming breaks up dancing',
    icon: Waves
  },
  {
    time: 'Throughout',
    activity: 'Everyone relaxes into the moment',
    icon: Heart
  },
  {
    time: 'The Bride',
    activity: 'Doesn\'t have to manage anything',
    icon: Sparkles
  }
];

const faqs = [
  {
    question: 'Is a party boat really better than downtown bars for a bachelorette party?',
    answer: 'For most groups, absolutely. A party boat gives you a guaranteed shared experience, no waiting in lines, BYOB savings, and Instagram-worthy photos. Downtown bars are great for variety and nightlife energy, but you\'ll spend more money, lose people in crowds, and compete for attention. Many groups do the boat as the main event, then hit downtown later if they still have energy.'
  },
  {
    question: 'Is this only for "wild" groups?',
    answer: 'Not at all! Energy level can be tailored. Many bachelorette groups prefer a classy, relaxed vibe with champagne and swimming. Others want to dance all afternoon. The boat experience adapts to your group\'s style.'
  },
  {
    question: 'What if someone doesn\'t want to swim?',
    answer: 'Totally fine—there\'s plenty of deck space, shade, and seating. Swimming is optional, and many guests enjoy simply lounging, dancing, and taking in the Lake Travis views without ever getting in the water.'
  },
  {
    question: 'Is it safe for out-of-town guests?',
    answer: 'Yes! Licensed captains and crew handle everything on the water. There\'s no driving after drinking, no navigating unfamiliar streets late at night, and no splitting up in crowds. It\'s actually safer than a downtown night out.'
  },
  {
    question: 'Do we still go out at night?',
    answer: 'Many groups do—but they often care less afterward because the boat was so memorable. A common approach is: boat during the day (the main event), dinner downtown, then Rainey Street or 6th Street later if the group still has energy.'
  },
  {
    question: 'How does BYOB work?',
    answer: 'BYOB means Bring Your Own Beverage—you bring whatever you want to drink (no glass containers). We provide coolers and ice. For easy alcohol delivery, many groups use Party On Delivery who can deliver directly to your Airbnb or the marina.'
  }
];

const summaryCards = [
  {
    title: 'Choose Party Boat If...',
    icon: Ship,
    color: 'pink',
    points: [
      'You want a guaranteed memorable experience',
      'Your group values togetherness',
      'You\'re budget-conscious (BYOB)',
      'You want amazing photos',
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

export default function BachelorettePartyVsNightlife() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = "https://premierpartycruises.com/blogs/austin-bachelorette-party-vs-lake-travis-boat-why-lake-wins";

  return (
    <LazyMotionProvider>
    <SEOHead
      pageRoute=""
      defaultTitle="Lake Travis vs Austin Nightlife Bachelorette Party Guide"
      defaultDescription="Compare Lake Travis party boats to Austin nightlife for your bachelorette. Discover why boat cruises offer more fun, less stress, and unforgettable memories."
      defaultKeywords={['austin bachelorette party', 'lake travis party boat', 'bachelorette party ideas austin', 'party boat vs bars', 'austin bachelorette weekend', 'rainey street bachelorette', '6th street bachelorette']}
      image="https://premierpartycruises.com/attached_assets/dancing-party-scene.webp"
    />
    <BlogV2Layout
      title="Lake Travis vs Austin Nightlife Bachelorette Party Guide"
      description="Compare Lake Travis party boats to Austin nightlife for your bachelorette. Discover why boat cruises offer more fun, less stress, and unforgettable memories."
      slug="austin-bachelorette-party-vs-lake-travis-boat-why-lake-wins"
      category="Bachelorette Guides"
      categoryHref="/bachelorette-party-austin"
      pillarTitle="Austin Bachelorette Party Guide"
      pillarHref="/bachelorette-party-austin"
      relatedArticles={[
        { title: "ATX Disco Cruise vs. Private Boat: Which Is Better?", href: "/blogs/atx-disco-cruise-vs-private-boat-which-is-better-for-a-bachelorette-party" },
        { title: "Ultimate Austin Bachelorette Party Boat Guide", href: "/blogs/ultimate-austin-bachelorette-party-boat-guide-lake-travis" },
        { title: "Austin Bachelorette Weekend Alcohol Timeline", href: "/blogs/austin-bachelorette-weekend-alcohol-timeline-day-by-day-drinking-strategy-for-multi-day-celebrations" },
      ]}
    >
    <>
      <main className="min-h-screen bg-white">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Bachelorette party celebrating - Lake Travis party boat vs downtown Austin nightlife"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 via-purple-800/60 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 py-16">
            <m.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <m.div variants={fadeInUp} className="mb-4 flex gap-2">
                <Badge className="bg-pink-600 text-white px-4 py-1">
                  <Ship className="h-3 w-3 mr-1" /> Lake Travis
                </Badge>
                <Badge className="bg-purple-600 text-white px-4 py-1">
                  <Building2 className="h-3 w-3 mr-1" /> Nightlife
                </Badge>
              </m.div>
              
              <m.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Austin Bachelorette Party vs Lake Travis Party Boat
              </m.h1>
              
              <m.p 
                variants={fadeInUp}
                className="text-xl text-pink-100 mb-8 leading-relaxed"
              >
                Why the Lake Wins Every Time. More fun, less stress, and better memories 
                for the bride-to-be and her crew.
              </m.p>

              <m.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/bachelorette-party-austin">
                  <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white" data-testid="button-bachelorette-party-hub">
                    <Users className="mr-2 h-5 w-5" />
                    Bachelorette Party Hub
                  </Button>
                </Link>
                <Link href="/atx-disco-cruise">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-atx-disco-cruise">
                    <Ship className="mr-2 h-5 w-5" />
                    ATX Disco Cruise
                  </Button>
                </Link>
              </m.div>
            </m.div>
          </div>
        </section>

        {/* Topic Cluster Pillar Link */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
          <div className="max-w-4xl mx-auto px-6 py-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This guide is part of our complete{' '}
              <Link href="/bachelorette-party-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin bachelorette party boats</Link>{' '}
              resource — your ultimate planning hub for Lake Travis bachelorette celebrations.
            </p>
          </div>
        </div>

        <section className="py-12 bg-gradient-to-b from-pink-900 to-purple-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {comparisonStats.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-pink-300 mb-1">{item.stat}</div>
                  <div className="text-pink-200 text-sm">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-pink-100 text-pink-800 mb-4">The Classic Dilemma</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  The Classic Austin Bachelorette Dilemma
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Every Austin Bachelorette Party starts with the same debate: "Do we do bars… or do we do something bigger?" 
                  Austin is packed with nightlife options—Rainey Street, West 6th, East Austin cocktail lounges—but 
                  when you zoom out, something becomes clear: <strong>bars are replaceable</strong>. The experience you'll 
                  remember years later isn't standing in line for drinks. It's the one-of-a-kind moment that brought everyone together.
                </p>
              </m.div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-purple-100 text-purple-800 mb-4">Honest Comparison</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Austin Nightlife vs Lake Travis Party Boat
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Let's break this down honestly—without hype.
                </p>
              </m.div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {atmosphereComparison.map((option, index) => (
                  <m.div key={index} variants={fadeInUp}>
                    <Card className={`h-full border-2 ${option.color === 'pink' ? 'border-pink-200 bg-gradient-to-br from-pink-50 to-white' : 'border-purple-200 bg-gradient-to-br from-purple-50 to-white'}`}>
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`p-3 rounded-lg ${option.color === 'pink' ? 'bg-pink-100' : 'bg-purple-100'}`}>
                            <option.icon className={`h-6 w-6 ${option.color === 'pink' ? 'text-pink-600' : 'text-purple-600'}`} />
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
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-pink-100 text-pink-800 mb-4">Why It Works</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Lake Travis Works Better for Bachelorette Groups
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  A Lake Travis Bachelorette Party succeeds because it solves the biggest problems planners face.
                </p>
              </m.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {whyLakeTravisWorks.map((item, index) => (
                  <m.div key={index} variants={fadeInUp}>
                    <Card className="h-full border-2 border-pink-100 hover:border-pink-300 transition-colors">
                      <CardContent className="p-6">
                        <div className="p-3 bg-pink-100 rounded-lg w-fit mb-4">
                          <item.icon className="h-6 w-6 text-pink-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </div>

              <m.div variants={fadeInUp} className="mt-8 text-center">
                <p className="text-lg text-gray-700 italic max-w-2xl mx-auto">
                  "This is why bachelorette groups consistently describe the boat day as 'the highlight of the weekend.'"
                </p>
              </m.div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-pink-600 to-purple-700">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-white/20 text-white mb-4">The Go-To Experience</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  ATX Disco Cruise: The Bachelorette Favorite
                </h2>
                <p className="text-lg text-pink-100 max-w-2xl mx-auto">
                  The ATX Disco Cruise isn't just a boat ride—it's a curated bachelorette ecosystem.
                </p>
              </m.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {discoCruiseFeatures.map((feature, index) => (
                  <m.div key={index} variants={fadeInUp}>
                    <Card className="h-full bg-white/10 border-white/20 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="p-3 bg-white/20 rounded-lg w-fit mb-4">
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-pink-100 text-sm">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </div>

              <m.div variants={fadeInUp} className="mt-10 text-center">
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50" data-testid="button-explore-disco-cruise">
                    <Ship className="mr-2 h-5 w-5" />
                    Explore ATX Disco Cruise
                  </Button>
                </Link>
              </m.div>

              <m.div variants={fadeInUp} className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={sectionImage1} 
                    alt="ATX Disco Cruise bachelorette party with DJ and dancing"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h4 className="font-bold text-lg">Dance Floor & DJ</h4>
                      <p className="text-sm text-pink-200">Disco theme with professional DJ</p>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={sectionImage2} 
                    alt="Bachelorette party atmosphere on Lake Travis"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h4 className="font-bold text-lg">Party Atmosphere</h4>
                      <p className="text-sm text-pink-200">Sun, water, and celebration vibes</p>
                    </div>
                  </div>
                </div>
              </m.div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-blue-100 text-blue-800 mb-4">Choose Your Style</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Private Party Boat vs Disco Cruise for Bachelorettes
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Both options live on Lake Travis and both are operated by Premier Party Cruises. 
                  Both outperform nightlife when measured by group satisfaction.
                </p>
              </m.div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {privateVsDisco.map((option, index) => (
                  <m.div key={index} variants={fadeInUp}>
                    <Card className={`h-full border-2 ${option.color === 'blue' ? 'border-blue-200' : 'border-pink-200'}`}>
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-3 rounded-lg ${option.color === 'blue' ? 'bg-blue-100' : 'bg-pink-100'}`}>
                            <option.icon className={`h-6 w-6 ${option.color === 'blue' ? 'text-blue-600' : 'text-pink-600'}`} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{option.option}</h3>
                        </div>
                        <p className="text-gray-600 mb-6"><strong>Best if:</strong> {option.bestFor}</p>
                        <Link href={option.link}>
                          <Button className={`w-full ${option.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-pink-600 hover:bg-pink-700'}`}>
                            Explore This Option
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-green-100 text-green-800 mb-4">Cost Comparison</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Pricing Reality Check
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  When you compare bar tabs, transportation, cover charges, and lost time—a Lake Travis 
                  Bachelorette Party is often more cost-effective than two nights out downtown.
                </p>
              </m.div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                  <div className="grid grid-cols-4 bg-gradient-to-r from-pink-600 to-purple-600 p-4 font-semibold text-white">
                    <div>Expense</div>
                    <div className="text-center">Party Boat</div>
                    <div className="text-center">Downtown</div>
                    <div className="text-center">You Save</div>
                  </div>
                  {costBreakdown.map((item, index) => (
                    <m.div 
                      key={index}
                      variants={fadeInUp}
                      className={`grid grid-cols-4 p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-t items-center`}
                    >
                      <div className="font-medium text-gray-900">{item.item}</div>
                      <div className="text-center text-pink-700 font-semibold">{item.boat}</div>
                      <div className="text-center text-purple-700">{item.downtown}</div>
                      <div className="text-center text-green-600 font-bold">{item.savings}</div>
                    </m.div>
                  ))}
                </div>

                <m.div variants={fadeInUp} className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <DollarSign className="h-8 w-8 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">The Bottom Line</h3>
                      <p className="text-gray-700 mb-4">
                        For a group of 10, a downtown bachelorette weekend can easily cost <strong>$200-400+ per person</strong> when 
                        you factor in drinks, covers, Ubers, and food. The ATX Disco Cruise? <strong>$85-105 per person</strong>, 
                        all-inclusive with DJ and photographer. Add your own drinks (BYOB) and you're looking at maybe 
                        <strong> $120-150 total per person</strong> for a 4-hour premium experience.
                      </p>
                    </div>
                  </div>
                </m.div>
              </div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-orange-100 text-orange-800 mb-4">Skip the Stress</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Party On Delivery: Alcohol Planning Without the Stress
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Alcohol logistics derail a lot of bachelorette weekends. Premier Party Cruises allows BYOB—and 
                  many groups simplify even further by using Party On Delivery.
                </p>
              </m.div>

              <m.div variants={fadeInUp} className="max-w-2xl mx-auto bg-orange-50 border border-orange-200 rounded-xl p-8 text-center">
                <Wine className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Party On Delivery Benefits</h3>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Alcohol delivered to your Airbnb
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Alcohol delivered to the marina
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    No grocery runs needed
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    No carrying cases
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    No forgotten mixers
                  </li>
                </ul>
                <a 
                  href="https://partyondelivery.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Visit Party On Delivery
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </m.div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-pink-100 text-pink-800 mb-4">The Experience</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What the Actual Day Feels Like
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Here's what groups consistently describe about their Lake Travis bachelorette experience.
                </p>
              </m.div>

              <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                  {actualDayExperience.map((item, index) => (
                    <m.div 
                      key={index}
                      variants={fadeInUp}
                      className="bg-white rounded-xl shadow-md p-6 flex gap-6 items-center"
                    >
                      <div className="bg-pink-100 rounded-lg p-3 flex-shrink-0">
                        <item.icon className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <div className="text-sm text-pink-600 font-semibold mb-1">{item.time}</div>
                        <h4 className="text-lg font-bold text-gray-900">{item.activity}</h4>
                      </div>
                    </m.div>
                  ))}
                </div>

                <m.div variants={fadeInUp} className="mt-8 bg-pink-100 border border-pink-200 rounded-xl p-6 text-center">
                  <Sparkles className="h-8 w-8 text-pink-600 mx-auto mb-3" />
                  <p className="text-gray-800 font-medium">
                    That's the magic of a Lake Travis Party Boat—it creates space for connection instead of logistics.
                  </p>
                </m.div>
              </div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-gray-100 text-gray-800 mb-4">Decision Time</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Summary: Which Should You Choose?
                </h2>
              </m.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {summaryCards.map((card, index) => (
                  <m.div key={index} variants={fadeInUp}>
                    <Card className={`h-full border-2 ${
                      card.color === 'pink' ? 'border-pink-200' : 
                      card.color === 'purple' ? 'border-purple-200' : 
                      'border-orange-200'
                    }`}>
                      <CardContent className="p-6">
                        <div className={`p-3 rounded-lg w-fit mb-4 ${
                          card.color === 'pink' ? 'bg-pink-100' : 
                          card.color === 'purple' ? 'bg-purple-100' : 
                          'bg-orange-100'
                        }`}>
                          <card.icon className={`h-6 w-6 ${
                            card.color === 'pink' ? 'text-pink-600' : 
                            card.color === 'purple' ? 'text-purple-600' : 
                            'text-orange-600'
                          }`} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
                        <ul className="space-y-2">
                          {card.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                              <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                                card.color === 'pink' ? 'text-pink-500' : 
                                card.color === 'purple' ? 'text-purple-500' : 
                                'text-orange-500'
                              }`} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        <QuoteBuilderSection />

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-3xl mx-auto"
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-pink-100 text-pink-800 mb-4">FAQ</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
              </m.div>

              <m.div variants={fadeInUp}>
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
              </m.div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center"
            >
              <m.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Plan the Ultimate Austin Bachelorette Party?
              </m.h2>
              <m.p variants={fadeInUp} className="text-xl text-pink-100 mb-4 max-w-2xl mx-auto">
                Nightlife can fill time. A Lake Travis Bachelorette Party creates memories.
              </m.p>
              <m.p variants={fadeInUp} className="text-lg text-pink-200 mb-8 max-w-2xl mx-auto">
                Whether you choose the party boat, downtown, or both—we've got you covered.
              </m.p>
              <m.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                <Link href="/bachelorette-party-austin">
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50" data-testid="button-cta-bachelorette-hub">
                    <Users className="mr-2 h-5 w-5" />
                    Bachelorette Party Hub
                  </Button>
                </Link>
                <Link href="/atx-disco-cruise">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-cta-disco-cruise">
                    <Ship className="mr-2 h-5 w-5" />
                    ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/private-cruises">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-cta-private-rentals">
                    <MapPin className="mr-2 h-5 w-5" />
                    Private Boat Rentals
                  </Button>
                </Link>
              </m.div>
            </m.div>
          </div>
        </section>
      </main>
    </>
    </BlogV2Layout>
    </LazyMotionProvider>
  );
}
