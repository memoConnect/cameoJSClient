var config = require("./config-e2e-tests.js"),
    testName = 'registration: create new account',
    wwwUrl = config.wwwUrl,
    userNameValue = "Z" + Date.now(),
    passwordValue = "PWD_Z" + Date.now();

module.exports = {}
module.exports[testName] = function (test) {
    console.log('## '+testName)
    console.log("\tuserNameValue: "+userNameValue)
    console.log("\tpasswordValue: "+passwordValue)
    console.log("\tPath: " + wwwUrl)

    test
        // safe logout
        .open(config.wwwUrl+"#/logout")
        .wait(config.routeTimeout)

        // start page
        .open(wwwUrl)
        .wait(config.routeTimeout)
        .resize(config.screenDimensions)

        // to registration
        .click('button[ng-click="goToReg()"]')
        .wait(config.routeTimeout)

        // registration
        .type('input[name="loginName"]', userNameValue)
        .type('input[name="password"]', passwordValue)
        .type('input[id="password_confirm"]', passwordValue)
//            .type('input[name="cameoId"]', cameoIdValue)

        .assert.chain()
            .val('input[name="loginName"]', userNameValue, 'username has no valid value')
            .val('input[name="password"]', passwordValue, 'password has no valid value')
            .val('input[id="password_confirm"]', passwordValue, 'password-confirm has no valid value')
//                .val('input[name="cameoId"]', cameoIdValue, 'cameoId has no valid value')
        .end()
        .click('i[ng-click="acceptTerms()"]')
        .click('#registerUserButton')

        // redirect to talks after registration successful
        .wait(config.routeTimeout)
        .assert
            .url(wwwUrl + '#/talks', 'redirect to talks not successfull')

        // for human viewable route changeing
        .wait(2000)

        // logout
        .open(wwwUrl+"#/logout")
        .wait(config.routeTimeout)

    .done()
}