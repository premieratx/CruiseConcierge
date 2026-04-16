import { ReactNode } from 'react';
import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * SiteDirectoryV2 — full site directory / internal-linking hub.
 * Route: /site-directory-v2
 *
 * Strategy: Complete organized sitemap for humans and search crawlers.
 * Grouped by category: Services, Party Types, Guides & Blogs, Info pages.
 */

const DIRECTORY_STYLES = `
.hp2-dir-section {
  padding: 4rem 4rem;
  max-width: 1280px;
  margin: 0 auto;
}
.hp2-dir-section--alt {
  background: var(--hp2-bg-1);
  max-width: none;
  border-top: 1px solid var(--hp2-border);
  border-bottom: 1px solid var(--hp2-border);
}
.hp2-dir-section--alt > .hp2-dir-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 4rem;
}
.hp2-dir-heading {
  font-family: var(--hp2-font-display);
  font-size: 2rem;
  font-weight: 300;
  color: var(--hp2-cream);
  margin: 0 0 1.5rem 0;
}
.hp2-dir-heading em {
  font-style: italic;
  color: var(--hp2-gold-light);
}
.hp2-dir-sub {
  font-size: 1rem;
  color: var(--hp2-cream-muted);
  line-height: 1.65;
  margin-bottom: 2rem;
  max-width: 760px;
}
.hp2-dir-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem 2rem;
  margin-top: 1.5rem;
}
.hp2-dir-link {
  color: var(--hp2-cream-muted);
  font-family: var(--hp2-font-body);
  font-size: 0.92rem;
  letter-spacing: 0.02em;
  text-decoration: none;
  padding: 0.45rem 0;
  border-bottom: 1px solid var(--hp2-border-sub);
  transition: color 0.2s ease, border-color 0.2s ease;
}
.hp2-dir-link:hover {
  color: var(--hp2-gold);
  border-bottom-color: var(--hp2-gold-dim2);
}
.hp2-dir-link--primary {
  color: var(--hp2-gold);
  font-weight: 500;
}
@media (max-width: 768px) {
  .hp2-dir-section,
  .hp2-dir-section--alt > .hp2-dir-inner {
    padding: 3rem 1.5rem;
  }
}
`;

interface DirLink {
  title: string;
  href: string;
  primary?: boolean;
}

interface DirGroup {
  heading: ReactNode;
  subtitle: string;
  links: DirLink[];
  alt?: boolean;
}

