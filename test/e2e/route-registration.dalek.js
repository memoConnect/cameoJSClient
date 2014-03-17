var path = 'http://localhost:6108/app/'

module.exports = {
    'registration.js': function(test){
        test
            .open(path+'#/registration')
            // registration
            .wait(2000)
            .assert
                .url(path+'#/registration', 'on route registration')
            .assert
                .numberOfElements('.form-control')
                    .is(6, '6 form-controls are present')
            .click("a[href='#/terms']")
            // check terms link
            .assert
                .url(path+'#/terms', 'on route terms')
        .done()
    }
}