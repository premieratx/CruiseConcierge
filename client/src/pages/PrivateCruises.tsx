import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { EnhancedBookingCalendar } from '@/components/EnhancedBookingCalendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Ship, Users, Star, Calendar, Trophy, Shield, Award,
  MessageSquare, Quote, Volume2, 
  Calculator, FileCheck, CreditCard, PersonStanding,
  ChefHat, Wifi, Bluetooth, Building,
  UserCheck, Target, Headphones
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';

// Hero and gallery images 
import heroImage1 from '@assets/image_1757844813165.png';
import heroImage2 from '@assets/image_1757850768476.png';
import heroImage3 from '@assets/image_1757853656553.png';
import galleryImage1 from '@assets/image_1757877906674.png';
import galleryImage2 from '@assets/image_1757884902886.png';
import galleryImage3 from '@assets/image_1757886911506.png';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Fleet capacity options for display
const fleetCapacities = [
  { capacity: '14-person', name: 'Pontoon', subtitle: 'Perfect for intimate groups' },
  { capacity: '25-30 person', name: 'Pontoon', subtitle: 'Most popular choice' },
  { capacity: '50-person', name: 'Yacht', subtitle: 'Premium luxury experience' },
  { capacity: '75-person', name: 'Mega Yacht', subtitle: 'Ultimate luxury charter' }
];

// Pricing breakdown components
const pricingFeatures = [
  {
    icon: Calculator,
    title: 'Transparent Pricing',
    description: 'Hourly rate × duration = base cost. No hidden fees or surprise charges.'
  },
  {
    icon: PersonStanding,
    title: 'Extra Crew Fee',
    description: 'Groups over 20 people: $200 extra crew fee for enhanced service & safety.'
  },
  {
    icon: FileCheck,
    title: 'Tax & Gratuity',
    description: '8.25% tax added. Suggested 20% gratuity for exceptional crew service.'
  },
  {
    icon: CreditCard,
    title: 'Flexible Deposits',
    description: '25% deposit if >30 days out. Full payment required if <30 days from cruise.'
  }
];

// Why choose Premier Party Cruises
const whyChooseUs = [
  {
    icon: Trophy,
    title: '14+ Years Experience',
    description: 'Austin\'s longest-running party cruise company with unmatched Lake Travis expertise.'
  },
  {
    icon: UserCheck,
    title: '125,000+ Happy Customers',
    description: 'We\'ve created unforgettable memories for over 125,000 guests with 5-star service.'
  },
  {
    icon: Shield,
    title: 'Perfect Safety Record',
    description: 'Coast Guard certified captains and pristine safety record ensure your peace of mind.'
  },
  {
    icon: Star,
    title: 'Newest Fleet',
    description: 'Austin\'s newest and nicest boats with premium amenities and sound systems.'
  },
  {
    icon: Headphones,
    title: 'Full-Service Experience',
    description: 'Professional crew, premium sound, coolers, ice, and all amenities included.'
  },
  {
    icon: Target,
    title: 'Custom Experiences',
    description: 'Tailored packages for any celebration - corporate events, weddings, birthdays, anniversaries.'
  }
];

// Testimonials for private cruises
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Corporate Event Planner',
    rating: 5,
    text: 'Premier Party Cruises made our company retreat absolutely unforgettable. The 50-person yacht was perfect, the crew was professional, and the experience exceeded all expectations. Our team is still talking about it!',
    event: 'Corporate Retreat',
    groupSize: 45,
    image: '/testimonials/sarah.jpg'
  },
  {
    id: 2,
    name: 'Michael & Jennifer Chen',
    role: 'Newlyweds',
    rating: 5,
    text: 'Our wedding reception cruise on Lake Travis was magical. The sunset views, professional service, and attention to detail made our special day perfect. Worth every penny!',
    event: 'Wedding Reception',
    groupSize: 75,
    image: '/testimonials/chen.jpg'
  },
  {
    id: 3,
    name: 'David Rodriguez',
    role: 'Birthday Celebration',
    rating: 5,
    text: 'Booked the 25-person pontoon for my 40th birthday and it was incredible. The crew went above and beyond, the boat was immaculate, and the Lake Travis experience was unforgettable.',
    event: '40th Birthday Party',
    groupSize: 22,
    image: '/testimonials/david.jpg'
  }
];

