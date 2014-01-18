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
      'test/Bowling_test.js',

     // These are not watched because they're not expected to change.
     // These are not included because they are not JavaScript files and Karma inserts 
     // these as <script> tags.
     // These are served however, as the adapter will load them into the captured browsers.
     // The cucumber-html.css file can be copied and customized, simply change the path.
     // The adapter will load any file ending with '.css' into the captured browsers.
     {pattern: 'node_modules/karma-cucumberjs/vendor/cucumber-html.css', watched: false, included: false, served: true},
     {pattern: 'test/cucumber/app.template', watched: false, included: false, served: true},


    // These are not included because they're text feature files and shouldn't go in script tags.
    // These are watched because feature files will change during dev and you want Karma to run
    // tests when these change.
    // These are served by Karma so the adapter can load their contents when its time to test.
    {pattern: 'test/cucumber/features/**/*.feature', watched: true, included: false, served: true},


    // The adapter is not watched as it will not change.
    // The adapter is included so it gets added as a <script> to the page.
    // The adpater is served so the <script> tag will work when its added to the captured browsers.
    {pattern: 'node_modules/karma-cucumberjs/lib/adapter.js', watched: false, included: true, served: true},


    // The step definitions should be loaded last so the adapter can load the global functions 
    // needed by the step defs.
    // The step defs are watched and served so Karma runs when they change.
    {pattern: 'test/cucumber/features/step_definitions/**/*.js', watched: true, included: true, served: true}
    ],

    // list of files to exclude
    exclude: [
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters: [
       // 'progress' 
       'spec', 
       "junit" , "coverage"
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
      'Bowling.js': 'coverage'
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

