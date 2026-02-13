import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Lock, Unlock, Music, Camera, 
  Shield, Clock, CheckCircle2, XCircle, Sparkles,
  ArrowRight, DollarSign, Settings, Zap, Heart,
  Calendar, PartyPopper, Crown, Volume2, Sun, Wine
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/atx-disco-cruise-party.webp';
import privateBoatImage from '@assets/clever-girl-1-lake-travis-party-boat.jpg';

const comparisonTableData = [
  { feature: 'Group Type', private: 'Your group only', disco: 'Multiple bach groups' },
  { feature: 'Music', private: 'Your playlist / optional DJ', disco: 'DJ included' },
  { feature: 'Photographer', private: 'Optional add-on', disco: 'Included' },
  { feature: 'Energy Level', private: 'Customizable', disco: 'High-energy' },
  { feature: 'Planning Required', private: 'Moderate', disco: 'Minimal' },
  { feature: 'Pricing Model', private: 'Flat hourly', disco: 'Per person' },
  { feature: 'Social Interaction', private: 'Private', disco: 'Social' }
];

const privateCharterBestFor = [
  'Large bachelor parties (20-75 guests)',
  'Groups that want full privacy',
  'Corporate or professional events',
  'Mixed-age celebrations',
  'Custom timelines or activities'
];

const privateCharterControls = [
  { label: 'Music selection', icon: Music },
  { label: 'Vibe (chill, party, hybrid)', icon: Settings },
  { label: 'Swim timing', icon: Sun },
  { label: 'Decorations', icon: Sparkles },
  { label: 'Guest list', icon: Users },
  { label: 'Pace of the event', icon: Clock }
];

const privateCharterPros = [
  '100% private experience',
  'Fully customizable',
  'Works for any demographic',
  'Easier branding for corporate groups',
  'Flexible scheduling'
];

const privateCharterConsiderations = [
  'Higher total cost for small groups',
  'Requires a bit more planning',
  'DJ and photographer are add-ons',
  'Energy depends on your group'
];

const discoCruiseFeatures = [
  'Designed specifically for bachelor & bachelorette parties',
  'Multi-group format',
  'Professional DJ included',
  'Photographer included',
  'Disco dance floor + lighting',
  'Giant floats + lily pads',
  'Zero planning required'
];

const discoCruiseBestFor = [
  'Small to mid-size bachelor parties',
  'Small to mid-size bachelorette parties',
  'Destination groups visiting Austin',
  'Groups that want instant energy',
  'Planners who don\'t want to manage logistics'
];

const groupSizeRecommendations = [
  {
    size: 'Under 12 people',
    recommendation: 'ATX Disco Cruise usually wins',
    icon: Users,
    description: 'Best per-person value with all amenities included',
    color: 'purple'
  },
  {
    size: '12-25 people',
    recommendation: 'Either option works',
    icon: Heart,
    description: 'Depends on your vibe preference—private vs social',
    color: 'orange'
  },
  {
    size: '25+ people',
    recommendation: 'Private charter makes more sense',
    icon: Crown,
    description: 'Better value and full control for large groups',
    color: 'blue'
  }
];

const partyTypeRecommendations = [
  {
    type: 'Austin Bachelor Party',
    disco: 'Energy + social vibes',
    private: 'Dominance and control',
    icon: Users
  },
  {
    type: 'Austin Bachelorette Party',
    disco: 'Overwhelmingly popular choice',
    private: 'Works for quieter groups',
    icon: Heart
  },
  {
    type: 'Combined Bach Groups',
    disco: 'Excels here—shared celebration energy',
    private: 'Book a larger boat for both groups',
    icon: PartyPopper
  }
];

const safetyFeatures = [
  'Licensed captains',
  'Insured vessels',
  'Trained crew',
  'Safety briefings',
  'Controlled swim stops'
];

