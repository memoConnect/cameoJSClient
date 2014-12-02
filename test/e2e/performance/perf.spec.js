var config = require("../config/specs.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('performance prepare', function () {

    var ptor = util.getPtorInstance()

    it("login and generate key", function () {
        util.login(config.loginUser2, config.passwordUser2)
        util.generateKey(6, "key")
        util.logout()
    })
})

describe('performance tests', function () {

    var ptor = util.getPtorInstance()

    it("login", function () {
        util.login(config.loginUser2, config.passwordUser2)
        util.waitForElements("cm-conversation-tag", 10)
    })

    it("switch to contacts", function () {
        util.click("btn-contacts")
        util.waitForElement("cm-contact-tag")
    })

    it("view first contact", function () {
        $$("cm-contact-tag").then(function(list) {
            list[0].click()
        })
        util.waitForElement("cm-avatar")
    })

    it("use back button to go back to contacts", function () {
        util.clickBackBtn()
        util.waitForElement("cm-contact-tag")
    })

    it("switch to talks", function () {
        util.click("btn-talks")
        util.waitForElements("cm-conversation-tag", 10)
    })

    it("start new conversation", function () {
        util.click("new-conversation-btn")
        util.waitForElement("[data-qa='input-answer']")
    })

    it("send message", function () {
        util.setVal("input-answer", "the best test message in the world!")
        util.click("btn-send-answer")
        util.waitAndClickQa('btn-confirm','cm-modal.active')
        util.waitForElements("cm-message", 1)
    })

    it("use back button to go back to talks", function () {
        util.clickBackBtn()
        util.waitForElements("cm-conversation-tag", 11)
    })

    it("open menu", function () {
        util.click("btn-open-menu")
        util.waitForElementVisible(".cm-menu-list")
    })

    it("close menu", function () {
        util.click("btn-open-menu")
        util.waitForElementHidden(".cm-menu-list")
    })

})

describe('performance cleanup', function () {

    var ptor = util.getPtorInstance()

    it("delete key", function () {
        util.get("/settings/identity/key/list")
        util.waitAndClickQa("btn-remove-modal")
        util.waitAndClickQa('btn-confirm','cm-modal.active')
    })
})


