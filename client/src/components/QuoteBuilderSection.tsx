/**
 * QuoteBuilderSection — in-house quote flow, wrapped in the blue/purple
 * hero shell that blog + marketing pages already import.
 *
 * Previously this component cross-origin-iframed booking.premierpartycruises.com.
 * Now it renders the native `EmbeddedQuoteFlow` component so the quote pipeline
 * stays in-domain (same create-lead edge function, same GHL + Sheets triggers)
 * and there's no iframe / third-party load penalty.
 *
 * Every `<QuoteBuilderSection />` site-wide picks up this change automatically.
 */
import EmbeddedQuoteFlow from "@/components/EmbeddedQuoteFlow";

export default function QuoteBuilderSection() {
  return (
    <section
      id="quote-builder"
      className="py-16 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700"
      style={{ position: "relative", zIndex: 0 }}
    >
      <div className="container mx-auto px-0 md:px-6">
        <div className="text-center mb-8">
          <h2
            className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide mb-3"
            data-editable
            data-editable-id="quote-builder-button"
          >
            Please request your quote to view pricing, availability, and to access exclusive discounts.
          </h2>
          <p className="text-white/90 text-base sm:text-lg md:text-xl border-b-4 border-brand-yellow inline-block pb-3">
            Select your cruise date.
          </p>
        </div>

        <div className="overflow-visible">
          <div className="w-full md:max-w-6xl mx-auto">
            <div
              id="quote-v2-widget-container"
              className="bg-white rounded-none md:rounded-2xl shadow-2xl overflow-hidden"
              style={{ width: "100%", position: "relative", margin: "0" }}
            >
              <EmbeddedQuoteFlow
                source="embedded_quote_section"
                eyebrow="Instant quote · No obligation"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
