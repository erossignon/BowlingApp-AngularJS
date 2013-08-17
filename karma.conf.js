// Karma configuration
// Generated on Mon Feb 25 2013 14:34:34 GMT+0100 (CET)

module.exports = function(config) {
  config.set({


    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: [ 'jasmine' ],

    // list of files / patterns to load in the browser
    files: [
      'Bowling.js',
      'test/Bowling_test.js'
    ],

    // list of files to exclude
    exclude: [
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters: [
       // 'progress' 
       'spec', "junit" , "coverage"
    ],

    junitReporter: {
        outputFile: 'test_reports/test_results.xml'
    },

    // web server port
    port: 9876,


    // // cli runner port
    // runnerPort = 9100;


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Firefox','Chrome','PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,


    preprocessors: {
      '**/Bowling.js': 'coverage'
    },
    //Code Coverage options. report type available:
    //- html (default)
    //- lcov (lcov and html) 
    //- lcovonly
    //- text (standard output)
    //- text-summary (standard output)
    //- cobertura (xml format supported by Jenkins)
    coverageReporter: {
        // cf. http://gotwarlost.github.com/istanbul/public/apidocs/
        type : 'html',
        dir : 'test_reports/coverage/'
    }
  })
};

