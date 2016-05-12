import React from 'react';

import Card from './Card.jsx';

import GitHub from './GitHub.jsx';

function CardStackAjax() {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter';
  return (
    <div>
      <h1>AJAX Components</h1>

      <div className={gridClass}>
        <Card><GitHub repo="facebook/react" /></Card>
        <Card><GitHub repo="reactjs/redux" /></Card>
      </div>

    </div>
  );
}

export default CardStackAjax;
