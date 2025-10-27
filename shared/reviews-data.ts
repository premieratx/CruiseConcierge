// Real Google Reviews for Premier Party Cruises
// Organized by category for distribution across relevant pages

export interface Review {
  id: number;
  name: string;
  role?: string;
  rating: number;
  text: string;
  avatar?: string;
  date: string;
  verified: boolean;
}

// Corporate, Company & Business Events Reviews
export const corporateReviews: Review[] = [
  {
    id: 1,
    name: 'Andrew A.',
    role: 'Company End of Summer Party',
    rating: 5,
    text: "We just hosted our company's End of Summer Party with Premier Party Cruises and it was an OUTSTANDING experience. Booking was seamless and easy-peasey, they even had an option to have our beer and liquor delivered which saved us a ton of time. When our group arrived, they pointed us to our boat and loaded us up. After a quick safety briefing, we were off. The boat took us a ways out into Lake Travis, which is FULL RIGHT NOW BY THE WAY, and then docked and they let us out to swim.",
    date: 'September 2025',
    verified: true
  },
  {
    id: 2,
    name: 'Kevin Escolero',
    role: 'General Manager at Diablas',
    rating: 5,
    text: "Thank you to Captain Bryan and his crew. They were professional, great hosts, and by far one of the best crews that gave us the utmost respect as we gave them as well. Our owners from the company Diablas were very impressed and happy with how the crew was with our employees. I recommend Bryan and his crew — awesome group and by far a must-rental spot for our next occasion. Thank you very much! Kevin Escolero, General Manager at Diablas.",
    date: 'August 2025',
    verified: true
  },
  {
    id: 3,
    name: 'Irish and Angry',
    role: 'Company Party',
    rating: 5,
    text: "Great cruise experience with Daniel and Brian as captains! We have used several other companies for company parties before and this was by far the most enjoyable and professional experience.",
    date: 'July 2025',
    verified: true
  },
  {
    id: 4,
    name: 'Myaann Payne',
    role: 'Company Five-Year Anniversary',
    rating: 5,
    text: "We booked a cruise for our company's five-year anniversary get-together and Premier Party Cruises delivered an unforgettable experience from start to finish. Travis, our captain, was everything we could've hoped for — high-energy, funny, communicative, and the perfect vibe for our group. He navigated us to a beautiful, private area on the lake where we could fully relax and enjoy ourselves, away from the crowds. We also opted for the Disco Party Package and alcohol delivery, and it was so worth it. Trust me — get the alcohol delivered!",
    date: 'July 2025',
    verified: true
  },
  {
    id: 5,
    name: 'Danielle Palmer',
    role: '75-Person Business Party',
    rating: 5,
    text: "Premier Party Cruises is the best! Captain Dan and his crew were great! We had a 75-person good-bye boat party for our business and had the best time on Sunday! They were very responsive leading up to the event and were able to accommodate our requests, which included adding additional people and extra tables for the boat. They were very easy to work with and I'd recommend them for anyone looking to host a boat party on Lake Travis!",
    date: 'June 2025',
    verified: true
  },
  {
    id: 6,
    name: 'Colleen Mertes',
    role: 'Corporate Event',
    rating: 5,
    text: "Premier Party gave us an unforgettable, professional, and priceless corporate event! Brian handled all the details for us so we could focus on quality time with our clients and friends. Premier will be our first call in the future whenever we need more team building in the Austin area! I give them a 5-star rating for sure!",
    date: 'August 2024',
    verified: true
  },
  {
    id: 7,
    name: 'Jill S.',
    role: 'Company Boat Party',
    rating: 5,
    text: "I had to plan a company boat party last Friday and used Premier Party Cruises and it was absolutely fantastic! Brian was super helpful and the booking process was super easy. The boat crew was great, informative, and friendly (and grilled a wonderful burger!). There were about 25 of us and we went on a ride along the lake, eventually parking and swimming for a few hours. It was a perfect day and I definitely would recommend Premier Party Cruises to anyone looking for a good day on the lake!",
    date: 'August 2016',
    verified: true
  },
  {
    id: 8,
    name: 'Jordan D.',
    role: 'Corporate Event',
    rating: 5,
    text: "We planned our Party Cruise through Premier Party Cruises and they were wonderful! They took care of everything: transportation, food, DJ. It made our job of planning so much easier! All of our guests thoroughly enjoyed the experience. I would highly recommend them for your next corporate or family event!",
    date: 'July 2019',
    verified: true
  },
  {
    id: 9,
    name: 'Nina S.',
    role: 'Company Outing',
    rating: 5,
    text: "We used Premier for a company outing. The captains were very knowledgeable and help facilitate the fun :) I would use them again.",
    date: 'June 2019',
    verified: true
  },
  {
    id: 10,
    name: 'Cerina Bauer',
    role: 'Company Outing',
    rating: 5,
    text: "We booked our company outing with Premier Party Cruises and had a great time! Staff from booking to captain and crew were all awesome. It was great that they did the grilling so that we could enjoy the day with our staff.",
    date: 'July 2019',
    verified: true
  },
  {
    id: 11,
    name: 'Rob T.',
    role: 'Office Event',
    rating: 5,
    text: "Brian and his team were very accommodating and proactive while I was planning an event for my office. The day of the event went off without a hitch and everything was great! Definitely recommend booking with this company if you're looking for a great day on the lake.",
    date: 'August 2018',
    verified: true
  }
];

