import { cn } from '@/lib/utils';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  // Sections now always visible - no fade animation
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}
