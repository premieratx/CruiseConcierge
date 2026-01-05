import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Mountain,
  Coffee, Compass, Globe, Presentation, Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-4_1760080740017.jpg';
import sectionImage1 from '@assets/@capitalcityshots-5_1760080740018.jpg';
import sectionImage2 from '@assets/@capitalcityshots-6_1760080740018.jpg';
import sectionImage3 from '@assets/@capitalcityshots-7_1760080740018.jpg';
import sectionImage4 from '@assets/@capitalcityshots-8_1760080740018.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const whyAustinBenefits = [
  { 
    icon: Globe, 
    title: 'Tech Hub Destination', 
    description: 'Austin is a premier destination for corporate offsite Austin events with world-class amenities',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Mountain, 
    title: 'Scenic Venues', 
    description: 'Host your leadership retreat Lake Travis on stunning waterfront settings away from the office',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Presentation, 
    title: 'Meeting Flexibility', 
    description: 'Perfect for company conference Austin boat experiences that inspire strategic thinking',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Lightbulb, 
    title: 'Creative Environment', 
    description: 'Ideal setting for executive retreat Lake Travis sessions that spark innovation',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const retreatTypes = [
  {
    title: 'Leadership Summits',
    description: 'Strategic planning sessions for executive teams on Lake Travis',
    features: [
      'Private boat charter for focused discussions',
      'Scenic backdrop for vision casting',
      'Away from office distractions',
      'Build executive team cohesion'
    ]
  },
  {
    title: 'Conference Break Activities',
    description: 'Memorable experiences between conference sessions',
    features: [
      'Afternoon cruise excursions',
      'Networking on the water',
      'Refreshing break from conference rooms',
      'Team bonding opportunities'
    ]
  },
  {
    title: 'Multi-Day Retreats',
    description: 'Extended corporate offsite Austin experiences',
    features: [
      'Multiple cruise options',
      'Flexible scheduling',
      'Coordination with hotels',
      'Full event planning support'
    ]
  },
  {
    title: 'Executive Retreats',
    description: 'Exclusive experiences for C-suite and leadership teams',
    features: [
      'Premium private vessels',
      'Confidential meeting space',
      'VIP service throughout',
      'Customizable itineraries'
    ]
  }
];

const austinStats = [
  { stat: '#1', label: 'Tech Hub in Texas' },
  { stat: '300+', label: 'Sunny Days Per Year' },
  { stat: '14-75', label: 'Guest Capacity Range' },
  { stat: '100%', label: 'Private Charter' }
];

const faqs = [
  {
    question: 'Why choose Austin for a corporate offsite Austin event?',
    answer: 'Austin combines a thriving business ecosystem with unique venues like Lake Travis. A corporate offsite Austin experience offers your team world-class dining, entertainment, and outdoor activities. The city\'s innovative culture makes it perfect for leadership retreats and strategic planning sessions.'
  },
  {
    question: 'How does a leadership retreat Lake Travis experience work?',
    answer: 'A leadership retreat Lake Travis cruise gives your executive team a private, distraction-free environment on the water. You\'ll have exclusive use of the boat for strategic discussions, team building, or relaxation. The scenic backdrop and fresh air help foster creative thinking and open communication.'
  },
  {
    question: 'Can we host a company conference Austin boat activity as part of a larger event?',
    answer: 'Absolutely! Many companies use a company conference Austin boat cruise as a highlight activity during multi-day conferences. We can coordinate with your conference schedule for afternoon breaks, evening networking events, or closing celebrations that give attendees a memorable experience.'
  },
  {
    question: 'What makes an executive retreat Lake Travis unique?',
    answer: 'An executive retreat Lake Travis offers something conference rooms cannot: stunning natural scenery, privacy, and a relaxed atmosphere that encourages authentic conversation. Leaders can step away from daily pressures and focus on big-picture strategy while cruising the beautiful Texas Hill Country waters.'
  },
  {
    question: 'How far in advance should we book for a corporate offsite Austin cruise?',
    answer: 'For corporate offsite Austin events, we recommend booking 3-4 weeks ahead, especially during peak seasons (spring and fall). If you\'re coordinating with a larger conference or multi-day retreat, earlier booking ensures we can accommodate your preferred dates and vessel.'
  },
  {
    question: 'What amenities are available for leadership retreat Lake Travis events?',
    answer: 'Our boats for leadership retreat Lake Travis events include premium sound systems, comfortable seating areas for discussions, and covered spaces. All cruises are BYOB, and we can help coordinate catering. The vessels provide the perfect blend of professional setting and relaxed atmosphere.'
  },
  {
    question: 'Can you help plan a multi-day company conference Austin boat experience?',
    answer: 'Yes! For multi-day events, we can arrange multiple cruises, coordinate with local hotels and venues, and help plan your company conference Austin boat activities. Our team understands the logistics of corporate events and can be a valuable planning partner.'
  },
  {
    question: 'What group sizes work best for an executive retreat Lake Travis?',
    answer: 'For intimate executive retreat Lake Travis experiences, our 14-25 person boats are ideal for focused strategy sessions. Larger leadership groups of 50-75 can use our bigger vessels. We\'ll help match the right boat to your group size and meeting objectives.'
  }
];

const boatOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Executive leadership teams' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Department retreats' },
  { name: 'Clever Girl', capacity: '50 guests', best: 'Division offsites' },
  { name: 'Clever Girl', capacity: '50-75 guests', best: 'Company-wide summits' }
];