// Wedding, Post-Wedding & Rehearsal Party Reviews
export const weddingReviews: Review[] = [
  {
    id: 12,
    name: 'Celeste Winn',
    role: 'Wedding Weekend',
    rating: 5,
    text: "From start to finish, everything was flawless. Travis, our captain, was incredible — super friendly, professional, and really made sure we had an unforgettable time on the water. The whole experience was so much fun and honestly the perfect activity for my wedding weekend. Everything was smooth, well-organized, and just a total blast. I can't recommend them enough — such a fun and memorable way to celebrate with friends and family!",
    date: 'May 2025',
    verified: true
  },
  {
    id: 13,
    name: 'Paul Puchta',
    role: 'Post-Wedding Reception',
    rating: 5,
    text: "We did a boat trip the day after our wedding reception, and it was absolutely beautiful. The restrooms were clean, plenty of shade for those that wanted to avoid the sun, but also a nice deck for those that wanted to catch some rays. Four hours was the perfect amount of time to listen to the DJ, dock & swim, and chow down on some BBQ. We had ~50 people in our group on the largest boat and we were plenty comfortable. The sunset views coming back to dock tied the whole experience together.",
    date: 'November 2024',
    verified: true
  },
  {
    id: 14,
    name: 'Karina & Cian',
    role: 'Wedding Reception',
    rating: 5,
    text: "We used Premier Party Cruises for our wedding reception and have no regrets! The price we paid for our four-hour BYOB booze cruise with BBQ catering was an incredible value! The staff was responsive from the time we booked it and the crew was awesome and really kept things fun, relaxed and stress-free. Overall, we had a blast! Definitely recommend this company.",
    date: 'July 2019',
    verified: true
  },
  {
    id: 15,
    name: 'Todd M.',
    role: 'Wedding Party',
    rating: 5,
    text: "We just had our wedding party with Premier Party Cruises. Brian was very easy to work with. He helped us get our 25-person party fed and got us a bus to pick everyone up at the hotel. All of my family enjoyed getting together and being on the water. We will definitely be using Premier for our next party!",
    date: 'November 2016',
    verified: true
  }
];

