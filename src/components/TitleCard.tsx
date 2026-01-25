'use client';

import { useState, useEffect } from 'react';

const EARTH_EMOJIS = ['🌍', '🌎', '🌏']; // Europe-Africa, Americas, Asia-Australia

export function TitleCard() {
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // After transition completes, update to next emoji
      setTimeout(() => {
        setCurrentEmojiIndex((prev) => (prev + 1) % EARTH_EMOJIS.length);
        setIsTransitioning(false);
      }, 800); // Transition duration
    }, 1500); // Rotate every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextEmojiIndex = (currentEmojiIndex + 1) % EARTH_EMOJIS.length;

  return (
    <div className="absolute top-4 left-4 z-50 bg-white border border-black px-4 py-3 pointer-events-auto rounded-lg shadow-sm">
      <h1 className="text-sm font-medium uppercase tracking-wider text-black flex items-center gap-2">
        <span className="relative inline-block w-5 h-5">
          {/* Current emoji fading out */}
          <span 
            className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {EARTH_EMOJIS[currentEmojiIndex]}
          </span>
          {/* Next emoji fading in */}
          <span 
            className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${
              isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {EARTH_EMOJIS[nextEmojiIndex]}
          </span>
        </span>
        Around Me on Earth
      </h1>
      <p className="text-xs text-gray-600 mt-0.5 uppercase tracking-wide">
        Discover wildlife around you
      </p>
    </div>
  );
}
