
exports.config = {
    seleniumServerJar: '../test/lib/ptor/selenium-server-standalone-2.42.2.jar',
    seleniumPort: null,
    chromeDriver: '<%= chromeDriverPath %>',
    allScriptsTimeout: 30000,
    specs: [
        '../test/e2e/**/*.spec.js'
    ],

    <%= capabilities %>,

    onPrepare: function () {
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('target/test-reports/', true, true, "e2e-"));
    },

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: false,
        defaultTimeoutInterval: 30000
    }
};

//    exports.config = {
////    seleniumServerJar: '../test/lib/ptor/selenium-server-standalone-2.41.0.jar',
////    seleniumPort: null,
////    chromeDriver: '<%= chromeDriverPath %>',
////    allScriptsTimeout: 30000,
//        seleniumAddress: 'http://localhost:4723/wd/hub',
//
//        specs: ['../test/e2e/**/*.spec.js'],
//
////    <%= capabilities %>,
//
//        onPrepare: function () {
//        require('jasmine-reporters');
//        jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('target/test-reports/', true, true, "e2e-"));
//        },
//
//        capabilities: {
//        device: 'android',
//        'browserName': '',
//        //'deviceName' : 'emulator-5554',
//        'app' : 'chrome'
//        },
//
//        jasmineNodeOpts: {
//        onComplete: null,
//        isVerbose: false,
//        showColors: true,
//        includeStackTrace: false,
//        defaultTimeoutInterval: 30000
//        }
//        };
