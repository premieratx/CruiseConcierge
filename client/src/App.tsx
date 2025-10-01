import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookingCacheProvider } from "@/contexts/BookingCacheContext";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { HelmetProvider } from "react-helmet-async";
import { lazy } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import QuoteBuilder from "./pages/QuoteBuilder";
import QuotesManagement from "./pages/QuotesManagement";
import InvoiceManagement from "./pages/InvoiceManagement";
import QuoteEditor from "./pages/QuoteEditor";
import Leads from "./pages/Leads";
import PartialLeads from "./pages/PartialLeads";
import CustomerProfile from "./pages/CustomerProfile";
import Projects from "./pages/Projects";
import Templates from "./pages/Templates";
import Products from "./pages/Products";
import Discounts from "./pages/Discounts";
import Affiliates from "./pages/Affiliates";
import Documentation from "./pages/Documentation";
import InvoiceViewer from "./pages/InvoiceViewer";
import QuoteViewer from "./pages/QuoteViewer";
import CalendarView from "@/components/CalendarView";
import Settings from "./pages/Settings";
import PublicCalendar from "./pages/PublicCalendar";
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

// Landing Pages
import BachelorParty from "./pages/BachelorParty";
import BacheloretteParty from "./pages/BacheloretteParty";
import PrivateCruises from "./pages/PrivateCruises";
import CorporateEvents from "./pages/CorporateEvents";
import BirthdayParties from "./pages/BirthdayParties";
import WeddingParties from "./pages/WeddingParties";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import TestimonialsFaq from "./pages/TestimonialsFaq";

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
import PortalQuotes from "./pages/PortalQuotes";
import PortalInvoices from "./pages/PortalInvoices";
import PortalBookings from "./pages/PortalBookings";
import PortalProfile from "./pages/PortalProfile";


function Router() {
  return (
    <Switch>
      {/* Public Homepage */}
      <Route path="/" component={Home} />
      
      {/* Landing Pages */}
      <Route path="/bachelor-party" component={BachelorParty} />
      <Route path="/bachelorette-party" component={BacheloretteParty} />
      <Route path="/private-cruises" component={PrivateCruises} />
      <Route path="/corporate-events" component={CorporateEvents} />
      <Route path="/birthday-parties" component={BirthdayParties} />
      <Route path="/wedding-parties" component={WeddingParties} />
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
      <Route path="/quote/id/:id" component={Chat} />
      
      {/* Legacy direct quote ID route - handles old emailed links /quote/ABC123 */}
      <Route path="/quote/:id" component={(props: any) => {
        const { id } = props.params;
        // Smart detection: tokens are long with dots, legacy IDs are short alphanumeric
        if (id && (id.length > 50 || id.includes('.'))) {
          // This looks like a secure token, render QuoteViewer
          return <QuoteViewer params={{ token: id }} />;
        } else {
          // This looks like a legacy quote ID, redirect to Chat with quote context
          console.log('🔗 Legacy quote ID detected, redirecting to Chat:', id);
          return <Chat params={{ ...props.params, quoteId: id }} />;
        }
      }} />
      
      {/* Admin Dashboard Routes */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/leads" component={Leads} />
      <Route path="/chat" component={Chat} />
      <Route path="/leads" component={Leads} />
      <Route path="/customers/:id" component={CustomerProfile} />
      <Route path="/partial-leads" component={PartialLeads} />
      <Route path="/projects" component={Projects} />
      <Route path="/admin/calendar" component={CalendarView} />
      <Route path="/quotes" component={QuotesManagement} />
      <Route path="/quote-builder" component={QuoteBuilder} />
      <Route path="/quotes/new" component={QuoteBuilder} />
      <Route path="/quotes/:id" component={QuoteBuilder} />
      <Route path="/quotes/:id/edit" component={QuoteEditor} />
      <Route path="/invoices" component={InvoiceManagement} />
      <Route path="/invoices/new" component={InvoiceManagement} />
      <Route path="/invoices/:id" component={InvoiceManagement} />
      <Route path="/templates" component={Templates} />
      <Route path="/products" component={Products} />
      <Route path="/discounts" component={Discounts} />
      <Route path="/affiliates" component={Affiliates} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/settings" component={Settings} />
      {/* Quote viewer routes - Commented out, using /chat instead */}
      {/* <Route path="/quote" component={QuoteViewer} /> */}
      {/* <Route path="/quote/:quoteId" component={QuoteViewer} /> */}
      {/* <Route path="/quote-checkout" component={QuoteViewer} /> */}
      {/* ARCHIVED: QuoteViewer checkout route disabled - Quote Builder is single source of truth */}
      {/* <Route path="/checkout" component={QuoteViewer} /> */}
      <Route path="/invoice/:invoiceId" component={InvoiceViewer} />
      
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
      <Route path="/admin/media" component={lazy(() => import('./pages/admin/MediaLibrary'))} />
      
      {/* Public Media Library */}
      <Route path="/media" component={lazy(() => import('./pages/MediaLibrary'))} />
      
      {/* Content Blocks Management */}
      <Route path="/admin/content-blocks" component={lazy(() => import('./pages/admin/ContentBlocksManagement'))} />
      
      {/* Demo Content Page */}
      <Route path="/demo-content" component={lazy(() => import('./pages/DemoContentPage'))} />
      
      {/* Public Blog Routes - Specific routes must come before generic ones */}
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
      <Route path="/portal/quotes" component={PortalQuotes} />
      <Route path="/portal/invoices" component={PortalInvoices} />
      <Route path="/portal/bookings" component={PortalBookings} />
      <Route path="/portal/profile" component={PortalProfile} />
      
      {/* 404 Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;