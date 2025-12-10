import { LazyImage } from '@/components/LazyImage';
import { cn } from '@/lib/utils';
import { FLEET_PHOTOS, DISCO_FUN_PHOTOS, BOAT_SCENIC_PHOTOS } from '@/lib/media';

export type BoatSize = 'small' | 'medium' | 'large';
export type PhotoType = 'boat' | 'party' | 'scenic';

interface BlogImageBreakProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspectRatio?: string;
  rounded?: boolean;
}

export function BlogImageBreak({ 
  src, 
  alt, 
  caption,
  className,
  aspectRatio = '16/9',
  rounded = true
}: BlogImageBreakProps) {
  return (
    <figure 
      className={cn(
        "my-8 md:my-12",
        className
      )}
      data-testid="blog-image-break"
    >
      <div 
        className={cn(
          "overflow-hidden shadow-lg",
          rounded && "rounded-xl"
        )}
        style={{ aspectRatio }}
      >
        <LazyImage
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          aspectRatio={aspectRatio}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

interface BlogPhotoStripProps {
  photos: Array<{ src: string; alt: string; caption?: string }>;
  className?: string;
  columns?: 2 | 3;
}

export function BlogPhotoStrip({ 
  photos, 
  className,
  columns = 2
}: BlogPhotoStripProps) {
  return (
    <div 
      className={cn(
        "my-8 md:my-12 grid gap-4",
        columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
      data-testid="blog-photo-strip"
    >
      {photos.map((photo, index) => (
        <figure key={index} className="overflow-hidden rounded-lg shadow-md">
          <LazyImage
            src={photo.src}
            alt={photo.alt}
            className="w-full h-48 sm:h-56 object-cover"
            aspectRatio="4/3"
          />
          {photo.caption && (
            <figcaption className="p-2 text-xs text-gray-600 dark:text-gray-400 text-center bg-gray-50 dark:bg-gray-800">
              {photo.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

interface BlogPartyGalleryProps {
  title?: string;
  className?: string;
}

export function BlogPartyGallery({ 
  title = "Real Party Moments on Lake Travis",
  className 
}: BlogPartyGalleryProps) {
  const partyPhotos = [
    { src: DISCO_FUN_PHOTOS.groupFloat, alt: 'Bachelorette group on rainbow float at Lake Travis' },
    { src: DISCO_FUN_PHOTOS.champagneSpray, alt: 'Champagne celebration on party boat' },
    { src: DISCO_FUN_PHOTOS.brideGroup, alt: 'Bride and friends celebrating on boat cruise' },
    { src: DISCO_FUN_PHOTOS.heartSunglasses, alt: 'Party group with heart sunglasses on Lake Travis' },
  ];

  return (
    <div className={cn("my-10 md:my-16", className)} data-testid="blog-party-gallery">
      {title && (
        <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {partyPhotos.map((photo, index) => (
          <div 
            key={index} 
            className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <LazyImage
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              aspectRatio="1/1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const BLOG_BOAT_PHOTOS = {
  small: {
    src: FLEET_PHOTOS.dayTripper,
    alt: 'Day Tripper - Perfect for intimate groups up to 14 guests',
    caption: 'Day Tripper: Ideal for groups of 6-14 guests'
  },
  medium: {
    src: FLEET_PHOTOS.meeseeks,
    alt: 'Meeseeks - Great for medium groups up to 30 guests',
    caption: 'Meeseeks: Perfect for groups of 15-30 guests'
  },
  large: {
    src: FLEET_PHOTOS.cleverGirl,
    alt: 'Clever Girl - Our flagship for large groups up to 75 guests',
    caption: 'Clever Girl: Flagship vessel for groups of 30-75 guests'
  }
} as const;

export const BLOG_PARTY_PHOTOS = {
  celebration: {
    src: DISCO_FUN_PHOTOS.champagnePop,
    alt: 'Captain popping champagne for celebration on Lake Travis'
  },
  bachelorette: {
    src: DISCO_FUN_PHOTOS.brideGroup,
    alt: 'Bride and friends celebrating on Lake Travis boat cruise'
  },
  bachelor: {
    src: '/attached_assets/bachelor-party-group-guys.webp',
    alt: 'Bachelor party group celebrating on Lake Travis'
  },
  dancing: {
    src: BOAT_SCENIC_PHOTOS.cleverGirlDanceFloor,
    alt: 'Dance floor with disco lights on Clever Girl party boat'
  },
  group: {
    src: DISCO_FUN_PHOTOS.sunHatsGroup,
    alt: 'Party group with sun hats enjoying Lake Travis cruise'
  },
  float: {
    src: DISCO_FUN_PHOTOS.groupFloat,
    alt: 'Guests on rainbow float during Lake Travis party'
  },
  hearts: {
    src: DISCO_FUN_PHOTOS.heartSunglasses,
    alt: 'Party guests with heart sunglasses on boat cruise'
  },
  tropical: {
    src: DISCO_FUN_PHOTOS.tropicalGroup,
    alt: 'Tropical themed party group on Lake Travis'
  }
} as const;

export function getBoatPhotoForGroupSize(groupSize: number): { src: string; alt: string; caption: string } {
  if (groupSize <= 14) return BLOG_BOAT_PHOTOS.small;
  if (groupSize <= 30) return BLOG_BOAT_PHOTOS.medium;
  return BLOG_BOAT_PHOTOS.large;
}
