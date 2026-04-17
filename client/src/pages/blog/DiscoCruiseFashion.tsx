import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Shirt, Sparkles, Star, Users, Camera, Sun,
  ArrowRight, Heart, Glasses, Crown, Palette,
  CheckCircle2, PartyPopper, Music, Ship, Waves
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/disco_fun_first_1765193453547.jpg';
import sectionImage1 from '@assets/disco_fun2_1765193453547.jpg';
import sectionImage2 from '@assets/disco_fun3_1765193453547.jpg';
import sectionImage3 from '@assets/disco_fun5_1765193453548.jpg';
import sectionImage4 from '@assets/disco_fun6_1765193453548.jpg';
import InlineCTABar from '@/components/InlineCTABar';

const fashionTips = [
  { 
    icon: Sparkles, 
    title: 'Embrace the Theme', 
    description: 'Disco cruise fashion means bold colors, sparkles, and 70s vibes for your ATX Disco Cruise experience',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Sun, 
    title: 'Lake-Ready Style', 
    description: 'Your party boat outfit ideas should blend style with swim-readiness for Lake Travis adventures',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Camera, 
    title: 'Photo-Ready Looks', 
    description: 'Stand out in professional photos with what to wear on a boat party that pops on camera',
    color: 'text-pink-600',
    bg: 'bg-pink-100'
  },
  { 
    icon: Users, 
    title: 'Coordinated Crew', 
    description: 'Matching bachelorette party cruise outfits make your group unforgettable on the water',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  }
];

const outfitCategories = [
  {
    name: 'Classic Disco Glam',
    tagline: 'The Showstopper',
    color: 'border-purple-500',
    headerBg: 'bg-gradient-to-r from-purple-600 to-pink-500',
    popular: true,
    items: [
      'Sequined jumpsuits or bodysuits',
      'Bell-bottom jeans with sparkly tops',
      'Metallic mini dresses',
      'Platform sandals (remove for swimming)',
      'Statement disco ball earrings',
      'Feather boas and headbands'
    ],
    best: 'Bachelorette parties & birthday celebrations',
    cta: 'Perfect disco cruise fashion for making memories'
  },
  {
    name: 'Tropical Party Vibes',
    tagline: 'Island Ready',
    color: 'border-amber-500',
    headerBg: 'bg-gradient-to-r from-amber-500 to-orange-500',
    items: [
      'Hawaiian shirts (guys and girls)',
      'Floral maxi dresses',
      'Bright colored swim cover-ups',
      'Straw hats and sun visors',
      'Tropical print swimwear',
      'Colorful sandals and flip flops'
    ],
    best: 'Bachelor parties & casual celebrations',
    cta: 'Essential party boat outfit ideas for Lake Travis'
  },
  {
    name: 'Matching Crew Style',
    tagline: 'Squad Goals',
    color: 'border-pink-500',
    headerBg: 'bg-gradient-to-r from-pink-500 to-rose-500',
    items: [
      'Custom printed group t-shirts',
      'Matching swimsuits or cover-ups',
      'Coordinated color themes',
      '"Bride Tribe" or "Groom\'s Crew" gear',
      'Matching sunglasses for the group',
      'Personalized fanny packs'
    ],
    best: 'Bachelorette party cruise outfits',
    cta: 'Unforgettable coordinated looks for your celebration'
  }
];

const whatToBring = [
  { category: 'Must-Haves', items: ['Swimsuit under outfit', 'Waterproof phone case', 'Reef-safe sunscreen', 'Hair ties'] },
  { category: 'Nice-to-Haves', items: ['Change of clothes', 'Cute cover-up', 'Backup sunglasses', 'Portable fan'] },
  { category: 'Leave Behind', items: ['Glass containers (not allowed)', 'Expensive jewelry', 'Formal shoes', 'Anything irreplaceable'] }
];

