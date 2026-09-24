import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet icon paths in Vite/React bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const BOUNDS = L.latLngBounds(
  L.latLng(5, 45), // South-West (5°N, 45°E)
  L.latLng(30, 105) // North-East (30°N, 105°E)
);

export default function MapView({ currentLat, currentLon, onSelectLocation }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const [coordText, setCoordText] = useState("Click on the map to get coordinates");

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet Map if not already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        maxBounds: BOUNDS,
        maxBoundsViscosity: 1.0,
        minZoom: 5,
      }).fitBounds(BOUNDS);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Draw bounding box outline
      L.rectangle(BOUNDS, {
        color: "#4cc9d6",
        weight: 2,
        fill: false,
        dashArray: "6 6",
      }).addTo(map);

      // Initial marker setup if lat & lon provided
      const initialLat = parseFloat(currentLat) || 15;
      const initialLon = parseFloat(currentLon) || 80;

      if (BOUNDS.contains([initialLat, initialLon])) {
        markerRef.current = L.marker([initialLat, initialLon]).addTo(map);
        setCoordText(`Lat: ${initialLat.toFixed(6)}, Lng: ${initialLon.toFixed(6)}`);
      }

      // Map click event
      map.on("click", (e) => {
        const { lat, lng } = e.latlng;

        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }
        markerRef.current = L.marker([lat, lng]).addTo(map);

        const latFormatted = lat.toFixed(4);
        const lonFormatted = lng.toFixed(4);

        setCoordText(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`);

        if (onSelectLocation) {
          onSelectLocation({ lat: latFormatted, lon: lonFormatted });
        }
      });

      mapInstanceRef.current = map;
    }

    // Force map size recalculation
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 100);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update marker position if currentLat / currentLon change externally
  useEffect(() => {
    const lat = parseFloat(currentLat);
    const lon = parseFloat(currentLon);
    const map = mapInstanceRef.current;

    if (map && !isNaN(lat) && !isNaN(lon) && BOUNDS.contains([lat, lon])) {
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]);
      } else {
        markerRef.current = L.marker([lat, lon]).addTo(map);
      }
      setCoordText(`Lat: ${lat.toFixed(6)}, Lng: ${lon.toFixed(6)}`);
    }
  }, [currentLat, currentLon]);

  return (
    <div className="map-wrapper">
      <div className="map-coord-box">
        <span>Click on the map to set coordinates</span>
        <div className="map-latlng">{coordText}</div>
      </div>

      <div ref={mapContainerRef} className="leaflet-container-box" />
    </div>
  );
}
