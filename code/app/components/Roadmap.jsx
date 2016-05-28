import React from 'react';

import Card from './Card.jsx';
import IconText from './IconText.jsx';

const Roadmap = () => {
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
            <i className="fa fa-cubes"></i> Component
          </button>
          <button className="button primary medium category-filter">
            <i className="fa fa-cloud"></i> App
          </button>
          <button className="button secondary medium category-filter">
            <i className="fa fa-book"></i> Chapter
          </button>
        </Card>
      </div>
      <div className="feature-list">
        <div className={`${gridClass} feature`}>
          <Card slim message>
            <IconText
              className="success-text feature-likes"
              icon="heart"
              size="2x"
              text="21 likes"
              slim
            />
          </Card>
          <Card className="u-large-2of3 u-med-full u-small-full" slim message>
            <div className="feature-detail">
              <b>Feature title here!</b><br />
              Details spilling to next line here.
            </div>
          </Card>
          <Card slim>
            <div className="badge secondary medium feature-category">
              <i className="fa fa-book"></i>
            </div>
          </Card>
        </div>

        <div className={`${gridClass} feature`}>
          <Card slim message>
            <IconText
              className="warning-text feature-likes"
              icon="heart"
              size="2x"
              text="1 like"
              slim
            />
          </Card>
          <Card className="u-large-2of3 u-med-full u-small-full" slim message>
            <div className="feature-detail">
              <b>Feature two title here!</b><br />
              More details spilling to next line here.
            </div>
          </Card>
          <Card slim>
            <div className="badge default medium feature-category">
              <i className="fa fa-cubes"></i>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
