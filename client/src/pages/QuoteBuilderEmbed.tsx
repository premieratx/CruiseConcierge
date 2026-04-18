import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import AdminNoIndex from '@/components/AdminNoIndex';
import EmbeddedQuoteFlow from '@/components/EmbeddedQuoteFlow';

/**
 * QuoteBuilderEmbed — dedicated in-house quote page.
 *
 * Formerly iframed booking.premierpartycruises.com/quote-v2. Now renders
 * the native EmbeddedQuoteFlow so lead submission stays in-domain and
 * goes straight through the shared create-lead edge function.
 */
export default function QuoteBuilderEmbed() {
  return (
    <>
      <AdminNoIndex />
      <Helmet>
        <title>Get a Quote - Premier Party Cruises</title>
        <meta
          name="description"
          content="Get an instant quote for your private party cruise or disco cruise on Lake Travis. Book Day Tripper, Meeseeks, The Irony, Clever Girl, or ATX Disco boats."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Get Your Quote in Minutes</h1>
            <p className="text-lg text-blue-100">
              Select your date, boat, and party details to receive an instant quote for your Lake Travis adventure
            </p>
          </div>
        </div>

        <div
          id="quote-v2-widget-container"
          className="flex-1 w-full"
          style={{ margin: '2rem auto', maxWidth: '72rem', width: '100%', padding: '0 1rem' }}
        >
          <EmbeddedQuoteFlow source="quote_builder_embed_page" />
        </div>
      </div>
    </>
  );
}
