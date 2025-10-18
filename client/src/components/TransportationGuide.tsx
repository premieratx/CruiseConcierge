import { Car, Hotel, MapPin, Bus, ExternalLink, Phone, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TransportationGuideProps {
  className?: string;
  showAccommodations?: boolean;
}

export function TransportationGuide({
  className,
  showAccommodations = true,
}: TransportationGuideProps) {
  return (
    <section className={cn("py-20 bg-white dark:bg-gray-950", className)}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 font-sans tracking-wider uppercase bg-brand-blue text-white px-6 py-2">
            <MapPin className="w-4 h-4 mr-2 inline" />
            Planning Your Visit
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Transportation & Lodging Guide
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Coming from out of town? We've got you covered with transportation and accommodation recommendations near Anderson Mill Marina.
          </p>
        </motion.div>

        <Tabs defaultValue="transportation" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="transportation" data-testid="tab-transportation">
              <Car className="h-4 w-4 mr-2" />
              Transportation
            </TabsTrigger>
            {showAccommodations && (
              <TabsTrigger value="accommodations" data-testid="tab-accommodations">
                <Hotel className="h-4 w-4 mr-2" />
                Lodging
              </TabsTrigger>
            )}
          </TabsList>

          {/* Transportation Tab */}
          <TabsContent value="transportation" className="space-y-8">
            {/* Ride Share Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Car className="h-6 w-6 text-brand-blue" />
                  Ride Share Services (Recommended)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="font-semibold text-brand-blue mb-2">💰 25% DISCOUNT AVAILABLE!</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Ask about our exclusive partnership discounts with local transportation providers when you book your cruise.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Uber / Lyft</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Most convenient option. Approximately $60-80 round trip from downtown Austin to Anderson Mill Marina (30-40 min each way).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Bus className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Party Bus / Sprinter Van</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Perfect for larger groups (10+ people). Keep the party going during transport! Contact us for recommended vendors with group discounts.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-brand-blue" />
                  Free Parking at Marina
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you're driving, Anderson Mill Marina offers FREE parking for all cruise guests. However, we strongly recommend ride share services if your group plans to drink.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                    ⚠️ Safety First: Don't drink and drive! Use our recommended transportation partners.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Marina Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-brand-blue" />
                  Anderson Mill Marina Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">Address:</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      12532 FM 2769, Austin, TX 78726
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">Check-in Time:</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Arrive 15 minutes before cruise departure. ATX Disco Cruise departs at 12:00 PM (board at 11:45 AM).
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full md:w-auto"
                    onClick={() => window.open('https://maps.google.com/?q=12532+FM+2769+Austin+TX+78726', '_blank')}
                    data-testid="button-open-maps"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accommodations Tab */}
          {showAccommodations && (
            <TabsContent value="accommodations" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nearby Hotels */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Hotel className="h-6 w-6 text-brand-blue" />
                      Nearby Hotels (10-15 min)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="font-semibold text-gray-900 dark:text-white">Hampton Inn & Suites - Lakeline</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">~$120-150/night</p>
                        <p className="text-xs text-gray-600 mt-1">14 miles from marina</p>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="font-semibold text-gray-900 dark:text-white">Courtyard by Marriott - Cedar Park</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">~$130-170/night</p>
                        <p className="text-xs text-gray-600 mt-1">12 miles from marina</p>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="font-semibold text-gray-900 dark:text-white">Hyatt Place - Lakeline</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">~$140-180/night</p>
                        <p className="text-xs text-gray-600 mt-1">13 miles from marina</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Downtown Austin */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Hotel className="h-6 w-6 text-brand-blue" />
                      Downtown Austin (30-40 min)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Stay in the heart of Austin's nightlife and entertainment. Perfect for bachelor/bachelorette parties planning multiple days of activities.
                    </p>

                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="font-semibold text-gray-900 dark:text-white">Rainey Street District</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Popular bachelorette area with bars</p>
                        <p className="text-xs text-gray-600 mt-1">~$180-300/night</p>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="font-semibold text-gray-900 dark:text-white">6th Street Entertainment District</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Main nightlife hub</p>
                        <p className="text-xs text-gray-600 mt-1">~$150-250/night</p>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="font-semibold text-gray-900 dark:text-white">Domain Area (North Austin)</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Upscale shopping & dining</p>
                        <p className="text-xs text-gray-600 mt-1">~$160-220/night</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Vacation Rentals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Hotel className="h-6 w-6 text-brand-blue" />
                    Vacation Rentals (Best for Large Groups)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Rent a lakehouse on Lake Travis for the ultimate party weekend! Many properties accommodate 10-20+ guests.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                        <p className="text-2xl font-bold text-brand-blue mb-1">Airbnb</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Best selection</p>
                        <Button 
                          variant="link"
                          onClick={() => window.open('https://www.airbnb.com/s/Lake-Travis--Austin--TX', '_blank')}
                          data-testid="button-airbnb"
                        >
                          Search Airbnb
                        </Button>
                      </div>

                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                        <p className="text-2xl font-bold text-purple-600 mb-1">VRBO</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Lakefront homes</p>
                        <Button 
                          variant="link"
                          onClick={() => window.open('https://www.vrbo.com/search?destination=Lake+Travis', '_blank')}
                          data-testid="button-vrbo"
                        >
                          Search VRBO
                        </Button>
                      </div>

                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-600 mb-1">Booking.com</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Hotels & rentals</p>
                        <Button 
                          variant="link"
                          onClick={() => window.open('https://www.booking.com/searchresults.html?ss=Lake+Travis', '_blank')}
                          data-testid="button-booking"
                        >
                          Search Booking
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-brand-blue to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold font-playfair mb-3">Need Help Planning Your Trip?</h3>
          <p className="mb-6 text-white/90">
            Our team can help you arrange transportation and recommend accommodations for your group.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.location.href = 'tel:+15127705050'}
            data-testid="button-call-for-help"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call (512) 770-5050
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
