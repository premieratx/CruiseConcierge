import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// EditMode context for inline editing functionality - cache bust fix
interface EditModeContextType {
  isEditMode: boolean;
  setEditMode: (enabled: boolean) => void;
  toggleEditMode: () => void;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  unsavedChanges: Record<string, any>;
  setUnsavedChanges: (changes: Record<string, any>) => void;
  saveChanges: () => Promise<void>;
  discardChanges: () => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

interface EditModeProviderProps {
  children: ReactNode;
}

export function EditModeProvider({ children }: EditModeProviderProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, any>>({});

  const setEditMode = (enabled: boolean) => {
    setIsEditMode(enabled);
    
    // Add visual class to document when edit mode is active
    if (enabled) {
      document.documentElement.classList.add('edit-mode');
    } else {
      document.documentElement.classList.remove('edit-mode');
      // Clear unsaved changes when exiting edit mode
      if (!isDirty) {
        setUnsavedChanges({});
      }
    }
  };

  const toggleEditMode = () => {
    setEditMode(!isEditMode);
  };

  const saveChanges = async () => {
    try {
      // Implement batch save of all unsaved changes
      const promises = Object.entries(unsavedChanges).map(async ([blockKey, changes]) => {
        const [route, key] = blockKey.split('::');
        
        const response = await fetch(`/api/content-blocks/${encodeURIComponent(route)}/${encodeURIComponent(key)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(changes),
        });

        if (!response.ok) {
          throw new Error(`Failed to save ${blockKey}: ${response.statusText}`);
        }

        return response.json();
      });

      await Promise.all(promises);
      
      // Clear unsaved changes after successful save
      setUnsavedChanges({});
      setIsDirty(false);
      
      console.log('✅ All changes saved successfully');
    } catch (error) {
      console.error('❌ Failed to save changes:', error);
      throw error;
    }
  };

  const discardChanges = () => {
    setUnsavedChanges({});
    setIsDirty(false);
    
    // Force refresh of content blocks by triggering a page reload or state reset
    window.location.reload();
  };

  // Update dirty state when unsaved changes exist
  useEffect(() => {
    setIsDirty(Object.keys(unsavedChanges).length > 0);
  }, [unsavedChanges]);

  // Prevent navigation when there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        setEditMode,
        toggleEditMode,
        isDirty,
        setIsDirty,
        unsavedChanges,
        setUnsavedChanges,
        saveChanges,
        discardChanges,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
}

// Helper hook for individual content blocks
export function useContentBlockEditor(route: string, key: string) {
  const { isEditMode, unsavedChanges, setUnsavedChanges } = useEditMode();
  const blockKey = `${route}::${key}`;
  
  const updateBlock = (changes: any) => {
    if (!isEditMode) return;
    
    setUnsavedChanges(prev => ({
      ...prev,
      [blockKey]: {
        ...prev[blockKey],
        ...changes,
      },
    }));
  };

  const hasUnsavedChanges = blockKey in unsavedChanges;
  const pendingChanges = unsavedChanges[blockKey] || {};

  return {
    isEditMode,
    updateBlock,
    hasUnsavedChanges,
    pendingChanges,
  };
}