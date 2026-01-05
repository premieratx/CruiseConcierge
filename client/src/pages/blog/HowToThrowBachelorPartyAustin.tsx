import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Phone, Clock, CheckCircle2, 
  Music, Sun, Waves, MapPin, Calendar, Star,
  ArrowRight, Utensils, Beer, Mountain, Sparkles,
  DollarSign, Camera, Droplets, PartyPopper, Trophy,
  Home, Package, Truck, Heart, ChevronRight, Bed, Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyImage } from '@/components/LazyImage';
import Lightbox from '@/components/Lightbox';
import { EmbeddedQuoteBuilder } from '@/components/EmbeddedQuoteBuilder';
import { BACHELOR_GALLERY, DISCO_FUN_PHOTOS, BOAT_SCENIC_PHOTOS } from '@/lib/media';

import heroImage from '@assets/bachelor-party-group-guys-hero-compressed.webp';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const boatFeatures = [
  { icon: Users, text: 'Accommodates 14-75 guests' },
  { icon: Ship, text: 'Experienced captain and crew' },
  { icon: Music, text: 'Premium sound system' },
  { icon: Waves, text: 'Floating water mat included' },
  { icon: Sun, text: 'Crystal-clear Lake Travis waters' },
  { icon: PartyPopper, text: 'Everything you need for the perfect party' }
];

const topActivities = [
  { 
    name: 'Lake Travis Party Boat Adventure', 
    description: 'The centerpiece of any Austin bachelor party - cruise crystal-clear waters with cold drinks, great music, and Texas sunshine.',
    highlight: true
  },
  { 
    name: 'TopGolf Austin', 
    description: 'Climate-controlled bays, full-service restaurant, and rooftop terrace. Book a VIP suite for your crew.',
    highlight: false
  },
  { 
    name: 'Austin Brewery Tours', 
    description: 'World-class craft beer scene at Jester King, Live Oak, or Austin Beerworks with party bus packages.',
    highlight: false
  },
  { 
    name: '6th Street Nightlife', 
    description: 'Bachelor party central - Kung Fu Saloon for games, Rain for nightclub vibes, Blind Pig for live music.',
    highlight: false
  }
];

const bbqSpots = [
  { name: 'Franklin BBQ', description: 'Legendary brisket (arrive at 9am to beat the line)' },
  { name: 'Salt Lick', description: 'Family-style BBQ with unlimited sides in Driftwood' },
  { name: 'Fogo de Chão', description: 'Brazilian Steakhouse with unlimited meat' },
  { name: "Perry's Steakhouse", description: 'Famous for their pork chop' }
];

const budgetItems = [
  { category: 'Accommodations', cost: '$150-250 per night' },
  { category: 'Lake Travis Party Boat', cost: '$100-200 per person' },
  { category: 'Dining and Drinks', cost: '$200-300' },
  { category: 'Activities (TopGolf, breweries)', cost: '$100-150' },
  { category: 'Nightlife', cost: '$100-200' },
  { category: 'Transportation', cost: '$50-100' }
];

const fridaySchedule = [
  { time: '3pm', activity: 'Check-in and settle into accommodations' },
  { time: '5pm', activity: 'Happy hour at Easy Tiger or Better Half' },
  { time: '7pm', activity: "Dinner at Fogo de Chão or Perry's Steakhouse" },
  { time: '9pm', activity: '6th Street bar crawl starting at Kung Fu Saloon' },
  { time: 'Midnight', activity: "Late-night food at P. Terry's" }
];

const saturdaySchedule = [
  { time: '10am', activity: 'Breakfast tacos and recovery at Juan in a Million' },
  { time: '12pm', activity: 'Lake Travis Party Boat Cruise (3-4 hours)', highlight: true },
  { time: '4pm', activity: 'Back to hotel, rest and refresh' },
  { time: '7pm', activity: "BBQ feast at Franklin, Terry Black's, or Salt Lick" },
  { time: '9pm', activity: 'Rainey Street bar hop' },
  { time: '11pm', activity: 'Club scene at Rain or Barbarella' }
];

