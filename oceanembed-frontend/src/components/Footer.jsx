import React from "react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="ocean-footer">
      <div className="footer-line">
        <span></span>
        <p>OCEAN EMBED / DEEP OCEAN INTELLIGENCE SYSTEM</p>
        <span></span>
      </div>

      <div className="footer-container">
        <div className="footer-brand">
          <div
            className="footer-logo"
            style={{ cursor: "pointer" }}
            onClick={() => onNavigate && onNavigate("landing")}
          >
            OCEAN<span>EMBED</span>
          </div>

          <p>
            Satellite embedding-based deep learning framework for
            reconstruction of subsurface ocean temperature.
          </p>

          <div className="system-status">
            <span className="status-dot"></span>
            SYSTEM ONLINE
          </div>
        </div>

        <div className="footer-column">
          <h4>NAVIGATION</h4>
          <span style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("landing")}>Home</span>
          <span style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("dashboard")}>Dashboard</span>
          <a href="#pipeline">Pipeline</a>
          <a href="#technology">Technology</a>
        </div>

        <div className="footer-column">
          <h4>TECHNOLOGY</h4>
          <span>Satellite Observations</span>
          <span>Deep Learning</span>
          <span>Ocean Embeddings</span>
          <span>Temperature Reconstruction</span>
        </div>

        <div className="footer-column">
          <h4>REGION FOCUS</h4>
          <span>North Indian Ocean</span>
          <span>Arabian Sea & Bay of Bengal</span>
          <span>Depth: 0m to 1000m</span>

          <div className="coordinates">
            <span>LAT</span>
            <strong>15.000° N</strong>
            <span>LON</span>
            <strong>80.000° E</strong>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 OceanEmbed. Built for ocean intelligence.</p>

        <div className="footer-meta">
          <span>v1.0</span>
          <span>•</span>
          <span>AI / SATELLITE / OCEAN RECONSTRUCTION</span>
        </div>
      </div>
    </footer>
  );
}
