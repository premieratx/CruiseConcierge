import { BlogPostLayout, TOCSection } from '@/components/blog/BlogPostLayout';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { LazyImage } from '@/components/LazyImage';
import { SectionReveal } from '@/components/SectionReveal';
import { Link } from 'wouter';
import { Heart, Ship, Wine, Camera, Music, Calendar, Users, Sparkles, Gift } from 'lucide-react';

const sections: TOCSection[] = [
  { id: 'introduction', title: 'Celebrate Love on Lake Travis', icon: <Heart /> },
  { id: 'why-boat-party', title: 'Why Choose a Boat Party', icon: <Ship /> },
  { id: 'package-options', title: 'Anniversary Boat Packages', icon: <Gift /> },
  { id: 'byob-packages', title: 'BYOB Alcohol Packages', icon: <Wine /> },
  { id: 'perfect-experience', title: 'Creating the Perfect Experience', icon: <Sparkles /> },
  { id: 'celebration-ideas', title: 'Sample Celebration Ideas', icon: <Calendar /> },
  { id: 'real-celebrations', title: 'Real Anniversary Celebrations', icon: <Heart /> },
  { id: 'planning', title: 'Planning Your Anniversary Party', icon: <Users /> },
  { id: 'conclusion', title: 'Make This Unforgettable', icon: <Heart /> },
];

const anniversaryImages = [
  { src: '/attached_assets/party-atmosphere-1.webp', alt: 'Romantic party atmosphere on Lake Travis' },
  { src: '/attached_assets/party-atmosphere-2.webp', alt: 'Couples celebrating on party boat' },
  { src: '/attached_assets/party-atmosphere-3.webp', alt: 'Lake Travis sunset celebration' },
  { src: '/attached_assets/atx-disco-cruise-party.webp', alt: 'Anniversary party on ATX Disco Cruise' },
  { src: '/attached_assets/clever-girl-50-person-boat.webp', alt: 'Large boat for anniversary gatherings' },
  { src: '/attached_assets/meeseeks-25-person-boat.webp', alt: 'Mid-size boat perfect for anniversary parties' },
  { src: '/attached_assets/day-tripper-14-person-boat.webp', alt: 'Intimate boat for couples anniversary' },
  { src: '/attached_assets/@capitalcityshots-1_1760080740012.jpg', alt: 'Friends celebrating on Lake Travis' },
  { src: '/attached_assets/@capitalcityshots-5_1760080740018.jpg', alt: 'Group celebration on party boat' },
  { src: '/attached_assets/@capitalcityshots-10_1760080740019.jpg', alt: 'Dancing and celebrating on the water' },
  { src: '/attached_assets/@capitalcityshots-15_1760080740020.jpg', alt: 'Lake Travis party boat fun' },
  { src: '/attached_assets/@capitalcityshots-20_1760080740021.jpg', alt: 'Anniversary celebration atmosphere' },
  { src: '/attached_assets/dancing-party-scene.webp', alt: 'Celebrating special moments on Lake Travis' },
];

