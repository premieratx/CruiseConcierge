import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Laptop,
  Rocket, Code, Zap, Monitor, Coffee, PartyPopper
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-2_1760072938923.jpg';
import sectionImage1 from '@assets/@capitalcityshots-16_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-17_1760080740020.jpg';
import sectionImage3 from '@assets/@capitalcityshots-18_1760080740021.jpg';
import sectionImage4 from '@assets/@capitalcityshots-19_1760080740021.jpg';

const techBenefits = [
  { 
    icon: Monitor, 
    title: 'Escape From Screens', 
    description: 'Give your tech company party Austin team a digital detox on the water',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Users, 
    title: 'Real Team Bonding', 
    description: 'Build connections beyond Slack channels at your startup team building Lake Travis event',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Rocket, 
    title: 'Unique Venue', 
    description: 'Stand out from typical Austin tech event boat venues and conference rooms',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Zap, 
    title: 'Boost Morale', 
    description: 'Celebrate wins and recharge your team with a corporate tech outing Lake Travis experience',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  }
];

const techEventTypes = [
  {
    title: 'Sprint Celebrations',
    description: 'Reward your team after crushing quarterly goals',
    features: [
      'Perfect for agile teams finishing big projects',
      'Celebrate product launches on the water',
      'Ideal for 14-75 person teams',
      'Flexible 3+ hour cruise times'
    ]
  },
  {
    title: 'Product Launch Parties',
    description: 'Toast your latest release in style',
    features: [
      'Unforgettable launch celebration venue',
      'Private cruise for your entire team',
      'BYOB with catering coordination',
      'Perfect Austin tech event boat experience'
    ]
  },
  {
    title: 'Team Offsites',
    description: 'Get out of the office for strategic planning',
    features: [
      'Break from the usual meeting rooms',
      'Stunning Lake Travis backdrop',
      'Mix work and play seamlessly',
      'Build stronger team connections'
    ]
  },
  {
    title: 'Company Retreats',
    description: 'Annual gatherings your startup team building Lake Travis crew will remember',
    features: [
      'Whole company celebration events',
      'Remote team reunion opportunities',
      'Swimming and water activities',
      'Sunset cruise options available'
    ]
  }
];

const boatOptions = [
  { 
    name: 'Day Tripper', 
    capacity: '14 guests', 
    best: 'Startups & Small Teams',
    description: 'Perfect for early-stage startups planning a tech company party Austin style. Intimate setting for your core engineering team or founding crew.',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    name: 'Meeseeks', 
    capacity: '25 guests', 
    best: 'Growing Teams',
    description: 'Ideal for Series A companies ready for startup team building Lake Travis adventures. Great for department-level events or cross-functional teams.',
    color: 'from-green-500 to-green-600'
  },
  { 
    name: 'Clever Girl', 
    capacity: '50 guests', 
    best: 'Larger Organizations',
    description: 'Built for established tech companies hosting an Austin tech event boat celebration. Room for your whole engineering org or product team.',
    color: 'from-purple-500 to-purple-600'
  },
  { 
    name: 'The Irony', 
    capacity: '75 guests', 
    best: 'Enterprise Events',
    description: 'Our largest vessel for corporate tech outing Lake Travis all-hands meetings. Perfect for company-wide celebrations and major milestones.',
    color: 'from-amber-500 to-amber-600'
  }
];

const techEventExamples = [
  {
    title: 'Engineering Team Sprint Party',
    description: 'A local SaaS company celebrated their successful product launch with a sunset cruise. The team enjoyed swimming, floating on lily pads, and toasting their hard work.',
    result: 'Team reported highest engagement scores in quarterly survey'
  },
  {
    title: 'Startup Funding Celebration',
    description: 'A recently funded Austin startup hosted their Series A celebration on Lake Travis. Founders, investors, and the entire team came together for an unforgettable tech company party Austin style.',
    result: 'Event became annual tradition for milestone celebrations'
  },
  {
    title: 'Remote Team Reunion',
    description: 'A distributed tech company flew their remote employees to Austin for a corporate tech outing Lake Travis experience. First in-person meetup in 18 months.',
    result: 'Improved collaboration and communication across teams'
  },
  {
    title: 'Product Launch Party',
    description: 'A B2B software company celebrated their major product release with an Austin tech event boat party. The whole product and engineering team celebrated their launch together.',
    result: 'Boosted team morale during intense development period'
  }
];

