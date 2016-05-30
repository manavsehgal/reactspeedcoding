import { connect } from 'react-redux';
import * as actions from '../../actions/roadmap';
import FeatureList from './FeatureList';

const getVisibleFeatures = (features, filter) => {
  switch (filter) {
  case actions.CategoryFilters.SHOW_ALL:
    return features;
  case actions.CategoryFilters.SHOW_APPS:
    return features.filter(f => f.category === actions.Categories.APP);
  case actions.CategoryFilters.SHOW_COMPONENTS:
    return features.filter(f => f.category === actions.Categories.COMPONENT);
  case actions.CategoryFilters.SHOW_CHAPTERS:
    return features.filter(f => f.category === actions.Categories.CHAPTER);
  default:
    return features;
  }
};

const mapStateToProps = (state) => ({
  features: getVisibleFeatures(state.features, state.categoryFilter)
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
