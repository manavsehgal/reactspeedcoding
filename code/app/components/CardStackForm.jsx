import React from 'react';

import Card from './Card.jsx';

function CardStackForm() {
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
            <button className="button success"><i className="fa fa-search"></i></button>
            <input className="input-field" placeholder="Search something" />
          </div>
          <div className="input">
            <span className="input-label"><span className="fa fa-envelope"></span></span>
            <input className="input-field" placeholder="Send a message" />
            <button className="button warning">Send</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CardStackForm;
