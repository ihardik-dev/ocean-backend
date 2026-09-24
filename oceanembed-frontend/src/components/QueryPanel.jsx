import { DOMAIN } from "../api.js";

const FIELDS = [
  { key: "sst", label: "Sea surface temperature", unit: "°C", step: "0.01" },
  { key: "sss", label: "Sea surface salinity", unit: "PSU", step: "0.01" },
  { key: "ssh", label: "Sea surface height", unit: "m", step: "0.001" },
  {
    key: "current_u",
    label: "Current — eastward (u)",
    unit: "m/s",
    step: "0.001",
  },
  {
    key: "current_v",
    label: "Current — northward (v)",
    unit: "m/s",
    step: "0.001",
  },
  { key: "wind_u", label: "Wind — eastward (u)", unit: "m/s", step: "0.001" },
  { key: "wind_v", label: "Wind — northward (v)", unit: "m/s", step: "0.001" },
];

export default function QueryPanel({
  form,
  onChange,
  onFetchSurface,
  onSubmit,
  fetching,
  submitting,
  fetchNote,
}) {
  const handle = (key) => (e) => {
    const value = e.target.value;
    onChange(key, value);
  };

  return (
    <form
      className="query-panel"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <section className="field-group">
        <h2>Location &amp; date</h2>

        <label className="field">
          <span>Date</span>
          <input
            type="date"
            value={form.date}
            onChange={handle("date")}
            required
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span>
              Latitude ({DOMAIN.latMin}° – {DOMAIN.latMax}°N)
            </span>
            <input
              type="number"
              step="any"
              min={DOMAIN.latMin}
              max={DOMAIN.latMax}
              value={form.lat}
              onChange={handle("lat")}
              required
            />
          </label>
          <label className="field">
            <span>
              Longitude ({DOMAIN.lonMin}° – {DOMAIN.lonMax}°E)
            </span>
            <input
              type="number"
              step="any"
              min={DOMAIN.lonMin}
              max={DOMAIN.lonMax}
              value={form.lon}
              onChange={handle("lon")}
              required
            />
          </label>
        </div>

        <button
          type="button"
          className="btn btn-ghost"
          onClick={onFetchSurface}
          disabled={fetching}
        >
          {fetching
            ? "Fetching stored surface data…"
            : "Fetch stored surface data"}
        </button>
        {fetchNote && <p className="field-note">{fetchNote}</p>}
      </section>

      <section className="field-group">
        <h2>Surface parameters</h2>
        <p className="field-hint">
          Fetched values can be edited before reconstructing.
        </p>

        {FIELDS.map((f) => (
          <label className="field" key={f.key}>
            <span>
              {f.label} <em>({f.unit})</em>
            </span>
            <input
              type="number"
              step={f.step}
              value={form[f.key]}
              onChange={handle(f.key)}
              required
            />
          </label>
        ))}
      </section>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Reconstructing…" : "Reconstruct profile"}
      </button>
    </form>
  );
}
