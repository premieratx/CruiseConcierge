import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import SEOHead from '@/components/SEOHead';
import Lightbox from '@/components/Lightbox';
import VideoModal from '@/components/VideoModal';
import ImageGrid from '@/components/ImageGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, Calendar, MessageSquare, Play, ExternalLink, Star, 
  Users, Ship, Sparkles, Crown, ArrowRight, Instagram, 
  Heart, Eye, Share2, ChevronDown, Video
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Import gallery images - ALL available Premier Party Cruises real photos
import heroImage1 from '@assets/image_1757844813165.png';
import heroImage2 from '@assets/image_1757850768476.png';
import heroImage3 from '@assets/image_1757853656553.png';
import galleryImage1 from '@assets/image_1757877906674.png';
import galleryImage2 from '@assets/image_1757884902886.png';
import galleryImage3 from '@assets/image_1757886911506.png';
import galleryImage4 from '@assets/image_1757828518223.png';
import galleryImage5 from '@assets/image_1757829649857.png';
import galleryImage6 from '@assets/image_1757829713904.png';
import galleryImage7 from '@assets/image_1757836983311.png';
import galleryImage8 from '@assets/image_1757850946645.png';
import galleryImage9 from '@assets/image_1757892689394.png';
import galleryImage10 from '@assets/image_1757892709763.png';
import galleryImage11 from '@assets/image_1757924324329.png';
import galleryImage12 from '@assets/image_1758068225810.png';
import galleryImage13 from '@assets/image_1758076921602.png';
// Additional real photos not previously used
import atxDiscoFull from '@assets/ATX Disco Cruise FULL SIZE_1758097496695.png';
import galleryImage14 from '@assets/image_1757884929747.png';
import ppcLogoLarge from '@assets/PPC Logo LARGE_1757881944449.png';