const summaryCards = [
  {
    title: 'Choose Private Charter If...',
    icon: Lock,
    color: 'blue',
    points: [
      'You want privacy',
      'Custom control is important',
      'Corporate or branded experience',
      'Large group (25+)',
      'Mixed-age celebration',
      'Specific timeline needs'
    ]
  },
  {
    title: 'Choose ATX Disco Cruise If...',
    icon: Zap,
    color: 'purple',
    points: [
      'You want instant energy',
      'Minimal planning preferred',
      'Social celebration vibe',
      'Best per-person value',
      'Small to mid-size group',
      'DJ & photographer included'
    ]
  },
  {
    title: 'Either Way You Win',
    icon: Ship,
    color: 'orange',
    points: [
      'Top-tier Lake Travis experience',
      'Professional crew',
      'BYOB allowed',
      'Party cove access',
      'Swimming & floating',
      'Unforgettable memories'
    ]
  }
];

const faqs = [
  {
    question: 'Can we switch options later if our group size changes?',
    answer: 'Often yes, depending on availability. Our team works with you to find the best fit as your plans evolve. Contact us early if you anticipate changes so we can hold options for you.'
  },
  {
    question: 'Is one option "better" than the other?',
    answer: 'No—they\'re fundamentally different experiences designed for different needs. The ATX Disco Cruise delivers instant party energy with everything included, while private charters offer complete customization and privacy. The "better" choice depends entirely on your group\'s preferences and size.'
  },
  {
    question: 'Do both options visit party coves on Lake Travis?',
    answer: 'Yes, both options include stops at party coves where guests can swim, float, and enjoy the water. Weather and water conditions permitting, the captain will choose the best spots for your cruise.'
  },
  {
    question: 'Which option is recommended most often for bachelor/bachelorette parties?',
    answer: 'For bach groups under 15 people, the ATX Disco Cruise is our most recommended option. It provides the best per-person value with DJ, photographer, and high-energy atmosphere included. For larger groups or those wanting complete privacy, private charters are the way to go.'
  },
  {
    question: 'How does BYOB work for both options?',
    answer: 'Both private charters and the ATX Disco Cruise are BYOB (Bring Your Own Beverage). No glass containers allowed. We provide coolers and ice. Many groups use Party On Delivery to have drinks delivered directly to the marina or their Airbnb.'
  },
  {
    question: 'What if we want a DJ on a private charter?',
    answer: 'DJ services are available as an add-on for private charters. This is popular for groups that want the energy of a professional DJ but also want a completely private experience. Our team can help you customize your package with any add-ons you need.'
  }
];

