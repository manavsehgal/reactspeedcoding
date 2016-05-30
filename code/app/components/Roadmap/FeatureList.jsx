import React, { PropTypes } from 'react';
import Feature from './Feature';

const FeatureList = ({ features, onClickLikes }) => (
  <div className="feature-list">
    {features.map(feature =>
      <Feature
        key={feature.id}
        {...feature}
        onClickLikes={() => onClickLikes(feature.id)}
      />
    )}
  </div>
);

FeatureList.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onClickLikes: PropTypes.func.isRequired
};

export default FeatureList;
