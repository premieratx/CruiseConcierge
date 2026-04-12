import { Link } from 'wouter';
import { MessageSquare, Calendar } from 'lucide-react';

interface InlineCTABarProps {
  quoteText?: string;
  bookText?: string;
  variant?: 'navy' | 'amber' | 'slate';
}

export default function InlineCTABar({
  quoteText = 'Get a Free Quote',
  bookText = 'Book Now',
  variant = 'navy',
}: InlineCTABarProps) {
  const bg =
    variant === 'amber'
      ? 'bg-amber-50 border-amber-200'
      : variant === 'slate'
      ? 'bg-slate-50 border-slate-200'
      : 'bg-blue-50 border-blue-200';

  return (
    <div className={`${bg} border-y py-6 px-4`}>
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/chat">
          <button className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-full shadow transition-colors text-sm">
            <MessageSquare className="h-4 w-4" />
            {quoteText}
          </button>
        </Link>
        <div
          className="xola-custom xola-checkout"
          data-button-id="695186923c261203770cc2e7"
        >
          <button className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-black font-bold px-6 py-3 rounded-full shadow transition-colors text-sm">
            <Calendar className="h-4 w-4" />
            {bookText}
          </button>
        </div>
      </div>
    </div>
  );
}
