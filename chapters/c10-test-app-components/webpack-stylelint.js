// some code...
const StyleLintPlugin
  = require('stylelint-webpack-plugin');
// some code...
const STYLELINT = [
  './app/styles/**/*.css',
  './app/styles.css'
];
// some code...
plugins: [
  new StyleLintPlugin({
    files: STYLELINT,
    syntax: 'scss'
  }),
// some code...
