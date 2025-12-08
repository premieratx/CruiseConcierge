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
 * REAL PARTY PHOTOS FROM @capitalcityshots - Photos showing people celebrating
 * These are verified party photos with actual guests having fun
 */
export const CAPITAL_CITY_SHOTS = {
  party1: '/attached_assets/@capitalcityshots-1_1760080740012.jpg',
  party2: '/attached_assets/@capitalcityshots-2_1760080740017.jpg',
  party3: '/attached_assets/@capitalcityshots-3_1760080740017.jpg',
  party4: '/attached_assets/@capitalcityshots-4_1760080740017.jpg',
  party5: '/attached_assets/@capitalcityshots-5_1760080740018.jpg',
  party6: '/attached_assets/@capitalcityshots-6_1760080740018.jpg',
  party7: '/attached_assets/@capitalcityshots-7_1760080740018.jpg',
  party8: '/attached_assets/@capitalcityshots-8_1760080740018.jpg',
  party9: '/attached_assets/@capitalcityshots-9_1760080740019.jpg',
  party10: '/attached_assets/@capitalcityshots-10_1760080740019.jpg',
  party11: '/attached_assets/@capitalcityshots-11_1760080740019.jpg',
  party12: '/attached_assets/@capitalcityshots-12_1760080740019.jpg',
  party13: '/attached_assets/@capitalcityshots-13_1760080740020.jpg',
  party14: '/attached_assets/@capitalcityshots-14_1760080740020.jpg',
  party15: '/attached_assets/@capitalcityshots-15_1760080740020.jpg',
  party16: '/attached_assets/@capitalcityshots-16_1760080740020.jpg',
  party17: '/attached_assets/@capitalcityshots-17_1760080740020.jpg',
  party18: '/attached_assets/@capitalcityshots-18_1760080740021.jpg',
  party19: '/attached_assets/@capitalcityshots-19_1760080740021.jpg',
  party20: '/attached_assets/@capitalcityshots-20_1760080740021.jpg',
  party21: '/attached_assets/@capitalcityshots-21_1760080807864.jpg',
  party22: '/attached_assets/@capitalcityshots-22_1760080807865.jpg',
  party23: '/attached_assets/@capitalcityshots-23_1760080807865.jpg',
  party24: '/attached_assets/@capitalcityshots-24_1760080807866.jpg',
  party25: '/attached_assets/@capitalcityshots-25_1760080807866.jpg',
  party26: '/attached_assets/@capitalcityshots-26_1760080807866.jpg',
  party27: '/attached_assets/@capitalcityshots-27_1760080807866.jpg',
  party28: '/attached_assets/@capitalcityshots-28_1760080807867.jpg',
  party29: '/attached_assets/@capitalcityshots-29_1760080807867.jpg',
  party30: '/attached_assets/@capitalcityshots-30_1760080807867.jpg',
  party31: '/attached_assets/@capitalcityshots-31_1760080807867.jpg',
  party32: '/attached_assets/@capitalcityshots-32_1760080807868.jpg',
  party33: '/attached_assets/@capitalcityshots-33_1760080807868.jpg',
  party34: '/attached_assets/@capitalcityshots-34_1760080807868.jpg',
  party35: '/attached_assets/@capitalcityshots-35_1760080807868.jpg',
  party36: '/attached_assets/@capitalcityshots-36_1760080807868.jpg',
  party37: '/attached_assets/@capitalcityshots-37_1760080807869.jpg',
} as const;

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
