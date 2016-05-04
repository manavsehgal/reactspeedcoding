# Define Component Internals (D)

This chapter does a deep dive into best practices for defining your React component internals.
We will add naming conventions to our best practice guidance, mostly following three sources.

- The official [Facebook React docs and tutorials][2]
- [Airbnb React style guide][1]
- We will also add ES6 features and best practices which make your component design
more readable, reusable, and robust.

To maintain this chapter as an easy to follow *cheatsheet* format, we will only
list minimal code snippets from samples discussed in other chapters and focus on
the guidelines and strategies for designing component internals.

You will learn following concepts in this chapter.

- Naming files, folders, and modules (Df)
- Imports and exports (Di)
- Stateless components and pure functions (Dp)
- Classes and inheritance (Dc)
- Constructor and binding (Db)
- Property types (Dt)
- State management (Ds)
- Lifecycle methods (Dl)
- Event handlers (De)
- Render and ReactDOM.render methods (Dr)
- JSX features and syntax (Dj)

{pagebreak}

## Naming files, folders, and modules (Df)

This section outlines strategies for organizing and naming files, folders, and modules, within
your React app.

- Use ```.jsx``` extension for React components.
- Entry point for app is ```/app/index.jsx``` file.
- Root component name ```app``` is picked up from folder containing ```index.jsx``` file.
- PascalCase for component file names. Like ```CardStack.jsx``` component.
- Use PascalCase for referencing imported React components.
- Use camelCase for variable names representing instances of React components.
- Presentational components go into ```/app/components``` folder.
- Container components go into ```/app/containers``` folder.
- Entry point for styles is ```/app/style.css``` file which imports the partials.
- Style partials follow ```_component_name.css``` naming within ```/app/styles``` folder.

{pagebreak}

## Imports and exports (Di)

A> Note that import and export of modules is an ES6 feature.

You will start React component definition with a set of import statements referencing
modules which are your component dependencies. You will also export the component you are
defining in a ```ComponentName.jsx``` file.

- Use ```import ComponentName from 'library';``` statement to import modules.
- App entry point ```index.jsx``` requires React and ReactDOM modules.
- ReactDOM module exposes DOM-specific methods.
- React module has the core tools shared by React on different platforms like, React Native.
- You can use ```import {Module1, Module2} from 'library';``` to import specific modules
directly. This way you can reduce some coding by referencing these modules directly.

{title="import statement for default and other exports", lang=javascript}
~~~~~~~
import React, {PropTypes} from 'react';
~~~~~~~

- Alias an imported member name and use the alias within your code.

{title="import statement using alias", lang=javascript}
~~~~~~~
import React, {VeryLongModuleName as shortName} from 'react';
~~~~~~~

- Use ```export default``` statements to prefix component name declaration for exporting.