const sundaySchedule = [
  { time: '11am', activity: 'Brunch at Kerbey Lane or Snooze' },
  { time: '1pm', activity: 'TopGolf or brewery tour (for those still standing)' },
  { time: '4pm', activity: 'Farewell beers at Zilker Brewing or Live Oak' },
  { time: '6pm', activity: 'Departure' }
];

const galleryPhotos = [
  { id: 'bach-1', src: DISCO_FUN_PHOTOS.jumping, alt: 'Austin bachelor party guests jumping into Lake Travis from party boat' },
  { id: 'bach-2', src: BOAT_SCENIC_PHOTOS.meeseeks, alt: 'Lake Travis bachelor party boat Meeseeks 25-person party boat' },
  { id: 'bach-3', src: DISCO_FUN_PHOTOS.blackCapsGroup, alt: 'Austin bachelor party crew with matching caps on Lake Travis' },
  { id: 'bach-4', src: BOAT_SCENIC_PHOTOS.cleverGirl, alt: 'Bachelor party Austin Texas on Clever Girl 50-person party boat' },
  { id: 'bach-5', src: DISCO_FUN_PHOTOS.champagneSpray, alt: 'Austin bachelor party champagne spray celebration on Lake Travis boat' },
  { id: 'bach-6', src: BOAT_SCENIC_PHOTOS.dayTripper, alt: 'Lake Travis bachelor party boat Day Tripper 14-person intimate cruise' },
];

