import React from 'react';

import Card from './Card.jsx';
import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';

const CardStackForm = () => {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter';
  return (
    <div>
      <h1>Form Controls</h1>
      <div className={gridClass}>
        <Card>
          <p>Responsive forms</p>
          <div className="input">
            <span className="input-label">Name</span>
            <input className="input-field" placeholder="Placeholder for name" />
          </div>
          <div className="input">
            <input className="input-field" placeholder="Just a field" />
          </div>
        </Card>
        <Card>
          <p>Beautiful forms</p>
          <div className="input">
            <button className="button success">
              <IconSvg icon={ICONS.SEARCH} color="white-text" />
            </button>
            <input className="input-field" placeholder="Search something" />
          </div>
          <div className="input">
            <span className="input-label">
              <IconSvg icon={ICONS.ENVELOPE} color="default-text" />
            </span>
            <input className="input-field" placeholder="Send a message" />
            <button className="button warning">Send</button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CardStackForm;
