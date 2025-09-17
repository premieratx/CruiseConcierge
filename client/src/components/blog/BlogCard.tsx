import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye, MessageCircle, User } from "lucide-react";
import { Link } from "wouter";
import { BlogPost, BlogAuthor, BlogCategory } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
  author?: BlogAuthor;
  categories?: BlogCategory[];
  showExcerpt?: boolean;
  className?: string;
}

export function BlogCard({ 
  post, 
  author, 
  categories = [], 
  showExcerpt = true,
  className = "" 
}: BlogCardProps) {
  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const primaryCategory = categories.find(cat => cat.id);

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {post.featuredImage && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            data-testid={`img-featured-${post.id}`}
          />
          {post.featured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600">
              Featured
            </Badge>
          )}
          {primaryCategory && (
            <Badge 
              className="absolute top-3 right-3"
              style={{ backgroundColor: primaryCategory.color || '#3b82f6' }}
            >
              {primaryCategory.name}
            </Badge>
          )}
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          {author && (
            <Link href={`/blog/author/${author.id}`}>
              <div className="flex items-center gap-1 hover:text-primary transition-colors" data-testid={`link-author-${author.id}`}>
                <User className="h-3 w-3" />
                <span>{author.name}</span>
              </div>
            </Link>
          )}
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
          {post.readingTime && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readingTime} min read</span>
              </div>
            </>
          )}
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold line-clamp-2 hover:text-primary transition-colors cursor-pointer" data-testid={`title-post-${post.id}`}>
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      {showExcerpt && post.excerpt && (
        <CardContent className="pt-0">
          <p className="text-muted-foreground line-clamp-3" data-testid={`excerpt-${post.id}`}>
            {post.excerpt}
          </p>
        </CardContent>
      )}

      <CardFooter className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span data-testid={`views-${post.id}`}>{post.viewCount || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span data-testid={`comments-${post.id}`}>{post.commentCount || 0}</span>
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <Button variant="outline" size="sm" data-testid={`button-read-${post.id}`}>
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}