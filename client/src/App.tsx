import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
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

// Customer Portal Pages
import PortalLogin from "./pages/PortalLogin";
import PortalVerify from "./pages/PortalVerify";
import PortalDashboard from "./pages/PortalDashboard";
import PortalQuotes from "./pages/PortalQuotes";
import PortalInvoices from "./pages/PortalInvoices";
import PortalBookings from "./pages/PortalBookings";
import PortalProfile from "./pages/PortalProfile";

// Embeddable Widget Pages
import EmbeddableChatbot from "./pages/EmbeddableChatbot";
import EmbeddableBooking from "./pages/EmbeddableBooking";
import EmbedWidgets from "./pages/EmbedWidgets";

function Router() {
  return (
    <Switch>
      {/* Admin Dashboard Routes */}
      <Route path="/" component={Dashboard} />
      <Route path="/chat" component={Chat} />
      <Route path="/leads" component={Leads} />
      <Route path="/customers/:id" component={CustomerProfile} />
      <Route path="/partial-leads" component={PartialLeads} />
      <Route path="/projects" component={Projects} />
      <Route path="/calendar" component={CalendarView} />
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
      <Route path="/embed-widgets" component={EmbedWidgets} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/checkout/:quoteId" component={Checkout} />
      <Route path="/quote/:quoteId" component={QuoteViewer} />
      <Route path="/invoice/:invoiceId" component={InvoiceViewer} />
      
      {/* Public Customer Routes */}
      <Route path="/book" component={PublicCalendar} />
      <Route path="/availability" component={PublicCalendar} />
      <Route path="/book/:slotId" component={BookingFlow} />
      <Route path="/booking-success" component={BookingSuccess} />
      
      {/* Embeddable Widget Routes */}
      <Route path="/embed/chatbot" component={EmbeddableChatbot} />
      <Route path="/embed/booking" component={EmbeddableBooking} />
      
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
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