const faqs = [
  {
    question: 'What is the best disco cruise fashion for the ATX Disco Cruise?',
    answer: 'The best disco cruise fashion includes sequined tops, metallic fabrics, bell-bottoms, and anything with sparkle. The ATX Disco Cruise celebrates 70s disco vibes, so think Studio 54 meets Lake Travis. Bold colors, platform sandals (removable for swimming), and disco-themed accessories like mirror ball earrings all work perfectly.'
  },
  {
    question: 'What should I wear on a boat party in Austin?',
    answer: 'When deciding what to wear on a boat party in Austin, prioritize swim-ready outfits. Wear your swimsuit underneath with a stylish cover-up or dress that\'s easy to remove. Avoid anything too formal or delicate. Our party boats have swimming stops, so your outfit should transition easily from dancing to diving in.'
  },
  {
    question: 'What are the best party boat outfit ideas for bachelorettes?',
    answer: 'Popular party boat outfit ideas for bachelorettes include matching swimsuits with bride-themed cover-ups, coordinated colors (often pink or white for the bride, black for the squad), and fun accessories like "Bride Tribe" sunglasses. Many groups do themed costumes like disco glam or tropical paradise for their bachelorette party cruise outfits.'
  },
  {
    question: 'Can I wear heels on the ATX Disco Cruise?',
    answer: 'While you can bring platform sandals or wedges for disco cruise fashion photos, we recommend flat shoes or going barefoot while on the boat for safety. The dance floor can get slippery with water, so removable platform sandals are popular – wear them for photos, remove them for dancing and swimming.'
  },
  {
    question: 'What should guys wear on a Lake Travis party boat?',
    answer: 'Great party boat outfit ideas for guys include swim trunks with a fun button-up shirt (leave it unbuttoned for easy removal), Hawaiian shirts, matching group t-shirts, or retro disco shirts. Avoid heavy jeans or anything you don\'t want to get wet. Tank tops, board shorts, and boat shoes or sandals work great.'
  },
  {
    question: 'Are there any clothing items not allowed on the boat party?',
    answer: 'While we welcome all disco cruise fashion choices, we ask guests not to bring anything with sharp embellishments that could damage the boat or injure others. Glass accessories aren\'t allowed (glass containers are prohibited). High-value jewelry isn\'t recommended since there are swimming activities on Lake Travis.'
  },
  {
    question: 'Should we coordinate outfits for our group\'s ATX Disco Cruise?',
    answer: 'Absolutely! Coordinated bachelorette party cruise outfits or matching bachelor crew gear makes for amazing photos and helps identify your group. Popular themes include matching colors, custom printed shirts, coordinated disco costumes, or tropical Hawaiian shirts. Our professional photographer captures these group shots beautifully.'
  },
  {
    question: 'What accessories complete the perfect disco cruise fashion look?',
    answer: 'Perfect disco cruise fashion accessories include oversized sunglasses, statement earrings, headbands, feather boas, temporary tattoos, glow sticks (for sunset cruises), and waterproof fanny packs. Don\'t forget practical items like hair ties for swimming and a waterproof phone case for photos on Lake Travis.'
  }
];

const internalLinks = [
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Music },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/bachelor-party-austin', label: 'Bachelor Parties', icon: Users },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship }
];

const fleetInfo = [
  { name: 'Day Tripper', capacity: '14 guests', description: 'Intimate party atmosphere' },
  { name: 'Meeseeks', capacity: '25 guests', description: 'Medium groups' },
  { name: 'The Irony', capacity: '30 guests', description: 'Perfect for larger parties' },
  { name: 'Clever Girl', capacity: '50-75 guests', description: 'Flagship party vessel' }
];

