import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Upload, Search, Filter, Copy, Trash2, Edit, Download,
  FileText, FileImage, FileVideo, File, X, Check,
  Image as ImageIcon, Video, FileType, MoreVertical
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import Layout from '@/components/Layout';

interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  title?: string;
  altText?: string;
  description?: string;
  uploadedAt: string;
  uploadedBy?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return ImageIcon;
  if (mimeType.startsWith('video/')) return Video;
  if (mimeType.includes('pdf')) return FileText;
  return File;
}

function getFileTypeLabel(mimeType: string) {
  if (mimeType.startsWith('image/')) return 'Image';
  if (mimeType.startsWith('video/')) return 'Video';
  if (mimeType.includes('pdf')) return 'PDF';
  if (mimeType.includes('word')) return 'Document';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'Spreadsheet';
  return 'File';
}

export default function MediaLibrary() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [mimeTypeFilter, setMimeTypeFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);
  const [deletingMedia, setDeletingMedia] = useState<Media | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  
  // Fetch media list
  const { data: mediaData, isLoading } = useQuery({
    queryKey: ['/api/media', searchTerm, mimeTypeFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (mimeTypeFilter !== 'all') params.append('mimeType', mimeTypeFilter);
      params.append('limit', '100');
      
      const response = await apiRequest('GET', `/api/media?${params.toString()}`);
      const data = await response.json();
      return data;
    }
  });

  const media = mediaData?.media || [];
  const total = mediaData?.total || 0;

  // Upload mutation
  const uploadMedia = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || error.error || 'Upload failed');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Upload Successful',
        description: 'Your file has been uploaded successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      setUploadProgress(null);
    },
    onError: (error: any) => {
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload file. Please try again.',
        variant: 'destructive',
      });
      setUploadProgress(null);
    }
  });

  // Update mutation
  const updateMedia = useMutation({
    mutationFn: async ({ id, ...data }: { id: string; title?: string; altText?: string; description?: string }) => {
      const response = await apiRequest('PUT', `/api/media/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Media Updated',
        description: 'Media metadata has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      setEditingMedia(null);
    },
    onError: () => {
      toast({
        title: 'Update Failed',
        description: 'Failed to update media. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Delete mutation
  const deleteMedia = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest('DELETE', `/api/media/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Media Deleted',
        description: 'The media file has been deleted successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      setDeletingMedia(null);
    },
    onError: () => {
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete media. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Handle file upload
  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      // Validate file size (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: `${file.name} exceeds the 50MB limit.`,
          variant: 'destructive',
        });
        return;
      }
      
      setUploadProgress(0);
      uploadMedia.mutate(file);
    });
  }, [uploadMedia, toast]);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  // Copy URL to clipboard
  const copyToClipboard = useCallback((url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'URL Copied',
        description: 'The media URL has been copied to clipboard.',
      });
    });
  }, [toast]);

  // Handle edit form submission
  const handleEditSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!editingMedia) return;
    
    const formData = new FormData(e.target as HTMLFormElement);
    updateMedia.mutate({
      id: editingMedia.id,
      title: formData.get('title') as string || undefined,
      altText: formData.get('altText') as string || undefined,
      description: formData.get('description') as string || undefined,
    });
  }, [editingMedia, updateMedia]);

  return (
    <Layout>
      <div className="space-y-6" data-testid="media-library-page">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">Upload and manage your media files</p>
        </div>

        {/* Upload Area */}
        <Card>
          <CardContent className="p-6">
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              data-testid="upload-area"
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Supported: Images, Videos, PDFs, Documents (Max 50MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                data-testid="file-input"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadProgress !== null}
                data-testid="button-browse-files"
              >
                Browse Files
              </Button>
              {uploadProgress !== null && (
                <div className="mt-4">
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search media..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>
              </div>
              <Select value={mimeTypeFilter} onValueChange={setMimeTypeFilter}>
                <SelectTrigger className="w-[180px]" data-testid="select-filter-type">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Files</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="application/pdf">PDFs</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="self-center">
                {total} {total === 1 ? 'file' : 'files'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="aspect-square mb-2" />
                  <Skeleton className="h-4 mb-1" />
                  <Skeleton className="h-3" />
                </CardContent>
              </Card>
            ))
          ) : media.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-12 text-center">
                <FileImage className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Media Found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || mimeTypeFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Upload your first file to get started'}
                </p>
              </CardContent>
            </Card>
          ) : (
            media.map((item: Media) => {
              const FileIcon = getFileIcon(item.mimeType);
              const isImage = item.mimeType.startsWith('image/');
              
              return (
                <Card 
                  key={item.id} 
                  className="group cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedMedia(item)}
                  data-testid={`card-media-${item.id}`}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square mb-2 rounded overflow-hidden bg-secondary flex items-center justify-center">
                      {isImage ? (
                        <img
                          src={item.url}
                          alt={item.altText || item.originalName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <FileIcon className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium truncate" title={item.title || item.originalName}>
                        {item.title || item.originalName}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{getFileTypeLabel(item.mimeType)}</span>
                        <span>{formatFileSize(item.size)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(item.uploadedAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="mt-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(item.url);
                        }}
                        data-testid={`button-copy-${item.id}`}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingMedia(item);
                        }}
                        data-testid={`button-edit-${item.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingMedia(item);
                        }}
                        data-testid={`button-delete-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Media Details Dialog */}
        {selectedMedia && (
          <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedMedia.title || selectedMedia.originalName}</DialogTitle>
                <DialogDescription>
                  Uploaded {format(new Date(selectedMedia.uploadedAt), 'PPpp')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {selectedMedia.mimeType.startsWith('image/') ? (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.altText || selectedMedia.originalName}
                    className="w-full rounded"
                  />
                ) : (
                  <div className="aspect-video bg-secondary rounded flex items-center justify-center">
                    {React.createElement(getFileIcon(selectedMedia.mimeType), {
                      className: 'h-24 w-24 text-muted-foreground'
                    })}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">File Name</p>
                    <p className="text-muted-foreground">{selectedMedia.originalName}</p>
                  </div>
                  <div>
                    <p className="font-medium">File Type</p>
                    <p className="text-muted-foreground">{selectedMedia.mimeType}</p>
                  </div>
                  <div>
                    <p className="font-medium">File Size</p>
                    <p className="text-muted-foreground">{formatFileSize(selectedMedia.size)}</p>
                  </div>
                  {selectedMedia.uploadedBy && (
                    <div>
                      <p className="font-medium">Uploaded By</p>
                      <p className="text-muted-foreground">{selectedMedia.uploadedBy}</p>
                    </div>
                  )}
                </div>
                {selectedMedia.description && (
                  <div>
                    <p className="font-medium text-sm mb-1">Description</p>
                    <p className="text-sm text-muted-foreground">{selectedMedia.description}</p>
                  </div>
                )}
                <div>
                  <Label htmlFor="media-url">Media URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="media-url"
                      value={selectedMedia.url}
                      readOnly
                      className="font-mono text-xs"
                    />
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(selectedMedia.url)}
                      data-testid="button-copy-url"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedMedia(null);
                    setEditingMedia(selectedMedia);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setSelectedMedia(null);
                    setDeletingMedia(selectedMedia);
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Media Dialog */}
        {editingMedia && (
          <Dialog open={!!editingMedia} onOpenChange={() => setEditingMedia(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Media</DialogTitle>
                <DialogDescription>
                  Update metadata for SEO optimization
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleEditSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      name="title"
                      defaultValue={editingMedia.title || ''}
                      placeholder="Enter a descriptive title"
                      data-testid="input-edit-title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-alt">Alt Text (for SEO)</Label>
                    <Input
                      id="edit-alt"
                      name="altText"
                      defaultValue={editingMedia.altText || ''}
                      placeholder="Describe the image for accessibility"
                      data-testid="input-edit-alt"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      name="description"
                      defaultValue={editingMedia.description || ''}
                      placeholder="Add a detailed description"
                      rows={4}
                      data-testid="textarea-edit-description"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingMedia(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={updateMedia.isPending}
                    data-testid="button-save-changes"
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        {deletingMedia && (
          <AlertDialog open={!!deletingMedia} onOpenChange={() => setDeletingMedia(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Media</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{deletingMedia.title || deletingMedia.originalName}"? 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMedia.mutate(deletingMedia.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  data-testid="button-confirm-delete"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </Layout>
  );
}