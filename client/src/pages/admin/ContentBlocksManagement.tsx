import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import AdminNoIndex from "@/components/AdminNoIndex";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Eye, 
  Edit3, 
  BarChart3, 
  FileText,
  Image as ImageIcon,
  Video,
  MousePointer,
  Layout,
  ArrowLeft
} from "lucide-react";
import { ContentBlocksManager } from "@/components/admin/ContentBlocksManager";
import { EditModeToggle } from "@/components/admin/EditModeToggle";
import { SortableContentBlockRenderer } from "@/components/content-blocks/SortableContentBlockRenderer";
import { useEditMode } from "@/contexts/EditModeContext";
import HelmetAsyncDefault from "react-helmet-async";
const { Helmet } = HelmetAsyncDefault;

export default function ContentBlocksManagement() {
  const [location, navigate] = useLocation();
  const { isEditMode, setEditMode } = useEditMode();
  const [selectedRoute, setSelectedRoute] = useState("/");

  // Enable edit mode when entering this page
  useEffect(() => {
    setEditMode(true);
    
    // Cleanup: disable edit mode when leaving
    return () => {
      setEditMode(false);
    };
  }, [setEditMode]);

  const sampleRoutes = [
    { path: "/", label: "Home Page", blocks: 8 },
    { path: "/about", label: "About Us", blocks: 5 },
    { path: "/contact", label: "Contact", blocks: 3 },
    { path: "/services", label: "Services", blocks: 12 },
    { path: "/bachelor-party", label: "Bachelor Party", blocks: 6 },
    { path: "/bachelorette-party", label: "Bachelorette Party", blocks: 6 },
    { path: "/private-cruises", label: "Private Cruises", blocks: 9 },
  ];

  const blockTypeStats = [
    { type: "text", count: 24, icon: FileText, color: "bg-blue-500" },
    { type: "image", count: 18, icon: ImageIcon, color: "bg-green-500" },
    { type: "video", count: 6, icon: Video, color: "bg-purple-500" },
    { type: "cta", count: 12, icon: MousePointer, color: "bg-orange-500" },
    { type: "section", count: 15, icon: Layout, color: "bg-cyan-500" },
  ];

  return (
    <>
      <AdminNoIndex />
      <Helmet>
        <title>Content Blocks Management - Admin Dashboard</title>
        <meta name="description" content="Manage content blocks across your website with inline editing, drag-and-drop reordering, and advanced content management features." />
      </Helmet>

      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold">Content Blocks Management</h1>
              <p className="text-muted-foreground">
                Manage content blocks across your website with drag-and-drop editing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={isEditMode ? "default" : "secondary"}>
              {isEditMode ? "Edit Mode Active" : "View Mode"}
            </Badge>
            <Button
              variant={isEditMode ? "secondary" : "default"}
              onClick={() => setEditMode(!isEditMode)}
              className="gap-2"
              data-testid="button-toggle-edit-mode"
            >
              {isEditMode ? <Eye className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
              {isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {blockTypeStats.map((stat) => (
            <Card key={stat.type} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {stat.type} Block{stat.count !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Main Content */}
        <Tabs defaultValue="manager" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manager" className="gap-2">
              <Settings className="h-4 w-4" />
              Block Manager
            </TabsTrigger>
            <TabsTrigger value="editor" className="gap-2">
              <Edit3 className="h-4 w-4" />
              Page Editor
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Content Blocks Manager */}
          <TabsContent value="manager" className="space-y-6">
            <ContentBlocksManager showRouteFilter={true} />
          </TabsContent>

          {/* Live Page Editor */}
          <TabsContent value="editor" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Live Page Editor</h2>
                    <p className="text-muted-foreground">
                      Edit content blocks directly on your pages with drag-and-drop reordering
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Route Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Select a page to edit:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sampleRoutes.map((route) => (
                      <Card 
                        key={route.path}
                        className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                          selectedRoute === route.path ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedRoute(route.path)}
                        data-testid={`route-card-${route.path.replace('/', '') || 'home'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{route.label}</div>
                            <div className="text-sm text-muted-foreground">
                              {route.path}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {route.blocks} blocks
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Live Editor Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Editing: {sampleRoutes.find(r => r.path === selectedRoute)?.label}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(selectedRoute, '_blank')}
                        data-testid="button-preview-page"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Page
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => navigate(selectedRoute + '?edit=true')}
                        data-testid="button-edit-live"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Live
                      </Button>
                    </div>
                  </div>

                  <Card className="p-6 bg-muted/20">
                    <div className="mb-4 text-sm text-muted-foreground">
                      Live content blocks for {selectedRoute}:
                    </div>
                    
                    {/* Render content blocks for selected route */}
                    <div className="border rounded-lg bg-background p-4">
                      <SortableContentBlockRenderer
                        route={selectedRoute}
                        showAddButtons={isEditMode}
                        className="space-y-4"
                      />
                    </div>

                    {/* Instructions */}
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-sm">
                      <div className="font-medium mb-2 text-blue-900 dark:text-blue-100">
                        How to use the live editor:
                      </div>
                      <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                        <li>• Drag blocks by the grip handle to reorder</li>
                        <li>• Click the edit button on any block to modify it</li>
                        <li>• Use the eye icon to show/hide blocks</li>
                        <li>• Add new blocks using the buttons at the bottom</li>
                        <li>• Changes are auto-saved as you edit</li>
                      </ul>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-6">
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Content Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  Track performance and engagement of your content blocks
                </p>
                <div className="text-sm text-muted-foreground">
                  Analytics features coming soon...
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Mode Toggle (Always visible when edit mode is active) */}
        {isEditMode && <EditModeToggle />}
      </div>
    </>
  );
}