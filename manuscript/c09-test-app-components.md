# Test App Components (T)

This chapter will walk you through multiple testing tools and strategies to make your
React app more reliable, robust, and performant.

We will learn the following topics in this chapter.

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
- Separating Webpack test config.

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

You now get 4 new URLs. Local and external are URLs you can use on multiple local browsers and multiple external devices respectively. UI related URLs enable you to configure Browsersync runtime. In our setup, which is a Mac with XCode installed, we use iOS Simulator to run virtual device for our tests. Opening Safari browser on this virtual device and browsing to the external URL gives us access to our app. We can also connect to real physical devices on the same network this way.

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
For default stylish results ```elint``` can be used, for tabular format ```elinttable``` command,
and for using eslint-friendly-formatter we can use
the ```elintsummary``` command.

{title="lint command in package.json", lang=javascript}
~~~~~~~
"elint": "eslint . --ext .js --ext .jsx --cache || true",
"elinttable": "eslint . --ext .js --ext .jsx --cache --format table || true",
"elintsummary": "eslint . --ext .js --ext .jsx --cache --format 'node_modules/eslint-friendly-formatter' || true",
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

Now if you hit ```npm run elint``` in your terminal, you will notice eslint warnings and errors if any exist
in your code.

When we first run ```npm run elintsummary``` our output looks something like this. Whoa! 245 problems.
The ```eslint-friendly-formatter``` allows us to take a quick look at the summary results
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

## Fixing eslint reported problems

When we first run eslint on ReactSpeed code we got 300+ problems (errors and warnings). Here is the workflow we are
following to fix these.

With so many problems there is the temptation to use eslint --fix flag to automatically fix these. However,
fixing these manually, we will learn more about our coding practices and correct these for good.

**Overview of problems.** We first run eslint command line interface using ```npm run elintsummary``` for eslint-friendly-formatter to tell us a snapshot of types of problems we encounter.

**Overriding rules.** Next we decide to override certain rules like ```comma-dangle``` and revert to
using eslint recommended rule instead of Airbnb recommendation. This step brings down our problems count
drastically.

**Ignore files.** We also run ```npm run elinttable``` for table format report,
to take a quick look at all the files generating
the problems. We decide to ignore vendor files located in ```/app/public/js/``` folder of our app and
update the ```.eslintignore``` configuration.

**Changing parser.** We also change the parser to Babel from eslint default espree parser to handle
ES6/7 features like class properties.

**Editor hints.** Next we open our JSX files alphabetically in Atom editor to check eslint errors and warnings,
while fixing these as per suggestions given by eslint or determing the right fix.

**Hot testing.** We could keep the webpack-dev-server running on one terminal window, and ```elintsummary``` running on another as we fix the problems and test the app in our browser. Thanks to Hot Reloading, we don't need to refresh our browser or
restart development server manually after every fix.

**Disable PreLoader.** During first run of eslint fixes when you have many problems, you may want to disable
the Webpack preLoader to avoid these warnings crowding any app errors you may introduce during fixes.

**Defer fix.** Sometimes we encounter problems that need more reading for fixing. One such problem we encounter is
the ```jsx-no-bind``` issue which requires [refactoring suggested here][6].

**No-undef errors.** We encounter no-undef errors that ```$ is not defined``` at jQuery usage. This can be fixed
by adding ```"jquery" : true``` within the ```env``` section of eslintrc file. Once we change the config file,
just close and open the current JSX file to make the issue go away.

A> Running through all our JSX files and fixing most problems reduces
A> our overall count from 300+ problems earlier
A> to around 59 problems. A good day's work indeed.

**Selectively Disable Eslint.** We can selectively disable Eslint rules for some of the code. We do this by adding
a comment starting with ```eslint-disable``` for disabling all rules for code that follows. Enable it back with ```eslint-enable``` in comment. Use ```eslint-disable-line``` to disable all rules for a line of code.
Suffix this with a specific rule name to only disable that rule for specific line of code.

{title="eslint disable rule", lang=javascript}
~~~~~~~
'NODE_ENV': JSON.stringify('production') // eslint-disable-line quote-props
~~~~~~~

We are disabling ```quote-props``` eslint rule check for this line of code which is used as-is from
most recommended sources including Facebook React documentation.

**Refactor Components.** Next set of eslint fixes require refactoring components to Airbnb best practices. We refactor
the ```Hello```, ```YouTube```, and ```LeanPub``` components to use Arrow functions and PropTypes to fix these errors.

{title="Refactored YouTube component", lang=javascript}
~~~~~~~
import React from 'react';

