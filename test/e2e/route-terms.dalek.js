var config = require("./config-e2e-tests.js"),
    testName = 'check: route terms';

module.exports = {}
module.exports[testName] = function(test){
    console.log('## '+testName)
    test
        .open(config.wwwUrl+'#/terms')
        // terms
        .wait(2000)// wait for otherwise
        .assert
            .url(config.wwwUrl+'#/terms', 'on route terms')
        .assert
            .text('.cm-page-body')
                .is.not('', 'terms are full of paragraphs')
    .done().fin(function(){
        console.log('---done---')
    })
}