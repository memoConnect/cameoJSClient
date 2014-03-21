//var path = 'http://localhost:6108/app/'
var path = 'http://localhost:9000/app/'
    , userNameValue = "brummWummZ" + Date.now()
    , passwordValue = "brummWummPWD_Z" + Date.now()
    , cameoIdValue = "cameo" + Date.now()
    ;

module.exports = {
    'registration: create account': function (test) {

        test
            .open(path + '#/registration')
            // registration
            .wait(2000)
            .type('#loginName', userNameValue)
            .type('#password', passwordValue)
            .type('#password_confirm', passwordValue)
            .type('#cameoId', cameoIdValue)

            .assert.chain()
                .val('#loginName', userNameValue, 'username has been set')
                .val('#password', passwordValue, 'password has been set')
                .val('#password_confirm', passwordValue, 'password-confirm has been set')
                .val('#cameoId', cameoIdValue, 'password-confirm has been set')
            .end()
            .click('termsOfUseCheckButton')
            .wait(500)
            .click('#registerUserButton')
            .wait(2000)
            .done();
    }
};