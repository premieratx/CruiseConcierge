import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Shield, Users, LifeBuoy, Phone, Clock, CheckCircle2, 
  AlertTriangle, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Anchor, Ship, Heart,
  Sun, Thermometer, CloudRain, Eye, Radio, Siren,
  BadgeCheck, ClipboardCheck, Sparkles, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-27_1760080807866.jpg';
import sectionImage1 from '@assets/@capitalcityshots-28_1760080807867.jpg';
import sectionImage2 from '@assets/@capitalcityshots-29_1760080807867.jpg';
import sectionImage3 from '@assets/@capitalcityshots-30_1760080807867.jpg';

const safetyStats = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '125,000+', label: 'Safe Passengers' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const essentialSafetyGuidelines = [
  {
    icon: LifeBuoy,
    title: 'Life Jacket Availability',
    description: 'USCG-approved life jackets for all passengers available on every Lake Travis boat safety cruise. Non-swimmers should wear them throughout.',
    priority: 'Essential'
  },
  {
    icon: UserCheck,
    title: 'Follow Captain Instructions',
    description: 'Our licensed captains prioritize safe party cruises Lake Travis. Always follow their directions for boarding, swimming, and emergencies.',
    priority: 'Critical'
  },
  {
    icon: AlertTriangle,
    title: 'No Glass Containers',
    description: 'Glass is strictly prohibited on all party boat safety Lake Travis vessels. Bring beverages in cans and plastic containers only.',
    priority: 'Required'
  },
  {
    icon: Users,
    title: 'Child Supervision',
    description: 'Parents must supervise children at all times during Lake Travis boat safety cruises. Life jackets required for all minors.',
    priority: 'Essential'
  },
  {
    icon: Sun,
    title: 'Sun Protection',
    description: 'Texas sun is intense. Bring sunscreen, hats, and stay hydrated for safe party cruises Lake Travis during summer months.',
    priority: 'Recommended'
  },
  {
    icon: Waves,
    title: 'Responsible Swimming',
    description: 'Stay near the boat during swim stops and never swim alone. Party boat safety Lake Travis includes designated swimming areas.',
    priority: 'Essential'
  }
];

const boatSafetyFeatures = [
  {
    boat: 'Day Tripper',
    capacity: '14 guests',
    features: ['Single-deck pontoon with arch canopy', 'USCG safety equipment', 'Professional captain', 'First aid kit aboard'],
    description: 'Intimate Lake Travis boat safety experience for small groups'
  },
  {
    boat: 'Meeseeks',
    capacity: '25 guests',
    features: ['Single-deck pontoon with arch canopy', 'Full safety equipment', 'Licensed captain', 'Emergency radio'],
    description: 'Safe party cruises Lake Travis for medium-sized celebrations'
  },
  {
    boat: 'The Irony',
    capacity: '30 guests',
    features: ['Single-deck pontoon with arch canopy', 'Complete safety gear', 'Experienced captain', 'Navigation lights'],
    description: 'Popular party boat safety Lake Travis option for larger groups'
  },
  {
    boat: 'Clever Girl',
    capacity: '50-75 guests',
    features: ['Single-deck pontoon with arch canopy', '14 disco balls', 'Full crew (add\'l fee 51-75)', 'Comprehensive safety equipment'],
    description: 'Flagship Lake Travis boat safety vessel for big celebrations'
  }
];

const prePartyChecklist = [
  { title: 'Sign Liability Waivers', description: 'All guests complete digital waivers before Lake Travis boat safety cruise' },
  { title: 'Share Guest List', description: 'Provide accurate headcount for safe party cruises Lake Travis capacity compliance' },
  { title: 'Review BYOB Rules', description: 'Cans and plastic only - no glass for party boat safety Lake Travis' },
  { title: 'Assign Buddy System', description: 'Pair up for swimming - a key Lake Travis boat safety guideline' },
  { title: 'Designate a Contact', description: 'One person for captain communication during safe party cruises Lake Travis' },
  { title: 'Check Weather', description: 'We monitor conditions but guests should dress appropriately for party boat safety Lake Travis' }
];

