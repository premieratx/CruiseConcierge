/**
 * LeadDashboardMount — customer-facing lead dashboard, served natively on
 * the cruise site at /lead-dashboard?lead=<id>.
 *
 * Wraps the ported LeadDashboard (src/lead-app/pages/LeadDashboard.tsx)
 * in a BrowserRouter + QueryClient + Helmet + Toaster stack so the
 * react-router hooks it uses (useSearchParams, useNavigate) work even
 * though the outer cruise app uses wouter.
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/lead-app/components/ui/tooltip";
import LeadDashboard from "@/lead-app/pages/LeadDashboard";
import "@/styles/lead-dashboard-luxury.css";

const queryClient = new QueryClient();

export default function LeadDashboardMount() {
  return (
    <div className="v2-luxury-root">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster position="top-center" theme="dark" />
            <BrowserRouter basename="/lead-dashboard">
              <Routes>
                <Route path="/*" element={<LeadDashboard />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </div>
  );
}