{title="export statement for class and pure function", lang=javascript}
~~~~~~~
export default class Card extends React.Component {...

export default function YouTube(props) {...
~~~~~~~

{pagebreak}

## Stateless components and pure functions (Dp)

- If there are no states or refs then prefer normal functions over classes.
- Multiple stateless components are allowed per file.
- You can declare a stateless component function with props.
- Declare a stateless component function with specific properties using destructuring assignment.

{title="Stateless component definition", lang=javascript}
~~~~~~~
export default function YouTube(props) {...

export default function YouTube({videoid}) {...
~~~~~~~

- Cannot use stateless components when rendering ```this.props.children``` within your component.

{pagebreak}

## Classes and inheritance (Dc)

Classes are introduced in ES6 syntax for defining React components.

- Only one component using class definition per file.
- React ES6 classes do not support Read Mixins.
- Methods do not automatically bind ```this``` to the class instance. Explicitly use bind statement.

{title="Explicit method bind", lang=javascript}
~~~~~~~
constructor(props) {
  super(props);
  // some code...
  this.handleNameChange = this.handleNameChange.bind(this);
}
~~~~~~~

- Custom React components often extend React.Component.
- React.Component API provides setState() to perform a shallow merge of nextState into current state. This is the primary method you use to trigger UI updates from event handlers and server request callbacks.

{title="setState method", lang=javascript}
~~~~~~~
handleNameChange(event) {
  this.setState({value: event.target.value});
}
~~~~~~~

- Treat ```this.state``` as immutable. Do not change its value directly. Use ```setState``` method instead.
- Avoid using ```forceUpdate``` method from React.Component API. Instead use render method to read from props and state. This makes your component "pure" in the sense that its output render is predictable based on input props.
- ES6 class components that extend React.Component do not have ```isMounted```, ```replaceProps```, ```setProps```, ```replaceState``` and ```getDOMNode``` methods. These may be removed from React API in future releases.


## Constructor and binding (Db)

Constructors are a feature of ES6 classes. Constructor methods are called once per instance of a component.

- First statement in a construction is ```super(props)``` which passes the props within the inheritance tree.
- Use constructor to bind methods. This is better for performance as it is bound once and also when using ```shouldComponentUpdate()``` method for shallow comparison in the child components.

{title="Explicit method bind", lang=javascript}
~~~~~~~
constructor(props) {
  super(props);
  // some code...
  this.handleNameChange = this.handleNameChange.bind(this);
}
~~~~~~~

- Use constructor to declare propTypes and set defaultProps.
- Setting default state can be done within the constructor.

## Property types (Dt)

Defining property types makes your code more reliable.

- Import ```{PropTypes}``` from react dependency.
- Define property types using ```static propTypes = {} ``` statement in ES6.

{title="Defining propTypes", lang=javascript}
~~~~~~~
static propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
  rotate: PropTypes.number,
  flip: PropTypes.oneOf(['horizontal', 'vertical']),
  inverse: PropTypes.bool
}
~~~~~~~

- Set default properties using ```static defaultProps = {}``` statement in ES6.

{title="Setting defaultProps", lang=javascript}
~~~~~~~
static defaultProps = { size: '', message: false }
~~~~~~~

- Property type violations show up as warnings in browser console.
- You can define property types for array, string, number, and bool.
- Define property type for methods, like event handling methods
propagating from owner component, using ```PropTypes.func``` statement.
- You can define a property type as required using ```.isRequired``` statement.
- You can define custom property validator with associated ```Error``` message.

{title="Custom property validator example from Facebook", lang=javascript}
~~~~~~~
customProp: function(props, propName, componentName) {
  if (!/matchme/.test(props[propName])) {
    return new Error(
      'Invalid prop `' + propName + '` supplied to' +
      ' `' + componentName + '`. Validation failed.'
    );
  }
}
~~~~~~~

Using propTypes and defaultProps is essential for defining robust and reliable React components.

## State management (Ds)

This section discussed when to use state and how.

- State should contain data that a component's event handlers may change to trigger a UI update.
- Owner component where state is defined usually also defines event handlers manipulating this state.
- Always define state at the highest level in a component hierarchy.
- If you want to know prior value of a prop within your app, state could be used to store prop history.
- Define minimal state for a component.
- Most components in your library should be stateless components.
- If the component data is passed from an owner component via props, it probably isn't state.
- If the component data does not change over time, it probably isn't state.
- Do not define state to replace computed properties or computed states.
- For controlled components in forms, like input, use ```this.state.value``` and value prop to
manage state outside of the component.

{title="Controlled native input component", lang=html}
~~~~~~~
<input
  type="text" value={this.state.value}
  placeholder="Enter a name"
  onChange={this.handleNameChange}
/>
~~~~~~~

- For uncontrolled components which do not use value prop, manage state within the component.
- Set default state in constructor after ```super(props)``` statement using ```this.state = {}``` statement.

{title="Set default state", lang=javascript}
~~~~~~~
constructor(props) {
  super(props);
  this.state = {
    currentGreeting: props.greet,
    value: 'ReactSpeed'
  };
  // some code...
}
~~~~~~~

- Manipulate state in event handler methods using ```this.setState({})``` method.

{title="State manipulation", lang=javascript}
~~~~~~~
handleNameChange(event) {
  this.setState({value: event.target.value});
}
~~~~~~~

State management is one of the most powerful React features. Use it responsibly!

## Lifecycle methods (Dl)

How to decide which lifecycle methods to use and why.

## Event handlers (De)

Event handler methods bind to React ES6 components for manipulating component state.

- Always bind event handler methods within constructor. This is more performant.

{title="Explicit method bind", lang=javascript}
~~~~~~~
constructor(props) {
  super(props);
  // some code...
  this.handleNameChange = this.handleNameChange.bind(this);
}
~~~~~~~

- Bind event handler method within on<Event> statement when passing custom parameters to the event handler.

{title="Custom parameter passing to even handler method", lang=javascript}
~~~~~~~
handleButtonClick(color) {
  this.setState({demoMessage: `Button ${color} clicked.`});
}
~~~~~~~

- Define event handler methods at highest level owner component in a component hierarchy.
- Define event handlers in components where you define state.

## Render and ReactDOM.render methods (Dr)

Important things to remember about render method and ReactDOM.render.

- ReactDOM.render method should only be called after the composite components have been defined.
- ReactDOM.render instantiates the root component, starts the react framework, and injects the
markup into a raw DOM element, provided as the second argument.

{pagebreak}

## JSX features and syntax (Dj)

JSX is what you write within ```render() return()``` method. JSX gets transpiled to JS
by Babel in our build environment.

- JSX HTML-like tags are React framework native components representing HTML tags and attributes.
- JSX components use ```className``` instead of ```class``` when specifying CSS classes.

I> ## Chapter In Progress
I> We are still writing this chapter. Please watch this space for updates.
I> Plan is to add checklist of guidance for each section of component definition.


[1]: https://github.com/airbnb/javascript/tree/master/react
[2]: https://facebook.github.io/react/index.html
