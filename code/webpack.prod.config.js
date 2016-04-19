const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP = __dirname + '/app';
const BUILD = __dirname + '/build';
const STYLE = __dirname + '/app/style.css';
const PUBLIC = __dirname + '/app/public';
const TEMPLATE =  __dirname + '/app/templates/index_default.html'

const PACKAGE = Object.keys(
  require('./package.json').dependencies
);

// PostCSS support
const precss       = require('precss');
const autoprefixer = require('autoprefixer');

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
        loader: ExtractTextPlugin.extract('style', 'css!postcss'),
        include: APP
      },
      {
        test: /\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        loaders: [
          'url?limit=8192&hash=sha512&digest=hex&name=[hash].[ext]',
          'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  postcss: function () {
      return [autoprefixer({ browsers: ['last 2 versions'] }), precss];
  },
  // Remove comment if you require sourcemaps for your production code
  // devtool: 'cheap-module-source-map',
  plugins: [
    // Clean build directory
    new CleanPlugin([BUILD]),
    new CopyWebpackPlugin([
        { from: PUBLIC, to: BUILD }
      ],
      {
        ignore: [
          // Doesn't copy Mac storage system files
          '.DS_Store'
        ]
    }),
    // Auto generate index.html
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      // JS placed at the bottom of the body element
      inject: 'body',
      // Use html-minifier
      minify: {
        collapseWhitespace: true
      }
    }),

    // Extract CSS to a separate file
    new ExtractTextPlugin('[name].[chunkhash].css'),

    // Remove comment to dedupe duplicating dependencies for larger projects
    // new webpack.optimize.DedupePlugin(),

    // Separate vendor and manifest files
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),

    // Optimizes React for use in production mode
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    // Minify JavaScript
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
