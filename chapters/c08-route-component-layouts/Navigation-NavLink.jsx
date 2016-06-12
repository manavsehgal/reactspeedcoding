import React, { PropTypes } from 'react';
import NavLink from './NavLink.jsx';

class Navigation extends React.Component {
  render () {
    return (
      <ul
        className={`navigation grid grid-gutters
          large-grid-fit med-grid-fit small-grid-1of2`}
      >
        <NavLink to="/" brand>ReactSpeed</NavLink>
        <NavLink href="https://leanpub.com/reactspeedcoding">
          <i className="fa fa-book"></i> Book
        </NavLink>
        <NavLink href="https://github.com/manavsehgal/reactspeedcoding">
          <i className="fa fa-github"></i> Code
        </NavLink>
        <NavLink to="/blog">
          <i className="fa fa-comments"></i> Blog
        </NavLink>
      </ul>
    );
  }
}

export default Navigation;
