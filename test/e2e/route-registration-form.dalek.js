require("./config.js");

var userNameValue = "Z" + Date.now()
    , passwordValue = "PWD_Z" + Date.now()
    , cameoIdValue = "c" + Date.now()
    ;

module.exports = {

    'registration: create account': function (test) {
        console.log("userNameValue: "+userNameValue);
        console.log("cameoIdValue: "+cameoIdValue);
        console.log("Path: ");
        console.log("Path: " + path);

        test
            .open(path + '#/registration')
//            .waitForElement('body')
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
            .click('#agbCheckbox')
            .click('#registerUserButton')
            .wait(2000)
            .assert.url(path + '#/login', 'redirect to login successfull')
            .done();
    }
};