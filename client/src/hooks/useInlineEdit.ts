import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface EditableElement extends HTMLElement {
  __originalContent?: string;
  __elementId?: string;
}

// Check if running on Replit Editor or localhost (development)
const isReplitEditor = () => {
  const hostname = window.location.hostname;
  return (
    hostname.includes('replit.dev') || 
    hostname.includes('repl.co') || 
    hostname.includes('localhost') ||
    hostname.includes('127.0.0.1') ||
    hostname.includes('0.0.0.0')
  );
};

// Get current page name from location
const getPageName = (location: string) => {
  if (location === '/') return 'Home';
  const parts = location.split('/');
  const name = parts[parts.length - 1] || parts[parts.length - 2];
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

// Generate intelligent ID from element
const generateElementId = (element: HTMLElement, index: number): string => {
  const tagName = element.tagName.toLowerCase();
  const textContent = element.textContent?.trim() || '';
  const firstWords = textContent.split(' ').slice(0, 3).join('-').toLowerCase()
    .replace(/[^a-z0-9-]/g, '');
  
  if (firstWords) {
    return `${tagName}-${firstWords}`;
  }
  
  return `${tagName}-${index}`;
};

export const useInlineEdit = () => {
  // Only enable editing if on Replit Editor
  const canEdit = isReplitEditor();
  const [isEditMode, setIsEditMode] = useState(false);
  const [location] = useLocation();
  const { toast } = useToast();
  const editableElementsRef = useRef<Set<EditableElement>>(new Set());
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const [editableCount, setEditableCount] = useState(0);
  const currentPage = getPageName(location);

  // Load saved content on mount
  const loadSavedContent = useCallback(() => {
    const editableElements = document.querySelectorAll('[data-editable]') as NodeListOf<EditableElement>;
    
    editableElements.forEach((element, index) => {
      const elementId = element.getAttribute('data-editable-id') || 
                       element.getAttribute('id') || 
                       generateElementId(element, index);
      
      const storageKey = `content_${location}_${elementId}`;
      const savedContent = localStorage.getItem(storageKey);
      
      if (savedContent) {
        element.__originalContent = element.textContent || '';
        element.textContent = savedContent;
      }
      
      element.__elementId = elementId;
    });
    
    setEditableCount(editableElements.length);
  }, [location]);

  // Save content to localStorage
  const saveContent = useCallback((element: EditableElement) => {
    const elementId = element.__elementId;
    const content = element.textContent || '';
    
    if (elementId && content.trim()) {
      const storageKey = `content_${location}_${elementId}`;
      localStorage.setItem(storageKey, content);
      
      // Show saved toast
      toast({
        title: "Saved!",
        description: "Content saved successfully",
        duration: 1500,
      });
    }
  }, [location, toast]);

  // Make element editable
  const makeEditable = useCallback((element: EditableElement) => {
    element.contentEditable = 'true';
    element.style.cursor = 'text';
    element.style.outline = 'none';
    element.style.transition = 'all 0.3s ease';
    element.style.borderRadius = '4px';
    
    // Add hover effect
    const handleMouseEnter = () => {
      if (isEditMode) {
        element.style.backgroundColor = 'rgba(255, 235, 59, 0.25)';
        element.style.boxShadow = '0 0 0 2px rgba(255, 235, 59, 0.5)';
        element.style.transform = 'scale(1.01)';
      }
    };
    
    const handleMouseLeave = () => {
      element.style.backgroundColor = '';
      element.style.boxShadow = '';
      element.style.transform = '';
    };
    
    // Handle editing
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        element.blur();
      }
    };
    
    const handleBlur = () => {
      saveContent(element);
      element.style.backgroundColor = '';
      element.style.boxShadow = '';
      element.style.transform = '';
    };
    
    const handleFocus = () => {
      if (isEditMode) {
        element.style.backgroundColor = 'rgba(255, 235, 59, 0.35)';
        element.style.boxShadow = '0 0 0 3px rgba(255, 235, 59, 0.7)';
      }
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('keydown', handleKeyDown);
    element.addEventListener('blur', handleBlur);
    element.addEventListener('focus', handleFocus);
    
    // Store cleanup functions
    (element as any).__cleanup = () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('keydown', handleKeyDown);
      element.removeEventListener('blur', handleBlur);
      element.removeEventListener('focus', handleFocus);
    };
    
    editableElementsRef.current.add(element);
  }, [isEditMode, saveContent]);

  // Make element non-editable
  const makeNonEditable = useCallback((element: EditableElement) => {
    element.contentEditable = 'false';
    element.style.cursor = '';
    element.style.backgroundColor = '';
    element.style.boxShadow = '';
    element.style.transform = '';
    
    // Cleanup listeners
    if ((element as any).__cleanup) {
      (element as any).__cleanup();
      delete (element as any).__cleanup;
    }
    
    editableElementsRef.current.delete(element);
  }, []);

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    if (!canEdit) {
      toast({
        title: "Edit Mode Unavailable",
        description: "Inline editing is only available in the Replit Editor",
        duration: 3000,
      });
      return;
    }
    
    setIsEditMode(prev => {
      const newState = !prev;
      if (newState) {
        toast({
          title: "Edit Mode Enabled",
          description: "Click any highlighted text to edit it. Press Ctrl+E to exit.",
          duration: 3000,
        });
      } else {
        toast({
          title: "Edit Mode Disabled",
          description: "Your changes have been saved locally.",
          duration: 2000,
        });
      }
      return newState;
    });
  }, [canEdit, toast]);

  // Setup editable elements
  const setupEditableElements = useCallback(() => {
    const editableElements = document.querySelectorAll('[data-editable]') as NodeListOf<EditableElement>;
    
    // Update count
    setEditableCount(editableElements.length);
    
    if (isEditMode) {
      editableElements.forEach((element, index) => {
        // Ensure element has an ID
        if (!element.__elementId) {
          element.__elementId = element.getAttribute('data-editable-id') || 
                                element.getAttribute('id') || 
                                generateElementId(element, index);
        }
        makeEditable(element);
      });
    } else {
      editableElements.forEach(element => makeNonEditable(element));
    }
  }, [isEditMode, makeEditable, makeNonEditable]);

  // Create floating badge
  const createBadge = useCallback(() => {
    if (badgeRef.current) return;
    
    const badge = document.createElement('div');
    badge.className = 'fixed bottom-4 right-4 z-[9999] px-5 py-3 rounded-xl shadow-2xl transition-all duration-500 backdrop-blur-md';
    // Hide badge completely when edit mode is off
    badge.style.display = isEditMode ? 'block' : 'none';
    badge.style.backgroundColor = isEditMode 
      ? 'rgba(16, 185, 129, 0.95)' 
      : canEdit ? 'rgba(107, 114, 128, 0.95)' : 'rgba(107, 114, 128, 0.6)';
    badge.style.color = 'white';
    badge.style.fontWeight = '600';
    badge.style.fontSize = '14px';
    badge.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    badge.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    badge.innerHTML = `
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-3">
          <div class="w-2.5 h-2.5 rounded-full ${isEditMode ? 'bg-white animate-pulse' : 'bg-gray-300'}"></div>
          <span style="font-weight: 700;">Edit Mode ${isEditMode ? 'ON' : 'OFF'}</span>
          <kbd class="px-2 py-1 text-xs bg-white/20 rounded" style="font-family: monospace;">Ctrl+E</kbd>
        </div>
        ${canEdit ? `
          <div class="text-xs opacity-90" style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                <path d="M2 17L12 22L22 17"></path>
                <path d="M2 12L12 17L22 12"></path>
              </svg>
              <span>Page: <strong>${currentPage}</strong></span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>${editableCount} editable elements</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px; color: #fbbf24;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span style="font-weight: 500;">Replit Editor Only</span>
            </div>
          </div>
        ` : `
          <div class="text-xs opacity-70">
            <span style="color: #fca5a5;">⚠️ Production Mode - Editing Disabled</span>
          </div>
        `}
      </div>
    `;
    
    document.body.appendChild(badge);
    badgeRef.current = badge;
    
    // Animate in
    badge.style.transform = 'translateY(120%)';
    badge.style.opacity = '0';
    setTimeout(() => {
      badge.style.transform = 'translateY(0)';
      badge.style.opacity = '1';
    }, 100);
  }, [isEditMode, canEdit, currentPage, editableCount]);

  // Update badge
  const updateBadge = useCallback(() => {
    if (!badgeRef.current) return;
    
    // Hide badge completely when edit mode is off
    badgeRef.current.style.display = isEditMode ? 'block' : 'none';
    badgeRef.current.style.backgroundColor = isEditMode 
      ? 'rgba(16, 185, 129, 0.95)' 
      : canEdit ? 'rgba(107, 114, 128, 0.95)' : 'rgba(107, 114, 128, 0.6)';
    badgeRef.current.innerHTML = `
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-3">
          <div class="w-2.5 h-2.5 rounded-full ${isEditMode ? 'bg-white animate-pulse' : 'bg-gray-300'}"></div>
          <span style="font-weight: 700;">Edit Mode ${isEditMode ? 'ON' : 'OFF'}</span>
          <kbd class="px-2 py-1 text-xs bg-white/20 rounded" style="font-family: monospace;">Ctrl+E</kbd>
        </div>
        ${canEdit ? `
          <div class="text-xs opacity-90" style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                <path d="M2 17L12 22L22 17"></path>
                <path d="M2 12L12 17L22 12"></path>
              </svg>
              <span>Page: <strong>${currentPage}</strong></span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>${editableCount} editable elements</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px; color: #fbbf24;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span style="font-weight: 500;">Replit Editor Only</span>
            </div>
          </div>
        ` : `
          <div class="text-xs opacity-70">
            <span style="color: #fca5a5;">⚠️ Production Mode - Editing Disabled</span>
          </div>
        `}
      </div>
    `;
  }, [isEditMode, canEdit, currentPage, editableCount]);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        toggleEditMode();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleEditMode]);

  // Setup editable elements when edit mode changes
  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      setupEditableElements();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      // Cleanup all editable elements
      editableElementsRef.current.forEach(element => makeNonEditable(element));
      editableElementsRef.current.clear();
    };
  }, [isEditMode, setupEditableElements, makeNonEditable]);

  // Load saved content on mount and setup elements when location changes
  useEffect(() => {
    loadSavedContent();
    
    // Force setup elements after location change if in edit mode
    if (isEditMode) {
      const timer = setTimeout(() => {
        setupEditableElements();
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [loadSavedContent, location, isEditMode, setupEditableElements]);

  // Create and update badge - only show when edit mode is active
  useEffect(() => {
    if (isEditMode && canEdit) {
      createBadge();
      updateBadge();
    } else {
      // Remove badge when edit mode is off
      if (badgeRef.current) {
        badgeRef.current.remove();
        badgeRef.current = null;
      }
    }
    
    return () => {
      // Remove badge on unmount
      if (badgeRef.current) {
        badgeRef.current.remove();
        badgeRef.current = null;
      }
    };
  }, [isEditMode, canEdit, createBadge, updateBadge]);

  // Watch for DOM changes to handle dynamically added elements
  useEffect(() => {
    if (!isEditMode) return;
    
    const observer = new MutationObserver(() => {
      setupEditableElements();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => observer.disconnect();
  }, [isEditMode, setupEditableElements]);

  return {
    isEditMode,
    toggleEditMode,
    canEdit
  };
};