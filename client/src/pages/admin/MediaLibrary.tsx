import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Image, Video, Sparkles, Wand2, Download, Eye, Tag, Star, Filter, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  fileType: 'photo' | 'video' | 'edited_photo' | 'generated_video';
  filePath: string;
  fileSize?: number;
  mimeType?: string;
  uploadDate: string;
  aiAnalyzed: boolean;
  aiAnalysis?: any;
  autoTags?: string[];
  manualTags?: string[];
  qualityScore?: number;
  ugcPotential?: number;
  status: 'draft' | 'published';
  publishedLocations?: any[];
  createdBy?: string;
}

interface EditModalProps {
  photo: MediaItem;
  isOpen: boolean;
  onClose: () => void;
  onEditComplete: (editedPhoto: MediaItem) => void;
}

function EditModal({ photo, isOpen, onClose, onEditComplete }: EditModalProps) {
  const [editType, setEditType] = useState<'enhance' | 'style' | 'background' | 'color' | 'custom'>('enhance');
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleEdit = async () => {
    setIsEditing(true);
    try {
      const response = await apiRequest('/api/media/edit-photo', {
        method: 'POST',
        body: JSON.stringify({
          photoId: photo.id,
          editType,
          editPrompt,
          userId: 'admin'
        })
      });

      if (response.success) {
        onEditComplete(response.editedPhoto);
        toast({
          title: "Photo Edited Successfully!",
          description: "Nano Banana has enhanced your photo.",
        });
        onClose();
      }
    } catch (error) {
      console.error('Edit failed:', error);
      toast({
        title: "Edit Failed",
        description: "Failed to edit photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEditing(false);
    }
  };

  const editOptions = {
    enhance: "Enhance lighting, contrast, and sharpness for marketing use",
    style: "Apply Premier Party Cruises branding style with warm, premium colors", 
    background: "Improve background while keeping main subjects",
    color: "Adjust colors for better visual appeal and brand consistency",
    custom: "Custom edit with your own instructions"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-500" />
            Edit with Nano Banana AI
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <img 
                src={photo.filePath} 
                alt={photo.originalName} 
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-sm text-gray-500 mt-2">{photo.originalName}</p>
            </div>
            
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Edit Type</label>
                  <Select value={editType} onValueChange={(value: any) => setEditType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(editOptions).map(([key, description]) => (
                        <SelectItem key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    {editOptions[editType]}
                  </p>
                </div>
                
                {editType === 'custom' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Custom Instructions</label>
                    <Textarea 
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder="Describe how you want to edit this photo..."
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleEdit} disabled={isEditing} className="bg-purple-600 hover:bg-purple-700">
              {isEditing && <Sparkles className="h-4 w-4 mr-2 animate-spin" />}
              {isEditing ? 'Editing...' : 'Edit Photo'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MediaLibrary() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<MediaItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [generatePrompt, setGeneratePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch media library
  const { data: mediaItems, isLoading, error } = useQuery({
    queryKey: ['/api/media/library', selectedFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedFilter !== 'all') {
        params.append('filter', selectedFilter);
      }
      const response = await apiRequest(`/api/media/library?${params.toString()}`);
      return response.items || [];
    }
  });

  // Upload files
  const uploadFiles = async () => {
    if (!uploadedFiles || uploadedFiles.length === 0) return;
    
    setIsUploading(true);
    try {
      const uploadPromises = Array.from(uploadedFiles).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', 'admin');

        const response = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Upload failed');
        return response.json();
      });

      await Promise.all(uploadPromises);
      
      toast({
        title: "Upload Successful!",
        description: `Uploaded ${uploadedFiles.length} file(s). AI analysis in progress...`,
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/media/library'] });
      setUploadedFiles(null);
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Generate image with AI
  const generateImage = async () => {
    if (!generatePrompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for the image you want to generate.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await apiRequest('/api/media/generate-image', {
        method: 'POST',
        body: JSON.stringify({
          prompt: generatePrompt,
          userId: 'admin'
        })
      });

      if (response.success) {
        toast({
          title: "Image Generated!",
          description: "Nano Banana has created your image. AI analysis in progress...",
        });
        queryClient.invalidateQueries({ queryKey: ['/api/media/library'] });
        setGeneratePrompt('');
      }
    } catch (error) {
      console.error('Generation failed:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter media items based on search
  const filteredItems = mediaItems?.filter((item: MediaItem) => {
    const matchesSearch = !searchTerm || 
      item.originalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.autoTags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Photo Studio</h1>
            <p className="text-gray-600">Upload, edit with Nano Banana AI, and manage your cruise photos</p>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              Powered by Gemini AI
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-500" />
                Upload Photos/Videos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => setUploadedFiles(e.target.files)}
                data-testid="input-media-upload"
                className="cursor-pointer"
              />
              {uploadedFiles && uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    {uploadedFiles.length} file(s) selected
                  </p>
                  <Button 
                    onClick={uploadFiles} 
                    disabled={isUploading}
                    className="w-full"
                    data-testid="button-upload-files"
                  >
                    {isUploading && <Sparkles className="h-4 w-4 mr-2 animate-spin" />}
                    {isUploading ? 'Uploading...' : 'Upload & Analyze'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Generation Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Generate with AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={generatePrompt}
                onChange={(e) => setGeneratePrompt(e.target.value)}
                placeholder="Describe the image you want to create... (e.g., 'Party boat on Lake Travis at sunset with people celebrating')"
                rows={3}
                data-testid="textarea-generate-prompt"
              />
              <Button 
                onClick={generateImage} 
                disabled={isGenerating || !generatePrompt.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700"
                data-testid="button-generate-image"
              >
                {isGenerating && <Sparkles className="h-4 w-4 mr-2 animate-spin" />}
                {isGenerating ? 'Generating...' : 'Generate Image'}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-500" />
                Library Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Items</span>
                  <span className="font-semibold" data-testid="stat-total-items">
                    {mediaItems?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">AI Analyzed</span>
                  <span className="font-semibold text-green-600" data-testid="stat-analyzed-items">
                    {mediaItems?.filter((item: MediaItem) => item.aiAnalyzed).length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Published</span>
                  <span className="font-semibold text-blue-600" data-testid="stat-published-items">
                    {mediaItems?.filter((item: MediaItem) => item.status === 'published').length || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48" data-testid="select-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Media</SelectItem>
                <SelectItem value="photos">Photos Only</SelectItem>
                <SelectItem value="videos">Videos Only</SelectItem>
                <SelectItem value="analyzed">AI Analyzed</SelectItem>
                <SelectItem value="edited">Edited Photos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by filename or tags..."
              className="flex-1"
              data-testid="input-search-media"
            />
          </div>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load media library</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'No items match your search.' : 'Upload some photos or videos to get started!'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item: MediaItem) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-200">
                <div className="relative overflow-hidden rounded-t-lg">
                  {item.fileType.includes('video') ? (
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                      <span className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        Video
                      </span>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={item.filePath}
                        alt={item.originalName || item.filename}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      {item.fileType === 'edited_photo' && (
                        <Badge className="absolute top-2 left-2 bg-purple-500 hover:bg-purple-600">
                          <Wand2 className="h-3 w-3 mr-1" />
                          Edited
                        </Badge>
                      )}
                      {item.qualityScore && item.qualityScore >= 8 && (
                        <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                          <Star className="h-3 w-3 mr-1" />
                          {item.qualityScore}/10
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium text-sm truncate" title={item.originalName || item.filename}>
                        {item.originalName || item.filename}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(item.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {item.aiAnalyzed && item.autoTags && item.autoTags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.autoTags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.autoTags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{item.autoTags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      {!item.fileType.includes('video') && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setSelectedPhoto(item);
                            setIsEditModalOpen(true);
                          }}
                          data-testid={`button-edit-photo-${item.id}`}
                        >
                          <Wand2 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(item.filePath, '_blank')}
                        data-testid={`button-view-media-${item.id}`}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {selectedPhoto && (
          <EditModal
            photo={selectedPhoto}
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedPhoto(null);
            }}
            onEditComplete={(editedPhoto) => {
              queryClient.invalidateQueries({ queryKey: ['/api/media/library'] });
            }}
          />
        )}
      </div>
    </div>
  );
}