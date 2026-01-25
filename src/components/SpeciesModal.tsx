'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Species, Coordinates, ICONIC_TAXON_EMOJI, ICONIC_TAXON_LABELS, IconicTaxon, MONTH_NAMES } from '@/lib/types';
import { getSeasonalHistogram } from '@/lib/inaturalist';

interface SpeciesPanelProps {
  species: Species;
  coordinates: Coordinates;
  onClose: () => void;
}

export function SpeciesPanel({ species, coordinates, onClose }: SpeciesPanelProps) {
  const [histogram, setHistogram] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(true);

  const emoji = ICONIC_TAXON_EMOJI[species.iconicTaxon as IconicTaxon] || '🔬';
  const taxonLabel = ICONIC_TAXON_LABELS[species.iconicTaxon as IconicTaxon] || 'Species';
  const currentMonth = new Date().getMonth();

  useEffect(() => {
    async function loadHistogram() {
      setLoading(true);
      try {
        const data = await getSeasonalHistogram(species.id, coordinates);
        setHistogram(data);
      } catch (error) {
        console.error('Failed to load histogram:', error);
      }
      setLoading(false);
    }
    loadHistogram();
  }, [species.id, coordinates]);

  // Find peak months
  const maxObs = histogram ? Math.max(...histogram) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 pointer-events-auto"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white border border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">
        {/* Header with photo */}
        <div className="relative h-64 bg-gray-100 border-b border-black">
          {species.photoUrl ? (
            <Image
              src={species.photoUrl.replace('medium', 'large')}
              alt={species.commonName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {emoji}
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white border border-black
                       text-black flex items-center justify-center hover:bg-black hover:text-white
                       transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl font-medium uppercase tracking-wider text-black mb-1">
                {species.commonName}
              </h2>
              <p className="text-xs text-gray-600 italic">{species.name}</p>
            </div>
            <span className="shrink-0 px-3 py-1.5 border border-black bg-white
                             text-xs text-black uppercase tracking-wide flex items-center gap-1.5">
              {emoji} {taxonLabel}
            </span>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 border border-black p-4 bg-white">
              <p className="text-3xl font-medium text-black">
                {species.observationCount.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600 mt-1 uppercase tracking-wide">observations nearby</p>
            </div>
            <div className="flex-1 border border-black p-4 bg-white">
              <p className="text-3xl font-medium text-black capitalize">
                {species.rank}
              </p>
              <p className="text-xs text-gray-600 mt-1 uppercase tracking-wide">taxonomic rank</p>
            </div>
          </div>

          {/* Seasonal chart */}
          <div className="mb-8">
            <h3 className="text-xs font-medium uppercase tracking-wider text-black mb-4">
              When to spot nearby
            </h3>
            {loading ? (
              <div className="h-32 flex items-center justify-center border border-black">
                <div className="w-5 h-5 border-2 border-black border-t-transparent
                                animate-spin" />
              </div>
            ) : histogram ? (
              <div className="flex items-end gap-1 h-32 border border-black p-2">
                {histogram.map((count, index) => {
                  const height = maxObs > 0 ? (count / maxObs) * 100 : 0;
                  const isCurrent = index === currentMonth;

                  return (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className={`w-full transition-all ${
                          isCurrent
                            ? 'bg-black'
                            : count > 0
                              ? 'bg-gray-400'
                              : 'bg-gray-200'
                        }`}
                        style={{ height: `${Math.max(height, 4)}%` }}
                      />
                      <span className={`text-[10px] uppercase tracking-wide ${
                        isCurrent ? 'text-black font-medium' : 'text-gray-600'
                      }`}>
                        {MONTH_NAMES[index].slice(0, 1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-gray-600 uppercase tracking-wide border border-black p-4">No seasonal data available</p>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {species.wikipediaUrl && (
              <a
                href={species.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 border border-black bg-white text-black
                           text-xs font-medium text-center uppercase tracking-wide hover:bg-black hover:text-white transition"
              >
                Wikipedia
              </a>
            )}
            <a
              href={`https://www.inaturalist.org/taxa/${species.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 border border-black bg-black text-white
                         text-xs font-medium text-center uppercase tracking-wide hover:bg-white hover:text-black transition"
            >
              View on iNaturalist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
