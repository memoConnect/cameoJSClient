module.exports = function(config) {

    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../../../',

        files: [
            'test/lib/jquery/*.js',
            'dist/app/vendor*.js',
            'test/lib/angular/angular-mocks.js',
            'dist/app/cameo*.js',

            'test/unit/**/*.spec.js',

            'dist/app/i18n/*.json',
            'build/i18n/language-keys.json'
        ],

        preprocessors: {
            'dist/app/i18n/*.json': ['ng-json2js'],
            'build/i18n/language-keys.json': ['ng-json2js']
        },
        // for all i18n json strip to ->/i18n
        ngJson2JsPreprocessor: {
            stripPrefix: '(dist/app/)|(build/)'
        },

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files to exclude
        exclude: [],

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
        browserNoActivityTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        browsers: ['Firefox']
    })
};