var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('talks', function () {

    var ptor = util.getPtorInstance()
    var newSubject = "wicked_test_subject"
    var messageText = "wicked_test_message_text"

    it('should be at "#/talks"', function () {
        util.login()
        util.get('/conversation')
        util.expectCurrentUrl('#/conversation')
    })

    it('should have a header', function () {
        expect($('cm-header').isPresent()).toBe(true)
    })

    it('should not have a footer', function () {
        expect($('cm-footer').isPresent()).toBe(false)
    })

    it('the conversation menu should be open', function () {
        expect($("[data-qa='conversation-options-menu']").isDisplayed()).toBe(true)
    })

    it('change the subject', function () {
        $("[data-qa='input-subject']").sendKeys(newSubject)
    })

    it('open modal to add recipient', function () {
        $("cm-edge").click()
        util.waitForPageLoad("/recipients")
    })

    it('should filter contacts', function () {
        $("[data-qa='input-search']").sendKeys(config.contactUser1DisplayName)

        ptor.wait(function () {
            return $$("[data-qa='contact-display-name']").then(function (elements) {
                return elements.length == 1
            })
        }, config.waitForTimeout, 'timed out waiting for filter')
    })

    it('add contact to conversation', function(){


    })


    it('go back to conversation on click on "done"', function () {
        $("[data-qa='btn-done']").click()
        util.waitForPageLoad("/conversation")
    })

    // todo check if recipients were added


    it('should save options', function () {
        $("[data-qa='btn-save-options']").click()
        util.waitForElementDisappear("[data-qa='conversation-options-menu']")
    })

    it('the bar should display the new subject', function () {
        expect($("[data-qa='conversation-options-bar']").getText()).toContain(newSubject)
    })

    it('should have an answer bar', function () {
        expect($('.answer').isPresent()).toBe(true)
    })

    it('send message', function () {
        $("[data-qa='input-answer']").sendKeys(messageText)
        $("[data-qa='btn-send-answer']").click()
    })

    it('message should appear in conversation', function () {
        util.waitForElement('cm-message')
    })

    it('there should be only one message, and it should contain the message text', function () {
        $$('cm-message').then(function (elements) {
            expect(elements.length).toBe(1)
            expect(elements[0].getText()).toContain(messageText)
        })
    })


})
