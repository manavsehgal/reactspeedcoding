import React, { PropTypes } from 'react';
import Card from '../Card.jsx';
import IconSvg from '../IconSvg.jsx';
import ICONS from '../../fixtures/icons.js';
import { Categories } from '../../actions/roadmap';

const Feature = ({
  onClickLikes,
  title,
  about,
  category,
  likes,
  link }) => {
  const gridClass = 'grid grid-full grid-flex-cells large-grid-fit';
  let renderCategory = '';
  switch (category) {
  case Categories.COMPONENT:
    renderCategory = (
      <div className="badge default medium feature-category">
        <IconSvg icon={ICONS.COMPONENTS} size={30} color="default-text" />
      </div>
    );
    break;
  case Categories.APP:
    renderCategory = (
      <div className="badge primary medium feature-category">
        <IconSvg icon={ICONS.CLOUD} size={30} color="primary-text" />
      </div>
    );
    break;
  case Categories.CHAPTER:
    renderCategory = (
      <div className="badge secondary medium feature-category">
        <IconSvg icon={ICONS.BOOK} size={30} color="secondary-text" />
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
        <IconSvg
          icon={ICONS.HEART}
          size={20}
          color={renderLikesClass}
          text={`${likes} likes`}
          slim
        />
      </Card>
      <Card
        className="u-large-2of3 u-med-full u-small-full"
        slim
      >
        <div className="feature-detail">
          <b><a href={link}>{title}</a></b><br />
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
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired
};

export default Feature;
