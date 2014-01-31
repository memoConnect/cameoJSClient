// Karma configuration
// Generated on Thu Jan 30 2014 20:39:59 GMT+0100 (CET)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'app/js/vendor/angular/angular.js',
            'app/js/vendor/angular/angular-resource.js',
            'app/js/vendor/angular/angular-cookies.js',
            'app/js/vendor/angular/angular-route.js',
            'test/lib/angular/angular-mocks.js',
            'app/js/vendor/sjcl/*.js',
            'app/js/vendor/util/*.js',
            'app/js/bootstrap/app.js',
            'app/js/service/*.js',
            'app/js/directives/*.js',
            'app/js/controller/*.js',
            'test/**/*Spec.js'
        ],


        // list of files to exclude
        exclude: [
            '/app/js/**/*.min.js'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'junit'],

        // the default configuration
        junitReporter: {
            outputFile: 'target/test-reports/test-results.xml',
            suite: ''
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


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
        //browsers: ['PhantomJS'],
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
