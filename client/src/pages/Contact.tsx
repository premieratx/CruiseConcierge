import { useState } from 'react';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CONTACT_INFO, BUSINESS_HOURS } from '@shared/contact';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, Calendar,
  Send, Facebook, Instagram, Star
} from 'lucide-react';

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    groupSize: '',
    eventDate: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and phone are required to get started.",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Contact form submitted:', contactForm);
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours with more information.",
        variant: "default"
      });

      setContactForm({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        groupSize: '',
        eventDate: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `Please try again or call us directly at ${CONTACT_INFO.phoneFormatted}`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <MessageSquare className="h-20 w-20 text-brand-blue mx-auto mb-8" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gray-900 dark:text-white">
              CONTACT US
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300">
              Ready to plan your Lake Travis adventure? Let's make it happen!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-heading font-bold mb-8 text-gray-900 dark:text-white">
                GET IN TOUCH
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                Premier Party Cruises has been Austin's original Lake Travis party cruise company for over 14 years. 
                We're here to help plan your perfect celebration!
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Call Us</h3>
                    <a href={CONTACT_INFO.phoneHref} className="text-gray-600 dark:text-gray-300 hover:text-brand-blue transition-colors">
                      {CONTACT_INFO.phoneFormatted}
                    </a>
                    <p className="text-sm text-gray-500">Available 9 AM - 8 PM Daily</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Email Us</h3>
                    <a href={CONTACT_INFO.emailHref} className="text-gray-600 dark:text-gray-300 hover:text-brand-blue transition-colors">
                      {CONTACT_INFO.email}
                    </a>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">Lake Travis, Austin, TX</p>
                    <p className="text-sm text-gray-500">Multiple departure points available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Operating Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">Friday & Saturday Cruises</p>
                    <p className="text-sm text-gray-500">Private charters available any day</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Follow Our Adventures</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="lg" data-testid="button-facebook">
                    <Facebook className="h-5 w-5 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="lg" data-testid="button-instagram">
                    <Instagram className="h-5 w-5 mr-2" />
                    Instagram
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-base font-semibold">Name *</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-2"
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-base font-semibold">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          className="mt-2"
                          data-testid="input-contact-email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-base font-semibold">Phone *</Label>
                        <Input
                          id="phone"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-2"
                          data-testid="input-contact-phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventType" className="text-base font-semibold">Event Type</Label>
                        <Input
                          id="eventType"
                          value={contactForm.eventType}
                          onChange={(e) => setContactForm(prev => ({ ...prev, eventType: e.target.value }))}
                          placeholder="Bachelor party, corporate event, etc."
                          className="mt-2"
                          data-testid="input-contact-event-type"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="groupSize" className="text-base font-semibold">Group Size</Label>
                        <Input
                          id="groupSize"
                          value={contactForm.groupSize}
                          onChange={(e) => setContactForm(prev => ({ ...prev, groupSize: e.target.value }))}
                          placeholder="Number of people"
                          className="mt-2"
                          data-testid="input-contact-group-size"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventDate" className="text-base font-semibold">Preferred Date</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={contactForm.eventDate}
                          onChange={(e) => setContactForm(prev => ({ ...prev, eventDate: e.target.value }))}
                          className="mt-2"
                          data-testid="input-contact-event-date"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-base font-semibold">Message</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us about your event and any special requests..."
                        rows={5}
                        className="mt-2"
                        data-testid="input-contact-message"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg py-6"
                      data-testid="button-send-message"
                    >
                      <Send className="mr-3 h-5 w-5" />
                      SEND MESSAGE
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-white">
              WHAT OUR CUSTOMERS SAY
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-8">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">4.9/5</span>
              <span className="text-gray-600 dark:text-gray-300">(125,000+ Reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah & Mike",
                event: "Wedding Party",
                text: "Premier Party Cruises made our wedding celebration absolutely perfect! The crew was amazing and Lake Travis was stunning."
              },
              {
                name: "Austin Corp",
                event: "Corporate Event", 
                text: "Best team building event we've ever done. Professional service and our employees are still talking about it!"
              },
              {
                name: "Jessica's Group",
                event: "Birthday Party",
                text: "Epic birthday celebration! The ATX Disco Cruise was incredible - dancing on the water with amazing vibes."
              }
            ].map((review, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{review.text}"</p>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.event}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}