# Test App Components (T)

This chapter will walk you through multiple testing tools and strategies to make your
React app more reliable, robust, and performant.

{pagebreak}

## Browsersync multi-device testing

Our single page app is mobile-web friendly. It responds to smaller or larger screen sizes and adapts the UI accordingly.
As you continue mobile-web app development, you may want to test your app across multiple devices. [Browsersync][4] is a powerful tool that enables us to do that. It plays nicely with Webpack and Hot Reloading, while adding synchronized browsing of your app across connected devices.

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

What is really cool is that hot reloading is still working with Browsersync active. So if you make any changes in your JSX, these should update on all devices on saving the changes. While maintaining your current UI state. Isn't this awesome!

Browsersync is a great time-saver for multi-devices testing of mobile-web hybrid apps.

{pagebreak}

## JavaScript lint using eslint

Now that we are doing multi-device UI testing, let us move to the next stage. Let us test our JavaScript code
for good coding practices, getting hints as we code in our editor. Many commercial IDEs like XCode, Visual Studio, and IntelliJ provide this kind of feature while you are coding, without the need to compile first.

We are using [Atom][3] editor from GitHub. Atom can be configured to support such hints as well. All you need to do is install and configure Eslint configuration for Atom to pick up. So let us do that.

{title="Eslint dependencies", lang=text}
~~~~~~~
npm install --save-dev eslint
npm install --save-dev eslint-plugin-react
npm install --save-dev eslint-loader
npm install --save-dev eslint-friendly-formatter
npm install --save-dev eslint-config-airbnb
npm install --save-dev eslint-plugin-import
npm install --save-dev eslint-plugin-jsx-a11y
npm install --save-dev babel-eslint
~~~~~~~

Here is a brief explanation of these dependencies.

- eslint - Core dependency.
- eslint-plugin-react - React specific linting rules for ESLint.
- eslint-loader - Webpack loader for eslint.
- eslint-friendly-formatter - Custom formatter for eslint results. Add a nice summary of errors or warnings in the end, plus highlights statement causing the error or warning.
- eslint-config-airbnb - Airbnb style guide based eslint rules.
- eslint-plugin-import - Required for linting of ES2015+ (ES6+) import/export syntax.
- eslint-plugin-jsx-a11y - Support for accessibility rules on JSX elements.
- babel-eslint - Parser to replace eslint default if we are using class properties, decorators, async/await, types.

{pagebreak}

## Configuring eslint

Next we create default configuration of eslint by answering some questions about
our development stack and environment. Are we using JSX, React, ES6, among others.

{title="Init eslint configuration", lang=text}
~~~~~~~
node_modules/.bin/eslint --init
~~~~~~~

Resulting in eslint configuration file at root of our development folder.

{title=".eslintrc.js default configuration", lang=javascript}
~~~~~~~
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
~~~~~~~

We have made few changes after auto generating the config file.

- We are using the ```babel-eslint``` parser instead of eslint default parser.
- We have added eslint rules from Airbnb guidelines using the ```extends``` configuration.
- Changed indent and linebreak-style rules to warn instead of error and changed indent to 2 instead of 4 spaces.
- Added rule for comma-dangle to override Airbnb guidelines and revert to [eslint recommended guidelines][5].

As a final step to getting eslint hints in our Atom editor, let us add an Atom package.

{title="Terminal to add Atom eslint package", lang=text}
~~~~~~~
apm install linter-eslint
~~~~~~~

That's it. Now if you open a JSX/JS file in the Atom editor, you will notice eslint warnings and errors as you code.

{pagebreak}

## Eslint command line interface

We can take this a step further and add a script command in the package.json to
run lint as a separate command as needed.

We will create three commands for three types of result formats.
For default stylish results ```lint-st``` can be used, for tabular format ```lint-tb``` command,
and for using eslint-friendly-formatter we can use
the ```lint-ff``` command.

{title="lint command in package.json", lang=javascript}
~~~~~~~
"lint-st": "eslint . --ext .js --ext .jsx --cache || true",
"lint-tb": "eslint . --ext .js --ext .jsx --cache --format table || true",
"lint-ff": "eslint . --ext .js --ext .jsx --cache --format 'node_modules/eslint-friendly-formatter' || true"
~~~~~~~

