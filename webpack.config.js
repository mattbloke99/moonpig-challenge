var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    "./js/main.js",
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.bundle.js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        // Skip any files outside of the project's src dir
        include: [
          path.resolve(__dirname, "js"),
        ],
        test: /\.js$/,
        query: {
      //    plugins: ['transform-runtime'],
          presets: ['es2015'],
        }
      },
      {
        test: /\.css/,
        loaders: ['style', 'css'],
        include: __dirname + '/css'
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};
