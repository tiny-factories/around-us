'use client';

import { useEffect, useState, useRef } from 'react';
import { Coordinates, Observation, Species, ICONIC_TAXON_EMOJI, IconicTaxon } from '@/lib/types';
import Image from 'next/image';

interface MapComponentProps {
  center: Coordinates;
  observations: Observation[];
  species?: Species[];
  focusedSpeciesId?: number | null;
  onObservationClick?: (observation: Observation) => void;
  onObservationHover?: (observation: Observation | null) => void;
  hoveredObservationId?: number | null;
}

interface MapComponentProps {
  center: Coordinates;
  observations: Observation[];
  focusedSpeciesId?: number | null;
  onObservationClick?: (observation: Observation) => void;
  onObservationHover?: (observation: Observation | null) => void;
  hoveredObservationId?: number | null;
}

export function ObservationMap({ 
  center, 
  observations,
  species = [],
  focusedSpeciesId,
  onObservationClick,
  onObservationHover,
  hoveredObservationId 
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const leafletRef = useRef<typeof import('leaflet') | null>(null);
  const hoverCardRef = useRef<HTMLDivElement>(null);
  const [hoveredObservation, setHoveredObservation] = useState<Observation | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  // Store original positions for cluster spreading
  const originalPositionsRef = useRef<Map<number, L.LatLng>>(new Map());
  const observationMapRef = useRef<Map<L.CircleMarker, Observation>>(new Map());
  const spreadMarkersRef = useRef<Set<L.CircleMarker>>(new Set());

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
        // Smoothly pan to the new location
        mapInstanceRef.current.flyTo([center.lat, center.lng], 13, {
          duration: 1.5, // Animation duration in seconds
          easeLinearity: 0.25,
        });
        previousCenterRef.current = center;
      }
    }
  }, [center.lat, center.lng, isLoaded]);

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

    // Store observation to marker mapping
    observationMapRef.current.clear();
    originalPositionsRef.current.clear();

    // Helper function to calculate distance between two lat/lng points (in meters)
    const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
      const R = 6371000; // Earth radius in meters
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLng = (lng2 - lng1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // Helper function to animate marker position
    const animateMarker = (marker: L.CircleMarker, targetLat: number, targetLng: number, duration: number = 300) => {
      const startLat = marker.getLatLng().lat;
      const startLng = marker.getLatLng().lng;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const eased = 1 - Math.pow(1 - progress, 3);
        
        const currentLat = startLat + (targetLat - startLat) * eased;
        const currentLng = startLng + (targetLng - startLng) * eased;
        
        marker.setLatLng([currentLat, currentLng]);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };

    // Helper function to spread out nearby markers
    const spreadCluster = (hoveredMarker: L.CircleMarker, hoveredObs: Observation) => {
      const CLUSTER_DISTANCE = 50; // meters - markers within this distance will spread
      const SPREAD_DISTANCE = 15; // meters - how far to spread them
      
      const hoveredLat = hoveredObs.lat;
      const hoveredLng = hoveredObs.lng;
      
      const nearbyMarkers: Array<{ marker: L.CircleMarker; obs: Observation; distance: number }> = [];
      
      // Find all nearby markers
      markersRef.current.forEach((marker) => {
        if (marker === hoveredMarker) return;
        const obs = observationMapRef.current.get(marker);
        if (!obs) return;
        
        const distance = getDistance(hoveredLat, hoveredLng, obs.lat, obs.lng);
        if (distance < CLUSTER_DISTANCE) {
          nearbyMarkers.push({ marker, obs, distance });
        }
      });

      // If there are nearby markers, spread them out
      if (nearbyMarkers.length > 0) {
        const angleStep = (2 * Math.PI) / nearbyMarkers.length;
        
        nearbyMarkers.forEach((item, index) => {
          const angle = index * angleStep;
          // Calculate new position offset
          const latOffset = (SPREAD_DISTANCE / 111000) * Math.cos(angle); // ~111km per degree latitude
          const lngOffset = (SPREAD_DISTANCE / (111000 * Math.cos(hoveredLat * Math.PI / 180))) * Math.sin(angle);
          
          const originalPos = originalPositionsRef.current.get(item.obs.id);
          if (originalPos) {
            const newLat = hoveredLat + latOffset;
            const newLng = hoveredLng + lngOffset;
            
            // Smoothly animate to new position
            animateMarker(item.marker, newLat, newLng, 300);
            spreadMarkersRef.current.add(item.marker);
          }
        });
      }
    };

    // Helper function to return markers to original positions
    const returnToOriginalPositions = () => {
      spreadMarkersRef.current.forEach((marker) => {
        const obs = observationMapRef.current.get(marker);
        if (obs) {
          const originalPos = originalPositionsRef.current.get(obs.id);
          if (originalPos) {
            animateMarker(marker, originalPos.lat, originalPos.lng, 300);
          }
        }
      });
      spreadMarkersRef.current.clear();
    };

    // Add new markers for current observations
    observations.forEach((obs) => {
      const isFocusedSpecies = focusedSpeciesId !== null && focusedSpeciesId !== undefined && obs.speciesId === focusedSpeciesId;
      const opacity = isFocusedSpecies ? 1.0 : 0.2;
      const fillOpacity = isFocusedSpecies ? 0.7 : 0.2;
      
      const originalLatLng = L.latLng(obs.lat, obs.lng);
      originalPositionsRef.current.set(obs.id, originalLatLng);
      
      const marker = L.circleMarker([obs.lat, obs.lng], {
        radius: isFocusedSpecies ? 8 : 6,
        color: '#000000',
        fillColor: '#000000',
        fillOpacity: fillOpacity,
        opacity: opacity,
        weight: isFocusedSpecies ? 2 : 1,
      }).addTo(map);

      // Store observation reference
      observationMapRef.current.set(marker, obs);

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
        marker.on('mouseover', (e) => {
          const latlng = marker.getLatLng();
          const containerPoint = map.latLngToContainerPoint(latlng);
          setHoveredObservation(obs);
          setHoverPosition({ x: containerPoint.x, y: containerPoint.y });
          onObservationHover(obs);
          
          // Highlight marker
          marker.setStyle({
            radius: 12,
            fillOpacity: 1,
            opacity: 1,
            color: '#000000',
            fillColor: '#000000',
            weight: 3,
          });

          // Spread nearby markers
          spreadCluster(marker, obs);
        });

        marker.on('mouseout', () => {
          setHoveredObservation(null);
          setHoverPosition(null);
          onObservationHover(null);
          
          // Return markers to original positions
          returnToOriginalPositions();
          
          // Reset marker style
          const isFocused = focusedSpeciesId !== null && focusedSpeciesId !== undefined && obs.speciesId === focusedSpeciesId;
          marker.setStyle({
            radius: isFocused ? 8 : 6,
            fillOpacity: isFocused ? 0.7 : 0.2,
            opacity: isFocused ? 1.0 : 0.2,
            color: '#000000',
            fillColor: '#000000',
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
      {hoveredObservation && hoverPosition && (() => {
        const speciesData = species.find(s => s.id === hoveredObservation.speciesId);
        const emoji = speciesData ? (ICONIC_TAXON_EMOJI[speciesData.iconicTaxon as IconicTaxon] || '') : '';
        // Use species photo if available, otherwise fall back to observation photo
        const photoUrl = speciesData?.photoUrl || hoveredObservation.photoUrl;
        
        return (
          <div
            ref={hoverCardRef}
            className="absolute z-50 pointer-events-none"
            style={{
              left: `${hoverPosition.x + 20}px`,
              top: `${hoverPosition.y}px`,
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
