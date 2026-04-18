import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Shield, Users, LifeBuoy, Phone, Clock, CheckCircle2, 
  AlertTriangle, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Anchor, Ship, Heart,
  Sun, Thermometer, CloudRain, Eye, Radio, Siren
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-24_1760080807866.jpg';
import sectionImage1 from '@assets/@capitalcityshots-25_1760080807866.jpg';
import sectionImage2 from '@assets/@capitalcityshots-26_1760080807866.jpg';
import PublicNavigationLuxury from '@/components/PublicNavigationLuxury';
import Footer from '@/components/Footer';

const safetyStats = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '125,000+', label: 'Safe Passengers' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const safetyEquipment = [
  {
    icon: LifeBuoy,
    title: 'USCG-Approved Life Jackets',
    description: 'Life jackets for all passengers including children\'s sizes - essential Lake Travis boat safety equipment on every party cruise'
  },
  {
    icon: Siren,
    title: 'Emergency Equipment',
    description: 'Fire extinguishers, first aid kits, and emergency signals aboard all safe party cruises Lake Travis vessels'
  },
  {
    icon: Radio,
    title: 'Marine Radio',
    description: 'VHF marine radio for emergency communication - part of our comprehensive boat party safety guidelines'
  },
  {
    icon: Eye,
    title: 'Navigation Lights',
    description: 'Full lighting systems for sunset and evening cruises following Lake Travis boating safety regulations'
  }
];

const captainQualifications = [
  { title: 'USCG Licensed', description: 'All captains hold valid US Coast Guard licenses for Lake Travis boat safety' },
  { title: 'First Aid Certified', description: 'CPR and first aid training for emergency response during party cruises' },
  { title: 'Local Expertise', description: 'Years of Lake Travis experience knowing every cove and condition' },
  { title: 'Background Checked', description: 'Full background verification for your safe party cruises Lake Travis experience' }
];

const guestSafetyRules = [
  {
    icon: CheckCircle2,
    title: 'Listen to Captain Instructions',
    description: 'Your captain\'s instructions are crucial for Lake Travis boat safety - follow them at all times'
  },
  {
    icon: Users,
    title: 'Supervise Children',
    description: 'Parents must supervise minors at all times - a key boat party safety guideline for family events'
  },
  {
    icon: AlertTriangle,
    title: 'No Glass Containers',
    description: 'Glass is prohibited on all vessels - plastic and cans only for safe party cruises Lake Travis'
  },
  {
    icon: LifeBuoy,
    title: 'Swim Responsibly',
    description: 'Stay near the boat during swimming stops and follow Lake Travis boating safety protocols'
  },
  {
    icon: Waves,
    title: 'Move Carefully',
    description: 'Use handrails and move carefully when boat is in motion - essential party boat safety rules'
  },
  {
    icon: Sun,
    title: 'Sun Protection',
    description: 'Bring sunscreen and stay hydrated - part of responsible Lake Travis boat safety practices'
  }
];

const weatherSafety = [
  {
    icon: Sun,
    title: 'Hot Weather Protocol',
    description: 'We ensure hydration breaks and shaded areas during hot Texas days for safe party cruises Lake Travis'
  },
  {
    icon: CloudRain,
    title: 'Storm Monitoring',
    description: 'We monitor weather constantly and will reschedule if conditions threaten Lake Travis boat safety'
  },
  {
    icon: Thermometer,
    title: 'Temperature Considerations',
    description: 'Our captains adjust routes and activities based on conditions following boat party safety guidelines'
  },
  {
    icon: Waves,
    title: 'Water Conditions',
    description: 'Lake levels and wave conditions are checked before every safe party cruises Lake Travis departure'
  }
];

const swimmingSafety = [
  { rule: 'Always swim with a buddy - never alone during Lake Travis boat party stops' },
  { rule: 'Stay within designated swimming areas marked by the captain' },
  { rule: 'Use floats properly and don\'t exceed weight limits - key Lake Travis boating safety rule' },
  { rule: 'Avoid swimming if intoxicated - essential boat party safety guidelines advice' },
  { rule: 'Re-board the boat carefully using the ladder with assistance' },
  { rule: 'Listen for the captain\'s whistle signaling return to vessel' }
];

