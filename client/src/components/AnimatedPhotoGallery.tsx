import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyImage } from '@/components/LazyImage';
import Lightbox from '@/components/Lightbox';
import { cn } from '@/lib/utils';

const setA = [
  '/attached_assets/@capitalcityshots-1_1760080740012.jpg',
  '/attached_assets/@capitalcityshots-2_1760080740017.jpg',
  '/attached_assets/@capitalcityshots-3_1760080740017.jpg',
  '/attached_assets/@capitalcityshots-4_1760080740017.jpg',
  '/attached_assets/@capitalcityshots-5_1760080740018.jpg',
  '/attached_assets/@capitalcityshots-6_1760080740018.jpg',
  '/attached_assets/@capitalcityshots-7_1760080740018.jpg',
  '/attached_assets/@capitalcityshots-8_1760080740018.jpg',
  '/attached_assets/@capitalcityshots-9_1760080740019.jpg',
  '/attached_assets/@capitalcityshots-10_1760080740019.jpg',
  '/attached_assets/@capitalcityshots-11_1760080740019.jpg',
  '/attached_assets/@capitalcityshots-12_1760080740019.jpg',
  '/attached_assets/@capitalcityshots-13_1760080740020.jpg',
  '/attached_assets/@capitalcityshots-14_1760080740020.jpg',
  '/attached_assets/@capitalcityshots-15_1760080740020.jpg',
  '/attached_assets/@capitalcityshots-16_1760080740020.jpg',
];

const setB = [
  '/attached_assets/@capitalcityshots-17_1760080740020.jpg',
  '/attached_assets/@capitalcityshots-18_1760080740021.jpg',
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
  '/attached_assets/@capitalcityshots-32_1760080807868.jpg',
];

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

  const allPhotos: LightboxImage[] = [...setA, ...setB].map((src, index) => ({
    id: `party-photo-${index + 1}`,
    src,
    alt: `Premier Party Cruises - Lake Travis Party Photo ${index + 1}`,
    title: `Party Photo ${index + 1}`,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSetA((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePhotoClick = (photoIndex: number) => {
    const globalIndex = showSetA ? photoIndex : photoIndex + 16;
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
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
                  alt={`Premier Party Cruises - Lake Travis Party Photo ${showSetA ? index + 1 : index + 17}`}
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
