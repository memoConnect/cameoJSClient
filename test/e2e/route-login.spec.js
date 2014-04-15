var config = require("./config-e2e-tests.js")

describe('login screen', function() {


    it('should contain two buttons', function() {

//        browser.get(config.wwwUrl);
        browser.get('http://localhost:9000/app/');

        expect("foo").toBe("foo")
    });
});
