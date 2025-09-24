import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X, Upload, Image as ImageIcon, ExternalLink } from "lucide-react";
import { SelectContentBlock } from "@shared/schema";
import { useContentBlockEditor } from "@/contexts/EditModeContext";

interface ImageBlockEditorProps {
  block: SelectContentBlock;
  onSave: () => void;
  onCancel: () => void;
}

export function ImageBlockEditor({ block, onSave, onCancel }: ImageBlockEditorProps) {
  const { updateBlock, pendingChanges } = useContentBlockEditor(block.route, block.key);
  
  // Get existing image data
  const existingData = typeof block.data === 'object' ? block.data : {};
  const pendingData = typeof pendingChanges.data === 'object' ? pendingChanges.data : {};
  const imageData = { ...existingData, ...pendingData };
  
  const [title, setTitle] = useState(pendingChanges.title || block.title || '');
  const [imageSrc, setImageSrc] = useState(imageData.src || '');
  const [altText, setAltText] = useState(imageData.alt || '');
  const [caption, setCaption] = useState(imageData.caption || '');
  const [alignment, setAlignment] = useState(imageData.alignment || 'center');
  const [size, setSize] = useState(imageData.size || 'medium');
  const [isVisible, setIsVisible] = useState(
    pendingChanges.isVisible !== undefined ? pendingChanges.isVisible : block.isVisible
  );
  const [category, setCategory] = useState(pendingChanges.category || block.category || 'default');
  const [linkUrl, setLinkUrl] = useState(imageData.linkUrl || '');
  const [openInNewTab, setOpenInNewTab] = useState(imageData.openInNewTab || false);

  const handleSave = () => {
    const changes = {
      title,
      isVisible,
      category,
      data: {
        src: imageSrc,
        alt: altText,
        caption,
        alignment,
        size,
        linkUrl,
        openInNewTab,
        className: getImageClassName(),
        style: getImageStyle(),
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
    setImageSrc(originalData.src || '');
    setAltText(originalData.alt || '');
    setCaption(originalData.caption || '');
    setAlignment(originalData.alignment || 'center');
    setSize(originalData.size || 'medium');
    setIsVisible(block.isVisible);
    setCategory(block.category || 'default');
    setLinkUrl(originalData.linkUrl || '');
    setOpenInNewTab(originalData.openInNewTab || false);
    onCancel();
  };

  const getImageClassName = () => {
    const classes = ['rounded-lg'];
    
    // Size classes
    switch (size) {
      case 'small':
        classes.push('max-w-sm');
        break;
      case 'medium':
        classes.push('max-w-md');
        break;
      case 'large':
        classes.push('max-w-lg');
        break;
      case 'full':
        classes.push('w-full');
        break;
    }
    
    // Alignment classes
    switch (alignment) {
      case 'left':
        classes.push('mr-auto');
        break;
      case 'center':
        classes.push('mx-auto');
        break;
      case 'right':
        classes.push('ml-auto');
        break;
    }
    
    return classes.join(' ');
  };

  const getImageStyle = () => {
    return {
      display: 'block',
    };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'content-blocks');

    try {
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      setImageSrc(result.url);
      
      // Auto-fill alt text from filename if empty
      if (!altText) {
        setAltText(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '));
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  // Auto-save drafts
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = {
        src: imageSrc,
        alt: altText,
        caption,
        alignment,
        size,
        linkUrl,
        openInNewTab,
        className: getImageClassName(),
        style: getImageStyle(),
      };
      
      updateBlock({
        title,
        isVisible,
        category,
        data,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, imageSrc, altText, caption, alignment, size, isVisible, category, linkUrl, openInNewTab, updateBlock]);

  return (
    <Card className="w-full max-w-4xl mx-auto" data-testid={`image-editor-${block.key}`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Edit Image Block</h3>
        </div>

        {/* Image Preview */}
        {imageSrc && (
          <div className="border rounded-lg p-4 bg-muted/50">
            <div className="flex justify-center">
              <div className={`relative ${alignment === 'left' ? 'mr-auto' : alignment === 'right' ? 'ml-auto' : 'mx-auto'}`}>
                {linkUrl ? (
                  <a href={linkUrl} target={openInNewTab ? '_blank' : '_self'} rel={openInNewTab ? 'noopener noreferrer' : undefined}>
                    <img
                      src={imageSrc}
                      alt={altText}
                      className={getImageClassName()}
                      style={getImageStyle()}
                      data-testid="preview-image"
                    />
                  </a>
                ) : (
                  <img
                    src={imageSrc}
                    alt={altText}
                    className={getImageClassName()}
                    style={getImageStyle()}
                    data-testid="preview-image"
                  />
                )}
                {linkUrl && (
                  <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded">
                    <ExternalLink className="h-3 w-3" />
                  </div>
                )}
              </div>
            </div>
            {caption && (
              <div className={`mt-2 text-sm text-muted-foreground ${alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'}`}>
                {caption}
              </div>
            )}
          </div>
        )}

        {/* Image Source */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Image block title..."
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

          <div className="space-y-4 border rounded-lg p-4">
            <Label>Image Source</Label>
            
            {/* File Upload */}
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
                data-testid="button-upload"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <span className="text-sm text-muted-foreground">or enter URL below</span>
            </div>

            {/* Manual URL Input */}
            <div className="space-y-2">
              <Label htmlFor="imageSrc">Image URL</Label>
              <Input
                id="imageSrc"
                value={imageSrc}
                onChange={(e) => setImageSrc(e.target.value)}
                placeholder="https://example.com/image.jpg or /path/to/image.jpg"
                data-testid="input-image-src"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="altText">Alt Text (Required for accessibility)</Label>
              <Input
                id="altText"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Describe the image for screen readers..."
                data-testid="input-alt-text"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Caption (Optional)</Label>
              <Textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Optional caption to display below the image..."
                rows={2}
                data-testid="textarea-caption"
              />
            </div>
          </div>

          {/* Image Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger data-testid="select-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (max-width: 24rem)</SelectItem>
                  <SelectItem value="medium">Medium (max-width: 28rem)</SelectItem>
                  <SelectItem value="large">Large (max-width: 32rem)</SelectItem>
                  <SelectItem value="full">Full Width</SelectItem>
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
          <div className="space-y-4 border rounded-lg p-4">
            <Label>Link Settings (Optional)</Label>
            
            <div className="space-y-2">
              <Label htmlFor="linkUrl">Link URL</Label>
              <Input
                id="linkUrl"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com or /internal-page"
                data-testid="input-link-url"
              />
            </div>

            {linkUrl && (
              <div className="flex items-center justify-between">
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
              disabled={!imageSrc || !altText}
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