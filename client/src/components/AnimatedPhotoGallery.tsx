import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyImage } from '@/components/LazyImage';
import Lightbox from '@/components/Lightbox';
import { cn } from '@/lib/utils';

// PARTY ATMOSPHERE PHOTOS - Only actual party photos with people celebrating
// Verified: No empty boats, no family photos with children
const allPartyPhotos = [
  '/attached_assets/disco photo collage_1759401302941.png',
  '/attached_assets/disco unicorn collage - web_1759401302953.png',
  '/attached_assets/non-bach collage compressed_1759401302954.png',
  '/attached_assets/atx-disco-cruise-party.jpg',
  '/attached_assets/bachelor-party-group-guys.jpg',
  '/attached_assets/@capitalcityshots-1_1760080740012.jpg',
  '/attached_assets/@capitalcityshots-2_1760080740017.jpg',
  '/attached_assets/@capitalcityshots-3_1760080740017.jpg',
  '/attached_assets/@capitalcityshots-4_1760080740017.jpg',
  '/attached_assets/@capitalcityshots-5_1760080740018.jpg',
  '/attached_assets/@capitalcityshots-21_1760080807864.jpg',
  '/attached_assets/@capitalcityshots-22_1760080807865.jpg',
];

// Split into rotating sets (6 photos per set for grid display)
const setA = allPartyPhotos.slice(0, 6);
const setB = allPartyPhotos.slice(6, 12);

interface LightboxImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

export default function AnimatedPhotoGallery() {
  const [showSetA, setShowSetA] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const currentSet = showSetA ? setA : setB;

  const allPhotos: LightboxImage[] = allPartyPhotos.map((src, index) => ({
    id: `party-photo-${index + 1}`,
    src,
    alt: `Premier Party Cruises - Lake Travis Party Photo ${index + 1}`,
    title: `Party Photo ${index + 1}`,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSetA((prev) => !prev);
    }, 5000); // 5 seconds between photo switches

    return () => clearInterval(interval);
  }, []);

  const handlePhotoClick = (photoIndex: number) => {
    const globalIndex = showSetA ? photoIndex : photoIndex + 6;
    setLightboxIndex(globalIndex);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const handleLightboxPrevious = () => {
    setLightboxIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  return (
    <>
      <div 
        className="relative bg-white dark:bg-gray-950" 
        data-testid="animated-photo-gallery"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={showSetA ? 'setA' : 'setB'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
            data-testid="photo-grid"
          >
            {currentSet.map((photo, index) => (
              <motion.div
                key={photo}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg shadow-md",
                  "cursor-pointer group"
                )}
                onClick={() => handlePhotoClick(index)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                data-testid={`photo-card-${index}`}
              >
                <LazyImage
                  src={photo}
                  alt={`Premier Party Cruises - Lake Travis Party Photo ${showSetA ? index + 1 : index + 7}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox
        images={allPhotos}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={handleLightboxClose}
        onNext={handleLightboxNext}
        onPrevious={handleLightboxPrevious}
      />
    </>
  );
}
