import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TemperatureChart = ({ prediction }) => {
  if (!prediction) return null;

  const chartData = prediction.depths.map(
    (depth, index) => ({
      depth,
      temperature: prediction.temperature[index],
    })
  );

  return (
    <div className="chart-card">

      <div className="chart-header">
        <div>
          <h2>Subsurface Temperature Profile</h2>

          <p>
            Reconstructed temperature against depth
          </p>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="depth"
            label={{
              value: "Depth (m)",
              position: "insideBottom",
              offset: -5,
            }}
          />

          <YAxis
            label={{
              value: "Temperature (°C)",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="temperature"
            strokeWidth={3}
            dot
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default TemperatureChart;