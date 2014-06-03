var config = require("../../config-e2e-tests.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Captcha: ', function () {
    "use strict";

    var ptor = util.getPtorInstance()

    var messageText = "wicked_test_message_text_" + Date.now();

    /**
     * Test 1
     * Intern User is logged in and Purl is for that User
     * Parts of the Test are token from route-conversation.spec.js
     */
    describe("User1 write a new conversation with passcaptcha: ", function(){
        it('should open "#/conversation/+' + config.purlUser1 +'" after login.', function(){
            util.login()
            util.get('/conversation')
            util.expectCurrentUrl('#/conversation')
        })

        it('should be show captcha-canvas', function(){
            $("[data-qa='btn-safetyLevel-save']").click()
            $("[data-qa='btn-toogle-passcaptcha']").click()

            ptor.wait(function () {
                return util.waitForElements('cm-captcha',1)
            }, 1000, "cm-captcha count timeout");

            expect($('cm-captcha').isDisplayed()).toBe(true)
        })

        xit('should be exists an "captcha-image" element contains an img after saving and reloading the conversation', function(){
            $("[data-qa='btn-save-options']").click()
            $("[data-qa='input-answer']").sendKeys(messageText)
            $("[data-qa='btn-send-answer']").click()

            util.waitForPageLoad("/conversation/.*")

            $("[data-qa='conversation-options-bar']").click();
            ptor.wait(function () {
                return util.waitForElements("[data-qa='captcha-image']",1)
            }, 1000, "captcha-image count timeout");

            expect($("[data-qa='captcha-image']").isDisplayed()).toBe(true)
            expect($("[data-qa='captcha-image'] img").isDisplayed()).toBe(true)
        })
    })
})