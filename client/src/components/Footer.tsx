import { Link } from 'wouter';
import { useEffect } from 'react';
import {
  Ship, Phone, Mail, MapPin, Facebook, Instagram,
  MessageCircle, Youtube, Linkedin, Award, ChevronDown,
} from 'lucide-react';
import { CONTACT_INFO, SOCIAL_MEDIA } from '@shared/contact';

const logoPath = '/attached_assets/PPC-Logo-80x80.webp';

/*
 * Luxury footer — single source of truth for site-wide nav links.
 * Rules:
 *   • Every link appears exactly ONCE across the whole footer.
 *   • Groups: Cruises · Life Events · Wedding Events · Resources.
 *   • <details>-based dropdowns keep overflow categories (Bachelorette
 *     Guides, Special Offers) tidy without hiding them.
 *   • Matches the V2 luxury theme (deep black / gold accents / cream).
 */

const FOOTER_STYLES = `
.lfo {
  background:
    radial-gradient(ellipse at 20% 0%, rgba(30,136,229,0.08) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(200,169,110,0.06) 0%, transparent 60%),
    #07070C;
  border-top: 1px solid rgba(200,169,110,0.15);
  color: #C8B898;
  font-family: 'Jost', system-ui, sans-serif;
}
.lfo a { color: inherit; text-decoration: none; transition: color 0.2s ease; }
.lfo a:hover { color: #DFC08A; }

.lfo__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3.5rem 2rem 1.5rem;
}
.lfo__grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr 1fr;
  gap: 2.5rem;
}
@media (max-width: 960px) {
  .lfo__grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  .lfo__container { padding: 2.5rem 1.25rem 1rem; }
}
@media (max-width: 560px) {
  .lfo__grid { grid-template-columns: 1fr; gap: 1.75rem; }
}

.lfo__brand-block { display: flex; flex-direction: column; gap: 1rem; }
.lfo__brand-logo {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid rgba(200,169,110,0.25);
  padding: 4px;
  background: #0F0F18;
}
.lfo__brand-tag {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #C8B898;
  max-width: 320px;
  margin: 0;
}
.lfo__contact { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.25rem; }
.lfo__contact-item {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.88rem;
  color: #C8B898;
}
.lfo__contact-item svg {
  color: #C8A96E;
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.lfo__col-title {
  font-family: 'Jost', system-ui, sans-serif;
  font-size: 0.74rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C8A96E;
  margin: 0 0 1rem;
  font-weight: 500;
}
.lfo__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.55rem; }
.lfo__list li { margin: 0; }
.lfo__list a {
  font-size: 0.9rem;
  color: #C8B898;
  display: inline-block;
  line-height: 1.4;
}

/* Featured item (ATX Disco) */
.lfo__featured {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background: linear-gradient(135deg, rgba(200,169,110,0.15) 0%, rgba(200,169,110,0.06) 100%);
  border: 1px solid rgba(200,169,110,0.35);
  font-weight: 500;
  color: #F0E6D0 !important;
  margin-bottom: 0.5rem;
}
.lfo__featured::before {
  content: "✦";
  color: #C8A96E;
  font-size: 0.8rem;
}

/* Collapsible dropdown sections inside a column */
.lfo__drop {
  margin-top: 0.75rem;
  border-top: 1px dashed rgba(200,169,110,0.15);
  padding-top: 0.75rem;
}
.lfo__drop summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #A89878;
  font-weight: 500;
  padding: 0.25rem 0;
}
.lfo__drop summary::-webkit-details-marker { display: none; }
.lfo__drop summary svg {
  color: #C8A96E;
  transition: transform 0.2s ease;
  width: 14px;
  height: 14px;
}
.lfo__drop[open] summary svg { transform: rotate(180deg); }
.lfo__drop summary:hover { color: #DFC08A; }
.lfo__drop ul {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.lfo__drop a { font-size: 0.84rem; color: #A89878; }

/* Social icons */
.lfo__social-row {
  display: flex;
  gap: 0.9rem;
  margin-top: 0.5rem;
}
.lfo__social-row a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(200,169,110,0.2);
  color: #C8B898;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.lfo__social-row a:hover {
  color: #F0E6D0;
  border-color: rgba(200,169,110,0.55);
  background: rgba(200,169,110,0.06);
}
.lfo__social-row svg { width: 16px; height: 16px; }

/* Featured In + trust bar */
.lfo__press {
  border-top: 1px solid rgba(200,169,110,0.15);
  margin-top: 3rem;
  padding-top: 1.75rem;
  text-align: center;
}
.lfo__press-label {
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C8A96E;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 0.85rem;
}
.lfo__press-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 1.25rem;
  color: #A89878;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
}
.lfo__press-row span.sep { color: rgba(200,169,110,0.3); }
.lfo__trust {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(200,169,110,0.08);
  font-size: 0.72rem;
  color: #A89878;
}
.lfo__trust-item { display: inline-flex; align-items: center; gap: 0.4rem; }
.lfo__trust-item svg { color: #C8A96E; width: 13px; height: 13px; }

/* Bottom bar */
.lfo__bottom {
  border-top: 1px solid rgba(200,169,110,0.1);
  margin-top: 1.5rem;
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 0.72rem;
  color: #A89878;
}
.lfo__bottom-links { display: inline-flex; gap: 1.25rem; }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Pre-warm Xola script so Book Now in footer fires instantly on click
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).xolaLoaded) return;
    (window as any).xolaLoaded = true;
    const co = document.createElement('script');
    co.type = 'text/javascript';
    co.async = true;
    co.src = 'https://xola.com/checkout.js';
    document.body.appendChild(co);
  }, []);

  return (
    <footer className="lfo" data-testid="footer-main">
      <style dangerouslySetInnerHTML={{ __html: FOOTER_STYLES }} />

      <div className="lfo__container">
        <div className="lfo__grid">
          {/* ── Column 1: Brand + Contact ─────────────────── */}
          <div className="lfo__brand-block">
            <Link href="/" aria-label="Premier Party Cruises home">
              <img
                src={logoPath}
                alt="Premier Party Cruises"
                className="lfo__brand-logo"
                width={56}
                height={56}
                loading="lazy"
              />
            </Link>
            <p className="lfo__brand-tag">
              Austin's premier party cruise experience on Lake Travis. Creating unforgettable
              celebrations since 2009.
            </p>
            <div className="lfo__contact">
              <a href={CONTACT_INFO.phoneHref} className="lfo__contact-item">
                <Phone /> {CONTACT_INFO.phoneFormatted}
              </a>
              <a href={CONTACT_INFO.emailHref} className="lfo__contact-item">
                <Mail /> {CONTACT_INFO.email}
              </a>
              <span className="lfo__contact-item">
                <MapPin /> Anderson Mill Marina · Lake Travis, TX
              </span>
            </div>

            <div>
              <p className="lfo__col-title" style={{ marginBottom: '0.6rem' }}>Follow</p>
              <div className="lfo__social-row">
                <a href={SOCIAL_MEDIA.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook /></a>
                <a href={SOCIAL_MEDIA.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
                <a href={SOCIAL_MEDIA.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><MessageCircle /></a>
                <a href={SOCIAL_MEDIA.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube /></a>
                <a href={SOCIAL_MEDIA.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
              </div>
            </div>
          </div>

          {/* ── Column 2: Cruises ─────────────────────────── */}
          <div>
            <p className="lfo__col-title">Cruises</p>
            <Link href="/atx-disco-cruise" className="lfo__featured">ATX Disco Cruise</Link>
            <ul className="lfo__list">
              <li><Link href="/private-cruises">Private Cruises</Link></li>
              <li><Link href="/bachelor-party-austin">Bachelor Party</Link></li>
              <li><Link href="/bachelorette-party-austin">Bachelorette Party</Link></li>
              <li><Link href="/combined-bachelor-bachelorette-austin">Combined Bach Party</Link></li>
              <li><Link href="/party-boat-austin">Party Boat Austin</Link></li>
              <li><Link href="/party-boat-lake-travis">Party Boat Lake Travis</Link></li>
            </ul>
          </div>

          {/* ── Column 3: Life Events (with collapsible sub-groups) ─── */}
          <div>
            <p className="lfo__col-title">Life Events</p>
            <ul className="lfo__list">
              <li><Link href="/wedding-parties">Weddings</Link></li>
              <li><Link href="/birthday-parties">Birthday Parties</Link></li>
              <li><Link href="/corporate-events">Corporate Events</Link></li>
              <li><Link href="/celebration-cruises">Celebration Cruises</Link></li>
              <li><Link href="/anniversary-cruise">Anniversary Cruise</Link></li>
            </ul>

            <details className="lfo__drop">
              <summary>Wedding Weekend <ChevronDown /></summary>
              <ul>
                <li><Link href="/welcome-party">Welcome Party</Link></li>
                <li><Link href="/rehearsal-dinner">Rehearsal Dinner</Link></li>
                <li><Link href="/after-party">After Party</Link></li>
                <li><Link href="/bridal-shower-cruise">Bridal Shower</Link></li>
                <li><Link href="/engagement-party-cruise">Engagement Party</Link></li>
                <li><Link href="/proposal-cruise">Proposal Cruise</Link></li>
              </ul>
            </details>

            <details className="lfo__drop">
              <summary>Corporate <ChevronDown /></summary>
              <ul>
                <li><Link href="/team-building">Team Building</Link></li>
                <li><Link href="/client-entertainment">Client Entertainment</Link></li>
                <li><Link href="/company-milestone">Company Milestone</Link></li>
                <li><Link href="/holiday-party-cruise">Holiday Party</Link></li>
              </ul>
            </details>

            <details className="lfo__drop">
              <summary>Milestones <ChevronDown /></summary>
              <ul>
                <li><Link href="/milestone-birthday">Milestone Birthday</Link></li>
                <li><Link href="/sweet-16">Sweet 16</Link></li>
                <li><Link href="/graduation-party">Graduation Party</Link></li>
                <li><Link href="/graduation-cruise">Graduation Cruise</Link></li>
                <li><Link href="/prom-cruise">Prom Cruise</Link></li>
                <li><Link href="/retirement-party-cruise">Retirement</Link></li>
              </ul>
            </details>

            <details className="lfo__drop">
              <summary>Family <ChevronDown /></summary>
              <ul>
                <li><Link href="/baby-shower-cruise">Baby Shower</Link></li>
                <li><Link href="/gender-reveal-cruise">Gender Reveal</Link></li>
                <li><Link href="/family-reunion-cruise">Family Reunion</Link></li>
                <li><Link href="/memorial-celebration-cruise">Memorial Celebration</Link></li>
              </ul>
            </details>
          </div>

          {/* ── Column 4: Resources + Guides ─────────────── */}
          <div>
            <p className="lfo__col-title">Resources</p>
            <ul className="lfo__list">
              <li><Link href="/book">Book Now</Link></li>
              <li><Link href="/chat">Get a Quote</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/testimonials-faq">Reviews & FAQ</Link></li>
              <li><Link href="/blogs">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>

            <details className="lfo__drop">
              <summary>Bachelorette Guides <ChevronDown /></summary>
              <ul>
                <li><Link href="/3-day-austin-bachelorette-itinerary">3-Day Itinerary</Link></li>
                <li><Link href="/ultimate-austin-bachelorette-weekend">Ultimate Weekend</Link></li>
                <li><Link href="/top-10-austin-bachelorette-ideas">Top 10 Ideas</Link></li>
                <li><Link href="/luxury-austin-bachelorette">Luxury Guide</Link></li>
                <li><Link href="/budget-austin-bachelorette">Budget Guide</Link></li>
                <li><Link href="/adventure-austin-bachelorette">Adventure Guide</Link></li>
                <li><Link href="/austin-bachelorette-nightlife">Nightlife Guide</Link></li>
              </ul>
            </details>

            <details className="lfo__drop">
              <summary>Bachelor & Boat Guides <ChevronDown /></summary>
              <ul>
                <li><Link href="/austin-bachelor-party-ideas">Bachelor Party Ideas</Link></li>
                <li><Link href="/lake-travis-bachelor-party-boats">Lake Travis Boats</Link></li>
                <li><Link href="/first-time-lake-travis-boat-rental-guide">First-Time Boat Rental</Link></li>
                <li><Link href="/wedding-anniversary-celebration-ideas">Anniversary Ideas</Link></li>
              </ul>
            </details>

            <details className="lfo__drop">
              <summary>More <ChevronDown /></summary>
              <ul>
                <li><Link href="/partners">Partner Program</Link></li>
                <li><Link href="/golden-ticket">Golden Ticket Offer</Link></li>
                <li><Link href="/ai-endorsement">AI Endorsement</Link></li>
                <li><Link href="/site-directory">Site Directory</Link></li>
              </ul>
            </details>
          </div>
        </div>

        {/* As Featured In */}
        <div className="lfo__press">
          <p className="lfo__press-label">
            <Award size={13} /> As Featured In
          </p>
          <div className="lfo__press-row">
            <span>Austin Chronicle</span>
            <span className="sep">·</span>
            <span>KVUE News</span>
            <span className="sep">·</span>
            <span>Lake Travis Life</span>
            <span className="sep">·</span>
            <span>Austin Monthly</span>
            <span className="sep">·</span>
            <span>512 Magazine</span>
          </div>
          <div className="lfo__trust">
            <span className="lfo__trust-item"><Ship /> Licensed & Certified</span>
            <span className="lfo__trust-item"><Award /> BBB Accredited</span>
            <span className="lfo__trust-item"><Award /> TripAdvisor Excellence</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="lfo__bottom">
          <span>© {currentYear} {CONTACT_INFO.fullBusinessName}. All rights reserved.</span>
          <div className="lfo__bottom-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
