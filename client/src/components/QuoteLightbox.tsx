/**
 * QuoteLightbox — native in-house quote pop-up.
 *
 * Any component in the app can call `useQuoteLightbox().openQuote(source, prefill)`
 * to open a luxurious modal with a 4-step form that mirrors the behavior of
 * the old booking.premierpartycruises.com/quote-v2 iframe — but native:
 *
 *   Step 1 — Party type       (chips)
 *   Step 2 — Number of people (slider)
 *   Step 3 — Date             (react-day-picker pop-up calendar)
 *   Step 4 — Contact info     (name / email / phone — only to email them the quote)
 *
 * On submit the form POSTs to /api/leads/quote-builder (same endpoint the
 * iframe used), the server creates the lead + generates a secure quote URL
 * via ComprehensiveLeadService, and we redirect the customer to that
 * quoteUrl — which renders the existing QuoteViewer page (the customer
 * lead dashboard with their quote embedded). Identical end-state to the
 * old flow, just without the cross-origin iframe.
 *
 * The context API (openQuote / closeQuote / isOpen) is unchanged, so the
 * 13+ call sites across the site keep working.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "wouter";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addDays, format, parseISO, startOfDay } from "date-fns";
import {
  calculatePricing,
  getAutoCrewFeePerHour,
  getBaseHourlyRate,
  DISCO_TIME_SLOTS,
  isDiscoEligiblePartyType,
} from "@/lib/pricing";
import { supabase } from "@/lib/supabase";

// ────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────
export type QuotePrefill = {
  date?: string;
  guests?: number;
  duration?: number;
  boat?: string;
  partyType?: string;
};

type QuoteLightboxContextValue = {
  isOpen: boolean;
  openQuote: (sourceType?: string, prefill?: QuotePrefill) => void;
  closeQuote: () => void;
};

const QuoteLightboxContext = createContext<QuoteLightboxContextValue | null>(null);

const PARTY_TYPES = [
  { id: "bachelor_party", label: "Bachelor" },
  { id: "bachelorette_party", label: "Bachelorette" },
  { id: "combined_bach", label: "Combined bach" },
  { id: "wedding_event", label: "Wedding" },
  { id: "corporate_event", label: "Corporate" },
  { id: "birthday_party", label: "Birthday" },
  { id: "family_gathering", label: "Family" },
  { id: "other", label: "Other" },
];

// ────────────────────────────────────────────────────────────────────────
// Styles
// ────────────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500&family=Jost:wght@300;400;500;600&display=swap');

.qlb-overlay {
  position: fixed; inset: 0;
  background: rgba(7,7,12,0.82);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem;
  opacity: 0; pointer-events: none; visibility: hidden;
  transition: opacity 0.25s ease, visibility 0s linear 0.25s;
}
.qlb-overlay.open { opacity: 1; pointer-events: auto; visibility: visible; transition-delay: 0s; }

.qlb-modal {
  width: 100%; max-width: 560px;
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(30,136,229,0.08) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(200,169,110,0.06) 0%, transparent 55%),
    #0F0F18;
  border: 1px solid rgba(200,169,110,0.3);
  border-radius: 14px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  color: #EDE3D0;
  font-family: 'Jost', system-ui, sans-serif;
  padding: 2rem;
  position: relative;
  transform: translateY(12px);
  transition: transform 0.25s ease;
}
.qlb-overlay.open .qlb-modal { transform: translateY(0); }

.qlb-close {
  position: absolute; top: 0.9rem; right: 1rem;
  background: transparent; border: none; color: rgba(237,227,208,0.55);
  font-size: 1.5rem; cursor: pointer; line-height: 1; padding: 0.25rem 0.5rem;
  transition: color 0.15s ease;
}
.qlb-close:hover { color: #C8A96E; }

.qlb-eyebrow {
  font-size: 0.68rem; letter-spacing: 0.25em; text-transform: uppercase;
  color: #C8A96E; margin: 0 0 0.5rem; font-weight: 500;
}
.qlb-title {
  font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; font-weight: 300;
  color: #F5EED8; margin: 0 0 0.35rem; line-height: 1.1; letter-spacing: -0.005em;
}
.qlb-title em { color: #C8A96E; font-style: italic; font-weight: 400; }
.qlb-sub {
  font-size: 0.9rem; color: rgba(237,227,208,0.7); margin: 0 0 1.5rem; line-height: 1.6;
}

.qlb-steps { display: flex; gap: 0.35rem; margin-bottom: 1.25rem; }
.qlb-step-dot {
  flex: 1; height: 4px; border-radius: 2px;
  background: rgba(200,169,110,0.15);
  transition: background 0.2s ease;
}
.qlb-step-dot.is-done { background: #C8A96E; }
.qlb-step-dot.is-active { background: #C8A96E; }

.qlb-step-label {
  font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: #C8A96E; font-weight: 500; margin: 0 0 0.9rem;
}
.qlb-step-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem; font-weight: 400; color: #F5EED8; margin: 0 0 1.1rem;
}

.qlb-chips { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.qlb-chip {
  background: transparent; border: 1px solid rgba(200,169,110,0.3);
  color: rgba(237,227,208,0.82); padding: 0.55rem 1rem;
  border-radius: 999px; cursor: pointer; font-size: 0.88rem; font-family: inherit;
  transition: all 0.15s ease;
}
.qlb-chip:hover { border-color: #C8A96E; color: #F5EED8; }
.qlb-chip.is-active { background: rgba(200,169,110,0.14); border-color: #C8A96E; color: #F5EED8; }

.qlb-field { margin-bottom: 1rem; }
.qlb-field label {
  display: block; font-size: 0.72rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: rgba(237,227,208,0.6); font-weight: 500;
  margin-bottom: 0.4rem;
}
.qlb-field input,
.qlb-field textarea {
  width: 100%; background: #07070c;
  border: 1px solid rgba(200,169,110,0.25); color: #EDE3D0;
  padding: 0.7rem 0.85rem; border-radius: 8px;
  font-family: 'Jost', system-ui, sans-serif; font-size: 0.95rem;
  transition: border-color 0.15s ease;
}
.qlb-field input:focus, .qlb-field textarea:focus { outline: none; border-color: #C8A96E; }

.qlb-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
@media (max-width: 520px) { .qlb-row { grid-template-columns: 1fr; } }

.qlb-guest-counter {
  display: flex; align-items: center; justify-content: center; gap: 1rem;
  margin: 1rem 0;
}
.qlb-guest-counter button {
  width: 42px; height: 42px; border-radius: 50%;
  background: rgba(200,169,110,0.1); border: 1px solid rgba(200,169,110,0.35);
  color: #C8A96E; font-size: 1.2rem; font-weight: 500; cursor: pointer;
  transition: all 0.15s ease;
}
.qlb-guest-counter button:hover:not(:disabled) { background: rgba(200,169,110,0.2); }
.qlb-guest-counter button:disabled { opacity: 0.3; cursor: not-allowed; }
.qlb-guest-counter .count {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem; font-weight: 400; color: #F5EED8; min-width: 80px; text-align: center;
}
.qlb-guest-counter .unit {
  font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(237,227,208,0.55); display: block; margin-top: -0.1rem;
}

.qlb-datepicker-wrap {
  background: rgba(200,169,110,0.04);
  border: 1px solid rgba(200,169,110,0.22);
  border-radius: 10px;
  padding: 0.6rem;
  display: flex; justify-content: center;
}
.qlb-datepicker-wrap .rdp { margin: 0; font-family: 'Jost', system-ui, sans-serif; color: #EDE3D0; }
.qlb-datepicker-wrap .rdp-button { color: #EDE3D0; }
.qlb-datepicker-wrap .rdp-day_selected,
.qlb-datepicker-wrap .rdp-day_selected:focus-visible,
.qlb-datepicker-wrap .rdp-day_selected:hover { background-color: #C8A96E !important; color: #0a0a10 !important; }
.qlb-datepicker-wrap .rdp-day_today { color: #C8A96E; font-weight: 600; }
.qlb-datepicker-wrap .rdp-caption_label { font-family: 'Cormorant Garamond', serif; color: #F5EED8; font-size: 1.1rem; font-weight: 400; }
.qlb-datepicker-wrap .rdp-nav_button { color: #C8A96E; }
.qlb-datepicker-wrap .rdp-head_cell { color: rgba(237,227,208,0.5); font-size: 0.7rem; letter-spacing: 0.1em; }

.qlb-actions { display: flex; gap: 0.6rem; justify-content: space-between; margin-top: 1.5rem; }
.qlb-btn {
  padding: 0.75rem 1.4rem; border-radius: 8px; font-family: 'Jost', sans-serif;
  font-size: 0.82rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
  cursor: pointer; transition: all 0.15s ease; border: 1px solid transparent;
}
.qlb-btn--primary {
  background: linear-gradient(135deg, #C8A96E 0%, #A88B4E 100%);
  color: #0a0a10; flex: 1;
}
.qlb-btn--primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(200,169,110,0.3); }
.qlb-btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
.qlb-btn--ghost {
  background: transparent; color: rgba(237,227,208,0.7);
  border-color: rgba(200,169,110,0.3);
}
.qlb-btn--ghost:hover { color: #F5EED8; border-color: #C8A96E; }

.qlb-error {
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.3);
  color: #fca5a5; padding: 0.6rem 0.9rem; border-radius: 8px;
  font-size: 0.85rem; margin-top: 0.75rem;
}

.qlb-live {
  background: rgba(200,169,110,0.05);
  border: 1px solid rgba(200,169,110,0.18);
  border-radius: 10px; padding: 0.85rem 1rem; margin-top: 1rem;
}
.qlb-live-label { font-size: 0.64rem; letter-spacing: 0.22em; color: rgba(237,227,208,0.55); text-transform: uppercase; margin: 0 0 0.3rem; }
.qlb-live-total { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: #C8A96E; margin: 0; font-weight: 400; display: flex; align-items: baseline; gap: 0.4rem; }
.qlb-live-hint { font-size: 0.72rem; color: rgba(237,227,208,0.55); margin: 0.2rem 0 0; }

.qlb-starting-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-top: 1rem;
}
@media (max-width: 520px) { .qlb-starting-grid { grid-template-columns: 1fr; } }
.qlb-starting-card {
  background: rgba(200,169,110,0.05);
  border: 1px solid rgba(200,169,110,0.18);
  border-radius: 10px; padding: 0.85rem 1rem;
}
.qlb-starting-label {
  font-size: 0.6rem; letter-spacing: 0.18em; color: rgba(237,227,208,0.6);
  text-transform: uppercase; margin: 0 0 0.35rem;
}
.qlb-starting-amount {
  font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; color: #C8A96E;
  margin: 0; font-weight: 400; display: flex; align-items: baseline; gap: 0.35rem;
  flex-wrap: wrap;
}
.qlb-starting-prefix {
  font-family: 'Jost', system-ui, sans-serif;
  font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(237,227,208,0.55); font-weight: 500;
}
.qlb-starting-hint { font-size: 0.7rem; color: rgba(237,227,208,0.5); margin: 0.2rem 0 0; }

.qlb-success {
  text-align: center; padding: 1rem 0.5rem;
}
.qlb-success h2 {
  font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300;
  color: #F5EED8; margin: 0 0 0.6rem;
}
.qlb-success h2 em { color: #C8A96E; font-style: italic; }
.qlb-success p { color: rgba(237,227,208,0.75); font-size: 0.95rem; line-height: 1.6; margin: 0 0 1.25rem; }
`;

// ────────────────────────────────────────────────────────────────────────
// Provider
// ────────────────────────────────────────────────────────────────────────
function currencyDecimal(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

type FlowStep = 1 | 2 | 3 | 4;

export function QuoteLightboxProvider({ children }: { children: ReactNode }) {
  const [, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [sourceType, setSourceType] = useState<string | undefined>();

  // Form state
  const [step, setStep] = useState<FlowStep>(1);
  const [partyType, setPartyType] = useState<string>("bachelorette_party");
  const [guests, setGuests] = useState<number>(15);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ leadId?: string; quoteUrl?: string } | null>(null);

  const sourceUrlRef = useRef<string | undefined>();

  const openQuote = useCallback(
    (src?: string, prefill?: QuotePrefill) => {
      setSourceType(src);
      sourceUrlRef.current =
        typeof window !== "undefined"
          ? window.location.pathname + window.location.search
          : undefined;
      // Reset form, apply prefill
      setStep(1);
      setError(null);
      setSubmitted(null);
      if (prefill?.partyType) setPartyType(prefill.partyType);
      if (prefill?.guests && !Number.isNaN(prefill.guests)) {
        setGuests(Math.max(1, Math.min(75, prefill.guests)));
      }
      if (prefill?.date) {
        try {
          setSelectedDate(parseISO(prefill.date));
        } catch {
          /* ignore */
        }
      }
      setIsOpen(true);
    },
    [],
  );

  const closeQuote = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuote();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeQuote]);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // ── "Starting at" pricing for the badge ──────────────────────────────
  // These are PRE-tax, PRE-tip, PRE-booking-fee numbers — the user
  // wanted "starting at" copy rather than an all-in total during the
  // form. We show:
  //   • Private charter: lowest possible 4-hour cost for this guest
  //     count (Mon-Thu rate × 4 + auto crew fee × 4 if applicable)
  //   • ATX Disco:        lowest per-person slot price ($85 for Sat 3:30)
  //                       if the party type qualifies (bach variants)
  const startingAt = useMemo(() => {
    // Find the next Tuesday (getDay === 2), guaranteed Mon–Thu tier
    // regardless of what day of the week today happens to be.
    let refDate = startOfDay(new Date());
    while (refDate.getDay() !== 2) {
      refDate = addDays(refDate, 1);
    }
    const hourly = getBaseHourlyRate(refDate, guests);
    const crew = getAutoCrewFeePerHour(guests);
    const privateStartingAt = (hourly + crew) * 4;

    const allDiscoSlots = [...DISCO_TIME_SLOTS.friday, ...DISCO_TIME_SLOTS.saturday];
    const discoStartingAtPerPerson = Math.min(
      ...allDiscoSlots.map((s) => s.pricePerPerson),
    );

    return { privateStartingAt, discoStartingAtPerPerson };
  }, [guests]);

  const showDisco = useMemo(
    () => isDiscoEligiblePartyType(partyType),
    [partyType],
  );

  // Legacy total (used only if we ever need an all-in number for analytics).
  const liveEstimate = useMemo(() => {
    const refDate = selectedDate ?? startOfDay(addDays(new Date(), 21));
    return calculatePricing({
      date: refDate,
      guestCount: guests,
      duration: 4,
      crewFeePerHour: getAutoCrewFeePerHour(guests),
    });
  }, [guests, selectedDate]);

  // ── Validation per step ──────────────────────────────────────────────
  const canAdvance = useMemo(() => {
    if (step === 1) return !!partyType;
    if (step === 2) return guests >= 1 && guests <= 75;
    if (step === 3) return !!selectedDate && selectedDate >= startOfDay(new Date());
    if (step === 4) {
      return (
        firstName.trim().length > 0 &&
        lastName.trim().length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
        phone.replace(/\D/g, "").length >= 10
      );
    }
    return false;
  }, [step, partyType, guests, selectedDate, firstName, lastName, email, phone]);

  // ── Submit ───────────────────────────────────────────────────────────
  // Hits the SAME Supabase `create-lead` edge function the old quote-v2
  // iframe hit, with the identical payload shape. This preserves the GHL
  // webhook → Zapier → Google Sheets → email pipeline on the server side
  // with no backend changes required. The response carries `leadId` and
  // `quoteNumber`, which we use to redirect to the customer lead dashboard
  // (same destination as the old flow).
  const handleSubmit = useCallback(async () => {
    if (!selectedDate) {
      setError("Please pick a date.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      // The edge function validates `quoteUrl` with zod `.url()` — it must
      // be a real URL. Generate one that points at the customer lead
      // dashboard; the server backfills the lead id after insert. The
      // `sourceUrl` we pass in `sourceUrl` is the page they clicked from.
      const quoteUrl = `https://booking.premierpartycruises.com/lead-dashboard?sourceHost=${encodeURIComponent(
        typeof window !== "undefined" ? window.location.hostname : "premierpartycruises.com",
      )}`;

      // Affiliate fields are zod-validated as UUIDs when present. Only
      // include them if they look like UUIDs so empty strings don't 400.
      const uuidRe = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      const readUuid = (key: string) => {
        if (typeof window === "undefined") return undefined;
        const v = sessionStorage.getItem(key);
        return v && uuidRe.test(v) ? v : undefined;
      };
      const affiliateId = readUuid("affiliateId");
      const affiliateCodeId = readUuid("affiliateCodeId");
      const affiliateClickId = readUuid("affiliateClickId");

      // Build body — only include affiliate keys if they passed UUID
      // validation, so the zod `.optional()` branch takes over.
      const body: Record<string, unknown> = {
        firstName,
        lastName,
        email,
        phone,
        eventDate: formattedDate,
        partyType,
        guestCount: guests,
        quoteUrl,
        sourceType: sourceType ?? "quote_lightbox",
        sourceUrl: sourceUrlRef.current,
      };
      if (affiliateId) body.affiliateId = affiliateId;
      if (affiliateCodeId) body.affiliateCodeId = affiliateCodeId;
      if (affiliateClickId) body.affiliateClickId = affiliateClickId;

      const { data, error: fnError } = await supabase.functions.invoke("create-lead", {
        body,
      });

      if (fnError) {
        // Edge function returns { error, details } on validation failure.
        // `fnError.context?.body` is a ReadableStream; surface the details.
        let friendly = fnError.message;
        try {
          const ctx = (fnError as any).context;
          if (ctx?.body && typeof ctx.body.getReader === "function") {
            const text = await new Response(ctx.body).text();
            const parsed = JSON.parse(text);
            if (parsed?.error) friendly = parsed.error;
          }
        } catch { /* ignore */ }
        throw new Error(friendly || "Quote service error");
      }

      const leadId: string | undefined = data?.leadId;
      const quoteNumber: string | undefined = data?.quoteNumber;

      // Mirror the old flow: GTM + TikTok pixel events for Google Ads &
      // paid conversion attribution (unchanged if marketing already hooked
      // these up on the cruise site).
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ event: "lovable_quote_completed" });
        const ttq = (window as any).ttq;
        if (ttq && typeof ttq.track === "function") {
          ttq.track("SubmitForm", {
            content_name: "Quote Completed",
            content_category: partyType,
          });
        }
      }

      // Persist so returning visitors can resume their quote.
      try {
        if (leadId) sessionStorage.setItem("leadId", leadId);
        if (quoteNumber) sessionStorage.setItem("quoteNumber", quoteNumber);
      } catch {
        /* ignore storage errors */
      }

      setSubmitted({ leadId });

      // Redirect to the customer lead dashboard — identical destination to
      // the old iframe. Uses the booking subdomain since that's where the
      // full LeadDashboard (with quote viewer) is deployed.
      const target = leadId
        ? `https://booking.premierpartycruises.com/lead-dashboard?lead=${encodeURIComponent(leadId)}`
        : null;

      setTimeout(() => {
        setIsOpen(false);
        if (target) {
          window.location.assign(target);
        } else {
          // Fallback: native /quote page if no lead id came back.
          navigate("/quote");
        }
      }, 1100);
    } catch (err: any) {
      setError(
        err?.message ||
          "We couldn't send your quote. Try again, or call (512) 488-5892.",
      );
    } finally {
      setSubmitting(false);
    }
  }, [firstName, lastName, email, phone, partyType, guests, selectedDate, sourceType, navigate]);

  const value = useMemo<QuoteLightboxContextValue>(
    () => ({ isOpen, openQuote, closeQuote }),
    [isOpen, openQuote, closeQuote],
  );

  return (
    <QuoteLightboxContext.Provider value={value}>
      {children}
      <Modal
        open={isOpen}
        onClose={closeQuote}
        step={step}
        setStep={setStep}
        partyType={partyType}
        setPartyType={setPartyType}
        guests={guests}
        setGuests={setGuests}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        canAdvance={canAdvance}
        liveEstimate={liveEstimate}
        startingAt={startingAt}
        showDisco={showDisco}
        submitting={submitting}
        error={error}
        submitted={submitted}
        onSubmit={handleSubmit}
      />
    </QuoteLightboxContext.Provider>
  );
}

