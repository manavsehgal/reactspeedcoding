import React from 'react';

import Card from '../Card.jsx';
import features from '../../fixtures/roadmap/features';
import FeatureList from './FeatureList';

const Roadmap = () => {
  const featureClick = (id) => {
    // to be implemented
    console.log(`featureClick id = ${id}`);
  };

  const likesClick = (id) => {
    // to be implemented
    console.log(`likesClick id = ${id}`);
  };

  const gridClass = 'grid grid-full grid-flex-cells large-grid-fit';
  return (
    <div className="roadmap">
      <h1>Roadmap</h1>
      <div className={`${gridClass} search-filter`}>
        <Card slim>
          <div className="input slim feature-search">
            <span className="input-label">Search</span>
            <input className="input-field" placeholder="Enter feature name" />
          </div>
        </Card>
        <Card slim>
          <button className="button default medium category-filter">
            <i className="fa fa-cubes"></i>
          </button>
          <button className="button primary medium category-filter">
            <i className="fa fa-cloud"></i>
          </button>
          <button className="button secondary medium category-filter">
            <i className="fa fa-book"></i>
          </button>
        </Card>
      </div>
      <FeatureList
        features={features}
        onClickFeature={featureClick}
        onClickLikes={likesClick}
      />
    </div>
  );
};

export default Roadmap;
