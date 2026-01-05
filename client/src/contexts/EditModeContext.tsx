// SSR FIX: Explicit React import needed for Node.js SSR environment
import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Edit mode context interface
type EditModeContextType = {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
};

// Create the context with undefined as default
const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

// Provider component
function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const value = { isEditMode, setIsEditMode };

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

// Custom hook to use the context
function useEditMode(): EditModeContextType {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
}

// Content block editor hook
function useContentBlockEditor(route: string, key: string) {
  const [pendingChanges, setPendingChanges] = useState<any>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  const updateBlock = (updates: any) => {
    setPendingChanges((prev: any) => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const resetChanges = () => {
    setPendingChanges({});
    setHasUnsavedChanges(false);
  };

  return {
    pendingChanges,
    updateBlock,
    hasUnsavedChanges,
    resetChanges
  };
}

export { EditModeProvider, useEditMode, useContentBlockEditor };
