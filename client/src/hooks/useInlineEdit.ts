import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface EditableElement extends HTMLElement {
  __originalContent?: string;
  __elementId?: string;
}

export const useInlineEdit = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [location] = useLocation();
  const { toast } = useToast();
  const editableElementsRef = useRef<Set<EditableElement>>(new Set());
  const badgeRef = useRef<HTMLDivElement | null>(null);

  // Load saved content on mount
  const loadSavedContent = useCallback(() => {
    const editableElements = document.querySelectorAll('[data-editable]') as NodeListOf<EditableElement>;
    
    editableElements.forEach((element) => {
      const elementId = element.getAttribute('data-editable-id') || 
                       element.getAttribute('id') || 
                       Array.from(editableElements).indexOf(element).toString();
      
      const storageKey = `content_${location}_${elementId}`;
      const savedContent = localStorage.getItem(storageKey);
      
      if (savedContent) {
        element.__originalContent = element.textContent || '';
        element.textContent = savedContent;
      }
      
      element.__elementId = elementId;
    });
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
    element.style.transition = 'background-color 0.2s';
    
    // Add hover effect
    const handleMouseEnter = () => {
      if (isEditMode) {
        element.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
      }
    };
    
    const handleMouseLeave = () => {
      element.style.backgroundColor = '';
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
    };
    
    const handleFocus = () => {
      if (isEditMode) {
        element.style.backgroundColor = 'rgba(255, 235, 59, 0.2)';
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
    
    // Cleanup listeners
    if ((element as any).__cleanup) {
      (element as any).__cleanup();
      delete (element as any).__cleanup;
    }
    
    editableElementsRef.current.delete(element);
  }, []);

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  // Setup editable elements
  const setupEditableElements = useCallback(() => {
    const editableElements = document.querySelectorAll('[data-editable]') as NodeListOf<EditableElement>;
    
    if (isEditMode) {
      editableElements.forEach(element => makeEditable(element));
    } else {
      editableElements.forEach(element => makeNonEditable(element));
    }
  }, [isEditMode, makeEditable, makeNonEditable]);

  // Create floating badge
  const createBadge = useCallback(() => {
    if (badgeRef.current) return;
    
    const badge = document.createElement('div');
    badge.className = 'fixed bottom-4 right-4 z-[9999] px-4 py-2 rounded-full shadow-lg transition-all duration-300';
    badge.style.backgroundColor = isEditMode ? '#10b981' : '#6b7280';
    badge.style.color = 'white';
    badge.style.fontWeight = 'bold';
    badge.style.fontSize = '14px';
    badge.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full ${isEditMode ? 'bg-white animate-pulse' : 'bg-gray-400'}"></div>
        <span>Edit Mode ${isEditMode ? 'ON' : 'OFF'}</span>
        <kbd class="px-2 py-1 text-xs bg-white/20 rounded">Ctrl+E</kbd>
      </div>
    `;
    
    document.body.appendChild(badge);
    badgeRef.current = badge;
    
    // Animate in
    badge.style.transform = 'translateY(100%)';
    badge.style.opacity = '0';
    setTimeout(() => {
      badge.style.transform = 'translateY(0)';
      badge.style.opacity = '1';
    }, 100);
  }, [isEditMode]);

  // Update badge
  const updateBadge = useCallback(() => {
    if (!badgeRef.current) return;
    
    badgeRef.current.style.backgroundColor = isEditMode ? '#10b981' : '#6b7280';
    badgeRef.current.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full ${isEditMode ? 'bg-white animate-pulse' : 'bg-gray-400'}"></div>
        <span>Edit Mode ${isEditMode ? 'ON' : 'OFF'}</span>
        <kbd class="px-2 py-1 text-xs bg-white/20 rounded">Ctrl+E</kbd>
      </div>
    `;
  }, [isEditMode]);

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
    setupEditableElements();
    
    return () => {
      // Cleanup all editable elements
      editableElementsRef.current.forEach(element => makeNonEditable(element));
      editableElementsRef.current.clear();
    };
  }, [isEditMode, setupEditableElements, makeNonEditable]);

  // Load saved content on mount
  useEffect(() => {
    loadSavedContent();
  }, [loadSavedContent]);

  // Create and update badge
  useEffect(() => {
    createBadge();
    updateBadge();
    
    return () => {
      // Remove badge on unmount
      if (badgeRef.current) {
        badgeRef.current.remove();
        badgeRef.current = null;
      }
    };
  }, [createBadge, updateBadge]);

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
    toggleEditMode
  };
};