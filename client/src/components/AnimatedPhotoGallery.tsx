import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyImage } from '@/components/LazyImage';
import Lightbox from '@/components/Lightbox';
import { cn } from '@/lib/utils';

// ALL PARTY ATMOSPHERE PHOTOS - NO DUPLICATES, NO EMPTY BOATS
// Using all 37 @capitalcityshots photos + original 6 party photos = 43 total unique party photos
const allPartyPhotos = [
  // Original party atmosphere photos
  '/attached_assets/bachelor-party-group-guys.webp',
  '/attached_assets/atx-disco-cruise-party.webp',
  '/attached_assets/dancing-party-scene.webp',
  '/attached_assets/party-atmosphere-1.webp',
  '/attached_assets/party-atmosphere-2.webp',
  '/attached_assets/party-atmosphere-3.webp',
  // All @capitalcityshots party photos (1-37)
  '/attached_assets/@capitalcityshots-1_1760072938922.jpg',
  '/attached_assets/@capitalcityshots-2_1760072938923.jpg',
  '/attached_assets/@capitalcityshots-3_1760072938923.jpg',
  '/attached_assets/@capitalcityshots-4_1760072938923.jpg',
  '/attached_assets/@capitalcityshots-5_1760072938923.jpg',
  '/attached_assets/@capitalcityshots-6_1760080740018.jpg',
  '/attached_assets/@capitalcityshots-7_1760080740018.jpg',
  '/attached_assets/@capitalcityshots-8_1760073115406.jpg',
  '/attached_assets/@capitalcityshots-9_1760073172208.jpg',
  '/attached_assets/@capitalcityshots-10_1760073205050.jpg',
  '/attached_assets/@capitalcityshots-11_1760073205050.jpg',
  '/attached_assets/@capitalcityshots-12_1760080740019.jpg',
  '/attached_assets/@capitalcityshots-13_1760073115406.jpg',
  '/attached_assets/@capitalcityshots-14_1760073205050.jpg',
  '/attached_assets/@capitalcityshots-15_1760073205051.jpg',
  '/attached_assets/@capitalcityshots-16_1760073205051.jpg',
  '/attached_assets/@capitalcityshots-17_1760073115406.jpg',
  '/attached_assets/@capitalcityshots-18_1760073115407.jpg',
  '/attached_assets/@capitalcityshots-19_1760080740021.jpg',
  '/attached_assets/@capitalcityshots-20_1760080740021.jpg',
  '/attached_assets/@capitalcityshots-21_1760080807864.jpg',
  '/attached_assets/@capitalcityshots-22_1760080807865.jpg',
  '/attached_assets/@capitalcityshots-23_1760080807865.jpg',
  '/attached_assets/@capitalcityshots-24_1760080807866.jpg',
  '/attached_assets/@capitalcityshots-25_1760080807866.jpg',
  '/attached_assets/@capitalcityshots-26_1760080807866.jpg',
  '/attached_assets/@capitalcityshots-27_1760080807866.jpg',
  '/attached_assets/@capitalcityshots-28_1760080807867.jpg',
  '/attached_assets/@capitalcityshots-29_1760080807867.jpg',
  '/attached_assets/@capitalcityshots-30_1760080807867.jpg',
  '/attached_assets/@capitalcityshots-31_1760080807867.jpg',
  '/attached_assets/@capitalcityshots-32_1760073243497.jpg',
  '/attached_assets/@capitalcityshots-33_1760073243499.jpg',
  '/attached_assets/@capitalcityshots-34_1760073243499.jpg',
  '/attached_assets/@capitalcityshots-35_1760073243499.jpg',
  '/attached_assets/@capitalcityshots-36_1760073243500.jpg',
  '/attached_assets/@capitalcityshots-37_1760073243500.jpg',
];

// Split into rotating sets (12 photos per set for better display)
const setA = allPartyPhotos.slice(0, 12);
const setB = allPartyPhotos.slice(12, 24);
const setC = allPartyPhotos.slice(24, 36);
const setD = allPartyPhotos.slice(36, 43);

interface LightboxImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

export default function AnimatedPhotoGallery() {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const photoSets = [setA, setB, setC, setD];
  const currentSet = photoSets[currentSetIndex];

  const allPhotos: LightboxImage[] = allPartyPhotos.map((src, index) => ({
    id: `party-photo-${index + 1}`,
    src,
    alt: `Premier Party Cruises - Lake Travis Party Photo ${index + 1}`,
    title: `Party Photo ${index + 1}`,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSetIndex((prev) => (prev + 1) % photoSets.length);
    }, 5000); // 5 seconds between photo switches

    return () => clearInterval(interval);
  }, [photoSets.length]);

  const handlePhotoClick = (photoIndex: number) => {
    const globalIndex = currentSetIndex * 12 + photoIndex;
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
            key={`set-${currentSetIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
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
                  alt={`Premier Party Cruises - Lake Travis Party Photo ${currentSetIndex * 12 + index + 1}`}
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
