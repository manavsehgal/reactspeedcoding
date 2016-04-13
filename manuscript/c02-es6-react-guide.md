# ES6 React Guide

This chapter guides you through important React concepts and ES6 features
for speeding up your React learning and development journey.

Let us revisit the Hello World code we wrote in the **Setup React Webpack** chapter, to understand
the React and ES6 features used so far.

## File and folder structure

React apps follow component based development. So understanding how components are organized,
how they relate to each other, simplifies several aspects of React. This includes how
React app folders and files are organized.

**Component Hierarchy.** React has parent components which import other child components.
This parent-child relationship continues across all components building a tree-like hierarchy.

In case of our Hello World example, ```index.js``` represents
the root parent component (one that does not have a parent).
The root component renders ```World``` component.
The ```World``` component is parent to ```Hello``` child component.

Root component inside a folder is named ```index.jsx```. Components other than root are
named same as the component class names, including camel case.

{title="Hello World files and folders", lang=text}
~~~~~~~
- /app
-- index.jsx
-- style.css
-- /components
--- Hello.jsx
--- World.jsx
- /build
- /node_modules
- .babelrc
- package.json
- webpack.config.js
~~~~~~~

## Component definition, export, and import

In React each component is typically defined in a single file. Any dependencies are
imported using ```import``` statement. The statement specifies name of the exported
component, constant, or function from the dependencies.

Dependencies are then used within a component by ```extend``` keyword to indicate
object-oriented inheritance. Dependencies are also used as child components
within a parent. Like in our case ```Hello``` child component is imported
by ```World``` parent component before it is rendered.

Similarly a module (file holding the component) exports a component
using ```export default``` keywords.

{title="Component definition, export, and import", lang=javascript}
~~~~~~~
import React from 'react';
import Hello from './Hello.jsx';

export default class World extends React.Component {
~~~~~~~

The constructor of our ```World``` component highlights three most important
features of how components talk to each other and the user.

**State.** Changing UI or internal state of a component is maintained using ```this.state```
object.

**Props.** Properties are the mechanism to pass data from parent to child components.

**Events.** Methods are bound to UI events (like onClick) to perform actions when the
event takes place.

{title="Constructor, state, props, event binding", lang=javascript}
~~~~~~~
constructor(props) {
  super(props);
  this.state = {greet: props.greet};
  this.slangGreet = this.slangGreet.bind(this);
  this.hindiGreet = this.hindiGreet.bind(this);
}
~~~~~~~


## Recommended reading list

- Get started with Facebook's perspective on using [ES6 in reusable components][1]. You can compare with ES5 style components within the same article.
- Review [Airbnb React/JSX Style Guide][2] for recommendations on using ES6 vs ES5 style.
- Babel has a post on [React on ES6+][3] which goes through various ES6 features relevant for coding in React.


[1]: https://facebook.github.io/react/docs/reusable-components.html#es6-classes
[2]: https://github.com/airbnb/javascript/tree/master/react
[3]: https://babeljs.io/blog/2015/06/07/react-on-es6-plus
