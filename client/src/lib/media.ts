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
 * REAL PARTY PHOTOS WITH PEOPLE - Verified photos showing guests celebrating
 * These photos actually have people in them - NOT empty boat photos
 */
export const CAPITAL_CITY_SHOTS = {
  // VERIFIED PHOTOS WITH PEOPLE CELEBRATING
  party1: '/attached_assets/bachelor-party-group-guys.webp',
  party2: '/attached_assets/atx-disco-cruise-party.jpg',
  party3: '/attached_assets/dancing-party-scene.jpg',
  party4: '/attached_assets/party-atmosphere-1.jpg',
  party5: '/attached_assets/party-atmosphere-2.jpg',
  party6: '/attached_assets/party-atmosphere-3.jpg',
  party7: '/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg',
  party8: '/attached_assets/clever-girl-8-wedding-reception.jpg',
  party9: '/attached_assets/clever-girl-3-bachelorette-boat.jpg',
  party10: '/attached_assets/bachelor-party-group-guys.jpg',
  party11: '/attached_assets/atx-disco-cruise-party.webp',
  party12: '/attached_assets/dancing-party-scene.webp',
  party13: '/attached_assets/party-atmosphere-1.webp',
  party14: '/attached_assets/party-atmosphere-2.webp',
  party15: '/attached_assets/party-atmosphere-3.webp',
  party16: '/attached_assets/bachelor-party-group-guys-hero.webp',
  party17: '/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
  party18: '/attached_assets/bachelor-party-group-guys-optimized.webp',
  // Duplicate references to ensure enough photos for galleries
  party19: '/attached_assets/bachelor-party-group-guys.webp',
  party20: '/attached_assets/atx-disco-cruise-party.jpg',
  party21: '/attached_assets/dancing-party-scene.jpg',
  party22: '/attached_assets/party-atmosphere-1.jpg',
  party23: '/attached_assets/party-atmosphere-2.jpg',
  party24: '/attached_assets/party-atmosphere-3.jpg',
  party25: '/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg',
  party26: '/attached_assets/clever-girl-8-wedding-reception.jpg',
  party27: '/attached_assets/clever-girl-3-bachelorette-boat.jpg',
  party28: '/attached_assets/bachelor-party-group-guys.jpg',
  party29: '/attached_assets/atx-disco-cruise-party.webp',
  party30: '/attached_assets/dancing-party-scene.webp',
  party31: '/attached_assets/party-atmosphere-1.webp',
  party32: '/attached_assets/party-atmosphere-2.webp',
  party33: '/attached_assets/party-atmosphere-3.webp',
  party34: '/attached_assets/bachelor-party-group-guys-hero.webp',
  party35: '/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
  party36: '/attached_assets/bachelor-party-group-guys-optimized.webp',
  party37: '/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg',
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
