/**
 * SEMRush Keywords Database
 * Extracted from comprehensive keyword research (8 screenshots)
 * Last Updated: February 2026
 * Total Keywords: 90+
 * 
 * Structure: keyword, position, volume, KD%, visibility, intent
 * Categories: Party Boats, Bachelorette, Bachelor, Disco/Cruises, Lake Travis, Austin Party, Corporate, Bars/Venues
 */

export type IntentType = 'commercial' | 'informational' | 'navigational' | 'transactional' | 'comparison' | 'local';

export interface SEMRushKeyword {
  keyword: string;
  position: number;
  volume: number;
  kd: number; // Keyword Difficulty percentage
  visibility: number; // Visibility percentage
  intent: IntentType;
  category: string;
  priority: 'high' | 'medium' | 'low';
  notes?: string;
}

// Core Party Boat Keywords - HIGH PRIORITY
export const partyBoatCoreKeywords: SEMRushKeyword[] = [
  {
    keyword: 'party boat',
    position: 3,
    volume: 5400,
    kd: 17.33,
    visibility: 0.092,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'high',
    notes: 'Top priority - highest volume and strong positioning'
  },
  {
    keyword: 'party boats',
    position: 3,
    volume: 2400,
    kd: 7.71,
    visibility: 0.092,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'high',
    notes: 'Plural form - critical for ranking'
  },
  {
    keyword: 'party boat austin',
    position: 45,
    volume: 480,
    kd: 0.67,
    visibility: 0.037,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'high',
    notes: 'Location-specific, good opportunity for ranking'
  },
  {
    keyword: 'party boat austin tx',
    position: 52,
    volume: 390,
    kd: 0.50,
    visibility: 0.037,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'high',
    notes: 'State abbreviation variant'
  },
  {
    keyword: 'party boats austin',
    position: 51,
    volume: 90,
    kd: 0.09,
    visibility: 0.019,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'high',
    notes: 'Plural Austin variant'
  },
  {
    keyword: 'party boat in austin',
    position: 50,
    volume: 110,
    kd: 0.14,
    visibility: 0.037,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Preposition variant'
  },
  {
    keyword: 'party boat in austin tx',
    position: 57,
    volume: 40,
    kd: 0.06,
    visibility: 0.04,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Long-tail Austin variant'
  },
  {
    keyword: 'party boat texas',
    position: 3,
    volume: 20,
    kd: 0.06,
    visibility: 0.092,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'State-level targeting'
  },
  {
    keyword: 'party boats austin tx',
    position: 52,
    volume: 50,
    kd: 0.07,
    visibility: 0.037,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Plural + state variant'
  },
  {
    keyword: 'party boats austin texas',
    position: 50,
    volume: 70,
    kd: 0.05,
    visibility: 0.019,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Full state name variant'
  },
  {
    keyword: 'party boats in austin',
    position: 50,
    volume: 70,
    kd: 0.04,
    visibility: 0.019,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Preposition variant'
  },
  {
    keyword: 'party boats on lake travis',
    position: 55,
    volume: 260,
    kd: 0.09,
    visibility: 0.011,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'high',
    notes: 'Lake-specific variant'
  },
  {
    keyword: 'boat party austin',
    position: 42,
    volume: 110,
    kd: 0.08,
    visibility: 0.04,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Word order variant'
  },
  {
    keyword: 'boat party in austin',
    position: 53,
    volume: 50,
    kd: 0.07,
    visibility: 0.04,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Word order with preposition'
  },
  {
    keyword: 'boat party austin tx',
    position: 38,
    volume: 40,
    kd: 0.03,
    visibility: 0.041,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Word order state variant'
  },
  {
    keyword: 'austin party boats',
    position: 46,
    volume: 140,
    kd: 0.06,
    visibility: 0.011,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'high',
    notes: 'Austin first positioning'
  },
  {
    keyword: 'austin party boat',
    position: 45,
    volume: 480,
    kd: 0.62,
    visibility: 0.037,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'high',
    notes: 'Austin first singular'
  },
  {
    keyword: 'austin boat party',
    position: 50,
    volume: 70,
    kd: 0.14,
    visibility: 0.059,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Austin-boat word order'
  },
  {
    keyword: 'boat parties austin',
    position: 41,
    volume: 30,
    kd: 0.04,
    visibility: 0.037,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Plural boat parties'
  },
  {
    keyword: 'party boat rental austin',
    position: 20,
    volume: 320,
    kd: 0.14,
    visibility: 0.01,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'high',
    notes: 'Rental-focused keyword'
  },
  {
    keyword: 'rent a party boat austin',
    position: 55,
    volume: 320,
    kd: 0.14,
    visibility: 0.01,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'high',
    notes: 'Action-oriented rental keyword'
  },
  {
    keyword: 'party boats rental in austin tx',
    position: 57,
    volume: 30,
    kd: 0.01,
    visibility: 0.001,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Long-tail rental keyword'
  },
  {
    keyword: 'party boat on lake travis',
    position: 39,
    volume: 40,
    kd: 0.02,
    visibility: 0.01,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'medium',
    notes: 'Lake Travis specific'
  },
  {
    keyword: 'party barge austin lake travis',
    position: 29,
    volume: 210,
    kd: 0.09,
    visibility: 0.011,
    intent: 'commercial',
    category: 'Party Boats',
    priority: 'high',
    notes: 'Barge variant - premium option'
  }
];

