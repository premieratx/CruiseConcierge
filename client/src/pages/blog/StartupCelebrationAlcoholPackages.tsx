import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Building2, Rocket, Trophy, PartyPopper,
  Sparkles, Wine, Star, ArrowRight, CheckCircle2,
  Briefcase, TrendingUp, Target, Lightbulb, Gift,
  Calendar, Package, DollarSign, Award, Zap, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-21_1760080807864.jpg';
import sectionImage1 from '@assets/@capitalcityshots-22_1760080807865.jpg';
import sectionImage2 from '@assets/@capitalcityshots-23_1760080807865.jpg';
import sectionImage3 from '@assets/@capitalcityshots-24_1760080807866.jpg';
import sectionImage4 from '@assets/@capitalcityshots-25_1760080807866.jpg';

const whyLakeTravis = [
  { 
    icon: Building2, 
    title: 'Austin Tech Hub', 
    description: 'Lake Travis is minutes from downtown Austin, perfect for celebrating your startup milestones',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Sparkles, 
    title: 'Memorable Experience', 
    description: 'A party boat celebration stands out from typical office parties or bar gatherings',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Users, 
    title: 'Team Bonding', 
    description: 'Celebrate together on the water with your entire team after crushing your goals',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Wine, 
    title: 'BYOB Flexibility', 
    description: 'Party On Delivery handles all your alcohol needs with convenient dock delivery',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  }
];

const fundingRoundPackages = [
  {
    name: 'Seed Round Celebration',
    tagline: 'For Early-Stage Wins',
    price: 'Teams of 10-14',
    color: 'border-green-500',
    headerBg: 'bg-green-500',
    features: [
      'Day Tripper boat (14 passengers)',
      'Champagne toast package',
      'Craft beer selection',
      'Premium seltzers',
      'Ice and coolers included',
      'Perfect for small founding teams'
    ],
    podSuggestion: 'Champagne + local craft beers'
  },
  {
    name: 'Series A Bash',
    tagline: 'Most Popular',
    price: 'Teams of 15-25',
    color: 'border-blue-500',
    headerBg: 'bg-blue-500',
    popular: true,
    features: [
      'Meeseeks boat (25 passengers)',
      'Premium champagne selection',
      'Full bar package',
      'Mixer and garnish kit',
      'Snack and appetizer coordination',
      'Ideal for growing teams'
    ],
    podSuggestion: 'Premium spirits + champagne tower'
  },
  {
    name: 'Series B+ Blowout',
    tagline: 'Go Big or Go Home',
    price: 'Teams of 26-50+',
    color: 'border-purple-500',
    headerBg: 'bg-purple-500',
    features: [
      'Clever Girl boat (50 passengers)',
      'Top-shelf champagne collection',
      'Full premium bar',
      'Specialty cocktail ingredients',
      'Catering coordination available',
      'Perfect for major milestones'
    ],
    podSuggestion: 'VIP package with craft cocktails'
  }
];

const productLaunchTips = [
  { icon: Calendar, title: 'Time It Right', description: 'Book your cruise for the day of or day after launch for maximum celebration energy' },
  { icon: Package, title: 'Brand the Experience', description: 'Bring custom cups, koozies, or decorations featuring your product branding' },
  { icon: Users, title: 'Invite Key Stakeholders', description: 'Include early customers, advisors, and investors in the celebration' },
  { icon: Wine, title: 'Signature Cocktail', description: 'Create a custom drink named after your product through Party On Delivery' }
];

const milestoneEvents = [
  { milestone: 'First $1M ARR', icon: TrendingUp, suggestion: 'Champagne-focused package with premium bubbles for toasting' },
  { milestone: '100 Customers', icon: Users, suggestion: 'Craft beer and seltzers for a casual team celebration' },
  { milestone: 'Acquisition Announcement', icon: Briefcase, suggestion: 'Full premium bar with top-shelf spirits' },
  { milestone: 'Product Hunt Launch', icon: Rocket, suggestion: 'Mixed package with champagne for launch moment' },
  { milestone: 'Team Anniversary', icon: Calendar, suggestion: 'Custom cocktail ingredients for signature team drinks' },
  { milestone: 'Office Opening', icon: Building2, suggestion: 'Welcome package with Austin local craft selections' }
];

