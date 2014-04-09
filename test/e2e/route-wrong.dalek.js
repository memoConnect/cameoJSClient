var config = require("./config-e2e-tests.js"),
    testName = 'check: wrong route';

module.exports = {}
module.exports[testName] = function(test){
    console.log('## '+testName)
    test
        .open(config.wwwUrl+"#/logout")
        .wait(config.routeTimeout)

        .open(config.wwwUrl+"#/moep")
        .wait(config.routeTimeout)

        .assert
            .url(config.wwwUrl+'#/login', 'on route login')

    .done()
}