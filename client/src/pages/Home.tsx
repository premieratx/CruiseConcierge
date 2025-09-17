import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Ship, Users, Clock, DollarSign, Star, Calendar, Phone, Mail, MapPin,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, Anchor, Waves,
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Instagram, Facebook, Twitter, Quote, ChevronRight,
  Navigation, Compass, LifeBuoy, Zap, Target, TrendingUp
} from 'lucide-react';
import { formatCurrency } from '@shared/formatters';

// Hero images - using available assets
import heroImage1 from '@assets/image_1757844813165.png';
import heroImage2 from '@assets/image_1757850768476.png';
import heroImage3 from '@assets/image_1757853656553.png';
import galleryImage1 from '@assets/image_1757877906674.png';
import galleryImage2 from '@assets/image_1757884902886.png';
import galleryImage3 from '@assets/image_1757886911506.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
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
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Service packages data
const servicePackages = [
  {
    id: 'intimate',
    name: 'Intimate Cruise',
    capacity: '8-15 people',
    duration: '3 hours',
    weekdayPrice: 250000, // $2,500 in cents
    weekendPrice: 350000, // $3,500 in cents
    description: 'Perfect for small celebrations and intimate gatherings',
    features: ['Professional crew', 'Sound system', 'Coolers provided', 'Safety equipment'],
    icon: Heart,
    popular: false,
    badge: null
  },
  {
    id: 'standard',
    name: 'Standard Party Cruise',
    capacity: '16-25 people',
    duration: '3-4 hours',
    weekdayPrice: 400000, // $4,000 in cents
    weekendPrice: 550000, // $5,500 in cents
    description: 'Our most popular option for bachelor/bachelorette parties',
    features: ['Premium sound system', 'Party atmosphere', 'Professional crew', 'Coolers & ice', 'Bluetooth connectivity'],
    icon: PartyPopper,
    popular: true,
    badge: 'Most Popular'
  },
  {
    id: 'large',
    name: 'Large Group Cruise',
    capacity: '26-50 people',
    duration: '4 hours',
    weekdayPrice: 700000, // $7,000 in cents
    weekendPrice: 950000, // $9,500 in cents
    description: 'Ideal for corporate events and large celebrations',
    features: ['Extended deck space', 'Premium amenities', 'Multiple crew members', 'Enhanced safety protocols', 'Custom party setup'],
    icon: Users,
    popular: false,
    badge: 'Corporate Favorite'
  },
  {
    id: 'mega',
    name: 'Mega Party Experience',
    capacity: '51-75 people',
    duration: '4-5 hours',
    weekdayPrice: 1200000, // $12,000 in cents
    weekendPrice: 1600000, // $16,000 in cents
    description: 'Ultimate party experience for the biggest celebrations',
    features: ['Maximum capacity', 'VIP treatment', 'Premium everything', 'Dedicated party coordinator', 'Custom catering options'],
    icon: Crown,
    popular: false,
    badge: 'VIP Experience'
  }
];

