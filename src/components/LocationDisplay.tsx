'use client';

import { Coordinates } from '@/lib/types';

interface LocationDisplayProps {
  coordinates: Coordinates | null;
  isDefault: boolean;
  loading: boolean;
  error: string | null;
  onRequestLocation: () => void;
}

export function LocationDisplay({
  coordinates,
  isDefault,
  loading,
  error,
  onRequestLocation,
}: LocationDisplayProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-600">
        <div className="w-4 h-4 border-2 border-black border-t-transparent
                        animate-spin" />
        <span className="text-xs uppercase tracking-wide">Finding your location...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <svg className={`w-4 h-4 ${isDefault ? 'text-gray-600' : 'text-black'}`}
             fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd" />
        </svg>
        {coordinates && (
          <span className="text-xs text-black uppercase tracking-wide">
            {isDefault ? (
              <span className="text-gray-600">San Francisco (default)</span>
            ) : (
              `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`
            )}
          </span>
        )}
      </div>

      {(isDefault || error) && (
        <button
          onClick={onRequestLocation}
          className="text-xs text-black hover:underline uppercase tracking-wide"
        >
          Use my location
        </button>
      )}
    </div>
  );
}
