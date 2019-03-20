const path = require('path');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '../'),
  resolve: {},
  entry: {
    index: [
      path.resolve(__dirname, '../src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  module: {}
};
