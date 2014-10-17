// Karma  configuration
// Generated on Mon Feb 25 2013 14:34:34 GMT+0100 (CET)

module.exports = function(config) {

    config.set({

       // base path, that will be used to resolve files and exclude
       basePath: './',

      // frameworks to use
      frameworks: ["ng-scenario",'jasmine'],

      // list of files / patterns to load in the browser
      files: [
        //  'Bowling.html',
        'Bowling.js',
        '*Functional_Test.js'
      ],

      // list of files to exclude
      exclude: [
  
      ],


      // test results reporter to use
      // possible values: 'dots', 'progress', 'junit'
      reporters: [
        // 'progress' ,
        'spec',
        // 'dots',
        'junit' ],

      junitReporter: {
         // will be resolved to basePath (in the s ame way as files/exclude patterns)
         outputFile: 'test_reports/test-results-e2e.xml'
      },

      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,

    
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || coLOG_INFO || LOG_DEBUG
      logLevel: config.LOG_DEBUG,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,



      urlRoot: '_karma_path_',
      // proxies: { '/': 'http://localhost:3000/'},
      //// cli runner port
      // runnerPort = 9100;


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
      singleRun: false

      //note: code coverage cannot work with e2e testing

   })
};

