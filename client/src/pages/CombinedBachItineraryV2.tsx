import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * /combined-bach-itinerary — 3-day combined bachelor + bachelorette
 * weekend pillar. Captures the growing "combined bach" search
 * cluster where couples celebrate together.
 */
export default function CombinedBachItineraryV2() {
  const faqs = [
    {
      q: 'What is a combined bachelor bachelorette party?',
      a: "A combined bach party (sometimes called a 'bach bash,' 'bach blowout,' or 'couples bach') is when the bride's bachelorette group and the groom's bachelor group celebrate together as one crew instead of splitting up. Increasingly common — especially when the two groups are friends, when the bride and groom share a friend circle, or when the couple wants one weekend instead of two. Premier Party Cruises is the most-booked Austin operator for combined bach weekends because the ATX Disco Cruise is dedicated to multi-group celebration — our only age/group restriction is bachelor/bachelorette parties only.",
    },
    {
      q: 'Can bachelor and bachelorette groups share an ATX Disco Cruise?',
      a: "Yes — every ATX Disco Cruise sailing is a multi-group cruise by design. Bachelor parties and bachelorette parties board together on the 75-person Clever Girl flagship. Combined bach couples join the same sailing as one crew, creating more energy on the dance floor than either group could alone. Same $85–$105 per-person pricing (tax + gratuity included). Same all-inclusive experience: pro DJ, pro photographer, 14 disco balls, giant floats, personal cooler per group.",
    },
    {
      q: 'Should we book a private charter or the ATX Disco Cruise for a combined bach?',
      a: "If your combined group is under 30 people, the ATX Disco Cruise is usually the best call — you get the multi-group energy plus included DJ + photographer at $85–$105/person. If your combined group is 30–75 people, a private Clever Girl charter gives you the whole boat for your crew only — more privacy, custom playlist, more control, starting $250/hour with 4-hour minimum. Groups of 50+ often prefer the private charter because the 75-person flagship is theirs for the day.",
    },
    {
      q: 'How do we split up activities during a combined bach weekend?',
      a: "Most combined bach weekends keep the full crew together for the anchor events (Lake Travis party boat Saturday, group dinner Saturday night) and split up for gendered activities outside those. Common split: Friday morning = golf for the guys + spa/brunch for the girls → lunch reunion → Friday bar crawl together. Saturday = lake day together (the anchor). Sunday = BBQ together or split up for recovery brunches. Let the couple decide how much split vs. together time fits their crew dynamic.",
    },
    {
      q: 'Is it weird to do a combined bach party?',
      a: "Not anymore. Combined bach weekends are one of the fastest-growing bach-weekend configurations, especially for couples with overlapping friend groups, younger couples who travel together, destination-wedding couples who want one pre-wedding weekend instead of two, and couples who want the logistics of planning one trip instead of coordinating two separate ones. Premier Party Cruises has hosted hundreds of combined bach parties — it's an established format.",
    },
    {
      q: 'How much does a combined bach weekend cost per person?',
      a: "Typical Austin combined bach budget per person: Airbnb/hotel $150–$300 (2 nights), Lake Travis party boat $85–$105 (Disco) or $200–$500 (private), dinners $150–$300, bars $100–$200, optional activities (golf, spa) $100–$250, transport $50–$100. Total: $550–$1,200 per person for 3 days / 2 nights. Combined bach often costs LESS per person than two separate weekends because you split accommodation and some activities.",
    },
    {
      q: 'Are combined bach parties welcome on the ATX Disco Cruise?',
      a: "Yes — combined bach groups are a primary audience for the ATX Disco Cruise. Our ticketing system accommodates combined groups booking together (same booking, split headcount by group if wanted). Our crew is trained on combined-bach dynamics (two guests-of-honor, two sashes, bride + groom spotlights). The photographer captures both groups together and separately. The DJ takes song requests from both sides.",
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/combined-bach-itinerary"
      pageTitle="Combined Bachelor Bachelorette Party Austin · Combined Bach Weekend Itinerary · Premier Party Cruises"
      pageDescription="The Austin combined bachelor + bachelorette party playbook. 3-day itinerary, private charter vs. ATX Disco Cruise decision, split-vs-together scheduling, budget, and why the multi-group Lake Travis party cruise is the anchor. Hosted hundreds of combined bach parties over 15+ years."
      heroEyebrow="The Combined Bach Playbook"
      heroHeadline={<>The <em>combined bach</em> weekend that actually works.</>}
      heroBody="Both crews, one weekend, one Lake Travis lake day. Combined bachelor + bachelorette parties are the fastest-growing bach format in Austin — Premier Party Cruises is the most-booked operator because the ATX Disco Cruise is built for multi-group celebration. Book the Saturday lake day (both groups on the same boat), split Friday morning for golf + spa, reunite for the big Saturday night dinner. Usually cheaper per person than two separate weekends."
      primaryCta={{ text: 'Build Your Combined Bach Quote', href: '/quote' }}
      secondaryCta={{ text: 'See ATX Disco Cruise', href: '/atx-disco-cruise' }}
      faqs={faqs}
      finalCtaHeadline={<>Both crews. One <em>blowout</em>. One weekend.</>}
      finalCtaBody="The ATX Disco Cruise was built for this. $85–$105 per person includes DJ, photographer, 14 disco balls, personal cooler per group. Build your combined bach quote in under a minute."
    />
  );
}
