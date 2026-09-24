import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Results from "./pages/Results.jsx";
import About from "./pages/About.jsx";

import { OceanProvider } from "./context/OceanContext.jsx";

function App() {
  return (
    <BrowserRouter>

      <OceanProvider>

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/results"
            element={<Results />}
          />

          <Route
            path="/about"
            element={<About />}
          />

        </Routes>

      </OceanProvider>

    </BrowserRouter>
  );
}

export default App;