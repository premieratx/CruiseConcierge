import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, CheckCircle2, Clock, DollarSign, Smile,
  ArrowRight, Phone, AlertTriangle, Sparkles, Wine, Heart,
  ShieldCheck, Calendar, Truck, PartyPopper
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-21_1760080807864.jpg';
import sectionImage1 from '@assets/@capitalcityshots-22_1760080807865.jpg';
import sectionImage2 from '@assets/@capitalcityshots-23_1760080807865.jpg';
import sectionImage3 from '@assets/@capitalcityshots-24_1760080807866.jpg';

const integrationBenefits = [
  { 
    icon: Clock, 
    title: 'Save 10+ Hours', 
    description: 'Skip the research and coordination. We handle the details so you can relax.',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Smile, 
    title: 'Zero Stress', 
    description: 'One team manages your boat, drinks, and logistics. No juggling vendors.',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: DollarSign, 
    title: 'Better Value', 
    description: 'Bundled services often cost less than booking everything separately.',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: ShieldCheck, 
    title: 'Guaranteed Quality', 
    description: 'Vetted partners who know how to work together for seamless events.',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const diyProblems = [
  {
    problem: 'Finding a reliable boat rental',
    description: 'Hours spent reading reviews and comparing options'
  },
  {
    problem: 'Coordinating alcohol for the trip',
    description: 'Store runs, ice, coolers, and timing logistics'
  },
  {
    problem: 'Managing multiple vendors',
    description: 'Different contacts, schedules, and payment methods'
  },
  {
    problem: 'Last-minute emergencies',
    description: 'No backup plan when something goes wrong'
  },
  {
    problem: 'Group communication chaos',
    description: 'Endless texts about who brings what and when'
  }
];

const comparisonPoints = [
  {
    category: 'Planning Time',
    diy: '15-20+ hours of research and coordination',
    integrated: '30 minutes to book everything'
  },
  {
    category: 'Vendor Management',
    diy: 'You coordinate between 3-5 different companies',
    integrated: 'One point of contact handles it all'
  },
  {
    category: 'Alcohol Logistics',
    diy: 'Store trips, ice runs, hauling coolers',
    integrated: 'Party On Delivery brings it to the marina'
  },
  {
    category: 'Day-of Stress',
    diy: 'You solve problems while trying to have fun',
    integrated: 'Professionals handle everything'
  },
  {
    category: 'Backup Plans',
    diy: 'Figure it out yourself if issues arise',
    integrated: 'Built-in solutions and experienced crew'
  },
  {
    category: 'Group Experience',
    diy: 'Host is often too busy to enjoy',
    integrated: 'Everyone relaxes and celebrates'
  }
];

const faqs = [
  {
    question: 'What does integrated event services mean?',
    answer: 'Integrated event services means one team coordinates all aspects of your party. For Austin lake parties, this includes boat rental, alcohol delivery, and logistics. You make one call instead of managing multiple vendors.'
  },
  {
    question: 'How does Party On Delivery work with Premier Party Cruises?',
    answer: 'Party On Delivery handles all beverage needs for your cruise. They deliver drinks directly to the marina before your departure. No store runs, no hauling coolers. Just show up and enjoy.'
  },
  {
    question: 'Is integrated service more expensive than DIY?',
    answer: 'Not usually. When you factor in time spent researching, gas for store runs, and potential mistakes, integrated services often cost less. Plus, you avoid the hidden costs of stress and missed fun.'
  },
  {
    question: 'What if I have specific drink preferences?',
    answer: 'Party On Delivery offers full customization. Want craft beer? Done. Champagne for a celebration? Easy. Special cocktail mixers? Just ask. They work with you to create the perfect beverage selection.'
  },
  {
    question: 'Can I still plan parts myself if I want to?',
    answer: 'Absolutely. Many guests bring personal items or decorations. The integrated approach handles the big logistics while you add personal touches. It is the best of both worlds.'
  },
  {
    question: 'How far in advance should I book?',
    answer: 'Book at least 2-3 weeks ahead for best availability. Popular weekends fill up fast. Earlier booking means better boat choices and guaranteed delivery times.'
  }
];

const testimonials = [
  {
    quote: "I tried planning my friend's bachelorette party myself last year. Never again. This time I used Premier Party Cruises and it was so easy!",
    name: "Sarah M.",
    event: "Bachelorette Party"
  },
  {
    quote: "The alcohol delivery to the marina was a game changer. We showed up and everything was ready. No stress at all.",
    name: "Mike T.",
    event: "Bachelor Party"
  },
  {
    quote: "As the maid of honor, I was worried about coordinating everything. One phone call and they handled the entire day.",
    name: "Jessica R.",
    event: "Wedding Weekend"
  }
];

export default function IntegratedEventServicesComparison() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/why-choose-integrated-event-services-comparing-austin-party-planning-options"
        defaultTitle="Why Choose Integrated Event Services | Austin Party Planning"
        defaultDescription="Compare integrated event services vs DIY party planning in Austin. Learn how Premier Party Cruises and Party On Delivery save time and reduce stress for Lake Travis celebrations."
        defaultKeywords={['Austin party planning', 'integrated event services', 'Lake Travis party boat', 'alcohol delivery Austin', 'stress-free party planning']}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold">
              PARTY PLANNING GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Why Choose Integrated Event Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Comparing Austin Party Planning Options
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Save time, reduce stress, and actually enjoy your celebration
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Plan Your Party
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  View Our Cruises
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
            Browse our full range of{' '}
            <Link href="/party-boat-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin party boat rentals</Link>{' '}
            for celebrations of every kind on Lake Travis.
          </p>
        </div>
      </div>


        {/* Benefits Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Benefits of Integrated Event Services</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Let professionals handle the logistics while you focus on celebrating
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {integrationBenefits.map((item, index) => (
                <m.div
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
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* DIY Problems Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-red-100 text-red-700">THE DIY STRUGGLE</Badge>
                  <h2 className="text-3xl font-bold mb-6">Common DIY Party Planning Problems</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Planning a party yourself sounds simple. But it rarely is. Here are the headaches most people face when trying to organize an Austin lake party on their own.
                  </p>
                  
                  <ul className="space-y-4">
                    {diyProblems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{item.problem}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Group enjoying stress-free lake party"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-8 w-8 text-red-500" />
                      <div>
                        <p className="font-bold text-sm">Average DIY Time</p>
                        <p className="text-xs text-gray-500">15-20+ hours planning</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Integration Solution Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
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
                      alt="Premier Party Cruises boat on Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">THE BETTER WAY</Badge>
                  <h2 className="text-3xl font-bold mb-6">Premier Party Cruises + Party On Delivery</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Our integrated approach combines Lake Travis boat rentals with seamless alcohol delivery. Here is how it works:
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      'Book your cruise with one quick call or online',
                      'Tell us your group size and drink preferences',
                      'Party On Delivery stocks your order at the marina',
                      'Show up, board the boat, and start celebrating',
                      'Our crew handles all logistics throughout the trip',
                      'End the day with zero cleanup or returns'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/chat">
                      <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                        <Ship className="mr-2 h-5 w-5" />
                        Start Planning
                      </Button>
                    </Link>
                    <a href="tel:512-488-5892">
                      <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                        <Phone className="mr-2 h-5 w-5" />
                        Call (512) 488-5892
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">DIY vs Integrated: Side-by-Side Comparison</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                See the difference for yourself
              </p>
            </m.div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 bg-gray-100 dark:bg-gray-800 font-bold rounded-tl-lg">Category</th>
                    <th className="text-left p-4 bg-red-100 dark:bg-red-900/30 font-bold text-red-700 dark:text-red-400">DIY Approach</th>
                    <th className="text-left p-4 bg-green-100 dark:bg-green-900/30 font-bold text-green-700 dark:text-green-400 rounded-tr-lg">Integrated Service</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonPoints.map((point, index) => (
                    <tr key={index} className="border-b dark:border-gray-700">
                      <td className="p-4 font-semibold bg-gray-50 dark:bg-gray-800/50">{point.category}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{point.diy}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{point.integrated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Party On Delivery Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-amber-100 text-amber-700">SEAMLESS BEVERAGE SERVICE</Badge>
                  <h2 className="text-3xl font-bold mb-6">Party On Delivery: Your Beverage Partner</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    No more store runs. No more hauling coolers. Party On Delivery brings everything you need directly to the marina.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {[
                      { title: 'Beer & Wine', desc: 'Craft selections or classics' },
                      { title: 'Spirits & Mixers', desc: 'Full bar setup ready to go' },
                      { title: 'Ice & Supplies', desc: 'Coolers, cups, everything' },
                      { title: 'Custom Orders', desc: 'Special requests welcome' }
                    ].map((service, index) => (
                      <Card key={index} className="bg-white/80 border-amber-200">
                        <CardContent className="p-4">
                          <Wine className="h-6 w-6 text-amber-600 mb-2" />
                          <h4 className="font-bold text-sm">{service.title}</h4>
                          <p className="text-xs text-gray-600">{service.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-amber-100 rounded-lg">
                    <Truck className="h-10 w-10 text-amber-600" />
                    <div>
                      <p className="font-bold">Delivered to the Marina</p>
                      <p className="text-sm text-gray-600">Waiting for you when you arrive</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Party supplies and drinks ready for boat party"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-8 w-8 text-amber-500" />
                      <div>
                        <p className="font-bold text-sm">Party On Delivery</p>
                        <p className="text-xs text-gray-500">(737) 371-9700</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">What Our Guests Say</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Real experiences from real celebrations
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Sparkles key={star} className="h-5 w-5 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.event}</p>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about integrated event services
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
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
        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-6">Ready for a Stress-Free Celebration?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let us handle the details. You focus on making memories with your group.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                    <Calendar className="mr-2 h-5 w-5" />
                    Start Planning Today
                  </Button>
                </Link>
                <a href="tel:512-488-5892">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 488-5892
                  </Button>
                </a>
              </div>
              
              <p className="mt-8 text-white/70 text-sm">
                Premier Party Cruises • Lake Travis, Austin TX
              </p>
            </m.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}