// Austin Party Cruises - HIGH PRIORITY
export const austinPartyCruisesKeywords: SEMRushKeyword[] = [
  {
    keyword: 'austin party cruises',
    position: 25,
    volume: 390,
    kd: 1.65,
    visibility: 0.012,
    intent: 'informational',
    category: 'Party Cruises',
    priority: 'high',
    notes: 'Core cruise keyword'
  },
  {
    keyword: 'austin party cruise',
    position: 18,
    volume: 40,
    kd: 0.17,
    visibility: 0.066,
    intent: 'informational',
    category: 'Party Cruises',
    priority: 'high',
    notes: 'Singular variant'
  },
  {
    keyword: 'austin party cruises austin tx',
    position: 24,
    volume: 170,
    kd: 0.24,
    visibility: 0.037,
    intent: 'informational',
    category: 'Party Cruises',
    priority: 'high',
    notes: 'Double location specificity'
  },
  {
    keyword: 'austin party cruises prices',
    position: 1,
    volume: 30,
    kd: 0.37,
    visibility: 0.351,
    intent: 'transactional',
    category: 'Party Cruises',
    priority: 'medium',
    notes: 'Pricing inquiry keyword'
  },
  {
    keyword: 'party cruise austin',
    position: 26,
    volume: 30,
    kd: 0.13,
    visibility: 0.095,
    intent: 'informational',
    category: 'Party Cruises',
    priority: 'medium',
    notes: 'Reverse word order'
  }
];

// Premier Party Cruises - Brand Keywords
export const premierPartyCruisesKeywords: SEMRushKeyword[] = [
  {
    keyword: 'premier party cruises',
    position: 19,
    volume: 210,
    kd: 2.58,
    visibility: 0.351,
    intent: 'navigational',
    category: 'Premier Party Cruises',
    priority: 'high',
    notes: 'Primary brand keyword'
  },
  {
    keyword: 'premier party cruises austin',
    position: 24,
    volume: 40,
    kd: 0.49,
    visibility: 0.351,
    intent: 'navigational',
    category: 'Premier Party Cruises',
    priority: 'high',
    notes: 'Brand + location'
  },
  {
    keyword: 'premier party cruise austin',
    position: 32,
    volume: 20,
    kd: 0.25,
    visibility: 0.351,
    intent: 'navigational',
    category: 'Premier Party Cruises',
    priority: 'medium',
    notes: 'Brand singular variant'
  },
  {
    keyword: 'premier party cruise',
    position: 36,
    volume: 10,
    kd: 0.12,
    visibility: 0.351,
    intent: 'navigational',
    category: 'Premier Party Cruises',
    priority: 'medium',
    notes: 'Generic brand'
  }
];

