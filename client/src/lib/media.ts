/**
 * Centralized Media Asset Management
 * 
 * PARTY PHOTOS: Use for bachelor/bachelorette/combined/disco pages
 * FLEET PHOTOS: Use ONLY for fleet showcase sections (Gallery page fleet category, Private Cruises page)
 */

export interface PhotoAsset {
  src: string;
  alt: string;
}

export type PhotoCategory = 'party' | 'fleet';

/**
 * DISCO FUN PARTY PHOTOS - Photos with people celebrating
 */
export const DISCO_FUN_PHOTOS = {
  jumping: '/attached_assets/disco_fun_28_1765193453540.jpg',
  groupFloat: '/attached_assets/disco_fun_best2_1765193453547.jpg',
  brideGroup: '/attached_assets/disco_fun_first_1765193453547.jpg',
  champagnePop: '/attached_assets/disco_fun_1765193453547.jpg',
  sunHatsGroup: '/attached_assets/disco_fun2_1765193453547.jpg',
  heartSunglasses: '/attached_assets/disco_fun3_1765193453548.jpg',
  champagneSpray: '/attached_assets/disco_fun5_1765193453548.jpg',
  girlsOnBoat: '/attached_assets/disco_fun6_1765193453548.jpg',
  tropicalGroup: '/attached_assets/disco_fun7_1765193453548.jpg',
  blackCapsGroup: '/attached_assets/disco_fun9_1765193453548.jpg',
} as const;

/**
 * BOAT/SCENIC PHOTOS - Empty boat photos to break up group poses
 */
export const BOAT_SCENIC_PHOTOS = {
  cleverGirl: '/attached_assets/clever-girl-50-person-boat.webp',
  dayTripper: '/attached_assets/day-tripper-14-person-boat.webp',
  meeseeks: '/attached_assets/meeseeks-25-person-boat.webp',
  cleverGirlDanceFloor: '/attached_assets/clever-girl-5-dance-floor.jpg',
  cleverGirlInterior: '/attached_assets/clever-girl-6-interior-seating.jpg',
  cleverGirlFlagship: '/attached_assets/clever-girl-7-flagship-boat.jpg',
} as const;

/**
 * PAGE-SPECIFIC GALLERIES - Each page has unique photos, NO duplicates
 * Alternates party photos with boat/scenic photos to break up group poses
 */

// ATX DISCO CRUISE - 8 unique photos (alternating party/boat)
export const DISCO_GALLERY = [
  { src: DISCO_FUN_PHOTOS.groupFloat, alt: 'Bachelorette group on rainbow float' },
  { src: BOAT_SCENIC_PHOTOS.cleverGirl, alt: 'Clever Girl 50-person party boat' },
  { src: DISCO_FUN_PHOTOS.champagneSpray, alt: 'Champagne spray celebration' },
  { src: BOAT_SCENIC_PHOTOS.cleverGirlDanceFloor, alt: 'Disco dance floor with lights' },
  { src: DISCO_FUN_PHOTOS.sunHatsGroup, alt: 'Bachelorette group with sun hats' },
  { src: BOAT_SCENIC_PHOTOS.cleverGirlInterior, alt: 'Boat interior seating area' },
  { src: DISCO_FUN_PHOTOS.heartSunglasses, alt: 'Party group with heart sunglasses' },
  { src: DISCO_FUN_PHOTOS.tropicalGroup, alt: 'Tropical themed party group' },
] as const;

// BACHELOR PARTY - 8 unique photos (alternating party/boat)
export const BACHELOR_GALLERY = [
  { src: '/attached_assets/bachelor-party-group-guys.webp', alt: 'Bachelor party group celebrating' },
  { src: BOAT_SCENIC_PHOTOS.dayTripper, alt: 'Day Tripper 14-person boat' },
  { src: DISCO_FUN_PHOTOS.jumping, alt: 'Guests jumping into Lake Travis' },
  { src: BOAT_SCENIC_PHOTOS.meeseeks, alt: 'Meeseeks 25-person party boat' },
  { src: '/attached_assets/atx-disco-cruise-party.jpg', alt: 'ATX Disco Cruise party' },
  { src: BOAT_SCENIC_PHOTOS.cleverGirlFlagship, alt: 'Flagship party boat' },
  { src: '/attached_assets/dancing-party-scene.jpg', alt: 'Party guests dancing' },
  { src: '/attached_assets/party-atmosphere-1.jpg', alt: 'Party atmosphere celebration' },
] as const;