const whyTechTeamsChooseLakeTravis = [
  { stat: '3+ Hours', label: 'Unplugged Team Time' },
  { stat: '14-75', label: 'Guest Capacity Options' },
  { stat: '100%', label: 'Private Experience' },
  { stat: '5-Star', label: 'Google Reviews' }
];

const faqs = [
  {
    question: 'Is there WiFi on the boats for our tech company party Austin event?',
    answer: 'Our boats do not have WiFi, and that is actually a feature! Tech teams tell us they appreciate the chance to unplug and connect in person. For startup team building Lake Travis events, the focus is on real human interaction rather than screens. If you absolutely need connectivity for a brief presentation, mobile hotspots work on most of the lake.'
  },
  {
    question: 'Can we do a presentation or demo during the cruise?',
    answer: 'While we do not have presentation equipment on board, many tech teams find creative solutions. Some bring tablets for small group demos, while others save the presentations for before or after the cruise. The Austin tech event boat experience is really about celebration and bonding rather than work.'
  },
  {
    question: 'What size boat works best for a startup team building Lake Travis event?',
    answer: "It depends on your team size! Our Day Tripper (14 guests) is perfect for small startups and core teams. The Meeseeks (25 guests) works great for department outings. For larger corporate tech outing Lake Travis events, our Clever Girl (50-75 guests, add'l crew fee for 51-75) provides plenty of space."
  },
  {
    question: 'How far in advance should tech companies book?',
    answer: 'We recommend booking 2-4 weeks ahead for your tech company party Austin event. End-of-quarter celebrations and product launch timing often align with popular dates, so earlier is better. During peak season (April-October), 3-4 weeks advance booking is ideal.'
  },
  {
    question: 'Can we bring our own food and drinks for the startup team building event?',
    answer: 'Absolutely! All our private cruises are BYOB. Many tech companies work with local Austin caterers or simply bring pizzas and snacks. We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), cups, and can help coordinate delivery with Party On Delivery for beverages.'
  },
  {
    question: 'What activities work well for tech team bonding on the water?',
    answer: 'The lake itself provides the activities! Teams love swimming, floating on our giant lily pad floats, and simply relaxing together. Many engineering teams tell us the unstructured time leads to the best conversations. No icebreakers or forced team building exercises needed – just good vibes on Lake Travis.'
  },
  {
    question: 'Is a boat party appropriate for a company-wide event?',
    answer: 'Definitely! Our larger boats accommodate up to 75 guests, making them perfect for Austin tech event boat all-hands celebrations. Many companies book multiple boats for larger headcounts. Its a unique venue that employees actually want to attend.'
  },
  {
    question: 'What about weather cancellations for our corporate tech outing Lake Travis event?',
    answer: 'Safety is our priority. If weather forces a cancellation, we offer full rescheduling or refunds. We monitor conditions closely and communicate proactively. Most tech teams appreciate the flexibility to reschedule rather than risk a poor experience.'
  }
];

