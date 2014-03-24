require("./config.js");

module.exports = {
    'login.js': function(test){
        test
            .open(path+'#/terms')
            // terms
            .wait(2000)// wait for otherwise
            .assert
                .url(path+'#/terms', 'on route terms')
            .assert
                .text('.well')
                    .is.not('', 'terms are full of paragraphs')
        .done()
    }
}