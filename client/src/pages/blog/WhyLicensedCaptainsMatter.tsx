import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Shield, Users, Anchor, Phone, Clock, CheckCircle2, 
  AlertTriangle, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Ship, Heart, Navigation,
  BadgeCheck, FileCheck, LifeBuoy, UserCheck, Scale
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/day tripper-1 party boat with captain austin_1763968078449.jpg';
import sectionImage1 from '@assets/clever-girl-7-flagship-boat.jpg';
import sectionImage2 from '@assets/clever-girl-1-lake-travis-party-boat.jpg';
import sectionImage3 from '@assets/@capitalcityshots-24_1760080807866.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const captainStats = [
  { stat: '15+', label: 'Years Experience' },
  { stat: '100%', label: 'Safety Record' },
  { stat: 'USCG', label: 'Licensed Captains' },
  { stat: '5-Star', label: 'Google Rating' }
];

const captainResponsibilities = [
  {
    icon: Navigation,
    title: 'Navigational Safety',
    description: 'Expert navigation through crowded coves, managing boat traffic, and selecting safe swim spots on Lake Travis'
  },
  {
    icon: Waves,
    title: 'Weather Monitoring',
    description: 'Constant monitoring of weather and water conditions to ensure safe party cruises even when conditions change'
  },
  {
    icon: LifeBuoy,
    title: 'Swim Stop Management',
    description: 'Safe management of swimming activities, floating equipment, and guest re-boarding procedures'
  },
  {
    icon: Scale,
    title: 'Law Enforcement',
    description: 'Ensuring compliance with BYOB rules, no-glass policies, and all Lake Travis boating regulations'
  }
];

const captainBenefits = [
  {
    icon: BadgeCheck,
    title: 'USCG Licensed',
    description: 'All our captains hold valid US Coast Guard licenses, the highest standard for commercial vessel operation'
  },
  {
    icon: FileCheck,
    title: 'First Aid Certified',
    description: 'CPR and first aid training ensures quick response to any medical situation during your party cruise'
  },
  {
    icon: MapPin,
    title: 'Local Lake Expertise',
    description: 'Years of Lake Travis experience means knowing every cove, hazard, and the best spots for your celebration'
  },
  {
    icon: UserCheck,
    title: 'Background Checked',
    description: 'Full background verification for your peace of mind and the safety of all guests aboard'
  }
];

const eventTypes = [
  { name: 'Bachelor Parties', href: '/bachelor-party-austin', icon: Users },
  { name: 'Bachelorette Parties', href: '/bachelorette-party-austin', icon: Heart },
  { name: 'Birthday Celebrations', href: '/birthday-parties', icon: Star },
  { name: 'Corporate Events', href: '/corporate-events', icon: Building2 }
];