export default function PrivateCharterVsDiscoCruise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = "https://premierpartycruises.com/blogs/private-charter-vs-atx-disco-cruise-which-austin-party-boat";

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute=""
        defaultTitle="Private Charter vs ATX Disco Cruise | Austin Party Boats"
        defaultDescription="Private charter or ATX Disco Cruise? Compare cost, vibe, and group size to choose the best Lake Travis party boat for your Austin celebration."
        defaultKeywords={['austin party boat', 'lake travis party boat', 'private boat charter austin', 'atx disco cruise', 'bachelor party austin', 'bachelorette party lake travis', 'party boat rental austin']}
        image="https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp"
      />

      <PublicNavigation />

      <main className="min-h-screen bg-white">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="ATX Disco Cruise party boat on Lake Travis - Austin party boat comparison"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-800/60 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 py-16">
            <m.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <m.div variants={fadeInUp} className="mb-4 flex gap-2">
                <Badge className="bg-blue-600 text-white px-4 py-1" data-testid="badge-private-charter">
                  <Lock className="h-3 w-3 mr-1" /> Private Charter
                </Badge>
                <Badge className="bg-purple-600 text-white px-4 py-1" data-testid="badge-disco-cruise">
                  <Zap className="h-3 w-3 mr-1" /> ATX Disco Cruise
                </Badge>
              </m.div>
              
              <m.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Private Charter vs ATX Disco Cruise
              </m.h1>
              
              <m.p 
                variants={fadeInUp}
                className="text-xl text-blue-100 mb-8 leading-relaxed"
              >
                Which Austin party boat is right for your group? Both happen on Lake Travis, 
                both are professionally captained and BYOB—but they create very different experiences.
              </m.p>

              <m.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/private-cruises">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-private-charters">
                    <Lock className="mr-2 h-5 w-5" />
                    Private Charters
                  </Button>
                </Link>
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" data-testid="button-disco-cruise">
                    <Zap className="mr-2 h-5 w-5" />
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
              Explore our full guide to{' '}
              <Link href="/party-boat-lake-travis" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Lake Travis party boat rentals</Link>{' '}
              for everything from pricing and logistics to safety and entertainment.
            </p>
          </div>
        </div>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-orange-100 text-orange-800 mb-4">Understanding Your Options</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Not All Austin Party Boats Are the Same
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  If you're planning an Austin party boat experience, you'll quickly discover two very different paths. 
                  Both are operated by Premier Party Cruises. Both are professionally captained, safe, and BYOB. 
                  But they create very different experiences.
                </p>
              </m.div>

              <m.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6 mb-12">
                <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Lock className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Private Charter</h3>
                    </div>
                    <p className="text-gray-600">
                      The boat is yours—and only yours. Complete privacy, full customization, 
                      and your rules for the entire cruise.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Zap className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">ATX Disco Cruise</h3>
                    </div>
                    <p className="text-gray-600">
                      Not just a boat—it's a curated experience. Multi-group format with DJ, 
                      photographer, disco floor, and instant party energy.
                    </p>
                  </CardContent>
                </Card>
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
                <Badge className="bg-blue-100 text-blue-800 mb-4">Side-by-Side Comparison</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  High-Level Comparison: Private vs Disco
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Both are excellent Lake Travis party boat options—the right one depends on what you want the day to feel like.
                </p>
              </m.div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                  <div className="grid grid-cols-3 bg-gradient-to-r from-blue-600 via-purple-600 to-purple-600 p-4 font-semibold text-white">
                    <div>Feature</div>
                    <div className="text-center">Private Charter</div>
                    <div className="text-center">ATX Disco Cruise</div>
                  </div>
                  {comparisonTableData.map((row, index) => (
                    <m.div 
                      key={index}
                      variants={fadeInUp}
                      className={`grid grid-cols-3 p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-t items-center`}
                    >
                      <div className="font-medium text-gray-900">{row.feature}</div>
                      <div className="text-center text-blue-700">{row.private}</div>
                      <div className="text-center text-purple-700">{row.disco}</div>
                    </m.div>
                  ))}
                </div>
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
                <Badge className="bg-blue-100 text-blue-800 mb-4">Option 1</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Private Party Boat Charter on Lake Travis
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  A private charter means the boat is yours—and only yours. 
                  You're essentially renting a floating venue with a licensed captain and crew.
                </p>
              </m.div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <m.div variants={fadeInUp}>
                  <img 
                    src={privateBoatImage} 
                    alt="Private party boat charter on Lake Travis"
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                </m.div>

                <m.div variants={fadeInUp} className="space-y-6">
                  <Card className="border-2 border-blue-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        Who Private Charters Are Best For
                      </h3>
                      <ul className="space-y-2">
                        {privateCharterBestFor.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-blue-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Settings className="h-5 w-5 text-blue-600" />
                        What You Control
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {privateCharterControls.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-gray-700">
                            <item.icon className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              </div>

              <m.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" /> Pros
                    </h4>
                    <ul className="space-y-2">
                      {privateCharterPros.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                      <Clock className="h-5 w-5" /> Considerations
                    </h4>
                    <ul className="space-y-2">
                      {privateCharterConsiderations.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <ArrowRight className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </m.div>

              <m.div variants={fadeInUp} className="text-center mt-8">
                <Link href="/private-cruises">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-explore-private">
                    Explore Private Charters <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </m.div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-purple-200 text-purple-800 mb-4">Option 2</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  ATX Disco Cruise (Austin's Signature Party Boat)
                </h2>
                <p className="text-lg text-purple-200 max-w-2xl mx-auto">
                  Not just a boat—it's a curated experience. The most plug-and-play 
                  Lake Travis party experience available.
                </p>
              </m.div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <m.div variants={fadeInUp} className="space-y-6">
                  <Card className="bg-white/10 border-purple-400/30 backdrop-blur">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-300" />
                        What Makes It Different
                      </h3>
                      <ul className="space-y-2">
                        {discoCruiseFeatures.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-purple-100">
                            <CheckCircle2 className="h-4 w-4 text-purple-300 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-purple-400/30 backdrop-blur">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-purple-300" />
                        Who It's Best For
                      </h3>
                      <ul className="space-y-2">
                        {discoCruiseBestFor.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-purple-100">
                            <CheckCircle2 className="h-4 w-4 text-purple-300 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </m.div>

                <m.div variants={fadeInUp} className="space-y-6">
                  <Card className="bg-white/10 border-purple-400/30 backdrop-blur">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-300" />
                        Social Energy Without Chaos
                      </h3>
                      <p className="text-purple-100 mb-4">
                        A common concern is sharing the boat. In reality:
                      </p>
                      <ul className="space-y-2 text-purple-100">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-purple-300 mt-1 flex-shrink-0" />
                          All groups are bachelor/bachelorette parties
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-purple-300 mt-1 flex-shrink-0" />
                          Everyone is there to celebrate
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-purple-300 mt-1 flex-shrink-0" />
                          The crew manages flow and behavior
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-purple-300 mt-1 flex-shrink-0" />
                          Energy stays high but controlled
                        </li>
                      </ul>
                      <p className="text-purple-200 text-sm mt-4">
                        This is why reviews consistently favor the ATX Disco Cruise for bach groups.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="text-center">
                    <Link href="/atx-disco-cruise">
                      <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100" data-testid="button-explore-disco">
                        Explore ATX Disco Cruise <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
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
                <Badge className="bg-green-100 text-green-800 mb-4">Cost Reality</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Cost Comparison: Private vs Disco
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Understanding how pricing works helps you choose the best value for your group size.
                </p>
              </m.div>

              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <m.div variants={fadeInUp}>
                    <Card className="h-full border-2 border-blue-200 bg-blue-50">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <DollarSign className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Private Charter</h3>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2 text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                            <span><strong>Flat hourly rate</strong> regardless of group size</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                            <span>Better value for <strong>large groups (25+)</strong></span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                            <span>Add-ons available: DJ, photographer, decorations</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </m.div>

                  <m.div variants={fadeInUp}>
                    <Card className="h-full border-2 border-purple-200 bg-purple-50">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <DollarSign className="h-6 w-6 text-purple-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">ATX Disco Cruise</h3>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2 text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                            <span><strong>Per-person pricing</strong> ($85-105/person)</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                            <span>Best value for <strong>small-medium groups</strong></span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                            <span><strong>DJ & photographer included</strong> in price</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </m.div>
                </div>

                <m.div variants={fadeInUp} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <DollarSign className="h-8 w-8 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">The Bottom Line</h3>
                      <p className="text-gray-700">
                        When cost is measured <strong>per person</strong>, the ATX Disco Cruise is often the most economical 
                        way to access a premium Austin party boat experience. For large groups, private charters 
                        provide better overall value with complete customization included.
                      </p>
                    </div>
                  </div>
                </m.div>
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
                <Badge className="bg-orange-100 text-orange-800 mb-4">Group Size Guide</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  How Group Size Affects the Decision
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Premier Party Cruises offers both options so groups don't have to force-fit themselves 
                  into the wrong experience.
                </p>
              </m.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {groupSizeRecommendations.map((item, index) => (
                  <m.div key={index} variants={fadeInUp}>
                    <Card className={`h-full border-2 ${
                      item.color === 'purple' ? 'border-purple-200 bg-purple-50' :
                      item.color === 'orange' ? 'border-orange-200 bg-orange-50' :
                      'border-blue-200 bg-blue-50'
                    }`}>
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          item.color === 'purple' ? 'bg-purple-100' :
                          item.color === 'orange' ? 'bg-orange-100' :
                          'bg-blue-100'
                        }`}>
                          <item.icon className={`h-6 w-6 ${
                            item.color === 'purple' ? 'text-purple-600' :
                            item.color === 'orange' ? 'text-orange-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.size}</h3>
                        <p className={`font-semibold mb-2 ${
                          item.color === 'purple' ? 'text-purple-700' :
                          item.color === 'orange' ? 'text-orange-700' :
                          'text-blue-700'
                        }`}>{item.recommendation}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
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
                <Badge className="bg-pink-100 text-pink-800 mb-4">Party Type Recommendations</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Bachelor vs Bachelorette vs Mixed Groups
                </h2>
              </m.div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                  <div className="grid grid-cols-3 bg-gradient-to-r from-pink-600 to-purple-600 p-4 font-semibold text-white">
                    <div>Party Type</div>
                    <div className="text-center">Disco Cruise</div>
                    <div className="text-center">Private Charter</div>
                  </div>
                  {partyTypeRecommendations.map((item, index) => (
                    <m.div 
                      key={index}
                      variants={fadeInUp}
                      className={`grid grid-cols-3 p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-t items-center`}
                    >
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-pink-500" />
                        {item.type}
                      </div>
                      <div className="text-center text-purple-700 text-sm">{item.disco}</div>
                      <div className="text-center text-blue-700 text-sm">{item.private}</div>
                    </m.div>
                  ))}
                </div>
              </div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <m.div variants={fadeInUp} className="text-center mb-8">
                <Badge className="bg-amber-100 text-amber-800 mb-4">BYOB Made Easy</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Alcohol Planning for Both Options
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Both private charters and the ATX Disco Cruise are BYOB. 
                  To simplify logistics, many groups use Party On Delivery.
                </p>
              </m.div>

              <m.div variants={fadeInUp}>
                <Card className="border-2 border-amber-200 bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-100 rounded-lg flex-shrink-0">
                        <Wine className="h-8 w-8 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Party On Delivery</h3>
                        <p className="text-gray-700 mb-4">
                          Skip the grocery store runs. Get your drinks delivered directly to your Airbnb 
                          or the marina before your cruise.
                        </p>
                        <ul className="grid md:grid-cols-2 gap-2 mb-6">
                          <li className="flex items-center gap-2 text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-amber-500" />
                            Alcohol delivered to Airbnb
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-amber-500" />
                            Alcohol delivered to marina
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-amber-500" />
                            No grocery stops
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <CheckCircle2 className="h-4 w-4 text-amber-500" />
                            No forgotten mixers
                          </li>
                        </ul>
                        <a 
                          href="https://partyondelivery.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
                        >
                          Visit Party On Delivery <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                <Badge className="bg-green-100 text-green-800 mb-4">Professional Standards</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Safety, Structure, and Professionalism
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  This professional framework is why Premier Party Cruises dominates Lake Travis party boat recommendations.
                </p>
              </m.div>

              <m.div variants={fadeInUp} className="max-w-3xl mx-auto">
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <Shield className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Both Options Include</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {safetyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-700 justify-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-blue-900 to-purple-800 text-white">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-white/20 text-white mb-4">Final Verdict</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Match the Boat to the Goal
                </h2>
                <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                  Either way, you're getting a top-tier Austin party boat experience on Lake Travis.
                </p>
              </m.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {summaryCards.map((card, index) => (
                  <m.div key={index} variants={fadeInUp}>
                    <Card className={`h-full bg-white/10 backdrop-blur border-white/20`}>
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          card.color === 'blue' ? 'bg-blue-500' :
                          card.color === 'purple' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}>
                          <card.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-center mb-4">{card.title}</h3>
                        <ul className="space-y-2">
                          {card.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-blue-100">
                              <CheckCircle2 className="h-4 w-4 text-white/70 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
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
                <Badge className="bg-blue-100 text-blue-800 mb-4">Common Questions</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  FAQs – Choosing the Right Austin Party Boat
                </h2>
              </m.div>

              <m.div variants={fadeInUp}>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`faq-${index}`}
                      className="bg-white rounded-lg border shadow-sm"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline" data-testid={`faq-trigger-${index}`}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </m.div>
            </m.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white">
          <div className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center"
            >
              <m.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Choose Your Experience?
              </m.h2>
              <m.p variants={fadeInUp} className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Explore your options and book the perfect Austin party boat for your group.
              </m.p>
              <m.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-purple-700 hover:bg-purple-800 text-white" data-testid="button-cta-disco">
                    <Zap className="mr-2 h-5 w-5" />
                    ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/private-cruises">
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white" data-testid="button-cta-private">
                    <Lock className="mr-2 h-5 w-5" />
                    Private Boat Rentals
                  </Button>
                </Link>
                <Link href="/party-boat-lake-travis">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-cta-all-options">
                    <Ship className="mr-2 h-5 w-5" />
                    All Party Boat Options
                  </Button>
                </Link>
              </m.div>
            </m.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
    </LazyMotionProvider>
  );
}
