import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Anchor, Music, Camera, Waves, Sun, Shield,
  DollarSign, PartyPopper, MapPin, Heart, Star, ArrowRight,
  CheckCircle2, Sparkles, Wine, Smile, Crown, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/bachelor-party-group-guys-hero-compressed.webp';
import sectionImage from '@assets/atx-disco-cruise-party.webp';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const partyBoatStats = [
  { stat: '15+', label: 'Years Experience' },
  { stat: '100%', label: 'Safety Record' },
  { stat: 'BYOB', label: 'Bring Your Own' },
  { stat: '5-Star', label: 'Google Rating' }
];

const top10Reasons = [
  {
    number: 1,
    icon: Sparkles,
    title: 'Totally Unique Experience',
    description: "Everyone hits the bars in downtown Austin. But how many can say they celebrated on a floating paradise? A party boat gives your group a unique story that stands out. Cruising on Lake Travis with music blasting and drinks flowing is an experience you simply can't replicate on land.",
    highlight: "While others are standing in line at crowded clubs, you'll be dancing on deck under the sun."
  },
  {
    number: 2,
    icon: Sun,
    title: 'Scenic Outdoor Adventure',
    description: "Lake Travis is renowned for its crystal-clear blue waters and stunning Hill Country backdrop. As you cruise, you'll see beautiful cliffs, secluded coves, and breathtaking Texas scenery. It's the perfect mix of adventure and relaxation.",
    highlight: "Your bachelor party photos will have an incredible backdrop that beats any bar or club."
  },
  {
    number: 3,
    icon: Music,
    title: 'All-in-One Party (Music, Dancing, Swimming)',
    description: "Why choose between a pool party, dance club, and scenic tour when you can have all three? Blast your favorite tunes on the sound system, hit the dance floor on deck, then jump into the lake to cool off. It's the ultimate multi-activity celebration.",
    highlight: "Giant floats, lily pads, and warm Lake Travis waters are all part of the package."
  },
  {
    number: 4,
    icon: Shield,
    title: 'Privacy and Freedom',
    description: "Unlike crowded bars where you're competing for space with strangers, a party boat is exclusively for you and your crew. Control the guest list, music playlist, and vibe. Want to blast 90s hip-hop? Done. Feel like anchoring in a quiet cove? Your call.",
    highlight: "It's your private floating venue—no dress codes, no cover charges, no strangers."
  },
  {
    number: 5,
    icon: Users,
    title: 'Socialize with Other Parties (ATX Disco Cruise)',
    description: "If your group wants to meet other bachelor and bachelorette parties, the ATX Disco Cruise is legendary. It's a shared party cruise where multiple groups come together for an epic four-hour floating dance party with a professional DJ and photographer.",
    highlight: "Perfect for smaller groups who want high energy and the chance to meet other celebrating crews."
  },
  {
    number: 6,
    icon: DollarSign,
    title: 'BYOB = Budget Friendly',
    description: "No $14 cocktails or surprise bar tabs at the end of the night. Most Austin party boats are BYOB, meaning you bring your own beverages and pay wholesale prices. Services like Party On Delivery can even drop off your drinks at the marina.",
    highlight: "You know your costs upfront—no bottle service minimums or overpriced venue drinks."
  },
  {
    number: 7,
    icon: Anchor,
    title: 'Fits Any Group Size',
    description: "Whether you have 8 guys or 75, there's a party boat option for you. The ATX Disco Cruise works great for smaller bachelor parties, while private charters accommodate groups up to 75 guests. Every group size gets the perfect fit.",
    highlight: "From intimate crews to massive squads, Lake Travis party boats scale to your needs."
  },
  {
    number: 8,
    icon: CheckCircle2,
    title: 'Safe and Hassle-Free (Licensed Captain)',
    description: "With a professional, Coast Guard certified captain at the helm, nobody in your group has to stay sober to drive. No navigation stress, no legal liability, no worrying about boat rentals. The captain handles everything while you focus on celebrating.",
    highlight: "Zero drinking and driving concerns—just pure, stress-free fun on the water."
  },
  {
    number: 9,
    icon: Camera,
    title: 'Epic Memories and Photos',
    description: "The combination of stunning scenery, happy friends, and party vibes creates incredible photo opportunities. The ATX Disco Cruise even includes a professional photographer. Your bachelor party content will be the envy of social media.",
    highlight: "From action shots of cliff jumping to sunset group photos—you'll capture it all."
  },
  {
    number: 10,
    icon: Star,
    title: "Austin's Signature Party Vibe",
    description: "Austin is famous for its 'Keep It Weird' culture and party energy. A Lake Travis party boat captures that spirit perfectly—it's adventurous, unique, and totally Austin. You're not just throwing a bachelor party; you're experiencing Austin the way locals celebrate.",
    highlight: "This is how Austin does bachelor parties. Join the tradition."
  }
];

