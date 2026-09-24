import React from "react";

export default function Navbar({ currentView, onNavigate }) {
  return (
    <nav className="navbar">
      <button
        type="button"
        className="logo"
        onClick={() => onNavigate && onNavigate("landing")}
      >
        OceanEmbed
      </button>

      <div className="nav-links">
        <button
          type="button"
          className={`nav-link-btn ${currentView === "landing" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("landing")}
        >
          Home
        </button>
        <button
          type="button"
          className={`nav-link-btn ${currentView === "dashboard" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("dashboard")}
        >
          Dashboard
        </button>
        <button
          type="button"
          className="nav-launch-btn"
          onClick={() => onNavigate && onNavigate("dashboard")}
        >
          Launch Dashboard →
        </button>
      </div>
    </nav>
  );
}
