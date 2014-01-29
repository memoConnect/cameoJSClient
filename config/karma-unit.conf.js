module.exports = function(config){
    config.set({


    basePath : '../',

    files : [
        'app/js/vendor/angular/angular.js',
        'app/js/vendor/angular/*.js',
        //'app/js/vendor/angular-translate/*.js',              
        'test/lib/angular/*.js',
        'test/unit/*.js'           
    ],

    autoWatch : false,

    browsers : [],

    frameworks: ['jasmine'],

    singleRun : true,

    proxies : {
      '/': 'http://localhost:8000/'
    },

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            ],

    junitReporter : {
      outputFile: 'test_out/e2e.xml',
      suite: 'e2e'
    }

})}

