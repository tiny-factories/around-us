// components/MapComponent.js

import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const MapComponent = ({ data }) => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ25kY2xvdWRzIiwiYSI6ImNrdzB5ZjZtNTFyNmMyb3QzdG9ob2wyNXQifQ.zTjDydzauvHv3V9I91h-jA";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [data.longitude, data.latitude], // Center the map based on the fetched location
      zoom: 10,
    });

    // Add a marker based on fetched data location
    new mapboxgl.Marker().setLngLat([data.longitude, data.latitude]).addTo(map);

    // Additional map setup, like adding more markers, popups, etc. based on your API data...
  }, [data]);

  return (
    <div>
      Displaying data for location:
      <br />
      Latitude: {data.latitude}
      <br />
      Longitude: {data.longitude}
      <div id="map" style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default MapComponent;
