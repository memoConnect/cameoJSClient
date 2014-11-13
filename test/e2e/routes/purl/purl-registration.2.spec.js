var config = require("../../config-e2e-tests.js")
var util = require("../../../lib/e2e/cmTestUtil.js")

describe('Purl Registration: ', function () {
    var ptor = util.getPtorInstance();

    var internalLogin = ""
    var password = 'password'

    var subject = "moepsSubject"
    var msgText = "wooooopDieMoep"
    var msgText2 = "wooooopDieMoepDieMoepMoep"

    var prefix = 'testUser23_'
    var id = Math.random().toString(36).substring(2, 9)
    var externalLogin = prefix + id

    afterEach(function() { util.stopOnError() });

    var purl = ""

    it('create new test user', function(){
        util.logout()
        internalLogin = util.createTestUser()
    })

    it('add external contact to test user', function () {

        util.get('/contact/create')
        util.waitForPageLoad('/contact/create')

        $("[data-qa='input-displayname']").sendKeys(externalLogin)
        $("[data-qa='input-phoneNumber']").sendKeys('12345')

        $('cm-footer button').click()

        util.waitForPageLoad('/contact/list')
    })

    it('start conversation with external user', function () {

        util.get("/conversation/new")
        util.waitForPageLoad('/conversation/new')

        // add recipient
        $(".cm-add-button").click()
        util.waitForPageLoad("/conversation/new/recipients")
        util.searchInList(externalLogin)

        util.waitForElement("[data-qa='contact-display-name']")
        $("[data-qa='btn-select-contact']").click()

        // go back to conversation
        $("[data-qa='btn-done']").click()

        util.waitForPageLoad("/conversation/new")

        util.disableEncryption();

        // send message
        $("[data-qa='input-answer']").sendKeys(msgText)
        $("[data-qa='input-subject']").sendKeys(subject)
        $("[data-qa='btn-send-answer']").click()
    })

    it('get message send to test user', function () {
        ptor.wait(function () {
            return util.getTestUserNotifications(internalLogin).then(function (response) {
                if (response['data'].length > 0) {
                    purl = response['data'][0]['content'].split("/p/")[1]
                    return true
                } else {
                    return false
                }
            })
        })
    })

    it('open purl as external user purlId:"'+purl+'"', function () {
        util.logout()
        util.get("/purl/" + purl)
        util.waitForPageLoad('/purl/' + purl)
    })

    it('send message as external user', function () {
        $("[data-qa='input-answer']").sendKeys(msgText2)
        $("[data-qa='btn-send-answer']").click()
    })

    it('open modal when clicking on attachment', function () {
        $("[data-qa='btn-fast-registration']").click()
        util.waitForElement("[data-qa='btn-register-modal']")
        $("[data-qa='btn-register-modal']").click()
        util.waitForPageLoad('/registration')
    })

    it('directly click on register button', function () {
        util.get("/purl/" + purl)
        util.waitForPageLoad("/purl/" + purl)

        util.waitForElement("[data-qa='btn-fast-sign-in']")
        $("[data-qa='btn-fast-sign-in']").click()
        util.waitForPageLoad('/registration')
    })

    it('register as external user', function () {
        util.waitForElement("[data-qa='input-cameoId']")
        $("[data-qa='input-cameoId']").sendKeys(externalLogin)
        $("[data-qa='input-password']").sendKeys(password)
        $("[data-qa='input-passwordConfirm']").sendKeys(password)

        $("[data-qa='input-displayName']").sendKeys(externalLogin)
        $("[data-qa='link-terms']").sendKeys(protractor.Key.END)
        $("[data-qa='icon-checkbox-agb']").click()

        $("[data-qa='btn-createUser']").click()
    })

    it('first url should be "/start/welcome" ', function () {
        util.waitForPageLoad('/start/welcome')
    })

    /**
     * @deprecated
     */
    //it("next step should be the /start/quickstart", function () {
    //    util.waitAndClickQa("btn-next-step")
    //    util.waitForPageLoad('/start/quickstart')
    //})

    it("the next step should be key generation", function () {
        util.waitAndClickQa("btn-next-step")
        util.waitForPageLoad('/settings/identity/key/create')
    })

    it("should be in /talks after saving the key", function () {
        util.waitForElementVisible("[data-qa='page-save-key']", 30000)
        util.waitAndClickQa("btn-save-key")
        util.waitForPageLoad('/talks')
    })

    it("initial conversation should be present, along with user conversation", function(){
        util.waitForElements("cm-conversation-tag", 2)
        util.headerSearchInList(subject)
        util.waitAndClick("cm-conversation-tag")
    })

    it('conversation should contain all messages', function () {
        util.waitForElements("cm-message", 2)
        $$('cm-message').then(function (elements) {
            expect(elements.length).toBe(2)
            expect(elements[0].$(".text").getText()).toContain(msgText)
            expect(elements[1].$(".text").getText()).toContain(msgText2)
            expect(elements[0].$("[data-qa='message-author']").getText()).toBe(internalLogin)
//            expect(elements[1].$("[data-qa='message-author']").getText()).toBe(externalLogin)
        })
    })

    it("delete test users", function(){
        util.deleteTestUser(internalLogin)
        util.deleteTestUser(externalLogin)
    })
})
