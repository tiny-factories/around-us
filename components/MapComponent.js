import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapUpdater = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    // Update the map's center to the new location
    map.flyTo([data.latitude, data.longitude]);
  }, [data, map]);

  return null; // Component does not render anything
};

const MapComponent = ({ data, overlayContent }) => {
  const position = [data.latitude, data.longitude];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          You are here. <br /> Latitude: {data.latitude.toFixed(2)} <br />{" "}
          Longitude: {data.longitude.toFixed(2)}
        </Popup>
      </Marker>
      <MapUpdater data={data} />
      {overlayContent}
    </MapContainer>
  );
};

export default MapComponent;
