import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Ship, Info, Calendar } from 'lucide-react';
import { Link } from 'wouter';
import { formatCurrency } from '@shared/formatters';

interface TabbedPrivateCruisePricingProps {
  className?: string;
}

// Hourly rates by day and boat size - EXACT from knowledge base
const HOURLY_RATES = {
  'mon-thu': {
    14: 200,
    25: 225,
    50: 250
  },
  'fri': {
    14: 225,
    25: 250,
    50: 275
  },
  'sat': {
    14: 350,
    25: 375,
    50: 400
  },
  'sun': {
    14: 250,
    25: 275,
    50: 300
  }
};

// EXACT package definitions from knowledge base
const PACKAGE_DETAILS = {
  14: {
    standard: {
      name: 'Standard 4-Hour Cruise',
      features: [
        'Amazing, experienced captain',
        '2 large empty coolers',
        'Premium Bluetooth speaker system',
        'Clean restroom',
        'Seating for 14',
        'Plenty of sun & shade'
      ]
    },
    essentials: {
      name: '4-Hour Cruise w/ Essentials Package',
      addOn: '+$100 flat fee (per cruise)',
      features: [
        'Everything with Standard Cruise',
        'Insulated 5-gallon dispenser w/ ice water',
        '15 gallons of water & 30 solo cups',
        'Coolers stocked with 40 lbs of ice',
        '6-ft folding table'
      ]
    },
    ultimate: {
      name: 'Ultimate Disco Party Cruise Package',
      addOn: '+$250 flat fee (per cruise)',
      features: [
        'Everything with Essentials Package',
        '6x20\' giant lily pad float',
        'Unicorn or ring float for the bride',
        '5 disco ball cups, 30 solo cups',
        'Bubble gun & 3 bubble wands',
        '20 champagne flutes & 3 fruit juices',
        '2 bottles of SPF-50 spray sunscreen',
        '20 plates, plasticware, & paper towels',
        '3 disco balls installed'
      ]
    }
  },
  25: {
    standard: {
      name: 'Standard 4-Hour Cruise',
      features: [
        'Amazing, experienced captain',
        '2 large empty coolers',
        'Premium Bluetooth speaker system',
        'Clean restroom',
        'Seating for 20',
        'Plenty of sun & shade'
      ]
    },
    essentials: {
      name: '4-Hour Cruise w/ Essentials Package',
      addOn: '+$150 flat fee (per cruise)',
      features: [
        'Everything with Standard Cruise',
        'Insulated 5-gallon dispenser w/ ice water',
        '20 gallons of water & 50 solo cups',
        'Coolers stocked with 60 lbs of ice',
        '6-ft folding table'
      ]
    },
    ultimate: {
      name: 'Ultimate Disco Party Cruise Package',
      addOn: '+$300 flat fee (per cruise)',
      features: [
        'Everything with Essentials Package',
        '(2) 6x20\' giant lily pad floats',
        '(2) unicorn or ring floats for the bride',
        '10 disco ball cups',
        '(2) bubble guns & 3 bubble wands',
        '30 champagne flutes & 3 fruit juices',
        '4 bottles of SPF-50 spray sunscreen',
        '30 plates, plasticware, & paper towels',
        '3 disco balls installed'
      ]
    }
  },
  50: {
    standard: {
      name: 'Standard 4-Hour Cruise',
      features: [
        'Amazing, experienced captain',
        '4 giant empty coolers',
        'Premium Bluetooth speaker system',
        '2 clean restrooms',
        'Seating for 30',
        'Plenty of sun & shade'
      ]
    },
    essentials: {
      name: '4-Hour Cruise w/ Essentials Package',
      addOn: '+$200 flat fee (per cruise)',
      features: [
        'Everything with Standard Cruise',
        'Insulated 5-gallon dispenser w/ ice water',
        '25 gallons of water & 100 solo cups',
        'Coolers stocked with 80 lbs of ice',
        '(2) 6-ft folding tables'
      ]
    },
    ultimate: {
      name: 'Ultimate Disco Party Cruise Package',
      addOn: '+$350 flat fee (per cruise)',
      features: [
        'Everything with Essentials Package',
        '(3) 6x20\' giant lily pad floats',
        '(3) unicorn or ring floats for the bride',
        '15 disco ball cups',
        '(3) bubble guns & 5 bubble wands',
        '50 champagne flutes & 3 fruit juices',
        '6 bottles of SPF-50 spray sunscreen',
        '50 plates, plasticware, & paper towels',
        '10 disco balls installed'
      ]
    }
  }
};

