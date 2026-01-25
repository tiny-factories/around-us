'use client';

import { useState, useEffect, useMemo } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Species, Observation, IconicTaxon } from '@/lib/types';
import { TitleCard } from '@/components/TitleCard';
import { FiltersPanel } from '@/components/FiltersPanel';
import { ChatInterface } from '@/components/ChatInterface';
import dynamic from 'next/dynamic';

// Dynamic import for map (client-side only, no SSR)
const ObservationMap = dynamic(
  () => import('@/components/ObservationMap').then((mod) => mod.ObservationMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <span className="text-xs text-gray-600 uppercase tracking-wide">Loading map...</span>
      </div>
    ),
  }
);

export default function Home() {
  const { coordinates } = useGeolocation();

  const [species, setSpecies] = useState<Species[]>([]);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedTaxon, setSelectedTaxon] = useState<IconicTaxon | 'all'>('all');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [focusedSpeciesId, setFocusedSpeciesId] = useState<number | null>(null);
  const [hoveredObservation, setHoveredObservation] = useState<Observation | null>(null);

  // Fetch species when location or month changes
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const lat = coordinates!.lat;
        const lng = coordinates!.lng;
        const [speciesRes, obsRes] = await Promise.all([
          fetch(`/api/species?lat=${lat}&lng=${lng}&month=${selectedMonth}&limit=100`),
          fetch(`/api/observations?lat=${lat}&lng=${lng}&radius=5&limit=200&month=${selectedMonth}`),
        ]);

        if (!speciesRes.ok) throw new Error('Failed to fetch species');
        if (!obsRes.ok) throw new Error('Failed to fetch observations');

        const speciesData = await speciesRes.json();
        const obsData = await obsRes.json();

        setSpecies(speciesData.species || []);
        setObservations(obsData.observations || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [coordinates, selectedMonth]);

  // Count species by taxon for filters
  const taxonCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    species.forEach((s) => {
      const taxon = s.iconicTaxon || 'unknown';
      counts[taxon] = (counts[taxon] || 0) + 1;
    });
    return counts;
  }, [species]);

  // Filter observations by month and taxon
  const filteredObservations = useMemo(() => {
    // Create a map of species IDs to their iconic taxon for quick lookup (fallback)
    const speciesTaxonMap = new Map<number, string>();
    species.forEach((s) => {
      speciesTaxonMap.set(s.id, s.iconicTaxon);
    });

    return observations.filter((obs) => {
      // Filter by taxon
      if (selectedTaxon !== 'all') {
        // First try to use the taxon from the observation itself (preferred)
        // Fall back to looking it up in the species array if not available
        const obsTaxon = obs.iconicTaxon || speciesTaxonMap.get(obs.speciesId);
        
        // Only include observations whose taxon matches the selected taxon
        // If taxon is unknown/undefined, exclude it when filtering
        if (!obsTaxon || obsTaxon !== selectedTaxon) {
          return false;
        }
      }

      // Filter by month (extract month from observedOn date string)
      if (obs.observedOn) {
        try {
          const obsDate = new Date(obs.observedOn);
          const obsMonth = obsDate.getMonth() + 1; // getMonth() returns 0-11
          if (obsMonth !== selectedMonth) {
            return false;
          }
        } catch (e) {
          // If date parsing fails, include the observation
        }
      }

      return true;
    });
  }, [observations, species, selectedTaxon, selectedMonth]);

  // Clear focused species when filters change
  useEffect(() => {
    setFocusedSpeciesId(null);
  }, [selectedTaxon, selectedMonth]);

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      {/* Full-screen map */}
      <div className="absolute inset-0 z-10">
        <ObservationMap
          center={coordinates}
          observations={filteredObservations}
          species={species}
          focusedSpeciesId={focusedSpeciesId}
          onObservationClick={(obs) => {
            const found = species.find((s) => s.id === obs.speciesId);
            if (found) {
              setSelectedSpecies(found);
              // Don't open modal anymore - chat will show the info
            }
          }}
          onObservationHover={setHoveredObservation}
          hoveredObservationId={hoveredObservation?.id || null}
        />
      </div>

      {/* Title card - top left */}
      <TitleCard />

      {/* Filters panel - lower left */}
      <FiltersPanel
        selectedMonth={selectedMonth}
        selectedTaxon={selectedTaxon}
        onMonthChange={setSelectedMonth}
        onTaxonChange={setSelectedTaxon}
        taxonCounts={taxonCounts}
      />

      {/* Chat interface - right side */}
      <ChatInterface selectedSpecies={selectedSpecies} />

      {/* Species detail panel - removed, using chat instead */}
    </main>
  );
}
