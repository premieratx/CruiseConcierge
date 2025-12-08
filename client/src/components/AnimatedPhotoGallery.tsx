import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyImage } from '@/components/LazyImage';
import Lightbox from '@/components/Lightbox';
import { cn } from '@/lib/utils';
import { CAPITAL_CITY_SHOTS } from '@/lib/media';

// VERIFIED PARTY PHOTOS WITH PEOPLE CELEBRATING - NO EMPTY BOATS
// Using Capital City Shots - real party photos with actual guests (24 photos for 4 sets of 6)
const allPartyPhotos = [
  CAPITAL_CITY_SHOTS.party1,
  CAPITAL_CITY_SHOTS.party2,
  CAPITAL_CITY_SHOTS.party3,
  CAPITAL_CITY_SHOTS.party4,
  CAPITAL_CITY_SHOTS.party5,
  CAPITAL_CITY_SHOTS.party6,
  CAPITAL_CITY_SHOTS.party7,
  CAPITAL_CITY_SHOTS.party8,
  CAPITAL_CITY_SHOTS.party9,
  CAPITAL_CITY_SHOTS.party10,
  CAPITAL_CITY_SHOTS.party11,
  CAPITAL_CITY_SHOTS.party12,
  CAPITAL_CITY_SHOTS.party13,
  CAPITAL_CITY_SHOTS.party14,
  CAPITAL_CITY_SHOTS.party15,
  CAPITAL_CITY_SHOTS.party16,
  CAPITAL_CITY_SHOTS.party17,
  CAPITAL_CITY_SHOTS.party18,
  CAPITAL_CITY_SHOTS.party19,
  CAPITAL_CITY_SHOTS.party20,
  CAPITAL_CITY_SHOTS.party21,
  CAPITAL_CITY_SHOTS.party22,
  CAPITAL_CITY_SHOTS.party23,
  CAPITAL_CITY_SHOTS.party24,
];

// Split into rotating sets (6 photos per set for grid display)
const setA = allPartyPhotos.slice(0, 6);
const setB = allPartyPhotos.slice(6, 12);
const setC = allPartyPhotos.slice(12, 18);
const setD = allPartyPhotos.slice(18, 24);
const allSets = [setA, setB, setC, setD];

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

  const currentSet = allSets[currentSetIndex];

  const allPhotos: LightboxImage[] = allPartyPhotos.map((src, index) => ({
    id: `party-photo-${index + 1}`,
    src,
    alt: `Premier Party Cruises - Lake Travis Party Photo ${index + 1}`,
    title: `Party Photo ${index + 1}`,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSetIndex((prev) => (prev + 1) % allSets.length);
    }, 5000); // 5 seconds between photo switches

    return () => clearInterval(interval);
  }, []);

  const handlePhotoClick = (photoIndex: number) => {
    const globalIndex = currentSetIndex * 6 + photoIndex;
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
                  alt={`Premier Party Cruises - Lake Travis Party Photo ${currentSetIndex * 6 + index + 1}`}
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
