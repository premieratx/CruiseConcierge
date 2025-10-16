import { Link, LinkProps } from 'wouter';
import { cn } from '@/lib/utils';

interface InternalLinkHighlightProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function InternalLinkHighlight({ 
  children, 
  className, 
  title,
  ...props 
}: InternalLinkHighlightProps) {
  return (
    <Link
      {...props}
      title={title}
      className={cn(
        'inline-flex items-center gap-1 text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary transition-colors duration-200 hover:text-primary/90 font-medium',
        className
      )}
    >
      {children}
    </Link>
  );
}

// Variant with arrow icon for CTAs
export function InternalLinkHighlightWithArrow({ 
  children, 
  className, 
  title,
  ...props 
}: InternalLinkHighlightProps) {
  return (
    <Link
      {...props}
      title={title}
      className={cn(
        'inline-flex items-center gap-1 text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary transition-all duration-200 hover:text-primary/90 font-medium group',
        className
      )}
    >
      {children}
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
    </Link>
  );
}