const partyOnDeliveryBenefits = [
  { icon: Ship, title: 'Dock Delivery', description: 'Beverages delivered directly to your boat before departure' },
  { icon: Package, title: 'Curated Packages', description: 'Startup-friendly packages designed for team celebrations' },
  { icon: DollarSign, title: 'Budget Options', description: 'Packages for every funding stage from bootstrap to Series C' },
  { icon: Clock, title: 'Last-Minute OK', description: 'Same-day delivery available for spontaneous celebrations' }
];

const whyStartupsChooseUs = [
  { stat: '50+', label: 'Tech Companies Served' },
  { stat: '4.9★', label: 'Average Rating' },
  { stat: '100%', label: 'BYOB Friendly' },
  { stat: '3-5hr', label: 'Cruise Options' }
];

const faqs = [
  {
    question: 'How does Party On Delivery work for startup celebrations?',
    answer: 'Party On Delivery is our beverage coordination partner. They help you select the perfect alcohol packages for your celebration, handle all purchasing, and deliver everything to the dock before your cruise. When your team arrives, coolers are stocked and chilled. No stops at the store, no hauling cases - just show up and celebrate your milestone.'
  },
  {
    question: 'What alcohol packages work best for funding round celebrations?',
    answer: 'For seed rounds, we recommend champagne with local craft beers. Series A celebrations often include premium spirits for mixed drinks. Series B and beyond typically go all-out with top-shelf selections and custom cocktail ingredients. Party On Delivery can customize any package to your team\'s preferences and budget.'
  },
  {
    question: 'Can we bring our own alcohol instead of using Party On Delivery?',
    answer: 'Absolutely! All our cruises are BYOB (bring your own beverage). Party On Delivery is optional but highly recommended for convenience. They handle everything from selection to delivery, so you don\'t have to worry about logistics on your big celebration day.'
  },
  {
    question: 'How far in advance should we book for a startup celebration?',
    answer: 'For planned milestones like funding announcements, we recommend 2-3 weeks advance booking. However, we understand startups move fast - contact us for last-minute availability. We\'ve helped teams celebrate same-week funding closures before!'
  },
  {
    question: 'What size boat do we need for our startup team?',
    answer: 'We have three boat options: Day Tripper (14 passengers) for founding teams, Meeseeks (25 passengers) for growing startups, and Clever Girl (50 passengers) for larger teams or milestone celebrations with investors and advisors.'
  },
  {
    question: 'Can we include investors or board members in the celebration?',
    answer: 'Definitely! Many startups use our cruises to celebrate with their full team plus key stakeholders. It\'s a unique way to thank investors for their support and create memorable bonding experiences outside the boardroom.'
  }
];

