import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  compareDiscoVsPrivate, 
  getBestDealRecommendation, 
  getSavingsOpportunities,
  PRICING_SCENARIOS,
  calculateDiscoPrice,
  calculatePrivatePrice,
  DISCO_AVAILABILITY 
} from '@shared/constants';
import { 
  DollarSign, TrendingDown, TrendingUp, Calendar, Users, 
  Sparkles, Ship, ArrowRight, CheckCircle, AlertCircle 
} from 'lucide-react';

/**
 * DiscoVsPrivateComparison Component
 * Demonstrates the intelligent comparison logic for disco vs private cruises
 * Integration-ready component for website display
 */

interface ComparisonProps {
  groupSize: number;
  dayOfWeek: number;
  showAlternatives?: boolean;
  className?: string;
}

export function DiscoVsPrivateComparison2({ 
  groupSize = 15, 
  dayOfWeek = 6, 
  showAlternatives = true,
  className = '' 
}: ComparisonProps) {
  const [selectedGroupSize, setSelectedGroupSize] = useState(groupSize);
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(dayOfWeek);
  
  // Get comprehensive comparison
  const comparison = compareDiscoVsPrivate(selectedGroupSize, selectedDayOfWeek);
  const bestDeal = getBestDealRecommendation(selectedGroupSize, selectedDayOfWeek);
  const savingsOps = getSavingsOpportunities(selectedGroupSize, selectedDayOfWeek);
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const selectedDayName = dayNames[selectedDayOfWeek];
  
  return (
    <div className={`space-y-6 ${className}`} data-testid="disco-vs-private-comparison">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Smart Deal Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Group Size</label>
              <select 
                value={selectedGroupSize} 
                onChange={(e) => setSelectedGroupSize(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                data-testid="group-size-select"
              >
                {[8, 10, 12, 15, 18, 20, 25, 30, 40, 50].map(size => (
                  <option key={size} value={size}>{size} people</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Day of Week</label>
              <select 
                value={selectedDayOfWeek} 
                onChange={(e) => setSelectedDayOfWeek(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                data-testid="day-of-week-select"
              >
                {dayNames.map((day, index) => (
                  <option key={index} value={index}>{day}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Primary Recommendation */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Best Deal: {bestDeal.primaryRecommendation.type === 'disco' ? 'ATX Disco Cruise' : 
                        bestDeal.primaryRecommendation.type === 'private' ? 'Private Cruise' : 
                        'Private Cruise (Only Option)'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${(bestDeal.primaryRecommendation.totalCost / 100).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${(bestDeal.primaryRecommendation.costPerPerson / 100).toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">Per Person</div>
            </div>
            <div className="text-center">
              <Badge className="text-sm bg-green-100 text-green-800">
                {bestDeal.groupSizeInsights.category}
              </Badge>
              <div className="text-sm text-gray-600 mt-1">Group Category</div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <p className="font-medium mb-2">Why This is Best:</p>
            <p className="text-gray-700">{bestDeal.primaryRecommendation.whyBest}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <p className="font-medium mb-2">Value Proposition:</p>
            <p className="text-gray-700">{bestDeal.primaryRecommendation.valueMessage}</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Detailed Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Disco Option */}
        <Card className={`${comparison.discoOption.available ? 'border-purple-200' : 'border-gray-200'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              ATX Disco Cruise
              {!comparison.discoOption.available && (
                <Badge variant="secondary">Not Available</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {comparison.discoOption.available ? (
              <div className="space-y-3">
                {/* Disco package options */}
                {Object.entries(DISCO_AVAILABILITY.PACKAGES).map(([key, pkg]) => {
                  const cost = calculateDiscoPrice(selectedGroupSize, key as any);
                  const perPerson = pkg.pricePerPerson / 100;
                  return (
                    <div key={key} className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <div>
                        <div className="font-medium">{pkg.name}</div>
                        <div className="text-sm text-gray-600">${perPerson}/person</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${(cost / 100).toLocaleString()}</div>
                        <div className="text-sm text-gray-600">total</div>
                      </div>
                    </div>
                  );
                })}
                
                <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <span className="font-medium">Available:</span> Friday & Saturday only
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="font-medium">Not Available on {selectedDayName}s</p>
                <p className="text-sm">Disco cruises only run Friday & Saturday</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Private Option */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-blue-500" />
              Private Cruise
              <Badge variant="outline">Always Available</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Private package options */}
              {(['standard', 'essentials', 'ultimate'] as const).map((packageType) => {
                const cost = calculatePrivatePrice(selectedGroupSize, selectedDayOfWeek, packageType);
                const packageLabel = packageType.charAt(0).toUpperCase() + packageType.slice(1);
                return (
                  <div key={packageType} className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <div>
                      <div className="font-medium">{packageLabel} Package</div>
                      <div className="text-sm text-gray-600">
                        {cost.capacityTier}p boat • ${(cost.perPersonCost / 100).toFixed(0)}/person
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${(cost.totalPrice / 100).toLocaleString()}</div>
                      <div className="text-sm text-gray-600">total</div>
                    </div>
                  </div>
                );
              })}
              
              <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <span className="font-medium">Available:</span> 7 days a week, multiple time slots
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Savings Opportunities */}
      {showAlternatives && savingsOps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-green-500" />
              Ways to Save More Money
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savingsOps.slice(0, 3).map((opportunity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-1">
                    <div className="font-medium">{opportunity.description}</div>
                    <div className="text-sm text-gray-600">{opportunity.actionRequired}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      Save ${(opportunity.savings / 100).toFixed(0)}
                    </div>
                    {opportunity.newDayName && (
                      <div className="text-sm text-gray-600">{opportunity.newDayName}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Group Size Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-500" />
            Group Size Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-orange-100 text-orange-800">
                {bestDeal.groupSizeInsights.category}
              </Badge>
              <span className="text-sm text-gray-600">
                Optimal: {bestDeal.groupSizeInsights.optimalRange}
              </span>
            </div>
            <p className="text-gray-700">{bestDeal.groupSizeInsights.recommendation}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Quick Deal Highlight Component
 * Shows a compact comparison for use in hero sections or cards
 */
export function QuickDealHighlight({ 
  groupSize = 15, 
  dayOfWeek = 6,
  className = '' 
}: ComparisonProps) {
  const comparison = compareDiscoVsPrivate(groupSize, dayOfWeek);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  if (comparison.comparison.recommendation === 'private_only') {
    const privateCost = comparison.privateOption.totalCost;
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`} data-testid="quick-deal-highlight">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-blue-600 font-medium">Best Deal • {dayNames[dayOfWeek]}</div>
            <div className="text-lg font-bold">Private Cruise Only</div>
            <div className="text-sm text-gray-600">Great value at ${(privateCost / groupSize / 100).toFixed(0)} per person</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">${(privateCost / 100).toLocaleString()}</div>
            <div className="text-sm text-gray-600">{groupSize} people</div>
          </div>
        </div>
      </div>
    );
  }
  
  const winner = comparison.comparison.recommendation === 'disco' ? comparison.discoOption : comparison.privateOption;
  const savings = comparison.comparison.savings;
  const savingsAmount = savings ? Math.abs(savings / 100) : 0;
  
  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`} data-testid="quick-deal-highlight">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-green-600 font-medium">
            Best Deal • {dayNames[dayOfWeek]} • {groupSize} people
          </div>
          <div className="text-lg font-bold">
            {comparison.comparison.recommendation === 'disco' ? 'ATX Disco Cruise' : 'Private Cruise'}
          </div>
          {savings && savings > 0 && (
            <div className="text-sm text-gray-600">Saves ${savingsAmount.toFixed(0)} vs other option</div>
          )}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            ${(winner.totalCost! / 100).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            ${(winner.costPerPerson! / 100).toFixed(0)}/person
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoVsPrivateComparison2;