var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Incomplete Registration : ', function () {
    var ptor = util.getPtorInstance(),
        testUser

    it('register user, first url should be "/setup/account" ', function () {
        util.createTestUser(undefined, 'incomplete-registration')
            .then(function(loginName){
                testUser = loginName
            })
    })

    it('should logout', function(){
        util.logout();
    })

    it('after login, user should see "setup/account" page', function(){
        util.login(testUser,'password');
        util.waitForPageLoad('/setup/account')
    })

    it("the next step should be setup identity", function () {
        util.waitAndClickQa("btn-next-step")
        util.waitForPageLoad('/setup/identity')
    })

    it("the next step should be key generation", function () {
        util.waitAndClickQa("btn-next-step")
        util.waitForPageLoad('/settings/identity/key/create')
    })

    it("should be in /talks after canceling key generation", function () {
        util.waitAndClickQa('btn-cancel-key-generation').then(function(){
            return util.waitForPageLoad('/talks')
        })
    })

    it('should logout', function(){
        util.logout();
    })

    it('after login, user should see "setup/account" page', function(){
        util.login(testUser,'password');
        util.waitForPageLoad('/setup/keyinfo')
    })


    it('should logout', function(){
        util.logout();
    })

    it('delete TestUsers', function () {
        util.deleteTestUser(testUser)
    })
})