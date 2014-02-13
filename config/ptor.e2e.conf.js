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
    capabilities: {
        'browserName': 'chrome'
    },

//    baseUrl: 'http://localhost:1337/app/',
    baseUrl: 'http://localhost/cameoJSClient/app/', // empu

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['../test/e2e/*.spec.js'],

    // Override the timeout for webdriver to 20 seconds.
    allScriptsTimeout: 20000,

    webdriverLoglevel: 'DEBUG',

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true
       ,defaultTimeoutInterval: 30000
       ,isVerbose: false
       ,includeStackTrace: true
    }
};