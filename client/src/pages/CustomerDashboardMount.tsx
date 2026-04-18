/**
 * CustomerDashboardMount — customer-facing booking dashboard, served
 * natively on the cruise site at /customer-dashboard?booking=<id>.
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/lead-app/components/ui/tooltip";
import CustomerDashboard from "@/lead-app/pages/CustomerDashboard";

const queryClient = new QueryClient();

export default function CustomerDashboardMount() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster position="top-center" theme="dark" />
          <BrowserRouter basename="/customer-dashboard">
            <Routes>
              <Route path="/*" element={<CustomerDashboard />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
