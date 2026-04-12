import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, PartyPopper, Phone, Clock, CheckCircle2, 
  Music, Sun, Waves, MapPin, Calendar, Star, GraduationCap,
  ArrowRight, Sparkles, Wine, Camera, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-16_1760080740020.jpg';
import sectionImage1 from '@assets/@capitalcityshots-17_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-18_1760080740021.jpg';
import sectionImage3 from '@assets/@capitalcityshots-19_1760080740021.jpg';

const celebrationElements = [
  { 
    icon: GraduationCap, 
    title: 'Graduate of Honor', 
    description: 'Celebrate your hard work with a party as big as your achievement',
    color: 'text-orange-600',
    bg: 'bg-orange-100'
  },
  { 
    icon: Ship, 
    title: 'Lake Travis Cruise', 
    description: 'Party on the water with friends and family aboard our boats',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Wine, 
    title: 'Party On Delivery', 
    description: 'Get drinks delivered to your party spot, dorm, or the marina',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Award, 
    title: 'Memories to Last', 
    description: 'Create photos and moments you will treasure for years',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const partyPackages = [
  {
    title: 'ATX Disco Cruise',
    capacity: 'Join other groups',
    features: [
      'Professional DJ and dance floor',
      'Giant lily pad floats',
      'BYOB friendly',
      'Great for smaller groups'
    ],
    ideal: 'Perfect for groups of 4-15 guests'
  },
  {
    title: 'Private Day Tripper',
    capacity: '14 guests max',
    features: [
      'Your own private boat',
      'Bring your own food and drinks',
      'Swimming stops included',
      '3-hour cruise on Lake Travis'
    ],
    ideal: 'Great for close friend groups'
  },
  {
    title: 'Private Meeseeks',
    capacity: '25 guests max',
    features: [
      'Larger private boat',
      'Sound system included',
      'Coolers and ice provided',
      'More room to party'
    ],
    ideal: 'Ideal for bigger friend groups'
  },
  {
    title: 'Clever Girl Charter',
    capacity: '50 guests max',
    features: [
      'Our largest party boat',
      'Full bar setup available',
      'Climate controlled cabin',
      'Perfect for family + friends'
    ],
    ideal: 'Best for large graduation parties'
  }
];

const austinColleges = [
  { name: 'UT Austin', mascot: 'Longhorns', color: 'bg-orange-500' },
  { name: 'Texas State', mascot: 'Bobcats', color: 'bg-amber-600' },
  { name: 'St. Edwards', mascot: 'Hilltoppers', color: 'bg-blue-600' },
  { name: 'ACC', mascot: 'Riverbats', color: 'bg-green-600' },
  { name: 'Concordia', mascot: 'Tornados', color: 'bg-purple-600' },
  { name: 'Huston-Tillotson', mascot: 'Rams', color: 'bg-red-600' }
];

const planningTimeline = [
  {
    week: '4-6 Weeks Before',
    title: 'Book Your Cruise',
    tasks: [
      'Choose your boat size',
      'Pick your date and time',
      'Send save the dates to guests',
      'Start your guest list'
    ]
  },
  {
    week: '2-3 Weeks Before',
    title: 'Plan the Details',
    tasks: [
      'Finalize your guest count',
      'Order grad party decorations',
      'Plan your drink order',
      'Arrange transportation'
    ]
  },
  {
    week: '1 Week Before',
    title: 'Final Prep',
    tasks: [
      'Confirm headcount with us',
      'Place Party On Delivery order',
      'Prep coolers and supplies',
      'Check weather forecast'
    ]
  },
  {
    week: 'Day Of',
    title: 'Party Time!',
    tasks: [
      'Pick up drinks at marina',
      'Arrive 30 min early',
      'Board and set up',
      'Celebrate your graduate!'
    ]
  }
];

const faqs = [
  {
    question: 'Can we bring alcohol on the graduation cruise?',
    answer: 'Yes! All our cruises are BYOB. You can bring your own drinks or use Party On Delivery. They will bring beer, wine, spirits, and mixers right to the marina. No need to make extra stops.'
  },
  {
    question: 'How many people can fit on a graduation party boat?',
    answer: 'We have boats for every group size. The Day Tripper fits 14 guests. The Meeseeks holds 25. Our Clever Girl fits up to 50 people. For bigger groups, we can book multiple boats together.'
  },
  {
    question: 'What if some guests are under 21?',
    answer: 'No problem! Many graduation parties include family of all ages. We just ask that guests under 21 do not drink alcohol. Our crew helps ensure responsible service.'
  },
  {
    question: 'When should I book for May graduation?',
    answer: 'Book early! May is our busiest month. UT graduation weekend fills up fast. We suggest booking 4-6 weeks ahead. Popular dates may sell out even sooner.'
  },
  {
    question: 'Can we bring food and decorations?',
    answer: 'Absolutely! Bring food, cake, banners, and grad caps. Just skip the glass items for safety. We have coolers on board for your food and drinks.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'We watch the weather closely. Light rain is usually fine. For storms or high winds, we will work with you to reschedule. Your safety comes first.'
  }
];

export default function GraduationPartyAlcoholPlanning() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/graduation-party-alcohol-planning-ut-and-austin-college-celebrations"
        defaultTitle="Graduation Party Alcohol Planning: UT and Austin College Celebrations | Premier Party Cruises"
        defaultDescription="Plan the perfect graduation party in Austin. Get alcohol delivered with Party On Delivery. Book Lake Travis cruises for UT and Austin college grads. Easy planning tips inside."
        defaultKeywords={['graduation party Austin', 'UT graduation party', 'Lake Travis graduation cruise', 'Party On Delivery Austin', 'college graduation celebration', 'Texas graduation party boat']}
        image={heroImage}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/30" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-orange-600 font-bold">
              GRADUATION PARTY GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Graduation Party Planning
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              UT and Austin College Celebrations
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Easy alcohol delivery. Lake Travis cruises. The perfect grad party starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/graduation-party">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-orange-600 font-bold text-lg px-8 py-6">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Plan Your Party
                </Button>
              </Link>
              <Link href="/prom-cruise">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  Prom & Graduation
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


        {/* Elements Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Four Keys to a Great Grad Party</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Make your celebration easy and fun with these essentials
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {celebrationElements.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-orange-200">
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
                  <Badge className="mb-4 bg-amber-100 text-amber-700">SKIP THE STORE RUN</Badge>
                  <h2 className="text-3xl font-bold mb-6">Alcohol Delivery Made Easy</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Party On Delivery brings drinks right to you. No more trips to the store. No more hauling heavy cases. Just order what you need and pick it up at the marina.
                  </p>
                  
                  <h3 className="font-bold text-xl mb-4">What They Deliver:</h3>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Beer, wine, and hard seltzers',
                      'Spirits and cocktail mixers',
                      'Ice and cooler supplies',
                      'Non-alcoholic options too'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-bold text-xl mb-4">How It Works:</h3>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Order online or by phone',
                      'Choose marina pickup time',
                      'They meet you at the dock',
                      'Load up and set sail'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold">{index + 1}</span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
                      <Wine className="mr-2 h-5 w-5" />
                      Visit Party On Delivery
                    </Button>
                  </a>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Graduation party celebration on Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Wine className="h-8 w-8 text-amber-500" />
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

        {/* Lake Travis Cruise Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white">
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
                      alt="Lake Travis graduation party cruise"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">CELEBRATE ON THE WATER</Badge>
                  <h2 className="text-3xl font-bold mb-6">Lake Travis Graduation Cruises</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Take your grad party to Lake Travis. Our boats offer the perfect mix of fun and relaxation. Dance, swim, and soak up the Texas sun with your favorite people.
                  </p>
                  
                  <h3 className="font-bold text-xl mb-4">Why Grads Love Our Cruises:</h3>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Unique venue your guests will love',
                      'Stunning lake and Hill Country views',
                      'Swimming and water toys included',
                      'BYOB saves money on drinks',
                      'Photos that stand out on social',
                      'Climate controlled options available'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/private-cruises">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                      <Ship className="mr-2 h-5 w-5" />
                      Explore Cruise Options
                    </Button>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Party Packages */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Graduation Party Packages</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Find the right boat for your group size
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partyPackages.map((pkg, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-orange-200">
                    <CardHeader>
                      <Badge className="w-fit mb-2 bg-orange-100 text-orange-700 text-xs">{pkg.capacity}</Badge>
                      <CardTitle className="text-lg">{pkg.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-medium text-orange-600">{pkg.ideal}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/chat">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-bold">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Get Your Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Austin Colleges Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-orange-100 text-orange-700">LOCAL GRADS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Austin College Celebrations</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    We host graduation parties for students from all Austin-area schools. Hook 'em Horns, Eat 'em Up Cats, or any other mascot—we love celebrating your success.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    May graduation season is busy. Book early to secure your date. Many UT families book 6 weeks ahead for the best time slots.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {austinColleges.map((college, index) => (
                      <Card key={index} className="bg-white/80">
                        <CardContent className="p-3 text-center">
                          <div className={`w-8 h-8 mx-auto mb-2 ${college.color} rounded-full flex items-center justify-center`}>
                            <GraduationCap className="h-4 w-4 text-white" />
                          </div>
                          <h4 className="font-bold text-sm">{college.name}</h4>
                          <p className="text-xs text-gray-500">{college.mascot}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="College graduation party on Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-8 w-8 text-orange-500" />
                      <div>
                        <p className="font-bold text-sm">Class of 2025</p>
                        <p className="text-xs text-gray-500">Book early for May!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Planning Timeline */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Your Planning Timeline</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Follow these steps for a stress-free graduation party
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {planningTimeline.map((step, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <Badge className="w-fit mb-2 bg-orange-100 text-orange-700 text-xs">{step.week}</Badge>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {step.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{task}</span>
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

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
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
                Common questions about graduation party cruises
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border px-6"
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
        <section className="py-16 bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <GraduationCap className="h-16 w-16 mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Plan Your Grad Party?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let us help you celebrate this huge achievement. Book your Lake Travis cruise and get drinks delivered with Party On Delivery!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-orange-600 font-bold text-lg px-8 py-6">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Button>
                </Link>
                <Link href="/graduation-party">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    View Grad Party Packages
                  </Button>
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <Ship className="h-10 w-10 mx-auto mb-3 text-white" />
                    <h3 className="font-bold text-lg mb-2">Premier Party Cruises</h3>
                    <a href="tel:5124885892" className="text-white/90 hover:text-white flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      (512) 488-5892
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <Wine className="h-10 w-10 mx-auto mb-3 text-white" />
                    <h3 className="font-bold text-lg mb-2">Party On Delivery</h3>
                    <a href="tel:7373719700" className="text-white/90 hover:text-white flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      (737) 371-9700
                    </a>
                  </CardContent>
                </Card>
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
