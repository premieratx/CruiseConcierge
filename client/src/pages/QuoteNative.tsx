/**
 * QuoteNative — /quote
 *
 * Native cruise-site quote flow. Replaces the legacy
 * booking.premierpartycruises.com/quote-v2 iframe that used to open in a
 * lightbox. Now every "Get a Quote" button across the site navigates here
 * via the useQuoteLightbox() shim, which preserves the old API surface.
 *
 * URL params (all optional — used to pre-fill from PricingCalculator,
 * CtaPair, FleetShowcase, etc.):
 *   • date       → yyyy-MM-dd
 *   • guests     → integer
 *   • duration   → integer (hours)
 *   • boat       → day-tripper | meeseeks-irony | clever-girl
 *   • partyType  → bachelor_party | bachelorette_party | combined_bach |
 *                  wedding_event | corporate_event | birthday_party |
 *                  family_gathering | other
 *   • sourceType → attribution string
 *   • sourceUrl  → pathname the user clicked from
 *
 * Submits to the existing /api/leads/quote-builder endpoint which fans
 * out to Google Sheets, GoHighLevel, and email via the server-side
 * ComprehensiveLeadService. Same pipeline the old iframe used — zero
 * backend changes required.
 */
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import {
  calculatePricing,
  calculateDiscoPricing,
  getAutoCrewFeePerHour,
  getRecommendedBoat,
  getPrivatePackages,
  getCapacityTier,
  validateDiscoSlot,
  DISCO_TIME_SLOTS,
  DISCO_ADDONS,
  getDiscoSlot,
  type DiscoSlotId,
} from "@/lib/pricing";
import { addDays, format, parseISO, startOfDay } from "date-fns";
import XolaBookNow from "@/components/XolaBookNow";

type BoatId = "day-tripper" | "meeseeks-irony" | "clever-girl";
type CruiseType = "private" | "disco";

const PARTY_TYPES: { id: string; label: string; hint?: string }[] = [
  { id: "bachelor_party", label: "Bachelor party" },
  { id: "bachelorette_party", label: "Bachelorette party" },
  { id: "combined_bach", label: "Combined bach party" },
  { id: "wedding_event", label: "Wedding / rehearsal" },
  { id: "corporate_event", label: "Corporate" },
  { id: "birthday_party", label: "Birthday" },
  { id: "family_gathering", label: "Family gathering" },
  { id: "other", label: "Something else" },
];

const BOATS: { id: BoatId; label: string; capMin: number; capMax: number; blurb: string }[] = [
  { id: "day-tripper", label: "Day Tripper", capMin: 1, capMax: 14, blurb: "Intimate party barge" },
  { id: "meeseeks-irony", label: "Meeseeks · The Irony", capMin: 15, capMax: 30, blurb: "Mid-size entertainer" },
  { id: "clever-girl", label: "Clever Girl", capMin: 31, capMax: 75, blurb: "Flagship 75-person" },
];

