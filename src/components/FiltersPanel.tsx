'use client';

import { IconicTaxon } from '@/lib/types';
import { SeasonSelector } from './SeasonSelector';
import { TaxonFilter } from './TaxonFilter';

interface FiltersPanelProps {
  selectedMonth: number;
  selectedTaxon: IconicTaxon | 'all';
  onMonthChange: (month: number) => void;
  onTaxonChange: (taxon: IconicTaxon | 'all') => void;
  taxonCounts?: Record<string, number>;
}

export function FiltersPanel({
  selectedMonth,
  selectedTaxon,
  onMonthChange,
  onTaxonChange,
  taxonCounts,
}: FiltersPanelProps) {
  return (
    <div className="absolute bottom-4 left-4 z-50 bg-white border border-black p-4 pointer-events-auto w-[244px] rounded-lg shadow-sm">
      <div className="space-y-3">
        {/* Season Filter */}
        <div>
          <SeasonSelector
            selectedMonth={selectedMonth}
            onMonthChange={onMonthChange}
          />
        </div>

        {/* Taxon Filter */}
        <div>
          <div className="mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-black">
              Type
            </span>
          </div>
          <TaxonFilter
            selected={selectedTaxon}
            onSelect={onTaxonChange}
            counts={taxonCounts}
          />
        </div>
      </div>
    </div>
  );
}