// Bachelorette Party Keywords - HIGH PRIORITY
export const bachelorettePartyKeywords: SEMRushKeyword[] = [
  {
    keyword: 'austin bachelorette party',
    position: 13,
    volume: 1000,
    kd: 0.68,
    visibility: 0.059,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'high',
    notes: 'Core bachelorette keyword - HIGH PRIORITY'
  },
  {
    keyword: 'bachelorette party austin',
    position: 12,
    volume: 260,
    kd: 0.30,
    visibility: 0.01,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'high',
    notes: 'Reverse word order'
  },
  {
    keyword: 'austin bachelorette party ideas',
    position: 9,
    volume: 170,
    kd: 0.07,
    visibility: 0.011,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'high',
    notes: 'Ideas-focused keyword'
  },
  {
    keyword: 'austin bachelorette party itinerary',
    position: 0,
    volume: 140,
    kd: 0.05,
    visibility: 0.001,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'high',
    notes: 'Planning-focused keyword'
  },
  {
    keyword: 'austin bachelorette party boat',
    position: 3,
    volume: 0,
    kd: 0,
    visibility: 0.351,
    intent: 'commercial',
    category: 'Bachelorette Parties',
    priority: 'high',
    notes: 'Boat-specific bachelorette keyword'
  },
  {
    keyword: 'austin bachelorette party boat rental',
    position: 16,
    volume: 10,
    kd: 0.03,
    visibility: 0.059,
    intent: 'commercial',
    category: 'Bachelorette Parties',
    priority: 'high',
    notes: 'Rental-focused bachelorette'
  },
  {
    keyword: 'austin bachelorette party lake travis',
    position: 4,
    volume: 0,
    kd: 0,
    visibility: 0.351,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'high',
    notes: 'Lake Travis location variant'
  },
  {
    keyword: 'austin bachelorette party packages',
    position: 18,
    volume: 30,
    kd: 0.30,
    visibility: 0.092,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'medium',
    notes: 'Package inquiry keyword'
  },
  {
    keyword: 'austin bachelorette party sayings',
    position: 23,
    volume: 0,
    kd: 0,
    visibility: 0.013,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'low',
    notes: 'Niche keyword'
  },
  {
    keyword: 'austin bachelorette party summer',
    position: 8,
    volume: 0,
    kd: 0,
    visibility: 0.037,
    intent: 'commercial',
    category: 'Bachelorette Parties',
    priority: 'medium',
    notes: 'Seasonal variant'
  },
  {
    keyword: 'austin bachelorette party in january',
    position: 7,
    volume: 0,
    kd: 0,
    visibility: 0.034,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'low',
    notes: 'Monthly variant'
  },
  {
    keyword: 'austin bachelorette party january',
    position: 8,
    volume: 0,
    kd: 0,
    visibility: 0.034,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'low',
    notes: 'Monthly keyword'
  },
  {
    keyword: 'austin bachelorette party blog',
    position: 2,
    volume: 10,
    kd: 0,
    visibility: 0.011,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'low',
    notes: 'Content discovery keyword'
  },
  {
    keyword: 'austin bachelorette parties',
    position: 14,
    volume: 40,
    kd: 0.02,
    visibility: 0.01,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'medium',
    notes: 'Plural form'
  },
  {
    keyword: 'austin bachelorette party batches',
    position: 19,
    volume: 0,
    kd: 0,
    visibility: 0.01,
    intent: 'navigational',
    category: 'Bachelorette Parties',
    priority: 'low',
    notes: 'Niche keyword'
  },
  {
    keyword: 'austin bachelorette party weekend',
    position: 9,
    volume: 0,
    kd: 0.01,
    visibility: 0.012,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'medium',
    notes: 'Weekend-focused'
  },
  {
    keyword: 'bachelorette party austin texas',
    position: 0,
    volume: 20,
    kd: 0.01,
    visibility: 0.013,
    intent: 'commercial',
    category: 'Bachelorette Parties',
    priority: 'medium',
    notes: 'Full state name variant'
  },
  {
    keyword: 'bachelorette party lake travis',
    position: 6,
    volume: 50,
    kd: 0.16,
    visibility: 0.092,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'high',
    notes: 'Lake Travis specific'
  },
  {
    keyword: 'bachelorette party packages austin tx',
    position: 7,
    volume: 30,
    kd: 0.10,
    visibility: 0.092,
    intent: 'informational',
    category: 'Bachelorette Parties',
    priority: 'medium',
    notes: 'Package keyword'
  }
];

