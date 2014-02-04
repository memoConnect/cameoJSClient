module.exports = function(config){
    config.set({

        basePath : '../',

        files : [
            'app/js/vendor/angular/angular.js',
            'app/js/vendor/angular-translate/angular-translate.min.js',
            'app/js/vendor/**/*.js',        
            'app/js/bootstrap/*.js',
            'app/js/**/*.js',
            'test/lib/angular/*.js',
            'test/unit/*.test.js'           
        ],

        exclude: [                                                         
            '**/angular-scenario.js',
            '**/requirejs/*',
            '**/bootstrap/main.js'
        ],

        autoWatch : true,

        browsers : ['Firefox'],

        frameworks: ['jasmine'],

        singleRun : false,

        proxies : {
          '/app/': 'http://localhost:9000/'   // rh
//          '/app/': 'http://localhost/cameoJSClient/app/' // empu
        }
    }
)}