import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Save, X, Eye, Code, Type } from "lucide-react";
import { SelectContentBlock } from "@shared/schema";
import { useContentBlockEditor } from "@/contexts/EditModeContext";
import { cn } from "@/lib/utils";

interface TextBlockEditorProps {
  block: SelectContentBlock;
  onSave: () => void;
  onCancel: () => void;
}

export function TextBlockEditor({ block, onSave, onCancel }: TextBlockEditorProps) {
  const { updateBlock, pendingChanges } = useContentBlockEditor(block.route, block.key);
  
  const [title, setTitle] = useState(pendingChanges.title || block.title || '');
  const [content, setContent] = useState(pendingChanges.content || block.content || '');
  const [isVisible, setIsVisible] = useState(
    pendingChanges.isVisible !== undefined ? pendingChanges.isVisible : block.isVisible
  );
  const [category, setCategory] = useState(pendingChanges.category || block.category || 'default');
  const [tags, setTags] = useState(
    pendingChanges.tags ? pendingChanges.tags.join(', ') : (block.tags || []).join(', ')
  );
  const [activeTab, setActiveTab] = useState<'visual' | 'markdown' | 'html'>('visual');
  const [isPreview, setIsPreview] = useState(false);

  const handleSave = () => {
    const changes = {
      title,
      content,
      isVisible,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      updatedAt: new Date(),
    };
    
    updateBlock(changes);
    onSave();
  };

  const handleCancel = () => {
    // Reset to original values
    setTitle(block.title || '');
    setContent(block.content || '');
    setIsVisible(block.isVisible);
    setCategory(block.category || 'default');
    setTags((block.tags || []).join(', '));
    onCancel();
  };

  // Auto-save drafts as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== block.title || content !== block.content) {
        updateBlock({
          title,
          content,
          isVisible,
          category,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, content, isVisible, category, tags, block, updateBlock]);

  const renderContentEditor = () => {
    switch (activeTab) {
      case 'visual':
        return (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 min-h-[200px] focus-within:ring-2 focus-within:ring-ring">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your content here... You can use **bold**, *italic*, and [links](url)"
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
              placeholder="# Your Markdown Content

**Bold text** and *italic text*

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
  <h2>Your HTML Content</h2>
  <p>Rich HTML content with <strong>formatting</strong></p>
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

  return (
    <Card className="w-full max-w-4xl mx-auto" data-testid={`text-editor-${block.key}`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Edit Text Block</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
              data-testid="button-toggle-preview"
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>

        {isPreview ? (
          /* Preview Mode */
          <div className="space-y-4">
            {title && (
              <h2 className="text-2xl font-bold" data-testid="preview-title">
                {title}
              </h2>
            )}
            <div 
              className="prose dark:prose-invert max-w-none border rounded-lg p-4 min-h-[200px]"
              dangerouslySetInnerHTML={{ __html: content }}
              data-testid="preview-content"
            />
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-4">
            {/* Basic Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Block title..."
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

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tag1, tag2, tag3"
                data-testid="input-tags"
              />
            </div>

            {/* Content Editor Tabs */}
            <div className="space-y-4">
              <Label>Content</Label>
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

            {/* Settings */}
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
        )}

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
            <Button onClick={handleSave} data-testid="button-save">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}