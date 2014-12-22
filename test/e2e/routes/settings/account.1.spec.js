var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Route Settings Account: ', function(){
    var ptor = util.getPtorInstance(),
        testUser

    var loginName = 'testuser23_',
        genLoginName = '',
        phoneNumber = '+1234567890',
        email = 'devnull@cameo.io',
        oldPassword = 'password',
        newPassword = 'holymoly'

    describe('Check Form - ', function() {
        it('should create a test user', function(){
            util.createTestUser(undefined,'account settings')
            .then(function(loginName){
                testUser = loginName
            })
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

        it('test cm-info-bubble', function(){
            util.setVal('input-phoneNumber','moep')

            util.waitForElementVisible("[data-qa='form-error-phoneNumber-invalid']")
            expect($("[data-qa='form-error-phoneNumber-invalid']").isDisplayed()).toBeTruthy()

            util.setVal('input-email','moep')
            util.waitForElementVisible("[data-qa='form-error-email-invalid']")
            expect($("[data-qa='form-error-email-invalid']").isDisplayed()).toBeTruthy()
        })

        it('fill form with new data', function(){
            util.clearInput('input-phoneNumber')
            util.setVal('input-phoneNumber',phoneNumber)
            util.getVal('input-phoneNumber').then(function(value){
                expect(value).toBe(phoneNumber)
            })
            util.clearInput('input-email')
            util.setVal('input-email',email)
            util.getVal('input-email').then(function(value){
                expect(value).toBe(email)
            })
        })

        it('open change password and should be empty', function(){
            util.scrollToBottom()
            // open
            util.click('btn-passwordChange')

            util.getVal('input-oldPassword').then(function(value){
                expect(value).toMatch('')
            })

            util.getVal('input-password').then(function(value){
                expect(value).toMatch('')
            })

            util.getVal('input-passwordConfirm').then(function(value){
                expect(value).toMatch('')
            })
        })

        it('toggle change password and should be after user input be empty', function(){
            util.setVal('input-oldPassword','moep')
            util.setVal('input-password','moep')
            util.setVal('input-passwordConfirm','moep')
            // close
            util.click('btn-passwordChange')
            // open
            util.click('btn-passwordChange')
            util.getVal('input-oldPassword').then(function(value){
                expect(value).toMatch('')
            })

            util.getVal('input-password').then(function(value){
                expect(value).toMatch('')
            })

            util.getVal('input-passwordConfirm').then(function(value){
                expect(value).toMatch('')
            })
        })

        it('enter new password without old password', function() {
            util.setVal('input-password', newPassword)
            util.setVal('input-passwordConfirm', newPassword)
            util.click('btn-saveAccount')

            util.waitForElementVisible("[data-qa='form-error-oldPassword-empty']")
            expect($("[data-qa='form-error-oldPassword-empty']").isDisplayed()).toBeTruthy()
        })

        it('enter wrong old password', function(){
            util.setVal('input-oldPassword','meop')
            util.click('btn-saveAccount')
            util.waitForElementVisible("[data-qa='form-error-oldPassword-invalid']")
            expect($("[data-qa='form-error-oldPassword-invalid']").isDisplayed()).toBeTruthy()
        })

        it('enter right old password and save account', function(){
            util.clearInput('input-oldPassword')
            util.setVal('input-oldPassword',oldPassword)
            util.click('btn-saveAccount')

            util.waitForLoader(1,'cm-footer')
        })

        it('check saved data & test login with new password', function(){
            util.waitForQa('input-loginName');
            util.getVal('input-loginName').then(function(value){
                expect(value).toMatch(genLoginName)
            })

            util.waitForQa('input-phoneNumber');
            util.getVal('input-phoneNumber').then(function(value){
                expect(value).toBe(phoneNumber)
            })

            util.waitForQa('input-email');
            util.getVal('input-email').then(function(value){
                expect(value).toBe(email)
            })
            // do a logout and login
            util.login(genLoginName, newPassword)
        })

        it('delete test user', function(){
            util.deleteTestUser(testUser)
        })
    })
})