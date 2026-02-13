import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Camera, Clock, CheckCircle2, 
  Wine, Sparkles, Heart, ArrowRight, Star,
  Truck, Palette, Instagram, Sun, Waves,
  Music, PartyPopper, Martini, Cherry, Citrus,
  Flower2, Gift, Zap, Droplets
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/@capitalcityshots-2_1760080740017.jpg';
import sectionImage1 from '@assets/@capitalcityshots-3_1760080740017.jpg';
import sectionImage2 from '@assets/@capitalcityshots-5_1760072938923.jpg';
import sectionImage3 from '@assets/clever-girl-3-bachelorette-boat.jpg';


const instagramCocktails = [
  {
    name: 'Frosé',
    description: 'Frozen rosé blended with strawberries - the ultimate Instagram bachelorette party cocktail',
    photoTip: 'Serve in clear plastic wine glasses against Lake Travis backdrop',
    ingredients: ['1 bottle rosé (frozen)', '1 cup strawberries', '2 tbsp honey', 'Ice'],
    color: 'bg-pink-200',
    icon: Cherry
  },
  {
    name: 'Aperol Spritz',
    description: 'Bright orange and bubbly - this bachelorette party cocktail photographs beautifully',
    photoTip: 'Capture the orange hue with sunset on Lake Travis',
    ingredients: ['2 oz Aperol', '3 oz Prosecco', '1 oz soda water', 'Orange slice'],
    color: 'bg-orange-200',
    icon: Citrus
  },
  {
    name: 'Lavender Lemonade Cocktail',
    description: 'Purple perfection for Instagram-worthy bachelorette cocktails',
    photoTip: 'Add dried lavender sprigs for that extra Instagram touch',
    ingredients: ['2 oz vodka', '3 oz lavender lemonade', 'Lavender sprig', 'Lemon wheel'],
    color: 'bg-purple-200',
    icon: Flower2
  },
  {
    name: 'Watermelon Margarita',
    description: 'Vibrant pink Instagram bachelorette party cocktails with fresh fruit',
    photoTip: 'Rim glasses with pink salt for added visual appeal',
    ingredients: ['2 oz tequila', '1 oz lime juice', '3 oz fresh watermelon juice', 'Tajín rim'],
    color: 'bg-red-200',
    icon: Droplets
  },
  {
    name: 'Blue Lagoon',
    description: 'Electric blue that pops in every photo - perfect Lake Travis bachelorette cocktail',
    photoTip: 'Match the blue to Lake Travis water in background',
    ingredients: ['1.5 oz vodka', '1 oz blue curaçao', '4 oz lemonade', 'Cherry garnish'],
    color: 'bg-blue-200',
    icon: Waves
  },
  {
    name: 'Espresso Martini',
    description: 'Elegant and energizing Instagram bachelorette party cocktail',
    photoTip: 'Capture the coffee bean garnish and perfect foam layer',
    ingredients: ['1.5 oz vodka', '1 oz espresso', '0.5 oz coffee liqueur', 'Coffee beans'],
    color: 'bg-amber-200',
    icon: Zap
  }
];

const photographyTips = [
  { icon: Sun, title: 'Golden Hour Magic', description: 'Schedule bachelorette party cocktail photos during sunset for the best Instagram lighting' },
  { icon: Camera, title: 'Elevated Angles', description: 'Shoot Instagram bachelorette cocktails from above to show off colorful ingredients' },
  { icon: Waves, title: 'Lake Travis Backdrop', description: 'Use the water as a natural backdrop for your bachelorette party cocktail photos' },
  { icon: Palette, title: 'Color Coordination', description: 'Match your Instagram bachelorette party cocktails to your party theme colors' },
  { icon: Star, title: 'Garnish Game', description: 'Fresh fruit, edible flowers, and creative garnishes elevate any bachelorette cocktail photo' },
  { icon: Heart, title: 'Group Cheers Shots', description: 'Capture the bride tribe raising their Instagram-worthy bachelorette cocktails together' }
];

