import React, { PropTypes } from 'react';
import { CategoryFilters } from '../../actions/roadmap';

const CategoryButton = ({ selected, filter, onClick }) => {
  let renderCategoryClass = '';
  let renderCategoryIcon = '';

  switch (filter) {
  case CategoryFilters.SHOW_APPS:
    renderCategoryClass = 'primary';
    renderCategoryIcon = 'cloud';
    break;
  case CategoryFilters.SHOW_COMPONENTS:
    renderCategoryClass = 'default';
    renderCategoryIcon = 'cubes';
    break;
  case CategoryFilters.SHOW_CHAPTERS:
    renderCategoryClass = 'secondary';
    renderCategoryIcon = 'book';
    break;
  default:
    renderCategoryClass = 'golden';
    renderCategoryIcon = 'star';
  }
  if (selected) {
    return (
      <button className={`disabled button ${renderCategoryClass} medium category-button`}>
        <i className={`fa fa-${renderCategoryIcon}`}></i>
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
      <i className={`fa fa-${renderCategoryIcon}`}></i>
    </button>
  );
};

CategoryButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CategoryButton;
