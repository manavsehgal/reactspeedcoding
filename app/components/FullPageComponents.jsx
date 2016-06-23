import React from 'react';

import Card from './Card.jsx';

import World from './World.jsx';
import NavLink from './NavLink.jsx';

import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';

export default function FullPageComponents() {
  const gridClass = `stripe grid grid-gutters grid-full
    grid-flex-cells large-grid-fit u-textCenter`;

  return (
    <div>
      <div className={gridClass}>
        <Card>
          <IconSvg
            color="default-text"
            icon={ICONS.CLOUD_DOWN}
            size={50}
            text="AJAX components demo jQuery and React integration"
          />
          <br />
          <NavLink className="button default" to="/ajax">
            AJAX components
          </NavLink>
          <p className="stripe-call-to-action">AJAX component demos</p>
        </Card>
        <Card>
          <IconSvg
            color="secondary-text"
            icon={ICONS.LINE_CHART}
            size={50}
            text="Animated charting using D3 and vendor components"
          />
          <br />
          <NavLink className="button secondary" to="/charts">
            Chart components
          </NavLink>
          <p className="stripe-call-to-action">Chart component demos</p>
        </Card>
        <Card>
          <IconSvg
            color="primary-text"
            icon={ICONS.VIDEO}
            size={50}
            text="Media components embed YouTube using properties"
          />
          <br />
          <NavLink className="button primary" to="/media">
            Media components
          </NavLink>
          <p className="stripe-call-to-action">Media component demos</p>
        </Card>
      </div>
      <div className={`${gridClass} default-light-back`}>
        <Card blank shade="default" className="u-textCenter">
          <h1>Hello World React</h1>
          <p>
            The very first component you will develop using React Speed Coding book,
            will include automated Node, Webpack, and Babel development workflow setup.
          </p>
          <p>Read our <a href="https://medium.com/reactspeed/speed-start-react-es6-essentials-writing-your-first-react-app-cc7c329d72f0#.6lbk8gbhu">blog post</a> to sample content from the book.</p>
        </Card>
        <Card className="u-large-1of2 u-med-full u-small-full u-textCenter">
          <World />
          <br />
          <NavLink className="button primary" to="/custom">
            Custom components
          </NavLink>
          <p className="stripe-call-to-action">Custom component demos</p>
        </Card>
      </div>
      <div className={gridClass}>
        <Card>
          <p>Buttons</p>
          <button className="button default">Default</button>
          <button className="button primary">Primary</button>
          <button className="button secondary">Secondary</button>
          <button className="button danger">Danger</button>
          <button className="button success">Success</button>
          <button className="button warning">Warning</button>
          <br />
          <button className="button primary">
            <IconSvg icon={ICONS.LINE_CHART} color="white-text" />
          </button>
          <button className="button secondary">
            <IconSvg icon={ICONS.GLOBE} color="white-text" />
          </button>
          <button className="button default">
            <IconSvg icon={ICONS.CLOUD} color="white-text" />
          </button>
        </Card>
        <Card blank className="u-textCenter">
          <IconSvg
            color="default-text"
            icon={ICONS.POINT_UP}
            size={70}
            text="Learn to create theme based button controls combining CSS and SVG"
          />
          <br />
          <NavLink className="button secondary" to="/buttons">
            Button controls
          </NavLink>
          <p className="stripe-call-to-action">Button control demos</p>
        </Card>
      </div>

      <div className={`${gridClass} default-light-back`}>
        <Card blank shade="default" className="u-textCenter">
          <IconSvg
            color="primary-text"
            icon={ICONS.FORM}
            size={70}
            text="Form components include custom inputs controls"
          />
          <br />
          <NavLink className="button primary" to="/forms">
            Form controls
          </NavLink>
          <p className="stripe-call-to-action">Form control demos</p>
        </Card>
        <Card>
          <p>Beautiful forms</p>
          <div className="input">
            <button className="button success">
              <IconSvg
                icon={ICONS.SEARCH}
                color="white-text"
              />
            </button>
            <input
              className="input-field"
              placeholder="Search something"
            />
          </div>
          <div className="input">
            <span className="input-label">
              <IconSvg
                icon={ICONS.ENVELOPE}
                color="default-text"
              />
            </span>
            <input
              className="input-field"
              placeholder="Send a message"
            />
            <button className="button warning">Send</button>
          </div>
        </Card>
      </div>

      <div className={gridClass}>
        <Card>
          <IconSvg
            color="primary-text"
            icon={ICONS.GITHUB}
            size={70}
            text="Popular GitHub Repository"
          />
        </Card>
        <Card>
          <IconSvg
            color="default-text"
            icon={ICONS.EYE}
            size={50}
            text="Several variants of infographics components using SVG"
          />
          <br />
          <NavLink className="button default" to="/infographics">
            Infographics components
          </NavLink>
          <p className="stripe-call-to-action">Infographics component demos</p>
        </Card>
        <Card>
          <IconSvg
            color="secondary-text"
            icon={ICONS.CSS}
            size={70}
            text="ReactSpeed UI is efficient, CSS 4.6KB Gzip, 21KB Minified"
          />
        </Card>
      </div>
    </div>
  );
}
