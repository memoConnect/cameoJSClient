/**
 * Created by reimerei on 25.06.14.
 */

var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('Purl registration', function () {

    var ptor = util.getPtorInstance();

    var internalLogin = util.createTestUser()
    var password = 'password'

    var msgText = "wooooopDieMoep"
    var msgText2 = "wooooopDieMoepDieMoepMoep"

    var prefix = 'testUser23_'
    var id = Math.random().toString(36).substring(2,9)
    var externalLogin = prefix + id


    var purl = ""

    it('add external contact to test user', function () {

        util.get('/contact/new')

        $("[data-qa='input-displayname']").sendKeys(externalLogin)
        $("[data-qa='input-phonenumber']").sendKeys('12345')

        $('cm-footer button').click()

        util.waitForPageLoad('/contacts')
    })

    it('start conversation with external user', function () {

        util.get("/conversation")

        // add recipient
        $("cm-add-button").click()
        util.waitForPageLoad("/recipients")
        $("[data-qa='input-search']").sendKeys(externalLogin)
        util.waitForElement("[data-qa='contact-display-name']")
        $("[data-qa='btn-select-contact']").click()

        // go back to conversation
        $("[data-qa='btn-done']").click()
        util.waitForPageLoad("/conversation")
        $("[data-qa='encryption-btn']").click()

        $("[data-qa='btn-save-options']").click()
        util.waitForElementHidden("[data-qa='conversation-options-menu']")

        // send message
        $("[data-qa='input-answer']").sendKeys(msgText)
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

    it('open purl as external user', function () {
        util.logout()
        util.get("/purl/" + purl)
    })

    it('send message as external user', function () {
        $("[data-qa='input-answer']").sendKeys(msgText2)
        $("[data-qa='btn-send-answer']").click()
    })

    it('open modal when clicking on attachment', function () {

        $('[data-qa="btn-fast-registration"]').click()
        util.waitForElement('[data-qa="btn-register-modal"]')
        $('[data-qa="btn-register-modal"]').click()
        util.waitForPageLoad('/registration')
    })

    it('directly click on register button', function(){
        util.get("/purl/" + purl)
        $('[data-qa="btn-fast-sign-in"]').click()
        util.waitForPageLoad('/registration')
    })

    it('register as external user', function(){

        $("[data-qa='input-loginName']").sendKeys(externalLogin)
        $("[data-qa='input-password']").sendKeys(password)
        $("[data-qa='input-passwordConfirm']").sendKeys(password)

        $("[data-qa='link-terms']").sendKeys(protractor.Key.END)
        $("[data-qa='icon-checkbox-agb']").click()

        ptor.sleep(1000).then(function(){

            $("[data-qa='btn-createUser']").click()
            util.waitForPageLoad("/conversation/.*")
        })
    })

    it('conversation with the right message should be loaded', function(){

        util.waitForElements("cm-message", 2)
        $$('cm-message').then(function (elements) {
            expect(elements.length).toBe(2)
            expect(elements[0].$(".text").getText()).toContain(msgText)
            expect(elements[1].$(".text").getText()).toContain(msgText2)
            expect(elements[0].$("[data-qa='message-author']").getText()).toBe(internalLogin)
            expect(elements[1].$("[data-qa='message-author']").getText()).toBe(externalLogin)
        })

        // delete test users
        util.deleteTestUser(internalLogin)
        util.deleteTestUser(externalLogin)

    })
})
