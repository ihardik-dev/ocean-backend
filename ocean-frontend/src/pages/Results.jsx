import React from "react";
import { Link } from "react-router-dom";

import TemperatureChart from "../components/TemperatureChart.jsx";
import PredictionTable from "../components/PredictionTable.jsx";

import { useOcean } from "../context/OceanContext.jsx";

const Results = () => {
  const { prediction } = useOcean();

  if (!prediction) {
    return (
      <main className="empty-page">

        <h1>No Prediction Available</h1>

        <p>
          Run a reconstruction from the dashboard first.
        </p>

        <Link
          to="/dashboard"
          className="primary-button"
        >
          Go to Dashboard
        </Link>

      </main>
    );
  }

  return (
    <main className="results">

      <div className="results-header">

        <div>

          <span className="badge">
            AI RECONSTRUCTION COMPLETE
          </span>

          <h1>
            Subsurface Temperature Results
          </h1>

          <p>
            OceanEmbed reconstructed the temperature
            profile for the selected ocean location.
          </p>

        </div>

        <Link
          to="/dashboard"
          className="secondary-button"
        >
          ← New Analysis
        </Link>

      </div>


      <div className="result-info">

        <div>
          <span>Location</span>

          <strong>
            {prediction.lat}°,
            {" "}
            {prediction.lon}°
          </strong>
        </div>

        <div>
          <span>Date</span>

          <strong>
            {prediction.date}
          </strong>
        </div>

        <div>
          <span>Data Points</span>

          <strong>
            {prediction.depths.length}
          </strong>
        </div>

      </div>


      <TemperatureChart
        prediction={prediction}
      />


      <PredictionTable
        prediction={prediction}
      />

    </main>
  );
};

export default Results;