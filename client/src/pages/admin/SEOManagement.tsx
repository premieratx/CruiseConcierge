import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';
import { 
  Search, TrendingUp, Target, Globe, Settings, Bot, BarChart3, 
  CheckCircle, AlertTriangle, XCircle, Zap, Eye, Edit, Plus,
  Sparkles, Brain, Lightbulb, FileText, Link, Image, Hash,
  Gauge, Clock, Users, ArrowUp, ArrowDown, ExternalLink,
  Copy, RefreshCw, Save, Trash2, Calendar, Info
} from 'lucide-react';

interface SeoPage {
  id: string;
  pageRoute: string;
  pageName: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  focusKeyword?: string;
  targetKeywords?: string[];
  seoScore: number;
  lastAnalyzed?: string;
  issues?: SEOIssue[];
  recommendations?: string[];
  active: boolean;
  autoOptimize: boolean;
}

interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  category: 'meta' | 'content' | 'technical' | 'performance' | 'accessibility';
  message: string;
  element?: string;
  priority: 'high' | 'medium' | 'low';
  autoFixable: boolean;
}

interface SEOOverview {
  totalPages: number;
  averageScore: number;
  highPriorityIssues: number;
  pagesNeedingOptimization: number;
  lastAnalyzed?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function SEOManagement() {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState<SeoPage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState<Partial<SeoPage>>({});
  const [activeTab, setActiveTab] = useState('overview');
  const [optimizing, setOptimizing] = useState<string | null>(null);

  // Fetch SEO overview
  const { data: overview, isLoading: overviewLoading } = useQuery<SEOOverview>({
    queryKey: ['/api/seo/overview'],
    staleTime: 30 * 1000,
  });

  // Fetch SEO pages
  const { data: seoPages = [], isLoading: pagesLoading } = useQuery<SeoPage[]>({
    queryKey: ['/api/seo/pages'],
    staleTime: 30 * 1000,
  });

  // Fetch SEO settings
  const { data: seoSettings, isLoading: settingsLoading } = useQuery({
    queryKey: ['/api/seo/settings'],
    staleTime: 60 * 1000,
  });

  // Update SEO page mutation
  const updatePageMutation = useMutation({
    mutationFn: async (data: { pageRoute: string; updates: Partial<SeoPage> }) => {
      const response = await fetch(`/api/seo/pages/${encodeURIComponent(data.pageRoute)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.updates),
      });
      if (!response.ok) throw new Error('Failed to update SEO page');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/pages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/seo/overview'] });
      toast({ title: 'Success', description: 'SEO settings updated successfully' });
      setIsEditing(false);
      setSelectedPage(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update SEO settings', variant: 'destructive' });
    }
  });

  // Analyze page mutation
  const analyzePageMutation = useMutation({
    mutationFn: async (pageRoute: string) => {
      const response = await fetch(`/api/seo/analyze/${encodeURIComponent(pageRoute)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: '' }), // Will analyze current page content
      });
      if (!response.ok) throw new Error('Failed to analyze page');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/pages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/seo/overview'] });
      toast({ title: 'Success', description: 'Page analysis completed' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to analyze page', variant: 'destructive' });
    }
  });

  // AI optimize page mutation
  const optimizePageMutation = useMutation({
    mutationFn: async (pageRoute: string) => {
      setOptimizing(pageRoute);
      const response = await fetch('/api/seo/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageRoute,
          optimizationType: 'full_page'
        }),
      });
      if (!response.ok) throw new Error('Failed to optimize page');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/pages'] });
      toast({ title: 'Success', description: 'AI optimization completed successfully' });
      setOptimizing(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to optimize page with AI', variant: 'destructive' });
      setOptimizing(null);
    }
  });

  // Bulk analyze mutation
  const bulkAnalyzeMutation = useMutation({
    mutationFn: async () => {
      const pageRoutes = seoPages.map(page => page.pageRoute);
      const response = await fetch('/api/seo/bulk-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageRoutes }),
      });
      if (!response.ok) throw new Error('Failed to perform bulk analysis');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/pages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/seo/overview'] });
      toast({ title: 'Success', description: 'Bulk analysis completed' });
    }
  });

  const handleEditPage = (page: SeoPage) => {
    setSelectedPage(page);
    setEditingData(page);
    setIsEditing(true);
  };

  const handleSavePage = () => {
    if (!selectedPage || !editingData.pageRoute) return;
    
    updatePageMutation.mutate({
      pageRoute: selectedPage.pageRoute,
      updates: editingData
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  const getIssueIcon = (issue: SEOIssue) => {
    switch (issue.type) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 p-6" data-testid="seo-management-page">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex justify-between items-start"
        >
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2" data-testid="page-title">
              <Target className="w-8 h-8 text-blue-600" />
              SEO Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Optimize your website's search engine performance with AI-powered tools
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => bulkAnalyzeMutation.mutate()}
              disabled={bulkAnalyzeMutation.isPending}
              variant="outline"
              data-testid="button-bulk-analyze"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${bulkAnalyzeMutation.isPending ? 'animate-spin' : ''}`} />
              Analyze All Pages
            </Button>
          </div>
        </motion.div>

        {/* Overview Cards */}
        {overview && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="total-pages">{overview.totalPages}</div>
                  <p className="text-xs text-muted-foreground">Tracked for SEO</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <Gauge className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getScoreColor(overview.averageScore)}`} data-testid="average-score">
                    {Math.round(overview.averageScore)}
                  </div>
                  <Progress value={overview.averageScore} className="mt-2" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600" data-testid="critical-issues">
                    {overview.highPriorityIssues}
                  </div>
                  <p className="text-xs text-muted-foreground">Need attention</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pages to Optimize</CardTitle>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600" data-testid="pages-to-optimize">
                    {overview.pagesNeedingOptimization}
                  </div>
                  <p className="text-xs text-muted-foreground">Below 80 score</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pages">Page Management</TabsTrigger>
            <TabsTrigger value="settings">Global Settings</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          {/* Pages Management Tab */}
          <TabsContent value="pages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  SEO Pages Management
                </CardTitle>
                <CardDescription>
                  Manage SEO settings for individual pages and optimize their search performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {seoPages.map((page) => (
                      <motion.div
                        key={page.id}
                        variants={fadeInUp}
                        className="border rounded-lg p-4 space-y-3"
                        data-testid={`page-item-${page.pageRoute.replace('/', 'home')}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg">{page.pageName}</h3>
                              <Badge variant="outline">{page.pageRoute}</Badge>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBgColor(page.seoScore)}`}>
                                <span className={getScoreColor(page.seoScore)}>
                                  {page.seoScore}/100
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {page.metaTitle ? (
                                <>
                                  <span className="font-medium">Title:</span> {page.metaTitle}
                                </>
                              ) : (
                                <span className="text-red-500">No meta title set</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {page.metaDescription ? (
                                <>
                                  <span className="font-medium">Description:</span> {page.metaDescription.substring(0, 100)}...
                                </>
                              ) : (
                                <span className="text-red-500">No meta description set</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => analyzePageMutation.mutate(page.pageRoute)}
                              disabled={analyzePageMutation.isPending}
                              data-testid={`button-analyze-${page.pageRoute.replace('/', 'home')}`}
                            >
                              <BarChart3 className="w-4 h-4 mr-1" />
                              Analyze
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => optimizePageMutation.mutate(page.pageRoute)}
                              disabled={optimizing === page.pageRoute}
                              data-testid={`button-optimize-${page.pageRoute.replace('/', 'home')}`}
                            >
                              {optimizing === page.pageRoute ? (
                                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                              ) : (
                                <Sparkles className="w-4 h-4 mr-1" />
                              )}
                              AI Optimize
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleEditPage(page)}
                              data-testid={`button-edit-${page.pageRoute.replace('/', 'home')}`}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>

                        {/* Issues Display */}
                        {page.issues && page.issues.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Issues:</h4>
                            <div className="space-y-1">
                              {page.issues.slice(0, 3).map((issue, index) => (
                                <div key={index} className="flex items-start gap-2 text-sm">
                                  {getIssueIcon(issue)}
                                  <span className="text-gray-600 dark:text-gray-300">{issue.message}</span>
                                  {issue.autoFixable && (
                                    <Badge variant="secondary" className="text-xs">Auto-fixable</Badge>
                                  )}
                                </div>
                              ))}
                              {page.issues.length > 3 && (
                                <div className="text-sm text-gray-500">
                                  +{page.issues.length - 3} more issues
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Keywords Display */}
                        {page.targetKeywords && page.targetKeywords.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Keywords:</h4>
                            <div className="flex flex-wrap gap-1">
                              {page.targetKeywords.map((keyword, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common SEO management tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab('pages')}
                    data-testid="button-manage-pages"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Manage Page SEO Settings
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => bulkAnalyzeMutation.mutate()}
                    disabled={bulkAnalyzeMutation.isPending}
                    data-testid="button-run-site-audit"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Run Full Site Audit
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    data-testid="button-view-sitemap"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    View/Generate Sitemap
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab('settings')}
                    data-testid="button-global-settings"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Global SEO Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent SEO Activity</CardTitle>
                  <CardDescription>Latest optimizations and analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 p-2 rounded bg-green-50 dark:bg-green-900/20">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="font-medium">Home page optimized</div>
                        <div className="text-gray-500">Score improved from 67 to 89</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-blue-50 dark:bg-blue-900/20">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-medium">AI analysis completed</div>
                        <div className="text-gray-500">Generated 12 optimization recommendations</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-yellow-50 dark:bg-yellow-900/20">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <div>
                        <div className="font-medium">Issues found</div>
                        <div className="text-gray-500">3 pages need meta descriptions</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global SEO Settings</CardTitle>
                <CardDescription>Configure site-wide SEO settings and defaults</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input 
                        id="business-name" 
                        placeholder="Premier Party Cruises"
                        data-testid="input-business-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="default-title">Default Meta Title Template</Label>
                      <Input 
                        id="default-title" 
                        placeholder="{pageName} - Premier Party Cruises"
                        data-testid="input-default-title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="default-description">Default Meta Description</Label>
                      <Textarea 
                        id="default-description"
                        placeholder="Austin's premier boat rental and party cruise experience..."
                        data-testid="input-default-description"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-generate Sitemaps</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Automatically update sitemap.xml when pages change
                        </p>
                      </div>
                      <Switch data-testid="switch-auto-sitemap" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>AI Optimization</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Allow AI to optimize content automatically
                        </p>
                      </div>
                      <Switch data-testid="switch-ai-optimization" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Regular Audits</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Run automated SEO audits weekly
                        </p>
                      </div>
                      <Switch data-testid="switch-regular-audits" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button data-testid="button-save-settings">
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Analysis & Insights</CardTitle>
                <CardDescription>Detailed SEO performance analysis and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Advanced SEO analytics coming soon</p>
                  <p className="text-sm">Keyword rankings, competitor analysis, and more</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Page Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit SEO Settings: {selectedPage?.pageName}</DialogTitle>
              <DialogDescription>
                Optimize meta tags, keywords, and other SEO elements for this page
              </DialogDescription>
            </DialogHeader>

            {selectedPage && (
              <div className="space-y-6">
                {/* Basic Meta Tags */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Meta Tags</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="meta-title">Meta Title</Label>
                      <Input
                        id="meta-title"
                        value={editingData.metaTitle || ''}
                        onChange={(e) => setEditingData(prev => ({ ...prev, metaTitle: e.target.value }))}
                        placeholder="Enter meta title (50-60 characters recommended)"
                        data-testid="input-meta-title"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Characters: {editingData.metaTitle?.length || 0}/60
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="meta-description">Meta Description</Label>
                      <Textarea
                        id="meta-description"
                        value={editingData.metaDescription || ''}
                        onChange={(e) => setEditingData(prev => ({ ...prev, metaDescription: e.target.value }))}
                        placeholder="Enter meta description (150-160 characters recommended)"
                        data-testid="input-meta-description"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Characters: {editingData.metaDescription?.length || 0}/160
                      </p>
                    </div>
                  </div>
                </div>

                {/* Keywords */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Keywords</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="focus-keyword">Focus Keyword</Label>
                      <Input
                        id="focus-keyword"
                        value={editingData.focusKeyword || ''}
                        onChange={(e) => setEditingData(prev => ({ ...prev, focusKeyword: e.target.value }))}
                        placeholder="Main keyword for this page"
                        data-testid="input-focus-keyword"
                      />
                    </div>
                    <div>
                      <Label htmlFor="target-keywords">Target Keywords (comma-separated)</Label>
                      <Input
                        id="target-keywords"
                        value={editingData.targetKeywords?.join(', ') || ''}
                        onChange={(e) => setEditingData(prev => ({ 
                          ...prev, 
                          targetKeywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                        }))}
                        placeholder="keyword1, keyword2, keyword3"
                        data-testid="input-target-keywords"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Advanced Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-optimization</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Allow AI to optimize this page automatically
                        </p>
                      </div>
                      <Switch
                        checked={editingData.autoOptimize || false}
                        onCheckedChange={(checked) => setEditingData(prev => ({ ...prev, autoOptimize: checked }))}
                        data-testid="switch-auto-optimize"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Active</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Include this page in SEO tracking
                        </p>
                      </div>
                      <Switch
                        checked={editingData.active !== false}
                        onCheckedChange={(checked) => setEditingData(prev => ({ ...prev, active: checked }))}
                        data-testid="switch-active"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-6">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSavePage}
                    disabled={updatePageMutation.isPending}
                    data-testid="button-save-page"
                  >
                    {updatePageMutation.isPending && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}