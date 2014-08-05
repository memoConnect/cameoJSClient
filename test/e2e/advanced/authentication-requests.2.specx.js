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

    var localStorage1
    var localStorage2
    var localStorage3

    var eventSubscription

    var token

    var transactionSecret

    var event1
    var event2
    var event3
    var event4

    it("create test user, generate key1 and export localStorage", function () {
        util.createTestUser(testUserId)
        util.generateKey(1, keyName1)
        util.getLocalStorage().then(function (lsexport) {
            localStorage1 = lsexport
        })
        util.getToken().then(function(res){
            token = res
        })

    })

    it("delete first key from local storage and generate key2", function () {
        util.logout()
        util.clearLocalStorage()
        util.login(testUser, "password")
        util.get("/settings/identity/keys")
        util.waitForElement("[data-qa='key-list-item']")
        util.generateKey(2, keyName2)
        util.getLocalStorage().then(function (lsexport) {
            localStorage2 = lsexport
        })
    })

    it("close modal and get event subscription", function () {
        util.waitForElement("[data-qa='btn-cancel']")
        util.click("btn-cancel")
        ptor.debugger()
        util.getEventSubscription(token).then(function(res){
            eventSubscription = res
        })
    })

    it("do the same with key3", function () {
        util.logout()
        util.clearLocalStorage()
        util.login(testUser, "password")
        util.get("/settings/identity/keys")
        util.waitForElement("[data-qa='key-list-item']")
        util.generateKey(3, keyName3)
        util.getLocalStorage().then(function (lsexport) {
            localStorage3 = lsexport
        })
        ptor.debugger()
    })

    it("a modal asking for authentication should open", function () {
        util.waitForElement("[data-qa='btn-start']")
        util.click("btn-start")
    })

    it("get event1", function () {
        util.getEvents(token, eventSubscription).then(function(res){
            event1 = res.data.events[0]
        })
    })

    it("delete localstorage, import key1 and broadcast event", function(){
        console.log("event", event1)
        console.log("localStorage", localStorage1.key)
        util.logout()
        util.clearLocalStorage()
        util.setLocalStorage(localStorage1.key, localStorage1.value)
        util.login(testUser, "password")
        util.broadcastEvent(token, event1)
        ptor.debugger()
    })

    it("a modal asking for authentication start should open", function () {
        util.waitForElement("[data-qa='btn-start']")
        util.click("btn-start")
    })

    it("get event2", function () {
        util.getEvents(token, eventSubscription).then(function(res){
            event1 = res.data.events[0]
        })
    })
//
//    it("request authorization from key one", function () {
//        $$("[data-qa='item-available-key']").then(function (elements) {
//            elements[0].click()
//            util.click("btn-startHandshake")
//            util.getVal("transaction-secret-value").then(function(secret) {
//                transactionSecret = secret
//            })
//        })
//    })
//
//    it("delete key three and import key one", function(){
//        util.logout()
//        util.clearLocalStorage()
//        util.login(testUser, "password")
//        util.get("/settings/identity/keys")
//        util.waitForElements("[data-qa='key-list-item']", 3)
//        util.generateKey(1, keyName1)
//    })
//
//    it("delete testUser", function () {
//        console.log("Secret: " + secret)
//        util.deleteTestUser(testUser)
//    })

})
