import { useState } from 'react';
import { useLocation } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ship, Users, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import boat photos - Meeseeks The Irony
const meeseeks1 = '/attached_assets/@capitalcityshots-1_1760072938922.jpg';
const meeseeks2 = '/attached_assets/@capitalcityshots-2_1760072938923.jpg';
const meeseeks3 = '/attached_assets/@capitalcityshots-3_1760072938923.jpg';
const meeseeks4 = '/attached_assets/@capitalcityshots-4_1760072938923.jpg';
const meeseeks5 = '/attached_assets/@capitalcityshots-5_1760072938923.jpg';
const meeseeks6 = '/attached_assets/@capitalcityshots-8_1760073115406.jpg';
const meeseeks7 = '/attached_assets/@capitalcityshots-13_1760073115406.jpg';
const meeseeks8 = '/attached_assets/@capitalcityshots-17_1760073115406.jpg';
const meeseeks9 = '/attached_assets/@capitalcityshots-18_1760073115407.jpg';

// Import boat photos - Clever Girl
const cleverGirl1 = '/attached_assets/@capitalcityshots-9_1760073172208.jpg';
const cleverGirl2 = '/attached_assets/@capitalcityshots-9_1760073205047.jpg';
const cleverGirl3 = '/attached_assets/@capitalcityshots-10_1760073205050.jpg';
const cleverGirl4 = '/attached_assets/@capitalcityshots-11_1760073205050.jpg';
const cleverGirl5 = '/attached_assets/@capitalcityshots-14_1760073205050.jpg';
const cleverGirl6 = '/attached_assets/@capitalcityshots-15_1760073205051.jpg';
const cleverGirl7 = '/attached_assets/@capitalcityshots-16_1760073205051.jpg';

// Import boat photos - Day Tripper
const dayTripper1 = '/attached_assets/@capitalcityshots-32_1760073243497.jpg';
const dayTripper2 = '/attached_assets/@capitalcityshots-33_1760073243499.jpg';
const dayTripper3 = '/attached_assets/@capitalcityshots-34_1760073243499.jpg';
const dayTripper4 = '/attached_assets/@capitalcityshots-35_1760073243499.jpg';
const dayTripper5 = '/attached_assets/@capitalcityshots-36_1760073243500.jpg';
const dayTripper6 = '/attached_assets/@capitalcityshots-37_1760073243500.jpg';

interface BoatPhoto {
  url: string;
  alt: string;
}

interface BoatDetails {
  name: string;
  displayName: string;
  capacity: number;
  seatingCapacity: number;
  description: string;
  photos: BoatPhoto[];
  features?: string[];
  pricing?: string;
}

