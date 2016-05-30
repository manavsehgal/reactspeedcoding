import React from 'react';
import { connect } from 'react-redux';
import { setSearchText } from '../../actions/roadmap';

let SearchFeature = ({ dispatch }) => ( // eslint-disable-line no-mutable-exports
  <div className="input slim feature-search">
    <span className="input-label">Search</span>
    <input
      onChange={e => {
        e.preventDefault();
        dispatch(setSearchText(e.target.value.trim()));
      }}
      className="input-field"
      placeholder="Enter feature name"
    />
  </div>
);
SearchFeature = connect()(SearchFeature);

export default SearchFeature;