// Disco cruise packages
const discoCruises = [
  {
    id: 'basic_disco',
    name: 'Basic Bach Package',
    price: 8500, // $85 in cents
    duration: '4 hours',
    description: 'Essential disco cruise experience',
    features: ['DJ & dancing', 'Party atmosphere', 'Cash bar', 'Group celebration'],
    icon: Music,
    badge: 'Great Value'
  },
  {
    id: 'disco_queen',
    name: 'Disco Queen Package',
    price: 9500, // $95 in cents
    duration: '4 hours',
    description: 'Enhanced party experience',
    features: ['Premium DJ', 'Welcome drink', 'Party favors', 'Priority areas', 'Cash bar'],
    icon: Sparkles,
    badge: 'Enhanced'
  },
  {
    id: 'platinum_disco',
    name: 'Platinum Disco Package',
    price: 10500, // $105 in cents
    duration: '4 hours',
    description: 'Ultimate disco cruise luxury',
    features: ['Premium DJ', '2 Welcome drinks', 'VIP area access', 'Premium party favors', 'Priority boarding'],
    icon: Crown,
    badge: 'VIP'
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Bachelorette Party Host',
    rating: 5,
    text: "Absolutely incredible experience! The crew was amazing, the boat was perfect, and Lake Travis was stunning. My girls are still talking about it months later!",
    avatar: '👰'
  },
  {
    id: 2,
    name: 'Marcus Thompson',
    role: 'Corporate Event Planner',
    rating: 5,
    text: "Professional, reliable, and fun! Premier Party Cruises made our company retreat unforgettable. The team building aspect of being on the water was genius.",
    avatar: '💼'
  },
  {
    id: 3,
    name: 'Jessica & Mike',
    role: 'Anniversary Celebration',
    rating: 5,
    text: "We celebrated our 10th anniversary with Premier Party Cruises and it exceeded all expectations. The sunset views, professional service, and attention to detail were perfect.",
    avatar: '💕'
  }
];

// Stats for social proof
const stats = [
  { value: '500+', label: 'Successful Events', icon: Trophy },
  { value: '5 Years', label: 'Lake Travis Experience', icon: Star },
  { value: '10,000+', label: 'Happy Guests', icon: Heart },
  { value: '4.9/5', label: 'Average Rating', icon: Award }
];

