const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.config');

module.exports = ({env = 'production'}) => {
  return webpackMerge(config, {
    mode: 'production',
    output: {
      publicPath: '.',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../src/view/index.html'),
        inject: true,
        minify: true
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env)
      })
    ]
  });
}
