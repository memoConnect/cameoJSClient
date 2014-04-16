var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('login screen', function () {

    var ptor;
    ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;
    util.setPtorInstance(ptor)

    util.logout()

    it('should contain two buttons', function () {

        util.get("");

        ptor.getCurrentUrl().then(function (url) {
            expect(url).toMatch(/\#\/login$/)
        })


        $$("[data-qa]").then(function (elements) {
            expect(elements.length).toBe(2)
        })
    });

    it('should route to registration when clicked', function () {

        $("[data-qa='register-btn']").click();

        util.waitForPageLoad("/registration");

    });

    it('should prompt for username and password after click on login and close it', function () {

        util.get("");

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

        util.waitForModalClose()

    });

    it('should show error on wrong login', function () {

        $("[data-qa='login-btn']").click();

        var user = $("input[name=user]");
        var pw = $("input[name=pw]");

        user.sendKeys("moep");
        pw.sendKeys("moep!");

        $("[data-qa='login-submit-btn']").click();

        util.waitForSpinner()
        util.checkWarning("login-info")

        $("body").sendKeys(protractor.Key.ESCAPE);
        util.waitForModalClose()
    })

    it('should login with correct credentials', function () {

        $("[data-qa='login-btn']").click();

        var user = $("input[name=user]");
        var pw = $("input[name=pw]");

        user.sendKeys(config.existingLoginName);
        pw.sendKeys(config.existingPassword);

        $("[data-qa='login-submit-btn']").click();

        util.waitForPageLoad("/talks")

    })

    it('dont show login page when already logged in', function () {

        util.get("");

        ptor.getCurrentUrl().then(function (url) {
            expect(url).toMatch(/\#\/talks$/)
        })
    })
})
