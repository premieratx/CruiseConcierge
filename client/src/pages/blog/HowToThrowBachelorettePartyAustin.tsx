import { useState } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Phone, Clock, CheckCircle2, 
  Music, Sun, Waves, MapPin, Calendar, Star,
  ArrowRight, Utensils, Wine, Sparkles, Camera,
  DollarSign, Heart, PartyPopper, Gem,
  Home, Package, Bed, ShoppingBag, Flower2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import RelatedBlogArticles from '@/components/RelatedBlogArticles';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyImage } from '@/components/LazyImage';
import Lightbox from '@/components/Lightbox';
import { EmbeddedQuoteBuilder } from '@/components/EmbeddedQuoteBuilder';
import { BACHELORETTE_GALLERY, DISCO_FUN_PHOTOS, BOAT_SCENIC_PHOTOS } from '@/lib/media';

import heroImage from '@assets/dancing-party-scene.webp';


const boatFeatures = [
  { icon: Users, text: 'Groups of 14-75 guests' },
  { icon: Ship, text: 'Captain and crew included' },
  { icon: Music, text: 'Premium sound system' },
  { icon: Waves, text: 'Floating water mat' },
  { icon: Camera, text: 'Instagram-worthy views' },
  { icon: PartyPopper, text: 'Perfect for celebrations' }
];

const topActivities = [
  { 
    name: 'Lake Travis Party Boat Cruise', 
    description: 'The crown jewel of any Austin bachelorette party - 3-4 hours on crystal-clear waters with your crew.',
    highlight: true
  },
  { 
    name: '6th Street Bar Crawl', 
    description: 'Over 60 bars, clubs, and live music venues. Start at Midnight Cowboy, hit Barbarella for dancing.',
    highlight: false
  },
  { 
    name: 'Rainey Street Experience', 
    description: "Converted bungalow bars with outdoor patios. Try Banger's for 100+ beers or Lustre Pearl for rooftop views.",
    highlight: false
  },
  { 
    name: 'Spa Day Relaxation', 
    description: 'Balance the party with relaxation at Milk + Honey or Lake Austin Spa Resort with champagne.',
    highlight: false
  }
];

const diningSpots = [
  { name: 'Veracruz All Natural', description: 'Amazing breakfast tacos to start your day' },
  { name: 'Franklin BBQ', description: 'Worth the wait for legendary brisket' },
  { name: 'Uchi', description: 'Upscale sushi for a special dinner' },
  { name: 'Odd Duck', description: 'Innovative American cuisine' }
];

const budgetItems = [
  { category: 'Accommodations', cost: '$100-200 per night' },
  { category: 'Lake Travis Party Boat', cost: '$75-150 per person' },
  { category: 'Dining and Drinks', cost: '$150-250' },
  { category: 'Activities & Entertainment', cost: '$100-200' },
  { category: 'Transportation', cost: '$50-100' }
];

const day1Schedule = [
  { time: '2pm', activity: 'Check-in to your rental/hotel' },
  { time: '4pm', activity: 'Pool party at your accommodation' },
  { time: '7pm', activity: 'Dinner at Uchi or Odd Duck' },
  { time: '9pm', activity: 'Rainey Street bar hop' }
];

const day2Schedule = [
  { time: '10am', activity: 'Brunch at Snooze or Kerbey Lane' },
  { time: '12pm', activity: 'Lake Travis Party Boat Cruise (3-4 hours)', highlight: true },
  { time: '5pm', activity: 'Return to hotel to refresh' },
  { time: '8pm', activity: "BBQ dinner at Terry Black's" },
  { time: '10pm', activity: '6th Street bar crawl and dancing' }
];

const day3Schedule = [
  { time: '10am', activity: 'Group spa treatments' },
  { time: '1pm', activity: 'Farewell brunch at Elizabeth Street Cafe' },
  { time: '3pm', activity: 'Shopping on South Congress' },
  { time: '5pm', activity: 'Departure' }
];