const emergencyProcedures = [
  {
    icon: Siren,
    title: 'Man Overboard',
    description: 'Alert captain immediately. Our Lake Travis boat safety training includes rapid response protocols for water emergencies.'
  },
  {
    icon: Heart,
    title: 'Medical Emergency',
    description: 'All captains are first aid/CPR certified. Safe party cruises Lake Travis include direct communication with emergency services.'
  },
  {
    icon: CloudRain,
    title: 'Severe Weather',
    description: 'Captains monitor radar constantly. Party boat safety Lake Travis protocols include immediate docking if conditions worsen.'
  },
  {
    icon: Radio,
    title: 'Emergency Communication',
    description: 'VHF marine radios on all boats for Lake Travis boat safety. Direct contact with Coast Guard and local emergency services.'
  }
];

const swimmingSafetyTips = [
  'Stay within designated swim areas during Lake Travis boat safety stops',
  'Use the boat ladder - don\'t jump from unsafe heights',
  'Non-swimmers should use giant lily pad floats with life jackets',
  'Never swim alone during safe party cruises Lake Travis',
  'Watch for other boats - our captains monitor the area',
  'Limit alcohol before swimming for party boat safety Lake Travis'
];

const captainCredentials = [
  { icon: BadgeCheck, title: 'USCG Licensed', description: 'All captains hold valid Coast Guard Master Captain licenses for Lake Travis boat safety' },
  { icon: Heart, title: 'CPR/First Aid Certified', description: 'Emergency response training for safe party cruises Lake Travis' },
  { icon: MapPin, title: 'Lake Travis Experts', description: 'Years of local experience for optimal party boat safety Lake Travis navigation' },
  { icon: Shield, title: 'Background Verified', description: 'Full background checks for your Lake Travis boat safety peace of mind' }
];

const faqs = [
  {
    question: 'What are the essential Lake Travis boat safety guidelines I should know?',
    answer: 'Essential Lake Travis boat safety guidelines include: always listen to captain instructions, no glass containers aboard, supervise children at all times, use life jackets if you\'re not a confident swimmer, stay hydrated and use sunscreen, and swim responsibly during stops. Our safe party cruises Lake Travis prioritize these guidelines for every charter.'
  },
  {
    question: 'Do you provide life jackets for Lake Travis boat safety?',
    answer: 'Yes! Every party boat safety Lake Travis cruise includes USCG-approved life jackets for all passengers. We carry adult and children\'s sizes. Non-swimmers are encouraged to wear life jackets throughout the Lake Travis boat safety experience. Life jackets are also recommended during swimming stops.'
  },
  {
    question: 'How do you ensure safe party cruises Lake Travis in different weather?',
    answer: 'Our captains continuously monitor weather conditions. For Lake Travis boat safety, we may reschedule if conditions are unsafe (lightning, high winds, severe storms). Party boat safety Lake Travis protocols include real-time radar monitoring and we\'ll communicate early if weather concerns arise.'
  },
  {
    question: 'What happens during a swimming stop for party boat safety Lake Travis?',
    answer: 'During swimming stops, our captains anchor in calm, safe coves following Lake Travis boat safety protocols. We provide giant lily pad floats, monitor the swim area, and watch for other boats. Safe party cruises Lake Travis swimming stops include designated areas and easy boat ladder access.'
  },
  {
    question: 'Are your captains trained for Lake Travis boat safety emergencies?',
    answer: 'Absolutely. All captains are USCG licensed, CPR/First Aid certified, and trained in Lake Travis boat safety emergency protocols. They carry marine radios for emergency communication. Safe party cruises Lake Travis include captains with years of local experience handling any situation.'
  },
  {
    question: 'Why is glass prohibited for party boat safety Lake Travis?',
    answer: 'Glass prohibition is a critical Lake Travis boat safety guideline. Broken glass on a moving boat or in the water creates serious injury risk. For safe party cruises Lake Travis, bring all beverages in cans or plastic containers. This party boat safety Lake Travis rule protects all guests.'
  },
  {
    question: 'How do you handle medical emergencies during safe party cruises Lake Travis?',
    answer: 'Our Lake Travis boat safety protocols include first aid kits on all boats and CPR-certified captains. For serious emergencies, we have direct radio contact with emergency services and know the fastest routes to shore. Party boat safety Lake Travis means being prepared for any situation.'
  },
  {
    question: 'What Lake Travis boat safety guidelines apply to children?',
    answer: 'Children require constant parental supervision for party boat safety Lake Travis. Life jackets are mandatory for minors and we carry children\'s sizes. Kids should stay seated when the boat is moving. Our safe party cruises Lake Travis welcome families who follow these Lake Travis boat safety guidelines.'
  }
];

