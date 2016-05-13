import React from 'react';

import Card from './Card.jsx';

import IconText from './IconText.jsx';

function CardStackInfo() {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter';
  return (
    <div>
      <h1>Infographics Components</h1>

      <div className={gridClass}>
        <Card>
          <IconText
            className="warning-text"
            icon="database"
            size="4x"
            text="Firebase React Integration"
          />
        </Card>
        <Card>
          <IconText
            className="secondary-text"
            icon="cloud"
            size="4x"
            text="Production Ready Demos"
          />
        </Card>
        <Card>
          <IconText
            className="primary-text"
            icon="globe"
            size="4x"
            text="Nine Component Creation Strategies"
          />
        </Card>
      </div>
      <div className={gridClass}>
        <Card>
          <IconText
            className="primary-text"
            icon="github"
            size="4x"
            text="Popular GitHub Repository"
          />
        </Card>
        <Card>
          <IconText
            className="warning-text"
            icon="css3"
            size="4x"
            text="ReactSpeed UI is efficient, CSS 4.6KB Gzip, 21KB Minified"
          />
        </Card>
        <Card>
          <IconText
            className="success-text"
            icon="cubes"
            size="4x"
            text="Powerful Webpack Workflow"
          />
        </Card>
      </div>

    </div>
  );
}

export default CardStackInfo;
