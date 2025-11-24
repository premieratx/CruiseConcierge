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
    name: 'Me Seeks The Irony',
    displayName: 'Me Seeks / The Irony',
    capacity: '15-30 guests',
    seatingCapacity: 25,
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
        alt: 'Me Seeks 25-person party boat on Lake Travis',
        title: 'Me Seeks / The Irony',
        description: 'Our twin 25-person boats - 2 boats available for maximum flexibility'
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
    seatingCapacity: 50,
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
        description: 'Spacious main deck with seating for up to 50 guests comfortably'
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
      <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge 
              className="mb-4 bg-brand-yellow text-black font-bold px-4 py-2"
              data-testid="badge-fleet-section"
            >
              OUR FLEET
            </Badge>
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
              data-testid="heading-fleet-section"
            >
              Choose Your Perfect Boat
            </h2>
            <p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              data-testid="text-fleet-intro"
            >
              Custom-built high-end single-deck party boats for groups from 1-75 guests
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {boats.map((boat, index) => (
              <motion.div
                key={boat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`relative overflow-hidden h-full hover:shadow-2xl transition-all duration-300 ${boat.highlighted ? 'ring-2 ring-brand-yellow' : ''}`}>
                  <div className="relative h-64 overflow-hidden">
                    <LazyImage
                      src={boat.heroImage}
                      alt={`${boat.name} party boat Lake Travis`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    {boat.highlighted && (
                      <Badge 
                        className="absolute top-4 right-4 bg-brand-yellow text-black font-bold"
                        data-testid={`badge-popular-${boat.id}`}
                      >
                        MOST POPULAR
                      </Badge>
                    )}
                    {boat.availabilityNote && (
                      <Badge 
                        className="absolute top-4 left-4 bg-green-600 text-white font-bold"
                        data-testid={`badge-availability-${boat.id}`}
                      >
                        {boat.availabilityNote}
                      </Badge>
                    )}
                    <button
                      onClick={() => openDialog(boat)}
                      className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-2 transition-all"
                      data-testid={`button-view-${boat.id}-gallery`}
                    >
                      <Eye className="h-4 w-4" />
                      <span>Click to view more pics</span>
                    </button>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white" data-testid={`text-boat-name-${boat.id}`}>
                      {boat.displayName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{boat.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Users className="h-5 w-5 text-brand-blue flex-shrink-0" />
                        <span data-testid={`text-capacity-${boat.id}`}><strong>Capacity:</strong> {boat.capacity}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Ship className="h-5 w-5 text-brand-blue flex-shrink-0" />
                        <span data-testid={`text-seats-${boat.id}`}><strong>Seats:</strong> {boat.seatingCapacity} comfortably</span>
                      </div>

                      <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <DollarSign className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Pricing (4hr cruise):</div>
                          <div className="text-sm space-y-1">
                            <div data-testid={`text-price-weekday-${boat.id}`}>Mon-Thu: {formatCurrency(boat.baseRate4Hr.weekday)}</div>
                            <div data-testid={`text-price-friday-${boat.id}`}>Friday: {formatCurrency(boat.baseRate4Hr.friday)}</div>
                            <div data-testid={`text-price-saturday-${boat.id}`}>Saturday: {formatCurrency(boat.baseRate4Hr.saturday)}</div>
                            <div data-testid={`text-price-sunday-${boat.id}`}>Sunday: {formatCurrency(boat.baseRate4Hr.sunday)}</div>
                          </div>
                          {boat.crewFeeNote && (
                            <p 
                              className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic"
                              data-testid={`text-crew-fee-${boat.id}`}
                            >
                              *{boat.crewFeeNote}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <Package className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Packages Available:</div>
                          <div className="text-sm space-y-1">
                            <div data-testid={`text-package-standard-${boat.id}`}>✓ Standard (included)</div>
                            <div data-testid={`text-package-essentials-${boat.id}`}>✓ Essentials (+{formatCurrency(boat.packages.essentials)})</div>
                            <div data-testid={`text-package-ultimate-${boat.id}`}>✓ Ultimate (+{formatCurrency(boat.packages.ultimate)})</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => openDialog(boat)}
                      className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
                      data-testid={`button-view-${boat.id}-details`}
                    >
                      View Photos & Details
                      <ArrowRight className="ml-2 h-4 w-4" />
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
            className="text-center mt-12"
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Ready to book your Lake Travis adventure?
            </p>
            <a href="#quote-builder">
              <Button
                size="lg"
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6"
                data-testid="button-fleet-to-quote"
              >
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Boat Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBoat && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">{selectedBoat.displayName}</DialogTitle>
              </DialogHeader>
              
              {/* Image Gallery */}
              <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedBoat.galleryImages[currentImageIndex]?.src}
                  alt={selectedBoat.galleryImages[currentImageIndex]?.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {selectedBoat.galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                      data-testid="button-previous-image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                      data-testid="button-next-image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {selectedBoat.galleryImages.length}
                    </div>
                  </>
                )}
                
                {/* Image Title */}
                {selectedBoat.galleryImages[currentImageIndex]?.title && (
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                    <p className="font-semibold">{selectedBoat.galleryImages[currentImageIndex]?.title}</p>
                    {selectedBoat.galleryImages[currentImageIndex]?.description && (
                      <p className="text-sm text-gray-300">{selectedBoat.galleryImages[currentImageIndex]?.description}</p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Boat Details */}
              <div className="space-y-4 mt-4">
                <p className="text-gray-700 dark:text-gray-300">{selectedBoat.description}</p>
                
                {/* Capacity */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-6 w-6 text-brand-blue" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Capacity: {selectedBoat.capacity}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Seats {selectedBoat.seatingCapacity} comfortably</p>
                  </div>
                </div>
                
                {/* Pricing */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <DollarSign className="h-6 w-6 text-brand-blue mt-1" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">Pricing (4hr cruise):</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><span className="font-medium">Mon-Thu:</span> {formatCurrency(selectedBoat.baseRate4Hr.weekday)}</div>
                        <div><span className="font-medium">Friday:</span> {formatCurrency(selectedBoat.baseRate4Hr.friday)}</div>
                        <div><span className="font-medium">Saturday:</span> {formatCurrency(selectedBoat.baseRate4Hr.saturday)}</div>
                        <div><span className="font-medium">Sunday:</span> {formatCurrency(selectedBoat.baseRate4Hr.sunday)}</div>
                      </div>
                      {selectedBoat.crewFeeNote && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">*{selectedBoat.crewFeeNote}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Features:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                    {selectedBoat.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-brand-blue mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Packages */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Package className="h-6 w-6 text-brand-blue mt-1" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">Packages Available:</p>
                      <div className="space-y-1 text-sm">
                        <div>✓ Standard (included)</div>
                        <div>✓ Essentials (+{formatCurrency(selectedBoat.packages.essentials)})</div>
                        <div>✓ Ultimate (+{formatCurrency(selectedBoat.packages.ultimate)})</div>
                      </div>
                    </div>
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
