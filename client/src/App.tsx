import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
// TEMPORARY: TooltipProvider disabled to fix React preamble error - will re-enable after cache clears
// import { TooltipProvider } from "@/components/ui/tooltip";
// TEMPORARY: BookingCacheProvider disabled to fix React preamble error
// import { BookingCacheProvider } from "@/contexts/BookingCacheContext";
// TEMPORARY: EditModeProvider disabled to fix React preamble error - will re-enable after cache clears
// import { EditModeProvider } from "@/contexts/EditModeContext";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect, useState } from "react";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { XolaMobileCloseButton } from "@/components/XolaMobileCloseButton";

// TBT OPTIMIZATION: GlobalInlineEditor lazy-loaded and only rendered on admin routes
const GlobalInlineEditor = lazy(() => import("@/components/GlobalInlineEditor").then(m => ({ default: m.GlobalInlineEditor })));
// TBT OPTIMIZATION: QuoteWidgetPreloader removed - was preloading unnecessarily on every page load

// Home eagerly loaded for optimal LCP performance
import Home from "./pages/Home";

// All other routes lazy-loaded for optimal code splitting
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Additional lazy-loaded routes
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chat = lazy(() => import("./pages/Chat"));

// PERFORMANCE: Preload Chat page for instant navigation from "Get a Quote" buttons
const preloadChat = () => import("./pages/Chat");
const BookOnline = lazy(() => import("./pages/BookOnline"));
const BookOnlinePopUp = lazy(() => import("./pages/BookOnlinePopUp"));
const BookNow = lazy(() => import("./pages/BookNow"));
const GoldenTicket = lazy(() => import("./pages/GoldenTicket"));
const GoldenTicketPrivate = lazy(() => import("./pages/GoldenTicketPrivate"));
const QuoteBuilderEmbed = lazy(() => import("./pages/QuoteBuilderEmbed"));
const QuoteBuilder = lazy(() => import("./pages/QuoteBuilder"));
const QuoteEditor = lazy(() => import("./pages/QuoteEditor"));
const PartialLeads = lazy(() => import("./pages/PartialLeads"));
const CustomerProfile = lazy(() => import("./pages/CustomerProfile"));
const Projects = lazy(() => import("./pages/Projects"));
const Templates = lazy(() => import("./pages/Templates"));
const Products = lazy(() => import("./pages/Products"));
const Discounts = lazy(() => import("./pages/Discounts"));
const Affiliates = lazy(() => import("./pages/Affiliates"));
const Documentation = lazy(() => import("./pages/Documentation"));
const QuoteViewer = lazy(() => import("./pages/QuoteViewer"));
const Settings = lazy(() => import("./pages/Settings"));
const BookingFlow = lazy(() => import("./pages/BookingFlow"));
const BookingSuccess = lazy(() => import("./pages/BookingSuccess"));

