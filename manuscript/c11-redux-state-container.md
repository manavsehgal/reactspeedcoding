# Redux State Container (X)

When designing React apps, UI state becomes an important concern. How state is managed
across your component hierarchy during your app lifecycle gets complex fast as
the number of components and user interactions increase.

React is the *View* for your app. We need an equally elegant solution for
managing the *State* and *Data Flow* within your app. This becomes even more important
concern for Single Page Apps as efficient state management leads to performant
user experience.

Fortunately Facebook has already thought this through for us. They have introduced
to the open source, [Flux application architecture][3] for building user interfaces.

A> Flux is the application architecture that Facebook uses for building client-side web applications.
A> It complements React's composable view components by utilizing a unidirectional data flow.
A> It's more of a pattern rather than a formal framework...
A> Flux applications have three major parts: the dispatcher, the stores, and the views (React components).
A> -- http://facebook.github.io/flux/

Redux is a very popular library in the React ecosystem.
It evolves from Flux design patterns and is based on [Elm architecture][2] which is a simple
pattern for infinitely nested components.

{pagebreak}

## The Roadmap app

To help understand this important chapter, let us create a relatively complex app
to manage the the roadmap for ReactSpeed book and companion code. We want to list
upcoming, recent content and code features. Users should have the capability
to *Like* features they want to see first or jump to live feature demos and content.

![Roadmap app wireframe](images/roadmap.jpg)

Our roadmap app will require a Feature component to render the individual feature.
It will also require a FeatureList component to manage list of feature components. We will
add a FeatureSearch component to search listed features.
A CategoryFilter component will list features by categories like
components, styles, chapters, sections, and strategies.

You will note that various components within this app will interact with each
other (blue dashed lines in the wireframe). Changing filters will interact with search,
reducing the scope of what can be searched. Search will interact with features, showing only features
that match the text entered in search. Number of likes will interact with order of features.

Our app will also maintain several UI states. Some candidate states could be,
active filter, order of features, search text, and number of *Likes*.

{pagebreak}

## Redux basics

Redux is remarkably simple API and an elegant architectural design pattern at the same time.

Redux introduces three important and inter-related concepts.

**Stores for your state data.**

- All your app state is a single data structure.
- Think a single JSON document representing the entire state of your app.
- State is immutable.
- Creating new state makes a copy of existing state with the new changes.

**Actions for managing data flow.**

- Actions usually define functions with two arguments. First, type of state change, and
second, change data.
- Type of state change is usually defined as strings or constants representing strings,
named after the action performed on the state tree leading to the data change.
- The data change can be represented as a single value, an object with multiple values,
or can even be implicitly understood from the action type. Examples: INCREMENT_LIKES,
TOGGLE_TODO.
- Actions are the only way to communicate change within the state tree.

**Reducer functions.**

- Reducers are written as pure functions.
- Reducers manipulate state based on Actions.
- Fixed input to the reducer function are two arguments. First, the existing state tree, and
second, the action to be applied on the state tree.
- Reducer returns a predictable output as the new state tree after applying the action.
- As reducer is a pure function, it should not have any unpredictable behavior including
data manipulation based on random functions or timestamp. Input should determine the output predictably.

We will discover other advanced concepts that elaborate the three core concepts, as we go through
coding the Roadmap app in the Redux way.

{pagebreak}

## State tree definition

Redux is all about managing state and data flow within our app. A good first
step is to define the state tree for our app. Redux treats the entire state
of your app as single data structure. Think of the state tree as a JSON document
describing your app.

Drawing this JSON document for our Roadmap app will make things clearer.

We will maintain state for list of features with feature title, category, and likes count.
We will store text entered by user in search box. We will also capture category
selected by the user for filtering features.

When our app starts the initial state has defaults set for various
states maintained by our app.

{title="Roadmap state tree, initial state", lang=json}
~~~~~~~
{
  features: [],
  searchText: '',
  categoryFilter: 'SHOW_ALL'
}
~~~~~~~

New features can be added to our app, updating the features list within
our state tree.

{title="Roadmap state tree, new features", lang=json}
~~~~~~~
{
  features: [
    { title: 'Navigation', likes: 0, category: 'COMPONENT' },
    { title: 'Redux state container', likes: 0, category: 'CHAPTER' },
    { title: 'Roadmap', likes: 0, stage: 'APP' }
  ],
  searchText: '',
  categoryFilter: 'SHOW_ALL'
}
~~~~~~~

