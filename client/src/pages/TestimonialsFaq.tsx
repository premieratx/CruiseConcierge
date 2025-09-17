import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import VideoModal from '@/components/VideoModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { 
  Star, Quote, Play, Search, Phone, Mail, Calendar, 
  Users, Ship, PartyPopper, Building2, Heart, Trophy,
  Shield, Clock, MapPin, Camera, MessageSquare,
  ExternalLink, CheckCircle, ArrowRight, Sparkles
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';

// Import images for testimonials
import galleryImage1 from '@assets/image_1757877906674.png';
import galleryImage2 from '@assets/image_1757884902886.png';
import galleryImage3 from '@assets/image_1757886911506.png';
import heroImage1 from '@assets/image_1757844813165.png';

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

// Testimonials data
const featuredTestimonials = [
  {
    id: 'featured-1',
    name: 'Sarah Thompson',
    role: 'Maid of Honor',
    event: 'Bachelorette Party',
    rating: 5,
    text: 'Premier Party Cruises made our bachelorette party absolutely perfect! The captain and crew were professional, the boat was immaculate, and the Lake Travis views were breathtaking. We had 22 girls and everyone had an amazing time. The DJ kept the party going all afternoon and the photo opportunities were endless. Worth every penny!',
    groupSize: 22,
    date: 'August 2024',
    image: galleryImage1,
    badge: 'Featured',
    isVideo: false
  },
  {
    id: 'featured-2',
    name: 'Michael Rodriguez',
    role: 'Groom',
    event: 'Bachelor Party',
    rating: 5,
    text: 'Best bachelor party ever! The crew at Premier Party Cruises went above and beyond to make sure we had an unforgettable experience. The ATX Disco Cruise was epic - great music, amazing vibes, and we met so many cool people. The professional photographer captured everything perfectly. Highly recommend!',
    groupSize: 15,
    date: 'July 2024',
    image: galleryImage2,
    badge: 'Video Available',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'featured-3',
    name: 'Jennifer Adams',
    role: 'Event Coordinator',
    event: 'Corporate Event',
    rating: 5,
    text: 'We\'ve used Premier Party Cruises for three corporate events now, and they never disappoint. The private charter for our company retreat was flawless - professional service, beautiful boats, and the team building activities on Lake Travis brought our staff together like nothing else could.',
    groupSize: 45,
    date: 'September 2024',
    image: galleryImage3,
    badge: 'Corporate',
    isVideo: false
  }
];

const allTestimonials = [
  ...featuredTestimonials,
  {
    id: 'test-4',
    name: 'David Chen',
    role: 'Birthday Celebrant',
    event: 'Private Charter',
    rating: 5,
    text: 'Celebrating my 30th on Lake Travis was incredible! The 25-person boat was perfect for our group, and the crew made sure we had everything we needed. The sunset views were magical.',
    groupSize: 18,
    date: 'June 2024',
    image: heroImage1,
    isVideo: false
  },
  {
    id: 'test-5',
    name: 'Ashley Williams',
    role: 'Bride-to-be',
    event: 'Bachelorette Party',
    rating: 5,
    text: 'The disco cruise exceeded all expectations! Such a fun way to celebrate with my girls. The DJ was amazing and we danced for hours. Already planning our next trip!',
    groupSize: 12,
    date: 'May 2024',
    image: galleryImage1,
    isVideo: false
  },
  {
    id: 'test-6',
    name: 'Robert Martinez',
    role: 'Best Man',
    event: 'Bachelor Party',
    rating: 5,
    text: 'Premier Party Cruises delivered exactly what they promised. Professional crew, great boat, and an unforgettable experience. The groom is still talking about it!',
    groupSize: 20,
    date: 'April 2024',
    image: galleryImage2,
    isVideo: false
  },
  {
    id: 'test-7',
    name: 'Lisa Brown',
    role: 'Event Planner',
    event: 'Anniversary Party',
    rating: 5,
    text: 'Organized a surprise 25th anniversary party on their private charter. The attention to detail and customer service was outstanding. The couple was thrilled!',
    groupSize: 30,
    date: 'March 2024',
    image: galleryImage3,
    isVideo: false
  },
  {
    id: 'test-8',
    name: 'James Wilson',
    role: 'Groom',
    event: 'Bachelor Party',
    rating: 5,
    text: 'Austin\'s best kept secret! The disco cruise was the highlight of our weekend. Great music, awesome people, and Lake Travis is beautiful. Will definitely be back!',
    groupSize: 8,
    date: 'February 2024',
    image: heroImage1,
    isVideo: false
  },
  {
    id: 'test-9',
    name: 'Rachel Green',
    role: 'Corporate Manager',
    event: 'Team Building',
    rating: 5,
    text: 'Used Premier Party Cruises for our quarterly team outing. The experience brought our remote team together in a way that office events never could. Highly recommended for corporate groups.',
    groupSize: 35,
    date: 'January 2024',
    image: galleryImage1,
    isVideo: false
  }
];

