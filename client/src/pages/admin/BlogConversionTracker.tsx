import { useQuery } from "@tanstack/react-query";
import AdminNoIndex from "@/components/AdminNoIndex";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Check, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  contentType: string;
  publishedAt: string;
  status: string;
}

export default function BlogConversionTracker() {
  const { data, isLoading } = useQuery<{ posts: BlogPost[], total: number }>({
    queryKey: ['/api/blog/public/posts?limit=200'],
  });

  const htmlBlogs = data?.posts.filter(p => p.contentType === 'html') || [];
  const reactBlogs = data?.posts.filter(p => p.contentType === 'react') || [];
  const conversionProgress = data?.posts.length ? ((reactBlogs.length / data.posts.length) * 100).toFixed(1) : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <AdminNoIndex />
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Blog Conversion Tracker</h1>
        <p className="text-muted-foreground">
          Track progress converting HTML blog posts to React components
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.total || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HTML Blogs</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{htmlBlogs.length}</div>
            <p className="text-xs text-muted-foreground">Need conversion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">React Blogs</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{reactBlogs.length}</div>
            <p className="text-xs text-muted-foreground">{conversionProgress}% complete</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>HTML Blogs Requiring Conversion</CardTitle>
          <CardDescription>
            All {htmlBlogs.length} blog posts below are plain-text HTML and need to be converted to React components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {htmlBlogs.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium max-w-md truncate">
                    {post.title}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {post.slug}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      HTML
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{post.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`/blogs/${post.slug}`, '_blank')}
                      data-testid={`view-blog-${post.slug}`}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {reactBlogs.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Converted React Blogs</CardTitle>
            <CardDescription>
              {reactBlogs.length} blog posts successfully converted to React
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reactBlogs.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {post.slug}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        React
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`/blogs/${post.slug}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Conversion Plan</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h3>HTML to React Blog Migration Strategy</h3>
          
          <h4>Phase 1: Preparation (Week 1)</h4>
          <ul>
            <li>Create reusable blog post template component with consistent styling</li>
            <li>Audit all {htmlBlogs.length} HTML blogs for common patterns and content structures</li>
            <li>Identify blog posts with unique layouts or features</li>
            <li>Create migration checklist and quality standards</li>
          </ul>

          <h4>Phase 2: Batch Conversion (Weeks 2-4)</h4>
          <ul>
            <li>Convert monthly bach/bachelor party guides (12 posts) - similar structure</li>
            <li>Convert Lake Travis guides and regulations (15-20 posts) - standardized format</li>
            <li>Convert event planning guides (10-15 posts) - template-based</li>
            <li>Convert service comparison posts (10-12 posts) - consistent layout</li>
            <li>Convert unique/custom posts (remaining posts)</li>
          </ul>

          <h4>Phase 3: Quality Assurance (Week 5)</h4>
          <ul>
            <li>Test all converted posts for broken links and formatting issues</li>
            <li>Verify SEO metadata (titles, descriptions, schema markup)</li>
            <li>Check mobile responsiveness and accessibility</li>
            <li>Validate internal linking and CTAs</li>
          </ul>

          <h4>Phase 4: Launch & Cleanup (Week 6)</h4>
          <ul>
            <li>Deploy converted posts to production</li>
            <li>Monitor analytics and user engagement</li>
            <li>Remove old HTML rendering code</li>
            <li>Update documentation</li>
          </ul>

          <h4>Technical Requirements</h4>
          <ul>
            <li>Each React blog component should include proper TypeScript types</li>
            <li>Maintain existing URL structure (/blogs/slug-name)</li>
            <li>Preserve all SEO metadata and schema markup</li>
            <li>Use lazy loading for images and heavy content</li>
            <li>Include proper heading hierarchy (H1, H2, H3)</li>
            <li>Add internal links to related services and pages</li>
          </ul>

          <h4>Quality Standards</h4>
          <ul>
            <li>All links must be tested and functional</li>
            <li>Images must have alt text for accessibility</li>
            <li>Content must be mobile-responsive</li>
            <li>Page load time under 3 seconds</li>
            <li>Lighthouse SEO score 95+</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