As our users ```like``` the features the respective likes count increments.

{title="Roadmap state tree, trending", lang=json}
~~~~~~~
{
  features: [
    { title: 'Navigation', likes: 0, category: 'COMPONENT' },
    { title: 'Redux state container', likes: 2, category: 'CHAPTER' },
    { title: 'Roadmap', likes: 1, stage: 'APP' }
  ],
  searchText: '',
  categoryFilter: 'SHOW_ALL'
}
~~~~~~~

As users select a new category filter or enter search text, respective state
gets updated.

{title="Roadmap state tree, live", lang=json}
~~~~~~~
{
  features: [
    { title: 'Navigation', likes: 0, category: 'COMPONENT' },
    { title: 'Redux state container', likes: 2, category: 'CHAPTER' },
    { title: 'Roadmap', likes: 1, stage: 'APP' }
  ],
  searchText: 'new search text',
  categoryFilter: 'SHOW_CHAPTERS'
}
~~~~~~~

We can continue to evolve our state tree by adding other states for our app. Ideally
you would do this as you evolve the design of your app. For now we can move to the next
stage quickly.

{pagebreak}

## Redux specification

Before jumping into creating our Redux app, we can specify how the Redux stores, actions,
and reducers behave as the state tree changes within our app. We can do so using our
test environment setup in **Test App Components** chapter.

{title="03_roadmap.spec.js test suite spec", lang=javascript}
~~~~~~~
import { describe, it } from 'mocha';

describe('Roadmap Redux Spec', () => {
  it('should get initial state for store');
  it('should add first feature of COMPONENT category');
  it('should initialize first feature with default state');
  it('should increment likes count for first feature');
  it('should set a new categoryFilter');
  it('should add second feature of CHAPTER category');
  it('should add third feature of APP category');
  it('should set new search text');
});
~~~~~~~

When we run this test using ```npm run test``` we notice following test results.

{title="Terminal output running Roadmap test suite", lang=text}
~~~~~~~
...

Roadmap Redux Spec
  - should get initial state for store
  - should add first feature of COMPONENT category
  - should initialize first feature with default state
  - should increment likes count for first feature
  - should set a new categoryFilter
  - should add second feature of CHAPTER category
  - should add third feature of APP category
  - should set new search text

~~~~~~~

Redux apps are best designed in the order Actions > Reducers > Store > Components.
So it is a good idea to develop tests for our Redux app as we evolve the app, through
these stages. We do not have to wait for the components to render to see results of
our Redux design.

{pagebreak}

## Actions for Roadmap

Actions in Redux represent data payloads sent between your app and the Redux store.
Actions are the only way you can update your state tree within the store.

We can derive some Redux Actions from the state tree we just defined.

{title="/actions/roadmap.js", lang=javascript}
~~~~~~~
/*
 * action types
 */

export const ADD_FEATURE = 'ADD_TODO';
export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export const LIKE_FEATURE = 'LIKE_FEATURE';
export const SEARCH_TEXT = 'SEARCH_TEXT';
/*
 * other constants
 */

export const CategoryFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPONENTS: 'SHOW_COMPONENTS',
  SHOW_CHAPTERS: 'SHOW_CHAPTERS'
};

export const Categories = {
  CHAPTER: 'CHAPTER',
  COMPONENT: 'COMPONENT',
  APP: 'APP'
};

/*
 * action creators
 */

export function addFeature(title, category) {
  return {
    type: ADD_FEATURE,
    category,
    title };
}

export function setCategoryFilter(filter) {
  return { type: SET_CATEGORY_FILTER, filter };
}

export function setSearchText(text) {
  return { type: SEARCH_TEXT, text };
}

export function likeFeature(index) {
  return { type: LIKE_FEATURE, index };
}
~~~~~~~

Notice that we have defined constants for our state values including categories
and category filters. We are maintaining consistency with definition of our action types
as string constants. This is not a Redux requirement.

{pagebreak}

## Reducers for Roadmap

Now that we have some actions defined, we can write what happens to our state
tree when these actions are called. We do this writing pure functions called
reducers which take two arguments, the current state tree and the action to
perform on the state tree. The reducer then returns the new state tree.

