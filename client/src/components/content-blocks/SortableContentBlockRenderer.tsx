import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { SelectContentBlock } from "@shared/schema";
import { useEditMode } from "@/contexts/EditModeContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { DraggableContentBlock } from "./DraggableContentBlock";

interface SortableContentBlockRendererProps {
  route: string;
  category?: string;
  className?: string;
  showAddButtons?: boolean;
}

export function SortableContentBlockRenderer({ 
  route, 
  category, 
  className,
  showAddButtons = false 
}: SortableContentBlockRendererProps) {
  const { isEditMode } = useEditMode();
  const queryClient = useQueryClient();
  const [isReordering, setIsReordering] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const visibleBlocks = isEditMode 
    ? blocks 
    : blocks.filter(block => block.isVisible && block.status === 'published');

  const sortedBlocks = visibleBlocks.sort((a, b) => a.displayOrder - b.displayOrder);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = sortedBlocks.findIndex(block => block.id === active.id);
    const newIndex = sortedBlocks.findIndex(block => block.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newBlocks = arrayMove(sortedBlocks, oldIndex, newIndex);
    const blockIds = newBlocks.map(block => block.id);

    setIsReordering(true);
    
    try {
      const response = await fetch(
        `/api/content-blocks/page/${encodeURIComponent(route)}/reorder`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ blockIds }),
        }
      );

      if (!response.ok) throw new Error('Failed to reorder blocks');

      // Refresh the data
      queryClient.invalidateQueries({ 
        queryKey: ['/api/content-blocks', { route, category }] 
      });
    } catch (error) {
      console.error('Failed to reorder blocks:', error);
    } finally {
      setIsReordering(false);
    }
  }, [sortedBlocks, route, category, queryClient]);

  const handleBlockUpdate = useCallback((blockId: string) => {
    // Refresh the blocks data
    queryClient.invalidateQueries({ 
      queryKey: ['/api/content-blocks', { route, category }] 
    });
  }, [route, category, queryClient]);

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
      
      // Refresh the data instead of reloading the page
      queryClient.invalidateQueries({ 
        queryKey: ['/api/content-blocks', { route, category }] 
      });
    } catch (error) {
      console.error('Failed to create block:', error);
    }
  };

  return (
    <div 
      className={cn("space-y-4", className, isReordering && "pointer-events-none")}
      data-testid={`sortable-content-blocks-${route}`}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      >
        <SortableContext 
          items={sortedBlocks.map(block => block.id)} 
          strategy={verticalListSortingStrategy}
        >
          {sortedBlocks.map((block) => (
            <DraggableContentBlock
              key={block.id}
              block={block}
              route={route}
              onDelete={handleBlockUpdate}
              onDuplicate={handleBlockUpdate}
              onToggleVisibility={handleBlockUpdate}
            />
          ))}
        </SortableContext>
      </DndContext>
      
      {isEditMode && showAddButtons && (
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
      )}
    </div>
  );
}