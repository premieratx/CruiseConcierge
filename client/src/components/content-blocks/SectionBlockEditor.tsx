import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, X, Layout, Type, Code } from "lucide-react";
import { SelectContentBlock } from "@shared/schema";
import { useContentBlockEditor } from "@/contexts/EditModeContext";

interface SectionBlockEditorProps {
  block: SelectContentBlock;
  onSave: () => void;
  onCancel: () => void;
}

export function SectionBlockEditor({ block, onSave, onCancel }: SectionBlockEditorProps) {
  const { updateBlock, pendingChanges } = useContentBlockEditor(block.route, block.key);
  
  // Get existing section data
  const existingData = typeof block.data === 'object' ? block.data : {};
  const pendingData = typeof pendingChanges.data === 'object' ? pendingChanges.data : {};
  const sectionData = { ...existingData, ...pendingData };
  
  const [title, setTitle] = useState(pendingChanges.title || block.title || '');
  const [content, setContent] = useState(pendingChanges.content || block.content || '');
  const [subtitle, setSubtitle] = useState(sectionData.subtitle || '');
  const [backgroundType, setBackgroundType] = useState(sectionData.backgroundType || 'none');
  const [backgroundColor, setBackgroundColor] = useState(sectionData.backgroundColor || '');
  const [backgroundImage, setBackgroundImage] = useState(sectionData.backgroundImage || '');
  const [padding, setPadding] = useState(sectionData.padding || 'default');
  const [textAlignment, setTextAlignment] = useState(sectionData.textAlignment || 'left');
  const [containerWidth, setContainerWidth] = useState(sectionData.containerWidth || 'container');
  const [isVisible, setIsVisible] = useState(
    pendingChanges.isVisible !== undefined ? pendingChanges.isVisible : block.isVisible
  );
  const [category, setCategory] = useState(pendingChanges.category || block.category || 'default');
  const [customCSS, setCustomCSS] = useState(sectionData.customCSS || '');
  const [activeTab, setActiveTab] = useState<'visual' | 'markdown' | 'html'>('visual');

  const handleSave = () => {
    const changes = {
      title,
      content,
      isVisible,
      category,
      data: {
        subtitle,
        backgroundType,
        backgroundColor,
        backgroundImage,
        padding,
        textAlignment,
        containerWidth,
        customCSS,
        className: getSectionClassName(),
        style: getSectionStyle(),
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
    setContent(block.content || '');
    setSubtitle(originalData.subtitle || '');
    setBackgroundType(originalData.backgroundType || 'none');
    setBackgroundColor(originalData.backgroundColor || '');
    setBackgroundImage(originalData.backgroundImage || '');
    setPadding(originalData.padding || 'default');
    setTextAlignment(originalData.textAlignment || 'left');
    setContainerWidth(originalData.containerWidth || 'container');
    setIsVisible(block.isVisible);
    setCategory(block.category || 'default');
    setCustomCSS(originalData.customCSS || '');
    onCancel();
  };

  const getSectionClassName = () => {
    const classes = ['section-block'];
    
    // Padding classes
    switch (padding) {
      case 'none':
        break;
      case 'small':
        classes.push('py-4');
        break;
      case 'default':
        classes.push('py-8');
        break;
      case 'large':
        classes.push('py-16');
        break;
      case 'extra-large':
        classes.push('py-24');
        break;
    }
    
    // Container width classes
    switch (containerWidth) {
      case 'full':
        classes.push('w-full');
        break;
      case 'container':
        classes.push('container mx-auto px-4');
        break;
      case 'narrow':
        classes.push('max-w-4xl mx-auto px-4');
        break;
      case 'wide':
        classes.push('max-w-7xl mx-auto px-4');
        break;
    }
    
    // Text alignment
    switch (textAlignment) {
      case 'left':
        classes.push('text-left');
        break;
      case 'center':
        classes.push('text-center');
        break;
      case 'right':
        classes.push('text-right');
        break;
    }
    
    // Custom CSS
    if (customCSS) {
      classes.push(customCSS);
    }
    
    return classes.join(' ');
  };

  const getSectionStyle = () => {
    const style: any = {};
    
    // Background handling
    if (backgroundType === 'color' && backgroundColor) {
      style.backgroundColor = backgroundColor;
    } else if (backgroundType === 'image' && backgroundImage) {
      style.backgroundImage = `url(${backgroundImage})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
      style.backgroundRepeat = 'no-repeat';
    }
    
    return style;
  };

  const renderContentEditor = () => {
    switch (activeTab) {
      case 'visual':
        return (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 min-h-[200px] focus-within:ring-2 focus-within:ring-ring">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your section content here... You can use **bold**, *italic*, and [links](url)"
                className="min-h-[150px] border-none focus:ring-0 resize-none"
                data-testid="textarea-content-visual"
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Supports Markdown: **bold**, *italic*, [link](url), # headings
            </div>
          </div>
        );
      
      case 'markdown':
        return (
          <div className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="# Section Heading

Your section content with **bold** and *italic* text.

- List item 1
- List item 2

[Link text](https://example.com)"
              className="min-h-[300px] font-mono text-sm"
              data-testid="textarea-content-markdown"
            />
            <div className="text-xs text-muted-foreground">
              Full Markdown syntax supported
            </div>
          </div>
        );
      
      case 'html':
        return (
          <div className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="<div>
  <p>Your HTML content with <strong>formatting</strong></p>
  <ul>
    <li>List item</li>
  </ul>
</div>"
              className="min-h-[300px] font-mono text-sm"
              data-testid="textarea-content-html"
            />
            <div className="text-xs text-muted-foreground">
              HTML will be sanitized for security
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Auto-save drafts
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = {
        subtitle,
        backgroundType,
        backgroundColor,
        backgroundImage,
        padding,
        textAlignment,
        containerWidth,
        customCSS,
        className: getSectionClassName(),
        style: getSectionStyle(),
      };
      
      updateBlock({
        title,
        content,
        isVisible,
        category,
        data,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, content, subtitle, backgroundType, backgroundColor, backgroundImage, padding, textAlignment, containerWidth, isVisible, category, customCSS, updateBlock]);

  return (
    <Card className="w-full max-w-4xl mx-auto" data-testid={`section-editor-${block.key}`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Layout className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Edit Section Block</h3>
        </div>

        {/* Preview */}
        <div className="border rounded-lg p-4 bg-muted/50 overflow-hidden">
          <div 
            className={getSectionClassName()}
            style={getSectionStyle()}
            data-testid="preview-section"
          >
            {title && (
              <h2 className="text-2xl font-bold mb-2" data-testid="preview-title">
                {title}
              </h2>
            )}
            {subtitle && (
              <h3 className="text-lg text-muted-foreground mb-4" data-testid="preview-subtitle">
                {subtitle}
              </h3>
            )}
            {content && (
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
                data-testid="preview-content"
              />
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Section title..."
                data-testid="input-title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle (Optional)</Label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Optional subtitle..."
                data-testid="input-subtitle"
              />
            </div>
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

          {/* Content Editor */}
          <div className="space-y-4">
            <Label>Section Content</Label>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="visual" data-testid="tab-visual">
                  <Type className="h-4 w-4 mr-2" />
                  Visual
                </TabsTrigger>
                <TabsTrigger value="markdown" data-testid="tab-markdown">
                  Markdown
                </TabsTrigger>
                <TabsTrigger value="html" data-testid="tab-html">
                  <Code className="h-4 w-4 mr-2" />
                  HTML
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="visual" className="mt-4">
                {renderContentEditor()}
              </TabsContent>
              
              <TabsContent value="markdown" className="mt-4">
                {renderContentEditor()}
              </TabsContent>
              
              <TabsContent value="html" className="mt-4">
                {renderContentEditor()}
              </TabsContent>
            </Tabs>
          </div>

          {/* Layout Settings */}
          <div className="space-y-4 border rounded-lg p-4">
            <Label>Layout Settings</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="containerWidth">Container Width</Label>
                <Select value={containerWidth} onValueChange={setContainerWidth}>
                  <SelectTrigger data-testid="select-container-width">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Width</SelectItem>
                    <SelectItem value="container">Container</SelectItem>
                    <SelectItem value="narrow">Narrow</SelectItem>
                    <SelectItem value="wide">Wide</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="padding">Padding</Label>
                <Select value={padding} onValueChange={setPadding}>
                  <SelectTrigger data-testid="select-padding">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="extra-large">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="textAlignment">Text Alignment</Label>
                <Select value={textAlignment} onValueChange={setTextAlignment}>
                  <SelectTrigger data-testid="select-text-alignment">
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
          </div>

          {/* Background Settings */}
          <div className="space-y-4 border rounded-lg p-4">
            <Label>Background Settings</Label>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backgroundType">Background Type</Label>
                <Select value={backgroundType} onValueChange={setBackgroundType}>
                  <SelectTrigger data-testid="select-background-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="color">Solid Color</SelectItem>
                    <SelectItem value="image">Background Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {backgroundType === 'color' && (
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16"
                      data-testid="input-background-color"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#ffffff or rgb(255,255,255)"
                      data-testid="input-background-color-text"
                    />
                  </div>
                </div>
              )}

              {backgroundType === 'image' && (
                <div className="space-y-2">
                  <Label htmlFor="backgroundImage">Background Image URL</Label>
                  <Input
                    id="backgroundImage"
                    value={backgroundImage}
                    onChange={(e) => setBackgroundImage(e.target.value)}
                    placeholder="https://example.com/background.jpg"
                    data-testid="input-background-image"
                  />
                </div>
              )}
            </div>
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