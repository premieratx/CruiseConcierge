import { useRef } from 'react';

export type GalleryPageType = 'bachelorette' | 'bachelor' | 'disco' | 'combined' | 'default';

interface ScrollingPhotoGalleryProps {
  className?: string;
  pageType?: GalleryPageType;
}

const photoSources = [
  '/gallery-optimized/_capitalcityshots-6.webp',
  '/gallery-optimized/_capitalcityshots-34.webp',
  '/gallery-optimized/_capitalcityshots-46.webp',
  '/gallery-optimized/_capitalcityshots-47.webp',
  '/gallery-optimized/_capitalcityshots-50.webp',
  '/gallery-optimized/_capitalcityshots-57.webp',
  '/gallery-optimized/_capitalcityshots-91.webp',
  '/gallery-optimized/_capitalcityshots-92.webp',
  '/gallery-optimized/_capitalcityshots-95.webp',
  '/gallery-optimized/_capitalcityshots-98.webp',
  '/gallery-optimized/_capitalcityshots-99.webp',
  '/gallery-optimized/_capitalcityshots-107.webp',
  '/gallery-optimized/_capitalcityshots-115.webp',
  '/gallery-optimized/_capitalcityshots-129.webp',
  '/gallery-optimized/_capitalcityshots-135.webp',
  '/gallery-optimized/_capitalcityshots-149.webp',
  '/gallery-optimized/_capitalcityshots-159.webp',
  '/gallery-optimized/_capitalcityshots-166.webp',
  '/gallery-optimized/_capitalcityshots-171.webp',
  '/gallery-optimized/_capitalcityshots-300.webp',
  '/gallery-optimized/_ccs-2.webp',
  '/gallery-optimized/_ccs-5.webp',
  '/gallery-optimized/_CCS-14.webp',
  '/gallery-optimized/_ccs-16.webp',
  '/gallery-optimized/_ccs-21.webp',
  '/gallery-optimized/_CCS-25.webp',
  '/gallery-optimized/_CCS-32.webp',
  '/gallery-optimized/_CCS-36.webp',
  '/gallery-optimized/_CCS-39.webp',
  '/gallery-optimized/_CCS-40.webp',
  '/gallery-optimized/_CCS-42.webp',
  '/gallery-optimized/_CCS-49.webp',
  '/gallery-optimized/_CCS-55.webp',
  '/gallery-optimized/_CCS-57.webp',
  '/gallery-optimized/_CCS-67.webp',
  '/gallery-optimized/_CCS-69.webp',
  '/gallery-optimized/_ccs-70.webp',
  '/gallery-optimized/_CCS-75.webp',
  '/gallery-optimized/_CCS-84.webp',
  '/gallery-optimized/_CCS-85.webp',
  '/gallery-optimized/_CCS-87.webp',
  '/gallery-optimized/_CCS-88.webp',
  '/gallery-optimized/_CCS-89.webp',
  '/gallery-optimized/_ccs-90.webp',
  '/gallery-optimized/_CCS-91.webp',
  '/gallery-optimized/_CCS-92.webp',
];

const bacheloretteAltTexts = [
  'Austin bachelorette party boat celebration on Lake Travis',
  'Lake Travis bachelorette party boat rental with friends',
  'Bachelorette party lake travis group photo',
  'Austin bachelorette party boat rental experience',
  'Boat rental bachelorette party in austin celebration',
  'Austin bachelorette party ideas on party boat',
  'Bachelorette party austin texas disco cruise',
  'Lake austin bachelorette party cruise celebration',
  'Austin bachelorette party packages on Lake Travis',
  'Best bachelorette cruises austin party group',
  'Austin texas boat rental bachelorette party fun',
  'Bachelorette party austin itinerary boat experience',
  'Outdoor austin bachelorette party on the water',
  'Austin bachelorette party boat disco dancing',
  'Lake travis bachelorette party boat friends celebrating',
  'Austin bachelorette parties on premier party cruises',
  'Bachelorette weekend in austin on party boat',
  'Cruise bachelorette party lake travis sunset',
  'Austin bachelorette party blog worthy photos',
  'Unique austin bachelorette party on disco boat',
  'Austin bachelorette party summer cruise fun',
  'Lake austin boat rentals bachelorette party group',
  'Party cruise austin bachelorette celebration',
  'Austin party cruises bachelorette experience',
  'Bachelorette party packages austin tx boat rental',
  'Austin bachelorette party boat with disco lights',
  'Lake travis boat parties bachelorette groups',
  'Austin party boats bachelorette weekend cruise',
  'Best austin bachelorette party boat experience',
  'Bachelorette party austin celebration on water',
  'Austin bachelorette party ideas disco cruise',
  'Party boat austin tx bachelorette fun',
  'Bachelorette party lake travis dancing',
  'Austin texas bachelorette party boat rental',
  'Austin bachelorette party on Lake Travis',
  'Bachelorette weekend austin tx party cruise',
  'Party boats austin bachelorette celebration',
  'Austin bachelorette party cruise memories',
  'Lake travis bachelorette party boat experience',
  'Austin party cruises bachelorette groups',
  'Bachelorette party austin disco boat fun',
  'Austin bachelorette party itinerary boat day',
  'Party boat in austin bachelorette groups',
  'Austin bachelorette party boats celebration',
  'Best bachelorette party austin boat experience',
  'Austin bachelorette party ideas lake travis',
];

