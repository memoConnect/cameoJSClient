var config = require("./config-e2e-tests.js"),
    testName = 'check: wrong route';

module.exports = {}
module.exports[testName] = function(test){
    console.log('## '+testName)
    test
        .open(config.wwwUrl+"#/logout")
        .wait(500)
        .open(config.wwwUrl+"#/moep")
        .wait(1000)
        .assert
            .url(config.wwwUrl+'#/login', 'on route login')
    .done().fin(function(){
        console.log('---done---')
    })
}