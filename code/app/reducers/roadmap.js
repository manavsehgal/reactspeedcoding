import * as actions from '../actions/roadmap';

export function categoryFilter(state = actions.CategoryFilters.SHOW_ALL, action) {
  switch (action.type) {
  case actions.SET_CATEGORY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

export function searchText(state = '', action) {
  switch (action.type) {
  case actions.SEARCH_TEXT:
    return action.text;
  default:
    return state;
  }
}

export function features(state = [], action) {
  switch (action.type) {
  case actions.LIKE_FEATURE:
    return state.map((feature, id) => {
      if (id === action.id - 1) {
        return { ...feature, likes: feature.likes + 1 };
      }
      return feature;
    });
  case actions.ADD_FEATURE:
    return [...state, {
      id: action.id,
      title: action.title,
      about: action.about,
      category: action.category,
      likes: action.likes,
      link: action.link
    }];
  default:
    return state;
  }
}
