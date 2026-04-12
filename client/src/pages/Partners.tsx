import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import AdminNoIndex from '@/components/AdminNoIndex';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertPartnerApplicationSchema, type InsertPartnerApplication } from '@shared/schema';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  DollarSign, 
  Shield, 
  Award, 
  Calendar, 
  CreditCard,
  Users,
  Music,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { LazyImage } from '@/components/LazyImage';
import { SectionReveal } from '@/components/SectionReveal';

const boatGallery = [
  {
    name: 'Day Tripper',
    capacity: '14 Guests',
    image: '/attached_assets/day-tripper-14-person-boat.webp',
    description: 'Perfect for intimate gatherings and smaller celebrations'
  },
  {
    name: 'Meeseeks & The Irony',
    capacity: '25 Guests',
    image: '/attached_assets/meeseeks-25-person-boat.webp',
    description: 'Ideal for medium-sized parties and corporate events'
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 Guests',
    image: '/attached_assets/clever-girl-50-person-boat.webp',
    description: 'Our flagship vessel for large celebrations and events'
  }
];

const benefits = [
  {
    icon: DollarSign,
    title: '10% Commission',
    description: 'Earn 10% commission on all boat bookings and add-ons'
  },
  {
    icon: Award,
    title: 'Top Tier Service',
    description: 'Your clients experience our legendary service and full party setup'
  },
  {
    icon: Shield,
    title: 'Personal Discounts',
    description: 'Enjoy exclusive discounts on your own boat rentals'
  },
  {
    icon: Sparkles,
    title: 'Free Cruise Reward',
    description: 'Earn a free cruise when you hit $10,000 in bookings'
  },
  {
    icon: Calendar,
    title: 'Monthly Payouts',
    description: 'Receive your commission via Venmo every month'
  },
  {
    icon: Users,
    title: 'Upgrade Your Guests',
    description: 'Provide unforgettable experiences that keep clients coming back'
  }
];

export default function Partners() {
  const { toast } = useToast();
  
  const form = useForm<InsertPartnerApplication>({
    resolver: zodResolver(insertPartnerApplicationSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      company: '',
      venmoHandle: '',
      source: '',
      notes: ''
    }
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertPartnerApplication) => {
      return apiRequest('/api/partner-signups', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      toast({
        title: 'Application Submitted!',
        description: 'We\'ll be in touch soon to get you set up as a Premier partner.'
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: 'Submission Failed',
        description: 'Please try again or contact us directly.',
        variant: 'destructive'
      });
    }
  });

  const onSubmit = (data: InsertPartnerApplication) => {
    submitMutation.mutate(data);
  };

  return (
    <>
      <AdminNoIndex />
      <div data-page-ready="partners">
        <SEOHead
          pageRoute="/partners"
          defaultTitle="Partner Program | Premier Party Cruises"
          defaultDescription="Earn 10% commission on boat bookings. Get personal discounts and monthly Venmo payouts. Join Austin's premier party boat partner program."
          defaultKeywords={['party boat partner program', 'Austin boat rental affiliate', 'Lake Travis referral program', 'party cruise commission']}
          schemaType="webpage"
        />

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Premier Partnership Details
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Earn commission booking your clients' boat rental experience with us!
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <SectionReveal>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Partner With Premier Party Cruises?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join our exclusive partner network and start earning while providing your clients 
                with unforgettable Lake Travis experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="border-2 hover:border-blue-500 transition-colors">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Boat Gallery Section */}
      <SectionReveal>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Fleet
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Help your clients book our custom-built high-end single-deck party boats 
                and earn commission on every booking.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {boatGallery.map((boat, index) => {
                const boatTestId = `card-boat-${boat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`;
                return (
                  <Card 
                    key={index} 
                    className="overflow-hidden hover:shadow-xl transition-shadow"
                    data-testid={boatTestId}
                  >
                    <div className="aspect-[4/3] relative">
                      <LazyImage
                        src={boat.image}
                        alt={`${boat.name} - ${boat.capacity}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{boat.name}</CardTitle>
                      <div className="flex items-center gap-2 text-blue-600">
                        <Users className="w-5 h-5" />
                        <span className="font-semibold">{boat.capacity}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{boat.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ATX Disco Cruise Section */}
      <SectionReveal>
        <section className="py-16 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Music className="w-8 h-8 text-purple-300" />
                    <h2 className="text-3xl md:text-4xl font-bold">
                      ATX Disco Cruise
                    </h2>
                  </div>
                  <p className="text-xl text-purple-100 mb-6">
                    Our signature all-inclusive bachelor and bachelorette party experience! 
                    The only multi-group party cruise of its kind in the U.S.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Professional DJ & Photographer</p>
                        <p className="text-purple-200">Epic party atmosphere with memories captured</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">All-Inclusive Party Setup</p>
                        <p className="text-purple-200">Giant floats, party supplies, shared coolers & more</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Fixed Pricing</p>
                        <p className="text-purple-200">Simple per-person tickets - easy to book!</p>
                      </div>
                    </div>
                  </div>
                  <Link href="/atx-disco-cruise">
                    <Button 
                      size="lg" 
                      className="bg-white text-purple-900 hover:bg-purple-100"
                      data-testid="button-learn-disco"
                    >
                      Learn More About Disco Cruise
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <LazyImage
                        src="/attached_assets/atx-disco-cruise-party.webp"
                        alt="ATX Disco Cruise party atmosphere"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <LazyImage
                        src="/attached_assets/party-atmosphere-2.webp"
                        alt="Party on Lake Travis"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <LazyImage
                        src="/attached_assets/dancing-party-scene.webp"
                        alt="Dancing at disco cruise"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <LazyImage
                        src="/attached_assets/party-atmosphere-3.webp"
                        alt="Disco cruise celebration"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Partner Signup Form */}
      <SectionReveal>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Become a Premier Partner
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below to join our partner program and start earning commissions!
                </p>
              </div>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="John Smith" 
                                  data-testid="input-partner-name"
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
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="tel"
                                  placeholder="(512) 488-5892" 
                                  data-testid="input-partner-phone"
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
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="email"
                                placeholder="john@company.com" 
                                data-testid="input-partner-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Your Company Name" 
                                data-testid="input-partner-company"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="venmoHandle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Venmo Handle (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="@premieratx" 
                                data-testid="input-partner-venmo"
                              />
                            </FormControl>
                            <p className="text-sm text-gray-600 mt-1">
                              Commission payouts via Venmo when you reach $100 threshold
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <div className="text-sm text-gray-700">
                            <p className="font-semibold mb-1">What happens next?</p>
                            <p>
                              Once submitted, we'll review your application and reach out within 1-2 business days 
                              to set up your dedicated partner booking portal and discuss commission details.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={submitMutation.isPending}
                        data-testid="button-submit-partner"
                      >
                        {submitMutation.isPending ? 'Submitting...' : 'Submit Partner Application'}
                        {!submitMutation.isPending && <ArrowRight className="ml-2 w-5 h-5" />}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Questions? <Link href="/contact" className="text-blue-600 hover:underline" data-testid="link-contact">Contact us</Link> 
                  {' '}or call <a href="tel:+15124885892" className="text-blue-600 hover:underline" data-testid="link-phone">(512) 488-5892</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <Footer />
      </div>
    </>
  );
}
