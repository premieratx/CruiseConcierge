// SSR FIX: Explicit React import needed for Node.js SSR environment
import React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
// SSR FIX: Use star import for react-helmet-async to work with both tsx and Vite SSR
import * as HelmetAsync from "react-helmet-async";
const HelmetProvider = (HelmetAsync as any).HelmetProvider || (HelmetAsync as any).default?.HelmetProvider;
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
// TEMPORARY: BookingCacheProvider disabled to fix React preamble error
// import { BookingCacheProvider } from "./contexts/BookingCacheContext.tsx";
import { EditModeProvider } from "./contexts/EditModeContext.tsx";
import { AuthProvider } from "./hooks/use-auth.tsx";
import App from "./App.tsx";

// Custom location hook for SSR with wouter
const staticLocationHook = (path: string) => () => [path, () => {}] as const;

export interface SSRContext {
  helmetContext: {
    helmet?: {
      title?: { toString: () => string };
      meta?: { toString: () => string };
      link?: { toString: () => string };
      script?: { toString: () => string };
    };
  };
}

// Preload lazy modules for blog pages to ensure content renders on first SSR request
// This maps blog slug patterns to their component import functions
async function preloadBlogModule(url: string): Promise<void> {
  // Extract slug from /blogs/slug-name URL
  const match = url.match(/^\/blogs\/([^/]+)/);
  if (!match) return;
  
  const slug = match[1];
  
  // Map of slug patterns to their component imports
  // These are the lazy-loaded blog components that need pre-loading for SSR
  const blogModules: Record<string, () => Promise<any>> = {
    'austin-bachelor-party-ideas': () => import('./pages/blog/AustinBachelorPartyIdeas'),
    'austin-best-corporate-events': () => import('./pages/blog/AustinBestCorporateEvents'),
    'atx-disco-cruise-experience': () => import('./pages/blog/ATXDiscoCruiseExperience'),
    'lake-travis-bachelor-party-boats-guide': () => import('./pages/blog/LakeTravisBachelorPartyBoatsGuide'),
    'birthday-party-boat-rentals-on-lake-travis-milestone-celebrations-with-a-view': () => import('./pages/blog/BirthdayPartyBoatRentalsLakeTravis'),
    'all-inclusive-corporate-packages-austin': () => import('./pages/blog/AllInclusiveCorporatePackages'),
    'company-holiday-party-lake-travis': () => import('./pages/blog/CompanyHolidayPartyLakeTravis'),
    'austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations': () => import('./pages/blog/AustinBachelorettePartyBoats'),
    'austin-bachelorette-party-april': () => import('./pages/blog/AustinBachelorettePartyApril'),
    'austin-bachelorette-party-august': () => import('./pages/blog/AustinBachelorettePartyAugust'),
    'austin-bachelorette-party-december': () => import('./pages/blog/AustinBachelorettePartyDecember'),
    'austin-bachelorette-party-february': () => import('./pages/blog/AustinBachelorettePartyFebruary'),
    'austin-bachelorette-party-june': () => import('./pages/blog/AustinBachelorettePartyJune'),
    'austin-bachelorette-party-october': () => import('./pages/blog/AustinBachelorettePartyOctober'),
    'austin-bachelor-party-january': () => import('./pages/blog/AustinBachelorPartyJanuary'),
    'austin-bachelor-party-july': () => import('./pages/blog/AustinBachelorPartyJuly'),
    'austin-bachelor-party-march': () => import('./pages/blog/AustinBachelorPartyMarch'),
    'austin-bachelor-party-may': () => import('./pages/blog/AustinBachelorPartyMay'),
    'austin-bachelor-party-november': () => import('./pages/blog/AustinBachelorPartyNovember'),
    'austin-bachelor-party-september': () => import('./pages/blog/AustinBachelorPartySeptember'),
    'why-atx-disco-cruise-austins-most-booked-party-boat-experience': () => import('./pages/blog/WhyATXDiscoCruiseMostBooked'),
    'private-party-cruise-vs-party-boat-pontoon-lake-travis': () => import('./pages/blog/PrivateCruiseVsPartyBoatPontoon'),
    'tech-companies-boat-parties-austin': () => import('./pages/blog/TechCompaniesBoatPartiesAustin'),
    'healthcare-wellness-boat-parties-austin': () => import('./pages/blog/HealthcareWellnessBoatParties'),
    'quarterly-outings-lake-travis-make-routine-company-events-easy': () => import('./pages/blog/QuarterlyOutingsLakeTravis'),
    'accessible-lake-travis-boat-parties-inclusive-event-planning-for-all-guests': () => import('./pages/blog/AccessibleLakeTravisParties'),
    'why-austin-companies-choose-premier': () => import('./pages/blog/WhyAustinCompaniesChoosePremier'),
    'bachelorette-party-vs-downtown-nightlife-austin': () => import('./pages/blog/BachelorettePartyVsNightlife'),
    'budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank': () => import('./pages/blog/BudgetFriendlyBacheloretteAlcohol'),
    'instagram-worthy-bachelorette-party-cocktails-recipes-and-delivery-coordination': () => import('./pages/blog/InstagramBacheloretteCocktails'),
    'lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning': () => import('./pages/blog/LakeTravisBoatPartyCosts'),
    'lake-travis-boat-party-catering-food-and-beverage-coordination-for-perfect-events': () => import('./pages/blog/LakeTravisBoatPartyCatering'),
    'lake-travis-boat-party-entertainment-activities-and-amenities-for-unforgettable-events': () => import('./pages/blog/LakeTravisBoatPartyEntertainment'),
    'lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events': () => import('./pages/blog/LakeTravisBoatPartyInsurance'),
    'lake-travis-boat-party-music-sound-systems-and-entertainment-coordination': () => import('./pages/blog/LakeTravisBoatPartyMusic'),
    'lake-travis-boat-party-photography-capturing-perfect-memories-on-the-water': () => import('./pages/blog/LakeTravisBoatPartyPhotography'),
    'real-estate-client-entertainment-boat-austin': () => import('./pages/blog/RealEstateClientEntertainmentBoat'),
    'company-party-10-people-austin': () => import('./pages/blog/CompanyParty10People'),
    'company-party-25-people-austin': () => import('./pages/blog/CompanyParty25People'),
    'company-party-50-people-austin': () => import('./pages/blog/CompanyParty50People'),
    'company-party-75-people-austin': () => import('./pages/blog/CompanyParty75People'),
    'finance-law-firms-boat-parties-austin': () => import('./pages/blog/FinanceLawFirmsBoatParties'),
    'marketing-creative-agencies-boat-austin': () => import('./pages/blog/MarketingAgenciesBoatParties'),
    'austin-suburbs-corporate-events': () => import('./pages/blog/AustinSuburbsCorporateEvents'),
    'austin-party-venue-alcohol-delivery-navigating-policies-and-logistics': () => import('./pages/blog/AustinPartyVenueAlcoholDelivery'),
    'austin-wedding-venue-alcohol-policies-delivery-solutions-for-every-location': () => import('./pages/blog/AustinWeddingVenueAlcohol'),
    'holiday-office-party-alcohol-delivery-stress-free-corporate-celebration-planning': () => import('./pages/blog/HolidayOfficePartyAlcohol'),
    'cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy': () => import('./pages/blog/CocktailKitsVsBottles'),
    'atx-disco-cruise-dos-and-donts-bachelor-party': () => import('./pages/blog/ATXDiscoCruiseDosAndDonts'),
    'bachelor-party-outfit-ideas-atx-disco-cruise': () => import('./pages/blog/BachelorPartyOutfitIdeas'),
    'bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions': () => import('./pages/blog/BacheloretteAlcoholEmergencyKit'),
    'birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy': () => import('./pages/blog/BirthdayPartyAlcoholDeliveryAustin'),
  };
  
  const moduleLoader = blogModules[slug];
  if (moduleLoader) {
    try {
      await moduleLoader();
    } catch (e) {
      // Silent fail - module will be loaded lazily as fallback
    }
  }
}

