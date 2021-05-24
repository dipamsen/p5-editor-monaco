// @ts-nocheck
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: ['./src/index.ts', './src/style.css'],
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
    libraryTarget: 'umd',
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }, {
      test: /\.ttf$/,
      use: ['file-loader']
    }, {
      test: /\.txt$/,
      type: 'asset/resource',
    }, {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new MonacoWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "index.html"
    }),
  ]
};