const STYLES = `
html, body { background: #07070c; }
.qn-root {
  min-height: 100vh;
  background:
    radial-gradient(ellipse at 10% -10%, rgba(30,136,229,0.06) 0%, transparent 55%),
    radial-gradient(ellipse at 90% 110%, rgba(200,169,110,0.05) 0%, transparent 55%),
    #07070c;
  background-attachment: fixed;
  color: #EDE3D0;
  font-family: 'Jost', system-ui, sans-serif;
  padding: 4rem 1.25rem 6rem;
}
.qn-shell { max-width: 1180px; margin: 0 auto; }
.qn-eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #C8A96E;
  margin-bottom: 0.75rem;
  font-weight: 500;
}
.qn-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 1.05;
  color: #F5EED8;
  margin: 0 0 1rem;
}
.qn-title em { font-style: italic; color: #C8A96E; font-weight: 400; }
.qn-lede {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(237,227,208,0.78);
  max-width: 640px;
  margin: 0 0 2.5rem;
}
.qn-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2rem;
  align-items: start;
}
@media (max-width: 900px) {
  .qn-grid { grid-template-columns: 1fr; }
}
.qn-card {
  background: linear-gradient(180deg, rgba(200,169,110,0.04) 0%, transparent 60%), #0F0F18;
  border: 1px solid rgba(200,169,110,0.22);
  border-radius: 14px;
  padding: 2rem;
}
.qn-step {
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C8A96E;
  font-weight: 500;
  margin: 0 0 0.5rem;
}
.qn-step-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #F5EED8;
  margin: 0 0 1.25rem;
}
.qn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem; }
@media (max-width: 640px) { .qn-row { grid-template-columns: 1fr; } }
.qn-field label {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(237,227,208,0.58);
  margin-bottom: 0.4rem;
  font-weight: 500;
}
.qn-field input,
.qn-field select,
.qn-field textarea {
  width: 100%;
  background: #07070c;
  border: 1px solid rgba(200,169,110,0.25);
  color: #EDE3D0;
  padding: 0.7rem 0.9rem;
  border-radius: 8px;
  font-family: 'Jost', system-ui, sans-serif;
  font-size: 0.95rem;
  transition: border-color 0.15s ease;
}
.qn-field input:focus,
.qn-field select:focus,
.qn-field textarea:focus { outline: none; border-color: #C8A96E; }
.qn-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.qn-chip {
  background: transparent;
  border: 1px solid rgba(200,169,110,0.3);
  color: rgba(237,227,208,0.82);
  padding: 0.55rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: inherit;
  transition: all 0.15s ease;
}
.qn-chip:hover { border-color: #C8A96E; color: #F5EED8; }
.qn-chip.is-active { background: rgba(200,169,110,0.12); border-color: #C8A96E; color: #F5EED8; }
.qn-boat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 1rem; }
@media (max-width: 640px) { .qn-boat-grid { grid-template-columns: 1fr; } }
.qn-boat {
  text-align: left;
  background: transparent;
  border: 1px solid rgba(200,169,110,0.25);
  color: inherit;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
}
.qn-boat:hover { border-color: #C8A96E; }
.qn-boat.is-active { background: rgba(200,169,110,0.08); border-color: #C8A96E; }
.qn-boat__name { font-weight: 500; color: #F5EED8; margin-bottom: 0.2rem; }
.qn-boat__cap { font-size: 0.78rem; color: rgba(237,227,208,0.6); }
.qn-boat__blurb { font-size: 0.78rem; color: rgba(237,227,208,0.5); margin-top: 0.3rem; }
.qn-submit {
  width: 100%;
  background: linear-gradient(135deg, #C8A96E 0%, #A88B4E 100%);
  border: none;
  color: #0a0a10;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-family: 'Jost', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  margin-top: 1.5rem;
}
.qn-submit:hover { transform: translateY(-1px); box-shadow: 0 12px 30px rgba(200,169,110,0.3); }
.qn-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
.qn-summary {
  position: sticky;
  top: 2rem;
}
.qn-summary-row { display: flex; justify-content: space-between; padding: 0.6rem 0; font-size: 0.9rem; border-bottom: 1px solid rgba(200,169,110,0.1); }
.qn-summary-row:last-of-type { border-bottom: none; }
.qn-summary-row .l { color: rgba(237,227,208,0.6); }
.qn-summary-row .v { color: #F5EED8; font-weight: 500; }
.qn-summary-total { border-top: 1px solid rgba(200,169,110,0.3); margin-top: 1rem; padding-top: 1rem; display: flex; justify-content: space-between; }
.qn-summary-total .l { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: #F5EED8; }
.qn-summary-total .v { font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; color: #C8A96E; font-weight: 400; }
.qn-back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(237,227,208,0.6);
  text-decoration: none;
  font-size: 0.82rem;
  margin-bottom: 2rem;
  letter-spacing: 0.06em;
}
.qn-back:hover { color: #C8A96E; }
.qn-error {
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.3);
  color: #fca5a5;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  margin-top: 1rem;
}
.qn-success {
  text-align: center;
  padding: 3rem 2rem;
}
.qn-success h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.6rem;
  font-weight: 300;
  color: #F5EED8;
  margin: 0 0 0.8rem;
}
.qn-success h2 em { color: #C8A96E; font-style: italic; }
.qn-success p { color: rgba(237,227,208,0.75); font-size: 1.05rem; line-height: 1.7; max-width: 520px; margin: 0 auto 2rem; }
.qn-success-actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
.qn-cta-primary, .qn-cta-outline {
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  font-family: 'Jost', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #C8A96E;
}
.qn-cta-primary { background: #C8A96E; color: #0a0a10; }
.qn-cta-outline { background: transparent; color: #C8A96E; }
.qn-cta-primary:hover, .qn-cta-outline:hover { transform: translateY(-1px); }
`;

