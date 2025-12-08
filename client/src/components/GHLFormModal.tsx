import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface GHLFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GHLFormModal({ isOpen, onClose }: GHLFormModalProps) {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isOpen) {
      onClose();
      navigate('/chat');
    }
  }, [isOpen, onClose, navigate]);

  return null;
}

// Global trigger function that can be called from anywhere
let globalOpenGHLForm: (() => void) | null = null;

export function setGlobalGHLFormTrigger(openFn: () => void) {
  globalOpenGHLForm = openFn;
}

export function openGHLForm() {
  if (globalOpenGHLForm) {
    globalOpenGHLForm();
  } else {
    console.warn('[GHL Form] Modal trigger not initialized yet');
  }
}
