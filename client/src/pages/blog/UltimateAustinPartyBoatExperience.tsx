import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Anchor, Sun, Music, Camera, Waves, MapPin,
  PartyPopper, Wine, Car, Calendar, CheckCircle2, Shield,
  Clock, Heart, Building2, Cake, Star, ArrowRight, Umbrella,
  DollarSign, Sparkles, UserCheck, Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/atx-disco-cruise-party.webp';
import sectionImage1 from '@assets/clever-girl-1-lake-travis-party-boat.jpg';
import sectionImage2 from '@assets/bachelor-party-group-guys-hero-compressed.webp';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const partyBoatStats = [
  { stat: '150K+', label: 'Happy Guests' },
  { stat: '15+', label: 'Years Experience' },
  { stat: 'BYOB', label: 'Bring Your Own' },
  { stat: '5-Star', label: 'Google Rating' }
];

const whyChooseReasons = [
  {
    icon: MapPin,
    title: 'Scenic Views',
    description: 'Enjoy panoramic vistas of Lake Travis and the Texas Hill Country as your backdrop. The scenery adds a wow factor to every photo.'
  },
  {
    icon: PartyPopper,
    title: 'All-in-One Fun',
    description: 'A party boat combines elements of a bar, nightclub, and resort pool party all in one. Dance, swim, sunbathe, and celebrate simultaneously.'
  },
  {
    icon: Shield,
    title: 'Privacy & Personalization',
    description: 'Unlike crowded bars, a private Lake Travis party boat is exclusively for you and your guests. Control the guest list, music, and vibe.'
  },
  {
    icon: DollarSign,
    title: 'BYOB Friendly',
    description: 'Most party boat charters are BYOB—bring your favorite drinks and snacks. No overpriced bar tabs, just your own custom party.'
  },
  {
    icon: Anchor,
    title: 'Safe, Captained Cruise',
    description: 'Professional Coast Guard certified captains handle navigation while you focus on having fun. Safety meets celebration.'
  }
];

const groupTypes = [
  {
    icon: Users,
    title: 'Bachelor Parties',
    description: 'An Austin bachelor party on a boat is legendary. Crack open beers, play games on deck, dive into the lake, and enjoy the ultimate "last splash."',
    link: '/bachelor-party-austin',
    linkText: 'Bachelor Party Info'
  },
  {
    icon: Heart,
    title: 'Bachelorette Parties',
    description: 'A party boat is basically a private VIP lounge on water. Pop champagne, dance under the sun, and celebrate the bride-to-be in style.',
    link: '/bachelorette-party-austin',
    linkText: 'Bachelorette Party Info'
  },
  {
    icon: Building2,
    title: 'Corporate Outings',
    description: 'Surprise your team with a refreshing change from the conference room. Bond, relax, and incorporate team-building games on the water.',
    link: '/corporate-events',
    linkText: 'Corporate Events Info'
  },
  {
    icon: Cake,
    title: 'Birthdays & Reunions',
    description: 'From 21st birthdays to family reunions, a party boat suits all ages. Perfect for milestone celebrations with friends and family.',
    link: '/private-boat-rentals',
    linkText: 'Private Rentals Info'
  },
  {
    icon: Sparkles,
    title: 'Weddings & More',
    description: 'Host micro-weddings, rehearsal dinners, or wedding after-parties on the lake. Imagine saying "I do" at sunset on Lake Travis.',
    link: '/private-boat-rentals',
    linkText: 'Wedding Options'
  }
];

const whatToExpect = [
  { icon: Ship, text: 'Spacious boats with ample seating and coolers' },
  { icon: Music, text: 'Bluetooth sound systems or live DJ' },
  { icon: Camera, text: 'Professional photographer available' },
  { icon: Waves, text: 'Swimming, floats, and lily pads included' },
  { icon: PartyPopper, text: 'Disco dance floor and lighting on select boats' },
  { icon: Sun, text: 'Anchor at Devil\'s Cove for swimming' }
];

const partyTips = [
  {
    icon: Calendar,
    title: 'Book Early',
    description: 'Austin is a hot destination for parties. Boats book up weeks or months in advance—reserve your date early.'
  },
  {
    icon: Sun,
    title: 'Choose the Right Time',
    description: 'Midday for maximum sun and swimming, or late afternoon for stunning Lake Travis sunsets and cooler temps.'
  },
  {
    icon: Car,
    title: 'Plan Transportation',
    description: 'The marina is about 30 minutes from downtown. Consider a party bus so no one has to drive.'
  },
  {
    icon: Umbrella,
    title: 'Pack Smart',
    description: 'Bring sunscreen, hats, sunglasses, swimsuits, towels, and flip-flops. Don\'t forget phone chargers!'
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Listen to your captain\'s safety briefings. Life jackets are on board, and everyone should look out for each other.'
  }
];

