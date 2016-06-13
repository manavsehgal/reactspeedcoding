import { describe, it } from 'mocha';

describe('<Roadmap />', () => {
  it('should create one .roadmap component');

  describe('<SearchFilter />', () => {
    it('should create one .search-filter component');

    describe('<FeatureSearch />', () => {
      it('should create one .feature-search component');
      it('should initialize default value for searchText');
      it('should execute enterSearch() when user presses Enter in search box');
      it('should update state tree after enterSearch() is called');
    });

    describe('<CategoryFilter />', () => {
      it('should create N .category-filter components');
      it('should execute selectFilter() when user selects a filter');
      it('should update state tree after selectFilter() is called');
    });
  });

  describe('<FeatureList />', () => {
    it('should create one .feature-list component');

    describe('<Feature />', () => {
      it('should create N .feature components');

      describe('<FeatureCategory />', () => {
        it('should create one .feature-category component per .feature');
      });

      describe('<FeatureLikes />', () => {
        it('should create one .feature-likes component per .feature');
      });

      describe('<FeatureTitle />', () => {
        it('should create one .feature-title component per .feature');
      });
    });
  });
});