const faqs = [
  {
    question: 'How far in advance should we book for a bachelor party?',
    answer: "Peak season (March-October) fills up fast, especially Saturdays. We recommend booking 2-4 weeks in advance for the best availability. Bachelor party groups are our most popular customers, so weekends book quickly. Last-minute spots sometimes open up, but don't count on it."
  },
  {
    question: 'What should we bring on the party boat?',
    answer: "Bring sunscreen, sunglasses, swimsuits, towels, and your beverages (BYOB - no glass containers). We provide coolers with ice, floats, and all the party equipment. For easy alcohol delivery, check out Party On Delivery who can deliver directly to the marina."
  },
  {
    question: 'Is the ATX Disco Cruise or a private charter better for bachelor parties?',
    answer: "It depends on your group! The ATX Disco Cruise is perfect for groups of 6-20 who want high energy, a DJ, photographer, and the chance to party with other celebrating groups. Private charters are ideal for larger groups (20-75) who want exclusive access and full control over music and schedule."
  },
  {
    question: 'What happens if the weather is bad?',
    answer: "Our licensed captains monitor weather conditions constantly. If severe weather is predicted, we work with groups to reschedule. Light rain usually doesn't stop the party—Texas summer showers pass quickly. Safety always comes first, and we have backup protocols in place."
  },
  {
    question: 'Can we combine our bachelor party with a bachelorette group?',
    answer: "Absolutely! Combined bachelor/bachelorette cruises are very popular on the ATX Disco Cruise. Many engaged couples bring both groups together for a joint celebration. It's often more fun than separate events and creates amazing memories for everyone."
  },
  {
    question: 'How does transportation to the marina work?',
    answer: "Lake Travis marinas are about 30 minutes from downtown Austin. Many bachelor groups rent a party bus or van so everyone can ride together and no one has to drive. We recommend planning transportation in advance, especially if your group will be enjoying adult beverages."
  }
];

