import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X, MousePointer, ExternalLink, Eye } from "lucide-react";
import { SelectContentBlock } from "@shared/schema";
import { useContentBlockEditor } from "@/contexts/EditModeContext";

interface CTABlockEditorProps {
  block: SelectContentBlock;
  onSave: () => void;
  onCancel: () => void;
}

export function CTABlockEditor({ block, onSave, onCancel }: CTABlockEditorProps) {
  const { updateBlock, pendingChanges } = useContentBlockEditor(block.route, block.key);
  
  // Get existing CTA data
  const existingData = typeof block.data === 'object' ? block.data : {};
  const pendingData = typeof pendingChanges.data === 'object' ? pendingChanges.data : {};
  const ctaData = { ...existingData, ...pendingData };
  
  const [title, setTitle] = useState(pendingChanges.title || block.title || '');
  const [buttonText, setButtonText] = useState(pendingChanges.content || block.content || 'Click Here');
  const [buttonUrl, setButtonUrl] = useState(ctaData.href || '');
  const [description, setDescription] = useState(ctaData.description || '');
  const [buttonVariant, setButtonVariant] = useState(ctaData.variant || 'default');
  const [buttonSize, setButtonSize] = useState(ctaData.size || 'default');
  const [alignment, setAlignment] = useState(ctaData.alignment || 'center');
  const [openInNewTab, setOpenInNewTab] = useState(ctaData.openInNewTab || false);
  const [isVisible, setIsVisible] = useState(
    pendingChanges.isVisible !== undefined ? pendingChanges.isVisible : block.isVisible
  );
  const [category, setCategory] = useState(pendingChanges.category || block.category || 'default');
  const [customCSS, setCustomCSS] = useState(ctaData.customCSS || '');

  const handleSave = () => {
    const changes = {
      title,
      content: buttonText,
      isVisible,
      category,
      data: {
        href: buttonUrl,
        description,
        variant: buttonVariant,
        size: buttonSize,
        alignment,
        openInNewTab,
        customCSS,
        className: getButtonClassName(),
      },
      updatedAt: new Date(),
    };
    
    updateBlock(changes);
    onSave();
  };

  const handleCancel = () => {
    // Reset to original values
    const originalData = typeof block.data === 'object' ? block.data : {};
    setTitle(block.title || '');
    setButtonText(block.content || 'Click Here');
    setButtonUrl(originalData.href || '');
    setDescription(originalData.description || '');
    setButtonVariant(originalData.variant || 'default');
    setButtonSize(originalData.size || 'default');
    setAlignment(originalData.alignment || 'center');
    setOpenInNewTab(originalData.openInNewTab || false);
    setIsVisible(block.isVisible);
    setCategory(block.category || 'default');
    setCustomCSS(originalData.customCSS || '');
    onCancel();
  };

  const getButtonClassName = () => {
    const classes = [];
    
    // Add custom CSS classes if provided
    if (customCSS) {
      classes.push(customCSS);
    }
    
    return classes.join(' ');
  };

  const getContainerClassName = () => {
    switch (alignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
      default:
        return 'text-center';
    }
  };

  // Auto-save drafts
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = {
        href: buttonUrl,
        description,
        variant: buttonVariant,
        size: buttonSize,
        alignment,
        openInNewTab,
        customCSS,
        className: getButtonClassName(),
      };
      
      updateBlock({
        title,
        content: buttonText,
        isVisible,
        category,
        data,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, buttonText, buttonUrl, description, buttonVariant, buttonSize, alignment, openInNewTab, isVisible, category, customCSS, updateBlock]);

  return (
    <Card className="w-full max-w-4xl mx-auto" data-testid={`cta-editor-${block.key}`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <MousePointer className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Edit Call-to-Action Block</h3>
        </div>

        {/* Preview */}
        <div className="border rounded-lg p-6 bg-muted/50">
          <div className={getContainerClassName()}>
            {title && (
              <h3 className="text-lg font-semibold mb-2" data-testid="preview-title">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-muted-foreground mb-4" data-testid="preview-description">
                {description}
              </p>
            )}
            <div className="relative inline-block">
              <Button
                size={buttonSize as any}
                variant={buttonVariant as any}
                className={getButtonClassName()}
                data-testid="preview-button"
              >
                {buttonText}
              </Button>
              {buttonUrl && openInNewTab && (
                <ExternalLink className="h-3 w-3 absolute -top-1 -right-1 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Call-to-action title..."
                data-testid="input-title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="default"
                data-testid="input-category"
              />
            </div>
          </div>

          {/* Button Settings */}
          <div className="space-y-4 border rounded-lg p-4">
            <Label>Button Settings</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="Click Here"
                  data-testid="input-button-text"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buttonUrl">Button URL</Label>
                <Input
                  id="buttonUrl"
                  value={buttonUrl}
                  onChange={(e) => setButtonUrl(e.target.value)}
                  placeholder="https://example.com or /internal-page"
                  data-testid="input-button-url"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description to display above the button..."
                rows={2}
                data-testid="textarea-description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="variant">Button Style</Label>
                <Select value={buttonVariant} onValueChange={setButtonVariant}>
                  <SelectTrigger data-testid="select-variant">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="destructive">Destructive</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Button Size</Label>
                <Select value={buttonSize} onValueChange={setButtonSize}>
                  <SelectTrigger data-testid="select-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alignment">Alignment</Label>
                <Select value={alignment} onValueChange={setAlignment}>
                  <SelectTrigger data-testid="select-alignment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Link Settings */}
            {buttonUrl && (
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="space-y-1">
                  <Label htmlFor="openInNewTab">Open in New Tab</Label>
                  <p className="text-sm text-muted-foreground">
                    Opens the link in a new browser tab
                  </p>
                </div>
                <Switch
                  id="openInNewTab"
                  checked={openInNewTab}
                  onCheckedChange={setOpenInNewTab}
                  data-testid="switch-new-tab"
                />
              </div>
            )}
          </div>

          {/* Advanced Styling */}
          <div className="space-y-4 border rounded-lg p-4">
            <Label>Advanced Styling</Label>
            
            <div className="space-y-2">
              <Label htmlFor="customCSS">Custom CSS Classes</Label>
              <Input
                id="customCSS"
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
                placeholder="custom-class another-class"
                data-testid="input-custom-css"
              />
              <div className="text-xs text-muted-foreground">
                Add custom Tailwind CSS classes for advanced styling
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="visible">Visible on Site</Label>
              <p className="text-sm text-muted-foreground">
                Controls whether this block is shown to visitors
              </p>
            </div>
            <Switch
              id="visible"
              checked={isVisible}
              onCheckedChange={setIsVisible}
              data-testid="switch-visible"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Block Key: <code className="bg-muted px-1 py-0.5 rounded">{block.key}</code>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} data-testid="button-cancel">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!buttonText}
              data-testid="button-save"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}