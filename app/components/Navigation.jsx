import React from 'react';
import NavLink from './NavLink.jsx';

const Navigation = () => (
  <ul className="navigation grid grid-gutters large-grid-fit med-grid-fit small-grid-1of2">
    <NavLink className="navigation-link" to="/" brand>ReactSpeed</NavLink>
    <NavLink className="navigation-link" href="https://leanpub.com/reactspeedcoding">
      Book
    </NavLink>
    <NavLink className="navigation-link" to="/roadmap">
      Roadmap
    </NavLink>
    <NavLink className="navigation-link" to="/components">
      Components
    </NavLink>
    <NavLink className="navigation-link" to="/news">
      News
    </NavLink>
  </ul>
);

export default Navigation;
