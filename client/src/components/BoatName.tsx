import { useState } from 'react';
import { Ship } from 'lucide-react';
import BoatDetailsModal from './BoatDetailsModal';
import { cn } from '@/lib/utils';

interface BoatNameProps {
  boatId: 'ME_SEEKS_THE_IRONY' | 'DAY_TRIPPER' | 'CLEVER_GIRL';
  displayName?: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * Clickable boat name component that opens a modal with boat details and photos
 * Use this anywhere you mention a boat name to allow users to see photos and details
 */
export default function BoatName({ boatId, displayName, className, showIcon = false }: BoatNameProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const boatNames: Record<string, string> = {
    'ME_SEEKS_THE_IRONY': 'Meeseeks The Irony',
    'DAY_TRIPPER': 'Day Tripper',
    'CLEVER_GIRL': 'Clever Girl',
  };

  const name = displayName || boatNames[boatId];

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "inline-flex items-center gap-1 text-brand-blue hover:text-brand-blue/80 underline decoration-dotted underline-offset-2 transition-colors cursor-pointer font-semibold",
          className
        )}
        data-testid={`button-boat-${boatId.toLowerCase()}`}
      >
        {showIcon && <Ship className="h-4 w-4" />}
        {name}
      </button>
      
      <BoatDetailsModal
        boatId={boatId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

/**
 * Example usage:
 * 
 * <BoatName boatId="ME_SEEKS_THE_IRONY" />
 * <BoatName boatId="ME_SEEKS_THE_IRONY" showIcon />
 * <BoatName boatId="DAY_TRIPPER" className="text-lg" />
 */
