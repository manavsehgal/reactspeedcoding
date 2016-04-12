# Setup React Webpack

The aim of this book is to get you from concept to coding real world React apps,
as fast as possible.

The world of React is constantly evolving and changing at a fast pace. This book
equips you to take the right decisions matching your project requirements.

You will learn in this chapter how to setup React development environment starting
from scratch. By the end of this chapter we will have a starter boilerplate to
develop React apps.

We will cover following topics.

- How to install Node.js and use Node Version Manager.
- Setup package.json to manage your NPM dependencies.
- Quick access companion code for this book using Github.

## Development Environment

This book assumes you have access to a Mac or Linux environment.

I> ## Are you on Windows?
I> You can try any of the Cloud based code editors which offer Linux Development
I> environment within the convenience of your web browser.
I> [Cloud9][1] is our favorite, other options include [Nitrous][2].

On Mac or Linux you can use your favorite code editor. This book is written using [Atom][1].
Atom gets you started coding by just dragging and dropping a folder onto the editor.
You can then add power user features as you grow with Atom using custom packages,
code snippets, among others.

### Installing Node.js

You will need Node.js to get started with React.
Your Mac OS comes with Node pre-installed. However you may want to use the latest stable release.

Check you node release using ```node -v``` command.

We recommend installing or upgrading Node using Node Version Manager (NVM).
Their [Github repo][4] documents install and usage.

To install NVM:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

Now you can install a Node release by choosing one from Node [releases][5] page.

Command ```nvm install 5.10.1``` installs the latest stable release for us.

One of the advantages of using NVM is you can switch between multiple
node releases you may have on your system.

Here's what our terminal looks like when using ```nvm ls``` to list installed node releases.

{title="nvm ls terminal output", lang=text}
~~~~~~~
v4.2.3
v5.3.0
v5.10.0
->      v5.10.1
system
default -> 5.3.0 (-> v5.3.0)
node -> stable (-> v5.10.1) (default)
stable -> 5.10 (-> v5.10.1) (default)
iojs -> iojs- (-> system) (default)
~~~~~~~

Using ```nvm use x.x.x``` command we can switch to ```x.x.x``` installed node release.

### Setting up package.json

You will require ```package.json``` to manage your NPM dependencies and scripts.

Create a new one using ```npm init``` command, selecting defaults where uncertain.

This is what our ```package.json``` looks like as we start off. Note that we added
the ```private``` flag to avoid accidental publishing of the project to NPM repo,
and also to stop any warnings for missing flags like project repo.

{title="package.json", lang=json}
~~~~~~~
{
  "name": "react-speed-coding-code",
  "version": "1.0.0",
  "description": "Companion code for React Speed Coding book",
  "main": "index.js",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Manav Sehgal",
  "license": "MIT"
}
~~~~~~~

Dependencies section will start showing up as we add npm dependencies.

## Companion code

Companion code and manuscript of this book are available at [reactspeedcoding Github repo][6].
Chapter and section level branches are available if you want to "code along" as you
read the book.

You can clone a specific branch like so.

```
git clone -b <branch-name> --single-branch --depth=1 https://github.com/manavsehgal/reactspeedcoding.git
```

Replace ```<branch-name>``` with actual branch name from the repo.
For example ```c01-setup-react-webpack``` for first chapter's init code.
This will clone the code and along with relevant chapter content for the book.
The ```--depth=1``` flag ensures that only the latest commit is cloned.

{title="reactspeedcoding repo file structure", lang=text}
~~~~~~~
- reactspeedcoding
-- manuscript # chapter content
-- code # sample code
~~~~~~~

Now cd to the code directory and install dependencies using ```npm install``` command.
Run sample app using ```npm start``` command.

## Installing Starter Dependencies

React > ES6 > Babel > Webpack.

React is available via NPM and this is the recommended way of using React in a project.

{title="Install React dependencies", lang=text}
~~~~~~~
npm install --save react
npm install --save react-dom
~~~~~~~

Webpack is used for module packaging, development, and production pipeline automation.

{title="Install Webpack dependencies", lang=text}
~~~~~~~
npm install --save-dev webpack
npm install --save-dev webpack-dev-server
~~~~~~~

You can add functionality to Webpack using plugins. We will use automatic HTML
generation plugins for creating ```index.html``` for your app.

{title="Install Webpack plugins", lang=text}
~~~~~~~
npm install --save-dev html-webpack-plugin
npm install --save-dev html-webpack-template
~~~~~~~

Webpack requires loaders to process specific file types.

{title="Install Webpack loaders", lang=text}
~~~~~~~
npm install --save-dev css-loader
npm install --save-dev style-loader
~~~~~~~

Babel transpiles React JSX and ES6 to ES5 JavaScript. We need ```babel-loader```
as Webpack Babel loader for JSX file types.

Hot loading using ```babel-preset-react-hmre``` makes
your browser update automatically when there are changes to code,
without losing current state of your app.

ES6 support requires ```babel-preset-es2015``` Babel preset.

{title="Install Babel dependencies", lang=text}
~~~~~~~
npm install --save-dev babel-core
npm install --save-dev babel-loader
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-preset-react
npm install --save-dev babel-preset-react-hmre
~~~~~~~

## Configuring Babel

Babel configuration is specified in ```.babelrc``` file. React Hot Loading is
required only during development.

{title=".babelrc", lang=json}
~~~~~~~
{
  "presets": ["react", "es2015"],
  "env": {
    "development": {
      "presets": ["react-hmre"]
    }
  }
}
~~~~~~~

## Creating Webpack configuration

Webpack configuration drives your development pipeline, so this is a really
important file to understand. We will split various sections of the config
file to aid step-by-step learning.

To start off, you need to initialize the config file with dependencies.
There are only two in case of development config, webpack and HTML generation plugin.

Next we initialize the APP, BUILD, and STYLE paths.

{title="webpack.config.js initialization", lang=javascript}
~~~~~~~
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP = __dirname + '/app';
const BUILD = __dirname + '/build';
const STYLE = __dirname + '/app/main.css';
~~~~~~~

Next section defines your app entry, output, and extensions.

{title="webpack.config.js paths and extensions", lang=javascript}
~~~~~~~
module.exports = {
  entry: {
    app: APP,
    style: STYLE
  },
  output: {
    path: BUILD,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
~~~~~~~

We follow this by defining the loaders for processing various file types
used within our app.


[1]: https://atom.io/
[2]: https://c9.io/
[3]: https://www.nitrous.io/
[4]: https://github.com/creationix/nvm
[5]: https://nodejs.org/en/download/releases/
[6]: https://github.com/manavsehgal/reactspeedcoding
