import './static/less/common.less';
const styleModule = require('./static/less/test.less?module');
console.log('style', styleModule);
console.log('hello, world');
const env = ENV === 'dev'
        ? 'dev data'
        : ENV === 'production'
          ? 'production data'
          : 'daily data'
console.log(env);
document.getElementById('app').innerHTML = `
  <div class="cell">a</div>
  <div class="cell ${styleModule.importantText}">b</div>
  <div class="cell">c</div>
`;
