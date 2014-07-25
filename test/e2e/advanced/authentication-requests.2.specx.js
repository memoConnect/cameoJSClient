var config = require("../config-e2e-tests.js")
var util = require("../../lib/e2e/cmTestUtil.js")

describe('Authentication requests -', function () {

    var ptor = util.getPtorInstance()
    var date = Date.now()

    afterEach(function () {
        util.stopOnError()
    })

    var testUserId = Math.random().toString(36).substring(2, 9)
    var testUser = "testUser23_" + testUserId

    var keyName1 = "moeps key 1"
    var keyName2 = "moeps key 2"
    var keyName3 = "moeps key 3"

    it("create test user and generate first key", function () {
        util.createTestUser(testUserId)
        util.generateKey(1, keyName1)
    })

    it("delete first key from local storage and generate a second key", function () {
        util.logout()
        util.clearLocalStorage()
        util.login(testUser, "password")
        util.get("/settings/identity/keys")
        util.waitForElement("[data-qa='key-list-item']")
        ptor.debugger()
        util.generateKey(2, keyName2)
    })

    it("a modal asking for authentication should open", function () {
        util.waitForElement("[data-qa='btn-doHandshake']")
        $("[data-qa='btn-doHandshake']").click()
    })

    it("it should display the first key", function () {
        util.waitForElements("[data-qa='item-available-key']", 1)
        $$("[data-qa='item-available-key']").then(function (elements) {
            expect(elements.length).toBe(1)
            expect(elements[0].getText()).toContain(keyName1)
        })
    })

    it("delete second key and generate a third one", function () {
        util.logout()
        util.clearLocalStorage()
        util.login(testUser, "password")
        util.get("/settings/identity/keys")
        util.waitForElement("[data-qa='key-list-item']")
        util.generateKey(3)
    })

    it("a modal asking for authentication should open", function () {
        util.waitForElement("[data-qa='btn-doHandshake']")
        $("[data-qa='btn-doHandshake']").click()
    })

    it("it should display the first and second key", function () {
        util.waitForElements("[data-qa='item-available-key']", 2)
        $$("[data-qa='item-available-key']").then(function (elements) {
            expect(elements.length).toBe(1)
            expect(elements[0].getText()).toContain(keyName1)
            expect(elements[1].getText()).toContain(keyName2)
        })
    })

    it("delete testUser", function () {
        util.deleteTestUser(testUser)
    })

})
