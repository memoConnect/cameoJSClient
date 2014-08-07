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

    var keyRequest
    var keyResponse
    var startEvent
    var verifiedEvent
    var eventCancel

    var checkKeyTrust = function (keyName, isTrusted) {
        $$("[data-qa='key-list-item']").then(function (keys) {
            keys.forEach(function (key) {
                key.getText().then(function(text){
                    if(text.search(keyName) > -1) {
                        if (isTrusted) {
                            expect(text).toContain("trusted")
                            expect(text).not.toContain("untrusted")
                        } else {
                            expect(text).toContain("untrusted")
                        }
                    }
                })
            })
        })
    }

    it("create test user, generate key1 and export localStorage", function () {
        util.createTestUser(testUserId)
        util.generateKey(1, keyName1)
        checkKeyTrust(keyName1, true)
        util.getLocalStorage().then(function (lsexport) {
            localStorage1 = lsexport
        })
        util.getToken().then(function (res) {
            token = res
        })
    })

    it("get event subscription", function () {
        util.getEventSubscription(token).then(function (res) {
            eventSubscription = res
        })
    })

    it("delete first key from local storage and generate key3", function () {
        util.logout()
        util.clearLocalStorage()
        util.login(testUser, "password")
        util.get("/settings/identity/keys")
        util.waitForElement("[data-qa='key-list-item']")
        ptor.debugger()
        util.generateKey(3, keyName3)
        checkKeyTrust(keyName1, false)
        checkKeyTrust(keyName3, true)
        util.getLocalStorage().then(function (lsexport) {
            localStorage3 = lsexport
        })
    })

    it("a modal asking for authentication should open", function () {
        util.waitForElement("cm-modal.active [data-qa='btn-start']")
        $("cm-modal.active [data-qa='btn-start']").click()
    })

    it("get key-request", function () {
        util.getEvents(token, eventSubscription).then(function (res) {
            keyRequest = res.data.events.filter(function (event) {
                return event.name == "authenticationRequest:key-request"
            })[0]
        })
    })

    it("delete localstorage and import key1", function () {
        util.logout()
        util.clearLocalStorage()
        util.setLocalStorage(localStorage1.key, localStorage1.value)
        util.login(testUser, "password")
        util.get("/settings/identity/keys")
        checkKeyTrust(keyName1, true)
        checkKeyTrust(keyName3, false)
        util.waitForEventSubscription()
    })

    it("a modal asking for authentication start should open", function () {
        util.broadcastEvent(token, keyRequest)
    })

    it("send cancel event and rebroadcast event", function () {
//        util.broadcastEvent(token, eventCancel)
//        util.waitForElementDissappear("[data-qa='btn-start']")
//        util.broadcastEvent(token, event1)
//        util.waitForElement("[data-qa='btn-start']")
        util.waitForElement("cm-modal.active [data-qa='btn-accept']")
        $("cm-modal.active [data-qa='btn-accept']").click()
        util.waitForModalClose()
    })

    it("get key-response", function () {
        util.getEvents(token, eventSubscription).then(function (res) {
            keyResponse = res.data.events.filter(function (event) {
                return event.name == "authenticationRequest:key-response"
            })[0]
        })
    })

    it("delete local storage and generate key2", function () {
        util.logout()
        util.clearLocalStorage()
        util.login(testUser, "password", "/start")
        util.get("/settings/identity/keys")
        util.waitForElement("[data-qa='key-list-item']")
        ptor.debugger()
        util.generateKey(2, keyName2)
        checkKeyTrust(keyName1, false)
        checkKeyTrust(keyName2, true)
        checkKeyTrust(keyName3, false)
        util.getLocalStorage().then(function (lsexport) {
            localStorage2 = lsexport
        })
    })

    it("start another key-request", function () {
        util.waitForElement("cm-modal.active [data-qa='btn-start']")
        util.click("btn-start")
    })

    var requestId
    it("get authenticationRequestId", function () {
        util.getEvents(token, eventSubscription).then(function (res) {
            var keyRequest2 = res.data.events.filter(function (event) {
                return event.name == "authenticationRequest:key-request"
            })[0]
            requestId = keyRequest2.data.id
        })
    })

    it("send key-response with new authenticationRequestId", function () {
        keyResponse.data.id = requestId
        util.broadcastEvent(token, keyResponse)
    })

    it("a modal displaying the transaction secret should be displayed", function () {
        util.waitForElementHidden("cm-modal.active cm-spinner")
        $("cm-modal.active [data-qa='btn-start']").click()
        util.waitForElement("cm-modal.active [data-qa='transaction-secret-value']")
        expect($("cm-modal.active [data-qa='transaction-secret-value']").getText()).toBeTruthy()
        $("cm-modal.active .backdrop").click()
    })

    it("start new authentication request", function () {
        $$("[data-qa='key-list-item']").then(function (keys) {
            keys.forEach(function (key) {
                key.getText().then(function (text) {
                    if (text.search(keyName1) > -1) {
                        key.$("[data-qa='btn-start-handshake']").click()
                    }
                })
            })
        })
        util.waitForElement("cm-modal.active [data-qa='btn-start']")
        $("cm-modal.active [data-qa='btn-start']").click()
        util.waitForElement("cm-modal.active [data-qa='transaction-secret-value']")
        $("cm-modal.active [data-qa='transaction-secret-value']").getText().then(function (text) {
            transactionSecret = text
        })
    })

    it("get start event", function () {
        util.getEvents(token, eventSubscription).then(function (res) {
            startEvent = res.data.events.filter(function (event) {
                return event.name == "authenticationRequest:start"
            })[1]
        })
    })

    it("delete localstorage and import key1", function () {
        util.logout()
        util.clearLocalStorage()
        util.setLocalStorage(localStorage1.key, localStorage1.value)
        util.login(testUser, "password")
        util.get("/settings/identity/keys")
        checkKeyTrust(keyName1, true)
        checkKeyTrust(keyName2, false)
        checkKeyTrust(keyName3, false)
        util.waitForEventSubscription()
    })

    it("send start event", function () {
        util.broadcastEvent(token, startEvent)
    })

    it("a modal asking for the transaction secret should open", function () {
        util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")

    })

    it("enter wrong transaction secret", function () {
        util.setVal("inp-transactSecret", "moep!")
        $("cm-modal.active [data-qa='btn-acceptRequest']").click()
        expect($("[data-qa='warn-wrong-input']").isDisplayed()).toBe(true)
    })

    it("enter the right transaction secret", function () {
        util.clearInput("inp-transactSecret")
        util.setVal("inp-transactSecret", transactionSecret)
        $("cm-modal.active [data-qa='btn-acceptRequest']").click()
        util.waitForElementHidden("[data-qa='warn-wrong-input']")
        util.waitForElementDisappear("cm-modal.active")
    })

    it("key2 should now be trusted", function () {
        util.waitForElements("[data-qa='key-list-item']", 3)
        checkKeyTrust(keyName1, true)
        checkKeyTrust(keyName2, true)
        checkKeyTrust(keyName3, false)
    })

    it("get verified event", function () {
        util.getEvents(token, eventSubscription).then(function (res) {
            verifiedEvent = res.data.events.filter(function (event) {
                return event.name == "authenticationRequest:verified"
            })[0]
        })
    })

    it("delete localstorage and import key2", function () {
        util.logout()
        util.clearLocalStorage()
        util.setLocalStorage(localStorage2.key, localStorage2.value)
        util.login(testUser, "password")
        util.get("/settings/identity/keys")
        checkKeyTrust(keyName1, false)
        checkKeyTrust(keyName2, true)
        checkKeyTrust(keyName3, false)
        util.waitForEventSubscription()
    })

    it("start another authorization request", function() {
        $$("[data-qa='key-list-item']").then(function (keys) {
            keys.forEach(function (key) {
                key.getText().then(function (text) {
                    if (text.search(keyName1) > -1) {
                        key.$("[data-qa='btn-start-handshake']").click()
                    }
                })
            })
        })
        util.waitForElement("cm-modal.active [data-qa='btn-start']")
        $("cm-modal.active [data-qa='btn-start']").click()
        util.waitForElement("cm-modal.active [data-qa='transaction-secret-value']")
    })

    it("get authentication request id", function () {
        util.getEvents(token, eventSubscription).then(function (res) {
            var keyRequest2 = res.data.events.filter(function (event) {
                return event.name == "authenticationRequest:start"
            })[0]
            requestId = keyRequest2.data.id
        })
    })

    it("send verified request", function(){
        verifiedEvent.data.id = requestId
        util.broadcastEvent(token, verifiedEvent)
    })

    it("key1 should now be trusted", function(){
        util.waitForElementDisappear("cm-modal.active")
        util.waitForElements("[data-qa='key-list-item']", 3)
        checkKeyTrust(keyName1, true)
        checkKeyTrust(keyName2, true)
        checkKeyTrust(keyName3, false)
    })

    it("start authentication request for key3", function(){
        $$("[data-qa='key-list-item']").then(function (keys) {
            keys.forEach(function (key) {
                key.getText().then(function (text) {
                    if (text.search(keyName3) > -1) {
                        key.$("[data-qa='btn-start-handshake']").click()
                    }
                })
            })
        })
        util.waitForElement("cm-modal.active [data-qa='btn-start']")
        $("cm-modal.active [data-qa='btn-start']").click()
        util.waitForElement("cm-modal.active [data-qa='transaction-secret-value']")
        $("cm-modal.active [data-qa='transaction-secret-value']").getText().then(function (text) {
            transactionSecret = text
        })
    })

    it("get start event", function () {
        util.getEvents(token, eventSubscription).then(function (res) {
            startEvent = res.data.events.filter(function (event) {
                return event.name == "authenticationRequest:start"
            })[0]
        })
    })

    it("delete localstorage and import key3", function () {
        util.logout()
        util.clearLocalStorage()
        util.setLocalStorage(localStorage3.key, localStorage3.value)
        util.login(testUser, "password")
        util.get("/settings/identity/keys")
        checkKeyTrust(keyName1, false)
        checkKeyTrust(keyName2, false)
        checkKeyTrust(keyName3, true)
        util.waitForEventSubscription()
    })

    it("send start event", function () {
        util.broadcastEvent(token, startEvent)
    })

    it("enter transaction secret", function () {
        util.waitForElement("cm-modal.active [data-qa='inp-transactSecret']")
        util.setVal("inp-transactSecret", transactionSecret)
        $("cm-modal.active [data-qa='btn-acceptRequest']").click()
        util.waitForElementDisappear("cm-modal.active")
    })

    it("all keys should now be trusted via transitive trust", function () {
        util.waitForElements("[data-qa='key-list-item']", 3)
        checkKeyTrust(keyName1, true)
        checkKeyTrust(keyName2, true)
        checkKeyTrust(keyName3, true)
        ptor.debugger()
    })

    it("delete localstorage and import key1, all three keys should be truested", function () {
        util.logout()
        util.clearLocalStorage()
        util.setLocalStorage(localStorage1.key, localStorage1.value)
        util.login(testUser, "password")
        util.get("/settings/identity/keys")
        checkKeyTrust(keyName1, true)
        checkKeyTrust(keyName2, true)
        checkKeyTrust(keyName3, true)
        ptor.debugger()
    })

    it("delete localstorage and import key2, all three keys should be truested", function () {
        util.logout()
        util.clearLocalStorage()
        util.setLocalStorage(localStorage2.key, localStorage2.value)
        util.login(testUser, "password")
        util.get("/settings/identity/keys")
        checkKeyTrust(keyName1, true)
        checkKeyTrust(keyName2, true)
        checkKeyTrust(keyName3, true)
        ptor.debugger()
    })
})
