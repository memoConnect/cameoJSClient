var config = require("../../config-e2e-tests.js")
var util = require("../../../lib/e2e/cmTestUtil.js")
describe('Check key maximum: ',function(){
    var ptor = util.getPtorInstance(),
        testUser

    afterEach(function() { util.stopOnError() });

    it('should create a test user', function(){
        testUser = util.createTestUser(undefined,'check-key-maximum')
    })

    it('open key overview and a message should be present',function(){
        util.get('settings/identity/key/list')
        util.waitForPageLoad("/settings/identity/key/list")
        expect($("[data-qa='message-no-keys']").isPresent()).toBe(true)
        expect($("cm-footer").isPresent()).toBe(true)
    })


    it('start generation again', function () {
        util.waitAndClickQa("btn-create-key")
        util.waitForPageLoad('/settings/identity/key/create')
        util.waitAndClickQa("btn-generate-key")
    })


    describe('with increased timeout', function () {
        var expectedTimeout = util.setKeygenerationTimeout(jasmine);
        it('wait for key generation and display key', function () {
            util.waitForElementVisible("[data-qa='page-save-key']",expectedTimeout)
            expect($("[data-qa='input-key-name']").getAttribute('value')).toBeTruthy()

            $("body").click();
            util.waitAndClickQa("btn-save-key")
        })
    })

    it('user should be now at talks route', function(){
        util.waitForPageLoad("/talks")
        util.expectCurrentUrl("/talks")
    })

    it('check closed routes', function(){
        util.get('settings/identity/key/import')
        util.expectCurrentUrl("settings/identity/key")
        util.get('settings/identity/key/create')
        util.expectCurrentUrl("settings/identity/key")
    })

    it('remove key and check if message and footer for create/import appear', function(){
        util.waitAndClickQa("btn-remove-modal")
        util.waitForElement("[data-qa='modal-confirm']")
        util.waitAndClickQa('btn-confirm','cm-modal.active')

        util.waitForElement("[data-qa='message-no-keys']")
        expect($("[data-qa='message-no-keys']").isPresent()).toBe(true)

        $$("[data-qa='key-list-item']").then(function(elements){
            expect(elements.length).toEqual(0)
        })

        expect($("cm-footer").isPresent()).toBe(true)
    })

    it('check open routes', function(){
        util.get('settings/identity/key/import')
        util.expectCurrentUrl("settings/identity/key/import")
        util.get('settings/identity/key/create')
        util.expectCurrentUrl("settings/identity/key/create")
    })

    it('delete test user', function(){
        util.deleteTestUser(testUser)
    })
})