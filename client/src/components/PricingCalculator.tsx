/*
 * PricingCalculator — interactive calculator for private-charter pricing.
 *
 * Rules baked in:
 *  - Day Tripper (up to 14 guests): from $200/hr
 *  - Meeseeks OR The Irony (25–30 guests, same tier): from $225/hr
 *  - Clever Girl (31–75 guests): from $250/hr
 *  - 4-hour minimum
 *  - Day-of-week pricing: starting rate applies to all days. Actual
 *    weekend/peak-season pricing is confirmed at quote time.
 *  - Add-ons on subtotal:
 *      +20%   gratuity
 *      +8.25% sales tax
 *      +3%    booking fee
 *
 * Availability is a heuristic (4-week forward peek): weekends fill
 * first, weekdays stay open longer. Not a real inventory check — CTA
 * points at the lightbox quote builder for confirmed dates.
 */

import { useMemo, useState } from "react";
import { useQuoteLightbox } from "./QuoteLightbox";
import {
  calculatePricing,
  getAutoCrewFeePerHour,
  getPrivatePackages,
  getCapacityTier,
  DISCO_TIME_SLOTS,
  DISCO_ADDONS,
} from "@/lib/pricing";
import { addDays, getDay, startOfDay } from "date-fns";

type BoatTier = "day-tripper" | "meeseeks-irony" | "clever-girl";

type BoatConfig = {
  id: BoatTier;
  label: string;
  capacityLabel: string;
  capacityMin: number;
  capacityMax: number;
  hourly: number;
  tagline: string;
};

const BOATS: BoatConfig[] = [
  {
    id: "day-tripper",
    label: "Day Tripper",
    capacityLabel: "Up to 14 guests",
    capacityMin: 1,
    capacityMax: 14,
    hourly: 200,
    tagline: "Intimate groups · elopements · small birthdays",
  },
  {
    id: "meeseeks-irony",
    label: "Meeseeks or The Irony",
    capacityLabel: "25–30 guests",
    capacityMin: 15,
    capacityMax: 30,
    hourly: 225,
    tagline: "Mid-size bach parties · rehearsal dinners · milestone birthdays",
  },
  {
    id: "clever-girl",
    label: "Clever Girl",
    capacityLabel: "31–75 guests",
    capacityMin: 31,
    capacityMax: 75,
    hourly: 250,
    tagline: "Flagship · 14 disco balls · weddings + corporate",
  },
];

const DAYS: { id: number; short: string; long: string; demand: "low" | "med" | "high" }[] = [
  { id: 0, short: "Sun", long: "Sunday",    demand: "med"  },
  { id: 1, short: "Mon", long: "Monday",    demand: "low"  },
  { id: 2, short: "Tue", long: "Tuesday",   demand: "low"  },
  { id: 3, short: "Wed", long: "Wednesday", demand: "low"  },
  { id: 4, short: "Thu", long: "Thursday",  demand: "med"  },
  { id: 5, short: "Fri", long: "Friday",    demand: "high" },
  { id: 6, short: "Sat", long: "Saturday",  demand: "high" },
];

const GRATUITY_RATE = 0.20;
const SALES_TAX_RATE = 0.0825;
const BOOKING_FEE_RATE = 0.03;
const MIN_HOURS = 4;
const MAX_HOURS = 8;

