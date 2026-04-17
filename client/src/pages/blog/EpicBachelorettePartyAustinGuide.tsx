import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Phone, Clock, CheckCircle2, 
  Music, Sun, Waves, MapPin, Calendar, Star,
  ArrowRight, Utensils, Wine, Mountain, Sparkles,
  DollarSign, Camera, Droplets, PartyPopper, Trophy,
  Home, Package, Truck, Heart, ChevronRight, Palette,
  Flower2, Gem, ShoppingBag, Bath, Umbrella
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import RelatedBlogArticles from '@/components/RelatedBlogArticles';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/@capitalcityshots-1_1760080740012.jpg';
import sectionImage1 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import sectionImage2 from '@assets/@capitalcityshots-3_1760080740017.jpg';
import sectionImage3 from '@assets/clever-girl-3-bachelorette-boat.jpg';
import sectionImage4 from '@assets/@capitalcityshots-5_1760072938923.jpg';


const discoCruiseFeatures = [
  { icon: Music, text: 'Professional DJ spinning the hottest tracks' },
  { icon: Camera, text: 'Professional photographer for Instagram-worthy shots' },
  { icon: Waves, text: 'Giant 25-foot unicorn float & lily pad floats' },
  { icon: Droplets, text: 'Ice water stations to stay refreshed' },
  { icon: Package, text: 'Private cooler for your bride tribe' },
  { icon: PartyPopper, text: 'Party supplies & decorations included' },
  { icon: Users, text: 'Multi-group energy with 50-100 people celebrating' },
  { icon: Sparkles, text: 'All-inclusive: Just bring your crew and party' }
];

const brunchSpots = [
  { name: 'South Congress Cafe', description: 'Trendy brunch with Austin vibes' },
  { name: "Banger's Sausage House", description: 'Epic brunch with mimosas on tap' },
  { name: 'Josephine House', description: 'Upscale & Instagram-worthy' },
  { name: 'Launderette', description: 'East Austin gem with amazing pastries' }
];

const nightlifeAreas = [
  { name: 'Rainey Street', description: 'Bungalow bars, cocktails, food trucks, bachelorette-heavy crowds', vibe: 'Upscale Casual' },
  { name: 'Sixth Street', description: 'High energy, tons of bars, live music everywhere', vibe: 'Wild Energy' },
  { name: 'East Austin', description: 'Craft cocktails, trendy spots, hidden speakeasies', vibe: 'Trendy' }
];

const spaOptions = [
  { name: 'Milk + Honey', type: 'Full-Service Spa' },
  { name: 'HIATUS Spa + Retreat', type: 'Luxury Day Spa' },
  { name: 'Viva Day Spa', type: 'Group-Friendly' },
  { name: 'Massage Envy', type: 'Budget-Friendly' }
];

const themeIdeas = [
  { name: 'Cowgirl Glam', description: 'Pink cowgirl hats, boots & sparkles', icon: Star },
  { name: 'Boho Chic', description: 'Flower crowns, flowy dresses, earth tones', icon: Flower2 },
  { name: 'Austin City Limits', description: 'Live music vibes & concert tees', icon: Music },
  { name: 'Lake Life', description: 'Matching swimsuits, floaties, sun hats', icon: Waves },
  { name: 'Last Disco', description: 'Disco balls, sparkly outfits, 70s vibes', icon: Sparkles },
  { name: 'Western Chic', description: 'Sophisticated cowgirl with fringe & denim', icon: Gem }
];

