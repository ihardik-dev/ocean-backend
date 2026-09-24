import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const getOceanData = async (date, lat, lon) => {
  const response = await API.get("/ocean-data", {
    params: {
      date,
      lat,
      lon,
    },
  });

  return response.data;
};

export const predictTemperature = async (data) => {
  const response = await API.post("/predict", data);

  return response.data;
};

export default API;