var config = require("./config.js");

var userNameValue = "Z1395672127689"
    , passwordValue = "PWD_Z1395672127689"
    ;

module.exports = {

    'registration: create account': function (test) {
        console.log("userNameValue: " + userNameValue);
        console.log("passwordValue: " + passwordValue);

        test
            .open(config.path)
            .waitForElement('button[ng-click="goToReg()"]')
            .click('button[ng-click="open()"]')
            //wating unti login page is loaded
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
            .wait(500)
            .waitForElement('ng-controller="ConversationsCtrl"')
            .assert.url(config.path + '#/talks', 'login not successfull')
            .done();
    }
};