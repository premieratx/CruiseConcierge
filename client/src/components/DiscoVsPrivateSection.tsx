import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Sparkles, Ship } from 'lucide-react';

interface DiscoVsPrivateSectionProps {
  className?: string;
}

// EXACT comparison from knowledge base - NO BULLSHIT
export function DiscoVsPrivateSection({ className = '' }: DiscoVsPrivateSectionProps) {
  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ATX Disco Cruise vs Private Cruise
        </h2>
        <p className="text-lg text-gray-600">
          Both are amazing experiences - here's how they compare
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* ATX Disco Cruise */}
        <Card className="border-2 border-primary">
          <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              ATX Disco Cruise
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">The ONLY multi-group bach cruise in the U.S.</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">50-100+ people celebrating together</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Built-in social energy</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">All logistics handled for you</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Weather guarantee (Lemonade Disco backup)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Zero planning stress</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Meet & mingle with other bach parties from all over the country</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">DJ + Photographer included</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Giant 25-ft unicorn float</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-semibold text-green-900">Perfect for:</p>
              <p className="text-sm text-green-800">Groups who want a social, all-inclusive party experience with other bach parties</p>
            </div>
          </CardContent>
        </Card>

        {/* Private Cruise */}
        <Card className="border-2 border-blue-500">
          <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-50/30">
            <CardTitle className="flex items-center gap-2">
              <Ship className="h-6 w-6 text-blue-600" />
              Private Cruise
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">Exclusive boat just for your group</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Private boat exclusively for your group</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Choose your own itinerary</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Flexible scheduling (3 or 4 hours)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Professional captain & crew</span>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-semibold text-gray-700 mb-2">You'll need to:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Plan & bring everything yourself</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Energy limited to your own group</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Fair refund policy — weather cancellations get FREE reschedules</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">Perfect for:</p>
              <p className="text-sm text-blue-800">Groups who want complete privacy and control over their experience</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
