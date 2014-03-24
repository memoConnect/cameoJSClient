var config = require("./config-tests.js");

var userNameValue = "Z" + Date.now()
    , passwordValue = "PWD_Z" + Date.now()
    , cameoIdValue = "c" + Date.now()
    ;

module.exports = {

    'registration: create account': function (test) {
        console.log("userNameValue: "+userNameValue);
        console.log("passwordValue: "+passwordValue);
        console.log("cameoIdValue: "+cameoIdValue);
        console.log("Path: " + config.wwwUrl);

        test
            .open(config.wwwUrl)
            .waitForElement('button[ng-click="goToReg()"]')
            .click('button[ng-click="goToReg()"]')
            //wating unti reg page is loaded
            .waitForElement('#registerUserButton')
            // registration
            .type('input[name="loginName"]', userNameValue)
            .type('#password', passwordValue)
            .type('#password_confirm', passwordValue)
            .type('#cameoId', cameoIdValue)

            .assert.chain()
                .val('#loginName', userNameValue, 'username has been set')
                .val('#password', passwordValue, 'password has been set')
                .val('#password_confirm', passwordValue, 'password-confirm has been set')
                .val('#cameoId', cameoIdValue, 'password-confirm has been set')
            .end()
            .click('#agbCheckbox')
            .click('#registerUserButton')
            // waiting until first page ist loaded
            .wait(2000)
            .assert.url(config.wwwUrl + '#/login', 'redirect to login not successfull')
            .done();
    }
};