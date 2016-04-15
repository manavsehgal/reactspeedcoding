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
the React and ES6 features used so far. Subsequent chapters introduce React and ES6 features
based on the context of samples written for the chapter. This spreads your learning journey
as you apply these concepts.

## File and folder structure

React apps follow component based development. So understanding how components are composed,
how they relate to each other, simplifies several aspects of your React learning path.
This includes understanding how React app folders and files are organized.

A> ## Ownership vs. Parent-Child
A> According to Facebook React docs, "It's important to draw a distinction between
A> the owner-ownee relationship and the parent-child relationship. The owner-ownee
A> relationship is specific to React, while the parent-child relationship is
A> simply the one you know and love from the DOM."

**Component Hierarchy.** React has owner components which render or set properties on other components.
This ownership continues across all components building a tree-like hierarchy.

**Root Component.** In case of our Hello World example, ```index.js``` represents
the root component (one that does not have an owner).
The root component owns and renders ```World``` component.
The ```World``` component is owner of ```Hello``` child component.

**Component File Naming.** Root component inside a folder is named ```index.jsx``` and the component name takes on the name of the folder, ```app``` in this case.
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
object-oriented inheritance. Dependencies are also used as rendered components
within an owner component. Like in our case ```Hello``` component is imported
by ```World``` owner component before it is rendered.

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
A> though this is on their 2.x roadmap. This is where Babel steps in. Read more about [Webpack ES6 support][7]
A> on the Webpack official docs.

## Constructor, state, props, and events

The constructor of our ```World``` component highlights three most important
features of how components talk to each other and the user.

**State.** Changing UI or internal state of a component is maintained using ```this.state```
JSON object. When state changes, rendered markup is updated by re-invoking ```render()```.

**Props.** Properties are the mechanism to pass input data from owner to rendered components.

**Events.** Functions or event handlers are bound to UI events (like onClick) to perform actions when the
event takes place.

Constructor is called when component is created, so it is the right place for following three objectives.

1. Passing props up within the inheritance tree. Using ```super(props)``` keyword.
2. Setting initial state. Using ```this.state``` JSON object.
3. Binding event handlers. Using ```bind(this)``` method.

{title="Constructor, state, event binding", lang=javascript}
~~~~~~~
constructor(props) {
  super(props);
  this.state = {
    currentGreeting: props.greet
  };
  this.slangGreet = this.slangGreet.bind(this);
  this.hindiGreet = this.hindiGreet.bind(this);
}
~~~~~~~

At the end of the class definition we define default properties and property types.
The ```propTypes``` are used in property validation during development to throw warnings
in the Browser's JavaScript console, if your code is not meeting the validation criteria.
Read more on [Prop Validation][11] in Facebook post that lists various types,
including custom validations.

{title="Default properties and types", lang=javascript}
~~~~~~~
World.propTypes = {
  greet: React.PropTypes.string.isRequired,
}

World.defaultProps = {
  greet: 'Hello',
}
~~~~~~~

So if you change the value of greet to any number, the app will run, however you will see following warning
in your browser console.

E> Warning: Failed propType: Invalid prop `greet` of type `number` supplied to `World`, expected `string`.

Here is a simple cheatsheet to remember these important concepts.

**Properties:** Passing input data from Root/Owner component to Child. Owner defines a property=value which is used within rendered component. The "Owner-ownee" relationship can exist without property passing, as in owner simply rendering a component.

{title="Owner component passing property", lang=javascript}
~~~~~~~
<Hello greet={ this.state.currentGreeting } message="World!" />
~~~~~~~

**State:** Defined within component whose state changes. State change updates rendered markup. Components can be stateless.

{title="Default state", lang=javascript}
~~~~~~~
this.state = {
  currentGreeting: props.greet
};
~~~~~~~

**Event Handlers:** Bind, define, UI association within event generating component. Components can exist with no events defined.

{title="Event function definition", lang=javascript}
~~~~~~~
slangGreet() {
  this.setState({currentGreeting: 'Yo!'});
}

hindiGreet() {
  this.setState({currentGreeting: 'Namaste'});
}
~~~~~~~

Associate event functions with UI.

{title="UI association with event function", lang=javascript}
~~~~~~~
<a href="#" onClick={ this.slangGreet }>
  Slang greeting
</a> OR <a href="#" onClick={ this.hindiGreet }>
  Hindi greeting
</a>
~~~~~~~

## Stateless components

Our ```Hello``` component is stateless. It does not define or change any state. According to [Airbnb style guide][8],
it is best to define stateless components as normal JavaScript functions. Results in fewer lines of easier to understand code.

{title="Stateless component definition", lang=javascript}
~~~~~~~
export default function Hello(props) {
  return (
    <div className="title-shadow">
      {props.greet} {props.message}
    </div>
  );
}
~~~~~~~

A> ## Why stateless components are important
A> According to Facebook, "In an ideal world, most of your components would be
A> stateless functions because in the future we'll also be able to make performance
A> optimizations specific to these components by avoiding unnecessary checks and memory allocations.
A> This is the recommended pattern, when possible."

## Recommended reading list

- **Style Guide.** Review [Airbnb React/JSX Style Guide][2] for recommendations on using ES6 vs ES5 syntax.
- **Mozilla Hacks.** Mozilla Hacks blog has [ES6 in depth][4] series, if you want to stay updated on the latest features.
- **Language Docs.** One of the most comprehensive language docs on ES6 are available at [ES6 support in Mozilla][5].
- **Facebook on Old vs. New React.** Get started with Facebook's perspective on using [ES6 in reusable components][1]. You can compare with ES5 style components within the same article.
- **Facebook on ES6 Classes in React.** Compares [ES6 classes][9] with proposed ES7 syntax.
- **Babel.** Babel has a post on [React on ES6+][3] which goes through various ES6/7 features relevant for coding in React. Note that some of the features, like Property Initializers, are NOT part of Babel presets for es2015 and react.
- **Components and Composability.** Facebook post on [Multiple Components][10] is a good read to understand how multiple components are composed, differences between React Owner-Ownee relationship and DOM Parent-Child. Note in section on Dynamic Children, React v15 has dropped the need for ```data-reactid``` or ```key=id``` required for lists.


[1]: https://facebook.github.io/react/docs/reusable-components.html#es6-classes
[2]: https://github.com/airbnb/javascript/tree/master/react
[3]: https://babeljs.io/blog/2015/06/07/react-on-es6-plus
[4]: https://hacks.mozilla.org/category/es6-in-depth/
[5]: https://developer.mozilla.org/en/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla
[6]: https://github.com/airbnb/javascript/tree/master/react#naming
[7]: http://webpack.github.io/docs/code-splitting.html#es6-modules
[8]: https://github.com/airbnb/javascript/tree/master/react#class-vs-reactcreateclass-vs-stateless
[9]: http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
[10]: https://facebook.github.io/react/docs/multiple-components.html
[11]: https://facebook.github.io/react/docs/reusable-components.html#prop-validation