export default function DestinationAustinOffsiteRetreats() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Destination Austin Off-Site Retreats & Leadership Summits | Lake Travis Corporate Events</title>
        <meta name="description" content="Plan your corporate offsite Austin event or leadership retreat Lake Travis with Premier Party Cruises. Company conference Austin boat experiences and executive retreat Lake Travis options for 14-75 guests." />
        <meta name="keywords" content="corporate offsite Austin, leadership retreat Lake Travis, company conference Austin boat, executive retreat Lake Travis, Austin corporate events, Lake Travis retreat venue" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/destination-austin-offsite-retreats" />
        <meta property="og:title" content="Destination Austin Off-Site Retreats & Leadership Summits | Lake Travis" />
        <meta property="og:description" content="Plan your corporate offsite Austin event with unique leadership retreat Lake Travis experiences. Company conference Austin boat cruises for executive teams." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="page-destination-austin-offsite-retreats">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold" data-testid="badge-corporate-retreats">
              CORPORATE RETREATS & CONFERENCES
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Destination Austin – Off-Site Retreats, Conferences & Leadership Summits
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Transform Your Corporate Offsite Austin Experience on Lake Travis
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Host your next leadership retreat Lake Travis or company conference Austin boat experience in a setting that inspires innovation and connection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6" data-testid="button-plan-retreat">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your Retreat
                </Button>
              </Link>
              <Link href="/corporate-events">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-corporate-options">
                  View Corporate Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Why Austin Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-why-austin">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">DESTINATION CITY</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="title-why-austin">Why Austin for Your Corporate Off-Site</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Austin offers the perfect blend of business infrastructure and unique venues for your corporate offsite Austin event. From world-class dining to stunning Lake Travis settings, your team will experience a retreat like no other.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyAustinBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200" data-testid={`card-benefit-${index}`}>
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
        <section className="py-12 bg-blue-900 text-white" data-testid="section-stats">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {austinStats.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400" data-testid={`stat-value-${index}`}>{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Summits Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-leadership-summits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">EXECUTIVE EXPERIENCES</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="title-leadership-summits">Leadership Summits on the Water</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Your next executive retreat Lake Travis experience awaits. Imagine your leadership team discussing strategy while cruising past the stunning Texas Hill Country. A leadership retreat Lake Travis setting removes the distractions of the office and opens minds to new possibilities.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Whether you're planning a one-day executive retreat Lake Travis or a multi-day leadership summit, our private charters provide the exclusive environment your team needs for meaningful strategic conversations.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Private vessel for confidential discussions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Inspiring backdrop for vision and goal setting</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Flexible timing for your executive retreat Lake Travis</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Executive retreat Lake Travis leadership summit on private boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Strategic Sessions</p>
                        <p className="text-xs text-gray-500">Away from distractions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Conference Break Activities */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white" data-testid="section-conference-breaks">
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
                      alt="Company conference Austin boat activity break from meetings"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">CONFERENCE ACTIVITIES</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="title-conference-breaks">Conference Break Activities</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Break free from the conference room with a company conference Austin boat excursion. After hours of presentations and meetings, your attendees will appreciate a refreshing cruise on Lake Travis. A company conference Austin boat experience creates networking opportunities in a relaxed setting.
                  </p>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    We work with conference organizers to schedule perfect afternoon breaks or evening networking cruises. Your company conference Austin boat activity will be the highlight of your event.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {retreatTypes.slice(0, 2).map((type, index) => (
                      <Card key={index} className="bg-white/10 border-white/20" data-testid={`card-retreat-type-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-white">{type.title}</h4>
                          <p className="text-white/70 text-sm mb-2">{type.description}</p>
                          <ul className="space-y-1">
                            {type.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-yellow-400 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Link href="/team-building">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold" data-testid="button-team-building">
                      <Users className="mr-2 h-5 w-5" />
                      Explore Team Building Options
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Multi-Day Retreat Planning */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-multi-day-planning">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">RETREAT PLANNING</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="title-multi-day-planning">Multi-Day Retreat Planning Support</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Planning a multi-day corporate offsite Austin experience? We're here to help. Whether you need a single cruise as part of a larger corporate offsite Austin agenda or multiple water activities throughout your retreat, our team understands the logistics of corporate events.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    From coordinating with your Austin hotels to timing cruises around your meeting schedule, we make the corporate offsite Austin planning process seamless. Let us handle the details so you can focus on your retreat objectives.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {retreatTypes.slice(2, 4).map((type, index) => (
                      <Card key={index} className="bg-gray-50 dark:bg-gray-800" data-testid={`card-retreat-planning-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-gray-900 dark:text-white">{type.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{type.description}</p>
                          <ul className="space-y-1">
                            {type.features.map((feature, idx) => (
                              <li key={idx} className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link href="/client-entertainment">
                      <Button size="lg" variant="outline" className="font-bold" data-testid="button-client-entertainment">
                        <Handshake className="mr-2 h-5 w-5" />
                        Client Entertainment
                      </Button>
                    </Link>
                    <Link href="/private-cruises">
                      <Button size="lg" variant="outline" className="font-bold" data-testid="button-private-cruises">
                        <Ship className="mr-2 h-5 w-5" />
                        Private Cruises
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Corporate offsite Austin multi-day retreat Lake Travis planning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-bold text-sm">Multi-Day Support</p>
                        <p className="text-xs text-gray-500">Full event coordination</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-boat-options">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">OUR FLEET</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="title-boat-options">Boats for Every Corporate Event</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Whether you're hosting an intimate executive retreat Lake Travis for 14 or a large leadership retreat Lake Travis summit for 75, we have the perfect vessel for your corporate offsite Austin experience.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {boatOptions.map((boat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-blue-200" data-testid={`card-boat-${index}`}>
                    <CardContent className="p-6 text-center">
                      <Ship className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                      <h3 className="font-bold text-xl mb-2">{boat.name}</h3>
                      <p className="text-blue-600 font-semibold mb-2">{boat.capacity}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{boat.best}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Unique Value Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-unique-value">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage4}
                      alt="Leadership retreat Lake Travis executive team building corporate event"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div>
                  <Badge className="mb-4 bg-amber-100 text-amber-700">UNIQUE VENUES</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="title-unique-value">Beyond the Conference Room</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    A company conference Austin boat experience offers what traditional venues cannot: fresh air, stunning scenery, and an atmosphere that encourages genuine connection. Your leadership retreat Lake Travis will create lasting memories and stronger team bonds.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    From executive retreat Lake Travis strategy sessions to large-scale corporate offsite Austin celebrations, the water provides a unique backdrop that inspires creativity and collaboration. Experience why Austin companies choose Lake Travis for their most important gatherings.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Star className="h-6 w-6 text-yellow-500" />
                      <span className="text-gray-700 dark:text-gray-300">5-star rated corporate event experiences</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-6 w-6 text-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">Trusted by Austin's top companies</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Waves className="h-6 w-6 text-cyan-500" />
                      <span className="text-gray-700 dark:text-gray-300">Unforgettable Lake Travis settings</span>
                    </div>
                  </div>

                  <Link href="/chat">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold" data-testid="button-start-planning">
                      <Compass className="mr-2 h-5 w-5" />
                      Start Planning Your Corporate Offsite Austin
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FAQs</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="title-faq">Corporate Retreat Planners Ask</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about planning your corporate offsite Austin, leadership retreat Lake Travis, or company conference Austin boat experience.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-none"
                  data-testid={`accordion-item-${index}`}
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:no-underline" data-testid={`accordion-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-400" data-testid={`accordion-content-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white" data-testid="section-final-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="title-final-cta">
                Ready to Plan Your Corporate Offsite Austin Experience?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                From executive retreat Lake Travis sessions to large company conference Austin boat events, we're ready to help create an unforgettable leadership retreat Lake Travis experience for your team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-6" data-testid="button-get-quote">
                    <Phone className="mr-2 h-5 w-5" />
                    Get Your Custom Quote
                  </Button>
                </Link>
                <Link href="/corporate-events">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-explore-corporate">
                    Explore Corporate Events
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
