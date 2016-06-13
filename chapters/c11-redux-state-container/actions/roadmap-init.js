/*
 * action types
 */

export const ADD_FEATURE = 'ADD_TODO';
export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export const LIKE_FEATURE = 'LIKE_FEATURE';
export const SEARCH_TEXT = 'SEARCH_TEXT';
/*
 * other constants
 */

export const CategoryFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPONENTS: 'SHOW_COMPONENTS',
  SHOW_CHAPTERS: 'SHOW_CHAPTERS'
};

export const Categories = {
  CHAPTER: 'CHAPTER',
  COMPONENT: 'COMPONENT',
  APP: 'APP'
};

/*
 * action creators
 */

export function addFeature(title, category) {
  return {
    type: ADD_FEATURE,
    category,
    title };
}

export function setCategoryFilter(filter) {
  return { type: SET_CATEGORY_FILTER, filter };
}

export function setSearchText(text) {
  return { type: SEARCH_TEXT, text };
}

export function likeFeature(index) {
  return { type: LIKE_FEATURE, index };
}
