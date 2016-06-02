# Refactor Existing Components

Refactoring is an essential part of iterative development. React is ideal for iterative
refactoring of your code because of component based development.

You will learn following concepts in this chapter.

- Refactoring to render node children.
- ES5 to ES6 React component definition.
- Testing and refactoring.
- Refactoring for converting standard React apps to Redux.
- Refactoring for optimizing React apps.

{pagebreak}

## Refactoring to render node children

All JSX HTML-like tags are actually React components. You can start your component
design by copying HTML from a sample or existing source into render method.

At some stage you will want to convert these nodes into React components and gain
benefits of composition design pattern, among others.

A straightforward strategy to do this kind of refactoring is
to use ```this.props.children```. Any nodes or components contained within a
parent node can be available to the parent with this strategy.

You may want to follow this strategy if you are not passing any properties
from parent to child nodes. You may also want to leave any state management to
the contained component. This strategy also helps if you are mostly interested
in *decorating* the child node with additional styles or HTML tags in a consistent
manner. Cases where you want to future-proof your code and add new child nodes,
representing new components, are also ideal for this refactoring strategy.

Our ```Card``` and ```CardStack``` components are ideal for this refactoring strategy.
So far we have been adding many custom components to the ```CardStack``` using ```<li>``` node
as parent for the child component. Now let us consider a scenario where you want to
use ```<div>``` instead of ```<li>``` or a more complex set of HTML and CSS to represent
a ```Card```. You will face two challenges. You will need to find and replace nodes in multiple
places. Any changes done to ```Card``` component will not reflect, unless you copy these
changes to nodes that are not rendering the ```Card``` component.

{title="/app/components/Card.jsx original Card component", lang=javascript}
~~~~~~~
import React from 'react';

export default function Card(props) {
  return (
    <li className="card message">
      <h3>{props.message}</h3>
    </li>
  );
}
~~~~~~~

Our refactored ```Card``` component is way more powerful now. It can handle
multiple sizes for rendering cards of varying dimensions. It can also render
distinctly if we are displaying a message.

Note that using ```{this.react.children}``` requires
we convert our component into a class definition, so that it can inherit
props.children and related utility methods from the ```React.Component``` parent.

{title="/app/components/Card.jsx refactored Card component", lang=javascript}
~~~~~~~
import React, {PropTypes} from 'react';

export default class Card extends React.Component {
  static propTypes = { size: PropTypes.string, message: PropTypes.bool }
  static defaultProps = { size: '', message: false }
  render() {
    const messageClass = this.props.message ? ' message': '';

    const cardClass = this.props.size
      ? `card-${this.props.size}${messageClass}`
      : `card${messageClass}`;

    return (
      <li className={cardClass}>
        {this.props.children}
      </li>
    );
  }
}
~~~~~~~

Another benefit from this refactoring is reduced and easier to read code for
our ```CardStack``` render method. Notice how we are passing ```message```
property without initializing it with a value. React understands this as a
boolean property with value as true.

{title="/app/components/Card.jsx refactored Card component", lang=javascript}
~~~~~~~
render () {
  const messages = this.props.messages;
  const renderMessages = messages.map(message =>
      <Card key={message} message><h3>{message}</h3></Card>
    );

  return (
    <ul className="stack">
      <Card key="workflow" size="2w"><Workflow /></Card>
      <Card key="comp-strat">
        <IconText className="blue" icon="globe"
          size="4x" text="Nine Component Creation Strategies" />
      </Card>
      <Card key="comp-cust">
        <IconText icon="cog"
          size="4x" text="10 Custom Components" />
      </Card>
      <Card key="firebase">
        <IconText className="orange" icon="database"
          size="4x" text="Firebase React Integration" />
      </Card>
      <Card key="github-react"><GitHub repo="facebook/react" /></Card>
      <Card key="github-webpack"><GitHub repo="webpack/webpack" /></Card>
      <Card key="github-redux"><GitHub repo="reactjs/redux" /></Card>
      <Card key="youtube"><YouTube videoid="MGuKhcnrqGA" /></Card>
      <Card key="world"><World /></Card>
      {renderMessages}
    </ul>
  );
}
~~~~~~~

