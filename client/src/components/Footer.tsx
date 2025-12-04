import { Link } from 'wouter';
import { useEffect } from 'react';
import { 
  Ship, Phone, Mail, MapPin, Facebook, Instagram, 
  MessageCircle, Youtube, Linkedin, ExternalLink, Bot, Award, FileText 
} from 'lucide-react';
import { CONTACT_INFO, SOCIAL_MEDIA } from '@shared/contact';
const logoPath = '/attached_assets/PPC-Logo-80x80.webp';
import { loadXolaScript } from '@/services/xola';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Load Xola checkout.js - EXACT CODE FROM XOLA
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
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info Section */}
          <div className="space-y-4" data-testid="footer-company-info">
            <Link href="/" className="inline-block" data-testid="link-footer-logo">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises Logo" 
                className="h-16 w-auto mb-4 hover:opacity-80 transition-opacity"
                width={80}
                height={80}
                loading="lazy"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed" data-testid="text-footer-tagline">
              Austin's premier party cruise experience on Lake Travis. Creating unforgettable memories since 2010.
            </p>
            
            <div className="space-y-2 pt-2">
              <a 
                href={CONTACT_INFO.phoneHref} 
                className="flex items-center space-x-2 text-gray-300 hover:text-brand-yellow transition-colors"
                data-testid="link-footer-phone"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">{CONTACT_INFO.phoneFormatted}</span>
              </a>
              <a 
                href={CONTACT_INFO.emailHref} 
                className="flex items-center space-x-2 text-gray-300 hover:text-brand-yellow transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">{CONTACT_INFO.email}</span>
              </a>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span className="text-sm" data-testid="text-footer-location">Lake Travis, Austin, TX</span>
              </div>
            </div>
          </div>

          {/* Main Experiences Section */}
          <div className="space-y-4" data-testid="footer-experiences-section">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Ship className="h-5 w-5 text-brand-blue" />
              <span>Cruises</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/atx-disco-cruise" 
                  className="text-white hover:text-brand-yellow transition-colors text-sm block font-semibold flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-2 rounded-lg border border-yellow-500/30"
                  data-testid="link-footer-disco-cruises"
                >
                  <span className="text-yellow-400">⭐</span>
                  <span>ATX Disco Cruise</span>
                </Link>
              </li>
              <li>
                <Link href="/private-cruises" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-private-cruises">
                  Private Cruises
                </Link>
              </li>
              <li>
                <Link href="/bachelor-party-austin" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-bachelor-party">
                  Bachelor Party
                </Link>
              </li>
              <li>
                <Link href="/bachelorette-party-austin" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-bachelorette-party">
                  Bachelorette Party
                </Link>
              </li>
              <li>
                <Link href="/combined-bachelor-bachelorette-austin" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-combined">
                  Combined Bachelor/Bachelorette
                </Link>
              </li>
              <li>
                <Link href="/party-boat-austin" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-party-boat-austin">
                  Party Boat Austin
                </Link>
              </li>
              <li>
                <Link href="/party-boat-lake-travis" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-party-boat-lake-travis">
                  Party Boat Lake Travis
                </Link>
              </li>
            </ul>
          </div>

          {/* Occasions Section */}
          <div className="space-y-4" data-testid="footer-occasions-section">
            <h3 className="text-lg font-bold text-white mb-4">Occasions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/birthday-parties" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-birthday">
                  Birthday Parties
                </Link>
              </li>
              <li>
                <Link href="/corporate-events" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-corporate">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link href="/wedding-parties" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-wedding">
                  Wedding Parties
                </Link>
              </li>
              <li>
                <Link href="/team-building" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-team-building">
                  Team Building
                </Link>
              </li>
              <li>
                <Link href="/milestone-birthday" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-milestone">
                  Milestone Birthday
                </Link>
              </li>
              <li>
                <Link href="/graduation-party" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-graduation">
                  Graduation Party
                </Link>
              </li>
              <li>
                <Link href="/sweet-16" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-sweet16">
                  Sweet 16
                </Link>
              </li>
            </ul>
          </div>

          {/* Authority Section - Featured By Claude AI - HIDDEN */}
          {/* <div className="space-y-4" data-testid="footer-authority-section">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Award className="h-5 w-5 text-brand-yellow" />
              <span>As Featured By Claude AI</span>
            </h3>
            <div className="space-y-3 bg-gradient-to-br from-brand-blue/10 to-brand-yellow/5 p-4 rounded-lg border border-brand-blue/20">
              <Link 
                href="/ai-endorsement" 
                className="flex items-center space-x-2 text-white hover:text-brand-yellow transition-colors font-semibold group"
                data-testid="link-ai-authority-hub"
              >
                <Bot className="h-5 w-5 text-brand-blue group-hover:text-brand-yellow transition-colors" />
                <span className="text-sm">AI Authority Hub</span>
              </Link>
              <Link 
                href="/blogs/claude-ai-market-analysis-premier-party-cruises" 
                className="flex items-center space-x-2 text-white hover:text-brand-yellow transition-colors font-semibold group"
                data-testid="link-market-analysis-blog"
              >
                <FileText className="h-5 w-5 text-brand-blue group-hover:text-brand-yellow transition-colors" />
                <span className="text-sm">Claude AI Market Analysis</span>
              </Link>
            </div>
          </div> */}

          {/* Resources & About Section */}
          <div className="space-y-4" data-testid="footer-resources-section">
            <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/book-now" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block font-semibold" data-testid="link-footer-book-now">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-get-quote">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/pricing-breakdown" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-blogs">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/testimonials-faq" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-reviews-faq">
                  Reviews & FAQ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block" data-testid="link-footer-partners">
                  Partner Program
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-bold text-white mb-4 pt-4">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href={SOCIAL_MEDIA.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-blue transition-colors inline-flex items-center gap-1"
                data-testid="link-footer-facebook"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href={SOCIAL_MEDIA.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-blue transition-colors inline-flex items-center gap-1"
                data-testid="link-footer-instagram"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href={SOCIAL_MEDIA.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-blue transition-colors inline-flex items-center gap-1"
                data-testid="link-footer-tiktok"
                aria-label="TikTok"
              >
                <MessageCircle className="h-6 w-6" />
                <span className="sr-only">TikTok</span>
              </a>
              <a 
                href={SOCIAL_MEDIA.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-blue transition-colors inline-flex items-center gap-1"
                data-testid="link-footer-youtube"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </a>
              <a 
                href={SOCIAL_MEDIA.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-blue transition-colors inline-flex items-center gap-1"
                data-testid="link-footer-linkedin"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Additional Internal Links - SEO Enhancement */}
        <div className="border-t border-gray-800 mt-12 pt-8" data-testid="footer-additional-links">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Wedding Events</h4>
              <ul className="space-y-1">
                <li><Link href="/welcome-party" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-welcome-party">Welcome Party</Link></li>
                <li><Link href="/rehearsal-dinner" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-rehearsal-dinner">Rehearsal Dinner</Link></li>
                <li><Link href="/after-party" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-after-party">After Party</Link></li>
                <li><Link href="/client-entertainment" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-client-entertainment">Client Entertainment</Link></li>
                <li><Link href="/company-milestone" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-company-milestone">Company Milestone</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Bachelorette Guides</h4>
              <ul className="space-y-1">
                <li><Link href="/3-day-austin-bachelorette-itinerary" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-3day-itinerary">3-Day Itinerary</Link></li>
                <li><Link href="/austin-bachelorette-nightlife" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-nightlife">Nightlife Guide</Link></li>
                <li><Link href="/budget-austin-bachelorette" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-budget">Budget Planning</Link></li>
                <li><Link href="/luxury-austin-bachelorette" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-luxury">Luxury Experience</Link></li>
                <li><Link href="/adventure-austin-bachelorette" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-adventure">Adventure Options</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">More Guides</h4>
              <ul className="space-y-1">
                <li><Link href="/ultimate-austin-bachelorette-weekend" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-ultimate-weekend">Ultimate Weekend</Link></li>
                <li><Link href="/top-10-austin-bachelorette-ideas" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-top10">Top 10 Ideas</Link></li>
                <li><Link href="/first-time-lake-travis-boat-rental-guide" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-first-time-guide">First Time Guide</Link></li>
                <li><Link href="/austin-bachelor-party-ideas" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-bachelor-ideas">Bachelor Party Ideas</Link></li>
                <li><Link href="/lake-travis-bachelor-party-boats" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-lake-travis-boats">Lake Travis Boats</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Special Events</h4>
              <ul className="space-y-1">
                <li><Link href="/wedding-anniversary-celebration-ideas" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-anniversary">Anniversary Ideas</Link></li>
                <li><Link href="/golden-ticket" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-golden-ticket">Golden Ticket Offer</Link></li>
                <li><Link href="/golden-ticket-private" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-golden-ticket-private">Private Golden Ticket</Link></li>
                <li><Link href="/ai-endorsement" className="text-gray-500 hover:text-brand-yellow text-xs" data-testid="link-footer-ai-endorsement">AI Endorsement</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* As Featured In Section - Hormozi/McDowell Trust Building */}
        <div className="border-t border-gray-800 mt-12 pt-8 pb-4">
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Award className="h-5 w-5 text-brand-yellow" />
              As Featured In
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-70 hover:opacity-100 transition-opacity">
              <div className="text-gray-300 text-sm font-semibold">Austin Chronicle</div>
              <div className="text-gray-300">•</div>
              <div className="text-gray-300 text-sm font-semibold">KVUE News</div>
              <div className="text-gray-300">•</div>
              <div className="text-gray-300 text-sm font-semibold">Lake Travis Life</div>
              <div className="text-gray-300">•</div>
              <div className="text-gray-300 text-sm font-semibold">Austin Monthly</div>
              <div className="text-gray-300">•</div>
              <div className="text-gray-300 text-sm font-semibold">512 Magazine</div>
            </div>
          </div>
          
          {/* Trust Seals and Certifications */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Ship className="h-5 w-5 text-brand-blue" />
              <span>Licensed & Certified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Award className="h-5 w-5 text-yellow-500" />
              <span>BBB Accredited Business</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Award className="h-5 w-5 text-green-500" />
              <span>TripAdvisor Certificate of Excellence</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright & Legal */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left" data-testid="text-footer-copyright">
              © {currentYear} {CONTACT_INFO.fullBusinessName}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link 
                href="/contact" 
                className="text-gray-400 hover:text-brand-yellow transition-colors"
                data-testid="link-footer-privacy"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-400 hover:text-brand-yellow transition-colors"
                data-testid="link-footer-terms"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
