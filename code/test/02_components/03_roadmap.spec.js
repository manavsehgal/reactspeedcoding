import { describe, it } from 'mocha';

describe('<Roadmap />', () => {
  it('should create one .roadmap component');

  describe('<SearchFilter />', () => {
    it('should create one .search-filter component');

    describe('<FeatureSearch />', () => {
      it('should create one .feature-search component');
    });

    describe('<CategoryFilter />', () => {
      it('should create N .category-filter components');
    });
  });

  describe('<FeatureList />', () => {
    it('should create one .feature-list component');

    describe('<Feature />', () => {
      it('should create N .feature components');

      describe('<Category />', () => {
        it('should create one .category component per .feature');
      });

      describe('<Likes />', () => {
        it('should create one .likes component per .feature');
      });

      describe('<FeatureDetail />', () => {
        it('should create one .feature-detail component per .feature');
      });
    });
  });
});