export default function WeddingAnniversaryCelebrationIdeas() {
  return (
    <BlogPostLayout
      title="Wedding Anniversary Ideas | Lake Travis Boat"
      metaDescription="Celebrate your wedding anniversary on Lake Travis with romantic boat rentals and BYOB packages. Intimate cruises or group celebrations for milestone anniversaries."
      publishDate="2025-08-12"
      author="Premier Party Cruises Team"
      heroImage={anniversaryImages[0].src}
      heroImageAlt={anniversaryImages[0].alt}
      keywords={[
        'wedding anniversary',
        'anniversary celebration ideas',
        'lake travis anniversary',
        'romantic boat rental austin',
        'anniversary party boat',
        'milestone celebration',
        'anniversary cruise',
        'lake travis boat rental',
        'austin anniversary ideas',
        'romantic lake travis',
      ]}
      sections={sections}
      pageRoute="/wedding-anniversary-celebration-ideas"
    >
      {/* Introduction: Celebrate Love on Lake Travis */}
      <SectionReveal>
        <section id="introduction" className="mb-12" data-testid="section-introduction">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-introduction">
            Introduction: Celebrate Love on Lake Travis
          </h2>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Your <strong>wedding anniversary</strong> deserves more than just a dinner reservation. It's a celebration 
            of your love story, your commitment, and all the incredible memories you've created together. Why not make 
            this year's anniversary truly unforgettable with a romantic celebration on the stunning waters of{' '}
            <strong>Lake Travis</strong>?
          </p>
          
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyImage
              src={anniversaryImages[1].src}
              alt={anniversaryImages[1].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-1"
            />
            <LazyImage
              src={anniversaryImages[2].src}
              alt={anniversaryImages[2].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-2"
            />
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Whether you're celebrating your first anniversary or your fiftieth, <strong>Lake Travis</strong> offers 
            the perfect backdrop for a romantic anniversary celebration. Picture this: crystal-clear waters, breathtaking 
            Texas Hill Country scenery, golden sunsets painting the sky, and you and your loved ones creating new memories 
            on a <Link href="/private-cruises" className="text-brand-blue hover:underline font-semibold" data-testid="link-private-cruises-1">
            private party boat cruise</Link>.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            At <strong>Premier Party Cruises</strong>, we've helped hundreds of couples celebrate their love with 
            unique anniversary experiences on Lake Travis. From intimate sunset cruises for two to grand celebrations 
            with family and friends, we offer customizable packages that recreate the magic of your special day. And 
            the best part? With our{' '}
            <Link href="/partners" className="text-brand-blue hover:underline font-semibold" data-testid="link-partners">
            Party On Delivery partnership</Link>, all your favorite beverages can be delivered directly to the marina, 
            making planning effortless.
          </p>

          <div className="bg-rose-100 dark:bg-rose-900/20 border-l-4 border-rose-600 p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              💕 Fun Fact: Many couples choose the <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-1">
              ATX Disco Cruise</Link> to celebrate their anniversary with friends, making it a party they'll never forget!
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* Why Choose a Boat Party for Your Anniversary */}
      <SectionReveal>
        <section id="why-boat-party" className="mb-12" data-testid="section-why-boat-party">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-why-boat-party">
            Why Choose a Boat Party for Your Anniversary
          </h2>
          
          <div className="my-8">
            <LazyImage
              src={anniversaryImages[3].src}
              alt={anniversaryImages[3].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-3"
            />
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            In a world full of restaurant dinners and movie dates, a <strong>Lake Travis anniversary boat party</strong> 
            stands out as a truly unique and memorable way to celebrate your love. Here's why couples are choosing boat 
            celebrations for their special milestones:
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              <Heart className="inline h-6 w-6 mr-2 text-rose-600" />
              Unique & Unforgettable Experience
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Skip the ordinary and create an extraordinary celebration that you and your partner will remember forever. 
              A boat cruise offers romance, adventure, and stunning natural beauty all in one package.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              <Users className="inline h-6 w-6 mr-2 text-brand-blue" />
              Intimate or Group Celebrations
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Whether you want a romantic cruise for just the two of you or a party with your closest friends and family, 
              we offer boats of all sizes. Our <Link href="/private-cruises" className="text-brand-blue hover:underline font-semibold" data-testid="link-private-cruises-2">
              fleet ranges from intimate 14-passenger boats to spacious 75-passenger party barges</Link>.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              <Camera className="inline h-6 w-6 mr-2 text-purple-600" />
              Picture-Perfect Sunset Views
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Lake Travis is famous for its spectacular sunsets. Imagine toasting to your love as the sky transforms 
              into brilliant shades of pink, orange, and purple. These are the moments that make anniversaries truly special.
            </p>
          </div>

          <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <LazyImage
              src={anniversaryImages[4].src}
              alt={anniversaryImages[4].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-4"
            />
            <LazyImage
              src={anniversaryImages[5].src}
              alt={anniversaryImages[5].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-5"
            />
            <LazyImage
              src={anniversaryImages[6].src}
              alt={anniversaryImages[6].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-6"
            />
          </div>

          <div className="my-8 flex justify-center gap-4">
            <BlogCTA variant="primary" text="Book Your Anniversary Cruise" />
            <BlogCTA variant="secondary" />
          </div>
        </section>
      </SectionReveal>

      {/* Anniversary Boat Package Options */}
      <SectionReveal>
        <section id="package-options" className="mb-12" data-testid="section-package-options">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-package-options">
            Anniversary Boat Package Options
          </h2>

          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Every anniversary is unique, and your celebration should be too. That's why we offer a variety of{' '}
            <Link href="/private-cruises" className="text-brand-blue hover:underline font-semibold" data-testid="link-private-cruises-3">
            private cruise packages</Link> tailored to different celebration styles and group sizes.
          </p>

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg p-6 mb-6 border border-rose-200 dark:border-rose-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              🌅 Romantic Sunset Cruise for Couples
            </h3>
            <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
              Perfect for: 1st, 5th, or any milestone anniversary
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Our intimate <strong>Day Tripper (14-passenger boat)</strong> is ideal for couples who want a private, 
              romantic experience. Enjoy the entire boat to yourselves, or invite a few close friends to join the celebration.
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>4-hour cruise on Lake Travis with USCG-certified captain</li>
              <li>Sunset timing for the most romantic atmosphere</li>
              <li>BYOB with coolers, ice, and water provided</li>
              <li>Swimming stops with lily pad floats</li>
              <li>Bluetooth sound system for your favorite romantic playlist</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              👨‍👩‍👧‍👦 Family & Friends Group Celebration
            </h3>
            <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
              Perfect for: 10th, 25th, 50th anniversary milestones
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Celebrate with everyone who's been part of your journey! Our <strong>Meeseeks (25-passenger)</strong> or{' '}
              <strong>Clever Girl (50-75 passenger boats)</strong> can accommodate your entire crew.
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Room for extended family and close friends</li>
              <li>Optional BBQ catering packages available</li>
              <li>DJ and dance floor space on larger boats</li>
              <li>Professional photographer available for booking</li>
              <li>Party On Delivery alcohol service for hassle-free planning</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 mb-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              🎉 Anniversary + Milestone Combo Celebrations
            </h3>
            <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
              Perfect for: Combined anniversary + birthday, vow renewal, or special achievement
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Why celebrate just one milestone when you can celebrate multiple? Many couples choose to combine their 
              anniversary with other special occasions for an epic Lake Travis party.
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Fully customizable packages</li>
              <li>Multiple celebration themes in one event</li>
              <li>Custom decorations and personalization</li>
              <li>Flexible timing and itinerary</li>
            </ul>
          </div>

          <div className="my-8">
            <LazyImage
              src={anniversaryImages[7].src}
              alt={anniversaryImages[7].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-7"
            />
          </div>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              💡 Pro Tip: Book your <Link href="/contact" className="text-brand-blue hover:underline font-bold" data-testid="link-contact-1">
              anniversary cruise</Link> at least 2-3 months in advance to secure your preferred date and boat, especially 
              for popular dates like summer weekends and major holidays.
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* BYOB Alcohol Packages Made Easy */}
      <SectionReveal>
        <section id="byob-packages" className="mb-12" data-testid="section-byob-packages">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-byob-packages">
            BYOB Alcohol Packages Made Easy
          </h2>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            One of the best parts about celebrating your anniversary on Lake Travis? You can bring your own beverages 
            and toast to your love with your favorite champagne, wine, or cocktails. And thanks to our exclusive 
            partnership with <Link href="/partners" className="text-brand-blue hover:underline font-semibold" data-testid="link-partners-2">
            Party On Delivery</Link>, you don't even have to worry about shopping and hauling everything to the marina.
          </p>

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyImage
              src={anniversaryImages[8].src}
              alt={anniversaryImages[8].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-8"
            />
            <LazyImage
              src={anniversaryImages[9].src}
              alt={anniversaryImages[9].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-9"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              <Wine className="h-6 w-6 mr-2 text-rose-600" />
              How Party On Delivery Works
            </h3>
            <ol className="list-decimal pl-6 text-lg text-gray-700 dark:text-gray-300 space-y-3">
              <li>
                <strong>Browse & Order:</strong> Choose from an extensive selection of beer, wine, champagne, and spirits 
                online. They offer everything from budget-friendly options to premium top-shelf selections.
              </li>
              <li>
                <strong>Select Delivery Time:</strong> Schedule delivery directly to Emerald Point Marina on the day 
                of your cruise. Your order arrives cold and ready to go.
              </li>
              <li>
                <strong>Skip the Hassle:</strong> No driving to liquor stores, no hauling heavy coolers, no stress. 
                Just show up and enjoy your anniversary celebration!
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-900/20 dark:to-amber-900/20 rounded-lg p-6 mb-6 border border-rose-200 dark:border-rose-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              🥂 Popular Anniversary Beverage Packages
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Romantic Champagne Toast Package</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Perfect for intimate celebrations: Premium champagne or prosecco, sparkling wine selections, and elegant 
                  mixers for signature cocktails.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Wine Lovers Package</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Curated selection of Texas wines, reds, whites, and rosés. Perfect for sunset sipping on the water.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Full Bar Party Package</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  For larger anniversary celebrations: Beer selections (craft and domestic), spirits, mixers, and 
                  everything you need to create a floating cocktail bar.
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Remember: All beverages must be in cans or plastic bottles (no glass for safety). We provide coolers, 
            ice, and water. You bring the fun!
          </p>

          <div className="my-8 flex justify-center">
            <BlogCTA variant="secondary" text="Get a Custom Quote" />
          </div>
        </section>
      </SectionReveal>

      {/* Creating the Perfect Anniversary Experience */}
      <SectionReveal>
        <section id="perfect-experience" className="mb-12" data-testid="section-perfect-experience">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-perfect-experience">
            Creating the Perfect Anniversary Experience
          </h2>

          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            The magic is in the details. Here's how to customize your <strong>Lake Travis anniversary cruise</strong> 
            to create an unforgettable celebration that reflects your unique love story.
          </p>

          <div className="my-8">
            <LazyImage
              src={anniversaryImages[10].src}
              alt={anniversaryImages[10].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-10"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-rose-600" />
                Perfect Timing: Sunset Cruises
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                There's nothing more romantic than watching the sunset over Lake Travis with your loved one. We recommend 
                booking our <strong>evening cruise slots</strong> that time perfectly with golden hour.
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Spring/Summer: 6:00 PM - 10:00 PM cruises</li>
                <li>Fall/Winter: 4:00 PM - 8:00 PM cruises</li>
                <li>Sunset views guaranteed!</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <Music className="h-5 w-5 mr-2 text-brand-blue" />
                Music & Entertainment
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Set the mood with the perfect soundtrack for your celebration. All our boats feature premium Bluetooth 
                sound systems.
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Create a custom anniversary playlist</li>
                <li>Include your wedding songs</li>
                <li>Optional DJ service for larger parties</li>
                <li>Live music can be arranged</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <Camera className="h-5 w-5 mr-2 text-purple-600" />
                Professional Photography
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Capture every magical moment of your anniversary celebration with professional photography services.
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Professional photographer available</li>
                <li>Stunning sunset photo opportunities</li>
                <li>Candid celebration moments</li>
                <li>High-res digital photos delivered</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-amber-600" />
                Decorations & Personalization
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Make the boat your own with custom decorations and personal touches that celebrate your journey together.
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Bring banners and decorations</li>
                <li>Anniversary cake and desserts welcome</li>
                <li>Themed decorations encouraged</li>
                <li>Photo displays of your years together</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-brand-blue/10 to-purple-100/50 dark:from-brand-blue/20 dark:to-purple-900/20 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              🎵 Want the Ultimate Party Experience?
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Consider the <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-2">
              ATX Disco Cruise</Link> for your anniversary! With a live DJ, professional photographer, giant floats, 
              and the energy of other celebrating groups, it's an unforgettable way to party like you did on your wedding day!
            </p>
          </div>

          <div className="my-8 flex justify-center gap-4">
            <BlogCTA variant="primary" text="Book Your Anniversary Cruise" />
          </div>
        </section>
      </SectionReveal>

      {/* Sample Anniversary Celebration Ideas */}
      <SectionReveal>
        <section id="celebration-ideas" className="mb-12" data-testid="section-celebration-ideas">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-celebration-ideas">
            Sample Anniversary Celebration Ideas
          </h2>

          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Need inspiration? Here are some real anniversary celebration ideas that our couples have loved at 
            Premier Party Cruises:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-6 border-l-4 border-rose-600">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                💑 Intimate Sunset Cruise for Two
              </h3>
              <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
                <em>Perfect for: 1st, 5th, or any early anniversary</em>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Book the Day Tripper for just the two of you. Pack a picnic dinner, champagne, and your wedding playlist. 
                Watch the sunset, swim in the lake, and recreate your first dance under the stars.
              </p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "This is the most romantic date we've ever had. Better than our honeymoon!" - Recent anniversary couple
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                👨‍👩‍👧‍👦 10-Year Anniversary Family Celebration
              </h3>
              <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
                <em>Perfect for: Major milestone anniversaries (10th, 15th, 20th)</em>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Celebrate a decade of love with your kids and extended family. The Meeseeks boat comfortably fits 25 people. 
                Add BBQ catering, let the kids swim and play on the floats, and enjoy quality time with everyone who's 
                supported your marriage.
              </p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Our kids had a blast, grandparents loved it, and we got to celebrate 10 amazing years surrounded by love!" 
                - The Mitchell Family
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border-l-4 border-purple-600">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                🎊 25-Year Silver Anniversary Bash
              </h3>
              <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
                <em>Perfect for: 25th, 30th, 40th, 50th anniversaries</em>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Go big for your silver anniversary! Book the Clever Girl for up to 50 guests, hire a DJ, order the full 
                Party On Delivery package, and celebrate 25 years of marriage with everyone you love. Add a professional 
                photographer to capture the memories.
              </p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "We've been doing this as an annual tradition for years now. Best decision we ever made!" - Peggy P.
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 border-l-4 border-amber-600">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                💍 Friends & Couples Anniversary Group Party
              </h3>
              <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
                <em>Perfect for: Any anniversary + friend group celebration</em>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Invite other couples who got married around the same time! Split the cost of a large boat, celebrate 
                multiple anniversaries at once, and make it a yearly tradition. The <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-semibold" data-testid="link-atx-disco-cruise-3">
                ATX Disco Cruise</Link> is perfect for this vibe.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-l-4 border-green-600">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                💒 Vow Renewal Ceremony on the Water
              </h3>
              <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
                <em>Perfect for: Any major milestone or recommitment</em>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Some couples choose to renew their vows on Lake Travis as part of their anniversary celebration. We can 
                coordinate with officiants, arrange special decorations, and create an intimate ceremony followed by 
                a celebration cruise with your guests.
              </p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Renewing our vows on the boat with the sunset as our backdrop was more beautiful than our actual wedding!" 
                - Anniversary vow renewal couple
              </p>
            </div>
          </div>

          <div className="my-8">
            <LazyImage
              src={anniversaryImages[11].src}
              alt={anniversaryImages[11].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-11"
            />
          </div>
        </section>
      </SectionReveal>

      {/* Real Anniversary Celebrations at Premier Party Cruises */}
      <SectionReveal>
        <section id="real-celebrations" className="mb-12" data-testid="section-real-celebrations">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-real-celebrations">
            Real Anniversary Celebrations at Premier Party Cruises
          </h2>

          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Don't just take our word for it. Here are real testimonials from couples who celebrated their love on 
            Lake Travis with Premier Party Cruises:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-rose-600">
              <div className="flex items-start mb-3">
                <Heart className="h-6 w-6 text-rose-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Terrence Mitchell - 10-Year Anniversary
                  </h3>
                  <div className="flex text-amber-400 mb-2">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                "You guys killed it!!! Captain, crew and bus driver!!! Just an awesome experience! Thank you guys again 
                for helping my wife and I celebrate our 10-year anniversary!"
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-brand-blue">
              <div className="flex items-start mb-3">
                <Heart className="h-6 w-6 text-brand-blue mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Peggy P. - Annual Anniversary Tradition
                  </h3>
                  <div className="flex text-amber-400 mb-2">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                "My husband and I have started a tradition of having an annual party barge event with our entire family 
                and friends. We have used Premier Party Cruises for the past two years and are going to book them again 
                for this summer. We have all ages attend, from 8 years old to 80 years old, and everyone has had a great 
                time and they are all looking for the invite again this year. Brian, the owner, has been very accommodating 
                and helpful in making it a fun experience for all. We have had approximately 75 people attend our annual 
                event and have had plenty of room for everyone and we even had room for a dance floor. We enjoyed the boat, 
                the grilling (which the guys helped us with), the water experience... We would definitely recommend Premier 
                Party Cruises for your boating adventure!!"
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
              <div className="flex items-start mb-3">
                <Heart className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Paul Puchta - Post-Wedding Celebration
                  </h3>
                  <div className="flex text-amber-400 mb-2">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                "We did a boat trip the day after our wedding reception, and it was absolutely beautiful. The restrooms 
                were clean, plenty of shade for those that wanted to avoid the sun, but also a nice deck for those that 
                wanted to catch some rays. Four hours was the perfect amount of time to listen to the DJ, dock & swim, 
                and chow down on some BBQ. We had ~50 people in our group on the largest boat and we were plenty comfortable. 
                The sunset views coming back to dock tied the whole experience together. Thank you again Brian!"
              </p>
            </div>
          </div>

          <div className="my-8">
            <LazyImage
              src={anniversaryImages[12].src}
              alt={anniversaryImages[12].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-anniversary-12"
            />
          </div>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              💬 See More Real Reviews: Check out hundreds more 5-star reviews from happy couples on our{' '}
              <Link href="/testimonials-faq" className="text-brand-blue hover:underline font-bold" data-testid="link-testimonials-faq">
              testimonials page</Link>!
            </p>
          </div>

          <div className="my-8 flex justify-center gap-4">
            <BlogCTA variant="primary" text="Book Your Anniversary Cruise" />
            <BlogCTA variant="secondary" />
          </div>
        </section>
      </SectionReveal>

      {/* Planning Your Anniversary Boat Party */}
      <SectionReveal>
        <section id="planning" className="mb-12" data-testid="section-planning">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-planning">
            Planning Your Anniversary Boat Party
          </h2>

          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Ready to book your unforgettable <strong>Lake Travis anniversary celebration</strong>? Here's everything 
            you need to know to plan the perfect day:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-rose-600" />
                Book Early for Prime Dates
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Anniversary dates are personal and non-negotiable! We recommend booking 2-3 months in advance, especially for:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Summer weekends (June-August)</li>
                <li>Valentine's Day weekend</li>
                <li>Major holidays and long weekends</li>
                <li>Popular anniversary dates (June weddings = June anniversaries!)</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <Ship className="h-5 w-5 mr-2 text-brand-blue" />
                Weather Considerations
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Lake Travis is beautiful year-round, but here's what to expect:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li><strong>Spring (March-May):</strong> Perfect temps, wildflowers blooming</li>
                <li><strong>Summer (June-August):</strong> Hot & sunny, best for swimming</li>
                <li><strong>Fall (Sept-Nov):</strong> Gorgeous colors, comfortable weather</li>
                <li><strong>Winter (Dec-Feb):</strong> Cooler, but still beautiful for cruises</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                What to Bring
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Pack smart for your anniversary cruise:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Sunscreen (Texas sun is strong!)</li>
                <li>Comfortable clothes & swimsuits</li>
                <li>Towels for swimming</li>
                <li>Camera or phone for photos</li>
                <li>Sunglasses and hats</li>
                <li>Light jacket for evening cruises</li>
                <li>Beverages in cans/plastic (no glass)</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <Gift className="h-5 w-5 mr-2 text-amber-600" />
                Catering & Food Options
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Fuel your celebration with delicious food:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Optional BBQ catering packages available</li>
                <li>Bring your own snacks and appetizers</li>
                <li>Anniversary cake welcome aboard!</li>
                <li>Special dietary accommodations available</li>
                <li>Coolers and ice provided</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg p-6 mb-6 border border-rose-200 dark:border-rose-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              📅 Ready to Book Your Anniversary Cruise?
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              It's easy to get started! Simply{' '}
              <Link href="/contact" className="text-brand-blue hover:underline font-bold" data-testid="link-contact-2">
              contact us for a free custom quote</Link> or{' '}
              <a 
                href="https://premierpartycruises.xola.com/checkout" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-blue hover:underline font-bold"
                data-testid="link-book-online"
              >
                book online directly</a>. Our team will help you plan every detail to make your anniversary 
              celebration absolutely perfect.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Have questions? We're here to help! Our experienced team has planned hundreds of anniversary celebrations 
              and we're happy to offer recommendations based on your vision, group size, and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="text-4xl font-bold text-brand-blue mb-2">14+</div>
              <div className="text-gray-700 dark:text-gray-300">Years of Experience</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="text-4xl font-bold text-brand-blue mb-2">Thousands</div>
              <div className="text-gray-700 dark:text-gray-300">Happy Guests</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="text-4xl font-bold text-brand-blue mb-2">100%</div>
              <div className="text-gray-700 dark:text-gray-300">Safety Record</div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Conclusion: Make This Anniversary Unforgettable */}
      <SectionReveal>
        <section id="conclusion" className="mb-12" data-testid="section-conclusion">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-conclusion">
            Conclusion: Make This Anniversary Unforgettable
          </h2>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Your <strong>wedding anniversary</strong> is more than just a date on the calendar—it's a celebration of 
            your journey together, your commitment, and all the beautiful memories you've created. This year, skip the 
            ordinary restaurant dinner and create an extraordinary experience on <strong>Lake Travis</strong>.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Whether you're celebrating your first anniversary or your fiftieth, whether it's just the two of you or 
            a party with 75 of your closest friends and family, <strong>Premier Party Cruises</strong> offers the 
            perfect setting to recreate the magic of your wedding day. With stunning sunset views, customizable packages, 
            hassle-free BYOB options through{' '}
            <Link href="/partners" className="text-brand-blue hover:underline font-semibold" data-testid="link-partners-3">
            Party On Delivery</Link>, and USCG-certified captains ensuring your safety, we handle all the details so 
            you can focus on what matters most: celebrating your love.
          </p>

          <div className="bg-gradient-to-r from-rose-100 to-purple-100 dark:from-rose-900/30 dark:to-purple-900/30 rounded-lg p-8 my-8 border-2 border-rose-300 dark:border-rose-700">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
              🌟 Why Choose Premier Party Cruises for Your Anniversary? 🌟
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-start">
                <span className="text-2xl mr-2">✓</span>
                <span>14+ years of experience creating magical celebrations</span>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-2">✓</span>
                <span>Boats for every size celebration (14-75 passengers)</span>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-2">✓</span>
                <span>Perfect safety record with USCG-certified captains</span>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-2">✓</span>
                <span>Hassle-free BYOB with Party On Delivery partnership</span>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-2">✓</span>
                <span>Professional photography and DJ services available</span>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-2">✓</span>
                <span>Hundreds of 5-star reviews from happy couples</span>
              </div>
            </div>
          </div>

          <p className="text-xl mb-6 text-center font-semibold text-gray-900 dark:text-white">
            Don't let another anniversary pass with just another dinner. Create memories that will last a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <BlogCTA variant="primary" text="Book Your Anniversary Cruise Now" />
            <BlogCTA variant="secondary" text="Get a Free Custom Quote" />
          </div>

          <div className="text-center mb-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              Questions about planning your anniversary celebration?
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <Link href="/contact" className="text-brand-blue hover:underline font-bold" data-testid="link-contact-3">
              Contact us today</Link> for personalized recommendations and a free quote.
            </p>
          </div>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 rounded">
            <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              📚 Related Reading
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                • <Link href="/blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations" className="text-brand-blue hover:underline" data-testid="link-lake-travis-wedding-boat-rentals">
                Lake Travis Wedding Boat Rentals</Link> - Planning a wedding? Learn about our wedding packages
              </li>
              <li>
                • <Link href="/blogs/holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination" className="text-brand-blue hover:underline" data-testid="link-holiday-celebrations-lake-travis">
                Holiday Celebrations on Lake Travis</Link> - Celebrate other special occasions on the water
              </li>
              <li>
                • <Link href="/birthday-parties" className="text-brand-blue hover:underline" data-testid="link-birthday-parties">
                Birthday Party Boat Rentals</Link> - Make birthdays special with Lake Travis cruises
              </li>
              <li>
                • <Link href="/corporate-events" className="text-brand-blue hover:underline" data-testid="link-corporate-events">
                Corporate Events & Team Building</Link> - Plan your next company celebration
              </li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              🎉 Here's to Love, Laughter, and Happily Ever After! 🎉
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 italic">
              We can't wait to be part of your anniversary celebration story.
            </p>
          </div>
        </section>
      </SectionReveal>
    </BlogPostLayout>
  );
}