const deliveryServices = [
  { 
    name: 'Party On Delivery', 
    description: 'Premier Party Cruises coordinates bachelorette party cocktail delivery to the dock',
    benefit: 'Everything iced and ready when you arrive for your Lake Travis cruise'
  },
  { 
    name: 'Pre-Made Cocktail Pouches', 
    description: 'Order Instagram-worthy bachelorette cocktails pre-mixed in convenient pouches',
    benefit: 'Perfect for BYOB boats - no mixing required, just pour and photograph'
  },
  { 
    name: 'Cocktail Kit Delivery', 
    description: 'Receive bachelorette party cocktail kits with everything you need',
    benefit: 'Pre-portioned ingredients with recipe cards for perfect bachelorette cocktails'
  },
  { 
    name: 'Mixer & Garnish Packs', 
    description: 'Fresh garnishes and mixers delivered for Instagram bachelorette party cocktails',
    benefit: 'Elevate your photos with professional-quality cocktail garnishes'
  }
];

const themeIdeas = [
  { theme: 'Pink Everything', cocktails: ['Frosé', 'Pink Lemonade Martini', 'Strawberry Paloma'], icon: Heart },
  { theme: 'Tropical Paradise', cocktails: ['Piña Colada', 'Mai Tai', 'Watermelon Margarita'], icon: Sun },
  { theme: 'Elegant & Classy', cocktails: ['French 75', 'Espresso Martini', 'Champagne Cocktails'], icon: Sparkles },
  { theme: 'Austin Vibes', cocktails: ['Ranch Water', 'Frozen Margarita', 'Texas Paloma'], icon: Star }
];

const boatFleet = [
  { name: 'Day Tripper', capacity: '14 guests', description: 'Intimate setting for close-up Instagram bachelorette cocktail photos' },
  { name: 'Meeseeks', capacity: '25 guests', description: 'Perfect group size for bride tribe cocktail shoots' },
  { name: 'The Irony', capacity: '30 guests', description: 'Spacious deck for Instagram bachelorette party cocktail stations' },
  { name: 'Clever Girl', capacity: '50-75 guests', description: 'Large groups with 14 disco balls for epic Instagram content' }
];

const faqs = [
  {
    question: 'What are the most Instagram-worthy bachelorette party cocktails?',
    answer: 'The most Instagram-worthy bachelorette party cocktails are colorful, photogenic drinks like Frosé (frozen rosé), Aperol Spritz (vibrant orange), Blue Lagoon (electric blue), and Lavender Lemonade Cocktails (elegant purple). These bachelorette cocktails photograph beautifully against the Lake Travis backdrop and match popular bachelorette party color schemes.'
  },
  {
    question: 'How do I coordinate cocktail delivery for a bachelorette party boat cruise?',
    answer: 'For Instagram bachelorette party cocktails on Lake Travis, use Party On Delivery service. Premier Party Cruises coordinates delivery to the dock so your bachelorette party cocktails arrive iced and ready. You can also order pre-made cocktail pouches or cocktail kits with delivery included for your bachelorette celebration.'
  },
  {
    question: 'Can I bring premade cocktails on the Lake Travis bachelorette boats?',
    answer: 'Yes! All Premier Party Cruises boats are BYOB-friendly. Bring your Instagram-worthy bachelorette cocktails in plastic containers or pouches (no glass allowed). Pre-batched bachelorette party cocktails in drink dispensers work great for both serving and photographing.'
  },
  {
    question: 'What garnishes make bachelorette party cocktails more Instagram-worthy?',
    answer: 'Top garnishes for Instagram bachelorette party cocktails include: fresh citrus wheels, edible flowers, fresh berries, colorful paper straws, custom drink stirrers, and matching umbrellas. These elements elevate your bachelorette cocktails from basic to Instagram-perfect.'
  },
  {
    question: 'What time is best for photographing bachelorette party cocktails on Lake Travis?',
    answer: 'Golden hour (1-2 hours before sunset) is ideal for Instagram bachelorette party cocktail photos on Lake Travis. The warm lighting makes drinks glow and provides stunning backdrop photos. Book a sunset cruise for the best Instagram-worthy bachelorette cocktail content.'
  },
  {
    question: 'How many cocktails should I plan for a bachelorette party?',
    answer: 'Plan 2-3 Instagram-worthy bachelorette party cocktails per person for a 3-4 hour Lake Travis cruise. Having 2-3 different signature bachelorette cocktails gives variety for photos and satisfies different taste preferences. Consider the bride\'s favorites when selecting recipes.'
  },
  {
    question: 'What are good non-alcoholic Instagram-worthy drinks for bachelorette parties?',
    answer: 'Instagram-worthy mocktails for bachelorette parties include: Virgin Frosé, Lavender Lemonade, Shirley Temples with fresh cherries, Sparkling Mocktails with edible flowers, and Fresh Fruit Smoothies. These photograph just as beautifully as alcoholic bachelorette party cocktails.'
  },
  {
    question: 'How do I keep bachelorette party cocktails cold on a boat?',
    answer: 'Premier Party Cruises provides coolers and ice for all Lake Travis bachelorette party boats. For Instagram bachelorette party cocktails, bring frozen fruit as ice cubes (keeps drinks cold and looks beautiful), use insulated tumblers, and keep backup bottles in the provided coolers.'
  }
];

