import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SEOHead from '@/components/SEOHead';
import { SectionReveal } from '@/components/SectionReveal';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { 
  Wine, Heart, Users, Star, Calendar, Shield, Award,
  Clock, Sparkles, Gift, Camera, Ship, Anchor, Sun,
  ArrowRight, CheckCircle, Truck, Package, Phone,
  MapPin, CreditCard, Waves, ExternalLink, MessageCircle
} from 'lucide-react';

const heroImage = '/attached_assets/clever-girl-4-wedding-venue.jpg';
const sunsetBoatImage = '/attached_assets/clever-girl-1-lake-travis-party-boat.jpg';
const partySceneImage = '/attached_assets/atx-disco-cruise-party.webp';
const danceFloorImage = '/attached_assets/clever-girl-5-dance-floor.jpg';
const interiorImage = '/attached_assets/clever-girl-6-interior-seating.jpg';
const flagshipImage = '/attached_assets/clever-girl-7-flagship-boat.jpg';
const weddingReceptionImage = '/attached_assets/clever-girl-8-wedding-reception.jpg';
const bacheloretteImage = '/attached_assets/clever-girl-3-bachelorette-boat.jpg';
const dancingPartyImage = '/attached_assets/dancing-party-scene.webp';

const whyLakeTravis = [
  {
    icon: Sun,
    title: 'Breathtaking Sunset Views',
    description: 'Lake Travis offers stunning golden hour backdrops for your rehearsal dinner photos'
  },
  {
    icon: Users,
    title: 'Intimate Gathering Space',
    description: 'Private boat cruise allows guests to connect without crowded restaurant distractions'
  },
  {
    icon: Waves,
    title: 'Texas Hill Country Beauty',
    description: 'Serene waters and picturesque landscapes create a refreshing alternative venue'
  },
  {
    icon: Shield,
    title: '15+ Years Experience',
    description: 'Premier Party Cruises has hosted 150,000+ satisfied customers with a perfect safety record'
  }
];

const partyOnDeliveryBenefits = [
  {
    icon: Truck,
    title: '1-Hour Delivery Windows',
    description: 'Drinks, ice, and cocktail kits delivered directly to your boat on Lake Travis'
  },
  {
    icon: Phone,
    title: 'Free Order Consultations',
    description: 'Expert guidance on quantities and selections for your guest count'
  },
  {
    icon: CreditCard,
    title: '100% Buyback on Unopened',
    description: 'Return unopened bottles for a full refund - no waste, no stress'
  },
  {
    icon: Package,
    title: 'Curated Cocktail Kits',
    description: 'Pre-mixed options and all the supplies for signature wedding drinks'
  }
];

const weddingWeekendEvents = [
  {
    name: 'Rehearsal Dinner',
    icon: Wine,
    description: 'The night before the wedding',
    image: weddingReceptionImage,
    features: [
      'Sunset cruise timing for perfect toasts',
      'Intimate setting for close family & friends',
      'Photo opportunities with stunning backdrops',
      'Private space for heartfelt speeches',
      'Elegant atmosphere for both families'
    ]
  },
  {
    name: 'Welcome Party',
    icon: Users,
    description: 'Greet out-of-town guests',
    image: partySceneImage,
    features: [
      'Casual meet & greet on the water',
      'Austin skyline views to impress visitors',
      'Cocktail cruise format',
      'Perfect ice-breaker activity',
      'Memorable first impression of Austin'
    ]
  },
  {
    name: 'After Party',
    icon: Sparkles,
    description: 'Keep celebrating post-reception',
    image: danceFloorImage,
    features: [
      'Late-night party cruise option',
      'Dance floor on the water',
      'Continuation of reception energy',
      'Casual dress code welcome',
      'Perfect send-off to honeymoon'
    ]
  }
];

const fleetOptions = [
  {
    name: 'Day Tripper',
    capacity: '14 guests max',
    ideal: 'Intimate rehearsal dinners',
    description: 'Perfect for small wedding parties and close family gatherings',
    image: '/attached_assets/day-tripper-14-person-boat.webp'
  },
  {
    name: 'Meeseeks',
    capacity: '30 guests max',
    ideal: 'Medium-sized wedding parties',
    description: 'Great for rehearsal dinners with extended family and wedding party',
    image: '/attached_assets/meeseeks-20-person-boat.webp'
  },
  {
    name: 'Clever Girl',
    capacity: '75 guests max',
    ideal: 'Large wedding celebrations',
    description: 'Our flagship vessel with 14 disco balls - perfect for grand celebrations',
    image: '/attached_assets/clever-girl-50-person-boat.webp'
  }
];

