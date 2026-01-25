'use client';

import { IconicTaxon, ICONIC_TAXON_LABELS, ICONIC_TAXON_EMOJI } from '@/lib/types';

interface TaxonFilterProps {
  selected: IconicTaxon | 'all';
  onSelect: (taxon: IconicTaxon | 'all') => void;
  counts?: Record<string, number>;
}

const TAXON_ORDER: (IconicTaxon | 'all')[] = [
  'all',
  'Aves',
  'Mammalia',
  'Plantae',
  'Insecta',
  'Reptilia',
  'Amphibia',
  'Fungi',
  'Arachnida',
  'Mollusca',
  'Actinopterygii',
];

export function TaxonFilter({ selected, onSelect, counts }: TaxonFilterProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {TAXON_ORDER.map((taxon) => {
        const isAll = taxon === 'all';
        const isSelected = taxon === selected;
        const count = isAll
          ? Object.values(counts || {}).reduce((a, b) => a + b, 0)
          : counts?.[taxon] || 0;

        if (!isAll && count === 0 && !isSelected) return null;

        return (
          <button
            key={taxon}
            onClick={() => onSelect(taxon)}
            className={`
              flex items-center gap-1.5 px-2 py-1.5 border
              text-xs font-medium uppercase tracking-wide transition-all duration-150
              ${isSelected
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-black hover:bg-black hover:text-white'
              }
            `}
          >
            {!isAll && (
              <span>{ICONIC_TAXON_EMOJI[taxon as IconicTaxon]}</span>
            )}
            <span>
              {isAll ? 'All' : ICONIC_TAXON_LABELS[taxon as IconicTaxon]}
            </span>
            {count > 0 && (
              <span className={`
                text-xs px-1.5
                ${isSelected ? 'bg-white text-black' : 'bg-black text-white'}
              `}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