// FAQ data organized by categories
const faqCategories = {
  booking: {
    title: 'Booking & Reservations',
    icon: Calendar,
    faqs: [
      {
        question: 'How do I book a cruise with Premier Party Cruises?',
        answer: 'Booking is easy! You can book online through our website, call us at (512) 488-5892, or fill out our contact form. We\'ll work with you to customize the perfect experience for your group. For private charters, we recommend booking at least 2-3 weeks in advance, especially during peak season (March-October).'
      },
      {
        question: 'What deposit is required to secure my reservation?',
        answer: 'We require a 50% deposit to secure your reservation, with the remaining balance due 24 hours before your cruise. We accept credit cards, cash, and electronic transfers. The deposit is fully refundable if you cancel more than 7 days before your scheduled cruise.'
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'Cancellations made more than 7 days before your cruise receive a full refund. Cancellations made 3-7 days before receive a 50% refund. Cancellations within 72 hours are non-refundable unless due to severe weather conditions. We understand plans can change and work with our customers whenever possible.'
      },
      {
        question: 'Can I reschedule my booking?',
        answer: 'Yes! We offer one complimentary reschedule if made more than 48 hours before your original cruise time, subject to availability. Additional reschedules may incur a $100 administrative fee. We\'re flexible and want to ensure you have the best possible experience.'
      },
      {
        question: 'Do you offer group discounts?',
        answer: 'Yes! We offer discounts for groups of 15+ people on private charters. Corporate events and multiple booking discounts are also available. Contact us directly for custom pricing based on your specific needs and group size.'
      }
    ]
  },
  pricing: {
    title: 'Pricing & Packages',
    icon: Users,
    faqs: [
      {
        question: 'What does the cruise price include?',
        answer: 'All cruises include professional captain and crew, fuel, coolers with ice, premium sound system with Bluetooth connectivity, safety equipment, and use of all onboard amenities. Private charters also include exclusive use of the boat and personalized service.'
      },
      {
        question: 'Are there any additional costs I should know about?',
        answer: 'The main additional costs are gratuity for the crew (15-20% recommended), food and beverages (you can bring your own), and any special add-ons like professional photography ($300), decorations setup ($150), or extended hours ($200/hour). We\'re transparent about all pricing upfront.'
      },
      {
        question: 'What are your rates for private charters?',
        answer: 'Private charter rates vary by boat size, day of week, and season. Weekday rates start at $1,800 for our 14-person boat, while weekend rates start at $2,500. Our 50-person boats range from $4,000-$6,000 depending on the package. All rates include captain, crew, and standard amenities.'
      },
      {
        question: 'How much do ATX Disco Cruise tickets cost?',
        answer: 'ATX Disco Cruise tickets are $85 per person and include the 3-hour party cruise experience with DJ, dancing, and all onboard amenities. VIP packages are available for $150 per person and include priority boarding, reserved seating, and complimentary drinks.'
      },
      {
        question: 'Do you have special pricing for bachelor/bachelorette parties?',
        answer: 'Yes! Our bachelor/bachelorette packages start at $85 per person for the ATX Disco Cruise experience, or you can book a private charter with special pricing for wedding parties. We also offer photography packages and custom decorations for these special celebrations.'
      }
    ]
  },
  expectations: {
    title: 'What to Expect',
    icon: Ship,
    faqs: [
      {
        question: 'What should I bring on the cruise?',
        answer: 'You can bring your own food, drinks (including alcohol for guests 21+), sunscreen, towels, and cameras. We provide coolers with ice, cups, and basic amenities. Don\'t bring glass containers, illegal substances, or pets (service animals are welcome). We have a full list of recommended items we can send you upon booking.'
      },
      {
        question: 'Can we bring our own alcohol?',
        answer: 'Yes! Guests 21+ can bring their own alcoholic beverages. We ask that you bring drinks in cans or plastic bottles only - no glass for safety reasons. Our crew can help serve drinks if needed, and we provide ice and cups. Please drink responsibly and have a designated driver for after the cruise.'
      },
      {
        question: 'What happens if someone gets seasick?',
        answer: 'Lake Travis is generally very calm, so seasickness is rare. However, we carry motion sickness remedies onboard and our experienced crew knows how to help. We recommend eating a light meal before boarding and avoiding excessive alcohol consumption. If needed, we can return to dock early.'
      },
      {
        question: 'Can we play our own music?',
        answer: 'Absolutely! All our boats have premium sound systems with Bluetooth connectivity. You can connect your phone or device to play your own playlists. For private charters, you have full control of the music. On disco cruises, we balance custom requests with our DJ\'s party mix.'
      },
      {
        question: 'What amenities are available on the boats?',
        answer: 'Our boats feature comfortable seating, shade areas, premium sound systems, restrooms, coolers with ice, swim ladders, and safety equipment. Larger boats also have dance floors, bars, and additional amenities. Each boat is regularly maintained and cleaned to ensure the best experience.'
      }
    ]
  },
  safety: {
    title: 'Safety & Policies',
    icon: Shield,
    faqs: [
      {
        question: 'What safety measures do you have in place?',
        answer: 'Safety is our top priority. All our captains are Coast Guard licensed, our boats undergo regular safety inspections, and we carry all required safety equipment including life jackets for every passenger. We have a perfect safety record over 14+ years and maintain comprehensive insurance coverage.'
      },
      {
        question: 'Do you provide life jackets?',
        answer: 'Yes, we provide Coast Guard approved life jackets in all sizes, including infant and child sizes. While not required to be worn at all times on our large, stable boats, life jackets are mandatory when swimming or during rough weather conditions. Our crew will brief everyone on safety procedures before departure.'
      },
      {
        question: 'What are your capacity limits?',
        answer: 'We strictly adhere to Coast Guard capacity limits, which vary by boat size. Our 14-person boats accommodate up to 14 guests, 25-person boats up to 25 guests, and our largest boats accommodate up to 50 guests. These limits include all passengers and are enforced for safety and comfort.'
      },
      {
        question: 'What is your policy on swimming?',
        answer: 'Swimming is allowed in designated areas when conditions are safe. Life jackets are required while in the water, and our crew supervises all swimming activities. We only allow swimming when anchored in calm, deep water away from boat traffic. The captain makes the final decision on swimming safety based on current conditions.'
      },
      {
        question: 'Do you have insurance coverage?',
        answer: 'Yes, we carry comprehensive commercial marine insurance including liability coverage for passengers and property. All guests are covered under our policy during the cruise. We can provide proof of insurance for corporate events or special requirements upon request.'
      }
    ]
  },
  weather: {
    title: 'Weather & Conditions',
    icon: Clock,
    faqs: [
      {
        question: 'What happens if the weather is bad?',
        answer: 'Safety comes first. If severe weather conditions (thunderstorms, high winds, etc.) make cruising unsafe, we will reschedule or provide a full refund. Light rain doesn\'t typically cancel cruises as our boats have covered areas. We monitor weather closely and will contact you 24-48 hours before your cruise if conditions look questionable.'
      },
      {
        question: 'Do cruises run in winter months?',
        answer: 'Yes, we operate year-round! While summer is our peak season, winter cruises can be magical with fewer crowds and beautiful scenery. We provide heated areas on boats during colder months and recommend bringing layers. Winter rates are often lower, making it a great value for groups.'
      },
      {
        question: 'What if it\'s too windy to cruise?',
        answer: 'If winds exceed safe operating levels (typically 25+ mph with white caps), we may need to cancel or reschedule for safety. Lake Travis can get choppy in high winds, affecting passenger comfort and safety. We\'ll notify you as early as possible and work to find an alternative date that works for your group.'
      },
      {
        question: 'How do you handle extreme heat in summer?',
        answer: 'All our boats have shaded areas and we provide plenty of ice and water. We recommend bringing sunscreen, hats, and staying hydrated. Summer is our most popular season, so the boats are equipped with everything needed for comfort. Early morning and evening cruises are popular options to avoid peak heat.'
      },
      {
        question: 'What\'s the best time of year for cruises?',
        answer: 'Every season has its charm! Spring (March-May) offers perfect temperatures and wildflowers. Summer (June-August) is peak party season with warm water for swimming. Fall (September-November) provides beautiful foliage and comfortable temperatures. Winter offers peaceful cruises with great deals and holiday lighting tours.'
      }
    ]
  },
  events: {
    title: 'Special Events',
    icon: PartyPopper,
    faqs: [
      {
        question: 'Do you specialize in bachelor and bachelorette parties?',
        answer: 'Absolutely! We\'re Austin\'s premier choice for bachelor and bachelorette celebrations. We offer both private charter options and spots on our famous ATX Disco Cruise. Our packages can include professional photography, custom decorations, special music playlists, and coordination with other Austin activities.'
      },
      {
        question: 'Can you accommodate corporate events and team building?',
        answer: 'Yes! We regularly host corporate events, team building activities, client entertainment, and company parties. We can customize experiences to meet your corporate needs, including catering coordination, presentation equipment, and professional atmosphere while still providing the fun Lake Travis experience.'
      },
      {
        question: 'Do you host wedding receptions or ceremonies?',
        answer: 'We host wedding receptions and can accommodate small, intimate ceremonies onboard. Lake Travis provides a stunning backdrop for your special day. We work with local wedding planners and can coordinate with photographers, caterers, and florists to create your dream wedding celebration.'
      },
      {
        question: 'What about birthday parties and anniversaries?',
        answer: 'Birthday and anniversary celebrations are some of our favorites! We can help customize decorations, coordinate special music, and even arrange surprise elements. From sweet 16s to 50th anniversaries, we\'ve celebrated them all. Our crew loves being part of these special milestones.'
      },
      {
        question: 'Can you handle large group events?',
        answer: 'Yes! Our largest boats accommodate up to 50 people, and for bigger events, we can coordinate multiple boats to cruise together. We\'ve successfully handled corporate retreats, family reunions, and large celebrations with 100+ people across our fleet. Advanced booking and planning help ensure everything goes smoothly.'
      }
    ]
  }
};

