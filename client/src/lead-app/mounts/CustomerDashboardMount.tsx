"use client";

import { Toaster } from "@/lead-app/components/ui/toaster";
import { Toaster as Sonner } from "@/lead-app/components/ui/sonner";
import { TooltipProvider } from "@/lead-app/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerDashboard from "@/lead-app/pages/CustomerDashboard";
import NotFound from "@/lead-app/pages/NotFound";

const queryClient = new QueryClient();

export default function CustomerDashboardMount() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/customer-dashboard">
            <Routes>
              <Route path="/" element={<CustomerDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
