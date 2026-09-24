import React from "react";
import { useNavigate } from "react-router-dom";
import LocationSelector from "../components/LocationSelector.jsx";
import OceanParameters from "../components/OceanParameters.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { useOcean } from "../context/OceanContext.jsx";

const Dashboard = () => {
  const {
    oceanData,
    runPrediction,
    predicting,
    error,
  } = useOcean();

  const navigate = useNavigate();

  const handlePrediction = async () => {
    const result = await runPrediction();

    if (result) {
      navigate("/results");
    }
  };

  return (
    <main className="dashboard">

      <div className="dashboard-header">

        <div>
          <span className="badge">
            OCEAN ANALYSIS
          </span>

          <h1>Ocean Reconstruction Dashboard</h1>

          <p>
            Select a location and retrieve ocean
            surface observations.
          </p>
        </div>

      </div>


      {error && (
        <div className="error-box">
          ⚠️ {error}
        </div>
      )}


      <LocationSelector />


      {oceanData && (
        <>
          <OceanParameters data={oceanData} />

          <div className="prediction-section">

            <div>
              <h2>Ready for Reconstruction?</h2>

              <p>
                Use the retrieved surface parameters
                as input to the OceanEmbed deep learning model.
              </p>
            </div>

            <button
              className="prediction-button"
              onClick={handlePrediction}
              disabled={predicting}
            >
              {predicting
                ? "Running AI Model..."
                : "🔬 Run Reconstruction"}
            </button>

          </div>
        </>
      )}


      {predicting && (
        <LoadingScreen
          text="Running OceanEmbed AI Model..."
        />
      )}

    </main>
  );
};

export default Dashboard;