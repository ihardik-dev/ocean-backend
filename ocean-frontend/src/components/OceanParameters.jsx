import React from "react";
import OceanParameterCard from "./OceanParameterCard.jsx";
const OceanParameters = ({ data }) => {
  if (!data) return null;

  return (
    <section className="parameters-section">

      <div className="section-heading">
        <h2>Surface Ocean Parameters</h2>
        <p>
          Satellite and oceanographic observations
        </p>
      </div>

      <div className="parameter-grid">

        <OceanParameterCard
          title="Sea Surface Temperature"
          value={data.sst}
          unit="°C"
          icon="🌡️"
        />

        <OceanParameterCard
          title="Sea Surface Salinity"
          value={data.sss}
          unit="PSU"
          icon="🧂"
        />

        <OceanParameterCard
          title="Sea Surface Height"
          value={data.ssh}
          unit="m"
          icon="📏"
        />

        <OceanParameterCard
          title="Current U"
          value={data.current_u}
          unit="m/s"
          icon="↔️"
        />

        <OceanParameterCard
          title="Current V"
          value={data.current_v}
          unit="m/s"
          icon="↕️"
        />

        <OceanParameterCard
          title="Wind U"
          value={data.wind_u}
          unit="m/s"
          icon="💨"
        />

        <OceanParameterCard
          title="Wind V"
          value={data.wind_v}
          unit="m/s"
          icon="🌬️"
        />

      </div>
    </section>
  );
};

export default OceanParameters;