// Comprehensive Gallery data structure - ALL real Premier Party Cruises photos
const galleryImages = [
  {
    id: 'flagship-disco',
    src: atxDiscoFull,
    alt: 'ATX Disco Cruise - Austin\'s Premier Party Boat Experience',
    title: 'ATX Disco Cruise - Flagship Experience',
    description: 'The ultimate Austin party cruise experience with state-of-the-art sound, lighting, and premium amenities on Lake Travis',
    category: 'Featured',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-09-15',
    likes: 1247,
    views: 8930,
    tags: ['flagship', 'disco', 'atx', 'premium', 'weekend']
  },
  {
    id: 'fleet-1',
    src: galleryImage1,
    alt: 'Premier Party Cruises luxury fleet on Lake Travis',
    title: 'Day Tripper - 14 Person Boat',
    description: 'Perfect for intimate groups wanting a premium Lake Travis experience',
    category: 'Fleet',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-08-15',
    likes: 245,
    views: 1520,
    tags: ['boat', 'fleet', '14-person', 'intimate']
  },
  {
    id: 'party-1',
    src: galleryImage2,
    alt: 'Epic bachelor party celebration on Lake Travis',
    title: 'Bachelor Party Bliss',
    description: 'Unforgettable bachelor party with DJ, drinks, and Lake Travis views',
    category: 'Parties',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-07-22',
    likes: 387,
    views: 2840,
    tags: ['bachelor', 'party', 'celebration', 'dancing']
  },
  {
    id: 'scenery-1',
    src: galleryImage3,
    alt: 'Stunning Lake Travis sunset cruise views',
    title: 'Golden Hour Magic',
    description: 'Breathtaking sunset views from our premium cruises on Lake Travis',
    category: 'Scenery',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-09-03',
    likes: 892,
    views: 4250,
    tags: ['sunset', 'scenic', 'beautiful', 'lake']
  },
  {
    id: 'events-1',
    src: heroImage1,
    alt: 'Corporate event on Lake Travis party cruise',
    title: 'Corporate Team Building',
    description: 'Professional corporate events with stunning lake views and team activities',
    category: 'Events',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-06-18',
    likes: 156,
    views: 980,
    tags: ['corporate', 'teambuilding', 'professional', 'event']
  },
  {
    id: 'fleet-2',
    src: galleryImage4,
    alt: 'Meeseeks - 25 person luxury party boat',
    title: 'Meeseeks - 25 Person Boat',
    description: 'Mid-size luxury with premium sound system and spacious deck',
    category: 'Fleet',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-08-10',
    likes: 198,
    views: 1340,
    tags: ['boat', 'fleet', '25-person', 'luxury']
  },
  {
    id: 'celebrations-1',
    src: galleryImage5,
    alt: 'Bachelorette party celebration with friends',
    title: 'Bachelorette Weekend',
    description: 'Perfect girls getaway with champagne, music, and lake fun',
    category: 'Celebrations',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-08-25',
    likes: 542,
    views: 3200,
    tags: ['bachelorette', 'girls', 'celebration', 'champagne']
  },
  {
    id: 'scenery-2',
    src: galleryImage6,
    alt: 'Crystal clear Lake Travis waters',
    title: 'Crystal Waters',
    description: 'The pristine beauty of Lake Travis - perfect for swimming and relaxation',
    category: 'Scenery',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-07-15',
    likes: 421,
    views: 2100,
    tags: ['water', 'clear', 'swimming', 'peaceful']
  },
  {
    id: 'parties-2',
    src: galleryImage7,
    alt: 'ATX Disco Cruise party atmosphere',
    title: 'ATX Disco Cruise',
    description: 'Austin\'s hottest floating dance party every weekend',
    category: 'Parties',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-09-07',
    likes: 678,
    views: 4560,
    tags: ['disco', 'dance', 'party', 'weekend']
  },
  {
    id: 'fleet-3',
    src: galleryImage8,
    alt: 'Big Papa - 50 person party yacht',
    title: 'Big Papa - 50 Person Yacht',
    description: 'Our flagship vessel for large celebrations and corporate events',
    category: 'Fleet',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-08-05',
    likes: 312,
    views: 1890,
    tags: ['yacht', 'fleet', '50-person', 'flagship']
  },
  {
    id: 'celebrations-2',
    src: heroImage2,
    alt: 'Anniversary celebration cruise',
    title: 'Anniversary Celebration',
    description: 'Romantic anniversary cruise with sunset views and champagne',
    category: 'Celebrations',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-06-30',
    likes: 289,
    views: 1650,
    tags: ['anniversary', 'romantic', 'sunset', 'champagne']
  },
  {
    id: 'events-2',
    src: galleryImage9,
    alt: 'Wedding party on Lake Travis',
    title: 'Wedding Celebration',
    description: 'Magical wedding celebrations with Lake Travis as your backdrop',
    category: 'Events',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-05-20',
    likes: 456,
    views: 2890,
    tags: ['wedding', 'celebration', 'magical', 'romantic']
  },
  {
    id: 'scenery-3',
    src: galleryImage10,
    alt: 'Austin skyline from Lake Travis',
    title: 'Austin Skyline Views',
    description: 'Stunning views of the Austin skyline from Lake Travis waters',
    category: 'Scenery',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-08-20',
    likes: 634,
    views: 3450,
    tags: ['austin', 'skyline', 'cityscape', 'views']
  },
  {
    id: 'party-atmosphere-1',
    src: galleryImage11,
    alt: 'High-energy party atmosphere on Premier Party Cruises',
    title: 'Electric Party Vibes',
    description: 'Experience the electric atmosphere of our weekend party cruises',
    category: 'Parties',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-08-28',
    likes: 789,
    views: 4120,
    tags: ['party', 'energy', 'dancing', 'music']
  },
  {
    id: 'sunset-cruise-1',
    src: galleryImage12,
    alt: 'Romantic sunset cruise on Lake Travis',
    title: 'Sunset Magic',
    description: 'Breathtaking sunset cruises perfect for romantic evenings and special occasions',
    category: 'Scenery',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-07-30',
    likes: 892,
    views: 5260,
    tags: ['sunset', 'romantic', 'golden-hour', 'couples']
  },
  {
    id: 'lake-activities-1',
    src: galleryImage13,
    alt: 'Water activities and swimming on Lake Travis',
    title: 'Lake Travis Adventures',
    description: 'Swimming, water sports, and lake activities in crystal clear Lake Travis waters',
    category: 'Activities',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-08-12',
    likes: 456,
    views: 2890,
    tags: ['swimming', 'water-sports', 'activities', 'adventure']
  },
  {
    id: 'group-celebration-1',
    src: galleryImage14,
    alt: 'Large group celebration on Premier Party Cruises',
    title: 'Group Celebrations',
    description: 'Perfect venue for large group celebrations, corporate events, and milestone parties',
    category: 'Events',
    location: 'Lake Travis, Austin',
    photographer: 'Premier Party Cruises',
    date: '2024-09-05',
    likes: 567,
    views: 3240,
    tags: ['groups', 'celebration', 'corporate', 'milestone']
  }
];

const categories = [
  { id: 'All', label: 'All Photos', count: galleryImages.length },
  { id: 'Featured', label: 'Featured', count: galleryImages.filter(img => img.category === 'Featured').length },
  { id: 'Fleet', label: 'Our Fleet', count: galleryImages.filter(img => img.category === 'Fleet').length },
  { id: 'Parties', label: 'Party Life', count: galleryImages.filter(img => img.category === 'Parties').length },
  { id: 'Scenery', label: 'Lake Views', count: galleryImages.filter(img => img.category === 'Scenery').length },
  { id: 'Events', label: 'Special Events', count: galleryImages.filter(img => img.category === 'Events').length },
  { id: 'Celebrations', label: 'Celebrations', count: galleryImages.filter(img => img.category === 'Celebrations').length },
  { id: 'Activities', label: 'Activities', count: galleryImages.filter(img => img.category === 'Activities').length }
];

