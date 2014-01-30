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
        'test/unit/language.test.js'           
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
      //'/': 'http://localhost:9000/'
      '/app': 'http://localhost:9000'
    }

})}

