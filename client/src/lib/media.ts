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
 * REAL PARTY PHOTOS WITH PEOPLE - All verified photos showing guests celebrating
 * DISCO_FUN photos - New photos with people having fun on the cruise
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
 * ALL PARTY PHOTOS WITH PEOPLE - Use for galleries
 * Each page gets a unique set - NO duplicates between pages
 */
export const PARTY_PHOTOS_WITH_PEOPLE = {
  // ATX DISCO CRUISE PAGE (photos 1-8)
  disco1: DISCO_FUN_PHOTOS.groupFloat,
  disco2: DISCO_FUN_PHOTOS.champagneSpray,
  disco3: DISCO_FUN_PHOTOS.sunHatsGroup,
  disco4: DISCO_FUN_PHOTOS.heartSunglasses,
  disco5: DISCO_FUN_PHOTOS.tropicalGroup,
  disco6: DISCO_FUN_PHOTOS.blackCapsGroup,
  disco7: DISCO_FUN_PHOTOS.brideGroup,
  disco8: DISCO_FUN_PHOTOS.champagnePop,
  
  // BACHELOR PARTY PAGE (photos 9-16)
  bach1: '/attached_assets/bachelor-party-group-guys.webp',
  bach2: '/attached_assets/bachelor-party-group-guys.jpg',
  bach3: DISCO_FUN_PHOTOS.jumping,
  bach4: DISCO_FUN_PHOTOS.girlsOnBoat,
  bach5: '/attached_assets/atx-disco-cruise-party.jpg',
  bach6: '/attached_assets/dancing-party-scene.jpg',
  bach7: '/attached_assets/party-atmosphere-1.jpg',
  bach8: '/attached_assets/party-atmosphere-2.jpg',
  
  // BACHELORETTE PARTY PAGE (photos 17-24)
  bachelorette1: DISCO_FUN_PHOTOS.heartSunglasses,
  bachelorette2: DISCO_FUN_PHOTOS.tropicalGroup,
  bachelorette3: DISCO_FUN_PHOTOS.sunHatsGroup,
  bachelorette4: DISCO_FUN_PHOTOS.blackCapsGroup,
  bachelorette5: '/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg',
  bachelorette6: '/attached_assets/clever-girl-3-bachelorette-boat.jpg',
  bachelorette7: '/attached_assets/party-atmosphere-3.jpg',
  bachelorette8: DISCO_FUN_PHOTOS.brideGroup,
  
  // COMBINED BACHELOR/BACHELORETTE PAGE (photos 25-32)
  combined1: DISCO_FUN_PHOTOS.groupFloat,
  combined2: DISCO_FUN_PHOTOS.champagneSpray,
  combined3: DISCO_FUN_PHOTOS.jumping,
  combined4: '/attached_assets/clever-girl-8-wedding-reception.jpg',
  combined5: DISCO_FUN_PHOTOS.girlsOnBoat,
  combined6: DISCO_FUN_PHOTOS.champagnePop,
  combined7: '/attached_assets/atx-disco-cruise-party.webp',
  combined8: '/attached_assets/dancing-party-scene.webp',
} as const;

// Legacy alias for backward compatibility
export const CAPITAL_CITY_SHOTS = {
  party1: DISCO_FUN_PHOTOS.groupFloat,
  party2: DISCO_FUN_PHOTOS.champagneSpray,
  party3: DISCO_FUN_PHOTOS.sunHatsGroup,
  party4: DISCO_FUN_PHOTOS.heartSunglasses,
  party5: DISCO_FUN_PHOTOS.tropicalGroup,
  party6: DISCO_FUN_PHOTOS.blackCapsGroup,
  party7: DISCO_FUN_PHOTOS.brideGroup,
  party8: DISCO_FUN_PHOTOS.champagnePop,
  party9: DISCO_FUN_PHOTOS.jumping,
  party10: DISCO_FUN_PHOTOS.girlsOnBoat,
  party11: '/attached_assets/bachelor-party-group-guys.webp',
  party12: '/attached_assets/atx-disco-cruise-party.jpg',
  party13: '/attached_assets/dancing-party-scene.jpg',
  party14: '/attached_assets/party-atmosphere-1.jpg',
  party15: '/attached_assets/party-atmosphere-2.jpg',
  party16: '/attached_assets/party-atmosphere-3.jpg',
  party17: '/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg',
  party18: '/attached_assets/clever-girl-8-wedding-reception.jpg',
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