// Bachelorette Weekend Keywords
export const bacheloretteWeekendKeywords: SEMRushKeyword[] = [
  {
    keyword: 'bachelorette weekend in austin',
    position: 16,
    volume: 590,
    kd: 0.26,
    visibility: 0.012,
    intent: 'informational',
    category: 'Bachelorette Weekend',
    priority: 'high',
    notes: 'Weekend-specific variant'
  },
  {
    keyword: 'bachelorette weekend austin tx',
    position: 8,
    volume: 30,
    kd: 0.01,
    visibility: 0.011,
    intent: 'informational',
    category: 'Bachelorette Weekend',
    priority: 'medium',
    notes: 'State abbreviation'
  },
  {
    keyword: 'austin bachelorette weekend',
    position: 9,
    volume: 0,
    kd: 0.01,
    visibility: 0.012,
    intent: 'informational',
    category: 'Bachelorette Weekend',
    priority: 'medium',
    notes: 'Weekend event type'
  }
];

// Disco Cruise Keywords
export const discoCruiseKeywords: SEMRushKeyword[] = [
  {
    keyword: 'atx disco cruise',
    position: 1,
    volume: 70,
    kd: 0.86,
    visibility: 0.351,
    intent: 'informational',
    category: 'Disco Cruises',
    priority: 'high',
    notes: 'ATX brand variant'
  },
  {
    keyword: 'disco boat cruise',
    position: 1,
    volume: 70,
    kd: 0.86,
    visibility: 0.351,
    intent: 'informational',
    category: 'Disco Cruises',
    priority: 'high',
    notes: 'Disco concept'
  },
  {
    keyword: 'disco cruise austin',
    position: 1,
    volume: 30,
    kd: 0.37,
    visibility: 0.351,
    intent: 'commercial',
    category: 'Disco Cruises',
    priority: 'high',
    notes: 'Location-specific disco'
  },
  {
    keyword: 'atx party boat',
    position: 20,
    volume: 30,
    kd: 0.04,
    visibility: 0.034,
    intent: 'informational',
    category: 'Disco Cruises',
    priority: 'medium',
    notes: 'ATX abbreviation'
  },
  {
    keyword: 'booze cruise austin',
    position: 7,
    volume: 70,
    kd: 0.30,
    visibility: 0.092,
    intent: 'informational',
    category: 'Disco Cruises',
    priority: 'high',
    notes: 'Alcohol-focused cruise'
  },
  {
    keyword: 'cruise bachelorette party',
    position: 13,
    volume: 260,
    kd: 0.12,
    visibility: 0.012,
    intent: 'informational',
    category: 'Disco Cruises',
    priority: 'high',
    notes: 'Cruise + bachelorette combo'
  },
  {
    keyword: 'best bachelorette cruises',
    position: 11,
    volume: 70,
    kd: 0.04,
    visibility: 0.013,
    intent: 'commercial',
    category: 'Disco Cruises',
    priority: 'high',
    notes: 'Comparative keyword'
  }
];

// Lake Travis Keywords
export const lakeTravisKeywords: SEMRushKeyword[] = [
  {
    keyword: 'lake travis bachelorette party boat',
    position: 4,
    volume: 70,
    kd: 0.19,
    visibility: 0.076,
    intent: 'commercial',
    category: 'Lake Travis',
    priority: 'high',
    notes: 'Lake Travis specific party boat'
  },
  {
    keyword: 'lake travis boat rental bachelorette party',
    position: 20,
    volume: 50,
    kd: 0.10,
    visibility: 0.04,
    intent: 'commercial',
    category: 'Lake Travis',
    priority: 'high',
    notes: 'Rental variant'
  },
  {
    keyword: 'lake travis bachelor party boat',
    position: 29,
    volume: 70,
    kd: 0.09,
    visibility: 0.034,
    intent: 'commercial',
    category: 'Lake Travis',
    priority: 'high',
    notes: 'Bachelor variant'
  },
  {
    keyword: 'lake travis boat parties',
    position: 39,
    volume: 30,
    kd: 0.01,
    visibility: 0.011,
    intent: 'commercial',
    category: 'Lake Travis',
    priority: 'medium',
    notes: 'General parties keyword'
  },
  {
    keyword: 'lake travis vs lake austin bachelorette party',
    position: 1,
    volume: 20,
    kd: 0.03,
    visibility: 0.034,
    intent: 'comparison',
    category: 'Lake Travis',
    priority: 'medium',
    notes: 'Comparison keyword'
  },
  {
    keyword: 'lake austin bachelorette party',
    position: 6,
    volume: 70,
    kd: 0,
    visibility: 0.012,
    intent: 'informational',
    category: 'Lake Travis',
    priority: 'medium',
    notes: 'Alternative lake venue'
  },
  {
    keyword: 'lake austin boat rentals bachelorette party',
    position: 23,
    volume: 70,
    kd: 0.19,
    visibility: 0.059,
    intent: 'commercial',
    category: 'Lake Travis',
    priority: 'medium',
    notes: 'Lake Austin rental variant'
  }
];

