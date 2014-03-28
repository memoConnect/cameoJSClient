var config = require("./config-e2e-tests.js");

var wwwUrl = config.wwwUrl
    , userNameValue = "Z" + Date.now()
    , passwordValue = "PWD_Z" + Date.now()
    ;

module.exports = {

    'registration: create new account': function (test) {
        console.log("registration: create new account");
        console.log("userNameValue: "+userNameValue);
        console.log("passwordValue: "+passwordValue);
        console.log("Path: " + wwwUrl);

        test
            .open(config.wwwUrl+"#/logout")
            .wait(500)
            .open(wwwUrl)
            //.waitForElement('button[ng-click="goToReg()"]')
            .resize({width: 750, height: 1200})

//            .waitFor(function () {
//                return window._route.status === 'success';
//            }, 'check bla blubb', 500)
            .wait(1000)
            .click('button[ng-click="goToReg()"]')
            //wating unti reg page is loaded
            .waitForElement('button[ng-click="createUser()"]')
            .wait(1000)

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
            .wait(500)
            .click('button[ng-click="createUser()"]')
            // waiting until first page ist loaded
            .wait(500)
            .assert.url(wwwUrl + '#/talks', 'redirect to login not successfull')
            .open(wwwUrl+"#/logout")
            .waitForElement('[ng-controller="LoginCtrl"]')
            .wait(500)
            .done();
    }
};