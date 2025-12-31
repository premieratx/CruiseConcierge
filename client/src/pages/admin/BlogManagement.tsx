import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import AdminNoIndex from "@/components/AdminNoIndex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Filter,
  MoreHorizontal,
  FileText,
  Users,
  Tag,
  Folder,
  Upload,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Save,
  X
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { BlogPost, BlogAuthor, BlogCategory, BlogTag, insertBlogCategorySchema, insertBlogTagSchema, insertBlogAuthorSchema, InsertBlogCategory, InsertBlogTag, InsertBlogAuthor } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface BlogManagementData {
  posts: (BlogPost & {
    author?: BlogAuthor;
    categories?: BlogCategory[];
    tags?: BlogTag[];
  })[];
  authors: BlogAuthor[];
  categories: BlogCategory[];
  tags: BlogTag[];
  totalPosts: number;
  totalPublished: number;
  totalDrafts: number;
  totalViews: number;
}

export default function BlogManagement() {
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Route detection for creation forms
  const isCreatingCategory = location === '/admin/blogs/categories/new';
  const isCreatingTag = location === '/admin/blogs/tags/new';
  const isCreatingAuthor = location === '/admin/blogs/authors/new';
  const isCreating = isCreatingCategory || isCreatingTag || isCreatingAuthor;
  
  // Upload/Import states
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadTab, setUploadTab] = useState("single");
  const [wpSiteUrl, setWpSiteUrl] = useState("");
  const [wpUsername, setWpUsername] = useState("");
  const [wpAppPassword, setWpAppPassword] = useState("");
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState("");
  const [importJobId, setImportJobId] = useState("");
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [optimizeImages, setOptimizeImages] = useState(true);
  const [convertToMarkdown, setConvertToMarkdown] = useState(false);
  const [autoCreateTags, setAutoCreateTags] = useState(true);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Form configurations
  const categoryForm = useForm<InsertBlogCategory>({
    resolver: zodResolver(insertBlogCategorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      color: '#3b82f6', // Default to a valid hex color
      icon: ''
    }
  });
  
  const tagForm = useForm<InsertBlogTag>({
    resolver: zodResolver(insertBlogTagSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      color: '#10b981' // Default to a valid hex color
    }
  });
  
  const authorForm = useForm<InsertBlogAuthor>({
    resolver: zodResolver(insertBlogAuthorSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      website: ''
    }
  });
  
  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: async (data: InsertBlogCategory) => {
      console.log('Executing mutationFn for category creation with data:', data);
      return apiRequest('POST', '/api/blog/categories', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/management'] });
      toast({
        title: "Success",
        description: "Category created successfully."
      });
      categoryForm.reset();
      setLocation('/admin/blogs');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create category.",
        variant: "destructive"
      });
    }
  });
  
  // Create tag mutation
  const createTagMutation = useMutation({
    mutationFn: async (data: InsertBlogTag) => {
      console.log('Executing mutationFn for tag creation with data:', data);
      return apiRequest('POST', '/api/blog/tags', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/management'] });
      toast({
        title: "Success",
        description: "Tag created successfully."
      });
      tagForm.reset();
      setLocation('/admin/blogs');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create tag.",
        variant: "destructive"
      });
    }
  });
  
  // Create author mutation
  const createAuthorMutation = useMutation({
    mutationFn: async (data: InsertBlogAuthor) => {
      console.log('Executing mutationFn for author creation with data:', data);
      return apiRequest('POST', '/api/blog/authors', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/management'] });
      toast({
        title: "Success",
        description: "Author created successfully."
      });
      authorForm.reset();
      setLocation('/admin/blogs');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create author.",
        variant: "destructive"
      });
    }
  });
  
  // Form handlers
  const handleCreateCategory = (data: InsertBlogCategory) => {
    console.log('Submitting category data:', data);
    console.log('Form errors:', categoryForm.formState.errors);
    createCategoryMutation.mutate(data);
  };
  
  const handleCreateTag = (data: InsertBlogTag) => {
    createTagMutation.mutate(data);
  };
  
  const handleCreateAuthor = (data: InsertBlogAuthor) => {
    createAuthorMutation.mutate(data);
  };
  
  const handleCancel = () => {
    setLocation('/admin/blogs');
  };

  // Fetch blog management data with authenticated query function
  const { data, isLoading, error } = useQuery<BlogManagementData>({
    queryKey: [
      '/api/blog/management',
      activeTab,
      currentPage,
      searchQuery,
      selectedStatus,
      selectedAuthor,
      selectedCategory
    ],
    queryFn: async () => {
      const response = await fetch('/api/blog/management', {
        headers: {
          "Authorization": "Bearer admin-dev-token"
        },
        credentials: "include"
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blog management data: ${response.status}`);
      }
      
      return response.json();
    }
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      await apiRequest('DELETE', `/api/blog/posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/management'] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post.",
        variant: "destructive"
      });
    }
  });

  // Publish/unpublish post mutation
  const togglePublishMutation = useMutation({
    mutationFn: async ({ postId, action }: { postId: string; action: 'publish' | 'unpublish' }) => {
      await apiRequest('POST', `/api/blog/posts/${postId}/${action}`);
    },
    onSuccess: (_, { action }) => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/management'] });
      toast({
        title: "Success",
        description: `Blog post ${action}ed successfully.`
      });
    },
    onError: (_, { action }) => {
      toast({
        title: "Error",
        description: `Failed to ${action} blog post.`,
        variant: "destructive"
      });
    }
  });

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Upload and import handlers
  const handleSingleUpload = async () => {
    if (!uploadFiles || uploadFiles.length === 0) return;
    
    const formData = new FormData();
    Array.from(uploadFiles).forEach((file) => {
      formData.append('files', file);
    });
    
    formData.append('options', JSON.stringify({
      optimizeImages,
      convertToMarkdown,
      autoCreateTags,
      status: 'draft'
    }));
    
    try {
      const result = await apiRequest('POST', '/api/blog/upload', formData);
      
      toast({
        title: "Success",
        description: `Uploaded ${result.createdPosts} posts successfully.`
      });
      
      setUploadFiles(null);
      setIsUploadDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['/api/blog/management'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload files.",
        variant: "destructive"
      });
    }
  };
  
  const handleBatchUpload = async () => {
    if (!uploadFiles || uploadFiles.length === 0) return;
    
    const formData = new FormData();
    Array.from(uploadFiles).forEach((file) => {
      formData.append('files', file);
    });
    
    formData.append('options', JSON.stringify({
      optimizeImages,
      convertToMarkdown,
      autoCreateTags,
      status: 'draft'
    }));
    
    try {
      setImportProgress(10);
      setImportStatus('Starting batch upload...');
      
      const result = await apiRequest('POST', '/api/blog/upload/batch', formData);
      setImportJobId(result.jobId);
      
      // Poll for progress
      pollJobStatus(result.jobId, 'batch');
    } catch (error) {
      setImportProgress(0);
      setImportStatus('');
      toast({
        title: "Error",
        description: "Failed to start batch upload.",
        variant: "destructive"
      });
    }
  };
  
  const handleWordPressPreview = async () => {
    try {
      const result = await apiRequest('POST', '/api/blog/import/wp/preview', {
        baseUrl: wpSiteUrl,
        username: wpUsername,
        appPassword: wpAppPassword,
        limit: 5
      });
      
      toast({
        title: "Preview Ready",
        description: `Found ${result.totalPosts} posts, ${result.categories} categories, ${result.tags} tags.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to preview WordPress content.",
        variant: "destructive"
      });
    }
  };
  
  const handleWordPressImport = async () => {
    try {
      setImportProgress(10);
      setImportStatus('Starting WordPress import...');
      
      const response = await apiRequest('POST', '/api/blog/import/wp/start', {
        baseUrl: wpSiteUrl,
        username: wpUsername,
        appPassword: wpAppPassword,
        options: {
          optimizeImages,
          convertToMarkdown,
          autoCreateTags
        }
      });
      const result = await response.json();
      setImportJobId(result.jobId);
      
      // Poll for progress
      pollJobStatus(result.jobId, 'wordpress');
    } catch (error) {
      setImportProgress(0);
      setImportStatus('');
      toast({
        title: "Error",
        description: "Failed to start WordPress import.",
        variant: "destructive"
      });
    }
  };
  
  const handleCancelImport = async () => {
    if (!importJobId) return;
    
    try {
      await apiRequest('POST', `/api/blog/import/wp/cancel/${importJobId}`);
      
      setImportProgress(0);
      setImportStatus('');
      setImportJobId('');
      
      toast({
        title: "Cancelled",
        description: "Import cancelled successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel import.",
        variant: "destructive"
      });
    }
  };
  
  const pollJobStatus = async (jobId: string, type: 'batch' | 'wordpress') => {
    const pollInterval = setInterval(async () => {
      try {
        const endpoint = type === 'wordpress' 
          ? `/api/blog/import/wp/status/${jobId}`
          : `/api/blog/upload/batch/status/${jobId}`;
          
        const response = await apiRequest('GET', endpoint);
        const status = await response.json();
        
        setImportProgress(Math.round((status.processed / status.total) * 100));
        setImportStatus(`${status.processed}/${status.total} items processed`);
        
        if (status.status === 'completed') {
          clearInterval(pollInterval);
          setImportProgress(100);
          setImportStatus('Import completed successfully!');
          
          setTimeout(() => {
            setImportProgress(0);
            setImportStatus('');
            setImportJobId('');
            setIsUploadDialogOpen(false);
          }, 3000);
          
          queryClient.invalidateQueries({ queryKey: ['/api/blog/management'] });
          
          toast({
            title: "Success",
            description: `Imported ${status.processed} items successfully.`
          });
        } else if (status.status === 'failed' || status.status === 'cancelled') {
          clearInterval(pollInterval);
          setImportProgress(0);
          setImportStatus('');
          setImportJobId('');
          
          toast({
            title: "Error",
            description: `Import ${status.status}: ${status.error || 'Unknown error'}`,
            variant: "destructive"
          });
        }
      } catch (error) {
        clearInterval(pollInterval);
        setImportProgress(0);
        setImportStatus('');
        setImportJobId('');
        
        toast({
          title: "Error",
          description: "Failed to check import status.",
          variant: "destructive"
        });
      }
    }, 2000);
  };

  return (
    <Layout>
      <AdminNoIndex />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" data-testid="title-blog-management">Blog Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your blog content, authors, and categories</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" data-testid="button-upload-import">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload & Import
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload & Import Blog Content</DialogTitle>
                  <DialogDescription>
                    Upload individual files, batch upload, or import from WordPress
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs value={uploadTab} onValueChange={setUploadTab} className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="single">Upload Files</TabsTrigger>
                    <TabsTrigger value="batch">Batch Upload</TabsTrigger>
                    <TabsTrigger value="wordpress">WordPress Import</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="single" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="file-upload">Select Files (.md, .html, images)</Label>
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          accept=".md,.html,.jpg,.jpeg,.png,.gif,.webp"
                          onChange={(e) => setUploadFiles(e.target.files)}
                          className="mt-2"
                          data-testid="input-file-upload"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label>Optimization Options</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="optimize-images"
                            checked={optimizeImages}
                            onCheckedChange={setOptimizeImages}
                            data-testid="checkbox-optimize-images"
                          />
                          <Label htmlFor="optimize-images">Optimize and compress images</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="convert-markdown"
                            checked={convertToMarkdown}
                            onCheckedChange={setConvertToMarkdown}
                            data-testid="checkbox-convert-markdown"
                          />
                          <Label htmlFor="convert-markdown">Convert HTML to Markdown</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="auto-create-tags"
                            checked={autoCreateTags}
                            onCheckedChange={setAutoCreateTags}
                            data-testid="checkbox-auto-tags"
                          />
                          <Label htmlFor="auto-create-tags">Auto-create categories and tags</Label>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleSingleUpload()}
                        disabled={!uploadFiles || uploadFiles.length === 0}
                        className="w-full"
                        data-testid="button-start-upload"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload and Optimize
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="batch" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="batch-upload">Select Multiple Files</Label>
                        <Input
                          id="batch-upload"
                          type="file"
                          multiple
                          accept=".md,.html,.jpg,.jpeg,.png,.gif,.webp"
                          onChange={(e) => setUploadFiles(e.target.files)}
                          className="mt-2"
                          data-testid="input-batch-upload"
                        />
                        {uploadFiles && uploadFiles.length > 0 && (
                          <p className="text-sm text-gray-500 mt-2">
                            {uploadFiles.length} files selected
                          </p>
                        )}
                      </div>
                      
                      {importProgress > 0 && (
                        <div className="space-y-2">
                          <Label>Upload Progress</Label>
                          <Progress value={importProgress} className="w-full" />
                          <p className="text-sm text-gray-500">{importStatus}</p>
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => handleBatchUpload()}
                        disabled={!uploadFiles || uploadFiles.length === 0 || importProgress > 0}
                        className="w-full"
                        data-testid="button-start-batch"
                      >
                        {importProgress > 0 ? (
                          <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Processing...</>
                        ) : (
                          <><Upload className="h-4 w-4 mr-2" />Start Batch Upload</>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="wordpress" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="wp-site-url">WordPress Site URL</Label>
                        <Input
                          id="wp-site-url"
                          type="url"
                          placeholder="https://yoursite.com"
                          value={wpSiteUrl}
                          onChange={(e) => setWpSiteUrl(e.target.value)}
                          className="mt-2"
                          data-testid="input-wp-url"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="wp-username">WordPress Username</Label>
                        <Input
                          id="wp-username"
                          type="text"
                          value={wpUsername}
                          onChange={(e) => setWpUsername(e.target.value)}
                          className="mt-2"
                          data-testid="input-wp-username"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="wp-password">Application Password</Label>
                        <Input
                          id="wp-password"
                          type="password"
                          value={wpAppPassword}
                          onChange={(e) => setWpAppPassword(e.target.value)}
                          className="mt-2"
                          data-testid="input-wp-password"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Generate an application password in your WordPress admin under Users → Profile
                        </p>
                      </div>
                      
                      {importProgress > 0 && (
                        <div className="space-y-2">
                          <Label>Import Progress</Label>
                          <Progress value={importProgress} className="w-full" />
                          <p className="text-sm text-gray-500">{importStatus}</p>
                          {importJobId && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelImport()}
                              data-testid="button-cancel-import"
                            >
                              Cancel Import
                            </Button>
                          )}
                        </div>
                      )}
                      
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleWordPressPreview()}
                          disabled={!wpSiteUrl || !wpUsername || !wpAppPassword || importProgress > 0}
                          variant="outline"
                          className="flex-1"
                          data-testid="button-wp-preview"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview Import
                        </Button>
                        
                        <Button 
                          onClick={() => handleWordPressImport()}
                          disabled={!wpSiteUrl || !wpUsername || !wpAppPassword || importProgress > 0}
                          className="flex-1"
                          data-testid="button-wp-import"
                        >
                          {importProgress > 0 ? (
                            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Importing...</>
                          ) : (
                            <><Download className="h-4 w-4 mr-2" />Import All</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button asChild data-testid="button-create-post">
              <Link href="/admin/blogs/posts/new">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {data && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-total-posts">{data.totalPosts}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Published</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600" data-testid="stat-published">{data.totalPublished}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                <Edit className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600" data-testid="stat-drafts">{data.totalDrafts}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600" data-testid="stat-total-views">{data.totalViews}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="unconverted" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Unconverted
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </TabsTrigger>
            <TabsTrigger value="authors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Authors
            </TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-posts"
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              {data?.authors && (
                <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                  <SelectTrigger className="w-[180px]" data-testid="select-author-filter">
                    <SelectValue placeholder="All Authors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Authors</SelectItem>
                    {data.authors.map((author) => (
                      <SelectItem key={author.id} value={author.id}>
                        {author.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {data?.categories && (
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]" data-testid="select-category-filter">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {data.categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Posts Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium" data-testid={`title-post-${post.id}`}>
                            {post.title}
                          </div>
                          {post.excerpt && (
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {post.excerpt}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell data-testid={`author-post-${post.id}`}>
                        {post.author?.name || 'Unknown'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(post.status)} data-testid={`status-post-${post.id}`}>
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.categories?.slice(0, 2).map((category) => (
                            <Badge key={category.id} variant="outline" className="text-xs">
                              {category.name}
                            </Badge>
                          ))}
                          {post.categories && post.categories.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.categories.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell data-testid={`views-post-${post.id}`}>
                        {post.viewCount || 0}
                      </TableCell>
                      <TableCell data-testid={`date-post-${post.id}`}>
                        {formatDate(post.publishedAt || post.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            data-testid={`button-edit-${post.id}`}
                          >
                            <Link href={`/admin/blogs/posts/${post.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            data-testid={`button-view-${post.id}`}
                          >
                            <Link href={`/blogs/${post.slug}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>

                          {post.status === 'published' ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePublishMutation.mutate({ postId: post.id, action: 'unpublish' })}
                              data-testid={`button-unpublish-${post.id}`}
                            >
                              Unpublish
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePublishMutation.mutate({ postId: post.id, action: 'publish' })}
                              data-testid={`button-publish-${post.id}`}
                            >
                              Publish
                            </Button>
                          )}

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                data-testid={`button-delete-${post.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{post.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deletePostMutation.mutate(post.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Unconverted Blogs Tab */}
          <TabsContent value="unconverted" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blogs Not Yet Converted to React Pages</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  These blog posts are currently served via WordPress SSR. Convert high-traffic posts to dedicated React pages for better performance.
                </p>
              </CardHeader>
              <CardContent>
                {(() => {
                  // List of blog slugs that have been converted to dedicated React pages
                  const convertedBlogSlugs = [
                    'first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning',
                    'birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy',
                    'holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination',
                    'joint-bachelor-bachelorette-parties-with-premier-party-cruises',
                    'lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations',
                    'must-haves-for-the-perfect-austin-bachelorette-weekend',
                    'top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience'
                  ];

                  const unconvertedBlogs = data?.posts
                    .filter(post => !convertedBlogSlugs.includes(post.slug))
                    .filter(post => post.status === 'published')
                    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0)) || [];

                  if (unconvertedBlogs.length === 0) {
                    return (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                        <p className="text-lg font-semibold">All published blogs converted!</p>
                        <p className="text-sm">Every published blog post has been converted to a dedicated React page.</p>
                      </div>
                    );
                  }

                  return (
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Showing {unconvertedBlogs.length} unconverted blog{unconvertedBlogs.length !== 1 ? 's' : ''} (sorted by views)
                        </p>
                      </div>
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Slug</TableHead>
                              <TableHead className="text-right">Views</TableHead>
                              <TableHead className="text-right">Published</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {unconvertedBlogs.map((post) => (
                              <TableRow key={post.id} data-testid={`unconverted-blog-${post.id}`}>
                                <TableCell>
                                  <div className="space-y-1">
                                    <div className="font-medium text-sm">
                                      {post.title}
                                    </div>
                                    {post.excerpt && (
                                      <div className="text-xs text-gray-500 line-clamp-1">
                                        {post.excerpt.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                    {post.slug}
                                  </code>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <Eye className="h-3 w-3 text-gray-400" />
                                    <span className="font-medium">{post.view_count || 0}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right text-sm text-gray-600 dark:text-gray-400">
                                  {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'N/A'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            {isCreatingCategory ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    data-testid="button-cancel-category"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Categories
                  </Button>
                  <h3 className="text-lg font-semibold">Create New Category</h3>
                </div>
                
                <Card className="max-w-2xl">
                  <CardHeader>
                    <CardTitle>Category Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...categoryForm}>
                      <form onSubmit={categoryForm.handleSubmit(handleCreateCategory)} className="space-y-4">
                        <FormField
                          control={categoryForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter category name" {...field} data-testid="input-category-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={categoryForm.control}
                          name="slug"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category Slug *</FormLabel>
                              <FormControl>
                                <Input placeholder="category-slug" {...field} data-testid="input-category-slug" />
                              </FormControl>
                              <FormDescription>
                                URL-friendly identifier (auto-generated from name if empty)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={categoryForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter category description" {...field} data-testid="textarea-category-description" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={categoryForm.control}
                          name="color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color</FormLabel>
                              <FormControl>
                                <Input type="color" {...field} data-testid="input-category-color" />
                              </FormControl>
                              <FormDescription>
                                Choose a color to help identify this category
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={categoryForm.control}
                          name="icon"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Icon</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. folder, tag, star" {...field} data-testid="input-category-icon" />
                              </FormControl>
                              <FormDescription>
                                Lucide icon name (optional)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex gap-3 pt-4">
                          <Button
                            type="submit"
                            disabled={createCategoryMutation.isPending}
                            data-testid="button-save-category"
                          >
                            {createCategoryMutation.isPending ? (
                              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Creating...</>
                            ) : (
                              <><Save className="h-4 w-4 mr-2" />Create Category</>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={createCategoryMutation.isPending}
                            data-testid="button-cancel-category-form"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Categories</h3>
                  <Button asChild data-testid="button-create-category">
                    <Link href="/admin/blogs/categories/new">
                      <Plus className="h-4 w-4 mr-2" />
                      New Category
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data?.categories.map((category) => (
                    <Card key={category.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg" data-testid={`name-category-${category.id}`}>
                            {category.name}
                          </CardTitle>
                          <Badge variant="secondary" data-testid={`count-category-${category.id}`}>
                            {category.postCount} posts
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {category.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {category.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/blogs/categories/${category.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/blogs/category/${category.slug}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                          {category.color && (
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Tags Tab */}
          <TabsContent value="tags" className="space-y-6">
            {isCreatingTag ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    data-testid="button-cancel-tag"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Tags
                  </Button>
                  <h3 className="text-lg font-semibold">Create New Tag</h3>
                </div>
                
                <Card className="max-w-2xl">
                  <CardHeader>
                    <CardTitle>Tag Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...tagForm}>
                      <form onSubmit={tagForm.handleSubmit(handleCreateTag)} className="space-y-4">
                        <FormField
                          control={tagForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tag Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter tag name" {...field} data-testid="input-tag-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={tagForm.control}
                          name="slug"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tag Slug *</FormLabel>
                              <FormControl>
                                <Input placeholder="tag-slug" {...field} data-testid="input-tag-slug" />
                              </FormControl>
                              <FormDescription>
                                URL-friendly identifier (auto-generated from name if empty)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={tagForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter tag description" {...field} data-testid="textarea-tag-description" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={tagForm.control}
                          name="color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color</FormLabel>
                              <FormControl>
                                <Input type="color" {...field} data-testid="input-tag-color" />
                              </FormControl>
                              <FormDescription>
                                Choose a color to help identify this tag
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex gap-3 pt-4">
                          <Button
                            type="submit"
                            disabled={createTagMutation.isPending}
                            data-testid="button-save-tag"
                          >
                            {createTagMutation.isPending ? (
                              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Creating...</>
                            ) : (
                              <><Save className="h-4 w-4 mr-2" />Create Tag</>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={createTagMutation.isPending}
                            data-testid="button-cancel-tag-form"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Tags</h3>
                  <Button asChild data-testid="button-create-tag">
                    <Link href="/admin/blogs/tags/new">
                      <Plus className="h-4 w-4 mr-2" />
                      New Tag
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {data?.tags.map((tag) => (
                    <Card key={tag.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium" data-testid={`name-tag-${tag.id}`}>
                          #{tag.name}
                        </h4>
                        <Badge variant="secondary" data-testid={`count-tag-${tag.id}`}>
                          {tag.postCount}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/blogs/tags/${tag.id}/edit`}>
                              <Edit className="h-3 w-3" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/blogs/tag/${tag.slug}`}>
                              <Eye className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                        {tag.color && (
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: tag.color }}
                          />
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Authors Tab */}
          <TabsContent value="authors" className="space-y-6">
            {isCreatingAuthor ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    data-testid="button-cancel-author"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Authors
                  </Button>
                  <h3 className="text-lg font-semibold">Create New Author</h3>
                </div>
                
                <Card className="max-w-2xl">
                  <CardHeader>
                    <CardTitle>Author Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...authorForm}>
                      <form onSubmit={authorForm.handleSubmit(handleCreateAuthor)} className="space-y-4">
                        <FormField
                          control={authorForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Author Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter author name" {...field} data-testid="input-author-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={authorForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter email address" {...field} data-testid="input-author-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={authorForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter author biography" {...field} data-testid="textarea-author-bio" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={authorForm.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input type="url" placeholder="https://example.com" {...field} data-testid="input-author-website" />
                              </FormControl>
                              <FormDescription>
                                Author's website or portfolio URL (optional)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex gap-3 pt-4">
                          <Button
                            type="submit"
                            disabled={createAuthorMutation.isPending}
                            data-testid="button-save-author"
                          >
                            {createAuthorMutation.isPending ? (
                              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Creating...</>
                            ) : (
                              <><Save className="h-4 w-4 mr-2" />Create Author</>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={createAuthorMutation.isPending}
                            data-testid="button-cancel-author-form"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Authors</h3>
                  <Button asChild data-testid="button-create-author">
                    <Link href="/admin/blogs/authors/new">
                      <Plus className="h-4 w-4 mr-2" />
                      New Author
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data?.authors.map((author) => (
                    <Card key={author.id}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            {author.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <CardTitle className="text-lg" data-testid={`name-author-${author.id}`}>
                              {author.name}
                            </CardTitle>
                            {author.email && (
                              <p className="text-sm text-gray-500">{author.email}</p>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {author.bio && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                            {author.bio}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/blogs/authors/${author.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/blogs/author/${author.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                          <Badge variant="secondary">
                            {data?.posts.filter(p => p.authorId === author.id).length || 0} posts
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}