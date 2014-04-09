var config = require('./config-e2e-tests.js'),
    testName = 'login: login with correct credentials',
    wwwUrl = config.wwwUrl,
    userNameValue = config.accountName,
    passwordValue = config.accountPassword,
    invalidPasswordValue = "moep!!!!";

module.exports = {}
module.exports[testName] =  function (test) {
    console.log('## '+testName)
    console.log("\tuserNameValue: " + userNameValue)
    console.log("\tpasswordValue: " + passwordValue)
    console.log("\twwwUrl: " + wwwUrl)

    test
        // safe logout
        .open(config.wwwUrl+"#/logout")
        .wait(config.routeTimeout)

        // start page
        .open(wwwUrl)
        .wait(config.routeTimeout)
        .resize(config.screenDimensions)

        // open login modal
        .click('button[ng-click="open()"]')

        // test incomplete login begin
        /*.type('input[name="user"]', userNameValue)


        .assert.chain()
        .val('input[name="user"]', userNameValue, 'username has been set')
        .val('input[name="pw"]', passwordValue, 'password has been set')
        .end()
        .click('button[data-qa="login-submit-btn"]')*/
        // test incomplete login end

        // test successfull login begin
        .type('input[name="user"]', userNameValue)
        .type('input[name="pw"]', passwordValue)

        .assert.chain()
            .val('input[name="user"]', userNameValue, 'username has been set')
            .val('input[name="pw"]', passwordValue, 'password has been set')
        .end()
        .click('button[data-qa="login-submit-btn"]')
        // test successfull login end

        // talks
        .wait(config.routeTimeout+500)
        .assert
            .url(wwwUrl + '#/talks', 'login not successfull')

        // for human viewable route changeing
        .wait(2000)

        // do logout
        .open(wwwUrl+"#/logout")
            .wait(config.test)

    .done()
}