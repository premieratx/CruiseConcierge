import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  Clock, 
  AlertCircle, 
  Phone, 
  Mail, 
  Calendar,
  DollarSign,
  Shield,
  FileText,
  Info,
  CheckCircle,
  Timer
} from 'lucide-react';
import { formatCurrency, formatDate } from '@shared/formatters';
import { PRICING_POLICIES } from '@shared/constants';
import { calculateDeposit } from '@shared/pricing';
import { differenceInDays } from 'date-fns';

interface PricingPolicyDisplayProps {
  /** Total cruise cost for deposit calculation */
  totalCost?: number;
  /** Event date for urgency determination */
  eventDate?: Date;
  /** Show compact version */
  compact?: boolean;
  /** Show specific sections only */
  sections?: ('deposit' | 'payment' | 'cancellation' | 'contact' | 'legal')[];
  /** Custom styling */
  className?: string;
  /** Show deposit calculation details */
  showDepositDetails?: boolean;
  /** Entry point context for tailored messaging */
  context?: 'chat' | 'bachelor' | 'bachelorette' | 'checkout' | 'general';
}

/**
 * Comprehensive Pricing Policy Display Component
 * Provides consistent policy information across all booking flows
 */
export function PricingPolicyDisplay({
  totalCost,
  eventDate,
  compact = false,
  sections = ['deposit', 'payment', 'cancellation', 'contact'],
  className = '',
  showDepositDetails = false,
  context = 'general'
}: PricingPolicyDisplayProps) {
  // Calculate deposit information if total cost and event date provided
  const depositInfo = totalCost && eventDate ? calculateDeposit(totalCost, eventDate) : null;
  const isUrgentBooking = depositInfo?.isUrgentBooking || false;
  const daysUntilEvent = eventDate ? differenceInDays(eventDate, new Date()) : null;

  // Context-specific messaging
  const getContextualMessage = () => {
    switch (context) {
      case 'bachelor':
        return "Ready to secure your bachelor party cruise? Here's how our payment process works:";
      case 'bachelorette':
        return "Ready to book your bachelorette celebration? Here's our simple payment structure:";
      case 'chat':
        return "Here are the payment terms for your cruise booking:";
      case 'checkout':
        return "Review our payment policies before completing your booking:";
      default:
        return "Premier Party Cruises Payment Policies:";
    }
  };

  if (compact) {
    return (
      <Card className={`border-blue-100 dark:border-blue-800 ${className}`} data-testid="pricing-policy-compact">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            <Info className="h-4 w-4" />
            Payment Terms
          </div>
          
          {isUrgentBooking ? (
            <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950">
              <Timer className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Urgent Booking:</strong> {PRICING_POLICIES.deposit.urgent.percentage}% deposit required, 
                balance due within {PRICING_POLICIES.deposit.urgent.paymentWindow} hours
              </AlertDescription>
            </Alert>
          ) : (
            <div className="text-sm text-muted-foreground">
              {PRICING_POLICIES.deposit.standard.percentage}% deposit to book, 
              {PRICING_POLICIES.deposit.standard.balancePercentage}% due {PRICING_POLICIES.deposit.standard.balanceDueDays} days before cruise
            </div>
          )}
          
          {depositInfo && showDepositDetails && (
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
              <div className="flex justify-between items-center text-sm">
                <span>Deposit Required:</span>
                <span className="font-bold text-green-600">{formatCurrency(depositInfo.depositAmount)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Balance Due:</span>
                <span className="font-medium">{formatCurrency(depositInfo.balanceDue)}</span>
              </div>
              {depositInfo.remainingBalanceDueAt && (
                <div className="text-xs text-muted-foreground mt-1">
                  Balance due: {formatDate(depositInfo.remainingBalanceDueAt)}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-blue-100 dark:border-blue-800 ${className}`} data-testid="pricing-policy-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-blue-600" />
          {getContextualMessage()}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Deposit Policy Section */}
        {sections.includes('deposit') && (
          <div className="space-y-4" data-testid="section-deposit">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <h3 className="font-semibold text-base">Deposit & Payment Schedule</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Standard Booking */}
              <div className={`p-4 rounded-lg border-2 ${isUrgentBooking ? 'border-gray-200 opacity-75' : 'border-green-200 bg-green-50 dark:bg-green-950'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className={`h-4 w-4 ${isUrgentBooking ? 'text-gray-400' : 'text-green-600'}`} />
                  <span className="font-medium text-sm">{PRICING_POLICIES.deposit.standard.title}</span>
                  {!isUrgentBooking && <Badge variant="default" className="text-xs">Your Rate</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {PRICING_POLICIES.deposit.standard.subtitle}
                </p>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• {PRICING_POLICIES.deposit.standard.percentage}% deposit to secure booking</li>
                  <li>• Remaining {PRICING_POLICIES.deposit.standard.balancePercentage}% due {PRICING_POLICIES.deposit.standard.balanceDueDays} days before cruise</li>
                  <li>• For bookings made 14+ days in advance</li>
                </ul>
              </div>
              
              {/* Urgent Booking */}
              <div className={`p-4 rounded-lg border-2 ${isUrgentBooking ? 'border-orange-200 bg-orange-50 dark:bg-orange-950' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Timer className={`h-4 w-4 ${isUrgentBooking ? 'text-orange-600' : 'text-gray-400'}`} />
                  <span className="font-medium text-sm">{PRICING_POLICIES.deposit.urgent.title}</span>
                  {isUrgentBooking && <Badge variant="secondary" className="text-xs bg-orange-200 text-orange-800">Your Rate</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {PRICING_POLICIES.deposit.urgent.subtitle}
                </p>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• {PRICING_POLICIES.deposit.urgent.percentage}% deposit required</li>
                  <li>• Balance due within {PRICING_POLICIES.deposit.urgent.paymentWindow} hours</li>
                  <li>• For bookings made less than 14 days from cruise date</li>
                </ul>
              </div>
            </div>
            
            {/* Deposit Calculation Details */}
            {depositInfo && showDepositDetails && (
              <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                <Calendar className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div className="font-medium text-sm mb-2">Your Booking Details:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Days until cruise:</span>
                        <span className="font-medium">{daysUntilEvent} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deposit rate:</span>
                        <span className="font-medium">{depositInfo.depositPercent}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deposit amount:</span>
                        <span className="font-bold text-green-600">{formatCurrency(depositInfo.depositAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Balance due:</span>
                        <span className="font-medium">{formatCurrency(depositInfo.balanceDue)}</span>
                      </div>
                    </div>
                    {depositInfo.remainingBalanceDueAt && (
                      <div className="text-sm mt-2 p-2 bg-white dark:bg-gray-800 rounded">
                        <strong>Balance Due Date:</strong> {formatDate(depositInfo.remainingBalanceDueAt)}
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Payment Methods Section */}
        {sections.includes('payment') && (
          <>
            <Separator />
            <div className="space-y-4" data-testid="section-payment">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-blue-600" />
                <h3 className="font-semibold text-base">Accepted Payment Methods</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {PRICING_POLICIES.paymentTerms.acceptedMethods.map((method, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{method}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  <div className="font-medium text-sm mb-2">Processing Times:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Credit/Debit Card:</span>
                      <span className="font-medium text-green-600">{PRICING_POLICIES.paymentTerms.processingTime.creditCard}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bank Transfer:</span>
                      <span className="font-medium">{PRICING_POLICIES.paymentTerms.processingTime.bankTransfer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check:</span>
                      <span className="font-medium">{PRICING_POLICIES.paymentTerms.processingTime.check}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" />
                <span>{PRICING_POLICIES.paymentTerms.securityNote}</span>
              </div>
            </div>
          </>
        )}

        {/* Cancellation Policy Section */}
        {sections.includes('cancellation') && (
          <>
            <Separator />
            <div className="space-y-4" data-testid="section-cancellation">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <h3 className="font-semibold text-base">Cancellation & Refund Policy</h3>
              </div>
              
              <Alert className="border-orange-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="text-sm">{PRICING_POLICIES.cancellation.policy}</p>
                    <div className="text-sm">
                      <strong className="text-green-600">Weather Policy:</strong> {PRICING_POLICIES.cancellation.weatherPolicy}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-medium text-sm">Cancellation Timeline:</div>
                  {Object.entries(PRICING_POLICIES.cancellation.timeline).map(([timeframe, policy]) => (
                    <div key={timeframe} className="flex text-sm">
                      <span className="font-medium w-20 flex-shrink-0">{timeframe}:</span>
                      <span className="text-muted-foreground">{policy}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
                  <div className="font-medium text-sm mb-2 text-yellow-800 dark:text-yellow-200">Important Notes:</div>
                  <ul className="text-xs space-y-1 text-yellow-700 dark:text-yellow-300">
                    <li>• Contact us immediately for cancellations</li>
                    <li>• Weather cancellations receive full refund</li>
                    <li>• Emergency situations evaluated case-by-case</li>
                    <li>• Fair refund policy — all weather-caused cancellations get FREE reschedules</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Contact Information Section */}
        {sections.includes('contact') && (
          <>
            <Separator />
            <div className="space-y-4" data-testid="section-contact">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <h3 className="font-semibold text-base">Contact Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                    <div className="font-medium text-sm mb-2">Booking Questions:</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{PRICING_POLICIES.contact.bookingQuestions.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{PRICING_POLICIES.contact.bookingQuestions.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                    <div className="font-medium text-sm mb-2">Policy Questions:</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{PRICING_POLICIES.contact.policyQuestions.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{PRICING_POLICIES.contact.policyQuestions.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                    <div className="font-medium text-sm mb-2">Emergency Contact:</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{PRICING_POLICIES.contact.emergencyContact.phone}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {PRICING_POLICIES.contact.emergencyContact.available}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <div className="font-medium text-sm mb-2">Business Hours:</div>
                    <div className="text-sm text-muted-foreground">
                      {PRICING_POLICIES.contact.businessHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Legal Information Section */}
        {sections.includes('legal') && (
          <>
            <Separator />
            <div className="space-y-4" data-testid="section-legal">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-600" />
                <h3 className="font-semibold text-base">Terms & Legal Information</h3>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div>• {PRICING_POLICIES.terms.ageRequirement}</div>
                    <div>• {PRICING_POLICIES.terms.capacityLimits}</div>
                    <div>• Gratuity included ({PRICING_POLICIES.terms.gratuityPercentage}%)</div>
                  </div>
                  <div className="space-y-2">
                    <div>• {PRICING_POLICIES.legal.liability}</div>
                    <div>• {PRICING_POLICIES.legal.disputes}</div>
                    <div>• {PRICING_POLICIES.legal.disclaimer}</div>
                  </div>
                </div>
                
                <Separator className="my-3" />
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <Button variant="link" size="sm" className="p-0 h-auto">
                    Terms & Conditions
                  </Button>
                  <Button variant="link" size="sm" className="p-0 h-auto">
                    Privacy Policy
                  </Button>
                  <span className="text-muted-foreground text-xs">
                    Last updated: {PRICING_POLICIES.legal.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Quick Policy Summary Component
 * For use in smaller spaces like sidebars or modals
 */
export function PolicySummary({ 
  eventDate, 
  totalCost,
  className = '',
  context = 'general'
}: Pick<PricingPolicyDisplayProps, 'eventDate' | 'totalCost' | 'className' | 'context'>) {
  const depositInfo = totalCost && eventDate ? calculateDeposit(totalCost, eventDate) : null;
  const isUrgentBooking = depositInfo?.isUrgentBooking || false;

  return (
    <div className={`p-3 bg-blue-50 dark:bg-blue-950 rounded-lg ${className}`} data-testid="policy-summary">
      <div className="text-sm font-medium mb-2 text-blue-700 dark:text-blue-300">
        Payment Terms
      </div>
      
      {isUrgentBooking ? (
        <div className="space-y-1 text-sm">
          <div className="font-medium text-orange-600">Urgent Booking Rate</div>
          <div>{PRICING_POLICIES.deposit.urgent.percentage}% deposit required</div>
          <div>Balance due within {PRICING_POLICIES.deposit.urgent.paymentWindow} hours</div>
        </div>
      ) : (
        <div className="space-y-1 text-sm">
          <div className="font-medium text-green-600">Standard Rate</div>
          <div>{PRICING_POLICIES.deposit.standard.percentage}% deposit to book</div>
          <div>{PRICING_POLICIES.deposit.standard.balancePercentage}% due {PRICING_POLICIES.deposit.standard.balanceDueDays} days before cruise</div>
        </div>
      )}
      
      {depositInfo && (
        <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
          <div className="flex justify-between text-sm">
            <span>Deposit:</span>
            <span className="font-medium">{formatCurrency(depositInfo.depositAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Balance:</span>
            <span className="font-medium">{formatCurrency(depositInfo.balanceDue)}</span>
          </div>
        </div>
      )}
    </div>
  );
}