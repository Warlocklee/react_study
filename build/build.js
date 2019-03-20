const webpack = require('webpack');

const config = require('../webpack_conf/webpack.build.config');

const compiler = webpack(
  config({
    env: process.argv[2] || 'production'
  })
);

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats.toJson());
  }
});
