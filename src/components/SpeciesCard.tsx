'use client';

import { Species, ICONIC_TAXON_EMOJI, IconicTaxon } from '@/lib/types';
import Image from 'next/image';

interface SpeciesCardProps {
  species: Species;
  rank?: number;
  onClick?: () => void;
  isHighlighted?: boolean;
}

export function SpeciesCard({ species, rank, onClick, isHighlighted }: SpeciesCardProps) {
  const emoji = ICONIC_TAXON_EMOJI[species.iconicTaxon as IconicTaxon] || '';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left border transition-all duration-150
                 overflow-hidden group ${
        isHighlighted
          ? 'bg-black text-white border-black'
          : 'bg-white border-black hover:bg-black hover:text-white'
      }`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Rank badge */}
        {rank && (
          <div className={`shrink-0 w-8 h-8 flex items-center justify-center
                          text-xs font-medium ${
            isHighlighted
              ? 'bg-white text-black'
              : 'bg-black text-white'
          }`}>
            {rank}
          </div>
        )}

        {/* Species photo */}
        <div className="shrink-0 w-16 h-16 overflow-hidden bg-gray-100 border border-black">
          {species.photoUrl ? (
            <Image
              src={species.photoUrl}
              alt={species.commonName}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl">
              {emoji}
            </div>
          )}
        </div>

        {/* Species info */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-sm uppercase tracking-wide truncate ${
            isHighlighted ? 'text-white' : 'text-black'
          }`}>
            {species.commonName}
          </h3>
          <p className={`text-xs italic truncate mt-0.5 ${
            isHighlighted ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {species.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs uppercase tracking-wide ${
              isHighlighted ? 'text-gray-300' : 'text-gray-500'
            }`}>
              {species.observationCount.toLocaleString()} obs
            </span>
          </div>
        </div>

        {/* Arrow indicator */}
        <div className={`shrink-0 transition-colors ${
          isHighlighted ? 'text-white' : 'text-black'
        }`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
