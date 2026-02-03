import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Sparkles, Users, Palette, Phone, Clock, CheckCircle2, 
  Music, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Heart, Ship, PartyPopper,
  Sun, Moon, Crown, Camera, Gift, Cake, Glasses
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-27_1760080807866.jpg';
import sectionImage1 from '@assets/@capitalcityshots-28_1760080807867.jpg';
import sectionImage2 from '@assets/@capitalcityshots-29_1760080807867.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const partyStats = [
  { stat: '14+', label: 'Years Experience' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const popularThemes = [
  {
    icon: Sparkles,
    title: 'Disco Cruise Theme',
    description: 'Our most popular Lake Travis boat party theme! The Clever Girl features 14 disco balls for the ultimate boat party celebration ideas experience',
    tips: ['Request the Clever Girl boat', 'Bring disco-era costumes', 'Create a 70s/80s playlist'],
    best: 'Bachelorette parties, birthdays'
  },
  {
    icon: Crown,
    title: 'VIP Luxury Theme',
    description: 'Elevate your unique party boat themes Austin experience with champagne, elegant decor, and sophisticated vibes',
    tips: ['Pre-arrange champagne delivery', 'White and gold color scheme', 'Jazz or lounge playlist'],
    best: 'Corporate events, anniversaries'
  },
  {
    icon: Sun,
    title: 'Tropical Paradise Theme',
    description: 'Transform your creative Lake Travis party into a tropical getaway with Hawaiian vibes and island music',
    tips: ['Lei garlands for guests', 'Tropical drink recipes', 'Hawaiian shirts encouraged'],
    best: 'Summer parties, team building'
  },
  {
    icon: Moon,
    title: 'Sunset Elegance Theme',
    description: 'Romantic Lake Travis boat party theme ideas perfect for proposals, anniversaries, and intimate celebrations',
    tips: ['Book sunset time slot', 'Rose petals and candles', 'Romantic playlist prepared'],
    best: 'Proposals, anniversaries'
  },
  {
    icon: Glasses,
    title: 'Gatsby/Roaring 20s Theme',
    description: 'Art deco glamour meets unique party boat themes Austin for a vintage celebration on the water',
    tips: ['Flapper dresses and suits', 'Gold and black decor', 'Jazz age cocktails'],
    best: 'Milestone birthdays, corporate galas'
  },
  {
    icon: PartyPopper,
    title: 'Fiesta Theme',
    description: 'Colorful, vibrant creative Lake Travis party vibes with Mexican-inspired decor and cuisine',
    tips: ['Colorful papel picado banners', 'Margaritas and tacos', 'Mariachi or Latin playlist'],
    best: 'Cinco de Mayo, summer parties'
  }
];

const seasonalThemes = [
  {
    season: 'Spring',
    themes: ['Garden Party', 'Easter Celebration', 'Spring Break Bash'],
    description: 'Perfect Lake Travis boat party theme ideas for March-May cruises'
  },
  {
    season: 'Summer',
    themes: ['Fourth of July', 'Beach/Pool Party', 'Luau'],
    description: 'Peak season boat party celebration ideas when the weather is hottest'
  },
  {
    season: 'Fall',
    themes: ['Halloween Costume Cruise', 'Harvest Festival', 'Oktoberfest'],
    description: 'Unique party boat themes Austin for September-November events'
  },
  {
    season: 'Winter',
    themes: ['Holiday Party', 'New Year\'s Eve', 'Winter Wonderland'],
    description: 'Creative Lake Travis party themes for the holiday season'
  }
];

const decorTips = [
  { icon: Palette, title: 'Color Coordination', description: 'Choose 2-3 colors for your Lake Travis boat party theme and carry through all decorations' },
  { icon: Camera, title: 'Photo Backdrop', description: 'Create an Instagram-worthy spot for unique party boat themes Austin photo opportunities' },
  { icon: Music, title: 'Themed Playlist', description: 'Match your music to your creative Lake Travis party theme for immersive vibes' },
  { icon: Gift, title: 'Party Favors', description: 'Send guests home with themed keepsakes from your boat party celebration ideas' }
];

const bacheloretteThemes = [
  { name: 'Last Sail Before the Veil', description: 'Nautical-themed Lake Travis boat party theme with anchor motifs and sailor stripes' },
  { name: 'Disco Diva', description: 'Sparkly, glamorous boat party celebration ideas with disco balls and glitter' },
  { name: 'Boho Bride', description: 'Relaxed unique party boat themes Austin with flower crowns and natural vibes' },
  { name: 'Pink Paradise', description: 'All-pink creative Lake Travis party theme perfect for the ultimate girls\' day' }
];

const bachelorThemes = [
  { name: 'Last Cast', description: 'Fishing and lake-themed Lake Travis boat party theme ideas for outdoorsy grooms' },
  { name: 'Yacht Rock Party', description: 'Preppy, classic boat party celebration ideas with nautical flair' },
  { name: 'Sports Day', description: 'Team jerseys and competitive games for unique party boat themes Austin' },
  { name: 'Tropical Bro-down', description: 'Hawaiian shirts and island vibes for a creative Lake Travis party' }
];

const faqs = [
  {
    question: 'What are the most popular Lake Travis boat party theme ideas?',
    answer: 'The most popular Lake Travis boat party theme ideas include our signature Disco Cruise (featuring 14 disco balls on the Clever Girl), Tropical Paradise, VIP Luxury, and Sunset Elegance themes. For bachelor and bachelorette parties, nautical themes like "Last Sail Before the Veil" are extremely popular boat party celebration ideas.'
  },
  {
    question: 'Can I bring my own decorations for themed parties?',
    answer: 'Absolutely! We encourage creative Lake Travis party decorations. Just ensure nothing uses tape on walls/ceilings, no glitter (it\'s nearly impossible to clean), and no glass. Balloons, banners, photo props, and table decorations are all perfect for unique party boat themes Austin celebrations.'
  },
  {
    question: 'Which boat is best for a disco theme party?',
    answer: 'The Clever Girl (50-75 guests) is our flagship for disco-themed Lake Travis boat party theme ideas. It features 14 disco balls already installed! For smaller groups wanting boat party celebration ideas with disco vibes, any of our boats work with our premium sound system and your playlist.'
  },
  {
    question: 'Do you provide decorations or do I need to bring everything?',
    answer: 'We provide the boat, sound system, and disco balls on the Clever Girl. All other themed decorations are brought by guests for their creative Lake Travis party. Many guests use Party On Delivery to coordinate catering that matches their unique party boat themes Austin celebration.'
  },
  {
    question: 'What are good theme ideas for corporate events?',
    answer: 'Popular corporate Lake Travis boat party theme ideas include VIP Luxury (elegant and professional), Gatsby/Roaring 20s (great for galas), and Tropical Paradise (perfect for team building). These boat party celebration ideas impress clients while keeping things fun and memorable.'
  },
  {
    question: 'Can you suggest themes for a combined bachelor/bachelorette party?',
    answer: 'For combined parties, popular creative Lake Travis party themes include Yacht Rock (preppy and fun), Festival/Coachella vibes, or a classic "Last Sail Before the Veil" with elements for both groups. The Clever Girl accommodates 50-75 guests for these unique party boat themes Austin celebrations.'
  },
  {
    question: 'What seasonal themes work best on Lake Travis?',
    answer: 'Summer is perfect for tropical and beach Lake Travis boat party theme ideas. Fall offers great weather for Halloween costume cruises and Oktoberfest boat party celebration ideas. Winter holiday parties and New Year\'s Eve creative Lake Travis party celebrations are also popular during the cooler months.'
  },
  {
    question: 'How do I coordinate food and drinks with my party theme?',
    answer: 'We recommend using Party On Delivery for beverage coordination and our catering partners for themed menus. Whether you want tropical drinks for a luau or champagne for a VIP Lake Travis boat party theme, we can help coordinate your unique party boat themes Austin vision.'
  }
];

const internalLinks = [
  { href: '/bachelor-party-austin', label: 'Bachelor Parties', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/quote', label: 'Get a Quote', icon: Star }
];

export default function CreativeLakeTravisPartyThemes() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Creative Lake Travis Boat Party Themes - Unique Ideas for Memorable Celebrations | Premier Party Cruises</title>
        <meta name="description" content="Discover creative Lake Travis boat party theme ideas for unforgettable celebrations. Unique party boat themes Austin including disco, tropical, VIP luxury, and more. Boat party celebration ideas for bachelor, bachelorette, corporate, and special events." />
        <meta name="keywords" content="Lake Travis boat party theme, unique party boat themes Austin, creative Lake Travis party, boat party celebration ideas, Lake Travis party themes, themed boat party Austin, party boat decorations Lake Travis" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/creative-lake-travis-boat-party-themes-unique-ideas-for-memorable-celebrations" />
        <meta property="og:title" content="Creative Lake Travis Boat Party Themes - Unique Ideas for Memorable Celebrations" />
        <meta property="og:description" content="Discover creative party themes for your Lake Travis boat celebration. From disco to tropical to VIP luxury - unique ideas for unforgettable events." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-boat-party-themes-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Creative Lake Travis boat party themes - decorated party boat with disco balls and festive atmosphere"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-pink-400 text-black font-bold" data-testid="badge-hero">
              <Sparkles className="h-4 w-4 mr-1 inline" />
              Creative Party Themes
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Creative Lake Travis Boat Party Themes<br />
              <span className="text-pink-300">Unique Ideas for Memorable Celebrations</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Transform your celebration with unique party boat themes Austin loves. From disco to tropical to elegant VIP experiences - discover boat party celebration ideas that make your event unforgettable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Plan Your Themed Party</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-900 font-semibold"
                data-testid="button-disco"
              >
                <Link href="/atx-disco-cruise">See Disco Cruise</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partyStats.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Themes */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="themes-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">POPULAR THEMES</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="themes-title">
                Top Lake Travis Boat Party Theme Ideas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our most requested unique party boat themes Austin guests love
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularThemes.map((theme, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-purple-500" data-testid={`theme-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <theme.icon className="h-7 w-7 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-xl mb-2">{theme.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{theme.description}</p>
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-500 mb-2">TIPS:</p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {theme.tips.map((tip, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-purple-500" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Badge variant="outline" className="text-purple-600 border-purple-600">Best for: {theme.best}</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage1}
              alt="Unique party boat themes Austin - guests enjoying creative Lake Travis party with themed decorations"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-themes"
            />
          </div>
        </section>

        {/* Seasonal Themes */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="seasonal-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-orange-100 text-orange-700">SEASONAL IDEAS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="seasonal-title">
                Seasonal Boat Party Celebration Ideas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Match your creative Lake Travis party theme to the season
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seasonalThemes.map((season, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`seasonal-card-${index}`}>
                    <CardHeader>
                      <CardTitle className="text-xl">{season.season}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {season.themes.map((theme, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-orange-500" />
                            <span className="text-sm">{theme}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-gray-500">{season.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Decoration Tips */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="decor-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-100 text-pink-700">DECORATION TIPS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="decor-title">
                Tips for Your Lake Travis Boat Party Theme
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Make your unique party boat themes Austin vision come to life
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {decorTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`decor-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <tip.icon className="h-6 w-6 text-pink-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bachelor/Bachelorette Themes */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="bach-themes-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-red-100 text-red-700">BACH PARTY THEMES</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="bach-title">
                Bachelor & Bachelorette Party Theme Ideas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Creative Lake Travis party themes for pre-wedding celebrations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="h-full" data-testid="bachelorette-themes-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-6 w-6 text-pink-500" />
                      Bachelorette Themes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bacheloretteThemes.map((theme, index) => (
                        <div key={index} className="border-l-4 border-pink-500 pl-4">
                          <h4 className="font-bold">{theme.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{theme.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="h-full" data-testid="bachelor-themes-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-6 w-6 text-blue-500" />
                      Bachelor Themes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bachelorThemes.map((theme, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-bold">{theme.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{theme.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Image Section 2 */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={sectionImage2}
              alt="Boat party celebration ideas - themed bachelorette party on Lake Travis with decorations and happy guests"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-celebration"
            />
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">THEME FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">
                Questions About Party Themes
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about Lake Travis boat party theme ideas
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
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

        {/* Internal Links */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Find the perfect boat for your unique party boat themes Austin
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-purple-500" data-testid={`link-card-${index}`}>
                    <CardContent className="pt-6 text-center">
                      <link.icon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Sparkles className="h-16 w-16 mx-auto mb-6 text-pink-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="cta-title">
                Let's Create Your Perfect Theme
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                From disco balls to tropical paradise - bring your creative Lake Travis party vision to life. Our team helps make your unique party boat themes Austin celebration unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-purple-700 hover:bg-gray-100 font-bold text-lg px-8"
                  data-testid="button-cta-quote"
                >
                  <Link href="/book-now">Start Planning Your Theme</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-700 font-semibold"
                  data-testid="button-cta-call"
                >
                  <a href="tel:5125551234">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