export default function HowToThrowBachelorPartyAustin() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handlePhotoClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div data-page-ready="how-to-throw-bachelor-party-austin" className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>How to Throw a Great Bachelor Party in Austin | Premier Party Cruises</title>
        <meta 
          name="description" 
          content="Plan the ultimate Austin bachelor party with our complete guide. Lake Travis boat parties, 6th Street nightlife, brewery tours, BBQ spots, and weekend itineraries." 
        />
        <meta 
          name="keywords" 
          content="bachelor party Austin, Austin bachelor party guide, Lake Travis bachelor party, Austin bachelor party ideas, 6th Street bachelor party, bachelor party planning Austin TX" 
        />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/how-to-throw-great-bachelor-party-austin" />
        
        <meta property="og:title" content="How to Throw a Great Bachelor Party in Austin" />
        <meta property="og:description" content="Plan the ultimate Austin bachelor party! Lake Travis boats, 6th Street nightlife, BBQ, and complete weekend itineraries." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/how-to-throw-great-bachelor-party-austin" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Throw a Great Bachelor Party in Austin",
            "description": "Plan the ultimate Austin bachelor party with our complete guide. Lake Travis boat parties, 6th Street nightlife, brewery tours, BBQ spots, and weekend itineraries.",
            "image": "https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp",
            "author": {
              "@type": "Organization",
              "name": "Premier Party Cruises",
              "url": "https://premierpartycruises.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Premier Party Cruises",
              "url": "https://premierpartycruises.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://premierpartycruises.com/media/schema/ppc-logo.png"
              }
            },
            "datePublished": "2025-01-01",
            "dateModified": "2025-12-16",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://premierpartycruises.com/blogs/how-to-throw-great-bachelor-party-austin"
            }
          })}
        </script>
      </Helmet>

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage 
            src={heroImage} 
            alt="Austin bachelor party group celebrating on Lake Travis bachelor party boat" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-slate-900/70 to-black/80"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-blue-600/80 text-white border-0">
              Complete Planning Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              How to Throw a Great Bachelor Party in Austin
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              From legendary 6th Street nightlife to Lake Travis bachelor party boat adventures - your complete Austin bachelor party guide to an unforgettable guys' weekend
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/bachelor-party-austin">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg" data-testid="hero-bachelor-parties">
                  <Ship className="mr-2 h-5 w-5" />
                  View Bachelor Parties
                </Button>
              </Link>
              <Link href="/atx-disco-cruise">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg" data-testid="hero-disco-cruise">
                  ATX Disco Cruise
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Austin Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Why Austin is the Ultimate Bachelor Party Destination
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                When it comes to planning an epic bachelor party, Austin, Texas stands in a league of its own. From the legendary nightlife on 6th Street to the pristine waters of Lake Travis, Austin offers the perfect blend of adventure, entertainment, and southern hospitality that makes for an unforgettable guys' weekend. At <Link href="/" className="text-blue-600 hover:underline font-semibold">Premier Party Cruises</Link>, we've helped thousands of bachelor parties create memories that last a lifetime.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Photo */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <LazyImage 
              src={DISCO_FUN_PHOTOS.jumping}
              alt="Austin bachelor party guests jumping into Lake Travis from bachelor party boat"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
            <p className="text-center text-gray-500 dark:text-gray-400 mt-3 text-sm">
              Austin bachelor party groups love jumping into the crystal-clear waters of Lake Travis from our party boats
            </p>
          </div>
        </div>
      </section>

      {/* Planning Guide Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              The Complete Bachelor Party Planning Guide
            </h2>
            <Card className="bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-800">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Book 2-3 Months in Advance</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Planning a successful bachelor party in Austin requires booking key activities 2-3 months in advance, especially during peak season (March-October). Start with your centerpiece activity—a <Link href="/private-cruises" className="text-blue-600 hover:underline font-semibold">Lake Travis party boat cruise</Link>—then build your itinerary around it. Book accommodations near downtown to minimize transportation hassles and maximize party time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Top Activities Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Top Activities for Your Austin Bachelor Party
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {topActivities.map((activity, index) => (
                <motion.div
                  key={activity.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full ${activity.highlight ? 'border-blue-500 border-2 bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-800'}`}>
                    <CardContent className="p-6">
                      {activity.highlight && (
                        <Badge className="mb-3 bg-blue-600 text-white">
                          <Star className="h-3 w-3 mr-1" /> Top Pick
                        </Badge>
                      )}
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{activity.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{activity.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Looking for the ultimate all-inclusive experience? Check out our <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> - the only multi-group bachelor party cruise in the U.S.!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Party Boat Features */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Lake Travis Bachelor Party Boat Adventure
              </h2>
              <p className="text-xl text-blue-100">
                No Austin bachelor party is complete without a Lake Travis bachelor party boat cruise with Premier Party Cruises
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {boatFeatures.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <feature.icon className="h-8 w-8 text-blue-200 flex-shrink-0" />
                  <span className="text-white">{feature.text}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/private-cruises">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg" data-testid="boat-cta">
                  <Ship className="mr-2 h-5 w-5" />
                  View Our Party Boats
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Austin Bachelor Party Photo Gallery
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              See what an epic Austin bachelor party on a Lake Travis bachelor party boat looks like
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {galleryPhotos.map((photo, index) => (
                <motion.div
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
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/gallery" data-testid="link-gallery">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" data-testid="button-view-gallery">
                  View Full Gallery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
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
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Austin's Best Food for Bachelor Parties
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Fuel your bachelor party with Austin's incredible food scene
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {bbqSpots.map((spot, index) => (
                <motion.div
                  key={spot.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gray-50 dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Utensils className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{spot.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{spot.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl max-w-4xl mx-auto">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Pro Tip:</strong> Start with breakfast tacos from Torchy's or Veracruz All Natural. Late-night munchies? P. Terry's or Whataburger never disappoint. Need drinks delivered to your boat? Check out <Link href="/" className="text-blue-600 hover:underline font-semibold">Party on Delivery</Link> for hassle-free beverage service.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accommodations Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              <Bed className="inline-block mr-3 h-8 w-8" />
              Where to Stay: Bachelor Party Accommodations
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Downtown Hotels</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    W Austin or Fairmont Austin offer luxury and proximity to nightlife.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-900">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Rental Properties</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    For larger groups, consider a house in East Austin or near Zilker Park with pools and game rooms.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Budget Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              <DollarSign className="inline-block mr-2 h-8 w-8" />
              Budget Breakdown: Cost Per Person
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              Expect to budget <strong>$600-1,000 per person</strong> for a 2-3 day Austin bachelor party
            </p>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {budgetItems.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-gray-50 dark:bg-gray-800 h-full">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.category}</p>
                      <p className="font-bold text-blue-600 dark:text-blue-400">{item.cost}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-300">
                Want a detailed quote for your group? Use our <Link href="/quote-builder" className="text-blue-600 hover:underline font-semibold">quote builder</Link> to get instant pricing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weekend Itinerary Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              The Perfect Austin Bachelor Party Weekend
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="friday" className="border rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="accordion-friday">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-600 text-white">Day 1</Badge>
                      <span className="font-semibold text-lg">Friday: Arrival & Appetizer</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3">
                      {fridaySchedule.map((item) => (
                        <div key={item.time} className="flex gap-4 items-start">
                          <span className="font-mono text-sm text-blue-600 dark:text-blue-400 w-20 flex-shrink-0">{item.time}</span>
                          <span className="text-gray-700 dark:text-gray-300">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="saturday" className="border rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="accordion-saturday">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-orange-600 text-white">Day 2</Badge>
                      <span className="font-semibold text-lg">Saturday: Main Event</span>
                      <Badge variant="outline" className="ml-2 border-blue-500 text-blue-600">
                        <Ship className="h-3 w-3 mr-1" /> Boat Day
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3">
                      {saturdaySchedule.map((item) => (
                        <div 
                          key={item.time} 
                          className={`flex gap-4 items-start ${item.highlight ? 'bg-blue-50 dark:bg-blue-900/30 -mx-2 px-2 py-2 rounded-lg' : ''}`}
                        >
                          <span className="font-mono text-sm text-blue-600 dark:text-blue-400 w-20 flex-shrink-0">{item.time}</span>
                          <span className={`${item.highlight ? 'font-semibold text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                            {item.activity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sunday" className="border rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="accordion-sunday">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-600 text-white">Day 3</Badge>
                      <span className="font-semibold text-lg">Sunday: Recovery & Farewell</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3">
                      {sundaySchedule.map((item) => (
                        <div key={item.time} className="flex gap-4 items-start">
                          <span className="font-mono text-sm text-blue-600 dark:text-blue-400 w-20 flex-shrink-0">{item.time}</span>
                          <span className="text-gray-700 dark:text-gray-300">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Embedded Quote Builder */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Get Your Custom Bachelor Party Quote
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Tell us about your bachelor party and we'll create a personalized quote in minutes
            </p>
            
            <div className="max-w-4xl mx-auto">
              <EmbeddedQuoteBuilder pageContext="bachelor" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Explore More Bachelor Party Resources
            </h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/bachelor-party-austin" data-testid="link-bachelor-party">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-bachelor-party">
                  <CardContent className="p-4 flex items-center gap-3">
                    <PartyPopper className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-900 dark:text-white">Bachelor Party Austin</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/atx-disco-cruise" data-testid="link-atx-disco">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-atx-disco">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Music className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-900 dark:text-white">ATX Disco Cruise</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/private-cruises" data-testid="link-private-cruises">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-private-cruises">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Ship className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-900 dark:text-white">Private Cruises</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/bachelorette-party-austin" data-testid="link-bachelorette-party">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-bachelorette-party">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Heart className="h-5 w-5 text-pink-600" />
                    <span className="text-gray-900 dark:text-white">Bachelorette Parties</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/gallery" data-testid="link-photo-gallery">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-photo-gallery">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Camera className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-900 dark:text-white">Photo Gallery</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/contact" data-testid="link-contact">
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="card-contact">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-900 dark:text-white">Contact Us</span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Book Your Austin Bachelor Party Boat Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Ready to plan the ultimate Austin bachelor party? Start with a Lake Travis bachelor party boat cruise that will be the highlight of your weekend.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-online">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg" data-testid="cta-book-now">
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
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
