// imports code...

describe('<Roadmap />', () => {
  it('should create one .roadmap component', () => {
    const wrapper = shallow(<Roadmap />);
    expect(wrapper.is('.roadmap')).to.equal(true);
  });

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
    it('should create one .feature-list component', () => {
      const wrapper = render(<Roadmap />);
      expect(wrapper.find('.feature-list')).to.have.length(1);
    });
    it('should create N .feature components', () => {
      const wrapper = render(<Roadmap />);
      expect(wrapper.find('.feature')).to.have.length.above(2);
    });

    describe('<Feature />', () => {
      it('should create at least one .feature component', () => {
        const wrapper = render(<Roadmap />);
        expect(wrapper.find('.feature')).to.have.length.above(1);
      });
      describe('Feature Category', () => {
        it('should create at least one .feature-category control', () => {
          const wrapper = render(<Roadmap />);
          expect(wrapper.find('.feature-category')).to.have.length.above(1);
        });
      });

      describe('Feature Likes', () => {
        it('should create at least one .feature-likes control', () => {
          const wrapper = render(<Roadmap />);
          expect(wrapper.find('.feature-likes')).to.have.length.above(1);
        });
      });

      describe('Feature Detail', () => {
        it('should create at least one .feature-detail control', () => {
          const wrapper = render(<Roadmap />);
          expect(wrapper.find('.feature-detail')).to.have.length.above(1);
        });
      });
    });
  });
});

// other test code...
