module.exports = function (config) {
    config.set({

        basePath: '../',

        files : [
            'app/js/vendor/angular/angular.js',
            'app/js/vendor/angular/*.js',
            'app/js/vendor/angular-translate/angular-translate.js', 
            'app/js/vendor/angular-translate/*.js',
            'app/js/vendor/**/*.js',        
            'app/js/cmModules/*.js',            
            'app/js/bootstrap/*.js',
            'app/js/**/*.js',
            'test/lib/angular/*.js',
            'test/unit/*.test.js'           
        ],

        exclude: [                                                         
            '**/angular-scenario.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'junit'],

        // the default configuration
        junitReporter: {
            outputFile: 'target/test-reports/test-results.xml',
            suite: ''
        },

        autoWatch : true,

        browsers : ['Firefox'],

        frameworks: ['jasmine'],

        singleRun : false,

        proxies : {
        }
    })
}

