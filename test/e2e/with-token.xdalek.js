module.exports = {
    'with-token.js': function(test){
        test
            .open(path+"#/login")
            .assert
                .url(path+'#/login', 'on route login')
            .type("input[name='user']", 'Max')
            .type("input[name='pw']", 'max.mustermann')
//            .click("button[type='submit']")
            .click("[data-qa='login-submit-btn']")
            // logged in as max and routed to start
            .wait(10000)
            .assert
                .url(path+'#/start', 'on route start')
            .assert
                .text('h1')
                    .is('Welcome', 'welcome to the cameo world')
            .assert
                .text('h3')
                    .is('MaxMustermann', 'max is very welcome')
            // logout
            .click("a[ng-click='logout()']")
            .wait(1000)
            .assert
                .url(path+'#/login', 'successful logged out')
        .done()
    }
}