Extending HTML nodes or React components representing standard HTML tags is another
use case for this refactoring strategy. As long as you are consuming any properties
only within the owner component or only within the contained component, this strategy
provides an easy path to refactoring.

{pagebreak}

## ES5 to ES6 React component definition

Most React content on the Web still refers to ES5 code. This section is about
refactoring existing E5 React component to ES6 code.

Let us use the Todo list example from Facebook React website homepage and refactor
it to ES6 components.

{title="Facebook React TodoApp ES5 sample", lang=javascript}
~~~~~~~
var TodoList = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <li key={item.id}>{item.text}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<TodoApp />, mountNode);
~~~~~~~

We will create two new components, ```TodoList``` and ```TodoApp``` using ES6 code.

Our TodoList component is a pure function or a stateless component.

{title="/app/components/TodoList.jsx refactored ES6 component", lang=javascript}
~~~~~~~
import React, { PropTypes } from 'react';

const TodoList = ({ items }) => {
  const createItem = (item) => <div key={item.id}>{item.text}</div>;
  return <div>{items.map(createItem)}</div>;
};

TodoList.propTypes = { items: PropTypes.array.isRequired };

export default TodoList;
~~~~~~~

We are using arrow functions to render ```createItem``` with less code.
We also make our code safer and easier to read using immutable const instead of var
in our ES5 sample.

For our TodoApp component we use ES6 class definition.

{title="/app/components/TodoApp.jsx refactored ES6 component", lang=javascript}
~~~~~~~
import React from 'react';
import TodoList from './TodoList';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange = (e) => this.setState({ text: e.target.value });
  handleSubmit = (e) => {
    e.preventDefault();
    const nextItems = this.state.items
      .concat([{ text: this.state.text, id: Date.now() }]);
    this.setState({ items: nextItems, text: '' });
  }
  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{`Add # ${this.state.items.length + 1}`}</button>
        </form>
      </div>
    );
  }
}

export default TodoApp;
~~~~~~~

We have added a ```constructor``` to set state and bind event handler methods.
Note that ```onChange``` and ```handleSubmit``` elegantly use ES6 arrow functions.
Our ```render()``` code now uses ES6 template literals for dynamic ```button``` text.
We are also replacing any instances of mutable ```var``` with safer ```const``` keyword.

{title="/app/components/CardStack.jsx render TodoApp", lang=javascript}
~~~~~~~
// some code...
import TodoApp from './TodoApp.jsx';
// some code...
<div className={gridClass}>
  <Card><Workflow /></Card>
  <Card><World /></Card>
  <Card><TodoApp /></Card>
</div>
// some code...
~~~~~~~

Now rendering our new component is a matter of adding it to one of our ```CardStack```
components. Done! You just refactored ES5 code to ES6.

{pagebreak}

## Testing and refactoring

Testing and refactoring goes hand in hand. Depending on your choice of TDD or BDD, you
will be writing tests along with code to pass these tests, or test covering code that
you have already written. During the test workflow refactoring plays a role at various stages.

**Spec.** When prototyping your component you may just want to start with
a spec written in Mocha. As you implement your component, you may refactor the spec
based on design decisions.

**Prototyping.** Using tools like Kadira Storybook you may be isolating visual
or usability testing of your component. Results of your tests will enable you to
interactively refactor your code and styles.

**Lint.** ESLint and StyleLint editor integration prompts you in-line while editing
your code with suggestions to refactor and improve existing or new code you might be writing.

**Enzyme.** When doing component testing using a tool like Enzyme, you may want
to write tests that need to pass for component rendering in isolation or as an entire hierarchy.
This may prompt refactoring your code or your tests may need adjusting to new specs.

**Coverage.** When running test coverage reports you may encounter code that is not covered
by your existing tests. You may refactor your code or add new tests to achieve acceptable levels
of code coverage.

**Sync and Hot Reloading.** Using tools like Browsersync and Hot Reloading, you could be testing
your app on multiple devices while adjusting and refactoring styles for responsive design.

