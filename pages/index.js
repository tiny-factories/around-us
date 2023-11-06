import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import LocationButton from "../components/LocationButton";

const MapComponent = dynamic(
  () => import("../components/MapComponent"), // replace with your component
  { ssr: false }
);

const getRandomCoordinates = () => {
  const latitude = Math.random() * 180 - 90;
  const longitude = Math.random() * 360 - 180;
  return { latitude, longitude };
};

const IndexPage = () => {
  const [locationData, setLocationData] = useState(getRandomCoordinates());
  const [results, setResults] = useState([]);
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    updateLocationData(locationData, false);
  }, []);

  const handleLocationRequest = (data) => {
    setLocationFetched(true);
    updateLocationData(data, true);
  };

  const updateLocationData = async (data, userInitiated) => {
    console.log(`updateLocationData called with data: `, data);

    // Only update the state with new data if it's a user-initiated action.
    if (userInitiated) {
      setLocationData({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    }

    const roundedLatitude = Math.round(data.latitude * 100) / 100;
    const roundedLongitude = Math.round(data.longitude * 100) / 100;

    // const GBIF_API_URL = `https://api.gbif.org/v1/occurrence/search?decimalLatitude=${roundedLatitude}&decimalLongitude=${roundedLongitude}&radius=100&limit=20`;
    const GBIF_API_URL = `https://api.gbif.org/v1/occurrence/search?decimalLatitude=51.50853000&decimalLongitude=-0.12574000&radius=10&limit=20`;

    console.log(`Making API request to GBIF with URL: ${GBIF_API_URL}`);

    try {
      const response = await fetch(GBIF_API_URL);
      const resultData = await response.json();
      console.log("GBIF API response:", resultData);
      setResults(resultData.results);
    } catch (error) {
      console.error("Error fetching data from GBIF:", error);
    }
  };

  const mapOverlay = (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        padding: "10px",
        background: "rgba(255, 255, 255, 0.7)",
        zIndex: 1000, // Ensure it's above all map layers
      }}
    >
      <div>Lat: {locationData.latitude.toFixed(2)}</div>
      <div>Lng: {locationData.longitude.toFixed(2)}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div
        className="rounded border "
        style={{ flex: "1 1 33%", display: "flex", flexDirection: "column" }}
      >
        <div className="">
          <div className="text-lg font-bold">Around Us</div>

          <div className="">Blub</div>
        </div>
        {!locationFetched && (
          <>
            <LocationButton onLocationUpdate={handleLocationRequest} />
          </>
        )}

        {locationFetched && (
          <>
            <div className="text-lg font-bold">Results</div>

            {results.map((result, index) => (
              <div key={index}>
                <div>{result.genericName}</div>
                {/* Ensure that media and the image exists before trying to render it */}
                {result.media &&
                  result.media.length > 0 &&
                  result.media[0].identifier && <div></div>}
              </div>
            ))}
          </>
        )}
      </div>
      <div style={{ flex: "2 1 66%" }}>
        <MapComponent data={locationData} overlayContent={mapOverlay} />
      </div>
    </div>
  );
};

export default IndexPage;
