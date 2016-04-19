// Initialization
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP = __dirname + '/app';
const BUILD = __dirname + '/build';
const STYLE = __dirname + '/app/style.css';
const PUBLIC = __dirname + '/app/public';
const TEMPLATE =  __dirname + '/app/templates/index_default.html'

// PostCSS support
const precss       = require('precss');
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
  // Loaders for processing different file types
  module: {
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
    return [
      precss,
      autoprefixer({ browsers: ['last 2 versions'] })
    ]
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

    host: process.env.HOST,
    port: process.env.PORT,

    // CopyWebpackPlugin: This is required for webpack-dev-server.
    // The path should be an absolute path to your build destination.
     outputPath: BUILD
  },
  // Webpack plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: PUBLIC, to: BUILD }
    ],
    {
      ignore: [
        // Doesn't copy Mac storage system files
        '.DS_Store'
      ]
    }),
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      // JS placed at the bottom of the body element
      inject: 'body'
    })
  ]
};
