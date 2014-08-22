var config = require("../../config-e2e-tests.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Multi Identity: ', function () {
    var ptor = util.getPtorInstance()
    var login
    var newIdentity = {
        cameoId: 'testCameoId_'+Math.random().toString(36).substring(2, 9),
        displayName: 'moep1337Oida',
        phoneNumber: 1234567,
        email: '1337@cameo.io'
    }

    afterEach(function() { util.stopOnError() });

    it('create new user and open identity settings', function () {
        login = util.createTestUser()
        util.expectCurrentUrl('/start/welcome')

        util.get('settings/identity/overview')
        util.expectCurrentUrl('/settings/identity/overview')
    })

    it('should be displayed one identity and a button', function(){
        util.waitForElement("[data-qa='btn-identity-new']")
        expect($("[data-qa='btn-identity-new']").isDisplayed()).toBe(true)

        $$("[data-qa='identity-list-item']").then(function (elements) {
            expect(elements.length).toBe(1)
        })
    })

    it('create a new identity', function(){
        util.click('btn-identity-new')
        util.expectCurrentUrl('/settings/identity/new')

        util.setVal('input-cameoId',newIdentity.cameoId)
        ptor.sleep(1001)//adaptive change delay

        util.waitForElement("[data-qa='icon-cameoId-reserved']")
        $("[data-qa='icon-cameoId-reserved']")
        .getAttribute('class')
        .then(function(className){
            expect(className).toContain('cm-checkbox-right')
        })

        util.setVal('input-displayname',newIdentity.displayName)
        util.setVal('input-phonenumber',newIdentity.phoneNumber)
        util.setVal('input-email',newIdentity.email)

        util.click('btn-identity-create')

        util.waitForPageLoad('/start/keyinfo')

        util.get('/talks')

        expect($("[data-qa='btn-identity-settings']").getText()).toBe(newIdentity.displayName)
    })

    it('should be two itdentities in list', function(){
        util.get('settings/identity/overview')
        util.expectCurrentUrl('/settings/identity/overview')

        $$("[data-qa='identity-list-item']").then(function (elements) {
            expect(elements.length).toBe(2)
        })
    })

    it('check identity create/switch data', function(){
        util.click('btn-identity-settings')
        util.waitForPageLoad('/settings/identity')

        expect(util.getVal('input-cameoId')).toBe(newIdentity.cameoId+'@cameonet.de')
        expect(util.getVal('input-displayname')).toBe(newIdentity.displayName)
        expect(util.getVal('input-phonenumber')).toBe('+49'+newIdentity.phoneNumber)
        expect(util.getVal('input-email')).toBe(newIdentity.email)
    })

    it('switch back to first identity', function(){
        util.get('settings/identity/overview')
        util.expectCurrentUrl('/settings/identity/overview')

        util.click('btn-identity-switchto')

        util.waitForPageLoad('/start/welcome')
        util.get('/talks')
        
        expect($("[data-qa='btn-identity-settings']").getText()).toBe(login)
    })

    it('should delete TestUser', function(){
        util.deleteTestUser(login)
    })
})