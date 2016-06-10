const webpack = require('webpack');

// File ops
const HtmlWebpackPlugin
  = require('html-webpack-plugin');
const ExtractTextPlugin
  = require('extract-text-webpack-plugin');

// Folder ops
const CleanPlugin
  = require('clean-webpack-plugin');
const CopyWebpackPlugin
  = require('copy-webpack-plugin');
const path = require('path');

// Constants
const APP = path.join(__dirname, 'app');
const BUILD = path.join(__dirname, 'build');
const STYLE = path.join(__dirname, 'app/style.css');
const PUBLIC = path.join(__dirname, 'app/public');
const TEMPLATE
  = path.join(__dirname,
      'app/templates/index_default.html');

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
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
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
  // Remove comment if you require sourcemaps for your production code
  // devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production') // eslint-disable-line quote-props
      }
    }),
    new CleanPlugin([BUILD]),
    new CopyWebpackPlugin([
        { from: PUBLIC, to: BUILD }
    ],
      {
        ignore: [
          '.DS_Store'
        ]
      }
    ),
    new HtmlWebpackPlugin({
      template: 'node_modules/html-webpack-template/index.ejs',
      title: 'React Speed Coding',
      appMountId: 'app',
      inject: false,
      // Use html-minifier
      minify: {
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
