import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Ship, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { InsertContact, InsertProject } from '@shared/schema';

type ChatStep = 'welcome' | 'contact-info' | 'event-details' | 'complete';

const eventTypes = [
  { id: 'bachelor', label: 'Bachelor', emoji: '🎉' },
  { id: 'bachelorette', label: 'Bachelorette', emoji: '💃' },
  { id: 'corporate', label: 'Corporate', emoji: '💼' },
  { id: 'wedding', label: 'Wedding', emoji: '💒' },
  { id: 'birthday', label: 'Birthday', emoji: '🎂' },
  { id: 'graduation', label: 'Graduation', emoji: '🎓' },
  { id: 'other', label: 'Other', emoji: '🎊' },
];

const timeSlots = [
  { id: 'morning', label: 'Morning (9AM-12PM)', icon: '🌅' },
  { id: 'afternoon', label: 'Afternoon (12PM-5PM)', icon: '☀️' },
  { id: 'evening', label: 'Evening (5PM-9PM)', icon: '🌆' },
  { id: 'night', label: 'Night (9PM-12AM)', icon: '🌙' },
];

export default function Chat() {
  const [currentStep, setCurrentStep] = useState<ChatStep>('welcome');
  const [formData, setFormData] = useState({
    eventType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventDate: '',
    preferredTime: '',
    groupSize: '',
    specialRequests: '',
    budget: '',
  });
  const { toast } = useToast();

  // Create lead mutation
  const createLead = useMutation({
    mutationFn: async (data: typeof formData) => {
      // First create the contact
      const contact: InsertContact = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone || undefined,
      };
      
      const contactResponse = await apiRequest('/api/contacts', 'POST', contact);
      
      // Then create the project
      const project: InsertProject = {
        contactId: contactResponse.id,
        title: `${data.eventType} Party - ${data.firstName} ${data.lastName}`,
        projectDate: new Date(data.eventDate),
        groupSize: parseInt(data.groupSize) || undefined,
        eventType: data.eventType,
        specialRequests: data.specialRequests || undefined,
        preferredTime: data.preferredTime || undefined,
        budget: data.budget ? Math.round(parseFloat(data.budget) * 100) : undefined,
        leadSource: 'chat',
      };
      
      await apiRequest('/api/projects', 'POST', project);
      
      return { contact: contactResponse, project };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setCurrentStep('complete');
      toast({ 
        title: 'Thank you!',
        description: "We've received your information and will contact you soon.",
      });
    },
    onError: () => {
      toast({ 
        title: 'Something went wrong', 
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    },
  });

  const handleEventTypeSelect = (eventType: string) => {
    setFormData({ ...formData, eventType });
    setCurrentStep('contact-info');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
      setCurrentStep('event-details');
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLead.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Ship className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">🚢 AI Cruise Booking Assistant</CardTitle>
          <CardDescription className="text-lg mt-2">
            I'll help you find and book the perfect cruise
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Welcome Step */}
          {currentStep === 'welcome' && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-lg font-medium">What type of event are you planning?</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {eventTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant="outline"
                    className="h-24 flex flex-col gap-2 hover:scale-105 transition-transform hover:border-primary"
                    onClick={() => handleEventTypeSelect(type.id)}
                    data-testid={`button-event-${type.id}`}
                  >
                    <span className="text-2xl">{type.emoji}</span>
                    <span className="text-sm font-medium">{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Contact Info Step */}
          {currentStep === 'contact-info' && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep('welcome')}
                className="mb-4"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    data-testid="input-phone"
                  />
                </div>
                <Button type="submit" className="w-full" data-testid="button-continue">
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </div>
          )}

          {/* Event Details Step */}
          {currentStep === 'event-details' && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep('contact-info')}
                className="mb-4"
                data-testid="button-back-details"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date *</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      data-testid="input-event-date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groupSize">Group Size *</Label>
                    <Input
                      id="groupSize"
                      type="number"
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                      required
                      min="10"
                      max="150"
                      placeholder="10-150 guests"
                      data-testid="input-group-size"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Preferred Time</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        type="button"
                        variant={formData.preferredTime === slot.id ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setFormData({ ...formData, preferredTime: slot.id })}
                        data-testid={`button-time-${slot.id}`}
                      >
                        <span className="mr-2">{slot.icon}</span>
                        <span className="text-sm">{slot.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Budget (Optional)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="Enter amount in dollars"
                    data-testid="input-budget"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Tell us about any special requirements or requests..."
                    rows={3}
                    data-testid="textarea-special-requests"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={createLead.isPending}
                  data-testid="button-submit"
                >
                  {createLead.isPending ? 'Submitting...' : 'Submit Booking Request'}
                </Button>
              </form>
            </div>
          )}

          {/* Complete Step */}
          {currentStep === 'complete' && (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">✅</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Thank You!</h3>
                <p className="text-muted-foreground">
                  We've received your booking request. Our team will contact you within 24 hours with availability and pricing.
                </p>
              </div>
              <div className="pt-4 space-y-2">
                <p className="text-sm font-medium">What happens next?</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• We'll check availability for your date</li>
                  <li>• Send you a custom quote</li>
                  <li>• Help you plan the perfect event</li>
                </ul>
              </div>
              <Button
                onClick={() => {
                  setCurrentStep('welcome');
                  setFormData({
                    eventType: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    eventDate: '',
                    preferredTime: '',
                    groupSize: '',
                    specialRequests: '',
                    budget: '',
                  });
                }}
                className="mt-6"
                data-testid="button-start-over"
              >
                Start New Booking
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}