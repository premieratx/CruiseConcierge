import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Route, Switch } from "wouter";
import EmbeddableBookingFlow from "./pages/EmbeddableBookingFlow";
import EmbeddableChatbot from "./pages/EmbeddableChatbot";

// Create a separate query client for embeds to avoid any conflicts
const embedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function EmbedRouter() {
  return (
    <Switch>
      <Route path="/embed/chatbot" component={EmbeddableChatbot} />
      <Route path="/embed/booking" component={EmbeddableBookingFlow} />
      {/* Fallback for any other embed routes */}
      <Route>
        <div className="p-4 text-center">
          <h1 className="text-xl font-semibold text-gray-800">Widget Not Found</h1>
          <p className="text-gray-600 mt-2">The requested widget could not be loaded.</p>
        </div>
      </Route>
    </Switch>
  );
}

function EmbedApp() {
  return (
    <QueryClientProvider client={embedQueryClient}>
      <TooltipProvider>
        <Toaster />
        <EmbedRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default EmbedApp;