const faqs = [
  {
    question: 'Can Party On Delivery deliver to any marina on Lake Travis?',
    answer: 'Yes! Party On Delivery delivers to most marinas on Lake Travis, coordinating directly with Premier Party Cruises to ensure your order arrives right to your boat. This seamless partnership eliminates the hassle of transporting beverages yourself.'
  },
  {
    question: 'How far in advance should we book for a wedding weekend event?',
    answer: 'We recommend booking 3-6 months in advance for wedding weekend events, especially during peak season (April-October). Popular dates fill quickly, so early booking ensures you get your preferred boat and time slot.'
  },
  {
    question: 'Can we bring our own catering for the rehearsal dinner?',
    answer: 'Absolutely! Our boats are BYOB and catering-friendly. Many couples work with Austin caterers who can prepare food for boat delivery. We provide tables and cooler space for your setup.'
  },
  {
    question: 'What happens if the weather is bad on our rehearsal dinner date?',
    answer: 'We monitor weather closely and will work with you to reschedule if needed. Safety is our top priority, and we have flexible policies for weather-related changes. We\'ll communicate early if conditions look concerning.'
  },
  {
    question: 'How does the alcohol delivery coordination work?',
    answer: 'Party On Delivery coordinates timing with Premier Party Cruises. Simply place your order, specify your marina and boat time, and they deliver everything directly to the dock before you board. Ice, mixers, and all supplies included.'
  },
  {
    question: 'Are sunset cruises available for rehearsal dinners?',
    answer: 'Yes! Sunset cruises are our most popular option for rehearsal dinners. We time departures so you\'re on the water during golden hour - typically 2-3 hours before sunset. The Lake Travis sunset views are absolutely stunning for photos.'
  },
  {
    question: 'What makes Premier Party Cruises and Party On Delivery unique?',
    answer: 'They are the ONLY integrated alcohol delivery + party boat service in Austin, offering a unique market position that provides unparalleled convenience and a truly seamless experience for any event on Lake Travis.'
  }
];

const galleryImages = [
  { src: sunsetBoatImage, alt: 'Lake Travis party boat at sunset' },
  { src: dancingPartyImage, alt: 'Dancing and celebrating on the water' },
  { src: bacheloretteImage, alt: 'Bachelorette celebration on boat' },
  { src: interiorImage, alt: 'Elegant interior seating on party boat' },
  { src: flagshipImage, alt: 'Clever Girl flagship party boat' },
  { src: weddingReceptionImage, alt: 'Wedding reception celebration' }
];

