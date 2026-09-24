import React from 'react'
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
        <Link to="/" className="logo">
        OceanEmbed
      </Link>
       <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/about">About</Link>
      </div>
      
    </div>
  )
}

export default Navbar
