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
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import QuoteBuilderEmbed from "./pages/QuoteBuilderEmbed";
import QuoteBuilder from "./pages/QuoteBuilder";
import QuoteEditor from "./pages/QuoteEditor";
import PartialLeads from "./pages/PartialLeads";
import CustomerProfile from "./pages/CustomerProfile";
import Projects from "./pages/Projects";
import Templates from "./pages/Templates";
import Products from "./pages/Products";
import Discounts from "./pages/Discounts";
import Affiliates from "./pages/Affiliates";
import Documentation from "./pages/Documentation";
import QuoteViewer from "./pages/QuoteViewer";
import Settings from "./pages/Settings";
import BookingFlow from "./pages/BookingFlow";
import BookingSuccess from "./pages/BookingSuccess";
import NotFound from "@/pages/not-found";

// Blog Pages
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import BlogTag from "./pages/BlogTag";
import BlogAuthor from "./pages/BlogAuthor";

// Admin Blog Pages
import BlogManagement from "./pages/admin/BlogManagement";
import BlogPostEditor from "./pages/admin/BlogPostEditor";

// Admin SEO Pages
import SEOManagement from "./pages/admin/SEOManagement";

// Admin Pricing Pages
import Pricing from "./pages/admin/Pricing";
import PricingRules from "./pages/admin/PricingRules";

// Admin AI Assistant
import AIAssistant from "./pages/admin/AIAssistant";

// Admin Agent Chat
import AgentChat from "./pages/admin/AgentChat";

// Admin Inventory Management
import InventoryManagement from "./pages/admin/InventoryManagement";

// Admin Media Library
import MediaLibrary from "./pages/admin/MediaLibrary";

// Landing Pages
import BachelorParty from "./pages/BachelorParty";
import BacheloretteParty from "./pages/BacheloretteParty";
import CombinedBachelorBachelorette from "./pages/CombinedBachelorBachelorette";
import PrivateCruises from "./pages/PrivateCruises";
import CorporateEvents from "./pages/CorporateEvents";
import BirthdayParties from "./pages/BirthdayParties";
import WeddingParties from "./pages/WeddingParties";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import TestimonialsFaq from "./pages/TestimonialsFaq";
import PartyBoatAustin from "./pages/PartyBoatAustin";

// Wedding Experience Pages
import RehearsalDinner from "./pages/RehearsalDinner";
import WelcomeParty from "./pages/WelcomeParty";
import AfterParty from "./pages/AfterParty";

// Corporate Experience Pages
import TeamBuilding from "./pages/TeamBuilding";
import ClientEntertainment from "./pages/ClientEntertainment";
import CompanyMilestone from "./pages/CompanyMilestone";

// Birthday Experience Pages
import MilestoneBirthday from "./pages/MilestoneBirthday";
import Sweet16 from "./pages/Sweet16";

// Special Event Pages
import GraduationParty from "./pages/GraduationParty";

// Customer Portal Pages
import PortalLogin from "./pages/PortalLogin";
import PortalVerify from "./pages/PortalVerify";
import PortalDashboard from "./pages/PortalDashboard";
import PortalProfile from "./pages/PortalProfile";


function Router() {
  return (
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
      <Route path="/private-cruises" component={PrivateCruises} />
      <Route path="/corporate-events" component={CorporateEvents} />
      <Route path="/birthday-parties" component={BirthdayParties} />
      <Route path="/wedding-parties" component={WeddingParties} />
      <Route path="/party-boat-austin" component={PartyBoatAustin} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route path="/testimonials-faq" component={TestimonialsFaq} />
      
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
      <Route path="/blogs" component={Blog} />
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