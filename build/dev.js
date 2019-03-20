const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const devConfig = require('../webpack_conf/webpack.dev.config.js');

const compiler = webpack(devConfig({
  port: process.argv[2] || 3000,
  env: process.argv[3] || 'dev'
}));

const app = new WebpackDevServer(compiler, {
  stats: {
    colors: true
  },
  clientLogLevel: 'warning',
  hot: true
});

app.listen(process.argv[2] || 3000, (err) => {
  console.log(err);
});
