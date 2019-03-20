console.log('hello, world');
const env = ENV === 'dev'
        ? 'dev data'
        : ENV === 'production'
          ? 'production data'
          : 'daily data'
console.log(env);
