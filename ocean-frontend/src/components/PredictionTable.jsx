import React from "react";
const PredictionTable = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <div className="table-card">

      <div className="section-heading">
        <h2>Reconstructed Temperature Data</h2>
        <p>Depth-wise model predictions</p>
      </div>

      <div className="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>Depth (m)</th>
              <th>Temperature (°C)</th>
            </tr>
          </thead>

          <tbody>

            {prediction.depths.map(
              (depth, index) => (
                <tr key={index}>

                  <td>
                    {Number(depth).toFixed(2)}
                  </td>

                  <td>
                    {Number(
                      prediction.temperature[index]
                    ).toFixed(2)}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default PredictionTable;