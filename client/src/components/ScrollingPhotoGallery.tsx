import { useEffect, useRef } from 'react';

interface ScrollingPhotoGalleryProps {
  className?: string;
}

const partyPhotos = [
  { src: '/gallery-optimized/_capitalcityshots-6.webp', alt: 'Party cruise celebration' },
  { src: '/gallery-optimized/_capitalcityshots-34.webp', alt: 'Lake Travis party boat' },
  { src: '/gallery-optimized/_capitalcityshots-46.webp', alt: 'Group celebration on boat' },
  { src: '/gallery-optimized/_capitalcityshots-47.webp', alt: 'Friends on party cruise' },
  { src: '/gallery-optimized/_capitalcityshots-50.webp', alt: 'Bachelor party on Lake Travis' },
  { src: '/gallery-optimized/_capitalcityshots-57.webp', alt: 'Bachelorette celebration' },
  { src: '/gallery-optimized/_capitalcityshots-91.webp', alt: 'Party boat fun' },
  { src: '/gallery-optimized/_capitalcityshots-92.webp', alt: 'Disco cruise celebration' },
  { src: '/gallery-optimized/_capitalcityshots-95.webp', alt: 'Friends celebrating' },
  { src: '/gallery-optimized/_capitalcityshots-98.webp', alt: 'Party cruise group' },
  { src: '/gallery-optimized/_capitalcityshots-99.webp', alt: 'Lake Travis celebration' },
  { src: '/gallery-optimized/_capitalcityshots-107.webp', alt: 'Group photo on boat' },
  { src: '/gallery-optimized/_capitalcityshots-115.webp', alt: 'Party atmosphere' },
  { src: '/gallery-optimized/_capitalcityshots-129.webp', alt: 'Disco party cruise' },
  { src: '/gallery-optimized/_capitalcityshots-135.webp', alt: 'Friends on cruise' },
  { src: '/gallery-optimized/_capitalcityshots-149.webp', alt: 'Celebration cruise' },
  { src: '/gallery-optimized/_capitalcityshots-159.webp', alt: 'Party boat group' },
  { src: '/gallery-optimized/_capitalcityshots-166.webp', alt: 'Lake Travis party' },
  { src: '/gallery-optimized/_capitalcityshots-171.webp', alt: 'Boat party fun' },
  { src: '/gallery-optimized/_capitalcityshots-300.webp', alt: 'Cruise celebration' },
  { src: '/gallery-optimized/_ccs-2.webp', alt: 'Party cruise friends' },
  { src: '/gallery-optimized/_ccs-5.webp', alt: 'Group on party boat' },
  { src: '/gallery-optimized/_CCS-14.webp', alt: 'Lake Travis disco' },
  { src: '/gallery-optimized/_ccs-16.webp', alt: 'Party celebration' },
  { src: '/gallery-optimized/_ccs-21.webp', alt: 'Friends cruising' },
  { src: '/gallery-optimized/_CCS-25.webp', alt: 'Boat party group' },
  { src: '/gallery-optimized/_CCS-32.webp', alt: 'Party boat fun' },
  { src: '/gallery-optimized/_CCS-36.webp', alt: 'Cruise celebration' },
  { src: '/gallery-optimized/_CCS-39.webp', alt: 'Group photo' },
  { src: '/gallery-optimized/_CCS-40.webp', alt: 'Party cruise' },
  { src: '/gallery-optimized/_CCS-42.webp', alt: 'Lake Travis fun' },
  { src: '/gallery-optimized/_CCS-49.webp', alt: 'Disco party' },
  { src: '/gallery-optimized/_CCS-55.webp', alt: 'Friends on boat' },
  { src: '/gallery-optimized/_CCS-57.webp', alt: 'Party atmosphere' },
  { src: '/gallery-optimized/_CCS-67.webp', alt: 'Celebration cruise' },
  { src: '/gallery-optimized/_CCS-69.webp', alt: 'Group celebration' },
  { src: '/gallery-optimized/_ccs-70.webp', alt: 'Party boat' },
  { src: '/gallery-optimized/_CCS-75.webp', alt: 'Lake Travis party' },
  { src: '/gallery-optimized/_CCS-84.webp', alt: 'Disco cruise' },
  { src: '/gallery-optimized/_CCS-85.webp', alt: 'Friends partying' },
  { src: '/gallery-optimized/_CCS-87.webp', alt: 'Boat celebration' },
  { src: '/gallery-optimized/_CCS-88.webp', alt: 'Party cruise fun' },
  { src: '/gallery-optimized/_CCS-89.webp', alt: 'Group on cruise' },
  { src: '/gallery-optimized/_ccs-90.webp', alt: 'Lake Travis cruise' },
  { src: '/gallery-optimized/_CCS-91.webp', alt: 'Party celebration' },
  { src: '/gallery-optimized/_CCS-92.webp', alt: 'Disco party fun' },
];

export default function ScrollingPhotoGallery({ className = '' }: ScrollingPhotoGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const rows = [
    partyPhotos.slice(0, 12),
    partyPhotos.slice(12, 24),
    partyPhotos.slice(24, 36),
    partyPhotos.slice(36, 48),
  ];

  return (
    <div className={`overflow-hidden py-8 ${className}`}>
      <div className="space-y-3" ref={containerRef}>
        {rows.map((row, rowIndex) => (
          <div 
            key={rowIndex}
            className="flex gap-3"
            style={{
              animation: `scroll-${rowIndex % 2 === 0 ? 'left' : 'right'} ${40 + rowIndex * 5}s linear infinite`,
            }}
          >
            {[...row, ...row].map((photo, idx) => (
              <div 
                key={`${rowIndex}-${idx}`}
                className="flex-shrink-0 w-48 h-36 md:w-56 md:h-40 lg:w-64 lg:h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