const emergencyProcedures = [
  { step: '1', title: 'Alert Captain Immediately', description: 'Report any emergency to the captain - trained in Lake Travis boat safety protocols' },
  { step: '2', title: 'Follow Instructions', description: 'Captain will direct all passengers according to boat party safety guidelines' },
  { step: '3', title: 'Use Safety Equipment', description: 'Life jackets and emergency gear located as briefed before departure' },
  { step: '4', title: 'Stay Calm', description: 'Our trained crew handles emergencies for safe party cruises Lake Travis' }
];

const faqs = [
  {
    question: 'What Lake Travis boat safety equipment is on board?',
    answer: 'All our party boats are equipped with USCG-approved life jackets for all ages, fire extinguishers, first aid kits, VHF marine radios, navigation lights, throwable flotation devices, and emergency signals. Our Lake Travis boat safety equipment exceeds Texas state requirements for safe party cruises Lake Travis.'
  },
  {
    question: 'Are your captains trained in safety procedures?',
    answer: 'Yes! All captains hold valid USCG licenses, are CPR and first aid certified, and have years of Lake Travis experience. They receive ongoing training in boat party safety guidelines and emergency procedures. Our 100% safety record reflects their expertise.'
  },
  {
    question: 'What are the main party boat safety rules for guests?',
    answer: 'Key boat party safety guidelines include: listen to captain instructions, no glass containers, supervise children at all times, move carefully when boat is in motion, swim responsibly during stops, and stay hydrated. These party boat safety rules protect everyone for a great experience.'
  },
  {
    question: 'How do you handle bad weather for Lake Travis boating safety?',
    answer: 'We monitor weather conditions constantly. If conditions pose any risk to Lake Travis boat safety, we offer full rescheduling or refunds. Your captain makes the final call on departure - safety always comes first for safe party cruises Lake Travis.'
  },
  {
    question: 'Is swimming during the cruise safe?',
    answer: 'Swimming is a highlight of Lake Travis party cruises! We follow strict swimming boat party safety guidelines: designated swim areas, buddy system encouraged, proper use of floats, and captain supervision. Swimming under the influence is discouraged for Lake Travis boating safety.'
  },
  {
    question: 'What happens in case of a medical emergency?',
    answer: 'Our captains are first aid certified and have marine radios to contact emergency services. Lake Travis is well-covered by emergency responders. We carry first aid supplies and know the quickest routes to shore. Lake Travis boat safety is our top priority.'
  },
  {
    question: 'Are life jackets required to be worn?',
    answer: 'Life jackets are available for all passengers. Texas law requires children under 13 to wear them while underway. Adults may choose to wear them. During swimming, floatation devices are recommended per our boat party safety guidelines.'
  },
  {
    question: 'What makes your safety record 100%?',
    answer: 'Our perfect Lake Travis boat safety record comes from experienced captains, properly maintained vessels, comprehensive safety briefings, and strict adherence to boat party safety guidelines. After 14+ years and 125,000+ guests, we\'re proud of our safe party cruises Lake Travis reputation.'
  }
];

