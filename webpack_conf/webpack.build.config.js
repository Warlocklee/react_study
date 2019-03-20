const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const config = require('./webpack.config');

module.exports = ({env = 'production'}) => {
  return webpackMerge(config, {
    mode: 'production',
    output: {
      publicPath: '.',
    },
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          oneOf: [
            {
               resourceQuery: /module/,
               use: [
                 MiniCssExtractPlugin.loader,
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
                MiniCssExtractPlugin.loader,
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
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
            }
          ]
        }
      ]
    },
    optimization: {
      minimizer: [
        new OptimizeCssAssetsWebpackPlugin({}),
        new UglifyjsWebpackPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        })
      ]
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
      }),
      new MiniCssExtractPlugin({
        filename: 'css/index.css'
      })
    ]
  });
}
