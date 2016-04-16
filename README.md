# React Speed Coding Book and Companion Code

Companion code and manuscript of React Speed Coding book is available here.

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

## Component Design Workflow

> Note: This chapter is TBD.

## Firebase Platform Integration

> Note: This chapter is TBD.

## Redux State Management

> Note: This chapter is TBD.

## React Developer Experience

> Note: This chapter is TBD.

Topics planned: Kadira Storybook. Redux Dev Tools.

[1]: https://github.com/manavsehgal/reactspeedcoding/tree/master/code
[2]: https://github.com/manavsehgal/reactspeedcoding/blob/master/code/webpack.prod.config.js
[3]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-setup-react-webpack
[4]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-es6-react-guide-1
[5]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-production-optimize-webpack
[6]: https://github.com/manavsehgal/reactspeedcoding/tree/master/code/app/styles
[7]: https://leanpub.com/reactspeedcoding/read#leanpub-auto-react-speed-ui
