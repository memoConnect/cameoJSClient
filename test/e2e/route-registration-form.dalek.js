var path = 'http://localhost:6108/app/';
//var path = 'http://localhost:9000/app/';
var userNameValue = "Z" + Date.now()
    , passwordValue = "PWD_Z" + Date.now()
    , cameoIdValue = "c" + Date.now()
    ;

module.exports = {

    'registration: create account': function (test) {
        console.log("userNameValue: "+userNameValue);
        console.log("cameoIdValue: "+cameoIdValue);

        test
            .open(path + '#/registration')
            // registration
            //TODO: wait until page loaded
            .wait(2000)
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
            //TODO: wait until page loaded
            .wait(2000)
            .assert.url(path + '#/login', 'redirect to login not successfull')
            .done();
    }
};