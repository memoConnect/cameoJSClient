var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Registration-Setup : ', function () {
    var ptor = util.getPtorInstance()

    var testUserWithKey = ""
    var testUserWithoutKey = ""
    var password = 'password'

    describe('After registration with key generation - ', function () {
        it('register user, first url should be "/setup/account" ', function () {
            util.createTestUser(undefined, 'reg-setup - 1')
            .then(function(loginName){
                testUserWithKey = loginName
            })
        })

        it("the next step should be setup identity", function () {
            util.waitAndClickQa("btn-next-step")
            util.waitForPageLoad('/setup/identity')
        })

        it("the next step should be key generation", function () {
            util.waitAndClickQa("btn-next-step")
            util.waitForPageLoad('/settings/identity/key/create')
        })

        describe('with increased timeout', function () {
            var expectedTimeout = util.setKeygenerationTimeout(jasmine);
            it('wait for key generation and display key', function () {
                util.waitForElementVisible("[data-qa='page-save-key']",expectedTimeout)

                $("body").click();
                util.waitAndClickQa("btn-save-key")

                util.waitForPageLoad('/talks')
            })
        })
    })

    describe('Login user with key -', function(){
        it("login user", function(){
            util.login(testUserWithKey, password);
        })

        it("should go direclty to /talks", function(){
            util.waitForPageLoad("/talks")
        })
    })

    describe('After registration with canceled key generation - ', function () {
        it('register user, first url should be "/setup/account" ', function () {
            util.createTestUser(undefined, 'reg-setup - 2')
            .then(function(loginName){
                testUserWithoutKey = loginName
            })
        })

        it("the next step should be setup identity", function () {
            util.waitAndClickQa("btn-next-step")
            .then(function(){
                return util.waitForPageLoad('/setup/identity')
            })
        })

        it("the next step should be key generation", function () {
            util.waitAndClickQa("btn-next-step")
            .then(function(){
                return util.waitForPageLoad('/settings/identity/key/create')
            })
        })

        it("should be in /talks after canceling key generation", function () {
            util.waitAndClickQa('btn-cancel-key-generation')
            .then(function(){
                return util.waitForPageLoad('/talks')
            })
        })
    })

    describe('Login user without key and skip keygen -', function () {
        it('login user', function () {
            util.login(testUserWithoutKey, password);
        })

        it('keyinfo should be displayed', function () {
            util.waitForPageLoad("/setup/keyinfo")
        })

        it("go to /talks when skipping keygen", function () {
            util.waitAndClickQa("btn-skip-keygen")
            util.waitForPageLoad("/talks")
        })
    })

    describe('Login user without key and set skip checkbox -', function () {
        it('login user', function () {
            util.login(testUserWithoutKey, password);
        })

        it('keyinfo should be displayed', function () {
            util.waitForPageLoad("/setup/keyinfo")
        })

        it("go to /talks when skipping keygen", function () {
            util.waitAndClickQa("checkbox-skip-key-info-icon")
            util.waitAndClickQa("btn-skip-keygen")
            util.waitForPageLoad("/talks")
        })

        it("logout and login", function(){
            util.login(testUserWithoutKey, password);
        })

        it("should go directly to talks", function(){
            util.waitForPageLoad("/talks")
        })

        it("disable skip keygen in settings" , function(){
            util.get("/settings/app")
            util.waitAndClickQa("checkbox-skip-keyinfo")
        })
    })

    describe('Login user without key and generate key in keyinfo -', function(){
        it('login user', function () {
            util.logout();
            util.login(testUserWithoutKey, password);
        })

        it('keyinfo should be displayed', function () {
            util.waitForPageLoad("/setup/keyinfo")
        })

        it("offer differen keysizes", function(){
            util.waitAndClickQa("btn-toggle-keysize")
            util.waitForElementVisible("[data-qa='checkbox-keysize-2048'")
            util.waitForElementVisible("[data-qa='checkbox-keysize-4096'")
        })

        it("generate key", function(){
            util.waitAndClickQa("btn-next-step")
        })

        it("go to /talks after saving the key", function(){
            util.waitForElementVisible("[data-qa='page-save-key']", 60000)
            util.waitAndClickQa("btn-save-key")
            util.waitForPageLoad('/talks')
        })
    })

    it('delete TestUsers', function () {
        util.deleteTestUser(testUserWithKey)
        util.deleteTestUser(testUserWithoutKey)
    })
})