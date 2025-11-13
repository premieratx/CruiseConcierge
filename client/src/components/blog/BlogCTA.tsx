import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCTAProps {
  variant?: 'primary' | 'secondary';
  text?: string;
  href?: string;
  className?: string;
  external?: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function BlogCTA({
  variant = 'primary',
  text,
  href,
  className,
  external,
}: BlogCTAProps) {
  const isPrimary = variant === 'primary';
  
  const defaultText = isPrimary ? 'Book Your Party Cruise' : 'Get Free Quote';
  const defaultHref = isPrimary ? 'https://premierpartycruises.xola.com/checkout' : '/contact';
  const defaultExternal = isPrimary;

  const finalText = text || defaultText;
  const finalHref = href || defaultHref;
  const finalExternal = external ?? defaultExternal;

  const icon = isPrimary ? <Calendar className="h-5 w-5 mr-2" /> : <MessageSquare className="h-5 w-5 mr-2" />;

  const buttonClasses = cn(
    "text-lg font-bold shadow-lg transition-all hover:scale-105",
    isPrimary
      ? "bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue/90 hover:to-purple-600/90 text-white"
      : "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
    className
  );

  const textSlug = slugify(finalText);
  const dataTestId = `blog-cta-${variant}-${textSlug}`;

  if (finalExternal) {
    return (
      <a
        href={finalHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button
          size="lg"
          className={buttonClasses}
          data-testid={dataTestId}
        >
          {icon}
          {finalText}
        </Button>
      </a>
    );
  }

  return (
    <Link href={finalHref}>
      <Button
        size="lg"
        className={buttonClasses}
        data-testid={dataTestId}
      >
        {icon}
        {finalText}
      </Button>
    </Link>
  );
}
