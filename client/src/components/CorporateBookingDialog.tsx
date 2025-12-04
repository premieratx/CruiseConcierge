import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';
const logoPath = '/attached_assets/PPC Logo LARGE_1757881944449.png';
import {
  Calendar as CalendarIcon, Clock, Users, Ship, MapPin, Phone, Mail,
  CheckCircle, Star, Sparkles, Arrow, Zap, Building2, Trophy,
  ChevronRight, ArrowRight, X
} from 'lucide-react';
import { formatCurrency, formatDate, formatTimeForDisplay } from '@shared/formatters';
import { getPrivateTimeSlotsForDate } from '@shared/timeSlots';
import type { Boat, AvailabilitySlot } from '@shared/schema';

interface CorporateBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  packageType?: 'essentials' | 'ultimate';
  title?: string;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
  boatName?: string;
  boatId?: string;
  capacity?: number;
  price?: number;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function CorporateBookingDialog({
  isOpen,
  onClose,
  packageType = 'essentials',
  title = 'Book Your Corporate Event'
}: CorporateBookingDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [groupSize, setGroupSize] = useState(25);
  const [step, setStep] = useState<'date' | 'time' | 'details'>('date');
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Fetch boats for corporate events (25+ person capacity)
  const { data: boats = [] } = useQuery<Boat[]>({
    queryKey: ['/api/boats'],
    select: (data) => data.filter(boat => boat.capacity >= 25) // Corporate boats only
  });

  // Fetch availability for selected date
  const { data: availability = [] } = useQuery<AvailabilitySlot[]>({
    queryKey: ['/api/availability/public', selectedDate?.toISOString()],
    enabled: !!selectedDate
  });

  // Generate available time slots
  const getAvailableTimeSlots = (): TimeSlot[] => {
    if (!selectedDate) return [];

    const timeSlots = getPrivateTimeSlotsForDate(selectedDate);
    
    return timeSlots.map(slot => {
      const slotId = `corporate_${selectedDate.toISOString().split('T')[0]}_${slot.startTime}_${slot.endTime}`;
      
      // Check if slot is available (mock logic - replace with real availability check)
      const isBooked = availability.some(avail => 
        avail.startTime === slot.startTime && avail.status !== 'AVAILABLE'
      );

      // Find suitable boat
      const suitableBoat = boats.find(boat => boat.capacity >= groupSize);

      return {
        id: slotId,
        startTime: slot.startTime,
        endTime: slot.endTime,
        available: !isBooked && !!suitableBoat,
        boatName: suitableBoat?.name,
        boatId: suitableBoat?.id,
        capacity: suitableBoat?.capacity,
        price: packageType === 'ultimate' ? 6000 : 4000 // Base pricing in cents
      };
    }).filter(slot => slot.available);
  };

  const availableSlots = getAvailableTimeSlots();

  // Package details
  const packageDetails = {
    essentials: {
      name: 'Corporate Essentials',
      price: 4000, // $4,000
      duration: '4 hours',
      features: [
        'Professional boat charter with experienced captain',
        'Premium sound system for presentations',
        'Corporate-appropriate atmosphere and service',
        'Networking space and professional setup',
        'Basic photography included',
        'Coolers, ice, and standard amenities'
      ],
      icon: Building2,
      color: 'bg-blue-500'
    },
    ultimate: {
      name: 'Corporate Ultimate',
      price: 6000, // $6,000
      duration: '4-6 hours',
      features: [
        'Everything in Corporate Essentials',
        'Dedicated event coordinator',
        'Alcohol delivery coordination',
        'Enhanced photography and videography',
        'Custom branding opportunities',
        'VIP boarding and service upgrades',
        'Presentation equipment included'
      ],
      icon: Trophy,
      color: 'bg-gold-500'
    }
  };

  const currentPackage = packageDetails[packageType];

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setStep('details');
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) return;

    // Navigate to booking flow with pre-filled data
    const params = new URLSearchParams({
      date: selectedDate.toISOString().split('T')[0],
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      groupSize: groupSize.toString(),
      boatId: selectedSlot.boatId || '',
      packageType,
      eventType: 'corporate'
    });

    navigate(`/book?${params.toString()}`);
    onClose();

    toast({
      title: "Redirecting to booking...",
      description: "Complete your corporate event booking",
    });
  };

  const handleContactSales = () => {
    // Trigger embedded chat or contact form
    onClose();
    
    // Scroll to contact section or open chat
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };

  const resetDialog = () => {
    setStep('date');
    setSelectedSlot(null);
    setSelectedDate(new Date());
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(resetDialog, 300); // Reset after dialog closes
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <img src={logoPath} alt="PPC" className="h-8 w-8" width={32} height={32} loading="eager" />
            <div>
              <DialogTitle className="text-xl font-bold">
                {title}
              </DialogTitle>
              <DialogDescription>
                Book your {currentPackage.name.toLowerCase()} experience on Lake Travis
              </DialogDescription>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-4">
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full",
              step === 'date' ? "bg-brand-blue text-white" : "bg-gray-200 text-gray-600"
            )}>
              <CalendarIcon className="h-3 w-3" />
              Date
            </div>
            <ArrowRight className="h-3 w-3 text-gray-400" />
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full",
              step === 'time' ? "bg-brand-blue text-white" : "bg-gray-200 text-gray-600"
            )}>
              <Clock className="h-3 w-3" />
              Time
            </div>
            <ArrowRight className="h-3 w-3 text-gray-400" />
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full",
              step === 'details' ? "bg-brand-blue text-white" : "bg-gray-200 text-gray-600"
            )}>
              <CheckCircle className="h-3 w-3" />
              Details
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <AnimatePresence mode="wait">
            {/* Step 1: Date Selection */}
            {step === 'date' && (
              <motion.div
                key="date-step"
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <motion.div variants={fadeInUp}>
                  <h3 className="text-lg font-semibold mb-4">Select Your Event Date</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => 
                          date < new Date() || 
                          date.getDay() === 0 // Disable Sundays for corporate events
                        }
                        className="rounded-md border-0"
                        data-testid="calendar-corporate-booking"
                      />
                    </Card>

                    <div className="space-y-4">
                      {/* Package Summary */}
                      <Card className="bg-gradient-to-br from-brand-blue/5 to-brand-blue/10">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            <div className={cn("p-2 rounded-lg text-white", currentPackage.color)}>
                              <currentPackage.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{currentPackage.name}</CardTitle>
                              <p className="text-sm text-gray-600">
                                Starting at {formatCurrency(currentPackage.price)}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              {currentPackage.duration} charter
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="h-4 w-4" />
                              Perfect for corporate groups
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Star className="h-4 w-4" />
                              Professional service guaranteed
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Group Size Selector */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Expected Group Size</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Tabs defaultValue="25" onValueChange={(value) => setGroupSize(parseInt(value))}>
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="25" data-testid="group-size-25">14-25</TabsTrigger>
                              <TabsTrigger value="35" data-testid="group-size-35">26-35</TabsTrigger>
                              <TabsTrigger value="50" data-testid="group-size-50">36-50</TabsTrigger>
                            </TabsList>
                          </Tabs>
                          <p className="text-xs text-gray-600 mt-2">
                            Larger groups available with multiple boats
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>

                {selectedDate && (
                  <motion.div variants={fadeInUp} className="flex justify-end">
                    <Button 
                      onClick={() => setStep('time')} 
                      size="lg"
                      data-testid="button-next-to-time"
                    >
                      View Available Times
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Time Selection */}
            {step === 'time' && (
              <motion.div
                key="time-step"
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <motion.div variants={fadeInUp} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Available Times for {formatDate(selectedDate!)}
                    </h3>
                    <p className="text-gray-600">
                      Corporate-friendly time slots on Lake Travis
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('date')}
                    data-testid="button-back-to-date"
                  >
                    Change Date
                  </Button>
                </motion.div>

                {availableSlots.length > 0 ? (
                  <motion.div variants={fadeInUp} className="grid gap-4">
                    {availableSlots.map((slot, index) => (
                      <motion.div
                        key={slot.id}
                        variants={fadeInUp}
                        custom={index}
                      >
                        <Card 
                          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-brand-blue"
                          onClick={() => handleSlotSelect(slot)}
                          data-testid={`slot-${slot.id}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <div className="text-xl font-bold text-brand-blue">
                                    {formatTimeForDisplay(slot.startTime)}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    to {formatTimeForDisplay(slot.endTime)}
                                  </div>
                                </div>

                                <Separator orientation="vertical" className="h-12" />

                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Ship className="h-4 w-4 text-gray-600" />
                                    <span className="font-medium">{slot.boatName}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="h-4 w-4" />
                                    Capacity: {slot.capacity} guests
                                  </div>
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="text-lg font-semibold">
                                  {formatCurrency(slot.price || currentPackage.price)}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  Available
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div variants={fadeInUp}>
                    <Card className="p-8 text-center">
                      <div className="space-y-4">
                        <div className="text-gray-400">
                          <Clock className="h-12 w-12 mx-auto mb-2" />
                        </div>
                        <h4 className="text-lg font-semibold">No Available Times</h4>
                        <p className="text-gray-600">
                          All corporate time slots are booked for this date. Please select a different date or contact our sales team for alternatives.
                        </p>
                        <div className="flex gap-3 justify-center">
                          <Button variant="outline" onClick={() => setStep('date')}>
                            Choose Different Date
                          </Button>
                          <Button onClick={handleContactSales}>
                            Contact Sales Team
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 3: Booking Details */}
            {step === 'details' && selectedSlot && (
              <motion.div
                key="details-step"
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <motion.div variants={fadeInUp} className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Booking Summary</h3>
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('time')}
                    data-testid="button-back-to-time"
                  >
                    Change Time
                  </Button>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="bg-gradient-to-br from-brand-blue/5 to-brand-blue/10">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg text-white", currentPackage.color)}>
                              <currentPackage.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{currentPackage.name}</h4>
                              <p className="text-sm text-gray-600">
                                {formatDate(selectedDate!)}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-brand-blue" />
                              {formatTimeForDisplay(selectedSlot.startTime)} - {formatTimeForDisplay(selectedSlot.endTime)}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Ship className="h-4 w-4 text-brand-blue" />
                              {selectedSlot.boatName} (Capacity: {selectedSlot.capacity})
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-brand-blue" />
                              Expected group size: {groupSize} guests
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-brand-blue" />
                              Lake Travis Marina, Austin TX
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h5 className="font-medium">What's Included:</h5>
                          <ul className="space-y-1">
                            {currentPackage.features.slice(0, 4).map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          {currentPackage.features.length > 4 && (
                            <p className="text-xs text-gray-600">
                              + {currentPackage.features.length - 4} more premium features
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Starting Price</div>
                      <div className="text-2xl font-bold">{formatCurrency(currentPackage.price)}</div>
                      <div className="text-xs text-gray-600">Final pricing based on specific requirements</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">25% deposit to secure</div>
                      <div className="text-lg font-semibold">{formatCurrency(currentPackage.price * 0.25)}</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex gap-3">
                  <Button 
                    onClick={handleBooking} 
                    size="lg" 
                    className="flex-1"
                    data-testid="button-proceed-to-booking"
                  >
                    Proceed to Booking
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleContactSales}
                    data-testid="button-contact-sales"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Sales
                  </Button>
                </motion.div>

                <motion.div variants={fadeInUp} className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Need custom arrangements? Our corporate sales team can create a tailored package for your specific needs.
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      (512) 488-5892
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      clientservices@premierpartycruises.com
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}