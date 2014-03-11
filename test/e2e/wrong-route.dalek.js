var path = 'http://localhost:9000/app/index.html'

module.exports = {
    'wrong-route.js': function(test){
        test
            .open(path+"#/alterverwalter")
            .assert
                .url(path+'#/login', 'on route login')
        .done()
    }
}