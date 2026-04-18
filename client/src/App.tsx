import React, { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
// TBT OPTIMIZATION: Toaster lazy loaded - not critical for initial render
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
// TEMPORARY: TooltipProvider disabled to fix React preamble error - will re-enable after cache clears
// import { TooltipProvider } from "@/components/ui/tooltip";
// TEMPORARY: BookingCacheProvider disabled to fix React preamble error
// import { BookingCacheProvider } from "@/contexts/BookingCacheContext";
// TEMPORARY: EditModeProvider disabled to fix React preamble error - will re-enable after cache clears
// import { EditModeProvider } from "@/contexts/EditModeContext";
// SSR FIX: Use star import for react-helmet-async to work with both tsx and Vite SSR
import * as HelmetAsync from 'react-helmet-async';
const HelmetProvider = (HelmetAsync as any).HelmetProvider || (HelmetAsync as any).default?.HelmetProvider;
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
// TBT OPTIMIZATION: GoogleAnalytics lazy loaded - deferred loading anyway
const GoogleAnalytics = lazy(() => import("@/components/GoogleAnalytics").then(m => ({ default: m.GoogleAnalytics })));
// ErrorBoundary must be sync loaded - it wraps Router and delaying it blocks entire app render
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { QuoteLightboxProvider } from "@/components/QuoteLightbox";
// TBT OPTIMIZATION: XolaMobileCloseButton lazy loaded - only used for Xola modal
const XolaMobileCloseButton = lazy(() => import("@/components/XolaMobileCloseButton").then(m => ({ default: m.XolaMobileCloseButton })));

// TBT OPTIMIZATION: GlobalInlineEditor lazy-loaded and only rendered on admin routes
const GlobalInlineEditor = lazy(() => import("@/components/GlobalInlineEditor").then(m => ({ default: m.GlobalInlineEditor })));
// TBT OPTIMIZATION: QuoteWidgetPreloader removed - was preloading unnecessarily on every page load

// Home eagerly loaded for optimal LCP performance
import Home from "./pages/Home";
import HomeNew from "./pages/Home-New";

// V2 Luxury pages - lazy loaded for performance
const QuoteNative = lazy(() => import("./pages/QuoteNative"));
const BacheloretteV2 = lazy(() => import("./pages/BacheloretteV2"));
const BachelorV2 = lazy(() => import("./pages/BachelorV2"));
const CombinedBachV2 = lazy(() => import("./pages/CombinedBachV2"));
const DiscoV2 = lazy(() => import("./pages/DiscoV2"));
const PrivateCruisesV2 = lazy(() => import("./pages/PrivateCruisesV2"));
const CorporateV2 = lazy(() => import("./pages/CorporateV2"));
const WeddingV2 = lazy(() => import("./pages/WeddingV2"));
const BirthdayV2 = lazy(() => import("./pages/BirthdayV2"));

// V2 Utility
const ContactV2 = lazy(() => import("./pages/ContactV2"));
const FAQV2 = lazy(() => import("./pages/FAQV2"));
const GalleryV2 = lazy(() => import("./pages/GalleryV2"));
const PricingV2 = lazy(() => import("./pages/PricingV2"));
const PricingBreakdownV2 = lazy(() => import("./pages/PricingBreakdownV2"));
const TestimonialsFAQV2 = lazy(() => import("./pages/TestimonialsFAQV2"));

// V2 Wedding-adjacent
const AfterPartyV2 = lazy(() => import("./pages/AfterPartyV2"));
const WelcomePartyV2 = lazy(() => import("./pages/WelcomePartyV2"));
const RehearsalDinnerV2 = lazy(() => import("./pages/RehearsalDinnerV2"));
const RehearsalDinnerCruiseV2 = lazy(() => import("./pages/RehearsalDinnerCruiseV2"));
const BridalShowerCruiseV2 = lazy(() => import("./pages/BridalShowerCruiseV2"));
const EngagementPartyCruiseV2 = lazy(() => import("./pages/EngagementPartyCruiseV2"));
const AnniversaryCruiseV2 = lazy(() => import("./pages/AnniversaryCruiseV2"));
const WeddingAnniversaryIdeasV2 = lazy(() => import("./pages/WeddingAnniversaryIdeasV2"));
const ProposalCruiseV2 = lazy(() => import("./pages/ProposalCruiseV2"));

// V2 Corporate
const TeamBuildingV2 = lazy(() => import("./pages/TeamBuildingV2"));
const ClientEntertainmentV2 = lazy(() => import("./pages/ClientEntertainmentV2"));
const CompanyMilestoneV2 = lazy(() => import("./pages/CompanyMilestoneV2"));
const HolidayPartyCruiseV2 = lazy(() => import("./pages/HolidayPartyCruiseV2"));

// V2 Birthday/Age
const Sweet16V2 = lazy(() => import("./pages/Sweet16V2"));
const MilestoneBirthdayV2 = lazy(() => import("./pages/MilestoneBirthdayV2"));
const BirthdayPartyBoatRentalV2 = lazy(() => import("./pages/BirthdayPartyBoatRentalV2"));
const GraduationPartyV2 = lazy(() => import("./pages/GraduationPartyV2"));
const GraduationCruiseV2 = lazy(() => import("./pages/GraduationCruiseV2"));
const PromCruiseV2 = lazy(() => import("./pages/PromCruiseV2"));
const RetirementPartyCruiseV2 = lazy(() => import("./pages/RetirementPartyCruiseV2"));

// V2 Family
const FamilyReunionCruiseV2 = lazy(() => import("./pages/FamilyReunionCruiseV2"));
const BabyShowerCruiseV2 = lazy(() => import("./pages/BabyShowerCruiseV2"));
const GenderRevealCruiseV2 = lazy(() => import("./pages/GenderRevealCruiseV2"));
const MemorialCelebrationCruiseV2 = lazy(() => import("./pages/MemorialCelebrationCruiseV2"));
const CelebrationCruisesV2 = lazy(() => import("./pages/CelebrationCruisesV2"));

// V2 Bachelorette Content Hubs
const ThreeDayBacheloretteItineraryV2 = lazy(() => import("./pages/ThreeDayBacheloretteItineraryV2"));
const AdventureAustinBacheloretteV2 = lazy(() => import("./pages/AdventureAustinBacheloretteV2"));
const BudgetAustinBacheloretteV2 = lazy(() => import("./pages/BudgetAustinBacheloretteV2"));
const LuxuryAustinBacheloretteV2 = lazy(() => import("./pages/LuxuryAustinBacheloretteV2"));
const AustinBacheloretteNightlifeV2 = lazy(() => import("./pages/AustinBacheloretteNightlifeV2"));
const Top10AustinBacheloretteIdeasV2 = lazy(() => import("./pages/Top10AustinBacheloretteIdeasV2"));
const UltimateAustinBacheloretteWeekendV2 = lazy(() => import("./pages/UltimateAustinBacheloretteWeekendV2"));

// V2 Bachelor + Location + Misc
const AustinBachelorPartyIdeasV2 = lazy(() => import("./pages/AustinBachelorPartyIdeasV2"));
const LakeTravisBachelorPartyBoatsV2 = lazy(() => import("./pages/LakeTravisBachelorPartyBoatsV2"));
const PartyBoatAustinV2 = lazy(() => import("./pages/PartyBoatAustinV2"));
const PartyBoatLakeTravisV2 = lazy(() => import("./pages/PartyBoatLakeTravisV2"));
const FirstTimeLakeTravisBoatRentalGuideV2 = lazy(() => import("./pages/FirstTimeLakeTravisBoatRentalGuideV2"));
const SiteDirectoryV2 = lazy(() => import("./pages/SiteDirectoryV2"));

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
// BookNow removed - page deprecated, redirects to /private-cruises
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
const CorporateBoatPartiesAustin = lazy(() => import("./pages/blog/CorporateBoatPartiesAustin"));
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
const TheFunnestDaytimeActivityAustin = lazy(() => import("./pages/blog/TheFunnestDaytimeActivityAustin"));
const ATXDiscoCruiseWorthIt = lazy(() => import("./pages/blog/ATXDiscoCruiseWorthIt"));
const EverythingIncludedATXDiscoCruise = lazy(() => import("./pages/blog/EverythingIncludedATXDiscoCruise"));
const WhyCombinedBachLoveDiscoCruise = lazy(() => import("./pages/blog/WhyCombinedBachLoveDiscoCruise"));
const BestBachelorPartyBoatAustin = lazy(() => import("./pages/blog/WhatYouGetForMoneyPartyBoat"));
const WhatYouGetForMoneyPartyBoat = lazy(() => import("./pages/blog/BestBachelorPartyBoatAustin"));
const TopDosAndDontsATXDiscoCruise = lazy(() => import("./pages/blog/TopDosAndDontsATXDiscoCruise"));
const PrivateCruiseOrDiscoCruise = lazy(() => import("./pages/blog/PrivateCruiseOrDiscoCruise"));
const ATXDiscoCruiseBacheloretteNumber1 = lazy(() => import("./pages/blog/ATXDiscoCruiseBacheloretteNumber1"));
const ATXDiscoCruiseVsPrivateBachelorette = lazy(() => import("./pages/blog/ATXDiscoCruiseVsPrivateBachelorette"));
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
const WhyATXDiscoCruiseMostBooked = lazy(() => import("./pages/blog/WhyATXDiscoCruiseMostBooked"));
const PrivateCruiseVsPartyBoatPontoon = lazy(() => import("./pages/blog/PrivateCruiseVsPartyBoatPontoon"));
const TopFiveCelebritiesPartyBarge = lazy(() => import("./pages/blog/TopFiveCelebritiesPartyBarge"));

// Site Directory Page - Lazy loaded
const SiteDirectory = lazy(() => import("./pages/SiteDirectory"));

// Admin Blog Pages - Lazy loaded
const BlogManagement = lazy(() => import("./pages/admin/BlogManagement"));
const BlogPostEditor = lazy(() => import("./pages/admin/BlogPostEditor"));
const BlogFormatter = lazy(() => import("./pages/admin/BlogFormatter"));
const BlogBatchImporter = lazy(() => import("./pages/admin/BlogBatchImporter"));

// Admin SEO Pages - Lazy loaded
const SEOManagement = lazy(() => import("./pages/admin/SEOManagement"));

// Admin Pricing Pages - Lazy loaded
const Pricing = lazy(() => import("./pages/admin/Pricing"));
const PricingRules = lazy(() => import("./pages/admin/PricingRules"));

// Admin AI Assistant - Lazy loaded
const AIAssistant = lazy(() => import("./pages/admin/AIAssistant"));

// Admin Agent Chat - Lazy loaded
const AgentChat = lazy(() => import("./pages/admin/AgentChat"));

// SEO Command Center - Multi-agent AI system
const SEOCommandCenterPage = lazy(() => import("./components/admin/SEOCommandCenter"));

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
const SiteSummary = lazy(() => import("./pages/admin/SiteSummary"));

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
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const TestimonialsFaq = lazy(() => import("./pages/TestimonialsFaq"));
const PartyBoatAustin = lazy(() => import("./pages/PartyBoatAustin"));
const PartyBoatLakeTravis = lazy(() => import("./pages/PartyBoatLakeTravis"));
const AIEndorsement = lazy(() => import("./pages/AIEndorsement"));
const Partners = lazy(() => import("./pages/Partners"));

// Wedding Experience Pages - Lazy loaded
const RehearsalDinner = lazy(() => import("./pages/RehearsalDinner"));
const WelcomeParty = lazy(() => import("./pages/WelcomeParty"));
const AfterParty = lazy(() => import("./pages/AfterParty"));
const ProposalCruise = lazy(() => import("./pages/ProposalCruise"));
const RehearsalDinnerCruise = lazy(() => import("./pages/RehearsalDinnerCruise"));
const BridalShowerCruise = lazy(() => import("./pages/BridalShowerCruise"));
const EngagementPartyCruise = lazy(() => import("./pages/EngagementPartyCruise"));
const BabyShowerCruise = lazy(() => import("./pages/BabyShowerCruise"));
const GenderRevealCruise = lazy(() => import("./pages/GenderRevealCruise"));

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

// Marketing Event Pages - Lazy loaded
const PartyBoatRentalAustin = lazy(() => import("./pages/PartyBoatRentalAustin"));
const LakeTravisYachtRental = lazy(() => import("./pages/LakeTravisYachtRental"));
const AustinBoatParty = lazy(() => import("./pages/AustinBoatParty"));
const CelebrationCruises = lazy(() => import("./pages/CelebrationCruises"));
const PromCruise = lazy(() => import("./pages/PromCruise"));
const HolidayPartyCruise = lazy(() => import("./pages/HolidayPartyCruise"));

// New Core Marketing Pages - Lazy loaded
const PricingPage = lazy(() => import("./pages/Pricing"));

// Celebration Event Pages - Lazy loaded
const BirthdayPartyBoatRental = lazy(() => import("./pages/BirthdayPartyBoatRental"));
const AnniversaryCruise = lazy(() => import("./pages/AnniversaryCruise"));
const GraduationCruise = lazy(() => import("./pages/GraduationCruise"));
const RetirementPartyCruise = lazy(() => import("./pages/RetirementPartyCruise"));
const MemorialCelebrationCruise = lazy(() => import("./pages/MemorialCelebrationCruise"));
const FamilyReunionCruise = lazy(() => import("./pages/FamilyReunionCruise"));

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
const LakeTravisBoatPartyPackages = lazy(() => import("./pages/blog/LakeTravisBoatPartyPackages"));
const LakeTravisBoatPartyRegulations = lazy(() => import("./pages/blog/LakeTravisBoatPartyRegulations"));
const LakeTravisBoatSafetyMaintenance = lazy(() => import("./pages/blog/LakeTravisBoatSafetyMaintenance"));
const PartyAlcoholSafetyAustin = lazy(() => import("./pages/blog/PartyAlcoholSafetyAustin"));

// New Blog Pages - Converted from WordPress
const LakeTravisBoatPartyCosts = lazy(() => import("./pages/blog/LakeTravisBoatPartyCosts"));
const LakeTravisBoatPartyEntertainment = lazy(() => import("./pages/blog/LakeTravisBoatPartyEntertainment"));
const LakeTravisBoatPartyCatering = lazy(() => import("./pages/blog/LakeTravisBoatPartyCatering"));
const LakeTravisBoatPartyMusic = lazy(() => import("./pages/blog/LakeTravisBoatPartyMusic"));
const LakeTravisBoatPartyPhotography = lazy(() => import("./pages/blog/LakeTravisBoatPartyPhotography"));
const LakeTravisBoatPartyInsurance = lazy(() => import("./pages/blog/LakeTravisBoatPartyInsurance"));
const LakeTravisBoatPartyReviews = lazy(() => import("./pages/blog/LakeTravisBoatPartyReviews"));
const LakeTravisBoatSafetyGuidelines = lazy(() => import("./pages/blog/LakeTravisBoatSafetyGuidelines"));
const WhyLicensedCaptainsMatter = lazy(() => import("./pages/blog/WhyLicensedCaptainsMatter"));
const SafestAustinBachelorPartyLakeTravis = lazy(() => import("./pages/blog/SafestAustinBachelorPartyLakeTravis"));
const Top10BachelorPartyBoatReasons = lazy(() => import("./pages/blog/Top10BachelorPartyBoatReasons"));
const UltimateAustinPartyBoatExperience = lazy(() => import("./pages/blog/UltimateAustinPartyBoatExperience"));
const UltimateAustinBacheloretteBoatGuide = lazy(() => import("./pages/blog/UltimateAustinBacheloretteBoatGuide"));
const CreativeLakeTravisPartyThemes = lazy(() => import("./pages/blog/CreativeLakeTravisPartyThemes"));
const AccessibleLakeTravisParties = lazy(() => import("./pages/blog/AccessibleLakeTravisParties"));
const LakeTravisSunsetCruises = lazy(() => import("./pages/blog/LakeTravisSunsetCruises"));
const AustinBacheloretteAlcoholTimeline = lazy(() => import("./pages/blog/AustinBacheloretteAlcoholTimeline"));
const LakeTravisBacheloretteAlcoholLaws = lazy(() => import("./pages/blog/LakeTravisBacheloretteAlcoholLaws"));
const BacheloretteAlcoholEmergencyKit = lazy(() => import("./pages/blog/BacheloretteAlcoholEmergencyKit"));
const BudgetFriendlyBacheloretteAlcohol = lazy(() => import("./pages/blog/BudgetFriendlyBacheloretteAlcohol"));
const UltimateBacheloretteAlcoholGuide = lazy(() => import("./pages/blog/UltimateBacheloretteAlcoholGuide"));
const CocktailKitsVsBottles = lazy(() => import("./pages/blog/CocktailKitsVsBottles"));
const InstagramBacheloretteCocktails = lazy(() => import("./pages/blog/InstagramBacheloretteCocktails"));
const AustinBachelorettePartyBoats = lazy(() => import("./pages/blog/AustinBachelorettePartyBoats"));
const AustinWeddingVenueAlcohol = lazy(() => import("./pages/blog/AustinWeddingVenueAlcohol"));
const OutdoorWeddingAlcoholLogistics = lazy(() => import("./pages/blog/OutdoorWeddingAlcoholLogistics"));
const WeddingPartyAlcoholCoordination = lazy(() => import("./pages/blog/WeddingPartyAlcoholCoordination"));
const ClientEntertainmentAlcoholStrategy = lazy(() => import("./pages/blog/ClientEntertainmentAlcoholStrategy"));
const CorporateTeamBuildingAlcohol = lazy(() => import("./pages/blog/CorporateTeamBuildingAlcohol"));
const ExecutiveRetreatAlcoholPlanning = lazy(() => import("./pages/blog/ExecutiveRetreatAlcoholPlanning"));
const ConferenceAfterPartyAlcohol = lazy(() => import("./pages/blog/ConferenceAfterPartyAlcohol"));
const HolidayOfficePartyAlcohol = lazy(() => import("./pages/blog/HolidayOfficePartyAlcohol"));
const HolidayPartyAlcoholThemes = lazy(() => import("./pages/blog/HolidayPartyAlcoholThemes"));
const PoolPartyAlcoholCoordination = lazy(() => import("./pages/blog/PoolPartyAlcoholCoordination"));
const LakeTravisBachelorAlcoholDelivery = lazy(() => import("./pages/blog/LakeTravisBachelorAlcoholDelivery"));
const PerfectBachelorPartyItinerary = lazy(() => import("./pages/blog/PerfectBachelorPartyItinerary"));
const DiscoCruiseFashion = lazy(() => import("./pages/blog/DiscoCruiseFashion"));
const LakeTravisWeatherPlanning = lazy(() => import("./pages/blog/LakeTravisWeatherPlanning"));
const PartyBoatVsDowntownNightOut = lazy(() => import("./pages/blog/PartyBoatVsDowntownNightOut"));
const BachelorettePartyVsNightlife = lazy(() => import("./pages/blog/BachelorettePartyVsNightlife"));
const PrivateCharterVsDiscoCruise = lazy(() => import("./pages/blog/PrivateCharterVsDiscoCruise"));
const RecipeForChillestATXBachParty = lazy(() => import("./pages/blog/RecipeForChillestATXBachParty"));
const StartupCelebrationAlcoholPackages = lazy(() => import("./pages/blog/StartupCelebrationAlcoholPackages"));

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
        {/* Native quote flow — replaces the legacy lightbox iframe */}
        <Route path="/quote" component={QuoteNative} />

        {/* Public Homepage */}
        <Route path="/" component={HomeNew} />
        <Route path="/home-v2" component={HomeNew} />
        <Route path="/bachelorette-v2" component={BacheloretteV2} />
        <Route path="/bachelor-v2" component={BachelorV2} />
        <Route path="/combined-bach-v2" component={CombinedBachV2} />
        <Route path="/disco-v2" component={DiscoV2} />
        <Route path="/private-cruises-v2" component={PrivateCruisesV2} />
        <Route path="/corporate-v2" component={CorporateV2} />
        <Route path="/wedding-v2" component={WeddingV2} />
        <Route path="/birthday-v2" component={BirthdayV2} />

        {/* V2 Utility */}
        <Route path="/contact-v2" component={ContactV2} />
        <Route path="/faq-v2" component={FAQV2} />
        <Route path="/gallery-v2" component={GalleryV2} />
        <Route path="/pricing-v2" component={PricingV2} />
        <Route path="/pricing-breakdown-v2" component={PricingBreakdownV2} />
        <Route path="/testimonials-faq-v2" component={TestimonialsFAQV2} />

        {/* V2 Wedding-adjacent */}
        <Route path="/after-party-v2" component={AfterPartyV2} />
        <Route path="/welcome-party-v2" component={WelcomePartyV2} />
        <Route path="/rehearsal-dinner-v2" component={RehearsalDinnerV2} />
        <Route path="/rehearsal-dinner-cruise-v2" component={RehearsalDinnerCruiseV2} />
        <Route path="/bridal-shower-cruise-v2" component={BridalShowerCruiseV2} />
        <Route path="/engagement-party-cruise-v2" component={EngagementPartyCruiseV2} />
        <Route path="/anniversary-cruise-v2" component={AnniversaryCruiseV2} />
        <Route path="/wedding-anniversary-celebration-ideas-v2" component={WeddingAnniversaryIdeasV2} />
        <Route path="/proposal-cruise-v2" component={ProposalCruiseV2} />

        {/* V2 Corporate */}
        <Route path="/team-building-v2" component={TeamBuildingV2} />
        <Route path="/client-entertainment-v2" component={ClientEntertainmentV2} />
        <Route path="/company-milestone-v2" component={CompanyMilestoneV2} />
        <Route path="/holiday-party-cruise-v2" component={HolidayPartyCruiseV2} />

        {/* V2 Birthday/Age */}
        <Route path="/sweet-16-v2" component={Sweet16V2} />
        <Route path="/milestone-birthday-v2" component={MilestoneBirthdayV2} />
        <Route path="/birthday-party-boat-rental-v2" component={BirthdayPartyBoatRentalV2} />
        <Route path="/graduation-party-v2" component={GraduationPartyV2} />
        <Route path="/graduation-cruise-v2" component={GraduationCruiseV2} />
        <Route path="/prom-cruise-v2" component={PromCruiseV2} />
        <Route path="/retirement-party-cruise-v2" component={RetirementPartyCruiseV2} />

        {/* V2 Family */}
        <Route path="/family-reunion-cruise-v2" component={FamilyReunionCruiseV2} />
        <Route path="/baby-shower-cruise-v2" component={BabyShowerCruiseV2} />
        <Route path="/gender-reveal-cruise-v2" component={GenderRevealCruiseV2} />
        <Route path="/memorial-celebration-cruise-v2" component={MemorialCelebrationCruiseV2} />
        <Route path="/celebration-cruises-v2" component={CelebrationCruisesV2} />

        {/* V2 Bachelorette Content Hubs */}
        <Route path="/3-day-austin-bachelorette-itinerary-v2" component={ThreeDayBacheloretteItineraryV2} />
        <Route path="/adventure-austin-bachelorette-v2" component={AdventureAustinBacheloretteV2} />
        <Route path="/budget-austin-bachelorette-v2" component={BudgetAustinBacheloretteV2} />
        <Route path="/luxury-austin-bachelorette-v2" component={LuxuryAustinBacheloretteV2} />
        <Route path="/austin-bachelorette-nightlife-v2" component={AustinBacheloretteNightlifeV2} />
        <Route path="/top-10-austin-bachelorette-ideas-v2" component={Top10AustinBacheloretteIdeasV2} />
        <Route path="/ultimate-austin-bachelorette-weekend-v2" component={UltimateAustinBacheloretteWeekendV2} />

        {/* V2 Bachelor + Location + Misc */}
        <Route path="/austin-bachelor-party-ideas-v2" component={AustinBachelorPartyIdeasV2} />
        <Route path="/lake-travis-bachelor-party-boats-v2" component={LakeTravisBachelorPartyBoatsV2} />
        <Route path="/party-boat-austin-v2" component={PartyBoatAustinV2} />
        <Route path="/party-boat-lake-travis-v2" component={PartyBoatLakeTravisV2} />
        <Route path="/first-time-lake-travis-boat-rental-guide-v2" component={FirstTimeLakeTravisBoatRentalGuideV2} />
        <Route path="/site-directory-v2" component={SiteDirectoryV2} />
      
      {/* Authentication */}
      <Route path="/auth" component={AuthPage} />
      <Route path="/admin/login" component={AuthPage} />
      
      {/* Landing Pages */}
      <Route path="/bachelor-party-austin" component={BachelorV2} />
      <Route path="/bachelorette-party-austin" component={BacheloretteV2} />
      <Route path="/combined-bachelor-bachelorette-austin" component={CombinedBachV2} />
      <Route path="/atx-disco-cruise" component={DiscoV2} />
      
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
      
      <Route path="/private-cruises" component={PrivateCruisesV2} />
      <Route path="/corporate-events" component={CorporateV2} />
      <Route path="/birthday-parties" component={BirthdayV2} />
      <Route path="/wedding-parties" component={WeddingV2} />
      <Route path="/party-boat-austin" component={PartyBoatAustinV2} />
      <Route path="/party-boat-lake-travis" component={PartyBoatLakeTravisV2} />
      <Route path="/gallery" component={GalleryV2} />
      <Route path="/contact" component={ContactV2} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsAndConditions} />
      <Route path="/testimonials-faq" component={TestimonialsFAQV2} />
      <Route path="/ai-endorsement" component={AIEndorsement} />
      <Route path="/partners" component={Partners} />
      <Route path="/site-directory" component={SiteDirectoryV2} />
      
      {/* Wedding Experience Pages */}
      <Route path="/rehearsal-dinner" component={RehearsalDinnerV2} />
      <Route path="/welcome-party" component={WelcomePartyV2} />
      <Route path="/after-party" component={AfterPartyV2} />
      <Route path="/proposal-cruise" component={ProposalCruiseV2} />
      <Route path="/rehearsal-dinner-cruise" component={RehearsalDinnerCruiseV2} />
      <Route path="/bridal-shower-cruise" component={BridalShowerCruiseV2} />
      <Route path="/engagement-party-cruise" component={EngagementPartyCruiseV2} />
      <Route path="/baby-shower-cruise" component={BabyShowerCruiseV2} />
      <Route path="/gender-reveal-cruise" component={GenderRevealCruiseV2} />
      
      {/* Corporate Experience Pages */}
      <Route path="/team-building" component={TeamBuildingV2} />
      <Route path="/client-entertainment" component={ClientEntertainmentV2} />
      <Route path="/company-milestone" component={CompanyMilestoneV2} />
      
      {/* Birthday Experience Pages */}
      <Route path="/milestone-birthday" component={MilestoneBirthdayV2} />
      <Route path="/sweet-16" component={Sweet16V2} />
      
      {/* Special Event Pages */}
      <Route path="/graduation-party" component={GraduationPartyV2} />
      <Route path="/faq" component={FAQV2} />
      <Route path="/pricing-breakdown" component={PricingBreakdownV2} />
      
      {/* Marketing Event Pages */}
      <Route path="/party-boat-rental-austin" component={PartyBoatRentalAustin} />
      <Route path="/lake-travis-yacht-rental" component={LakeTravisYachtRental} />
      <Route path="/austin-boat-party" component={AustinBoatParty} />
      <Route path="/celebration-cruises" component={CelebrationCruisesV2} />
      <Route path="/prom-cruise" component={PromCruiseV2} />
      <Route path="/holiday-party-cruise" component={HolidayPartyCruiseV2} />
      
      {/* New Core Marketing Pages */}
      <Route path="/pricing" component={PricingV2} />
      
      {/* Celebration Event Pages */}
      <Route path="/birthday-party-boat-rental" component={BirthdayPartyBoatRentalV2} />
      <Route path="/anniversary-cruise" component={AnniversaryCruiseV2} />
      <Route path="/graduation-cruise" component={GraduationCruiseV2} />
      <Route path="/retirement-party-cruise" component={RetirementPartyCruiseV2} />
      <Route path="/memorial-celebration-cruise" component={MemorialCelebrationCruiseV2} />
      <Route path="/family-reunion-cruise" component={FamilyReunionCruiseV2} />
      
      {/* Blog Content Pages */}
      <Route path="/first-time-lake-travis-boat-rental-guide" component={FirstTimeLakeTravisBoatRentalGuideV2} />
      <Route path="/ultimate-austin-bachelorette-weekend" component={UltimateAustinBacheloretteWeekendV2} />
      <Route path="/top-10-austin-bachelorette-ideas" component={Top10AustinBacheloretteIdeasV2} />
      <Route path="/3-day-austin-bachelorette-itinerary" component={ThreeDayBacheloretteItineraryV2} />
      <Route path="/budget-austin-bachelorette" component={BudgetAustinBacheloretteV2} />
      <Route path="/luxury-austin-bachelorette" component={LuxuryAustinBacheloretteV2} />
      <Route path="/adventure-austin-bachelorette" component={AdventureAustinBacheloretteV2} />
      <Route path="/austin-bachelorette-nightlife" component={AustinBacheloretteNightlifeV2} />
      <Route path="/blogs/holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination" component={HolidayCelebrationsLakeTravis} />
      <Route path="/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises" component={JointBachelorBacheloretteParties} />
      <Route path="/blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations" component={LakeTravisWeddingBoatRentals} />
      <Route path="/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend" component={MustHavesAustinBacheloretteWeekend} />
      <Route path="/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience" component={TopSpotsAustinBacheloretteParty} />
      
      {/* New SEO-Optimized Bachelor Party Blog Pages */}
      <Route path="/blogs/austin-bachelor-party-ideas" component={AustinBachelorPartyIdeas} />
      <Route path="/austin-bachelor-party-ideas" component={AustinBachelorPartyIdeasV2} />{/* live-site parity alias */}
      <Route path="/blogs/perfect-austin-bachelor-party-weekend" component={PerfectAustinBachelorPartyWeekend} />
      <Route path="/lake-travis-bachelor-party-boats" component={LakeTravisBachelorPartyBoatsV2} />
      <Route path="/blogs/atx-disco-cruise-experience" component={ATXDiscoCruiseExperience} />
      <Route path="/blogs/lake-travis-bachelor-party-austin-celebrations" component={LakeTravisBachelorPartyCelebrations} />
      
      {/* Wedding Anniversary Blog Page */}
      <Route path="/wedding-anniversary-celebration-ideas" component={WeddingAnniversaryIdeasV2} />
      <Route path="/blogs/wedding-anniversary-celebration-ideas-recreating-your-special-day-with-boat-and-alcohol-packages" component={WeddingAnniversaryCelebrationIdeas} />
      
      {/* Rehearsal Dinner Boat + Alcohol Delivery - Full React Page */}
      <Route path="/blog/rehearsal-dinner-boat-alcohol-delivery-unique-wedding-weekend-experiences" component={RehearsalDinnerBoatAlcoholDelivery} />
      <Route path="/blogs/rehearsal-dinner-boat-alcohol-delivery-unique-wedding-weekend-experiences" component={RehearsalDinnerBoatAlcoholDelivery} />{/* live-site parity alias */}
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
      <Route path="/blogs/lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing" component={LakeTravisBoatPartyPackages} />
      <Route path="/blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning" component={FirstTimeLakeTravisGuide} />
      <Route path="/blogs/integrated-austin-event-services-combining-alcohol-delivery-and-boat-rentals-for-perfect-celebrations" component={IntegratedAustinEventServices} />
      <Route path="/blog/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy" component={BirthdayPartyAustinGuide} />
      <Route path="/blog/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests" component={LakeTravisLargeGroupsGuide} />
      <Route path="/blog/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties" component={LakeTravisWeatherGuide} />
      <Route path="/blogs/birthday-party-boat-rentals-on-lake-travis-milestone-celebrations-with-a-view" component={BirthdayPartyBoatRentalsLakeTravis} />
      <Route path="/blogs/corporate-team-building-on-lake-travis-professional-boat-rental-solutions" component={CorporateTeamBuildingLakeTravis} />
      <Route path="/blogs/corporate-boat-parties-austin-lake-travis-smartest-venue" component={CorporateBoatPartiesAustin} />
      <Route path="/blogs/all-inclusive-corporate-packages-austin" component={AllInclusiveCorporatePackages} />
      <Route path="/blogs/all-inclusive-corporate-packages" component={AllInclusiveCorporatePackages} />{/* live-site parity alias */}
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
      <Route path="/blogs/the-funnest-daytime-activity-in-austin-according-to-30000-guests" component={TheFunnestDaytimeActivityAustin} />
      <Route path="/blogs/is-the-atx-disco-cruise-worth-it-breaking-down-the-value-vs-a-private-boat" component={ATXDiscoCruiseWorthIt} />
      <Route path="/blogs/everything-thats-included-on-the-atx-disco-cruise-so-you-dont-have-to-bring-anything" component={EverythingIncludedATXDiscoCruise} />
      <Route path="/blogs/why-combined-bachelor-bachelorette-parties-love-the-atx-disco-cruise" component={WhyCombinedBachLoveDiscoCruise} />
      <Route path="/blogs/the-best-bachelor-party-boat-in-austin-disco-cruise-vs-private-charter" component={BestBachelorPartyBoatAustin} />
      <Route path="/blogs/what-you-actually-get-for-your-money-on-an-austin-party-boat-full-cost-breakdown" component={WhatYouGetForMoneyPartyBoat} />
      <Route path="/blogs/private-cruise-or-disco-cruise-how-real-bach-groups-decide" component={PrivateCruiseOrDiscoCruise} />
      <Route path="/blogs/why-the-atx-disco-cruise-has-been-austins-1-bachelorette-party-activity-since-2019" component={ATXDiscoCruiseBacheloretteNumber1} />
      <Route path="/blogs/atx-disco-cruise-vs-private-boat-which-is-better-for-a-bachelorette-party" component={ATXDiscoCruiseVsPrivateBachelorette} />
      <Route path="/blogs/the-top-dos-and-dont-for-success-on-the-atx-disco-cruise-with-premier-party-cruises" component={TopDosAndDontsATXDiscoCruise} />
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
      
      {/* Newly Converted Blog Pages */}
      <Route path="/blogs/lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning" component={LakeTravisBoatPartyCosts} />
      <Route path="/blogs/lake-travis-boat-party-entertainment-activities-and-amenities-for-unforgettable-events" component={LakeTravisBoatPartyEntertainment} />
      <Route path="/blogs/lake-travis-boat-party-catering-food-and-beverage-coordination-for-perfect-events" component={LakeTravisBoatPartyCatering} />
      <Route path="/blogs/lake-travis-boat-party-music-sound-systems-and-entertainment-coordination" component={LakeTravisBoatPartyMusic} />
      <Route path="/blogs/lake-travis-boat-party-photography-capturing-perfect-memories-on-the-water" component={LakeTravisBoatPartyPhotography} />
      <Route path="/blogs/lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events" component={LakeTravisBoatPartyInsurance} />
      <Route path="/blogs/lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials" component={LakeTravisBoatPartyReviews} />
      <Route path="/blogs/lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises" component={LakeTravisBoatSafetyGuidelines} />
      <Route path="/blogs/why-licensed-captains-matter-lake-travis-party-boats" component={WhyLicensedCaptainsMatter} />
      <Route path="/blogs/safest-austin-bachelor-party-lake-travis-party-boat" component={SafestAustinBachelorPartyLakeTravis} />
      <Route path="/blogs/top-10-reasons-austin-bachelor-party-lake-travis-boat" component={Top10BachelorPartyBoatReasons} />
      <Route path="/blogs/ultimate-austin-party-boat-experience-any-celebration" component={UltimateAustinPartyBoatExperience} />
      <Route path="/blogs/ultimate-austin-bachelorette-party-boat-guide-lake-travis" component={UltimateAustinBacheloretteBoatGuide} />
      <Route path="/blogs/creative-lake-travis-boat-party-themes-unique-ideas-for-memorable-celebrations" component={CreativeLakeTravisPartyThemes} />
      <Route path="/blogs/accessible-lake-travis-boat-parties-inclusive-event-planning-for-all-guests" component={AccessibleLakeTravisParties} />
      <Route path="/blogs/lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion" component={LakeTravisSunsetCruises} />
      <Route path="/blogs/austin-bachelorette-weekend-alcohol-timeline-day-by-day-drinking-strategy-for-multi-day-celebrations" component={AustinBacheloretteAlcoholTimeline} />
      <Route path="/blogs/lake-travis-bachelorette-party-alcohol-laws-what-you-can-and-cant-bring-on-boats" component={LakeTravisBacheloretteAlcoholLaws} />
      <Route path="/blogs/bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions" component={BacheloretteAlcoholEmergencyKit} />
      <Route path="/blogs/budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank" component={BudgetFriendlyBacheloretteAlcohol} />
      <Route path="/blogs/the-ultimate-austin-bachelorette-party-alcohol-guide-what-to-order-when-to-order-and-how-much-you-actually-need" component={UltimateBacheloretteAlcoholGuide} />
      <Route path="/blogs/cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy" component={CocktailKitsVsBottles} />
      <Route path="/blogs/instagram-worthy-bachelorette-party-cocktails-recipes-and-delivery-coordination" component={InstagramBacheloretteCocktails} />
      <Route path="/blogs/austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations" component={AustinBachelorettePartyBoats} />
      <Route path="/blogs/austin-wedding-venue-alcohol-policies-delivery-solutions-for-every-location" component={AustinWeddingVenueAlcohol} />
      <Route path="/blogs/outdoor-wedding-alcohol-logistics-hill-country-and-lake-travis-coordination" component={OutdoorWeddingAlcoholLogistics} />
      <Route path="/blogs/wedding-party-alcohol-coordination-getting-ready-bachelor-bachelorette-and-reception" component={WeddingPartyAlcoholCoordination} />
      <Route path="/blogs/client-entertainment-alcohol-strategy-impressing-without-overdoing-it" component={ClientEntertainmentAlcoholStrategy} />
      <Route path="/blogs/corporate-team-building-on-lake-travis-alcohol-coordination-for-professional-events" component={CorporateTeamBuildingAlcohol} />
      <Route path="/blogs/executive-retreat-alcohol-planning-balancing-professionalism-and-team-bonding" component={ExecutiveRetreatAlcoholPlanning} />
      <Route path="/blogs/conference-after-party-alcohol-coordination-sxsw-acl-and-austin-event-integration" component={ConferenceAfterPartyAlcohol} />
      <Route path="/blogs/holiday-office-party-alcohol-delivery-stress-free-corporate-celebration-planning" component={HolidayOfficePartyAlcohol} />
      <Route path="/blogs/holiday-party-alcohol-themes-new-years-fourth-of-july-and-austin-celebrations" component={HolidayPartyAlcoholThemes} />
      <Route path="/blogs/pool-party-alcohol-coordination-summer-event-planning-in-austin-heat" component={PoolPartyAlcoholCoordination} />
      <Route path="/blogs/lake-travis-bachelor-party-alcohol-delivery-complete-coordination-guide-for-boat-parties" component={LakeTravisBachelorAlcoholDelivery} />
      <Route path="/blogs/perfect-bachelor-party-itinerary-austin" component={PerfectBachelorPartyItinerary} />
      <Route path="/blogs/disco-cruise-fashion-part-1" component={DiscoCruiseFashion} />
      <Route path="/blogs/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties" component={LakeTravisWeatherPlanning} />
      <Route path="/blogs/lake-travis-party-boat-vs-downtown-night-out-austin-bachelor" component={PartyBoatVsDowntownNightOut} />
      <Route path="/blogs/austin-bachelorette-party-vs-lake-travis-boat-why-lake-wins" component={BachelorettePartyVsNightlife} />
      <Route path="/blogs/private-charter-vs-atx-disco-cruise-which-austin-party-boat" component={PrivateCharterVsDiscoCruise} />
      <Route path="/blogs/why-atx-disco-cruise-austins-most-booked-party-boat-experience" component={WhyATXDiscoCruiseMostBooked} />
      <Route path="/blogs/private-party-cruise-vs-party-boat-pontoon-lake-travis" component={PrivateCruiseVsPartyBoatPontoon} />
      <Route path="/blogs/the-recipe-for-the-chillest-atx-bach-party" component={RecipeForChillestATXBachParty} />
      <Route path="/blogs/startup-celebration-alcohol-packages-funding-rounds-launches-and-milestone-events" component={StartupCelebrationAlcoholPackages} />
      <Route path="/blogs/the-top-five-celebrities-at-our-dream-party-barge" component={TopFiveCelebritiesPartyBarge} />
      
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
      
      {/* Book Online/Book Now - Deprecated pages redirect to /private-cruises */}
      <Route path="/book-online">
        <Redirect to="/private-cruises" />
      </Route>
      <Route path="/book-online-popup">
        <Redirect to="/private-cruises" />
      </Route>
      <Route path="/book-now">
        <Redirect to="/private-cruises" />
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
      <Route path="/admin/blogs/batch">
        <ProtectedRoute>
          <BlogBatchImporter />
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

      {/* SEO Command Center - Multi-agent AI system */}
      <Route path="/admin/seo-command-center">
        <ProtectedRoute>
          <SEOCommandCenterPage />
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
      <Route path="/admin/site-summary">
        <ProtectedRoute>
          <SiteSummary />
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
                <Suspense fallback={null}>
                  <GoogleAnalytics />
                </Suspense>
                <Suspense fallback={null}>
                  <Toaster />
                </Suspense>
                {/* TBT OPTIMIZATION: GlobalInlineEditor only renders on admin routes */}
                {isAdminRoute && (
                  <Suspense fallback={null}>
                    <GlobalInlineEditor />
                  </Suspense>
                )}
                <Suspense fallback={null}>
                  <XolaMobileCloseButton />
                </Suspense>
                {/* TBT OPTIMIZATION: QuoteWidgetPreloader removed - was blocking main thread */}
                <QuoteLightboxProvider>
                  <ErrorBoundary>
                    <Router />
                  </ErrorBoundary>
                </QuoteLightboxProvider>
              {/* </TooltipProvider> */}
            </HelmetProvider>
          {/* </EditModeProvider> */}
        {/* </BookingCacheProvider> */}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;