const featuredVideos = [
  {
    id: 'promo-1',
    title: 'Premier Party Cruises Experience',
    description: 'See what makes Austin\'s premier party cruise experience unforgettable',
    thumbnail: heroImage3,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
    category: 'Promotional'
  },
  {
    id: 'testimonial-1',
    title: 'Customer Testimonials',
    description: 'Real stories from our happy customers',
    thumbnail: galleryImage11,
    videoUrl: 'https://vimeo.com/123456789', // Placeholder
    category: 'Testimonials'
  }
];

const stats = [
  { label: '14+ Years', value: 'Experience', icon: Star },
  { label: '125K+', value: 'Happy Customers', icon: Users },
  { label: '5-Star', value: 'Safety Record', icon: Ship },
  { label: '1000+', value: 'Photos & Videos', icon: Camera }
];

export default function Gallery() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<typeof featuredVideos[0] | null>(null);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  
  const heroImages = [heroImage1, heroImage2, heroImage3];
  
  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleImageClick = (image: any, index: number) => {
    const filteredImages = selectedCategory === 'All' 
      ? galleryImages 
      : galleryImages.filter(img => img.category === selectedCategory);
    
    const actualIndex = filteredImages.findIndex(img => img.id === image.id);
    setLightboxIndex(actualIndex);
    setLightboxOpen(true);
  };

  const handleVideoClick = (video: typeof featuredVideos[0]) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
  };

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const lightboxImages = filteredImages.map(img => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    title: img.title,
    description: img.description,
    category: img.category,
    photographer: img.photographer,
    location: img.location
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/gallery"
        defaultTitle="Photo Gallery - Premier Party Cruises | Lake Travis Boat Rental Gallery"
        defaultDescription="Explore our stunning photo gallery showcasing Premier Party Cruises fleet, party scenes, and beautiful Lake Travis views. See real celebrations and book your Austin boat rental experience."
        defaultKeywords={[
          'premier party cruises photos',
          'lake travis boat rental gallery', 
          'austin party boat images',
          'lake travis cruise photos',
          'boat rental austin gallery',
          'party cruise pictures'
        ]}
        schemaType="webpage"
        image={heroImage1}
      />
      
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
            >
              <img
                src={heroImages[currentHeroImage]}
                alt="Premier Party Cruises Gallery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Camera className="h-16 w-16 text-brand-yellow" />
              <Video className="h-12 w-12 text-brand-blue" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6">
              GALLERY
            </h1>
            
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Badge className="bg-brand-yellow text-black font-bold text-lg px-6 py-2 mb-4">
                1000+ PHOTOS & VIDEOS
              </Badge>
              <p className="text-xl md:text-2xl lg:text-3xl mb-4 max-w-4xl mx-auto font-light leading-relaxed">
                Experience the magic of <span className="text-brand-yellow font-bold">Lake Travis</span>
              </p>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                Real moments from real celebrations. See why we're Austin's premier party cruise experience.
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/book')}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-12 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300"
                data-testid="button-book-now"
              >
                <Calendar className="mr-3 h-6 w-6" />
                BOOK YOUR CRUISE
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const videoSection = document.getElementById('videos');
                  videoSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-xl px-12 py-6 backdrop-blur-sm bg-white/10"
                data-testid="button-video-gallery"
              >
                <Play className="mr-3 h-6 w-6" />
                WATCH VIDEOS
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-brand-yellow" />
                  <div className="text-2xl md:text-3xl font-bold">{stat.label}</div>
                  <div className="text-sm text-gray-300">{stat.value}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-white">
              PHOTO GALLERY
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Browse our collection of professional photos showcasing the Premier Party Cruises experience
            </p>

            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              variant="pills"
              className="justify-center"
            />
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ImageGrid
              images={galleryImages}
              categories={categories.filter(cat => cat.id !== 'All').map(cat => cat.id)}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onImageClick={handleImageClick}
              showSearch={true}
              showSort={true}
              showLayoutToggle={true}
              itemsPerPage={12}
            />
          </motion.div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section id="videos" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-white">
              VIDEO GALLERY
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Watch the action unfold - experience the energy and excitement of our cruises
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  onClick={() => handleVideoClick(video)}
                  data-testid={`video-card-${video.id}`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-brand-yellow text-black rounded-full p-6 group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-8 w-8 ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-black/70 text-white">
                      {video.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{video.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-400">{video.description}</p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Integration */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              FOLLOW THE ADVENTURE
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Stay connected with us on social media for daily updates, behind-the-scenes content, and the latest cruise adventures
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-bold px-8 py-4"
                data-testid="button-follow-instagram"
              >
                <Instagram className="mr-3 h-6 w-6" />
                FOLLOW ON INSTAGRAM
                <ExternalLink className="ml-3 h-4 w-4" />
              </Button>
              
              <Button
                size="lg"
                onClick={() => navigate('/book')}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-8 py-4"
                data-testid="button-book-from-gallery"
              >
                <Calendar className="mr-3 h-6 w-6" />
                BOOK YOUR EXPERIENCE
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)}
        onPrevious={() => setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)}
      />

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={selectedVideo?.videoUrl || ''}
        title={selectedVideo?.title}
        description={selectedVideo?.description}
        thumbnail={selectedVideo?.thumbnail}
      />
    </div>
  );
}