var config = require("../config/specs.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Route Password Lost/Reset:', function(){
    var ptor = util.getPtorInstance(),
        testUser

    var loginName = 'testuser23_',
        genLoginName = '',
        phoneNumber = '+1234567890',
        email = 'devnull@cameo.io',
        password = 'passwordNew',
        resetId,
        resetIdExpired = 'lx8J3P1hJqA5jcy',
        verifySecret

    function getVerificationSecret() {
        verifySecret = undefined

        ptor.wait(function () {
            return util.getTestUserNotifications(testUser).then(function (response) {
                if(response['data'].length > 0 && 'contents' in response['data'][0])
                    verifySecret = response['data'][0]['content'].split('"')[1]

                return verifySecret != undefined
            })
        }, 5000, 'unable to getVerificationSecret')
    }

    function getResetId() {
        resetId = undefined

        ptor.wait(function () {
            return util.getTestUserNotifications(testUser).then(function (response) {
                if(response['data'].length > 0 && 'content' in response['data'][0])
                    resetId = response['data'][0]['content'].split('/pr/')[1]

                return resetId != undefined
            })
        }, 5000, 'unable to getResetId')
    }

    describe('Start reset', function() {
        it('should create a test user', function(){
            testUser = util.createTestUser(undefined,'password reset')
            util.waitForEventSubscription()
        })

        it('verify phoneNumber', function(){
            util.get('/settings/account')
            util.expectCurrentUrl('#/settings/account')

            util.setVal('input-phoneNumber',phoneNumber)

            util.click('btn-saveAccount')
            // clear
            getVerificationSecret()
        })

        it('start manually verification', function(){
            util.click('btn-manuallyPhoneNumberVerification')
            // get manually generated secret
            getVerificationSecret()
        })

        it('do verfication', function(){
            expect(typeof verifySecret).not.toBe('undefined')

            util.setVal('inp-verifySecret',verifySecret)
            util.click('btn-confirmVerification')

            util.waitForLoader(1,'cm-modal')
            util.waitForModalClose()

            expect($("[data-qa='btn-manuallyPhoneNumberVerification']").getAttribute('class')).toContain('cm-checkbox-right')

            util.logout()
        })

        it('should be at "#/login/" and goto "#/password/lost"', function () {
            util.get('/login')
            util.expectCurrentUrl('#/login')

            expect($("[data-qa='btn-passwordLost']").isDisplayed()).toBeTruthy()
            util.click('btn-passwordLost')
            util.expectCurrentUrl('#/password/lost')
        })

        it('check form of lost', function(){
            util.checkWarning('info-identifierEmpty',true)
            util.checkWarning('info-loginNotFound',true)
            util.checkWarning('info-phoneNumberNotFound',true)
            util.checkWarning('info-emailNotFound',true)
            util.checkWarning('info-noEmailPhonenumber',true)
            util.checkWarning('info-confirmationSended',true)

            // empty
            util.click('btn-resetPassword')
            util.checkWarning('info-identifierEmpty')

            // check loginname info
            util.setVal('inp-passwordLost','moep')
            util.sendEnter('inp-passwordLost')
            util.checkWarning('info-loginNotFound')

            // phonenumber
            util.setVal('inp-passwordLost','+49123456789',true)
            util.sendEnter('inp-passwordLost')
            util.checkWarning('info-phoneNumberNotFound')

            // email
            util.setVal('inp-passwordLost','moep@cameo.ioio',true)
            util.sendEnter('inp-passwordLost')
            util.checkWarning('info-emailNotFound')

            // identitify with loginName
            util.setVal('inp-passwordLost',testUser,true)
            util.sendEnter('inp-passwordLost')
            util.checkWarning('info-confirmationSended')

            getResetId()
        })

        it('check form with expired resetId', function(){
            util.get('/password/reset/'+resetIdExpired)
            util.expectCurrentUrl('#/password/reset/'+resetIdExpired)

            util.checkWarning('info-requestExpired',true)

            util.setVal('input-password',password)
            util.setVal('input-passwordConfirm',password)

            util.click('btn-resetPassword')
            util.waitForLoader()
            util.checkWarning('info-requestExpired')
        })

        it('do password reset with valid resetId', function(){
            expect(typeof resetId).not.toBe('undefined')

            util.get('/password/reset/'+resetId)
            util.expectCurrentUrl('#/password/reset/'+resetId)

            util.checkWarning('info-requestExpired',true)

            util.setVal('input-password',password)
            util.setVal('input-passwordConfirm',password)

            util.click('btn-resetPassword')

            // after success on login route
            util.waitForPageLoad('/login')
            util.expectCurrentUrl('#/login')
        })

        it('login with new password', function(){
            util.login(testUser, password, '/start/keyinfo')
        })

        it('delete test user', function(){
            util.deleteTestUser(testUser)
        })
    })
})