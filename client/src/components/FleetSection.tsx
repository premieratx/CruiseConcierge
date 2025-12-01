import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LazyImage } from '@/components/LazyImage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Ship, Users, DollarSign, Package, ArrowRight, Eye, ChevronLeft, ChevronRight
} from 'lucide-react';
import { formatCurrency } from '@shared/formatters';
import { HOURLY_RATES, PACKAGE_FLAT_FEES, CREW_FEES } from '@shared/constants';

interface LightboxImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface BoatDetails {
  id: string;
  name: string;
  displayName: string;
  capacity: string;
  seatingCapacity: number;
  maxCapacity: number;
  baseRate4Hr: {
    weekday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
  startingPrice: string;
  description: string;
  features: string[];
  heroImage: string;
  galleryImages: LightboxImage[];
  packages: {
    standard: boolean;
    essentials: number;
    ultimate: number;
  };
  highlighted?: boolean;
  availabilityNote?: string;
  crewFeeNote?: string;
}

const boats: BoatDetails[] = [
  {
    id: 'day-tripper',
    name: 'Day Tripper',
    displayName: 'Day Tripper',
    capacity: '1-14 guests',
    seatingCapacity: 14,
    maxCapacity: 14,
    baseRate4Hr: {
      weekday: HOURLY_RATES.MON_THU[14] * 4,
      friday: HOURLY_RATES.FRIDAY[14] * 4,
      saturday: HOURLY_RATES.SATURDAY[14] * 4,
      sunday: HOURLY_RATES.SUNDAY[14] * 4,
    },
    startingPrice: formatCurrency(HOURLY_RATES.MON_THU[14] * 4),
    description: 'Perfect for intimate gatherings and small celebrations',
    features: [
      'Licensed, fun, experienced captain',
      'Premium Bluetooth sound system',
      'Empty coolers (BYOB friendly)',
      'Comfortable seating for 14',
      'Sun and shade areas',
      'Clean restroom facilities',
      '4-hour cruise duration'
    ],
    heroImage: '/attached_assets/day-tripper-14-person-boat.webp',
    galleryImages: [
      {
        id: 'day-tripper-1',
        src: '/attached_assets/day-tripper-14-person-boat.webp',
        alt: 'Day Tripper 14-person party boat on Lake Travis',
        title: 'Day Tripper',
        description: 'Our intimate 14-person boat perfect for small gatherings'
      },
      {
        id: 'day-tripper-2',
        src: '/attached_assets/day tripper - party boat rental austin_1763968078448.jpg',
        alt: 'Day Tripper deck with blue canopy shade',
        title: 'Shaded Seating',
        description: 'Comfortable benches with full sun protection'
      },
      {
        id: 'day-tripper-3',
        src: '/attached_assets/day tripper-1 party boat with captain austin_1763968078449.jpg',
        alt: 'Day Tripper boat rear view on water',
        title: 'Rear Deck View',
        description: 'Classic party boat design with modern amenities'
      },
      {
        id: 'day-tripper-4',
        src: '/attached_assets/day tripper-2 party boat austin lake travis_1763968078449.jpg',
        alt: 'Day Tripper interior deck layout',
        title: 'Spacious Deck Layout',
        description: 'Well-organized seating arrangement for 14 guests'
      },
      {
        id: 'day-tripper-5',
        src: '/attached_assets/day tripper-3 party boat austin_1763968078451.jpg',
        alt: 'Day Tripper open water view from bow',
        title: 'Bow View',
        description: 'Scenic views from the front of the boat'
      },
      {
        id: 'day-tripper-6',
        src: '/attached_assets/day tripper-5 party barge lake travis_1763968078452.jpg',
        alt: 'Day Tripper cabin and deck view',
        title: 'Captain Cabin',
        description: 'Premium navigation station with cooler storage'
      },
      {
        id: 'day-tripper-7',
        src: '/attached_assets/day tripper-6 party boat austin_1763968078452.jpg',
        alt: 'Day Tripper front view with lifeboat',
        title: 'Safety Features',
        description: 'Professional safety equipment and captain station'
      }
    ],
    packages: {
      standard: true,
      essentials: PACKAGE_FLAT_FEES.ESSENTIALS[14],
      ultimate: PACKAGE_FLAT_FEES.ULTIMATE[14],
    }
  },
  {
    id: 'me-seeks-the-irony',
    name: 'Meeseeks The Irony',
    displayName: 'Meeseeks / The Irony',
    capacity: '15-30 guests',
    seatingCapacity: 20,
    maxCapacity: 30,
    baseRate4Hr: {
      weekday: HOURLY_RATES.MON_THU[25] * 4,
      friday: HOURLY_RATES.FRIDAY[25] * 4,
      saturday: HOURLY_RATES.SATURDAY[25] * 4,
      sunday: HOURLY_RATES.SUNDAY[25] * 4,
    },
    startingPrice: formatCurrency(HOURLY_RATES.MON_THU[25] * 4),
    description: 'Ideal for medium groups and popular bachelor/bachelorette parties',
    features: [
      'Licensed, fun, experienced captain',
      'Premium Bluetooth sound system',
      'Spacious deck with multiple seating areas',
      'Large cooler space (BYOB friendly)',
      'Sun and shade coverage',
      'Clean restroom facilities',
      '4-hour cruise duration'
    ],
    heroImage: '/attached_assets/meeseeks-25-person-boat.webp',
    galleryImages: [
      {
        id: 'meeseeks-1',
        src: '/attached_assets/meeseeks-25-person-boat.webp',
        alt: 'Meeseeks 25-30 person party boat on Lake Travis',
        title: 'Meeseeks / The Irony',
        description: 'Our twin 25-30 person boats - 2 boats available for maximum flexibility'
      },
      {
        id: 'meeseeks-2',
        src: '/attached_assets/meeseeks-1_1763968010088.jpg',
        alt: 'Meeseeks boat seating area with Lake Travis views',
        title: 'Comfortable Seating',
        description: 'Spacious deck with comfortable wicker seating'
      },
      {
        id: 'meeseeks-3',
        src: '/attached_assets/meeseeks-2_1763968010089.jpg',
        alt: 'Meeseeks boat covered deck on Lake Travis',
        title: 'Shaded Deck Area',
        description: 'Generous shade coverage with scenic lake views'
      },
      {
        id: 'meeseeks-4',
        src: '/attached_assets/meeseeks-3 lake travis party boat_1763968010089.jpg',
        alt: 'Meeseeks boat interior deck view',
        title: 'Full Deck View',
        description: 'Wide open deck space for your group'
      },
      {
        id: 'meeseeks-5',
        src: '/attached_assets/meeseeks-4 austin party boat rental_1763968010090.jpg',
        alt: 'Meeseeks boat cabin and seating',
        title: 'Captain Station',
        description: 'Modern cabin with premium navigation equipment'
      },
      {
        id: 'meeseeks-6',
        src: '/attached_assets/meeseeks-5 austin party barge rental_1763968010090.jpg',
        alt: 'Meeseeks boat outdoor deck area',
        title: 'Open Air Deck',
        description: 'Perfect layout for group celebrations'
      },
      {
        id: 'irony-1',
        src: '/attached_assets/the irony -3 party boat rental austin_1763968010090.jpg',
        alt: 'The Irony boat full view on water',
        title: 'The Irony Twin Vessel',
        description: 'Sister vessel with identical 25-30 person capacity'
      },
      {
        id: 'irony-2',
        src: '/attached_assets/the irony-2 party boat rental austin_1763968010090.jpg',
        alt: 'The Irony boat stern view with seating',
        title: 'The Irony Deck View',
        description: 'Perfect viewing angle of Lake Travis'
      }
    ],
    packages: {
      standard: true,
      essentials: PACKAGE_FLAT_FEES.ESSENTIALS[25],
      ultimate: PACKAGE_FLAT_FEES.ULTIMATE[25],
    },
    highlighted: true,
    availabilityNote: '2 boats available',
    crewFeeNote: `Groups of 26-30: add ${formatCurrency(CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA)}/hr extra crew fee (${formatCurrency(CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA * 4)} for 4hr cruise)`
  },
  {
    id: 'clever-girl',
    name: 'Clever Girl',
    displayName: 'Clever Girl',
    capacity: '31-75 guests',
    seatingCapacity: 30,
    maxCapacity: 75,
    baseRate4Hr: {
      weekday: HOURLY_RATES.MON_THU[50] * 4,
      friday: HOURLY_RATES.FRIDAY[50] * 4,
      saturday: HOURLY_RATES.SATURDAY[50] * 4,
      sunday: HOURLY_RATES.SUNDAY[50] * 4,
    },
    startingPrice: formatCurrency(HOURLY_RATES.MON_THU[50] * 4),
    description: 'Our flagship vessel with 14 disco balls and giant Texas flag',
    features: [
      'Licensed, fun, experienced captain & crew',
      '14 disco balls for ultimate party vibes',
      'Giant Texas flag display',
      'Premium Bluetooth sound system',
      'Multiple seating and standing areas',
      'Massive cooler space (BYOB friendly)',
      'Extensive sun and shade coverage',
      'Clean restroom facilities',
      '4-hour cruise duration'
    ],
    heroImage: '/attached_assets/clever-girl-50-person-boat.webp',
    galleryImages: [
      {
        id: 'clever-girl-1',
        src: '/attached_assets/clever girl-1 lake travis party boat rental_1763966476656.jpg',
        alt: 'Clever Girl deck with disco balls and Texas star',
        title: 'Clever Girl - Giant Texas Star Deck',
        description: 'Custom-built deck featuring the iconic giant Texas star and disco ball canopy'
      },
      {
        id: 'clever-girl-2',
        src: '/attached_assets/clever girl-2 party boat rental austin_1763966476657.jpg',
        alt: 'Clever Girl party boat main deck view',
        title: 'Main Deck - 14 Disco Balls',
        description: 'Spacious main deck with seating for up to 30 guests comfortably'
      },
      {
        id: 'clever-girl-3',
        src: '/attached_assets/clever girl-3 bachelorette party boat austin_1763966476657.jpg',
        alt: 'Clever Girl disco balls close-up view',
        title: 'Disco Ball Canopy',
        description: 'Our famous 14 disco balls create the ultimate party atmosphere'
      },
      {
        id: 'clever-girl-4',
        src: '/attached_assets/clever girl-4 party boat rental austin_1763966476657.jpg',
        alt: 'Clever Girl deck seating area',
        title: 'Comfortable Seating Areas',
        description: 'Multiple seating zones with shade coverage and lake views'
      },
      {
        id: 'clever-girl-6',
        src: '/attached_assets/clever girl-6 party boat lake travis_1763966476657.jpg',
        alt: 'Clever Girl covered deck with disco balls',
        title: 'Shaded Deck Area',
        description: 'Perfect blend of sun and shade for all-day comfort'
      },
      {
        id: 'clever-girl-8',
        src: '/attached_assets/clever girl-8 party boat rental austin_1763966476658.jpg',
        alt: 'Clever Girl side deck view Lake Travis',
        title: 'Panoramic Lake Views',
        description: 'Enjoy stunning Lake Travis views from every angle'
      },
      {
        id: 'clever-girl-9',
        src: '/attached_assets/clever girl-9 party boat austin_1763966476658.jpg',
        alt: 'Clever Girl bow seating and coolers',
        title: 'Front Deck & Cooler Space',
        description: 'Massive cooler capacity for your BYOB party essentials'
      },
      {
        id: 'clever-girl-10',
        src: '/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg',
        alt: 'Clever Girl party boat exterior on Lake Travis',
        title: 'Clever Girl on the Water',
        description: 'Our flagship 50-person party boat cruising Lake Travis'
      }
    ],
    packages: {
      standard: true,
      essentials: PACKAGE_FLAT_FEES.ESSENTIALS[50],
      ultimate: PACKAGE_FLAT_FEES.ULTIMATE[50],
    },
    crewFeeNote: `Groups of 51-75: add ${formatCurrency(CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA)}/hr extra crew fee (${formatCurrency(CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA * 4)} for 4hr cruise)`
  }
];

export default function FleetSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState<BoatDetails | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openDialog = (boat: BoatDetails) => {
    setSelectedBoat(boat);
    setCurrentImageIndex(0);
    setDialogOpen(true);
  };

