module.exports = function (config) {
    config.set({

            basePath: '../',

            files : [
                'app/js/vendor/angular/angular.js',
                'app/js/vendor/angular-translate/angular-translate.js',
                'app/js/vendor/**/*.js',
                'app/js/bootstrap/*.js',
                'app/js/**/*.js',
                'test/lib/angular/*.js',
                'test/unit/*.test.js'
            ],

            exclude: [
                '**/angular-scenario.js'
            ],

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

            frameworks: ['jasmine'],

            singleRun: true,

            proxies: {
                //'/': 'http://localhost:9000/'
                //'/app/': 'http://localhost:9000/'
            },

            // web server port
            port: 9000

        }
    )
}

