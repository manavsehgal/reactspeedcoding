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
  SHOW_CHAPTERS: 'SHOW_CHAPTERS',
  SHOW_APPS: 'SHOW_APPS'
};

export const Categories = {
  CHAPTER: 'CHAPTER',
  COMPONENT: 'COMPONENT',
  APP: 'APP'
};

/*
 * action creators
 */

export function addFeature(id, title, about, category, likes, link) {
  return {
    type: ADD_FEATURE,
    id,
    title,
    about,
    category,
    likes,
    link
  };
}

export function setCategoryFilter(filter) {
  return { type: SET_CATEGORY_FILTER, filter };
}

export function setSearchText(text) {
  return { type: SEARCH_TEXT, text };
}

export function likeFeature(id) {
  return { type: LIKE_FEATURE, id };
}