  const handleNext = () => {
    if (selectedBoat) {
      setCurrentImageIndex((prev) => 
        prev === selectedBoat.galleryImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevious = () => {
    if (selectedBoat) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedBoat.galleryImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <section className="py-10 sm:py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-12"
          >
            <Badge 
              className="mb-2 sm:mb-4 bg-brand-yellow text-black font-bold px-3 py-1 text-xs sm:text-sm"
              data-testid="badge-fleet-section"
            >
              OUR FLEET
            </Badge>
            <h2 
              className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-gray-900 dark:text-white"
              data-testid="heading-fleet-section"
            >
              Choose Your Perfect Boat
            </h2>
            <p 
              className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              data-testid="text-fleet-intro"
            >
              Custom-built party boats for 1-75 guests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {boats.map((boat, index) => (
              <motion.div
                key={boat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`relative overflow-hidden h-full hover:shadow-xl transition-all duration-300 ${boat.highlighted ? 'ring-2 ring-brand-yellow' : ''}`}>
                  <div className="relative h-40 sm:h-52 overflow-hidden">
                    <LazyImage
                      src={boat.heroImage}
                      alt={`${boat.name} party boat Lake Travis`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {boat.highlighted && (
                      <Badge 
                        className="absolute top-2 right-2 bg-brand-yellow text-black font-bold text-[10px] sm:text-xs px-1.5 py-0.5"
                        data-testid={`badge-popular-${boat.id}`}
                      >
                        POPULAR
                      </Badge>
                    )}
                    {boat.availabilityNote && (
                      <Badge 
                        className="absolute top-2 left-2 bg-green-600 text-white font-bold text-[10px] sm:text-xs px-1.5 py-0.5"
                        data-testid={`badge-availability-${boat.id}`}
                      >
                        {boat.availabilityNote}
                      </Badge>
                    )}
                    <button
                      onClick={() => openDialog(boat)}
                      className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/90 text-white text-[10px] sm:text-xs px-2 py-1 rounded flex items-center gap-1 transition-all"
                      data-testid={`button-view-${boat.id}-gallery`}
                    >
                      <Eye className="h-3 w-3" />
                      <span>More pics</span>
                    </button>
                  </div>

                  <CardContent className="p-3 sm:p-4">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 text-gray-900 dark:text-white" data-testid={`text-boat-name-${boat.id}`}>
                      {boat.displayName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{boat.description}</p>

                    {/* Compact Info Grid */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs sm:text-sm mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-1" data-testid={`text-capacity-${boat.id}`}>
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-brand-blue flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300"><strong>{boat.capacity}</strong></span>
                      </div>
                      <div className="flex items-center gap-1" data-testid={`text-seats-${boat.id}`}>
                        <Ship className="h-3 w-3 sm:h-4 sm:w-4 text-brand-blue flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300"><strong>{boat.seatingCapacity}</strong> seats</span>
                      </div>
                    </div>

                    {/* Compact Pricing Table */}
                    <div className="mb-2">
                      <div className="flex items-center gap-1 mb-1">
                        <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-brand-blue" />
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">4hr Pricing</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded p-1.5">
                        <div className="flex justify-between" data-testid={`text-price-weekday-${boat.id}`}>
                          <span>Mon-Thu</span>
                          <span className="font-semibold">{formatCurrency(boat.baseRate4Hr.weekday)}</span>
                        </div>
                        <div className="flex justify-between" data-testid={`text-price-friday-${boat.id}`}>
                          <span>Friday</span>
                          <span className="font-semibold">{formatCurrency(boat.baseRate4Hr.friday)}</span>
                        </div>
                        <div className="flex justify-between" data-testid={`text-price-saturday-${boat.id}`}>
                          <span>Saturday</span>
                          <span className="font-semibold">{formatCurrency(boat.baseRate4Hr.saturday)}</span>
                        </div>
                        <div className="flex justify-between" data-testid={`text-price-sunday-${boat.id}`}>
                          <span>Sunday</span>
                          <span className="font-semibold">{formatCurrency(boat.baseRate4Hr.sunday)}</span>
                        </div>
                      </div>
                      {boat.crewFeeNote && (
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 italic" data-testid={`text-crew-fee-${boat.id}`}>
                          *{boat.crewFeeNote}
                        </p>
                      )}
                    </div>

                    {/* Compact Packages Row */}
                    <div className="mb-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Package className="h-3 w-3 sm:h-4 sm:w-4 text-brand-blue" />
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">Packages</span>
                      </div>
                      <div className="flex flex-wrap gap-1 text-[10px] sm:text-xs">
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-1.5 py-0.5 rounded" data-testid={`text-package-standard-${boat.id}`}>
                          Standard
                        </span>
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-1.5 py-0.5 rounded" data-testid={`text-package-essentials-${boat.id}`}>
                          Essentials +{formatCurrency(boat.packages.essentials)}
                        </span>
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-1.5 py-0.5 rounded" data-testid={`text-package-ultimate-${boat.id}`}>
                          Ultimate +{formatCurrency(boat.packages.ultimate)}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => openDialog(boat)}
                      className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-xs sm:text-sm py-2"
                      data-testid={`button-view-${boat.id}-details`}
                    >
                      View Photos & Details
                      <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA to Quote Builder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-6 sm:mt-10"
          >
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-4">
              Ready to book your Lake Travis adventure?
            </p>
            <Button
              size="default"
              onClick={() => document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4"
              data-testid="button-fleet-to-quote"
            >
              Get Instant Quote
              <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Boat Details Dialog - Mobile Optimized */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[85vh] overflow-y-auto p-3 sm:p-6">
          {selectedBoat && (
            <>
              <DialogHeader className="pb-2">
                <DialogTitle className="text-xl sm:text-2xl font-bold pr-8">{selectedBoat.displayName}</DialogTitle>
              </DialogHeader>
              
              {/* Image Gallery - Mobile Optimized */}
              <div className="relative w-full aspect-[4/3] sm:aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedBoat.galleryImages[currentImageIndex]?.src}
                  alt={selectedBoat.galleryImages[currentImageIndex]?.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows - Touch Friendly */}
                {selectedBoat.galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 active:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all touch-manipulation"
                      data-testid="button-previous-image"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 active:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all touch-manipulation"
                      data-testid="button-next-image"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute top-2 right-2 sm:bottom-3 sm:right-3 sm:top-auto bg-black/70 text-white px-2 py-1 rounded-full text-xs sm:text-sm">
                      {currentImageIndex + 1} / {selectedBoat.galleryImages.length}
                    </div>
                  </>
                )}
                
                {/* Image Title - Hidden on mobile, shown on desktop */}
                {selectedBoat.galleryImages[currentImageIndex]?.title && (
                  <div className="hidden sm:block absolute bottom-3 left-3 bg-black/70 text-white px-3 py-2 rounded-lg max-w-[60%]">
                    <p className="font-semibold text-sm">{selectedBoat.galleryImages[currentImageIndex]?.title}</p>
                    {selectedBoat.galleryImages[currentImageIndex]?.description && (
                      <p className="text-xs text-gray-300 line-clamp-2">{selectedBoat.galleryImages[currentImageIndex]?.description}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Image Title - Mobile Only (Below Image) */}
              {selectedBoat.galleryImages[currentImageIndex]?.title && (
                <div className="sm:hidden text-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{selectedBoat.galleryImages[currentImageIndex]?.title}</p>
                </div>
              )}
              
              {/* Boat Details - Compact Mobile Layout */}
              <div className="space-y-3 mt-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedBoat.description}</p>
                
                {/* Capacity - Compact */}
                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-5 w-5 text-brand-blue flex-shrink-0" />
                  <div className="flex flex-wrap gap-x-3 text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedBoat.capacity}</span>
                    <span className="text-gray-600 dark:text-gray-400">• {selectedBoat.seatingCapacity} seats</span>
                  </div>
                </div>
                
                {/* Pricing - Compact Grid */}
                <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-brand-blue" />
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">4hr Pricing</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs sm:text-sm">
                    <div className="flex justify-between"><span>Mon-Thu</span><span className="font-semibold">{formatCurrency(selectedBoat.baseRate4Hr.weekday)}</span></div>
                    <div className="flex justify-between"><span>Friday</span><span className="font-semibold">{formatCurrency(selectedBoat.baseRate4Hr.friday)}</span></div>
                    <div className="flex justify-between"><span>Saturday</span><span className="font-semibold">{formatCurrency(selectedBoat.baseRate4Hr.saturday)}</span></div>
                    <div className="flex justify-between"><span>Sunday</span><span className="font-semibold">{formatCurrency(selectedBoat.baseRate4Hr.sunday)}</span></div>
                  </div>
                  {selectedBoat.crewFeeNote && (
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-2 italic">*{selectedBoat.crewFeeNote}</p>
                  )}
                </div>
                
                {/* Features - Compact 2-Column */}
                <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white mb-2">Features</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {selectedBoat.features.slice(0, 6).map((feature, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-brand-blue">✓</span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Packages - Inline Badges */}
                <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-brand-blue" />
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">Packages</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                      Standard (included)
                    </span>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                      Essentials +{formatCurrency(selectedBoat.packages.essentials)}
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">
                      Ultimate +{formatCurrency(selectedBoat.packages.ultimate)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
