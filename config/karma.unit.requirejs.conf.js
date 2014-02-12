/**
 # start karma unit tests
 karma start config/karma.unit.requirejs.conf
 */
module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '..',

        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'app/languages/*.jsons', included: false, served: true, autoWatch: true},
            {pattern: 'app/js/**/*.js', included: false, autoWatch: true},
            {pattern: 'test/unit/**/*.spec.js', included: false, autoWatch: true},
            {pattern: 'test/lib/**/*.js', included: false},
            // included true!!! requirejs wrapper
            {pattern: 'test/unit/test.main.js', included: true, autoWatch: true}
        ],

        // list of files to exclude
        exclude: [
            'app/js/**/main.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

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
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};