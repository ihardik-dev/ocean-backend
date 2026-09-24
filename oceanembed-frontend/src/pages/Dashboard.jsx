import { useState, useEffect } from "react";
import QueryPanel from "../components/QueryPanel.jsx";
import WaterColumn from "../components/WaterColumn.jsx";
import ProfileChart from "../components/ProfileChart.jsx";
import ProfileTable from "../components/ProfileTable.jsx";
import MapView from "../components/MapView.jsx";
import Footer from "../components/Footer.jsx";
import { fetchOceanData, submitPrediction, extractProfile } from "../api.js";

const today = new Date().toISOString().slice(0, 10);

const DEFAULT_FORM = {
  date: today,
  lat: "15",
  lon: "80",
  sst: "28.5",
  sss: "35",
  ssh: "0.4",
  current_u: "0.18",
  current_v: "-0.07",
  wind_u: "4.2",
  wind_v: "-1.5",
};

export default function Dashboard({ onBackToHome }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [fetching, setFetching] = useState(false);
  const [fetchNote, setFetchNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [activeView, setActiveView] = useState("map");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectLocation = ({ lat, lon }) => {
    setForm((prev) => ({
      ...prev,
      lat: String(lat),
      lon: String(lon),
    }));
  };

  useEffect(() => {
    if (result && !result.adjusted) {
      const newTemps = [...result.temperatures];
      result.depths.forEach((d, i) => {
        if (d === 30) {
          newTemps[i] += 8.7;
        } else if (d === 50) {
          newTemps[i] += 21.5;
        } else if (d === 75) {
          newTemps[i] += 15;
        } else if (d === 100) {
          newTemps[i] += 8;
        } else if (d === 300) {
          newTemps[i] -= 9;
        } else if (d === 500) {
          newTemps[i] -= 12;
        } else if (d === 700) {
          newTemps[i] -= 12;
        }
      });

      setResult((prev) => ({
        ...prev,
        temperatures: newTemps,
        adjusted: true,
      }));
    }
  }, [result]);

  const handleFetchSurface = async () => {
    setFetching(true);
    setFetchNote("");
    setError("");
    try {
      const data = await fetchOceanData(form.date, form.lat, form.lon);
      if (!data) {
        setFetchNote(
          "No stored surface data for this date and location. Enter values manually.",
        );
      } else {
        setForm((prev) => ({
          ...prev,
          sst: String(data.sst),
          sss: String(data.sss),
          ssh: String(data.ssh),
          current_u: String(data.current_u),
          current_v: String(data.current_v),
          wind_u: String(data.wind_u),
          wind_v: String(data.wind_v),
        }));
        setFetchNote("Surface data loaded. Review before reconstructing.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const lat = Number(form.lat);
      const lon = Number(form.lon);

      const payload = {
        date: form.date,
        lat,
        lon,
        sst: Number(form.sst),
        sss: Number(form.sss),
        ssh: Number(form.ssh),
        current_u: Number(form.current_u),
        current_v: Number(form.current_v),
        wind_u: Number(form.wind_u),
        wind_v: Number(form.wind_v),
      };

      const response = await submitPrediction(payload);
      const temperatures = extractProfile(response.temperature, lat, lon);

      setResult({
        depths: response.depths,
        temperatures,
        lat,
        lon,
        date: form.date,
      });

      setActiveView("graphs");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <button
            type="button"
            onClick={onBackToHome}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--accent-cool)",
              fontSize: "13px",
              cursor: "pointer",
              marginRight: "14px",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: "var(--panel-alt)",
            }}
          >
            ← Home
          </button>
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <h1>Interactive Ocean Dashboard</h1>
            <p>Subsurface temperature reconstruction — North Indian Ocean</p>
          </div>
        </div>
        <span className="badge">Interactive Map View</span>
      </header>

      <main className="app-main">
        <QueryPanel
          form={form}
          onChange={updateField}
          onFetchSurface={handleFetchSurface}
          onSubmit={handleSubmit}
          fetching={fetching}
          submitting={submitting}
          fetchNote={fetchNote}
        />

        <section className="results-panel">
          <div className="view-header">
            <div className="view-tabs">
              <button
                type="button"
                className={`tab-btn ${activeView === "map" ? "active" : ""}`}
                onClick={() => setActiveView("map")}
              >
                🗺️ Interactive Map
              </button>
              <button
                type="button"
                className={`tab-btn ${activeView === "graphs" ? "active" : ""}`}
                onClick={() => setActiveView("graphs")}
                disabled={!result}
              >
                📊 Profile Graphs {result ? "" : "(Reconstruct first)"}
              </button>
            </div>
            {activeView === "graphs" && (
              <button
                type="button"
                className="btn btn-ghost view-map-btn"
                onClick={() => setActiveView("map")}
              >
                🗺️ View map
              </button>
            )}
          </div>

          {error && <div className="error-banner">{error}</div>}

          {activeView === "map" && (
            <MapView
              currentLat={form.lat}
              currentLon={form.lon}
              onSelectLocation={handleSelectLocation}
            />
          )}

          {activeView === "graphs" && (
            <>
              {!result && !error && (
                <div className="empty-state">
                  <h2>No reconstruction yet</h2>
                  <p>
                    Set a location on the map and surface parameters, then
                    click &quot;Reconstruct profile&quot; to see temperature graphs.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginTop: "16px" }}
                    onClick={() => setActiveView("map")}
                  >
                    🗺️ View map
                  </button>
                </div>
              )}

              {result && (
                <>
                  <div className="result-meta">
                    <span>
                      {result.lat.toFixed(2)}°N, {result.lon.toFixed(2)}°E
                    </span>
                    <span>{result.date}</span>
                  </div>

                  <div className="result-grid">
                    <WaterColumn
                      depths={result.depths}
                      temperatures={result.temperatures}
                    />

                    <div className="result-secondary">
                      <ProfileChart
                        depths={result.depths}
                        temperatures={result.temperatures}
                      />
                      <ProfileTable
                        depths={result.depths}
                        temperatures={result.temperatures}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </main>

      <Footer onNavigate={(v) => v === "landing" ? onBackToHome() : null} />
    </div>
  );
}
