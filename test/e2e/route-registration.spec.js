var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

var loginName = "Z" + Date.now();
var password = "PWD_Z" + Date.now();

describe('registration', function () {

    var ptor;

    beforeEach(function () {
        ptor = protractor.getInstance();
        ptor.ignoreSynchronization = true;
        util.ptor = ptor
//        browser.ignoreSynchronization = true;
    });


    it('should contain 7 input fields with placeholders', function () {

        ptor.get(config.wwwUrl + "#/logout");
        util.waitForPageLoad(ptor);

        ptor.get(config.wwwUrl + "#/registration");
        util.waitForPageLoad(ptor);

        $$("input").then(function (elements) {
            expect(elements.length).toBe(7)
            elements.forEach(function (element) {
                element.getAttribute("placeholder").then(function (text) {
                    element.getAttribute("type").then(function (type) {
                        if (type != "checkbox") {
                            expect(text).not.toBe("");
                        }
                    })
                });
            })
        })
    })

    it('should display errors if required fields are empty', function () {

        $("[data-qa='btn-createUser']").click()

//        util.checkWarning("register-info-username-empty")
        util.checkWarning("drtv-password-error-emtpy")
        util.checkWarning("register-info-terms")
    })

    it('should display error if username too short', function () {

        ptor.get(config.wwwUrl + "#/registration");
        util.waitForPageLoad(ptor);

        $("[data-qa='input-loginName']").sendKeys("moep")

        util.checkWarning("register-info-user-min-letter-count")

        // it should disappear if we type more letters
        $("[data-qa='input-loginName']").sendKeys("moep")
        expect($("[data-qa='register-info-user-min-letter-count']").isDisplayed()).toBe(false)

        util.clearInput('input-loginName')
    })

    it('should display error if username exists', function () {

        $("[data-qa='input-loginName']").sendKeys(config.existingLoginName)

        ptor.wait(function () {
            return $("[data-qa='register-info-username-exists']").isDisplayed()
        }, 1000, "username exists timeout")

        util.checkWarning("register-info-username-exists")
        util.clearInput('input-loginName')

    })

    it('should return error on wrong password repeat', function () {

        $("[data-qa='input-password']").sendKeys(password)
        $("[data-qa='input-passwordConfirm']").sendKeys("moep")
        $("[data-qa='icon-passwordConfirm']").getAttribute("class").then(function(cl){
            expect(cl).toContain("cm-checkbox-wrong")
        })

    })

//    it('should link to term of use', function() {
//
//        $("[data-qa='link-terms']").click()
//        ptor.sleep(3000)
//        util.waitForPageLoad(ptor);
//        ptor.getCurrentUrl().then(function(url){
//            expect(url).toMatch(/\#\/terms$/)
//        })
//
//    })




})
