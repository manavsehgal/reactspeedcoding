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

React app optimization is a growing and interesting topic. We will continue to update
this chapter with new ideas and tools as we incorporate these into our workflow.
