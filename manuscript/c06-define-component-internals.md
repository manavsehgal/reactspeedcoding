# Define Component Internals

This chapter does a deep dive into best practices for defining your React component internals.
We will add naming conventions to our best practice guidance, mostly following two sources.

- The official [Facebook React docs and tutorials][2]
- [Airbnb React style guide][1]

We will also add ES6 features and best practices which make your component design
more readable, reusable, and robust.

In this chapter we will also expand on our React Speed UI framework by adding several
new components.

## Imports and exports

Important things to remember about imports and exports.

- App entry point index.jsx requires React and ReactDOM modules.
- ReactDOM module exposes DOM-specific methods.
- React module has the core tools shared by React on different platforms like, React Native.


## Stateless components

How to decide and define.

## Classes and inheritance

## Constructor and binding

## Property types

Various tricks we can do with properties like spread operator, destructuring assignment,
Component for custom DOM element as property.

## State management

When to use state and how.

## Lifecycle methods

How to decide which lifecycle methods to use and why.

## Render and ReactDOM.render methods

Important things to remember about render method and ReactDOM.render.

- ReactDOM.render method should only be called after the composite components have been defined.
- ReactDOM.render instantiates the root component, starts the react framework, and injects the
markup into a raw DOM element, provided as the second argument.


## JSX features and syntax

JSX is what you write within ```render() return()``` method. JSX gets transpiled to JS
by Babel in our build environment.

Important things to remember about JSX.

- JSX HTML-like tags are React framework components representing HTML tags and attributes.
- JSX components use ```className``` instead of ```class``` when specifying CSS classes.
-

[1]: https://github.com/airbnb/javascript/tree/master/react
[2]: https://facebook.github.io/react/index.html