const faqs = [
  {
    question: 'What is included on an Austin party boat rental?',
    answer: 'Most party boats include a professional captain, coolers with ice, Bluetooth sound system, ample seating, and water floats or lily pads. The ATX Disco Cruise also includes a DJ, professional photographer, and disco dance floor. All boats are BYOB—bring your own beverages and snacks.'
  },
  {
    question: 'How does BYOB work on party boats?',
    answer: 'BYOB means Bring Your Own Beverage. You bring whatever you want to drink (no glass containers). We provide coolers and ice. For easy alcohol delivery, we partner with Party On Delivery (partyondelivery.com) who can deliver directly to your Airbnb or the marina.'
  },
  {
    question: 'How many people can fit on a party boat?',
    answer: 'We have boats ranging from 14 to 75 guests. The Day Tripper fits 14, Meeseeks fits 25, Clever Girl fits 50, and our flagship 75-person boat is perfect for large groups. The ATX Disco Cruise accommodates multiple groups on our largest vessel.'
  },
  {
    question: 'What should I bring on a Lake Travis party boat?',
    answer: 'Essentials include sunscreen, hats, sunglasses, swimsuits, towels, and flip-flops. For themed parties, bring matching outfits or decorations. Don\'t forget a phone charger or portable battery pack. We provide ice, coolers, and floats.'
  },
  {
    question: 'Can we swim off the boat?',
    answer: 'Yes! Swimming is one of the best parts. Your captain will anchor at popular swimming spots like Devil\'s Cove. We provide large floats and lily pads so your group can lounge together in the water. Lake Travis has warm, clear water perfect for swimming.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'Your safety is our priority. Our captains monitor conditions constantly and make safety calls when necessary. We work with groups to reschedule if severe weather is predicted. Light rain usually doesn\'t stop the party!'
  },
  {
    question: 'How far in advance should I book?',
    answer: 'Peak season (March-October) fills up quickly, especially Saturdays. We recommend booking 2-4 weeks in advance for the best availability. For bachelor or bachelorette parties, book even earlier as these are our most popular events.'
  },
  {
    question: 'What\'s the difference between private charter and ATX Disco Cruise?',
    answer: 'Private charters give your group exclusive use of a boat with custom music and schedule. The ATX Disco Cruise is a shared party cruise with multiple groups, a professional DJ, photographer, and high-energy atmosphere. Both options include BYOB and swimming stops.'
  }
];