// Blog Pages - Lazy loaded
const Blog = lazy(() => import("./pages/Blog"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogCategory = lazy(() => import("./pages/BlogCategory"));
const BlogTag = lazy(() => import("./pages/BlogTag"));
const BlogAuthor = lazy(() => import("./pages/BlogAuthor"));

// New SEO-Optimized Blog Pages - Lazy loaded
const AustinBachelorPartyIdeas = lazy(() => import("./pages/blog/AustinBachelorPartyIdeas"));
const LakeTravisBachelorPartyBoats = lazy(() => import("./pages/blog/LakeTravisBachelorPartyBoats"));
const WeddingAnniversaryCelebrationIdeas = lazy(() => import("./pages/blog/WeddingAnniversaryCelebrationIdeas"));
const ATXDiscoCruiseExperience = lazy(() => import("./pages/blog/ATXDiscoCruiseExperience"));
const LakeTravisBachelorPartyCelebrations = lazy(() => import("./pages/blog/LakeTravisBachelorPartyCelebrations"));
const BirthdayPartyBoatRentalsLakeTravis = lazy(() => import("./pages/blog/BirthdayPartyBoatRentalsLakeTravis"));
const CorporateTeamBuildingLakeTravis = lazy(() => import("./pages/blog/CorporateTeamBuildingLakeTravis"));
const EmployeeAppreciationDayLakeTravis = lazy(() => import("./pages/blog/EmployeeAppreciationDayLakeTravis"));
const LakeTravisLargeGroupBoatRentals = lazy(() => import("./pages/blog/LakeTravisLargeGroupBoatRentals"));
const WhyChooseAustinBachelorParty = lazy(() => import("./pages/blog/WhyChooseAustinBachelorParty"));
const WhyChooseAustinBacheloretteParty = lazy(() => import("./pages/blog/WhyChooseAustinBacheloretteParty"));
const AustinBachelorPartyJanuary = lazy(() => import("./pages/blog/AustinBachelorPartyJanuary"));
const AustinBachelorPartyMarch = lazy(() => import("./pages/blog/AustinBachelorPartyMarch"));
const AustinBachelorPartyMay = lazy(() => import("./pages/blog/AustinBachelorPartyMay"));
const AustinBachelorPartyJuly = lazy(() => import("./pages/blog/AustinBachelorPartyJuly"));
const AustinBachelorPartyNovember = lazy(() => import("./pages/blog/AustinBachelorPartyNovember"));
const AustinBachelorPartySeptember = lazy(() => import("./pages/blog/AustinBachelorPartySeptember"));
const AustinBachelorettePartyFebruary = lazy(() => import("./pages/blog/AustinBachelorettePartyFebruary"));
const AustinBachelorettePartyApril = lazy(() => import("./pages/blog/AustinBachelorettePartyApril"));
const AustinBachelorettePartyJune = lazy(() => import("./pages/blog/AustinBachelorettePartyJune"));
const AustinBachelorettePartyAugust = lazy(() => import("./pages/blog/AustinBachelorettePartyAugust"));
const AustinBachelorettePartyOctober = lazy(() => import("./pages/blog/AustinBachelorettePartyOctober"));
const AustinBachelorettePartyDecember = lazy(() => import("./pages/blog/AustinBachelorettePartyDecember"));
const EpicBachelorPartyAustinGuide = lazy(() => import("./pages/blog/EpicBachelorPartyAustinGuide"));
const EpicBachelorettePartyAustinGuide = lazy(() => import("./pages/blog/EpicBachelorettePartyAustinGuide"));
const HowToThrowBachelorPartyAustin = lazy(() => import("./pages/blog/HowToThrowBachelorPartyAustin"));
const HowToThrowBachelorettePartyAustin = lazy(() => import("./pages/blog/HowToThrowBachelorettePartyAustin"));
const LakeTravisBachelorPartyBoatsGuide = lazy(() => import("./pages/blog/LakeTravisBachelorPartyBoatsGuide"));
const PerfectAustinBachelorPartyWeekend = lazy(() => import("./pages/blog/PerfectAustinBachelorPartyWeekend"));
const ATXDiscoCruiseDosAndDonts = lazy(() => import("./pages/blog/ATXDiscoCruiseDosAndDonts"));
const BachelorPartyOutfitIdeas = lazy(() => import("./pages/blog/BachelorPartyOutfitIdeas"));
const JointBachelorBachelorettePartyGuide = lazy(() => import("./pages/blog/JointBachelorBachelorettePartyGuide"));
const QuarterlyOutingsLakeTravis = lazy(() => import("./pages/blog/QuarterlyOutingsLakeTravis"));
const SafetyFirstPremierPartyCruises = lazy(() => import("./pages/blog/SafetyFirstPremierPartyCruises"));
const CompanyHolidayPartyLakeTravis = lazy(() => import("./pages/blog/CompanyHolidayPartyLakeTravis"));
const TechCompaniesBoatPartiesAustin = lazy(() => import("./pages/blog/TechCompaniesBoatPartiesAustin"));
const FinanceLawFirmsBoatParties = lazy(() => import("./pages/blog/FinanceLawFirmsBoatParties"));
const RealEstateClientEntertainmentBoat = lazy(() => import("./pages/blog/RealEstateClientEntertainmentBoat"));
const HealthcareWellnessBoatParties = lazy(() => import("./pages/blog/HealthcareWellnessBoatParties"));
const MarketingAgenciesBoatParties = lazy(() => import("./pages/blog/MarketingAgenciesBoatParties"));
const ConstructionTradesBoatParties = lazy(() => import("./pages/blog/ConstructionTradesBoatParties"));
const SmallBusinessBoatParties = lazy(() => import("./pages/blog/SmallBusinessBoatParties"));
const LargeGroupEventsLakeTravis = lazy(() => import("./pages/blog/LargeGroupEventsLakeTravis"));
const CompanyParty10People = lazy(() => import("./pages/blog/CompanyParty10People"));
const CompanyParty25People = lazy(() => import("./pages/blog/CompanyParty25People"));
const CompanyParty50People = lazy(() => import("./pages/blog/CompanyParty50People"));
const CompanyParty75People = lazy(() => import("./pages/blog/CompanyParty75People"));
const AustinBestCorporateEvents = lazy(() => import("./pages/blog/AustinBestCorporateEvents"));
const WhyAustinCompaniesChoosePremier = lazy(() => import("./pages/blog/WhyAustinCompaniesChoosePremier"));
const DallasToLakeTravisCorporate = lazy(() => import("./pages/blog/DallasToLakeTravisCorporate"));
const DestinationAustinOffsiteRetreats = lazy(() => import("./pages/blog/DestinationAustinOffsiteRetreats"));
const AustinSuburbsCorporateEvents = lazy(() => import("./pages/blog/AustinSuburbsCorporateEvents"));
const AllInclusiveCorporatePackages = lazy(() => import("./pages/blog/AllInclusiveCorporatePackages"));

// Site Directory Page - Lazy loaded
const SiteDirectory = lazy(() => import("./pages/SiteDirectory"));

// Admin Blog Pages - Lazy loaded
const BlogManagement = lazy(() => import("./pages/admin/BlogManagement"));
const BlogPostEditor = lazy(() => import("./pages/admin/BlogPostEditor"));
const BlogFormatter = lazy(() => import("./pages/admin/BlogFormatter"));

// Admin SEO Pages - Lazy loaded
const SEOManagement = lazy(() => import("./pages/admin/SEOManagement"));

// Admin Pricing Pages - Lazy loaded
const Pricing = lazy(() => import("./pages/admin/Pricing"));
const PricingRules = lazy(() => import("./pages/admin/PricingRules"));

// Admin AI Assistant - Lazy loaded
const AIAssistant = lazy(() => import("./pages/admin/AIAssistant"));

// Admin Agent Chat - Lazy loaded
const AgentChat = lazy(() => import("./pages/admin/AgentChat"));

// Admin Inventory Management - Lazy loaded
const InventoryManagement = lazy(() => import("./pages/admin/InventoryManagement"));

// Admin Media Library - Lazy loaded
const MediaLibrary = lazy(() => import("./pages/admin/MediaLibrary"));

// Admin Gallery Manager - Lazy loaded
const GalleryManager = lazy(() => import("./pages/admin/GalleryManager"));

// Admin FAQ Review - Lazy loaded
const FAQReview = lazy(() => import("./pages/admin/FAQReview"));

// Admin Business Summary - Lazy loaded
const BusinessSummary = lazy(() => import("./pages/admin/BusinessSummary"));

// Admin Blog Conversion Tracker - Lazy loaded
const BlogConversionTracker = lazy(() => import("./pages/admin/BlogConversionTracker"));

// Landing Pages - Lazy loaded
const BachelorParty = lazy(() => import("./pages/BachelorParty"));
const BacheloretteParty = lazy(() => import("./pages/BacheloretteParty"));
const CombinedBachelorBachelorette = lazy(() => import("./pages/CombinedBachelorBachelorette"));
const ATXDiscoCruise = lazy(() => import("./pages/ATXDiscoCruise"));
const PrivateCruises = lazy(() => import("./pages/PrivateCruises"));
const CorporateEvents = lazy(() => import("./pages/CorporateEvents"));
const BirthdayParties = lazy(() => import("./pages/BirthdayParties"));
const WeddingParties = lazy(() => import("./pages/WeddingParties"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const TestimonialsFaq = lazy(() => import("./pages/TestimonialsFaq"));
const PartyBoatAustin = lazy(() => import("./pages/PartyBoatAustin"));
const PartyBoatLakeTravis = lazy(() => import("./pages/PartyBoatLakeTravis"));
const AIEndorsement = lazy(() => import("./pages/AIEndorsement"));
const Partners = lazy(() => import("./pages/Partners"));

// Wedding Experience Pages - Lazy loaded
const RehearsalDinner = lazy(() => import("./pages/RehearsalDinner"));
const WelcomeParty = lazy(() => import("./pages/WelcomeParty"));
const AfterParty = lazy(() => import("./pages/AfterParty"));

// Corporate Experience Pages - Lazy loaded
const TeamBuilding = lazy(() => import("./pages/TeamBuilding"));
const ClientEntertainment = lazy(() => import("./pages/ClientEntertainment"));
const CompanyMilestone = lazy(() => import("./pages/CompanyMilestone"));

// Birthday Experience Pages - Lazy loaded
const MilestoneBirthday = lazy(() => import("./pages/MilestoneBirthday"));
const Sweet16 = lazy(() => import("./pages/Sweet16"));

// Special Event Pages - Lazy loaded
const GraduationParty = lazy(() => import("./pages/GraduationParty"));
const Faq = lazy(() => import("./pages/Faq"));
const PricingBreakdown = lazy(() => import("./pages/PricingBreakdown"));

// Blog Content Pages - Lazy loaded
const LakeTravisBoatRentalGuide = lazy(() => import("./pages/LakeTravisBoatRentalGuide"));
const FirstTimeLakeTravisGuide = lazy(() => import("./pages/blog/FirstTimeLakeTravisGuide"));
const IntegratedAustinEventServices = lazy(() => import("./pages/blog/IntegratedAustinEventServices"));
const BirthdayPartyAustinGuide = lazy(() => import("./pages/BirthdayPartyAustinGuide"));
const LakeTravisLargeGroupsGuide = lazy(() => import("./pages/LakeTravisLargeGroupsGuide"));
const LakeTravisWeatherGuide = lazy(() => import("./pages/LakeTravisWeatherGuide"));
const UltimateAustinBacheloretteWeekend = lazy(() => import("./pages/UltimateAustinBacheloretteWeekend"));
const Top10AustinBacheloretteIdeas = lazy(() => import("./pages/Top10AustinBacheloretteIdeas"));
const ThreeDayAustinBacheloretteItinerary = lazy(() => import("./pages/ThreeDayAustinBacheloretteItinerary"));
const BudgetAustinBachelorette = lazy(() => import("./pages/BudgetAustinBachelorette"));
const LuxuryAustinBachelorette = lazy(() => import("./pages/LuxuryAustinBachelorette"));
const AdventureAustinBachelorette = lazy(() => import("./pages/AdventureAustinBachelorette"));
const AustinBacheloretteNightlife = lazy(() => import("./pages/AustinBacheloretteNightlife"));
const HolidayCelebrationsLakeTravis = lazy(() => import("./pages/HolidayCelebrationsLakeTravis"));
const JointBachelorBacheloretteParties = lazy(() => import("./pages/JointBachelorBacheloretteParties"));
const LakeTravisWeddingBoatRentals = lazy(() => import("./pages/LakeTravisWeddingBoatRentals"));
const MustHavesAustinBacheloretteWeekend = lazy(() => import("./pages/MustHavesAustinBacheloretteWeekend"));
const TopSpotsAustinBacheloretteParty = lazy(() => import("./pages/TopSpotsAustinBacheloretteParty"));
const RehearsalDinnerBoatAlcoholDelivery = lazy(() => import("./pages/RehearsalDinnerBoatAlcoholDelivery"));
const LakeTravisBachelorPartyBoatRentalsGuide = lazy(() => import("./pages/LakeTravisBachelorPartyBoatRentalsGuide"));
const AustinBacheloretteBlissGuide = lazy(() => import("./pages/AustinBacheloretteBlissGuide"));
const IntegratedEventServicesComparison = lazy(() => import("./pages/blog/IntegratedEventServicesComparison"));
const AustinPartyVenueAlcoholDelivery = lazy(() => import("./pages/blog/AustinPartyVenueAlcoholDelivery"));
const BirthdayPartyAlcoholDeliveryAustin = lazy(() => import("./pages/blog/BirthdayPartyAlcoholDeliveryAustin"));
const GraduationPartyAlcoholPlanning = lazy(() => import("./pages/blog/GraduationPartyAlcoholPlanning"));
const LakeTravisBoatPartyLogistics = lazy(() => import("./pages/blog/LakeTravisBoatPartyLogistics"));
const LakeTravisBoatPartyRegulations = lazy(() => import("./pages/blog/LakeTravisBoatPartyRegulations"));
const LakeTravisBoatSafetyMaintenance = lazy(() => import("./pages/blog/LakeTravisBoatSafetyMaintenance"));
const PartyAlcoholSafetyAustin = lazy(() => import("./pages/blog/PartyAlcoholSafetyAustin"));

// Customer Portal Pages - Lazy loaded
const PortalLogin = lazy(() => import("./pages/PortalLogin"));
const PortalVerify = lazy(() => import("./pages/PortalVerify"));
const PortalDashboard = lazy(() => import("./pages/PortalDashboard"));
const PortalProfile = lazy(() => import("./pages/PortalProfile"));


function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="h-16 bg-white/95 fixed top-0 w-full z-50" />
      <div className="pt-16 min-h-[600px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  // Force page reload on back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Suspense fallback={<PageSkeleton />}>
      <Switch>
        {/* Public Homepage */}
        <Route path="/" component={Home} />
      
      {/* Authentication */}
      <Route path="/auth" component={AuthPage} />
      <Route path="/admin/login" component={AuthPage} />
      
      {/* Landing Pages */}
      <Route path="/bachelor-party-austin" component={BachelorParty} />
      <Route path="/bachelorette-party-austin" component={BacheloretteParty} />
      <Route path="/combined-bachelor-bachelorette-austin" component={CombinedBachelorBachelorette} />
      <Route path="/atx-disco-cruise" component={ATXDiscoCruise} />
      
      {/* Legacy URL Redirects - SEO & User Experience */}
      <Route path="/bachelor-party">
        <Redirect to="/bachelor-party-austin" />
      </Route>
      <Route path="/bachelorette-party">
        <Redirect to="/bachelorette-party-austin" />
      </Route>
      <Route path="/combined-parties-austin">
        <Redirect to="/combined-bachelor-bachelorette-austin" />
      </Route>
      <Route path="/combined-bachelor-bachelorette">
        <Redirect to="/combined-bachelor-bachelorette-austin" />
      </Route>
      
      {/* Phase 3: Phantom URL Redirects (301 permanent via server + client-side fallback) */}
      <Route path="/bachelor-bachelorette-party-boat-austin">
        <Redirect to="/combined-bachelor-bachelorette-austin" />
      </Route>
      <Route path="/testimonials">
        <Redirect to="/testimonials-faq" />
      </Route>
      <Route path="/three-day-austin-bachelorette-itinerary">
        <Redirect to="/3-day-austin-bachelorette-itinerary" />
      </Route>
      <Route path="/about">
        <Redirect to="/" />
      </Route>
      
      <Route path="/private-cruises" component={PrivateCruises} />
      <Route path="/corporate-events" component={CorporateEvents} />
      <Route path="/birthday-parties" component={BirthdayParties} />
      <Route path="/wedding-parties" component={WeddingParties} />
      <Route path="/party-boat-austin" component={PartyBoatAustin} />
      <Route path="/party-boat-lake-travis" component={PartyBoatLakeTravis} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route path="/testimonials-faq" component={TestimonialsFaq} />
      <Route path="/ai-endorsement" component={AIEndorsement} />
      <Route path="/partners" component={Partners} />
      <Route path="/site-directory" component={SiteDirectory} />
      
      {/* Wedding Experience Pages */}
      <Route path="/rehearsal-dinner" component={RehearsalDinner} />
      <Route path="/welcome-party" component={WelcomeParty} />
      <Route path="/after-party" component={AfterParty} />
      
      {/* Corporate Experience Pages */}
      <Route path="/team-building" component={TeamBuilding} />
      <Route path="/client-entertainment" component={ClientEntertainment} />
      <Route path="/company-milestone" component={CompanyMilestone} />
      
      {/* Birthday Experience Pages */}
      <Route path="/milestone-birthday" component={MilestoneBirthday} />
      <Route path="/sweet-16" component={Sweet16} />
      
      {/* Special Event Pages */}
      <Route path="/graduation-party" component={GraduationParty} />
      <Route path="/faq" component={Faq} />
      <Route path="/pricing-breakdown" component={PricingBreakdown} />
      
      {/* Blog Content Pages */}
      <Route path="/first-time-lake-travis-boat-rental-guide" component={LakeTravisBoatRentalGuide} />
      <Route path="/ultimate-austin-bachelorette-weekend" component={UltimateAustinBacheloretteWeekend} />
      <Route path="/top-10-austin-bachelorette-ideas" component={Top10AustinBacheloretteIdeas} />
      <Route path="/3-day-austin-bachelorette-itinerary" component={ThreeDayAustinBacheloretteItinerary} />
      <Route path="/budget-austin-bachelorette" component={BudgetAustinBachelorette} />
      <Route path="/luxury-austin-bachelorette" component={LuxuryAustinBachelorette} />
      <Route path="/adventure-austin-bachelorette" component={AdventureAustinBachelorette} />
      <Route path="/austin-bachelorette-nightlife" component={AustinBacheloretteNightlife} />
      <Route path="/blogs/holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination" component={HolidayCelebrationsLakeTravis} />
      <Route path="/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises" component={JointBachelorBacheloretteParties} />
      <Route path="/blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations" component={LakeTravisWeddingBoatRentals} />
      <Route path="/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend" component={MustHavesAustinBacheloretteWeekend} />
      <Route path="/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience" component={TopSpotsAustinBacheloretteParty} />
      
      {/* New SEO-Optimized Bachelor Party Blog Pages */}
      <Route path="/blogs/austin-bachelor-party-ideas" component={AustinBachelorPartyIdeas} />
      <Route path="/blogs/perfect-austin-bachelor-party-weekend" component={PerfectAustinBachelorPartyWeekend} />
      <Route path="/lake-travis-bachelor-party-boats" component={LakeTravisBachelorPartyBoats} />
      <Route path="/blogs/atx-disco-cruise-experience" component={ATXDiscoCruiseExperience} />
      <Route path="/blogs/lake-travis-bachelor-party-austin-celebrations" component={LakeTravisBachelorPartyCelebrations} />
      
      {/* Wedding Anniversary Blog Page */}
      <Route path="/wedding-anniversary-celebration-ideas" component={WeddingAnniversaryCelebrationIdeas} />
      
      {/* Rehearsal Dinner Boat + Alcohol Delivery - Full React Page */}
      <Route path="/blog/rehearsal-dinner-boat-alcohol-delivery-unique-wedding-weekend-experiences" component={RehearsalDinnerBoatAlcoholDelivery} />
      <Route path="/rehearsal-dinner-boat-alcohol-delivery" component={RehearsalDinnerBoatAlcoholDelivery} />
      
      {/* Redirect /blog/ version to /blogs/ React page */}
      <Route path="/blog/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience">
        {() => {
          const [, navigate] = useLocation();
          useEffect(() => {
            navigate('/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience', { replace: true });
          }, [navigate]);
          return null;
        }}
      </Route>
      
      {/* Redirect broken indexed URLs */}
      <Route path="/party-cruises-2025">
        {() => {
          const [, navigate] = useLocation();
          useEffect(() => {
            navigate('/', { replace: true });
          }, [navigate]);
          return null;
        }}
      </Route>
      
      {/* Replace old static blogs with new React versions */}
      <Route path="/blogs/lake-travis-bachelor-party-boat-rentals-the-ultimate-guide-to-epic-celebrations" component={LakeTravisBachelorPartyBoatRentalsGuide} />
      <Route path="/blogs/austin-bachelorette-bliss-spa-retreats-disco-cruises-alcohol-delivery" component={AustinBacheloretteBlissGuide} />
      <Route path="/blogs/why-choose-integrated-event-services-comparing-austin-party-planning-options" component={IntegratedEventServicesComparison} />
      <Route path="/blogs/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy" component={BirthdayPartyAlcoholDeliveryAustin} />
      <Route path="/blogs/austin-party-venue-alcohol-delivery-navigating-policies-and-logistics" component={AustinPartyVenueAlcoholDelivery} />
      <Route path="/blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide" component={LakeTravisBoatPartyLogistics} />
      <Route path="/blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning" component={FirstTimeLakeTravisGuide} />
      <Route path="/blogs/integrated-austin-event-services-combining-alcohol-delivery-and-boat-rentals-for-perfect-celebrations" component={IntegratedAustinEventServices} />
      <Route path="/blog/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy" component={BirthdayPartyAustinGuide} />
      <Route path="/blog/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests" component={LakeTravisLargeGroupsGuide} />
      <Route path="/blog/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties" component={LakeTravisWeatherGuide} />
      <Route path="/blogs/birthday-party-boat-rentals-on-lake-travis-milestone-celebrations-with-a-view" component={BirthdayPartyBoatRentalsLakeTravis} />
      <Route path="/blogs/corporate-team-building-on-lake-travis-professional-boat-rental-solutions" component={CorporateTeamBuildingLakeTravis} />
      <Route path="/blogs/all-inclusive-corporate-packages-austin" component={AllInclusiveCorporatePackages} />
      <Route path="/blogs/dallas-to-lake-travis-corporate" component={DallasToLakeTravisCorporate} />
      <Route path="/blogs/destination-austin-offsite-retreats" component={DestinationAustinOffsiteRetreats} />
      <Route path="/blogs/austin-suburbs-corporate-events" component={AustinSuburbsCorporateEvents} />
      <Route path="/blogs/why-austin-companies-choose-premier" component={WhyAustinCompaniesChoosePremier} />
      <Route path="/blogs/quarterly-outings-lake-travis-make-routine-company-events-easy" component={QuarterlyOutingsLakeTravis} />
      <Route path="/blogs/safety-first-how-premiers-perfect-record-and-first-aid-training-set-us-apart" component={SafetyFirstPremierPartyCruises} />
      <Route path="/blogs/company-holiday-party-lake-travis" component={CompanyHolidayPartyLakeTravis} />
      <Route path="/blogs/employee-appreciation-day-reward-your-team-with-an-easy-all-inclusive-boat-party" component={EmployeeAppreciationDayLakeTravis} />
      <Route path="/blogs/graduation-party-alcohol-planning-ut-and-austin-college-celebrations" component={GraduationPartyAlcoholPlanning} />
      <Route path="/blogs/lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide" component={LakeTravisBoatPartyRegulations} />
      <Route path="/blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises" component={LakeTravisBoatSafetyMaintenance} />
      <Route path="/blogs/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests" component={LakeTravisLargeGroupBoatRentals} />
      <Route path="/blogs/party-alcohol-safety-in-austin-responsible-service-and-guest-well-being" component={PartyAlcoholSafetyAustin} />
      <Route path="/blogs/why-choose-austin-bachelor-party" component={WhyChooseAustinBachelorParty} />
      <Route path="/blogs/why-choose-austin-bachelorette-party" component={WhyChooseAustinBacheloretteParty} />
      <Route path="/blogs/austin-bachelor-party-january" component={AustinBachelorPartyJanuary} />
      <Route path="/blogs/austin-bachelor-party-march" component={AustinBachelorPartyMarch} />
      <Route path="/blogs/austin-bachelor-party-may" component={AustinBachelorPartyMay} />
      <Route path="/blogs/austin-bachelor-party-july" component={AustinBachelorPartyJuly} />
      <Route path="/blogs/austin-bachelor-party-november" component={AustinBachelorPartyNovember} />
      <Route path="/blogs/austin-bachelor-party-september" component={AustinBachelorPartySeptember} />
      <Route path="/blogs/austin-bachelorette-party-february" component={AustinBachelorettePartyFebruary} />
      <Route path="/blogs/austin-bachelorette-party-april" component={AustinBachelorettePartyApril} />
      <Route path="/blogs/austin-bachelorette-party-june" component={AustinBachelorettePartyJune} />
      <Route path="/blogs/austin-bachelorette-party-august" component={AustinBachelorettePartyAugust} />
      <Route path="/blogs/austin-bachelorette-party-october" component={AustinBachelorettePartyOctober} />
      <Route path="/blogs/austin-bachelorette-party-december" component={AustinBachelorettePartyDecember} />
      <Route path="/blogs/epic-bachelor-party-austin-ultimate-guide" component={EpicBachelorPartyAustinGuide} />
      <Route path="/blogs/epic-bachelorette-party-austin-ultimate-guide" component={EpicBachelorettePartyAustinGuide} />
      <Route path="/blogs/how-to-throw-great-bachelor-party-austin" component={HowToThrowBachelorPartyAustin} />
      <Route path="/blogs/how-to-throw-great-bachelorette-party-austin" component={HowToThrowBachelorettePartyAustin} />
      <Route path="/blogs/lake-travis-bachelor-party-boats-guide" component={LakeTravisBachelorPartyBoatsGuide} />
      <Route path="/blogs/atx-disco-cruise-dos-and-donts-bachelor-party" component={ATXDiscoCruiseDosAndDonts} />
      <Route path="/blogs/bachelor-party-outfit-ideas-atx-disco-cruise" component={BachelorPartyOutfitIdeas} />
      <Route path="/blogs/joint-bachelor-bachelorette-party-guide" component={JointBachelorBachelorettePartyGuide} />
      <Route path="/blogs/tech-companies-boat-parties-austin" component={TechCompaniesBoatPartiesAustin} />
      <Route path="/blogs/finance-law-firms-boat-parties-austin" component={FinanceLawFirmsBoatParties} />
      <Route path="/blogs/real-estate-client-entertainment-boat-austin" component={RealEstateClientEntertainmentBoat} />
      <Route path="/blogs/healthcare-wellness-boat-parties-austin" component={HealthcareWellnessBoatParties} />
      <Route path="/blogs/marketing-creative-agencies-boat-austin" component={MarketingAgenciesBoatParties} />
      <Route path="/blogs/construction-trades-boat-parties-austin" component={ConstructionTradesBoatParties} />
      <Route path="/blogs/small-business-boat-parties-austin" component={SmallBusinessBoatParties} />
      <Route path="/blogs/large-group-events-lake-travis" component={LargeGroupEventsLakeTravis} />
      <Route path="/blogs/company-party-10-people-austin" component={CompanyParty10People} />
      <Route path="/blogs/company-party-25-people-austin" component={CompanyParty25People} />
      <Route path="/blogs/company-party-50-people-austin" component={CompanyParty50People} />
      <Route path="/blogs/company-party-75-people-austin" component={CompanyParty75People} />
      <Route path="/blogs/austin-best-corporate-events" component={AustinBestCorporateEvents} />
      
      {/* Public Booking - Commented out, using /chat instead */}
      {/* <Route path="/calendar" component={PublicCalendar} /> */}
      
      {/* Quote display route - tokenized quote viewing */}
      <Route path="/quote/:token" component={QuoteViewer} />
      
      {/* Legacy quote ID route - redirects to Chat with quote ID */}
      <Route path="/quote/id/:id">
        {() => {
          const [, navigate] = useLocation();
          useEffect(() => {
            // Redirect to chat - the quote builder iframe handles quote context
            navigate('/chat');
          }, [navigate]);
          return null;
        }}
      </Route>
      
      {/* Legacy direct quote ID route - handles old emailed links /quote/ABC123 */}
      <Route path="/quote/:id">
        {(params) => {
          const id = params.id;
          const [, navigate] = useLocation();
          
          useEffect(() => {
            // Smart detection: tokens are long with dots, legacy IDs are short alphanumeric
            if (id && !(id.length > 50 || id.includes('.'))) {
              // This looks like a legacy quote ID, redirect to Chat
              console.log('🔗 Legacy quote ID detected, redirecting to Chat:', id);
              navigate('/chat');
            }
          }, [id, navigate]);
          
          // If it's a token (long or has dots), QuoteViewer will handle it via useParams
          if (id && (id.length > 50 || id.includes('.'))) {
            return <QuoteViewer />;
          }
          
          return null;
        }}
      </Route>
      
      {/* Public Quote Builder (Chat) - No auth required */}
      <Route path="/chat">
        <Chat />
      </Route>
      
      {/* Book Online redirects to /book-now (SEO canonical) */}
      <Route path="/book-online">
        <Redirect to="/book-now" />
      </Route>
      
      {/* Book Online Pop-Up redirects to /book-now (SEO canonical) */}
      <Route path="/book-online-popup">
        <Redirect to="/book-now" />
      </Route>
      
      {/* Book Now - FRESH Xola Integration - No auth required */}
      <Route path="/book-now">
        <BookNow />
      </Route>
      
      {/* Golden Ticket Promotion Page - No auth required */}
      <Route path="/golden-ticket">
        <GoldenTicket />
      </Route>
      
      {/* Golden Ticket Private Groups Page - No auth required */}
      <Route path="/golden-ticket-private">
        <GoldenTicketPrivate />
      </Route>
      
      {/* Public quote-builder redirects to /chat */}
      <Route path="/quote-builder" component={() => {
        const [, navigate] = useLocation();
        useEffect(() => {
          navigate('/chat');
        }, [navigate]);
        return null;
      }} />
      
      {/* Admin Dashboard Routes - LOGIN REQUIRED */}
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/admin">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/customers/:id">
        {(params) => (
          <ProtectedRoute>
            <CustomerProfile params={params} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/partial-leads">
        <ProtectedRoute>
          <PartialLeads />
        </ProtectedRoute>
      </Route>
      <Route path="/projects">
        <ProtectedRoute>
          <Projects />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Quote Builder - LOGIN REQUIRED */}
      <Route path="/admin/quote-builder">
        <ProtectedRoute>
          <QuoteBuilder />
        </ProtectedRoute>
      </Route>
      <Route path="/quotes/new">
        <ProtectedRoute>
          <QuoteBuilder />
        </ProtectedRoute>
      </Route>
      <Route path="/quotes/:id">
        <ProtectedRoute>
          <QuoteBuilder />
        </ProtectedRoute>
      </Route>
      <Route path="/quotes/:id/edit">
        <ProtectedRoute>
          <QuoteEditor />
        </ProtectedRoute>
      </Route>
      <Route path="/templates">
        <ProtectedRoute>
          <Templates />
        </ProtectedRoute>
      </Route>
      <Route path="/products">
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      </Route>
      <Route path="/discounts">
        <ProtectedRoute>
          <Discounts />
        </ProtectedRoute>
      </Route>
      <Route path="/affiliates">
        <ProtectedRoute>
          <Affiliates />
        </ProtectedRoute>
      </Route>
      <Route path="/documentation">
        <ProtectedRoute>
          <Documentation />
        </ProtectedRoute>
      </Route>
      <Route path="/settings">
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Blog Routes - LOGIN REQUIRED */}
      <Route path="/admin/blogs">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/posts">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/posts/new">
        <ProtectedRoute>
          <BlogPostEditor />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/posts/:id/edit">
        <ProtectedRoute>
          <BlogPostEditor />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/categories">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/categories/new">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/categories/:id/edit">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/tags">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/tags/new">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/tags/:id/edit">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/authors">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/authors/new">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs/authors/:id/edit">
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blog-formatter">
        <ProtectedRoute>
          <BlogFormatter />
        </ProtectedRoute>
      </Route>
      
      {/* Admin SEO Routes - LOGIN REQUIRED */}
      <Route path="/admin/seo">
        <ProtectedRoute>
          <SEOManagement />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Pricing Routes - LOGIN REQUIRED */}
      <Route path="/admin/pricing">
        <ProtectedRoute>
          <Pricing />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/pricing-rules">
        <ProtectedRoute>
          <PricingRules />
        </ProtectedRoute>
      </Route>
      
      {/* Admin AI Assistant - LOGIN REQUIRED */}
      <Route path="/admin/ai-assistant">
        <ProtectedRoute>
          <AIAssistant />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Agent Chat - LOGIN REQUIRED */}
      <Route path="/admin/agent-chat">
        <ProtectedRoute>
          <AgentChat />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Inventory Management - LOGIN REQUIRED */}
      <Route path="/admin/inventory">
        <ProtectedRoute>
          <InventoryManagement />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Media & Tools - LOGIN REQUIRED */}
      <Route path="/admin/media">
        <ProtectedRoute>
          <MediaLibrary />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/gallery">
        <ProtectedRoute>
          <GalleryManager />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/faq-review">
        <ProtectedRoute>
          <FAQReview />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/business-summary">
        <ProtectedRoute>
          <BusinessSummary />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Blog Conversion Tracker - LOGIN REQUIRED */}
      <Route path="/admin/blog-conversion">
        <ProtectedRoute>
          <BlogConversionTracker />
        </ProtectedRoute>
      </Route>
      
      {/* Admin Content Blocks - LOGIN REQUIRED */}
      <Route path="/admin/content-blocks">
        <ProtectedRoute>
          <Suspense fallback={null}>
            {(() => {
              const ContentBlocksManagement = lazy(() => import('./pages/admin/ContentBlocksManagement'));
              return <ContentBlocksManagement />;
            })()}
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      {/* Demo Content Page - LOGIN REQUIRED */}
      <Route path="/demo-content">
        <ProtectedRoute>
          <Suspense fallback={null}>
            {(() => {
              const DemoContentPage = lazy(() => import('./pages/DemoContentPage'));
              return <DemoContentPage />;
            })()}
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      {/* Public Blog Routes - /blogs is canonical, /blog redirects to /blogs */}
      <Route path="/blog">
        <Redirect to="/blogs" />
      </Route>
      <Route path="/blog/category/:slug">
        {(params) => <Redirect to={`/blogs/category/${params.slug}`} />}
      </Route>
      <Route path="/blog/tag/:slug">
        {(params) => <Redirect to={`/blogs/tag/${params.slug}`} />}
      </Route>
      <Route path="/blog/author/:id">
        {(params) => <Redirect to={`/blogs/author/${params.id}`} />}
      </Route>
      <Route path="/blog/:slug">
        {(params) => <Redirect to={`/blogs/${params.slug}`} />}
      </Route>
      <Route path="/blogs" component={Blogs} />
      <Route path="/blogs/category/:slug" component={BlogCategory} />
      <Route path="/blogs/tag/:slug" component={BlogTag} />
      <Route path="/blogs/author/:id" component={BlogAuthor} />
      <Route path="/blogs/:slug" component={BlogPost} />
      
      {/* Public Customer Routes - Calendar routes commented out, using /chat instead */}
      {/* <Route path="/book" component={PublicCalendar} /> */}
      {/* <Route path="/availability" component={PublicCalendar} /> */}
      {/* <Route path="/book/:slotId" component={BookingFlow} /> */}
      {/* <Route path="/booking-success" component={BookingSuccess} /> */}
      
      {/* Customer Portal Routes */}
      <Route path="/portal" component={PortalLogin} />
      <Route path="/portal/login" component={PortalLogin} />
      <Route path="/portal/verify" component={PortalVerify} />
      <Route path="/portal/dashboard" component={PortalDashboard} />
      <Route path="/portal/profile" component={PortalProfile} />
      
      {/* 404 Fallback */}
      <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // Xola script loads from index.html - always ready
  const [xolaReady] = useState(true);
  const [location] = useLocation();
  
  // TBT OPTIMIZATION: Only load GlobalInlineEditor for admin/dashboard routes
  const isAdminRoute = location.startsWith('/admin') || location.startsWith('/dashboard');
  
  // PERFORMANCE: Preload Chat page after initial paint for instant "Get a Quote" navigation
  useEffect(() => {
    const preload = () => {
      preloadChat();
    };
    // Use requestIdleCallback for optimal timing, fallback to setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preload, { timeout: 2000 });
    } else {
      setTimeout(preload, 100);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* TEMPORARY: BookingCacheProvider disabled to fix React preamble error */}
        {/* <BookingCacheProvider> */}
          {/* TEMPORARY: EditModeProvider disabled to fix React preamble error */}
          {/* <EditModeProvider> */}
            <HelmetProvider>
              {/* TEMPORARY: TooltipProvider disabled to fix React preamble error */}
              {/* <TooltipProvider> */}
                <GoogleAnalytics />
                <Toaster />
                {/* TBT OPTIMIZATION: GlobalInlineEditor only renders on admin routes */}
                {isAdminRoute && (
                  <Suspense fallback={null}>
                    <GlobalInlineEditor />
                  </Suspense>
                )}
                <XolaMobileCloseButton />
                {/* TBT OPTIMIZATION: QuoteWidgetPreloader removed - was blocking main thread */}
                <ErrorBoundary>
                  <Router />
                </ErrorBoundary>
              {/* </TooltipProvider> */}
            </HelmetProvider>
          {/* </EditModeProvider> */}
        {/* </BookingCacheProvider> */}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;