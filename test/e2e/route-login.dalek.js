var config = require("./config-tests.js");

module.exports = {
    'login.js': function(test){
        test
            .open(config.wwwUrl)
            // login
            .wait(2000)// wait for otherwise
            .assert.
                url(config.wwwUrl+'#/login', 'on route login')
            .assert
                .numberOfElements("[data-qa='login-screen-btn']")
                    .is(2, '2 login-screen-btn are present')
            .click("button[ng-click='goToReg()']")
            // registration link
            .wait(2000)
            .assert
                .url(config.wwwUrl+'#/registration', 'on route registration')
        .done()
    }
}