import { Link } from 'wouter';
import { motion } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import RelatedCelebrationEvents from '@/components/RelatedCelebrationEvents';
import { YouTubeVideoBackground } from '@/components/YouTubeVideoBackground';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import AnimatedPhotoGallery from '@/components/AnimatedPhotoGallery';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatCurrency } from '@shared/formatters';
import { PRICING_DEFAULTS, PACKAGE_FLAT_FEES } from '@shared/constants';
import { cn } from '@/lib/utils';
import { 
  Ship, Users, Star, Calendar, Shield, Award, Music, 
  Waves, Camera, Check, Sparkles, Crown, ArrowRight,
  Phone, MessageSquare, Clock, MapPin, Heart, PartyPopper,
  LucideIcon
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const boatOptions = [
  {
    name: 'Day Tripper',
    capacity: '6-14 guests',
    seating: '14 seats',
    description: 'Perfect for intimate celebrations',
    pricePerPerson: PRICING_DEFAULTS.PRIVATE_PER_PERSON_25,
    image: '/attached_assets/day-tripper-14-person-boat.jpg'
  },
  {
    name: 'Meeseeks / The Irony',
    capacity: '15-30 guests',
    seating: '20 seats comfortably',
    description: 'Ideal for medium groups',
    pricePerPerson: PRICING_DEFAULTS.PRIVATE_PER_PERSON_25,
    image: '/attached_assets/meeseeks-25-person-boat.jpg'
  },
  {
    name: 'Clever Girl',
    capacity: '31-75 guests',
    seating: '30 seats comfortably',
    description: 'Our flagship with 14 disco balls',
    pricePerPerson: PRICING_DEFAULTS.PRIVATE_PER_PERSON_50,
    image: '/attached_assets/clever-girl-50-person-boat.jpg'
  }
];

const packages = [
  {
    id: 'standard',
    name: 'Standard Package',
    flatFee: 0,
    description: 'The boat, the captain, and the lake',
    features: [
      'Licensed, experienced captain',
      'Large empty coolers (BYOB)',
      'Premium Bluetooth sound system',
      'Clean restroom facilities',
      'Sun and shade seating',
      'BYOB friendly (cans/plastic only)'
    ],
    popular: false,
    icon: Ship,
    badge: 'Great Value',
    color: 'blue'
  },
  {
    id: 'essentials',
    name: 'Essentials Package',
    flatFee: PACKAGE_FLAT_FEES.ESSENTIALS,
    description: 'Everything from Standard + Enhanced Convenience',
    features: [
      'Everything from Standard Package',
      'Coolers pre-stocked with ice',
      '5-gallon insulated water dispenser',
      'Solo cups and ice water',
      '6-foot folding table',
      'Alcohol delivery coordination'
    ],
    popular: true,
    icon: Sparkles,
    badge: 'Most Popular',
    color: 'yellow'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Package',
    flatFee: PACKAGE_FLAT_FEES.ULTIMATE,
    description: 'Everything from Essentials + Full Party Atmosphere',
    features: [
      'Everything from Essentials Package',
      'Giant lily pad float',
      'Guest of honor float',
      'Disco ball cups',
      'Bubble guns and wands',
      'SPF-50 spray sunscreen'
    ],
    popular: false,
    icon: Crown,
    badge: 'All-Inclusive VIP',
    color: 'purple'
  }
];

interface EventPageTemplateProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroIcon: LucideIcon;
  videoId?: string;
  localVideo?: string;
  heroImage: string;
  introTitle: string;
  introText: string;
  features: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  breadcrumbItems: Array<{
    label: string;
    href?: string;
  }>;
  accentColor?: 'blue' | 'pink' | 'purple' | 'green' | 'yellow';
  relatedCelebrationEventsSlug?: string;
}