// Social proof stats
const socialProofStats = [
  { number: '125,000+', label: 'Happy Customers', icon: Users },
  { number: '14+', label: 'Years Experience', icon: Trophy },
  { number: '4.9/5', label: 'Average Rating', icon: Star },
  { number: '100%', label: 'Safety Record', icon: Shield }
];

export default function TestimonialsFaq() {
  const [location, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestimonialFilter, setSelectedTestimonialFilter] = useState('all');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({ url: '', title: '' });

  // Filter testimonials based on selected filter
  const filteredTestimonials = useMemo(() => {
    if (selectedTestimonialFilter === 'all') {
      return allTestimonials;
    }
    return allTestimonials.filter(testimonial => 
      testimonial.event.toLowerCase().includes(selectedTestimonialFilter.toLowerCase())
    );
  }, [selectedTestimonialFilter]);

  // Filter FAQs based on search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqCategories;

    const filtered: typeof faqCategories = {};
    Object.entries(faqCategories).forEach(([key, category]) => {
      const matchingFaqs = category.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (matchingFaqs.length > 0) {
        filtered[key as keyof typeof faqCategories] = {
          ...category,
          faqs: matchingFaqs
        };
      }
    });
    
    return filtered;
  }, [searchQuery]);

  const handleVideoPlay = (videoUrl: string, title: string) => {
    setCurrentVideo({ url: videoUrl, title });
    setIsVideoModalOpen(true);
  };

  const handleBookNow = () => {
    navigate('/book');
  };

  const handleGetQuote = () => {
    navigate('/contact');
  };

  const eventTypeFilters = [
    { value: 'all', label: 'All Events' },
    { value: 'bachelor', label: 'Bachelor Parties' },
    { value: 'bachelorette', label: 'Bachelorette Parties' },
    { value: 'private', label: 'Private Charters' },
    { value: 'corporate', label: 'Corporate Events' }
  ];

  return (
    <>
      <SEOHead 
        pageRoute="/testimonials-faq"
        defaultTitle="Customer Reviews & FAQ - Premier Party Cruises Austin"
        defaultDescription="Read authentic reviews from 125,000+ happy customers and get answers to frequently asked questions about Austin's premier Lake Travis party cruise experience."
        defaultKeywords={['premier party cruises reviews', 'lake travis boat rental faq', 'austin party boat testimonials', 'customer reviews lake travis', 'boat rental questions austin']}
        schemaType="webpage"
        customSchema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": Object.values(faqCategories).flatMap(category =>
            category.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          )
        }}
      />
      
      <PublicNavigation />
      
      {/* Hero Section */}
      <motion.section 
        className="relative pt-24 pb-16 bg-gradient-to-br from-brand-blue via-brand-blue/90 to-brand-blue/80 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage1})` }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="mb-8">
              <Badge className="bg-brand-yellow text-black font-bold px-6 py-2 text-lg">
                125,000+ Happy Customers
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tight"
            >
              WHAT OUR CUSTOMERS SAY
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
            >
              Discover why Premier Party Cruises is Austin's #1 rated party cruise experience. 
              Read authentic reviews and get answers to all your questions.
            </motion.p>

            <motion.div 
              variants={staggerChildren}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
            >
              {socialProofStats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={scaleIn}
                  className="text-center"
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <stat.icon className="h-8 w-8 text-brand-yellow mx-auto mb-2" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-white/80 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              FEATURED REVIEWS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Hear directly from our customers about their unforgettable experiences on Lake Travis.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                data-testid={`featured-testimonial-${testimonial.id}`}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                  {/* Background image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-5"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "font-semibold",
                            testimonial.badge === 'Featured' && "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20",
                            testimonial.badge === 'Video Available' && "bg-red-50 text-red-600 border-red-200",
                            testimonial.badge === 'Corporate' && "bg-blue-50 text-blue-600 border-blue-200"
                          )}
                        >
                          {testimonial.badge}
                        </Badge>
                      </div>

                      {testimonial.isVideo && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleVideoPlay(testimonial.videoUrl!, `${testimonial.name}'s Review`)}
                          className="h-10 w-10 rounded-full bg-red-500 hover:bg-red-600 text-white"
                          data-testid={`button-play-video-${testimonial.id}`}
                        >
                          <Play className="h-4 w-4 fill-current" />
                        </Button>
                      )}
                    </div>
                    
                    <Quote className="h-8 w-8 text-brand-blue mb-4 opacity-50" />
                    
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</div>
                        <div className="text-xs text-gray-500 mt-1">{testimonial.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-brand-blue">{testimonial.groupSize} guests</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">{testimonial.event}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              CUSTOMER REVIEWS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Browse authentic reviews from customers who experienced our various cruise packages.
            </motion.p>

            {/* Event Type Filters */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-8">
              {eventTypeFilters.map(filter => (
                <Button
                  key={filter.value}
                  variant={selectedTestimonialFilter === filter.value ? "default" : "outline"}
                  onClick={() => setSelectedTestimonialFilter(filter.value)}
                  className={cn(
                    "px-6 py-2",
                    selectedTestimonialFilter === filter.value && "bg-brand-blue text-white hover:bg-brand-blue/90"
                  )}
                  data-testid={`filter-${filter.value}`}
                >
                  {filter.label}
                </Button>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: (index % 6) * 0.1 }}
                data-testid={`testimonial-${testimonial.id}`}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.event}
                    </Badge>
                  </div>
                  
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">{testimonial.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-brand-blue">{testimonial.groupSize} guests</div>
                      <div className="text-xs text-gray-500">{testimonial.date}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            className="text-center mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Create Your Own Amazing Experience?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join thousands of satisfied customers who have made unforgettable memories on Lake Travis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleBookNow}
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3"
                  data-testid="button-book-now-testimonials"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Your Cruise
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleGetQuote}
                  className="border-brand-blue text-brand-blue hover:bg-brand-blue/10 px-8 py-3"
                  data-testid="button-get-quote-testimonials"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Get Custom Quote
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              FREQUENTLY ASKED QUESTIONS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Get answers to the most common questions about booking, pricing, safety, and what to expect on your Lake Travis cruise experience.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeInUp} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full rounded-lg border-2 border-gray-200 focus:border-brand-blue"
                  data-testid="input-faq-search"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-5xl mx-auto"
          >
            <Tabs defaultValue="booking" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
                {Object.entries(filteredFaqs).map(([key, category]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key} 
                    className="flex items-center space-x-2 text-xs lg:text-sm"
                    data-testid={`tab-${key}`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(filteredFaqs).map(([key, category]) => (
                <TabsContent key={key} value={key}>
                  <motion.div variants={fadeInUp}>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                        <category.icon className="h-6 w-6 mr-3 text-brand-blue" />
                        {category.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Everything you need to know about {category.title.toLowerCase()}.
                      </p>
                    </div>

                    <Accordion type="single" collapsible className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={faqIndex} 
                          value={`${key}-${faqIndex}`}
                          className="bg-gray-50 dark:bg-gray-800 rounded-lg px-6 border-none"
                          data-testid={`faq-item-${key}-${faqIndex}`}
                        >
                          <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:text-brand-blue transition-colors duration-200">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Contact Section for Unanswered Questions */}
          <motion.div 
            className="text-center mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our friendly team is here to help! Contact us directly for personalized assistance with your cruise planning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Phone className="h-4 w-4 mr-2 text-brand-blue" />
                  <span className="font-semibold">(512) 488-5892</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Mail className="h-4 w-4 mr-2 text-brand-blue" />
                  <span className="font-semibold">clientservices@premierpartycruises.com</span>
                </div>
                <Button 
                  onClick={handleGetQuote}
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                  data-testid="button-contact-faq"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={currentVideo.url}
        title={currentVideo.title}
      />
    </>
  );
}