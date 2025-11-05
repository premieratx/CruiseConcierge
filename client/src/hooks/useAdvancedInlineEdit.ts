import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface EditableElement extends HTMLElement {
  __originalContent?: string;
  __elementId?: string;
  __isLink?: boolean;
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

export const useAdvancedInlineEdit = () => {
  const canEdit = isReplitEditor();
  const [isEditMode, setIsEditMode] = useState(false);
  const [location] = useLocation();
  const { toast } = useToast();
  const editableElementsRef = useRef<Set<EditableElement>>(new Set());
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const [editableCount, setEditableCount] = useState(0);
  const currentPage = getPageName(location);
  const [editingLink, setEditingLink] = useState<HTMLAnchorElement | null>(null);

  // Find ALL text-containing elements
  const findAllTextElements = useCallback((): NodeListOf<HTMLElement> => {
    // Select all elements that typically contain text
    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span', 'div', 'li', 'td', 'th',
      'label', 'button:not([data-no-edit])',
      'a', '[data-editable]'
    ];
    
    return document.querySelectorAll(selectors.join(', ')) as NodeListOf<HTMLElement>;
  }, []);

  // Check if element should be editable
  const shouldBeEditable = (element: HTMLElement): boolean => {
    // Skip if already marked as non-editable
    if (element.hasAttribute('data-no-edit')) return false;
    
    // Skip if inside navigation, footer, or admin components
    const skipParents = ['nav', 'footer', '[data-no-edit]', '.no-edit'];
    for (const selector of skipParents) {
      if (element.closest(selector)) return false;
    }
    
    // Skip if element is empty or only whitespace
    const text = element.textContent?.trim();
    if (!text || text.length === 0) return false;
    
    // Skip if element contains other block elements (to avoid editing containers)
    const hasBlockChildren = element.querySelector('div, p, h1, h2, h3, h4, h5, h6, ul, ol');
    if (hasBlockChildren && element.tagName !== 'A') return false;
    
    return true;
  };

  // Save content to localStorage
  const saveContent = useCallback((element: EditableElement, content?: string) => {
    const elementId = element.__elementId;
    const textContent = content !== undefined ? content : (element.textContent || '');

    if (elementId && textContent.trim()) {
      const storageKey = `content_${location}_${elementId}`;
      localStorage.setItem(storageKey, textContent);
      
      // If it's a link, also save href
      if (element.tagName === 'A') {
        const href = (element as HTMLAnchorElement).getAttribute('href');
        if (href) {
          localStorage.setItem(`${storageKey}_href`, href);
        }
      }

      toast({
        title: "Saved!",
        description: "Content saved successfully",
        duration: 1500,
      });
    }
  }, [location, toast]);

  // Load saved content
  const loadSavedContent = useCallback(() => {
    const allElements = findAllTextElements();
    
    allElements.forEach((element, index) => {
      if (!shouldBeEditable(element)) return;
      
      const elementId = element.getAttribute('data-editable-id') || 
                       element.getAttribute('id') || 
                       generateElementId(element, index);

      const storageKey = `content_${location}_${elementId}`;
      const savedContent = localStorage.getItem(storageKey);

      if (savedContent) {
        (element as EditableElement).__originalContent = element.textContent || '';
        element.textContent = savedContent;
      }
      
      // Load saved href for links
      if (element.tagName === 'A') {
        const savedHref = localStorage.getItem(`${storageKey}_href`);
        if (savedHref) {
          (element as HTMLAnchorElement).setAttribute('href', savedHref);
        }
      }

      (element as EditableElement).__elementId = elementId;
    });
  }, [location, findAllTextElements]);

  // Show link editor modal
  const showLinkEditor = useCallback((link: HTMLAnchorElement) => {
    const href = link.getAttribute('href') || '';
    const text = link.textContent || '';
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-black/50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-2xl max-w-md w-full mx-4">
        <h3 class="text-lg font-bold mb-4">Edit Link</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Link Text</label>
            <input 
              type="text" 
              id="link-text-input" 
              value="${text}" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">URL (href)</label>
            <input 
              type="text" 
              id="link-href-input" 
              value="${href}" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="/page or https://..."
            />
          </div>
          <div class="flex gap-2 justify-end">
            <button 
              id="link-cancel" 
              class="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button 
              id="link-save" 
              class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const textInput = modal.querySelector('#link-text-input') as HTMLInputElement;
    const hrefInput = modal.querySelector('#link-href-input') as HTMLInputElement;
    const saveBtn = modal.querySelector('#link-save');
    const cancelBtn = modal.querySelector('#link-cancel');
    
    const closeModal = () => {
      modal.remove();
      setEditingLink(null);
    };
    
    saveBtn?.addEventListener('click', () => {
      const newText = textInput.value;
      const newHref = hrefInput.value;
      
      link.textContent = newText;
      link.setAttribute('href', newHref);
      
      saveContent(link as EditableElement, newText);
      
      closeModal();
    });
    
    cancelBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    textInput.focus();
  }, [saveContent]);

  // Make element editable
  const makeEditable = useCallback((element: EditableElement) => {
    const isLink = element.tagName === 'A';
    
    if (isLink) {
      element.__isLink = true;
      element.style.cursor = 'pointer';
      element.style.outline = 'none';
      element.style.transition = 'all 0.3s ease';
      
      const handleLinkClick = (e: Event) => {
        if (isEditMode) {
          e.preventDefault();
          e.stopPropagation();
          showLinkEditor(element as HTMLAnchorElement);
        }
      };
      
      element.addEventListener('click', handleLinkClick);
      (element as any).__linkClickHandler = handleLinkClick;
    } else {
      element.contentEditable = 'true';
      element.style.cursor = 'text';
      element.style.outline = 'none';
      element.style.transition = 'all 0.3s ease';
    }

    // Add hover effect
    const handleMouseEnter = () => {
      if (isEditMode) {
        element.style.backgroundColor = isLink ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 235, 59, 0.25)';
        element.style.boxShadow = isLink ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : '0 0 0 2px rgba(255, 235, 59, 0.5)';
        element.style.transform = 'scale(1.01)';
      }
    };

    const handleMouseLeave = () => {
      element.style.backgroundColor = '';
      element.style.boxShadow = '';
      element.style.transform = '';
    };

    // Handle editing (for non-links)
    if (!isLink) {
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

      element.addEventListener('keydown', handleKeyDown);
      element.addEventListener('blur', handleBlur);
      element.addEventListener('focus', handleFocus);

      (element as any).__textHandlers = { handleKeyDown, handleBlur, handleFocus };
    }

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    (element as any).__hoverHandlers = { handleMouseEnter, handleMouseLeave };

    editableElementsRef.current.add(element);
  }, [isEditMode, saveContent, showLinkEditor]);

  // Make element non-editable
  const makeNonEditable = useCallback((element: EditableElement) => {
    if (element.__isLink) {
      const handler = (element as any).__linkClickHandler;
      if (handler) {
        element.removeEventListener('click', handler);
      }
    } else {
      element.contentEditable = 'false';
    }
    
    element.style.cursor = '';
    element.style.backgroundColor = '';
    element.style.boxShadow = '';
    element.style.transform = '';

    // Cleanup listeners
    const hoverHandlers = (element as any).__hoverHandlers;
    if (hoverHandlers) {
      element.removeEventListener('mouseenter', hoverHandlers.handleMouseEnter);
      element.removeEventListener('mouseleave', hoverHandlers.handleMouseLeave);
    }

    const textHandlers = (element as any).__textHandlers;
    if (textHandlers) {
      element.removeEventListener('keydown', textHandlers.handleKeyDown);
      element.removeEventListener('blur', textHandlers.handleBlur);
      element.removeEventListener('focus', textHandlers.handleFocus);
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
          description: "Click any text to edit it. Click links to edit text & URL. Press Ctrl+E to exit.",
          duration: 4000,
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
    const allElements = findAllTextElements();
    let count = 0;

    if (isEditMode) {
      allElements.forEach((element, index) => {
        if (!shouldBeEditable(element)) return;
        
        const editableElement = element as EditableElement;
        
        if (!editableElement.__elementId) {
          editableElement.__elementId = element.getAttribute('data-editable-id') || 
                                       element.getAttribute('id') || 
                                       generateElementId(element, index);
        }
        
        makeEditable(editableElement);
        count++;
      });
    } else {
      editableElementsRef.current.forEach(element => makeNonEditable(element));
    }

    setEditableCount(count);
  }, [isEditMode, findAllTextElements, makeEditable, makeNonEditable]);

  // Create floating badge
  const createBadge = useCallback(() => {
    if (badgeRef.current || !isEditMode) return;

    const badge = document.createElement('div');
    badge.className = 'fixed bottom-4 right-4 z-[9999] px-5 py-3 rounded-xl shadow-2xl transition-all duration-500 backdrop-blur-md';
    badge.style.backgroundColor = 'rgba(16, 185, 129, 0.95)';
    badge.style.color = 'white';
    badge.style.fontWeight = '600';
    badge.style.fontSize = '14px';
    badge.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    badge.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    badge.innerHTML = `
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-3">
          <div class="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
          <span style="font-weight: 700;">Edit Mode ON</span>
          <kbd class="px-2 py-1 text-xs bg-white/20 rounded" style="font-family: monospace;">Ctrl+E</kbd>
        </div>
        <div class="text-xs opacity-90" style="display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>📄 Page: <strong>${currentPage}</strong></span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>✏️ ${editableCount} editable elements</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>🔗 Click links to edit URL & text</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; color: #fbbf24;">
            <span style="font-weight: 500;">⚡ Replit Editor Only</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(badge);
    badgeRef.current = badge;
  }, [isEditMode, currentPage, editableCount]);

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
    const timer = setTimeout(() => {
      setupEditableElements();
    }, 100);

    return () => {
      clearTimeout(timer);
      editableElementsRef.current.forEach(element => makeNonEditable(element));
      editableElementsRef.current.clear();
    };
  }, [isEditMode, setupEditableElements, makeNonEditable]);

  // Load saved content on mount
  useEffect(() => {
    loadSavedContent();

    if (isEditMode) {
      const timer = setTimeout(() => {
        setupEditableElements();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [loadSavedContent, location, isEditMode, setupEditableElements]);

  // Create and update badge
  useEffect(() => {
    if (isEditMode && canEdit) {
      createBadge();
    } else {
      if (badgeRef.current) {
        badgeRef.current.remove();
        badgeRef.current = null;
      }
    }

    return () => {
      if (badgeRef.current) {
        badgeRef.current.remove();
        badgeRef.current = null;
      }
    };
  }, [isEditMode, canEdit, createBadge]);

  // Watch for DOM changes
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
    canEdit,
  };
};
