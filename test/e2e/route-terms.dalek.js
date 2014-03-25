var config = require("./config-e2e-tests.js");

module.exports = {
    'login.js': function(test){
        test
            .open(config.wwwUrl+'#/terms')
            // terms
            .wait(2000)// wait for otherwise
            .assert
                .url(config.wwwUrl+'#/terms', 'on route terms')
            .assert
                .text('.well')
                    .is.not('', 'terms are full of paragraphs')
        .done()
    }
}