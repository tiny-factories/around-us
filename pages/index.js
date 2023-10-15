import { useEffect, useState } from "react";
import MapboxMap from "../components/MapboxMap";

function HomePage() {
  const [data, setData] = useState(null);
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (coords.lat && coords.lon) {
      fetch(
        `https://api.gbif.org/v1/occurrence/search?decimalLatitude=${coords.lat}&decimalLongitude=${coords.lon}&limit=20`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [coords]);

  return (
    <div className="container mx-auto mt-10">
      {data && <MapboxMap data={data} />}
    </div>
  );
}

export default HomePage;
