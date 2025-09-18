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
  UserCheck, MessageSquare, X, Eye, Image
} from 'lucide-react';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { EmbeddedQuoteBuilder } from '@/components/EmbeddedQuoteBuilder';

// Hero and gallery images - Real photos from live website
import heroImage1 from '@assets/bachelor-party-group-guys.jpg';
import heroImage2 from '@assets/atx-disco-cruise-party.jpg';
import heroImage3 from '@assets/dancing-party-scene.jpg';
import galleryImage1 from '@assets/day-tripper-14-person-boat.jpg';
import galleryImage2 from '@assets/meeseeks-25-person-boat.jpg';
import galleryImage3 from '@assets/clever-girl-50-person-boat.jpg';

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

// Content data
const services = [
  {
    id: 'private',
    title: 'Private Charters',
    subtitle: 'Exclusive boat rental',
    description: 'Choose from our fleet of premium party boats: "Day Tripper" (14 people), "The Irony" & "Meeseeks" (25 people), or flagship "Clever Girl" (50 people) with giant Texas flag and 14 disco balls.',
    features: ['"Day Tripper", "The Irony", "Meeseeks", "Clever Girl" boats', 'Licensed captains & crew', 'Premium bluetooth sound systems', 'Large coolers with ice', 'Lily pads & floaties available'],
    startingPrice: '$499',
    icon: Ship,
    image: galleryImage1,
    popular: true,
    gallery: [galleryImage1, galleryImage2, galleryImage3, heroImage1],
    detailedDescription: 'Experience the ultimate private charter on Lake Travis with our premium fleet of party boats. Whether you choose the intimate "Day Tripper" for 14 guests, the popular "The Irony" or "Meeseeks" for 25 people, or our flagship "Clever Girl" for up to 50 guests, every cruise includes professional captains, premium sound systems, and all the amenities for an unforgettable celebration.',
    highlights: ['4 Premium Boats Available', '14-50 Person Capacity Options', 'Professional Licensed Captains', 'Premium Sound Systems', 'Coolers & Ice Included', 'Lily Pads & Floaties', '3-4 Hour Cruise Options']
  },
  {
    id: 'disco',
    title: 'ATX Disco Cruises',
    subtitle: 'Friday & Saturday party cruises',
    description: 'Austin\'s signature floating dance party every weekend! Friday 12pm-4pm, Saturday 11am-3pm & 3:30pm-7:30pm. DJ, photographer, bubbles, and epic Lake Travis vibes.',
    features: ['Professional DJ & photographer included', 'Coolers, ice, and party setup', 'Giant unicorn floats & lily pads', 'Bubbles, koozies, and party favors', 'Friday & Saturday schedules'],
    startingPrice: '$85',
    icon: Music,
    image: galleryImage2,
    badge: 'Most Popular',
    gallery: [galleryImage2, heroImage2, heroImage3, galleryImage3],
    detailedDescription: 'Join Austin\'s most epic floating dance party every Friday and Saturday! Our ATX Disco Cruises feature live DJs, professional photographers, giant unicorn floats, and the wildest party atmosphere on Lake Travis. With multiple time slots and our signature "Clever Girl" boat with 14 disco balls, this is THE party cruise experience.',
    highlights: ['Professional DJ & Live Music', 'On-Board Photographer', 'Giant Unicorn Floats', 'Bubbles & Party Favors', 'Koozies & Party Setup', 'Friday & Saturday Only', '$85 Per Person Tickets']
  },
  {
    id: 'bachelor',
    title: 'Bachelorette Parties',
    subtitle: 'Our specialty since 2009',
    description: 'Austin\'s premier bachelorette party experience! Join the ATX Disco Cruise or book a private charter. Professional DJ, photographer, and everything needed for an unforgettable celebration.',
    features: ['Basic Bach, Disco Queen, or Platinum packages', 'Professional DJ & photographer', 'Party favors & decorations', 'Priority booking & VIP treatment'],
    startingPrice: '$85',
    icon: PartyPopper,
    image: galleryImage3,
    badge: 'Our Specialty',
    specialPage: '/bachelor-party',
    gallery: [galleryImage3, heroImage1, galleryImage2, heroImage2],
    detailedDescription: 'We\'ve been Austin\'s #1 bachelorette party destination since 2009! Choose from our signature ATX Disco Cruise packages (Basic Bach, Disco Queen, or Platinum) or book a private charter. Every bachelorette experience includes professional DJ, photographer, party favors, and VIP treatment to make the bride\'s celebration absolutely perfect.',
    highlights: ['Austin\'s #1 Since 2009', 'Basic Bach, Disco Queen & Platinum', 'Professional DJ & Photographer', 'Party Favors & Decorations', 'VIP Treatment for Bride', 'ATX Disco or Private Options', 'Priority Booking Available']
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    subtitle: 'Team building on water',
    description: 'Premium corporate experiences on Lake Travis. Our largest boats perfect for team building, client entertainment, and company celebrations with professional service.',
    features: ['"Clever Girl" flagship boat available', 'Professional atmosphere & service', 'Customizable catering options', 'Team building activities', 'Transportation partnerships'],
    startingPrice: '$549',
    icon: Users,
    image: galleryImage1,
    gallery: [galleryImage1, galleryImage3, heroImage1, galleryImage2],
    detailedDescription: 'Elevate your corporate events with premium Lake Travis experiences aboard our flagship boats. Perfect for team building, client entertainment, company celebrations, and executive retreats. Our professional crew ensures a sophisticated atmosphere while our spacious boats provide the perfect setting for business networking and team bonding.',
    highlights: ['Flagship "Clever Girl" Available', 'Professional Business Atmosphere', 'Team Building Activities', 'Customizable Catering Options', 'Transportation Partnerships', 'Client Entertainment Perfect', 'Executive Retreat Setting']
  }
];

