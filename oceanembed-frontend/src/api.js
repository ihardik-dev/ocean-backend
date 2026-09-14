// Base URL of the FastAPI backend. Override at build time with
// VITE_API_BASE=http://your-host:8000 if not running locally on 8000.
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

// Domain + grid constants — must match the backend's training grid
// (0.25° resolution over 5°N–30°N, 45°E–105°E).
export const DOMAIN = {
  latMin: 5,
  latMax: 30,
  lonMin: 45,
  lonMax: 105,
  step: 0.25,
  nLat: 100,
  nLon: 240,
};

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new ApiError(
      "Can't reach the backend. Confirm the API is running at " + API_BASE,
      0,
    );
  }

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      /* response had no JSON body */
    }
    throw new ApiError(detail, res.status);
  }

  return res.json();
}

// GET /ocean-data — pulls stored surface values for a date + location,
// used to prefill the query form. Returns null if nothing is stored yet
// rather than throwing, since "no data for this point" is an expected case.
export async function fetchOceanData(date, lat, lon, refresh = false) {
  const params = new URLSearchParams({ date, lat, lon });
  if (refresh) params.set("refresh", "true");
  try {
    return await request(`/ocean-data?${params.toString()}`);
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

// POST /predict — runs the model and returns { depths, temperature }.
// `temperature` is the full grid (15 x 100 x 240); this file also
// exposes a helper to pull just the profile at one grid cell out of it.
export async function submitPrediction(payload) {
  return request("/predict", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Convert a lat/lon into the nearest grid indices on the model's
// 0.25° grid, clamped to the domain bounds.
export function toGridIndex(lat, lon) {
  const iLat = Math.min(
    DOMAIN.nLat - 1,
    Math.max(0, Math.round((lat - DOMAIN.latMin) / DOMAIN.step)),
  );
  const iLon = Math.min(
    DOMAIN.nLon - 1,
    Math.max(0, Math.round((lon - DOMAIN.lonMin) / DOMAIN.step)),
  );
  return { iLat, iLon };
}

// Pull the 15-value depth profile for one grid cell out of the full
// grid response. The current model expands one point uniformly across
// the whole grid, so any cell gives ~the same profile away from the
// domain edges — this just reads the value from the exact cell asked for.
export function extractProfile(temperatureGrid, lat, lon) {
  const { iLat, iLon } = toGridIndex(lat, lon);
  return temperatureGrid.map((depthLayer) => depthLayer[iLat][iLon]);
}