{title="/app/reducers/roadmap.js", lang=javascript}
~~~~~~~
import * as actions from '../actions/roadmap';

const initialState = {
  searchText: '',
  categoryFilter: actions.CategoryFilters.SHOW_ALL,
  features: []
};

export default function roadmapApp(state = initialState, action) {
  switch (action.type) {
  case actions.LIKE_FEATURE:
    return Object.assign({}, state, {
      features: state.features.map((feature, index) => {
        if (index === action.index) {
          return Object.assign({}, feature, {
            likes: feature.likes + 1
          });
        }
        return feature;
      })
    });
  case actions.SEARCH_TEXT:
    return Object.assign({}, state, {
      searchText: action.text
    });
  case actions.SET_CATEGORY_FILTER:
    return Object.assign({}, state, {
      categoryFilter: action.filter
    });
  case actions.ADD_FEATURE:
    return Object.assign({}, state, {
      features: [
        ...state.features,
        {
          title: action.title,
          category: action.category,
          likes: 0
        }
      ]
    });
  default:
    return state;
  }
}
~~~~~~~

The ```Object.assign()``` method creates copy of existing state into new state while updating
the new changes suggested by the action.

{pagebreak}

Now that we have defined the Reducer and Action, it is time to create the Store.

This is the simplest part of writing a Redux app.

{title="/app/store/roadmap.js", lang=javascript}
~~~~~~~
import { createStore } from 'redux';
import roadmapApp from '../reducers/roadmap';
const store = createStore(roadmapApp);
export default store;
~~~~~~~

We have exported our store so that we can use it within other parts of our app including
our test suite.

{pagebreak}

## Test store, actions, and reducers

Let us elaborate our test spec with assertions to test our Redux app so far.

{title="03_roadmap.spec.js test suite spec", lang=javascript}
~~~~~~~
import { describe, it } from 'mocha';
import { expect } from 'chai';
import store from '../../app/store/roadmap';
import * as actions from '../../app/actions/roadmap';

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
~~~~~~~

When we run this test using ```npm run test``` we notice following test results.

{title="Terminal output running Roadmap test suite", lang=text}
~~~~~~~
...

Roadmap Redux Spec
  - should get initial state for store
  - should add first feature of COMPONENT category
  - should initialize first feature with default state
  - should increment likes count for first feature
  - should set a new categoryFilter
  - should add second feature of CHAPTER category
  - should add third feature of APP category
  - should set new search text

17 passing (149ms)

~~~~~~~

Now as we evolve our Redux app, we can continue adding to our test suite.

{pagebreak}

## Optimize Redux app

There are several ways our basic Redux app can be optimized before we even move
onto designing the React components.

These optimizations are important as they improve readability, maintainability,
and performance for larger apps.

**Object Spread Operator.** Our ```Object.assign()``` code in reducers can be further
simplified using ES6 stage 2 feature called Object Rest Spread Operator. Using this feature
requires installing Babel plugin for [transform-object-rest-spread][4] and
making the required changes in the plugins section of ```.babelrc``` configuration.

Notice how this simplifies our reducers using ```...state``` object spread operator.

{title="/app/reducers/roadmap.js refactor object spread operator", lang=javascript}
~~~~~~~
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
~~~~~~~

**Reducer composition.** A fundamental pattern of designing Redux apps is to slice
the reducer code into separate concerns based on top-level state tree nodes.

We have features, categoryFilter, and searchText as top level nodes within our
state tree.

{title="/app/reducers/roadmap.js refactor reducer composition", lang=javascript}
~~~~~~~
import * as actions from '../actions/roadmap';

function features(state = [], action) {
  switch (action.type) {
  case actions.LIKE_FEATURE:
    return state.map((feature, index) => {
      if (index === action.index) {
        return { ...feature, likes: feature.likes + 1 };
      }
      return feature;
    });
  case actions.ADD_FEATURE:
    return [...state, { title: action.title, category: action.category, likes: 0 }];
  default:
    return state;
  }
}

