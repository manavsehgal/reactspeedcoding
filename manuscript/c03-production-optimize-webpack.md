# Production Optimize Webpack

If you recall from the **Setup React Webpack** chapter, our build size is approaching 2MB.
This is not viable for a small Hello World app. In this chapter we will optimize our Webpack
configuration for production use case.

We will cover following topics in this chapter.

- Optimize React code for production bundle.
- Separate CSS for static or CDN serving.
- Bundle dependencies separately.
- Minify JavaScript code.

## Add production plugins to Webpack

For production. Plugins add functionality to Webpack.

```
npm install --save-dev clean-webpack-plugin
npm install --save-dev extract-text-webpack-plugin
```
