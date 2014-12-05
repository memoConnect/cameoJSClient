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
                console.log('getVerificationSecret',response['data'])

                //if(response['data'].length > 0 && 'content' in response['data'][0])
                //    purlId = response['data'][0]['content'].split("/p/")[1]

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

        it('submit email and check if info bubble appear', function(){

            util.checkWarning('info-emailNotVerified',true)

            util.setVal('input-email',email)

            util.click('btn-saveAccount')
            util.waitForLoader()
            // info bubble appear
            util.checkWarning('info-emailNotVerified')

            getVerificationSecret()

            // info-phoneNumberNotVerified


        })

        it('delete test user', function(){
            util.deleteTestUser(testUser)
        })
    })
})