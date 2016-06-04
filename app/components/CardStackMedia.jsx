import React from 'react';

import Card from './Card.jsx';
import YouTube from './YouTube.jsx';

function CardStackMedia() {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter';
  return (
    <div>
      <h1>Media Components</h1>

      <div className={gridClass}>
        <Card><YouTube videoid="MGuKhcnrqGA" /></Card>
        <Card><YouTube videoid="RJf2jYzs8A" /></Card>
      </div>
      <div className={gridClass}>
        <Card><YouTube videoid="feUYwoLhE_4" /></Card>
        <Card><YouTube videoid="WIqbzHdEPVM" /></Card>
      </div>

    </div>
  );
}

export default CardStackMedia;
