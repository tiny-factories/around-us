// iNaturalist API integration
import { Species, Observation, Coordinates } from './types';

const BASE_URL = 'https://api.inaturalist.org/v1';

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function getSpeciesForLocation(
  coords: Coordinates,
  month: number,
  radius: number = 10,
  limit: number = 50
): Promise<{ species: Species[]; totalCount: number }> {
  const cacheKey = `species-${coords.lat}-${coords.lng}-${month}-${radius}`;
  const cached = getCached<{ species: Species[]; totalCount: number }>(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    lat: coords.lat.toString(),
    lng: coords.lng.toString(),
    radius: radius.toString(),
    month: month.toString(),
    quality_grade: 'research,needs_id',
    per_page: limit.toString(),
    order_by: 'observations_count',
    order: 'desc',
    locale: 'en',
  });

  const response = await fetch(`${BASE_URL}/observations/species_counts?${params}`);

  if (!response.ok) {
    throw new Error(`iNaturalist API error: ${response.status}`);
  }

  const data = await response.json();

  const species: Species[] = data.results.map((result: {
    count: number;
    taxon: {
      id: number;
      name: string;
      preferred_common_name?: string;
      default_photo?: { medium_url?: string };
      iconic_taxon_name?: string;
      wikipedia_url?: string;
      rank?: string;
    };
  }) => ({
    id: result.taxon.id,
    name: result.taxon.name,
    commonName: result.taxon.preferred_common_name || result.taxon.name,
    photoUrl: result.taxon.default_photo?.medium_url || null,
    observationCount: result.count,
    iconicTaxon: result.taxon.iconic_taxon_name || 'unknown',
    wikipediaUrl: result.taxon.wikipedia_url,
    rank: result.taxon.rank || 'species',
  }));

  const result = { species, totalCount: data.total_results };
  setCache(cacheKey, result);
  return result;
}

export async function getRecentObservations(
  coords: Coordinates,
  radius: number = 5,
  limit: number = 100,
  month?: number
): Promise<{ observations: Observation[]; totalCount: number }> {
  const cacheKey = `obs-${coords.lat}-${coords.lng}-${radius}-${month || 'all'}`;
  const cached = getCached<{ observations: Observation[]; totalCount: number }>(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    lat: coords.lat.toString(),
    lng: coords.lng.toString(),
    radius: radius.toString(),
    quality_grade: 'research,needs_id',
    per_page: limit.toString(),
    order_by: 'observed_on',
    order: 'desc',
    photos: 'true',
    locale: 'en',
  });

  // If month is specified, filter by that month in the current year
  if (month !== undefined && month >= 1 && month <= 12) {
    const currentYear = new Date().getFullYear();
    const monthStart = new Date(currentYear, month - 1, 1);
    const monthEnd = new Date(currentYear, month, 0, 23, 59, 59);
    params.append('d1', monthStart.toISOString().split('T')[0]);
    params.append('d2', monthEnd.toISOString().split('T')[0]);
    params.append('month', month.toString());
  } else {
    // Default: Get observations from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    params.append('d1', thirtyDaysAgo.toISOString().split('T')[0]);
  }

  const response = await fetch(`${BASE_URL}/observations?${params}`);

  if (!response.ok) {
    throw new Error(`iNaturalist API error: ${response.status}`);
  }

  const data = await response.json();

  const observations: Observation[] = data.results
    .filter((obs: { taxon?: unknown; geojson?: { coordinates?: number[] } }) =>
      obs.taxon && obs.geojson?.coordinates
    )
    .map((obs: {
      id: number;
      taxon: {
        id: number;
        name: string;
        preferred_common_name?: string;
        iconic_taxon_name?: string;
      };
      photos?: Array<{ url?: string }>;
      geojson: { coordinates: [number, number] };
      observed_on_string?: string;
      place_guess?: string;
    }) => ({
      id: obs.id,
      speciesId: obs.taxon.id,
      speciesName: obs.taxon.name,
      commonName: obs.taxon.preferred_common_name || obs.taxon.name,
      photoUrl: obs.photos?.[0]?.url?.replace('square', 'medium') || null,
      lng: obs.geojson.coordinates[0],
      lat: obs.geojson.coordinates[1],
      observedOn: obs.observed_on_string || '',
      placeGuess: obs.place_guess || '',
      iconicTaxon: obs.taxon.iconic_taxon_name || undefined,
    }));

  const result = { observations, totalCount: data.total_results };
  setCache(cacheKey, result);
  return result;
}

export async function getSpeciesDetails(taxonId: number): Promise<Species | null> {
  const cacheKey = `taxon-${taxonId}`;
  const cached = getCached<Species>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${BASE_URL}/taxa/${taxonId}?locale=en`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const taxon = data.results[0];

  if (!taxon) return null;

  const species: Species = {
    id: taxon.id,
    name: taxon.name,
    commonName: taxon.preferred_common_name || taxon.name,
    photoUrl: taxon.default_photo?.medium_url || null,
    observationCount: taxon.observations_count || 0,
    iconicTaxon: taxon.iconic_taxon_name || 'unknown',
    wikipediaUrl: taxon.wikipedia_url,
    rank: taxon.rank || 'species',
  };

  setCache(cacheKey, species);
  return species;
}

// Get seasonal histogram for a species at a location
export async function getSeasonalHistogram(
  taxonId: number,
  coords: Coordinates,
  radius: number = 25
): Promise<number[]> {
  const cacheKey = `histogram-${taxonId}-${coords.lat}-${coords.lng}`;
  const cached = getCached<number[]>(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    taxon_id: taxonId.toString(),
    lat: coords.lat.toString(),
    lng: coords.lng.toString(),
    radius: radius.toString(),
    date_field: 'observed',
    interval: 'month_of_year',
  });

  const response = await fetch(`${BASE_URL}/observations/histogram?${params}`);

  if (!response.ok) {
    return Array(12).fill(0);
  }

  const data = await response.json();
  const monthData = data.results?.month_of_year || {};

  // Convert to array indexed 0-11
  const histogram = Array(12).fill(0);
  for (let month = 1; month <= 12; month++) {
    histogram[month - 1] = monthData[month] || 0;
  }

  setCache(cacheKey, histogram);
  return histogram;
}
