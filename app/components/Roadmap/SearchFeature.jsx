import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setSearchText } from '../../actions/roadmap';

let SearchFeature = ({ dispatch }) => ( // eslint-disable-line import/no-mutable-exports
  <div className="input slim feature-search">
    <span className="input-label">Search</span>
    <input
      onChange={e => {
        e.preventDefault();
        dispatch(setSearchText(e.target.value.trim()));
      }}
      className="input-field"
      placeholder="Feature name or description"
    />
  </div>
);
SearchFeature = connect()(SearchFeature);
SearchFeature.propTypes = {
  dispatch: PropTypes.func
};

export default SearchFeature;
