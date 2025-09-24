import { useEffect } from "react";
import { useLocation } from "wouter";
import { SortableContentBlockRenderer } from "@/components/content-blocks/SortableContentBlockRenderer";
import { EditModeToggle } from "@/components/admin/EditModeToggle";
import { useEditMode } from "@/contexts/EditModeContext";
import { Helmet } from "react-helmet-async";

export default function DemoContentPage() {
  const [location] = useLocation();
  const { isEditMode, setEditMode } = useEditMode();

  // Check for edit mode in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') === 'true') {
      setEditMode(true);
    }
  }, [setEditMode]);

  const pageName = location === '/' ? 'Home' : location.replace('/', '').replace('-', ' ');
  const title = pageName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <>
      <Helmet>
        <title>{title} - Content Blocks Demo</title>
        <meta name="description" content={`Demonstrating content blocks system with inline editing capabilities on the ${title} page.`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold">Content Demo</h1>
                <div className="hidden md:flex items-center space-x-6">
                  <a href="/" className="text-sm font-medium hover:text-primary">Home</a>
                  <a href="/about" className="text-sm font-medium hover:text-primary">About</a>
                  <a href="/services" className="text-sm font-medium hover:text-primary">Services</a>
                  <a href="/contact" className="text-sm font-medium hover:text-primary">Contact</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a 
                  href="/admin/content-blocks" 
                  className="text-sm font-medium hover:text-primary"
                >
                  Admin
                </a>
                {isEditMode && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                    Edit Mode
                  </span>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Page Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {title} Page
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                This is a demonstration of the content blocks system with inline editing capabilities.
                {isEditMode && " Edit mode is currently active - you can modify content blocks below."}
              </p>
            </div>

            {/* Content Blocks */}
            <div className="max-w-4xl mx-auto">
              <SortableContentBlockRenderer
                route={location}
                showAddButtons={isEditMode}
                className="space-y-6"
              />
            </div>

            {/* Demo Instructions */}
            {isEditMode && (
              <div className="max-w-4xl mx-auto mt-12 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">
                  Content Blocks Demo Instructions
                </h3>
                <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                  <p>• <strong>Edit Mode is Active:</strong> You can now modify content blocks on this page</p>
                  <p>• <strong>Drag & Drop:</strong> Use the grip handle (⋮⋮) to reorder blocks</p>
                  <p>• <strong>Edit Blocks:</strong> Click the edit button on any block to modify its content</p>
                  <p>• <strong>Add New Blocks:</strong> Use the add buttons at the bottom to create new content</p>
                  <p>• <strong>Show/Hide:</strong> Toggle visibility with the eye icon</p>
                  <p>• <strong>Auto-Save:</strong> Changes are automatically saved as you edit</p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t mt-16 py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; 2024 Content Blocks Demo. Built with React and modern web technologies.</p>
          </div>
        </footer>

        {/* Edit Mode Toggle */}
        {isEditMode && <EditModeToggle />}
      </div>
    </>
  );
}