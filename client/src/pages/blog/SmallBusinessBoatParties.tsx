import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, DollarSign,
  Heart, Sparkles, PartyPopper, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/day-tripper-14-person-boat.webp';
import sectionImage1 from '@assets/meeseeks-1_1763968010088.jpg';
import sectionImage2 from '@assets/meeseeks-2_1763968010089.jpg';
import sectionImage3 from '@assets/day-tripper-14-person-boat.jpg';
import sectionImage4 from '@assets/meeseeks-3 lake travis party boat_1763968010089.jpg';

const smallBusinessBenefits = [
  { 
    icon: DollarSign, 
    title: 'Budget-Friendly', 
    description: 'Affordable small business party Austin options that fit startup budgets without sacrificing quality',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Heart, 
    title: 'Intimate Setting', 
    description: 'Small company event boat Austin experiences where every team member feels valued',
    color: 'text-pink-600',
    bg: 'bg-pink-100'
  },
  { 
    icon: TrendingUp, 
    title: 'Team Growth', 
    description: 'Startup team building Lake Travis activities that strengthen bonds and boost morale',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Sparkles, 
    title: 'Memorable', 
    description: 'Entrepreneur celebration Lake Travis moments your team will talk about for years',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  }
];

const celebrationTypes = [
  {
    title: 'Company Milestones',
    description: 'Celebrate first funding rounds, product launches, or anniversaries',
    features: [
      'Perfect for small business party Austin celebrations',
      'Intimate atmosphere for meaningful moments',
      'Photo opportunities on the lake',
      'Customize your celebration'
    ]
  },
  {
    title: 'Quarterly Celebrations',
    description: 'Reward your team for hitting goals every quarter',
    features: [
      'Regular startup team building Lake Travis events',
      'Build consistent team culture',
      'Affordable recurring packages',
      'Keep morale high year-round'
    ]
  },
  {
    title: 'Client Appreciation',
    description: 'Thank your best clients with an unforgettable experience',
    features: [
      'Small company event boat Austin hosting',
      'Impress without overwhelming',
      'Personal touch clients remember',
      'Strengthen business relationships'
    ]
  },
  {
    title: 'Team Rewards',
    description: 'Recognize hard work with experiences over things',
    features: [
      'Entrepreneur celebration Lake Travis style',
      'Better than gift cards',
      'Creates shared memories',
      'Shows you value your team'
    ]
  }
];

const statsData = [
  { stat: '14-30', label: 'Perfect Guest Count for Small Teams' },
  { stat: '3+ Hours', label: 'Cruise Duration Options' },
  { stat: 'BYOB', label: 'Budget-Friendly Catering' },
  { stat: '5-Star', label: 'Google Review Rating' }
];

const faqs = [
  {
    question: 'What is the minimum group size for a small business party Austin boat rental?',
    answer: 'We welcome groups as small as 8-10 people for a small business party Austin experience. Our Day Tripper boat is perfect for teams of 14 or fewer, offering an intimate startup team building Lake Travis atmosphere. Every small company event boat Austin charter is completely private, so you get the whole boat even with a smaller group.'
  },
  {
    question: 'How much does a small company event boat Austin rental cost?',
    answer: 'Our small business party Austin packages start at competitive rates designed for startups and small companies. The Day Tripper (14 guests) and Meeseeks (25-30 guests) are our most popular entrepreneur celebration Lake Travis options. Contact us for specific pricing based on your group size and preferred date.'
  },
  {
    question: 'Can we bring our own food and drinks for our startup team building Lake Travis event?',
    answer: 'Absolutely! All our small company event boat Austin cruises are BYOB. This is one of the biggest cost savings for small business party Austin events. Bring your own catering, snacks, and beverages. We provide coolers and ice to keep everything cold during your entrepreneur celebration Lake Travis cruise.'
  },
  {
    question: 'Which boat is best for a small startup team?',
    answer: 'For teams under 15 people, our Day Tripper is ideal for startup team building Lake Travis activities. If your small business party Austin group is 15-30 people, the Meeseeks offers the perfect balance of space and intimacy. Both boats are great for small company event boat Austin experiences.'
  },
  {
    question: 'How far in advance should we book an entrepreneur celebration Lake Travis cruise?',
    answer: 'For small business party Austin events, we recommend booking 2-3 weeks in advance. Popular weekend dates fill quickly, especially for startup team building Lake Travis activities during spring and fall. Weekday cruises often have more availability for small company event boat Austin rentals.'
  },
  {
    question: 'What activities can we do during our small business boat party?',
    answer: 'During your entrepreneur celebration Lake Travis cruise, your team can swim in the lake, float on our giant lily pad floats, enjoy music on our premium sound system, and simply relax together. Many small business party Austin groups use the time for informal team discussions, networking, or just celebrating their wins together.'
  },
  {
    question: 'Is a boat party good for remote teams meeting in person?',
    answer: 'Yes! Startup team building Lake Travis cruises are perfect for remote teams gathering in Austin. The small company event boat Austin setting removes distractions and creates natural opportunities for connection. Many entrepreneur celebration Lake Travis events are specifically for teams that rarely see each other in person.'
  },
  {
    question: 'What if the weather is bad on our scheduled small business party Austin date?',
    answer: 'Safety is our top priority. If weather forces a cancellation of your startup team building Lake Travis event, we offer full rescheduling or refunds. We monitor conditions closely and will contact you in advance if there are any concerns about your small company event boat Austin booking.'
  }
];

