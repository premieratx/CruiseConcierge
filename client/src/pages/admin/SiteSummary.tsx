import AdminNoIndex from "@/components/AdminNoIndex";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { ChevronDown, ChevronRight, Layout, FileText, Search, TrendingUp, AlertTriangle, CheckCircle2, Info, Target, DollarSign, Star, Clock, Users, Anchor, Calendar, Gift, XCircle } from 'lucide-react';

interface PageSection {
  name: string;
  component?: string;
  why: string;
  seoRole?: string;
  notes?: string;
  warning?: string;
}

interface PageDoc {
  route: string;
  file: string;
  title: string;
  description: string;
  wordCount?: string;
  hub: boolean;
  sections: PageSection[];
  ssrNotes?: string;
  keyRules?: string[];
}

function SectionRow({ section, index }: { section: PageSection; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-0">
          <span className="mt-0.5 text-gray-400 shrink-0">
            {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
          <span className="text-xs font-mono text-gray-400 shrink-0 mt-0.5 w-5">{index + 1}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-gray-900 text-sm">{section.name}</span>
              {section.component && (
                <code className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{section.component}</code>
              )}
              {section.warning && (
                <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                  <AlertTriangle className="h-3 w-3" /> {section.warning}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{section.why}</p>
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 space-y-2 ml-12">
          {section.seoRole && (
            <div className="flex gap-2">
              <Search className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800"><span className="font-semibold">SEO role:</span> {section.seoRole}</p>
            </div>
          )}
          {section.notes && (
            <div className="flex gap-2">
              <Info className="h-3.5 w-3.5 text-gray-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700"><span className="font-semibold">Notes:</span> {section.notes}</p>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function PageDocCard({ page }: { page: PageDoc }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <code className="text-sm font-mono bg-gray-900 text-green-400 px-2 py-1 rounded">{page.route}</code>
        <code className="text-xs font-mono text-gray-500">{page.file}</code>
        {page.hub && <Badge className="bg-amber-100 text-amber-800 border-amber-200">Hub Page</Badge>}
        {page.wordCount && (
          <span className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
            <TrendingUp className="h-3 w-3" /> ~{page.wordCount} crawler words
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{page.description}</p>

      {page.ssrNotes && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <p className="text-xs font-semibold text-amber-800 mb-1 flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" /> SSR / Crawler Layer
          </p>
          <p className="text-xs text-amber-700 leading-relaxed">{page.ssrNotes}</p>
        </div>
      )}

      {page.keyRules && page.keyRules.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-xs font-semibold text-red-800 mb-2 flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" /> Non-negotiable rules for this page
          </p>
          <ul className="space-y-1">
            {page.keyRules.map((rule, i) => (
              <li key={i} className="text-xs text-red-700 flex gap-2">
                <span className="shrink-0">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Card className="shadow-none border-gray-200">
        <CardHeader className="pb-0 pt-4 px-4">
          <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Page Sections ({page.sections.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-3">
          {page.sections.map((section, i) => (
            <SectionRow key={i} section={section} index={i} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── PAGE DATA ───────────────────────────────────────────────────────────────

const HOME_PAGE: PageDoc = {
  route: '/',
  file: 'client/src/pages/Home.tsx',
  title: 'Home Page',
  description:
    'The main landing page. Serves two audiences simultaneously: groups shopping for the ATX Disco Cruise (public multi-group party) and groups considering a private charter. Splits the two offerings side-by-side so visitors can self-select immediately. Also serves as the primary trust and authority page for the brand.',
  wordCount: '4,291',
  hub: false,
  ssrNotes:
    'Full SSR content lives in server/ssr/pageContent.ts under the "/" key. Covers the full business description, both service types, fleet details, pricing overview, FAQs, marina logistics, and Austin context. This content is injected as a sibling .ssr-content div — visible to crawlers, hidden after React hydrates. DO NOT add SEO content blocks to the React UI.',
  keyRules: [
    'Never remove sections from the React UI without maintaining equivalent keyword coverage in pageContent.ts',
    'Phone number is (512) 488-5892 — hard-code only from CONTACT_INFO.phoneFormatted / phoneHref',
    'All structured data (JSON-LD) injected by SSR via schemaLoader.ts — NEVER add schema from React components',
    'Hero video: Boat_Video_Walkthrough.mp4 (compressed). Poster image loads first to prevent LCP delay.',
    'Quote builder iframe must load eagerly (not lazy) — it is a primary conversion tool',
  ],
  sections: [
    {
      name: 'Hero Section',
      why: 'First impression and primary conversion entry point. Video background creates immediate emotional impact. Two CTAs: Check Availability (Xola) and Get a Quote (quote builder). Trust bar at bottom establishes credibility instantly.',
      seoRole: 'Contains the H1 tag — critical for SEO. Must include primary keyword. Fixed height prevents Cumulative Layout Shift (CLS) which hurts Core Web Vitals scores.',
      notes: 'Video is Boat_Video_Walkthrough.mp4. Fallback poster image shows on mobile/slow connections. The overlay prevents text readability issues.',
    },
    {
      name: 'Social Proof Strip',
      why: 'Quick trust signals (star ratings, review count, years in business) shown immediately below the fold. Reduces bounce rate by validating credibility before visitors scroll.',
      seoRole: 'Adds topical authority signals. Rich with business stats that AI crawlers use for entity recognition.',
    },
    {
      name: 'Two Experiences Section (ATX Disco + Private Charters)',
      why: 'Side-by-side presentation of the two core products helps visitors self-qualify without clicking away. ATX Disco Cruise on the left (higher volume, lower price), Private Charters on the right (higher value, custom). Each has its own photos, description, highlights, and CTA.',
      seoRole: 'Contains the two main H2s linking to the hub pages. Establishes clear topical hierarchy for search engines.',
      notes: 'Clicking a service opens a lightbox with more detail and photos — this improves engagement without navigating away. Each lightbox has a Book Now button that launches the Xola widget.',
    },
    {
      name: 'Testimonials Section',
      why: 'Social proof from real customers builds trust at the consideration stage. Shown early in the scroll to catch visitors before they leave.',
      seoRole: 'Review content helps with E-E-A-T signals. ReviewSnippet schema is injected by SSR.',
      notes: 'Reviews pulled from the endorsements API. If API is slow, section still renders with static fallback.',
    },
    {
      name: 'Quote Builder Section',
      component: 'QuoteBuilderSection',
      why: 'Primary lead capture tool. The embedded quote widget lets visitors price out a private charter or disco cruise in real time. This is a core conversion element — it is loaded eagerly (not lazy) so it starts loading immediately.',
      seoRole: 'Minimal direct SEO value, but high conversion value. Keeping it above-the-fold on the conversion funnel matters more than keyword density here.',
      notes: 'Source tracking is embedded in the widget. DO NOT lazy-load this component — it must start initializing as the page loads.',
    },
    {
      name: 'Booking & Availability Section',
      why: 'Xola booking widget for the ATX Disco Cruise. Lets visitors see open dates and book directly. Xola re-initializes on every navigation to prevent stale state.',
      seoRole: 'Low SEO value but critical for conversion. Availability visibility reduces friction.',
    },
    {
      name: 'Photo Gallery Section',
      component: 'AnimatedPhotoGallery',
      why: 'Visual evidence of the actual experience. Gallery shows verified party photos only — photos with empty boats or non-party content are excluded. Builds desire and proves the experience is real.',
      seoRole: 'Images have alt text for accessibility and crawlability. Photo content on a page signals it is a real business with real activity.',
      notes: 'Only verified party photos. Mislabeled images showing empty boats have been explicitly excluded.',
    },
    {
      name: 'FAQ Section',
      why: 'Answers the most common pre-booking questions (BYOB policy, what is included, how early to arrive, etc). Reduces inbound phone calls and sales friction. Displayed as a 2-column accordion so it is compact.',
      seoRole: 'FAQPage JSON-LD schema injected by SSR for this section. FAQ content is a major source of zero-click search answers and AI Overview pull-through.',
      notes: 'After adding new FAQs to this accordion, update attached_assets/schema_data/ JSON-LD files to match.',
    },
    {
      name: 'Contact & CTA Section',
      why: 'Final conversion point for visitors who scrolled the whole page. Direct contact options (phone + form) for people who prefer to talk before booking.',
      seoRole: 'NAP (Name, Address, Phone) on the page reinforces local SEO signals.',
    },
    {
      name: 'Internal Links Strip',
      why: 'Bottom-of-page link cluster to other service pages and blog content. Keeps users engaged and distributes link equity to deeper pages.',
      seoRole: 'Critical for crawl budget and internal PageRank distribution. Links to all 3 hub pages and major category pages.',
    },
    {
      name: 'AI-Optimized Entity Section',
      component: 'AIOptimizedSection',
      why: 'Hidden section (visually minimal) that provides structured entity recognition data for AI search engines like Perplexity, Google AI Overviews, and ChatGPT. Includes business entity data, location, services, and attributes in a format AI systems parse well.',
      seoRole: 'Directly targets AI answer engine visibility. Contains structured facts about the business, marina, fleet, and offerings.',
    },
  ],
};

const BACHELOR_PAGE: PageDoc = {
  route: '/bachelor-party-austin',
  file: 'client/src/pages/BachelorParty.tsx',
  title: 'Bachelor Party Austin — Hub Page',
  description:
    'One of the three primary hub pages. Targets searches for bachelor party boats in Austin and Lake Travis. Covers both the ATX Disco Cruise (recommended for multi-group bachelorette-bachelor joint parties) and private charters. This page is the highest-authority bachelor party page on the site and must be treated as such in all linking decisions.',
  wordCount: '4,720',
  hub: true,
  ssrNotes:
    'SSR content in pageContent.ts under "/bachelor-party-austin". Covers: what is included, pricing, how it works, marina address/logistics, transportation guide, booking timeline, 10+ FAQs, why Lake Travis, Austin context. Word count has been stable near 4,734 target. Marina transportation section added to SSR layer in March 2026.',
  keyRules: [
    'This is a HUB page — all bachelor party blog posts must link back here, not to other blog posts',
    'Never reduce crawler word count below 4,500 without a documented replacement plan',
    'DJ pricing is $600 (flat) — not a range. Never write "$300–$500" anywhere on this page or in SSR',
    'No glass beer bottles (wine/champagne/spirits in cooler OK). Spray sunscreen is allowed (apply at rails). Food is welcome — nothing too messy please, our boats are really nice, help us keep \'em that way.',
    'Party On Delivery must always link to https://partyondelivery.com when mentioned',
    'The luxury bachelorette page must NOT be linked from this page or suggested as a destination',
  ],
  sections: [
    {
      name: 'Table of Contents',
      component: 'TableOfContents',
      why: 'Sticky sidebar TOC lets visitors jump to relevant sections quickly. Reduces pogo-sticking back to search results. Also signals rich page structure to search engines.',
      seoRole: 'Helps Google understand page structure and often surfaces as jump links in search results.',
    },
    {
      name: 'Hero Section',
      why: 'Full-bleed video hero with the bachelor party pitch. H1 establishes the primary keyword. Two CTAs: pricing anchor link and Xola booking widget. Video creates immediate excitement.',
      seoRole: 'H1 placement here is critical. Video background uses Boat_Video_Walkthrough.mp4 with fallback poster.',
      notes: 'VideoShowcaseGrid component shows 4 autoplay clips below the fold.',
    },
    {
      name: 'Featured YouTube Video',
      why: 'YouTube embed of a full ATX Disco Cruise highlight reel. Increases dwell time, which signals page quality to search engines. Also pre-sells the experience better than text alone.',
      seoRole: 'Video embeds increase average time-on-page. VideoObject schema injected by SSR.',
    },
    {
      name: 'Video Showcase Grid',
      component: 'VideoShowcaseGrid',
      why: 'Four autoplay clips showing key moments: dancing, drinks, excitement, the boat. Gives visitors a visceral sense of what the experience looks like before they read anything.',
    },
    {
      name: 'ATX Disco Cruise Video Carousel',
      why: 'Horizontal scroll of multiple short clips. Variety of crowd angles and moments increases the likelihood that a visitor sees something relatable to their group.',
    },
    {
      name: 'Subtle Tagline Section',
      why: 'A single line of copy positioning the ATX Disco Cruise as "the only all-inclusive bachelor/bachelorette cruise in the U.S." — a differentiation claim that sets up everything below.',
    },
    {
      name: 'Scrolling Photo Gallery',
      why: 'Horizontal auto-scrolling gallery of real party photos. Maintains visual momentum without forcing the visitor to click. Shows diversity of group types, outfits, vibes.',
      seoRole: 'Photo content adds visual richness signals. ALT text covers keyword territory.',
    },
    {
      name: 'Quote Builder Section (Early)',
      component: 'QuoteBuilderSection',
      why: 'Early placement of the quote widget catches visitors who are ready to price out quickly without scrolling the full page. High-intent visitors should not have to search for this.',
    },
    {
      name: 'Your Two Options Section',
      why: 'Side-by-side cards for ATX Disco Cruise vs Private Charter. Lets bachelor groups quickly see which fits their budget, group size, and vibe. Price anchors are shown for both.',
      seoRole: 'Covers both product types on the same page — reduces the need to rank separate pages for every variation.',
      notes: 'ATX Disco Cruise card links to /atx-disco-cruise. Private Charter links to /private-cruises. Combined bach link present.',
    },
    {
      name: 'Packages & Pricing',
      why: 'Detailed pricing breakdown for both offerings. Shows per-person pricing for the Disco Cruise (Fri/Sat slots with exact times and prices) and hourly rates for private charters. Transparency in pricing reduces the #1 objection before a booking call.',
      seoRole: 'Pricing content is frequently pulled into AI Overviews and zero-click answers. Exact prices with context (what is included) are critical to maintain here.',
      notes: 'ATX Disco pricing: Fri 12-4pm $95/person, Sat 11am-3pm $105/person, Sat 3:30-7:30pm $85/person. Private: Day Tripper $200/hr, Meeseeks $225/hr, Clever Girl $250/hr. DJ add-on: $600 flat.',
      warning: 'Pricing must stay in sync with pageContent.ts',
    },
    {
      name: 'What to Expect Section',
      why: 'Step-by-step breakdown of what happens on the day. Reduces anxiety for first-time bookers. Covers arrival, boarding, what the vibe is like, when to expect the DJ, etc.',
      seoRole: 'How-it-works content is heavily weighted by AI engines answering "what is the ATX Disco Cruise like" queries.',
    },
    {
      name: 'Schedule & Timing',
      why: 'Shows all available time slots with exact start/end times and per-person prices. Lets visitors choose a slot that fits their Austin itinerary.',
      notes: 'Three slots: Fri 12-4pm, Sat 11am-3pm, Sat 3:30-7:30pm. March through October only.',
    },
    {
      name: 'Features & What is Included',
      why: 'Bullet list of every included amenity: DJ, captain, photographer, cooler, ice, sound system, disco balls. Answers the most common question: "Is [X] included?" before it is asked.',
      seoRole: 'Inclusion lists are directly indexed by AI engines and frequently appear in comparison answers.',
      warning: 'Photographer is included FREE on ATX Disco Cruise only — NOT on private charters. Never conflate.',
    },
    {
      name: 'Why Choose Premier — Trust Signals',
      why: '15 years in business, 4.9-star rating, perfect safety record, only all-inclusive multi-group cruise in the U.S. Establishes authority and differentiates from competitors.',
      seoRole: 'E-E-A-T signals. Experience (15 years), Expertise (only option in the U.S.), Authoritativeness, Trustworthiness (safety record).',
    },
    {
      name: 'Photo Gallery',
      why: 'Full photo gallery of verified bachelor party content. Shows guys having fun on the boat — makes the experience feel real and relatable.',
      notes: 'AnimatedPhotoGallery component. Mislabeled / empty-boat photos are excluded.',
    },
    {
      name: 'Cross-link: Combined Bach Block',
      why: 'Authority block linking to /combined-bachelor-bachelorette-austin. Explicitly addresses the joint bachelor/bachelorette use case, which is the ATX Disco Cruise\'s #1 selling scenario.',
      seoRole: 'Internal authority link to another hub page. Bidirectional linking between hub pages strengthens the cluster.',
    },
    {
      name: 'Testimonials',
      why: 'Social proof specific to bachelor groups. Real reviews build trust at the decision stage.',
    },
    {
      name: 'FAQs (Main)',
      why: 'Comprehensive FAQ covering BYOB rules, glass policy, group size, pricing, booking lead time, parking, marina address, what happens if it rains, and more.',
      seoRole: 'FAQPage schema injected by SSR. Primary source for AI Overview answers about bachelor party boats in Austin.',
      notes: 'After adding FAQs here, update attached_assets/schema_data/bachelor-party.jsonld',
    },
    {
      name: 'Final CTA Section',
      why: 'Full-width dark CTA section at the end for visitors who read the full page. Final push to book.',
    },
    {
      name: 'Related Experiences Section',
      why: 'Grid of related service links (bachelorette, combined bach, private cruises, etc). Keeps visitors in the funnel if this specific page is not exactly what they want.',
      seoRole: 'Internal links with descriptive anchor text. Passes authority to other hub and category pages.',
    },
    {
      name: 'Austin Bachelor Party Planning Guides',
      why: 'Links to the 9 ATX Disco Cruise blog posts and related guides. Demonstrates topical depth, which is an SEO authority signal. Also keeps visitors discovering more content.',
      seoRole: 'Key component of the content cluster model. Hub page links to blog posts; blog posts link back to hub.',
    },
    {
      name: 'Bachelor Party FAQs (Secondary)',
      why: 'Second FAQ block targeting long-tail "bachelor party Austin" queries not covered in the main FAQ. Adds word count and covers more specific question formats.',
    },
    {
      name: 'Internal Links Strip',
      why: 'Bottom-of-page link cluster to all major service and category pages.',
      seoRole: 'Sitewide internal link distribution. Crawl budget optimization.',
    },
  ],
};

const BACHELORETTE_PAGE: PageDoc = {
  route: '/bachelorette-party-austin',
  file: 'client/src/pages/BacheloretteParty.tsx',
  title: 'Bachelorette Party Austin — Hub Page',
  description:
    'One of the three primary hub pages. Targets bachelorette party searches for Lake Travis and Austin. Major expansion happened in March 2026: page grew from ~604 to ~884 lines. New sections added: trust stats bar, scrolling photo gallery, two-options comparison cards, how-it-works 4-step section, Lake Travis split section, transportation guide, party planning checklist, 15-FAQ expanded accordion. This is now the most content-rich hub page on the site.',
  wordCount: '5,042',
  hub: true,
  ssrNotes:
    'SSR content in pageContent.ts under "/bachelorette-party-austin". Added in March 2026: how-to-book steps, marina logistics, 4 additional FAQ entries, Lake Travis section, transportation guide. Word count grew significantly in that expansion. SSR layer must stay in sync with the React UI sections.',
  keyRules: [
    'This is a HUB page — all bachelorette blog posts link back here',
    'The luxury bachelorette page (/luxury-austin-bachelorette) must NOT be promoted from this page or any other page — it is not a destination',
    'Never reduce crawler word count below 5,000 without a documented replacement plan',
    'Glass policy: no glass beer bottles. Wine, champagne, spirits in bottles are fine if kept in cooler.',
    'Spray sunscreen is ALLOWED — apply at the rails. Never say spray sunscreen is banned.',
    'Party On Delivery must always link to https://partyondelivery.com when mentioned',
  ],
  sections: [
    {
      name: 'Hero Section',
      why: 'Full-bleed video hero with bachelorette-specific messaging. H1 targets "bachelorette party Austin" primary keyword. Two CTAs: pricing anchor and Xola booking. Video creates immediate excitement for the target audience.',
      seoRole: 'H1 is the single most important on-page SEO element. Must contain the primary keyword.',
    },
    {
      name: 'Trust Stats Bar',
      why: 'Added March 2026. Quick stats (15 years, 4.9 stars, X groups served) shown immediately below the hero. Reduces bounce rate by establishing credibility before any content is read.',
      seoRole: 'Social proof stats indexed by AI engines for authority signals.',
    },
    {
      name: 'Featured YouTube Video',
      why: 'YouTube embed of a full Disco Cruise highlight reel. Increases dwell time significantly. Bachelorette groups respond strongly to video — it pre-sells the vibe before any text.',
      seoRole: 'VideoObject schema injected by SSR. Higher dwell time is a behavioral ranking signal.',
    },
    {
      name: 'Video Showcase Grid',
      component: 'VideoShowcaseGrid',
      why: 'Four autoplay clips of the actual experience. Bachelorette groups are highly visual decision-makers — seeing real moments (dancing, confetti, singing along) is more persuasive than text.',
    },
    {
      name: 'Scrolling Photo Gallery',
      why: 'Added March 2026. Horizontal auto-scrolling gallery of real bachelorette party photos. Maintains visual engagement without requiring active clicking. Shows variety of party styles.',
      seoRole: 'Photo content adds page richness signals. Image alt text covers keyword territory.',
    },
    {
      name: 'Video Carousel',
      why: 'Additional horizontal-scroll video carousel. Multiple short clips from different angles and party moments.',
    },
    {
      name: 'Two Options Comparison',
      why: 'Added March 2026. Side-by-side comparison of ATX Disco Cruise vs Private Charter for bachelorette groups. Each card shows price, group size range, what is included, and who it is best for. Lets visitors self-select quickly.',
      seoRole: 'Comparison content is heavily indexed by AI engines for "which is better" queries.',
      notes: 'ATX Disco Cruise card: $85–$105/person all-in, 20–120 guests, multi-group setting. Private Charter card: from $200/hr, your group only, fully customizable.',
    },
    {
      name: 'How It Works — 4-Step Section',
      why: 'Added March 2026. Step-by-step booking and experience walkthrough. Reduces anxiety for first-time bookers. Covers: choose your date, book online, show up, party. Simple and direct.',
      seoRole: 'How-it-works content is one of the highest-value formats for AI Overview inclusion. Step-by-step logic is easy for AI to summarize and cite.',
    },
    {
      name: 'Why Lake Travis for Bachelorette',
      why: 'Added March 2026. Split section with photos explaining why Lake Travis specifically — weather, views, the marina, the vibe. Establishes geographic authority and differentiates from generic "boat party" searches.',
      seoRole: 'Geo-specific content strengthens local SEO and AI engine awareness of location relevance.',
    },
    {
      name: 'Early Quote Builder',
      component: 'QuoteBuilderSection',
      why: 'Mid-page quote widget placement catches mid-funnel visitors who are considering pricing but are not ready to scroll to the bottom.',
    },
    {
      name: 'Pricing / Packages',
      why: 'Detailed pricing for both options. ATX Disco Cruise: Fri/Sat slots with exact times and per-person prices. Private Charter: hourly rates by boat, 4-hour minimum. Transparent pricing is the #1 trust builder for this audience.',
      seoRole: 'Pricing content with specifics (exact dollar amounts, what is included) is heavily used by AI engines in answer generation.',
      notes: 'ATX Disco: Fri 12-4pm $95/pp, Sat 11am-3pm $105/pp, Sat 3:30-7:30pm $85/pp. Private: Day Tripper $200/hr (14 guests), Meeseeks $225/hr (30 guests), Clever Girl $250/hr (75 guests). DJ add-on $600.',
      warning: 'Keep in sync with pageContent.ts SSR layer',
    },
    {
      name: 'Cross-link: Combined Bach + Disco Block',
      why: 'Authority block linking to /combined-bachelor-bachelorette-austin and /atx-disco-cruise. Addresses the joint bach party scenario — the most common booking pattern for this audience.',
      seoRole: 'Bidirectional internal links between hub pages. Strengthens the entire topic cluster.',
    },
    {
      name: 'Amenities Section',
      why: 'Full list of what is included on both cruise types. DJ, captain, photographer (Disco only), BYOB, cooler, ice, sound system, disco balls, etc. Answers pre-booking questions before they are asked.',
      seoRole: 'Inclusion lists are directly quoted by AI engines in comparison and recommendation answers.',
      warning: 'Photographer is FREE on ATX Disco Cruise only. Private charters do NOT include a photographer.',
    },
    {
      name: 'Transportation Guide',
      why: 'Added March 2026. Directions to the marina, parking info, rideshare tips, where to meet. Marina address: 13993 FM 2769, Leander TX 78641. Reduces day-of confusion and no-shows.',
      seoRole: 'Location-specific logistics content is indexed by AI engines for "how to get to Lake Travis" style queries. Also strengthens local SEO.',
    },
    {
      name: 'Party Planning Checklist',
      component: 'PartyPlanningChecklist',
      why: 'Interactive checklist of things to bring, arrange, and confirm before the trip. Extremely high engagement — planners love a checklist. Also surfaces helpful information like Party On Delivery for snack delivery.',
      seoRole: 'Checklist-format content is frequently included in AI Overview "how to plan" answers.',
      notes: 'Party On Delivery link must always go to https://partyondelivery.com',
    },
    {
      name: 'Testimonials',
      why: 'Real reviews from bachelorette groups. Social proof at the decision stage. The target audience is highly peer-influenced — seeing reviews from similar groups is critical.',
    },
    {
      name: 'Quote Builder Section (Late)',
      component: 'QuoteBuilderSection',
      why: 'Third placement of the quote widget, positioned after testimonials — catching visitors who needed social proof before committing to a quote.',
    },
    {
      name: 'Blog Cross-Links Section',
      why: 'Links to all bachelorette-related blog posts. Demonstrates topical depth, which is an SEO authority signal. Keeps visitors discovering more content.',
      seoRole: 'Hub page linking to blog posts completes the content cluster model.',
    },
    {
      name: 'FAQ Section (15 FAQs)',
      why: 'Comprehensive FAQ added/expanded March 2026. Covers BYOB policy, glass rules, spray sunscreen, group size, pricing, booking lead time, parking, marina address, rain policy, photography, and more.',
      seoRole: 'FAQPage schema injected by SSR. Primary source for AI Overview answers about bachelorette party boats in Austin.',
      notes: 'After adding FAQs, update attached_assets/schema_data/bachelorette-party.jsonld',
    },
    {
      name: 'Compact Dark Bottom CTA',
      why: 'Final conversion CTA for visitors who read the entire page. Dark background for contrast and urgency.',
    },
    {
      name: 'Internal Links Strip',
      why: 'Bottom-of-page links to all major related pages. Distributes link equity and keeps visitors in the funnel.',
      seoRole: 'Sitewide internal link distribution. Crawl budget optimization.',
    },
  ],
};

const ATX_DISCO_PAGE: PageDoc = {
  route: '/atx-disco-cruise',
  file: 'client/src/pages/ATXDiscoCruise.tsx',
  title: 'ATX Disco Cruise — Hub Page',
  description:
    'One of the three primary hub pages. The ATX Disco Cruise is Premier Party Cruises\' signature product: a public multi-group all-inclusive party cruise on Lake Travis running March–October. The page targets searches like "ATX Disco Cruise," "Austin disco cruise," and "all-inclusive party boat Austin." It is the only multi-group all-inclusive bachelor/bachelorette cruise in the U.S. — a genuine differentiator that the page leans into heavily.',
  wordCount: '~4,103',
  hub: true,
  ssrNotes:
    'SSR content in pageContent.ts under "/atx-disco-cruise". Covers: full cruise description, what is included in every ticket, all three time slots with exact prices, 4-hour experience timeline, why this is unique in the U.S., marina logistics, parking, BYOB rules, FAQ section. Added April 2026: featured YouTube section. VideoObject schema injected by SSR. Word count grew after the YouTube section addition.',
  keyRules: [
    'This is a HUB page — all ATX Disco blog posts must link back here',
    'All prices are all-in (tax + gratuity included): Fri 12-4pm $95/person, Sat 11am-3pm $105/person, Sat 3:30-7:30pm $85/person',
    'Photographer is FREE and included in every ticket — never say it costs extra on this page',
    'DJ is included — it is NOT a $600 add-on on this page (the $600 DJ fee is only for private charters)',
    'Season is March through October only — never imply year-round availability',
    'Multi-group format: guests share the Clever Girl boat with other bachelor/bachelorette parties — maximum 120 guests across all groups; each group gets a private bin and cooler',
    'Party On Delivery should be mentioned in the BYOB section — it is currently in the SSR layer but not prominently in the React UI',
  ],
  sections: [
    {
      name: 'Hero Section',
      why: 'Full-bleed video hero with the ATX Disco Cruise pitch. H1 targets the primary brand keyword. Motion animation (Framer Motion) on the hero for visual impact. Two CTAs: book now (Xola) and pricing anchor.',
      seoRole: 'H1 is the most critical on-page SEO element. Must contain "ATX Disco Cruise" exactly.',
      notes: 'Uses motion.section from LazyMotionProvider. Video background with fallback poster image.',
    },
    {
      name: 'Scrolling Photo Gallery — Below Hero',
      why: 'Immediately shows real party photos below the fold. Captures visual attention before any text. Establishes the vibe quickly for decision-makers who scroll before reading.',
      seoRole: 'Photo content adds visual richness signals. Early placement improves dwell time.',
    },
    {
      name: 'Featured YouTube Video',
      why: 'Added April 2026. Full ATX Disco Cruise highlight reel embedded from YouTube. Increases average session duration significantly — video viewers are 3× more likely to book. Also demonstrates real social proof via YouTube view counts.',
      seoRole: 'VideoObject JSON-LD schema injected by SSR. Dwell time from video watching is a behavioral ranking signal.',
    },
    {
      name: 'Video Showcase Grid',
      component: 'VideoShowcaseGrid',
      why: 'Four autoplay short clips of key moments: DJ set, dancing, lily pad floats, crowd energy. Covers different visual appeal points that resonate with different visitors.',
    },
    {
      name: 'ATX Disco Cruise Video Carousel',
      why: 'Horizontal scrollable video carousel with more clips. Gives visitors a comprehensive visual tour of the experience before they commit to reading.',
    },
    {
      name: 'Pricing — Friday/Saturday Time Slots',
      why: 'Moved to top of content (above the fold on desktop). Pricing transparency is the #1 conversion driver for this audience. Shows all three slots with exact times, prices, and what is included. Party type selector tabs let groups see bachelor vs. bachelorette vs. combined inclusions.',
      seoRole: 'Exact pricing with context is heavily indexed by AI engines. Specific dollar amounts and time slots appear in AI Overview answers.',
      notes: 'Fri $95/pp, Sat 11am $105/pp (BEST badge), Sat 3:30pm $85/pp (FUN! badge). Add-on packages shown below: Mimosa Cooler, Groom/Bride Sparkle packages, etc. All prices are all-in.',
      warning: 'DJ and photographer are INCLUDED on ATX Disco Cruise — do not list them as add-ons here',
    },
    {
      name: 'Quote Builder Section',
      component: 'QuoteBuilderSection',
      why: 'Placed immediately after pricing to capture visitors who are ready to get a specific quote. High-intent visitors should not have to hunt for the quote tool.',
    },
    {
      name: 'Experience — 4-Hour Timeline',
      why: 'Step-by-step breakdown of what happens during the 4 hours. Covers boarding, DJ set start, float time, dancing peak, departure. Reduces anxiety for first-time bookers by making the format concrete.',
      seoRole: 'How-it-works timeline format is heavily weighted by AI engines for "what is the ATX Disco Cruise like" queries.',
    },
    {
      name: 'Scrolling Photo Gallery — Combined Parties',
      why: 'Second gallery showing combined bachelor/bachelorette group photos specifically. Targets the most common booking scenario: mixed groups celebrating together.',
    },
    {
      name: 'Why Book Section',
      why: 'Bullet-style differentiation section. Why this over a private charter, why this over a bar crawl, why Premier Party Cruises specifically. Answers the comparison question directly.',
      seoRole: 'Covers "ATX Disco Cruise vs private charter" comparison queries.',
    },
    {
      name: 'Availability / Booking Section',
      why: 'Live Xola booking widget. Let visitors see open dates and book directly without leaving the page. Re-initialized on every navigation to prevent stale state.',
      seoRole: 'Real availability data signals active business operations to search engines.',
    },
    {
      name: 'What\'s Included Section',
      why: 'Comprehensive inclusion list for every ticket. DJ, photographer, unicorn float, lily pads, private cooler with ice, water stations, koozies, bubble wands, disco ball necklace, etc. Answers the "what exactly do I get" question definitively.',
      seoRole: 'Inclusion lists are directly quoted by AI engines. Specific items (unicorn float, "14 disco balls," lily pads) are unique differentiators worth preserving exactly.',
    },
    {
      name: 'Why Choose Premier — Trust Signals',
      why: '15 years in business, 4.9-star rating, perfect safety record, only all-inclusive multi-group cruise in the U.S. Positions Premier Party Cruises as the clear authority choice.',
      seoRole: 'E-E-A-T signals. The "only in the U.S." claim is a genuine differentiator worth stating explicitly.',
    },
    {
      name: 'Photo Gallery',
      why: 'Full AnimatedPhotoGallery showing verified ATX Disco Cruise party photos. Visual evidence that the experience is real and worth booking.',
      notes: 'Mislabeled / empty-boat photos excluded.',
    },
    {
      name: 'Guarantee Section',
      why: 'Satisfaction guarantee / risk reduction messaging. Removes the last objection for fence-sitters. The guarantee framing (what happens if weather cancels, what if you are not happy) reduces booking friction.',
    },
    {
      name: 'Testimonials',
      why: 'Real reviews from ATX Disco Cruise guests. Social proof at the decision stage.',
    },
    {
      name: 'Disco Cruise vs. Private Charter Comparison Table',
      why: 'Bottom-of-page comparison table for visitors still deciding between the two products. Helps them self-qualify and links to the private cruises page. Placed at the bottom to not distract from the primary conversion path.',
      seoRole: 'Comparison content is indexed by AI engines for "ATX Disco Cruise vs private charter" queries.',
    },
    {
      name: 'Compact Bottom CTA',
      why: 'Final dark-background CTA section for visitors who read the whole page.',
    },
    {
      name: 'Internal Links Strip',
      why: 'Sitewide link distribution. Links to hub pages and related blog content.',
      seoRole: 'Crawl budget and internal PageRank distribution.',
    },
  ],
};

const PRIVATE_CRUISES_PAGE: PageDoc = {
  route: '/private-cruises',
  file: 'client/src/pages/PrivateCruises.tsx',
  title: 'Private Cruises — Exclusive Charter Page',
  description:
    'The private charter landing page. Targets groups who want the entire boat to themselves — no sharing with other parties. This page covers all three boats (Day Tripper, Meeseeks/The Irony, Clever Girl), all three package tiers (Standard, Essentials, Ultimate), day-of-week pricing, and available add-ons. Unlike the hub pages, this is a supporting page that primarily serves people already deep in the research phase — it needs to close the deal with pricing transparency and trust signals.',
  wordCount: '~2,800',
  hub: false,
  ssrNotes:
    'SSR content in pageContent.ts under "/private-cruises". Expanded March 2026. Covers fleet details, pricing by boat and day, package comparison, add-ons, what is included, marina logistics, corporate ROI framing, FAQs. The page also has two dedicated SEO sections in the React UI (not just SSR) that cover Austin party cruises for private events and Lake Travis planning guidance.',
  keyRules: [
    'DJ is NOT included on private charters — it is a $600 flat add-on. Never say DJ is included.',
    'Photographer is NOT included on private charters — it is a $600 flat add-on.',
    'Pricing varies by day of week: Saturday is premium (~55% above Mon–Thu). Always specify the day when quoting.',
    'The displayed "from" prices are Mon–Thu base rates: Day Tripper from $200/hr, Meeseeks from $225/hr, Clever Girl from $250/hr.',
    '4-hour minimum on all private charters — never imply shorter bookings are possible.',
    'Party On Delivery should be mentioned in BYOB / what to bring sections — currently in SSR but not prominently in React UI.',
    '"Meeseeks" must always be spelled correctly — not "Me Seeks," "MeSeeks," etc.',
  ],
  sections: [
    {
      name: 'Table of Contents',
      component: 'TableOfContents',
      why: 'Sticky sidebar TOC for a long page. Lets visitors jump to Fleet, Pricing, Availability, FAQs without scrolling.',
      seoRole: 'Signals rich page structure to search engines. May appear as jump links in search results.',
    },
    {
      name: 'Hero Section',
      why: 'Video hero with private charter messaging. H1 targets "private boat rental Austin / Lake Travis" queries. Hero video is a local mp4 file. Two CTAs: scroll to fleet and get a quote.',
      seoRole: 'H1 with primary keyword is critical. Video background adds visual richness signals.',
    },
    {
      name: 'Trust Badges',
      why: 'Quick credibility strip (15 years, 4.9 stars, safety record). Same format as the home page trust strip. Builds confidence before visitors see pricing.',
    },
    {
      name: 'Fleet Section',
      component: 'FleetSection',
      why: 'Reusable component showing all three boats with photos, capacity, and brief descriptions. The first decision a visitor makes is which boat fits their group size.',
      notes: 'Day Tripper (14 guests), Meeseeks/The Irony (30 guests, 2 identical boats), Clever Girl (75 guests flagship). All three shown with photos and capacity at a glance.',
    },
    {
      name: 'Quote Builder Section',
      component: 'QuoteBuilderSection',
      why: 'Placed early so high-intent visitors who already know what they want can go straight to pricing.',
    },
    {
      name: 'Experience Section',
      why: 'Describes what the private charter experience is actually like — arriving at the marina, boarding, the lake, sunsets, music, swimming off the lily pad. Emotional pre-selling before the pricing section.',
      seoRole: 'Experience description adds topical depth and long-form content signals.',
    },
    {
      name: 'Pricing Section — Tabbed by Fleet / Packages',
      why: 'Two-tab pricing display: Fleet tab shows per-boat pricing with day-of-week rate cards; Packages tab shows Standard vs. Essentials vs. Ultimate comparison. Most complex pricing on the site — the tab structure prevents visual overwhelm.',
      seoRole: 'Exact pricing details (by boat, by day, by package) are directly used by AI engines in comparison answers.',
      notes: 'Mon-Thu: $200/$225/$250/hr. Friday: $225/$250/$275/hr. Saturday premium: $350/$375/$400/hr. Sunday: $250/$275/$300/hr. All 4-hour minimum. Crew fees for 26-30 and 51-75 guests.',
      warning: 'Saturday rates are significantly different from Mon–Thu — always include the day context when quoting',
    },
    {
      name: 'Availability Section',
      why: 'Calendar availability view for private charters. Shows blocked dates and open slots. Lets visitors plan around their preferred dates.',
    },
    {
      name: 'SEO Section 1: Austin Party Cruises for Private Events',
      why: 'Dedicated long-form SEO content section covering use cases: birthday parties, bachelorette parties, corporate events, anniversary cruises, family reunions. Added to give the page enough topical depth to compete for long-tail private event searches.',
      seoRole: 'Covers multiple event-type keyword variations on one page without creating separate pages for each.',
    },
    {
      name: 'SEO Section 2: Planning Your Lake Travis Party Boat',
      why: 'Second long-form section covering the planning process: booking timeline, what to bring, alcohol logistics (BYOB + Party On Delivery), what to expect at the marina. Practical information that builds trust and reduces booking friction.',
      seoRole: 'Long-form planning content is indexed by AI engines for "how to plan a private boat rental Austin" queries.',
    },
    {
      name: 'What\'s Included / Benefits',
      why: 'Full inclusion list for private charters: captain, crew, premium Bluetooth speaker, coolers, restrooms. Differs from ATX Disco Cruise inclusions — no DJ, no photographer, no disco balls by default.',
      warning: 'DJ and photographer are add-ons here — NEVER copy the ATX Disco Cruise inclusions to this section',
    },
    {
      name: 'Features / Customization',
      why: 'Shows what groups can customize on a private charter: music choice (bring your own playlist), decorations, timing, catering, activities. The private charter value proposition is control — this section delivers that message.',
    },
    {
      name: 'Corporate ROI Section',
      why: 'Dedicated section with ROI comparison cards aimed at corporate decision-makers. Compares cost of a 4-hour private charter vs. a conference room rental vs. a restaurant buyout. Makes the business case for corporate team building on water.',
      seoRole: 'Covers "corporate boat rental Austin" and "team building Lake Travis" queries.',
    },
    {
      name: 'Why Choose Us',
      why: 'Trust signals specific to private charter customers: 15 years of experience, custom event execution, dedicated coordinator, perfect safety record.',
    },
    {
      name: 'Gallery Section',
      why: 'Photo gallery of private charter events across different occasions (birthday, corporate, bachelorette). Shows the range of what a private charter can look like.',
    },
    {
      name: 'Testimonials',
      why: 'Reviews from private charter customers specifically. Different from ATX Disco Cruise reviews — speaks to the exclusive, customized experience.',
    },
    {
      name: 'Planning Guides Section',
      why: 'Links to related blog posts and guides. Keeps visitors engaged and demonstrates topical depth.',
      seoRole: 'Internal links from a supporting page distribute authority up to the hub pages.',
    },
    {
      name: 'FAQ Section',
      why: 'Private charter FAQs: cancellation policy, what happens in rain, minimum guests, deposit requirements, alcohol policy, what to bring.',
      notes: 'After adding FAQs here, update attached_assets/schema_data/private-cruises.jsonld',
    },
    {
      name: 'Bottom SEO Content Section',
      why: 'Final long-form SEO text block covering: Austin private boat charter services overview, occasion types, booking CTA. Placed at the very bottom to maintain clean visual design while adding crawler-visible content.',
      seoRole: 'Additional keyword coverage without cluttering the user-facing UI.',
    },
  ],
};

// ─── CLAUDE HANDOFF TAB ──────────────────────────────────────────────────────

function ClaudeHandoffTab() {

  const techStack = [
    { layer: 'Frontend Framework', value: 'React 18 + TypeScript + Vite 5' },
    { layer: 'Routing', value: 'Wouter (lightweight React router — not React Router)' },
    { layer: 'Styling', value: 'Tailwind CSS + shadcn/ui component library' },
    { layer: 'State / Data fetching', value: 'TanStack Query v5 (React Query) — object form only: useQuery({ queryKey: [...] })' },
    { layer: 'Forms', value: 'react-hook-form + zodResolver + shadcn Form components' },
    { layer: 'Animations', value: 'Framer Motion via LazyMotionProvider (lazy-loaded to reduce TBT)' },
    { layer: 'Backend', value: 'Express.js + Node.js (TypeScript, compiled with tsx)' },
    { layer: 'Database', value: 'PostgreSQL via Drizzle ORM — schema in shared/schema.ts' },
    { layer: 'Auth', value: 'Passport.js (local strategy) + express-session + connect-pg-simple' },
    { layer: 'File uploads', value: 'Multer — media uploads go to object storage (Replit Object Storage)' },
    { layer: 'Email', value: 'Mailgun (via MAILGUN_API_KEY env secret)' },
    { layer: 'SMS / CRM', value: 'GoHighLevel (webhook-based, env secret GHL_WEBHOOK_URL)' },
    { layer: 'Payments', value: 'Stripe (env secret STRIPE_SECRET_KEY)' },
    { layer: 'Bookings', value: 'Xola widget (embedded iframe, re-initialized on every route change)' },
    { layer: 'AI / Chat', value: 'OpenRouter API (env secret OPENROUTER_API_KEY) — proxied through /api/chat' },
    { layer: 'Object Storage', value: 'Replit Object Storage bucket — media library uploads stored here' },
    { layer: 'Hosting', value: 'Replit deployment (replit.app domain + custom domain premierpartycruises.com)' },
    { layer: 'Repo', value: 'GitHub: https://github.com/premieratx/CruiseConcierge (main branch)' },
  ];

  const fileMap = [
    { path: 'client/src/App.tsx', role: 'All client routes defined here. Add lazy imports + <Route> for every new page.' },
    { path: 'client/src/pages/', role: 'All page components. Public pages in root, admin pages in /admin/, blog posts in /pages/blog/ and /pages/' },
    { path: 'client/src/components/', role: 'Shared components. SEO-critical: AnimatedPhotoGallery, QuoteBuilderSection, FleetSection, TableOfContents, StickyCTA, VideoShowcaseGrid.' },
    { path: 'shared/schema.ts', role: 'Drizzle ORM schema — source of truth for all DB types. Run npm run db:push after changes.' },
    { path: 'shared/constants.ts', role: 'All pricing constants: DISCO_TIME_SLOTS, HOURLY_RATES, PACKAGE_FLAT_FEES, CREW_FEES, ADDON_FEES. Source of truth for pricing.' },
    { path: 'shared/contact.ts', role: 'CONTACT_INFO (phone, email, hrefs) and BUSINESS_ADDRESS. Always import from here — never hardcode contact details except marina address.' },
    { path: 'server/routes.ts', role: 'All API endpoints (~113 routes). Admin routes gated with requireAdmin middleware.' },
    { path: 'server/storage.ts', role: 'IStorage interface + MemStorage / DatabaseStorage. All DB reads/writes go through this layer.' },
    { path: 'server/ssr/pageContent.ts', role: 'CRITICAL SEO FILE. PAGE_CONTENT object with SSR text for every major page (29+ entries). This is what crawlers and AI engines see. ~9,000+ lines.' },
    { path: 'server/ssr/renderer.ts', role: 'SSR rendering pipeline. Injects PAGE_CONTENT as .ssr-content sibling to #root. Also generates SSR nav, footer, and related links. Title fallback logic lives here.' },
    { path: 'server/schemaLoader.ts', role: 'Loads all JSON-LD schema files from attached_assets/schema_data/ and injects them into SSR HTML. Never add schema from React components.' },
    { path: 'attached_assets/schema_data/', role: '41+ JSON-LD schema files. One per page. FAQPage, Article, Organization, LocalBusiness, VideoObject, etc.' },
    { path: 'public/sitemap.xml', role: '185 URL sitemap. After edits always verify: grep -c "^  <url>$" matches grep -c "</url>".' },
    { path: 'server/indexnow.ts', role: 'IndexNow integration for instant Bing indexing. Admin endpoints: POST /api/admin/indexnow/submit and /submit-sitemap.' },
    { path: 'scripts/pre-deploy-seo-check.ts', role: 'Run before every deployment: npx tsx scripts/pre-deploy-seo-check.ts. Combines SEO audit + schema validation.' },
    { path: 'scripts/ssr-health-check.ts', role: 'Validates 25 critical routes for soft 404 prevention.' },
    { path: 'index.css / tailwind.config.ts', role: 'Brand colors defined as CSS custom properties. Color rule: navy/blue/amber/slate/gray only. No purple or pink unless pre-existing design.' },
  ];

  const adminPages = [
    {
      route: '/admin',
      file: 'Dashboard (inline in App.tsx)',
      status: 'complete',
      description: 'Main admin dashboard. Shows lead count, booking stats, quick links to all admin tools. Requires login.',
    },
    {
      route: '/admin/blogs',
      file: 'BlogManagement.tsx (1,690 lines)',
      status: 'complete',
      description: 'Full blog CMS. Tabs: Posts list, Categories, Tags, Authors, Import (CSV/WordPress). Create/edit/publish/delete posts. Supports WordPress XML import and batch CSV import. Blog posts stored in PostgreSQL.',
    },
    {
      route: '/admin/blogs/posts/new + /admin/blogs/posts/:id/edit',
      file: 'BlogPostEditor.tsx (786 lines)',
      status: 'complete',
      description: 'Full rich-text blog post editor with title, slug, content (textarea), SEO metadata, featured image, category/tag assignment, author assignment, and publish/draft controls.',
    },
    {
      route: '/admin/blog-formatter',
      file: 'BlogFormatter.tsx (374 lines)',
      status: 'complete',
      description: 'Paste raw blog text → AI formats it into proper HTML blog structure with headings, paragraphs, and SEO metadata. Useful for converting external copy into blog post format.',
    },
    {
      route: '/admin/blogs/batch',
      file: 'BlogBatchImporter.tsx (648 lines)',
      status: 'complete',
      description: 'Paste multiple blog posts at once in a structured format and import them in bulk. Designed for importing pre-written content at scale.',
    },
    {
      route: '/admin/seo',
      file: 'SEOManagement.tsx (1,288 lines)',
      status: 'complete',
      description: 'SEO dashboard with 6 tabs: Overview (word count stats per page), Pages (edit meta titles/descriptions per route), AI Optimizer (analyze + rewrite page SEO with AI), Keyword Research (SEMrush-style keyword data), Competitor Analysis, and Settings. Pages tab writes directly to the page metadata table.',
    },
    {
      route: '/admin/gallery',
      file: 'GalleryManager.tsx (592 lines)',
      status: 'complete',
      description: 'Drag-and-drop photo gallery manager for the public AnimatedPhotoGallery component. Upload images (stored in object storage), reorder via DnD, edit alt text and captions, delete images. Changes reflect site-wide in the gallery section.',
    },
    {
      route: '/admin/media',
      file: 'MediaLibrary.tsx (996 lines)',
      status: 'complete',
      description: 'Full media asset library. Upload photos/videos individually or in bulk (up to 50 at once), view/filter all uploaded assets, edit metadata (alt text, caption, tags), delete, and publish to the site. AI-powered photo analysis (describe image content using OpenAI Vision). Backed by object storage.',
    },
    {
      route: '/admin/pricing',
      file: 'Pricing.tsx (1,469 lines)',
      status: 'complete',
      description: 'Visual pricing dashboard pulling from shared/constants.ts. Shows all disco cruise slots, private charter rates by boat and day, package upgrades, add-on fees, deposit policy. Read-only display — pricing is controlled by constants.ts, not the DB.',
    },
    {
      route: '/admin/pricing-rules',
      file: 'PricingRules.tsx (372 lines)',
      status: 'complete',
      description: 'Server-side pricing validation rules editor. Lets admins configure which add-ons are required or optional, minimum booking requirements, and override rules. These rules are enforced server-side in serverPricing.ts.',
    },
    {
      route: '/admin/inventory',
      file: 'InventoryManagement.tsx (828 lines)',
      status: 'complete',
      description: 'Availability / inventory management. Manage blocked dates, custom pricing overrides per date range, capacity limits per boat per slot. Integrates with Google Sheets for real-time availability display on the public site.',
    },
    {
      route: '/admin/faq-review',
      file: 'FAQReview.tsx (1,336 lines)',
      status: 'complete',
      description: 'Read-only reference of all FAQs across the entire site, aggregated from SSR pageContent.ts, schema data files, and React page components. Searchable by keyword. Useful for auditing FAQ coverage and spotting outdated answers.',
    },
    {
      route: '/admin/ai-assistant',
      file: 'AIAssistant.tsx (627 lines)',
      status: 'complete',
      description: 'AI chat assistant for admin use. Session-based conversations stored in DB. Uses OpenRouter to route between models. Can answer questions about the site, generate copy, and help with content decisions. Sessions are persistent and named.',
    },
    {
      route: '/admin/agent-chat',
      file: 'AgentChat.tsx (615 lines)',
      status: 'complete',
      description: 'More advanced agentic AI interface. Supports tool use — the AI can call defined tools (analyze page, fetch pricing, check availability) and run multi-step tasks. Distinct from AIAssistant which is pure conversation.',
    },
    {
      route: '/admin/business-summary',
      file: 'BusinessSummary.tsx (585 lines)',
      status: 'complete',
      description: 'Business reference page. Shows all boats with capacity/pricing, all event types with their landing pages, party types list, and a searchable quick-reference for admin staff. Pulls from shared/constants.ts.',
    },
    {
      route: '/admin/site-summary',
      file: 'SiteSummary.tsx (this page)',
      status: 'complete',
      description: 'This page. Documents every page section, SEO goals, pricing rules, and full technical handoff context for Claude or any developer taking over the project.',
    },
    {
      route: '/admin/blog-conversion',
      file: 'BlogConversionTracker.tsx (242 lines)',
      status: 'partial',
      description: 'Tracks which blog posts are converting to leads/bookings. Shows blog slug → lead count table. Currently reads from the leads table and joins on source URL. Basic implementation — could be enhanced with time-series charts and per-post attribution.',
    },
    {
      route: '/admin/content-blocks (via ContentBlocksManagement)',
      file: 'ContentBlocksManagement.tsx (279 lines)',
      status: 'partial',
      description: 'Per-page content block editor. Intended to let admins edit specific text blocks on pages without touching code. Currently shows the block editing UI and settings. Analytics tab placeholder reads "Analytics features coming soon." Not fully integrated with the live pages — the GlobalInlineEditor component provides a parallel inline editing approach.',
    },
    {
      route: 'N/A — component only',
      file: 'GlobalInlineEditor.tsx (13 lines)',
      status: 'stub',
      description: 'Meant to enable site-wide inline text editing for admins viewing the public site. Currently a minimal stub — sets up the hook but has no real editing UI. Would need significant work to become functional. Lazy-loaded on admin routes only to prevent TBT impact.',
    },
    {
      route: '/admin/uptime (no route registered)',
      file: 'UptimeMonitoring.tsx (311 lines)',
      status: 'complete',
      description: 'Uptime monitoring dashboard. Shows status of critical site URLs, response times, and SMS alert configuration. Backend: /api/admin/uptime/* routes. SMS alerts use GoHighLevel. No public route registered in App.tsx — access via direct URL.',
    },
    {
      route: '/admin/page-status (no route registered)',
      file: 'PageStatus.tsx (481 lines)',
      status: 'complete',
      description: 'Page health checker. Tests any URL for HTTP status, response time, and content. Can bulk-test all sitemap URLs. Results stored in DB. No public route registered in App.tsx — access via direct URL.',
    },
  ];

  const githubWorkflow = [
    'The Replit project is connected to GitHub at: https://github.com/premieratx/CruiseConcierge (main branch).',
    'Replit auto-commits and pushes to GitHub at the end of each agent loop (checkpoint commits).',
    'Claude (claude.ai or Claude Code) can clone the repo, make changes, push to the main branch, and Replit will reflect those changes after a git pull inside Replit or after the next Replit agent session starts.',
    'The correct workflow for Claude-side design edits: (1) Clone repo locally or open in Claude Code, (2) Make changes, (3) git add + git commit + git push to main, (4) In Replit, git pull in the shell or trigger a new agent session which will sync automatically.',
    'After pushing from Claude, run npm run build in Replit to compile and test, then restart_workflow to apply.',
    'Environment secrets (Stripe, OpenRouter, Mailgun, GoHighLevel, etc.) live only in Replit — they are NOT in the GitHub repo. Any new env vars needed must be added to Replit secrets.',
    'The GITHUB_PAT secret is available in Replit for authenticated git operations if needed.',
  ];

  const designGuidelines = [
    { rule: 'Color palette', detail: 'Navy (#0f172a / brand-navy), amber/yellow (brand-yellow), slate grays, white. NO purple, NO pink unless pre-existing in a specific component. These are the only brand-approved colors.' },
    { rule: 'Typography', detail: 'Headings use "heading-unbounded" class (Unbounded font). Body uses system sans-serif. Never change font families without flagging it.' },
    { rule: 'Component library', detail: 'shadcn/ui only. Do not add new UI libraries. Use existing Tailwind utilities. Icons: lucide-react for UI icons, react-icons/si for logos.' },
    { rule: 'No purple/pink', detail: 'The site targets bachelor AND bachelorette audiences. Using pink would alienate the bachelor audience. Navy and amber are gender-neutral and on-brand.' },
    { rule: 'Mobile-first', detail: 'All layouts must be responsive. Use sm:/md:/lg: breakpoints. Test on mobile widths — most traffic is mobile.' },
    { rule: 'Performance', detail: 'Lazy-load heavy components (videos, heavy galleries) with React.lazy(). Never lazy-load above-fold or conversion-critical components (QuoteBuilder, hero). Use LazyImage for all images.' },
    { rule: 'No SSR schema from React', detail: 'Never add <script type="application/ld+json"> to React components. All JSON-LD lives in attached_assets/schema_data/ and is injected by the SSR layer.' },
    { rule: 'Hero videos', detail: 'Always include a poster image fallback on <video> tags. Video should not block LCP. Use autoPlay muted loop playsInline.' },
    { rule: 'CTA buttons', detail: 'Primary: "Check Availability" → Xola booking widget. Secondary: "Get a Quote" → quote builder. Keep these labels consistent site-wide.' },
    { rule: 'data-editable attributes', detail: 'Text elements on key pages have data-editable and data-editable-id attributes for the inline editor system. Maintain these when editing page copy.' },
  ];

  const criticalNeverDo = [
    'Never edit package.json scripts.',
    'Never edit vite.config.ts or server/vite.ts (Vite setup is pre-configured).',
    'Never edit drizzle.config.ts.',
    'Never change primary key column types in schema.ts (serial ↔ varchar) — this breaks the DB.',
    'Never add JSON-LD schema to React components — use attached_assets/schema_data/ files only.',
    'Never hardcode the phone number anywhere — always use CONTACT_INFO.phoneFormatted / .phoneHref from shared/contact.ts.',
    'Never link to /luxury-austin-bachelorette from hub pages, nav, or footer.',
    'Never write the DJ price as a range — it is always "$600 flat".',
    'Never say "no spray sunscreen" — spray sunscreen IS allowed (apply at the rails).',
    'Never say glass containers are banned outright — glass beer bottles are banned; wine, champagne, spirits in bottles are fine if kept in the cooler.',
    'Never remove content from a ranking page without replacing the SEO keyword coverage in pageContent.ts.',
    'Never commit real secret keys or API keys to the GitHub repo.',
    'After any sitemap edit: verify opening <url> count = closing </url> count.',
    'Run npx tsx scripts/pre-deploy-seo-check.ts before deploying to production.',
  ];

  const statusColor = (s: string) =>
    s === 'complete' ? 'bg-green-100 text-green-800 border-green-200' :
    s === 'partial' ? 'bg-amber-100 text-amber-800 border-amber-200' :
    'bg-gray-100 text-gray-500 border-gray-200';

  return (
    <div className="space-y-6">

      {/* Intro */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
          <Info className="h-4 w-4" /> Context for Claude / External Developers
        </h2>
        <p className="text-sm text-blue-800 leading-relaxed">
          This tab is written as a handoff document. It covers the complete technical architecture, every admin tool built, what is finished vs. incomplete, design rules, and the GitHub workflow. Use this alongside the SEO Strategy and Pricing Reference tabs to understand the full project before making any changes.
        </p>
      </div>

      {/* Quick-Start Facts */}
      <Card className="border-gray-800">
        <CardHeader className="bg-gray-900 rounded-t-lg">
          <CardTitle className="text-base flex items-center gap-2 text-white">
            <Star className="h-4 w-4 text-amber-400" />
            Quick-Reference Facts — Read Before Touching Anything
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'Phone (ONLY number used site-wide)', value: '(512) 488-5892', code: 'tel:+15124885892', critical: true },
              { label: 'Business email', value: 'clientservices@premierpartycruises.com', code: null, critical: false },
              { label: 'Marina address (boarding location)', value: '13993 FM 2769, Leander, TX 78641 — Anderson Mill Marina', code: null, critical: true },
              { label: 'CONTACT_INFO import', value: 'Use CONTACT_INFO.phoneFormatted / .phoneHref / .email / .emailHref — never hardcode. EXCEPTION: marina address is NOT in CONTACT_INFO — hardcode it.', code: 'shared/contact.ts', critical: true },
              { label: 'Business address (billing only — NOT marina)', value: 'Georgetown, TX — DO NOT use as a location for customers', code: null, critical: true },
              { label: 'Luxury bachelorette page', value: 'Exists at /luxury-austin-bachelorette but must NEVER be linked from nav, footer, hub pages, or blogs', code: null, critical: true },
            ].map(f => (
              <div key={f.label} className={`rounded-lg p-3 border ${f.critical ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                <p className="text-xs font-semibold text-gray-700 mb-1">{f.label}</p>
                <p className="text-xs text-gray-800 font-mono leading-relaxed">{f.value}</p>
                {f.code && <code className="text-xs bg-white border border-gray-200 px-1.5 py-0.5 rounded mt-1 inline-block">{f.code}</code>}
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Environment secrets — names only (values live in Replit, never in the repo):</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {[
                { name: 'STRIPE_SECRET_KEY', use: 'Payment processing' },
                { name: 'OPENROUTER_API_KEY', use: 'AI chat (proxied via /api/chat)' },
                { name: 'MAILGUN_API_KEY', use: 'Email delivery' },
                { name: 'GHL_WEBHOOK_URL', use: 'GoHighLevel CRM / SMS' },
                { name: 'DATABASE_URL', use: 'PostgreSQL connection string' },
                { name: 'SESSION_SECRET', use: 'Express session encryption' },
                { name: 'GOOGLE_SHEETS_API_KEY', use: 'Availability calendar' },
                { name: 'GITHUB_PAT', use: 'Authenticated git operations' },
                { name: 'INDEXNOW_KEY', use: 'Bing IndexNow instant indexing' },
              ].map(s => (
                <div key={s.name} className="bg-gray-900 rounded px-2 py-1.5">
                  <code className="text-xs text-green-400 block">{s.name}</code>
                  <span className="text-xs text-gray-400">{s.use}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            <strong>File naming quirk — IMPORTANT:</strong> In the ATX Disco content cluster, two blog component filenames are misleading. <code className="bg-white px-1 py-0.5 rounded">BestBachelorPartyBoatAustin.tsx</code> actually contains the <em>cost breakdown</em> content, and <code className="bg-white px-1 py-0.5 rounded">WhatYouGetForMoneyPartyBoat.tsx</code> actually contains the <em>bachelor boat guide</em> content. The import lines in <code className="bg-white px-1 py-0.5 rounded">App.tsx</code> are intentionally swapped to serve the correct content at the correct routes. Do not "fix" this swap — it is deliberate and was done to avoid a Vite HMR issue. Do not rename the files without updating App.tsx.
          </div>
        </CardContent>
      </Card>

      {/* GitHub Workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-700" />
            GitHub ↔ Replit Workflow
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600 mb-3">
            The project lives in both GitHub and Replit simultaneously. Here is how changes flow between them:
          </p>
          <ul className="space-y-2">
            {githubWorkflow.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="text-blue-500 font-bold shrink-0">{i + 1}.</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 bg-gray-900 rounded-lg p-3 font-mono text-xs text-green-400 space-y-1">
            <div># Clone the repo (Claude-side)</div>
            <div>git clone https://github.com/premieratx/CruiseConcierge.git</div>
            <div className="mt-1"># After making changes</div>
            <div>git add . && git commit -m "description" && git push origin main</div>
            <div className="mt-1"># In Replit shell to pull changes</div>
            <div>git pull origin main && npm run build</div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Layout className="h-4 w-4 text-indigo-600" />
            Tech Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
            {techStack.map(row => (
              <div key={row.layer} className="px-4 py-2.5 bg-white flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                <span className="text-xs font-semibold text-gray-500 w-44 shrink-0">{row.layer}</span>
                <span className="text-xs text-gray-800">{row.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key File Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-purple-600" />
            Key Files — What Lives Where
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
            {fileMap.map(row => (
              <div key={row.path} className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                <code className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded shrink-0 self-start">{row.path}</code>
                <span className="text-xs text-gray-700 leading-relaxed">{row.role}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SSR Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-amber-600" />
            SSR Architecture — How Crawlers See the Site
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            The site uses a two-layer rendering approach. Users see the React SPA. Search engines and AI crawlers (Googlebot, Perplexity, GPTBot) see a static HTML layer rendered server-side before any JavaScript runs. Understanding this is critical before editing any content.
          </p>

          <div className="space-y-3">
            {[
              {
                title: 'Layer 1 — React SPA (users)',
                detail: 'What users see and interact with. Built with React + Vite. Served from the /dist/public bundle. All the UI components, animations, and interactivity live here. This layer is NOT what crawlers rely on — it requires JavaScript execution.',
                color: 'blue',
              },
              {
                title: 'Layer 2 — SSR .ssr-content div (crawlers)',
                detail: 'A <div class="ssr-content"> containing all SEO copy is injected as a sibling to #root in the server-rendered HTML. It is rendered before any JS runs, so it is always visible to crawlers on first byte. This is what Google, Perplexity, ChatGPT, and AI Overviews see. The content comes from server/ssr/pageContent.ts.',
                color: 'green',
              },
              {
                title: 'Hydration — hiding the SSR layer after React loads',
                detail: 'Once React mounts and sets data-hydrated="true" on #root, a CSS rule hides the SSR layer: #root[data-hydrated="true"] ~ .ssr-content { display: none !important; }. This prevents users from seeing duplicate content while ensuring crawlers always see the full copy. This rule lives in index.css.',
                color: 'amber',
              },
              {
                title: 'MASTER_REACT_BLOG_SLUGS — which blogs get React SSR vs. DB injection',
                detail: 'Some blog pages are static React components (e.g., the ATX Disco Cruise content cluster). Others are WordPress/DB posts. The MASTER_REACT_BLOG_SLUGS array in server/ssr/viteSSR.ts lists every React blog that should be SSR-rendered via Vite. Slugs not in this list get DB content injected directly. Never attempt React SSR for a DB/WordPress post — it renders 0 words.',
                color: 'red',
              },
              {
                title: 'PAGE_CONTENT priority for blog pages',
                detail: 'When rendering a blog route, the server checks: (1) Is there DB content 500+ chars? Use it. (2) Is there a PAGE_CONTENT entry in pageContent.ts for this slug? Use it. (3) Fall back to the blogMetadataRegistry short description. Adding a new PAGE_CONTENT entry is always the right way to give a blog page deep crawler-visible content without touching the React component.',
                color: 'purple',
              },
            ].map(item => (
              <div key={item.title} className={`rounded-lg p-3 border ${
                item.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                item.color === 'green' ? 'bg-green-50 border-green-200' :
                item.color === 'amber' ? 'bg-amber-50 border-amber-200' :
                item.color === 'red' ? 'bg-red-50 border-red-200' :
                'bg-purple-50 border-purple-200'
              }`}>
                <p className="text-xs font-semibold text-gray-800 mb-1">{item.title}</p>
                <p className="text-xs text-gray-700 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-green-400 space-y-1">
            <div className="text-gray-400"># Add content for a new page or blog to the crawler layer:</div>
            <div>server/ssr/pageContent.ts → PAGE_CONTENT['/your-route'] = {'{'}</div>
            <div className="pl-4">introduction: 'First paragraph crawlers see...',</div>
            <div className="pl-4">sections: [{'{'} heading: 'H2 text', content: ['paragraph 1', ...] {'}'}],</div>
            <div className="pl-4">faqs: [{'{'} question: '...', answer: '...' {'}'}]</div>
            <div>{'}'}</div>
          </div>
        </CardContent>
      </Card>

      {/* Structured Data Schema Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-indigo-600" />
            Structured Data (JSON-LD Schemas) — Complete Map
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-xs text-indigo-800 space-y-1">
            <p><strong>Pipeline:</strong> Schema files live in <code className="bg-white px-1 py-0.5 rounded">attached_assets/schema_data/</code> — one subfolder per page. <code className="bg-white px-1 py-0.5 rounded">server/schemaLoader.ts</code> reads <code className="bg-white px-1 py-0.5 rounded">ROUTE_TO_SCHEMA_MAPPING</code>, loads each file, and injects them as <code className="bg-white px-1 py-0.5 rounded">&lt;script type="application/ld+json"&gt;</code> tags in the SSR HTML before React hydrates.</p>
            <p><strong>Rule:</strong> Never add JSON-LD to React components. Every schema must go through this file-based pipeline. The schema-validator script checks for GSC compliance on 8 key pages — run <code className="bg-white px-1 py-0.5 rounded">npx tsx scripts/schema-validator.ts</code> after any schema changes.</p>
            <p><strong>Blog FAQ schemas:</strong> A second mechanism (<code className="bg-white px-1 py-0.5 rounded">BLOG_FAQ_SCHEMAS</code> in schemaLoader.ts) injects FAQPage schemas dynamically for specific high-priority blog posts — without needing a separate .jsonld file per blog.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-3 py-2 text-left font-semibold">Route</th>
                  <th className="px-3 py-2 text-left font-semibold">Schema files in schema_data/</th>
                  <th className="px-3 py-2 text-left font-semibold">@types covered</th>
                  <th className="px-3 py-2 text-left font-semibold">Gap / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    route: '/ (Homepage)',
                    files: 'organization, faq, video, service-disco, service-private, service-daytripper, service-meeseeks, service-clevergirl',
                    types: 'Organization, FAQPage, VideoObject, Service (×5), WebSite, SearchAction',
                    gap: 'Most complete schema coverage on the site. WebSite + SearchAction enables sitelinks searchbox in Google.',
                    good: true,
                  },
                  {
                    route: '/atx-disco-cruise',
                    files: 'event.jsonld, faq.jsonld, videos.jsonld',
                    types: 'Event (with Place + PostalAddress), FAQPage, ItemList of VideoObjects',
                    gap: 'Service schema not present — the Event schema covers most of what Service would add. VideoObject ItemList is strong for video rich results.',
                    good: true,
                  },
                  {
                    route: '/bachelor-party-austin',
                    files: 'faq.jsonld, service.jsonld, videos.jsonld',
                    types: 'FAQPage, Service (with Offers), ItemList of VideoObjects',
                    gap: 'Complete for a hub page. Service schema includes pricing offers. Videos schema enables video rich results.',
                    good: true,
                  },
                  {
                    route: '/bachelorette-party-austin',
                    files: 'faq.jsonld, service.jsonld, videos.jsonld',
                    types: 'FAQPage, Service (with Offers), ItemList of VideoObjects',
                    gap: 'Complete. Same pattern as bachelor hub. Matches the page\'s expanded content (5,042 crawler words).',
                    good: true,
                  },
                  {
                    route: '/combined-bachelor-bachelorette-austin',
                    files: 'faq.jsonld, videos.jsonld',
                    types: 'FAQPage, ItemList of VideoObjects',
                    gap: '⚠ Missing Service schema. This page has 3,881 crawler words and significant content — a service.jsonld would improve GSC structured data coverage.',
                    good: false,
                  },
                  {
                    route: '/private-cruises',
                    files: 'faq.jsonld, service.jsonld, products.jsonld',
                    types: 'FAQPage, Service (with PriceSpecification), Product (×3 boats, with AggregateOffer)',
                    gap: 'Strong — Product schema with per-boat pricing is excellent for comparison-style search results.',
                    good: true,
                  },
                  {
                    route: '/party-boat-austin',
                    files: 'faq.jsonld, video.jsonld',
                    types: 'FAQPage, VideoObject',
                    gap: '⚠ Only one VideoObject (not an ItemList). Missing Service schema. Supporting page — lower priority.',
                    good: false,
                  },
                  {
                    route: '/party-boat-lake-travis',
                    files: 'faq.jsonld, video.jsonld',
                    types: 'FAQPage, VideoObject',
                    gap: '⚠ Same gap as /party-boat-austin. Supporting page — lower priority.',
                    good: false,
                  },
                  {
                    route: '/birthday-parties, /graduation-party, /sweet-16, /milestone-birthday',
                    files: 'faq.jsonld + service.jsonld (each)',
                    types: 'FAQPage, Service',
                    gap: 'Adequate coverage for category pages. No video schemas — these pages don\'t have video showcases.',
                    good: true,
                  },
                  {
                    route: '/team-building, /client-entertainment, /company-milestone',
                    files: 'faq.jsonld + service.jsonld (each)',
                    types: 'FAQPage, Service',
                    gap: 'Adequate. Corporate pages have service schemas with pricing details.',
                    good: true,
                  },
                  {
                    route: '/rehearsal-dinner, /welcome-party, /after-party',
                    files: 'faq.jsonld + service.jsonld (each)',
                    types: 'FAQPage, Service',
                    gap: 'Adequate for wedding-adjacent category pages.',
                    good: true,
                  },
                  {
                    route: '/contact, /faq, /testimonials-faq',
                    files: 'faq.jsonld (+ service.jsonld for /contact)',
                    types: 'FAQPage, Service',
                    gap: 'Functional. /testimonials-faq has FAQPage only — a Review or AggregateRating schema would be a meaningful upgrade.',
                    good: false,
                  },
                  {
                    route: 'Blog posts (high-priority)',
                    files: 'No .jsonld files — schemas injected dynamically via BLOG_FAQ_SCHEMAS in schemaLoader.ts',
                    types: 'FAQPage (dynamically generated), Article (injected by renderer.ts)',
                    gap: 'Article schema is injected by renderer.ts for all blog pages automatically. FAQPage schema is only injected for the ~6 blogs listed in BLOG_FAQ_SCHEMAS — others get Article only. Expanding BLOG_FAQ_SCHEMAS for more posts is an improvement opportunity.',
                    good: false,
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-3 py-2 font-mono text-gray-800 align-top font-medium">{row.route}</td>
                    <td className="px-3 py-2 text-gray-600 align-top">{row.files}</td>
                    <td className="px-3 py-2 text-gray-700 align-top">{row.types}</td>
                    <td className={`px-3 py-2 align-top ${row.good ? 'text-green-700' : 'text-amber-700'}`}>{row.gap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-700 space-y-1">
            <p className="font-semibold">How to add a schema for a new page:</p>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Create <code className="bg-white px-1 rounded">attached_assets/schema_data/your-page-name/</code> directory</li>
              <li>Add <code className="bg-white px-1 rounded">faq.jsonld</code> (FAQPage), <code className="bg-white px-1 rounded">service.jsonld</code> (Service), and optionally <code className="bg-white px-1 rounded">videos.jsonld</code> (ItemList/VideoObjects)</li>
              <li>Add the route to <code className="bg-white px-1 rounded">ROUTE_TO_SCHEMA_MAPPING</code> in <code className="bg-white px-1 rounded">server/schemaLoader.ts</code></li>
              <li>Run <code className="bg-white px-1 rounded">npx tsx scripts/schema-validator.ts</code> to verify GSC compliance</li>
              <li>If the page has FAQs, also add them to the page's <code className="bg-white px-1 rounded">faq.jsonld</code> whenever new FAQ accordion items are added to the React page component</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* HTML vs React Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Layout className="h-4 w-4 text-green-600" />
            HTML Structure vs. React UI — What Lives Where and Why
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            The biggest source of confusion for new developers is that the site has two parallel content systems. Content in the React UI is what users see and interact with. Content in the SSR HTML is what search engines and AI engines read. They are intentionally different and serve different purposes.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-3 py-2 text-left font-semibold">Content type</th>
                  <th className="px-3 py-2 text-center font-semibold">React UI (.tsx)</th>
                  <th className="px-3 py-2 text-center font-semibold">SSR pageContent.ts</th>
                  <th className="px-3 py-2 text-center font-semibold">schema_data/ .jsonld</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['Pricing cards / slot display', '✓ Users see these', '✓ Crawlers read these too', '✓ Offers inside Service/Event schema'],
                  ['FAQ accordion items', '✓ Users expand these', '✓ Copied / extended here for depth', '✓ Each FAQ duplicated in faq.jsonld'],
                  ['Hero text / H1', '✓ Rendered in React', '✓ H1 re-stated in SSR intro', '✗ Not in schema'],
                  ['What\'s included lists', '✓ Card-based UI', '✓ Plain text list for crawlers', '✓ Inside Service schema hasOfferCatalog'],
                  ['Photo gallery', '✓ AnimatedPhotoGallery component', '✗ Not in SSR (images aren\'t crawled here)', '✗ Not in schema'],
                  ['Video content', '✓ VideoShowcaseGrid + YouTube embeds', '✗ SSR has video titles/descriptions only', '✓ VideoObject + ItemList in videos.jsonld'],
                  ['Navigation links', '✓ PublicNavigation component', '✓ generateSSRNavigation() for crawlers', '✗ Not in schema'],
                  ['Testimonials / reviews', '✓ Testimonial cards in React', '✓ Quoted in SSR content sections', '✗ Missing — AggregateRating schema not built'],
                  ['JSON-LD structured data', '✗ NEVER in React components', '✗ Not in pageContent.ts', '✓ Only here, injected by schemaLoader.ts'],
                  ['Internal links', '✓ Link components in React', '✓ [[token]] syntax resolved in renderer.ts', '✗ Not in schema'],
                  ['Page meta title + description', '✓ React Helmet in each .tsx', 'renderer.ts reads Helmet output; falls back to blogMetadataRegistry if empty', '✗ Not in schema'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-3 py-2 font-medium text-gray-800 align-top">{row[0]}</td>
                    <td className="px-3 py-2 text-center align-top text-gray-700">{row[1]}</td>
                    <td className="px-3 py-2 text-center align-top text-gray-700">{row[2]}</td>
                    <td className="px-3 py-2 text-center align-top text-gray-700">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 space-y-1">
            <p className="font-semibold">The cardinal rule on duplication:</p>
            <p>FAQ answers MUST exist in three places: (1) the React accordion UI, (2) pageContent.ts for crawlers, and (3) the page's faq.jsonld schema file. If you add a new FAQ only to the React UI, search engines won't see it and it won't get a rich result snippet. If you add it only to pageContent.ts, users can't find it. All three must stay in sync.</p>
          </div>
        </CardContent>
      </Card>

      {/* SEO Optimization History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            SEO Optimization History — What Was Done, When, and Why
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">This is a record of every major SEO and technical optimization made to the site. Use it to understand why things are built the way they are before changing them.</p>
          <div className="space-y-2">
            {[
              {
                when: 'Jan 2026',
                what: 'Critical SSR bypass fix',
                detail: 'Removed a next("route") call in server/routes.ts that was silently skipping SSR for all React pages. Every hub page, blog, and category page was being served without the .ssr-content layer — crawlers were getting empty pages. After the fix, all pages gained 1,000–5,000 words of crawler-visible content overnight. This was the single highest-impact change in site history.',
                impact: 'high',
              },
              {
                when: 'Jan 2026',
                what: 'Vite SSR for React blog pages',
                detail: 'Implemented proper Vite-powered SSR for React blog components via server/ssr/viteSSR.ts. Before this, React blog pages rendered 0 KB on cold start for crawlers. The double-render technique primes the lazy() module cache. Result: all React blogs now render 100–200 KB on first request.',
                impact: 'high',
              },
              {
                when: 'Jan 2026',
                what: 'WordPress blog SSR fix',
                detail: 'WordPress/DB blog posts were incorrectly going through the React SSR pipeline, rendering 0 words. MASTER_REACT_BLOG_SLUGS (in server/routes.ts) was created as the single source of truth — only slugs in this list get Vite React SSR. All other /blogs/:slug routes get DB content injected directly.',
                impact: 'high',
              },
              {
                when: 'Feb 2026',
                what: 'SSR overlapping text fix',
                detail: 'After the SSR layer was working, users started seeing the SSR content text overlaid on the React UI — because both were visible simultaneously. Fixed by having React set data-hydrated="true" on #root on mount, and a CSS rule in index.css hides .ssr-content once that attribute is present. Users see clean React UI; crawlers always see the full content.',
                impact: 'medium',
              },
              {
                when: 'Feb 2026',
                what: 'TBT (Total Blocking Time) optimization',
                detail: 'Google Lighthouse TBT score was high due to heavy JS bundles loading synchronously. Fixed by: (1) lazy-loading GoogleAnalytics, Toaster, and XolaMobileCloseButton, (2) deferring Google Analytics to 5 seconds + requestIdleCallback, (3) LazyMotionProvider wrapping Framer Motion loads. TBT dropped significantly — improved Core Web Vitals score.',
                impact: 'medium',
              },
              {
                when: 'Feb 2026',
                what: 'SSR navigation and footer for internal linking',
                detail: 'Added generateSSRNavigation() and generateSSRFooter() helpers in renderer.ts. These inject proper HTML nav and footer with real anchor tags into the SSR layer on every page — so crawlers can follow links from every page to every hub page without needing to execute JavaScript. Strengthens internal PageRank distribution.',
                impact: 'medium',
              },
              {
                when: 'Feb 2026',
                what: 'Bidirectional internal linking system',
                detail: 'Built RELATED_PAGES_MAP in pageContent.ts (12 category mappings). getRelatedLinksForPage(pathname) returns {url, title} objects for any page or blog. Used by the SSR renderer to inject a "Related pages" section on every page. Also standardized the [[token]] internal link syntax — tokens like [[atx-disco]] are resolved to real hrefs at SSR render time.',
                impact: 'medium',
              },
              {
                when: 'Mar 2026',
                what: 'Bachelorette hub page major expansion',
                detail: 'Page grew from 604 to 884 lines. Added: trust stats bar, scrolling photo gallery, two-options comparison cards, 4-step how-it-works section, Lake Travis split section with photos, transportation guide, party planning checklist, 15-FAQ expanded accordion. SSR layer gained how-to-book + marina logistics + 4 extra FAQs. Crawler word count: 5,042 (up from ~2,800).',
                impact: 'high',
              },
              {
                when: 'Mar 2026',
                what: 'Combined bach page expansion',
                detail: 'Crawler word count went from ~2,600 to ~3,881 words. Added long-form content sections covering the combined bach concept, logistics, pricing comparison, and FAQs. Established /combined-bachelor-bachelorette-austin as a proper supporting page for both hub pages.',
                impact: 'medium',
              },
              {
                when: 'Mar 2026',
                what: 'Private cruises page expansion',
                detail: 'Added two dedicated SEO content sections in the React UI (Austin party cruises for private events, Lake Travis planning guide) plus SSR layer expansion. Crawler words grew to ~2,800. Added corporate ROI section targeting "team building Lake Travis" queries.',
                impact: 'medium',
              },
              {
                when: 'Apr 2026',
                what: 'ATX Disco content cluster (10 blog posts)',
                detail: 'Created 10 static React blog posts targeting bach party queries, all linking back to /atx-disco-cruise as the hub. Fixed title tag output from React Helmet (renderer.ts detects empty <title> tags and falls back to blogMetadataRegistry). Added FAQPage + Article JSON-LD schemas. File naming quirk introduced (BestBachelorPartyBoatAustin.tsx = cost breakdown; WhatYouGetForMoneyPartyBoat.tsx = bachelor boat guide — App.tsx imports swapped).',
                impact: 'medium',
              },
              {
                when: 'Apr 2026',
                what: 'ATX Disco YouTube section + VideoObject schema',
                detail: 'Added featured YouTube embed on the ATX Disco Cruise page. Updated videos.jsonld to include the YouTube VideoObject. Word count grew to ~4,103. VideoObject schema enables video rich results in Google Search.',
                impact: 'low',
              },
              {
                when: 'Apr 2026 (LESSON)',
                what: 'UI consolidation mistake — do not repeat',
                detail: 'Earlier in 2026, a "UI consolidation" pass removed ~1,100 lines from the home and ATX Disco pages. The removed sections were poorly written but had real SEO value — keyword territory, word count, topical depth. Rankings dropped. Lesson: always move content to the SSR layer instead of deleting it. The rewrite-and-migrate approach, not the delete approach.',
                impact: 'negative',
              },
            ].map((item, i) => (
              <div key={i} className={`rounded-lg p-3 border flex gap-3 ${
                item.impact === 'high' ? 'bg-green-50 border-green-200' :
                item.impact === 'negative' ? 'bg-red-50 border-red-200' :
                item.impact === 'medium' ? 'bg-blue-50 border-blue-200' :
                'bg-gray-50 border-gray-200'
              }`}>
                <div className="shrink-0 text-right w-16">
                  <span className="text-xs font-mono font-semibold text-gray-500">{item.when}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 mb-0.5">{item.what}</p>
                  <p className="text-xs text-gray-700 leading-relaxed">{item.detail}</p>
                </div>
                <div className="shrink-0">
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                    item.impact === 'high' ? 'bg-green-200 text-green-800' :
                    item.impact === 'negative' ? 'bg-red-200 text-red-800' :
                    item.impact === 'medium' ? 'bg-blue-200 text-blue-800' :
                    'bg-gray-200 text-gray-700'
                  }`}>{item.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Remaining SEO Gaps */}
      <Card className="border-amber-300">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-4 w-4" />
            Remaining SEO &amp; Schema Gaps — What Still Needs Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600 mb-3">These are known gaps identified through audits. Ordered roughly by estimated impact.</p>
          {[
            {
              priority: 'HIGH',
              area: 'AggregateRating / Review schema',
              detail: 'Premier Party Cruises has strong reviews (4.9-star rating mentioned throughout the site) but zero Review or AggregateRating structured data anywhere. Adding this to the homepage organization.jsonld and the three hub pages would enable star ratings in search results — one of the highest-CTR improvements possible for local businesses.',
            },
            {
              priority: 'HIGH',
              area: 'FAQ sync between React UI, pageContent.ts, and faq.jsonld',
              detail: 'FAQs added to React page components are often not added to the corresponding faq.jsonld. The ATX Disco Cruise page FAQ accordion has answers that are not in atx-disco-cruise/faq.jsonld. The bachelorette page expanded to 15 FAQs in March 2026 but the jsonld was not fully updated. Run the FAQ Review admin tool (/admin/faq-review) to identify inconsistencies.',
            },
            {
              priority: 'HIGH',
              area: 'BLOG_FAQ_SCHEMAS expansion',
              detail: 'Only ~6 high-priority blog posts have FAQPage schemas injected via BLOG_FAQ_SCHEMAS in schemaLoader.ts. The remaining 90+ React blog posts only get an Article schema. Adding FAQPage schemas to the 20 highest-traffic blog posts (bachelor party ideas, monthly guides, best-of lists) would significantly improve rich result eligibility.',
            },
            {
              priority: 'MEDIUM',
              area: 'Service schema for /combined-bachelor-bachelorette-austin',
              detail: 'The combined bach page (3,881 crawler words) has only faq.jsonld and videos.jsonld. Adding a service.jsonld with pricing offers (Fri $95/pp, Sat AM $105/pp, Sat PM $85/pp) and a proper service description would bring this page to parity with the bachelor and bachelorette hub schemas.',
            },
            {
              priority: 'MEDIUM',
              area: 'LocalBusiness schema missing from hub pages',
              detail: 'LocalBusiness schema (with geo coordinates, hours, address, phone, priceRange) is defined in the homepage organization.jsonld but not injected on the bachelor, bachelorette, or ATX Disco hub pages directly. Google recommends LocalBusiness on every page for local services.',
            },
            {
              priority: 'MEDIUM',
              area: 'Image alt text audit',
              detail: 'The AnimatedPhotoGallery, hero section, and fleet section images all have basic alt text but none has been optimized for keywords. The MediaLibrary admin tool (/admin/media) has an AI-powered alt text generator — it needs to be run across the 200+ images currently on the site. Target: include "Lake Travis," "party boat Austin," "ATX Disco Cruise" naturally in photo alts.',
            },
            {
              priority: 'MEDIUM',
              area: 'Party On Delivery UI callout on ATX Disco and Private Cruises pages',
              detail: 'Party On Delivery is in the SSR layer on every page but is not prominently visible in the React UI on the ATX Disco Cruise page or Private Cruises page. A dedicated BYOB callout card ("Stock Your Cooler" style) with a link to partyondelivery.com would increase affiliate visibility and reduce the friction of finding the service.',
            },
            {
              priority: 'LOW',
              area: 'Co-branded landing page: /alcohol-delivery-lake-travis',
              detail: 'A page specifically targeting "alcohol delivery Lake Travis" would capture high-intent searches and funnel to both Premier Party Cruises and Party On Delivery. Estimated search volume is significant (people plan BYOB logistics weeks before their cruise). Could be a 500-word React page with SSR layer, no booking widget needed.',
            },
            {
              priority: 'LOW',
              area: 'Video schema upgrade for /party-boat-austin and /party-boat-lake-travis',
              detail: 'Both supporting pages have a single VideoObject schema but not an ItemList wrapping multiple videos. Upgrading to the ItemList + VideoObject pattern (like the hub pages) would improve video rich result eligibility.',
            },
            {
              priority: 'LOW',
              area: 'AggregateRating on /testimonials-faq',
              detail: 'The testimonials page shows real reviews but has no Review or AggregateRating schema. Adding this with the correct ratingValue (4.9) and reviewCount would make the page useful for Google\'s rating snippet extraction.',
            },
          ].map((item, i) => (
            <div key={i} className="border border-amber-200 rounded-lg p-3 bg-amber-50 flex gap-3">
              <span className={`text-xs font-bold shrink-0 px-1.5 py-0.5 rounded h-fit ${
                item.priority === 'HIGH' ? 'bg-red-200 text-red-800' :
                item.priority === 'MEDIUM' ? 'bg-amber-300 text-amber-900' :
                'bg-gray-200 text-gray-700'
              }`}>{item.priority}</span>
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-0.5">{item.area}</p>
                <p className="text-xs text-gray-700 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Admin Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Search className="h-4 w-4 text-blue-600" />
            Admin Section — All Tools Built
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            The admin section lives at <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/admin</code> and requires login. All routes are protected by the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">requireAdmin</code> middleware server-side. Here is every tool built:
          </p>
          <div className="space-y-2">
            {adminPages.map(page => (
              <div key={page.route} className="border border-gray-200 rounded-lg p-3 bg-white">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <code className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{page.route}</code>
                  <code className="text-xs text-gray-400">{page.file}</code>
                  <Badge className={`text-xs border ${statusColor(page.status)}`}>{page.status}</Badge>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{page.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Complete</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Partial — functional but could be improved</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300 inline-block" /> Stub — needs significant work</span>
          </div>
        </CardContent>
      </Card>

      {/* Design Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            Design Guidelines for Claude
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">Apply these every time you touch the UI. They exist because the site has established brand equity — changes that break these rules will need to be reverted.</p>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
            {designGuidelines.map(row => (
              <div key={row.rule} className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                <span className="text-xs font-semibold text-gray-700 w-44 shrink-0">{row.rule}</span>
                <span className="text-xs text-gray-700 leading-relaxed">{row.detail}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Never Do */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-4 w-4" />
            Critical "Never Do" Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">These rules exist because violating them has caused real problems — broken builds, SEO ranking drops, incorrect pricing shown to customers, or data loss. Every rule here has a war story behind it.</p>
          <ul className="space-y-2">
            {criticalNeverDo.map((rule, i) => (
              <li key={i} className="flex gap-3 items-start bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                <span className="text-red-500 font-bold shrink-0 text-xs mt-0.5">✕</span>
                <span className="text-sm text-red-800 leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Party on Delivery Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Anchor className="h-4 w-4 text-green-600" />
            Party On Delivery Integration — How It Works &amp; How to Maintain It
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-green-900 mb-1">What is Party On Delivery?</p>
            <p className="text-sm text-green-800 leading-relaxed">
              Party On Delivery (<a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">partyondelivery.com</a>) is an Austin-based alcohol and beverage delivery service that delivers drinks, mixers, ice, and party supplies directly to customers — including to the marina dock at 13993 FM 2769, Leander TX 78641. It is a natural complement to the BYOB policy on all Premier Party Cruises boats. Features include 1-hour delivery windows, free consultations, and a 100% buyback policy on unopened bottles.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800 mb-2">Where it appears on the site — current coverage:</p>
            <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden text-xs">
              {[
                { location: 'server/ssr/pageContent.ts (30+ mentions)', context: 'SSR/crawler layer. Mentioned in BYOB sections, marina logistics, booking tips, and FAQ answers across bachelor, bachelorette, combined bach, private cruises, wedding, birthday, corporate, and anniversary pages. Always linked with an <a> tag pointing to partyondelivery.com.' },
                { location: 'PartyPlanningChecklist component', context: 'Interactive checklist used on the bachelorette page. Includes "Order from Party On Delivery" as a checklist item for beverage coordination.' },
                { location: 'AustinBachelorPartyIdeas.tsx blog', context: 'Featured prominently with 5 mentions. Dedicated section positioning it as "your personal booze concierge." Covers delivery to Airbnb and marina dock.' },
                { location: 'JointBachelorBachelorettePartyGuide.tsx blog', context: 'Full dedicated section (data-testid="section-party-on-delivery"). Positioned as the partner for coordinating larger combined groups who do not want to do a Costco run.' },
                { location: 'LakeTravisBachelorAlcoholDelivery.tsx blog', context: 'The entire blog post is built around alcohol delivery to Lake Travis — Party On Delivery is the primary recommendation throughout.' },
                { location: 'FirstTimeLakeTravisGuide.tsx blog', context: 'Mentioned in the BYOB FAQ answer as the recommended way to have drinks on ice at arrival.' },
                { location: 'BacheloretteParty.tsx (hub page)', context: 'Mentioned in the Party Planning Checklist section via the PartyPlanningChecklist component.' },
                { location: 'BachelorParty.tsx (hub page)', context: 'Referenced in the BYOB / What to Bring section.' },
              ].map(row => (
                <div key={row.location} className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-start gap-2">
                  <code className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded shrink-0 self-start">{row.location}</code>
                  <span className="text-xs text-gray-600 leading-relaxed">{row.context}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-800">Rules for maintaining this integration:</p>
            <ul className="space-y-2">
              {[
                'Always hyperlink "Party On Delivery" to https://partyondelivery.com (not www.partyondelivery.com — the non-www version is the canonical URL). In React JSX: target="_blank" rel="noopener noreferrer". In SSR pageContent.ts: use inline style="color:#1e40af; text-decoration:underline;"',
                'In the SSR layer, the link must be an HTML <a> tag, not a JSX Link component. The SSR content is raw HTML strings.',
                'The recommended framing is always practical and helpful: "to skip the cooler run," "have drinks cold at the marina when you arrive," "100% buyback on unopened bottles so you only pay for what you drink." Never describe it as just an ad or sponsored placement.',
                'It should appear in BYOB-related sections, party planning checklists, booking timelines ("1 week out: order from Party On Delivery"), and marina logistics sections.',
                'When adding new blog posts or hub page sections that mention BYOB, always include a Party On Delivery mention and link. This is a partnership — every new page is an opportunity to reinforce it.',
                'The one context where Party On Delivery is NOT mentioned: the alcohol policy section that lists what is NOT allowed (glass beer bottles). Keep that section about rules, not vendor recommendations.',
              ].map((rule, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-gray-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-800 mb-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Opportunities to expand this integration</p>
            <ul className="text-xs text-amber-800 space-y-1">
              <li>• ATX Disco Cruise page — Party On Delivery not yet prominently mentioned in the BYOB section of the React UI (it is in the SSR layer). A dedicated "Stock Your Cooler" callout card would improve conversion.</li>
              <li>• Private Cruises page — only referenced in the SSR layer. A visible callout in the UI near the BYOB / what to bring section would help.</li>
              <li>• More monthly seasonal blog posts should mention it — the 6 bachelor monthly guides and 6 bachelorette monthly guides each have light coverage; a dedicated paragraph in each would strengthen the partnership.</li>
              <li>• A co-branded landing page (e.g. /party-supplies-lake-travis or /alcohol-delivery-lake-travis) would capture high-value searches and funnel them to both Premier Party Cruises and Party On Delivery.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* What Needs Work */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-amber-800">
            <TrendingUp className="h-4 w-4" />
            What Is Incomplete / Opportunities to Improve
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { area: 'GlobalInlineEditor', detail: 'Currently a 13-line stub. The vision is: admins view the public site while logged in, click any text element to edit it inline, and changes save back to a content_blocks DB table. The data-editable and data-editable-id attributes are already on page elements — the editor just needs to be built out to read/write these.' },
            { area: 'ContentBlocksManagement analytics tab', detail: 'The Analytics tab inside ContentBlocksManagement shows a placeholder message. Needs charts showing edit history, which blocks have been changed, and when.' },
            { area: 'Blog conversion attribution', detail: 'BlogConversionTracker shows lead counts per blog source URL but has no time-series view, no funnel visualization, and no per-post revenue attribution. The data exists in the leads table — it just needs better visualization.' },
            { area: 'Uptime Monitoring + PageStatus routing', detail: 'UptimeMonitoring and PageStatus are fully built but have no route registered in App.tsx — they can only be accessed by typing the URL directly. They should be added to the admin navigation.' },
            { area: 'Mobile admin navigation', detail: 'The admin navigation works on desktop but can feel cramped on mobile. A slide-out drawer or bottom nav for mobile would improve the admin experience for on-the-go edits.' },
            { area: 'Image alt text audit', detail: 'Most images have basic alt text but a systematic audit against primary keywords has not been done. The MediaLibrary admin tool can generate AI alt text — it just needs to be run across all existing images.' },
          ].map(item => (
            <div key={item.area} className="border border-amber-200 bg-amber-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-amber-900 mb-1">{item.area}</p>
              <p className="text-xs text-amber-800 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}

// ─── SEO STRATEGY TAB ────────────────────────────────────────────────────────

function SeoStrategyTab() {
  const hubPages = [
    {
      route: '/bachelorette-party-austin',
      label: 'Bachelorette Party Austin',
      primaryKeywords: ['bachelorette party Austin', 'Austin bachelorette party ideas', 'Lake Travis bachelorette party', 'party boat bachelorette Austin'],
      wordCount: '~5,042',
      blogCount: 15,
      status: 'top priority',
    },
    {
      route: '/bachelor-party-austin',
      label: 'Bachelor Party Austin',
      primaryKeywords: ['bachelor party Austin', 'Austin bachelor party boat', 'Lake Travis bachelor party', 'party boat rental Austin'],
      wordCount: '~4,720',
      blogCount: 11,
      status: 'top priority',
    },
    {
      route: '/atx-disco-cruise',
      label: 'ATX Disco Cruise',
      primaryKeywords: ['ATX Disco Cruise', 'Austin disco cruise', 'party boat Austin all-inclusive', 'disco party boat Lake Travis'],
      wordCount: '~4,103',
      blogCount: 10,
      status: 'top priority',
    },
  ];

  const supportingPages = [
    { route: '/combined-bachelor-bachelorette-austin', purpose: 'Captures joint bach party searches. Links up to all three hub pages.', trafficTarget: 'combined bachelor bachelorette Austin' },
    { route: '/private-cruises', purpose: 'Private charter landing page. Targets groups wanting exclusive boat rental.', trafficTarget: 'private boat rental Lake Travis Austin' },
    { route: '/party-boat-austin', purpose: 'Broad catch-all for "party boat Austin" queries. Distributes to hub pages.', trafficTarget: 'party boat Austin, Lake Travis party boat' },
    { route: '/party-boat-lake-travis', purpose: 'Geographic variant of the party boat page targeting Lake Travis specifically.', trafficTarget: 'party boat Lake Travis' },
    { route: '/', purpose: 'Root page. Highest domain authority. Introduces both offerings and links to all hubs.', trafficTarget: 'Premier Party Cruises, party boat Austin brand searches' },
    { route: '/birthday-parties', purpose: 'Category page for birthday rentals. Links to private cruises.', trafficTarget: 'birthday party boat Austin' },
    { route: '/corporate-events', purpose: 'Corporate charter category. Links to private cruises.', trafficTarget: 'corporate boat rental Austin team building' },
    { route: '/wedding-parties', purpose: 'Wedding category page targeting rehearsal dinners, welcome parties, after parties.', trafficTarget: 'wedding boat rental Austin Lake Travis' },
  ];

  const blogClusters = [
    {
      hub: '/bachelor-party-austin',
      color: 'blue',
      blogs: [
        '/blogs/lake-travis-bachelor-party-austin-celebrations',
        '/blogs/why-choose-austin-bachelor-party',
        '/blogs/epic-bachelor-party-austin-ultimate-guide',
        '/blogs/how-to-throw-great-bachelor-party-austin',
        '/blogs/austin-bachelor-party-january (+ march, may, july, sept, nov — 6 monthly guides)',
        '/blogs/lake-travis-bachelor-party-boat-rentals-the-ultimate-guide',
        '/blogs/best-bachelor-party-boat-austin (cost breakdown)',
        '/blogs/what-you-get-for-money-party-boat (bachelor boat guide)',
        '/blogs/top-dos-and-donts-atx-disco-cruise',
        '/blogs/everything-included-atx-disco-cruise',
      ],
    },
    {
      hub: '/bachelorette-party-austin',
      color: 'pink',
      blogs: [
        '/3-day-austin-bachelorette-itinerary',
        '/ultimate-austin-bachelorette-weekend',
        '/top-10-austin-bachelorette-ideas',
        '/budget-austin-bachelorette',
        '/adventure-austin-bachelorette',
        '/austin-bachelorette-nightlife',
        '/blogs/why-choose-austin-bachelorette-party',
        '/blogs/austin-bachelorette-party-february (+ april, june, aug, oct, dec — 6 monthly guides)',
        '/blogs/epic-bachelorette-party-austin-ultimate-guide',
        '/blogs/how-to-throw-great-bachelorette-party-austin',
        '/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend',
        '/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party',
        '/blogs/must-pack-items-austin-bachelorette-party',
        '/blogs/austin-bachelorette-party-complete-guide',
        '/blogs/lake-travis-bachelorette-boat-rentals',
      ],
    },
    {
      hub: '/atx-disco-cruise',
      color: 'amber',
      blogs: [
        '/blogs/best-bachelor-party-boat-austin',
        '/blogs/atx-disco-cruise-dos-and-donts',
        '/blogs/everything-included-atx-disco-cruise',
        '/blogs/atx-disco-cruise-complete-guide',
        '/blogs/top-dos-and-donts-atx-disco-cruise',
        '/blogs/what-to-expect-atx-disco-cruise',
        '/blogs/why-atx-disco-cruise-best-austin-bach',
        '/blogs/atx-disco-cruise-faqs',
        '/blogs/lake-travis-disco-cruise',
        '/blogs/bachelor-party-boat-guide-austin',
      ],
    },
  ];

  const doNotPromote = [
    { route: '/luxury-austin-bachelorette', reason: 'Was created as an SEO page targeting luxury searches, but promotes a competitor framing and is not a service we offer. Must NOT be linked from hub pages, nav, footer, or blog posts. It exists as a standalone page only.' },
  ];

  const aiEngineStrategy = [
    'All core service pages use a two-layer approach: React UI for users, SSR .ssr-content div for AI crawlers (Perplexity, ChatGPT, Google AI Overviews).',
    'The SSR layer in server/ssr/pageContent.ts contains 1,500–5,000 words per hub page covering: what the service is, who it is for, how it works, what is included, exact prices, FAQs, marina logistics, and Austin context.',
    'AI engines pull from FAQ content heavily — every FAQ on every hub page has FAQPage JSON-LD schema injected by SSR via server/schemaLoader.ts.',
    'Schema files live exclusively in attached_assets/schema_data/ — 41+ structured data files. Never inject schema from React components.',
    'AIOptimizedSection component on the home page provides structured entity data specifically formatted for AI engine parsing.',
    'Internal linking is bidirectional: hub pages link to blogs, blogs link back to their hub. This tells AI engines which page is the authority.',
    'The SSR navigation (generateSSRNavigation) and footer (generateSSRFooter) inject crawlable links to all hub pages on every rendered page.',
  ];

  const coreRules = [
    'Never reduce crawler word count on a ranking page without replacing the keyword coverage.',
    'All JSON-LD schemas must live in attached_assets/schema_data/ and be served by SSR. Zero schema from React components.',
    'Every new FAQ added to the UI must also be added to the corresponding .jsonld schema file.',
    'After any sitemap edit, verify: grep -c "^  <url>$" public/sitemap.xml must equal grep -c "</url>" public/sitemap.xml.',
    'Run npx tsx scripts/pre-deploy-seo-check.ts before any deployment.',
    'Run npx tsx scripts/ssr-health-check.ts to validate 25 critical routes for soft 404 prevention.',
    'Hub pages must link to each other bidirectionally. No blog post should rank above its parent hub.',
    'The luxury bachelorette page (/luxury-austin-bachelorette) is never linked from any hub page, nav, or footer.',
    'Phone number site-wide: (512) 488-5892 — href: tel:+15124885892. No exceptions. No other number.',
  ];

  return (
    <div className="space-y-6">
      {/* Hub Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-600" />
            The Three Hub Pages — Sources of Truth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">
            The entire site is built around three equal hub pages. Every blog post, every category page, and every internal link should ultimately drive traffic to one of these three. They are the pages we want to rank #1 for their respective queries.
          </p>
          <div className="grid gap-4">
            {hubPages.map(p => (
              <div key={p.route} className="border border-amber-200 bg-amber-50 rounded-lg p-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <code className="text-sm font-mono bg-white border border-amber-200 px-2 py-0.5 rounded text-gray-800">{p.route}</code>
                  <Badge className="bg-amber-500 text-white text-xs">{p.status}</Badge>
                  <span className="text-xs text-gray-500">{p.wordCount} crawler words</span>
                  <span className="text-xs text-gray-500">· {p.blogCount} supporting blog posts</span>
                </div>
                <p className="text-xs font-semibold text-gray-700 mb-1">Target keywords:</p>
                <div className="flex flex-wrap gap-1">
                  {p.primaryKeywords.map(kw => (
                    <code key={kw} className="text-xs bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-700">{kw}</code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Supporting Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            Supporting Pages — Drive Traffic Up to Hub Pages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            These pages capture secondary and long-tail searches. They exist to rank for broader or variant queries and funnel visitors up to the three hub pages. They are NOT meant to rank above the hub pages for the core queries.
          </p>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
            {supportingPages.map(p => (
              <div key={p.route} className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-start gap-2">
                <code className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded shrink-0">{p.route}</code>
                <div className="text-xs text-gray-600 flex-1">
                  <span className="text-gray-800">{p.purpose}</span>
                  <span className="ml-1 text-gray-400">Targets: <em>{p.trafficTarget}</em></span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blog Clusters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-purple-600" />
            Content Clusters — Blog Posts That Feed Each Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Each hub page anchors a topic cluster. Blog posts target long-tail variations and link back to the hub. The hub links out to the blogs. This bidirectional structure tells search engines (and AI engines) which page has the highest authority on the topic.
          </p>
          {blogClusters.map(cluster => (
            <div key={cluster.hub} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-4 py-2 flex items-center gap-2">
                <Anchor className="h-3.5 w-3.5" />
                <span className="text-sm font-mono">{cluster.hub}</span>
                <span className="ml-auto text-xs text-gray-400">{cluster.blogs.length} posts</span>
              </div>
              <div className="divide-y divide-gray-100">
                {cluster.blogs.map(blog => (
                  <div key={blog} className="px-4 py-2 bg-white">
                    <code className="text-xs text-gray-600">{blog}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Do Not Promote */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-4 w-4" />
            Pages That Must NOT Be Promoted
          </CardTitle>
        </CardHeader>
        <CardContent>
          {doNotPromote.map(p => (
            <div key={p.route} className="bg-red-50 border border-red-200 rounded-lg p-4">
              <code className="text-sm font-mono text-red-800 block mb-2">{p.route}</code>
              <p className="text-xs text-red-700 leading-relaxed">{p.reason}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Engine Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Search className="h-4 w-4 text-indigo-600" />
            AI Engine Visibility Strategy (Perplexity, ChatGPT, Google AI Overviews)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            AI engines (Perplexity, ChatGPT with browsing, Google AI Overviews) crawl and cite pages differently from traditional search. Our SSR layer is specifically built to serve them. Key principles:
          </p>
          <ul className="space-y-2">
            {aiEngineStrategy.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="text-indigo-500 font-bold shrink-0">{i + 1}.</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Core Rules */}
      <Card className="border-gray-300">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-gray-600" />
            Non-Negotiable SEO Rules — Apply to Every Edit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {coreRules.map((rule, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-red-500 font-bold shrink-0 text-xs mt-0.5">!</span>
                <span className="text-sm text-gray-800 leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── PRICING REFERENCE TAB ────────────────────────────────────────────────────

function PricingReferenceTab() {
  return (
    <div className="space-y-6">

      {/* ATX Disco Cruise */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            ATX Disco Cruise — Per-Person Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Season:</strong> March through October only.</p>
            <p><strong>Boat:</strong> Clever Girl (flagship, 14 disco balls, up to 120 guests across multiple groups).</p>
            <p><strong>Format:</strong> Multi-group public cruise — you share the boat with other bachelor/bachelorette parties. Each group gets a private bin and cooler.</p>
            <p><strong>All prices are all-in</strong> — tax and gratuity are included in the per-person price displayed. No hidden fees.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { day: 'Friday', time: '12:00 PM – 4:00 PM', price: '$95', allIn: '$124.88', badge: null },
              { day: 'Saturday', time: '11:00 AM – 3:00 PM', price: '$105', allIn: '$137.81', badge: 'BEST' },
              { day: 'Saturday', time: '3:30 PM – 7:30 PM', price: '$85', allIn: '$111.56', badge: 'FUN!' },
            ].map(slot => (
              <div key={slot.time} className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900 text-sm">{slot.day}</span>
                  {slot.badge && <Badge className="bg-amber-500 text-white text-xs">{slot.badge}</Badge>}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                  <Clock className="h-3 w-3" />
                  {slot.time}
                </div>
                <div className="text-2xl font-bold text-gray-900">{slot.price}<span className="text-sm font-normal text-gray-500">/person</span></div>
                <div className="text-xs text-gray-500 mt-0.5">~{slot.allIn} w/tax & gratuity</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">What every ticket includes:</p>
            <ul className="text-xs text-gray-600 space-y-1 grid sm:grid-cols-2 gap-x-4">
              {[
                'Professional DJ (full 4 hours)',
                'Professional photographer (photos delivered after)',
                'Largest unicorn float in the country',
                '3 giant 6\'×20\' lily pad floats',
                'Private bin for your group\'s belongings',
                'Private cooler with 30 lbs of ice',
                'Ice water stations, solo cups, koozies',
                'Bubble wands & name tags',
                'Souvenir ATX Disco Cruise koozies (2026)',
                'Disco ball necklace for the bride or groom',
                'Captain and crew',
              ].map(item => (
                <li key={item} className="flex gap-1.5 items-start">
                  <CheckCircle2 className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-800 mb-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Pricing rule</p>
            <p className="text-xs text-amber-700">The prices above are the final displayed prices — tax and gratuity are baked in. When writing copy, always show the base per-person price (e.g. "$95/person"). Never say "plus tax" or "plus gratuity" — that language implies hidden fees. The all-in total is only shown when providing a full breakdown.</p>
          </div>
        </CardContent>
      </Card>

      {/* Private Charter Rates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Anchor className="h-4 w-4 text-blue-600" />
            Private Charters — Hourly Rates by Boat &amp; Day
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Minimum booking:</strong> 4 hours.</p>
            <p><strong>Your group only</strong> — no other parties on the boat.</p>
            <p><strong>DJ not included</strong> — available as a $600 flat-fee add-on.</p>
            <p><strong>Photographer not included</strong> — available as a $600 flat-fee add-on.</p>
            <p><strong>Rates below are the base hourly rate.</strong> Package fees and crew fees are added separately (see below).</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-3 py-2 text-left text-xs font-semibold">Boat</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold">Capacity</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold">Mon–Thu</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold">Friday</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold bg-amber-700">Saturday ★</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold">Sunday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { boat: 'Day Tripper', seats: '14 comfortably / 14 max', monThu: '$200/hr', fri: '$225/hr', sat: '$350/hr', sun: '$250/hr' },
                  { boat: 'Meeseeks / The Irony', seats: '20 comfortably / 30 max', monThu: '$225/hr', fri: '$250/hr', sat: '$375/hr', sun: '$275/hr' },
                  { boat: 'Clever Girl', seats: '30 comfortably / 75 max', monThu: '$250/hr', fri: '$275/hr', sat: '$400/hr', sun: '$300/hr' },
                ].map(row => (
                  <tr key={row.boat} className="bg-white even:bg-gray-50">
                    <td className="px-3 py-2.5 font-medium text-gray-900 text-xs">{row.boat}</td>
                    <td className="px-3 py-2.5 text-xs text-gray-500">{row.seats}</td>
                    <td className="px-3 py-2.5 text-center text-xs font-mono text-gray-800">{row.monThu}</td>
                    <td className="px-3 py-2.5 text-center text-xs font-mono text-gray-800">{row.fri}</td>
                    <td className="px-3 py-2.5 text-center text-xs font-mono text-gray-800 bg-amber-50 font-semibold">{row.sat}</td>
                    <td className="px-3 py-2.5 text-center text-xs font-mono text-gray-800">{row.sun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-800 mb-1">Saturday premium</p>
            <p className="text-xs text-amber-700">Saturday rates are significantly higher (~55% above Mon–Thu). This is intentional — Saturdays are peak demand. When customers ask why Saturday is more expensive, this is the answer.</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-blue-800 mb-1 flex items-center gap-1"><Users className="h-3 w-3" /> Crew fee for large groups</p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• <strong>26–30 guests</strong> on Meeseeks/Irony: +$50/hr extra crew fee</li>
              <li>• <strong>51–75 guests</strong> on Clever Girl: +$100/hr extra crew fee</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Package Upgrades */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            Private Charter Package Upgrades (Flat Fee per Cruise)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">All private charters start with the Standard package. Customers can upgrade to Essentials or Ultimate for a flat fee added on top of the base hourly cost.</p>

          <div className="grid gap-4">
            {[
              {
                name: 'Standard',
                fee: 'Included',
                color: 'gray',
                includes: ['Captain & crew', 'Premium Bluetooth speaker', 'Clean restroom facilities', 'Sun & shade areas', '2 large empty coolers (BYOB — bring your own ice & drinks)'],
              },
              {
                name: 'Essentials',
                fee: '$100–$200 flat (by group size)',
                feeBrief: '1–14 guests: +$100 · 15–30 guests: +$150 · 31–75 guests: +$200',
                color: 'blue',
                includes: ['Everything in Standard', '5-gallon insulated water dispenser', '15–20 gallons fresh water + cups', 'Coolers pre-stocked with 40–60 lbs of ice', '6-ft folding table for food & drinks'],
                popular: true,
              },
              {
                name: 'Ultimate',
                fee: '$250–$350 flat (by group size)',
                feeBrief: '1–14 guests: +$250 · 15–30 guests: +$300 · 31–75 guests: +$350',
                color: 'amber',
                includes: ['Everything in Essentials', 'Giant 6\'×20\' lily pad float(s)', 'Unicorn or ring float for guest of honor', '5–10 disco ball cups', 'Bubble guns & wands', 'Champagne flutes & fruit juices', 'SPF-50 spray sunscreen bottles', '3 disco balls installed'],
              },
            ].map(pkg => (
              <div key={pkg.name} className={`border rounded-lg p-4 ${pkg.color === 'amber' ? 'border-amber-200 bg-amber-50' : pkg.color === 'blue' ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">{pkg.name}</span>
                  {pkg.popular && <Badge className="bg-blue-600 text-white text-xs">Most Popular</Badge>}
                  <span className="ml-auto text-sm font-mono font-semibold text-gray-800">{pkg.fee}</span>
                </div>
                {pkg.feeBrief && <p className="text-xs text-gray-500 mb-2">{pkg.feeBrief}</p>}
                <ul className="text-xs text-gray-700 space-y-1">
                  {pkg.includes.map(item => (
                    <li key={item} className="flex gap-1.5 items-start">
                      <CheckCircle2 className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add-ons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-purple-600" />
            Add-On Fees (All Flat Rate per Cruise)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
            {[
              { item: 'Professional DJ', price: '$600', notes: 'Full 4-hour set. Available on private charters only — already included on ATX Disco Cruise.' },
              { item: 'Professional Photographer', price: '$600', notes: 'Photos delivered after the cruise. FREE on ATX Disco Cruise. Add-on for private charters.' },
              { item: 'Giant Lily Pad Float', price: '$50', notes: 'Per float. Some packages include them — check Ultimate package inclusions first.' },
            ].map(row => (
              <div key={row.item} className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="font-medium text-gray-900 text-sm w-48 shrink-0">{row.item}</span>
                <span className="font-mono font-bold text-gray-800 text-sm w-16 shrink-0">{row.price}</span>
                <span className="text-xs text-gray-500">{row.notes}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-red-800 mb-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> DJ pricing rule</p>
            <p className="text-xs text-red-700">The DJ add-on is always $600 flat. Never write "$300–$500" or any range. Never say "starting at." The price is $600, period. This was corrected site-wide in April 2026 after a pricing audit.</p>
          </div>
        </CardContent>
      </Card>

      {/* Deposit Policy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-600" />
            Deposit Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <p className="font-semibold text-gray-900 text-sm mb-1">14+ days before event</p>
              <p className="text-2xl font-bold text-gray-900">25%</p>
              <p className="text-xs text-gray-500 mt-1">deposit required to hold the date</p>
            </div>
            <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
              <p className="font-semibold text-gray-900 text-sm mb-1">Less than 14 days before event</p>
              <p className="text-2xl font-bold text-amber-700">50%</p>
              <p className="text-xs text-gray-500 mt-1">deposit required (urgent booking)</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">The deposit policy is enforced automatically in the booking system based on the event date. The remaining balance is due before or on the cruise date.</p>
        </CardContent>
      </Card>

      {/* Pricing Sanity Rules */}
      <Card className="border-gray-300">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-gray-800">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            Pricing Rules — What Must Never Change Without a Decision
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[
              'ATX Disco Cruise prices (Fri $95, Sat AM $105, Sat PM $85) are the only correct prices. Do not adjust these in copy without confirming with the operator.',
              'Private charter "from" pricing advertised publicly is: Day Tripper from $200/hr, Meeseeks from $225/hr, Clever Girl from $250/hr. These are Mon–Thu base rates.',
              'DJ is always $600 flat. Never a range, never "starting at," never per hour.',
              'Photographer is always $600 flat on private charters. It is FREE and included on the ATX Disco Cruise.',
              'The Essentials and Ultimate package fees scale with group size — never advertise a single flat fee without specifying the group size tier.',
              'Saturday rates are premium — do not advertise Saturday private charter pricing without making the day explicit.',
              'All ATX Disco Cruise prices are all-in (tax + gratuity included). Private charter pricing does NOT include tax and gratuity — those are added at checkout.',
              'Source of truth for all pricing: shared/constants.ts. If copy anywhere on the site conflicts with that file, the file wins.',
            ].map((rule, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-red-500 font-bold shrink-0 text-xs mt-0.5">!</span>
                <span className="text-sm text-gray-800 leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function SiteSummary() {
  const pages = [
    { key: 'home', label: 'Home', data: HOME_PAGE },
    { key: 'bachelor', label: 'Bachelor Party', data: BACHELOR_PAGE },
    { key: 'bachelorette', label: 'Bachelorette Party', data: BACHELORETTE_PAGE },
    { key: 'atx-disco', label: 'ATX Disco Cruise', data: ATX_DISCO_PAGE },
    { key: 'private', label: 'Private Cruises', data: PRIVATE_CRUISES_PAGE },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNoIndex />
      <div className="max-w-5xl mx-auto px-4 py-8">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Site Summary</h1>
            <Badge variant="outline" className="text-xs">Admin Reference</Badge>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
            This page documents every section of the site: what is on each page, what component renders it, and why it exists. 
            Use this as a reference before making edits — especially before removing or restructuring sections that have SEO value.
            Content rules and non-negotiables are called out in red for each page.
          </p>
          <div className="mt-3 flex items-start gap-2 text-xs bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 max-w-3xl">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
            <span className="text-blue-800">
              <strong>Hub pages</strong> (marked with a badge) are the three sources of truth for the site: 
              <code className="mx-1 bg-blue-100 px-1 rounded">/bachelorette-party-austin</code>
              <code className="mx-1 bg-blue-100 px-1 rounded">/bachelor-party-austin</code>
              <code className="mx-1 bg-blue-100 px-1 rounded">/atx-disco-cruise</code>. 
              All other pages and blogs should link to these — not the other way around.
            </span>
          </div>
        </div>

        <Tabs defaultValue="seo">
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="seo" className="text-sm">SEO Strategy</TabsTrigger>
            <TabsTrigger value="pricing" className="text-sm">Pricing Reference</TabsTrigger>
            <TabsTrigger value="handoff" className="text-sm">Claude Handoff</TabsTrigger>
            {pages.map(p => (
              <TabsTrigger key={p.key} value={p.key} className="text-sm">
                {p.label}
                {p.data.hub && <span className="ml-1.5 text-amber-500">★</span>}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="handoff">
            <ClaudeHandoffTab />
          </TabsContent>

          <TabsContent value="seo">
            <SeoStrategyTab />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingReferenceTab />
          </TabsContent>

          {pages.map(p => (
            <TabsContent key={p.key} value={p.key}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{p.data.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <PageDocCard page={p.data} />
                </CardContent>
              </Card>

              {p.key === 'atx-disco' && (
                <div className="mt-6 space-y-6">

                  {/* SCHEDULE */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        Weekly &amp; Yearly Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm font-semibold text-blue-900">Season: March through October only — NO winter cruises</p>
                        <p className="text-xs text-blue-700 mt-1">Approximately 35 weeks × 3 cruise slots = ~105 cruise dates per season. All bookings go through Xola for live availability.</p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="text-left p-3 font-semibold border border-gray-200">Day</th>
                              <th className="text-left p-3 font-semibold border border-gray-200">Time Slot</th>
                              <th className="text-left p-3 font-semibold border border-gray-200">Base Price</th>
                              <th className="text-left p-3 font-semibold border border-gray-200">All-In Price (tax + grat)</th>
                              <th className="text-left p-3 font-semibold border border-gray-200">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { day: 'Friday', slot: '12:00 PM – 4:00 PM', base: '$95/person', allin: '~$124.88/person', notes: 'Midday slot. Great for groups arriving Thu/Fri.' },
                              { day: 'Saturday', slot: '11:00 AM – 3:00 PM', base: '$105/person', allin: '~$137.81/person', notes: 'BEST slot — highest demand, books first. Peak energy, most groups on water.' },
                              { day: 'Saturday', slot: '3:30 PM – 7:30 PM', base: '$85/person', allin: '~$111.56/person', notes: 'FUN! slot — sunset timing, slightly lower price. Great value.' },
                            ].map((row, i) => (
                              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-3 border border-gray-200 font-medium">{row.day}</td>
                                <td className="p-3 border border-gray-200 font-mono text-xs">{row.slot}</td>
                                <td className="p-3 border border-gray-200 font-semibold text-green-700">{row.base}</td>
                                <td className="p-3 border border-gray-200 text-gray-600 text-xs">{row.allin}</td>
                                <td className="p-3 border border-gray-200 text-gray-600 text-xs">{row.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 space-y-1">
                        <p><strong>Pricing rule:</strong> Always show the base per-person price (e.g. "$95/person"). Never say "plus tax" or "plus gratuity" — that implies hidden fees. Tax (8.25%) and gratuity (20%) are baked into the all-in total. The all-in total is only shown when providing a full breakdown.</p>
                        <p><strong>Sunday / Mon–Thu:</strong> No public ATX Disco Cruise slots run on these days. Private charters are available but that is a different product entirely.</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* WHAT'S INCLUDED — EVERY TICKET */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        What's Included with Every ATX Disco Cruise Ticket
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">These items are included in the base ticket price regardless of party type or day of week. No upgrades required.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { item: 'Professional DJ', detail: "Some of the best DJs in Austin — party vibes all day, not all-disco. Takes requests (and bribes work)." },
                          { item: 'Professional Photographer', detail: "On board for the entire cruise. Digital gallery delivered via link 2–3 weeks after the cruise. High-quality photos, included, no upsell." },
                          { item: 'Giant Unicorn Float', detail: "Massive group float(s) for lounging on the water. Inflated before you board. Shared by all groups." },
                          { item: 'Lily Pad Float', detail: "Large platform float for jumping, lounging, and swimming." },
                          { item: 'Shared Coolers with Ice', detail: "Every group gets a private cooler bin stocked with ice. BYOB — bring beer (cans), wine, champagne, and spirits (no glass beer bottles)." },
                          { item: 'Cups & Koozies', detail: "Standard party cups and branded koozies for every guest." },
                          { item: 'Bubble Wands', detail: "Bubble wands for the party — included in the base ticket, extras in add-on packages." },
                          { item: 'Ice Water Stations', detail: "Unlimited cold water on board. Texas summer hydration is non-negotiable." },
                          { item: 'Clean Restroom', detail: "Full restroom facilities on the Clever Girl. No port-a-potties." },
                          { item: 'Plenty of Shade', detail: "Covered deck areas to escape direct Texas sun between swims." },
                          { item: 'Name Tags', detail: "Set up before boarding. Helps groups mingle across different parties — part of the multi-group energy." },
                          { item: 'Disco Ball Necklace (guest of honor)', detail: "Disco Ball Necklace for the Bride (bachelorette), Groom (bachelor), or both Bride & Groom (combined party). Party type–specific." },
                          { item: 'Captain & Crew', detail: "licensed, experienced captain. 15+ year perfect safety record. Crew handles all logistics so your group focuses on the party." },
                          { item: 'Multi-Group Energy', detail: "The boat is shared with other bachelor and bachelorette parties from across the country. The shared vibe is a feature, not a bug — groups bond over the celebration." },
                          { item: 'Rain Backup Plan', detail: "If weather cancels the lake cruise, the party moves to Premier Party Cruises' downtown Austin venue — same DJ, same energy, no refund drama." },
                        ].map((row, i) => (
                          <div key={i} className="flex gap-2 items-start p-2 bg-green-50 border border-green-100 rounded-lg">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-semibold text-gray-800">{row.item}</p>
                              <p className="text-xs text-gray-600 leading-relaxed">{row.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-800">
                        <strong>Critical:</strong> DJ and photographer are INCLUDED on the ATX Disco Cruise. Never list them as add-ons or imply extra cost. The $600 DJ fee and $600 photographer fee apply ONLY to private charters.
                      </div>
                    </CardContent>
                  </Card>

                  {/* ADD-ON PACKAGES */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Gift className="h-4 w-4 text-purple-600" />
                        Add-On Packages — Optional Upgrades by Party Type
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <p className="text-sm text-gray-600">All add-ons are flat fees per cruise (not per person). A group of 20 pays the same as a group of 8 for the add-on. Booked through the Xola widget or quote builder. Available for any time slot.</p>

                      {/* Bachelor Add-Ons */}
                      <div>
                        <p className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                          <span className="text-blue-600">♂</span> Bachelor Party Add-Ons
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            {
                              name: 'Mimosa Party Cooler',
                              price: '$100 flat',
                              inclusions: ['Extra cooler w/ice', '3 fruit juices', 'Champagne flutes', 'Chambong', '3 bubble wands'],
                              tip: 'Best for groups who want mimosas without the planning. Eliminates the need to bring your own OJ and flutes.',
                            },
                            {
                              name: 'Groom Manly Sparkle Package',
                              price: '$100 flat',
                              inclusions: ['Disco ball cup for the groom (rainbow recommended)', 'Disco ball necklaces for the ENTIRE crew', '"Bad Day to Be a Beer" flag', 'SPF-50 Spray Sunscreen (1 bottle per 5 guests)', 'PERSONAL unicorn float for the groom only'],
                              tip: 'Popular — the personal unicorn float for the groom is the main draw. Necklaces for everyone is a crowd-pleaser.',
                            },
                          ].map((pkg, i) => (
                            <div key={i} className="border border-blue-200 rounded-lg p-3 bg-blue-50">
                              <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-semibold text-gray-900">{pkg.name}</p>
                                <span className="text-sm font-bold text-green-700 shrink-0 ml-2">{pkg.price}</span>
                              </div>
                              <ul className="space-y-1 mb-2">
                                {pkg.inclusions.map((item, j) => (
                                  <li key={j} className="flex gap-1.5 items-start text-xs text-gray-700">
                                    <span className="text-blue-500 shrink-0">•</span>{item}
                                  </li>
                                ))}
                              </ul>
                              <p className="text-xs text-blue-700 italic">{pkg.tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bachelorette Add-Ons */}
                      <div>
                        <p className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                          <span className="text-pink-500">♀</span> Bachelorette Party Add-Ons
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            {
                              name: 'Mimosa Party Cooler',
                              price: '$100 flat',
                              inclusions: ['Extra cooler w/ice', '3 fruit juices', 'Champagne flutes', 'Chambong', '3 bubble wands'],
                              tip: 'Same as the bachelor version. Extremely popular for bachelorette groups who want the mimosa setup handled.',
                            },
                            {
                              name: 'Bride Sparkle Package',
                              price: '$100 flat',
                              inclusions: ['Disco ball cup for the bride', 'Bubble gun for the bride', 'Disco bopper headband for the bride', 'PERSONAL unicorn float for the bride only', 'SPF-50 Spray Sunscreen (1 bottle per 5 guests)', 'Disco ball necklaces for the ENTIRE group'],
                              tip: 'Most popular bachelorette add-on. The personal float for the bride is the hero item. Necklaces for everyone elevates the whole group.',
                            },
                          ].map((pkg, i) => (
                            <div key={i} className="border border-pink-200 rounded-lg p-3 bg-pink-50">
                              <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-semibold text-gray-900">{pkg.name}</p>
                                <span className="text-sm font-bold text-green-700 shrink-0 ml-2">{pkg.price}</span>
                              </div>
                              <ul className="space-y-1 mb-2">
                                {pkg.inclusions.map((item, j) => (
                                  <li key={j} className="flex gap-1.5 items-start text-xs text-gray-700">
                                    <span className="text-pink-400 shrink-0">•</span>{item}
                                  </li>
                                ))}
                              </ul>
                              <p className="text-xs text-pink-700 italic">{pkg.tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Combined Add-Ons */}
                      <div>
                        <p className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                          <span className="text-purple-600">⚭</span> Combined Bachelor + Bachelorette Add-Ons
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            {
                              name: 'Mimosa Party Cooler',
                              price: '$100 flat',
                              inclusions: ['Extra cooler w/ice', '3 fruit juices', 'Champagne flutes', 'Chambong', '3 bubble wands'],
                              tip: 'Same item, same price — works equally well for combined groups.',
                            },
                            {
                              name: 'Sparkle Together Package',
                              price: '$150 flat',
                              inclusions: ['Disco ball cup for the BRIDE AND GROOM', 'Disco ball necklaces for the ENTIRE crew', '"Bad Day to Be a Beer" flag', 'SPF-50 Spray Sunscreen (1 bottle per 5 guests)', 'PERSONAL unicorn floats for BOTH bride and groom', '(2) Bubble guns for the bride & groom', 'Disco bopper headband for the bride'],
                              tip: 'The combined version bundles both sparkle packages into one. $150 vs. $200 for buying both separately — better deal for combined parties. Two personal floats (bride + groom) is the star feature.',
                            },
                          ].map((pkg, i) => (
                            <div key={i} className="border border-purple-200 rounded-lg p-3 bg-purple-50">
                              <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-semibold text-gray-900">{pkg.name}</p>
                                <span className="text-sm font-bold text-green-700 shrink-0 ml-2">{pkg.price}</span>
                              </div>
                              <ul className="space-y-1 mb-2">
                                {pkg.inclusions.map((item, j) => (
                                  <li key={j} className="flex gap-1.5 items-start text-xs text-gray-700">
                                    <span className="text-purple-400 shrink-0">•</span>{item}
                                  </li>
                                ))}
                              </ul>
                              <p className="text-xs text-purple-700 italic">{pkg.tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 space-y-1">
                        <p className="font-semibold">When writing copy about add-ons:</p>
                        <p>• Always describe them as flat-fee per cruise, not per person — this is a key selling point for larger groups</p>
                        <p>• Emphasize that the personal unicorn float for the guest of honor makes them feel like the star of the show — that is the emotional hook for the Sparkle packages</p>
                        <p>• SPF-50 spray sunscreen is part of the Sparkle packages — do NOT describe it as a standalone purchase available on the boat (it is not sold separately)</p>
                        <p>• The Chambong is included in every Mimosa Party Cooler — mention it when describing that package to groups who want a playful activity item</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* BYOB POLICY */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        BYOB Policy — Glass, Cans, and What's Not Allowed
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-xs font-semibold text-green-800 mb-2 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> ALLOWED</p>
                          <ul className="text-xs text-green-800 space-y-1">
                            <li>• Beer and seltzers in cans</li>
                            <li>• Wine in bottles (glass bottles are fine if kept in cooler)</li>
                            <li>• Champagne / prosecco in glass bottles (cooler)</li>
                            <li>• Spirits / liquor in glass bottles (cooler)</li>
                            <li>• Spray sunscreen (apply at the rails, not mid-deck)</li>
                            <li>• Food and snacks</li>
                          </ul>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-xs font-semibold text-red-800 mb-2 flex items-center gap-1"><XCircle className="h-3 w-3" /> NOT ALLOWED</p>
                          <ul className="text-xs text-red-800 space-y-1">
                            <li>• Glass beer bottles (beer must be in cans)</li>
                            <li>• Anything too messy — our boats are really nice, help us keep 'em that way</li>
                            <li>• Guests under 21 drinking alcohol</li>
                            <li>• Straight hard liquor poured directly (mix it)</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                        <strong>Party On Delivery:</strong> Groups can order alcohol delivered directly to the marina parking lot at 13993 FM 2769, Leander, TX 78641. Drinks arrive pre-chilled and ready to load into coolers. Party On Delivery offers 1-hour delivery windows, free consultations, and 100% buyback on unopened bottles — popular option for groups who do not want to coordinate a Costco run. Link: <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">partyondelivery.com</a>
                      </div>
                    </CardContent>
                  </Card>

                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