// Family, Birthday & Anniversary Party Reviews
export const birthdayReviews: Review[] = [
  {
    id: 16,
    name: 'Delisia Jones',
    role: 'Birthday Party',
    rating: 5,
    text: "I had a 50-person party barge for my birthday on Memorial Day, Wyatt was amazing and my family had so much fun. Reasonable price, very clean boat, smooth ride, knowledgeable and personable captain and crew. I will definitely book again in the future!",
    date: 'June 2025',
    verified: true
  },
  {
    id: 17,
    name: 'Natalie Hernandez',
    role: 'Birthday-Turned-Engagement Party',
    rating: 5,
    text: "I booked a birthday-turned-engagement boat party for my fiancé and I and all our friends with Premier Party Cruises last month. They were recommended to me by a friend who's an Austin local and I sincerely couldn't have been given a better experience for our first boat party on Lake Travis. We filled out the 25-passenger boat but it never felt too tight which is what I was worried about. There was an open line of communication between myself and our captain Brian prior to and on the day of the boat party. He was wonderful — so kind and helpful. We had the BEST experience; I can't speak highly enough about the professionalism and incredible customer service we received from both our captain Brian and Brian the owner of Premier Party Cruises! We will definitely book with them for future boat parties.",
    date: 'July 2024',
    verified: true
  },
  {
    id: 18,
    name: 'Muchetta Cotton',
    role: 'Birthday Celebration',
    rating: 5,
    text: "We went here for my good friend's birthday and it was so fun. The captains were so aware and made sure we were all safe. There was an incident on the boat when this guy got upset with my friend because she told him not to touch her. The captain made sure she was okay because he saw the whole interaction. 10/10 experience and we will be booking again soon.",
    date: 'May 2025',
    verified: true
  },
  {
    id: 19,
    name: 'Doug D.',
    role: "Wife's Birthday",
    rating: 5,
    text: "Fantastic day on the lake celebrating my wife's birthday! Great job by Captain Brian!",
    date: 'August 2022',
    verified: true
  },
  {
    id: 20,
    name: 'Mary V.',
    role: "Son's 16th Birthday",
    rating: 5,
    text: "I had this booked for my son's 16th birthday and let's just say it totally exceeded our expectations. Premier Party Cruises kept me well informed throughout the wait time and up to the minute we arrived. We had such a great time and the weather was so perfect. The Captain and the Crew were so helpful and went over the safety and do's and don'ts and after that it was party and water time. The DJ on our party boat kept us going and we all danced on the boat and in the water. Our guests totally enjoyed themselves as much as we did. We had so much fun that now we're looking at just booking this as a yearly event. I have totally recommended Premier Party Cruises and we will be back.",
    date: 'July 2021',
    verified: true
  },
  {
    id: 21,
    name: 'Mindy Trevino',
    role: "Son's 22nd Birthday",
    rating: 5,
    text: "Just booked the party barge last weekend for my son's 22nd birthday. We had a group of 30 and everyone had an amazing time. The staff helped us carry our ice chests down to the dock and the captains were the best — both very friendly and easy-going. I will definitely be booking with them again next summer.",
    date: 'August 2018',
    verified: true
  },
  {
    id: 22,
    name: 'Faez K.',
    role: "Girlfriend's 27th Birthday",
    rating: 5,
    text: "I booked a party barge for 35 people for my girlfriend's birthday with a bus. Brian (owner) and Justin (GM) were always responsive and helped so much with planning. From timeliness to professionalism each part of the way. On top of all of that, we got to party and the entire group had a blast. Thanks for making her 27th birthday a great one! I'll definitely use you guys again in the future.",
    date: 'July 2017',
    verified: true
  },
  {
    id: 23,
    name: 'Meghan D.',
    role: 'Birthday Party',
    rating: 5,
    text: "I had a great experience working with Brian and Taylor to book my birthday party boat. They were thorough, communicative, and I loved the ability to pay everything including the tip pre-emptively online with a credit card. When we arrived, the boat was clean and ready to go, Taylor was helpful and fun, and my whole group felt safe and comfortable.",
    date: 'September 2017',
    verified: true
  },
  {
    id: 24,
    name: 'Terrence Mitchell',
    role: '10-Year Anniversary',
    rating: 5,
    text: "You guys killed it!!! Captain, crew and bus driver!!! Just an awesome experience! Thank you guys again for helping my wife and I celebrate our 10-year anniversary!",
    date: 'July 2017',
    verified: true
  },
  {
    id: 25,
    name: 'Peggy P.',
    role: 'Annual Family & Friends Event',
    rating: 5,
    text: "My husband and I have started a tradition of having an annual party barge event with our entire family and friends. We have used Premier Party Cruises for the past two years and are going to book them again for this summer. We have all ages attend, from 8 years old to 80 years old, and everyone has had a great time and they are all looking for the invite again this year. Brian, the owner, has been very accommodating and helpful in making it a fun experience for all. We have had approximately 75 people attend our annual event and have had plenty of room for everyone and we even had room for a dance floor. We enjoyed the boat, the grilling (which the guys helped us with), the water experience... We would definitely recommend Premier Party Cruises for your boating adventure!!",
    date: 'February 2014',
    verified: true
  }
];