const internalLinks = [
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/blogs/lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events', label: 'Insurance Coverage', icon: Shield },
  { href: '/bachelor-party-austin', label: 'Bachelor Parties', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/faq', label: 'General FAQ', icon: AlertTriangle },
  { href: '/contact', label: 'Contact Us', icon: Phone }
];

export default function LakeTravisBoatSafety() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        slug="lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises"
        defaultTitle="Lake Travis Boat Safety - Essential Guidelines for Safe Party Cruises | Premier Party Cruises"
        defaultDescription="Essential Lake Travis boat safety guidelines for party cruises. Learn boat party safety guidelines, party boat safety rules, and Lake Travis boating safety protocols. 100% safety record, 125,000+ safe passengers."
        defaultKeywords={['Lake Travis boat safety', 'boat party safety guidelines', 'safe party cruises Lake Travis', 'party boat safety rules', 'Lake Travis boating safety', 'boat party safety Texas', 'Lake Travis cruise safety']}
        image={heroImage}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-boat-safety-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis boat safety - professional captain ensuring safe party cruise with safety equipment visible"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-green-400 text-black font-bold" data-testid="badge-hero">
              <Shield className="h-4 w-4 mr-1 inline" />
              100% Safety Record
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Boat Safety<br />
              <span className="text-green-400">Essential Guidelines for Safe Party Cruises</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Your complete guide to boat party safety guidelines and Lake Travis boating safety. Learn our party boat safety rules that have kept 125,000+ guests safe over 14+ years of safe party cruises Lake Travis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Book Your Safe Cruise</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                data-testid="button-contact"
              >
                <Link href="/contact">Questions About Safety</Link>
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
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Equipment */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="equipment-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">EQUIPMENT</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="equipment-title">
                Lake Travis Boat Safety Equipment on Every Vessel
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                All our boats exceed USCG safety requirements for safe party cruises Lake Travis
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyEquipment.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-green-500" data-testid={`equipment-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <item.icon className="h-7 w-7 text-green-600" />
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

        {/* Image Section */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage1}
              alt="Lake Travis boating safety - equipped party boat with life jackets and safety gear for safe party cruises"
              data-testid="img-equipment"
            />
          </div>
        </section>

        {/* Captain Qualifications */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900" data-testid="captain-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Badge className="mb-4 bg-teal-100 text-teal-700">OUR CREW</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="captain-title">
                Trained Captains for Boat Party Safety
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Every captain meets rigorous Lake Travis boat safety qualifications
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {captainQualifications.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`captain-card-${index}`}>
                    <CardContent className="pt-6">
                      <CheckCircle2 className="h-10 w-10 text-teal-600 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Guest Safety Rules */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="rules-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">GUEST GUIDELINES</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="rules-title">
                Party Boat Safety Rules for Guests
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Follow these boat party safety guidelines for the best experience
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guestSafetyRules.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`rule-card-${index}`}>
                    <CardContent className="pt-6 flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Weather Safety */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="weather-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">WEATHER PROTOCOLS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="weather-title">
                Lake Travis Boating Safety Weather Guidelines
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                How we monitor and respond to weather for safe party cruises Lake Travis
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {weatherSafety.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`weather-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-7 w-7 text-blue-600" />
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

        {/* Swimming Safety */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="swimming-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-cyan-100 text-cyan-700">SWIMMING SAFETY</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="swimming-title">
                  Boat Party Safety Guidelines for Swimming
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Swimming is a highlight of Lake Travis boat parties! Follow these party boat safety rules for a fun and safe experience:
                </p>
                <ul className="space-y-3">
                  {swimmingSafety.map((item, index) => (
                    <li key={index} className="flex items-start gap-3" data-testid={`swimming-rule-${index}`}>
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item.rule}</span>
                    </li>
                  ))}
                </ul>
              </m.div>
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage2}
                  alt="Safe party cruises Lake Travis - guests swimming safely with floats following boat party safety guidelines"
                  data-testid="img-swimming"
                />
              </m.div>
            </div>
          </div>
        </section>

        {/* Emergency Procedures */}
        <section className="py-16 bg-red-50 dark:bg-red-900/20" data-testid="emergency-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Badge className="mb-4 bg-red-100 text-red-700">EMERGENCY PROTOCOLS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="emergency-title">
                Emergency Procedures for Lake Travis Boat Safety
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our crews are trained to handle any situation quickly and safely
              </p>
            </m.div>

            <div className="grid md:grid-cols-4 gap-6">
              {emergencyProcedures.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  data-testid={`emergency-step-${index}`}
                >
                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
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
            >
              <Badge className="mb-4 bg-green-100 text-green-700">SAFETY FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">
                Frequently Asked Questions About Boat Party Safety
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about Lake Travis boat safety and safe party cruises
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
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
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-4">Explore More</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Learn more about our safe party cruises Lake Travis
              </p>
            </m.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-green-500" data-testid={`link-card-${index}`}>
                    <CardContent className="pt-6 text-center">
                      <link.icon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-teal-700 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Shield className="h-16 w-16 mx-auto mb-6 text-green-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="cta-title">
                Safety is Our Priority
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                14+ years, 125,000+ guests, 100% safety record. Experience Lake Travis boat safety at its best with safe party cruises Lake Travis. Book with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  data-testid="button-cta-quote"
                >
                  <Link href="/book-now">Book Your Safe Cruise Today</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  data-testid="button-cta-call"
                >
                  <a href="tel:5124885892">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </a>
                </Button>
              </div>
            </m.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}