export default function EventPageTemplate({
  title,
  metaTitle,
  metaDescription,
  heroTitle,
  heroSubtitle,
  heroBadge,
  heroIcon: HeroIcon,
  videoId,
  localVideo = '/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4',
  heroImage,
  introTitle,
  introText,
  features,
  faqs,
  breadcrumbItems,
  accentColor = 'blue',
  relatedCelebrationEventsSlug
}: EventPageTemplateProps) {
  const accentColors = {
    blue: 'from-blue-600 to-brand-blue',
    pink: 'from-pink-600 to-purple-600',
    purple: 'from-purple-600 to-indigo-600',
    green: 'from-green-600 to-teal-600',
    yellow: 'from-yellow-500 to-orange-500'
  };

  const badgeColors = {
    blue: 'bg-gradient-to-r from-blue-600 to-brand-blue',
    pink: 'bg-gradient-to-r from-pink-600 to-purple-600',
    purple: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    green: 'bg-gradient-to-r from-green-600 to-teal-600',
    yellow: 'bg-gradient-to-r from-yellow-500 to-orange-500'
  };

  return (
    <>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonical={`https://premierpartycruises.com${window.location.pathname}`}
      />

      <PublicNavigation />

      <main className="min-h-screen bg-white">
        <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
          {videoId ? (
            <YouTubeVideoBackground videoId={videoId} posterImage={heroImage} />
          ) : (
            <div className="absolute inset-0 z-0">
              <video
                className="w-full h-full object-cover opacity-60"
                src={localVideo}
                muted
                loop
                autoPlay
                playsInline
                poster={heroImage}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
            </div>
          )}

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-white text-center flex-grow flex items-center w-full py-12 md:py-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="max-w-5xl mx-auto w-full"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <Badge className={cn("font-sans tracking-wider font-bold uppercase text-sm text-white px-4 sm:px-6 py-2 border-0", badgeColors[accentColor])}>
                  <HeroIcon className="h-4 w-4 mr-2 inline" />
                  {heroBadge}
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight"
              >
                {heroTitle}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
              >
                {heroSubtitle}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className={cn("text-lg px-8 py-6 bg-gradient-to-r text-white hover:opacity-90", accentColors[accentColor])}
                  onClick={() => document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white/20"
                  asChild
                >
                  <a href="tel:512-709-1560">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 512-709-1560
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-4 bg-gray-50">
          <div className="container mx-auto px-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
                {introTitle}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                {introText}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-center text-gray-900 mb-12">
              Why Choose Premier Party Cruises?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 text-center">
                      <div className={cn("w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-r", accentColors[accentColor])}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-center text-gray-900 mb-4">
              Choose Your Perfect Boat
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Private charters starting at ${PRICING_DEFAULTS.PRIVATE_PER_PERSON_25} per person
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {boatOptions.map((boat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={boat.image}
                        alt={boat.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{boat.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-brand-blue" />
                          <span className="font-medium">{boat.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ship className="h-5 w-5 text-brand-blue" />
                          <span>{boat.seating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{boat.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-center text-gray-900 mb-4">
              Cruise Packages & Pricing
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              All packages include 3-hour cruise. Add-on fees shown below.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={cn("h-full relative", pkg.popular && "ring-2 ring-brand-yellow")}>
                    {pkg.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-yellow text-black font-bold">
                        {pkg.badge}
                      </Badge>
                    )}
                    <CardHeader className="text-center pt-8">
                      <div className={cn("w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
                        pkg.color === 'blue' && 'bg-blue-100',
                        pkg.color === 'yellow' && 'bg-yellow-100',
                        pkg.color === 'purple' && 'bg-purple-100'
                      )}>
                        <pkg.icon className={cn("h-8 w-8",
                          pkg.color === 'blue' && 'text-blue-600',
                          pkg.color === 'yellow' && 'text-yellow-600',
                          pkg.color === 'purple' && 'text-purple-600'
                        )} />
                      </div>
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      <p className="text-sm text-gray-500">{pkg.description}</p>
                      {pkg.flatFee > 0 && (
                        <div className="mt-4">
                          <span className="text-3xl font-bold text-gray-900">+{formatCurrency(pkg.flatFee)}</span>
                          <span className="text-gray-500 ml-1">add-on fee</span>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-center text-gray-900 mb-8">
              Party Photos from Lake Travis
            </h2>
            <AnimatedPhotoGallery />
          </div>
        </section>

        <QuoteBuilderSection />

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-white rounded-lg px-6">
                    <AccordionTrigger className="text-left text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className={cn("py-16 bg-gradient-to-r text-white", accentColors[accentColor])}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-6">
              Ready to Book Your {title}?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Over 15 years of experience and a perfect safety record. Let us make your celebration unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:512-709-1560">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {relatedCelebrationEventsSlug && (
        <RelatedCelebrationEvents currentPage={relatedCelebrationEventsSlug} />
      )}

      <Footer />
    </>
  );
}