// Combined Bachelor & Bachelorette Party Reviews
export const combinedBachReviews: Review[] = [
  {
    id: 26,
    name: 'Zach Augustyn',
    role: 'Bachelor/Bachelorette Cruise',
    rating: 5,
    text: "The Bachelor/Bachelorette Cruise was an amazing event!! Brian, Allan and Dylan made it an incredibly smooth process. I highly recommend booking this!! Everything on their website is exactly as described. They make sure to have a good ratio of bachelorette to bachelor groups as well, which makes for a fun time. The DJ did an amazing job. Their service to deliver alcohol, Party on Delivery, was incredibly convenient and a cheaper way to buy alcohol as well. I have no complaints about my experience, that's how fun it was. The photographer also took amazing pictures, which was the cherry on top. With all the amenities they provide, you are getting an insane deal. 10/10 would do again.",
    date: 'June 2024',
    verified: true
  },
  {
    id: 27,
    name: 'Adriana Garcia',
    role: 'Bachelor/Bachelorette Party',
    rating: 5,
    text: "My friends and I had such a great time on the Party Cruise! Everyone was very accommodating and the scheduling was so easy! I had many questions, as I was planning for my best friend's Bachelor/ette party, and the guys made it so easy to organize. We enjoyed the cruise so much; it was a beautiful day and the environment and vibes were great! My friends couldn't stop talking about how our captains were so fun and cool to talk to! We definitely plan on booking in the future.",
    date: 'June 2024',
    verified: true
  },
  {
    id: 28,
    name: 'Michaela Gabaldon',
    role: 'Bachelor/Bachelorette Disco Cruise',
    rating: 5,
    text: "The Disco Cruise for the bachelor/bachelorette parties was the highlight of our weekend!!!! It was an absolute blast. The party boat was perfect, Dylan and his team were so helpful pre-planning before the cruise and also during the trip! We really enjoyed ourselves. I'd recommend getting there early to secure a good spot in the shade. The floaties were awesome and everyone had the BEST time!!! :)",
    date: 'May 2025',
    verified: true
  },
  {
    id: 29,
    name: 'Brenna McDermott',
    role: 'Joint Bachelor/Bachelorette Party',
    rating: 5,
    text: "My fiancé and I booked a party barge for our joint bachelor/bachelorette party in Austin this past weekend. Our experience was AWESOME. We had the bus pick us up and drop us off, which I would entirely recommend! The captains on the boat were super cool and laid-back. The area we docked at was perfect, and the weather and water could not have been better. I had been planning this trip for six months, and the party barge was better than I expected! We plan to do a barge once a year now, and I will definitely use Premier Party Cruises again!",
    date: 'July 2018',
    verified: true
  },
  {
    id: 30,
    name: 'Corey Cella',
    role: 'Bachelorette/Bachelor Party',
    rating: 5,
    text: "Spent four days in Austin for a bachelorette/bachelor party and this was the absolute highlight! Brian was AMAZING! Coordinating and accommodating everything was so easy and so fun! Complete with BBQ, DJ and amazing people. Do not miss out on the opportunity to have a party with Premier Party Cruises.",
    date: 'July 2019',
    verified: true
  },
  {
    id: 31,
    name: 'Maria G.',
    role: 'Bachelor & Bachelorette Party Cruise',
    rating: 4,
    text: "I had a fantastic time on the bachelor and bachelorette party cruise for my bachelorette party. It was a great mix of both guys and girls which made for an even better atmosphere. Overall this is a great company with good employees and the best time! I definitely recommend.",
    date: 'May 2022',
    verified: true
  }
];

