var extend = function(destination,source) {
    for (var property in source)
        destination[property] = source[property];
    return destination;
}

var useChrome = false,
    browserConfig = {};

/* Chrome */
if(useChrome){
    browserConfig = {
        seleniumPort: null,
        chromeDriver: '<%= chromeDriverPath %>',
        chromeOnly: true,
        capabilities:{
            'browserName':'chrome',
            'chromeOptions': {
                'prefs': {'intl.accept_languages': 'en'}
            }
        }
    };
/* Internet Explorer */
} else {
    browserConfig = {
        chromeOnly: false,
        capabilities: {
            'browserName': 'internet explorer',
            'platform': 'ANY',
            'version': '11'
        }
    };
}

exports.config = extend(browserConfig, {
    seleniumServerJar: '../test/lib/ptor/selenium-server-standalone-2.44.0.jar',
    allScriptsTimeout: 30000,

    onPrepare: function () {
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('target/test-reports/', true, true, "e2e-"));

        var SpecReporter = require('jasmine-spec-reporter');
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true, displaySpecDuration: true}));
    },

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: false,
        defaultTimeoutInterval: 30000,
        realtimeFailure: true,
        silent:true
    }
});

