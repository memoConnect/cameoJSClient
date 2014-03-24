var config = require("./config-tests.js");

module.exports = {
    'wrong-route.js': function(test){
        test
            .open(config.wwwUrl+"#/moep")
            .wait(1000)
            .assert
                .url(config.wwwUrl+'#/login', 'on route login')
        .done()
    }
}