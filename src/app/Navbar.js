import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-links">
          <Link to="/">
            <i className="fas fa-home" />
          </Link>
          <Link to="/wishlist">
            <i className="fas fa-gifts" />
          </Link>
          <Link to="/library">
            <i className="fas fa-layer-group" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
