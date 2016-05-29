import React, { PropTypes } from 'react';
import Card from '../Card.jsx';
import IconText from '../IconText.jsx';
import { Categories } from '../../actions/roadmap';

const Feature = ({
  onClickLikes,
  onClickFeature,
  title,
  about,
  category,
  likes }) => {
  const gridClass = 'grid grid-full grid-flex-cells large-grid-fit';
  let renderCategory = '';
  switch (category) {
  case Categories.COMPONENT:
    renderCategory = (
      <div className="badge default medium feature-category">
        <i className="fa fa-cubes"></i>
      </div>
    );
    break;
  case Categories.APP:
    renderCategory = (
      <div className="badge primary medium feature-category">
        <i className="fa fa-cloud"></i>
      </div>
    );
    break;
  case Categories.CHAPTER:
    renderCategory = (
      <div className="badge secondary medium feature-category">
        <i className="fa fa-book"></i>
      </div>
    );
    break;
  default:
    renderCategory = '';
  }

  const renderLikesClass = (likes > 10)
    ? 'success-text feature-likes' : 'warning-text feature-likes';

  return (
    <div className={`${gridClass} feature`}>
      <Card onClick={onClickLikes} slim message>
        <IconText
          className={renderLikesClass}
          icon="heart"
          size="2x"
          text={`${likes} likes`}
          slim
        />
      </Card>
      <Card
        onClick={onClickFeature}
        className="u-large-2of3 u-med-full u-small-full"
        slim
        message
      >
        <div className="feature-detail">
          <b>{title}</b><br />
          <small>{about}</small>
        </div>
      </Card>
      <Card slim>
        {renderCategory}
      </Card>
    </div>
  );
};

Feature.propTypes = {
  onClickLikes: PropTypes.func.isRequired,
  onClickFeature: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired
};

export default Feature;