export default function DiscoCruiseFashion() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/disco-cruise-fashion-part-1"
        defaultTitle="Disco Cruise Fashion Guide: What to Wear on ATX Disco Cruise | Lake Travis Party Boat Outfit Ideas"
        defaultDescription="Complete disco cruise fashion guide for ATX Disco Cruise on Lake Travis. Discover party boat outfit ideas, bachelorette party cruise outfits, and what to wear on a boat party in Austin. Stand out with disco glam style!"
        defaultKeywords={['disco cruise fashion', 'ATX Disco Cruise', 'party boat outfit ideas', 'what to wear on a boat party', 'bachelorette party cruise outfits', 'Lake Travis party boat', 'Austin boat party attire', 'disco party clothes']}
        image={heroImage}
      />

      <BlogV2Layout
        title="Disco Cruise Fashion Guide: What to Wear on ATX Disco Cruise"
        description="Complete disco cruise fashion guide for ATX Disco Cruise on Lake Travis. Discover party boat outfit ideas, bachelorette party cruise outfits, and what to wear on a boat party in Austin."
        slug="disco-cruise-fashion-part-1"
        category="ATX Disco Cruise"
        categoryHref="/atx-disco-cruise"
        pillarTitle="ATX Disco Cruise"
        pillarHref="/atx-disco-cruise"
        relatedArticles={[
          { title: "ATX Disco Cruise Experience", href: "/blogs/atx-disco-cruise-experience" },
          { title: "Why the ATX Disco Cruise Has Been Austin's #1 Bachelorette Party Activity Since 2019", href: "/blogs/why-the-atx-disco-cruise-has-been-austins-1-bachelorette-party-activity-since-2019" },
          { title: "The Best Bachelor Party Boat in Austin: Disco Cruise vs Private Charter", href: "/blogs/the-best-bachelor-party-boat-in-austin-disco-cruise-vs-private-charter" },
        ]}
      >
      <div className="min-h-screen" data-testid="disco-cruise-fashion-page">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-pink-700 to-purple-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Disco Cruise Fashion Guide: What to Wear on ATX Disco Cruise - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              FASHION GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Disco Cruise Fashion: What to Wear on Your ATX Disco Cruise
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              The Ultimate Guide to Party Boat Outfit Ideas for Lake Travis
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              From bachelorette party cruise outfits to disco glam looks, discover what to wear on a boat party that will make you shine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/atx-disco-cruise">
                <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-black font-bold text-lg px-8 py-6" data-testid="button-book-cruise">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Book Your ATX Disco Cruise
                </Button>
              </Link>
              <Link href="/bachelorette-party-austin">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-packages">
                  View Bachelorette Packages
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
            Explore our full guide to{' '}
            <Link href="/party-boat-lake-travis" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Lake Travis party boat rentals</Link>{' '}
            for everything from pricing and logistics to safety and entertainment.
          </p>
        </div>
      </div>


        {/* Hero Image with SEO Alt */}
        <section className="relative -mt-8 mb-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={heroImage}
              alt="Disco cruise fashion ATX Disco Cruise Lake Travis party boat outfit ideas bachelorette cruise"
              className="w-full rounded-2xl shadow-2xl"
              data-testid="img-hero"
            />
          </div>
        </section>

        <InlineCTABar variant="slate" />

        {/* Fashion Tips Grid */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="tips-title">Essential Disco Cruise Fashion Tips</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Master what to wear on a boat party with these party boat outfit ideas for the ATX Disco Cruise
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fashionTips.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-purple-200" data-testid={`card-tip-${index}`}>
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

        {/* Introduction Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="intro-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-700">DISCO CRUISE FASHION</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="intro-title">Why What You Wear Matters on Lake Travis</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The ATX Disco Cruise isn't just any Lake Travis party boat experience – it's a celebration of disco culture, 
                    style, and unforgettable moments. Your disco cruise fashion choices set the tone for the entire experience, 
                    from the dance floor to the professional photos you'll treasure forever.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Whether you're planning bachelorette party cruise outfits or wondering what to wear on a boat party, 
                    this guide covers everything you need to know. Our party boat outfit ideas combine style with practicality 
                    for the perfect Lake Travis adventure.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Professional photographer captures every stunning outfit</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Swimming stops mean swim-ready disco cruise fashion is key</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">70s disco themes encourage creative party boat outfit ideas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Coordinated groups stand out on the ATX Disco Cruise</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Party boat outfit ideas Lake Travis ATX Disco Cruise fashion bachelorette group"
                      className="w-full h-full object-cover"
                      data-testid="img-intro"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-8 w-8 text-purple-500" />
                      <div>
                        <p className="font-bold text-sm">Stand Out Style</p>
                        <p className="text-xs text-gray-500">Perfect for photos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        <InlineCTABar variant="amber" />

        {/* Outfit Categories Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="outfits-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-100 text-pink-700">OUTFIT INSPIRATION</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="outfits-title">Popular Party Boat Outfit Ideas for Your ATX Disco Cruise</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Find the perfect disco cruise fashion style for your Lake Travis celebration
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-8">
              {outfitCategories.map((category, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  {category.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-purple-500 text-white font-bold px-4 py-1">MOST POPULAR</Badge>
                    </div>
                  )}
                  <Card className={`h-full border-2 ${category.color} ${category.popular ? 'shadow-xl scale-105' : ''}`} data-testid={`card-outfit-${index}`}>
                    <CardHeader className={`${category.headerBg} text-white text-center py-6`}>
                      <p className="text-sm font-medium opacity-90">{category.tagline}</p>
                      <CardTitle className="text-2xl font-bold">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3 mb-6">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Best for:</p>
                        <p className="font-medium text-sm">{category.best}</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic">{category.cta}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bachelorette Focus Section */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="bachelorette-section">
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
                      alt="Bachelorette party cruise outfits ATX Disco Cruise Lake Travis matching group"
                      className="w-full h-full object-cover"
                      data-testid="img-bachelorette"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-pink-100 text-pink-700">BACHELORETTE STYLE</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="bachelorette-title">Perfect Bachelorette Party Cruise Outfits</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Your bachelorette party cruise outfits should celebrate the bride-to-be while keeping your whole squad 
                    looking fabulous. The ATX Disco Cruise is the perfect backdrop for coordinated disco cruise fashion 
                    that will look amazing in every photo.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Crown className="h-5 w-5 text-amber-500" />
                        For the Bride
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        White or gold sequined dress, "Bride" sash or crown, white swimsuit for lake stops, 
                        and matching accessories. Stand out as the star of your Lake Travis celebration!
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-pink-500" />
                        For the Bride Tribe
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Matching pink, black, or colorful disco cruise fashion. "Bride Tribe" or custom shirts, 
                        coordinated swimwear, and fun party boat outfit ideas that complement the bride.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        <InlineCTABar variant="navy" />

        {/* What to Bring Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="packing-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">PACKING GUIDE</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="packing-title">What to Bring for Your ATX Disco Cruise</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Beyond choosing the perfect disco cruise fashion, knowing what to wear on a boat party also means 
                    packing the right accessories. Here's your essential party boat outfit ideas checklist for Lake Travis.
                  </p>
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    {whatToBring.map((section, index) => (
                      <Card key={index} className="bg-gray-50 dark:bg-gray-800">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-3 text-center">{section.category}</h4>
                          <ul className="space-y-2">
                            {section.items.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className={`h-3 w-3 flex-shrink-0 ${section.category === 'Leave Behind' ? 'text-red-500' : 'text-green-500'}`} />
                                <span className="text-gray-600 dark:text-gray-400">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="What to wear on a boat party Lake Travis ATX Disco Cruise packing essentials"
                      className="w-full h-full object-cover"
                      data-testid="img-packing"
                    />
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Fleet Info Section */}
        <section className="py-12 bg-purple-900 text-white" data-testid="fleet-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold">Our Party Boat Fleet for Your Disco Cruise Fashion Debut</h3>
              <p className="text-white/80 mt-2">All boats feature single-deck pontoon design with arch canopy</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {fleetInfo.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <Ship className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                  <p className="text-xl font-bold text-amber-400" data-testid={`boat-name-${index}`}>{boat.name}</p>
                  <p className="text-sm text-white/90 mt-1">{boat.capacity}</p>
                  <p className="text-xs text-white/70">{boat.description}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Style Tips Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-800 dark:to-gray-900" data-testid="final-tips-section">
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
                      src={sectionImage4}
                      alt="ATX Disco Cruise disco cruise fashion Lake Travis party boat outfit ideas group"
                      className="w-full h-full object-cover"
                      data-testid="img-final-tips"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-amber-100 text-amber-700">PRO TIPS</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="pro-tips-title">Final Disco Cruise Fashion Tips</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Glasses className="h-5 w-5 text-purple-500" />
                        Sunglasses Are Essential
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The Lake Travis sun is intense. Bring fun, statement sunglasses that complement your 
                        party boat outfit ideas and protect your eyes during the ATX Disco Cruise.
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Palette className="h-5 w-5 text-pink-500" />
                        Bold Makeup That Lasts
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        For bachelorette party cruise outfits, use waterproof makeup that can handle swimming, 
                        dancing, and the Texas heat. Setting spray is your best friend for disco cruise fashion.
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Camera className="h-5 w-5 text-blue-500" />
                        Photo-Ready at All Times
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our professional photographer captures candid and posed shots. Choose what to wear on 
                        a boat party that you'll love seeing in photos for years to come.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h3 className="text-xl font-bold text-center mb-8">Plan Your ATX Disco Cruise Experience</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid={`link-card-${index}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <link.icon className="h-8 w-8 text-purple-500" />
                      <span className="font-medium">{link.label}</span>
                      <ArrowRight className="h-4 w-4 ml-auto text-gray-400" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">Frequently Asked Questions About Disco Cruise Fashion</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about what to wear on a boat party and party boat outfit ideas
              </p>
            </m.div>

            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400" data-testid={`faq-content-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="cta-title">Ready to Show Off Your Disco Cruise Fashion?</h2>
              <p className="text-lg text-white/90 mb-8">
                Book your ATX Disco Cruise on Lake Travis and put those party boat outfit ideas to the test! 
                Our professional photographer will capture every stunning look.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-black font-bold text-lg px-8 py-6" data-testid="button-book-now">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Book ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-contact">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Get Outfit Inspiration
                  </Button>
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

      </div>
      </BlogV2Layout>
    </>
    </LazyMotionProvider>
  );
}
