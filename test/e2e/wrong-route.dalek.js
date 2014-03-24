var config = require("./config.js");

module.exports = {
    'wrong-route.js': function(test){
        test
            .open(config.path+"#/moep")
            .wait(1000)
            .assert
                .url(config.path+'#/login', 'on route login')
        .done()
    }
}