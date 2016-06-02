import React from 'react';

import Card from './Card.jsx';
import ButtonDemo from './ButtonDemo.jsx';
import ICONS from '../fixtures/icons.js';

function CardStackButton() {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter';
  return (
    <div>
      <h1>Button Controls</h1>
      <div className={gridClass}>
        <Card>
          <ButtonDemo
            colors={['Golden', 'Success', 'Danger', 'Warning']}
            sizes={['medium', 'medium', 'medium', 'medium']}
            icons={[ICONS.CLOUD, ICONS.BOOK, ICONS.STAR, ICONS.GLOBE]}
            iconOnly
          />
        </Card>
        <Card>
          <ButtonDemo
            colors={['Primary', 'Success', 'Danger', 'Secondary']}
            sizes={['large', 'medium', 'medium', 'small']}
            icons={[ICONS.NEWS, ICONS.LINE_CHART, ICONS.BUG, ICONS.ROAD]}
          />
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
          <button className="button golden">Golden</button>
        </Card>
      </div>
    </div>
  );
}

export default CardStackButton;
