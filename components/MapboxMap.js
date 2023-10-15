// components/MapboxMap.js

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

function MapboxMap({ data }) {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // your map style
        center: [0, 0],
        zoom: 5,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (data && map) {
      data.results.forEach((item) => {
        new mapboxgl.Marker()
          .setLngLat([item.decimalLongitude, item.decimalLatitude])
          .addTo(map);
      });
    }
  }, [data, map]);

  return (
    <div
      className="map-container"
      ref={mapContainer}
      style={{ width: "100%", height: "500px" }}
    />
  );
}

export default MapboxMap;
