# Test App Components (T)

This chapter will walk you through multiple testing tools and strategies to make your
React app more reliable, robust, and performant.

## Browsersync multi-device testing

Our single page app is mobile-web friendly. It responds to smaller or larger screen sizes and adapts the UI accordingly.
As you continue mobile-web app development, you may want to test your app across multiple devices. Browsersync is a powerful tool that enables us to do that. It plays nicely with Webpack and Hot Reloading, while adding synchronized browsing of your app across connected devices.

Let us setup Browsersync for our development environment by installing following dependencies.

{title="Browsersync dependencies", lang=text}
~~~~~~~
npm install --save-dev browser-sync
npm install --save-dev browser-sync-webpack-plugin
~~~~~~~

Now let us update our Webpack development config, as Browsersync us primarily a development tool.

{title="webpack.config.js adding Browsersync", lang=javascript}
~~~~~~~

// some code...
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// some code...
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const PROXY = 'http://' + HOST + ':' + PORT;

// some code...
devServer: {
  historyApiFallback: true,
  hot: true,
  inline: true,
  progress: true,

  stats: 'errors-only',

  host: HOST,
  port: PORT,

  outputPath: BUILD
},

plugins: [
  new BrowserSyncPlugin(
    {
      host: HOST,
      port: PORT,
      proxy: PROXY
    },
    {
      reload: false
    }
  ),

// some code...
~~~~~~~

We require the ```browser-sync-webpack-plugin``` plugin. Initialize few ```const``` variables for host, port, and proxy.
Add the plugin for BrowserSync. And we are done!

Now you can test your setup by running ```npm start``` command in your terminal. You will notice a different output than usual ```webpack-dev-server``` screen.

{title="Browsersync + webpack-dev-server terminal", lang=text}
~~~~~~~
...
webpack: bundle is now VALID.
[BS] Proxying: http://localhost:8080
[BS] Access URLs:
 ------------------------------------
       Local: http://localhost:8081
    External: http://192.168.0.4:8081
 ------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.0.4:3001
 ------------------------------------
...
webpack: bundle is now VALID.
~~~~~~~

You now get 4 new URLs. Local and external are URLs you can use on multiple local browsers and multiple external devices respectively. UI related URLs enable you to configure Browsersync runtime. In our setup which is one a Mac with XCode installed, we use iOS Simulator to run virtual device for our tests. Opening Safari browser on this virtual device and browsing to the external URL gives us access to our app. We can also connect to real physical devices on the same network this way.

What the UI configuration links allow you to do is configure if synchronized browsing will capture code sync, clicks, scroll, and form actions. This way you can test on one device and browser and notice synchronized actions automatically on all your other devices. Browsersync also allows other advanced features like simulating network speeds and remote debugging. Go on... explore away.

What is really cool is that hot module reloading is still working with Browsersync active. So if you make any changes in your JSX, these should update on all devices on saving the changes. While maintaining your current UI state. Isn't this awesome!

Browsersync is a great time-saver for multi-devices testing of mobile-web hybrid apps.



I> ## Chapter In Progress
I> We are still writing this chapter. Please watch this space for updates.
I> Plan is to add examples for integrating various testing and lint tools
I> within your React development workflow.


[1]: http://airbnb.io/enzyme/
[2]: http://survivejs.com/webpack_react/linting_in_webpack/
