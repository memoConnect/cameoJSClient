var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Route Settings Account Verification: ', function(){
    var ptor = util.getPtorInstance(),
        testUser

    var loginName = 'testuser23_',
        genLoginName = '',
        phoneNumber = '+1234567890',
        email = 'devnull@cameo.io',
        verifySecret

    function getVerificationSecret() {
        verifySecret = undefined

        ptor.wait(function () {
            return util.getTestUserNotifications(testUser).then(function (response) {
                if(response['data'].length > 0 && 'content' in response['data'][0])
                    verifySecret = response['data'][0]['content'].split("\"")[1]

                return verifySecret != undefined
            })
        }, 5000, 'unable to getVerificationSecret')
    }

    describe('Check Form - ', function() {
        it('should create a test user', function(){
            testUser = util.createTestUser(undefined,'account verification')
        })

        it('should be load at "#/settings/" after registration and btn exists.', function () {
            util.get('/settings')
            util.expectCurrentUrl('#/settings')

            expect($("[data-qa='btn-settingsAccount']").isDisplayed()).toBeTruthy()
            util.click('btn-settingsAccount')
            util.expectCurrentUrl('#/settings/account')
        })

        it('check pristine, click footer btn should go back', function(){
            expect($("[data-qa='btn-pristineBack']").isDisplayed()).toBeTruthy()
            util.click('btn-saveAccount')
            util.expectCurrentUrl('#/settings')
        })

        it('go to form and should have user credentials from registration', function(){
            util.get('/settings/account')
            util.expectCurrentUrl('#/settings/account')

            util.getVal('input-loginName').then(function(value){
                expect(value).toMatch(loginName)
                genLoginName = value;
            })
            util.getVal('input-phoneNumber').then(function(value){
                expect(value).toBe('')
            })
            util.getVal('input-email').then(function(value){
                expect(value).toBe('')
            })
        })

        it('save phoneNumber and check if info bubble appear', function(){
            util.checkWarning('info-emailNotVerified',true)
            util.checkWarning('info-phoneNumberNotVerified',true)

            util.setVal('input-phoneNumber',phoneNumber)

            util.click('btn-saveAccount')
            util.waitForLoader(1,'cm-footer')

            // phone info bubble for do verification
            expect( $("[data-qa='btn-manuallyPhoneNumberVerfication']").getAttribute('class')).toContain('cm-checkbox-wrong')
            util.checkWarning('info-phoneNumberNotVerified')

            // automatic generated secret -> get and clear
            getVerificationSecret()
        })

        it('start manually verification', function(){
            util.click('btn-manuallyPhoneNumberVerfication')
            // get manually generated secret
            getVerificationSecret()
        })

        it('check verfication modal', function(){
            // check default all error info bubbles are hidden
            util.checkWarning('info-secretIsEmpty', true)
            util.checkWarning('info-secretIsInvalid', true)
            // send enter on empty input
            util.setVal('inp-verifySecret', protractor.Key.ENTER)
            util.checkWarning('info-secretIsEmpty')

            // check invalidation
            util.setVal('inp-verifySecret', 'moep', true)
            util.click('btn-confirmVerification')
            util.waitForLoader(1,'cm-modal')
            util.checkWarning('info-secretIsInvalid')

            // type right secret
            util.setVal('inp-verifySecret', verifySecret, true)
            util.click('btn-confirmVerification')
            util.waitForLoader(1,'cm-modal')
            util.waitForModalClose()

            // phone info bubble for verification is appear
            expect($("[data-qa='btn-manuallyPhoneNumberVerfication']").getAttribute('class')).toContain('cm-checkbox-right')
            util.checkWarning('info-phoneNumberNotVerified',true)
        })

        it('delete test user', function(){
            util.deleteTestUser(testUser)
        })
    })
})