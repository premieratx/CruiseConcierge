import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Phone, Clock, CheckCircle2, 
  Shield, Anchor, Wrench, Award, Star,
  ArrowRight, LifeBuoy, ClipboardCheck, BadgeCheck,
  Thermometer, Eye, AlertTriangle, FileCheck, Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import RelatedBlogArticles from '@/components/RelatedBlogArticles';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroBoatImage from '@assets/clever-girl-1-lake-travis-party-boat.jpg';
import captainImage from '@assets/day tripper-1 party boat with captain austin_1763968078449.jpg';
import maintenanceImage from '@assets/clever-girl-2-party-boat-austin.jpg';
import fleetImage from '@assets/meeseeks-1_1763968010088.jpg';
import safetyGearImage from '@assets/day tripper-2 party boat austin lake travis_1763968078449.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const safetyPillars = [
  { 
    icon: Shield, 
    title: 'Perfect Safety Record', 
    description: '15+ years without a single safety incident. Your well-being is our #1 priority.',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    stat: '0 incidents'
  },
  { 
    icon: Wrench, 
    title: 'Pre-Trip Inspections', 
    description: 'Every boat gets a full check before every cruise. We catch issues before you board.',
    color: 'text-green-600',
    bg: 'bg-green-100',
    stat: 'Every trip'
  },
  { 
    icon: Award, 
    title: 'TPWD Licensed Captains', 
    description: 'All captains hold valid Texas Parks and Wildlife Department licenses. CPR and first aid certified.',
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    stat: '100% certified'
  },
  { 
    icon: LifeBuoy, 
    title: 'Full Safety Equipment', 
    description: 'Life jackets for all. First aid kits on every boat. Fire extinguishers ready.',
    color: 'text-red-600',
    bg: 'bg-red-100',
    stat: 'TPWD approved'
  }
];

const maintenanceSchedule = [
  {
    icon: Eye,
    category: 'Before Every Cruise',
    frequency: 'Daily',
    color: 'bg-green-500',
    items: [
      'Engine startup and systems check',
      'Fuel and oil level verification',
      'Safety equipment count and condition',
      'Navigation lights and electronics test',
      'Bilge pump and fire extinguisher check',
      'Deck and seating inspection'
    ]
  },
  {
    icon: ClipboardCheck,
    category: 'Weekly Deep Inspection',
    frequency: 'Every 7 days',
    color: 'bg-blue-500',
    items: [
      'Hull cleaning and damage check',
      'Propeller and drive inspection',
      'Battery voltage and charge test',
      'Steering system evaluation',
      'Anchor, ropes, and cleats check',
      'Sound system and lighting test'
    ]
  },
  {
    icon: Wrench,
    category: 'Monthly Professional Service',
    frequency: 'Every 30 days',
    color: 'bg-purple-500',
    items: [
      'Full engine service by certified tech',
      'Electrical system audit',
      'Safety gear replacement as needed',
      'Deep sanitizing and cleaning',
      'Upholstery and shade structure check',
      'TPWD compliance review'
    ]
  },
  {
    icon: FileCheck,
    category: 'Annual Certification',
    frequency: 'Yearly',
    color: 'bg-orange-500',
    items: [
      'Full TPWD inspection',
      'Marine surveyor evaluation',
      'Insurance compliance audit',
      'Complete safety equipment replacement',
      'Engine overhaul if needed',
      'Documentation renewal'
    ]
  }
];

const captainCredentials = [
  { icon: Award, title: 'TPWD Licensed', desc: 'Texas Parks and Wildlife certified' },
  { icon: LifeBuoy, title: 'CPR & First Aid', desc: 'Emergency response trained' },
  { icon: Clock, title: '5+ Years Experience', desc: 'Lake Travis experts' },
  { icon: Shield, title: 'Background Checked', desc: 'Verified and trusted' }
];

const fleetSafety = [
  { boat: 'Day Tripper', capacity: '14 guests', features: ['Life jackets for 14', 'First aid kit', 'Fire extinguisher', 'VHF radio'] },
  { boat: 'Meeseeks', capacity: '25 guests', features: ['Life jackets for 30', 'First aid kit', '2 fire extinguishers', 'VHF radio', 'Throwable devices'] },
  { boat: 'The Irony', capacity: '25 guests', features: ['Life jackets for 30', 'First aid kit', '2 fire extinguishers', 'VHF radio', 'Throwable devices'] },
  { boat: 'Clever Girl', capacity: '50 guests', features: ['Life jackets for 75', 'Full first aid station', '4 fire extinguishers', 'VHF radio', 'Emergency beacon'] }
];

