import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
// TEMPORARY: TooltipProvider disabled to fix React preamble error - will re-enable after cache clears
// import { TooltipProvider } from "@/components/ui/tooltip";
// TEMPORARY: BookingCacheProvider disabled to fix React preamble error
// import { BookingCacheProvider } from "@/contexts/BookingCacheContext";
// TEMPORARY: EditModeProvider disabled to fix React preamble error - will re-enable after cache clears
// import { EditModeProvider } from "@/contexts/EditModeContext";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect, useState } from "react";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GlobalInlineEditor } from "@/components/GlobalInlineEditor";

// Home eagerly loaded for optimal LCP performance
import Home from "./pages/Home";

// All other routes lazy-loaded for optimal code splitting
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Additional lazy-loaded routes
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chat = lazy(() => import("./pages/Chat"));
const BookOnline = lazy(() => import("./pages/BookOnline"));
const BookOnlinePopUp = lazy(() => import("./pages/BookOnlinePopUp"));
const BookNow = lazy(() => import("./pages/BookNow"));
const GoldenTicket = lazy(() => import("./pages/GoldenTicket"));
const GoldenTicketPrivate = lazy(() => import("./pages/GoldenTicketPrivate"));
const QuoteBuilderEmbed = lazy(() => import("./pages/QuoteBuilderEmbed"));
const QuoteBuilder = lazy(() => import("./pages/QuoteBuilder"));
const QuoteEditor = lazy(() => import("./pages/QuoteEditor"));
const PartialLeads = lazy(() => import("./pages/PartialLeads"));
const CustomerProfile = lazy(() => import("./pages/CustomerProfile"));
const Projects = lazy(() => import("./pages/Projects"));
const Templates = lazy(() => import("./pages/Templates"));
const Products = lazy(() => import("./pages/Products"));
const Discounts = lazy(() => import("./pages/Discounts"));
const Affiliates = lazy(() => import("./pages/Affiliates"));
const Documentation = lazy(() => import("./pages/Documentation"));
const QuoteViewer = lazy(() => import("./pages/QuoteViewer"));
const Settings = lazy(() => import("./pages/Settings"));
const BookingFlow = lazy(() => import("./pages/BookingFlow"));
const BookingSuccess = lazy(() => import("./pages/BookingSuccess"));

