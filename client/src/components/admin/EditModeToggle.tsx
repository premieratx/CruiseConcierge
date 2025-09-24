import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Edit3, 
  Eye, 
  Save, 
  RotateCcw, 
  Settings,
  AlertTriangle,
  CheckCircle 
} from "lucide-react";
import { useEditMode } from "@/contexts/EditModeContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function EditModeToggle() {
  const { 
    isEditMode, 
    toggleEditMode, 
    isDirty, 
    saveChanges, 
    discardChanges,
    unsavedChanges 
  } = useEditMode();
  const { toast } = useToast();
  
  const [isSaving, setIsSaving] = useState(false);
  const [isDiscarding, setIsDiscarding] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveChanges();
      toast({
        title: "Changes Saved",
        description: "All content blocks have been saved successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    setIsDiscarding(true);
    try {
      discardChanges();
      toast({
        title: "Changes Discarded",
        description: "All unsaved changes have been discarded.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Discard Failed",
        description: "Failed to discard changes. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setIsDiscarding(false);
    }
  };

  const unsavedCount = Object.keys(unsavedChanges).length;

  return (
    <Card 
      className={cn(
        "fixed top-4 right-4 z-50 p-4 shadow-lg transition-all duration-300",
        isEditMode ? "bg-primary/5 border-primary" : "bg-background"
      )}
      data-testid="edit-mode-toggle"
    >
      <div className="space-y-4 min-w-[280px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="font-medium">Content Editing</span>
          </div>
          <Badge 
            variant={isEditMode ? "default" : "secondary"}
            className={cn(
              "transition-colors",
              isEditMode && "bg-primary text-primary-foreground"
            )}
          >
            {isEditMode ? "Edit Mode" : "View Mode"}
          </Badge>
        </div>

        <Separator />

        {/* Edit Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="edit-mode" className="text-sm font-medium">
              Edit Mode
            </Label>
            <p className="text-xs text-muted-foreground">
              Toggle content block editing
            </p>
          </div>
          <Switch
            id="edit-mode"
            checked={isEditMode}
            onCheckedChange={toggleEditMode}
            data-testid="switch-edit-mode"
          />
        </div>

        {/* Status Indicators */}
        {isEditMode && (
          <>
            <Separator />
            
            <div className="space-y-3">
              {/* Unsaved Changes Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isDirty ? (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <span className="text-sm">
                    {isDirty ? "Unsaved Changes" : "All Changes Saved"}
                  </span>
                </div>
                {isDirty && (
                  <Badge variant="outline" className="text-xs">
                    {unsavedCount} block{unsavedCount !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              {isDirty && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1"
                    data-testid="button-save-all"
                  >
                    <Save className="h-3 w-3 mr-2" />
                    {isSaving ? "Saving..." : "Save All"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDiscard}
                    disabled={isDiscarding}
                    className="flex-1"
                    data-testid="button-discard-all"
                  >
                    <RotateCcw className="h-3 w-3 mr-2" />
                    {isDiscarding ? "Discarding..." : "Discard"}
                  </Button>
                </div>
              )}

              {/* Quick Actions */}
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-1">
                  <Edit3 className="h-3 w-3" />
                  Click on content blocks to edit them
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  Use the eye icon to show/hide blocks
                </div>
              </div>
            </div>
          </>
        )}

        {/* View Mode Info */}
        {!isEditMode && (
          <>
            <Separator />
            <div className="text-xs text-muted-foreground">
              Enable edit mode to modify content blocks, reorder them, or add new ones.
            </div>
          </>
        )}
      </div>
    </Card>
  );
}