const faqs = [
  {
    question: 'Why are licensed captains required on Lake Travis party boats?',
    answer: 'Licensed captains are essential for Lake Travis party boats because they ensure navigational safety, monitor weather conditions, manage swim stops safely, enforce boating laws, and coordinate timing to keep events on schedule. Their expertise prevents accidents and legal issues that could ruin your celebration.'
  },
  {
    question: 'What qualifications do Premier Party Cruises captains have?',
    answer: 'All Premier Party Cruises captains hold valid US Coast Guard (USCG) licenses, are CPR and first aid certified, have years of Lake Travis experience, and have passed full background checks. They receive ongoing training in safety procedures and customer service.'
  },
  {
    question: 'How do licensed captains keep parties fun while maintaining safety?',
    answer: 'Professional captains make parties better by setting clear expectations early, managing swim stops smoothly, preventing disruptive behavior, and keeping energy high without crossing safety lines. Our 100% safety record proves you can have incredible fun responsibly.'
  },
  {
    question: 'What happens if weather conditions change during our cruise?',
    answer: 'Licensed captains continuously monitor weather and water conditions. If conditions become unsafe, they make the call to adjust routes or return to the marina. Your captain has final authority on all safety decisions - this protects everyone aboard.'
  },
  {
    question: 'Are unlicensed boat rentals legal on Lake Travis?',
    answer: 'While some bareboat rentals exist, they come with significant risks. You become responsible for navigation, safety, and legal compliance. Licensed captains reduce liability exposure for hosts and planners, handle emergencies professionally, and ensure compliance with all regulations.'
  },
  {
    question: 'How does having a professional captain benefit out-of-town groups?',
    answer: 'Out-of-town groups particularly benefit because they don\'t know Lake Travis water conditions, marina traffic patterns, local boating rules, or weather volatility. Licensed captains guide the entire experience from arrival to return, eliminating all guesswork.'
  },
  {
    question: 'What is BYOB and how do captains help with alcohol compliance?',
    answer: 'BYOB (Bring Your Own Beverage) is permitted on Lake Travis party boats. Licensed captains understand BYOB laws, enforce no-glass container rules, and maintain compliance with USCG and local regulations. We also partner with Party On Delivery for convenient, compliant alcohol delivery.'
  },
  {
    question: 'Why do professionally captained boats cost more?',
    answer: 'Licensed captains reduce risk of cancellation, injury, law enforcement issues, and itinerary failures. When you factor in DJ coordination, professional crew, safety equipment, and experience management, Premier Party Cruises often ends up being more cost-effective than DIY options.'
  }
];

const internalLinks = [
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Star },
  { href: '/bachelor-party-austin', label: 'Bachelor Parties', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/blogs/lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises', label: 'Safety Guidelines', icon: Shield },
  { href: '/contact', label: 'Contact Us', icon: Phone }
];

