"use client";

import { Toaster } from "@/lead-app/components/ui/toaster";
import { Toaster as Sonner } from "@/lead-app/components/ui/sonner";
import { TooltipProvider } from "@/lead-app/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeadDashboard from "@/lead-app/pages/LeadDashboard";
import NotFound from "@/lead-app/pages/NotFound";

const queryClient = new QueryClient();

export default function LeadDashboardMount() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/lead-dashboard">
            <Routes>
              <Route path="/" element={<LeadDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
