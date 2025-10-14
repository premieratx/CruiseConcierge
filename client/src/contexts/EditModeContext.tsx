import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Edit mode context for managing edit state
interface EditModeContextType {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <EditModeContext.Provider value={{ isEditMode, setIsEditMode }}>
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

export function useContentBlockEditor(route: string, key: string) {
  const [pendingChanges, setPendingChanges] = useState<any>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
