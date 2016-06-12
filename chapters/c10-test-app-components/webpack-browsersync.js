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
