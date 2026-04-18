/**
 * Supabase client pointed at the PPC Booking project (tgambsdjfwgoohkqopns).
 *
 * This is the SAME project the old booking.premierpartycruises.com/quote-v2
 * iframe used. Keeping the client identical means when the in-house modal
 * calls `supabase.functions.invoke('create-lead', …)`, the exact same edge
 * function fires the exact same GoHighLevel webhook + Zapier trigger +
 * Google Sheets row the old flow did — with no backend changes required.
 *
 * The anon key is a public identifier safe to ship in the client. Write
 * access on tables is gated by RLS; the `create-lead` edge function is the
 * only surface we call and it handles its own auth.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tgambsdjfwgoohkqopns.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnYW1ic2RqZndnb29oa3FvcG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDYzMDUsImV4cCI6MjA3NDkyMjMwNX0.xRGHgSXJsMkxO5KV-Uh7TvLPGd8MnbYrBdKi-QNUMh4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
