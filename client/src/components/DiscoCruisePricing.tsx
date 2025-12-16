import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Sparkles, MessageSquare } from 'lucide-react';
import {
  DISCO_TIME_SLOTS,
  DISCO_BASE_INCLUSIONS,
  getPartyAddOns,
  getDiscoNecklaceText,
  type DiscoPartyType,
} from '@shared/constants';

interface DiscoCruisePricingProps {
  className?: string;
  partyType: DiscoPartyType;
  showAddOns?: boolean;
}

export function DiscoCruisePricing({ 
  className = '', 
  partyType,
  showAddOns = true 
}: DiscoCruisePricingProps) {
  const addOns = getPartyAddOns(partyType);
  const necklaceText = getDiscoNecklaceText(partyType);
  
  return (
    <div className={className}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-2">ATX Disco Cruise Pricing & Time Slots</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Hosted Every Fri 12-4 ($95/person), Sat 11-3 ($105/person), Sat 3:30-7:30 ($85/person) from March thru October
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DISCO_TIME_SLOTS.map((slot) => (
          <Card
            key={slot.id}
            className={`relative transition-all hover:shadow-xl h-full flex flex-col ${
              slot.badge === 'BEST' ? 'ring-2 ring-primary shadow-lg' : ''
            }`}
            data-testid={`card-timeslot-${slot.id}`}
          >
            {slot.badge && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary/80 text-white px-3 py-1 rounded-bl-lg text-sm font-semibold">
                {slot.badge}
              </div>
            )}
            
            <CardHeader className="pb-4 flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">{slot.label}</CardTitle>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ATX Disco Cruise</p>
              
              <div className="mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary" data-testid={`price-${slot.id}`}>
                    ${(slot.basePrice / 100).toFixed(0)}
                  </span>
                  <span className="text-gray-600">/person</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Total Cost Per Person w/tax & gratuity = ${(slot.priceWithTax / 100).toFixed(2)}
                </p>
                <p className="text-[10px] text-green-600 dark:text-green-400 mt-1 font-medium">
                  (all in: tax, tip & fees included)
                </p>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 mt-auto">
              <div
                className="xola-custom xola-checkout w-full"
                data-button-id="691574bd162501edc00f151a"
                data-testid={`xola-wrapper-${slot.id}`}
              >
                <Button 
                  className={`w-full ${slot.badge === 'BEST' ? 'bg-primary hover:bg-primary/90 text-white' : 'border-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700'}`}
                  variant={slot.badge === 'BEST' ? 'default' : 'outline'}
                  data-testid={`button-book-${slot.id}`}
                >
                  Book This Time Slot
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Get a Quote Button */}
      <div className="mt-6 text-center">
        <a 
          href="/chat" 
          target="_blank" 
          rel="noopener noreferrer"
          data-testid="button-get-quote-disco"
        >
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Get a Quote
          </Button>
        </a>
      </div>

      <Card className="mt-8 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Included w/ EVERY ATX Disco Cruise Ticket
          </CardTitle>
          <p className="text-center text-lg font-semibold text-primary mt-2">
            Admission to the BEST Damn Day Party in Austin, and the MOST EXCLUSIVE party in Austin, thrown specifically for YOU - the coolest bach groups in town
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DISCO_BASE_INCLUSIONS.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{necklaceText}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm italic">FYI: Devi's cove is BS</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {showAddOns && addOns.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-center">
            {partyType === 'bachelor' && 'Bachelor Add-On Packages'}
            {partyType === 'bachelorette' && 'Bachelorette Add-On Packages'}
            {partyType === 'combined' && 'Combined Bach Add-On Packages'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((addOn) => (
              <Card key={addOn.id} className="border-2 border-purple-200 dark:border-purple-800">
                <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{addOn.name}</CardTitle>
                    <Badge className="bg-purple-600 text-white">
                      ${(addOn.price / 100).toFixed(0)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    {addOn.inclusions.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