const faqs = [
  {
    question: 'What safety equipment is on each boat?',
    answer: 'Every boat carries TPWD-approved life jackets for all passengers plus extras. We also have first aid kits, fire extinguishers, throwable flotation devices, VHF radios, and emergency signaling equipment. Our flagship Clever Girl has a full first aid station.'
  },
  {
    question: 'How often do you service your boats?',
    answer: 'We inspect every boat before every single cruise. Weekly deep inspections happen on maintenance days. Monthly, certified marine technicians perform full engine service. Annually, we undergo TPWD inspections and marine surveyor evaluations.'
  },
  {
    question: 'Are all your captains licensed?',
    answer: 'Yes. Every captain holds a valid Texas Parks and Wildlife Department (TPWD) license. They are also CPR and first aid certified. Most have 5+ years experience specifically on Lake Travis. All pass background checks before joining our crew.'
  },
  {
    question: 'What happens if there is bad weather?',
    answer: 'Safety comes first, always. We monitor weather 24/7 with multiple radar systems. If dangerous conditions approach, we return to the marina immediately. Trips affected by unsafe weather are rescheduled at no extra cost to you.'
  },
  {
    question: 'Do you have insurance?',
    answer: 'Absolutely. Premier Party Cruises carries comprehensive commercial marine insurance that exceeds Texas requirements. This covers liability, vessel damage, and passenger protection. We can provide proof of insurance upon request.'
  },
  {
    question: 'What makes Premier Party Cruises safer than other companies?',
    answer: 'Three things: (1) We maintain boats more frequently than required by law. (2) Our captains exceed licensing requirements with additional training. (3) We have a perfect safety record over 15+ years and 150,000+ guests. We never cut corners on safety.'
  },
  {
    question: 'Can I bring children on your boats?',
    answer: 'Yes, children are welcome on private cruises. We have child-sized life jackets available. Our captains are experienced with family groups. The ATX Disco Cruise is 21+ only, but private charters accommodate all ages.'
  },
  {
    question: 'How do you handle medical emergencies?',
    answer: 'All captains are CPR and first aid certified. Every boat carries a first aid kit. We maintain radio contact with shore at all times. In emergencies, we can reach the marina in minutes and coordinate with EMS. Lake Travis has swift emergency response coverage.'
  }
];

const safetyStats = [
  { number: '0', label: 'Safety Incidents', subtext: '15+ years' },
  { number: '125K+', label: 'Happy Guests', subtext: 'Since 2009' },
  { number: '100%', label: 'Licensed Captains', subtext: 'TPWD certified' },
  { number: '24/7', label: 'Weather Watch', subtext: 'Real-time monitoring' }
];

