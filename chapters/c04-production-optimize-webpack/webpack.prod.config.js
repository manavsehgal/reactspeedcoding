
const webpack = require('webpack');
const CleanPlugin
  = require('clean-webpack-plugin');
const ExtractTextPlugin
  = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin
  = require('html-webpack-plugin');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const PUBLIC = path.join(__dirname, 'app/public');

const APP = path.join(__dirname, 'app');
const BUILD = path.join(__dirname, 'build');
const STYLE
  = path.join(__dirname, 'app/style.css');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

const TEMPLATE
  = path.join(__dirname, 'app/templates/index_default.html');

const postcssImport = require('postcss-easy-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const PACKAGE = Object.keys(
  require('./package.json').dependencies
);

module.exports = {
  entry: {
    app: APP,
    style: STYLE,
    vendor: PACKAGE
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: BUILD,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: APP
      },
      // Extract CSS during build
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
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
  },

  plugins: [
    new CleanPlugin([BUILD]),

    new CopyWebpackPlugin([
      { from: PUBLIC, to: BUILD }
    ],
    {
      ignore: [
        '.DS_Store'
      ]
    }),

    new HtmlWebpackPlugin({
      template: TEMPLATE,
      inject: 'body',
      // Use html-minifier
      minify: {
        collapseWhitespace: true
      }
    }),

    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
  };
