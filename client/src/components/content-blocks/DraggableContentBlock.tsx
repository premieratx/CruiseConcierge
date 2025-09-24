import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SelectContentBlock } from "@shared/schema";
import { useEditMode } from "@/contexts/EditModeContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff, 
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ContentBlockDisplay } from "./ContentBlockDisplay";
import { ContentBlockEditor } from "./ContentBlockEditor";

interface DraggableContentBlockProps {
  block: SelectContentBlock;
  route: string;
  onEdit?: () => void;
  onDelete?: (blockId: string) => void;
  onDuplicate?: (blockId: string) => void;
  onToggleVisibility?: (blockId: string) => void;
}

export function DraggableContentBlock({ 
  block, 
  route, 
  onEdit,
  onDelete, 
  onDuplicate,
  onToggleVisibility 
}: DraggableContentBlockProps) {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = () => {
    setIsEditing(true);
    onEdit?.();
  };

  const handleStopEditing = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this content block?')) return;
    
    try {
      const response = await fetch(
        `/api/content-blocks/${encodeURIComponent(route)}/${encodeURIComponent(block.key)}`,
        { method: 'DELETE' }
      );
      
      if (!response.ok) throw new Error('Failed to delete block');
      
      onDelete?.(block.id);
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
      
      const newBlock = await response.json();
      onDuplicate?.(newBlock.id);
    } catch (error) {
      console.error('Failed to duplicate block:', error);
    }
  };

  const handleToggleVisibility = () => {
    onToggleVisibility?.(block.id);
  };

  if (isEditing) {
    return (
      <div 
        ref={setNodeRef}
        style={style}
        className="relative z-10"
      >
        <ContentBlockEditor
          block={block}
          onSave={handleStopEditing}
          onCancel={handleStopEditing}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "relative group transition-all duration-200",
        isEditMode && "ring-2 ring-dashed ring-primary/30 hover:ring-primary/60 rounded-lg p-2",
        isDragging && "opacity-50 z-50",
        !block.isVisible && isEditMode && "opacity-50"
      )}
      data-testid={`draggable-block-${block.key}`}
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
            onClick={handleEdit}
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
        <div 
          {...listeners}
          className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {/* Block Content */}
      <div className={cn(!block.isVisible && isEditMode && "opacity-50")}>
        <ContentBlockDisplay block={block} />
      </div>

      {/* Status Indicators */}
      {isEditMode && (
        <div className="absolute -bottom-2 -left-2 flex gap-1">
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