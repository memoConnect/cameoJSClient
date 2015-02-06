var config = require("../../config/specs.js")
var util = require("../../cmUtil.js")

describe('Route Identity Settings: ', function(){
    var ptor = util.getPtorInstance()

    var newTestUser = ""
    var password = 'password'

    var newDisplayName = 'TestMoeper';
    var newPhoneNumber = '+49123456789';
    var newEmail = 'devnull@cameo.io';

    describe('Test 1 - GUI', function(){
        it('should load at "#/settings/identity/edit" after login.', function(){
            util.login()

            util.get('/settings/identity/edit')
            util.expectCurrentUrl('#/settings/identity/edit')
        })

        it('should have key management button', function(){
            util.waitForElement("[data-qa='btn-identity-keys']")
            expect($("[data-qa='btn-identity-keys']").isPresent()).toBe(true)
        })

        it('should have a trust button', function(){
            util.waitForElement("[data-qa='btn-identity-trust']")
            expect($("[data-qa='btn-identity-trust']").isPresent()).toBe(true)
        })

        it('should have a form with following elements', function(){
            util.waitForElement("[data-qa='ctn-cameoid']")
            expect($("[data-qa='ctn-cameoid']").isPresent()).toBe(true)

            util.waitForElement("[data-qa='input-displayname']")
            expect($("[data-qa='input-displayname']").isPresent()).toBe(true)
        })

        it('should have a save button', function(){
            util.waitForElement("[data-qa='btn-saveIdentity']")
            expect($("[data-qa='btn-saveIdentity']").isPresent()).toBe(true)
        })
    })

    describe('Test 2 - new Test User', function(){
        it('should be created', function(){
            util.logout()
            util.createTestUser(undefined, 'identity settings')
            .then(function(loginName){
                newTestUser = loginName
            })
        })

        it('should go to identity settings', function(){
            util.get('/settings/identity/edit')
            util.expectCurrentUrl('#/settings/identity/edit')
        })

        it('cameoId should be exists ('+ newTestUser +')', function(){
            util.waitForElement("[data-qa='ctn-cameoid']")
            expect($("[data-qa='ctn-cameoid']").isPresent()).toBe(true)

            expect($("[data-qa='ctn-cameoid']").getText()).toMatch(newTestUser + "@cameonet.de")
        })

        it('should change the displayName', function(){
            util.clearInput('input-displayname')
            $("[data-qa='input-displayname']").sendKeys(newDisplayName)

            $("[data-qa='btn-saveIdentity']").click()
        })

        it('should change the phoneNumber and E-Mail', function(){
            util.clearInput('input-phoneNumber')
            $("[data-qa='input-phoneNumber']").sendKeys(newPhoneNumber)
            expect($("[data-qa='input-phoneNumber']").getAttribute('value')).toBe(newPhoneNumber)

            util.clearInput('input-email')
            $("[data-qa='input-email']").sendKeys(newEmail)
            expect($("[data-qa='input-email']").getAttribute('value')).toBe(newEmail)

            $("[data-qa='btn-saveIdentity']").click()
        })
    })

    describe('Test 3 - check Data after logout and login', function(){
        it('should be load at "#/settings/identity/edit" after login.', function(){
            util.login(newTestUser, password)
            util.expectCurrentUrl('/setup')

            util.get('/settings/identity/edit')
            util.expectCurrentUrl('#/settings/identity/edit')
        })

        it('displayName should be ('+ newDisplayName +')', function(){
            util.waitForElement("[data-qa='input-displayname']");
            expect($("[data-qa='input-displayname']").isPresent()).toBe(true)

            expect($("[data-qa='input-displayname']").getAttribute('value')).toBe(newDisplayName)
        })

        it('phoneNumber should be ('+ newPhoneNumber +')', function(){
            util.waitForElement("[data-qa='input-phoneNumber']");
            expect($("[data-qa='input-phoneNumber']").isPresent()).toBe(true)

            expect($("[data-qa='input-phoneNumber']").getAttribute('value')).toBe(newPhoneNumber)
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
            util.expectCurrentUrl('#/setup')

            util.get('/settings/identity/edit')
            util.expectCurrentUrl('#/settings/identity/edit')
        })

        it('should be shown an error, if email is wrong', function(){
            util.waitForElement("[data-qa='input-email']");
            expect($("[data-qa='input-email']").isPresent()).toBe(true)

            util.clearInput('input-email')
            $("[data-qa='input-email']").sendKeys('devnull@cameo')
            $("body").click()

            util.waitForElement("[data-qa='form-error-email-invalid']");
        })

        it('should not be shown an error, if email is okay', function(){
            util.waitForElement("[data-qa='input-email']");
            expect($("[data-qa='input-email']").isPresent()).toBe(true)

            util.clearInput('input-email')
            $("[data-qa='input-email']").sendKeys('devnull@cameo.io')
            $("body").click()

            ptor.wait(function() {
                return  $("[data-qa='form-error-email-invalid']").isDisplayed().then(function(res) {
                    return ! res
                })
            }, 5000, "timeout while waiting for warning to disappear")
        })

        it('should be shown an error, if phonenumber is wrong', function(){
            util.waitForElement("[data-qa='input-phoneNumber']")
            expect($("[data-qa='input-phoneNumber']").isPresent()).toBe(true)

            util.clearInput('input-phoneNumber')
            $("[data-qa='input-phoneNumber']").sendKeys('abcdefg')
            $("body").click()

            util.waitForElement("[data-qa='form-error-phoneNumber-invalid']");
        })

        it('should not be shown an error, if phonenumber is okay', function(){
            util.waitForElement("[data-qa='input-phoneNumber']")
            expect($("[data-qa='input-phoneNumber']").isPresent()).toBe(true)

            util.clearInput('input-phoneNumber')
            $("[data-qa='input-phoneNumber']").sendKeys('123456789')
            $("body").click()

            ptor.wait(function() {
                return  $("[data-qa='form-error-phoneNumber-invalid']").isDisplayed().then(function(res) {
                    return ! res
                })
            }, 5000, "timeout while waiting for warning to disappear")
        })
    })
});