const bachelorAltTexts = [
  'Lake travis bachelor party boat celebration',
  'Bachelor party boat austin texas experience',
  'Austin bachelor party ideas on party boat',
  'Lake travis bachelor party boat rental fun',
  'Party boat austin bachelor celebration',
  'Austin boat party bachelor weekend',
  'Bachelor party austin texas disco cruise',
  'Lake travis bachelor party boat friends',
  'Party boats austin tx bachelor groups',
  'Austin texas boat party bachelor experience',
  'Bachelor party lake travis boat rental',
  'Party boat austin bachelor party fun',
  'Austin party boats bachelor celebration',
  'Lake travis bachelor party cruise sunset',
  'Bachelor party austin disco boat dancing',
  'Party boat in austin bachelor groups',
  'Austin bachelor party on Lake Travis',
  'Lake travis boat parties bachelor weekend',
  'Bachelor party boat austin experience',
  'Austin party cruises bachelor celebration',
  'Party boats austin bachelor party ideas',
  'Lake travis bachelor party boat disco',
  'Austin bachelor party cruise memories',
  'Party boat austin tx bachelor fun',
  'Bachelor party austin boat rental',
  'Austin texas bachelor party on water',
  'Lake travis bachelor party celebration',
  'Party boat bachelor austin texas',
  'Austin bachelor party ideas lake travis',
  'Bachelor party boat lake travis fun',
  'Party boats in austin bachelor groups',
  'Austin bachelor party disco cruise',
  'Lake travis bachelor party experience',
  'Party boat austin bachelor celebration',
  'Austin bachelor party boat rental',
  'Bachelor party austin lake travis',
  'Party cruises austin bachelor weekend',
  'Lake travis boat rental bachelor party',
  'Austin bachelor party cruise fun',
  'Bachelor party boats austin texas',
  'Party boat austin bachelor ideas',
  'Lake travis bachelor party boat day',
  'Austin bachelor party celebration',
  'Bachelor party austin disco boat',
  'Party boats austin bachelor experience',
  'Lake travis bachelor party memories',
];

const discoAltTexts = [
  'ATX disco cruise party boat celebration',
  'Disco boat cruise austin party experience',
  'Premier party cruises austin disco celebration',
  'Disco cruise austin lake travis fun',
  'ATX disco cruise friends dancing',
  'Austin party cruises disco boat experience',
  'Premier party cruise austin celebration',
  'Disco cruise party austin texas',
  'ATX disco cruise lake travis sunset',
  'Austin party cruises prices disco experience',
  'Premier party cruises disco boat fun',
  'Disco boat cruise celebration austin',
  'ATX disco cruise party atmosphere',
  'Austin disco cruise friends celebrating',
  'Premier party cruises lake travis disco',
  'Disco cruise austin party group',
  'ATX disco cruise experience memories',
  'Austin party cruises disco dancing',
  'Premier party cruise disco celebration',
  'Disco boat austin lake travis party',
  'ATX disco cruise group fun',
  'Austin disco cruise celebration',
  'Premier party cruises austin experience',
  'Disco cruise lake travis party',
  'ATX disco cruise friends partying',
  'Austin party cruises disco atmosphere',
  'Premier party cruise lake travis',
  'Disco boat cruise friends austin',
  'ATX disco cruise celebration fun',
  'Austin disco cruise party boat',
  'Premier party cruises disco experience',
  'Disco cruise austin celebration',
  'ATX disco cruise lake travis party',
  'Austin party cruises disco group',
  'Premier party cruise disco fun',
  'Disco boat austin celebration',
  'ATX disco cruise party experience',
  'Austin disco cruise friends',
  'Premier party cruises celebration',
  'Disco cruise lake travis fun',
  'ATX disco cruise austin party',
  'Austin party cruises experience',
  'Premier party cruise celebration',
  'Disco boat cruise lake travis',
  'ATX disco cruise fun memories',
  'Austin disco cruise celebration',
];

