import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="ocean-footer">

      {/* Top technical line */}
      <div className="footer-line">
        <span></span>
        <p>OCEAN EMBED / DEEP OCEAN INTELLIGENCE SYSTEM</p>
        <span></span>
      </div>

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            OCEAN<span>EMBED</span>
          </Link>

          <p>
            Satellite embedding-based deep learning framework
            for reconstruction of subsurface ocean temperature.
          </p>

          <div className="system-status">
            <span className="status-dot"></span>
            SYSTEM ONLINE
          </div>
        </div>


        {/* Navigation */}
        <div className="footer-column">
          <h4>NAVIGATION</h4>

          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/results">Results</Link>
          <Link to="/about">About</Link>
        </div>


        {/* Technology */}
        <div className="footer-column">
          <h4>TECHNOLOGY</h4>

          <span>Satellite Observations</span>
          <span>Deep Learning</span>
          <span>Ocean Embeddings</span>
          <span>Temperature Reconstruction</span>
        </div>


        {/* Project info */}
        <div className="footer-column">
          <h4>PROJECT</h4>

          <span>Smart India Hackathon</span>
          <span>Ocean Intelligence</span>
          <span>Research Framework</span>

          <div className="coordinates">
            <span>LAT</span>
            <strong>15.000°</strong>

            <span>LON</span>
            <strong>75.000°</strong>
          </div>
        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © 2026 OceanEmbed. Built for ocean intelligence.
        </p>

        <div className="footer-meta">
          <span>v1.0</span>
          <span>•</span>
          <span>AI / SATELLITE / OCEAN</span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;

