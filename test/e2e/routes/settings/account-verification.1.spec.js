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

    function createDescribesAndItsForVerification(type, value, extraValue){
        describe('automatic', function(){

            it('save '+type+' and check if info bubble appear', function(){
                util.checkWarning('info-emailNotVerified',true)
                util.checkWarning('info-phoneNumberNotVerified',true)

                util.setVal('input-'+type,value)

                util.click('btn-saveAccount')
                util.waitForLoader(1,'cm-footer')

                // phone info bubble for do verification
                expect($("[data-qa='btn-"+type+"ManuallyVerification']").getAttribute('class')).toContain('cm-checkbox-wrong')
                util.checkWarning('info-'+type+'NotVerified')

                util.waitForElement("[data-qa='inp-"+type+"CodeVerify']")

                // get secret
                getVerificationSecret()
            })

            it('check verification form', function(){
                util.checkWarning('info-'+type+'VerificationCodeEmpty',true)
                util.checkWarning('info-'+type+'VerificationCodeInvalid',true)

                util.click('btn-'+type+'CodeVerify')
                util.checkWarning('info-'+type+'VerificationCodeEmpty')

                util.setVal('inp-'+type+'CodeVerify',' ',true)
                util.sendEnter('inp-'+type+'CodeVerify')
                util.checkWarning('info-'+type+'VerificationCodeEmpty')

                util.setVal('inp-'+type+'CodeVerify','moep',true)
                util.sendEnter('inp-'+type+'CodeVerify')
                util.checkWarning('info-'+type+'VerificationCodeInvalid')

                util.setVal('inp-'+type+'CodeVerify',verifySecret,true)
                util.sendEnter('inp-'+type+'CodeVerify')
                util.waitForLoader(1,'.'+type+'Verification')

                // phone info bubble for verification is appear
                expect($("[data-qa='btn-"+type+"ManuallyVerification']").getAttribute('class')).toContain('cm-checkbox-right')
                util.checkWarning('info-'+type+'NotVerified',true)
            })
        })

        describe('manually',function(){
            it('start verification', function(){
                util.setVal('input-'+type, value+extraValue, true)

                util.click('btn-saveAccount')
                util.waitForLoader(1,'cm-footer')

                // clear secret
                getVerificationSecret()

                util.click('btn-'+type+'ManuallyVerification')
                // get secret
                getVerificationSecret()
            })

            it('test manually verification secret', function(){
                util.setVal('inp-'+type+'CodeVerify',verifySecret,true)
                util.sendEnter('inp-'+type+'CodeVerify')
                util.waitForLoader(1,'.'+type+'Verification')
                // phone info bubble for verification is appear
                expect($("[data-qa='btn-"+type+"ManuallyVerification']").getAttribute('class')).toContain('cm-checkbox-right')
                util.checkWarning('info-'+type+'NotVerified',true)
            })
        })
    }

    describe('Check Form', function() {
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

        describe('verification phoneNumber', function(){
            createDescribesAndItsForVerification('phoneNumber',phoneNumber,'4')
        })

        describe('verification email', function(){
            createDescribesAndItsForVerification('email',email,'c')
        })

        it('delete test user', function(){
            util.deleteTestUser(testUser)
        })
    })
})
