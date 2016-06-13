import * as actions from '../actions/roadmap';

const initialState = {
  searchText: '',
  categoryFilter: actions.CategoryFilters.SHOW_ALL,
  features: []
};

export default function roadmapApp(state = initialState, action) {
  switch (action.type) {
  case actions.LIKE_FEATURE:
    return { ...state,
      features: state.features.map((feature, index) => {
        if (index === action.index) {
          return { ...feature, likes: feature.likes + 1 };
        }
        return feature;
      })
    };
  case actions.SEARCH_TEXT:
    return { ...state, searchText: action.text };
  case actions.SET_CATEGORY_FILTER:
    return { ...state, categoryFilter: action.filter };
  case actions.ADD_FEATURE:
    return { ...state, features: [...state.features,
        { title: action.title, category: action.category, likes: 0 }] };
  default:
    return state;
  }
}
