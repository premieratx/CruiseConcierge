import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, PartyPopper, Phone, Clock, CheckCircle2, 
  Music, Sun, Waves, MapPin, Calendar, Star, Gift,
  ArrowRight, Sparkles, Camera, Cake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-8_1760080740018.jpg';
import sectionImage1 from '@assets/@capitalcityshots-9_1760080740019.jpg';
import sectionImage2 from '@assets/@capitalcityshots-10_1760080740019.jpg';
import sectionImage3 from '@assets/@capitalcityshots-11_1760080740019.jpg';

const celebrationElements = [
  { 
    icon: Ship, 
    title: 'Premium Fleet', 
    description: 'Choose from boats that fit 14 to 75 guests for any group size',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Sun, 
    title: 'Stunning Views', 
    description: 'Celebrate with Lake Travis scenery and Texas Hill Country as your backdrop',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Music, 
    title: 'Party Atmosphere', 
    description: 'Bluetooth speakers and optional DJ service for dancing on the water',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Gift, 
    title: 'Birthday Packages', 
    description: 'Custom options for milestone birthdays with special touches',
    color: 'text-pink-600',
    bg: 'bg-pink-100'
  }
];

const boatOptions = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    ideal: 'Intimate birthday gatherings',
    features: ['Cozy seating areas', 'Bluetooth sound system', 'Swim platform', 'BYOB friendly']
  },
  {
    name: 'Mr. Meeseeks',
    capacity: '25 guests',
    ideal: 'Medium-sized birthday parties',
    features: ['Spacious deck', 'Premium sound', 'Lily pad floats', 'Sunset cruise ready']
  },
  {
    name: 'Clever Girl',
    capacity: '50 guests',
    ideal: 'Large milestone celebrations',
    features: ['Dance floor space', 'Multiple seating areas', 'Party lighting', 'Group photos']
  },
  {
    name: 'ATX Disco Cruise',
    capacity: '75 guests',
    ideal: 'Epic birthday bashes',
    features: ['Professional DJ', 'Disco lights', 'Giant floats', 'Full party setup']
  }
];

const milestones = [
  { age: '21st Birthday', desc: 'Celebrate coming of age on the water with friends' },
  { age: '30th Birthday', desc: 'Ring in a new decade with style and views' },
  { age: '40th Birthday', desc: 'Mark the milestone with an unforgettable cruise' },
  { age: '50th Birthday', desc: 'Half-century party with scenic Lake Travis' },
  { age: '60th & Beyond', desc: 'Elegant celebrations for any age' }
];

const faqs = [
  {
    question: 'How far ahead should I book for a birthday cruise?',
    answer: 'We suggest booking 2-4 weeks ahead. Weekend dates fill fast, especially in spring and summer. For milestone birthdays with large groups, book 4-6 weeks out to get your first-choice date.'
  },
  {
    question: 'Can I bring my own food and drinks?',
    answer: 'Yes! All our boats are BYOB. Bring your birthday cake, snacks, and drinks. We just ask that you skip glass containers for safety. Coolers are welcome aboard.'
  },
  {
    question: 'What is included in a birthday boat rental?',
    answer: 'Every rental includes the boat, captain, fuel, Bluetooth speakers, and safety gear. We also provide lily pad floats on most boats for swimming. Optional add-ons include DJ service and catering coordination.'
  },
  {
    question: 'Can we decorate the boat for a birthday?',
    answer: 'Absolutely! Bring balloons, banners, and birthday decor. Arrive 15 minutes early to set up. We just ask that decorations are secured and don\'t damage the boat.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'Safety comes first. If we cancel due to weather, you get a full refund or can reschedule. Light rain usually doesn\'t stop us, but lightning or high winds will.'
  },
  {
    question: 'How long are birthday cruises?',
    answer: 'Most groups book 3-4 hour cruises. This gives time to cruise the lake, swim, take photos, and celebrate. Shorter 2-hour options are available for smaller gatherings.'
  }
];

const whyChooseUs = [
  'TPWD certified captains',
  'All boats inspected regularly',
  'Top-rated on Google reviews',
  'Flexible booking options',
  'BYOB policy on all cruises',
  'Swimming stops included'
];

