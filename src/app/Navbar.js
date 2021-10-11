import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__content">
        <NavLink
          to="/"
          className="navbar__link"
          activeClassName="navbar__link--selected"
          exact
        >
          <i className="fas fa-home" />
        </NavLink>
        <NavLink
          to="/wishlist"
          className="navbar__link"
          activeClassName="navbar__link--selected"
          strict
        >
          <i className="fas fa-gift" />
        </NavLink>
        <NavLink
          to="/library"
          className="navbar__link"
          activeClassName="navbar__link--selected"
          strict
        >
          <i className="fas fa-layer-group" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