export function TabbedPrivateCruisePricing({ className = '' }: TabbedPrivateCruisePricingProps) {
  const [selectedBoat, setSelectedBoat] = useState<'14' | '25' | '50'>('14');
  const [selectedDay, setSelectedDay] = useState<'mon-thu' | 'fri' | 'sat' | 'sun'>('sat');
  
  // Boat configurations - REAL NAMES AND CAPACITIES
  const boats = {
    '14': {
      name: 'Day Tripper',
      capacity: '1-14 guests',
      crewFeeNote: null
    },
    '25': {
      name: 'Meeseeks / The Irony',
      capacity: '15-30 guests',
      crewFeeNote: '+$50/hr crew fee for 26-30 guests'
    },
    '50': {
      name: 'Clever Girl',
      capacity: '31-75 guests',
      crewFeeNote: '+$100/hr crew fee for 51-75 guests'
    }
  };
  
  const boat = boats[selectedBoat];
  const packages = PACKAGE_DETAILS[selectedBoat as unknown as 14 | 25 | 50];
  const hourlyRate = HOURLY_RATES[selectedDay][selectedBoat as unknown as 14 | 25 | 50];

  return (
    <div className={className}>
      {/* OUTER TABS: Boat Size */}
      <Tabs value={selectedBoat} onValueChange={(val) => setSelectedBoat(val as '14' | '25' | '50')}>
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-blue-100 dark:bg-blue-950 p-1">
          <TabsTrigger value="14" data-testid="tab-14-person" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Ship className="h-4 w-4 mr-2" />
            1-14 Guests
          </TabsTrigger>
          <TabsTrigger value="25" data-testid="tab-25-person" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Ship className="h-4 w-4 mr-2" />
            15-30 Guests
          </TabsTrigger>
          <TabsTrigger value="50" data-testid="tab-50-person" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Ship className="h-4 w-4 mr-2" />
            31-75 Guests
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedBoat} className="space-y-6">
          {/* Boat Info Card */}
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Ship className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-lg" data-testid="boat-name">{boat.name}</p>
                    <p className="text-sm text-gray-600" data-testid="boat-capacity">{boat.capacity}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* INNER TABS: Day of Week */}
          <Tabs value={selectedDay} onValueChange={(val) => setSelectedDay(val as 'mon-thu' | 'fri' | 'sat' | 'sun')}>
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-blue-100 dark:bg-blue-950 p-1">
              <TabsTrigger value="mon-thu" data-testid="tab-mon-thu" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Mon-Thu
              </TabsTrigger>
              <TabsTrigger value="fri" data-testid="tab-fri" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Friday
              </TabsTrigger>
              <TabsTrigger value="sat" data-testid="tab-sat" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Saturday
              </TabsTrigger>
              <TabsTrigger value="sun" data-testid="tab-sun" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Sunday
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedDay} className="space-y-6">
              {/* Package Comparison Grid - 3 WIDE */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* STANDARD PACKAGE */}
                <Card className="transition-all hover:shadow-xl" data-testid="card-standard">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">{packages.standard.name}</CardTitle>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-primary" data-testid="hourly-standard">
                        {formatCurrency(hourlyRate * 100)}/hr
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Base hourly rate</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      {packages.standard.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="/chat">
                      <Button 
                        className="w-full mt-4" 
                        variant="outline"
                        data-testid="button-book-standard"
                      >
                        Build My Quote
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* ESSENTIALS PACKAGE */}
                <Card className="relative ring-2 ring-primary shadow-lg transition-all hover:shadow-xl" data-testid="card-essentials">
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary/80 text-white px-3 py-1 rounded-bl-lg text-sm">
                    Most Popular
                  </div>
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">{packages.essentials.name}</CardTitle>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-primary" data-testid="hourly-essentials">
                        {formatCurrency(hourlyRate * 100)}/hr
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{packages.essentials.addOn} package add-on</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      {packages.essentials.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="/chat">
                      <Button 
                        className="w-full mt-4"
                        data-testid="button-book-essentials"
                      >
                        Build My Quote
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* ULTIMATE PACKAGE */}
                <Card className="transition-all hover:shadow-xl" data-testid="card-ultimate">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">{packages.ultimate.name}</CardTitle>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-primary" data-testid="hourly-ultimate">
                        {formatCurrency(hourlyRate * 100)}/hr
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{packages.ultimate.addOn} package add-on</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      {packages.ultimate.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="/chat">
                      <Button 
                        className="w-full mt-4" 
                        variant="outline"
                        data-testid="button-book-ultimate"
                      >
                        Build My Quote
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
              
              {/* Crew Fee Note */}
              {boat.crewFeeNote && (
                <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        {boat.crewFeeNote}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
