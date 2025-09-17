import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LightboxImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  photographer?: string;
  location?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onImageClick?: (image: LightboxImage, index: number) => void;
}

export default function Lightbox({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  onImageClick
}: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);

  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case ' ':
          event.preventDefault();
          setIsZoomed(!isZoomed);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious, isZoomed]);

  // Auto-hide controls
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }

    setShowControls(true);
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    setControlsTimeout(timeout);
  }, [controlsTimeout]);

  useEffect(() => {
    if (isOpen) {
      resetControlsTimeout();
    }

    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [isOpen, currentIndex, resetControlsTimeout]);

  const handleMouseMove = useCallback(() => {
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const handleShare = async () => {
    if (!currentImage) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title || 'Premier Party Cruises Gallery',
          text: currentImage.description || 'Check out this amazing photo from Premier Party Cruises!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const handleDownload = () => {
    if (!currentImage) return;
    
    const link = document.createElement('a');
    link.href = currentImage.src;
    link.download = `premier-party-cruises-${currentImage.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onMouseMove={handleMouseMove}
        data-testid="lightbox-overlay"
      >
        {/* Close button */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="absolute top-6 right-6 z-60"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-12 w-12 text-white hover:bg-white/10 bg-black/20 backdrop-blur-sm"
                data-testid="button-lightbox-close"
              >
                <X className="h-6 w-6" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <AnimatePresence>
          {showControls && images.length > 1 && (
            <>
              <motion.div
                className="absolute left-6 top-1/2 -translate-y-1/2 z-60"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPrevious}
                  disabled={currentIndex === 0}
                  className="h-12 w-12 text-white hover:bg-white/10 bg-black/20 backdrop-blur-sm disabled:opacity-50"
                  data-testid="button-lightbox-previous"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
              </motion.div>

              <motion.div
                className="absolute right-6 top-1/2 -translate-y-1/2 z-60"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNext}
                  disabled={currentIndex === images.length - 1}
                  className="h-12 w-12 text-white hover:bg-white/10 bg-black/20 backdrop-blur-sm disabled:opacity-50"
                  data-testid="button-lightbox-next"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Image container */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <motion.div
            className={cn(
              "relative max-w-full max-h-full transition-transform duration-300 cursor-pointer",
              isZoomed ? "scale-150" : "scale-100"
            )}
            onClick={() => setIsZoomed(!isZoomed)}
            data-testid="lightbox-image-container"
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-full object-contain"
              onLoad={() => setIsLoading(false)}
              onLoadStart={() => setIsLoading(true)}
              data-testid={`lightbox-image-${currentImage.id}`}
            />
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
              </div>
            )}
          </motion.div>
        </div>

        {/* Controls bar */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="max-w-4xl mx-auto">
                {/* Image info */}
                <div className="mb-4 text-white">
                  {currentImage.title && (
                    <h3 className="text-2xl font-bold mb-2" data-testid={`lightbox-title-${currentImage.id}`}>
                      {currentImage.title}
                    </h3>
                  )}
                  {currentImage.description && (
                    <p className="text-gray-300 mb-2" data-testid={`lightbox-description-${currentImage.id}`}>
                      {currentImage.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    {currentImage.location && (
                      <span data-testid={`lightbox-location-${currentImage.id}`}>
                        📍 {currentImage.location}
                      </span>
                    )}
                    {currentImage.photographer && (
                      <span data-testid={`lightbox-photographer-${currentImage.id}`}>
                        📸 {currentImage.photographer}
                      </span>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="text-white hover:bg-white/10"
                      data-testid="button-lightbox-zoom"
                    >
                      {isZoomed ? <ZoomOut className="h-4 w-4 mr-2" /> : <ZoomIn className="h-4 w-4 mr-2" />}
                      {isZoomed ? 'Zoom Out' : 'Zoom In'}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleShare}
                      className="text-white hover:bg-white/10"
                      data-testid="button-lightbox-share"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDownload}
                      className="text-white hover:bg-white/10"
                      data-testid="button-lightbox-download"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  {images.length > 1 && (
                    <div className="text-white text-sm">
                      {currentIndex + 1} of {images.length}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}