export default function Home() {
  const [, navigate] = useLocation();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    eventType: '',
    groupSize: ''
  });

  const heroImages = [heroImage1, heroImage2, heroImage3];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBookNow = () => {
    navigate('/book');
  };

  const handleViewPackages = () => {
    // Scroll to services section
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: '',
      eventType: '',
      groupSize: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <img 
                src={heroImages[currentHeroImage]}
                alt="Premier Party Cruises on Lake Travis"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            {/* Logo */}
            <motion.div variants={fadeInUp} className="mb-8">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises Logo" 
                className="h-16 md:h-20 mx-auto mb-4"
                data-testid="img-hero-logo"
              />
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
              data-testid="text-hero-headline"
            >
              Austin's Premier
              <span className="block text-brand-yellow">Party Cruise Experience</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed"
              data-testid="text-hero-subheadline"
            >
              Create unforgettable memories on Lake Travis with Austin's most trusted party cruise company. 
              Professional crew, premium boats, and the ultimate celebration atmosphere.
            </motion.p>

            {/* Key Highlights */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <MapPin className="h-5 w-5 text-brand-yellow" />
                <span className="font-semibold">Lake Travis, Austin</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Users className="h-5 w-5 text-brand-yellow" />
                <span className="font-semibold">8-75 People</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Clock className="h-5 w-5 text-brand-yellow" />
                <span className="font-semibold">3-5 Hour Cruises</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={handleBookNow}
                className="bg-brand-yellow text-black hover:bg-brand-yellow/90 font-bold text-lg px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
                data-testid="button-hero-book-now"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Cruise Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleViewPackages}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold text-lg px-8 py-4 rounded-xl backdrop-blur-sm"
                data-testid="button-hero-view-packages"
              >
                <Ship className="mr-2 h-5 w-5" />
                View Packages
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to Explore</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Overview Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground"
              data-testid="text-services-headline"
            >
              Choose Your Perfect
              <span className="text-brand-blue"> Cruise Experience</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              From intimate celebrations to mega parties, we have the perfect cruise package for your group size and budget.
            </motion.p>
          </motion.div>

          {/* Private Cruise Packages */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerChildren}
            className="mb-16"
          >
            <motion.h3 
              variants={fadeInUp}
              className="text-3xl font-heading font-bold text-center mb-10 text-foreground"
            >
              Private Cruise Packages
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicePackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  variants={scaleIn}
                  className={cn(
                    "relative group",
                    pkg.popular && "lg:scale-105 z-10"
                  )}
                >
                  <Card className={cn(
                    "h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 cursor-pointer",
                    pkg.popular 
                      ? "border-brand-blue bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background" 
                      : "border-muted hover:border-brand-blue/50"
                  )} onClick={handleBookNow} data-testid={`card-package-${pkg.id}`}>
                    {pkg.badge && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                        <Badge className="bg-brand-blue text-white px-4 py-1 text-sm font-bold">
                          {pkg.badge}
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className="mb-4">
                        <pkg.icon className={cn(
                          "h-12 w-12 mx-auto",
                          pkg.popular ? "text-brand-blue" : "text-muted-foreground"
                        )} />
                      </div>
                      <CardTitle className="text-xl font-bold mb-2">{pkg.name}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-brand-blue">
                        {pkg.capacity}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-2">Starting from</div>
                        <div className="text-2xl font-bold text-foreground">
                          {formatCurrency(pkg.weekdayPrice)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Weekdays • {formatCurrency(pkg.weekendPrice)} Weekends
                        </div>
                        <div className="text-sm font-semibold text-brand-blue mt-1">
                          {pkg.duration}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground text-center">
                        {pkg.description}
                      </p>
                      
                      <div className="space-y-2">
                        {pkg.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full mt-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold"
                        data-testid={`button-book-${pkg.id}`}
                      >
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Disco Cruise Packages */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerChildren}
          >
            <motion.h3 
              variants={fadeInUp}
              className="text-3xl font-heading font-bold text-center mb-4 text-foreground"
            >
              ATX Disco Cruises
            </motion.h3>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground text-center mb-10 max-w-2xl mx-auto"
            >
              Join the party! Perfect for bachelor/bachelorette parties and group celebrations. Dance the night away on Lake Travis.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {discoCruises.map((disco, index) => (
                <motion.div
                  key={disco.id}
                  variants={scaleIn}
                  className="group"
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-brand-yellow/50 cursor-pointer bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-950 dark:to-background" 
                        onClick={handleBookNow} 
                        data-testid={`card-disco-${disco.id}`}>
                    <CardHeader className="text-center pb-4">
                      <div className="relative mb-4">
                        <disco.icon className="h-12 w-12 mx-auto text-brand-yellow" />
                        {disco.badge && (
                          <Badge className="absolute -top-2 -right-2 bg-brand-yellow text-black px-2 py-1 text-xs font-bold">
                            {disco.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl font-bold mb-2">{disco.name}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground">
                          {formatCurrency(disco.price)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          per person • {disco.duration}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground text-center">
                        {disco.description}
                      </p>
                      
                      <div className="space-y-2">
                        {disco.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm">
                            <Music className="h-4 w-4 text-brand-yellow mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full mt-4 bg-brand-yellow hover:bg-brand-yellow/90 text-black font-semibold"
                        data-testid={`button-book-disco-${disco.id}`}
                      >
                        Join the Party
                        <PartyPopper className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-heading font-bold text-center mb-12"
              data-testid="text-social-proof-headline"
            >
              Trusted by Austin's Party People
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={scaleIn}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-brand-yellow" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerChildren}
          >
            <motion.h3 
              variants={fadeInUp}
              className="text-3xl font-heading font-bold text-center mb-12"
            >
              What Our Guests Say
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <motion.div 
                  key={testimonial.id}
                  variants={scaleIn}
                  data-testid={`testimonial-${testimonial.id}`}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="text-2xl mr-3">{testimonial.avatar}</div>
                        <div>
                          <div className="font-bold">{testimonial.name}</div>
                          <div className="text-blue-100 text-sm">{testimonial.role}</div>
                        </div>
                        <div className="ml-auto flex">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                          ))}
                        </div>
                      </div>
                      <Quote className="h-6 w-6 text-brand-yellow mb-2" />
                      <p className="text-blue-100 leading-relaxed">{testimonial.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground"
              data-testid="text-gallery-headline"
            >
              Experience the <span className="text-brand-blue">Magic</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              See what makes Premier Party Cruises the ultimate Lake Travis experience. 
              Every cruise is a memory in the making.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[galleryImage1, galleryImage2, galleryImage3].map((image, index) => (
              <motion.div 
                key={index}
                variants={scaleIn}
                className="group cursor-pointer overflow-hidden rounded-xl"
                data-testid={`gallery-image-${index}`}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={image} 
                    alt={`Party cruise experience ${index + 1}`}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
                Austin's Lake Travis 
                <span className="text-brand-blue"> Experts</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                For over 5 years, Premier Party Cruises has been Austin's premier destination for 
                unforgettable Lake Travis experiences. We combine local expertise, professional service, 
                and a passion for creating memories that last a lifetime.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-brand-blue" />
                  <div>
                    <div className="font-bold">Safety First</div>
                    <div className="text-sm text-muted-foreground">Licensed & Insured</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Navigation className="h-8 w-8 text-brand-blue" />
                  <div>
                    <div className="font-bold">Local Knowledge</div>
                    <div className="text-sm text-muted-foreground">Lake Travis Experts</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Compass className="h-8 w-8 text-brand-blue" />
                  <div>
                    <div className="font-bold">Professional Crew</div>
                    <div className="text-sm text-muted-foreground">Experienced Captains</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <LifeBuoy className="h-8 w-8 text-brand-blue" />
                  <div>
                    <div className="font-bold">Full Service</div>
                    <div className="text-sm text-muted-foreground">Complete Experience</div>
                  </div>
                </div>
              </div>
              <Button 
                size="lg"
                onClick={() => navigate('/blog')}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold"
                data-testid="button-learn-more"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage2} 
                  alt="Premier Party Cruises team and boat"
                  className="w-full h-96 object-cover"
                  data-testid="img-about-preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-2xl font-bold">Lake Travis</div>
                  <div className="text-lg">Austin's Premier Destination</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground"
              data-testid="text-contact-headline"
            >
              Ready to Set Sail?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Book your unforgettable Lake Travis experience today or get in touch with our team 
              to plan the perfect celebration for your group.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <MapPin className="mr-2 h-6 w-6 text-brand-blue" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-brand-blue/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <div className="font-bold">Location</div>
                      <div className="text-muted-foreground">Lake Travis, Austin, TX</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-brand-blue/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <div className="font-bold">Phone</div>
                      <div className="text-muted-foreground">(512) 555-CRUISE</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-brand-blue/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <div className="font-bold">Email</div>
                      <div className="text-muted-foreground">hello@premierpartycruises.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-brand-blue/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <div className="font-bold">Hours</div>
                      <div className="text-muted-foreground">Daily: 9:00 AM - 8:00 PM</div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <div className="flex space-x-4 justify-center">
                      <Button size="lg" onClick={handleBookNow} className="bg-brand-blue hover:bg-brand-blue/90 flex-1" data-testid="button-contact-book">
                        <Calendar className="mr-2 h-5 w-5" />
                        Book Now
                      </Button>
                      <Button size="lg" variant="outline" onClick={() => navigate('/chat')} className="flex-1" data-testid="button-contact-chat">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Live Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Contact Form */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Quick Inquiry</CardTitle>
                  <CardDescription>
                    Get a personalized quote for your celebration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4" data-testid="form-contact">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your name"
                          required
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your@email.com"
                          required
                          data-testid="input-contact-email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="(512) 555-0123"
                          data-testid="input-contact-phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="groupSize">Group Size</Label>
                        <Input
                          id="groupSize"
                          value={contactForm.groupSize}
                          onChange={(e) => setContactForm(prev => ({ ...prev, groupSize: e.target.value }))}
                          placeholder="e.g., 20 people"
                          data-testid="input-contact-group-size"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us about your celebration..."
                        rows={4}
                        data-testid="textarea-contact-message"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-semibold" data-testid="button-contact-submit">
                      Send Inquiry
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}