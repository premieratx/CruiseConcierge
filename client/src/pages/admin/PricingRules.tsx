import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import { 
  Ship, 
  Users, 
  DollarSign, 
  Anchor, 
  Star, 
  Clock,
  Info,
  AlertTriangle,
  Package,
  Waves
} from "lucide-react";
import { 
  BOATS, 
  PACKAGE_PRICING_DISPLAY, 
  CREW_FEES, 
  ADDON_FEES 
} from "@shared/constants";

export default function PricingRules() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" data-testid="title-pricing-rules">
                Pricing Rules & Structure
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Single Source of Truth for all pricing and boat recommendations
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <Info className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              This is the authoritative pricing reference for all quote calculations and customer recommendations.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Boat Recommendations by Group Size */}
          <Card className="lg:col-span-2" data-testid="card-boat-recommendations">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-primary" />
                Boat Recommendations by Group Size
              </CardTitle>
              <CardDescription>
                Recommended boats based on group capacity with pricing tiers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Group Size</TableHead>
                    <TableHead>Recommended Boat</TableHead>
                    <TableHead>Base Pricing</TableHead>
                    <TableHead>Extra Crew Fee</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow data-testid="row-boat-1-14">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{PACKAGE_PRICING_DISPLAY[14].groupSizeRange}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Anchor className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">{BOATS.DAY_TRIPPER.displayName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{PACKAGE_PRICING_DISPLAY[14].basePricing}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-500">{PACKAGE_PRICING_DISPLAY[14].crewFee}</span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {PACKAGE_PRICING_DISPLAY[14].notes}
                    </TableCell>
                  </TableRow>
                  <TableRow data-testid="row-boat-15-30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">15-30 people</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Anchor className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">{BOATS.ME_SEEKS_THE_IRONY.displayName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>15-25: <Badge variant="secondary">Standard price</Badge></div>
                        <div>26-30: <Badge variant="destructive">+${CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA / 100}/hour</Badge></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-orange-600 font-medium">${CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA / 100}/hour (26-30)</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {PACKAGE_PRICING_DISPLAY[30].notes}
                    </TableCell>
                  </TableRow>
                  <TableRow data-testid="row-boat-31-75">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">31-75 people</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Anchor className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">{BOATS.CLEVER_GIRL.displayName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>31-50: <Badge variant="secondary">Standard price</Badge></div>
                        <div>51-75: <Badge variant="destructive">+${CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA / 100}/hour</Badge></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span className="text-red-600 font-medium">${CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA / 100}/hour (51-75)</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {PACKAGE_PRICING_DISPLAY[75].notes}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Package Pricing by Boat Size */}
          <Card data-testid="card-package-pricing">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Package Pricing by Boat Size
              </CardTitle>
              <CardDescription>
                Standard package pricing tiers based on group capacity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{PACKAGE_PRICING_DISPLAY[14].groupSizeRange}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{PACKAGE_PRICING_DISPLAY[14].recommendedBoat}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 ml-6">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm">Essentials</span>
                      <Badge variant="outline" data-testid="price-essentials-14">{PACKAGE_PRICING_DISPLAY[14].essentialsPrice}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm">Ultimate</span>
                      <Badge variant="outline" data-testid="price-ultimate-14">{PACKAGE_PRICING_DISPLAY[14].ultimatePrice}</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="font-medium">15-30 people</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{PACKAGE_PRICING_DISPLAY[25].recommendedBoat}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 ml-6">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm">Essentials</span>
                      <Badge variant="outline" data-testid="price-essentials-30">{PACKAGE_PRICING_DISPLAY[25].essentialsPrice}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm">Ultimate</span>
                      <Badge variant="outline" data-testid="price-ultimate-30">{PACKAGE_PRICING_DISPLAY[25].ultimatePrice}</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">31-75 people</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{PACKAGE_PRICING_DISPLAY[75].recommendedBoat}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 ml-6">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm">Essentials</span>
                      <Badge variant="outline" data-testid="price-essentials-75">{PACKAGE_PRICING_DISPLAY[50].essentialsPrice}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm">Ultimate</span>
                      <Badge variant="outline" data-testid="price-ultimate-75">{PACKAGE_PRICING_DISPLAY[75].ultimatePrice}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crew Fee Structure */}
          <Card data-testid="card-crew-fees">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Crew Fee Structure
              </CardTitle>
              <CardDescription>
                Additional hourly crew fees for larger groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                    Crew fees are charged per hour and apply to the entire cruise duration
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                        <Users className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{CREW_FEES.THRESHOLDS.SMALL_BOAT_EXTRA}-30 people</div>
                        <div className="text-sm text-gray-600">Medium group surcharge</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600" data-testid="fee-26-30">+${CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA / 100}/hour</div>
                      <div className="text-xs text-gray-500">Extra crew fee</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                        <Users className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{CREW_FEES.THRESHOLDS.LARGE_BOAT_EXTRA}-75 people</div>
                        <div className="text-sm text-gray-600">Large group surcharge</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600" data-testid="fee-51-75">+${CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA / 100}/hour</div>
                      <div className="text-xs text-gray-500">Extra crew fee</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add-ons Section */}
        <Card className="mt-6" data-testid="card-addons">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-primary" />
              Available Add-ons
            </CardTitle>
            <CardDescription>
              Additional features and equipment available for all boats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-100 dark:bg-cyan-900/50 rounded-full">
                    <Waves className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Lily Pad Float</div>
                    <div className="text-sm text-gray-600">All boats compatible</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-cyan-600" data-testid="addon-lily-pad">${ADDON_FEES.LILY_PAD / 100}</div>
                  <div className="text-xs text-gray-500">One-time fee</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mt-6 border-primary/20" data-testid="card-important-notes">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Star className="h-5 w-5" />
              Important Pricing Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Crew Fee Application:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Crew fees apply to total cruise duration</li>
                  <li>• Fees are added to base cruise price</li>
                  <li>• Only applies to groups exceeding thresholds</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Package Guidelines:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Prices are base amounts before taxes</li>
                  <li>• Ultimate packages include premium features</li>
                  <li>• Group size determines available boats</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}