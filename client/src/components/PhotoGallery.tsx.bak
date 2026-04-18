import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GalleryImage } from "@shared/schema";

interface PhotoGalleryProps {
  category?: string;
  limit?: number;
  columns?: number;
  lightbox?: boolean;
  className?: string;
}

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

function LazyImage({ src, alt, className = "", onClick }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden bg-muted ${className}`}
      onClick={onClick}
    >
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          width={400}
          height={300}
        />
      )}
    </div>
  );
}

export default function PhotoGallery({
  category,
  limit,
  columns = 3,
  lightbox = true,
  className = "",
}: PhotoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: allImages = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery/images', category],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) {
        params.append('category', category);
      }
      const response = await fetch(`/api/gallery/images?${params}`);
      if (!response.ok) throw new Error('Failed to fetch gallery images');
      return response.json();
    },
  });

  const images = limit ? allImages.slice(0, limit) : allImages;

  const openLightbox = (image: GalleryImage, index: number) => {
    if (lightbox) {
      setSelectedImage(image);
      setCurrentIndex(index);
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  if (isLoading) {
    return (
      <div className={`grid ${gridCols} gap-4 ${className}`}>
        {[...Array(limit || 6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video bg-muted animate-pulse" />
          </Card>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <ImageIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <p>No images available.</p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid ${gridCols} gap-4 ${className}`} data-testid="photo-gallery">
        {images.map((image, index) => (
          <Card
            key={image.id}
            className={`overflow-hidden ${lightbox ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
            data-testid={`gallery-image-${image.id}`}
          >
            <LazyImage
              src={image.publicUrl}
              alt={image.alt}
              className="aspect-video"
              onClick={() => openLightbox(image, index)}
            />
            {image.title && (
              <div className="p-3">
                <p className="text-sm font-medium truncate" data-testid={`image-title-${image.id}`}>
                  {image.title}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Lightbox Dialog */}
      {lightbox && (
        <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-7xl p-0 bg-black/95" data-testid="lightbox-dialog">
            <div className="relative h-[90vh] flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
                onClick={closeLightbox}
                data-testid="button-close-lightbox"
              >
                <X className="h-6 w-6" />
              </Button>

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 text-white hover:bg-white/20 z-10"
                    onClick={goToPrevious}
                    data-testid="button-previous-image"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 text-white hover:bg-white/20 z-10"
                    onClick={goToNext}
                    data-testid="button-next-image"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </>
              )}

              {selectedImage && (
                <div className="flex flex-col items-center justify-center w-full h-full p-8">
                  <img
                    src={selectedImage.publicUrl}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-full object-contain"
                    width={800}
                    height={600}
                    data-testid="lightbox-image"
                  />
                  {selectedImage.title && (
                    <div className="mt-4 text-center">
                      <p className="text-white text-lg font-medium" data-testid="lightbox-title">
                        {selectedImage.title}
                      </p>
                      <p className="text-white/70 text-sm mt-1">
                        {currentIndex + 1} / {images.length}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
