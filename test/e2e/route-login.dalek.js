var config = require("./config.js");

module.exports = {
    'login.js': function(test){
        test
            .open(path)
            // login
            .wait(2000)// wait for otherwise
            .assert.
                url(config.path+'#/login', 'on route login')
            .assert
                .numberOfElements("[data-qa='login-screen-btn']")
                    .is(2, '2 login-screen-btn are present')
            .click("button[ng-click='goToReg()']")
            // registration link
            .wait(2000)
            .assert
                .url(config.path+'#/registration', 'on route registration')
        .done()
    }
}