var config = require('./config-e2e-tests.js');

var wwwUrl = config.wwwUrl
    , userNameValue = config.accountName
    , passwordValue = config.accountPassword
    ;

module.exports = {
    'login: login with correct credentials': function (test) {
        console.log("userNameValue: " + userNameValue);
        console.log("passwordValue: " + passwordValue);

        test
            .open(config.wwwUrl+"#/logout")
            .wait(500)
            .open(wwwUrl)
            //.waitForElement('button[ng-click="goToReg()"]')
            .resize({width: 750, height: 1200})
            .wait(1000)
            .click('button[ng-click="open()"]')
            //wating until login page is loaded
            .waitForElement('[ng-controller="LoginCtrl"]')
            .wait(1000)
            // registration
            .type('input[name="user"]', userNameValue)
            .type('input[name="pw"]', passwordValue)

            .assert.chain()
                .val('input[name="user"]', userNameValue, 'username has been set')
                .val('input[name="pw"]', passwordValue, 'password has been set')
            .end()
            .click('button[data-qa="login-submit-btn"]')

            // waiting until first page ist loaded
            .wait(1000)
            .waitForElement('ng-controller="ConversationsCtrl"')
            .assert.url(wwwUrl + '#/talks', 'login not successfull')
            .open(wwwUrl+"#/logout")
            .waitForElement('[ng-controller="LoginCtrl"]')
            .done();
    }
};