{pagebreak}

## Refactoring for converting standard React apps to Redux

Redux is an important and popular part of React stack for relatively complex apps.
We cover Redux refactoring strategy in detail within the **Redux state container** chapter.

Broadly we apply following strategies to move from a standard React app to a Redux enabled app.

- Identify state tree definition for UI state of your app components.
- Using Mocha write prototype spec for Redux patterns implementing the state tree.
- Determine Redux actions refactoring state definition within the non-Redux app.
- Implement Reducers refactoring event handlers within the non-Redux app.
- Create the store for managing entire app state in one place.
- Write test suite to cover store, actions, and reducers.
- Apply Redux optimization patterns for ES6 and reducer composition.
- Define component hierarchy specification.
- Prototype component hierarchy reusing existing component library.
- Implement data fixtures for prototype and Redux app.
- Extract presentational components from prototype.
- Extract container components connecting presentation components to Redux.
- Refactor app to replace prototype with presentational and container components.
- Hydrate the Redux store with fixtures data.
- Refactor test suite for Redux patterns.
- Add any new components to Redux app incrementally.

{pagebreak}

## Refactoring for optimizing React apps

During the course of this book we followed several best practices for writing optimized React code.
This section summarizes various optimization strategies.

**ES6.** Arrow functions offer shorthand to writing JS functions.
Template literals make string concatenation code more readable and manageable. Spread
operators remove significant boilerplate code. Class definitions and property initializes
make our component definitions more robust.

**Webpack.** Webpack runs several optimizations on our app including
bundling, packaging, minifying, and auto-generating code based on templates. Refactoring
your JS code to use import, export, and modules, around single-area-of-concern per module,
helps Webpack deliver optimized payload. Refactor your vendor dependencies suiting
Webpack separation of app and vendor JS files for even faster first time loading of your
single page app.

**PostCSS.** Refactoring your CSS styles to follow Airbnb guidelines and PostCSS SASS-like
syntax encourages reuse, standardization, and readability of your code.

**Inline CSS and SVG.** Refactoring to inline CSS strategically is a strategy worth considering.
When you combine this strategy with using SVG to replace external libraries like
for example icon fonts, this can yield impressive results. You can optimize by reducing
DNS lookups, reducing CSS load time, and overall payload of your app. We will explore
this strategy in detail in the section **Refactoring Font Awesome to SVG icons** which follows.

{pagebreak}

## Refactoring Font Awesome to SVG icons

So far our app is using Font Awesome font icons library. We used one of the most optimum
ways to include this library in our app. Using it over BootstrapCDN and loading the
minified version of Font Awesome library in our index.html head section. There are
some challenges that remain in this approach.

- While Font Awesome is highly optimized library it still adds around 28.7K payload (7.4K GZip)
for first time users.
- It adds an additional DNS lookup to our overall app loading time.
- It exhibits Flash Of Missing Icons when on slower connection.
- We are hardly using 20 odd icons from the large array of Font Awesome icons.
There must be a leaner way of loading icons.
- While Font Awesome is very flexible, we are stuck with fixed number of sizing options.
- If we were to load Font Awesome using Webpack we will need additional configuration.
- If we wanted to customize Font Awesome icons we will need to add configuration and build options to Webpack.

There is an elegant solution. Thanks to David Gilbertson's post
on [Icons as React Components][1], we are able to create a new custom component,
which helps us solve all of the above challenges.

The strategy is simple, building on the ideas from the post.

- Use SVG icons instead of icon fonts.
- Get SVG data for icons from Creative Commons sources like [IcoMoon][2].
- Use this icon data as fixture for our app where we need icons.
- Refactor ```IconText``` component to ```IconSvg``` component.
- Refactor the app to render the new component instead of using Font Awesome.

{title="/app/components/IconSvg.jsx refactored component", lang=javascript}
~~~~~~~
import React from 'react';
const { PropTypes } = React;

