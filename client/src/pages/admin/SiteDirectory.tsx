import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminNoIndex from "@/components/AdminNoIndex";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Save,
  Plus,
  Trash2,
  RefreshCw,
  Search,
  FileText,
  Globe,
  Tag,
} from "lucide-react";
import type { PageMetadata } from "@shared/schema";

interface EditableMetadata {
  route: string;
  title: string;
  description: string;
  keywords: string[];
  keywordFocus: string | null;
}

const DEFAULT_PAGES = [
  // Main Pages
  { route: "/", name: "Homepage" },
  { route: "/atx-disco-cruise", name: "ATX Disco Cruise" },
  { route: "/private-cruises", name: "Private Cruises" },
  { route: "/gallery", name: "Gallery" },
  { route: "/contact", name: "Contact" },
  { route: "/faq", name: "FAQ" },
  { route: "/pricing-breakdown", name: "Pricing Breakdown" },
  { route: "/testimonials-faq", name: "Testimonials FAQ" },
  { route: "/site-directory", name: "Site Directory" },
  // Bachelor & Bachelorette Parties
  { route: "/bachelor-party-austin", name: "Bachelor Party Austin" },
  { route: "/bachelorette-party-austin", name: "Bachelorette Party Austin" },
  { route: "/combined-bachelor-bachelorette-austin", name: "Combined Bachelor/Bachelorette" },
  { route: "/austin-bachelor-party-ideas", name: "Austin Bachelor Party Ideas" },
  { route: "/lake-travis-bachelor-party-boats", name: "Lake Travis Bachelor Party Boats" },
  // Wedding Events
  { route: "/wedding-parties", name: "Wedding Parties" },
  { route: "/rehearsal-dinner", name: "Rehearsal Dinner" },
  { route: "/welcome-party", name: "Welcome Party" },
  { route: "/after-party", name: "After Party" },
  { route: "/wedding-anniversary-celebration-ideas", name: "Wedding Anniversary Ideas" },
  // Corporate Events
  { route: "/corporate-events", name: "Corporate Events" },
  { route: "/team-building", name: "Team Building" },
  { route: "/client-entertainment", name: "Client Entertainment" },
  { route: "/company-milestone", name: "Company Milestone" },
  // Birthday & Celebrations
  { route: "/birthday-parties", name: "Birthday Parties" },
  { route: "/milestone-birthday", name: "Milestone Birthday" },
  { route: "/sweet-16", name: "Sweet 16" },
  { route: "/graduation-party", name: "Graduation Party" },
  // Guides & Resources
  { route: "/party-boat-austin", name: "Party Boat Austin" },
  { route: "/party-boat-lake-travis", name: "Party Boat Lake Travis" },
  { route: "/first-time-lake-travis-boat-rental-guide", name: "First-Time Lake Travis Guide" },
  { route: "/ultimate-austin-bachelorette-weekend", name: "Ultimate Austin Bachelorette Weekend" },
  { route: "/top-10-austin-bachelorette-ideas", name: "Top 10 Austin Bachelorette Ideas" },
  { route: "/3-day-austin-bachelorette-itinerary", name: "3-Day Austin Bachelorette Itinerary" },
  { route: "/budget-austin-bachelorette", name: "Budget Austin Bachelorette" },
  { route: "/luxury-austin-bachelorette", name: "Luxury Austin Bachelorette" },
  { route: "/adventure-austin-bachelorette", name: "Adventure Austin Bachelorette" },
  { route: "/austin-bachelorette-nightlife", name: "Austin Bachelorette Nightlife" },
  // Blog Index
  { route: "/blogs", name: "All Blogs" },
  // Bachelor Party Monthly Guides
  { route: "/blogs/austin-bachelor-party-january", name: "Austin Bachelor Party January" },
  { route: "/blogs/austin-bachelor-party-march", name: "Austin Bachelor Party March" },
  { route: "/blogs/austin-bachelor-party-may", name: "Austin Bachelor Party May" },
  { route: "/blogs/austin-bachelor-party-july", name: "Austin Bachelor Party July" },
  { route: "/blogs/austin-bachelor-party-september", name: "Austin Bachelor Party September" },
  { route: "/blogs/austin-bachelor-party-november", name: "Austin Bachelor Party November" },
  // Bachelorette Party Monthly Guides
  { route: "/blogs/austin-bachelorette-party-february", name: "Austin Bachelorette Party February" },
  { route: "/blogs/austin-bachelorette-party-april", name: "Austin Bachelorette Party April" },
  { route: "/blogs/austin-bachelorette-party-june", name: "Austin Bachelorette Party June" },
  { route: "/blogs/austin-bachelorette-party-august", name: "Austin Bachelorette Party August" },
  { route: "/blogs/austin-bachelorette-party-october", name: "Austin Bachelorette Party October" },
  { route: "/blogs/austin-bachelorette-party-december", name: "Austin Bachelorette Party December" },
  // Bachelor Party Blogs
  { route: "/blogs/austin-bachelor-party-ideas", name: "Austin Bachelor Party Ideas Blog" },
  { route: "/blogs/lake-travis-bachelor-party-boats-guide", name: "Lake Travis Bachelor Party Boats Guide" },
  { route: "/blogs/perfect-austin-bachelor-party-weekend", name: "Perfect Austin Bachelor Party Weekend" },
  { route: "/blogs/atx-disco-cruise-dos-and-donts-bachelor-party", name: "ATX Disco Cruise Dos and Donts" },
  { route: "/blogs/bachelor-party-outfit-ideas-atx-disco-cruise", name: "Bachelor Party Outfit Ideas" },
  { route: "/blogs/epic-bachelor-party-austin-ultimate-guide", name: "Epic Bachelor Party Austin Guide" },
  { route: "/blogs/how-to-throw-great-bachelor-party-austin", name: "How to Throw Great Bachelor Party" },
  { route: "/blogs/lake-travis-bachelor-party-austin-celebrations", name: "Lake Travis Bachelor Party Celebrations" },
  { route: "/blogs/lake-travis-bachelor-party-boat-rentals-the-ultimate-guide-to-epic-celebrations", name: "Lake Travis Bachelor Boat Rentals Guide" },
  { route: "/blogs/perfect-bachelor-party-itinerary-austin", name: "Perfect Bachelor Party Itinerary" },
  { route: "/blogs/why-choose-austin-bachelor-party", name: "Why Choose Austin Bachelor Party" },
  { route: "/blogs/the-recipe-for-the-chillest-atx-bach-party", name: "Chillest ATX Bach Party Recipe" },
  { route: "/blogs/safest-austin-bachelor-party-lake-travis", name: "Safest Austin Bachelor Party Lake Travis" },
  { route: "/blogs/lake-travis-bachelor-party-alcohol-delivery-complete-coordination-guide-for-boat-parties", name: "Bachelor Party Alcohol Delivery Guide" },
  // Bachelorette Party Blogs
  { route: "/blogs/epic-bachelorette-party-austin-ultimate-guide", name: "Epic Bachelorette Party Austin Guide" },
  { route: "/blogs/how-to-throw-great-bachelorette-party-austin", name: "How to Throw Great Bachelorette Party" },
  { route: "/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend", name: "Perfect Bachelorette Weekend Must-Haves" },
  { route: "/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience", name: "Top Spots Austin Bachelorette Experience" },
  { route: "/blogs/why-choose-austin-bachelorette-party", name: "Why Choose Austin Bachelorette Party" },
  { route: "/blogs/austin-bachelorette-bliss-spa-retreats-disco-cruises-alcohol-delivery", name: "Bachelorette Bliss Spa & Cruises" },
  { route: "/blogs/austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations", name: "Bachelorette Party Boats Lake Travis" },
  { route: "/blogs/austin-bachelorette-weekend-alcohol-timeline-day-by-day-drinking-strategy-for-multi-day-celebrations", name: "Bachelorette Weekend Alcohol Timeline" },
  { route: "/blogs/bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions", name: "Bachelorette Alcohol Emergency Kit" },
  { route: "/blogs/budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank", name: "Budget-Friendly Bachelorette Alcohol" },
  { route: "/blogs/the-ultimate-austin-bachelorette-party-alcohol-guide-what-to-order-when-to-order-and-how-much-you-actually-need", name: "Ultimate Bachelorette Alcohol Guide" },
  { route: "/blogs/instagram-worthy-bachelorette-cocktails-diy-drink-stations-and-photo-ops", name: "Instagram-Worthy Bachelorette Cocktails" },
  { route: "/blogs/ultimate-austin-bachelorette-party-boat-guide", name: "Ultimate Bachelorette Party Boat Guide" },
  { route: "/blogs/disco-cruise-fashion-guide", name: "Disco Cruise Fashion Guide" },
  { route: "/blogs/bachelorette-party-vs-downtown-nightlife-austin", name: "Bachelorette Party vs Downtown Nightlife" },
  // Joint Bachelor/Bachelorette Blogs
  { route: "/blogs/joint-bachelor-bachelorette-party-guide", name: "Joint Bachelor Bachelorette Party Guide" },
  { route: "/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises", name: "Joint Parties with Premier Party Cruises" },
  { route: "/blogs/wedding-party-alcohol-coordination-getting-ready-bachelor-bachelorette-and-reception", name: "Wedding Party Alcohol Coordination" },
  // Corporate Event Blogs
  { route: "/blogs/all-inclusive-corporate-packages", name: "All-Inclusive Corporate Packages" },
  { route: "/blogs/austin-best-corporate-events", name: "Austin Best Corporate Events" },
  { route: "/blogs/austin-suburbs-corporate-events", name: "Austin Suburbs Corporate Events" },
  { route: "/blogs/company-holiday-party-lake-travis", name: "Company Holiday Party Lake Travis" },
  { route: "/blogs/company-party-10-people-austin", name: "Company Party 10 People" },
  { route: "/blogs/company-party-25-people-austin", name: "Company Party 25 People" },
  { route: "/blogs/company-party-50-people-austin", name: "Company Party 50 People" },
  { route: "/blogs/company-party-75-people-austin", name: "Company Party 75 People" },
  { route: "/blogs/construction-trades-boat-parties-austin", name: "Construction Trades Boat Parties" },
  { route: "/blogs/corporate-team-building-on-lake-travis-alcohol-coordination-for-professional-events", name: "Corporate Team Building Alcohol Coordination" },
  { route: "/blogs/corporate-team-building-on-lake-travis-professional-boat-rental-solutions", name: "Corporate Team Building Lake Travis" },
  { route: "/blogs/dallas-to-lake-travis-corporate", name: "Dallas to Lake Travis Corporate" },
  { route: "/blogs/destination-austin-offsite-retreats", name: "Destination Austin Offsite Retreats" },
  { route: "/blogs/employee-appreciation-day-lake-travis", name: "Employee Appreciation Day Lake Travis" },
  { route: "/blogs/finance-law-firms-boat-parties-austin", name: "Finance Law Firms Boat Parties" },
  { route: "/blogs/healthcare-wellness-boat-parties-austin", name: "Healthcare Wellness Boat Parties" },
  { route: "/blogs/marketing-agencies-boat-parties-austin", name: "Marketing Agencies Boat Parties" },
  { route: "/blogs/quarterly-outings-lake-travis", name: "Quarterly Outings Lake Travis" },
  { route: "/blogs/real-estate-client-entertainment-boat-lake-travis", name: "Real Estate Client Entertainment" },
  { route: "/blogs/small-business-boat-parties-austin", name: "Small Business Boat Parties" },
  { route: "/blogs/tech-companies-boat-parties-austin", name: "Tech Companies Boat Parties" },
  { route: "/blogs/why-austin-companies-choose-premier", name: "Why Austin Companies Choose Premier" },
  // Lake Travis Guides
  { route: "/blogs/atx-disco-cruise-experience", name: "ATX Disco Cruise Experience" },
  { route: "/blogs/lake-travis-bachelor-party-boats", name: "Lake Travis Bachelor Party Boats Blog" },
  { route: "/blogs/lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing", name: "Lake Travis Boat Party Packages" },
  { route: "/blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide", name: "Lake Travis Boat Party Logistics" },
  { route: "/blogs/lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning", name: "Lake Travis Boat Party Costs" },
  { route: "/blogs/lake-travis-boat-party-entertainment-live-music-dj-and-activity-options", name: "Lake Travis Boat Party Entertainment" },
  { route: "/blogs/lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials", name: "Lake Travis Boat Party Reviews" },
  { route: "/blogs/lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion", name: "Lake Travis Sunset Cruises" },
  { route: "/blogs/lake-travis-large-group-boat-rentals-options-for-parties-of-30-plus-guests", name: "Lake Travis Large Group Boat Rentals" },
  { route: "/blogs/lake-travis-weather-planning-guide-rain-dates-seasonal-considerations-for-boat-parties", name: "Lake Travis Weather Planning Guide" },
  { route: "/blogs/lake-travis-boat-party-photography-capturing-moments-on-the-water", name: "Lake Travis Boat Party Photography" },
  { route: "/blogs/lake-travis-boat-party-music-sound-system-dj-options-for-every-event-style", name: "Lake Travis Boat Party Music" },
  { route: "/blogs/lake-travis-boat-party-catering-food-drink-options-for-every-event-style", name: "Lake Travis Boat Party Catering" },
  { route: "/blogs/large-group-events-lake-travis-planning-guide", name: "Large Group Events Lake Travis" },
  { route: "/blogs/creative-lake-travis-boat-party-themes-unique-ideas-for-memorable-celebrations", name: "Creative Lake Travis Party Themes" },
  // Safety & Operations Blogs
  { route: "/blogs/lake-travis-boat-safety-guidelines-everything-you-need-to-know-for-safe-celebrations", name: "Lake Travis Boat Safety Guidelines" },
  { route: "/blogs/lake-travis-boat-party-regulations-what-you-need-to-know-for-legal-celebrations", name: "Lake Travis Boat Party Regulations" },
  { route: "/blogs/lake-travis-boat-party-insurance-what-you-need-to-know", name: "Lake Travis Boat Party Insurance" },
  { route: "/blogs/lake-travis-boat-safety-and-maintenance", name: "Lake Travis Boat Safety & Maintenance" },
  { route: "/blogs/lake-travis-boat-safety", name: "Lake Travis Boat Safety" },
  { route: "/blogs/safety-first-with-premier-party-cruises", name: "Safety First Premier Party Cruises" },
  { route: "/blogs/why-licensed-captains-matter", name: "Why Licensed Captains Matter" },
  { route: "/blogs/why-atx-disco-cruise-most-booked", name: "Why ATX Disco Cruise Most Booked" },
  { route: "/blogs/private-charter-vs-disco-cruise", name: "Private Charter vs Disco Cruise" },
  { route: "/blogs/private-cruise-vs-party-boat-pontoon", name: "Private Cruise vs Party Boat Pontoon" },
  // Wedding & Celebration Blogs
  { route: "/blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations", name: "Lake Travis Wedding Boat Rentals" },
  { route: "/blogs/wedding-anniversary-celebration-ideas-recreating-your-special-day-with-boat-and-alcohol-packages", name: "Wedding Anniversary Celebration Ideas Blog" },
  { route: "/blogs/rehearsal-dinner-boat-alcohol-delivery", name: "Rehearsal Dinner Alcohol Delivery" },
  { route: "/blogs/outdoor-wedding-alcohol-logistics-rain-plans-heat-considerations-and-venue-requirements", name: "Outdoor Wedding Alcohol Logistics" },
  // Birthday & Celebration Blogs
  { route: "/blogs/birthday-party-boat-rentals-on-lake-travis-milestone-celebrations-with-a-view", name: "Birthday Party Boat Rentals Lake Travis" },
  { route: "/blogs/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy", name: "Birthday Party Alcohol Delivery Austin" },
  { route: "/blogs/graduation-party-alcohol-planning-legal-considerations-and-celebration-solutions", name: "Graduation Party Alcohol Planning" },
  // Alcohol Coordination Blogs
  { route: "/blogs/austin-party-venue-alcohol-delivery-navigating-policies-and-logistics", name: "Austin Party Venue Alcohol Delivery" },
  { route: "/blogs/austin-wedding-venue-alcohol-policies-delivery-solutions-for-every-location", name: "Austin Wedding Venue Alcohol Policies" },
  { route: "/blogs/client-entertainment-alcohol-strategy-impressing-without-overdoing-it", name: "Client Entertainment Alcohol Strategy" },
  { route: "/blogs/cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy", name: "Cocktail Kits vs Individual Bottles" },
  { route: "/blogs/conference-after-party-alcohol-coordination-sxsw-acl-and-austin-event-integration", name: "Conference After Party Alcohol" },
  { route: "/blogs/executive-retreat-alcohol-planning-professional-yet-enjoyable-corporate-hospitality", name: "Executive Retreat Alcohol Planning" },
  { route: "/blogs/holiday-office-party-alcohol-balancing-celebration-with-professionalism", name: "Holiday Office Party Alcohol" },
  { route: "/blogs/holiday-party-alcohol-themes-seasonal-drink-menus-and-festive-delivery-options", name: "Holiday Party Alcohol Themes" },
  { route: "/blogs/party-alcohol-safety-austin-responsible-celebration-and-transportation-planning", name: "Party Alcohol Safety Austin" },
  { route: "/blogs/pool-party-alcohol-coordination-beverage-planning-for-austin-summer-events", name: "Pool Party Alcohol Coordination" },
  { route: "/blogs/startup-celebration-alcohol-packages-funding-rounds-launches-and-milestone-events", name: "Startup Celebration Alcohol Packages" },
  { route: "/blogs/lake-travis-bachelorette-alcohol-laws-bylaws-and-regulations-for-party-boats", name: "Lake Travis Bachelorette Alcohol Laws" },
  // Service & Experience Blogs
  { route: "/blogs/accessible-lake-travis-boat-parties-inclusive-event-planning-for-all-guests", name: "Accessible Lake Travis Boat Parties" },
  { route: "/blogs/why-choose-integrated-event-services-comparing-austin-party-planning-options", name: "Why Choose Integrated Event Services" },
  { route: "/blogs/integrated-austin-event-services-bachelorette-bachelor-corporate-party-planning", name: "Integrated Austin Event Services" },
  { route: "/blogs/austin-ultimate-party-boat-experience", name: "Austin Ultimate Party Boat Experience" },
  { route: "/blogs/the-top-five-celebrities-at-our-dream-party-barge", name: "Top Five Celebrities Dream Party Barge" },
];

