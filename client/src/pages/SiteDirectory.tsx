import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import PublicNavigation from "@/components/PublicNavigation";
import Footer from "@/components/Footer";

interface PageLink {
  url: string;
  title: string;
}

interface PageSection {
  title: string;
  pages: PageLink[];
}

const siteStructure: PageSection[] = [
  {
    title: "Main Pages",
    pages: [
      { url: "/", title: "Home" },
      { url: "/atx-disco-cruise", title: "ATX Disco Cruise" },
      { url: "/private-cruises", title: "Private Cruises" },
      { url: "/gallery", title: "Photo Gallery" },
      { url: "/contact", title: "Contact Us" },
      { url: "/faq", title: "FAQ" },
      { url: "/chat", title: "Get a Quote" },
      { url: "/book-now", title: "Book Now" },
      { url: "/pricing-breakdown", title: "Pricing Breakdown" },
      { url: "/testimonials-faq", title: "Testimonials & FAQ" },
    ],
  },
  {
    title: "Bachelor & Bachelorette Parties",
    pages: [
      { url: "/bachelor-party-austin", title: "Bachelor Party Austin" },
      { url: "/bachelorette-party-austin", title: "Bachelorette Party Austin" },
      { url: "/combined-bachelor-bachelorette-austin", title: "Combined Bachelor/Bachelorette Parties" },
    ],
  },
  {
    title: "Wedding Events",
    pages: [
      { url: "/wedding-parties", title: "Wedding Parties" },
      { url: "/rehearsal-dinner", title: "Rehearsal Dinner" },
      { url: "/welcome-party", title: "Welcome Party" },
      { url: "/after-party", title: "After Party" },
    ],
  },
  {
    title: "Corporate Events",
    pages: [
      { url: "/corporate-events", title: "Corporate Events" },
      { url: "/team-building", title: "Team Building" },
      { url: "/client-entertainment", title: "Client Entertainment" },
      { url: "/company-milestone", title: "Company Milestone" },
    ],
  },
  {
    title: "Birthday & Celebrations",
    pages: [
      { url: "/birthday-parties", title: "Birthday Parties" },
      { url: "/milestone-birthday", title: "Milestone Birthday" },
      { url: "/sweet-16", title: "Sweet 16" },
      { url: "/graduation-party", title: "Graduation Party" },
    ],
  },
  {
    title: "Guides & Resources",
    pages: [
      { url: "/party-boat-austin", title: "Party Boat Austin" },
      { url: "/party-boat-lake-travis", title: "Party Boat Lake Travis" },
      { url: "/first-time-lake-travis-boat-rental-guide", title: "First-Time Lake Travis Boat Rental Guide" },
      { url: "/ultimate-austin-bachelorette-weekend", title: "Ultimate Austin Bachelorette Weekend" },
      { url: "/top-10-austin-bachelorette-ideas", title: "Top 10 Austin Bachelorette Ideas" },
      { url: "/3-day-austin-bachelorette-itinerary", title: "3-Day Austin Bachelorette Itinerary" },
      { url: "/budget-austin-bachelorette", title: "Budget Austin Bachelorette" },
      { url: "/luxury-austin-bachelorette", title: "Luxury Austin Bachelorette" },
      { url: "/adventure-austin-bachelorette", title: "Adventure Austin Bachelorette" },
      { url: "/austin-bachelorette-nightlife", title: "Austin Bachelorette Nightlife" },
      { url: "/austin-bachelor-party-ideas", title: "Austin Bachelor Party Ideas" },
      { url: "/lake-travis-bachelor-party-boats", title: "Lake Travis Bachelor Party Boats" },
    ],
  },
  {
    title: "Monthly Bachelor Party Guides",
    pages: [
      { url: "/blogs/austin-bachelor-party-january", title: "Austin Bachelor Party in January" },
      { url: "/blogs/austin-bachelor-party-march", title: "Austin Bachelor Party in March" },
      { url: "/blogs/austin-bachelor-party-may", title: "Austin Bachelor Party in May" },
      { url: "/blogs/austin-bachelor-party-july", title: "Austin Bachelor Party in July" },
      { url: "/blogs/austin-bachelor-party-september", title: "Austin Bachelor Party in September" },
      { url: "/blogs/austin-bachelor-party-november", title: "Austin Bachelor Party in November" },
    ],
  },
  {
    title: "Monthly Bachelorette Party Guides",
    pages: [
      { url: "/blogs/austin-bachelorette-party-february", title: "Austin Bachelorette Party in February" },
      { url: "/blogs/austin-bachelorette-party-april", title: "Austin Bachelorette Party in April" },
      { url: "/blogs/austin-bachelorette-party-june", title: "Austin Bachelorette Party in June" },
      { url: "/blogs/austin-bachelorette-party-august", title: "Austin Bachelorette Party in August" },
      { url: "/blogs/austin-bachelorette-party-october", title: "Austin Bachelorette Party in October" },
      { url: "/blogs/austin-bachelorette-party-december", title: "Austin Bachelorette Party in December" },
    ],
  },
  {
    title: "Blog Articles",
    pages: [
      { url: "/blogs", title: "All Blog Posts" },
      { url: "/blogs/atx-disco-cruise-experience", title: "ATX Disco Cruise Experience" },
      { url: "/blogs/how-to-throw-great-bachelor-party-austin", title: "How to Throw a Great Bachelor Party in Austin" },
      { url: "/blogs/how-to-throw-great-bachelorette-party-austin", title: "How to Throw a Great Bachelorette Party in Austin" },
      { url: "/blogs/perfect-bachelor-party-itinerary-austin", title: "Perfect Bachelor Party Itinerary Austin" },
      { url: "/blogs/why-choose-austin-bachelor-party", title: "Why Choose Austin for Your Bachelor Party" },
      { url: "/blogs/why-choose-austin-bachelorette-party", title: "Why Choose Austin for Your Bachelorette Party" },
      { url: "/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend", title: "Must-Haves for the Perfect Austin Bachelorette Weekend" },
      { url: "/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience", title: "Top Spots & Tips for Austin Bachelorette Parties" },
      { url: "/blogs/lake-travis-bachelor-party-austin-celebrations", title: "Lake Travis Bachelor Party Celebrations" },
      { url: "/blogs/lake-travis-bachelor-party-boat-rentals-the-ultimate-guide-to-epic-celebrations", title: "Lake Travis Bachelor Party Boat Rentals Guide" },
      { url: "/blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations", title: "Lake Travis Wedding Boat Rentals" },
      { url: "/blogs/lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion", title: "Lake Travis Sunset Cruises" },
      { url: "/blogs/lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials", title: "Lake Travis Boat Party Reviews" },
      { url: "/blogs/lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing", title: "Lake Travis Boat Party Packages" },
      { url: "/blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide", title: "Lake Travis Boat Party Logistics" },
      { url: "/blogs/lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning", title: "Lake Travis Boat Party Costs" },
      { url: "/blogs/lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises", title: "Lake Travis Boat Safety Guidelines" },
      { url: "/blogs/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties", title: "Lake Travis Weather Planning" },
      { url: "/blogs/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests", title: "Lake Travis Party Boat Rentals for Large Groups" },
      { url: "/blogs/holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination", title: "Holiday Celebrations on Lake Travis" },
      { url: "/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises", title: "Joint Bachelor/Bachelorette Parties" },
      { url: "/blogs/birthday-party-boat-rentals-on-lake-travis-milestone-celebrations-with-a-view", title: "Birthday Party Boat Rentals on Lake Travis" },
      { url: "/blogs/corporate-team-building-on-lake-travis-professional-boat-rental-solutions", title: "Corporate Team Building on Lake Travis" },
      { url: "/blogs/accessible-lake-travis-boat-parties-inclusive-event-planning-for-all-guests", title: "Accessible Lake Travis Boat Parties" },
      { url: "/blogs/creative-lake-travis-boat-party-themes-unique-ideas-for-memorable-celebrations", title: "Creative Lake Travis Boat Party Themes" },
      { url: "/blogs/disco-cruise-fashion-part-1", title: "Disco Cruise Fashion Guide" },
      { url: "/blogs/the-recipe-for-the-chillest-atx-bach-party", title: "Recipe for the Chillest ATX Bach Party" },
      { url: "/blogs/the-top-dos-and-dont-for-success-on-the-atx-disco-cruise-with-premier-party-cruises", title: "Top Dos and Don'ts for ATX Disco Cruise" },
    ],
  },
  {
    title: "BYOB & Alcohol Guides",
    pages: [
      { url: "/blogs/the-ultimate-austin-bachelorette-party-alcohol-guide-what-to-order-when-to-order-and-how-much-you-actually-need", title: "Ultimate Bachelorette Party Alcohol Guide" },
      { url: "/blogs/lake-travis-bachelorette-party-alcohol-laws-what-you-can-and-cant-bring-on-boats", title: "Lake Travis Alcohol Laws for Boats" },
      { url: "/blogs/lake-travis-bachelor-party-alcohol-delivery-complete-coordination-guide-for-boat-parties", title: "Bachelor Party Alcohol Delivery Guide" },
      { url: "/blogs/austin-bachelorette-bliss-spa-retreats-disco-cruises-alcohol-delivery", title: "Austin Bachelorette Bliss Guide" },
      { url: "/blogs/austin-bachelorette-weekend-alcohol-timeline-day-by-day-drinking-strategy-for-multi-day-celebrations", title: "Bachelorette Weekend Alcohol Timeline" },
      { url: "/blogs/bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions", title: "Bachelorette Party Alcohol Emergency Kit" },
      { url: "/blogs/budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank", title: "Budget-Friendly Party Alcohol Guide" },
      { url: "/blogs/cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy", title: "Cocktail Kits vs Individual Bottles" },
      { url: "/blogs/instagram-worthy-bachelorette-party-cocktails-recipes-and-delivery-coordination", title: "Instagram-Worthy Party Cocktails" },
      { url: "/blogs/party-alcohol-safety-in-austin-responsible-service-and-guest-well-being", title: "Party Alcohol Safety in Austin" },
      { url: "/blogs/austin-party-venue-alcohol-delivery-navigating-policies-and-logistics", title: "Austin Party Venue Alcohol Delivery" },
      { url: "/blogs/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy", title: "Birthday Party Alcohol Delivery Austin" },
      { url: "/blogs/graduation-party-alcohol-planning-ut-and-austin-college-celebrations", title: "Graduation Party Alcohol Planning" },
    ],
  },
  {
    title: "Corporate & Event Planning",
    pages: [
      { url: "/blogs/corporate-team-building-on-lake-travis-alcohol-coordination-for-professional-events", title: "Corporate Team Building Alcohol Coordination" },
      { url: "/blogs/client-entertainment-alcohol-strategy-impressing-without-overdoing-it", title: "Client Entertainment Alcohol Strategy" },
      { url: "/blogs/executive-retreat-alcohol-planning-balancing-professionalism-and-team-bonding", title: "Executive Retreat Alcohol Planning" },
      { url: "/blogs/conference-after-party-alcohol-coordination-sxsw-acl-and-austin-event-integration", title: "Conference After-Party Coordination" },
      { url: "/blogs/holiday-office-party-alcohol-delivery-stress-free-corporate-celebration-planning", title: "Holiday Office Party Alcohol Delivery" },
      { url: "/blogs/startup-celebration-alcohol-packages-funding-rounds-launches-and-milestone-events", title: "Startup Celebration Alcohol Packages" },
    ],
  },
  {
    title: "Wedding Planning",
    pages: [
      { url: "/blogs/austin-wedding-venue-alcohol-policies-delivery-solutions-for-every-location", title: "Austin Wedding Venue Alcohol Policies" },
      { url: "/blogs/outdoor-wedding-alcohol-logistics-hill-country-and-lake-travis-coordination", title: "Outdoor Wedding Alcohol Logistics" },
      { url: "/blogs/rehearsal-dinner-boat-alcohol-delivery-unique-wedding-weekend-experiences", title: "Rehearsal Dinner Boat Alcohol Delivery" },
      { url: "/blogs/wedding-party-alcohol-coordination-getting-ready-bachelor-bachelorette-and-reception", title: "Wedding Party Alcohol Coordination" },
    ],
  },
  {
    title: "Special & Seasonal Events",
    pages: [
      { url: "/blogs/holiday-party-alcohol-themes-new-years-fourth-of-july-and-austin-celebrations", title: "Holiday Party Alcohol Themes" },
      { url: "/blogs/pool-party-alcohol-coordination-summer-event-planning-in-austin-heat", title: "Pool Party Alcohol Coordination" },
      { url: "/blogs/integrated-austin-event-services-combining-alcohol-delivery-and-boat-rentals-for-perfect-celebrations", title: "Integrated Austin Event Services" },
      { url: "/blogs/why-choose-integrated-event-services-comparing-austin-party-planning-options", title: "Why Choose Integrated Event Services" },
    ],
  },
  {
    title: "Boat Information",
    pages: [
      { url: "/blogs/lake-travis-boat-party-catering-food-and-beverage-coordination-for-perfect-events", title: "Lake Travis Boat Party Catering" },
      { url: "/blogs/lake-travis-boat-party-entertainment-activities-and-amenities-for-unforgettable-events", title: "Lake Travis Boat Party Entertainment" },
      { url: "/blogs/lake-travis-boat-party-music-sound-systems-and-entertainment-coordination", title: "Lake Travis Boat Party Music & Sound" },
      { url: "/blogs/lake-travis-boat-party-photography-capturing-perfect-memories-on-the-water", title: "Lake Travis Boat Party Photography" },
      { url: "/blogs/lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events", title: "Lake Travis Boat Party Insurance" },
      { url: "/blogs/lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide", title: "Lake Travis Boat Party Regulations" },
      { url: "/blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises", title: "Lake Travis Boat Safety & Maintenance" },
      { url: "/blogs/austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations", title: "Austin Bachelorette Party Boats" },
    ],
  },
  {
    title: "Comparison & Decision Guides",
    pages: [
      { url: "/blogs/why-atx-disco-cruise-austins-most-booked-party-boat-experience", title: "Why ATX Disco Cruise Is Austin's Most Booked Party Boat" },
      { url: "/blogs/private-party-cruise-vs-party-boat-pontoon-lake-travis", title: "Private Cruise vs Party Boat vs Pontoon" },
      { url: "/blogs/private-charter-vs-atx-disco-cruise-which-austin-party-boat", title: "Private Charter vs ATX Disco Cruise" },
      { url: "/blogs/lake-travis-party-boat-vs-downtown-night-out-austin-bachelor", title: "Party Boat vs Downtown Night Out" },
      { url: "/blogs/austin-bachelorette-party-vs-lake-travis-boat-why-lake-wins", title: "Bachelorette Party vs Lake Travis Boat" },
      { url: "/blogs/ultimate-austin-party-boat-experience-any-celebration", title: "Ultimate Austin Party Boat Experience" },
      { url: "/blogs/top-10-reasons-austin-bachelor-party-lake-travis-boat", title: "Top 10 Reasons for Lake Travis Bachelor Party" },
      { url: "/blogs/corporate-boat-parties-austin-lake-travis-smartest-venue", title: "Corporate Boat Parties Austin" },
      { url: "/blogs/safest-austin-bachelor-party-lake-travis-party-boat", title: "Safest Austin Bachelor Party on Lake Travis" },
      { url: "/blogs/why-licensed-captains-matter-lake-travis-party-boats", title: "Why Licensed Captains Matter" },
    ],
  },
  {
    title: "Corporate Event Guides",
    pages: [
      { url: "/blogs/all-inclusive-corporate-packages-austin", title: "All-Inclusive Corporate Packages Austin" },
      { url: "/blogs/why-austin-companies-choose-premier", title: "Why Austin Companies Choose Premier" },
      { url: "/blogs/tech-companies-boat-parties-austin", title: "Tech Companies Boat Parties Austin" },
      { url: "/blogs/finance-law-firms-boat-parties-austin", title: "Finance & Law Firms Boat Parties" },
      { url: "/blogs/real-estate-client-entertainment-boat-austin", title: "Real Estate Client Entertainment" },
      { url: "/blogs/healthcare-wellness-boat-parties-austin", title: "Healthcare & Wellness Boat Parties" },
      { url: "/blogs/marketing-creative-agencies-boat-austin", title: "Marketing & Creative Agencies Boat Parties" },
      { url: "/blogs/construction-trades-boat-parties-austin", title: "Construction & Trades Boat Parties" },
      { url: "/blogs/small-business-boat-parties-austin", title: "Small Business Boat Parties" },
      { url: "/blogs/dallas-to-lake-travis-corporate", title: "Dallas to Lake Travis Corporate Events" },
      { url: "/blogs/destination-austin-offsite-retreats", title: "Destination Austin Offsite Retreats" },
      { url: "/blogs/austin-suburbs-corporate-events", title: "Austin Suburbs Corporate Events" },
      { url: "/blogs/company-holiday-party-lake-travis", title: "Company Holiday Party Lake Travis" },
      { url: "/blogs/quarterly-outings-lake-travis-make-routine-company-events-easy", title: "Quarterly Outings Lake Travis" },
      { url: "/blogs/employee-appreciation-day-reward-your-team-with-an-easy-all-inclusive-boat-party", title: "Employee Appreciation Day Boat Party" },
      { url: "/blogs/large-group-events-lake-travis", title: "Large Group Events Lake Travis" },
      { url: "/blogs/company-party-10-people-austin", title: "Company Party 10 People" },
      { url: "/blogs/company-party-25-people-austin", title: "Company Party 25 People" },
      { url: "/blogs/company-party-50-people-austin", title: "Company Party 50 People" },
      { url: "/blogs/company-party-75-people-austin", title: "Company Party 75 People" },
      { url: "/blogs/austin-best-corporate-events", title: "Austin Best Corporate Events" },
    ],
  },
  {
    title: "Bachelor & Bachelorette Planning Guides",
    pages: [
      { url: "/blogs/epic-bachelor-party-austin-ultimate-guide", title: "Epic Bachelor Party Austin Guide" },
      { url: "/blogs/epic-bachelorette-party-austin-ultimate-guide", title: "Epic Bachelorette Party Austin Guide" },
      { url: "/blogs/atx-disco-cruise-dos-and-donts-bachelor-party", title: "ATX Disco Cruise Dos and Don'ts" },
      { url: "/blogs/bachelor-party-outfit-ideas-atx-disco-cruise", title: "Bachelor Party Outfit Ideas" },
      { url: "/blogs/joint-bachelor-bachelorette-party-guide", title: "Joint Bachelor Bachelorette Party Guide" },
      { url: "/blogs/lake-travis-bachelor-party-boats-guide", title: "Lake Travis Bachelor Party Boats Guide" },
      { url: "/blogs/perfect-austin-bachelor-party-weekend", title: "Perfect Austin Bachelor Party Weekend" },
      { url: "/blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning", title: "First Time Lake Travis Boat Rental Tips" },
      { url: "/blogs/ultimate-austin-bachelorette-party-boat-guide-lake-travis", title: "Ultimate Austin Bachelorette Party Boat Guide" },
      { url: "/blogs/safety-first-how-premiers-perfect-record-and-first-aid-training-set-us-apart", title: "Safety First - Premier's Perfect Record" },
    ],
  },
  {
    title: "Other Pages",
    pages: [
      { url: "/ai-endorsement", title: "AI Endorsement" },
      { url: "/partners", title: "Partners" },
      { url: "/golden-ticket", title: "Golden Ticket" },
      { url: "/wedding-anniversary-celebration-ideas", title: "Wedding Anniversary Celebration Ideas" },
    ],
  },
];