export default function WhyLicensedCaptainsMatter() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Why Licensed Captains Matter for Lake Travis Party Boats | Premier Party Cruises</title>
        <meta name="description" content="Discover why licensed captains are essential for Lake Travis party boats. Learn how professional crews ensure safe, legal, stress-free bachelor parties, bachelorette parties, and celebrations on the water." />
        <meta name="keywords" content="Lake Travis party boat captain, licensed boat captain Austin, Lake Travis boat safety, party boat crew, USCG licensed captain, Lake Travis bachelor party, bachelorette party boat Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/why-licensed-captains-matter-lake-travis-party-boats" />
        <meta property="og:title" content="Why Licensed Captains Matter for Lake Travis Party Boats" />
        <meta property="og:description" content="The overlooked detail that makes or breaks your entire Lake Travis party boat experience. Learn why professional captains are essential for bachelor parties, bachelorette parties, and celebrations." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="why-licensed-captains-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-teal-800 to-green-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Licensed captain operating Lake Travis party boat with professional crew ensuring safe celebration"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-green-400 text-black font-bold" data-testid="badge-hero">
              <Shield className="h-4 w-4 mr-1 inline" />
              100% Safety Record
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Why Licensed Captains Matter<br />
              <span className="text-green-400">for Lake Travis Party Boats</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              The overlooked detail that makes or breaks your entire celebration. Licensed captains aren't a formality—they're the foundation of everything that makes a Lake Travis party cruise fun, safe, legal, and stress-free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/quote">Get Your Free Quote</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-900 font-semibold"
                data-testid="button-contact"
              >
                <Link href="/contact">Questions? Contact Us</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Captain Stats */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {captainStats.map((item, index) => (
                <motion.div
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why This Matters Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="why-matters-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FOR EVENT PLANNERS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="why-matters-title">
                Why This Matters for Group Event Planners
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                When you're planning a high-stakes group experience, professional operation makes all the difference
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {eventTypes.map((event, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link href={event.href}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-blue-500" data-testid={`event-card-${index}`}>
                      <CardContent className="pt-6 text-center">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <event.icon className="h-7 w-7 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{event.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Professional captained experiences</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">You're Not Just Planning a Boat Ride</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You're planning a high-stakes group experience where guests are counting on you, schedules are tight, 
                    alcohol is involved, and safety and legality matter. Failure is expensive and embarrassing. This is 
                    exactly why Premier Party Cruises operates only captained, professionally crewed party boats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage1}
              alt="Clever Girl flagship party boat with professional captain and crew on Lake Travis ready for celebrations"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-flagship"
            />
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-sm">
              Our flagship Clever Girl with professional captain ready for your Lake Travis celebration
            </p>
          </div>
        </section>

        {/* What Captains Do Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="responsibilities-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-teal-100 text-teal-700">CAPTAIN RESPONSIBILITIES</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="responsibilities-title">
                What Licensed Captains Actually Do
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A licensed captain is not just "someone who drives the boat" — they're responsible for your entire experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {captainResponsibilities.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-teal-500" data-testid={`responsibility-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                        <item.icon className="h-7 w-7 text-teal-600" />
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

        {/* Captain Benefits */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="benefits-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">QUALIFICATIONS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="benefits-title">
                Premier Party Cruises Captain Standards
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Every captain meets rigorous qualifications for your safety and peace of mind
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {captainBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`benefit-card-${index}`}>
                    <CardContent className="pt-6">
                      <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Section 2 */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage2}
              alt="Lake Travis party boat with guests enjoying safe swim stop managed by professional crew"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-party"
            />
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-sm">
              Professional crew ensures safe, fun experiences for all guests
            </p>
          </div>
        </section>

        {/* Out of Town Groups */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-900" data-testid="out-of-town-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-purple-100 text-purple-700">OUT-OF-TOWN GROUPS</Badge>
                <h2 className="text-3xl font-bold mb-6">
                  Why Out-of-Town Groups Benefit Most from Licensed Captains
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  If you're flying into Austin for a bachelor party, bachelorette party, or celebration, you don't know:
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Lake Travis water conditions and depth variations',
                    'Marina traffic patterns and busy times',
                    'Local boating rules and regulations',
                    'Weather volatility in the Texas Hill Country'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  Our licensed captains guide the entire experience, from arrival to return. This is why out-of-town 
                  planners consistently choose Premier Party Cruises for destination celebrations.
                </p>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage3}
                  alt="Group celebrating on Lake Travis party boat with Austin skyline in background"
                  className="rounded-2xl shadow-xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* BYOB & Party On Delivery Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="byob-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">BYOB MADE EASY</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Licensed Captains + Compliant Alcohol = Stress-Free Celebration
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Alcohol is one of the biggest stress points for group planners. That's why we partner with 
                <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">Party On Delivery</a> 
                to make BYOB simple and legal.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Legal Ordering', description: 'Order alcohol in advance through approved delivery services' },
                { title: 'No Hauling', description: 'Avoid lugging cases through marinas in the Texas heat' },
                { title: 'Stay Compliant', description: 'Licensed captains ensure BYOB rules are followed' },
                { title: 'Focus on Fun', description: 'Skip errands and focus on celebrating with your group' }
              ].map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-10 w-10 text-amber-600 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection 
          title="Ready to Plan Your Captained Party Cruise?"
          subtitle="Get a personalized quote for your Lake Travis celebration with professional captain and crew included"
          theme="gold"
        />

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions About Licensed Captains
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400" data-testid={`faq-content-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="related-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Learn more about our professionally captained Lake Travis experiences
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer hover:border-blue-500">
                    <CardContent className="pt-4 pb-4 text-center">
                      <link.icon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-900 to-teal-800 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Bottom Line: Licensed Captains Are Celebration Insurance
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              If your goal is zero hassle, zero stress, maximum fun, and minimal risk—then licensed 
              captains aren't optional. They're essential for the safest, smoothest, most fun way to 
              party on Lake Travis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100 font-bold text-lg px-8"
              >
                <Link href="/quote">Get Your Free Quote</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold"
              >
                <a href="tel:512-488-5892">Call 512-488-5892</a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
