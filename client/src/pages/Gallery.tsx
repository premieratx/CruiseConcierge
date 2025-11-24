import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { SectionReveal } from '@/components/SectionReveal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Camera, X, ChevronLeft, ChevronRight, Ship, Sparkles, Users, Video as VideoIcon, Calendar } from 'lucide-react';
import { useLocation } from 'wouter';

// Media Item type from Media Library
interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  altText?: string;
  fileType: 'photo' | 'video' | 'edited_photo' | 'generated_video';
  filePath: string;
  uploadDate: string;
  autoTags?: string[];
  manualTags?: string[];
}

interface CategorySection {
  id: string;
  name: string;
  icon: any;
  tags: string[];
  description: string;
}

// Static fleet photos consolidated from all boats (Clever Girl → Meeseeks/The Irony → Day Tripper)
const staticFleetPhotos: MediaItem[] = [
  // Clever Girl - 8 photos
  { id: 'fleet-clever-1', filename: 'clever-girl-1.jpg', originalName: 'Clever Girl deck with Texas star', altText: 'Clever Girl deck with disco balls and Texas star', fileType: 'photo', filePath: '/attached_assets/clever girl-1 lake travis party boat rental_1763966476656.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-2', filename: 'clever-girl-2.jpg', originalName: 'Clever Girl main deck view', altText: 'Clever Girl party boat main deck view', fileType: 'photo', filePath: '/attached_assets/clever girl-2 party boat rental austin_1763966476657.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-3', filename: 'clever-girl-3.jpg', originalName: 'Clever Girl disco balls', altText: 'Clever Girl disco balls close-up view', fileType: 'photo', filePath: '/attached_assets/clever girl-3 bachelorette party boat austin_1763966476657.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-4', filename: 'clever-girl-4.jpg', originalName: 'Clever Girl seating area', altText: 'Clever Girl deck seating area', fileType: 'photo', filePath: '/attached_assets/clever girl-4 party boat rental austin_1763966476657.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-6', filename: 'clever-girl-6.jpg', originalName: 'Clever Girl shaded deck', altText: 'Clever Girl covered deck with disco balls', fileType: 'photo', filePath: '/attached_assets/clever girl-6 party boat lake travis_1763966476657.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-8', filename: 'clever-girl-8.jpg', originalName: 'Clever Girl lake views', altText: 'Clever Girl side deck view Lake Travis', fileType: 'photo', filePath: '/attached_assets/clever girl-8 party boat rental austin_1763966476658.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-9', filename: 'clever-girl-9.jpg', originalName: 'Clever Girl bow area', altText: 'Clever Girl bow seating and coolers', fileType: 'photo', filePath: '/attached_assets/clever girl-9 party boat austin_1763966476658.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-10', filename: 'clever-girl-10.jpg', originalName: 'Clever Girl on water', altText: 'Clever Girl party boat exterior on Lake Travis', fileType: 'photo', filePath: '/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  
  // Meeseeks / The Irony - 8 photos
  { id: 'fleet-meeseeks-1', filename: 'meeseeks-1.webp', originalName: 'Meeseeks party boat', altText: 'Meeseeks 20-person party boat on Lake Travis', fileType: 'photo', filePath: '/attached_assets/meeseeks-25-person-boat.webp', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-meeseeks-2', filename: 'meeseeks-2.jpg', originalName: 'Meeseeks seating area', altText: 'Meeseeks boat seating area with Lake Travis views', fileType: 'photo', filePath: '/attached_assets/meeseeks-1_1763968010088.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-meeseeks-3', filename: 'meeseeks-3.jpg', originalName: 'Meeseeks covered deck', altText: 'Meeseeks boat covered deck on Lake Travis', fileType: 'photo', filePath: '/attached_assets/meeseeks-2_1763968010089.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-meeseeks-4', filename: 'meeseeks-4.jpg', originalName: 'Meeseeks full deck view', altText: 'Meeseeks boat interior deck view', fileType: 'photo', filePath: '/attached_assets/meeseeks-3 lake travis party boat_1763968010089.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-meeseeks-5', filename: 'meeseeks-5.jpg', originalName: 'Meeseeks cabin and seating', altText: 'Meeseeks boat cabin and seating', fileType: 'photo', filePath: '/attached_assets/meeseeks-4 austin party boat rental_1763968010090.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-meeseeks-6', filename: 'meeseeks-6.jpg', originalName: 'Meeseeks open air deck', altText: 'Meeseeks boat outdoor deck area', fileType: 'photo', filePath: '/attached_assets/meeseeks-5 austin party barge rental_1763968010090.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-irony-1', filename: 'irony-1.jpg', originalName: 'The Irony twin boat full view', altText: 'The Irony boat full view on water', fileType: 'photo', filePath: '/attached_assets/the irony -3 party boat rental austin_1763968010090.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-irony-2', filename: 'irony-2.jpg', originalName: 'The Irony deck view', altText: 'The Irony boat stern view with seating', fileType: 'photo', filePath: '/attached_assets/the irony-2 party boat rental austin_1763968010090.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  
  // Day Tripper - 7 photos
  { id: 'fleet-day-1', filename: 'day-tripper-1.webp', originalName: 'Day Tripper party boat', altText: 'Day Tripper 14-person party boat on Lake Travis', fileType: 'photo', filePath: '/attached_assets/day-tripper-14-person-boat.webp', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-2', filename: 'day-tripper-2.jpg', originalName: 'Day Tripper shaded seating', altText: 'Day Tripper deck with blue canopy shade', fileType: 'photo', filePath: '/attached_assets/day tripper - party boat rental austin_1763968078448.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-3', filename: 'day-tripper-3.jpg', originalName: 'Day Tripper rear view', altText: 'Day Tripper boat rear view on water', fileType: 'photo', filePath: '/attached_assets/day tripper-1 party boat with captain austin_1763968078449.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-4', filename: 'day-tripper-4.jpg', originalName: 'Day Tripper deck layout', altText: 'Day Tripper interior deck layout', fileType: 'photo', filePath: '/attached_assets/day tripper-2 party boat austin lake travis_1763968078449.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-5', filename: 'day-tripper-5.jpg', originalName: 'Day Tripper bow view', altText: 'Day Tripper open water view from bow', fileType: 'photo', filePath: '/attached_assets/day tripper-3 party boat austin_1763968078451.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-6', filename: 'day-tripper-6.jpg', originalName: 'Day Tripper cabin and deck', altText: 'Day Tripper cabin and deck view', fileType: 'photo', filePath: '/attached_assets/day tripper-5 party barge lake travis_1763968078452.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-7', filename: 'day-tripper-7.jpg', originalName: 'Day Tripper safety features', altText: 'Day Tripper front view with lifeboat', fileType: 'photo', filePath: '/attached_assets/day tripper-6 party boat austin_1763968078452.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
];

const categories: CategorySection[] = [
  {
    id: 'all',
    name: 'All Media',
    icon: Camera,
    tags: [],
    description: 'View all photos and videos'
  },
  {
    id: 'boats',
    name: 'Our Fleet',
    icon: Ship,
    tags: ['boats', 'fleet'],
    description: 'See our amazing boats'
  },
  {
    id: 'party_atmosphere',
    name: 'Party Vibes',
    icon: Sparkles,
    tags: ['party_atmosphere', 'party'],
    description: 'Experience the party atmosphere'
  },
  {
    id: 'events',
    name: 'Events',
    icon: Users,
    tags: ['events', 'celebration'],
    description: 'Real celebrations and events'
  },
  {
    id: 'videos',
    name: 'Videos',
    icon: VideoIcon,
    tags: ['video'],
    description: 'Watch our cruise videos'
  }
];

export default function Gallery() {
  const [, navigate] = useLocation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPhotos, setFilteredPhotos] = useState<MediaItem[]>([]);
  const [brokenImageIds, setBrokenImageIds] = useState<Set<string>>(new Set());

  // Fetch published media from Media Library
  const { data: mediaLibraryPhotos = [], isLoading } = useQuery<MediaItem[]>({
    queryKey: ['/api/media/published'],
    queryFn: async () => {
      const response = await fetch('/api/media/published?section=gallery');
      if (!response.ok) return [];
      const data = await response.json();
      return data.items || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  // Combine media library photos with static fleet photos
  const allPhotos = [...staticFleetPhotos, ...mediaLibraryPhotos];
  const photos = allPhotos;

  // Set initial filtered photos when data loads, filtering out broken images
  useEffect(() => {
    if (photos && photos.length > 0) {
      const validPhotos = photos.filter(p => !brokenImageIds.has(p.id));
      setFilteredPhotos(validPhotos);
    }
  }, [photos, brokenImageIds]);

  const filterByCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const validPhotos = photos.filter(p => !brokenImageIds.has(p.id));
    if (categoryId === 'all') {
      setFilteredPhotos(validPhotos);
    } else if (categoryId === 'videos') {
      setFilteredPhotos(validPhotos.filter(p => p.fileType === 'video' || p.fileType === 'generated_video'));
    } else if (categoryId === 'boats') {
      // Show static fleet photos (already tagged and ordered correctly)
      setFilteredPhotos(staticFleetPhotos.filter(p => !brokenImageIds.has(p.id)));
    } else {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        setFilteredPhotos(validPhotos.filter(p => 
          p.manualTags?.some(tag => category.tags.includes(tag))
        ));
      }
    }
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const getCategoryCount = (categoryId: string) => {
    const validPhotos = photos.filter(p => !brokenImageIds.has(p.id));
    if (categoryId === 'all') return validPhotos.length;
    if (categoryId === 'videos') return validPhotos.filter(p => p.fileType === 'video' || p.fileType === 'generated_video').length;
    if (categoryId === 'boats') return staticFleetPhotos.filter(p => !brokenImageIds.has(p.id)).length;
    const category = categories.find(c => c.id === categoryId);
    if (!category) return 0;
    return validPhotos.filter(p => p.manualTags?.some(tag => category.tags.includes(tag))).length;
  };

  const handleImageError = (photoId: string) => {
    console.warn(`Failed to load image: ${photoId}`);
    setBrokenImageIds(prev => new Set([...prev, photoId]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <SEOHead 
        pageRoute="/gallery"
        defaultTitle="Gallery"
        defaultDescription="View stunning Lake Travis party boat photos. Real celebrations, fleet tours, bachelor parties. See the fun before you book!"
        defaultKeywords={[
          'premier party cruises photos',
          'lake travis boat rental gallery', 
          'austin party boat images',
          'lake travis cruise photos',
          'boat rental austin gallery',
          'party cruise pictures'
        ]}
        schemaType="webpage"
      />
      
      <PublicNavigation />
      <Breadcrumb />
      
      {/* Hero Section - Compact */}
      <SectionReveal>
        <section className="relative py-6 px-4 md:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-playfair font-bold text-gray-900 dark:text-white">
              Photo Gallery
            </h1>
          </div>
        </section>
      </SectionReveal>

      {/* Category Filter - Sticky */}
      <section className="py-4 bg-white dark:bg-gray-900 sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const count = getCategoryCount(category.id);
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => filterByCategory(category.id)}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  className={`font-sans tracking-wider rounded-xl ${
                    selectedCategory === category.id 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  data-testid={`filter-${category.id}`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs font-sans tracking-wider">{count}</Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Photo Grid */}
      <SectionReveal>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : filteredPhotos.length === 0 ? (
              <Card className="p-12 text-center rounded-xl">
                <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  No items in this category yet
                </p>
                <Button onClick={() => filterByCategory('all')} variant="outline" className="rounded-xl">
                  View All Media
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredPhotos.map((photo, index) => (
                  <Card
                    key={photo.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                    onClick={() => openLightbox(index)}
                    data-testid={`gallery-item-${index}`}
                  >
                    <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {photo.fileType === 'video' || photo.fileType === 'generated_video' ? (
                        <>
                          <video
                            src={`/api/media/view/${photo.id}`}
                            className="w-full h-full object-cover"
                            muted
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <VideoIcon className="h-8 w-8 text-white" />
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={`/api/media/view/${photo.id}`}
                            alt={photo.altText || photo.originalName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                            onError={() => handleImageError(photo.id)}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Camera className="h-6 w-6 text-white" />
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </SectionReveal>

      {/* Fleet Photos Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <Ship className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
                Fleet Photos
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Explore our custom-built party boats - See every detail before you book
              </p>
            </div>
          </SectionReveal>

          {/* Clever Girl Subsection */}
          <SectionReveal>
            <div className="mb-20">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-2">Clever Girl</h3>
                <p className="text-base text-gray-600 dark:text-gray-400">Our flagship 50-person party boat with 14 disco balls</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { src: '/attached_assets/clever girl-1 lake travis party boat rental_1763966476656.jpg', alt: 'Clever Girl deck with Texas star' },
                  { src: '/attached_assets/clever girl-2 party boat rental austin_1763966476657.jpg', alt: 'Clever Girl main deck view' },
                  { src: '/attached_assets/clever girl-3 bachelorette party boat austin_1763966476657.jpg', alt: 'Clever Girl disco balls' },
                  { src: '/attached_assets/clever girl-4 party boat rental austin_1763966476657.jpg', alt: 'Clever Girl seating area' },
                  { src: '/attached_assets/clever girl-6 party boat lake travis_1763966476657.jpg', alt: 'Clever Girl shaded deck' },
                  { src: '/attached_assets/clever girl-8 party boat rental austin_1763966476658.jpg', alt: 'Clever Girl lake views' },
                  { src: '/attached_assets/clever girl-9 party boat austin_1763966476658.jpg', alt: 'Clever Girl bow area' },
                  { src: '/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg', alt: 'Clever Girl on water' },
                ].map((photo, idx) => (
                  <Card
                    key={idx}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Day Tripper Subsection */}
          <SectionReveal>
            <div className="mb-20">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-2">Day Tripper</h3>
                <p className="text-base text-gray-600 dark:text-gray-400">Perfect for intimate gatherings up to 14 guests</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { src: '/attached_assets/day-tripper-14-person-boat.webp', alt: 'Day Tripper party boat' },
                  { src: '/attached_assets/day tripper - party boat rental austin_1763968078448.jpg', alt: 'Day Tripper shaded seating area' },
                  { src: '/attached_assets/day tripper-1 party boat with captain austin_1763968078449.jpg', alt: 'Day Tripper rear deck view' },
                  { src: '/attached_assets/day tripper-2 party boat austin lake travis_1763968078449.jpg', alt: 'Day Tripper interior deck layout' },
                  { src: '/attached_assets/day tripper-3 party boat austin_1763968078451.jpg', alt: 'Day Tripper bow view' },
                  { src: '/attached_assets/day tripper-5 party barge lake travis_1763968078452.jpg', alt: 'Day Tripper cabin and deck' },
                  { src: '/attached_assets/day tripper-6 party boat austin_1763968078452.jpg', alt: 'Day Tripper safety features' },
                ].map((photo, idx) => (
                  <Card
                    key={idx}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Meeseeks / The Irony Subsection */}
          <SectionReveal>
            <div className="mb-20">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-2">Meeseeks / The Irony</h3>
                <p className="text-base text-gray-600 dark:text-gray-400">Twin 20-person boats for medium-sized celebrations</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { src: '/attached_assets/meeseeks-25-person-boat.webp', alt: 'Meeseeks party boat' },
                  { src: '/attached_assets/meeseeks-1_1763968010088.jpg', alt: 'Meeseeks seating area with lake views' },
                  { src: '/attached_assets/meeseeks-2_1763968010089.jpg', alt: 'Meeseeks covered deck' },
                  { src: '/attached_assets/meeseeks-3 lake travis party boat_1763968010089.jpg', alt: 'Meeseeks full deck view' },
                  { src: '/attached_assets/meeseeks-4 austin party boat rental_1763968010090.jpg', alt: 'Meeseeks cabin and seating' },
                  { src: '/attached_assets/meeseeks-5 austin party barge rental_1763968010090.jpg', alt: 'Meeseeks open air deck' },
                  { src: '/attached_assets/the irony -3 party boat rental austin_1763968010090.jpg', alt: 'The Irony twin boat full view' },
                  { src: '/attached_assets/the irony-2 party boat rental austin_1763968010090.jpg', alt: 'The Irony deck view' },
                ].map((photo, idx) => (
                  <Card
                    key={idx}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
                Browse by Category
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Explore our collection of boats, events, and celebrations
              </p>
            </div>
          </SectionReveal>

          {/* Our Fleet */}
          {photos.filter(p => p.manualTags?.some(tag => ['boats', 'fleet'].includes(tag))).length > 0 && (
            <SectionReveal>
              <div className="mb-20">
                <div className="text-center mb-12">
                  <Ship className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-3">Our Fleet</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400">Modern boats for every occasion</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {photos.filter(p => p.manualTags?.some(tag => ['boats', 'fleet'].includes(tag))).map((photo, idx) => (
                    <Card
                      key={photo.id}
                      className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                      onClick={() => {
                        const filtered = photos.filter(p => p.manualTags?.some(tag => ['boats', 'fleet'].includes(tag)));
                        setFilteredPhotos(filtered);
                        setSelectedIndex(idx);
                        setLightboxOpen(true);
                      }}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={`/api/media/view/${photo.id}`}
                          alt={photo.altText || photo.originalName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </SectionReveal>
          )}

          {/* Party Atmosphere */}
          {photos.filter(p => p.manualTags?.some(tag => ['party_atmosphere', 'party'].includes(tag))).length > 0 && (
            <SectionReveal>
              <div className="mb-20">
                <div className="text-center mb-12">
                  <Sparkles className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-3">Party Vibes</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400">Feel the energy on Lake Travis</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {photos.filter(p => p.manualTags?.some(tag => ['party_atmosphere', 'party'].includes(tag))).map((photo, idx) => (
                    <Card
                      key={photo.id}
                      className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                      onClick={() => {
                        const filtered = photos.filter(p => p.manualTags?.some(tag => ['party_atmosphere', 'party'].includes(tag)));
                        setFilteredPhotos(filtered);
                        setSelectedIndex(idx);
                        setLightboxOpen(true);
                      }}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={`/api/media/view/${photo.id}`}
                          alt={photo.altText || photo.originalName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </SectionReveal>
          )}

          {/* Events */}
          {photos.filter(p => p.manualTags?.some(tag => ['events', 'celebration'].includes(tag))).length > 0 && (
            <SectionReveal>
              <div className="mb-20">
                <div className="text-center mb-12">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-3">Events & Celebrations</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400">Unforgettable moments with loved ones</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {photos.filter(p => p.manualTags?.some(tag => ['events', 'celebration'].includes(tag))).map((photo, idx) => (
                    <Card
                      key={photo.id}
                      className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                      onClick={() => {
                        const filtered = photos.filter(p => p.manualTags?.some(tag => ['events', 'celebration'].includes(tag)));
                        setFilteredPhotos(filtered);
                        setSelectedIndex(idx);
                        setLightboxOpen(true);
                      }}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={`/api/media/view/${photo.id}`}
                          alt={photo.altText || photo.originalName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </SectionReveal>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <SectionReveal>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-playfair font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Create Your Own Memories?
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Book your Lake Travis adventure today and join thousands of happy customers
            </p>
            <Button
              size="lg"
              onClick={() => window.open('https://events.premierpartycruises.com/widget/form/X1zEKdfbmjqs2hBHWNN1', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base px-12 py-6 rounded-xl"
            >
              <Calendar className="mr-3 h-6 w-6" />
              BOOK YOUR CRUISE NOW
            </Button>
          </div>
        </section>
      </SectionReveal>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-7xl w-full p-0 bg-black rounded-xl">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            data-testid="button-close-lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          
          {filteredPhotos.length > 0 && filteredPhotos[selectedIndex] && (
            <>
              <div className="relative w-full h-[80vh] flex items-center justify-center">
                <img
                  src={`/api/media/view/${filteredPhotos[selectedIndex].id}`}
                  alt={filteredPhotos[selectedIndex].altText || filteredPhotos[selectedIndex].originalName}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    data-testid="button-prev-photo"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    data-testid="button-next-photo"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </>
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <p className="text-center text-base">
                  {selectedIndex + 1} / {filteredPhotos.length}
                </p>
                {filteredPhotos[selectedIndex].title && (
                  <p className="text-center text-sm text-gray-300 mt-1">
                    {filteredPhotos[selectedIndex].title}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
