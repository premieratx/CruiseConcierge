import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface GHLFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GHLFormModal({ isOpen, onClose }: GHLFormModalProps) {
  const [iframeHeight, setIframeHeight] = useState(600);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Listen for height messages from GHL form
      if (event.origin === 'https://events.premierpartycruises.com') {
        if (event.data.type === 'ghl-form-resize' && event.data.height) {
          setIframeHeight(Math.max(event.data.height, 600));
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0"
        aria-describedby="ghl-form-description"
      >
        <DialogTitle className="sr-only">Get Your Quote</DialogTitle>
        <div id="ghl-form-description" className="sr-only">
          Fill out this form to get a custom quote for your Lake Travis party cruise
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground bg-white p-2 shadow-lg"
          data-testid="button-close-ghl-modal"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* GHL Form iframe */}
        <div className="w-full" style={{ minHeight: `${iframeHeight}px` }}>
          <iframe
            src="https://events.premierpartycruises.com/widget/form/X1zEKdfbmjqs2hBHWNN1"
            style={{
              width: '100%',
              height: `${iframeHeight}px`,
              border: 'none',
              overflow: 'hidden'
            }}
            scrolling="no"
            id="ghl-form-iframe"
            title="Get Your Quote - Premier Party Cruises"
            data-testid="iframe-ghl-form"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
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