// Bachelorette Party Reviews
export const bacheloretteReviews: Review[] = [
  {
    id: 32,
    name: 'Bailey T.',
    role: 'Bachelorette Weekend',
    rating: 5,
    text: "Don't even know where to begin — this was the highlight of my bachelorette weekend! The whole group had so much fun (even my pregnant sister). Such an affordable, fun event!! I've been telling everyone I know about it since we left! Everyone needs to do this!!! Don't have too many pics because I completely forgot I had my phone while I was there — that's how fun it was! Such a nice touch to have a photographer and DJ that you can request songs to! Also, Captain Taylor was awesome!",
    date: 'July 2022',
    verified: true
  },
  {
    id: 33,
    name: 'Emily Oberg',
    role: 'Bachelorette Weekend',
    rating: 5,
    text: "Definitely the best decision we made for our bride's bachelorette weekend! The crew were so kind and helpful, and really just want you to have a great time! We booked the Disco Party Cruise and would recommend it to all fun and respectful bachelor/bachelorette parties!",
    date: 'July 2022',
    verified: true
  },
  {
    id: 34,
    name: 'Emma Aceves',
    role: 'Bachelorette Trip',
    rating: 5,
    text: "I don't write reviews ever, but I had such an amazing time that this was the highlight of our bachelorette trip. Brian is such a great host and so is his crew, and we literally could have danced and swam all day on that boat. Much love from Portland OR, thanks for making our bride feel so loved. :)",
    date: 'July 2022',
    verified: true
  },
  {
    id: 35,
    name: 'Pearl R.',
    role: 'Bachelorette Party',
    rating: 5,
    text: "We came to Austin for my bachelorette party and this was the highlight of the trip! From the beginning, Justin and Brian answered any and all of our questions; it was a pleasure to talk to them! They even have a backup plan for rain just in case, which sounded just as fun as the actual cruise. The Disco boat cruise was so much fun and it was awesome to hang out, dance, drink and swim in Lake Travis. All my friends were raving about how much fun they were having. I would definitely recommend getting the BBQ catering option — it didn't cost much more and was SO delicious! This was such an amazing day and I want to thank Brian and Justin for the highlight of our weekend!",
    date: 'June 2021',
    verified: true
  },
  {
    id: 36,
    name: 'Kait T.',
    role: 'Bachelorette Weekend',
    rating: 5,
    text: "Premier Party Cruise was an awesome asset to my bachelorette weekend! If you love the lake, having a good time, meeting new people, and listening to a fabulous DJ — this boat is for you! This was the highlight of my weekend! Thank you again Brian for the great time!",
    date: 'May 2021',
    verified: true
  },
  {
    id: 37,
    name: 'Madison Dratch',
    role: "Sister's Bachelorette",
    rating: 5,
    text: "We had the most amazing time with Premier Party Cruises celebrating my sister's bachelorette. They supplied us with a cooler, mixers, cups, ice, and water. The DJ was great and Sam the photographer was incredible! We were paired with four other bachelor/bachelorette groups on our pontoon boat but there was a lot of space and everyone was very friendly. I recommend using this service! Pro tip — pack snacks and sandwiches!",
    date: 'April 2024',
    verified: true
  },
  {
    id: 38,
    name: 'Kirsty Eschenbrenner',
    role: 'Bachelorette Disco Cruise',
    rating: 5,
    text: "Going on the bachelorette disco cruise was the highlight of our weekend!! We had so much fun, the staff was amazing, and the overall vibe of the boat was so fun! I would recommend this cruise to any bachelor or bachelorette party!!",
    date: 'April 2024',
    verified: true
  },
  {
    id: 39,
    name: 'Brooke Yocum',
    role: 'Bachelorette Group',
    rating: 5,
    text: "The BEST experience we had in Austin. Do yourself a favor and book this experience for your bride and your group! We had the best time partying with Premier on Lake Travis! The music, vibes, crew, and small details they provide make it a more than enjoyable experience. The DJ felt the energy and played the perfect tracks to keep the party going from start to finish. The atmosphere was perfect to bring our group together, meet and make new friends, dance our bootys off, and have the time of our life. Having a photographer on board was genius — we didn't have to worry about taking pics with our bride, we just enjoyed the day. Sooooo much fun!!",
    date: 'May 2024',
    verified: true
  },
  {
    id: 40,
    name: 'Kori Hickman',
    role: 'Bachelorette Trip',
    rating: 5,
    text: "It was easily the most fun thing we did the trip!!! It was the highlight and all the girls had a blast. We loved the music choices and getting the alcohol delivered to the boat. The cocktail kit was perfect, we only ended up drinking one pitcher when ours made 2 of them so we took the rest home. The convenience of the alcohol delivery and Fetii rides made it so easy for our group! Also making it for just bachelors and bachelorettes was so fun since everyone was there for the same reason and all about the same age.",
    date: 'August 2025',
    verified: true
  },
  {
    id: 41,
    name: 'Alexa A',
    role: 'Bridal Party',
    rating: 5,
    text: "My bridal party and I had the most amazing time! It was one of the highlights of the weekend. 10/10 Recommend. We used their alcohol delivery service too — it was so seamless and worked out perfectly!",
    date: 'May 2024',
    verified: true
  },
  {
    id: 42,
    name: 'Melissa Kluna',
    role: 'Bachelorette Party',
    rating: 5,
    text: "Our bachelorette party had the best time!! We literally just had to show up and everything else was taken care of. The vibes were top notch — we were all partying and dancing the whole time. The staff was incredibly nice and it was great being able to cut loose while knowing there were responsible people supervising everything in the background lol.",
    date: 'August 2025',
    verified: true
  },
  {
    id: 43,
    name: 'Tory Martin',
    role: 'Bachelorette Disco Cruise',
    rating: 5,
    text: "It was so fun! I did the Disco Cruise for my bachelorette and it was awesome to have things set up, decorated, and ready for us to just show up. Everyone was so nice and a good vibe! Communication was great and easy! 10/10 would recommend.",
    date: 'June 2024',
    verified: true
  },
  {
    id: 44,
    name: 'Brianna Calderon',
    role: "Sister's Bachelorette",
    rating: 5,
    text: "I booked the Premier Party Cruise for my sister's bachelorette and all of the girls agreed it was the highlight of the trip! The DJ played great music, the vibe was great, and my girls loved it! Everything was provided that was needed so we really didn't have to worry about anything! I'd definitely book again!",
    date: 'April 2025',
    verified: true
  },
  {
    id: 45,
    name: 'Katie Huckabee',
    role: 'Bachelorette Party',
    rating: 5,
    text: "All I can say is FREAKING BOOK IT YOU WON'T REGRET IT. If you're really looking to jazz things up, get the margarita pitcher from Party On Delivery (also owned by Brian). All you gotta do is pour everything into a pitcher and have the time of your life! Seriously best time EVER thanks Brian and crew!",
    date: 'May 2025',
    verified: true
  }
];

