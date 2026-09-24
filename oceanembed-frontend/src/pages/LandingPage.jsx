import React from "react";
import Footer from "../components/Footer.jsx";

export default function LandingPage({ onLaunchDashboard }) {
  return (
    <main className="landing-page" style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px" }}>
      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-content">
          <span className="badge">AI-POWERED OCEAN ANALYSIS</span>

          <h1>
            Reconstructing the
            <span> Ocean Beneath the Surface</span>
          </h1>

          <p>
            OceanEmbed is a satellite embedding-based deep learning framework
            designed to reconstruct subsurface ocean temperature from surface
            observations across multiple depths in the North Indian Ocean.
          </p>

          <div className="hero-buttons">
            <button
              type="button"
              className="primary-button"
              onClick={onLaunchDashboard}
            >
              Launch Dashboard →
            </button>

            <a href="#pipeline" className="secondary-button">
              Explore Pipeline ↓
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="ocean-orb" aria-hidden="true">
            <div className="orb-center" />
          </div>
        </div>
      </section>

      {/* ================= WORKFLOW / HOW IT WORKS ================= */}
      <section className="workflow" id="workflow">
        <div className="section-heading center">
          <span className="section-label">HOW OCEANEMBED WORKS</span>
          <h2>Understanding the Ocean Beneath</h2>
          <p>
            From satellite surface observations to vertical subsurface
            temperature reconstruction.
          </p>
        </div>

        <div className="workflow-grid">
          <div className="workflow-card">
            <span>01</span>
            <h3>Satellite Observations</h3>
            <p>
              Surface ocean parameters including SST, SSS, SSH, currents, and
              wind provide vital information about the upper thermal state.
            </p>
          </div>

          <div className="workflow-card">
            <span>02</span>
            <h3>Deep Learning</h3>
            <p>
              A trained neural network model learns the non-linear physical
              relationships between surface conditions and subsurface thermal profiles.
            </p>
          </div>

          <div className="workflow-card">
            <span>03</span>
            <h3>Temperature Reconstruction</h3>
            <p>
              The system produces temperature estimates across multiple ocean
              depths with high spatial and vertical fidelity.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PIPELINE SECTION ================= */}
      <section className="about-pipeline" id="pipeline">
        <div className="section-heading center">
          <span className="section-label">THE OCEANEMBED PIPELINE</span>
          <h2>
            From Surface Data to
            <span> Subsurface Intelligence</span>
          </h2>
          <p>
            OceanEmbed transforms satellite-derived observations into depth-wise
            ocean temperature predictions using deep learning.
          </p>
        </div>

        <div className="pipeline">
          <div className="pipeline-step">
            <div className="pipeline-icon">🛰</div>
            <div>
              <span className="pipeline-number">01</span>
              <h3>Satellite Data</h3>
              <p>
                Surface observations such as SST, SSS, SSH and ocean currents
                provide the initial spatial condition information.
              </p>
            </div>
          </div>

          <div className="pipeline-line"></div>

          <div className="pipeline-step">
            <div className="pipeline-icon">◈</div>
            <div>
              <span className="pipeline-number">02</span>
              <h3>Ocean Embeddings</h3>
              <p>
                Surface observations are transformed into high-dimensional
                ocean embeddings capturing local and meso-scale dynamics.
              </p>
            </div>
          </div>

          <div className="pipeline-line"></div>

          <div className="pipeline-step">
            <div className="pipeline-icon">🧠</div>
            <div>
              <span className="pipeline-number">03</span>
              <h3>Deep Learning</h3>
              <p>
                A trained deep neural network maps surface spatial embeddings
                directly into vertical thermal profiles.
              </p>
            </div>
          </div>

          <div className="pipeline-line"></div>

          <div className="pipeline-step">
            <div className="pipeline-icon">🌊</div>
            <div>
              <span className="pipeline-number">04</span>
              <h3>Temperature Profile</h3>
              <p>
                The model reconstructs precise temperature values across
                multiple standard depths beneath the ocean surface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY OCEANEMBED ================= */}
      <section className="why-oceanembed" id="why">
        <div className="section-heading center">
          <span className="section-label">WHY OCEANEMBED</span>
          <h2>
            Turning Surface Observations
            <span> Into Ocean Insights</span>
          </h2>
        </div>

        <div className="feature-grid">
          <div className="feature-box">
            <div className="feature-icon">◉</div>
            <div>
              <span className="feature-tag">SURFACE → SUBSURFACE</span>
              <h3>See Beneath the Surface</h3>
              <p>
                Estimate subsurface ocean conditions from remotely observable
                surface parameters without requiring continuous in-situ moorings.
              </p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon">⌁</div>
            <div>
              <span className="feature-tag">AI-POWERED</span>
              <h3>Deep Learning Reconstruction</h3>
              <p>
                Learn complex physical relationships between surface
                observations and subsurface thermal structure.
              </p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon">↕</div>
            <div>
              <span className="feature-tag">DEPTH-AWARE</span>
              <h3>Multi-Depth Prediction</h3>
              <p>
                Generate temperature estimates continuously across vertical
                depth levels down to 1000m.
              </p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🌊</div>
            <div>
              <span className="feature-tag">INTERACTIVE</span>
              <h3>Visual Ocean Analysis</h3>
              <p>
                Explore reconstructed temperature profiles and map locations
                through an intuitive interactive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGY STACK ================= */}
      <section className="about-tech" id="technology">
        <div className="section-heading center">
          <span className="section-label">TECHNOLOGY</span>
          <h2>
            Built for
            <span> Ocean Intelligence</span>
          </h2>
        </div>

        <div className="tech-row">
          <div className="tech-item">
            <span>🛰</span>
            <div>
              <small>DATA</small>
              <strong>Satellite Observations</strong>
            </div>
          </div>

          <div className="tech-item">
            <span>🐍</span>
            <div>
              <small>LANGUAGE</small>
              <strong>Python</strong>
            </div>
          </div>

          <div className="tech-item">
            <span>🧠</span>
            <div>
              <small>AI</small>
              <strong>Deep Learning</strong>
            </div>
          </div>

          <div className="tech-item">
            <span>⚡</span>
            <div>
              <small>API</small>
              <strong>FastAPI</strong>
            </div>
          </div>

          <div className="tech-item">
            <span>◈</span>
            <div>
              <small>DATABASE</small>
              <strong>PostgreSQL</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="landing-cta">
        <div className="section-heading center" style={{ marginBottom: "24px" }}>
          <span className="section-label">INTERACTIVE RECONSTRUCTION</span>
          <h2>
            Ready to Explore <span>Subsurface Ocean Data?</span>
          </h2>
          <p style={{ maxWidth: "580px", margin: "10px auto 0" }}>
            Click anywhere on our interactive map or specify coordinates in the
            North Indian Ocean to generate real-time subsurface temperature profiles.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          style={{ height: "50px", padding: "0 32px" }}
          onClick={onLaunchDashboard}
        >
          Launch Interactive Dashboard →
        </button>
      </section>

      <Footer onNavigate={(v) => v === "dashboard" ? onLaunchDashboard() : null} />
    </main>
  );
}