const galleryPhotos = [
  { id: 'bach-1', src: DISCO_FUN_PHOTOS.brideGroup, alt: 'Austin bachelorette party bride and friends celebrating on Lake Travis bachelorette party boat' },
  { id: 'bach-2', src: BOAT_SCENIC_PHOTOS.cleverGirl, alt: 'Lake Travis bachelorette party boat Clever Girl 50-person cruise' },
  { id: 'bach-3', src: DISCO_FUN_PHOTOS.sunHatsGroup, alt: 'Bachelorette party austin texas group with sun hats on boat' },
  { id: 'bach-4', src: DISCO_FUN_PHOTOS.heartSunglasses, alt: 'Austin bachelorette party group with heart sunglasses' },
  { id: 'bach-5', src: DISCO_FUN_PHOTOS.champagneSpray, alt: 'Lake Travis bachelorette party boat champagne spray celebration' },
  { id: 'bach-6', src: BOAT_SCENIC_PHOTOS.cleverGirlDanceFloor, alt: 'Austin bachelorette party boat disco dance floor with lights' },
];

export default function HowToThrowBachelorettePartyAustin() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handlePhotoClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <LazyMotionProvider>
    <div data-page-ready="how-to-throw-bachelorette-party-austin" className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <SEOHead 
        pageRoute="/blogs/how-to-throw-great-bachelorette-party-austin"
        defaultTitle="How to Throw a Great Bachelorette Party in Austin | Premier Party Cruises"
        defaultDescription="Plan the ultimate Austin bachelorette party with our complete guide. Lake Travis boat parties, Rainey Street nightlife, spa days, and weekend itineraries."
        defaultKeywords={['bachelorette party Austin', 'Austin bachelorette party guide', 'Lake Travis bachelorette party', 'Austin bachelorette party ideas', 'Rainey Street bachelorette', 'bachelorette party planning Austin TX']}
        image="https://premierpartycruises.com/attached_assets/bachelorette-hero-compressed.webp"
      />

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-600 via-rose-700 to-purple-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage 
            src={heroImage} 
            alt="Austin bachelorette party group dancing and celebrating on Lake Travis party boat" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-700/80 via-rose-700/70 to-purple-800/80"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <m.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-pink-500/80 text-white border-0">
              Complete Planning Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              How to Throw a Great Bachelorette Party in Austin
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto">
              From stunning Lake Travis bachelorette party boat cruises to Rainey Street vibes - your complete guide to an unforgettable Austin bachelorette party weekend
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/bachelorette-party-austin">
                <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg" data-testid="hero-bachelorette-parties">
                  <Ship className="mr-2 h-5 w-5" />
                  View Bachelorette Parties
                </Button>
              </Link>
              <Link href="/atx-disco-cruise">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg" data-testid="hero-disco-cruise">
                  ATX Disco Cruise
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </m.div>
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
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Why Austin is Perfect for Your Bachelorette Party
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Looking to plan an unforgettable Austin bachelorette party? Austin, Texas is the ultimate destination for celebrating with your best friends before the big day. With its vibrant nightlife, stunning Lake Travis bachelorette party boat options, world-class dining, and endless entertainment options, Austin has everything you need for an epic Austin bachelorette party weekend. At <Link href="/" className="text-pink-600 hover:underline font-semibold">Premier Party Cruises</Link>, we specialize in creating magical moments for bride tribes on Lake Travis.
              </p>
            </div>
          </m.div>
        </div>
      </section>

      {/* Featured Photo */}
      <section className="py-8 bg-pink-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <LazyImage 
              src={DISCO_FUN_PHOTOS.brideGroup}
              alt="Austin bachelorette party boat with bride and friends celebrating on Lake Travis"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
            <p className="text-center text-gray-500 dark:text-gray-400 mt-3 text-sm">
              Bachelorette groups love celebrating on the crystal-clear waters of Lake Travis
            </p>
          </div>
        </div>
      </section>

      {/* Planning Guide Section */}
      <section className="py-16 bg-pink-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Planning Your Austin Bachelorette Party: The Ultimate Timeline
            </h2>
            <Card className="bg-white dark:bg-gray-900 border-pink-200 dark:border-pink-800">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Book 3-4 Months in Advance</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Start planning your bachelorette party in Austin at least 3-4 months in advance, especially if you're visiting during peak season (March-October). Book your <Link href="/private-cruises" className="text-pink-600 hover:underline font-semibold">Lake Travis party boat cruise</Link> first, as these popular experiences fill up quickly. Secure accommodations next, then plan your itinerary around your boat day.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </m.div>
        </div>
      </section>

      {/* Top Activities Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Must-Do Activities for Your Austin Bachelorette Party on Lake Travis
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {topActivities.map((activity, index) => (
                <m.div
                  key={activity.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full ${activity.highlight ? 'border-pink-500 border-2 bg-pink-50 dark:bg-pink-900/20' : 'bg-white dark:bg-gray-800'}`}>
                    <CardContent className="p-6">
                      {activity.highlight && (
                        <Badge className="mb-3 bg-pink-600 text-white">
                          <Star className="h-3 w-3 mr-1" /> Top Pick
                        </Badge>
                      )}
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{activity.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{activity.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Looking for the ultimate all-inclusive experience? Check out our <Link href="/atx-disco-cruise" className="text-pink-600 hover:underline font-semibold">ATX Disco Cruise</Link> - the only multi-group bachelorette party cruise in the U.S.!
              </p>
            </div>
          </m.div>
        </div>
      </section>

      {/* Party Boat Features */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-rose-700 text-white">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Lake Travis Party Boat Cruise
              </h2>
              <p className="text-xl text-pink-100">
                The crown jewel of any Austin bachelorette party - unforgettable views and memories
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {boatFeatures.map((feature, index) => (
                <m.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <feature.icon className="h-8 w-8 text-pink-200 flex-shrink-0" />
                  <span className="text-white">{feature.text}</span>
                </m.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/private-cruises">
                <Button size="lg" className="bg-white text-pink-700 hover:bg-pink-50 px-8 py-6 text-lg" data-testid="boat-cta">
                  <Ship className="mr-2 h-5 w-5" />
                  View Our Party Boats
                </Button>
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Bachelorette Party Photo Gallery
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              See what an amazing bachelorette party on Lake Travis looks like
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {galleryPhotos.map((photo, index) => (
                <m.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cursor-pointer group relative overflow-hidden rounded-xl"
                  onClick={() => handlePhotoClick(index)}
                  data-testid={`gallery-photo-${index + 1}`}
                >
                  <LazyImage 
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
                  </div>
                </m.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/gallery" data-testid="link-gallery">
                <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50" data-testid="button-view-gallery">
                  View Full Gallery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={galleryPhotos}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % galleryPhotos.length)}
        onPrevious={() => setLightboxIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length)}
      />

      {/* Food Section */}
      <section className="py-16 bg-pink-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Where to Eat: Austin's Best for Bachelorette Parties
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Austin's food scene is legendary - perfect for celebrating with your crew
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {diningSpots.map((spot, index) => (
                <m.div
                  key={spot.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white dark:bg-gray-900">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Utensils className="h-6 w-6 text-pink-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{spot.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{spot.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-rose-100 dark:bg-rose-900/20 rounded-xl max-w-4xl mx-auto">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Pro Tip:</strong> Food trucks at the Picnic offer diverse options perfect for groups. For late-night bites, Elizabeth Street Cafe has amazing Vietnamese-French fusion. Need drinks delivered to your boat? Check out <Link href="/" className="text-pink-600 hover:underline font-semibold">Party on Delivery</Link> for hassle-free beverage service.
              </p>
            </div>
          </m.div>
        </div>
      </section>

      {/* Accommodations Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              <Bed className="inline-block mr-3 h-8 w-8" />
              Where to Stay in Austin
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-pink-50 dark:bg-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Downtown Hotels</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The W Austin offers modern luxury with rooftop pool access - perfect for getting ready together.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-pink-50 dark:bg-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Airbnb Rentals</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Budget-friendly options in East Austin or South Congress with pools and hot tubs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </m.div>
        </div>
      </section>

      {/* Budget Section */}
      <section className="py-16 bg-pink-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              <DollarSign className="inline-block mr-2 h-8 w-8" />
              Budgeting Your Austin Bachelorette Party
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              Plan for <strong>$500-800 per person</strong> for a 2-3 day Austin bachelorette party
            </p>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {budgetItems.map((item, index) => (
                <m.div
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-white dark:bg-gray-900 h-full">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.category}</p>
                      <p className="font-bold text-pink-600 dark:text-pink-400">{item.cost}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-300">
                Want a detailed quote for your group? Use our <Link href="/quote-builder" className="text-pink-600 hover:underline font-semibold">quote builder</Link> to get instant pricing.
              </p>
            </div>
          </m.div>
        </div>
      </section>

      {/* Weekend Itinerary Section */}
      <section className="py-16 bg-gradient-to-b from-white to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Sample Austin Bachelorette Itinerary
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="day1" className="border rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="accordion-day1">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-pink-600 text-white">Day 1</Badge>
                      <span className="font-semibold text-lg">Arrival & Welcome</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3">
                      {day1Schedule.map((item) => (
                        <div key={item.time} className="flex gap-4 items-start">
                          <span className="font-mono text-sm text-pink-600 dark:text-pink-400 w-20 flex-shrink-0">{item.time}</span>
                          <span className="text-gray-700 dark:text-gray-300">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="day2" className="border rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="accordion-day2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-rose-600 text-white">Day 2</Badge>
                      <span className="font-semibold text-lg">Lake Travis & Downtown</span>
                      <Badge variant="outline" className="ml-2 border-pink-500 text-pink-600">
                        <Ship className="h-3 w-3 mr-1" /> Boat Day
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3">
                      {day2Schedule.map((item) => (
                        <div 
                          key={item.time} 
                          className={`flex gap-4 items-start ${item.highlight ? 'bg-pink-50 dark:bg-pink-900/30 -mx-2 px-2 py-2 rounded-lg' : ''}`}
                        >
                          <span className="font-mono text-sm text-pink-600 dark:text-pink-400 w-20 flex-shrink-0">{item.time}</span>
                          <span className={`${item.highlight ? 'font-semibold text-pink-700 dark:text-pink-300' : 'text-gray-700 dark:text-gray-300'}`}>
                            {item.activity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="day3" className="border rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="accordion-day3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-600 text-white">Day 3</Badge>
                      <span className="font-semibold text-lg">Spa & Farewell</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3">
                      {day3Schedule.map((item) => (
                        <div key={item.time} className="flex gap-4 items-start">
                          <span className="font-mono text-sm text-pink-600 dark:text-pink-400 w-20 flex-shrink-0">{item.time}</span>
                          <span className="text-gray-700 dark:text-gray-300">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </m.div>
        </div>
      </section>

      {/* Embedded Quote Builder */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Get Your Custom Bachelorette Party Quote
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Tell us about your bachelorette party and we'll create a personalized quote in minutes
            </p>
            
            <div className="max-w-4xl mx-auto">
              <EmbeddedQuoteBuilder pageContext="bachelorette" />
            </div>
          </m.div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className="py-16 bg-pink-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Explore More Bachelorette Party Resources
            </h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/bachelorette-party-austin" data-testid="link-bachelorette-party">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-bachelorette-party">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Heart className="h-5 w-5 text-pink-600" />
                    <span className="text-gray-900 dark:text-white">Bachelorette Party Austin</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/atx-disco-cruise" data-testid="link-atx-disco">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-atx-disco">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Music className="h-5 w-5 text-pink-600" />
                    <span className="text-gray-900 dark:text-white">ATX Disco Cruise</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/private-cruises" data-testid="link-private-cruises">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-private-cruises">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Ship className="h-5 w-5 text-pink-600" />
                    <span className="text-gray-900 dark:text-white">Private Cruises</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/bachelor-party-austin" data-testid="link-bachelor-party">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-bachelor-party">
                  <CardContent className="p-4 flex items-center gap-3">
                    <PartyPopper className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-900 dark:text-white">Bachelor Parties</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/gallery" data-testid="link-photo-gallery">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-photo-gallery">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Camera className="h-5 w-5 text-pink-600" />
                    <span className="text-gray-900 dark:text-white">Photo Gallery</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/contact" data-testid="link-contact">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-contact">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Phone className="h-5 w-5 text-pink-600" />
                    <span className="text-gray-900 dark:text-white">Contact Us</span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-700 via-rose-600 to-purple-700 text-white">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Lake Travis Bachelorette Party Boat?
            </h2>
            <p className="text-xl text-pink-100 mb-8">
              Make your Austin bachelorette party unforgettable with a Lake Travis bachelorette party boat cruise. Our experienced crew will ensure your Austin bachelorette party celebration is safe, fun, and absolutely epic!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-online">
                <Button size="lg" className="bg-white text-pink-700 hover:bg-pink-50 px-8 py-6 text-lg" data-testid="cta-book-now">
                  <Ship className="mr-2 h-5 w-5" />
                  Book Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg" data-testid="cta-contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      <RelatedBlogArticles category="bachelorette" currentSlug="/blogs/how-to-throw-great-bachelorette-party-austin" />
      <Footer />
    </div>
    </LazyMotionProvider>
  );
}
