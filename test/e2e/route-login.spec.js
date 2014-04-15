var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmUtil.js")

describe('login screen', function () {

    var ptor;

    beforeEach(function () {
        ptor = protractor.getInstance();
        ptor.ignoreSynchronization = true;
        browser.ignoreSynchronization = true;
    });


    it('should contain two buttons', function () {

        util.cmLoadPage(config.wwwUrl, ptor)

        ptor.findElements(by.css("[data-qa]")).then(function(elements) {
            expect(elements.length).toBe(2)
        })
    });
});
