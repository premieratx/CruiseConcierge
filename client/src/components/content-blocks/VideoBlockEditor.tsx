import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X, Video, ExternalLink } from "lucide-react";
import { SelectContentBlock } from "@shared/schema";
import { useContentBlockEditor } from "@/contexts/EditModeContext";

interface VideoBlockEditorProps {
  block: SelectContentBlock;
  onSave: () => void;
  onCancel: () => void;
}

export function VideoBlockEditor({ block, onSave, onCancel }: VideoBlockEditorProps) {
  const { updateBlock, pendingChanges } = useContentBlockEditor(block.route, block.key);
  
  // Get existing video data
  const existingData = typeof block.data === 'object' ? block.data : {};
  const pendingData = typeof pendingChanges.data === 'object' ? pendingChanges.data : {};
  const videoData = { ...existingData, ...pendingData };
  
  const [title, setTitle] = useState(pendingChanges.title || block.title || '');
  const [videoUrl, setVideoUrl] = useState(videoData.src || '');
  const [description, setDescription] = useState(videoData.description || '');
  const [aspectRatio, setAspectRatio] = useState(videoData.aspectRatio || '16:9');
  const [autoplay, setAutoplay] = useState(videoData.autoplay || false);
  const [muted, setMuted] = useState(videoData.muted || false);
  const [controls, setControls] = useState(videoData.controls !== false); // Default to true
  const [loop, setLoop] = useState(videoData.loop || false);
  const [isVisible, setIsVisible] = useState(
    pendingChanges.isVisible !== undefined ? pendingChanges.isVisible : block.isVisible
  );
  const [category, setCategory] = useState(pendingChanges.category || block.category || 'default');

  const handleSave = () => {
    const embedUrl = getEmbedUrl(videoUrl);
    
    const changes = {
      title,
      isVisible,
      category,
      data: {
        src: embedUrl || videoUrl,
        originalUrl: videoUrl,
        description,
        aspectRatio,
        autoplay,
        muted,
        controls,
        loop,
        className: getVideoClassName(),
        style: getVideoStyle(),
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
    setVideoUrl(originalData.originalUrl || originalData.src || '');
    setDescription(originalData.description || '');
    setAspectRatio(originalData.aspectRatio || '16:9');
    setAutoplay(originalData.autoplay || false);
    setMuted(originalData.muted || false);
    setControls(originalData.controls !== false);
    setLoop(originalData.loop || false);
    setIsVisible(block.isVisible);
    setCategory(block.category || 'default');
    onCancel();
  };

  const getEmbedUrl = (url: string): string | null => {
    if (!url) return null;

    // YouTube URL patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      
      const params = new URLSearchParams();
      if (autoplay) params.set('autoplay', '1');
      if (muted) params.set('mute', '1');
      if (!controls) params.set('controls', '0');
      if (loop) {
        params.set('loop', '1');
        params.set('playlist', videoId);
      }
      
      const paramString = params.toString();
      if (paramString) {
        embedUrl += `?${paramString}`;
      }
      
      return embedUrl;
    }

    // Vimeo URL patterns
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
    const vimeoMatch = url.match(vimeoRegex);
    
    if (vimeoMatch) {
      const videoId = vimeoMatch[1];
      let embedUrl = `https://player.vimeo.com/video/${videoId}`;
      
      const params = new URLSearchParams();
      if (autoplay) params.set('autoplay', '1');
      if (muted) params.set('muted', '1');
      if (loop) params.set('loop', '1');
      
      const paramString = params.toString();
      if (paramString) {
        embedUrl += `?${paramString}`;
      }
      
      return embedUrl;
    }

    // Direct video file or other embed URLs
    if (url.includes('embed') || url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
      return url;
    }

    return null;
  };

  const getVideoClassName = () => {
    return 'w-full h-full rounded-lg';
  };

  const getVideoStyle = () => {
    return {
      aspectRatio: aspectRatio.replace(':', '/'),
    };
  };

  const detectVideoType = (url: string): string => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'YouTube';
    }
    if (url.includes('vimeo.com')) {
      return 'Vimeo';
    }
    if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
      return 'Direct Video';
    }
    if (url.includes('embed')) {
      return 'Embed';
    }
    return 'Unknown';
  };

  // Auto-save drafts
  useEffect(() => {
    const timer = setTimeout(() => {
      const embedUrl = getEmbedUrl(videoUrl);
      const data = {
        src: embedUrl || videoUrl,
        originalUrl: videoUrl,
        description,
        aspectRatio,
        autoplay,
        muted,
        controls,
        loop,
        className: getVideoClassName(),
        style: getVideoStyle(),
      };
      
      updateBlock({
        title,
        isVisible,
        category,
        data,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, videoUrl, description, aspectRatio, autoplay, muted, controls, loop, isVisible, category, updateBlock]);

  const embedUrl = getEmbedUrl(videoUrl);
  const videoType = detectVideoType(videoUrl);

  return (
    <Card className="w-full max-w-4xl mx-auto" data-testid={`video-editor-${block.key}`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Edit Video Block</h3>
        </div>

        {/* Video Preview */}
        {embedUrl && (
          <div className="border rounded-lg p-4 bg-muted/50">
            <div 
              className="relative mx-auto max-w-2xl"
              style={{ aspectRatio: aspectRatio.replace(':', '/') }}
            >
              <iframe
                src={embedUrl}
                title={title || 'Video'}
                className="w-full h-full rounded-lg"
                allowFullScreen
                loading="lazy"
                data-testid="preview-video"
              />
            </div>
            {description && (
              <div className="mt-2 text-sm text-muted-foreground text-center">
                {description}
              </div>
            )}
            <div className="mt-2 text-xs text-muted-foreground text-center">
              Video Type: {videoType}
            </div>
          </div>
        )}

        {/* Basic Settings */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Video block title..."
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

          {/* Video URL */}
          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or https://vimeo.com/... or direct video file URL"
              data-testid="input-video-url"
            />
            <div className="text-xs text-muted-foreground">
              Supports YouTube, Vimeo, and direct video file links (.mp4, .webm, .ogg)
            </div>
            {videoUrl && !embedUrl && (
              <div className="text-xs text-destructive">
                ⚠️ Unable to generate embed URL. Please check the video URL format.
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description to display below the video..."
              rows={2}
              data-testid="textarea-description"
            />
          </div>

          {/* Video Settings */}
          <div className="space-y-4 border rounded-lg p-4">
            <Label>Video Settings</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="aspectRatio">Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger data-testid="select-aspect-ratio">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                    <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                    <SelectItem value="1:1">1:1 (Square)</SelectItem>
                    <SelectItem value="21:9">21:9 (Ultrawide)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Player Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="autoplay">Autoplay</Label>
                  <p className="text-xs text-muted-foreground">
                    Start playing automatically
                  </p>
                </div>
                <Switch
                  id="autoplay"
                  checked={autoplay}
                  onCheckedChange={setAutoplay}
                  data-testid="switch-autoplay"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="muted">Muted</Label>
                  <p className="text-xs text-muted-foreground">
                    Start with sound muted
                  </p>
                </div>
                <Switch
                  id="muted"
                  checked={muted}
                  onCheckedChange={setMuted}
                  data-testid="switch-muted"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="controls">Show Controls</Label>
                  <p className="text-xs text-muted-foreground">
                    Display play/pause buttons
                  </p>
                </div>
                <Switch
                  id="controls"
                  checked={controls}
                  onCheckedChange={setControls}
                  data-testid="switch-controls"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="loop">Loop</Label>
                  <p className="text-xs text-muted-foreground">
                    Repeat video when finished
                  </p>
                </div>
                <Switch
                  id="loop"
                  checked={loop}
                  onCheckedChange={setLoop}
                  data-testid="switch-loop"
                />
              </div>
            </div>

            {autoplay && (
              <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 p-2 rounded">
                ⚠️ Autoplay may not work on all devices/browsers due to user experience policies.
                Muted autoplay is more likely to work.
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
              disabled={!videoUrl}
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