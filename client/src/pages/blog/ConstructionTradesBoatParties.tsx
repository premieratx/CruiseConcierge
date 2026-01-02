import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, HardHat, Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-7_1760080740018.jpg';
import sectionImage1 from '@assets/@capitalcityshots-8_1760080740018.jpg';
import sectionImage2 from '@assets/@capitalcityshots-9_1760080740019.jpg';
import sectionImage3 from '@assets/@capitalcityshots-10_1760080740019.jpg';
import sectionImage4 from '@assets/@capitalcityshots-11_1760080740019.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const tradesBenefits = [
  { 
    icon: HardHat, 
    title: 'Crew Recognition', 
    description: 'Reward your hardworking construction crew with an unforgettable day on Lake Travis',
    color: 'text-orange-600',
    bg: 'bg-orange-100'
  },
  { 
    icon: Target, 
    title: 'Safety Milestone Rewards', 
    description: 'Celebrate zero-incident records with trades team building Lake Travis style',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Trophy, 
    title: 'Project Completion', 
    description: 'Mark the end of a major build with a memorable construction company party Austin style',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Handshake, 
    title: 'Team Unity', 
    description: 'Book a manufacturing team outing Austin to build stronger bonds between crews',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  }
];

const eventTypes = [
  {
    title: 'Project Completion Celebrations',
    description: 'Celebrate finishing a major construction project',
    features: [
      'Private boat charter for your crew',
      'BYOB - bring your coolers and food',
      'Swimming and water activities',
      'Perfect for crews of 14-75'
    ]
  },
  {
    title: 'Safety Milestone Rewards',
    description: 'Recognize teams that prioritize safety',
    features: [
      'Reward zero-incident records',
      'Celebrate OSHA compliance wins',
      'Build safety-first culture',
      'Trades team building Lake Travis'
    ]
  },
  {
    title: 'Crew Appreciation Days',
    description: 'Show your workers they matter',
    features: [
      'Manufacturing team outing Austin',
      'Blue collar team event Lake Travis',
      'Family-friendly options available',
      'Year-end celebration cruises'
    ]
  },
  {
    title: 'Company Anniversaries',
    description: 'Mark business milestones in style',
    features: [
      'Celebrate years in business',
      'Include clients and partners',
      'Construction company party Austin',
      'Multi-boat options for large groups'
    ]
  }
];

const whyLakeTravis = [
  { stat: '3+ Hours', label: 'On the Water' },
  { stat: '14-75', label: 'Guest Capacity' },
  { stat: 'BYOB', label: 'Bring Your Own' },
  { stat: '5-Star', label: 'Google Reviews' }
];

const faqs = [
  {
    question: 'How many construction workers can your boats hold?',
    answer: 'Our fleet accommodates crews of all sizes. The Day Tripper holds 14 guests perfect for a small crew, Meeseeks and The Irony each fit 25-30, and our flagship Clever Girl handles up to 75 workers. All boats are single-deck party barges with arch canopy and disco balls. Perfect for any construction company party Austin or trades team building Lake Travis event.'
  },
  {
    question: 'Can we bring our own coolers, food and drinks?',
    answer: 'Absolutely! All our private cruises are BYOB. Bring your coolers, your favorite beers, and whatever food your crew loves. We provide the ice and the coolers. This makes it easy for any blue collar team event Lake Travis gathering.'
  },
  {
    question: 'What should construction workers wear on the boat?',
    answer: 'Leave the steel toes at the jobsite! We recommend casual clothes, swimsuits, and comfortable shoes with non-slip soles. Bring sunscreen and sunglasses. This is a day to relax after all those hours on the construction site.'
  },
  {
    question: 'How far in advance should we book our manufacturing team outing Austin?',
    answer: 'For trades team building Lake Travis events and construction company party Austin gatherings, we recommend booking 2-4 weeks ahead. Peak season (spring and summer) books up fast, so the earlier you reach out, the better your options.'
  },
  {
    question: 'Can we celebrate a safety milestone or project completion?',
    answer: 'These are some of our favorite events! Many construction and manufacturing companies use our boats to celebrate reaching safety goals, completing major projects, or company anniversaries. A blue collar team event Lake Travis style is the perfect reward.'
  },
  {
    question: 'Do you accommodate groups from multiple job sites?',
    answer: 'Yes! We often host construction company party Austin events that bring together crews from different projects or locations. It is a great way to build connections between teams who do not usually work side by side.'
  },
  {
    question: 'What water activities can our crew enjoy?',
    answer: 'Your team can swim, float on our giant lily pad floats, and just relax on the water. After long days on construction sites, this is exactly the kind of break your crew deserves. Every manufacturing team outing Austin should include some time to unwind.'
  },
  {
    question: 'What if the weather is bad on our scheduled day?',
    answer: 'Safety is our top priority, just like on your jobsites. If weather forces a cancellation, we offer full rescheduling or refunds. We monitor conditions closely and will contact you ahead of time if there are any concerns.'
  },
  {
    question: 'Is a construction company party Austin appropriate for all crew members?',
    answer: 'Absolutely! Our boats are perfect for mixed groups including office staff, field crews, and management. A manufacturing team outing Austin style on the lake creates neutral ground where everyone can relax and connect regardless of their usual role.'
  },
  {
    question: 'What makes Lake Travis ideal for blue collar team event Lake Travis celebrations?',
    answer: 'Lake Travis offers the perfect escape from dusty jobsites and loud machinery. The beautiful scenery, calm waters, and private atmosphere make it ideal for trades team building Lake Travis experiences where your crew can truly decompress.'
  }
];

const packageOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Small crew outings' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Foreman & crew events' },
  { name: 'The Irony', capacity: '30 guests', best: 'Department celebrations' },
  { name: 'Clever Girl', capacity: '75 guests', best: 'Full company parties' }
];

export default function ConstructionTradesBoatParties() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Construction Company Party Austin | Trades Team Building Lake Travis Boats</title>
        <meta name="description" content="Plan the ultimate construction company party Austin or trades team building Lake Travis event. Manufacturing team outing Austin on private boats. Blue collar team event Lake Travis for crews of 14-75." />
        <meta name="keywords" content="construction company party Austin, trades team building Lake Travis, manufacturing team outing Austin, blue collar team event Lake Travis, construction crew celebration, trades worker appreciation" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/construction-trades-boat-parties-austin" />
        <meta property="og:title" content="Construction Company Party Austin | Trades Team Building Lake Travis" />
        <meta property="og:description" content="Book your construction company party Austin or manufacturing team outing Austin. Private boat charters for trades team building Lake Travis events." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="construction-trades-blog-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-orange-900 via-amber-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-orange-600 font-bold">
              CONSTRUCTION & TRADES EVENTS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Construction, Manufacturing & Trades –<br />Building Stronger Teams on Lake Travis
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Your Crew Works Hard. Reward Them with a Day They Will Remember.
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              From project completion celebrations to safety milestone rewards, give your trades team the recognition they deserve with a construction company party Austin style on Lake Travis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-100 text-orange-600 font-bold text-lg px-8 py-6"
                  data-testid="button-plan-event"
                >
                  <HardHat className="mr-2 h-5 w-5" />
                  Plan Your Crew Event
                </Button>
              </Link>
              <Link href="/team-building">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                  data-testid="button-team-building"
                >
                  View Team Building Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Why Construction Teams Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="benefits-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Construction & Trades Teams Deserve a Day on the Water</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Your crew builds things that last. Reward them with an experience that creates lasting memories. A trades team building Lake Travis event is the perfect way to show appreciation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tradesBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-orange-200" data-testid={`card-benefit-${index}`}>
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
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-orange-900 text-white" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whyLakeTravis.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400">{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900" data-testid="event-types-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-orange-100 text-orange-700">PERFECT FOR</Badge>
                  <h2 className="text-3xl font-bold mb-6">Events We Host for Construction & Manufacturing</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Whether you are celebrating a project completion, rewarding safety achievements, or just giving your crew a well-deserved break, our boats are the perfect venue for any blue collar team event Lake Travis. 
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {eventTypes.map((event, index) => (
                      <Card key={index} className="bg-white/80" data-testid={`card-event-type-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{event.description}</p>
                          <ul className="space-y-1">
                            {event.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-orange-600 flex items-center gap-1">
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
                      alt="Manufacturing team outing Austin boat party celebration trades workers Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-8 w-8 text-orange-500" />
                      <div>
                        <p className="font-bold text-sm">Private Charters</p>
                        <p className="text-xs text-gray-500">Your crew only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Relaxed Environment Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="relaxed-environment-section">
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
                      alt="Blue collar team event Lake Travis relaxed boat atmosphere construction crew"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-green-100 text-green-700">A DIFFERENT KIND OF BREAK</Badge>
                  <h2 className="text-3xl font-bold mb-6">A Relaxed Environment Away from Job Sites</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    No hard hats required. No deadlines to meet. Just your crew, cold drinks, and the beautiful waters of Lake Travis. Book your blue collar team event Lake Travis today. This is where real team bonds are built – away from the noise of machinery and the pressure of production schedules.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    A manufacturing team outing Austin style on our boats gives your workers something they cannot get on the jobsite: genuine relaxation and time to connect as people, not just coworkers.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'No steel toes or safety vests required',
                      'Swimming, floating, and water activities',
                      "BYOB – bring the crew's favorite drinks",
                      'Giant lily pad floats for relaxation',
                      'Premium sound system for music',
                      'Scenic Lake Travis views'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/private-cruises">
                    <Button 
                      size="lg" 
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
                      data-testid="button-view-cruises"
                    >
                      <Ship className="mr-2 h-5 w-5" />
                      View Private Cruises
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-gradient-to-br from-orange-900 via-amber-800 to-slate-900 text-white" data-testid="boat-options-section">
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
                      src={sectionImage3}
                      alt="Construction company party Austin boat fleet options trades team building"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">BOAT OPTIONS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Boats for Every Crew Size</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Whether you have a small specialty crew or a large construction company party Austin gathering, we have the right boat. Each vessel is private – just your team enjoying the lake together.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {packageOptions.map((boat, index) => (
                      <Card key={index} className="bg-white/10 border-white/20" data-testid={`card-boat-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-white">{boat.name}</h4>
                          <p className="text-yellow-400 text-sm">{boat.capacity}</p>
                          <p className="text-white/70 text-xs mt-1">{boat.best}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Link href="/corporate-events">
                    <Button 
                      size="lg" 
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold"
                      data-testid="button-corporate-events"
                    >
                      <Building2 className="mr-2 h-5 w-5" />
                      Corporate Event Options
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="whats-included-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">WHAT'S INCLUDED</Badge>
                  <h2 className="text-3xl font-bold mb-6">Everything Your Crew Needs</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    We handle the boat, crew, and equipment. You bring your team and the refreshments. It is that simple for any trades team building Lake Travis event or blue collar team event Lake Travis celebration.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Private boat charter (3+ hours)',
                      'Professional captain and crew',
                      'Premium Bluetooth sound system',
                      'Giant lily pad floats for swimming',
                      'Coolers and ice provided',
                      'BYOB - bring food and drinks',
                      'Flexible departure times',
                      'Free parking at the marina'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/chat">
                    <Button 
                      size="lg" 
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
                      data-testid="button-get-quote"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Get a Quote for Your Crew
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage4}
                      alt="Trades team building Lake Travis boat amenities manufacturing team celebration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-8 w-8 text-orange-500" />
                      <div>
                        <p className="font-bold text-sm">All-Inclusive</p>
                        <p className="text-xs text-gray-500">No hidden fees</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Planning Tips Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900" data-testid="planning-tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Planning Tips for Your Construction Company Party Austin</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Make your blue collar team event Lake Travis a success with these tips
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Book Ahead',
                  tips: [
                    'Reserve 2-4 weeks early',
                    'Peak season fills fast',
                    'Get the boat that fits your crew',
                    'More notice = more options'
                  ]
                },
                {
                  title: 'Plan the Food',
                  tips: [
                    'BBQ and finger foods work great',
                    'Bring plenty of water',
                    'Pack coolers with ice',
                    'Easy-to-eat items are best'
                  ]
                },
                {
                  title: 'Keep It Simple',
                  tips: [
                    'No formal agenda needed',
                    'Let the crew relax naturally',
                    'Swimming is always popular',
                    'Good music sets the mood'
                  ]
                },
                {
                  title: 'What to Wear',
                  tips: [
                    'Casual clothes and swimsuits',
                    'Non-slip shoes recommended',
                    'Sunscreen is a must',
                    'Leave the work boots at home'
                  ]
                },
                {
                  title: 'Activities',
                  tips: [
                    'Swimming and floating',
                    'Music and conversation',
                    'Taking photos',
                    'Just relaxing on deck'
                  ]
                },
                {
                  title: 'Communication',
                  tips: [
                    'Share details with the crew',
                    'Confirm headcount early',
                    'Send parking directions',
                    'Set clear meeting times'
                  ]
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-planning-tip-${index}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
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

        {/* Internal Links Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="related-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Event Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Whether you are planning a manufacturing team outing Austin or another corporate gathering, we have options for you
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/team-building">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-200" data-testid="link-team-building">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                    <h3 className="font-bold text-lg mb-2">Team Building</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Build stronger teams with blue collar team event Lake Travis cruises</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/client-entertainment">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-200" data-testid="link-client-entertainment">
                  <CardContent className="p-6 text-center">
                    <Handshake className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-bold text-lg mb-2">Client Entertainment</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Impress clients at your manufacturing team outing Austin event</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/private-cruises">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-200" data-testid="link-private-cruises">
                  <CardContent className="p-6 text-center">
                    <Ship className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h3 className="font-bold text-lg mb-2">Private Cruises</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manufacturing team outing Austin on exclusive boat rentals</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/corporate-events">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-200" data-testid="link-corporate-events">
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="font-bold text-lg mb-2">Corporate Events</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Full corporate event solutions</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">FAQs About Construction & Trades Events</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about booking a construction company party Austin or trades team building Lake Travis event
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-orange-900 to-slate-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Reward Your Crew?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Get a custom quote for your manufacturing team outing Austin or construction company party Austin. We will help you plan the perfect blue collar team event Lake Travis celebration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6"
                    data-testid="button-cta-quote"
                  >
                    <HardHat className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Button>
                </Link>
                <a href="tel:5127270422">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                    data-testid="button-cta-call"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 727-0422
                  </Button>
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
