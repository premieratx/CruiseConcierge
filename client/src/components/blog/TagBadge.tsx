import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { BlogTag } from "@shared/schema";

interface TagBadgeProps {
  tag: BlogTag;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "secondary" | "outline";
  linkable?: boolean;
  className?: string;
}

export function TagBadge({ 
  tag, 
  size = "sm", 
  variant = "secondary",
  linkable = true,
  className = "" 
}: TagBadgeProps) {
  const badgeStyles = {
    backgroundColor: tag.color || '#6b7280',
    color: 'white',
    borderColor: tag.color || '#6b7280'
  };

  const BadgeContent = (
    <Badge 
      variant={variant}
      className={`${className} ${linkable ? 'hover:scale-105 transition-transform cursor-pointer' : ''}`}
      style={variant === "outline" ? { borderColor: tag.color, color: tag.color } : badgeStyles}
      data-testid={`badge-tag-${tag.id}`}
    >
      #{tag.name}
      {tag.postCount > 0 && (
        <span className="ml-1 text-xs opacity-75">({tag.postCount})</span>
      )}
    </Badge>
  );

  if (linkable) {
    return (
      <Link href={`/blog/tag/${tag.slug}`}>
        {BadgeContent}
      </Link>
    );
  }

  return BadgeContent;
}