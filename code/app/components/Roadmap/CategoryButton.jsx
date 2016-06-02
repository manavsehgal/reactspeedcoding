import React, { PropTypes } from 'react';
import { CategoryFilters } from '../../actions/roadmap';
import IconSvg from '../IconSvg.jsx';
import ICONS from '../../fixtures/icons.js';

const CategoryButton = ({ selected, filter, onClick }) => {
  let renderCategoryClass = '';
  let renderCategoryIcon = '';

  switch (filter) {
  case CategoryFilters.SHOW_APPS:
    renderCategoryClass = 'primary';
    renderCategoryIcon = ICONS.CLOUD;
    break;
  case CategoryFilters.SHOW_COMPONENTS:
    renderCategoryClass = 'default';
    renderCategoryIcon = ICONS.COMPONENTS;
    break;
  case CategoryFilters.SHOW_CHAPTERS:
    renderCategoryClass = 'secondary';
    renderCategoryIcon = ICONS.BOOK;
    break;
  default:
    renderCategoryClass = 'golden';
    renderCategoryIcon = ICONS.STAR;
  }
  if (selected) {
    return (
      <button className={`disabled button ${renderCategoryClass} medium category-button`}>
        <IconSvg icon={renderCategoryIcon} size={20} color="white-text" />
      </button>
    );
  }
  return (
    <button
      className={`button ${renderCategoryClass} medium category-button`}
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      <IconSvg icon={renderCategoryIcon} size={20} color="white-text" />
    </button>
  );
};

CategoryButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CategoryButton;
