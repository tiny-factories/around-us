'use client';

import { MONTH_NAMES } from '@/lib/types';

interface SeasonSelectorProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export function SeasonSelector({ selectedMonth, onMonthChange }: SeasonSelectorProps) {
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-black">Season</span>
        {selectedMonth !== currentMonth && (
          <button
            onClick={() => onMonthChange(currentMonth)}
            className="text-xs text-black hover:underline uppercase tracking-wide"
          >
            Back to now
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-1">
        {MONTH_NAMES.map((name, index) => {
          const month = index + 1;
          const isSelected = month === selectedMonth;
          const isCurrent = month === currentMonth;

          return (
            <button
              key={month}
              onClick={() => onMonthChange(month)}
              className={`
                px-2 py-1.5 border text-xs font-medium uppercase tracking-wide
                transition-all duration-150
                ${isSelected
                  ? 'bg-black text-white border-black'
                  : isCurrent
                    ? 'bg-white text-black border-black hover:bg-black hover:text-white'
                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }
              `}
            >
              {name.slice(0, 3)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