// FAQ data
const faqData = [
  {
    question: 'How far in advance should I book my private cruise?',
    answer: 'We recommend booking 2-4 weeks in advance for weekend dates, especially during peak season (April-September). Weekday cruises typically have more availability and can often be booked with shorter notice.'
  },
  {
    question: 'What\'s included in the private cruise price?',
    answer: 'All private cruises include: professional Coast Guard certified captain, fuel, coolers with ice, premium sound system with Bluetooth connectivity, safety equipment, and basic amenities. Food, beverages, and extra crew (if needed) are additional.'
  },
  {
    question: 'Can we bring our own food and drinks?',
    answer: 'Absolutely! You can bring your own food, snacks, and beverages (including alcohol for guests 21+). We provide coolers and ice. We can also connect you with preferred catering partners for full-service dining.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'Safety is our top priority. If weather conditions are unsafe, we\'ll work with you to reschedule your cruise to another date. We monitor weather closely and will contact you 24-48 hours before your cruise if conditions look questionable.'
  },
  {
    question: 'Do you provide decorations for special events?',
    answer: 'We can accommodate basic decorations and help coordinate with local vendors for more elaborate setups. Many clients bring their own decorations, and our crew is happy to help with setup before departure.'
  },
  {
    question: 'What are your cancellation policies?',
    answer: 'Cancellations more than 14 days prior receive full refund. 7-14 days prior: 50% refund. Less than 7 days: no refund except for unsafe weather conditions. We offer date changes based on availability.'
  },
  {
    question: 'How do deposits and payments work?',
    answer: 'If booking more than 30 days out, we require a 25% deposit to secure your date. The balance is due 30 days before your cruise. If booking within 30 days, full payment is required upfront.'
  },
  {
    question: 'Can swimming be included in our private cruise?',
    answer: 'Yes! Lake Travis offers great swimming opportunities. We can anchor in swimming areas and provide ladder access. We recommend bringing water shoes and sunscreen. Swimming is always at your own risk.'
  }
];

