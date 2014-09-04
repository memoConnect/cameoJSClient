module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['jasmine'], //, 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            'test/lib/jquery/*.js',

            'app/base/config.js',

            'app/vendor/angular/angular.js',
            'app/vendor/angular/angular-sanitize.js',

            'app/vendor/angular-translate/angular-translate.js',

            'app/vendor/angular-moment/moment-with-langs.js',
            'app/vendor/angular-moment/angular-moment.js',

            'app/vendor/!(require*)/*.js',

            'app/vendor/crypto/sjcl/sjcl.min.js',
            'app/vendor/crypto/jsencrypt/jsencrypt.js',

            // packages
            'app/packages/comps/core/package.js',
            'app/packages/comps/ui/package.js',
            'app/packages/comps/contacts/package.js',
            'app/packages/comps/user/package.js',
            'app/packages/comps/validate/package.js',
            'app/packages/comps/conversations/package.js',
            'app/packages/comps/files/package.js',
            'app/packages/comps/security_aspects/package.js',
            'app/packages/comps/phonegap/package.js',

            'test/lib/angular/angular-mocks.js',

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