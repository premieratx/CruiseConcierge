import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Ship, Users, Clock, DollarSign, Star, Calendar, Phone, Mail, MapPin,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, Anchor, Waves,
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Instagram, Facebook, Twitter, Quote, ChevronRight,
  Navigation, Compass, LifeBuoy, Zap, Target, TrendingUp, Play,
  ExternalLink, BookOpen, Headphones, Car, Wine, Camera as CameraIcon,
  UserCheck, MessageSquare, Ticket, Gift, Disc3, Volume2, 
  MicIcon as Mic, Utensils, GlassWater, Palmtree, Gem,
  Flower, Flower2, FlowerIcon as FlowerDefault, CircleDot, Smile
} from 'lucide-react';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { EmbeddedQuoteBuilder } from '@/components/EmbeddedQuoteBuilder';

// Hero and gallery images 
import heroImage1 from '@assets/image_1757844813165.png';
import heroImage2 from '@assets/image_1757850768476.png';
import heroImage3 from '@assets/image_1757853656553.png';
import galleryImage1 from '@assets/image_1757877906674.png';
import galleryImage2 from '@assets/image_1757884902886.png';
import galleryImage3 from '@assets/image_1757886911506.png';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const heartBeat = {
  hidden: { scale: 1 },
  visible: { 
    scale: [1, 1.1, 1],
    transition: { 
      duration: 1.5, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
};

// ATX Disco Cruise packages for bachelorettes
const bachelorettePackages = [
  {
    id: 'basic_bachelorette',
    name: 'Basic Bride Package',
    price: 85,
    originalPrice: null,
    description: 'Perfect starter package for Austin bachelorette parties',
    features: [
      '4-hour ATX Disco Cruise',
      'Professional DJ with bachelorette vibes',
      'Dancing on Lake Travis',
      'Cash bar with signature cocktails',
      'Perfect Instagram backdrop'
    ],
    popular: false,
    icon: Disc3,
    badge: 'Great Value',
    brideSpecial: false
  },
  {
    id: 'disco_queen',
    name: 'Disco Queen Package',
    price: 95,
    originalPrice: 125,
    description: 'Our signature bachelorette party experience - That Happens to be Our Specialty!',
    features: [
      '4-hour ATX Disco Cruise',
      'Premium DJ with custom bridal playlist',
      '🎉 BRIDE DISCO FOR FREE! 🎉',
      'Bachelorette party decorations',
      'Professional party photography',
      'Champagne toast for the bride',
      'VIP boarding for bridal party'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular',
    brideSpecial: true
  },
  {
    id: 'platinum_bride',
    name: 'Platinum Bride Package',
    price: 110,
    originalPrice: 140,
    description: 'Ultimate Austin bachelorette party luxury experience',
    features: [
      '4-hour ATX Disco Cruise',
      'Premium DJ & dedicated party host',
      '🎉 BRIDE DISCO FOR FREE! 🎉',
      '2 Champagne toasts for the bride',
      'VIP seating area for bridal party',
      'Professional bachelorette photography',
      'Party favors & bridal decorations',
      'Priority bar service',
      'Instagram-worthy lily pad setup'
    ],
    popular: false,
    icon: Trophy,
    badge: 'VIP Experience',
    brideSpecial: true
  }
];

// What's included in the bachelorette experience
const bacheloretteFeatures = [
  {
    icon: Music,
    title: 'Austin\'s Funkiest DJs',
    description: 'Specializing in bachelorette party energy with custom bridal playlists and party hosting expertise.'
  },
  {
    icon: Camera,
    title: 'Professional Photography',
    description: 'Instagram-worthy photos capturing every magical moment of the bride\'s special celebration.'
  },
  {
    icon: Ship,
    title: 'Lake Travis Instagram Paradise',
    description: 'Austin\'s most stunning lake setting providing the perfect backdrop for unforgettable bridal photos.'
  },
  {
    icon: GlassWater,
    title: 'Signature Bachelorette Cocktails',
    description: 'Partner with local providers for premium champagne and signature cocktails delivered to your cruise.'
  },
  {
    icon: Users,
    title: 'Bridal Party Bonding',
    description: 'Perfect atmosphere for the girls to celebrate together in Austin\'s most unique party venue.'
  },
  {
    icon: Shield,
    title: 'Safe & Trusted',
    description: 'Coast Guard certified captains and pristine safety record - parents approve, bride celebrates!'
  }
];

// Bachelorette party testimonials
const bacheloretteTestimonials = [
  {
    id: 1,
    name: 'Emma Rodriguez',
    role: 'Bride',
    location: 'Austin, TX',
    rating: 5,
    text: "OMG this was the BEST bachelorette party ever! Premier Party Cruises really is the specialty for bachelorette parties. The disco cruise was absolutely perfect - dancing on the lake with my girls was magical. The photos turned out incredible!",
    avatar: '👰',
    package: 'Disco Queen Package'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Maid of Honor',
    location: 'Houston, TX',
    rating: 5,
    text: "I planned this for my sister's bachelorette and it exceeded every expectation! The bride disco free deal was amazing, professional photography captured everything, and the DJ knew exactly how to keep the party going. So stress-free to plan!",
    avatar: '🎉',
    package: 'Platinum Bride Package'
  },
  {
    id: 3,
    name: 'Jessica Martinez',
    role: 'Bride',
    location: 'San Antonio, TX',
    rating: 5,
    text: "Premier Party Cruises made my bachelorette party legendary! The ATX Disco Cruise is genius - dancing on Lake Travis with incredible Austin views. All my girls said it was the best bachelorette they've ever been to. Thank you for making it special!",
    avatar: '💃',
    package: 'Basic Bride Package'
  },
  {
    id: 4,
    name: 'Megan Thompson',
    role: 'Maid of Honor',
    location: 'Dallas, TX',
    rating: 5,
    text: "This really is their specialty! From the moment we booked to the last song, everything was perfect for our bachelorette party. The disco theme, professional photos, and Lake Travis setting made for the most Instagram-worthy celebration ever!",
    avatar: '📸',
    package: 'Disco Queen Package'
  }
];

// Group size options for bachelorettes
const bacheloretteGroupSizes = [
  { size: '6-10', label: 'Intimate Bridal Party', description: 'Close friends & sisters only', popular: false },
  { size: '11-18', label: 'Classic Bachelorette', description: 'Perfect Austin bachelorette size', popular: true },
  { size: '19-30', label: 'Big Bridal Celebration', description: 'Extended friend groups', popular: false },
  { size: '31-50', label: 'Epic Bachelorette Bash', description: 'Maximum capacity celebration', popular: false }
];

// Why choose Premier for bachelorettes
const whyChoosePremier = [
  {
    icon: Heart,
    title: 'Bachelorette Party Specialty',
    description: 'This happens to be our specialty! We know exactly what makes Austin bachelorette parties legendary.'
  },
  {
    icon: Music,
    title: 'Bridal Playlist Experts',
    description: 'Our DJs specialize in bachelorette energy with custom bridal playlists and party hosting.'
  },
  {
    icon: Sparkles,
    title: '14+ Years of Bridal Magic',
    description: 'We\'ve created thousands of unforgettable bachelorette moments on Lake Travis.'
  },
  {
    icon: Camera,
    title: 'Instagram-Perfect Setting',
    description: 'Austin\'s most stunning lake views provide the perfect backdrop for your bridal celebration photos.'
  }
];

// Special offers for bachelorettes
const specialOffers = [
  {
    icon: Gift,
    title: 'Bride Disco FREE!',
    description: 'When you book Disco Queen or Platinum packages, the bride cruises for FREE!',
    highlight: true
  },
  {
    icon: Camera,
    title: 'Professional Photography',
    description: 'Capture every magical moment with our on-board professional photographers.',
    highlight: false
  },
  {
    icon: GlassWater,
    title: 'Champagne Toast',
    description: 'Complimentary champagne toast for the bride on premium packages.',
    highlight: false
  },
  {
    icon: Flower2,
    title: 'Bridal Decorations',
    description: 'Beautiful bachelorette party decorations to make your cruise extra special.',
    highlight: false
  }
];

export default function BacheloretteParty() {
  const [, navigate] = useLocation();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    groupSize: '',
    eventDate: '',
    message: '',
    selectedPackage: ''
  });
  const { toast } = useToast();

  const heroImages = [heroImage1, heroImage2, heroImage3];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Update page title and SEO for bachelorette parties
  useEffect(() => {
    document.title = 'Austin Bachelorette Party Cruises - That Happens to be Our Specialty! | Premier Party Cruises';
    
    // Add meta description
    const existingDesc = document.querySelector('meta[name="description"]');
    if (existingDesc) {
      existingDesc.setAttribute('content', 'Austin\'s premier bachelorette party cruise experience! ATX Disco Cruise with bride disco FREE, professional photography, and Lake Travis dancing. That happens to be our specialty!');
    } else {
      const metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = 'Austin\'s premier bachelorette party cruise experience! ATX Disco Cruise with bride disco FREE, professional photography, and Lake Travis dancing. That happens to be our specialty!';
      document.head.appendChild(metaDesc);
    }
  }, []);

  const handleBookNow = (packageId?: string) => {
    // Navigate to calendar with disco cruise filter
    const params = new URLSearchParams();
    if (packageId) {
      params.set('package', packageId);
    }
    params.set('type', 'disco');
    params.set('event', 'bachelorette');
    params.set('specialty', 'true');
    navigate(`/calendar?${params.toString()}`);
  };

  const handleGetQuote = () => {
    navigate('/quotes/new?event=bachelorette');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and phone are required to plan your bachelorette party.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Here you would normally send to your API
      console.log('Bachelorette contact form submitted:', contactForm);
      
      toast({
        title: "Thanks for choosing Premier Party Cruises!",
        description: "We'll get back to you within 24 hours with bachelorette party details.",
        variant: "default"
      });

      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        groupSize: '',
        eventDate: '',
        message: '',
        selectedPackage: ''
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly at (512) 488-5892",
        variant: "destructive"
      });
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-brand-black">
      <SEOHead
        pageRoute="/bachelorette-party"
        defaultTitle="Austin Bachelorette Party Boat Cruises | Lake Travis | Premier Party Cruises"
        defaultDescription="Perfect Austin bachelorette party on Lake Travis! Disco cruises with DJ, dancing, drinks, and incredible views. Bride rides free on weekends!"
        defaultKeywords={['Austin bachelorette party', 'Lake Travis bachelorette', 'bachelorette party boat', 'disco cruise Austin', 'bachelorette party ideas Austin', 'Austin party boat rental']}
        schemaType="event"
      />
      <PublicNavigation />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img 
                src={heroImages[currentHeroImage]} 
                alt="Austin Bachelorette Party Cruise"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-6"
          >
            <Badge className="bg-brand-yellow text-brand-black mb-4 px-6 py-2 text-lg font-bold tracking-widest">
              <motion.div
                variants={heartBeat}
                animate="visible"
                className="flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                THAT HAPPENS TO BE OUR SPECIALTY!
              </motion.div>
            </Badge>
          </motion.div>

          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-8xl font-heading font-bold mb-6 tracking-widest"
            data-testid="heading-hero"
          >
            AUSTIN'S PREMIER
            <br />
            <span className="text-brand-yellow">BACHELORETTE</span>
            <br />
            PARTY CRUISE
          </motion.h1>

          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
            data-testid="text-hero-description"
          >
            Dance on Lake Travis with your girls! ATX Disco Cruise specializing in bachelorette parties with professional DJs, photography, and the bride cruises FREE on premium packages.
          </motion.p>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="btn-primary text-xl px-12 py-6"
              onClick={() => handleBookNow()}
              data-testid="button-book-bachelorette"
            >
              BOOK YOUR BACHELORETTE PARTY
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-outline text-xl px-12 py-6 border-white text-white hover:bg-white hover:text-brand-black"
              onClick={handleGetQuote}
              data-testid="button-get-quote"
            >
              GET CUSTOM QUOTE
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-8 flex items-center justify-center gap-8 text-lg"
          >
            <div className="flex items-center gap-2" data-testid="stat-years">
              <Trophy className="w-6 h-6 text-brand-yellow" />
              <span>14+ Years Bachelorette Specialty</span>
            </div>
            <div className="flex items-center gap-2" data-testid="stat-rating">
              <Star className="w-6 h-6 text-brand-yellow" />
              <span>5-Star Reviews</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
          onClick={() => scrollToSection('specialty')}
          data-testid="button-scroll-down"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2 tracking-widest">DISCOVER OUR SPECIALTY</span>
            <ChevronRight className="w-6 h-6 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Embedded Quote Builder */}
      <section className="py-16 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <EmbeddedQuoteBuilder pageContext="bachelorette" className="mb-8" />
        </div>
      </section>

      {/* Our Specialty Section */}
      <section id="specialty" className="py-24 bg-brand-yellow">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-brand-black tracking-widest"
              data-testid="heading-specialty"
            >
              THAT HAPPENS TO BE
              <br />
              <span className="text-brand-blue">OUR SPECIALTY!</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl text-brand-black max-w-4xl mx-auto leading-relaxed"
              data-testid="text-specialty-description"
            >
              For over 14 years, we've perfected the art of Austin bachelorette parties. From the ATX Disco Cruise experience to professional photography, we know exactly what makes your celebration legendary.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whyChoosePremier.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="h-full bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" data-testid={`card-specialty-${index}`}>
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-4 text-brand-black tracking-widest" data-testid={`heading-feature-${index}`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed" data-testid={`text-feature-${index}`}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ATX Disco Cruise Showcase */}
      <section className="py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-brand-black dark:text-brand-white tracking-widest"
              data-testid="heading-disco-cruise"
            >
              ATX DISCO CRUISE
              <br />
              <span className="text-brand-blue">BACHELORETTE EXPERIENCE</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              data-testid="text-disco-description"
            >
              Dance the night away with your bridal party on Lake Travis! Our signature ATX Disco Cruise combines Austin's funkiest DJs, professional photography, and stunning lake views for the ultimate bachelorette celebration.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {bacheloretteFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="h-full bg-white dark:bg-brand-gray-800 border-brand-gray-200 dark:border-brand-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid={`card-feature-${index}`}>
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mb-6">
                        <IconComponent className="w-8 h-8 text-brand-black" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-4 text-brand-black dark:text-brand-white tracking-widest" data-testid={`heading-feature-${index}`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed" data-testid={`text-feature-${index}`}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-24 bg-brand-blue">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-white tracking-widest"
              data-testid="heading-special-offers"
            >
              SPECIAL BRIDAL
              <br />
              <span className="text-brand-yellow">OFFERS</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {specialOffers.map((offer, index) => {
              const IconComponent = offer.icon;
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={cn(
                    "h-full border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
                    offer.highlight ? "bg-brand-yellow" : "bg-white"
                  )} data-testid={`card-offer-${index}`}>
                    <CardContent className="p-8 text-center">
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6",
                        offer.highlight ? "bg-brand-black" : "bg-brand-blue"
                      )}>
                        <IconComponent className={cn(
                          "w-8 h-8",
                          offer.highlight ? "text-brand-yellow" : "text-white"
                        )} />
                      </div>
                      <h3 className={cn(
                        "text-2xl font-heading font-bold mb-4 tracking-widest",
                        offer.highlight ? "text-brand-black" : "text-brand-black"
                      )} data-testid={`heading-offer-${index}`}>
                        {offer.title}
                      </h3>
                      <p className={cn(
                        "leading-relaxed",
                        offer.highlight ? "text-brand-black" : "text-gray-600"
                      )} data-testid={`text-offer-${index}`}>
                        {offer.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Bachelorette Packages */}
      <section className="py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-brand-black dark:text-brand-white tracking-widest"
              data-testid="heading-packages"
            >
              BACHELORETTE
              <br />
              <span className="text-brand-blue">PARTY PACKAGES</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              data-testid="text-packages-description"
            >
              Choose from our specially curated bachelorette packages, each designed to make your Austin celebration unforgettable. Premium packages include bride disco FREE!
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid lg:grid-cols-3 gap-8"
          >
            {bachelorettePackages.map((pkg, index) => {
              const IconComponent = pkg.icon;
              return (
                <motion.div key={pkg.id} variants={scaleIn}>
                  <Card className={cn(
                    "h-full relative overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2",
                    pkg.popular ? "border-brand-yellow bg-gradient-to-b from-brand-yellow/10 to-white dark:to-brand-black scale-105" : "border-brand-gray-200 dark:border-brand-gray-700 bg-white dark:bg-brand-gray-800"
                  )} data-testid={`card-package-${pkg.id}`}>
                    {pkg.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-brand-yellow text-brand-black text-center py-2 font-bold tracking-widest">
                        {pkg.badge}
                      </div>
                    )}
                    {!pkg.popular && pkg.badge && (
                      <Badge className="absolute top-4 right-4 bg-brand-blue text-white" data-testid={`badge-${pkg.id}`}>
                        {pkg.badge}
                      </Badge>
                    )}

                    <CardContent className={cn("p-8", pkg.popular && "pt-16")}>
                      <div className="text-center mb-8">
                        <div className={cn(
                          "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
                          pkg.popular ? "bg-brand-yellow" : "bg-brand-blue"
                        )}>
                          <IconComponent className={cn(
                            "w-10 h-10",
                            pkg.popular ? "text-brand-black" : "text-white"
                          )} />
                        </div>

                        <h3 className="text-3xl font-heading font-bold mb-2 text-brand-black dark:text-brand-white tracking-widest" data-testid={`heading-package-${pkg.id}`}>
                          {pkg.name}
                        </h3>
                        
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className="text-4xl font-heading font-bold text-brand-blue" data-testid={`price-${pkg.id}`}>
                            ${pkg.price}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-2xl text-gray-500 line-through" data-testid={`original-price-${pkg.id}`}>
                              ${pkg.originalPrice}
                            </span>
                          )}
                          <span className="text-gray-600 dark:text-gray-400">/person</span>
                        </div>

                        {pkg.brideSpecial && (
                          <Badge className="bg-brand-yellow text-brand-black mb-4 px-4 py-2 font-bold" data-testid={`special-${pkg.id}`}>
                            <Heart className="w-4 h-4 mr-2" />
                            BRIDE DISCO FREE!
                          </Badge>
                        )}

                        <p className="text-gray-600 dark:text-gray-300 mb-6" data-testid={`description-${pkg.id}`}>
                          {pkg.description}
                        </p>
                      </div>

                      <div className="space-y-4 mb-8">
                        {pkg.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3" data-testid={`feature-${pkg.id}-${featureIndex}`}>
                            <CheckCircle className="w-6 h-6 text-brand-blue mt-0.5 flex-shrink-0" />
                            <span className={cn(
                              "text-gray-700 dark:text-gray-300",
                              feature.includes('BRIDE DISCO FOR FREE') && "font-bold text-brand-blue"
                            )}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button 
                        className={cn(
                          "w-full text-lg font-bold tracking-widest py-6",
                          pkg.popular ? "btn-primary" : "btn-outline"
                        )}
                        onClick={() => handleBookNow(pkg.id)}
                        data-testid={`button-book-${pkg.id}`}
                      >
                        BOOK {pkg.name.toUpperCase()}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Need a custom package for your bridal party? We specialize in creating perfect bachelorette experiences!
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-outline text-xl px-12 py-6"
              onClick={handleGetQuote}
              data-testid="button-custom-quote"
            >
              GET CUSTOM BACHELORETTE QUOTE
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Group Size Options */}
      <section className="py-24 bg-brand-gray-50 dark:bg-brand-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-heading font-bold mb-6 text-brand-black dark:text-brand-white tracking-widest"
              data-testid="heading-group-sizes"
            >
              PERFECT FOR ANY
              <br />
              <span className="text-brand-blue">BRIDAL PARTY SIZE</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {bacheloretteGroupSizes.map((group, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className={cn(
                  "h-full bg-white dark:bg-brand-gray-800 border-brand-gray-200 dark:border-brand-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                  group.popular && "border-brand-yellow"
                )} data-testid={`card-group-${index}`}>
                  <CardContent className="p-8 text-center">
                    {group.popular && (
                      <Badge className="bg-brand-yellow text-brand-black mb-4" data-testid={`badge-popular-${index}`}>
                        Most Popular
                      </Badge>
                    )}
                    <h3 className="text-3xl font-heading font-bold mb-2 text-brand-blue tracking-widest" data-testid={`heading-group-${index}`}>
                      {group.size}
                    </h3>
                    <h4 className="text-xl font-bold mb-4 text-brand-black dark:text-brand-white tracking-wide" data-testid={`label-group-${index}`}>
                      {group.label}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300" data-testid={`description-group-${index}`}>
                      {group.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-heading font-bold mb-6 text-brand-black dark:text-brand-white tracking-widest"
              data-testid="heading-testimonials"
            >
              WHAT BRIDES
              <br />
              <span className="text-brand-blue">ARE SAYING</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 gap-8"
          >
            {bacheloretteTestimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} variants={scaleIn}>
                <Card className="h-full bg-white dark:bg-brand-gray-800 border-brand-gray-200 dark:border-brand-gray-700 hover:shadow-xl transition-all duration-300" data-testid={`card-testimonial-${testimonial.id}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center text-2xl">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-brand-black dark:text-brand-white" data-testid={`name-${testimonial.id}`}>
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300" data-testid={`role-${testimonial.id}`}>
                          {testimonial.role} • {testimonial.location}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Quote className="w-8 h-8 text-brand-blue mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed" data-testid={`text-${testimonial.id}`}>
                      {testimonial.text}
                    </p>
                    <Badge variant="outline" className="border-brand-blue text-brand-blue" data-testid={`package-${testimonial.id}`}>
                      {testimonial.package}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-brand-yellow">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-heading font-bold mb-6 text-brand-black tracking-widest"
              data-testid="heading-contact"
            >
              PLAN YOUR PERFECT
              <br />
              <span className="text-brand-blue">BACHELORETTE PARTY</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-brand-black max-w-2xl mx-auto leading-relaxed"
              data-testid="text-contact-description"
            >
              Ready to create an unforgettable Austin bachelorette experience? Let's plan the perfect disco cruise celebration for your bridal party!
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="bg-white shadow-xl border-none">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-brand-black font-bold">
                        Name (Bride or MOH) *
                      </Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Enter your name"
                        className="mt-2"
                        data-testid="input-name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-brand-black font-bold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        placeholder="Enter your email"
                        className="mt-2"
                        data-testid="input-email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-brand-black font-bold">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        placeholder="(512) 488-5892"
                        className="mt-2"
                        data-testid="input-phone"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="groupSize" className="text-brand-black font-bold">
                        Bridal Party Size
                      </Label>
                      <Input
                        id="groupSize"
                        value={contactForm.groupSize}
                        onChange={(e) => setContactForm({...contactForm, groupSize: e.target.value})}
                        placeholder="e.g., 12 people"
                        className="mt-2"
                        data-testid="input-group-size"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="eventDate" className="text-brand-black font-bold">
                      Preferred Party Date
                    </Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={contactForm.eventDate}
                      onChange={(e) => setContactForm({...contactForm, eventDate: e.target.value})}
                      className="mt-2"
                      data-testid="input-event-date"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-brand-black font-bold">
                      Tell us about your bachelorette party vision
                    </Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Tell us about the bride, your party vibe, special requests, or any questions about our bachelorette specialty services..."
                      rows={4}
                      className="mt-2"
                      data-testid="textarea-message"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full btn-primary text-xl py-6"
                    data-testid="button-submit-contact"
                  >
                    PLAN MY BACHELORETTE PARTY
                    <Heart className="w-6 h-6 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-brand-black">
              <div className="flex items-center gap-2" data-testid="contact-phone">
                <Phone className="w-6 h-6" />
                <span className="text-lg font-bold">(512) 488-5892</span>
              </div>
              <div className="flex items-center gap-2" data-testid="contact-email">
                <Mail className="w-6 h-6" />
                <span className="text-lg font-bold">clientservices@premierpartycruises.com</span>
              </div>
            </div>
            <p className="mt-4 text-brand-black">
              Call or text us directly for immediate bachelorette party planning assistance!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-white tracking-widest"
              data-testid="heading-final-cta"
            >
              MAKE HER
              <br />
              <span className="text-brand-yellow">BACHELORETTE LEGENDARY</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              data-testid="text-final-cta"
            >
              Join thousands of brides who chose Premier Party Cruises for their Austin bachelorette party. Experience our specialty and create memories that will last a lifetime on Lake Travis.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button 
                size="lg" 
                className="btn-primary text-2xl px-16 py-8"
                onClick={() => handleBookNow()}
                data-testid="button-final-book"
              >
                BOOK YOUR BACHELORETTE CRUISE
                <ArrowRight className="w-8 h-8 ml-3" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}