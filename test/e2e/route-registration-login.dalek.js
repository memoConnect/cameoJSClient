var config = require('./config-tests.js');

var wwwUrl = config.wwwUrl
    , userNameValue = config.accountName
    , passwordValue = config.accountPassword
    ;

module.exports = {
    'registration: create account': function (test) {
        console.log("userNameValue: " + userNameValue);
        console.log("passwordValue: " + passwordValue);

        test
            .open(wwwUrl)
            .waitForElement('button[ng-click="goToReg()"]')
            .click('button[ng-click="open()"]')
            //wating until login page is loaded
            .waitForElement('[ng-controller="LoginCtrl"]')
            // registration
            .type('input[name="user"]', userNameValue)
            .type('input[name="pw"]', passwordValue)

            .assert.chain()
                .val('input[name="user"]', userNameValue, 'username has been set')
                .val('input[name="pw"]', passwordValue, 'password has been set')
            .end()
            .click('button[data-qa="login-submit-btn"]')

            // waiting until first page ist loaded
            .wait(2000)
            .waitForElement('ng-controller="ConversationsCtrl"')
            .assert.url(wwwUrl + '#/talks', 'login not successfull')
            .done();
    }
};