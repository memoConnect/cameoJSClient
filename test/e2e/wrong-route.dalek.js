var path = 'http://localhost:6108/app/index.html'

module.exports = {
    'wrong-route.js': function(test){
        test
            .open(path+"#/alterverwalter")
            .assert
                .url(path+'#/login', 'on route login')
        .done()
    }
}