var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS', 'Chrome'],
    frameworks: [ 'mocha', 'chai' ],
    files: [
      '../node_modules/es6-promise/dist/es6-promise.auto.js',
      '../node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      '*.js'
    ],
    preprocessors: {
        '*.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha', 'coverage' ],
    webpack: {
      devtool: 'source-map',
      entry: './*.js',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules\/(?![querystring])/,
            loader: 'babel-loader'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            enforce: 'post',
            test: /\.js$/,
            exclude: /(__tests__|node_modules|bower_components|test)/,
            loader: 'istanbul-instrumenter-loader'
          }
        ]
     },
     node: {
       console: false,
       fs: 'empty',
       net: 'empty',
       tls: 'empty'
     },
     resolve: {
       extensions: ['.js', '.json']
     }
  },
  webpackServer: {
    noInfo: true
  },
  coverageReporter: {
    reporters: [
      {type:'lcovonly', subdir: '.'},
      {type:'html', subdir: 'html'}
    ]
  },
  port: 9876,
  logLevel: config.LOG_INFO,
  browserNoActivityTimeout: 60000,
  autoWatch: true,
  // override to true for CI
  singleRun: false,
  colors: true,
  concurrency: Infinity
  });
};
