import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ContentBlock, SelectContentBlock } from "@shared/schema";
import { useEditMode, useContentBlockEditor } from "@/contexts/EditModeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff, 
  GripVertical,
  Plus,
  Save,
  X
} from "lucide-react";
import { TextBlockEditor } from "./TextBlockEditor";
import { ImageBlockEditor } from "./ImageBlockEditor";
import { VideoBlockEditor } from "./VideoBlockEditor";
import { CTABlockEditor } from "./CTABlockEditor";
import { SectionBlockEditor } from "./SectionBlockEditor";
import { cn } from "@/lib/utils";

interface ContentBlockRendererProps {
  route: string;
  category?: string;
  className?: string;
  showAddButtons?: boolean;
}

export function ContentBlockRenderer({ 
  route, 
  category, 
  className,
  showAddButtons = false 
}: ContentBlockRendererProps) {
  const { isEditMode } = useEditMode();
  const [editingBlock, setEditingBlock] = useState<string | null>(null);

  const { data: blocksData, isLoading } = useQuery({
    queryKey: ['/api/content-blocks', { route, category }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('route', route);
      if (category) params.set('category', category);
      
      const response = await fetch(`/api/content-blocks?${params}`);
      if (!response.ok) throw new Error('Failed to fetch content blocks');
      return response.json();
    },
  });

  const blocks: SelectContentBlock[] = blocksData?.blocks || [];

  if (isLoading) {
    return (
      <div className="space-y-4" data-testid="content-blocks-loading">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (!blocks.length && !isEditMode) {
    return null;
  }

  const visibleBlocks = isEditMode 
    ? blocks 
    : blocks.filter(block => block.isVisible && block.status === 'published');

  const sortedBlocks = visibleBlocks.sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div 
      className={cn("space-y-4", className)}
      data-testid={`content-blocks-${route}`}
    >
      {sortedBlocks.map((block) => (
        <ContentBlockWrapper
          key={block.id}
          block={block}
          route={route}
          isEditing={editingBlock === block.id}
          onEdit={() => setEditingBlock(block.id)}
          onStopEditing={() => setEditingBlock(null)}
        />
      ))}
      
      {isEditMode && showAddButtons && (
        <AddBlockButtons route={route} category={category} />
      )}
    </div>
  );
}

interface ContentBlockWrapperProps {
  block: SelectContentBlock;
  route: string;
  isEditing: boolean;
  onEdit: () => void;
  onStopEditing: () => void;
}

function ContentBlockWrapper({ 
  block, 
  route, 
  isEditing, 
  onEdit, 
  onStopEditing 
}: ContentBlockWrapperProps) {
  const { isEditMode } = useEditMode();
  const { updateBlock, hasUnsavedChanges } = useContentBlockEditor(route, block.key);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this content block?')) return;
    
    try {
      const response = await fetch(
        `/api/content-blocks/${encodeURIComponent(route)}/${encodeURIComponent(block.key)}`,
        { method: 'DELETE' }
      );
      
      if (!response.ok) throw new Error('Failed to delete block');
      
      // Refresh the page to show updated blocks
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete block:', error);
    }
  };

  const handleDuplicate = async () => {
    const newKey = `${block.key}_copy_${Date.now()}`;
    
    try {
      const response = await fetch(
        `/api/content-blocks/${encodeURIComponent(route)}/${encodeURIComponent(block.key)}/duplicate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newKey }),
        }
      );
      
      if (!response.ok) throw new Error('Failed to duplicate block');
      
      window.location.reload();
    } catch (error) {
      console.error('Failed to duplicate block:', error);
    }
  };

  const handleToggleVisibility = async () => {
    updateBlock({ isVisible: !block.isVisible });
  };

  if (isEditing) {
    return (
      <div className="relative">
        <ContentBlockEditor
          block={block}
          onSave={onStopEditing}
          onCancel={onStopEditing}
        />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "relative group",
        isEditMode && "ring-2 ring-dashed ring-primary/30 hover:ring-primary/60 rounded-lg p-2",
        hasUnsavedChanges && "ring-yellow-400 bg-yellow-50 dark:bg-yellow-950/20"
      )}
      data-testid={`content-block-${block.key}`}
    >
      {/* Edit Mode Controls */}
      {isEditMode && (
        <div className="absolute -top-2 -right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge variant="outline" className="text-xs">
            {block.type}
          </Badge>
          <Button
            size="sm"
            variant="secondary"
            onClick={onEdit}
            data-testid={`button-edit-${block.key}`}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleToggleVisibility}
            data-testid={`button-visibility-${block.key}`}
          >
            {block.isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleDuplicate}
            data-testid={`button-duplicate-${block.key}`}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            data-testid={`button-delete-${block.key}`}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Drag Handle */}
      {isEditMode && (
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
        </div>
      )}

      {/* Block Content */}
      <div className={cn(!block.isVisible && isEditMode && "opacity-50")}>
        <ContentBlockDisplay block={block} />
      </div>

      {/* Status Indicators */}
      {isEditMode && (
        <div className="absolute -bottom-2 -left-2 flex gap-1">
          {hasUnsavedChanges && (
            <Badge variant="secondary" className="text-xs">
              Modified
            </Badge>
          )}
          {block.status !== 'published' && (
            <Badge variant="outline" className="text-xs">
              {block.status}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

interface ContentBlockDisplayProps {
  block: SelectContentBlock;
}

function ContentBlockDisplay({ block }: ContentBlockDisplayProps) {
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
          />
          {block.title && (
            <div className="mt-2 text-sm text-muted-foreground text-center">
              {block.title}
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
          {block.title && (
            <div className="mt-2 text-sm text-muted-foreground">
              {block.title}
            </div>
          )}
        </div>
      );
    
    case 'cta':
      const ctaData = typeof block.data === 'object' ? block.data : {};
      return (
        <div className="text-center" data-testid={`cta-content-${block.key}`}>
          <Button
            size={ctaData.size || 'default'}
            variant={ctaData.variant || 'default'}
            className={ctaData.className}
            onClick={() => {
              if (ctaData.href) {
                window.location.href = ctaData.href;
              }
            }}
          >
            {block.content || block.title || 'Button'}
          </Button>
        </div>
      );
    
    case 'section':
      return (
        <div 
          className={cn("space-y-4", block.data?.className)}
          data-testid={`section-content-${block.key}`}
        >
          {block.title && (
            <h2 className="text-2xl font-bold">{block.title}</h2>
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

interface ContentBlockEditorProps {
  block: SelectContentBlock;
  onSave: () => void;
  onCancel: () => void;
}

function ContentBlockEditor({ block, onSave, onCancel }: ContentBlockEditorProps) {
  switch (block.type) {
    case 'text':
      return <TextBlockEditor block={block} onSave={onSave} onCancel={onCancel} />;
    case 'image':
      return <ImageBlockEditor block={block} onSave={onSave} onCancel={onCancel} />;
    case 'video':
      return <VideoBlockEditor block={block} onSave={onSave} onCancel={onCancel} />;
    case 'cta':
      return <CTABlockEditor block={block} onSave={onSave} onCancel={onCancel} />;
    case 'section':
      return <SectionBlockEditor block={block} onSave={onSave} onCancel={onCancel} />;
    default:
      return (
        <Card className="p-4">
          <div className="text-center text-muted-foreground mb-4">
            No editor available for block type: {block.type}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Card>
      );
  }
}

interface AddBlockButtonsProps {
  route: string;
  category?: string;
}

function AddBlockButtons({ route, category }: AddBlockButtonsProps) {
  const blockTypes = [
    { type: 'text', label: 'Text', icon: '📝' },
    { type: 'image', label: 'Image', icon: '🖼️' },
    { type: 'video', label: 'Video', icon: '🎥' },
    { type: 'cta', label: 'Button', icon: '🔘' },
    { type: 'section', label: 'Section', icon: '📄' },
  ];

  const handleAddBlock = async (type: string) => {
    const key = `${type}_${Date.now()}`;
    
    try {
      const response = await fetch('/api/content-blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          route,
          key,
          type,
          category: category || 'default',
          title: `New ${type} block`,
          content: type === 'text' ? 'Click to edit this text block...' : '',
          isVisible: true,
          status: 'draft',
        }),
      });
      
      if (!response.ok) throw new Error('Failed to create block');
      
      window.location.reload();
    } catch (error) {
      console.error('Failed to create block:', error);
    }
  };

  return (
    <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
      <div className="mb-4">
        <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Add a new content block</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {blockTypes.map((blockType) => (
          <Button
            key={blockType.type}
            variant="outline"
            size="sm"
            onClick={() => handleAddBlock(blockType.type)}
            data-testid={`button-add-${blockType.type}`}
          >
            <span className="mr-2">{blockType.icon}</span>
            {blockType.label}
          </Button>
        ))}
      </div>
    </div>
  );
}