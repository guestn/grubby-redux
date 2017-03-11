var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = require('./webpack.config.js');    // inherit from the main config file


// disable the hot reload
module.exports.entry = [
  'babel-polyfill',
  __dirname + '/' + module.exports.app_root + '/index.js'
];


module.exports.output = {
    path: __dirname + '/public/js',
    //publicPath: 'js/',
    publicPath: 'js/',
    filename: 'bundle.js',
    chunkFilename: '[id].[chunkhash].js',
  },
// production env
module.exports.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    }
  })
);

// compress the js file
module.exports.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compressor: {
      warnings: false,
      drop_console: true
    }
  })
);

// export css to a separate file
module.exports.module.loaders[1] = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('css!sass'),
};

module.exports.plugins.push(
  new ExtractTextPlugin('../css/main.css')
);
