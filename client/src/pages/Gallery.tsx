import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
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

export default function Gallery() {
  const [, navigate] = useLocation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPhotos, setFilteredPhotos] = useState<MediaItem[]>([]);
  const [brokenImageIds, setBrokenImageIds] = useState<Set<string>>(new Set());

  // Fetch published gallery photos from media library
  const { data: photos = [], isLoading } = useQuery<MediaItem[]>({
    queryKey: ['/api/media/published'],
    queryFn: async () => {
      const response = await fetch('/api/media/published?section=gallery');
      if (!response.ok) return [];
      const data = await response.json();
      return data.items || [];
    }
  });

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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/gallery"
        defaultTitle="Gallery | Premier Party Cruises Photos"
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
      
      {/* Compact Hero Section - 1/3 height */}
      <section className="relative bg-gradient-to-br from-brand-blue to-blue-700 py-8">
        <div className="container mx-auto px-6 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Camera className="h-8 w-8 text-brand-yellow" />
            <h1 className="text-2xl md:text-3xl font-heading font-bold">Photo Gallery</h1>
          </div>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto">
            Real moments from Lake Travis
          </p>
        </div>
      </section>

      {/* Category Filter - Sticky */}
      <section className="py-4 bg-white dark:bg-gray-900 sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const count = getCategoryCount(category.id);
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => filterByCategory(category.id)}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  className={selectedCategory === category.id 
                    ? 'bg-brand-blue hover:bg-brand-blue/90' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }
                  data-testid={`filter-${category.id}`}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {category.name}
                  <Badge variant="secondary" className="ml-1 text-xs">{count}</Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Photo Grid - 8 wide desktop, 4 tablet, 2 mobile, 4 rows visible */}
      <section className="py-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {[...Array(32)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : filteredPhotos.length === 0 ? (
            <Card className="p-12 text-center">
              <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                No items in this category yet
              </p>
              <Button onClick={() => filterByCategory('all')} variant="outline">
                View All Media
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {filteredPhotos.map((photo, index) => (
                <Card
                  key={photo.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0"
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
                          alt={photo.originalName}
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

      {/* Category Sections Below */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center text-gray-900 dark:text-white">
            Browse by Category
          </h2>

          {/* Our Fleet - Organized by Boat */}
          {photos.filter(p => p.manualTags?.some(tag => ['boats', 'fleet'].includes(tag))).length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Ship className="h-6 w-6 text-brand-blue" />
                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">Our Fleet</h3>
              </div>

              {/* The Irony */}
              {photos.filter(p => p.manualTags?.includes('the_irony')).length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    The Irony <span className="text-sm font-normal text-gray-500">(Turquoise canopy)</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {photos.filter(p => p.manualTags?.includes('the_irony')).map((photo, idx) => (
                      <Card
                        key={photo.id}
                        className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0"
                        onClick={() => {
                          const filtered = photos.filter(p => p.manualTags?.includes('the_irony'));
                          setFilteredPhotos(filtered);
                          setSelectedIndex(idx);
                          setLightboxOpen(true);
                        }}
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={`/api/media/view/${photo.id}`}
                            alt={photo.originalName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Clever Girl */}
              {photos.filter(p => p.manualTags?.includes('clever_girl')).length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    Clever Girl <span className="text-sm font-normal text-gray-500">(50+ capacity, 10 disco balls, Texas flag)</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {photos.filter(p => p.manualTags?.includes('clever_girl')).map((photo, idx) => (
                      <Card
                        key={photo.id}
                        className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0"
                        onClick={() => {
                          const filtered = photos.filter(p => p.manualTags?.includes('clever_girl'));
                          setFilteredPhotos(filtered);
                          setSelectedIndex(idx);
                          setLightboxOpen(true);
                        }}
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={`/api/media/view/${photo.id}`}
                            alt={photo.originalName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Meeseeks */}
              {photos.filter(p => p.manualTags?.includes('meeseeks')).length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    Meeseeks <span className="text-sm font-normal text-gray-500">(Blue canopy, chairs on deck)</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {photos.filter(p => p.manualTags?.includes('meeseeks')).map((photo, idx) => (
                      <Card
                        key={photo.id}
                        className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0"
                        onClick={() => {
                          const filtered = photos.filter(p => p.manualTags?.includes('meeseeks'));
                          setFilteredPhotos(filtered);
                          setSelectedIndex(idx);
                          setLightboxOpen(true);
                        }}
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={`/api/media/view/${photo.id}`}
                            alt={photo.originalName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Daytripper */}
              {photos.filter(p => p.manualTags?.includes('daytripper')).length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    Daytripper <span className="text-sm font-normal text-gray-500">(14-person capacity)</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {photos.filter(p => p.manualTags?.includes('daytripper')).map((photo, idx) => (
                      <Card
                        key={photo.id}
                        className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0"
                        onClick={() => {
                          const filtered = photos.filter(p => p.manualTags?.includes('daytripper'));
                          setFilteredPhotos(filtered);
                          setSelectedIndex(idx);
                          setLightboxOpen(true);
                        }}
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={`/api/media/view/${photo.id}`}
                            alt={photo.originalName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Fleet Photos (mixed boats) */}
              {photos.filter(p => p.manualTags?.includes('fleet') && !p.manualTags?.some(tag => ['the_irony', 'clever_girl', 'meeseeks', 'daytripper'].includes(tag))).length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    Fleet Photos
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {photos.filter(p => p.manualTags?.includes('fleet') && !p.manualTags?.some(tag => ['the_irony', 'clever_girl', 'meeseeks', 'daytripper'].includes(tag))).map((photo, idx) => (
                      <Card
                        key={photo.id}
                        className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0"
                        onClick={() => {
                          const filtered = photos.filter(p => p.manualTags?.includes('fleet'));
                          setFilteredPhotos(filtered);
                          setSelectedIndex(idx);
                          setLightboxOpen(true);
                        }}
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={`/api/media/view/${photo.id}`}
                            alt={photo.originalName}
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
          )}

          {/* Party Atmosphere */}
          {photos.filter(p => p.manualTags?.some(tag => ['party_atmosphere', 'party'].includes(tag))).length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-brand-yellow" />
                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">Party Vibes</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {photos.filter(p => p.manualTags?.some(tag => ['party_atmosphere', 'party'].includes(tag))).map((photo, idx) => (
                  <Card
                    key={photo.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0"
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
                        alt={photo.originalName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {photos.filter(p => p.manualTags?.some(tag => ['events', 'celebration'].includes(tag))).length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-brand-blue" />
                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">Events & Celebrations</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {photos.filter(p => p.manualTags?.some(tag => ['events', 'celebration'].includes(tag))).map((photo, idx) => (
                  <Card
                    key={photo.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0"
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
                        alt={photo.originalName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {photos.filter(p => p.fileType === 'video' || p.fileType === 'generated_video').length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <VideoIcon className="h-6 w-6 text-brand-blue" />
                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">Videos</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.filter(p => p.fileType === 'video' || p.fileType === 'generated_video').map((photo, idx) => (
                  <Card
                    key={photo.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0"
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
          )}

          {/* CTA */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Create Your Own Memories?</h3>
            <Button
              size="lg"
              onClick={() => navigate('/chat')}
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-12 py-6"
            >
              <Calendar className="mr-3 h-6 w-6" />
              BOOK YOUR CRUISE NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-7xl w-full p-0 bg-black">
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
                    src={`/api/media/view/${filteredPhotos[selectedIndex].id}`}
                    className="max-w-full max-h-full object-contain"
                    controls
                    autoPlay
                  />
                ) : (
                  <img
                    src={`/api/media/view/${filteredPhotos[selectedIndex].id}`}
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
                <p className="text-center">
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
