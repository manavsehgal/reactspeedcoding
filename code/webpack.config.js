// Initialization
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcssImport = require('postcss-easy-import');
const path = require('path');

const APP = path.join(__dirname, 'app');
const BUILD = path.join(__dirname, 'build');
const STYLE = path.join(__dirname, 'app/style.css');
const PUBLIC = path.join(__dirname, 'app/public');
const TEMPLATE = path.join(__dirname, 'app/templates/index_default.html');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

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
    filename: '[name].js',
    publicPath: '/'
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
    // Required to inject NODE_ENV within React app.
    // Reduntant package.json script entry does not do that, but required for .babelrc
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development') // eslint-disable-line quote-props
      }
    }),
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