const GROUPS: DirGroup[] = [
  {
    heading: <>Core <em>services</em></>,
    subtitle:
      "The main booking destinations. Start here if you're planning a specific kind of party or want to see the full fleet.",
    links: [
      { title: 'Home', href: '/', primary: true },
      { title: 'Book Online', href: '/book', primary: true },
      { title: 'ATX Disco Cruise', href: '/atx-disco-cruise' },
      { title: 'Private Charters', href: '/private-cruises' },
      { title: 'Pricing', href: '/pricing' },
      { title: 'Pricing Breakdown', href: '/pricing-breakdown' },
      { title: 'Contact', href: '/contact' },
      { title: 'Gallery', href: '/gallery' },
      { title: 'Reviews & FAQ', href: '/testimonials-faq' },
      { title: 'Full FAQ', href: '/faq' },
      { title: 'After Party / Lemonade Disco', href: '/after-party' },
      { title: 'Affiliates', href: '/affiliates' },
    ],
  },
  {
    heading: <>Bachelor &amp; bachelorette <em>parties</em></>,
    subtitle:
      "Austin's #1 bachelor and bachelorette party service. Browse the options, pricing, and planning guides.",
    links: [
      { title: 'Bachelor Party Austin', href: '/bachelor-party-austin', primary: true },
      { title: 'Bachelorette Party Austin', href: '/bachelorette-party-austin', primary: true },
      { title: 'Combined Bachelor + Bachelorette', href: '/combined-bachelor-bachelorette-austin' },
      { title: 'Austin Bachelor Party Ideas', href: '/austin-bachelor-party-ideas' },
      { title: 'Lake Travis Bachelor Party Boats', href: '/lake-travis-bachelor-party-boats' },
      { title: 'Austin Boat Party', href: '/austin-boat-party' },
      { title: 'Austin Bachelorette Nightlife', href: '/austin-bachelorette-nightlife' },
      { title: 'Adventure Austin Bachelorette', href: '/adventure-austin-bachelorette' },
      { title: 'Austin Bachelorette Bliss Guide', href: '/austin-bachelorette-bliss-guide' },
    ],
    alt: true,
  },
  {
    heading: <>Weddings &amp; <em>milestones</em></>,
    subtitle:
      "Rehearsal dinners, bridal showers, anniversaries, engagement celebrations, and once-in-a-lifetime milestones on the water.",
    links: [
      { title: 'Wedding Parties', href: '/wedding-parties', primary: true },
      { title: 'Rehearsal Dinner', href: '/rehearsal-dinner' },
      { title: 'Rehearsal Dinner Cruise', href: '/rehearsal-dinner-cruise' },
      { title: 'Bridal Shower Cruise', href: '/bridal-shower-cruise' },
      { title: 'Engagement Party Cruise', href: '/engagement-party-cruise' },
      { title: 'Proposal Cruise', href: '/proposal-cruise' },
      { title: 'Welcome Party', href: '/welcome-party' },
      { title: 'Anniversary Cruise', href: '/anniversary-cruise' },
      { title: 'Wedding Anniversary Ideas', href: '/wedding-anniversary-ideas' },
      { title: 'Vow Renewal', href: '/vow-renewal' },
    ],
  },
  {
    heading: <>Birthdays &amp; <em>celebrations</em></>,
    subtitle:
      "From Sweet 16 to 50th birthdays, graduations to holiday parties — every celebration-sized boat rental category.",
    links: [
      { title: 'Birthday Parties', href: '/birthday-parties', primary: true },
      { title: 'Birthday Party Boat Rental', href: '/birthday-party-boat-rental' },
      { title: 'Milestone Birthday', href: '/milestone-birthday' },
      { title: 'Sweet 16', href: '/sweet-16' },
      { title: 'Graduation Cruise', href: '/graduation-cruise' },
      { title: 'Graduation Party', href: '/graduation-party' },
      { title: 'Prom Cruise', href: '/prom-cruise' },
      { title: 'Holiday Party Cruise', href: '/holiday-party-cruise' },
      { title: 'Retirement Party Cruise', href: '/retirement-party-cruise' },
      { title: 'Baby Shower Cruise', href: '/baby-shower-cruise' },
      { title: 'Birthday Party Austin Guide', href: '/birthday-party-austin-guide' },
    ],
    alt: true,
  },
  {
    heading: <>Corporate &amp; <em>groups</em></>,
    subtitle:
      "Team building, client entertainment, company milestones, sales kickoffs — Lake Travis charters for corporate Austin.",
    links: [
      { title: 'Corporate Events', href: '/corporate-events', primary: true },
      { title: 'Team Building', href: '/team-building' },
      { title: 'Client Entertainment', href: '/client-entertainment' },
      { title: 'Company Milestone', href: '/company-milestone' },
      { title: 'Conference Group', href: '/conference-group' },
      { title: 'SXSW Events', href: '/sxsw-events' },
      { title: 'Convention Groups', href: '/convention-groups' },
      { title: 'Networking Events', href: '/networking-events' },
    ],
  },
  {
    heading: <>Location &amp; <em>SEO</em> pages</>,
    subtitle:
      "Lake Travis party boat pages for specific queries, neighborhoods, and marinas.",
    links: [
      { title: 'Party Boat Austin', href: '/party-boat-austin' },
      { title: 'Party Boat Lake Travis', href: '/party-boat-lake-travis' },
      { title: 'Lake Travis Boat Rental', href: '/lake-travis-boat-rental' },
      { title: 'First-Time Lake Travis Boat Rental Guide', href: '/first-time-lake-travis-boat-rental-guide' },
      { title: 'Austin Party Boat Rental', href: '/austin-party-boat-rental' },
      { title: 'Lake Travis Party Cruise', href: '/lake-travis-party-cruise' },
      { title: 'Austin Party Cruise', href: '/austin-party-cruise' },
      { title: 'Anderson Mill Marina', href: '/anderson-mill-marina' },
    ],
    alt: true,
  },
  {
    heading: <>Blog &amp; <em>guides</em></>,
    subtitle:
      "Long-form guides, planning checklists, itineraries, and Austin nightlife content. Bookmark-worthy resources for anyone planning a Lake Travis event.",
    links: [
      { title: 'All Blog Posts', href: '/blogs', primary: true },
      { title: 'How to Throw a Great Bachelor Party', href: '/blogs/how-to-throw-great-bachelor-party-austin' },
      { title: 'Perfect Bachelor Party Itinerary', href: '/blogs/perfect-bachelor-party-itinerary-austin' },
      { title: 'Epic Bachelor Party Ultimate Guide', href: '/blogs/epic-bachelor-party-austin-ultimate-guide' },
      { title: 'Bachelorette Party Planning Guide', href: '/blogs/bachelorette-party-planning-guide' },
      { title: 'Lake Travis Swimming Coves', href: '/blogs/lake-travis-swimming-coves' },
      { title: 'Austin Nightlife Guide', href: '/blogs/austin-nightlife-guide' },
      { title: 'BYOB Boat Rules', href: '/blogs/byob-boat-rules' },
      { title: 'Austin Weather Guide', href: '/blogs/austin-weather-guide' },
      { title: 'Packing Checklist', href: '/blogs/lake-travis-packing-checklist' },
    ],
  },
  {
    heading: <>Info, policies &amp; <em>support</em></>,
    subtitle:
      "Legal pages, policies, support resources, and everything else that doesn't fit a service category.",
    links: [
      { title: 'Contact Us', href: '/contact', primary: true },
      { title: 'Full FAQ', href: '/faq' },
      { title: 'Reviews & Testimonials', href: '/testimonials-faq' },
      { title: 'Gallery', href: '/gallery' },
      { title: 'Pricing Breakdown', href: '/pricing-breakdown' },
      { title: 'AI Endorsement', href: '/ai-endorsement' },
      { title: 'Affiliates Program', href: '/affiliates' },
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
      { title: 'Refund Policy', href: '/refund-policy' },
      { title: 'Accessibility', href: '/accessibility' },
    ],
    alt: true,
  },
];

