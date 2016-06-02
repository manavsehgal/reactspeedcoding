import React from 'react';
import NavLink from './NavLink.jsx';
import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';

const Navigation = () => (
  <ul className="navigation grid grid-gutters large-grid-fit med-grid-fit small-grid-1of2">
    <NavLink className="navigation-link" to="/" brand>ReactSpeed</NavLink>
    <NavLink className="navigation-link" href="https://leanpub.com/reactspeedcoding">
      <i className="fa fa-book"></i> Book
    </NavLink>
    <NavLink className="navigation-link" href="https://github.com/manavsehgal/reactspeedcoding">
      <IconSvg icon={ICONS.GITHUB} className="navigation-link" text="Code" slim />
    </NavLink>
    <NavLink className="navigation-link" href="https://medium.com/reactspeed">
      <IconSvg icon={ICONS.COMMENTS} className="navigation-link" text="Blog" slim />
    </NavLink>
    <NavLink className="navigation-link" to="/blog">
      <i className="fa fa-newspaper-o"></i> News
    </NavLink>
  </ul>
);

export default Navigation;