const internalLinks = [
  { href: '/bachelorette-party-austin', label: 'Bachelorette Party Cruises', icon: Heart },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/blogs/cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy', label: 'Cocktail Kits vs Bottles', icon: Wine },
  { href: '/blogs/austin-bachelorette-alcohol-timeline', label: 'Alcohol Timeline Guide', icon: Clock },
  { href: '/blogs/lake-travis-bachelorette-alcohol-laws', label: 'Lake Travis Alcohol Laws', icon: CheckCircle2 }
];

export default function InstagramBacheloretteCocktails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/instagram-worthy-bachelorette-party-cocktails-recipes-and-delivery-coordination"
        defaultTitle="Instagram-Worthy Bachelorette Party Cocktails: Recipes & Delivery Coordination | Premier Party Cruises"
        defaultDescription="Create stunning Instagram bachelorette party cocktails with our recipes and delivery tips. Perfect for Lake Travis boat parties. Photo-ready bachelorette cocktails with delivery coordination for your celebration."
        defaultKeywords={['Instagram bachelorette party cocktails', 'bachelorette party cocktails', 'Instagram-worthy cocktails', 'bachelorette cocktail recipes', 'Lake Travis bachelorette', 'cocktail delivery', 'bachelorette drinks', 'photogenic cocktails', 'bride tribe drinks']}
        image="https://premierpartycruises.com/attached_assets/@capitalcityshots-2_1760080740017.jpg"
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="instagram-bachelorette-cocktails-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <LazyImage 
            src={heroImage}
            alt="Instagram-worthy bachelorette party cocktails on Lake Travis boat cruise"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-pink-400 text-black font-bold" data-testid="badge-hero">
              <Instagram className="w-4 h-4 mr-1" /> Photo-Perfect Bachelorette Drinks
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Instagram-Worthy Bachelorette<br />
              <span className="text-pink-300">Party Cocktails</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Recipes, photography tips, and delivery coordination for the most photogenic 
              bachelorette party cocktails on Lake Travis. Make every sip picture-perfect.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Plan Your Bachelorette</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-pink-900 font-semibold"
                data-testid="button-view-cruises"
              >
                <Link href="/bachelorette-party-austin">View Cruise Options</Link>
              </Button>
            </div>
          </div>
        </m.section>

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


        {/* Introduction */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="intro-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Elevate Your Bachelorette Party Cocktails for the 'Gram
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Your <strong>Instagram bachelorette party cocktails</strong> deserve to be as stunning as the celebration itself. 
                From vibrant Frosé to elegant Espresso Martinis, the right <strong>bachelorette party cocktails</strong> create 
                content that captures the magic of your Lake Travis adventure.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                This guide covers everything from <strong>Instagram-worthy bachelorette cocktail</strong> recipes to delivery 
                coordination for your Lake Travis boat party. Get ready to create <strong>bachelorette party cocktails</strong> 
                that look as amazing as they taste.
              </p>
            </m.div>
          </div>
        </section>

        {/* Cocktail Recipes */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="recipes-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-200 text-pink-800">Recipes</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                6 Instagram-Worthy Bachelorette Party Cocktails
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                These photogenic <strong>bachelorette party cocktails</strong> are designed for both taste and Instagram appeal. 
                Each recipe includes photo tips for the perfect shot.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instagramCocktails.map((cocktail, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow overflow-hidden">
                    <div className={`${cocktail.color} p-4`}>
                      <div className="flex items-center gap-3">
                        <cocktail.icon className="h-8 w-8 text-gray-800" />
                        <h3 className="font-bold text-xl text-gray-900">{cocktail.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{cocktail.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                          <Wine className="h-4 w-4 text-pink-600" /> Ingredients:
                        </h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {cocktail.ingredients.map((ing, i) => (
                            <li key={i}>• {ing}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
                        <h4 className="font-semibold text-pink-800 dark:text-pink-300 mb-1 flex items-center gap-2">
                          <Camera className="h-4 w-4" /> Photo Tip:
                        </h4>
                        <p className="text-sm text-pink-700 dark:text-pink-400">{cocktail.photoTip}</p>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Photography Tips */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="photo-tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-purple-200 text-purple-800">Photography</Badge>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Photography Tips for Instagram Bachelorette Cocktails
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Great <strong>Instagram bachelorette party cocktails</strong> need great photos. Use these tips to 
                  capture your <strong>bachelorette party cocktails</strong> in their best light on Lake Travis.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {photographyTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <tip.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{tip.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
              
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <LazyImage 
                  src={sectionImage1}
                  alt="Instagram bachelorette party cocktails photography on Lake Travis boat"
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
              </m.div>
            </div>
          </div>
        </section>

        {/* Delivery Coordination */}
        <section className="py-16 bg-blue-50 dark:bg-gray-800" data-testid="delivery-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-200 text-blue-800">Delivery</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Bachelorette Party Cocktail Delivery Coordination
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Getting your <strong>Instagram-worthy bachelorette party cocktails</strong> to the dock is easy. 
                Here are your delivery options for Lake Travis celebrations.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {deliveryServices.map((service, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center">
                          <Truck className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{service.name}</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{service.description}</p>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                        <p className="text-green-700 dark:text-green-400 text-sm flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          {service.benefit}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Theme Ideas */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="themes-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-200 text-pink-800">Theme Ideas</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Themed Bachelorette Party Cocktail Ideas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Match your <strong>Instagram bachelorette party cocktails</strong> to your party theme for cohesive content.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {themeIdeas.map((idea, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow text-center">
                    <CardContent className="p-6">
                      <div className="bg-pink-100 dark:bg-pink-900/30 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                        <idea.icon className="h-7 w-7 text-pink-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">{idea.theme}</h3>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {idea.cocktails.map((cocktail, i) => (
                          <li key={i}>• {cocktail}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Boat Fleet */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <LazyImage 
                  src={sectionImage3}
                  alt="Lake Travis bachelorette party boat with Instagram-worthy cocktails"
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
              </m.div>
              
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-blue-200 text-blue-800">Our Fleet</Badge>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Lake Travis Boats for Instagram Bachelorette Parties
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  All our boats are BYOB-friendly - bring your <strong>Instagram-worthy bachelorette party cocktails</strong> 
                  in plastic containers (no glass). Single-deck pontoons with arch canopy for shade.
                </p>
                <div className="space-y-4">
                  {boatFleet.map((boat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">{boat.name}</h3>
                        <Badge variant="outline">{boat.capacity}</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{boat.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
                  Clever Girl has additional crew fee for 51-75 guests.
                </p>
              </m.div>
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

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
              <Badge className="mb-4 bg-gray-200 text-gray-800">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about Instagram bachelorette party cocktails and Lake Travis celebrations.
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg px-6"
                  data-testid={`accordion-item-${index}`}
                >
                  <AccordionTrigger 
                    className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline"
                    data-testid={`accordion-trigger-${index}`}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                More Bachelorette Party Resources
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Continue planning your Instagram-perfect Lake Travis bachelorette celebration.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {internalLinks.map((link, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={link.href}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-3 h-auto py-4 text-left hover:bg-pink-50 dark:hover:bg-pink-900/20 border-gray-200 dark:border-gray-700"
                      data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <link.icon className="h-5 w-5 text-pink-600" />
                      <span>{link.label}</span>
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </Button>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}
