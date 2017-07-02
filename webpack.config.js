/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

var entry = [
  //'webpack-hot-middleware/client', 
  './client/index.js'
];

module.exports = {
  devtool: 'source-map',
  entry: entry,
  output: {
    filename: 'bundle.js',
    path: path.resolve('./', 'static'),
    devtoolLineToLine: true,
    publicPath: '/static/'
  },
  plugins: [
    //new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin()
    //new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        }
      },
      { test: /\.json$/, loaders: [ 'json-loader' ] },
      { test: /\.css$/, loaders: [ 'style', 'css' ] },
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
      { test: /\.styl$/, loaders: ['style', 'css', 'stylus'] },
    ]
  }
};
