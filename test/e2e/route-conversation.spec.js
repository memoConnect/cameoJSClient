var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('talks', function () {

    var ptor = util.getPtorInstance()
    var newSubject = "wicked_test_subject_" + Date.now();
    var messageText = "wicked_test_message_text_" + Date.now();
    var messageText2 = "another_wicked_test_message_text_" + Date.now();

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

    it('add contact to conversation', function () {
        $("[data-qa='btn-select-contact']").click()
    })


    it('go back to conversation on click on "done"', function () {
        $("[data-qa='btn-done']").click()
        util.waitForPageLoad("/conversation")
    })

    it('added recipient should be displayed', function () {
        $$("[data-qa='avatar-display-name']").then(function (elements) {
            expect(elements.length).toBe(1)
            expect(elements[0].getText()).toBe(config.contactUser1DisplayName)
        })
    })

    it('should save options', function () {
        $("[data-qa='btn-save-options']").click()
        util.waitForElementDisappear("[data-qa='conversation-options-menu']")
    })

    it('the bar should display the new subject', function () {
        expect($("[data-qa='conversation-options-bar']").getText()).toContain(newSubject)
    })

    it('the bar should display the correct number of recipients', function () {
        expect($("[data-qa='conversation-options-bar']").getText()).toMatch("2$")
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

    it('log in as contact, the created conversation should be listed first', function () {
        util.login(config.contactUser1Login, config.contactUser1Password)
        util.waitForElement("cm-conversation-tag")
        $$("cm-conversation-tag").then(function (elements) {
            expect(elements[0].$("[data-qa='conversation-subject']").getText()).toContain(newSubject.substring(0.10))
            expect(elements[0].$("[data-qa='conversation-last-message']").getText()).toContain(messageText.substring(0.10))
        })
    })

    it('the conversation should contain the message', function () {
        $$("cm-conversation-tag").then(function (elements) {
            elements[0].click()
            util.waitForPageLoad("/conversation/.*")
            $$('cm-message').then(function (elements) {
                expect(elements.length).toBe(1)
                expect(elements[0].getText()).toContain(messageText)
            })
        })
    })

    it('send reply', function() {
        $("[data-qa='input-answer']").sendKeys(messageText2)
        $("[data-qa='btn-send-answer']").click()
    })

    it('there should be two messages, in the right order with the right text and authors', function () {
        // wait until second message appears
        ptor.wait(function () {
            return $$("cm-message").then(function (elements) {
                return elements.length == 2
            })
        }, config.waitForTimeout, 'timed out waiting second message')

        $$('cm-message').then(function (elements) {
            expect(elements.length).toBe(2)
            expect(elements[0].getText()).toContain(messageText)
            expect(elements[1].getText()).toContain(messageText2)
        })
    })

    it('log in as original user, the created conversation should be listed first', function() {
        util.login()
        util.waitForElement("cm-conversation-tag")
        $$("cm-conversation-tag").then(function (elements) {
            expect(elements[0].$("[data-qa='conversation-subject']").getText()).toContain(newSubject.substring(0.10))
            expect(elements[0].$("[data-qa='conversation-last-message']").getText()).toContain(messageText2.substring(0.10))
        })
    })

    it('the conversation should contain both messages', function () {
        $$("cm-conversation-tag").then(function (elements) {
            elements[0].click()
            util.waitForPageLoad("/conversation/.*")
            $$('cm-message').then(function (elements) {
                expect(elements.length).toBe(2)
                expect(elements[0].getText()).toContain(messageText)
                expect(elements[1].getText()).toContain(messageText2)
                expect(elements[1].$("[data-qa='message-author']").getText()).toBe(config.contactUser1DisplayName)
            })
        })
    })
})
