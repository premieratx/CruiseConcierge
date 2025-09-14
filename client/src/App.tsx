import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import Chat from "./pages/Chat";
import QuoteBuilder from "./pages/QuoteBuilder";
import Leads from "./pages/Leads";
import Templates from "./pages/Templates";
import Products from "./pages/Products";
import Discounts from "./pages/Discounts";
import Affiliates from "./pages/Affiliates";
import Documentation from "./pages/Documentation";
import QuoteViewer from "./pages/QuoteViewer";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/chat" component={Chat} />
      <Route path="/leads" component={Leads} />
      <Route path="/quotes" component={QuoteBuilder} />
      <Route path="/quotes/new" component={QuoteBuilder} />
      <Route path="/quotes/:id" component={QuoteBuilder} />
      <Route path="/templates" component={Templates} />
      <Route path="/products" component={Products} />
      <Route path="/discounts" component={Discounts} />
      <Route path="/affiliates" component={Affiliates} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/checkout/:quoteId" component={Checkout} />
      <Route path="/quote/:quoteId" component={QuoteViewer} />
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
