const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './app/index.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],

  module: {
    loaders: [
      {
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "app"),
        ],
        test: /\.jsx?$/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react'],
        }
      }
    ]
  }
};