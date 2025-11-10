import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Ship, Users, Calendar, Clock, Calculator, FileText, AlertCircle } from 'lucide-react';

export default function Documentation() {
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">System Documentation</h1>
        <p className="text-muted-foreground">
          Complete guide to pricing rules, boat selection, and quote generation
        </p>
      </div>

      <Tabs defaultValue="pricing" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pricing">Pricing Rules</TabsTrigger>
          <TabsTrigger value="boats">Fleet & Capacity</TabsTrigger>
          <TabsTrigger value="quotes">Quote System</TabsTrigger>
          <TabsTrigger value="workflow">Booking Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                4-Hour Cruise Pricing
              </CardTitle>
              <CardDescription>
                All cruises are 4 hours. Pricing varies by day and boat size.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-2">
                  <CardHeader className="pb-3">
                    <h3 className="font-semibold">Monday-Thursday</h3>
                    <Badge variant="secondary">Weekday Rates</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>14-Person Yacht:</span>
                      <span className="font-mono">$1,050 total</span>
                    </div>
                    <div className="flex justify-between">
                      <span>25-Person Cruiser:</span>
                      <span className="font-mono">$1,181 total</span>
                    </div>
                    <div className="flex justify-between">
                      <span>50-Person Charter:</span>
                      <span className="font-mono">$1,413 total</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-3">
                    <h3 className="font-semibold">Friday</h3>
                    <Badge className="bg-blue-500">Premium Day</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>14-Person Yacht:</span>
                      <span className="font-mono">$1,181 total</span>
                    </div>
                    <div className="flex justify-between">
                      <span>25-Person Cruiser:</span>
                      <span className="font-mono">$1,313 total</span>
                    </div>
                    <div className="flex justify-between">
                      <span>50-Person Charter:</span>
                      <span className="font-mono">$1,554 total</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-3">
                    <h3 className="font-semibold">Saturday</h3>
                    <Badge className="bg-purple-500">Peak Day</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>14-Person Yacht:</span>
                      <span className="font-mono">$1,838 total</span>
                    </div>
                    <div className="flex justify-between">
                      <span>25-Person Cruiser:</span>
                      <span className="font-mono">$1,969 total</span>
                    </div>
                    <div className="flex justify-between">
                      <span>50-Person Charter:</span>
                      <span className="font-mono">$2,260 total</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-3">
                    <h3 className="font-semibold">Sunday</h3>
                    <Badge className="bg-orange-500">Weekend Day</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>14-Person Yacht:</span>
                      <span className="font-mono">$1,313 total</span>
                    </div>
                    <div className="flex justify-between">
                      <span>25-Person Cruiser:</span>
                      <span className="font-mono">$1,444 total</span>
                    </div>
                    <div className="flex justify-between">
                      <span>50-Person Charter:</span>
                      <span className="font-mono">$1,695 total</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    Texas Crew Law Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <span className="font-medium">26-30 People:</span>
                    <Badge variant="outline" className="font-mono">+$50/hour additional crew</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <span className="font-medium">51-75 People:</span>
                    <Badge variant="outline" className="font-mono">+$100/hour additional crew</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    * Groups of 1-25 and 31-50 people do not require additional crew
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="h-5 w-5" />
                    Quote Calculation Formula
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-primary">1.</span>
                      <span><strong>Base Cruise Cost</strong> = Base Rate × 4 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-primary">2.</span>
                      <span><strong>Crew Fee</strong> = Additional crew fee (if applicable) × 4 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-primary">3.</span>
                      <span><strong>Subtotal Before Tax</strong> = Base Cruise Cost + Crew Fee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-primary">4.</span>
                      <span><strong>Mandatory Gratuity</strong> = Subtotal Before Tax × 20%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-primary">5.</span>
                      <span><strong>Subtotal</strong> = Subtotal Before Tax + Gratuity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-primary">6.</span>
                      <span><strong>Sales Tax</strong> = Subtotal × 8.25% (Texas rate)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-primary">7.</span>
                      <span><strong>Grand Total</strong> = Subtotal + Sales Tax</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    Payment Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Standard Booking (30+ days out)</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Deposit:</strong> 25% due at booking</li>
                        <li>• <strong>Balance:</strong> 75% due 30 days before event</li>
                        <li>• <strong>Quote Validity:</strong> 7 days</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Last-Minute Booking (&lt;30 days)</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Payment:</strong> 100% due at booking</li>
                        <li>• <strong>Processing:</strong> Immediate</li>
                        <li>• <strong>Urgency:</strong> Limited availability warning</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="boats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                Fleet & Capacity Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <h3 className="font-semibold">14-Person Luxury Yacht</h3>
                    <Badge variant="outline">1-14 guests</Badge>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>Perfect for intimate gatherings</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Luxury amenities</li>
                      <li>• Premium sound system</li>
                      <li>• Full shade canopy</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <h3 className="font-semibold">25-Person Party Cruiser</h3>
                    <Badge variant="outline">15-30 guests</Badge>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>Ideal for celebrations</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Party deck</li>
                      <li>• DJ-ready setup</li>
                      <li>• Multiple cooler areas</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <h3 className="font-semibold">50-Person Charter Yacht</h3>
                    <Badge variant="outline">31-75 guests</Badge>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>Maximum capacity vessel</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Two-level deck</li>
                      <li>• Professional crew</li>
                      <li>• Event lighting</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                <CardHeader>
                  <CardTitle className="text-lg">Automatic Boat Selection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    The system automatically selects the appropriate boat based on group size:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      Groups of 1-14 → 14-Person Luxury Yacht
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      Groups of 15-30 → 25-Person Party Cruiser  
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      Groups of 31-75 → 50-Person Charter Yacht
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Quote Generation System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold">Quote Components</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ Automatic pricing calculation based on date, time, and group size</li>
                  <li>✓ Itemized breakdown with base rate, crew fees, gratuity, and tax</li>
                  <li>✓ Per-person pricing display</li>
                  <li>✓ Deposit and payment schedule</li>
                  <li>✓ 7-day validity period</li>
                  <li>✓ Interactive customization options</li>
                  <li>✓ Electronic signature capability</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Quote Delivery</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Email Delivery</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• HTML email with branding</li>
                      <li>• "View Quote" button</li>
                      <li>• Quote summary in email body</li>
                      <li>• Tracking pixel for open rates</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">SMS Delivery</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Short personalized message</li>
                      <li>• Direct link to quote</li>
                      <li>• Total price included</li>
                      <li>• GoHighLevel integration</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Interactive Quote Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Add/remove optional services (DJ, photographer, lily pads)</li>
                  <li>• Apply discount codes</li>
                  <li>• Adjust party size (recalculates pricing)</li>
                  <li>• Change time slots if available</li>
                  <li>• Add special requests or notes</li>
                  <li>• Electronic signature with timestamp</li>
                  <li>• Automatic invoice generation upon signing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Complete Booking Workflow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">AI Chatbot Interaction</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      User selects event type, enters contact info, chooses date/time/group size
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Real-Time Price Display</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      System calculates and shows complete pricing breakdown instantly
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Lead & Quote Creation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Contact, project, and quote records created in CRM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Quote Delivery</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Email and SMS sent with link to interactive quote
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    5
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Customer Review & Customization</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Customer can adjust options, apply discounts, add services
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    6
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Electronic Signature</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Customer signs quote electronically
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    7
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Invoice Generation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      System automatically creates invoice and updates project status
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    8
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Payment Processing</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Stripe integration for deposit/full payment collection
                    </p>
                  </div>
                </div>
              </div>

              <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-green-600" />
                    Automation Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-1">
                    <li>✓ No manual price calculation needed</li>
                    <li>✓ Instant quote delivery 24/7</li>
                    <li>✓ Automatic lead tracking in CRM</li>
                    <li>✓ Reduced response time from hours to seconds</li>
                    <li>✓ Consistent pricing across all channels</li>
                    <li>✓ Complete audit trail of all interactions</li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}