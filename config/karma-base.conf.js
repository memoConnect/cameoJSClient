module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['jasmine'], //, 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            'test/lib/jquery/*.js',
            'app/vendor*.js',
            'test/lib/angular/angular-mocks.js',
            'app/cameo*.js',

            // specs
            'test/unit/**/*.spec.js',

            'app/**/*.json'
        ],

        ngJson2JsPreprocessor: {
            stripPrefix: 'app/'
        },

        preprocessors: {
            'app/**/*.json': ['json2js']
        },

        // list of files to exclude
        exclude: [
            'app/**/main.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

        // the default configuration
        junitReporter: {
            outputFile: 'target/test-reports/test-results.xml',
            suite: ''
        },

//        coverageReporter: {
//            type : 'html',
//            dir : 'coverage/'
//        },

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

        browsers: ['Firefox']
    });
};