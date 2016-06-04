import { connect } from 'react-redux';
import { setCategoryFilter } from '../../actions/roadmap';
import CategoryButton from './CategoryButton';

const mapStateToProps = (state, ownProps) => ({
  selected: ownProps.filter === state.categoryFilter,
  filter: ownProps.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setCategoryFilter(ownProps.filter));
  }
});

const FilterCategoryButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryButton);

export default FilterCategoryButton;
