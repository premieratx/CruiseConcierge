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
  // DEPRECATED - These files are MISLABELED and contain EMPTY BOAT photos (not party scenes)
  dancingPartyScene: '/attached_assets/dancing-party-scene.webp',
  partyAtmosphere1: '/attached_assets/party-atmosphere-1.webp',
  partyAtmosphere2: '/attached_assets/party-atmosphere-2.webp',
  partyAtmosphere3: '/attached_assets/party-atmosphere-3.webp',
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
  const allPhotos: PhotoAsset[] = [
    { src: PARTY_PHOTOS.bachelorPartyGroup, alt: 'Bachelor and bachelorette party group celebrating on Lake Travis cruise' },
    { src: PARTY_PHOTOS.atxDiscoCruiseParty, alt: 'ATX Disco Cruise party atmosphere on Lake Travis' },
    { src: PARTY_PHOTOS.discoPhotoCollage1, alt: 'Disco cruise party collage with guests celebrating' },
    { src: PARTY_PHOTOS.discoUnicornCollage, alt: 'Disco party celebration with unicorn float' },
    { src: PARTY_PHOTOS.familyPartyCollage, alt: 'Family party celebration on Lake Travis' },
    { src: PARTY_PHOTOS.nonBachCollage, alt: 'Party atmosphere and celebration on Lake Travis cruise' },
  ];
  
  return limit ? allPhotos.slice(0, limit) : allPhotos;
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