export default function BirthdayPartyBoatRentalsLakeTravis() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/birthday-party-boat-rentals-on-lake-travis-milestone-celebrations-with-a-view"
        defaultTitle="Birthday Party Boat Rentals Lake Travis | Milestone Celebrations"
        defaultDescription="Celebrate milestone birthdays on Lake Travis with Premier Party Cruises. Choose from boats for 14-75 guests. Stunning views, BYOB, and unforgettable memories."
        defaultKeywords={['birthday party boat rental Lake Travis', 'milestone birthday Austin', 'Lake Travis birthday cruise', 'birthday boat party Austin TX']}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/30" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold">
              BIRTHDAY CELEBRATIONS ON THE WATER
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Birthday Party Boat Rentals<br />on Lake Travis
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Milestone Celebrations with a View
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Make your next birthday unforgettable. Cruise Lake Travis with friends and family on our premium party boats.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/birthday-parties">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                  <Cake className="mr-2 h-5 w-5" />
                  Plan Your Birthday Cruise
                </Button>
              </Link>
              <Link href="/milestone-birthday">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  Milestone Birthdays
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


        {/* Why Celebrate on Lake Travis */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Celebrate on Lake Travis?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Skip the crowded restaurant. Your birthday deserves stunning views and room to celebrate.
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

        {/* Our Fleet Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">PREMIER PARTY CRUISES FLEET</Badge>
                  <h2 className="text-3xl font-bold mb-6">Find the Right Boat for Your Group</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    We have boats for every birthday party size. From cozy gatherings to big bashes, our fleet covers it all.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Each boat comes with a professional captain. You focus on celebrating. We handle the rest.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {boatOptions.slice(0, 2).map((boat, index) => (
                      <Card key={index} className="bg-white/80">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm">{boat.name}</h4>
                          <p className="text-xs text-gray-500">{boat.capacity}</p>
                          <p className="text-xs text-blue-600 mt-1">{boat.ideal}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Party boat on Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Ship className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">4 Boats Available</p>
                        <p className="text-xs text-gray-500">14-75 guests</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Boat Options Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Choose Your Birthday Cruise</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Every boat includes captain, fuel, and fun
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boatOptions.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Badge className="w-fit mb-2 bg-blue-100 text-blue-700 text-xs">{boat.capacity}</Badge>
                      <CardTitle className="text-lg">{boat.name}</CardTitle>
                      <p className="text-sm text-gray-500">{boat.ideal}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {boat.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
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

        {/* Scenic Views Section */}
        <section className="py-16 bg-gradient-to-br from-purple-900 via-blue-800 to-purple-900 text-white">
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
                      alt="Lake Travis scenic views"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">UNFORGETTABLE SCENERY</Badge>
                  <h2 className="text-3xl font-bold mb-6">Lake Travis Views Like No Other</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Lake Travis stretches over 60 miles through the Texas Hill Country. Crystal blue water meets rolling hills at every turn.
                  </p>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Sunset cruises are especially popular for birthdays. Watch the sky turn gold and pink as you celebrate.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Cruise past stunning lakefront homes',
                      'Stop at swim spots with clear water',
                      'Take photos with Hill Country backdrop',
                      'Watch the sunset from the water',
                      'See Austin skyline in the distance'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/gallery">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                      <Camera className="mr-2 h-5 w-5" />
                      View Photo Gallery
                    </Button>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Milestone Birthdays */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-pink-100 text-pink-700">MILESTONE BIRTHDAYS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Celebrate Every Major Birthday</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Some birthdays call for something special. A boat party on Lake Travis turns any milestone into an event to remember.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-pink-50 dark:bg-gray-800 rounded-lg">
                        <Cake className="h-6 w-6 text-pink-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-sm">{milestone.age}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Birthday celebration on boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <PartyPopper className="h-8 w-8 text-pink-500" />
                      <div>
                        <p className="font-bold text-sm">Any Age Welcome</p>
                        <p className="text-xs text-gray-500">Kids to grandparents</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Choose Premier Party Cruises?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Austin's top-rated boat rental company for birthday celebrations
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {whyChooseUs.map((reason, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-4 flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{reason}</span>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Cake className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Plan Your Birthday Cruise?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Get a custom quote in minutes. Our team will help you pick the perfect boat and plan every detail.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Start Planning Now
                  </Button>
                </Link>
                <a href="tel:5124885892">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 488-5892
                  </Button>
                </a>
              </div>
            </m.div>
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
                Common questions about birthday boat rentals on Lake Travis
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold py-4">
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

        {/* Related Links */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Find the perfect celebration for your occasion
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/milestone-birthday">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <Cake className="h-12 w-12 mx-auto mb-4 text-pink-500 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg mb-2">Milestone Birthdays</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Special packages for big birthdays</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/private-cruises">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <Ship className="h-12 w-12 mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg mb-2">Private Cruises</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Exclusive boat rentals for any event</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/atx-disco-cruise">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <Music className="h-12 w-12 mx-auto mb-4 text-purple-500 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg mb-2">ATX Disco Cruise</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Party cruise with DJ and dancing</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}