export default function PrivateCruises() {
  const [location, navigate] = useLocation();

  const handleGetQuote = () => {
    // Navigate to chat for instant quote
    navigate('/chat?cruiseType=private');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/private-cruises"
        defaultTitle="Private Cruise Charters Lake Travis Austin | Premier Party Cruises"
        defaultDescription="Exclusive private boat charters on Lake Travis. 14-75 person capacity boats with professional crews. Perfect for corporate events, weddings, birthdays & celebrations. Book your private cruise today!"
        defaultKeywords={[
          'private cruise austin',
          'boat rental lake travis',
          'private party boat austin',
          'lake travis charter boat',
          'austin boat rental private',
          'corporate boat rental austin',
          'wedding boat charter lake travis',
          'private yacht rental austin'
        ]}
        schemaType="service"
        customSchema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Private Cruise Charters",
          "description": "Exclusive private boat charters on Lake Travis with professional crews and premium amenities",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "url": "https://premierppartycruises.com",
            "telephone": "+1-512-488-5892",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            }
          },
          "areaServed": "Lake Travis, Austin, Texas",
          "serviceType": "Private Boat Charter"
        }}
      />
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-marine-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-yellow/20 dark:from-brand-blue/10 dark:to-brand-yellow/10" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <Ship className="h-20 w-20 text-brand-blue mx-auto mb-8" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 text-gray-900 dark:text-white"
            >
              EXCLUSIVE PRIVATE
              <span className="block text-brand-blue">LAKE TRAVIS CRUISES</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Your own private floating paradise with professional crew, premium amenities, 
              and unforgettable Austin Hill Country views. From intimate gatherings to grand celebrations.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Button
                size="lg"
                asChild
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-book-private-cruise"
              >
                <a href="#booking-widget">
                  <Calendar className="mr-3 h-6 w-6" />
                  BOOK YOUR PRIVATE CRUISE
                </a>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleGetQuote}
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-get-instant-quote"
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                GET INSTANT QUOTE
              </Button>
            </motion.div>

            {/* Key selling points */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center"
            >
              {[
                { icon: Users, text: '14-75 Person Boats', subtext: 'Perfect for any group size' },
                { icon: Trophy, text: '14+ Years Experience', subtext: 'Austin\'s most trusted' },
                { icon: Shield, text: 'Professional Crews', subtext: 'Coast Guard certified' },
                { icon: Star, text: 'Premium Amenities', subtext: 'Everything included' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <item.icon className="h-12 w-12 text-brand-blue mb-4" />
                  <div className="font-bold text-gray-900 dark:text-white mb-2">{item.text}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{item.subtext}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-yellow rounded-full animate-ping opacity-30" style={{animationDelay: '0s'}} />
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-brand-blue rounded-full animate-ping opacity-40" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-brand-yellow rounded-full animate-ping opacity-20" style={{animationDelay: '2s'}} />
        </div>
      </section>
      
      {/* Streamlined Booking Section */}
      <section id="booking-widget" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              BOOK YOUR PRIVATE CRUISE
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Choose your group size and preferred date to see available boats and pricing.
              Our streamlined booking process makes it easy to secure your Lake Travis adventure.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <EnhancedBookingCalendar 
              defaultEventType="private"
              defaultGroupSize={20}
              className="max-w-6xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Fleet Capacity Overview */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              OUR FLEET OPTIONS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Choose from Austin's newest and nicest boats, each equipped with premium amenities for your perfect day on the water.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {fleetCapacities.map((fleet, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <Ship className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{fleet.capacity}</h3>
                    <p className="text-lg font-semibold text-brand-blue mb-2">{fleet.name}</p>
                    <p className="text-gray-600 dark:text-gray-300">{fleet.subtitle}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Pricing Transparency Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              TRANSPARENT PRICING
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              No hidden fees or surprise charges. Here's exactly how our pricing works.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pricingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center"
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <feature.icon className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Example Pricing Breakdown */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 bg-white dark:bg-gray-800">
              <h3 className="text-2xl font-heading font-bold mb-6 text-center text-gray-900 dark:text-white">
                Example: 25-Person Weekend Cruise (4 Hours)
              </h3>
              
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Base Rate (4 hours × $340/hr)</span>
                  <span className="font-bold">{formatCurrency(1360)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Extra Crew Fee (25 people)</span>
                  <span className="font-bold">{formatCurrency(200)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-bold">{formatCurrency(1560)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Tax (8.25%)</span>
                  <span className="font-bold">{formatCurrency(129)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Suggested Gratuity (20%)</span>
                  <span className="font-bold">{formatCurrency(312)}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t-2 border-brand-blue text-xl">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-brand-blue">{formatCurrency(2001)}</span>
                </div>
                <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                  = {formatCurrency(Math.round(2001 / 25))} per person
                </div>
              </div>

              <div className="text-center mt-8">
                <Button
                  onClick={() => setShowPricingCalculator(true)}
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-8 py-3"
                  data-testid="button-open-calculator"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Your Cruise Cost
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Premier Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              WHY CHOOSE PREMIER
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Austin's most trusted and experienced party cruise company delivers exceptional experiences every time.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center group"
              >
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-brand-blue/50">
                  <reason.icon className="h-16 w-16 text-brand-blue mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {reason.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              HAPPY CUSTOMERS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Read what our satisfied customers say about their private cruise experiences.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                data-testid={`testimonial-${testimonial.id}`}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="flex space-x-1 mr-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                      {testimonial.event}
                    </Badge>
                  </div>
                  
                  <Quote className="h-8 w-8 text-brand-blue mb-4 opacity-50" />
                  
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-brand-blue">{testimonial.groupSize} guests</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              FREQUENTLY ASKED QUESTIONS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Get answers to common questions about private cruise bookings and experiences.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg px-6 border-none"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:text-brand-blue transition-colors duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-yellow text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-8"
            >
              READY TO CRUISE?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 leading-relaxed"
            >
              Book your exclusive private Lake Travis experience today. 
              Our team is ready to create the perfect celebration for your group.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button
                size="lg"
                asChild
                className="bg-white text-brand-blue hover:bg-gray-100 font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-book-now-final"
              >
                <a href="#booking-widget">
                  <Calendar className="mr-3 h-6 w-6" />
                  BOOK NOW
                </a>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleGetQuote}
                className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-get-quote-final"
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                GET CUSTOM QUOTE
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}