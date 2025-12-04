import { SelectContentBlock } from "@shared/schema";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContentBlockDisplayProps {
  block: SelectContentBlock;
}

export function ContentBlockDisplay({ block }: ContentBlockDisplayProps) {
  const [, navigate] = useLocation();
  
  switch (block.type) {
    case 'text':
      return (
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: block.content || '' }}
          data-testid={`text-content-${block.key}`}
        />
      );
    
    case 'image':
      const imageData = typeof block.data === 'object' ? block.data : {};
      return (
        <div className="relative" data-testid={`image-content-${block.key}`}>
          <img
            src={imageData.src || ''}
            alt={imageData.alt || block.title || ''}
            className={cn(
              "max-w-full h-auto rounded-lg",
              imageData.className
            )}
            style={imageData.style}
            loading="lazy"
            width={800}
            height={450}
          />
          {(imageData.caption || block.title) && (
            <div className="mt-2 text-sm text-muted-foreground text-center">
              {imageData.caption || block.title}
            </div>
          )}
        </div>
      );
    
    case 'video':
      const videoData = typeof block.data === 'object' ? block.data : {};
      return (
        <div className="relative" data-testid={`video-content-${block.key}`}>
          <div className="aspect-video">
            <iframe
              src={videoData.src || ''}
              title={block.title || 'Video'}
              className="w-full h-full rounded-lg"
              allowFullScreen
              loading="lazy"
            />
          </div>
          {(videoData.description || block.title) && (
            <div className="mt-2 text-sm text-muted-foreground">
              {videoData.description || block.title}
            </div>
          )}
        </div>
      );
    
    case 'cta':
      const ctaData = typeof block.data === 'object' ? block.data : {};
      return (
        <div 
          className={cn("text-center", ctaData.alignment === 'left' ? 'text-left' : ctaData.alignment === 'right' ? 'text-right' : 'text-center')} 
          data-testid={`cta-content-${block.key}`}
        >
          {block.title && (
            <h3 className="text-lg font-semibold mb-2">{block.title}</h3>
          )}
          {ctaData.description && (
            <p className="text-muted-foreground mb-4">{ctaData.description}</p>
          )}
          <Button
            size={ctaData.size || 'default'}
            variant={ctaData.variant || 'default'}
            className={ctaData.className}
            onClick={() => {
              if (ctaData.href) {
                if (ctaData.openInNewTab) {
                  window.open(ctaData.href, '_blank', 'noopener,noreferrer');
                } else if (ctaData.href.startsWith('/')) {
                  // Internal navigation using wouter
                  navigate(ctaData.href);
                } else {
                  // External link
                  window.location.href = ctaData.href;
                }
              }
            }}
          >
            {block.content || block.title || 'Button'}
          </Button>
        </div>
      );
    
    case 'section':
      const sectionData = typeof block.data === 'object' ? block.data : {};
      return (
        <div 
          className={cn("space-y-4", sectionData.className)}
          style={sectionData.style}
          data-testid={`section-content-${block.key}`}
        >
          {block.title && (
            <h2 className="text-2xl font-bold">{block.title}</h2>
          )}
          {sectionData.subtitle && (
            <h3 className="text-lg text-muted-foreground">{sectionData.subtitle}</h3>
          )}
          {block.content && (
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          )}
        </div>
      );
    
    default:
      return (
        <div 
          className="p-4 border border-dashed rounded-lg text-center text-muted-foreground"
          data-testid={`unknown-content-${block.key}`}
        >
          Unknown block type: {block.type}
        </div>
      );
  }
}