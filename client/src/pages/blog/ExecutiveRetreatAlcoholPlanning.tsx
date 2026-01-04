import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Gift, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Wine, Sparkles, Shield,
  Music, Utensils, Crown, Target, Heart, Anchor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-10_1760080740019.jpg';
import sectionImage1 from '@assets/@capitalcityshots-11_1760080740019.jpg';
import sectionImage2 from '@assets/@capitalcityshots-12_1760080740019.jpg';
import sectionImage3 from '@assets/@capitalcityshots-13_1760080740020.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const alcoholPlanningTips = [
  {
    icon: Crown,
    title: 'Professional Atmosphere',
    description: 'Balance executive retreat alcohol planning with corporate decorum for appropriate team bonding',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  {
    icon: Wine,
    title: 'Quality Over Quantity',
    description: 'Select premium beverages that reflect your company\'s standards during executive retreat alcohol coordination',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  {
    icon: Shield,
    title: 'Responsible Service',
    description: 'Professional executive retreat alcohol planning includes timing and pacing strategies',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    icon: Target,
    title: 'Team Bonding Goals',
    description: 'Use executive retreat alcohol as a tool for authentic connections, not the main event',
    color: 'text-green-600',
    bg: 'bg-green-100'
  }
];

const boatOptions = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    best: 'C-Suite retreats',
    description: 'Intimate executive retreat alcohol planning for leadership teams on single-deck pontoon with arch canopy'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    best: 'Department leadership',
    description: 'Mid-size venue for executive retreat team bonding with space for networking'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    best: 'Extended leadership teams',
    description: 'Ideal for executive retreat alcohol coordination with multiple team leads'
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    best: 'Full executive retreats',
    description: 'Our flagship single-deck pontoon with arch canopy for large corporate retreats (add\'l crew fee for 51-75)'
  }
];

const planningTimeline = [
  { time: 'Pre-Event', task: 'Assess team culture and set executive retreat alcohol guidelines aligned with company values' },
  { time: 'Day Before', task: 'Confirm beverage selections, quantities, and delivery for executive retreat coordination' },
  { time: 'Boarding', task: 'Offer welcome drinks and set professional tone for executive retreat team bonding' },
  { time: 'Main Event', task: 'Pace service to maintain professionalism while encouraging genuine connections' },
  { time: 'Final Hour', task: 'Transition to lighter refreshments for safe departures and positive lasting impressions' }
];

const professionalismTips = [
  {
    title: 'Set Clear Expectations',
    description: 'Communicate beforehand that this is a professional event with executive retreat alcohol planning that prioritizes respect'
  },
  {
    title: 'Lead by Example',
    description: 'Executive team members should model moderate consumption during executive retreat team bonding activities'
  },
  {
    title: 'Provide Quality Alternatives',
    description: 'Premium non-alcoholic options ensure all team members feel included in executive retreat celebrations'
  },
  {
    title: 'Plan Activities First',
    description: 'Structure executive retreat alcohol around activities, not the other way around'
  }
];

const whyPremier = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'How do we balance executive retreat alcohol planning with professionalism?',
    answer: 'The key to executive retreat alcohol planning is setting clear expectations beforehand. We recommend quality over quantity, timing alcohol service after initial team bonding activities, and ensuring premium non-alcoholic options are equally prominent. Our experienced crew helps maintain the right atmosphere throughout your executive retreat.'
  },
  {
    question: 'What beverages work best for executive retreat team bonding?',
    answer: 'For executive retreat alcohol coordination, we suggest curated selections of craft beers, quality wines, and signature cocktails that reflect your company\'s sophistication. Premium options like champagne for toasts or local Texas wines create memorable executive retreat moments while maintaining professionalism.'
  },
  {
    question: 'How much alcohol should we plan for an executive retreat?',
    answer: 'For executive retreat alcohol planning, estimate 2-3 drinks per person over a 3-4 hour cruise. This allows comfortable team bonding without excess. Our team helps coordinate quantities through Party On Delivery to ensure appropriate executive retreat alcohol levels.'
  },
  {
    question: 'Should we provide food with executive retreat alcohol service?',
    answer: 'Absolutely. Substantial catering is essential for responsible executive retreat alcohol planning. We recommend appetizers or full meals timed with beverage service. This supports team bonding and maintains the professional atmosphere expected at executive retreats.'
  },
  {
    question: 'What if team members don\'t drink alcohol at executive retreats?',
    answer: 'Inclusive executive retreat alcohol planning means premium non-alcoholic options are equally important. Craft mocktails, sparkling waters, and specialty sodas ensure all team members feel valued during executive retreat team bonding activities.'
  },
  {
    question: 'How do we handle executive retreat alcohol with company liability?',
    answer: 'Our BYOB policy gives you control over executive retreat alcohol planning. We provide professional captains, never serve intoxicated guests, and ensure safe transportation coordination. Many companies work with their HR teams to establish clear executive retreat guidelines.'
  },
  {
    question: 'Can we have a dry executive retreat on your boats?',
    answer: 'Yes! Many executive retreat team bonding events focus entirely on activities and views without alcohol. Our stunning Lake Travis setting creates memorable executive retreat experiences whether or not beverages include alcohol.'
  },
  {
    question: 'What time of day is best for executive retreat alcohol planning?',
    answer: 'Sunset cruises are popular for executive retreat alcohol coordination, allowing networking during golden hour. Morning cruises can be alcohol-free team building, transitioning to afternoon executive retreat celebrations with appropriate beverages.'
  }
];

