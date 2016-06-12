# React Speed Coding

[![build](https://travis-ci.org/manavsehgal/reactspeedcoding.svg?branch=master)](https://travis-ci.org/manavsehgal/reactspeedcoding)
[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?maxAge=2592000)](https://reactspeed.com)
[![Gitter](https://badges.gitter.im/manavsehgal/reactspeedcoding.svg)](https://gitter.im/manavsehgal/reactspeedcoding)
[![bitHound Code](https://www.bithound.io/github/manavsehgal/reactspeedcoding/badges/code.svg)](https://www.bithound.io/github/manavsehgal/reactspeedcoding)
[![bitHound Overall Score](https://www.bithound.io/github/manavsehgal/reactspeedcoding/badges/score.svg)](https://www.bithound.io/github/manavsehgal/reactspeedcoding)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/manavsehgal/reactspeedcoding/blob/master/LICENSE)

Companion code for React Speed Coding book is available here.

**Like this repo?** Get exclusive tips, code delivered to your inbox.
ReactSpeed helps you [Launch Apps Faster](http://eepurl.com/b5rx09).
Subscribers get exclusive access.

## [React Speed Coding book](https://leanpub.com/reactspeedcoding)

Download and read ebook, PDF, mobile formats. Support this project.

[![React Speed Coding Book](/app/public/img/react-speed-t.jpg)](https://leanpub.com/reactspeedcoding)

## [ReactSpeed.com](https://reactspeed.com/) website

- Component demos.
- Access ReactSpeed API for component design workflow.
- Discuss the book.
- Suggest new features for ReactSpeed UI library.

## Reuse code from book

- Launch quickly with fully functional ES6 React + Webpack starter.
- Add 30+ custom React components to your app.

Clone the repo like so.

```
git clone --depth=1 https://github.com/manavsehgal/reactspeedcoding.git
```

The ```--depth=1``` flag ensures that only the latest commit is cloned.

Run ```cd reactspeedcoding``` to change folder.

Remove references to our .git repo using ```rm -rf .git``` command.

Install dependencies using ```npm install``` command.

Run ReactSpeed app using ```npm start``` command.

Test using ```npm test``` command.

## License information

Code is [MIT][23] license.

Copyright (c) 2016 Manav Sehgal.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## [Setup React Webpack][3]

> Code: [React Webpack Starter Project][1].

- How to install Node.js and use Node Version Manager.
- Setup package.json to manage your NPM dependencies.
- Quick access companion code for this book using Github.
- Install starter dependencies for React, Webpack, and Babel.
- Create Webpack configuration for development pipeline automation.
- Write and run your first Hello World React app.

## [ES6 React Guide][4]

- How to organize your React app in folders and files.
- How to define a React component using ES6 syntax.
- What are modules and how to import and export React components.
- Why we need constructors.
- How components talk to each other and the UI using events, props, and state.
- Importance of stateless components.
- Using React Chrome Extension to inspect your component hierarchy at runtime.

## [Production Optimize Webpack][5]

> Code: [Production Optimized Webpack Config][2].

- Optimize React code for production bundle.
- Separate CSS for static or CDN serving.
- Bundle dependencies separately.
- Minify JavaScript code.
- Profiling Webpack generated build.
- Adding public assets for your app.
- Creating custom index template.

## [React Speed UI][7]

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

## [Start Component Design][9]

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

## [Define Component Internals][15]

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


## [Wire Multiple Components][15]

> Note: This chapter is TBD.

- When to use presentational verses container components.
- Strategy for passing component as a property to another component.
- Reconciliation algorithm and keys for dynamic children.

## [Routing Layout Components][16]

> Code: All 10 components are available under [/app/components][20]

- Learn about component layout strategies and create HomePage component.
- Develop Aside component.
- Create Footer component.
- Header component.
- Sidebar component.
- BlogPage layout component.
- Blog component.
- Post component.
- Router configuration.
- Navigation component.
- NavLink component.

## [Refactor Existing Components][17]

> Note: This chapter is TBD.

- Refactoring to render node children.
- ES5 to ES6 React component definition
- Testing and refactoring

## [Test App Components][21]

- Browsersync multi-device testing.
- JavaScript lint using eslint.
- Configuring eslint.
- Eslint command line interface.
- Eslint webpack integration.
- Fixing eslint reported problems.
- StyleLint for CSS.
- StyleLint CLI.
- Fixing StyleLint reported problems.
- Webpack integration for StyleLint.

## Component Design Workflow

> Note: This chapter is TBD.

Plan is to draw out the Big Picture of component design workflow.
Connecting the dots from prior five chapters which detail the workflow.

## [Firebase React Integration][18]

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

[1]: https://github.com/manavsehgal/reactspeedcoding/tree/master
[2]: https://github.com/manavsehgal/reactspeedcoding/blob/master/webpack.prod.config.js
[3]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-setup-react-webpack
[4]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-es6-react-guide-1
[5]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-production-optimize-webpack
[6]: https://github.com/manavsehgal/reactspeedcoding/tree/master/app/styles
[7]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-react-speed-ui
[8]: https://github.com/manavsehgal/reactspeedcoding/tree/master/app/components
[9]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-start-component-design-s
[10]: https://github.com/manavsehgal/reactspeedcoding/blob/master/app/components/YouTube.jsx
[11]: https://github.com/manavsehgal/reactspeedcoding/blob/master/app/components/GitHub.jsx
[12]: https://github.com/manavsehgal/reactspeedcoding/blob/master/app/components/Workflow.jsx
[13]: https://github.com/manavsehgal/reactspeedcoding/blob/master/app/components/IconText.jsx
[14]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-define-component-internals-d
[15]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-wire-multiple-components-w
[16]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-routing-component-layouts
[17]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-refactor-existing-components-r
[18]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-firebase-react-integration
[20]: https://github.com/manavsehgal/reactspeedcoding/tree/master/app/components
[21]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-test-app-components-t
[22]: http://creativecommons.org/licenses/by-nc-nd/3.0/deed.en_US
[23]: https://en.wikipedia.org/wiki/MIT_License
