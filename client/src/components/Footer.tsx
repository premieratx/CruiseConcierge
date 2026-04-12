import { Link } from 'wouter';
import { useEffect } from 'react';
import { 
  Ship, Phone, Mail, MapPin, Facebook, Instagram, 
  MessageCircle, Youtube, Linkedin, Award
} from 'lucide-react';
import { CONTACT_INFO, SOCIAL_MEDIA } from '@shared/contact';
const logoPath = '/attached_assets/PPC-Logo-80x80.webp';
import { loadXolaScript } from '@/services/xola';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const co = document.createElement("script");
      co.type = "text/javascript";
      co.async = true;
      co.src = "https://xola.com/checkout.js";
      const s = document.getElementsByTagName("script")[0];
      if (s && s.parentNode) {
        s.parentNode.insertBefore(co, s);
      }
    }
  }, []);

  return (
    <footer className="bg-[#0F172A] text-white border-t border-gray-800" data-testid="footer-main">
      <div className="container mx-auto px-4 py-8 lg:py-10">

        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-3" data-testid="footer-company-info">
            <Link href="/" className="inline-block" data-testid="link-footer-logo">
              <img
                src={logoPath}
                alt="Premier Party Cruises Logo"
                className="h-14 w-auto mb-2 hover:opacity-80 transition-opacity"
                width={80}
                height={80}
                loading="lazy"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed" data-testid="text-footer-tagline">
              Austin's premier party cruise experience on Lake Travis. Creating unforgettable memories since 2009.
            </p>
            <div className="space-y-2 pt-1">
              <a
                href={CONTACT_INFO.phoneHref}
                className="flex items-center space-x-2 text-gray-300 hover:text-brand-yellow transition-colors"
                data-testid="link-footer-phone"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{CONTACT_INFO.phoneFormatted}</span>
              </a>
              <a
                href={CONTACT_INFO.emailHref}
                className="flex items-center space-x-2 text-gray-300 hover:text-brand-yellow transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{CONTACT_INFO.email}</span>
              </a>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm" data-testid="text-footer-location">Lake Travis, Austin, TX</span>
              </div>
            </div>
          </div>

          {/* Cruises */}
          <div className="space-y-3" data-testid="footer-experiences-section">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Ship className="h-4 w-4 text-brand-blue" />
              <span>Cruises</span>
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/atx-disco-cruise"
                  className="text-white hover:text-brand-yellow transition-colors text-sm font-semibold flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 py-1 rounded border border-yellow-500/30"
                  data-testid="link-footer-disco-cruises"
                >
                  <span className="text-yellow-400 text-xs">⭐</span>
                  <span>ATX Disco Cruise</span>
                </Link>
              </li>
              <li><Link href="/private-cruises" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-private-cruises">Private Cruises</Link></li>
              <li><Link href="/bachelor-party-austin" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-bachelor-party">Bachelor Party</Link></li>
              <li><Link href="/bachelorette-party-austin" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-bachelorette-party">Bachelorette Party</Link></li>
              <li><Link href="/combined-bachelor-bachelorette-austin" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-combined">Combined Bach/Bachelorette</Link></li>
              <li><Link href="/party-boat-austin" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-party-boat-austin">Party Boat Austin</Link></li>
              <li><Link href="/party-boat-lake-travis" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-party-boat-lake-travis">Party Boat Lake Travis</Link></li>
            </ul>
          </div>

          {/* Occasions */}
          <div className="space-y-3" data-testid="footer-occasions-section">
            <h3 className="text-base font-bold text-white">Occasions</h3>
            <ul className="space-y-1.5">
              <li><Link href="/birthday-parties" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-birthday">Birthday Parties</Link></li>
              <li><Link href="/corporate-events" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-corporate">Corporate Events</Link></li>
              <li><Link href="/wedding-parties" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-wedding">Wedding Parties</Link></li>
              <li><Link href="/celebration-cruises" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-celebration">Celebration Cruises</Link></li>
              <li><Link href="/team-building" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-team-building">Team Building</Link></li>
              <li><Link href="/milestone-birthday" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-milestone">Milestone Birthday</Link></li>
              <li><Link href="/graduation-party" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-graduation">Graduation Party</Link></li>
              <li><Link href="/sweet-16" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-sweet16">Sweet 16</Link></li>
            </ul>
          </div>

          {/* Resources + Social */}
          <div className="space-y-3" data-testid="footer-resources-section">
            <h3 className="text-base font-bold text-white">Resources</h3>
            <ul className="space-y-1.5">
              <li><Link href="/book-now" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block font-semibold" data-testid="link-footer-book-now">Book Now</Link></li>
              <li><Link href="/chat" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-get-quote">Get a Quote</Link></li>
              <li><Link href="/pricing-breakdown" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-pricing">Pricing</Link></li>
              <li><Link href="/blogs" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-blogs">Blog</Link></li>
              <li><Link href="/gallery" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-gallery">Gallery</Link></li>
              <li><Link href="/testimonials-faq" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-reviews-faq">Reviews & FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-contact">Contact</Link></li>
              <li><Link href="/partners" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-partners">Partner Program</Link></li>
            </ul>

            <div className="pt-2">
              <h3 className="text-base font-bold text-white mb-2">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                <a href={SOCIAL_MEDIA.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-yellow transition-colors" data-testid="link-footer-facebook" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href={SOCIAL_MEDIA.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-yellow transition-colors" data-testid="link-footer-instagram" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={SOCIAL_MEDIA.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-yellow transition-colors" data-testid="link-footer-tiktok" aria-label="TikTok">
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a href={SOCIAL_MEDIA.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-yellow transition-colors" data-testid="link-footer-youtube" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href={SOCIAL_MEDIA.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-yellow transition-colors" data-testid="link-footer-linkedin" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary SEO link grid */}
        <div className="border-t border-gray-800 mt-6 pt-5" data-testid="footer-additional-links">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Wedding Events</h4>
              <ul className="space-y-1">
                <li><Link href="/welcome-party" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-welcome-party">Welcome Party</Link></li>
                <li><Link href="/rehearsal-dinner" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-rehearsal-dinner">Rehearsal Dinner</Link></li>
                <li><Link href="/after-party" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-after-party">After Party</Link></li>
                <li><Link href="/client-entertainment" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-client-entertainment">Client Entertainment</Link></li>
                <li><Link href="/company-milestone" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-company-milestone">Company Milestone</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Bachelorette Guides</h4>
              <ul className="space-y-1">
                <li><Link href="/3-day-austin-bachelorette-itinerary" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-3day-itinerary">3-Day Itinerary</Link></li>
                <li><Link href="/austin-bachelorette-nightlife" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-nightlife">Nightlife Guide</Link></li>
                <li><Link href="/budget-austin-bachelorette" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-budget">Budget Planning</Link></li>
                <li><Link href="/atx-disco-cruise" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-disco">ATX Disco Cruise</Link></li>
                <li><Link href="/adventure-austin-bachelorette" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-adventure">Adventure Options</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">More Guides</h4>
              <ul className="space-y-1">
                <li><Link href="/ultimate-austin-bachelorette-weekend" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-ultimate-weekend">Ultimate Weekend</Link></li>
                <li><Link href="/top-10-austin-bachelorette-ideas" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-top10">Top 10 Ideas</Link></li>
                <li><Link href="/first-time-lake-travis-boat-rental-guide" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-first-time-guide">First Time Guide</Link></li>
                <li><Link href="/austin-bachelor-party-ideas" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-bachelor-ideas">Bachelor Party Ideas</Link></li>
                <li><Link href="/lake-travis-bachelor-party-boats" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-lake-travis-boats">Lake Travis Boats</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Special Events</h4>
              <ul className="space-y-1">
                <li><Link href="/wedding-anniversary-celebration-ideas" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-anniversary">Anniversary Ideas</Link></li>
                <li><Link href="/golden-ticket" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-golden-ticket">Golden Ticket Offer</Link></li>
                <li><Link href="/golden-ticket-private" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-golden-ticket-private">Private Golden Ticket</Link></li>
                <li><Link href="/ai-endorsement" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-ai-endorsement">AI Endorsement</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* As Featured In */}
        <div className="border-t border-gray-800 mt-5 pt-4">
          <div className="text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center justify-center gap-2">
              <Award className="h-3.5 w-3.5 text-brand-yellow" />
              As Featured In
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 opacity-60">
              <span className="text-gray-300 text-xs font-semibold">Austin Chronicle</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-300 text-xs font-semibold">KVUE News</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-300 text-xs font-semibold">Lake Travis Life</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-300 text-xs font-semibold">Austin Monthly</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-300 text-xs font-semibold">512 Magazine</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 mt-4 pt-4 border-t border-gray-800/50">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Ship className="h-4 w-4 text-brand-blue" />
              <span>Licensed & Certified</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Award className="h-4 w-4 text-yellow-500" />
              <span>BBB Accredited</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Award className="h-4 w-4 text-green-500" />
              <span>TripAdvisor Excellence</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-5 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-xs text-center md:text-left" data-testid="text-footer-copyright">
              © {currentYear} {CONTACT_INFO.fullBusinessName}. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xs">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-brand-yellow transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-brand-yellow transition-colors" data-testid="link-footer-terms">Terms and Conditions</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
