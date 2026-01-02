import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Car, Plane, Hotel
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-3_1760072938923.jpg';
import sectionImage1 from '@assets/@capitalcityshots-16_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-17_1760080740020.jpg';
import sectionImage3 from '@assets/@capitalcityshots-18_1760080740021.jpg';
import sectionImage4 from '@assets/@capitalcityshots-19_1760080740021.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const whyDallasCompanies = [
  { 
    icon: MapPin, 
    title: 'Escape the Metroplex', 
    description: 'A Dallas corporate retreat Austin offers your team a fresh environment away from everyday office routines',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Users, 
    title: 'Team Bonding Destination', 
    description: 'An out of town company event Lake Travis creates shared memories that strengthen workplace relationships',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Ship, 
    title: 'Unique Venue Experience', 
    description: 'A Texas corporate getaway boat offers something no Dallas conference room can match',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Trophy, 
    title: 'Reward Your Team', 
    description: 'A Dallas to Austin corporate outing shows employees they are valued with a memorable experience',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const travelLogistics = [
  { stat: '3 Hours', label: 'Drive from Dallas' },
  { stat: '1 Hour', label: 'Flight to Austin' },
  { stat: '30 Min', label: 'Austin to Lake Travis' },
  { stat: '14-75', label: 'Guest Capacity' }
];

const itineraries = [
  {
    title: 'Half-Day Getaway',
    duration: '4-5 Hours',
    description: 'Perfect for a quick Dallas corporate retreat Austin experience',
    schedule: [
      'Morning departure from Dallas (6 AM)',
      'Arrive Lake Travis by 9 AM',
      '3-hour private boat cruise',
      'Team lunch on the water',
      'Return to Dallas by evening'
    ],
    best: 'Day trips & quick escapes'
  },
  {
    title: 'Full-Day Experience',
    duration: '8-10 Hours',
    description: 'Complete out of town company event Lake Travis adventure',
    schedule: [
      'Early morning drive or flight',
      'Lakeside brunch before cruise',
      '4-hour Texas corporate getaway boat experience',
      'Swimming, floating, team activities',
      'Dinner in Austin before return'
    ],
    best: 'Team building & celebrations'
  },
  {
    title: 'Multi-Day Retreat',
    duration: '2-3 Days',
    description: 'Ultimate Dallas to Austin corporate outing package',
    schedule: [
      'Day 1: Travel, hotel check-in, Austin dinner',
      'Day 2: Full-day Lake Travis boat cruise',
      'Day 3: Team meetings, Austin exploration, return',
      'Optional: Add golf, spa, or team activities'
    ],
    best: 'Strategic planning & incentive trips'
  }
];

const whatWeProvide = [
  {
    icon: Ship,
    title: 'Private Boat Charter',
    features: ['Boats for 14-75 guests', 'Professional captain & crew', 'Premium sound system', 'BYOB friendly']
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    features: ['Morning, afternoon, or sunset cruises', 'Weekday & weekend availability', 'Custom timing for Dallas groups']
  },
  {
    icon: Users,
    title: 'Group Coordination',
    features: ['Single point of contact', 'Catering recommendations', 'Activity planning assistance', 'Hotel partner suggestions']
  },
  {
    icon: Award,
    title: 'Premium Experience',
    features: ['Giant lily pads for floating', 'Swimming stops at coves', 'Scenic Lake Travis views', '5-star reviewed service']
  }
];

const faqs = [
  {
    question: 'How do Dallas companies typically travel to Lake Travis for corporate events?',
    answer: 'Most Dallas corporate retreat Austin groups either drive (about 3 hours via I-35) or fly into Austin-Bergstrom International Airport (1 hour flight). From Austin, Lake Travis is just 30 minutes away. We can help coordinate timing for your out of town company event Lake Travis.'
  },
  {
    question: 'Can you accommodate large groups from Dallas for a Texas corporate getaway boat experience?',
    answer: 'Absolutely! Our fleet includes boats for 14 to 75 guests. For larger Dallas to Austin corporate outing groups, we can coordinate multiple boats to cruise together. We regularly host Dallas companies for team building and client events.'
  },
  {
    question: 'What should we bring for an out of town company event Lake Travis?',
    answer: 'We recommend swimsuits, sunscreen, towels, and comfortable clothes. Since all private cruises are BYOB, bring your preferred beverages and snacks. For a Dallas corporate retreat Austin trip, we suggest packing light since you will be on the water.'
  },
  {
    question: 'Do you have hotel recommendations for Dallas groups planning a Texas corporate getaway boat trip?',
    answer: 'Yes! We partner with several Lakeway and Austin hotels that offer corporate rates. Popular choices include Lakeway Resort & Spa and hotels in downtown Austin. We can share recommendations based on your Dallas to Austin corporate outing budget and preferences.'
  },
  {
    question: 'What happens if weather affects our Dallas corporate retreat Austin plans?',
    answer: 'Safety comes first. If weather forces a cancellation, we offer full rescheduling or refunds. For out of town company event Lake Travis bookings, we monitor forecasts closely and communicate early so your team can adjust travel plans if needed.'
  },
  {
    question: 'How far in advance should Dallas companies book a Texas corporate getaway boat?',
    answer: 'We recommend booking 3-4 weeks ahead for Dallas to Austin corporate outing groups, especially during peak season (March-October). This gives you time to coordinate travel and gives us time to ensure everything is perfect for your Dallas corporate retreat Austin.'
  },
  {
    question: 'Can we have a business meeting during our out of town company event Lake Travis?',
    answer: 'Many Dallas companies combine relaxation with business. Our boats offer enough space for informal discussions, and the unique setting often sparks creative thinking. For formal presentations, we suggest meetings at your hotel before or after your Texas corporate getaway boat experience.'
  },
  {
    question: 'What makes Lake Travis ideal for a Dallas to Austin corporate outing?',
    answer: 'Lake Travis offers something no Dallas venue can match: crystal-clear water, scenic hill country views, and a true escape from the office. A Dallas corporate retreat Austin on Lake Travis creates the kind of shared experience that builds lasting team bonds.'
  }
];

const packageOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Small executive teams' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Department outings' },
  { name: 'Clever Girl', capacity: '50 guests', best: 'Large team retreats' },
  { name: 'Clever Girl', capacity: '75 guests', best: 'Company-wide events' }
];