// Blog Pages - Lazy loaded
const Blog = lazy(() => import("./pages/Blog"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogCategory = lazy(() => import("./pages/BlogCategory"));
const BlogTag = lazy(() => import("./pages/BlogTag"));
const BlogAuthor = lazy(() => import("./pages/BlogAuthor"));

// New SEO-Optimized Blog Pages - Lazy loaded
const AustinBachelorPartyIdeas = lazy(() => import("./pages/blog/AustinBachelorPartyIdeas"));
const LakeTravisBachelorPartyBoats = lazy(() => import("./pages/blog/LakeTravisBachelorPartyBoats"));
const WeddingAnniversaryCelebrationIdeas = lazy(() => import("./pages/blog/WeddingAnniversaryCelebrationIdeas"));
const ATXDiscoCruiseExperience = lazy(() => import("./pages/blog/ATXDiscoCruiseExperience"));

// Admin Blog Pages - Lazy loaded
const BlogManagement = lazy(() => import("./pages/admin/BlogManagement"));
const BlogPostEditor = lazy(() => import("./pages/admin/BlogPostEditor"));
const BlogFormatter = lazy(() => import("./pages/admin/BlogFormatter"));

// Admin SEO Pages - Lazy loaded
const SEOManagement = lazy(() => import("./pages/admin/SEOManagement"));

// Admin Pricing Pages - Lazy loaded
const Pricing = lazy(() => import("./pages/admin/Pricing"));
const PricingRules = lazy(() => import("./pages/admin/PricingRules"));

// Admin AI Assistant - Lazy loaded
const AIAssistant = lazy(() => import("./pages/admin/AIAssistant"));

// Admin Agent Chat - Lazy loaded
const AgentChat = lazy(() => import("./pages/admin/AgentChat"));

// Admin Inventory Management - Lazy loaded
const InventoryManagement = lazy(() => import("./pages/admin/InventoryManagement"));

// Admin Media Library - Lazy loaded
const MediaLibrary = lazy(() => import("./pages/admin/MediaLibrary"));

// Admin Gallery Manager - Lazy loaded
const GalleryManager = lazy(() => import("./pages/admin/GalleryManager"));

// Admin FAQ Review - Lazy loaded
const FAQReview = lazy(() => import("./pages/admin/FAQReview"));

// Admin Business Summary - Lazy loaded
const BusinessSummary = lazy(() => import("./pages/admin/BusinessSummary"));

// Admin Blog Conversion Tracker - Lazy loaded
const BlogConversionTracker = lazy(() => import("./pages/admin/BlogConversionTracker"));

// Landing Pages - Lazy loaded
const BachelorParty = lazy(() => import("./pages/BachelorParty"));
const BacheloretteParty = lazy(() => import("./pages/BacheloretteParty"));
const CombinedBachelorBachelorette = lazy(() => import("./pages/CombinedBachelorBachelorette"));
const ATXDiscoCruise = lazy(() => import("./pages/ATXDiscoCruise"));
const PrivateCruises = lazy(() => import("./pages/PrivateCruises"));
const CorporateEvents = lazy(() => import("./pages/CorporateEvents"));
const BirthdayParties = lazy(() => import("./pages/BirthdayParties"));
const WeddingParties = lazy(() => import("./pages/WeddingParties"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const TestimonialsFaq = lazy(() => import("./pages/TestimonialsFaq"));
const PartyBoatAustin = lazy(() => import("./pages/PartyBoatAustin"));
const PartyBoatLakeTravis = lazy(() => import("./pages/PartyBoatLakeTravis"));
const AIEndorsement = lazy(() => import("./pages/AIEndorsement"));
const Partners = lazy(() => import("./pages/Partners"));

// Wedding Experience Pages - Lazy loaded
const RehearsalDinner = lazy(() => import("./pages/RehearsalDinner"));
const WelcomeParty = lazy(() => import("./pages/WelcomeParty"));
const AfterParty = lazy(() => import("./pages/AfterParty"));

// Corporate Experience Pages - Lazy loaded
const TeamBuilding = lazy(() => import("./pages/TeamBuilding"));
const ClientEntertainment = lazy(() => import("./pages/ClientEntertainment"));
const CompanyMilestone = lazy(() => import("./pages/CompanyMilestone"));

// Birthday Experience Pages - Lazy loaded
const MilestoneBirthday = lazy(() => import("./pages/MilestoneBirthday"));
const Sweet16 = lazy(() => import("./pages/Sweet16"));

// Special Event Pages - Lazy loaded
const GraduationParty = lazy(() => import("./pages/GraduationParty"));
const Faq = lazy(() => import("./pages/Faq"));
const PricingBreakdown = lazy(() => import("./pages/PricingBreakdown"));

// Blog Content Pages - Lazy loaded
const LakeTravisBoatRentalGuide = lazy(() => import("./pages/LakeTravisBoatRentalGuide"));
const FirstTimeLakeTravisGuide = lazy(() => import("./pages/blog/FirstTimeLakeTravisGuide"));
const BirthdayPartyAustinGuide = lazy(() => import("./pages/BirthdayPartyAustinGuide"));
const LakeTravisLargeGroupsGuide = lazy(() => import("./pages/LakeTravisLargeGroupsGuide"));
const LakeTravisWeatherGuide = lazy(() => import("./pages/LakeTravisWeatherGuide"));
const UltimateAustinBacheloretteWeekend = lazy(() => import("./pages/UltimateAustinBacheloretteWeekend"));
const Top10AustinBacheloretteIdeas = lazy(() => import("./pages/Top10AustinBacheloretteIdeas"));
const ThreeDayAustinBacheloretteItinerary = lazy(() => import("./pages/ThreeDayAustinBacheloretteItinerary"));
const BudgetAustinBachelorette = lazy(() => import("./pages/BudgetAustinBachelorette"));
const LuxuryAustinBachelorette = lazy(() => import("./pages/LuxuryAustinBachelorette"));
const AdventureAustinBachelorette = lazy(() => import("./pages/AdventureAustinBachelorette"));
const AustinBacheloretteNightlife = lazy(() => import("./pages/AustinBacheloretteNightlife"));
const HolidayCelebrationsLakeTravis = lazy(() => import("./pages/HolidayCelebrationsLakeTravis"));
const JointBachelorBacheloretteParties = lazy(() => import("./pages/JointBachelorBacheloretteParties"));
const LakeTravisWeddingBoatRentals = lazy(() => import("./pages/LakeTravisWeddingBoatRentals"));
const MustHavesAustinBacheloretteWeekend = lazy(() => import("./pages/MustHavesAustinBacheloretteWeekend"));
const TopSpotsAustinBacheloretteParty = lazy(() => import("./pages/TopSpotsAustinBacheloretteParty"));

// Customer Portal Pages - Lazy loaded
const PortalLogin = lazy(() => import("./pages/PortalLogin"));
const PortalVerify = lazy(() => import("./pages/PortalVerify"));
const PortalDashboard = lazy(() => import("./pages/PortalDashboard"));
const PortalProfile = lazy(() => import("./pages/PortalProfile"));


function Router() {
  const [location] = useLocation();

  // Force page reload on back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Suspense fallback={null}>
      <Switch>
        {/* Public Homepage */}
        <Route path="/" component={Home} />
      
      {/* Authentication */}
      <Route path="/auth" component={AuthPage} />
      <Route path="/admin/login" component={AuthPage} />
      
      {/* Landing Pages */}
      <Route path="/bachelor-party-austin" component={BachelorParty} />
      <Route path="/bachelorette-party-austin" component={BacheloretteParty} />
      <Route path="/combined-bachelor-bachelorette-austin" component={CombinedBachelorBachelorette} />
      <Route path="/atx-disco-cruise" component={ATXDiscoCruise} />
      
      {/* Legacy URL Redirects - SEO & User Experience */}
      <Route path="/bachelor-party">
        <Redirect to="/bachelor-party-austin" />
      </Route>
      <Route path="/bachelorette-party">
        <Redirect to="/bachelorette-party-austin" />
      </Route>
      <Route path="/combined-parties-austin">
        <Redirect to="/combined-bachelor-bachelorette-austin" />
      </Route>
      <Route path="/combined-bachelor-bachelorette">
        <Redirect to="/combined-bachelor-bachelorette-austin" />
      </Route>
      
      {/* Phase 3: Phantom URL Redirects (301 permanent via server + client-side fallback) */}
      <Route path="/bachelor-bachelorette-party-boat-austin">
        <Redirect to="/combined-bachelor-bachelorette-austin" />
      </Route>
      <Route path="/testimonials">
        <Redirect to="/testimonials-faq" />
      </Route>
      <Route path="/three-day-austin-bachelorette-itinerary">
        <Redirect to="/3-day-austin-bachelorette-itinerary" />
      </Route>
      <Route path="/about">
        <Redirect to="/" />
      </Route>
      
      <Route path="/private-cruises" component={PrivateCruises} />
      <Route path="/corporate-events" component={CorporateEvents} />
      <Route path="/birthday-parties" component={BirthdayParties} />
      <Route path="/wedding-parties" component={WeddingParties} />
      <Route path="/party-boat-austin" component={PartyBoatAustin} />
      <Route path="/party-boat-lake-travis" component={PartyBoatLakeTravis} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route path="/testimonials-faq" component={TestimonialsFaq} />
      <Route path="/ai-endorsement" component={AIEndorsement} />
      <Route path="/partners" component={Partners} />
      
      {/* Wedding Experience Pages */}
      <Route path="/rehearsal-dinner" component={RehearsalDinner} />
      <Route path="/welcome-party" component={WelcomeParty} />
      <Route path="/after-party" component={AfterParty} />
      
      {/* Corporate Experience Pages */}
      <Route path="/team-building" component={TeamBuilding} />
      <Route path="/client-entertainment" component={ClientEntertainment} />
      <Route path="/company-milestone" component={CompanyMilestone} />
      
      {/* Birthday Experience Pages */}
      <Route path="/milestone-birthday" component={MilestoneBirthday} />
      <Route path="/sweet-16" component={Sweet16} />
      
      {/* Special Event Pages */}
      <Route path="/graduation-party" component={GraduationParty} />
      <Route path="/faq" component={Faq} />
      <Route path="/pricing-breakdown" component={PricingBreakdown} />
      
      {/* Blog Content Pages */}
      <Route path="/first-time-lake-travis-boat-rental-guide" component={LakeTravisBoatRentalGuide} />
      <Route path="/ultimate-austin-bachelorette-weekend" component={UltimateAustinBacheloretteWeekend} />
      <Route path="/top-10-austin-bachelorette-ideas" component={Top10AustinBacheloretteIdeas} />
      <Route path="/3-day-austin-bachelorette-itinerary" component={ThreeDayAustinBacheloretteItinerary} />
      <Route path="/budget-austin-bachelorette" component={BudgetAustinBachelorette} />
      <Route path="/luxury-austin-bachelorette" component={LuxuryAustinBachelorette} />
      <Route path="/adventure-austin-bachelorette" component={AdventureAustinBachelorette} />
      <Route path="/austin-bachelorette-nightlife" component={AustinBacheloretteNightlife} />
      <Route path="/blogs/holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination" component={HolidayCelebrationsLakeTravis} />
      <Route path="/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises" component={JointBachelorBacheloretteParties} />
      <Route path="/blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations" component={LakeTravisWeddingBoatRentals} />
      <Route path="/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend" component={MustHavesAustinBacheloretteWeekend} />
      <Route path="/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience" component={TopSpotsAustinBacheloretteParty} />
      
      {/* New SEO-Optimized Bachelor Party Blog Pages */}
      <Route path="/austin-bachelor-party-ideas" component={AustinBachelorPartyIdeas} />
      <Route path="/lake-travis-bachelor-party-boats" component={LakeTravisBachelorPartyBoats} />
      <Route path="/blogs/atx-disco-cruise-experience" component={ATXDiscoCruiseExperience} />
      
      {/* Wedding Anniversary Blog Page */}
      <Route path="/wedding-anniversary-celebration-ideas" component={WeddingAnniversaryCelebrationIdeas} />
      
      {/* Redirect /blog/ version to /blogs/ React page */}
      <Route path="/blog/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience">
        {() => {
          const [, navigate] = useLocation();
          useEffect(() => {
            navigate('/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience', { replace: true });
          }, [navigate]);
          return null;
        }}
      </Route>
      
      {/* Redirect broken indexed URLs */}
      <Route path="/party-cruises-2025">
        {() => {
          const [, navigate] = useLocation();
          useEffect(() => {
            navigate('/', { replace: true });
          }, [navigate]);
          return null;
        }}
      </Route>
      
      {/* Replace old static blogs with new React versions */}
      <Route path="/blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning" component={FirstTimeLakeTravisGuide} />
      <Route path="/blog/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy" component={BirthdayPartyAustinGuide} />
      <Route path="/blog/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests" component={LakeTravisLargeGroupsGuide} />
      <Route path="/blog/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties" component={LakeTravisWeatherGuide} />
      
      {/* Public Booking - Commented out, using /chat instead */}
      {/* <Route path="/calendar" component={PublicCalendar} /> */}
      
      {/* Quote display route - tokenized quote viewing */}
      <Route path="/quote/:token" component={QuoteViewer} />
      
      {/* Legacy quote ID route - redirects to Chat with quote ID */}
      <Route path="/quote/id/:id">
        {() => {
          const [, navigate] = useLocation();
          useEffect(() => {
            // Redirect to chat - the quote builder iframe handles quote context
            navigate('/chat');
          }, [navigate]);
          return null;
        }}
      </Route>
      
      {/* Legacy direct quote ID route - handles old emailed links /quote/ABC123 */}
      <Route path="/quote/:id">
        {(params) => {
          const id = params.id;
          const [, navigate] = useLocation();
          
          useEffect(() => {
            // Smart detection: tokens are long with dots, legacy IDs are short alphanumeric
            if (id && !(id.length > 50 || id.includes('.'))) {
              // This looks like a legacy quote ID, redirect to Chat
              console.log('🔗 Legacy quote ID detected, redirecting to Chat:', id);
              navigate('/chat');
            }
          }, [id, navigate]);
          
          // If it's a token (long or has dots), QuoteViewer will handle it via useParams
          if (id && (id.length > 50 || id.includes('.'))) {
            return <QuoteViewer />;
          }
          
          return null;
        }}
      </Route>
      
      {/* Public Quote Builder (Chat) - No auth required */}
      <Route path="/chat">
        <Chat />
      </Route>
      
      {/* Book Online with Xola Widgets - No auth required */}
      <Route path="/book-online">
        <BookOnline />
      </Route>
      
      {/* Book Online Pop-Up with Xola Widgets - No auth required */}
      <Route path="/book-online-popup">
        <BookOnlinePopUp />
      </Route>
      
      {/* Book Now - FRESH Xola Integration - No auth required */}
      <Route path="/book-now">
        <BookNow />
      </Route>
      
      {/* Golden Ticket Promotion Page - No auth required */}
      <Route path="/golden-ticket">
        <GoldenTicket />
      </Route>
      
      {/* Golden Ticket Private Groups Page - No auth required */}
      <Route path="/golden-ticket-private">
        <GoldenTicketPrivate />
      </Route>
      
      {/* Public quote-builder redirects to /chat */}
      <Route path="/quote-builder" component={() => {
        const [, navigate] = useLocation();
        useEffect(() => {
          navigate('/chat');
        }, [navigate]);
        return null;
      }} />
      
      {/* Admin Dashboard Routes - LOGIN REQUIRED */}
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/admin">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/customers/:id">
        {(params) => (
          <ProtectedRoute>
            <CustomerProfile params={params} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/partial-leads">
        <ProtectedRoute>
          <PartialLeads />
        </ProtectedRoute>
      </Route>
      <Route path="/projects">
        <ProtectedRoute>
          <Projects />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Quote Builder - LOGIN REQUIRED */}
      <Route path="/admin/quote-builder">
        <ProtectedRoute>
          <QuoteBuilder />
        </ProtectedRoute>
      </Route>
      <Route path="/quotes/new">
        <ProtectedRoute>
          <QuoteBuilder />
        </ProtectedRoute>
      </Route>
      <Route path="/quotes/:id">
        <ProtectedRoute>
          <QuoteBuilder />
        </ProtectedRoute>
      </Route>
      <Route path="/quotes/:id/edit">
        <ProtectedRoute>
          <QuoteEditor />
        </ProtectedRoute>
      </Route>
      <Route path="/templates">
        <ProtectedRoute>
          <Templates />
        </ProtectedRoute>
      </Route>
      <Route path="/products">
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      </Route>
      <Route path="/discounts">
        <ProtectedRoute>
          <Discounts />
        </ProtectedRoute>
      </Route>
      <Route path="/affiliates">
        <ProtectedRoute>
          <Affiliates />
        </ProtectedRoute>
      </Route>
      <Route path="/documentation">
        <ProtectedRoute>
          <Documentation />
        </ProtectedRoute>
      </Route>
      <Route path="/settings">
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Blog Routes - LOGIN REQUIRED */}
      <Route path="/admin/blogs">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/posts">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/posts/new">
        <ProtectedRoute>
          <BlogPostEditor />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/posts/:id/edit">
        <ProtectedRoute>
          <BlogPostEditor />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/categories">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/categories/new">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/categories/:id/edit">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/tags">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/tags/new">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/tags/:id/edit">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/authors">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/authors/new">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/authors/:id/edit">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blog-formatter">
        <ProtectedRoute>
          <BlogFormatter />
        </ProtectedRoute>
      </Route>
      
      {/* Admin SEO Routes - LOGIN REQUIRED */}
      <Route path="/admin/seo">
        <ProtectedRoute>
          <SEOManagement />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Pricing Routes - LOGIN REQUIRED */}
      <Route path="/admin/pricing">
        <ProtectedRoute>
          <Pricing />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/pricing-rules">
        <ProtectedRoute>
          <PricingRules />
        </ProtectedRoute>
      </Route>
      
      {/* Admin AI Assistant - LOGIN REQUIRED */}
      <Route path="/admin/ai-assistant">
        <ProtectedRoute>
          <AIAssistant />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Agent Chat - LOGIN REQUIRED */}
      <Route path="/admin/agent-chat">
        <ProtectedRoute>
          <AgentChat />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Inventory Management - LOGIN REQUIRED */}
      <Route path="/admin/inventory">
        <ProtectedRoute>
          <InventoryManagement />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Media & Tools - LOGIN REQUIRED */}
      <Route path="/admin/media">
        <ProtectedRoute>
          <MediaLibrary />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/gallery">
        <ProtectedRoute>
          <GalleryManager />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/faq-review">
        <ProtectedRoute>
          <FAQReview />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/business-summary">
        <ProtectedRoute>
          <BusinessSummary />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Blog Conversion Tracker - LOGIN REQUIRED */}
      <Route path="/admin/blog-conversion">
        <ProtectedRoute>
          <BlogConversionTracker />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Content Blocks - LOGIN REQUIRED */}
      <Route path="/admin/content-blocks">
        <ProtectedRoute>
          <Suspense fallback={null}>
            {(() => {
              const ContentBlocksManagement = lazy(() => import('./pages/admin/ContentBlocksManagement'));
              return <ContentBlocksManagement />;
            })()}
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      {/* Demo Content Page - LOGIN REQUIRED */}
      <Route path="/demo-content">
        <ProtectedRoute>
          <Suspense fallback={null}>
            {(() => {
              const DemoContentPage = lazy(() => import('./pages/DemoContentPage'));
              return <DemoContentPage />;
            })()}
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      {/* Public Blog Routes - Specific routes must come before generic ones */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/category/:slug" component={BlogCategory} />
      <Route path="/blog/tag/:slug" component={BlogTag} />
      <Route path="/blog/author/:id" component={BlogAuthor} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/blogs" component={Blogs} />
      <Route path="/blogs/category/:slug" component={BlogCategory} />
      <Route path="/blogs/tag/:slug" component={BlogTag} />
      <Route path="/blogs/author/:id" component={BlogAuthor} />
      <Route path="/blogs/:slug" component={BlogPost} />
      
      {/* Public Customer Routes - Calendar routes commented out, using /chat instead */}
      {/* <Route path="/book" component={PublicCalendar} /> */}
      {/* <Route path="/availability" component={PublicCalendar} /> */}
      {/* <Route path="/book/:slotId" component={BookingFlow} /> */}
      {/* <Route path="/booking-success" component={BookingSuccess} /> */}
      
      {/* Customer Portal Routes */}
      <Route path="/portal" component={PortalLogin} />
      <Route path="/portal/login" component={PortalLogin} />
      <Route path="/portal/verify" component={PortalVerify} />
      <Route path="/portal/dashboard" component={PortalDashboard} />
      <Route path="/portal/profile" component={PortalProfile} />
      
      {/* 404 Fallback */}
      <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // Xola script loads from index.html - always ready
  const [xolaReady] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* TEMPORARY: BookingCacheProvider disabled to fix React preamble error */}
        {/* <BookingCacheProvider> */}
          {/* TEMPORARY: EditModeProvider disabled to fix React preamble error */}
          {/* <EditModeProvider> */}
            <HelmetProvider>
              {/* TEMPORARY: TooltipProvider disabled to fix React preamble error */}
              {/* <TooltipProvider> */}
                <GoogleAnalytics />
                <Toaster />
                <GlobalInlineEditor />
                <ErrorBoundary>
                  <Router />
                </ErrorBoundary>
              {/* </TooltipProvider> */}
            </HelmetProvider>
          {/* </EditModeProvider> */}
        {/* </BookingCacheProvider> */}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;