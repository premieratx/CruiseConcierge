import { useState, useCallback, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminNoIndex from "@/components/AdminNoIndex";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Upload, X, Pencil, Trash2, GripVertical, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { GalleryImage } from "@shared/schema";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const CATEGORIES = [
  { value: 'cruise_party', label: 'Cruise Party' },
  { value: 'boat_exterior', label: 'Boat Exterior' },
  { value: 'amenities', label: 'Amenities' },
  { value: 'guests', label: 'Guests' },
  { value: 'general', label: 'General' },
];

interface FilePreview {
  file: File;
  preview: string;
  progress: number;
}

interface EditImageData {
  id: string;
  title: string;
  alt: string;
  category: string;
}

function SortableImageCard({ image, onEdit, onDelete }: { 
  image: GalleryImage; 
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <Card className="overflow-hidden">
        <div className="aspect-video relative bg-muted">
          <img
            src={image.publicUrl}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onEdit(image)}
              data-testid={`button-edit-${image.id}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(image.id)}
              data-testid={`button-delete-${image.id}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing"
            >
              <Button size="sm" variant="ghost" data-testid={`button-drag-${image.id}`}>
                <GripVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="p-3 space-y-1">
          <p className="font-medium text-sm truncate" data-testid={`text-title-${image.id}`}>
            {image.title}
          </p>
          <p className="text-xs text-muted-foreground">
            {image.category} • {(image.fileSize / 1024).toFixed(0)}KB
          </p>
          <p className="text-xs text-muted-foreground">
            {image.width} × {image.height}
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function GalleryManager() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [editingImage, setEditingImage] = useState<EditImageData | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch all gallery images
  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/admin/gallery/images', filterCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterCategory !== 'all') {
        params.append('category', filterCategory);
      }
      params.append('activeOnly', 'false');
      const response = await fetch(`/api/admin/gallery/images?${params}`);
      if (!response.ok) throw new Error('Failed to fetch images');
      return response.json();
    },
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload images');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/gallery/images'] });
      setFilePreviews([]);
      toast({
        title: 'Success',
        description: 'Images uploaded successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<GalleryImage> }) => {
      return apiRequest(`/api/admin/gallery/${id}`, {
        method: 'PATCH',
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/gallery/images'] });
      setEditingImage(null);
      toast({
        title: 'Success',
        description: 'Image updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Update failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/gallery/images'] });
      toast({
        title: 'Success',
        description: 'Image deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Reorder mutation
  const reorderMutation = useMutation({
    mutationFn: async (imageIds: string[]) => {
      return apiRequest('/api/admin/gallery/reorder', {
        method: 'POST',
        body: { imageIds },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/gallery/images'] });
      toast({
        title: 'Success',
        description: 'Images reordered successfully',
      });
    },
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      handleFiles(files);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const previews: FilePreview[] = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
    }));
    setFilePreviews(prev => [...prev, ...previews]);
  };

  const removePreview = (index: number) => {
    setFilePreviews(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async () => {
    if (filePreviews.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    
    filePreviews.forEach(preview => {
      formData.append('images', preview.file);
    });
    formData.append('category', selectedCategory);

    try {
      await uploadMutation.mutateAsync(formData);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage({
      id: image.id,
      title: image.title,
      alt: image.alt,
      category: image.category,
    });
  };

  const handleSaveEdit = () => {
    if (!editingImage) return;
    
    updateMutation.mutate({
      id: editingImage.id,
      data: {
        title: editingImage.title,
        alt: editingImage.alt,
        category: editingImage.category,
      },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex(img => img.id === active.id);
      const newIndex = images.findIndex(img => img.id === over.id);
      
      const newOrder = arrayMove(images, oldIndex, newIndex);
      const imageIds = newOrder.map(img => img.id);
      
      reorderMutation.mutate(imageIds);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <AdminNoIndex />
      <div>
        <h1 className="text-3xl font-bold">Photo Gallery Manager</h1>
        <p className="text-muted-foreground mt-2">
          Upload and manage gallery images. Images are automatically compressed to under 800KB.
        </p>
      </div>

      {/* Upload Section */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Upload Images</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="category-select">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category-select" data-testid="select-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDraggingOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
          }`}
          data-testid="dropzone-upload"
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">Drag and drop images here</p>
          <p className="text-sm text-muted-foreground mb-4">or</p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            data-testid="button-select-files"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Select Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            data-testid="input-file"
          />
        </div>

        {/* File Previews */}
        {filePreviews.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">{filePreviews.length} file(s) selected</p>
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                data-testid="button-upload"
              >
                {isUploading ? 'Uploading...' : 'Upload All'}
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={preview.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removePreview(index)}
                    data-testid={`button-remove-preview-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <p className="text-xs mt-1 truncate">{preview.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(preview.file.size / 1024).toFixed(0)}KB
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Gallery Section */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Gallery Images</h2>
          <div className="w-48">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger data-testid="select-filter-category">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-muted animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <ImageIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No images found. Upload some images to get started.</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map(img => img.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map(image => (
                  <SortableImageCard
                    key={image.id}
                    image={image}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
        <DialogContent data-testid="dialog-edit-image">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          {editingImage && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingImage.title}
                  onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                  data-testid="input-edit-title"
                />
              </div>
              <div>
                <Label htmlFor="edit-alt">Alt Text</Label>
                <Input
                  id="edit-alt"
                  value={editingImage.alt}
                  onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                  data-testid="input-edit-alt"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingImage.category}
                  onValueChange={(value) => setEditingImage({ ...editingImage, category: value })}
                >
                  <SelectTrigger id="edit-category" data-testid="select-edit-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingImage(null)}
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={updateMutation.isPending}
              data-testid="button-save-edit"
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