function currency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function currencyDecimal(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500&family=Jost:wght@300;400;500;600&display=swap');

.pc-card {
  background:
    radial-gradient(ellipse at 20% 0%, rgba(30,136,229,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 100%, rgba(200,169,110,0.06) 0%, transparent 55%),
    #0F0F18;
  border: 1px solid rgba(200,169,110,0.2);
  border-radius: 14px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.5);
  padding: 2.5rem;
  max-width: 1100px;
  margin: 0 auto;
  color: #EDE3D0;
  font-family: 'Jost', system-ui, sans-serif;
}

.pc-header {
  text-align: center;
  margin-bottom: 2rem;
}
.pc-header__eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C8A96E;
  margin: 0 0 0.75rem;
}
.pc-header__title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300;
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  line-height: 1.15;
  margin: 0 0 0.75rem;
  color: #F0E6D0;
}
.pc-header__title em { font-style: italic; color: #DFC08A; }
.pc-header__sub {
  color: #C8B898;
  font-size: 0.98rem;
  max-width: 560px;
  margin: 0 auto;
}

.pc-step-label {
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C8A96E;
  margin: 0 0 0.75rem;
  display: block;
}

.pc-boat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-bottom: 2rem;
}
.pc-boat-btn {
  appearance: none;
  text-align: left;
  background: #141420;
  border: 1px solid rgba(200,169,110,0.15);
  border-radius: 10px;
  padding: 1rem 1.1rem;
  color: #EDE3D0;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
  font-family: inherit;
}
.pc-boat-btn:hover {
  border-color: rgba(200,169,110,0.4);
  background: #1A1A26;
}
.pc-boat-btn.is-active {
  border-color: #C8A96E;
  background: linear-gradient(135deg, rgba(200,169,110,0.12) 0%, #1A1A26 100%);
}
.pc-boat-btn__label {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.25rem;
  color: #F0E6D0;
  margin: 0 0 0.2rem;
}
.pc-boat-btn__cap {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #C8A96E;
  margin: 0 0 0.5rem;
}
.pc-boat-btn__price {
  font-size: 0.85rem;
  color: #C8B898;
  margin: 0;
}
.pc-boat-btn__tagline {
  font-size: 0.78rem;
  color: #A89878;
  margin: 0.4rem 0 0;
  line-height: 1.5;
}

.pc-hours {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.pc-hours__slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #C8A96E 0%,
    #C8A96E var(--pc-slider-progress, 0%),
    rgba(200,169,110,0.15) var(--pc-slider-progress, 0%),
    rgba(200,169,110,0.15) 100%
  );
  outline: none;
}
.pc-hours__slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #F0E6D0;
  border: 2px solid #C8A96E;
  cursor: pointer;
}
.pc-hours__slider::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #F0E6D0;
  border: 2px solid #C8A96E;
  cursor: pointer;
}
.pc-hours__value {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.9rem;
  color: #F0E6D0;
  min-width: 90px;
  text-align: right;
}
.pc-hours__value span {
  font-family: 'Jost', system-ui, sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #C8A96E;
  margin-left: 0.3rem;
}

