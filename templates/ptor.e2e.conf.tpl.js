
exports.config = {
    seleniumServerJar: '../test/lib/ptor/selenium-server-standalone-2.41.0.jar',
    seleniumPort: null,
    chromeDriver: '<%= chromeDriverPath %>',
    allScriptsTimeout: 30000,
    specs: ['../test/e2e/**/*.spec.js'],

    capabilities: {
        'browserName': '<%= browserName %>'
    },

    onPrepare: function () {
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new jasmine.JUnitXmlReporter('e2e.xml', true, true));
    },

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 30000
    }
};