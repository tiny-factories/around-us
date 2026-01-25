'use client';

import { useEffect, useState, useRef } from 'react';
import { Coordinates, Observation, Species, ICONIC_TAXON_EMOJI, ICONIC_TAXON_COLORS, IconicTaxon } from '@/lib/types';
import Image from 'next/image';

interface MapComponentProps {
  center: Coordinates;
  observations: Observation[];
  species?: Species[];
  focusedSpeciesId?: number | null;
  onObservationClick?: (observation: Observation) => void;
  onObservationHover?: (observation: Observation | null) => void;
  hoveredObservationId?: number | null;
  onMapMove?: (center: Coordinates) => void;
}

export function ObservationMap({ 
  center, 
  observations,
  species = [],
  focusedSpeciesId,
  onObservationClick,
  onObservationHover,
  hoveredObservationId,
  onMapMove
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const leafletRef = useRef<typeof import('leaflet') | null>(null);
  const hoverCardRef = useRef<HTMLDivElement>(null);
  const [hoveredObservation, setHoveredObservation] = useState<Observation | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ left: number; top: number } | null>(null);

  // Initialize map (only once)
  useEffect(() => {
    // Add Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Dynamic import Leaflet
    import('leaflet').then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      leafletRef.current = L;

      // Create map
      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([center.lat, center.lng], 13);
      mapInstanceRef.current = map;

      // Add minimal tile layer (CartoDB Positron - clean, minimal style)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      setIsLoaded(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
      const existingLink = document.querySelector('link[href*="leaflet.css"]');
      if (existingLink) {
        existingLink.remove();
      }
    };
  }, []); // Only run once on mount

  // Track previous center to detect when user location is found
  const previousCenterRef = useRef<Coordinates | null>(null);
  const isProgrammaticMoveRef = useRef<boolean>(false);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update map center when center changes (smooth pan to user location)
  useEffect(() => {
    if (mapInstanceRef.current && isLoaded) {
      // If this is the first center (map initialization), just set it
      if (!previousCenterRef.current) {
        mapInstanceRef.current.setView([center.lat, center.lng], 13);
        previousCenterRef.current = center;
        return;
      }

      // If center changed (user location found), smoothly pan to it
      const prevCenter = previousCenterRef.current;
      const hasChanged = prevCenter.lat !== center.lat || prevCenter.lng !== center.lng;
      
      if (hasChanged) {
        // Mark this as a programmatic move so we don't trigger onMapMove callback
        isProgrammaticMoveRef.current = true;
        
        // Smoothly pan to the new location
        mapInstanceRef.current.flyTo([center.lat, center.lng], 13, {
          duration: 1.5, // Animation duration in seconds
          easeLinearity: 0.25,
        });
        previousCenterRef.current = center;
        
        // Reset the flag after animation completes
        setTimeout(() => {
          isProgrammaticMoveRef.current = false;
        }, 1600); // Slightly longer than animation duration
      }
    }
  }, [center.lat, center.lng, isLoaded]);

  // Set up map move event listener
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded || !onMapMove) return;

    const map = mapInstanceRef.current;
    
    const handleMoveEnd = () => {
      // Don't trigger callback if this was a programmatic move
      if (isProgrammaticMoveRef.current) {
        return;
      }

      // Debounce the callback to avoid too many API calls
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      
      moveTimeoutRef.current = setTimeout(() => {
        const mapCenter = map.getCenter();
        onMapMove({
          lat: mapCenter.lat,
          lng: mapCenter.lng,
        });
      }, 500); // Wait 500ms after user stops moving
    };

    map.on('moveend', handleMoveEnd);

    return () => {
      map.off('moveend', handleMoveEnd);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [isLoaded, onMapMove]);

  // Update markers when observations change
  useEffect(() => {
    if (!mapInstanceRef.current || !leafletRef.current || !isLoaded) return;

    const L = leafletRef.current;
    const map = mapInstanceRef.current;

    // Remove all existing markers
    markersRef.current.forEach((marker) => {
      map.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers for current observations
    observations.forEach((obs) => {
      const isFocusedSpecies = focusedSpeciesId !== null && focusedSpeciesId !== undefined && obs.speciesId === focusedSpeciesId;
      const opacity = isFocusedSpecies ? 1.0 : 0.2;
      const fillOpacity = isFocusedSpecies ? 0.7 : 0.2;
      
      // Get the iconic taxon from observation or look it up from species array
      const obsTaxon = obs.iconicTaxon || species.find(s => s.id === obs.speciesId)?.iconicTaxon || 'unknown';
      const taxonColor = ICONIC_TAXON_COLORS[obsTaxon as IconicTaxon] || ICONIC_TAXON_COLORS.unknown;
      
      const marker = L.circleMarker([obs.lat, obs.lng], {
        radius: isFocusedSpecies ? 8 : 6,
        color: taxonColor,
        fillColor: taxonColor,
        fillOpacity: fillOpacity,
        opacity: opacity,
        weight: isFocusedSpecies ? 2 : 1,
      }).addTo(map);

      marker.bindPopup(`
        <div class="text-sm">
          <p class="font-medium">${obs.commonName}</p>
          <p class="text-gray-500 italic">${obs.speciesName}</p>
          ${obs.observedOn ? `<p class="text-xs text-gray-400 mt-1">${obs.observedOn}</p>` : ''}
        </div>
      `);

      if (onObservationClick) {
        marker.on('click', () => onObservationClick(obs));
      }

      // Handle hover events
      if (onObservationHover) {
        marker.on('mouseover', () => {
          const latlng = marker.getLatLng();
          const containerPoint = map.latLngToContainerPoint(latlng);
          const mapContainer = map.getContainer();
          const mapWidth = mapContainer.offsetWidth;
          const mapHeight = mapContainer.offsetHeight;
          
          setHoveredObservation(obs);
          setHoverPosition({ x: containerPoint.x, y: containerPoint.y });
          onObservationHover(obs);
          
          // Calculate tooltip position with boundary detection
          const tooltipWidth = 320; // max-w-[320px]
          const tooltipHeight = 200; // approximate height
          const offset = 20;
          
          let left = containerPoint.x + offset;
          let top = containerPoint.y;
          
          // Adjust if tooltip would go off right edge
          if (left + tooltipWidth > mapWidth) {
            left = containerPoint.x - tooltipWidth - offset;
          }
          
          // Adjust if tooltip would go off left edge
          if (left < 0) {
            left = offset;
          }
          
          // Adjust if tooltip would go off bottom edge
          if (top + tooltipHeight / 2 > mapHeight) {
            top = mapHeight - tooltipHeight / 2 - 10;
          }
          
          // Adjust if tooltip would go off top edge
          if (top - tooltipHeight / 2 < 0) {
            top = tooltipHeight / 2 + 10;
          }
          
          setTooltipPosition({ left, top });
          
          // Subtle highlight on hover - slightly increase opacity but keep same size
          const isFocused = focusedSpeciesId !== null && focusedSpeciesId !== undefined && obs.speciesId === focusedSpeciesId;
          marker.setStyle({
            radius: isFocused ? 8 : 6, // Keep original size
            fillOpacity: isFocused ? 0.9 : 0.4, // Slightly brighter on hover
            opacity: isFocused ? 1.0 : 0.4, // Slightly brighter on hover
            color: taxonColor,
            fillColor: taxonColor,
            weight: isFocused ? 2 : 1, // Keep original weight
          });
        });

        marker.on('mouseout', () => {
          setHoveredObservation(null);
          setHoverPosition(null);
          setTooltipPosition(null);
          onObservationHover(null);
          
          // Reset marker style to original
          const isFocused = focusedSpeciesId !== null && focusedSpeciesId !== undefined && obs.speciesId === focusedSpeciesId;
          marker.setStyle({
            radius: isFocused ? 8 : 6,
            fillOpacity: isFocused ? 0.7 : 0.2,
            opacity: isFocused ? 1.0 : 0.2,
            color: taxonColor,
            fillColor: taxonColor,
            weight: isFocused ? 2 : 1,
          });
        });
      }

      markersRef.current.push(marker);
    });
  }, [observations, species, isLoaded, focusedSpeciesId, onObservationClick, onObservationHover]);

  return (
    <div className="w-full h-full relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin" />
            <span className="text-xs uppercase tracking-wide">Loading map...</span>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Enhanced hover tooltip */}
      {hoveredObservation && tooltipPosition && (() => {
        const speciesData = species.find(s => s.id === hoveredObservation.speciesId);
        const emoji = speciesData ? (ICONIC_TAXON_EMOJI[speciesData.iconicTaxon as IconicTaxon] || '') : '';
        // Use species photo if available, otherwise fall back to observation photo
        const photoUrl = speciesData?.photoUrl || hoveredObservation.photoUrl;
        
        return (
          <div
            ref={hoverCardRef}
            className="absolute z-[100] pointer-events-none"
            style={{
              left: `${tooltipPosition.left}px`,
              top: `${tooltipPosition.top}px`,
              transform: 'translateY(-50%)',
            }}
          >
            <div className="bg-white border border-black p-4 min-w-[280px] max-w-[320px] shadow-lg">
              {/* Photo - prefer species photo */}
              {photoUrl && (
                <div className="w-full h-32 mb-3 relative bg-gray-100 border border-black overflow-hidden">
                  <Image
                    src={photoUrl}
                    alt={hoveredObservation.commonName}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm uppercase tracking-wide text-black">
                      {hoveredObservation.commonName}
                    </p>
                    <p className="text-xs text-gray-600 italic truncate mt-0.5">
                      {hoveredObservation.speciesName}
                    </p>
                  </div>
                  {emoji && (
                    <span className="text-xl shrink-0">{emoji}</span>
                  )}
                </div>
                
                {hoveredObservation.placeGuess && (
                  <div className="pt-2 border-t border-black">
                    <p className="text-xs text-gray-600 uppercase tracking-wide">
                      {hoveredObservation.placeGuess}
                    </p>
                  </div>
                )}
                
                {hoveredObservation.observedOn && (
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {new Date(hoveredObservation.observedOn).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