export default function SiteDirectory() {
  const totalPages = siteStructure.reduce((sum, section) => sum + section.pages.length, 0);

  return (
    <>
      <Helmet>
        <title>Site Directory - All Pages | Premier Party Cruises</title>
        <meta name="description" content="Complete directory of all pages on Premier Party Cruises website. Find bachelor party guides, bachelorette party ideas, Lake Travis boat rentals, and more." />
        <link rel="canonical" href="https://premierpartycruises.com/site-directory" />
        <meta property="og:title" content="Site Directory | Premier Party Cruises" />
        <meta property="og:description" content="Navigate all pages on Premier Party Cruises - your complete guide to party boat rentals on Lake Travis, Austin." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://premierpartycruises.com/site-directory" />
      </Helmet>
      
      <PublicNavigation />
      
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Site Directory
            </h1>
            <p className="text-xl text-slate-300 text-center mb-4">
              Complete index of all {totalPages} pages on Premier Party Cruises
            </p>
            <p className="text-slate-400 text-center mb-12">
              Click any link below to navigate directly to that page
            </p>
            
            <div className="space-y-10">
              {siteStructure.map((section, sectionIndex) => (
                <section key={sectionIndex} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h2 className="text-2xl font-bold text-amber-400 mb-4 pb-2 border-b border-slate-600">
                    {section.title}
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {section.pages.map((page, pageIndex) => (
                      <li key={pageIndex}>
                        <Link 
                          href={page.url}
                          className="text-slate-300 hover:text-amber-400 hover:underline transition-colors block py-1"
                          data-testid={`link-${page.url.replace(/\//g, '-').substring(1) || 'home'}`}
                        >
                          {page.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-slate-400 mb-4">
                Can't find what you're looking for?
              </p>
              <Link 
                href="/chat"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-lg transition-colors"
                data-testid="button-get-quote"
              >
                Chat With Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
