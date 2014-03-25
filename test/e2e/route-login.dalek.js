var config = require("./config-e2e-tests.js");

module.exports = {
    'login.js': function(test){
        test
            .open(config.wwwUrl+"#/logout")
            .wait(500)
            .open(config.wwwUrl)
            // login
            .wait(500)// wait for otherwise
            .assert.chain()
                .url(config.wwwUrl+'#/login', 'on route login')
                .numberOfElements("[data-qa='login-screen-btn']").is(2, '2 login-screen-btn are not present')
            .end()
            .click("button[ng-click='goToReg()']")
            // registration link
            .wait(500)
            .assert
                .url(config.wwwUrl+'#/registration', 'on route registration')
        .done()
    }
}