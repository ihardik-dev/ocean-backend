// import { useOcean } from "../../context/OceanContext.jsx";
import React from "react";
import { useOcean } from "../context/OceanContext.jsx";

const LocationSelector = () => {
  const {
    location,
    setLocation,
    date,
    setDate,
    fetchOceanData,
    loading,
  } = useOcean();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLocation((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div className="location-card">
      <div className="section-title">
        <span>📍</span>
        <div>
          <h2>Select Ocean Location</h2>
          <p>Choose coordinates and observation date</p>
        </div>
      </div>

      <div className="input-grid">
        <div className="input-group">
          <label>Latitude</label>

          <input
            type="number"
            name="lat"
            min="5"
            max="30"
            step="0.01"
            value={location.lat}
            onChange={handleChange}
          />

          <small>Valid range: 5° to 30°</small>
        </div>

        <div className="input-group">
          <label>Longitude</label>

          <input
            type="number"
            name="lon"
            min="45"
            max="105"
            step="0.01"
            value={location.lon}
            onChange={handleChange}
          />

          <small>Valid range: 45° to 105°</small>
        </div>

        <div className="input-group">
          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <button
        className="primary-button"
        onClick={fetchOceanData}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Fetch Ocean Data"}
      </button>
    </div>
  );
};

export default LocationSelector;