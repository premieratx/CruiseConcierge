import { useAdvancedInlineEdit } from '@/hooks/useAdvancedInlineEdit';

/**
 * GlobalInlineEditor - Enables site-wide inline editing for all text and hyperlinks
 * Activated with Ctrl+E in Replit Editor
 */
export function GlobalInlineEditor() {
  // This hook automatically sets up inline editing for ALL text elements and links
  useAdvancedInlineEdit();
  
  // This component doesn't render anything visible
  return null;
}
