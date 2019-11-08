const path = require("path");
const webpack = require("webpack");

console.log(__dirname)
module.exports = [{
  mode: "production",
  entry: {
    bundle: path.resolve(__dirname, "../client/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash:8].js",
    // libraryTarget: 'umd',
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 150000,
      name: false,
    },
  },
  // devtool: "source-map",
  devtool: false,
    // we gonna use this plugin:
  plugins: [
      // ... other plugins
      new webpack.SourceMapDevToolPlugin({
          // this is the url of our local sourcemap server
          publicPath: 'http://localhost:4321/dist/',
          filename: '[file].map',
      }),
  ],
},
{
    mode: "production",
    entry: {
      ssr: path.resolve(__dirname, "../client/server.js"),
    },
    output: {
      path: path.resolve(__dirname, ".."),
      filename: "[name].js",
      // libraryTarget: 'umd',
    },
    module: {
      rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
    },
  },
];
