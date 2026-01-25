'use client';

export function TitleCard() {
  return (
    <div className="absolute top-4 left-4 z-50 bg-white border border-black px-4 py-3 pointer-events-auto">
      <h1 className="text-sm font-medium uppercase tracking-wider text-black">
        Around Me on Earth
      </h1>
      <p className="text-xs text-gray-600 mt-0.5 uppercase tracking-wide">
        Discover wildlife around you
      </p>
    </div>
  );
}
