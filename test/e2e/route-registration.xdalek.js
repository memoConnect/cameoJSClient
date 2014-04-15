var config = require("./config-e2e-tests.js"),
    testName = 'registration: form-input check';

module.exports = {}
module.exports[testName] = function(test) {
    console.log('## '+testName)
    test
        // safe logout
        .open(config.wwwUrl + '#/logout')
        .wait(config.routeTimeout)
        .assert
            .url(config.wwwUrl + '#/login', 'on route login')

        // registration
        .open(config.wwwUrl + '#/registration')
        .wait(config.routeTimeout)
        .assert
            .url(config.wwwUrl + '#/registration', 'on route registration')

        .assert
            .numberOfElements("[data-qa='form-input']", 7, '7 form-inputs are present')

        // terms
        .click("a[href='#/terms']")
        .wait(config.routeTimeout)
        .assert
            // check terms link
            .url(config.wwwUrl + '#/terms', 'on route terms')

    .done()
}