# React Developer Experience

This chapter adds more tools and techniques to your already powerful development workflow,
making it really awesome and fun to develop in React.

## Redux DevTools

Your Redux store is central to how your app manages state. To view how store changes
state, calls actions as you run your app, you can install [Chrome extension for Redux DevTools][1].

Once installed you will also require to update your store to recognize the DevTools.

```
const store = createStore(roadmapApp, window.devToolsExtension && window.devToolsExtension());
```

Now run your app and you will notice the Redux DevTools icon on your Chrome browser bar light up.

When you click this icon, you can navigate the store for your app as you take UI actions within
your app.




I> ## Chapter In Progress
I> We are still writing this chapter. Please watch this space for updates.
I> Plan is to add Kadira Storybook, create React playgrounds, Redux dev tools, and add
I> visual code analytics.

[1]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
