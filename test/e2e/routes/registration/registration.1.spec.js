var config = require("../../config/specs.js")
var util = require("../../cmUtil.js")

var password = "PWD_Z" + Date.now();

describe('Registration: ', function () {
    var ptor = util.getPtorInstance()

    it('should contain 4 input fields', function () {
        util.logout()

        util.get("/registration");
        util.waitForPageLoad('/registration')

        $$("input").then(function (elements) {
            expect(elements.length).toBe(4)
        })
    })

    it('should contain link to terms', function() {
        util.waitForElement("[data-qa='link-terms']")
        $("[data-qa='link-terms']").click()
        util.waitForPageLoad("/terms")
    })

    it('should go back to registration',function(){
        util.waitForElement('cm-back div.back-wrap')
        $('cm-back div.back-wrap').click()
        util.waitForPageLoad("/registration")
    })

    it('should display errors if required fields are empty', function () {
        $("[data-qa='btn-createUser']").click()

        util.checkWarning("cameoId-info-username-empty")
        util.checkWarning("drtv-password-error-empty")
        util.checkWarning("register-info-terms")
    })

    it('should display error if username too short', function () {
        util.get("/registration");
        util.waitForPageLoad('/registration')

        $("[data-qa='input-cameoId']").sendKeys("mo")
        ptor.sleep(1150)
        util.checkWarning("cameoId-info-user-min-letter-count")

        // it should disappear if we type more letters
        $("[data-qa='input-cameoId']").sendKeys("ep")
        ptor.sleep(1150)
        expect($("[data-qa='cameoId-info-user-min-letter-count']").isDisplayed()).toBe(false)

        util.clearInput('input-cameoId')
    })

    it('should display error if username is invalid', function () {
        util.get("/registration");
        util.waitForPageLoad('/registration')

        $("[data-qa='input-cameoId']").sendKeys("moep-moep")

        ptor.wait(function () {
            return $("[data-qa='cameoId-info-username-invalid']").isDisplayed()
        }, "username invalid timeout")

        util.checkWarning('cameoId-info-username-invalid')

        util.clearInput('input-cameoId')
    })

    it('should display error if username exists', function () {
        util.get("/registration")
        util.waitForPageLoad('/registration')

        $("[data-qa='input-cameoId']").sendKeys(config.loginUser1)

        ptor.wait(function () {
            return $("[data-qa='cameoId-info-username-exists']").isDisplayed()
        }, 5000, "username exists timeout")

        util.checkWarning("cameoId-info-username-exists")
        util.clearInput('input-cameoId')

    })

    it('should return error on wrong password repeat', function () {
        $("[data-qa='input-password']").sendKeys(password)
        $("[data-qa='input-passwordConfirm']").sendKeys("moep")
        $("[data-qa='icon-passwordConfirm']").getAttribute("class").then(function(cl){
            expect(cl).toContain("cm-checkbox-wrong")
        })

    })

    it('should create account with valid credentials and have a support talk', function() {
        util.createTestUser()
        .then(function(loginName){
            testUser = loginName
            util.get('/talks')
            return util.waitForPageLoad('/talks')
        })
        .then(function(){
            // support talks should be present
            return  util.waitForElement("[data-qa='conversation-list-element']")
                    .then(function(){
                        return $$("[data-qa='conversation-list-element']").then(function (elements) {
                            expect(elements.length).toBe(1)
                        })
                    })
            
        })
    
    })

    it('should delete Testuser', function(){
        util.deleteTestUser(testUser)
    })
})
