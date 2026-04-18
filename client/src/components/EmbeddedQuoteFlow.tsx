/**
 * EmbeddedQuoteFlow — inline version of the Get-a-Quote popup.
 *
 * Same 4-step flow as the QuoteLightbox modal, but rendered inline so it
 * can be embedded on any page: the home page (replacing the old
 * cross-origin iframe) and the pricing page (replacing the static
 * PricingCalculator). On submit it calls the same Supabase `create-lead`
 * edge function the modal does and redirects to the customer lead
 * dashboard — identical pipeline, identical GHL + Zapier + Sheets
 * triggers.
 *
 * Consumers render it like:
 *   <EmbeddedQuoteFlow source="home_embed" />
 *   <EmbeddedQuoteFlow source="pricing_embed" defaultPartyType="bachelorette_party" />
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addDays, format, startOfDay } from "date-fns";
import {
  calculatePricing,
  getAutoCrewFeePerHour,
  getBaseHourlyRate,
  DISCO_TIME_SLOTS,
  isDiscoEligiblePartyType,
} from "@/lib/pricing";
import { supabase } from "@/lib/supabase";

type FlowStep = 1 | 2 | 3 | 4;

const PARTY_TYPES = [
  { id: "bachelor_party", label: "Bachelor", inline: "bachelor party" },
  { id: "bachelorette_party", label: "Bachelorette", inline: "bachelorette" },
  { id: "combined_bach", label: "Combined bach", inline: "combined bach" },
  { id: "wedding_event", label: "Wedding", inline: "wedding" },
  { id: "corporate_event", label: "Corporate", inline: "corporate" },
  { id: "birthday_party", label: "Birthday", inline: "birthday" },
  { id: "family_gathering", label: "Family", inline: "family" },
  { id: "other", label: "Other", inline: "" },
];

function partyInline(id: string): string {
  return PARTY_TYPES.find((p) => p.id === id)?.inline ?? "";
}

function currencyDecimal(n: number) {
  const isWhole = Math.abs(n - Math.round(n)) < 0.005;
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

const STYLES = `
.eqf-root {
  background:
    radial-gradient(ellipse at 20% 0%, rgba(30,136,229,0.08) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(200,169,110,0.06) 0%, transparent 55%),
    #0F0F18;
  border: 1px solid rgba(200,169,110,0.28);
  border-radius: 14px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.35);
  color: #EDE3D0;
  font-family: 'Jost', system-ui, sans-serif;
  padding: 2.25rem;
  max-width: 780px;
  margin: 0 auto;
}
@media (max-width: 520px) { .eqf-root { padding: 1.5rem; } }

.eqf-eyebrow {
  font-size: 0.68rem; letter-spacing: 0.25em; text-transform: uppercase;
  color: #C8A96E; margin: 0 0 0.6rem; font-weight: 500;
}
.eqf-title {
  font-family: 'Cormorant Garamond', serif; font-size: 2.1rem; font-weight: 300;
  color: #F5EED8; margin: 0 0 0.4rem; line-height: 1.05; letter-spacing: -0.005em;
}
.eqf-title em { color: #C8A96E; font-style: italic; font-weight: 400; }
.eqf-sub {
  font-size: 0.95rem; color: rgba(237,227,208,0.72); margin: 0 0 1.5rem; line-height: 1.6;
}

.eqf-steps { display: flex; gap: 0.35rem; margin-bottom: 1.25rem; }
.eqf-step-dot {
  flex: 1; height: 4px; border-radius: 2px;
  background: rgba(200,169,110,0.15);
  transition: background 0.2s ease;
}
.eqf-step-dot.is-done, .eqf-step-dot.is-active { background: #C8A96E; }

.eqf-step-label {
  font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: #C8A96E; font-weight: 500; margin: 0 0 0.9rem;
}
.eqf-step-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.55rem; font-weight: 400; color: #F5EED8; margin: 0 0 1.1rem;
}

.eqf-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.eqf-chip {
  background: transparent; border: 1px solid rgba(200,169,110,0.3);
  color: rgba(237,227,208,0.82); padding: 0.6rem 1.1rem;
  border-radius: 999px; cursor: pointer; font-size: 0.9rem; font-family: inherit;
  transition: all 0.15s ease;
}
.eqf-chip:hover { border-color: #C8A96E; color: #F5EED8; }
.eqf-chip.is-active { background: rgba(200,169,110,0.14); border-color: #C8A96E; color: #F5EED8; }

.eqf-field { margin-bottom: 1rem; }
.eqf-field label {
  display: block; font-size: 0.72rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: rgba(237,227,208,0.6); font-weight: 500;
  margin-bottom: 0.4rem;
}
.eqf-field input, .eqf-field textarea {
  width: 100%; background: #07070c; border: 1px solid rgba(200,169,110,0.25);
  color: #EDE3D0; padding: 0.7rem 0.9rem; border-radius: 8px;
  font-family: 'Jost', system-ui, sans-serif; font-size: 0.95rem;
  transition: border-color 0.15s ease;
}
.eqf-field input:focus, .eqf-field textarea:focus { outline: none; border-color: #C8A96E; }

.eqf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
@media (max-width: 520px) { .eqf-row { grid-template-columns: 1fr; } }

.eqf-guest-counter {
  display: flex; align-items: center; justify-content: center; gap: 1.25rem;
  margin: 1rem 0;
}
.eqf-guest-counter button {
  width: 48px; height: 48px; border-radius: 50%;
  background: rgba(200,169,110,0.1); border: 1px solid rgba(200,169,110,0.35);
  color: #C8A96E; font-size: 1.3rem; font-weight: 500; cursor: pointer;
  transition: all 0.15s ease;
}
.eqf-guest-counter button:hover:not(:disabled) { background: rgba(200,169,110,0.2); }
.eqf-guest-counter button:disabled { opacity: 0.3; cursor: not-allowed; }
.eqf-guest-counter .count {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.4rem; font-weight: 400; color: #F5EED8; min-width: 90px; text-align: center;
}
.eqf-guest-counter .unit {
  font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(237,227,208,0.55); display: block; margin-top: -0.1rem;
}

.eqf-datepicker-wrap {
  background: rgba(200,169,110,0.04);
  border: 1px solid rgba(200,169,110,0.22);
  border-radius: 10px;
  padding: 0.8rem;
  display: flex; justify-content: center;
}
.eqf-datepicker-wrap .rdp { margin: 0; font-family: 'Jost', system-ui, sans-serif; color: #EDE3D0; }
.eqf-datepicker-wrap .rdp-button { color: #EDE3D0; }
.eqf-datepicker-wrap .rdp-day_selected,
.eqf-datepicker-wrap .rdp-day_selected:focus-visible,
.eqf-datepicker-wrap .rdp-day_selected:hover { background-color: #C8A96E !important; color: #0a0a10 !important; }
.eqf-datepicker-wrap .rdp-day_today { color: #C8A96E; font-weight: 600; }
.eqf-datepicker-wrap .rdp-caption_label { font-family: 'Cormorant Garamond', serif; color: #F5EED8; font-size: 1.15rem; font-weight: 400; }
.eqf-datepicker-wrap .rdp-nav_button { color: #C8A96E; }
.eqf-datepicker-wrap .rdp-head_cell { color: rgba(237,227,208,0.5); font-size: 0.7rem; letter-spacing: 0.1em; }

.eqf-actions { display: flex; gap: 0.6rem; justify-content: space-between; margin-top: 1.75rem; }
.eqf-btn {
  padding: 0.85rem 1.6rem; border-radius: 8px; font-family: 'Jost', sans-serif;
  font-size: 0.85rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
  cursor: pointer; transition: all 0.15s ease; border: 1px solid transparent;
}
.eqf-btn--primary {
  background: linear-gradient(135deg, #C8A96E 0%, #A88B4E 100%);
  color: #0a0a10; flex: 1;
}
.eqf-btn--primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(200,169,110,0.3); }
.eqf-btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
.eqf-btn--ghost {
  background: transparent; color: rgba(237,227,208,0.7);
  border-color: rgba(200,169,110,0.3);
}
.eqf-btn--ghost:hover { color: #F5EED8; border-color: #C8A96E; }

.eqf-error {
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.3);
  color: #fca5a5; padding: 0.7rem 1rem; border-radius: 8px;
  font-size: 0.88rem; margin-top: 0.9rem;
}

.eqf-live {
  background: rgba(200,169,110,0.05);
  border: 1px solid rgba(200,169,110,0.18);
  border-radius: 10px; padding: 0.95rem 1.1rem; margin-top: 1.1rem;
}
.eqf-live-label { font-size: 0.64rem; letter-spacing: 0.22em; color: rgba(237,227,208,0.55); text-transform: uppercase; margin: 0 0 0.35rem; }
.eqf-live-total { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; color: #C8A96E; margin: 0; font-weight: 400; display: flex; align-items: baseline; gap: 0.45rem; }
.eqf-live-hint { font-size: 0.72rem; color: rgba(237,227,208,0.55); margin: 0.2rem 0 0; }

.eqf-starting-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-top: 1.1rem;
}
@media (max-width: 640px) { .eqf-starting-grid { grid-template-columns: 1fr; } }
.eqf-starting-card {
  background: rgba(200,169,110,0.05);
  border: 1px solid rgba(200,169,110,0.18);
  border-radius: 10px; padding: 0.95rem 1.1rem;
}
.eqf-starting-label {
  font-size: 0.6rem; letter-spacing: 0.18em; color: rgba(237,227,208,0.6);
  text-transform: uppercase; margin: 0 0 0.4rem;
}
.eqf-starting-amount {
  font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; color: #C8A96E;
  margin: 0; font-weight: 400; display: flex; align-items: baseline; gap: 0.4rem;
  flex-wrap: wrap;
}
.eqf-starting-prefix {
  font-family: 'Jost', system-ui, sans-serif;
  font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(237,227,208,0.55); font-weight: 500;
}
.eqf-starting-hint { font-size: 0.72rem; color: rgba(237,227,208,0.5); margin: 0.2rem 0 0; }

.eqf-success {
  text-align: center; padding: 1.5rem 0.5rem;
}
.eqf-success h2 {
  font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300;
  color: #F5EED8; margin: 0 0 0.7rem;
}
.eqf-success h2 em { color: #C8A96E; font-style: italic; }
.eqf-success p { color: rgba(237,227,208,0.78); font-size: 1rem; line-height: 1.6; margin: 0 0 1.25rem; }
`;

type StartingAt = { privateStartingAt: number; discoStartingAtPerPerson: number };

export type EmbeddedQuoteFlowProps = {
  source?: string;
  defaultPartyType?: string;
  defaultGuests?: number;
  eyebrow?: string;
  className?: string;
};

export default function EmbeddedQuoteFlow({
  source = "embedded_flow",
  defaultPartyType = "bachelorette_party",
  defaultGuests = 15,
  eyebrow = "Instant quote · No obligation",
  className = "",
}: EmbeddedQuoteFlowProps) {
  // ── Form state ───────────────────────────────────────────────────────
  const [step, setStep] = useState<FlowStep>(1);
  const [partyType, setPartyType] = useState<string>(defaultPartyType);
  const [guests, setGuests] = useState<number>(defaultGuests);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ leadId?: string } | null>(null);

  const sourceUrlRef = useRef<string | undefined>();
  useEffect(() => {
    sourceUrlRef.current =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : undefined;
  }, []);

  // ── Starting-at pricing ──────────────────────────────────────────────
  const startingAt = useMemo<StartingAt>(() => {
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

  const showDisco = useMemo(() => isDiscoEligiblePartyType(partyType), [partyType]);

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
  const handleSubmit = useCallback(async () => {
    if (!selectedDate) { setError("Please pick a date."); return; }
    setError(null);
    setSubmitting(true);
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : "https://premierpartycruises.com";
      const quoteUrl = `${origin}/lead-dashboard?sourceHost=${encodeURIComponent(
        typeof window !== "undefined" ? window.location.hostname : "premierpartycruises.com",
      )}`;

      const uuidRe = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      const readUuid = (key: string) => {
        if (typeof window === "undefined") return undefined;
        const v = sessionStorage.getItem(key);
        return v && uuidRe.test(v) ? v : undefined;
      };
      const affiliateId = readUuid("affiliateId");
      const affiliateCodeId = readUuid("affiliateCodeId");
      const affiliateClickId = readUuid("affiliateClickId");

      const body: Record<string, unknown> = {
        firstName, lastName, email, phone,
        eventDate: formattedDate,
        partyType,
        guestCount: guests,
        quoteUrl,
        sourceType: source,
        sourceUrl: sourceUrlRef.current,
      };
      if (affiliateId) body.affiliateId = affiliateId;
      if (affiliateCodeId) body.affiliateCodeId = affiliateCodeId;
      if (affiliateClickId) body.affiliateClickId = affiliateClickId;

      const { data, error: fnError } = await supabase.functions.invoke("create-lead", { body });
      if (fnError) {
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

      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ event: "lovable_quote_completed" });
        const ttq = (window as any).ttq;
        if (ttq && typeof ttq.track === "function") {
          ttq.track("SubmitForm", { content_name: "Quote Completed", content_category: partyType });
        }
      }
      try {
        if (leadId) sessionStorage.setItem("leadId", leadId);
        if (quoteNumber) sessionStorage.setItem("quoteNumber", quoteNumber);
      } catch { /* ignore */ }

      setSubmitted({ leadId });
      const target = leadId
        ? `/lead-dashboard?lead=${encodeURIComponent(leadId)}`
        : null;
      setTimeout(() => {
        if (target) window.location.assign(target);
      }, 1100);
    } catch (err: any) {
      setError(err?.message || "We couldn't send your quote. Try again or call (512) 488-5892.");
    } finally {
      setSubmitting(false);
    }
  }, [firstName, lastName, email, phone, partyType, guests, selectedDate, source]);

  const next = () => setStep(Math.min(4, step + 1) as FlowStep);
  const back = () => setStep(Math.max(1, step - 1) as FlowStep);

  // ── Success state ────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className={`eqf-root ${className}`}>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        <div className="eqf-success">
          <p className="eqf-eyebrow">Quote sent</p>
          <h2>Your <em>quote</em> is on the way.</h2>
          <p>
            Emailing your detailed breakdown to {email}. Taking you to your quote
            dashboard now…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`eqf-root ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <p className="eqf-eyebrow">{eyebrow}</p>
      <h2 className="eqf-title">
        {step > 1 && partyInline(partyType) ? (
          <>Tell us about your <em>{partyInline(partyType)}</em> cruise.</>
        ) : (
          <>Tell us about your <em>cruise</em>.</>
        )}
      </h2>
      <p className="eqf-sub">
        4 quick steps. Captain, fuel, tax, and 20% gratuity are always included.
      </p>

      <div className="eqf-steps" aria-hidden>
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`eqf-step-dot ${step > n ? "is-done" : step === n ? "is-active" : ""}`}
          />
        ))}
      </div>

      {step === 1 && (
        <>
          <p className="eqf-step-label">Step 1 · Occasion</p>
          <h3 className="eqf-step-title">What are you celebrating?</h3>
          <div className="eqf-chips">
            {PARTY_TYPES.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`eqf-chip ${partyType === p.id ? "is-active" : ""}`}
                onClick={() => setPartyType(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <p className="eqf-step-label">Step 2 · Group size</p>
          <h3 className="eqf-step-title">How many people?</h3>
          <div className="eqf-guest-counter">
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
      )}

      {step === 3 && (
        <>
          <p className="eqf-step-label">Step 3 · Date</p>
          <h3 className="eqf-step-title">When's your cruise?</h3>
          <div className="eqf-datepicker-wrap">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
            />
          </div>
          <StartingAtBadge startingAt={startingAt} showDisco={showDisco} guests={guests} />
        </>
      )}

      {step === 4 && (
        <>
          <p className="eqf-step-label">Step 4 · Where do we send your quote?</p>
          <h3 className="eqf-step-title">Your contact info</h3>
          <p className="eqf-sub" style={{ marginTop: "-0.5rem" }}>
            We only ask for this so we can email + text you your detailed quote. No spam.
            No sales call unless you ask.
          </p>
          <div className="eqf-row">
            <div className="eqf-field">
              <label htmlFor={`eqf-first-${source}`}>First name</label>
              <input id={`eqf-first-${source}`} autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="eqf-field">
              <label htmlFor={`eqf-last-${source}`}>Last name</label>
              <input id={`eqf-last-${source}`} autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>
          <div className="eqf-row">
            <div className="eqf-field">
              <label htmlFor={`eqf-email-${source}`}>Email</label>
              <input id={`eqf-email-${source}`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="eqf-field">
              <label htmlFor={`eqf-phone-${source}`}>Phone</label>
              <input id={`eqf-phone-${source}`} type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>
          <StartingAtBadge startingAt={startingAt} showDisco={showDisco} guests={guests} />
        </>
      )}

      {error && <div className="eqf-error">{error}</div>}

      <div className="eqf-actions">
        {step > 1 ? (
          <button type="button" className="eqf-btn eqf-btn--ghost" onClick={back}>
            ← Back
          </button>
        ) : <span />}
        {step < 4 ? (
          <button
            type="button"
            className="eqf-btn eqf-btn--primary"
            disabled={!canAdvance}
            onClick={next}
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            className="eqf-btn eqf-btn--primary"
            disabled={!canAdvance || submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Sending…" : "Send me my quote →"}
          </button>
        )}
      </div>
    </div>
  );
}

function StartingAtBadge({
  startingAt,
  showDisco,
  guests,
}: {
  startingAt: StartingAt;
  showDisco: boolean;
  guests: number;
}) {
  if (showDisco) {
    return (
      <div className="eqf-starting-grid">
        <div className="eqf-starting-card">
          <p className="eqf-starting-label">Private charter · {guests} guests · 4 hrs</p>
          <p className="eqf-starting-amount">
            <span className="eqf-starting-prefix">starting at</span>
            {currencyDecimal(startingAt.privateStartingAt)}
          </p>
          <p className="eqf-starting-hint">Whole boat · Mon–Thu rate · before tax + tip</p>
        </div>
        <div className="eqf-starting-card">
          <p className="eqf-starting-label">ATX Disco Cruise · per person</p>
          <p className="eqf-starting-amount">
            <span className="eqf-starting-prefix">starting at</span>
            {currencyDecimal(startingAt.discoStartingAtPerPerson)}
          </p>
          <p className="eqf-starting-hint">Sat 3:30–7:30 slot · before tax + tip</p>
        </div>
      </div>
    );
  }
  return (
    <div className="eqf-live">
      <p className="eqf-live-label">Private charter · {guests} guests · 4 hrs</p>
      <p className="eqf-live-total">
        <span className="eqf-starting-prefix">starting at</span>
        {currencyDecimal(startingAt.privateStartingAt)}
      </p>
      <p className="eqf-live-hint">Whole boat · Mon–Thu rate · before tax + tip</p>
    </div>
  );
}
