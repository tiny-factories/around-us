const LocationButton = ({ onLocationUpdate }) => {
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        // Update the location data in the parent component
        onLocationUpdate({
          latitude: lat,
          longitude: long,
        });
      },
      (error) => {
        console.error("Error retrieving location: ", error);
      }
    );
  };

  return <button onClick={getCurrentLocation}>Get Current Location</button>;
};

export default LocationButton;
