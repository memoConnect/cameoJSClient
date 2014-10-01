var config = require("../config-e2e-tests.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Route: Start - ', function () {
    "use strict";

    var newTestUser = ""
    var password = 'password'

    var ptor = util.getPtorInstance()
    afterEach(function() { util.stopOnError() });

    describe('After registration: ', function(){
        it('register user, first url should be "/start/welcome" ', function(){
            newTestUser = util.createTestUser()
            util.expectCurrentUrl('#/start/welcome')
        })

        it("next step should be the /start/quickstart", function(){
            util.waitAndClickQa("btn-next-step")
            util.expectCurrentUrl('#/start/quickstart')
        })

        it("the next step should be key generation", function() {
            util.waitAndClickQa("btn-next-step")
            util.expectCurrentUrl('#/settings/identity/key/create')
        })

        it("should be in /talks after saving the key", function(){
            util.waitAndClickQa("btn-save-key")
            util.expectCurrentUrl('#/talks')
        })
    })

    xdescribe('Test 1 - First Login after Registration: ', function(){
        it('welcome header and welcome message should be displayed', function(){
            util.waitForElement("[data-qa='ctn-welcome-header']");
            expect($("[data-qa='ctn-welcome-header']").isDisplayed()).toBe(true)

            util.waitForElement("[data-qa='ctn-welcome-text']");
            expect($("[data-qa='ctn-welcome-text']").isDisplayed()).toBe(true)
        })

        it('key info header and key info text should be displayed', function(){
            util.waitForElement("[data-qa='ctn-key-info-header']");
            expect($("[data-qa='ctn-key-info-header']").isDisplayed()).toBe(true)

            util.waitForElement("[data-qa='ctn-key-info-text']");
            expect($("[data-qa='ctn-key-info-text']").isDisplayed()).toBe(true)
        })

        it('skip info with button and icon and skip button should be displayed', function(){
            util.waitForElement("[data-qa='checkbox-skip-start']");
            expect($("[data-qa='checkbox-skip-start']").isPresent()).toBe(true)
            expect($("[data-qa='checkbox-skip-start']").isDisplayed()).toBe(false)

            util.waitForElement("[data-qa='icon-checkbox-skip-start']");
            expect($("[data-qa='icon-checkbox-skip-start']").isDisplayed()).toBe(true)

            util.waitForElement("[data-qa='btn-skip-text']");
            expect($("[data-qa='btn-skip-text']").isDisplayed()).toBe(true)

            util.waitForElement("[data-qa='btn-skip']");
            expect($("[data-qa='btn-skip']").isDisplayed()).toBe(true)
        })


        it('explore info should not be displayed', function(){
            util.waitForElement("[data-qa='ctn-explore-info-header']");
            expect($("[data-qa='ctn-explore-info-text']").isDisplayed()).toBe(false)

            util.waitForElement("[data-qa='ctn-explore-info-text']");
            expect($("[data-qa='ctn-explore-info-text']").isDisplayed()).toBe(false)
        })

        it('after click on skip button, url should be talks', function(){
            $("[data-qa='btn-skip']").click()
            util.expectCurrentUrl('#/talks')
        })
    })

    xdescribe('Test 2 - Logout and Login - User has no Key: ', function(){
        it('user should be logged out', function(){
            util.logout();
            util.expectCurrentUrl('#/login')
        })

        it('after login url should be start', function(){
            util.login(newTestUser, password);
            util.expectCurrentUrl('#/start')
        })

        it('welcome header and welcome message should not be displayed', function(){
            util.waitForElement("[data-qa='ctn-welcome-header']");
            expect($("[data-qa='ctn-welcome-header']").isDisplayed()).toBe(false)

            util.waitForElement("[data-qa='ctn-welcome-text']");
            expect($("[data-qa='ctn-welcome-text']").isDisplayed()).toBe(false)
        })

        it('key info header and key info text should be displayed', function(){
            util.waitForElement("[data-qa='ctn-key-info-header']");
            expect($("[data-qa='ctn-key-info-header']").isDisplayed()).toBe(true)

            util.waitForElement("[data-qa='ctn-key-info-text']");
            expect($("[data-qa='ctn-key-info-text']").isDisplayed()).toBe(true)
        })

        it('skip info with button and icon and skip button should be displayed', function(){
            util.waitForElement("[data-qa='checkbox-skip-start']");
            expect($("[data-qa='checkbox-skip-start']").isPresent()).toBe(true)
            expect($("[data-qa='checkbox-skip-start']").isDisplayed()).toBe(false)

            util.waitForElement("[data-qa='icon-checkbox-skip-start']");
            expect($("[data-qa='icon-checkbox-skip-start']").isDisplayed()).toBe(true)

            util.waitForElement("[data-qa='btn-skip-text']");
            expect($("[data-qa='btn-skip-text']").isDisplayed()).toBe(true)

            util.waitForElement("[data-qa='btn-skip']");
            expect($("[data-qa='btn-skip']").isDisplayed()).toBe(true)
        })

        it('explore info should not be displayed', function(){
            util.waitForElement("[data-qa='ctn-explore-info-header']");
            expect($("[data-qa='ctn-explore-info-text']").isDisplayed()).toBe(false)

            util.waitForElement("[data-qa='ctn-explore-info-text']");
            expect($("[data-qa='ctn-explore-info-text']").isDisplayed()).toBe(false)
        })

        it('after click on skip button, url should be talks', function(){
            $("[data-qa='btn-skip']").click()
            util.expectCurrentUrl('#/talks')
        })
    })

    xdescribe('Test 3 - Login, set skip option then logout and login: ', function() {
        it('user should be logged out', function () {
            util.logout();
            util.expectCurrentUrl('#/login')
        })

        it('after login url should be start', function () {
            util.login(newTestUser, password);
            util.expectCurrentUrl('#/start')
        })

        it('on click on icon, class should be changed', function(){
            $("[data-qa='icon-checkbox-skip-start']").getAttribute("class").then(function(cl){
                expect(cl).toContain("cm-checkbox")
            })

            $("[data-qa='icon-checkbox-skip-start']").click()


            $("[data-qa='icon-checkbox-skip-start']").getAttribute("class").then(function(cl){
                expect(cl).toContain("cm-checkbox-right")
            })

            $("[data-qa='icon-checkbox-skip-start']").click()

            $("[data-qa='icon-checkbox-skip-start']").getAttribute("class").then(function(cl){
                expect(cl).toContain("cm-checkbox")
            })
        })

        it('on click on skip text, class should be changed', function(){
            $("[data-qa='icon-checkbox-skip-start']").getAttribute("class").then(function(cl){
                expect(cl).toContain("cm-checkbox")
            })

            $("[data-qa='btn-skip-text']").click()


            $("[data-qa='icon-checkbox-skip-start']").getAttribute("class").then(function(cl){
                expect(cl).toContain("cm-checkbox-right")
            })

            $("[data-qa='btn-skip-text']").click()

            $("[data-qa='icon-checkbox-skip-start']").getAttribute("class").then(function(cl){
                expect(cl).toContain("cm-checkbox")
            })
        })

        it('click skip icon and after click on skip button, url should be talks', function(){
            $("[data-qa='icon-checkbox-skip-start']").click()

            $("[data-qa='btn-skip']").click()
            util.expectCurrentUrl('#/talks')
        })

        it('user should be logged out', function () {
            util.logout();
            util.expectCurrentUrl('#/login')
        })

        it('after login url should be talks', function () {
            util.login(newTestUser, password, '/talks');
            util.expectCurrentUrl('#/talks')
        })
    })

    xdescribe('Test 4 - Login, set skip option to false, create key then logout login: ', function() {
        it('user should be logged out', function () {
            util.logout();
            util.expectCurrentUrl('#/login')
        })

        it('after login go to start', function () {
            util.login(newTestUser, password, '/talks');

            util.get('/start');
            util.expectCurrentUrl('#/start')
        })

        it('should set skip option to false', function(){
            $("[data-qa='icon-checkbox-skip-start']").getAttribute("class").then(function(cl){
                if(cl.search('cm-checkbox-right') != -1){
                    $("[data-qa='icon-checkbox-skip-start']").click()
                }
            })

            $("[data-qa='icon-checkbox-skip-start']").getAttribute("class").then(function(cl){
                expect(cl).toContain("cm-checkbox")
            })
        })

        it('user should create a local key', function(){
            util.generateKey()
            /**
             * @todo check if a key exists
             */
        })

        it('should be displayed explore info at url "start"', function(){
            util.get('/start');
            util.expectCurrentUrl('#/start')

            util.waitForElement("[data-qa='ctn-explore-info-header']");
            expect($("[data-qa='ctn-explore-info-text']").isDisplayed()).toBe(true)

            util.waitForElement("[data-qa='ctn-explore-info-text']");
            expect($("[data-qa='ctn-explore-info-text']").isDisplayed()).toBe(true)
        })

        it('user should be logged out', function () {
            util.logout();
            util.expectCurrentUrl('#/login')
        })

        it('after login url should be talks', function () {
            util.login(newTestUser, password, '/talks');
            util.expectCurrentUrl('#/talks')
        })

        it('should be displayed explore info at url "start"', function(){
            util.get('/start');
            util.expectCurrentUrl('#/start')

            util.waitForElement("[data-qa='ctn-explore-info-header']");
            expect($("[data-qa='ctn-explore-info-text']").isDisplayed()).toBe(true)

            util.waitForElement("[data-qa='ctn-explore-info-text']");
            expect($("[data-qa='ctn-explore-info-text']").isDisplayed()).toBe(true)
        })

        it('should go to "talks"', function(){
            util.waitForElement("[data-qa='btn-explore']");
            expect($("[data-qa='btn-explore']").isDisplayed()).toBe(true)

            $("[data-qa='btn-explore']").click()

            util.waitForPageLoad('/talks')
        })
    })

    describe('Remove User: ', function(){
        it('should be delete TestUser "' + newTestUser + '"', function(){
            util.deleteTestUser(newTestUser)
        })
    })
})