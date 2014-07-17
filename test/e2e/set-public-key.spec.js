var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")
var ptor = util.getPtorInstance()

describe('transfer scope data registration',function(){
    it('fill out registration with validation timeout',function() {
        var privKey = 'oida foida';
        util.login()
        util.get('/settings/identity/keys/import')

        ptor.executeScript("document.querySelector(\"[data-qa='display-private-key']\").value = '"+privKey+"'")

        expect(util.getVal('display-private-key')).toBe(privKey)
    })
})