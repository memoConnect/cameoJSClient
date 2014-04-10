var config = require("./config-e2e-tests.js"),
    testName = 'check: route terms';

module.exports = {}
module.exports[testName] = function(test){
    console.log('## '+testName)
    test
        .open(config.wwwUrl+'#/logout')
        .wait(config.routeTimeout)

        // terms
        .open(config.wwwUrl+'#/terms')
        .wait(config.routeTimeout)// wait for otherwise
        .assert
            .url(config.wwwUrl+'#/terms', 'on route terms')

        .assert.chain()
            .text('.cm-page-body')
                .is.not('', 'terms are full of paragraphs')
        .end()

    .done()
}