const internalLinks = [
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/team-building', label: 'Team Building', icon: Users },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/blogs/company-holiday-party-lake-travis', label: 'Holiday Party Guide', icon: Gift },
  { href: '/blogs/corporate-team-building-alcohol-etiquette-guide', label: 'Corporate Alcohol Etiquette', icon: Wine },
  { href: '/quote', label: 'Get a Quote', icon: Calendar }
];

export default function ExecutiveRetreatAlcoholPlanning() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Executive Retreat Alcohol Planning: Balancing Professionalism and Team Bonding | Premier Party Cruises</title>
        <meta name="description" content="Master executive retreat alcohol planning that balances professionalism with authentic team bonding. Expert tips for corporate retreat alcohol coordination on Lake Travis. 14-75 guests welcome." />
        <meta name="keywords" content="executive retreat alcohol planning, executive retreat team bonding, corporate retreat alcohol, executive retreat coordination, professional team bonding alcohol, Lake Travis executive retreat, Austin corporate retreat alcohol, executive retreat beverages" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/executive-retreat-alcohol-planning-balancing-professionalism-and-team-bonding" />
        <meta property="og:title" content="Executive Retreat Alcohol Planning: Balancing Professionalism and Team Bonding" />
        <meta property="og:description" content="Master executive retreat alcohol planning that balances professionalism with authentic team bonding. Expert tips for corporate retreat coordination." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/executive-retreat-alcohol-planning-balancing-professionalism-and-team-bonding" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-10_1760080740019.jpg" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="executive-retreat-alcohol-planning-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Executive retreat alcohol planning on Lake Travis party boat with professional team bonding atmosphere"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              <Crown className="mr-1 h-4 w-4" />
              Executive Retreat Planning Guide
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Executive Retreat Alcohol Planning<br />
              <span className="text-amber-400">Balancing Professionalism & Team Bonding</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Navigate executive retreat alcohol planning with confidence. Create authentic team bonding experiences while maintaining the professionalism your organization demands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                data-testid="button-plan-retreat"
              >
                <Link href="/quote">Plan Your Executive Retreat</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-slate-900 font-semibold"
                data-testid="button-corporate-events"
              >
                <Link href="/corporate-events">View Corporate Options</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whyPremier.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Planning Tips Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950" data-testid="planning-tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Executive Retreat Alcohol Planning Essentials
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Master the art of executive retreat alcohol coordination that strengthens team bonds while preserving professional standards and company culture.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {alcoholPlanningTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`card-tip-${index}`}>
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${tip.bg} rounded-full flex items-center justify-center`}>
                        <tip.icon className={`h-8 w-8 ${tip.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Professionalism Balance Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-800 dark:to-gray-900" data-testid="professionalism-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-amber-100 text-amber-700">MAINTAINING PROFESSIONALISM</Badge>
                <h2 className="text-3xl font-bold mb-6">Executive Retreat Team Bonding Done Right</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Successful executive retreat alcohol planning creates space for authentic connections without compromising professional relationships. 
                  The goal is team bonding that translates back to the workplace.
                </p>
                
                <div className="space-y-4">
                  {professionalismTips.map((tip, index) => (
                    <div key={index} className="flex gap-4" data-testid={`tip-professionalism-${index}`}>
                      <CheckCircle2 className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{tip.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={sectionImage1}
                    alt="Executive retreat team bonding with professional alcohol planning on Lake Travis boat"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-white dark:bg-gray-950" data-testid="timeline-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Executive Retreat Alcohol Coordination Timeline</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Strategic timing is essential for executive retreat alcohol planning that supports team bonding goals.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {planningTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex gap-4 mb-6"
                  data-testid={`timeline-${index}`}
                >
                  <div className="flex-shrink-0 w-32 text-right">
                    <span className="font-bold text-amber-600">{item.time}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full" />
                    {index < planningTimeline.length - 1 && (
                      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-amber-200" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="text-gray-700 dark:text-gray-300">{item.task}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Choose Your Executive Retreat Venue</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Select the perfect boat for your executive retreat alcohol planning needs. All vessels are single-deck pontoons with arch canopy.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boatOptions.map((boat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-boat-${index}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Ship className="h-5 w-5 text-amber-500" />
                        {boat.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-amber-600 font-semibold mb-2">{boat.capacity}</p>
                      <p className="text-sm text-gray-500 mb-2">Best for: {boat.best}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{boat.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold" data-testid="button-view-fleet">
                <Link href="/private-cruises">View Full Fleet Details</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage2}
                  alt="Executive retreat alcohol planning success with team bonding on Lake Travis sunset cruise"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage3}
                  alt="Professional corporate retreat team enjoying executive retreat alcohol coordination on party boat"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Executive Retreat Alcohol Planning FAQs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about balancing executive retreat team bonding with professionalism.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:no-underline" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* Internal Links Section */}
        <section className="py-16 bg-white dark:bg-gray-950" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Corporate Event Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Discover our complete range of corporate and executive retreat services.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internalLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link href={link.href}>
                    <Card className="h-full hover:shadow-lg transition-all hover:border-amber-300 cursor-pointer group" data-testid={`link-card-${index}`}>
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                          <link.icon className="h-6 w-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
                            {link.label}
                          </h3>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
