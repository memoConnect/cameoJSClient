var extend = function(destination,source) {
    for (var property in source)
        destination[property] = source[property];
    return destination;
}

var useChrome = true,
    browserConfig = {};

/* Chrome */
if(useChrome){
    browserConfig = {
        //seleniumPort: null,
        chromeDriver: '<%= chromeDriverPath %>',
        directConnect: false,
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
        seleniumServerJar: '../../../test/lib/ptor/selenium-server-standalone-2.44.0.jar',
        capabilities: {
            'browserName': 'internet explorer',
            'platform': 'ANY',
            'version': '11'
        }
    };
}

exports.config = extend(browserConfig, {
    allScriptsTimeout: 60000,

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
        defaultTimeoutInterval: 60000,
        realtimeFailure: true,
        silent:true
    }
});

