/**
 * /quote — public quote entry point.
 *
 * Previously this route shipped a bespoke multi-step QuoteNative form
 * that ended on a "Book now with deposit / Keep browsing" success
 * screen — a dead end that never created a lead or handed the customer
 * off to their dashboard.
 *
 * It now renders the same EmbeddedQuoteFlow used on the Pricing page
 * (and the home-page popup). That component posts to the Supabase
 * `create-lead` edge function and redirects the customer to
 * `/lead-dashboard?lead=<id>`, which is the new single source of truth
 * for everything post-quote: deposit, selection edits, sharing, etc.
 *
 * Pre-fill params from the old page (date/guests/duration/boat/
 * partyType/sourceType/sourceUrl) are still honored — they're pushed
 * into EmbeddedQuoteFlow via its props.
 */
import { Helmet } from "react-helmet-async";
import EmbeddedQuoteFlow from "@/components/EmbeddedQuoteFlow";

function useQueryParam(key: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const sp = new URLSearchParams(window.location.search);
  const v = sp.get(key);
  return v ?? undefined;
}

export default function QuoteNative() {
  const prefillPartyType = useQueryParam("partyType");
  const sourceType = useQueryParam("sourceType") ?? "quote_page_direct";

  return (
    <div className="ppc-quote-light" data-page-ready="quote-native" style={{ minHeight: "100vh", padding: "2rem 1rem" }}>
      <Helmet>
        <title>Get Your Quote · Premier Party Cruises · Lake Travis</title>
        <meta
          name="description"
          content="Instant pricing for Lake Travis party cruises. Tell us the date, boat, and group size — we'll build your live quote and open your personal lead dashboard in one click."
        />
      </Helmet>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            margin: "0 0 0.5rem",
            color: "hsl(240 14% 10%)",
          }}
        >
          Get your quote
        </h1>
        <p style={{ color: "hsl(240 8% 32%)", maxWidth: 640, margin: "0 0 2rem", lineHeight: 1.6 }}>
          Pick your date, party size, and boat — we'll build a live quote and open
          your personal dashboard with one-click deposit, shareable links, and
          add-on options. No obligation.
        </p>
        <EmbeddedQuoteFlow
          source={sourceType}
          {...(prefillPartyType ? { defaultPartyType: prefillPartyType } : {})}
        />
      </div>
    </div>
  );
}
