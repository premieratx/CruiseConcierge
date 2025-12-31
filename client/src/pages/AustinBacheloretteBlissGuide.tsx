import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, PartyPopper, Phone, Clock, CheckCircle2, 
  Music, Sun, Waves, MapPin, Calendar, Star, Heart,
  ArrowRight, Sparkles, Wine, Camera, Palmtree
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import AnimatedPhotoGallery from '@/components/AnimatedPhotoGallery';
import { BlogImageBreak, BlogPhotoStrip, BlogPartyGallery, BLOG_BOAT_PHOTOS, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const blissElements = [
  { 
    icon: Sparkles, 
    title: 'Spa & Relaxation', 
    description: 'Start with luxurious spa treatments, massages, and champagne to set the perfect tone',
    color: 'text-pink-600',
    bg: 'bg-pink-100'
  },
  { 
    icon: Ship, 
    title: 'Lake Travis Bachelorette Party Boat', 
    description: 'Dance under the Texas sun on a Lake Travis bachelorette party boat with professional DJs and stunning views',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Wine, 
    title: 'Alcohol Delivery', 
    description: 'Party On Delivery brings champagne, cocktails, and more directly to you',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Heart, 
    title: 'Unforgettable Memories', 
    description: 'Instagram-worthy moments and bonding experiences with your closest friends',
    color: 'text-red-600',
    bg: 'bg-red-100'
  }
];

const weekendItinerary = [
  {
    day: 'Friday Evening',
    title: 'Arrival & Welcome',
    activities: [
      'Check into your Austin Airbnb or hotel',
      'Party On Delivery drops off welcome champagne',
      'Low-key dinner at a trendy Austin restaurant',
      'Rainey Street bar hopping (optional)'
    ]
  },
  {
    day: 'Saturday Morning',
    title: 'Spa & Relaxation',
    activities: [
      'Group spa treatments and massages',
      'Champagne brunch with the girls',
      'Get glammed up for the cruise',
      'Pre-cruise photos at your accommodation'
    ]
  },
  {
    day: 'Saturday Afternoon',
    title: 'ATX Disco Cruise',
    activities: [
      'Board the ATX Disco Cruise on Lake Travis',
      'Dance with professional DJ entertainment',
      'Swim and float on giant lily pads',
      'Sunset views and Instagram moments'
    ]
  },
  {
    day: 'Saturday Night',
    title: 'Downtown Austin',
    activities: [
      'Dinner at a top Austin restaurant',
      '6th Street or Rainey Street nightlife',
      'VIP treatment at Austin\'s best clubs',
      'Late-night tacos (a must!)'
    ]
  },
  {
    day: 'Sunday',
    title: 'Recovery & Farewell',
    activities: [
      'Pool time or lazy brunch',
      'Explore Austin\'s food truck scene',
      'Shopping on South Congress',
      'Farewell with lasting memories'
    ]
  }
];

const faqs = [
  {
    question: 'What\'s included in the ATX Disco Cruise?',
    answer: 'The ATX Disco Cruise includes a professional DJ, dance floor with disco lights, giant lily pad floats for swimming, and an experienced crew. You can bring your own drinks (BYOB) or use Party On Delivery for convenient beverage delivery to the marina.'
  },
  {
    question: 'How do I coordinate alcohol delivery for my bachelorette weekend?',
    answer: 'Party On Delivery handles all your beverage needs. They can deliver champagne to your hotel for morning mimosas, cocktail supplies to your Airbnb, and even bring drinks directly to the marina for your Lake Travis cruise. Just place your order and they handle the rest!'
  },
  {
    question: 'How many people can join the bachelorette cruise?',
    answer: 'Our boats accommodate various group sizes. The ATX Disco Cruise is perfect for bachelorette groups of all sizes, and you\'ll party alongside other celebration groups for an electric atmosphere. For private experiences, we offer exclusive boat charters for 14-75 guests.'
  },
  {
    question: 'What should we wear on the cruise?',
    answer: 'Wear your cutest swimsuit and coverup! Many bachelorette groups coordinate matching outfits or custom bride-tribe gear. Bring sunglasses, sunscreen, and comfortable shoes for dancing. Don\'t forget your phone for all those photo ops!'
  },
  {
    question: 'Can we bring decorations or custom items?',
    answer: 'Absolutely! Bring sashes, tiaras, custom banners, and props for photos. Just keep in mind that glass is not allowed on the boats for safety reasons. Party On Delivery can also include party supplies with your alcohol order.'
  },
  {
    question: 'What\'s the best time of year for an Austin bachelorette?',
    answer: 'Austin is fantastic year-round, but spring (March-May) and fall (September-November) offer the best weather. Summer is perfect for lake activities but can be hot. Plan around your comfort level and book early for popular weekends!'
  }
];

const spaRecommendations = [
  { name: 'Milk + Honey Spa', type: 'Luxury Day Spa', specialty: 'Group packages with champagne' },
  { name: 'Lake Austin Spa Resort', type: 'Wellness Retreat', specialty: 'Full-day retreat experiences' },
  { name: 'Viva Day Spa', type: 'Boutique Spa', specialty: 'Bachelorette group treatments' },
  { name: 'Hiatus Spa + Retreat', type: 'Urban Oasis', specialty: 'Downtown convenience' }
];

export default function AustinBacheloretteBlissGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Austin Bachelorette Bliss Guide | Spa, Disco Cruise & More</title>
        <meta name="description" content="Plan the perfect Austin bachelorette party with spa retreats, Lake Travis disco cruises, and seamless alcohol delivery. Your complete guide to bachelorette bliss in Austin, Texas." />
        <meta name="keywords" content="Austin bachelorette party, Lake Travis bachelorette, ATX Disco Cruise, Austin spa bachelorette, bachelorette party ideas Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-bachelorette-bliss-spa-retreats-disco-cruises-alcohol-delivery" />
        <meta property="og:title" content="Austin Bachelorette Bliss Guide | Spa, Disco Cruise & More" />
        <meta property="og:description" content="The ultimate guide to planning bachelorette bliss in Austin - spa retreats, Lake Travis cruises, and alcohol delivery." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/30" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('/attached_assets/disco_fun_best2_1765193453547.jpg')` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-pink-600 font-bold">
              ULTIMATE BACHELORETTE GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Austin Bachelorette Bliss
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Spa Retreats, Disco Cruises & Alcohol Delivery
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Your complete guide to creating the perfect Austin bachelorette party weekend in Austin, Texas with a Lake Travis bachelorette party boat
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-pink-600 font-bold text-lg px-8 py-6">
                  <Heart className="mr-2 h-5 w-5" />
                  Plan Your Bachelorette
                </Button>
              </Link>
              <Link href="/atx-disco-cruise">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  View Disco Cruise
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Bliss Elements Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">The Four Elements of Bachelorette Bliss</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Combine relaxation, adventure, convenience, and celebration for the ultimate weekend
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {blissElements.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-pink-200">
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

            <BlogImageBreak
              src={BLOG_PARTY_PHOTOS.bachelorette.src}
              alt={BLOG_PARTY_PHOTOS.bachelorette.alt}
              caption="Celebrate the bride-to-be on Lake Travis"
            />
          </div>
        </section>

        {/* Spa Section */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-pink-100 text-pink-700">START WITH RELAXATION</Badge>
                  <h2 className="text-3xl font-bold mb-6">Austin's Premier Spa Retreats</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Begin your Austin bachelorette party weekend with pure indulgence at one of Austin's acclaimed spa destinations. 
                    From downtown luxury spas to Hill Country wellness retreats, the city offers world-class treatments 
                    perfect for bonding with your closest friends before your Lake Travis bachelorette party boat adventure.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Consider booking group packages that include massages, facials, and champagne to set the tone 
                    for an amazing celebration. Many spas offer private suites and customizable experiences that 
                    cater specifically to bachelorette groups.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {spaRecommendations.map((spa, index) => (
                      <Card key={index} className="bg-white/80">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm">{spa.name}</h4>
                          <p className="text-xs text-gray-500">{spa.type}</p>
                          <p className="text-xs text-pink-600 mt-1">{spa.specialty}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="/attached_assets/disco_fun_first_1765193453547.jpg" 
                      alt="Austin bachelorette party group celebrating on Lake Travis bachelorette party boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-8 w-8 text-pink-500" />
                      <div>
                        <p className="font-bold text-sm">Group Packages</p>
                        <p className="text-xs text-gray-500">Champagne included</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ATX Disco Cruise Section */}
        <section className="py-16 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white">
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
                      src="/attached_assets/disco_fun2_1765193453547.jpg" 
                      alt="Lake Travis bachelorette party boat ATX Disco Cruise party austin texas"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">THE MAIN EVENT</Badge>
                  <h2 className="text-3xl font-bold mb-6">ATX Disco Cruise on Lake Travis</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Take your Austin bachelorette party celebration to the water with Premier Party Cruises' signature Lake Travis bachelorette party boat experience. 
                    This isn't just a boat ride—it's a full-scale Austin bachelorette party featuring professional DJs, 
                    stunning lake views, and an atmosphere designed for celebration.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Professional DJ with disco lights',
                      'Dance floor on the water',
                      'Giant lily pad floats for swimming',
                      'Instagram-worthy sunset views',
                      'BYOB or Party On Delivery service',
                      'Experienced, safety-focused crew'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/atx-disco-cruise">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                      <Ship className="mr-2 h-5 w-5" />
                      Explore ATX Disco Cruise
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <BlogImageBreak
              src={BLOG_BOAT_PHOTOS.large.src}
              alt={BLOG_BOAT_PHOTOS.large.alt}
              caption={BLOG_BOAT_PHOTOS.large.caption}
            />

            <BlogPhotoStrip
              photos={[
                { src: BLOG_PARTY_PHOTOS.dancing.src, alt: BLOG_PARTY_PHOTOS.dancing.alt, caption: "Dance floor action" },
                { src: BLOG_PARTY_PHOTOS.hearts.src, alt: BLOG_PARTY_PHOTOS.hearts.alt, caption: "Fun with the crew" }
              ]}
              columns={2}
            />
          </div>
        </section>

        {/* Alcohol Delivery Section */}
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
                  <Badge className="mb-4 bg-amber-100 text-amber-700">SEAMLESS LOGISTICS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Alcohol Delivery for Every Occasion</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Coordinating beverages for your bachelorette weekend doesn't have to be stressful. 
                    Party On Delivery provides comprehensive alcohol delivery services throughout Austin, 
                    ensuring your group has exactly what they need, when they need it.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {[
                      { title: 'Hotel Delivery', desc: 'Champagne for morning mimosas' },
                      { title: 'Airbnb Drop-off', desc: 'Stock your rental with supplies' },
                      { title: 'Marina Service', desc: 'Drinks ready at the boat' },
                      { title: 'Cocktail Kits', desc: 'Pre-mixed lake-ready drinks' }
                    ].map((service, index) => (
                      <Card key={index} className="bg-amber-50 border-amber-200">
                        <CardContent className="p-4">
                          <Wine className="h-6 w-6 text-amber-600 mb-2" />
                          <h4 className="font-bold text-sm">{service.title}</h4>
                          <p className="text-xs text-gray-600">{service.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50">
                      Visit Party On Delivery
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Wine className="h-24 w-24 text-amber-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Party On Delivery</h3>
                      <p className="text-gray-600">Austin's Premier Alcohol Delivery</p>
                      <p className="text-amber-600 font-bold mt-4">(737) 371-9700</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Weekend Itinerary */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Your Perfect Bachelorette Weekend</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A sample itinerary combining all the best elements of Austin
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {weekendItinerary.map((day, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <Badge className="w-fit mb-2 bg-pink-100 text-pink-700 text-xs">{day.day}</Badge>
                      <CardTitle className="text-lg">{day.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                            <span>{activity}</span>
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

        {/* Photo Gallery */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Bachelorette Party Gallery</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Real celebrations on Lake Travis
              </p>
            </motion.div>

            <AnimatedPhotoGallery />

            <BlogPartyGallery title="More Bachelorette Celebration Moments" />
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
                Everything you need to know about planning your Austin bachelorette
              </p>
            </motion.div>

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
        <section className="py-16 bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Heart className="h-16 w-16 mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Plan Your Austin Bachelorette Party?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let Premier Party Cruises handle your Lake Travis bachelorette party boat and Party On Delivery handle the details so you can focus on celebrating the bride-to-be at your Austin bachelorette party!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-pink-600 font-bold text-lg px-8 py-6">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Button>
                </Link>
                <Link href="/bachelorette-party-austin">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    View Bachelorette Packages
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
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
