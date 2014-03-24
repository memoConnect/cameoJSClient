var path = 'http://localhost:6108/app/'
//var path = 'http://localhost:9000/app/';

module.exports = {
    'registration: page elements': function (test) {
        test
            .open(path + '#/registration')

            .wait(2000)

            .assert.chain()

            .url(path + '#/registration', 'on route registration')
            .numberOfElements("[data-qa='form-input']").is(8, '8 form-controls are present')
            .end()

            .click("a[href='#/terms']").
            assert.chain()
            // check terms link
            .url(path + '#/terms', 'on route terms')
            .end()

            .done();
    }
};