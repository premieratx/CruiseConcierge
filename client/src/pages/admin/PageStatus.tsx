import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminNoIndex from "@/components/AdminNoIndex";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle2,
  XCircle,
  Circle,
  Check,
  X,
  Play,
  Download,
  RefreshCw,
  Search,
  Filter,
  History,
} from "lucide-react";
import type { PageStatusPage, PageStatusTestRun } from "@shared/schema";
import { format } from "date-fns";

export default function PageStatus() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPage, setSelectedPage] = useState<PageStatusPage | null>(null);
  const [testHistoryOpen, setTestHistoryOpen] = useState(false);

  // Fetch all pages
  const { data: pages = [], isLoading } = useQuery<PageStatusPage[]>({
    queryKey: ["/api/page-status/pages"],
  });

  // Fetch test history for selected page
  const { data: testHistory = [] } = useQuery<PageStatusTestRun[]>({
    queryKey: ["/api/page-status/tests", selectedPage?.id],
    enabled: !!selectedPage?.id,
    queryFn: async () => {
      const response = await fetch(`/api/page-status/tests?pageId=${selectedPage!.id}`);
      if (!response.ok) throw new Error("Failed to fetch test history");
      return response.json();
    },
  });

  // Ingest sitemap mutation
  const ingestSitemapMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/page-status/ingest-sitemap");
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-status/pages"] });
      toast({
        title: "Sitemap Ingested",
        description: `Created ${data.created} new pages, updated ${data.updated} pages.`,
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

  // Test single page mutation
  const testPageMutation = useMutation({
    mutationFn: async (pageId: number) => {
      const response = await apiRequest("POST", `/api/page-status/pages/${pageId}/test`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-status/pages"] });
      toast({
        title: "Test Complete",
        description: "Page has been tested successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Test Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Bulk test mutation
  const bulkTestMutation = useMutation({
    mutationFn: async (pageIds: number[]) => {
      const response = await apiRequest("POST", "/api/page-status/tests/bulk", {
        body: JSON.stringify({ pageIds }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-status/pages"] });
      toast({
        title: "Bulk Test Complete",
        description: `Tested ${data.tested} pages successfully.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Bulk Test Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Filter and search pages
  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      searchTerm === "" ||
      page.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || page.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, { color: string; icon: any }> = {
      live: { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300", icon: CheckCircle2 },
      broken: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300", icon: XCircle },
      unknown: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300", icon: Circle },
    };

    const variant = variants[status] || variants.unknown;
    const Icon = variant.icon;

    return (
      <Badge className={variant.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Boolean icon component
  const BoolIcon = ({ value }: { value: boolean }) => {
    return value ? (
      <Check className="h-4 w-4 text-green-600" />
    ) : (
      <X className="h-4 w-4 text-gray-400" />
    );
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "URL",
      "Slug",
      "Source Type",
      "Status",
      "Has Schema",
      "Indexable",
      "On Sitemap",
      "Last Confirmed Live",
    ];

    const rows = filteredPages.map((page) => [
      page.url,
      page.slug,
      page.sourceType,
      page.status,
      page.hasSchema ? "Yes" : "No",
      page.isIndexable ? "Yes" : "No",
      page.onSitemap ? "Yes" : "No",
      page.lastConfirmedLiveAt ? format(new Date(page.lastConfirmedLiveAt), "yyyy-MM-dd HH:mm") : "",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `page-status-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleTestAll = () => {
    const pageIds = filteredPages.map((p) => p.id);
    bulkTestMutation.mutate(pageIds);
  };

  const handleViewHistory = (page: PageStatusPage) => {
    setSelectedPage(page);
    setTestHistoryOpen(true);
  };

  return (
    <div className="space-y-6">
      <AdminNoIndex />
      <Card>
        <CardHeader>
          <CardTitle>Page Status Monitor</CardTitle>
          <CardDescription>
            Monitor and test all pages on your website for availability and SEO compliance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Actions and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                  data-testid="input-search-pages"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                  data-testid="button-filter-all"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "live" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("live")}
                  data-testid="button-filter-live"
                >
                  Live
                </Button>
                <Button
                  variant={statusFilter === "broken" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("broken")}
                  data-testid="button-filter-broken"
                >
                  Broken
                </Button>
                <Button
                  variant={statusFilter === "unknown" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("unknown")}
                  data-testid="button-filter-unknown"
                >
                  Unknown
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => ingestSitemapMutation.mutate()}
                disabled={ingestSitemapMutation.isPending}
                variant="outline"
                data-testid="button-ingest-sitemap"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${ingestSitemapMutation.isPending ? "animate-spin" : ""}`} />
                Ingest Sitemap
              </Button>
              <Button
                onClick={handleTestAll}
                disabled={bulkTestMutation.isPending || filteredPages.length === 0}
                data-testid="button-test-all"
              >
                <Play className="h-4 w-4 mr-2" />
                Test All ({filteredPages.length})
              </Button>
              <Button
                onClick={exportToCSV}
                variant="outline"
                disabled={filteredPages.length === 0}
                data-testid="button-export-csv"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-2xl font-bold">{pages.length}</div>
              <div className="text-sm text-muted-foreground">Total Pages</div>
            </div>
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {pages.filter((p) => p.status === "live").length}
              </div>
              <div className="text-sm text-muted-foreground">Live</div>
            </div>
            <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {pages.filter((p) => p.status === "broken").length}
              </div>
              <div className="text-sm text-muted-foreground">Broken</div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {pages.filter((p) => p.status === "unknown").length}
              </div>
              <div className="text-sm text-muted-foreground">Unknown</div>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Schema</TableHead>
                  <TableHead className="text-center">Indexable</TableHead>
                  <TableHead className="text-center">Sitemap</TableHead>
                  <TableHead>Last Confirmed Live</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      Loading pages...
                    </TableCell>
                  </TableRow>
                ) : filteredPages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No pages found. Click "Ingest Sitemap" to populate data.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPages.map((page) => (
                    <TableRow key={page.id} data-testid={`row-page-${page.id}`}>
                      <TableCell className="font-mono text-xs max-w-[300px] truncate" title={page.url}>
                        {page.url}
                      </TableCell>
                      <TableCell className="text-sm">{page.slug}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{page.sourceType}</Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={page.status} />
                      </TableCell>
                      <TableCell className="text-center">
                        <BoolIcon value={page.hasSchema} />
                      </TableCell>
                      <TableCell className="text-center">
                        <BoolIcon value={page.isIndexable} />
                      </TableCell>
                      <TableCell className="text-center">
                        <BoolIcon value={page.onSitemap} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {page.lastConfirmedLiveAt
                          ? format(new Date(page.lastConfirmedLiveAt), "MMM d, yyyy HH:mm")
                          : "Never"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => testPageMutation.mutate(page.id)}
                            disabled={testPageMutation.isPending}
                            data-testid={`button-test-page-${page.id}`}
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Test
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewHistory(page)}
                            data-testid={`button-history-${page.id}`}
                          >
                            <History className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Test History Modal */}
      <Dialog open={testHistoryOpen} onOpenChange={setTestHistoryOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Test History</DialogTitle>
            <DialogDescription>
              {selectedPage?.url}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {testHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No test history available for this page.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>HTTP</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>SEO Checks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testHistory.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="text-sm">
                        {format(new Date(test.startedAt), "MMM d, yyyy HH:mm:ss")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={test.testStatus === "success" ? "default" : "destructive"}>
                          {test.testStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={test.httpStatus && test.httpStatus >= 200 && test.httpStatus < 300 ? "default" : "destructive"}>
                          {test.httpStatus || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell>{test.responseTimeMs}ms</TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          {test.seoChecks?.hasH1 && <Badge variant="outline" className="text-xs">H1</Badge>}
                          {test.seoChecks?.hasMetaDescription && <Badge variant="outline" className="text-xs">Meta</Badge>}
                          {test.seoChecks?.hasTitle && <Badge variant="outline" className="text-xs">Title</Badge>}
                          {test.seoChecks?.hasSchema && <Badge variant="outline" className="text-xs">Schema</Badge>}
                          {test.seoChecks?.robotsIndexable && <Badge variant="outline" className="text-xs">Indexable</Badge>}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
