var config = require("./../../config-e2e-tests.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Route: Settings - Identity', function(){
    "use strict";

    var ptor = util.getPtorInstance()

    it('should be load at "#/settings/identity" after login.', function(){
        util.login()
        util.expectCurrentUrl('#/talks')

        util.get('/settings/identity')
        util.expectCurrentUrl('#/settings/identity')
    })

    it('should exists a key management button', function(){
        util.waitForElement("[data-qa='btn-identity-keys']");
        expect($("[data-qa='btn-identity-keys']").isPresent()).toBe(true)
    })

    it('should be exists a trust button', function(){
        util.waitForElement("[data-qa='btn-identity-trust']");
        expect($("[data-qa='btn-identity-trust']").isPresent()).toBe(true)
    })

    it('should be exists a form with following elements', function(){
        util.waitForElement("[data-qa='input-displayname']");
        expect($("[data-qa='input-displayname']").isPresent()).toBe(true)
    })
});
