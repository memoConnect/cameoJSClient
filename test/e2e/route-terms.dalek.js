var config = require("./config.js");

module.exports = {
    'login.js': function(test){
        test
            .open(config.path+'#/terms')
            // terms
            .wait(2000)// wait for otherwise
            .assert
                .url(config.path+'#/terms', 'on route terms')
            .assert
                .text('.well')
                    .is.not('', 'terms are full of paragraphs')
        .done()
    }
}