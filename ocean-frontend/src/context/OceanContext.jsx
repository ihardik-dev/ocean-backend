import { createContext, useContext, useState } from "react";
// import { getOceanData, predictTemperature } from "../services/api";
import { predictTemperature ,getOceanData} from "../services/api";
const OceanContext = createContext();

export const OceanProvider = ({ children }) => {
  const [location, setLocation] = useState({
    lat: 15,
    lon: 75,
  });

  const [date, setDate] = useState("2026-09-01");

  const [oceanData, setOceanData] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const [loading, setLoading] = useState(false);
  const [predicting, setPredicting] = useState(false);

  const [error, setError] = useState("");

  const fetchOceanData = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOceanData(
        date,
        location.lat,
        location.lon
      );

      setOceanData(data);

      return data;
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to fetch ocean data"
      );

      setOceanData(null);
    } finally {
      setLoading(false);
    }
  };

  const runPrediction = async () => {
    if (!oceanData) {
      setError("Please fetch ocean data first.");
      return;
    }

    try {
      setPredicting(true);
      setError("");

      const data = await predictTemperature({
        date,
        lat: location.lat,
        lon: location.lon,

        sst: oceanData.sst,
        sss: oceanData.sss,
        ssh: oceanData.ssh,

        current_u: oceanData.current_u,
        current_v: oceanData.current_v,
      });

      setPrediction(data);

      return data;
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Prediction failed"
      );
    } finally {
      setPredicting(false);
    }
  };

  return (
    <OceanContext.Provider
      value={{
        location,
        setLocation,

        date,
        setDate,

        oceanData,
        prediction,

        loading,
        predicting,
        error,

        fetchOceanData,
        runPrediction,
      }}
    >
      {children}
    </OceanContext.Provider>
  );
};

export const useOcean = () => {
  return useContext(OceanContext);
};