const YouTube = ({ videoid }) =>
  <iframe
    className="youtube"
    width="100%"
    height="100%"
    src={`https://www.youtube.com/embed/${videoid}?rel=0&amp;controls=0&amp;showinfo=0`}
    frameBorder="0"
    allowFullScreen
  >
  </iframe>;

YouTube.propTypes = { videoid: React.PropTypes.string };

export default YouTube;
~~~~~~~

This round of lint fixes leads to further reduction of the problems from 300+ down to around 3 problems. A count we can live with for now.

{title="eslint output on terminal", lang=text}
~~~~~~~
x 3 problems (3 errors, 0 warnings)

Errors:
  1  https://google.com/#q=react%2Fprop-types
  1  https://google.com/#q=react%2Fprefer-stateless-function
  1  https://google.com/#q=react%2Fjsx-no-bind
~~~~~~~

A> ## Elegance of React
A> We have an awesome realization about the simple elegance of React at this point.
A> When using Eslint in Atom editor we see hints for HTML indentation issues.
A> Oh, actually these are hints for HTML-like native components part of JSX.
A> Eslint has rules checking our logic as well as our presentation view at the same time.
A> Of course you also catch subtle errors when you copy-paste HTML and ignore JSX
A> specific camelCase attributes. Eslint is even checking accessibility rules
A> within JSX attribute values.
A> Never made possible before React!

**Custom lint rules.** We can add more eslint rules to our tests from the [full list of rules here][5].
The [complexity rule][7] is an interesting one to add for code readability.

{title=".eslintrc.js custom rules", lang=javascript}
~~~~~~~
module.exports = {
  // some code...
  "rules": {
    "complexity": ["warn", 2],
    "no-unused-expressions": "warn",
    "no-useless-concat": "warn",
    "block-scoped-var": "error",
    "consistent-return": "error"
  }
};
~~~~~~~

Eslint combined with Atom editor package and Webpack is a really powerful first-line-of-defense to make
your React code more readable and reliable. Really fast, while you code each line! This will save
you significant time in downstream testing, team on-boarding, releases, and refactoring.

{pagebreak}

## StyleLint for CSS

Just like the awesome ESLint tool for JavaScript, we have StyleLint for CSS.

By now we are familiar with the setup and workflow. We follow similar steps to integrate StyleLint.

Let us add the dependencies.

{title="StyleLint dependencies", lang=text}
~~~~~~~
npm install --save-dev stylelint
npm install --save-dev stylelint-config-standard
npm install --save-dev stylelint-webpack-plugin
~~~~~~~

Here is what these dependencies do.

- stylelint - The core library offering lint rules processing and issue reporting for CSS.
- stylelint-config-standard - The standard shareable config for stylelint. Derived from the rules found within: The Idiomatic CSS Principles, Github's PrimerCSS Guidelines, Google's CSS Style Guide, Airbnb's Styleguide, and @mdo's Code Guide.
- stylelint-webpack-plugin - As the name suggest a StyleLint plugin for Webpack. Benefits over stylelint-loader alternative include processing ```@imports``` and partials and simpler Webpack setup.

Next let us create the StyleLint configuration.

{title=".stylelintrc StyleLint configuration", lang=json}
~~~~~~~
{
  "extends": "stylelint-config-standard"
}
~~~~~~~

That's it. The StyleLint config does not get any simpler. We can add custom rules as we progress in our workflow
to fix any warnings. For now we are good to go to next step of creating a command line script.

{pagebreak}

## StyleLint CLI

Let us add the StyleLint CLI shortcut to package.json file.

{title="package.json StyleLint command line script", lang=json}
~~~~~~~
"slint": "stylelint ./app/styles/**/*.css ./app/style.css --syntax scss || true"
~~~~~~~

Now we are ready to run StyleLint for the first time. Run ```npm run slint``` in your terminal.

{title="Terminal output of StyleLint command line script", lang=text}
~~~~~~~
app/styles/components/card.css
  5:28  ✖  Unexpected unit on zero length number   number-zero-length-no-unit
  6:11  ✖  Expected a leading zero                 number-leading-zero       
 12:14  ✖  Unexpected unit on zero length number   number-zero-length-no-unit

app/styles/components/feature.css
 1:10  ✖  Unexpected empty block   block-no-empty

app/styles/components/footer.css
  2:3  ✖  Unexpected longhand value '1.5rem 1.5rem'   shorthand-property-no-redundant-values
          instead of '1.5rem'                                                               
 14:1  ✖  Expected empty line before non-nested rule  rule-non-nested-empty-line-before     

