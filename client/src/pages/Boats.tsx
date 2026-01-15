import { Link } from 'wouter';
import { motion } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { YouTubeVideoBackground } from '@/components/YouTubeVideoBackground';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@shared/formatters';
import { PRICING_DEFAULTS } from '@shared/constants';
import { 
  Ship, Users, Check, ArrowRight, Phone, Anchor,
  Music, Waves, Sun, Camera, Shield, Star
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const boats = [
  {
    id: 'day-tripper',
    name: 'Day Tripper',
    tagline: 'Perfect for Intimate Celebrations',
    capacity: '6-14 guests',
    seating: '14 seats comfortably',
    pricePerPerson: PRICING_DEFAULTS.PRIVATE_PER_PERSON_25,
    description: 'Our cozy Day Tripper is ideal for smaller groups who want a more intimate party boat experience. Perfect for close friends, family gatherings, or small corporate outings.',
    image: '/attached_assets/day-tripper-14-person-boat.jpg',
    features: [
      'Premium Bluetooth sound system',
      'Covered and open-air seating',
      'Large cooler space',
      'Clean restroom',
      'Swimming platform',
      'BYOB friendly'
    ],
    bestFor: ['Small birthday parties', 'Family outings', 'Intimate celebrations', 'Corporate team meetings']
  },
  {
    id: 'meeseeks',
    name: 'Meeseeks / The Irony',
    tagline: 'The Sweet Spot for Groups',
    capacity: '15-30 guests',
    seating: '20 seats comfortably (max 30)',
    pricePerPerson: PRICING_DEFAULTS.PRIVATE_PER_PERSON_25,
    description: 'We have two identical Meeseeks boats, giving you flexibility for your medium-sized party. These versatile vessels are our most popular for bachelor/bachelorette parties and birthday celebrations.',
    image: '/attached_assets/meeseeks-25-person-boat.jpg',
    features: [
      'Powerful sound system',
      'Spacious deck layout',
      'Multiple coolers with ice',
      'Private restroom',
      'Lily pad float option',
      'Great for swimming stops'
    ],
    bestFor: ['Bachelor parties', 'Bachelorette parties', 'Birthday celebrations', 'Friend group outings']
  },
  {
    id: 'clever-girl',
    name: 'Clever Girl',
    tagline: 'Our Flagship Party Vessel',
    capacity: '31-75 guests',
    seating: '30 seats comfortably (max 75)',
    pricePerPerson: PRICING_DEFAULTS.PRIVATE_PER_PERSON_50,
    description: 'Clever Girl is our crown jewel - a massive party boat featuring 14 disco balls, professional-grade sound, and room for up to 75 guests. Perfect for large celebrations that demand the ultimate experience.',
    image: '/attached_assets/clever-girl-50-person-boat.jpg',
    features: [
      '14 disco balls for atmosphere',
      'Professional DJ-quality sound',
      'Multiple deck levels',
      'Two restrooms',
      'Giant float collection',
      'Ultimate party atmosphere'
    ],
    bestFor: ['Large weddings', 'Corporate events', 'Big birthday milestones', 'Combined parties']
  }
];

const allBoatFeatures = [
  { icon: Shield, title: 'Licensed Captain', description: 'Experienced, safety-certified captains on every cruise' },
  { icon: Music, title: 'Premium Sound', description: 'Bluetooth sound systems for your playlist' },
  { icon: Waves, title: 'Swimming Stops', description: 'Multiple stops for swimming in Lake Travis' },
  { icon: Sun, title: 'Sun & Shade', description: 'Both covered and open seating areas' },
  { icon: Camera, title: 'Photo Worthy', description: 'Instagram-perfect backdrops everywhere' },
  { icon: Star, title: '15+ Years', description: 'Over 15 years of perfect safety record' }
];

export default function Boats() {
  return (
    <>
      <SEOHead
        title="Our Party Boats | Lake Travis Fleet | Premier Party Cruises Austin"
        description="Meet our Lake Travis party boat fleet: Day Tripper (6-14 guests), Meeseeks (15-30 guests), and Clever Girl (31-75 guests). See features, photos, and pricing for each boat."
        canonical="https://premierpartycruises.com/boats"
      />

      <PublicNavigation />

      <main className="min-h-screen bg-white">
        <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
          <YouTubeVideoBackground videoId="4-Yx24Y6oro" posterImage="/attached_assets/clever-girl-50-person-boat.jpg" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-white text-center py-20">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <Badge className="bg-brand-yellow text-black font-bold mb-6">
                <Ship className="h-4 w-4 mr-1" />
                Our Fleet
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold mb-6">
                Lake Travis Party Boats
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Three incredible boats for groups of 6 to 75 guests. Find the perfect vessel for your celebration.
              </p>
              <Button
                size="lg"
                className="bg-brand-yellow text-black hover:bg-yellow-400"
                onClick={() => document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Your Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-4 bg-gray-50">
          <div className="container mx-auto px-4">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Our Boats' }
            ]} />
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="day-tripper" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {boats.map(boat => (
                  <TabsTrigger key={boat.id} value={boat.id} className="text-sm sm:text-base py-3">
                    {boat.name.split(' / ')[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {boats.map(boat => (
                <TabsContent key={boat.id} value={boat.id}>
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <img 
                        src={boat.image} 
                        alt={boat.name}
                        className="w-full rounded-xl shadow-lg"
                      />
                    </div>
                    <div>
                      <Badge className="bg-brand-blue text-white mb-4">{boat.tagline}</Badge>
                      <h2 className="text-3xl font-playfair font-bold mb-2">{boat.name}</h2>
                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Users className="h-5 w-5" />
                          {boat.capacity}
                        </span>
                        <span className="text-2xl font-bold text-brand-blue">
                          {formatCurrency(boat.pricePerPerson)}/person
                        </span>
                      </div>
                      <p className="text-gray-600 mb-6">{boat.description}</p>
                      
                      <h3 className="font-bold text-lg mb-3">Features:</h3>
                      <ul className="grid grid-cols-2 gap-2 mb-6">
                        {boat.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <h3 className="font-bold text-lg mb-3">Best For:</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {boat.bestFor.map((item, i) => (
                          <Badge key={i} variant="outline">{item}</Badge>
                        ))}
                      </div>

                      <Button
                        size="lg"
                        className="bg-brand-blue hover:bg-blue-700"
                        onClick={() => document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        Book {boat.name.split(' / ')[0]}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold text-center mb-12">
              Standard on All Boats
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {allBoatFeatures.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <feature.icon className="h-12 w-12 mx-auto mb-4 text-brand-blue" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <QuoteBuilderSection />

        <section className="py-16 bg-gradient-to-r from-brand-blue to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-playfair font-bold mb-6">Not Sure Which Boat?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our team can help you choose the perfect boat for your group size and party style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                <a href="tel:512-709-1560">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 512-709-1560
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