const internalLinks = [
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/bachelor-party-austin', label: 'Bachelor Parties', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/blogs/lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events', label: 'Insurance Info', icon: Shield },
  { href: '/quote', label: 'Get a Quote', icon: Star }
];

export default function LakeTravisBoatSafetyGuidelines() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises"
        defaultTitle="Lake Travis Boat Safety - Essential Guidelines for Safe Party Cruises | Premier Party Cruises"
        defaultDescription="Essential Lake Travis boat safety guidelines for safe party cruises. Learn party boat safety Lake Travis rules, swimming safety, emergency procedures, and what makes our safe party cruises Lake Travis the best choice. 14+ years, 100% safety record."
        defaultKeywords={['Lake Travis boat safety', 'safe party cruises Lake Travis', 'party boat safety Lake Travis', 'Lake Travis boating safety', 'boat party safety guidelines', 'safe boat parties Austin', 'Lake Travis party cruise safety', 'Texas boat party safety']}
        image={heroImage}
      />

      <BlogV2Layout
        title="Lake Travis Boat Safety - Essential Guidelines for Safe Party Cruises"
        description="Essential Lake Travis boat safety guidelines for safe party cruises. Learn party boat safety Lake Travis rules, swimming safety, emergency procedures, and what makes our safe party cruises Lake Travis the best choice. 14+ years, 100% safety record."
        slug="lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises"
        category="Safety Guides"
        categoryHref="/private-cruises"
        pillarTitle="Private Party Boat Charters"
        pillarHref="/private-cruises"
        relatedArticles={[
          { title: "Lake Travis Boat Safety & Maintenance Standards", href: "/blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises" },
          { title: "Safety First - Premier's Perfect Record & First Aid Training", href: "/blogs/safety-first-how-premiers-perfect-record-and-first-aid-training-set-us-apart" },
          { title: "Why Licensed Captains Matter for Lake Travis Party Boats", href: "/blogs/why-licensed-captains-matter-lake-travis-party-boats" },
        ]}
      >
      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-boat-safety-guidelines-page">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-green-900 via-emerald-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis boat safety - professional captain ensuring safe party cruise experience on the water"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-green-400 text-black font-bold" data-testid="badge-hero">
              <Shield className="h-4 w-4 mr-1 inline" />
              100% Safety Record Since 2010
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Boat Safety<br />
              <span className="text-green-400">Essential Guidelines for Safe Party Cruises</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Your complete guide to Lake Travis boat safety. Learn the essential guidelines that make our safe party cruises Lake Travis the trusted choice for 125,000+ guests. Party boat safety Lake Travis is our top priority.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Book a Safe Cruise</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-900 font-semibold"
                data-testid="button-view-fleet"
              >
                <Link href="/private-cruises">View Our Safe Fleet</Link>
              </Button>
            </div>
          </div>
        </m.section>

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


        {/* Safety Stats */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {safetyStats.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={heroImage}
              alt="Safe party cruises Lake Travis - guests enjoying Lake Travis boat safety with professional captain"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-hero"
            />
          </div>
        </section>

        {/* Essential Safety Guidelines */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="guidelines-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">ESSENTIAL GUIDELINES</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="guidelines-title">
                Core Lake Travis Boat Safety Guidelines
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                These essential rules ensure safe party cruises Lake Travis for every guest
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {essentialSafetyGuidelines.map((guideline, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-green-500" data-testid={`guideline-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <guideline.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{guideline.title}</h3>
                            <Badge variant="outline" className={`text-xs ${
                              guideline.priority === 'Critical' ? 'border-red-500 text-red-600' :
                              guideline.priority === 'Required' ? 'border-amber-500 text-amber-600' :
                              guideline.priority === 'Essential' ? 'border-green-500 text-green-600' :
                              'border-blue-500 text-blue-600'
                            }`}>{guideline.priority}</Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{guideline.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Captain Credentials */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900" data-testid="captain-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-blue-100 text-blue-700">PROFESSIONAL CREW</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="captain-title">
                  USCG Licensed Captains for Lake Travis Boat Safety
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Every safe party cruises Lake Travis experience is led by a fully licensed, trained professional. Our captains are the foundation of our perfect party boat safety Lake Travis record.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {captainCredentials.map((cred, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                      <cred.icon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{cred.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{cred.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage1}
                  alt="Party boat safety Lake Travis - professional USCG licensed captain ensuring guest safety"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-captain"
                />
              </m.div>
            </div>
          </div>
        </section>

        {/* Pre-Party Checklist */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="checklist-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">PRE-PARTY PREP</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="checklist-title">
                Lake Travis Boat Safety Pre-Party Checklist
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Complete these steps before your safe party cruises Lake Travis departure
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prePartyChecklist.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`checklist-item-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Swimming Safety */}
        <section className="py-16 bg-blue-50 dark:bg-gray-800" data-testid="swimming-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage2}
                  alt="Lake Travis boat safety swimming stop - guests safely enjoying water with life jackets and floats"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-swimming"
                />
              </m.div>
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-blue-100 text-blue-700">SWIMMING SAFETY</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="swimming-title">
                  Safe Party Cruises Lake Travis Swimming Guidelines
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Swimming stops are highlights of party boat safety Lake Travis experiences. Follow these guidelines for safe, fun water activities.
                </p>
                <ul className="space-y-3">
                  {swimmingSafetyTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </m.div>
            </div>
          </div>
        </section>

        {/* Emergency Procedures */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="emergency-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-red-100 text-red-700">EMERGENCY PREPAREDNESS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="emergency-title">
                Party Boat Safety Lake Travis Emergency Procedures
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our Lake Travis boat safety protocols include comprehensive emergency response procedures
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {emergencyProcedures.map((proc, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-red-500" data-testid={`emergency-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <proc.icon className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">{proc.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{proc.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Boat Safety Features */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">OUR FLEET</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="boats-title">
                Lake Travis Boat Safety Features by Vessel
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Every boat in our fleet meets the highest party boat safety Lake Travis standards
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boatSafetyFeatures.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`boat-card-${index}`}>
                    <CardHeader className="bg-green-600 text-white">
                      <CardTitle className="flex items-center justify-between">
                        <span>{boat.boat}</span>
                        <Ship className="h-6 w-6" />
                      </CardTitle>
                      <p className="text-green-100">{boat.capacity}</p>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{boat.description}</p>
                      <ul className="space-y-2">
                        {boat.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage3}
              alt="Safe party cruises Lake Travis - happy guests on safe boat party with proper safety equipment"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-party"
            />
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
              <Badge className="mb-4 bg-green-100 text-green-700">SAFETY FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">
                Frequently Asked Questions About Lake Travis Boat Safety
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about our safe party cruises Lake Travis and party boat safety Lake Travis guidelines
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold mb-4" data-testid="links-title">
                Explore More Safe Party Cruises Lake Travis Options
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Learn more about our Lake Travis boat safety and party cruise offerings
              </p>
            </m.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-green-500" data-testid={`link-card-${index}`}>
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <link.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="font-medium text-sm">{link.label}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready for a Safe Lake Travis Boat Party?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Join the 125,000+ guests who've enjoyed our party boat safety Lake Travis experience. 14+ years of safe party cruises Lake Travis await you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 font-bold text-lg px-8"
                  data-testid="button-cta-quote"
                >
                  <Link href="/book-now">Get Your Safe Cruise Quote</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-bold text-lg px-8"
                  data-testid="button-cta-contact"
                >
                  <Link href="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    Questions? Contact Us
                  </Link>
                </Button>
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