app/styles/components/header.css
  4:1   ✖  Expected empty line before at-rule           at-rule-empty-line-before        
 21:1   ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before
 26:1   ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before
 31:1   ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before
 31:22  ✖  Expected newline after ","                   selector-list-comma-newline-after
 31:45  ✖  Expected newline after ","                   selector-list-comma-newline-after
 34:1   ✖  Expected empty line before at-rule           at-rule-empty-line-before        
 46:1   ✖  Expected empty line before at-rule           at-rule-empty-line-before        
 59:1   ✖  Expected empty line before at-rule           at-rule-empty-line-before        
 66:1   ✖  Expected empty line before at-rule           at-rule-empty-line-before        
 75:1   ✖  Expected empty line before at-rule           at-rule-empty-line-before        

app/styles/components/input.css
 11:21  ✖  Expected single space after ":" with a single-line  declaration-colon-space-after
           value                                                                            

app/styles/components/media.css
 14:1   ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before
 20:14  ✖  Expected a leading zero                      number-leading-zero              

app/styles/components/notice.css
 3:25  ✖  Expected a leading zero   number-leading-zero
 4:13  ✖  Expected a leading zero   number-leading-zero

app/styles/components/section.css
  4:1   ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before
  8:1   ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before
 12:12  ✖  Unexpected unit on zero length number        number-zero-length-no-unit       
 15:1   ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before
 18:1   ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before
 21:1   ✖  Expected empty line before at-rule           at-rule-empty-line-before        

app/styles/components/site.css
 25:1   ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before
 29:12  ✖  Unexpected unit on zero length number        number-zero-length-no-unit       
 32:1   ✖  Expected empty line before at-rule           at-rule-empty-line-before        
 44:1   ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before

app/styles/containers/grid.css
 126:1  ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before
 133:1  ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before
 140:1  ✖  Expected empty line before non-nested rule   rule-non-nested-empty-line-before

app/styles/containers/holy-grail.css
 64:17  ✖  Expected newline after ","   selector-list-comma-newline-after

app/styles/utils/spacing.css
  2:12  ✖  Expected a maximum of 1            declaration-block-single-line-max-declarations
           declaration(s)                                                                   
  8:21  ✖  Expected a leading zero            number-leading-zero                           
  8:26  ✖  Expected single space before "!"   declaration-bang-space-before                 
  9:12  ✖  Expected a maximum of 1            declaration-block-single-line-max-declarations
           declaration(s)                                                                   
  9:25  ✖  Expected a leading zero            number-leading-zero                           
  9:30  ✖  Expected single space before "!"   declaration-bang-space-before                 
  9:56  ✖  Expected a leading zero            number-leading-zero                           
  9:61  ✖  Expected single space before "!"   declaration-bang-space-before                 
 10:25  ✖  Expected a leading zero            number-leading-zero                           
 10:30  ✖  Expected single space before "!"   declaration-bang-space-before                 
 11:27  ✖  Expected a leading zero            number-leading-zero                           
 11:32  ✖  Expected single space before "!"   declaration-bang-space-before                 
 12:28  ✖  Expected a leading zero            number-leading-zero                           
 12:33  ✖  Expected single space before "!"   declaration-bang-space-before                 
 13:26  ✖  Expected a leading zero            number-leading-zero                           
 13:31  ✖  Expected single space before "!"   declaration-bang-space-before                 
 15:25  ✖  Expected single space before "!"   declaration-bang-space-before                 
 16:12  ✖  Expected a maximum of 1            declaration-block-single-line-max-declarations
           declaration(s)                                                                   
 16:29  ✖  Expected single space before "!"   declaration-bang-space-before                 
 16:59  ✖  Expected single space before "!"   declaration-bang-space-before                 
 17:29  ✖  Expected single space before "!"   declaration-bang-space-before                 
 18:31  ✖  Expected single space before "!"   declaration-bang-space-before                 
 19:32  ✖  Expected single space before "!"   declaration-bang-space-before                 
 20:30  ✖  Expected single space before "!"   declaration-bang-space-before                 
 22:25  ✖  Expected single space before "!"   declaration-bang-space-before                 
 23:12  ✖  Expected a maximum of 1            declaration-block-single-line-max-declarations
           declaration(s)                                                                   
 23:29  ✖  Expected single space before "!"   declaration-bang-space-before                 
 23:59  ✖  Expected single space before "!"   declaration-bang-space-before                 
 24:29  ✖  Expected single space before "!"   declaration-bang-space-before                 
 25:31  ✖  Expected single space before "!"   declaration-bang-space-before                 
 26:32  ✖  Expected single space before "!"   declaration-bang-space-before                 
 27:30  ✖  Expected single space before "!"   declaration-bang-space-before
