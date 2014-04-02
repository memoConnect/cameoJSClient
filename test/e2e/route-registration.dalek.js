var config = require("./config-e2e-tests.js"),
    testName = 'registration: page elements';

module.exports = {}
module.exports[testName] = function(test) {
    console.log('## '+testName)
    test
        .open(config.wwwUrl + '#/logout')
        .wait(1000)
        .open(config.wwwUrl + '#/registration')
        .wait(1000)

//      .waitFor(function () {
//          return window._route.status = 'success';
//      }, 'reg form could not be loaded', 5000)

        .assert.chain()

        .url(config.wwwUrl + '#/registration', 'on route registration')
        .numberOfElements("[data-qa='form-input']").is(7, '7 form-controls are present')
        .end()

        .click("a[href='#/terms']").
        assert.chain()
        // check terms link
        .url(config.wwwUrl + '#/terms', 'on route terms')
        .end()

    .done().fin(function(){
        console.log('---done---')
    })
}