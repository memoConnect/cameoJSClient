var config = require("./config.js");

module.exports = {
    'registration: page elements': function (test) {
        test
            .open(config.path + '#/registration')

            .wait(2000)

            .assert.chain()

            .url(config.path + '#/registration', 'on route registration')
            .numberOfElements("[data-qa='form-input']").is(8, '8 form-controls are present')
            .end()

            .click("a[href='#/terms']").
            assert.chain()
            // check terms link
            .url(config.path + '#/terms', 'on route terms')
            .end()

            .done();
    }
};