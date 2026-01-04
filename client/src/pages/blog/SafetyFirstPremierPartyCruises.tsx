import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  Ship, Users, Shield, Phone, Clock, CheckCircle2, 
  Heart, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Anchor, LifeBuoy,
  BadgeCheck, ShieldCheck, AlertCircle, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SEOHead from '@/components/SEOHead';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';

import heroImage from '@assets/@capitalcityshots-20_1760080740021.jpg';
import sectionImage1 from '@assets/@capitalcityshots-21_1760080807864.jpg';
import sectionImage2 from '@assets/@capitalcityshots-10_1760080740019.jpg';
import sectionImage3 from '@assets/@capitalcityshots-11_1760080740019.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const safetyHighlights = [
  { 
    icon: Shield, 
    title: 'Perfect Safety Record', 
    description: '14+ years and 125,000+ guests with zero major incidents',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: BadgeCheck, 
    title: 'Coast Guard Certified', 
    description: 'All captains are USCG licensed professionals',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Heart, 
    title: 'First Aid & CPR Trained', 
    description: 'Every crew member certified in emergency response',
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  { 
    icon: ShieldCheck, 
    title: 'Fully Insured', 
    description: 'Complete liability coverage for your peace of mind',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const safetyEquipment = [
  { item: 'Life jackets for all guests', icon: LifeBuoy },
  { item: 'AED defibrillators on board', icon: Zap },
  { item: 'Fire extinguishers', icon: AlertCircle },
  { item: 'First aid kits', icon: Heart },
  { item: 'Emergency communication equipment', icon: Phone },
  { item: 'Navigation safety lights', icon: Ship }
];

const safetyStats = [
  { stat: '14+', label: 'Years of Safe Operations' },
  { stat: '125,000+', label: 'Happy Guests Served' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Review Rating' }
];

const faqs = [
  {
    question: 'What happens if someone gets seasick on the boat?',
    answer: 'Lake Travis boat safety is our priority. Lake Travis has calm waters compared to the ocean, so seasickness is rare. However, our trained crew knows how to help if anyone feels unwell. We recommend guests prone to motion sickness take preventive measures before boarding. Our safe party boat Austin experience is designed for comfort.'
  },
  {
    question: 'Are life jackets provided for non-swimmers?',
    answer: 'Absolutely! Our premier party cruises safety protocols include providing adult life jackets for all guests. We strongly encourage non-swimmers to wear life jackets throughout the cruise. This is part of our Austin boat rental safety record - we take every precaution to ensure guest safety.'
  },
  {
    question: 'What happens if the weather turns bad during our cruise?',
    answer: 'Our Coast Guard certified captains closely monitor weather conditions. If conditions become unsafe, we will dock at a safe location. Your safety always comes first with our Lake Travis boat safety standards. We offer full rescheduling or refunds for weather-related cancellations.'
  },
  {
    question: 'How do you ensure safe party boat Austin experiences?',
    answer: 'Our safe party boat Austin reputation comes from rigorous safety protocols: Coast Guard certified captains, first aid trained crew, regular equipment inspections, comprehensive insurance, and 14+ years of operational excellence. Every aspect of premier party cruises safety is carefully managed.'
  },
  {
    question: 'Can children come on the cruise? Is it safe?',
    answer: 'Yes, families are welcome! Our Austin boat rental safety record extends to all ages. We require parents to bring infant/child-sized life jackets. Our crew pays extra attention when children are aboard. Lake Travis boat safety is maintained at the highest standards for all guests.'
  },
  {
    question: 'Are your boats inspected regularly?',
    answer: 'Yes, all our vessels undergo regular Coast Guard inspections and maintenance checks. This commitment to safety is why we have a perfect Austin boat rental safety record. Premier party cruises safety means never cutting corners on equipment or vessel maintenance.'
  },
  {
    question: 'What insurance coverage do you have?',
    answer: 'We carry comprehensive liability insurance that covers all guests during their cruise. This is essential for corporate events and gives event planners peace of mind. Our Lake Travis boat safety standards include full insurance protection for every voyage.'
  },
  {
    question: 'How experienced are your captains?',
    answer: 'All our captains are U.S. Coast Guard certified with extensive Lake Travis experience. They know every cove, shallow area, and safe anchoring spot. This expertise is fundamental to our safe party boat Austin reputation and premier party cruises safety commitment.'
  }
];

const corporateBenefits = [
  {
    title: 'HR & Legal Comfort',
    description: 'Our perfect Austin boat rental safety record and comprehensive insurance give HR and legal teams confidence in approving team events.',
    icon: Building2
  },
  {
    title: 'Liability Protection',
    description: 'Full liability coverage means your company is protected. Our Lake Travis boat safety standards exceed industry requirements.',
    icon: ShieldCheck
  },
  {
    title: 'Risk Management',
    description: 'Coast Guard certified captains and first aid trained crew demonstrate due diligence for safe party boat Austin corporate events.',
    icon: Shield
  },
  {
    title: 'Documentation Available',
    description: 'We provide certificates of insurance and safety documentation for premier party cruises safety verification by your organization.',
    icon: BadgeCheck
  }
];

export default function SafetyFirstPremierPartyCruises() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        pageRoute="/blogs/safety-first-how-premiers-perfect-record-and-first-aid-training-set-us-apart"
        defaultTitle="Party Boat Safety | Lake Travis Austin | Premier Cruises"
        defaultDescription="Premier Party Cruises' perfect safety record: Coast Guard certified captains, first aid trained crew, and 125,000+ guests safely served on Lake Travis."
        defaultKeywords={[
          'safe party boat Austin',
          'Lake Travis boat safety',
          'Austin boat rental safety record',
          'premier party cruises safety',
          'Coast Guard certified boat rental',
          'party boat safety Texas',
          'Lake Travis party cruise insurance'
        ]}
        article={{
          publishedTime: '2024-01-15T08:00:00Z',
          modifiedTime: '2025-01-02T08:00:00Z',
          author: 'Premier Party Cruises',
          section: 'Safety',
          tags: ['safe party boat Austin', 'Lake Travis boat safety', 'Austin boat rental safety record', 'premier party cruises safety']
        }}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-green-900 via-green-800 to-slate-900 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-green-600 font-bold" data-testid="badge-safety">
              SAFETY EXCELLENCE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Safety First! How Premier's Perfect Record & First Aid Training Set Us Apart
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Your Safe Party Boat Austin Experience Starts Here
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              14+ years, 125,000+ guests, and a perfect Lake Travis boat safety record. Discover why premier party cruises safety is our #1 priority.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-100 text-green-600 font-bold text-lg px-8 py-6"
                  data-testid="button-book-safe-cruise"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Book Your Safe Cruise
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                  data-testid="button-view-cruises"
                >
                  View Private Cruises
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Hero Image with Alt Text */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <img 
              src={heroImage} 
              alt="Premier Party Cruises safety boat Lake Travis Austin Coast Guard certified captain"
              className="w-full h-auto rounded-xl shadow-2xl"
              data-testid="image-hero-safety"
            />
          </div>
        </section>

        {/* Safety Highlights Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Safe Party Boat Austin Guests Choose Us</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our Austin boat rental safety record speaks for itself. Here's what makes premier party cruises safety unmatched on Lake Travis.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-green-200">
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
        <section className="py-12 bg-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {safetyStats.map((item, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{item.stat}</div>
                  <div className="text-green-100">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: Perfect Safety Record */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-green-100 text-green-700">14+ YEARS OF EXCELLENCE</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  14+ Years, 125,000+ Guests, Perfect Austin Boat Rental Safety Record
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  When you're looking for a safe party boat Austin experience, our track record matters. Since 2010, Premier Party Cruises has safely transported over 125,000 guests on Lake Travis. Our Lake Travis boat safety protocols have earned us a perfect safety record.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  This Austin boat rental safety record isn't just luck—it's the result of rigorous training, professional crews, and an unwavering commitment to premier party cruises safety. Every cruise, every guest, every time.
                </p>
                <ul className="space-y-3">
                  {['Zero major incidents in 14+ years', 'Professional crew on every voyage', 'Regular safety audits and training', 'Industry-leading safety protocols'].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage1} 
                  alt="Safe party boat Austin Texas Lake Travis crew first aid training"
                  className="rounded-xl shadow-2xl w-full"
                  data-testid="image-section-1"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Coast Guard Certified Captains */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="order-2 lg:order-1"
              >
                <img 
                  src={sectionImage2} 
                  alt="Lake Travis boat rental safety equipment premier party cruises Austin"
                  className="rounded-xl shadow-2xl w-full"
                  data-testid="image-section-2"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="order-1 lg:order-2"
              >
                <Badge className="mb-4 bg-blue-100 text-blue-700">LICENSED PROFESSIONALS</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Coast Guard Certified Captains for Your Safe Party Boat Austin Experience
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Every safe party boat Austin cruise is commanded by a U.S. Coast Guard certified captain. These aren't weekend hobbyists—they're licensed professionals with extensive Lake Travis boat safety experience who know every cove, current, and condition on the water.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Our captains undergo rigorous training and must maintain their certifications through ongoing education. This commitment to excellence is why our Austin boat rental safety record remains perfect year after year.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-3">Captain Certifications Include:</h4>
                  <ul className="space-y-2">
                    {['U.S. Coast Guard Master Captain License', 'Advanced navigation and safety training', 'Annual recertification requirements', 'Lake Travis specific expertise'].map((cert, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-blue-600" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 3: First Aid & CPR Training */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-red-100 text-red-700">EMERGENCY READY</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  First Aid & CPR Trained Crew: Premier Party Cruises Safety Excellence
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Beyond just navigating the water, every crew member at Premier Party Cruises is trained in first aid and CPR. This Lake Travis boat safety measure ensures that if any medical situation arises, our team can respond immediately and effectively.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Our premier party cruises safety commitment means we're prepared for anything. From minor scrapes to more serious emergencies, your safe party boat Austin experience includes trained professionals who can help until additional medical assistance arrives.
                </p>
                <ul className="space-y-3">
                  {['Certified first aid training for all crew', 'CPR/AED certification current', 'Regular emergency drill practice', 'Direct communication with emergency services'].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage3} 
                  alt="Austin party boat safety record life jackets premier party cruises"
                  className="rounded-xl shadow-2xl w-full"
                  data-testid="image-section-3"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Safety Equipment Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">FULLY EQUIPPED</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Safety Equipment: Lake Travis Boat Safety Standards Exceeded
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our safe party boat Austin vessels are equipped with comprehensive safety gear that exceeds Coast Guard requirements. Austin boat rental safety record excellence requires top-tier equipment.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyEquipment.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <span className="font-medium">{item.item}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance & Liability Section */}
        <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-white/10 text-white border-white/20">PEACE OF MIND</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Insurance & Liability: Your Austin Boat Rental Safety Record Protection
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Premier party cruises safety extends beyond physical measures to comprehensive insurance coverage. We carry full liability insurance that protects every guest on every safe party boat Austin cruise.
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  This Lake Travis boat safety coverage gives you peace of mind, especially for corporate events where liability concerns are paramount. Our Austin boat rental safety record is backed by financial protection.
                </p>
                <div className="space-y-4">
                  {['Full liability coverage for all guests', 'Certificates of insurance available on request', 'Corporate event documentation ready', 'Exceeds industry insurance standards'].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-green-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-center">Coverage Highlights</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold text-green-400 mb-2">$2M+</div>
                    <div className="text-gray-300">Liability Coverage</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                    <div className="text-gray-300">Guest Protection</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold text-green-400 mb-2">Instant</div>
                    <div className="text-gray-300">Documentation Available</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Corporate Events Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">CORPORATE READY</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Safe Party Boat Austin Matters for Corporate Events
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                HR directors and event planners choose Premier Party Cruises because our Lake Travis boat safety standards meet corporate liability requirements.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {corporateBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/corporate-events">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-corporate-events">
                  <Building2 className="mr-2 h-5 w-5" />
                  Learn About Corporate Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore Our Safe Party Boat Austin Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Every cruise type benefits from our Austin boat rental safety record and premier party cruises safety protocols.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Team Building', href: '/team-building', icon: Users, description: 'Safe corporate team events on Lake Travis' },
                { title: 'Private Cruises', href: '/private-cruises', icon: Anchor, description: 'Exclusive safe party boat Austin experiences' },
                { title: 'Corporate Events', href: '/corporate-events', icon: Building2, description: 'Professional Lake Travis boat safety' },
                { title: 'ATX Disco Cruise', href: '/atx-disco-cruise', icon: Star, description: 'Fun with premier party cruises safety' }
              ].map((link, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link href={link.href}>
                    <Card 
                      className="h-full hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-300 hover:-translate-y-1"
                      data-testid={`link-${link.href.replace('/', '')}`}
                    >
                      <CardContent className="pt-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                          <link.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{link.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{link.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">FAQS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Safe Party Boat Austin: Your Questions Answered
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Get answers about Lake Travis boat safety and our Austin boat rental safety record.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="w-full space-y-4" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border rounded-lg px-6 bg-gray-50 dark:bg-gray-800"
                >
                  <AccordionTrigger 
                    className="text-left font-semibold hover:no-underline py-4"
                    data-testid={`faq-trigger-${index}`}
                  >
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

        {/* Quote Builder CTA */}
        <QuoteBuilderSection />

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready for Your Safe Party Boat Austin Experience?
              </h2>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                Join the 125,000+ guests who have enjoyed our Lake Travis boat safety excellence. Book today and experience why our Austin boat rental safety record is unmatched.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button 
                    size="lg" 
                    className="bg-white hover:bg-gray-100 text-green-600 font-bold text-lg px-8 py-6"
                    data-testid="button-book-now-cta"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Book Your Safe Cruise Now
                  </Button>
                </Link>
                <Link href="tel:512-488-5892">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                    data-testid="button-call-now"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 488-5892
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