export default function StartupCelebrationAlcoholPackages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/startup-celebration-alcohol-packages-funding-rounds-launches-and-milestone-events"
        defaultTitle="Startup Celebration Alcohol Packages: Funding Rounds, Launches & Milestone Events | Premier Party Cruises"
        defaultDescription="Celebrate your Austin startup milestones on Lake Travis with Party On Delivery alcohol packages. Perfect for funding rounds, product launches, and team celebrations. BYOB party boat cruises for tech teams."
        defaultKeywords={['startup celebration Austin', 'tech company party boat', 'funding round celebration', 'product launch party Austin', 'Party On Delivery', 'Lake Travis corporate cruise', 'Austin startup events', 'team celebration cruise']}
        image="https://premierpartycruises.com/attached_assets/@capitalcityshots-21_1760080807864.jpg"
      />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-purple-800 to-blue-900 text-white overflow-hidden"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Startup Celebration Alcohol Packages: Funding Rounds, Launches & Milestone Events - Premier Party Cruises Lake Travis"
          />
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-green-500 text-white font-bold">
              AUSTIN STARTUP CELEBRATIONS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Startup Celebration Alcohol Packages:<br />Funding Rounds, Launches & Milestone Events
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Your Austin startup just hit a major milestone. Celebrate with your team on Lake Travis with <strong>Party On Delivery</strong> alcohol packages delivered right to your party boat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/private-cruises">
                <Button size="lg" className="bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-8 py-6">
                  <Rocket className="mr-2 h-5 w-5" />
                  Book Your Celebration
                </Button>
              </Link>
              <Link href="/company-milestone">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  View Corporate Packages
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
            See our complete guide to{' '}
            <Link href="/corporate-events" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin corporate event boats</Link>{' '}
            for team building, client entertainment, and company celebrations on Lake Travis.
          </p>
        </div>
      </div>


        {/* Why Austin Startups Celebrate on Lake Travis */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800">WHY LAKE TRAVIS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Why Austin Startups Celebrate on Lake Travis
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                From Y Combinator alums to bootstrapped success stories, Austin's tech community knows that Lake Travis party boats are the ultimate way to celebrate startup wins.
              </p>
            </m.div>

            <m.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {whyLakeTravis.map((item, index) => (
                <m.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-md">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* Image Break */}
        <section className="relative h-64 md:h-80">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${sectionImage1})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <Rocket className="h-12 w-12 mx-auto mb-4" />
              <p className="text-2xl md:text-3xl font-bold">From Seed to Series C</p>
              <p className="text-lg opacity-90">We've helped celebrate every stage of startup growth</p>
            </div>
          </div>
        </section>

        {/* Funding Round Package Ideas */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-green-100 text-green-800">FUNDING CELEBRATIONS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Funding Round Package Ideas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                From closing your seed round to announcing Series B, Party On Delivery has alcohol packages designed for every milestone.
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-8">
              {fundingRoundPackages.map((pkg, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className={`h-full relative overflow-hidden border-2 ${pkg.color} ${pkg.popular ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-bold">
                        MOST POPULAR
                      </div>
                    )}
                    <CardHeader className={`${pkg.headerBg} text-white`}>
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      <p className="text-white/80">{pkg.tagline}</p>
                      <p className="text-lg font-bold mt-2">{pkg.price}</p>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3 mb-6">
                        {pkg.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                        <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                          <Gift className="inline h-4 w-4 mr-1" />
                          POD Suggestion: {pkg.podSuggestion}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Launch Party Tips */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Badge className="mb-4 bg-purple-100 text-purple-800">LAUNCH PARTIES</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Product Launch Party Tips
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Launching a new product is a huge milestone. Make your launch party unforgettable with these pro tips from teams who've celebrated on Lake Travis.
                </p>
                
                <div className="space-y-6">
                  {productLaunchTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <tip.icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{tip.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
              
              <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <img 
                  src={sectionImage2} 
                  alt="Product launch party celebration on Lake Travis" 
                  className="rounded-xl shadow-xl w-full"
                />
              </m.div>
            </div>
          </div>
        </section>

        {/* Milestone Event Ideas */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-800">MILESTONE CELEBRATIONS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Milestone Event Ideas & Package Suggestions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Every startup milestone deserves a celebration. Here are Party On Delivery package ideas for your next big win.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestoneEvents.map((event, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <event.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{event.milestone}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        <Wine className="inline h-4 w-4 mr-1 text-purple-500" />
                        {event.suggestion}
                      </p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Party On Delivery Partnership */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <img 
                  src={sectionImage3} 
                  alt="Party On Delivery beverage service" 
                  className="rounded-xl shadow-xl w-full"
                />
              </m.div>
              
              <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Badge className="mb-4 bg-green-100 text-green-800">BEVERAGE PARTNER</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Party On Delivery Partnership
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Focus on celebrating your win - not shopping for drinks. Party On Delivery handles all your beverage needs with startup-friendly packages and convenient dock delivery.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {partyOnDeliveryBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <benefit.icon className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{benefit.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {whyStartupsChooseUs.map((stat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.stat}</div>
                  <div className="text-white/80">{stat.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Everything you need to know about celebrating your startup milestone on Lake Travis
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-purple-800 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Trophy className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Celebrate Your Startup Milestone?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                From seed rounds to acquisitions, we've helped Austin's top startups celebrate on Lake Travis. Your team deserves a celebration that matches your ambition.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/private-cruises">
                  <Button size="lg" className="bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-8 py-6">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Book Your Celebration Cruise
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    Get Custom Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              <p className="mt-8 text-white/70 text-sm">
                Questions? Call us at (512) 879-3996 or email info@premierpartycruises.com
              </p>
            </m.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}
