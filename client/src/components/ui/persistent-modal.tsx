import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

interface PersistentModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function PersistentModal({ open, onClose, children, className = '' }: PersistentModalProps) {
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop - always rendered, visibility controlled by CSS */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-200"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none'
        }}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Modal Content - always rendered, never unmounts */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${className}`}
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          visibility: open ? 'visible' : 'hidden'
        }}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
      >
        <div 
          className="relative bg-white rounded-lg shadow-xl max-w-[100vw] md:max-w-[95vw] w-full border-4 border-black max-h-[95vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-5 top-5 z-10 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg"
            onClick={onClose}
            data-testid="button-close-modal"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>

          {/* Content */}
          <div className="flex-1 overflow-y-auto" tabIndex={0}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