function currencyDecimal(n: number) {
  // Drop ".00" on whole-dollar amounts.
  const isWhole = Math.abs(n - Math.round(n)) < 0.005;
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function useQueryParam(key: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  return new URLSearchParams(window.location.search).get(key) ?? undefined;
}

function inferBoatFromGuests(n: number): BoatId {
  if (n <= 14) return "day-tripper";
  if (n <= 30) return "meeseeks-irony";
  return "clever-girl";
}

export default function QuoteNative() {
  const [, navigate] = useLocation();

  // Read pre-fill params once on mount.
  const prefillDate = useQueryParam("date");
  const prefillGuests = useQueryParam("guests");
  const prefillDuration = useQueryParam("duration");
  const prefillBoat = useQueryParam("boat") as BoatId | undefined;
  const prefillPartyType = useQueryParam("partyType");
  const sourceType = useQueryParam("sourceType") ?? "quote_page_direct";
  const sourceUrl = useQueryParam("sourceUrl");

  const defaultDate = useMemo(() => {
    if (prefillDate) {
      try { return parseISO(prefillDate); } catch { /* fall through */ }
    }
    return startOfDay(addDays(new Date(), 21));
  }, [prefillDate]);

  const prefillCruiseType = useQueryParam("cruiseType") as CruiseType | undefined;

  const [cruiseType, setCruiseType] = useState<CruiseType>(
    prefillCruiseType === "disco" ? "disco" : "private",
  );
  const [date, setDate] = useState<string>(format(defaultDate, "yyyy-MM-dd"));
  const [guests, setGuests] = useState<number>(
    prefillGuests ? Math.max(1, Math.min(75, parseInt(prefillGuests, 10) || 22)) : 22,
  );
  const [duration, setDuration] = useState<number>(
    prefillDuration ? Math.max(3, Math.min(8, parseInt(prefillDuration, 10) || 4)) : 4,
  );
  const [boat, setBoat] = useState<BoatId>(
    prefillBoat && BOATS.some((b) => b.id === prefillBoat)
      ? prefillBoat
      : inferBoatFromGuests(prefillGuests ? parseInt(prefillGuests, 10) || 22 : 22),
  );
  const [partyType, setPartyType] = useState<string>(prefillPartyType || "bachelorette_party");

  // Disco-only state
  const [discoSlot, setDiscoSlot] = useState<string>("");
  const [discoAddons, setDiscoAddons] = useState<Set<string>>(new Set());
  const [ticketQty, setTicketQty] = useState<number>(
    prefillGuests ? Math.max(8, parseInt(prefillGuests, 10) || 10) : 10,
  );

  // Private-charter add-on state (Essential / Ultimate package, per-capacity)
  const [privatePackage, setPrivatePackage] = useState<"none" | "essentials" | "ultimate">(
    "none",
  );

  const toggleDiscoAddon = (id: string) =>
    setDiscoAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ leadId?: string } | null>(null);

  // Keep boat suggestion in sync when guest count moves into a new tier.
  useEffect(() => {
    const inferred = inferBoatFromGuests(guests);
    setBoat((current) => {
      const currentBoat = BOATS.find((b) => b.id === current);
      if (!currentBoat) return inferred;
      if (guests >= currentBoat.capMin && guests <= currentBoat.capMax) return current;
      return inferred;
    });
  }, [guests]);

  const dateObj = useMemo(() => {
    try { return parseISO(date); } catch { return new Date(); }
  }, [date]);

  // Validate disco slot eligibility if disco is selected.
  const discoError = useMemo(() => {
    if (cruiseType !== "disco") return null;
    return validateDiscoSlot({ date: dateObj, partyType });
  }, [cruiseType, dateObj, partyType]);

  // Available Essential + Ultimate packages for the current group size.
  const privatePackages = useMemo(() => getPrivatePackages(guests), [guests]);
  const privatePackagePrice = useMemo(() => {
    if (privatePackage === "none") return 0;
    return privatePackages[privatePackage].price;
  }, [privatePackage, privatePackages]);

  // Unified pricing result that the sidebar can render for either cruise type.
  const pricing = useMemo(() => {
    if (cruiseType === "disco") {
      const p = calculateDiscoPricing({
        slotId: discoSlot,
        ticketQty,
        addonIds: Array.from(discoAddons),
      });
      return {
        hourlyRate: 0,
        additionalCrewFee: 0,
        subtotal: p.subtotal,
        gratuity: p.gratuity,
        tax: p.tax,
        xolaFee: p.xolaFee,
        total: p.total,
        pricePerPerson: p.pricePerPerson,
        ticketsSubtotal: p.ticketsSubtotal,
        addonsSubtotal: p.addonsSubtotal,
      };
    }
    const crewFeePerHour = getAutoCrewFeePerHour(guests);
    const r = calculatePricing({
      date: dateObj,
      guestCount: guests,
      duration,
      crewFeePerHour,
      // Essential/Ultimate is folded into subtotal via the discount slot —
      // we apply it by treating it as a post-subtotal add since the library
      // uses discount to REDUCE subtotal. We add it as an extra line below.
    });
    return {
      ...r,
      subtotal: r.subtotal + privatePackagePrice,
      gratuity: (r.subtotal + privatePackagePrice) * 0.2,
      tax: (r.hourlyRate * duration + r.additionalCrewFee + privatePackagePrice) * 0.0825,
      xolaFee: (r.subtotal + privatePackagePrice + (r.subtotal + privatePackagePrice) * 0.2) * 0.03,
      total:
        (r.subtotal + privatePackagePrice) +
        (r.subtotal + privatePackagePrice) * 0.2 +
        (r.hourlyRate * duration + r.additionalCrewFee + privatePackagePrice) * 0.0825 +
        (r.subtotal + privatePackagePrice + (r.subtotal + privatePackagePrice) * 0.2) * 0.03,
      pricePerPerson: 0,
      ticketsSubtotal: 0,
      addonsSubtotal: privatePackagePrice,
      privatePackagePrice,
    };
  }, [
    cruiseType,
    discoSlot,
    ticketQty,
    discoAddons,
    dateObj,
    guests,
    duration,
    privatePackagePrice,
  ]);

  const recommendedBoat = useMemo(() => getRecommendedBoat(guests), [guests]);
  const availableDiscoSlots = useMemo(() => {
    const dow = dateObj.getDay();
    if (dow === 5) return DISCO_TIME_SLOTS.friday;
    if (dow === 6) return DISCO_TIME_SLOTS.saturday;
    return [] as readonly { label: string; start: string; end: string; hours: number }[];
  }, [dateObj]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a phone number including area code.");
      return;
    }

    if (cruiseType === "disco" && discoError) {
      setError(discoError);
      return;
    }
    if (cruiseType === "disco" && !discoSlot) {
      setError("Please pick a disco cruise time slot.");
      return;
    }

    setSubmitting(true);
    try {
      const effectiveGuests = cruiseType === "disco" ? ticketQty : guests;
      const slotDetails = getDiscoSlot(discoSlot);
      const selectionDetails =
        cruiseType === "disco"
          ? {
              cruiseType: "disco",
              boatTier: "clever-girl",
              boatName: "Clever Girl",
              experienceType: "disco_cruise",
              slotId: discoSlot,
              preferredTimeLabel: slotDetails?.label ?? discoSlot,
              pricePerPerson: slotDetails?.pricePerPerson ?? 0,
              ticketQuantity: ticketQty,
              groupSizeLabel: `${ticketQty} tickets`,
              addOns: Array.from(discoAddons).map((id) => {
                const a = DISCO_ADDONS.find((x) => x.id === id);
                return { id, name: a?.name, price: a?.price ?? 0 };
              }),
              sourceType,
              sourceUrl,
              notes,
            }
          : {
              cruiseType: "private",
              boatTier: boat,
              preferredTimeLabel: `${duration}-hour cruise`,
              ticketQuantity: guests,
              groupSizeLabel: `${guests} guests`,
              prePartyPackage:
                privatePackage === "none"
                  ? null
                  : {
                      tier: privatePackage,
                      price: privatePackages[privatePackage].price,
                      items: privatePackages[privatePackage].items,
                      capacityTier: getCapacityTier(guests),
                    },
              sourceType,
              sourceUrl,
              notes,
            };

      const payload = {
        contactInfo: { firstName, lastName, email, phone },
        eventDetails: {
          eventType: partyType,
          eventDate: date,
          groupSize: effectiveGuests,
        },
        selectionDetails,
        pricing: {
          subtotal: pricing.subtotal,
          tax: pricing.tax,
          gratuity: pricing.gratuity,
          total: pricing.total,
          depositAmount: pricing.total * 0.5,
        },
      };

      const res = await fetch("/api/leads/quote-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Quote request failed (${res.status})`);
      }
      const json = await res.json();
      setSubmitted({ leadId: json?.leadId });
      // Scroll to top so the success state is visible
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please call us at (512) 488-5892.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success state ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="qn-root">
        <Helmet>
          <title>Quote Sent — Premier Party Cruises</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        <div className="qn-shell">
          <div className="qn-card qn-success">
            <p className="qn-eyebrow">Quote Sent</p>
            <h2>
              Your quote is on its <em>way</em>.
            </h2>
            <p>
              We just emailed {email} a detailed breakdown of your{" "}
              {cruiseType === "disco"
                ? `${ticketQty}-ticket ATX Disco Cruise (${getDiscoSlot(discoSlot)?.short})`
                : `${duration}-hour private charter on the ${BOATS.find((b) => b.id === boat)?.label} for ${guests} guests`}{" "}
              on {format(dateObj, "EEEE, MMMM do, yyyy")}. Your total estimate is{" "}
              <strong style={{ color: "#F5EED8" }}>{currencyDecimal(pricing.total)}</strong> all-in.
            </p>
            <p>
              A captain will follow up within the hour to confirm availability
              and answer any questions. To lock in your date today, secure a 50%
              deposit below.
            </p>
            <div className="qn-success-actions">
              <XolaBookNow className="qn-cta-primary">
                Lock in with deposit →
              </XolaBookNow>
              <button
                className="qn-cta-outline"
                onClick={() => navigate(sourceUrl || "/")}
              >
                Back to browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Primary form state ──────────────────────────────────────────────────
  return (
    <div className="qn-root" data-page-ready="quote-native">
      <Helmet>
        <title>Get Your Quote · Premier Party Cruises · Lake Travis</title>
        <meta
          name="description"
          content="Get an instant, all-inclusive quote for your Lake Travis party cruise. Pick your date, boat, and guest count — we email a formal quote in minutes."
        />
      </Helmet>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="qn-shell">
        <a
          className="qn-back"
          href={sourceUrl || "/"}
          onClick={(e) => {
            if (sourceUrl) {
              e.preventDefault();
              navigate(sourceUrl);
            }
          }}
        >
          ← Back{sourceUrl ? "" : " to home"}
        </a>

        <p className="qn-eyebrow">Instant Quote · No obligation</p>
        <h1 className="qn-title">
          Your <em>custom quote</em>, in about a minute.
        </h1>
        <p className="qn-lede">
          Tell us the date, boat size, and how long you want to be on the water.
          We&apos;ll email a formal quote with a reserved time slot. Captain, fuel,
          tax, and 20% gratuity are always included — no surprises.
        </p>

        <form className="qn-grid" onSubmit={handleSubmit}>
          {/* Left column — the form */}
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div className="qn-card">
              <p className="qn-step">Step 0 · Cruise type</p>
              <h2 className="qn-step-title">Private charter or ATX Disco Cruise?</h2>
              <div className="qn-chips">
                <button
                  type="button"
                  className={`qn-chip ${cruiseType === "private" ? "is-active" : ""}`}
                  onClick={() => setCruiseType("private")}
                >
                  Private charter · whole boat
                </button>
                <button
                  type="button"
                  className={`qn-chip ${cruiseType === "disco" ? "is-active" : ""}`}
                  onClick={() => setCruiseType("disco")}
                >
                  ATX Disco Cruise · per-person tickets
                </button>
              </div>
              <p style={{ fontSize: "0.82rem", color: "rgba(237,227,208,0.6)", marginTop: "0.75rem", lineHeight: 1.5 }}>
                {cruiseType === "private"
                  ? "Book the whole boat for your group. Price by boat × hours × day of week."
                  : "Per-person tickets on the Clever Girl. Friday 12–4pm or Saturday 11am–3pm / 3:30–7:30pm. Bach parties only, March–October."}
              </p>
            </div>

            <div className="qn-card">
              <p className="qn-step">Step 1 · Your cruise</p>
              <h2 className="qn-step-title">
                {cruiseType === "disco" ? "Pick your date + time slot" : "When, how long, how many"}
              </h2>

              {cruiseType === "private" ? (
                <>
                  <div className="qn-row">
                    <div className="qn-field">
                      <label htmlFor="qn-date">Date</label>
                      <input
                        id="qn-date"
                        type="date"
                        value={date}
                        min={format(new Date(), "yyyy-MM-dd")}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="qn-field">
                      <label htmlFor="qn-duration">Duration</label>
                      <select
                        id="qn-duration"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                      >
                        {[3, 4, 5, 6, 7, 8].map((h) => (
                          <option key={h} value={h}>{h} hours</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="qn-field" style={{ marginBottom: "1rem" }}>
                    <label htmlFor="qn-guests">
                      Guest count — {guests} {guests === 1 ? "guest" : "guests"}
                    </label>
                    <input
                      id="qn-guests"
                      type="range"
                      min={1}
                      max={75}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                    />
                  </div>

                  <p className="qn-step" style={{ marginTop: "1.5rem" }}>Boat</p>
                  <div className="qn-boat-grid">
                    {BOATS.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        className={`qn-boat ${boat === b.id ? "is-active" : ""}`}
                        onClick={() => setBoat(b.id)}
                      >
                        <div className="qn-boat__name">{b.label}</div>
                        <div className="qn-boat__cap">{b.capMin}–{b.capMax} guests</div>
                        <div className="qn-boat__blurb">{b.blurb}</div>
                      </button>
                    ))}
                  </div>
                  {recommendedBoat.crewFeeNote && (
                    <p style={{ fontSize: "0.82rem", color: "rgba(237,227,208,0.6)", marginTop: "0.5rem" }}>
                      Note: {recommendedBoat.crewFeeNote}.
                    </p>
                  )}

                  <p className="qn-step" style={{ marginTop: "1.75rem" }}>
                    Pre-party package (optional · sized for {getCapacityTier(guests)}-guest tier)
                  </p>
                  <div className="qn-boat-grid">
                    <button
                      type="button"
                      className={`qn-boat ${privatePackage === "none" ? "is-active" : ""}`}
                      onClick={() => setPrivatePackage("none")}
                    >
                      <div className="qn-boat__name">No package</div>
                      <div className="qn-boat__cap">Just the boat</div>
                      <div className="qn-boat__blurb">Coolers + Bluetooth audio + bathroom are always included.</div>
                    </button>
                    <button
                      type="button"
                      className={`qn-boat ${privatePackage === "essentials" ? "is-active" : ""}`}
                      onClick={() => setPrivatePackage("essentials")}
                    >
                      <div className="qn-boat__name">Essentials</div>
                      <div className="qn-boat__cap">${privatePackages.essentials.price}</div>
                      <div className="qn-boat__blurb">
                        {privatePackages.essentials.items.slice(0, 3).join(" · ")}
                        {privatePackages.essentials.items.length > 3 ? " · …" : ""}
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`qn-boat ${privatePackage === "ultimate" ? "is-active" : ""}`}
                      onClick={() => setPrivatePackage("ultimate")}
                    >
                      <div className="qn-boat__name">Ultimate</div>
                      <div className="qn-boat__cap">${privatePackages.ultimate.price}</div>
                      <div className="qn-boat__blurb">
                        {privatePackages.ultimate.items.slice(0, 3).join(" · ")}
                        {privatePackages.ultimate.items.length > 3 ? " · …" : ""}
                      </div>
                    </button>
                  </div>
                  {privatePackage !== "none" && (
                    <details style={{ marginTop: "0.75rem", color: "rgba(237,227,208,0.7)", fontSize: "0.85rem" }}>
                      <summary style={{ cursor: "pointer", color: "#C8A96E" }}>
                        See what's included in {privatePackage === "essentials" ? "Essentials" : "Ultimate"}
                      </summary>
                      <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem", lineHeight: 1.7 }}>
                        {privatePackages[privatePackage].items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </>
              ) : (
                <>
                  <div className="qn-field" style={{ marginBottom: "1rem" }}>
                    <label htmlFor="qn-disco-date">Date (Friday or Saturday only)</label>
                    <input
                      id="qn-disco-date"
                      type="date"
                      value={date}
                      min={format(new Date(), "yyyy-MM-dd")}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setDiscoSlot(""); // reset slot when date changes
                      }}
                      required
                    />
                  </div>

                  {availableDiscoSlots.length > 0 ? (
                    <div style={{ marginBottom: "1.25rem" }}>
                      <p className="qn-step" style={{ marginTop: "1rem" }}>Time slot · price per person</p>
                      <div className="qn-boat-grid">
                        {availableDiscoSlots.map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            className={`qn-boat ${discoSlot === slot.id ? "is-active" : ""}`}
                            onClick={() => setDiscoSlot(slot.id)}
                          >
                            <div className="qn-boat__name">{slot.short}</div>
                            <div className="qn-boat__cap">${slot.pricePerPerson}/person</div>
                            <div className="qn-boat__blurb">4-hour sailing on Clever Girl. BYOB friendly. Tax, tip, and booking fee added at checkout.</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p style={{ fontSize: "0.88rem", color: "#fca5a5", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", padding: "0.6rem 0.9rem", borderRadius: "8px", marginBottom: "1rem" }}>
                      Pick a Friday or Saturday between March 1 and October 31 for the ATX Disco Cruise.
                    </p>
                  )}

                  <div className="qn-field" style={{ marginBottom: "1rem" }}>
                    <label htmlFor="qn-tickets">
                      Tickets — {ticketQty} {ticketQty === 1 ? "person" : "people"}
                    </label>
                    <input
                      id="qn-tickets"
                      type="range"
                      min={1}
                      max={50}
                      value={ticketQty}
                      onChange={(e) => setTicketQty(parseInt(e.target.value, 10))}
                    />
                    <p style={{ fontSize: "0.75rem", color: "rgba(237,227,208,0.55)", marginTop: "0.3rem" }}>
                      Shared boat — up to 100 guests total per sailing. Bach parties only.
                    </p>
                  </div>

                  <p className="qn-step" style={{ marginTop: "1.5rem" }}>Add-ons (optional · $100 each)</p>
                  <div className="qn-boat-grid">
                    {DISCO_ADDONS.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        className={`qn-boat ${discoAddons.has(a.id) ? "is-active" : ""}`}
                        onClick={() => toggleDiscoAddon(a.id)}
                      >
                        <div className="qn-boat__name">{a.name}</div>
                        <div className="qn-boat__cap">$100</div>
                        <div className="qn-boat__blurb">{a.blurb}</div>
                      </button>
                    ))}
                  </div>

                  {discoError && (
                    <div className="qn-error" style={{ marginTop: "0.75rem" }}>
                      {discoError}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="qn-card">
              <p className="qn-step">Step 2 · What are you celebrating?</p>
              <h2 className="qn-step-title">Occasion</h2>
              <div className="qn-chips">
                {PARTY_TYPES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`qn-chip ${partyType === p.id ? "is-active" : ""}`}
                    onClick={() => setPartyType(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="qn-card">
              <p className="qn-step">Step 3 · Where should we send your quote?</p>
              <h2 className="qn-step-title">Contact info</h2>
              <div className="qn-row">
                <div className="qn-field">
                  <label htmlFor="qn-first">First name</label>
                  <input
                    id="qn-first"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    required
                  />
                </div>
                <div className="qn-field">
                  <label htmlFor="qn-last">Last name</label>
                  <input
                    id="qn-last"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>
              <div className="qn-row">
                <div className="qn-field">
                  <label htmlFor="qn-email">Email</label>
                  <input
                    id="qn-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="qn-field">
                  <label htmlFor="qn-phone">Phone</label>
                  <input
                    id="qn-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>
              <div className="qn-field" style={{ marginTop: "0.5rem" }}>
                <label htmlFor="qn-notes">Anything we should know? (optional)</label>
                <textarea
                  id="qn-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add-ons, decor requests, special occasions…"
                />
              </div>

              {error && <div className="qn-error">{error}</div>}

              <button className="qn-submit" type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Get my quote →"}
              </button>
            </div>
          </div>

          {/* Right column — sticky live summary */}
          <div>
            <div className="qn-card qn-summary">
              <p className="qn-step">Live estimate</p>
              <h3 className="qn-step-title" style={{ marginBottom: "1rem" }}>
                Your cruise so far
              </h3>
              <div className="qn-summary-row"><span className="l">Cruise type</span><span className="v">{cruiseType === "disco" ? "ATX Disco · per-person" : "Private charter"}</span></div>
              <div className="qn-summary-row"><span className="l">Date</span><span className="v">{format(dateObj, "MMM d, yyyy")}</span></div>
              {cruiseType === "disco" ? (
                <>
                  <div className="qn-summary-row"><span className="l">Time slot</span><span className="v">{getDiscoSlot(discoSlot)?.short ?? "—"}</span></div>
                  <div className="qn-summary-row"><span className="l">Tickets × {ticketQty}</span><span className="v">{currencyDecimal(pricing.ticketsSubtotal || 0)}</span></div>
                  <div className="qn-summary-row"><span className="l">Per person</span><span className="v">{currencyDecimal(pricing.pricePerPerson)}</span></div>
                  {(pricing.addonsSubtotal ?? 0) > 0 && (
                    <div className="qn-summary-row"><span className="l">Add-ons × {discoAddons.size}</span><span className="v">{currencyDecimal(pricing.addonsSubtotal || 0)}</span></div>
                  )}
                </>
              ) : (
                <>
                  <div className="qn-summary-row"><span className="l">Guests</span><span className="v">{guests}</span></div>
                  <div className="qn-summary-row"><span className="l">Duration</span><span className="v">{duration} hrs</span></div>
                  <div className="qn-summary-row"><span className="l">Boat</span><span className="v">{BOATS.find((b) => b.id === boat)?.label}</span></div>
                  <div className="qn-summary-row"><span className="l">Hourly rate</span><span className="v">{currencyDecimal(pricing.hourlyRate)}</span></div>
                  {pricing.additionalCrewFee > 0 && (
                    <div className="qn-summary-row"><span className="l">Extra crew</span><span className="v">{currencyDecimal(pricing.additionalCrewFee)}</span></div>
                  )}
                  {privatePackage !== "none" && (
                    <div className="qn-summary-row">
                      <span className="l">{privatePackage === "essentials" ? "Essentials" : "Ultimate"} package</span>
                      <span className="v">{currencyDecimal(privatePackagePrice)}</span>
                    </div>
                  )}
                </>
              )}
              <div className="qn-summary-row"><span className="l">Subtotal</span><span className="v">{currencyDecimal(pricing.subtotal)}</span></div>
              <div className="qn-summary-row"><span className="l">20% gratuity</span><span className="v">{currencyDecimal(pricing.gratuity)}</span></div>
              <div className="qn-summary-row"><span className="l">8.25% tax</span><span className="v">{currencyDecimal(pricing.tax)}</span></div>
              <div className="qn-summary-row"><span className="l">3% booking fee</span><span className="v">{currencyDecimal(pricing.xolaFee)}</span></div>
              <div className="qn-summary-total"><span className="l">Estimated total</span><span className="v">{currencyDecimal(pricing.total)}</span></div>
              <p style={{ fontSize: "0.75rem", color: "rgba(237,227,208,0.5)", marginTop: "1rem", lineHeight: 1.5 }}>
                All-in total includes captain, fuel, gratuity, sales tax, and
                booking fee. 50% deposit due to secure the date.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