// Bachelor Party Keywords
export const bachelorPartyKeywords: SEMRushKeyword[] = [
  {
    keyword: 'austin texas party boat',
    position: 6,
    volume: 170,
    kd: 0.24,
    visibility: 0.059,
    intent: 'informational',
    category: 'Bachelor Parties',
    priority: 'high',
    notes: 'Bachelor party boat'
  },
  {
    keyword: 'austin texas boat party',
    position: 54,
    volume: 170,
    kd: 0.24,
    visibility: 0.04,
    intent: 'informational',
    category: 'Bachelor Parties',
    priority: 'high',
    notes: 'Boat party variant'
  },
  {
    keyword: 'austin texas boat rental bachelorette party',
    position: 15,
    volume: 20,
    kd: 0.03,
    visibility: 0.037,
    intent: 'commercial',
    category: 'Bachelor Parties',
    priority: 'medium',
    notes: 'Rental variant'
  }
];

// Venue & Activity Keywords
export const venueActivityKeywords: SEMRushKeyword[] = [
  {
    keyword: 'best bars for bachelorette parties in austin',
    position: 6,
    volume: 20,
    kd: 0.02,
    visibility: 0.029,
    intent: 'commercial',
    category: 'Venues & Activities',
    priority: 'medium',
    notes: 'Bar venue keyword'
  },
  {
    keyword: 'best bars in austin for bachelorette party',
    position: 11,
    volume: 20,
    kd: 0.01,
    visibility: 0.013,
    intent: 'commercial',
    category: 'Venues & Activities',
    priority: 'medium',
    notes: 'Bar venue variant'
  },
  {
    keyword: 'best austin bachelorette party homes to rent',
    position: 0,
    volume: 0,
    kd: 0,
    visibility: 0.011,
    intent: 'commercial',
    category: 'Venues & Activities',
    priority: 'low',
    notes: 'Home rental keyword'
  },
  {
    keyword: 'broken spoke bachelorette party',
    position: 5,
    volume: 0,
    kd: 0,
    visibility: 0.034,
    intent: 'commercial',
    category: 'Venues & Activities',
    priority: 'low',
    notes: 'Specific venue'
  },
  {
    keyword: 'bungalow austin bachelorette party',
    position: 11,
    volume: 0,
    kd: 0,
    visibility: 0.092,
    intent: 'informational',
    category: 'Venues & Activities',
    priority: 'low',
    notes: 'Specific venue'
  },
  {
    keyword: 'container bar austin bachelorette party',
    position: 10,
    volume: 0,
    kd: 0,
    visibility: 0.092,
    intent: 'informational',
    category: 'Venues & Activities',
    priority: 'low',
    notes: 'Specific venue'
  },
  {
    keyword: 'rainey street austin bachelorette party',
    position: 3,
    volume: 0,
    kd: 0,
    visibility: 0.092,
    intent: 'informational',
    category: 'Venues & Activities',
    priority: 'low',
    notes: 'Neighborhood keyword'
  },
  {
    keyword: 'outdoor austin bachelorette party',
    position: 18,
    volume: 0,
    kd: 0,
    visibility: 0.092,
    intent: 'commercial',
    category: 'Venues & Activities',
    priority: 'low',
    notes: 'Activity type'
  },
  {
    keyword: 'things to do in austin bachelorette party',
    position: 0,
    volume: 20,
    kd: 0.01,
    visibility: 0.013,
    intent: 'informational',
    category: 'Venues & Activities',
    priority: 'low',
    notes: 'Activity guide keyword'
  },
  {
    keyword: 'unique austin bachelorette party',
    position: 17,
    volume: 0,
    kd: 0,
    visibility: 0.01,
    intent: 'commercial',
    category: 'Venues & Activities',
    priority: 'low',
    notes: 'Differentiation keyword'
  }
];