export default function TechCompaniesBoatPartiesAustin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/tech-companies-boat-parties-austin"
        defaultTitle="Tech Companies on Deck – Why Austin's Tech Industry Loves Boat Parties | Lake Travis"
        defaultDescription="Plan the perfect tech company party Austin on Lake Travis. Startup team building, product launches, and corporate tech outings. Private boat charters for 14-75 guests. Book your Austin tech event boat today!"
        defaultKeywords={['tech company party Austin', 'startup team building Lake Travis', 'Austin tech event boat', 'corporate tech outing Lake Travis', 'tech team building Austin', 'startup party boat Austin', 'tech company celebration Lake Travis']}
        image="https://premierpartycruises.com/attached_assets/@capitalcityshots-2_1760072938923.jpg"
      />

      <BlogV2Layout
        title="Tech Companies on Deck – Why Austin's Tech Industry Loves Boat Parties | Lake Travis"
        description="Plan the perfect tech company party Austin on Lake Travis. Startup team building, product launches, and corporate tech outings. Private boat charters for 14-75 guests. Book your Austin tech event boat today!"
        slug="tech-companies-boat-parties-austin"
        category="Corporate Guides"
        categoryHref="/corporate-events"
        pillarTitle="Austin Corporate Events Guide"
        pillarHref="/corporate-events"
        relatedArticles={[
          { title: "Finance & Law Firms Boat Parties", href: "/blogs/finance-law-firms-boat-parties-austin" },
          { title: "Marketing & Creative Agencies Boat", href: "/blogs/marketing-creative-agencies-boat-austin" },
          { title: "Small Business Boat Parties Austin", href: "/blogs/small-business-boat-parties-austin" },
        ]}
      >
      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="page-tech-companies-boat-parties">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-indigo-900 via-purple-800 to-slate-900 text-white overflow-hidden"
          data-testid="section-hero"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Tech Companies on Deck – Why Austin's Tech Industry Loves Boat Parties - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-purple-600 font-bold" data-testid="badge-tech-industry">
              <Code className="mr-2 h-4 w-4" />
              AUSTIN TECH INDUSTRY EVENTS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="heading-main">
              Tech Companies on Deck
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Why Austin's Tech Industry Loves Boat Parties
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              From startup team building Lake Travis adventures to corporate tech outing Lake Travis celebrations, 
              tech teams are discovering the power of unplugging on the water.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-purple-600 font-bold text-lg px-8 py-6" data-testid="button-plan-event">
                  <Laptop className="mr-2 h-5 w-5" />
                  Plan Your Tech Company Party Austin
                </Button>
              </Link>
              <Link href="/team-building">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-packages">
                  View Team Building Packages
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


        {/* Why Tech Teams Love Boat Parties */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-benefits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-why-tech-loves">Why Tech Teams Love Boat Parties</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Your tech company party Austin event should be as innovative as your products. 
                Escape the conference room and celebrate on Lake Travis.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techBenefits.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-purple-200" data-testid={`card-benefit-${index}`}>
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
        <section className="py-12 bg-gradient-to-r from-purple-900 to-indigo-900 text-white" data-testid="section-stats">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whyTechTeamsChooseLakeTravis.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  data-testid={`stat-${index}`}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400">{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-event-types">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-700">PERFECT FOR TECH TEAMS</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-perfect-for">Austin Tech Event Boat Experiences</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Whether you are celebrating a successful sprint, launching a new product, or bringing your remote team together, 
                    Lake Travis provides the perfect backdrop for your startup team building Lake Travis event.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {techEventTypes.map((event, index) => (
                      <Card key={index} className="bg-white/80" data-testid={`card-event-type-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{event.description}</p>
                          <ul className="space-y-1">
                            {event.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-purple-600 flex items-center gap-1">
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
                      alt="Startup team building Lake Travis boat party with tech professionals celebrating"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Rocket className="h-8 w-8 text-purple-500" />
                      <div>
                        <p className="font-bold text-sm">Launch Parties</p>
                        <p className="text-xs text-gray-500">Celebrate big wins</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Boat Options for Tech Teams */}
        <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-800 to-slate-900 text-white" data-testid="section-boat-options">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-yellow-400 text-black">BOATS FOR EVERY TEAM SIZE</Badge>
                <h2 className="text-3xl font-bold mb-4" data-testid="heading-boat-options">Boat Options for Tech Teams</h2>
                <p className="text-lg text-white/90 max-w-3xl mx-auto">
                  From seed-stage startups to enterprise companies, we have the right corporate tech outing Lake Travis vessel for your team.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {boatOptions.map((boat, index) => (
                  <m.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                  >
                    <Card className="h-full bg-white/10 border-white/20 text-white" data-testid={`card-boat-${index}`}>
                      <CardHeader className="pb-2">
                        <div className={`w-full h-2 rounded-full bg-gradient-to-r ${boat.color} mb-2`} />
                        <CardTitle className="text-white">{boat.name}</CardTitle>
                        <p className="text-yellow-400 font-semibold">{boat.capacity}</p>
                        <p className="text-white/70 text-sm">{boat.best}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white/80 text-sm">{boat.description}</p>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link href="/private-cruises">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold" data-testid="button-view-fleet">
                    <Ship className="mr-2 h-5 w-5" />
                    View Our Full Fleet
                  </Button>
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        {/* How Premier Accommodates Tech Needs */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-accommodations">
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
                      alt="Austin tech event boat corporate team enjoying Lake Travis sunset cruise"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-green-100 text-green-700">TECH-FRIENDLY EXPERIENCE</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-accommodations">How We Accommodate Tech Teams</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    We understand the unique needs of tech company party Austin events. While we encourage unplugging, 
                    we are flexible and work with each team to create their ideal experience.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Flexible scheduling around sprint cycles and deadlines',
                      'BYOB with local catering coordination available',
                      'Private charter – no strangers, just your team',
                      'Mobile hotspot-friendly (cell coverage on most of the lake)',
                      'Giant lily pad floats for team photos',
                      'Premium sound system for your playlist',
                      'Sunset cruise timing for that perfect golden hour',
                      'Free parking at the marina for your whole team'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/client-entertainment">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold" data-testid="button-client-entertainment">
                      <Briefcase className="mr-2 h-5 w-5" />
                      View Client Entertainment Options
                    </Button>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Case Examples Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-case-examples">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-case-examples">Tech Events We Have Hosted</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Real examples of how Austin tech companies use our boats for memorable corporate tech outing Lake Travis team experiences
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {techEventExamples.map((example, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-case-${index}`}>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <PartyPopper className="h-5 w-5 text-purple-500" />
                        <CardTitle className="text-lg">{example.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{example.description}</p>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                          <Trophy className="h-4 w-4" />
                          <span className="font-semibold">Result:</span> {example.result}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-gallery">See Tech Teams in Action</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From startup team building Lake Travis events to enterprise celebrations, our boats create unforgettable experiences
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={sectionImage3}
                  alt="Corporate tech outing Lake Travis team bonding on Premier Party Cruises boat"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={sectionImage4}
                  alt="Tech company party Austin celebration with team swimming and relaxing on Lake Travis"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="section-faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-faq">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about tech company party Austin and startup team building Lake Travis events
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border px-6"
                  data-testid={`faq-item-${index}`}
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

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-900 to-purple-900 text-white" data-testid="section-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-cta">
                Ready to Plan Your Tech Company Party Austin?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Get a custom quote for your startup team building Lake Travis event. 
                We will help you pick the right boat and plan every detail.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6" data-testid="button-get-quote">
                    <Laptop className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Button>
                </Link>
                <a href="tel:5124885892">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-call">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 488-5892
                  </Button>
                </a>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link href="/team-building">
                  <Button variant="link" className="text-white/80 hover:text-white" data-testid="link-team-building">
                    Team Building Packages <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/client-entertainment">
                  <Button variant="link" className="text-white/80 hover:text-white" data-testid="link-client-entertainment">
                    Client Entertainment <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/private-cruises">
                  <Button variant="link" className="text-white/80 hover:text-white" data-testid="link-private-cruises">
                    Private Cruises <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/corporate-events">
                  <Button variant="link" className="text-white/80 hover:text-white" data-testid="link-corporate-events">
                    Corporate Events <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </m.div>
          </div>
        </section>

      </div>
      </BlogV2Layout>
    </>
    </LazyMotionProvider>
  );
}
