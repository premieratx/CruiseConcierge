import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Camera, Calendar, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
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

export default function Gallery() {
  const [, navigate] = useLocation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
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
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-blue to-blue-700 py-24">
        <div className="container mx-auto px-6 text-center text-white">
          <Camera className="h-16 w-16 mx-auto mb-6 text-brand-yellow" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto">
            Experience the magic of <span className="text-brand-yellow font-bold">Lake Travis</span>
          </p>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Real moments from real celebrations. See why we're Austin's premier party cruise experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/chat')}
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-12 py-6"
              data-testid="button-book-cruise"
            >
              <Calendar className="mr-3 h-6 w-6" />
              BOOK YOUR CRUISE
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Grid Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
              Our Gallery
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {isLoading ? 'Loading photos...' : `${photos.length} Photos`}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-video bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : photos.length === 0 ? (
            <Card className="p-12 text-center">
              <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                No photos published yet
              </p>
              <p className="text-gray-500">
                Check back soon for amazing photos from our cruises!
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <Card
                  key={photo.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
                  onClick={() => openLightbox(index)}
                  data-testid={`gallery-photo-${index}`}
                >
                  <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={photo.filePath}
                      alt={photo.originalName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  {photo.manualTags && photo.manualTags.length > 0 && (
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {photo.manualTags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-xs bg-brand-blue/10 text-brand-blue px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
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
          
          {photos.length > 0 && (
            <>
              <div className="relative w-full h-[80vh] flex items-center justify-center">
                <img
                  src={photos[selectedIndex]?.filePath}
                  alt={photos[selectedIndex]?.originalName}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {photos.length > 1 && (
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
                  {selectedIndex + 1} / {photos.length}
                </p>
                {photos[selectedIndex]?.originalName && (
                  <p className="text-center text-sm text-gray-300 mt-1">
                    {photos[selectedIndex].originalName}
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
