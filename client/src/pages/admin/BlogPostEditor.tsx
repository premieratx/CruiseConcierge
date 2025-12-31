import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import AdminNoIndex from "@/components/AdminNoIndex";
import { RichTextEditor } from "@/components/blog/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Calendar, 
  Image, 
  Tag, 
  Folder,
  Globe,
  Search
} from "lucide-react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BlogPost, BlogAuthor, BlogCategory, BlogTag, insertBlogPostSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Form schema
const blogPostFormSchema = insertBlogPostSchema.extend({
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
});

type BlogPostFormData = z.infer<typeof blogPostFormSchema>;

interface BlogPostEditorData {
  post?: BlogPost & {
    categories?: BlogCategory[];
    tags?: BlogTag[];
  };
  authors: BlogAuthor[];
  categories: BlogCategory[];
  tags: BlogTag[];
}

export default function BlogPostEditor() {
  const { id } = useParams<{ id?: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = id && id !== 'new';
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTagName, setNewTagName] = useState("");

  // Fetch editor data
  const { data, isLoading, error } = useQuery<BlogPostEditorData>({
    queryKey: ['/api/blog/editor', id],
    queryFn: async () => {
      const response = await fetch(`/api/blog/editor${isEditing ? `/${id}` : ''}`);
      if (!response.ok) throw new Error('Failed to fetch editor data');
      return response.json();
    }
  });

  // Initialize form
  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      status: "draft",
      authorId: "",
      featuredImage: "",
      featuredImageAlt: "",
      metaTitle: "",
      metaDescription: "",
      focusKeyphrase: "",
      allowComments: true,
      featured: false,
    }
  });

  // Update form when data loads
  useEffect(() => {
    if (data?.post) {
      const post = data.post;
      form.reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content,
        status: post.status,
        authorId: post.authorId,
        featuredImage: post.featuredImage || "",
        featuredImageAlt: post.featuredImageAlt || "",
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        focusKeyphrase: post.focusKeyphrase || "",
        allowComments: post.allowComments,
        featured: post.featured,
      });

      if (post.categories) {
        setSelectedCategories(post.categories.map(c => c.id));
      }
      if (post.tags) {
        setSelectedTags(post.tags.map(t => t.id));
      }
    }
  }, [data, form]);

  // Auto-generate slug from title
  const watchTitle = form.watch("title");
  useEffect(() => {
    if (watchTitle && !isEditing) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      form.setValue("slug", slug);
    }
  }, [watchTitle, form, isEditing]);

  // Save post mutation
  const savePostMutation = useMutation({
    mutationFn: async (formData: BlogPostFormData) => {
      const postData = {
        ...formData,
        categories: selectedCategories,
        tags: selectedTags,
      };

      const response = await fetch(
        isEditing ? `/api/blog/posts/${id}` : '/api/blog/posts',
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        }
      );

      if (!response.ok) throw new Error('Failed to save post');
      return response.json();
    },
    onSuccess: (savedPost) => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/management'] });
      toast({
        title: "Success",
        description: `Blog post ${isEditing ? 'updated' : 'created'} successfully.`
      });
      navigate(`/admin/blogs/posts/${savedPost.id}/edit`);
    },
    onError: () => {
      toast({
        title: "Error", 
        description: `Failed to ${isEditing ? 'update' : 'create'} blog post.`,
        variant: "destructive"
      });
    }
  });

  // Publish post mutation
  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!isEditing) throw new Error('Post must be saved before publishing');
      
      const response = await fetch(`/api/blog/posts/${id}/publish`, {
        method: 'POST'
      });
      
      if (!response.ok) throw new Error('Failed to publish post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/editor', id] });
      toast({
        title: "Success",
        description: "Blog post published successfully."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to publish blog post.",
        variant: "destructive"
      });
    }
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      const response = await fetch('/api/blog/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug: name.toLowerCase().replace(/\s+/g, '-') })
      });
      if (!response.ok) throw new Error('Failed to create category');
      return response.json();
    },
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/editor'] });
      setSelectedCategories(prev => [...prev, newCategory.id]);
      setNewCategoryName("");
      toast({
        title: "Success",
        description: "Category created and added to post."
      });
    }
  });

  // Create tag mutation
  const createTagMutation = useMutation({
    mutationFn: async (name: string) => {
      const response = await fetch('/api/blog/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug: name.toLowerCase().replace(/\s+/g, '-') })
      });
      if (!response.ok) throw new Error('Failed to create tag');
      return response.json();
    },
    onSuccess: (newTag) => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/editor'] });
      setSelectedTags(prev => [...prev, newTag.id]);
      setNewTagName("");
      toast({
        title: "Success",
        description: "Tag created and added to post."
      });
    }
  });

  const onSubmit = (formData: BlogPostFormData) => {
    savePostMutation.mutate(formData);
  };

  const handlePublish = () => {
    publishMutation.mutate();
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load blog post editor. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <AdminNoIndex />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/blogs/posts">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Posts
              </Button>
            </Link>
            <h1 className="text-2xl font-bold" data-testid="title-editor">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {isEditing && data?.post && (
              <Button variant="outline" asChild data-testid="button-preview">
                <Link href={`/blogs/${data.post.slug}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Link>
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={form.handleSubmit(onSubmit)}
              disabled={savePostMutation.isPending}
              data-testid="button-save"
            >
              <Save className="h-4 w-4 mr-2" />
              {savePostMutation.isPending ? 'Saving...' : 'Save'}
            </Button>

            {isEditing && data?.post?.status !== 'published' && (
              <Button
                onClick={handlePublish}
                disabled={publishMutation.isPending}
                data-testid="button-publish"
              >
                <Globe className="h-4 w-4 mr-2" />
                {publishMutation.isPending ? 'Publishing...' : 'Publish'}
              </Button>
            )}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter blog post title..."
                          className="text-2xl font-bold border-0 px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                          data-testid="input-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Slug */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="url-friendly-slug"
                          data-testid="input-slug"
                        />
                      </FormControl>
                      <FormDescription>
                        The URL-friendly version of the title
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Excerpt */}
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Brief description of the post..."
                          rows={3}
                          data-testid="textarea-excerpt"
                        />
                      </FormControl>
                      <FormDescription>
                        A short summary that appears in post listings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Content Editor */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write your blog post content here..."
                          minHeight="400px"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SEO Tab */}
                <Tabs defaultValue="content" className="w-full">
                  <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                  </TabsList>

                  <TabsContent value="seo" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="metaTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="SEO-optimized title..."
                              data-testid="input-meta-title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="SEO meta description..."
                              rows={3}
                              data-testid="textarea-meta-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="focusKeyphrase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Focus Keyphrase</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Primary SEO keyword..."
                              data-testid="input-focus-keyphrase"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="media" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="featuredImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://example.com/image.jpg"
                              data-testid="input-featured-image"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featuredImageAlt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image Alt Text</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Describe the image..."
                              data-testid="input-featured-image-alt"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Post Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Post Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-status">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="authorId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-author">
                                <SelectValue placeholder="Select author" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {data?.authors.map((author) => (
                                <SelectItem key={author.id} value={author.id}>
                                  {author.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="allowComments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Allow Comments</FormLabel>
                            <FormDescription>
                              Enable comments on this post
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="switch-allow-comments"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Featured Post</FormLabel>
                            <FormDescription>
                              Highlight this post on the homepage
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="switch-featured"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Folder className="h-4 w-4" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {data?.categories.map((category) => (
                        <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories(prev => [...prev, category.id]);
                              } else {
                                setSelectedCategories(prev => prev.filter(id => id !== category.id));
                              }
                            }}
                            data-testid={`checkbox-category-${category.id}`}
                          />
                          <span>{category.name}</span>
                        </label>
                      ))}
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Input
                        placeholder="New category name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        data-testid="input-new-category"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => createCategoryMutation.mutate(newCategoryName)}
                        disabled={!newCategoryName || createCategoryMutation.isPending}
                        data-testid="button-add-category"
                      >
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {selectedTags.map((tagId) => {
                        const tag = data?.tags.find(t => t.id === tagId);
                        if (!tag) return null;
                        return (
                          <Badge
                            key={tagId}
                            variant="secondary"
                            className="cursor-pointer hover:bg-red-100 hover:text-red-800"
                            onClick={() => setSelectedTags(prev => prev.filter(id => id !== tagId))}
                            data-testid={`badge-selected-tag-${tagId}`}
                          >
                            #{tag.name} ×
                          </Badge>
                        );
                      })}
                    </div>

                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {data?.tags
                        .filter(tag => !selectedTags.includes(tag.id))
                        .map((tag) => (
                          <button
                            key={tag.id}
                            type="button"
                            className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded"
                            onClick={() => setSelectedTags(prev => [...prev, tag.id])}
                            data-testid={`button-tag-${tag.id}`}
                          >
                            <span>#{tag.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {tag.postCount}
                            </Badge>
                          </button>
                        ))}
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Input
                        placeholder="New tag name"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        data-testid="input-new-tag"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => createTagMutation.mutate(newTagName)}
                        disabled={!newTagName || createTagMutation.isPending}
                        data-testid="button-add-tag"
                      >
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
}