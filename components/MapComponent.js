import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ data, overlayContent }) => {
  const position = [data.latitude, data.longitude];

  // The OverlayComponent is a functional component that will render the overlayContent prop
  const OverlayComponent = () => {
    return <>{overlayContent}</>; // This returns the overlayContent JSX as provided by the parent
  };

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
      <OverlayComponent />
    </MapContainer>
  );
};

export default MapComponent;