export default function SiteDirectory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRoute, setEditingRoute] = useState<string | null>(null);
  const [formData, setFormData] = useState<EditableMetadata | null>(null);
  const [newKeyword, setNewKeyword] = useState("");
  const [showAddNew, setShowAddNew] = useState(false);
  const [newPageData, setNewPageData] = useState<EditableMetadata>({
    route: "",
    title: "",
    description: "",
    keywords: [],
    keywordFocus: null,
  });

  const { data: pageMetadata = [], isLoading, refetch } = useQuery<PageMetadata[]>({
    queryKey: ["/api/page-metadata"],
  });

  const saveMutation = useMutation({
    mutationFn: async (data: EditableMetadata) => {
      const response = await apiRequest("POST", "/api/page-metadata", {
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-metadata"] });
      setEditingRoute(null);
      setFormData(null);
      toast({
        title: "Saved",
        description: "Page metadata has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (route: string) => {
      const response = await apiRequest("DELETE", `/api/page-metadata/${encodeURIComponent(route)}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-metadata"] });
      toast({
        title: "Deleted",
        description: "Page metadata has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getMetadataForRoute = (route: string): PageMetadata | undefined => {
    return pageMetadata.find((m) => m.route === route);
  };

  const startEditing = (route: string, existingMeta?: PageMetadata) => {
    setEditingRoute(route);
    setFormData({
      route,
      title: existingMeta?.title || "",
      description: existingMeta?.description || "",
      keywords: existingMeta?.keywords || [],
      keywordFocus: existingMeta?.keywordFocus || null,
    });
  };

  const handleSave = () => {
    if (formData && formData.title && formData.description) {
      saveMutation.mutate(formData);
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && formData) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, newKeyword.trim()],
      });
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    if (formData) {
      const newKeywords = [...formData.keywords];
      newKeywords.splice(index, 1);
      setFormData({ ...formData, keywords: newKeywords });
    }
  };

  const handleAddNewPage = () => {
    if (newPageData.route && newPageData.title && newPageData.description) {
      saveMutation.mutate(newPageData);
      setShowAddNew(false);
      setNewPageData({
        route: "",
        title: "",
        description: "",
        keywords: [],
        keywordFocus: null,
      });
    }
  };

  const allPages = [
    ...DEFAULT_PAGES,
    ...pageMetadata
      .filter((m) => !DEFAULT_PAGES.find((p) => p.route === m.route))
      .map((m) => ({ route: m.route, name: m.route })),
  ];

  const filteredPages = allPages.filter(
    (page) =>
      page.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Loading site directory...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <AdminNoIndex />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Directory
              </CardTitle>
              <CardDescription>
                Manage SEO metadata for all pages - titles, descriptions, and keywords
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                data-testid="button-refresh-directory"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
              <Button
                size="sm"
                onClick={() => setShowAddNew(!showAddNew)}
                data-testid="button-add-page"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Page
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-pages"
              />
            </div>
          </div>

          {showAddNew && (
            <Card className="mb-4 border-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Add New Page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Route (e.g., /my-page)</Label>
                  <Input
                    value={newPageData.route}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPageData({ ...newPageData, route: e.target.value })}
                    placeholder="/example-page"
                    data-testid="input-new-route"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={newPageData.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPageData({ ...newPageData, title: e.target.value })}
                    placeholder="Page Title | Premier Party Cruises"
                    data-testid="input-new-title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    value={newPageData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPageData({ ...newPageData, description: e.target.value })}
                    placeholder="A compelling description for search engines..."
                    rows={3}
                    data-testid="textarea-new-description"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddNewPage} disabled={saveMutation.isPending} data-testid="button-save-new-page">
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddNew(false)} data-testid="button-cancel-new-page">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-sm text-muted-foreground mb-4">
            {filteredPages.length} pages • {pageMetadata.length} with custom metadata
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {filteredPages.map((page) => {
              const meta = getMetadataForRoute(page.route);
              const isEditing = editingRoute === page.route;
              const hasMetadata = !!meta;

              return (
                <AccordionItem
                  key={page.route}
                  value={page.route}
                  className="border rounded-lg px-4"
                  data-testid={`page-item-${page.route.replace(/\//g, "-")}`}
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium">{page.name}</div>
                        <div className="text-sm text-muted-foreground">{page.route}</div>
                      </div>
                      {hasMetadata ? (
                        <Badge variant="default" className="ml-2">
                          Configured
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="ml-2">
                          Default
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    {isEditing && formData ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Page Title</Label>
                          <Input
                            value={formData.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Page Title | Premier Party Cruises"
                            data-testid={`input-title-${page.route.replace(/\//g, "-")}`}
                          />
                          <p className="text-xs text-muted-foreground">
                            {formData.title.length} characters (recommended: 50-60)
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label>Meta Description</Label>
                          <Textarea
                            value={formData.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="A compelling description for search engines..."
                            rows={3}
                            data-testid={`textarea-description-${page.route.replace(/\//g, "-")}`}
                          />
                          <p className="text-xs text-muted-foreground">
                            {formData.description.length} characters (recommended: 150-160)
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label>Focus Keyword</Label>
                          <Input
                            value={formData.keywordFocus || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, keywordFocus: e.target.value || null })}
                            placeholder="Primary keyword to target"
                            data-testid={`input-focus-keyword-${page.route.replace(/\//g, "-")}`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Keywords</Label>
                          <div className="flex gap-2">
                            <Input
                              value={newKeyword}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewKeyword(e.target.value)}
                              placeholder="Add keyword"
                              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && (e.preventDefault(), handleAddKeyword())}
                              data-testid={`input-add-keyword-${page.route.replace(/\//g, "-")}`}
                            />
                            <Button variant="outline" size="sm" onClick={handleAddKeyword} data-testid={`button-add-keyword-${page.route.replace(/\//g, "-")}`}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          {formData.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {formData.keywords.map((kw, idx) => (
                                <Badge key={idx} variant="secondary" className="gap-1" data-testid={`badge-keyword-${idx}`}>
                                  <Tag className="h-3 w-3" />
                                  {kw}
                                  <button
                                    onClick={() => handleRemoveKeyword(idx)}
                                    className="ml-1 hover:text-destructive"
                                    data-testid={`button-remove-keyword-${idx}`}
                                  >
                                    ×
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={handleSave}
                            disabled={saveMutation.isPending}
                            data-testid={`button-save-${page.route.replace(/\//g, "-")}`}
                          >
                            <Save className="h-4 w-4 mr-1" />
                            {saveMutation.isPending ? "Saving..." : "Save Changes"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingRoute(null);
                              setFormData(null);
                            }}
                            data-testid={`button-cancel-edit-${page.route.replace(/\//g, "-")}`}
                          >
                            Cancel
                          </Button>
                          {hasMetadata && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this metadata?")) {
                                  deleteMutation.mutate(page.route);
                                }
                              }}
                              data-testid={`button-delete-${page.route.replace(/\//g, "-")}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {hasMetadata && meta ? (
                          <>
                            <div>
                              <Label className="text-xs text-muted-foreground">Title</Label>
                              <p className="text-sm">{meta.title}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Description</Label>
                              <p className="text-sm">{meta.description}</p>
                            </div>
                            {meta.keywordFocus && (
                              <div>
                                <Label className="text-xs text-muted-foreground">Focus Keyword</Label>
                                <p className="text-sm">{meta.keywordFocus}</p>
                              </div>
                            )}
                            {meta.keywords && meta.keywords.length > 0 && (
                              <div>
                                <Label className="text-xs text-muted-foreground">Keywords</Label>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {meta.keywords.map((kw: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {kw}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground">
                              Last modified: {meta.lastModified ? new Date(meta.lastModified).toLocaleDateString() : "N/A"}
                            </div>
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No custom metadata configured. Using default values.
                          </p>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditing(page.route, meta)}
                          data-testid={`button-edit-${page.route.replace(/\//g, "-")}`}
                        >
                          {hasMetadata ? "Edit Metadata" : "Configure Metadata"}
                        </Button>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
