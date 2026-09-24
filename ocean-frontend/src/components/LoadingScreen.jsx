import React from "react";
const LoadingScreen = ({ text = "Processing..." }) => {
  return (
    <div className="loading-container">

      <div className="loader"></div>

      <h3>{text}</h3>

      <p>
        OceanEmbed AI model is reconstructing
        subsurface temperature.
      </p>

    </div>
  );
};

export default LoadingScreen;