import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookingCacheProvider } from "@/contexts/BookingCacheContext";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect } from "react";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

// Home eagerly loaded for optimal LCP performance
import Home from "./pages/Home";

// All other routes lazy-loaded for optimal code splitting
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Additional lazy-loaded routes
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chat = lazy(() => import("./pages/Chat"));
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

// Admin Blog Pages - Lazy loaded
const BlogManagement = lazy(() => import("./pages/admin/BlogManagement"));
const BlogPostEditor = lazy(() => import("./pages/admin/BlogPostEditor"));

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

// Admin FAQ Review - Lazy loaded
const FAQReview = lazy(() => import("./pages/admin/FAQReview"));

// Admin Business Summary - Lazy loaded
const BusinessSummary = lazy(() => import("./pages/admin/BusinessSummary"));

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

// Customer Portal Pages - Lazy loaded
const PortalLogin = lazy(() => import("./pages/PortalLogin"));
const PortalVerify = lazy(() => import("./pages/PortalVerify"));
const PortalDashboard = lazy(() => import("./pages/PortalDashboard"));
const PortalProfile = lazy(() => import("./pages/PortalProfile"));


function Router() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
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
      
      {/* Admin Dashboard Routes */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={Dashboard} />
      <Route path="/chat">
        <Chat />
      </Route>
      <Route path="/customers/:id" component={CustomerProfile} />
      <Route path="/partial-leads" component={PartialLeads} />
      <Route path="/projects" component={Projects} />
      
      {/* Public quote-builder redirects to /chat */}
      <Route path="/quote-builder" component={() => {
        const [, navigate] = useLocation();
        useEffect(() => {
          navigate('/chat');
        }, [navigate]);
        return null;
      }} />
      
      {/* Admin Quote Builder */}
      <Route path="/admin/quote-builder" component={QuoteBuilder} />
      <Route path="/quotes/new" component={QuoteBuilder} />
      <Route path="/quotes/:id" component={QuoteBuilder} />
      <Route path="/quotes/:id/edit" component={QuoteEditor} />
      <Route path="/templates" component={Templates} />
      <Route path="/products" component={Products} />
      <Route path="/discounts" component={Discounts} />
      <Route path="/affiliates" component={Affiliates} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/settings" component={Settings} />
      
      {/* Admin Blog Routes */}
      <Route path="/admin/blogs" component={BlogManagement} />
      <Route path="/admin/blogs/posts" component={BlogManagement} />
      <Route path="/admin/blogs/posts/new" component={BlogPostEditor} />
      <Route path="/admin/blogs/posts/:id/edit" component={BlogPostEditor} />
      <Route path="/admin/blogs/categories" component={BlogManagement} />
      <Route path="/admin/blogs/categories/new" component={BlogManagement} />
      <Route path="/admin/blogs/categories/:id/edit" component={BlogManagement} />
      <Route path="/admin/blogs/tags" component={BlogManagement} />
      <Route path="/admin/blogs/tags/new" component={BlogManagement} />
      <Route path="/admin/blogs/tags/:id/edit" component={BlogManagement} />
      <Route path="/admin/blogs/authors" component={BlogManagement} />
      <Route path="/admin/blogs/authors/new" component={BlogManagement} />
      <Route path="/admin/blogs/authors/:id/edit" component={BlogManagement} />
      
      {/* Admin SEO Routes */}
      <Route path="/admin/seo" component={SEOManagement} />
      
      {/* Admin Pricing Routes */}
      <Route path="/admin/pricing" component={Pricing} />
      <Route path="/admin/pricing-rules" component={PricingRules} />
      
      {/* Admin AI Assistant */}
      <Route path="/admin/ai-assistant" component={AIAssistant} />
      
      {/* Admin Agent Chat */}
      <Route path="/admin/agent-chat" component={AgentChat} />
      
      {/* Admin Inventory Management */}
      <Route path="/admin/inventory" component={InventoryManagement} />
      
      {/* AI Media Library */}
      <Route path="/admin/media" component={MediaLibrary} />
      <Route path="/admin/faq-review" component={FAQReview} />
      <Route path="/admin/business-summary" component={BusinessSummary} />
      
      {/* Public Media Library */}
      <Route path="/media">
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
          {(() => {
            const MediaLibrary = lazy(() => import('./pages/MediaLibrary'));
            return <MediaLibrary />;
          })()}
        </Suspense>
      </Route>
      
      {/* Content Blocks Management */}
      <Route path="/admin/content-blocks">
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
          {(() => {
            const ContentBlocksManagement = lazy(() => import('./pages/admin/ContentBlocksManagement'));
            return <ContentBlocksManagement />;
          })()}
        </Suspense>
      </Route>
      
      {/* Demo Content Page */}
      <Route path="/demo-content">
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
          {(() => {
            const DemoContentPage = lazy(() => import('./pages/DemoContentPage'));
            return <DemoContentPage />;
          })()}
        </Suspense>
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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BookingCacheProvider>
          <EditModeProvider>
            <HelmetProvider>
              <TooltipProvider>
                <GoogleAnalytics />
                <Toaster />
                <Router />
              </TooltipProvider>
            </HelmetProvider>
          </EditModeProvider>
        </BookingCacheProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;