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
import { Camera, Calendar, X, ChevronLeft, ChevronRight, Ship, Sparkles, Users, Video as VideoIcon } from 'lucide-react';
import { useLocation } from 'wouter';

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  fileType: 'photo' | 'video' | 'edited_photo' | 'generated_video';
  filePath: string;
  uploadDate: string;
  autoTags?: string[];
  manualTags?: string[];
  altText?: string;
}

interface CategorySection {
  id: string;
  name: string;
  icon: any;
  tags: string[];
  description: string;
}

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

// Fallback static gallery photos when media library is empty
const staticGalleryPhotos: MediaItem[] = [
  // Boat Photos - Day Tripper
  {
    id: 'static-boat-1',
    filename: 'day-tripper-14-person-boat.jpg',
    originalName: 'Day Tripper - 14 Person Boat',
    fileType: 'photo',
    filePath: '/live_website_photos/day-tripper-14-person-boat.jpg',
    uploadDate: '2024-01-01',
    manualTags: ['boats', 'fleet', 'daytripper'],
    altText: 'Day Tripper - 14 person capacity boat on Lake Travis'
  },
  // Boat Photos - Meeseeks
  {
    id: 'static-boat-2',
    filename: 'meeseeks-25-person-boat.jpg',
    originalName: 'Meeseeks - 25 Person Boat',
    fileType: 'photo',
    filePath: '/live_website_photos/meeseeks-25-person-boat.jpg',
    uploadDate: '2024-01-01',
    manualTags: ['boats', 'fleet', 'meeseeks'],
    altText: 'Meeseeks - 25 person party boat with blue canopy'
  },
  // Boat Photos - Clever Girl
  {
    id: 'static-boat-3',
    filename: 'clever-girl-50-person-boat.jpg',
    originalName: 'Clever Girl - 50 Person Boat',
    fileType: 'photo',
    filePath: '/live_website_photos/clever-girl-50-person-boat.jpg',
    uploadDate: '2024-01-01',
    manualTags: ['boats', 'fleet', 'clever_girl'],
    altText: 'Clever Girl - 50+ capacity party boat with disco balls'
  },
  // Party Atmosphere Photos
  {
    id: 'static-party-1',
    filename: 'party-atmosphere-1.jpg',
    originalName: 'Party Atmosphere on Lake Travis',
    fileType: 'photo',
    filePath: '/live_website_photos/party-atmosphere-1.jpg',
    uploadDate: '2024-01-01',
    manualTags: ['party_atmosphere', 'party', 'events'],
    altText: 'Guests enjoying party atmosphere on Lake Travis cruise'
  },
  {
    id: 'static-party-2',
    filename: 'party-atmosphere-2.jpg',
    originalName: 'Party Celebration',
    fileType: 'photo',
    filePath: '/live_website_photos/party-atmosphere-2.jpg',
    uploadDate: '2024-01-01',
    manualTags: ['party_atmosphere', 'party', 'events'],
    altText: 'Party celebration on Premier Party Cruises boat'
  },
  {
    id: 'static-party-3',
    filename: 'party-atmosphere-3.jpg',
    originalName: 'Lake Travis Party Scene',
    fileType: 'photo',
    filePath: '/live_website_photos/party-atmosphere-3.jpg',
    uploadDate: '2024-01-01',
    manualTags: ['party_atmosphere', 'party', 'events'],
    altText: 'Lake Travis party scene with guests'
  },
  // Event Photos
  {
    id: 'static-event-1',
    filename: 'atx-disco-cruise-party.jpg',
    originalName: 'ATX Disco Cruise Party',
    fileType: 'photo',
    filePath: '/live_website_photos/atx-disco-cruise-party.jpg',
    uploadDate: '2024-01-01',
    manualTags: ['events', 'celebration', 'party_atmosphere'],
    altText: 'ATX Disco Cruise bachelor and bachelorette party celebration'
  },
  {
    id: 'static-event-2',
    filename: 'bachelor-party-group-guys.jpg',
    originalName: 'Bachelor Party Group',
    fileType: 'photo',
    filePath: '/live_website_photos/bachelor-party-group-guys.jpg',
    uploadDate: '2024-01-01',
    manualTags: ['events', 'celebration', 'bachelor'],
    altText: 'Bachelor party group on Lake Travis boat rental'
  },
  {
    id: 'static-event-3',
    filename: 'dancing-party-scene.jpg',
    originalName: 'Dancing Party Scene',
    fileType: 'photo',
    filePath: '/live_website_photos/dancing-party-scene.jpg',
    uploadDate: '2024-01-01',
    manualTags: ['events', 'celebration', 'party_atmosphere'],
    altText: 'Guests dancing at Lake Travis party cruise'
  },
  // Fun Photos
  {
    id: 'static-fun-1',
    filename: 'giant-unicorn-float.jpg',
    originalName: 'Giant Unicorn Float',
    fileType: 'photo',
    filePath: '/live_website_photos/giant-unicorn-float.jpg',
    uploadDate: '2024-01-01',
    manualTags: ['events', 'party_atmosphere', 'floating'],
    altText: 'Giant unicorn float on Lake Travis party cruise'
  },
  // Videos
  {
    id: 'youtube-hero-video',
    filename: 'premier-party-cruises-lake-travis.mp4',
    originalName: 'Premier Party Cruises - Lake Travis Experience',
    fileType: 'video',
    filePath: 'https://www.youtube.com/watch?v=4-Yx24Y6oro',
    uploadDate: '2025-11-11',
    manualTags: ['video', 'party_atmosphere', 'boats', 'events'],
    altText: 'Premier Party Cruises Lake Travis party boat experience video'
  }
];

