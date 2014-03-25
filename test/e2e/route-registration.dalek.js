var config = require("./config-e2e-tests.js");

module.exports = {
    'registration: page elements': function (test) {
        test
            .open(config.wwwUrl + '#/registration')

            .wait(2000)

            .assert.chain()

            .url(config.wwwUrl + '#/registration', 'on route registration')
            .numberOfElements("[data-qa='form-input']").is(8, '8 form-controls are present')
            .end()

            .click("a[href='#/terms']").
            assert.chain()
            // check terms link
            .url(config.wwwUrl + '#/terms', 'on route terms')
            .end()

            .done();
    }
};