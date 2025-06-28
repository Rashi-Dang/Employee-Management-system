import React, { useState } from 'react';
import './Navbar.css'; // External CSS for styling
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo"><a href="/">EasyCRUD</a></div>
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/home">View Dashboard</a></li>
          <li><a href="/form">Post New User</a></li>
          <li><Link to="/payroll">Payroll</Link></li> {/* Add link to Payroll page */}
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
};

export default Navbar;
