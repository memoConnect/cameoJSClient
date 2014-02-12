var url = require("url");

describe('cameoApp', function() {
    var ptor;

    function redirect(rel_path) {
        ptor.get(url.resolve(ptor.baseUrl, rel_path));
        ptor.wait(function () {
            return ptor.getCurrentUrl().then(function(in_url) {
                var re = new RegExp(rel_path, "i");
                return re.test(in_url);
            });
        }, ptor.allScriptsTimeout, "Taking too long to load " + rel_path);
    }

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.ignoreSynchronization = true;
        browser.ignoreSynchronization = true;
    });

    it('open app and should redirect to #/login', function(){
        ptor.get(ptor.baseUrl);
        ptor.sleep(3000);
        ptor.getCurrentUrl().
            then(function(url) {
                expect(url).toMatch('#/login');

                ptor.findElement(by.css('.form-signin-heading')).getText().
                    then(function(cssClass) {
                        expect(cssClass).toBe('Login');
                    });
            });
    }, 30000);
});