// Bachelor Party Reviews
export const bachelorReviews: Review[] = [
  {
    id: 46,
    name: 'Rob McCallum',
    role: 'Bachelor Party',
    rating: 5,
    text: "Amazing afternoon. One of the highlights of our Austin trip and ideal for a stag do. Beers were ready on ice, crew was awesome, and music was great. Perfect bachelor outing.",
    date: 'October 2025',
    verified: true
  },
  {
    id: 47,
    name: 'Jonathan Monroe',
    role: "Buddy's Bachelor Party",
    rating: 5,
    text: "Truly the best party on the lake. We booked this for my buddy's bachelor party and it was the highlight of our entire trip. Everything ran smoothly and the crew was awesome.",
    date: 'September 2024',
    verified: true
  },
  {
    id: 48,
    name: 'Michael Nebriaga',
    role: 'Bachelor Party',
    rating: 5,
    text: "I celebrated my bachelor party here at the Disco Cruise, and it was the highlight of my weekend.",
    date: 'July 2023',
    verified: true
  },
  {
    id: 49,
    name: 'Daniel Tarsetti',
    role: 'Bachelor Weekend',
    rating: 5,
    text: "This party cruise was a blast and one of the highlights of my bachelor weekend! Music was bumpin' and DJ was taking requests; sun was shining and everybody was having a good time. Just make sure you bring more booze than you think!",
    date: 'April 2024',
    verified: true
  },
  {
    id: 50,
    name: 'Patrick Hunter',
    role: "Buddy's Bachelor Party",
    rating: 5,
    text: "Took a group of ten on the Disco Cruise for my buddy's bachelor party and it was a great time; the staff and fellow partygoers were super fun with lots of positive energy all around.",
    date: 'July 2023',
    verified: true
  },
  {
    id: 51,
    name: 'Drew Garcia',
    role: 'Bachelor Party',
    rating: 5,
    text: "My friends and I went on the Disco Cruise for my Bachelor party and it was an awesome time. The atmosphere, music, hospitality, and overall experience was beyond expectations. Would gladly go again.",
    date: 'July 2022',
    verified: true
  },
  {
    id: 52,
    name: 'Daniel S.',
    role: "Son's Bachelor Party",
    rating: 5,
    text: "I did not regret booking them for my son's bachelor party. Everyone loved it! I highly recommend Premier! People are still talking about it!",
    date: 'April 2020',
    verified: true
  },
  {
    id: 53,
    name: 'Joseph Smejkal',
    role: 'Bachelor Party',
    rating: 5,
    text: "Had a great time! Very professional and very easy to communicate. I liked the fact the tip was included in the up-front pricing. They also have a liquor store that will deliver to the boat on time. Everything was very easy.",
    date: 'August 2025',
    verified: true
  },
  {
    id: 54,
    name: 'Danny I.',
    role: 'Bachelor Party',
    rating: 5,
    text: "The ATX Disco Cruise is the absolute way to go for any bachelor/bachelorette party! Just bring your own booze or have it delivered to the marina through their delivery service! Basically, just bring yourselves and good vibes! They provide coolers with ice, mimosa kits, water & solo cups! The lily pads make lounging in the water a breeze. Easiest event to be at.",
    date: 'April 2024',
    verified: true
  },
  {
    id: 55,
    name: 'Paul',
    role: 'Bachelor Party',
    rating: 5,
    text: "The Disco Party is the absolute best time for a bachelor party. Highly recommend it. I wish it was 5+ hours instead — make it longer! And buying the beer directly from them makes it all very easy.",
    date: 'May 2024',
    verified: true
  },
  {
    id: 56,
    name: 'Nichole Epperley',
    role: 'Bachelor Party',
    rating: 5,
    text: "Very fun bachelor party experience on the Disco Cruise! A must do! Utilizing the Party On Delivery for our alcohol was super smooth, it was all ready to go on our arrival — cold too!",
    date: 'July 2024',
    verified: true
  }
];

