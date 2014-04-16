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

            'app/vendor/angular-translate/angular-translate.js',

            'app/vendor/angular-moment/moment-with-langs.js',
            'app/vendor/angular-moment/angular-moment.js',

            'app/vendor/!(require*)/*.js',

            'app/vendor/crypto/sjcl/sjcl.min.js',
            'app/vendor/crypto/jsencrypt/jsencrypt.min.js',


            'app/shared/cmObject.js',
            'app/shared/cmLogger.js',
            'app/shared/cmNotify.js',
            'app/shared/cmApi.js',
            'app/shared/cmAuth.js',
            'app/shared/cmUserModel.js',
            'app/shared/cmIdentity.js',
            'app/shared/cmUtil.js',
            'app/shared/cmCrypt.js',
            'app/shared/cmLocalStorage.js',

            'app/shared/cmLanguage.js',

            'app/shared/ui/package.js',

            'app/comps/files/!(*module).js',
            'app/comps/files/*module.js',

            'app/comps/contacts/!(*module).js',
            'app/comps/contacts/*module.js',

            'app/comps/conversations/!(*module).js',
            'app/comps/conversations/*module.js',

            'app/comps/user/!(*module).js',
            'app/comps/user/*module.js',

            'app/comps/validate/package.js',

            'test/lib/angular/angular-mocks.js',

            'test/unit/shared/*spec.js',
            'test/unit/shared/ui/*spec.js',
            'test/unit/shared/i18n/*spec.js',

            
            'test/unit/comps/files/*spec.js',
            'test/unit/comps/contacts/*spec.js',
            'test/unit/comps/conversations/*spec.js',
//            'test/unit/comps/user/*spec.js',
            'test/unit/comps/validate/*spec.js',

            //
            'app/**/*.html',
            'app/**/*.json'
//            {pattern: 'app/**/*.json', included: false}
        ],

        // generate js files from html templates to expose them during testing.
        preprocessors: {
            'app/**/*.html': ['html2js'],
            'app/**/*.json': ['html2js']
        },

        html2JsRequireJsPreprocessor: {
            stripPrefix: 'app/'
        },

        // list of files to exclude
        exclude: [
            'app/**/main.js'
//            'test/**/contacts-ctrl.AMDspec.js'
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