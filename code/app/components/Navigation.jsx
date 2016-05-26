import React from 'react';
import NavLink from './NavLink.jsx';

const Navigation = () => (
  <ul className="navigation grid grid-gutters large-grid-fit med-grid-fit small-grid-1of2">
    <NavLink className="navigation-link" to="/" brand>ReactSpeed</NavLink>
    <NavLink className="navigation-link" href="https://leanpub.com/reactspeedcoding">
      <i className="fa fa-book"></i> Book
    </NavLink>
    <NavLink className="navigation-link" href="https://github.com/manavsehgal/reactspeedcoding">
      <i className="fa fa-github"></i> Code
    </NavLink>
    <NavLink className="navigation-link" to="/blog">
      <i className="fa fa-comments"></i> Blog
    </NavLink>
  </ul>
);

export default Navigation;
