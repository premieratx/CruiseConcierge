/**
 * Affiliate landing-URL tracker.
 *
 * Reads ?ref=CODE (and variants: ?aff, ?affiliate, ?promo) off the
 * current URL on page load, looks up the matching active affiliate
 * code in Supabase, writes a click row, and stashes the resulting
 * UUIDs in sessionStorage so the Get-a-Quote flow can include them
 * in its create-lead payload (which already reads these keys).
 *
 * Call once on app boot: `trackAffiliateLanding()` in App.tsx.
 */
import { supabase } from "./supabase";

const SESSION_KEYS = {
  affiliateId: "affiliateId",
  affiliateCodeId: "affiliateCodeId",
  affiliateClickId: "affiliateClickId",
} as const;

function readParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const v = p.get(name);
  return v ? v.trim().toUpperCase() : null;
}

export async function trackAffiliateLanding(): Promise<void> {
  if (typeof window === "undefined") return;

  const alreadyTracked = sessionStorage.getItem(SESSION_KEYS.affiliateClickId);
  if (alreadyTracked) return; // first-touch attribution: don't overwrite

  const code =
    readParam("ref") ||
    readParam("aff") ||
    readParam("affiliate") ||
    readParam("promo");
  if (!code) return;

  try {
    // Look up active affiliate code → returns { affiliate_id, id }
    const { data: row, error } = await supabase
      .from("affiliate_codes")
      .select("id, affiliate_id, active")
      .eq("code", code)
      .eq("active", true)
      .maybeSingle();

    if (error || !row) return;

    // Write the click (server generates UUID + timestamps)
    const { data: click } = await supabase
      .from("affiliate_clicks")
      .insert({
        affiliate_id: row.affiliate_id,
        component_type: "landing_url",
        source_url: window.location.href,
        referrer_url: document.referrer || null,
        user_agent: navigator.userAgent,
      })
      .select("id")
      .single();

    sessionStorage.setItem(SESSION_KEYS.affiliateId, row.affiliate_id);
    sessionStorage.setItem(SESSION_KEYS.affiliateCodeId, row.id);
    if (click?.id) sessionStorage.setItem(SESSION_KEYS.affiliateClickId, click.id);
  } catch {
    /* swallow — affiliate tracking must never break the page */
  }
}
