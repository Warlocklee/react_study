const webpack = require('webpack');

const config = require('../webpack_conf/webpack.config');

const compiler = webpack(config);

compiler.run((err, stats) => {
  if(err) {
    console.log(err);
  }else {
    console.log(stats.toJson());
  }
});
