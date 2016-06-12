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
