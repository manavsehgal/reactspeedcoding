import React from 'react';
import NavLink from './NavLink.jsx';
import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';

const NavigationSidebar = () => (
  <ul className="sidenav grid grid-gutters large-grid-full">
    <NavLink className="sidenav-link" to="/roadmap">
      <IconSvg icon={ICONS.ROAD} className="sidenav-link" text="Roadmap" slim />
    </NavLink>
    <NavLink className="sidenav-link" to="/forms">
      <i className="fa fa-list-alt"></i> Forms
    </NavLink>
    <NavLink className="sidenav-link" to="/buttons">
      <i className="fa fa-hand-pointer-o"></i> Buttons
    </NavLink>
    <NavLink className="sidenav-link" to="/media">
      <i className="fa fa-youtube-play"></i> Media
    </NavLink>
    <NavLink className="sidenav-link" to="/infographics">
      <i className="fa fa-eye"></i> Infographics
    </NavLink>
    <NavLink className="sidenav-link" to="/ajax">
      <i className="fa fa-cloud-download"></i> AJAX
    </NavLink>
  </ul>
);

export default NavigationSidebar;
