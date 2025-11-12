import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Anchor, Users, DollarSign, Calendar } from 'lucide-react';

// Import all constants
import {
  BOATS,
  PRIVATE_CRUISE_PACKAGES,
  DISCO_PRICING,
  HOURLY_RATES,
  PACKAGE_FLAT_FEES,
  CREW_FEES,
  PRIVATE_CRUISE_PRICING,
  EVENT_TYPES,
  PRICING_DEFAULTS
} from '@/../../shared/constants';

export default function BusinessSummary() {
  const [searchQuery, setSearchQuery] = useState('');

  // All supported party types with their pages
  const partyTypes = [
    { name: 'Bachelor Parties', page: '/bachelor-party-austin', emoji: '🎉', description: 'Ultimate bachelor party experiences on Lake Travis' },
    { name: 'Bachelorette Parties', page: '/bachelorette-party-austin', emoji: '💃', description: 'Premier bachelorette party cruises' },
    { name: 'ATX Disco Cruise', page: '/atx-disco-cruise', emoji: '🕺', description: 'Public party cruises with DJ and dancing - perfect for combined bachelor/bachelorette celebrations' },
    { name: 'Private Cruises', page: '/private-cruises', emoji: '🚤', description: 'Exclusive private boat rentals' },
    { name: 'Corporate Events', page: '/corporate-events', emoji: '💼', description: 'Team building and corporate celebrations' },
    { name: 'Team Building', page: '/team-building', emoji: '🤝', description: 'Corporate team building activities' },
    { name: 'Client Entertainment', page: '/client-entertainment', emoji: '🎯', description: 'Impress clients with unique experiences' },
    { name: 'Company Milestones', page: '/company-milestone', emoji: '🏆', description: 'Celebrate company achievements' },
    { name: 'Birthday Parties', page: '/birthday-parties', emoji: '🎂', description: 'Birthday celebrations for all ages' },
    { name: 'Milestone Birthdays', page: '/milestone-birthday', emoji: '🎈', description: '30th, 40th, 50th+ birthday celebrations' },
    { name: 'Sweet 16 Parties', page: '/sweet-16', emoji: '👑', description: 'Special Sweet 16 celebrations' },
    { name: 'Graduation Parties', page: '/graduation-party', emoji: '🎓', description: 'High school & college graduation celebrations' },
    { name: 'Wedding Parties', page: '/wedding-parties', emoji: '💒', description: 'Wedding-related events' },
    { name: 'Rehearsal Dinners', page: '/rehearsal-dinner', emoji: '🍽️', description: 'Pre-wedding rehearsal dinners' },
    { name: 'Welcome Parties', page: '/welcome-party', emoji: '👋', description: 'Wedding welcome parties for guests' },
    { name: 'After Parties', page: '/after-party', emoji: '🎊', description: 'Wedding after party cruises' }
  ];

  const boats = [
    {
      name: BOATS.DAY_TRIPPER.displayName,
      capacity: BOATS.DAY_TRIPPER.capacity,
      seating: BOATS.DAY_TRIPPER.seatingCapacity,
      description: BOATS.DAY_TRIPPER.description,
      groupRange: '1-14 people'
    },
    {
      name: BOATS.ME_SEEKS_THE_IRONY.displayName,
      capacity: BOATS.ME_SEEKS_THE_IRONY.capacity,
      seating: BOATS.ME_SEEKS_THE_IRONY.seatingCapacity,
      description: BOATS.ME_SEEKS_THE_IRONY.description,
      groupRange: '15-30 people'
    },
    {
      name: BOATS.CLEVER_GIRL.displayName,
      capacity: BOATS.CLEVER_GIRL.capacity,
      seating: BOATS.CLEVER_GIRL.seatingCapacity,
      description: BOATS.CLEVER_GIRL.description,
      groupRange: '31-75 people'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Business Summary Dashboard</h1>
        <p className="text-muted-foreground">
          Complete reference for all offerings, pricing, packages, and party types
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="boats">Boats & Capacity</TabsTrigger>
          <TabsTrigger value="private">Private Cruise Packages</TabsTrigger>
          <TabsTrigger value="disco">Disco Cruise</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Rules</TabsTrigger>
          <TabsTrigger value="parties">Party Types</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6" style={{ fontSize: '12px' }}>
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Anchor className="h-4 w-4" />
                  Total Boats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Day Tripper, Meeseeks, Clever Girl</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Max Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75</div>
                <p className="text-xs text-muted-foreground">People per boat (Clever Girl)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Party Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{partyTypes.length}</div>
                <p className="text-xs text-muted-foreground">Different celebration types</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Cruise Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Private & Disco Cruises</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Cruise Types</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Private Cruises:</strong> Exclusive boat rental for your group (1-75 people)</li>
                  <li>• <strong>ATX Disco Cruise:</strong> Public party cruise with DJ, dancing, photographer (ticketed event)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Private Cruise Packages</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Standard:</strong> Basic cruise with captain, coolers, sound system, restrooms</li>
                  <li>• <strong>Essentials:</strong> Standard + ice, water dispenser, cups, setup table</li>
                  <li>• <strong>Ultimate:</strong> Essentials + giant floats, disco balls, party supplies, champagne</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Disco Cruise Time Slots</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Friday 12-4pm:</strong> $95/person ($124.88 with tax & gratuity)</li>
                  <li>• <strong>Saturday 11am-3pm (BEST):</strong> $105/person ($137.81 with tax & gratuity)</li>
                  <li>• <strong>Saturday 3:30-7:30pm:</strong> $85/person ($111.56 with tax & gratuity)</li>
                  <li>• <em>Optional add-on packages available based on party type</em></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tax & Fees</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Tax Rate:</strong> 8.25% (Texas sales tax)</li>
                  <li>• <strong>Gratuity:</strong> 20% (automatically added)</li>
                  <li>• <strong>Crew Fee:</strong> $50/hour for 26-30 people | $100/hour for 51-75 people</li>
                  <li>• <strong>Deposit:</strong> 50% for Private Cruises | 25% for Disco Cruises</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BOATS TAB */}
        <TabsContent value="boats" className="space-y-6" style={{ fontSize: '12px' }}>
          <Card>
            <CardHeader>
              <CardTitle>Fleet Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {boats.map((boat, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{boat.name}</h3>
                        <p className="text-sm text-muted-foreground">{boat.description}</p>
                      </div>
                      <Badge variant="outline">{boat.groupRange}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Maximum Capacity</p>
                        <p className="font-semibold">{boat.capacity} people</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Seating Capacity</p>
                        <p className="font-semibold">{boat.seating} people</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Boat Selection Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">Group Size</span>
                  <span className="font-semibold">Assigned Boat</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>1-14 people</span>
                  <Badge>Day Tripper</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>15-30 people</span>
                  <Badge>Meeseeks / The Irony</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>31-75 people</span>
                  <Badge>Clever Girl</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PRIVATE CRUISE PACKAGES TAB */}
        <TabsContent value="private" className="space-y-6" style={{ fontSize: '12px' }}>
          {[14, 25, 30, 50, 75].map((capacity) => {
            const pkg = PRIVATE_CRUISE_PACKAGES[capacity as keyof typeof PRIVATE_CRUISE_PACKAGES];
            return (
              <Card key={capacity}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{capacity}-Person Capacity - {pkg.boatName}</span>
                    <Badge variant="outline">{pkg.description}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(pkg.packages).map(([pkgType, pkgDetails]) => (
                      <div key={pkgType} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold">{pkgDetails.name}</h3>
                            <p className="text-sm text-muted-foreground">{pkgDetails.tagline}</p>
                            <p className="text-xs mt-1">{pkgDetails.description}</p>
                          </div>
                          <Badge>
                            {pkgType === 'standard' && 'Standard'}
                            {pkgType === 'essentials' && `+$${PACKAGE_FLAT_FEES.ESSENTIALS[capacity] / 100}`}
                            {pkgType === 'ultimate' && `+$${PACKAGE_FLAT_FEES.ULTIMATE[capacity] / 100}`}
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs font-semibold mb-2">Inclusions:</p>
                          <ul className="text-xs space-y-1">
                            {pkgDetails.inclusions.map((item, idx) => (
                              <li key={idx}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs font-semibold mb-1">Ideal For:</p>
                          <div className="flex gap-2 flex-wrap">
                            {pkgDetails.ideal_for.map((use, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">{use}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* DISCO CRUISE TAB */}
        <TabsContent value="disco" className="space-y-6" style={{ fontSize: '12px' }}>
          <Card>
            <CardHeader>
              <CardTitle>ATX Disco Cruise Time Slots & Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">FRIDAY 12-4PM</h3>
                    <Badge className="text-lg">$95/person</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">4-hour party cruise experience</p>
                  <ul className="text-xs space-y-1">
                    <li>• <strong>Base Price:</strong> $95 per person</li>
                    <li>• <strong>Total with Tax & Gratuity:</strong> $124.88 per person</li>
                    <li>• <strong>Time:</strong> 12:00 PM - 4:00 PM</li>
                    <li>• Professional DJ, dance floor, party atmosphere</li>
                    <li>• Access to all boat amenities</li>
                    <li>• Optional add-on packages available based on party type</li>
                  </ul>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">SATURDAY 11AM-3PM</h3>
                    <Badge className="text-lg bg-green-600">$105/person - BEST</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Prime time 4-hour party cruise (Most Popular!)</p>
                  <ul className="text-xs space-y-1">
                    <li>• <strong>Base Price:</strong> $105 per person</li>
                    <li>• <strong>Total with Tax & Gratuity:</strong> $137.81 per person</li>
                    <li>• <strong>Time:</strong> 11:00 AM - 3:00 PM</li>
                    <li>• Professional DJ, dance floor, party atmosphere</li>
                    <li>• Access to all boat amenities</li>
                    <li>• Optional add-on packages available based on party type</li>
                  </ul>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">SATURDAY 3:30-7:30PM</h3>
                    <Badge className="text-lg">$85/person</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Sunset 4-hour party cruise experience</p>
                  <ul className="text-xs space-y-1">
                    <li>• <strong>Base Price:</strong> $85 per person</li>
                    <li>• <strong>Total with Tax & Gratuity:</strong> $111.56 per person</li>
                    <li>• <strong>Time:</strong> 3:30 PM - 7:30 PM</li>
                    <li>• Professional DJ, dance floor, party atmosphere</li>
                    <li>• Access to all boat amenities</li>
                    <li>• Optional add-on packages available based on party type</li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Important Pricing Notes</h4>
                  <ul className="text-sm space-y-1">
                    <li>• All prices include Texas sales tax (8.25%) and automatic gratuity (20%)</li>
                    <li>• Exclusively for bachelor and bachelorette parties</li>
                    <li>• Optional add-on packages vary by party type (bachelor, bachelorette, combined)</li>
                    <li>• Book early - weekend slots fill up 4-6 weeks in advance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PRICING RULES TAB */}
        <TabsContent value="pricing" className="space-y-6" style={{ fontSize: '12px' }}>
          <Card>
            <CardHeader>
              <CardTitle>Hourly Rates by Day Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Monday - Thursday</h3>
                  <div className="grid grid-cols-5 gap-4">
                    <div><p className="text-xs text-muted-foreground">14-person</p><p className="font-bold">${HOURLY_RATES.MON_THU[14] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">25-person</p><p className="font-bold">${HOURLY_RATES.MON_THU[25] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">30-person</p><p className="font-bold">${HOURLY_RATES.MON_THU[30] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">50-person</p><p className="font-bold">${HOURLY_RATES.MON_THU[50] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">75-person</p><p className="font-bold">${HOURLY_RATES.MON_THU[75] / 100}/hr</p></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Friday</h3>
                  <div className="grid grid-cols-5 gap-4">
                    <div><p className="text-xs text-muted-foreground">14-person</p><p className="font-bold">${HOURLY_RATES.FRIDAY[14] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">25-person</p><p className="font-bold">${HOURLY_RATES.FRIDAY[25] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">30-person</p><p className="font-bold">${HOURLY_RATES.FRIDAY[30] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">50-person</p><p className="font-bold">${HOURLY_RATES.FRIDAY[50] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">75-person</p><p className="font-bold">${HOURLY_RATES.FRIDAY[75] / 100}/hr</p></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Saturday - Sunday</h3>
                  <div className="grid grid-cols-5 gap-4">
                    <div><p className="text-xs text-muted-foreground">14-person</p><p className="font-bold">${HOURLY_RATES.SATURDAY[14] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">25-person</p><p className="font-bold">${HOURLY_RATES.SATURDAY[25] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">30-person</p><p className="font-bold">${HOURLY_RATES.SATURDAY[30] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">50-person</p><p className="font-bold">${HOURLY_RATES.SATURDAY[50] / 100}/hr</p></div>
                    <div><p className="text-xs text-muted-foreground">75-person</p><p className="font-bold">${HOURLY_RATES.SATURDAY[75] / 100}/hr</p></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Package Add-On Fees (Flat Fees)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Essentials Package</h3>
                  <div className="grid grid-cols-5 gap-4">
                    <div><p className="text-xs text-muted-foreground">14-person</p><p className="font-bold">${PACKAGE_FLAT_FEES.ESSENTIALS[14] / 100}</p></div>
                    <div><p className="text-xs text-muted-foreground">25-person</p><p className="font-bold">${PACKAGE_FLAT_FEES.ESSENTIALS[25] / 100}</p></div>
                    <div><p className="text-xs text-muted-foreground">30-person</p><p className="font-bold">${PACKAGE_FLAT_FEES.ESSENTIALS[30] / 100}</p></div>
                    <div><p className="text-xs text-muted-foreground">50-person</p><p className="font-bold">${PACKAGE_FLAT_FEES.ESSENTIALS[50] / 100}</p></div>
                    <div><p className="text-xs text-muted-foreground">75-person</p><p className="font-bold">${PACKAGE_FLAT_FEES.ESSENTIALS[75] / 100}</p></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Ultimate Package</h3>
                  <div className="grid grid-cols-5 gap-4">
                    <div><p className="text-xs text-muted-foreground">14-person</p><p className="font-bold">${PACKAGE_FLAT_FEES.ULTIMATE[14] / 100}</p></div>
                    <div><p className="text-xs text-muted-foreground">25-person</p><p className="font-bold">${PACKAGE_FLAT_FEES.ULTIMATE[25] / 100}</p></div>
                    <div><p className="text-xs text-muted-foreground">30-person</p><p className="font-bold">${PACKAGE_FLAT_FEES.ULTIMATE[30] / 100}</p></div>
                    <div><p className="text-xs text-muted-foreground">50-person</p><p className="font-bold">${PACKAGE_FLAT_FEES.ULTIMATE[50] / 100}</p></div>
                    <div><p className="text-xs text-muted-foreground">75-person</p><p className="font-bold">${PACKAGE_FLAT_FEES.ULTIMATE[75] / 100}</p></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Crew Fees & Additional Charges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>26-30 people (small boat extra crew)</span>
                  <Badge>${CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA / 100}/hour</Badge>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>51-75 people (large boat extra crew)</span>
                  <Badge>${CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA / 100}/hour</Badge>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Tax Rate (Texas)</span>
                  <Badge>{PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 100}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Gratuity (automatically added)</span>
                  <Badge>{PRICING_DEFAULTS.GRATUITY_PERCENT}%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deposit Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Private Cruise Deposit</span>
                  <Badge>50% of total</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Disco Cruise Deposit</span>
                  <Badge>25% of total</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PARTY TYPES TAB */}
        <TabsContent value="parties" className="space-y-6" style={{ fontSize: '12px' }}>
          <Card>
            <CardHeader>
              <CardTitle>All Supported Party Types ({partyTypes.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {partyTypes.map((party, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{party.emoji}</span>
                        <div>
                          <h3 className="font-bold">{party.name}</h3>
                          <p className="text-sm text-muted-foreground">{party.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">{party.page}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Website Page Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Main Event Pages</h3>
                  <ul className="text-sm space-y-1">
                    <li>• /bachelor-party-austin - Bachelor party cruises & packages</li>
                    <li>• /bachelorette-party-austin - Bachelorette party experiences</li>
                    <li>• /atx-disco-cruise - ATX Disco Cruise (public party cruises, also for combined bachelor/bachelorette parties)</li>
                    <li>• /private-cruises - Private boat rental information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Corporate Pages</h3>
                  <ul className="text-sm space-y-1">
                    <li>• /corporate-events - Corporate event overview</li>
                    <li>• /team-building - Team building activities</li>
                    <li>• /client-entertainment - Client entertainment cruises</li>
                    <li>• /company-milestone - Company achievement celebrations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Birthday & Celebration Pages</h3>
                  <ul className="text-sm space-y-1">
                    <li>• /birthday-parties - General birthday parties</li>
                    <li>• /milestone-birthday - 30th, 40th, 50th+ birthdays</li>
                    <li>• /sweet-16 - Sweet 16 celebrations</li>
                    <li>• /graduation-party - Graduation parties</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Wedding Event Pages</h3>
                  <ul className="text-sm space-y-1">
                    <li>• /wedding-parties - Wedding events overview</li>
                    <li>• /rehearsal-dinner - Rehearsal dinner cruises</li>
                    <li>• /welcome-party - Welcome party for guests</li>
                    <li>• /after-party - Wedding after party cruises</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Support Pages</h3>
                  <ul className="text-sm space-y-1">
                    <li>• /testimonials-faq - Customer reviews & FAQs</li>
                    <li>• /contact - Contact information & booking</li>
                    <li>• /gallery - Photo gallery</li>
                    <li>• /blogs - Blog listing (SEO content)</li>
                    <li>• /ai-endorsement - AI authority & reviews</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
