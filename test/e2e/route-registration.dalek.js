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
                .numberOfElements("[data-qa='form-input']")
                    .is(7, '7 form-controls are present')
            .click("a[href='#/terms']")
            // check terms link
            .assert
                .url(path+'#/terms', 'on route terms')
        .done()
    }
}