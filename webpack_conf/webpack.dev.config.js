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
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        oneOf: [
          {
             resourceQuery: /module/,
             use: [
               {
                 loader: 'style-loader'
               },
               {
                 loader: 'css-loader',
                 options: {
                   modules: true,
                   localIdentName: '[name]__[local]--[hash:base64:5]'
                 }
               },
               {
                 loader: 'postcss-loader'
               },
               {
                 loader: 'less-loader'
               }
             ]
          },
          {
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader'
              },
              {
                loader: 'less-loader'
              }
            ]
          }
        ]
      }
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
