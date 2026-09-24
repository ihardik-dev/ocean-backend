import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./landing.css";

export default function App() {
  const getInitialView = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      if (path.includes("dashboard")) return "dashboard";
    }
    return "landing";
  };

  const [view, setView] = useState(getInitialView);

  const navigateTo = (newView) => {
    setView(newView);
    if (typeof window !== "undefined") {
      const url = newView === "dashboard" ? "/dashboard" : "/";
      window.history.pushState({ view: newView }, "", url);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      setView(path.includes("dashboard") ? "dashboard" : "landing");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="app-root">
      <Navbar currentView={view} onNavigate={navigateTo} />
      {view === "landing" ? (
        <LandingPage onLaunchDashboard={() => navigateTo("dashboard")} />
      ) : (
        <Dashboard onBackToHome={() => navigateTo("landing")} />
      )}
    </div>
  );
}
