import React from "react";
import { Link } from "react-router-dom";

import Footer from "../components/footer.jsx";
const Home = () => {
  return (
    <main>

      <section className="hero">

        <div className="hero-content">

          <span className="badge">
            AI-POWERED OCEAN ANALYSIS
          </span>

          <h1>
            Reconstructing the
            <span> Ocean Beneath the Surface</span>
          </h1>

          <p>
            OceanEmbed uses satellite-derived surface
            observations and deep learning to estimate
            subsurface ocean temperature.
          </p>

          <div className="hero-buttons">

            <Link
              to="/dashboard"
              className="primary-button"
            >
              Launch Dashboard →
            </Link>

            <Link
              to="/about"
              className="secondary-button"
            >
              Learn More
            </Link>

          </div>

        </div>

      <div className="hero-visual">
 
</div>

      </section>


      <section className="workflow">

        <div className="section-heading center">
          <h2>How OceanEmbed Works</h2>

          <p>
            From surface observations to subsurface
            temperature reconstruction
          </p>
        </div>


        <div className="workflow-grid">

          <div className="workflow-card">
            <span>01</span>
            <h3>Satellite Observations</h3>
            <p>
              Surface ocean parameters provide
              information about the ocean state.
            </p>
          </div>

          <div className="workflow-card">
            <span>02</span>
            <h3>Deep Learning</h3>
            <p>
              OceanEmbed processes the surface
              observations through a trained neural model.
            </p>
          </div>

          <div className="workflow-card">
            <span>03</span>
            <h3>Temperature Reconstruction</h3>
            <p>
              The model estimates temperature across
              different subsurface depths.
            </p>
          </div>

        </div>

      </section>
      
        
      <Footer/>

    </main>
  );
};

export default Home;