var config = require("../../config-e2e-tests.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Identity multi', function () {
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
        util.get('/settings/identity')
    })

    it('open modal and create a new identity', function(){
        util.click('btn-open-identity-modal')
        util.waitForModalOpen()
        util.click('btn-identity-new')

        util.expectCurrentUrl('/settings/identity/new')

        util.setVal('input-cameoId',newIdentity.cameoId)
        ptor.sleep(501)//adaptive change delay

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

        util.waitForPageLoad('/start')

        expect($("[data-qa='btn-open-identity-modal']").getText()).toBe(newIdentity.displayName)
    })

    it('check identity create/switch data', function(){
        util.click('btn-open-identity-modal')
        util.waitForModalOpen()
        $("cm-modal.active [data-qa='btn-identity-active']").click()

        util.waitForPageLoad('/settings/identity')

        expect(util.getVal('input-cameoId')).toBe(newIdentity.cameoId+'@cameonet.de')
        expect(util.getVal('input-displayname')).toBe(newIdentity.displayName)
        expect(util.getVal('input-phonenumber')).toBe('+49'+newIdentity.phoneNumber)
        expect(util.getVal('input-email')).toBe(newIdentity.email)
    })

    it('switch back to first identity', function(){
        util.click('btn-open-identity-modal')
        util.waitForModalOpen()
        $("cm-modal.active [data-qa='btn-identity-switchto']").click()

        util.waitForPageLoad('/start')

        expect($("[data-qa='btn-open-identity-modal']").getText()).toBe(login)
    })
})