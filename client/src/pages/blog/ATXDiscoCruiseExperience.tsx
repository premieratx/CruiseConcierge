import { BlogPostLayout, TOCSection } from '@/components/blog/BlogPostLayout';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { LazyImage } from '@/components/LazyImage';
import { SectionReveal } from '@/components/SectionReveal';
import { Link } from 'wouter';
import { bachelorPartyBlogImages } from '@/lib/blogImages';
import { 
  Star, CheckCircle, AlertTriangle, Ship, Users, 
  Beer, Utensils, Sparkles, MapPin, Calendar
} from 'lucide-react';

const sections: TOCSection[] = [
  { id: 'introduction', title: 'Introduction', icon: <Star /> },
  { id: 'dos-dress-to-impress', title: 'DO: Dress to Impress', icon: <CheckCircle /> },
  { id: 'dos-hydrate', title: 'DO: Hydrate Between Beers', icon: <CheckCircle /> },
  { id: 'dos-make-friends', title: 'DO: Make Friends & Form a Supergroup', icon: <CheckCircle /> },
  { id: 'dos-bring-snacks', title: 'DO: Bring Snacks', icon: <CheckCircle /> },
  { id: 'dos-party-smart', title: 'DO: Party Hard and Party Smart', icon: <CheckCircle /> },
  { id: 'donts-liquor-shots', title: "DON'T: Overdo Hard Liquor or Shots", icon: <AlertTriangle /> },
  { id: 'donts-be-creepy', title: "DON'T: Be That Creepy or Rude Guy", icon: <AlertTriangle /> },
  { id: 'donts-forget-safety', title: "DON'T: Forget You're On a Boat", icon: <AlertTriangle /> },
  { id: 'conclusion', title: 'Party On Responsibly', icon: <Calendar /> },
];