export default function DallasToLakeTravisCorporate() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Dallas Corporate Retreat Austin | Out of Town Company Events Lake Travis</title>
        <meta name="description" content="Plan your Dallas corporate retreat Austin on Lake Travis. Texas corporate getaway boat experiences for out of town company events. Dallas to Austin corporate outing packages for 14-75 guests." />
        <meta name="keywords" content="Dallas corporate retreat Austin, out of town company event Lake Travis, Texas corporate getaway boat, Dallas to Austin corporate outing, corporate team building Lake Travis" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/dallas-to-lake-travis-corporate" />
        <meta property="og:title" content="Dallas Corporate Retreat Austin | Out of Town Company Events Lake Travis" />
        <meta property="og:description" content="Plan your Dallas corporate retreat Austin on Lake Travis. Texas corporate getaway boat experiences for out of town company events." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="dallas-lake-travis-corporate-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold" data-testid="badge-corporate-getaway">
              DALLAS TO LAKE TRAVIS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              From Dallas to Lake Travis – Corporate Getaways for Out-of-Town Companies
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Plan the Ultimate Dallas Corporate Retreat Austin Experience
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Escape the Dallas Metroplex for an unforgettable Texas corporate getaway boat experience on Lake Travis. Just 3 hours from downtown Dallas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6" data-testid="button-plan-getaway">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your Dallas Getaway
                </Button>
              </Link>
              <Link href="/corporate-events">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-packages">
                  View Corporate Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Why Dallas Companies Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="why-dallas-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-why-dallas">Why Dallas Companies Come to Lake Travis</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A Dallas corporate retreat Austin offers your team something special – a complete change of scenery that inspires creativity and strengthens bonds
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyDallasCompanies.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  data-testid={`benefit-card-${index}`}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
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

        {/* Travel Logistics Stats */}
        <section className="py-12 bg-blue-900 text-white" data-testid="travel-stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Planning a Dallas to Austin Corporate Outing</h2>
              <p className="text-white/80">Travel logistics for your out of town company event Lake Travis</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {travelLogistics.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  data-testid={`stat-${index}`}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400">{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Planning Section with Image */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="planning-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">TRAVEL PLANNING</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-planning">Planning Your Corporate Getaway from Dallas</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Whether you drive or fly, getting from Dallas to Lake Travis for your Texas corporate getaway boat experience is straightforward. The 3-hour drive on I-35 is scenic and easy, or book a quick 1-hour flight into Austin-Bergstrom.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Many Dallas companies turn their out of town company event Lake Travis into a full retreat experience, combining the boat cruise with team dinners in Austin and strategic planning sessions. A Dallas corporate retreat Austin is the perfect way to reward your team.
                  </p>
                  
                  <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    <Card className="bg-white/80 text-center p-4">
                      <Car className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <p className="font-bold text-sm">Drive</p>
                      <p className="text-xs text-gray-500">3 hrs via I-35</p>
                    </Card>
                    <Card className="bg-white/80 text-center p-4">
                      <Plane className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <p className="font-bold text-sm">Fly</p>
                      <p className="text-xs text-gray-500">1 hr to AUS</p>
                    </Card>
                    <Card className="bg-white/80 text-center p-4">
                      <Hotel className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <p className="font-bold text-sm">Stay</p>
                      <p className="text-xs text-gray-500">Lakeway hotels</p>
                    </Card>
                  </div>

                  <Link href="/team-building">
                    <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-team-building">
                      Explore Team Building Options
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Texas corporate getaway boat Lake Travis Dallas company retreat scenic views"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Lake Travis</p>
                        <p className="text-xs text-gray-500">30 min from Austin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Itineraries Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="itineraries-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">RECOMMENDED ITINERARIES</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-itineraries">Dallas to Austin Corporate Outing Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choose the perfect format for your Dallas corporate retreat Austin experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {itineraries.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  data-testid={`itinerary-card-${index}`}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow border-2 hover:border-blue-300">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          <p className="text-blue-100 text-sm mt-1">{item.duration}</p>
                        </div>
                        <Clock className="h-6 w-6 text-blue-200" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{item.description}</p>
                      <ul className="space-y-2 mb-4">
                        {item.schedule.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        Best for: {item.best}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Provide Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="what-we-provide-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-xl overflow-hidden shadow-xl">
                      <img 
                        src={sectionImage2}
                        alt="Out of town company event Lake Travis Dallas corporate group boat cruise"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden shadow-xl mt-8">
                      <img 
                        src={sectionImage3}
                        alt="Dallas to Austin corporate outing team building boat party experience"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">FOR OUT-OF-TOWN GROUPS</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-what-we-provide">What Premier Provides for Dallas Groups</h2>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    We understand the unique needs of out of town company event Lake Travis groups. From coordinating timing to recommending local venues, we make your Texas corporate getaway boat experience seamless.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {whatWeProvide.map((item, index) => (
                      <Card key={index} className="bg-white/10 border-white/20" data-testid={`provide-card-${index}`}>
                        <CardContent className="p-4">
                          <item.icon className="h-8 w-8 text-yellow-400 mb-2" />
                          <h4 className="font-bold text-white mb-2">{item.title}</h4>
                          <ul className="space-y-1">
                            {item.features.map((feature, idx) => (
                              <li key={idx} className="text-white/70 text-xs flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-green-400" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">OUR FLEET</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-boats">Texas Corporate Getaway Boat Options</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Whether your Dallas corporate retreat Austin involves a small executive team or the entire company, we have the right boat. Each vessel offers a private, premium experience for your out of town company event Lake Travis.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {packageOptions.map((boat, index) => (
                      <Card key={index} className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200" data-testid={`boat-option-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-blue-900">{boat.name}</h4>
                          <p className="text-blue-600 text-sm">{boat.capacity}</p>
                          <p className="text-gray-600 text-xs mt-1">{boat.best}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link href="/private-cruises">
                      <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-private-cruises">
                        View Private Cruises
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/client-entertainment">
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" data-testid="button-client-entertainment">
                        Client Entertainment Options
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage4}
                      alt="Dallas corporate retreat Austin premium boat fleet Lake Travis corporate event"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                      <div>
                        <p className="font-bold text-sm">5-Star Reviews</p>
                        <p className="text-xs text-gray-500">Trusted by Dallas companies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FREQUENTLY ASKED QUESTIONS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-faqs">FAQs for Out-of-Town Corporate Groups</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions from Dallas companies planning a Texas corporate getaway boat experience
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="w-full space-y-4" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border px-6"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-blue-600 py-4">
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
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-cta">
                Ready to Plan Your Dallas Corporate Retreat Austin?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let us help you create an unforgettable out of town company event Lake Travis experience. Our team specializes in coordinating Dallas to Austin corporate outing logistics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6" data-testid="button-start-planning">
                    <Phone className="mr-2 h-5 w-5" />
                    Start Planning Today
                  </Button>
                </Link>
                <Link href="/corporate-events">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-corporate-events">
                    View All Corporate Options
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        <Footer />
      </div>
    </>
  );
}
