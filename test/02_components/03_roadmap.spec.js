import React from 'react';

import { describe, it } from 'mocha';
import { expect } from 'chai';
import store from '../../app/store/roadmap';
import { shallow, render } from 'enzyme';
import * as actions from '../../app/actions/roadmap';
import Roadmap from '../../app/components/Roadmap';
import { Provider } from 'react-redux';
import roadmapHydrate from '../../app/fixtures/roadmap/roadmapHydrate';
roadmapHydrate();

describe('<Roadmap />', () => {
  it('should create one .roadmap component', () => {
    const wrapper = shallow(<Roadmap />);
    expect(wrapper.is('.roadmap')).to.equal(true);
  });

  describe('<SearchFilter />', () => {
    it('should create one .search-filter component', () => {
      const wrapper = render(<Provider store={store}><Roadmap /></Provider>);
      expect(wrapper.find('.search-filter')).to.have.length(1);
    });

    describe('<SearchFeature />', () => {
      it('should create one .feature-search component', () => {
        const wrapper = render(<Provider store={store}><Roadmap /></Provider>);
        expect(wrapper.find('.feature-search')).to.have.length(1);
      });
      it('should initialize default value for searchText', () => {
        expect(store.getState().searchText)
          .to.equal('');
      });
      it('should execute onChange() when user presses key in search box');
      it('should update state tree after onChange() is called in search field');
    });

    describe('<CategoryFilter />', () => {
      it('should create N .category-button components', () => {
        const wrapper = render(<Provider store={store}><Roadmap /></Provider>);
        expect(wrapper.find('.category-button')).to.have.length(4);
      });
      it('should execute setCategoryFilter() when user selects a filter');
      it('should update state tree after setCategoryFilter() is called');
    });
  });

  describe('<FeatureList />', () => {
    it('should create one .feature-list component', () => {
      const wrapper = render(<Provider store={store}><Roadmap /></Provider>);
      expect(wrapper.find('.feature-list')).to.have.length(1);
    });
    it('should create N .feature components', () => {
      const wrapper = render(<Provider store={store}><Roadmap /></Provider>);
      expect(wrapper.find('.feature')).to.have.length.above(2);
    });

    describe('<Feature />', () => {
      it('should create at least one .feature component', () => {
        const wrapper = render(<Provider store={store}><Roadmap /></Provider>);
        expect(wrapper.find('.feature')).to.have.length.above(1);
      });
      describe('Feature Category', () => {
        it('should create at least one .feature-category control', () => {
          const wrapper = render(<Provider store={store}><Roadmap /></Provider>);
          expect(wrapper.find('.feature-category')).to.have.length.above(1);
        });
      });

      describe('Feature Likes', () => {
        it('should create at least one .feature-likes control', () => {
          const wrapper = render(<Provider store={store}><Roadmap /></Provider>);
          expect(wrapper.find('.feature-likes')).to.have.length.above(1);
        });
      });

      describe('Feature Detail', () => {
        it('should create at least one .feature-detail control', () => {
          const wrapper = render(<Provider store={store}><Roadmap /></Provider>);
          expect(wrapper.find('.feature-detail')).to.have.length.above(1);
        });
      });
    });
  });
});

describe('Roadmap Redux', () => {
  it('should get initial state for store', () => {
    expect(store.getState().features.length).to.be.above(2);
    expect(store.getState().categoryFilter)
      .to.equal(actions.CategoryFilters.SHOW_ALL);
    expect(store.getState().searchText)
      .to.equal('');
  });
  /*
  it('should add 11th feature of COMPONENT category', () => {
    store.dispatch(
      actions.addFeature(
        11,
        'New Component Feature',
        'About new component feature',
        actions.Categories.COMPONENT,
        3,
        'https://reactspeed.com'
      )
    );
    expect(store.getState().features.length).to.be.above(3);
    expect(store.getState().features[10].category)
      .to.equal(actions.Categories.COMPONENT);
  });
  it('should initialize 11th feature with 3 likes', () => {
    expect(store.getState().features[10].likes).to.equal(3);
  });
  it('should increment likes count for 11th feature', () => {
    store.dispatch(actions.likeFeature(11)); // likes = 4
    store.dispatch(actions.likeFeature(11)); // likes = 5
    expect(store.getState().features[10].likes).to.equal(5);
  });
  */
  it('should set a new categoryFilter', () => {
    expect(store.getState().categoryFilter)
      .to.equal(actions.CategoryFilters.SHOW_ALL);
    store.dispatch(actions
      .setCategoryFilter(actions.CategoryFilters.SHOW_COMPONENTS));
    expect(store.getState().categoryFilter)
      .to.equal(actions.CategoryFilters.SHOW_COMPONENTS);
  });
  it('should set new search text', () => {
    expect(store.getState().searchText)
      .to.equal('');
    store.dispatch(actions
      .setSearchText('new search text'));
    expect(store.getState().searchText)
      .to.equal('new search text');
  });
});
