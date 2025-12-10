import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare } from 'lucide-react';

const logoPath = '/attached_assets/PPC-Logo-280x280.webp';
const logoPathMobile = '/attached_assets/PPC-Logo-140x140.webp';

export function HeroLCP() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:bg-gray-950">
      <PublicNavigation />
      
      <section 
        id="hero" 
        className="relative flex flex-col justify-center overflow-hidden bg-gray-900" 
        style={{ minHeight: 'clamp(600px, 100vh, 1200px)', contain: 'layout paint' }}
      >
        <div className="absolute inset-0 z-0">
          <picture>
            <source 
              media="(max-width: 640px)" 
              srcSet="/attached_assets/bachelor-party-group-guys-mobile.webp" 
            />
            <source 
              media="(max-width: 960px)" 
              srcSet="/attached_assets/bachelor-party-group-guys-hero-compressed.webp" 
            />
            <img
              src="/attached_assets/bachelor-party-group-guys-hero-compressed.webp"
              alt="Lake Travis party boat cruise with happy guests celebrating"
              className="w-full h-full object-cover opacity-60"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              width={1920}
              height={1080}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-black/15 to-black/15" />
          <div className="absolute inset-0 bg-blue-900/5" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-white flex-grow flex items-center">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <picture>
                <source media="(max-width: 768px)" srcSet={logoPathMobile} />
                <img 
                  src={logoPath}
                  alt="Party Boat Austin - Premier Party Cruises on Lake Travis" 
                  className="h-20 md:h-24 w-auto mx-auto mb-6"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width={280}
                  height={280}
                />
              </picture>
            </div>

            <div className="mb-8 md:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 leading-tight">
                Austin's Favorite Party Boat Rentals on Lake Travis
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-brand-yellow font-semibold leading-relaxed">
                Captained party cruises on Lake Travis for 5-75 People, Offering All-Inclusive Party Packages & Pre-Party Setup
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div
                className="xola-custom xola-checkout"
                data-button-id="691574bd162501edc00f151a"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-7 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                  data-testid="button-hero-get-quote"
                >
                  <Calendar className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Check Availability
                </Button>
              </div>
              
              <a
                href="/chat"
                className="font-bold text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-5 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
                style={{
                  background: 'linear-gradient(to right, #facc15, #f59e0b)',
                  color: '#1f2937'
                }}
                data-testid="button-hero-book-now"
              >
                <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Get Custom Quote
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm py-4 px-6">
          <div className="container mx-auto">
            <p className="text-center text-gray-900 dark:text-white text-sm md:text-base font-semibold">
              ✨ Transparent Pricing • No Hidden Fees • Best Value Guaranteed ✨
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroLCP;