const whyChooseUs = [
  {
    icon: Trophy,
    title: '15+ Years Experience',
    description: 'Austin\'s longest-running party cruise company since 2009 with unmatched expertise on Lake Travis.'
  },
  {
    icon: UserCheck,
    title: '100,000+ Happy Customers',
    description: 'We\'ve created unforgettable memories for over 100,000 guests with 5-star service since 2009.'
  },
  {
    icon: Shield,
    title: 'Perfect Safety Record',
    description: 'Coast Guard certified captains and pristine safety record ensure your peace of mind.'
  },
  {
    icon: Star,
    title: 'Premier Fleet',
    description: 'Four awesome boats: "Day Tripper", "The Irony", "Meeseeks", and flagship "Clever Girl" - Austin\'s nicest party boats.'
  },
  {
    icon: Headphones,
    title: 'DJ & Photography',
    description: 'Professional DJ services and on-board photography to capture every moment.'
  },
  {
    icon: Wine,
    title: 'Party On Delivery',
    description: 'Direct-to-boat alcohol delivery through our sister company Party On Delivery! Order online, they deliver 50 feet from your boat.'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    role: 'ATX Disco Cruise Bachelorette',
    rating: 5,
    text: "The ATX Disco Cruise was absolutely perfect for my bachelorette party! The DJ was incredible, photographer captured amazing moments, and the Clever Girl boat with those 14 disco balls was unreal!",
    avatar: '👰'
  },
  {
    id: 2,
    name: 'Mike R.',
    role: 'Corporate Private Charter',
    rating: 5,
    text: "Booked the Clever Girl for our company event - 50 people, perfect service. The giant Texas flag deck and professional crew made it unforgettable. Party On Delivery made it seamless!",
    avatar: '💼'
  },
  {
    id: 3,
    name: 'Jessica & Chris',
    role: '25-Person Private Cruise',
    rating: 5,
    text: "The Irony was perfect for our celebration! Anderson Mill Marina was convenient, crew was professional, and 4 hours on Lake Travis was magical. Best decision ever!",
    avatar: '💕'
  }
];

const stats = [
  { value: '15+', label: 'Years Experience', icon: Trophy },
  { value: '100K+', label: 'Happy Customers', icon: Heart },
  { value: 'Perfect', label: 'Safety Record', icon: Shield },
  { value: '5-Star', label: 'Customer Reviews', icon: Star }
];

