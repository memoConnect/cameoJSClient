var config = require("../../config/specs.js")
var util = require("../../cmUtil.js")

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
        util.createTestUser()
        .then(function(loginName){
            internalLogin = loginName
        })
    })

    it('add external contact to test user', function () {

        util.get('/contact/create')
        util.waitForPageLoad('/contact/create')

        $("[data-qa='input-displayname']").sendKeys(externalLogin)
        $("[data-qa='input-phoneNumber']").sendKeys('12345')

        $('cm-footer button').click()

        // close notify extern modal
        util.waitForModalOpen()
        util.waitAndClickQa('btn-cancel','cm-modal.active')

        util.waitForPageLoad('/contact/list')
    })

    it('start conversation with external user', function () {
        util.get("/conversation/new")
        util.waitForPageLoad('/conversation/new')
        .then(function(){
            util.click('btn-add-recipients')
            return util.waitForPageLoad("/conversation/new/recipients")
        }).then(function(){
            util.headerSearchInList(externalLogin)
            util.waitForElement("[data-qa='contact-display-name']")
            $("[data-qa='btn-select-contact']").click()

            // go back to conversation
            $("[data-qa='btn-done']").click()
            return util.waitForPageLoad("/conversation/new")
        }).then(function(){
            util.disableEncryption();

            // send message
            $("[data-qa='input-subject']").sendKeys(subject)
            $("[data-qa='input-answer']").sendKeys(msgText)
            $("[data-qa='btn-send-answer']").click()
        })
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

    it('open purl as external user', function () {
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

        $("[data-qa='icon-checkbox-agb']").click()

        $("[data-qa='btn-createUser']").click()
    })

    it('first url should be "/setup/account" ', function () {
        util.waitForPageLoad('/setup/account')
    })

    it("the next step should be setup/identity ", function () {
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
        })
    })

    it("delete test users", function(){
        util.deleteTestUser(internalLogin)
        util.deleteTestUser(externalLogin)
    })
})
