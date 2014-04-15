var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('login screen', function () {

    var ptor;

    beforeEach(function () {
        ptor = protractor.getInstance();
        ptor.ignoreSynchronization = true;
//        browser.ignoreSynchronization = true;
    });


    it('should contain two buttons', function () {

        ptor.get(config.wwwUrl);
        util.waitForPageLoad(ptor);
        ptor.getCurrentUrl().then(function(url){
            expect(url).toMatch(/\/\#\/login$/)
        })


        $$("[data-qa]").then(function (elements) {
            expect(elements.length).toBe(2)
        })
    });

    it('should prompt for username and password after click on login and close it', function () {

        $("[data-qa='login-btn']").click();

        var user = $("input[name=user]");
        var pw = $("input[name=pw]");

        user.getAttribute("placeholder").then(function (text) {
            expect(text).not.toBe("");
        });
        pw.getAttribute("placeholder").then(function (text) {
            expect(text).not.toBe("");
        });

        $("body").sendKeys(protractor.Key.ESCAPE);

        util.waitForModalClose(ptor)

    });

    it('should show error on wrong login', function () {

        $("[data-qa='login-btn']").click();

        var user = $("input[name=user]");
        var pw = $("input[name=pw]");

        user.sendKeys("moep");
        pw.sendKeys("moep!");

        $("[data-qa='login-submit-btn']").click();

        util.waitForSpinner(ptor)


        expect($("[data-qa='login-info']").isDisplayed()).toBe(true)
        $("[data-qa='login-info']").getText().then(function (text) {
            expect(text).not.toBe("")
        })

        $("body").sendKeys(protractor.Key.ESCAPE);

        util.waitForModalClose(ptor)
    })

    it('should login with correct credentials', function () {

        $("[data-qa='login-btn']").click();

        var user = $("input[name=user]");
        var pw = $("input[name=pw]");

        user.sendKeys(config.existingLoginName);
        pw.sendKeys(config.existingPassword);

        $("[data-qa='login-submit-btn']").click();

        util.waitForPageLoad(ptor)

        ptor.getCurrentUrl().then(function(url){
            expect(url).toMatch(/\/\#\/talks$/)
        })
    })
})
