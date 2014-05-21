module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['jasmine'], //, 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            'test/lib/jquery/*.js',

            'm/base/config.js',

            'm/vendor/angular/angular.js',

            'm/vendor/angular-translate/angular-translate.js',

            'm/vendor/angular-moment/moment-with-langs.js',
            'm/vendor/angular-moment/angular-moment.js',

            'm/vendor/!(require*)/*.js',

            'm/vendor/crypto/sjcl/sjcl.min.js',
            'm/vendor/crypto/jsencrypt/jsencrypt.min.js',

            // packages
            'm/shared/core/package.js',
            'm/shared/ui/package.js',
            'm/comps/contacts/package.js',
            'm/comps/user/package.js',
            'm/comps/validate/package.js',
            'm/comps/conversations/package.js',
            'm/comps/files/package.js',

            'test/lib/angular/angular-mocks.js',

            // specs
            'test/unit/**/*.spec.js',

            // json files
            'm/**/*.json'
        ],

        // generate js files from html templates to expose them during testing.
        preprocessors: {
            'm/**/*.json': ['html2js']
        },

        html2JsRequireJsPreprocessor: {
            stripPrefix: 'm/'
        },

        // list of files to exclude
        exclude: [
            'm/**/main.js'
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