const boatOptions = [
  { 
    name: 'Day Tripper', 
    capacity: '14 guests', 
    best: 'Startups & small teams',
    description: 'Perfect for intimate small business party Austin gatherings'
  },
  { 
    name: 'Meeseeks', 
    capacity: '25-30 guests', 
    best: 'Growing companies',
    description: 'Ideal for startup team building Lake Travis events'
  }
];

export default function SmallBusinessBoatParties() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/small-business-boat-parties-austin"
        defaultTitle="Small Business Boat Parties Austin | Startup Team Building Lake Travis | Premier Party Cruises"
        defaultDescription="Plan the perfect small business party Austin on Lake Travis. Affordable startup team building, entrepreneur celebrations, and small company event boat rentals for teams under 50 people."
        defaultKeywords={['small business party Austin', 'startup team building Lake Travis', 'small company event boat Austin', 'entrepreneur celebration Lake Travis', 'small team boat rental Austin', 'company party Lake Travis']}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="small-business-boat-parties-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Small Business Boat Parties Austin - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-emerald-600 font-bold" data-testid="badge-small-business">
              SMALL BUSINESS CELEBRATIONS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Small Business Boat Parties for Companies Under 50 People
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Affordable Startup Team Building Lake Travis Experiences
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Celebrate your wins, reward your team, and build culture with a small business party Austin your company will never forget.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-100 text-emerald-600 font-bold text-lg px-8 py-6"
                  data-testid="button-plan-small-business-event"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your Small Business Event
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                  data-testid="button-view-boat-options"
                >
                  View Boat Options
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
            See our complete guide to{' '}
            <Link href="/corporate-events" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin corporate event boats</Link>{' '}
            for team building, client entertainment, and company celebrations on Lake Travis.
          </p>
        </div>
      </div>


        {/* Why Small Businesses Love Boat Parties */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="benefits-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Small Businesses Love Boat Parties</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A small business party Austin on Lake Travis offers something office parties and restaurants can't match – 
                an intimate, memorable experience where every team member matters.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {smallBusinessBenefits.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-emerald-200" data-testid={`benefit-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${item.bg} rounded-full flex items-center justify-center`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-emerald-900 text-white" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {statsData.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400">{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900" data-testid="celebration-types-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-emerald-100 text-emerald-700">PERFECT FOR YOUR BUSINESS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Celebrations Made for Small Businesses</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Whether you're a 10-person startup or a growing 40-person company, our small company event boat Austin 
                    experiences are designed for intimate gatherings where relationships deepen and memories are made. 
                    A startup team building Lake Travis cruise creates the perfect environment for authentic connection.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {celebrationTypes.map((event, index) => (
                      <Card key={index} className="bg-white/80" data-testid={`celebration-type-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{event.description}</p>
                          <ul className="space-y-1">
                            {event.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Small business team celebrating entrepreneur milestone Lake Travis Austin startup event"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <PartyPopper className="h-8 w-8 text-emerald-500" />
                      <div>
                        <p className="font-bold text-sm">Entrepreneur Celebrations</p>
                        <p className="text-xs text-gray-500">Every win matters</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Budget-Friendly Options */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="budget-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
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
                      alt="Affordable startup team building Lake Travis small business party boat Austin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-green-100 text-green-700">STARTUP-FRIENDLY PRICING</Badge>
                  <h2 className="text-3xl font-bold mb-6">Budget-Friendly Options for Startups</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    We understand that startups and small businesses watch every dollar. That's why our small business party Austin 
                    packages are designed to deliver maximum impact without breaking the bank. With our BYOB policy, you control 
                    your food and drink costs, making an entrepreneur celebration Lake Travis more affordable than most venue rentals.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'BYOB policy saves hundreds on bar costs',
                      'No hidden fees or surprise charges',
                      'Weekday discounts for flexible teams',
                      'Package deals for recurring quarterly events',
                      'Small group rates for teams under 15',
                      'All-inclusive pricing with captain and crew'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/chat">
                    <Button 
                      size="lg" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                      data-testid="button-get-startup-quote"
                    >
                      <DollarSign className="mr-2 h-5 w-5" />
                      Get a Startup-Friendly Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Boat Options for Small Teams */}
        <section className="py-16 bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 text-white" data-testid="boat-options-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-yellow-400 text-black">BOATS FOR SMALL TEAMS</Badge>
                  <h2 className="text-3xl font-bold mb-6">The Right Size for Your Small Business</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    You don't need a 75-person party boat for your small business party Austin event. Our Day Tripper and 
                    Meeseeks boats are perfect for startup team building Lake Travis activities, offering intimate spaces 
                    where everyone can connect without feeling lost in a crowd.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {boatOptions.map((boat, index) => (
                      <Card key={index} className="bg-white/10 border-white/20" data-testid={`boat-option-${index}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-white text-lg">{boat.name}</h4>
                              <p className="text-yellow-400">{boat.capacity}</p>
                              <p className="text-white/70 text-sm mt-1">{boat.description}</p>
                            </div>
                            <Badge className="bg-white/20 text-white">{boat.best}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/private-cruises">
                      <Button 
                        size="lg" 
                        className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold"
                        data-testid="button-view-all-boats"
                      >
                        <Ship className="mr-2 h-5 w-5" />
                        View All Boats
                      </Button>
                    </Link>
                    <Link href="/team-building">
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-white text-white hover:bg-white/10"
                        data-testid="button-team-building-packages"
                      >
                        Team Building Packages
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Small company event boat Austin Day Tripper 14 person startup team building"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-8 w-8 text-emerald-500" />
                      <div>
                        <p className="font-bold text-sm">Perfect Fit</p>
                        <p className="text-xs text-gray-500">14-30 guests</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="whats-included-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-emerald-100 text-emerald-700">WHAT'S INCLUDED</Badge>
                  <h2 className="text-3xl font-bold mb-6">Everything Your Small Business Needs</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Every small company event boat Austin rental includes everything you need for an amazing 
                    entrepreneur celebration Lake Travis experience. Focus on celebrating with your team 
                    while we handle all the details.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Private charter (3+ hours on the water)',
                      'Professional captain and crew',
                      'Premium Bluetooth sound system',
                      'Giant lily pad floats for swimming',
                      'Coolers with ice provided',
                      'BYOB – bring your own food and drinks',
                      'Flexible departure times',
                      'Free parking at the marina',
                      'Safety equipment included'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/client-entertainment">
                    <Button 
                      size="lg" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                      data-testid="button-client-entertainment"
                    >
                      <Handshake className="mr-2 h-5 w-5" />
                      Client Entertainment Options
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage4}
                      alt="Startup team building Lake Travis included amenities small business party Austin boat features"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-8 w-8 text-emerald-500" />
                      <div>
                        <p className="font-bold text-sm">All-Inclusive</p>
                        <p className="text-xs text-gray-500">No hidden fees</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900" data-testid="related-services-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Business Event Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From startup team building Lake Travis activities to corporate entertainment, we have the perfect 
                small business party Austin solution for every occasion.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Team Building', href: '/team-building', icon: Users, description: 'Build stronger teams on the water' },
                { title: 'Client Entertainment', href: '/client-entertainment', icon: Handshake, description: 'Impress your best clients' },
                { title: 'Private Cruises', href: '/private-cruises', icon: Ship, description: 'Exclusive boat rentals' },
                { title: 'Corporate Events', href: '/corporate-events', icon: Building2, description: 'Professional business gatherings' }
              ].map((link, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link href={link.href}>
                    <Card className="h-full text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-emerald-300" data-testid={`link-card-${link.title.toLowerCase().replace(' ', '-')}`}>
                      <CardContent className="pt-6">
                        <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                          <link.icon className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{link.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{link.description}</p>
                        <span className="text-emerald-600 font-semibold text-sm flex items-center justify-center gap-1">
                          Learn More <ArrowRight className="h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about planning a small business party Austin or startup team building Lake Travis event.
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg px-6 border"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
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
        <section className="py-16 bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 text-white" data-testid="final-cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Small Business Celebration?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Whether it's a small business party Austin to celebrate a milestone or a startup team building Lake Travis 
                event to reward your team, we're here to make it unforgettable. Get your entrepreneur celebration Lake Travis 
                started with a free quote today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6"
                    data-testid="button-get-free-quote"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Get a Free Quote
                  </Button>
                </Link>
                <a href="tel:5126959386">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                    data-testid="button-call-us"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 695-9386
                  </Button>
                </a>
              </div>
              
              <p className="text-white/70 mt-6 text-sm">
                Perfect for teams of 10-50 | BYOB small company event boat Austin cruises | Flexible scheduling
              </p>
            </m.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}
