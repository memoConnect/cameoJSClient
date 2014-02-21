module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
//            {pattern: 'app/languages/*.jsons', included: false, served: true, autoWatch: true},
            {pattern: 'app/js/**/*.js', included: false},

            {pattern: 'test/unit/**/*.spec.js', included: false},
//            {pattern: 'test/unit/app.spec.js', included: false},
//            {pattern: 'test/unit/controller/contacts.spec.js', included: false},

            {pattern: 'test/lib/**/*.js', included: false},
            // included true!!! requirejs wrapper
            {pattern: 'test/unit/test.main.js', included: true},
            // load templates
//            {pattern: 'app/**/*.html', included: false}
        ],

        // generate js files from html templates to expose them during testing.
        preprocessors: {
            'app/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            stripPrefix: 'app/',
            // prepend this to the
//            prependPrefix: 'served/',

            returnOnlyHTML: true

            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
//            moduleName: 'templates'
        },

        // list of files to exclude
        exclude: [
            'app/js/**/main.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

        // the default configuration
        junitReporter: {
            outputFile: 'target/test-reports/test-results.xml',
            suite: ''
        },

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        browsers: ['Chrome']
    });
};