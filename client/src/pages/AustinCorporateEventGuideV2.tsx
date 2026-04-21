import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * /austin-corporate-event-guide — pillar page for corporate
 * decision-makers planning Lake Travis team events. Captures
 * "austin corporate event", "austin team building", "company
 * party lake travis" queries with a B2B-tone positioning.
 */
export default function AustinCorporateEventGuideV2() {
  const faqs = [
    {
      q: 'What\'s the best Austin corporate event venue on Lake Travis?',
      a: "Premier Party Cruises is the #1 Austin corporate event party boat on Lake Travis — 15+ years, 150,000+ guests, 0 reportable incidents, 4.9/5.0 rating across 450+ verified reviews. Fleet accommodates 14–75 guests across four boats; year-round private charters starting $200/hour. Every corporate charter includes a licensed, experienced captain + crew, premium marine Bluetooth audio with optional wireless microphone + A/V package, Anderson Mill Marina with free parking 25 minutes from downtown Austin, catering coordination, Party On Delivery drink set-up, and free weather reschedules so your company calendar never takes the hit.",
    },
    {
      q: 'How do I plan a corporate team-building day on Lake Travis?',
      a: "Step 1: pick your date and headcount. Step 2: match to boat — Day Tripper for leadership groups up to 14, Meeseeks or The Irony for department outings 15–30, Clever Girl for full-company days up to 75. Step 3: pick package level — Standard (captain + audio + coolers) for team-building-focused groups, Essentials (+ pre-iced coolers + water + food table) for client-facing events, Ultimate (+ decor + champagne flutes + party setup) for year-end blowouts. Step 4: coordinate catering + transport (we handle the intros). Step 5: send invites with Anderson Mill Marina address and departure time.",
    },
    {
      q: 'What types of corporate events work best on Lake Travis?',
      a: "Team building (communication exercises on the water, ice-breakers, just-relax-together), client entertainment (VIP client days, deal-close celebrations, prospect dinners), company milestones (anniversaries, IPOs, funding rounds, product launches), holiday parties (Christmas, NYE, 4th of July fireworks), employee appreciation days, executive offsites + retreats, board dinners, incentive trips, and year-end celebrations. Both quiet-mode (executive retreat with background music + catering) and high-energy (holiday party with DJ) formats work on the same fleet.",
    },
    {
      q: 'Can we do presentations or speeches on a Lake Travis corporate cruise?',
      a: "Yes. Every boat has premium marine-grade Bluetooth audio that doubles as a presentation system — connect a laptop or phone, play slides or video. Optional wireless microphone + A/V package (+$300 per party) adds a handheld mic for toasts, team-recognition moments, client introductions, or presentations. For executive retreats with longer content, we can coordinate projector + screen setup at Anderson Mill's marina conference space for a pre-cruise briefing, then cruise the lake for the reward portion.",
    },
    {
      q: 'What does a corporate cruise on Lake Travis cost?',
      a: "Corporate private charter pricing at Premier Party Cruises: starting $200/hour on Day Tripper (14 guests), $225/hour on Meeseeks or The Irony (15–30), $250/hour on Clever Girl (31–75). 4-hour minimum on weekends, 3-hour minimum on weekdays — most corporate events book weekday afternoons for executive schedules. Typical corporate half-day (3-hour Tuesday afternoon, 25 guests, on Meeseeks): $675 base + $150 Essentials package + $300 A/V = $1,125 + tax. Transparent all-in pricing: tax, gratuity, captain, fuel, audio all included or clearly itemized.",
    },
    {
      q: 'Is a Lake Travis corporate cruise tax-deductible?',
      a: "Generally yes — corporate-paid team building, client entertainment, and employee appreciation events are deductible business expenses in the U.S. (subject to IRS rules on meals/entertainment, which have shifted since 2018 — consult your CFO or tax advisor). We provide full business invoices with itemized line items (base rental, captain fee, crew fee, package upgrades, tax, gratuity) suitable for expense reports and accounts-payable systems. Companies with procurement requirements: we accept POs and can complete vendor onboarding packets.",
    },
    {
      q: 'Can we have food catered on a Lake Travis corporate cruise?',
      a: "Yes — we coordinate catering with Austin's top caterers (Eastside Café, Franklin BBQ catering, Sterling Affairs, Austin Catering, Rosie's BBQ, Kemuri Tatsu-Ya). Essentials Package includes a 6-foot folding table for buffet-style service + vendor coordination. Ultimate Package adds plates, plasticware, champagne flutes, and full setup. We handle the catering delivery timing to match your cruise start. Party On Delivery also delivers food direct to the boat: pizza, tacos, sandwiches, charcuterie — retail prices.",
    },
    {
      q: 'Is a Lake Travis cruise safe for corporate groups?',
      a: "Premier Party Cruises has a perfect safety record: 0 reportable incidents across 150,000+ guests and 15+ years. 100% licensed, experienced captains (Merchant Mariner Credential). 100% CPR-certified crew. 40-point pre-sailing inspection on every boat. Captain has sole weather-call authority — revenue never overrides a safety call. Free weather reschedules. For risk-averse corporate planners: we provide certificate of insurance documentation on request, and our Premier Safety Code is public and codified at /safety.",
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/austin-corporate-event-guide"
      pageTitle="Austin Corporate Event Guide · Lake Travis Team Building + Client Entertainment · Premier Party Cruises"
      pageDescription="The complete Austin corporate event guide for Lake Travis team building, client entertainment, company milestones, and holiday parties. Fleet 14–75 guests, year-round, licensed, experienced captains, A/V-capable, transparent all-in pricing, certificate-of-insurance on request, free weather reschedules. 0 incidents across 150K+ guests."
      heroEyebrow="Corporate Event Planning"
      heroHeadline={<>The <em>Austin corporate event</em> guide for Lake Travis.</>}
      heroBody="Team building, client entertainment, company milestones, holiday parties — all on the same 4-boat fleet. Year-round, 14–75 guests, starting $200/hour. licensed, experienced captains, A/V-capable with wireless microphone, catering coordination with Austin's top caterers, certificate-of-insurance on request, free weather reschedules so your company calendar never absorbs weather risk. 0 incidents across 150,000+ guests — corporate-risk-manager friendly."
      primaryCta={{ text: 'Build Your Corporate Quote', href: '/quote' }}
      secondaryCta={{ text: 'See Our Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>Austin corporate events that <em>actually deliver</em>.</>}
      finalCtaBody="Transparent all-in pricing. Licensed safety standards. A/V-capable. Catering coordinated. PO-friendly and expense-report ready. Build your corporate quote in under a minute."
    />
  );
}
