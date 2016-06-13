import React from 'react';

import Card from '../Card.jsx';
import VisibleFeatureList from './VisibleFeatureList';
import FilterCategoryButton from './FilterCategoryButton';
import { CategoryFilters } from '../../actions/roadmap';

const Roadmap = () => {
  const gridClass = 'grid grid-full grid-flex-cells large-grid-fit';
  return (
    <div className="roadmap">
      <h1>Roadmap</h1>
      <p className="default-text">Note: This app is work-in-progress.</p>
      <div className={`${gridClass} search-filter`}>
        <Card slim>
          <div className="input slim feature-search">
            <span className="input-label">Search</span>
            <input className="input-field" placeholder="Enter feature name" />
          </div>
        </Card>
        <Card slim>
          <FilterCategoryButton filter={CategoryFilters.SHOW_ALL} />
          <FilterCategoryButton filter={CategoryFilters.SHOW_APPS} />
          <FilterCategoryButton filter={CategoryFilters.SHOW_CHAPTERS} />
          <FilterCategoryButton filter={CategoryFilters.SHOW_COMPONENTS} />
        </Card>
      </div>
      <VisibleFeatureList />
    </div>
  );
};

export default Roadmap;
