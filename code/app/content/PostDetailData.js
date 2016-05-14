const PostDetailData = [
  {
    id: 1,
    content:
`
Reddit is one of the most respected news sources for developers.
React subreddit is frequented by more that 10,000 developers voting on
their favorite React news and trends. Recently ReactSpeed book enjoyed
trending as top voted news in React for a day! We are so proud and excited.

We enjoy following Reddit news and users' reactions.
This gives us valuable insights on what is trending in React community.
It also guides us on what to write in our React Speed Coding book.

As learning from the Reddit community we are enhancing
focus on Redux related content, adding visualiation APIs to our
component todo list, and improving our Angular 2 v React section.
`
  },
  {
    id: 2,
    content:
`
To help understand how to wire multiple components in React,
let us create a relatively complex app to manage the the roadmap for ReactSpeed
book and companion code. We want to list upcoming and recent content and code features.
Users should have the capability to Like features they want to see first.

Our roadmap app will require a component to render the individual feature.
It will also require a component to manage a list of feature components. We would
also add a search box. A filter component will list features by categories
like components, styles, chapters, sections, and strategies.

You will note that various components within this app will interact with each
other (blue dashed lines in the wireframe). Changing filters will interact
with search, reducing the scope of what can be searched.
Search will interact with features, showing only features
that match the text entered in search. Number of likes will interact with order of features.
Our app will also maintain several UI states. Some candidate states could be,
active filter, order of features, search text, and last Like clicked.
`
  },
  {
    id: 3,
    content:
`
Our single page app is mobile-web friendly.
It responds to smaller or larger screen sizes and adapts the UI accordingly.
As you continue mobile-web app development, you may want to test your
app across multiple devices.
Browsersync is a powerful tool that enables us to do that.
It plays nicely with Webpack and Hot Reloading,
while adding synchronized browsing of your app across connected devices.

Here is how to configure Browsersync within Webpack config.

**webpack.config.js adding Browsersync**
| [Code explained in the Book](https://leanpub.com/reactspeedcoding/read#leanpub-auto-browsersync-multi-device-testing)

---

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

---

Eslint combined with Atom editor package and Webpack is a
really powerful first-line-of-defense to make
your React code more readable and reliable. Really fast, while you code each line!
This will save
you significant time in downstream testing, team on-boarding, releases, and refactoring.

**.eslintrc.js default configuration**
| [Code explained in the Book](https://leanpub.com/reactspeedcoding/read#leanpub-auto-configuring-eslint)

---

    module.exports = {
      "parser": "babel-eslint",
      "rules": {
        "strict": 0
      },
      "env": {
        "browser": true,
        "es6": true
      },
      "extends": "airbnb",
      "parserOptions": {
        "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "jsx": true
        },
        "sourceType": "module"
      },
      "plugins": [
        "react"
      ],
      "rules": {
        "comma-dangle": [
          "warn",
          "never"
        ],
        "indent": [
          "warn",
          2
        ],
        "linebreak-style": [
          "warn",
          "unix"
        ],
        "quotes": [
          "error",
          "single"
        ],
        "semi": [
          "error",
          "always"
        ]
      }
    };

---

Just like the awesome ESLint tool for JavaScript,
we have StyleLint for CSS.

**Add StyleLint Webpack plugin**
| [Code explained in the Book](https://leanpub.com/reactspeedcoding/read#leanpub-auto-webpack-integration-for-stylelint)

---

    // some code...
    const StyleLintPlugin = require('stylelint-webpack-plugin');
    // some code...
    const STYLELINT = ['./app/styles/**/*.css', './app/styles.css'];
    // some code...
    plugins: [
      new StyleLintPlugin({
        files: STYLELINT,
        syntax: 'scss'
      }),
    // some code...

---

That's all it takes. Adding the *stylelint-webpack-plugin* into our webpack development config.

`
  },
  {
    id: 4,
    content:
`
You will create several new components in this chapter.
Actually 10 new components!

Learn about component layout strategies and create HomePage component.
Develop Aside component. Create Footer component. Header component. Sidebar component.
BlogPage layout component. Blog component. Post component. Router configuration.
Navigation component. NavLink component.

React Router can help us map navigation tree with our component tree.
Right now our intent
is to have Blog and Home as same level menus and represent different layout components.
`
  }
];

export default PostDetailData;
