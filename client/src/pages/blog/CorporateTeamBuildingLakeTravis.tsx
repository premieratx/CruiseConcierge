import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-12_1760080740019.jpg';
import sectionImage1 from '@assets/@capitalcityshots-13_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-14_1760080740020.jpg';
import sectionImage3 from '@assets/@capitalcityshots-15_1760080740020.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const corporateBenefits = [
  { 
    icon: Users, 
    title: 'Team Bonding', 
    description: 'Build real connections away from the office in a relaxed lake setting',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Target, 
    title: 'Goal Setting', 
    description: 'Plan strategy sessions with stunning views as your backdrop',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Trophy, 
    title: 'Reward Teams', 
    description: 'Celebrate wins and milestones with an experience they will remember',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Handshake, 
    title: 'Client Events', 
    description: 'Impress clients with a unique venue that stands out from the rest',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const eventTypes = [
  {
    title: 'Team Retreats',
    description: 'Full-day experiences for team planning and bonding',
    features: [
      'Private boat charter for your group',
      'Flexible scheduling options',
      'Catering coordination available',
      'Multiple boat size options'
    ]
  },
  {
    title: 'Client Entertainment',
    description: 'Impress clients with unforgettable experiences',
    features: [
      'Premium private cruises',
      'Professional crew service',
      'Custom branding options',
      'VIP treatment throughout'
    ]
  },
  {
    title: 'Company Celebrations',
    description: 'Mark milestones in style on Lake Travis',
    features: [
      'Product launch parties',
      'Quarter-end celebrations',
      'Holiday gatherings',
      'Anniversary events'
    ]
  },
  {
    title: 'Incentive Trips',
    description: 'Reward top performers with something special',
    features: [
      'Exclusive lake experiences',
      'Swimming and water activities',
      'Sunset cruise options',
      'Group sizes up to 75'
    ]
  }
];

const whyLakeTravis = [
  { stat: '3+ Hours', label: 'Cruise Duration Options' },
  { stat: '14-75', label: 'Guest Capacity Range' },
  { stat: '100%', label: 'Private Charter Experience' },
  { stat: '5-Star', label: 'Google Review Rating' }
];

const faqs = [
  {
    question: 'How many people can your boats hold for corporate events?',
    answer: 'We have boats for groups of all sizes. Our fleet ranges from 14-person vessels for small teams to 75-person party boats for large company gatherings. We can help match the right boat to your group size.'
  },
  {
    question: 'Can we bring our own food and drinks?',
    answer: 'Yes! All our private cruises are BYOB. You can bring your own catering or we can help connect you with local catering partners. This gives you full control over your menu and budget.'
  },
  {
    question: 'What team building activities can we do on the boat?',
    answer: 'The lake itself offers plenty of activities. Guests can swim, float on giant lily pads, and enjoy the water. Many teams use the cruise time for informal networking, team discussions, or simply relaxing together outside the office.'
  },
  {
    question: 'How far in advance should we book?',
    answer: 'For corporate events, we suggest booking 2-4 weeks ahead. Popular dates fill fast, especially during spring and fall. The sooner you reach out, the more options we can offer.'
  },
  {
    question: 'Do you offer any corporate packages or discounts?',
    answer: 'Yes! We have corporate packages designed for business groups. Contact us directly for custom quotes based on your group size, date, and specific needs. We work with companies of all sizes.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'Safety comes first. If weather forces a cancellation, we offer full rescheduling or refunds. Our team monitors conditions closely and will reach out ahead of time if there are any concerns.'
  }
];

const packageOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Small team outings' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Department events' },
  { name: 'Clever Girl', capacity: '50 guests', best: 'Large team retreats' },
  { name: 'Clever Girl', capacity: '75 guests', best: 'Company-wide events' }
];

