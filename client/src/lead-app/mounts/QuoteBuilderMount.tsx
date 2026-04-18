"use client";

import { Toaster } from "@/lead-app/components/ui/toaster";
import { Toaster as Sonner } from "@/lead-app/components/ui/sonner";
import { TooltipProvider } from "@/lead-app/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewQuoteV2 from "@/lead-app/pages/NewQuoteV2";
import BookingSuccess from "@/lead-app/pages/BookingSuccess";
import Waiver from "@/lead-app/pages/Waiver";
import NotFound from "@/lead-app/pages/NotFound";

const queryClient = new QueryClient();

export default function QuoteBuilderMount() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/quote-builder">
            <Routes>
              <Route path="/" element={<NewQuoteV2 />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/waiver" element={<Waiver />} />
              <Route path="/quote-v2" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