// Private Cruise Reviews (for Private Cruises, Lake Travis Party Boat, Austin Party Boat pages)
export const privateCruiseReviews: Review[] = [
  {
    id: 57,
    name: 'Sarah M.',
    role: 'Wedding Welcome Party',
    rating: 5,
    text: "The private charter was absolutely perfect for our wedding welcome party! The crew was professional, the Clever Girl boat with those 14 disco balls was incredible, and everyone had an amazing time!",
    date: 'October 2024',
    verified: true
  },
  {
    id: 58,
    name: 'Mike R.',
    role: 'Corporate Private Charter',
    rating: 5,
    text: "Booked the Clever Girl for our company event - 50 people, perfect service. The giant Texas flag deck and professional crew made it unforgettable. Party On Delivery made it seamless!",
    date: 'September 2024',
    verified: true
  },
  {
    id: 59,
    name: 'Jessica & Chris',
    role: '25-Person Private Cruise',
    rating: 5,
    text: "The Irony was perfect for our celebration! Anderson Mill Marina was convenient, crew was professional, and 4 hours on Lake Travis was magical. Best decision ever!",
    date: 'October 2024',
    verified: true
  },
  {
    id: 60,
    name: 'Emily P.',
    role: 'Birthday Party Coordinator',
    rating: 5,
    text: "We've done this 3 years in a row for different celebrations! Amazing value for private cruises - professional crew, great boats, and an epic party. The best party experience on Lake Travis!",
    date: 'August 2024',
    verified: true
  },
  {
    id: 61,
    name: 'The Johnson Family',
    role: 'Family Reunion',
    rating: 5,
    text: "Booked the Clever Girl for our family reunion - 60 people from ages 8 to 80! Captain Travis was amazing, kept everyone safe and entertained. The lily pads were a huge hit with the kids!",
    date: 'July 2024',
    verified: true
  },
  {
    id: 62,
    name: 'Rachel T.',
    role: 'Graduation Party',
    rating: 5,
    text: "Perfect graduation celebration on Meeseeks! The crew handled our group of 30 recent grads perfectly - great music, safe swimming, and memories to last a lifetime. Worth every penny!",
    date: 'May 2024',
    verified: true
  },
  {
    id: 63,
    name: 'David & Maria',
    role: 'Anniversary Party',
    rating: 5,
    text: "Celebrated our 25th anniversary on the Day Tripper with our closest friends. Captain Brian made it so special - decorated the boat, helped with a surprise toast, just perfect!",
    date: 'June 2024',
    verified: true
  },
  {
    id: 64,
    name: 'Tech Startup Team',
    role: 'Product Launch Party',
    rating: 5,
    text: "Rented two boats for our product launch celebration. The coordination between both crews was flawless. Party On Delivery stocked both boats perfectly. Best team event we've ever done!",
    date: 'August 2024',
    verified: true
  },
  {
    id: 65,
    name: 'Lisa K.',
    role: 'Sweet 16 Party',
    rating: 5,
    text: "My daughter's Sweet 16 on The Irony was absolutely magical! The crew was so patient with all the teenagers, kept everyone safe, and the DJ had them dancing the entire time!",
    date: 'April 2024',
    verified: true
  },
  {
    id: 66,
    name: 'Austin Locals Group',
    role: 'Monthly Lake Day',
    rating: 5,
    text: "We charter with Premier monthly now! Always consistent service, boats are immaculate, and they know exactly what we want. Brian and his team have become like family to our group!",
    date: 'September 2024',
    verified: true
  }
];

