import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * /austin-party-bus-shuttle — captures "austin party bus",
 * "austin shuttle bachelorette", "party bus to lake travis"
 * long-tails. Positions Premier Party Cruises as the coordinator
 * that handles transport-to-marina logistics, not just the boat.
 */
export default function PartyBusShuttleV2() {
  const faqs = [
    {
      q: 'Do Austin party boats provide shuttle service to the marina?',
      a: "Yes — Premier Party Cruises coordinates party bus, shuttle, and limo transport from downtown Austin hotels and Airbnbs to Anderson Mill Marina. We don't own the buses (we're a party boat company), but we have trusted Austin party-bus operators we've worked with for years and can connect your group directly. Typical round-trip day: $600–$1,500 depending on guest count and bus size. Buses drop directly at the marina dock — flat, accessible, wedding-attire friendly.",
    },
    {
      q: 'How much does a party bus cost from downtown Austin to Lake Travis?',
      a: "Austin party-bus pricing to Anderson Mill Marina round-trip: $600–$1,000 for 10–20 passengers, $1,000–$1,500 for 20–40 passengers (coach-bus tier). Includes driver, insurance, and 4–6 hours of service covering drop-off, wait time, and pickup. Tips are customary at 15–20% of the fare. More economical than Uber XL for groups of 8+, and the bus itself becomes part of the pre-party — most have sound systems, LED lighting, and BYOB-friendly cabins.",
    },
    {
      q: 'What Austin party-bus companies do you recommend?',
      a: "We maintain relationships with several trusted Austin party-bus operators we've coordinated for our clients' weekends over 15+ years. Specific operator recommendations vary based on your date, group size, and budget — easiest to send us a message with your cruise booking details and we'll connect you with 2–3 options. Operators we've worked with include coach-bus companies, party-bus specialists, and sprinter-van providers for smaller groups.",
    },
    {
      q: 'Can Uber or Lyft handle a group of 10+ from downtown to Anderson Mill Marina?',
      a: "Uber XL and Lyft XL handle 5–6 passengers max per vehicle. For a group of 10+, you'd need 2–3 vehicles and coordinating pickup + drop-off gets messy (different arrival times, different drivers, some cars may not have trunk space for coolers). A single party bus is usually the better call for 8+ guests: one coordinator, one pickup window, one drop-off at the dock, and the vehicle becomes part of the experience instead of 3 separate rideshare trips.",
    },
    {
      q: 'Does Anderson Mill Marina accommodate party buses?',
      a: "Yes — Anderson Mill Marina has a dedicated drop-off zone directly at the dock. Party buses, shuttles, coach buses, limousines, and sprinter vans all pull up to the dock, unload, and park in the free marina lot (which has plenty of room for buses). The flat path from the drop-off zone to the boat is wedding-attire-friendly and accessible. Return pickup window coordinates with cruise end time.",
    },
    {
      q: 'Can we BYOB on the party bus ride to Lake Travis?',
      a: "Depends on the bus operator. Some party-bus operators allow BYOB with licensed chauffeurs (cans and plastic only, no glass — same rule as the boat). Others do not. We'll connect you with BYOB-friendly Austin party-bus operators when we coordinate your transport. Many Austin bachelor/bachelorette groups pre-load the bus with BYOB from Party On Delivery so the party starts in the vehicle.",
    },
    {
      q: 'How long is the party-bus ride from downtown Austin?',
      a: "25 minutes from downtown Austin to Anderson Mill Marina via 183 North — about 20 miles. Party buses typically budget 30 minutes each way to account for traffic and drop-off logistics. Good party-bus operators time departure to arrive 20 minutes before your cruise slot so you board without rushing.",
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/austin-party-bus-shuttle"
      pageTitle="Austin Party Bus + Shuttle To Lake Travis · Anderson Mill Marina Transport · Premier Party Cruises"
      pageDescription="Austin party bus and shuttle coordination for Lake Travis party boat trips. $600–$1,500 round-trip depending on group size. Direct drop-off at Anderson Mill Marina dock. 25 min from downtown Austin. Trusted operators we've worked with for 15+ years. The easiest way to get a group of 10+ from downtown to the boat."
      heroEyebrow="Transport Coordination"
      heroHeadline={<>Party bus to <em>Anderson Mill Marina</em>.</>}
      heroBody="Austin party bus + shuttle coordination for groups of 10+ from downtown to Lake Travis. Premier Party Cruises has trusted party-bus operator relationships going back 15+ years. Direct drop-off at the marina dock (no stairs), round-trip $600–$1,500 depending on group size. The bus becomes part of the pre-party — BYOB-friendly cabins, sound systems, LED lighting. Cleaner than 3 Uber XLs."
      primaryCta={{ text: 'Start Your Quote', href: '/quote' }}
      secondaryCta={{ text: 'Plan Your Trip', href: '/plan-your-trip' }}
      faqs={faqs}
      finalCtaHeadline={<>One pickup window, one drop-off, one <em>celebration</em>.</>}
      finalCtaBody="Send us your cruise booking details and we'll connect you with 2–3 Austin party-bus operators we trust. No middleman markup — you book direct, we just make the intro."
    />
  );
}
