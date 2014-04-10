var config = require("./config-e2e-tests.js"),
    testName = 'check: route login and registration';

module.exports = {}
module.exports[testName] = function(test){
    console.log('## '+testName)
    test
        // safe logout
        //.open(config.wwwUrl + "#/logout")
        //.wait(config.routeTimeout)

        // start page
        .open(config.wwwUrl)
        .waitForElement("[data-qa='login-screen-btn']")
        .assert
            .url(config.wwwUrl+'#/login', 'on route login')

        .assert
            .numberOfElements("[data-qa='login-screen-btn']").is(2, '2 login-screen-btn are present')

        // registration
        .click("button[ng-click='goToReg()']")
        //.wait(config.routeTimeout)
        .assert
            .url(config.wwwUrl+'#/registration', 'on route registration')

    .done()
}