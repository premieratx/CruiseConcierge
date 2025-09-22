import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookingCacheProvider } from "@/contexts/BookingCacheContext";
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
import QuoteViewer from "./pages/QuoteViewer";
import InvoiceViewer from "./pages/InvoiceViewer";
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

// Landing Pages
import BachelorParty from "./pages/BachelorParty";
import BacheloretteParty from "./pages/BacheloretteParty";
import PrivateCruises from "./pages/PrivateCruises";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import TestimonialsFaq from "./pages/TestimonialsFaq";

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
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route path="/testimonials-faq" component={TestimonialsFaq} />
      
      {/* Public Booking */}
      <Route path="/calendar" component={PublicCalendar} />
      
      {/* Admin Dashboard Routes */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/chat" component={Chat} />
      <Route path="/leads" component={Leads} />
      <Route path="/customers/:id" component={CustomerProfile} />
      <Route path="/partial-leads" component={PartialLeads} />
      <Route path="/projects" component={Projects} />
      <Route path="/admin/calendar" component={CalendarView} />
      <Route path="/quotes" component={QuotesManagement} />
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
      <Route path="/quote" component={QuoteViewer} />
      <Route path="/quote/:quoteId" component={QuoteViewer} />
      <Route path="/quote-checkout" component={QuoteViewer} />
      <Route path="/checkout" component={QuoteViewer} />
      <Route path="/invoice/:invoiceId" component={InvoiceViewer} />
      
      {/* Admin Blog Routes */}
      <Route path="/admin/blog" component={BlogManagement} />
      <Route path="/admin/blog/posts" component={BlogManagement} />
      <Route path="/admin/blog/posts/new" component={BlogPostEditor} />
      <Route path="/admin/blog/posts/:id/edit" component={BlogPostEditor} />
      
      {/* Admin SEO Routes */}
      <Route path="/admin/seo" component={SEOManagement} />
      
      {/* Admin Pricing Routes */}
      <Route path="/admin/pricing" component={Pricing} />
      
      {/* AI Media Library */}
      <Route path="/admin/media" component={lazy(() => import('./pages/admin/MediaLibrary'))} />
      
      {/* Public Blog Routes - Specific routes must come before generic ones */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/category/:slug" component={BlogCategory} />
      <Route path="/blog/tag/:slug" component={BlogTag} />
      <Route path="/blog/author/:id" component={BlogAuthor} />
      <Route path="/blog/:slug" component={BlogPost} />
      
      {/* Public Customer Routes */}
      <Route path="/book" component={PublicCalendar} />
      <Route path="/availability" component={PublicCalendar} />
      <Route path="/book/:slotId" component={BookingFlow} />
      <Route path="/booking-success" component={BookingSuccess} />
      
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
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </HelmetProvider>
      </BookingCacheProvider>
    </QueryClientProvider>
  );
}

export default App;
