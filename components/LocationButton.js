const LocationButton = ({ onLocationUpdate }) => {
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    console.log("Requesting current location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        console.log(`Location retrieved: Latitude: ${lat}, Longitude: ${long}`);

        // Update the location data in the parent component
        onLocationUpdate({
          latitude: lat,
          longitude: long,
        });
      },
      (error) => {
        console.error("Error retrieving location: ", error);
      },
      {
        maximumAge: 60000,
        timeout: 5000,
        enableHighAccuracy: true,
      }
    );
  };

  return <button onClick={getCurrentLocation}>Get Current Location</button>;
};

export default LocationButton;