export default function RehearsalDinnerBoatAlcoholDelivery() {
  const breadcrumbSegments = [
    { label: 'Home', href: '/' },
    { label: 'Wedding Parties', href: '/wedding-parties' },
    { label: 'Rehearsal Dinner Boat & Alcohol Delivery', current: true }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        pageRoute="/rehearsal-dinner-boat-alcohol-delivery"
        defaultTitle="Rehearsal Dinner Boat Alcohol Delivery | Unique Wedding Weekend Experiences"
        defaultDescription="Create unforgettable rehearsal dinner experiences with Lake Travis boat parties and seamless alcohol delivery. Premier Party Cruises + Party On Delivery partnership for memorable wedding weekends in Austin."
        image="https://premierpartycruises.com/attached_assets/clever-girl-4-wedding-venue.jpg"
      />

      <PublicNavigation />
      
      <main>
        <section 
          className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm px-4 py-2 border-0">
              <Wine className="h-4 w-4 mr-2" />
              Wedding Weekend Experience
            </Badge>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Rehearsal Dinner Boat &amp; Alcohol Delivery
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Create unforgettable wedding weekend experiences on Lake Travis with seamless beverage delivery to your private party boat
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-6"
                asChild
              >
                <a href="https://premierpartycruises.com/chat" target="_blank" rel="noopener noreferrer" data-testid="button-hero-quote">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Your Quote
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outlineLight" 
                className="text-lg px-8 py-6"
                asChild
              >
                <a href="https://premierpartycruises.com" target="_blank" rel="noopener noreferrer" data-testid="button-hero-website">
                  <Ship className="mr-2 h-5 w-5" />
                  View Our Boats
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Hundreds of Happy Guests</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Perfect Safety Record</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-4">
          <Breadcrumb customSegments={breadcrumbSegments} />
        </div>

        <SectionReveal>
          <section className="py-20 bg-gradient-to-b from-white to-purple-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-700">Section 01</Badge>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                    Why Lake Travis for Your Rehearsal Dinner?
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Planning a wedding in Austin is exciting, and every detail contributes to your special day. The rehearsal dinner sets the tone for the entire wedding weekend, offering a relaxed atmosphere for close family and friends to gather.
                  </p>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Lake Travis, a jewel of the Texas Hill Country, provides a breathtaking setting. A private boat cruise allows for an intimate gathering where guests can truly connect without the distractions of a crowded restaurant.
                  </p>
                  <div className="flex gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">15+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">125K+</div>
                      <div className="text-sm text-gray-600">Happy Guests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">100%</div>
                      <div className="text-sm text-gray-600">Safety Record</div>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-purple-600 hover:bg-purple-700"
                    asChild
                  >
                    <a href="https://premierpartycruises.com" target="_blank" rel="noopener noreferrer" data-testid="link-premier-main">
                      Explore Premier Party Cruises
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {whyLakeTravis.map((item, idx) => (
                    <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid={`card-why-${idx}`}>
                      <CardContent className="p-6">
                        <item.icon className="h-10 w-10 text-purple-600 mb-4" />
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src={sunsetBoatImage}
                    alt="Lake Travis party boat at sunset - perfect for rehearsal dinners"
                    className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                    loading="lazy"
                    width="800"
                    height="500"
                    decoding="async"
                    data-testid="image-sunset-boat"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-purple-100 text-purple-700">Section 02</Badge>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                    Seamless Alcohol Delivery with Party On Delivery
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    One of the most significant advantages of choosing a Lake Travis party boat for your rehearsal dinner is the seamless integration of alcohol delivery, thanks to Party On Delivery.
                  </p>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Forget the hassle of coordinating multiple vendors or transporting beverages yourself. Party On Delivery, founded in 2023, specializes in event-focused alcohol delivery in Austin, ensuring that your chosen drinks, ice, and even cocktail kits are delivered directly to your boat.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {partyOnDeliveryBenefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3" data-testid={`benefit-${idx}`}>
                        <benefit.icon className="h-6 w-6 text-pink-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">{benefit.title}</p>
                          <p className="text-xs text-gray-500">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                      asChild
                    >
                      <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" data-testid="link-party-on-delivery">
                        <Truck className="mr-2 h-5 w-5" />
                        Visit Party On Delivery
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                      asChild
                    >
                      <a href="https://partyondelivery.com/lake-travis" target="_blank" rel="noopener noreferrer" data-testid="link-pod-lake-travis">
                        Lake Travis Delivery
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                The Only Integrated Alcohol Delivery + Party Boat Service in Austin
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                Premier Party Cruises and Party On Delivery offer a unique partnership that eliminates all logistical challenges for your wedding weekend
              </p>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <Ship className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Book Your Boat</h3>
                  <p className="text-purple-100">Choose from our fleet for the perfect wedding weekend venue</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <Package className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Order Drinks</h3>
                  <p className="text-purple-100">Party On Delivery brings everything to your boat</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Celebrate</h3>
                  <p className="text-purple-100">Enjoy an unforgettable rehearsal dinner on Lake Travis</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold"
                  asChild
                >
                  <a href="https://premierpartycruises.com/chat" target="_blank" rel="noopener noreferrer" data-testid="button-cta-quote">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Start Planning
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outlineLight"
                  asChild
                >
                  <a href="https://partyondelivery.com/order-now" target="_blank" rel="noopener noreferrer" data-testid="button-cta-order">
                    <Truck className="mr-2 h-5 w-5" />
                    Order Drinks Now
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-purple-100 text-purple-700">Section 03</Badge>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                  Wedding Weekend Event Options
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  From rehearsal dinners to after parties, create unforgettable moments throughout your wedding weekend
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {weddingWeekendEvents.map((event, idx) => (
                  <Card key={idx} className="border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden" data-testid={`card-event-${idx}`}>
                    <div className="h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width="400"
                        height="192"
                        decoding="async"
                      />
                    </div>
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 mx-auto -mt-12 mb-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg border-4 border-white">
                        <event.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="font-playfair text-2xl">{event.name}</CardTitle>
                      <CardDescription className="text-base">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {event.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-purple-100 text-purple-700">Section 04</Badge>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                  Choose Your Perfect Vessel
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our fleet offers options for every wedding party size
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {fleetOptions.map((boat, idx) => (
                  <Card key={idx} className="border-0 shadow-xl hover:shadow-2xl transition-all overflow-hidden" data-testid={`card-fleet-${idx}`}>
                    <div className="h-56 overflow-hidden">
                      <img
                        src={boat.image}
                        alt={boat.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        width="400"
                        height="224"
                        decoding="async"
                      />
                    </div>
                    <CardHeader className="text-center">
                      <CardTitle className="font-playfair text-2xl">{boat.name}</CardTitle>
                      <Badge className="mt-2 bg-purple-100 text-purple-700 w-fit mx-auto">{boat.capacity}</Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="font-semibold text-purple-600 mb-2">{boat.ideal}</p>
                      <p className="text-gray-600 text-sm">{boat.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700"
                  asChild
                >
                  <a href="https://premierpartycruises.com" target="_blank" rel="noopener noreferrer" data-testid="button-view-fleet">
                    View Full Fleet Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-purple-100 text-purple-700">Section 05</Badge>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                  Wedding Celebrations on the Water
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  See why couples choose Lake Travis for their wedding weekend celebrations
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="400"
                      height="256"
                      decoding="async"
                      data-testid={`gallery-image-${idx}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-purple-100 text-purple-700">Section 06</Badge>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Everything you need to know about rehearsal dinner boat cruises
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((item, idx) => (
                    <AccordionItem 
                      key={idx} 
                      value={`item-${idx}`}
                      className="bg-white rounded-xl px-6 border shadow-sm"
                    >
                      <AccordionTrigger 
                        className="text-left hover:no-underline font-bold py-5"
                        data-testid={`faq-trigger-${idx}`}
                      >
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-5">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </SectionReveal>

        <ClientOnly>
          <QuoteBuilderSection />
        </ClientOnly>

        <SectionReveal>
          <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Ready to Plan Your Wedding Weekend on Lake Travis?
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                Create extraordinary memories with a rehearsal dinner cruise and seamless alcohol delivery
              </p>
              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
                <Card className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <Ship className="h-10 w-10 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">Premier Party Cruises</h3>
                    <a href="tel:5124885892" className="text-lg font-semibold hover:text-yellow-300 transition-colors">
                      (512) 488-5892
                    </a>
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        className="bg-white text-purple-600 hover:bg-gray-100"
                        asChild
                      >
                        <a href="https://premierpartycruises.com" target="_blank" rel="noopener noreferrer" data-testid="button-premier-website">
                          Visit Website
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <Truck className="h-10 w-10 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">Party On Delivery</h3>
                    <a href="tel:7373719700" className="text-lg font-semibold hover:text-yellow-300 transition-colors">
                      (737) 371-9700
                    </a>
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        className="bg-white text-purple-600 hover:bg-gray-100"
                        asChild
                      >
                        <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" data-testid="button-pod-website">
                          Visit Website
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-10 py-6"
                  asChild
                >
                  <a href="https://premierpartycruises.com/chat" target="_blank" rel="noopener noreferrer" data-testid="button-final-cta">
                    <Gift className="mr-2 h-5 w-5" />
                    Get Your Free Quote
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outlineLight"
                  className="text-lg px-10 py-6"
                  asChild
                >
                  <a href="tel:5124885892" data-testid="button-call-now">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 488-5892
                  </a>
                </Button>
              </div>
              <p className="mt-8 text-sm text-purple-200">
                Contact both companies for seamless event coordination in Austin!
              </p>
            </div>
          </section>
        </SectionReveal>
      </main>

      <Footer />
    </div>
  );
}
