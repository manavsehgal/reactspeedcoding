import React from 'react';

import Card from './Card.jsx';

import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';

function CardStackInfo() {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter';
  return (
    <div>
      <h1>Infographics Components</h1>

      <div className={gridClass}>
        <Card>
          <IconSvg
            color="default-text"
            icon={ICONS.DATABASE}
            size={70}
            text="Firebase React Integration"
          />
        </Card>
        <Card>
          <IconSvg
            color="secondary-text"
            icon={ICONS.CLOUD}
            size={70}
            text="Production Ready Demos"
          />
        </Card>
        <Card>
          <IconSvg
            color="primary-text"
            icon={ICONS.GLOBE}
            size={70}
            text="Nine Component Creation Strategies"
          />
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
            color="warning-text"
            icon={ICONS.CSS}
            size={70}
            text="ReactSpeed UI is efficient, CSS 4.6KB Gzip, 21KB Minified"
          />
        </Card>
        <Card>
          <IconSvg
            color="success-text"
            icon={ICONS.COMPONENTS}
            size={70}
            text="Powerful Webpack Workflow"
          />
        </Card>
      </div>

    </div>
  );
}

export default CardStackInfo;
