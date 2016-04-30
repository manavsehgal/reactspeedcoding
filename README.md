# React Speed Coding Book and Companion Code

Companion code and manuscript of React Speed Coding book is available here.

[![React Speed Coding Book](/manuscript/images/title_page.png)](https://leanpub.com/reactspeedcoding)

[ReactSpeed Demo App](https://reactspeed.firebaseapp.com/) created using sample code from the book.

Clone the repo like so.

```
git clone --depth=1 https://github.com/manavsehgal/reactspeedcoding.git
```

The ```--depth=1``` flag ensures that only the latest commit is cloned.

```
- reactspeedcoding
-- manuscript # chapter content
-- code # sample code
```

Now cd to the ```code``` directory and install dependencies using ```npm install``` command.
Run sample app using ```npm start``` command.

## Setup React Webpack

> Code: [React Webpack Starter Project][1].

- How to install Node.js and use Node Version Manager.
- Setup package.json to manage your NPM dependencies.
- Quick access companion code for this book using Github.
- Install starter dependencies for React, Webpack, and Babel.
- Create Webpack configuration for development pipeline automation.
- Write and run your first Hello World React app.

## ES6 React Guide

- How to organize your React app in folders and files.
- How to define a React component using ES6 syntax.
- What are modules and how to import and export React components.
- Why we need constructors.
- How components talk to each other and the UI using events, props, and state.
- Importance of stateless components.
- Using React Chrome Extension to inspect your component hierarchy at runtime.

## Production Optimize Webpack

> Code: [Production Optimized Webpack Config][2].

- Optimize React code for production bundle.
- Separate CSS for static or CDN serving.
- Bundle dependencies separately.
- Minify JavaScript code.
- Profiling Webpack generated build.
- Adding public assets for your app.
- Creating custom index template.

## React Speed UI

> Code: [React Speed UI framework styles][6]

In this chapter we will start designing our very own React Speed UI framework
for your apps. We will do so using Flexbox, PostCSS, and custom React components.

Designing a custom UI framework is an ambitious undertaking. Our task becomes achievable if we scope
our design goals upfront.

**Speed.** Like the name suggests, our UI framework is built for speed of development and
creating performant apps.

**Single Page App.** We will design various UI components required for a single page app including
landing page, buttons, forms, navigation menu, interactive content cards, and footer.

**Responsive.** Our app will be responsive and components will render according to target screen size.

**Customizable.** We want our UI framework to be easily customizable using custom color themes.

**Reusable.** The UI frameworks will be reusable across multiple apps.

**Simple.** We will keep our UI framework simple to understand, extend, and reuse.

**Optimized.** Speed UI framework will be production ready and optimized for light payloads.

**Reactive.** This topic is TBD. We will see if using Microservices and Reactive architectural patterns
can be in scope of this book.

**State Machine.** Our UI framework will support state management. This is topic for an advanced chapter,
however we will consider this goal as we design the framework.

**Expressive.** Our UI framework will be reusable in expressive, English like statements.

## Start Component Design

> Code: [Page][8] component, [YouTube][10] component, [GitHub][11] component, [Workflow][12] component,  
> [IconText][13] component.

The objective at this stage is to speedily "prototype" new features and code within your React project.
Subsequent chapters on **Designing Component Internals**, **Wiring Multiple Components**, and **Refactoring Existing Components** will go over best practices to create performant, reusable, and maintainable code.

- Designing React components rapidly from samples available on the Web.
- Using Web Embeds like YouTube, Flickr, Twitter, to create React components.
- Integrating third-party REST APIs to start creating React components.
- Moving from a wireframe to a React component.
- Starting with a data table and turing this into a React component.
- How to handle real-time streams as a React component.
- How to model documents as a React component.
- How to enhance HTML elements as React components.

## Design Component Internals

> Note: This chapter is TBD.

- Naming files, folders, and modules (Df)
- Imports and exports (Di)
- Stateless components and pure functions (Dp)
- Classes and inheritance (Dc)
- Constructor and binding (Db)
- Property types (Dt)
- State management (Ds)
- Lifecycle methods (Dl)
- Render and ReactDOM.render methods (Dr)
- JSX features and syntax (Dj)


## Wire Multiple Components

> Note: This chapter is TBD.

- When to use presentational verses container components.
- Strategy for passing component as a property to another component.
- Reconciliation algorithm and keys for dynamic children.

## Refactor Existing Components

> Note: This chapter is TBD.

- Refactoring to render node children.
- ES5 to ES6 React component definition
- Testing and refactoring

## Test App Components

> Note: This chapter is TBD.

Plan is to add examples for integrating various testing and lint tools
within your React development workflow.

## Component Design Workflow

> Note: This chapter is TBD.

Plan is to draw out the Big Picture of component design workflow.
Connecting the dots from prior five chapters which detail the workflow.

## Firebase React Integration

> Note: This chapter is in progress.

- Compare Firebase with another popular framework Meteor.
- Host your front-end app using Firebase hosting.
- How Firebase stores files and data.
- Designing a REST API using Firebase.
- For what kind of apps is Firebase not ideal.

## React Developer Experience

> Note: This chapter is TBD.

Plan is to add Kadira Storybook, create React playgrounds, Redux dev tools, and add
visual code analytics.


[1]: https://github.com/manavsehgal/reactspeedcoding/tree/master/code
[2]: https://github.com/manavsehgal/reactspeedcoding/blob/master/code/webpack.prod.config.js
[3]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-setup-react-webpack
[4]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-es6-react-guide-1
[5]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-production-optimize-webpack
[6]: https://github.com/manavsehgal/reactspeedcoding/tree/master/code/app/styles
[7]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-react-speed-ui
[8]: https://github.com/manavsehgal/reactspeedcoding/tree/master/code/app/components
[9]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-starting-component-design-s
[10]: https://github.com/manavsehgal/reactspeedcoding/blob/master/code/app/components/YouTube.jsx
[11]: https://github.com/manavsehgal/reactspeedcoding/blob/master/code/app/components/GitHub.jsx
[12]: https://github.com/manavsehgal/reactspeedcoding/blob/master/code/app/components/Workflow.jsx
[13]: https://github.com/manavsehgal/reactspeedcoding/blob/master/code/app/components/IconText.jsx