export default function Home() {
  const [, navigate] = useLocation();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    groupSize: '',
    eventDate: '',
    message: ''
  });
  const { toast } = useToast();

  const heroImages = [heroImage1, heroImage2, heroImage3];
  const galleryImages = [galleryImage1, galleryImage2, galleryImage3, heroImage1, heroImage2, heroImage3];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Update page title for SEO
  useEffect(() => {
    document.title = 'Premier Party Cruises - Austin Lake Travis Boat Rentals Since 2009';
    
    // Add meta description
    const existingDesc = document.querySelector('meta[name="description"]');
    if (existingDesc) {
      existingDesc.setAttribute('content', 'Austin\'s premier party cruise company since 2009 offering ATX Disco Cruises and private boat charters on Lake Travis. 100,000+ happy customers, 4 awesome boats. Book today!');
    } else {
      const metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = 'Austin\'s premier party cruise company since 2009 offering ATX Disco Cruises and private boat charters on Lake Travis. 100,000+ happy customers, 4 awesome boats. Book today!';
      document.head.appendChild(metaDesc);
    }
  }, []);

  const handleBookNow = (packageType?: string, eventType?: string) => {
    if (packageType && eventType) {
      navigate(`/chat?package=${packageType}&type=${eventType}`);
    } else {
      navigate('/chat?type=general');
    }
  };

  const handleGetQuote = (packageType?: string, eventType?: string) => {
    if (packageType && eventType) {
      navigate(`/chat?package=${packageType}&type=${eventType}`);
    } else {
      navigate('/chat?type=general');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and phone are required to get started.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Here you would normally send to your API
      console.log('Contact form submitted:', contactForm);
      
      toast({
        title: "Thank you for your inquiry!",
        description: "We'll get back to you within 24 hours with a custom quote.",
        variant: "default"
      });

      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        groupSize: '',
        eventDate: '',
        message: ''
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

  // Handle opening lightbox for service
  const handleOpenLightbox = (service: typeof services[0]) => {
    setSelectedService(service);
    setShowLightbox(true);
  };

  // Handle lightbox book now
  const handleLightboxBookNow = () => {
    if (!selectedService) return;
    
    setShowLightbox(false);
    
    // Handle specific service booking - FIXED: Route to public calendar (/book) instead of admin (/calendar)
    switch(selectedService.id) {
      case 'private':
        navigate('/book?eventType=private&groupSize=25');
        break;
      case 'disco':
        navigate('/book?eventType=disco&groupSize=20');
        break;
      case 'bachelor':
        if (selectedService.specialPage) {
          navigate(selectedService.specialPage);
        } else {
          navigate('/book?eventType=disco&groupSize=15');
        }
        break;
      case 'corporate':
        navigate('/book?eventType=private&groupSize=30');
        break;
      default:
        navigate('/chat?type=general');
    }
    
    toast({
      title: "Redirecting to Booking Calendar",
      description: `Let's book your ${selectedService.title.toLowerCase()}!`,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead
        pageRoute="/"
        defaultTitle="Premier Party Cruises - Austin Lake Travis Boat Rentals"
        defaultDescription="Austin's premier boat rental and party cruise experience on Lake Travis. Private charters, disco cruises, bachelor parties, and corporate events."
        defaultKeywords={['Austin boat rental', 'Lake Travis cruises', 'party boat Austin', 'bachelor party boat', 'private charter', 'Austin party cruises', 'boat rental Austin']}
        schemaType="organization"
      />
      <PublicNavigation />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with rotating images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <img 
                src={heroImages[currentHeroImage]}
                alt="Premier Party Cruises - Lake Travis Austin"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Logo */}
            <motion.div variants={fadeInUp} className="mb-8">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-20 md:h-24 mx-auto mb-6"
                data-testid="img-hero-logo"
              />
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={fadeInUp} className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight tracking-wider">
                AUSTIN'S PREMIER
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-brand-yellow mb-6 leading-tight tracking-wider">
                PARTY CRUISE EXPERIENCE
              </h2>
            </motion.div>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Experience Austin's ultimate Lake Travis adventure with the most trusted party cruise company since 2009. 
              From intimate 14-person cruises on "Day Tripper" to epic 50-person parties on flagship "Clever Girl" - we create unforgettable memories.
            </motion.p>

            {/* Key Features */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <MapPin className="h-6 w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-semibold text-lg">Anderson Mill Marina</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Users className="h-6 w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-semibold text-lg">4 Awesome Boats</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Clock className="h-6 w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-semibold text-lg">ATX Disco Fri/Sat</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => handleBookNow()}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                data-testid="button-hero-book-now"
              >
                <Calendar className="mr-3 h-6 w-6" />
                BOOK YOUR CRUISE
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleGetQuote()}
                className="border-3 border-white text-white hover:bg-white hover:text-black font-bold text-xl px-12 py-6 rounded-2xl backdrop-blur-sm tracking-wide bg-[#07c0ff]"
                data-testid="button-hero-get-quote"
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                GET FREE QUOTE
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="flex flex-col items-center cursor-pointer" onClick={() => scrollToSection('services')}>
            <span className="text-sm mb-3 font-medium tracking-wide">DISCOVER MORE</span>
            <motion.div 
              className="w-6 h-12 border-2 border-white rounded-full flex justify-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-1 h-4 bg-white rounded-full mt-2" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Embedded Quote Builder */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <EmbeddedQuoteBuilder pageContext="home" className="mb-8" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider">
                CHOOSE YOUR
              </h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-brand-blue tracking-wider">
                PERFECT EXPERIENCE
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From intimate celebrations to epic disco parties, we have the perfect cruise experience 
                for every group size and occasion.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scaleIn}
                transition={{ delay: index * 0.2 }}
                className={cn(
                  "group relative",
                  service.popular && "lg:scale-105"
                )}
              >
                <Card className={cn(
                  "h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden border-2",
                  service.popular 
                    ? "border-brand-blue shadow-xl" 
                    : "border-gray-200 dark:border-gray-700 hover:border-brand-blue/50"
                )}>
                  {service.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-brand-blue text-white px-6 py-2 text-sm font-bold rounded-full shadow-lg">
                        {service.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Service Image with Lightbox Trigger */}
                  <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => handleOpenLightbox(service)}>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/60" />
                    <service.icon className="absolute bottom-4 right-4 h-8 w-8 text-white" />
                    {/* View Gallery Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    {/* Gallery Indicator */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Image className="h-4 w-4 inline mr-1" />
                      View Gallery
                    </div>
                  </div>
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold mb-2 tracking-wide">{service.title}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-brand-blue">
                      {service.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-4">
                      <div className="text-sm text-gray-500 mb-2">Starting from</div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {service.startingPrice}
                      </div>
                      
                      <Button 
                        className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3 rounded-xl tracking-wide"
                        onClick={() => {
                          if (service.specialPage) {
                            navigate(service.specialPage);
                          } else {
                            // Handle specific service booking with package context
                            switch(service.id) {
                              case 'private':
                                handleBookNow('private-cruise', 'general');
                                break;
                              case 'disco':
                                handleBookNow('disco-cruise', 'general');
                                break;
                              case 'corporate':
                                handleBookNow('private-cruise', 'corporate');
                                break;
                              default:
                                handleGetQuote();
                            }
                          }
                        }}
                        data-testid={`button-service-${service.id}`}
                      >
                        {service.specialPage ? 'LEARN MORE' : service.id === 'private' ? 'BOOK PRIVATE CRUISE' : service.id === 'disco' ? 'BOOK DISCO CRUISE' : 'GET QUOTE'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CRITICAL: Lightbox Photo Gallery for Experience Cards */}
      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <selectedService.icon className="w-8 h-8 text-brand-blue" />
                  {selectedService.title}
                  {selectedService.badge && (
                    <Badge className="bg-brand-blue text-white px-3 py-1">
                      {selectedService.badge}
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-600 dark:text-gray-300">
                  {selectedService.subtitle}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Photo Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedService.gallery?.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => {
                        setSelectedImageIndex(index);
                        // You could expand this to show full-size image viewer
                      }}
                      data-testid={`img-gallery-${selectedService.id}-${index}`}
                    >
                      <img
                        src={image}
                        alt={`${selectedService.title} gallery ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Full
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Detailed Description */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Experience Details
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {selectedService.detailedDescription}
                  </p>
                </div>

                {/* Highlights Grid */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedService.highlights?.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Booking Section */}
                <div className="border-t pt-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Starting from</div>
                      <div className="text-4xl font-bold text-gray-900 dark:text-white">
                        {selectedService.startingPrice}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {selectedService.id === 'disco' ? 'per person' : 'per charter'}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => setShowLightbox(false)}
                        className="px-6 py-3"
                        data-testid={`button-lightbox-close-${selectedService.id}`}
                      >
                        Continue Browsing
                      </Button>
                      
                      <Button 
                        onClick={handleLightboxBookNow}
                        className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3 text-lg font-bold"
                        data-testid={`button-lightbox-book-${selectedService.id}`}
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        {selectedService.specialPage ? 'Learn More' : 'Book Now'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  🔒 Secure booking • Instant confirmation • Full refund protection
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider">
                WHY CHOOSE
              </h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-brand-yellow tracking-wider">
                PREMIER PARTY CRUISES
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Austin's most trusted party cruise company with unmatched experience, safety, and service.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-brand-blue to-brand-blue/80 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="mt-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={scaleIn}
                  className="text-center group"
                  data-testid={`stat-${index}`}
                >
                  <div className="bg-brand-yellow/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-yellow/20 transition-colors duration-300">
                    <stat.icon className="h-8 w-8 text-brand-blue" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider">
                EXPERIENCE THE
              </h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-brand-blue tracking-wider">
                PREMIER DIFFERENCE
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                See why 125,000+ customers choose Premier Party Cruises for their unforgettable Lake Travis experience.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scaleIn}
                transition={{ delay: index * 0.1 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-square"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img 
                  src={image}
                  alt={`Premier Party Cruises Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-blue/90 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-wider">
                WHAT OUR
              </h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-brand-yellow tracking-wider">
                CUSTOMERS SAY
              </h3>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Don't just take our word for it - see what makes us Austin's most trusted party cruise company.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-4">{testimonial.avatar}</div>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-brand-yellow fill-current" />
                      ))}
                    </div>
                    <CardTitle className="text-lg font-bold">{testimonial.name}</CardTitle>
                    <CardDescription className="text-blue-200 font-medium">
                      {testimonial.role}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Quote className="h-6 w-6 text-brand-yellow mb-4 mx-auto" />
                    <p className="text-white/90 leading-relaxed italic text-center">
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & CTA Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider">
                READY TO
              </h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-brand-yellow tracking-wider">
                SET SAIL?
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                Contact us today for a free quote and let's start planning your unforgettable Lake Travis adventure.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center mb-4 tracking-wide">
                    Get Your Free Quote
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-semibold tracking-wide">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold tracking-wide">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-sm font-semibold tracking-wide">
                          Phone *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-phone"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventType" className="text-sm font-semibold tracking-wide">
                          Event Type
                        </Label>
                        <Input
                          id="eventType"
                          type="text"
                          placeholder="Birthday, Bachelor/ette, Corporate..."
                          value={contactForm.eventType}
                          onChange={(e) => setContactForm(prev => ({ ...prev, eventType: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-event-type"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="groupSize" className="text-sm font-semibold tracking-wide">
                          Group Size
                        </Label>
                        <Input
                          id="groupSize"
                          type="text"
                          placeholder="e.g., 20 people"
                          value={contactForm.groupSize}
                          onChange={(e) => setContactForm(prev => ({ ...prev, groupSize: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-group-size"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventDate" className="text-sm font-semibold tracking-wide">
                          Event Date
                        </Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={contactForm.eventDate}
                          onChange={(e) => setContactForm(prev => ({ ...prev, eventDate: e.target.value }))}
                          className="mt-1 rounded-xl"
                          data-testid="input-contact-event-date"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-sm font-semibold tracking-wide">
                        Additional Details
                      </Label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your event, special requests, or any questions..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="mt-1 rounded-xl resize-none"
                        data-testid="textarea-contact-message"
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 text-lg rounded-xl tracking-wide"
                      data-testid="button-contact-submit"
                    >
                      <Mail className="mr-3 h-5 w-5" />
                      GET FREE QUOTE
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Quick Actions */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="space-y-8"
            >
              {/* Quick Book Button */}
              <Card className="border-2 border-brand-yellow bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4 tracking-wide">Book Online Now</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    See our real-time availability and book your perfect cruise date instantly.
                  </p>
                  <Button 
                    onClick={handleBookNow}
                    size="lg"
                    className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold py-4 text-lg rounded-xl tracking-wide"
                    data-testid="button-quick-book"
                  >
                    VIEW AVAILABILITY
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 gap-6">
                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <Phone className="h-8 w-8 text-brand-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg tracking-wide">Call Us</h4>
                      <p className="text-gray-600 dark:text-gray-300">(512) 488-5892</p>
                      <p className="text-sm text-gray-500">Available 7 days a week</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <Mail className="h-8 w-8 text-brand-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg tracking-wide">Email Us</h4>
                      <p className="text-gray-600 dark:text-gray-300">clientservices@premierpartycruises.com</p>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <MapPin className="h-8 w-8 text-brand-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg tracking-wide">Lake Travis</h4>
                      <p className="text-gray-600 dark:text-gray-300">Austin, Texas</p>
                      <p className="text-sm text-gray-500">Multiple departure points</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Emergency/Quick Info */}
              <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-950">
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-bold text-lg mb-2 tracking-wide">Coast Guard Certified</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Licensed captains • Full insurance • Perfect safety record
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Lightbox Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="sr-only">Gallery Image</DialogTitle>
            <DialogDescription className="sr-only">
              View full size gallery image
            </DialogDescription>
          </DialogHeader>
          {selectedImageIndex !== null && (
            <div className="relative">
              <img 
                src={galleryImages[selectedImageIndex]}
                alt={`Premier Party Cruises Gallery ${selectedImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}