export default function Gallery() {
  const [, navigate] = useLocation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPhotos, setFilteredPhotos] = useState<MediaItem[]>([]);
  const [brokenImageIds, setBrokenImageIds] = useState<Set<string>>(new Set());

  // Fetch published gallery photos from media library, fallback to static photos
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

  // Use media library photos if available, otherwise fallback to static photos
  const photos = mediaLibraryPhotos.length > 0 ? mediaLibraryPhotos : staticGalleryPhotos;

  // Set initial filtered photos when data loads, filtering out broken images
  useEffect(() => {
    if (photos.length > 0) {
      const validPhotos = photos.filter(p => !brokenImageIds.has(p.id));
      setFilteredPhotos(validPhotos);
    }
  }, [photos.length, brokenImageIds]);

  const filterByCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const validPhotos = photos.filter(p => !brokenImageIds.has(p.id));
    if (categoryId === 'all') {
      setFilteredPhotos(validPhotos);
    } else if (categoryId === 'videos') {
      setFilteredPhotos(validPhotos.filter(p => p.fileType === 'video' || p.fileType === 'generated_video'));
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
      
      {/* Hero Section */}
      <SectionReveal>
        <section className="relative py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <Camera className="h-12 sm:h-16 w-12 sm:w-16 text-blue-600 mx-auto mb-4 md:mb-6" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
              Photo Gallery
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real moments from Lake Travis
            </p>
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
                            src={photo.id.startsWith('static-') ? photo.filePath : `/api/media/view/${photo.id}`}
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

          {/* Our Fleet - Organized by Boat */}
          {photos.filter(p => p.manualTags?.some(tag => ['boats', 'fleet'].includes(tag))).length > 0 && (
            <SectionReveal>
              <div className="mb-20">
                <div className="text-center mb-12">
                  <Ship className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-3">Our Fleet</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400">Modern boats for every occasion</p>
                </div>

                {/* Individual boat sections */}
                {['the_irony', 'clever_girl', 'meeseeks', 'daytripper'].map((boatTag) => {
                  const boatPhotos = photos.filter(p => p.manualTags?.includes(boatTag));
                  if (boatPhotos.length === 0) return null;

                  const boatNames: Record<string, {name: string; desc: string}> = {
                    'the_irony': { name: 'The Irony', desc: 'Turquoise canopy' },
                    'clever_girl': { name: 'Clever Girl', desc: '50+ capacity, 10 disco balls, Texas flag' },
                    'meeseeks': { name: 'Meeseeks', desc: 'Blue canopy, chairs on deck' },
                    'daytripper': { name: 'Daytripper', desc: '14-person capacity' }
                  };

                  return (
                    <div key={boatTag} className="mb-12">
                      <h4 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
                        {boatNames[boatTag].name} 
                        <span className="text-sm font-normal text-gray-500 ml-2">({boatNames[boatTag].desc})</span>
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {boatPhotos.map((photo, idx) => (
                          <Card
                            key={photo.id}
                            className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                            onClick={() => {
                              setFilteredPhotos(boatPhotos);
                              setSelectedIndex(idx);
                              setLightboxOpen(true);
                            }}
                          >
                            <div className="aspect-square relative overflow-hidden">
                              <img
                                src={photo.id.startsWith('static-') ? photo.filePath : `/api/media/view/${photo.id}`}
                                alt={photo.altText || photo.originalName}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Fleet Photos (mixed boats) */}
                {photos.filter(p => p.manualTags?.includes('fleet') && !p.manualTags?.some(tag => ['the_irony', 'clever_girl', 'meeseeks', 'daytripper'].includes(tag))).length > 0 && (
                  <div className="mb-12">
                    <h4 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
                      Fleet Photos
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {photos.filter(p => p.manualTags?.includes('fleet') && !p.manualTags?.some(tag => ['the_irony', 'clever_girl', 'meeseeks', 'daytripper'].includes(tag))).map((photo, idx) => (
                        <Card
                          key={photo.id}
                          className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                          onClick={() => {
                            const filtered = photos.filter(p => p.manualTags?.includes('fleet'));
                            setFilteredPhotos(filtered);
                            setSelectedIndex(idx);
                            setLightboxOpen(true);
                          }}
                        >
                          <div className="aspect-square relative overflow-hidden">
                            <img
                              src={photo.id.startsWith('static-') ? photo.filePath : `/api/media/view/${photo.id}`}
                              alt={photo.altText || photo.originalName}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
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
                          src={photo.id.startsWith('static-') ? photo.filePath : `/api/media/view/${photo.id}`}
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
                          src={photo.id.startsWith('static-') ? photo.filePath : `/api/media/view/${photo.id}`}
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

          {/* Videos */}
          {photos.filter(p => p.fileType === 'video' || p.fileType === 'generated_video').length > 0 && (
            <SectionReveal>
              <div className="mb-12">
                <div className="text-center mb-12">
                  <VideoIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-3">Videos</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400">Experience the excitement in motion</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.filter(p => p.fileType === 'video' || p.fileType === 'generated_video').map((photo, idx) => (
                    <Card
                      key={photo.id}
                      className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                      onClick={() => {
                        const filtered = photos.filter(p => p.fileType === 'video' || p.fileType === 'generated_video');
                        setFilteredPhotos(filtered);
                        setSelectedIndex(idx);
                        setLightboxOpen(true);
                      }}
                    >
                      <div className="aspect-video relative overflow-hidden bg-gray-900">
                        <video
                          src={`/api/media/view/${photo.id}`}
                          className="w-full h-full object-cover"
                          muted
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <VideoIcon className="h-12 w-12 text-white" />
                        </div>
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
              onClick={() => navigate('/chat')}
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
                {filteredPhotos[selectedIndex].fileType === 'video' || filteredPhotos[selectedIndex].fileType === 'generated_video' ? (
                  <video
                    src={filteredPhotos[selectedIndex].id.startsWith('static-') ? filteredPhotos[selectedIndex].filePath : `/api/media/view/${filteredPhotos[selectedIndex].id}`}
                    className="max-w-full max-h-full object-contain"
                    controls
                    autoPlay
                  />
                ) : (
                  <img
                    src={filteredPhotos[selectedIndex].id.startsWith('static-') ? filteredPhotos[selectedIndex].filePath : `/api/media/view/${filteredPhotos[selectedIndex].id}`}
                    alt={filteredPhotos[selectedIndex].originalName}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
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
                {filteredPhotos[selectedIndex].originalName && (
                  <p className="text-center text-sm text-gray-300 mt-1">
                    {filteredPhotos[selectedIndex].originalName}
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
