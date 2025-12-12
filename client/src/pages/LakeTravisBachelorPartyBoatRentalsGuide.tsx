import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, PartyPopper, Phone, Mail, Clock, CheckCircle2, 
  Anchor, Music, Sun, Waves, MapPin, Calendar, Beer, Star,
  ArrowRight, ExternalLink, Camera, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import AnimatedPhotoGallery from '@/components/AnimatedPhotoGallery';
import { BlogImageBreak, BlogPhotoStrip, BlogPartyGallery, BLOG_BOAT_PHOTOS, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const heroImages = [
  '/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
  '/attached_assets/meeseeks-25-person-boat.webp',
  '/attached_assets/clever-girl-disco-party.webp'
];

const whyLakeTravis = [
  { icon: Waves, title: 'Crystal Clear Waters', description: 'Stunning reservoir in the Texas Hill Country with perfect swimming conditions' },
  { icon: Sun, title: 'Perfect Weather', description: 'Warm Austin weather from April-October ideal for water activities' },
  { icon: Music, title: 'Party Atmosphere', description: 'Premium sound systems, disco lights, and space to celebrate' },
  { icon: MapPin, title: 'Prime Location', description: 'Just 30 minutes from downtown Austin nightlife' }
];

const fleetOptions = [
  {
    name: 'Day Tripper',
    capacity: '1-14 guests',
    description: 'Perfect for intimate bachelor parties',
    features: ['Premium Bluetooth speakers', 'Coolers included', 'Shade & sun areas']
  },
  {
    name: 'Meeseeks / The Irony',
    capacity: '15-30 guests',
    description: 'Ideal for medium bachelor party groups',
    features: ['Spacious deck', 'Multiple seating areas', '2 boats available'],
    popular: true
  },
  {
    name: 'Clever Girl',
    capacity: '31-75 guests',
    description: 'Ultimate bachelor party experience',
    features: ['14 disco balls', 'Giant lily pad floats', 'Two restrooms']
  }
];

const faqs = [
  {
    question: 'What is the best time of year for a Lake Travis bachelor party?',
    answer: 'The best time is late spring to early fall (April to October) when weather is warm. Austin enjoys mild winters too, so off-season parties can be enjoyable with fewer crowds.'
  },
  {
    question: 'Can we bring our own alcohol on the party boat?',
    answer: 'Yes! Our boats are BYOB-friendly. We provide coolers stocked with ice. You can also use Party On Delivery for convenient alcohol delivery directly to the marina.'
  },
  {
    question: 'How far in advance should we book?',
    answer: 'Book 2-3 months ahead, especially for peak season (summer and holiday weekends). Popular dates fill up quickly.'
  },
  {
    question: 'Are there age restrictions?',
    answer: 'No age restrictions for being on the boat, but all participants must be 21+ to consume alcohol. We adhere strictly to Texas alcohol laws.'
  },
  {
    question: 'What activities can we do on the boat?',
    answer: 'Swimming, floating on giant lily pads, dancing, sunbathing, and enjoying the scenic Lake Travis views. Our Ultimate package includes floats and party supplies.'
  }
];

export default function LakeTravisBachelorPartyBoatRentalsGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lake Travis Bachelor Party Boat Rentals | Ultimate Guide to Epic Celebrations</title>
        <meta name="description" content="Planning an Austin bachelor party? Discover the ultimate guide to Lake Travis boat rentals, party packages, and tips for an unforgettable celebration in Austin, Texas." />
        <meta name="keywords" content="Lake Travis bachelor party, Austin bachelor party boat, party boat rental Austin, bachelor party ideas Austin, Lake Travis boat rental" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/lake-travis-bachelor-party-boat-rentals-the-ultimate-guide-to-epic-celebrations" />
        <meta property="og:title" content="Lake Travis Bachelor Party Boat Rentals | Ultimate Guide" />
        <meta property="og:description" content="The ultimate guide to planning an epic Austin bachelor party on Lake Travis. Boat rentals, packages, and expert tips." />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImages[0]})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-500 text-black font-bold">
              ULTIMATE BACHELOR PARTY GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Lake Travis Bachelor Party Boat Rentals
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              The Ultimate Guide to Epic Celebrations in Austin, Texas
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Plan Your Bachelor Party
                </Button>
              </Link>
              <Link href="/bachelor-party-austin">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  View Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Introduction */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-6 text-center">Your Unforgettable Austin Bachelor Party Starts Here</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Austin, Texas, is renowned for its vibrant nightlife, live music scene, and the stunning Lake Travis. 
                When it comes to planning an epic bachelor party, combining the excitement of Austin with the unique 
                experience of a Lake Travis party boat rental is an unbeatable choice.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Premier Party Cruises</strong> stands as the Lake Travis party boat leader, boasting over 
                15 years of experience and having hosted countless satisfied customers. Our perfect safety 
                record and dedication to unforgettable experiences make us the go-to choice for bachelor parties in Austin.
              </p>

              <BlogImageBreak
                src={BLOG_PARTY_PHOTOS.bachelor.src}
                alt={BLOG_PARTY_PHOTOS.bachelor.alt}
                caption="Bachelor party crew ready to celebrate on Lake Travis"
              />
            </motion.div>
          </div>
        </section>

        {/* Why Lake Travis Section */}
        <section className="py-16 bg-blue-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Lake Travis is the Ultimate Bachelor Party Destination</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A sprawling reservoir in the Texas Hill Country with crystal clear waters, stunning cliffs, and endless coves
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyLakeTravis.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <item.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet Options */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Choose Your Perfect Party Boat</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our fleet of well-maintained boats is designed for various group sizes and party styles
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {fleetOptions.map((boat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className={`h-full hover:shadow-xl transition-all ${boat.popular ? 'ring-2 ring-blue-500' : ''}`}>
                    {boat.popular && (
                      <div className="bg-blue-500 text-white text-center py-2 text-sm font-bold">
                        MOST POPULAR FOR BACHELOR PARTIES
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Ship className="h-8 w-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-xl">{boat.name}</CardTitle>
                          <p className="text-blue-600 font-semibold">{boat.capacity}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{boat.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {boat.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <BlogPhotoStrip
              photos={[
                { src: BLOG_BOAT_PHOTOS.small.src, alt: BLOG_BOAT_PHOTOS.small.alt, caption: 'Day Tripper: 6-14 guests' },
                { src: BLOG_BOAT_PHOTOS.medium.src, alt: BLOG_BOAT_PHOTOS.medium.alt, caption: 'Meeseeks: 15-30 guests' },
                { src: BLOG_BOAT_PHOTOS.large.src, alt: BLOG_BOAT_PHOTOS.large.alt, caption: 'Clever Girl: 30-75 guests' }
              ]}
              columns={3}
            />

            <div className="text-center mt-8">
              <Link href="/private-cruises">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View Full Fleet Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Bachelor Party Photo Gallery</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Real bachelor parties on our Lake Travis boats
              </p>
            </motion.div>

            <AnimatedPhotoGallery />
          </div>
        </section>

        {/* Planning Tips */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Planning Your Austin Bachelor Party</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">Book Early</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Reserve your boat 2-3 months in advance, especially for peak season (summer and holiday weekends). 
                          Popular dates fill up fast!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Beer className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">BYOB Friendly</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Our boats are BYOB! We provide coolers stocked with ice. Pro tip: Use 
                          <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mx-1">
                            Party On Delivery
                          </a> 
                          for convenient alcohol delivery directly to the marina.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Clock className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">Perfect Timing</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Most bachelor parties book 4-hour cruises. Consider a sunset cruise for the best photos 
                          and atmosphere. We offer flexible morning, afternoon, and sunset time slots.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">Safety First</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          All cruises include a licensed, experienced captain. We have a perfect safety record 
                          over 15+ years with hundreds of happy customers.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <BlogImageBreak
                src={BLOG_PARTY_PHOTOS.dancing.src}
                alt={BLOG_PARTY_PHOTOS.dancing.alt}
                caption="Dance the night away on our party boats with disco lights and premium sound"
              />
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-blue-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <BlogPartyGallery title="Real Bachelor Party Action on Lake Travis" />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Plan Your Epic Bachelor Party?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join the thousands of bachelor parties that have celebrated on Lake Travis. 
                Let us help you create an unforgettable experience for the groom-to-be!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Start Planning Now
                  </Button>
                </Link>
                <a href="tel:512-488-5892">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 512-488-5892
                  </Button>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-yellow-400" />
                  <span>Hundreds of 5-Star Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-yellow-400" />
                  <span>Perfect Safety Record</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Explore More</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/bachelor-party-austin">
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <PartyPopper className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-bold text-lg mb-2">Bachelor Party Packages</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      View our complete bachelor party offerings
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/atx-disco-cruise">
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <Music className="h-12 w-12 mx-auto mb-4 text-pink-600" />
                    <h3 className="font-bold text-lg mb-2">ATX Disco Cruise</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Join our multi-group party cruise experience
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/private-cruises">
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <Ship className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-bold text-lg mb-2">Private Cruises</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Exclusive boat rentals for your group
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
