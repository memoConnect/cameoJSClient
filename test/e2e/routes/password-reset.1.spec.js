var config = require("../config/specs.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Route Password Lost/Reset:', function(){
    var ptor = util.getPtorInstance(),
        testUser1,
        testUser2

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

    function getVerificationSecret(testUser) {
        verifySecret = undefined

        ptor.wait(function () {
            return util.getTestUserNotifications(testUser).then(function (response) {
                if(response['data'].length > 0 && 'content' in response['data'][0])
                    verifySecret = response['data'][0]['content'].split('"')[1]

                return verifySecret != undefined
            })
        }, 5000, 'unable to getVerificationSecret')
    }

    function getResetData(testUser) {
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

    describe('Test password forms', function(){

        it('should be at "#/login/" and goto "#/password/lost"', function () {
            util.get('/login')
            util.expectCurrentUrl('#/login')

            expect($("[data-qa='btn-passwordLost']").isDisplayed()).toBeTruthy()
            util.click('btn-passwordLost')
        })

        describe('route password/lost', function(){

            var input = 'inp-passwordLost',
                footer = "cm-footer"

            it('be on route', function(){
                util.waitForPageLoad('/password/lost')
                util.expectCurrentUrl('#/password/lost')
            })

            it('all info-bubbles should be hidden', function(){
                util.checkWarning('info-identifierEmpty',true)
                util.checkWarning('info-loginNotFound',true)
                util.checkWarning('info-phoneNumberNotFound',true)
                util.checkWarning('info-emailNotFound',true)
                util.checkWarning('info-noEmailPhonenumber',true)
            })

            it('check empty', function(){
                util.click('btn-startResetPassword')
                util.checkWarning('info-identifierEmpty')
            })

            it('check another empty', function(){
                util.setVal(input,' ')
                util.sendEnter(input)
                util.checkWarning('info-identifierEmpty')
            })

            it('check invalid loginname',function(){
                util.setVal(input,'moep',true)
                util.sendEnter(input)
                util.waitForLoader(1,footer)
                util.checkWarning('info-loginNotFound')
            })

            it('check invalid phonenumber',function(){
                util.setVal(input,'+49123456789',true)
                util.sendEnter(input)
                util.waitForLoader(2,footer)
                util.checkWarning('info-phoneNumberNotFound')
            })

            it('check invalid email',function(){
                util.setVal(input,'moep@cameo.ioio',true)
                util.sendEnter(input)
                util.waitForLoader(3,footer)
                util.checkWarning('info-emailNotFound')
            })
        })

        describe('route password/code', function(){
            var input = 'inp-codeResetPassword',
                footer = "cm-footer"

            it('go to route',function(){
                util.get('/password/code')
                util.waitForPageLoad('/password/code')
                util.expectCurrentUrl('#/password/code')

                util.waitForElement("[data-qa='"+input+"']")
            })

            it('check info bubble',function(){
                util.checkWarning('info-confirmationSended')
                util.checkWarning('info-codeEmpty',true)
                util.checkWarning('info-expired',true)
            })

            it('check empty',function(){
                util.click('btn-checkResetPassword')
                util.checkWarning('info-codeEmpty')
            })

            it('check another empty',function(){
                util.setVal(input,' ')
                util.sendEnter(input)
                util.checkWarning('info-codeEmpty')
            })

            it('check invalid code here moep',function(){
                util.setVal(input,'moep',true)
                util.sendEnter(input)
                util.waitForLoader(1,footer)
                util.checkWarning('info-expired')
            })

            it('check invalid expired id',function(){
                util.setVal(input,resetDataExpired.id,true)
                util.sendEnter(input)
                util.waitForLoader(2,footer)
                util.checkWarning('info-expired')
            })

            it('check invalid expired code',function(){
                util.setVal(input,resetDataExpired.code,true)
                util.sendEnter(input)
                util.waitForLoader(3,footer)
                util.checkWarning('info-expired')
            })

            it('test cancel button',function(){
                util.click('btn-cancelPasswordReset')
                util.expectCurrentUrl('#/password/lost')
            })
        })

        describe('reset - should display expired', function(){
            it('got to route', function(){
                util.get('/password/reset/'+resetDataExpired.id)
                util.waitForPageLoad('/password/reset/'+resetDataExpired.id)
            })

            it('check info bubble expired', function(){
                util.checkWarning('info-requestExpired')
            })
        })
    })

    describe('testuser with unverified phonenumber', function(){
        it('should create a test user', function(){
            util.createTestUser(undefined,'password reset')
            .then(function(loginName){
                testUser1 = loginName
            })
        })

        it('save phoneNumber', function(){
            util.get('/settings/account')
            util.waitForPageLoad('/settings/account')
            .then(function(){
                util.setVal('input-phoneNumber',phoneNumber)
                util.click('btn-saveAccount')
                return util.logout()
            })
        })

        it('check form password/lost should display not verified phonenumber', function(){
            util.get('/password/lost')

            // identitify with loginName
            util.setVal('inp-passwordLost',testUser1,true)
            util.sendEnter('inp-passwordLost')
            util.waitForLoader(1,'cm-footer')

            util.checkWarning('info-noEmailPhonenumber')
        })

        it('delete testuser', function(){
            util.deleteTestUser(testUser1)
        })
    })

    describe('testuser with verified phonenumber', function() {
        it('should create a test user', function(){
            util.createTestUser(undefined,'password reset')
            .then(function(loginName){
                testUser2 = loginName
                return util.waitForEventSubscription()
            })
        })

        it('save phoneNumber', function(){
            util.get('/settings/account')
            util.waitForPageLoad('/settings/account')
            .then(function(){
                util.setVal('input-phoneNumber',phoneNumber)
                util.click('btn-saveAccount')
                // get secret
                getVerificationSecret(testUser2)
            })


        })

        it('verify phoneNumber and logout', function(){
            util.setVal('inp-phoneNumberCodeVerify',verifySecret,true)
            util.sendEnter('inp-phoneNumberCodeVerify')
            util.waitForLoader(1,'.phoneNumberVerification')

            // phone info bubble for verification is appear
            expect($("[data-qa='btn-phoneNumberManuallyVerification']").getAttribute('class')).toContain('cm-checkbox-right')
            util.checkWarning('info-phoneNumberNotVerified',true)

            util.logout()
        })

        it('check form password/lost', function(){
            util.get('/password/lost')
            util.waitForPageLoad('/password/lost')

            // identitify with loginName
            util.setVal('inp-passwordLost',testUser2,true)
            util.sendEnter('inp-passwordLost')

            // get data from notification
            getResetData(testUser2)
        })

        it('enter valid code and check form', function(){
            util.waitForElement("[data-qa='inp-codeResetPassword']")
            .then(function(){
                util.setVal('inp-codeResetPassword',resetData.code,true)
                util.sendEnter('inp-codeResetPassword')
                return util.waitForPageLoad('/password/reset/'+resetData.id)
            })
            .then(function(){
                // isnt expired
                util.checkWarning('info-requestExpired',true)

                util.setVal('input-password',password)
                util.setVal('input-passwordConfirm',password)

                util.click('btn-resetPassword')

                // after success on login route
                return util.waitForPageLoad('/login')
            })
        })

        it('login with new password', function(){
            util.login(testUser2, password)
        })

        it('delete testuser', function(){
            util.deleteTestUser(testUser2)
        })
    })
})