export default function EpicBachelorettePartyAustinGuide() {
  return (
    <LazyMotionProvider>
    <SEOHead
      pageRoute="/blogs/epic-bachelorette-party-austin-ultimate-guide"
      defaultTitle="Austin Texas Bachelorette Party Guide & Ideas | Premier Party Cruises"
      defaultDescription="Discover top activities for an Austin Texas bachelorette party! From lively nightlife to serene spots, explore exciting itineraries, themes, and dining ideas for an unforgettable celebration."
      defaultKeywords={['Austin bachelorette party', 'bachelorette party Austin TX', 'Austin bachelorette ideas', 'Lake Travis bachelorette', 'ATX Disco Cruise', 'Rainey Street bachelorette', 'girls trip Austin', 'bride tribe Austin']}
      image="https://premierpartycruises.com/attached_assets/@capitalcityshots-1_1760080740012.jpg"
    />
    <BlogV2Layout
      title="Austin Texas Bachelorette Party Guide & Ideas"
      description="Discover top activities for an Austin Texas bachelorette party! From lively nightlife to serene spots, explore exciting itineraries, themes, and dining ideas for an unforgettable celebration."
      slug="epic-bachelorette-party-austin-ultimate-guide"
      category="Bachelorette Guides"
      categoryHref="/bachelorette-party-austin"
      pillarTitle="Austin Bachelorette Party Guide"
      pillarHref="/bachelorette-party-austin"
      relatedArticles={[
        { title: "How to Throw a Great Bachelorette Party in Austin", href: "/blogs/how-to-throw-great-bachelorette-party-austin" },
        { title: "Ultimate Austin Bachelorette Party Boat Guide", href: "/blogs/ultimate-austin-bachelorette-party-boat-guide-lake-travis" },
        { title: "Why Choose Austin for Your Bachelorette Party", href: "/blogs/why-choose-austin-bachelorette-party" },
      ]}
    >
    <div data-page-ready="epic-bachelorette-party-austin-guide" className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-600 via-purple-600 to-pink-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage 
            src={heroImage} 
            alt="Austin bachelorette party group celebrating on Lake Travis party boat" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 via-purple-900/70 to-pink-900/80"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <m.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Badge className="mb-6 bg-pink-500/20 text-pink-200 border-pink-400/50 text-sm px-4 py-1">
                THE ULTIMATE AUSTIN BACHELORETTE GUIDE
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Austin Texas<br />
                <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Bachelorette Party Guide
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-pink-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                From lively nightlife to serene spa days, Lake Travis bachelorette party boat cruises to legendary Rainey Street—
                discover everything you need for an unforgettable Austin bachelorette party celebration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/atx-disco-cruise">
                  <Button 
                    size="lg" 
                    className="bg-pink-500 hover:bg-pink-400 text-white font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-pink-400/50 transition-all hover:scale-105"
                    data-testid="button-hero-book-cruise"
                  >
                    <Ship className="mr-2 h-5 w-5" />
                    Book ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                    data-testid="button-hero-get-quote"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Get a Custom Quote
                  </Button>
                </Link>
              </div>
              
              <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-300" />
                  <span>Thousands of Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-pink-300 fill-pink-300" />
                  <span>4.9★ Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-pink-300" />
                  <span>15+ Years Experience</span>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This guide is part of our complete{' '}
            <Link href="/bachelorette-party-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin bachelorette party boats</Link>{' '}
            resource — your ultimate planning hub for Lake Travis bachelorette celebrations.
          </p>
        </div>
      </div>


      {/* Why Austin Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">WHY AUSTIN</Badge>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Why Choose Austin for Your Bachelorette Celebration?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Austin draws bachelorette parties like a magnet. Its eclectic culture, legendary nightlife, 
                amazing food scene, and beautiful Lake Travis make it the perfect destination for your bride tribe.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <LazyImage 
                  src={sectionImage1} 
                  alt="Lake Travis bachelorette party boat cruise with bride tribe celebrating" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
              </m.div>
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  The #1 Austin Bachelorette Party Experience
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  When it comes to <strong>Austin bachelorette party ideas</strong>, one experience stands above everything else: a 
                  <Link href="/atx-disco-cruise" className="text-pink-600 hover:underline font-semibold"> Lake Travis bachelorette party boat</Link> cruise with Premier Party Cruises and their legendary 
                  <strong> ATX Disco Cruise</strong>—a four-hour, high-energy, all-inclusive lake party that bride tribes say is the highlight of the entire Austin bachelorette party weekend.
                </p>
                <div className="space-y-3">
                  {['No planning stress - everything included', 'Multi-group energy multiplies the fun', 'Professional DJ & photographer', 'Perfect for groups of any size'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/bachelorette-party-austin">
                    <Button className="bg-pink-600 hover:bg-pink-700" data-testid="button-learn-bachelorette">
                      Explore Bachelorette Options <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </m.div>
            </div>

            {/* Why Austin Reasons */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {[
                { icon: Music, title: 'Lively Nightlife', description: 'Austin\'s nightlife is legendary with bars and clubs for every taste' },
                { icon: Utensils, title: 'Delicious Dining', description: 'From high-end restaurants to quirky food trucks' },
                { icon: Palette, title: 'Unique Attractions', description: 'Murals, museums, and experiences for everyone' },
                { icon: ShoppingBag, title: 'Boutique Shopping', description: 'South Congress has the cutest local shops' }
              ].map((reason, i) => (
                <m.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-pink-100 dark:border-pink-900/30">
                    <CardContent className="p-6 text-center">
                      <div className="bg-pink-100 dark:bg-pink-900/30 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                        <reason.icon className="h-7 w-7 text-pink-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{reason.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{reason.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premier Party Cruises Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-200 text-pink-700">THE ULTIMATE ACTIVITY</Badge>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Premier Party Cruises: The Ultimate Bachelorette Activity
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                As Austin's <Link href="/" className="text-pink-600 hover:underline">bachelorette party specialist</Link>, 
                Premier Party Cruises offers exceptional experiences on <Link href="/party-boat-lake-travis" className="text-pink-600 hover:underline">Lake Travis</Link>.
              </p>
            </m.div>

            <Card className="border-2 border-pink-200 dark:border-pink-800 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Ship className="h-8 w-8" />
                  </div>
                  <div>
                    <span className="text-pink-200 text-sm font-semibold">#1 BACHELORETTE ACTIVITY IN AUSTIN</span>
                    <h3 className="text-2xl font-black">The ATX Disco Cruise Experience</h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                      The <Link href="/atx-disco-cruise" className="text-pink-600 hover:underline font-semibold">ATX Disco Cruise</Link> is 
                      often hailed as the top day party and Lake Travis bachelorette party boat experience in Austin. This fun-filled cruise combines scenic Lake Travis views, 
                      lively music, and a party atmosphere that sets the tone for an amazing Austin bachelorette party weekend.
                    </p>
                    
                    <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-6 mb-6">
                      <p className="text-pink-800 dark:text-pink-300 font-semibold text-lg mb-2">
                        "This is not just a boat ride—it's a celebration!"
                      </p>
                      <p className="text-pink-700 dark:text-pink-400 text-sm">— What most bride tribes say</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                      What's Included:
                    </h4>
                    <div className="grid gap-3">
                      {discoCruiseFeatures.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                          <feature.icon className="h-5 w-5 text-purple-600 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link href="/atx-disco-cruise">
                    <Button size="lg" className="bg-pink-600 hover:bg-pink-700 font-bold" data-testid="button-book-disco">
                      <Ship className="mr-2 h-5 w-5" />
                      Book ATX Disco Cruise
                    </Button>
                  </Link>
                  <Link href="/private-cruises">
                    <Button size="lg" variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50" data-testid="button-private-boats">
                      View Private Boat Options
                    </Button>
                  </Link>
                  <Link href="/gallery">
                    <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50" data-testid="button-gallery">
                      See Photo Gallery
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BYOB & Alcohol Delivery Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="border-2 border-green-200 dark:border-green-800 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Truck className="h-8 w-8" />
                    </div>
                    <div>
                      <span className="text-green-200 text-sm font-semibold">SKIP THE ERRANDS</span>
                      <h3 className="text-2xl font-black">BYOB Made Easy with Alcohol Delivery</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        Bachelorette groups LOVE Austin—but hate errands. Our boats are BYOB, meaning you bring your own drinks. 
                        Skip the liquor store runs with <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">Party On Delivery</a>, 
                        the official alcohol-delivery concierge that stocks your Airbnb or delivers directly to your 
                        <Link href="/party-boat-austin" className="text-green-600 hover:underline"> Premier Party Cruises boat</Link>.
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        {[
                          { icon: Home, text: 'Stock your Airbnb before you arrive', link: 'https://www.partyondelivery.com' },
                          { icon: Ship, text: 'Deliver directly to your boat at the marina', link: 'https://www.partyondelivery.com' },
                          { icon: Wine, text: 'Wine, champagne, seltzers, mixers—all delivered', link: 'https://www.partyondelivery.com' },
                          { icon: Clock, text: 'Last-minute refills available same-day', link: 'https://www.partyondelivery.com' }
                        ].map((item, i) => (
                          <a 
                            key={i} 
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                          >
                            <item.icon className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                          </a>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-green-600 hover:bg-green-700" data-testid="button-party-on-delivery">
                            <Truck className="mr-2 h-4 w-4" />
                            Order from Party On Delivery
                          </Button>
                        </a>
                        <Link href="/faq">
                          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" data-testid="button-byob-info">
                            Learn More About BYOB
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div>
                      <LazyImage 
                        src={sectionImage3} 
                        alt="Bachelorette party on Clever Girl boat with drinks" 
                        className="rounded-2xl shadow-xl w-full h-80 object-cover"
                        aspectRatio="4/3"
                      />
                      <p className="text-center text-sm text-gray-500 mt-3">
                        <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Party On Delivery</a> delivers 
                        directly to your Premier Party Cruises boat!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          </div>
        </div>
      </section>

      {/* Top Bachelorette Ideas */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">TOP IDEAS</Badge>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Top Bachelorette Party Ideas in Austin
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Everything you need for the ultimate girls' weekend
              </p>
            </m.div>

            {/* Nightlife Section */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12"
            >
              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Music className="h-8 w-8" />
                    </div>
                    <div>
                      <span className="text-purple-200 text-sm font-semibold">LEGENDARY NIGHTLIFE</span>
                      <CardTitle className="text-2xl font-black">Rainey Street & Sixth Street</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    <Link href="/austin-bachelorette-nightlife" className="text-purple-600 hover:underline">Austin nightlife</Link> is unmatched. 
                    From the upscale bungalow bars of Rainey Street to the wild energy of Sixth Street, 
                    your bachelorette party has endless options for an epic night out.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {nightlifeAreas.map((area, i) => (
                      <div key={i} className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl">
                        <Badge className="mb-2 bg-purple-200 text-purple-800">{area.vibe}</Badge>
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{area.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{area.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-4">
                    <p className="text-pink-800 dark:text-pink-300 italic">
                      <strong>Pro tip:</strong> Start on Rainey Street for upscale cocktails and food trucks, 
                      then head to Sixth if you want a crazier, more party-focused night! Don't forget to order drinks ahead 
                      from <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Party On Delivery</a> for pre-gaming at your Airbnb.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </m.div>

            {/* Spa & Relaxation */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12"
            >
              <Card className="border-2 border-teal-200 dark:border-teal-800">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Bath className="h-8 w-8" />
                    </div>
                    <div>
                      <span className="text-teal-200 text-sm font-semibold">RELAX & REJUVENATE</span>
                      <CardTitle className="text-2xl font-black">Spa Days & Pampering</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Balance the party with some relaxation! Check out our 
                    <Link href="/blogs/austin-bachelorette-bliss-spa-retreats-disco-cruises-alcohol-delivery" className="text-teal-600 hover:underline"> spa retreat guide</Link> for 
                    the best group-friendly spas in Austin.
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {spaOptions.map((spa, i) => (
                      <div key={i} className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl text-center">
                        <Bath className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                        <h4 className="font-bold text-gray-900 dark:text-white">{spa.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{spa.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </m.div>

            {/* Brunch & Dining */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12"
            >
              <Card className="border-2 border-orange-200 dark:border-orange-800">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Utensils className="h-8 w-8" />
                    </div>
                    <div>
                      <span className="text-orange-200 text-sm font-semibold">AUSTIN EATS</span>
                      <CardTitle className="text-2xl font-black">Brunch & Dining Spots</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    An <strong>Austin bachelorette party</strong> isn't complete without amazing food. From boozy brunch to Texas BBQ, 
                    Austin's culinary scene will fuel your celebrations.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {brunchSpots.map((spot, i) => (
                      <div key={i} className="flex items-start gap-4 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
                        <div className="bg-orange-200 dark:bg-orange-800 p-2 rounded-full">
                          <Utensils className="h-5 w-5 text-orange-700 dark:text-orange-300" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{spot.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{spot.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 italic">
                    Pro tip: Make reservations early—Austin brunch spots fill up fast on weekends! 
                    And order mimosa supplies from <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Party On Delivery</a> for 
                    pre-brunch bubbles at your Airbnb.
                  </p>
                </CardContent>
              </Card>
            </m.div>

            {/* Activities Grid */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Waves className="h-6 w-6 text-blue-600" />
                      <CardTitle>Outdoor Adventures</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Lady Bird Lake kayaking, Barton Springs swimming, Zilker Park yoga—Austin has endless outdoor fun 
                      to enjoy before or after your <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline">Lake Travis boat party</Link>.
                    </p>
                    <Link href="/adventure-austin-bachelorette">
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                        Explore Adventure Options <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 border-rose-200 dark:border-rose-800">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Camera className="h-6 w-6 text-rose-600" />
                      <CardTitle>Photo Ops & Murals</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Austin's murals are legendary! The "I Love You So Much" wall, "Greetings from Austin," and dozens more 
                      provide perfect Instagram backdrops for your bride tribe.
                    </p>
                    <Link href="/top-10-austin-bachelorette-ideas">
                      <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50">
                        Top 10 Bachelorette Ideas <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Theme Ideas */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <Badge className="mb-4 bg-pink-100 text-pink-700">THEME IDEAS</Badge>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                Austin Bachelorette Party Themes & Decor Ideas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Choose a fun theme that captures Austin's unique vibe!
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themeIdeas.map((theme, i) => (
                <m.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-pink-100">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full">
                          <theme.icon className="h-5 w-5 text-pink-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{theme.name}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{theme.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Need party supplies delivered? <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline font-semibold">Party On Delivery</a> can 
                help stock your Airbnb with everything you need!
              </p>
              <Link href="/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend">
                <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50">
                  Must-Haves for Your Bachelorette Weekend <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Itinerary */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">SAMPLE ITINERARY</Badge>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                3-Day Austin Bachelorette Party Itinerary
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Maximize the fun. Minimize the planning stress. Check out our 
                <Link href="/3-day-austin-bachelorette-itinerary" className="text-purple-600 hover:underline"> complete 3-day itinerary guide</Link>.
              </p>
            </m.div>

            <div className="space-y-8">
              {/* Day 1 */}
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="border-l-4 border-l-pink-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm">DAY 1</span>
                      Arrival + Night Out
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Arrive in Austin and check into your Airbnb',
                        'Drinks already stocked via Party On Delivery',
                        'Brunch at Banger\'s Sausage House',
                        'Explore South Congress Avenue shopping',
                        'Pre-game at the house',
                        'Dinner at Uchi (world-class sushi)',
                        'Bar-hopping on Rainey Street'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <ChevronRight className="h-4 w-4 text-pink-500" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </m.div>

              {/* Day 2 */}
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">DAY 2</span>
                      The ATX Disco Cruise + Nightlife
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
                        <Star className="h-5 w-5 fill-purple-500" /> THE MAIN EVENT: ATX Disco Cruise
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2 text-purple-700 dark:text-purple-400 text-sm">
                        {['DJ spinning your favorites', 'Professional photographer', 'Private cooler ready', 'Unicorn float awaits', 'Lake Travis beauty', 'Multi-group party vibes', 'Swimming & dancing'].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 font-semibold text-purple-800 dark:text-purple-300">
                        Most groups agree: This is the best bachelorette activity Austin has to offer!
                      </p>
                    </div>
                    <div className="space-y-3">
                      {[
                        'Morning: Light breakfast, hydrate',
                        'Midday: ATX Disco Cruise (your highlight!)',
                        'Afternoon: Rest and refresh at the Airbnb',
                        'Evening: Dinner at a nice restaurant',
                        'Night: 6th Street for dancing'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <ChevronRight className="h-4 w-4 text-purple-500" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </m.div>

              {/* Day 3 */}
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="border-l-4 border-l-teal-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm">DAY 3</span>
                      Relax & Reflect
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Leisurely brunch at South Congress Cafe',
                        'Optional spa session for recovery',
                        '"I Love You So Much" mural photo op',
                        'Last-minute shopping on South Congress',
                        'Reflect on the amazing weekend',
                        'Head to the airport with incredible memories'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <ChevronRight className="h-4 w-4 text-teal-500" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/ultimate-austin-bachelorette-weekend">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Get the Complete Weekend Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* When to Visit */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">BEST TIMES TO VISIT</Badge>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                When to Visit: Best Times for an Austin Bachelorette Bash
              </h2>
            </m.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  months: 'March - May', 
                  title: 'Spring Perfection', 
                  description: 'Ideal weather, SXSW vibes, outdoor adventures', 
                  icon: Flower2,
                  link: '/blogs/austin-bachelorette-party-april'
                },
                { 
                  months: 'June - August', 
                  title: 'Summer Lake Days', 
                  description: 'Hot weather perfect for Lake Travis boat parties', 
                  icon: Sun,
                  link: '/blogs/austin-bachelorette-party-june'
                },
                { 
                  months: 'September - November', 
                  title: 'Fall Festivals', 
                  description: 'ACL Festival, balmy weather, beautiful scenery', 
                  icon: Umbrella,
                  link: '/blogs/austin-bachelorette-party-october'
                }
              ].map((season, i) => (
                <m.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link href={season.link}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-blue-100 hover:border-blue-300">
                      <CardContent className="p-6 text-center">
                        <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <season.icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <Badge className="mb-2 bg-blue-100 text-blue-700">{season.months}</Badge>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{season.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{season.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Where to Stay */}
      <section className="py-16 bg-gradient-to-br from-slate-100 to-pink-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <Badge className="mb-4 bg-slate-200 text-slate-700">ACCOMMODATIONS</Badge>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                Where to Stay for a Bachelorette Party in Austin
              </h2>
            </m.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Downtown Hotels', description: 'Easy access to nightlife. Walk to Sixth Street and Rainey. Hotels like The Driskill or Hotel Van Zandt offer luxury.', icon: MapPin },
                { title: 'South Congress Rentals', description: 'Quirky, local experience. Charming houses near eclectic boutiques, trendy cafes, and Instagram-worthy spots.', icon: Home },
                { title: 'Lake Travis Airbnbs', description: 'Perfect if you\'re prioritizing the boat day with Premier Party Cruises. Wake up lakeside!', icon: Waves }
              ].map((option, i) => (
                <m.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="bg-pink-100 dark:bg-pink-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <option.icon className="h-8 w-8 text-pink-600" />
                      </div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{option.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{option.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Wherever you stay, <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline font-semibold">Party On Delivery</a> can 
                stock your fridge before you arrive!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-16 bg-gradient-to-br from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <Trophy className="h-12 w-12 mx-auto text-pink-200 mb-4" />
              <h2 className="text-3xl font-black mb-4">Final Tips for an Epic Austin Bachelorette</h2>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { num: '1', tip: 'Book your Premier Party Cruises spot early—bachelorette weekends sell out fast!' },
                { num: '2', tip: 'Pre-stock your weekend with Party On Delivery—save hours and skip the errands' },
                { num: '3', tip: 'Hydrate and pace yourselves—Austin heat + bachelorette energy = exhaustion' },
                { num: '4', tip: 'Combine spa time with lake life—balance relaxation with the party' },
                { num: '5', tip: 'Keep the bride the priority—build the weekend around what SHE wants' },
                { num: '6', tip: 'Book restaurant reservations ahead—Austin brunch spots fill up fast' }
              ].map((item, i) => (
                <m.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-sm p-5 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <span className="bg-white text-pink-600 font-black text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.num}
                    </span>
                    <p className="text-lg">{item.tip}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <Badge className="mb-4 bg-pink-100 text-pink-700">FAQ</Badge>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What's the best bachelorette party activity in Austin?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  The <Link href="/atx-disco-cruise" className="text-pink-600 hover:underline">ATX Disco Cruise</Link> hosted 
                  by <Link href="/" className="text-pink-600 hover:underline">Premier Party Cruises</Link>. Nothing compares! 
                  It's a four-hour, all-inclusive lake party with DJ, photographer, floats, and incredible multi-group energy.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Do we need a private boat?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  If your group is under 12, the Disco Cruise is usually cheaper AND more fun due to the multi-group energy. 
                  For larger groups, Premier also offers <Link href="/private-cruises" className="text-pink-600 hover:underline">private charters</Link>. 
                  Check our <Link href="/pricing-breakdown" className="text-pink-600 hover:underline">pricing breakdown</Link> for details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  How do we get drinks without running errands?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  Our boats are BYOB. Use <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Party On Delivery</a> for 
                  alcohol delivery to your Airbnb or directly to your boat. Check our <Link href="/faq" className="text-pink-600 hover:underline">FAQ page</Link> for 
                  more details on BYOB policies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What should I budget for an Austin bachelorette party?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  Check out our <Link href="/budget-austin-bachelorette" className="text-pink-600 hover:underline">budget-friendly guide</Link> or 
                  our <Link href="/bachelorette-party-austin" className="text-pink-600 hover:underline">complete Austin bachelorette guide</Link> for all options. 
                  The ATX Disco Cruise is incredibly affordable per person!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Can we combine with a bachelor party?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  Absolutely! Many couples book <Link href="/combined-bachelor-bachelorette-austin" className="text-pink-600 hover:underline">joint bachelor/bachelorette parties</Link> on 
                  the same boat or coordinate to meet at the party cove. Check out our <Link href="/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises" className="text-pink-600 hover:underline">joint party guide</Link>.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">EXPLORE MORE</Badge>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                More Bachelorette Party Resources
              </h2>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Top 10 Bachelorette Ideas', link: '/top-10-austin-bachelorette-ideas' },
                { title: '3-Day Itinerary Guide', link: '/3-day-austin-bachelorette-itinerary' },
                { title: 'Budget-Friendly Options', link: '/budget-austin-bachelorette' },
                { title: 'ATX Disco Cruise Guide', link: '/atx-disco-cruise' },
                { title: 'Nightlife & Bar Guide', link: '/austin-bachelorette-nightlife' },
                { title: 'Spa & Wellness Guide', link: '/blogs/austin-bachelorette-bliss-spa-retreats-disco-cruises-alcohol-delivery' },
                { title: 'Top Spots & Tips', link: '/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience' },
                { title: 'Must-Have Weekend Essentials', link: '/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend' },
                { title: 'View Our Photo Gallery', link: '/gallery' }
              ].map((resource, i) => (
                <Link key={i} href={resource.link}>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer border border-purple-100 hover:border-purple-300">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">{resource.title}</span>
                      <ArrowRight className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-pink-600 via-purple-600 to-pink-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <LazyImage 
                src={sectionImage4} 
                alt="Bachelorette party austin texas celebration on Lake Travis bachelorette party boat" 
                className="rounded-2xl shadow-2xl w-full h-64 object-cover mb-8 mx-auto"
                aspectRatio="21/9"
              />
              
              <h2 className="text-4xl font-black mb-6">
                Ready to Plan the Best Austin Bachelorette Party?
              </h2>
              <p className="text-xl text-pink-200 mb-8">
                Make it easy. Make it unforgettable. Book your Lake Travis bachelorette party boat with <Link href="/" className="text-white hover:underline font-semibold">Premier Party Cruises</Link> 
                and let <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-semibold">Party On Delivery</a> handle 
                the drinks—the rest of your Austin bachelorette party practically plans itself!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/atx-disco-cruise">
                  <Button 
                    size="lg" 
                    className="bg-white hover:bg-pink-50 text-pink-600 font-bold text-lg px-10 py-7 shadow-2xl transition-all hover:scale-105"
                    data-testid="button-final-cta-disco"
                  >
                    <Ship className="mr-2 h-6 w-6" />
                    Book ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-10 py-7"
                    data-testid="button-final-cta-quote"
                  >
                    <Calendar className="mr-2 h-6 w-6" />
                    Get Your Free Quote
                  </Button>
                </Link>
              </div>
              
              <p className="mt-8 text-pink-300">
                Questions? Call us at <a href="tel:5124885892" className="text-white hover:underline font-semibold">(512) 488-5892</a>
              </p>
            </m.div>
          </div>
        </div>
      </section>

      <RelatedBlogArticles category="bachelorette" currentSlug="/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience" />
    </div>
    </BlogV2Layout>
    </LazyMotionProvider>
  );
}