export default function LakeTravisBoatSafetyMaintenance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lake Travis Boat Safety & Maintenance Standards | Premier Party Cruises</title>
        <meta name="description" content="Discover Premier Party Cruises' industry-leading boat safety and maintenance standards. TPWD licensed captains, rigorous inspections, and a perfect 15-year safety record on Lake Travis." />
        <meta name="keywords" content="Lake Travis boat safety, party boat maintenance, TPWD licensed captains, Lake Travis party cruise safety, boat safety inspections, Premier Party Cruises safety record" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises" />
        <meta property="og:title" content="Lake Travis Boat Safety & Maintenance Standards | Premier Party Cruises" />
        <meta property="og:description" content="15+ years. 150,000+ guests. Zero safety incidents. Learn about our industry-leading safety standards on Lake Travis." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/clever-girl-1-lake-travis-party-boat.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lake Travis Boat Safety & Maintenance Standards" />
        <meta name="twitter:description" content="15+ years. 150,000+ guests. Zero safety incidents. Premier Party Cruises." />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-700 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroBoatImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-green-500 text-white font-bold" data-testid="badge-safety">
              PERFECT SAFETY RECORD
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Boat Safety<br />& Maintenance Standards
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              15+ Years. Thousands of Guests. Zero Safety Incidents.
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              See why Premier Party Cruises is the safest choice on Lake Travis
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-lg px-8 py-6" data-testid="button-book-cruise">
                  <Ship className="mr-2 h-5 w-5" />
                  Book a Safe Cruise
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-fleet">
                  View Our Fleet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Safety Stats Bar */}
        <section className="py-8 bg-blue-900 text-white" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {safetyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">{stat.number}</p>
                  <p className="text-white font-semibold text-sm">{stat.label}</p>
                  <p className="text-white/60 text-xs">{stat.subtext}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Pillars Grid */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="pillars-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">CORE PRINCIPLES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Four Safety Pillars</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Every cruise is built on these non-negotiable standards
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyPillars.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  data-testid={`pillar-${index}`}
                >
                  <Card className="h-full text-center hover:shadow-xl transition-all border-2 hover:border-blue-300 hover:-translate-y-1">
                    <CardContent className="pt-6 pb-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${item.bg} rounded-full flex items-center justify-center`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{item.description}</p>
                      <Badge className={`${item.bg} ${item.color} font-semibold`}>{item.stat}</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Captain Expertise Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="captains-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-700">EXPERT CREW</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">TPWD Licensed Captains</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Your safety starts with our crew. Every captain at Premier Party Cruises holds a valid 
                    Texas Parks and Wildlife Department (TPWD) license. They know Lake Travis like the back of their hand.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    But a license is just the start. Our captains also hold CPR and first aid certifications. 
                    They practice emergency drills monthly. They can handle any situation on the water.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {captainCredentials.map((cred, index) => (
                      <Card key={index} className="bg-purple-50 border-purple-200 hover:shadow-md transition-shadow" data-testid={`credential-${index}`}>
                        <CardContent className="p-4 flex items-start gap-3">
                          <cred.icon className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-bold text-sm">{cred.title}</h4>
                            <p className="text-xs text-gray-600">{cred.desc}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Link href="/chat">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold" data-testid="button-meet-crew">
                      <Users className="mr-2 h-5 w-5" />
                      Book With Our Expert Crew
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={captainImage}
                      alt="Premier Party Cruises captain and crew on Lake Travis boat"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-3">
                      <Award className="h-10 w-10 text-purple-600" />
                      <div>
                        <p className="font-bold">TPWD Licensed</p>
                        <p className="text-sm text-gray-500">All captains certified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Maintenance Schedule Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 text-white" data-testid="maintenance-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-yellow-400 text-black font-bold">RIGOROUS STANDARDS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Maintenance Schedule</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                We don't just meet safety standards. We exceed them at every level.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {maintenanceSchedule.map((schedule, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  data-testid={`schedule-${index}`}
                >
                  <Card className="h-full bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all">
                    <CardContent className="pt-6">
                      <div className={`w-12 h-12 ${schedule.color} rounded-lg flex items-center justify-center mb-4`}>
                        <schedule.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{schedule.category}</h3>
                      <p className="text-yellow-400 text-sm font-semibold mb-4">{schedule.frequency}</p>
                      <ul className="space-y-2">
                        {schedule.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                            <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
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

        {/* Boat Maintenance Image Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="boat-maintenance-detail">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={maintenanceImage}
                    alt="Premier Party Cruises boat being maintained and inspected"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-green-100 text-green-700">PREVENTIVE CARE</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">We Fix Problems Before They Happen</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Many boat rental companies do the minimum. We do the maximum. Our boats receive 
                  more maintenance than the law requires.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'Pre-cruise inspection every single trip',
                    'Weekly deep cleaning and mechanical checks',
                    'Monthly professional engine service',
                    'Annual TPWD compliance audits',
                    'Immediate repair policy: if we find an issue, we fix it now',
                    'Brand new safety equipment replaced each season'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/private-cruises">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold" data-testid="button-see-fleet">
                    <Ship className="mr-2 h-5 w-5" />
                    See Our Well-Maintained Fleet
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Fleet Safety Equipment */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="fleet-safety-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-red-100 text-red-700">FLEET SAFETY</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Safety Equipment by Boat</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Every vessel exceeds TPWD requirements
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fleetSafety.map((boat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  data-testid={`fleet-${index}`}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{boat.boat}</CardTitle>
                        <Badge variant="outline">{boat.capacity}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {boat.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
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

        {/* Safety Gear Photo Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="gear-photo-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="order-2 lg:order-1"
              >
                <Badge className="mb-4 bg-orange-100 text-orange-700">PEACE OF MIND</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Safety Matters for Your Party</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  You're here to celebrate. Not to worry. When you book with Premier Party Cruises, 
                  safety is handled. You focus on making memories.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Our 15+ year perfect safety record means one thing: we take this seriously so you don't have to. 
                  Your bachelor party, bachelorette celebration, birthday, or corporate event 
                  is in the hands of professionals.
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-8 w-8 text-green-600" />
                    <h3 className="font-bold text-lg text-green-800">Our Safety Promise</h3>
                  </div>
                  <p className="text-green-700">
                    If weather or any safety concern arises, we will reschedule your cruise at no extra cost. 
                    Your safety always comes first.
                  </p>
                </div>

                <Link href="/chat">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold" data-testid="button-book-safe">
                    <Phone className="mr-2 h-5 w-5" />
                    Book With Confidence
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="order-1 lg:order-2"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={fleetImage}
                    alt="Premier Party Cruises fleet boat on Lake Travis"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

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
              <Badge className="mb-4 bg-blue-100 text-blue-700">COMMON QUESTIONS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Safety FAQ</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Answers to your most common safety questions
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg px-6 border shadow-sm"
                  data-testid={`faq-${index}`}
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
        <section className="py-16 bg-gradient-to-r from-blue-700 to-cyan-600 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Book the Safest Cruise on Lake Travis?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                15+ years. countless happy guests. Perfect safety record.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-lg px-8 py-6" data-testid="cta-get-quote">
                    <Ship className="mr-2 h-5 w-5" />
                    Get a Quote
                  </Button>
                </Link>
                <a href="tel:5124885892">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="cta-call">
                    <Phone className="mr-2 h-5 w-5" />
                    (512) 488-5892
                  </Button>
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  TPWD Licensed Captains
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  Pre-Trip Inspections
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  Full Insurance
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  Weather Guarantee
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <RelatedBlogArticles category="safety" currentSlug="/blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises" />
        <Footer />
      </div>
    </>
  );
}