// BACHELORETTE PARTY - 8 unique photos (alternating party/boat)
export const BACHELORETTE_GALLERY = [
  { src: DISCO_FUN_PHOTOS.blackCapsGroup, alt: 'Party crew with matching caps' },
  { src: BOAT_SCENIC_PHOTOS.cleverGirl, alt: 'Clever Girl party boat on Lake Travis' },
  { src: DISCO_FUN_PHOTOS.brideGroup, alt: 'Bride and friends celebrating' },
  { src: BOAT_SCENIC_PHOTOS.cleverGirlDanceFloor, alt: 'Disco dance floor setup' },
  { src: '/attached_assets/party-atmosphere-2.jpg', alt: 'Party atmosphere with friends' },
  { src: BOAT_SCENIC_PHOTOS.dayTripper, alt: 'Day Tripper boat on the lake' },
  { src: '/attached_assets/party-atmosphere-3.jpg', alt: 'Guests having fun on cruise' },
  { src: DISCO_FUN_PHOTOS.girlsOnBoat, alt: 'Friends posing on party boat' },
] as const;

// COMBINED BACHELOR/BACHELORETTE - 8 unique photos (alternating party/boat)
export const COMBINED_GALLERY = [
  { src: DISCO_FUN_PHOTOS.champagnePop, alt: 'Captain popping champagne' },
  { src: BOAT_SCENIC_PHOTOS.meeseeks, alt: 'Meeseeks party boat' },
  { src: '/attached_assets/clever-girl-8-wedding-reception.jpg', alt: 'Wedding reception party' },
  { src: BOAT_SCENIC_PHOTOS.cleverGirlInterior, alt: 'Boat lounge seating' },
  { src: '/attached_assets/atx-disco-cruise-party.webp', alt: 'Disco cruise celebration' },
  { src: BOAT_SCENIC_PHOTOS.cleverGirlFlagship, alt: 'Flagship boat on Lake Travis' },
  { src: '/attached_assets/dancing-party-scene.webp', alt: 'Dancing on the cruise' },
  { src: '/attached_assets/clever-girl-3-bachelorette-boat.jpg', alt: 'Bachelorette group on boat' },
] as const;

// Legacy exports for backward compatibility
export const PARTY_PHOTOS_WITH_PEOPLE = {
  disco1: DISCO_GALLERY[0].src,
  disco2: DISCO_GALLERY[2].src,
  disco3: DISCO_GALLERY[4].src,
  disco4: DISCO_GALLERY[6].src,
  disco5: DISCO_GALLERY[7].src,
  disco6: DISCO_GALLERY[1].src,
  disco7: DISCO_GALLERY[3].src,
  disco8: DISCO_GALLERY[5].src,
  bach1: BACHELOR_GALLERY[0].src,
  bach2: BACHELOR_GALLERY[2].src,
  bach3: BACHELOR_GALLERY[4].src,
  bach4: BACHELOR_GALLERY[6].src,
  bach5: BACHELOR_GALLERY[7].src,
  bach6: BACHELOR_GALLERY[1].src,
  bach7: BACHELOR_GALLERY[3].src,
  bach8: BACHELOR_GALLERY[5].src,
  bachelorette1: BACHELORETTE_GALLERY[0].src,
  bachelorette2: BACHELORETTE_GALLERY[2].src,
  bachelorette3: BACHELORETTE_GALLERY[4].src,
  bachelorette4: BACHELORETTE_GALLERY[6].src,
  bachelorette5: BACHELORETTE_GALLERY[7].src,
  bachelorette6: BACHELORETTE_GALLERY[1].src,
  bachelorette7: BACHELORETTE_GALLERY[3].src,
  bachelorette8: BACHELORETTE_GALLERY[5].src,
  combined1: COMBINED_GALLERY[0].src,
  combined2: COMBINED_GALLERY[2].src,
  combined3: COMBINED_GALLERY[4].src,
  combined4: COMBINED_GALLERY[6].src,
  combined5: COMBINED_GALLERY[7].src,
  combined6: COMBINED_GALLERY[1].src,
  combined7: COMBINED_GALLERY[3].src,
  combined8: COMBINED_GALLERY[5].src,
} as const;

export const CAPITAL_CITY_SHOTS = PARTY_PHOTOS_WITH_PEOPLE;

/**
 * PARTY ATMOSPHERE PHOTOS - Photos showing people celebrating (NOT empty boats)
 * VERIFIED PARTY COLLAGES - These show REAL party scenes with people
 */
