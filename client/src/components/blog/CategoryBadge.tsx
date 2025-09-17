import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { BlogCategory } from "@shared/schema";

interface CategoryBadgeProps {
  category: BlogCategory;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "secondary" | "outline";
  linkable?: boolean;
  className?: string;
}

export function CategoryBadge({ 
  category, 
  size = "default", 
  variant = "default",
  linkable = true,
  className = "" 
}: CategoryBadgeProps) {
  const badgeStyles = {
    backgroundColor: category.color || '#3b82f6',
    color: 'white',
    borderColor: category.color || '#3b82f6'
  };

  const BadgeContent = (
    <Badge 
      variant={variant}
      className={`${className} ${linkable ? 'hover:scale-105 transition-transform cursor-pointer' : ''}`}
      style={variant === "outline" ? { borderColor: category.color, color: category.color } : badgeStyles}
      data-testid={`badge-category-${category.id}`}
    >
      {category.icon && <span className="mr-1">{category.icon}</span>}
      {category.name}
      {category.postCount > 0 && (
        <span className="ml-1 text-xs opacity-75">({category.postCount})</span>
      )}
    </Badge>
  );

  if (linkable) {
    return (
      <Link href={`/blog/category/${category.slug}`}>
        {BadgeContent}
      </Link>
    );
  }

  return BadgeContent;
}