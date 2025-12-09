import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyImage } from '@/components/LazyImage';
import Lightbox from '@/components/Lightbox';
import { cn } from '@/lib/utils';
import { CAPITAL_CITY_SHOTS } from '@/lib/media';

// VERIFIED PARTY PHOTOS WITH PEOPLE CELEBRATING - NO EMPTY BOATS
// Using Capital City Shots - real party photos with actual guests (24 photos for 4 sets of 6)
const allPartyPhotos = [
  // Set A - Disco photos
  CAPITAL_CITY_SHOTS.disco1,
  CAPITAL_CITY_SHOTS.disco2,
  CAPITAL_CITY_SHOTS.disco3,
  CAPITAL_CITY_SHOTS.disco4,
  CAPITAL_CITY_SHOTS.disco5,
  CAPITAL_CITY_SHOTS.disco6,
  // Set B - Bachelor photos
  CAPITAL_CITY_SHOTS.bach1,
  CAPITAL_CITY_SHOTS.bach2,
  CAPITAL_CITY_SHOTS.bach3,
  CAPITAL_CITY_SHOTS.bach4,
  CAPITAL_CITY_SHOTS.bach5,
  CAPITAL_CITY_SHOTS.bach6,
  // Set C - Bachelorette photos
  CAPITAL_CITY_SHOTS.bachelorette1,
  CAPITAL_CITY_SHOTS.bachelorette2,
  CAPITAL_CITY_SHOTS.bachelorette3,
  CAPITAL_CITY_SHOTS.bachelorette4,
  CAPITAL_CITY_SHOTS.bachelorette5,
  CAPITAL_CITY_SHOTS.bachelorette6,
  // Set D - Combined photos
  CAPITAL_CITY_SHOTS.combined1,
  CAPITAL_CITY_SHOTS.combined2,
  CAPITAL_CITY_SHOTS.combined3,
  CAPITAL_CITY_SHOTS.combined4,
  CAPITAL_CITY_SHOTS.combined5,
  CAPITAL_CITY_SHOTS.combined6,
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
                  aspectRatio="1/1"
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
