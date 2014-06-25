/**
 * Created by reimerei on 25.06.14.
 */

var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('Purl registration', function () {

    var ptor = util.getPtorInstance();

    var loginName = util.createTestUser()

    var externName = "daMoep"
    var msgText = "wooooopDieMoep"

    var purl = ""

    it('add external contact to test user', function () {

        util.get('/contact/new')

        $("[data-qa='input-displayname']").sendKeys(externName)
        $("[data-qa='input-phonenumber']").sendKeys('12345')

        $('cm-footer button').click()

        util.waitForPageLoad('/contacts')
    })

    it('start conversation with external user', function () {

        util.get("/conversation")

        // add recipient
        $("cm-add-button").click()
        util.waitForPageLoad("/recipients")
        $("[data-qa='input-search']").sendKeys(externName)
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

    it('get message of test user', function () {

        ptor.wait(function () {
            return util.getTestUserNotifications(loginName).then(function (response) {
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

    it('open modal when clicking on attachment', function () {

        $('[data-qa="btn-fast-registration"]').click()
        util.waitForElement('[data-qa="btn-register-modal"]')
        $('[data-qa="btn-register-modal"]').click()
        util.waitForPageLoad('/registration')
    })
})
