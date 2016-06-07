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
      <IconSvg icon={ICONS.FORM} className="sidenav-link" text="Forms" slim />
    </NavLink>
    <NavLink className="sidenav-link" to="/buttons">
      <IconSvg icon={ICONS.POINT_UP} className="sidenav-link" text="Buttons" slim />
    </NavLink>
    <NavLink className="sidenav-link" to="/media">
      <IconSvg icon={ICONS.VIDEO} className="sidenav-link" text="Media" slim />
    </NavLink>
    <NavLink className="sidenav-link" to="/infographics">
      <IconSvg icon={ICONS.EYE} className="sidenav-link" text="Infographics" slim />
    </NavLink>
    <NavLink className="sidenav-link" to="/ajax">
      <IconSvg icon={ICONS.CLOUD_DOWN} className="sidenav-link" text="AJAX" slim />
    </NavLink>
    <NavLink className="sidenav-link" to="/custom">
      <IconSvg icon={ICONS.GLOBE} className="sidenav-link" text="Custom" slim />
    </NavLink>
  </ul>
);

export default NavigationSidebar;
