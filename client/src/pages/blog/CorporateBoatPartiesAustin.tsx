import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, AlertCircle,
  DollarSign, Shield, Music, Camera, Anchor, Wine
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-12_1760080740019.jpg';
import sectionImage1 from '@assets/@capitalcityshots-13_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-14_1760080740020.jpg';
import sectionImage3 from '@assets/@capitalcityshots-15_1760080740020.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const corporateProblems = [
  { 
    icon: AlertCircle, 
    title: 'They Feel Forced', 
    description: 'Employees dread mandatory fun in sterile conference rooms',
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  { 
    icon: Users, 
    title: 'Low Engagement', 
    description: 'Attendance drops after the first hour as people slip away',
    color: 'text-orange-600',
    bg: 'bg-orange-100'
  },
  { 
    icon: Building2, 
    title: 'Forgettable Venues', 
    description: 'Hotel ballrooms and restaurants all blur together',
    color: 'text-gray-600',
    bg: 'bg-gray-100'
  },
  { 
    icon: Clock, 
    title: 'Logistics Nightmare', 
    description: 'Planning time gets eaten by vendor coordination',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const whyLakeTravisWorks = [
  {
    icon: Handshake,
    title: 'Built-In Engagement (No Icebreakers Needed)',
    description: 'On a boat, everyone arrives together and shares the same experience. The environment encourages natural conversation without forced networking games.',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    icon: Users,
    title: 'Neutral, Non-Office Environment',
    description: 'A Lake Travis party boat removes hierarchy. Executives, managers, new hires, and clients all share the same deck, view, and experience.',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    icon: Clock,
    title: 'Controlled Timeline',
    description: 'Fixed start time, fixed duration, planned route, managed activities. No wandering, no early exits, no schedule drift.',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  }
];

const eventTypes = [
  'Team-building events',
  'Sales kickoffs',
  'Client appreciation outings',
  'Startup celebrations',
  'Company anniversaries',
  'Recruiting events',
  'End-of-quarter celebrations'
];

const discoFeatures = [
  { icon: Music, text: 'Professional DJ' },
  { icon: Camera, text: 'Event Photographer' },
  { icon: Target, text: 'Structured Energy' },
  { icon: Shield, text: 'Clear Boundaries' },
  { icon: CheckCircle2, text: 'Zero Planning Effort' }
];

const privateFeatures = [
  'Custom music (or none at all)',
  'Optional presentations or speeches',
  'Branded moments',
  'Flexible pacing',
  'Catering coordination'
];

const eventFormats = [
  {
    title: '3-Hour Cruise',
    bestFor: ['Casual team outing', 'Client appreciation', 'Recruiting event'],
    color: 'border-blue-500'
  },
  {
    title: '4-Hour Cruise',
    bestFor: ['Team-building', 'Celebration + swim', 'End-of-quarter party'],
    color: 'border-green-500'
  },
  {
    title: 'Private Sunset Cruise',
    bestFor: ['Executive retreat', 'Investor entertaining', 'High-end client experience'],
    color: 'border-amber-500'
  }
];

const safetyFeatures = [
  { icon: Shield, text: 'Licensed Captains' },
  { icon: Award, text: 'Insured Vessels' },
  { icon: Users, text: 'Trained Crew' },
  { icon: CheckCircle2, text: 'Clear Safety Briefings' },
  { icon: Waves, text: 'Structured Swim Policies' }
];

const faqs = [
  {
    question: 'Is a boat party appropriate for mixed-age corporate teams?',
    answer: 'Absolutely. Tone and music are completely adjustable based on your group. We host everything from startup teams to executive retreats, tailoring the experience to your company culture.'
  },
  {
    question: 'Can we keep the event professional?',
    answer: 'Yes. Alcohol is optional, not required. Many companies use our BYOB structure to control the experience. The crew maintains professionalism throughout.'
  },
  {
    question: 'Is it safe for executives and clients?',
    answer: 'Safety is our priority. Licensed captains and trained crew manage every aspect of the experience. All vessels are fully insured and regularly inspected.'
  },
  {
    question: 'Can we brand the event or add corporate elements?',
    answer: 'Yes, especially on private charters. Companies often add custom signage, branded moments for photos, and incorporate presentations or speeches into the cruise.'
  },
  {
    question: 'How does alcohol work at corporate events on boats?',
    answer: 'All cruises are BYOB. This gives you full control over what\'s served. Many companies partner with Party On Delivery for convenient marina delivery without employee errands or reimbursement hassles.'
  },
  {
    question: 'How far in advance should we book a corporate event?',
    answer: 'We recommend 2-4 weeks minimum for corporate events. Popular dates fill quickly, especially in spring and fall. The earlier you reach out, the more options we can offer.'
  }
];

const costComparison = [
  { venue: 'Hotel Ballroom', items: 'Room rental, AV, catering minimums, parking', hidden: 'Service charges, setup fees' },
  { venue: 'Restaurant Buyout', items: 'F&B minimums, limited capacity', hidden: 'Gratuity requirements, time limits' },
  { venue: 'Lake Travis Boat', items: 'All-inclusive charter, BYOB savings', hidden: 'No hidden fees' }
];

export default function CorporateBoatPartiesAustin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Corporate Boat Parties in Austin | Lake Travis Venue That Beats Ballrooms</title>
        <meta name="description" content="Looking for unique corporate event ideas in Austin? Discover why Lake Travis party boats outperform traditional venues for team-building, client entertainment, and company celebrations." />
        <meta name="keywords" content="corporate boat parties Austin, Lake Travis corporate events, Austin company party boat, team building boat rental, corporate event venue Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/corporate-boat-parties-austin-lake-travis-smartest-venue" />
        <meta property="og:title" content="Corporate Boat Parties in Austin | Lake Travis Venue That Beats Ballrooms" />
        <meta property="og:description" content="Discover why Lake Travis party boats outperform traditional venues for team-building, client entertainment, and company celebrations." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section - Boats Beat Ballrooms */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-400 text-black font-bold">
              BOATS BEAT BALLROOMS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Corporate Boat Parties in Austin
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Why Lake Travis Is the Smartest Event Venue You're Not Using
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Transform corporate obligations into experiences people actually remember.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/corporate-events">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6" data-testid="button-corporate-events">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your Corporate Event
                </Button>
              </Link>
              <Link href="/private-boat-rentals">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-private-rentals">
                  View Private Boat Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Corporate Events Have a Serious Problem */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Corporate Events Have a Serious Problem</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Restaurants, hotel ballrooms, and rented event spaces all blur together. 
                Employees and clients may show up, but they rarely remember the experience.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {corporateProblems.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-red-200">
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${item.bg} rounded-full flex items-center justify-center`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                That's why more companies are choosing corporate boat parties on Lake Travis.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Lake Travis Works for Corporate Events */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">THE SOLUTION</Badge>
                  <h2 className="text-3xl font-bold mb-6">Why Lake Travis Works for Corporate Events</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    A corporate boat party in Austin succeeds because it naturally solves the problems traditional venues create.
                  </p>
                  
                  <div className="space-y-6">
                    {whyLakeTravisWorks.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`h-6 w-6 ${item.color}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Corporate team enjoying Lake Travis boat party"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Ship className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Shared Experience</p>
                        <p className="text-xs text-gray-500">Everyone together</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Types of Corporate Events Work Best */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">EVENT TYPES</Badge>
              <h2 className="text-3xl font-bold mb-4">What Types of Corporate Events Work Best on a Boat?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Premier Party Cruises regularly hosts a wide variety of corporate events on Lake Travis party boats.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {eventTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Badge className="text-base py-2 px-4 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                    <CheckCircle2 className="h-4 w-4 mr-2 inline" />
                    {type}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mt-10"
            >
              <Link href="/corporate-events">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold" data-testid="button-explore-corporate">
                  Explore Corporate Event Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ATX Disco Cruise for Corporate Groups */}
        <section className="py-16 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage2}
                      alt="ATX Disco Cruise party atmosphere"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-purple-400 text-black">FOR CREATIVE TEAMS</Badge>
                  <h2 className="text-3xl font-bold mb-6">ATX Disco Cruise for Corporate Groups</h2>
                  <p className="text-lg text-white/90 mb-4 leading-relaxed">
                    While the ATX Disco Cruise is best known for bachelor and bachelorette parties, 
                    it works exceptionally well for:
                  </p>
                  
                  <ul className="mb-6 space-y-2">
                    {['Startups', 'Creative agencies', 'Tech teams', 'Younger workforces'].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white/90">
                        <Star className="h-5 w-5 text-yellow-400" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {discoFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
                        <feature.icon className="h-5 w-5 text-purple-300" />
                        <span className="text-sm text-white">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/atx-disco-cruise">
                    <Button size="lg" className="bg-purple-500 hover:bg-purple-400 text-white font-bold" data-testid="button-disco-cruise">
                      <Music className="mr-2 h-5 w-5" />
                      Learn About ATX Disco Cruise
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Private Corporate Party Boats */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-slate-100 text-slate-700">TRADITIONAL CORPORATE</Badge>
                  <h2 className="text-3xl font-bold mb-6">Private Corporate Party Boats on Lake Travis</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    For more traditional corporate groups, private charters are often the better fit. 
                    You control the experience completely.
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4">Private corporate boats offer:</h3>
                    <ul className="space-y-3">
                      {privateFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href="/private-boat-rentals">
                    <Button size="lg" className="bg-slate-800 hover:bg-slate-700 text-white font-bold" data-testid="button-private-boats">
                      <Anchor className="mr-2 h-5 w-5" />
                      View Private Boat Options
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Private corporate boat charter on Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-8 w-8 text-slate-600" />
                      <div>
                        <p className="font-bold text-sm">Full Control</p>
                        <p className="text-xs text-gray-500">Your event, your way</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Alcohol at Corporate Events */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-4 bg-amber-100 text-amber-700">HANDLED CORRECTLY</Badge>
                <h2 className="text-3xl font-bold mb-6">Alcohol at Corporate Events</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Alcohol at corporate events is sensitive. A Lake Travis party boat solves this elegantly.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: Wine, text: 'Alcohol Optional' },
                    { icon: CheckCircle2, text: 'BYOB Structure' },
                    { icon: Users, text: 'Crew Oversight' },
                    { icon: Shield, text: 'Full Compliance' }
                  ].map((item, index) => (
                    <Card key={index} className="bg-white/80 dark:bg-gray-800">
                      <CardContent className="p-4 text-center">
                        <item.icon className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                        <p className="font-semibold text-sm">{item.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-white dark:bg-gray-800 border-2 border-amber-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">Simplify with Party On Delivery</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Many companies partner with Party On Delivery to simplify logistics without encouraging excess. 
                      Alcohol delivered directly to the marina—no employee errands, no reimbursement chaos.
                    </p>
                    <a 
                      href="https://partyondelivery.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-2"
                      data-testid="link-party-on-delivery"
                    >
                      Visit partyondelivery.com
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cost Transparency */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">BUDGET-FRIENDLY</Badge>
              <h2 className="text-3xl font-bold mb-4">Cost Transparency (Why Finance Teams Like Boats)</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                When compared to traditional venues, a corporate Lake Travis party boat often delivers 
                higher perceived value at similar or lower cost.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {costComparison.map((venue, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className={`h-full ${index === 2 ? 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {index === 2 && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                        {venue.venue}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{venue.items}</p>
                      <p className={`text-sm font-semibold ${index === 2 ? 'text-green-600' : 'text-red-500'}`}>
                        {venue.hidden}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety, Compliance, and Professionalism */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-slate-800 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-white text-blue-700">PROFESSIONALISM</Badge>
                <h2 className="text-3xl font-bold mb-4">Safety, Compliance, and Professionalism</h2>
                <p className="text-lg text-white/80 max-w-3xl mx-auto">
                  This is where Premier Party Cruises stands apart. Every corporate event includes:
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {safetyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex items-center gap-3 bg-white/10 rounded-full py-3 px-6"
                  >
                    <feature.icon className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-semibold">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ideal Corporate Event Formats */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">CRUISE OPTIONS</Badge>
              <h2 className="text-3xl font-bold mb-4">Ideal Corporate Event Formats on the Water</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                All formats benefit from the same core advantage: shared experience without distraction.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {eventFormats.map((format, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className={`h-full border-t-4 ${format.color}`}>
                    <CardHeader>
                      <CardTitle className="text-xl">{format.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-3">Best for:</p>
                      <ul className="space-y-2">
                        {format.bestFor.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">FAQs – Corporate Boat Parties in Austin</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about hosting corporate events on Lake Travis
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border px-6"
                  data-testid={`accordion-faq-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Boats Beat Ballrooms
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                If your goal is engagement, memorability, participation, and simplicity—a corporate 
                Lake Travis party boat is one of the most effective venues available in Austin.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/corporate-events">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6" data-testid="button-final-corporate">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Plan Corporate Event
                  </Button>
                </Link>
                <Link href="/private-boat-rentals">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-final-private">
                    <Ship className="mr-2 h-5 w-5" />
                    Private Boat Rentals
                  </Button>
                </Link>
                <Link href="/atx-disco-cruise">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-final-disco">
                    <Music className="mr-2 h-5 w-5" />
                    ATX Disco Cruise
                  </Button>
                </Link>
              </div>

              <div className="pt-6 border-t border-white/20">
                <a href="tel:5127270422" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
                  <Phone className="h-5 w-5" />
                  <span className="font-semibold">(512) 727-0422</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
