import { connect } from 'react-redux';
import * as actions from '../../actions/roadmap';
import FeatureList from './FeatureList';

const getVisibleFeatures = (features, filter, search) => {
  let searchedFeatures = features;
  if (search) {
    searchedFeatures = features
      .filter(
        f => `${f.title} ${f.about}`
          .toLowerCase().includes(search.toLowerCase())
      );
  }

  switch (filter) {
  case actions.CategoryFilters.SHOW_ALL:
    return searchedFeatures;
  case actions.CategoryFilters.SHOW_APPS:
    return searchedFeatures.filter(f => f.category === actions.Categories.APP);
  case actions.CategoryFilters.SHOW_COMPONENTS:
    return searchedFeatures.filter(f => f.category === actions.Categories.COMPONENT);
  case actions.CategoryFilters.SHOW_CHAPTERS:
    return searchedFeatures.filter(f => f.category === actions.Categories.CHAPTER);
  default:
    return searchedFeatures;
  }
};

const mapStateToProps = (state) => ({
  features: getVisibleFeatures(state.features, state.categoryFilter, state.searchText)
});

const mapDispatchToProps = (dispatch) => ({
  onClickLikes: (id) => {
    dispatch(actions.likeFeature(id));
  }
});

const VisibleFeatureList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureList);

export default VisibleFeatureList;
