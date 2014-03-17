var path = 'http://localhost:6108/app/'

module.exports = {
    'login.js': function(test){
        test
            .open(path+'#/terms')
            // terms
            .wait(2000)// wait for otherwise
            .assert
                .url(path+'#/terms', 'on route terms')
            .assert
                .text('h2')
                    .is.not('', 'terms header is shown')
            .assert
                .text('.well')
                    .is.not('', 'terms are full of paragraphs')
        .done()
    }
}