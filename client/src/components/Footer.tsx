import { Link } from 'wouter';
import { useEffect } from 'react';
import { 
  Ship, Phone, Mail, MapPin, Facebook, Instagram, 
  MessageCircle, Youtube, Linkedin, ExternalLink, Bot, Award, FileText 
} from 'lucide-react';
import { CONTACT_INFO, SOCIAL_MEDIA } from '@shared/contact';
import logoPath from '@assets/PPC-Logo-80x80.webp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Load Xola checkout.js for domain verification
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="xola.com/checkout.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://xola.com/checkout.js';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
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

          {/* Experiences Section */}
          <div className="space-y-4" data-testid="footer-experiences-section">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Ship className="h-5 w-5 text-brand-blue" />
              <span>Experiences</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/atx-disco-cruise" 
                  className="text-white hover:text-brand-yellow transition-colors text-sm block font-semibold flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-2 rounded-lg border border-yellow-500/30"
                  data-testid="link-footer-disco-cruises"
                >
                  <span className="text-yellow-400">⭐</span>
                  <span>ATX Disco Cruise - Featured</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/bachelor-party-austin" 
                  className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block"
                  data-testid="link-footer-bachelor-party"
                >
                  Bachelor Party Austin
                </Link>
              </li>
              <li>
                <Link 
                  href="/bachelorette-party-austin" 
                  className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block"
                  data-testid="link-footer-bachelorette-party"
                >
                  Bachelorette Party Austin
                </Link>
              </li>
              <li>
                <Link 
                  href="/combined-bachelor-bachelorette-austin" 
                  className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block"
                  data-testid="link-footer-combined-parties"
                >
                  Combined Parties Austin
                </Link>
              </li>
              <li>
                <Link 
                  href="/private-cruises" 
                  className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block"
                  data-testid="link-footer-private-cruises"
                >
                  Private Cruises
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
                <Link 
                  href="/blogs" 
                  className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block"
                  data-testid="link-footer-blogs"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/gallery" 
                  className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block"
                  data-testid="link-footer-gallery"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  href="/testimonials-faq" 
                  className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block"
                  data-testid="link-footer-reviews-faq"
                >
                  Reviews & FAQ
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-brand-yellow transition-colors text-sm block"
                  data-testid="link-footer-contact"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-bold text-white mb-4 pt-4">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href={SOCIAL_MEDIA.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-blue transition-colors"
                data-testid="link-footer-facebook"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href={SOCIAL_MEDIA.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-blue transition-colors"
                data-testid="link-footer-instagram"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href={SOCIAL_MEDIA.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-blue transition-colors"
                data-testid="link-footer-tiktok"
                aria-label="TikTok"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a 
                href={SOCIAL_MEDIA.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-blue transition-colors"
                data-testid="link-footer-youtube"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a 
                href={SOCIAL_MEDIA.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-blue transition-colors"
                data-testid="link-footer-linkedin"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
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
