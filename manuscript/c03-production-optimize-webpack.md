# Production Optimize Webpack

If you recall from the **Setup React Webpack** chapter, our build size is approaching 2MB.
This is not viable for a small Hello World app. In this chapter we will optimize our Webpack
configuration for production use case.

We will cover following topics in this chapter.

- Optimize React code for production bundle.
- Separate CSS for static or CDN serving.
- Bundle dependencies separately.
- Minify JavaScript code.

## Recommended Reading List

We will refer to following excellent articles and posts in order to build our understanding
around production optimization when it relates to Webpack, React, and other components of our toolchain.

- SurviveJS has excellent coverage on Webpack and specific chapter on [build optimization using Webpack][1]. We highly recommend buying this book as an excellent companion to reading **React Speed Coding**.
- Post on [The Ultimate Webpack Setup][2] by Christian Alfoni.
- Webpack's "sparse" documentation on [build optimization][3] is more relevant for development workflow than production code.
- Webpack [wiki docs cover optimization][4] topics around chunking, minifying, and de-duplication.

## Add production plugins to Webpack

For production. Plugins add functionality to Webpack.

```
npm install --save-dev clean-webpack-plugin
npm install --save-dev extract-text-webpack-plugin
```

[1]: http://survivejs.com/webpack_react/building_kanban/
[2]: http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
[3]: http://webpack.github.io/docs/build-performance.html
[4]: https://github.com/webpack/docs/wiki/optimization
