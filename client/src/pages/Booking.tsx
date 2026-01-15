import { Link } from 'wouter';
import { motion } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, Clock, Users, Ship, Check, ArrowRight, Phone,
  MessageSquare, Star, Shield, CreditCard
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const bookingSteps = [
  {
    step: 1,
    title: 'Get Your Quote',
    description: 'Use our instant quote builder to see pricing for your group size and preferred date.',
    icon: MessageSquare
  },
  {
    step: 2,
    title: 'Choose Your Boat',
    description: 'Select from Day Tripper (6-14), Meeseeks (15-30), or Clever Girl (31-75 guests).',
    icon: Ship
  },
  {
    step: 3,
    title: 'Pick Your Package',
    description: 'Standard, Essentials, or Ultimate - choose the amenities that fit your party.',
    icon: Star
  },
  {
    step: 4,
    title: 'Secure Your Date',
    description: 'Book with a deposit to lock in your preferred date and time slot.',
    icon: Calendar
  }
];

const whyBookWithUs = [
  {
    icon: Shield,
    title: 'Perfect Safety Record',
    description: '15+ years with zero accidents or injuries'
  },
  {
    icon: Star,
    title: '5-Star Reviews',
    description: 'Hundreds of happy customers on Google and Yelp'
  },
  {
    icon: CreditCard,
    title: 'Flexible Payments',
    description: 'Deposits available, pay balance before cruise'
  },
  {
    icon: Users,
    title: 'Expert Planning',
    description: 'Our team helps coordinate every detail'
  }
];

export default function Booking() {
  return (
    <>
      <SEOHead
        title="Book Your Party Boat | Lake Travis Austin Reservations | Premier Party Cruises"
        description="Book your Lake Travis party boat cruise in minutes. Easy online booking, flexible deposits, and instant confirmation. Reserve your date for bachelor, bachelorette, birthday parties."
        canonical="https://premierpartycruises.com/booking"
      />

      <PublicNavigation />

      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-brand-blue via-blue-700 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <Badge className="bg-brand-yellow text-black font-bold mb-6">
                <Calendar className="h-4 w-4 mr-1" />
                Easy Online Booking
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold mb-6">
                Book Your Party Boat Cruise
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Reserve your Lake Travis party boat in minutes. Get instant quotes, flexible payment options, and confirmation within 24 hours.
              </p>
              <Button
                size="lg"
                className="bg-brand-yellow text-black hover:bg-yellow-400"
                onClick={() => document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Booking
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-4 bg-gray-50">
          <div className="container mx-auto px-4">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Booking' }
            ]} />
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-center mb-4">
              How Booking Works
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Four simple steps to your perfect Lake Travis party cruise
            </p>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {bookingSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 bg-brand-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="mb-2 bg-brand-yellow text-black">Step {item.step}</Badge>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <QuoteBuilderSection />

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-center mb-12">
              Why Book With Premier Party Cruises?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {whyBookWithUs.map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <item.icon className="h-12 w-12 mx-auto mb-4 text-brand-blue" />
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-playfair font-bold text-center mb-8">
                Booking FAQ
              </h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">How far in advance should I book?</h3>
                    <p className="text-gray-600">We recommend booking 2-4 weeks in advance, especially for weekends during peak season (March-October). Last-minute bookings are sometimes available.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">What deposit is required?</h3>
                    <p className="text-gray-600">A 50% deposit secures your reservation. The remaining balance is due 7 days before your cruise.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">Can I change my guest count?</h3>
                    <p className="text-gray-600">Yes! You can adjust your guest count up to 48 hours before your cruise, subject to boat capacity limits.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-blue to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-playfair font-bold mb-6">Ready to Book?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get your instant quote or call us to speak with a party planning expert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Your Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="tel:512-709-1560">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 512-709-1560
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