export function useQuoteLightbox() {
  const ctx = useContext(QuoteLightboxContext);
  if (ctx) return ctx;
  // Fallback when called outside the provider — route to the native /quote page.
  return {
    isOpen: false,
    openQuote: (sourceType?: string, prefill?: QuotePrefill) => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams();
      if (sourceType) params.set("sourceType", sourceType);
      if (prefill?.date) params.set("date", prefill.date);
      if (prefill?.guests) params.set("guests", String(prefill.guests));
      if (prefill?.duration) params.set("duration", String(prefill.duration));
      if (prefill?.boat) params.set("boat", prefill.boat);
      if (prefill?.partyType) params.set("partyType", prefill.partyType);
      window.location.assign(`/quote?${params.toString()}`);
    },
    closeQuote: () => {},
  } satisfies QuoteLightboxContextValue;
}

// ────────────────────────────────────────────────────────────────────────
// Modal component
// ────────────────────────────────────────────────────────────────────────
type StartingAt = { privateStartingAt: number; discoStartingAtPerPerson: number };

function Modal(props: {
  open: boolean;
  onClose: () => void;
  step: FlowStep;
  setStep: (s: FlowStep) => void;
  partyType: string; setPartyType: (v: string) => void;
  guests: number; setGuests: (n: number) => void;
  selectedDate?: Date; setSelectedDate: (d: Date | undefined) => void;
  firstName: string; setFirstName: (s: string) => void;
  lastName: string; setLastName: (s: string) => void;
  email: string; setEmail: (s: string) => void;
  phone: string; setPhone: (s: string) => void;
  canAdvance: boolean;
  liveEstimate: { total: number };
  startingAt: StartingAt;
  showDisco: boolean;
  submitting: boolean;
  error: string | null;
  submitted: { quoteUrl?: string } | null;
  onSubmit: () => void;
}) {
  const {
    open, onClose, step, setStep,
    partyType, setPartyType, guests, setGuests,
    selectedDate, setSelectedDate,
    firstName, setFirstName, lastName, setLastName,
    email, setEmail, phone, setPhone,
    canAdvance, startingAt, showDisco, submitting, error, submitted, onSubmit,
  } = props;

  const next = () => setStep(Math.min(4, (step + 1)) as FlowStep);
  const back = () => setStep(Math.max(1, (step - 1)) as FlowStep);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        className={`qlb-overlay ${open ? "open" : ""}`}
        aria-hidden={!open}
        onClick={onClose}
      >
        <div
          className="qlb-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qlb-title"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="qlb-close" onClick={onClose} aria-label="Close">×</button>

          {submitted ? (
            <div className="qlb-success">
              <p className="qlb-eyebrow">Quote sent</p>
              <h2>Your <em>quote</em> is on the way.</h2>
              <p>
                Emailing your detailed breakdown to {email}. Taking you to your
                quote dashboard now…
              </p>
            </div>
          ) : (
            <>
              <p className="qlb-eyebrow">Instant quote · No obligation</p>
              <h2 id="qlb-title" className="qlb-title">
                Tell us about your <em>cruise</em>.
              </h2>
              <p className="qlb-sub">
                4 quick steps. Captain, fuel, tax, and 20% gratuity are always
                included.
              </p>

              <div className="qlb-steps" aria-hidden>
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`qlb-step-dot ${step > n ? "is-done" : step === n ? "is-active" : ""}`}
                  />
                ))}
              </div>

              {step === 1 && (
                <Step1Party partyType={partyType} setPartyType={setPartyType} />
              )}
              {step === 2 && (
                <Step2Guests
                  guests={guests}
                  setGuests={setGuests}
                  startingAt={startingAt}
                  showDisco={showDisco}
                />
              )}
              {step === 3 && (
                <Step3Date
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  startingAt={startingAt}
                  showDisco={showDisco}
                  guests={guests}
                />
              )}
              {step === 4 && (
                <Step4Contact
                  firstName={firstName} setFirstName={setFirstName}
                  lastName={lastName} setLastName={setLastName}
                  email={email} setEmail={setEmail}
                  phone={phone} setPhone={setPhone}
                  startingAt={startingAt}
                  showDisco={showDisco}
                  guests={guests}
                />
              )}

              {error && <div className="qlb-error">{error}</div>}

              <div className="qlb-actions">
                {step > 1 ? (
                  <button type="button" className="qlb-btn qlb-btn--ghost" onClick={back}>
                    ← Back
                  </button>
                ) : (
                  <button type="button" className="qlb-btn qlb-btn--ghost" onClick={onClose}>
                    Cancel
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    className="qlb-btn qlb-btn--primary"
                    disabled={!canAdvance}
                    onClick={next}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="qlb-btn qlb-btn--primary"
                    disabled={!canAdvance || submitting}
                    onClick={onSubmit}
                  >
                    {submitting ? "Sending…" : "Send me my quote →"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ── Step 1: Party type ────────────────────────────────────────────────
function Step1Party({ partyType, setPartyType }: { partyType: string; setPartyType: (v: string) => void }) {
  return (
    <>
      <p className="qlb-step-label">Step 1 · Occasion</p>
      <h3 className="qlb-step-title">What are you celebrating?</h3>
      <div className="qlb-chips">
        {PARTY_TYPES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`qlb-chip ${partyType === p.id ? "is-active" : ""}`}
            onClick={() => setPartyType(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </>
  );
}

// ── Step 2: Guest count ───────────────────────────────────────────────
function Step2Guests({
  guests,
  setGuests,
  startingAt,
  showDisco,
}: {
  guests: number;
  setGuests: (n: number) => void;
  startingAt: StartingAt;
  showDisco: boolean;
}) {
  return (
    <>
      <p className="qlb-step-label">Step 2 · Group size</p>
      <h3 className="qlb-step-title">How many people?</h3>

      <div className="qlb-guest-counter">
        <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1} aria-label="Fewer guests">−</button>
        <div>
          <div className="count">{guests}</div>
          <div className="unit">{guests === 1 ? "Guest" : "Guests"}</div>
        </div>
        <button type="button" onClick={() => setGuests(Math.min(75, guests + 1))} disabled={guests >= 75} aria-label="More guests">+</button>
      </div>

      <input
        type="range"
        min={1}
        max={75}
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value, 10))}
        aria-label="Guest count"
        style={{ width: "100%" }}
      />

      <StartingAtBadge startingAt={startingAt} showDisco={showDisco} guests={guests} />
    </>
  );
}

// ── Step 3: Date picker ───────────────────────────────────────────────
function Step3Date({
  selectedDate,
  setSelectedDate,
  startingAt,
  showDisco,
  guests,
}: {
  selectedDate?: Date;
  setSelectedDate: (d: Date | undefined) => void;
  startingAt: StartingAt;
  showDisco: boolean;
  guests: number;
}) {
  return (
    <>
      <p className="qlb-step-label">Step 3 · Date</p>
      <h3 className="qlb-step-title">When's your cruise?</h3>

      <div className="qlb-datepicker-wrap">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={{ before: new Date() }}
        />
      </div>

      <StartingAtBadge startingAt={startingAt} showDisco={showDisco} guests={guests} />
    </>
  );
}

// ── Step 4: Contact info ──────────────────────────────────────────────
function Step4Contact(props: {
  firstName: string; setFirstName: (s: string) => void;
  lastName: string; setLastName: (s: string) => void;
  email: string; setEmail: (s: string) => void;
  phone: string; setPhone: (s: string) => void;
  startingAt: StartingAt;
  showDisco: boolean;
  guests: number;
}) {
  const {
    firstName, setFirstName, lastName, setLastName,
    email, setEmail, phone, setPhone,
    startingAt, showDisco, guests,
  } = props;
  return (
    <>
      <p className="qlb-step-label">Step 4 · Where do we send your quote?</p>
      <h3 className="qlb-step-title">Your contact info</h3>
      <p className="qlb-sub" style={{ marginTop: "-0.5rem" }}>
        We only ask for this so we can email + text you your detailed quote. No spam. No sales call unless you ask.
      </p>

      <div className="qlb-row">
        <div className="qlb-field">
          <label htmlFor="qlb-first">First name</label>
          <input id="qlb-first" autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="qlb-field">
          <label htmlFor="qlb-last">Last name</label>
          <input id="qlb-last" autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
      </div>
      <div className="qlb-row">
        <div className="qlb-field">
          <label htmlFor="qlb-email">Email</label>
          <input id="qlb-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="qlb-field">
          <label htmlFor="qlb-phone">Phone</label>
          <input id="qlb-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
      </div>

      <StartingAtBadge startingAt={startingAt} showDisco={showDisco} guests={guests} />
    </>
  );
}

// ── Starting-at pricing badge (used in Steps 2, 3, 4) ──────────────────
function StartingAtBadge({
  startingAt,
  showDisco,
  guests,
}: {
  startingAt: StartingAt;
  showDisco: boolean;
  guests: number;
}) {
  // Disco is shown side-by-side with Private when the party type is bach
  // variant. Non-bach parties only see the private charter price.
  if (showDisco) {
    return (
      <div className="qlb-starting-grid">
        <div className="qlb-starting-card">
          <p className="qlb-starting-label">Private charter · {guests} guests · 4 hrs</p>
          <p className="qlb-starting-amount">
            <span className="qlb-starting-prefix">starting at</span>
            {currencyDecimal(startingAt.privateStartingAt)}
          </p>
          <p className="qlb-starting-hint">Whole boat · Mon–Thu rate · before tax + tip</p>
        </div>
        <div className="qlb-starting-card">
          <p className="qlb-starting-label">ATX Disco Cruise · per person</p>
          <p className="qlb-starting-amount">
            <span className="qlb-starting-prefix">starting at</span>
            {currencyDecimal(startingAt.discoStartingAtPerPerson)}
          </p>
          <p className="qlb-starting-hint">Sat 3:30–7:30 slot · before tax + tip</p>
        </div>
      </div>
    );
  }
  return (
    <div className="qlb-live">
      <p className="qlb-live-label">Private charter · {guests} guests · 4 hrs</p>
      <p className="qlb-live-total">
        <span className="qlb-starting-prefix">starting at</span>
        {currencyDecimal(startingAt.privateStartingAt)}
      </p>
      <p className="qlb-live-hint">Whole boat · Mon–Thu rate · before tax + tip</p>
    </div>
  );
}
