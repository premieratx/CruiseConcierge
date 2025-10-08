import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Ship, Mail, Phone, User, CheckCircle } from 'lucide-react';
import { getEffectivePeopleCount } from '@shared/formatters';
import { format } from 'date-fns';

// ContactInfoModal now uses server-provided quote URLs instead of client-side tokens

// Form validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\-\(\)\+]+$/, 'Please enter a valid phone number')
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length >= 10, 'Phone number must be at least 10 digits'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactInfoModalProps {
  open: boolean;
  onClose?: () => void;
  eventDetails: {
    eventDate: Date | undefined;
    eventType: string;
    eventTypeLabel: string;
    eventEmoji?: string;
    groupSize: number;
    specialRequests?: string;
    budget?: string;
  };
  selectionDetails?: {
    cruiseType?: string;
    selectedSlot?: any;
    selectedPackages?: string[];
    discoPackage?: string;
    ticketQuantity?: number;
    selectedDuration?: number;
    selectedBoat?: string;
    preferredTimeLabel?: string;
    groupSizeLabel?: string;
  };
  pricingDetails?: {
    subtotal?: number;
    tax?: number;
    gratuity?: number;
    total?: number;
    depositAmount?: number;
    discountCode?: string;
  };
}

export function ContactInfoModal({
  open,
  onClose,
  eventDetails,
  selectionDetails = {},
  pricingDetails = {},
}: ContactInfoModalProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  // Create quote mutation - Updated to use /api/leads/quote-builder endpoint
  const createQuoteMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Prepare the structured payload for the new API endpoint
      const payload = {
        // Contact information
        contactInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone
        },
        
        // Event details
        eventDetails: {
          eventDate: eventDetails.eventDate?.toISOString()?.split('T')[0] || '', // Format as YYYY-MM-DD
          eventType: eventDetails.eventType,
          groupSize: getEffectivePeopleCount(
            selectionDetails.cruiseType || 'private',
            eventDetails.groupSize,
            selectionDetails.ticketQuantity
          )
        },
        
        // Selection details
        selectionDetails: {
          cruiseType: selectionDetails.cruiseType || 'private',
          selectedSlot: selectionDetails.selectedSlot,
          eventTypeLabel: eventDetails.eventTypeLabel,
          eventEmoji: eventDetails.eventEmoji,
          specialRequests: eventDetails.specialRequests || '',
          budget: eventDetails.budget || '',
          discountCode: pricingDetails.discountCode || '',
          
          // Private cruise specific details
          ...(selectionDetails.cruiseType === 'private' && {
            selectedPackages: selectionDetails.selectedPackages || [],
            selectedAddOnPackages: selectionDetails.selectedPackages || [],
            selectedDuration: selectionDetails.selectedDuration,
            selectedBoat: selectionDetails.selectedBoat
          }),
          
          // Disco cruise specific details
          ...(selectionDetails.cruiseType === 'disco' && {
            discoPackage: selectionDetails.discoPackage,
            selectedDiscoPackage: selectionDetails.discoPackage,
            ticketQuantity: selectionDetails.ticketQuantity || eventDetails.groupSize,
            discoTicketQuantity: selectionDetails.ticketQuantity || eventDetails.groupSize
          }),
          
          // Additional selection context
          preferredTimeLabel: selectionDetails.preferredTimeLabel,
          groupSizeLabel: selectionDetails.groupSizeLabel,
          
          // Pricing context
          pricingDetails: {
            subtotal: pricingDetails.subtotal || 0,
            tax: pricingDetails.tax || 0,
            gratuity: pricingDetails.gratuity || 0,
            total: pricingDetails.total || 0,
            depositAmount: pricingDetails.depositAmount || 0
          }
        }
      };

      console.log('🔄 Creating lead and quote via ContactInfoModal:', payload);
      
      try {
        // apiRequest already returns parsed JSON and throws on HTTP errors
        const result = await apiRequest('POST', '/api/leads/quote-builder', payload);
        console.log('✅ Quote Builder creation successful:', result);
        return result;
      } catch (error: any) {
        console.error('❌ Quote Builder API error:', error);
        throw new Error(error.message || 'Failed to create quote');
      }
    },
    onSuccess: (data) => {
      console.log('🎉 onSuccess handler called:', data);
      
      // Reset submitting state first
      setIsSubmitting(false);
      console.log('✅ Reset isSubmitting to false');
      
      toast({
        title: 'Contact Information Saved!',
        description: 'Continue building your quote below.',
        icon: <CheckCircle className="h-4 w-4" />,
      });
      console.log('✅ Success toast shown');
      
      // Close the modal - stay in quote builder
      if (onClose) {
        console.log('✅ Calling onClose to close modal');
        onClose();
      } else {
        console.warn('⚠️ onClose function not available');
      }
    },
    onError: (error: any) => {
      console.error('Error creating quote:', error);
      toast({
        title: 'Error Creating Quote',
        description: error.message || 'There was a problem creating your quote. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    createQuoteMutation.mutate(data);
  };

  // Format the phone number as user types
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow digits, spaces, dashes, parentheses, and plus sign
    const formatted = value.replace(/[^\d\s\-\(\)\+]/g, '');
    return formatted;
  };

  return (
    <Dialog open={open} onOpenChange={onClose || (() => {})}>
      <DialogContent 
        className="sm:max-w-[500px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        data-testid="contact-info-modal"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Ship className="h-5 w-5 text-blue-600" />
            Get Your Custom Quote
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            Enter your contact details to receive your personalized quote via email and SMS
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="John"
                        disabled={isSubmitting}
                        data-testid="input-first-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Doe"
                        disabled={isSubmitting}
                        data-testid="input-last-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email"
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      type="tel"
                      placeholder="(555) 123-4567"
                      disabled={isSubmitting}
                      onChange={(e) => {
                        field.onChange(handlePhoneChange(e));
                      }}
                      data-testid="input-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-sm">
                <div className="font-semibold text-blue-900 mb-1">Why we need this:</div>
                <ul className="space-y-1 text-blue-700">
                  <li>• Send your personalized quote via email and SMS</li>
                  <li>• Save your selections for easy booking later</li>
                  <li>• Provide dedicated customer support</li>
                  <li>• Send important updates about your event</li>
                </ul>
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
              data-testid="button-submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Your Quote...
                </>
              ) : (
                'Get My Quote'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}