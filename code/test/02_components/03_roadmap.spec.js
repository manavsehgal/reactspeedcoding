import React from 'react';

import { describe, it } from 'mocha';
import { expect } from 'chai';
import store from '../../app/store/roadmap';
import { shallow, render } from 'enzyme';
import * as actions from '../../app/actions/roadmap';
import Roadmap from '../../app/components/Roadmap';

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

describe('Roadmap Redux', () => {
  it('should get initial state for store', () => {
    expect(store.getState().features.length).to.equal(0);
    expect(store.getState().categoryFilter)
      .to.equal(actions.CategoryFilters.SHOW_ALL);
    expect(store.getState().searchText)
      .to.equal('');
  });
  it('should add first feature of COMPONENT category', () => {
    store.dispatch(
      actions.addFeature('New Component Feature', actions.Categories.COMPONENT)
    );
    expect(store.getState().features.length).to.equal(1);
    expect(store.getState().features[0].category)
      .to.equal(actions.Categories.COMPONENT);
  });
  it('should initialize first feature with default state', () => {
    expect(store.getState().features[0].likes).to.equal(0);
  });
  it('should increment likes count for first feature', () => {
    store.dispatch(actions.likeFeature(0)); // likes = 1
    store.dispatch(actions.likeFeature(0)); // likes = 2
    expect(store.getState().features[0].likes).to.equal(2);
  });
  it('should set a new categoryFilter', () => {
    expect(store.getState().categoryFilter)
      .to.equal(actions.CategoryFilters.SHOW_ALL);
    store.dispatch(actions
      .setCategoryFilter(actions.CategoryFilters.SHOW_COMPONENTS));
    expect(store.getState().categoryFilter)
      .to.equal(actions.CategoryFilters.SHOW_COMPONENTS);
  });
  it('should add second feature of CHAPTER category', () => {
    store.dispatch(
      actions.addFeature('Second Chapter Feature', actions.Categories.CHAPTER)
    );
    expect(store.getState().features.length).to.equal(2);
    expect(store.getState().features[1].category)
      .to.equal(actions.Categories.CHAPTER);
  });
  it('should add third feature of APP category', () => {
    store.dispatch(
      actions.addFeature('Third App Feature', actions.Categories.APP)
    );
    expect(store.getState().features.length).to.equal(3);
    expect(store.getState().features[2].category)
      .to.equal(actions.Categories.APP);
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
