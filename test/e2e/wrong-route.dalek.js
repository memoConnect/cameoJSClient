require("./config.js");

module.exports = {
    'wrong-route.js': function(test){
        test
            .open(path+"#/moep")
            .wait(1000)
            .assert
                .url(path+'#/login', 'on route login')
        .done()
    }
}