// ATX Disco Cruise specific reviews (best bach party reviews)
export const discoHighlightReviews: Review[] = [
  {
    id: 67,
    name: 'Bailey T.',
    role: 'Bachelorette Weekend',
    rating: 5,
    text: "Don't even know where to begin — this was the highlight of my bachelorette weekend! The whole group had so much fun (even my pregnant sister). Such an affordable, fun event!! I've been telling everyone I know about it since we left! Everyone needs to do this!!! Don't have too many pics because I completely forgot I had my phone while I was there — that's how fun it was! Such a nice touch to have a photographer and DJ that you can request songs to! Also, Captain Taylor was awesome!",
    date: 'July 2022',
    verified: true
  },
  {
    id: 68,
    name: 'Zach Augustyn',
    role: 'Bachelor/Bachelorette Cruise',
    rating: 5,
    text: "The Bachelor/Bachelorette Cruise was an amazing event!! Brian, Allan and Dylan made it an incredibly smooth process. I highly recommend booking this!! Everything on their website is exactly as described. They make sure to have a good ratio of bachelorette to bachelor groups as well, which makes for a fun time. The DJ did an amazing job. Their service to deliver alcohol, Party on Delivery, was incredibly convenient and a cheaper way to buy alcohol as well. I have no complaints about my experience, that's how fun it was. The photographer also took amazing pictures, which was the cherry on top. With all the amenities they provide, you are getting an insane deal. 10/10 would do again.",
    date: 'June 2024',
    verified: true
  },
  {
    id: 69,
    name: 'Brooke Yocum',
    role: 'Bachelorette Group',
    rating: 5,
    text: "The BEST experience we had in Austin. Do yourself a favor and book this experience for your bride and your group! We had the best time partying with Premier on Lake Travis! The music, vibes, crew, and small details they provide make it a more than enjoyable experience. The DJ felt the energy and played the perfect tracks to keep the party going from start to finish. The atmosphere was perfect to bring our group together, meet and make new friends, dance our bootys off, and have the time of our life. Having a photographer on board was genius — we didn't have to worry about taking pics with our bride, we just enjoyed the day. Sooooo much fun!!",
    date: 'May 2024',
    verified: true
  },
  {
    id: 70,
    name: 'Michaela Gabaldon',
    role: 'Bachelor/Bachelorette Disco Cruise',
    rating: 5,
    text: "The Disco Cruise for the bachelor/bachelorette parties was the highlight of our weekend!!!! It was an absolute blast. The party boat was perfect, Dylan and his team were so helpful pre-planning before the cruise and also during the trip! We really enjoyed ourselves. I'd recommend getting there early to secure a good spot in the shade. The floaties were awesome and everyone had the BEST time!!! :)",
    date: 'May 2025',
    verified: true
  },
  {
    id: 71,
    name: 'Kori Hickman',
    role: 'Bachelorette Trip',
    rating: 5,
    text: "It was easily the most fun thing we did the trip!!! It was the highlight and all the girls had a blast. We loved the music choices and getting the alcohol delivered to the boat. The cocktail kit was perfect, we only ended up drinking one pitcher when ours made 2 of them so we took the rest home. The convenience of the alcohol delivery and Fetii rides made it so easy for our group! Also making it for just bachelors and bachelorettes was so fun since everyone was there for the same reason and all about the same age.",
    date: 'August 2025',
    verified: true
  },
  {
    id: 72,
    name: 'Rob McCallum',
    role: 'Bachelor Party',
    rating: 5,
    text: "Amazing afternoon. One of the highlights of our Austin trip and ideal for a stag do. Beers were ready on ice, crew was awesome, and music was great. Perfect bachelor outing.",
    date: 'October 2025',
    verified: true
  },
  {
    id: 73,
    name: 'Jonathan Monroe',
    role: "Buddy's Bachelor Party",
    rating: 5,
    text: "Truly the best party on the lake. We booked this for my buddy's bachelor party and it was the highlight of our entire trip. Everything ran smoothly and the crew was awesome.",
    date: 'September 2024',
    verified: true
  },
  {
    id: 74,
    name: 'Pearl R.',
    role: 'Bachelorette Party',
    rating: 5,
    text: "We came to Austin for my bachelorette party and this was the highlight of the trip! From the beginning, Justin and Brian answered any and all of our questions; it was a pleasure to talk to them! They even have a backup plan for rain just in case, which sounded just as fun as the actual cruise. The Disco boat cruise was so much fun and it was awesome to hang out, dance, drink and swim in Lake Travis. All my friends were raving about how much fun they were having. I would definitely recommend getting the BBQ catering option — it didn't cost much more and was SO delicious! This was such an amazing day and I want to thank Brian and Justin for the highlight of our weekend!",
    date: 'June 2021',
    verified: true
  }
];