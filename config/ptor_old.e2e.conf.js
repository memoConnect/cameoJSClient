/**
 # start selenium server for browser control
 webdriver-manager start

 # start webserver for the app
 python -m http.server 1337

    # run specs with head browser
    protractor config/ptor.e2e.conf

    # run specs with phantomjs / headless browser
    phantomjs --webdriver=9515
    protractor test/conf/ptor.e2e --browser phantomjs --seleniumAddress http://localhost:9515

*/

// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
//    capabilities: null,
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs',
        'phantomjs.cli.args':['--webdriver=9515']
    },

    browser: 'phantomjs',

    baseUrl: 'http://localhost:9000/app/index.html',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: [
        '../test/e2e/*.spec.js'
    ],

    // Override the timeout for webdriver to 20 seconds.
    allScriptsTimeout: 20000,

    webdriverLoglevel: 'DEBUG',

    keepAlive: false,

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: false,
        includeStackTrace: true
    }
};