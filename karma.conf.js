module.exports = function(config) {
  config.set({
    basePath: 'src',
    frameworks: ['mocha', 'chai'],
    files: ['*'],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}