.pc-days {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.pc-day {
  appearance: none;
  background: #141420;
  border: 1px solid rgba(200,169,110,0.15);
  border-radius: 10px;
  padding: 0.85rem 0.5rem;
  color: #EDE3D0;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.2s, background 0.2s;
  font-family: inherit;
}
.pc-day:hover { border-color: rgba(200,169,110,0.4); }
.pc-day.is-active {
  border-color: #C8A96E;
  background: linear-gradient(135deg, rgba(200,169,110,0.15) 0%, #1A1A26 100%);
}
.pc-day__name {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #C8A96E;
  margin: 0 0 0.35rem;
  font-weight: 500;
}
.pc-day__price { display: none; }
.pc-day__availability {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #A89878;
}
.pc-day__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}
.pc-day__dot--low  { background: #4ADE80; box-shadow: 0 0 6px rgba(74,222,128,0.6); }
.pc-day__dot--med  { background: #FACC15; box-shadow: 0 0 6px rgba(250,204,21,0.6); }
.pc-day__dot--high { background: #F87171; box-shadow: 0 0 6px rgba(248,113,113,0.6); }

.pc-breakdown {
  background: #0A0A12;
  border: 1px solid rgba(200,169,110,0.2);
  border-radius: 12px;
  padding: 1.5rem 1.75rem;
  margin-bottom: 1.5rem;
}
.pc-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0;
  font-size: 0.94rem;
  color: #C8B898;
  border-bottom: 1px solid rgba(200,169,110,0.08);
}
.pc-row:last-child { border-bottom: 0; }
.pc-row__label { color: #C8B898; }
.pc-row__value { color: #F0E6D0; font-variant-numeric: tabular-nums; }
.pc-row--total {
  padding-top: 1rem;
  margin-top: 0.4rem;
  border-top: 1px solid rgba(200,169,110,0.25);
  border-bottom: 0;
}
.pc-row--total .pc-row__label {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.3rem;
  color: #F0E6D0;
}
.pc-row--total .pc-row__value {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.7rem;
  color: #DFC08A;
}

.pc-ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.pc-cta {
  appearance: none;
  cursor: pointer;
  font-family: inherit;
  padding: 0.95rem 2rem;
  border-radius: 4px;
  font-size: 0.82rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 500;
  transition: transform 0.15s, box-shadow 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.pc-cta--primary {
  background: linear-gradient(135deg, #C8A96E 0%, #DFC08A 100%);
  color: #07070C;
  border: 1px solid #C8A96E;
}
.pc-cta--primary:hover {
  box-shadow: 0 0 28px rgba(200,169,110,0.55);
  transform: translateY(-1px);
}
.pc-cta--outline {
  background: transparent;
  color: #DFC08A;
  border: 1px solid rgba(200,169,110,0.4);
}
.pc-cta--outline:hover {
  color: #F0E6D0;
  border-color: #C8A96E;
  background: rgba(200,169,110,0.05);
}

.pc-footnote {
  text-align: center;
  font-size: 0.75rem;
  color: #A89878;
  margin: 1.5rem 0 0;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .pc-card { padding: 1.5rem 1.1rem; border-radius: 10px; }
  .pc-boat-grid { grid-template-columns: 1fr; }
  .pc-days {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .pc-hours { flex-direction: column; align-items: stretch; }
  .pc-hours__value { text-align: center; }
  .pc-ctas .pc-cta { width: 100%; justify-content: center; }
}
`;

export default function PricingCalculator() {
  const { openQuote } = useQuoteLightbox();
  const [boatId, setBoatId] = useState<BoatTier>("meeseeks-irony");
  const [hours, setHours] = useState(4);
  const [dayId, setDayId] = useState(6); // default Sat

  const boat = BOATS.find((b) => b.id === boatId) ?? BOATS[0];
  const day = DAYS.find((d) => d.id === dayId) ?? DAYS[6];

  // Resolve a concrete Date that matches the selected day-of-week. The
  // shared pricing library keys off Date (to honor holiday overrides), so
  // we pick the next occurrence of the chosen weekday starting from today.
  const resolvedDate = useMemo(() => {
    const today = startOfDay(new Date());
    const offset = (dayId - getDay(today) + 7) % 7 || 7;
    return addDays(today, offset);
  }, [dayId]);

  // Guest count used for pricing tiers. We pick the MIDPOINT of the boat's
  // capacity band so the calculator doesn't over- or under-quote; the real
  // quote flow asks for exact headcount.
  const guestCount = useMemo(() => {
    return Math.round((boat.capacityMin + boat.capacityMax) / 2);
  }, [boat]);

  const calc = useMemo(() => {
    const crewFeePerHour = getAutoCrewFeePerHour(guestCount);
    const result = calculatePricing({
      date: resolvedDate,
      guestCount,
      duration: hours,
      crewFeePerHour,
    });
    return {
      subtotal: result.subtotal,
      gratuity: result.gratuity,
      tax: result.tax,
      bookingFee: result.xolaFee, // Xola fee is our 3% booking fee
      total: result.total,
      hourlyRate: result.hourlyRate,
      crewFee: result.additionalCrewFee,
    };
  }, [resolvedDate, guestCount, hours]);

  const sliderProgress = ((hours - MIN_HOURS) / (MAX_HOURS - MIN_HOURS)) * 100;

  return (
    <div className="pc-card" data-testid="pricing-calculator">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="pc-header">
        <p className="pc-header__eyebrow">Private Charter · Instant Estimate</p>
        <h3 className="pc-header__title">
          Build your <em>private charter</em> price
        </h3>
        <p className="pc-header__sub">
          Pick your group size, how long you want to be on the water, and your day.
          We'll show the estimated all-in total with gratuity, sales tax, and booking fee included.
        </p>
      </div>

      <label className="pc-step-label">1 · Group size</label>
      <div className="pc-boat-grid">
        {BOATS.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`pc-boat-btn ${b.id === boatId ? "is-active" : ""}`}
            onClick={() => setBoatId(b.id)}
          >
            <p className="pc-boat-btn__label">{b.label}</p>
            <p className="pc-boat-btn__cap">{b.capacityLabel}</p>
            <p className="pc-boat-btn__price">From {currency(b.hourly)}/hr</p>
            <p className="pc-boat-btn__tagline">{b.tagline}</p>
          </button>
        ))}
      </div>

      <label className="pc-step-label">
        2 · Cruise duration <span style={{ opacity: 0.6, marginLeft: "0.5rem", fontSize: "0.7rem" }}>({MIN_HOURS} hour minimum)</span>
      </label>
      <div className="pc-hours">
        <input
          type="range"
          min={MIN_HOURS}
          max={MAX_HOURS}
          step={1}
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value, 10))}
          className="pc-hours__slider"
          style={{ ["--pc-slider-progress" as any]: `${sliderProgress}%` }}
          aria-label="Cruise duration in hours"
        />
        <div className="pc-hours__value" aria-live="polite">
          {hours}
          <span>{hours === 1 ? "HOUR" : "HOURS"}</span>
        </div>
      </div>

      <label className="pc-step-label">3 · Day of the week</label>
      <div className="pc-days" role="tablist" aria-label="Day of the week">
        {DAYS.map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            aria-selected={d.id === dayId}
            className={`pc-day ${d.id === dayId ? "is-active" : ""}`}
            onClick={() => setDayId(d.id)}
            title={`${d.long} · ${d.demand === "low" ? "Wide open" : d.demand === "med" ? "Limited" : "Limited — weekends fill first"}`}
          >
            <p className="pc-day__name">{d.short}</p>
            <span className="pc-day__availability">
              <span className={`pc-day__dot pc-day__dot--${d.demand}`} />
              {d.demand === "low" ? "Open" : d.demand === "med" ? "Ltd" : "Fills"}
            </span>
          </button>
        ))}
      </div>

      <div className="pc-breakdown" aria-live="polite">
        <div className="pc-row">
          <span className="pc-row__label">
            {boat.label} · {hours} hrs · {day.long}
          </span>
          <span className="pc-row__value">{currencyDecimal(calc.subtotal)}</span>
        </div>
        <div className="pc-row">
          <span className="pc-row__label">20% gratuity</span>
          <span className="pc-row__value">{currencyDecimal(calc.gratuity)}</span>
        </div>
        <div className="pc-row">
          <span className="pc-row__label">8.25% sales tax</span>
          <span className="pc-row__value">{currencyDecimal(calc.tax)}</span>
        </div>
        <div className="pc-row">
          <span className="pc-row__label">3% booking fee</span>
          <span className="pc-row__value">{currencyDecimal(calc.bookingFee)}</span>
        </div>
        <div className="pc-row pc-row--total">
          <span className="pc-row__label">Estimated total</span>
          <span className="pc-row__value">{currencyDecimal(calc.total)}</span>
        </div>
      </div>

      <div className="pc-ctas">
        <button
          type="button"
          className="pc-cta pc-cta--primary"
          onClick={() =>
            openQuote("pricing_calculator", {
              guests: guestCount,
              duration: hours,
              date: resolvedDate.toISOString().slice(0, 10),
              boat: boat.id,
            })
          }
        >
          Get a real quote →
        </button>
        <a href="tel:+15124885892" className="pc-cta pc-cta--outline">
          Call (512) 488-5892
        </a>
      </div>

      {/* ── Optional pre-party packages preview ─────────────────────── */}
      <div
        style={{
          marginTop: "2.5rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(200,169,110,0.2)",
        }}
      >
        <p
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C8A96E",
            marginBottom: "0.75rem",
            fontWeight: 500,
          }}
        >
          Optional · Pre-party packages for {getCapacityTier(guestCount)}-guest tier
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}
        >
          {(["essentials", "ultimate"] as const).map((tier) => {
            const pkg = getPrivatePackages(guestCount)[tier];
            return (
              <div
                key={tier}
                style={{
                  background: "rgba(200,169,110,0.04)",
                  border: "1px solid rgba(200,169,110,0.22)",
                  borderRadius: "10px",
                  padding: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    color: "#F5EED8",
                    margin: "0 0 0.25rem",
                    textTransform: "capitalize",
                  }}
                >
                  {tier} · ${pkg.price}
                </p>
                <p style={{ fontSize: "0.78rem", color: "rgba(237,227,208,0.65)", margin: 0, lineHeight: 1.5 }}>
                  {pkg.items.slice(0, 3).join(" · ")}
                  {pkg.items.length > 3 ? " · +" + (pkg.items.length - 3) + " more" : ""}
                </p>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: "0.75rem", color: "rgba(237,227,208,0.55)", marginTop: "0.5rem" }}>
          Add Essentials or Ultimate to your quote on the next page — both include everything set up before you step on the boat.
        </p>
      </div>

      {/* ── ATX Disco cruise peek ──────────────────────────────────── */}
      <div
        style={{
          marginTop: "1.5rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(200,169,110,0.2)",
        }}
      >
        <p
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C8A96E",
            marginBottom: "0.75rem",
            fontWeight: 500,
          }}
        >
          Bachelor / bachelorette? · ATX Disco Cruise · per-person tickets
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem", marginBottom: "0.6rem" }}>
          {[...DISCO_TIME_SLOTS.friday, ...DISCO_TIME_SLOTS.saturday].map((slot) => (
            <div
              key={slot.id}
              style={{
                background: "rgba(200,169,110,0.04)",
                border: "1px solid rgba(200,169,110,0.22)",
                borderRadius: "10px",
                padding: "0.75rem",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "0.78rem", color: "rgba(237,227,208,0.75)", margin: 0 }}>{slot.short}</p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  color: "#C8A96E",
                  margin: "0.2rem 0 0",
                }}
              >
                ${slot.pricePerPerson}
              </p>
              <p style={{ fontSize: "0.65rem", color: "rgba(237,227,208,0.5)", margin: 0 }}>per person</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.75rem", color: "rgba(237,227,208,0.55)", lineHeight: 1.5 }}>
          Optional $100 add-ons: {DISCO_ADDONS.map((a) => a.name).join(" · ")}.
        </p>
      </div>

      <p className="pc-footnote">
        Estimate only. Actual pricing depends on date, package, and any add-ons (lily pads,
        catering, decor). Use "Get a real quote" for locked pricing + live availability.
        All-in total above already includes 20% gratuity, 8.25% TX sales tax, and 3% booking fee.
      </p>
    </div>
  );
}
