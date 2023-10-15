import { useState } from "react";
import LocationButton from "../components/LocationButton";
import MapComponent from "../components/MapComponent";

const IndexPage = () => {
  const [locationData, setLocationData] = useState(null);
  const [results, setResults] = useState([]);

  const updateLocationData = async (data) => {
    // Round to 2 decimal places
    const roundedLatitude = Math.round(data.latitude * 10) / 10;
    const roundedLongitude = Math.round(data.longitude * 10) / 10;

    setLocationData({
      latitude: roundedLatitude,
      longitude: roundedLongitude,
    });

    // Construct the GBIF API endpoint URL with the rounded values
    const GBIF_API_URL = `https://api.gbif.org/v1/occurrence/search?decimalLatitude=${roundedLatitude}&decimalLongitude=${roundedLongitude}&radius=10&limit=20`;

    try {
      const response = await fetch(GBIF_API_URL);
      const resultData = await response.json();
      setResults(resultData.results);
    } catch (error) {
      console.error("Error fetching data from GBIF:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Results List */}
      Results:
      <div style={{ flex: 1 }}>
        {results.map((result) => (
          <div key={result.key}>
            {result.scientificName}
            {/* Add more details as required */}
          </div>
        ))}
      </div>
      {/* Map Section */}
      <div style={{ flex: 2 }}>
        <LocationButton onLocationUpdate={updateLocationData} />
        {locationData && <MapComponent data={locationData} />}
      </div>
    </div>
  );
};

export default IndexPage;
