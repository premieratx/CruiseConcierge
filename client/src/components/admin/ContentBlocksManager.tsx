import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2,
  FileText,
  Image as ImageIcon,
  Video,
  MousePointer,
  Layout
} from "lucide-react";
import { SelectContentBlock } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ContentBlocksManagerProps {
  route?: string;
  showRouteFilter?: boolean;
}

export function ContentBlocksManager({ 
  route, 
  showRouteFilter = true 
}: ContentBlocksManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedRoute, setSelectedRoute] = useState<string>(route || "all");

  const { data: blocksData, isLoading } = useQuery({
    queryKey: ['/api/content-blocks', { search: searchTerm, route: selectedRoute }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      if (selectedRoute !== 'all') params.set('route', selectedRoute);
      
      const response = await fetch(`/api/content-blocks?${params}`);
      if (!response.ok) throw new Error('Failed to fetch content blocks');
      return response.json();
    },
  });

  const blocks: SelectContentBlock[] = blocksData?.blocks || [];

  // Filter blocks based on local filters
  const filteredBlocks = blocks.filter(block => {
    if (selectedType !== 'all' && block.type !== selectedType) return false;
    if (selectedStatus !== 'all' && block.status !== selectedStatus) return false;
    return true;
  });

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'cta':
        return <MousePointer className="h-4 w-4" />;
      case 'section':
        return <Layout className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const handleDeleteBlock = async (block: SelectContentBlock) => {
    if (!confirm(`Are you sure you want to delete "${block.title || block.key}"?`)) return;
    
    try {
      const response = await fetch(
        `/api/content-blocks/${encodeURIComponent(block.route)}/${encodeURIComponent(block.key)}`,
        { method: 'DELETE' }
      );
      
      if (!response.ok) throw new Error('Failed to delete block');
      
      // Refresh the data
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete block:', error);
      alert('Failed to delete block. Please try again.');
    }
  };

  const handleToggleVisibility = async (block: SelectContentBlock) => {
    try {
      const response = await fetch(
        `/api/content-blocks/${encodeURIComponent(block.route)}/${encodeURIComponent(block.key)}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isVisible: !block.isVisible }),
        }
      );
      
      if (!response.ok) throw new Error('Failed to update visibility');
      
      // Refresh the data
      window.location.reload();
    } catch (error) {
      console.error('Failed to update visibility:', error);
      alert('Failed to update visibility. Please try again.');
    }
  };

  return (
    <Card className="p-6" data-testid="content-blocks-manager">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Content Blocks Manager</h2>
            <p className="text-muted-foreground">
              Manage all content blocks across your site
            </p>
          </div>
          <Badge variant="outline">
            {filteredBlocks.length} block{filteredBlocks.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        <Separator />

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4" />
            Filters
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search blocks..."
                  className="pl-9"
                  data-testid="input-search"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="space-y-2">
              <Label htmlFor="type">Block Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger data-testid="select-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="cta">CTA Button</SelectItem>
                  <SelectItem value="section">Section</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger data-testid="select-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Route Filter */}
            {showRouteFilter && (
              <div className="space-y-2">
                <Label htmlFor="route">Page Route</Label>
                <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                  <SelectTrigger data-testid="select-route">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Routes</SelectItem>
                    <SelectItem value="/">Home</SelectItem>
                    <SelectItem value="/about">About</SelectItem>
                    <SelectItem value="/contact">Contact</SelectItem>
                    <SelectItem value="/services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Content Blocks List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : filteredBlocks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No content blocks found</h3>
              <p className="text-sm">
                {searchTerm || selectedType !== 'all' || selectedStatus !== 'all'
                  ? "Try adjusting your filters to see more results."
                  : "Create your first content block to get started."}
              </p>
            </div>
          ) : (
            filteredBlocks.map((block) => (
              <Card 
                key={block.id} 
                className={cn(
                  "p-4 transition-colors hover:bg-muted/50",
                  !block.isVisible && "opacity-60"
                )}
                data-testid={`block-item-${block.key}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Block Type Icon */}
                    <div className="flex-shrink-0">
                      {getBlockIcon(block.type)}
                    </div>

                    {/* Block Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">
                          {block.title || block.key}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", getStatusColor(block.status))}
                        >
                          {block.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">{block.type}</span>
                        <span>•</span>
                        <span>{block.route}</span>
                        {block.category && (
                          <>
                            <span>•</span>
                            <span>{block.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToggleVisibility(block)}
                      data-testid={`button-toggle-visibility-${block.key}`}
                    >
                      {block.isVisible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        // Navigate to the page with edit mode enabled
                        window.location.href = `${block.route}?edit=true`;
                      }}
                      data-testid={`button-edit-${block.key}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteBlock(block)}
                      className="text-destructive hover:text-destructive"
                      data-testid={`button-delete-${block.key}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}