function categoryFilter(state = actions.CategoryFilters.SHOW_ALL, action) {
  switch (action.type) {
  case actions.SET_CATEGORY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

function searchText(state = '', action) {
  switch (action.type) {
  case actions.SEARCH_TEXT:
    return action.text;
  default:
    return state;
  }
}

export default function roadmapApp(state = {}, action) {
  return {
    features: features(state.features, action),
    searchText: searchText(state.searchText, action),
    categoryFilter: categoryFilter(state.categoryFilter, action)
  };
}
~~~~~~~

We separate these top-level nodes into their own reducer functions, further
simplifying their respective code. Our roadmapApp reducer function is now
only three lines of code!

And, we are not done yet! Let us do another round of optimization using
Redux ```combineReducers``` utility.

{title="/app/reducers/roadmap.js refactor combineReducers", lang=javascript}
~~~~~~~
import { combineReducers } from 'redux';

const roadmapApp = combineReducers({ features, searchText, categoryFilter });
export default roadmapApp;
~~~~~~~

One single line of code for our roadmapApp reducer!

**ES6 import.**

Again, we can further do some ES6 magic and optimize our file organization even further.

If we separate the features, searchText, categoryFilter reducers in their own file,
and use a separate file for roadmapApp, we can use ES6 import to do this.

{title="/app/reducers/roadmapApp.js refactor ES6 import", lang=javascript}
~~~~~~~
import * as reducers from './roadmap';
import { combineReducers } from 'redux';

const roadmapApp = combineReducers(reducers);
export default roadmapApp;
~~~~~~~

This makes a lot of sense for larger projects where you may have many more
reducers which you may want to keep organized in separate files.

Of course we need to update the ```store/roadmap.js``` to import
from the new ```roadmapApp.js``` file.

All along this journey refactoring our Redux app for optimizations, we were running
the test suite defined earlier to ensure all tests are passing.

{pagebreak}

## Component hierarchy specification

Just like the spec we wrote earlier, let us write the component specification for
our Roadmap app.

{title="03_roadmap.spec.js", lang=javascript}
~~~~~~~
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
~~~~~~~

When we run this test using ```npm run test``` we notice following test results.

{title="Terminal output running Roadmap test suite", lang=text}
~~~~~~~
...
<Roadmap />
  - should create one .roadmap component
  <SearchFilter />
    - should create one .search-filter component
    <FeatureSearch />
      - should create one .feature-search component
      - should initialize default value for searchText
      - should execute enterSearch() when user presses Enter in search box
      - should update state tree after enterSearch() is called
    <CategoryFilter />
      - should create N .category-filter components
      - should execute selectFilter() when user selects a filter
      - should update state tree after selectFilter() is called
  <FeatureList />
    - should create one .feature-list component
    <Feature />
      - should create N .feature components
      <FeatureCategory />
        - should create one .feature-category component per .feature
      <FeatureLikes />
        - should create one .feature-likes component per .feature
      <FeatureTitle />
        - should create one .feature-title component per .feature
...
~~~~~~~

Here are the strategies to consider when creating component specification for your app.

- **Component hierarchy.** Represent the component hierarchy starting
at the top level owner component traversing through child or owned components.
- **JSX naming.** Identify component name using JSX closing tag statement <Component /> even if
the component has props.
- **Class name.** The ```it``` spec statements can refer to className associated
with the component. This className can then be used by Enzyme find() method as well.
- **Cardinality.** Specify cardinality (zero, one, or many) of component(s) expected to be
created during normal use case of the application. This can be checked
in the test implementation.
- **Props.** Consider representing component props during specification stage
as additional ```it``` spec statements.
- **Events.** Events and life-cycle methods can also be specified at this stage.

{pagebreak}

## Rapid prototype component hierarchy

Like real-world apps, as our repository of components grows, we should be creating
new functionality by mixing existing components, refactoring them for new use cases.

Let us rapidly prototype our front-end for Roadmap app, by duplicating ```CardStack```
component for layouts, reusing ```Card``` component for granular grid, and bringing
together button, and form controls we created earlier. We also reuse the ```IconText``` component,
and create a new ```badge``` control similar to ```button``` control.

{title="/app/components/roadmap.jsx", lang=javascript}
~~~~~~~
import React from 'react';

import Card from './Card.jsx';
import IconText from './IconText.jsx';

const Roadmap = () => {
  const gridClass = 'grid grid-full grid-flex-cells large-grid-fit';
  return (
    <div className="roadmap">
      <h1>Roadmap</h1>
      <div className={`${gridClass} search-filter`}>
        <Card slim>
          <div className="input slim feature-search">
            <span className="input-label">Search</span>
            <input className="input-field" placeholder="Enter feature name" />
          </div>
        </Card>
        <Card slim>
          <button className="button default medium category-filter">
            <i className="fa fa-cubes"></i> Component
          </button>
          <button className="button primary medium category-filter">
            <i className="fa fa-cloud"></i> App
          </button>
          <button className="button secondary medium category-filter">
            <i className="fa fa-book"></i> Chapter
          </button>
        </Card>
      </div>
      <div className="feature-list">
        <div className={`${gridClass} feature`}>
          <Card slim message>
            <IconText
              className="success-text feature-likes"
              icon="heart"
              size="2x"
              text="21 likes"
              slim
            />
          </Card>
          <Card className="u-large-2of3 u-med-full u-small-full" slim>
            <div className="feature-detail">
              <b>Feature title here!</b><br />
              Details spilling to next line here.
            </div>
          </Card>
          <Card slim>
            <div className="badge secondary medium feature-category">
              <i className="fa fa-book"></i>
            </div>
          </Card>
        </div>

        <div className={`${gridClass} feature`}>
          <Card slim message>
            <IconText
              className="warning-text feature-likes"
              icon="heart"
              size="2x"
              text="1 like"
              slim
            />
          </Card>
          <Card className="u-large-2of3 u-med-full u-small-full" slim>
            <div className="feature-detail">
              <b>Feature two title here!</b><br />
              More details spilling to next line here.
            </div>
          </Card>
          <Card slim>
            <div className="badge default medium feature-category">
              <i className="fa fa-cubes"></i>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
~~~~~~~

We can also connect this rapid prototype with a route and develop the UI interactively
using Hot Module Replacement.

We are using dummy data as the components are not yet wired to our Redux app.

Note that we are using same class identifiers as defined in our test suite spec.
We can start implementing some of our test suite now.

{title="03_roadmap.spec.js implement a test", lang=javascript}
~~~~~~~
it('should create one .roadmap component', () => {
  const wrapper = shallow(<Roadmap />);
  expect(wrapper.is('.roadmap')).to.equal(true);
});
~~~~~~~

Once we are relatively satisfied with our UI prototype, we can further optimize
our component hierarchy by extracting Roadmap app components into separate files
before we start wiring our Redux actions, reducers, and store.

{pagebreak}

## Fixture data for prototype and Redux app

As we extract components we may want to feed actual data into the components to
continue prototyping our app before we connect the Redux store.

We will define our fixture data in such a manner that it conforms to our component
shape (or schema) and at the same time it can be reused later on to hydrate
(or initialize) our Redux store.

{title="/app/fixtures/roadmap/features.js", lang=javascript}
~~~~~~~
import * as actions from '../../actions/roadmap';

const features = [
  { id: 1,
    title: 'Roadmap',
    about: `The app implements a features roadmap for ReactSpeed.
    The app is built using Redux and available live on ReactSpeed website.`,
    category: actions.Categories.APP,
    likes: 3
  },
  { id: 2,
    title: 'Navigation',
    about: `This component renders main menu navigation items. It also
    renders React Router Links as child components.`,
    category: actions.Categories.COMPONENT,
    likes: 1
  },
  { id: 3,
    title: 'Test App Components',
    about: `The chapter discusses ESLint, StyleLint, Browsersync setup using Webpack.
    It also introduces Behavior-Driven Development using Mocha, Chai, and Enzyme.`,
    category: actions.Categories.CHAPTER,
    likes: 15
  }
];

export default features;
~~~~~~~

{pagebreak}

## Extract Feature component

Now we extract the ```Feature``` component based on this shape.

{title="/app/components/Roadmap/Feature.jsx", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';
import Card from '../Card.jsx';
import IconText from '../IconText.jsx';
import { Categories } from '../../actions/roadmap';

const Feature = ({
  onClickLikes,
  title,
  about,
  category,
  likes }) => {
  const gridClass = 'grid grid-full grid-flex-cells large-grid-fit';
  let renderCategory = '';
  switch (category) {
  case Categories.COMPONENT:
    renderCategory = (
      <div className="badge default medium feature-category">
        <i className="fa fa-cubes"></i>
      </div>
    );
    break;
  case Categories.APP:
    renderCategory = (
      <div className="badge primary medium feature-category">
        <i className="fa fa-cloud"></i>
      </div>
    );
    break;
  case Categories.CHAPTER:
    renderCategory = (
      <div className="badge secondary medium feature-category">
        <i className="fa fa-book"></i>
      </div>
    );
    break;
  default:
    renderCategory = '';
  }

  const renderLikesClass = (likes > 10)
    ? 'success-text feature-likes' : 'warning-text feature-likes';

  return (
    <div className={`${gridClass} feature`}>
      <Card onClick={onClickLikes} slim message>
        <IconText
          className={renderLikesClass}
          icon="heart"
          size="2x"
          text={`${likes} likes`}
          slim
        />
      </Card>
      <Card
        className="u-large-2of3 u-med-full u-small-full"
        slim
      >
        <div className="feature-detail">
          <b>{title}</b><br />
          <small>{about}</small>
        </div>
      </Card>
      <Card slim>
        {renderCategory}
      </Card>
    </div>
  );
};

Feature.propTypes = {
  onClickLikes: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired
};

export default Feature;
~~~~~~~

We note that the component takes an event handler as props for handling
click on feature likes.

We have also added some logic to the component for rendering badges based
on category of the feature. We also render color for likes icon based on
number of likes.

{pagebreak}

## Extract FeatureList component

Next we need to create the ```FeatureList``` component to map given features fixture
and render ```Feature``` components.

{title="/app/components/Roadmap/FeatureList.jsx", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';
import Feature from './Feature';

const FeatureList = ({ features, onClickLikes }) => (
  <div className="feature-list">
    {features.map(feature =>
      <Feature
        key={feature.id}
        {...feature}
        onClickLikes={() => onClickLikes(feature.id)}
      />
    )}
  </div>
);

FeatureList.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired
  }).isRequired).isRequired,
  onClickLikes: PropTypes.func.isRequired
};

export default FeatureList;
~~~~~~~

This component passes the event handler with feature id parameter. We use the
object spread operator ```{...feature}``` to pass on the remaining props.
It also defines expected shape of the features prop.

{pagebreak}

## Refactoring Roadmap app

Now that we have started developing Roadmap specific components, it is time to
refactor our app to its own folder. Creating Roadmap folder named after the
root component for our app means we can rename ```Roadmap.jsx``` to ```index.jsx``` within
this folder.

Our app code now reduces to just rendering the FeaturesList component while passing
it the fixtures data on features.

{title="/app/components/Roadmap/index.jsx", lang=javascript}
~~~~~~~
import React from 'react';

import Card from '../Card.jsx';
import features from '../../fixtures/roadmap/features';
import FeatureList from './FeatureList';

const Roadmap = () => {
  const likesClick = (id) => {
    // to be implemented
    console.log(`likesClick id = ${id}`);
  };

  const gridClass = 'grid grid-full grid-flex-cells large-grid-fit';
  return (
    <div className="roadmap">
      <h1>Roadmap</h1>
      <div className={`${gridClass} search-filter`}>
        <Card slim>
          <div className="input slim feature-search">
            <span className="input-label">Search</span>
            <input className="input-field" placeholder="Enter feature name" />
          </div>
        </Card>
        <Card slim>
          <button className="button default medium category-filter">
            <i className="fa fa-cubes"></i>
          </button>
          <button className="button primary medium category-filter">
            <i className="fa fa-cloud"></i>
          </button>
          <button className="button secondary medium category-filter">
            <i className="fa fa-book"></i>
          </button>
        </Card>
      </div>
      <FeatureList
        features={features}
        onClickLikes={likesClick}
      />
    </div>
  );
};

export default Roadmap;
~~~~~~~

We also create placeholder event handler ```likesClick```
within our ```Roadmap``` component, passing this as a prop to the ```FeaturesList``` component.

Once we are done with this refactoring we can run our app and see the app render
with the fixtures data.

We can continue implementing our tests to match the components we have created.

{title="003_roadmap.spec.js", lang=javascript}
~~~~~~~
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
~~~~~~~

As we run the test we will see more tests passing.

{title="Terminal output of roadmap test suite", lang=text}
~~~~~~~
...
  <Roadmap />
    - should create one .roadmap component
    <SearchFilter />
      - should create one .search-filter component
      <FeatureSearch />
        - should create one .feature-search component
        - should initialize default value for searchText
        - should execute enterSearch() when user presses Enter in search box
        - should update state tree after enterSearch() is called
      <CategoryFilter />
        - should create N .category-filter components
        - should execute selectFilter() when user selects a filter
        - should update state tree after selectFilter() is called
    <FeatureList />
      - should create one .feature-list component
      - should create N .feature components
      <Feature />
        - should create at least one .feature component
        Feature Category
          - should create at least one .feature-category control
        Feature Likes
          - should create at least one .feature-likes control
        Feature Detail
          - should create at least one .feature-detail control

...

  24 passing (208ms)
  11 pending
~~~~~~~

{pagebreak}

## Connecting Redux and container components

It is time to connect our Redux store to our components. To do so we will create
container components which will connect the store to presentational components
we created so far.

{title="/app/components/Roadmap/VisibleFeatureList.jsx", lang=javascript}
~~~~~~~
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
~~~~~~~

We first create the ```VisibleFeatureList``` component which displays  
visible features based on the current state. Right now we are only focusing
on selected Category Filter, which determines the visible features.

{pagebreak}

## CategoryButton and FilterCategoryButton components

Next we implement the ```CategoryButton``` presentational component
and ```FilterCategoryButton``` container component.

{title="/app/components/Roadmap/CategoryButton.jsx", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';
import { CategoryFilters } from '../../actions/roadmap';

const CategoryButton = ({ selected, filter, onClick }) => {
  let renderCategoryClass = '';
  let renderCategoryIcon = '';

  switch (filter) {
  case CategoryFilters.SHOW_APPS:
    renderCategoryClass = 'primary';
    renderCategoryIcon = 'cloud';
    break;
  case CategoryFilters.SHOW_COMPONENTS:
    renderCategoryClass = 'default';
    renderCategoryIcon = 'cubes';
    break;
  case CategoryFilters.SHOW_CHAPTERS:
    renderCategoryClass = 'secondary';
    renderCategoryIcon = 'book';
    break;
  default:
    renderCategoryClass = 'golden';
    renderCategoryIcon = 'star';
  }
  if (selected) {
    return (
      <button className={`disabled button ${renderCategoryClass} medium category-button`}>
        <i className={`fa fa-${renderCategoryIcon}`}></i>
      </button>
    );
  }
  return (
    <button
      className={`button ${renderCategoryClass} medium category-button`}
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      <i className={`fa fa-${renderCategoryIcon}`}></i>
    </button>
  );
};

CategoryButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CategoryButton;
~~~~~~~

The container component connects our presentational component properties
and events with Redux actions, reducers, and store.

{title="/app/components/Roadmap/CategoryButton.jsx", lang=javascript}
~~~~~~~
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
~~~~~~~

Our ```Roadmap``` component has fewer lines of code now.

{title="/app/components/Roadmap/index.jsx", lang=javascript}
~~~~~~~
import React from 'react';

import Card from '../Card.jsx';
import VisibleFeatureList from './VisibleFeatureList';
import FilterCategoryButton from './FilterCategoryButton';
import { CategoryFilters } from '../../actions/roadmap';

const Roadmap = () => {
  const gridClass = 'grid grid-full grid-flex-cells large-grid-fit';
  return (
    <div className="roadmap">
      <h1>Roadmap</h1>
      <p className="default-text">Note: This app is work-in-progress.</p>
      <div className={`${gridClass} search-filter`}>
        <Card slim>
          <div className="input slim feature-search">
            <span className="input-label">Search</span>
            <input className="input-field" placeholder="Enter feature name" />
          </div>
        </Card>
        <Card slim>
          <FilterCategoryButton filter={CategoryFilters.SHOW_ALL} />
          <FilterCategoryButton filter={CategoryFilters.SHOW_APPS} />
          <FilterCategoryButton filter={CategoryFilters.SHOW_CHAPTERS} />
          <FilterCategoryButton filter={CategoryFilters.SHOW_COMPONENTS} />
        </Card>
      </div>
      <VisibleFeatureList />
    </div>
  );
};

export default Roadmap;
~~~~~~~

We remove the prototype event handlers as Redux actions will take over the UI interaction.
We also render the ```VisibleFeatureList``` and ```FilterCategoryButton``` container
components with relevant props.

Note that our feature search control is still in prototype mode,
not implemented in Redux, as intended. We are demonstrating how you can
move non-Redux app, component by component to a Redux enabled app.

{pagebreak}

## Hydrate Redux app

Now that we have connected our app components with Redux, we have one final step
remaining. We need to hydrate our app with the fixture data for initial state.

{title="/app/fixtures/roadmapHydrate.js", lang=javascript}
~~~~~~~
import store from '../../store/roadmap';
import * as actions from '../../actions/roadmap';
import features from './features';

const roadmapHydrate = () => {
  // Log the initial state
  console.log(store.getState());

  // Every time the state changes, log it
  // Note that subscribe() returns a function for unregistering the listener
  const unsubscribe = store.subscribe(() =>
    console.log(store.getState())
  );

  for (let i = 0; i < features.length; i++) {
    store.dispatch(actions
      .addFeature(
        features[i].id,
        features[i].title,
        features[i].about,
        features[i].category,
        features[i].likes,
        features[i].link
      ));
  }

  // Stop listening to state updates
  unsubscribe();
};

export default roadmapHydrate;
~~~~~~~

The subscribe/unsubscribe are only required to log changes to our store.

To run our app we need to run hydrate and pass the store to our components.

{title="/app/index.jsx", lang=javascript}
~~~~~~~
// some import code...

import Roadmap from './components/Roadmap';
import { Provider } from 'react-redux';
import store from './store/roadmap';
import roadmapHydrate from './fixtures/roadmap/roadmapHydrate';
roadmapHydrate();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomePage}>
        <IndexRoute component={CardStack} />
        <Route path="/roadmap" component={Roadmap} />
        <Route path="/ajax" component={CardStackAjax} />
        <Route path="/infographics" component={CardStackInfo} />
        <Route path="/media" component={CardStackMedia} />
        <Route path="/forms" component={CardStackForm} />
        <Route path="/buttons" component={CardStackButton} />
        <Route path="/blog" component={PostSummary} />
        <Route path="/blog/:slug" component={PostDetail} />
      </Route>
      <Route path="*" component={HomePage}>
        <IndexRoute component={MissingRoute} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
~~~~~~~

That's it. Our Roadmap Redux app is functional. When you first run the app it
seems like magic how UI events impact state of this relatively complex app
and React automatically handles re-rendering of the app based on new state. Try
clicking on likes to increment beyond 10 likes, or selecting any of the category filters.

{pagebreak}

## Update test suite using Redux

We can now update our tests to hydrate data from fixtures and render components using Redux
provider.

{title="003_roadmap.spec.js", lang=javascript}
~~~~~~~
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
    it('should create one .search-filter component');

    describe('<FeatureSearch />', () => {
      it('should create one .feature-search component');
      it('should initialize default value for searchText');
      it('should execute enterSearch() when user presses Enter in search box');
      it('should update state tree after enterSearch() is called');
    });

    describe('<CategoryFilter />', () => {
      it('should create N .category-button components');
      it('should execute selectFilter() when user selects a filter');
      it('should update state tree after selectFilter() is called');
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
  it('should add fourth feature of COMPONENT category', () => {
    store.dispatch(
      actions.addFeature(
        4,
        'New Component Feature',
        'About new component feature',
        actions.Categories.COMPONENT,
        3,
        'https://reactspeed.com'
      )
    );
    expect(store.getState().features.length).to.be.above(3);
    expect(store.getState().features[3].category)
      .to.equal(actions.Categories.COMPONENT);
  });
  it('should initialize fourth feature with 3 likes', () => {
    expect(store.getState().features[3].likes).to.equal(3);
  });
  it('should increment likes count for fourth feature', () => {
    store.dispatch(actions.likeFeature(4)); // likes = 4
    store.dispatch(actions.likeFeature(4)); // likes = 5
    expect(store.getState().features[3].likes).to.equal(5);
  });
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
~~~~~~~

Notice how we have updated our tests with new shape for our Feature component, adding link
and about states. We have done this change as we moved from prototype to test suite to Redux
implementation. This is how we evolve apps in the real-world as well. One component at a time.
One state at a time. One test at a time. You get the idea.

In next update we can continue developing our Roadmap app further by connecting the feature search with
the Redux store and actions.

[1]: https://github.com/facebook/immutable-js
[2]: http://guide.elm-lang.org/architecture/index.html
[3]: http://facebook.github.io/flux/
[4]: https://babeljs.io/docs/plugins/transform-object-rest-spread/
