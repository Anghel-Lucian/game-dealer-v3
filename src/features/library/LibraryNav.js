import React from 'react';
import { NavLink } from 'react-router-dom';

const LibraryNav = () => {
  return (
    <div className="library-nav">
      <ul className="library-nav__links">
        <NavLink
          to="/library/uncategorized"
          className="library-nav__link"
          activeClassName="library-nav__link--selected"
          exact
        >
          uncategorized
        </NavLink>
        <NavLink
          to="/library/finished"
          className="library-nav__link"
          activeClassName="library-nav__link--selected"
          exact
        >
          finished
        </NavLink>
        <NavLink
          to="/library/bought"
          className="library-nav__link"
          activeClassName="library-nav__link--selected"
          exact
        >
          bought
        </NavLink>
        <NavLink
          to="/library/dropped"
          className="library-nav__link"
          activeClassName="library-nav__link--selected"
          exact
        >
          dropped
        </NavLink>
      </ul>
    </div>
  );
};

export default LibraryNav;
