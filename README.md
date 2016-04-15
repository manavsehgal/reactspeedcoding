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

## Setup React Webpack

> Code: React Webpack [starter project][1].

Chapter contents:

- How to install Node.js and use Node Version Manager.
- Setup package.json to manage your NPM dependencies.
- Quick access companion code for this book using Github.
- Install starter dependencies for React, Webpack, and Babel.
- Create Webpack configuration for development pipeline automation.
- Write and run your first Hello World React app.

## ES6 React Guide

Chapter contents:

- How to organize your React app in folders and files.
- How to define a React component using ES6 syntax.
- What are modules and how to import and export React components.
- Why we need constructors.
- How components talk to each other and the UI using events, props, and state.
- Importance of stateless components.
- Using React Chrome Extension to inspect your component hierarchy at runtime.

## Production Optimize Webpack

> Code: Webpack [Production Optimized Config][2].

Chapter contents:

- Optimize React code for production bundle.
- Separate CSS for static or CDN serving.
- Bundle dependencies separately.
- Minify JavaScript code.
- Profiling Webpack generated build.

## Flexbox User Experience

> Note: This chapter is TBD.

Topics planned: Flexbox. PostCSS.

## Redux State Management

> Note: This chapter is TBD.

## React Development Experience

> Note: This chapter is TBD.

Topics planned: Kadira Storybook. Redux Dev Tools.

[1]: https://github.com/manavsehgal/reactspeedcoding/tree/master/code
[2]: https://github.com/manavsehgal/reactspeedcoding/blob/master/code/webpack.prod.config.js
