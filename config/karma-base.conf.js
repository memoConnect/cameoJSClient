module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['jasmine'], //, 'requirejs'],

        // list of files / patterns to load in the browser
        files: [

            'test/lib/jquery/*.js',

            'app/vendor/angular/angular.js',

            'app/vendor/angular-translate/angular-translate.js',

            'app/vendor/!(require*)/*.js',

            'app/shared/cmLogger.js',
            'app/shared/cmNotify.js',
            'app/shared/cmApi.js',
            'app/shared/cmAuth.js',
            'app/shared/cmUtil.js',
            'app/shared/cmCrypt.js',

            'app/shared/i18n/language.js',


            'app/shared/ui/!(*module).js',
            'app/shared/ui/*module.js',

            'app/comps/user/!(*module).js',
            'app/comps/user/*module.js',

            'app/comps/contacts/!(*module).js',
            'app/comps/contacts/*module.js',


            'app/comps/conversations/!(*module).js',
            'app/comps/conversations/*module.js',

            'app/comps/validate/!(*module).js',
            'app/comps/validate/*module.js',

            'test/lib/angular/angular-mocks.js',


            'test/unit/shared/*spec.js',
            'test/unit/shared/ui/*spec.js',
            'test/unit/shared/i18n/*spec.js',

            'test/unit/comps/user/*spec.js',
            'test/unit/comps/contacts/*spec.js',
            'test/unit/comps/conversations/*spec.js',
            'test/unit/comps/validate/*spec.js',

            // all frontend files
            //{pattern: 'app/**/*.js', included: false},
            // tests
            //{pattern: 'test/unit/**/*.fix.spec.js', included: false},
            //{pattern: 'test/unit/**/*.fix.amd-spec.js', included: false},

//            {pattern: 'test/unit/**/app.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/auth.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/contacts.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/search-cameo-identity-drtv.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/crypt.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/nav-tabs-drtv.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/point-spinner-drtv.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/type-chooser-drtv.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/validate-email-drtv.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/validate-phone-drtv.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/contacts-modl.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/user-modl.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/registration-ctrl.amd-spec.js', included: false},
//            {pattern: 'test/unit/**/util.amd-spec.js', included: false},

            // test lib
            //{pattern: 'test/lib/**/*.js', included: false},
            // requirejs main file
            //{pattern: 'test/unit/base/main.js', included: true},
            // load and json templates
            'app/**/*.html',
//            {pattern: 'app/**/*.json', included: false}
        ],

        // generate js files from html templates to expose them during testing.
        preprocessors: {
            'app/**/*.html': ['html2js'],
            //'app/**/*.json': ['html2js']
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

        browsers: ['Chrome']
    });
};