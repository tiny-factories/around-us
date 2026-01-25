// Core types for the Species Neighbor app

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Species {
  id: number;
  name: string;
  commonName: string;
  photoUrl: string | null;
  observationCount: number;
  iconicTaxon: string;
  wikipediaUrl?: string;
  rank: string;
}

export interface Observation {
  id: number;
  speciesId: number;
  speciesName: string;
  commonName: string;
  photoUrl: string | null;
  lat: number;
  lng: number;
  observedOn: string;
  placeGuess: string;
  iconicTaxon?: string; // Optional for backward compatibility
}

export interface SpeciesResponse {
  species: Species[];
  totalCount: number;
  location: Coordinates;
  month: number;
  radius: number;
}

export interface ObservationResponse {
  observations: Observation[];
  totalCount: number;
}

export type IconicTaxon =
  | 'Plantae'
  | 'Aves'
  | 'Mammalia'
  | 'Reptilia'
  | 'Amphibia'
  | 'Insecta'
  | 'Arachnida'
  | 'Mollusca'
  | 'Actinopterygii'
  | 'Fungi'
  | 'unknown';

export const ICONIC_TAXON_LABELS: Record<IconicTaxon, string> = {
  Plantae: 'Plants',
  Aves: 'Birds',
  Mammalia: 'Mammals',
  Reptilia: 'Reptiles',
  Amphibia: 'Amphibians',
  Insecta: 'Insects',
  Arachnida: 'Spiders',
  Mollusca: 'Mollusks',
  Actinopterygii: 'Fish',
  Fungi: 'Fungi',
  unknown: 'Other',
};

export const ICONIC_TAXON_EMOJI: Record<IconicTaxon, string> = {
  Plantae: '🌿',
  Aves: '🐦',
  Mammalia: '🦊',
  Reptilia: '🦎',
  Amphibia: '🐸',
  Insecta: '🦋',
  Arachnida: '🕷️',
  Mollusca: '🐌',
  Actinopterygii: '🐟',
  Fungi: '🍄',
  unknown: '🔬',
};

export const ICONIC_TAXON_COLORS: Record<IconicTaxon, string> = {
  Plantae: '#22c55e',      // Green for plants
  Aves: '#3b82f6',        // Blue for birds
  Mammalia: '#f97316',    // Orange for mammals
  Reptilia: '#84cc16',    // Lime green for reptiles
  Amphibia: '#10b981',    // Emerald green for amphibians
  Insecta: '#eab308',     // Yellow for insects
  Arachnida: '#a855f7',   // Purple for spiders
  Mollusca: '#ec4899',    // Pink for mollusks
  Actinopterygii: '#06b6d4', // Cyan for fish
  Fungi: '#d97706',       // Amber for fungi
  unknown: '#6b7280',     // Gray for unknown
};

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