Add ```.eslintignore``` to determine folders and files to be ignored by eslint tool.

{title=".eslintignore", lang=text}
~~~~~~~
# /node_modules and /bower_components ignored by default

# ignore vendor js files
app/public/js/*.js

# ignore build files
build/
~~~~~~~

Now if you hit ```npm run lint-st``` in your terminal, you will notice eslint warnings and errors if any exist
in your code.

When we first run ```eslint-ff``` our output looks something like this. Whoa! 245 problems.
The ```eslint-friendly-formatter``` allows us to take a quick look at the results
and reset any rules on/off/error/warn in the config before proceeding.

{title="eslint warnings and errors", lang=text}
~~~~~~~
...
x 245 problems (219 errors, 26 warnings)


Errors:
  54  http://eslint.org/docs/rules/object-curly-spacing
  29  http://eslint.org/docs/rules/quotes
  14  http://eslint.org/docs/rules/prefer-template
  12  https://google.com/#q=react%2Fjsx-first-prop-new-line
  11  http://eslint.org/docs/rules/space-before-function-paren
  11  https://google.com/#q=react%2Fprop-types
   9  http://eslint.org/docs/rules/prefer-const
   9  http://eslint.org/docs/rules/keyword-spacing
   8  http://eslint.org/docs/rules/semi
   7  https://google.com/#q=react%2Fjsx-indent
   6  https://google.com/#q=react%2Fjsx-closing-bracket-location
   5  https://google.com/#q=react%2Fjsx-indent-props
   4  https://google.com/#q=react%2Fprefer-stateless-function
   4  https://google.com/#q=react%2Fno-unknown-property
   4  http://eslint.org/docs/rules/eqeqeq
   4  http://eslint.org/docs/rules/no-multi-spaces
   3  http://eslint.org/docs/rules/no-unused-vars
   3  http://eslint.org/docs/rules/space-before-blocks
   2  https://google.com/#q=react%2Fjsx-space-before-closing
   2  http://eslint.org/docs/rules/object-shorthand
   2  http://eslint.org/docs/rules/new-cap
   2  http://eslint.org/docs/rules/no-extra-semi
   2  http://eslint.org/docs/rules/space-infix-ops
   1  http://eslint.org/docs/rules/padded-blocks
   1  http://eslint.org/docs/rules/no-spaced-func
   1  http://eslint.org/docs/rules/quote-props
   1  https://google.com/#q=react%2Fsort-comp
   1  https://google.com/#q=react%2Fjsx-no-bind
   1  http://eslint.org/docs/rules/no-nested-ternary
   1  https://google.com/#q=jsx-a11y%2Fimg-redundant-alt
   1  http://eslint.org/docs/rules/no-trailing-spaces
   1  http://eslint.org/docs/rules/no-undef
   1  http://eslint.org/docs/rules/prefer-arrow-callback
   1  http://eslint.org/docs/rules/max-len
   1  https://google.com/#q=react%2Fjsx-curly-spacing

Warnings:
  16  http://eslint.org/docs/rules/indent
   7  http://eslint.org/docs/rules/comma-dangle
   3  http://eslint.org/docs/rules/func-names
~~~~~~~

{pagebreak}

## Eslint webpack integration

Let us automate our development pipeline even further. Let us add eslint to Webpack development config.

{title="webpack.config.js adding eslint", lang=javascript}
~~~~~~~
// some code...
const LINT = __dirname + '/.eslintrc.js';
// some code...
module.exports = {
  // some code...
  eslint: {
    configFile: LINT,
    emitError: true
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: APP
      }
    ],  
~~~~~~~

Adding the eslint preLoader to the Webpack config does the trick. Now every time you run your
development server using ```npm start``` you will also run eslint. Your app will load in browser,
however terminal window will show any eslint errors or warnings. We suggest using this option
when you have run eslint once on your code and removed most errors and warnings. That way
you can use this option as a quick check in case you introduce any new errors/warnings
which you have missed while getting in-editor hints.

{pagebreak}

## Fixing first time eslint problems

When we first run eslint on ReactSpeed code we got 300+ problems (errors and warnings). Here is the workflow we are
following to fix these.

With so many problems there is the temptation to use eslint --fix flag to automatically fix these. However,
fixing these manually, we will learn more about our coding practices and correct these for good.

**Overview of problems.** We first run eslint command line interface using ```npm run lint-ff``` for eslint-friendly-formatter to tell us a snapshot of types of problems we encounter.

**Overriding rules.** Next we decide to override certain rules like ```comma-dangle``` and revert to
using eslint recommended rule instead of Airbnb recommendation. This step brings down our problems count
drastically.

**Ignore files.** We also run ```npm run lint-tb``` to take a quick look at all the files generating
the problems. We decide to ignore vendor files located in ```/app/public/js/``` folder of our app and
update the ```.eslintignore``` configuration.

**Changing parser.** We also change the parser to Babel from eslint default espree parser to handle
ES6/7 features like class properties.

**Editor hints.** Next we open our JSX files alphabetically in Atom editor to check eslint errors and warnings,
while fixing these as per suggestions given by eslint or determing the right fix.

**Hot testing.** We could keep the webpack-dev-server running on one terminal window, and eslint-ff running on another as we fix the problems and test the app in our browser. Thanks to Hot Reloading, we don't need to refresh our browser or
restart development server manually after every fix.

**Disable PreLoader.** During first run of eslint fixes when you have many problems, you may want to disable
the Webpack preLoader to avoid these warnings crowding any app errors you may introduce during fixes.

**Defer fix.** Sometimes we encounter problems that need more reading for fixing. One such problem we encounter is
the ```jsx-no-bind``` issue which requires [refactoring suggested here][6].

A> ## Elegance of React
A> We have an awesome realization about the simple elegance of React at this point.
A> When using Eslint in Atom editor hints we see hints for HTML indentation issues.
A> Oh, actually it is hints for HTML-like native components part of JSX.
A> Eslint has rules checking our logic as well as our presentation view at the same time.
A> Of course you also catch subtle errors when you copy-paste HTML and ignore JSX
A> specific camelCase attributes. Eslint is even checking accessibility rules
A> within JSX attribute values.
A> Never made possible before React!

**No-undef errors.** We encounter no-undef errors that ```$ is not defined``` at jQuery usage. This can be fixed
by adding ```"jquery" : true``` within the ```env``` section of eslintrc file. Once we change the config file,
just close and open the current JSX file to make the issue go away.

A> Running through all our JSX files and fixing most problems reduces
A> our overall count from 300+ problems earlier
A> to around 59 problems. A good day's work indeed.

**Ignore rules file specific.** Now that we have narrowed down to a manageable number of problems, we fix special
cases where it makes sense by ignoring eslint rules within specific files. We do this carefully after understanding
if it makes sense to bypass eslint for these specific situations.

{title="eslint output on terminal", lang=text}
~~~~~~~
x 12 problems (10 errors, 2 warnings)

Errors:
  4  https://google.com/#q=react%2Fprop-types
  2  http://eslint.org/docs/rules/object-shorthand
  1  http://eslint.org/docs/rules/quote-props
  1  https://google.com/#q=react%2Fjsx-no-bind
  1  http://eslint.org/docs/rules/prefer-arrow-callback
  1  https://google.com/#q=react%2Fprefer-stateless-function

Warnings:
  2  http://eslint.org/docs/rules/func-names
~~~~~~~

Next round of lint fixes on ```.js``` files leads to further reduction of the problems from 300+ down to around 12 problems. A count we can live with for now.


I> ## Chapter In Progress
I> We are still writing this chapter. Please watch this space for updates.
I> Plan is to add examples for integrating various testing tools
I> within your React development workflow.


[1]: http://airbnb.io/enzyme/
[2]: http://survivejs.com/webpack_react/linting_in_webpack/
[3]: https://atom.io/
[4]: https://www.browsersync.io/
[5]: http://eslint.org/docs/rules/
[6]: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
