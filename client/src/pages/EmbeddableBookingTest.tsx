import { useEffect } from "react";

export default function EmbeddableBookingTest() {
  // Parse URL query parameters for theme and preview mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    const preview = urlParams.get('preview');
    const fullscreen = urlParams.get('fullscreen');
    
    // Apply theme to document root
    if (theme) {
      const htmlElement = document.documentElement;
      htmlElement.classList.remove('light', 'dark');
      if (theme === 'dark') {
        htmlElement.classList.add('dark');
      } else if (theme === 'light') {
        htmlElement.classList.add('light');
      } else if (theme === 'auto') {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.classList.add(prefersDark ? 'dark' : 'light');
      }
    }

    // Add preview mode class if needed
    if (preview === 'true') {
      document.body.classList.add('embed-preview-mode');
    }

    // Add fullscreen class if needed
    if (fullscreen === 'true') {
      document.body.classList.add('embed-fullscreen');
    }

    return () => {
      document.body.classList.remove('embed-preview-mode', 'embed-fullscreen');
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Booking Widget Test
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          This is a minimal test version to verify the embed functionality works.
        </p>
      </div>
    </div>
  );
}