// Comparison Keywords
export const comparisonKeywords: SEMRushKeyword[] = [
  {
    keyword: 'austin vs nashville bachelorette party',
    position: 5,
    volume: 20,
    kd: 0.03,
    visibility: 0.037,
    intent: 'comparison',
    category: 'Comparisons',
    priority: 'medium',
    notes: 'Destination comparison'
  },
  {
    keyword: 'nashville vs austin bachelorette party',
    position: 160,
    volume: 30,
    kd: 0,
    visibility: 0.029,
    intent: 'comparison',
    category: 'Comparisons',
    priority: 'medium',
    notes: 'Reverse comparison'
  },
  {
    keyword: 'nashville vs austin',
    position: 4,
    volume: 30,
    kd: 0.03,
    visibility: 0.034,
    intent: 'comparison',
    category: 'Comparisons',
    priority: 'medium',
    notes: 'General city comparison'
  }
];

// Texas/Regional Keywords
export const texasRegionalKeywords: SEMRushKeyword[] = [
  {
    keyword: 'party boat texas',
    position: 3,
    volume: 20,
    kd: 0.06,
    visibility: 0.092,
    intent: 'commercial',
    category: 'Regional',
    priority: 'medium',
    notes: 'State-level targeting'
  },
  {
    keyword: 'texas boat party',
    position: 52,
    volume: 30,
    kd: 0.01,
    visibility: 0.012,
    intent: 'commercial',
    category: 'Regional',
    priority: 'medium',
    notes: 'State party variant'
  },
  {
    keyword: 'texas party boats',
    position: 53,
    volume: 40,
    kd: 0.02,
    visibility: 0.012,
    intent: 'commercial',
    category: 'Regional',
    priority: 'medium',
    notes: 'State boats variant'
  }
];

// Long-tail & Niche Keywords
export const longtailKeywords: SEMRushKeyword[] = [
  {
    keyword: 'boat rental bachelorette party in austin',
    position: 12,
    volume: 30,
    kd: 0.37,
    visibility: 0.36,
    intent: 'informational',
    category: 'Long-tail',
    priority: 'medium',
    notes: 'Complete rental phrase'
  },
  {
    keyword: 'boat party rent',
    position: 41,
    volume: 50,
    kd: 0.16,
    visibility: 0.092,
    intent: 'commercial',
    category: 'Long-tail',
    priority: 'medium',
    notes: 'Action-focused'
  }
];

// Complete keyword database
export const allSEMRushKeywords: SEMRushKeyword[] = [
  ...partyBoatCoreKeywords,
  ...austinPartyCruisesKeywords,
  ...premierPartyCruisesKeywords,
  ...bachelorettePartyKeywords,
  ...bacheloretteWeekendKeywords,
  ...discoCruiseKeywords,
  ...lakeTravisKeywords,
  ...bachelorPartyKeywords,
  ...venueActivityKeywords,
  ...comparisonKeywords,
  ...texasRegionalKeywords,
  ...longtailKeywords
];

// Utility functions
export function getKeywordsByCategory(category: string): SEMRushKeyword[] {
  return allSEMRushKeywords.filter(k => k.category === category);
}

export function getHighPriorityKeywords(): SEMRushKeyword[] {
  return allSEMRushKeywords.filter(k => k.priority === 'high');
}

export function getKeywordsByIntent(intent: IntentType): SEMRushKeyword[] {
  return allSEMRushKeywords.filter(k => k.intent === intent);
}

export function getTopVolumeKeywords(limit = 20): SEMRushKeyword[] {
  return [...allSEMRushKeywords]
    .sort((a, b) => b.volume - a.volume)
    .slice(0, limit);
}

export function getEasyRankingKeywords(maxKD = 1): SEMRushKeyword[] {
  return allSEMRushKeywords.filter(k => k.kd <= maxKD);
}

export function getCategories(): string[] {
  return Array.from(new Set(allSEMRushKeywords.map(k => k.category)));
}

export const SEMRushKeywordsDB = {
  keywords: allSEMRushKeywords,
  categories: getCategories(),
  totalKeywords: allSEMRushKeywords.length,
  highPriorityCount: allSEMRushKeywords.filter(k => k.priority === 'high').length,
  totalSearchVolume: allSEMRushKeywords.reduce((sum, k) => sum + k.volume, 0),
  averageKD: allSEMRushKeywords.reduce((sum, k) => sum + k.kd, 0) / allSEMRushKeywords.length
};

export default SEMRushKeywordsDB;
