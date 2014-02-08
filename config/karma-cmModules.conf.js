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
            'app/js/**/*.js',
            'test/lib/angular/*.js',
            'test/modules/*.test.js'           
        ],

        exclude: [                                                         
            '**/angular-scenario.js',            
            'app/js/bootstrap/*.js'
        ],

        autoWatch : true,

        browsers : ['Firefox'],

        frameworks: ['jasmine'],

        singleRun : false,

        proxies : {
          //'/': 'http://localhost:9000/'
          '/app/': 'http://localhost:9000/'
//          '/app/': 'http://localhost/cameoJSClient/app/' // empu
        }
    })
}

