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
      },
      {
        test: /\.json$/,
        loader: 'json',
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
