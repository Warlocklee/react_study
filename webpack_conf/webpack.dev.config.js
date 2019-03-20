const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.config');

module.exports = ({port = 3000}, env = 'dev') => webpackMerge(config, {
  mode: 'development',
  entry: {
    index: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://0.0.0.0:' + port
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/view/index.html'),
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(env)
    })
  ]
});
