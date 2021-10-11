import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const currentPathname = useLocation();
  console.log(currentPathname);

  // const homePath = "/";
  // const wishlistPath = "/wishlist";
  // const libraryPath = "/library"

  // const selectStylingClasses = (path) => {
  //   if(path === currentPathname) {
  //     return "navbar__link navbar__link--selected";
  //   }

  //   return "navbar__link"
  // }

  return (
    <nav className="navbar">
      <div className="navbar__content">
        <Link to="/" className="navbar__link navbar__link--selected">
          <i className="fas fa-home" />
        </Link>
        <Link to="/wishlist" className="navbar__link">
          <i className="fas fa-gift" />
        </Link>
        <Link to="/library" className="navbar__link">
          <i className="fas fa-layer-group" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
