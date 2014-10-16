exports.config = {
    seleniumServerJar: '../test/lib/ptor/selenium-server-standalone-2.42.2.jar',
    seleniumPort: null,
    chromeDriver: '<%= chromeDriverPath %>',
    allScriptsTimeout: 30000,
    chromeOnly: true,

    capabilities:{
        'browserName':'chrome',
        'chromeOptions': {
            'prefs': { 'intl.accept_languages': 'en' }
        }
    },

    onPrepare: function () {
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('target/test-reports/', true, true, "e2e-"));
    },

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: false,
        defaultTimeoutInterval: 30000,
        realtimeFailure: true
    }
};