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
  { route: "/", name: "Homepage" },
  { route: "/atx-disco-cruise", name: "ATX Disco Cruise" },
  { route: "/private-cruises", name: "Private Cruises" },
  { route: "/bachelor-party-austin", name: "Bachelor Party Austin" },
  { route: "/bachelorette-party-austin", name: "Bachelorette Party Austin" },
  { route: "/combined-bachelor-bachelorette-austin", name: "Combined Bachelor Bachelorette" },
  { route: "/corporate-events", name: "Corporate Events" },
  { route: "/birthday-parties", name: "Birthday Parties" },
  { route: "/wedding-parties", name: "Wedding Parties" },
  { route: "/rehearsal-dinner", name: "Rehearsal Dinner" },
  { route: "/welcome-party", name: "Welcome Party" },
  { route: "/after-party", name: "After Party" },
  { route: "/team-building", name: "Team Building" },
  { route: "/client-entertainment", name: "Client Entertainment" },
  { route: "/company-milestone", name: "Company Milestone" },
  { route: "/milestone-birthday", name: "Milestone Birthday" },
  { route: "/sweet-16", name: "Sweet 16" },
  { route: "/graduation-party", name: "Graduation Party" },
  { route: "/party-boat-austin", name: "Party Boat Austin" },
  { route: "/party-boat-lake-travis", name: "Party Boat Lake Travis" },
  { route: "/pricing-breakdown", name: "Pricing Breakdown" },
  { route: "/faq", name: "FAQ" },
  { route: "/contact", name: "Contact" },
  { route: "/gallery", name: "Gallery" },
  // Bachelor Party Blogs
  { route: "/blogs/austin-bachelor-party-ideas", name: "Austin Bachelor Party Ideas" },
  { route: "/blogs/lake-travis-bachelor-party-boats-guide", name: "Lake Travis Bachelor Party Boats Guide" },
  { route: "/blogs/perfect-austin-bachelor-party-weekend", name: "Perfect Austin Bachelor Party Weekend" },
  { route: "/blogs/atx-disco-cruise-dos-and-donts-bachelor-party", name: "ATX Disco Cruise Do's and Don'ts" },
  { route: "/blogs/bachelor-party-outfit-ideas-atx-disco-cruise", name: "Bachelor Party Outfit Ideas" },
  { route: "/blogs/austin-bachelor-party-january", name: "Austin Bachelor Party January" },
  { route: "/blogs/austin-bachelor-party-march", name: "Austin Bachelor Party March" },
  { route: "/blogs/austin-bachelor-party-may", name: "Austin Bachelor Party May" },
  { route: "/blogs/austin-bachelor-party-july", name: "Austin Bachelor Party July" },
  { route: "/blogs/austin-bachelor-party-september", name: "Austin Bachelor Party September" },
  { route: "/blogs/austin-bachelor-party-november", name: "Austin Bachelor Party November" },
  { route: "/blogs/epic-bachelor-party-austin-ultimate-guide", name: "Epic Bachelor Party Austin Guide" },
  { route: "/blogs/how-to-throw-great-bachelor-party-austin", name: "How to Throw Great Bachelor Party" },
  { route: "/blogs/lake-travis-bachelor-party-alcohol-delivery-complete-coordination-guide-for-boat-parties", name: "Bachelor Party Alcohol Delivery Guide" },
  { route: "/blogs/lake-travis-bachelor-party-austin-celebrations", name: "Lake Travis Bachelor Party Celebrations" },
  { route: "/blogs/lake-travis-bachelor-party-boat-rentals-the-ultimate-guide-to-epic-celebrations", name: "Lake Travis Bachelor Boat Rentals Guide" },
  { route: "/blogs/perfect-bachelor-party-itinerary-austin", name: "Perfect Bachelor Party Itinerary" },
  { route: "/blogs/why-choose-austin-bachelor-party", name: "Why Choose Austin Bachelor Party" },
  // Bachelorette Party Blogs
  { route: "/blogs/austin-bachelorette-party-april", name: "Austin Bachelorette Party April" },
  { route: "/blogs/austin-bachelorette-party-june", name: "Austin Bachelorette Party June" },
  { route: "/blogs/austin-bachelorette-party-august", name: "Austin Bachelorette Party August" },
  { route: "/blogs/austin-bachelorette-party-october", name: "Austin Bachelorette Party October" },
  { route: "/blogs/austin-bachelorette-party-december", name: "Austin Bachelorette Party December" },
  { route: "/blogs/austin-bachelorette-party-february", name: "Austin Bachelorette Party February" },
  { route: "/blogs/epic-bachelorette-party-austin-ultimate-guide", name: "Epic Bachelorette Party Austin Guide" },
  { route: "/blogs/how-to-throw-great-bachelorette-party-austin", name: "How to Throw Great Bachelorette Party" },
  { route: "/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend", name: "Must-Haves for Perfect Bachelorette Weekend" },
  { route: "/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience", name: "Top Spots for Bachelorette Party" },
  { route: "/blogs/why-choose-austin-bachelorette-party", name: "Why Choose Austin Bachelorette Party" },
  { route: "/blogs/austin-bachelorette-bliss-spa-retreats-disco-cruises-alcohol-delivery", name: "Bachelorette Bliss Spa & Cruises" },
  { route: "/blogs/austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations", name: "Bachelorette Party Boats Lake Travis" },
  { route: "/blogs/austin-bachelorette-weekend-alcohol-timeline-day-by-day-drinking-strategy-for-multi-day-celebrations", name: "Bachelorette Weekend Alcohol Timeline" },
  { route: "/blogs/bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions", name: "Bachelorette Alcohol Emergency Kit" },
  { route: "/blogs/budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank", name: "Budget-Friendly Bachelorette Alcohol" },
  { route: "/blogs/the-ultimate-austin-bachelorette-party-alcohol-guide-what-to-order-when-to-order-and-how-much-you-actually-need", name: "Ultimate Bachelorette Alcohol Guide" },
  // Joint Bachelor/Bachelorette Blogs
  { route: "/blogs/joint-bachelor-bachelorette-party-guide", name: "Joint Bachelor Bachelorette Party Guide" },
  { route: "/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises", name: "Joint Parties with Premier Party Cruises" },
  { route: "/blogs/wedding-party-alcohol-coordination-getting-ready-bachelor-bachelorette-and-reception", name: "Wedding Party Alcohol Coordination" },
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
