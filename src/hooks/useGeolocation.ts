'use client';

import { useState, useEffect, useCallback } from 'react';
import { Coordinates } from '@/lib/types';

interface GeolocationState {
  coordinates: Coordinates;
  error: string | null;
  loading: boolean;
}

// Default to San Francisco for demo/fallback
const DEFAULT_COORDS: Coordinates = {
  lat: 37.7749,
  lng: -122.4194,
};

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coordinates: DEFAULT_COORDS, // Start with default coordinates immediately
    error: null,
    loading: true,
  });

  const requestLocation = useCallback(() => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setState({
        coordinates: DEFAULT_COORDS,
        error: 'Geolocation not supported. Using San Francisco as default.',
        loading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
          loading: false,
        });
      },
      (error) => {
        let errorMessage = 'Unable to get location.';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Using San Francisco as default.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location unavailable. Using San Francisco as default.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Using San Francisco as default.';
            break;
        }

        setState({
          coordinates: DEFAULT_COORDS,
          error: errorMessage,
          loading: false,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const setManualLocation = useCallback((coords: Coordinates) => {
    setState({
      coordinates: coords,
      error: null,
      loading: false,
    });
  }, []);

  return {
    ...state,
    requestLocation,
    setManualLocation,
    isDefault: state.coordinates?.lat === DEFAULT_COORDS.lat &&
               state.coordinates?.lng === DEFAULT_COORDS.lng,
  };
}