export default function UltimateAustinPartyBoatExperience() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = "https://premierpartycruises.com/blogs/ultimate-austin-party-boat-experience-any-celebration";

  return (
    <>
      <Helmet>
        <title>Ultimate Austin Party Boat Experience Guide | Lake Travis</title>
        <meta name="description" content="Plan the ultimate Austin party boat celebration on Lake Travis. From bachelor parties to corporate events, discover everything you need to know." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Ultimate Austin Party Boat Experience Guide | Lake Travis" />
        <meta property="og:description" content="Plan the ultimate Austin party boat celebration on Lake Travis. From bachelor parties to corporate events, discover everything you need to know." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ultimate Austin Party Boat Experience Guide | Lake Travis" />
        <meta name="twitter:description" content="Plan the ultimate Austin party boat celebration on Lake Travis. From bachelor parties to corporate events, discover everything you need to know." />
        <meta name="keywords" content="austin party boat, lake travis party boat, party boat austin, austin bachelor party, austin bachelorette party, corporate boat party austin, lake travis boat rental, party cruise austin" />
      </Helmet>

      <PublicNavigation />

      <main className="min-h-screen bg-white">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Austin party boat celebration on Lake Travis with guests dancing and enjoying the water"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 py-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="max-w-3xl"
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <Badge className="bg-orange-500 text-white px-4 py-1">
                  Austin Party Boats
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                The Ultimate Austin Party Boat Experience for Any Celebration
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-blue-100 mb-8 leading-relaxed"
              >
                Picture this: you and your favorite people aboard a spacious boat, gliding across the blue waters of Lake Travis with sunshine sparkling on the waves. The music is pumping, the drinks are cold, and the energy is electric.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" data-testid="button-disco-cruise">
                    <Ship className="mr-2 h-5 w-5" />
                    ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/private-boat-rentals">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-private-rentals">
                    <Anchor className="mr-2 h-5 w-5" />
                    Private Boat Rentals
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-b from-blue-900 to-blue-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partyBoatStats.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">{item.stat}</div>
                  <div className="text-blue-200 text-sm">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-blue-100 text-blue-800 mb-4">Why Choose Us</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Choose a Party Boat in Austin?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  What makes an Austin party boat stand out from other venues? In one word: freedom. On a Lake Travis party boat, you're not confined to four walls of a bar or club.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {whyChooseReasons.map((reason, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <reason.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
                        <p className="text-gray-600">{reason.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-orange-100 text-orange-800 mb-4">Perfect for Everyone</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Perfect for Every Group Occasion
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  One of the best parts of an Austin party boat is its versatility. It works for any type of group and occasion.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                <motion.div variants={fadeInUp}>
                  <img 
                    src={sectionImage1} 
                    alt="Lake Travis party boat with guests enjoying the water and sunshine"
                    className="rounded-xl shadow-lg w-full h-64 object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <img 
                    src={sectionImage2} 
                    alt="Bachelor party group celebrating on Austin party boat"
                    className="rounded-xl shadow-lg w-full h-64 object-cover"
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {groupTypes.map((group, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="p-3 bg-orange-100 rounded-lg w-fit mb-4">
                          <group.icon className="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{group.title}</h3>
                        <p className="text-gray-600 mb-4">{group.description}</p>
                        <Link href={group.link}>
                          <Button variant="outline" size="sm" className="w-full" data-testid={`button-${group.title.toLowerCase().replace(/\s+/g, '-')}`}>
                            {group.linkText}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-blue-700 text-blue-100 mb-4">The Experience</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What to Expect on a Lake Travis Party Boat
                </h2>
                <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                  If you've never experienced a party boat before, here's what you get when you book with Premier Party Cruises.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {whatToExpect.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-4 bg-blue-800/50 rounded-lg p-4"
                  >
                    <div className="p-2 bg-orange-500 rounded-lg flex-shrink-0">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-blue-100">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeInUp} className="text-center mt-10">
                <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
                  On a shared party cruise like the Disco Cruise, expect a high-energy atmosphere with multiple groups partying together. For private charters, you set your own vibe—it can be a raging dance party or a laid-back chill cruise.
                </p>
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600" data-testid="button-disco-cruise-cta">
                    Experience the ATX Disco Cruise
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-green-100 text-green-800 mb-4">Pro Tips</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Tips for a Fantastic Boat Party
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Make sure your Austin party boat experience is as smooth and fun as possible with these tips.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {partyTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <tip.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{tip.title}</h3>
                    </div>
                    <p className="text-gray-600">{tip.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeInUp} className="mt-10 bg-orange-50 border border-orange-200 rounded-xl p-6 max-w-3xl mx-auto">
                <div className="flex items-start gap-4">
                  <Wine className="h-8 w-8 text-orange-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Easy Beverage Delivery</h3>
                    <p className="text-gray-700">
                      Need drinks delivered? Our partner <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-semibold">Party On Delivery</a> can deliver alcohol directly to your Airbnb or the marina so your beverages are chilled and waiting on the boat.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <QuoteBuilderSection />

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="max-w-3xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-blue-100 text-blue-800 mb-4">FAQ</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600">
                  Everything you need to know about Austin party boats and Lake Travis cruises.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-white mb-2 rounded-lg border">
                      <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline" data-testid={`faq-trigger-${index}`}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Create Unforgettable Memories?
                </h2>
                <p className="text-xl text-blue-200 mb-8">
                  No matter the occasion—a wild bachelor party, an elegant bachelorette party, a company outing, or just a sunny Saturday with friends—an Austin party boat guarantees a good time.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/atx-disco-cruise">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600" data-testid="button-cta-disco">
                      <Ship className="mr-2 h-5 w-5" />
                      Book ATX Disco Cruise
                    </Button>
                  </Link>
                  <Link href="/private-boat-rentals">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-cta-private">
                      <Anchor className="mr-2 h-5 w-5" />
                      Private Boat Rentals
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 pt-8 border-t border-blue-700">
                <p className="text-blue-300 mb-4">Explore More Party Options</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <Link href="/bachelor-party-austin" className="text-blue-200 hover:text-white hover:underline">
                    Bachelor Party Austin
                  </Link>
                  <span className="text-blue-600">•</span>
                  <Link href="/bachelorette-party-austin" className="text-blue-200 hover:text-white hover:underline">
                    Bachelorette Party Austin
                  </Link>
                  <span className="text-blue-600">•</span>
                  <Link href="/corporate-events" className="text-blue-200 hover:text-white hover:underline">
                    Corporate Events
                  </Link>
                  <span className="text-blue-600">•</span>
                  <Link href="/atx-disco-cruise" className="text-blue-200 hover:text-white hover:underline">
                    ATX Disco Cruise
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
