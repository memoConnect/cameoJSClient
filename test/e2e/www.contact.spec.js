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

        ptor.get(ptor.baseUrl);
    });

    describe('Route without Token', function(){
        it('#/contacts should route to #/login', function(){
            var route = "#/contacts";
            redirect(route);
            expect(ptor.getCurrentUrl()).toContain(route);
        });
    });
});