const combinedAltTexts = [
  'Party boat austin combined celebration',
  'Austin texas boat party group fun',
  'Party boats austin texas celebration',
  'Rent a party boat austin experience',
  'Party boat austin tx group celebration',
  'Austin boat party combined groups',
  'Party boats in austin celebration fun',
  'Texas party boats austin lake travis',
  'Party boat austin celebration',
  'Austin party boat rental experience',
  'Party boats austin celebration fun',
  'Boat party austin combined groups',
  'Party boat in austin group fun',
  'Austin texas party boat celebration',
  'Party boats austin texas experience',
  'Rent a party boat austin fun',
  'Party boat austin tx celebration',
  'Austin boat party group experience',
  'Party boats austin group fun',
  'Texas boat party austin celebration',
  'Party boat austin rental experience',
  'Austin party boats celebration',
  'Party boat austin groups fun',
  'Boat party austin texas celebration',
  'Party boats austin experience',
  'Austin party boat celebration',
  'Party boat in austin celebration',
  'Texas party boats celebration',
  'Party boat austin experience fun',
  'Austin texas boat party groups',
  'Party boats austin texas fun',
  'Rent a party boat austin celebration',
  'Party boat austin tx experience',
  'Austin boat party celebration',
  'Party boats in austin experience',
  'Texas party boats austin fun',
  'Party boat austin group celebration',
  'Austin party boat experience',
  'Party boats austin groups celebration',
  'Boat party austin experience',
  'Party boat austin celebration fun',
  'Austin texas party boat groups',
  'Party boats austin celebration experience',
  'Party boat austin texas fun',
  'Austin party boats experience',
  'Party boat in austin experience fun',
];

const defaultAltTexts = [
  'Party cruise celebration on Lake Travis',
  'Lake Travis party boat experience',
  'Group celebration on party boat',
  'Friends on party cruise',
  'Party on Lake Travis boat',
  'Celebration on party cruise',
  'Party boat fun on the water',
  'Disco cruise celebration',
  'Friends celebrating on boat',
  'Party cruise group experience',
  'Lake Travis celebration cruise',
  'Group photo on party boat',
  'Party atmosphere on cruise',
  'Disco party cruise fun',
  'Friends on lake cruise',
  'Celebration cruise experience',
  'Party boat group fun',
  'Lake Travis party experience',
  'Boat party celebration',
  'Cruise celebration fun',
  'Party cruise friends',
  'Group on party boat',
  'Lake Travis disco cruise',
  'Party celebration on boat',
  'Friends cruising together',
  'Boat party group celebration',
  'Party boat experience',
  'Cruise celebration group',
  'Group photo on cruise',
  'Party cruise experience',
  'Lake Travis fun on boat',
  'Disco party on cruise',
  'Friends on party boat',
  'Party atmosphere cruise',
  'Celebration cruise fun',
  'Group celebration party',
  'Party boat on lake',
  'Lake Travis party cruise',
  'Disco cruise fun',
  'Friends partying on boat',
  'Boat celebration party',
  'Party cruise fun experience',
  'Group on cruise boat',
  'Lake Travis cruise party',
  'Party celebration cruise',
  'Disco party fun on boat',
];

function getAltTexts(pageType: GalleryPageType): string[] {
  switch (pageType) {
    case 'bachelorette':
      return bacheloretteAltTexts;
    case 'bachelor':
      return bachelorAltTexts;
    case 'disco':
      return discoAltTexts;
    case 'combined':
      return combinedAltTexts;
    default:
      return defaultAltTexts;
  }
}

export default function ScrollingPhotoGallery({ className = '', pageType = 'default' }: ScrollingPhotoGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const altTexts = getAltTexts(pageType);
  const partyPhotos = photoSources.map((src, index) => ({
    src,
    alt: altTexts[index % altTexts.length]
  }));
  
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