function DirectoryGroup({ group }: { group: DirGroup }) {
  const inner = (
    <>
      <h2 className="hp2-dir-heading">{group.heading}</h2>
      <p className="hp2-dir-sub">{group.subtitle}</p>
      <div className="hp2-dir-grid">
        {group.links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className={`hp2-dir-link ${link.primary ? 'hp2-dir-link--primary' : ''}`}
          >
            {link.title}
          </a>
        ))}
      </div>
    </>
  );

  return group.alt ? (
    <section className="hp2-dir-section--alt">
      <div className="hp2-dir-inner">{inner}</div>
    </section>
  ) : (
    <section className="hp2-dir-section">{inner}</section>
  );
}

export default function SiteDirectoryV2() {
  return (
    <V2PageTemplate
      pageUrl="/site-directory-v2"
      pageTitle="Site Directory | Premier Party Cruises | All Pages & Resources"
      pageDescription="Complete site directory for Premier Party Cruises. Every service page, blog post, and resource on the site, organized by category for easy navigation."
      heroEyebrow="Site Directory · All Pages"
      heroHeadline={
        <>
          Complete <em>site directory</em>.
        </>
      }
      heroBody="Every page on premierpartycruises.com, organized by category. Services, parties, weddings, corporate events, blog guides, and info pages — all in one scannable sitemap."
      primaryCta={{ text: 'Book a Cruise', href: '/book' }}
      secondaryCta={{ text: 'Contact the Team', href: '/contact' }}
      finalCtaHeadline={
        <>
          Found what you were <em>looking for</em>?
        </>
      }
      finalCtaBody="If not, our team is happy to point you to the right page or answer any question directly. Call (512) 488-5892 or send us a message."
    >
      <style dangerouslySetInnerHTML={{ __html: DIRECTORY_STYLES }} />

      {GROUPS.map((group, idx) => (
        <DirectoryGroup key={idx} group={group} />
      ))}
    </V2PageTemplate>
  );
}