// Helper function to perform a single render
function doRender(url: string, helmetContext: SSRContext["helmetContext"]) {
  return renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <Router hook={staticLocationHook(url)}>
          <AuthProvider>
            <EditModeProvider>
              <App />
            </EditModeProvider>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

// Async render function that preloads modules before rendering
export async function render(url: string) {
  // Preload the blog module for this URL to ensure it's available synchronously
  await preloadBlogModule(url);
  
  // First render primes the lazy module cache
  const primeContext: SSRContext["helmetContext"] = {};
  const primeHtml = doRender(url, primeContext);
  
  // If first render is too small (lazy modules not loaded), wait a tick and render again
  if (primeHtml.length < 5000 && url.startsWith('/blogs/')) {
    // Small delay to allow async module loading to complete
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Second render should have the lazy modules cached
    const helmetContext: SSRContext["helmetContext"] = {};
    const html = doRender(url, helmetContext);
    const helmet = helmetContext.helmet || {};
    
    return {
      html,
      helmet: {
        title: helmet.title?.toString() || '',
        meta: helmet.meta?.toString() || '',
        link: helmet.link?.toString() || '',
        script: helmet.script?.toString() || ''
      }
    };
  }
  
  // First render was sufficient
  const helmet = primeContext.helmet || {};
  return {
    html: primeHtml,
    helmet: {
      title: helmet.title?.toString() || '',
      meta: helmet.meta?.toString() || '',
      link: helmet.link?.toString() || '',
      script: helmet.script?.toString() || ''
    }
  };
}
