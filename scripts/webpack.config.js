const path = require("path");
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
// console.log(__dirname)
module.exports = [
  {
    mode: process.env.NODE_ENV || "production",
    entry: {
      bundle: path.resolve(__dirname, "../client/index.js")
    },
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "[name].[contenthash:8].js"
      // libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          // loader: "babel-loader"
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            }
          }
        }
      ]
    },
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: "all",
        minSize: 30000,
        maxSize: 150000,
        name: false
      }
    },
    // devtool: "source-map",
    devtool: false,
    // we gonna use this plugin:
    plugins: [
      // ... other plugins
      new webpack.SourceMapDevToolPlugin({
        // this is the url of our local sourcemap server
        publicPath: "http://localhost:9876/dist/",
        filename: "[file].map"
      })
    ]
  },
  {
    // mode: "production",
    target: 'node',
    externals: [nodeExternals()],
    entry: {
      ssr: path.resolve(__dirname, "../client/server.js")
    },
    output: {
      path: path.resolve(__dirname, ".."),
      filename: "[name].js",
      libraryTarget: 'commonjs2'
      // libraryTarget: 'umd',
    },
    optimization: {
      minimize: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env", {
                  "modules": "commonjs"
                }],
                '@babel/preset-react'
              ],
            }
          }
        }
      ]
    }
  }
];
