import React, { useState } from 'react';
import './nav.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/casino" className="nav-logo">Colonial Casino</a>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item"><a href="/Games" className="nav-link active">Games</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Clients</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Bets</a></li>
        </ul>
        <div className={`nav-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