const IconSvg = props => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'baseline'
    },
    path: {
      fill: 'currentColor'
    },
    font: {
      fontSize: props.slim ? props.size * 120 / 100 : props.size * 40 / 100
    }
  };
  const renderText = props.slim
    ? <span className={props.textColor}> {props.text} </span>
    : <div className={props.textColor}>{props.text}</div>;
  const renderClassName = props.className ? props.className : props.color;

  return (
    <span className={renderClassName} style={styles.font}>
      {props.left ? renderText : ''}
      <svg
        style={styles.svg}
        width={`${props.size}px`}
        height={`${props.size}px`}
        viewBox="0 0 1024 1024"
      >
        <path
          style={styles.path}
          d={props.icon}
        ></path>
      </svg>
      {props.left ? '' : renderText}
    </span>
  );
};

IconSvg.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
  slim: PropTypes.bool,
  textColor: PropTypes.string,
  className: PropTypes.string,
  left: PropTypes.bool
};

IconSvg.defaultProps = {
  size: 16,
  color: 'primary-text',
  text: '',
  slim: false,
  textColor: '',
  className: '',
  left: false
};

export default IconSvg;
~~~~~~~

There is a lot going on in this component.

- We are using inline styles to enable
in-component calculation of style properties like in case of ```fontSize``` property.
- We are rendering several variations of the icon. Just the icon only. Icon with
text inline (slim). Icon with text below it.
- We are also influencing SVG styling based on our CSS variables
using ```currentColor``` property variable.
- Finally we are using SVG to render the icon itself.

Complete refactoring of Font Awesome icon font to SVG icons impacts a number of
components, however here is one component that is most impacted by the refactor.

{title="/app/components/CardStackInfo.jsx refactored component", lang=javascript}
~~~~~~~

import React from 'react';

import Card from './Card.jsx';

import IconSvg from './IconSvg.jsx';
import ICONS from '../fixtures/icons.js';

function CardStackInfo() {
  const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit u-textCenter';
  return (
    <div>
      <h1>Infographics Components</h1>

      <div className={gridClass}>
        <Card>
          <IconSvg
            color="default-text"
            icon={ICONS.DATABASE}
            size={70}
            text="Firebase React Integration"
          />
        </Card>
        <Card>
          <IconSvg
            color="secondary-text"
            icon={ICONS.CLOUD}
            size={70}
            text="Production Ready Demos"
          />
        </Card>
        <Card>
          <IconSvg
            color="primary-text"
            icon={ICONS.GLOBE}
            size={70}
            text="Nine Component Creation Strategies"
          />
        </Card>
      </div>
      <div className={gridClass}>
        <Card>
          <IconSvg
            color="primary-text"
            icon={ICONS.GITHUB}
            size={70}
            text="Popular GitHub Repository"
          />
        </Card>
        <Card>
          <IconSvg
            color="warning-text"
            icon={ICONS.CSS}
            size={70}
            text="ReactSpeed UI is efficient, CSS 4.6KB Gzip, 21KB Minified"
          />
        </Card>
        <Card>
          <IconSvg
            color="success-text"
            icon={ICONS.COMPONENTS}
            size={70}
            text="Powerful Webpack Workflow"
          />
        </Card>
      </div>

    </div>
  );
}

export default CardStackInfo;
~~~~~~~

As you notice, we have completely replaced ```IconText``` component with the
new  ```IconSvg``` component.

So, what are the optimization improvements of doing this refactor?

- Page size improving from 219KB to 149KB. Reducing our payload by 32% is awesome savings.
- External requests improving from 11 to 9 requests improves our responsiveness.
- No more Flash Of Missing Icons, as our React app now includes the icons as SVG.
This improves our user experience.
- Our developer experience also improves on several fronts. We can auto-lookup
our icons now from the editor as these are defined as constants. We have more
freedom to style the icons and infographics with pixel-level sizing.
- Our designers can also add custom SVG icons in the future.


React app optimization is a growing and interesting topic. We will continue to update
this chapter with new ideas and tools as we incorporate these into our workflow.

[1]: https://medium.com/@david.gilbertson/icons-as-react-components-de3e33cb8792#.ff03a45jm
[2]: https://icomoon.io
