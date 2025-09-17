import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Calendar, MessageSquare, Play, ExternalLink } from 'lucide-react';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <Camera className="h-20 w-20 text-brand-yellow mx-auto mb-8" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gray-900 dark:text-white">
              PHOTO GALLERY
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See the magic of Lake Travis and our epic party cruises. 
              Real moments from real celebrations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-12 py-6"
                data-testid="button-book-now"
              >
                <Calendar className="mr-3 h-6 w-6" />
                BOOK YOUR CRUISE
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-xl px-12 py-6"
                data-testid="button-video-gallery"
              >
                <Play className="mr-3 h-6 w-6" />
                WATCH VIDEOS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Placeholder */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-white">
              COMING SOON
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're building an amazing photo and video gallery. Follow us on social media for the latest content!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-8">
              <CardContent>
                <Camera className="h-16 w-16 text-brand-yellow mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Photo Gallery</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Professional photos from our cruises, parties, and Lake Travis adventures
                </p>
                <Button variant="outline" className="w-full" data-testid="button-follow-instagram">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Follow on Instagram
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent>
                <Play className="h-16 w-16 text-brand-blue mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Video Collection</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Epic videos showcasing the party atmosphere and Lake Travis beauty
                </p>
                <Button variant="outline" className="w-full" data-testid="button-follow-tiktok">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Follow on TikTok
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}