export default function ATXDiscoCruiseExperience() {
  return (
    <BlogPostLayout
      title="The Top Do's and Don'ts for an Epic ATX Disco Cruise Bachelor Party"
      metaDescription="Master the ATX Disco Cruise experience with our ultimate guide of do's and don'ts for bachelor parties on Lake Travis. Learn insider tips for an unforgettable party boat adventure in Austin."
      publishDate="2025-01-15"
      author="Premier Party Cruises"
      heroImage={bachelorPartyBlogImages[3].src}
      heroImageAlt="Austin bachelor party group having fun on ATX Disco Cruise party boat on Lake Travis"
      keywords={[
        'atx disco cruise',
        'disco cruise tips',
        'bachelor party boat austin',
        'lake travis party boat',
        'austin disco cruise',
        'party boat dos and donts',
        'lake travis bachelor party',
        'disco cruise guide',
      ]}
      sections={sections}
      pageRoute="/blogs/atx-disco-cruise-experience"
    >
      {/* Introduction */}
      <SectionReveal>
        <section id="introduction" className="mb-12" data-testid="section-introduction">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-introduction">
            Party Like a Pro on a Lake Travis Party Boat
          </h2>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            So, you're gearing up for the famous <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-intro">
            ATX Disco Cruise</Link> on Lake Travis as part of your <Link href="/bachelor-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelor-party-austin">
            Austin bachelor party</Link>. Excellent choice, my friend. This floating fiesta is going to be the 
            highlight of your weekend – four hours of non-stop music, drinks, and new friends all partying together 
            under the Texas sun.
          </p>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            To make sure you and the boys maximize the fun (and minimize any buzzkill moments), we've compiled 
            the ultimate list of <strong>do's and don'ts specifically tailored for Austin bachelor party groups on the 
            Disco Cruise</strong>.
          </p>

          <div className="my-8">
            <LazyImage
              src={bachelorPartyBlogImages[0].src}
              alt="ATX Disco Cruise party boat Austin bachelor party celebration on Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-disco-cruise-party"
            />
          </div>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ⚓ Captain Brian's Golden Rule
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              At Premier Party Cruises, they've seen it all over <strong>14+ years and 150,000+ happy customers</strong>. 
              As Captain Brian famously puts it, the golden rule on the boat is: <strong>"Don't be a dick and don't die."</strong> 
              Succinct? Yes. But there's more to it if you want the best possible experience.
            </p>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Follow these pointers, and you'll not only have an amazing time – you'll also go down in Premier's 
            history as one of those kickass bachelor groups who "did it right." Ready? Anchors aweigh on the 
            do's and don'ts!
          </p>
        </section>
      </SectionReveal>

      {/* Primary CTA after introduction */}
      <div className="my-8 flex justify-center gap-4">
        <BlogCTA variant="primary" text="Book ATX Disco Cruise" href="/atx-disco-cruise" external={false} />
        <BlogCTA variant="secondary" text="Get Free Quote" external={false} />
      </div>

      {/* DO: Dress to Impress */}
      <SectionReveal>
        <section id="dos-dress-to-impress" className="mb-12" data-testid="section-dos-dress-to-impress">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white flex flex-wrap items-center gap-2 sm:gap-3" data-testid="heading-dos-dress-to-impress">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" /> DO: Dress to Impress (and Amuse)
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            <strong>DO wear outrageous, hilarious, or coordinated outfits and costumes.</strong> This is not the 
            time for shy fashion. The ATX Disco Cruise is basically a party where anything goes in the wardrobe 
            department – the more over-the-top, the better. We've seen bachelors rock everything from matching 
            retro basketball uniforms to full-on superhero costumes.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Legendary Sightings:</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>A neon-green "Borat" mankini on a brave soul (instant legend status)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Group themes like 70's Disco Dudes (afro wigs, bell bottoms, fake chest hair galore)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Redneck Riviera (jorts, mullet wigs, cutoff flannels) – the jorts + mullet + bolo tie combo is beautiful</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Matching sailor hats for the whole crew (with the groom in a captain's hat)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Custom tees with the groom's face or funny nickname (embarrassing him is your job!)</span>
              </li>
            </ul>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            <strong>Why do this?</strong> Not only does dressing up crank the fun dial to 11 from the start, it 
            also sets the tone for the whole boat. You're basically telling everyone: "We came to party, and we're 
            a fun bunch." It breaks ice with other groups and you'll likely get featured in Premier's photos.
          </p>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              👟 Footwear Tip: DO wear flip-flops or boat shoes that you don't mind getting wet. If your costume 
              involves a wig or accessories, bring bobby pins or straps to secure them – Lake wind is real!
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* DO: Hydrate */}
      <SectionReveal>
        <section id="dos-hydrate" className="mb-12" data-testid="section-dos-hydrate">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white flex flex-wrap items-center gap-2 sm:gap-3" data-testid="heading-dos-hydrate">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" /> DO: Hydrate Between Beers (Seriously)
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            You've heard it before, you'll hear it again: <strong>DO drink water in between those beers/cocktails.</strong> 
            Look, we're not trying to be your mom here, but dehydration is the enemy of a good time – and the Texas 
            sun will knock you on your ass if you're not careful. Four hours in the heat, dancing and sipping, can 
            sneak up on even the hardiest party animal.
          </p>

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyImage
              src={bachelorPartyBlogImages[1].src}
              alt="Austin bachelor party group having fun on Lake Travis party boat"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-party-boat-fun"
            />
            <LazyImage
              src={bachelorPartyBlogImages[2].src}
              alt="Lake Travis party boat with bachelor party guests dancing and celebrating"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-disco-cruise-group"
            />
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Premier Party Cruises has your back on this: they <strong>provide coolers of ice-cold water on board, 
            free for you to chug</strong>. Take advantage! A smart move is to make a little rule within your group: 
            after each alcoholic drink, you down a cup of water. Or at least make sure each person kills a bottle 
            of water every hour.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Pro Hydration Tips:</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>Bring <strong>electrolyte packets</strong> (like Waterboy or Liquid I.V.) to mix into water bottles mid-party</li>
              <li>Make a group rule: one water after each alcoholic drink</li>
              <li>Aim for at least one full bottle of water per hour</li>
              <li>Remember: Hydrating doesn't kill your buzz; it <em>prolongs</em> your buzz</li>
            </ul>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300 font-semibold">
            Pro-level partying is a marathon, not a sprint. You'll thank us when you're the last men standing 
            at the after-party instead of nursing sun-drunk headaches.
          </p>
        </section>
      </SectionReveal>

      {/* DO: Make Friends */}
      <SectionReveal>
        <section id="dos-make-friends" className="mb-12" data-testid="section-dos-make-friends">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white flex flex-wrap items-center gap-2 sm:gap-3" data-testid="heading-dos-make-friends">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" /> DO: Make Friends & Form a Supergroup
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            One of the coolest aspects of the ATX Disco Cruise is the social scene. <strong>DO chat it up with 
            the other Austin bachelor party and Austin bachelorette party groups on the Lake Travis party boat!</strong> You're all here for the same reason – 
            to celebrate, let loose, and have an unforgettable time.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            So mingle, my dudes! Break the ice with a cheers or offer a beverage to that group standing next to 
            your cooler. Compliment someone's wild outfit (there will be plenty). Float over on a lily pad and 
            introduce yourselves.
          </p>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Why Bother Making New Friends?</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">
              Two words: <strong>after party</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Often, what starts on the boat continues on land. It's not uncommon for multiple groups to decide 
              to join forces after the cruise, roll out together to a bar or club, and create one giant party 
              Voltron. You might meet a fun <Link href="/bachelorette-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelorette-party">
              bachelorette squad</Link> from California or another bachelor crew from NYC, and suddenly you've 
              doubled your party size for the night.
            </p>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            More people = more energy, and possibly insider tips ("You guys have to come with us to Rainey Street 
            tonight!"). Plus, making friends is just good manners. You're sharing a boat, might as well share the 
            good vibes!
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            <strong>DO take a big group picture</strong> – like everyone on the boat kind of picture – if the vibe 
            allows. The staff or photographer can often help facilitate this. Some of Premier's most legendary nights 
            were when separate parties united and essentially took over Austin as a massive bachelor/bachelorette 
            supergroup. <strong>Be that group.</strong>
          </p>
        </section>
      </SectionReveal>

      {/* DO: Bring Snacks */}
      <SectionReveal>
        <section id="dos-bring-snacks" className="mb-12" data-testid="section-dos-bring-snacks">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white flex flex-wrap items-center gap-2 sm:gap-3" data-testid="heading-dos-bring-snacks">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" /> DO: Bring Snacks (Eat, Party, Repeat)
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            This might be the most underrated tip: <strong>DO bring food on the boat and actually eat it, especially 
            early on.</strong> Four hours of drinking in the sun can turn brutal if you're running on an empty stomach. 
            You don't want anyone "blowing out" too soon because they had two beers for breakfast and nothing since.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Bachelor-Party-Tested Winners:</h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-1">🌮 Breakfast Tacos or Taquitos</p>
                <p>Grab a dozen from Whataburger or a local taco joint on the way. Clutch around hour two when someone slurs, "Did anyone bring food?"</p>
              </div>
              <div>
                <p className="font-semibold mb-1">🥪 Sandwich Tray</p>
                <p>ThunderCloud Subs does catering trays – one of Premier's own tips is that a ThunderCloud sub tray can save your life. Easy to eat, no mess, filling.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">🍕 Pizza</p>
                <p>Bold move, but if you have a big group, it works. Cold pizza = still pizza = still awesome.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">🥨 Salty Snacks</p>
                <p>Chips, pretzels, jerky – salty snacks make people drink water and help with retaining that water. Plus, who doesn't love munching chips with a cold beer?</p>
              </div>
            </div>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            <strong>The key is to eat early.</strong> Try to get everyone to nibble within the first hour before 
            you're all too caught up in party mode. It will seriously extend your stamina.
          </p>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg text-gray-900 dark:text-white">
              <strong>Pro Suggestion:</strong> Designate someone as "Snack Captain." That guy's job is to occasionally 
              hand out food or remind people to take a bite throughout the cruise. A bro who ensures you down a 
              sandwich at 1:00pm is a hero when it keeps you going till 1:00am.
            </p>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Feed the belly, fuel the party – that's the motto here. As Premier cheekily puts it, a BBQ sandwich 
            or slice of pizza "will save your life" during a day party.
          </p>
        </section>
      </SectionReveal>

      {/* DO: Party Smart */}
      <SectionReveal>
        <section id="dos-party-smart" className="mb-12" data-testid="section-dos-party-smart">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white flex flex-wrap items-center gap-2 sm:gap-3" data-testid="heading-dos-party-smart">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" /> DO: Party Hard and Party Smart
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            This is your green light to fully indulge in the craziness – with just a touch of common sense. 
            <strong>DO go all-in on the fun, because that's why you're here!</strong> Dance like a maniac, take 
            goofy photos, join that limbo contest if it spontaneously happens. In short, do let loose – no one's 
            judging, everyone's in party mode.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Party Smart Means:</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>Know your limits.</strong> Day drinking can creep up. Space out those beers with water and maybe ease off hard liquor until later.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>Watch out for your bachelor.</strong> Make sure he doesn't wander near the edge too wobbly or forget sunscreen (sunburned groom = no bueno).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>Keep track of stuff.</strong> Secure your phone and wallet somewhere safe (zippered pockets). Things can go overboard!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>Listen to crew safety briefings.</strong> Don't jump off while the boat's moving, know where life jackets are, etc.</span>
              </li>
            </ul>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Remember, Premier's crew is there to ensure you have an amazing time safely. They've got a 
            <strong> perfect safety record</strong> to maintain. So if they ask you to tweak something, respect 
            that. They don't have many rules, but the ones they do have are for good reason.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300 font-semibold">
            To sum it up: DO be the life of the party, but don't be the guy that ends the party. There's a fine 
            line between legendary and liability – we know you'll stay on the right side of it.
          </p>
        </section>
      </SectionReveal>

      {/* High-intent CTA after DO's section */}
      <div className="my-8 flex justify-center gap-4">
        <BlogCTA variant="primary" text="View Disco Cruise Packages" href="/atx-disco-cruise" external={false} />
        <BlogCTA variant="secondary" text="Contact Us" href="/contact" external={false} />
      </div>

      {/* DON'T: Liquor/Shots */}
      <SectionReveal>
        <section id="donts-liquor-shots" className="mb-12" data-testid="section-donts-liquor-shots">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white flex flex-wrap items-center gap-2 sm:gap-3" data-testid="heading-donts-liquor-shots">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0" /> DON'T: Overdo the Hard Liquor or Shots
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Listen, we're not here to police your drinking, but we've got some battle-earned wisdom: <strong>DON'T 
            make liquor shots your go-to on the boat.</strong> Could you? Yes. Should you? Probably not. Here's the 
            deal – you're absolutely allowed to bring whatever booze you want, but just because you can doesn't mean 
            you should pound Jack Daniel's in 100°F heat at 1pm.
          </p>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Premier's Tongue-in-Cheek Advice:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              "You are allowed to bring liquor and take shots. But you're also allowed to bring a pet pig on an 
              airplane if it's a therapy animal… doesn't mean it's a good idea."
            </p>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Think of drinking on the Disco Cruise like a <strong>marathon, not a sprint</strong>. The groups that 
            dominate have a steady, happy buzz going – typically thanks to beers, seltzers, maybe some mixed drinks – 
            not because they obliterated themselves with four Fireball shots in the first hour and then yakked off 
            the side.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Instead, Try This:</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>Save celebratory shots for later at night when you're back on solid ground</li>
              <li>If you bring liquor, make light mixed drinks (splash of vodka in lemonade with ice)</li>
              <li>Consider canned cocktails – pre-made, lighter than free-pour, easier to track intake</li>
              <li>Embrace the hard seltzer and beer life for the afternoon – low ABV is your friend under the sun</li>
            </ul>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            The goal is to be <strong>gloriously tipsy and joyous, not blackout or boot-and-rallying by 3pm</strong>. 
            If one of your bros says, "Shots, shots, shots!" at 12:30, feel free to invoke this advice. Be like, 
            "Yo, let's maybe shotgun a beer instead!"
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300 font-semibold">
            In short, DON'T be "that guy" who spent $$$ on a private handle of whiskey only for it to knock you 
            out cold before the boat even docks. Moderation (on the liquor, not on the fun) is key, my dudes.
          </p>
        </section>
      </SectionReveal>

      {/* DON'T: Be Creepy */}
      <SectionReveal>
        <section id="donts-be-creepy" className="mb-12" data-testid="section-donts-be-creepy">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white flex flex-wrap items-center gap-2 sm:gap-3" data-testid="heading-donts-be-creepy">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0" /> DON'T: Be That Creepy or Rude Guy
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            We're in bachelor party mode, testosterone's high, but let's lay it out: <strong>DON'T be the creep.</strong> 
            You know what we mean – keep those boundaries and respect levels in check. The Disco Cruise often has 
            multiple groups including bachelorettes. Flirting and mingling? Totally cool. Being handsy or making 
            someone uncomfortable? Not cool.
          </p>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 my-6 rounded">
            <p className="text-lg text-gray-900 dark:text-white">
              Trust us, the last thing you want is the boat vibe turning sour because one of your buddies couldn't 
              play it respectful. Premier's crew and the other guests have <strong>zero tolerance</strong> for that 
              nonsense. You might get a stern talk or even booted off at the marina if someone reports overly creepy 
              behavior. Not worth it.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">So DON'T:</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>Overdo the "rowdiness" with groups that aren't into it. If they're not reciprocating, move on gracefully. Read the room (or boat!).</li>
              <li>Keep your hands to yourselves unless you've got clear consent/comfort. A friendly high-five – great. Putting your arm around someone you just met – nah.</li>
              <li>Tone down explicit jokes or chants if they're not landing well with mixed groups around you.</li>
              <li>Trash talk other groups or start drama. You literally cannot escape each other on a boat, so keep it friendly!</li>
            </ul>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Remember, almost everyone on the boat is celebrating something – their good time is just as important 
            as yours. If you see another guy in your crew maybe being a bit annoying, step in and redirect him. 
            Sometimes a quick "hey bro, let's grab another beer over here" can defuse a weird interaction.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Also, <strong>DON'T disrespect the crew or the boat</strong>:
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li>Don't litter or throw things in the lake</li>
            <li>Don't vandalize or break stuff on the boat</li>
            <li>Be cool with the crew/DJ – they're working hard to make you rock out safely</li>
          </ul>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300 font-semibold">
            In summary: have all the fun in the world, just don't be a jerk. Everyone will go home saying, 
            "That bachelor group was awesome!" instead of "Ugh, those guys were douchey."
          </p>
        </section>
      </SectionReveal>

      {/* DON'T: Forget Safety */}
      <SectionReveal>
        <section id="donts-forget-safety" className="mb-12" data-testid="section-donts-forget-safety">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white flex flex-wrap items-center gap-2 sm:gap-3" data-testid="heading-donts-forget-safety">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0" /> DON'T: Forget You're On a Boat (Safety & Rules)
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Alright, time for a reality check: you may feel like you're at a floating nightclub, but you are 
            indeed on a boat in the middle of a lake. So <strong>DON'T ignore basic safety or the rules the crew 
            gives you.</strong> They're mostly common sense, but let's highlight a few crucial ones:
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Critical Safety Rules:</h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-1">🚫 No jumping or diving off the moving boat</p>
                <p>When anchored, they might allow a jump from a safe spot (ask first). Don't be the guy who causes a needless injury or scare.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">🦺 Wear a life jacket if you need it</p>
                <p>Not a strong swimmer? Had a few too many? No shame in grabbing a life vest or noodle. Water and unconsciousness is a bad mix.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">📱 Keep track of your belongings</p>
                <p>Phones, wallets, keys – secure them somewhere safe (zippered pockets). If something goes overboard, recovery odds are slim to none.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">🍺 Know the "no glass" policy</p>
                <p>Broken glass on deck or in water = serious hazard. Transfer liquor into plastic bottles, bring cans of beer not bottles.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">🚽 Bathroom etiquette</p>
                <p>Don't clog the marine toilet with beer cans. Use the head properly. And absolutely no "going" off the side of the boat!</p>
              </div>
              <div>
                <p className="font-semibold mb-1">♻️ No littering</p>
                <p>Keep Austin and Lake Travis beautiful. Use trash bags provided. If something blows away, try to snag it.</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              One more thing: DON'T actually die.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We laugh at Captain Brian's motto, but he means it literally too. No stupid stunts that risk life 
              and limb. Don't climb on rails, don't try to swim off on your own, don't wrestle each other near 
              edges. We want you heading to the wedding in one piece, not with a cast (or worse).
            </p>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Look, we know you're not planning to break rules or bones – you're out to have fun. But sometimes a 
            drunk brain thinks, "Yeah I can totally make that jump!" No buddy, you shouldn't. Leave the wild stuff 
            to the imagination. There's plenty of fun to be had within the safety lines.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300 font-semibold">
            Follow the crew's guidelines, don't mess with Texas (or the boat), and everyone wins. You'll have the 
            time of your life and live to tell the tale – without any "oh sh*t" moments.
          </p>
        </section>
      </SectionReveal>

      {/* Conclusion */}
      <SectionReveal>
        <section id="conclusion" className="mb-12" data-testid="section-conclusion">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-conclusion">
            Party On (Responsibly) Garth!
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            There you have it – the key do's and don'ts straight from the playbook of countless party voyages. 
            In the end, it all boils down to one principle: <strong>have an insane amount of fun without causing 
            harm (to yourself, others, or the vibe).</strong> If you can manage that, you're golden.
          </p>

          <div className="my-8">
            <LazyImage
              src={bachelorPartyBlogImages[3].src}
              alt="Epic bachelor party celebration on ATX Disco Cruise Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-conclusion"
            />
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Picture it: you and your bachelor crew, thriving on the <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-conclusion">
            ATX Disco Cruise</Link> – decked out in ridiculous matching outfits, drinks in hand (with water chasers 
            of course), making fast friends with another group, dancing like there's no tomorrow, snacking on tacos 
            between beers, and capturing epic memories with the sunset over Lake Travis as your backdrop. 
            <strong>That's the experience we want y'all to have.</strong>
          </p>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg text-gray-900 dark:text-white">
              By following these do's and don'ts, you're basically guaranteeing it. The Premier Party Cruises staff 
              will be giving you virtual high-fives for being such rockstar guests. Other parties will remember your 
              group as "those super fun, cool guys from [Your City]." And most importantly, the groom will be forever 
              grateful that his bachelor bash was legendary for all the right reasons – no injuries, no dramas, just 
              pure bachelor party glory.
            </p>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            So when in doubt, just recall Captain Brian's motto: <strong>"Don't be a dick and don't die."</strong> 
            It's crude, it's simple, and honestly – it's kind of foolproof.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300 font-semibold">
            Now go forth, gentlemen, and conquer that party barge! Follow the rules-ish, but also follow the call 
            of the disco ball. We trust you to strike that balance. Have a blast, be safe, and make Austin proud.
          </p>

          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Related Guides:</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/bachelor-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelor-party-related">
                  → Austin Bachelor Party Ideas: Top Things to Do
                </Link>
              </li>
              <li>
                <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-semibold" data-testid="link-disco-cruise-related">
                  → Learn More About the ATX Disco Cruise
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-brand-blue hover:underline font-semibold" data-testid="link-blogs-related">
                  → Browse All Bachelor & Bachelorette Party Guides
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA */}
      <div className="my-8 flex justify-center gap-4 flex-wrap">
        <BlogCTA variant="primary" text="Book Your Party Cruise Now" href="/atx-disco-cruise" external={false} />
        <BlogCTA variant="secondary" text="Get Custom Quote" external={false} />
      </div>
    </BlogPostLayout>
  );
}
