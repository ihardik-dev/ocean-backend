import React from "react";
const About = () => {
  return (
    <main className="about">

      <section className="about-hero">

        <span className="badge">
          ABOUT OCEANEMBED
        </span>

        <h1>
          Understanding the Ocean
          Beneath the Surface
        </h1>

        <p>
          OceanEmbed is a satellite embedding-based
          deep learning framework designed to reconstruct
          subsurface ocean temperature from surface
          observations.
        </p>

      </section>


      <section className="about-grid">

        <div className="about-card">

          <span>🛰️</span>

          <h2>Satellite Observations</h2>

          <p>
            Surface ocean observations provide
            information that can be used to infer
            subsurface conditions.
          </p>

        </div>


        <div className="about-card">

          <span>🧠</span>

          <h2>Deep Learning</h2>

          <p>
            A trained neural network learns the
            relationship between surface conditions
            and subsurface temperature.
          </p>

        </div>


        <div className="about-card">

          <span>🌡️</span>

          <h2>Temperature Reconstruction</h2>

          <p>
            The system produces temperature estimates
            across multiple ocean depths.
          </p>

        </div>
        {/* ================= NEW: OCEAN EMBED PIPELINE ================= */}

<section className="about-pipeline">

  <div className="section-heading center">
    <span className="section-label">THE OCEANEMBED PIPELINE</span>

    <h2>
      From Surface Data to
      <span> Subsurface Intelligence</span>
    </h2>

    <p>
      OceanEmbed transforms satellite-derived observations into
      depth-wise ocean temperature predictions using deep learning.
    </p>
  </div>


  <div className="pipeline">

    {/* Step 1 */}
    <div className="pipeline-step">
      <div className="pipeline-icon">🛰</div>

      <span className="pipeline-number">01</span>

      <h3>Satellite Data</h3>

      <p>
        Surface observations such as SST, SSS, SSH and ocean currents
        provide the initial information.
      </p>
    </div>


    <div className="pipeline-line"></div>


    {/* Step 2 */}
    <div className="pipeline-step">
      <div className="pipeline-icon">◈</div>

      <span className="pipeline-number">02</span>

      <h3>Ocean Embeddings</h3>

      <p>
        Surface observations are transformed into meaningful
        feature representations.
      </p>
    </div>


    <div className="pipeline-line"></div>


    {/* Step 3 */}
    <div className="pipeline-step">
      <div className="pipeline-icon">🧠</div>

      <span className="pipeline-number">03</span>

      <h3>Deep Learning</h3>

      <p>
        A trained neural network learns the relationship between
        surface conditions and subsurface temperature.
      </p>
    </div>


    <div className="pipeline-line"></div>


    {/* Step 4 */}
    <div className="pipeline-step">
      <div className="pipeline-icon">🌊</div>

      <span className="pipeline-number">04</span>

      <h3>Temperature Profile</h3>

      <p>
        The model reconstructs temperature across multiple
        depths beneath the ocean surface.
      </p>
    </div>

  </div>

</section>


{/* ================= NEW: WHY OCEANEMBED ================= */}

<section className="why-oceanembed">

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
          Estimate subsurface ocean conditions from
          remotely observable surface parameters.
        </p>
      </div>

    </div>


    <div className="feature-box">

      <div className="feature-icon">⌁</div>

      <div>
        <span className="feature-tag">AI-POWERED</span>

        <h3>Deep Learning Reconstruction</h3>

        <p>
          Learn complex relationships between surface
          observations and subsurface temperature.
        </p>
      </div>

    </div>


    <div className="feature-box">

      <div className="feature-icon">↕</div>

      <div>
        <span className="feature-tag">DEPTH-AWARE</span>

        <h3>Multi-Depth Prediction</h3>

        <p>
          Generate temperature estimates across
          different depths of the ocean.
        </p>
      </div>

    </div>


    <div className="feature-box">

      <div className="feature-icon">⌁</div>

      <div>
        <span className="feature-tag">INTERACTIVE</span>

        <h3>Visual Ocean Analysis</h3>

        <p>
          Explore reconstructed temperature profiles
          through an intuitive visualization interface.
        </p>
      </div>

    </div>

  </div>

</section>


{/* ================= NEW: TECHNOLOGY STACK ================= */}

<section className="about-tech">

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

      </section>

    </main>
  );
};

export default About;