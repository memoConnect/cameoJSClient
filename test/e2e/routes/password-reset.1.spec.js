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
        resetData,
        resetDataExpired = {
            code: 'U217HK',
            id: '6hARkakoWlkPYEG'
        },
        verifySecret

    function getVerificationSecret() {
        verifySecret = undefined

        ptor.wait(function () {
            return util.getTestUserNotifications(testUser).then(function (response) {
                if(response['data'].length > 0 && 'content' in response['data'][0])
                    verifySecret = response['data'][0]['content'].split('"')[1]

                return verifySecret != undefined
            })
        }, 5000, 'unable to getVerificationSecret')
    }

    function getResetData() {
        resetData = undefined

        ptor.wait(function () {
            return util.getTestUserNotifications(testUser).then(function (response) {
                if(response['data'].length > 0 && 'content' in response['data'][0]) {
                    var message = response['data'][0]['content'],
                        code = message.split('\"')[1],
                        id = message.split('/pr/')[1]

                    resetData = {
                        code: code,
                        id: id
                    }
                }

                return resetData != undefined
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
            // get secret
            getVerificationSecret()
        })

        it('verify phoneNumber', function(){
            util.setVal('inp-phoneNumberCodeVerify',verifySecret,true)
            util.sendEnter('inp-phoneNumberCodeVerify')
            util.waitForLoader(1,'.phoneNumberVerification')

            // phone info bubble for verification is appear
            expect($("[data-qa='btn-phoneNumberManuallyVerification']").getAttribute('class')).toContain('cm-checkbox-right')
            util.checkWarning('info-phoneNumberNotVerified',true)

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
            util.click('btn-startResetPassword')
            util.checkWarning('info-identifierEmpty')

            util.setVal('inp-passwordLost',' ')
            util.sendEnter('inp-passwordLost')
            util.checkWarning('info-identifierEmpty')

            // check loginname info
            util.setVal('inp-passwordLost','moep',true)
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

            // get data from notification
            getResetData()
        })

        it('check code with invalid input', function(){
            util.expectCurrentUrl('#/password/lost')

            util.waitForElement("[data-qa='inp-codeResetPassword']")

            util.checkWarning('info-confirmationSended')
            util.checkWarning('info-codeEmpty',true)
            util.checkWarning('info-expired',true)

            util.click('btn-checkResetPassword')
            util.checkWarning('info-codeEmpty')

            util.setVal('inp-codeResetPassword',' ')
            util.sendEnter('inp-codeResetPassword')
            util.checkWarning('info-codeEmpty')

            util.setVal('inp-codeResetPassword','moep',true)
            util.sendEnter('inp-codeResetPassword')
            util.checkWarning('info-expired')

            util.setVal('inp-codeResetPassword',resetDataExpired.id,true)
            util.sendEnter('inp-codeResetPassword')
            util.checkWarning('info-expired')

            util.setVal('inp-codeResetPassword',resetDataExpired.code,true)
            util.sendEnter('inp-codeResetPassword')
            util.checkWarning('info-expired')
        })

        it('click cancel and be in clear start form', function(){
            util.click('btn-resetForm')

            util.expectCurrentUrl('#/password/lost')

            util.waitForElement("[data-qa='inp-passwordLost']")

            util.checkWarning('info-identifierEmpty',true)
            util.checkWarning('info-loginNotFound',true)
            util.checkWarning('info-phoneNumberNotFound',true)
            util.checkWarning('info-emailNotFound',true)
            util.checkWarning('info-noEmailPhonenumber',true)
            util.checkWarning('info-confirmationSended',true)

        })

        it('check expired password link', function(){
            util.get('/password/reset/'+resetDataExpired.id)
            util.expectCurrentUrl('#/password/reset/'+resetDataExpired.id)

            util.checkWarning('info-requestExpired')
        })

        it('start a new reset and get new resetData', function(){
            util.get('/password/lost')
            // identitify with loginName
            util.setVal('inp-passwordLost',testUser,true)
            util.sendEnter('inp-passwordLost')

            // get data from notification
            getResetData()
        })

        it('enter valid code and check form', function(){
            util.waitForElement("[data-qa='inp-codeResetPassword']")

            util.setVal('inp-codeResetPassword',resetData.code,true)
            util.sendEnter('inp-codeResetPassword')

            util.expectCurrentUrl('#/password/reset/'+resetData.id)

            // isnt expired
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