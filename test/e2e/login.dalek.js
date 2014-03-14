var path = 'http://localhost:6108/app/'

module.exports = {
    'login.js': function(test){
        test
            .open(path)
            // login
            .wait(2000)// wait for otherwise
            .assert.
                url(path+'#/login', 'on route login')
            .assert
                .numberOfElements("[data-qa='login-screen-btn']")
                    .is(2, '2 login-screen-btn are present')
            .click("button[ng-click='goToReg()']")
            // registration
            .wait(2000)
            .assert
                .url(path+'#/registration', 'on route registration')
            .assert
                .numberOfElements('.form-control')
                    .is(7, '7 form-controls are present')
            .click("a[href='#/terms']")
            // terms
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