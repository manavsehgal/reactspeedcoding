# ES6 React Guide

This chapter guides you through important React concepts and ES6 features
for speeding up your React learning and development journey.

While Facebook React website is a good start to learn about React concepts. The pace of
change within React ecosystem means, most sample code on the website does not update to
match latest best practices.

Another challenge with learning React is that, there are more than one ways
to achieve a language goal. Many tutorials on the Web, including Facebook's official tutorials,
follow "lowest common denominator" rule when choosing what language pattern to use.
This may be wise while "cutting edge" is unstable, however, when standards are widely
adopted and there is a clear roadmap, like in case of ES6 over ES5, you want to code
while future proofing your apps.

For Speed Coding in React, ES6 is essential. Not only does it reduce the amount of code
you end up writing, ES6 also introduces language patterns for making your app better designed,
more stable, and performant.

Let us revisit the Hello World code we wrote in the **Setup React Webpack** chapter, to understand
the React and ES6 features used so far.

## File and folder structure

React apps follow component based development. So understanding how components are organized,
how they relate to each other, simplifies several aspects of you React learning path.
This includes how React app folders and files are organized.

**Component Hierarchy.** React has parent components which import other child components.
This parent-child relationship continues across all components building a tree-like hierarchy.

**Root Component.** In case of our Hello World example, ```index.js``` represents
the root parent component (one that does not have a parent).
The root component renders ```World``` component.
The ```World``` component is parent to ```Hello``` child component.

**Component File Naming.** Root component inside a folder is named ```index.jsx```.
Components other than root are named same as the component class names, including PascalCase.
Refer [naming conventions][6] in Airbnb style guide.

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

## Component class definition, export, and import

In React each component is typically defined in a single file, also known as a module.
Any dependencies are imported using ```import``` statement. The statement specifies name of the exported
component, constant, or function from the dependencies.

Dependencies are then used within a component by ```extend``` keyword to indicate
object-oriented inheritance. Dependencies are also used as child components
within a parent. Like in our case ```Hello``` child component is imported
by ```World``` parent component before it is rendered.

Similarly a module exports a component using ```export default``` keywords.

{title="Component definition, export, and import", lang=javascript}
~~~~~~~
import React from 'react';
import Hello from './Hello.jsx';

export default class World extends React.Component {
~~~~~~~

A> ## Webpack and ES6 Modules
A> Thinking in modules is central to how Webpack bundles your code and traces
A> dependencies while creating chunks. However, Webpack 1.x does not natively support ES6 modules,
A> thought this is on 2.x roadmap. This is where Babel steps in. Read more about [Webpack ES6 support][7]
A> on the Webpack official docs.

## Constructor, state, props, and events

The constructor of our ```World``` component highlights three most important
features of how components talk to each other and the user.

**State.** Changing UI or internal state of a component is maintained using ```this.state```
JSON object. When state changes, rendered markup is updated by re-invoking ```render()```.

**Props.** Properties are the mechanism to pass input data from parent to child components.

**Events.** Functions are bound to UI events (like onClick) to perform actions when the
event takes place.

Constructor is called when component is created, so it is the right place for following three objectives.

1. Setting initial state. Using ```this.state``` JSON object.
2. Binding events. Using ```bind(this)``` method.
3. Passing props up within the inheritance tree. Using ```super(props)``` keyword.

{title="Constructor, state, props, event binding", lang=javascript}
~~~~~~~
constructor(props) {
  super(props);
  this.state = {greet: props.greet};
  this.slangGreet = this.slangGreet.bind(this);
  this.hindiGreet = this.hindiGreet.bind(this);
}
~~~~~~~

Here is a simple cheatsheet to remember these important concepts.

**Properties:** Propagate input data from Root/Patent component to Child. Parent defines a property=value which is used within Child component. Parent child relationship can exist without property passing, as in parent rendering a child component.

**State:** Defined within component whose state changes. State change updates rendered markup. Components can be stateless.

**Event functions:** Bind, define, UI association within event generating component. Components can exist with no events defined.


## Recommended reading list

- **Facebook on Old vs. New React.** Get started with Facebook's perspective on using [ES6 in reusable components][1]. You can compare with ES5 style components within the same article.
- **Style Guide.** Review [Airbnb React/JSX Style Guide][2] for recommendations on using ES6 vs ES5 style.
- **Babel.** Babel has a post on [React on ES6+][3] which goes through various ES6 features relevant for coding in React.
- **Mozilla Hacks.** Mozilla Hacks blog has [ES6 in depth][4] series, if you want to stay updated on latest features.
- **Language Docs.** One of the most comprehensive language docs on ES6 are available at [ES6 support in Mozilla][5].


[1]: https://facebook.github.io/react/docs/reusable-components.html#es6-classes
[2]: https://github.com/airbnb/javascript/tree/master/react
[3]: https://babeljs.io/blog/2015/06/07/react-on-es6-plus
[4]: https://hacks.mozilla.org/category/es6-in-depth/
[5]: https://developer.mozilla.org/en/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla
[6]: https://github.com/airbnb/javascript/tree/master/react#naming
[7]: http://webpack.github.io/docs/code-splitting.html#es6-modules