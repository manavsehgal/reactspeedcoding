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

{pagebreak}

## Kadira Storybook

So far we have tested our components using Enzyme along with Mocha and Chai. Sometimes you may
want to test UI of a complex custom component in isolation, within minimal development or production
like environment. You may want to do this test visually, interacting with the component,
as you update its design and code.

This is where [Kadira Storybook][2] steps in. You can install this neat tool using NPM.

```
npm i --save-dev @kadira/storybook
```

Once installed you can configure your storybook like so. Notice that we are importing
the CSS entry file for our app.

{title="/.storybook/config.js", lang=javascript}
~~~~~~~
import { configure } from '@kadira/storybook';
import '../app/style.css';

function loadStories() {
  require('../app/stories/button');
  require('../app/stories/workflow');
  // require as many stories as you need.
}

configure(loadStories, module);
~~~~~~~

We are also requiring certain stories for our components,
which we will define next. Here is the story for testing button native component.

{title="/app/stories/button.js", lang=javascript}
~~~~~~~
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Button', module)
  .add('with text, default color', () => (
    <button className="button default" onClick={action('clicked')}>My First Button</button>
  ))
  .add('with no text, primary color', () => (
    <button className="button primary"></button>
  ));
~~~~~~~

We also add a story for testing Workflow custom component.

{title="/app/stories/workflow.js", lang=javascript}
~~~~~~~
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Workflow from '../components/Workflow.jsx';

storiesOf('Workflow', module)
  .add('default', () => (
    <Workflow />
  ));
~~~~~~~

Now all that remains is to give Storybook its own webpack.config.js for running
the CSS loader. Notice that this is mostly copy of our app webpack config.

We have modified our paths to work from ```.storybook``` folder. We also remove
webpack-dev-server, hot reloading config, and JSX loader as Storybook brings its own.

{title="/.storybook/webpack.config.js", lang=javascript}
~~~~~~~
// Initialization
const webpack = require('webpack');
const postcssImport = require('postcss-easy-import');
const path = require('path');

const APP = path.join(__dirname, '../app');

// PostCSS support
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
        include: APP
      }
    ]
  },
  postcss: function processPostcss(webpack) {  // eslint-disable-line no-shadow
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      precss,
      autoprefixer({ browsers: ['last 2 versions'] })
    ];
  }
};
~~~~~~~

Now we can configure package.json to add shortcut script to run Storybook on port 9001.

```
"storybook": "start-storybook -p 9001"
```

Run the storybook with ```npm run storybook``` and view results at ```http://localhost:9001``` address.


[1]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
[2]: https://github.com/kadirahq/react-storybook