export default function Top10BachelorPartyBoatReasons() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = "https://premierpartycruises.com/blogs/top-10-reasons-austin-bachelor-party-lake-travis-boat";

  return (
    <>
      <Helmet>
        <title>Top 10 Reasons for a Lake Travis Bachelor Party Boat</title>
        <meta name="description" content="Discover the top 10 reasons to host your Austin bachelor party on Lake Travis. BYOB savings, epic photos, swimming, and unforgettable memories await." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Top 10 Reasons for a Lake Travis Bachelor Party Boat" />
        <meta property="og:description" content="Discover the top 10 reasons to host your Austin bachelor party on Lake Travis. BYOB savings, epic photos, swimming, and unforgettable memories await." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Top 10 Reasons for a Lake Travis Bachelor Party Boat" />
        <meta name="twitter:description" content="Discover the top 10 reasons to host your Austin bachelor party on Lake Travis. BYOB savings, epic photos, swimming, and unforgettable memories await." />
        <meta name="keywords" content="austin bachelor party, lake travis party boat, bachelor party austin, lake travis bachelor party, austin party boat, bachelor party ideas austin, top 10 bachelor party reasons" />
      </Helmet>

      <PublicNavigation />

      <main className="min-h-screen bg-white">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Bachelor party group celebrating on a Lake Travis party boat in Austin Texas"
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
                  Bachelor Party Guide
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Top 10 Reasons to Host Your Austin Bachelor Party on a Lake Travis Party Boat
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-blue-100 mb-8 leading-relaxed"
              >
                Planning the ultimate bachelor weekend? Discover why a Lake Travis party boat 
                is the smartest, most unforgettable way to celebrate in Austin.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/bachelor-party-austin">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" data-testid="button-bachelor-party-hub">
                    <Users className="mr-2 h-5 w-5" />
                    Bachelor Party Hub
                  </Button>
                </Link>
                <Link href="/atx-disco-cruise">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-atx-disco-cruise">
                    <Ship className="mr-2 h-5 w-5" />
                    ATX Disco Cruise
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
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="bg-blue-100 text-blue-800 mb-4">The Ultimate Bachelor Party</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why a Lake Travis Party Boat Beats Every Other Option
                </h2>
                <p className="text-lg text-gray-600">
                  An Austin bachelor party isn't just another weekend—it's a celebration that deserves 
                  something special. Here's why groups consistently choose Lake Travis party boats.
                </p>
              </motion.div>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              {top10Reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <Card className="overflow-hidden border-2 hover:border-blue-300 transition-colors">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 md:p-8 flex items-center justify-center md:w-32">
                          <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                              {reason.number}
                            </div>
                            <reason.icon className="h-6 w-6 text-orange-400 mx-auto" />
                          </div>
                        </div>
                        <div className="p-6 md:p-8 flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                            {reason.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {reason.description}
                          </p>
                          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r">
                            <p className="text-orange-800 font-medium text-sm">
                              {reason.highlight}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Badge className="bg-orange-100 text-orange-800 mb-4">Featured Experience</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    The ATX Disco Cruise Experience
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Austin's most popular bachelor party boat experience. A four-hour floating dance party 
                    with DJ, professional photographer, giant floats, and the chance to party with other 
                    celebrating groups.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      'Professional DJ spinning hits all cruise',
                      'Photographer capturing every moment',
                      'Giant lily pads and floats included',
                      'BYOB with coolers and ice provided',
                      'Meet other bachelor & bachelorette parties'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/atx-disco-cruise">
                      <Button className="bg-orange-500 hover:bg-orange-600" data-testid="button-learn-disco">
                        Learn More About ATX Disco Cruise
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/private-boat-rentals">
                      <Button variant="outline" data-testid="button-private-options">
                        Explore Private Charters
                      </Button>
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={sectionImage} 
                    alt="ATX Disco Cruise party atmosphere on Lake Travis"
                    className="rounded-xl shadow-xl w-full"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Pro Tip: BYOB Made Easy
                </h2>
                <p className="text-xl text-blue-200 mb-6">
                  Don't waste time running to the store. Let <a 
                    href="https://partyondelivery.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 underline font-semibold"
                  >Party On Delivery</a> handle your beverages.
                </p>
                <p className="text-blue-300">
                  They'll deliver beer, seltzers, and mixers directly to your Airbnb or the marina. 
                  Your cooler will be stocked and waiting when you arrive.
                </p>
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
              className="max-w-3xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <Badge className="bg-blue-100 text-blue-800 mb-4">Common Questions</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Bachelor Party Boat FAQs
                </h2>
                <p className="text-lg text-gray-600">
                  Everything you need to know about planning your Austin bachelor party on Lake Travis.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`faq-${index}`}
                      className="border rounded-lg px-6 bg-gray-50"
                    >
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ready to Plan the Ultimate Bachelor Party?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Join thousands of groups who've celebrated on Lake Travis. 
                  Your bachelor party story starts here.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/bachelor-party-austin">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600" data-testid="button-bachelor-hub-bottom">
                      <Users className="mr-2 h-5 w-5" />
                      Bachelor Party Hub
                    </Button>
                  </Link>
                  <Link href="/atx-disco-cruise">
                    <Button size="lg" variant="outline" data-testid="button-disco-bottom">
                      <PartyPopper className="mr-2 h-5 w-5" />
                      ATX Disco Cruise
                    </Button>
                  </Link>
                  <Link href="/private-boat-rentals">
                    <Button size="lg" variant="outline" data-testid="button-private-bottom">
                      <Ship className="mr-2 h-5 w-5" />
                      Private Charters
                    </Button>
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