export default function CorporateTeamBuildingLakeTravis() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Corporate Team Building on Lake Travis | Professional Boat Rental Solutions</title>
        <meta name="description" content="Plan professional corporate events on Lake Travis. Team building cruises, client entertainment, and company celebrations with Premier Party Cruises. Private boat charters for 14-75 guests." />
        <meta name="keywords" content="corporate team building Lake Travis, Austin corporate events, company boat rental, team building cruise Austin, corporate party boat" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/corporate-team-building-on-lake-travis-professional-boat-rental-solutions" />
        <meta property="og:title" content="Corporate Team Building on Lake Travis | Professional Boat Rental Solutions" />
        <meta property="og:description" content="Professional corporate events on Lake Travis. Team building, client entertainment, and company celebrations." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold">
              CORPORATE EVENT SOLUTIONS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Corporate Team Building on Lake Travis
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Professional Boat Rental Solutions for Austin Businesses
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Take your team out of the office and onto the water. Build connections that last.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your Corporate Event
                </Button>
              </Link>
              <Link href="/team-building">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  View Team Building Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Benefits Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Companies Choose Lake Travis</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Create meaningful experiences that bring teams together
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {corporateBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
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

        {/* Stats Section */}
        <section className="py-12 bg-blue-900 text-white">
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

        {/* Event Types Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">CORPORATE EVENT TYPES</Badge>
                  <h2 className="text-3xl font-bold mb-6">Events We Host</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Whether you need a small team outing or a large company celebration, we have options. 
                    Our private charters give you the space and privacy to focus on your goals.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {eventTypes.map((event, index) => (
                      <Card key={index} className="bg-white/80">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{event.description}</p>
                          <ul className="space-y-1">
                            {event.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-blue-600 flex items-center gap-1">
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
                      alt="Corporate team on Lake Travis boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Private Charters</p>
                        <p className="text-xs text-gray-500">Your team only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
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
                      alt="Premier Party Cruises boat fleet"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">OUR FLEET</Badge>
                  <h2 className="text-3xl font-bold mb-6">Boats for Every Team Size</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    We have four boats to choose from. Each offers a private experience 
                    with professional crew, sound system, and space to relax.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {packageOptions.map((boat, index) => (
                      <Card key={index} className="bg-white/10 border-white/20">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-white">{boat.name}</h4>
                          <p className="text-yellow-400 text-sm">{boat.capacity}</p>
                          <p className="text-white/70 text-xs mt-1">{boat.best}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Link href="/private-cruises">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                      <Ship className="mr-2 h-5 w-5" />
                      View All Boats
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">WHAT'S INCLUDED</Badge>
                  <h2 className="text-3xl font-bold mb-6">Everything You Need</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Our corporate packages include everything for a smooth event. 
                    Focus on your team while we handle the details.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Private boat charter (3+ hours)',
                      'Professional captain and crew',
                      'Premium sound system',
                      'Giant lily pad floats for swimming',
                      'Coolers and ice provided',
                      'BYOB - bring your own food and drinks',
                      'Flexible departure times',
                      'Free parking at the marina'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/chat">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                      <Calendar className="mr-2 h-5 w-5" />
                      Get a Quote
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Lake Travis corporate event"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-8 w-8 text-green-500" />
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
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Planning Tips for Corporate Events</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Make your event a success with these simple tips
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Book Early',
                  tips: [
                    'Reserve 2-4 weeks ahead',
                    'Popular dates fill fast',
                    'More time means more options',
                    'Get the boat you want'
                  ]
                },
                {
                  title: 'Plan Your Food',
                  tips: [
                    'Bring your own catering',
                    'Keep it simple for the boat',
                    'Finger foods work best',
                    'Don\'t forget drinks and ice'
                  ]
                },
                {
                  title: 'Set the Agenda',
                  tips: [
                    'Mix work and fun time',
                    'Plan activities loosely',
                    'Leave room for relaxation',
                    'End with a sunset if possible'
                  ]
                },
                {
                  title: 'Dress Code',
                  tips: [
                    'Casual is best on the water',
                    'Suggest swimsuits and layers',
                    'Sunscreen is a must',
                    'Non-slip shoes recommended'
                  ]
                },
                {
                  title: 'Team Activities',
                  tips: [
                    'Swimming and floating',
                    'Informal networking',
                    'Photo opportunities',
                    'Group discussions'
                  ]
                },
                {
                  title: 'Communication',
                  tips: [
                    'Share details with your team',
                    'Confirm headcount early',
                    'Send parking instructions',
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
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
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

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about corporate events on Lake Travis
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border px-6"
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
        <section className="py-16 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Plan Your Corporate Event?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Get a custom quote for your team. We'll help you pick the right boat 
                and plan every detail.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Button>
                </Link>
                <a href="tel:5127270422">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
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