export const PARTY_PHOTOS = {
  bachelorPartyGroup: '/attached_assets/bachelor-party-group-guys.webp',
  atxDiscoCruiseParty: '/attached_assets/atx-disco-cruise-party.jpg',
  discoPhotoCollage1: '/attached_assets/disco photo collage_1759401302941.png',
  discoUnicornCollage: '/attached_assets/disco unicorn collage - web_1759401302953.png',
  familyPartyCollage: '/attached_assets/father\'s day_family party collage_1759401302954.png',
  nonBachCollage: '/attached_assets/non-bach collage compressed_1759401302954.png',
  // Capital City Shots - Real party photos with people celebrating
  ...CAPITAL_CITY_SHOTS,
} as const;

/**
 * FLEET PHOTOS - Boat showcase photos
 * Use ONLY for fleet sections, NOT for party atmosphere galleries
 */
export const FLEET_PHOTOS = {
  dayTripper: '/attached_assets/day-tripper-14-person-boat.webp',
  meeseeks: '/attached_assets/meeseeks-25-person-boat.webp',
  cleverGirl: '/attached_assets/clever-girl-50-person-boat.webp',
} as const;

/**
 * OTHER ASSETS
 */
export const OTHER_ASSETS = {
  giantUnicornFloat: '/attached_assets/giant-unicorn-float.webp',
} as const;

/**
 * Get party gallery photos with consistent alt text
 * Use this for bachelor/bachelorette/combined/disco page galleries
 */
export function getPartyGallery(limit?: number): PhotoAsset[] {
  // Capital City Shots photos - Real party photos with people celebrating
  const capitalCityShotsPhotos: PhotoAsset[] = Object.values(CAPITAL_CITY_SHOTS).map((src, index) => ({
    src,
    alt: `Lake Travis party boat celebration - guests enjoying the cruise ${index + 1}`,
  }));
  
  const allPhotos: PhotoAsset[] = [
    // Lead with the best party collages
    { src: PARTY_PHOTOS.bachelorPartyGroup, alt: 'Bachelor and bachelorette party group celebrating on Lake Travis cruise' },
    { src: PARTY_PHOTOS.atxDiscoCruiseParty, alt: 'ATX Disco Cruise party atmosphere on Lake Travis' },
    // Mix in Capital City Shots real party photos
    ...capitalCityShotsPhotos,
    // Additional collages
    { src: PARTY_PHOTOS.discoPhotoCollage1, alt: 'Disco cruise party collage with guests celebrating' },
    { src: PARTY_PHOTOS.discoUnicornCollage, alt: 'Disco party celebration with unicorn float' },
    { src: PARTY_PHOTOS.familyPartyCollage, alt: 'Family party celebration on Lake Travis' },
    { src: PARTY_PHOTOS.nonBachCollage, alt: 'Party atmosphere and celebration on Lake Travis cruise' },
  ];
  
  return limit ? allPhotos.slice(0, limit) : allPhotos;
}

/**
 * Get Capital City Shots party photos only (verified real party photos)
 */
export function getCapitalCityShotsGallery(limit?: number): PhotoAsset[] {
  const photos: PhotoAsset[] = Object.values(CAPITAL_CITY_SHOTS).map((src, index) => ({
    src,
    alt: `Lake Travis party cruise celebration - real guests having fun ${index + 1}`,
  }));
  
  return limit ? photos.slice(0, limit) : photos;
}

/**
 * Get fleet showcase photos with boat-specific alt text
 * Use ONLY for fleet sections (Gallery fleet category, Private Cruises page)
 */
export function getFleetGallery(): PhotoAsset[] {
  return [
    { src: FLEET_PHOTOS.dayTripper, alt: 'Day Tripper - 14 person party boat on Lake Travis' },
    { src: FLEET_PHOTOS.meeseeks, alt: 'Meeseeks - 25 person party boat on Lake Travis' },
    { src: FLEET_PHOTOS.cleverGirl, alt: 'Clever Girl - 50 person party boat on Lake Travis' },
  ];
}

/**
 * Get a single party photo by category
 */
export function getPartyPhoto(key: keyof typeof PARTY_PHOTOS): string {
  return PARTY_PHOTOS[key];
}

/**
 * Get a single fleet photo by category
 */
export function getFleetPhoto(key: keyof typeof FLEET_PHOTOS): string {
  return FLEET_PHOTOS[key];
}
