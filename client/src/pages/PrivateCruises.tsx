import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ship, Calendar, MessageSquare, Users, Star, Trophy } from 'lucide-react';

export default function PrivateCruises() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <Ship className="h-20 w-20 text-brand-blue mx-auto mb-8" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gray-900 dark:text-white">
              PRIVATE PARTY CRUISES
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your own private floating paradise on Lake Travis. Perfect for corporate events, 
              family celebrations, and exclusive parties.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-12 py-6"
                data-testid="button-book-private"
              >
                <Calendar className="mr-3 h-6 w-6" />
                BOOK PRIVATE CRUISE
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-xl px-12 py-6"
                data-testid="button-get-quote"
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                GET CUSTOM QUOTE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Private Cruise Features */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-white">
              EXCLUSIVE EXPERIENCES
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              14, 25, or 50 person boats with professional crew and premium amenities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                <CardTitle>Professional Crew</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Experienced captains and crew ensure a safe, memorable experience
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                <CardTitle>Premium Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Sound systems, coolers, ice, and all the amenities for your perfect day
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                <CardTitle>Custom Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Tailored experiences for corporate events, celebrations, and special occasions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}