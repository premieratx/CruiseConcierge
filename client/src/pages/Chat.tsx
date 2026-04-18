import AdminNoIndex from '@/components/AdminNoIndex';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { useEffect } from 'react';
import EmbeddedQuoteFlow from '@/components/EmbeddedQuoteFlow';
const logoPath = '/attached_assets/PPC Logo LARGE_1757881944449.png';

interface ChatProps {
  defaultEventType?: string;
}

/**
 * Chat (Get Quote) page — fresh in-house quote flow.
 *
 * Previously iframed booking.premierpartycruises.com/quote-v2. Now uses
 * the in-domain EmbeddedQuoteFlow so submissions go straight to the
 * shared create-lead edge function with no cross-origin roundtrip.
 */
export default function Chat({ defaultEventType }: ChatProps = {}) {
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Map legacy event types -> EmbeddedQuoteFlow partyType values.
  const partyType = (() => {
    switch (defaultEventType) {
      case 'bachelor':
      case 'bachelor_party':
        return 'bachelor_party';
      case 'bachelorette':
      case 'bachelorette_party':
        return 'bachelorette_party';
      case 'corporate':
      case 'corporate_event':
        return 'corporate_event';
      case 'wedding':
      case 'wedding_event':
        return 'wedding_event';
      case 'birthday':
      case 'birthday_party':
        return 'birthday_party';
      default:
        return 'bachelorette_party';
    }
  })();

  return (
    <>
      <AdminNoIndex />
      <Helmet>
        <title>Get Quote | Austin Party Boat Rentals</title>
        <meta
          name="description"
          content="Get instant quote for Lake Travis boat rentals. Austin party cruises for bachelor/bachelorette parties & events. Quick online booking!"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="w-full max-h-[250px] md:max-h-none overflow-hidden">
          <div className="flex items-center justify-center gap-2 px-2 py-1 md:flex-col md:py-3 md:gap-1">
            <img src={logoPath} alt="Premier Party Cruises" className="h-9 w-auto md:h-14" />
            <div className="text-left md:text-center">
              <h1 className="text-base md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight tracking-tight">
                Welcome Aboard!
              </h1>
              <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 leading-tight">
                Lake Travis Premium Boat Charters
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 px-2 pb-1 md:gap-4 md:pb-3 text-[10px] md:text-xs text-slate-500 flex-wrap">
            <span>16 Years</span>
            <span className="text-slate-300">•</span>
            <span>150K Customers</span>
            <span className="text-slate-300">•</span>
            <span>5-Star Reviews</span>
            <span className="text-slate-300">•</span>
            <span>14-75 Guests</span>
          </div>
        </div>

        <div
          id="quote-v2-widget-container"
          className="max-w-5xl mx-auto px-2 md:px-4 py-2 md:py-6"
        >
          <EmbeddedQuoteFlow source="chat_page" defaultPartyType={partyType} />
        </div>
      </div>
    </>
  );
}