~~~~~~~

We notice 70 odd problems reported by StyleLint, across 12 CSS files in our project.

{pagebreak}

## Fixing StyleLint reported problems

Here is the workflow used to fix most of the StyleLint reported problems.

**Overview of problems.** As we ran StyleLint CLI we notice most of our reported problems
repeat so Find and Replace in our editor will be our close ally in fixing these.

**Editor hints.** Let us start by integrating StyleLint with Atom editor and then
walking through our CSS files one by one fixing reported problems.

{title="Add StyleLint Atom package", lang=text}
~~~~~~~
apm install linter-stylelint
~~~~~~~

Done! Stepping through each CSS file took us less than 30 minutes to go from 70 problems
to zero.

**Overriding rules.** We have not yet encountered any rule that needs overriding. However, when
we do, we can add overrides in the ```.stylelintrc``` config file like so.

Of course this is just a sample, we are not adding these overrides to our project.

{title="Add StyleLint Atom package", lang=text}
~~~~~~~
{
  "extends": "stylelint-config-standard",
  "rules": {
    "number-leading-zero": null
  }
}
~~~~~~~

**Ignore files.** The CLI and Webpack config allow us to include a list of files or paths with wildcards.

**Hot testing.** With the known issue in Hot Reloading not working with PostCSS, unfortunately we
cannot do Hot Reloading while we fix the problems.

{pagebreak}

## Webpack integration for StyleLint

Now that we have reached "problems zero", let us integrate StyleLint with webpack development config
so it runs every time we run the webpack-dev-server.

{title="Add StyleLint Webpack plugin", lang=text}
~~~~~~~
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
~~~~~~~

That's all it takes. Adding the ```stylelint-webpack-plugin``` into our webpack development config.

Now when we run ```npm start``` StyleLint will report any new issues which we do not catch
with editor hints in the first place.

{pagebreak}

## Separating Webpack test config

Lint and Browsersync do add to our build time and the "code to browser view" workflow. So,
we can separate the test related webpack config, like so.

{title="webpack.test.config.js", lang=javascript}
~~~~~~~
// Initialization
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcssImport = require('postcss-easy-import');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const APP = path.join(__dirname, 'app');
const BUILD = path.join(__dirname, 'build');
const STYLE = path.join(__dirname, 'app/style.css');
const PUBLIC = path.join(__dirname, 'app/public');
const TEMPLATE = path.join(__dirname, 'app/templates/index_default.html');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const PROXY = `http://${HOST}:${PORT}`;
const LINT = path.join(__dirname, '.eslintrc.js');
const STYLELINT = ['./app/styles/**/*.css', './app/styles.css'];

// PostCSS support
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  // Paths and extensions
  entry: {
    app: APP,
    style: STYLE
  },
  output: {
    path: BUILD,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  eslint: {
    configFile: LINT,
    emitError: true
  },
  // Loaders for processing different file types
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: APP
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: APP
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
        include: APP
      }
    ]
  },
  postcss: function processPostcss() {
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      precss,
      autoprefixer({ browsers: ['last 2 versions'] })
    ];
  },
  // Source maps used for debugging information
  devtool: 'eval-source-map',
  // webpack-dev-server configuration
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    stats: 'errors-only',

    host: HOST,
    port: PORT,

    // CopyWebpackPlugin: This is required for webpack-dev-server.
    // The path should be an absolute path to your build destination.
    outputPath: BUILD
  },
  // Webpack plugins
  plugins: [
    new StyleLintPlugin({
      files: STYLELINT,
      syntax: 'scss'
    }),
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        host: HOST,
        port: PORT,
        proxy: PROXY
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    ),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: PUBLIC, to: BUILD }
    ],
      {
        ignore: [
          // Doesn't copy Mac storage system files
          '.DS_Store'
        ]
      }
    ),
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      // JS placed at the bottom of the body element
      inject: 'body'
    })
  ]
};
~~~~~~~

Now all we need to do is add a script in package.json for running tests.

{title="package.json test script", lang=javascript}
~~~~~~~
"test": "NODE_ENV=test webpack-dev-server --config webpack.test.config.js",
~~~~~~~

We revert the build webpack.config.js to prior version without ESLint, StyleLint, and Browsersync.

Now we can run ```npm start``` without the test overload during normal builds. When we want to test
our build we run ```npm run test``` command.

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
[7]: http://eslint.org/docs/rules/complexity
