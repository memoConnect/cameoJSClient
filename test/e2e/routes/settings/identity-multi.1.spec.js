var config = require("../../config/specs.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Multi Identity: ', function () {
    var ptor = util.getPtorInstance()
    var login
    var newIdentity = {
        cameoId: 'testCameoId_'+Math.random().toString(36).substring(2, 9),
        displayName: 'moep1337Oida',
        phoneNumber: 1234567,
        email: 'devnull@cameo.io'
    }

    it('create new user and open identity settings', function () {
        login = util.createTestUser(undefined, 'multi identity')
        util.expectCurrentUrl('/setup/account')

        util.get('settings/identity/list')
        util.expectCurrentUrl('/settings/identity/list')
    })

    it('should be displayed one identity', function(){
        util.waitForElement("[data-qa='create-identity-btn']")
        expect($("[data-qa='create-identity-btn']").isDisplayed()).toBe(true)

        $$("[data-qa='identity-list-item']").then(function (elements) {
            expect(elements.length).toBe(1)
        })
    })

    it('create a new identity', function(){
        util.click('create-identity-btn')
        util.expectCurrentUrl('/settings/identity/create')

        util.waitForElement("[data-qa='input-cameoId']")
        util.setVal('input-cameoId',newIdentity.cameoId)
        ptor.sleep(1001)//adaptive change delay

        util.waitForElement("[data-qa='icon-cameoId-reserved']")

        ptor.wait(function () {
            return $("[data-qa='icon-cameoId-reserved']").getAttribute('class').then(function(className){
                return (className.indexOf('cm-checkbox-right') != -1)
            })
        })

        util.setVal('input-displayname',newIdentity.displayName)
        util.setVal('input-phoneNumber',newIdentity.phoneNumber)
        util.setVal('input-email',newIdentity.email)

        util.click('btn-identity-create')

        util.waitForPageLoad('/start/keyinfo')

        util.get('/talks')

        expect($("[data-qa='btn-identity-settings']").getText()).toBe(newIdentity.displayName)
    })

    it('should be two itdentities in list', function(){
        util.get('settings/identity/list')
        util.expectCurrentUrl('/settings/identity/list')

        $$("[data-qa='identity-list-item']").then(function (elements) {
            expect(elements.length).toBe(2)
        })
    })

    it('check identity create/switch data', function(){
        $("li[data-qa='identity-list-item'].isActive").click()
        util.waitForPageLoad('/settings/identity/edit')

        expect(util.getVal('input-cameoId')).toBe(newIdentity.cameoId+'@cameonet.de')
        expect(util.getVal('input-displayname')).toBe(newIdentity.displayName)
        expect(util.getVal('input-phoneNumber')).toBe('+49'+newIdentity.phoneNumber)
        expect(util.getVal('input-email')).toBe(newIdentity.email)
    })

    it('switch back to first identity', function(){
        util.get('/settings/identity/list')
        util.expectCurrentUrl('/settings/identity/list')

        $("li[data-qa='identity-list-item']:not(.isActive)").click()

        util.waitForPageLoad('/start')
        
        util.get('/talks')
        util.expectCurrentUrl('/talks')

        expect($("[data-qa='btn-identity-settings']").getText()).toBe(login)
    })

    it('should delete TestUser', function(){
        util.deleteTestUser(login)
    })
})