const BOAT_DATA: Record<string, BoatDetails> = {
  'ME_SEEKS_THE_IRONY': {
    name: 'Meeseeks The Irony',
    displayName: 'Meeseeks The Irony',
    capacity: 30,
    seatingCapacity: 25,
    description: 'Our beautiful covered vessel perfect for medium-sized groups. Features spacious seating, a stunning turquoise canopy, and wraparound views of Lake Travis.',
    photos: [
      { url: meeseeks1, alt: 'Meeseeks The Irony - Bow seating area with turquoise canopy' },
      { url: meeseeks2, alt: 'Meeseeks The Irony - Spacious deck with comfortable seating' },
      { url: meeseeks3, alt: 'Meeseeks The Irony - Covered deck with panoramic lake views' },
      { url: meeseeks4, alt: 'Meeseeks The Irony - Helm station and bench seating' },
      { url: meeseeks5, alt: 'Meeseeks The Irony - Alternative view of helm and seating' },
      { url: meeseeks6, alt: 'Meeseeks The Irony - Exterior view on Lake Travis' },
      { url: meeseeks7, alt: 'Meeseeks The Irony - Front view with turquoise canopy' },
      { url: meeseeks8, alt: 'Meeseeks The Irony - Seating detail with lake views' },
      { url: meeseeks9, alt: 'Meeseeks The Irony - Interior deck view' },
    ],
    features: [
      'Turquoise canopy for full shade coverage',
      'Spacious wraparound seating',
      'Professional sound system',
      'Large cooler storage',
      'Perfect for 15-30 guests',
    ]
  },
  'DAY_TRIPPER': {
    name: 'Day Tripper',
    displayName: 'Day Tripper',
    capacity: 14,
    seatingCapacity: 14,
    description: 'Our intimate vessel perfect for small groups. Features a bright blue canopy, comfortable bench seating, and a cozy atmosphere ideal for private celebrations.',
    photos: [
      { url: dayTripper1, alt: 'Day Tripper - Bow seating area with blue canopy' },
      { url: dayTripper2, alt: 'Day Tripper - Stern view with lake access' },
      { url: dayTripper3, alt: 'Day Tripper - Full deck view from helm' },
      { url: dayTripper4, alt: 'Day Tripper - Helm station with cooler' },
      { url: dayTripper5, alt: 'Day Tripper - Bow seating with panoramic views' },
      { url: dayTripper6, alt: 'Day Tripper - Disco ball and canopy detail' },
    ],
    features: [
      'Intimate setting for up to 14 guests',
      'Bright blue canopy for shade',
      'Professional captain included',
      'Cooler storage available',
      'Perfect for small celebrations',
    ]
  },
  'CLEVER_GIRL': {
    name: 'Clever Girl',
    displayName: 'Clever Girl',
    capacity: 75,
    seatingCapacity: 50,
    description: 'Our premium large vessel for grand celebrations. Features a stunning blue/purple gradient canopy with disco balls, Texas star dance floor, spacious multi-level seating, and party-ready amenities.',
    photos: [
      { url: cleverGirl1, alt: 'Clever Girl - Full deck view with gradient canopy' },
      { url: cleverGirl2, alt: 'Clever Girl - Main deck with disco balls' },
      { url: cleverGirl3, alt: 'Clever Girl - Texas star dance floor' },
      { url: cleverGirl4, alt: 'Clever Girl - Side view with wraparound seating' },
      { url: cleverGirl5, alt: 'Clever Girl - Bow section with tables' },
      { url: cleverGirl6, alt: 'Clever Girl - Alternative deck angle' },
      { url: cleverGirl7, alt: 'Clever Girl - Stern seating area' },
    ],
    features: [
      'Accommodates up to 75 guests',
      'Stunning gradient canopy with disco balls',
      'Texas star dance floor',
      'Multiple seating levels',
      'Professional crew included',
      'Perfect for weddings & large events',
    ]
  },
};

interface BoatDetailsModalProps {
  boatId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function BoatDetailsModal({ boatId, isOpen, onClose }: BoatDetailsModalProps) {
  const [, navigate] = useLocation();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const boat = BOAT_DATA[boatId];

  if (!boat) return null;

  const hasPhotos = boat.photos.length > 0;
  const currentPhoto = hasPhotos ? boat.photos[currentPhotoIndex] : null;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % boat.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + boat.photos.length) % boat.photos.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Ship className="h-6 w-6 text-brand-blue" />
            {boat.displayName}
          </DialogTitle>
          <DialogDescription>
            {boat.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Photo Gallery */}
          {hasPhotos && (
            <div className="relative">
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={currentPhoto!.url}
                  alt={currentPhoto!.alt}
                  className="w-full h-full object-cover"
                />
                
                {boat.photos.length > 1 && (
                  <>
                    {/* Navigation Arrows */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 dark:bg-gray-900/80 dark:hover:bg-gray-900/90"
                      onClick={prevPhoto}
                      data-testid="button-prev-photo"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 dark:bg-gray-900/80 dark:hover:bg-gray-900/90"
                      onClick={nextPhoto}
                      data-testid="button-next-photo"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>

                    {/* Photo Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {currentPhotoIndex + 1} / {boat.photos.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {boat.photos.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {boat.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all",
                        currentPhotoIndex === index
                          ? "border-brand-blue ring-2 ring-brand-blue/20"
                          : "border-transparent opacity-60 hover:opacity-100"
                      )}
                      data-testid={`button-thumbnail-${index}`}
                    >
                      <img
                        src={photo.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Boat Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Users className="h-8 w-8 text-brand-blue" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Capacity</div>
                <div className="text-lg font-bold">Up to {boat.capacity} guests</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Calendar className="h-8 w-8 text-brand-blue" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Seating</div>
                <div className="text-lg font-bold">{boat.seatingCapacity} seated</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Ship className="h-8 w-8 text-brand-blue" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pricing</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Varies by day - see quote builder</div>
              </div>
            </div>
          </div>

          {/* Features */}
          {boat.features && boat.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Features & Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {boat.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} data-testid="button-close-modal">
              Close
            </Button>
            <Button 
              onClick={() => navigate('/chat')}
              className="bg-brand-blue hover:bg-brand-blue/90"
              data-testid="button-book-boat"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book This Boat
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
