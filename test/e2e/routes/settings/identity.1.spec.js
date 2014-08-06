var config = require("../../config-e2e-tests.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Route: Settings - Identity', function(){
    "use strict";

    var ptor = util.getPtorInstance()

    var newTestUser = ""
    var password = 'password'

    var newDisplayName = 'TestMoeper';
    var newPhoneNumber = '+49123456789';
    var newEmail = 'moeper@moep.moep';

    afterEach(function() { util.stopOnError() });

    describe('Test 1 - GUI', function(){
        it('should be load at "#/settings/identity" after login.', function(){
            util.login()
            util.expectCurrentUrl('#/start')

            util.get('/settings/identity')
            util.expectCurrentUrl('#/settings/identity')
        })

        it('should be possible to go to identity settings, if clicking on name in header', function(){

            util.get('/talks');
            util.expectCurrentUrl('#/talks')

            util.waitForElement("[data-qa='btn-open-identity-modal']");
            expect($("[data-qa='btn-open-identity-modal']").isPresent()).toBe(true)

            $("[data-qa='btn-open-identity-modal']").click();

            util.waitForModalOpen('modal-identity');

            expect($("[data-qa='btn-identity-settings']").isPresent()).toBe(true)

            $("[data-qa='btn-identity-settings']").click();

            util.waitForPageLoad("/settings/identity")
        })

        it('should exists a key management button', function(){
            util.waitForElement("[data-qa='btn-identity-keys']");
            expect($("[data-qa='btn-identity-keys']").isPresent()).toBe(true)
        })

        it('should be exists a trust button', function(){
            util.waitForElement("[data-qa='btn-identity-trust']");
            expect($("[data-qa='btn-identity-trust']").isPresent()).toBe(true)
        })

        it('should be exists a form with following elements', function(){
            util.waitForElement("[data-qa='input-cameoId']");
            expect($("[data-qa='input-cameoId']").isPresent()).toBe(true)

            util.waitForElement("[data-qa='input-displayname']");
            expect($("[data-qa='input-displayname']").isPresent()).toBe(true)
        })

        it('shoudl be exists a save button', function(){
            util.waitForElement("[data-qa='btn-saveIdentity']");
            expect($("[data-qa='btn-saveIdentity']").isPresent()).toBe(true)
        })
    })

    describe('Test 2 - new Test User', function(){
        it('should be created', function(){
            util.logout()
            newTestUser = util.createTestUser()
        })

        it('should be logged in', function(){
            util.expectCurrentUrl('#/start')
        })

        it('should go to identity settings', function(){
            util.get('/settings/identity')
            util.expectCurrentUrl('#/settings/identity')
        })

        it('cameoId should be exists ('+ newTestUser +')', function(){
            util.waitForElement("[data-qa='input-cameoId']");
            expect($("[data-qa='input-cameoId']").isPresent()).toBe(true)

            expect($("[data-qa='input-cameoId']").getAttribute('value')).toBe(newTestUser + "@cameonet.de")
        })

        it('should change the displayName', function(){
            util.clearInput('input-displayname')
            $("[data-qa='input-displayname']").sendKeys(newDisplayName)

            $("[data-qa='btn-saveIdentity']").click()

            util.waitAndCloseNotify()
        })

        it('should change the phoneNumber and E-Mail', function(){
            util.clearInput('input-phonenumber')
            $("[data-qa='input-phonenumber']").sendKeys(newPhoneNumber)
            expect($("[data-qa='input-phonenumber']").getAttribute('value')).toBe(newPhoneNumber)

            util.clearInput('input-email')
            $("[data-qa='input-email']").sendKeys(newEmail)
            expect($("[data-qa='input-email']").getAttribute('value')).toBe(newEmail)

            $("[data-qa='btn-saveIdentity']").click()

            util.waitAndCloseNotify()
        })
    })

    describe('Test 3 - check Data after logout and login', function(){
        it('should be load at "#/settings/identity" after login.', function(){
            util.login(newTestUser, password)
            util.expectCurrentUrl('#/start')

            util.get('/settings/identity')
            util.expectCurrentUrl('#/settings/identity')
        })

        it('displayName should be ('+ newDisplayName +')', function(){
            util.waitForElement("[data-qa='input-displayname']");
            expect($("[data-qa='input-displayname']").isPresent()).toBe(true)

            expect($("[data-qa='input-displayname']").getAttribute('value')).toBe(newDisplayName)
        })

        it('phoneNumber should be ('+ newPhoneNumber +')', function(){
            util.waitForElement("[data-qa='input-phonenumber']");
            expect($("[data-qa='input-phonenumber']").isPresent()).toBe(true)

            expect($("[data-qa='input-phonenumber']").getAttribute('value')).toBe(newPhoneNumber)
        })

        it('phoneNumber should be ('+ newEmail +')', function(){
            util.waitForElement("[data-qa='input-email']");
            expect($("[data-qa='input-email']").isPresent()).toBe(true)

            expect($("[data-qa='input-email']").getAttribute('value')).toBe(newEmail)
        })

        it('should be delete TestUser "' + newTestUser + '"', function(){
            util.deleteTestUser(newTestUser)
        })
    });

    describe('Test4 - Form Errors on wrong Input', function(){
        it('should be load at "#/settings/identity" after login.', function(){
            util.login()
            util.expectCurrentUrl('#/start')

            util.get('/settings/identity')
            util.expectCurrentUrl('#/settings/identity')
        })

        it('should be shown an error, if email is wrong', function(){
            util.waitForElement("[data-qa='input-email']");
            expect($("[data-qa='input-email']").isPresent()).toBe(true)

            util.clearInput('input-email')
            $("[data-qa='input-email']").sendKeys('moep@moep')
            $("body").click()

            util.waitForElement("[data-qa='form-error-email-invalid']");
        })

        it('should not be shown an error, if email is okay', function(){
            util.waitForElement("[data-qa='input-email']");
            expect($("[data-qa='input-email']").isPresent()).toBe(true)

            util.clearInput('input-email')
            $("[data-qa='input-email']").sendKeys('moep@moep.de')
            $("body").click()

            ptor.wait(function() {
                return  $("[data-qa='form-error-email-invalid']").isDisplayed().then(function(res) {
                    return ! res
                })
            }, 5000, "timeout while waiting for warning to disappear")
        })

        it('should be shown an error, if phonenumber is wrong', function(){
            util.waitForElement("[data-qa='input-phonenumber']");
            expect($("[data-qa='input-phonenumber']").isPresent()).toBe(true)

            util.clearInput('input-phonenumber')
            $("[data-qa='input-phonenumber']").sendKeys('abcdefg')
            $("body").click()

            util.waitForElement("[data-qa='form-error-phoneNumber-invalid']");
        })

        it('should not be shown an error, if phonenumber is okay', function(){
            util.waitForElement("[data-qa='input-phonenumber']");
            expect($("[data-qa='input-phonenumber']").isPresent()).toBe(true)

            util.clearInput('input-phonenumber')
            $("[data-qa='input-phonenumber']").sendKeys('123456789')
            $("body").click()

            ptor.wait(function() {
                return  $("[data-qa='form-error-phoneNumber-invalid']").isDisplayed().then(function(res) {
                    return ! res
                })
            }, 5000, "timeout while waiting for warning to disappear")
        })
    })

});
